import { motion } from "framer-motion";
import SectionTitle from "../components/section-title";


const steps = [
    {
        id: 1,
        title: "Describe Your Vision",
        description: "Enter a simple prompt explaining your video's topic. Our AI analyzes your hook and generates high-conversion visual concepts instantly.",
        image: "../../assets/workflow1.png", 
    },
    {
        id: 2,
        title: "Customize & Style",
        description: "Fine-tune your output by selecting the perfect aspect ratio, artistic style, and color scheme. Tailor the aesthetics to match your brand's unique identity.",
        image: "../../assets/workflow2.png", 
    },
    {
        id: 3,
        title: "YouTube Live Preview",
        description: "Instantly visualize your thumbnail in a mock YouTube feed. Compare it against competitors to ensure your design wins the scroll every time.",
        image: "../../assets/workflow3.png", 
    },
];

export default function WorkflowSteps() {
    return (
        <section className="mt-32 relative">                    
            <SectionTitle
                title="From video concept to thumbnail quickly & effortlessly"
                description="Empower your channel with AI designs that stop the scroll and accelerate audience growth"
            />

            <motion.div className="relative space-y-20 md:space-y-30 mt-20"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                <div className="flex-col items-center hidden md:flex absolute left-1/2 -translate-x-1/2">
                    <p className="flex items-center justify-center font-medium my-10 aspect-square bg-black/15 p-2 rounded-full">
                        01
                    </p>
                    <div className="h-72 w-0.5 bg-linear-to-b from-transparent via-white to-transparent" />
                    <p className="flex items-center justify-center font-medium my-10 aspect-square bg-black/15 p-2 rounded-full">
                        02
                    </p>
                    <div className="h-72 w-0.5 bg-linear-to-b from-transparent via-white to-transparent" />
                    <p className="flex items-center justify-center font-medium my-10 aspect-square bg-black/15 p-2 rounded-full">
                        03
                    </p>
                </div>
                {steps.map((step, index) => (
                    <motion.div key={index} className={`flex items-center justify-center gap-6 md:gap-20 ${index % 2 !== 0 ? 'flex-col md:flex-row-reverse' : 'flex-col md:flex-row'}`}
                        initial={{ y: 150, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: `${index * 0.15}`, type: "spring", stiffness: 320, damping: 70, mass: 1 }}
                    >
                        <img src={step.image} alt="step" className="flex-1 h-auto w-full max-w-sm rounded-2xl" />
                        <div key={index} className="flex-1 flex flex-col gap-6 md:px-6 max-w-md">
                            <h3 className="text-2xl font-medium text-white">
                                {step.title}
                            </h3>
                            <p className="text-gray-100 text-sm/6 line-clamp-3 pb-2">
                                {step.description}
                            </p>
                           
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
}
