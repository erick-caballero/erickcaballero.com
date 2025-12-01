import React, { useState, useEffect } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

// Context
import AppContext from './context/AppContext';

// Core Components
import ErrorBoundary from './components/ErrorBoundary';
import FullPageScroll from './components/Layout/FullPageScroll';
import MouseFollower from './components/MouseFollower';
import Hero from './components/Hero';
import Projects from './components/Projects';
import SkillsAndExperience from './components/SkillsAndExperience';
import Contact from './components/Contact';
import Navbar from './components/Navbar';

export default function App() {
    // Default to true (Dark Mode) - keeping logic but enforcing dark for this design mostly
    const [darkMode, setDarkMode] = useState(true);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        document.documentElement.classList.add('dark');
    }, []);

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <HelmetProvider>
            <AppContext.Provider value={{ darkMode, toggleDark: () => { } }}>
                <Helmet>
                    <title>Erick Caballero's Portfolio</title>
                    <meta name="theme-color" content="#0a0a0a" />
                </Helmet>

                <ErrorBoundary>
                    <div className="hidden md:block">
                        <MouseFollower />
                    </div>
                    <div className="relative overflow-hidden selection:bg-dark-primary selection:text-white font-sans text-dark-text bg-dark-bg">

                        {/* Global Spotlight Effect */}
                        <div
                            className="hidden md:block pointer-events-none fixed inset-0 z-30 transition duration-300"
                            style={{
                                background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.15), transparent 80%)`
                            }}
                        />

                        {/* Background Texture */}
                        <div className="fixed inset-0 z-[-1] h-full w-full bg-dark-bg">
                            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                            {/* Ambient Orbs - Updated Colors */}
                            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-dark-primary/20 blur-[120px] animate-float" />
                            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-dark-secondary/20 blur-[120px] animate-float animation-delay-2000" />
                        </div>

                        <FullPageScroll>
                            <div label="Home" className="w-full h-full">
                                <Hero />
                            </div>
                            <div label="Projects" className="w-full h-full">
                                <Projects />
                            </div>
                            <div label="Experience" className="w-full h-full">
                                <SkillsAndExperience />
                            </div>
                            <div label="Contact" className="w-full h-full">
                                <Contact />
                            </div>
                        </FullPageScroll>

                        <div className="block lg:hidden">
                            <Navbar />
                        </div>

                    </div>
                </ErrorBoundary>
            </AppContext.Provider>
        </HelmetProvider>
    );
}
