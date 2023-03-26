package linklibrary.security.jwt;//package linklibrary.security.jwt;
//
//import com.fasterxml.jackson.databind.ObjectMapper;
//import io.jsonwebtoken.JwtException;
//import lombok.Data;
//import org.springframework.http.MediaType;
//import org.springframework.web.filter.OncePerRequestFilter;
//
//import javax.servlet.FilterChain;
//import javax.servlet.ServletException;
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//import java.io.IOException;
//import io.jsonwebtoken.ExpiredJwtException;
//
//public class ExceptionHandlerFilter extends OncePerRequestFilter {
//    // https://kdg-is.tistory.com/228
//    @Override
//    protected void doFilterInternal(
//            HttpServletRequest request,
//            HttpServletResponse response,
//            FilterChain filterChain
//    ) throws ServletException, IOException {
//
//        try{
//            filterChain.doFilter(request, response);
//        }catch (ExpiredJwtException e){
//            //토큰의 유효기간 만료
//            setErrorResponse(response, ErrorCode.TOKEN_EXPIRED);
//        }catch (JwtException | IllegalArgumentException e){
//            //유효하지 않은 토큰
//            setErrorResponse(response, ErrorCode.INVALID_TOKEN);
//        }
//    }
//    private void setErrorResponse(
//            HttpServletResponse response,
//            ErrorCode errorCode
//    ){
//        ObjectMapper objectMapper = new ObjectMapper();
//        response.setStatus(errorCode.getHttpStatus().value());
//        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
//        ErrorResponse errorResponse = new ErrorResponse(errorCode.getCode(), errorCode.getMessage());
//        try{
//            response.getWriter().write(objectMapper.writeValueAsString(errorResponse));
//        }catch (IOException e){
//            e.printStackTrace();
//        }
//    }
//
//    @Data
//    public static class ErrorResponse{
//        private final Integer code;
//        private final String message;
//    }
//}