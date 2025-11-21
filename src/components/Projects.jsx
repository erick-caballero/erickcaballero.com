import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Github, ExternalLink, Code2, Search } from 'lucide-react';

const projects = [
    {
        title: "Portfolio V1",
        description: "My previous portfolio site built with React and Tailwind CSS. Featured a clean dark mode design.",
        tags: ["React", "Tailwind", "Framer Motion"],
        github: "https://github.com/erick-caballero",
        demo: "#",
        image: "https://placehold.co/600x400/1e293b/ffffff?text=Portfolio+V1"
    },
    {
        title: "E-Commerce Dashboard",
        description: "A comprehensive dashboard for managing online stores. Includes real-time analytics and inventory management.",
        tags: ["Next.js", "TypeScript", "Prisma"],
        github: "https://github.com/erick-caballero",
        demo: "#",
        image: "https://placehold.co/600x400/0f172a/ffffff?text=Dashboard"
    },
    {
        title: "AI Chat Interface",
        description: "A modern chat interface for interacting with LLMs. Features streaming responses and code highlighting.",
        tags: ["React", "OpenAI API", "Vite"],
        github: "https://github.com/erick-caballero",
        demo: "#",
        image: "https://placehold.co/600x400/171717/ffffff?text=AI+Chat"
    },
    {
        title: "Task Manager",
        description: "A collaborative task management tool with drag-and-drop functionality and team workspaces.",
        tags: ["Vue", "Firebase", "Pinia"],
        github: "https://github.com/erick-caballero",
        demo: "#",
        image: "https://placehold.co/600x400/334155/ffffff?text=Task+Manager"
    }
];

function TiltCard({ project, index }) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
    const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

    function onMouseMove({ currentTarget, clientX, clientY }) {
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        x.set(clientX - left - width / 2);
        y.set(clientY - top - height / 2);
    }

    function onMouseLeave() {
        x.set(0);
        y.set(0);
    }

    const rotateX = useTransform(mouseY, [-200, 200], [10, -10]);
    const rotateY = useTransform(mouseX, [-200, 200], [-10, 10]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            style={{ perspective: 1000 }}
            className="h-full"
        >
            <motion.div
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                onMouseMove={onMouseMove}
                onMouseLeave={onMouseLeave}
                className="relative h-full bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-xl group hover:shadow-2xl transition-shadow duration-300"
            >
                <div style={{ transform: "translateZ(50px)" }} className="mb-6 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 aspect-video relative">
                    <div className="absolute inset-0 bg-light-primary/10 dark:bg-dark-primary/10 group-hover:opacity-0 transition-opacity duration-300 z-10" />
                    <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                </div>

                <div style={{ transform: "translateZ(30px)" }}>
                    <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-light-primary dark:group-hover:text-dark-primary transition-colors">
                        {project.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                        {project.description}
                    </p>
                </div>

                <div style={{ transform: "translateZ(20px)" }} className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
                            {tag}
                        </span>
                    ))}
                </div>

                <div style={{ transform: "translateZ(40px)" }} className="flex items-center gap-4 mt-auto">
                    <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-light-primary dark:hover:text-dark-primary transition-colors"
                    >
                        <Github size={18} /> Code
                    </a>
                    <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-light-primary dark:hover:text-dark-primary transition-colors"
                    >
                        <ExternalLink size={18} /> Live Demo
                    </a>
                </div>
            </motion.div>
        </motion.div>
    );
}

export default function Projects() {
    const [filter, setFilter] = useState("");

    const filteredProjects = projects.filter(p =>
        p.title.toLowerCase().includes(filter.toLowerCase()) ||
        p.tags.some(t => t.toLowerCase().includes(filter.toLowerCase()))
    );

    return (
        <section id="projects" className="py-20 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">
                            Selected <span className="text-transparent bg-clip-text bg-gradient-to-r from-light-primary to-light-accent dark:from-dark-primary dark:to-dark-accent">Works</span>
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 max-w-xl">
                            A collection of projects that showcase my passion for building digital products.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search projects..."
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="pl-12 pr-6 py-3 rounded-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary outline-none w-full md:w-64 transition-shadow shadow-sm"
                        />
                    </motion.div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-12">
                    {filteredProjects.map((project, index) => (
                        <TiltCard key={index} project={project} index={index} />
                    ))}
                </div>

                {filteredProjects.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-gray-500 dark:text-gray-400 text-lg">No projects found matching your search.</p>
                    </div>
                )}
            </div>
        </section>
    );
}
