import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

export default function Hero({ scrollToSection }) {
    return (
        <section className="h-screen flex flex-col justify-center relative overflow-hidden pl-24 md:pl-32 pr-8">
            <div className="max-w-[1600px] w-full mx-auto z-10">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <h1 className="text-7xl md:text-9xl font-bold text-white tracking-tight leading-none mb-8">
                        Erick <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">
                            Caballero.
                        </span>
                    </h1>

                    <p className="text-2xl md:text-3xl text-gray-400 max-w-2xl font-medium leading-relaxed mb-12">
                        Software Engineer building digital experiences that matter.
                    </p>

                    <div className="flex gap-6">
                        <button
                            onClick={() => scrollToSection(1)}
                            className="group relative px-8 py-4 bg-white text-black rounded-full text-lg font-bold overflow-hidden transition-all hover:scale-105"
                            data-hover-target="true"
                        >
                            <span className="relative z-10">View Projects</span>
                        </button>

                        <button
                            onClick={() => scrollToSection(3)}
                            className="group px-8 py-4 rounded-full border border-white/20 text-white text-lg font-bold hover:bg-white/10 transition-all"
                            data-hover-target="true"
                        >
                            Contact Me
                        </button>
                    </div>
                </motion.div>
            </div>

            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />

            <motion.div
                className="absolute bottom-12 left-32 text-white/30 animate-bounce cursor-pointer"
                onClick={() => scrollToSection(1)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
            >
                <ArrowDown size={32} />
            </motion.div>
        </section>
    );
}
