import { InjectionToken } from '@angular/core';

export let APP_CONFIG = new InjectionToken('app.config');

const baseUrl: any =  'http://localhost:3000/';

export  const AppConfig: any = {

	routes:{
		error404: '404'
	},


  //User links webservice
	loginUrl: baseUrl+'users/login',
  signupUrl: baseUrl+'users/signup',
  updateProfileUrl: baseUrl+'users/update',
  updateProfilePassword:baseUrl+'users/updateprofilepassword',
  addParent:baseUrl+'parents/addparent',
  activateUrl: baseUrl+'users/activate',
  resendeUrl: baseUrl+'users/resend',
  resendUrl: baseUrl+'users/resend',
  profileUrl: baseUrl+'users/profile',
  getUserById: baseUrl+'users/findbyid/',
  getprofileUrl: baseUrl+'users/profile/',
  getUserByEmailOrUsername: baseUrl+'users/findbyemailorusername/',
  getUserByEmailOrUsernameSearch: baseUrl+'users/findbyemailorusernamesearch/',
  getUserByName: baseUrl+'users/findbyename/',
  logoutUrl: baseUrl+'users/logout',
  emailExist: baseUrl+'users/checkemail/',
  usernameExist: baseUrl+'users/checkusername/',
  phoneNumberExist: baseUrl+'users/checkphone/',
  disableAccount:baseUrl+'users/disable/',
  sendPasswordResetLinkUrl: baseUrl+'sendPasswordResetLink',
  resetPasswordUrl: baseUrl+'resetPassword',

  // Child Links
  addPoints:baseUrl+'childs/addpoints', 

  // Student Links
  getStudent:baseUrl+'childs/get/student/',

  // Parent Links
  getChildrensParent:baseUrl+'parents/getparent/',
  searchChild:baseUrl+'users/findbyemailorusernamechild/',
  sendVerificationChild:baseUrl + 'parents/sendVerificationChild',
  addChildToParent:baseUrl+ 'parents/addchild',
  deleteChild:baseUrl+'parents/deletechild',
  getParent:baseUrl+'parents/get/parent/',


  contactUs: baseUrl+'contactus/',

  //Role links webservices
  getALLRolles: baseUrl+'roles/get/roles',

  addChild:baseUrl+'childs/addchild',

  //livre
  addLivre:baseUrl+'livres/add',
  getLivreById:baseUrl+'livres/getlivrebyid/',
  getLivreByUserId:baseUrl+'livres/getlivrebyuserid/',
  getLivresSearch:baseUrl+'livres/search/',

  //challenge
  getChallenges: baseUrl+'challenges/',
  getChallengeParticipationChild: baseUrl+'challenges/participated/',
  getChallengeUrl: baseUrl+'challenges/getchallengebyid/',
  getChallengeSearch:baseUrl+'challenges/search/',
  participate: baseUrl+'challenges/addparticipant',
}
