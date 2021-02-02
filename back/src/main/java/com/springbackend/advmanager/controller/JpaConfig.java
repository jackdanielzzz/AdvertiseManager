package com.springbackend.advmanager.controller;

import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

import javax.sql.DataSource;

@Configuration
public class JpaConfig {
    @Bean(name = "mySqlDataSource")
    @Primary
    public DataSource getDataSource()
    {
            DataSourceBuilder dataSourceBuilder = DataSourceBuilder.create();
            dataSourceBuilder.url("jdbc:mysql://localhost:3306/advmanage");
            dataSourceBuilder.username("root");
            dataSourceBuilder.password("123");
            return dataSourceBuilder.build();
    }
}

