import { HttpException, HttpStatus } from '@nestjs/common';

export const httpException = (e) => {
  const prefix = e.noErrPrefix ? '' : 'Error: ';
  throw new HttpException(prefix + e.message, HttpStatus.BAD_REQUEST);
};
