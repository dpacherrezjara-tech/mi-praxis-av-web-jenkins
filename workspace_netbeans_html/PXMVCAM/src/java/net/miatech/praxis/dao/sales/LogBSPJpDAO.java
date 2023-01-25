/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.dao.sales;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.PX179S01A1845Filter;

import net.miatech.beans.spring.implement.IServerSession;
import org.apache.log4j.Logger;

/**
 *
 * @author lmendoza
 */
public class LogBSPJpDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public LogBSPJpDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public LogBSPJpDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<PX179S01A1845Filter> loadPX179S01A1845(PX179S01A1845Filter filter) throws SQLException, Exception {
        List<PX179S01A1845Filter> lstRtn = new ArrayList<>(0);
        PX179S01A1845Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00226(?,?,?,?,?,?,?,?,?)}";
        //String SQLCLL01 = "{CALL  LIBSAP04.SQP00226(?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);
            cstmt01.registerOutParameter(9, Types.INTEGER);

            cstmt01.setString(1, "139");
            cstmt01.setString(2, filter.IN_FECHAFROM);
            cstmt01.setString(3, filter.IN_FECHATO);
            cstmt01.setString(4, filter.IN_PAIS);
            cstmt01.setString(5, filter.IN_MONEDA);
            cstmt01.setInt(6, filter.page.PAGNUM);
            cstmt01.setInt(7, filter.page.PAGROW);
            cstmt01.setInt(8, filter.page.TOTPAG);
            cstmt01.setInt(9, filter.page.TOTROW);

            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(6);
            filter.page.PAGROW = cstmt01.getInt(7);
            filter.page.TOTPAG = cstmt01.getInt(8);
            filter.page.TOTROW = cstmt01.getInt(9);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new PX179S01A1845Filter();
                objRtn.A1845AGENT = rs01.getString("A1845AGENT");
                objRtn.IATANAME = rs01.getString("IATANAME");
                objRtn.TICKET = rs01.getString("A1845CIA") + rs01.getString("A1845FORMA") + rs01.getString("A1845SERIE");
                objRtn.A1845FLAG = rs01.getString("A1845FLAG") + rs01.getInt("A1845NSEQ");
                //objRtn.A1845NSEQ = rs01.getInt("A1845NSEQ");
                objRtn.A1845TRNCU = rs01.getString("A1845TRNCU");
                objRtn.A1845TDOC = rs01.getString("A1845TDOC");
                objRtn.A1845FECVT = rs01.getString("A1845FECVT");
                objRtn.A1845PORCO = rs01.getDouble("A1845PORCO");
                objRtn.A1845COBL = rs01.getDouble("A1845COBL");
                objRtn.A1845COMMI = rs01.getDouble("A1845COMMI");
                objRtn.A1845NETFA = rs01.getDouble("A1845NETFA");
                objRtn.A1845APLC = rs01.getString("A1845APLC");
                objRtn.A1845FAADJ = rs01.getDouble("A1845FAADJ");
                objRtn.A1845CMADJ = rs01.getDouble("A1845CMADJ");
                objRtn.SUMFARE = rs01.getDouble("SUMFARE");
                objRtn.SUMCOMM = rs01.getDouble("SUMCOMM");
                objRtn.SUMFAREADJ = rs01.getDouble("SUMFAREADJ");
                objRtn.SUMCOMMADJ = rs01.getDouble("SUMCOMMADJ");
                objRtn.A1845FBASI = rs01.getString("A1845FBASI");
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

    
}
