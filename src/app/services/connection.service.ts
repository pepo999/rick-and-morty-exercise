import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap, forkJoin } from 'rxjs';
import { Character } from '../model/character';
import { Location } from '../model/character';
import { Episode } from '../model/episode';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  readonly BASE_URL = 'https://rickandmortyapi.com/api/'

 pages: any;

  constructor(private http: HttpClient) {
this.getCharacter(1)
this.getPages()
  }

  getCharacter(id: number): Observable<Character> {
   return this.http.get<any>(this.BASE_URL + 'character/' + id)
  }

//  getCharacters(name: string): Observable<Character[]> {
//   return this.http.get<any>(this.BASE_URL + 'character').pipe(switchMap(characters => {
//     const results = characters.results;
//     const getArr = [];
//     for (let i = 0; i < results.length; i++) {
//       const character = results[i];
//      const request = this.http.get<Character>(character.url);
//       getArr.push(request)
//     }
//     return forkJoin(getArr)
//   }))
//  }

// getCharacters(name: string): Observable<any>{
//   return this.http.get(this.BASE_URL + 'character/?page={{this.pages}}&name=' + name)
// }+

getCharacters(name: string): Observable<any>{
  let res: any;
  // for (let i = 2; i < this.pages -1; i++) {
      res = this.http.get(this.BASE_URL + 'character/?page=' + 2 +'&name=' + name)
//   }
  return res;
}

getPages(): any{
 this.http.get<any>(this.BASE_URL + 'character').subscribe(data => {this.pages = data.info.pages, console.log(this.pages)})
}

}
