import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import {LoaderService, LoaderState} from '../../service/loader.service';
import {Logger} from '../../../core/logger.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {
  private readonly log = new Logger(this.constructor.name);
  loading: boolean;

  constructor(private loaderService: LoaderService) {
    this.loaderService.isLoading.subscribe((v) => {
      this.loading = v;
    })
   }

  ngOnInit(): void {
  }

}
