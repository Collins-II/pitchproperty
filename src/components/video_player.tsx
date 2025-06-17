"use client";

import { useEffect, useRef } from "react";

interface VideoProps {
    url: string;
    title: string;
}

export default function VideoPlayer({url, title}: VideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoElement.play(); // Play video when in view
          } else {
            videoElement.pause(); // Pause video when out of view
          }
        });
      },
      { threshold: 0.5 } // Adjust threshold for when the video should play
    );

    observer.observe(videoElement);

    return () => {
      observer.unobserve(videoElement);
    };
  }, []);

  return (
      <div
        className="group aspect-w-16 aspect-h-16 sm:aspect-h-9 bg-neutral-800 overflow-hidden will-change-transform"
        title="Kingsland City's Central Park"
      >
        <video
          ref={videoRef}
          src={url}
          title={title}
          className="w-full h-full object-cover"
          muted
          controls
          autoPlay
          loop
          playsInline
        />
    </div>
  );
}
