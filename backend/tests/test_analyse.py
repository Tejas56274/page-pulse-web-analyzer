"""
Tests for the POST /analyze endpoint.

Run with:
    cd backend
    pytest -v
"""

from unittest.mock import patch, MagicMock

import httpx
import pytest
from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def _mock_response(status_code=200, url="https://example.com", text="<html></html>"):
    """Builds a fake httpx.Response-like object for mocking httpx.get."""
    mock_resp = MagicMock()
    mock_resp.status_code = status_code
    mock_resp.url = url
    mock_resp.text = text
    return mock_resp


class TestHappyPath:
    def test_analyze_returns_200_and_expected_fields(self):
        html = """
        <html>
            <head>
                <title>Example Domain</title>
                <meta name="description" content="An example page for testing">
            </head>
            <body>
                <h1>Example Domain</h1>
                <img src="a.png" alt="a" />
            </body>
        </html>
        """

        with patch("app.parser.httpx.get") as mock_get:
            mock_get.side_effect = [
                _mock_response(200, "https://example.com", html),  # main page
                _mock_response(404),  # robots.txt
                _mock_response(404),  # sitemap.xml
            ]

            response = client.post("/analyze", json={"url": "https://example.com"})

        assert response.status_code == 200
        data = response.json()

        assert data["status"] == 200
        assert data["title"] == "Example Domain"
        assert data["meta_description"] == "An example page for testing"
        assert data["h1_count"] == 1
        assert data["missing_alt_images"] == 0
        assert data["https_enabled"] is True
        assert data["robots_txt"] is False
        assert data["sitemap_xml"] is False
        assert 0 <= data["seo_score"] <= 100
        assert "response_time" in data


class TestInvalidUrl:
    def test_missing_url_field_returns_422(self):
        response = client.post("/analyze", json={})
        assert response.status_code == 422

    def test_malformed_url_returns_422(self):
        # "not-a-url" fails pydantic's HttpUrl validation before it ever
        # reaches the analyzer, so no network mocking is required here.
        response = client.post("/analyze", json={"url": "not-a-url"})
        assert response.status_code == 422

    def test_unsupported_scheme_returns_422(self):
        response = client.post("/analyze", json={"url": "ftp://example.com"})
        assert response.status_code == 422


class TestTimeout:
    def test_timeout_returns_504(self):
        with patch("app.parser.httpx.get") as mock_get:
            mock_get.side_effect = httpx.TimeoutException("Request timed out")

            response = client.post(
                "/analyze", json={"url": "https://slow-website.example.com"}
            )

        assert response.status_code == 504
        assert "timed out" in response.json()["detail"].lower()

    def test_connection_error_returns_400(self):
        with patch("app.parser.httpx.get") as mock_get:
            mock_get.side_effect = httpx.ConnectError("Connection failed")

            response = client.post(
                "/analyze", json={"url": "https://unreachable.example.com"}
            )

        assert response.status_code == 400