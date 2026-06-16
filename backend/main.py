import json
import random
from typing import List, Dict
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

app = FastAPI(
    title="RealRails Network Intelligence Workspace Engine",
    version="1.0.0"
)

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
    is_synthetic: bool = Field(True, description="LABEL INDICATOR: Verifies data is a synthetic asset.")

# Base templates used to construct the dynamic objects procedurally
TEMPLATES = {
    "fednow": {
        "id": "fednow", "name": "FedNow", "region": "United States", "country_code": "US",
        "why_this_matters": "Provides immediate interbank settlement across the US, mitigating counterparty risk and freeing up trapped liquidity.",
        "who_controls": "The Federal Reserve System (US Central Bank Administration)", "coordinates": [37.0902, -95.7129], "launch_year": "2023"
    },
    "sepa": {
        "id": "sepa", "name": "SEPA Instant Credit Transfer", "region": "Eurozone", "country_code": "EU",
        "why_this_matters": "Unifies cross-border Euro transactions across dozens of states under a single, standardized legal rulebook.",
        "who_controls": "The European Payments Council (EPC)", "coordinates": [48.5667, 13.4333], "launch_year": "2017"
    },
    "upi": {
        "id": "upi", "name": "UPI (Unified Payments Interface)", "region": "India", "country_code": "IN",
        "why_this_matters": "Drives massive retail financial inclusion by abstracting complex bank layers into an open source, smartphone-native alias system.",
        "who_controls": "National Payments Corporation of India (NPCI)", "coordinates": [20.5937, 78.9629], "launch_year": "2016"
    }
}

def build_dynamic_node(key: str) -> Dict:
    """Generates operational thresholds procedurally to ensure values are truly dynamic."""
    src = TEMPLATES[key]
    
    # Randomly vary processing speeds and health states so data is never static
    rand_ms = random.randint(1, 9)
    efficiencies = [f"Instant (< {rand_ms} seconds)", "Real-time instant settlement", "Processing immediate execution"]
    status_pool = ["99.99% operational reliability", "24/7/365 continuous uptime", "High-throughput fault-tolerant matrix"]
    
    return {
        **src,
        "efficiency": random.choice(efficiencies),
        "integrity": random.choice(status_pool),
        "volume_trend": f"Growth scale trend matrix: {random.choice(['Exponential expansion', 'High stable adoption', 'World-leading velocity'])}",
        "is_synthetic": True
    }

@app.get("/api/v1/rails", response_model=List[RailMetricPackage])
def get_all_active_rails():
    return [build_dynamic_node(k) for k in TEMPLATES.keys()]

@app.get("/api/v1/rails/download/{rail_id}")
def download_synthetic_package_json(rail_id: str):
    target_key = rail_id.lower().strip()
    if target_key not in TEMPLATES:
        raise HTTPException(status_code=404, detail="Entity missing from scope repository context.")
    return build_dynamic_node(target_key)