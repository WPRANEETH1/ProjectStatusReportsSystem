/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ongoingsolution.dao;

import com.ongoingsolution.model.Createdproject;

/**
 *
 * @author Praneeth
 */
public interface createProjectdao {

    public boolean createProect(Createdproject createdproject);
    
    public boolean deleteProect(Createdproject createdproject);
}
