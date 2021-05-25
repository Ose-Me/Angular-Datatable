import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class AppDataService {
  constructor(private http: HttpClient) {}

  getData() {
    const url =
      "https://60a8e2a620a641001730664e.mockapi.io/api/sysserve_datatable";
    return this.http.get(url).toPromise();
  }
}
