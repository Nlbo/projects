import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {NzMessageService, UploadFile} from "ng-zorro-antd";
import {Router} from "@angular/router";
import {VacancyService} from "../../../shared/services/vacancy.service";

@Component({
  selector: 'app-add-vacancy',
  templateUrl: './add-vacancy.component.html',
  styleUrls: ['./add-vacancy.component.css']
})
export class AddVacancyComponent implements OnInit {

  validateForm: FormGroup;
  uploading = false;
  fileList: UploadFile[] = [];
  selectedValue = '';
  typeData = ['media', 'slider'];
  constructor(private fb: FormBuilder, private msg: NzMessageService, private service: VacancyService, private router: Router) {
  }

  ngOnInit(): void {
    this.validateForm = new FormGroup({
      description : new FormControl( '', [Validators.required ] ),
      title : new FormControl( '', [Validators.required ] ),
      content : new FormControl( '', [Validators.required ] ),
      alt : new FormControl('', [Validators.required ] ),
      image : new FormControl(null)
    })
  }



  beforeUpload = (file: UploadFile): boolean => {
    this.fileList = [];
    this.fileList = this.fileList.concat(file);
    return false;
  };

  handleUpload(): void {
    const formData = new FormData();
    // tslint:disable-next-line:no-any
    this.fileList.forEach((file: any) => {
      formData.append('image', file);
    });
    formData.append('title', this.validateForm.get('title').value);
    formData.append('content', this.validateForm.get('content').value);
    formData.append('description', this.validateForm.get('description').value);
    formData.append('alt', this.validateForm.get('alt').value);
    this.uploading = true;
    this.service.postVacancy(formData)
      .subscribe(
        () => {
          this.uploading = false;
          this.fileList = [];
          this.msg.success('upload successfully.');
          this.router.navigate(['vacancy'])
        },
        () => {
          this.uploading = false;
          this.msg.error('upload failed.');
        }
      );
  }
  provinceChange(value: string): void {
    this.selectedValue = this.typeData[value];
  }

}
