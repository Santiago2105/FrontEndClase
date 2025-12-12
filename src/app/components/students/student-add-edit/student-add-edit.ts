import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FacultyService } from '../../../services/faculty-service';
import { MajorService } from '../../../services/major-service';
import { StudentService } from '../../../services/student-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Faculty } from '../../../models/faculty';
import { MajorDTO } from '../../../models/majorDTO';
import { StudentDTO } from '../../../models/studentDTO';

@Component({
  selector: 'app-student-add-edit',
  standalone: false,
  templateUrl: './student-add-edit.html',
  styleUrl: './student-add-edit.css',
})
export class StudentAddEdit {


  crudForm!:FormGroup;
  studentId:number=0;
  faculties!:Faculty[];
  majors!:MajorDTO[];

  constructor(private facultyService:FacultyService, 
              private majorService: MajorService,
              private studentService:StudentService,
              private formBuilder: FormBuilder,
              private snack: MatSnackBar, private router: Router, private activatedRoute:ActivatedRoute){}

  ngOnInit(){
    this.CargarFormulario();
  }


  CargarFaculties() {
      this.facultyService.getAll().subscribe({
      next: (data:Faculty[])=>{
        this.faculties=data;                  
      },
      error: (err)=>{
          console.log(err);
      }      
    });  
  }

  CargarCarreras(event:any){
    const facultyId:number = event.value;
    this.majors=[];
    this.majorService.getByFacultyId(facultyId).subscribe({
      next: (data:MajorDTO[])=>{
        this.majors=data;                  
      },
      error: (err)=>{
          console.log(err);
      }      
    });  


  }



  CargarFormulario() {
  
    this.CargarFaculties();
  
    this.crudForm = this.formBuilder.group(
      {
        id:[""],
        name:["",[Validators.required, Validators.minLength(2)]],
        city:["",[Validators.required, Validators.minLength(2)]],
        credits:[""],
        majorId:[""],
        facultyId:[""]
      }
    );

    this.studentId = parseInt(this.activatedRoute.snapshot.params["id"]);

    if (this.studentId>0 && this.studentId!=undefined) {
      //Falta Cargar para Editar      
    }


  }

  Grabar(){

    const studentDTO:StudentDTO= {
      id:this.crudForm.get("id")?.value,
      name:this.crudForm.get("name")?.value,
      city:this.crudForm.get("city")?.value,
      credits:this.crudForm.get("credits")?.value,
      majorId:this.crudForm.get("majorId")?.value,
      majorName:""
    };


    if (studentDTO.id>0) {
      //Falta el editar
    } else {
        this.studentService.new(studentDTO).subscribe({
        next:(data:StudentDTO)=>{
          this.snack.open("Se agregó el estudiante facultad y se asignó el Id "+data.id.toString(),"OK",{duration:2000});
          this.router.navigate(["/student-list"]);
        },
            error: (http_error)=>{
                    this.snack.open("ERROR: No se agregó el registro solicitado. "+http_error.error.message,"OK",{duration:5000});
                    console.log(http_error);
        }  
      })
    }

    

  }


}


//Mantilla