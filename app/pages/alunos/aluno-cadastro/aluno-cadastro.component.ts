import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { ErrorHandlerService } from '../../core/errorHandler.service';
import { Aluno } from '../../core/models/aluno.model';
import { AlunoService } from '../aluno.service';


@Component({
  selector: 'app-aluno-cadastro',
  templateUrl: './aluno-cadastro.component.html',
  styleUrls: ['./aluno-cadastro.component.css'],
})
export class AlunoCadastroComponent implements OnInit {
  aluno = new Aluno(); // corrigido
  idaluno: number; // corrigido
  salvando: boolean = false;

  constructor(
   private alunoService: AlunoService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute,
    private title: Title,
    private spinner: NgxSpinnerService,
    private errorHandler: ErrorHandlerService
  ) {}

  ngOnInit() {
    this.idaluno = this.route.snapshot.params['id'];
    this.title.setTitle('Cadastro de aluno');

    if (this.idaluno) {
      this.spinner.show();
      this.carregar(this.idaluno);
    } else {
      this.aluno.status = true;
    }
  }

  get editando() {
    return Boolean(this.aluno.id);
  }

  carregar(id: number) {
    this.alunoService
      .buscarPorId(id)
      .then((obj) => {
        this.aluno = obj;
        this.atualizarTituloEdicao();
        this.spinner.hide();
      })
      .catch((erro) => {
        this.spinner.hide();
        this.errorHandler.handle(erro);
      });
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de aluno: ${this.aluno.id}`);
  }

  salvar(form: NgForm) {
    if (this.editando) {
      this.atualizar(form);
    } else {
      this.cadastro(form);
    }
  }

  cadastro(form: NgForm) {
    this.salvando = true;
    this.alunoService.adicionar(this.aluno).then((obj) => {
      this.messageService.add({
        severity: 'success',
        summary: 'Aluno',
        detail: 'Cadastrado com sucesso!',
      });
      this.salvando = false;
      this.router.navigate(['/alunos']);
    }) 
    .catch(erro => {
    this.salvando = false; 
    this.errorHandler.handle(erro);
    });
  }

  atualizar(form: NgForm) {
    this.salvando = true;
    this.alunoService
      .atualizar(this.aluno)
      .then((obj) => {
        this.aluno = obj;
        this.salvando = false;
        this.messageService.add({
          severity: 'info',
          summary: 'Aluno',
          detail: `${obj.nome}, alterado com sucesso`,
        });
        this.atualizarTituloEdicao();
        this.router.navigate(['/alunos']);
      })
      .catch((erro) => {
        this.salvando = false;
        this.errorHandler.handle(erro);
      });
  }
}
