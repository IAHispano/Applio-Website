"use client"

import { supabaseTV } from '@/utils/database';
import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

const SwipeUI: React.FC = () => {
    const [videos, setVideos] = useState<{ url: string; title: string }[]>([]);
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

    const controls = useAnimation();

    useEffect(() => {
        const fetchVideos = async () => {
            const { data, error } = await supabaseTV
                .from('videos')
                .select('video_url, title');

            if (error) {
                console.error('Error fetching videos:', error);
            } else {
                const videoData = data.map((video: { video_url: string; title: string }) => ({
                    url: `https://www.youtube.com/embed/${video.video_url}?autoplay=1&start=33`,
                    title: video.title
                }));

                setVideos(videoData);
            }
        };

        fetchVideos();
    }, []);

    const nextVideo = () => {
        setCurrentVideoIndex((currentVideoIndex + 1) % videos.length);
    };

    const prevVideo = () => {
        setCurrentVideoIndex((currentVideoIndex - 1 + videos.length) % videos.length);
    };

    const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
        if (event.deltaY > 0) {
            controls.start({ opacity: 0 });
            nextVideo();
        } else {
            controls.start({ opacity: 0 });
            prevVideo();
        }
    };

    return (
        <div className="h-[60svh] md:w-[100svh] max-md:mx-4" onWheel={handleWheel}>
            <div className="w-full h-full">
                {videos.length > 0 ? (
                    <motion.iframe
                        className='w-full h-full object-fill bg-black/10 rounded-xl'
                        src={videos[currentVideoIndex].url}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    ></motion.iframe>
                ) : (
                    <p className='text-xs text-center'>Loading...</p>
                )}
            </div>
            <div className="flex justify-between gap-4 mt-4 text-xs">
                <button onClick={prevVideo} className='bg-white/10 hover:bg-white/20 px-4 py-1 rounded-md'>Back</button>
                <p className='md:max-w-3xl max-w-[120px] text-sm md:text-xl tracking-tight truncate font-medium'>{videos[currentVideoIndex]?.title}</p>
                <button onClick={nextVideo} className='bg-white/10 hover:bg-white/20 px-4 py-1 rounded-md'>Next</button>
            </div>
        </div>
    );
};

export default SwipeUI;
