import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, ArrowUpRight } from 'lucide-react';

const projects = [
    {
        title: "Kirby's Ride Registry",
        description: "Full-stack platform for users to upload, manage, and rate vehicles. Over 8,000 uploads and 3,000 active users.",
        tags: ["Node.js", "Supabase", "Cloudinary"],
        github: "",
        demo: "https://kirbyrideregistry.com",
        image: "/kirby.jpg",
    },
    {
        title: "Blackjack Game",
        description: "Blackjack game for the M5StickC Plus2 with a betting system, GUI, and automated dealer.",
        tags: ["C++", "Arduino"],
        github: "https://github.com/erick-caballero/blackjack",
        demo: "#",
        image: "/blackjack.jpg",
    },
    {
        title: "Graphing Algorithm Trainer",
        description: "Interactive visualizer for BFS, DFS, Dijkstra algorithms.",
        tags: ["JS", "HTML/CSS"],
        github: "https://github.com/erick-caballero/graphalgotrainer",
        demo: "https://erick-caballero.github.io/graphalgotrainer/",
        image: "/graphalgotrainer.jpg",
    },
    {
        title: "MoneyParce",
        description: "Personal finance tracker for budgeting.",
        tags: ["Python", "Django", "HTML/CSS"],
        github: "https://github.com/erick-caballero/MoneyParse2",
        demo: "https://money-parse2-7hc8.vercel.app/",
        image: "/moneyparce.jpg",
    },
    {
        title: "Voxel Editor",
        description: "3D modeling tool with C++ and OpenGL.",
        tags: ["Three.js", "HTML/CS"],
        github: "https://github.com/erick-caballero/voxeleditor",
        demo: "https://erick-caballero.github.io/voxeleditor/",
        image: "/voxeleditor.jpg",
    },
    /*
    {
        title: "E-Commerce Platform",
        description: "Full-stack shopping experience with Stripe integration.",
        tags: ["Next.js", "Stripe", "PostgreSQL"],
        github: "https://github.com/erick-caballero",
        demo: "#",
        image: "/ecommerce.jpg",
    },
    {
        title: "Weather Dashboard",
        description: "Real-time weather tracking with OpenWeatherMap API.",
        tags: ["React", "API", "Tailwind"],
        github: "https://github.com/erick-caballero",
        demo: "#",
        image: "/weather.jpg",
    },
    {
        title: "Task Manager",
        description: "Productivity tool with drag-and-drop kanban board.",
        tags: ["Vue.js", "Firebase"],
        github: "https://github.com/erick-caballero",
        demo: "#",
        image: "/taskmanager.jpg",
    }*/
];

function ProjectCard({ project, index }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group relative flex flex-col h-full"
        >
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl mb-6 border border-white/10 bg-white/5">
                <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x450/1a1a1a/ffffff?text=' + project.title; }}
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />

                {/* Floating Action Button */}
                {project.github && (
                    <a
                        href={project.github}
                        target="_blank"
                        className="absolute top-4 right-4 p-3 bg-white text-black rounded-full opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:scale-110"
                        data-hover-target="true"
                    >
                        <Github size={40} />
                    </a>
                )}
            </div>

            <div className="flex-1 flex flex-col">
                <div className="flex items-start justify-between mb-4">
                    <h3 className="text-3xl font-bold text-white group-hover:text-white/80 transition-colors">
                        {project.title}
                    </h3>
                    {project.demo !== "#" && (
                        <a
                            href={project.demo}
                            target="_blank"
                            className="flex items-center gap-2 text-white font-bold bg-white/10 px-4 py-2 rounded-full hover:bg-white hover:text-black transition-all"
                            data-hover-target="true"
                        >
                            <span>Visit Site</span>
                            <ArrowUpRight size={20} />
                        </a>
                    )}
                </div>

                <p className="text-xl text-gray-400 mb-6 line-clamp-2 flex-1">
                    {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                        <span key={tag} className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-bold text-white/70">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}

export default function Projects() {
    const [visibleCount, setVisibleCount] = useState(2);
    const expanded = visibleCount > 4;

    const toggleProjects = () => {
        if (expanded) {
            setVisibleCount(2);
        } else {
            setVisibleCount(projects.length);
        }
    };

    return (
        <section id="projects" className="h-auto lg:h-full flex flex-col py-12 lg:py-20 px-6 md:pl-32 md:pr-16 lg:overflow-y-auto">
            <div className="max-w-[1600px] w-full mx-auto my-auto">
                <div className="mb-12 lg:mb-16">
                    <h2 className="text-6xl md:text-6xl lg:text-8xl font-bold text-white mb-4 lg:mb-6 tracking-tighter md:tracking-tight">
                        Projects
                    </h2>
                    <p className="text-lg md:text-2xl text-gray-400 max-w-2xl">
                        A selection of my recent work.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-x-12 gap-y-12 lg:gap-y-20 mb-16">
                    {projects.slice(0, visibleCount).map((project, index) => (
                        <ProjectCard key={index} project={project} index={index} />
                    ))}
                </div>

                {projects.length > 4 && (
                    <div className="flex justify-center pb-8">
                        <button
                            onClick={toggleProjects}
                            className="group flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/10 rounded-full text-white font-bold text-lg hover:bg-white hover:text-black transition-all"
                            data-hover-target="true"
                        >
                            {expanded ? 'Show Less' : 'Show More Projects'}
                            <ArrowUpRight
                                size={24}
                                className={`transition-transform duration-300 ${expanded ? 'rotate-[-135deg]' : 'rotate-45 group-hover:rotate-90'}`}
                            />
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}
