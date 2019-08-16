import { Component, OnInit } from "@angular/core";
import { DataService } from "../../services/data.service";
import { Route, Router, Data } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"]
})
export class UsersComponent implements OnInit {
  users = [];
  super = false;
  group = false;
  profile;

  constructor(private router: Router, private dataservice: DataService) {}

  ngOnInit() {
    this.profile = JSON.parse(sessionStorage.getItem("user"));

    if (this.profile.type == "super") {
      this.super = true;
    } else {
      alert("Only for Super Admin");
      this.router.navigateByUrl("/account");
    }
    this.dataservice.getUsers().subscribe(data => {
      this.users = data;
    }),
      (error: HttpErrorResponse) => {
        alert("Error");
      };
  }
}
