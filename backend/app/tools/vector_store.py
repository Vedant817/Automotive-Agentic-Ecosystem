import os
from langchain_chroma import Chroma
from langchain_core.documents import Document  # <--- FIXED IMPORT
from app.config import embeddings

# Persist data locally so we don't lose it
PERSIST_DIRECTORY = "./data/vector_store"

# Initialize Vector DB
vector_db = Chroma(
    persist_directory=PERSIST_DIRECTORY,
    embedding_function=embeddings,
    collection_name="rca_documents"
)

def initialize_vector_db():
    """Seeds the DB with dummy manufacturing data if empty."""
    # Check if DB is empty by trying a simple get
    existing_docs = vector_db.get()
    if len(existing_docs['ids']) > 0:
        print("✅ Vector DB already loaded.")
        return

    print("⚠️ Vector DB empty. Seeding with mock RCA documents...")
    
    # Synthetic Manufacturing Reports (RCA/CAPA)
    mock_docs = [
        Document(
            page_content="RCA-001: Recurring failure in Water Pump Gaskets (Supplier: GasketKing). Issue is thermal degradation above 100C. Mitigation: Switch to high-temp polymer.",
            metadata={"source": "RCA-001.pdf", "component": "Cooling System"}
        ),
        Document(
            page_content="RCA-002: Ignition Coil failure in Batch #492 due to micro-cracking in insulation. Causes misfire P0301 code.",
            metadata={"source": "RCA-002.pdf", "component": "Ignition Coil"}
        ),
        Document(
            page_content="RCA-003: Oil Pressure Sensor false positives caused by loose connector pins in Model Y (2024).",
            metadata={"source": "RCA-003.pdf", "component": "Oil Sensor"}
        )
    ]
    
    vector_db.add_documents(mock_docs)
    print(f"✅ Seeded {len(mock_docs)} documents into Vector DB.")

def search_rca_docs(query: str, k=2):
    """Performs semantic search on the vector store."""
    return vector_db.similarity_search(query, k=k)