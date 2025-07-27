import { OpenAIEmbeddings } from "@langchain/openai";

const embeddings = new OpenAIEmbeddings({
    model: "text-embedding-ada-002"
});

export const createEmbedding = async (text: string) => {
    return embeddings.embedQuery(text);
};