import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NzMessageService, UploadFile} from 'ng-zorro-antd';
import {PostsService} from '../../../shared/services/posts.service';
import {PortfolioService} from '../../../shared/services/portfolio.service';
import {Router} from '@angular/router';
import {BlockService} from '../../../shared/services/block.service';

@Component({
  selector: 'app-add-block',
  templateUrl: './add-block.component.html',
  styleUrls: ['./add-block.component.css']
})
export class AddBlockComponent implements OnInit {

  tagValue = [];


  validateForm: FormGroup;
  uploading = false;
  fileList: UploadFile[] = [];
  selectedSize = '';
  selectedType = '';
  selectedBlockPost = [];
  selectedImageSize = '';
  typeData = ['portfolio', 'post'];
  allItems = [];
  candidate;
  click = 0;

  constructor(private postService: PostsService, private portfolioService: PortfolioService, private fb: FormBuilder, private msg: NzMessageService, private service: BlockService, private router: Router) {
  }

  ngOnInit(): void {


    this.validateForm = new FormGroup({
      blog: new FormControl(' ', [Validators.required]),
      url: new FormControl(' ', [Validators.required]),
      image: new FormControl(' ', [Validators.required]),
      load: new FormControl(' ', [Validators.required]),
      size: new FormControl(' ', [Validators.required]),
      type: new FormControl(' ', [Validators.required]),
      imagesize: new FormControl(' ', [Validators.required]),
      bgcolor: new FormControl(' ', [Validators.required]),
      hovertext: new FormControl(' ', [Validators.required]),
      subtitle: new FormControl(' ', [Validators.required]),
      title: new FormControl(' ', [Validators.required]),
      portfolio: new FormControl(' ', [Validators.required]),
      description: new FormControl(' ', [Validators.required]),
    });
  }

  handleUpload(): void {
    let form = new FormData();
    switch (this.selectedType) {
      case 'blog': {
        form.append('type', this.selectedType);
        form.append('size', this.selectedSize);
        form.append('post', JSON.stringify(this.validateForm.get('blog').value));
      }
                   break;
      case 'project': {
        form.append('type', this.selectedType);
        form.append('size', this.selectedSize);
        form.append('portfolio', JSON.stringify(this.validateForm.get('portfolio').value));
      }
                      break;
      case 'video': {
        form = new FormData();
        form.append('type', this.selectedType);
        form.append('size', this.selectedSize);
        if (this.fileList.length > 0) {
          this.fileList.forEach((file: any) => {
            form.append('image', file);
          });
        } else {
          form.append('url', this.validateForm.get('url').value);
        }
      }
                    break;
      case 'image': {
        this.fileList.forEach((file: any) => {
          form.append('image', file);
        });
        form.append('load', this.validateForm.get('load').value);
        form.append('bgcolor', this.validateForm.get('bgcolor').value);
        form.append('hovertext', this.validateForm.get('hovertext').value);
        form.append('url', this.validateForm.get('url').value);
        form.append('imagesize', this.validateForm.get('imagesize').value);
        form.append('type', this.selectedType);
        form.append('size', this.selectedSize);
      }
                    break;
      case 'gif': {
        this.fileList.forEach((file: any) => {
          form.append('image', file);
        });
        form.append('load', this.validateForm.get('load').value);
        form.append('bgcolor', this.validateForm.get('bgcolor').value);
        form.append('hovertext', this.validateForm.get('hovertext').value);
        form.append('url', this.validateForm.get('url').value);
        form.append('imagesize', this.validateForm.get('imagesize').value);
        form.append('type', this.selectedType);
        form.append('size', this.selectedSize);
        console.log('$$$$$$$$$$$$$$$$$$$$$$$$');
        console.log(form);
        console.log(this.validateForm.get('load').value);
        console.log('$$$$$$$$$$$$$$$$$$$$$$$$');
      }
                  break;
      case 'imagetext': {
        this.fileList.forEach((file: any) => {
          form.append('image', file);
        });
        form.append('subtitle', this.validateForm.get('subtitle').value);
        form.append('title', this.validateForm.get('title').value);
        form.append('description', this.validateForm.get('description').value);
        form.append('url', this.validateForm.get('url').value);
        form.append('type', this.selectedType);
        form.append('size', this.selectedSize);
      }
                        break;
    }
    console.log(this.validateForm.value);
    this.service.postBlock(form)
      .subscribe(
        () => {
          this.uploading = false;
          this.fileList = [];
          this.msg.success('upload successfully.');
          this.router.navigate(['block']);
        },
        () => {
          this.uploading = false;
          this.msg.error('upload failed.');
        }
      );
  }

  foo(item) {
    this.validate(item);
    switch (item) {
      case 'blog':
        this.postService.getPosts().subscribe((data: []) => this.allItems = data);
        break;
      case 'project':
        this.portfolioService.getPortfolio().subscribe((data: []) => this.allItems = data);
        break;
    }
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      this.fileList[this.fileList.length] = event.target.files[0];
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      switch (this.selectedType) {
        case 'video': {
          this.validateForm.get('url').setValue(event.target.files[0].name);
        }
                      break;
      }
      document.getElementById('#bb').style.backgroundColor = 'limegreen';
      reader.onload = (event) => {
        console.log(this.validateForm.value);
      };
    }
  }

  validate(type) {
    switch (type) {
      case 'blog': {
        this.validateForm.get('blog').setValue('');
        this.validateForm.get('url').setValue('ss');
        this.validateForm.get('load').setValue('ss');
        this.validateForm.get('imagesize').setValue('ss');
        this.validateForm.get('bgcolor').setValue('ss');
        this.validateForm.get('hovertext').setValue('ss');
        this.validateForm.get('subtitle').setValue('ss');
        this.validateForm.get('title').setValue('ss');
        this.validateForm.get('portfolio').setValue('ss');
        this.validateForm.get('description').setValue('ss');
        this.validateForm.get('image').setValue('ss');
      }
                   break;
      case 'project': {
        this.validateForm.get('blog').setValue('ss');
        this.validateForm.get('url').setValue('ss');
        this.validateForm.get('load').setValue('ss');
        this.validateForm.get('imagesize').setValue('ss');
        this.validateForm.get('bgcolor').setValue('ss');
        this.validateForm.get('hovertext').setValue('ss');
        this.validateForm.get('subtitle').setValue('ss');
        this.validateForm.get('title').setValue('ss');
        this.validateForm.get('portfolio').setValue('');
        this.validateForm.get('description').setValue('ss');
        this.validateForm.get('image').setValue('ss');
      }
                      break;
      case 'video': {
        this.validateForm.get('blog').setValue('ss');
        this.validateForm.get('url').setValue('');
        this.validateForm.get('load').setValue('ss');
        this.validateForm.get('imagesize').setValue('ss');
        this.validateForm.get('bgcolor').setValue('ss');
        this.validateForm.get('hovertext').setValue('ss');
        this.validateForm.get('subtitle').setValue('ss');
        this.validateForm.get('title').setValue('ss');
        this.validateForm.get('portfolio').setValue('ss');
        this.validateForm.get('description').setValue('ss');
      }
                    break;
      case 'image': {
        this.validateForm.get('blog').setValue('ss');
        this.validateForm.get('url').setValue('');
        this.validateForm.get('load').setValue('');
        this.validateForm.get('imagesize').setValue('');
        this.validateForm.get('bgcolor').setValue('');
        this.validateForm.get('hovertext').setValue('');
        this.validateForm.get('subtitle').setValue('ss');
        this.validateForm.get('title').setValue('ss');
        this.validateForm.get('portfolio').setValue('ss');
        this.validateForm.get('description').setValue('ss');
      }
                    break;
      case 'gif': {
        this.validateForm.get('blog').setValue('ss');
        this.validateForm.get('url').setValue('');
        this.validateForm.get('load').setValue('');
        this.validateForm.get('imagesize').setValue('');
        this.validateForm.get('bgcolor').setValue('');
        this.validateForm.get('hovertext').setValue('');
        this.validateForm.get('subtitle').setValue('ss');
        this.validateForm.get('title').setValue('ss');
        this.validateForm.get('portfolio').setValue('ss');
        this.validateForm.get('description').setValue('ss');
      }
                  break;
      case 'imagetext': {
        this.validateForm.get('blog').setValue('ss');
        this.validateForm.get('url').setValue('');
        this.validateForm.get('load').setValue('ss');
        this.validateForm.get('imagesize').setValue('ss');
        this.validateForm.get('bgcolor').setValue('ss');
        this.validateForm.get('hovertext').setValue('ss');
        this.validateForm.get('subtitle').setValue('');
        this.validateForm.get('title').setValue('');
        this.validateForm.get('portfolio').setValue('ss');
        this.validateForm.get('description').setValue('');
      }
                        break;
    }
  }
}
