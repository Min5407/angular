import { Component, OnInit, ElementRef, AfterViewInit } from "@angular/core";
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

  constructor(
    private router: Router,
    private dataservice: DataService,
    private elementRef: ElementRef
  ) {}

  ngOnInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor =
      "#fff";

    this.profile = JSON.parse(sessionStorage.getItem("user"));
    this.userType = false;
    if (this.profile == undefined) {
      this.router.navigateByUrl("/login");
    } else {
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
  }
  ngAfterViewInit() {}

  //delete user if clicked
  deleteUser(email: string, type: string) {
    console.log(type);
    if (type !== "super") {
      this.dataservice.deleteUser(email).subscribe(data => {
        this.users = data;
      });
    } else {
      alert("Dont Delelte Me");
    }
  }

  //give super to user
  giveSuper(user) {
    if (user.type == "super") {
      alert("already type super");
    } else {
      this.dataservice.giveSuper(user).subscribe(data => {
        this.users = data;
      });
    }
  }
}
