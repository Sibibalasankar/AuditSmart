import { Rocket, Wand2, FileText, Code } from 'lucide-react';
import './ValueProposition.css';

export default function ValueProposition() {
    const features = [
        {
            icon: <Rocket size={32} />,
            title: "One-Click Audits",
            description: "Upload your Solidity contract and get instant results."
        },
        {
            icon: <Wand2 size={32} />,
            title: "AI-Powered Fixes",
            description: "Get corrected code suggestions, not just problems."
        },
        {
            icon: <FileText size={32} />,
            title: "Detailed Reports",
            description: "Human-readable markdown reports with severity ratings."
        },
        {
            icon: <Code size={32} />,
            title: "Developer-First",
            description: "No lock-in. Download, verify, and build with confidence."
        }
    ];

    return (
        <section className="value-props scroll-effect">
            <div className="container">
                {features.map((feature, index) => (
                    <div key={index} className="feature-card">
                        <div className="feature-icon">{feature.icon}</div>
                        <h3>{feature.title}</h3>
                        <p>{feature.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}