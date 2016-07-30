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
        JSONArray jsonarray ;
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

}
