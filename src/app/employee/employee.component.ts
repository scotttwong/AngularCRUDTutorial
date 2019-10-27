import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Employee } from '../employee';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  dataSaved = false;
  employeeForm: any;
  allEmployees: Observable<Employee[]>;
  employeeIdUpdate = null;
  message = null;

  constructor(
    private employeeService: EmployeeService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.employeeForm = this.formBuilder.group({
      EmpName: ['', [Validators.required]],
      DateOfBirth: ['', [Validators.required]],
      EmailId: ['', [Validators.required]],
      Gender: ['', [Validators.required]],
      Address: ['', [Validators.required]],
      PinCode: ['', [Validators.required]]
    });
    this.loadAllEmployees();
  }

  loadAllEmployees() {
    this.allEmployees = this.employeeService.getAllEmployee();
  }

  onFormSubmit() {
    this.dataSaved = false;
    const employee = this.employeeForm.value;
    this.createEmployee(employee);
    this.employeeForm.reset();
  }

  createEmployee(employee: Employee) {
    if (this.employeeIdUpdate == null) {
      this.employeeService.createEmployee(employee).subscribe(() => {
        this.dataSaved = true;
        this.message = 'Employee created successfully';
        this.loadAllEmployees();
        this.employeeIdUpdate = null;
        this.employeeForm.reset();
      })
    }
    else {
      employee.EmpId = this.employeeIdUpdate;
      this.employeeService.updateEmployee(employee).subscribe(() => {
        this.dataSaved = true;
        this.message = 'Employee updated successfully';
        this.loadAllEmployees();
        this.employeeIdUpdate = null;
        this.employeeForm.reset();
      });
    }
  }

  resetForm() {
    this.employeeForm.reset();
    this.message = null;
    this.dataSaved = false;
  }

  loadEmployeeToEdit(employeeId: number) {
    this.employeeService.getEmployeeById(employeeId).subscribe(employee => {
      this.message = null;
      this.dataSaved = false;
      this.employeeIdUpdate = employee.EmpId;
      this.employeeForm.controls['EmpName'].setValue(employee.EmpName);
      this.employeeForm.controls['DateOfBirth'].setValue(employee.DateOfBirth);
      this.employeeForm.controls['EmailId'].setValue(employee.EmailId);
      this.employeeForm.controls['Gender'].setValue(employee.Gender);
      this.employeeForm.controls['Address'].setValue(employee.Address);
      this.employeeForm.controls['PinCode'].setValue(employee.PinCode);
    })
  }

  deleteEmployee(employeeId: number) {
    if (confirm("Are you sure you wnat to delete Employee Detail?")) {
      this.employeeService.deleteEmployee(employeeId).subscribe(() => {
        this.dataSaved = true;
        this.message = 'Employee successfully deleted';
        this.loadAllEmployees();
        this.employeeIdUpdate = null;
        this.employeeForm.reset();
      })
    }    
  }
}
