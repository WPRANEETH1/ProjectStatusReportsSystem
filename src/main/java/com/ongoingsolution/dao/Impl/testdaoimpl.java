/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ongoingsolution.dao.Impl;


import com.ongoingsolution.dao.tesdao;
import com.ongoingsolution.model.Test;
import java.io.Serializable;
import java.util.List;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 *
 * @author malitha
 */
@Repository
public class testdaoimpl implements tesdao{
    
    @Autowired
    private SessionFactory sessionFactory;

    @Override
    public Test view(int id) {
    //  return (Test)sessionFactory.getCurrentSession().load(Test.class, id); 
        return (Test)sessionFactory.getCurrentSession().get(Test.class,id);
    }

    @Override
    public List<Test> view2() {
     return sessionFactory.getCurrentSession().createCriteria(Test.class).list();
    }
    
}
