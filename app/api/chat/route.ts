import { ChatOllama } from "@langchain/community/chat_models/ollama";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { OllamaFunctions } from "langchain/experimental/chat_models/ollama_functions";
import { promises as fs } from 'fs';
import { StringOutputParser } from "langchain/schema/output_parser";

export async function POST(request: Request) {

    // Function that reads a local json file using fs in node
    const pokemonJSON = JSON.parse(await fs.readFile("./data/pokemon.json", "utf8"));
    console.log(pokemonJSON)

    const functionSchema = [
        {
            name: "get_mentioned",
            description: "Gets mentioned pokemon",
            parameters: {
                type: "object",
                properties: {
                    response: {
                        type: "string",
                        description: "The unchanged response",
                    },
                    mentioned: {
                        type: "array", description: "All pokemon that were mentioned in the response",
                        pokemon: { type: "string", description: "A pokemon full name in lowercase" }
                    },
                },
                required: ["location"],
            },
        },
    ];

    const parser = new StringOutputParser();

    const chatModel = new ChatOllama({
        baseUrl: "https://ollama-playground.calmtree-3e1804d1.centralus.azurecontainerapps.io", // Default value
        model: "mistral:7b-instruct",
    });
    const prompt = ChatPromptTemplate.fromMessages([
        ["system", "You an experienced trainer in the world of Pokemon. You are always excited about Pokemon and love talking about this. You limit your response to 30 words and don't mention that you do this."],
        ["user", "{input}"],
    ]);
    const chain = prompt.pipe(chatModel/* .bind({
        functions: functionSchema,
        function_call: {
            name: "get_mentioned"
        }
    }
    ) */).pipe(parser);


    const body = await request.json()
    console.log(body)
    const result = await chain.invoke({ input: body.message })

    return Response.json({ message: result });
}