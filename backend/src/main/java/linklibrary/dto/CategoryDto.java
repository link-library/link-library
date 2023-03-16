package linklibrary.dto;

import linklibrary.entity.Category;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.w3c.dom.stylesheets.LinkStyle;

import java.util.List;
import java.util.stream.Collectors;

@Data
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CategoryDto {

    private Long id;
    private String name;
    private Long depth;
    private List<CategoryDto> children;

    public static CategoryDto of(Category category) {
        return new CategoryDto(
                category.getId(),
                category.getName(),
                category.getDepth(),
                category.getChildren().stream()
                        .map(CategoryDto::of).collect(Collectors.toList())
        );
    }
}
