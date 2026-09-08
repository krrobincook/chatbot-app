# 🤖 Omni-Query AI Assistant 

> **A cutting-edge, real-time conversational AI application powered by Groq's lightning-fast inference and Tavily's deep internet search capabilities.**

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![Frontend: React](https://img.shields.io/badge/Frontend-React%2019-61dafb.svg?logo=react&logoColor=black)](https://react.dev/)
[![Backend: Node.js](https://img.shields.io/badge/Backend-Node.js-339933.svg?logo=node.js&logoColor=white)](https://nodejs.org/)
[![LLM: Groq](https://img.shields.io/badge/LLM-Groq-f55036.svg)](https://groq.com/)

---

## ✨ Features

- ⚡ **Ultra-Fast Responses**: Experience near-instantaneous replies leveraging Groq's specialized inference hardware.
- 🌐 **Real-Time Web Augmented Generation**: Dynamically fetches current live information from the web through deep Tavily search integrations when needed.
- 🧠 **Context Awareness**: Maintains thread history and session state via intelligent server-side caching.
- 💻 **Code Generation & Formatting**: Supports writing, reviewing, and formatting complex code snippets with rich markdown parsing.
- 🎨 **Sleek & Modern UI**: A clean, distraction-free aesthetic built with Vite, React 19, and optimized Vanilla CSS modules.

---

## 🏗️ Architecture Stack

The application is structured as a decoupled monorepo, perfectly separating concerns between the client and API:

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Frontend UI** | React 19, Vite, CSS Modules | High-performance SPA with instantaneous cold-starts. |
| **Backend API** | Node.js, Express.js | Robust REST API acting as an orchestrated proxy. |
| **LLM Engine** | Groq SDK (`llama3-8b-8192` etc) | Core intelligence driving the conversation logic. |
| **Search Engine** | Tavily SDK | Fallback tool invocation for factual/recent data grounding. |
| **State** | `node-cache` | Thread management for seamless ongoing chats. |

---

## 🚀 Quick Start Guide

### 1. Prerequisites

Ensure you have the following installed and obtained:
- [Node.js](https://nodejs.org/) (v18 or higher)
- [Groq API Key](https://console.groq.com/)
- [Tavily API Key](https://tavily.com/)

### 2. Base Setup

Clone the repository to your local machine:

```bash
git clone https://github.com/krrobincook/chatbot-app.git
cd chatbot-app
```

### 3. Backend Configuration & Launch

Configure the environment and start the Express server.

```bash
cd backend
```

Create a `.env` file in the `backend/` root:
```env
PORT=3000
GROQ_API_KEY=your_groq_api_key_here
TAVILY_API_KEY=your_tavily_api_key_here
```

Install dependencies and run:
```bash
npm install
npm run dev
```
*The backend API will now be listening on `http://localhost:3000`.*

### 4. Frontend Launch

Open a **new terminal tab**, navigate to the frontend directory, and start the development server.

```bash
cd frontend/chatbot-ui
npm install
npm run dev
```

*Your default browser should automatically pop open. If not, navigate to the local link provided by Vite (e.g., `http://localhost:5173`).*

---

## 📁 Directory Structure Breakdown

```text
ChatBot/
├── backend/
│   ├── .env               # Secrets (Not pushed to version control)
│   ├── app.js             # Core express setup and middleware
│   ├── server.js          # Entry execution point
│   ├── chatbot.js         # Core Langchain/Groq tool invocation logic
│   └── package.json
└── frontend/
    └── chatbot-ui/
        ├── index.html     # Vite mounting point
        ├── src/           # Component library and assets
        │   ├── App.jsx    # Root state container
        │   └── ... 
        └── package.json
```

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! 
Feel free to check [issues page](https://github.com/krrobincook/chatbot-app/issues). 

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📜 License

Distributed under the **ISC** License. See `LICENSE` for more information.

<p align="center">
  <i>Built with ❤️ by the open-source community</i>
</p>
