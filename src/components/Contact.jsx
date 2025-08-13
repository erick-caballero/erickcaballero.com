// src/components/Contact.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, Linkedin, Github } from 'lucide-react'; // Added Mail, Linkedin, Github
import Input from './ui/Input';
import Textarea from './ui/Textarea';

function Contact() {
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState({ type: '', message: '' });

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
        if (status.message) setStatus({ type: '', message: '' });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setStatus({ type: 'sending', message: 'Sending your message...' });
        try {
            console.log('Form data to submit:', form);
            await new Promise(resolve => setTimeout(resolve, 1500));
            if (form.email.includes('error@example.com')) {
                throw new Error("This is a test error. Please use a different email.");
            }
            setStatus({ type: 'sent', message: 'Message sent successfully! Thanks for reaching out. I\'ll get back to you soon.' });
            setForm({ name: '', email: '', message: '' });
        } catch (error) {
            console.error('Failed to send message:', error);
            setStatus({ type: 'error', message: error.message || 'Oops! Failed to send message. Please try again later.' });
        }
    };

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
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"> {/* Increased max-width for two columns */}
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
                    {/* Left Column: Contact Information & CTA */}
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
                        initial={{ opacity: 0, x: 50 }} // Changed y to x for different entry animation
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.1 }}
                        transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }} // Can have a slightly different delay
                    >
                        <div>
                            <label htmlFor="name" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Name</label>
                            <Input id="name" name="name" value={form.name} placeholder="e.g., Justin Time" required onChange={handleChange} className="w-full" />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Email Address</label>
                            <Input id="email" name="email" type="email" value={form.email} placeholder="you@example.com" required onChange={handleChange} className="w-full" />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Message</label>
                            <Textarea id="message" name="message" value={form.message} rows={5} placeholder="Hi Erick, we'd like to offer you a job—or whatever your message is." required onChange={handleChange} className="w-full"></Textarea> {/* Reduced rows slightly as an option */}
                        </div>

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

                        {status.message && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`p-4 rounded-lg text-sm text-center font-medium
                  ${status.type === 'sent' ? 'bg-green-100 dark:bg-green-900/70 text-green-700 dark:text-green-200 border border-green-200 dark:border-green-700' : ''}
                  ${status.type === 'error' ? 'bg-red-100 dark:bg-red-900/70 text-red-700 dark:text-red-200 border border-red-200 dark:border-red-700' : ''}
                  ${status.type === 'sending' ? 'bg-blue-100 dark:bg-blue-900/70 text-blue-700 dark:text-blue-200 border border-blue-200 dark:border-blue-700' : ''}
                `}
                            >
                                {status.message}
                            </motion.div>
                        )}
                    </motion.form>
                </div>
            </div>
        </section>
    );
}

export default Contact;
