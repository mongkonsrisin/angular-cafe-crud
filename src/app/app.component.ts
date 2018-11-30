import {Component, ViewChild} from '@angular/core';
import { AppInterface, Item } from './app.interface';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AppInterface {

  @ViewChild('formModal') formModal: { show: Function, hide: Function };
  @ViewChild('deleteModal') deleteModal: { show: Function, hide: Function };


  constructor(private formBuilder: FormBuilder, private appService: AppService) {
    this.loadInitialData();
  }

  lipsum = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, ' +
    'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';

  angular = 'Angular is a TypeScript-based open-source front-end web application platform ' +
    'led by the Angular Team at Google and by a community of individuals and corporations. ';

  items: Item[];
  formGroup: FormGroup = this.formBuilder.group({
    id: [],
    title: [null, Validators.required],
    image: [null, [Validators.required, Validators.pattern(/(https?:\/\/.*\.(?:png|jpg))/i)]],
    detail: [null, Validators.required],
    price: [null, [Validators.required, Validators.pattern(/^[0-9]+$/)]]
  });

  insert(value: Item) {
    this.items.push(value);
  }

  update(id: number, value: Item) {
    this.items.map(item => {
      if (item.id === id) {
        item.title = value.title;
        item.image = value.image;
        item.detail = value.detail;
        item.price = value.price;
        item.date = value.date;
      }
      return item;
    });
  }

  delete(id: number) {
    this.items.splice(this.items.findIndex(index => index.id === id), 1);
  }

  onCreateFormModal() {
    this.formGroup.reset();
    this.formModal.show();
  }

  onSubmit() {
    if (this.formGroup.valid) {
      const id = this.formGroup.value['id'];
      if (id) {
        this.appService.updateDB(id, this.formGroup.value).subscribe(item => {
          this.update(id, item);
        });
      } else {
        this.appService.insertDB(this.formGroup.value).subscribe(item => {
          this.insert(item);
        });
      }
      this.items = this.items.sort((a, b) => Date.parse(b.date.toString()) - Date.parse(a.date.toString()));
      this.formGroup.reset();
      this.formModal.hide();
      window.scroll({top: 0, behavior: 'smooth'});
    }
  }

  onEdit(item: Item) {
    const form = this.formGroup;
    form.controls['id'].setValue(item.id);
    form.controls['title'].setValue(item.title);
    form.controls['image'].setValue(item.image);
    form.controls['detail'].setValue(item.detail);
    form.controls['price'].setValue(item.price);
    this.formModal.show();
  }

  onConfirm(item: Item) {
    const form = this.formGroup;
    form.controls['id'].setValue(item.id);
    form.controls['title'].setValue(item.title);
    this.deleteModal.show();
  }

  onDelete() {
    const id = this.formGroup.value['id'];
    this.appService.deleteDB(id).subscribe(() => {
      this.delete(id);
      this.formGroup.reset();
      this.deleteModal.hide();
    });
  }

  getImageURL() {
    if (this.formGroup.controls['image'].valid) {
      return this.formGroup.controls['image'].value;
    } else {
      return 'assets/placeholder.png';
    }
  }

  loadInitialData() {
    this.appService.getItems().subscribe(items => this.items = items);
  }

  generateRandomImage() {
    const randomImages = [
      'https://source.unsplash.com/random.jpg',
      'https://picsum.photos/600/400/?random.jpg',
      'https://loremflickr.com/600/400/.jpg',
      'https://placeimg.com/600/400/any.jpg'
    ];
    const randomImage = randomImages[Math.floor(Math.random() * randomImages.length)];
    this.formGroup.controls['image'].setValue(randomImage);
  }

}
