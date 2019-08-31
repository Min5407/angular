import { Injectable, Component, EventEmitter } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

interface User {
  email: string;
  username: string;
  birthday: string;
  age: number;
  valid: boolean;
  type: string;
}

@Injectable({
  providedIn: "root"
})
export class DataService {
  $groupName = new EventEmitter();

  backend = "http://localhost:3000";

  constructor(private http: HttpClient) {}

  // this function is used to send groupName from group component to channel component
  sendGroupName(group) {
    this.$groupName.emit(group);
  }

  // this function is used to get groups from the server
  getGroups() {
    return this.http.get<any>(this.backend + "/groups");
  }

  // this function is used for authentication
  logIn(email: string, password: string) {
    return this.http.post<User>(this.backend + "/api/auth", {
      email: email,
      password: password
    });
  }

  // this function is used to get users from the server

  getUsers() {
    return this.http.get<any>(this.backend + "/users");
  }

  // this function is used to delete users
  deleteUser(email: string) {
    return this.http.post<any>(this.backend + "/api/delete", {
      email: email
    });
  }

  // this function is used to create group
  createGroup(group: any, members, selectedAssis: any, groupAdmin: string) {
    return this.http.post<any>(this.backend + "/group/create", {
      group: group,
      members: members,
      selectedAssis: selectedAssis,
      groupAdmin: groupAdmin
    });
  }
  //this function is used to add members to the group
  groupInvite(member: string, group: string) {
    return this.http.post<any>(this.backend + "/groups/group/invite", {
      member: member,
      group: group
    });
  }
  //this function is used to delete Group
  deleteGroup(group: string) {
    return this.http.post<any>(this.backend + "/group/delete", {
      group: group
    });
  }
  //this function is used to delete members from the group
  deleteMember(member: string, group) {
    return this.http.post<any>(this.backend + "/group/deleteMember", {
      member: member,
      group: group
    });
  }

  //this function is used to create channel inside the group
  createChannel(channel: string, group: string) {
    return this.http.post<any>(this.backend + "/createChannel", {
      channel: channel,
      group: group
    });
  }

  //this function is used to delete channel
  deleteChannel(group: string, channel: string) {
    return this.http.post<any>(this.backend + "/deleteChannel", {
      channel: channel,
      group: group
    });
  }

  //this function is used to add member to the channel
  channelInvite(groupName, channel, member) {
    return this.http.post<any>(this.backend + "/channel/invite", {
      group: groupName,
      channel: channel,
      member: member
    });
  }

  // this function is for creating a user
  register(
    email: string,
    password: string,
    username: string,
    birthday: Date,
    type: string
  ) {
    return this.http.post<any>(this.backend + "/api/register", {
      email: email,
      password: password,
      username: username,
      birthday: birthday,
      type: type
    });
  }
  //this function is used to delete member from a channel

  deleteChannelMember(group: string, channel: string, member: string) {
    return this.http.post<any>(this.backend + "/channel/deleteMember", {
      group: group,
      channel: channel,
      member: member
    });
  }

  //this function is used to get all the channels
  getChannels(group: string) {
    return this.http.post<any>(this.backend + "/getChannels", {
      group: group
    });
  }

  // give super type to a user
  giveSuper(user) {
    return this.http.post<any>(this.backend + "/giveSuper", {
      user: user
    });
  }
}
