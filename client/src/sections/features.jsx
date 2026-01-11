import SectionTitle from "../components/section-title";
import {  ThumbsUp,Pencil, ZapIcon } from "lucide-react";
import { motion } from "framer-motion";
import { useRef } from "react";

export default function Features() {

    const refs = useRef([]);

    const featuresData = [
        {
            icon:ZapIcon,
            title: "Smart Analysis",
            description: "Our AI analyzes video content to suggest the most clickable concepts.",
        },
        {
            icon: ThumbsUp,
            title: "Eye-Catching Designs",
            description: "Generate vibrant, high-contrast thumbnails that stand out in the feed.",
        },
        {
            icon: Pencil,
            title: "Fully Editable",
            description: "Get fully layered designs you can tweak to perfection if needed.",
        }
    ];

    return (
        <section className="mt-32">
            <SectionTitle
                title="Why use our generator?"
                description="Create stunning thumbnails that get clicks, without the hassle."
            />

            <div className="flex flex-wrap items-center justify-center gap-6 mt-10 px-6">
                {featuresData.map((feature, index) => (
                    <motion.div
                        key={index}
                        ref={(el) => (refs.current[index] = el)}
                        className="hover:-translate-y-0.5 p-6 rounded-xl space-y-4 glass max-w-80 w-full"
                        initial={{ y: 150, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{
                            delay: index * 0.15,
                            type: "spring",
                            stiffness: 320,
                            damping: 70,
                            mass: 1
                        }}
                        onAnimationComplete={() => {
                            const card = refs.current[index];
                            if (card) {
                                card.classList.add("transition", "duration-300");
                            }
                        }}
                    >
                        <feature.icon className="size-8.5" />
                        <h3 className="text-base font-medium text-white">
                            {feature.title}
                        </h3>
                        <p className="text-gray-100 line-clamp-2 pb-2">
                            {feature.description}
                        </p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
