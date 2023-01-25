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
import net.miatech.beans.PX032S01A1202Filter;

import net.miatech.beans.spring.implement.IServerSession;
import org.apache.log4j.Logger;

/**
 *
 * @author lmendoza
 */
public class TAXRATDDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public TAXRATDDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public TAXRATDDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<PX032S01A1202Filter> loadPX032S01A1202(PX032S01A1202Filter filter) throws SQLException, Exception {
        List<PX032S01A1202Filter> lstRtn = new ArrayList<>(0);
        PX032S01A1202Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

    
        try {
            String SQLCLL01 = "{CALL PX032S02A1202(?,?,?,?,?,?,?)}";
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(4, Types.INTEGER);
            cstmt01.registerOutParameter(5, Types.INTEGER);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);

            cstmt01.setString(1, filter.IN_TFILTER);
            cstmt01.setString(2, filter.IN_A1202CODTA);
            cstmt01.setString(3, filter.IN_A1202PAITA);
            //cstmt01.setString(4, filter.IN_A1202IDTAX);
            cstmt01.setInt(4, filter.page.PAGNUM);
            cstmt01.setInt(5, filter.page.PAGROW);
            cstmt01.setInt(6, filter.page.TOTPAG);
            cstmt01.setInt(7, filter.page.TOTROW);

            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(4);
            filter.page.PAGROW = cstmt01.getInt(5);
            filter.page.TOTPAG = cstmt01.getInt(6);
            filter.page.TOTROW = cstmt01.getInt(7);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new PX032S01A1202Filter();
                objRtn.RN = rs01.getLong("RN");
                objRtn.A1202PAITA = rs01.getString("A1202PAITA");
                objRtn.A1202CODTA = rs01.getString("A1202CODTA");
                objRtn.A1202IDTAX = rs01.getString("A1202IDTAX");
                objRtn.A1202TNAME = rs01.getString("A1202TNAME");
                objRtn.A1202TDEFI = rs01.getString("A1202TDEFI");
//                objRtn.A1202PVTA = rs01.getString("A1202PVTA");
                objRtn.A1202PDESC = rs01.getString("A1202PDESC");
//                objRtn.A1202RSEL = rs01.getString("A1202RSEL");
//                objRtn.A1202RLIF = rs01.getString("A1202RLIF");
//                objRtn.A1202ROTH = rs01.getString("A1202ROTH");
                objRtn.A1202INTER = rs01.getString("A1202INTER");
//                objRtn.A1202FENTR = rs01.getString("A1202FENTR");
//                objRtn.A1202FREVI = rs01.getString("A1202FREVI");
//                objRtn.A1202FLAST = rs01.getString("A1202FLAST");
//                objRtn.A1202FLAST = rs01.getString("A1202FLAST");
                objRtn.A1202OARRI = rs01.getString("A1202OARRI");
                objRtn.A1202ODEPA = rs01.getString("A1202ODEPA");
//                objRtn.A1202INDME = rs01.getString("A1202INDME");
//                objRtn.A1202STATU = rs01.getString("A1202STATU");
//                objRtn.A1202PRIOR = rs01.getString("A1202PRIOR");
//                objRtn.A1202ALTER = rs01.getString("A1202ALTER");
                objRtn.A1202UINGR = rs01.getString("A1202UINGR");
                objRtn.A1202FINGR = rs01.getString("A1202FINGR");
//                objRtn.A1202HINGR = rs01.getString("A1202HINGR");
                objRtn.A1202UMODI = rs01.getString("A1202UMODI");
                objRtn.A1202FMODI = rs01.getString("A1202FMODI");
//                objRtn.A1202HMODI = rs01.getString("A1202HMODI");

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
