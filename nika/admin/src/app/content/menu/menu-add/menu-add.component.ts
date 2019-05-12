import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {NzMessageService, UploadFile} from "ng-zorro-antd";
import {MediaService} from "../../../shared/services/media.service";
import {Router} from "@angular/router";
import {PostsService} from "../../../shared/services/posts.service";
import {PortfolioService} from "../../../shared/services/portfolio.service";
import {MenuService} from "../../../shared/services/menu.service";

@Component({
  selector: 'app-menu-add',
  templateUrl: './menu-add.component.html',
  styleUrls: ['./menu-add.component.css']
})
export class MenuAddComponent implements OnInit {

  validateForm: FormGroup;
  uploading = false;
  fileList: UploadFile[] = [];
  selectedValueType = '';
  selectedValueTypeId = '';
  typeData = ['portfolio', 'post'];
  allItems = [];
  candidate;
  constructor(private postService: PostsService,private portfolioService: PortfolioService,private fb: FormBuilder, private msg: NzMessageService, private service: MenuService, private router: Router) {
  }

  ngOnInit(): void {
    this.validateForm = new FormGroup({
      type : new FormControl( '', [Validators.required ] ),
      title : new FormControl('', [Validators.required ] ),
      url : new FormControl(''),
      typeId : new FormControl('', [Validators.required ] ),
    })
  }


  handleUpload(): void {
    this.validateForm.get('typeId').setValue(this.selectedValueTypeId);
    this.uploading = true;
    this.service.addMenu(this.validateForm.value)
      .subscribe(
        () => {
          this.uploading = false;
          this.fileList = [];
          this.msg.success('upload successfully.');
          this.router.navigate(['menu'])
        },
        () => {
          this.uploading = false;
          this.msg.error('upload failed.');
        }
      );
  }
  foo(item) {
    switch (item) {
      case 'post': this.postService.getPosts().subscribe((data: []) => this.allItems = data);break;
      case 'url': this.validateForm.get('typeId').setValue('ss');break;
      case 'portfolio': this.portfolioService.getPortfolio().subscribe((data: []) => this.allItems = data);break;
    }
  }
}
