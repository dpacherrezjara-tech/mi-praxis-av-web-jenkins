/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package net.miatech.beans;

import flex.messaging.FlexContext;
import flex.messaging.FlexSession;
import java.io.IOException;
import java.io.InputStream;
import java.util.Enumeration;
import java.util.Properties;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpSession;
import net.miatech.beans.implement.IServerSession;
import net.miatech.provider.ConnectionIBMDB2Server;

/**
 *
 * @author rmayta
 */
public class ServerSession implements IServerSession {
    private HttpSession httpSession;
    private FlexSession flexSession;
    private MemoSession memoSession;
    private Properties prop;

    public ServerSession(MemoSession session){
        memoSession = session;
    }
    
    public ServerSession(HttpSession session){
        httpSession = session;

        if(httpSession.getAttribute("PROPERTIES") == null){
            ServletContext context = httpSession.getServletContext();

            prop = new Properties();
            InputStream is;

            try{
                is = context.getResourceAsStream("/WEB-INF/configs/CFGI0001.properties");
                if(is != null){
                    prop.load(is);

                    for(Enumeration e = prop.propertyNames(); e.hasMoreElements();){
                        Object obj = e.nextElement(); // Obtenemos el objeto
                        httpSession.setAttribute(obj.toString(), prop.getProperty(obj.toString()));
                    }

                    httpSession.setAttribute("PROPERTIES", true);
                }

            }catch(IOException ioe){
                httpSession.setAttribute("PROPERTIES", null);
            }
        }
    }

    public ServerSession(){
        flexSession = FlexContext.getFlexSession();

        if(flexSession.getAttribute("PROPERTIES") == null){
            ServletContext context = FlexContext.getServletContext();

            prop = new Properties();
            InputStream is;

            try{
                is = context.getResourceAsStream("/WEB-INF/configs/CFGI0001.properties");
                if(is != null){
                    prop.load(is);

                    for(Enumeration e = prop.propertyNames(); e.hasMoreElements();){
                        Object obj = e.nextElement(); // Obtenemos el objeto
                        flexSession.setAttribute(obj.toString(), prop.getProperty(obj.toString()));
                    }

                    flexSession.setAttribute("PROPERTIES", true);
                }

            }catch(IOException ioe){
                flexSession.setAttribute("PROPERTIES", null);
            }
        }
    }

    @Override
    public String getProperty(String name){
        String rtn;

        if(flexSession != null){
            if(flexSession.getAttribute(name) != null){
                rtn = (String)flexSession.getAttribute(name);
            }else{
                rtn = "";
            }
        }else if(httpSession != null){
            if(httpSession.getAttribute(name) != null){
                rtn = (String)httpSession.getAttribute(name);
            }else{
                rtn = "";
            }
        }else{
            rtn = "";
        }

        return rtn;
    }

    /**
     * @deprecated
     */
    @Deprecated
    @Override
    public void setAttribute(String name, Object value)
    {
        if(flexSession != null){
            flexSession.setAttribute(name, value);
        }else if(httpSession != null){
            httpSession.setAttribute(name, value);
        }
    }

    /**
     * @deprecated
     */
    @Deprecated
    @Override
    public Object getAttribute(String name)
    {
        if(flexSession != null){
            return flexSession.getAttribute(name);
        }else if(httpSession != null){
            return httpSession.getAttribute(name);
        }else{
            return null;
        }
    }

    /**
     * @deprecated
     */
    @Deprecated
    @Override
    public void removeAttribute(String name)
    {
        if(flexSession != null){
            flexSession.removeAttribute(name);
        }else if(httpSession != null){
            httpSession.removeAttribute(name);
        }
    }

    @Override
    public MemoSession getMemoSession(){
        return memoSession;
    }
    
    @Override
    public FlexSession getFlexSession() {
        return flexSession;
    }

    @Override
    public HttpSession getHttpSession() {
        return httpSession;
    }

    @Override
    public String getId()
    {
        String id;
        if(flexSession != null){
            id = flexSession.getId();
        }else if(httpSession != null){
            id = httpSession.getId();
        }else{
            id = "";
        }

        return id;
    }

    @Override
    public ConnectionIBMDB2Server getCNXIBMDB2()
    {
        ConnectionIBMDB2Server cnx;

        if(flexSession != null){
            if(flexSession.getAttribute("CNXIBMDB2") == null){
                cnx = null;
            }else{
                cnx = (ConnectionIBMDB2Server)flexSession.getAttribute("CNXIBMDB2");
            }
        }else if(httpSession != null){
            if(httpSession.getAttribute("CNXIBMDB2") == null){
                cnx = null;
            }else{
                cnx = (ConnectionIBMDB2Server)httpSession.getAttribute("CNXIBMDB2");
            }
        }else{
            cnx = memoSession.CNXIBMDB2;
        }

        return cnx;
    }

    @Override
    public void setCNXIBMDB2(ConnectionIBMDB2Server cnxIBMDB2) {
        if(flexSession != null){
            flexSession.setAttribute("CNXIBMDB2", cnxIBMDB2);
        }else if(httpSession != null){
            httpSession.setAttribute("CNXIBMDB2", cnxIBMDB2);
        }else{
            memoSession.CNXIBMDB2 = cnxIBMDB2;
        }
    }

    @Override
    public Boolean getACCCNX() {
        Boolean bolReturn;

        if(flexSession != null){
            if(flexSession.getAttribute("ACCCNX") == null){
                bolReturn = false;
            }else{
                bolReturn = (Boolean)flexSession.getAttribute("ACCCNX");
            }
        }else if(httpSession != null){
            if(httpSession.getAttribute("ACCCNX") == null){
                bolReturn = false;
            }else{
                bolReturn = (Boolean)httpSession.getAttribute("ACCCNX");
            }
        }else{
            bolReturn = memoSession.ACCCNX;
        }

        return bolReturn;
    }

    @Override
    public void setACCCNX(Boolean ACCCNX) {
        if(flexSession != null){
            flexSession.setAttribute("ACCCNX", ACCCNX);
        }else if(httpSession != null){
            httpSession.setAttribute("ACCCNX", ACCCNX);
        }else{
            memoSession.ACCCNX = ACCCNX;
        }
    }

    @Override
    public void setUserSummary(String summary) {
        if(flexSession != null){
            flexSession.setAttribute("user", summary);
        }else if(httpSession != null){
            httpSession.setAttribute("user", summary);
        }else{
            memoSession.user = summary;
        }
    }

    @Override
    public void setUserView(UserView user){
        if(flexSession != null){
            flexSession.setAttribute("USER_VIEW", user);
        }else if(httpSession != null){
            httpSession.setAttribute("USER_VIEW", user);
        }else{
            memoSession.USER_VIEW = user;
        }
    }

    @Override
    public UserView getUserView(){
        if(flexSession != null){
            return (UserView)flexSession.getAttribute("USER_VIEW");
        }else if(httpSession != null){
            return (UserView)httpSession.getAttribute("USER_VIEW");
        }else{
            return memoSession.USER_VIEW;
        }
    }
    
    @Override
    public void setMainLibrary(String mlib){
        if(flexSession != null){
            flexSession.setAttribute("MAIN_LIBRARY", mlib);
        }else if(httpSession != null){
            httpSession.setAttribute("MAIN_LIBRARY", mlib);
        }else{
            memoSession.MAIN_LIBRARY = mlib;
        }
    }
    
    @Override
    public String getMainLibrary(){
        if(flexSession != null){
            return (String)flexSession.getAttribute("MAIN_LIBRARY");
        }else if(httpSession != null){
            return (String)httpSession.getAttribute("MAIN_LIBRARY");
        }else{
            return memoSession.MAIN_LIBRARY;
        }
    }
}
