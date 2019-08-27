# UAS User Log
## Introduction
The UAS User Log is a server-based, digital logbook that is accessible through any web browser on internet-connected devices.​ It is an outcome of multi-state teams working together to develop a common protocol for unmanned aircraft systems (UAS) operation for purposes such as research/production, spray application, and any other activity of interest. It ​relies on simple user interactions to develop a record of UAS mission and can also serve to enhance your flight and maintenance experience.​
### Contributors
Dr. Dharmendra Saraswat (Purdue University), Dr. Daniel E. Martin (Dan) (USDA ARS), Dr. Lav R. Khot (Washington State University), and Dr. Seth Murray (Texas A&M University)
### Acknowledgment
This work is supported by Hatch project 1012501 (project # S1069) from the USDA National Institute of Food and Agriculture and award#210316 from the Foundation for Food and Agricultural Research (FFAR).​
## Installation
1. Install system dependencies:
    * [Git](https://git-scm.com/)
    * [Node.js](https://nodejs.org/en/)
2. Clone this repository: 
    
    ```git clone https://github.com/hancocb/uas-user-log.git```
3. Install server dependencies:

    ```npm install```
4. Install client dependencies:

    ```cd client/```
    
    ```npm install```
5. Setup environmental variables:

    Make a copy of ```config/dev.example.js``` and rename it to ```config/dev.js```. Inside ```config/dev.js``` several environment variables will need to be set.
    
    [Apixu](https://www.apixu.com/) is the API used to fetch weather data. It is free to use if calls remain under 10,000 per month. The forecast data is limited to 7 days with the free version. Sign up and provide ```apixuKey``` with your API key.
    
    [Nodemailer](https://nodemailer.com/about/) is used to handle emails. Currently, it is set up to transport emails over Gmail's SMTP server. The following variables need to be set:
    * ```smtpHost``` - SMTP server (e.g. *smtp.gmail.com*)
    * ```smtpPort``` - SMTP port (e.g. *465*)
    * ```smtpUser``` - Email account that will be sending the messages.
    * ```smtpClientId``` - OAuth 2.0 client ID.
    * ```smtpClientSecret``` - OAuth 2.0 secret.
    * ```smtpRefreshToken``` - OAuth 2.0 refresh token.
    * ```smtpRecipients``` - Comma separated email addresses that will receive the emails.

     This [guide](https://medium.com/@RistaSB/use-expressjs-to-send-mails-with-gmail-oauth-2-0-and-nodemailer-d585bba71343) can help you obtain the above OAuth credentials. Refer to the nodemailer documentation for instructions on configuring it with other email providers.
 6. Run locally

    From the project's root directory, run ```npm run dev``` to start the Express server and React frontend.
 7. Run on Heroku

    UAS User Log is ready to run on Heroku. Follow along with this [guide](https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up) to help you get started. Do not forget to set up your environment variables on Heroku.
