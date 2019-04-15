import { Component, OnInit, ViewChild  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AgGridNg2 } from 'ag-grid-angular';

@Component({
  selector: 'app-ag-grid-test',
  templateUrl: './ag-grid-test.component.html',
  styleUrls: ['./ag-grid-test.component.scss']
})
export class AgGridTestComponent implements OnInit {

  apifootballKey: string = 'e7e4895a7755c8466a308674887ebfb4d4c7367af6ecc29207429679d705fae2';
  getCountriesURL: string = 'https://apifootball.com/api/?action=get_countries&APIkey='
  countriesSelected: any[];
  
  @ViewChild('agGridCountries') agGridCountries: AgGridNg2;
  
  columnDefs = [
      {headerName: 'Id Pais', field: 'country_id', sortable: true, filter: true },
      {headerName: 'Nombre Pais', field: 'country_name', sortable: true, filter: true, checkboxSelection: true },
  ];

  rowData : any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    // ag-grid way: mapeo directo a row data asincrono. Hay que indicarlo en el template
    this.rowData = this.http.get(this.getCountriesURL+this.apifootballKey);

    //old way
    //this.http.get(this.getCountriesURL+this.apifootballKey).subscribe(countries => this.rowData = countries)
  }

  getSelectedRows() {
    const selectedNodes = this.agGridCountries.api.getSelectedNodes();
    console.log(selectedNodes)
    this.countriesSelected = selectedNodes.map( node => node.data );
    console.log(this.countriesSelected)
    //const selectedDataStringPresentation = selectedData.map( node => node.make + ' ' + node.model).join(', ');
    //console.log(`Selected nodes: ${selectedDataStringPresentation}`);
  }

}
