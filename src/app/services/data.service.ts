import { Injectable } from "@angular/core";
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
  backend = "http://localhost:3000";

  constructor(private http: HttpClient) {}

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
  createGroup(group: any, members, selectedAssis: any) {
    console.log(members);
    return this.http.post<any>(this.backend + "/group/create", {
      group: group,
      members: members,
      selectedAssis: selectedAssis
    });
  }

  deleteGroup(group: string) {
    return this.http.post<any>(this.backend + "/group/delete", {
      group: group
    });
  }
  deleteMember(member: string) {
    return this.http.post<any>(this.backend + "/group/deleteMember", {
      member: member
    });
  }

  register(
    email: string,
    password: string,
    username: string,
    birthday: Date,
    age: number
  ) {
    return this.http.post<any>(this.backend + "/api/register", {
      email: email,
      password: password,
      username: username,
      birthday: birthday,
      age: age
    });
  }
}
