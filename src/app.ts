import express, { Application, Request, Response } from "express";
import Joi, { Schema } from 'joi';
import cors from 'cors';
import { PrismaClient, Pitch, Offer } from '@prisma/client'
import PitchesRoute from "./routes/pitches.route";

const app: Application = express();

app.use(cors());
app.use(express.json());

const pitchesRoute = new PitchesRoute();
app.use('/', pitchesRoute.router);

app.listen(8081, () => console.log("Started"));
