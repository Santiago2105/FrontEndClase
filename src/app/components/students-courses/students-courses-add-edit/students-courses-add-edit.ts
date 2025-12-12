import { Component } from '@angular/core';
import { CourseService } from '../../../services/course-service';
import { StudentService } from '../../../services/student-service';
import { FormBuilder, FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentCourseService } from '../../../services/student-course-service';
import { StudentDTO } from '../../../models/studentDTO';
import { Course } from '../../../models/course';
import { StudentCourseDTO } from '../../../models/studentCourseDTO';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-students-courses-add-edit',
  standalone: false,
  templateUrl: './students-courses-add-edit.html',
  styleUrl: './students-courses-add-edit.css',
})
export class StudentsCoursesAddEdit {
  
  studentId:number=0;
  studentDTO:StudentDTO={id:0,name:"",city:"",credits:0,majorId:0,majorName:""};
  crudForm!:FormGroup;
  courses!:Course[];
  dsStudentsCourses=new MatTableDataSource<StudentCourseDTO>();
  displayedColumns:string[]=['id','courseName','academicTerm','grade','opciones'];


  constructor(private courseService:CourseService, 
              private studentCourseService: StudentCourseService,
              private studentService:StudentService,
              private formBuilder: FormBuilder,
              private snack: MatSnackBar, private router: Router, private activatedRoute:ActivatedRoute){}

  
  ngOnInit(){
    this.CargarFormulario();
  }

  CargarEstudiante(){
    this.studentId = parseInt(this.activatedRoute.snapshot.params["studentId"]);
    if (this.studentId>0 && this.studentId!=undefined) {
      
      this.studentService.getById(this.studentId).subscribe({
        next:(data:StudentDTO)=>{
              this.studentDTO = data;
        },
        error: (http_error)=>{
                    this.snack.open("ERROR: No se encontró al estudiante. "+http_error.error.message,"OK",{duration:5000});
                    console.log(http_error);
        }  
      })

    }

  }


  CrearFormGroup(){
    this.crudForm = this.formBuilder.group(
      {
        courseId:[""],
        studentId:[""],
        academicTerm:[""],
        grade:[""]
      }
    );
  }


  CargaCursos() {
    this.courseService.getAll().subscribe({
      next:(data:Course[])=>{
        this.courses = data;
      },
        error: (http_error)=>{
                    this.snack.open("ERROR: No se encontraron los cursos. "+http_error.error.message,"OK",{duration:5000});
                    console.log(http_error);
        }  
    })  
  }

  CargarFormulario(){
    this.CargarEstudiante();
    this.CrearFormGroup();
    this.CargaCursos();
    this.CargarLista();
  }

  Grabar(){
    const studentCourseDTO:StudentCourseDTO={
      id:0,
      courseId:this.crudForm.get("courseId")?.value,
      courseName:"",
      studentId:this.studentId,
      studentName:"",
      academicTerm:this.crudForm.get("academicTerm")?.value,
      grade:this.crudForm.get("grade")?.value
    };

    this.studentCourseService.new(studentCourseDTO).subscribe({
      next:(data: StudentCourseDTO)=>{
            this.CargarLista();
      },
        error: (http_error)=>{
                    this.snack.open("ERROR: No se encontraron los cursos. "+http_error.error.message,"OK",{duration:5000});
                    console.log(http_error);
        }  

    })
  }

  CargarLista(){
    this.studentCourseService.getByStudentId(this.studentId).subscribe({
      next: (data:StudentCourseDTO[])=>{
        this.dsStudentsCourses=new MatTableDataSource(data);          
        
      },
        error: (http_error)=>{
                    this.snack.open("ERROR: No se encontraron los cursos del alumno. "+http_error.error.message,"OK",{duration:5000});
                    console.log(http_error);
        }     
    }); 
  }

  Borrar(id:number){
      

      this.studentCourseService.deleteById(id).subscribe({
            next:()=>{
                    this.snack.open("Se eliminó el registro solicitado","OK",{duration:2000});
                      this.CargarLista();
                    },
            error: (http_error)=>{
                    this.snack.open("ERROR: No se eliminó el registro solicitado. "+http_error.error.message,"OK",{duration:5000});
                    console.log(http_error);
            }           
      })
  }

}
