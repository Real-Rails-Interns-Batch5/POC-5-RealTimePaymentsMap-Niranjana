# POC-5-RealTimePaymentsMap-Niranjana
#  Real-Time Payments Map Intelligence Engine

A full-stack operational tracking dashboard designed to monitor and visualize international payment rails in real time.

##  Project Overview
This workspace processes high-frequency geospatial financial telemetry logs, translating transaction pathways across global systems (FedNow, SEPA, UPI) into immediate map layer visual insights.

##  Problem Statement
Tabular system logs obscure real-time trends. Operators cannot quickly isolate localized network failures, latency spikes, or cross-border payment rail disconnects without an intuitive spatial tracking canvas.

##  Architecture Summary
Built on a modern, decoupled full-stack architecture to maintain isolated execution states:
* **Frontend UI Studio (Next.js & React-Leaflet):** Renders the dark-mode geospatial dashboard map using a 70% canvas and 30% analytics sidebar grid layout.
* **Backend Core Engine (FastAPI & Python):** A synthetic mock data generation package that dynamically computes valid transactional entity schemas and error state edge cases.

##  Setup Instructions

### 1. Clone the repository and navigate into the project folder
git clone https://github.com/Real-Rails-Interns-Batch5/POC-5-RealTimePaymentsMap-Niranjana.git
cd POC-5-RealTimePaymentsMap-Niranjana

### 2. Setup & Start the Backend (FastAPI)
cd backend
python -m venv venv
 On Windows execution policy:
.\venv\Scripts\Activate.ps1
 On macOS/Linux execution policy: source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000 &

### 3. Setup & Start the Frontend (Next.js)
 (Open a separate terminal window or tab first, then run):
cd ../frontend
npm install
npm run dev

## AI Usage Summary

​AI tools were strategically applied to construct scalable data dictionary object structures, optimize reactive Leaflet map-centering callbacks, and accelerate CORS middleware configuration routines.

## Future Enhancements

​Transition data transport channels from REST polling loops to Live WebSockets.
​Implement a Historical Time-Slider Controls layout matrix to review historical failure loops.
​Integrate an automated Multi-Currency Conversion Normalization pipeline.
