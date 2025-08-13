// src/components/Contact.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mail, Linkedin, Github, CheckCircle2, XCircle, Loader2 } from 'lucide-react'; // Added Mail, Linkedin, Github
import Input from './ui/Input';
import Textarea from './ui/Textarea';

function Modal({ open, onClose, tone = 'info', title, message }) {
    const toneStyles = {
        success: {
            ring: 'ring-blue-600/20 dark:ring-green-600/20',
            bg: 'bg-white/85 dark:bg-gray-900/85',
            badge: 'bg-blue-100 text-blue-700 dark:bg-green-900/60 dark:text-green-200',
            icon: <CheckCircle2 className="w-7 h-7" />,
            accent: 'from-blue-500/40 via-indigo-500/40 to-blue-500/40 dark:from-green-500/40 dark:via-emerald-500/40 dark:to-green-500/40',
        },
        error: {
            ring: 'ring-red-600/20',
            bg: 'bg-white/85 dark:bg-gray-900/85',
            badge: 'bg-red-100 text-red-700 dark:bg-red-900/60 dark:text-red-200',
            icon: <XCircle className="w-7 h-7" />,
            accent: 'from-red-500/40 via-rose-500/40 to-red-500/40',
        },
        info: {
            ring: 'ring-blue-600/20',
            bg: 'bg-white/85 dark:bg-gray-900/85',
            badge: 'bg-blue-100 text-blue-700 dark:bg-blue-900/60 dark:text-blue-200',
            icon: <Loader2 className="w-7 h-7 animate-spin" />,
            accent: 'from-blue-500/40 via-indigo-500/40 to-blue-500/40',
        },
    }[tone];

    React.useEffect(() => {
        if (!open) return;
        const onKey = (e) => e.key === 'Escape' && onClose?.();
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [open, onClose]);

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    className="fixed inset-0 z-[100] flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    aria-modal="true"
                    role="dialog"
                >
                    {/* Backdrop */}
                    <motion.div
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                        onClick={onClose}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    />

                    {/* Card */}
                    <motion.div
                        className={`relative mx-4 w-full max-w-xl rounded-2xl ${toneStyles.bg} shadow-2xl ring-1 ${toneStyles.ring} border border-white/10 dark:border-white/5 overflow-hidden`}
                        initial={{ y: 18, scale: 0.98, opacity: 0 }}
                        animate={{ y: 0, scale: 1, opacity: 1 }}
                        exit={{ y: 8, scale: 0.98, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 240, damping: 22 }}
                    >
                        <div
                            className={`pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r ${toneStyles.accent}`}
                            style={{ transform: 'scaleY(0.5) translateY(0)' }}
                        />

                        <div className="p-7 sm:p-8">
                            <div className="flex items-start gap-5">
                                <div className={`inline-flex items-center justify-center rounded-full p-2.5 ${toneStyles.badge}`}>
                                    {toneStyles.icon}
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{title}</h3>
                                    {message && (
                                        <p className="mt-2 text-base leading-relaxed text-gray-700 dark:text-gray-300">
                                            {message}
                                        </p>
                                    )}
                                </div>
                                <button
                                    onClick={onClose}
                                    className="rounded-full p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    aria-label="Close dialog"
                                >
                                    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M18 6 6 18M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

function Contact() {
    const [form, setForm] = useState({ name: '', email: '', message: '', _gotcha: '' });
    const [status, setStatus] = useState({ type: '', message: '' });

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
        if (status.message) setStatus({ type: '', message: '' });
    };

    const FORMSPREE_URL = "https://formspree.io/f/movlbqjy";

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ type: 'sending', message: 'Sending your message...' });

        try {
            const res = await fetch(FORMSPREE_URL, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',         // tells Formspree we want JSON back
                    'Content-Type': 'application/json',   // sending JSON
                },
                body: JSON.stringify({
                    name: form.name,
                    email: form.email,
                    message: form.message,
                    _gotcha: form._gotcha
                }),
            });

            const data = await res.json().catch(() => ({}));

            if (!res.ok) {

                const errMsg = data?.errors?.[0]?.message || data?.message || 'Failed to send';
                throw new Error(errMsg);
            }

            setStatus({
                type: 'sent',
                message: "Message sent successfully! I'll get back to you soon."
            });
            setForm({ name: '', email: '', message: '' });
        } catch (error) {
            console.error('Failed to send message:', error);
            setStatus({
                type: 'error',
                message: error.message || 'Failed to send message. Please try again later.'
            });
        }
    };

    // Auto-dismiss modal
    React.useEffect(() => {
        if (status.type === 'sent' || status.type === 'error') {
            const t = setTimeout(() => setStatus({ type: '', message: '' }), 2400);
            return () => clearTimeout(t);
        }
    }, [status.type]);

    const contactInfo = [
        {
            icon: <Mail size={24} className="text-blue-600 dark:text-blue-400" />,
            label: "Email Me",
            value: "me@erickcaballero.com",
            href: "mailto:me@erickcaballero.com",
        },
        {
            icon: <Linkedin size={24} className="text-blue-600 dark:text-blue-400" />,
            label: "LinkedIn",
            value: "linkedin.com/in/erickcaballero2",
            href: "https://www.linkedin.com/in/erickcaballero2/",
        },
        {
            icon: <Github size={24} className="text-blue-600 dark:text-blue-400" />,
            label: "GitHub",
            value: "github.com/erick-caballero",
            href: "https://github.com/erick-caballero",
        },
    ];

    return (
        <section id="contact" className="py-24 bg-gray-100 dark:bg-gray-800/30 rounded-3xl scroll-mt-28 md:scroll-mt-36">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.h2
                    className="text-4xl sm:text-5xl lg:text-6xl font-bold text-center mb-16 md:mb-20 text-gray-900 dark:text-white"
                    initial={{ opacity: 0, y: -30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    Let's <span className="text-blue-600 dark:text-blue-400">Connect</span>
                </motion.h2>

                <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start">
                    {/* Left: Contact Information*/}
                    <motion.div
                        className="space-y-8"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.1 }}
                        transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
                    >
                        <div>
                            <h3 className="text-3xl font-semibold text-gray-900 dark:text-white mb-4">Get In Touch!</h3>
                            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                                Have a project in mind, a question, or just want to say hi? I'd love to hear from you! I'm always open to be part of something exciting.
                            </p>
                        </div>
                        <div className="space-y-6">
                            {contactInfo.map((item, index) => (
                                <a
                                    key={index}
                                    href={item.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 group"
                                >
                                    <div className="flex-shrink-0 mr-4 p-2 bg-blue-100 dark:bg-gray-700 rounded-full group-hover:bg-blue-200 dark:group-hover:bg-gray-600 transition-colors">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-800 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{item.label}</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 break-all">{item.value}</p>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </motion.div>
                    {/* Right Column: Contact Form */}
                    <motion.form
                        onSubmit={handleSubmit}
                        className="bg-white dark:bg-gray-800 p-8 sm:p-10 rounded-2xl shadow-2xl space-y-8 border border-gray-200 dark:border-gray-700/80 w-full"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.1 }}
                        transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }} // ease out delay
                    >
                        <div>
                            <label htmlFor="name" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Name</label>
                            <Input id="name" name="name" value={form.name} placeholder="e.g., Justin Time" required onChange={handleChange} className="w-full text-black" />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Email Address</label>
                            <Input id="email" name="email" type="email" value={form.email} placeholder="you@example.com" required onChange={handleChange} className="w-full text-black" />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Message</label>
                            <Textarea id="message" name="message" value={form.message} rows={5} placeholder="Hi Erick, we'd like to offer you a job—or whatever your message is." required onChange={handleChange} className="w-full text-black"></Textarea> {/* Reduced rows slightly as an option */}
                        </div>
                        <input
                            type="text"
                            name="_gotcha"
                            value={form._gotcha}
                            onChange={handleChange}
                            style={{ display: 'none' }}
                            tabIndex={-1}
                            autoComplete="off"
                        />
                        <button
                            type="submit"
                            disabled={status.type === 'sending'}
                            className="w-full py-3.5 px-6 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center space-x-2.5 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                        >
                            {status.type === 'sending' ? (
                                <>
                                    <motion.div
                                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                                    />
                                    <span>Sending...</span>
                                </>
                            ) : (
                                <>
                                    <Send size={20} />
                                    <span>Send Message</span>
                                </>
                            )}
                        </button>

                    </motion.form>
                </div>
            </div>

            {/* Modal controlled by status */}
            <Modal
                open={Boolean(status.type)}
                onClose={() => setStatus({ type: '', message: '' })}
                tone={status.type === 'sent' ? 'success' : status.type === 'error' ? 'error' : 'info'}
                title={status.type === 'sent' ? 'Message sent!' : status.type === 'error' ? 'Something went wrong' : 'Sending…'}
                message={status.message}
            />
        </section>
    );
}

export default Contact;
