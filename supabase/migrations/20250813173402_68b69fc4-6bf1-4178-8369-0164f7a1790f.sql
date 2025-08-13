-- Create enum for warning types
CREATE TYPE public.warning_type AS ENUM ('spam', 'inappropriate_content', 'harassment', 'plagiarism', 'off_topic', 'other');

-- Create enum for warning severity
CREATE TYPE public.warning_severity AS ENUM ('low', 'medium', 'high', 'critical');

-- Create user_warnings table
CREATE TABLE public.user_warnings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  warning_type warning_type NOT NULL,
  severity warning_severity NOT NULL DEFAULT 'medium',
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  issued_by UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE,
  is_acknowledged BOOLEAN NOT NULL DEFAULT false,
  acknowledged_at TIMESTAMP WITH TIME ZONE,
  related_content_type TEXT, -- 'question', 'answer', etc.
  related_content_id UUID
);

-- Enable RLS
ALTER TABLE public.user_warnings ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own warnings" 
ON public.user_warnings 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all warnings" 
ON public.user_warnings 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::user_role));

-- Create function to update acknowledged timestamp
CREATE OR REPLACE FUNCTION public.acknowledge_warning()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.is_acknowledged = true AND OLD.is_acknowledged = false THEN
    NEW.acknowledged_at = now();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for acknowledgment
CREATE TRIGGER update_warning_acknowledgment
BEFORE UPDATE ON public.user_warnings
FOR EACH ROW
EXECUTE FUNCTION public.acknowledge_warning();