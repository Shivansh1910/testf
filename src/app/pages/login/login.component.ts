import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocialAuthService, SocialUser } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { error } from 'protractor';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  user: SocialUser;
  loggedIn: boolean;

  access_token;

  
  constructor(private authService: SocialAuthService, 
    private http: HttpClient, private router: Router) {}

  signInWithGoogle(): void {
    // this.authService.initState.subscribe(() => {}, (console.error), () => {console.log('all providers are ready')});
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      // console.log(user)
      if(user.provider == 'GOOGLE'){
        var backend = 'google-oauth2'
        localStorage.setItem('image_url', user.photoUrl);
        this.get_token(backend, user.authToken);
      }
      if(user.provider == "FACEBOOK"){        
        var backend = 'facebook';
        localStorage.setItem('image_url', user.photoUrl);
        this.get_token(backend, user.authToken);
      }
    });
  }
  ngOnDestroy() {
  }

  get_token(backend, authToken){
    var body = new FormData();
    body.append('grant_type', 'convert_token');
    body.append('backend', backend);
    body.append('client_id', 'lMUgn0nSzO8TX2EdU0gQ7IoaLI6iDeUsBSUVC2qd');
    body.append('client_secret', 'qg3qhBTh6YEjJDd7nP9CrBZuMip8JjsG3SwV2l4KD6Is1gefhKPGko1p7QF9bPpLQ2xkt1blj99wXCzftTyX4XEz9R9bgdIjKbBC5azt3HJpJy2hPaoZvhKdwKFjOEkB');
    body.append('token', authToken);

    this.http.post<any>("https://api5.ecell.in/django-oauth/convert-token", body).subscribe(
    data => {
      this.access_token = data['access_token'];
      // console.log(data);
      localStorage.setItem('token', this.access_token);
      localStorage.setItem('refresh_token', data['refresh_token'])
      
      this.router.navigate(['dashboard'])
    });

  }

}
