import json
import os
from typing import List, Dict
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

app = FastAPI(title="RealRails Network Intelligence Workspace Engine")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class RailMetricPackage(BaseModel):
    id: str
    name: str
    region: str
    country_code: str
    efficiency: str
    integrity: str
    volume_trend: str
    why_this_matters: str
    who_controls: str
    coordinates: List[float]
    launch_year: str
    is_synthetic: bool = True

def locate_and_load_json() -> List[Dict]:
    """Scans multiple relative paths to safely locate the target data folder."""
    base_dir = os.path.dirname(__file__)
    
    # Try multiple common relative paths depending on how VS Code opened the folder
    possible_paths = [
        os.path.join(base_dir, "..", "data", "payment_rail_mock_package.json"),
        os.path.join(base_dir, "data", "payment_rail_mock_package.json"),
        os.path.join(os.getcwd(), "data", "payment_rail_mock_package.json"),
        os.path.join(os.getcwd(), "..", "data", "payment_rail_mock_package.json")
    ]
    
    target_path = None
    for path in possible_paths:
        if os.path.exists(path):
            target_path = path
            break
            
    if not target_path:
        # Fallback dataset: If the file is physically missing, serve valid objects directly 
        # so the application NEVER returns a 500 error or a blank screen!
        return [
            {
                "id": "fednow", "name": "FedNow", "region": "United States", "country_code": "US",
                "efficiency": "Instant (< 2 seconds)", "integrity": "24/7/365 continuous uptime",
                "volume_trend": "Exponential growth stage", "launch_year": "2023", "coordinates": [37.0902, -95.7129],
                "why_this_matters": "Provides immediate interbank settlement across the US.",
                "who_controls": "The Federal Reserve System", "is_synthetic": True
            },
            {
                "id": "sepa", "name": "SEPA Instant Credit Transfer", "region": "Eurozone", "country_code": "EU",
                "efficiency": "Instant (< 10 seconds)", "integrity": "99.99% operational reliability",
                "volume_trend": "High / Stable adoption", "launch_year": "2017", "coordinates": [48.5667, 13.4333],
                "why_this_matters": "Unifies cross-border Euro transactions.",
                "who_controls": "The European Payments Council", "is_synthetic": True
            },
            {
                "id": "upi", "name": "UPI (Unified Payments Interface)", "region": "India", "country_code": "IN",
                "efficiency": "Real-time instant settlement", "integrity": "High-throughput matrix",
                "volume_trend": "World-leading transaction velocity", "launch_year": "2016", "coordinates": [20.5937, 78.9629],
                "why_this_matters": "Drives massive retail financial inclusion.",
                "who_controls": "NPCI", "is_synthetic": True
            }
        ]

    try:
        with open(target_path, "r") as file_stream:
            payload = json.load(file_stream)
            # Support both direct arrays and wrapped metadata objects
            if isinstance(payload, dict):
                return payload.get("records", [])
            return payload
    except Exception:
        # Emergency recovery fallback to guarantee 200 OK status
        return []

@app.get("/api/v1/rails", response_model=List[RailMetricPackage])
def get_all_active_rails():
    return locate_and_load_json()

@app.get("/api/v1/rails/download/{rail_id}")
def download_synthetic_package_json(rail_id: str):
    records = locate_and_load_json()
    target_key = rail_id.lower().strip()
    matched_node = next((item for item in records if item.get("id", "").lower() == target_key), None)
    if not matched_node:
        raise HTTPException(status_code=404, detail="Payment rail structure missing.")
    return matched_node