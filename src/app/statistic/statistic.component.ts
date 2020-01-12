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
  arr2: Array<any> = [];
  arr3: Array<any> = [];
  // bar1
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
  // bar 2
  barChartOptions2: ChartOptions = {
    responsive: true
  };
  barChartLabels2: Label[] = [
    "Талархал",
    "Ирсэн",
    "Харсан",
    "Цуцлагдсан",
    "Баталгаажаагүй",
    "Баталгаажсан"
  ];
  barChartType2: ChartType = "bar";
  barChartLegend2 = true;
  barChartPlugins2 = [];

  barChartData2: ChartDataSets[] = [
    { data: [0, 0, 0, 0, 0, 0], label: "" },
    { data: [0, 0, 0, 0, 0, 0], label: "" }
  ];
  barChartColors2: Color[] = [
    // {
    //   borderColor: "white",
    //   backgroundColor: [
    //     "rgb(255, 202, 90)"
    //   ]
    // }
  ];

  // bar 3
  barChartOptions3: ChartOptions = {
    responsive: true
  };
  barChartLabels3: Label[] = [
    "Талархал",
    "Ирсэн",
    "Харсан",
    "Цуцлагдсан",
    "Баталгаажаагүй",
    "Баталгаажсан"
  ];
  barChartType3: ChartType = "bar";
  barChartLegend3 = true;
  barChartPlugins3 = [];

  barChartData3: ChartDataSets[] = [
    { data: [0, 0, 0, 0, 0, 0], label: "" },
    { data: [0, 0, 0, 0, 0, 0], label: "" },
    { data: [0, 0, 0, 0, 0, 0], label: "" }
  ];
  barChartColors3: Color[] = [
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
      // console.log("------------->", res);
      for (let i = 0; i < 7; i++) {
        this.barChartData[i].label = this.arr[0][i];
        this.barChartData[i].data[0] = res[this.arr[0][i]].thanks;
        this.barChartData[i].data[1] = res[this.arr[0][i]].sent;
        this.barChartData[i].data[2] = res[this.arr[0][i]].seen;
        this.barChartData[i].data[3] = res[this.arr[0][i]].reject;
        this.barChartData[i].data[4] = res[this.arr[0][i]].pending;
        this.barChartData[i].data[5] = res[this.arr[0][i]].done;
      }
    });

    this.postService.getB2(this.auth.getUser.own_code).subscribe(res => {
      this.arr2.push(Object.keys(res));
      for (let i = 0; i < 2; i++) {
        this.barChartData2[i].label = this.arr2[0][i];
        this.barChartData2[i].data[0] = res[this.arr2[0][i]].thanks;
        this.barChartData2[i].data[1] = res[this.arr2[0][i]].sent;
        this.barChartData2[i].data[2] = res[this.arr2[0][i]].seen;
        this.barChartData2[i].data[3] = res[this.arr2[0][i]].reject;
        this.barChartData2[i].data[4] = res[this.arr2[0][i]].pending;
        this.barChartData2[i].data[5] = res[this.arr2[0][i]].done;
      }
    });
    this.postService.getA().subscribe(res => {
      this.arr3.push(Object.keys(res));
      for (let i = 0; i < 3; i++) {
        this.barChartData3[i].label = this.arr3[0][i];
        this.barChartData3[i].data[0] = res[this.arr3[0][i]].thanks;
        this.barChartData3[i].data[1] = res[this.arr3[0][i]].sent;
        this.barChartData3[i].data[2] = res[this.arr3[0][i]].seen;
        this.barChartData3[i].data[3] = res[this.arr3[0][i]].reject;
        this.barChartData3[i].data[4] = res[this.arr3[0][i]].pending;
        this.barChartData3[i].data[5] = res[this.arr3[0][i]].done;
      }
    });
  }

  ngOnInit() {}
}
