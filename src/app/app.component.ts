import { Component } from '@angular/core';
import { Covid19Service } from './covid19.service';
import { Chart } from 'chart.js';  
// import { Data } from '../../app/Data';
// import { Servicepage } from '../servicepage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  // data: Data[];  
  userdetails:any;
  xaxes = ['aa', 'bb', 'cc', 'dd', 'ee', 'ff', 'gg'];  
  yaxes1 = [18, 34, 53, 56, 74, 80, 87];  
  yaxes2 = [11, 44, 43, 63, 63, 66, 78]; 
  yaxes3 = []; 
  yaxes4 = [];
  yaxes5 = [];
  yaxes6 = []; 
  Linechart: any;  
  constructor( private servicepageService : Covid19Service) { }

  ngOnInit() {
    this.getcovideTracker(); 
  } 
getcovideTracker = () => {
  this.servicepageService.getcovideTracker().subscribe(resp => {
    this.userdetails = resp;

    console.log((this.userdetails.data).length);
    console.log((this.userdetails.data[0].regional).length);

    for(let i = 0; i<(this.userdetails.data).length; i++) {
      for(let j = 0; j<(this.userdetails.data[i].regional).length; j++){
        if(this.userdetails.data[i].regional[j].loc == 'Delhi') {
          this.yaxes3[i] = this.userdetails.data[i].regional[j].totalConfirmed;
          this.yaxes5[i] = this.yaxes3[i]-this.userdetails.data[i].regional[j].deaths-
          this.userdetails.data[i].regional[j].discharged;
          console.log(this.yaxes5[i], 'gggggggggggg');
        }
      }
      console.log(this.yaxes3[i]);
      console.log(this.userdetails.data[i].regional[0].loc);
    }
    for(let k = 1; k<11; k++) {
      this.yaxes4[k] = this.yaxes3[this.yaxes3.length-k]; 
      this.yaxes6[k] = this.yaxes5[this.yaxes5.length-k]; 
      console.log(this.yaxes3[this.yaxes3.length-k]);
    } 
    this.chartracker(this.yaxes4.reverse(), this.yaxes6.reverse());
    console.log(this.yaxes3.length);
  })
}

chartracker = (a, b) => {
  this.Linechart = new Chart('canvas', {  
    type: 'line',  
    data: {  
      labels: this.xaxes,  
      datasets: [  
        {  
          data: a,  
          borderColor: 'red',  
          backgroundColor: '#ffffff', 
         
        },
        {  
          data: b,  
          borderColor: 'orange',  
          backgroundColor: '#ffffff', 
          
        }  
      ]  
    },  
    options: {  
      legend: {  
        display: false  
      },  
      scales: {  
        xAxes: [{  
          display: true  
        }],  
        yAxes: [{  
          display: true,
          position: "right", 
          type: "linear", 
        },
        {  
          display: true,
          position: "left",  
          type: "linear",
        }],  
      }
    }  
  }); 
}

}
