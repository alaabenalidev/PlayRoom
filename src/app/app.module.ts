import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { Http, HttpModule } from '@angular/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core'
import { RouterModule } from "@angular/router";

import { AboutUsComponent } from './components/about-us/about-us.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthGuard } from './guards/auth.guard';
// import { AuthLoginRegisterGuard } from './guards/auth-login-register.guard';
import { AuthService } from './services/auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CartComponent } from './components/cart/cart.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { DetailsComponent } from './components/product/details/details.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { ListComponent } from './components/event/list/list.component';
import { ListMonthComponent } from './components/event/calendrier/list-month/list-month.component';
import { LoginComponent } from './components/auth/login/login.component';
import { NgModule } from '@angular/core';
import { ParentChildGuard } from './guards/parent-child.guard';
import { RegisterComponent } from './components/auth/register/register.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ValidateService } from './services/validate.service';
import { ParentComponent } from './components/parent/parent.component';
import { AddChildComponent } from './components/parent/add-child/add-child.component';
import { ShowHistoryChildComponent } from './components/parent/show-history-child/show-history-child.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutUsComponent,
    ContactUsComponent,
    ListComponent,
    ListMonthComponent,
    CartComponent,
    LoginComponent,
    FooterComponent,
    HeaderComponent,
    DetailsComponent,
    RegisterComponent,
    ParentComponent,
    AddChildComponent,
    ShowHistoryChildComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule, 
    ReactiveFormsModule,
    RouterModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    HttpModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [ValidateService, AuthService, AuthGuard],
  bootstrap: [AppComponent],
  exports: [AppRoutingModule]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
