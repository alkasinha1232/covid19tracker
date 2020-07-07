import { Component } from '@angular/core';
import { Covid19Service } from './covid19.service';
import { Chart } from 'chart.js';  

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  states = ['Delhi', 'Bihar', 'Haryana', 'Gujarat'];
  activestate = 'Delhi';
  // data: Data[];  
  userdetails:any;
  // xaxes = ['aa', 'bb', 'cc', 'dd', 'ee', 'ff', 'gg'];  
  // yaxes1 = [18, 34, 53, 56, 74, 80, 87];  
  // yaxes2 = [11, 44, 43, 63, 63, 66, 78]; 
  totalConfirmed = []; 
  totalConfirmedNew = [];
  totalActive = [];
  totalActiveNew = []; 
  activedate = [];
  activedateNew = [];
  confirmedCasesIndian: any;
  activecaseIndia: any;
  covidGraph: any;  
  constructor( private servicepageService : Covid19Service) { }

  ngOnInit() {
    this.getcovideTracker(); 
  } 
  
getcovideTracker = () => {
  this.servicepageService.getcovideTracker().subscribe(resp => {
    this.userdetails = resp;
    this.confirmedCasesIndian = this.userdetails.data[(this.userdetails.data).length-1].summary.confirmedCasesIndian;
    this.activecaseIndia = this.confirmedCasesIndian - this.userdetails.data[(this.userdetails.data).length-1].summary.discharged-this.userdetails.data[(this.userdetails.data).length-1].summary.deaths;
    for(let i = 0; i<(this.userdetails.data).length; i++) {
      for(let j = 0; j<(this.userdetails.data[i].regional).length; j++){
        if(this.userdetails.data[i].regional[j].loc == this.activestate) {
          this.totalConfirmed[i] = this.userdetails.data[i].regional[j].totalConfirmed;
          this.activedate[i] = this.userdetails.data[i].day;
          this.totalActive[i] = this.totalConfirmed[i]-this.userdetails.data[i].regional[j].deaths-
          this.userdetails.data[i].regional[j].discharged;
        }
      }
    }
    for(let k = 0; k<11; k++) {
      this.totalConfirmedNew[k] = this.totalConfirmed[this.totalConfirmed.length-k-1]; 
      this.totalActiveNew[k] = this.totalActive[this.totalActive.length-k-1]; 
      this.activedateNew[k] = this.activedate[this.activedate.length-k-1]
    } 
    this.chartracker(this.totalConfirmedNew.reverse(), this.totalActiveNew.reverse(), this.activedateNew.reverse(), 
    this.confirmedCasesIndian, this.activecaseIndia);
  })
}

// chartracker = (a, b) => {
//   this.Linechart = new Chart('canvas', {  
//     type: 'line',  
//     data: {  
//       labels: this.xaxes,  
//       datasets: [  
//         {  
//           data: a,  
//           borderColor: 'red',  
//           backgroundColor: '#ffffff', 
         
//         },
//         {  
//           data: b,  
//           borderColor: 'orange',  
//           backgroundColor: '#ffffff', 
          
//         }  ,
//       ]  
//     },  
//     options: {  
//       legend: {  
//         display: false  
//       },  
//       scales: {  
//         xAxes: [{  
//           display: true  
//         }],  
//         yAxes: [{  
//           display: true,
//           position: "right", 
//           type: "linear", 
//         },
//         {  
//           display: true,
//           position: "left",  
//           type: "linear",
//         }],  
//       }
//     }  
//   }); 
// }

chartracker = (a, b, c, d, e) => {
  this.covidGraph = new Chart('canvas', {  
    type: 'line',  
    data: {  
      // labels: this.xaxes,  
      datasets: [  
        {  
          // data: [20, 50, 100, 75, 25, 0],
          data: a,
          label: d + '  Total Confirmed case ',
          yAxisID: 'left-y-axis',
          borderColor: 'red',  
          
        }  ,
        {
          // data: [111, 435, 823, 674, 788, 234],
          data: b,
            label: e + '  Total Active case',
            // This binds the dataset to the right y axis
            yAxisID: 'right-y-axis',
            borderColor: 'orange',  
            color: 'black'
        }
      ]  ,
      labels: c
    },  
    options: {   
      scales: {  
        xAxes: [{  
          scaleLabel: {
        display: true,
        labelString: '<---DATE--->'
      }
        }],  
        yAxes: [{  
            scaleLabel: {
          display: true,
          labelString: '<----Active cases--->'
        }, 
          id: 'left-y-axis',
          type: 'linear',
          position: 'left',
        },
        {  
          scaleLabel: {
            display: true,
            labelString: '<----Confirmed cases--->'
          }, 
          id: 'right-y-axis',
          type: 'linear',
          position: 'right'
        }],  
      }
    }  
  }); 
}

onSelect(statename) { 
  this.activestate = null;
  for (var i = 0; i < this.states.length; i++)
  {
    if (this.states[i] == statename) {
      this.activestate = this.states[i];
      this.getcovideTracker();
      // https://www.talkingdotnet.com/bind-select-dropdown-list-in-angular-js-2/
    }
  }
}

}
