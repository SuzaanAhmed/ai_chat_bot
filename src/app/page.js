"use client"
import { useRouter } from "next/navigation";
import React from "react";


export default function Home() {
  const router=useRouter()
  return (
  <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center gap-2">
        <strong className="text-[50px]">Welcome to NihongoTrainer</strong>
        <p className="text-[20px]">Konnichiwa, I am hear to provide assistance in learning Japanese.</p>
    <button onClick={()=>router.push("chatBox")} className="border rounded p-4 bg-black text-white hover:bg-red-500 hover:text-black">Begin</button>
  </div>
    );
}

export function Greeting(){
  return(
    <div>
    <strong className="text-[50px]">Welcome to NihongoTrainer</strong>
    <p className="text-[20px]">Konnichiwa, I am hear to provide assistance in learning Japanese.</p>
    </div>
  );
}