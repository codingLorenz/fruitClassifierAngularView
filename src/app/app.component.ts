import { Component, OnInit } from "@angular/core";
import { Chart } from "chart.js";
import { FruitServiceService } from "./fruit-service.service";
import { FormsModule } from "@angular/forms";
import { FormGroup, NgForm } from "@angular/forms";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  title = "Obst Erkennung";
  picture: File;
  jsonresponse: string;
  predictions: [][];
  BarChart = [];

  constructor(
    private fruitService: FruitServiceService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {}

  onSubmit(data: any) {
    const formData = new FormData();
    formData.append("file", this.picture);
    this.fruitService.analyze(formData).subscribe((x) => {
      this.predictions = x.predictions;
      this.drawChart(this.predictions);
      // 0 = apple
      // 1 = banane
      // 2 strawberry
      // 01 = prbability
    });
  }
  imgChange(event) {
    this.picture = event.target.files[0];
  }

  drawChart(predictions) {
    console.log("predictions array" + predictions);
    this.BarChart = new Chart("barChart", {
      type: "bar",
      data: {
        labels: [predictions[0][0], predictions[1][0], predictions[2][0]],
        datasets: [
          {
            label: "Wahrscheinlichkeiten",
            data: [predictions[0][1], predictions[1][1], predictions[2][1]],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
            ],
            borderColor: [
              "rgba(255,99,132,1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        title: {
          text: "Bar Chart",
          display: true,
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });
  }

  getSafePicture() {
    if (this.picture != null) {
      return this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(this.picture));
    }
  }
}
