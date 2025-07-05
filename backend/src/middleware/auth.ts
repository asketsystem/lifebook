import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { auth as firebaseAuth } from '../config/firebase';

interface AuthRequest extends Request {
  user?: {
    uid: string;
    email: string;
    name?: string;
  };
}

// Verify Firebase ID token
export const verifyFirebaseToken = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.split('Bearer ')[1];
    
    // Verify the token with Firebase
    const decodedToken = await firebaseAuth.verifyIdToken(token);
    
    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email || '',
      name: decodedToken.name || '',
    };
    
    return next();
  } catch (error) {
    console.error('Token verification failed:', error);
    return res.status(401).json({ error: 'Invalid token' });
  }
};

// Generate JWT token for session management
// TODO: Fix JWT TypeScript issues
// export const generateJWT = (payload: any): string => {
//   const secret = process.env.JWT_SECRET;
//   if (!secret) {
//     throw new Error('JWT_SECRET is not configured');
//   }
//   return jwt.sign(payload, secret as jwt.Secret, {
//     expiresIn: process.env.JWT_EXPIRES_IN || '7d',
//   });
// };

// Verify JWT token
// TODO: Fix JWT TypeScript issues
// export const verifyJWT = (token: string): any => {
//   try {
//     const secret = process.env.JWT_SECRET;
//     if (!secret) {
//     throw new Error('JWT_SECRET is not configured');
//   }
//   return jwt.verify(token, secret as jwt.Secret);
// } catch (error) {
//   throw new Error('Invalid JWT token');
// }
// };

// Optional authentication middleware
export const optionalAuth = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split('Bearer ')[1];
      const decodedToken = await firebaseAuth.verifyIdToken(token);
      
      req.user = {
        uid: decodedToken.uid,
        email: decodedToken.email || '',
        name: decodedToken.name || '',
      };
    }
    
    next();
  } catch (error) {
    // Continue without authentication
    next();
  }
};

// Rate limiting middleware
export const rateLimit = (req: Request, res: Response, next: NextFunction) => {
  // This will be implemented with express-rate-limit
  next();
}; 