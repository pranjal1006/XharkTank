import { PrismaClient, Offer, Pitch } from '@prisma/client';
import createHttpError from 'http-errors'
import { PitchWithOffers, OfferApiFormat } from '../interfaces/pitches.interface'
import { PitchFindType } from '../types/pitch.types'

class PitchService {
  public prisma = new PrismaClient();

  public async findAllPitches(): Promise<PitchWithOffers[]> {
    const pitches: PitchWithOffers[] = await this.prisma.pitch.findMany({
      orderBy: [
        {
          createdAt: 'desc',
        },
        {
          id: 'desc',
        },
      ],
      include: {
        offers: true,
      },
    })
    return pitches;
  }

  public async findPitchById(pitchId: number): Promise<PitchFindType | null> {
    const pitch: Promise<PitchFindType | null> = this.prisma.pitch.findUnique({
      where: {
        id: pitchId,
      },
      select: {
        id: true,
        entrepreneur: true,
        pitchTitle: true,
        pitchIdea: true,
        askAmount: true,
        equity: true,
        offers: {
          select: {
            id: true,
            investor: true,
            amount: true,
            equity: true,
            comment: true,
          },
        },
      },
    });

    return pitch;
  }

  public async createPitch(pitchData: Pitch): Promise<Pitch> {
    const newPitch = this.prisma.pitch.create({
      data: { ...pitchData },
    });
    return newPitch;
  }

  public async createOffer(offerData: any, id: number): Promise<Offer> {
    const pitchId: Pick<Pitch, 'id'> | null = await this.prisma.pitch.findUnique({
      where: {
        id: Number(id),
      },
      select: { id: true },
    });
    
    if (!pitchId)
      throw createHttpError(404, `Pitch not found`);
  
    const newOffer = this.prisma.offer.create({
      data: {
        ...offerData,
        pitch: {
          connect:  {
            id: pitchId.id,  
          }
        }
      }
    });

    return newOffer;
  }
}

export default PitchService;