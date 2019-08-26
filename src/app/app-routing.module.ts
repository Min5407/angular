import { NgModule, Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { AccountComponent } from "./components/account/account.component";
import { RegisterComponent } from "./components/register/register.component";
import { UsersComponent } from "./components/users/users.component";
import { GroupsComponent } from "./components/groups/groups.component";
import { CreateGroupComponent } from "./components/create-group/create-group.component";
import { ChannelsComponent } from "./components/channels/channels.component";

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "account", component: AccountComponent },
  { path: "register", component: RegisterComponent },
  { path: "users", component: UsersComponent },
  { path: "groups", component: GroupsComponent },
  { path: "groups/create", component: CreateGroupComponent },
  { path: "groups/channels", component: ChannelsComponent }
];
@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
