import React, { useState, useEffect, useRef } from 'react';
import SideNav from '../Navigation/SideNav';

const FullPageScroll = ({ children }) => {
    const [activeSection, setActiveSection] = useState(0);
    const containerRef = useRef(null);
    const sections = React.Children.toArray(children);

    // Extract labels from children props or default to generic names
    const sectionLabels = sections.map((child) => child.props.label || 'Section');
    const sectionIds = sections.map((child, index) => ({ id: index, label: sectionLabels[index] }));

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleScroll = () => {
            const scrollPosition = container.scrollTop;
            const windowHeight = window.innerHeight;
            const index = Math.round(scrollPosition / windowHeight);
            setActiveSection(index);
        };

        container.addEventListener('scroll', handleScroll);
        return () => container.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (index) => {
        const container = containerRef.current;
        if (!container) return;

        container.scrollTo({
            top: index * window.innerHeight,
            behavior: 'smooth'
        });
    };

    return (
        <div className="relative w-full h-screen overflow-hidden bg-dark-bg text-dark-text">
            <SideNav
                activeSection={activeSection}
                sections={sectionIds}
                scrollToSection={scrollToSection}
            />

            <div
                ref={containerRef}
                className="h-full w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth no-scrollbar"
                style={{ scrollBehavior: 'smooth' }}
            >
                {sections.map((child, index) => (
                    <section
                        key={index}
                        className="h-screen w-full snap-start snap-always flex items-center justify-center relative overflow-hidden"
                    >
                        {child}
                    </section>
                ))}
            </div>
        </div>
    );
};

export default FullPageScroll;
