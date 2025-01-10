"use client";
import { endConversation } from "@/api/api";
import VideoProfileInformation from "@/components/sections/VideoProfileInformation";
import VideoScreenBottomBar from "@/components/sections/VideoScreenBottomBar";
import { Video } from "@/components/Video";
import EvaluationOfTrainingModal from "@/components/widgets/EvaluationOfTrainingModal";
import { useConversation } from "@/contexts/ConversationContext";
import { cn } from "@/lib/utils";
import {
  DailyAudio,
  DailyAudioTrack,
  useAudioTrack,
  useDaily,
  useLocalSessionId,
  useParticipantIds,
  useVideoTrack,
} from "@daily-co/daily-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";

export default function page() {
  const daily = useDaily();
  const localSessionId = useLocalSessionId();
  const remoteParticipantIds = useParticipantIds({ filter: "remote" });
  const localAudio = useAudioTrack(localSessionId);
  const isMicEnabled = !localAudio.isOff;
  const { conversation, setConversation ,currentPersonaId } = useConversation();
  const router = useRouter();

  useEffect(() => {
    if (conversation && daily) {
      const { conversation_url } = conversation;
      daily.join({
        url: conversation_url,
      });
    }
  }, [daily, conversation]);

  const handleEnd = async () => {
    try {
      if (!conversation) return;
      await endConversation(
        conversation.conversation_id,
        currentPersonaId?.apiKey
      );
      // router.push("/select-ai-trainer");
      router.push("/generate-report");
    } catch (error) {
      console.error(error);
    } finally {
      // setConversation && setConversation(null);
    }
  };
  const handleLeave = async () => {
    await daily?.leave();
    handleEnd();
  };


  const toggleMicrophone = () => {
    daily?.setLocalAudio(!isMicEnabled);
  };


  return (
    <div className=" h-screen w-full bg-center bg-no-repeat relative">
      {remoteParticipantIds.length > 0 ? (
        <Video
          id={remoteParticipantIds[0]}
          className={"h-screen w-[screen] absolute top-0 left-0"}
          topClassname={"h-screen"}
        />
      ) : (
        <div className="relative flex items-center  justify-center max-h-[calc(100vh-10px)] ">
          {/* <p className="text-2xl text-black">Waiting for others to join...</p> */}
          <Skeleton height={"100vh"} width={"100vw"} />
        </div>
      )}
      {localSessionId && (
        <Video
          id={localSessionId}
          className={cn(
            "absolute bottom-3 right-3 h-[350px] w-[500px] !object-cover "
          )}
        />
      )}
      <div className="absolute top-[40px] left-[80px]">
        <VideoProfileInformation />
      </div>
      <div className="absolute bottom-[40px] left-0 w-full">
        <VideoScreenBottomBar
          handleLeave={handleLeave}
          toggleMicrophone={toggleMicrophone}
        />
      </div>
      <EvaluationOfTrainingModal />
      <DailyAudio />
      <DailyAudioTrack />
    </div>
  );
}
