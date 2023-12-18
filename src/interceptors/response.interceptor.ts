import { Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpStatus } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        // console.log('Interceptor', context);
        return next.handle().pipe(
            map(data => {
                return {
                    ok: true,
                    message: 'Operación exitosa',
                    data,
                };
            }),
        );
    }
}