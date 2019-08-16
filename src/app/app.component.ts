import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "assignment1";
  data;

  constructor(private router: Router) {}

  ngOnInIt() {}

  loginLink() {
    if (
      JSON.parse(sessionStorage.getItem("user")) == undefined ||
      JSON.parse(sessionStorage.getItem("user")) == null
    ) {
      this.router.navigateByUrl("/login");
    }
  }
  registerLink() {
    if (
      JSON.parse(sessionStorage.getItem("user")) !== undefined ||
      JSON.parse(sessionStorage.getItem("user")) !== null
    ) {
      this.router.navigateByUrl("/register");
    }
  }
  accountLink() {
    if (
      JSON.parse(sessionStorage.getItem("user")) != undefined ||
      JSON.parse(sessionStorage.getItem("user")) !== null
    ) {
      this.router.navigateByUrl("/account");
    } else {
      this.router.navigateByUrl("/login");
    }
  }
  usersLink() {
    if (
      JSON.parse(sessionStorage.getItem("user")) != undefined ||
      JSON.parse(sessionStorage.getItem("user")) !== null
    ) {
      this.router.navigateByUrl("/users");
    } else {
      this.router.navigateByUrl("/login");
    }
  }

  logOut() {
    if (typeof Storage !== "undefined") {
      sessionStorage.clear();
      this.router.navigateByUrl("/login");
    }
  }
}
