import mongoose, { Schema } from 'mongoose';

export interface PersonType {
    name: string;
    age: number;
}

const schema = new Schema<PersonType>(
    {
        name: { required: true, type: String },
        age: { required: true, type: Number },
    },
    { timestamps: true },
);

export const PersonModel = mongoose.model('Person', schema);
