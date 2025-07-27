import { Pinecone } from '@pinecone-database/pinecone';
import { config } from 'dotenv';

config();

const client = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY!,
});

const index = client.Index(process.env.PINECONE_INDEX_NAME!);

export const storeVectors = async (texts: string[], vectors: number[][]) => {
    const items = texts.map((text, i) => ({
        id: `chunk-${Date.now()}-${i}`,
        values: vectors[i],
        metadata: { text },
    }));

    await index.upsert(items);
};

export const queryVectors = async (query: string) => {
    const { OpenAIEmbeddings } = await import('@langchain/openai');
    const embedder = new OpenAIEmbeddings();
    const queryVector = await embedder.embedQuery(query);

    const result = await index.query({
        vector: queryVector,
        topK: 5,
        includeMetadata: true,
    });

    const docs = result.matches?.map((match) => match.metadata?.text || '') || [];
    return docs;
};
