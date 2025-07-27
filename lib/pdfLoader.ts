import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';

/**
 * Loads and splits a PDF file into plain text chunks using LangChain's loader.
 */
export const extractPdfText = async (file: File): Promise<string[]> => {
    const arrayBuffer = await file.arrayBuffer();
    const loader = new PDFLoader(new Blob([arrayBuffer]), {
        splitPages: true, // true = return per page; false = full doc
    });

    const docs = await loader.load();
    return docs.map((doc) => doc.pageContent);
};
