import { Timestamp } from "firebase/firestore";

export type Message = {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Timestamp;
};

export type Chat = {
  id: string;
  userId: string;
  upvotes: number;
  downvotes: number;
  shared: boolean;
  messages: Message[];
  createdAt: Timestamp;
};

export interface MedicalSpecialist {
  id: string;
  name: string;
  specialization: SpecializationType;
  address: string;
  phone: string;
  location: {
    latitude: number;
    longitude: number;
  };
  paymentAmount: number; // Amount paid, 0 for non-paying
  paymentDate: Date;    // When payment was made
}

export enum SpecializationType {
  ORTHOPEDIC = 'orthopedic',
  PHYSIOTHERAPY = 'physiotherapy',
  GENERAL = 'general',
  PSYCHOLOGY = 'psychology',
  CARDIOLOGY = 'cardiology',
  DERMATOLOGY = 'dermatology'
};