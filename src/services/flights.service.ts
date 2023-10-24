import { Database } from '../databases/database_abstract'
import { DatabaseInstanceStrategy } from '../database'
import { FlightType } from '../databases/mongo/models/flights.model'

export class FlightsService {
    private readonly _db: Database

    constructor() {
        this._db = DatabaseInstanceStrategy.getInstance()
    }

    public async getFlights() {
        return this._db.getFlights()
    }

    public async updateFlightStatus(
        code: string,
        newStatus: { status: string }
    ) {
        return this._db.updateFlightStatus(code, newStatus)
    }

    public async addFlight(flight: FlightType) {
        return this._db.addFlight(flight)
    }
}
