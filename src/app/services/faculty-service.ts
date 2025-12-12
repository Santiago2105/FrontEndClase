import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Faculty } from '../models/faculty';
import { FacultySummaryDTO } from '../models/facultySummaryDTO';

@Injectable({
  providedIn: 'root'
})
export class FacultyService {
  
  ruta_servidor:string = "http://localhost:8080/upc";
  recurso:string="faculties";

  constructor(private http:HttpClient){}
  
  getSummaryList(){
    return this.http.get<FacultySummaryDTO[]>(this.ruta_servidor+"/"+this.recurso+"/"+"summary");
  }


  getAll(){
    return this.http.get<Faculty[]>(this.ruta_servidor+"/"+this.recurso);
  }

  getById(id: number){
    return this.http.get<Faculty>(this.ruta_servidor+"/"+this.recurso+"/"+id.toString());
  }

  deleteById(id: number){
    return this.http.delete(this.ruta_servidor+"/"+this.recurso+"/"+id.toString());
  }

  new(faculty: Faculty){
    return this.http.post<Faculty>(this.ruta_servidor+"/"+this.recurso,faculty);
  }

  edit(faculty: Faculty){
    return this.http.put<Faculty>(this.ruta_servidor+"/"+this.recurso,faculty);
  }

  updateLogo(id: number, logoFormData: FormData){
    return this.http.put<Faculty>(this.ruta_servidor+"/"+this.recurso+"/"+"logo"+"/"+id.toString(),logoFormData);
  }


}
