from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from app.routes import router
import os

# Initialize FastAPI app
app = FastAPI(
    title="Audit Smart AI API",
    description="API for smart contract auditing with AI-powered analysis",
    version="1.0.0"
)

# ✅ CORS Configuration (for development)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (adjust for production)
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods
    allow_headers=["*"],  # Allow all headers
)

# ✅ Serve static files (reports and contracts)
app.mount("/reports", StaticFiles(directory="reports"), name="reports")
app.mount("/contracts", StaticFiles(directory="contracts"), name="contracts")

# Include your API router
app.include_router(router)

# Create required directories if they don't exist
os.makedirs("reports", exist_ok=True)
os.makedirs("contracts", exist_ok=True)

# Health check endpoint
@app.get("/")
async def health_check():
    return {
        "status": "running",
        "service": "Audit Smart AI",
        "version": "1.0.0"
    }