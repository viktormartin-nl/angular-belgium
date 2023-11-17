const jsonServer = require('json-server');
const fileupload = require('express-fileupload');
// const express = require('express');
const server = jsonServer.create();
const router = jsonServer.router('server/db.json');
const middlewares = jsonServer.defaults({
  static: 'server/uploads'
});
const db = require('./db.json');
const http = require('http');
const path = require('path');
const fs = require('fs');

server.use(middlewares);
server.use(jsonServer.bodyParser);
server.use(fileupload());

server.post('/login', (req, res, next) => {
  const users = db.userInfo;

  const user = users.filter(
    u => u.email === req.body.email && u.password === req.body.password
  )[0];

  if (user) {
    res.send({ ...formatUser(user), token: checkIfAdmin(user) });
  } else {
    res.status(401).send('Incorrect email or password');
  }
});

server.post('/register', (req, res) => {
  const users = db.userInfo;
  const user = users.filter(u => u.email === req.body.email)[0];

  if (user === undefined || user === null) {
    res.send({
      ...formatUser(req.body),
      token: checkIfAdmin(req.body)
    });
    db.userInfo.push(req.body);
  } else {
    res.status(500).send('User already exists');
  }
});

server.get('/profile/:id', (req, res) => {
  const userInfoArray = db.userInfo.filter(user => user.id == req.params.id);
  if (userInfoArray.length > 0) {
    const userInfo = userInfoArray[0];
    const userAddressIndex = db.userAddress.findIndex(item => item.email === userInfo.email);
    const userAddress = userAddressIndex > -1 ? db.userAddress[userAddressIndex] : {
      email: userInfo.email,
      address: '',
      country: '',
      state: '',
      city: '',
      street: '',
      postCode: '',
      no: '',
      flatNo: '',
      Longitude: '',
      Latitude: '',
    };
    const userAdditionalInfoIndex = db.userAdditionalInfo.findIndex(item => item.email === userInfo.email);
    const userAdditionalInfo = userAdditionalInfoIndex > -1 ? db.userAdditionalInfo[userAdditionalInfoIndex] : {
      email: userInfo.email,
      spokenLanguage: [],
      higherEducation: '',
      socialMediaLinks: {
        instagram: '',
        linkedIn: '',
        facebook: '',
        twitter: '',
      },
    };
    const userPhotoIndex = db.userPhoto.findIndex(item => item.email === userInfo.email);
    const userPhoto = userPhotoIndex > -1 ? db.userPhoto[userPhotoIndex] : {
      email: userInfo.email,
      photo: ''
    };
    userInfo.userAddress = userAddress;
    userInfo.userPhoto = userPhoto;
    userInfo.userAdditionalInfo = userAdditionalInfo;
    console.log(userInfo);
    res.send(userInfo);
  } else {
    res.status(400).send('User doesn\'t exist.');
  }
});

server.post('/profile/:id', (req, res) => {
  try {
    const index = db.userInfo.findIndex(user => user.email == req.body.email);
    db.userInfo[index].firstName = req.body.firstName ? req.body.firstName : db.userInfo[index].firstName;
    db.userInfo[index].lastName = req.body.lastName ? req.body.lastName : db.userInfo[index].lastName;
    db.userInfo[index].gender = req.body.Gender ? req.body.Gender : db.userInfo[index].gender;
    db.userInfo[index].DOB = req.body.DOB ? req.body.DOB : db.userInfo[index].DOB;
    db.userInfo[index].phoneNumber = req.body.phoneNumber ? req.body.phoneNumber : db.userInfo[index].phoneNumber;
    db.userInfo[index].alternatePhNo = req.body.alternatePhNo ? req.body.alternatePhNo : db.userInfo[index].alternatePhNo;

    const userAddressIndex = db.userAddress.findIndex(item => item.email == req.body.email);
    if (userAddressIndex > -1) {
      db.userAddress[userAddressIndex].address = req.body.address ? req.body.address : db.userAddress[userAddressIndex].address;
      db.userAddress[userAddressIndex].country = req.body.country ? req.body.country : db.userAddress[userAddressIndex].country;
      db.userAddress[userAddressIndex].state = req.body.state ? req.body.state : db.userAddress[userAddressIndex].state;
      db.userAddress[userAddressIndex].city = req.body.city ? req.body.city : db.userAddress[userAddressIndex].city;
      db.userAddress[userAddressIndex].street = req.body.street ? req.body.street : db.userAddress[userAddressIndex].street;
      db.userAddress[userAddressIndex].postCode = req.body.postCode ? req.body.postCode : db.userAddress[userAddressIndex].postCode;
      db.userAddress[userAddressIndex].no = req.body.no ? req.body.no : db.userAddress[userAddressIndex].no;
      db.userAddress[userAddressIndex].flatNo = req.body.flatNo ? req.body.flatNo : db.userAddress[userAddressIndex].flatNo;
      db.userAddress[userAddressIndex].Longitude = req.body.Longitude ? req.body.Longitude : db.userAddress[userAddressIndex].Longitude;
      db.userAddress[userAddressIndex].Latitude = req.body.Latitude ? req.body.Latitude : db.userAddress[userAddressIndex].Latitude;
    } else {
      db.userAddress.push({
        email: req.body.email,
        address: req.body.address,
        country: req.body.country,
        state: req.body.state,
        city: req.body.city,
        street: req.body.street,
        postCode: req.body.postCode,
        no: req.body.no,
        flatNo: req.body.flatNo,
        Longitude: req.body.Longitude,
        Latitude: req.body.Latitude,
      });
    }
    const userAdditionalInfoIndex = db.userAdditionalInfo.findIndex(item => item.email == req.body.email);
    if (userAdditionalInfoIndex > -1) {
      db.userAdditionalInfo[userAdditionalInfoIndex].spokenLanguage = req.body.spokenLanguage ? req.body.spokenLanguage : db.userAdditionalInfo[userAdditionalInfoIndex].spokenLanguage;
      db.userAdditionalInfo[userAdditionalInfoIndex].higherEducation = req.body.higherEducation ? req.body.higherEducation : db.userAdditionalInfo[userAdditionalInfoIndex].higherEducation;
      db.userAdditionalInfo[userAdditionalInfoIndex].socialMediaLinks = {
        instagram: req.body.instagram ? req.body.instagram : '',
        linkedIn: req.body.linkedIn ? req.body.linkedIn : '',
        facebook: req.body.facebook ? req.body.facebook : '',
        twitter: req.body.twitter ? req.body.twitter : '',
      };
    } else {
      db.userAdditionalInfo.push({
        email: req.body.email,
        spokenLanguage: req.body.spokenLanguage,
        higherEducation: req.body.higherEducation,
        socialMediaLinks: {
          instagram: req.body.instagram ? req.body.instagram : '',
          linkedIn: req.body.linkedIn ? req.body.linkedIn : '',
          facebook: req.body.facebook ? req.body.facebook : '',
          twitter: req.body.twitter ? req.body.twitter : '',
        },
      });
    }
    const userPhotoIndex = db.userPhoto.findIndex( item => item.email == req.body.email );
    if ( userPhotoIndex > -1 ) {
      db.userPhoto[userPhotoIndex].photo = req.body.photo ? req.body.photo : db.userPhoto[userPhotoIndex].photo;
    } else {
      db.userPhoto.push({
        email: req.body.email,
        photo: req.body.photo
      });
    }
    console.log(db);
    console.log(req.body);
    const jsonData = JSON.stringify(db);

    fs.writeFile('/server/data.json', jsonData, 'utf8', (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log('Data saved to data.json');
    });
    res.send({
      success: 'Profile is successfully updated!'
    });
  } catch (e) {
    res.status(500).send(e);
  }
});

// server.post('/profile/photo/:id', async (req, res) => {
//     try {
//       console.log(db.userInfo);
//       const userInfoIndex = db.userInfo.findIndex( item => item.id == req.params.id );
//       if ( userInfoIndex > -1 ) {
//         const userEmail = db.userInfo[userInfoIndex].email;
//         if(!req.files) {
//             res.send({
//                 status: false,
//                 message: 'No file uploaded'
//             });
//         } else {
//             //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
//             let avatar = req.files.photo;
//             console.log(req.files);

//             const originalName = avatar.name.split('.');
//             const newName = userEmail.replace('.', '_') + '.' + originalName[originalName.length - 1];

//             //Use the mv() method to place the file in the upload directory (i.e. "uploads")
//             avatar.mv('./server/uploads/' + newName);
//             const newPhoto = {
//               email: userEmail,
//               photo: newName
//             };
//             db.userPhoto.push(newPhoto);
//             //send response
//             res.send({
//                 status: true,
//                 message: 'File is uploaded',
//                 data: {
//                     name: newPhoto.photo,
//                     mimetype: avatar.mimetype,
//                     size: avatar.size
//                 }
//             });
//         }
//       } else {
//         res.status(401).send('User doesn\'t exist!')
//       }

//     } catch (err) {
//         res.status(500).send(err);
//     }
// });

// server.use('/users', (req, res, next) => {
//   if (isAuthorized(req) || req.query.bypassAuth === 'true') {
//     next();
//   } else {
//     res.sendStatus(401);
//   }
// });

server.use(router);

server.listen(3000, () => {
  console.log('JSON Server is running on port 3000');
});

function formatUser(user) {
  user.id = db.userInfo.length === 0 ? 1 : db.userInfo[db.userInfo.length - 1].id + 1;
  user.role = user.email === 'admin@example.com'
    ? 'admin'
    : 'user';
  return user;
}

function checkIfAdmin(user, bypassToken = false) {
  return user.email === 'admin' || bypassToken === true
    ? 'admin-token'
    : 'user-token';
}

function isAuthorized(req) {
  return req.headers.authorization === 'admin-token' ? true : false;
}

function readUsers() {
  const dbRaw = fs.readFileSync('./server/db.json');
  const users = JSON.parse(dbRaw).users
  return users;
}
