import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from './app.interface';

@Injectable()
export class AppService {

  insertDB(value: Item) {
    return new Observable<Item>(obj => {
      value.id = Math.random();
      value.date = new Date();
      obj.next(value);
      obj.complete();
    });
  }

  updateDB(id: number, value: Item) {
    return new Observable<Item>(obj => {
      value.date = new Date();
      obj.next(value);
      obj.complete();
    });
  }

  deleteDB(id: number) {
    return new Observable<{deleted: number}>(obj => {
      obj.next({deleted: 1});
      obj.complete();
    });
  }

  getItems() {
    return new Observable<Item[]>(obj => {

      const mockupItems = [{
        id: Math.random(),
        title: 'CAKE',
        image: 'assets/cake.jpg',
        detail: 'Strawberry, Chocolate, Blueberry, Vanilla Cake',
        price: 59,
        date: new Date(2017, 9, 28, 0, 0, 0)
      }, {
        id: Math.random(),
        title: 'HONEY TOAST',
        image: 'assets/honeytoast.jpg',
        detail: 'Raspberry, Chocolate, Blueberry Honey Toast',
        price: 79,
        date: new Date(2018, 9, 28, 0, 0, 0)
      }, {
        id: Math.random(),
        title: 'ICE CREAM',
        image: 'assets/icecream.jpg',
        detail: 'Sticky Chewy Chocolate, Midnight Brownie, Strawberry Sherbet, Very Strawberry, Chocolate Chips',
        price: 79,
        date: new Date(2016, 9, 28, 0, 0, 0)
      }];

      obj.next(mockupItems.sort((a, b) => Date.parse(b.date.toString()) - Date.parse(a.date.toString()))),
      obj.complete();
    });
  }

}
