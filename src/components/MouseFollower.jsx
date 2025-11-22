import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useVelocity, useTransform } from 'framer-motion';

export default function MouseFollower() {
    const [hoveredElement, setHoveredElement] = useState(null);

    // Mouse position
    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    // Smooth spring animation for cursor movement
    const springConfig = { damping: 25, stiffness: 400 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    // Velocity for "teardrop" / stretch effect
    const velocityX = useVelocity(cursorX);
    const velocityY = useVelocity(cursorY);

    // Transform velocity into scale values (stretch when moving fast)
    const scaleX = useTransform(velocityX, [-1000, 0, 1000], [1.2, 1, 1.2]);
    const scaleY = useTransform(velocityY, [-1000, 0, 1000], [1.2, 1, 1.2]);

    useEffect(() => {
        const moveCursor = (e) => {
            // Only update if not snapped to an element
            if (!hoveredElement) {
                mouseX.set(e.clientX - 8);
                mouseY.set(e.clientY - 8);
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
    }, [hoveredElement, mouseX, mouseY]);

    // Handle snapping logic
    useEffect(() => {
        if (hoveredElement) {
            const rect = hoveredElement.getBoundingClientRect();
            mouseX.set(rect.left);
            mouseY.set(rect.top);
        }
    }, [hoveredElement, mouseX, mouseY]);

    return (
        <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference bg-white"
            style={{
                x: cursorX,
                y: cursorY,
                scaleX: hoveredElement ? 1 : scaleX, // Disable stretch when snapped
                scaleY: hoveredElement ? 1 : scaleY,
            }}
            animate={{
                width: hoveredElement ? hoveredElement.getBoundingClientRect().width : 16,
                height: hoveredElement ? hoveredElement.getBoundingClientRect().height : 16,
                borderRadius: hoveredElement ? 12 : 999,
                opacity: hoveredElement ? 1 : 0.5, // Semi-transparent default
            }}
            transition={{
                type: "spring",
                stiffness: 400,
                damping: 30
            }}
        />
    );
}
