# Smart Feedback Tracker

A full-stack **MERN** application that allows users to submit feedback for any product or service.  
It features an integrated **AI assistant** (powered by **Groq API**) to instantly analyze and summarize all submitted feedback using natural language queries. This project can be used to query from the stored feedbacks and which further can be utilised.

---

## Features

- **Submit Feedback** – Add title, description, and category.
- **View Feedback** – Real-time list of all entries.
- **Edit & Delete** – Edit in-place or delete with one click.
- **Edited Status** – Updated feedback shows last edited time.
- **AI Analysis** – Query feedback using natural language (e.g., “Summarize all feature requests”).
- **Responsive UI** – Modern design optimized for all screen sizes.

---

## Tech Stack

- **Frontend:** React (Vite), Tailwind CSS  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB Atlas  
- **AI API:** Groq API (LLaMA 3)  
- **Deployment:** Vercel (Frontend), Render (Backend)  

---

## Getting Started

### Prerequisites

- Node.js v18+
- MongoDB Atlas account
- Groq API Key

---

## Backend Setup

```bash
cd server
npm install
cp .env.example .env

Edit .env and add:

MONGO_URI=your_mongodb_connection_string
GROQ_API_KEY=your_groq_api_key
PORT=5001

Start the backend:

npm start
# Runs at http://localhost:5001
```

# Frontend Setup
```bash
cd ../client
npm install

Create .env in the client directory:

VITE_API_URL=http://localhost:5001

Start the frontend:

npm run dev
# Opens at http://localhost:5173

note: follow the tailwindcss website for setting up the tailwind in the frontend
```

# Deployment Guide
🔙 Backend on Render

    Push your project to GitHub.

    Go to Render and create a Web Service.

    Connect your GitHub repo.

    Configure:

        Build Command: npm install

        Start Command: npm start

    Add Environment Variables:

        MONGO_URI

        GROQ_API_KEY

# Frontend on Vercel

    Go to Vercel and import your GitHub repo.

    During setup, set:

        Root Directory: client

    Add environment variable:

    VITE_API_URL=https://your-render-backend-url.onrender.com

    Deploy 🚀

# License

This project is licensed under the MIT License.
Happy Contributing

Contributions are welcome! Feel free to:

    Fork this repo

    Submit pull requests

    Open issues and suggest features

# Contact

Creator: Nishant-k-sagar<br>
Email: nishantsagar004@gmail.com<br>
GitHub: https://github.com/Nishant-k-sagar