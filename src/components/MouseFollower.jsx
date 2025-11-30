import React, { useEffect, useState, useMemo } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function MouseFollower() {
    const [hoveredElement, setHoveredElement] = useState(null);
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
    // Increased count and tighter physics to prevent separation at high speeds (especially horizontal)
    const TRAIL_COUNT = 20;
    const trails = [];

    // Create springs for each trail
    for (let i = 0; i < TRAIL_COUNT; i++) {
        // We start stiffness much closer to the main cursor (400) to keep the "neck" connected
        // 400 -> 390 -> 380 ...
        const stiffness = 400 - (i * 10);
        const damping = 28 - (i * 0.5);

        trails.push({
            x: useSpring(mouseX, { stiffness, damping }),
            y: useSpring(mouseY, { stiffness, damping }),
            id: i
        });
    }

    useEffect(() => {
        const moveCursor = (e) => {
            if (!hoveredElement) {
                mouseX.set(e.clientX);
                mouseY.set(e.clientY);
            }
        };

        const handleMouseOver = (e) => {
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
    }, [hoveredElement, mouseX, mouseY]);

    useEffect(() => {
        if (hoveredElement) {
            const rect = hoveredElement.getBoundingClientRect();
            mouseX.set(rect.left + rect.width / 2);
            mouseY.set(rect.top + rect.height / 2);
        }
    }, [hoveredElement, mouseX, mouseY]);

    const renderTrail = (trail, index) => {
        // Taper size: Start at 28 and go down to 6
        // Slower taper since we have more trails
        const size = 28 * (1 - index / TRAIL_COUNT);

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
                        {/* Increased deviation slightly to help merge the gap */}
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
                    filter: hoveredElement ? 'none' : 'url(#goo)',
                }}
            >
                {/* Trails */}
                {!hoveredElement && trails.map((trail, i) => renderTrail(trail, i))}

                {/* Main Cursor */}
                <motion.div
                    className="absolute top-0 left-0 pointer-events-none"
                    style={{ x: cursorX, y: cursorY }}
                >
                    <motion.div
                        className="bg-white"
                        style={{ x: "-50%", y: "-50%" }}
                        animate={{
                            width: hoveredElement ? hoveredElement.getBoundingClientRect().width : 32,
                            height: hoveredElement ? hoveredElement.getBoundingClientRect().height : 32,
                            borderRadius: hoveredElement ? targetRadius : 999,
                            scale: isClicking ? 0.9 : 1,
                            opacity: hoveredElement ? 0.3 : 1,
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 28,
                            duration: 0.1
                        }}
                    />
                </motion.div>
            </div>
        </>
    );
}
