import dotenv from 'dotenv';
dotenv.config();
import OpenAI from 'openai';
import { z } from 'zod';
import { zodResponseFormat } from 'openai/helpers/zod.js';

const schema = z.object({
  products: z.array(z.string())
})

const client = new OpenAI({
  apiKey: process.env.OPEN_AI_API_KEY,
})

export const generateProducts = async (message: string) => {
  const completion = await client.chat.completions.create({
    model: "gpt-4o-mini",
    max_completion_tokens: 100,
    response_format: zodResponseFormat(schema, "products_schema"),
    messages: [
      {
        role: "system",
        content: "List 3 products related to the user's message."
      },
      {
        role: "user",
        content: message
      }
    ]
  })
  return completion.choices[0].message.content
}