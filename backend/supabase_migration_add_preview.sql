-- Add preview column to sessions table
-- Run this in your Supabase SQL Editor

ALTER TABLE sessions
ADD COLUMN IF NOT EXISTS preview TEXT;

-- Update existing sessions to have a preview from their first message
UPDATE sessions s
SET preview = (
    SELECT SUBSTRING(user_message, 1, 100) 
    FROM conversation_turns ct
    WHERE ct.session_id = s.session_id
    ORDER BY ct.turn_number ASC
    LIMIT 1
)
WHERE preview IS NULL;
