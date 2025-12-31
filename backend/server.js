import express from 'express'
import generate from './chatbot.js'
import cors from 'cors'
import dotenv from 'dotenv'
const app = express()
const port = process.env.PORT || 3001

app.use(express.json())
dotenv.config()

app.use(cors({
  origin: "*", // or your frontend URL
  methods: ["GET", "POST"],
}));

app.get('/', (req, res) => {
  res.send('Welcome to chat-bot backend')
})

app.post('/chat', async(req, res) => {
    const {message, threadId} = req.body;
    // todo: validates above field
    if(!message || !threadId){
      res.status(400).json({message: 'All fields are required!'})
      return;
    }

    console.log("Message from user : ", message);
    const result = await generate(message, threadId);
    res.status(200).json({message: result});
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
