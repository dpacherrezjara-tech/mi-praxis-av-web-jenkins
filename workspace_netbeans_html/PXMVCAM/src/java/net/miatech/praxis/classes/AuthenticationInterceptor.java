/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.classes;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.log4j.Logger;
//import org.springframework.web.portlet.handler.HandlerInterceptorAdapter;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

/**
 *
 * @author lzambrano
 */
public class AuthenticationInterceptor implements HandlerInterceptor {
    private static final Logger logError = Logger.getLogger("errorLog");
    private String appName = "/AEROMEXICO/";
    public boolean preHandle(HttpServletRequest request,HttpServletResponse response, Object handler) throws Exception {
        logError.info("Interceptor: Pre-handle");
        
        try{ 
            if(request.getSession()==null)
            {
                response.sendRedirect(request.getContextPath()); // appName
                return false;
            }

            if (appName.equals(request.getRequestURI())) {  // appName
                request.getSession().setAttribute("token",request.getSession().getId());
                return true;
            }

            Object token = request.getSession().getAttribute("token");
            if(token == null)
            {
                response.sendRedirect(request.getContextPath()); // appName
                return false;
            }
            else
            {
                return true;
            }
        }
        catch (Exception ex){
            response.sendRedirect(request.getContextPath()); // appName
            return false;
        }
    }

    public void postHandle(HttpServletRequest hsr, HttpServletResponse hsr1, Object o, ModelAndView mav) throws Exception {
        //System.out.println("Post-handle");
        logError.info("Interceptor: Post-handle");
        if(hsr.getSession()==null)
        {
            hsr1.sendRedirect(hsr.getContextPath()); // appName
        }
        else
        {
            Object token = hsr.getSession().getAttribute("token");
            if(token == null)
            {
                hsr1.sendRedirect(hsr.getContextPath()); // appName
            }
        }
    }

    public void afterCompletion(HttpServletRequest hsr, HttpServletResponse hsr1, Object o, Exception excptn) throws Exception {
        //System.out.println("After completion handle");
        logError.info("Interceptor: After-handle");
        if(hsr.getSession()==null)
        {
            hsr1.sendRedirect(hsr.getContextPath()); // appName
        }
        else
        {
            Object token = hsr.getSession().getAttribute("token");
            if(token == null)
            {
                hsr1.sendRedirect(hsr.getContextPath()); // appName
            }
        }
    }
    
}
