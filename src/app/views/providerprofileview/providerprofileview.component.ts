import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/interface/user.interface';
import { UserService } from 'src/app/shared/service/users/user.service';

@Component({
  selector: 'app-provider-profile-view',
  templateUrl: './providerprofileview.component.html',
  styleUrls: ['./providerprofileview.component.scss']
})
export class ProviderProfileViewComponent implements OnInit {
  fileName: string = '';
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  gender: string = '';
  DOB: string = '';
  phoneNumber: string = '';
  alternatePhNo: string = '';
  address: string = '';
  spokenLanguage: string = '';
  higherEducation: string = '';
  instagram: string = '';
  linkedIn: string = '';
  facebook: string = '';
  twitter: string = '';

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

  selected!: Date;

  ngOnInit() {
    // this.userService.getProfile(this.userId).subscribe({
    //   next: (user: User) => {
    //     console.log(user);
    //     this.fileName = user.userPhoto.photo;
    //     this.firstName = user.firstName;
    //     this.lastName = user.lastName;
    //     this.email = user.email;
    //     this.gender = user.gender;

    //     const dateString = user.DOB;
    //     const modifiedDateString = dateString.replace("T", " ").replace("Z", "");
    //     const timestamp = Date.parse(modifiedDateString);
    //     const date = new Date(timestamp);
    //     this.DOB = date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear();

    //     this.phoneNumber = user.phoneNumber;
    //     this.alternatePhNo = user.alternatePhNo;
    //     this.address = user.userAddress.address;
    //     const language = user.userAdditionalInfo.spokenLanguage;
    //     this.spokenLanguage = language.join(', ');
    //     console.log(user.userAdditionalInfo.socialMediaLinks);
    //     this.higherEducation = user.userAdditionalInfo.higherEducation;
    //     this.instagram = user.userAdditionalInfo.socialMediaLinks.instagram;
    //     this.linkedIn = user.userAdditionalInfo.socialMediaLinks.linkedIn;
    //     this.facebook = user.userAdditionalInfo.socialMediaLinks.facebook;
    //     this.twitter = user.userAdditionalInfo.socialMediaLinks.twitter;
    //   },
    // });
  }

  display: any;
  center: google.maps.LatLngLiteral = {
    lat: 50.8503,
    lng: 4.3517
  };
  zoom = 10;
  markerOptions: google.maps.MarkerOptions = {
    draggable: false
  };
  markerPositions: google.maps.LatLngLiteral[] = [];
  addMarker(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.markerPositions.push(event.latLng.toJSON());
  }
}
