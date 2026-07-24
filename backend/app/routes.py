from fastapi import APIRouter
from app.models import AnalyzeRequest, AnalyzeResponse
from app.services import analyze_website

router = APIRouter()

@router.post("/analyze", response_model=AnalyzeResponse)
async def analyze(request: AnalyzeRequest):
    result = analyze_website(str(request.url))
    return result