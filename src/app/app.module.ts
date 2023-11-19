import { NgModule } from '@angular/core';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/components/header/header.component';
import { MainComponent } from './core/components/main/main.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps'
import { MatNativeDateModule } from '@angular/material/core'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatMenuModule } from "@angular/material/menu";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ImageCropperModule } from 'ngx-image-cropper';
import { WebcamModule } from 'ngx-webcam';
import { NgxMatIntlTelInputComponent } from 'ngx-mat-intl-tel-input';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { NgImageSliderModule } from 'ng-image-slider';
import { MatGridListModule } from '@angular/material/grid-list';

import { FooterComponent } from './core/components/footer/footer.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { PasswordErrorMessageComponent } from './views/register/components/password-error-message/password-error-message.component';
import { EmailErrorMessageComponent } from './views/register/components/email-error-message/email-error-message.component';
import { CrudInterceptor } from './shared/interceptor/interceptor';
import { CommentsComponent } from './views/comments/comments.component';
import { CreationPopup } from './views/comments/components/creation-popup/creation-popup.component';
import { DeletedPopup } from './views/comments/components/deleted-popup/deleted-popup.component';
import { EditionPopup } from './views/comments/components/edition-popup/edition-popup.component';
import { ProfileComponent } from './views/profile/profile.component';
import { ProfileViewComponent } from './views/profileview/profileview.component';
import { PhotoSelectModal } from './core/components/photoSelectModal/photo-select-modal.component';
import { PhotoFromFolderModal } from './core/components/PhotoFromFolderModal/photo-from-folder-modal.component';
import { PhotoFromCameraModal } from './core/components/PhotoFromCameraModal/photo-from-camera-modal.component';
import { ProviderProfileComponent } from './views/providerprofile/providerprofile.component';
import { ProviderProfileListComponent } from './views/providerprofilelist/providerprofilelist.component';
import { ProviderProfileViewComponent } from './views/providerprofileview/providerprofileview.component';
import { OrderComponent } from './views/order/order.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    PasswordErrorMessageComponent,
    EmailErrorMessageComponent,
    ProfileComponent,
    ProfileViewComponent,
    CommentsComponent,
    CreationPopup,
    DeletedPopup,
    EditionPopup,
    PhotoSelectModal,
    PhotoFromFolderModal,
    PhotoFromCameraModal,
    ProviderProfileComponent,
    ProviderProfileListComponent,
    ProviderProfileViewComponent,
    OrderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    GoogleMapsModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatDividerModule,
    MatDatepickerModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatMenuModule,
    BrowserAnimationsModule,
    GooglePlaceModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatTabsModule,
    MatButtonToggleModule,
    ImageCropperModule,
    WebcamModule,
    NgxMatIntlTelInputComponent,
    MatSelectModule,
    MatListModule,
    MatCheckboxModule,
    MatRadioModule,
    MatGridListModule,
    NgImageSliderModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: CrudInterceptor, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
    // Register the social media icons
    this.matIconRegistry.addSvgIcon('facebook', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/social/facebook.svg'));
    this.matIconRegistry.addSvgIcon('twitter', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/social/twitter.svg'));
    this.matIconRegistry.addSvgIcon('instagram', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/social/instagram.svg'));
    this.matIconRegistry.addSvgIcon('linkedIn', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/social/linkedin.svg'));
    this.matIconRegistry.addSvgIcon('bachelor', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/social/bachelor.svg'));
    // Add more icons as needed
  }
}
