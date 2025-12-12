import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MajorDTO } from '../models/majorDTO';

@Injectable({
  providedIn: 'root'
})
export class MajorService {
  
  ruta_servidor:string = "http://localhost:8080/upc";
  recurso:string="majors";

  constructor(private http:HttpClient){}
  
  getAll(){
    return this.http.get<MajorDTO[]>(this.ruta_servidor+"/"+this.recurso);
  }

  getById(id: number){
    return this.http.get<MajorDTO>(this.ruta_servidor+"/"+this.recurso+"/"+id.toString());
  }

  deleteById(id: number){
    return this.http.delete(this.ruta_servidor+"/"+this.recurso+"/"+id.toString());
  }

  new(majorDTO: MajorDTO){
    return this.http.post<MajorDTO>(this.ruta_servidor+"/"+this.recurso,majorDTO);
  }

  edit(majorDTO: MajorDTO){
    return this.http.put<MajorDTO>(this.ruta_servidor+"/"+this.recurso,majorDTO);
  }

  getByFacultyId(facultyId:number){
    return this.http.get<MajorDTO[]>(this.ruta_servidor+"/"+this.recurso+"/"+"faculty"+"/"+facultyId.toString());
  }

}
