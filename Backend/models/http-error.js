class HttpError extends Error {
    constructor(message, errorCode){
        super(message);
        this.code = errorCode;
        console.log("Tähän tulee virhe");
    }
}
module.exports = HttpError;