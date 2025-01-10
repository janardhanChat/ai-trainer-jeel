"use client";
import { useEffect } from "react";
import { DailyProvider, useDaily } from "@daily-co/daily-react";
import { useLocalSessionId } from "@daily-co/daily-react";
import { CameraSettings } from "@/components/sections/CameraSetting";
import { Video } from "@/components/Video";
import { useConversation } from "@/contexts/ConversationContext";

export default function page() {
  const localSessionId = useLocalSessionId();
  console.log("[HealthCheckScreen] Local session ID:", localSessionId);
  const daily = useDaily();
  console.log("[HealthCheckScreen] Daily instance:", daily);
  const { handleEnd, handleJoin, loading } = useConversation();
  useEffect(() => {
    if (daily) {
      daily?.startCamera({ startVideoOff: false, startAudioOff: false });
    }
  }, [daily, localSessionId]);

  return (
    <div className="bg-page-gradient h-screen">
      <Video
        id={localSessionId}
        className="max-h-[60vh] "
        topClassname={"h-[650px]"}
      />
      <CameraSettings
        actionLabel="Join Call"
        onAction={handleJoin}
        cancelLabel="Cancel"
        onCancel={handleEnd}
      />
    </div>
  );
}
