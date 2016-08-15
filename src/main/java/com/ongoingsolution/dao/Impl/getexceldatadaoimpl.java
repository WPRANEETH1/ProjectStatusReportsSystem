/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ongoingsolution.dao.Impl;

import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.Mongo;
import com.mongodb.util.JSON;
import com.ongoingsolution.dao.getexceldatadao;
import com.ongoingsolution.model.Createdproject;
import org.json.simple.JSONArray;
import org.json.simple.parser.JSONParser;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Praneeth
 */
@Repository
public class getexceldatadaoimpl implements getexceldatadao {

    @Override
    public JSONArray getExcelDataByUser(String createdprojectName) {
        try {
            Mongo mongo = new Mongo("localhost", 27017);
            DB db = mongo.getDB("telecommobitel");
            DBCollection collection = db.getCollection("createdproject");
            BasicDBObject whereQuery = new BasicDBObject();
//            sortQuery.put("createdprojectDateTime", -1);

            whereQuery.put("createdprojectName", createdprojectName);
            DBCursor cursor = collection.find(whereQuery);
            JSON json = new JSON();
            String dataUser = json.serialize(cursor);
            JSONParser parser = new JSONParser();
            Object obj = parser.parse(dataUser);
            JSONArray jsonarray = (JSONArray) obj;

            return jsonarray;

        } catch (Exception e) {
            System.out.println("Exception Error getExcelDataByUser");
            return null;
        }
    }

    @Override
    public JSONArray getExcelAllProjectNameByUser(String userName) {
        try {
            Mongo mongo = new Mongo("localhost", 27017);
            DB db = mongo.getDB("telecommobitel");
            DBCollection collection = db.getCollection("createdproject");
            BasicDBObject whereQuery = new BasicDBObject();
            BasicDBObject field = new BasicDBObject();
            BasicDBObject sortQuery = new BasicDBObject();

            whereQuery.put("createdprojectUserName", userName);
            field.put("createdprojectName", 1);
            field.put("createdprojectDateTime", 1);
            field.put("createdprojectCategory", 1);

            sortQuery.put("createdprojectDateTime", -1);

            DBCursor cursor = collection.find(whereQuery, field).sort(sortQuery);

            String dataUser = JSON.serialize(cursor);
            JSONParser parser = new JSONParser();
            Object obj = parser.parse(dataUser);
            JSONArray jsonarray = (JSONArray) obj;

            return jsonarray;

        } catch (Exception e) {
            System.out.println("Exception Error getExcelAllProjectNameByUser");
            return null;
        }
    }

    @Override
    public boolean updateExcelProjectData(Createdproject createdproject) {
        try {
            Mongo mongo = new Mongo("localhost", 27017);
            DB db = mongo.getDB("telecommobitel");
            DBCollection collection = db.getCollection("createdproject");
            BasicDBObject newDocument = new BasicDBObject();

            newDocument.append("$set", new BasicDBObject().append("createdprojectData", createdproject.getCreatedprojectData()));
            BasicDBObject searchQuery = new BasicDBObject().append("createdprojectName", createdproject.getCreatedprojectName());

            collection.update(searchQuery, newDocument);
            return true;
        } catch (Exception e) {
            System.out.println("Exception Error updateExcelProjectData");
            return false;
        }
    }

    //manager
    @Override
    public JSONArray getExcelAllProjectNameManager() {
        try {
            Mongo mongo = new Mongo("localhost", 27017);
            DB db = mongo.getDB("telecommobitel");
            DBCollection collection = db.getCollection("createdproject");
            BasicDBObject whereQuery = new BasicDBObject();
            BasicDBObject field = new BasicDBObject();
            BasicDBObject sortQuery = new BasicDBObject();

//            whereQuery.put("createdprojectUserName", "praneeth");
            field.put("createdprojectName", 1);
            field.put("createdprojectDateTime", 1);
            field.put("createdprojectCategory", 1);

            sortQuery.put("createdprojectDateTime", -1);

            DBCursor cursor = collection.find(whereQuery, field).sort(sortQuery);

            String dataUser = JSON.serialize(cursor);
            JSONParser parser = new JSONParser();
            Object obj = parser.parse(dataUser);
            JSONArray jsonarray = (JSONArray) obj;

            return jsonarray;

        } catch (Exception e) {
            System.out.println("Exception Error getExcelAllProjectNameManager");
            return null;
        }
    }

    @Override
    public JSONArray mainManagerLoadDashboard() {
        try {
            Mongo mongo = new Mongo("localhost", 27017);
            DB db = mongo.getDB("telecommobitel");
            DBCollection collection = db.getCollection("createdproject");
            BasicDBObject whereQuery = new BasicDBObject();
            BasicDBObject field = new BasicDBObject();
            BasicDBObject sortQuery = new BasicDBObject();

//            whereQuery.put("createdprojectData", "createdprojectData.length>60");
            field.put("createdprojectName", 1);
            field.put("createdprojectData", 1);
//            field.put("createdprojectCategory", 1);

            sortQuery.put("createdprojectDateTime", -1);

            DBCursor cursor = collection.find(whereQuery, field).sort(sortQuery);

            String dataUser = JSON.serialize(cursor);
            JSONParser parser = new JSONParser();
            Object obj = parser.parse(dataUser);
            JSONArray jsonarray = (JSONArray) obj;

            return jsonarray;

        } catch (Exception e) {
            System.out.println("Exception Error mainManagerLoadDashboard");
            return null;
        }
    }

    //engineer
    @Override
    public JSONArray mainEngineerLoadDashboard(String userName) {
        try {
            Mongo mongo = new Mongo("localhost", 27017);
            DB db = mongo.getDB("telecommobitel");
            DBCollection collection = db.getCollection("createdproject");
            BasicDBObject whereQuery = new BasicDBObject();
            BasicDBObject field = new BasicDBObject();
            BasicDBObject sortQuery = new BasicDBObject();

            whereQuery.put("createdprojectUserName", userName);
            field.put("createdprojectName", 1);
            field.put("createdprojectData", 1);
//            field.put("createdprojectCategory", 1);

            sortQuery.put("createdprojectDateTime", -1);

            DBCursor cursor = collection.find(whereQuery, field).sort(sortQuery);

            String dataUser = JSON.serialize(cursor);
            JSONParser parser = new JSONParser();
            Object obj = parser.parse(dataUser);
            JSONArray jsonarray = (JSONArray) obj;

            return jsonarray;
        } catch (Exception e) {
            System.out.println("Exception Error mainEngineerLoadDashboard");
            return null;
        }
    }
}
