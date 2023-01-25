package net.miatech.praxis.dao.payments;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.payment.A4171;
import net.miatech.praxis.payment.filter.A4171Filter;
import net.miatech.praxis.payment.filter.A4172Filter;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

public class EmailsDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public EmailsDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public EmailsDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A4172Filter> loadPX601SQP04566(A4172Filter filter) throws SQLException, Exception {

        List<A4172Filter> lstData = new ArrayList<A4172Filter>(0);
        A4172Filter bean;

        HashMap<String, String> hmDescEstados = new HashMap<String, String>();
        hmDescEstados.put("", "");
        hmDescEstados.put("S", "Sales");
        hmDescEstados.put("R", "RFND");
        hmDescEstados.put("A", "Adjustment");
        hmDescEstados.put("N", "ADM/NOTA CARGO");

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04566(?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(2, Types.INTEGER);
            cstmt.registerOutParameter(3, Types.INTEGER);
            cstmt.registerOutParameter(4, Types.INTEGER);
            cstmt.registerOutParameter(5, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setInt(2, filter.page.PAGNUM);
            cstmt.setInt(3, filter.page.PAGROW);
            cstmt.setInt(4, filter.page.TOTPAG);
            cstmt.setInt(5, filter.page.TOTROW);

            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(2);
            filter.page.PAGROW = cstmt.getInt(3);
            filter.page.TOTPAG = cstmt.getInt(4);
            filter.page.TOTROW = cstmt.getInt(5);

            rst = cstmt.getResultSet();
            while (rst.next()) {
                bean = new A4172Filter();

                bean.CODIGO = rst.getString("CODIGO").trim();

                bean.CBANK = rst.getString("CBANK").trim();
                bean.descCBANK = rst.getString("CBANK").trim();

                bean.SCARCOD = rst.getString("SCARCOD").trim();
                bean.descSCARCOD = rst.getString("SCARCOD").trim();

                bean.FTE = rst.getString("FTE").trim();
                bean.DESCR = rst.getString("DESCR").trim();
                
                bean.ZONA = rst.getString("ZONA").trim();
                bean.SCOUNTRY = rst.getString("SCOUNTRY").trim();

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

    public A4172Filter loadPX601SQP04567(A4172Filter filter) throws SQLException, Exception {

        A4172Filter beanTkt = new A4172Filter();
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04567(?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.CODIGO.trim());

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                beanTkt.CCUST = rs01.getString("CCUST");
                beanTkt.CODIGO = rs01.getString("CODIGO").trim();

                beanTkt.CBANK = rs01.getString("CBANK").trim();
                beanTkt.descCBANK = rs01.getString("CBANK").trim();

                beanTkt.SCARCOD = rs01.getString("SCARCOD").trim();
                beanTkt.descSCARCOD = rs01.getString("SCARCOD").trim();

                beanTkt.FTE = rs01.getString("FTE").trim();
                beanTkt.DESCR = rs01.getString("DESCR").trim();
                
                beanTkt.ZONA = rs01.getString("ZONA").trim();
                beanTkt.SCOUNTRY = rs01.getString("SCOUNTRY").trim();

                beanTkt.USCR = rs01.getString("USCR").trim();
                beanTkt.FECR = rs01.getString("FECR").trim();
                beanTkt.HOCR = rs01.getString("HOCR").trim();

                beanTkt.USUP = rs01.getString("USUP").trim();
                beanTkt.FEUP = rs01.getString("FEUP").trim();
                beanTkt.HOUP = rs01.getString("HOUP").trim();

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

    public String loadPX601SQP04568(A4172Filter filter, String option) throws SQLException, Exception {
        String strMsj = "Operation was successful.";
        List<A4171> lstDetalle = filter.lstDetalle;
        A4171 beanDet;
        
        CallableStatement cstmt = null;
        PreparedStatement pstmt = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04568(?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, option);
            cstmt.setString(2, session.getUserView().getCustomerInfo().CCUST.trim());
            cstmt.setString(3, filter.CODIGO.trim());
            cstmt.setString(4, filter.CBANK.trim());
            cstmt.setString(5, filter.SCARCOD.trim());
            cstmt.setString(6, filter.FTE.trim());
            cstmt.setString(7, filter.DESCR.trim());
            cstmt.setString(8, filter.ZONA.trim());
            cstmt.setString(9, filter.SCOUNTRY.trim());

            cstmt.setString(10, session.getUserView().getUserInfo().USR);
            cstmt.setString(11, Functions.getFechaActual());
            cstmt.setString(12, Functions.getHoraActual());

            cstmt.execute();
            
            String SQL_DELETE = "DELETE FROM LIBSAP12.A4171 WHERE CODIGO = ?";
            (pstmt = cnx.prepareStatement(SQL_DELETE)).setString(1, filter.CODIGO.trim());
            pstmt.execute();

            if (lstDetalle != null && lstDetalle.size() > 0 && !option.equals("D")) {
                String SQLCLL02 = "{CALL " + session.getMainLibrary() + ".SQP04616(?,?,?)}";
                cstmt = cnx.prepareCall(SQLCLL02);
                for (int i = 0; i < lstDetalle.size(); i++) {
                    beanDet = lstDetalle.get(i);
                    
                    cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST.trim());
                    cstmt.setString(2, filter.CODIGO.trim());
                    cstmt.setString(3, beanDet.EMAIL.trim());
                    
                    cstmt.execute();
                }
            }

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

    public List<A4171Filter> loadPX601SQP04547(String CODIGO) throws SQLException, Exception {

        List<A4171Filter> lstData = new ArrayList<A4171Filter>(0);
        A4171Filter bean;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04547(?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, CODIGO.trim());

            cstmt.execute();

            rst = cstmt.getResultSet();
            while (rst.next()) {
                bean = new A4171Filter();
                bean.EMAIL = rst.getString("EMAIL").trim();

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
}
