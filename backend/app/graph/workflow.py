from langgraph.graph import StateGraph, END
from backend.app.graph.state import AgentState

from backend.app.agents.diagnosis import data_analysis_agent, diagnosis_agent
from backend.app.agents.engagement import customer_engagement_agent
from backend.app.agents.scheduling import scheduling_agent
from backend.app.agents.insights import insights_agent

workflow = StateGraph(AgentState)

# Nodes
workflow.add_node("data_analysis", data_analysis_agent)
workflow.add_node("diagnosis", diagnosis_agent)
workflow.add_node("engagement", customer_engagement_agent)
workflow.add_node("scheduling", scheduling_agent)
workflow.add_node("insights", insights_agent)

# Entry
workflow.set_entry_point("data_analysis")

# Flow
workflow.add_edge("data_analysis", "diagnosis")
workflow.add_edge("diagnosis", "engagement")

# Conditional Logic for Demo API:
# We stop at engagement to wait for user input (handled in main.py)
workflow.add_edge("engagement", END) 

# Sub-graph for post-approval
workflow.add_edge("scheduling", "insights")
workflow.add_edge("insights", END)

app_workflow = workflow.compile()