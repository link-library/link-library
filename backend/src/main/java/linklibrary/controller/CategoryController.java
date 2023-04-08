package linklibrary.controller;

import io.swagger.annotations.ApiOperation;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import linklibrary.dto.request.CategoryFormDto;
import linklibrary.dto.response.ResponseData;
import linklibrary.security.auth.PrincipalDetails;
import linklibrary.service.CategoryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@Tag(name = "카테고리", description = "카테고리/생성/수정/삭제")
@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/category")
public class CategoryController {

    private final CategoryService categoryService;
    @Operation(summary = "카테고리 생성", description = "필수값: name (없을 시 예외 메세지 전송)",
            responses = {
                    @ApiResponse(responseCode = "200", description = "카테고리 생성 성공"),
                    @ApiResponse(responseCode = "400", description = "카테고리 생성 실패")
    })
//    @ApiOperation(value = "카테고리 생성", notes = "필수값: name (없을 시 예외 메세지 전송)")
    @PostMapping()
    public ResponseEntity<?> createCategory(@Valid @RequestBody CategoryFormDto categoryFormDto, @AuthenticationPrincipal PrincipalDetails principalDetails) {
        Long savedCategoryId = categoryService.createCategory(categoryFormDto, principalDetails.getUserDto().getUserId());
        return ResponseEntity.ok(new ResponseData("카테고리 생성 완료", savedCategoryId));
    }
    @Operation(summary = "카테고리 수정", description = "필수값: name (없을 시 예외 메세지 전송)",
            responses = {
                    @ApiResponse(responseCode = "200", description = "카테고리 수정 성공"),
                    @ApiResponse(responseCode = "400", description = "카테고리 수정 실패")
    })
//    @ApiOperation(value = "카테고리 수정", notes = "필수값: name (없을 시 예외 메세지 전송)")
    @PutMapping("/{categoryId}")
    public ResponseEntity<?> editCategory(@Valid @RequestBody CategoryFormDto categoryFormDto, @PathVariable final Long categoryId) {
        Long editedCategoryId = categoryService.editCategory(categoryFormDto, categoryId);
        return ResponseEntity.ok(new ResponseData("카테고리 수정 완료", editedCategoryId));
    }
    @Operation(summary = "카테고리 삭제", description = "카테고리 ID를 받아와서 조회후. 매치되면 삭제",
            responses = {
                    @ApiResponse(responseCode = "200", description = "카테고리 삭제 성공"),
                    @ApiResponse(responseCode = "400", description = "카테고리 삭제 실패")
            })
    @DeleteMapping("/{categoryId}")
    public ResponseEntity<?> editCategory(@PathVariable final Long categoryId) {
        categoryService.deleteCategory(categoryId);
        return ResponseEntity.ok(new ResponseData("카테고리 삭제 완료", null));
    }
}
