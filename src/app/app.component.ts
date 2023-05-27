import { Component } from '@angular/core';
import { ConnectionService } from './services/connection.service';
import { FormGroup, FormControl } from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { Observable, switchMap, forkJoin, debounceTime, distinctUntilChanged } from 'rxjs';
import { Character } from './model/character';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Rick and Morty Encyclopedia';

  searchForm: FormGroup = new FormGroup({
    search: new FormControl('')
  })

  static id: number;

  public characterList: Character[]= [];

  constructor(private connService: ConnectionService) {

    connService.getCharacter(1).subscribe(data => console.log(data))

    // connService.getCharacters().subscribe(characters => console.log(characters))

    this.searchForm.get('search')?.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap((v) => this.connService.getCharacters(v))
    ).subscribe(
      (v) => {
        this.characterList = v?.results
      }
    )


  }
}
