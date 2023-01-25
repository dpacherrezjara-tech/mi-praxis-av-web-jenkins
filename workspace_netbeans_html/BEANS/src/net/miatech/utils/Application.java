/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.utils;

import com.ibm.as400.access.AS400Array;
import com.ibm.as400.access.AS400Text;
import com.ibm.as400.access.AS400ZonedDecimal;
import java.sql.SQLException;
import javax.servlet.http.HttpSession;
import net.miatech.beans.MemoSession;
import net.miatech.beans.ServerSession;
import net.miatech.beans.implement.IServerSession;
import net.miatech.provider.ConnectionIBMDB2Server;

/**
 *
 * @author rmayta
 */
public class Application {
    private IServerSession serverSession;
    private SimpleEncrypt se = new SimpleEncrypt();
    
    //<editor-fold defaultstate="collapsed" desc="{...} AS400 Data Types">
    public static AS400Text char01Conv = new AS400Text(1);
    public static AS400Text char02Conv = new AS400Text(2);
    public static AS400Text char03Conv = new AS400Text(3);
    public static AS400Text char04Conv = new AS400Text(4);
    public static AS400Text char06Conv = new AS400Text(6);
    public static AS400Text char08Conv = new AS400Text(8);
    public static AS400Text char24Conv = new AS400Text(24);
    public static AS400Text char146Conv = new AS400Text(146);
    public static AS400Text char2920Conv = new AS400Text(2920);
    public static AS400Text char3067Conv = new AS400Text(3067);
    public static AS400ZonedDecimal nume02P00Conv = new AS400ZonedDecimal(2, 0);
    public static AS400ZonedDecimal nume13P00Conv = new AS400ZonedDecimal(13, 0);
    public static AS400ZonedDecimal nume13P02Conv = new AS400ZonedDecimal(15, 2);
    //</editor-fold>
    
    public Application(){
        serverSession = new ServerSession();
    }
    
    public Application(HttpSession httpSession){
        serverSession = new ServerSession(httpSession);
    }
    
    public Application(MemoSession memoSession){
        serverSession = new ServerSession(memoSession);
    }

    public ConnectionIBMDB2Server getConnection(String username, String password) throws SQLException, Exception{
        return getConnection(username, password, "");
    }
    
    public ConnectionIBMDB2Server getConnection(String username, String password, String cust) throws SQLException, Exception
    {
        if(cust.length() == 3) throw new Exception("Company code is not correct");
        ConnectionIBMDB2Server cnxIBMDB2 = null;
        String cust_alf, strDefaultType, strDefaultCalfa;
        String strHost, strPort, mainLibrary, attachedLibraries;

        strDefaultType = serverSession.getProperty("DB_SERVER_DEFAULT_TYPE") ;
        strDefaultCalfa = (cust.isEmpty()) ? serverSession.getProperty("DB_SERVER_DEFAULT_CALF") : cust;
        
        if(password.length() == 120) password = se.decode(password);
        
        strHost = serverSession.getProperty("DB_SERVER_" + strDefaultCalfa + "_" + strDefaultType + "_HOST");
        strPort = serverSession.getProperty("DB_SERVER_" + strDefaultCalfa + "_" + strDefaultType+ "_PORT");
        mainLibrary = serverSession.getProperty("DB_SERVER_" + strDefaultCalfa + "_" + strDefaultType + "_LIBRARY");
        attachedLibraries = serverSession.getProperty("DB_SERVER_" + strDefaultCalfa + "_" + strDefaultType + "_ATTACHED_LIBRARIES");
        
        cnxIBMDB2 = new ConnectionIBMDB2Server(strHost, strPort, mainLibrary, attachedLibraries, username, password);
        
        serverSession.setMainLibrary(mainLibrary);
        
        return cnxIBMDB2;
    }
    
    public ConnectionIBMDB2Server getConnection(String strHost, String strPort, String mainLibrary, String attachedLibraries, String username, String password) throws SQLException, Exception
    {
        if(password.length() == 120) password = se.decode(password);
        return new ConnectionIBMDB2Server(strHost, strPort, mainLibrary, attachedLibraries, username, password);
    }
}
