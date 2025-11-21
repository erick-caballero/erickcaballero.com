import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Loader2, CheckCircle2, XCircle, ArrowUpRight, Github, Linkedin } from 'lucide-react';

export default function Contact() {
    const [form, setForm] = useState({ name: '', email: '', message: '', _gotcha: '' });
    const [status, setStatus] = useState({ type: '', message: '' });

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
        if (status.message) setStatus({ type: '', message: '' });
    };

    const FORMSPREE_URL = "https://formspree.io/f/movlbqjy";

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ type: 'sending', message: 'Sending...' });

        try {
            const res = await fetch(FORMSPREE_URL, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });

            if (!res.ok) throw new Error('Transmission failed');

            setStatus({
                type: 'sent',
                message: "Message received. I'll get back to you soon."
            });
            setForm({ name: '', email: '', message: '', _gotcha: '' });
        } catch (error) {
            setStatus({
                type: 'error',
                message: 'Something went wrong. Please try again.'
            });
        }
    };

    const inputClasses = "w-full bg-transparent border-b-2 border-white/20 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-dark-accent transition-all text-2xl font-medium";

    return (
        <section className="h-full flex flex-col justify-center py-10 relative overflow-hidden pl-12 md:pl-0">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid lg:grid-cols-2 gap-16 items-center">

                {/* Text Side */}
                <div className="space-y-12">
                    <h2 className="text-6xl md:text-8xl font-bold text-white tracking-tight leading-none">
                        Let's <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-dark-accent to-white">Collaborate.</span>
                    </h2>

                    <div className="space-y-8">
                        <a
                            href="mailto:me@erickcaballero.com"
                            className="inline-flex items-center gap-3 text-3xl md:text-4xl text-white hover:text-dark-accent transition-colors group font-medium"
                        >
                            me@erickcaballero.com
                            <ArrowUpRight size={32} className="opacity-50 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                        </a>

                        <div className="flex gap-8">
                            <a href="https://github.com/erick-caballero" target="_blank" className="text-gray-500 hover:text-white text-sm uppercase tracking-widest transition-colors font-bold">Github</a>
                            <a href="https://www.linkedin.com/in/erickcaballero2/" target="_blank" className="text-gray-500 hover:text-white text-sm uppercase tracking-widest transition-colors font-bold">LinkedIn</a>
                        </div>
                    </div>
                </div>

                {/* Form Side */}
                <div className="bg-dark-surface/50 p-10 rounded-[3rem] border border-white/5 backdrop-blur-sm">
                    <form onSubmit={handleSubmit} className="space-y-10">
                        <div>
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                required
                                className={inputClasses}
                                placeholder="Your Name"
                            />
                        </div>
                        <div>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                required
                                className={inputClasses}
                                placeholder="Your Email"
                            />
                        </div>
                        <div>
                            <textarea
                                name="message"
                                value={form.message}
                                onChange={handleChange}
                                required
                                rows={3}
                                className={`${inputClasses} resize-none`}
                                placeholder="Tell me about your project..."
                            />
                        </div>

                        <input type="text" name="_gotcha" value={form._gotcha} onChange={handleChange} style={{ display: 'none' }} tabIndex={-1} />

                        <button
                            type="submit"
                            disabled={status.type === 'sending'}
                            className="w-full group relative px-8 py-6 bg-white text-black rounded-2xl font-bold text-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-3">
                                {status.type === 'sending' ? 'Sending...' : 'Send Message'}
                                {status.type === 'sending' ? <Loader2 size={24} className="animate-spin" /> : <Send size={24} className="group-hover:translate-x-1 transition-transform" />}
                            </span>
                        </button>

                        <AnimatePresence>
                            {status.type && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className={`flex items-center justify-center gap-2 text-lg font-medium pt-2 ${status.type === 'error' ? 'text-red-400' : 'text-green-400'}`}
                                >
                                    {status.type === 'error' ? <XCircle size={24} /> : <CheckCircle2 size={24} />}
                                    {status.message}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </form>
                </div>

            </div>
        </section>
    );
}
