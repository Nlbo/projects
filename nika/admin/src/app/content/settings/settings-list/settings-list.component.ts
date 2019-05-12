import {Component, OnInit, ViewChild} from '@angular/core';
import {SettingsService} from "../../../shared/services/settings.service";
import {Router} from "@angular/router";
import {NzModalService} from "ng-zorro-antd";

@Component({
  selector: 'app-settings-list',
  templateUrl: './settings-list.component.html',
  styleUrls: ['./settings-list.component.css']
})
export class SettingsListComponent implements OnInit {
settings: any = [];
key = '';
value = '';
flag = true;
  @ViewChild('input')input;

  constructor(private service: SettingsService, private modalService: NzModalService) { }

  ngOnInit() {
    this.service.getSettings().subscribe((data: any[]) => {
      this.settings = data;
    })
  }
  add() {
    let settings = {
      key: this.key,
      value: this.value
    };
    this.service.addSettings(settings).subscribe((data) => {
      let items = this.settings;
      items.push(settings);
      this.settings = items;
      this.key = '';
      this.value = '';
      console.log(this.settings)
    })
  }

  edit(key , val,input, par, but) {
    let inp = document.getElementById(input);
    let p = document.getElementById(par);
    let button = document.getElementById(but);
    this.input = val;
    inp['type'] = 'text';
    inp.style.display = 'inline-block';
    p.style.display = 'none';
    button.style.display = 'inline-block';
  }

  delete(key) {
    this.service.deleteSettings(key).subscribe((data) => {
      this.settings = this.settings.filter(item => item.key !== key);
    })
  }
  change(key, val, input, but, par) {
    let inp = document.getElementById(input);
    let p = document.getElementById(par);
    let button = document.getElementById(but);
    let data = {
      key: key,
      value: val
    };
    this.service.changeSettings(data).subscribe((data) => {
      inp['type'] = 'hidden';
      p.innerHTML = val;
      p.style.display = 'block';
      button.style.display = 'none';
    })
  }

  showDeleteConfirm(data): void {
    this.modalService.confirm({
      nzTitle: 'Are you sure delete this settings ?',
      nzContent: '<b style="color: red;">Some descriptions</b>',
      nzOkText: 'Yes',
      nzOkType: 'danger',
      nzOnOk: () => this.delete(data),
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });
  }
}
