package linklibrary.dto;

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
