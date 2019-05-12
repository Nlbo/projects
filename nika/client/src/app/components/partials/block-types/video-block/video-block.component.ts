import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';

@Component({
    selector: 'app-video-block',
    templateUrl: './video-block.component.html',
    styleUrls: ['./video-block.component.scss']
})
export class VideoBlockComponent implements OnInit {

    @Input() block;
    @ViewChild(`videoElement`) videoElement: ElementRef;
    @ViewChild(`videoLogo`) videoLogo: ElementRef;
    play = false;
    muted = true;

    constructor() {
    }

    ngOnInit() {
    }

    toggleAutoplay() {
        this.muted = !this.muted;
        this.play = !this.play;
        this.play ? this.videoElement.nativeElement.play() : this.videoElement.nativeElement.pause();
        this.play ? this.videoLogo.nativeElement.style.display = 'none' : this.videoLogo.nativeElement.style.display = 'block';
    }

}
