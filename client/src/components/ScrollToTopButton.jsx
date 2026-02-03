import React,{ useEffect, useState } from "react";

const ScrollToTopButton = () => {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const container = document.scrollingElement || document.documentElement;

    const onScroll = () => {
      const scrollTop = container.scrollTop;
      const height = container.scrollHeight - container.clientHeight;

      if (height <= 0) return;

      const percent = (scrollTop / height) * 100;
      setProgress(percent);
      setVisible(scrollTop > 200);
    };

    onScroll();
    container.addEventListener("scroll", onScroll);
    return () => container.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    (document.scrollingElement || document.documentElement).scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div
      className={`fixed bottom-6 right-6 z-[9999]
                  transition-all duration-300
                  ${visible ? "opacity-100 scale-100" : "opacity-0 scale-75 pointer-events-none"}`}
    >
      <button
        onClick={scrollToTop}
        className="relative h-14 w-14 rounded-full
                   bg-gray-900/80 backdrop-blur
                   border border-white/10
                   flex items-center justify-center"
      >
        <svg className="absolute inset-0 h-full w-full -rotate-90">
          <circle
            cx="28"
            cy="28"
            r={radius}
            fill="transparent"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="3"
          />
          <circle
            cx="28"
            cy="28"
            r={radius}
            fill="transparent"
            stroke="url(#grad)"
            strokeWidth="3"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="grad">
              <stop offset="0%" stopColor="#7cf6ff" />
              <stop offset="50%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
          </defs>
        </svg>

        <span className="text-white text-lg">↑</span>
      </button>
    </div>
  );
};

export default ScrollToTopButton;
