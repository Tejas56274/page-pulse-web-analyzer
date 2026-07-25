import httpx
from fastapi import APIRouter, HTTPException
from app.models import AnalyzeRequest, AnalyzeResponse
from app.services import analyze_website

router = APIRouter()


@router.post("/analyze", response_model=AnalyzeResponse)
async def analyze(request: AnalyzeRequest):
    try:
        result = analyze_website(str(request.url))
    except httpx.TimeoutException:
        raise HTTPException(
            status_code=504,
            detail="The request to the target website timed out."
        )
    except httpx.RequestError:
        raise HTTPException(
            status_code=400,
            detail="Could not reach the provided URL. Please check it and try again."
        )
    return result
