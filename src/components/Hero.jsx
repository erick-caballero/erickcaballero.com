// src/components/Hero.jsx
import React from 'react';
import { Github, Linkedin, Code, Send } from 'lucide-react';
import { motion } from 'framer-motion';

function Hero() {
    return (
        <section id="hero" className="min-h-screen flex flex-col items-center justify-center text-center py-20 pt-28 md:pt-20 space-y-10 relative overflow-hidden">
            <motion.div
                className="absolute top-1/5 left-1/5 w-40 h-40 bg-blue-400 dark:bg-blue-600 rounded-full opacity-20 dark:opacity-15 filter blur-2xl"
                animate={{ scale: [1, 1.1, 1], x: [0, 30, 0], y: [0, -30, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute bottom-1/5 right-1/5 w-32 h-32 bg-purple-400 dark:bg-purple-600 rounded-full opacity-20 dark:opacity-15 filter blur-2xl"
                animate={{ scale: [1, 0.9, 1], x: [0, -25, 0], y: [0, 25, 0] }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            />

            <motion.div
                initial={{ opacity: 0, scale:0.8 }}
                animate={{ opacity: 1, scale:1 }}
                transition={{ duration: 0.6, delay: 0.1, type: "spring", stiffness:100 }}
                className="z-10"
            >
                <img
                    src="portfoliopic.jpg"
                    alt="Rick - Profile Picture"
                    className="w-40 h-40 md:w-48 md:h-48 object-cover rounded-full mx-auto mb-6 shadow-2xl border-4 border-white dark:border-gray-800 transform hover:scale-105 transition-transform duration-300"
                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/192x192/cccccc/333333?text=R'; }}
                />
            </motion.div>

            <motion.h1
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-gray-900 dark:text-white z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
            >
                Hello! I'm <span className="text-blue-600 dark:text-blue-400">Erick</span>
            </motion.h1>
            <motion.p
                className="max-w-xl md:max-w-2xl text-lg md:text-xl text-gray-700 dark:text-gray-300 z-10 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
            >
                A dedicated <strong className="font-semibold text-gray-800 dark:text-gray-100">Computer Science student</strong> at Georgia Tech, building efficient, creative, and user-focused solutions through clean and thoughtful code.
            </motion.p>
            <motion.div
                className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.7 }}
            >
                <a
                    href="#projects" onClick={(e) => { e.preventDefault(); document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }); }}
                    className="px-10 py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center space-x-2.5"
                >
                    <Code size={22} />
                    <span>View My Work</span>
                </a>
                <a
                    href="#contact" onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
                    className="px-10 py-4 bg-gray-700 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-gray-800 dark:bg-gray-600 dark:hover:bg-gray-500 transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center space-x-2.5"
                >
                    <Send size={22} />
                    <span>Get In Touch</span>
                </a>
            </motion.div>
            <motion.div
                className="flex space-x-8 mt-10 z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.9 }}
            >
                <a href="https://github.com/erick-caballero" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors transform hover:scale-110">
                    <Github size={32} />
                </a>
                <a href="https://www.linkedin.com/in/erickcaballero2/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors transform hover:scale-110">
                    <Linkedin size={32} />
                </a>
            </motion.div>
        </section>
    );
}

export default Hero;
