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
import com.ongoingsolution.dao.riskDao;
import com.ongoingsolution.model.Risk;
import org.json.simple.JSONArray;
import org.json.simple.parser.JSONParser;

/**
 *
 * @author Praneeth
 */
public class riskDaoimpl implements riskDao {

    @Override
    public JSONArray getAllRiskData(String ProjectName) {
        try {
            Mongo mongo = new Mongo("localhost", 27017);
            DB db = mongo.getDB("telecommobitel");
            DBCollection collection = db.getCollection("risk");
            BasicDBObject whereQuery = new BasicDBObject();
//            sortQuery.put("createdprojectDateTime", -1);

            whereQuery.put("riskProjectName", ProjectName);
            DBCursor cursor = collection.find(whereQuery);
            String dataUser = JSON.serialize(cursor);
            JSONParser parser = new JSONParser();
            Object obj = parser.parse(dataUser);
            JSONArray jsonarray = (JSONArray) obj;

            return jsonarray;

        } catch (Exception e) {
            System.out.println("Exception Error getAllRiskData");
            return null;
        }
    }

    @Override
    public boolean deleteRisk(String riskId) {
        try {
            Mongo mongo = new Mongo("localhost", 27017);
            DB db = mongo.getDB("telecommobitel");
            DBCollection collection = db.getCollection("risk");

            BasicDBObject whereQuery = new BasicDBObject();
            whereQuery.put("riskId", riskId);

            WriteResult result = collection.remove(whereQuery, WriteConcern.SAFE);
            return result.getN() == 1;
        } catch (Exception e) {
            System.out.println("Exception Error deleteRisk");
            return false;
        }
    }

    @Override
    public boolean createRisk(Risk risk) {
        try {
            Mongo mongo = new Mongo("localhost", 27017);
            DB db = mongo.getDB("telecommobitel");
            DBCollection collection = db.getCollection("risk");

            Gson gson = new Gson();
            DBObject dbObject = (DBObject) JSON.parse(gson.toJson(risk));
            WriteResult result = collection.insert(WriteConcern.SAFE, dbObject);
            return true;
        } catch (Exception e) {
            System.out.println("Exception Error createRisk");
            return false;
        }
    }

    @Override
    public boolean updateRisk(Risk risk) {
        try {
            Mongo mongo = new Mongo("localhost", 27017);
            DB db = mongo.getDB("telecommobitel");
            DBCollection collection = db.getCollection("risk");
            BasicDBObject newDocument = new BasicDBObject();
            BasicDBObject newDocument_two = new BasicDBObject();
            BasicDBObject newDocument_three = new BasicDBObject();

            newDocument.append("$set", new BasicDBObject().append("riskDescription", risk.getRiskDescription()));
            newDocument_two.append("$set", new BasicDBObject().append("riskRank", risk.getRiskRank()));
            newDocument_three.append("$set", new BasicDBObject().append("riskMitigration", risk.getRiskMitigration()));
            BasicDBObject searchQuery = new BasicDBObject().append("issuesId", risk.getRiskId());

            collection.update(searchQuery, newDocument);
            collection.update(searchQuery, newDocument_two);
            collection.update(searchQuery, newDocument_three);
            return true;
        } catch (Exception e) {
            System.out.println("Exception Error updateRisk");
            return false;
        }
    }

    @Override
    public boolean closedRisk(String riskId) {
        try {
            Mongo mongo = new Mongo("localhost", 27017);
            DB db = mongo.getDB("telecommobitel");
            DBCollection collection = db.getCollection("risk");
            BasicDBObject newDocument = new BasicDBObject();

            newDocument.append("$set", new BasicDBObject().append("riskType", "true"));
            BasicDBObject searchQuery = new BasicDBObject().append("riskId", riskId);

            collection.update(searchQuery, newDocument);
            return true;
        } catch (Exception e) {
            System.out.println("Exception Error closedRisk");
            return false;
        }
    }

    @Override
    public JSONArray getRiskById(String riskId) {
        try {
            Mongo mongo = new Mongo("localhost", 27017);
            DB db = mongo.getDB("telecommobitel");
            DBCollection collection = db.getCollection("risk");
            BasicDBObject whereQuery = new BasicDBObject();
//            sortQuery.put("createdprojectDateTime", -1);

            whereQuery.put("riskId", riskId);
            DBCursor cursor = collection.find(whereQuery);
            String dataUser = JSON.serialize(cursor);
            JSONParser parser = new JSONParser();
            Object obj = parser.parse(dataUser);
            JSONArray jsonarray = (JSONArray) obj;

            return jsonarray;

        } catch (Exception e) {
            System.out.println("Exception Error getRiskById");
            return null;
        }
    }

}
