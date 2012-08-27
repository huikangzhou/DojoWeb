/**
 * Copyright © 2012 IBM Corporation. All Rights Reserved.
 *
 * Change Log:
 *
 * Date			Change Flag		Author					Descriptions of Changes
 * 2012-03-14	CREATE			zhouhk@cn.ibm.com		Created.
 */
package com.ibm.ciolab.entity;

import java.io.Serializable;
import javax.persistence.*;

@Entity
@Table (name="USER_PROFILE")
public class User implements Serializable {
	@Id
	@GeneratedValue (strategy=GenerationType.IDENTITY)
	@Column (name="ID")
	private Long id;
	@Column (name="NAME", length=200)
	private String name;
	@Column (name="INTRANETID", length=50)
	private String intranetId;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

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
