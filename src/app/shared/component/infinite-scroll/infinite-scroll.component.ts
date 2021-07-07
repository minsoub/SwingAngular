import {AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-infinite-scroll',
  templateUrl: './infinite-scroll.component.html',
  styleUrls: ['./infinite-scroll.component.css']
})
export class InfiniteScrollComponent implements OnInit, AfterViewInit, OnDestroy {
  @Output() scrolled = new EventEmitter();
  @ViewChild('anchor') anchor: ElementRef<HTMLElement>;

  private observer: IntersectionObserver;
  private element = this.host.nativeElement;

  constructor(private host: ElementRef) {}

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    const options = {
      root: this.isHostScrollable() ? this.host.nativeElement : null
    };

    this.observer = new IntersectionObserver(([entry]) => {
      // tslint:disable-next-line:no-unused-expression
      entry.isIntersecting && this.scrolled.emit();
    }, options);

    this.observer.observe(this.anchor.nativeElement);
  }

  private isHostScrollable(): boolean {
    const style = window.getComputedStyle(this.element);

    // return style.getPropertyValue('overflow') === 'auto' ||
    //     style.getPropertyValue('overflow-y') === 'scroll';
    return true;
  }

  ngOnDestroy(): void {
    this.observer.disconnect();
  }

}