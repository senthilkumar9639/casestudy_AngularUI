import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import { OrderCreateComponent } from './order-create/order-create.component';
import { TestComponent } from './test/test.component';


const routes: Routes = [{path:"login",component:LoginComponent},
{path:"CreateOrder",component:OrderCreateComponent},
{path:"test",component:TestComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
