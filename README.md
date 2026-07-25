# 🚀 Page Pulse — Website Analyzer

Page Pulse is a full-stack web application that analyzes any website and returns instant SEO, performance, and health insights.

## 🌐 Live Demo

[page-pulse-web-analyzer.vercel.app](https://page-pulse-web-analyzer.vercel.app/)

## 📂 GitHub Repository

<https://github.com/Tejas56274/page-pulse-web-analyzer>

---

## ✨ Features

- Website status check
- Response time analysis
- SEO score calculation
- Page title detection
- Meta description detection
- H1 count
- Word count
- Missing ALT image detection
- HTTPS detection
- robots.txt detection
- sitemap.xml detection

---

## 🛠 Tech Stack

### Frontend
- React.js (Vite)
- Axios

### Backend
- FastAPI
- BeautifulSoup4
- httpx

---

## 🚀 Installation

### Clone the repository

```bash
git clone https://github.com/Tejas56274/page-pulse-web-analyzer.git
cd page-pulse-web-analyzer
```

### Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Backend runs at `http://127.0.0.1:8000`.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at `http://127.0.0.1:5173`.

---

## 📡 API Reference

### `POST /analyze`

**Request**
```json
{
  "url": "https://python.org"
}
```

**Response (200)**
```json
{
  "status": 200,
  "response_time": "614.00 ms",
  "title": "Welcome to Python.org",
  "meta_description": "The official home of the Python Programming Language",
  "h1_count": 1,
  "missing_alt_images": 0,
  "word_count": 512,
  "seo_score": 100,
  "https_enabled": true,
  "robots_txt": true,
  "sitemap_xml": false
}
```

**Error responses**
| Status | Condition |
|---|---|
| `422` | Malformed or unsupported URL (fails validation before any request is made) |
| `400` | URL is well-formed but unreachable (DNS/connection failure) |
| `504` | Request to the target website timed out |

---

## ✅ Running Tests

```bash
cd backend
pip install pytest
pytest -v
```

Tests cover:
- Happy path (valid, reachable URL)
- Invalid URL (missing field, malformed URL, unsupported scheme)
- Timeout / unreachable URL handling

---

## 👨‍💻 Author

**Tejas Nadgauda**
- GitHub: <https://github.com/Tejas56274>

---

## 🤖 AI Integration

I used ChatGPT to understand FastAPI API integration, React UI improvements, and SEO analysis logic. After generating the initial implementation, I customized the UI, improved the layout, modified the styling, and integrated the backend according to the assignment requirements. I also tested and debugged the application manually before deployment.

---

Built for [Digital Heroes Training Task](https://digitalheroesco.com)
