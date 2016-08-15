/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ongoingsolution.dao.Impl;

import com.google.gson.Gson;
import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBObject;
import com.mongodb.Mongo;
import com.mongodb.WriteConcern;
import com.mongodb.WriteResult;
import com.mongodb.util.JSON;
import com.ongoingsolution.dao.createProjectdao;
import com.ongoingsolution.model.Createdproject;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Praneeth
 */
@Repository
public class createProjectdaoimpl implements createProjectdao {

    @Override
    public boolean createProect(Createdproject createdproject) {
        try {
            Mongo mongo = new Mongo("localhost", 27017);
            DB db = mongo.getDB("telecommobitel");
            DBCollection collection = db.getCollection("createdproject");

            Gson gson = new Gson();
            DBObject dbObject = (DBObject) JSON.parse(gson.toJson(createdproject));
            WriteResult result = collection.insert(WriteConcern.SAFE, dbObject);
            return true;
        } catch (Exception e) {
            System.out.println("Exception Error createProect");
            return false;
        }
    }

    @Override
    public boolean deleteProect(Createdproject createdproject) {
        try {
            Mongo mongo = new Mongo("localhost", 27017);
            DB db = mongo.getDB("telecommobitel");
            DBCollection collection = db.getCollection("createdproject");

            BasicDBObject whereQuery = new BasicDBObject();
            whereQuery.put("createdprojectName", createdproject.getCreatedprojectName());

            WriteResult result = collection.remove(whereQuery, WriteConcern.SAFE);
            return result.getN() == 1;
        } catch (Exception e) {
            System.out.println("Exception Error deleteProect");
            return false;
        }
    }

    @Override
    public boolean updateProect(Createdproject createdproject) {
        try {
            Mongo mongo = new Mongo("localhost", 27017);
            DB db = mongo.getDB("telecommobitel");
            DBCollection collection = db.getCollection("createdproject");

            BasicDBObject newDocumentOne = new BasicDBObject();
            BasicDBObject newDocumentTwo = new BasicDBObject();
            BasicDBObject newDocumentThree = new BasicDBObject();

            newDocumentOne.append("$set", new BasicDBObject().append("createdprojectTotalscope", createdproject.getCreatedprojectTotalscope()));
            newDocumentTwo.append("$set", new BasicDBObject().append("createdprojectStartDate", createdproject.getCreatedprojectStartDate()));
            newDocumentThree.append("$set", new BasicDBObject().append("createdprojectEndDate", createdproject.getCreatedprojectEndDate()));
            BasicDBObject searchQuery = new BasicDBObject().append("createdprojectName", createdproject.getCreatedprojectName());

            collection.update(searchQuery, newDocumentOne);
            collection.update(searchQuery, newDocumentTwo);
            collection.update(searchQuery, newDocumentThree);
            return true;
        } catch (Exception e) {
            System.out.println("Exception Error updateProect");
            return false;
        }
    }

}
