import { Pitch, Offer } from '@prisma/client';

export type PitchFindType = Omit<Pitch, 'createdAt'> & { offers : Omit<Offer, 'pitchId'>[] }
