import { Injectable } from '@angular/core';
import { Employee } from './employee';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  url = 'http://localhost:51286/Api/Employee';
  
  constructor(
    private http: HttpClient
  ) { }

  getAllEmployee(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.url + '/AllEmployeeDetails');
  }
  getEmployeeById(employeeId: number): Observable<Employee> {
    return this.http.get<Employee>(this.url + `/GetEmployeeDetailsById/${employeeId}`);
  }
  createEmployee(employee: Employee): Observable<Employee> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })};
    return this.http.post<Employee>(this.url + '/InsertEmployeeDetail',employee, httpOptions);
  }
  updateEmployee(employee: Employee): Observable<Employee> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
    return this.http.put<Employee>(this.url + '/UpdateEmployeeDetail',employee, httpOptions);
  }
  deleteEmployee(id: number): Observable<number> {
    return this.http.delete<number>(this.url + `/DeleteEmployeeDetail?id=${id}`);
  }
}
