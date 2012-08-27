/**
 * Copyright © 2012 IBM Corporation. All Rights Reserved.
 *
 * Change Log:
 *
 * Date	Change Flag	Author	Descriptions of Changes 2012-03-14	CREATE	zhouhk@cn.ibm.com	Created.
 */
package com.ibm.ciolab.biz;

import com.ibm.ciolab.entity.User;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.PersistenceUnit;

@Stateless
public class UserManagement {
	@PersistenceUnit (unitName="com.ibm_ciolab-dojo-web")
	private EntityManagerFactory emf;
	
	public void create(User u) {
		EntityManagerFactory factory = 	Persistence.createEntityManagerFactory("com.ibm_ciolab-dojo-web",System.getProperties());
		EntityManager mgr = factory.createEntityManager();
		mgr.getTransaction().begin();
        mgr.persist(u);
		mgr.getTransaction().commit();
    }
}
