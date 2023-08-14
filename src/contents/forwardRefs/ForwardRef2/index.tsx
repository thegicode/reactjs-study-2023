import React, { useRef } from "react";
import MyVideoPlayer from "./MyVideoPlayer";

export default function App() {
    const ref = useRef<HTMLVideoElement | null>(null);

    return (
        <div className="forwardRef2">
            <button onClick={() => ref.current?.play()}>Play</button>
            <button onClick={() => ref.current?.pause()}>Pause</button>
            <br />
            <MyVideoPlayer
                ref={ref}
                src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
                type="video/mp4"
                width="250"
            />
        </div>
    );
}
