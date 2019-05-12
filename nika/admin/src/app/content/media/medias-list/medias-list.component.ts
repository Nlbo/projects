import { Component, OnInit } from '@angular/core';
import {MediaService} from "../../../shared/services/media.service";
import {Router} from "@angular/router";
import {NzModalService} from "ng-zorro-antd";

@Component({
  selector: 'app-medias-list',
  templateUrl: './medias-list.component.html',
  styleUrls: ['./medias-list.component.css']
})
export class MediasListComponent implements OnInit {
  medias: any = [];
  items;
  url;
  constructor(private service: MediaService, private router: Router,  private modalService: NzModalService) { }

  ngOnInit() {
    this.url = this.service.url + '/uploads/medias/';
    this.service.getMedias().subscribe((data) => {
      this.medias = data;
      this.items = data;
    })
  }

  edit(media) {
    this.service.candidateMedia = media;
    this.router.navigate(['changeMedia'])
  }

  delete(media) {
    this.service.candidateMedia = media;
    this.service.deleteMedia(media).subscribe((data) => {
      this.items = this.items.filter(items => items._id !== media._id);
      this.medias = this.medias.filter(items => items._id !== media._id);
    })
  }

  addMedia() {
    this.router.navigate(['addMedia'])
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
