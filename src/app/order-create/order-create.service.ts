import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Models } from '../models/models-model';
import { Series } from '../models/series-model';
import { Accessory } from '../models/accessory-model';
import { Colors } from '../models/colors-model';
import { OrderHeader } from '../models/orderheader-model';


@Injectable({
  providedIn: 'root'
})
export class OrderCreateService {
  private seriesModelurl = "http://localhost:8083/series&model";
  private accessoryUrl = "http://localhost:8080/accessory/getAccessories";
  private colorsUrl = "http://localhost:8081/colors/getColors";
  private orderMgmtUrl="http://localhost:8082/order/saveOrder";


  constructor(private http: HttpClient) {

  }
  getSeries(): Observable<Series[]> {
    return this.http.get<Series[]>(this.seriesModelurl + "/getSeries");
  }

  getModelBasedOnSeries(series: Series): Observable<Models[]> {
    return this.http.post<Models[]>(this.seriesModelurl + "/getModel", series);

  }
  getAccessoryBasedOnMoldes(model: Models): Observable<Accessory[]> {
    console.log(model);
    return this.http.post<Accessory[]>(this.accessoryUrl, model);
  }

  getColorsBasedOnModels(model: Models): Observable<Colors[]> {
    return this.http.post<Colors[]>(this.colorsUrl, model);
  }

  saveOrders(order:OrderHeader):Observable<OrderHeader> {
       return this.http.post<OrderHeader>(this.orderMgmtUrl,order);
  }
}
