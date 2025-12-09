from app.graph.state import AgentState
from app.config import llm
from langchain_core.prompts import ChatPromptTemplate

def customer_engagement_agent(state: AgentState):
    """Uses Gemini to generate a persuasive message."""
    print("--- Engaging Customer (LLM) ---")
    diagnosis = state['diagnosis_result']
    
    # If we already have history, don't regenerate the greeting
    if state.get("chat_history"):
        return state

    # Fallback message if no diagnosis
    if not diagnosis:
        initial_message = "Hello! I'm your vehicle service assistant. How can I help you today?"
        state['chat_history'] = [{"role": "assistant", "content": initial_message}]
        return state

    try:
        prompt_template = ChatPromptTemplate.from_template(
            """
            You are a friendly, professional service assistant for Hero Auto.
            A vehicle has reported the following critical issue:
            - Component: {component}
            - Fault: {fault}
            - Recommendation: {recommendation}

            Write a short, persuasive message (max 2 sentences) to the owner, 'Alex'.
            Inform them of the risk and ask if they want to book an appointment now.
            """
        )
        
        chain = prompt_template | llm
        
        response = chain.invoke({
            "component": diagnosis.probable_component,
            "fault": diagnosis.fault_description,
            "recommendation": diagnosis.recommendation
        })
        
        initial_message = response.content
    except Exception as e:
        print(f"Error generating message: {e}")
        initial_message = f"We've detected an issue with your {diagnosis.probable_component}. Would you like to schedule a service appointment?"
    
    state['chat_history'] = [{"role": "assistant", "content": initial_message}]
    
    return state