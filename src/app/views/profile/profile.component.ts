import { HttpClient } from '@angular/common/http';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Observable, async, map, startWith } from 'rxjs';
import { User } from 'src/app/shared/interface/user.interface';
import { UserService } from 'src/app/shared/service/users/user.service';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppComponent } from 'src/app/app.component';
import { PhotoSelectModal } from "../../core/components/photoSelectModal/photo-select-modal.component";
import { PhotoFromFolderModal } from "../../core/components/PhotoFromFolderModal/photo-from-folder-modal.component";
import { PhotoFromCameraModal } from "../../core/components/PhotoFromCameraModal/photo-from-camera-modal.component";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  error_message: string = '';

  profileForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    // Gender: ['', Validators.required],
    DOB: ['', Validators.required],
    phoneNumber: ['', Validators.required],
    alternatePhNo: [''],
    address: ['', Validators.required],
    street: ['', Validators.required],
    no: ['', Validators.required],
    flatNo: ['', Validators.required],
    state: ['', Validators.required],
    city: ['', Validators.required],
    postCode: ['', Validators.required],
    country: ['', Validators.required],
    Longitude: ['', Validators.required],
    Latitude: ['', Validators.required],
    spokenLanguage: [[], Validators.required],
    higherEducation: [''],
    instagram: [''],
    linkedIn: [''],
    facebook: [''],
    twitter: [''],
  });

  loggedInUser = localStorage.getItem('loggedInUser');
  userId: number = this.loggedInUser ? JSON.parse(this.loggedInUser).id : 1;

  constructor(private fb: FormBuilder,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private sanitizer: DomSanitizer,
    public dialog: MatDialog) {
    this.languageList = this.allLanguages;
    this.filteredLanguages = this.langCtrl.valueChanges.pipe(
      startWith(null),
      map((language: string | null) => (language ? this._filter(language) : this.languageList.slice())),
    );
  }

  ngOnInit() {
    this.userService.getProfile(this.userId).subscribe({
      next: (user: User) => {
        console.log(user);
        this.profileForm = this.fb.group({
          photo: [user.userPhoto.photo],
          email: [user.email, [Validators.required, Validators.email]],
          password: [user.password, Validators.required],
          firstName: [user.firstName, Validators.required],
          lastName: [user.lastName, Validators.required],
          // Gender: ['male', Validators.required],
          DOB: [user.DOB, Validators.required],
          phoneNumber: [user.phoneNumber, Validators.required],
          alternatePhNo: [user.alternatePhNo],
          address: [user.userAddress.address, Validators.required],
          street: [user.userAddress.street, Validators.required],
          no: [user.userAddress.no, Validators.required],
          flatNo: [user.userAddress.flatNo, Validators.required],
          state: [user.userAddress.state, Validators.required],
          city: [user.userAddress.city, Validators.required],
          postCode: [user.userAddress.postCode, Validators.required],
          country: [user.userAddress.country, Validators.required],
          Longitude: [user.userAddress.Longitude, Validators.required],
          Latitude: [user.userAddress.Latitude, Validators.required],
          spokenLanguage: [user.userAdditionalInfo.spokenLanguage, Validators.required],
          higherEducation: [user.userAdditionalInfo.higherEducation],
          instagram: [user.userAdditionalInfo.socialMediaLinks.instagram],
          linkedIn: [user.userAdditionalInfo.socialMediaLinks.linkedIn],
          facebook: [user.userAdditionalInfo.socialMediaLinks.facebook],
          twitter: [user.userAdditionalInfo.socialMediaLinks.twitter],
        });
        this.languages = user.userAdditionalInfo.spokenLanguage;
        this.fileName = user.userPhoto.photo;
        if (user.userAddress.Latitude && user.userAddress.Longitude) {
          this.center = {
            lat: parseFloat(user.userAddress.Latitude),
            lng: parseFloat(user.userAddress.Longitude)
          }
        }
        if (user.gender == 'Female') {
          this.isMale = false;
        } else {
          this.isMale = true;
        }
      },
    });
  }

  profileRegister(): void {
    if (!this.fileName) {
      this.snackBar.open('Please select your photo!', 'warning', {
        duration: 3000
      });
    } else {
      this.profileForm = this.fb.group({
        photo: [this.fileName, [Validators.required]],
        email: [this.profileForm.controls['email'].value, [Validators.required, Validators.email]],
        password: [this.profileForm.controls['password'].value, Validators.required],
        firstName: [this.profileForm.controls['firstName'].value, Validators.required],
        lastName: [this.profileForm.controls['lastName'].value, Validators.required],
        Gender: [this.isMale ? 'Male' : 'Female', Validators.required],
        DOB: [this.profileForm.controls['DOB'].value, Validators.required],
        phoneNumber: [this.profileForm.controls['phoneNumber'].value, Validators.required],
        alternatePhNo: [this.profileForm.controls['alternatePhNo'].value],
        address: [this.profileForm.controls['address'].value, Validators.required],
        street: [this.profileForm.controls['street'].value, Validators.required],
        no: [this.profileForm.controls['no'].value, Validators.required],
        flatNo: [this.profileForm.controls['flatNo'].value, Validators.required],
        state: [this.profileForm.controls['state'].value, Validators.required],
        city: [this.profileForm.controls['city'].value, Validators.required],
        postCode: [this.profileForm.controls['postCode'].value, Validators.required],
        country: [this.profileForm.controls['country'].value, Validators.required],
        Longitude: [this.center.lng, Validators.required],
        Latitude: [this.center.lat, Validators.required],
        spokenLanguage: [this.languages, Validators.required],
        higherEducation: [this.profileForm.controls['higherEducation'].value],
        instagram: [this.profileForm.controls['instagram'].value],
        linkedIn: [this.profileForm.controls['linkedIn'].value],
        facebook: [this.profileForm.controls['facebook'].value],
        twitter: [this.profileForm.controls['twitter'].value],
      });
      console.log(this.profileForm.controls['spokenLanguage'].value);
      this.userService.postProfile(this.userId, this.profileForm.value).subscribe({
        next: (loggedInUser: User) => {
          // localStorage['loggedInUser'] = JSON.stringify(loggedInUser);
          this.snackBar.open('Registered your profile successfully!', 'Success', {
            duration: 3000
          });
          console.log(loggedInUser);
        },
        error: error => {
          this.error_message = error.error;
        },
      });
    }
  }

  fileName: string = '';
  // onFileChange(event: any) {
  //   const files = event.target.files as FileList;
  //   const file: File = event.target.files[0];
  //   console.log(file);

  //   if(file) {
  //     this.fileName = URL.createObjectURL(files[0]);
  //     console.log(this.fileName);
  //     const formData = new FormData();
  //     formData.append('photo', file);
  //     const upload$ = this.userService.fileUpload(this.userId, formData);
  //     upload$.subscribe(
  //       (success) => {
  //         console.log('Upload successful:', success);
  //       },
  //       (error) => {
  //         console.error('Upload error:', error);
  //       },
  //       () => {
  //         console.log('Upload complete');
  //       }
  //     );
  //     this.resetInput();
  //   }
  // }

  resetInput() {
    const input = document.getElementById('avatar-input-file') as HTMLInputElement;
    if (input) {
      input.value = "";
    }
  }

  isMale: boolean = true;

  setGender(state: boolean): any {
    if (state) {
      this.isMale = true;
    } else {
      this.isMale = false;
    }
  }

  //user-info
  hide: boolean = true;
  //user-address
  display: any;
  center: google.maps.LatLngLiteral = {
    lat: 50.8503,
    lng: 4.3517
  };
  zoom = 10;
  moveMap(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.center = (event.latLng.toJSON());
  }
  move(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.display = event.latLng.toJSON();
  }
  markerOptions: google.maps.MarkerOptions = {
    draggable: false
  };
  markerPositions: google.maps.LatLngLiteral[] = [];
  addMarker(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.markerPositions.push(event.latLng.toJSON());
  }
  options: any = {
    componentRestrictions: {}
  }

  // open dialog for camera and local drive
  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, type: string, multiple: boolean): void {
    const dialogdef = this.dialog.open(PhotoSelectModal, {
      minWidth: '60%',
      minHeight: '150px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        type,
        multiple
      }
    });
    dialogdef.afterClosed().subscribe(result => {
      if (result.goTo == 'camera') {
        this.openPhotoFromCameraDialog(result.type, result.multiple);
      } else if (result.goTo == 'folder') {
        this.openPhotoFromFolderDialog(result.type, result.multiple);
      }
    })
  }

  openPhotoFromFolderDialog(type: string, multiple: boolean) {
    const dialogDef = this.dialog.open(PhotoFromFolderModal, {
      minWidth: '60%',
      minHeight: '500px',
      data: {
        type,
        multiple
      }
    });
    dialogDef.afterClosed().subscribe(result => {
      if (result.state) {
        this.fileName = result.result;
        console.log(this.fileName);
      } else {
        this.openDialog('500', '500', result.type, result.multiple);
      }
    });
  }

  openPhotoFromCameraDialog(type: string, multiple: boolean) {
    const dialogDef = this.dialog.open(PhotoFromCameraModal, {
      minWidth: '60%',
      minHeight: '360px',
      data: {
        type,
        multiple
      }
    });
    dialogDef.afterClosed().subscribe(result => {
      if (result.state) {
        this.fileName = result.result;
        console.log(this.fileName);
      } else {
        this.openDialog('500', '500', result.type, result.multiple);
      }
    });
  }

  handleAddressChange(address: Address) {
    console.log(address.formatted_address)
    this.center = {
      lat: address.geometry.location.lat(),
      lng: address.geometry.location.lng()
    }
    const components: any = {};
    address.address_components.forEach(component => {
      if (component.types.includes('street_number')) {
        components.houseNumber = component.long_name;
      }
      if (component.types.includes('route')) {
        components.street = component.long_name;
      }
      if (component.types.includes('postal_code')) {
        components.postalCode = component.long_name;
      }
      if (component.types.includes('locality')) {
        components.city = component.long_name;
      }
      if (component.types.includes('administrative_area_level_1')) {
        components.state = component.long_name;
      }
      if (component.types.includes('country')) {
        components.country = component.long_name;
      }
    });
    this.profileForm = this.fb.group({
      photo: [this.fileName],
      email: [this.profileForm.controls['email'].value, [Validators.required, Validators.email]],
      password: [this.profileForm.controls['password'].value, Validators.required],
      firstName: [this.profileForm.controls['firstName'].value, Validators.required],
      lastName: [this.profileForm.controls['lastName'].value, Validators.required],
      Gender: [this.isMale ? 'Male' : 'Female', Validators.required],
      DOB: [this.profileForm.controls['DOB'].value, Validators.required],
      phoneNumber: [this.profileForm.controls['phoneNumber'].value, Validators.required],
      alternatePhNo: [this.profileForm.controls['alternatePhNo'].value],
      address: [address.formatted_address, Validators.required],
      street: [components.street, Validators.required],
      no: [components.houseNumber, Validators.required],
      flatNo: [this.profileForm.controls['flatNo'].value, Validators.required],
      state: [components.state, Validators.required],
      city: [components.city, Validators.required],
      postCode: [components.postalCode, Validators.required],
      country: [components.country, Validators.required],
      Longitude: [this.center.lng, Validators.required],
      Latitude: [this.center.lat, Validators.required],
      spokenLanguage: [this.languages, Validators.required],
      higherEducation: [this.profileForm.controls['higherEducation'].value],
      instagram: [this.profileForm.controls['instagram'].value],
      linkedIn: [this.profileForm.controls['linkedIn'].value],
      facebook: [this.profileForm.controls['facebook'].value],
      twitter: [this.profileForm.controls['twitter'].value],
    });
  }


  //user-additional-info
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  langCtrl = new FormControl('');
  filteredLanguages: Observable<string[]>;
  languages: string[] = [];
  allLanguages: string[] = ['English', 'Spanish', 'French', 'German', 'Russian'];
  languageList: string[];

  @ViewChild('langInput')
  langInput!: ElementRef<HTMLInputElement>;

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    console.log(value);

    // Add our language
    if (value && this.languageList.includes(value) && !this.languages.includes(value)) {
      this.languageList.filter(lang => lang !== value);
      this.languages.push(value);
      console.log('add');

      // Clear the input value
      event.chipInput!.clear();
    }
    console.log('aaa');
    console.log(this.languages);
    console.log(this.languageList);
  }

  remove(language: string): void {
    const index = this.languages.indexOf(language);
    if (index >= 0) {
      console.log('remove');
      this.languageList.push(language);
      this.languages.splice(index, 1);
    }
    console.log('bbb');
    console.log(this.languages);
    console.log(this.languageList);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    if (!this.languages.includes(event.option.viewValue)) {
      this.languageList.filter(lang => lang !== event.option.viewValue);
      this.languages.push(event.option.viewValue);
    }
    this.langInput.nativeElement.value = '';
    this.langCtrl.setValue(null);
    console.log(this.profileForm.controls['spokenLanguage'].value);

    console.log(this.languages);
    console.log(this.languageList);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.languageList.filter(lang => lang.toLowerCase().includes(filterValue) && !this.languages.includes(lang));
  }

  refreshList(): void {
    this.languageList = this._filter('');
    console.log(this.languageList);
    console.log(this.allLanguages);
    console.log(this.languages);
  }

}
