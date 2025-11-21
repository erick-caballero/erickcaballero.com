import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mail, Linkedin, Github, ArrowRight, Loader2, CheckCircle2, XCircle } from 'lucide-react';

export default function Contact() {
    const [form, setForm] = useState({ name: '', email: '', message: '', _gotcha: '' });
    const [status, setStatus] = useState({ type: '', message: '' });
    const [focusedField, setFocusedField] = useState(null);

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
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
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
            setForm({ name: '', email: '', message: '', _gotcha: '' });
        } catch (error) {
            console.error('Failed to send message:', error);
            setStatus({
                type: 'error',
                message: error.message || 'Failed to send message. Please try again later.'
            });
        }
    };

    const inputClasses = "w-full bg-transparent border-b-2 border-gray-200 dark:border-gray-700 py-4 text-xl md:text-2xl focus:outline-none focus:border-light-primary dark:focus:border-dark-primary transition-colors placeholder-gray-300 dark:placeholder-gray-600";
    const labelClasses = "block text-sm font-bold text-gray-400 uppercase tracking-wider mb-2";

    return (
        <section id="contact" className="py-20 md:py-32 relative">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                        Let's start a <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-light-primary to-light-accent dark:from-dark-primary dark:to-dark-accent">
                            Conversation
                        </span>
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-400">
                        Have a project in mind? I'd love to help you build it.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-[1fr,auto] gap-12 md:gap-20">
                    <motion.form
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        onSubmit={handleSubmit}
                        className="space-y-12"
                    >
                        <div className="relative">
                            <label htmlFor="name" className={labelClasses}>What's your name?</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                onFocus={() => setFocusedField('name')}
                                onBlur={() => setFocusedField(null)}
                                placeholder="John Doe"
                                required
                                className={inputClasses}
                            />
                        </div>

                        <div className="relative">
                            <label htmlFor="email" className={labelClasses}>What's your email?</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                onFocus={() => setFocusedField('email')}
                                onBlur={() => setFocusedField(null)}
                                placeholder="john@example.com"
                                required
                                className={inputClasses}
                            />
                        </div>

                        <div className="relative">
                            <label htmlFor="message" className={labelClasses}>Tell me about your project</label>
                            <textarea
                                id="message"
                                name="message"
                                value={form.message}
                                onChange={handleChange}
                                onFocus={() => setFocusedField('message')}
                                onBlur={() => setFocusedField(null)}
                                rows={3}
                                placeholder="I need a website that..."
                                required
                                className={`${inputClasses} resize-none`}
                            />
                        </div>

                        <input type="text" name="_gotcha" value={form._gotcha} onChange={handleChange} style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

                        <div className="flex items-center gap-4">
                            <button
                                type="submit"
                                disabled={status.type === 'sending'}
                                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full font-bold text-lg overflow-hidden transition-transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    {status.type === 'sending' ? 'Sending...' : 'Send Message'}
                                    {status.type === 'sending' ? <Loader2 className="animate-spin" /> : <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-light-primary to-light-secondary dark:from-dark-primary dark:to-dark-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </button>

                            <AnimatePresence>
                                {status.type && (
                                    <motion.div
                                        initial={{ opacity: 0, x: 10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 10 }}
                                        className={`flex items-center gap-2 font-medium ${status.type === 'error' ? 'text-red-500' : 'text-green-500'}`}
                                    >
                                        {status.type === 'error' ? <XCircle size={20} /> : <CheckCircle2 size={20} />}
                                        {status.type === 'sent' ? 'Sent!' : 'Error'}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.form>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="flex flex-col gap-8 md:pt-8"
                    >
                        <div>
                            <h3 className="font-bold text-gray-400 uppercase tracking-wider mb-4">Contact Details</h3>
                            <a href="mailto:me@erickcaballero.com" className="block text-xl font-medium hover:text-light-primary dark:hover:text-dark-primary transition-colors mb-2">
                                me@erickcaballero.com
                            </a>
                            <p className="text-gray-600 dark:text-gray-400">Atlanta, GA</p>
                        </div>

                        <div>
                            <h3 className="font-bold text-gray-400 uppercase tracking-wider mb-4">Socials</h3>
                            <div className="flex flex-col gap-4">
                                {[
                                    { name: "GitHub", icon: Github, href: "https://github.com/erick-caballero" },
                                    { name: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/in/erickcaballero2/" }
                                ].map((social) => (
                                    <a
                                        key={social.name}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 text-lg font-medium hover:text-light-primary dark:hover:text-dark-primary transition-colors group"
                                    >
                                        <social.icon className="group-hover:scale-110 transition-transform" />
                                        {social.name}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
