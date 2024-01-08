class ErrorHandler {
    public showError(err: any) {
        console.log(err)
        if (typeof (err) == "string") {
            return err
        } else if (err.response) {
            return err.response.data.message
        }  else if (err.message) {
            return err.message
        } else {
            console.log(err);
            console.log(("Oops! Something went wrong..."));
        }
    }
}

const errorHandler = new ErrorHandler();
export default errorHandler;