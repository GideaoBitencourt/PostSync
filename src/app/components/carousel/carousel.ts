import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';

export interface CarouselImage {
  src: string;
  alt?: string;
  caption?: string;
}

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousel.html',
  styleUrl: './carousel.css',
})
export class Carousel implements OnInit, OnDestroy {

  images: CarouselImage[] = [
    { src: 'assets/abastecendo.jpeg', alt: 'Abastecendo carro' },
    { src: 'assets/homem-abastecendo.jpg', alt: 'homem abastecendo' },
    { src: 'assets/computador-postsync.jpg', alt: 'computador com software postsync' }
  ];
 
  autoplay = true;
  intervalMs = 3000;
 
  currentIndex = 0;
  private timerId?: ReturnType<typeof setInterval>;
  
  ngOnInit(): void {
    this.startAutoplay();
  }
 
  ngOnDestroy(): void {
    this.stopAutoplay();
  }
 
  next(): void {
    if (!this.images.length) return;
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }
 
  prev(): void {
    if (!this.images.length) return;
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
  }
 
  goTo(index: number): void {
    this.currentIndex = index;
  }
 
  startAutoplay(): void {
    if (!this.autoplay || this.images.length <= 1) return;
    this.stopAutoplay();
    this.timerId = setInterval(() => this.next(), this.intervalMs);
  }
 
  stopAutoplay(): void {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = undefined;
    }
  }
}
