

declare class ErrorClass implements Error {
    public name:string;
    public message:string;
    public stack:string;
    constructor(message?:string);
    new (message: string): Error;
    static captureStackTrace(error: Error, constructorOpt: any);
}
