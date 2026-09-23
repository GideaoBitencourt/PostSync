import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Carousel } from '../../components/carousel/carousel';


@Component({
  selector: 'app-post-sync',
  imports: [CommonModule, Carousel],
  templateUrl: './post-sync.html',
  styleUrl: './post-sync.css',
})
export class PostSync {

}
