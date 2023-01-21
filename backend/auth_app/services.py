from .models import *
import pyotp
import requests

def getLoginUserService(request):
	data = request.data
	username = data.get('username', None)
	password = data.get('password', None)
	try:
		user = User.objects.get(username = username, password = password)
		return user
	except:
		return None

def getUserService(request):
	try:
		data = request.data
		user_id = data.get('user_id', None)
		user = User.objects.get(id = user_id)
		return user
	except:
		return None

def getOTPValidityService(user, otp):
	totp = pyotp.TOTP(user.otp_base32)
	if not totp.verify(otp):
		return False
	user.logged_in = True
	user.save()
	return True

def getQRCodeService(user):
	otp_base32 = pyotp.random_base32()
	otp_auth_url = pyotp.totp.TOTP(otp_base32).provisioning_uri(
	name=user.username.lower(), issuer_name="localhost.com")

	user.otp_base32 = otp_base32
	user.save()
	qr_code = requests.post('http://backend_node:8001/get-qr-code/', json = {'otp_auth_url': otp_auth_url}).json()
	
	return qr_code['qr_code_link']