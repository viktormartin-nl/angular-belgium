export interface User {
  id: number;
  email: string;
  password: string;
  firstName: string,
  lastName: string,
  gender: string,
  DOB: string,
  phoneNumber: string,
  alternatePhNo: string,
  userPhoto: userPhoto,
  userAddress: userAddress,
  userAdditionalInfo: userAdditionalInfo,
}

export interface userPhoto {
  email: string,
  photo: string,
}

export interface userAddress {
  email: string,
  address: string,
  street: string,
  no: string,
  flatNo: string,
  state: string,
  city: string,
  postCode: string,
  country: string,
  Longitude: string,
  Latitude: string,
}

export interface userAdditionalInfo {
  email: string,
  spokenLanguage: string[],
  higherEducation: string,
  socialMediaLinks: {
    instagram: string,
    linkedIn: string,
    facebook: string,
    twitter: string
  }
}
