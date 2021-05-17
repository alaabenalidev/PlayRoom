import { RouterModule, Routes } from '@angular/router'

import { AboutUsComponent } from './components/about-us/about-us.component'
import { AddChildComponent } from './components/parent/add-child/add-child.component'
import { AddComponent as AddLivreComponent } from './components/livre/add/add.component'
import { AuthGuard } from './guards/auth.guard'
import { AuthLoginRegisterGuard } from './guards/auth-login-register.guard'
import { CartComponent } from './components/cart/cart.component'
import { CommonModule } from '@angular/common'
import { ContactUsComponent } from './components/contact-us/contact-us.component'
import { DetailsComponent } from './components/event/details/details.component'
import { HomeComponent } from './components/home/home.component'
import { ListComponent as ListEventComponent } from './components/event/list/list.component'
import { ListComponent as ListProductComponent } from './components/product/list/list.component'
import { ListlivreComponent } from './components/livre/listlivre/listlivre.component'
import { LivreDetailsComponent } from './components/livre/livre-details/livre-details.component';
import { LoginComponent } from './components/auth/login/login.component'
import { NgModule } from '@angular/core'
import { ParentComponent } from './components/parent/parent.component'
import { RegisterComponent } from './components/auth/register/register.component'
import { SearchComponent } from './components/search/search.component'
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
  {
    path: 'addlivre',
    component: AddLivreComponent,
    canActivate: [AuthGuard],
    runGuardsAndResolvers: 'always',
  },
  { path: 'challenge/:id', component: DetailsComponent },
  { path: 'book/:id', component: LivreDetailsComponent },
  {
    path: 'listchild/:id',
    component: ParentComponent,
    canActivate: [AuthGuard],
    runGuardsAndResolvers: 'always',
  },
  {
    path: 'listlivre',
    component: ListlivreComponent,
    canActivate: [AuthGuard],
    runGuardsAndResolvers: 'always',
  },
  {
    path: 'addlivre',
    component: ParentComponent,
    canActivate: [AuthGuard],
    runGuardsAndResolvers: 'always',
  },
  {
    path: 'search/:search',
    component: SearchComponent
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home', pathMatch: 'full' },
]

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
