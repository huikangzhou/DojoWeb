/**
 * Copyright © 2012 IBM Corporation. All Rights Reserved.
 *
 * Change Log:
 *
 * Date			Change Flag		Author					Descriptions of Changes
 * 2012-03-07	CREATE			zhouhk@cn.ibm.com		Created.
 */
package com.ibm.ciolab.authentication;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import org.springframework.ldap.core.DirContextOperations;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.ldap.userdetails.LdapAuthoritiesPopulator;

public class AuthoritiesPopulator implements LdapAuthoritiesPopulator{

	@Override
	public Collection<? extends GrantedAuthority> getGrantedAuthorities(DirContextOperations userData, String username) {
		List<GrantedAuthority> result = new ArrayList<GrantedAuthority>();
		GrantedAuthority defaultRole = new SimpleGrantedAuthority("ROLE_USER");
		result.add(defaultRole);
		return result;
	}

}
