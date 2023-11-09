import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/interface/user.interface';
import { UserService } from 'src/app/shared/service/users/user.service';

@Component({
  selector: 'app-profileview',
  templateUrl: './profileview.component.html',
  styleUrls: ['./profileview.component.scss']
})
export class ProfileViewComponent implements OnInit {
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

  ngOnInit() {
    this.userService.getProfile(this.userId).subscribe({
      next: (user: User) => {
        console.log(user);
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.gender = user.gender;

        const dateString = user.DOB;
        const modifiedDateString = dateString.replace("T", " ").replace("Z", "");
        const timestamp = Date.parse(modifiedDateString);
        const date = new Date(timestamp);
        this.DOB = date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear();

        this.phoneNumber = user.phoneNumber;
        this.alternatePhNo = user.alternatePhNo;
        this.address = user.userAddress.address;
        const language = ['English', 'Chinese'];
        this.spokenLanguage = language.join(', ');
        console.log(user.userAdditionalInfo.socialMediaLinks);
        this.higherEducation = user.userAdditionalInfo.higherEducation;
        this.instagram = user.userAdditionalInfo.socialMediaLinks.instagram;
        this.linkedIn = user.userAdditionalInfo.socialMediaLinks.linkedIn;
        this.facebook = user.userAdditionalInfo.socialMediaLinks.facebook;
        this.twitter = user.userAdditionalInfo.socialMediaLinks.twitter;
      },
    });
  }
}
