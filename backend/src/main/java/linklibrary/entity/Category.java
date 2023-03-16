package linklibrary.entity;

import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

import static javax.persistence.FetchType.LAZY;

@Entity
@AllArgsConstructor
@Data
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
public class Category {

    @Id
    @GeneratedValue
    @Column(name = "category_id")
    private Long id;

    private String name;

    // 회의할때 포스트와 카테고리는 N:1 이라 한것같아서 일단 주석해놓을게요
//    @ManyToMany
//    @JoinTable(name = "category_post",
//            joinColumns = @JoinColumn(name = "category_id"),
//            inverseJoinColumns = @JoinColumn(name = "post_id")
//    )
//    private List<Post> posts = new ArrayList<>();

    //계층별 카테고리 코드 시작
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent")
    private Category parent;
    private Long depth;
    @OneToMany(mappedBy = "parent")
    private List<Category> children = new ArrayList<>();
    //계층별 카테고리 코드 끝

    //cascade 때문에 user 와 연관관계를 거는게 맞는지 모르겠음.
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "user_id")
//    private User user;

    /**
     * 카테고리 부모-자식 관계
     */
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name ="parent_id")
    private Category parent;

    @OneToMany(mappedBy = "parent")
    private List<Category> child = new ArrayList<>();
}
