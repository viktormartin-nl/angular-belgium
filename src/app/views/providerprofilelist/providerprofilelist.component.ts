import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/shared/interface/user.interface';
import { UserService } from 'src/app/shared/service/users/user.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-provider-profile-list',
  templateUrl: './providerprofilelist.component.html',
  styleUrls: ['./providerprofilelist.component.scss']
})
export class ProviderProfileListComponent implements OnInit {

  loggedInUser = localStorage.getItem('loggedInUser');
  userId: number = this.loggedInUser ? JSON.parse(this.loggedInUser).id : 1;

  constructor(private userService: UserService) {
  }

  imageObject = [{
    image: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/5.jpg',
    thumbImage: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/5.jpg',
  }, {
    image: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/9.jpg',
    thumbImage: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/9.jpg'
  }, {
    image: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/4.jpg',
    thumbImage: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/4.jpg',
  }, {
    image: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/7.jpg',
    thumbImage: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/7.jpg',
  }, {
    image: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/1.jpg',
    thumbImage: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/1.jpg'
  }, {
    image: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/2.jpg',
    thumbImage: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/2.jpg',
  }];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // Example data array
  providerProfile = [
    { name: 'Item 1' },
    { name: 'Item 2' },
    { name: 'Item 3' },
    { name: 'Item 3' },
    { name: 'Item 3' },
    { name: 'Item 3' },
    { name: 'Item 3' },
    { name: 'Item 3' },
    { name: 'Item 3' },
    { name: 'Item 3' },
    { name: 'Item 3' },
    { name: 'Item 3' },
    { name: 'Item 3' },
    { name: 'Item 3' },
    { name: 'Item 3' },
    // Add more items as needed
  ];

  // Paginator options
  pageSize = 6;
  pageSizeOptions: number[] = [6];
  pageIndex = 0;

  // Event handler for page changes
  onPageChange(event: PageEvent) {
    console.log(this.providerProfile.slice(this.pageIndex * this.pageSize, (this.pageIndex + 1) * this.pageSize));
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
  }

  ngOnInit() {
  }
}
