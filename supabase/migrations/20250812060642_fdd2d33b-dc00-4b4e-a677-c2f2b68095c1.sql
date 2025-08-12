-- Create enum types
CREATE TYPE public.user_role AS ENUM ('user', 'moderator', 'admin');
CREATE TYPE public.question_status AS ENUM ('open', 'closed', 'resolved');

-- Create profiles table for user data
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  bio TEXT,
  avatar_url TEXT,
  reputation INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user roles table
CREATE TABLE public.user_roles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role user_role NOT NULL DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, role)
);

-- Create topics table
CREATE TABLE public.topics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  icon TEXT,
  color TEXT,
  question_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create questions table
CREATE TABLE public.questions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  status question_status NOT NULL DEFAULT 'open',
  upvotes INTEGER NOT NULL DEFAULT 0,
  downvotes INTEGER NOT NULL DEFAULT 0,
  answer_count INTEGER NOT NULL DEFAULT 0,
  view_count INTEGER NOT NULL DEFAULT 0,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create answers table
CREATE TABLE public.answers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  question_id UUID NOT NULL REFERENCES public.questions(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  upvotes INTEGER NOT NULL DEFAULT 0,
  downvotes INTEGER NOT NULL DEFAULT 0,
  is_accepted BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create question votes table
CREATE TABLE public.question_votes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  question_id UUID NOT NULL REFERENCES public.questions(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  vote_type INTEGER NOT NULL CHECK (vote_type IN (-1, 1)), -- -1 for downvote, 1 for upvote
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(question_id, user_id)
);

-- Create answer votes table
CREATE TABLE public.answer_votes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  answer_id UUID NOT NULL REFERENCES public.answers(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  vote_type INTEGER NOT NULL CHECK (vote_type IN (-1, 1)),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(answer_id, user_id)
);

-- Create user follows table
CREATE TABLE public.user_follows (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  follower_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  following_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(follower_id, following_id),
  CHECK(follower_id != following_id)
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.question_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.answer_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_follows ENABLE ROW LEVEL SECURITY;

-- Create function to check user roles
CREATE OR REPLACE FUNCTION public.has_role(user_id UUID, role_name user_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_roles.user_id = $1 AND user_roles.role = $2
  )
$$;

-- Create RLS policies for profiles
CREATE POLICY "Profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for user_roles
CREATE POLICY "User roles are viewable by everyone" ON public.user_roles FOR SELECT USING (true);
CREATE POLICY "Only admins can manage user roles" ON public.user_roles FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Create RLS policies for topics
CREATE POLICY "Topics are viewable by everyone" ON public.topics FOR SELECT USING (true);
CREATE POLICY "Only admins can manage topics" ON public.topics FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Create RLS policies for questions
CREATE POLICY "Questions are viewable by everyone" ON public.questions FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create questions" ON public.questions FOR INSERT WITH CHECK (auth.uid() IS NOT NULL AND auth.uid() = user_id);
CREATE POLICY "Users can update their own questions" ON public.questions FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own questions OR admins can delete any" ON public.questions FOR DELETE USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

-- Create RLS policies for answers
CREATE POLICY "Answers are viewable by everyone" ON public.answers FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create answers" ON public.answers FOR INSERT WITH CHECK (auth.uid() IS NOT NULL AND auth.uid() = user_id);
CREATE POLICY "Users can update their own answers" ON public.answers FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own answers OR admins can delete any" ON public.answers FOR DELETE USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

-- Create RLS policies for votes
CREATE POLICY "Question votes are viewable by everyone" ON public.question_votes FOR SELECT USING (true);
CREATE POLICY "Authenticated users can manage their own question votes" ON public.question_votes FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Answer votes are viewable by everyone" ON public.answer_votes FOR SELECT USING (true);
CREATE POLICY "Authenticated users can manage their own answer votes" ON public.answer_votes FOR ALL USING (auth.uid() = user_id);

-- Create RLS policies for follows
CREATE POLICY "User follows are viewable by everyone" ON public.user_follows FOR SELECT USING (true);
CREATE POLICY "Users can manage their own follows" ON public.user_follows FOR ALL USING (auth.uid() = follower_id);

-- Create function to automatically create profile when user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, display_name)
  VALUES (NEW.id, NEW.raw_user_meta_data ->> 'display_name');
  
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'user');
  
  RETURN NEW;
END;
$$;

-- Create trigger for new user profile creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update question answer count
CREATE OR REPLACE FUNCTION public.update_question_answer_count()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.questions
    SET answer_count = answer_count + 1
    WHERE id = NEW.question_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.questions
    SET answer_count = answer_count - 1
    WHERE id = OLD.question_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$;

-- Create triggers for answer count updates
CREATE TRIGGER update_question_answer_count_on_insert
  AFTER INSERT ON public.answers
  FOR EACH ROW EXECUTE FUNCTION public.update_question_answer_count();

CREATE TRIGGER update_question_answer_count_on_delete
  AFTER DELETE ON public.answers
  FOR EACH ROW EXECUTE FUNCTION public.update_question_answer_count();

-- Create function to update vote counts
CREATE OR REPLACE FUNCTION public.update_question_vote_counts()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    IF NEW.vote_type = 1 THEN
      UPDATE public.questions SET upvotes = upvotes + 1 WHERE id = NEW.question_id;
    ELSE
      UPDATE public.questions SET downvotes = downvotes + 1 WHERE id = NEW.question_id;
    END IF;
    RETURN NEW;
  ELSIF TG_OP = 'UPDATE' THEN
    -- Remove old vote
    IF OLD.vote_type = 1 THEN
      UPDATE public.questions SET upvotes = upvotes - 1 WHERE id = OLD.question_id;
    ELSE
      UPDATE public.questions SET downvotes = downvotes - 1 WHERE id = OLD.question_id;
    END IF;
    -- Add new vote
    IF NEW.vote_type = 1 THEN
      UPDATE public.questions SET upvotes = upvotes + 1 WHERE id = NEW.question_id;
    ELSE
      UPDATE public.questions SET downvotes = downvotes + 1 WHERE id = NEW.question_id;
    END IF;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    IF OLD.vote_type = 1 THEN
      UPDATE public.questions SET upvotes = upvotes - 1 WHERE id = OLD.question_id;
    ELSE
      UPDATE public.questions SET downvotes = downvotes - 1 WHERE id = OLD.question_id;
    END IF;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$;

-- Create triggers for question vote updates
CREATE TRIGGER update_question_vote_counts_trigger
  AFTER INSERT OR UPDATE OR DELETE ON public.question_votes
  FOR EACH ROW EXECUTE FUNCTION public.update_question_vote_counts();

-- Create function to update answer vote counts
CREATE OR REPLACE FUNCTION public.update_answer_vote_counts()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    IF NEW.vote_type = 1 THEN
      UPDATE public.answers SET upvotes = upvotes + 1 WHERE id = NEW.answer_id;
    ELSE
      UPDATE public.answers SET downvotes = downvotes + 1 WHERE id = NEW.answer_id;
    END IF;
    RETURN NEW;
  ELSIF TG_OP = 'UPDATE' THEN
    -- Remove old vote
    IF OLD.vote_type = 1 THEN
      UPDATE public.answers SET upvotes = upvotes - 1 WHERE id = OLD.answer_id;
    ELSE
      UPDATE public.answers SET downvotes = downvotes - 1 WHERE id = OLD.answer_id;
    END IF;
    -- Add new vote
    IF NEW.vote_type = 1 THEN
      UPDATE public.answers SET upvotes = upvotes + 1 WHERE id = NEW.answer_id;
    ELSE
      UPDATE public.answers SET downvotes = downvotes + 1 WHERE id = NEW.answer_id;
    END IF;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    IF OLD.vote_type = 1 THEN
      UPDATE public.answers SET upvotes = upvotes - 1 WHERE id = OLD.answer_id;
    ELSE
      UPDATE public.answers SET downvotes = downvotes - 1 WHERE id = OLD.answer_id;
    END IF;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$;

-- Create triggers for answer vote updates
CREATE TRIGGER update_answer_vote_counts_trigger
  AFTER INSERT OR UPDATE OR DELETE ON public.answer_votes
  FOR EACH ROW EXECUTE FUNCTION public.update_answer_vote_counts();

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_questions_updated_at
  BEFORE UPDATE ON public.questions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_answers_updated_at
  BEFORE UPDATE ON public.answers
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert some sample topics
INSERT INTO public.topics (name, description, color) VALUES
('Contract Law', 'Legal agreements and contractual obligations', '#3B82F6'),
('Criminal Law', 'Criminal offenses and legal procedures', '#EF4444'),
('Corporate Law', 'Business law and corporate governance', '#10B981'),
('Family Law', 'Marriage, divorce, and family legal matters', '#F59E0B'),
('Property Law', 'Real estate and property rights', '#8B5CF6'),
('Employment Law', 'Workplace rights and employment issues', '#06B6D4');