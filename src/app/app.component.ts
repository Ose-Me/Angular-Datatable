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
  displayData: any;
  filteredData: any;
  searchQuery: string;

  constructor(private appDataService: AppDataService) {
    this.appDataService
      .getData()
      .then((data: any) => {
        this.apiData = data;
        this.displayData = data.slice(0, 10);
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
      this.isLoading = true;
      setTimeout(() => {
        let newData = this.apiData.slice(
          this.displayData.length - 1,
          this.displayData.length + 9
        );

        this.displayData = [...this.displayData, ...newData];
        this.filteredData = this.displayData;
        this.isLoading = false;
      }, 3000);
    }
  }

  // filter data funtion
  filterData() {
    let newData = this.displayData.slice(0, this.displayData.length);
    let filteredData;

    if (this.searchQuery !== "") {
      filteredData = newData.filter((item) => {
        return (
          item.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          item.email.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          item.city.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          item.country.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      });
      console.log(this.filteredData);
    }

    if (this.searchQuery == "") {
      filteredData = newData;
    }

    this.filteredData = filteredData;
    console.log(this.filteredData, "here");
  }
}
