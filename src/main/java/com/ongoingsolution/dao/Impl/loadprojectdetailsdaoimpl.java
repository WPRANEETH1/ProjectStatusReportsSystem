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
import com.ongoingsolution.dao.loadprojectdetailsdao;
import org.json.simple.JSONArray;
import org.json.simple.parser.JSONParser;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Praneeth
 */
@Repository
public class loadprojectdetailsdaoimpl implements loadprojectdetailsdao {

    @Override
    public JSONArray getProjectNameWithCategoryBuUserName(String userName, String projectSubCategory) {
        try {
            Mongo mongo = new Mongo("localhost", 27017);
            DB db = mongo.getDB("telecommobitel");
            DBCollection collection = db.getCollection("createdproject");
            BasicDBObject whereQuery = new BasicDBObject();
            BasicDBObject sortQuery = new BasicDBObject();
            BasicDBObject findQuery = new BasicDBObject();

            whereQuery.put("createdprojectUserName", userName);
            whereQuery.put("createdprojectSubCategory", projectSubCategory);

            findQuery.put("createdprojectDateTime", 1);
            findQuery.put("createdprojectName", 1);
            findQuery.put("createdprojectCategory", 1);
            findQuery.put("createdprojectSubCategory", 1);

            findQuery.put("createdprojectTotalscope", 1);
            findQuery.put("createdprojectStartDate", 1);
            findQuery.put("createdprojectEndDate", 1);

            sortQuery.put("createdprojectDateTime", -1);

            DBCursor cursor = collection.find(whereQuery, findQuery).sort(sortQuery);
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
    public JSONArray getProjectNameWithCategoryBuUserNameotherProject(String userName, String projectCategory) {
        try {
            Mongo mongo = new Mongo("localhost", 27017);
            DB db = mongo.getDB("telecommobitel");
            DBCollection collection = db.getCollection("createdproject");
            BasicDBObject whereQuery = new BasicDBObject();
            BasicDBObject sortQuery = new BasicDBObject();
            BasicDBObject findQuery = new BasicDBObject();

            whereQuery.put("createdprojectUserName", userName);
            whereQuery.put("createdprojectCategory", projectCategory);

            findQuery.put("createdprojectDateTime", 1);
            findQuery.put("createdprojectName", 1);
            findQuery.put("createdprojectCategory", 1);
            findQuery.put("createdprojectSubCategory", 1);

            sortQuery.put("createdprojectDateTime", -1);

            DBCursor cursor = collection.find(whereQuery, findQuery).sort(sortQuery);
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
    public JSONArray getImplementationDateByProjectName(String projectName) {
        try {
            Mongo mongo = new Mongo("localhost", 27017);
            DB db = mongo.getDB("telecommobitel");
            DBCollection collection = db.getCollection("createdproject");
            BasicDBObject whereQuery = new BasicDBObject();
//            BasicDBObject sortQuery = new BasicDBObject();
//            BasicDBObject findQuery = new BasicDBObject();                        

            whereQuery.put("createdprojectName", projectName);

//            findQuery.put("createdprojectData", 1);
//            findQuery.put("createdprojectCategory", 1);
//            sortQuery.put("createdprojectDateTime", -1);
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
//--------------------------------------------------------------------------------------------

    @Override
    public JSONArray getProjectNameWithCategoryBuManager(String projectSubCategory) {
        try {
            Mongo mongo = new Mongo("localhost", 27017);
            DB db = mongo.getDB("telecommobitel");
            DBCollection collection = db.getCollection("createdproject");
            BasicDBObject whereQuery = new BasicDBObject();
            BasicDBObject sortQuery = new BasicDBObject();
            BasicDBObject findQuery = new BasicDBObject();

            whereQuery.put("createdprojectSubCategory", projectSubCategory);

            findQuery.put("createdprojectDateTime", 1);
            findQuery.put("createdprojectName", 1);
            findQuery.put("createdprojectCategory", 1);
            findQuery.put("createdprojectSubCategory", 1);

            findQuery.put("createdprojectTotalscope", 1);
            findQuery.put("createdprojectStartDate", 1);
            findQuery.put("createdprojectEndDate", 1);

            sortQuery.put("createdprojectDateTime", -1);

            DBCursor cursor = collection.find(whereQuery, findQuery).sort(sortQuery);
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
    public JSONArray getProjectNameWithCategoryBuManagerotherProject(String projectCategory) {
        try {
            Mongo mongo = new Mongo("localhost", 27017);
            DB db = mongo.getDB("telecommobitel");
            DBCollection collection = db.getCollection("createdproject");
            BasicDBObject whereQuery = new BasicDBObject();
            BasicDBObject sortQuery = new BasicDBObject();
            BasicDBObject findQuery = new BasicDBObject();

            whereQuery.put("createdprojectCategory", projectCategory);

            findQuery.put("createdprojectDateTime", 1);
            findQuery.put("createdprojectName", 1);
            findQuery.put("createdprojectCategory", 1);
            findQuery.put("createdprojectSubCategory", 1);

            sortQuery.put("createdprojectDateTime", -1);

            DBCursor cursor = collection.find(whereQuery, findQuery).sort(sortQuery);
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
    public JSONArray getImplementationDateByProjectNameManager(String projectName) {
        try {
            Mongo mongo = new Mongo("localhost", 27017);
            DB db = mongo.getDB("telecommobitel");
            DBCollection collection = db.getCollection("createdproject");
            BasicDBObject whereQuery = new BasicDBObject();
//            BasicDBObject sortQuery = new BasicDBObject();
//            BasicDBObject findQuery = new BasicDBObject();                        

            whereQuery.put("createdprojectName", projectName);

//            findQuery.put("createdprojectData", 1);
//            findQuery.put("createdprojectCategory", 1);
//            sortQuery.put("createdprojectDateTime", -1);
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

}
