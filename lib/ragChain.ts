import { OpenAI, ChatOpenAI } from '@langchain/openai';
import { PromptTemplate } from '@langchain/core/prompts';

const prompt = new PromptTemplate({
    template: `
You are an assistant for answering questions about a company's leave policy.

Context:
{context}

Question:
{question}

Answer in a helpful and concise manner:
`,
    inputVariables: ['context', 'question'],
});

// const model = new OpenAI({ temperature: 0 });
const model = new ChatOpenAI({ model: "gpt-4" });



export const runRAG = async (question: string, docs: any) => {
    const context = docs.join('\n\n');
    const chain = prompt.pipe(model);
    const response = await chain.invoke({
        context, question
    })
    return response.text;
};
