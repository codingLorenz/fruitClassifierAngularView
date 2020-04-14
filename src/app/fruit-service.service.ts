import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class FruitServiceService {
  httpOptions = {
    headers: new HttpHeaders({
      "Access-Control-Allow-Origin": '*',
      "Access-Control-Allow-Methods": 'DELETE, POST, GET, OPTIONS',
      "Access-Control-Allow-Headers": 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With'
    }),
  };
  constructor(private httpClient: HttpClient) {}

  analyze(data: any): Observable<any> {
    console.log("sending......................");
    console.log(data)
    return this.httpClient.post(
      'https://fruitclassifieryummy.herokuapp.com/analyze',
      data,
      this.httpOptions
    );
  }
}
