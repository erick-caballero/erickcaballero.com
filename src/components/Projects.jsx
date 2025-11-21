import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';

const projects = [
    {
        title: "Blackjack Game",
        description: "Java-based game with GUI and AI dealer.",
        tags: ["Java", "Swing", "OOP"],
        github: "https://github.com/erick-caballero",
        demo: "#",
        image: "/blackjack.jpg",
    },
    {
        title: "Graph Algo Trainer",
        description: "Interactive visualizer for BFS, DFS, Dijkstra.",
        tags: ["JS", "HTML/CSS"],
        github: "https://github.com/erick-caballero",
        demo: "#",
        image: "/graphalgotrainer.jpg",
    },
    {
        title: "MoneyParce",
        description: "Personal finance tracker for budgeting.",
        tags: ["React", "Node.js"],
        github: "https://github.com/erick-caballero",
        demo: "#",
        image: "/moneyparce.jpg",
    },
    {
        title: "Voxel Editor",
        description: "3D modeling tool with C++ and OpenGL.",
        tags: ["C++", "OpenGL"],
        github: "https://github.com/erick-caballero",
        demo: "#",
        image: "/voxeleditor.jpg",
    }
];

function ProjectCard({ project }) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

    const handleMouseMove = (e) => {
        const rect = e.target.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateY,
                rotateX,
                transformStyle: "preserve-3d",
            }}
            className="min-w-[350px] md:min-w-[500px] h-[600px] relative group rounded-3xl bg-dark-surface border border-white/10 overflow-hidden shadow-2xl mx-4"
        >
            <div
                style={{ transform: "translateZ(50px)" }}
                className="absolute inset-0"
            >
                <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x800/1a1a1a/ffffff?text=' + project.title; }}
                    draggable="false"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80" />
            </div>

            <div
                style={{ transform: "translateZ(75px)" }}
                className="absolute inset-0 p-10 flex flex-col justify-end pointer-events-none"
            >
                <h3 className="text-4xl font-bold text-white mb-3 drop-shadow-lg">{project.title}</h3>
                <p className="text-gray-200 text-lg mb-6 line-clamp-3 drop-shadow-md">{project.description}</p>

                <div className="flex items-center justify-between pointer-events-auto">
                    <div className="flex gap-2">
                        {project.tags.map(tag => (
                            <span key={tag} className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold text-white border border-white/10">
                                {tag}
                            </span>
                        ))}
                    </div>
                    <div className="flex gap-4">
                        <a href={project.github} target="_blank" className="p-3 rounded-full bg-white/10 hover:bg-white text-white hover:text-black transition-all"><Github size={24} /></a>
                        {project.demo !== "#" && <a href={project.demo} target="_blank" className="p-3 rounded-full bg-white/10 hover:bg-white text-white hover:text-black transition-all"><ExternalLink size={24} /></a>}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default function Projects() {
    const carouselRef = useRef(null);
    const [width, setWidth] = useState(0);

    useEffect(() => {
        if (carouselRef.current) {
            setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
        }
    }, []);

    return (
        <section className="h-full flex flex-col justify-center py-10 overflow-hidden pl-24 md:pl-32">
            <div className="max-w-7xl w-full mb-12 pr-8">
                <h2 className="text-5xl md:text-6xl font-light text-white mb-4">
                    Selected Works
                </h2>
                <p className="text-xl text-gray-400">Interactive gallery. Hover and drag to explore.</p>
            </div>

            <div className="w-full overflow-visible cursor-grab active:cursor-grabbing py-10">
                <motion.div
                    ref={carouselRef}
                    className="flex gap-8"
                    drag="x"
                    dragConstraints={{ right: 0, left: -width }}
                    whileTap={{ cursor: "grabbing" }}
                >
                    {projects.map((project, index) => (
                        <ProjectCard key={index} project={project} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
