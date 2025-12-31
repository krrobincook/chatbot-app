const input = document.querySelector('#input');
const chatContainer = document.querySelector('#chat-container');
const askBtn = document.querySelector('#ask');

const threadId = Date.now().toString(36) + Math.random().toString(36).substring(2, 8);

input?.addEventListener('keyup', handleEnter);
askBtn?.addEventListener('click', handleAsk);

const loading = document.createElement('div');
loading.className = 'my-6 animate-pulse';
loading.textContent = 'Thinking...';

async function generate(text) {
    // 1. Add user message (wrapped)
    addMessage(text, "user");

    input.value = "";

    // 2. Show loading message (assistant style)
    const loadingWrapper = document.createElement("div");
    loadingWrapper.className = "flex justify-start mb-3";

    const loadingBubble = document.createElement("div");
    loadingBubble.className = "bg-slate-600 px-4 py-2 rounded-2xl max-w-[80%] animate-pulse";
    loadingBubble.innerText = "Thinking...";

    loadingWrapper.appendChild(loadingBubble);
    chatContainer.appendChild(loadingWrapper);
    scrollToBottom();

    // 3. Call server
    const assistantMessage = await callServer(text);

    // 4. Remove loading
    loadingWrapper.remove();

    // 5. Add assistant message (wrapped like welcome)
    addMessage(assistantMessage, "assistant");
}


function addMessage(text, type, isFirst = false) {
    const wrapper = document.createElement("div");
    wrapper.className = `flex mb-3 ${isFirst ? "mt-6" : ""} ${
        type === "user" ? "justify-end" : "justify-start"
    }`;

    const bubble = document.createElement("div");
    bubble.className = `
        ${type === "user" ? "bg-blue-500" : "bg-slate-600"}
        px-4 py-2 rounded-2xl max-w-[80%] break-words whitespace-pre-line
    `;
    bubble.innerText = text;

    wrapper.appendChild(bubble);
    chatContainer.appendChild(wrapper);

    // Auto-scroll to bottom
    scrollToBottom();
}


// Welcome message
window.addEventListener("DOMContentLoaded", () => {
    addMessage(
        "👋 Hi! Welcome to the chat.\nAsk me anything and I’ll be happy to help.",
        "assistant",
        true
    );
});

function scrollToBottom() {
    requestAnimationFrame(() => {
        chatContainer.scrollTop = chatContainer.scrollHeight;
    });
}


async function callServer(inputText) {
    const response = await fetch('http://localhost:3001/chat', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify( { threadId: threadId, message: inputText } ),
    });

    if(!response.ok){
        throw new Error("Error generating the response");
    }

    const result = await response.json();
    return result.message;
}

async function handleAsk(e) {
    const text = input?.value.trim();
    if(!text) return;
    await generate(text); 
}

async function handleEnter(e) {
    if(e.key === 'Enter') {
        const text = input?.value.trim();
        if(!text){
            return;
        }
        await generate(text);
    }
}