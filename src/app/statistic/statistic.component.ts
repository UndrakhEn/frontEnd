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
    responsive: true,
    scales: {
      xAxes: [
        {
          stacked: true
        }
      ],
      yAxes: [
        {
          stacked: true
        }
      ]
    }
  };
  barChartLabels: Label[] = [];
  barChartType: ChartType = "horizontalBar";
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    { data: [0, 0, 0, 0, 0, 0], stack: "Stack 0", label: "Талархал" },
    { data: [0, 0, 0, 0, 0, 0], stack: "Stack 1", label: "Ирсэн" },
    { data: [0, 0, 0, 0, 0, 0], stack: "Stack 1", label: "Харсан" },
    { data: [0, 0, 0, 0, 0, 0], stack: "Stack 1", label: "Цуцлагдсан" },
    { data: [0, 0, 0, 0, 0, 0], stack: "Stack 1", label: "Баталгаажаагүй" },
    { data: [0, 0, 0, 0, 0, 0], stack: "Stack 1", label: "Баталгаажсан" }
  ];
  barChartColors: Color[] = [];
  // bar 2
  barChartOptions2: ChartOptions = {
    responsive: true,
    scales: {
      xAxes: [
        {
          stacked: true
        }
      ],
      yAxes: [
        {
          stacked: true
        }
      ]
    }
  };
  barChartLabels2: Label[] = [];
  barChartType2: ChartType = "horizontalBar";
  barChartLegend2 = true;
  barChartPlugins2 = [];

  barChartData2: ChartDataSets[] = [
    { data: [0, 0, 0, 0, 0, 0], stack: "Stack 0", label: "Талархал" },
    { data: [0, 0, 0, 0, 0, 0], stack: "Stack 1", label: "Ирсэн" },
    { data: [0, 0, 0, 0, 0, 0], stack: "Stack 1", label: "Харсан" },
    { data: [0, 0, 0, 0, 0, 0], stack: "Stack 1", label: "Цуцлагдсан" },
    { data: [0, 0, 0, 0, 0, 0], stack: "Stack 1", label: "Баталгаажаагүй" },
    { data: [0, 0, 0, 0, 0, 0], stack: "Stack 1", label: "Баталгаажсан" }
  ];
  barChartColors2: Color[] = [];

  // bar 3
  barChartOptions3: ChartOptions = {
    responsive: true,
    scales: {
      xAxes: [
        {
          stacked: true
        }
      ],
      yAxes: [
        {
          stacked: true
        }
      ]
    }
  };
  barChartLabels3: Label[] = [];
  barChartType3: ChartType = "horizontalBar";
  barChartLegend3 = true;
  barChartPlugins3 = [];

  barChartData3: ChartDataSets[] = [
    { data: [0, 0, 0, 0, 0, 0], stack: "Stack 0", label: "Талархал" },
    { data: [0, 0, 0, 0, 0, 0], stack: "Stack 1", label: "Ирсэн" },
    { data: [0, 0, 0, 0, 0, 0], stack: "Stack 1", label: "Харсан" },
    { data: [0, 0, 0, 0, 0, 0], stack: "Stack 1", label: "Цуцлагдсан" },
    { data: [0, 0, 0, 0, 0, 0], stack: "Stack 1", label: "Баталгаажаагүй" },
    { data: [0, 0, 0, 0, 0, 0], stack: "Stack 1", label: "Баталгаажсан" }
  ];
  barChartColors3: Color[] = [];

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
      for (let i = 0; i < this.arr[0].length; i++) {
        this.barChartLabels[i] = this.arr[0][i];
        this.barChartData[0].data[i] = res[this.arr[0][i]].thanks;
        this.barChartData[1].data[i] = res[this.arr[0][i]].sent;
        this.barChartData[2].data[i] = res[this.arr[0][i]].seen;
        this.barChartData[3].data[i] = res[this.arr[0][i]].reject;
        this.barChartData[4].data[i] = res[this.arr[0][i]].pending;
        this.barChartData[5].data[i] = res[this.arr[0][i]].done;
      }
    });

    this.postService.getB2(this.auth.getUser.own_code).subscribe(res => {
      this.arr2.push(Object.keys(res));
      for (let i = 0; i < this.arr2[0].length; i++) {
        this.barChartLabels2[i] = this.arr2[0][i];
        this.barChartData2[0].data[i] = res[this.arr2[0][i]].thanks;
        this.barChartData2[1].data[i] = res[this.arr2[0][i]].sent;
        this.barChartData2[2].data[i] = res[this.arr2[0][i]].seen;
        this.barChartData2[3].data[i] = res[this.arr2[0][i]].reject;
        this.barChartData2[4].data[i] = res[this.arr2[0][i]].pending;
        this.barChartData2[5].data[i] = res[this.arr2[0][i]].done;
      }
    });
    this.postService.getA().subscribe(res => {
      this.arr3.push(Object.keys(res));
      for (let i = 0; i < this.arr3[0].length; i++) {
        this.barChartLabels3[i] = this.arr3[0][i];
        this.barChartData3[0].data[i] = res[this.arr3[0][i]].thanks;
        this.barChartData3[1].data[i] = res[this.arr3[0][i]].sent;
        this.barChartData3[2].data[i] = res[this.arr3[0][i]].seen;
        this.barChartData3[3].data[i] = res[this.arr3[0][i]].reject;
        this.barChartData3[4].data[i] = res[this.arr3[0][i]].pending;
        this.barChartData3[5].data[i] = res[this.arr3[0][i]].done;
      }
    });
  }

  ngOnInit() {}
}
