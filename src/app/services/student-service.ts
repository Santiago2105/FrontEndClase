import { Injectable } from '@angular/core';
import { StudentDTO } from '../models/studentDTO';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  
  ruta_servidor:string = "http://localhost:8080/upc";
  recurso:string="students";

  constructor(private http:HttpClient){}
  
  getAll(){
    return this.http.get<StudentDTO[]>(this.ruta_servidor+"/"+this.recurso);
  }

  getById(id: number){
    return this.http.get<StudentDTO>(this.ruta_servidor+"/"+this.recurso+"/"+id.toString());
  }

  deleteById(id: number){
    return this.http.delete(this.ruta_servidor+"/"+this.recurso+"/"+id.toString());
  }

  new(studentDTO: StudentDTO){
    return this.http.post<StudentDTO>(this.ruta_servidor+"/"+this.recurso,studentDTO);
  }

  edit(studentDTO: StudentDTO){
    return this.http.put<StudentDTO>(this.ruta_servidor+"/"+this.recurso,studentDTO);
  }
}
