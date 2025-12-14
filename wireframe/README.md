# Agentic Automotive Service Platform

This project is a **Next.js 14** prototype demonstrating an **Agentic AI architecture** for automotive service orchestration. It simulates a system where multiple specialized AI agents collaborate to diagnose vehicle issues, correlate them with historical data, and schedule appointments.

## 🚀 Getting Started

1.  **Install Dependencies:**
    ```bash
    npm install
    ```

2.  **Run Development Server:**
    ```bash
    npm run dev
    ```

3.  **Open in Browser:**
    Navigate to `http://localhost:3000`

## 🧠 System Architecture

The system is powered by a **Master Agent** that orchestrates the following specialized sub-agents:

*   **Customer Data Agent:** Collects and structures raw symptom data.
*   **Report Generation Agent:** Creates a standardized diagnostic report.
*   **Diagnosis Agent:** Matches symptoms to hardcoded fault rules.
*   **History Correlation Agent:** Checks for recurring batch defects (e.g., "Batch-X").
*   **Notification Agent:** Generates user-facing messages and appointment requests.

## 📂 Project Structure

*   `src/agents/`: Contains the logic for all AI agents.
*   `src/mockData/`: Hardcoded JSON data (Vehicles, Service History).
*   `src/app/api/orchestrate/`: Next.js API route acting as the agent backend.
*   `src/app/customer/dashboard`: Patient-facing portal for reporting issues.
*   `src/app/company/dashboard`: Service center view for monitoring agent activity.

## 🌟 Key Scenarios to Test

1.  **Standard Diagnosis:**
    *   Go to **Customer Dashboard**.
    *   Select "Strange Noise" and "Engine Overheating".
    *   Submit the report.
    *   Watch the **Agent Timeline** visualize the decision process.

2.  **Batch Defect Detection (Company View):**
    *   Go to **Company Dashboard**.
    *   Select **Case #101**.
    *   Observe how the **History Agent** identifies "Batch-X" based on the diagnosis.