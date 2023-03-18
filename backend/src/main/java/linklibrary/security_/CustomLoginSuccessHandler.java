//package linklibrary.security_;
//
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;
//
//import javax.servlet.ServletException;
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//import java.io.IOException;
//
//@Slf4j
//public class CustomLoginSuccessHandler extends SavedRequestAwareAuthenticationSuccessHandler {
//    @Override
//    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws ServletException, IOException {
//        // 인증이 성공한 경우 아래 로직 수행
//        // SecurityContextHolder > SecurityContext 에 Authentication 을 설정
//        SecurityContextHolder.getContext().setAuthentication(authentication);
//
//        /**
//         * 추후에 admin 페이지를 개발한다면 로그인 성공 후 admin 관련 페이지로 이동하게 설정하기.
//         */
//
//        log.info("로그인 성공");
//        // 찜목록 페이지로 redirect 해준다.
//        response.sendRedirect("/posts?bookmark=true");
//    }
//}
