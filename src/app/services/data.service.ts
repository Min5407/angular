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

  logIn(email: string, password: string) {
    return this.http.post<User>(this.backend + "/api/auth", {
      email: email,
      password: password
    });
  }
  getUsers() {
    return this.http.get<any>(this.backend + "/users");
  }

  register(
    email: string,
    password: string,
    username: string,
    birthday: Date,
    age: number
  ) {
    return this.http.post<User>(this.backend + "/api/register", {
      email: email,
      password: password,
      username: username,
      birthday: birthday,
      age: age
    });
  }
}
