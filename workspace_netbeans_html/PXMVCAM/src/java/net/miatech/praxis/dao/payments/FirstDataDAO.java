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
import net.miatech.praxis.payment.filter.A2338Filter;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author ctarazona
 */
public class FirstDataDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public FirstDataDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public FirstDataDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A2338Filter> loadPX554SQP03911(A2338Filter filter) throws SQLException, Exception {

        List<A2338Filter> lst = new ArrayList<A2338Filter>(0);
        A2338Filter bean;
        double TOT_IMPORTOT = 0.0, TOT_IMPORSDE = 0.0, TOT_IMPARANC = 0.0, TOT_IVAARANC = 0.0, TOT_IMPORTCF = 0.0, TOT_IVACFINA = 0.0;
        double TOT_IMPCTASD = 0.0;
        double TOT_IVACTASD = 0.0;
        double TOT_TOTDESC = 0.0;
        double TOT_NETO = 0.0;
        double TOT_IMPORFIN = 0.0;

        CallableStatement cstmt = null;
        ResultSet rst = null;
        Connection cnx = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP03911_1(?,?,?,?,?,?,?,?,?,?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(9, Types.INTEGER);
            cstmt.registerOutParameter(10, Types.INTEGER);
            cstmt.registerOutParameter(11, Types.INTEGER);
            cstmt.registerOutParameter(12, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_TIPOFEC);
            cstmt.setString(3, filter.IN_DATE);
            cstmt.setString(4, filter.IN_MERCHNP);
            cstmt.setString(5, filter.IN_SCURRENCY);
            cstmt.setString(6, filter.IN_CARDN1);
            cstmt.setString(7, filter.IN_CARDN2);
            cstmt.setString(8, filter.IN_NUMLIQUI);

            cstmt.setInt(9, filter.page.PAGNUM);
            cstmt.setInt(10, filter.page.PAGROW);
            cstmt.setInt(11, filter.page.TOTPAG);
            cstmt.setInt(12, filter.page.TOTROW);

            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(9);
            filter.page.PAGROW = cstmt.getInt(10);
            filter.page.TOTPAG = cstmt.getInt(11);
            filter.page.TOTROW = cstmt.getInt(12);

            rst = cstmt.getResultSet();

            while (rst.next()) {
                TOT_IMPORTOT = rst.getDouble("TOT_IMPORTOT");
                TOT_IMPORSDE = rst.getDouble("TOT_IMPORSDE");
                TOT_IMPARANC = rst.getDouble("TOT_IMPARANC");
                TOT_IVAARANC = rst.getDouble("TOT_IVAARANC");
                TOT_IMPORTCF = rst.getDouble("TOT_IMPORTCF");
                TOT_IVACFINA = rst.getDouble("TOT_IVACFINA");
                TOT_IMPCTASD = rst.getDouble("TOT_IMPCTASD");
                TOT_IVACTASD = rst.getDouble("TOT_IVACTASD");
                TOT_TOTDESC = rst.getDouble("TOT_TOTDESC");
                TOT_NETO = rst.getDouble("TOT_NETO");
                TOT_IMPORFIN = rst.getDouble("TOT_IMPORFIN");

            }
            rst.close();
            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {
                    bean = new A2338Filter();
                    bean.RN = rst.getLong("RN");

                    bean.TIPOFEC = rst.getString(filter.IN_TIPOFEC).trim();
                    bean.strFormatDate = filter.strFormatDate;
                    bean.MERCHNP = rst.getString("MERCHNP").trim();
                    bean.NUMLIQUI = rst.getString("NUMLIQUI").trim();
                    bean.SCURRENCY = rst.getString("SCURRENCY").trim();
                    bean.IMPORTOT = rst.getDouble("IMPORTOT");
                    bean.IMPORSDE = rst.getDouble("IMPORSDE");
                    bean.PORDESCU = rst.getDouble("PORDESCU");
                    bean.IMPARANC = rst.getDouble("IMPARANC");
                    bean.IVAARANC = rst.getDouble("IVAARANC");
                    bean.IMPORTCF = rst.getDouble("IMPORTCF");

                    bean.IVACFINA = rst.getDouble("IVACFINA");
                    bean.IMPCTASD = rst.getDouble("IMPCTASD");
                    bean.IVACTASD = rst.getDouble("IVACTASD");
                    bean.TOTDESC = rst.getDouble("TOTDESC");
                    bean.NETO = rst.getDouble("NETO");
                    //bean.SDATE = rst.getString("SDATE");
                    bean.STPAGO = rst.getString("STPAGO");
                    bean.IN_TIPOFEC = filter.IN_TIPOFEC;

                    if (rst.getString("STVAL").trim().equals("1")) {
                        bean.STVAL = "MATCH";
                    } else {
                        bean.STVAL = "NO MATCH";
                    }

                    if (rst.getString("FTE").trim().equals("S")) {
                        bean.FTE = "ASR";
                    } else if (rst.getString("FTE").trim().equals("B")) {
                        bean.FTE = "BSP";
                    } else if (rst.getString("FTE").trim().equals("A")) {
                        bean.FTE = "ARC";
                    } else {
                        bean.FTE = rst.getString("FTE").trim();
                    }

                    bean.TOT_IMPORTOT = TOT_IMPORTOT;
                    bean.TOT_IMPORSDE = TOT_IMPORSDE;
                    bean.TOT_IMPORFIN = TOT_IMPORFIN;
                    bean.TOT_IMPARANC = TOT_IMPARANC;
                    bean.TOT_IVAARANC = TOT_IVAARANC;
                    bean.TOT_IMPORTCF = TOT_IMPORTCF;
                    bean.TOT_IVACFINA = TOT_IVACFINA;
                    bean.TOT_IMPCTASD = TOT_IMPCTASD;
                    bean.TOT_IVACTASD = TOT_IVACTASD;
                    bean.TOT_TOTDESC = TOT_TOTDESC;
                    bean.TOT_NETO = TOT_NETO;

                    bean.page.PAGNUM = filter.page.PAGNUM;
                    bean.page.PAGROW = filter.page.PAGROW;
                    bean.page.TOTPAG = filter.page.TOTPAG;
                    bean.page.TOTROW = filter.page.TOTROW;

                    lst.add(bean);
                }
            }
        } catch (Exception e) {
            e.getMessage();
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

        return lst;
    }

    public List<A2338Filter> loadPX554SQP03911_TV(A2338Filter filter) throws SQLException, Exception {

        List<A2338Filter> lst = new ArrayList<A2338Filter>(0);
        A2338Filter bean;
        double TOT_IMPORTOT = 0.0, TOT_IMPORSDE = 0.0, TOT_IMPARANC = 0.0, TOT_IVAARANC = 0.0, TOT_IMPORTCF = 0.0, TOT_IVACFINA = 0.0;
        double TOT_IMPCTASD = 0.0;
        double TOT_IVACTASD = 0.0;
        double TOT_TOTDESC = 0.0;
        double TOT_NETO = 0.0;
        double TOT_IMPORFIN = 0.0;
        double TOT_AIMPARAN = 0.00;
        double TOT_AIVAARAN = 0.00;
        double TOT_AIMPORCF = 0.00;
        double TOT_AIVACFIN = 0.00;

        CallableStatement cstmt = null;
        ResultSet rst = null;
        Connection cnx = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP03911_TV(?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(10, Types.INTEGER);
            cstmt.registerOutParameter(11, Types.INTEGER);
            cstmt.registerOutParameter(12, Types.INTEGER);
            cstmt.registerOutParameter(13, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_NUMLIQUI);
            cstmt.setString(3, filter.IN_SCURRENCY);
            cstmt.setString(4, filter.IN_TIPOFEC);
            cstmt.setString(5, filter.IN_DATE);
            cstmt.setString(6, filter.IN_MERCHNP);
            cstmt.setString(7, filter.IN_CARDN1.trim());
            cstmt.setString(8, filter.IN_CARDN2.trim());
            cstmt.setString(9, filter.IN_SDATE.trim());
            cstmt.setInt(10, filter.page.PAGNUM);
            cstmt.setInt(11, filter.page.PAGROW);
            cstmt.setInt(12, filter.page.TOTPAG);
            cstmt.setInt(13, filter.page.TOTROW);

            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(10);
            filter.page.PAGROW = cstmt.getInt(11);
            filter.page.TOTPAG = cstmt.getInt(12);
            filter.page.TOTROW = cstmt.getInt(13);

            rst = cstmt.getResultSet();

            while (rst.next()) {
                TOT_IMPORTOT = rst.getDouble("TOT_IMPORTOT");
                TOT_IMPORSDE = rst.getDouble("TOT_IMPORSDE");
                TOT_IMPARANC = rst.getDouble("TOT_IMPARANC");
                TOT_IVAARANC = rst.getDouble("TOT_IVAARANC");
                TOT_IMPORTCF = rst.getDouble("TOT_IMPORTCF");
                TOT_IVACFINA = rst.getDouble("TOT_IVACFINA");
                TOT_IMPCTASD = rst.getDouble("TOT_IMPCTASD");
                TOT_IVACTASD = rst.getDouble("TOT_IVACTASD");
                TOT_TOTDESC = rst.getDouble("TOT_TOTDESC");
                TOT_NETO = rst.getDouble("TOT_NETO");
                TOT_IMPORFIN = rst.getDouble("TOT_IMPORFIN");
                TOT_AIMPARAN = rst.getDouble("TOT_AIMPARAN");
                TOT_AIVAARAN = rst.getDouble("TOT_AIVAARAN");
                TOT_AIMPORCF = rst.getDouble("TOT_AIMPORCF");
                TOT_AIVACFIN = rst.getDouble("TOT_AIVACFIN");               

            }
            rst.close();
            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {
                    bean = new A2338Filter();
                    bean.RN = rst.getLong("RN");
                    bean.IN_FECHA_FROM = filter.IN_FECHA_FROM.trim();
                    bean.IN_FECHA_TO = filter.IN_FECHA_TO.trim();

                    bean.TIPOFEC = rst.getString(filter.IN_TIPOFEC).trim();
                    bean.MERCHNP = rst.getString("MERCHNP").trim();
                    bean.FVCLEAR = rst.getString("FVCLEAR").trim();
                    bean.NUMLIQUI = rst.getString("NUMLIQUI").trim();
                    bean.SCURRENCY = rst.getString("SCURRENCY").trim();
                    bean.SCARDN = rst.getString("SCARDN").trim();
                    bean.SAUTHOC = rst.getString("SAUTHOC").trim();
                    bean.CUOPLAN = rst.getString("CUOPLAN").trim();
                    bean.TPLAZOPA = rst.getString("TPLAZOPA").trim();
                    bean.PLAZOPAG = rst.getInt("PLAZOPAG");
                    bean.IMPORTOT = rst.getDouble("IMPORTOT");
                    bean.IMPORSDE = rst.getDouble("IMPORSDE");
                    bean.PORDESCU = rst.getDouble("PORDESCU");
                    bean.IMPARANC = rst.getDouble("IMPARANC");
                    bean.IVAARANC = rst.getDouble("IVAARANC");
                    bean.IMPORTCF = rst.getDouble("IMPORTCF");
                    bean.DESC_MERCHANT = rst.getString("DESC_MERCHANT");
                    //bean.SDATE = rst.getString("SDATE");
                    bean.STPAGO = rst.getString("STPAGO");

                    bean.IVACFINA = rst.getDouble("IVACFINA");
                    bean.IMPCTASD = rst.getDouble("IMPCTASD");
                    bean.IVACTASD = rst.getDouble("IVACTASD");
                    bean.TOTDESC = rst.getDouble("TOTDESC");
                    bean.NETO = rst.getDouble("NETO");
                    bean.IN_TIPOFEC = filter.IN_TIPOFEC;

                    if (rst.getString("STVAL").trim().equals("1")) {
                        bean.STVAL = "MATCH";
                    } else {
                        bean.STVAL = "NO MATCH";
                    }

                    if (rst.getString("FTE").trim().equals("S")) {
                        bean.FTE = "ASR";
                    } else if (rst.getString("FTE").trim().equals("B")) {
                        bean.FTE = "BSP";
                    } else if (rst.getString("FTE").trim().equals("A")) {
                        bean.FTE = "ARC";
                    } else {
                        bean.FTE = rst.getString("FTE").trim();
                    }
                    
                    if (rst.getString("TPLAZOPA").trim().equals("C")) {
                        bean.TPLAZOPA = "Corridos";
                    } else if (rst.getString("TPLAZOPA").trim().equals("H")) {
                        bean.TPLAZOPA = "Hábiles";
                    } else if (rst.getString("TPLAZOPA").trim().equals("U")) {
                        bean.TPLAZOPA = "Unificados";
                    } else {
                        bean.TPLAZOPA = rst.getString("TPLAZOPA").trim();
                    }
                                                           
                    //Status de auditoria
                    bean.STIMPARA = rst.getString("STIMPARA").trim();
                    bean.STIVAARA = rst.getString("STIVAARA").trim();
                    bean.STIMPOCF = rst.getString("STIMPOCF").trim();
                    bean.STIVACFI = rst.getString("STIVACFI").trim();
                    bean.STFECPAG = rst.getString("STFECPAG").trim();
                    //Campos calculados de auditoria
                    bean.AIMPARAN = rst.getDouble("AIMPARAN");
                    bean.AIVAARAN = rst.getDouble("AIVAARAN");
                    bean.AIMPORCF = rst.getDouble("AIMPORCF");
                    bean.AIVACFIN = rst.getDouble("AIVACFIN");
                    bean.APLAZOPA = rst.getInt("APLAZOPA");

                    bean.TOT_IMPORTOT = TOT_IMPORTOT;
                    bean.TOT_IMPORSDE = TOT_IMPORSDE;
                    bean.TOT_IMPORFIN = TOT_IMPORFIN;
                    bean.TOT_IMPARANC = TOT_IMPARANC;
                    bean.TOT_IVAARANC = TOT_IVAARANC;
                    bean.TOT_IMPORTCF = TOT_IMPORTCF;
                    bean.TOT_IVACFINA = TOT_IVACFINA;
                    bean.TOT_IMPCTASD = TOT_IMPCTASD;
                    bean.TOT_IVACTASD = TOT_IVACTASD;
                    bean.TOT_TOTDESC = TOT_TOTDESC;
                    bean.TOT_NETO = TOT_NETO;
                    bean.TOT_AIMPARAN = TOT_AIMPARAN;
                    bean.TOT_AIVAARAN = TOT_AIVAARAN;
                    bean.TOT_AIMPORCF = TOT_AIMPORCF;
                    bean.TOT_AIVACFIN = TOT_AIVACFIN;

                    bean.page.PAGNUM = filter.page.PAGNUM;
                    bean.page.PAGROW = filter.page.PAGROW;
                    bean.page.TOTPAG = filter.page.TOTPAG;
                    bean.page.TOTROW = filter.page.TOTROW;

                    lst.add(bean);
                }
            }
        } catch (Exception e) {
            e.getMessage();
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

        return lst;
    }

    public List<A2338Filter> loadPX554SQP03911_TV_2(A2338Filter filter) throws SQLException, Exception {

        List<A2338Filter> lst = new ArrayList<A2338Filter>(0);
        A2338Filter bean;
        double TOT_IMPORTOT = 0.0;
        double TOT_TOTDESC = 0.0;
        double TOT_NETO = 0.0;
        Integer TOT_QtySETTLEMENT = 0;

        CallableStatement cstmt = null;
        ResultSet rst = null;
        Connection cnx = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP03911_TV_2(?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(10, Types.INTEGER);
            cstmt.registerOutParameter(11, Types.INTEGER);
            cstmt.registerOutParameter(12, Types.INTEGER);
            cstmt.registerOutParameter(13, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_TIPOFEC);
            cstmt.setString(3, filter.IN_FECHA_FROM);
            cstmt.setString(4, filter.IN_FECHA_TO);
            cstmt.setString(5, filter.IN_MERCHNP);
            cstmt.setString(6, filter.IN_CARDN1);
            cstmt.setString(7, filter.IN_CARDN2);
            cstmt.setString(8, filter.IN_SCURRENCY);
            cstmt.setString(9, filter.IN_NUMLIQUI);

            cstmt.setInt(10, filter.page.PAGNUM);
            cstmt.setInt(11, filter.page.PAGROW);
            cstmt.setInt(12, filter.page.TOTPAG);
            cstmt.setInt(13, filter.page.TOTROW);

            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(10);
            filter.page.PAGROW = cstmt.getInt(11);
            filter.page.TOTPAG = cstmt.getInt(12);
            filter.page.TOTROW = cstmt.getInt(13);

            rst = cstmt.getResultSet();

            while (rst.next()) {
                TOT_IMPORTOT = rst.getDouble("TOT_IMPORTOT");
                TOT_TOTDESC = rst.getDouble("TOT_TOTDESC");
                TOT_NETO = rst.getDouble("TOT_NETO");
                TOT_QtySETTLEMENT = rst.getInt("TOT_QtySETTLEMENT");
            }
            rst.close();
            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();

                while (rst.next()) {
                    bean = new A2338Filter();
                    bean.RN = rst.getLong("RN");
                    bean.IN_FECHA_FROM = filter.IN_FECHA_FROM.trim();
                    bean.IN_FECHA_TO = filter.IN_FECHA_TO.trim();

                    bean.TIPOFEC = rst.getString(filter.IN_TIPOFEC).trim();
                    bean.strFormatDate = Functions.getMonthConvert(bean.TIPOFEC);
                    bean.QtySETTLEMENT = rst.getInt("QtySETTLEMENT");
                    bean.SCURRENCY = rst.getString("SCURRENCY");
                    bean.IMPORTOT = rst.getDouble("IMPORTOT");
                    bean.TOTDESC = rst.getDouble("TOTDESC");
                    bean.NETO = rst.getDouble("NETO");
                    bean.IN_TIPOFEC = filter.IN_TIPOFEC;

                    bean.TOT_IMPORTOT = TOT_IMPORTOT;
                    bean.TOT_TOTDESC = TOT_TOTDESC;
                    bean.TOT_NETO = TOT_NETO;
                    bean.TOT_QtySETTLEMENT = TOT_QtySETTLEMENT;

                    bean.page.PAGNUM = filter.page.PAGNUM;
                    bean.page.PAGROW = filter.page.PAGROW;
                    bean.page.TOTPAG = filter.page.TOTPAG;
                    bean.page.TOTROW = filter.page.TOTROW;

                    lst.add(bean);
                }
            }
        } catch (Exception e) {
            e.getMessage();
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

        return lst;
    }
}
