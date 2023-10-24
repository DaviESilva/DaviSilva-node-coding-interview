import { FlightType } from "./mongo/models/flights.model";

export class Database {
    public static _instance: any;

    public static getInstance() {
        // subclass must implement this method
    }

    public async getFlights() {
        // subclass must implement this method
    }

    public async updateFlightStatus(code: string, newStatus: { status: string }) {
        // subclass must implement this method
    }

    public async addFlight(flight: FlightType) {
        // subclass must implement this method
    }
}
