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
  states = ['Delhi', 'Bihar', 'Haryana', 'Gujarat'];
  // data: Data[];  
  userdetails:any;
  xaxes = ['aa', 'bb', 'cc', 'dd', 'ee', 'ff', 'gg'];  
  yaxes1 = [18, 34, 53, 56, 74, 80, 87];  
  yaxes2 = [11, 44, 43, 63, 63, 66, 78]; 
  yaxes3 = []; 
  yaxes4 = [];
  yaxes5 = [];
  yaxes6 = []; 
  yaxes7 = [];
  yaxes8 = [];
  yaxes9: any;
  yaxes10: any;
  Linechart: any;  
  constructor( private servicepageService : Covid19Service) { }

  ngOnInit() {
    this.getcovideTracker(); 
  } 
getcovideTracker = () => {
  this.servicepageService.getcovideTracker().subscribe(resp => {
    this.userdetails = resp;
    this.yaxes9 = this.userdetails.data[(this.userdetails.data).length-1].summary.confirmedCasesIndian;
    this.yaxes10 = this.yaxes9 - this.userdetails.data[(this.userdetails.data).length-1].summary.discharged-this.userdetails.data[(this.userdetails.data).length-1].summary.deaths;
    for(let i = 0; i<(this.userdetails.data).length; i++) {
      for(let j = 0; j<(this.userdetails.data[i].regional).length; j++){
        if(this.userdetails.data[i].regional[j].loc == 'Delhi') {
          this.yaxes3[i] = this.userdetails.data[i].regional[j].totalConfirmed;
          this.yaxes7[i] = this.userdetails.data[i].day;
          this.yaxes5[i] = this.yaxes3[i]-this.userdetails.data[i].regional[j].deaths-
          this.userdetails.data[i].regional[j].discharged;
        }
      }
    }
    for(let k = 0; k<11; k++) {
      this.yaxes4[k] = this.yaxes3[this.yaxes3.length-k-1]; 
      this.yaxes6[k] = this.yaxes5[this.yaxes5.length-k-1]; 
      this.yaxes8[k] = this.yaxes7[this.yaxes7.length-k-1]
    } 
    this.chartracker(this.yaxes4.reverse(), this.yaxes6.reverse(), this.yaxes8.reverse(), 
    this.yaxes9, this.yaxes10);
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
  this.Linechart = new Chart('canvas', {  
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

onSelect(states) { 
  this.states = null;
  for (var i = 0; i < this.states.length; i++)
  {
    if (this.states[i] == states) {
      // this.states = this.states[i];
      // https://www.talkingdotnet.com/bind-select-dropdown-list-in-angular-js-2/
    }
  }
}

}
