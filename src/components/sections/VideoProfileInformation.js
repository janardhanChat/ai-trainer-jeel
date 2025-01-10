import React, { useEffect } from "react";
const DummyProfile = "/images/dummy-profile.svg";
export default function VideoProfileInformation() {
  let userInfo;
  useEffect(() => {
    userInfo = JSON.parse(localStorage.getItem("userInformation"));
  }, []);
  return (
    <button className="py-1.5 px-3 border border-solid border-whiteBorder bg-whiteOpacitybg30 cursor-pointer backdrop-blur-xl	 rounded-full flex items-center gap-2.5 text-lg text-white font-semibold">
      <img src={DummyProfile} alt="DummyProfile" />
      {userInfo?.firstName ?? "User"}
    </button>
  );
}
