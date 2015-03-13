/**
 * Copyright 2014 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

var express = require('express'),
  app = express(),
  bluemix = require('./config/bluemix'),
  watson = require('watson-developer-cloud'),
  extend = require('util')._extend;

// Bootstrap application settings
require('./config/express')(app);

var appKey = '781og0rurwqsom', 
    appSecret = '9FnyK7slh4CuPxFo', 
    token = {
      oauth_token: '812992a9-6e42-4ba3-8c47-3eb6309a8c1a', 
      oauth_token_secret: '4ab51366-ddd9-461e-b09a-e144810de822'
    };


var linkedin_client = require('linkedin-js')(appKey, appSecret, 'http://localhost:3000/');

//var Linkedin = require('node-linkedin')(appKey, appSecret, '/oauth/linkedin/callback');

//var linkedin = Linkedin.init(token, {
  //  timeout: 10000 /* 10 seconds */
//});

app.get('/auth', function (req, res) {
  // the first time will redirect to linkedin
  linkedin_client.getAccessToken(req, res, function (error, token) {
    // will enter here when coming back from linkedin
    req.session.token = token;

    if ( err )
            return console.error(err);
        
        /**
         * Results have something like:
         * {"expires_in":5184000,"access_token":". . . ."}
         */
 
        console.log(token);
        return res.redirect('/');
  });
});

app.get('/oauth/linkedin', function(req, res) {
    // This will ask for permisssions etc and redirect to callback url. 
    Linkedin.auth.authorize(res, ['r_basicprofile', 'r_fullprofile', 'r_emailaddress', 
      'r_network', 'r_contactinfo', 'rw_nus', 'rw_groups', 'w_messages']);
});
 
app.get('/oauth/linkedin/callback', function(req, res) {
    Linkedin.auth.getAccessToken(res, req.query.code, function(err, results) {
        if ( err )
            return console.error(err);
        
        /**
         * Results have something like:
         * {"expires_in":5184000,"access_token":". . . ."}
         */
 
        console.log(results);
        return res.redirect('/');
    });
});

var ci_credentials = {
  version: 'v1',
  url: 'https://gateway.watsonplatform.net/concept-insights-beta/api',
  username: '58236fbc-904e-4317-ad6d-c98a34744e9c',
  password: 'J4DjaOigWNuU',
  use_vcap_services: false,
  corpus_jobs: 'testmatchmyjob',
  corpus_candidates: 'candidates'
}; // Bluemix externo, bind manual


// Create the service wrapper
var conceptInsights = watson.concept_insights(ci_credentials);

app.get('/', function(req, res){
    res.render('index');
});

/*app.get('/label_search', function (req, res) {
  var payload = extend({
    func:'labelSearch',
    limit: 4,
    prefix:true,
    concepts:true,
  }, req.query);

  conceptInsights.labelSearch(payload, function(error, result) {
    if (error)
      return res.status(error.error ? error.error.code || 500 : 500).json(error);
    else
      return res.json(result);
  });
});

app.get('/semantic_search', function (req, res) {
  var payload = extend({
    func:'semanticSearch',
  }, req.query);

  // ids needs to be stringify
  payload.ids = JSON.stringify(payload.ids);

  conceptInsights.semanticSearch(payload, function(error, result) {
    if (error)
      return res.status(error.error ? error.error.code || 500 : 500).json(error);
    else
      return res.json(result);
  });
});*/


app.put('/job', function(req, res) {
	/* { code: 'RES-91203213', title: 'Software intern',
    description: 'la la la' } */
  // TODO transform body 
  // TODO test
  var input = req.body;
  var params = {
    document: {
        id: input.code,
        label: input.title,
        parts: [
            {
                data: input.description,
                name: "Job description",
                type: "text"
            }
        ]
    },
    user: ci_credentials.username,
    corpus: ci_credentials.corpus_jobs,
    documentid: input.code
}  ;
	  conceptInsights.createDocument(params, function(error, result) {
	    if (error)
	      return res.status(error.error ? error.error.code || 500 : 500).json(error);
	    else
	      return res.json(result);
	  });
});

app.get('/jobs', function(req, res) {
	console.log('inside .get /jobs');
	console.log(ci_credentials);
  console.log(req.query);

  var params = { 
      user: ci_credentials.username,
      corpus: ci_credentials.corpus_jobs
  };
	
	  conceptInsights.getDocumentIds(params, function(error, result) {
	    if (error)
	      return res.status(error.error ? error.error.code || 500 : 500).json(error);
	    else
	      return res.json(result);
	  });
});

app.get('/job/:id', function(req, res) {
  var params = { 
      user: ci_credentials.username,
      corpus: ci_credentials.corpus_jobs,
      documentid: req.params.id
  };
  
    conceptInsights.getDocument(params, function(error, result) {
      if (error)
        return res.status(error.error ? error.error.code || 500 : 500).json(error);
      else
        return res.json(result);
    });
});

app.get('/candidates', function(req, res) {
  var params = { 
      user: ci_credentials.username,
      corpus: ci_credentials.corpus_candidates
  };
	
	  conceptInsights.getDocumentIds(params, function(error, result) {
	    if (error)
	      return res.status(error.error ? error.error.code || 500 : 500).json(error);
	    else
	      return res.json(result);
	  });
});

app.get('/candidate/:id', function(req, res) {
  var params = { 
      user: ci_credentials.username,
      corpus: ci_credentials.corpus_candidates,
      documentid: req.params.id
  };
  
    conceptInsights.getDocument(params, function(error, result) {
      if (error)
        return res.status(error.error ? error.error.code || 500 : 500).json(error);
      else
        return res.json(result);
    });
});

app.put('/candidate', function(req, res) {

  var input = req.body;
  var params = {
    document: {
        id: input.id,
        label: input.full-name,
        parts: [
            {
                data: input.data,
                name: "Candidate",
                type: "text"
            }
        ],
        candidatePictureUrl: input.picture-url,
        candidatePublicProfileUrl: input.public-profile-url
    },
    user: ci_credentials.username,
    corpus: ci_credentials.corpus_candidates,
    documentid: input.id
};
	  conceptInsights.createDocument(params, function(error, result) {
	    if (error)
	      return res.status(error.error ? error.error.code || 500 : 500).json(error);
	    else
	      return res.json(result);
	  });
});
	
app.get('/semantic_search/:corpus', function (req, res) {
  var payload = extend({
    func:'semanticSearch',
    user: ci_credentials.username,
    corpus: req.params.corpus
  }, req.query);
  console.log(req.params);
  console.log(req.query);
  console.log(payload);

  // ids needs to be stringify
  payload.ids = JSON.stringify(payload.ids);

  conceptInsights.semanticSearch(payload, function(error, result) {
    if (error)
      return res.status(error.error ? error.error.code || 500 : 500).json(error);
    else
      return res.json(result);
  });
});


var pi_credentials = extend({
    version: 'v2',
    url: "https://gateway-s.watsonplatform.net/personality-insights/api",
    username: "f6fe0c12-fb84-41a5-8f19-50032d6cad29",
    password: "QHGtHD142ZhU"
}, bluemix.getServiceCreds('personality_insights')); // VCAP_SERVICES

// Create the service wrapper
var personalityInsights = new watson.personality_insights(pi_credentials);

// render index page
app.get('/', function(req, res) {
  res.render('index', { content: 'alan braz' });
});

app.post('/', function(req, res) {
  personalityInsights.profile(req.body, function(err, profile) {
    if (err) {
      if (err.message){
        err = { error: err.message };
      }
      return res.status(err.code || 500).json(err || 'Error processing the request');
    }
    else
      return res.json(profile);
  });
});



var port = process.env.VCAP_APP_PORT || 3000;
app.listen(port);
console.log('listening at:', port);
