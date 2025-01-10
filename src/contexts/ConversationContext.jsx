"use client";
import { createConversation, endConversation } from "@/api/api";
import { API_BASE_URL } from "@/api/api/constantsKey";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { getCookie } from "@/hooks/useCookie";

const ConversationContext = createContext();

export const ConversationProvider = ({ children }) => {
  const router = useRouter();
  const [userInformation, setUserInformation] = useState();
  console.log("🚀 ~ ConversationProvider ~ userInformation:", userInformation)
  const [screen, setScreen] = useState("welcome");
  const [conversation, setConversation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPersonaId, setCurrentPersonaId] = useState(null);

  const getUserInfoFromCookiee = () => {
    const userInfo = getCookie("userInformation");
    if (userInfo) {
      const parsedUserInformation = JSON.parse(userInfo);
      console.log("🚀 ~ useEffect ~ userInfo:", parsedUserInformation);
      setUserInformation(parsedUserInformation);
    }
  }

  useEffect(() => {
    // const userInfo = JSON.parse(localStorage.getItem("userInformation"));
   getUserInfoFromCookiee();
  }, []);

  useEffect(() => {
    return () => {
      if (conversation) {
        endConversation(conversation.conversation_id);
      }
    };
  }, [conversation]);

  const handleStart = async (personaId , userDet) => {
    console.log("🚀 ~ handleStart ~ userDet:", userDet)
    if(!userDet || !personaId) return toast.error("User not found");
    const toastId = toast.loading("Creating conversation...");
    try {
      setLoading(true);
      const newConversation = await createConversation(personaId);
      if (!userDet || newConversation.error) {
        toast.error("Something went wrong. Check the console for details.", {
          id: toastId,
        });
        setLoading(false);
        return;
      }
      const response = await axios.put(
        `${API_BASE_URL}/auth/updateUser/?id=${userDet._id}`,
        {
          conversation_Id: newConversation.conversation_id,
        }
      );
      console.log("🚀 ~ handleStart ~ response:", response);
      if (!response.data.success) {
        toast.error("Something went wrong. Check the console for details.", {
          id: toastId,
        });
        const result = await endConversation(
          newConversation.conversation_id,
          currentPersonaId?.apiKey
        );
        console.log("🚀 ~ handleStart ~ result:", result);
        setLoading(false);
        return;
      }
      setConversation(newConversation);
      toast.success("Conversation created successfully!", {
        id: toastId,
      });
      router.push("/health-check-screen");
    } catch (error) {
      console.error(error);
      toast.error(
        error.message || "Something went wrong. Check the console for details.",
        {
          id: toastId,
        }
      );
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleEnd = async () => {
    try {
      if (!conversation) return;
      const result = await endConversation(
        conversation.conversation_id,
        currentPersonaId?.apiKey
      );
      console.log("🚀 ~ handleEnd ~ result:", result)
      router.push("/select-ai-trainer");
    } catch (error) {
      console.log("🚀 ~ handleEnd ~ error:", error);
      console.error(error);
    } finally {
      setConversation(null);
    }
  };

  const handleJoin = () => {
    router.push("/video-screen");
  };

  return (
    <ConversationContext.Provider
      value={{
        screen,
        setScreen,
        conversation,
        loading,
        handleStart,
        handleEnd,
        handleJoin,
        currentPersonaId,
        setCurrentPersonaId,
        userInformation,
        getUserInfoFromCookiee,
      }}
    >
      {children}
    </ConversationContext.Provider>
  );
};

// Custom Hook to use the ConversationContext
export const useConversation = () => {
  const context = useContext(ConversationContext);
  if (!context) {
    throw new Error(
      "useConversation must be used within a ConversationProvider"
    );
  }
  return context;
};
