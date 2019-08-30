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
  users;
  inviteMember;
  constructor(private router: Router, private dataservice: DataService) {}

  ngOnInit() {
    this.dataservice.getGroups().subscribe(data => {
      this.groups = data;
      this.dataservice.getUsers().subscribe(data => {
        this.users = data;
      });
      console.log(this.groups);
    });
    this.profile = JSON.parse(sessionStorage.getItem("user"));
  }

  deleteGroup(group: string) {
    this.dataservice.deleteGroup(group).subscribe(data => {
      this.groups = data;
    });
  }
  deleteMember(member: string, group: string) {
    this.dataservice.deleteMember(member, group).subscribe(data => {
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
  invite(group, inviteMember) {
    console.log(inviteMember, group);
    this.dataservice.groupInvite(inviteMember, group).subscribe(data => {
      console.log(data);
      if (!data) {
        alert("user already exist");
      } else {
        this.groups = data;
      }
    });
  }
}
