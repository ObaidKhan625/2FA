# 2FA

I have made login/sign up using 2 factor authentication. React and Django are the frontend and backend frameworks used. 
I have used Node.js too for generating a qr code image, 
this didn't seem to be possible using Python/Django from the pyotp documentation.

## Steps to run (Docker required)

```bash
docker-compose up
```

## Screenshots

Registration:
![image](https://user-images.githubusercontent.com/72970106/212763934-62fed44d-4431-4de5-aa75-ebbbcb75202d.png)

QR Code given after Registration, scan using Google authenticator:
![image](https://user-images.githubusercontent.com/72970106/212764047-8faf09ce-bca0-425f-91b7-cf77a20f4279.png)

Now head over to the login page.

Login using the credentials:
![image](https://user-images.githubusercontent.com/72970106/212764260-109490d8-ec30-498b-9096-a4703311ca3b.png)

Add the otp from Google authenticator:
![image](https://user-images.githubusercontent.com/72970106/212764603-1fc8e111-7348-46d6-84d4-a6d01b9cc465.png)

![image](https://user-images.githubusercontent.com/72970106/212764912-2568a40f-45dc-4c28-8449-3951378a4102.png)


Done!
