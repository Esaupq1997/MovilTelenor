import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  paginas = [
    {
      titulo:'Inicio',
      url:'/menu/inicio',
      icono:'home-outline'
    },
    {
      titulo:'Productos',
      url:'/menu/list-producto',
      icono:'newspaper-outline'
    }
  ]
  constructor() { }

  ngOnInit() {
  }

}
