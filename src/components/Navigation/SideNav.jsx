import React from 'react';
import { Home, Folder, Briefcase, Mail } from 'lucide-react';

const SideNav = ({ activeSection, sections, scrollToSection }) => {
    const icons = [Home, Folder, Briefcase, Mail];

    return (
        <>
            {/* Navigation Dots (Leftmost) */}
            <div className="fixed left-10 top-1/2 transform -translate-y-1/2 z-50 hidden lg:flex flex-col gap-8">
                {sections.map((section, index) => (
                    <button
                        key={section.id}
                        onClick={() => scrollToSection(index)}
                        className="group flex items-center focus:outline-none"
                        aria-label={`Scroll to ${section.label}`}
                    >
                        <div
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${activeSection === index
                                ? 'bg-dark-accent scale-150 shadow-[0_0_10px_rgba(6,182,212,0.8)]'
                                : 'bg-white/20 group-hover:bg-white/50'
                                }`}
                        />
                    </button>
                ))}
            </div>

            {/* Glass Icon Bar (Floating next to dots) - Thicker & Bigger */}
            <div className="fixed left-24 top-1/2 transform -translate-y-1/2 z-50 hidden lg:flex flex-col gap-10 p-6 rounded-[2rem] border-2 border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">
                {sections.map((section, index) => {
                    const Icon = icons[index] || Home;
                    const isActive = activeSection === index;
                    return (
                        <button
                            key={section.id}
                            onClick={() => scrollToSection(index)}
                            className={`group relative p-3 rounded-xl transition-all duration-300 ${isActive
                                    ? 'text-white bg-dark-accent/20 shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                                    : 'text-gray-400 hover:text-white hover:bg-white/10'
                                }`}
                            aria-label={section.label}
                        >
                            <Icon size={28} strokeWidth={isActive ? 2 : 1.5} />

                            {/* Tooltip */}
                            <span className="absolute left-full ml-6 px-3 py-2 rounded-lg bg-black/80 border border-white/10 text-sm font-medium text-white opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 whitespace-nowrap pointer-events-none backdrop-blur-md">
                                {section.label}
                            </span>
                        </button>
                    );
                })}
            </div>
        </>
    );
};

export default SideNav;
