"""
agents.py - Fixed Return Values & Model Name
"""
import json
import re
from typing import Dict, Any

from google import genai
from google.genai import types

from dotenv import load_dotenv

from config import get_settings
from schemas import MindMoneyState

load_dotenv()

# --- SHARED CLIENT FACTORY ---
def get_gemini_client():
    settings = get_settings()
    return genai.Client(api_key=settings.gemini_api_key)

def safe_parse_json(response_text: str | None) -> Dict[str, Any]:
    if not response_text: return {}
    try:
        text = re.sub(r'```json\s*', '', response_text)
        text = re.sub(r'```\s*', '', text)
        return json.loads(text.strip())
    except json.JSONDecodeError:
        return {}

# ============================================================================
# AGENT 1: INTAKE SPECIALIST
# ============================================================================
INTAKE_PROMPT = """You are an Intake Specialist. Output ONLY valid JSON.
Analyze the user's input:
{
  "emotions": {"anxiety": 0-10, "shame": 0-10},
  "identity_threats": ["list", "of", "threats"],
  "safety_flag": false,
  "validation_hook": "Validation sentence."
}"""

async def run_intake_agent(state: MindMoneyState):
    settings = get_settings()
    client = get_gemini_client()
    
    try:
        response = client.models.generate_content(
            model=settings.model_name,
            contents=f"SYSTEM: {INTAKE_PROMPT}\nUSER: {state['user_input']}",
            config=types.GenerateContentConfig(
                temperature=settings.intake_temperature,
                response_mime_type="application/json"
            )
        )
        data = safe_parse_json(response.text)
        
        log = {
            "agent": "Intake Specialist", 
            "thought": f"Anxiety: {data.get('emotions', {}).get('anxiety')}",
            "status": "complete"
        }
        
        # FIX: ONLY return the specific keys we changed.
        # Do NOT return "**state".
        return {
            "intake_profile": data, 
            "agent_log": [log] # List will be appended automatically due to schemas.py
        }
        
    except Exception as e:
        print(f"❌ Intake Error: {e}")
        # Return empty partial update on error
        return {"agent_log": [{"agent": "Intake Specialist", "thought": f"Error: {e}"}]}

# ============================================================================
# AGENT 2: WEALTH ARCHITECT
# ============================================================================
WEALTH_PROMPT = """You are a Financial Planner. Output ONLY valid JSON.
Extract entities:
{
  "entities": [{"item": "Name", "amount": 0, "type": "debt"}],
  "missing_info": ["income", "etc"],
  "plan_draft": {"strategy": "Name", "steps": ["1", "2"]}
}"""

async def run_financial_agent(state: MindMoneyState):
    settings = get_settings()
    client = get_gemini_client()
    
    try:
        response = client.models.generate_content(
            model=settings.model_name,
            contents=f"SYSTEM: {WEALTH_PROMPT}\nUSER: {state['user_input']}",
            config=types.GenerateContentConfig(
                temperature=settings.planner_temperature,
                response_mime_type="application/json"
            )
        )
        data = safe_parse_json(response.text)
        
        log = {
            "agent": "Wealth Architect", 
            "thought": f"Found {len(data.get('entities', []))} entities",
            "status": "complete"
        }
        
        # FIX: ONLY return new data
        return {
            "financial_profile": data, 
            "agent_log": [log]
        }
        
    except Exception as e:
        print(f"❌ Wealth Error: {e}")
        return {"agent_log": [{"agent": "Wealth Architect", "thought": f"Error: {e}"}]}

# ============================================================================
# AGENT 3: CARE MANAGER
# ============================================================================
CARE_PROMPT = """You are a Holistic Wealth Coach.
Synthesize the reports below into a text response.
Rules:
1. Anxiety > 8: Focus on calm.
2. Anxiety < 5: Focus on plan.
"""

async def run_synthesizer_agent(state: MindMoneyState):
    settings = get_settings()
    client = get_gemini_client()
    
    # Use .get() with defaults since parallel agents might have failed
    intake = state.get("intake_profile") or {}
    wealth = state.get("financial_profile") or {}
    
    context = f"""
    USER: {state['user_input']}
    INTAKE: {json.dumps(intake)}
    WEALTH: {json.dumps(wealth)}
    """
    
    try:
        response = client.models.generate_content(
            model=settings.model_name,
            contents=f"SYSTEM: {CARE_PROMPT}\nCONTEXT: {context}",
            config=types.GenerateContentConfig(
                temperature=settings.synthesizer_temperature
            )
        )
        
        final_text = response.text if response.text else "System busy."
        
        log = {
            "agent": "Care Manager", 
            "thought": "Response synthesized.", 
            "status": "complete"
        }
        
        return {
            "final_response": final_text, 
            "agent_log": [log]
        }
        
    except Exception as e:
        print(f"❌ Synthesizer Error: {e}")
        return {"final_response": "System Error."}