import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NzMessageService, UploadFile} from "ng-zorro-antd";
import {PostsService} from "../../../shared/services/posts.service";
import {Router} from "@angular/router";
import {PortfolioService} from "../../../shared/services/portfolio.service";

@Component({
  selector: 'app-add-portfolio',
  templateUrl: './add-portfolio.component.html',
  styleUrls: ['./add-portfolio.component.css']
})
export class AddPortfolioComponent implements OnInit {

  validateForm: FormGroup;
  uploading = false;
  fileList: UploadFile[] = [];
  flag = true;
  constructor(private fb: FormBuilder, private msg: NzMessageService, private service: PortfolioService, private router: Router) {
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      title : [ '', [Validators.required ] ],
      description : [ '', [ Validators.required ] ],
      link : [ '', [ Validators.required ] ],
      image: [null]
    });
  }



  beforeUpload = (file: UploadFile): boolean => {
    this.flag = false;
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
    this.uploading = true;
    this.service.postPortfolio(formData)
      .subscribe(
        () => {
          this.uploading = false;
          this.fileList = [];
          this.msg.success('upload successfully.');
          this.router.navigate(['portfolio'])
        },
        () => {
          this.uploading = false;
          this.msg.error('upload failed.');
        }
      );
  }


}
