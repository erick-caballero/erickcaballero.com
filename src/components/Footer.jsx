import React from 'react';
import { motion } from 'framer-motion';

export default function Footer() {
    return (
        <footer className="py-12 border-t border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-black/50 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-center md:text-left">
                    <h3 className="text-2xl font-bold tracking-tight mb-1">Erick Caballero</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                        Building digital experiences with heart and code.
                    </p>
                </div>

                <div className="flex items-center gap-8">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        © {new Date().getFullYear()} All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
