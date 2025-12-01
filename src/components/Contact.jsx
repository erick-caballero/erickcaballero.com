import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Loader2, CheckCircle2, XCircle, ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react';

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

    const inputClasses = "w-full bg-transparent border-b-2 border-white/20 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-white transition-all text-xl lg:text-2xl font-medium font-sans";

    return (
        <section id="contact" className="h-auto lg:h-full flex flex-col justify-center pt-12 pb-32 lg:py-10 relative overflow-hidden px-6 md:pl-32 md:pr-8">
            <div className="max-w-[1600px] w-full mx-auto grid lg:grid-cols-12 gap-12 lg:gap-24 items-center">

                {/* Text Side */}
                <div className="lg:col-span-5 space-y-8 lg:space-y-12 lg:-ml-20">
                    <h2 className="text-7xl md:text-8xl lg:text-9xl font-bold text-white tracking-tighter md:tracking-tight leading-none pb-4">
                        Let's <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">Collaborate.</span>
                    </h2>

                    <div className="space-y-8">
                        <a
                            href="mailto:me@erickcaballero.com"
                            className="inline-flex items-center gap-3 text-2xl md:text-4xl text-white hover:text-gray-300 transition-colors group font-medium"
                            data-hover-target="true"
                        >
                            <Mail size={32} className="text-white md:w-10 md:h-10" />
                            <span className="border-b-2 border-transparent group-hover:border-white transition-colors break-all md:break-normal">me@erickcaballero.com</span>
                        </a>

                        <div className="flex gap-6">
                            <a
                                href="https://github.com/erick-caballero"
                                target="_blank"
                                className="p-4 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white hover:text-black transition-all hover:scale-110"
                                data-hover-target="true"
                                aria-label="Github"
                            >
                                <Github size={32} />
                            </a>
                            <a
                                href="https://www.linkedin.com/in/erickcaballero2/"
                                target="_blank"
                                className="p-4 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white hover:text-black transition-all hover:scale-110"
                                data-hover-target="true"
                                aria-label="LinkedIn"
                            >
                                <Linkedin size={32} />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Form Side */}
                <div className="lg:col-span-7 bg-white/5 p-6 lg:p-12 rounded-3xl lg:rounded-[3rem] border border-white/10 backdrop-blur-sm">
                    <form onSubmit={handleSubmit} className="space-y-8 lg:space-y-10">
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
                            className="w-full group relative px-8 py-6 bg-white text-black rounded-2xl font-bold text-xl font-sans transition-all disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden hover:scale-[1.02]"
                            data-hover-target="true"
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
