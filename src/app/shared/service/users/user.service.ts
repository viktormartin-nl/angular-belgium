import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { url } from 'src/environments/environment';
import { environment } from 'src/environments/environment.prod';
import { User } from '../../interface/user.interface';
import { LoggedInUser } from '../../interface/logged-in-user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userUrl: string = `${url}/userInfo`;

  constructor(private http: HttpClient) { }

  get(): Observable<User[]> {
    return this.http.get<User[]>(this.userUrl);
  }

  register(user: User): Observable<User> {
    return this.http.post<User>(`${url}/register`, user);
  }

  login(user: User): Observable<any> {
    return this.http.post<User>(`${url}/login`, user);
  }

  getProfile(id: number): Observable<User> {
    return this.http.get<User>(`${url}/profile/${id}`);
  }

  postProfile(id: number, user: User): Observable<User> {
    return this.http.post<User>(`${url}/profile/${id}`, user);
  }

  fileUpload(id: number, formData: FormData): Observable<any> {
    return this.http.post<any>(`${url}/profile/photo/${id}`, formData);
  }
}
