import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {NzMessageService, UploadFile} from "ng-zorro-antd";
import {Router} from "@angular/router";
import {VacancyService} from "../../../shared/services/vacancy.service";

@Component({
  selector: 'app-change-vacancy',
  templateUrl: './change-vacancy.component.html',
  styleUrls: ['./change-vacancy.component.css']
})
export class ChangeVacancyComponent implements OnInit {

  validateForm: FormGroup;
  uploading = false;
  fileList: UploadFile[] = [];
  vacancy;
  url;
  previewImage;
  constructor(private fb: FormBuilder, private msg: NzMessageService, private service: VacancyService, private router: Router) {
  }

  ngOnInit(): void {
    if (!this.service.candidateVacancy) {
      this.router.navigate(['vacancy'])
    }
    this.url = this.service.url + '/uploads/vacancy/';
    this.vacancy = this.service.candidateVacancy;
    this.validateForm = new FormGroup({
      description :  new FormControl (  this.vacancy.description, [ Validators.required]),
      title :  new FormControl (  this.vacancy.title, [ Validators.required]),
      content :  new FormControl (  this.vacancy.content, [ Validators.required]),
      alt :  new FormControl (  this.vacancy.alt, [ Validators.required]),
      image: new FormControl(this.vacancy.image, [ Validators.required])
    });
    this.previewImage = this.url + this.vacancy.image;
  }



  beforeUpload = (file: UploadFile): boolean => {
    this.fileList = [];
    this.fileList = this.fileList.concat(file);
    this.previewImage = file.url || file.thumbUrl;
    return false;
  };

  handleUpload(): void {
    const formData = new FormData();
    // tslint:disable-next-line:no-any
    if (this.fileList.length > 0) {
      this.fileList.forEach((file: any) => {
        formData.append('image', file);
      });
    } else {
      formData.append('image', this.validateForm.get('image').value);
    }

    formData.append('title', this.validateForm.get('title').value);
    formData.append('description', this.validateForm.get('description').value);
    formData.append('content', this.validateForm.get('content').value);
    formData.append('alt', this.validateForm.get('alt').value);
    this.uploading = true;
    this.service.putVacancy(this.vacancy._id, formData)
      .subscribe(
        () => {
          this.uploading = false;
          this.fileList = [];
          this.msg.success('upload successfully.');
          this.router.navigate(['vacancy'])
        },
        (err) => {
          this.uploading = false;
          this.msg.error('upload failed.');
        }
      );
  }
  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      this.fileList[0] = event.target.files[0];
      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.previewImage = event.target['result'];
      }
    }
  }

}
