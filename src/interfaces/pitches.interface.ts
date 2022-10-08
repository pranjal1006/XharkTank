import { Pitch, Offer } from '@prisma/client';

export interface PitchApiFormat {
  id: string;
  entrepreneur: string;
  pitchTitle: string;
  pitchIdea: string;
  askAmount: number;
  equity: number;
  offers: OfferApiFormat[];
}

export interface OfferApiFormat {
  id: string;
  investor: string;
  amount: number;
  equity: number;
  comment: string;
}

export interface PitchWithOffers extends Pitch {
  offers: Offer[];
}