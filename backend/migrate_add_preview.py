#!/usr/bin/env python3
"""
Quick migration to add preview column to sessions table
"""

from supabase_logger import get_supabase_service
from config import get_settings

def run_migration():
    print("🔧 Running migration to add 'preview' column to sessions table...")
    
    service = get_supabase_service()
    client = service.get_client()
    
    # Add preview column using raw SQL
    try:
        # Note: Supabase client doesn't support ALTER TABLE directly
        # You'll need to run this in Supabase SQL Editor:
        print("\n⚠️  Please run this SQL in your Supabase SQL Editor:")
        print("-" * 60)
        print("""
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
        """)
        print("-" * 60)
        print("\n✅ After running the SQL above, your chat history will work!")
        
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    run_migration()
