package net.miatech.praxis.dao.sales;

// <editor-fold defaultstate="collapsed" desc="Imports">
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.exceptions.SpringException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.SaleAudit.A1155Filter;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

// </editor-fold>
/**
 *
 * @author gsanchez
 */
public class CloneSchemeDAO {

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

    public List<A1155Filter> getListAgreement(A1155Filter filter) throws SQLException, Exception {
        List<A1155Filter> lstRtn = new ArrayList<A1155Filter>(0);
        A1155Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PXCOMM.SQP01255(?,?,?,?,?,?,?,?,?,?)}";//" + session.getMainLibrary() + "
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            //cstmt01.registerOutParameter(5, Types.INTEGER);
            //cstmt01.setString(2, session.getUserView().getCustomerInfo().CCUST);
            
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);
            cstmt01.registerOutParameter(9, Types.INTEGER);
            cstmt01.registerOutParameter(10, Types.INTEGER);
            
            cstmt01.setString(1, filter.A1155AIRLI);
            cstmt01.setString(2, filter.A1155CODAC);
            cstmt01.setString(3, filter.A1155INDAC);
            cstmt01.setString(4, filter.A1155FESTA);
            cstmt01.setString(5, filter.A1155FINI);
            cstmt01.setString(6, filter.A1155FINGR);
            
            cstmt01.setInt(7, filter.page.PAGNUM);
            cstmt01.setInt(8, filter.page.PAGROW);
            cstmt01.setInt(9, filter.page.TOTPAG);
            cstmt01.setInt(10, filter.page.TOTROW);
            cstmt01.execute();
            
            filter.page.PAGNUM = cstmt01.getInt(7);
            filter.page.PAGROW = cstmt01.getInt(8);
            filter.page.TOTPAG = cstmt01.getInt(9);
            filter.page.TOTROW = cstmt01.getInt(10);

            rs01 = cstmt01.getResultSet();

            while (rs01.next()) {
                objRtn = new A1155Filter();
                objRtn.RN = rs01.getInt("RN");
                objRtn.A1155AIRLI = rs01.getString("A1155AIRLI");
                objRtn.A1155CIA1 = rs01.getString("A1155CIA1").trim();
                objRtn.A1155CIA2 = rs01.getString("A1155CIA2").trim();
                objRtn.A1155VLINI = rs01.getString("A1155VLINI").trim();
                objRtn.A1155VLFIN = rs01.getString("A1155VLFIN").trim();
                objRtn.A1155CNUM = rs01.getString("A1155CNUM").trim();
                objRtn.A1155FNUM = rs01.getString("A1155FNUM").trim();
                objRtn.A1155CODAC = rs01.getString("A1155CODAC").trim();
                objRtn.A1155INDAC = rs01.getString("A1155INDAC").trim();
                objRtn.A1155VRSAC = rs01.getString("A1155VRSAC").trim();
                objRtn.A1155FLGAD = rs01.getString("A1155FLGAD").trim();
                objRtn.A1155FINI = Functions.getMonthConvertDate(rs01.getString("A1155FINI").trim());
                objRtn.A1155FFIN = Functions.getMonthConvertDate(rs01.getString("A1155FFIN").trim());
                objRtn.A1155FLGFE = rs01.getString("A1155FLGFE").trim();
                objRtn.A1155FLGAU = rs01.getString("A1155FLGAU").trim();//Functions.getMonthConvertDate(rst.getString("A1736FREVI"));
                objRtn.A1155FESTA = rs01.getString("A1155FESTA").trim();
                objRtn.A1155INDIC = rs01.getString("A1155INDIC").trim();
                objRtn.A1155MPA = rs01.getString("A1155MPA").trim();
                objRtn.A1155SRP = rs01.getString("A1155SRP").trim();//Functions.ConvertedTime(rst.getString("A1736HREVI"));
                objRtn.A1155PRO = rs01.getString("A1155PRO").trim();
                objRtn.A1155TRAMO = rs01.getString("A1155TRAMO").trim();
                objRtn.A1155DEFAU = rs01.getString("A1155DEFAU").trim();
                objRtn.A1155PDEFA = rs01.getString("A1155PDEFA").trim();
                objRtn.A1155IDSCO = rs01.getString("A1155IDSCO").trim();
                objRtn.A1155PISC = rs01.getString("A1155PISC").trim();//Functions.getMonthConvertDate(rst.getString("A1736FREGI"));
                objRtn.A1155FRECE = Functions.getMonthConvertDate(rs01.getString("A1155FRECE").trim());//Functions.ConvertedTime(rst.getString("A1736HREGI"));
                objRtn.A1155CIAFM = rs01.getString("A1155CIAFM").trim();//Functions.getMonthConvertDate(rst.getString("A1736FINI"));
                objRtn.A1155FNAME = rs01.getString("A1155FNAME").trim();//Functions.getMonthConvertDate(rst.getString("A1736FFIN"));
                
                objRtn.A1155CODSP = rs01.getString("A1155CODSP").trim();
                objRtn.A1155CORRE = rs01.getString("A1155CORRE").trim();
                objRtn.A1155ESTAD = rs01.getString("A1155ESTAD").trim();
                objRtn.A1155UINGR = rs01.getString("A1155UINGR").trim();
                objRtn.A1155FINGR = Functions.getMonthConvertDate(rs01.getString("A1155FINGR").trim());
                objRtn.A1155HINGR = Functions.ConvertedTime(rs01.getString("A1155HINGR").trim());
                objRtn.A1155UMODI = rs01.getString("A1155UMODI").trim();
                objRtn.A1155FMODI = Functions.getMonthConvertDate(rs01.getString("A1155FMODI").trim());
                objRtn.A1155HMODI = Functions.ConvertedTime(rs01.getString("A1155HMODI").trim());
     
                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;

                lstRtn.add(objRtn);
            }
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
    
    public List<A1155Filter>  setSaveClone( A1155Filter filter) throws SQLException, Exception {
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        List<A1155Filter> lstRtn = new ArrayList<A1155Filter>(0);
        A1155Filter objRtn;
        
        String SQLCLL01 = "{CALL PXCOMM.SQP01256(?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection(); 
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cnx.getMetaData();
            Functions.msjConsola("PRAXIS", cnx.getMetaData().getProcedureTerm().toString(), "PROCEDURE : setCopy");
            cstmt01.registerOutParameter(13, Types.VARCHAR);
            cstmt01.registerOutParameter(14, Types.VARCHAR);
            
            cstmt01.setString(1, "139");
            cstmt01.setString(2, filter.IN_SELET_CODE);
            cstmt01.setString(3, filter.IN_SELET_TYPE);
            cstmt01.setString(4, filter.IN_SELET_SERIE);
            cstmt01.setString(5, filter.IN_COPY_CODE);
            cstmt01.setString(6, filter.IN_COPY_TYPE);
            cstmt01.setString(7, filter.IN_COPY_SERIE);
            
            cstmt01.setInt(8, filter.IN_COPY_INFO);
            cstmt01.setInt(9, filter.IN_COPY_GLOBAL);
            cstmt01.setInt(10, filter.IN_COPY_SECTOR);
            cstmt01.setInt(11, filter.IN_COPY_AX_TABLE);
            
            cstmt01.setString(12, session.getUserView().getCustomerInfo().USR);
            
            cstmt01.execute();
            filter.OU_SQLCODE = cstmt01.getString(13);
            filter.OU_MESSAGE = cstmt01.getString(14);
            
            objRtn = new A1155Filter();
            objRtn.OU_SQLCODE = filter.OU_SQLCODE;
            objRtn.OU_MESSAGE = filter.OU_MESSAGE;
            lstRtn.add(objRtn);
            
        } finally {
            if (cstmt01 != null) {                
                try { cstmt01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
        return lstRtn;
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
