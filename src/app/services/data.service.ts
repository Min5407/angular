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

  sendGroupName(group) {
    this.$groupName.emit(group);
  }

  getGroups() {
    return this.http.get<any>(this.backend + "/groups");
  }
  logIn(email: string, password: string) {
    return this.http.post<User>(this.backend + "/api/auth", {
      email: email,
      password: password
    });
  }
  getUsers() {
    return this.http.get<any>(this.backend + "/users");
  }

  deleteUser(email: string) {
    return this.http.post<any>(this.backend + "/api/delete", {
      email: email
    });
  }
  createGroup(group: any, members, selectedAssis: any, groupAdmin: string) {
    return this.http.post<any>(this.backend + "/group/create", {
      group: group,
      members: members,
      selectedAssis: selectedAssis,
      groupAdmin: groupAdmin
    });
  }
  groupInvite(member: string, group: string) {
    return this.http.post<any>(this.backend + "/groups/group/invite", {
      member: member,
      group: group
    });
  }

  deleteGroup(group: string) {
    return this.http.post<any>(this.backend + "/group/delete", {
      group: group
    });
  }
  deleteMember(member: string, group) {
    return this.http.post<any>(this.backend + "/group/deleteMember", {
      member: member,
      group: group
    });
  }

  createChannel(channel: string, group: string) {
    return this.http.post<any>(this.backend + "/createChannel", {
      channel: channel,
      group: group
    });
  }
  deleteChannel(group: string, channel: string) {
    return this.http.post<any>(this.backend + "/deleteChannel", {
      channel: channel,
      group: group
    });
  }

  channelInvite(groupName, channel, member) {
    return this.http.post<any>(this.backend + "/channel/invite", {
      group: groupName,
      channel: channel,
      member: member
    });
  }

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
  deleteChannelMember(group: string, channel: string, member: string) {
    return this.http.post<any>(this.backend + "/channel/deleteMember", {
      group: group,
      channel: channel,
      member: member
    });
  }

  getChannels(group: string) {
    return this.http.post<any>(this.backend + "/getChannels", {
      group: group
    });
  }
}
