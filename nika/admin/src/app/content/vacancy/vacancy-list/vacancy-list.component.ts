import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {NzModalService} from "ng-zorro-antd";
import {VacancyService} from "../../../shared/services/vacancy.service";

@Component({
  selector: 'app-vacancy-list',
  templateUrl: './vacancy-list.component.html',
  styleUrls: ['./vacancy-list.component.css']
})
export class VacancyListComponent implements OnInit {

  vacancy:any[] = [];
  url;
  constructor(private service: VacancyService, private modalService: NzModalService, private router: Router) { }

  ngOnInit() {
    this.url = this.service.url + '/uploads/vacancy/';
    this.service.getVacancy().subscribe((data:any[]) => {
      this.vacancy = data;
    })
  }

  edit(vacancy) {
    this.service.candidateVacancy = vacancy;
    this.router.navigate(['changeVacancy'])
  }

  delete(vacancy) {
    this.service.candidateVacancy = vacancy;
    this.service.deleteVacancy(vacancy).subscribe((data) => {
      this.vacancy = this.vacancy.filter(items => items._id !== vacancy._id);
    })
  }
  showDeleteConfirm(vacancy): void {
    this.modalService.confirm({
      nzTitle: 'Are you sure delete this vacancy ?',
      nzContent: '<b style="color: red;">Some descriptions</b>',
      nzOkText: 'Yes',
      nzOkType: 'danger',
      nzOnOk: () => this.delete(vacancy),
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });
  }
  addVacancy() {
    this.router.navigate(['addVacancy'])
  }

}
