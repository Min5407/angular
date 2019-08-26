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

  createUser() {
    this.dataservice
      .register(
        this.email,
        this.password,
        this.userName,
        this.birthday,
        this.age
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
