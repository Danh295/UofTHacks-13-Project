# 🔧 Chat History Fix - Complete Guide

## What Was Fixed

The chat history wasn't displaying because:
1. The `/api/sessions` endpoint was returning empty data
2. The `sessions` table was missing the `preview` column
3. Sessions weren't being created/updated when chats happened

## Changes Made

### Backend Code Updated ✅
- [main.py](backend/main.py) - `/api/sessions` now fetches real sessions from database
- [supabase_logger.py](backend/supabase_logger.py) - Enhanced to store session previews
- Backend server has been restarted with new code

### Database Migration Required ⚠️

You need to add the `preview` column to your Supabase `sessions` table.

## How to Apply the Database Migration

### Option 1: Supabase SQL Editor (Recommended)

1. Go to your Supabase project: https://supabase.com/dashboard
2. Navigate to **SQL Editor** in the left sidebar
3. Click **New Query**
4. Copy and paste this SQL:

```sql
-- Add preview column to sessions table
ALTER TABLE sessions
ADD COLUMN IF NOT EXISTS preview TEXT;

-- Update existing sessions with preview from first message
UPDATE sessions s
SET preview = (
    SELECT SUBSTRING(user_message, 1, 100) 
    FROM conversation_turns ct
    WHERE ct.session_id = s.session_id
    ORDER BY ct.turn_number ASC
    LIMIT 1
)
WHERE preview IS NULL;
```

5. Click **Run** (or press Cmd/Ctrl + Enter)
6. You should see "Success. No rows returned"

### Option 2: Using the Migration File

The SQL is already saved in: [supabase_migration_add_preview.sql](backend/supabase_migration_add_preview.sql)

## How to Test

1. **Start a new chat** in your MindMoney app
2. Send a message like "I want to save $5000"
3. Click the **History** button (left sidebar)
4. You should now see your conversation listed!

## What Should Happen Now

✅ Chat sessions are saved to database  
✅ Each session shows a preview of the first message  
✅ Sessions are sorted by most recent  
✅ Clicking a session loads the full chat history  
✅ "Today", "Yesterday", and date labels work correctly  

## Troubleshooting

### "No chat history yet" message still shows
- Make sure you've run the SQL migration above
- Start a **new conversation** (old ones might not have been saved properly)
- Check that your backend is running on port 8000

### Sessions appear but have no preview
- Run the second part of the SQL migration (the UPDATE query)
- This will populate previews for existing sessions

### Backend not running
```bash
cd backend
python3 -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

## Testing the API Directly

You can test the sessions endpoint with:
```bash
curl http://localhost:8000/api/sessions | python3 -m json.tool
```

Should return:
```json
{
  "sessions": [
    {
      "session_id": "session-1737...",
      "preview": "I want to save $5000",
      "last_message_at": "2026-01-17T...",
      "created_at": "2026-01-17T..."
    }
  ]
}
```

## Summary

1. ✅ Backend code updated and restarted
2. ⚠️ **YOU NEED TO:** Run the SQL migration in Supabase
3. ✅ Start chatting and your history will now be saved!
