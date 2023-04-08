package linklibrary.dto.response.test;

import lombok.*;

@ToString
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CommonResponseDto<T>{
    T data;
    String message;
}
