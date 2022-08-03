import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
@Component({
  selector: 'app-footernav',
  templateUrl: './footernav.component.html',
  styleUrls: ['./footernav.component.css']
})
export class FooternavComponent implements OnInit {
  public totalItems :any
  isLoggedIn = false
  username = ""
  constructor(private cartService: CartService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    this.totalItems = this.cartService.getItems()
    this.isLoggedIn = !!this.tokenStorage.getToken()
    if(this.isLoggedIn){
      const user = this.tokenStorage.getUser()
      this.username = user.username
    }
  }
 
  logout(): void{
    this.tokenStorage.signOut()
    window.location.reload()
  }
}
