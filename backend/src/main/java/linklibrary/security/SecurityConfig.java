package linklibrary.security;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable(); //csrf 끄기
        http.authorizeRequests()
                .antMatchers("*").permitAll()
                .anyRequest().authenticated()
                .and()
                .formLogin()
                .loginPage("/login")
                .successHandler(customLoginSuccessHandler())
                .failureHandler(failureHandler())
                .failureForwardUrl("/login/error")
                .and()
                .logout()
                .logoutUrl("/logout")
                .logoutSuccessUrl("/login"); //로그아웃하면 팝업이라도 띄우고 login 페이지로 보내야 할 듯.

        //postman 설정  (포스트맨에도 authorization 해줘야 함)
        http.httpBasic().and();
        //cors 설정
        http.authorizeRequests().and().cors();
    }

    /**
     * cors 에러 해결 (스프링 시큐리티에서)
     */
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        configuration.addAllowedOriginPattern("*");
        configuration.addAllowedHeader("*");
        configuration.addAllowedMethod("*");
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    /**
     * 로그인 성공시 처리할 핸들러
     */
    @Bean
    public CustomLoginSuccessHandler customLoginSuccessHandler() {
        return new CustomLoginSuccessHandler();
    }

    /**
     * 로그인 실패시 처리할 핸들러
     */
    @Bean
    public AuthenticationFailureHandler failureHandler() {
        return new CustomAuthFailureHandler();
    }

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public UserDetailsServiceImpl userDetailsService() {
        return new UserDetailsServiceImpl();
    }

    /**
     * AuthenticationManager userDetailService 등록
     * userDetailService 로 리포에 데이터 있는지 없는지 여부 확인
     */
    @Override
    public void configure(AuthenticationManagerBuilder authenticationManagerBuilder) throws Exception {
        authenticationManagerBuilder.userDetailsService(userDetailsService()).passwordEncoder(bCryptPasswordEncoder());
    }

}
