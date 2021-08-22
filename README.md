# DRF - React Auth Template | Production Ready✅

## Introduction😁

### This is fork of React DRF SimpleJWT app

### With Extended Features like😉

1. #### User Registration with Email Verification

2. #### Password Reset/Forgot Password with `Email Verification

3. #### Production Ready Media files setup

---

## Usage😊

### Backend (Django) Instructions.

1. `cd server` to get your terminal/cmd into the server directory.
2. To run the server, create a virtual environment `virtualenv venv && source venv/bin/activate`, install packages `pip install -r requirements.txt` -- the requirements.txt file is inside the server subdirectory -- and do `python manage.py migrate && python manage.py runserver`.
   - Again, make sure when you do this, you are inside the server directory on your terminal/cmd.
   - On Windows, you should do `venv\Scripts\activate` instead of `source venv/bin/activate`
3. Change `EMAIL_HOST_USER` to your Email and `EMAIL_HOST_PASSWORD` to your Account Password. In **settings.py**

## Frontend (jwt-react) React instructions.

1. `cd jwt-react` to get your terminal/server into the frontend (react) folder.

2. `npm install` to install all of the dependencies for the front end application.

3. `npm start` and you should be good to go, ensure that your backend is running on port `http://localhost:8000`, if you run it on another port/ip please change the `base_url` in `jwt-react/src/api/auth.js`
