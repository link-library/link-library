package linklibrary.dto.request;

import linklibrary.entity.Category;
import linklibrary.entity.User;
import lombok.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
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
//@Schema 어노테이션은 Swagger 문서에서 해당 객체에 대한 정보를 제공
    //    @ApiModelProperty(example = "abcde1") 이거 로그인폼DTO에 있는데 이거랑 같은 기능인듯 ?
    //찾아봤더니 @Schema가 최신 swagger버전에 어울린다함.
    private Long postId;

    @NotBlank(message = "제목을 입력해주세요")
    private String title;
    private String memo;
    @NotBlank(message = "주소를 입력해주세요")
    private String url;
    @NotNull(message = "카테고리는 필수 선택 사항입니다.")
    private Long categoryId;
    private Boolean bookmark;
    LocalDateTime createdAt;



}
