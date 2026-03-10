import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Image as ImageIcon, Loader2, Download, Maximize2 } from 'lucide-react';
import { cn } from '../lib/utils';

type ImageSize = '1K' | '2K' | '4K';

export const ImageGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [size, setSize] = useState<ImageSize>('1K');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim() || isGenerating) return;

    setIsGenerating(true);
    setGeneratedImage(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-image-preview',
        contents: [{ parts: [{ text: prompt }] }],
        config: {
          imageConfig: {
            aspectRatio: "1:1",
            imageSize: size
          }
        }
      });

      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          setGeneratedImage(`data:image/png;base64,${part.inlineData.data}`);
          break;
        }
      }
    } catch (error) {
      console.error('Image generation error:', error);
      alert('Hubo un error al generar la imagen. Asegúrate de tener configurada tu API Key.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-800">
      <div className="flex items-center gap-2 mb-4">
        <ImageIcon className="text-primary" size={24} />
        <h3 className="text-lg font-bold">Generador de Imágenes Educativas</h3>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
            Describe la imagen que necesitas
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ej: Un diagrama de una célula vegetal estilo ilustración moderna..."
            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 min-h-[100px]"
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            {(['1K', '2K', '4K'] as ImageSize[]).map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={cn(
                  "px-3 py-1 rounded-lg text-xs font-bold transition-colors",
                  size === s ? "bg-primary text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-600"
                )}
              >
                {s}
              </button>
            ))}
          </div>
          <button
            onClick={handleGenerate}
            disabled={isGenerating || !prompt.trim()}
            className="bg-primary text-white px-6 py-2 rounded-xl font-bold text-sm hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {isGenerating ? <Loader2 size={16} className="animate-spin" /> : <ImageIcon size={16} />}
            Generar
          </button>
        </div>

        {isGenerating && (
          <div className="aspect-square w-full bg-slate-100 dark:bg-slate-800 rounded-xl flex flex-col items-center justify-center gap-3 animate-pulse">
            <Loader2 size={32} className="text-primary animate-spin" />
            <p className="text-sm text-slate-500">Creando tu imagen...</p>
          </div>
        )}

        {generatedImage && (
          <div className="relative group">
            <img
              src={generatedImage}
              alt="Generated"
              className="w-full aspect-square object-cover rounded-xl shadow-lg"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 rounded-xl">
              <button className="p-2 bg-white rounded-full text-slate-800 hover:scale-110 transition-transform">
                <Download size={20} />
              </button>
              <button className="p-2 bg-white rounded-full text-slate-800 hover:scale-110 transition-transform">
                <Maximize2 size={20} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
