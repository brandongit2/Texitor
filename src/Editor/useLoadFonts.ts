import { useEffect, useState } from "react";

export function useLoadFonts(
    isOpen: boolean,
    numFonts: number,
    containerRef: React.RefObject<HTMLDivElement>,
    spacer1Ref: React.RefObject<HTMLDivElement>,
    spacer2Ref: React.RefObject<HTMLDivElement>
) {
    const [visibleFonts, setVisibleFonts] = useState([0, 10]);

    useEffect(() => {
        let anim: number;

        function showFonts() {
            if (
                isOpen &&
                containerRef.current &&
                spacer1Ref.current &&
                spacer2Ref.current
            ) {
                const scrollPos = containerRef.current.scrollTop;
                const visiblePortion = [
                    Math.round(Math.max(scrollPos - 200, 0) / 30),
                    Math.round(
                        Math.min(
                            scrollPos +
                                containerRef.current.getBoundingClientRect()
                                    .height +
                                200,
                            numFonts * 30
                        ) / 30
                    ),
                ];

                setVisibleFonts(visiblePortion);
                spacer1Ref.current.style.height = `${visiblePortion[0] * 30}px`;
                spacer2Ref.current.style.height = `${
                    (numFonts - visiblePortion[1]) * 30
                }px`;
            }

            anim = requestAnimationFrame(showFonts);
        }
        anim = requestAnimationFrame(showFonts);

        return () => {
            cancelAnimationFrame(anim);
        };
    }, [containerRef, spacer1Ref, spacer2Ref, isOpen, numFonts]);

    return visibleFonts;
}
