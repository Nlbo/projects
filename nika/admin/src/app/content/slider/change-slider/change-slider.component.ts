import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SliderService} from "../../../shared/services/slider.service";
import {NzMessageService} from "ng-zorro-antd";
import {Router} from "@angular/router";

@Component({
  selector: 'app-change-slider',
  templateUrl: './change-slider.component.html',
  styleUrls: ['./change-slider.component.css']
})
export class ChangeSliderComponent implements OnInit {

  validateForm: FormGroup;
  uploading = false;
  selectedValue = '';
  isVisible = false;
  isOkLoading = false;
  images = [];
  url;
  image;

  constructor(private service: SliderService, private msg: NzMessageService, private router: Router) {
    if (!this.service.candidateSlider) {
      this.router.navigate(['slider'])
    }
  }

  ngOnInit() {
    this.url = this.service.url + '/uploads/medias/';
    this.image = this.service.candidateSlider;
    this.service.getImages().subscribe((data: []) => {
      this.images = data;
    });
    this.validateForm = new FormGroup({
      title : new FormControl( this.image.title, [Validators.required ] ),
      url: new FormControl( this.image.url, [Validators.required ] ),
      description : new FormControl(this.image.description, [Validators.required ] ),
      img : new FormControl(this.image.img, [Validators.required ])
    })
  }
  handleUpload(): void {
    this.uploading = true;
    this.service.putSlider(this.image._id ,this.validateForm.value)
      .subscribe(
        () => {
          this.uploading = false;
          this.msg.success('upload successfully.');
          this.router.navigate(['slider'])
        },
        () => {
          this.uploading = false;
          this.msg.error('upload failed.');
        }
      );
  }
  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isOkLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isOkLoading = false;
    }, 3000);
  }

  handleCancel(): void {
    this.isVisible = false;
  }
  chooseImage(image) {
    this.validateForm.get('img').setValue(image._id);
    this.image.img.image = image.image;
    this.isVisible = false;
  }

}
