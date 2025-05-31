// src/App.jsx
import React, { useState, useEffect } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { motion } from 'framer-motion'; // Keep if App-level animations are needed, otherwise remove

// Context
import AppContext from './context/AppContext';

// Core Components
import ErrorBoundary from './components/ErrorBoundary';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import About from './components/About';
import SkillsAndExperience from './components/SkillsAndExperience';
import Contact from './components/Contact';
import Footer from './components/Footer';

// Main App Component
export default function App() {
    const [darkMode, setDarkMode] = useState(() => {
        if (typeof window !== 'undefined') {
            const savedMode = localStorage.getItem('darkMode');
            if (savedMode !== null) return JSON.parse(savedMode);
            return window.matchMedia?.('(prefers-color-scheme: dark)').matches;
        }
        return false;
    });

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('darkMode', JSON.stringify(darkMode));
    }, [darkMode]);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = (e) => {
            if (localStorage.getItem('darkMode') === null) {
                setDarkMode(e.matches);
            }
        };
        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    return (
        <HelmetProvider>
            <AppContext.Provider value={{ darkMode, toggleDark: () => setDarkMode(d => !d) }}>
                <Helmet>
                    <title>Erick's Portfolio</title>
                    <link rel="icon" type="image/svg+xml" href="src/assets/favicon.svg"/>
                    <meta name="description" content="Rick - A Georgia Tech CS student crafting innovative and performant web solutions with React, Next.js, and cutting-edge technologies. Explore my projects and journey." />
                    <meta name="keywords" content="React Developer, Web Developer, Portfolio, Georgia Tech, Computer Science, JavaScript, Next.js, Tailwind CSS, Frontend Developer, Software Engineer, Java" />
                    <meta property="og:title" content="Rick's Developer Portfolio - Modern Web Experiences" />
                    <meta property="og:description" content="Discover the projects, skills, and journey of Rick, a passionate web developer." />
                    <meta property="og:type" content="website" />
                    {/* Google Fonts links can remain here or be moved to index.html head */}
                </Helmet>

                <ErrorBoundary>
                    <div className="min-h-screen font-sans bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-gray-200 transition-colors duration-300 scroll-smooth selection:bg-blue-500 selection:text-white">
                        <Navbar /> {/* darkMode and toggleDark are now accessed via context in Navbar */}
                        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pt-28 md:pt-10 space-y-28 md:space-y-36">
                            <Hero />
                            <Projects />
                            <About />
                            <SkillsAndExperience />
                            <Contact />
                        </main>
                        <Footer />
                    </div>
                </ErrorBoundary>
            </AppContext.Provider>
        </HelmetProvider>
    );
}
