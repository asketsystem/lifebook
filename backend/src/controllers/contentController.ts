import { Request, Response } from 'express';
import aiService from '../services/aiService';
import { firestore } from '../config/firebase';

interface ContentRequest extends Request {
  user?: {
    uid: string;
    email: string;
    name?: string;
  };
}

export const generateDailyContent = async (req: ContentRequest, res: Response) => {
  try {
    const { mood, secondaryEmotions = [] } = req.body;
    const userId = req.user?.uid;

    if (!mood) {
      return res.status(400).json({ error: 'Mood is required' });
    }

    if (!userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    // Generate all content using AI
    const [bibleVerse, meditation, prayer, reflectionPrompt, actionStep] = await Promise.all([
      aiService.generateBibleVerse(mood, secondaryEmotions),
      aiService.generateMeditationScript(mood, 5),
      aiService.generatePrayer(mood),
      aiService.generateReflectionPrompt(mood, "For I know the plans I have for you, declares the LORD, plans to prosper you and not to harm you, plans to give you hope and a future."),
      aiService.generateActionStep(mood, "For I know the plans I have for you, declares the LORD, plans to prosper you and not to harm you, plans to give you hope and a future.")
    ]);

    const dailyContent = {
      id: `${userId}_${new Date().toISOString().split('T')[0]}`,
      userId,
      date: new Date(),
      mood: {
        primaryMood: mood,
        secondaryEmotions,
        timestamp: new Date()
      },
      verse: bibleVerse,
      meditation,
      prayer,
      reflection: {
        id: `reflection_${Date.now()}`,
        prompt: reflectionPrompt,
        response: null
      },
      actionStep,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Save to Firestore
    await firestore
      .collection('dailyContent')
      .doc(dailyContent.id)
      .set(dailyContent);

    return res.json({
      success: true,
      data: dailyContent
    });

  } catch (error) {
    console.error('Error generating daily content:', error);
    return res.status(500).json({
      error: 'Failed to generate content',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export const getDailyContent = async (req: ContentRequest, res: Response) => {
  try {
    const userId = req.user?.uid;
    const { date } = req.query;

    if (!userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const targetDate = date ? new Date(date as string) : new Date();
    const contentId = `${userId}_${targetDate.toISOString().split('T')[0]}`;

    const doc = await firestore
      .collection('dailyContent')
      .doc(contentId)
      .get();

    if (!doc.exists) {
      return res.status(404).json({ error: 'Content not found for this date' });
    }

    return res.json({
      success: true,
      data: doc.data()
    });

  } catch (error) {
    console.error('Error fetching daily content:', error);
    return res.status(500).json({
      error: 'Failed to fetch content',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export const generateMeditation = async (req: ContentRequest, res: Response) => {
  try {
    const { mood, duration = 5 } = req.body;
    const userId = req.user?.uid;

    if (!mood) {
      return res.status(400).json({ error: 'Mood is required' });
    }

    if (!userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const meditation = await aiService.generateMeditationScript(mood, duration);

    return res.json({
      success: true,
      data: meditation
    });

  } catch (error) {
    console.error('Error generating meditation:', error);
    return res.status(500).json({
      error: 'Failed to generate meditation',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export const generatePrayer = async (req: ContentRequest, res: Response) => {
  try {
    const { mood, context } = req.body;
    const userId = req.user?.uid;

    if (!mood) {
      return res.status(400).json({ error: 'Mood is required' });
    }

    if (!userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const prayer = await aiService.generatePrayer(mood, context);

    return res.json({
      success: true,
      data: prayer
    });

  } catch (error) {
    console.error('Error generating prayer:', error);
    return res.status(500).json({
      error: 'Failed to generate prayer',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}; 