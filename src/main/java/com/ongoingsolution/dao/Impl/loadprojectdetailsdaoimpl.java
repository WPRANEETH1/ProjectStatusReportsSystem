/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ongoingsolution.dao.Impl;

import com.mongodb.AggregationOutput;
import com.mongodb.BasicDBList;
import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;
import com.mongodb.Mongo;
import com.mongodb.util.JSON;
import com.ongoingsolution.dao.loadprojectdetailsdao;
import java.util.ArrayList;
import java.util.List;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Praneeth
 */
@Repository
public class loadprojectdetailsdaoimpl implements loadprojectdetailsdao {

    //aaa
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

    //bbb
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

    //dd
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

    //cc
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

    @Override
    public JSONArray managerDashboardviewAllProject() {
        try {
            Mongo mongo = new Mongo("localhost", 27017);
            DB db = mongo.getDB("telecommobitel");
            DBCollection collection = db.getCollection("createdproject");

            List<BasicDBObject> pipeline = new ArrayList<BasicDBObject>();
            BasicDBObject unwind = new BasicDBObject();
            BasicDBObject push = new BasicDBObject();
            BasicDBObject grouped = new BasicDBObject();

            BasicDBObject projectParams = new BasicDBObject();
            projectParams.put("createdprojectName", 1);
            projectParams.put("createdprojectData", 1);

            unwind.put("$unwind", "$createdprojectData");

            push.put("$push", "$createdprojectData");
            grouped.put("_id", "$_id");
            grouped.put("createdprojectData", push);

            pipeline.add(new BasicDBObject("$project", projectParams));
            pipeline.add(unwind);
            pipeline.add(new BasicDBObject("$match", new BasicDBObject("createdprojectData.Status", "OnAir")));
            pipeline.add(new BasicDBObject("$group", grouped));
//            BasicDBObject whereQuery = new BasicDBObject();
//            BasicDBObject sortQuery = new BasicDBObject();
//            BasicDBObject findQuery = new BasicDBObject();
//            BasicDBObject elemMatch = new BasicDBObject();
////            whereQuery.put("createdprojectName", "Buffer Stock");
////            whereQuery.put("createdprojectData.Status", new BasicDBObject("$eq",null));
//            DBObject statusQuery = new BasicDBObject("Status", "OnAir");   
//            DBObject fields = new BasicDBObject("$elemMatch", statusQuery);
//            DBObject query = new BasicDBObject("createdprojectData",fields);
//            findQuery.put("createdprojectData", 1);
//            findQuery.put("createdprojectCategory", 1);
//            sortQuery.put("createdprojectDateTime", -1);
            System.out.println(pipeline);
            AggregationOutput cursor = collection.aggregate(pipeline);

            JSONArray jsonArray = new JSONArray();
            for (DBObject res : cursor.results()) {
                System.out.println(res);
                JSONObject jsonobj = new JSONObject();
                jsonobj.put("_id", res.get("_id"));
                jsonobj.put("createdprojectName", res.get("createdprojectName"));
                jsonobj.put("createdprojectData", res.get("createdprojectData"));
                jsonArray.add(jsonobj);
            }
//            String dataUser = JSON.serialize(cursor);
//            JSONParser parser = new JSONParser();
//            Object obj = parser.parse(dataUser);
//            JSONArray jsonarray = (JSONArray) obj;

            return jsonArray;

        } catch (Exception e) {
            System.out.println("Exception Error managerDashboardviewAllProject");
            return null;
        }
    }

}
