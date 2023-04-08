package linklibrary.dto.response;

import com.querydsl.core.annotations.QueryProjection;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Lob;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@Builder  //조회용
@Schema(title = "포스트 응답", description ="포스트가 가진 정보들로 응답한다")
public class PostDto1 {
    //@Schema 어노테이션은 Swagger 문서에서 해당 객체에 대한 정보를 제공
    //    @ApiModelProperty(example = "abcde1") 이거 로그인폼DTO에 있는데 이거랑 같은 기능인듯 ?
    //찾아봤더니 @Schema가 최신 swagger버전에 어울린다함.

    @Schema(title = "포스트 ID", example="1")
    private Long postId;
    @Schema(title = "포스트 제목", example="제목1")
    private String title;
    @Lob
    @Schema(title = "포스트 내용", example="메모1")
    private String memo;
    @Schema(title = "게시물 url", example="www.naver.com")
    private String url;
    @Schema(title = "북마크 on/off", example="true")
    private boolean bookmark;
    @Schema(title = "카테고리 제목", example="카테고리1")
    private String nickname;
    @Schema(title = "포스트 생성날짜", example="2023-03-12T04:00:16.000+00:00")
    private LocalDateTime updatedAt;

    @Schema(title = "카테고리 제목", example="카테고리1")
    private String categoryName;

    @QueryProjection
    public PostDto1(Long postId, String title, String memo, String url, boolean bookmark, String nickname, LocalDateTime updatedAt, String categoryName) {
        this.postId = postId;
        this.title = title;
        this.memo = memo;
        this.url = url;
        this.bookmark = bookmark;
        this.nickname = nickname;
        this.updatedAt = updatedAt;
        this.categoryName = categoryName;
    }
}
