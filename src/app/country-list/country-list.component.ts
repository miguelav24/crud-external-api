import { Component, OnDestroy, OnInit } from '@angular/core';
import { Country } from '../core/models/country';
import { CountryListService } from '../shared/country-list.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-country-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './country-list.component.html',
  styleUrl: './country-list.component.scss',
})
export class CountryListComponent implements OnInit, OnDestroy {
  private getCountriesSubscription: Subscription = new Subscription();
  country: Country = {
    area: 0,
    name: '',
    capital: '',
  };
  selectedCountry: Country = {
    area: 0,
    name: '',
    capital: '',
  };
  countryList: Country[] = [];
  showUpdateButton: boolean = false;
  errorMessage: string = '';

  constructor(private countryListService: CountryListService) {}

  ngOnInit(): void {
    this.getCountries();
  }

  resetCountry(): void {
    this.country = {
      area: 0,
      name: '',
      capital: '',
    };
  }

  getCountries(): void {
    this.getCountriesSubscription = this.countryListService
      .getCountries()
      .subscribe({
        next: (data) => {
          this.countryList = data;
        },
        error: (error) => {
          console.log('getCountries', error);
          this.errorMessage = error.message;
        },
      });
  }

  addCountry(): void {
    /* this.countryListService.addCountry(this.country).subscribe(
      (data) => {
        console.log(data);
      },
      (err) => {
        console.log(err);
      }
    ); */
    this.countryList.push(this.country);
    this.resetCountry();
  }

  editCountry(area: number): void {
    this.country = this.countryList
      .map((item: Country) => {
        return {
          area: item.area,
          name: item.name,
          capital: item.capital,
        };
      })
      .find((country) => country.area === area) as Country;

    this.showUpdateButton = true;
  }

  updateCountry(): void {
    /* this.countryListService.updateCountry(this.country).subscribe(
      (data) => {
        console.log(data);
      },
      (err) => {
        console.log(err);
      },
      () => {
        this.showUpdateButton = false;
      }
    ); */

    const index = this.countryList.findIndex(
      (country) => country.area === this.country.area
    );

    this.countryList[index] = this.country;

    this.resetCountry();
    this.showUpdateButton = false;
  }

  deleteCountry(area: number): void {
    /* this.countryListService.deleteCountry(countryId).subscribe(
      (data) => {
        console.log(data);
      },
      (err) => {
        console.log(err);
      }
    ); */
    this.countryList = this.countryList.filter(
      (country) => area !== country.area
    );
  }

  ngOnDestroy(): void {
    // Desuscribirse para evitar posibles fugas de memoria
    this.getCountriesSubscription.unsubscribe();
  }
}
