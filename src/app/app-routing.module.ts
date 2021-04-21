import { RouterModule, Routes } from '@angular/router'

import { AboutUsComponent } from './components/about-us/about-us.component'
import { AddChildComponent } from './components/parent/add-child/add-child.component'
import { AuthGuard } from './guards/auth.guard'
import { AuthLoginRegisterGuard } from './guards/auth-login-register.guard'
import { CartComponent } from './components/cart/cart.component'
import { CommonModule } from '@angular/common'
import { ContactUsComponent } from './components/contact-us/contact-us.component'
import { DetailsComponent } from './components/event/details/details.component'
import { HomeComponent } from './components/home/home.component'
import { ListComponent as ListEventComponent } from './components/event/list/list.component'
import { ListComponent as ListProductComponent } from './components/product/list/list.component'
import { LoginComponent } from './components/auth/login/login.component'
import { NgModule } from '@angular/core'
import { ParentComponent } from './components/parent/parent.component'
import { RegisterComponent } from './components/auth/register/register.component'
import { ListComponent as listCalendrierComponent } from './components/event/calendrier/list/list.component'

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'aboutus', component: AboutUsComponent },
  { path: 'contactus', component: ContactUsComponent },
  { path: 'list-event', component: ListEventComponent },
  { path: 'list-product', component: ListProductComponent },
  { path: 'calendrier-event', component: listCalendrierComponent },
  { path: 'cart', component: CartComponent },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthLoginRegisterGuard],
    runGuardsAndResolvers: 'always',
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [AuthLoginRegisterGuard],
    runGuardsAndResolvers: 'always',
  },
  {
    path: 'addchild',
    component: AddChildComponent,
    canActivate: [AuthGuard],
    runGuardsAndResolvers: 'always',
  },
  { path: 'challenge/:id', component: DetailsComponent },
  {
    path: 'listchild/:id',
    component: ParentComponent,
    canActivate: [AuthGuard],
    runGuardsAndResolvers: 'always',
  },
  {
    path: 'listlivre/:id',
    component: ParentComponent,
    canActivate: [AuthGuard],
    runGuardsAndResolvers: 'always',
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home', pathMatch: 'full' },
]

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
