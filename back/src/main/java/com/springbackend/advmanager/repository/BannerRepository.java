package com.springbackend.advmanager.repository;

import com.springbackend.advmanager.model.Banner;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BannerRepository extends JpaRepository<Banner, Long> {
    @Query(value = "select b from Banner b where b.categoryId.requestName = :category "
                 + "and b.deleted = false and b.categoryId.deleted = false")
    List<Banner> findByCategoryName(String category);

    @Query(value = "select b from Banner b where b.categoryId.id = :id "
            + "and b.deleted = false and b.categoryId.deleted = false")
    List<Banner> findByCategoryId(Long id);

//    @Query("select b from Banner b where b.id = :id")
//    Banner findOneById(Long id);
}
