/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.utils.implement;

import com.ibm.as400.access.AS400;
import java.sql.SQLException;
import java.util.Map;
import net.miatech.beans.JavaToFlexResponse;
import net.miatech.beans.implement.IServerSession;
import net.miatech.praxis.INF001;
import net.miatech.praxis.INF020;
import net.miatech.provider.ConnectionIBMDB2Server;

/**
 *
 * @author rmayta
 */
public interface IApp {
    public ConnectionIBMDB2Server getConnection(String username, String password) throws SQLException, Exception;
    public ConnectionIBMDB2Server getConnection(String username, String password, String cust) throws SQLException, Exception;
    public ConnectionIBMDB2Server getConnection(String strHost, String strPort, String mainLibrary, String attachedLibraries, String username, String password) throws SQLException, Exception;
    
    public String execPost(String url, Map<?, ?> mapParram);
    public String execPost(String url, Map<?, ?> mapParram, Map<String, String> mapOptions);
    public String ePost(String TargetURL);
    public void assignAuthentication(INF001 user) throws SQLException, Exception;
    public void defaultValidation(JavaToFlexResponse resp, INF020 airline) throws SQLException, Exception;
    public void log4jConfig(IServerSession ss);
    public String changePassword(String username, String password, String passwordNew);
    public boolean callCL3050(AS400 system, String library, String cia) throws Exception;
}
