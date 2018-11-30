import { FormGroup } from '@angular/forms';

export interface AppInterface {
  items: Item[];
  formGroup: FormGroup;
  insert(value: Item);
  update(id: number, value: Item);
  delete(id: number);
}

export class Item {
  id: number;
  title: string;
  image: string;
  detail: string;
  price: number;
  date: Date;
}
