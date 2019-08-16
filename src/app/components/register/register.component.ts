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

  constructor(private router: Router, private dataservice: DataService) {}

  ngOnInit() {}

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
        console.log(data.email);
      });
  }
}
