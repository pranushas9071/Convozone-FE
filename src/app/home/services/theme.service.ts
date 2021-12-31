import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  
  constructor() {}

  private themeSource = new BehaviorSubject('primaryTheme');
  selectedTheme = this.themeSource.asObservable();

  changeTheme(theme: string) {
    this.themeSource.next(theme);
  }
}
