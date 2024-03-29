import { Injectable } from '@angular/core';
import { User } from '../shared/user';
import { Observable, Subject, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../shared/apiResponse';
import { userResponse } from '../shared/userResponse';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  filteredUserId = new Subject<string>();

  getUsers(page: number): Observable<ApiResponse> {
    const apiUrl = `https://reqres.in/api/users?page=${page}`;
    return this.http.get<ApiResponse>(apiUrl);
  }

  getUserById(id: number): Observable<userResponse> {
    const apiUrl = `https://reqres.in/api/users/${id}`;
    return this.http.get<userResponse>(apiUrl);
  }

}
