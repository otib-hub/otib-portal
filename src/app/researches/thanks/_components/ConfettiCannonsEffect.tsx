"use client";

import confetti from "canvas-confetti";

import { useEffect } from "react";

export function ConfettiCannonsEffect() {
    const triggerAnimation = () => {
        const end = Date.now() + 3 * 1000; // 3 seconds
        const colors = ["#24c45e", "#8c5df8", "#36de95", "#560db3"];

        const frame = () => {
            if (Date.now() > end) return;
            confetti({
                particleCount: 2,
                angle: 60,
                spread: 55,
                startVelocity: 60,
                origin: { x: 0, y: 0.5 },
                colors: colors,
            });
            confetti({
                particleCount: 2,
                angle: 120,
                spread: 55,
                startVelocity: 60,
                origin: { x: 1, y: 0.5 },
                colors: colors,
            });
            requestAnimationFrame(frame);
        };

        frame();
    };

    useEffect(() => {
        triggerAnimation()
    }, [])

    return (
        <span className="sr-only">
        </span>
    );
}
