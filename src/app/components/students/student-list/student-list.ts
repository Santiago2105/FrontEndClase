import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { StudentDTO } from '../../../models/studentDTO';
import { StudentService } from '../../../services/student-service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteConfirmation } from '../../confirmations/delete-confirmation/delete-confirmation';

@Component({
  selector: 'app-student-list',
  standalone: false,
  templateUrl: './student-list.html',
  styleUrl: './student-list.css',
})
export class StudentList {


  dsStudents=new MatTableDataSource<StudentDTO>();
  displayedColumns:string[]=['id','name','city','credits','majorName','opciones'];


  constructor(private studentService:StudentService, private dialog: MatDialog, private snack: MatSnackBar){}

  ngOnInit(){
    this.CargarLista();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dsStudents.filter = filterValue.trim().toLowerCase();
  }

  CargarLista(){

    this.studentService.getAll().subscribe({
      next: (data:StudentDTO[])=>{
        this.dsStudents=new MatTableDataSource(data);          
        
      },
      error: (err)=>{
          console.log(err);
      }      
    });  
  }

  
  Borrar(id:number){
    let dialogReference = this.dialog.open(DeleteConfirmation);

    dialogReference.afterClosed().subscribe(
      opcionSelecionada=>{

        if(opcionSelecionada) {
          this.studentService.deleteById(id).subscribe({
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
    );
    
  }



}
