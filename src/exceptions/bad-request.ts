import {ErrorCode, HttpException} from './root'
export class BadRequestException extends HttpException {
    constructor(message: string , ErrorCode:ErrorCode){
        super(message, ErrorCode , 400 , null)
    }
}