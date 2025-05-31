// src/components/SkillsAndExperience.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Award, Users } from 'lucide-react'; // Icons for Timeline
import Timeline from './Timeline'; // Adjust path

const skills = [
    { name: 'JavaScript (ES6+)', level: 90, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg' },
    { name: 'React & Next.js', level: 85, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
    { name: 'Tailwind CSS', level: 95, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
    { name: 'Python', level: 100, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' },
    { name: 'Java', level: 100, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original-wordmark.svg' },
    { name: 'C++', level: 80, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg' },
    { name: 'Git & GitHub', level: 100, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg' },
    { name: 'Databases (SQL & NoSQL)', level: 70, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg' },
];

const education = [
    { year: 'Expected 2026', title: "Bachelor of Science in Computer Science", org: 'Georgia Institute of Technology, Atlanta, GA', details: 'Concentrations: Media & People. Key Coursework: Data Structures & Algorithms, Object-Oriented Programming, Advanced Web Development, Database Systems.' },
    { year: '2022', title: "Associate of Science in Computer Science", org: 'College of Coastal Georgia, Brunswick, GA', details: 'Graduated with High Honors. Dean\'s List all semesters.' },
];

const experience = [
    { year: 'Present', title: "Freelance Web Developer", org: 'Self-Employed', details: 'Developed and deployed custom web apps and backend services for 6 clients as of today.' },
    { year: 'Mid 2024 - 2025', title: "Software Engineering Intern", org: 'Bloomberg', details: 'Utilized SQL on Bloomberg databases to implement new data models for trade analytics, significantly improving query efficiency by 25% and supporting richer reporting.' },
    { year: '2023 - Mid 2024', title: "Software Engineering Intern", org: 'Team Fray', details: 'Created a web-based dashboard using C# and ASP.NET to facilitate real-time player data analytics.\n' },
    { year: '2020 - 2022', title: "Teaching Assistant", org: 'College of Coastal Georgia', details: 'Assisted in instructing Introduction to Programming (Python), supporting over 50 students through labs and\n' +
            'assignments.\n'}
];

function SkillsAndExperience() {
    return (
        <motion.section
            id="experience-skills"
            className="py-24 space-y-20 md:space-y-24"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
        >
            <motion.h2
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white text-center"
                initial={{ opacity: 0, y: -30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                My <span className="text-blue-600 dark:text-blue-400">Toolkit & Journey</span>
            </motion.h2>

            <div>
                <h3 className="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white text-center mb-12 md:mb-16">Technical Skills</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 md:gap-8 max-w-5xl mx-auto px-4">
                    {skills.map((skill, idx) => (
                        <motion.div
                            key={skill.name}
                            className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col items-center text-center border border-gray-200 dark:border-gray-700/80 transform hover:-translate-y-1"
                            initial={{ opacity: 0, y: 25 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.1 }}
                            transition={{ duration: 0.4, delay: idx * 0.07, ease: "easeOut" }}
                        >
                            <img src={skill.icon} alt={`${skill.name} icon`} className="w-14 h-14 mb-4" onError={(e) => e.target.style.display='none'} />
                            <p className="text-md font-semibold text-gray-800 dark:text-gray-100 mb-2.5">{skill.name}</p>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                                <motion.div
                                    className="bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500 h-3 rounded-full"
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${skill.level}%` }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1.2, delay: 0.3 + idx * 0.07, ease: "circOut" }}
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <Timeline title="Professional Experience" items={experience} icon={Award} dotColor="green" />
            <Timeline title="Educational Background" items={education} icon={Users} dotColor="purple" />
        </motion.section>
    );
}

export default SkillsAndExperience;
