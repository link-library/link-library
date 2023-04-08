package linklibrary.dto.response;

import com.querydsl.core.annotations.QueryProjection;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Lob;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@Builder  //조회용
public class PostDto1 {
    //@Schema 어노테이션은 Swagger 문서에서 해당 객체에 대한 정보를 제공
    //    @ApiModelProperty(example = "abcde1") 이거 로그인폼DTO에 있는데 이거랑 같은 기능인듯 ?
    //찾아봤더니 @Schema가 최신 swagger버전에 어울린다함.
    private Long postId;
    private String title;
    @Lob
    private String memo;
    private String url;
    private boolean bookmark;
    private String nickname;
    private LocalDateTime updatedAt;
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
