import React from 'react';

export default function UnmuteIcon() {
  return (
    <svg className="cursor-pointer w-[60px] h-[60px]" width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_b_1238_687)">
        <circle cx="40" cy="40" r="40" fill="black" fillOpacity="0.14" />
      </g>
      <g clipPath="url(#clip0_1238_687)">
        <path d="M50.2417 40.5269C50.2417 39.8869 49.7523 39.3975 49.1123 39.3975C48.4723 39.3975 47.9829 39.8869 47.9829 40.5269C47.9829 44.9316 44.4064 48.508 40.0017 48.508C35.597 48.508 32.0205 44.9316 32.0205 40.5269C32.0205 39.8869 31.5311 39.3975 30.8911 39.3975C30.2511 39.3975 29.7617 39.8869 29.7617 40.5269C29.7617 45.7598 33.677 50.1645 38.8723 50.7292V53.741H34.7688C34.1288 53.741 33.6394 54.2304 33.6394 54.8704C33.6394 55.5104 34.1288 55.9998 34.7688 55.9998H45.2347C45.8747 55.9998 46.3641 55.5104 46.3641 54.8704C46.3641 54.2304 45.8747 53.741 45.2347 53.741H41.1311V50.7292C46.3264 50.1645 50.2417 45.7598 50.2417 40.5269Z" fill="white" />
        <path d="M40.0019 24C36.5384 24 33.7148 26.8235 33.7148 30.2871V40.4894C33.7148 43.9906 36.5384 46.7765 40.0019 46.8141C43.4654 46.8141 46.289 43.9906 46.289 40.5271V30.2871C46.289 26.8235 43.4654 24 40.0019 24Z" fill="white" />
        {/* Cross Line */}
        <line x1="20" y1="20" x2="60" y2="60" stroke="white" strokeWidth="4" strokeLinecap="round" />
        {/* <line x1="60" y1="20" x2="20" y2="60" stroke="white" strokeWidth="4" strokeLinecap="round" /> */}
      </g>
      <defs>
        <filter id="filter0_b_1238_687" x="-30" y="-30" width="140" height="140" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feGaussianBlur in="BackgroundImageFix" stdDeviation="15" />
          <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_1238_687" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_1238_687" result="shape" />
        </filter>
        <clipPath id="clip0_1238_687">
          <rect width="32" height="32" fill="white" transform="translate(24 24)" />
        </clipPath>
      </defs>
    </svg>
  );
}
