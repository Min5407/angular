import { Component, ElementRef, OnInit } from "@angular/core";
import { DataService } from "../../services/data.service";
import { Route, Router, Data } from "@angular/router";

import { HttpErrorResponse } from "@angular/common/http";
@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  email: "";
  password: "";
  userName: "";
  birthday: Date;
  age: number;
  super = false;
  type: "";
  valid: boolean;
  selectedFile = null;
  profile;
  imagePath = "";
  imageName: string;

  constructor(
    private router: Router,
    private dataservice: DataService,
    private elementRef: ElementRef
  ) { }

  ngOnInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor =
      "#fff";

    this.profile = JSON.parse(sessionStorage.getItem("user"));

    if (this.profile.type == "normal") {
      alert("Only for Super/Group Admin");
      this.router.navigateByUrl("/account");
    } else if (this.profile.type == "group assis") {
      alert("Only for Super/Group Admin");
      this.router.navigateByUrl("/account");
    }
  }

  // uploads the image file
  onUpload() {
    const fd = new FormData();
    fd.append('image', this.selectedFile, this.selectedFile.name);
    console.log(fd)
    this.dataservice.imgUpload(fd).subscribe(res => {
      this.imagePath = res.data.filename;
      console.log(res.data.filename + " " + res.data.size)
    })
  }

  //selects the image when user clicks the image
  onFileSelected(event) {
    this.imageName = event.target.files[0].name;
    this.selectedFile = event.target.files[0];
  }
  // create User
  createUser() {
    if (this.email === undefined || this.email == "") {
      alert("email must not be blank");
      return;
    } else if (this.userName === undefined || this.userName == "") {
      alert("userName must not be blank");
      return;
    } else if (this.password === undefined || this.password == "") {
      alert("password must not be blank");
      return;
    } else if (this.type === undefined || this.type == "") {
      alert("type must not be blank");
      return;
    } else if (this.birthday === undefined) {
      alert("birthday must not be blank");
      return;
    } else if ((this.age = undefined)) {
      alert("age must not be blank");
      return;
    } else {
      this.dataservice
        .register(
          this.email,
          this.password,
          this.userName,
          this.birthday,
          this.type,
          this.imageName
        )
        .subscribe(data => {
          // console.log(data);
          // var dataJson = JSON.stringify(data);
          // console.log(data);
          // if (data.valid === "emailFalse") {
          //   alert("user email already exist, create new one");
          // } else if (data.valid === "usernameFalse") {
          //   alert("user name already exist, create new one");
          // } else if (data.valid === "bothFalse") {
          //   alert("Both user name and email already exist, create new one");
          // } else {
          //   // var dataJson = JSON.stringify(data);
          //   this.router.navigateByUrl("/users");
          // }
          if (!data) {
            alert("UserName Exist")
          } else {


            this.router.navigateByUrl("/users");

          }


        });
    }
  }
}
