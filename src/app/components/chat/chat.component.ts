import { Component, OnInit } from "@angular/core";
import { DataService } from "../../services/data.service";
import { Route, Router, Data } from "@angular/router";

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
  joinedConnection: any;
  constructor(private dataservice: DataService, private router: Router, ) {
    // this.joinToConnection();
  }

  ngOnInit() {

    // this.initToConnection();


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
    // this.joinToConnection();
    this.initToConnection();





  }

  // private joinToConnection() {
  //   this.dataservice.initSocket();
  //   this.ioConnection = this.dataservice.joinedChat().subscribe((data) => {
  //     this.messages = data;
  //     console.log(this.messages);
  //     console.log("joined");

  //   })
  // }
  private initToConnection() {
    // this.dataservice.initSocket();
    this.joinedConnection = this.dataservice.joinedChat().subscribe((data) => {
      this.messages = data;
      console.log(this.messages);
      console.log("joined");

    })
    this.ioConnection = this.dataservice
      .onMessage()
      .subscribe((data) => {
        this.messages = data;
        console.log(data);
        // console.log("send")
      });

    this.ioConnection = this.dataservice.left().subscribe((data) => {
      this.messages = data;
    })
  }
  // private joined() {
  //   console.log("jo");
  //   this.dataservice.initSocket();
  //   this.ioConnection = this.dataservice
  //     .joinedChat()
  //     .subscribe((data) => {
  //       this.messages.push(data);
  //       console.log(data);
  //       console.log("data");
  //     });
  // }



  //checks and add member to the channel after receiving data from the server
  leaveChat() {
    this.dataservice.leave({ member: this.profile.username, channel: this.selectChannel, group: this.groupName });
    this.router.navigateByUrl("groups/channels");


  }
  sendMessage() {
    // this.dataservice.sendMessage({ channel: this.selectChannel, member: this.profile.username, message: this.messageText });
    if (this.messageText) {
      this.dataservice.send({ message: this.messageText, member: this.profile.username, channel: this.selectChannel, group: this.groupName });
      this.messageText = null;
    } else {
      console.log("no message");
    }
  }

  // addMember() {


  //   if (this.selectChannel == undefined) {
  //     alert("Choose the channel");
  //   } else if (this.selectUser == undefined) {
  //     alert("choose the member");
  //   } else {

  //     this.dataservice
  //       .channelInvite(this.groupName, this.selectChannel, this.selectUser)
  //       .subscribe(data => {

  //         if (!data) {
  //           alert("user already exstis");
  //         }
  //         // else {
  //         //   this.dataservice.joinChat({ member: this.selectUser, channel: this.selectChannel })

  //         // }
  //       });



  //   }
  // }
}
