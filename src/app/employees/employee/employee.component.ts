import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(public service: EmployeeService) { }

  submitted = false;

  departments = [
    {id: 1, value: 'Deparment #1'},
    {id: 2, value: 'Deparment #2'},
    {id: 3, value: 'Deparment #3'}
  ];

  ngOnInit(): void {
  }

  onClear() {
    this.service.form.reset();
    this.service.initializeFormGroup();
  }

  onSubmit() {
    if (this.service.form.valid) {
      //this.service.insertEmployee(this.service.form.value);
      // For Firebase
      //this.service.addEmployee(this.service.form.value);

      const data = {
        // Selective fields
        fullName: this.service.form.value.fullName,
        email: this.service.form.value.email
      };

      // For MySQL
      this.service.create(data).subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });

      this.service.form.reset();
      this.service.initializeFormGroup();
    }
  }

}
