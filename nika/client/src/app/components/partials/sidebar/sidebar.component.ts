import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {Location} from '@angular/common';
import {MenuService} from '../../../_services/menu.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

    route: string;
    menuText;

    constructor(location: Location, router: Router, private menuService: MenuService) {
        router.events.subscribe((val) => {
            // console.log(location.path())
        });
    }

    ngOnInit(): void {
        this.getMenuText();
    }

    getMenuText() {
        this.menuService.getMenuText().subscribe(date => {
            this.menuText = date || 'You  can creat this content in admin panel Settings/key = menu-text';
        });
    }

}



