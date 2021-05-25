import { Component, OnInit } from "@angular/core";
import { AppDataService } from "./services/app-data.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  title = "angular-datable";
  apiData: any;
  filteredData: any;
  searchQuery: string;

  constructor(private appDataService: AppDataService) {
    this.appDataService
      .getData()
      .then((data: any) => {
        this.apiData = data;
        this.filteredData = data;
        // this.loading = false;
      })
      .catch((error) => {
        console.log(error);
        // this.loading = false;
      });
  }
  ngOnInit() {}

  filterData() {
    let newData = this.apiData.slice(0, this.apiData.length);
    if (this.searchQuery !== "") {
      newData = newData.filter((item) => {
        return (
          this.searchQuery
            .toLowerCase()
            .split(" ")
            .every((v: string) => item.name.toLowerCase().includes(v)) ||
          this.searchQuery
            .toLowerCase()
            .split(" ")
            .every((v: any) => item.city.toLowerCase().includes(v))
        );
      });
      this.filteredData = newData;
    }

    if (this.searchQuery == "") {
      this.filteredData = this.apiData;
    }
  }
}
