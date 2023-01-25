package net.miatech.praxis.dao.sales;

// <editor-fold defaultstate="collapsed" desc="import">
import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Vector;
import net.miatech.beans.A1736Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.libmiatec.A006;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

// </editor-fold>

/**
 *
 * @author gsanchez
 */
public class AccountingMasterClientDAO {
    
    // <editor-fold defaultstate="collapsed" desc="Variables locales">
    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private String strSQL;
    private static final Logger logError = Logger.getLogger("errorLog");
    // </editor-fold>

    public AccountingMasterClientDAO() {
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }
    
    public List<A1736Filter> loadPX128S01A1736(A1736Filter filter) {
        List<A1736Filter> lstRtn = new ArrayList<>(0);
        A1736Filter objRtn;
        int PAGINIT = 1, totPAGS = 0, totRowsPag = filter.page.PAGROW, totRows = -1;

        try {
            strSQL = "{CALL " + session.getMainLibrary() + ".PX128S01A1736(?,?,?,?,?,?,?,?,?,?,?,?,?)}";
            
            if (filter.page.PAGNUM > 0) {
               PAGINIT = (filter.page.PAGNUM - 1) * totRowsPag + 1;
            }
          
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();  cs = cnx.prepareCall(strSQL);
            
            cs.registerOutParameter(10, Types.INTEGER);
            cs.registerOutParameter(11, Types.INTEGER);
            cs.registerOutParameter(12, Types.INTEGER);
            cs.registerOutParameter(13, Types.INTEGER);

            cs.setString(1, "139");//filter.IN_A1717CCUST
            cs.setString(2, filter.IN_A1736FUENTE);
            cs.setString(3, filter.IN_A1736PAIS);
            cs.setString(4, filter.IN_A1736TIPO);
            cs.setString(5, filter.IN_A1736MONEDA);
            
            cs.setString(6, filter.IN_A1736SUBFU);
            cs.setString(7, filter.IN_A1736FP);
            cs.setString(8, filter.A1736CLIEN);
            cs.setString(9, filter.A1736IATA);
            
            cs.setInt(10, PAGINIT);
            cs.setInt(11, totRowsPag);     
            cs.setInt(12, totRows);     
            cs.setInt(13, -1);
            
            cs.execute();
            
            //filter.page.PAGNUM = cs.getInt(3);
            filter.page.PAGROW = cs.getInt(11);
            filter.page.TOTPAG = cs.getInt(12);
            filter.page.TOTROW = cs.getInt(13);
            
            if (filter.page.TOTROW > 0 && filter.page.TOTROW == cs.getInt(12)) {
               totRows = filter.page.TOTROW;
               totPAGS = filter.page.TOTPAG;
            } else {
               try {
                   totRows = cs.getInt(13);
                   int total =  (int)(totRows / totRowsPag);                                                                    
                   int resto =  (totRows % totRowsPag);                    

                   if(resto>0)
                       totPAGS = total + 1;
                   else
                       totPAGS = total;

               } catch (Exception e) {
                   totPAGS = totRows / totRowsPag;
               }
            }
            
            filter.page.TOTPAG = totPAGS;
            
            rst = cs.getResultSet();
            int pos = 0;
            while (rst.next()) {
                pos++;
                objRtn = new A1736Filter();
                objRtn.RN = rst.getLong("RN");
                objRtn.A1736FUENT = rst.getString("A1736FUENT").trim();
                objRtn.A1736NOMBR = rst.getString("A1736NOMBR").trim();
                objRtn.A1736TIDOC = rst.getString("A1736TIDOC").trim();
                objRtn.A1736DIREC = rst.getString("A1736DIREC").trim();
                objRtn.A1736UNID = rst.getString("A1736UNID").trim();
                objRtn.A1736SCTA = rst.getString("A1736SCTA").trim();
                objRtn.A1736REGVI = rst.getString("A1736REGVI").trim();
                objRtn.A1736PAIS = rst.getString("A1736PAIS").trim();
                objRtn.A1736FORPG = rst.getString("A1736FORPG").trim();
                objRtn.A1736CLIEN = rst.getString("A1736CLIEN").trim();
                objRtn.A1736IATA = rst.getString("A1736IATA").trim();
                objRtn.A1736CECO = rst.getString("A1736CECO").trim();
                objRtn.A1736EQUI = rst.getString("A1736EQUI").trim();
                objRtn.A1736FREVI = Functions.getMonthConvertDate(rst.getString("A1736FREVI"));
                objRtn.A1736TIPO = rst.getString("A1736TIPO").trim();
                objRtn.A1736TAXI = rst.getString("A1736TAXI").trim();
                objRtn.A1736UBI = rst.getString("A1736UBI").trim();
                objRtn.A1736ICIA = rst.getString("A1736ICIA").trim();
                objRtn.A1736HREVI = Functions.ConvertedTime(rst.getString("A1736HREVI"));
                objRtn.A1736CURR = rst.getString("A1736CURR").trim();
                objRtn.A1736CIA = rst.getString("A1736CIA").trim();
                objRtn.A1736CTAC = rst.getString("A1736CTAC").trim();
                objRtn.A1736REGIS = rst.getString("A1736REGIS").trim();
                objRtn.A1736UO = rst.getString("A1736UO").trim();
                objRtn.A1736FREGI = Functions.getMonthConvertDate(rst.getString("A1736FREGI"));
                objRtn.A1736HREGI = Functions.ConvertedTime(rst.getString("A1736HREGI"));
                objRtn.A1736FINI = Functions.getMonthConvertDate(rst.getString("A1736FINI"));
                objRtn.A1736FFIN = Functions.getMonthConvertDate(rst.getString("A1736FFIN"));
                
                objRtn.A1736FP = rst.getString("A1736FP").trim();
                objRtn.A1736SUBFU = rst.getString("A1736SUBFU").trim();
                
                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;
                        
                lstRtn.add(objRtn);
            }            
            
        }
        catch(Exception ex){
            String err = ex.toString();
            System.out.println("Mensaje: " + ex.getMessage());
        }
        finally {
            setClose();
        }
        
        return lstRtn;
    }
    public List<A1736Filter> loadPX128S01A1736EXCEL(A1736Filter filter) throws SQLException, Exception {
        List<A1736Filter> lstRtn = new ArrayList<A1736Filter>(0);
        A1736Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX128S01A1736(?,?,?,?,?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.registerOutParameter(10, Types.INTEGER);
            cstmt01.registerOutParameter(11, Types.INTEGER);
            cstmt01.registerOutParameter(12, Types.INTEGER);
            cstmt01.registerOutParameter(13, Types.INTEGER);

              cstmt01.setString(1, "139");//filter.IN_A1717CCUST
            cstmt01.setString(2, filter.IN_A1736FUENTE);
            cstmt01.setString(3, filter.IN_A1736PAIS);
            cstmt01.setString(4, filter.IN_A1736TIPO);
            cstmt01.setString(5, filter.IN_A1736MONEDA);
            
            cstmt01.setString(6, filter.IN_A1736SUBFU);
            cstmt01.setString(7, filter.IN_A1736FP);
            cstmt01.setString(8, filter.A1736CLIEN);
            cstmt01.setString(9, filter.A1736IATA);

            cstmt01.setInt(10, filter.page.PAGNUM);
            cstmt01.setInt(11, filter.page.PAGROW);
            cstmt01.setInt(12, filter.page.TOTPAG);
            cstmt01.setInt(13, filter.page.TOTROW);
            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(10);
            filter.page.PAGROW = cstmt01.getInt(11);
            filter.page.TOTPAG = cstmt01.getInt(12);
            filter.page.TOTROW = cstmt01.getInt(13);

            rs01 = cstmt01.getResultSet();

            while (rs01.next()) {

                objRtn = new A1736Filter();
                objRtn.RN = rs01.getLong("RN");
                objRtn.A1736FUENT = rs01.getString("A1736FUENT").trim();
                objRtn.A1736NOMBR = rs01.getString("A1736NOMBR").trim();
                objRtn.A1736TIDOC = rs01.getString("A1736TIDOC").trim();
                objRtn.A1736DIREC = rs01.getString("A1736DIREC").trim();
                objRtn.A1736UNID = rs01.getString("A1736UNID").trim();
                objRtn.A1736SCTA = rs01.getString("A1736SCTA").trim();
                objRtn.A1736REGVI = rs01.getString("A1736REGVI").trim();
                objRtn.A1736PAIS = rs01.getString("A1736PAIS").trim();
                objRtn.A1736FORPG = rs01.getString("A1736FORPG").trim();
                objRtn.A1736CLIEN = rs01.getString("A1736CLIEN").trim();
                objRtn.A1736IATA = rs01.getString("A1736IATA").trim();
                objRtn.A1736CECO = rs01.getString("A1736CECO").trim();
                objRtn.A1736EQUI = rs01.getString("A1736EQUI").trim();
                objRtn.A1736FREVI = Functions.getMonthConvertDate(rs01.getString("A1736FREVI"));
                objRtn.A1736TIPO = rs01.getString("A1736TIPO").trim();
                objRtn.A1736TAXI = rs01.getString("A1736TAXI").trim();
                objRtn.A1736UBI = rs01.getString("A1736UBI").trim();
                objRtn.A1736ICIA = rs01.getString("A1736ICIA").trim();
                objRtn.A1736HREVI = Functions.ConvertedTime(rs01.getString("A1736HREVI"));
                objRtn.A1736CURR = rs01.getString("A1736CURR").trim();
                objRtn.A1736CIA = rs01.getString("A1736CIA").trim();
                objRtn.A1736CTAC = rs01.getString("A1736CTAC").trim();
                objRtn.A1736REGIS = rs01.getString("A1736REGIS").trim();
                objRtn.A1736UO = rs01.getString("A1736UO").trim();
                objRtn.A1736FREGI = Functions.getMonthConvertDate(rs01.getString("A1736FREGI"));
                objRtn.A1736HREGI = Functions.ConvertedTime(rs01.getString("A1736HREGI"));
                objRtn.A1736FINI = Functions.getMonthConvertDate(rs01.getString("A1736FINI"));
                objRtn.A1736FFIN = Functions.getMonthConvertDate(rs01.getString("A1736FFIN"));
                
                objRtn.A1736FP = rs01.getString("A1736FP").trim();
                objRtn.A1736SUBFU = rs01.getString("A1736SUBFU").trim();

                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;

                lstRtn.add(objRtn);
            }

        } catch (Exception e) {
            e.getMessage();
        } finally {
            if (rs01 != null) {
                try {
                    rs01.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            if (cstmt01 != null) {
                try {
                    cstmt01.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return lstRtn;

    }
    
    
    
    
    public  List<A006> loadCurrency() throws SQLException, Exception {
         List<A006> lstRtn = new ArrayList<A006>(0);
         A006 objRtn;
         
         CallableStatement cstmt01 = null;
         ResultSet rs01 = null;

         String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX128S02A006}";
         
          Connection cnx = null;         
         try {
             cnx = session.getCNXIBMDB2().getIBMDB2Connection();  cstmt01 = cnx.prepareCall(SQLCLL01);      
             cstmt01.execute();
                                      
             rs01 = cstmt01.getResultSet();
             while (rs01.next()) {
                 objRtn = new A006();
                 objRtn.A006MONEDA = rs01.getString("A006MONEDA");
                 lstRtn.add(objRtn);
             }
             
         }finally {
            if (rs01 != null) {
                try { rs01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
            }
            if (cstmt01 != null) {
                try { cstmt01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }                       
         
         return lstRtn;
    }
    
    public  List<String> loadSubFu() throws SQLException, Exception {
         List<String> lstRtn = new ArrayList<String>(0);
         
         CallableStatement cstmt01 = null;
         ResultSet rs01 = null;

         String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX128S03A1736}";
         
          Connection cnx = null;         
         try {
             cnx = session.getCNXIBMDB2().getIBMDB2Connection();  cstmt01 = cnx.prepareCall(SQLCLL01);      
             cstmt01.execute();
                                      
             rs01 = cstmt01.getResultSet();
             while (rs01.next()) {
                 lstRtn.add(rs01.getString("A1736SUBFU"));
             }
             
         }finally {
            if (rs01 != null) {
                try { rs01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
            }
            if (cstmt01 != null) {
                try { cstmt01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }                       
         
         return lstRtn;
    }
    
    public String salesAccountMaintanceClient(A1736Filter filter, String strOption) {
        try {    
            strSQL = "{CALL " + session.getMainLibrary() + ".PX128S02A1736(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();  cs = cnx.prepareCall(strSQL);
            cs.setString(1, strOption);
            cs.setString(2, "139");
            cs.setString(3, filter.A1736PAIS);
            cs.setString(4, filter.A1736FUENT);
            cs.setString(5, filter.A1736TIPO);
            cs.setString(6, filter.A1736CURR);
            cs.setString(7, filter.A1736NOMBR);
            cs.setString(8, filter.A1736FORPG);
            cs.setString(9, filter.A1736TIDOC);
            cs.setString(10, filter.A1736CLIEN);
            cs.setString(11, filter.A1736DIREC);
            cs.setString(12, filter.A1736IATA);
            cs.setString(13, filter.A1736UO);
            cs.setString(14, filter.A1736TAXI);
            cs.setString(15, filter.A1736CIA);
            cs.setString(16, filter.A1736UNID);
            cs.setString(17, filter.A1736CECO);
            cs.setString(18, filter.A1736UBI);
            cs.setString(19, filter.A1736CTAC);
            cs.setString(20, filter.A1736SCTA);
            cs.setString(21, filter.A1736EQUI);
            cs.setString(22, filter.A1736ICIA);
            cs.setString(23, filter.A1736FINI);
            cs.setString(24, filter.A1736FFIN);            
            cs.setString(25, filter.A1736SUBFU);
            cs.setString(26, filter.A1736FP);            
            cs.setString(27, session.getUserView().getUserInfo().USR); //25
            cs.setString(28, Functions.getFechaActual());
            cs.setString(29, Functions.getHoraActual());
            cs.setString(30, filter.IN_A1736PAIS_OLD);
            cs.setString(31, filter.IN_A1736FUENTE_OLD);
            cs.setString(32, filter.IN_A1736TIPO_OLD);
            cs.setString(33, filter.IN_A1736MONEDA_OLD);
            cs.setString(34, filter.IN_A1736SUBFU_OLD);
            cs.setString(35, filter.IN_A1736FP_OLD);
            cs.setString(36, filter.IN_A1736IATA_OLD);
            cs.setString(37, filter.IN_A1736CIA_OLD);
            cs.execute();
            
            rst = cs.getResultSet();
            while (rst.next()) {
                strSQL = rst.getString("VMESSAGE");
            }
        } catch (Exception ex) {
            ex.printStackTrace();
            System.out.println("Mensaje: " + ex.getMessage());
        } finally {
            setClose();
        }

        return strSQL;
    }
    
    private void setClose() {

        if (rst != null) {
            try {
                rst.close();
            } catch (SQLException e) {
                throw new SpringException(e);
            }
        }
        if (cs != null) {
            try {
                cs.close();
            } catch (SQLException e) {
                throw new SpringException(e);
            }
        }
        try {
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
        } catch (Exception ex) {
            throw new SpringException(ex);
        }
        pasarGarbageCollector();
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }
}
