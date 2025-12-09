from app.graph.state import AgentState
from app.config import llm
from app.tools.vector_store import search_rca_docs
from langchain_core.prompts import ChatPromptTemplate

def insights_agent(state: AgentState):
    """RAG: Retrieves docs and uses Gemini to generate insights."""
    print("--- 🏭 Generating Manufacturing Insights (RAG) ---")
    
    if not state.get("booking_confirmation"):
        return state
    
    try:
        diagnosis = state['diagnosis_result']
        if not diagnosis:
            state['manufacturing_insight'] = "No diagnosis available for insights generation."
            return state
            
        component = diagnosis.probable_component
        
        # 1. Retrieve relevant docs from Vector DB
        docs = search_rca_docs(component)
        context_text = "\n\n".join([d.page_content for d in docs]) if docs else "No historical data available."
        
        # 2. Synthesize Insight using LLM
        prompt = ChatPromptTemplate.from_template(
            """
            You are a Manufacturing Quality Engineer.
            A field failure occurred for: {component}.
            
            Here are historical RCA documents retrieved from the database:
            {context}
            
            Based on this, generate a concise technical alert (max 1 sentence) 
            linking this new failure to past patterns.
            """
        )
        
        chain = prompt | llm
        res = chain.invoke({"component": component, "context": context_text})
        
        state['manufacturing_insight'] = res.content
        print(f"✅ Insight Generated: {res.content}")
    except Exception as e:
        print(f"❌ Error generating insight: {e}")
        state['manufacturing_insight'] = f"Manufacturing insight generation pending for {state.get('diagnosis_result', {}).get('probable_component', 'unknown component')}."
    
    return state