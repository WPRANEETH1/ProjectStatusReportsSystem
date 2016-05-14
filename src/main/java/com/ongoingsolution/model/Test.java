package com.ongoingsolution.model;
// Generated Dec 24, 2015 10:23:03 AM by Hibernate Tools 4.3.1


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import static javax.persistence.GenerationType.IDENTITY;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Test generated by hbm2java
 */
@Entity
@Table(name="test"
    ,catalog="autoservices"
)
public class Test  implements java.io.Serializable {


     private Integer testId;
     private String address;
     private String game;
     private String name;

    public Test() {
    }

    public Test(String address, String game, String name) {
       this.address = address;
       this.game = game;
       this.name = name;
    }
   
     @Id @GeneratedValue(strategy=IDENTITY)

    
    @Column(name="test_id", unique=true, nullable=false)
    public Integer getTestId() {
        return this.testId;
    }
    
    public void setTestId(Integer testId) {
        this.testId = testId;
    }

    
    @Column(name="address", nullable=false, length=50)
    public String getAddress() {
        return this.address;
    }
    
    public void setAddress(String address) {
        this.address = address;
    }

    
    @Column(name="game", nullable=false, length=50)
    public String getGame() {
        return this.game;
    }
    
    public void setGame(String game) {
        this.game = game;
    }

    
    @Column(name="name", nullable=false, length=50)
    public String getName() {
        return this.name;
    }
    
    public void setName(String name) {
        this.name = name;
    }




}


