import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {NzMessageService, UploadFile} from "ng-zorro-antd";
import {Router} from "@angular/router";
import {MediaService} from "../../../shared/services/media.service";

@Component({
  selector: 'app-add-media',
  templateUrl: './add-media.component.html',
  styleUrls: ['./add-media.component.css']
})
export class AddMediaComponent implements OnInit {

  validateForm: FormGroup;
  uploading = false;
  fileList: UploadFile[] = [];
  selectedValue = '';
  typeData = ['media', 'slider'];
  constructor(private fb: FormBuilder, private msg: NzMessageService, private service: MediaService, private router: Router) {
  }

  ngOnInit(): void {
    this.validateForm = new FormGroup({
      type : new FormControl( '', [Validators.required ] ),
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
    formData.append('type', this.validateForm.get('type').value);
    formData.append('alt', this.validateForm.get('alt').value);
    this.uploading = true;
    this.service.postMedia(formData)
      .subscribe(
        () => {
          this.uploading = false;
          this.fileList = [];
          this.msg.success('upload successfully.');
          this.router.navigate(['media'])
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
