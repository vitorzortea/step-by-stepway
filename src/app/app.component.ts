import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'step-by-stepway';

    private http = inject(HttpClient);
    test:Observable<{total:number,entrada:number,parcelas:any[]}>;

    constructor(){
      this.test = this.http
      .get<{total:number,entrada:number,parcelas:any[]}>('json/bd.json');
    }
    parcelas(parcelas:any[]){
      return parcelas.filter(e=>e.pago).reduce((a,b)=>a+b.valor, 0);
    }
    aPagar(dados:any){
      return dados.total - (dados.entrada+this.parcelas(dados.parcelas));
    }

}
