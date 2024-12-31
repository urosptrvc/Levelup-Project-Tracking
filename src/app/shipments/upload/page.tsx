"use client"

import React, {ChangeEvent, useState} from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CloudUpload, Loader2, FileText, XCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { useNotifier } from "@/components/ui/use-notifications"

const UploadShipmentsPage = () => {
    const [file, setFile] = useState<File | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const { notifyError, notifySuccess } = useNotifier()
    const router = useRouter()

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    // Glavna funkcija za upload fajla
    const uploadFile = async () => {
        // Provera da li je fajl selektovan
        if (!file) {
            notifyError("Error", "Please select a file!")
            return
        }

        // Priprema FormData za slanje fajla
        const formData = new FormData()
        formData.append("file", file)

        setIsLoading(true)
        try {
            // Slanje POST zahteva na API endpoint za upload
            const res = await fetch("/api/shipments/upload", {
                method: "POST",
                body: formData,
            })

            // Parsiranje odgovora
            const data = await res.json()
            if (!res.ok) {
                notifyError("Error", data.error)
            } else {
                notifySuccess("Success", `Uploaded ${data.count} shipments successfully!`)
                router.push("/shipments")
            }
        } catch (error) {
            if (error instanceof Error) {
                notifyError("Error", error.message)
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
            <div className="container mx-auto py-10">
                <Card className="w-full max-w-md mx-auto mt-10 shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-center">Upload XLSX Shipments</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col items-center space-y-4">
                            {/* Drag & drop funkcionalnosti */}
                            <label
                                htmlFor="file"
                                className="flex flex-col items-center justify-center w-full p-4 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-200 transition"
                            >
                                <CloudUpload className="w-8 h-8  mb-2"/>
                                <span className="text-sm">
                                {file ? file.name : "Click to select or drag a file here"}
                            </span>
                                {/* Skriveni input za file upload */}
                                <Input
                                    id="file"
                                    type="file"
                                    accept=".xlsx"
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                            </label>

                            {/* Prikaz selektovanog fajla*/}
                            {file && (
                                <div className="flex items-center justify-between w-full px-2 py-1 rounded-md">
                                    <div className="flex items-center space-x-2">
                                        <FileText className=""/>
                                        <span className="text-sm ">{file.name}</span>
                                    </div>
                                    <button
                                        onClick={() => setFile(null)}
                                        className="text-red-600 hover:text-red-800"
                                    >
                                        <XCircle size={18}/>
                                    </button>
                                </div>
                            )}

                            {/* Dugme za dinamicki upload*/}
                            <Button
                                onClick={uploadFile}
                                disabled={!file || isLoading}
                                className="w-full"
                            >
                                {isLoading ? (
                                    <span className="flex items-center">
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin"/>
                                    Uploading...
                                </span>
                                ) : (
                                    "Upload & Process"
                                )}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
    )
}

export default UploadShipmentsPage;