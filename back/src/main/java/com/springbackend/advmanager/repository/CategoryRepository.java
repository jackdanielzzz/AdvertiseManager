package com.springbackend.advmanager.repository;

import com.springbackend.advmanager.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    @Query(value = "select c from Category c where c.name = :category and c.deleted = false")
    Category findByCategory(String category);
}
