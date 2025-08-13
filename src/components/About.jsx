// src/components/About.jsx
import React from 'react';
import { motion } from 'framer-motion';

function About() {
    return (
        <motion.section
            id="about"
            className="py-24 bg-gray-50 dark:bg-gray-800/30 rounded-3xl shadow-xl scroll-mt-28 md:scroll-mt-36"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
        >
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.h2
                    className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white text-center mb-16"
                    initial={{ opacity: 0, y: -30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                >
                    More About <span className="text-blue-600 dark:text-blue-400">Me</span>
                </motion.h2>

                <div className="grid md:grid-cols-[auto,1fr] gap-12 items-start">
                    {/* Profile Image */}
                    <motion.div
                        className="flex justify-center md:justify-start -mt-8"
                        initial={{ scale: 0.7, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", stiffness: 100, delay: 0.2, duration: 0.5 }}
                    >
                        <img
                            src="public/portfolio%20pic.jpg"
                            alt="Rick - About Me"
                            className="w-48 h-48 md:w-56 md:h-56 object-cover rounded-full shadow-2xl border-4 border-white dark:border-gray-700 hover:scale-105 transition-transform duration-300"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = 'https://placehold.co/224x224/cccccc/333333?text=RA';
                            }}
                        />
                    </motion.div>

                    {/* About Text */}
                    <div className="space-y-6 text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                        <motion.p
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                        >
                            Hey, I'm Rick, a CS student at Georgia Tech. I have a passion for coding,
                            algorithms, and understanding how things work under the hood.
                        </motion.p>
                        <motion.p
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            I spend a lot of my time trying to master data structures and optimize my work.
                        </motion.p>
                        <motion.p
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                        >
                            When I'm not coding, I'm either playing with my cat, gaming, drawing, or watching anime.
                        </motion.p>
                    </div>
                </div>
            </div>
        </motion.section>
    );
}

export default About;
