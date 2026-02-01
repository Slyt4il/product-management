import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../../models/products';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {

  @Input() products: Product[] = [];
  @Input() addProduct!: (product: Product) => void;

  validCategories: string[] = ['Food', 'Beverages', 'PersonalItems', 'Clothing'];

  newProduct: Product = {
    name: '',
    sku: '',
    price: 0,
    stock: 0,
    category: '',
    id: 0,
    createdAt: ''
  };

  submit(form: any) {
    if (form.invalid || this.checkSkuDuplicate(this.newProduct.sku)) {
      return;
    }

    const productToAdd: Product = {
      ...this.newProduct,
      id: this.products.length + 1,
      createdAt: new Date().toISOString()
    };

    this.addProduct(productToAdd);
    form.resetForm();
  }

  checkSkuDuplicate(sku: string): boolean {
    return this.products.some(p => p.sku === sku);
  }
}
