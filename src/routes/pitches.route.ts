import { Router } from 'express';
import PitchesController from '../controllers/pitches.controller';
import { Routes } from '../interfaces/routes.interface';
import validationMiddleware from '../middlewares/validation.middleware';

class PitchesRoute implements Routes {
  public path = '/pitches';
  public router = Router();
  public pitchesController = new PitchesController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.pitchesController.getPitches);
    this.router.get(`${this.path}/:id(\\d+)`, this.pitchesController.getPitchById);
    this.router.post(`${this.path}`, validationMiddleware('pitchSchema'), this.pitchesController.createPitch);
    this.router.post(`${this.path}/:id(\\d+)/makeOffer`, validationMiddleware('offerSchema'), this.pitchesController.createOffer);
  }
}

export default PitchesRoute;