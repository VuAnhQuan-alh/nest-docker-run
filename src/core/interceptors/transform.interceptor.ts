import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponseDto } from '../../commons/data.transfer.objects';
import { Constants } from '../../commons/constants';

interface Response {
  data: ResponseDto;
  meta: Meta | object;
}
interface Meta {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
  count: number;
}

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response> {
    let meta: Meta | object;
    return next.handle().pipe(
      map((data: ResponseDto) => {
        const query = context.switchToHttp().getRequest().query;
        if (data.attributes instanceof Array) {
          meta = {
            page: +query.page || 1,
            pageSize: +query.pageSize || Constants.pageSize,
            pageCount: Math.ceil(
              data.count / (+query.pageSize || Constants.pageSize),
            ),
            total: data.count,
            count: data.attributes.length,
          };
        } else {
          meta = {};
        }
        return {
          data: { message: data.message, attributes: data.attributes },
          meta: meta,
        };
      }),
    );
  }
}
