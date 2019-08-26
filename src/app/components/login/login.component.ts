import { Component, OnInit } from "@angular/core";
import { Route, Router, Data } from "@angular/router";
import { DataService } from "../../services/data.service";
import { HttpErrorResponse } from "@angular/common/http";

// import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  email: "";
  password: "";

  constructor(private router: Router, private dataservice: DataService) {}

  ngOnInit() {}

  itemClicked() {
    this.dataservice.logIn(this.email, this.password).subscribe(data => {
      console.log(data);
      if (data.valid === true) {
        var dataJson = JSON.stringify(data);
        sessionStorage.setItem("user", dataJson);
        this.router.navigateByUrl("/account");
      } else if (!data) {
        alert("wrong input!");
      }
    }),
      (error: HttpErrorResponse) => {
        alert("Error");
      };
  }
}
