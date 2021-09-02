import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { catchError, map, tap } from "rxjs/operators";
import { environment } from 'src/environments/environment';
import { AuthResponse, Usuario } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private _usuario!: Usuario;

  get usuario(){
    return { ...this._usuario };
  }

  constructor(private http: HttpClient) { }

  login(us_login: string, us_clave: string){

    const url = `${this.baseUrl}/auth`;
    const body = {us_login, us_clave};
    return this.http.post<AuthResponse>(url, body)
      .pipe(
        tap(resp =>{
          if(resp.ok){
            localStorage.setItem('token', resp.token!);
          }
        }),
        map(resp => resp.ok),
        catchError(err => of(err.error.msg))
      );

  }
  validarToken(): Observable<boolean>{
    const url = `${this.baseUrl}/auth/renew`;
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '');
    return this.http.get<AuthResponse>( url, {headers} )
      .pipe(
        map(resp =>{
          // console.log(resp.token);
          localStorage.setItem('token', resp.token!);
            this._usuario={
              
              uid: resp.uid!,
              name: resp.name!,
              surnames: resp.surnames!,
              email: resp.email!
            }
          return resp.ok;
        }),
        catchError(err => of(false) )
      );
  }
  logout(){
    localStorage.clear();
  }
}
