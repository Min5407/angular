import { Component, OnInit, AfterViewInit } from "@angular/core";
import { DataService } from "../../services/data.service";
import { Route, Router, Data } from "@angular/router";

@Component({
  selector: "app-groups",
  templateUrl: "./groups.component.html",
  styleUrls: ["./groups.component.css"]
})
export class GroupsComponent implements OnInit {
  groups;
  data;
  valid: Boolean = false;
  constructor(private router: Router, private dataservice: DataService) {}

  ngOnInit() {
    if (typeof Storage !== "undefined") {
      this.data = JSON.parse(sessionStorage.getItem("user"));
      console.log(this.data.type);
      if (this.data.type == "super" || this.data.type == "group") {
        this.valid = true;
      } else {
        this.valid = false;
      }
      console.log(this.valid);
    }

    this.dataservice.getGroups().subscribe(data => {
      this.groups = data;
    });
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
}
