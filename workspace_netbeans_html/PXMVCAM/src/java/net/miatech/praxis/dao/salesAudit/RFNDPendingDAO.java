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
import net.miatech.beans.SaleAudit.A3647Filter;
import net.miatech.beans.SaleAudit.A3649Filter;
import net.miatech.beans.SaleAudit.A3651Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.SaleAudit.A3649;
import static net.miatech.praxis.dao.salesAudit.RFNDQueryDAO.pasarGarbageCollector;
import net.miatech.utils.Functions;
import net.miatech.utils.TimeFormatToday;
import net.miatech.utils.WorkStation;
import org.apache.log4j.Logger;

/**
 *
 * @author zperez
 */
public class RFNDPendingDAO {

    private IServerSession session;
    private static final Logger logError = Logger.getLogger("errorLog");
    private TimeFormatToday today = new TimeFormatToday();
    private WorkStation workStation = WorkStation.getInstance();

    public RFNDPendingDAO() {

    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public RFNDPendingDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A3647Filter> SearchPendiRefund(A3647Filter filter) throws SQLException, Exception {
        List<A3647Filter> lstRtn = new ArrayList<A3647Filter>(0);
        A3647Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PXRFNDESP.SQP03096(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.registerOutParameter(12, Types.INTEGER);
            cstmt01.registerOutParameter(13, Types.INTEGER);
            cstmt01.registerOutParameter(14, Types.INTEGER);
            cstmt01.registerOutParameter(15, Types.INTEGER);

            cstmt01.setString(1, filter.IN_OPTION);
            cstmt01.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(3, filter.IN_DATEFROM);
            cstmt01.setString(4, filter.IN_DATETO);
            cstmt01.setString(5, filter.IN_TICKET);
            cstmt01.setString(6, filter.IN_COUNTRY);
            cstmt01.setString(7, filter.IN_IATA);
            cstmt01.setString(8, filter.IN_FLAG);
            cstmt01.setString(9, filter.IN_STATUS);
            cstmt01.setString(10, filter.IN_USER);
            cstmt01.setString(11, filter.IN_FOLIO);

            cstmt01.setInt(12, filter.page.PAGNUM);
            cstmt01.setInt(13, filter.page.PAGROW);
            cstmt01.setInt(14, filter.page.TOTPAG);
            cstmt01.setInt(15, filter.page.TOTROW);

            cstmt01.execute();

            //*System.out.println("Aqui entro con Filtro Categoria: ");
            filter.page.PAGNUM = cstmt01.getInt(12);
            filter.page.PAGROW = cstmt01.getInt(13);
            filter.page.TOTPAG = cstmt01.getInt(14);
            filter.page.TOTROW = cstmt01.getInt(15);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new A3647Filter();
                objRtn.A3647CCUST = rs01.getString("A3647CCUST");
                objRtn.A3647PREME = rs01.getString("A3647PREME");
                objRtn.A3647ANIO = rs01.getString("A3647ANIO");
                objRtn.A3647FOLIO = rs01.getString("A3647FOLIO");
                objRtn.A3647ARCD = rs01.getString("A3647ARCD");
                objRtn.A3647COCD = rs01.getString("A3647COCD");
                objRtn.A3647FREGI = rs01.getString("A3647FREGI");
                objRtn.A3647REGAS = rs01.getString("A3647REGAS");
                objRtn.A3647RN = rs01.getInt("RN");
                objRtn.CANTPRO = rs01.getInt("CANTPRO");
                objRtn.CANTOK = rs01.getInt("CANTOK");
                objRtn.CANTNK = rs01.getInt("CANTNK");
                objRtn.CANTKO = rs01.getInt("CANTKO");
                objRtn.CANTPE = rs01.getInt("CANTPE");
                objRtn.TOTALCANT = rs01.getInt("CANTKO") + rs01.getInt("CANTOK") + rs01.getInt("CANTPE");
                objRtn.SUMAOK = rs01.getDouble("SUMAOK");
                //BPO        
                objRtn.BPOOK = rs01.getInt("BPOOK");
                objRtn.BPOKO = rs01.getInt("BPOKO");
                objRtn.TOTALBPO = rs01.getInt("BPOOK") + rs01.getInt("BPOKO");
                //RFND FINANCIERO EN SABRE 
                objRtn.RFNDSABRE = rs01.getInt("RFNDSABRE");
                objRtn.RFNDSABRET = rs01.getInt("RFNDSABRET");
                objRtn.TOTALSABRET = rs01.getInt("RFNDSABRE") + rs01.getInt("RFNDSABRET");
                // CAMBIO DE ESTATUS
                objRtn.STOEN = rs01.getInt("STOEN");
                objRtn.STORET = rs01.getInt("STORET");
                objRtn.TOTALSTO = rs01.getInt("STOEN") + rs01.getInt("STORET");
                objRtn.A3647DIAS = rs01.getString("DIAS");
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

    public List<A3651Filter> SearchRFNDRazon(A3651Filter filter) throws SQLException, Exception {
        List<A3651Filter> lstRtn = new ArrayList<A3651Filter>(0);
        A3651Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        //String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00911XX(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
        String SQLCLL01 = "{CALL PXRFNDESP.SQP03100(?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.execute();
            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new A3651Filter();
                objRtn.A3651CCUST = rs01.getString("A3651CCUST");
                objRtn.A3651CODRZ = rs01.getString("A3651CODRZ");
                objRtn.A3651FAMIL = rs01.getString("A3651FAMIL");
                objRtn.A3651COMRE = rs01.getString("A3651COMRE");
                objRtn.A3651COMES = rs01.getString("A3651COMES");
                objRtn.A3651COMEN = rs01.getString("A3651COMEN");
                objRtn.A3651COMPO = rs01.getString("A3651COMPO");
                objRtn.A3651COMFR = rs01.getString("A3651COMFR");
                lstRtn.add(objRtn);
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

    public String ProcesaManualRFND(A3647Filter beanGuardarA3389, ArrayList<A3649Filter> gridDataRazones) throws SQLException, Exception {
        CallableStatement cs = null;
        ResultSet rst = null;
        String strSQL;
        String STR_RESULT = "";
        String valida = "Y";

        session.getCNXIBMDB2().open();
        try {
            //String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00953(?,?,?,?,?,?,?,?,?,?)}";
            String SQLCLL01 = "{CALL LIBSAP26.SQP03101(?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
            cs = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);
            //if (beanGuardarA3389.IN_STATUS.equals("R")) {
            for (A3649Filter obj : gridDataRazones) {

                cs.setString("IN_CCUST", session.getUserView().getCustomerInfo().CCUST);
                cs.setString("IN_PREME", beanGuardarA3389.IN_PREME);
                cs.setString("IN_ANIO", beanGuardarA3389.IN_ANIO);
                cs.setString("IN_STATUS", beanGuardarA3389.IN_STATUS);
                cs.setString("IN_CODRZ", obj.A3649CODE);
                cs.setString("IN_ERROR", obj.A3649ERROR);
                cs.setString("IN_FAMIL", obj.A3649FAMIL);
                cs.setString("IN_ARCHV1", "");
                cs.setString("IN_ARCHV2", "");
                cs.setString("IN_ARCHV3", "");
                cs.setString("IN_REGIS", session.getUserView().getUserInfo().USR);
                cs.setString("IN_FREGI", Functions.getFechaActual());
                cs.setString("IN_HREGI", Functions.getHoraActual());
                cs.setString("IN_VALIDA", valida);
                cs.execute();
                valida = "N";
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

    public List<A3647Filter> SearchTICKETRFND(A3647Filter filter) throws SQLException, Exception {
        List<A3647Filter> lstRtn = new ArrayList<A3647Filter>(0);
        A3647Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL LIBSAP26.SQP03295(?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, filter.IN_OPTION);
            cstmt01.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(3, filter.IN_PREME);
            cstmt01.setString(4, filter.IN_ANIO);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new A3647Filter();
                objRtn.A3647CCUST = rs01.getString("A3648CCUST");
                objRtn.A3647TKTDUPLI = rs01.getString("A3648CIA") + "" + rs01.getString("A3648FORMA") + "" + rs01.getString("A3648SERIE");
                objRtn.A3647FLAG = rs01.getString("A3648FLAG");
                objRtn.A3647PGNA1 = rs01.getString("A3648ERROR");
                objRtn.A3647TOTAD = rs01.getDouble("A3648TOTAD");
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
