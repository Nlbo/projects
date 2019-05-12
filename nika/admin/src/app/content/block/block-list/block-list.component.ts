import { Component, OnInit } from '@angular/core';
import {MenuService} from "../../../shared/services/menu.service";
import {Router} from "@angular/router";
import {NzModalService} from "ng-zorro-antd";
import {BlockService} from "../../../shared/services/block.service";

@Component({
  selector: 'app-block-list',
  templateUrl: './block-list.component.html',
  styleUrls: ['./block-list.component.css']
})
export class BlockListComponent implements OnInit {

  blocks = [];
  constructor(private service: BlockService, private router: Router, private modalService: NzModalService) { }

  ngOnInit() {
    this.service.getBlock().subscribe((data: []) => {
      this.blocks = data;
    });
  }
  add(){
    this.router.navigate(['addBlock']);
  };
  edit(block){
    this.service.candidateBlock = block;
    this.router.navigate(['changeBlock'])
  };
  remove(block){
    this.service.deleteBlock(block).subscribe((data) => {
      this.blocks = this.blocks.filter(item => item._id !== block._id)
    })
  };
  showDeleteConfirm(data): void {
    this.modalService.confirm({
      nzTitle: 'Are you sure delete this menu ?',
      nzContent: '<b style="color: red;">Some descriptions</b>',
      nzOkText: 'Yes',
      nzOkType: 'danger',
      nzOnOk: () => this.remove(data),
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });
  }


}
