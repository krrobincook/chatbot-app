import readline from 'readline/promises'
import Groq from "groq-sdk";
import "dotenv/config"
import { tavily } from "@tavily/core";
const groq = new Groq( {apiKey: process.env.GROQ_API_KEY} )
const tvly = tavily( { apiKey: process.env.TAVILY_API_KEY} );

async function main(){

    const rl = readline.createInterface({input: process.stdin, output: process.stdout})
    const messages =  [
            {
                role: 'system',
                content: `You are a smart personal assistant who can answer the asked question.
                You have access to following tools:
                1. searchWeb( {query}: {query: string}) //Search the latest information and realtime data on the internet.
                current date and time: ${ new Date().toUTCString() }`,
                
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
    while(true){
        const question = await rl.question('You: ')
        if(question === 'bye'){
            break;
        }
        messages.push({
            role: 'user',
            content: question,
        });
    while(true) {
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
        console.log(`Assistant: ${completion.choices[0].message.content}`)
        //console.log("value of c is below assistant ",c);
        break;
    }
    
    for(const tool of toolCalls){
        //console.log('tool: ', tool);
        const functionName = tool.function.name;
        const functionParams = tool.function.arguments

        if(functionName === 'webSearch'){
            const toolResult = await webSearch(JSON.parse(functionParams))
            console.log('Tool Result: ', toolResult);
            //console.log("value of c is ",c);
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
rl.close();
}

main()
let c = 0;
async function webSearch( {query} ){
    c++;
    // Here we do tavily api call
    console.log("calling web search....")
    const response = await tvly.search(query, {maxResults: 1});
    const finalResult = response.results.map((result) => result.content).join('\n\n\n');
    return finalResult;
}
//console.log("value of c is ",c);