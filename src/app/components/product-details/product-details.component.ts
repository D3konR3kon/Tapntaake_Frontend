import { Component, OnInit, Input } from '@angular/core';
import { ProductsService } from 'src/app/services/product.service';
import { ActivatedRoute, Router} from '@angular/router';
import { Location } from '@angular/common';
import { Product } from 'src/app/product';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  @Input() viewMode = false;

  @Input() currentProduct: Product={
    name: '',
    dec: '',
    price:0,
    img:''
  };
  
   message = ''
  constructor(private productService: ProductsService,
              private route: ActivatedRoute,
              private router: Router,
              private location: Location
    ) { }

  ngOnInit(): void {
   
    if (!this.viewMode){
      this.message = '';
      this.getProduct(this.route.snapshot.params['id']);
    }
  }
  
  getProduct(id: string): void {
    this.productService.get(id)
      .subscribe({
        next: (data) => {
          this.currentProduct = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  updateProduct(): void {
    this.message = '';

    this.productService.update(this.currentProduct.id, this.currentProduct)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? res.message : 'This product was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  deleteProduct(): void {
    this.productService.delete(this.currentProduct.id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.goBack()
        },
        error: (e) => console.error(e)
      });
  }
  goBack(){
    this.location.back()
  }
}
