import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/product.service';
import { Product } from '../../product';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { ShopService } from 'src/app/services/shop.service';
import { Shop } from 'src/app/shop';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-products',
  templateUrl: './shopmenu.component.html',
  styleUrls: ['./shopmenu.component.css']
})
export class ShopmenuComponent implements OnInit {
  
  isLoggedIn = false
  username?: ""
  public totalItems :any
  products: Product[] = []
  currentProduct: Product ={
  }
  currentIndex = -1
  name:any;
  currentShop :Shop ={
  }

  shopId:any
  constructor( private shopService:ShopService, 
               private productService: ProductsService, 
               private route: ActivatedRoute, 
               private cartService: CartService,
               private tokenStorage : TokenStorageService) { }

  ngOnInit(): void {
    
    this.isLoggedIn = !!this.tokenStorage.getToken()
    if(this.isLoggedIn){
      const user = this.tokenStorage.getUser()
      this.username = user.username
    }
    this.getAll()
    this.totalItems = this.cartService.getItems()
    this.totalItems.length
    this.getShop(this.route.snapshot.params['id'])
  }
  addToCart(product: Product) {

    this.cartService.addToCart(product);
    
  }

  getAll(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.productService.getAllProducts(id).subscribe({
      next: data => {
        this.products = data
        console.log(data)
      },
      error: e => console.error(e)
    })
  }

  getShop(id: string): void {
    this.shopService.get(id)
      .subscribe({
        next: (data) => {
          this.currentShop = data;
          console.log(data);
          localStorage.setItem('shopname',JSON.stringify(this.currentShop))
        },
        error: (e) => console.error(e)
      });
  }

  logout(): void{
    this.tokenStorage.signOut()
    window.location.reload()
  }
}