package linklibrary.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@AllArgsConstructor
@Table(name = "Category")
@ToString
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
//@Builder 어노테이션을 사용하면 @Setter 어노테이션을 사용하지 않아도 됩니다.
// 하지만, 만약 객체의 일부 필드를 동적으로 수정해야 한다면, 해당 필드에 대해 @Setter 어노테이션을 추가하여 값을 변경할 수 있습니다.
public class Category {

    @Id
    @GeneratedValue
    @Column(name = "category_id")
    private Long id;

    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;

    @Builder.Default
    @OneToMany(mappedBy = "category")
    private List<Post> posts = new ArrayList<>();
}
