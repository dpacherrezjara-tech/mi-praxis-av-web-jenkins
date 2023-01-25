package net.miatech.praxis.dao.interline;

// <editor-fold defaultstate="collapsed" desc="import">
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.exceptions.SpringException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.A1740Filter;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

// </editor-fold>

/**
 *
 * @author gsanchez
 */
public class AccountingMasterInterliDAO {

    // <editor-fold defaultstate="collapsed" desc="Variables locales">
    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private String strSQL;
    private static final Logger logError = Logger.getLogger("errorLog");
    // </editor-fold>

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A1740Filter> loadPX126S02A1740(A1740Filter filter) throws SQLException, Exception {
        List<A1740Filter> lstRtn = new ArrayList<A1740Filter>(0);
        A1740Filter objRtn;
        int PAGINIT = 1, totPAGS = 0, totRowsPag = 20, totRows = -1;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PRAXIS.SQP04488(?,?,?,?,?,?,?,?,?,?)}"; // PX210S01A1740

        session.getCNXIBMDB2().open();         
        try {
            if (filter.page.PAGNUM > 0) {
               PAGINIT = (filter.page.PAGNUM - 1) * totRowsPag + 1;
            }
          
            cstmt01 = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);

            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);
            cstmt01.registerOutParameter(9, Types.INTEGER);
            cstmt01.registerOutParameter(10, Types.INTEGER);

            cstmt01.setString(1, filter.IN_A1740TITRA.trim());
            cstmt01.setString(2, filter.IN_A1740TIPO.trim());            
            cstmt01.setString(3, filter.A1740SUBTI.trim());
            cstmt01.setString(4, filter.A1740CATEG.trim());
            cstmt01.setString(5, filter.A1740CTA.trim());
            cstmt01.setString(6, filter.A1740SCTA.trim());
            cstmt01.setInt(7, PAGINIT);
            cstmt01.setInt(8, filter.page.PAGROW);     
            cstmt01.setInt(9, totRows);     
            cstmt01.setInt(10, -1);     

            cstmt01.execute();
            
            filter.page.PAGROW = cstmt01.getInt(8);
            filter.page.TOTPAG = cstmt01.getInt(9);
            filter.page.TOTROW = cstmt01.getInt(10);
            
            if (filter.page.TOTROW > 0 && filter.page.TOTROW == cstmt01.getInt(9)) {
               totRows = filter.page.TOTROW;
               totPAGS = filter.page.TOTPAG;
            } else {
               try {
                   totRows = cstmt01.getInt(10);
                   int total =  (int)(totRows / 20);                                                                    
                   int resto =  (totRows % 20);                    

                   if(resto>0)
                       totPAGS = total + 1;
                   else
                       totPAGS = total;

               } catch (Exception e) {
                   totPAGS = totRows / totRowsPag;
               }
            }          
             
            filter.page.TOTPAG = totPAGS;
            
            rs01 = cstmt01.getResultSet();
            int pos = 0;
            while (rs01.next()) {
                pos++;
                objRtn = new A1740Filter();
                objRtn.RN = rs01.getLong("NO");
                objRtn.A1740TITRA = rs01.getString("A1740TITRA").trim();
                objRtn.A1740TIPO = rs01.getString("A1740TIPO").trim();
                objRtn.A1740INTNU = rs01.getString("A1740INTNU").trim();
                objRtn.A1740TIPODESC = rs01.getString("A1740TIPODESC").trim();
                objRtn.A1740SUBTI = rs01.getString("A1740SUBTI").trim();
                objRtn.A1740CATEG = rs01.getString("A1740CATEG").trim();
                objRtn.A1740CIA = rs01.getString("A1740CIA").trim();
                objRtn.A1740UNIDA = rs01.getString("A1740UNIDA").trim();
                objRtn.A1740CECOS = rs01.getString("A1740CECOS").trim();
                objRtn.A1740UBICA = rs01.getString("A1740UBICA").trim();
                objRtn.A1740CTA = rs01.getString("A1740CTA").trim();
                objRtn.A1740SCTA = rs01.getString("A1740SCTA").trim();
                objRtn.A1740EQUI = rs01.getString("A1740EQUI").trim();
                objRtn.A1740ICIA = rs01.getString("A1740ICIA").trim();
                objRtn.A1740INTNU = rs01.getString("A1740INTNU");
                objRtn.A1740CLIE = rs01.getString("A1740CLIE").trim();
                objRtn.A1740FINI = Functions.getMonthConvertDate(rs01.getString("A1740FINI"));
                objRtn.A1740FFIN = Functions.getMonthConvertDate(rs01.getString("A1740FFIN"));
                
                objRtn.A1740REGIS = rs01.getString("A1740REGIS");
                objRtn.A1740FREGI = Functions.getMonthConvertDate(rs01.getString("A1740FREGI"));
                objRtn.A1740HREGI = Functions.ConvertedTime(rs01.getString("A1740HREGI"));
                objRtn.A1740REGVI = rs01.getString("A1740REGVI");
                objRtn.A1740FREVI = Functions.getMonthConvertDate(rs01.getString("A1740FREVI"));
                objRtn.A1740HREVI = Functions.ConvertedTime(rs01.getString("A1740HREVI"));
                                
                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;
                lstRtn.add(objRtn);
            }        
         }finally {
            if (rs01 != null) {
                try { rs01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
            }
            if (cstmt01 != null) {
                try { cstmt01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
            }
            session.getCNXIBMDB2().close();
            pasarGarbageCollector();
        }
         
         return lstRtn; 
    }
    
    public String accountMasterMaintance(A1740Filter filter, String strOption) throws SQLException, Exception {
        CallableStatement cs = null;
        ResultSet rst = null;
        String strSQL;
        String STR_RESULT = "";
        
        session.getCNXIBMDB2().open();
        try {    
            strSQL = "{CALL PRAXIS.SQP04489(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}"; // PX210S02A1740
            cs = session.getCNXIBMDB2().getConnection().prepareCall(strSQL);
            cs.setString(1, strOption);
            cs.setString(2, filter.A1740CCUST);
            cs.setString(3, filter.A1740TITRA);
            cs.setString(4, filter.A1740TIPO);
            cs.setString(5, filter.A1740SUBTI);
            cs.setString(6, filter.A1740CATEG);
            cs.setString(7, filter.A1740CIA);
            cs.setString(8, filter.A1740UNIDA);
            cs.setString(9, filter.A1740CECOS);
            cs.setString(10, filter.A1740UBICA);
            cs.setString(11, filter.A1740CTA);
            cs.setString(12, filter.A1740SCTA);
            cs.setString(13, filter.A1740EQUI);
            cs.setString(14, filter.A1740ICIA);
            cs.setString(15, filter.A1740CLIE);
            cs.setString(16, filter.A1740FINI);
            cs.setString(17, filter.A1740FFIN);            
            cs.setString(18, session.getUserView().getUserInfo().USR);
            cs.setString(19, Functions.getFechaActual());
            cs.setString(20, Functions.getHoraActual());
            cs.setString(21, filter.IN_A1740TITRA_OLD);
            cs.setString(22, filter.IN_A1740TIPO_OLD);
            cs.setString(23, filter.IN_A1740SUBTI_OLD);
            cs.setString(24, filter.IN_A1740CATEG_OLD);
            cs.setString(25, filter.A1740INTNU);
            cs.execute();
            
            rst = cs.getResultSet();
            while (rst.next()) {
                STR_RESULT = rst.getString("VMESSAGE");
            }
            try { cs.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            strSQL = null;
            session.getCNXIBMDB2().close();
        }

        return STR_RESULT;
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
