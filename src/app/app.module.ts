import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { SocialLoginModule, SocialAuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';
import { BrowserModule } from '@angular/platform-browser';
import { TimerComponent } from './pages/timer/timer.component';

import { CountdownModule } from 'ngx-countdown';
import { FaqComponent } from './pages/faq/faq.component';
import { SponserComponent } from './pages/sponser/sponser.component';
import { BonusComponent } from './pages/bonus/bonus.component';
import { MarketComponent } from './pages/market/market.component';
import { HoldingComponent } from './pages/holding/holding.component';
import { TransacComponent } from './pages/transac/transac.component';
import {MatDialogModule} from '@angular/material/dialog';
import { MarketdialogComponent } from './components/marketdialog/marketdialog.component';
import { NewsComponent } from './pages/news/news.component';
import { LeaderboardComponent } from './pages/leaderboard/leaderboard.component';
import { SecLoginComponent } from './pages/sec-login/sec-login.component';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    BrowserModule,
    SocialLoginModule,
    CountdownModule,
    MatDialogModule,
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    TimerComponent,
    FaqComponent,
    SponserComponent,
    BonusComponent,
    MarketComponent,
    HoldingComponent,
    TransacComponent,
    MarketdialogComponent,
    NewsComponent,
    LeaderboardComponent,
    SecLoginComponent,
    SpinnerComponent,
  ],
  entryComponents: [
    MarketdialogComponent
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '735357982777-nns9lfqfsmav55bj29p2jou231qve1r9.apps.googleusercontent.com'
            ),
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('669691347230770'),
          },
        ],
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
