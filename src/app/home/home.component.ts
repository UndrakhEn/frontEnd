import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  isCollapsed = false;
  loading = true;
  listData = new Array(5).fill({}).map((_i, index) => {
    return {
      title: `Undrax ${index + 1}`,
      avatar: "/assets/avatar2.jpg",
      created_date: `2019.12.1${index}`,
      content:
        "Манлайлагч багш хөгжлийн түлхүүр Бид МУБИС-ийн оюутнууд цуврал нэвтрүүлгийн 2 дахь дугаараа та бүхэнд хүргэж байна. МУБИС-МБУС-ийн 'Оюутны зөвлөл', IT STUDENTS клубын хамт олон болон нийт оюутан залуусынхаа өмнөөс 4-р ангийн бүх төгсөгчиддөө удахгүй болох Эрдмийн баяр-ын мэндийг дэвшүүлье! Эерэг хандлага хамтдаа хөгжье🤩  IT STUDENTS клубын тэргүүн Мэдээлэлзүйн 3-р ангын оюутан Ундрахдаа маш их баярлалаа😊",
      images: [
        "/assets/avatar3.jpg",
        "/assets/avatar3.jpg",
        "/assets/avatar3.jpg"
      ],
      like: index + 50,
      dislike: index + 23,
      comments: index + 2
    };
  });
  constructor() {}

  ngOnInit() {
    setTimeout(() => {
      this.loading = false;
    }, 1500);
  }
}
