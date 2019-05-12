import { Component, OnInit } from '@angular/core';
import {DataService} from "../../data.service";
import {NzMessageService, UploadFile} from "ng-zorro-antd";
import {HttpClient, HttpRequest, HttpResponse} from "@angular/common/http";
import {filter} from "rxjs/operators";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-image',
  templateUrl: './add-image.component.html',
  styleUrls: ['./add-image.component.css']
})
export class AddImageComponent implements OnInit {
 ip;
 category;
 subCategory;
  showDate;
  msgflag;
  flag;
  message;
  title = 'PlayTimeWeb';
  uploading = false;
  fileList: UploadFile[] = [];
  constructor(private router: Router,private dataService: DataService, private msgg: NzMessageService, private http: HttpClient, private msg: NzMessageService) {
    this.ip = this.dataService.URL + 'addImage';
    let data = new Date();
    let newDate = [];
    newDate[0] = data.getFullYear();
    newDate[1] = Number(data.getMonth()) + 1;
    newDate[2] = Number(data.getDate()) + 1;
    this.showDate = newDate.join('-');
    this.category = this.dataService.changedCategory;
    this.subCategory = this.dataService.subCategory;
  }
  ngOnInit() {
  }
  // handleChange({ file, fileList }): void {
  //   const status = file.status;
  //   if (status !== 'uploading') {
  //     // console.log(file, fileList);
  //   }
  //   if (status === 'done') {
  //     this.msgg.success(`${file.name} file uploaded successfully.`);
  //   } else if (status === 'error') {
  //     this.msgg.error(`${file.name} file upload failed.`);
  //   }
  // }
  beforeUpload = (file: UploadFile): boolean => {
    this.fileList = this.fileList.concat(file);
    return false;
  }

  handleUpload(): void {
    const formData = new FormData();
    // tslint:disable-next-line:no-any
    this.fileList.forEach((file: any) => {
      formData.append('image', file);
      formData.append('category', this.category);
      formData.append('subCategory', this.subCategory);
      formData.append('showDate', this.showDate);
    });
    this.uploading = true;
    // You can use any AJAX library you like
    const req = new HttpRequest('POST', this.dataService.URL + 'addImage', formData, {
      // reportProgress: true
    });
    this.http
      .request(req)
      .pipe(filter(e => e instanceof HttpResponse))
      .subscribe(
        (event: {}) => {
          this.uploading = false;
          this.fileList = [];
          this.msg.success('upload successfully.');
          this.dataService.getAllData();
          setTimeout(_ => {
            this.router.navigate(['content', 'getImages'])
          }, 1000);
        },
        err => {
          this.uploading = false;
          this.msg.error('upload failed.');
        }
      );
  }
}

//
