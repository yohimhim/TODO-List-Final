import { Injectable, signal } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { Subject } from 'rxjs';

const oAuthConfig: AuthConfig = {
  issuer: 'https://accounts.google.com',
  strictDiscoveryDocumentValidation: false,
  redirectUri: window.location.origin,
  clientId: '426310881062-tboo273hl4nlqmfrhquaacahl8k3laq2.apps.googleusercontent.com',
  scope: 'openid profile email'
}

export interface UserInfo {
  info: {
    sub: string, //identifier for user
    email: string,
    name: string,
    picture: string
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user = signal<UserInfo | null>(null);
  userProfile = this.user.asReadonly();     

  constructor(private readonly oAuthService: OAuthService) {
    oAuthService.configure(oAuthConfig);
    oAuthService.loadDiscoveryDocument().then( () => {
      oAuthService.tryLoginImplicitFlow().then( () => {
        if(!oAuthService.hasValidAccessToken()) {
          oAuthService.initLoginFlow();
        } else {
          oAuthService.loadUserProfile().then( (userProfile) => {
            console.log(JSON.stringify(userProfile));
            console.log('Loaded user: ' + userProfile);
            this.user.set(userProfile as UserInfo);

          });
        }
      });
    });
  }

  get accessToken(): string {
    return this.oAuthService.getAccessToken();
  }

  get idToken(): string {
    return this.oAuthService.getIdToken();
  }
}
