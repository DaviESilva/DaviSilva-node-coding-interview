import {
    JsonController,
    Get,
    Param,
    Put,
    Post,
    Body,
    Res,
} from 'routing-controllers'
import { FlightsService } from '../services/flights.service'
import { PersonType } from '../databases/mongo/models/person.model'

@JsonController('/flights', { transformResponse: false })
export default class FlightsController {
    private _flightsService: FlightsService

    constructor() {
        this._flightsService = new FlightsService()
    }

    @Get('')
    async getAll() {
        return {
            status: 200,
            data: await this._flightsService.getFlights(),
        }
    }

    @Get('/:code')
    async getOne(@Param('code') code: string, @Res() response: any) {
        try {
            const data = await this._flightsService.getFlight(code)
            
            if(data == null) {
                response.status(404);
                return {
                    status: 404,
                    error: "Flight doesn't exist."
                }
            }
            return {
                status: 200,
                data: data
            }
        } catch (error: any) {
            response.status(500);
            return {
                status: 500,
                error: error.message,
            }
        }
    }

    @Put('/:code')
    async updateFlightStatus(
        @Param('code') code: string,
        @Body()
        status: {
            status: string
        }
    ) {
        return {
            status: 200,
            data: await this._flightsService.updateFlightStatus(code, status),
        }
    }

    // add flight
    @Post('')
    async addFlight(
        @Body()
        flight: {
            code: string
            origin: string
            destination: string
            status: string
            persons: Array<PersonType>
        }
    ) {
        return {
            status: 201,
            data: await this._flightsService.addFlight(flight),
        }
    }
}
