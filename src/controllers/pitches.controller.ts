import { NextFunction, Request, Response } from 'express';
import { Pitch, Offer } from '@prisma/client';
import PitchService from '../services/pitch.service';
import { PitchWithOffers, PitchApiFormat, OfferApiFormat } from '../interfaces/pitches.interface'
import { PitchFindType } from '../types/pitch.types'

class PitchesController {
  public pitchService = new PitchService();

  public mapPitchToApiFormat = (pitch: PitchWithOffers | PitchFindType): PitchApiFormat => {
    return {
      id: pitch.id.toString(),
      entrepreneur: pitch.entrepreneur,
      pitchTitle: pitch.pitchTitle,
      pitchIdea: pitch.pitchIdea,
      askAmount: Number(pitch.askAmount.toString()),
      equity: Number(pitch.equity.toString()),
      offers: pitch.offers.map((offer) => ({
        id: offer.id.toString(),
        investor: offer.investor,
        amount: Number(offer.amount.toString()),
        equity: Number(offer.equity.toString()),
        comment: offer.comment,
      }))
    };
  }

  public getPitches = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllPitchesData: PitchWithOffers[] = await this.pitchService.findAllPitches();
      res.status(200).json(findAllPitchesData.map(pitch => this.mapPitchToApiFormat(pitch)));
    } catch (error) {
      next(error);
    }
  };

  public getPitchById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const pitchId = Number(req.params.id);
      const findOnePitchData: PitchFindType |null = await this.pitchService.findPitchById(pitchId);

      if (!findOnePitchData)
        res.status(404).end();
      else {
        res.status(200).json(this.mapPitchToApiFormat(findOnePitchData!));
      }
    } catch (error) {
      next(error);
    }
  };

  public createPitch = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const createPitchData: Pitch = await this.pitchService.createPitch(req.body);
      res.status(201).json({ id: createPitchData.id.toString() });
    } catch (error) {
      next(error);
    }
  };

  public createOffer = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const createUserData: Offer = await this.pitchService.createOffer(req.body, Number(req.params.id));
      res.status(201).json({ id: createUserData.id.toString() });
    } catch (error) {
      next(error);
    }
  };
}

export default PitchesController;