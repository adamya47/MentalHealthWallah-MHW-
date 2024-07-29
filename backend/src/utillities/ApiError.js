class ApiError extends Error{

constructor(statusCode,msg="Something went wrong"){


super(msg);
this.statusCode=statusCode;



}


}
export  {ApiError}