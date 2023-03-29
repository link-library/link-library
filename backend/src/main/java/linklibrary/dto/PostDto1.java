package linklibrary.dto;

import com.querydsl.core.annotations.QueryProjection;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@Builder
public class PostDto1 {
    private Long postId;
    private String title;
    private String memo;
    private String url;
    private boolean bookmark;
    private String nickname;
    private LocalDateTime createdAt;

    @QueryProjection
    public PostDto1(Long postId, String title, String memo, String url, boolean bookmark, String nickname, LocalDateTime createdAt) {
        this.postId = postId;
        this.title = title;
        this.memo = memo;
        this.url = url;
        this.bookmark = bookmark;
        this.nickname = nickname;
        this.createdAt = createdAt;
    }
}