package linklibrary.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
//@Schema(title = "게시글 생성 요청", description = "회원가입 폼을 작성하여 요청한다.")
public class PostDto {
    //@Schema 어노테이션은 Swagger 문서에서 해당 객체에 대한 정보를 제공
    //    @ApiModelProperty(example = "abcde1") 이거 로그인폼DTO에 있는데 이거랑 같은 기능인듯 ?
    //찾아봤더니 @Schema가 최신 swagger버전에 어울린다함.
    Long postId;
    String title;
    String memo;

    String url;
    boolean bookmark;

    private Long categoryId;

    private String categoryName;

    private Long userId;
    private String nickname;

    LocalDateTime createdAt;

}
