const { google } = require('googleapis');
const fs = require('fs')
const credentials = require('./cre.json');
const scopes = [
  'https://www.googleapis.com/auth/drive'
];
const auth = new google.auth.JWT(
  credentials.client_email, null,
  credentials.private_key, scopes
);
const drive = google.drive({ version: "v3", auth });

// drive.files.list({}, (err, res) => {
//     if (err) throw err;
//     const files = res.data.files;
//     if (files.length) {
//     files.map((file) => {
//       console.log(file);
//     });
//     } else {
//       console.log('No files found');
//     }
//   });

var fileMetadata = {
    'name': 'test.mp3',
    parents: ['1b7kDnTACFZHGva808hndbG7ZAv5gXF-E']
  };
  var media = {
    mimeType: 'audio/mp3',
    body: fs.createReadStream(__dirname+'/here/Sada Nannu  Manisha Eerabathini  Lalli Venkat  Sidd Kel  Tag Team Studios.mp3')
  };
  drive.files.create({
    resource: fileMetadata,
    media: media,
    fields: 'id'
  }, function (err, file) {
    if (err) {
      // Handle error
      console.error(err);
    } else {
      console.log('File Id: ', file.id);
    }
  });