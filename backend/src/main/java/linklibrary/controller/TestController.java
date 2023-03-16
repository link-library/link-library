package linklibrary.controller;

import linklibrary.dto.CategoryDto;
import linklibrary.dto.ResponseData;
import linklibrary.entity.Category;
import linklibrary.repository.CategoryRepository;
import linklibrary.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class TestController {

    private final CategoryService categoryService;
    private final CategoryRepository categoryRepository;

    @GetMapping("/test")
    public String test(@RequestParam(defaultValue = "latest") String sort) {
        return "test 데이터 입니다";
    }

    @GetMapping("/test2")
    public String test2() {
        return "test 데이터 입니다22";
    }

    /**
     * 계층별 카테고리 테스트
     */
    @GetMapping("/test/category")
    public ResponseEntity<ResponseData> categoryTest() {

        List<CategoryDto> categoryList = categoryService.getCategoryList();
        return new ResponseEntity<>(new ResponseData("계층별 카테고리 반환", categoryList), HttpStatus.OK);
    }
    @PostMapping("/test/category")
    public void categoryInit() {
        categoryService.initDb(); // db에 임의 카테고리 4개 삽입.
    }
}
