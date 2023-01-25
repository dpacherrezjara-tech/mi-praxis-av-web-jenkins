package net.miatech.provider;

import com.ibm.as400.access.AS400;
import com.microsoft.sqlserver.jdbc.SQLServerDataSource;
import java.io.FileWriter;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;
import net.miatech.beans.ServerSession;
import net.miatech.beans.implement.IServerSession;
import net.miatech.utils.GeneralLog;

public class ConnectionIBMDB2Server {
    
    private GeneralLog generalLog = GeneralLog.getInstance();
    private final SQLServerDataSource dataSource = new SQLServerDataSource();

    private String dbHost = "";
    private String dbPort = "";
    private String dbDefaultLibrary = "";
    private String dbAttachedLibraries = ""; //Attached Libraries
    private String userName = "";
    private String password = "";
    private String url = "";
    public String strMessageError = "";
        
    private PrintWriter err = null;
    
    private Connection conexion = null;
    private Connection conexion41 = null;
    private AS400 system = null;

    public ConnectionIBMDB2Server(String pHost, String pPort, String pDefaultLibrary, String pAttachedLibraries, String pUserName, String pPassword){
        dbHost              = pHost;
        dbPort              = pPort;
        dbDefaultLibrary    = pDefaultLibrary;
        dbAttachedLibraries = pAttachedLibraries; //Attached Libraries
        userName            = pUserName;
        password            = pPassword;
    }

    public void open(){
        open(true);
    }
    
    public void openNative(){
        openNative(true);
    }
    
    public void open(boolean bolAutoCommit){
        
        String separatorHostPort;
        
        if(dbPort.equals("")){
            separatorHostPort = "";
        }else{
            separatorHostPort = ":";
        }
        
        url = "jdbc:as400://"+dbHost+separatorHostPort+dbPort+"/"+dbDefaultLibrary+";libraries="+dbAttachedLibraries;
        //url = "jdbc:as400://"+dbHost+separatorHostPort+dbPort+";naming=system;libraries="+dbDefaultLibrary+","+dbAttachedLibraries;
    	
    	try{
            err = new PrintWriter(new FileWriter("As400Server_error.log", true));
	}catch(Exception e){
            generalLog.add(e.getMessage());
	}
    	
        try{
            Class.forName("com.ibm.as400.access.AS400JDBCDriver");
            DriverManager.setLoginTimeout(60*10);
            conexion = DriverManager.getConnection(url, userName, password);
            
            //Context ctx = (Context) new InitialContext(); //.lookup("java:comp/env");
            //conexion = ((DataSource) ctx.lookup("jdbc/praxisDB")).getConnection();
            
            if(conexion != null){
                conexion.setAutoCommit(bolAutoCommit);
                generalLog.add("Connectión for Data Base IBM Power System AS400 DB2 " + dbDefaultLibrary + " Libraries " + dbAttachedLibraries + ", Ok.");
            }
        }catch(SQLException e){
            //generalLog.add(e.getMessage());
            e.printStackTrace(err);
            strMessageError = "CONNECTION SQLException Message: " + e.getMessage() + ". StackTrace:" + err.toString();
            generalLog.add(strMessageError);
            err.flush();
        }catch(Exception e){
            generalLog.add(e.getMessage());
            e.printStackTrace(err);
            strMessageError = "CONNECTION Exception Message: " + e.getMessage() + ". StackTrace:" + err.toString();
            generalLog.add(strMessageError);
            err.flush();
         }
    }
    
    public void openNative(boolean bolAutoCommit){
        
        String separatorHostPort;
        
        if(dbPort.equals("")){
            separatorHostPort = "";
        }else{
            separatorHostPort = ":";
        }
        
        url = "jdbc:as400://"+dbHost+separatorHostPort+dbPort+"/"+dbDefaultLibrary+";libraries="+dbAttachedLibraries;
        //url = "jdbc:as400://"+dbHost+separatorHostPort+dbPort+";naming=system;libraries="+dbDefaultLibrary+","+dbAttachedLibraries;
    	
    	try{
            err = new PrintWriter(new FileWriter("As400Server_error.log", true));
	}catch(Exception e){
            generalLog.add(e.getMessage());
	}
    	
        try{
            Class.forName("com.ibm.as400.access.AS400JDBCDriver");
            DriverManager.setLoginTimeout(60*10);
            conexion = DriverManager.getConnection(url, userName, password);
            
            if(conexion != null){
                conexion.setAutoCommit(bolAutoCommit);
                generalLog.add("Connectión for Data Base IBM Power System AS400 DB2 " + dbDefaultLibrary + " Libraries " + dbAttachedLibraries + ", Ok.");
            }
        }catch(SQLException e){
            //generalLog.add(e.getMessage());
            e.printStackTrace(err);
            strMessageError = "CONNECTION SQLException Message: " + e.getMessage() + ". StackTrace:" + err.toString();
            generalLog.add(strMessageError);
            err.flush();
        }catch(Exception e){
            generalLog.add(e.getMessage());
            e.printStackTrace(err);
            strMessageError = "CONNECTION Exception Message: " + e.getMessage() + ". StackTrace:" + err.toString();
            generalLog.add(strMessageError);
            err.flush();
         }
    }

    public void close(){
        if(conexion != null){
            try{
                if(!conexion.isClosed())
                {    
                    conexion.close();
                    generalLog.add("Close Connectión for Data Base IBM Power System AS400 DB2 " + dbDefaultLibrary + " Libraries " + dbAttachedLibraries + ", Ok.");
                }
            }catch(SQLException e){
                //generalLog.add(e.getMessage());
                e.printStackTrace(err);
                strMessageError = "CLOSE CONNECTION Exception Message: " + e.getMessage() + ". StackTrace:" + err.toString();
                generalLog.add(strMessageError);
                err.flush();
                
            }
        }

        conexion = null;
    }

    public Connection getConnection(){
        return conexion;
    }
    
    public void openSystem(){
        system = new AS400(dbHost, userName, password);
        if(system != null){
            generalLog.add("Connectión for IBM Power System AS400 OS, Ok.");
        }else{
            generalLog.add("Connectión for IBM Power System AS400 OS, Failed.");
        }
    }

    public void closeSystem(){
        if(system != null){
            system.disconnectAllServices();
            generalLog.add("Close Connectión for IBM Power6 System AS400 OS, Ok.");
        }
        system = null;
    }

    public AS400 getSystem(){
        return system;
    }
    
        public void closeIBMDB2Connection(Connection cnx){
        if(cnx != null){
            try{
                if(!cnx.isClosed())
                {    
                    cnx.close();
                    generalLog.add("Close Connection for Data Base IBM Power System AS400 DB2 " + dbDefaultLibrary + " Libraries " + dbAttachedLibraries + ", Ok.");
                }
            }catch(SQLException e){
                //generalLog.add(e.getMessage());
                e.printStackTrace(err);
                strMessageError = "CLOSE CONNECTION Exception Message: " + e.getMessage() + ". StackTrace:" + err.toString();
                generalLog.add(strMessageError);
                err.flush();
                
            }
        }

        cnx = null;
    }    
    
    public Connection getSQLConnection2(net.miatech.beans.spring.implement.IServerSession serverSession){
       //Connection cnx;    
        String separatorHostPort;
        
        if(dbPort.equals("")){
            separatorHostPort = "";
        }else{
            separatorHostPort = ":";
        }
        
        url = "jdbc:odbc:SQL50";
        
        try{
            Class.forName("sun.jdbc.odbc.JdbcOdbcDriver");
            DriverManager.setLoginTimeout(60*10); // 10min
            return DriverManager.getConnection(url, (String)serverSession.getPropertySession().get("DB_SERVER_SQL_USER"), (String)serverSession.getPropertySession().get("DB_SERVER_SQL_PASS"));  
            /*Context ctx = (Context) new InitialContext(); //.lookup("java:comp/env");
            return ((DataSource) ctx.lookup("jdbc/praxisDB")).getConnection();*/
        }
        catch(Exception ex)
        {
            System.out.println("ex.getMessage(): " + ex.getMessage());
           return null;
        }
        //return cnx ;
    }
        
    public Connection getSQLConnection(IServerSession serverSession){
       //Connection cnx;    
        serverSession = new ServerSession();
        String separatorHostPort;
        
        if(dbPort.equals("")){
            separatorHostPort = "";
        }else{
            separatorHostPort = ":";
        }
        
        url = "jdbc:odbc:SQL50";
        
        try{
            Class.forName("sun.jdbc.odbc.JdbcOdbcDriver");
            DriverManager.setLoginTimeout(60*10); // 10min
            return DriverManager.getConnection(url, serverSession.getProperty("DB_SERVER_SQL_USER") , serverSession.getProperty("DB_SERVER_SQL_PASS"));  
            /*Context ctx = (Context) new InitialContext(); //.lookup("java:comp/env");
            return ((DataSource) ctx.lookup("jdbc/praxisDB")).getConnection();*/
        }
        catch(Exception ex)
        {
           return null;
        }
        //return cnx ;
    }
    
    public SQLServerDataSource getDataSource() {
        return dataSource;
    }
    
    public Connection getSQLConnection41(net.miatech.beans.spring.implement.IServerSession serverSession) {

        try {
            getDataSource().setServerName((String)serverSession.getPropertySession().get("DB_SQLSERVER_" + serverSession.getAttribute("DB_SERVER_DEFAULT_CALF").toString() + "_" + serverSession.getAttribute("DB_SERVER_DEFAULT_TYPE").toString() + "_HOST"));
            getDataSource().setPortNumber(Integer.parseInt((String)serverSession.getPropertySession().get("DB_SQLSERVER_" + serverSession.getAttribute("DB_SERVER_DEFAULT_CALF").toString() + "_" + serverSession.getAttribute("DB_SERVER_DEFAULT_TYPE").toString() + "_PORT")));
            getDataSource().setInstanceName((String)serverSession.getPropertySession().get("DB_SQLSERVER_" + serverSession.getAttribute("DB_SERVER_DEFAULT_CALF").toString() + "_" + serverSession.getAttribute("DB_SERVER_DEFAULT_TYPE").toString() + "_INSTANCE"));
            getDataSource().setDatabaseName((String)serverSession.getPropertySession().get("DB_SQLSERVER_" + serverSession.getAttribute("DB_SERVER_DEFAULT_CALF").toString() + "_" + serverSession.getAttribute("DB_SERVER_DEFAULT_TYPE").toString() + "_DATABASE"));
            getDataSource().setUser((String)serverSession.getPropertySession().get("DB_SQLSERVER_" + serverSession.getAttribute("DB_SERVER_DEFAULT_CALF").toString() + "_" + serverSession.getAttribute("DB_SERVER_DEFAULT_TYPE").toString() + "_USER"));
            getDataSource().setPassword((String)serverSession.getPropertySession().get("DB_SQLSERVER_" + serverSession.getAttribute("DB_SERVER_DEFAULT_CALF").toString() + "_" + serverSession.getAttribute("DB_SERVER_DEFAULT_TYPE").toString() + "_PASSWORD"));

            conexion41 = getDataSource().getConnection();
        } catch (Exception ex) {
            Logger.getLogger(ConnectionIBMDB2Server.class.getName()).
                    log(Level.SEVERE, null, ex);
        }
        return conexion41;
    }

    /**
     * @return the connection
     */
    public Connection getSQLConnection41() {
        return conexion41;
    }
    
    
    public void closeSQLConnection(Connection cnx){
        if(cnx != null){
            try{
                if(!cnx.isClosed())
                {    
                    cnx.close();
                    generalLog.add("Close Connection for Data Base IBM Power System AS400 DB2 " + dbDefaultLibrary + " Libraries " + dbAttachedLibraries + ", Ok.");
                }
            }catch(SQLException e){
                //generalLog.add(e.getMessage());
                e.printStackTrace(err);
                strMessageError = "CLOSE CONNECTION Exception Message: " + e.getMessage() + ". StackTrace:" + err.toString();
                generalLog.add(strMessageError);
                err.flush();
                
            }
        }

        cnx = null;
    }
    
    public void closeSQLConnection41(Connection cnx){
        if(cnx != null){
            try{
                if(!cnx.isClosed())
                {    
                    cnx.close();
                    generalLog.add("Close Connection for Data Base SQL Server " + dbDefaultLibrary + " Libraries " + dbAttachedLibraries + ", Ok.");
                }
            }catch(SQLException e){
                //generalLog.add(e.getMessage());
                e.printStackTrace(err);
                strMessageError = "CLOSE CONNECTION SQL Server Exception Message: " + e.getMessage() + ". StackTrace:" + err.toString();
                generalLog.add(strMessageError);
                err.flush();
                
            }
        }

        cnx = null;
    } 
    
    public Connection getIBMDB2Connection(){
       //Connection cnx;    
        String separatorHostPort;
        
        if(dbPort.equals("")){
            separatorHostPort = "";
        }else{
            separatorHostPort = ":";
        }
        
        url = "jdbc:as400://"+dbHost+separatorHostPort+dbPort+"/"+dbDefaultLibrary+";libraries="+dbAttachedLibraries;
        
        try{
            Class.forName("com.ibm.as400.access.AS400JDBCDriver");
            DriverManager.setLoginTimeout(60*10); // 10min
            return DriverManager.getConnection(url, userName, password);  
            /*Context ctx = (Context) new InitialContext(); //.lookup("java:comp/env");
            return ((DataSource) ctx.lookup("jdbc/praxisDB")).getConnection();*/
        }
        catch(Exception ex)
        {
           return null;
        }
        //return cnx ;
    }
    
    public Connection getIBMDB2ConnectionNative(){          
        String separatorHostPort;
        
       if(dbPort.equals("")){
            separatorHostPort = "";
        }else{
            separatorHostPort = ":";
        }
        
        url = "jdbc:as400://"+dbHost+separatorHostPort+dbPort+"/"+dbDefaultLibrary+";libraries="+dbAttachedLibraries;
        
        
        try{
            
            
            Class.forName("com.ibm.as400.access.AS400JDBCDriver");
            DriverManager.setLoginTimeout(60*10);
            return DriverManager.getConnection(url, userName, password);        
        }
        catch(Exception ex)
        {
           return null;
        }
    }
    
    public void closeIBMDB2ConnectionNative(Connection cnx){
        if(cnx != null){
            try{
                if(!cnx.isClosed())
                {    
                    cnx.close();
                    generalLog.add("Close Connection for Data Base IBM Power System AS400 DB2 " + dbDefaultLibrary + " Libraries " + dbAttachedLibraries + ", Ok.");
                }
            }catch(SQLException e){
                e.printStackTrace(err);
                strMessageError = "CLOSE CONNECTION Exception Message: " + e.getMessage() + ". StackTrace:" + err.toString();
                generalLog.add(strMessageError);
                err.flush();
                
            }
        }

        cnx = null;
    }
}

