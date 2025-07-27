import { NextRequest, NextResponse } from 'next/server';
import { extractPdfText } from '@/lib/pdfLoader';
import { createEmbedding } from '@/lib/embeddings';
import { storeVectors } from '@/lib/vectorStore';

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get('file') as File;

        if (!file || file.type !== 'application/pdf') {
            return NextResponse.json({ error: 'Invalid file type' }, { status: 400 });
        }

        const chunks = await extractPdfText(file); // ✅ replaces pdfParse

        const embeddings = await Promise.all(chunks.map(createEmbedding));
        await storeVectors(chunks, embeddings);

        return NextResponse.json({ message: 'Uploaded and embedded', chunks: chunks.length });
    } catch (err) {
        console.error('Upload error:', err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
