/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.dao; 
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.implement.IServerSession;
import net.miatech.dao.implement.IBaseDAO;
import net.miatech.dao.implement.IUtilDAO;
import net.miatech.libcust.A005;
import net.miatech.libmiatec.A006;
import net.miatech.libmiatec.A1007;
import net.miatech.utils.Application;
import org.apache.log4j.Logger;

/**
 *
 * @author rmayta
 */
public class UtilDAO implements IBaseDAO, IUtilDAO {
    private IServerSession session;
    private Application app;
    private static final Logger logError = Logger.getLogger("errorLog");
    /**
     *
     */
    public UtilDAO(){
    }
    
    /**
     *
     * @param ss
     */
    public UtilDAO(IServerSession ss){
        session = ss;
    }

    /**
     *
     * @param ss
     */
    @Override
    public void setSession(IServerSession ss){
        session = ss;
    }
    
    @Override
    public void setApp(Application application) {
        app = application;
    }
    
    @Override
    public List<A005> obtainAirlines() throws SQLException {
        return obtainAirlines(new A005());
    }
    
    @Override
    public List<A005> obtainAirlines(A005 filter) throws SQLException {
        Statement stmt = null;
        ResultSet rst = null;
        String strSQL;
        List<A005> listaData = new ArrayList<A005>(0);
        A005 file;

        String strLib = session.getUserView().getCustomerInfoComplete().fileA005.A005KEY1 + "D";
        
        strSQL = "SELECT "
                + "RTRIM(A005KEY) AS A005KEY, RTRIM(A005KEY1) AS A005KEY1, RTRIM(A005KEY2) AS A005KEY2, RTRIM(A005CHS) AS A005CHS, RTRIM(A005KEY3) AS A005KEY3, A005COMISP, RTRIM(A005INDCOM) AS A005INDCOM, RTRIM(A005ZONA) AS A005ZONA, RTRIM(A005ACHS) AS A005ACHS, RTRIM(A005ACPL) AS A005ACPL, RTRIM(A005CIAS) AS A005CIAS"
                + " FROM " + strLib + ".A005";
        
        Connection cnx = null;
        
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection(); 
            stmt = cnx.createStatement();
            rst = stmt.executeQuery(strSQL);
            while (rst.next()) {
                file = new A005();
                file.A005KEY = rst.getString("A005KEY");
                file.A005KEY1 = rst.getString("A005KEY1");
                file.A005KEY2 = rst.getString("A005KEY2");
                file.A005CHS = rst.getString("A005CHS");
                file.A005KEY3 = rst.getString("A005KEY3");
                file.A005COMISP = rst.getDouble("A005COMISP");
                file.A005INDCOM = rst.getString("A005INDCOM");
                file.A005ZONA = rst.getString("A005ZONA");
                file.A005ACHS = rst.getString("A005ACHS");
                file.A005ACPL = rst.getString("A005ACPL");
                file.A005CIAS = rst.getString("A005CIAS");
                listaData.add(file);
            }
        } finally {
            if(rst != null) try { rst.close(); } catch(SQLException e) { logError.error("Message: " + e.getMessage() ,e); }
            if(stmt != null) stmt.close();
        }
        return listaData;
    }
    
    @Override
    public List<A006> obtainCountries() throws SQLException {
        return obtainCountries(new A006());
    }
    
    @Override
    public List<A006> obtainCountries(A006 filter) throws SQLException {
        Statement stmt = null;
        ResultSet rst = null;
        String strSQL;
        List<A006> listaData = new ArrayList<A006>(0);
        A006 file;
        
        if(session.getUserView().getUserInfo().USR.equals("MPHG1") ||
                session.getUserView().getUserInfo().USR.equals("MPHG2") ||
                session.getUserView().getUserInfo().USR.equals("MPHG3") ||
                session.getUserView().getUserInfo().USR.equals("MPHG4")){
            strSQL = "SELECT RTRIM(A051KEY2) AS A006KEY, (SELECT RTRIM(A006KEY1) FROM PRAXIS.A006 WHERE RTRIM(A006KEY) = A051KEY2) AS A006KEY1 FROM AMD.A051 WHERE A051KEY1 = '81' AND A051DESCR1='" + session.getUserView().getUserInfo().USR + "'";
        }else{
            strSQL = "SELECT "
                    + "RTRIM(A006KEY) AS A006KEY, RTRIM(A006KEY1) AS A006KEY1"
                    + " FROM PRAXIS.A006"
                    + " WHERE LENGTH(RTRIM(A006KEY)) = 2";
        }
        
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection(); 
            stmt = cnx.createStatement();
            rst = stmt.executeQuery(strSQL);
            while (rst.next()) {
                file = new A006();
                file.A006PAIS = rst.getString("A006KEY");
                file.A006NOMBRE = rst.getString("A006KEY1");
                listaData.add(file);
            }
        } finally {
            if(rst != null) try { rst.close(); } catch(SQLException e) { logError.error("Message: " + e.getMessage() ,e); }
            if(stmt != null) stmt.close();
        }
        return listaData;
    }
    
    @Override
    public List<A1007> obtainCities() throws SQLException {
        return obtainCities(new A1007());
    }
    
    @Override
    public List<A1007> obtainCities(A1007 filter) throws SQLException {
        Statement stmt = null;
        ResultSet rst = null;
        String strSQL;
        List<A1007> listaData = new ArrayList<A1007>(0);
        A1007 file;
        
        strSQL = "SELECT "
                + "A1007CTATO, A1007NOMBR, A1007CATEG, RTRIM(A1007CIUD) AS A1007CIUD, RTRIM(A1007NOMCD) AS A1007NOMCD, A1007STATE, RTRIM(A1007PAIS) AS A1007PAIS, A1007TIMZ, A1007STAT,"
                + "A1007REGIS, A1007FREGI, A1007HREGI, A1007REVIS, A1007FREVI, A1007HREVI,"
                + "A1007LONG, A1007LATI"
                + " FROM PRAXIS.A1007";
        
        if(!filter.A1007PAIS.isEmpty()){
            strSQL += " WHERE A1007PAIS = '" + filter.A1007PAIS + "'";
        }
        
        strSQL += " ORDER BY A1007CTATO";
        
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection(); 
            stmt = cnx.createStatement();
            rst = stmt.executeQuery(strSQL);
            while (rst.next()) {
                file = new A1007();
                file.A1007CTATO = rst.getString("A1007CTATO");
                file.A1007NOMBR = rst.getString("A1007NOMBR");
                file.A1007CATEG = rst.getString("A1007CATEG");
                file.A1007CIUD = rst.getString("A1007CIUD");
                file.A1007NOMCD = rst.getString("A1007NOMCD");
                file.A1007STATE = rst.getString("A1007STATE");
                file.A1007PAIS = rst.getString("A1007PAIS");
                file.A1007TIMZ = rst.getString("A1007TIMZ");
                file.A1007STAT = rst.getString("A1007STAT");
                file.A1007REGIS = rst.getString("A1007REGIS");
                file.A1007FREGI = rst.getString("A1007FREGI");
                file.A1007HREGI = rst.getString("A1007HREGI");
                file.A1007REVIS = rst.getString("A1007REVIS");
                file.A1007FREVI = rst.getString("A1007FREVI");
                file.A1007HREVI = rst.getString("A1007HREVI");
                file.A1007LONG = rst.getDouble("A1007LONG");
                file.A1007LATI = rst.getDouble("A1007LATI");
                listaData.add(file);
            }
        } finally {
            if(rst != null) try { rst.close(); } catch(SQLException e) { logError.error("Message: " + e.getMessage() ,e); }
            if(stmt != null) stmt.close();
        }
        return listaData;
    }
}
