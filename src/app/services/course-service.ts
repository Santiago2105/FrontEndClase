import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Faculty } from '../models/faculty';
import { Course } from '../models/course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  
  ruta_servidor:string = "http://localhost:8080/upc";
  recurso:string="courses";

  constructor(private http:HttpClient){}
  
  getAll(){
    return this.http.get<Course[]>(this.ruta_servidor+"/"+this.recurso);
  }

  getById(id: number){
    return this.http.get<Course>(this.ruta_servidor+"/"+this.recurso+"/"+id.toString());
  }

  deleteById(id: number){
    return this.http.delete(this.ruta_servidor+"/"+this.recurso+"/"+id.toString());
  }

  new(course: Course){
    return this.http.post<Course>(this.ruta_servidor+"/"+this.recurso,course);
  }

  edit(course: Course){
    return this.http.put<Course>(this.ruta_servidor+"/"+this.recurso,course);
  }


}
