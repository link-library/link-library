package linklibrary.securityTest;

import org.json.JSONObject;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
        // 유효한 자격증명을 제공하지 않고 접근하려 할때 401
        String exception = (String) request.getAttribute("exception");

        if (exception == null) {
            setResponse(response, ExceptionCode.UNKNOWN_ERROR);
        }
        //잘못된 타입의 토큰인 경우
        else if (exception.equals(ExceptionCode.WRONG_TYPE_TOKEN.getCode())) {
            setResponse(response, ExceptionCode.WRONG_TYPE_TOKEN);
        }
        //토큰 만료된 경우
        else if (exception.equals(ExceptionCode.EXPIRED_TOKEN.getCode())) {
            setResponse(response, ExceptionCode.EXPIRED_TOKEN);
        }
        //지원되지 않는 토큰인 경우
        else if (exception.equals(ExceptionCode.UNSUPPORTED_TOKEN.getCode())) {
            setResponse(response, ExceptionCode.UNSUPPORTED_TOKEN);
        } else {
            setResponse(response, ExceptionCode.ACCESS_DENIED);
        }
    }

    //한글 출력을 위해 getWriter() 사용
    private void setResponse(HttpServletResponse response, ExceptionCode exceptionCode) throws IOException {
        response.setContentType("application/json;charset=UTF-8");
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);

        JSONObject responseJson = new JSONObject();
        responseJson.put("message", exceptionCode.getMessage());
        responseJson.put("code", exceptionCode.getCode());

        response.getWriter().print(responseJson);
    }
}

