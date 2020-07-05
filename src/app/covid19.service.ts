import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Covid19Service {

  constructor(private httpClient: HttpClient) { }

  getcovideTracker = () => {
    return this.httpClient.get(`https://api.rootnet.in/covid19-in/stats/history`);
  }
}
