import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function MouseFollower() {
    const [hoveredElement, setHoveredElement] = useState(null);
    const [cursorState, setCursorState] = useState({ width: 16, height: 16, x: -100, y: -100, borderRadius: 999 });

    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 400 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e) => {
            if (!hoveredElement) {
                cursorX.set(e.clientX - 8);
                cursorY.set(e.clientY - 8);
            }
        };

        const handleMouseOver = (e) => {
            const target = e.target.closest('button, a, [data-hover-target="true"]');
            if (target) {
                setHoveredElement(target);
            } else {
                setHoveredElement(null);
            }
        };

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, [hoveredElement, cursorX, cursorY]);

    useEffect(() => {
        if (hoveredElement) {
            const rect = hoveredElement.getBoundingClientRect();
            cursorX.set(rect.left);
            cursorY.set(rect.top);
            setCursorState({
                width: rect.width,
                height: rect.height,
                borderRadius: 12 // Slightly rounded corners for the "snap" effect
            });
        } else {
            setCursorState({
                width: 16,
                height: 16,
                borderRadius: 999
            });
        }
    }, [hoveredElement, cursorX, cursorY]);

    return (
        <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference bg-white"
            style={{
                x: cursorXSpring,
                y: cursorYSpring,
            }}
            animate={{
                width: cursorState.width,
                height: cursorState.height,
                borderRadius: cursorState.borderRadius,
            }}
            transition={{
                type: "spring",
                stiffness: 400,
                damping: 30
            }}
        />
    );
}
