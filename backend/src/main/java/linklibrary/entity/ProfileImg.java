package linklibrary.entity;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProfileImg {

    @Id
    @GeneratedValue
    @Column(name = "profile_img_id")
    private Long id;

    private String storeFileName; //저장할때 쓰는 파일 이름
}
