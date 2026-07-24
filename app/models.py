from pydantic import BaseModel, HttpUrl


class AnalyzeRequest(BaseModel):
    url: HttpUrl


class AnalyzeResponse(BaseModel):
    status: int
    response_time: str
    title: str
    meta_description: str
    h1_count: int
    missing_alt_images: int
    word_count: int