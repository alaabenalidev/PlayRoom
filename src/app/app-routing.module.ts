import { RouterModule, Routes } from '@angular/router';

import { AboutUsComponent } from './components/about-us/about-us.component';
import { CartComponent } from './components/cart/cart.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { DetailsComponent } from './components/event/details/details.component';
import { HomeComponent } from './components/home/home.component';
import { ListComponent as ListEventComponent } from './components/event/list/list.component';
import { ListComponent as ListProductComponent } from './components/product/list/list.component';
import { LoginComponent } from './components/auth/login/login.component';
import { NgModule } from '@angular/core';
import {ListComponent as listCalendrierComponent} from './components/event/calendrier/list/list.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch:'full'},
  {path: '**', redirectTo: '/home', pathMatch:'full'},
  {path: 'home', component: HomeComponent},
  {path: 'aboutus', component: AboutUsComponent},
  {path: 'contactus', component: ContactUsComponent},
  {path: 'list-event', component: ListEventComponent},
  {path: 'event-details', component: DetailsComponent},
  {path: 'list-product', component: ListProductComponent},
  {path: 'calendrier-event', component: listCalendrierComponent},
  {path: 'cart', component: CartComponent},
  {path: 'login', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
