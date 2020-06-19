import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
    private AUTH_HEADER = "Authorization";
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('URL: ', req.url);
        const accessToken = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0QGdtYWlsLmNvbSIsImF1dGgiOlt7ImF1dGhvcml0eSI6IlJPTEVfVVNFUiJ9XSwiaWF0IjoxNTkyNTM5MDA2LCJleHAiOjE1OTI1Mzk5MDZ9.5ySbveXoesAVSLAHGsJkfGgRZIcSyyKfLNxlu_cKldc';
        const modifiedReq = req.clone({ 
            headers: req.headers.set(this.AUTH_HEADER, "Bearer " + accessToken),
            // headers: req.headers.set('Authorization', `Bearer ${userToken}`),
            withCredentials: true
        });
        return next.handle(modifiedReq);
    }
}