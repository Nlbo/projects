import { Component, OnInit } from '@angular/core';
import {PostsService} from "../../../shared/services/posts.service";
import {FormBuilder, FormGroup, Validators, FormControl} from "@angular/forms";
import {NzMessageService, UploadFile} from "ng-zorro-antd";
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {Router} from "@angular/router";

@Component({
  selector: 'app-change-post',
  templateUrl: './change-post.component.html',
  styleUrls: ['./change-post.component.css']
})
export class ChangePostComponent implements OnInit {

  public Editor = ClassicEditor;
  validateForm: FormGroup;
  uploading = false;
  fileList: UploadFile[] = [];
  post;
  url;
  previewImage;
  constructor(private fb: FormBuilder, private msg: NzMessageService, private service: PostsService, private router: Router) {
  }

  ngOnInit(): void {
    if (!this.service.candidatePost) {
      this.router.navigate(['post'])
    }
    this.url = this.service.url + '/uploads/posts/';
    this.post = this.service.candidatePost;
    this.validateForm = new FormGroup({
      title : new FormControl ( this.post.title ,  [Validators.required]),
      description :  new FormControl ( this.post.description,[ Validators.required]),
      content :  new FormControl (  this.post.content, [ Validators.required]),
      alt :  new FormControl (  this.post.alt),
      image: new FormControl(this.post.image)
    });
    this.previewImage = this.url + this.post.image;
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
    this.service.putPosts(this.post._id, formData)
      .subscribe(
        () => {
          this.uploading = false;
          this.fileList = [];
          this.msg.success('upload successfully.');
          this.router.navigate(['post'])
        },
        () => {
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
        console.log(event.target)
      }
    }
  }

}
