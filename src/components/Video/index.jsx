import { cn } from "@/lib/utils";
import {
  useVideoTrack,
  DailyVideo,
  useLocalSessionId,
} from "@daily-co/daily-react";
import Skeleton from "react-loading-skeleton";

export const Video = ({ id, className, topClassname }) => {
  const videoState = useVideoTrack(id);
  return !videoState?.isOff ? (
    <div
      className={cn(
        "w-full mx-auto flex items-center  pt-200 justify-center",
        topClassname
      )}
    >
      <DailyVideo
        automirror
        sessionId={id}
        type="video"
        className={cn(
          "h-auto  bg-slate-500/80 rounded-md",
          className,
          {
            hidden: videoState.isOff,
          }
        )}
      />
    </div>
    
  ) : (
    <div className="w-full mx-auto flex items-center h-[650px]  justify-center">
      <Skeleton
        className={cn("h-500 bg-slate-500/80 rounded-md mx-auto", className)}
        height={500}
        width={800}
      />
    </div>
  );
};
