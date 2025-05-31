// src/components/About.jsx
import React from 'react';
import { motion } from 'framer-motion';

function About() {
    return (
        <motion.section
            id="about"
            className="py-24 bg-gray-50 dark:bg-gray-800/30 rounded-3xl shadow-xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, ease:"easeOut" }}
        >
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.h2
                    className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white text-center mb-16 md:mb-20"
                    initial={{ opacity: 0, y: -30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6, delay:0.1, ease: "easeOut" }}
                >
                    More About <span className="text-blue-600 dark:text-blue-400">Me</span>
                </motion.h2>
                <div className="flex flex-col md:flex-row items-center md:items-start gap-10 md:gap-16">
                    <motion.img
                        src="https://media.licdn.com/dms/image/v2/D4E03AQEVQ9c6wRcRwA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1721679828327?e=1753920000&v=beta&t=Ce1JRWQj7W6Rm1dvhXU775lZnf6k_ASqNkgdWJET1kM"
                        alt="Rick - About Me"
                        className="w-48 h-48 md:w-56 md:h-56 object-cover rounded-full shadow-2xl border-4 border-white dark:border-gray-700 flex-shrink-0 transform hover:scale-105 transition-transform duration-300"
                        onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/224x224/cccccc/333333?text=RA'; }}
                        initial={{ scale: 0.7, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", stiffness: 100, delay: 0.2, duration: 0.5 }}
                    />
                    <div className="text-center md:text-left">
                        <motion.p
                            className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-6 leading-relaxed"
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.6, delay:0.3 }}
                        >
                            Hey, I'm Rick, a computer science student at Georgia Tech with a passion for coding, algorithms, and understanding how tech works under the hood. I spend a lot of my time mastering data structures and problem-solving through efficient code. When I'm not programming, I'm into gaming—especially shooters and platformers, drawing, and anime.
                        </motion.p>

                    </div>
                </div>
            </div>
        </motion.section>
    );
}

export default About;
