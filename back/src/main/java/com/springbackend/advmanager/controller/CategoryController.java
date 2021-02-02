package com.springbackend.advmanager.controller;

import com.springbackend.advmanager.model.Banner;
import com.springbackend.advmanager.model.Category;
import com.springbackend.advmanager.repository.BannerRepository;
import com.springbackend.advmanager.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private BannerRepository bannerRepository;

    @GetMapping("")
    public List<Category> getAllCategories(){
        return categoryRepository.findAll();
    }

    @PostMapping(value = "/delete/{id}")
    public List<String> deleteCategory(@PathVariable Long id) {
        List<Banner> bannerList = bannerRepository.findByCategoryId(id);
        List<String> strings = new ArrayList<>();
        bannerList.forEach(banner -> strings.add(banner.getName()));

        if (bannerList.size()>0)
            return strings;
        else
        {
            categoryRepository.findById(id).map(category -> {
                category.setDeleted(true);
                return categoryRepository.save(category);
            });
               return strings;
        }
    }

    @PostMapping(value = "/new")
    public ResponseEntity<String> saveNewCategory(@RequestBody Category category) {
        if (category != null) categoryRepository.save(category);

        return new ResponseEntity<>("added", HttpStatus.OK);
    }

    @PostMapping(value = "/edit/{id}")
    public ResponseEntity<String> editCategory(@RequestBody Category inputCategory, @PathVariable Long id) {
        if (categoryRepository.existsById(id)) {
            categoryRepository.findById(id).map(category -> {
                category.setName(inputCategory.getName());
                category.setRequestName(inputCategory.getRequestName());
                return categoryRepository.save(category);
            });
            return ResponseEntity.status(HttpStatus.OK).body("updated successfully");
        } else
            return ResponseEntity.badRequest().body("error");

    }
}
