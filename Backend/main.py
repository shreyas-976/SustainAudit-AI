from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Import routers
from routers.audit import router as audit_router
from routers.compare import router as compare_router
from routers.watchlist import router as watchlist_router

app = FastAPI(title="SustainAudit AI Backend")

# Enable CORS (Frontend connection)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Health check route
@app.get("/")
def root():
    return {"message": "SustainAudit Backend Running"}

# Mount routers
app.include_router(audit_router, prefix="/audit", tags=["Audit"])
app.include_router(compare_router, prefix="/compare", tags=["Compare"])
app.include_router(watchlist_router, prefix="/watchlist", tags=["Watchlist"])