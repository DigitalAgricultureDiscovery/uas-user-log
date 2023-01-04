# UAS User Log

## Introduction

The UAS User Log is a server-based, digital logbook that is accessible through any web browser on internet-connected devices.​ It is an outcome of multi-state teams working together to develop a common protocol for unmanned aircraft systems (UAS) operation for purposes such as research/production, spray application, and any other activity of interest. It ​relies on simple user interactions to develop a record of UAS mission and can also serve to enhance your flight and maintenance experience.​

### Contributors

Dr. Dharmendra Saraswat (Purdue University), Dr. Daniel E. Martin (Dan) (USDA ARS), Dr. Lav R. Khot (Washington State University), and Dr. Seth Murray (Texas A&M University)

### Acknowledgment

This work is supported by Hatch project 1012501 (project # S1069) from the USDA National Institute of Food and Agriculture and award#210316 from the Foundation for Food and Agricultural Research (FFAR).​

## Installation

1. Install system dependencies:
   - [Git](https://git-scm.com/)
   - [Docker engine](https://docs.docker.com/engine/)
2. Clone this repository:

   `git clone https://github.com/DigitalAgricultureDiscovery/uas-user-log.git`

3. Setup environmental variables on server:

   Make a copy of `example.env.dev` and rename it to `.env.dev`. Inside `.env.dev` several environment variables will need to be set.

   [weatherstack](https://weatherstack.com/) is the API used to fetch real-time weather data. It is free to use if calls remain under 250 per month. Sign up and provide `WEATHERSTACK_KEY` with your API key.

   [Nodemailer](https://nodemailer.com/about/) is used to handle emails. Currently, it is set up to transport emails over Gmail's SMTP server. The following variables need to be set:

   - `SMTP_HOST` - SMTP server (e.g. _smtp.gmail.com_)
   - `SMTP_PORT` - SMTP port (e.g. _465_)
   - `SMTP_USER` - Email account that will be sending the messages.
   - `SMTP_CLIENT_ID` - OAuth 2.0 client ID.
   - `SMTP_CLIENT_SECRET` - OAuth 2.0 secret.
   - `SMTP_REFRESH_TOKEN` - OAuth 2.0 refresh token.
   - `SMTP_ACCESS_TOKEN` - OAuth 2.0 access token.
   - `SMTP_RECIPIENTS` - Comma separated email addresses that will receive the emails.

   This [guide](https://medium.com/@RistaSB/use-expressjs-to-send-mails-with-gmail-oauth-2-0-and-nodemailer-d585bba71343) can help you obtain the above OAuth credentials. Refer to the nodemailer documentation for instructions on configuring it with other email providers.

4. Setup environmental variables on client:

   Make a copy of `client/example.env` and rename it to `client/.env`. Inside the new file, replace the example values with the feedback email address and a Google Analytics Tracking ID.

5. Build the containers and start the application:

   **Development version**

   From the root project directory, run

   ```
   docker-compose -f docker-compose.dev.yml up --build -d
   ```

   This command will build the client and server containers. Once the containers are running, the application can be accessed from your browser at `http://localhost:3000`.

   **Production version**

   Repeat Step 3 for `example.env.prod` instead of `example.env.dev`. `.env.prod` contains one additional environmental variable - `PORT`. Set it to the port the application will be using in the production environment.

   To build the production container, run

   ```
   docker-compose -f docker-compose.prod.yml up --build -d
   ```

   This command will create a single container for the entire application.
