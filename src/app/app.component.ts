import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { AuthService } from '../pages/services/auth.service';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  //seting rootpage
  rootPage:any = LoginPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,public authService: AuthService) {
    platform.ready().then(() => {

      this.authService.user.subscribe(user=>{if(user)
        {
          this.rootPage = TabsPage;
        }
      else{this.rootPage = LoginPage;
        console.log("not logined");}});
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
