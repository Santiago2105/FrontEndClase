import { Component } from '@angular/core';
import { FacultyService } from '../../../services/faculty-service';
import { Faculty } from '../../../models/faculty';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmation } from '../../confirmations/delete-confirmation/delete-confirmation';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-faculty-list',
  standalone: false,
  templateUrl: './faculty-list.html',
  styleUrl: './faculty-list.css',
})
export class FacultyList {

  dsFaculties=new MatTableDataSource<Faculty>();
  displayedColumns:string[]=['id','name','director','active','fundingDate','logo','opciones'];


  constructor(private facultyService:FacultyService, private dialog: MatDialog, private snack: MatSnackBar){}

  ngOnInit(){
    this.CargarLista();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dsFaculties.filter = filterValue.trim().toLowerCase();
  }

  CargarLista(){

    this.facultyService.getAll().subscribe({
      next: (data:Faculty[])=>{

        data.forEach( (faculty:Faculty) => {
          faculty.logo = "data:image/jpeg;base64,"+faculty.logo;
        }
        );

        this.dsFaculties=new MatTableDataSource(data);          
        
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
          this.facultyService.deleteById(id).subscribe({
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
