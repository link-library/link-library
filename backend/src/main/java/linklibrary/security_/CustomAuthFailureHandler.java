package linklibrary.security_;//package linklibrary.security_;
//
//import org.springframework.security.authentication.BadCredentialsException;
//import org.springframework.security.authentication.CredentialsExpiredException;
//import org.springframework.security.authentication.DisabledException;
//import org.springframework.security.authentication.InternalAuthenticationServiceException;
//import org.springframework.security.core.AuthenticationException;
//import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
//
//import javax.servlet.ServletException;
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//import java.io.IOException;
//import java.net.URLEncoder;
//
//public class CustomAuthFailureHandler extends SimpleUrlAuthenticationFailureHandler {
//    String errorMessage = null;
//    @Override
//    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {
//        if(exception instanceof BadCredentialsException || exception instanceof InternalAuthenticationServiceException) {
//            errorMessage = "아이디나 비밀번호가 맞지 않습니다. 다시 확인해 주십시오.";
//        }
//        //< account is disabled
//        else if(exception instanceof DisabledException) {
//            errorMessage = "계정이 비활성화 되었습니다. 관리자에게 문의하세요.";
//        }
//        //< expired the credential
//        else if(exception instanceof CredentialsExpiredException) {
//            errorMessage = "비밀번호 유효기간이 만료 되었습니다. 관리자에게 문의하세요.";
//        }
//        else {
//            errorMessage = "알수 없는 이유로 로그인에 실패하였습니다. 관리자에게 문의하세요.";
//        }
//
//        // UTF-8 인코딩 처리
//        errorMessage = URLEncoder.encode(errorMessage, "UTF-8");
//        setDefaultFailureUrl("/login/error?msg=" + errorMessage);
//
//        /**
//         * SimpleUrlAuthenticationFailureHandler 는 AuthenticationFailureHandler 인터페이스를 구현한 구현체
//         * setDefaultFailureUrl() 메서드를 활용, 로그인 시 실패 url 지정
//         */
//        super.onAuthenticationFailure(request, response, exception);
//    }
//}
