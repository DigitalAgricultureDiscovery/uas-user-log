# UAS User Log
## Introduction
The UAS User Log is a server-based, digital logbook that is accessible through 
any web browser on internet-connected devices.​ It is an outcome of multi-state 
teams working together to develop a common protocol for unmanned aircraft 
systems (UAS) operation for purposes such as research/production, spray 
application, and any other activity of interest. It ​relies on simple user 
interactions to develop a record of UAS mission and can also serve to enhance 
your flight and maintenance experience.​
### Contributors
Dr. Dharmendra Saraswat (Purdue University), Dr. Daniel E. Martin (Dan) (USDA 
ARS), Dr. Lav R. Khot (Washington State University), and Dr. Seth Murray 
(Texas A&M University)
### Acknowledgment
This work is supported by Hatch project 1012501 (project # S1069) from the 
USDA National Institute of Food and Agriculture and award#210316 from the 
Foundation for Food and Agricultural Research (FFAR).​
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

    Make a copy of ```config/dev.example.js``` and rename it to ```config/dev.js```.
    This file contains three variables: ```apixuKey, gmailUser, gmailPass```.
    
    [Apixu](https://www.apixu.com/) is the API used to fetch weather data. It 
    is free to use if calls remain under 10,000 per month. The forecast data 
    is limited to 7 days with the free version. Sign up and provide 
    ```apixuKey``` with your API key.
    
    [Nodemailer](https://nodemailer.com/about/) is used to handle emails. 
    Currently, it is set up to transport emails over Gmail's SMTP server. 
    Provide ```gmailUser``` and ```gmailPass``` with your Gmail credentials. 
     
     