/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.dao.flown;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.A3676Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.utils.TimeFormatToday;
import net.miatech.utils.WorkStation;
import org.apache.log4j.Logger;

/**
 *
 * @author zperez
 */
public class ChangeOfStatusFormDAO {

    private IServerSession session;
    private static final Logger logError = Logger.getLogger("errorLog");
    private TimeFormatToday today = new TimeFormatToday();
    private WorkStation workStation = WorkStation.getInstance();

    public ChangeOfStatusFormDAO() {

    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public ChangeOfStatusFormDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A3676Filter> Search(A3676Filter filter) throws SQLException, Exception {
        List<A3676Filter> lstRtn = new ArrayList<A3676Filter>(0);
        A3676Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PRAXIS.SQP03120(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.registerOutParameter(19, Types.INTEGER);
            cstmt01.registerOutParameter(20, Types.INTEGER);
            cstmt01.registerOutParameter(21, Types.INTEGER);
            cstmt01.registerOutParameter(22, Types.INTEGER);

            cstmt01.setString(1, filter.IN_OPTION);
            cstmt01.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(3, filter.IN_CIA);
            cstmt01.setString(4, filter.IN_FORMA);
            cstmt01.setString(5, filter.IN_SERIE);
            cstmt01.setString(6, filter.IN_SEQ);
            cstmt01.setString(7, filter.IN_REFERENCE);
            cstmt01.setString(8, filter.IN_HORAINI);
            cstmt01.setString(9, filter.IN_HORAFIN);
            cstmt01.setString(10, filter.IN_STATUS);
            cstmt01.setString(11, filter.IN_CURRENCY);
            cstmt01.setString(12, filter.IN_COUNTRY);
            cstmt01.setString(13, filter.IN_STATUSINI);
            cstmt01.setString(14, filter.IN_STATUSFIN);
            cstmt01.setString(15, filter.IN_ORIGEN);
            cstmt01.setString(16, filter.IN_LOTE);
            cstmt01.setString(17, filter.IN_DATEFROM);
            cstmt01.setString(18, filter.IN_DATETO);
            cstmt01.setInt(19, filter.page.PAGNUM);
            cstmt01.setInt(20, filter.page.PAGROW);
            cstmt01.setInt(21, filter.page.TOTPAG);
            cstmt01.setInt(22, filter.page.TOTROW);
            cstmt01.setString(23, filter.IN_TYPE);

            cstmt01.execute();

            //*System.out.println("Aqui entro con Filtro Categoria: ");
            filter.page.PAGNUM = cstmt01.getInt(19);
            filter.page.PAGROW = cstmt01.getInt(20);
            filter.page.TOTPAG = cstmt01.getInt(21);
            filter.page.TOTROW = cstmt01.getInt(22);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new A3676Filter();
                objRtn.A3676CCUST = rs01.getString("A3676CCUST");
                objRtn.A3676LOTE = rs01.getString("A3676LOTE");

                objRtn.A3676ORIG = rs01.getString("A3676ORIG");
                objRtn.A3676CIA = rs01.getString("A3676CIA");
                objRtn.A3676FORMA = rs01.getString("A3676FORMA");
                objRtn.A3676SERIE = rs01.getString("A3676SERIE");
                objRtn.A3676SEQ = rs01.getString("A3676SEQ");
                objRtn.A3676TIKET = rs01.getString("A3676CIA") + "" + rs01.getString("A3676FORMA") + "" + rs01.getString("A3676SERIE");
                objRtn.A3676CUPON = rs01.getString("A3676CUPON");
                objRtn.A3676CUR = rs01.getString("A3676CUR");
                objRtn.A3676MONTO = rs01.getDouble("A3676MONTO");
                objRtn.A3676REFER = rs01.getString("A3676REFER");
                objRtn.A3676CIAI = rs01.getString("A3676CIAI");
                objRtn.A3676FORMI = rs01.getString("A3676FORMI");
                objRtn.A3676SERII = rs01.getString("A3676SERII");
                objRtn.A3676STROB = rs01.getString("A3676STROB");
                objRtn.A3676CPNRB = rs01.getString("A3676CPNRB");
                objRtn.A3676CURRB = rs01.getString("A3676CURRB");
                objRtn.A3676MONRB = rs01.getDouble("A3676MONRB");
                objRtn.A3676REFRB = rs01.getString("A3676REFRB");
                objRtn.A3676STINI = rs01.getString("A3676STINI");
                objRtn.A3676STFIN = rs01.getString("A3676STFIN");
                objRtn.A3676TIDOC = rs01.getString("A3676TIDOC");

                objRtn.A3676DESCR = rs01.getString("A3676DESCR");
                objRtn.A3676RESUL = rs01.getString("A3676RESUL");
                objRtn.A3676STCON = rs01.getString("A3676STCON");
                objRtn.A3676FRECE = rs01.getString("A3676FRECE");
                objRtn.A3676HRECE = rs01.getString("A3676HRECE");
                objRtn.A3676TKT = rs01.getString("A3676TKT");
                objRtn.A3676NARCH = rs01.getString("A3676NARCH");
                objRtn.A3676NUMER = rs01.getString("A3676NUMER");
                objRtn.A3676REGIS = rs01.getString("A3676REGIS");
                objRtn.A3676FREGI = rs01.getString("A3676FREGI");
                objRtn.A3676HREGI = rs01.getString("A3676HREGI");

                objRtn.A3676USE = rs01.getString("A3676USE");
                objRtn.A3676USEB = rs01.getString("A3676USEB");
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

    public List<A3676Filter> SearchControl(A3676Filter filter) throws SQLException, Exception {
        List<A3676Filter> lstRtn = new ArrayList<A3676Filter>(0);
        A3676Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PRAXIS.SQP03134(?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_OPTION);
            cstmt01.setString(3, filter.IN_DATEFROM);
            cstmt01.setString(4, filter.IN_DATETO);
            cstmt01.setString(5, filter.IN_ORIGEN);
            cstmt01.setString(6, filter.IN_LOTE);
            cstmt01.setString(7, filter.IN_REFERENCE);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new A3676Filter();

                if (!filter.IN_OPTION.equals("4")) {
                    objRtn.A3676CCUST = rs01.getString("A3675CCUST");
                    objRtn.A3676LOTE = rs01.getString("A3675LOTE");
                    objRtn.A3676ORIG = rs01.getString("A3675ORIG");
                    objRtn.A3676TETKT = rs01.getInt("A3675TETKT");
                    objRtn.A3676TRTKT = rs01.getInt("A3675TRTKT");
                    objRtn.A3676TECPN = rs01.getInt("A3675TECPN");
                    objRtn.A3676TRCPN = rs01.getInt("A3675TRCPN");
                    objRtn.A3676CNTAM = rs01.getInt("A3675CNTAM");
                    objRtn.A3676CNTPR = rs01.getInt("A3675CNTPR");
                    objRtn.A3676NARCH = rs01.getString("A3675NARCH");

                    objRtn.A3676STROB = rs01.getString("A3675STROB");
                    objRtn.A3676STCON = rs01.getString("A3675STCON");
                    objRtn.A3676FRECE = rs01.getString("A3675FRECE");
                    objRtn.A3676FREGI = rs01.getString("A3675FREGI");
                    objRtn.A3676TOTPAGI = rs01.getInt("A3675TOTPAGI");

                } else {
                    objRtn.A3676CCUST = rs01.getString("A3676CCUST");
                    objRtn.A3676LOTE = rs01.getString("A3676LOTE");

                    objRtn.A3676ORIG = rs01.getString("A3676ORIG");
                    objRtn.A3676CIA = rs01.getString("A3676CIA");
                    objRtn.A3676FORMA = rs01.getString("A3676FORMA");
                    objRtn.A3676SERIE = rs01.getString("A3676SERIE");
                    objRtn.A3676SEQ = rs01.getString("A3676SEQ");
                    objRtn.A3676TIKET = rs01.getString("A3676CIA") + "" + rs01.getString("A3676FORMA") + "" + rs01.getString("A3676SERIE");
                    objRtn.A3676CUPON = rs01.getString("A3676CUPON");
                    objRtn.A3676CUR = rs01.getString("A3676CUR");
                    objRtn.A3676MONTO = rs01.getDouble("A3676MONTO");
                    objRtn.A3676REFER = rs01.getString("A3676REFER");
                    objRtn.A3676CIAI = rs01.getString("A3676CIAI");
                    objRtn.A3676FORMI = rs01.getString("A3676FORMI");
                    objRtn.A3676SERII = rs01.getString("A3676SERII");
                    objRtn.A3676STROB = rs01.getString("A3676STROB");
                    objRtn.A3676CPNRB = rs01.getString("A3676CPNRB");
                    objRtn.A3676CURRB = rs01.getString("A3676CURRB");
                    objRtn.A3676MONRB = rs01.getDouble("A3676MONRB");
                    objRtn.A3676REFRB = rs01.getString("A3676REFRB");
                    objRtn.A3676STINI = rs01.getString("A3676STINI");
                    objRtn.A3676STFIN = rs01.getString("A3676STFIN");

                    objRtn.A3676DESCR = rs01.getString("A3676DESCR");
                    objRtn.A3676RESUL = rs01.getString("A3676RESUL");
                    objRtn.A3676STCON = rs01.getString("A3676STCON");
                    objRtn.A3676FRECE = rs01.getString("A3676FRECE");
                    objRtn.A3676HRECE = rs01.getString("A3676HRECE");
                    objRtn.A3676TKT = rs01.getString("A3676TKT");
                    objRtn.A3676NARCH = rs01.getString("A3676NARCH");
                    objRtn.A3676NUMER = rs01.getString("A3676NUMER");
                    objRtn.A3676REGIS = rs01.getString("A3676REGIS");
                    objRtn.A3676FREGI = rs01.getString("A3676FREGI");
                    objRtn.A3676HREGI = rs01.getString("A3676HREGI");
                    objRtn.A3676TOTPAGI = rs01.getInt("A3675TOTPAGI");
                    objRtn.A3676USE = rs01.getString("A3676USE");
                    objRtn.A3676USEB = rs01.getString("A3676USEB");
                }

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

    public List<A3676Filter> SearchControlEjecu(A3676Filter filter) throws SQLException, Exception {
        List<A3676Filter> lstRtn = new ArrayList<A3676Filter>(0);
        A3676Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PRAXIS.SQP03107(?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_OPTION);
            cstmt01.setString(3, filter.IN_DATEFROM);
            cstmt01.setString(4, filter.IN_DATETO);
            cstmt01.setString(5, filter.IN_ORIGEN);
            cstmt01.setString(6, filter.IN_LOTE);
            cstmt01.setString(7, filter.IN_REFERENCE);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new A3676Filter();
                objRtn.A3676CCUST = rs01.getString("A3677CCUST");
                objRtn.A3676SEQ = rs01.getString("A3677SEQ");
                //objRtn.A3676ORIG = rs01.getString("A3677ORIG");
                objRtn.A3676ORIG = filter.IN_TYPE;
                objRtn.A3676STROB = rs01.getString("A3677FLAG");
                objRtn.A3676TOTPAGI = rs01.getInt("A3677TOTPAGI");
                objRtn.A3676CNTAM = rs01.getInt("A3677CANM");
                objRtn.A3676CNTPR = rs01.getInt("A3677CANA");
                objRtn.A3676NARCH = rs01.getString("A3677NARCH");

                objRtn.A3676REGIS = rs01.getString("A3677REGIS");
                objRtn.A3676FREGI = rs01.getString("A3677FREGI");
                objRtn.A3676HREGI = rs01.getString("A3677HREGI");
                objRtn.A3676REVIS = rs01.getString("A3677REVIS");
                objRtn.A3676FREVI = rs01.getString("A3677FREVI");
                objRtn.A3676HREVI = rs01.getString("A3677HREVI");
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

}
