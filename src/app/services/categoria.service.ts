import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Categoria} from '../interfaces/Categoria';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

     private baseUrl: string = environment.baseUrl
    constructor(private http: HttpClient) { }

    getCategorias(){
      return this.http.get(`${this.baseUrl}/categoria`);
    }

    getCategoria(id: string){
      return this.http.get(`${this.baseUrl}/categoria/${id}`);
    }

    deleteCategoria(id: string){
      return this.http.delete(`${this.baseUrl}/categoria/${id}`);
  }

    saveCategoria(categoria: Categoria):Observable<any>{

      return this.http.post<Categoria>(`${this.baseUrl}/categoria`, categoria).pipe(
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
          if(err.error.errors.cat_nombre?.msg){
            return of(err.error.errors.cat_nombre.msg)
          }
          return of('Hable con el Administrador') 
        })
      );
    }

    updateCategoria(id: string|number, updatedCategoria: Categoria): Observable<any> {
      return this.http.put<Categoria>(`${this.baseUrl}/categoria/${updatedCategoria.id_categoria}`, updatedCategoria).pipe(
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
          if(err.error.errors.cat_nombre?.msg){
            return of(err.error.errors.cat_nombre.msg)
          }
          return of('Hable con el Administrador') 
        })
      );
    }
}
