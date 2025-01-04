import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs/index";
import {Trace} from 'app/components/modeles/trace.modele';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
@Injectable({
providedIn: 'root'
})
export class TraceService {
baseUrl: string = environment.apiUrl;
constructor(private http: HttpClient) { }

  getTraceById(id: string): Observable<Trace> {
    return this.http.get<Trace>(this.baseUrl +'api/trace/'+ id);
  }

  createTrace(trace: Trace): Observable<Trace> {
    return this.http.post<Trace>(this.baseUrl+'api/trace', trace);
  }

  updateTrace(trace: Trace): Observable<Trace> {
    return this.http.put<Trace>(this.baseUrl +'api/trace/'+ trace.id, trace);
  }

  deleteTrace(id: string): Observable<Trace> {
    return this.http.delete<Trace>(this.baseUrl +'api/trace/'+ id);
  }

  getTraces() {
      return this.http.get<any>(this.baseUrl+'api/trace').pipe(
       map(
         traceData => {
          return traceData;
         }));
  }
}
