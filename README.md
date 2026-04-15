# 🤖 AI Chatbot Application

A full-stack AI chatbot built with **React**, **Node.js**, and **Express**, powered by **Groq LLM** and **Tavily web search**.
The chatbot can answer general questions, write code, and fetch real-time information from the web.

---

## 🚀 Features

- 💬 **Real-time conversational chatbot**
- 🧠 **Powered by Groq LLM** for ultra-fast, intelligent responses
- 🌐 **Web Search Integration** using the **Tavily API** for up-to-date information
- 🧵 **Conversation Memory** using `threadId` and `node-cache`
- ⚡ **Fast Responses** optimized with Groq's APIs
- 🧩 **Clean React Frontend UI** built with Vite
- ☁️ **Deployment ready** (Render/GitHub)

---

## 🛠 Tech Stack

### Backend
- **Node.js** & **Express.js** for the API server
- **Groq SDK** for interacting with LLMs
- **Tavily API** for internet-augmented search queries
- **Node Cache** for temporary state/thread management
- **dotenv** & **CORS**

### Frontend
- **React 19** for UI components
- **Vite** for fast, optimized building & development
- **Vanilla CSS / Modules** for styling

---

## 📁 Project Structure

```
ChatBot/
├── backend/
│   ├── src/        # Express server and API routes
│   └── package.json
└── frontend/
    └── chatbot-ui/
        ├── src/    # React components (App.jsx, InputBar.jsx, etc.)
        └── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18+
- Groq API Key
- Tavily API Key

### 1. Clone the repository

```bash
git clone https://github.com/krrobincook/chatbot-app.git
cd chatbot-app
```

### 2. Configure Environment Variables

Navigate to the `backend/` directory, create a `.env` file, and add your API keys:
```env
PORT=3000
GROQ_API_KEY=your_groq_api_key_here
TAVILY_API_KEY=your_tavily_api_key_here
```

### 3. Install Dependencies and Run

**Backend:**
```bash
cd backend
npm install
npm run dev
```

**Frontend:**
```bash
cd frontend/chatbot-ui
npm install
npm run dev
```

Both the client dev server and backend API should now be running. Open the Vite local URL in your browser to start chatting!

---

## 📄 License

This project is licensed under the **ISC License**.
