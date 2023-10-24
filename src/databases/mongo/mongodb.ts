import { Database } from '../database_abstract';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { FlightType } from "./models/flights.model"

import { FlightsModel } from './models/flights.model';

export class MongoStrategy extends Database {
    constructor() {
        super();
        this.getInstance();
    }

    private async getInstance() {
        const mongo = await MongoMemoryServer.create();
        const uri = mongo.getUri();

        const mongooseOpts = {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        };

        const flights = [
            {
                code: 'ABC-123',
                origin: 'EZE',
                destination: 'LDN',
                status: 'ACTIVE',
            },
            {
                code: 'XYZ-678',
                origin: 'CRC',
                destination: 'MIA',
                status: 'ACTIVE',
            },
        ];

        (async () => {
            await mongoose.connect(uri, mongooseOpts);
            await FlightsModel.create(flights);
        })();
    }

    public async getFlights() {
        return FlightsModel.find({});
    }
    
    public async addFlight(Flight: FlightType) {
        try {
            const newFlight = new FlightsModel(Flight);
            const savedFlight = await newFlight.save();
            return savedFlight;
          } catch (error) {
            throw error;
          }
    }

    public async updateFlightStatus(code: string, newStatus: { status: string }) {
        try {
            const updatedFlight = await FlightsModel.findOneAndUpdate(
              { code: code },
              { status: newStatus.status },
              { new: true }
            );
        
            if (!updatedFlight) {
              throw new Error(`Flight with code ${code} not found.`);
            }
        
            return updatedFlight;
          } catch (error) {
            throw error;
          }
    }

    
}
