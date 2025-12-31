import SectionTitle from "../components/section-title";
import { motion } from "framer-motion";
import { useRef } from "react";

export default function Testimonials() {

    const ref = useRef([]);
    
    const data = [
    {
        review: "Glimpse is a total game-changer. I went from spending 3 hours in Photoshop to having a viral-ready thumbnail in 30 seconds. My CTR has never been higher!",
        name: 'Richard Nelson',
        about: 'Tech YouTuber (500k+ Subs)',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200',
    },
    {
        review: "The style selection is incredible. I can match my brand's neon aesthetic perfectly with just a few clicks. It’s like having a pro designer on call 24/7.",
        name: 'Sophia Martinez',
        about: 'Lifestyle Vlogger',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200',
    },
    {
        review: "That YouTube Live Preview feature is genius. Being able to see my thumbnail next to competitors before I upload has completely changed my strategy.",
        name: 'Ethan Roberts',
        about: 'Content Strategist',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&auto=format&fit=crop&q=60',
    },
    {
        review: "I’m not a designer, but Glimpse AI makes me look like one. The AI understands exactly what makes a thumbnail 'clickable' in the current algorithm.",
        name: 'Isabella Kim',
        about: 'Educational Creator',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=60',
    },
    {
        review: "The ability to choose color schemes and aspect ratios in one place is so helpful. I generate my 16:9 and 9:16 assets in half the time now.",
        name: 'Liam Johnson',
        about: 'Gaming Creator',
        rating: 5,
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&h=100&auto=format&fit=crop',
    },
    {
        review: "Vibrant designs that actually pop on mobile screens. I've seen a 15% boost in impressions since I switched to Glimpse-generated thumbnails.",
        name: 'Ava Patel',
        about: 'Digital Marketer',
        rating: 5,
        image: 'https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/userImage/userImage1.png',
    },
];
    return (
        <section className="mt-32 flex flex-col items-center">
            <SectionTitle
                title="Here what our trusted users about  Glimpse"
                description="Empower your channel with AI-driven thumbnails that optimize click-through rates and accelerate audience growth.."
            />
            <div className='mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
                {data.map((item, index) => (
                    <motion.div key={index} className='w-full max-w-88 space-y-5 rounded-lg glass p-5 hover:-translate-y-1'
                        initial={{ y: 150, opacity: 0 }}
                        ref={(el) => (ref.current[index] = el)}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: `${index * 0.15}`, type: "spring", stiffness: 320, damping: 70, mass: 1 }}
                        onAnimationComplete={() => {
                            const card = ref.current[index];
                            if (card) {
                                card.classList.add("transition", "duration-300");
                            }
                        }}
                    >
                        <div className='flex items-center justify-between'>
                            <p className="font-medium">{item.about}</p>
                            <img className='size-10 rounded-full' src={item.image} alt={item.name} />
                        </div>
                        <p className='line-clamp-3'>“{item.review}”</p>
                        <p className='text-gray-300'>
                            - {item.name}
                        </p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}