/**
 * Copyright © 2012 IBM Corporation. All Rights Reserved.
 *
 * Change Log:
 *
 * Date			Change Flag		Author					Descriptions of Changes
 * 2012-03-05	CREATE			zhouhk@cn.ibm.com		Created.
 */
package com.ibm.ciolab.service;

import com.ibm.ciolab.biz.UserManagement;
import com.ibm.ciolab.entity.User;
import com.ibm.ciolab.vo.UserVO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

public class UserService implements IUserService{

	private static final Logger logger = LoggerFactory.getLogger(UserService.class);
	
	@Override
	public UserVO getCurrentUser() {
		UserVO currentUser = new UserVO();
		Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		UserDetails	userDetails = ((UserDetails) principal);
		currentUser.setIntranetId(userDetails.getUsername());
		currentUser.setName("Hui Kang Zhou");
		UserManagement userMgr = new UserManagement();
		User newUser = new User();
		newUser.setName("Hui Kang Zhou");
		newUser.setIntranetId(userDetails.getUsername());
		userMgr.create(newUser);
		logger.debug(userDetails.getUsername());
		return currentUser;
	}

}
