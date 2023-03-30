package linklibrary.security;

import linklibrary.repository.UserRepository;
import linklibrary.security.jwt.JwtAuthenticationFilter;
import linklibrary.security.jwt.JwtAuthorizationFilter;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.filter.CorsFilter;

import javax.servlet.http.HttpServletResponse;

@Configuration
@EnableWebSecurity
@AllArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final CorsFilter corsFilter;
    private final UserRepository userRepository;

    /**
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS) //세션 방식을 쓰지 않겠다.
                .and()
                .addFilter(corsFilter) //인증이 있을 땐 cors 해결 필터를 여기 걸어줘야 함
                .formLogin().disable()
                .addFilter(new JwtAuthenticationFilter(authenticationManager()))
                .addFilter(new JwtAuthorizationFilter(authenticationManager(), userRepository))
                .httpBasic().disable()
                .authorizeRequests()
                .antMatchers("/joinCheck").authenticated()
                .antMatchers("/**").permitAll()
                .anyRequest().authenticated();
    }
*/

    //기존의 설정과 로그아웃 관련 설정을 함께 사용
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS) //세션 방식을 쓰지 않겠다.
                .and()
                .addFilter(corsFilter) //인증이 있을 땐 cors 해결 필터를 여기 걸어줘야 함
                .formLogin().disable()
//                .addFilterBefore(new ExceptionHandlerFilter(), UsernamePasswordAuthenticationFilter.class) //예외처리 핸들러 추가
                .addFilter(new JwtAuthenticationFilter(authenticationManager()))
                .addFilter(new JwtAuthorizationFilter(authenticationManager(), userRepository))
                .httpBasic().disable()
                .authorizeRequests()
                .antMatchers("/joinCheck").authenticated()
                .antMatchers("/**").permitAll()
                .anyRequest().authenticated()
                .and()
                .logout()
                .logoutRequestMatcher(new AntPathRequestMatcher("/logout", "POST"))
                .logoutSuccessHandler((request, response, authentication) -> {
                    response.setStatus(HttpServletResponse.SC_OK);
                    response.setContentType("application/json");
                    response.setCharacterEncoding("UTF-8");
                    response.getWriter().write("{\"message\":\"로그아웃 성공\"}");
                })
                .permitAll();
    }

}
