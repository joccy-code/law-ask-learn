-- Fix security warnings by setting proper search_path for all functions
CREATE OR REPLACE FUNCTION public.update_question_answer_count()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
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

CREATE OR REPLACE FUNCTION public.update_question_vote_counts()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
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

CREATE OR REPLACE FUNCTION public.update_answer_vote_counts()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
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

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;