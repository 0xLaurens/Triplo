import {ArgumentsHost, Catch, ExceptionFilter} from "@nestjs/common";

@Catch()
export class MongooseExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {

   console.log("HTTP exception handler triggered",
            JSON.stringify(exception));

    const context = host.switchToHttp(),
      response = context.getResponse();

    return response.status(500).json({
      "statusCode": 500,
      "createdBy": "MongooseExceptionFilter",
      "message": exception.message ? exception.message :
        "Unexpected error occurred"
    })
  }

}

