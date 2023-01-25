/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.dao.salesAudit;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.SaleAudit.A1672Filter;
import net.miatech.beans.spring.implement.IServerSession;
import static net.miatech.utils.Functions.pasarGarbageCollector;
import org.apache.log4j.Logger;

/**
 *
 * @author zperez
 */
public class SalesMasterReportFormDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public SalesMasterReportFormDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public SalesMasterReportFormDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A1672Filter> lst_search(A1672Filter filter) throws SQLException, Exception {
        List<A1672Filter> lstRtn = new ArrayList<>(0);
        A1672Filter objRtn;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        try {
            String SQLCLL01 = "{CALL PXSAUDIT.SQP01011(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.registerOutParameter(21, Types.INTEGER);
            cstmt01.registerOutParameter(22, Types.INTEGER);
            cstmt01.registerOutParameter(23, Types.INTEGER);
            cstmt01.registerOutParameter(24, Types.INTEGER);

            cstmt01.setInt(1, filter.VP_FILTER);
            cstmt01.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(3, filter.VP_CIA);
            cstmt01.setString(4, filter.VP_FRMSRIE);
            cstmt01.setString(5, filter.VP_SEQ);
            cstmt01.setString(6, filter.VP_SOURCE);
            cstmt01.setString(7, filter.VP_CANAL);
            cstmt01.setString(8, filter.VP_IATA);
            cstmt01.setString(9, filter.VP_IT);
            cstmt01.setString(10, filter.VP_FBASIS);
            cstmt01.setString(11, filter.VP_CODREASON);
            cstmt01.setString(12, filter.VP_TYMEMO);
            cstmt01.setString(13, filter.VP_AUDIT);
            cstmt01.setString(14, filter.VP_STATUS);
            cstmt01.setString(15, filter.VP_DATEFROM);
            cstmt01.setString(16, filter.VP_DATETO);
            cstmt01.setString(17, filter.VP_TRNCU);
            cstmt01.setString(18, filter.VP_STREVISION);
            cstmt01.setString(19, filter.VP_TDOC);
            cstmt01.setString(20, filter.VP_PAIS);

            cstmt01.setInt(21, filter.page.PAGNUM);
            cstmt01.setInt(22, filter.page.PAGROW);
            cstmt01.setInt(23, filter.page.TOTPAG);
            cstmt01.setInt(24, filter.page.TOTROW);

            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(21);
            filter.page.PAGROW = cstmt01.getInt(22);
            filter.page.TOTPAG = cstmt01.getInt(23);
            filter.page.TOTROW = cstmt01.getInt(24);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new A1672Filter();
                // if (!filter.VP_FILTER.equals("4") || (filter.VP_FILTER.equals("4") && rs01.getString("TRAMO").equals("1"))) {
                //PRIMARY KEY
                objRtn.A1672CCUST = rs01.getString("A1672CCUST");
                objRtn.A1672CIA = rs01.getString("A1672CIA");
                objRtn.A1672FORMA = rs01.getString("A1672FORMA");
                objRtn.A1672SERIE = rs01.getString("A1672SERIE");
                objRtn.A1672SEQ = rs01.getString("A1672SEQ");
                objRtn.A1672CUPON = rs01.getString("A1672CUPON");
                if (rs01.getString("A1672STO0").equals("YES")) {
                    if (rs01.getString("A1672REVIS").trim().equals("")) {
                        objRtn.A1672REVIS = "AUT";
                    } else {
                        objRtn.A1672REVIS = rs01.getString("A1672REVIS");
                    }

                } else {
                    objRtn.A1672REVIS = rs01.getString("A1672REVIS");
                }

                objRtn.A1672TICKET = rs01.getString("A1672TICKET");
                objRtn.A1672FUENT = rs01.getString("A1672FUENT");
                objRtn.A1672TRNCU = rs01.getString("A1672TRNCU");
                objRtn.A1672FVENT = rs01.getString("A1672FVENT");
                objRtn.A1672FPROC = rs01.getString("A1672FPROC");
                objRtn.A1672CANAL = rs01.getString("A1672CANAL");
                objRtn.A1672AGENT = rs01.getString("A1672AGENT");
                objRtn.A1672NAGENCY = rs01.getString("A1672NAGENCY");
                objRtn.A1672CODIT = rs01.getString("A1672CODIT");
                objRtn.A1672ITIN = rs01.getString("A1672ITIN");
                objRtn.A1672FBASI = rs01.getString("A1672FBASI");
                objRtn.A1672ERROR = rs01.getString("A1672ERROR");
                objRtn.A1672NREASON = rs01.getString("A1672NREASON");
                objRtn.A1672MEMO = rs01.getString("A1672MEMO");
                objRtn.A1672CURRENCY = rs01.getString("A1672CURRENCY");
                objRtn.A1672TTMIA = rs01.getString("A1672TTMIA");
                objRtn.A1672TTAGT = rs01.getString("A1672TTAGT");
                objRtn.A1672TTDIF = rs01.getString("A1672TTDIF");

                objRtn.A1672STO0 = rs01.getString("A1672STO0");
                objRtn.A1672FLADM = rs01.getString("A1672FLADM");
                objRtn.A1672STAT = rs01.getString("A1672STAT");
                objRtn.A1672TDOC = rs01.getString("A1672TDOC");

                objRtn.A1672GRUPO = rs01.getString("A1672GRUPO");
                objRtn.A1672PAIVT = rs01.getString("A1672PAIVT");
                objRtn.A2548FLAG = rs01.getString("STATACEPT");
                objRtn.A1672FREGI = rs01.getString("A1672FREGI");
                objRtn.A1672CHADI = rs01.getString("A2548NMEMO");

                objRtn.A1672COMEN = rs01.getString("A1672COMEN");
                objRtn.A1672CMBPO = rs01.getString("A1672CMBPO");
                objRtn.A1672TKCNX = rs01.getString("A1672CNX1");
                objRtn.A1672FCMI = rs01.getString("A1672FCMI");
                objRtn.A1672PNR = rs01.getString("A1672PNR");
               objRtn.A1672IDFIL = rs01.getString("A1672IDFIL"); 

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
    /*public List<A1672Filter> lst_search(A1672Filter filter) throws SQLException, Exception {
        List<A1672Filter> lstRtn = new ArrayList<A1672Filter>(0);
        A1672Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PXSAUDIT.SQP01011(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.registerOutParameter(21, Types.INTEGER);
            cstmt01.registerOutParameter(22, Types.INTEGER);
            cstmt01.registerOutParameter(23, Types.INTEGER);
            cstmt01.registerOutParameter(24, Types.INTEGER);

            cstmt01.setInt(1, filter.VP_FILTER);
            cstmt01.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(3, filter.VP_CIA);
            cstmt01.setString(4, filter.VP_FRMSRIE);
            cstmt01.setString(5, filter.VP_SEQ);
            cstmt01.setString(6, filter.VP_SOURCE);
            cstmt01.setString(7, filter.VP_CANAL);
            cstmt01.setString(8, filter.VP_IATA);
            cstmt01.setString(9, filter.VP_IT);
            cstmt01.setString(10, filter.VP_FBASIS);
            cstmt01.setString(11, filter.VP_CODREASON);
            cstmt01.setString(12, filter.VP_TYMEMO);
            cstmt01.setString(13, filter.VP_AUDIT);
            cstmt01.setString(14, filter.VP_STATUS);
            cstmt01.setString(15, filter.VP_DATEFROM);
            cstmt01.setString(16, filter.VP_DATETO);
            cstmt01.setString(17, filter.VP_TRNCU);
            cstmt01.setString(18, filter.VP_STREVISION);
            cstmt01.setString(19, filter.VP_TDOC);
            cstmt01.setString(20, filter.VP_PAIS);

            cstmt01.setInt(21, filter.page.PAGNUM);
            cstmt01.setInt(22, filter.page.PAGROW);
            cstmt01.setInt(23, filter.page.TOTPAG);
            cstmt01.setInt(24, filter.page.TOTROW);

            cstmt01.execute();

            //*System.out.println("Aqui entro con Filtro Categoria: ");
            filter.page.PAGNUM = cstmt01.getInt(21);
            filter.page.PAGROW = cstmt01.getInt(22);
            filter.page.TOTPAG = cstmt01.getInt(23);
            filter.page.TOTROW = cstmt01.getInt(24);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new A1672Filter();
                // if (!filter.VP_FILTER.equals("4") || (filter.VP_FILTER.equals("4") && rs01.getString("TRAMO").equals("1"))) {
                //PRIMARY KEY
                objRtn.A1672CCUST = rs01.getString("A1672CCUST");
                objRtn.A1672CIA = rs01.getString("A1672CIA");
                objRtn.A1672FORMA = rs01.getString("A1672FORMA");
                objRtn.A1672SERIE = rs01.getString("A1672SERIE");
                objRtn.A1672SEQ = rs01.getString("A1672SEQ");
                objRtn.A1672CUPON = rs01.getString("A1672CUPON");
                if (rs01.getString("A1672STO0").equals("YES")) {
                    if (rs01.getString("A1672REVIS").trim().equals("")) {
                        objRtn.A1672REVIS = "AUT";
                    } else {
                        objRtn.A1672REVIS = rs01.getString("A1672REVIS");
                    }

                } else {
                    objRtn.A1672REVIS = rs01.getString("A1672REVIS");
                }

                objRtn.A1672TICKET = rs01.getString("A1672TICKET");
                objRtn.A1672FUENT = rs01.getString("A1672FUENT");
                objRtn.A1672TRNCU = rs01.getString("A1672TRNCU");
                objRtn.A1672FVENT = rs01.getString("A1672FVENT");
                objRtn.A1672FPROC = rs01.getString("A1672FPROC");
                objRtn.A1672CANAL = rs01.getString("A1672CANAL");
                objRtn.A1672AGENT = rs01.getString("A1672AGENT");
                objRtn.A1672NAGENCY = rs01.getString("A1672NAGENCY");
                objRtn.A1672CODIT = rs01.getString("A1672CODIT");
                objRtn.A1672ITIN = rs01.getString("A1672ITIN");
                objRtn.A1672FBASI = rs01.getString("A1672FBASI");
                objRtn.A1672ERROR = rs01.getString("A1672ERROR");
                objRtn.A1672NREASON = rs01.getString("A1672NREASON");
                objRtn.A1672MEMO = rs01.getString("A1672MEMO");
                objRtn.A1672CURRENCY = rs01.getString("A1672CURRENCY");
                objRtn.A1672TTMIA = rs01.getString("A1672TTMIA");
                objRtn.A1672TTAGT = rs01.getString("A1672TTAGT");
                objRtn.A1672TTDIF = rs01.getString("A1672TTDIF");

                objRtn.A1672STO0 = rs01.getString("A1672STO0");
                objRtn.A1672FLADM = rs01.getString("A1672FLADM");
                objRtn.A1672STAT = rs01.getString("A1672STAT");
                objRtn.A1672TDOC = rs01.getString("A1672TDOC");

                objRtn.A1672GRUPO = rs01.getString("A1672GRUPO");
                objRtn.A1672PAIVT = rs01.getString("A1672PAIVT");
                objRtn.A2548FLAG = rs01.getString("STATACEPT");
                objRtn.A1672FREGI = rs01.getString("A1672FREGI");
                objRtn.A1672CHADI = rs01.getString("A2548NMEMO");

                objRtn.A1672COMEN = rs01.getString("A1672COMEN");
                objRtn.A1672CMBPO = rs01.getString("A1672CMBPO");
                objRtn.A1672TKCNX = rs01.getString("A1672CNX1");

                // A2548EMISION
                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;

                lstRtn.add(objRtn);
                // }

                //System.out.println("Aqui entro con Filtro Categoria: " +lstRtn);
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
    }*/

}
