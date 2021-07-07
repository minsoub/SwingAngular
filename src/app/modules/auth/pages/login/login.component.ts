import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthFacade} from '../../../../core/facade/auth.facade';
import {LoginContextInterface} from '../../../../data/schema/auth';
import {Logger} from '../../../../core/logger.service';
//import {SnackbarService} from '../../../../shared/service/snackbar.service';
import {AlertService} from '../../../../shared/service/alert.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  log = new  Logger('LoginComponent');
  error: string;
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private authFacade: AuthFacade,
    private alertService: AlertService) { 
      this.buildForm();
    }

  private buildForm(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required] ,
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  login(): void {
    const credentials: LoginContextInterface = this.loginForm.value;

    this.authFacade.doLogin(credentials)
        .subscribe(success => {
          if (typeof success === 'boolean') {
            if (success) {
              this.router.navigate(['/', 'home']);
            }else {
              this.log.debug('login fail');
              this.alertService.openAlert('등록되 정보가 없습니다!');
            }
          }
        }, error => {
          this.log.debug('unknown error::', error);
        });
  }

}
