import { Component, Input, OnInit } from '@angular/core';
import Chart, { ChartDataset, Colors } from 'chart.js/auto';
import { CData } from '../Data';
import { HttpClient } from "@angular/common/http";


@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})

export class ChartsComponent implements OnInit {
  public chart: any;
  public dataArray: Array<CData> = [];
  public monthsArray: Array<string> = [];
  public valuesCountry: Array<DatasetObj> = []

  constructor(private http: HttpClient) {
    this.http.get('assets/formatted_data.csv', { responseType: 'text' })
      .subscribe(
        data => {
          let csvToRowArray = data.split("\n");
          for (let index = 1; index < csvToRowArray.length - 1; index++) {
            let row = csvToRowArray[index].split(",");
            this.dataArray.push(new CData(parseInt(row[0]), row[1], row[2], parseInt(row[3])));
            // this.monthsArray.indexOf(row[2]) === -1 ? this.monthsArray.push(row[2]) : console.log("This item already exists");

            if (this.monthsArray.indexOf(row[2]) === -1) {
              this.monthsArray.push(row[2])
              if (this.valuesCountry.find(o => o.label === row[1])) {
                console.log(row[1] + ' exists')
                this.valuesCountry.find(o => o.label === row[1])?.data.push(Number.parseInt(row[3]))

              } else {
                console.log(row[1] + ' not exists')
                this.valuesCountry.push(new DatasetObj(row[1], [Number.parseInt(row[3])], "blue"));
              }



            } else {
              console.log("This item already exists");
              if (this.valuesCountry.find(o => o.label === row[1])) {
                console.log(row[1] + ' exists')
                this.valuesCountry.find(o => o.label === row[1])?.data.push(Number.parseInt(row[3]))
              } else {
                console.log(row[1] + ' not exists')
                this.valuesCountry.push(new DatasetObj(row[1], [Number.parseInt(row[3])], "blue"));
              }
            }
          }

          console.log(this.monthsArray.length)
          this.createChart(this.monthsArray);
        },
        error => {
          console.log(error);
        }
      );


  }

  ngOnInit(): void {
    // this.createChart(this.monthsArray);

    console.log(this.chart)


    console.log('hhh');



  }



  createChart(months: string[]) {



    this.chart = new Chart("MyChart", {
      type: 'line', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: months,
        datasets: [{
          label: 'KSA',
          data: [100, 222, 11],
          backgroundColor: 'blue'
        }]
      },
      options: {
        aspectRatio: 2.5,
        plugins: {
          legend: {
              display: true,
              position: 'bottom',
              maxHeight: 700,
              labels: {
                  
                  color: 'rgb(255, 99, 132)',
                  font: {
                    size: 8
                  }
              }
          }
      }
      }

    });

    console.log(this.valuesCountry)
    this.updateChart()
  }

  updateChart() {
    this.chart.data.datasets = this.valuesCountry; // Would update the first dataset's value of 'March' to be 50
    this.chart.update();
  }

}

export class DatasetObj {
  label: String;
  data: number[];
  background: String;

  constructor(label: String, data: number[], background: string) {
    this.label = label,
      this.data = data,
      this.background = background
  }
}
