import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Country } from '../core/models/country';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';

/* Cuando un servicio está decorado con providedIn: 'root', significa que este servicio será un servicio de nivel raíz y 
Angular lo proporcionará automáticamente en toda la aplicación. En este caso, no necesitas agregarlo explícitamente al array 
providers de un módulo */
@Injectable({
  providedIn: 'root',
})
export class CountryListService {
  private API = environment.apiUrl;
  constructor(private http: HttpClient) {}

  addCountry(country: Country): Observable<Country> {
    return this.http.post<Country>(this.API, country);
  }

  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(this.API).pipe(
      map((response: any) => {
        return response.map((country: any) => ({
          area: country.area,
          name: country.name.common,
          capital: country.capital?.join(''),
        }));
      })
    );
  }

  updateCountry(country: Country): Observable<void> {
    return this.http.put<void>(`${this.API}/${country.area}`, country);
  }

  deleteCountry(area: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/${area}`);
  }
}
