/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers;

import java.io.InputStream;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpSession;

import net.miatech.praxis.classes.CurrentSession;
import net.miatech.praxis.exceptions.SpringException;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

/**
 *
 * @author lzambrano
 */
@Controller
@Scope("request")
public class BaseController {

    @Autowired
    public CurrentSession serverSession;
    private Properties prop;
    private HttpSession httpSession;
    private Map<String, Object> propertySession;
    public String SESSION_CONTROL = "SESSION_CONTROL";
    
    static Logger log = Logger.getLogger(BaseController.class.getName());

    public HttpSession CurrentSession() {
        ServletRequestAttributes attr = (ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();
        return attr.getRequest().getSession(); // true == allow create
    }

    public void InitialSession(HttpSession session) {
        
        httpSession = session;
        if (serverSession.getPropertySession() == null) {

            prop = new Properties();
            InputStream is;

            try {
                ServletContext context = httpSession.getServletContext();
                is = context.getResourceAsStream("/WEB-INF/configs/CFGI0001.properties");
                if (is != null) {
                    prop.load(is);
                    propertySession = new HashMap<String, Object>();
                    for (Enumeration e = prop.propertyNames(); e.hasMoreElements();) {
                        Object obj = e.nextElement(); // Obtenemos el objeto
                        propertySession.put(obj.toString(), prop.getProperty(obj.toString()));
                    }
                    propertySession.put("PROPERTIES", "1");
                    serverSession.setPropertySession(propertySession);
                    if (serverSession.getAppRoot().length() == 0) // Nos aseguramos que solo se asigne por unica vez.
                    {
                        serverSession.setAppRoot(getAppRoot());
                    }
                    //httpSession.setAttribute("serverSession", serverSession);
                }

            } catch (Exception e) {
                throw new SpringException(e);
            }
        }
    }

    private String getAppRoot() {
        ServletRequestAttributes attr = (ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();
        String appRoot = "";
        appRoot = attr.getRequest().getScheme() + "://" + attr.getRequest().getLocalAddr() + ":" + attr.getRequest().getLocalPort() + attr.getRequest().getContextPath();
        //System.out.println("approoot: " + appRoot);
        return appRoot;
    }
    
    
    
}
