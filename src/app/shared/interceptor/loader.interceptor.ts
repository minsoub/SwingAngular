import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, Observer} from 'rxjs';
import {LoaderService} from '../service/loader.service';
import {Logger} from '../../core/logger.service';
import {environment} from '../../../environments/environment';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  private readonly log = new Logger(this.constructor.name);

  private requests: HttpRequest<any>[] = [];

  constructor(private loaderService: LoaderService) { }

  removeRequest(req: HttpRequest<any>): void {
    const i = this.requests.indexOf(req);
    if (i >= 0) {
      this.requests.splice(i, 1);
    }
    this.loaderService.isLoading.next(this.requests.length > 0);
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    request = request.clone({
      withCredentials: true
    });
    
      if (request.url.startsWith('https://api.openweathermap.org')
          || request.url.startsWith('https://icheck-mobile-app.s3.ap-northeast-2.amazonaws.com/')) {
          return next.handle(request);
      }

      this.requests.push(request);
      this.loaderService.isLoading.next(true);
      return Observable.create(observer => {
          const subscription = next.handle(request)
              .subscribe(
                  event => {
                    if (event instanceof HttpResponse) {
                      this.removeRequest(request);
                      observer.next(event);
                    }
                  },
                  err => {
                    this.log.error(err);
                    this.removeRequest(request);
                    observer.error(err);
                  },
                  () => {
                    this.removeRequest(request);
                    observer.complete();
                  });
          // remove request from queue when cancelled
          return () => {
            this.removeRequest(request);
            subscription.unsubscribe();
          };
        });

  }
}
