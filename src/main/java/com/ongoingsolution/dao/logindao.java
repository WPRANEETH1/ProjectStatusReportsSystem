/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ongoingsolution.dao;

import com.ongoingsolution.model.CreatUserAccount;
import com.ongoingsolution.model.UserLogin;
import org.json.simple.JSONArray;

/**
 *
 * @author Praneeth
 */
public interface logindao {

    JSONArray getValidLoginUserdata(UserLogin userLogin);

    public boolean createUser(CreatUserAccount creatUserAccount);

    JSONArray getUserData(String userName);
    
    public boolean updateUserData(CreatUserAccount creatUserAccount);
    
    public boolean updateUserImage(CreatUserAccount creatUserAccount);
    
    JSONArray RetrieveInformation(String email);
    
    JSONArray getAllEmailAddresswithUserName();
}
