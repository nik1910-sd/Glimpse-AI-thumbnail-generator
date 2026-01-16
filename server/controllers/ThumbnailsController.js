import { v2 as cloudinary } from 'cloudinary';
import Thumbnail from '../models/Thumbnails.js';
import ai from '../configs/ai.js';

const model = 'gemini-3-pro-image-preview';

// Configuration for AI Styles
const stylePrompts = {
    'Bold & Graphic': 'eye-catching thumbnail, bold typography, vibrant colors, expressive facial reaction, dramatic lighting, high contrast, click-worthy composition, professional style',
    'Tech/Futuristic': 'futuristic thumbnail, sleek modern design, digital UI elements, glowing accents, holographic effects, cyber-tech aesthetic, sharp lighting, high-tech atmosphere',
    'Minimalist': 'minimalist thumbnail, clean layout, simple shapes, limited color palette, plenty of negative space, modern flat design, clear focal point',
    'Photorealistic': 'photorealistic thumbnail, ultra-realistic lighting, natural skin tones, candid moment, DSLR-style photography, lifestyle realism, shallow depth of field',
    'Illustrated': 'illustrated thumbnail, custom digital illustration, stylized characters, bold outlines, vibrant colors, creative cartoon or vector art style',
};

const colorSchemeDescriptions = {
    vibrant: 'vibrant and energetic colors, high saturation, bold contrasts, eye-catching palette',
    sunset: 'warm sunset tones, orange pink and purple hues, soft gradients, cinematic glow',
    forest: 'natural green tones, earthy colors, calm and organic palette, fresh atmosphere',
    neon: 'neon glow effects, electric blues and pinks, cyberpunk lighting, high contrast glow',
    purple: 'purple-dominant color palette, magenta and violet tones, modern and stylish mood',
    monochrome: 'black and white color scheme, high contrast, dramatic lighting, timeless aesthetic',
    ocean: 'cool blue and teal tones, aquatic color palette, fresh and clean atmosphere',
    pastel: 'soft pastel colors, low saturation, gentle tones, calm and friendly aesthetic',
};

export const generateThumbnail = async (req, res) => {
    try {
        const { userId } = req.session;
        const { title, prompt: user_prompt, style, aspect_ratio, color_scheme, text_overlay } = req.body;

        // 1. Initialize the thumbnail record in MongoDB
        const thumbnail = new Thumbnail({
            userId,
            title,
            prompt_used: user_prompt,
            user_prompt,
            style,
            aspect_ratio,
            color_scheme,
            text_overlay,
            isGenerating: true
        });

        // Save immediately so the UI sees the "Generating..." state in history
        await thumbnail.save();

        const generationConfig = {
            maxOutputTokens: 32768,
            temperature: 1,
            topP: 0.95,
            responseModalities: ['IMAGE'],
            imageConfig: {
                aspectRatio: aspect_ratio || '16:9',
                imageSize: '1K'
            }
        };

        // 2. Build the dynamic prompt
        let prompt = `Create a ${stylePrompts[style] || 'professional thumbnail'} for: "${title}"`;

        if (color_scheme) {
            prompt += ` Use a ${colorSchemeDescriptions[color_scheme]} color scheme.`;
        }

        if (user_prompt) {
            prompt += ` Additional details: ${user_prompt}. `;
        }

        prompt += ` The thumbnail should be ${aspect_ratio}, visually stunning, and designed to maximize click-through rate. Make it bold and professional.`;

        // 3. Generate the image using the Gemini API
        const response = await ai.models.generateContent({
            model,
            contents: [prompt],
            config: generationConfig
        });

        if (!response?.candidates?.[0]?.content?.parts) {
            throw new Error('Unexpected response from AI model');
        }

        const parts = response.candidates[0].content.parts;
        let base64Image = null;

        for (const part of parts) {
            if (part.inlineData) {
                // Extract the base64 string directly from the inline data
                base64Image = part.inlineData.data;
            }
        }

        if (!base64Image) throw new Error("No image data received from AI");

        // 4. Upload to Cloudinary using Data URI (Memory-only, no local 'fs' used)
        // This bypasses the read-only file system restrictions on Vercel
        const uploadResult = await cloudinary.uploader.upload(
            `data:image/png;base64,${base64Image}`, 
            { 
                resource_type: 'image',
                folder: 'glimpse_thumbnails'
            }
        );

        // 5. Update database record with the permanent Secure URL
        thumbnail.image_url = uploadResult.secure_url;
        thumbnail.isGenerating = false;
        await thumbnail.save();

        // 6. Respond to Frontend
        res.json({ 
            success: true,
            message: 'Thumbnail Generated Successfully', 
            thumbnail 
        });

    } catch (error) {
        console.error("Generation Error:", error);
        res.status(500).json({ 
            success: false,
            message: error.message 
        });
    }
};

export const deleteThumbnail = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.session;

        // Ensure user can only delete their own thumbnails for security
        const deletedThumb = await Thumbnail.findOneAndDelete({ _id: id, userId });

        if (!deletedThumb) {
            return res.status(404).json({ message: 'Thumbnail not found or unauthorized' });
        }

        res.json({ message: 'Thumbnail deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};