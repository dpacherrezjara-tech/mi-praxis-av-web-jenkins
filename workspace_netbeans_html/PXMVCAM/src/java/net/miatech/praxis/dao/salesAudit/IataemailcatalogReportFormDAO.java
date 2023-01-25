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
import net.miatech.beans.SaleAudit.A3948Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.utils.Functions;
import net.miatech.utils.TimeFormatToday;
import net.miatech.utils.WorkStation;
import org.apache.log4j.Logger;

/**
 *
 * @author zperez
 */
public class IataemailcatalogReportFormDAO {

    private IServerSession session;
    private static final Logger logError = Logger.getLogger("errorLog");
    private TimeFormatToday today = new TimeFormatToday();
    private WorkStation workStation = WorkStation.getInstance();

    public IataemailcatalogReportFormDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public IataemailcatalogReportFormDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A3948Filter> search(A3948Filter filter) throws SQLException, Exception {
        List<A3948Filter> lstRtn = new ArrayList<A3948Filter>(0);
        A3948Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PXSAUDIT.SQP03856(?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.registerOutParameter(5, Types.INTEGER);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_COUNTRY);
            cstmt01.setString(3, filter.IN_ZONE);
            cstmt01.setString(4, filter.IN_STATUS);

            cstmt01.setInt(5, filter.page.PAGNUM);
            cstmt01.setInt(6, filter.page.PAGROW);
            cstmt01.setInt(7, filter.page.TOTPAG);
            cstmt01.setInt(8, filter.page.TOTROW);

            cstmt01.execute();

            //*System.out.println("Aqui entro con Filtro Categoria: ");
            filter.page.PAGNUM = cstmt01.getInt(5);
            filter.page.PAGROW = cstmt01.getInt(6);
            filter.page.TOTPAG = cstmt01.getInt(7);
            filter.page.TOTROW = cstmt01.getInt(8);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new A3948Filter();
                objRtn.A3948CCUST = rs01.getString("A3948CCUST");
                objRtn.A3948PAIS = rs01.getString("A3948PAIS");
                objRtn.A3948CORRL = rs01.getString("A3948CORRL");
                objRtn.A3948ZONA = rs01.getString("A3948ZONA");
                objRtn.A3948GSA = rs01.getString("A3948GSA");
                objRtn.A3948RESPO = rs01.getString("A3948RESPO");
                objRtn.A3948AGETE = rs01.getString("A3948AGETE");
                objRtn.A3948FLAG = rs01.getString("A3948FLAG");
                objRtn.A3948DESPAIS = rs01.getString("A3948DESPAIS");
                objRtn.A3948CORER = rs01.getString("A3948CORER");
                objRtn.A3948COREG = rs01.getString("A3948COREG");
                objRtn.A3948REGIS = rs01.getString("A3948REGIS");
                objRtn.A3948FREGI = rs01.getString("A3948FREGI");
                objRtn.A3948HREGI = rs01.getString("A3948HREGI");
                objRtn.A3948REVIS = rs01.getString("A3948REVIS");
                objRtn.A3948FREVI = rs01.getString("A3948FREVI");
                objRtn.A3948HREVI = rs01.getString("A3948HREVI");

                objRtn.A3948BILLI = rs01.getString("A3948BILLI");
                objRtn.A3948DAILY = rs01.getString("A3948DAILY");
                objRtn.A3948CSETT = rs01.getString("A3948CSETT");
                objRtn.A3948OPERA = rs01.getString("A3948OPERA");
                objRtn.A3948AGENC = rs01.getString("A3948AGENC");
                objRtn.A3948COMPA = rs01.getString("A3948COMPA");
                objRtn.A3948NCOMP = rs01.getString("A3948NCOMP");
                        

                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;

                lstRtn.add(objRtn);

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
    }

    public String mantenimiento(A3948Filter filter) throws SQLException, Exception {
        CallableStatement cs = null;
        ResultSet rst = null;
        String strSQL;
        String STR_RESULT = "";

        session.getCNXIBMDB2().open();
        try {
            String SQLCLL01 = "{CALL PXSAUDIT.SQP03857(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
            cs = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);
            cs.setString("IN_CCUST", session.getUserView().getCustomerInfo().CCUST);
            cs.setString("IN_OPCION", filter.IN_OPTION);
            cs.setString("IN_A3948PAIS", filter.A3948PAIS);
            cs.setString("IN_A3948CORRL", filter.A3948CORRL);
            cs.setString("IN_A3948ZONA", filter.A3948ZONA);
            cs.setString("IN_A3948GSA", filter.A3948GSA);
            cs.setString("IN_A3948RESPO", filter.A3948RESPO);
            cs.setString("IN_A3948AGETE", filter.A3948AGETE);
            cs.setString("IN_A3948FLAG", filter.A3948FLAG);
            cs.setString("IN_A3948CORER", filter.A3948CORER);
            cs.setString("IN_A3948COREG", filter.A3948COREG);

            cs.setString("IN_A3948BILLI", filter.A3948BILLI);
            cs.setString("IN_A3948DAILY", filter.A3948DAILY);
            cs.setString("IN_A3948CSETT", filter.A3948CSETT);
            cs.setString("IN_A3948OPERA", filter.A3948OPERA);
            cs.setString("IN_A3948AGENC", filter.A3948AGENC);
            cs.setString("IN_A3948COMPA", filter.A3948COMPA);
            cs.setString("IN_A3948NCOMP", filter.A3948NCOMP);
            

            cs.setString("IN_REGIS", session.getUserView().getUserInfo().USR);
            cs.setString("IN_FREGI", Functions.getFechaActual());
            cs.setString("IN_HREGI", Functions.getHoraActual());
            cs.execute();
            rst = cs.getResultSet();

            while (rst.next()) {
                STR_RESULT = rst.getString("VMESSAGE");
            }
            cs.close();
        } catch (SQLException e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            STR_RESULT = e.getMessage();
        } catch (Exception e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            STR_RESULT = e.getMessage();
        } finally {
            strSQL = null;
            session.getCNXIBMDB2().close();
        }

        return STR_RESULT;
    }

}
