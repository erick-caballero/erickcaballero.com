import React from 'react';
import { Home, Folder, Briefcase, Mail } from 'lucide-react';

const SideNav = ({ activeSection, sections, scrollToSection }) => {
    const icons = [Home, Folder, Briefcase, Mail];

    return (
        <>
            {/* Navigation Dots (Leftmost) - Keeping these as they are subtle indicators */}
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
                                ? 'bg-white scale-125'
                                : 'bg-white/20 group-hover:bg-white/50'
                                }`}
                        />
                    </button>
                ))}
            </div>

            {/* Glass Icon Bar (Floating next to dots) - Redesigned */}
            <div className="fixed left-24 top-1/2 transform -translate-y-1/2 z-50 hidden lg:flex flex-col gap-6 p-4 rounded-3xl border border-white/10 bg-black/20 backdrop-blur-xl shadow-2xl">
                {sections.map((section, index) => {
                    const Icon = icons[index] || Home;
                    const isActive = activeSection === index;
                    return (
                        <button
                            key={section.id}
                            onClick={() => scrollToSection(index)}
                            className={`group relative p-4 rounded-2xl transition-all duration-300 ${isActive
                                ? 'text-black bg-white'
                                : 'text-white/50 hover:text-white hover:bg-white/10'
                                }`}
                            aria-label={section.label}
                            data-hover-target="true"
                        >
                            <Icon size={32} strokeWidth={2.5} />

                            {/* Tooltip */}
                            <span className="absolute left-full ml-6 px-4 py-2 rounded-xl bg-white text-black text-sm font-bold opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 whitespace-nowrap pointer-events-none shadow-lg">
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
