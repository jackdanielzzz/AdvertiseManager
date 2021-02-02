package com.springbackend.advmanager.controller;

import com.springbackend.advmanager.model.Banner;
import com.springbackend.advmanager.model.Request;
import com.springbackend.advmanager.repository.BannerRepository;
import com.springbackend.advmanager.repository.RequestRepository;
import org.joda.time.DateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.datasource.init.ResourceDatabasePopulator;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.Collections;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/")
public class RequestController {
    @Autowired
    DataSource dataSource;

    @Autowired
    private RequestRepository requestRepository;

    @Autowired
    private BannerRepository bannerRepository;

    @RequestMapping(value = "bid", method = RequestMethod.GET)
    public ResponseEntity<String> showEditMeetingForm(@Param("category") final String category,
                                            @RequestHeader(value="User-Agent") String userAgent,
                                            HttpServletRequest httpRequest) {

        List<Banner> bannerList = bannerRepository.findByCategoryName(category);
        bannerList.sort(Collections.reverseOrder(new myUtils.sortByPrice()));
        String remoteAddress = myUtils.getIPFromRequest(httpRequest);
        DateTime today = new DateTime().withTimeAtStartOfDay();
        DateTime tomorrow = today.plusDays(1).withTimeAtStartOfDay();
        List<Request> requestList = requestRepository.findByArgs(userAgent, remoteAddress, today.toDate(), tomorrow.toDate());

        /* Filter banner list according current user-agent, ip and today date */
        for(Request request : requestList)
            if (request.getBannerId() != null)
                bannerList.removeIf(x -> request.getBannerId().getId().equals(x.getId()));

        Request newRequest = new Request();
        newRequest.setDate(new Timestamp(System.currentTimeMillis()));
        newRequest.setIpAddress(remoteAddress);
        newRequest.setUserAgent(userAgent);
        if (bannerList.size() > 0) newRequest.setBannerId(bannerList.get(0));
        requestRepository.save(newRequest);

        return bannerList.size() > 0 ? new ResponseEntity(bannerList.get(0).getContent(), HttpStatus.OK)
                                     : new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping(value = "/load")
    public String loadData() {
        ResourceDatabasePopulator rdp = new ResourceDatabasePopulator();
        rdp.addScript(new ClassPathResource(
                "static/data-mysql.sql"));

        try {
            Connection connection = dataSource.getConnection();
            rdp.populate(connection); // this starts the script execution, in the order as added
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return "Successfully added data";
    }


}