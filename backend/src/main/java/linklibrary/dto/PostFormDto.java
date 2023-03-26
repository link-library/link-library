package linklibrary.dto;

import linklibrary.entity.Category;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@ToString
public class PostFormDto {

    //https://sanghye.tistory.com/36 validation 관련 블로그

    @NotBlank(message = "제목을 입력해주세요")
    private String title;
    private String memo;
    @NotBlank(message = "주소를 입력해주세요")
    private String url;
<<<<<<< HEAD
    //Category category;
    private Long categoryId; // 카테고리 ID를 받기 위해 Long 타입으로 변경 By chat gpt4

    private Boolean bookmark;
    LocalDateTime createdAt;



=======
    private Category category;
>>>>>>> parent of 0fe8305 (Merge pull request #50 from link-library/plan11plan)
}
