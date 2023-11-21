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
import { ExpandImageModal } from "../../core/components/ExpandImageModal/expand-image-modal.component";

@Component({
  selector: 'provider-profile',
  templateUrl: './providerprofile.component.html',
  styleUrls: ['./providerprofile.component.scss']
})
export class ProviderProfileComponent implements OnInit {
  error_message: string = '';

  providerProfileForm: FormGroup = this.fb.group({
    profile: [''],
    idProof: [''],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    gender: ['Male', Validators.required],
    DOB: ['', Validators.required],
    phoneNumber: ['', Validators.required],
    alternatePhNo: [''],
    aboutYou: ['', [Validators.required, Validators.maxLength(350)]],
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
    facebook: [''],
    linkedIn: [''],
    twitter: [''],
    workCategory: [[]],
    experiencedIn: [[], Validators.required],
    workImage: [[], Validators.required],
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

    this.experienceList = this.allExperiences;
    this.filteredExperiences = this.experienceCtrl.valueChanges.pipe(
      startWith(null),
      map((experience: string | null) => (experience ? this._filterExperience(experience) : this.experienceList.slice())),
    );
  }

  ngOnInit() {
    this.userService.getProfile(this.userId).subscribe({
      next: (user: User) => {
        console.log(user);
        this.providerProfileForm = this.fb.group({
          email: [user.email, [Validators.required, Validators.email]],
          password: [user.password, Validators.required],
          firstName: [user.firstName, Validators.required],
          lastName: [user.lastName, Validators.required],
          gender: ['Male', Validators.required],
          DOB: [user.DOB, Validators.required],
          phoneNumber: [user.phoneNumber, Validators.required],
          alternatePhNo: [user.alternatePhNo],
          aboutYou: ['', [Validators.required, Validators.maxLength(350)]],
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
          experiencedIn: [[], Validators.required],
          workCategory: [[], Validators.required],
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
        this.languages = user.userAdditionalInfo.spokenLanguage;
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

  providerProfileRegister(): void {
    this.providerProfileForm.controls['spokenLanguage'].setValue(this.languages);
    this.providerProfileForm.controls['workCategory'].setValue(this.categories);
    this.providerProfileForm.controls['experiencedIn'].setValue(this.experiences);
    this.providerProfileForm.controls['Longitude'].setValue(this.center.lng);
    this.providerProfileForm.controls['Latitude'].setValue(this.center.lat);

    if (this.profile === '') {
      this.snackBar.open('Please select your profile photo!', 'warning', {
        duration: 3000
      });
    } else if (this.idProof === '') {
      this.snackBar.open('Please select your ID Card!', 'warning', {
        duration: 3000
      });
    } else if (this.workImage.length === 0) {
      this.snackBar.open('Please select Images of your work!', 'warning', {
        duration: 3000
      });
    } else if (this.providerProfileForm.valid) {
      console.log(this.providerProfileForm.controls);
      this.providerProfileForm = this.fb.group({
        profile: [this.profile, Validators.required],
        idProof: [this.idProof, Validators.required],
        email: [this.providerProfileForm.controls['email'].value, [Validators.required, Validators.email]],
        password: [this.providerProfileForm.controls['password'].value, Validators.required],
        firstName: [this.providerProfileForm.controls['firstName'].value, Validators.required],
        lastName: [this.providerProfileForm.controls['lastName'].value, Validators.required],
        gender: [this.providerProfileForm.controls['gender'].value, Validators.required],
        DOB: [this.providerProfileForm.controls['DOB'].value, Validators.required],
        phoneNumber: [this.providerProfileForm.controls['phoneNumber'].value, Validators.required],
        alternatePhNo: [this.providerProfileForm.controls['alternatePhNo'].value],
        aboutYou: [this.providerProfileForm.controls['aboutYou'].value, [Validators.required, Validators.maxLength(350)]],
        address: [this.providerProfileForm.controls['address'].value, Validators.required],
        street: [this.providerProfileForm.controls['street'].value, Validators.required],
        no: [this.providerProfileForm.controls['no'].value, Validators.required],
        flatNo: [this.providerProfileForm.controls['flatNo'].value, Validators.required],
        state: [this.providerProfileForm.controls['state'].value, Validators.required],
        city: [this.providerProfileForm.controls['city'].value, Validators.required],
        postCode: [this.providerProfileForm.controls['postCode'].value, Validators.required],
        country: [this.providerProfileForm.controls['country'].value, Validators.required],
        Longitude: [this.providerProfileForm.controls['Longitude'].value, Validators.required],
        Latitude: [this.providerProfileForm.controls['Longitude'].value, Validators.required],
        spokenLanguage: [this.languages, Validators.required],
        higherEducation: [this.providerProfileForm.controls['higherEducation'].value],
        instagram: [this.socials.instagram],
        facebook: [this.socials.facebook],
        linkedIn: [this.socials.linkedIn],
        twitter: [this.socials.twitter],
        workCategory: [this.categories, Validators.required],
        experiencedIn: [this.providerProfileForm.controls['experiencedIn'].value, Validators.required],
        workImage: [this.workImage, Validators.required],
        visitCharge: [this.providerProfileForm.controls['visitCharge'].value, Validators.required],
        companyName: [this.providerProfileForm.controls['companyName'].value],
        companyAddress: [this.providerProfileForm.controls['companyAddress'].value],
        companyPhone: [this.providerProfileForm.controls['companyPhone'].value],
        companyWebsiteLink: [this.providerProfileForm.controls['companyWebsiteLink'].value],
        companyEnterpriseNumber: [this.providerProfileForm.controls['companyEnterpriseNumber'].value],
        emergencyName: [this.providerProfileForm.controls['emergencyName'].value, Validators.required],
        emergencyRelation: [this.providerProfileForm.controls['emergencyRelation'].value, Validators.required],
        emergencyPhone: [this.providerProfileForm.controls['emergencyPhone'].value, Validators.required],
        emergencyEmail: [this.providerProfileForm.controls['emergencyEmail'].value, Validators.email],
      });

      this.userService.postProviderProfile(this.userId, this.providerProfileForm.value).subscribe({
        next: (loggedInUser: User) => {
          // localStorage['loggedInUser'] = JSON.stringify(loggedInUser);
          this.snackBar.open('Registered your provider profile successfully!', 'Success', {
            duration: 4000
          });
          window.location.href = '/providerprofilelist';
          console.log(loggedInUser);
        },
        error: error => {
          this.error_message = error.error;
          console.log(error);
        },
      })

    } else {
      console.log(this.providerProfileForm.controls);
      console.log(this.experiences);
    }
  }

  expandImage(event: MouseEvent) {
    const imageTarget = event.target as HTMLImageElement;
    const image = imageTarget.src;
    if (image.includes('image')) {
      this.openExpandImageModal('500', '500', image);
    }
    console.log(image);
  }

  openExpandImageModal(enterAnimationDuration: string, exitAnimationDuration: string, image: string): void {
    const dialogDef = this.dialog.open(ExpandImageModal, {
      minWidth: '360px',
      width: '30%',
      height: 'content-fit',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        image
      }
    });
    dialogDef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }


  profile: string = '';
  idProof: string = '';

  isMale: boolean = true;
  setGender(state: boolean): any {
    if (state) {
      this.isMale = true;
      this.providerProfileForm.controls['gender'].setValue('Male');
    } else {
      this.isMale = false;
      this.providerProfileForm.controls['gender'].setValue('Female');
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

  handleAddressChange(address: Address) {
    console.log(address.formatted_address)

    this.providerProfileForm.controls['firstName'].setValue('sdfsdf');
    this.center = {
      lat: address.geometry.location.lat(),
      lng: address.geometry.location.lng()
    };

    this.providerProfileForm.controls['address'].setValue(address.formatted_address);

    address.address_components.forEach(component => {
      if (component.types.includes('street_number')) {
        this.providerProfileForm.controls['no'].setValue(component.long_name);
      }
      if (component.types.includes('route')) {
        this.providerProfileForm.controls['street'].setValue(component.long_name);
      }
      if (component.types.includes('postal_code')) {
        this.providerProfileForm.controls['postCode'].setValue(component.long_name);
      }
      if (component.types.includes('locality')) {
        this.providerProfileForm.controls['city'].setValue(component.long_name);
      }
      if (component.types.includes('administrative_area_level_1')) {
        this.providerProfileForm.controls['state'].setValue(component.long_name);
      }
      if (component.types.includes('country')) {
        this.providerProfileForm.controls['country'].setValue(component.long_name);
      }
    });
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
        if (result.type == 'profile') {
          this.profile = result.result;
        } else if (result.type == 'idProof') {
          this.idProof = result.result;
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
        if (result.type == 'profile') {
          this.profile = result.result;
        } else if (result.type == 'idProof') {
          this.idProof = result.result;
        }
      } else {
        this.openDialog('500', '500', result.type, result.multiple);
      }
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

    this.providerProfileForm.controls['spokenLanguage'].setValue(this.languages);
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

    this.providerProfileForm.controls['spokenLanguage'].setValue(this.languages);
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

  // Handle socialMedia links

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
  }

  cancelSocial(key: any) {
    delete this.socials[key];
    console.log(key);
  }

  //work image upload

  workImage: any[] = [];

  onFileChange(event: any) {
    const files = event.target.files;

    // Iterate over each uploaded file
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        console.log(reader.result);
        this.workImage.push(reader.result);
        console.log(this.workImage);
      };
    }

    // if (file) {
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

  resetInput() {
    const input = document.getElementById('avatar-input-file') as HTMLInputElement;
    if (input) {
      input.value = "";
    }
  }

  cancalWorkImage(index: number) {
    this.workImage.splice(index, 1);
  }

  //Company information Editing

  companyCenter: google.maps.LatLngLiteral = {
    lat: 50.8503,
    lng: 4.3517
  };

  handleCompanyAddressChange(address: Address) {
    this.companyCenter = {
      lat: address.geometry.location.lat(),
      lng: address.geometry.location.lng()
    }
    this.providerProfileForm.controls['companyAddress'].setValue(address.formatted_address);
  }

  // Work information Editing

  experienceCtrl = new FormControl('');
  filteredExperiences: Observable<string[]>;
  experiences: string[] = [];
  allExperiences: string[] = ['Experience1', 'Experience2', 'Experience3', 'Experience4'];
  experienceList: string[];

  @ViewChild('experienceInput')
  experienceInput!: ElementRef<HTMLInputElement>;

  addExperience(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    console.log(value);

    // Add our language
    if (value && this.experienceList.includes(value) && !this.experiences.includes(value)) {
      this.experienceList.filter(experience => experience !== value);
      this.experiences.push(value);
      console.log('add');

      // Clear the input value
      event.chipInput!.clear();
    }
    console.log('aaa');
    console.log(this.experiences);
    console.log(this.experienceList);
  }

  removeExperience(experience: string): void {
    const index = this.experiences.indexOf(experience);
    if (index >= 0) {
      console.log('remove');
      this.experienceList.push(experience);
      this.experiences.splice(index, 1);
    }
    console.log('bbb');
    console.log(this.experiences);
    console.log(this.experienceList);
  }

  selectedExperience(event: MatAutocompleteSelectedEvent): void {
    if (!this.experiences.includes(event.option.viewValue)) {
      this.experienceList.filter(lang => lang !== event.option.viewValue);
      this.experiences.push(event.option.viewValue);
    }
    this.experienceInput.nativeElement.value = '';
    this.experienceCtrl.setValue(null);

    console.log(this.experiences);
    console.log(this.experienceList);

  }

  private _filterExperience(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.experienceList.filter(experience => experience.toLowerCase().includes(filterValue) && !this.experiences.includes(experience));
  }

  additionExperience(event: any) {
    // console.log(this.experienceCtrl.value, '=');
    const additionExperience = this.providerProfileForm.controls['experiencedIn'].value;
    this.experiences.push(additionExperience);
    console.log(this.experiences, 'ssssssssss');
    // this.experienceList.push(additionExperience);
    this.providerProfileForm.controls['experiencedIn'].setValue(this.experiences);
  }

  // Emergency details Editing

  relations: string[] = ['Relation1', 'Relation2', 'Relation3'];

}
