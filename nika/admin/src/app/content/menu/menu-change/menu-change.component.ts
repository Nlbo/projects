import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {NzMessageService, UploadFile} from "ng-zorro-antd";
import {PostsService} from "../../../shared/services/posts.service";
import {PortfolioService} from "../../../shared/services/portfolio.service";
import {MenuService} from "../../../shared/services/menu.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-menu-change',
  templateUrl: './menu-change.component.html',
  styleUrls: ['./menu-change.component.css']
})
export class MenuChangeComponent implements OnInit {

  validateForm: FormGroup;
  uploading = false;
  fileList: UploadFile[] = [];
  selectedValueType = '';
  @ViewChild('selectedValueTypeId')selectedValueTypeId;
  typeData = ['portfolio', 'post'];
  allItems = [];
  candidate;
  constructor(private postService: PostsService,private portfolioService: PortfolioService,private fb: FormBuilder, private msg: NzMessageService, private service: MenuService, private router: Router) {
    if (!this.service.candidateMenu) {
      this.router.navigate(['menu'])
    }
  }

  ngOnInit(): void {
    console.log(this.selectedValueTypeId);
    this.candidate = this.service.candidateMenu;
    this.validateForm = new FormGroup({
      type : new FormControl( this.candidate.type, [Validators.required ] ),
      title : new FormControl(this.candidate.title, [Validators.required ] ),
      url : new FormControl(this.candidate.url, [Validators.required ] ),
      typeId : new FormControl(this.candidate.typeId, [Validators.required ] ),
    });
    this.selectedValueType = this.validateForm.get('type').value;
    this.validateForm.get('type').value === 'post' ?
      this.postService.getPosts().subscribe((data: any[]) => {this.allItems = data;})
      :
      this.portfolioService.getPortfolio().subscribe((data: any[]) => {this.allItems = data;});
  }


  handleUpload(): void {
    // let val = this.allItems.filter(item => item.title === this.selectedValueTypeId.value)[0]._id;
    this.validateForm.get('typeId').setValue(this.selectedValueTypeId.value);
    this.uploading = true;
    this.service.changeMenu(this.validateForm.value, this.candidate._id)
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
      case 'portfolio': this.portfolioService.getPortfolio().subscribe((data: []) => this.allItems = data);break;
    }
  }

}
