import { Component, OnInit } from '@angular/core';
import {MediaService} from "../../../shared/services/media.service";
import {Router} from "@angular/router";
import {NzMessageService, UploadFile} from "ng-zorro-antd";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-change-media',
  templateUrl: './change-media.component.html',
  styleUrls: ['./change-media.component.css']
})
export class ChangeMediaComponent implements OnInit {
  validateForm: FormGroup;
  uploading = false;
  fileList: UploadFile[] = [];
  media;
  url;
  previewImage;
  constructor(private fb: FormBuilder, private msg: NzMessageService, private service: MediaService, private router: Router) {
  }

  ngOnInit(): void {
    if (!this.service.candidateMedia) {
      this.router.navigate(['media'])
    }
    this.url = this.service.url + '/uploads/medias/';
    this.media = this.service.candidateMedia;
    this.validateForm = new FormGroup({
      type :  new FormControl (  this.media.type, [ Validators.required]),
      alt :  new FormControl (  this.media.alt, [ Validators.required]),
      image: new FormControl(this.media.image, [ Validators.required])
    });
    this.previewImage = this.url + this.media.image;
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

    formData.append('type', this.validateForm.get('type').value);
    formData.append('alt', this.validateForm.get('alt').value);
    this.uploading = true;
    this.service.putMedia(this.media._id, formData)
      .subscribe(
        () => {
          this.uploading = false;
          this.fileList = [];
          this.msg.success('upload successfully.');
          this.router.navigate(['media'])
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
