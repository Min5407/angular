import { Component, OnInit, AfterViewInit } from "@angular/core";
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
  updatedUsers = [];
  email = "";
  profile;
  userType;

  constructor(private router: Router, private dataservice: DataService) {}

  ngOnInit() {
    this.profile = JSON.parse(sessionStorage.getItem("user"));
    this.userType = false;
    if (this.profile.type == "super") {
      this.userType = true;
    }

    if (this.profile.type == "normal") {
      alert("Only for Super/Group Admin");
      this.router.navigateByUrl("/account");
    } else if (this.profile.type == "group assis") {
      alert("Only for Super/Group Admin");
      this.router.navigateByUrl("/account");
    }

    this.dataservice.getUsers().subscribe(data => {
      this.users = data;
    }),
      (error: HttpErrorResponse) => {
        alert("Error");
      };
  }
  ngAfterViewInit() {}

  //delete user if clicked
  deleteUser(email: string) {
    this.dataservice.deleteUser(email).subscribe(data => {
      this.users = data;
    });
  }
}
