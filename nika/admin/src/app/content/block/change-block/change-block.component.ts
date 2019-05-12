import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {NzMessageService, UploadFile} from "ng-zorro-antd";
import {PostsService} from "../../../shared/services/posts.service";
import {PortfolioService} from "../../../shared/services/portfolio.service";
import {BlockService} from "../../../shared/services/block.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-change-block',
  templateUrl: './change-block.component.html',
  styleUrls: ['./change-block.component.css']
})
export class ChangeBlockComponent implements OnInit {
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

  constructor(private postService: PostsService,private portfolioService: PortfolioService, private fb: FormBuilder, private msg: NzMessageService, private service: BlockService, private router: Router) {
    this.candidate = this.service.candidateBlock;
    this.selectedType = this.candidate.type;
    this.selectedSize = this.candidate.size;

  }

  ngOnInit(): void {
    if(!this.service.candidateBlock) {
      this.router.navigate(['block'])
    }
    let type = this.candidate.type;
    if(type === 'image' || type === 'imagetext') {
      this.selectedImageSize = this.candidate[type].size;
    } else if(type === 'blog') {
      this.postService.getPosts().subscribe((data: []) => {
        this.tagValue = this.candidate.blog.post;
        this.allItems = data;
      })
    } else if(type === 'project'){
      this.portfolioService.getPortfolio().subscribe((data: []) => {
        this.selectedBlockPost = this.candidate.project.post;
        this.allItems = data;
      })
    }
    this.validateForm = new FormGroup({
      blog: new FormControl(this.candidate[type].post, [Validators.required]),
      url: new FormControl(this.candidate[type].url, [Validators.required]),
      img: new FormControl(this.candidate[type].img, [Validators.required]),
      image: new FormControl(this.candidate[type].image, [Validators.required]),
      load: new FormControl(this.candidate[type].load, [Validators.required]),
      size: new FormControl(this.candidate.size, [Validators.required]),
      type: new FormControl(this.candidate.type, [Validators.required]),
      music: new FormControl(this.candidate[type].music, [Validators.required]),
      gif: new FormControl(this.candidate[type].gif, [Validators.required]),
      imagesize: new FormControl(this.candidate[type].size, [Validators.required]),
      bgcolor: new FormControl(this.candidate[type].bgcolor, [Validators.required]),
      hovertext: new FormControl(this.candidate[type].hovertext, [Validators.required]),
      subtitle: new FormControl(this.candidate[type].subtitle, [Validators.required]),
      title: new FormControl(this.candidate[type].title, [Validators.required]),
      portfolio: new FormControl(this.candidate[type].portfolio, [Validators.required]),
      description: new FormControl(this.candidate[type].description, [Validators.required]),
    });
    this.validate(type);
    console.log(this.validateForm.value);
  }

  handleUpload(): void {
    let form = new FormData();
    switch (this.selectedType) {
      case 'blog': {
        form.append('type',this.validateForm.get('type').value);
        form.append('size',this.validateForm.get('size').value);
        form.append('post',JSON.stringify(this.tagValue));
      }break;
      case 'project': {
        form.append('type', this.validateForm.get('type').value);
        form.append('size', this.validateForm.get('size').value);
        form.append('portfolio',JSON.stringify(this.selectedBlockPost));
      }break;
      case 'video': {
        form = new FormData();
        form.append('type', this.validateForm.get('type').value);
        form.append('size', this.validateForm.get('size').value);
        if (this.fileList.length > 0) {
          this.fileList.forEach((file: any) => {
            form.append('image', file);
          });
        } else {
          form.append('url', this.validateForm.get('url').value);
        }
      }break;
      case 'image': {
        if(this.fileList.length > 0) {
          this.fileList.forEach((file: any) => {
            form.append('image', file);
          });
        } else {
          form.append('img', this.validateForm.get('img').value);
        }
        form.append('load', this.validateForm.get('load').value);
        form.append('bgcolor', this.validateForm.get('bgcolor').value);
        form.append('hovertext', this.validateForm.get('hovertext').value);
        form.append('url', this.validateForm.get('url').value);
        form.append('imagesize', this.validateForm.get('imagesize').value);
        form.append('type', this.validateForm.get('type').value);
        form.append('size', this.validateForm.get('size').value);
      }break;
      case 'gif': {
        if(this.fileList.length > 0) {
          this.fileList.forEach((file: any) => {
            form.append('image', file);
          });
        } else {
          form.append('gif', this.validateForm.get('gif').value);
          form.append('music', this.validateForm.get('music').value);
        }
        form.append('load', this.validateForm.get('load').value);
        form.append('bgcolor', this.validateForm.get('bgcolor').value);
        form.append('hovertext', this.validateForm.get('hovertext').value);
        form.append('url', this.validateForm.get('url').value);
        form.append('imagesize', this.validateForm.get('imagesize').value);
        form.append('type', this.validateForm.get('type').value);
        form.append('size', this.validateForm.get('size').value);
      }break;
      case 'imagetext': {
        if(this.fileList.length > 0) {
          this.fileList.forEach((file: any) => {
            form.append('image', file);
          });
        } else {
          form.append('img', this.validateForm.get('img').value);
        }
        form.append('subtitle', this.validateForm.get('subtitle').value);
        form.append('title', this.validateForm.get('title').value);
        form.append('description', this.validateForm.get('description').value);
        form.append('url', this.validateForm.get('url').value);
        form.append('type', this.validateForm.get('type').value);
        form.append('size', this.validateForm.get('size').value);
      }break;
    }
    this.service.putBlock(this.candidate._id, form)
      .subscribe(
        () => {
          this.uploading = false;
          this.fileList = [];
          this.msg.success('upload successfully.');
          this.router.navigate(['block'])
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
      this.fileList[this.fileList.length] = event.target.files[0];
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      switch (this.selectedType) {
        case 'video': {
          this.validateForm.get('url').setValue(event.target.files[0].name);
        }break;
      }
      document.getElementById('#bb').style.backgroundColor = 'limegreen';
      reader.onload = (event) => {
        console.log(this.validateForm.value)
      }
    }
  }
  validate(type) {
    switch (type) {
      case 'blog': {
        this.validateForm.get('blog').setValue(this.candidate[type].blog);
        this.validateForm.get('url').setValue('ss');
        this.validateForm.get('img').setValue('ss');
        this.validateForm.get('image').setValue('ss');
        this.validateForm.get('load').setValue('ss');
        this.validateForm.get('music').setValue('ss');
        this.validateForm.get('gif').setValue('ss');
        this.validateForm.get('imagesize').setValue('ss');
        this.validateForm.get('bgcolor').setValue('ss');
        this.validateForm.get('hovertext').setValue('ss');
        this.validateForm.get('subtitle').setValue('ss');
        this.validateForm.get('title').setValue('ss');
        this.validateForm.get('portfolio').setValue('ss');
        this.validateForm.get('description').setValue('ss');
      }break;
      case 'project': {
        this.validateForm.get('blog').setValue('ss');
        this.validateForm.get('url').setValue('ss');
        this.validateForm.get('img').setValue('ss');
        this.validateForm.get('image').setValue('ss');
        this.validateForm.get('load').setValue('ss');
        this.validateForm.get('music').setValue('ss');
        this.validateForm.get('gif').setValue('ss');
        this.validateForm.get('imagesize').setValue('ss');
        this.validateForm.get('bgcolor').setValue('ss');
        this.validateForm.get('hovertext').setValue('ss');
        this.validateForm.get('subtitle').setValue('ss');
        this.validateForm.get('title').setValue('ss');
        this.validateForm.get('portfolio').setValue(this.candidate[type].portfolio);
        this.validateForm.get('description').setValue('ss')
      }break;
      case 'video': {
        this.validateForm.get('blog').setValue('ss');
        this.validateForm.get('url').setValue(this.candidate[type].url);
        this.validateForm.get('img').setValue('ss');
        this.validateForm.get('image').setValue('ss');
        this.validateForm.get('load').setValue('ss');
        this.validateForm.get('music').setValue('ss');
        this.validateForm.get('gif').setValue('ss');
        this.validateForm.get('imagesize').setValue('ss');
        this.validateForm.get('bgcolor').setValue('ss');
        this.validateForm.get('hovertext').setValue('ss');
        this.validateForm.get('subtitle').setValue('ss');
        this.validateForm.get('title').setValue('ss');
        this.validateForm.get('portfolio').setValue('ss');
        this.validateForm.get('description').setValue('ss')
      }break;
      case 'image': {
        this.validateForm.get('blog').setValue('ss');
        this.validateForm.get('url').setValue(this.candidate[type].url);
        this.validateForm.get('img').setValue(this.candidate[type].img);
        this.validateForm.get('image').setValue('ss');
        this.validateForm.get('load').setValue(this.candidate[type].load);
        this.validateForm.get('music').setValue('ss');
        this.validateForm.get('gif').setValue('ss');
        this.validateForm.get('imagesize').setValue(this.candidate[type].size);
        this.validateForm.get('bgcolor').setValue(this.candidate[type].bgcolor);
        this.validateForm.get('hovertext').setValue(this.candidate[type].hovertext);
        this.validateForm.get('subtitle').setValue('ss');
        this.validateForm.get('title').setValue('ss');
        this.validateForm.get('portfolio').setValue('ss');
        this.validateForm.get('description').setValue('ss');
      }break;
      case 'gif': {
        this.validateForm.get('blog').setValue('ss');
        this.validateForm.get('url').setValue(this.candidate[type].url);
        this.validateForm.get('img').setValue('ss');
        this.validateForm.get('image').setValue('ss');
        this.validateForm.get('load').setValue(this.candidate[type].load);
        this.validateForm.get('music').setValue(this.candidate[type].music);
        this.validateForm.get('gif').setValue(this.candidate[type].gif);
        this.validateForm.get('imagesize').setValue(this.candidate[type].size);
        this.selectedImageSize = this.candidate[type].size;
        this.validateForm.get('bgcolor').setValue(this.candidate[type].bgcolor);
        this.validateForm.get('hovertext').setValue(this.candidate[type].hovertext);
        this.validateForm.get('subtitle').setValue('ss');
        this.validateForm.get('title').setValue('ss');
        this.validateForm.get('portfolio').setValue('ss');
        this.validateForm.get('description').setValue('ss')
      }break;
      case 'imagetext': {
        this.validateForm.get('blog').setValue('ss');
        this.validateForm.get('url').setValue(this.candidate[type].url);
        this.validateForm.get('img').setValue(this.candidate[type].img);
        this.validateForm.get('image').setValue('ss');
        this.validateForm.get('load').setValue('ss');
        this.validateForm.get('music').setValue('ss');
        this.validateForm.get('gif').setValue('ss');
        this.validateForm.get('imagesize').setValue('ss');
        this.validateForm.get('bgcolor').setValue('ss');
        this.validateForm.get('hovertext').setValue('ss');
        this.validateForm.get('subtitle').setValue(this.candidate[type].subtitle);
        this.validateForm.get('title').setValue(this.candidate[type].title);
        this.validateForm.get('portfolio').setValue('ss');
        this.validateForm.get('description').setValue(this.candidate[type].description)
      }break;
    }
  }
}
