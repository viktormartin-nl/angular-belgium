import { url } from 'src/environments/environment';
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
  selector: 'provider-profile',
  templateUrl: './providerprofile.component.html',
  styleUrls: ['./providerprofile.component.scss']
})
export class ProviderProfileComponent implements OnInit {
  error_message: string = '';

  providerProfileForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    DOB: ['', Validators.required],
    phoneNumber: ['', Validators.required],
    alternatePhNo: [''],
    aboutYou: ['', Validators.required, Validators.maxLength(350)],
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
    higherEducation: [[]],
    instagram: [''],
    facebook: [''],
    linkedIn: [''],
    twitter: [''],
    experiencedIn: ['', Validators.required],
    workCategory: ['', Validators.required],
    visitCharge: ['', Validators.required],
    companyName: [''],
    companyAddress: [''],
    companyPhone: [''],
    companyWebsiteLink: [''],
    companyEnterpriseNumber: [''],
    emergencyName: ['', Validators.required],
    emergencyRelation: ['', Validators.required],
    emergencyPhone: ['', Validators.required],
    emergencyEmail: ['', Validators.email],
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
    this.categoryList = this.allCategories;
    this.filteredCategories = this.categoryCtrl.valueChanges.pipe(
      startWith(null),
      map((category: string | null) => (category ? this._filterCategory(category) : this.categoryList.slice())),
    );
  }

  ngOnInit() {
  }

  providerProfileRegister(): void {
  }

  fileName: string = '';
  workPhoto: string = '';

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
  // moveMap(event: google.maps.MapMouseEvent) {
  //   if (event.latLng != null) this.center = (event.latLng.toJSON());
  // }
  // move(event: google.maps.MapMouseEvent) {
  //   if (event.latLng != null) this.display = event.latLng.toJSON();
  // }
  markerOptions: google.maps.MarkerOptions = {
    draggable: false
  };
  // markerPositions: google.maps.LatLngLiteral[] = [];
  // addMarker(event: google.maps.MapMouseEvent) {
  //   if (event.latLng != null) this.markerPositions.push(event.latLng.toJSON());
  // }
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
      console.log(result);
      if (result.state) {
        if (result.type == 'photo') {
          this.fileName = result.result;
        } else if (result.type == 'work') {
          this.workPhoto = result.result;
        }
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
        if (result.type == 'photo') {
          this.fileName = result.result;
        } else if (result.type == 'work') {
          this.workPhoto = result.result;
        }
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
    this.providerProfileForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      DOB: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      alternatePhNo: [''],
      aboutYou: ['', Validators.required],
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
      higherEducation: [[]],
      instagram: [''],
      facebook: [''],
      linkedIn: [''],
      twitter: [''],
      experiencedIn: ['', Validators.required],
      workCategory: ['', Validators.required],
      visitCharge: ['', Validators.required],
      companyName: [''],
      companyAddress: [''],
      companyPhone: [''],
      companyWebsiteLink: [''],
      companyEnterpriseNumber: [''],
      emergencyName: ['', Validators.required],
      emergencyRelation: ['', Validators.required],
      emergencyPhone: ['', Validators.required],
      emergencyEmail: ['', Validators.email],
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
    console.log(this.providerProfileForm.controls['spokenLanguage'].value);

    console.log(this.languages);
    console.log(this.languageList);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.languageList.filter(lang => lang.toLowerCase().includes(filterValue) && !this.languages.includes(lang));
  }

  educations: string[] = ['Bachelor', 'Master', 'Second Level Education'];

  // Multiselect Category

  categoryCtrl = new FormControl('');
  filteredCategories: Observable<string[]>;
  categories: string[] = [];
  allCategories: string[] = ['Plumber', 'Electrician', 'Gardener ', 'Fire security'];
  categoryList: string[];

  @ViewChild('categoryInput')
  categoryInput!: ElementRef<HTMLInputElement>;

  addCategory(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    console.log(value);

    // Add our language
    if (value && this.categoryList.includes(value) && !this.categories.includes(value)) {
      this.categoryList.filter(category => category !== value);
      this.categories.push(value);
      console.log('add');

      // Clear the input value
      event.chipInput!.clear();
    }
    console.log('aaa');
    console.log(this.categories);
    console.log(this.categoryList);
  }

  removeCategory(category: string): void {
    const index = this.categories.indexOf(category);
    if (index >= 0) {
      console.log('remove');
      this.categoryList.push(category);
      this.categories.splice(index, 1);
    }
    console.log('bbb');
    console.log(this.categories);
    console.log(this.categoryList);
  }

  selectedCategory(event: MatAutocompleteSelectedEvent): void {
    if (!this.categories.includes(event.option.viewValue)) {
      this.categoryList.filter(lang => lang !== event.option.viewValue);
      this.categories.push(event.option.viewValue);
    }
    this.categoryInput.nativeElement.value = '';
    this.categoryCtrl.setValue(null);
    console.log(this.providerProfileForm.controls['workCategory'].value);

    console.log(this.categories);
    console.log(this.categoryList);
  }

  private _filterCategory(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.categoryList.filter(category => category.toLowerCase().includes(filterValue) && !this.categories.includes(category));
  }

  socialMediaValue = new FormControl();
  socialMedia = new FormControl();
  socialMedias: string[] = ['linkedIn', 'instagram', 'facebook', 'twitter'];
  socials: any = {};
  addSocialMedia(): void {
    let value = this.socialMedia.value;
    let index = this.socialMediaValue.value;
    this.socials[index] = value;
    // this.socials.push({
    //   key: index,
    //   value: value
    // });
    this.socialMedia.setValue('');
    this.socialMediaValue.setValue('');
    console.log(this.socials);
  }

  cancelSocial(key: any) {
    delete this.socials[key];
    console.log(key);
  }

  //Company information Editing

  companyCenter: google.maps.LatLngLiteral = {
    lat: 50.8503,
    lng: 4.3517
  };

  handleCompanyAddressChange(address: Address) {
    console.log(address.formatted_address)
    this.companyCenter = {
      lat: address.geometry.location.lat(),
      lng: address.geometry.location.lng()
    }
  }

  // Emergency details Editing

  relations: string[] = ['Relation1', 'Relation2', 'Relation3'];

}
