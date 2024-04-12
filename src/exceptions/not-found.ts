import {ErrorCode, HttpException} from './root'
export class NotFoundException extends HttpException {
    constructor(message: string , ErrorCode:ErrorCode){
        super(message, ErrorCode , 404 , null)
    }
}