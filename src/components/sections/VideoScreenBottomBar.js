import EndCallIcon from "@/assets/icons/EndCallIcon";
import MusicIcon from "@/assets/icons/MusicIcon";
import MuteIcon from "@/assets/icons/MuteIcon";
import SettingIcon from "@/assets/icons/SettingIcon";
import UnmuteIcon from "@/assets/icons/UmuteIcon";
import { useAudioTrack, useLocalSessionId } from "@daily-co/daily-react";
import { Mic, MicOff } from "lucide-react";
import React from "react";

export default function VideoScreenBottomBar({ handleLeave , toggleMicrophone }) {
  const localSessionId = useLocalSessionId();
  const localAudio = useAudioTrack(localSessionId);
  const isMicEnabled = !localAudio.isOff;
  return (
    <div className="w-full">
      <div className="max-w-[1780px] px-5 mx-auto">
        <div className="flex items-center justify-center gap-6 pb-5">
          {/* <MuteIcon />
            <UnmuteIcon /> */}
          <button
            onClick={toggleMicrophone}
            className={`p-2.5 rounded-full text-slate-50 bg-custom-gradient`}
          >
            {isMicEnabled ? (
              <Mic className="size-10" />
            ) : (
              <MicOff className="size-10" />
            )}
          </button>
          <div onClick={handleLeave}>
            <EndCallIcon />
          </div>
        </div>
        {/* <div className="rounded-[20px] backdrop-blur-[13px]	bg-[rgba(0, 0, 0, 0.08)] p-7">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-5">
              <div className="bg-whiteOpacitybg30 rounded-[20px] backdrop-blur-md w-[100px] h-[60px] flex items-center justify-center">
                <MusicIcon />
              </div>
              <p className="text-white text-lg font-semibold max-w-[1154px]">
                Well... Five years ago, yes, but it sat unused until last week.
                Surely there's something you can do about this new product?
                years ago, yes, but it sat unused until last week. years ago,
                yes, but it sat unused until last week.
              </p>
            </div>
            <div className="bg-whiteOpacitybg30 rounded-[14px] backdrop-blur-md w-[50px] h-[60px] flex items-center justify-center">
              <SettingIcon />
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
