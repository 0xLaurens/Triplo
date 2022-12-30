import {Inject, Injectable} from "@angular/core";
import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthHttpService} from "./auth-http.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    @Inject(AuthHttpService)
    private auth: AuthHttpService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem("token");

    if (token) {
      const requestWithToken = request.clone({
        setHeaders: {
          Authorization: `${token}`
        }
      });

      return next.handle(requestWithToken);
    }

    return next.handle(request);
  }
}

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];
