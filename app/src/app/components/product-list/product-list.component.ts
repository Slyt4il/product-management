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
  notification: string | null = null;
  notificationTimeout: any;

  sell(product: Product): void {
    if (product.stock < 1) {
      return;
    }
    product.stock -= 1;
    this.showNotification(`Sold ${product.name}`);
  }

  getFilteredProducts(): Product[] {
    if (this.selectedCategory === 'All') {
      return this.products;
    }
    return this.products.filter(product => product.category === this.selectedCategory);
  }

  getFilteredCount(): number {
    return this.getFilteredProducts().length;
  }

  getFilteredStock(): number {
    return this.getFilteredProducts().reduce((total, product) => total + product.stock, 0);
  }

  getTotalValue(): number {
    return this.getFilteredProducts().reduce((total, product) => total + product.price * product.stock, 0);
  }

  showNotification(message: string, duration = 3000) {
    this.notification = message;
    if (this.notificationTimeout) {
      clearTimeout(this.notificationTimeout);
    }
    this.notificationTimeout = setTimeout(() => {
      this.notification = null;
      this.notificationTimeout = undefined;
    }, duration);
  }
}
