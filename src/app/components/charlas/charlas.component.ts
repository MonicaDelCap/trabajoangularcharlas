import { Component, OnInit } from '@angular/core';
import { Charla } from '../../models/charla';
import { ServiceUser } from '../../services/service.user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-charlas',
  templateUrl: './charlas.component.html',
  styleUrls: ['./charlas.component.css']
})
export class CharlasComponent implements OnInit {
  public charlas: Charla[] = []; // Todas las charlas
  public filteredCharlas: Charla[] = []; // Charlas filtradas
  public searchText: string = ''; // Término de búsqueda

  constructor(
    private _service: ServiceUser,
    private _router:Router
  ) {}

  ngOnInit(): void {
    if (!localStorage.getItem('authToken')) {
      this._router.navigate(["/"])
    }
    this._service.getCharlasCurso().then(charlas => {
      this.charlas = charlas;
      this.filteredCharlas = charlas;
    })
  }

  filterCharlas() {
    const searchTextLower = this.searchText.toLowerCase();
    
    // Filtramos las charlas basándonos en el título que contiene el texto ingresado
    this.filteredCharlas = this.charlas.filter(charla =>
      charla.titulo.toLowerCase().includes(searchTextLower)
    );
  }
}
