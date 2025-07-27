'use client';

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";

type Message = {
    sender: 'user' | 'bot';
    text: string;
};

export default function ChatBox() {
    const [question, setQuestion] = useState('');
    const [messages, setMessages] = useState<Message[]>([
        { sender: 'bot', text: 'Hello! How can I help you today?' },
    ]);
    const chatRef = useRef<HTMLDivElement>(null);

    const handleSend = async () => {
        const trimmed = question.trim();
        if (!trimmed) return;

        // Add user message
        setMessages(prev => [...prev, { sender: 'user', text: trimmed }]);
        setQuestion('');

        try {
            const res = await fetch('/api/ask', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ question: trimmed }),
            });

            const data = await res.json();

            // Add bot reply
            setMessages(prev => [...prev, { sender: 'bot', text: data.answer || 'Sorry, I could not understand.' }]);
        } catch (err) {
            setMessages(prev => [...prev, { sender: 'bot', text: 'Something went wrong. Please try again.' }]);
        }
    };

    useEffect(() => {
        chatRef.current?.scrollTo(0, chatRef.current.scrollHeight);
    }, [messages]);

    return (
        <Card className="w-full mx-auto h-full flex flex-col border shadow-md">
            <CardContent
                ref={chatRef}
                className="flex-1 overflow-y-auto space-y-4 p-4"
            >
                {messages.map((msg, i) => (
                    <div
                        key={i}
                        className={`max-w-[70%] px-4 py-2 rounded-xl text-sm whitespace-pre-wrap ${msg.sender === 'user'
                                ? 'ml-auto bg-primary text-white'
                                : 'mr-auto bg-muted'
                            }`}
                    >
                        {msg.text}
                    </div>
                ))}
            </CardContent>

            <div className="flex p-4 border-t gap-2">
                <Input
                    placeholder="Type your question..."
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                />
                <Button onClick={handleSend} type="button">
                    Submit
                </Button>
            </div>
        </Card>
    );
}
