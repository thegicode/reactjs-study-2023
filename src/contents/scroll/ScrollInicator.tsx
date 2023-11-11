import React, { useRef, useEffect } from "react";

const ScrollIndicator: React.FC = () => {
    const scrollContentRef = useRef<HTMLDivElement>(null);
    const indicatorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const scrollContent = scrollContentRef.current;
        const indicator = indicatorRef.current;

        const handleScroll = () => {
            if (scrollContent && indicator) {
                const maxScroll =
                    scrollContent.scrollWidth - scrollContent.clientWidth;
                const scrollLeft = scrollContent.scrollLeft;
                const scrollPercent = (scrollLeft / maxScroll) * 100;

                // 인디케이터 너비 고려
                const indicatorWidth =
                    (indicator.offsetWidth / scrollContent.clientWidth) * 100;
                const leftPosition = scrollPercent * (1 - indicatorWidth / 100);

                indicator.style.left = `${leftPosition}%`;
            }
        };

        if (scrollContent) {
            scrollContent.addEventListener("scroll", handleScroll);
        }

        return () => {
            if (scrollContent) {
                scrollContent.removeEventListener("scroll", handleScroll);
            }
        };
    }, []);

    return (
        <div className="scroll-container">
            <div className="scroll-content" ref={scrollContentRef}>
                <div style={{ width: "1000px" }}></div>
                {/* 여기에 가로 스크롤 내용 */}
            </div>
            <div className="scroll-indicator" ref={indicatorRef}></div>
        </div>
    );
};

export default ScrollIndicator;
