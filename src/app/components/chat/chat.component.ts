import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
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
  imagePath = "";
  imageName: string;
  selectedFile = null;
  uploadValid: boolean;
  @ViewChild('mydiv', { static: false }) myDiv: ElementRef;



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



  //gets the data back from server side whenever they leave or send message to the server side
  private initToConnection() {
    // this.dataservice.initSocket();
    this.joinedConnection = this.dataservice.joinedChat().subscribe((data) => {
      this.messages = data;
      console.log(this.messages);

    })
    this.ioConnection = this.dataservice
      .onMessage()
      .subscribe((data) => {
        this.messages = data;


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
    this.dataservice.leave({ member: this.profile.username, channel: this.selectChannel, group: this.groupName, image: this.profile.imageName });
    this.router.navigateByUrl("groups/channels");


  }
  //upload the image file 
  onUpload() {
    const fd = new FormData();
    fd.append('image', this.selectedFile, this.selectedFile.name);
    this.dataservice.imgUpload(fd).subscribe(res => {

      this.imagePath = res.data.filename;
      console.log(res.data.filename + " " + res.data.size)
    })
    // console.log(this.myDiv.nativeElement.innerHTML);




  }

  //selects the image 
  onFileSelected(event) {

    this.imageName = event.target.files[0].name;
    this.selectedFile = event.target.files[0];
    // event.target.value = null
    // Added this




  }

  //sends the message to the server side
  sendMessage() {
    // this.dataservice.sendMessage({ channel: this.selectChannel, member: this.profile.username, message: this.messageText });
    if (this.messageText || this.imageName) {
      this.dataservice.send({ message: this.messageText, member: this.profile.username, channel: this.selectChannel, group: this.groupName, image: this.profile.imageName, sendImage: this.imageName });
      this.messageText = null;
    } else {
      console.log("no message");
    }
  }


}
