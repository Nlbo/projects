import {Component, OnInit} from '@angular/core';
import {PostsService} from "../../../shared/services/posts.service";
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import {NzMessageService, UploadFile} from "ng-zorro-antd";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

class UploadAdapter {
  loader;  // your adapter communicates to CKEditor through this
  url;

  constructor(loader, url) {
    this.loader = loader;
    this.url = url;
  }

  upload() {
    return new Promise((resolve, reject) => {
      console.log('the file we got was', this.loader.file);
      resolve({default: this.url});
    });
  }


  abort() {
    console.log('UploadAdapter abort');
  }

}


@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})

export class AddPostComponent implements OnInit {
  public Editor = ClassicEditor;
  validateForm: FormGroup;
  uploading = false;
  fileList: UploadFile[] = [];

  ckconfig = {
    // include any other configuration you want
    extraPlugins: [this.TheUploadAdapterPlugin]
  };





  constructor(private http: HttpClient, private fb: FormBuilder, private msg: NzMessageService, private service: PostsService, private router: Router) {
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      content: ['', [Validators.required]],
      alt: ['', [Validators.required]],
      image: [null]
    });
  }

  TheUploadAdapterPlugin(editor) {
    console.log('TheUploadAdapterPlugin called');
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
      // return new UploadAdapter(loader, this.service.url + '/uploads/posts/ckeditor/');
      return {
        loader: loader,
        url: 'http://localhost:3000' + '/uploads/posts/ckeditor/',
        upload: () => {
          return new Promise((resolve, reject) => {
            console.log('the file we got was', loader.file);
            let form = new FormData();
            form.append('image', loader.file);
            this.service.ckeditorSaveImage(form).subscribe((data: any) => {
              resolve({default: 'http://localhost:3000' + '/uploads/posts/ckeditor/' + data.filename});
            });
          });
        },
        abort:() => {
          console.log('UploadAdapter abort');
        }
      }
    };
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
    formData.append('description', this.validateForm.get('description').value);
    formData.append('content', this.validateForm.get('content').value);
    formData.append('alt', this.validateForm.get('alt').value);
    this.uploading = true;
    this.service.postPost(formData)
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

}
