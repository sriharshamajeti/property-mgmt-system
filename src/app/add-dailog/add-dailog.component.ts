import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AddService } from '../services/add.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'

@Component({
  selector: 'app-add-dailog',
  templateUrl: './add-dailog.component.html',
  styleUrls: ['./add-dailog.component.scss']
})
export class AddDailogComponent implements OnInit {

  propertyFor = ["Buy", "Rent", "Commertial"];
  propertyForm !: FormGroup;
  actionBtn: String = "Save";
  constructor(
    private formBuilder : FormBuilder, 
    private add : AddService,
    @Inject(MAT_DIALOG_DATA) public editProperty : any,
    private dailogRef : MatDialogRef<AddDailogComponent>

  ) { }

  ngOnInit(): void {
    this.propertyForm = this.formBuilder.group({
      propertyName : ['', Validators.required],
      propertyType : ['', Validators.required],
      propertyFor : ['', Validators.required],
      propertyPrice : ['', Validators.required],
      propertyDesc : ['', Validators.required],
      date : ['', Validators.required]

    })

    if(this.editProperty) {
      this.actionBtn = "Update";
      this.propertyForm.controls['propertyName'].setValue(this.editProperty.propertyName);
      this.propertyForm.controls['propertyType'].setValue(this.editProperty.propertyType);
      this.propertyForm.controls['propertyFor'].setValue(this.editProperty.propertyFor);
      this.propertyForm.controls['propertyPrice'].setValue(this.editProperty.propertyPrice);
      this.propertyForm.controls['propertyDesc'].setValue(this.editProperty.propertyDesc);
      this.propertyForm.controls['date'].setValue(this.editProperty.date);
    }
  }
  addProperty() {
    if(!this.editProperty) {
      if(this.propertyForm.valid) {
        this.add.postProperty(this.propertyForm.value)
        .subscribe({
          next:(res)=>{
            alert("Property added successfully");
            this.propertyForm.reset();
            this.dailogRef.close('save');
          },
          error:()=>{
            alert("Error while adding Property")
          }
        })
      }
    } else {
      this.updateProperty();
    }
  }

  updateProperty() {
    this.add.putProperty(this.propertyForm.value, this.editProperty.id)
    .subscribe({
      next:(res)=>{
        alert("Property updated Successfully");
        this.propertyForm.reset();
        this.dailogRef.close('update');
      },
      error:()=>{
        alert("Error while updating Property")
      }
    })
  }

}
