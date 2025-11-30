import React, { useEffect, useState, useMemo } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function MouseFollower() {
    const [hoveredElement, setHoveredElement] = useState(null);
    const [isTextHover, setIsTextHover] = useState(false); // New state for text inputs
    const [isClicking, setIsClicking] = useState(false);
    const [targetRadius, setTargetRadius] = useState(12);

    // Mouse position
    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    // Main cursor spring
    const springMain = { damping: 25, stiffness: 400 };
    const cursorX = useSpring(mouseX, springMain);
    const cursorY = useSpring(mouseY, springMain);

    // Generate trails
    // Increased count for smoother, longer tail
    const TRAIL_COUNT = 40;
    const trails = [];

    // Create springs for each trail
    for (let i = 0; i < TRAIL_COUNT; i++) {
        // HEAD (i=0) needs to be instant to act as the cursor
        // TAIL needs to be loose to create the blob effect even at low speeds

        // Stiffness: Start high (800) for the head, decay to 50 for the tail
        // This steep decay ensures the tail drags behind significantly
        const stiffness = Math.max(800 - (i * 18), 50);

        // Damping: Start high (50) to prevent overshoot at the head, decay to 10
        const damping = Math.max(50 - (i * 1), 10);

        trails.push({
            x: useSpring(mouseX, { stiffness, damping }),
            y: useSpring(mouseY, { stiffness, damping }),
            id: i
        });
    }

    useEffect(() => {
        const moveCursor = (e) => {
            // Allow movement if NOT hovering an interactive element (buttons/links)
            // We DO want to track movement for text inputs (isTextHover)
            if (!hoveredElement) {
                mouseX.set(e.clientX);
                mouseY.set(e.clientY);
            }
        };

        const handleMouseOver = (e) => {
            // Check for text inputs first
            const textTarget = e.target.closest('input[type="text"], input[type="email"], input[type="search"], input[type="number"], textarea, [contenteditable="true"]');
            if (textTarget) {
                setIsTextHover(true);
                setHoveredElement(null);
                return;
            } else {
                setIsTextHover(false);
            }

            // Check for interactive elements
            const target = e.target.closest('button, a, [data-hover-target="true"]');
            if (target) {
                setHoveredElement(target);
                const style = window.getComputedStyle(target);
                const radius = parseFloat(style.borderRadius);
                setTargetRadius(isNaN(radius) ? 0 : radius);
            } else {
                setHoveredElement(null);
                setTargetRadius(12);
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
    }, [hoveredElement, isTextHover, mouseX, mouseY]);

    useEffect(() => {
        if (hoveredElement) {
            const rect = hoveredElement.getBoundingClientRect();
            mouseX.set(rect.left + rect.width / 2);
            mouseY.set(rect.top + rect.height / 2);
        }
    }, [hoveredElement, mouseX, mouseY]);

    const renderTrail = (trail, index) => {
        // Taper size: Use a convex curve (power > 1) to keep the body fuller for longer
        const progress = index / TRAIL_COUNT;
        const size = 40 * (1 - Math.pow(progress, 1.5));

        return (
            <motion.div
                key={trail.id}
                className="absolute top-0 left-0 pointer-events-none"
                style={{ x: trail.x, y: trail.y }}
            >
                <motion.div
                    className="bg-white rounded-full"
                    style={{ x: "-50%", y: "-50%" }}
                    animate={{
                        width: size,
                        height: size,
                    }}
                />
            </motion.div>
        );
    };

    return (
        <>
            {/* SVG Filter for Gooey Effect */}
            <svg style={{ position: 'absolute', width: 0, height: 0 }}>
                <defs>
                    <filter id="goo">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
                        <feColorMatrix
                            in="blur"
                            mode="matrix"
                            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 35 -15"
                            result="goo"
                        />
                        <feComposite in="SourceGraphic" in2="goo" operator="atop" />
                    </filter>
                </defs>
            </svg>

            <div
                className="fixed inset-0 pointer-events-none z-[9999]"
                style={{
                    filter: (hoveredElement || isTextHover) ? 'none' : 'url(#goo)',
                    // Keep opacity at 0.6 for text hover too, so it's not blinding
                    opacity: hoveredElement ? 1 : 0.6,
                    transition: 'opacity 0.2s ease'
                }}
            >
                {/* Trails - Render ONLY when moving freely (not hovering anything) */}
                {!hoveredElement && !isTextHover && trails.map((trail, i) => renderTrail(trail, i))}

                {/* Main Cursor - Render ONLY when hovering (snaps to element) OR text hover */}
                {(hoveredElement || isTextHover) && (
                    <motion.div
                        className="absolute top-0 left-0 pointer-events-none"
                        style={{ x: cursorX, y: cursorY }}
                    >
                        <motion.div
                            className="bg-white"
                            style={{ x: "-50%", y: "-50%" }}
                            animate={{
                                // If text hover: I-beam shape (width 4, height 32)
                                // If element hover: Match element size
                                width: isTextHover ? 4 : hoveredElement?.getBoundingClientRect().width,
                                height: isTextHover ? 32 : hoveredElement?.getBoundingClientRect().height,
                                borderRadius: isTextHover ? 2 : targetRadius,
                                scale: isClicking ? 0.9 : 1,
                                opacity: isTextHover ? 0.8 : 0.3, // Slightly higher for text visibility but not 1
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 500,
                                damping: 28,
                                duration: 0.1
                            }}
                        />
                    </motion.div>
                )}
            </div>
        </>
    );
}
