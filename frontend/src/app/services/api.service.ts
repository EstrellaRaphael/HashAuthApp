import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

// interface pro corpo das requisições
export interface AuthRequest {
  email: string;
  password: string;
}

// interface pra resposta da API
export interface ApiResponse {
  message: string;
  email?: string;
  hash?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // URL base da API Flask
  private readonly API_URL = 'http://localhost:5000';

  constructor(private http: HttpClient) { }

  // cadastro do usuario
  register(data: AuthRequest): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.API_URL}/register`, data).pipe(catchError(this.handleError))
  }

  // validação da senha
  validate(data: AuthRequest): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.API_URL}/validate`, data).pipe(catchError(this.handleError))
  }

  // consultar o hash pelo e-mail
  getHash(email:string): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.API_URL}/hash/${email}`).pipe(catchError(this.handleError))
  }

  // tratamento de erros da API
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // erro pelo lado do cliente
      console.error('Erro no front', error.error.message);
    } else {
      // erro pelo lado do servidor
      console.error(`Erro no back: ${error.status}`, error.error)
    }
    return throwError(() => error.error)
  }
}
