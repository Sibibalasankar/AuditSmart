import { Code, Upload, Shield, Check } from 'lucide-react'
import './WorkflowSteps.css'

export default function WorkflowSteps() {
    const steps = [
        {
            icon: <Upload size={24} />,
            title: "Upload Contract",
            description: "Drag & drop your .sol file"
        },
        {
            icon: <Code size={24} />,
            title: "AI Analysis",
            description: "50+ vulnerability patterns checked"
        },
        {
            icon: <Shield size={24} />,
            title: "Get Report",
            description: "Detailed findings with severity ratings"
        },
        {
            icon: <Check size={24} />,
            title: "Apply Fixes",
            description: "One-click apply improvements"
        }
    ]

    return (
        <section className="workflow-steps">
            <div className="container">
                <h2>How It Works</h2>
                <div className="steps-container">
                    {steps.map((step, index) => (
                        <div key={index} className={`step scroll-effect delay-${index}`}>
                            <div className="step-icon">{step.icon}</div>
                            <h3>{step.title}</h3>
                            <p>{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}