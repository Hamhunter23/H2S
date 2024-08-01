import React, { useState, useEffect, useRef, useCallback } from 'react';

const useYouTubeAPI = () => {
    const [apiReady, setApiReady] = useState(false);

    useEffect(() => {
        if (!window.YT) {
            const tag = document.createElement('script');
            tag.src = "https://www.youtube.com/iframe_api";
            const firstScriptTag = document.getElementsByTagName('script')[0];
            if (firstScriptTag && firstScriptTag.parentNode) {
                firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
            }

            (window as any).onYouTubeIframeAPIReady = () => setApiReady(true);
        } else {
            setApiReady(true);
        }
    }, []);

    return apiReady;
};

interface YouTubeEmbedProps {
    videoUrl: string;
    onTimeUpdate?: (videoId: string | null, time: number) => void;
}

const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({ videoUrl, onTimeUpdate }) => {
    const playerRef = useRef<HTMLDivElement>(null);
    const playerInstanceRef = useRef<YT.Player | null>(null);
    const intervalRef = useRef<number | null>(null);
    const [watchedTime, setWatchedTime] = useState(0);
    const apiReady = useYouTubeAPI();
    const currentVideoIdRef = useRef<string | null>(null);

    const getVideoId = useCallback((url: string) => {
        try {
            const urlObj = new URL(url);
            return urlObj.searchParams.get('v') || urlObj.pathname.slice(1);
        } catch (error) {
            console.error('Invalid URL:', url);
            return null;
        }
    }, []);

    const clearInterval = useCallback(() => {
        if (intervalRef.current) {
            window.clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    }, []);

    const onPlayerStateChange = useCallback((event: YT.OnStateChangeEvent) => {
        const videoId = currentVideoIdRef.current;
        if (event.data === (window as any).YT.PlayerState.PLAYING) {
            clearInterval();
            intervalRef.current = window.setInterval(() => {
                const currentTime = event.target.getCurrentTime();
                setWatchedTime(currentTime);
                if (videoId) {
                    onTimeUpdate?.(videoId, currentTime);
                }
            }, 1000);
        } else if (event.data === (window as any).YT.PlayerState.PAUSED || event.data === (window as any).YT.PlayerState.ENDED) {
            clearInterval();
        }
    }, [clearInterval, onTimeUpdate]);

    const initializePlayer = useCallback(() => {
        const videoId = getVideoId(videoUrl);
        currentVideoIdRef.current = videoId;
        
        if (!videoId) return;
    
        if (apiReady && playerRef.current) {
            if (playerInstanceRef.current) {
                playerInstanceRef.current.cueVideoById(videoId);
            } else {
                playerInstanceRef.current = new (window as any).YT.Player(playerRef.current, {
                    videoId: videoId,
                    playerVars: {
                        autoplay: 0,
                        controls: 1,
                    },
                    events: {
                        'onReady': (event: YT.PlayerEvent) => {
                            console.log("Player is ready");
                        },
                        'onStateChange': onPlayerStateChange
                    }
                });
            }
        }
    }, [apiReady, videoUrl, onPlayerStateChange, getVideoId]);

    useEffect(() => {
        if (apiReady) {
            initializePlayer();
        }
    }, [apiReady, initializePlayer]);

    useEffect(() => {
        return () => {
            clearInterval();
            if (playerInstanceRef.current) {
                playerInstanceRef.current.destroy();
            }
        };
    }, [clearInterval]);

    return (
        <div ref={playerRef} className="w-full h-full rounded-2xl px-2 py-2 youtube-embed"></div>
    );
};

export default YouTubeEmbed;