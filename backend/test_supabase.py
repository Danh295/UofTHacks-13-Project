#!/usr/bin/env python3
"""
Test Supabase Configuration
Run this to verify your Supabase setup is working correctly.
"""

from supabase_logger import get_supabase_service
from config import get_settings

def test_supabase():
    print("🔍 Testing Supabase Configuration...\n")
    
    # Test 1: Load settings
    print("1️⃣ Loading settings...")
    settings = get_settings()
    print(f"   ✅ Supabase URL: {settings.supabase_url}")
    print(f"   ✅ API Key: {settings.supabase_key[:20]}...")
    
    # Test 2: Create service
    print("\n2️⃣ Creating Supabase service...")
    service = get_supabase_service()
    print("   ✅ Service created")
    
    # Test 3: Get client
    print("\n3️⃣ Initializing Supabase client...")
    client = service.get_client()
    print("   ✅ Client initialized")
    
    # Test 4: Check if tables exist
    print("\n4️⃣ Checking database tables...")
    try:
        # Try to query the sessions table
        result = client.table("sessions").select("*").limit(1).execute()
        print("   ✅ 'sessions' table accessible")
    except Exception as e:
        print(f"   ⚠️  'sessions' table issue: {str(e)}")
        print("      Run supabase_schema.sql in your Supabase SQL Editor")
    
    try:
        # Try to query the conversation_turns table
        result = client.table("conversation_turns").select("*").limit(1).execute()
        print("   ✅ 'conversation_turns' table accessible")
    except Exception as e:
        print(f"   ⚠️  'conversation_turns' table issue: {str(e)}")
        print("      Run supabase_schema.sql in your Supabase SQL Editor")
    
    try:
        # Try to query the agent_logs table
        result = client.table("agent_logs").select("*").limit(1).execute()
        print("   ✅ 'agent_logs' table accessible")
    except Exception as e:
        print(f"   ⚠️  'agent_logs' table issue: {str(e)}")
        print("      Run supabase_schema.sql in your Supabase SQL Editor")
    
    print("\n✅ Supabase is configured and connected!")
    print("\n📝 Next steps:")
    print("   1. Make sure you've run supabase_schema.sql in your Supabase SQL Editor")
    print("   2. For user authentication, run supabase_auth_schema.sql as well")
    print("   3. Start your backend: uvicorn main:app --reload")

if __name__ == "__main__":
    try:
        test_supabase()
    except Exception as e:
        print(f"\n❌ Error: {str(e)}")
        print("\nTroubleshooting:")
        print("   1. Check your SUPABASE_URL in .env or config.py")
        print("   2. Check your SUPABASE_KEY in .env or config.py")
        print("   3. Verify your Supabase project is running")
        print("   4. Run: pip install supabase")
