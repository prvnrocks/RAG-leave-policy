"use client"

import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function UploadDocument() {
    const fileInputRef = useRef<HTMLInputElement | null>(null)
    const [fileName, setFileName] = useState<string | null>(null)

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return;
        const formData = new FormData();
        formData.append('file', file);

        await fetch('/api/upload', { method: 'POST', body: formData });
        alert('Uploaded!');
    }

    const triggerUpload = () => {
        fileInputRef.current?.click()
    }

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle>Upload Document</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col items-center gap-4">
                    <div
                        onClick={triggerUpload}
                        className="w-full border border-dashed border-muted-foreground p-6 text-center cursor-pointer rounded-lg hover:bg-muted transition"
                    >
                        {fileName ? (
                            <p className="text-sm text-muted-foreground">📄 {fileName}</p>
                        ) : (
                            <p className="text-sm text-muted-foreground">Click to select or drag your file here</p>
                        )}
                    </div>

                    <Input
                        type="file"
                        className="hidden"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                    />

                    <Button onClick={triggerUpload}>Choose File</Button>
                </div>
            </CardContent>
        </Card>
    )
}
