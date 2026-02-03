import React, { useEffect, useState } from "react";

const ScrollToTopButton = () => {
  const [progress, setProgress] = useState(0);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

      const scrolled = (scrollTop / scrollHeight) * 100;
      setProgress(scrolled);
      setShow(scrollTop > 200);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // initialize
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const radius = 26; // size of circle
  const stroke = 4;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  if (!show) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        zIndex: 999999,
        width: "64px",
        height: "64px",
      }}
    >
      <svg
        width="64"
        height="64"
        style={{ position: "absolute", top: 0, left: 0, transform: "rotate(-90deg)" }}
      >
        {/* Background circle */}
        <circle
          cx="32"
          cy="32"
          r={radius}
          fill="transparent"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth={stroke}
        />
        {/* Progress circle */}
        <circle
          cx="32"
          cy="32"
          r={radius}
          fill="transparent"
          stroke="url(#gradient)"
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 0.2s ease-out" }}
        />
        <defs>
          <linearGradient id="gradient">
            <stop offset="0%" stopColor="#7cf6ff" />
            <stop offset="50%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
        </defs>
      </svg>

      <button
        onClick={scrollToTop}
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          width: "64px",
          height: "64px",
          borderRadius: "50%",
          background: "#111827",
          border: "1px solid rgba(255,255,255,0.1)",
          color: "white",
          fontSize: "22px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        ↑
      </button>
    </div>
  );
};

export default ScrollToTopButton;
