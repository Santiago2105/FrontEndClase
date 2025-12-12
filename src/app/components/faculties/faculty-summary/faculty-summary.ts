import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FacultySummaryDTO } from '../../../models/facultySummaryDTO';
import { FacultyService } from '../../../services/faculty-service';
import { ChartPoint } from '../../../models/charPoint';

@Component({
  selector: 'app-faculty-summary',
  standalone: false,
  templateUrl: './faculty-summary.html',
  styleUrl: './faculty-summary.css',
})
export class FacultySummary {
 dsFaculties=new MatTableDataSource<FacultySummaryDTO>();
  displayedColumns:string[]=['id','name','majorCount'];
  resumenGraficoFacultades:ChartPoint[]=[];
  


  constructor(private facultyService:FacultyService){}

  ngOnInit(){
    this.CargarLista();
  }

  
    CargarLista(){
  
      this.facultyService.getSummaryList().subscribe({
        next: (data:FacultySummaryDTO[])=>{
                   

          this.dsFaculties=new MatTableDataSource(data);          
          
          data.forEach(facultySummary => {
            const nuevoChartPoint:ChartPoint={
                name:facultySummary.name,
                value:facultySummary.majorCount
            }
            this.resumenGraficoFacultades.push(nuevoChartPoint);
          } );

          console.log(this.resumenGraficoFacultades);
        },
        error: (err)=>{
            console.log(err);
        }      
      });  
    }
  
    
}
