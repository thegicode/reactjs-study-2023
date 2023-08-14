import React, { forwardRef, ForwardedRef } from "react";

interface VideoPlayerProps {
    src: string;
    type: string;
    width: string | number;
}

const VideoPlayer = forwardRef<HTMLVideoElement, VideoPlayerProps>(
    (
        { src, type, width }: VideoPlayerProps,
        ref: ForwardedRef<HTMLVideoElement>
    ) => {
        return (
            <video width={width} ref={ref}>
                <source src={src} type={type} />
            </video>
        );
    }
);

export default VideoPlayer;
