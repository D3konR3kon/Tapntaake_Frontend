import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/product';
import { ProductsService } from 'src/app/services/product.service';
import { ShopService } from 'src/app/services/shop.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  currentProduct: Product = {};
  currentIndex = -1;
  name = '';

  prdct?: Product[] 
  product: Product = {
    name: '',
    dec: '',
    img: "",
    price: 0,
    shopId:""
    
  };
  shopId: any
  submitted = false;
  constructor(private productsService: ProductsService , private shopService: ShopService, private route: ActivatedRoute, private router: Router ) { }

  ngOnInit(): void {
  }
  
  saveProduct(): void {
    // this.shopService.get()
    // setTimeout(()=>{
    //   window.location.replace(`/menu/${id}`)
    // }, 1500)
    const data = {
      name: this.product.name,
      dec: this.product.dec,
      img: this.product.img,
      price: this.product.price
    };

    this.shopId = this.route.snapshot.paramMap.get('id')
    console.log(this.shopId)
    this.productsService.create(data, this.shopId)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
      
      // window.location.reload()
      let currentUrl = this.router.url
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate([currentUrl])
      })
}

     newProduct(): void {
     this.submitted = false;
     this.product = {
      name: '',
      dec: "",
      img: "",
      price:0,

  };
}
searchName(): void {
  this.currentProduct = {};
  this.currentIndex = -1;

  this.productsService.findByTitle(this.name)
    .subscribe({
      next: (data) => {
        this.prdct = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
}


}


