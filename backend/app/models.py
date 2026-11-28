from pydantic import BaseModel, HttpUrl


class AnalyzeRequest(BaseModel):
    """Request model containing the URL to analyze."""

    url: HttpUrl


class AnalyzeResponse(BaseModel):
    """Response model returned after analyzing a website."""

    status: int
    response_time: str
    title: str
    meta_description: str
    h1_count: int
    missing_alt_images: int
    word_count: int
    seo_score: int
    https_enabled: bool
    robots_txt: bool
    sitemap_xml: bool