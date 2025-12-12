import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FacultyList } from './components/faculties/faculty-list/faculty-list';
import { FacultyAddEdit } from './components/faculties/faculty-add-edit/faculty-add-edit';
import { StudentList } from './components/students/student-list/student-list';
import { StudentAddEdit } from './components/students/student-add-edit/student-add-edit';
import { Home } from './components/home/home';
import { StudentsCoursesAddEdit } from './components/students-courses/students-courses-add-edit/students-courses-add-edit';
import { Login } from './components/login/login';
import { autorizarConsultaGuard } from './guards/autorizar-consulta-guard';
import { autorizarRegistroGuard } from './guards/autorizar-registro-guard';
import { FacultySummary } from './components/faculties/faculty-summary/faculty-summary';

const routes: Routes = [
  {path:"", component:Login},
  {path:"login", component:Login},
  {path:"home", component:Home},
  {path:"faculty-list", component:FacultyList, canActivate:[autorizarConsultaGuard]},
  {path:"faculty-summary", component:FacultySummary, canActivate:[autorizarConsultaGuard]},

  {path:"faculty-add", component:FacultyAddEdit, canActivate:[autorizarRegistroGuard]},
  {path:"faculty-edit/:id", component:FacultyAddEdit, canActivate:[autorizarRegistroGuard]},

  {path:"student-list", component:StudentList, canActivate:[autorizarConsultaGuard]},
  {path:"student-add", component:StudentAddEdit, canActivate:[autorizarRegistroGuard]},
  {path:"student-edit/:id", component:StudentAddEdit, canActivate:[autorizarRegistroGuard]},

  {path:"student-course-crud/:studentId", component:StudentsCoursesAddEdit, canActivate:[autorizarRegistroGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
