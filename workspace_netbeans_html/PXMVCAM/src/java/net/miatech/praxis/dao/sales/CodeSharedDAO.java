package net.miatech.praxis.dao.sales;

// <editor-fold defaultstate="collapsed" desc="Imports">
import net.miatech.praxis.dao.flown.*;
import static com.ibm.as400.data.PcmlMessageLog.logError;
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
import net.miatech.beans.PX031S01A766Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.utils.Functions;

// </editor-fold>

/**
 *
 * @author gsanchez
 */
public class CodeSharedDAO {
    
    // <editor-fold defaultstate="collapsed" desc="Variables locales">
    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private String strSQL;
    // </editor-fold>

    public CodeSharedDAO() {
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }
    
    public List<PX031S01A766Filter> loadPX031S01A766(PX031S01A766Filter filter) {
        List<PX031S01A766Filter> lstRtn = new ArrayList<>(0);
        PX031S01A766Filter objRtn;

        strSQL = "{CALL PX031S01A766(?,?,?,?,?,?,?,?,?,?,?)}";
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();  cs = cnx.prepareCall(strSQL);

            cs.registerOutParameter(8, Types.INTEGER);
            cs.registerOutParameter(9, Types.INTEGER);
            cs.registerOutParameter(10, Types.INTEGER);
            cs.registerOutParameter(11, Types.INTEGER);

            cs.setInt(1, filter.IN_TFILTER);
            cs.setString(2, filter.IN_A766AIRLIN);
            cs.setString(3, filter.IN_A766CARRIE);
            cs.setString(4, filter.IN_A766VLOINI);
            cs.setString(5, filter.IN_A766VLOFIN);
            cs.setString(6, filter.IN_A766EFF);
            cs.setString(7, filter.IN_A766DIS);
            cs.setInt(8, filter.page.PAGNUM);
            cs.setInt(9, filter.page.PAGROW);
            cs.setInt(10, filter.page.TOTPAG);
            cs.setInt(11, filter.page.TOTROW);
            
            cs.execute();

            filter.page.PAGNUM = cs.getInt(8);
            filter.page.PAGROW = cs.getInt(9);
            filter.page.TOTPAG = cs.getInt(10);
            filter.page.TOTROW = cs.getInt(11);
            
            rst = cs.getResultSet();
            while (rst.next()) {
                objRtn = new PX031S01A766Filter();
                objRtn.RN = rst.getLong("RN");
                objRtn.A766AIRLIN = rst.getString("A766AIRLIN");
                objRtn.A766CARRIE = rst.getString("A766CARRIE");
                objRtn.A766VLOINI = rst.getString("A766VLOINI");
                objRtn.A766VLOFIN = rst.getString("A766VLOFIN");
                objRtn.A766CIANUM = rst.getString("A766CIANUM");
                objRtn.A766CIALIT = rst.getString("A766CIALIT");
                objRtn.A766UINGRE = rst.getString("A766UINGRE");
                objRtn.A766FINGRE = rst.getString("A766FINGRE");
                objRtn.A766HINGRE = rst.getString("A766HINGRE");
                objRtn.A766UMODI = rst.getString("A766UMODI");
                objRtn.A766FMODI = rst.getString("A766FMODI");
                objRtn.A766HMODI = rst.getString("A766HMODI");
                objRtn.A766EFF = rst.getString("A766EFF");
                objRtn.A766DIS = rst.getString("A766DIS");
                objRtn.A766VLOOP = rst.getString("A766VLOOP");

                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;
                lstRtn.add(objRtn);
            }
        } catch (Exception ex) {
            System.out.println("Mensaje: " + ex.getMessage());
        } finally {
            setClose();
        }

        return lstRtn;
    }
    
    public String SQP02417(PX031S01A766Filter filter, String strOption) throws SQLException, Exception{
        String STR_RESULT = "";
        try {    
            strSQL = "{CALL " + session.getMainLibrary() + ".SQP02417(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();  cs = cnx.prepareCall(strSQL);
            cs.setString(1, strOption);
            cs.setString(2, filter.A766AIRLIN);
            cs.setString(3, filter.A766CARRIE);
            cs.setString(4, filter.A766VLOINI);
            cs.setString(5, filter.A766VLOFIN);
            cs.setString(6, filter.A766EFF);
            cs.setString(7, filter.A766DIS);
            cs.setString(8, filter.A766CIANUM);
            cs.setString(9, filter.A766CIALIT);
            cs.setString(10, filter.A766VLOOP);
            cs.setString(11, filter.A766ORIG);
            cs.setString(12, filter.A766DEST);
            cs.setString(13, session.getUserView().getUserInfo().USR);
            cs.setString(14, Functions.getFechaActual());
            cs.setString(15, Functions.getHoraActual());
            cs.setString(16, filter.IN_A766AIRLIN_OLD);
            cs.setString(17, filter.IN_A766CARRIE_OLD);      
            cs.setString(18, filter.IN_A766VLOINI_OLD);
            cs.setString(19, filter.IN_A766VLOFIN_OLD);
            cs.setString(20, filter.IN_A766EFF_OLD);
            cs.setString(21, filter.IN_A766DIS_OLD);
            cs.execute();
            
            rst = cs.getResultSet();
            while (rst.next()) {
                STR_RESULT = rst.getString("VMESSAGE");
            }
//            try { cs.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
        } finally {
            setClose();
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
