import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDTO } from '../models/userDTO';
import { TokenDTO } from '../models/tokenDTO';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  ruta_servidor:string = "http://localhost:8080/upc";
  recurso:string="users";

  constructor(private http:HttpClient){}
  
  getAll(){
    return this.http.get<UserDTO[]>(this.ruta_servidor+"/"+this.recurso);
  }

  getById(id: number){
    return this.http.get<UserDTO>(this.ruta_servidor+"/"+this.recurso+"/"+id.toString());
  }

  deleteById(id: number){
    return this.http.delete(this.ruta_servidor+"/"+this.recurso+"/"+id.toString());
  }

  new(userDTO: UserDTO){
    return this.http.post<UserDTO>(this.ruta_servidor+"/"+this.recurso,userDTO);
  }

  edit(userDTO: UserDTO){
    return this.http.put<UserDTO>(this.ruta_servidor+"/"+this.recurso,userDTO);
  }

  login(userDTO: UserDTO){
    return this.http.post<TokenDTO>(this.ruta_servidor+"/"+this.recurso+"/"+"login",userDTO).pipe(
      tap( (data:TokenDTO) => {
            localStorage.setItem('jwtToken',data.jwtToken);
            localStorage.setItem('user_id',data.id.toString());
            localStorage.setItem('authorities',data.authorities);
          }
      )
    )
  }

  logout(){
    if(typeof localStorage !=="undefined"){
      localStorage.clear();
    }
  }

  isLogged(){
    return (this.getUserId()!=0);
  }

  getUserId(){
    if(typeof localStorage !=="undefined"){
      if(localStorage.getItem('user_id')!==null) {
        return parseInt(localStorage.getItem('user_id')!.toString());
      }      
    }
    return 0;
  }

  getAuthorities(){
    if(typeof localStorage !=="undefined"){
      if(localStorage.getItem('authorities')!==null) {
        return localStorage.getItem('authorities');
      }      
    }
    return "";
  }

  getToken(){
    if(typeof localStorage !=="undefined"){
      if(localStorage.getItem('jwtToken')!==null) {
        return localStorage.getItem('jwtToken');
      }      
    }
    return "";
  }

}

