import { Component, OnInit } from '@angular/core';
import {Logger} from './core/logger.service';
import {environment} from '../environments/environment';
import {OidcSecurityService} from 'angular-auth-oidc-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  private readonly log = new Logger(this.constructor.name);
  title = 'SwingAngular';

  //constructor(public oidcSecurityService: OidcSecurityService) {
  //}


  ngOnInit(): void {
    if (environment.production) {
      Logger.enableProductionMode();
    }

    this.log.debug('angular start...');

    //this.oidcSecurityService.checkAuth().subscribe((isAuthenticated) => {
    //  this.log.debug('app authenticated', isAuthenticated);
    //});

  }
}
