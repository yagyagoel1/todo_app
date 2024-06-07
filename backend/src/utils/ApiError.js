class ApiError {
  constructor(statusCode, message="something went wrong", errors = []) {
    
    this.statusCode = statusCode;
    this.message = message;
    this.data = null;
    this.errors = errors;
    this.success = false;
    

}
}
export default ApiError;