import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./components/login/login.component";
import { AppRoutingModule } from "./app-routing.module";
import { HttpClientModule } from "@angular/common/http";
import { AccountComponent } from "./components/account/account.component";
import { RegisterComponent } from "./components/register/register.component";
import { UsersComponent } from "./components/users/users.component";
import { GroupsComponent } from "./components/groups/groups.component";
import { CreateGroupComponent } from "./components/create-group/create-group.component";
import { ChannelsComponent } from "./components/channels/channels.component";
import { CreateChannelComponent } from "./components/create-channel/create-channel.component";
import { ChatComponent } from './components/chat/chat.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AccountComponent,
    RegisterComponent,
    UsersComponent,
    GroupsComponent,
    CreateGroupComponent,
    ChannelsComponent,
    CreateChannelComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
