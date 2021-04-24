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
  getChallengeUrl: baseUrl+'challenges/getchallengebyid/',
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

  // Student Links
  getStudent:baseUrl+'students/get/student/',

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


  //Group links
  addGroup: baseUrl+'groups/add',
  addGroupToTeacher: baseUrl +'teachers/add/group',
  addGroupToStudent: baseUrl +'students/add/group',
  getGroupsByName: baseUrl +'groups/findgroupsbyname/',
  updateGroup:baseUrl+'groups/update',
  showGroupById: baseUrl+'groups/getgroupbyid/',
  showListGroupClasses: baseUrl+'teachers/get/',
  showListGroupEvents: baseUrl+'teachers/get/',
  showListGroupEventsStudent: baseUrl+'students/get/',
  deleteGroup:baseUrl+'groups/delete/',
  deleteGroupFromTeacher: baseUrl+'teachers/delete/group/',
  deleteGroupFromStudent: baseUrl+'students/delete/group/',
  listGroupMember: baseUrl+'groups/listgroupmember/',
  addMemberToGroup: baseUrl+'groups/addgroupmember/',
  addPostToGroup:baseUrl+'groups/addpost/',
  deleteMemberFromGroup: baseUrl+'groups/deletemember/',
  sendDemandeJoinGroup: baseUrl+'notifications/demandjoin',
  leftGroup: baseUrl+'groups/leftgroup/',
  addChild:baseUrl+'childs/addchild',

  //livre
  addLivre:baseUrl+'livres/add',
  getLivreByUserId:baseUrl+'livres/getlivrebyuserid/',


  //Post Links
  addPost: baseUrl + 'posts/newpost',
  updatePost: baseUrl+'posts/updatepost',
  updateComment: baseUrl+'posts/updatecomment',
  likePost: baseUrl + 'posts/likepost',
  dislikePost: baseUrl + 'posts/dislikepost'
}
