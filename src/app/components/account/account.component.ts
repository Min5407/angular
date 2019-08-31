import { Component, ElementRef, OnInit } from "@angular/core";

@Component({
  selector: "app-account",
  templateUrl: "./account.component.html",
  styleUrls: ["./account.component.css"]
})
export class AccountComponent implements OnInit {
  data;

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor =
      "#ddd";

    if (typeof Storage !== "undefined") {
      this.data = JSON.parse(sessionStorage.getItem("user"));
    }
  }
}
