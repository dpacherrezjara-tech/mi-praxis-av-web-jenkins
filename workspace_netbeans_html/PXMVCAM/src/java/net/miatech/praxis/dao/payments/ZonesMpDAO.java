package net.miatech.praxis.dao.payments;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.payment.filter.A4170Filter;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

public class ZonesMpDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public ZonesMpDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public ZonesMpDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A4170Filter> loadPX600SQP04543(A4170Filter filter) throws SQLException, Exception {

        List<A4170Filter> lstData = new ArrayList<A4170Filter>(0);
        A4170Filter bean;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04543(?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(5, Types.INTEGER);
            cstmt.registerOutParameter(6, Types.INTEGER);
            cstmt.registerOutParameter(7, Types.INTEGER);
            cstmt.registerOutParameter(8, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_PAIS.trim());
            cstmt.setString(3, filter.IN_ZONA.trim());
            cstmt.setString(4, filter.IN_INSUMP.trim());
            cstmt.setInt(5, filter.page.PAGNUM);
            cstmt.setInt(6, filter.page.PAGROW);
            cstmt.setInt(7, filter.page.TOTPAG);
            cstmt.setInt(8, filter.page.TOTROW);

            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(5);
            filter.page.PAGROW = cstmt.getInt(6);
            filter.page.TOTPAG = cstmt.getInt(7);
            filter.page.TOTROW = cstmt.getInt(8);

            rst = cstmt.getResultSet();
            while (rst.next()) {
                bean = new A4170Filter();

                bean.ZONA = rst.getString("ZONA").trim();
                bean.PAIS = rst.getString("PAIS").trim();
                bean.DESCR_PAIS = rst.getString("DESCR_PAIS").trim();
                bean.INSUMP = rst.getString("INSUMP").trim();
                bean.DESCRE = rst.getString("DESCRE").trim();

                bean.USCR = rst.getString("USCR").trim();
                bean.FECR = rst.getString("FECR").trim();
                bean.HOCR = rst.getString("HOCR").trim();
                bean.PGMCR = rst.getString("PGMCR").trim();
                bean.USUP = rst.getString("USUP").trim();
                bean.FEUP = rst.getString("FEUP").trim();
                bean.HOUP = rst.getString("HOUP").trim();
                bean.PGMUP = rst.getString("PGMUP").trim();

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

    public A4170Filter loadPX600SQP04544(A4170Filter filter) throws SQLException, Exception {

        A4170Filter beanTkt = new A4170Filter();
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04544(?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.PAIS.trim());
            cstmt01.setString(3, filter.ZONA.trim());
            cstmt01.setString(4, filter.INSUMP.trim());

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                beanTkt.ZONA = rs01.getString("ZONA").trim();
                beanTkt.PAIS = rs01.getString("PAIS").trim();
                beanTkt.DESCR_PAIS = rs01.getString("DESCR_PAIS").trim();
                beanTkt.INSUMP = rs01.getString("INSUMP").trim();
                beanTkt.DESCRE = rs01.getString("DESCRE").trim();

                beanTkt.USCR = rs01.getString("USCR").trim();
                beanTkt.FECR = rs01.getString("FECR").trim();
                beanTkt.HOCR = rs01.getString("HOCR").trim();
                beanTkt.PGMCR = rs01.getString("PGMCR").trim();
                beanTkt.USUP = rs01.getString("USUP").trim();
                beanTkt.FEUP = rs01.getString("FEUP").trim();
                beanTkt.HOUP = rs01.getString("HOUP").trim();
                beanTkt.PGMUP = rs01.getString("PGMUP").trim();

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

        return beanTkt;
    }

    public String loadPX600SQP04545(A4170Filter filter, String option) throws SQLException, Exception {
        String strMsj = "Operation was successful.";

        CallableStatement cstmt = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04545(?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, option);
            cstmt.setString(2, session.getUserView().getCustomerInfo().CCUST.trim());
            cstmt.setString(3, filter.ZONA.trim());
            cstmt.setString(4, filter.PAIS.trim());
            cstmt.setString(5, filter.INSUMP.trim());
            cstmt.setString(6, filter.DESCRE.trim());
            
            cstmt.setString(7, filter.IN_ZONA.trim());
            cstmt.setString(8, filter.IN_PAIS.trim());
            cstmt.setString(9, filter.IN_INSUMP.trim());

            cstmt.setString(10, session.getUserView().getUserInfo().USR);
            cstmt.setString(11, Functions.getFechaActual());
            cstmt.setString(12, Functions.getHoraActual());

            cstmt.execute();

        } catch (Exception e) {
            e.printStackTrace();
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

        return strMsj;

    }

    //PARA FILTRO DE PAIS
    public List<A4170Filter> loadPX600SQP04544_1(A4170Filter filter) throws SQLException, Exception {

        List<A4170Filter> lstTkts = new ArrayList<A4170Filter>(0);
        A4170Filter beanTkt;

        A4170Filter objRtn;
        objRtn = new A4170Filter();
        objRtn.CODE = "";
        objRtn.NAME = "All";
        lstTkts.add(objRtn);

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04544(?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.execute();

            rst = cstmt.getResultSet();

            while (rst.next()) {

                beanTkt = new A4170Filter();

                beanTkt.CODE = rst.getString("CODE").trim();
                beanTkt.NAME = rst.getString("NAME").trim();
                lstTkts.add(beanTkt);
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

        return lstTkts;
    }
}
