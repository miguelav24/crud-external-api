import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const ErrorResponseInterceptor: HttpInterceptorFn = (req, next) =>
  next(req).pipe(catchError(handleErrorResponse));

function handleErrorResponse(errorResponse: HttpErrorResponse) {
  let errorMessage = `Error code: ${errorResponse.status}, ${errorResponse.message}`;
  console.log('errorMessage', errorMessage);
  return throwError(() => errorResponse);
}
