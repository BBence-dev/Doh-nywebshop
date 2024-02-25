import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent {
  @Input() viewMode = false;

  // Az aktuális tutoriál, amelyet megjelenítünk vagy szerkesztünk
  @Input() currentUser: User = {
    id: undefined
  };
  
  // Üzenet, amely a műveletek eredményét jelzi
  message = '';

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    // Az ngOnInit() metódus futása a komponens inicializálásakor
    // Ha nem viewMode-ban vagyunk (nem csak megtekintésre szolgál a komponens), akkor az aktuális tutoriál adatainak lekérése
    if (!this.viewMode) {
      this.message = '';
      this.getUser(this.route.snapshot.params["id"]);
    }
  }

  // Az aktuális tutoriál adatainak lekérése a megadott azonosító alapján
  getUser(id: string): void {
    this.apiService.get(id)
      .subscribe({
        next: (data) => {
          this.currentUser = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  // A tutoriál közzétételének frissítése
 /*updatePublished(status: boolean): void {
    const data = {
      nev:this.currentUser.nev,
      kor:this.currentUser.kor
    };

    this.message = '';

    // A apiService segítségével frissítjük a tutoriál közzétételi állapotát a data objektummal
    // Az Observable-t visszaadó update metódusra feliratkozunk a subscribe() segítségével
    // Ha a kérés sikeres, a next callback függvény fut le, beállítja az új közzétételi állapotot, és üzenetet jelenít meg
    // Ha hiba történik a kérés során, az error callback függvény fut le, és a hibát kiírja a konzolra
    this.apiService.update(this.currentUser.id, data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.currentUser.szhely = status;
          this.message = res.message ? res.message : 'The status was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }*/

  // A tutoriál frissítése az aktuális tutoriál adataival
  updateUser(): void {
    this.message = '';

    // A apiService segítségével frissítjük a tutoriált az aktuális tutori
    // Az Observable-t visszaadó update metódusra feliratkozunk a subscribe() segítségével
    // Ha a kérés sikeres, a next callback függvény fut le, és üzenetet jelenít meg
    // Ha hiba történik a kérés során, az error callback függvény fut le, és a hibát kiírja a konzolra
    this.apiService.update(this.currentUser.id, this.currentUser)
    .subscribe({
    next: (res) => {
    console.log(res);
    this.message = res.message ? res.message : 'This User was updated successfully!';
    },
    error: (e) => console.error(e)
    });
    }
    
    // A tutoriál törlése
    deleteUser(): void {
    // A apiService segítségével töröljük a tutoriált az aktuális tutoriál azonosítója alapján
    // Az Observable-t visszaadó delete metódusra feliratkozunk a subscribe() segítségével
    // Ha a kérés sikeres, a next callback függvény fut le, átirányítunk az '/Users' útvonalra
    // Ha hiba történik a kérés során, az error callback függvény fut le, és a hibát kiírja a konzolra
    this.apiService.delete(this.currentUser.id)
    .subscribe({
    next: (res) => {
    console.log(res);
    this.router.navigate(['/Users']);
    },
    error: (e) => console.error(e)
    });
    }
    
}
