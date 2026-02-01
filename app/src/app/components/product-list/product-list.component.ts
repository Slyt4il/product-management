import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../../models/products';

@Component({
  selector: 'app-product-list',
  standalone: true,
  exportAs: 'productList',
  imports: [CommonModule, FormsModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  
  // Mock Data //
  products: Product[] = [
    {
      id: 1,
      name: 'Fried Rice',
      sku: 'DISH001',
      price: 45,
      stock: 20,
      category: 'Food',
      createdAt: new Date().toISOString()
    },
    {
      id: 2,
      name: 'Orange Juice',
      sku: 'DRINK001',
      price: 25,
      stock: 50,
      category: 'Beverages',
      createdAt: new Date().toISOString()
    },
    {
      id: 3,
      name: 'Soap',
      sku: 'ITEM001',
      price: 35,
      stock: 0,
      category: 'PersonalItems',
      createdAt: new Date().toISOString()
    },
    {
      id: 4,
      name: 'T-Shirt',
      sku: 'CLOTH001',
      price: 299,
      stock: 5,
      category: 'Clothing',
      createdAt: new Date().toISOString()
    },
    {
      id: 5,
      name: 'Banana',
      sku: 'FRUIT001',
      price: 1,
      stock: 0,
      category: 'Food',
      createdAt: new Date().toISOString()
    }
  ];

  categories: string[] = ['All', 'Food', 'Beverages', 'PersonalItems', 'Clothing'];
  // *** //

  selectedCategory: string = 'All';

  getFilteredProducts(): Product[] {
    if (this.selectedCategory === 'All') {
      return this.products;
    }
    return this.products.filter(product => product.category === this.selectedCategory);
  }
}
