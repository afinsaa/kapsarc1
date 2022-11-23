import { Component, OnInit } from '@angular/core';
import { CData } from '../Data'
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {
  displayedColumns: string[] = ['Country', 'Month-Year', 'Value'];
  public dataArray: Array<CData> = [];
  public monthsArray: String[] = [];
  

  constructor(private http: HttpClient){
    this.http.get('assets/formatted_data.csv', {responseType: 'text'})
    .subscribe(
        data => {
            let csvToRowArray = data.split("\n");
            for (let index = 1; index < csvToRowArray.length - 1; index++) {
              let row = csvToRowArray[index].split(",");
              this.dataArray.push(new CData( parseInt( row[0]), row[1], row[2], parseInt(row[3])));
            }
            
            console.log(this.monthsArray.length)
        },
        error => {
            console.log(error);
        }
    );
  }

  // country: CData = {
  //   id: 1,
  //   country: 'KSA',
  //   month: 'Jul-91',
  //   value: 10000
  // }

  
  ngOnInit(): void {
    
  }

  

}
