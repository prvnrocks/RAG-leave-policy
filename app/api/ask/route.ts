import { NextRequest, NextResponse } from 'next/server';
import { queryVectors } from '@/lib/vectorStore';
import { runRAG } from '@/lib/ragChain';

export async function POST(req: NextRequest) {
    const { question } = await req.json();
    console.log(question);
    const docs = await queryVectors(question);
    const answer = await runRAG(question, docs);
    return NextResponse.json({ answer });
}
