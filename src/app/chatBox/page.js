"use client"
import { useState } from "react";
import React from "react";
import { ShareIcon, PencilIcon, PlusIcon, FileIcon, AlarmCheck, MessageSquareIcon } from "lucide-react";

export default function ChatBox() {

    const [converse, setConverse] = useState([]);
    const [activeConvo, setActiveConvo] = useState(null);
    const [userQue, setUserQue] = useState("");

    async function getAIResponse() {
        const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models";
        const MODEL_NAME = "gemini-2.0-flash";
        const apiKey = "AIzaSyASSYjwWyf6-y4bgmwhfDgKReUMawjdRo8";

        alert(apiKey);

        const response = await fetch(
            `${GEMINI_API_URL}/${MODEL_NAME}:generateContent?key=${apiKey}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                {
                                    text: `
                                            Return response as json array strictly no markdown formatting
                                            Act as a Japanese Language Trainer, I want you to teach me Japanese Language by stories.
                                            1. I want you to generate a small English Story 
                                            2. Convert into Japanese language 
                                            3. Explain line by line by translating English story into Japanese language  
                                    `,
                                },
                            ],
                        },
                    ],
                }),
            }
        );
        const data = await response.json();
        let content = data.candidates?.[0]?.content?.parts?.[0]?.text || "Error: No response received";
        content = content.replace("```", "");

        setActiveConvo((prevConvo) => ({
            ...prevConvo,
            messages: [...(prevConvo?.messages || []), { role: "assistant", content }]
        }));
    }

    return (
        <div className="flex flex-row min-h-screen bg-gray-200">
            <div className="flex flex-col w-[250px] bg-gray-900 text-white p-4">
                <button
                    className="flex items-center justify-center gap-2 text-white bg-blue-600 hover:bg-blue-500 p-3 rounded"
                    onClick={() => {
                        const newConvo = { title: "Conversation", messages: [] };
                        setConverse([...converse, newConvo]);
                        setActiveConvo(newConvo);
                    }}>
                    <PlusIcon />
                    <div>New Chat</div>
                </button>
                <hr className="border-gray-600 my-4" />
                <div className="flex flex-col gap-2">
                    {converse.map((convo, index) => (
                        <div
                            key={index}
                            onClick={() => setActiveConvo(convo)}
                            className='flex items-center gap-2 p-2 hover:bg-gray-700 rounded cursor-pointer'>
                            <MessageSquareIcon width={30} />
                            <div>{convo.title}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex flex-col flex-1 bg-white shadow-lg">
                <nav className="flex justify-between items-center p-4 bg-blue-500 text-white shadow-md">
                    <div className="flex items-center gap-4">
                        <PencilIcon className="cursor-pointer hover:opacity-80" />
                        <FileIcon className="cursor-pointer hover:opacity-80" />
                    </div>
                    <div className="text-center">
                        <h1 className="text-4xl font-bold">Welcome to NihongoTrainer</h1>
                        <p className="text-lg">Konnichiwa, I am here to assist you in learning Japanese.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <ShareIcon className="cursor-pointer hover:opacity-80" />
                        <AlarmCheck className="cursor-pointer hover:opacity-80" />
                    </div>
                </nav>

                <div className='flex flex-col bg-gray-200 text-black p-4'>
                    {activeConvo?.messages?.map((message, i) => (
                        <div key={i} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} p-2`}>
                            {message.content}
                        </div>
                    ))}
                </div>

                <div className="flex justify-center items-center p-4 mt-auto">
                    <input
                        type="text"
                        className="h-[50px] w-[700px] p-4 bg-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Chat with me"
                        value={userQue}
                        onChange={(e) => setUserQue(e.target.value)}
                    />
                    <button
                        className="ml-4 p-3 bg-blue-600 hover:bg-red-500 rounded-lg shadow transition"
                        onClick={() => {
                            if (!userQue.trim()) return;
                            
                            setActiveConvo((prevConvo) => {
                                const updatedConvo = {
                                    ...prevConvo,
                                    messages: [...(prevConvo?.messages || []), { role: "user", content: userQue }]
                                };
                                return updatedConvo;
                            });
                            setUserQue("");
                            getAIResponse();
                        }}>
                        <img src="send_text.png" className="h-[30px] w-[30px]" alt="Send" />
                    </button>
                </div>
            </div>
        </div>
    );
}
