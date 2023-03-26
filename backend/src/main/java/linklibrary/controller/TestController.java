package linklibrary.controller;

import linklibrary.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class TestController {

    private final CategoryRepository categoryRepository;

    @GetMapping("/test")
    public String test(@RequestParam(defaultValue = "latest") String sort) {
        return "test 데이터 입니다";
    }

    @GetMapping("/test2")
    public String test2() {
        return "test 데이터 입니다22";
    }


}
