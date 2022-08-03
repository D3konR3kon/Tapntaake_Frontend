import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { ShopService } from 'src/app/services/shop.service';
import { Shop } from 'src/app/shop';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  private roles: string[] = []
  isLoggedIn = false
  showAdminBoard = false
  showModeratorBoard = false
  username?: string

  shops: Shop[] = [];
  currentShop = {};
  currentIndex = -1;
  name =""

  constructor( private tokenStorage: TokenStorageService, private shopService: ShopService ) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorage.getToken()
    if(this.isLoggedIn){
      const user = this.tokenStorage.getUser()
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN')
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR')
      this.username = user.username
    }
    this.getShops()
  }

  logout(): void{
    this.tokenStorage.signOut()
    window.location.reload()
  }

  searchName(): void {
    this.currentShop = {};
    this.currentIndex = -1;

    this.shopService.findByTitle(this.name)
      .subscribe({
        next: (data) => {
          this.shops = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }
  getShops(): void {
    this.shopService.getAll().subscribe({
      next: (data) => {
        this.shops = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    })
}

  
  
 
  }
  

  

