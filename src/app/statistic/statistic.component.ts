import { Component, OnInit } from "@angular/core";
import { ChartType, ChartOptions, ChartDataSets } from "chart.js";
import {
  SingleDataSet,
  Label,
  monkeyPatchChartJsLegend,
  monkeyPatchChartJsTooltip,
  Color,
  MultiDataSet
} from "ng2-charts";
import { PostService } from "src/services/post.service";
import { AuthService } from "src/services/auth.service";
@Component({
  selector: "app-statistic",
  templateUrl: "./statistic.component.html",
  styleUrls: ["./statistic.component.css"]
})
export class StatisticComponent implements OnInit {
  arr: Array<any> = [];
  doughnutChartLabels: Label[] = ["BMW", "Ford", "Tesla"];
  doughnutChartData: MultiDataSet = [[55, 25, 20]];
  doughnutChartType: ChartType = "doughnut";

  barChartOptions: ChartOptions = {
    responsive: true
  };
  barChartLabels: Label[] = [
    "Талархал",
    "Ирсэн",
    "Харсан",
    "Цуцлагдсан",
    "Баталгаажаагүй",
    "Баталгаажсан"
  ];
  barChartType: ChartType = "bar";
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    { data: [0, 0, 0, 0, 0, 0], label: "" },
    { data: [0, 0, 0, 0, 0, 0], label: "" },
    { data: [0, 0, 0, 0, 0, 0], label: "" },
    { data: [0, 0, 0, 0, 0, 0], label: "" },
    { data: [0, 0, 0, 0, 0, 0], label: "" }
  ];
  barChartColors: Color[] = [
    // {
    //   borderColor: "white",
    //   backgroundColor: [
    //     "rgb(255, 202, 90)"
    //   ]
    // }
  ];

  pieChartOptions: ChartOptions = {
    responsive: true
  };
  pieChartLabels: Label[] = [
    ["Талархал"],
    ["Ирсэн"],
    ["Харсан"],
    ["Цуцлагдсан"],
    ["Баталгаажаагүй"],
    "Баталгаажсан"
  ];
  pieChartData: SingleDataSet = [0, 0, 0, 0, 0, 0];
  pieChartType: ChartType = "pie";
  pieChartLegend = true;
  pieChartPlugins = [];
  pieChartColors: Color[] = [
    {
      borderColor: "white",
      backgroundColor: [
        "rgb(255, 202, 90)",
        "rgb(100, 208, 218)",
        "rgb(52, 178, 228)",
        "rgb(228, 72, 86)",
        "rgb(6, 83, 129)",
        "rgb(254, 145, 42)"
      ]
    }
  ];
  type: string = "";

  constructor(private postService: PostService, private auth: AuthService) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();

    this.type = this.auth.getUser.type;
    // if (this.type == "B") {
    // } else {
    this.postService.getC(this.auth.getUser.own_code).subscribe(res => {
      this.pieChartData[0] = res.thanks;
      this.pieChartData[1] = res.sent;
      this.pieChartData[2] = res.seen;
      this.pieChartData[3] = res.reject;
      this.pieChartData[4] = res.pending;
      this.pieChartData[5] = res.done;
    });
    this.postService.getB1(this.auth.getUser.own_code).subscribe(res => {
      this.arr.push(Object.keys(res));
      // console.log("------------->", this.arr[0][0]);
      for (let i = 0; i < 6; i++) {
        this.barChartData[i].label = this.arr[0][i];
        this.barChartData[i].data[0] = res[this.arr[0][i]].thanks;
        this.barChartData[i].data[1] = res[this.arr[0][i]].sent;
        this.barChartData[i].data[2] = res[this.arr[0][i]].seen;
        this.barChartData[i].data[3] = res[this.arr[0][i]].reject;
        this.barChartData[i].data[4] = res[this.arr[0][i]].pending;
        this.barChartData[i].data[5] = res[this.arr[0][i]].done;
      }
    });
  }

  ngOnInit() {}
}
