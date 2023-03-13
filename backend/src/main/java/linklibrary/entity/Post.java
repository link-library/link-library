package linklibrary.entity;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Date;

@Entity
@AllArgsConstructor
@Data
@NoArgsConstructor(access = AccessLevel.PUBLIC)
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "post_id",unique = true, nullable = false)
    private Long postId;

    @Column(name = "album_name", unique = false, nullable = false)
    private String title; //제목
    @Lob //긴 문자열 받기
    private String memo; //메모
    private String url; //링크
    @Column(name="created_at", unique = false, nullable = true)
    @CreationTimestamp
    private LocalDateTime createdAt;
    private boolean bookmark; //북마크 여부
    private String createdBy; //생성자

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

}
