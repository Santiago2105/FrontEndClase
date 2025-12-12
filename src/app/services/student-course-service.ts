import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StudentCourseDTO } from '../models/studentCourseDTO';

@Injectable({
  providedIn: 'root'
})
export class StudentCourseService {
  ruta_servidor:string = "http://localhost:8080/upc";
  recurso:string="students_courses";

  constructor(private http:HttpClient){}
  
  getAll(){
    return this.http.get<StudentCourseDTO[]>(this.ruta_servidor+"/"+this.recurso);
  }

  getByStudentId(studentId: number){
    return this.http.get<StudentCourseDTO[]>(this.ruta_servidor+"/"+this.recurso+"/"+"student"+"/"+studentId.toString());
  }

  getById(id: number){
    return this.http.get<StudentCourseDTO>(this.ruta_servidor+"/"+this.recurso+"/"+id.toString());
  }

  deleteById(id: number){
    return this.http.delete(this.ruta_servidor+"/"+this.recurso+"/"+id.toString());
  }

  new(studentCourseDTO: StudentCourseDTO){
    return this.http.post<StudentCourseDTO>(this.ruta_servidor+"/"+this.recurso,studentCourseDTO);
  }

  edit(studentCourseDTO: StudentCourseDTO){
    return this.http.put<StudentCourseDTO>(this.ruta_servidor+"/"+this.recurso,studentCourseDTO);
  }


}
