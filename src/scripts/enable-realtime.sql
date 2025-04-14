
-- Enable replication for the interviewers table
ALTER TABLE public.interviewers REPLICA IDENTITY FULL;

-- Add the interviewers table to the supabase_realtime publication
BEGIN;
  -- Check if the publication exists
  SELECT EXISTS (
    SELECT 1
    FROM pg_publication
    WHERE pubname = 'supabase_realtime'
  );

  -- If it exists, add the interviewers table to it
  ALTER PUBLICATION supabase_realtime ADD TABLE public.interviewers;
COMMIT;
