import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AddService {

  constructor(private http: HttpClient) { }

  postProperty(data: any) {
    return this.http.post<any>("http://localhost:3000/propertyList/", data);
  }
  getProperty() {
    return this.http.get<any>("http://localhost:3000/propertyList/");
  }
  putProperty(data: any, id: number) {
    return this.http.put<any>("http://localhost:3000/propertyList/"+id, data);
  }
  deleteProperty(id: number) {
    return this.http.delete("http://localhost:3000/propertyList/"+id);
  }
}
