import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/interface/user.interface';
import { UserService } from 'src/app/shared/service/users/user.service';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-profileview',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  loggedInUser = localStorage.getItem('loggedInUser');
  userId: number = this.loggedInUser ? JSON.parse(this.loggedInUser).id : 1;

  constructor(private userService: UserService) {

  }

  ngOnInit() {
    this.aaddresses = [{
      id: "1",
      email: "emailaddress",
      type: "user/serviceProvider/additional",
      address: 'Rue de la Loi 20, 1000 Bruxelles, Belgium',
      street: "Quai des Usines",
      no: "20",
      flatNo: "23",
      state: "Bruxelles",
      city: "Bruxelles",
      postCode: "1000",
      country: "Belgium",
      Longitude: "4.3643164",
      Latitude: "50.8756265",
      createdDate: "",
      udpatedDate: ""
    },
    {
      id: "1",
      email: "emailaddress",
      type: "user/serviceProvider/additional",
      address: 'Rue de la Loi 20, 1000 Bruxelles, Belgium',
      street: "Rue de la Loi",
      no: "20",
      flatNo: "23",
      state: "Bruxelles",
      city: "Bruxelles",
      postCode: "1000",
      country: "Belgium",
      Longitude: "4.3673384",
      Latitude: "50.84598769999999",
      createdDate: "",
      udpatedDate: ""
    },]
  }
  aaddresses!: object[];

  // Handle the same state of Billing and Request address
  sameRequestAndBilling: boolean = false;
  toggleCheckbox() {
    this.sameRequestAndBilling = !this.sameRequestAndBilling;
  }

  // Handle attached file

  onFileChange(event: any) {
    const files = event.target.files as FileList;
    const file: File = files[0];
    console.log(file);

    // if(file) {
    //   this.fileName = URL.createObjectURL(files[0]);
    //   console.log(this.fileName);
    //   const formData = new FormData();
    //   formData.append('photo', file);
    //   const upload$ = this.userService.fileUpload(this.userId, formData);
    //   upload$.subscribe(
    //     (success) => {
    //       console.log('Upload successful:', success);
    //     },
    //     (error) => {
    //       console.error('Upload error:', error);
    //     },
    //     () => {
    //       console.log('Upload complete');
    //     }
    //   );
    //   this.resetInput();
    // }
  }

  // Request Address

  addresses: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];

  requestAddresses: string[] = [...this.addresses];
  billingAddresses: string[] = [...this.addresses];
  selectedRequestAddress: string = this.addresses[0];
  selectedBillingAddress: string = this.addresses[0];

  addingAddress: string = '';

  isVisibleRequestAddress: boolean = false;
  isVisibleBillingAddress: boolean = false;

  visibleAddress(type: string) {
    if (type == 'request') {
      this.isVisibleRequestAddress = !this.isVisibleRequestAddress;
    } else if (type == 'billing') {
      this.isVisibleBillingAddress = !this.isVisibleBillingAddress;
    }
  }

  display: any;
  requestCenter: google.maps.LatLngLiteral = {
    lat: 50.8503,
    lng: 4.3517
  };
  billingCenter: google.maps.LatLngLiteral = {
    lat: 50.8503,
    lng: 4.3517
  };
  zoom = 10;
  markerOptions: google.maps.MarkerOptions = {
    draggable: false
  };
  options: any = {
    componentRestrictions: {}
  }
  handleRequestAddressChange(address: Address) {
    this.addingAddress = address.formatted_address;
    this.requestCenter = {
      lat: address.geometry.location.lat(),
      lng: address.geometry.location.lng()
    }
  }
  handleBillingAddressChange(address: Address) {
    this.addingAddress = address.formatted_address;
    this.billingCenter = {
      lat: address.geometry.location.lat(),
      lng: address.geometry.location.lng()
    }
  }

  addAddress(type: string) {
    if (this.addingAddress != '') {
      if (type === 'request') {
        this.requestAddresses.push(this.addingAddress);
        this.addingAddress = '';
      } else {
        this.billingAddresses.push(this.addingAddress);
        this.addingAddress = '';
      }
    }
  }

  payment() {
  }

}
