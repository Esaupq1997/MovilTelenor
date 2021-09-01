import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Medida } from '../interfaces/Medida';

@Injectable({
  providedIn: 'root'
})
export class UnidadMedidaService {

  private baseUrl: string = environment.baseUrl
  constructor(private http: HttpClient) { }

  getMedidas(){
    return this.http.get(`${this.baseUrl}/medida`);
  }

  getMedida(id: string){
    return this.http.get(`${this.baseUrl}/medida/${id}`);
  }

  deleteMedida(id: string){
    return this.http.delete(`${this.baseUrl}/medida/${id}`);
}

  saveMedida(medida: Medida):Observable<any>{

    return this.http.post<Medida>(`${this.baseUrl}/medida`, medida).pipe(
      tap(resp =>{
        if(resp.ok){
          console.log('Unidad de Medida Guardado')
        }
      }),
      map(resp => resp.ok),
      catchError(err => {
        if(err.error?.msg){
          return of(err.error.msg)
        }
        if(err.error.errors.med_unidad?.msg){
          return of(err.error.errors.med_unidad.msg)
        }
        return of('Hable con el Administrador') 
      })
    );;
  }

  updateMedida(id: string|number, updatedMedida: Medida): Observable<any> {
    return this.http.put<Medida>(`${this.baseUrl}/medida/${updatedMedida.id_medida}`, updatedMedida).pipe(
      tap(resp =>{
        if(resp.ok){
          console.log('Perfil Actualizado')
        }
      }),
      map(resp => resp.ok),
      catchError(err => {
        if(err.error?.msg){
          return of(err.error.msg)
        }
        if(err.error.errors.med_unidad?.msg){
          return of(err.error.errors.med_unidad.msg)
        }
        return of('Hable con el Administrador')
      })
    );
  }
}
