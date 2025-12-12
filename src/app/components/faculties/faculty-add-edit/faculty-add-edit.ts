import { Component } from '@angular/core';
import { FacultyService } from '../../../services/faculty-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Faculty } from '../../../models/faculty';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-faculty-add-edit',
  standalone: false,
  templateUrl: './faculty-add-edit.html',
  styleUrl: './faculty-add-edit.css',
})
export class FacultyAddEdit {

  crudForm!:FormGroup;
  facultyId:number=0;

  rutaLogo:string="";
  base64logo:any=null;
  fileLogo:any=null;
  
  constructor(private facultyService:FacultyService, private formBuilder: FormBuilder,
              private snack: MatSnackBar, private router: Router, private activatedRoute:ActivatedRoute){}

  ngOnInit(){
    this.CargarFormulario();
  }

  CargarFormulario() {
    this.crudForm = this.formBuilder.group(
      {
        id:[""],
        name:["",[Validators.required, Validators.minLength(2)]],
        director:["",[Validators.required, Validators.minLength(2)]],
        active:[""],
        foundationDate:[""],
      }
    );

    this.facultyId = parseInt(this.activatedRoute.snapshot.params["id"]);

    if (this.facultyId>0 && this.facultyId!=undefined) {

        this.facultyService.getById(this.facultyId).subscribe({
            next:(data:Faculty)=>{
              this.crudForm.get("id")?.setValue(data.id);
              this.crudForm.get("name")?.setValue(data.name);
              this.crudForm.get("director")?.setValue(data.director);
              this.crudForm.get("active")?.setValue(data.active);
              this.crudForm.get("foundationDate")?.setValue(data.foundationDate+"T00:00:00");
              this.base64logo = "data:image/jpeg;base64,"+data.logo;
            }
        })

    }


  }

  Grabar(){

    if (this.crudForm.valid) {


      const faculty:Faculty= {
          id:this.crudForm.get("id")?.value,
          name:this.crudForm.get("name")?.value,
          director:this.crudForm.get("director")?.value,
          active:this.crudForm.get("active")?.value,
          foundationDate:this.crudForm.get("foundationDate")?.value,
          logo:null
        };


        if (faculty.id>0) {
          this.facultyService.edit(faculty).subscribe({
              next:(data:Faculty)=>{


                
                //Si todo sale bien antes de terminar voy a actualizar el logo de esta Faculty que se acaba de editar
                 if (this.fileLogo!=null) {
                      this.facultyId = data.id;
                      this.GrabarLogo();
                  }
                this.snack.open("Se actualizó la facultad con el Id "+data.id.toString(),"OK",{duration:2000});
                this.router.navigate(["/faculty-list"]);
              },
                error: (http_error)=>{
                        this.snack.open("ERROR: No se actualizó el registro solicitado. "+http_error.error.message,"OK",{duration:5000});
                        console.log(http_error);
              }  
          })
        } else {
            this.facultyService.new(faculty).subscribe({
            next:(data:Faculty)=>{

              //Si todo sale bien antes de terminar voy a actualizar el logo de esta Faculty que se acaba de crear
              if (this.fileLogo!=null) {
                  this.facultyId = data.id;
                  this.GrabarLogo();
              }
             

              this.snack.open("Se agregó la facultad y se asignó el Id "+data.id.toString(),"OK",{duration:2000});
              this.router.navigate(["/faculty-list"]);
            },
                error: (http_error)=>{
                        this.snack.open("ERROR: No se agregó el registro solicitado. "+http_error.error.message,"OK",{duration:5000});
                        console.log(http_error);
            }  
          })
        }
    } else {
      this.crudForm.markAllAsTouched();
    }

  }


  GrabarLogo(){
      
    const logoFormData = new FormData();
    logoFormData.append("logo", this.fileLogo,this.rutaLogo);
    this.facultyService.updateLogo(this.facultyId, logoFormData).subscribe({
      next:()=>{
      },
       error: (http_error)=>{
                        this.snack.open("ERROR: No se actualizó el logo solicitado. "+http_error.error.message,"OK",{duration:5000});
                        console.log(http_error);
       } 
    });
  }

  actualizaLogo(event:any){
    this.fileLogo =   event.target.files[0];
    if (this.fileLogo) {
      this.rutaLogo = this.fileLogo.name;
      const reader = new FileReader();
      reader.readAsDataURL(this.fileLogo);
      reader.onload = () => {
        this.base64logo = reader.result as string;
      }
    }

  }

}
