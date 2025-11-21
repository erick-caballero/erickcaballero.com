import React from 'react';
import { Download, Briefcase, GraduationCap } from 'lucide-react';

const experience = [
    {
        company: "Tech Company Inc.",
        role: "Software Engineer Intern",
        period: "2024",
        description: "Optimized core services and built scalable features using React and Node.js.",
        type: 'work'
    },
    {
        company: "Freelance",
        role: "Full Stack Developer",
        period: "2023 - Present",
        description: "Delivering custom web solutions. Specialized in Next.js and Tailwind CSS.",
        type: 'work'
    },
    {
        company: "Georgia Tech",
        role: "Computer Science Student",
        period: "2022 - 2026",
        description: "Specializing in Intelligence and Media. Coursework in Algorithms and AI.",
        type: 'edu'
    }
];

const skills = [
    "JavaScript (ES6+)", "TypeScript", "React", "Next.js", "Node.js", "Python", "Java", "C++", "PostgreSQL", "AWS", "Git"
];

export default function SkillsAndExperience() {
    return (
        <section className="h-full flex items-center justify-center py-10 overflow-y-auto no-scrollbar pl-12 md:pl-0">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid md:grid-cols-12 gap-12">

                {/* Left Column: Header & Skills (4 cols) */}
                <div className="md:col-span-5 space-y-10">
                    <div>
                        <h2 className="text-5xl md:text-6xl font-light text-white mb-6">Experience</h2>
                        <p className="text-xl text-gray-400 font-light leading-relaxed mb-8">
                            My professional journey and technical arsenal.
                        </p>
                        <a
                            href="/resume.pdf"
                            target="_blank"
                            className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-full text-white font-medium transition-all"
                        >
                            Download Resume <Download size={20} />
                        </a>
                    </div>

                    <div>
                        <h3 className="text-sm font-mono text-gray-500 uppercase tracking-wider mb-6">Technologies</h3>
                        <div className="flex flex-wrap gap-2">
                            {skills.map((skill, index) => (
                                <span key={index} className="px-4 py-2 rounded-lg bg-dark-surface border border-white/5 text-gray-300 hover:text-white hover:border-dark-accent/50 transition-colors cursor-default">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column: Timeline Cards (8 cols) */}
                <div className="md:col-span-7 space-y-6">
                    {experience.map((item, index) => (
                        <div key={index} className="group p-8 rounded-3xl bg-dark-surface border border-white/5 hover:border-dark-accent/30 transition-all hover:shadow-lg hover:shadow-dark-accent/5">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-2xl font-bold text-white group-hover:text-dark-accent transition-colors">
                                        {item.company}
                                    </h3>
                                    <p className="text-lg text-gray-400 font-medium">{item.role}</p>
                                </div>
                                <span className="px-3 py-1 rounded-full bg-white/5 text-sm font-mono text-gray-500 border border-white/5">
                                    {item.period}
                                </span>
                            </div>
                            <p className="text-gray-500 font-light leading-relaxed">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
