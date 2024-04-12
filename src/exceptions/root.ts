//message , status code , error code , error

export class HttpException extends Error{
    message:string;
    errorCode:any;
    statusCode:number;
    errors:ErrorCode;

    constructor(message:string , errorCode:ErrorCode , statusCode:number , error:any ){
        super(message);
        this.message = message;
        this.errorCode = errorCode;
        this.statusCode = statusCode;
        this.errors = error;
    }
}


export enum ErrorCode{
    USER_NOT_FOUND = 404,
    USER_ALREADY_EXISTS = 409,
    INCORRECT_PASSWORDS = 401,
    UNPROCESSABLE_ENTITY = 403,
    INTERNAL_EXCEPTION=3001,
    UNAUTHORIZED=401
}