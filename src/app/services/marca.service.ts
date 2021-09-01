import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Marca } from '../interfaces/Marca';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {

  private baseUrl: string = environment.baseUrl
  constructor(private http: HttpClient) { }

  getMarcas(){
    return this.http.get(`${this.baseUrl}/marca`);
  }

  getMarca(id: string){
    return this.http.get(`${this.baseUrl}/marca/${id}`);
  }

  deleteMarca(id: string){
    return this.http.delete(`${this.baseUrl}/marca/${id}`);
}

  saveMarca(marca: Marca):Observable<any>{

    return this.http.post<Marca>(`${this.baseUrl}/marca`, marca).pipe(
      tap(resp =>{
        if(resp.ok){
          console.log('Categoria Guardado')
        }
      }),
      map(resp => resp.ok),
      catchError(err => {
        if(err.error?.msg){
          return of(err.error.msg)
        }
        if(err.error.errors.mar_nombre?.msg){
          return of(err.error.errors.mar_nombre.msg)
        }
        return of('Hable con el Administrador') 
      })
    );
  }

  updateMarca(id: string|number, updatedMarca: Marca): Observable<any> {
    return this.http.put<Marca>(`${this.baseUrl}/marca/${updatedMarca.id_marca}`, updatedMarca).pipe(
      tap(resp => {
        if(resp.ok){
          console.log("se guardo")
        }
      }),
      map(resp => resp.ok),
      catchError(err =>{
        if(err.error?.msg){
          return of(err.error.msg)
        }
        if(err.error.errors.mar_nombre?.msg){
          return of(err.error.errors.mar_nombre.msg)
        }
        return of('Hable con el Administrador') 
      })
    );
  }
}
