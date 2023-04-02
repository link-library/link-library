package linklibrary.dto;

import linklibrary.entity.Category;
import linklibrary.entity.User;
import lombok.*;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.Date;

@Getter
@Setter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PostFormDto { //포스트 생성 폼

    //https://sanghye.tistory.com/36 validation 관련 블로그

    private Long postId;

    @NotBlank(message = "제목을 입력해주세요")
    private String title;
    private String memo;
    @NotBlank(message = "주소를 입력해주세요")
    private String url;
    private Long categoryId;
    private Boolean bookmark;
    LocalDateTime createdAt;



}
