/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.utils.spring;

import com.ibm.as400.access.AS400Array;
import com.ibm.as400.access.AS400Text;
import com.ibm.as400.access.AS400ZonedDecimal;

import java.sql.SQLException;
import java.util.Map;

import net.miatech.beans.MemoSession;
import net.miatech.beans.spring.ServerSession;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.provider.ConnectionIBMDB2Server;

/**
 *
 * @author rmayta
 */
public class Application {
    private ServerSession serverSession;

    private SimpleEncrypt se = new SimpleEncrypt();
    
    public Application(Map<String,Object> propertySession){
        serverSession = new ServerSession(propertySession);
    }
    
    public ConnectionIBMDB2Server getConnection(String username, String password) throws SQLException, Exception{
        return getConnection(username, password, "");
    }
    
    public ConnectionIBMDB2Server getConnection(String username, String password, String cust) throws SQLException, Exception
    {
        if(cust.length() == 3) throw new Exception("Company code is not correct");
        ConnectionIBMDB2Server cnxIBMDB2;
        String cust_alf, strDefaultType, strDefaultCalfa;
        String strHost, strPort, mainLibrary, attachedLibraries;

        strDefaultType = String.valueOf(serverSession.getAttribute("DB_SERVER_DEFAULT_TYPE"));
        strDefaultCalfa = (cust.isEmpty()) ? String.valueOf(serverSession.getAttribute("DB_SERVER_DEFAULT_CALF")) : cust;
        
        if(password.length() == 120) password = se.decode(password);
        
        strHost = String.valueOf(serverSession.getAttribute("DB_SERVER_" + strDefaultCalfa + "_" + strDefaultType + "_HOST"));
        strPort = String.valueOf(serverSession.getAttribute("DB_SERVER_" + strDefaultCalfa + "_" + strDefaultType+ "_PORT"));
        mainLibrary = String.valueOf(serverSession.getAttribute("DB_SERVER_" + strDefaultCalfa + "_" + strDefaultType + "_LIBRARY"));
        attachedLibraries = String.valueOf(serverSession.getAttribute("DB_SERVER_" + strDefaultCalfa + "_" + strDefaultType + "_ATTACHED_LIBRARIES"));
        
        cnxIBMDB2 = new ConnectionIBMDB2Server(strHost, strPort, mainLibrary, attachedLibraries, username, password);
        
        serverSession.setMainLibrary(mainLibrary);
        
        return cnxIBMDB2;
    }
    
    public ConnectionIBMDB2Server getConnection(String strHost, String strPort, String mainLibrary, String attachedLibraries, String username, String password) throws SQLException, Exception
    {
        if(password.length() == 120) password = se.decode(password);
        return new ConnectionIBMDB2Server(strHost, strPort, mainLibrary, attachedLibraries, username, password);
    }

    public ServerSession getServerSession() {
        return serverSession;
    }

    public void setServerSession(ServerSession serverSession) {
        this.serverSession = serverSession;
    }

}
