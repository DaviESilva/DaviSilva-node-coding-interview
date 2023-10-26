import { expect } from '@jest/globals'
import { FlightsModel } from '../src/databases/mongo/models/flights.model'
import { DatabaseInstanceStrategy } from '../src/database'
import { MongoStrategy } from '../src/databases/mongo/mongodb';

let databaseInstance: MongoStrategy;

beforeEach(async () => {
    DatabaseInstanceStrategy.setInstanceByEnv('mongo')
    databaseInstance = DatabaseInstanceStrategy.getInstance()

    await FlightsModel.deleteMany({})
})

describe('Flight Model', () => {
    it('Allows to create two Flight', async () => {
        // Arrange
        const flight1 = {
            code: 'ABC-123',
            origin: 'EZE',
            destination: 'LDN',
            status: 'ACTIVE',
        }

        const flight2 = {
            code: 'XYZ-678',
            origin: 'CRC',
            destination: 'MIA',
            status: 'ACTIVE',
        }

        // Act
        const createdFlight1 = await databaseInstance.addFlight(flight1)
        const createdFlight2 = await databaseInstance.addFlight(flight2)

        // Assert
        expect(createdFlight1).toBeDefined
        expect(createdFlight2).toBeDefined
    })

    it('Prevents creating a Flight that already exists on the Database', async () => {
        // Arrange
        const flight = {
            code: 'ABC-123',
            origin: 'EZE',
            destination: 'LDN',
            status: 'ACTIVE',
        }

        // Act: Add the flight to the database
        await databaseInstance.addFlight(flight)

        // Try to add the same flight again
        try {
            await databaseInstance.addFlight(flight)
        } catch (error: any) {
            expect(error.message).toContain('duplicate key error')
        }
    })
})
