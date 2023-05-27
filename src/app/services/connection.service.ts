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

  // readonly CHARACTER_URL = ''

  // readonly LOCATION_URL = ''

  // readonly EPISODE_URL = ''

  constructor(private http: HttpClient) {
this.getCharacter(1)
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

getCharacters(name: string): Observable<any>{
  return this.http.get(this.BASE_URL + 'character/?page=1&name=' + name)
}

}
