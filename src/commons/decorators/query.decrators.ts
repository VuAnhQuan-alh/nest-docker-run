import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { Constants } from '../constants';
import { PaginationDto } from '../data.transfer.objects';

export const Queries = createParamDecorator(
  (data: string[], context: ExecutionContext) => {
    const request: Request = context.switchToHttp().getRequest();
    const queries = request.query;
    const qs = data.reduce((acc: object, curr: string) => {
      return { ...acc, [curr]: queries[curr] };
    }, {}) as PaginationDto;

    const skip = (+qs.page - 1) * (+qs.pageSize || Constants.pageSize) || 0;
    return { ...qs, skip, pageSize: +qs.pageSize || Constants.pageSize };
  },
);
