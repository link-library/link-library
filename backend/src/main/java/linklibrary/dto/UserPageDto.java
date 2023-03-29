package linklibrary.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserPageDto {

    private Long userId;
    private String nickname; //닉네임
    private Integer totalPost; //총 post 수
    private String storeFileName; //저장된 파일 이름.
}
