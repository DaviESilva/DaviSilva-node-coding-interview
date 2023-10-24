import {
    JsonController,
    Get,
    Param,
    Put,
    Post,
    Body,
} from 'routing-controllers';
import { FlightsService } from '../services/flights.service';

@JsonController('/flights', { transformResponse: false })
export default class FlightsController {
    private _flightsService: FlightsService;

    constructor() {
        this._flightsService = new FlightsService();
    }

    @Get('')
    async getAll() {
        return {
            status: 200,
            data: await this._flightsService.getFlights(),
        };
    }

    @Put('/:code')
    async updateFlightStatus(
        @Param('code') code: string,
        @Body()
        status: {
            status: string;
        },
        ) {
        return {
            status: 200,
            data: await this._flightsService.updateFlightStatus(code, status),
        };
    }

    // add flight
    @Post('')
    async addFlight(
        @Body()
        flight: {
            code: string;
            origin: string;
            destination: string;
            status: string;
        },
    ) {
        return {
            status: 200,
            data: await this._flightsService.addFlight(flight),
        };
    }
}
