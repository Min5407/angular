import { Component, OnInit } from "@angular/core";
import { DataService } from "../../services/data.service";
import { Route, Router, Data } from "@angular/router";
@Component({
  selector: "app-create-channel",
  templateUrl: "./create-channel.component.html",
  styleUrls: ["./create-channel.component.css"]
})
export class CreateChannelComponent implements OnInit {
  channelName;
  group;
  constructor(private router: Router, private dataservice: DataService) {}

  ngOnInit() {
    this.group = sessionStorage.getItem("currentGroup");
  }

  //create channel once clicked
  createChannel() {
    console.log(this.channelName);
    if (this.channelName == undefined) {
      alert("Wrtie down the channel Name");
    } else {
      this.dataservice
        .createChannel(this.channelName, this.group)
        .subscribe(data => {
          if (!data) {
            alert("same Channel name can not be created");
          } else {
            this.router.navigateByUrl("groups/channels");
          }
        });
    }
  }
}
