import { Component, OnInit, AfterViewInit } from "@angular/core";
import { DataService } from "../../services/data.service";
import { Route, Router, Data } from "@angular/router";
import { ChannelsComponent } from "../channels/channels.component";

@Component({
  selector: "app-groups",
  templateUrl: "./groups.component.html",
  styleUrls: ["./groups.component.css"]
})
export class GroupsComponent implements OnInit {
  groups;
  profile;
  valid;
  userGroups;

  constructor(private router: Router, private dataservice: DataService) {}

  ngOnInit() {
    this.valid = false;
    if (typeof Storage !== "undefined") {
      this.profile = JSON.parse(sessionStorage.getItem("user"));
      this.dataservice
        .logIn(this.profile.email, this.profile.password)
        .subscribe(data => {
          if (data.valid === true) {
            let dataJson = JSON.stringify(data);
            sessionStorage.setItem("user", dataJson);
            this.profile = JSON.parse(sessionStorage.getItem("user"));
            this.userGroups = this.profile.groups;
            this.dataservice.getGroups().subscribe(data => {
              let groups = [];

              data.forEach((dat, index) => {
                this.userGroups.forEach(userGroup => {
                  if (userGroup == dat.group) {
                    groups.push(data[index]);
                  }
                });
              });

              if (this.profile.type == "super") {
                this.groups = data;
              } else {
                this.groups = groups;
              }
            });
          }
        });
      if (this.profile.type == "super" || this.profile.type == "group") {
        this.valid = true;
      } else {
        this.valid = false;
      }
    }
  }

  deleteGroup(group: string) {
    this.dataservice.deleteGroup(group).subscribe(data => {
      this.groups = data;
    });
  }
  deleteMember(member: string) {
    this.dataservice.deleteMember(member).subscribe(data => {
      this.groups = data;
    });
  }

  // change object(memebers) into array
  // this function is used to do ngfor inside a ngfor
  toArray(members: object) {
    return Object.keys(members).map(key => members[key]);
  }
  viewChannel(group) {
    sessionStorage.setItem("currentGroup", group);
    this.router.navigateByUrl("/groups/channels");
  }
}
