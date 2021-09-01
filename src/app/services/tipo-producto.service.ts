import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TipoProducto } from '../interfaces/TipoProducto';

@Injectable({
  providedIn: 'root'
})
export class TipoProductoService {

  private baseUrl: string = environment.baseUrl
  constructor(private http: HttpClient) { }

  getTipoProductos(){
    return this.http.get(`${this.baseUrl}/tipoProducto`);
  }

  getTipoProducto(id: string){
    return this.http.get(`${this.baseUrl}/tipoProducto/${id}`);
  }

  deleteTipoProducto(id: string){
    return this.http.delete(`${this.baseUrl}/tipoProducto/${id}`);
}

  saveTipoProducto(tipoProducto: TipoProducto){

    return this.http.post(`${this.baseUrl}/tipoProducto`, tipoProducto);
  }

  updatedTipoProducto(id: string|number, updatedTipoProducto: TipoProducto): Observable<TipoProducto> {
    return this.http.put(`${this.baseUrl}/tipoProducto/${id}`, updatedTipoProducto);
  }
}
