import { Database } from '../databases/database_abstract'
import { DatabaseInstanceStrategy } from '../database'
import { FlightType } from '../databases/mongo/models/flights.model'
import { PersonType } from '../databases/mongo/models/person.model'

export class FlightsService {
    private readonly _db: Database

    constructor() {
        this._db = DatabaseInstanceStrategy.getInstance()
    }

    public async getFlights() {
        return this._db.getFlights()
    }
    
    public async getFlight(code: string) {
        let flight = await this._db.getFlight(code)
        return flight
    }

    public async updateFlightStatus(
        code: string,
        newStatus: { status: string }
    ) {
        const flight: any = await this.getFlight(code);
        if (flight == null) {
            throw new Error(`Flight with code ${code} does not exist.`);
        }
        flight.status = newStatus.status
        return this._db.updateFlight(code, flight)
    }

    public async addFlight(flight: FlightType) {
        let checkValue: any = await this._db.getFlight(flight.code)
        if(checkValue){
            throw new Error(`Flight with code ${flight.code} already exists.`)
        }
        return this._db.addFlight(flight)
    }

    public async addPersonToFlight(code: string, person: PersonType) {
        const flight: any = await this.getFlight(code);
        if (flight == null) {
            throw new Error(`Flight with code ${code} does not exist.`);
        }

        flight.persons.push(person);

        // Update the flight with the new person
        return this._db.updateFlight(code, flight);
    }
}
