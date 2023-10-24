import { Database } from '../database_abstract';

import { newDb, IMemoryDb } from 'pg-mem';

export class PostgreStrategy extends Database {
    _instance: IMemoryDb;

    constructor() {
        super();
        this.getInstance();
    }

    private async getInstance() {
        const db = newDb();

        db.public.many(`
            CREATE TABLE flights (
                code VARCHAR(5) PRIMARY KEY,
                origin VARCHAR(50),
                destination VARCHAR(50),
                status VARCHAR(50)
            );
        `);

        db.public.many(`
            INSERT INTO flights (code, origin, destination, status)
            VALUES ('LH123', 'Frankfurt', 'New York', 'on time'),
                     ('LH124', 'Frankfurt', 'New York', 'delayed'),
                        ('LH125', 'Frankfurt', 'New York', 'on time')
        `);

        PostgreStrategy._instance = db;

        return db;
    }

    public async getFlights() {
        return PostgreStrategy._instance.public.many('SELECT * FROM flights');
    }

    public async addFlight(flight: {
        code: string;
        origin: string;
        destination: string;
        status: string;
    }) {
        return PostgreStrategy._instance.public.many(
            `INSERT INTO flights (code, origin, destination, status) VALUES ('${flight.code}', '${flight.origin}', '${flight.destination}', '${flight.status}')`,
        );
    }
}
