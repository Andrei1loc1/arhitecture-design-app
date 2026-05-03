"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

export default function CubeCursor() {
    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    const x = useSpring(mouseX, {
        stiffness: 2000,
        damping: 80,
        mass: 0.15,
    });

    const y = useSpring(mouseY, {
        stiffness: 2000,
        damping: 80,
        mass: 0.15,
    });

    useEffect(() => {
        function handleMouseMove(event: MouseEvent) {
            mouseX.set(event.clientX - 16);
            mouseY.set(event.clientY - 16);
        }

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, [mouseX, mouseY]);

    return (
        <motion.div
            className="pointer-events-none fixed left-0 top-0 z-[9999] hidden h-8 w-8 md:block"
            style={{ x, y }}
        >
            <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                animate={{ rotate: 360 }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "linear",
                }}
            >
                <path
                    d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"
                    stroke="#B39458"
                    strokeWidth="1.9"
                    strokeOpacity="0.65"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="m3.3 7 8.7 5 8.7-5"
                    stroke="#B39458"
                    strokeWidth="1.8"
                    strokeOpacity="0.65"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M12 22V12"
                    stroke="#B39458"
                    strokeWidth="1.8"
                    strokeOpacity="0.65"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </motion.svg>
        </motion.div>
    );
}