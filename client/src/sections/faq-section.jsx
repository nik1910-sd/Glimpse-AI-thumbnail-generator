import SectionTitle from '../components/section-title';
import { ChevronDownIcon } from 'lucide-react';
import { useState } from 'react';
import { motion } from "framer-motion";

export default function FaqSection() {
    const [isOpen, setIsOpen] = useState(false);
   const data = [
    {
        question: 'Do I need professional design skills to use Glimpse?',
        answer: "Not at all. Glimpse  is built for creators, not designers. Simply describe your video idea, and our AI handles the composition, color theory, and lighting to create a viral-ready thumbnail.",
    },
    {
        question: 'What is Glimpse and how does it improve my channel?',
        answer: 'Glimpse is an all-in-one thumbnail generation suite. It helps you increase your Click-Through Rate (CTR) by creating high-contrast, attention-grabbing visuals tailored to the YouTube algorithm.',
    },
    {
        question: 'Can I customize the generated thumbnails?',
        answer: 'Yes. You have full control over the aspect ratio (16:9 for videos, 9:16 for Shorts), artistic style, and specific color schemes to ensure every design matches your brand identity.',
    },
    {
        question: 'What is the "YouTube Live Preview" feature?',
        answer: 'This allows you to see exactly how your new thumbnail looks inside a real-time mock-up of the YouTube mobile and desktop feeds, helping you spot if your design stands out against competitors.',
    },
    {
        question: 'Does Glimpse support team accounts for agencies?',
        answer: "Yes, our Agency plan allows multiple team members to collaborate on projects, share design assets, and manage thumbnails for different channels under one subscription.",
    },
    {
       
        question: 'Can I try Glimpse for free?',
        answer: 'Absolutely. You can start with our Free plan which includes 1 AI generation credit, so you can test the quality before upgrading.',
    },
];

    return (
        <section className='mt-32'>
            <SectionTitle title="FAQ's" description="Looking for answers to your frequently asked questions? Check out our FAQ's section below to find." />
            <div className='mx-auto mt-12 space-y-4 w-full max-w-xl'>
                {data.map((item, index) => (
                    <motion.div key={index} className='flex flex-col glass rounded-md'
                        initial={{ y: 150, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: `${index * 0.15}`, type: "spring", stiffness: 320, damping: 70, mass: 1 }}
                    >
                        <h3 className='flex cursor-pointer hover:bg-white/10 transition items-start justify-between gap-4 p-4 font-medium' onClick={() => setIsOpen(isOpen === index ? null : index)}>
                            {item.question}
                            <ChevronDownIcon className={`size-5 transition-all shrink-0 duration-400 ${isOpen === index ? 'rotate-180' : ''}`} />
                        </h3>
                        <p className={`px-4 text-sm/6 transition-all duration-400 overflow-hidden ${isOpen === index ? 'pt-2 pb-4 max-h-80' : 'max-h-0'}`}>{item.answer}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}