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
    this.profile = JSON.parse(sessionStorage.getItem("user"));
    if (this.profile == undefined) {
      this.router.navigateByUrl("/login");
    } else {
      this.dataservice.getGroups().subscribe(data => {
        this.groups = data;
        this.dataservice.getUsers().subscribe(data => {
          this.users = data;
        });
      });
    }
  }

  //delete Group
  deleteGroup(group: string) {
    this.dataservice.deleteGroup(group).subscribe(data => {
      this.groups = data;
    });
  }

  //delete Member
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

  //view channel, set sesstion storage and sending this data to channel component
  viewChannel(assis, group) {
    sessionStorage.setItem("currentGroup", group);
    sessionStorage.setItem("assis", assis);
    this.router.navigateByUrl("/groups/channels");
  }

  //add member to the group
  invite(group, inviteMember) {
    if (inviteMember == undefined) {
      alert("select a member");
    } else {
      this.dataservice.groupInvite(inviteMember, group).subscribe(data => {
        if (!data) {
          alert("user already exist");
        } else {
          this.groups = data;
        }
      });
    }
  }
}
