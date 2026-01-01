import Groq from "groq-sdk";
import "dotenv/config"
import { tavily } from "@tavily/core";
import NodeCache from "node-cache";
import { json } from "express";

const groq = new Groq( {apiKey: process.env.GROQ_API_KEY} )
const tvly = tavily( { apiKey: process.env.TAVILY_API_KEY} );

const cache = new NodeCache({stdTTL: 60 * 60 * 24}); // 24 hours

async function generate(userMessage, threadId){

    const basemessages =  [
            {
                role: 'system',
                content: `You are a smart personal assistant.
                    If you know the answer to a question, answer it directly in plain English.
                    If the answer requires real-time, local, or up-to-date information, or if you don’t know the answer, use the available tools to find it.
                    You have access to the following tool:
                    webSearch(query: string): Use this to search the internet for current or unknown information.
                    Decide when to use your own knowledge and when to use the tool.
                    Do not mention the tool unless needed.
                    You are a coding assistant.

                    Q: who created you
                    A: created by GROQ

                    RULES:
                    - If the user asks for code, return ONLY code.
                    - Code MUST be wrapped in a fenced Markdown code block.
                    - The opening and closing triple backticks MUST be on their own lines.
                    - The language name MUST appear immediately after the opening backticks.
                    - NEVER place code on the same line as java or python

                    public class Test {
                       public static void main(String[] args) {
                               System.out.println("Hello");
                        }
                    }

                    Examples:
                    Q: What is the capital of France?
                    A: The capital of France is Paris.

                    Q: What’s the weather in Mumbai right now?
                    A: (use the search tool to find the latest weather)

                    Q: Who is the Prime Minister of India?
                    A: The current Prime Minister of India is Narendra Modi.

                    Q: Tell me the latest IT news.
                    A: (use the search tool to get the latest news)

                    current date and time: ${new Date().toUTCString()}`,
            },

            // {
            //     role: 'user',
            //     content: `
            //     What is the current weather in dehradun?
            //     `,
            //     //What is the current weather in dehradun?
            //     //when was iphone 16 launched?
            //     //write a code in javascript to check whether a number is prime or not.
            //     //who is the president of russia?
            // },
        ]

    const messages = cache.get(threadId) ?? basemessages;

    const tools = [
        {
           type: "function",
           function: {
               name: "webSearch",
               description: "Search the latest information and realtime data on the internet.",
               parameters: {
               type: "object",
            properties: {
              query: {
              type: "string",
              description: "The search query to perform on the internet"
              }
            },
            required: ["query"]
          }
        }
    }
]
    
        messages.push({
            role: 'user',
            content: userMessage,
        });

    const MAX_RETRIES = 10;
    let count = 0;
    while(true) {

    if(count > MAX_RETRIES){
        return "I could not find the result, please try again";
    }
    count++;
    const completion = await groq.chat.completions.create({
        model: 'llama-3.3-70b-versatile',
        temperature: 0,
        messages: messages,

        //To use tools, the model must be provided with tool definitions.
        //These tool definitions are in JSON schema format and are passed to the model via the tools parameter in the API request.
        tools: tools,

        tool_choice: 'auto',
    });
    //console.log("completion1 res : ", completion)

    messages.push(completion.choices[0].message)

    const toolCalls = completion.choices[0].message.tool_calls;
    //console.log("toolcalls : ", toolCalls)

    if(!toolCalls){
        //here we end the chatbot response
        cache.set(threadId, messages);
        //console.log(JSON.stringify(cache.data));
        return completion.choices[0].message.content;
    }
    
    for(const tool of toolCalls){
        const functionName = tool.function.name;
        const functionParams = tool.function.arguments

        if(functionName === 'webSearch'){
            const toolResult = await webSearch(JSON.parse(functionParams))
            //console.log('Tool Result: ', toolResult);
            messages.push({
                tool_call_id: tool.id,
                role: 'tool',
                name: functionName,
                content: toolResult,
            });
        }
    }
                                                                        
  }
}

export default generate;

async function webSearch( {query} ){
    // Here we do tavily api call
    console.log("calling web search....")
    const response = await tvly.search(query, {maxResults: 5});
    const finalResult = response.results.map((result) => result.content).join('\n\n\n');
    return finalResult;
}
