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
import com.mongodb.DBCursor;
import com.mongodb.DBObject;
import com.mongodb.Mongo;
import com.mongodb.WriteConcern;
import com.mongodb.WriteResult;
import com.mongodb.util.JSON;
import com.ongoingsolution.dao.logindao;
import com.ongoingsolution.model.CreatUserAccount;
import com.ongoingsolution.model.UserLogin;
import org.json.simple.JSONArray;
import org.json.simple.parser.JSONParser;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Praneeth
 */
@Repository
public class logindaoimpl implements logindao {

    @Override
    public JSONArray getValidLoginUserdata(UserLogin userLogin) {
        JSONArray jsonarray;
        try {
            Mongo mongo = new Mongo("localhost", 27017);
            DB db = mongo.getDB("telecommobitel");
            DBCollection collection = db.getCollection("userdata");

            BasicDBObject whereQuery = new BasicDBObject();

            whereQuery.put("userName", userLogin.getUserName());
            whereQuery.put("passWord", userLogin.getPassWord());

            DBCursor cursor = collection.find(whereQuery);

            String dataUser = JSON.serialize(cursor);
            JSONParser parser = new JSONParser();
            Object obj = parser.parse(dataUser);
            jsonarray = (JSONArray) obj;

            return jsonarray;

        } catch (Exception e) {
            System.out.println("Exception Error getValidLoginUserdata");
        }
        return null;
    }

    @Override
    public boolean createUser(CreatUserAccount creatUserAccount) {
        try {
            Mongo mongo = new Mongo("localhost", 27017);
            DB db = mongo.getDB("telecommobitel");
            DBCollection collection = db.getCollection("userdata");

            Gson gson = new Gson();
            DBObject dbObject = (DBObject) JSON.parse(gson.toJson(creatUserAccount));
            WriteResult result = collection.insert(WriteConcern.SAFE, dbObject);
            return true;
        } catch (Exception e) {
            System.out.println("Exception Error createUser");
            return false;
        }
    }

    @Override
    public JSONArray getUserData(String userName) {
        try {
            Mongo mongo = new Mongo("localhost", 27017);
            DB db = mongo.getDB("telecommobitel");
            DBCollection collection = db.getCollection("userdata");

            BasicDBObject whereQuery = new BasicDBObject();

            whereQuery.put("userName", userName);

            DBCursor cursor = collection.find(whereQuery);

            String dataUser = JSON.serialize(cursor);
            JSONParser parser = new JSONParser();
            Object obj = parser.parse(dataUser);
            JSONArray jsonarray = (JSONArray) obj;

            return jsonarray;

        } catch (Exception e) {
            System.out.println("Exception Error getUserData");
            return null;
        }
    }

    @Override
    public boolean updateUserData(CreatUserAccount creatUserAccount) {
        try {
            Mongo mongo = new Mongo("localhost", 27017);
            DB db = mongo.getDB("telecommobitel");
            DBCollection collection = db.getCollection("userdata");

            BasicDBObject newDocumentOne = new BasicDBObject();
            BasicDBObject newDocumentTwo = new BasicDBObject();
            BasicDBObject newDocumentThree = new BasicDBObject();
            BasicDBObject newDocumentFour = new BasicDBObject();
            BasicDBObject newDocumentFive = new BasicDBObject();
            BasicDBObject newDocumentSix = new BasicDBObject();

            newDocumentOne.append("$set", new BasicDBObject().append("firstName", creatUserAccount.getFirstName()));
            newDocumentTwo.append("$set", new BasicDBObject().append("lastName", creatUserAccount.getLastName()));
            newDocumentThree.append("$set", new BasicDBObject().append("birthDay", creatUserAccount.getBirthDay()));
            newDocumentFour.append("$set", new BasicDBObject().append("department", creatUserAccount.getDepartment()));
            newDocumentFive.append("$set", new BasicDBObject().append("tleNo", creatUserAccount.getTleNo()));
            newDocumentSix.append("$set", new BasicDBObject().append("email", creatUserAccount.getEmail()));

            BasicDBObject searchQuery = new BasicDBObject().append("userName", creatUserAccount.getUserName());

            collection.update(searchQuery, newDocumentOne);
            collection.update(searchQuery, newDocumentTwo);
            collection.update(searchQuery, newDocumentThree);
            collection.update(searchQuery, newDocumentFour);
            collection.update(searchQuery, newDocumentFive);
            collection.update(searchQuery, newDocumentSix);
            return true;
        } catch (Exception e) {
            System.out.println("Exception Error updateUserData");
            return false;
        }
    }

    @Override
    public boolean updateUserImage(CreatUserAccount creatUserAccount) {
        try {
            Mongo mongo = new Mongo("localhost", 27017);
            DB db = mongo.getDB("telecommobitel");
            DBCollection collection = db.getCollection("userdata");

            BasicDBObject newDocumentOne = new BasicDBObject();

            newDocumentOne.append("$set", new BasicDBObject().append("image", creatUserAccount.getImage()));
            BasicDBObject searchQuery = new BasicDBObject().append("userName", creatUserAccount.getUserName());

            collection.update(searchQuery, newDocumentOne);
            return true;
        } catch (Exception e) {
            System.out.println("Exception Error updateUserData");
            return false;
        }
    }

    @Override
    public JSONArray RetrieveInformation(String email) {
        try {
            Mongo mongo = new Mongo("localhost", 27017);
            DB db = mongo.getDB("telecommobitel");
            DBCollection collection = db.getCollection("userdata");

            BasicDBObject whereQuery = new BasicDBObject();

            whereQuery.put("email", email);

            DBCursor cursor = collection.find(whereQuery);

            String dataUser = JSON.serialize(cursor);
            JSONParser parser = new JSONParser();
            Object obj = parser.parse(dataUser);
            JSONArray jsonarray = (JSONArray) obj;

            return jsonarray;

        } catch (Exception e) {
            System.out.println("Exception Error RetrieveInformation");
            return null;
        }
    }

    @Override
    public JSONArray getAllEmailAddresswithUserName() {
        try {
            Mongo mongo = new Mongo("localhost", 27017);
            DB db = mongo.getDB("telecommobitel");
            DBCollection collection = db.getCollection("userdata");
            BasicDBObject whereQuery = new BasicDBObject();
            BasicDBObject field = new BasicDBObject();
            BasicDBObject sortQuery = new BasicDBObject();

//            whereQuery.put("createdprojectUserName", "praneeth");
            field.put("userName", 1);
            field.put("email", 1);
            field.put("image", 1);

            DBCursor cursor = collection.find(whereQuery, field);

            String dataUser = JSON.serialize(cursor);
            JSONParser parser = new JSONParser();
            Object obj = parser.parse(dataUser);
            JSONArray jsonarray = (JSONArray) obj;

            return jsonarray;

        } catch (Exception e) {
            System.out.println("Exception Error getAllEmailAddresswithUserName");
            return null;
        }
    }

}
