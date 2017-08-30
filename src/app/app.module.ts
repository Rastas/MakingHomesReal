import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, Http, BaseRequestOptions } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Storage, IonicStorageModule } from '@ionic/storage';
import { FakeBackendProvider } from '../mock/backend';
import { MockBackend, MockConnection } from '@angular/http/testing';

//Pages
import { MakingHomesReal } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { FeedPage } from '../pages/feed/feed';
import { ActivationsDetailPage } from '../pages/activations-detail/activations-detail';
import { ActivationsListPage } from '../pages/activations-list/activations-list';
import { AboutPage } from '../pages/about/about';
import { TermsPage } from '../pages/terms/terms';

//Providers
import { Api } from '../providers/api';
import { User } from '../providers/user';
import { Feeds } from '../providers/feeds';
import { Activations } from '../providers/activations';
import { Connectivity } from '../providers/connectivity';

//Cordova extensions
import { Camera } from '@ionic-native/camera';
import { GoogleMaps } from '@ionic-native/google-maps';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Network } from '@ionic-native/network';
import { TextMaskModule } from 'angular2-text-mask';

//Translators
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
export function HttpLoaderFactory(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    MakingHomesReal,
    HomePage,
    LoginPage,
    TutorialPage,
    FeedPage,
    ActivationsDetailPage,
    ActivationsListPage,
    AboutPage,
    TermsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [Http]
      }
    }),
    IonicModule.forRoot(MakingHomesReal),
    IonicStorageModule.forRoot(),
    TextMaskModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MakingHomesReal,
    HomePage,
    LoginPage,
    TutorialPage,
    FeedPage,
    ActivationsDetailPage,
    ActivationsListPage,
    AboutPage,
    TermsPage
  ],
  providers: [
    Api,
    User,
    Activations,
    Feeds,
    Connectivity,
    Camera,
    GoogleMaps,
    SplashScreen,
    StatusBar,
    Network,
    /*
    // Providers used to create fake backend
    FakeBackendProvider,
    MockBackend,
    BaseRequestOptions,
    */
    // Keep this to enable Ionic's runtime error handling during development
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
