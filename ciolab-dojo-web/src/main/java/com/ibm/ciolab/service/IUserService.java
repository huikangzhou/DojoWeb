/**
 * Copyright © 2012 IBM Corporation. All Rights Reserved.
 *
 * Change Log:
 *
 * Date			Change Flag		Author					Descriptions of Changes
 * 2012-03-05	CREATE			zhouhk@cn.ibm.com		Created.
 */
package com.ibm.ciolab.service;

import com.ibm.ciolab.vo.UserVO;
import org.oasisopen.sca.annotation.Remotable;

@Remotable
public interface IUserService {
	public UserVO getCurrentUser();
}
