import { Injectable, Provider } from "@angular/core";
import { HttpInterceptor, HttpEvent, HttpResponse, HttpRequest, HttpHandler, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from "rxjs";

@Injectable()
export class AppInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Mzg3NGUxNDgxZDYzZjgwZGFhYWRiYWEiLCJlbWFpbCI6InRvZG9yb3d3d3dAZ21haWwuY29tIiwidXNlcm5hbWUiOiJlcmlrMDQiLCJpYXQiOjE2Njk4MTE3MzJ9.PGQNrAC0b3dvOcadZtk-eY30mjnKua5Ghw_aT9pvIGo'
        return next.handle(req.clone({ setHeaders: { 'X-Authorization': token}}));
    }

}
export const appInterceptorProvider: Provider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AppInterceptor,
    multi: true
  };