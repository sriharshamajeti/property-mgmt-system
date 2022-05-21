import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AddDailogComponent } from './add-dailog/add-dailog.component';
import { AddService } from './services/add.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Property Management System';

  displayedColumns: string[] = ['propertyName', 'propertyType', 'propertyFor', 'propertyDesc', 'propertyPrice', 'date', 'action'];
  dataSource !: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(private dialog: MatDialog, private get : AddService) {

  }
  ngOnInit(): void {
    this.getPropertyList();
  }
  openDialog() {
    this.dialog.open(AddDailogComponent, {
      width:'30%'
    }).afterClosed().subscribe(val=>{
      if(val === 'save') {
        this.getPropertyList();
      }
    })
  }
  getPropertyList() {
    this.get.getProperty()
    .subscribe({
      next:(res)=>{
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error:(err)=>{
        alert("Error while fetching the Records!!");
      }
    })
  }

  editProperty(row : any) {
    this.dialog.open(AddDailogComponent,{
      width:'30%',
      data: row
    }).afterClosed().subscribe(val=>{
      if(val === 'update') {
        this.getPropertyList();
      }
    })
  }

  deleteProperty(id: number) {
    this.get.deleteProperty(id)
    .subscribe({
      next:(res)=>{
        alert("Property deleted Successfully");
        this.getPropertyList();
      },
      error:()=>{
        alert("Error while deleting Property")
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}


