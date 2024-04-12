import {ErrorCode, HttpException} from './root'
export class UnAuthorizedException extends HttpException {
    constructor(message: string , ErrorCode:ErrorCode){
        super(message, ErrorCode , 401 , null)
    }
}