import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'disciplinas',
    loadChildren: () => 
      import('./pages/disciplina/disciplina.module').then((m) => m.DisciplinaModule)
  },
   {
    path: 'professores',
    loadChildren: () => 
      import('./pages/professor/professor.module').then((m) => m.ProfessorModule)
  },
   {
    path: 'alunos',
    loadChildren: () => 
      import('./pages/alunos/aluno.module').then((m) => m.AlunoModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
