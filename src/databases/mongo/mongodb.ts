import { Database } from '../database_abstract'
import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { FlightType } from './models/flights.model'

import { FlightsModel } from './models/flights.model'

export class MongoStrategy extends Database {
    constructor() {
        super()
        this.getInstance()
    }

    private async getInstance() {
        const mongo = await MongoMemoryServer.create()
        const uri = mongo.getUri()

        const mongooseOpts = {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        }

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
        ]

        ;(async () => {
            await mongoose.connect(uri, mongooseOpts)
            await FlightsModel.create(flights)
        })()
    }

    public async getFlights() {
        return FlightsModel.find({})
    }

    public async getFlight(code: string) {
        return FlightsModel.findOne(
            { code: code },
            (err: Error, result: FlightType) => {
                if (err) {
                    throw err
                } else {
                    if (result) {
                        console.log(`Found document with code ${code}`)
                        return result
                    } else {
                        console.log('Document not found.')
                        return null
                    }
                }
            }
        )
    }

    public async addFlight(Flight: FlightType) {
        try {
            const newFlight = new FlightsModel(Flight)
            const savedFlight = await newFlight.save()
            return savedFlight
        } catch (error) {
            throw error
        }
    }

    public async updateFlight(
        code: string,
        NewFlight: FlightType
    ) {
        try {
            const updatedFlight = await FlightsModel.findOneAndUpdate(
                { code: code },
                NewFlight,
                { new: true }
            )

            if (!updatedFlight) {
                throw new Error(`Flight with code ${code} not found.`)
            }

            return updatedFlight
        } catch (error) {
            throw error
        }
    }
}
