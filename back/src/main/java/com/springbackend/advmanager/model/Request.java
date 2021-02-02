package com.springbackend.advmanager.model;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
public class Request {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "banner_id", referencedColumnName = "id")
    private Banner bannerId;

    private String userAgent;

    private String ipAddress;
    private Timestamp date;

    public Request() {
    }

    public Request(Integer id, Banner bannerId, String userAgent, String ipAddress, Timestamp date) {
        this.bannerId = bannerId;
        this.userAgent = userAgent;
        this.ipAddress = ipAddress;
        this.date = date;
    }

    public Banner getBannerId() {
        return bannerId;
    }

    public void setBannerId(Banner bannerId) {
        this.bannerId = bannerId;
    }

    public String getUserAgent() {
        return userAgent;
    }

    public void setUserAgent(String userAgent) {
        this.userAgent = userAgent;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getIpAddress() {
        return ipAddress;
    }

    public void setIpAddress(String ipAddress) {
        this.ipAddress = ipAddress;
    }

    public Timestamp getDate() {
        return date;
    }

    public void setDate(Timestamp date) {
        this.date = date;
    }
}
