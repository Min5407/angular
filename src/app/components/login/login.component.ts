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
  username: "";
  password: "";

  constructor(private router: Router, private dataservice: DataService) { }

  ngOnInit() { }

  // this function is for login
  itemClicked() {
    this.dataservice.logIn(this.username, this.password).subscribe(data => {
      if (data.valid === true) {
        var dataJson = JSON.stringify(data);
        localStorage.setItem("user", dataJson);
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
