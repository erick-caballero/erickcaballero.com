import React from 'react';
import { Download, Briefcase, GraduationCap, ArrowUpRight } from 'lucide-react';

const workExperience = [
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
    }
];

const education = [
    {
        school: "Georgia Tech",
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
        <section className="min-h-screen flex flex-col justify-center py-20 pl-24 md:pl-32 pr-8 md:pr-16 overflow-y-auto">
            <div className="max-w-[1600px] w-full mx-auto grid lg:grid-cols-12 gap-16 lg:gap-24">

                {/* Left Column: Header & Skills */}
                <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-12">
                    <div>
                        <h2 className="text-6xl md:text-8xl font-bold text-white mb-8 tracking-tight">
                            Experience
                        </h2>
                        <p className="text-2xl text-gray-400 leading-relaxed mb-10 max-w-md">
                            My professional journey and technical arsenal.
                        </p>
                        <a
                            href="/resume.pdf"
                            target="_blank"
                            className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full text-lg font-bold transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                            data-hover-target="true"
                        >
                            Download Resume <Download size={24} className="group-hover:translate-y-1 transition-transform" />
                        </a>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold text-white uppercase tracking-widest mb-6 opacity-50">Technologies</h3>
                        <div className="flex flex-wrap gap-3">
                            {skills.map((skill, index) => (
                                <span key={index} className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-colors cursor-default">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column: Timeline */}
                {/* Right Column: Timeline */}
                <div className="lg:col-span-7 flex flex-col justify-center space-y-8">
                    {/* Work Experience */}
                    <div className="space-y-8">
                        {workExperience.map((item, index) => (
                            <div key={index} className="group relative pl-8 border-l-2 border-white/10 hover:border-white transition-colors duration-500">
                                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-black border-2 border-white/20 group-hover:border-white group-hover:bg-white transition-all duration-500" />

                                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-2">
                                    <h3 className="text-3xl font-bold text-white group-hover:text-white/80 transition-colors">
                                        {item.company}
                                    </h3>
                                    <span className="text-lg font-mono text-gray-500 mt-1 sm:mt-0">
                                        {item.period}
                                    </span>
                                </div>

                                <p className="text-xl text-white/60 font-medium mb-2">{item.role}</p>
                                <p className="text-lg text-gray-400 leading-relaxed max-w-2xl">
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Divider */}
                    <div className="py-4 flex items-center gap-4">
                        <div className="h-px bg-white/10 flex-grow" />
                        <span className="text-white/30 text-sm font-mono uppercase tracking-widest">Education</span>
                        <div className="h-px bg-white/10 flex-grow" />
                    </div>

                    {/* Education */}
                    <div className="space-y-8">
                        {education.map((item, index) => (
                            <div key={index} className="group relative pl-8 border-l-2 border-white/10 hover:border-[#FFD700] transition-colors duration-500">
                                {/* Custom Icon for Education */}
                                <div className="absolute -left-[11px] top-0 w-6 h-6 rounded-full bg-black border-2 border-white/20 group-hover:border-[#FFD700] group-hover:bg-[#FFD700] transition-all duration-500 flex items-center justify-center">
                                    <GraduationCap size={12} className="text-transparent group-hover:text-black transition-colors duration-300" />
                                </div>

                                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-2">
                                    <h3 className="text-3xl font-bold text-white group-hover:text-[#FFD700] transition-colors">
                                        {item.school}
                                    </h3>
                                    <span className="text-lg font-mono text-gray-500 mt-1 sm:mt-0">
                                        {item.period}
                                    </span>
                                </div>

                                <p className="text-xl text-white/60 font-medium mb-2">{item.role}</p>
                                <p className="text-lg text-gray-400 leading-relaxed max-w-2xl">
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
