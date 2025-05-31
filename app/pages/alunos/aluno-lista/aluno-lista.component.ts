import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlunoService } from '../aluno.service';

@Component({
  selector: 'app-aluno-lista',
  templateUrl: './aluno-lista.component.html',
  styleUrls: ['./aluno-lista.component.css']
})
export class AlunoListaComponent implements OnInit {
 alunos = [];
  
  constructor(
    private alunoService: AlunoService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.carregar();
  }

  carregar() {
  this.spinner.show();
  this.alunoService.listar()
    .then((obj) => {
      this.alunos = obj.reverse();
    })
    .catch((erro) => {
      console.error('Erro ao listar alunos:', erro);
    })
    .finally(() => {
    this.spinner.hide();
    });
}

}

