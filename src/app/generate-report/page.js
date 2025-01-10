"use client";

import { API_BASE_URL } from "@/api/api/constantsKey";
import { useConversation } from "@/contexts/ConversationContext";
import axios from "axios";
import { redirect, useRouter } from "next/navigation";
import React, { use, useEffect, useState } from "react";
import toast from "react-hot-toast";
import WalkGif from "@/assets/gif/Walk.gif";
export default function page() {
  const { conversation, setConversation, currentPersonaId } = useConversation();
  const [id, setId] = useState(conversation?.conversation_id || "");
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState(null);
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // const response = await axios.get(
    //   `${API_BASE_URL}/conversation/createReport/?conversation_id=${id}`
    // );
    // const url = "https://259s7s89-7003.inc1.devtunnels.ms/api/v1/conversation/createReport/?conversation_id=c7da3a15a198";
    const url = `${API_BASE_URL}/conversation/createReport/?conversation_id=${id}`;
    try {
      const response = await fetch(url);
      if (!response) {
        throw new Error("Network response was not ok");
      }

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);

      // Create a temporary anchor element to trigger download
      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = "conversation_report.csv"; // Set the file name
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      // Revoke the object URL to free up memory
      window.URL.revokeObjectURL(downloadUrl);
      setConversation && setConversation(null);
      setLoading(false);
      router.push("/select-ai-trainer");
    } catch (error) {
      setLoading(false);
      console.error("Error downloading the file:", error);
      toast.error("Error downloading the file");
    }

    // setReport(response.data);
    // setLoading(false);
  };
  useEffect(() => {
    if (!conversation) {
      router.push("/select-ai-trainer");
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="flex flex-col items-center justify-center max-h-[600px] bg-page-gradient rounded-md   p-24 shadow-2xl">
        <div className="mb-8">
          <svg
            className="w-24 h-24"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="50" cy="50" r="45" stroke="#3B82F6" strokeWidth="10" />
            <path
              d="M30 50L45 65L70 35"
              stroke="#3B82F6"
              strokeWidth="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Report Generator
        </h1>
        <form onSubmit={handleSubmit} className="w-full max-w-sm">
          <input
            type="text"
            value={id}
            //   onChange={(e) => setId(e.target.value)}
            placeholder="Enter ID"
            disabled={true}
            className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md bg-custom-gradient hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200 ease-in-out"
            disabled={loading}
          >
            Generate Report
          </button>
        </form>
        {loading && (
          <div className="mt-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 bg-custom-gradient border-blue-500"></div>
          </div>
        )}
        {/* {report && (
          <div className="mt-8 p-4 bg-custom-gradient rounded-md shadow-md">
            <p className="text-gray-800">{report}</p>
          </div>
        )} */}
      </div>
      {loading && (
        <img
          src={WalkGif} 
          alt="Loading..."
          className="w-16 h-16"
        />
      )}
    </div>
  );
}
