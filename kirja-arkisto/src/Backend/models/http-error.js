class HttpError extends Error {
    constructor(message, errorCode){
        super(message);
        this.code = errorCode;
        console.log("Tähän tulee virhe", message, errorCode);
    }
}
module.exports = HttpError;