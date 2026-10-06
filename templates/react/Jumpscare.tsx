"use client";

import React, { useEffect, useRef } from "react";

export interface JumpscareProps {
  /**
   * Whether the jumpscare is actively firing
   */
  active: boolean;
  /**
   * Custom video source URL or path (defaults to '/media/jumpscare.mp4')
   */
  videoSrc?: string;
  /**
   * Confirmation text when user tries to close the tab
   */
  unloadPrompt?: string;
  /**
   * Optional callback when jumpscare triggers
   */
  onTrigger?: () => void;
}

export const Jumpscare: React.FC<JumpscareProps> = ({
  active,
  videoSrc = "/media/jumpscare.mp4",
  unloadPrompt = "Are you sure you want to terminate your administrative session?",
  onTrigger,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (!active) return;

    if (onTrigger) {
      try {
        onTrigger();
      } catch {
        // Ignore callback error
      }
    }

    // 1. Request fullscreen
    const el = document.documentElement as HTMLElement & {
      webkitRequestFullscreen?: () => Promise<void>;
      mozRequestFullScreen?: () => Promise<void>;
      msRequestFullscreen?: () => Promise<void>;
    };

    if (el.requestFullscreen) {
      el.requestFullscreen().catch(() => {});
    } else if (el.webkitRequestFullscreen) {
      el.webkitRequestFullscreen().catch(() => {});
    } else if (el.mozRequestFullScreen) {
      el.mozRequestFullScreen().catch(() => {});
    } else if (el.msRequestFullscreen) {
      el.msRequestFullscreen().catch(() => {});
    }

    // 2. Play video with maximum volume
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.muted = false;
      videoRef.current.volume = 1.0;

      videoRef.current.play().catch(() => {
        // Fallback for strict browser autoplay policies: trigger sound on next user interaction
        const startAudio = () => {
          if (videoRef.current) {
            videoRef.current.muted = false;
            videoRef.current.volume = 1.0;
            videoRef.current.play().catch(() => {});
          }
        };

        window.addEventListener("click", startAudio, { once: true });
        window.addEventListener("keydown", startAudio, { once: true });
        window.addEventListener("mousemove", startAudio, { once: true });
      });
    }

    // 3. Prevent quick tab exit via beforeunload
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      return (e.returnValue = unloadPrompt);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [active, unloadPrompt, onTrigger]);

  if (!active) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "#000000",
        zIndex: 2147483647, // Max 32-bit z-index
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        cursor: "none",
      }}
    >
      <video
        ref={videoRef}
        src={videoSrc}
        loop
        playsInline
        autoPlay
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
    </div>
  );
};

export default Jumpscare;
