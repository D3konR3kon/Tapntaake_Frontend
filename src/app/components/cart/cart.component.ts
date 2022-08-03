import { Component, OnInit } from '@angular/core';
import { Product } from '../../product';
import { CartService } from '../../services/cart.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CheckoutComponent } from '../../components/checkout/checkout.component'
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  isLoggedIn = false
  username = ""
  product !: Product
  totalItems :any
  total:any
  items: any
  products: any[] = []
  totalAmount = this.cartService.totalAmount
  orderItems = this.cartService.orderItems
  
  constructor(private cartService: CartService, 
    private router : Router, 
    private activated: ActivatedRoute,
    private location: Location,
    private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {

    this.totalItems = this.cartService.getItems()
    this.getItems()
    this.Total()
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
  getItems(){
        this.items = this.cartService.getItems();
      
        
  }
  Total() {
    
    this.totalAmount = 0
    this.items.forEach((item: { qty: number; price: number; }) => {
      this.totalAmount += (item.qty * item.price)
      localStorage.setItem('Total',JSON.stringify(this.totalAmount))
      
    })
    localStorage.setItem('for', JSON.stringify(this.items))
    
  }
  deletei(i: number): void {
    this.items.splice(i, 1);
    this.items.length
    this.Total();
  
  }
  qntUpdate($event: any) { 
    this.Total();
  }

  incre(qty: any, index: number){
    qty++
    this.items[index].qty = qty
    this.items.length
    this.Total();
  }
  decr(qty: any, index: number){
    
  if(qty > 1)
  qty--
    this.items[index].qty = qty
    this.items.length
    this.Total();
   
  }

  goBack(){
    this.location.back()
    // window.location.replace('/')
  }
}
