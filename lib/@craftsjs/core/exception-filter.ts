import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
  
  @Catch()
  export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse();
      const request = ctx.getRequest();
      const status =
        exception.code
          ? exception.code
          : exception.getStatus 
          ? exception.getStatus() 
          : HttpStatus.INTERNAL_SERVER_ERROR;
  
      const message = exception.error || exception.message;

      response.status(status).json({
        statusCode: status,
        message,
        response: exception.response,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
    }
  }