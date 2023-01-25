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
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.utils.TimeFormatToday;
import net.miatech.utils.WorkStation;
import org.apache.log4j.Logger;
import net.miatech.beans.SaleAudit.A3329Filter;

/**
 *
 * @author zperez
 */
public class PendingGroupingFormDAO {

    private IServerSession session;
    private static final Logger logError = Logger.getLogger("errorLog");
    private TimeFormatToday today = new TimeFormatToday();
    private WorkStation workStation = WorkStation.getInstance();

    public PendingGroupingFormDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public PendingGroupingFormDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A3329Filter> searchgrouping(A3329Filter filter) throws SQLException, Exception {
        List<A3329Filter> lstRtn = new ArrayList<A3329Filter>(0);
        A3329Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PXSAUDIT.SQP02384 (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.registerOutParameter(13, Types.INTEGER);
            cstmt01.registerOutParameter(14, Types.INTEGER);
            cstmt01.registerOutParameter(15, Types.INTEGER);
            cstmt01.registerOutParameter(16, Types.INTEGER);

            cstmt01.setString(1, filter.VP_OPCION);
            cstmt01.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(3, filter.VP_DATEFROM);
            cstmt01.setString(4, filter.VP_DATETO);
            cstmt01.setString(5, filter.VP_CHANNEL);
            cstmt01.setString(6, filter.VP_COUNTRY);
            cstmt01.setString(7, filter.VP_STATUS);
            cstmt01.setString(8, filter.VP_USER);
            cstmt01.setString(9, filter.VP_COXPADRE);
            cstmt01.setString(10, filter.VP_IATA);
            cstmt01.setString(11, filter.VP_TKT);
            cstmt01.setString(12, filter.VP_SEQ);

            cstmt01.setInt(13, filter.page.PAGNUM);
            cstmt01.setInt(14, filter.page.PAGROW);
            cstmt01.setInt(15, filter.page.TOTPAG);
            cstmt01.setInt(16, filter.page.TOTROW);

            cstmt01.execute();

            //*System.out.println("Aqui entro con Filtro Categoria: ");
            filter.page.PAGNUM = cstmt01.getInt(13);
            filter.page.PAGROW = cstmt01.getInt(14);
            filter.page.TOTPAG = cstmt01.getInt(15);
            filter.page.TOTROW = cstmt01.getInt(16);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new A3329Filter();
                objRtn.A3329CCUST = rs01.getString("A3329CCUST");
                objRtn.A3329CIA = rs01.getString("A3329CIA");
                objRtn.A3329FORMA = rs01.getString("A3329FORMA");
                objRtn.A3329SERIE = rs01.getString("A3329SERIE");
                objRtn.A3329IATA = rs01.getString("A3329IATA");
                objRtn.A3329NAMEAGEN = rs01.getString("AGENCY");
                objRtn.A3329TRNCU = rs01.getString("A3329TRNCU");
                objRtn.A3329PAIS = rs01.getString("A3329PAIS");
                objRtn.A3329FUETE = rs01.getString("A3329FUETE");
                objRtn.A3329SEQ = rs01.getString("A3329SEQ");
                objRtn.A3329CPN = rs01.getString("A3329CPN");
                objRtn.A3329ARCHI = rs01.getString("A3329ARCHI");
                objRtn.A3329ITINE = rs01.getString("A3329ITINE");
                objRtn.A3329FPROC = rs01.getString("A3329FPROC");
                objRtn.A3329FLAG = rs01.getString("A3329FLAG");
                objRtn.A3329STATU = rs01.getString("A3329STATU");
                objRtn.A3329BEFOR = rs01.getString("A3329BEFOR");
                objRtn.A3329COMEN = rs01.getString("A3329COMEN");
                objRtn.A3329CUR = rs01.getString("A3329CUR");
                objRtn.A3329CORRL = rs01.getString("A3329CORRL");
                objRtn.A3329SSION = rs01.getString("A3329SSION");
                objRtn.A3329CODAG = rs01.getString("A3329CODAG");
                objRtn.A3329CODER = rs01.getString("A3329CODER");
                objRtn.A3329CNXPA = rs01.getString("A3329CNXPA");
                objRtn.A3329FADM = rs01.getString("A3329FADM");
                objRtn.A3329REGIS = rs01.getString("A3329REGIS");
                objRtn.A3329FREGI = rs01.getString("A3329FREGI");
                objRtn.A3329HREGI = rs01.getString("A3329HREGI");
                objRtn.A3329NETO = rs01.getDouble("A3329NETO");
                objRtn.A3329NETRV = rs01.getDouble("A3329NETRV");
                objRtn.A3329TIKET = rs01.getString("A3329CIA") + "" + rs01.getString("A3329FORMA") + "" + rs01.getString("A3329SERIE");
                // A2548EMISION
                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;

                lstRtn.add(objRtn);

                //System.out.println("Aqui entro con Filtro Categoria: " +lstRtn);
            }
        } catch (SQLException e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
        } catch (Exception e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
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

    public String insertLisTracingFile(A3329Filter filter, List<A3329Filter> lstSelectedTkts,String vl_A3329ARCHI) throws SQLException, Exception {
        CallableStatement cs = null;
        ResultSet rst = null;
        String strSQL;
        String STR_RESULT = "";
        session.getCNXIBMDB2().open();
        try {
            String SQLCLL01 = "{CALL PXSAUDIT.SQP02388(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
            cs = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);
            for (A3329Filter obj : lstSelectedTkts) {

                cs.setString(1, session.getUserView().getCustomerInfo().CCUST);
                cs.setString(2, obj.A3329CIA);
                cs.setString(3, obj.A3329FORMA);
                cs.setString(4, obj.A3329SERIE);
                cs.setString(5, obj.A3329SEQ);
                cs.setString(6, obj.A3329CPN);
                cs.setString(7, obj.A3329TRNCU);
                cs.setString(8, obj.A3329CORRL);
                cs.setString(9, vl_A3329ARCHI);
                cs.setString(10, filter.VP_OPCION);
                cs.setString(11, filter.VP_ROUTE);
                cs.setString(12, filter.VP_DESPCRI);

                cs.setString(13, session.getUserView().getUserInfo().USR);
                cs.setString(14, net.miatech.utils.Functions.getFechaActual());
                cs.setString(15, net.miatech.utils.Functions.getHoraActual());

                cs.execute();
            }
            rst = cs.getResultSet();

            while (rst.next()) {
                STR_RESULT = rst.getString("VMESSAGE");
            }
            cs.close();
        } catch (SQLException e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
        } catch (Exception e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
        } finally {
            strSQL = null;
            session.getCNXIBMDB2().close();
        }

        return STR_RESULT;
    }

}
