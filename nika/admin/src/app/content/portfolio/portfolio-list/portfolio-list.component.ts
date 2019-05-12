import { Component, OnInit } from '@angular/core';
import {MediaService} from "../../../shared/services/media.service";
import {Router} from "@angular/router";
import {NzModalService} from "ng-zorro-antd";
import {PortfolioService} from "../../../shared/services/portfolio.service";

@Component({
  selector: 'app-portfolio-list',
  templateUrl: './portfolio-list.component.html',
  styleUrls: ['./portfolio-list.component.css']
})
export class PortfolioListComponent implements OnInit {
  isVisible = false;
  isOkLoading = false;
  portfolios: any = [];
  images: [];
  url;
  constructor(private service: PortfolioService, private router: Router,  private modalService: NzModalService) { }

  ngOnInit() {
    this.url = this.service.url + '/uploads/portfolio/';
    this.service.getPortfolio().subscribe((data) => {
      this.portfolios = data;
    })
  }

  edit(portfolio) {
    this.service.candidatePortfolio = portfolio;
    this.router.navigate(['changePortfolio'])
  }

  delete(portfolio) {
    this.service.candidatePortfolio = portfolio;
    this.service.deletePortfolio(portfolio).subscribe((data) => {
      this.portfolios = this.portfolios.filter(items => items._id !== portfolio._id);
    })
  }

  addPortfolio() {
    this.router.navigate(['addPortfolio'])
  }

  showDeleteConfirm(data): void {
    this.modalService.confirm({
      nzTitle: 'Are you sure delete this portfolio ?',
      nzContent: '<b style="color: red;">Some descriptions</b>',
      nzOkText: 'Yes',
      nzOkType: 'danger',
      nzOnOk: () => this.delete(data),
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });
  }
  showModal(images): void {
    this.images = images;
    this.isVisible = true;
  }

  handleOk(): void {
    this.isOkLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isOkLoading = false;
    }, 3000);
  }

  handleCancel(): void {
    this.isVisible = false;
  }


}
