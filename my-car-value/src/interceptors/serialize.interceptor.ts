import { UseInterceptors, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';
import { UserDto } from '../users/dtos/user.dto';

export class SerializeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    // run something before the request is handled 
    // by the request handler 
    console.log('I am running before the handler', context);

    return handler.handle().pipe(
      map((data: any) => {
        // run smth before the response is sent out
        console.log('I am running before response is sent out', data);
        return plainToClass(UserDto, data, {
          excludeExtraneousValues: true,
        })
      })
    )
  }
}