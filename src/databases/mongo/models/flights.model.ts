import mongoose, { Schema } from 'mongoose';
import { PersonType } from './person.model';

export interface FlightType {
    code: string;
    origin: string;
    destination: string;
    status: string;
    persons: PersonType[]
}

const schema = new Schema<FlightType>(
    {
        code: { required: true, type: String },
        origin: { required: true, type: String },
        destination: { required: true, type: String },
        status: String,
        persons: {required: false, type: Array<PersonType>}
    },
    { timestamps: true },
);

export const FlightsModel = mongoose.model('Flights', schema);
