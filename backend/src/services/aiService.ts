import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

interface GeminiRequest {
  model: string;
  messages: Array<{
    role: 'user' | 'assistant' | 'system';
    content: string;
  }>;
  max_tokens?: number;
  temperature?: number;
}

interface GeminiResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

class AIService {
  private apiBase: string;
  private apiKey: string;
  private model: string;

  constructor() {
    this.apiBase = process.env.GEMINI_API_BASE || 'https://openrouter.ai/api/v1';
    this.apiKey = process.env.GEMINI_API_KEY || '';
    this.model = process.env.GEMINI_MODEL || 'google/gemma-3-4b-it:free';
  }

  private async makeRequest(prompt: string, systemPrompt?: string): Promise<string> {
    try {
      const messages: Array<{ role: 'user' | 'assistant' | 'system'; content: string }> = [];
      
      if (systemPrompt) {
        messages.push({ role: 'system', content: systemPrompt });
      }
      
      messages.push({ role: 'user', content: prompt });

      const requestBody: GeminiRequest = {
        model: this.model,
        messages,
        max_tokens: 1000,
        temperature: 0.7,
      };

      const response = await axios.post<GeminiResponse>(
        `${this.apiBase}/chat/completions`,
        requestBody,
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': 'https://lifebook.app',
            'X-Title': 'LifeBook AI Service',
          },
        }
      );

      return response.data.choices[0]?.message?.content || 'No response generated';
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      throw new Error('Failed to generate AI content');
    }
  }

  // Generate personalized Bible verse based on mood
  async generateBibleVerse(mood: string, secondaryEmotions: string[] = []): Promise<{
    verse: string;
    reference: string;
    explanation: string;
  }> {
    const prompt = `Generate a comforting and relevant Bible verse for someone feeling ${mood}${secondaryEmotions.length > 0 ? ` and also ${secondaryEmotions.join(', ')}` : ''}. 
    
    Please provide:
    1. A Bible verse that speaks to this emotional state
    2. The exact reference (book, chapter, verse)
    3. A brief explanation of why this verse is relevant to their current mood
    
    Format your response as JSON:
    {
      "verse": "The actual verse text",
      "reference": "Book Chapter:Verse",
      "explanation": "Brief explanation of relevance"
    }`;

    const systemPrompt = `You are a compassionate AI assistant helping Christians find comfort and guidance in Scripture. Always provide accurate Bible references and uplifting, faith-based responses.`;

    const response = await this.makeRequest(prompt, systemPrompt);
    
    try {
      return JSON.parse(response);
    } catch (error) {
      // Fallback if JSON parsing fails
      return {
        verse: "For I know the plans I have for you, declares the LORD, plans to prosper you and not to harm you, plans to give you hope and a future.",
        reference: "Jeremiah 29:11",
        explanation: "This verse reminds us that God has good plans for us, even when we're struggling with difficult emotions."
      };
    }
  }

  // Generate guided meditation script
  async generateMeditationScript(mood: string, duration: number = 5): Promise<{
    title: string;
    script: string;
    breathingPattern: string;
  }> {
    const prompt = `Create a ${duration}-minute guided Christian meditation script for someone feeling ${mood}. 
    
    The meditation should:
    - Be calming and spiritually uplifting
    - Include breathing guidance
    - Incorporate faith-based imagery and Scripture
    - Be appropriate for the user's emotional state
    
    Format your response as JSON:
    {
      "title": "Meditation title",
      "script": "The full meditation script with breathing cues and guidance",
      "breathingPattern": "4-7-8 or box or triangle"
    }`;

    const systemPrompt = `You are a meditation guide creating peaceful, Christian-focused meditation experiences. Focus on God's presence, peace, and love.`;

    const response = await this.makeRequest(prompt, systemPrompt);
    
    try {
      return JSON.parse(response);
    } catch (error) {
      // Fallback meditation
      return {
        title: "Finding Peace in God's Presence",
        script: "Begin by finding a comfortable position... Take a deep breath in for 4 counts, hold for 7, exhale for 8...",
        breathingPattern: "4-7-8"
      };
    }
  }

  // Generate prayer based on mood and context
  async generatePrayer(mood: string, context?: string): Promise<{
    title: string;
    prayer: string;
    category: string;
  }> {
    const prompt = `Write a heartfelt Christian prayer for someone feeling ${mood}${context ? ` in the context of ${context}` : ''}. 
    
    The prayer should:
    - Be personal and relatable
    - Address the specific emotional state
    - Express trust in God
    - Be encouraging and hopeful
    
    Format your response as JSON:
    {
      "title": "Prayer title",
      "prayer": "The prayer text",
      "category": "gratitude, comfort, guidance, strength, etc."
    }`;

    const systemPrompt = `You are writing personal prayers that help people connect with God during their emotional journey.`;

    const response = await this.makeRequest(prompt, systemPrompt);
    
    try {
      return JSON.parse(response);
    } catch (error) {
      // Fallback prayer
      return {
        title: "Prayer for Peace",
        prayer: "Dear Heavenly Father, thank you for your constant presence in my life...",
        category: "comfort"
      };
    }
  }

  // Generate reflection prompt
  async generateReflectionPrompt(mood: string, verse: string): Promise<string> {
    const prompt = `Create a thoughtful reflection question based on this Bible verse: "${verse}" for someone feeling ${mood}. 
    
    The question should:
    - Help them connect the verse to their current emotional state
    - Encourage personal reflection and spiritual growth
    - Be open-ended and thought-provoking
    
    Return only the question, no additional formatting.`;

    const systemPrompt = `You are creating reflection prompts that help people apply Scripture to their daily lives and emotional experiences.`;

    return await this.makeRequest(prompt, systemPrompt);
  }

  // Generate action step
  async generateActionStep(mood: string, verse: string): Promise<{
    title: string;
    description: string;
    category: string;
  }> {
    const prompt = `Based on this Bible verse: "${verse}" and someone feeling ${mood}, suggest a practical action step they can take today. 
    
    The action should:
    - Be simple and achievable
    - Help them apply the verse to their life
    - Support their emotional well-being
    - Be faith-based
    
    Format your response as JSON:
    {
      "title": "Action step title",
      "description": "Detailed description of what to do",
      "category": "service, prayer, study, self-care, etc."
    }`;

    const systemPrompt = `You are suggesting practical, faith-based actions that help people live out their faith in daily life.`;

    const response = await this.makeRequest(prompt, systemPrompt);
    
    try {
      return JSON.parse(response);
    } catch (error) {
      // Fallback action
      return {
        title: "Express Gratitude",
        description: "Take a moment to thank God for three things in your life today.",
        category: "gratitude"
      };
    }
  }
}

export default new AIService(); 