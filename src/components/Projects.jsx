// src/components/Projects.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import Card from './ui/Card'; // Adjust path
import Input from './ui/Input'; // Adjust path

const projectData = [
    {
        title: 'MoneyParce',
        description: 'A Django-based personal finance app for budgeting, tracking expenses, and setting savings goals with interactive charts and real-time insights.',
        tags: ['Python', 'Django', 'HTML', 'CSS'],
        link: 'https://money-parse2-7hc8.vercel.app/',
        repo: 'https://github.com/erick-caballero/MoneyParse2',
        image: '/moneyparce.jpg'
    },
    {
        title: 'Graphing Algorithm Trainer',
        description: 'A web app that randomly generates graphs and quizzes users on DFS, BFS, Dijkstra’s, Kruskal’s, and Prim’s algorithms to build intuition through practice.',
        tags: ['HTML', 'CSS', 'JS',],
        link: 'https://erick-caballero.github.io/graphalgotrainer/',
        repo: 'https://github.com/erick-caballero/graphalgotrainer',
        image: '/graphalgotrainer.jpg'
    },
    {
        title: 'Blackjack',
        description: 'A blackjack game built on the M5StickC PLUS2 using the ESP32, featuring hardware button controls, on-screen display, and a simple betting system to track wins and losses.',
        tags: ['C++', 'Arduino',],
        link: '#',
        repo: 'https://github.com/erick-caballero/blackjack',
        image: '/blackjack.jpg'
    },
    // Add more projects
];


function Projects() {
    const [filter, setFilter] = useState('');
    const filteredProjects = projectData.filter(p =>
        p.title.toLowerCase().includes(filter.toLowerCase()) ||
        p.tags.some(t => t.toLowerCase().includes(filter.toLowerCase()))
    );

    return (
        <section id="projects" className="py-24">
            <motion.h2
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-center mb-16 md:mb-20 text-gray-900 dark:text-white"
                initial={{ opacity: 0, y: -30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                My <span className="text-blue-600 dark:text-blue-400">Creations</span>
            </motion.h2>
            <div className="flex justify-center mb-16">
                <Input
                    type="search"
                    placeholder="Search projects (e.g., Python, Blackjack)"
                    value={filter}
                    onChange={e => setFilter(e.target.value)}
                    className="max-w-lg w-full text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 bg-white dark:bg-gray-800/50 border-gray-300 dark:border-gray-700 focus:ring-blue-500 focus:border-blue-500 rounded-lg shadow-sm"
                    aria-label="Search projects"
                />
            </div>
            <div className="grid gap-10 md:gap-12 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                <AnimatePresence>
                    {filteredProjects.map((proj, i) => (
                        <motion.div
                            key={proj.title + i}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.4, type: 'spring', stiffness: 200, damping: 25 }}
                            whileHover={{ y: -8, boxShadow: "0px 15px 30px -5px rgba(0,0,0,0.15), 0px 8px 10px -6px rgba(0,0,0,0.1)" }}
                            className="dark:shadow-gray-800/60"
                        >
                            <Card className="h-full flex flex-col overflow-hidden border border-gray-200 dark:border-gray-700/80 rounded-2xl bg-white dark:bg-gray-800 transition-all duration-300 group shadow-xl hover:shadow-2xl dark:shadow-gray-900/50 dark:hover:shadow-gray-800/70">
                                <div className="relative overflow-hidden">
                                    <img
                                        src={proj.image}
                                        alt={proj.title}
                                        className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-400 ease-in-out"
                                        onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x400/cccccc/333333?text=Project+Image'; }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </div>
                                <div className="p-6 flex flex-col flex-grow">
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {proj.tags.map(tag => (
                                            <span key={tag} className="text-xs font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/70 px-3 py-1.5 rounded-full shadow-sm">
                        {tag}
                      </span>
                                        ))}
                                    </div>
                                    <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{proj.title}</h3>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-5 flex-grow leading-relaxed">{proj.description}</p>
                                    <div className="mt-auto flex space-x-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                                        {proj.link && proj.link !== '#' && (
                                            <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold flex items-center space-x-1.5 text-sm group/link">
                                                <ExternalLink size={18} className="group-hover/link:scale-110 transition-transform"/>
                                                <span>Live Demo</span>
                                            </a>
                                        )}
                                        {proj.repo && proj.repo !== '#' && (
                                            <a href={proj.repo} target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 font-semibold flex items-center space-x-1.5 text-sm group/link">
                                                <Github size={18} className="group-hover/link:scale-110 transition-transform"/>
                                                <span>Source Code</span>
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
            {filteredProjects.length === 0 && (
                <motion.p
                    initial={{opacity: 0, y:10}} animate={{opacity:1, y:0}}
                    className="text-center text-gray-600 dark:text-gray-400 mt-12 text-lg"
                >
                    No projects found matching your search. Try a different keyword!
                </motion.p>
            )}
        </section>
    );
}

export default Projects;
