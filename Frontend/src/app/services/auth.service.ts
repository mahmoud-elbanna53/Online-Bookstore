import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// for make AuthService avalibale in all project without need import it in providers
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private API_URL = 'http://localhost:3000/users';
//used for send requests to backend
  constructor(private http: HttpClient) {}
//send post req to users/ for create new user
  register(name:string, email:string, password:string, role:string):Observable<any>{
    //return user info after success operation 
    return this.http.post(`${this.API_URL}` , {name ,email ,password ,role});
  }

  login(email:string , password:string):Observable<any>{ 
    return this.http.post(`${this.API_URL}/login` , {email,password});
  }
  // login(email: string, password: string): Observable<any> {
  //   return this.http.post(`${this.API_URL}/login`, { email, password }).pipe(
  //     tap(response => {
  //       if (response.token) {
  //         this.saveToken(response.token);
  //         console.log("Token saved:", response.token);
  //       }
  //     })
  //   );
  // }
  

  saveToken(token:string):void{ 
    localStorage.setItem('token', token);
  }

  getToken():string | null{ 
    return localStorage.getItem('token');
  }
  // cheack if user login or not
// !! -> return true or false
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  getUserRole(): string | null {
    const token = this.getToken();
    if (!token) return null;
  
    try {
      const tokenPayload = JSON.parse(atob(token.split('.')[1])); 
      return tokenPayload.role; 
    } catch (error) {
      return null;
    }
  }
  
  
}
// function tap(arg0: (response: any) => void): import("rxjs").OperatorFunction<Object, any> {
//   throw new Error('Function not implemented.');
// }

