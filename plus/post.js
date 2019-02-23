// Copyright 2018, Google, LLC.
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

const {google} = require('googleapis');
const sampleClient = require('../sampleclient');

const plus = google.plusDomains({
  version: 'v1',
  auth: sampleClient.oAuth2Client,
});

async function runSample() {
  const res = await plus.activities.insert({
    userId: 'me',
    requestBody: {
      object: {
        originalContent: 'Hello from the Node.js Google API Client!',
      },
      access: {
        items: [
          {
            type: 'domain',
          },
        ],
        domainRestricted: true,
      },
    },
  });
  console.log(res.data);
  return res.data;
}

const scopes = [
  'https://www.googleapis.com/auth/plus.me',
  'https://www.googleapis.com/auth/plus.stream.write',
];

if (module === require.main) {
  sampleClient
    .authenticate(scopes)
    .then(runSample)
    .catch(console.error);
}

module.exports = {
  runSample,
  client: sampleClient.oAuth2Client,
};
