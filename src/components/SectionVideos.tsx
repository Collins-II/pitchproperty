"use client";

import Heading from "@/shared/Heading";
import NcPlayIcon from "@/shared/NcPlayIcon";
import NcPlayIcon2 from "@/shared/NcPlayIcon2";
import Image from "next/image";
import React, { FC, useState } from "react";
import SectionTitle from "./Common/SectionTitle";
import VideoPlayer from "./video_player";

export interface VideoType {
  id: string;
  videoUrl: string;
  title: string;
  thumbnail: string;
}

export interface SectionVideosProps {
  videos?: VideoType[];
  className?: string;
}

const VIDEOS_DEMO: VideoType[] = [
  {
    id: "Ao7e4iisKMs",
    videoUrl:"/videos/cityVid4.mp4",
    title: "Magical Scotland - 4K Scenic Relaxation Film with Calming Music",
    thumbnail:
      "/images/city3.jpg",
  },
  {
    id: "a5V6gdu5ih8",
    videoUrl:"/videos/cityVid5.mp4",
    title: "Magical Scotland - 4K Scenic Relaxation Film with Calming Music",
    thumbnail:
      "/images/cityLight.jpg",
  },
  {
    id: "MuB7HHeuNbc",
    videoUrl:"/videos/cityVid6.mp4",
    title: "Magical Scotland - 4K Scenic Relaxation Film with Calming Music",
    thumbnail:
      "/images/cityHome.jpg",
  },
  {
    id: "eEaZvEZye84",
    videoUrl:"/videos/cityVid7.mp4",
    title: "Magical Scotland - 4K Scenic Relaxation Film with Calming Music",
    thumbnail:
      "/images/cityBusi.jpg",
  },
  {
    id: "EuDJZDaSP0Q",
    videoUrl:"/videos/cityVid8.mp4",
    title: "Magical Scotland - 4K Scenic Relaxation Film with Calming Music",
    thumbnail:
      "/images/cityHonor.jpg",
  },
];

const SectionVideos: FC<SectionVideosProps> = ({
  videos = VIDEOS_DEMO,
  className = "",
}) => {
  const [isPlay, setIsPlay] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(0);

  const renderMainVideo = () => {
    const video: VideoType = videos[currentVideo];
    
    return (
      <div
        className="group aspect-w-16 aspect-h-16 sm:aspect-h-9 bg-neutral-800 rounded-3xl overflow-hidden sm:rounded-[50px] will-change-transform"
        title={video.title}
      >
        
           <VideoPlayer url={video.videoUrl} title={video.title}/>
      </div>
    );
  };

  const renderSubVideo = (video: VideoType, index: number) => {
    if (index === currentVideo) return null;
    return (
      <div
        className="group relative aspect-h-16 aspect-w-16 rounded-2xl cursor-pointer overflow-hidden sm:aspect-h-12 sm:rounded-3xl lg:aspect-h-9 "
        onClick={() => {
          setCurrentVideo(index);
          !isPlay && setIsPlay(true);
        }}
        title={video.title}
        key={String(index)}
      >
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <NcPlayIcon2 />
        </div>
        <Image
          fill
          className="object-cover w-full h-full transform transition-transform group-hover:scale-110 duration-300 "
          src={video.thumbnail}
          title={video.title}
          alt={video.title}
          sizes="(max-width: 300px) 100vw,
          (max-width: 1200px) 50vw,
          25vw"
        />
      </div>
    );
  };

  return (
    <div className={`nc-SectionVideos ${className}`}>
       <SectionTitle
          title="Where Comforts Meet Convenience"
          paragraph="Look for an agency with a proven track record of success in buying, selling, or renting properties. you want an agency that has been in the industry for a while and has experience dealing with various types of properties."
          center
          mb="20px"
        />


      <div className="flex flex-col relative sm:pr-4 sm:py-4 md:pr-6 md:py-6 xl:pr-14 xl:py-14 lg:flex-row">
        <div className="absolute -top-4 -bottom-4 -right-4 w-2/3 rounded-3xl bg-primary-100 bg-opacity-40 z-0 sm:rounded-[50px] md:top-0 md:bottom-0 md:right-0 xl:w-1/2 dark:bg-neutral-800 dark:bg-opacity-40"></div>
        <div className="flex-grow relative pb-2 sm:pb-4 lg:pb-0 lg:pr-5 xl:pr-6">
          {renderMainVideo()}
        </div>
        <div className="flex-shrink-0 grid gap-2 grid-cols-4 sm:gap-6 lg:grid-cols-1 lg:w-36 xl:w-40">
          {videos.map(renderSubVideo)}
        </div>
      </div>
    </div>
  );
};

export default SectionVideos;
