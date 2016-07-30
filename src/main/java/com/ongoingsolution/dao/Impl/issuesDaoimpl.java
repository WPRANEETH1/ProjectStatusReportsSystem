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
import com.ongoingsolution.dao.issuesDao;
import com.ongoingsolution.model.Issues;
import org.json.simple.JSONArray;
import org.json.simple.parser.JSONParser;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Praneeth
 */
@Repository
public class issuesDaoimpl implements issuesDao {

    @Override
    public JSONArray getAllissuesData(String ProjectName) {
        try {
            Mongo mongo = new Mongo("localhost", 27017);
            DB db = mongo.getDB("telecommobitel");
            DBCollection collection = db.getCollection("issues");
            BasicDBObject whereQuery = new BasicDBObject();
//            sortQuery.put("createdprojectDateTime", -1);

            whereQuery.put("issuesProjectName", ProjectName);
            DBCursor cursor = collection.find(whereQuery);
            JSON json = new JSON();
            String dataUser = json.serialize(cursor);
            JSONParser parser = new JSONParser();
            Object obj = parser.parse(dataUser);
            JSONArray jsonarray = (JSONArray) obj;

            return jsonarray;

        } catch (Exception e) {
            System.out.println("Exception Error getAllissuesData");
            return null;
        }
    }

    @Override
    public boolean deleteIssues(String issuesId) {
        try {
            Mongo mongo = new Mongo("localhost", 27017);
            DB db = mongo.getDB("telecommobitel");
            DBCollection collection = db.getCollection("issues");

            BasicDBObject whereQuery = new BasicDBObject();
            whereQuery.put("issuesId", issuesId);

            WriteResult result = collection.remove(whereQuery, WriteConcern.SAFE);
            return result.getN() == 1;
        } catch (Exception e) {
            System.out.println("Exception Error deleteIssues");
            return false;
        }

    }

    @Override
    public boolean createIssues(Issues issues) {
        try {
            Mongo mongo = new Mongo("localhost", 27017);
            DB db = mongo.getDB("telecommobitel");
            DBCollection collection = db.getCollection("issues");

            Gson gson = new Gson();
            DBObject dbObject = (DBObject) JSON.parse(gson.toJson(issues));
            WriteResult result = collection.insert(WriteConcern.SAFE, dbObject);
            return true;
        } catch (Exception e) {
            System.out.println("Exception Error createIssues");
            return false;
        }
    }

    @Override
    public boolean updateIssues(Issues issues) {
        try {
            Mongo mongo = new Mongo("localhost", 27017);
            DB db = mongo.getDB("telecommobitel");
            DBCollection collection = db.getCollection("issues");
            BasicDBObject newDocument = new BasicDBObject();
            BasicDBObject newDocument_two = new BasicDBObject();

            newDocument.append("$set", new BasicDBObject().append("issuesDescription", issues.getIssuesDescription()));
            newDocument_two.append("$set", new BasicDBObject().append("issuesRank", issues.getIssuesRank()));
            BasicDBObject searchQuery = new BasicDBObject().append("issuesId", issues.getIssuesId());

            collection.update(searchQuery, newDocument);
            collection.update(searchQuery, newDocument_two);
            return true;
        } catch (Exception e) {
            System.out.println("Exception Error updateIssues");
            return false;
        }
    }

    @Override
    public boolean closedIssues(String issuesId) {
        try {
            Mongo mongo = new Mongo("localhost", 27017);
            DB db = mongo.getDB("telecommobitel");
            DBCollection collection = db.getCollection("issues");
            BasicDBObject newDocument = new BasicDBObject();

            newDocument.append("$set", new BasicDBObject().append("issuesType", "true"));
            BasicDBObject searchQuery = new BasicDBObject().append("issuesId", issuesId);

            collection.update(searchQuery, newDocument);
            return true;
        } catch (Exception e) {
            System.out.println("Exception Error updateIssues");
            return false;
        }
    }

    @Override
    public JSONArray getIssuesById(String issuesId) {
        try {
            Mongo mongo = new Mongo("localhost", 27017);
            DB db = mongo.getDB("telecommobitel");
            DBCollection collection = db.getCollection("issues");
            BasicDBObject whereQuery = new BasicDBObject();
//            sortQuery.put("createdprojectDateTime", -1);

            whereQuery.put("issuesId", issuesId);
            DBCursor cursor = collection.find(whereQuery);
            String dataUser = JSON.serialize(cursor);
            JSONParser parser = new JSONParser();
            Object obj = parser.parse(dataUser);
            JSONArray jsonarray = (JSONArray) obj;

            return jsonarray;

        } catch (Exception e) {
            System.out.println("Exception Error getAllissuesData");
            return null;
        }
    }

}
