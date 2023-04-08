package linklibrary.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@Schema(title = "포스트 응답", description ="포스트가 가진 정보들로 응답한다")
@Builder
public class PostDto {
    //@Schema 어노테이션은 Swagger 문서에서 해당 객체에 대한 정보를 제공
    //    @ApiModelProperty(example = "abcde1") 이거 로그인폼DTO에 있는데 이거랑 같은 기능인듯 ?
    //찾아봤더니 @Schema가 최신 swagger버전에 어울린다함.

    @Schema(title = "포스트 ID", example="1")
    Long postId;
    @Schema(title = "포스트 제목", example="제목1")
    String title;
    @Schema(title = "포스트 내용", example="메모1")
    String memo;
    @Schema(title = "게시물 url", example="www.naver.com")
    String url;
    @Schema(title = "북마크 on/off", example="true")
    boolean bookmark;

    @Schema(title = "카테고리 ID", example="1")
    private Long categoryId;

    @Schema(title = "카테고리 제목", example="카테고리1")
    private String categoryName;
    @Schema(title = "사용자 id", example="1")
    private Long userId;
    @Schema(title = "사용자의 닉네임", example="nickname1")
    private String nickname;

    @Schema(title = "포스트 생성날짜", example="2023-03-12T04:00:16.000+00:00")
    LocalDateTime createdAt;

}
