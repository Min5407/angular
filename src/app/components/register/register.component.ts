import { Component, OnInit } from "@angular/core";
import { DataService } from "../../services/data.service";
import { Route, Router, Data } from "@angular/router";

import { HttpErrorResponse } from "@angular/common/http";
@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  email: "";
  password: "";
  userName: "";
  birthday: Date;
  age: number;
  super = false;
  type: "";
  valid: boolean;

  profile;

  constructor(private router: Router, private dataservice: DataService) {}

  ngOnInit() {
    this.profile = JSON.parse(sessionStorage.getItem("user"));

    if (this.profile.type == "normal") {
      alert("Only for Super/Group Admin");
      this.router.navigateByUrl("/account");
    } else if (this.profile.type == "group assis") {
      alert("Only for Super/Group Admin");
      this.router.navigateByUrl("/account");
    }
  }

  // create User
  createUser() {
    console.log(this.age, this.birthday);
    if (this.email === undefined || this.email == "") {
      alert("email must not be blank");
      return;
    } else if (this.userName === undefined || this.userName == "") {
      alert("userName must not be blank");
      return;
    } else if (this.password === undefined || this.password == "") {
      alert("password must not be blank");
      return;
    } else if (this.type === undefined || this.type == "") {
      alert("type must not be blank");
      return;
    } else if (this.birthday === undefined) {
      alert("birthday must not be blank");
      return;
    } else if ((this.age = undefined)) {
      alert("age must not be blank");
      return;
    } else {
      this.dataservice
        .register(
          this.email,
          this.password,
          this.userName,
          this.birthday,
          this.type
        )
        .subscribe(data => {
          var dataJson = JSON.stringify(data);

          if (data.valid === "emailFalse") {
            alert("user email already exist, create new one");
          } else if (data.valid === "usernameFalse") {
            alert("user name already exist, create new one");
          } else if (data.valid === "bothFalse") {
            alert("Both user name and email already exist, create new one");
          } else {
            var dataJson = JSON.stringify(data);
            this.router.navigateByUrl("/users");
          }
        });
    }
  }
}
