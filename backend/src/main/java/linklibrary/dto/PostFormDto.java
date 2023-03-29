package linklibrary.dto;

import linklibrary.entity.Category;
import lombok.*;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PostFormDto {

    //https://sanghye.tistory.com/36 validation 관련 블로그

    @NotBlank(message = "제목을 입력해주세요")
    private String title;
    private String memo;
    @NotBlank(message = "주소를 입력해주세요")
    private String url;

//    private Category category;  //카테고리 id 받아오는걸로 바꾸겠습니다.
    private Long categoryId;
    private Boolean bookmark;
    LocalDateTime createdAt;



}
