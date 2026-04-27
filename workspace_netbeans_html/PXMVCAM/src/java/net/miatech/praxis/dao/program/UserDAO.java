/*
 * UserDAO.java
 *
 */
package net.miatech.praxis.dao.program;

import com.ibm.as400.access.AS400;
import com.ibm.as400.access.AS400DataType;
import com.ibm.as400.access.AS400Message;
import com.ibm.as400.access.AS400SecurityException;
import com.ibm.as400.access.AS400Structure;
import com.ibm.as400.access.ProgramCall;
import com.ibm.as400.access.ProgramParameter;
import java.beans.PropertyVetoException;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.GregorianCalendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import net.miatech.beans.PX041S01INF001Filter;
import net.miatech.beans.S0007INF053Filter;
import net.miatech.beans.S0008INF020Filter;
import net.miatech.beans.S0010INF020Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.beans.spring.ServerSession;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.dao.implement.IBaseDAO;
import net.miatech.dao.implement.IUserDAO;
import net.miatech.praxis.A2149;
//import net.miatech.praxis.INF001;
//import net.miatech.praxis.INF020;
import net.miatech.praxis.spring.INF001;
import net.miatech.praxis.spring.INF020;
import net.miatech.provider.ConnectionIBMDB2Server;
//import net.miatech.provider.Connection;
import net.miatech.utils.AS400Map;
import net.miatech.utils.spring.Application;
import net.miatech.utils.Functions;
import net.miatech.utils.implement.IApp;
import org.apache.log4j.Logger;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

/**
 *
 * @author rmayta
 */
public class UserDAO  {

    //private static final Logger logError = Logger.getLogger("errorLog");
    private IServerSession session;
    private static final Logger logError = Logger.getLogger("errorLog");
    //private ServerSession serverSession;
    
    //SE AGRESO ESTA LINEA DE CODIGO
    private static final String CSV_PATH = "\\\\px\\PRAXISAM\\PERMITS.txt";
    //
    
    private Application application;
    /**
     * Creates a new instance of UserDAO
     */
    public UserDAO() {
    }

    public UserDAO(IServerSession ss) {
        session = ss;
        application = new Application(session.getPropertySession());
        
    }
    
    public void setApp(Application application) {
        this.application = application;
    }
    

    public List<PX041S01INF001Filter> accessUser(PX041S01INF001Filter filter) throws SQLException, Exception {
        List<PX041S01INF001Filter> lstAccessUser = new ArrayList<PX041S01INF001Filter>(0);
        ResultSet rst = null;

        String SQLCLL01 = "{CALL PRAXIS.PX041S03INF001(?,?,?)}";
        //String SQLCLL01 = "{CALL LIBSAP14.SQP02783(?,?,?)}";
        CallableStatement cstm01 = null;
        StringWriter sw = new StringWriter();
        PrintWriter pw = new PrintWriter(sw);

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstm01 = cnx.prepareCall(SQLCLL01);
            cstm01.setString("VP_CCUST", "139"); //no se utiliza en el store
            cstm01.setString("VP_APLICA", "PX");
            cstm01.setString("VP_USR", filter.VP_USR);
            cstm01.execute();

            rst = cstm01.getResultSet();

            if (rst != null) {
                while (rst.next()) {
                    PX041S01INF001Filter accessProgram = new PX041S01INF001Filter();
                    accessProgram.USR = rst.getString("USR");
                    accessProgram.NPROG = rst.getString("NPROG");
                    accessProgram.PERMA = rst.getString("PERMA");
                    accessProgram.PERMC = rst.getString("PERMC");
                    accessProgram.PERME = rst.getString("PERME");
                    accessProgram.PERML = rst.getString("PERML");
                    accessProgram.PERMM = rst.getString("PERMM");
                    accessProgram.PERMX = rst.getString("PERMX");

                    lstAccessUser.add(accessProgram);
                }
            }
        } catch (Exception e) {
            e.printStackTrace(pw);
            sw.toString();
            //logError.error("accessProgram Message: " + e.getMessage() + ". StackTrace:" + sw.toString());
        } finally {
            if (rst != null) {
                try {
                    rst.close();
                } catch (SQLException e) {
                    logError.error("Message: " + e.getMessage(), e);
                }
            }
            if (cstm01 != null) {
                try {
                    cstm01.close();
                } catch (SQLException e) {
                    logError.error("Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
        }

        return lstAccessUser;
    }
    
    //Activar USUARIO (INF020 de "N" a "A")
    public void SQP02743(INF001 auth, INF020 usuario) throws SQLException, Exception {
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String user = auth.USR;
        String pass = auth.TOKEN;

        String SQLCLL01 = "{CALL PRAXIS.SQP02743(?,?,?)}"; //123
        ConnectionIBMDB2Server tmpCnx;
        tmpCnx = application.getConnection(user, pass);
        tmpCnx.open();

        try {
            cstmt01 = tmpCnx.getConnection().prepareCall(SQLCLL01);
            cstmt01.setString(1, "139");
            cstmt01.setString(2, usuario.USR);
            cstmt01.setString(3, usuario.STAT);
            
            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
        } catch (Exception e) {
            logError.error("SQP02743 Message: " + e.getMessage()); //ERROR
            throw e;
        } finally {
            if (rs01 != null) {
                rs01.close();
            }
            if (cstmt01 != null) {
                try {
                    cstmt01.close();
                } catch (SQLException e) {
                    logError.error("Message: " + e.getMessage(), e);
                }
            }
            tmpCnx.close();
        }
    }
    
    // HABILITAR USUARIO AS400 SIN FECHA
    public void SQP02491(String usuario) throws SQLException, Exception {
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        //String user = session.getProperty("USR_HABILITAR_USUARIO");
        //String pass = session.getProperty("PASS_HABILITAR_USUARIO");
        
        String SQLCLL01 = "{CALL PRAXIS.SQP02491(?)}";
        Connection tmpCnx;
        //tmpCnx = application.getConnection(user, pass);
        tmpCnx = session.getCNXIBMDB2().getIBMDB2Connection();
        //tmpCnx.open();

        try {
            cstmt01 = tmpCnx.prepareCall(SQLCLL01);
            cstmt01.setString(1, usuario);
            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
        } catch (Exception e) {
            logError.error("logAccessProgram Message: " + e.getMessage());
            throw e;
        } finally {
            if (rs01 != null) {
                rs01.close();
            }
            if (cstmt01 != null) {
                try {
                    cstmt01.close();
                } catch (SQLException e) {
                    logError.error("Message: " + e.getMessage(), e);
                }
            }
            tmpCnx.close();
        }
    }
    
    // HABILITAR USUARIO AS400 CON FECHA
    public void SQP03266(String usuario, String expiredDate) throws SQLException, Exception {
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        //String user = session.getProperty("USR_HABILITAR_USUARIO");
        //String pass = session.getProperty("PASS_HABILITAR_USUARIO");
        String strDay = expiredDate.substring(6, 8); // YYMMAA
        String strMonth = expiredDate.substring(4, 6);
        String strYear = expiredDate.substring(2, 4);
        expiredDate = strDay + strMonth + strYear; // AAMMYYYY
        String SQLCLL01 = "{CALL PRAXIS.SQP03266(?,?)}";
        Connection tmpCnx;
        tmpCnx = session.getCNXIBMDB2().getIBMDB2Connection();  //application.getConnection(user, pass);
        //tmpCnx.open();

        try {
            cstmt01 = tmpCnx.prepareCall(SQLCLL01);
            cstmt01.setString(1, usuario);
            cstmt01.setString(2, expiredDate);
            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
        } catch (Exception e) {
            logError.error("logAccessProgram Message: " + e.getMessage());
            throw e;
        } finally {
            if (rs01 != null) {
                rs01.close();
            }
            if (cstmt01 != null) {
                try {
                    cstmt01.close();
                } catch (SQLException e) {
                    logError.error("Message: " + e.getMessage(), e);
                }
            }
            tmpCnx.close();
        }
    }
    
    // CAMBIAR PASSWORD USUARIO AS400
    public void SQP03218(String usuario, String clave) throws SQLException, Exception {
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        //String user = session.getProperty("USR_HABILITAR_USUARIO");
        //String pass = session.getProperty("PASS_HABILITAR_USUARIO");

        String SQLCLL01 = "{CALL PRAXIS.SQP03218(?,?)}";
        Connection tmpCnx;
        tmpCnx = session.getCNXIBMDB2().getIBMDB2Connection();   //application.getConnection(user, pass);
        //tmpCnx.open();

        try {
            cstmt01 = tmpCnx.prepareCall(SQLCLL01);
            cstmt01.setString(1, usuario);
            cstmt01.setString(2, clave);
            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
        } catch (Exception e) {
            logError.error("logAccessProgram Message: " + e.getMessage());
            throw e;
        } finally {
            if (rs01 != null) {
                rs01.close();
            }
            if (cstmt01 != null) {
                try {
                    cstmt01.close();
                } catch (SQLException e) {
                    logError.error("Message: " + e.getMessage(), e);
                }
            }
            tmpCnx.close();
        }
    }
    
    // CREAR USUARIO AS400
    public void SQP03219(String usuario, String clave, String desc) throws SQLException, Exception {
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        //String user = session.getProperty("USR_HABILITAR_USUARIO");
        //String pass = session.getProperty("PASS_HABILITAR_USUARIO");

        String SQLCLL01 = "{CALL PRAXIS.SQP03219(?,?,?)}";
        Connection tmpCnx;
        tmpCnx = session.getCNXIBMDB2().getIBMDB2Connection();  // application.getConnection(user, pass);
        //tmpCnx.open();

        try {
            //cstmt01 = tmpCnx.getConnection().prepareCall(SQLCLL01);
            cstmt01 = tmpCnx.prepareCall(SQLCLL01);
            cstmt01.setString(1, usuario);
            cstmt01.setString(2, clave);
            cstmt01.setString(3, desc);
            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
        } catch (Exception e) {
            logError.error("logAccessProgram Message: " + e.getMessage());
            throw e;
        } finally {
            if (rs01 != null) {
                rs01.close();
            }
            if (cstmt01 != null) {
                try {
                    cstmt01.close();
                } catch (SQLException e) {
                    logError.error("Message: " + e.getMessage(), e);
                }
            }
            tmpCnx.close();
        }
    }
    
    // VALIDAR EXISTE USUARIO AS400
    public boolean SQP03268(String usuario) throws SQLException, Exception {
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        
        boolean boValida = false;
        
        //String user = session.getProperty("USR_HABILITAR_USUARIO");
        //String pass = session.getProperty("PASS_HABILITAR_USUARIO");

        String SQLCLL01 = "{CALL PRAXIS.SQP03268(?)}";
        //ConnectionIBMDB2Server tmpCnx;
        Connection tmpCnx;
        tmpCnx = session.getCNXIBMDB2().getIBMDB2Connection(); //application.getConnection(user, pass);
        //tmpCnx.open();

        try {
            //cstmt01 = tmpCnx.getConnection().prepareCall(SQLCLL01);
            cstmt01 = tmpCnx.prepareCall(SQLCLL01);
            cstmt01.setString(1, usuario);
            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                boValida = true;
            }
            return boValida;
        } catch (Exception e) {
            logError.error("SQP03268 Message: " + e.getMessage());
            throw e;
        } finally {
            if (rs01 != null) {
                rs01.close();
            }
            if (cstmt01 != null) {
                try {
                    cstmt01.close();
                } catch (SQLException e) {
                    logError.error("SQP03268 Message: " + e.getMessage(), e);
                }
            }
            tmpCnx.close();
        }
    }
}
