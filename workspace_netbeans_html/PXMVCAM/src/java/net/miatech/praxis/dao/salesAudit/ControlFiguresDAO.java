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
import net.miatech.beans.SaleAudit.SQP00874Filter;
import net.miatech.beans.SaleAudit.SQP00942Filter;

import net.miatech.beans.spring.implement.IServerSession;
import org.apache.log4j.Logger;

/**
 *
 * @author lmendoza
 */
public class ControlFiguresDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public ControlFiguresDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public ControlFiguresDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<SQP00942Filter> Search(SQP00942Filter filter) throws SQLException, Exception {
        List<SQP00942Filter> lstRtn = new ArrayList<>(0);
        SQP00942Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PXSAUDIT.SQP00942XX(?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);
            cstmt01.registerOutParameter(9, Types.INTEGER);

            cstmt01.setString(1, filter.OPCIONTYPE);
            cstmt01.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(3, filter.DATEFROM);
            cstmt01.setString(4, filter.DATETO);
            cstmt01.setString(5, filter.CIA);

            cstmt01.setInt(6, filter.page.PAGNUM);
            cstmt01.setInt(7, filter.page.PAGROW);
            cstmt01.setInt(8, filter.page.TOTPAG);
            cstmt01.setInt(9, filter.page.TOTROW);

            cstmt01.execute();

            //*System.out.println("Aqui entro con Filtro Categoria: ");
            filter.page.PAGNUM = cstmt01.getInt(6);
            filter.page.PAGROW = cstmt01.getInt(7);
            filter.page.TOTPAG = cstmt01.getInt(8);
            filter.page.TOTROW = cstmt01.getInt(9);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {

                objRtn = new SQP00942Filter();

                objRtn.FECPRO = rs01.getString("FECPRO");
                objRtn.QTYPXCM = rs01.getInt("QTYPXCM");
                objRtn.QTYPXFA = rs01.getInt("QTYPXFA");
                objRtn.QTYPXSC = rs01.getInt("QTYPXSC");
                objRtn.QTYPXTX = rs01.getInt("QTYPXTX");
                objRtn.QTYSAFAPR = rs01.getInt("QTYSAFAPR");
                objRtn.QTYSAFAVO = rs01.getInt("QTYSAFAVO");
                objRtn.QTYSAFAEX = rs01.getInt("QTYSAFAEX");
                objRtn.QTYSATX = rs01.getInt("QTYSATX");
                objRtn.QTYSACM = rs01.getInt("QTYSACM");
                objRtn.QTYSASC = rs01.getInt("QTYSASC");
                objRtn.DIFFARE = rs01.getInt("DIFFARE");
                objRtn.DIFTAX = rs01.getInt("DIFTAX");
                objRtn.DIFCOMM = rs01.getInt("DIFCOMM");
                objRtn.DIFTAXC = rs01.getInt("DIFTAXC");
                objRtn.FECSYS = rs01.getString("FECSYS");
                objRtn.FLAGF = rs01.getString("STATUSF");
                objRtn.FLAGD = rs01.getString("STATUSD");
                objRtn.QTYSAMEMO = rs01.getInt("QTYSAMEMO");
                objRtn.DESCR = rs01.getString("DESCR");

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

    public SQP00874Filter executeLoad(SQP00874Filter filter) throws SQLException, Exception {
        CallableStatement cs = null;
        ResultSet rst = null;
        SQP00874Filter beanOra = null;
        SQP00874Filter listaData = new SQP00874Filter();

        session.getCNXIBMDB2().open();
        try {
            String SQLCLL01 = "{CALL PXSAUDIT.SQP01161(?,?)}";
            cs = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);

            cs.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cs.setString(2, filter.VP_DATEFROM);

            cs.execute();

            rst = cs.getResultSet();

            while (rst.next()) {
                beanOra = new SQP00874Filter();

                beanOra.VP_STATUS = rst.getString("RESULT");

                // listaData.add(beanOra);
            }
            cs.close();
        } catch (SQLException e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
        } catch (Exception e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
        } finally {
            session.getCNXIBMDB2().close();
        }

        return beanOra;
    }
}
