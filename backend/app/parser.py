import time
import httpx
from bs4 import BeautifulSoup
from urllib.parse import urlparse


def analyze_page(url: str):
    start_time = time.time()

    headers = {
        "User-Agent": (
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
            "AppleWebKit/537.36 (KHTML, like Gecko) "
            "Chrome/138.0.0.0 Safari/537.36"
        ),
        "Accept": "text/html,application/xhtml+xml",
        "Accept-Language": "en-US,en;q=0.9"
    }

    response = httpx.get(
        url,
        headers=headers,
        timeout=10,
        follow_redirects=True
    )

    end_time = time.time()

    soup = BeautifulSoup(response.text, "lxml")

    # -------------------------
    # Basic Analysis
    # -------------------------

    title = soup.title.string.strip() if soup.title else "No Title"

    meta = soup.find("meta", attrs={"name": "description"})
    meta_description = (
        meta.get("content").strip()
        if meta and meta.get("content")
        else "No Meta Description"
    )

    h1_count = len(soup.find_all("h1"))

    images = soup.find_all("img")
    missing_alt = sum(1 for img in images if not img.get("alt"))

    text = soup.get_text(separator=" ")
    word_count = len(text.split())

    # -------------------------
    # HTTPS
    # -------------------------

    https_enabled = str(response.url).startswith("https://")

    # -------------------------
    # robots.txt & sitemap.xml
    # -------------------------

    parsed = urlparse(str(response.url))
    base_url = f"{parsed.scheme}://{parsed.netloc}"

    try:
        robots = httpx.get(
            base_url + "/robots.txt",
            headers=headers,
            timeout=5,
            follow_redirects=True
        )
        robots_txt = robots.status_code == 200
    except Exception:
        robots_txt = False

    try:
        sitemap = httpx.get(
            base_url + "/sitemap.xml",
            headers=headers,
            timeout=5,
            follow_redirects=True
        )
        sitemap_xml = sitemap.status_code == 200
    except Exception:
        sitemap_xml = False

    # -------------------------
    # SEO Score
    # -------------------------

    score = 0

    if https_enabled:
        score += 20

    if title != "No Title":
        score += 20

    if meta_description != "No Meta Description":
        score += 20

    if h1_count > 0:
        score += 20

    if missing_alt == 0:
        score += 20

    # -------------------------
    # Return Result
    # -------------------------

    return {
        "status": response.status_code,
        "response_time": f"{(end_time - start_time) * 1000:.2f} ms",
        "title": title,
        "meta_description": meta_description,
        "h1_count": h1_count,
        "missing_alt_images": missing_alt,
        "word_count": word_count,
        "seo_score": score,
        "https_enabled": https_enabled,
        "robots_txt": robots_txt,
        "sitemap_xml": sitemap_xml
    }