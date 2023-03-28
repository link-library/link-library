package linklibrary.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@AllArgsConstructor
@Table(name = "Category")
@Data
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
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
