# Cognitive Head Hunter - GBS Watson Challenge Application

  Cognitive Head Hunter is a cognitive based system to designed to help both a candidate and a HR professional make a good match more quickly and more reliably using Watson to read and extract cognitive information from the both the candidates providing a better match between them, not only by analyzing keywords but also by understanding the concepts outlined within a resume or a job posting.
  
## Watson Services used
	
  Concept Insights - The Concept Insights service links documents that you provide with a pre-existing graph of concepts based on Wikipedia (e.g. 'Cognitive Systems', 'Solar Energy', etc.). Users of this service can also search for documents that are relevant to a concept or collection of concepts by exploring concepts that are explicitly contained in your queries or are implicitly referenced through related concepts. [More about this service here][concept-insights].
  
  Personality Insights - The Watson Personality Insights service uses linguistic analytics to extract a spectrum of cognitive and social characteristics from the text data that a person generates through blogs, tweets, forum posts, and more. [More about this service here][personality-insights].

# Installation instructions

Click on the buttom bellow to deploy your own copy of Cognitive Head Hunter into your Bluemix account.

[![Deploy to Bluemix](https://bluemix.net/deploy/button.png)][deploy-to-Bluemix]

And that's about it! You successfully just created a `Node.js` application in Bluemix together with a `Concept Insights`, `Personality Insights` and `Mongo Lab` services required to this project.

Now it's time to configure your project. 

## Configuration instructions

This application uses [LinkedIn][linkedin] integration so you will have to create an application on it as part of the steps below.
  
1. Create two corpus in the `concept-insights` service in Bluemix, one for the candidates and other for the jobs opportunities, using Concept Insights REST API. You can see the API [Here][watson_api].

2. Create two environment variables in Bluemix named `candidates_corpus` and `jobs_corpus` and copy the two `Corpus ID` from the corpus you created to the variables accordingly

3. Create a new [LinkedIn][linkedin] application to obtain keys needed in our integration. [You can create it here][linkedin_app]

4. Create two environment variables in Bluemix named `linkedin_appKey` and `linkedin_appSecret` and copy the `appKey` and `appSecret` from your [LinkedIn][linkedin] app to this variables
   
5. Go to `<application-name>.mybluemix.net` to see your own copy up and running!

# Operating instructions

Watch the live demo video at https://vimeo.com/ibmwatson/review/130135189/c27aa6828b

# Name and email for the distributor or programmer

# Known bugs

# Troubleshooting

To troubleshoot your Bluemix app the main useful source of information are the logs, to see them, run:

```sh
$ cf logs <application-name> --recent
```

# License

This project code is licensed under Apache 2.0. Full license text is available in [LICENSE](LICENSE).

# Contributing

See [CONTRIBUTING](CONTRIBUTING.md).

# Open Source @ IBM
  
Find more open source projects on the [IBM Github Page](http://ibm.github.io/)


[cloud_foundry]: https://github.com/cloudfoundry/cli
[getting_started]: http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/doc/getting_started/
[sign_up]: https://apps.admin.ibmcloud.com/manage/trial/bluemix.html?cm_mmc=WatsonDeveloperCloud-_-LandingSiteGetStarted-_-x-_-CreateAnAccountOnBluemixCLI
[watson_api]: http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/apis/#!/concept-insights/createCorpus
[linkedin_app]: https://www.linkedin.com/developer/apps/new
[linkedin]: https://www.linkedin.com/
[deploy-to-Bluemix]: https://bluemix.net/deploy?repository=
[concept-insights]: http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/concept-insights.html
[personality-insights]: http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/personality-insights.html
[vcap_environment]: https://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/doc/getting_started/#VcapEnvVar