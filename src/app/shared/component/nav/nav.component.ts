import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {Logger} from '../../../core/logger.service';
import {NavigationEnd, Router} from '@angular/router';
import {AuthFacade} from '../../../core/facade/auth.facade';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  private readonly log = new  Logger('NavComponent');
  
  constructor(private authFacade: AuthFacade,
    private router: Router,
    private dialog: MatDialog,) { }

  ngOnInit(): void {
  }

  logout(): void {

    this.authFacade.logout().subscribe(() => {
        this.authFacade.deleteTokens();
        this.router.navigate(['/']);
        }, error => {
            this.log.error('logout fail! ::' + error);
            this.authFacade.deleteTokens();
            this.router.navigate(['/']);
    });
  }  

}
