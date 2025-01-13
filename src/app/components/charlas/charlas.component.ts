import { Component, OnInit } from '@angular/core';
import { Charla } from '../../models/charla';
import { ServiceUser } from '../../services/service.user';

@Component({
  selector: 'app-charlas',
  templateUrl: './charlas.component.html',
  styleUrls: ['./charlas.component.css']
})
export class CharlasComponent implements OnInit {
  public charlas: Charla[] = []; // Todas las charlas
  public filteredCharlas: Charla[] = []; // Charlas filtradas
  public searchText: string = ''; // Término de búsqueda

  constructor(private _service: ServiceUser) {}

  ngOnInit(): void {
    this._service.getCharlasCurso().then(charlas => {
      this.charlas = charlas;
      this.filteredCharlas = charlas;
    }).catch(error => {
      console.error('Error al obtener las charlas', error);
    });
  }

  filterCharlas() {
    const searchTextLower = this.searchText.toLowerCase();
    
    // Filtramos las charlas basándonos en el título que contiene el texto ingresado
    this.filteredCharlas = this.charlas.filter(charla =>
      charla.titulo.toLowerCase().includes(searchTextLower)
    );
  }
}
