import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {SliderService} from "../../../shared/services/slider.service";
import {NzMessageService, UploadFile} from "ng-zorro-antd";
import {Router} from "@angular/router";
import {PortfolioService} from "../../../shared/services/portfolio.service";
import {MediaService} from "../../../shared/services/media.service";

@Component({
  selector: 'app-change-portfolio',
  templateUrl: './change-portfolio.component.html',
  styleUrls: ['./change-portfolio.component.css']
})
export class ChangePortfolioComponent implements OnInit {

  validateForm: FormGroup;
  uploading = false;
  fileList: UploadFile[] = [];
  isVisible = false;
  isOkLoading = false;
  selectedValue = '';
  images = [];
  portfolio;
  url;
  deletedimages = [];
  constructor(private fb: FormBuilder, private msg: NzMessageService, private service: PortfolioService, private router: Router) {
  }

  ngOnInit(): void {
    setTimeout(_=>{
      if(!this.service.candidatePortfolio) {
        this.router.navigate(['/portfolio']);
        console.clear();
      }
    },500);
      this.url = this.service.url + '/uploads/portfolio/';
      this.portfolio = this.service.candidatePortfolio;
      this.validateForm = new FormGroup({
        title: new FormControl(this.portfolio.title, [Validators.required]),
        description: new FormControl(this.portfolio.description, [Validators.required]),
        link: new FormControl(this.portfolio.link, [Validators.required]),
        imgs: new FormControl(this.portfolio.imgs, [Validators.required]),
        deletedimages: new FormControl(this.deletedimages, [])
      });
  }



  beforeUpload = (file: UploadFile): boolean => {
    this.fileList = this.fileList.concat(file);
    return false;
  };

  handleUpload(): void {
    const formData = new FormData();
    // tslint:disable-next-line:no-any
    this.fileList.forEach((file: any) => {
      formData.append('images', file);
    });
    formData.append('title', this.validateForm.get('title').value);
    formData.append('description', this.validateForm.get('description').value);
    formData.append('link', this.validateForm.get('link').value);
    formData.append('imgs', this.portfolio.imgs);
    formData.append('deletedimages', this.validateForm.get('deletedimages').value);
    this.uploading = true;
    let data = {
      deletedimages: this.deletedimages,
      portfolio: formData
    };
    this.service.putPortfolio(this.portfolio._id, formData)
      .subscribe(
        () => {
          this.uploading = false;
          this.fileList = [];
          this.msg.success('upload successfully.');
          console.log(this.portfolio.imgs)
          this.router.navigate(['portfolio'])
        },
        () => {
          this.uploading = false;
          this.msg.error('upload failed.');
        }
      );
  }
  deleteImage(image) {
    this.deletedimages.push(image);
    this.portfolio.imgs = this.portfolio.imgs.filter(item => item !== image);
    console.log(this.portfolio.imgs)
  }
  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
      this.isVisible = false;
      this.isOkLoading = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

}
