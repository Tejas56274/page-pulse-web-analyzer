# 🚀 Page Pulse - Website Analyzer

Page Pulse is a full-stack web application that analyzes any website and provides useful SEO and performance insights.

## 🌐 Live Demo

[https://YOUR-VERCEL-URL.vercel.app](https://page-pulse-web-analyzer.vercel.app/)s

## 📂 GitHub Repository

https://github.com/Tejas56274/page-pulse-web-analyzer

---

## ✨ Features

- Website Status Check
- Response Time Analysis
- SEO Score Calculation
- Page Title Detection
- Meta Description Detection
- H1 Count
- Word Count
- Missing ALT Image Detection
- HTTPS Detection
- Robots.txt Detection
- Sitemap.xml Detection

---

## 🛠 Tech Stack

### Frontend
- React.js
- Axios

### Backend
- FastAPI
- BeautifulSoup4
- Requests

---

## 📸 Screenshots

(Add screenshots here if required)

---

## 🚀 Installation

### Clone Repository

```bash
git clone https://github.com/Tejas56274/page-pulse-web-analyzer.git
```

### Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 📡 API Endpoint

POST `/analyze`

Example Request

```json
{
  "url": "https://python.org"
}
```

---

## 📋 Sample Output

```text
Status: 200
SEO Score: 100
HTTPS: Enabled
Robots.txt: Found
Sitemap.xml: Not Found
Response Time: 614 ms
```

---

## 👨‍💻 Author
**Tejas Nadgauda**



**Tejas Nadgauda**

- GitHub: https://github.com/Tejas56274






## AI Integration 

I used ChatGPT to understand FastAPI API integration, React UI improvements, and SEO analysis logic. After generating the initial implementation, I customized the UI, improved the layout, modified the styling, and integrated the backend according to the assignment requirements. I also tested and debugged the application manually before deployment.
