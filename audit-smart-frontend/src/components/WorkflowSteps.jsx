import { Code, Upload, Shield, Check } from 'lucide-react'
import { motion } from 'framer-motion'
import './WorkflowSteps.css'

export default function WorkflowSteps() {
    const steps = [
        {
            icon: <Upload size={28} />,
            title: "Upload Contract",
            description: "Drag & drop your .sol file",
            color: "#6366f1"
        },
        {
            icon: <Code size={28} />,
            title: "AI Analysis",
            description: "50+ vulnerability patterns checked",
            color: "#10b981"
        },
        {
            icon: <Shield size={28} />,
            title: "Get Report",
            description: "Detailed findings with severity ratings",
            color: "#3b82f6"
        },
        {
            icon: <Check size={28} />,
            title: "Apply Fixes",
            description: "One-click apply improvements",
            color: "#f59e0b"
        }
    ]

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    }

    const stepVariants = {
        hidden: { y: 20, opacity: 0, rotateX: -15 },
        visible: {
            y: 0,
            opacity: 1,
            rotateX: 0,
            transition: {
                duration: 0.6,
                ease: "backOut"
            }
        },
        hover: {
            y: -10,
            scale: 1.03,
            rotateY: 5,
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
            transition: {
                duration: 0.3,
                ease: "easeOut"
            }
        }
    }

    const iconVariants = {
        normal: { rotateY: 0 },
        hover: { rotateY: 180 }
    }

    return (
        <section className="workflow-steps">
            <div className="container">
                <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="section-title"
                >
                    How It Works
                    <motion.span 
                        className="title-underline"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                    />
                </motion.h2>
                
                <motion.div 
                    className="steps-container"
                    initial="hidden"
                    whileInView="visible"
                    variants={containerVariants}
                    viewport={{ once: true }}
                >
                    {steps.map((step, index) => (
                        <motion.div 
                            key={index}
                            className="step"
                            variants={stepVariants}
                            whileHover="hover"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <motion.div 
                                className="step-icon"
                                style={{ 
                                    background: `${step.color}20`,
                                    color: step.color
                                }}
                                variants={iconVariants}
                                transition={{ duration: 0.4 }}
                            >
                                {step.icon}
                            </motion.div>
                            <h3>{step.title}</h3>
                            <p>{step.description}</p>
                            <motion.div 
                                className="step-decoration"
                                style={{ background: step.color }}
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                viewport={{ once: true }}
                            />
                            <div className="step-glow" style={{ background: step.color }} />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}