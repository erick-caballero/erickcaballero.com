import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Database, Layout, Server, Smartphone, Terminal, Briefcase, GraduationCap, Calendar } from 'lucide-react';

const skills = [
    { name: "React", icon: <Code2 />, level: 90, category: "Frontend" },
    { name: "TypeScript", icon: <Terminal />, level: 85, category: "Languages" },
    { name: "Node.js", icon: <Server />, level: 80, category: "Backend" },
    { name: "Tailwind CSS", icon: <Layout />, level: 95, category: "Frontend" },
    { name: "PostgreSQL", icon: <Database />, level: 75, category: "Database" },
    { name: "React Native", icon: <Smartphone />, level: 70, category: "Mobile" },
];

const experience = [
    {
        title: "Software Engineer Intern",
        company: "Tech Company Inc.",
        period: "May 2024 - Aug 2024",
        description: "Developed scalable web applications using React and Node.js. Improved performance by 40% through code optimization.",
        type: "work"
    },
    {
        title: "Full Stack Developer",
        company: "Freelance",
        period: "Jan 2023 - Present",
        description: "Building custom web solutions for clients. Specializing in e-commerce and portfolio sites.",
        type: "work"
    },
    {
        title: "Computer Science",
        company: "Georgia Institute of Technology",
        period: "2022 - 2026",
        description: "Focusing on Intelligence and Media threads. Active member of the Web Development Club.",
        type: "education"
    }
];

function SkillCard({ skill, index }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -5, scale: 1.05 }}
            className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 group"
        >
            <div className="w-12 h-12 rounded-xl bg-light-primary/10 dark:bg-dark-primary/10 flex items-center justify-center text-light-primary dark:text-dark-primary mb-4 group-hover:rotate-12 transition-transform duration-300">
                {skill.icon}
            </div>
            <h3 className="font-bold text-lg mb-2">{skill.name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{skill.category}</p>
            <div className="h-2 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full bg-gradient-to-r from-light-primary to-light-accent dark:from-dark-primary dark:to-dark-accent rounded-full"
                />
            </div>
        </motion.div>
    );
}

function TimelineItem({ item, index }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="relative pl-8 pb-12 last:pb-0 border-l-2 border-gray-200 dark:border-gray-800 ml-4 md:ml-0"
        >
            <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-white dark:bg-gray-900 border-2 border-light-primary dark:border-dark-primary" />

            <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        {item.type === 'work' ? <Briefcase size={18} className="text-light-primary dark:text-dark-primary" /> : <GraduationCap size={18} className="text-light-secondary dark:text-dark-secondary" />}
                        {item.title}
                    </h3>
                    <span className="text-sm font-medium px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 flex items-center gap-1">
                        <Calendar size={14} />
                        {item.period}
                    </span>
                </div>
                <p className="text-light-primary dark:text-dark-primary font-medium mb-2">{item.company}</p>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {item.description}
                </p>
            </div>
        </motion.div>
    );
}

export default function SkillsAndExperience() {
    return (
        <section id="experience-skills" className="py-20 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
                    {/* Skills Section */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="mb-10"
                        >
                            <h2 className="text-4xl font-bold mb-4">
                                Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-light-primary to-light-accent dark:from-dark-primary dark:to-dark-accent">Arsenal</span>
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400">
                                The tools and technologies I use to bring ideas to life.
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-2 gap-4 sm:gap-6">
                            {skills.map((skill, index) => (
                                <SkillCard key={index} skill={skill} index={index} />
                            ))}
                        </div>
                    </div>

                    {/* Experience Section */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="mb-10"
                        >
                            <h2 className="text-4xl font-bold mb-4">
                                My <span className="text-transparent bg-clip-text bg-gradient-to-r from-light-secondary to-light-accent dark:from-dark-secondary dark:to-dark-accent">Journey</span>
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400">
                                A timeline of my professional and academic growth.
                            </p>
                        </motion.div>

                        <div className="space-y-2">
                            {experience.map((item, index) => (
                                <TimelineItem key={index} item={item} index={index} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
