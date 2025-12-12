import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { FacultyList } from './components/faculties/faculty-list/faculty-list';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { MaterialModuleModule } from './modules/material-module/material-module-module';
import { DeleteConfirmation } from './components/confirmations/delete-confirmation/delete-confirmation';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FacultyAddEdit } from './components/faculties/faculty-add-edit/faculty-add-edit';
import { provideNativeDateAdapter } from '@angular/material/core';
import { StudentList } from './components/students/student-list/student-list';
import { StudentAddEdit } from './components/students/student-add-edit/student-add-edit';
import { Home } from './components/home/home';
import { Header } from './components/header/header';
import { StudentsCoursesAddEdit } from './components/students-courses/students-courses-add-edit/students-courses-add-edit';
import { Login } from './components/login/login';
import { autorizacionInterceptor } from './interceptors/autorizacion-interceptor';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FacultySummary } from './components/faculties/faculty-summary/faculty-summary';



@NgModule({
  declarations: [
    App,
    FacultyList,
    DeleteConfirmation,
    FacultyAddEdit,
    StudentList,
    StudentAddEdit,
    Home,
    Header,
    StudentsCoursesAddEdit,
    Login,
    FacultySummary
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModuleModule,
    FormsModule,
    ReactiveFormsModule,
    NgxChartsModule,
    BrowserAnimationsModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideNativeDateAdapter(),
    provideHttpClient(
      withInterceptors([autorizacionInterceptor])
    )
  ],
  bootstrap: [App]
})
export class AppModule { }
