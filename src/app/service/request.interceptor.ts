import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { HelperService } from './pizzeria-helper.service';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
    private AUTH_HEADER = "Authorization";
    constructor(private helperService: HelperService){}
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('URL: ', req.url);
        //not yet login, nothing is in localstorage doesn't exist
        //TODO: need to handle when token expired
        if(this.helperService.getObjectFromLocalStorage() === undefined) {
            const modifiedReq = req.clone({ 
                withCredentials: true
            });
            return next.handle(modifiedReq);
        } else {
            const accessToken = JSON.parse(this.helperService.getObjectFromLocalStorage()).token;
            const modifiedReq = req.clone({ 
                headers: req.headers.set(this.AUTH_HEADER, 'Bearer ' + accessToken),
                withCredentials: true
            });
            return next.handle(modifiedReq);
        }
    }
}