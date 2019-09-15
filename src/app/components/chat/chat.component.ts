import { Component, OnInit } from "@angular/core";
import { DataService } from "../../services/data.service";

@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.css"]
})
export class ChatComponent implements OnInit {
  profile;
  userChannels = [];
  selectUser;
  selectChannel;
  users;
  groupName;
  groupAssis;
  valid;

  chat;
  channelUsers;
  messageText: string;
  messages = [];
  ioConnection: any;
  constructor(private dataservice: DataService) {
    // this.dataservice.joinedChat().subscribe(data => {
    //   console.log(data);
    //   this.message = "hi";
    //   this.messages.push(data);
    // })
    // this.dataservice.initSocket();
    // this.dataservice.messageReceived().subscribe(data => {
    //   this.messages = data;
    // })
  }

  ngOnInit() {



    this.profile = JSON.parse(sessionStorage.getItem("user"));
    let groupName = sessionStorage.getItem("currentGroup");
    this.groupName = groupName;

    this.groupAssis = sessionStorage.getItem("assis");

    this.dataservice.getChannels(this.groupName).subscribe(data => {
      this.users = data.members;

      this.userChannels = data.channels;
      this.chat = JSON.parse(sessionStorage.getItem("chat"));

      this.selectChannel = this.chat.channel;
      this.dataservice.getChannelUsers(this.chat).subscribe(data => {
        this.channelUsers = data
      })
    })


    // this.dataservice.joinedChat().subscribe(data => {
    //   this.messages.push(data);
    //   console.log(this.messages)
    // });


    this.initToConnection();
  }

  private initToConnection() {
    this.dataservice.initSocket();
    this.ioConnection = this.dataservice
      .onMessage()
      .subscribe((data) => {
        this.messages.push(data);
      });
  }

  //checks and add member to the channel after receiving data from the server

  sendMessage() {
    // this.dataservice.sendMessage({ channel: this.selectChannel, member: this.profile.username, message: this.messageText });
    if (this.messageText) {
      this.dataservice.send({ message: this.messageText, member: this.profile.username });
      this.messageText = null;
    } else {
      console.log("no message");
    }
  }

  addMember() {

    // let Mdata = { group: this.groupName, channel: this.selectChannel, member: this.selectUser, }
    // console.log(Mdata);
    // this.dataservice.joinChat(Mdata)
    if (this.selectChannel == undefined) {
      alert("Choose the channel");
    } else if (this.selectUser == undefined) {
      alert("choose the member");
    } else {

      this.dataservice
        .channelInvite(this.groupName, this.selectChannel, this.selectUser)
        .subscribe(data => {

          if (!data) {
            alert("user already exstis");
          } else {
            let Mdata = { group: this.groupName, channel: this.selectChannel, member: this.selectUser, }
            this.dataservice.joinChat(Mdata)
            this.userChannels = data;
          }
        });



    }
  }
}
