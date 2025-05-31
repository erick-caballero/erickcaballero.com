// src/components/Footer.jsx
import React from 'react';
import { Github, Linkedin } from 'lucide-react';
import { motion } from 'framer-motion';

function Footer() {
    return (
        <footer className="text-center py-10 md:py-12 text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700/50 bg-gray-50 dark:bg-gray-900">
            <div className="flex justify-center space-x-6 mb-6">
                <a href="https://github.com/erick-caballero" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors transform hover:scale-110">
                    <Github size={28} />
                </a>
                <a href="https://www.linkedin.com/in/erickcaballero2/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors transform hover:scale-110">
                    <Linkedin size={28} />
                </a>
            </div>
            <p className="mb-1">Made with <motion.span animate={{scale:[1,1.3,1]}} transition={{repeat:Infinity, duration:1.2, ease:"easeInOut"}} className="inline-block text-red-500">🧠</motion.span> and I guess React, Tailwind CSS, and Framer Motion too.</p>
            <p className="mb-3">© {new Date().getFullYear()} Erick Caballero. All Rights Reserved.</p>
        </footer>
    );
}

export default Footer;
