import { Component, OnInit } from '@angular/core';
import {PostsService} from "../../../shared/services/posts.service";
import {Router} from "@angular/router";
import {NzModalService} from "ng-zorro-antd";

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit {
  posts: any = [];
  items;
  tables: string[] = ['title', 'description'];
  searchValue;
  selectedValue = 'title';
  url;
  isVisibleMiddle = false;
  constructor(private service: PostsService, private router: Router, private modalService: NzModalService) {
  }

  ngOnInit() {
    this.url = this.service.url + '/uploads/posts/';
    this.service.getPosts().subscribe((data) => {
      this.posts = data;
      this.items = data;
    })
  }

  edit(post) {
    this.service.candidatePost = post;
    this.router.navigate(['changePost'])
  }

  delete(post) {
    this.service.candidatePost = post;
    this.service.deletePosts(post).subscribe((data) => {
      this.items = this.items.filter(items => items._id !== post._id);
      this.posts = this.posts.filter(items => items._id !== post._id);
    })
  }

  addPost() {
    this.router.navigate(['addPost'])
  }

  filter(val) {
    if (val && typeof(this.items[0][this.selectedValue]) !== 'number') {
      this.posts = this.items
        .filter(item => item[this.selectedValue + ''].toLocaleLowerCase().indexOf(val.toLocaleLowerCase()) >= 0);
    } else if (val && typeof(this.items[0][this.selectedValue]) === 'number') {
      this.posts = this.items
        .filter(item => (item[this.selectedValue + ''] + '').indexOf(val + '') >= 0);
    } else {
      this.posts = this.items;
    }
  }

  showModalMiddle(): void {
    this.isVisibleMiddle = true;
  }

  handleOkMiddle(): void {
    console.log('click ok');
    this.isVisibleMiddle = false;
  }

  handleCancelMiddle(): void {
    this.isVisibleMiddle = false;
  }
  showDeleteConfirm(data): void {
    this.modalService.confirm({
      nzTitle: 'Are you sure delete this post?',
      nzContent: '<b style="color: red;">Some descriptions</b>',
      nzOkText: 'Yes',
      nzOkType: 'danger',
      nzOnOk: () => this.delete(data),
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });
  }
}
