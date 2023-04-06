package linklibrary.swagger;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.ParameterBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.schema.ModelRef;
import springfox.documentation.service.*;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spi.service.contexts.SecurityContext;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static linklibrary.security.filter.JwtFilter.AUTHORIZATION_HEADER;


/**
 * Swagger 문서로 만들고 싶지 않을 경우 해당 컨트롤러에 @ApiIgnore 어노테이션을 추가하여 제외시킬 수 있음.
 * http://localhost:8080/swagger-ui/index.html
 */

//@Configuration
//@EnableSwagger2
//public class SwaggerConfig {
//
//    @Bean
//    public Docket api() {
//        // accessToken 헤더 값을 받기 위해 추가한 코드
//        // ParameterBuilder를 통해 모든 API 전역 파라미터로 설정함
//        Parameter parameterBuilder1 = new ParameterBuilder().name("Authorization").description("Access Token")
//                .modelRef(new ModelRef("string"))
//                .parameterType("header")
//                .required(false)
//                .build();
//        // 헤더 값 목록
//        List<Parameter> globalParamters = new ArrayList<>();
//        globalParamters.add(parameterBuilder1);
//
//        return new Docket(DocumentationType.OAS_30)
//                .useDefaultResponseMessages(true) // Swagger 에서 제공해주는 기본 응답 코드 (200, 401, 403, 404) 등의 노출 여부
//                .globalOperationParameters(globalParamters)
//                .apiInfo(apiInfo()) // Swagger UI 로 노출할 정보
//                .select()
//                .apis(RequestHandlerSelectors.basePackage("linklibrary.controller")) // api 스펙이 작성되어 있는 패키지 (controller)
//                .paths(PathSelectors.any()) // apis 에 위치하는 API 중 특정 path 를 선택
//                .build();
//    }
//
//    public ApiInfo apiInfo() {
//        return new ApiInfoBuilder()
//                .title("SpringBoot Practice Rest API Documentation")
//                .description("링크라이브러리 API")
//                .version("0.1")
//                .build();
//    }
//}

@Configuration
@RequiredArgsConstructor
public class SwaggerConfig {

    // Swagger 설정
    @Bean
    public Docket api() {
        return new Docket(DocumentationType.OAS_30)
                // 인증 설정
                .securityContexts(Arrays.asList(securityContext()))
                .securitySchemes(Arrays.asList(apiKey()))
                .select()
                // API 문서를 생성할 대상 선택
                .apis(RequestHandlerSelectors.basePackage("linklibrary.controller"))
                .paths(PathSelectors.any())
                .build();
    }

    // 인증에 대한 정보 생성
    private SecurityContext securityContext() {
        return SecurityContext.builder()
                .securityReferences(defaultAuth())
                .build();
    }

    // 인증에 대한 정보 설정
    private List<SecurityReference> defaultAuth() {
        AuthorizationScope authorizationScope = new AuthorizationScope("global", "accessEverything");
        AuthorizationScope[] authorizationScopes = new AuthorizationScope[1];
        authorizationScopes[0] = authorizationScope;
        return Arrays.asList(new SecurityReference("Authorization", authorizationScopes));
    }

    // 헤더에 JWT 토큰을 포함하는 ApiKey 객체 생성.
    private ApiKey apiKey() {
        return new ApiKey("Authorization", "Authorization", "header");
    }
}
