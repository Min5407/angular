import {
  Component,
  OnInit,
  ElementRef,
  Output,
  EventEmitter
} from "@angular/core";
import { DataService } from "../../services/data.service";
import { Route, Router, Data } from "@angular/router";

@Component({
  selector: "app-channels",
  templateUrl: "./channels.component.html",
  styleUrls: ["./channels.component.css"]
})
export class ChannelsComponent implements OnInit {
  @Output() click = new EventEmitter();
  constructor(
    private elementRef: ElementRef,
    private router: Router,
    private dataservice: DataService
  ) { }

  profile;
  userChannels = [];
  selectUser;
  selectChannel;
  users;
  groupName;
  groupAssis;
  valid;
  ngOnInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor =
      "#fff";
    this.click.emit();
    let groupName = sessionStorage.getItem("currentGroup");
    this.profile = JSON.parse(sessionStorage.getItem("user"));
    console.log(this.profile.type);
    this.groupName = groupName;

    this.groupAssis = sessionStorage.getItem("assis");

    this.dataservice.getChannels(this.groupName).subscribe(data => {
      this.users = data.members;

      this.userChannels = data.channels;
    });
  }
  //change object into array
  toArray(members: object) {
    return Object.keys(members).map(key => members[key]);
  }

  viewChat(channel) {
    let currentGroup = sessionStorage.getItem("currentGroup");
    console.log(currentGroup)
    let chat = { group: currentGroup, channel: channel }
    var dataJson = JSON.stringify(chat);
    sessionStorage.setItem("chat", dataJson);
    this.router.navigateByUrl("groups/channels/chat");
  }


  //delete  channel
  deleteChannel(channel) {
    this.dataservice.deleteChannel(this.groupName, channel).subscribe(data => {
      this.userChannels = data;
    });
  }

  //delete member from the channel
  deleteChannelMember(member, channel) {
    this.dataservice
      .deleteChannelMember(this.groupName, channel, member)
      .subscribe(data => {
        this.userChannels = data;
      });
  }
}
