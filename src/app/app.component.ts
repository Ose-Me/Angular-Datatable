import { Component, OnInit, HostListener } from "@angular/core";
import { AppDataService } from "./services/app-data.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  title = "angular-datable";
  isLoading: boolean = true;
  apiData: any;
  infiniteScollData: any;
  filteredData: any;
  searchQuery: string;

  constructor(private appDataService: AppDataService) {
    this.appDataService
      .getData()
      .then((data: any) => {
        this.apiData = data;
        this.filteredData = data.slice(0, 10);
        this.isLoading = false;
      })
      .catch((error) => {
        console.log(error);
        this.isLoading = false;
      });
  }
  ngOnInit() {}

  // add infinite scroll functionality
  @HostListener("window:scroll", ["$event"]) onScrollEvent($event) {
    if (
      window.innerHeight + window.pageYOffset >=
      document.body.offsetHeight - 10
    ) {
      if (this.isLoading || this.filteredData.length === this.apiData.length) {
        return;
      }
      console.log("bottom");
      this.isLoading = true;
      setTimeout(() => {
        let newData = this.apiData.slice(
          this.filteredData.length - 1,
          this.filteredData.length + 9
        );

        this.filteredData = [...this.filteredData, ...newData];
        console.log(this.filteredData);
        this.isLoading = false;
      }, 3000);
    }
  }

  // filter data funtion
  filterData() {
    let newData = this.filteredData.slice(0, this.filteredData.length);
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
            .every((v: any) => item.email.toLowerCase().includes(v)) ||
          this.searchQuery
            .toLowerCase()
            .split(" ")
            .every((v: any) => item.city.toLowerCase().includes(v)) ||
          this.searchQuery
            .toLowerCase()
            .split(" ")
            .every((v: any) => item.country.toLowerCase().includes(v))
        );
      });
      this.filteredData = newData;
    }

    if (this.searchQuery == "") {
      this.filteredData = this.apiData;
    }
  }
}
