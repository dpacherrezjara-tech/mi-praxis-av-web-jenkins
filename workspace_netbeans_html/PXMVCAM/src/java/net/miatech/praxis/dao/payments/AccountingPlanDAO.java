/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.dao.payments;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;

import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.payment.A2281;
import net.miatech.praxis.payment.filter.A2280Filter;
import net.miatech.praxis.payment.filter.A2356Filter;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author lmendoza
 */
public class AccountingPlanDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public AccountingPlanDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public AccountingPlanDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }
    
    public List<A2356Filter> loadSQP02848(A2356Filter filter) throws SQLException, Exception {

        List<A2356Filter> lstData = new ArrayList<A2356Filter>(0);
        A2356Filter bean;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP02848(?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(8, Types.INTEGER);
            cstmt.registerOutParameter(9, Types.INTEGER);
            cstmt.registerOutParameter(10, Types.INTEGER);
            cstmt.registerOutParameter(11, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.CODCLIT.trim());
            cstmt.setString(3, filter.SCOUNTRY.trim());
            cstmt.setString(4, filter.CODTRAN.trim());
            cstmt.setString(5, filter.TIPREG.trim());
            cstmt.setString(6, filter.NROPOLIZ.trim());
            cstmt.setString(7, filter.CODEBANK.trim());

            cstmt.setInt(8, filter.page.PAGNUM);
            cstmt.setInt(9, filter.page.PAGROW);
            cstmt.setInt(10, filter.page.TOTPAG);
            cstmt.setInt(11, filter.page.TOTROW);

            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(8);
            filter.page.PAGROW = cstmt.getInt(9);
            filter.page.TOTPAG = cstmt.getInt(10);
            filter.page.TOTROW = cstmt.getInt(11);

            rst = cstmt.getResultSet();

            while (rst.next()) {

                bean = new A2356Filter();
                bean.RN = rst.getInt("RN");

                bean.CODTRAN = rst.getString("CODTRAN").trim();
                bean.DESCRI = rst.getString("DESCRI").trim();
                bean.TIPREG = rst.getString("TIPREG").trim();
                if (rst.getString("TIPREG").trim().equals("C")) {
                    bean.desTIPREG = "Cargo";
                } else {
                    bean.desTIPREG = "Abono";
                }
                bean.CLASE = rst.getString("CLASE").trim();
                if (rst.getString("CLASE").trim().equals("REC")) {
                    bean.strDescripcion1 = "Receivable Accounts(Client Only)";
                } else {
                    bean.strDescripcion1 = "Revenue Accounts";
                }
                bean.CODAGRU = rst.getString("CODAGRU").trim();
                bean.DIRCLIT = rst.getString("DIRCLIT").trim();
                bean.NROPOLIZ = rst.getString("NROPOLIZ").trim();
                bean.CODEBANK = rst.getString("CODEBANK").trim();
                bean.SCURRENCY = rst.getString("SCURRENCY").trim();
                bean.SCOUNTRY = rst.getString("SCOUNTRY").trim();
                bean.CODCLIT = rst.getString("CODCLIT").trim();
                bean.CIACTA = rst.getString("CIACTA").trim();
                bean.UNIDAD = rst.getString("UNIDAD").trim();
                bean.CECOS = rst.getString("CECOS").trim();
                bean.LOCAC = rst.getString("LOCAC").trim();
                bean.CODCTA = rst.getString("CODCTA").trim();
                bean.SUBCTA = rst.getString("SUBCTA").trim();
                bean.EQUIPO = rst.getString("EQUIPO").trim();
                bean.ICIA = rst.getString("ICIA").trim();
                bean.CTACTB = rst.getString("CTACTB").trim();
                bean.Field1 = bean.CIACTA + bean.UNIDAD + bean.CECOS + bean.LOCAC + bean.CODCTA + bean.SUBCTA + bean.EQUIPO + bean.ICIA;

                if (bean.Field1.equals("")) {
                    bean.Field2 = "";
                } else {
                    bean.Field2 = bean.CIACTA + "-" + bean.UNIDAD + "-" + bean.CECOS + "-" + bean.LOCAC + "-" + bean.CODCTA + "-" + bean.SUBCTA + "-" + bean.EQUIPO + "-" + bean.ICIA;
                }
                bean.strDescripcion = "COMPANY CODE - UNITY - COST CENTER - LOCATION - ACCOUNTING ACCOUNT CODE - SUB ACCOUNT CODE - EQUIPMENT - INTER CIA";
                bean.page.PAGNUM = filter.page.PAGNUM;
                bean.page.PAGROW = filter.page.PAGROW;
                bean.page.TOTPAG = filter.page.TOTPAG;
                bean.page.TOTROW = filter.page.TOTROW;
                lstData.add(bean);
            }
            rst.close();

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (rst != null) {
                try {
                    rst.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            if (cstmt != null) {
                try {
                    cstmt.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return lstData;
    }

    public A2356Filter loadSQP02856(A2356Filter filter) throws SQLException, Exception {

        A2356Filter bean = new A2356Filter();
        CallableStatement cstmt01 = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP02856(?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.SCOUNTRY.trim());
            cstmt01.setString(3, filter.CODEBANK.trim());
            cstmt01.setString(4, filter.SCURRENCY.trim());
            cstmt01.setString(5, filter.CODTRAN.trim());
            cstmt01.setString(6, filter.TIPREG.trim());
            cstmt01.setString(7, filter.CODCLIT.trim());

            cstmt01.execute();

            rst = cstmt01.getResultSet();
            if (rst.next()) {
                bean.CCUST = rst.getString("CCUST");
                bean.CODTRAN = rst.getString("CODTRAN").trim();
                bean.DESCRI = rst.getString("DESCRI").trim();
                bean.TIPREG = rst.getString("TIPREG").trim();
                if (rst.getString("TIPREG").trim().equals("C")) {
                    bean.desTIPREG = "Cargo";
                } else {
                    bean.desTIPREG = "Abono";
                }
                bean.CODAGRU = rst.getString("CODAGRU").trim();
                bean.CLASE = rst.getString("CLASE").trim();
                bean.DIRCLIT = rst.getString("DIRCLIT").trim();
                bean.NROPOLIZ = rst.getString("NROPOLIZ").trim();
                bean.CODEBANK = rst.getString("CODEBANK").trim();
                bean.SCURRENCY = rst.getString("SCURRENCY").trim();
                bean.SCOUNTRY = rst.getString("SCOUNTRY").trim();
                bean.DESMLINE = rst.getString("DESMLINE").trim();
                bean.CODCLIT = rst.getString("CODCLIT").trim();
                bean.CIACTA = rst.getString("CIACTA").trim();
                bean.UNIDAD = rst.getString("UNIDAD").trim();
                bean.CECOS = rst.getString("CECOS").trim();
                bean.LOCAC = rst.getString("LOCAC").trim();
                bean.CODCTA = rst.getString("CODCTA").trim();
                bean.SUBCTA = rst.getString("SUBCTA").trim();
                bean.EQUIPO = rst.getString("EQUIPO").trim();
                bean.ICIA = rst.getString("ICIA").trim();
                bean.CTACTB = rst.getString("CTACTB").trim();
                bean.Field1 = bean.CIACTA + bean.UNIDAD + bean.CECOS + bean.LOCAC + bean.CODCTA + bean.SUBCTA + bean.EQUIPO + bean.ICIA;

                if (bean.Field1.equals("")) {
                    bean.Field2 = "";
                } else {
                    bean.Field2 = bean.CIACTA + "-" + bean.UNIDAD + "-" + bean.CECOS + "-" + bean.LOCAC + "-" + bean.CODCTA + "-" + bean.SUBCTA + "-" + bean.EQUIPO + "-" + bean.ICIA;
                }
                bean.USCR = rst.getString("USCR");
                bean.FECR = rst.getString("FECR");
                bean.HOCR = rst.getString("HOCR");
                bean.USUP = rst.getString("USUP");
                bean.FEUP = rst.getString("FEUP");
                bean.HOUP = rst.getString("HOUP");

            }
        } catch (Exception e) {
            // e.getMessage();
            e.printStackTrace();
        } finally {
            if (rst != null) {
                try {
                    rst.close();
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

        return bean;
    }

    public String loadSQP02857(A2356Filter filter, String option) throws SQLException, Exception {
        //REALIZA EL INSERT, UPDATE O DELETE DE UN REGISTRO EN LA TABLA A2280.
        String strMsj = "Operation was successful.";

        CallableStatement cstmt = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP02857_1(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, option);
            cstmt.setString(2, session.getUserView().getCustomerInfo().CCUST.trim());
            cstmt.setString(3, filter.CODTRAN.trim());
            cstmt.setString(4, filter.DESCRI.trim());
            cstmt.setString(5, filter.TIPREG.trim());
            cstmt.setString(6, filter.CODEBANK.trim());
            cstmt.setString(7, filter.SCURRENCY.trim());
            cstmt.setString(8, filter.SCOUNTRY.trim());
            cstmt.setString(9, filter.CODCLIT.trim());
            cstmt.setString(10, filter.CIACTA.trim());
            cstmt.setString(11, filter.UNIDAD.trim());
            cstmt.setString(12, filter.CECOS.trim());
            cstmt.setString(13, filter.LOCAC.trim());
            cstmt.setString(14, filter.CODCTA.trim());
            cstmt.setString(15, filter.SUBCTA.trim());
            cstmt.setString(16, filter.EQUIPO.trim());
            cstmt.setString(17, filter.ICIA.trim());
            cstmt.setString(18, filter.CTACTB.trim());
            cstmt.setString(19, filter.NROPOLIZ.trim());
            cstmt.setString(20, filter.CLASE.trim());
            cstmt.setString(21, filter.DIRCLIT.trim());
            cstmt.setString(22, filter.CODAGRU.trim());
            cstmt.setString(23, filter.DESMLINE.trim());
            cstmt.setString(24, session.getUserView().getUserInfo().USR);
            cstmt.setString(25, Functions.getFechaActual());
            cstmt.setString(26, Functions.getHoraActual());
            cstmt.execute();

        } catch (Exception e) {
            //e.printStackTrace();
            strMsj = e.getMessage();
        } finally {
            if (cstmt != null) {
                try {
                    cstmt.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
        if (strMsj.toLowerCase().contains("duplicada")) {
            strMsj = "Error: Duplicated record.";
        }

        return strMsj;

    }

    
}
