/**
 * Copyright © 2012 IBM Corporation. All Rights Reserved.
 *
 * Change Log:
 *
 * Date			Change Flag		Author					Descriptions of Changes
 * 2012-03-05	CREATE			zhouhk@cn.ibm.com		Created.
 */
package com.ibm.ciolab.vo;

public class UserVO {
	private String name;
	private String intranetId;

	public String getIntranetId() {
		return intranetId;
	}

	public void setIntranetId(String intranetId) {
		this.intranetId = intranetId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
}
