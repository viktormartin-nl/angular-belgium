import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { User } from 'src/app/shared/interface/user.interface';
import { UserService } from 'src/app/shared/service/users/user.service';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profileview',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  loggedInUser = localStorage.getItem('loggedInUser');
  userId: number = this.loggedInUser ? JSON.parse(this.loggedInUser).id : 1;

  constructor(private userService: UserService, private snackBar: MatSnackBar) {

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

  addresses: string[] = [
    'Rue de la Loi 20, 1000 Bruxelles, Belgium',
    'Yorkshirelaan 20, Woluwe-Saint-Lambert, Brussels, Belgium',
    'Drève Olympique 2, Anderlecht, Brussels, Belgium',
    'Brussels Cemetery, Avenue du Cimetière de Bruxelles, Evere, Belgium'];

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

  handleAddressChange(address: Address, type: string) {
    this.addingAddress = address.formatted_address;
    if (type == 'request') {
      this.requestCenter = {
        lat: address.geometry.location.lat(),
        lng: address.geometry.location.lng()
      };
    } else if (type == 'billing') {
      this.billingCenter = {
        lat: address.geometry.location.lat(),
        lng: address.geometry.location.lng()
      };
    }

    const addingAddress: any = {};
    address.address_components.forEach(component => {
      if (component.types.includes('street_number')) {
        addingAddress.no = component.long_name;
      }
      if (component.types.includes('route')) {
        addingAddress.street = component.long_name;
      }
      if (component.types.includes('postal_code')) {
        addingAddress.postCode = component.long_name;
      }
      if (component.types.includes('locality')) {
        addingAddress.city = component.long_name;
      }
      if (component.types.includes('administrative_area_level_1')) {
        addingAddress.state = component.long_name;
      }
      if (component.types.includes('country')) {
        addingAddress.country = component.long_name;
      }
    });
    console.log(addingAddress);
  }

  @ViewChild('requestFlatNo') requestFlatNo!: ElementRef;
  @ViewChild('billingFlatNo') billingFlatNo!: ElementRef;

  addAddress(type: string) {
    if (this.addingAddress != '') {
      if (type === 'request') {
        if (this.requestFlatNo.nativeElement.value == '') {
          this.snackBar.open('Please Enter the Flat No!', 'warning', {
            duration: 3000
          });
        } else {
          this.requestAddresses.push(this.addingAddress);
          this.addingAddress = '';
        }
      } else {
        if (this.billingFlatNo.nativeElement.value == '') {
          this.snackBar.open('Please Enter the Flat No!', 'warning', {
            duration: 3000
          });
        } else {
          this.billingAddresses.push(this.addingAddress);
          this.addingAddress = '';
        }
      }
    }
  }


  payment() {
  }

}
