import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function MouseFollower() {
    const [hoveredElement, setHoveredElement] = useState(null);
    const [isClicking, setIsClicking] = useState(false);
    const [targetRadius, setTargetRadius] = useState(12); // Default radius

    // Mouse position - Center Origin
    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    // Spring configurations
    // Main cursor: Snappy
    const springMain = { damping: 28, stiffness: 500 };
    // Trails: Progressively looser
    const springTrail1 = { damping: 30, stiffness: 450 };
    const springTrail2 = { damping: 32, stiffness: 400 };
    const springTrail3 = { damping: 34, stiffness: 350 };
    const springTrail4 = { damping: 36, stiffness: 300 };
    const springTrail5 = { damping: 38, stiffness: 250 };

    const cursorX = useSpring(mouseX, springMain);
    const cursorY = useSpring(mouseY, springMain);

    const trail1X = useSpring(mouseX, springTrail1);
    const trail1Y = useSpring(mouseY, springTrail1);

    const trail2X = useSpring(mouseX, springTrail2);
    const trail2Y = useSpring(mouseY, springTrail2);

    const trail3X = useSpring(mouseX, springTrail3);
    const trail3Y = useSpring(mouseY, springTrail3);

    const trail4X = useSpring(mouseX, springTrail4);
    const trail4Y = useSpring(mouseY, springTrail4);

    const trail5X = useSpring(mouseX, springTrail5);
    const trail5Y = useSpring(mouseY, springTrail5);

    useEffect(() => {
        const moveCursor = (e) => {
            if (!hoveredElement) {
                // Center origin: We track the EXACT mouse position
                // The elements will translate(-50%, -50%) to center themselves
                mouseX.set(e.clientX);
                mouseY.set(e.clientY);
            }
        };

        const handleMouseOver = (e) => {
            const target = e.target.closest('button, a, [data-hover-target="true"]');
            if (target) {
                setHoveredElement(target);
                // Capture the computed border radius
                const style = window.getComputedStyle(target);
                const radius = parseFloat(style.borderRadius);
                setTargetRadius(isNaN(radius) ? 0 : radius);
            } else {
                setHoveredElement(null);
                setTargetRadius(12); // Reset to default circle radius
            }
        };

        const handleMouseDown = () => setIsClicking(true);
        const handleMouseUp = () => setIsClicking(false);

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mouseover', handleMouseOver);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mouseover', handleMouseOver);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [hoveredElement, mouseX, mouseY]);

    useEffect(() => {
        if (hoveredElement) {
            const rect = hoveredElement.getBoundingClientRect();
            // Snap logic: Center on element
            mouseX.set(rect.left + rect.width / 2);
            mouseY.set(rect.top + rect.height / 2);
        }
    }, [hoveredElement, mouseX, mouseY]);

    // Common trail styles
    const trailStyle = "absolute top-0 left-0 rounded-full bg-white -translate-x-1/2 -translate-y-1/2";

    return (
        <motion.div
            className="fixed inset-0 pointer-events-none z-[9999]"
            animate={{
                opacity: hoveredElement ? 0.3 : 0.5,
            }}
        >
            {/* Trail 5 (Smallest, furthest back) */}
            <motion.div
                className={trailStyle}
                style={{ x: trail5X, y: trail5Y }}
                animate={{
                    width: hoveredElement ? hoveredElement.getBoundingClientRect().width - 8 : 14,
                    height: hoveredElement ? hoveredElement.getBoundingClientRect().height - 8 : 14,
                    borderRadius: hoveredElement ? targetRadius : 999,
                    opacity: hoveredElement ? 0 : 1,
                }}
            />

            {/* Trail 4 */}
            <motion.div
                className={trailStyle}
                style={{ x: trail4X, y: trail4Y }}
                animate={{
                    width: hoveredElement ? hoveredElement.getBoundingClientRect().width - 8 : 16,
                    height: hoveredElement ? hoveredElement.getBoundingClientRect().height - 8 : 16,
                    borderRadius: hoveredElement ? targetRadius : 999,
                    opacity: hoveredElement ? 0 : 1,
                }}
            />

            {/* Trail 3 */}
            <motion.div
                className={trailStyle}
                style={{ x: trail3X, y: trail3Y }}
                animate={{
                    width: hoveredElement ? hoveredElement.getBoundingClientRect().width - 8 : 18,
                    height: hoveredElement ? hoveredElement.getBoundingClientRect().height - 8 : 18,
                    borderRadius: hoveredElement ? targetRadius : 999,
                    opacity: hoveredElement ? 0 : 1,
                }}
            />

            {/* Trail 2 */}
            <motion.div
                className={trailStyle}
                style={{ x: trail2X, y: trail2Y }}
                animate={{
                    width: hoveredElement ? hoveredElement.getBoundingClientRect().width - 8 : 20,
                    height: hoveredElement ? hoveredElement.getBoundingClientRect().height - 8 : 20,
                    borderRadius: hoveredElement ? targetRadius : 999,
                    opacity: hoveredElement ? 0 : 1,
                }}
            />

            {/* Trail 1 */}
            <motion.div
                className={trailStyle}
                style={{ x: trail1X, y: trail1Y }}
                animate={{
                    width: hoveredElement ? hoveredElement.getBoundingClientRect().width - 8 : 22,
                    height: hoveredElement ? hoveredElement.getBoundingClientRect().height - 8 : 22,
                    borderRadius: hoveredElement ? targetRadius : 999,
                    opacity: hoveredElement ? 0 : 1,
                }}
            />

            {/* Main Cursor */}
            <motion.div
                className="absolute top-0 left-0 bg-white -translate-x-1/2 -translate-y-1/2"
                style={{ x: cursorX, y: cursorY }}
                animate={{
                    width: hoveredElement ? hoveredElement.getBoundingClientRect().width - 8 : 24,
                    height: hoveredElement ? hoveredElement.getBoundingClientRect().height - 8 : 24,
                    borderRadius: hoveredElement ? targetRadius : 999,
                    scale: isClicking ? 0.9 : 1,
                }}
                transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 28
                }}
            />
        </motion.div>
    );
}
