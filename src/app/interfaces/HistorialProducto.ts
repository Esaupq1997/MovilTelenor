export interface HistorialProducto{
    id_historial?: number;
    id_producto?: number;
    hist_modelo?: string;
    hist_descripcion?: string;
    hist_caracteristica?: string;
    hist_stock?: number;
    hist_imagen?: string;
    hist_activo?: string;
    hist_precioVenta?: number;
    hist_cambioTiempo?:string;
    hist_cantVenta?: number;
    hist_cantCompra?: number;
    fk_id_categoria?: string;
    fk_id_marca?: string;
    fk_id_medida?: string;
    fk_id_tipo?: string;
    fk_id_usuario?: string;
    ok?:boolean;
    msg?:string;
}