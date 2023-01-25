package net.miatech.praxis.dao.interline;

// <editor-fold defaultstate="collapsed" desc="import">
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import net.miatech.beans.spring.implement.IServerSession;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import net.miatech.beans.A020Filter;
import net.miatech.beans.A050Filter;
import net.miatech.libmiatec.A729;
import net.miatech.praxis.interline.filter.WRF016Filter;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

// </editor-fold>
/**
 *
 * @author gsanchez
 */
public class InvoicingDashboardDAO {

    private IServerSession session;
    private static final Logger logError = Logger.getLogger("errorLog");

    public void setSession(IServerSession ss) {
        session = ss;
    }
    
    public List<WRF016Filter> loadPX199S01WRF051(WRF016Filter filter) throws SQLException, Exception {

        List<WRF016Filter> lstRtn = new ArrayList<WRF016Filter>(0);
        WRF016Filter objRtn;
        long totQTYC = 0;
        double totGROSS = 0, totISC = 0, totOTHER = 0, totTAX = 0, totNETO = 0, totUATP = 0, totHFEE = 0;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00138(?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_FECHA_FROM);
            cstmt01.setString(3, filter.IN_FECHA_TO);
            cstmt01.setString(4, filter.IN_CURRENCY);
            cstmt01.setString(5, filter.IN_AIRLINE);
            cstmt01.setString(6, filter.PERMONT);

            cstmt01.execute();
            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                totQTYC = rs01.getInt("QDOC");
                totGROSS = rs01.getDouble("GROSSN");
                totISC = rs01.getDouble("ISCN");
                //totOCOMIS = rs01.getDouble("OCOMIS");
                totTAX = rs01.getDouble("TAXN");
                totNETO = rs01.getDouble("NETO");
                totUATP = rs01.getInt("DUATRM");
                totHFEE = rs01.getDouble("DHAFRM");
                totOTHER = rs01.getDouble("DOTCRM");

            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new WRF016Filter();
                    objRtn.FINVOICE = rs01.getString("FINVOICE");
                    objRtn.PERMONT = rs01.getString("PERMONT");
                    objRtn.strFormatDate = Functions.getMonthConvert(rs01.getString("FINVOICE"));
                    objRtn.CURRENP = rs01.getString("CURRENP");
                    objRtn.QTYINV = rs01.getInt("QDOC");
                    objRtn.GROSSI = rs01.getDouble("GROSSN");
                    objRtn.ISCN = rs01.getDouble("ISCN");
                    objRtn.TAXN = rs01.getDouble("TAXN");
                    objRtn.NETO = rs01.getDouble("NETO");
                    objRtn.DUATRM = rs01.getDouble("DUATRM");
                    objRtn.DHAFRM = rs01.getDouble("DHAFRM");
                    objRtn.DOTCRM = rs01.getDouble("DOTCRM");

                    objRtn.totQTYDOC = totQTYC;
                    objRtn.totGROSS = totGROSS;
                    objRtn.totISC = totISC;
                    objRtn.totUATP = totUATP;
                    objRtn.totHFEE = totHFEE;
                    objRtn.totOTHER = totOTHER;
                    //objRtn.totOCOMIS = totOCOMIS;
                    objRtn.totTAX = totTAX;
                    objRtn.totNETO = totNETO;
                    //objRtn.totAvg = (objRtn.totQTYDOC > 0) ? objRtn.totGROSS / objRtn.totQTYDOC : 0;

                    objRtn.IN_AIRLINE = filter.IN_AIRLINE;

                    lstRtn.add(objRtn);
                }
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
    
    public List<WRF016Filter> loadPX199S02WRF051(WRF016Filter filter) throws SQLException, Exception {

        List<WRF016Filter> lstRtn = new ArrayList<WRF016Filter>(0);
        WRF016Filter objRtn;
        long totQTYC = 0;
        double totGROSS = 0, totISC = 0, totOTHER = 0, totTAX = 0, totNETO = 0, totUATP = 0, totHFEE = 0;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00140(?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);
            cstmt01.registerOutParameter(9, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.FINVOICE);
            cstmt01.setString(3, filter.PERMONT);
            cstmt01.setString(4, filter.CURRENP);
            cstmt01.setString(5, filter.IN_AIRLINE);
            cstmt01.setInt(6, filter.page.PAGNUM);
            cstmt01.setInt(7, filter.page.PAGROW);
            cstmt01.setInt(8, filter.page.TOTPAG);
            cstmt01.setInt(9, filter.page.TOTROW);

            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(6);
            filter.page.PAGROW = cstmt01.getInt(7);
            filter.page.TOTPAG = cstmt01.getInt(8);
            filter.page.TOTROW = cstmt01.getInt(9);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                totQTYC = rs01.getInt("QDOC");
                totGROSS = rs01.getDouble("GROSSN");
                totISC = rs01.getDouble("ISCN");
                //totOCOMIS = rs01.getDouble("OCOMIS");
                totTAX = rs01.getDouble("TAXN");
                totNETO = rs01.getDouble("NETO");
                totUATP = rs01.getInt("DUATRM");
                totHFEE = rs01.getDouble("DHAFRM");
                totOTHER = rs01.getDouble("DOTCRM");

            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new WRF016Filter();
                    objRtn.FINVOICE = filter.FINVOICE;
                    objRtn.PERMONT = filter.PERMONT;
                    objRtn.strFormatDate = filter.strFormatDate;
                    objRtn.CURRENP = filter.CURRENP;
                    objRtn.TUSO = rs01.getString("TUSO");
                    objRtn.strDescripcion = rs01.getString("DES_SOURCE");
                    objRtn.QTYINV = rs01.getInt("QDOC");
                    objRtn.GROSSI = rs01.getDouble("GROSSN");
                    objRtn.ISCN = rs01.getDouble("ISCN");
                    objRtn.TAXN = rs01.getDouble("TAXN");
                    objRtn.NETO = rs01.getDouble("NETO");
                    objRtn.DUATRM = rs01.getDouble("DUATRM");
                    objRtn.DHAFRM = rs01.getDouble("DHAFRM");
                    objRtn.DOTCRM = rs01.getDouble("DOTCRM");

                    objRtn.totQTYDOC = totQTYC;
                    objRtn.totGROSS = totGROSS;
                    objRtn.totISC = totISC;
                    objRtn.totUATP = totUATP;
                    objRtn.totHFEE = totHFEE;
                    objRtn.totOTHER = totOTHER;
                    //objRtn.totOCOMIS = totOCOMIS;
                    objRtn.totTAX = totTAX;
                    objRtn.totNETO = totNETO;
                    //objRtn.totAvg = (objRtn.totQTYDOC > 0) ? objRtn.totGROSS / objRtn.totQTYDOC : 0;
                    objRtn.IN_AIRLINE = filter.IN_AIRLINE;

                    //Paginación ===================================================
                    objRtn.page.PAGNUM = filter.page.PAGNUM;
                    objRtn.page.PAGROW = filter.page.PAGROW;
                    objRtn.page.TOTPAG = filter.page.TOTPAG;
                    objRtn.page.TOTROW = filter.page.TOTROW;

                    lstRtn.add(objRtn);
                }
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
    
    public List<WRF016Filter> loadPX199S03WRF051(WRF016Filter filter) throws SQLException, Exception {

        List<WRF016Filter> lstRtn = new ArrayList<WRF016Filter>(0);
        WRF016Filter objRtn;
        long totQTYC = 0;
        double totGROSS = 0, totISC = 0, totOTHER = 0, totTAX = 0, totNETO = 0, totUATP = 0, totHFEE = 0;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00142(?,?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);
            cstmt01.registerOutParameter(9, Types.INTEGER);
            cstmt01.registerOutParameter(10, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.FINVOICE);
            cstmt01.setString(3, filter.PERMONT);
            cstmt01.setString(4, filter.CURRENP);
            cstmt01.setString(5, filter.IN_AIRLINE);
            cstmt01.setString(6, filter.TUSO);
            cstmt01.setInt(7, filter.page.PAGNUM);
            cstmt01.setInt(8, filter.page.PAGROW);
            cstmt01.setInt(9, filter.page.TOTPAG);
            cstmt01.setInt(10, filter.page.TOTROW);

            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(7);
            filter.page.PAGROW = cstmt01.getInt(8);
            filter.page.TOTPAG = cstmt01.getInt(9);
            filter.page.TOTROW = cstmt01.getInt(10);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                totQTYC = rs01.getInt("QDOC");
                totGROSS = rs01.getDouble("GROSSN");
                totISC = rs01.getDouble("ISCN");
                //totOCOMIS = rs01.getDouble("OCOMIS");
                totTAX = rs01.getDouble("TAXN");
                totNETO = rs01.getDouble("NETO");
                totUATP = rs01.getInt("DUATRM");
                totHFEE = rs01.getDouble("DHAFRM");
                totOTHER = rs01.getDouble("DOTCRM");

            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new WRF016Filter();
                    objRtn.FINVOICE = filter.FINVOICE;
                    objRtn.PERMONT = filter.PERMONT;
                    objRtn.strFormatDate = filter.strFormatDate;
                    objRtn.CURRENP = filter.CURRENP;
                    objRtn.strDescripcion = filter.strDescripcion;
                    objRtn.TUSO = filter.TUSO;
                    objRtn.AIRLINE = rs01.getString("AIRLINE");
                    objRtn.strDescripcion1 = rs01.getString("DES_CIA");
                    objRtn.QTYINV = rs01.getInt("QDOC");
                    objRtn.GROSSI = rs01.getDouble("GROSSN");
                    objRtn.ISCN = rs01.getDouble("ISCN");
                    objRtn.TAXN = rs01.getDouble("TAXN");
                    objRtn.NETO = rs01.getDouble("NETO");
                    objRtn.DUATRM = rs01.getDouble("DUATRM");
                    objRtn.DHAFRM = rs01.getDouble("DHAFRM");
                    objRtn.DOTCRM = rs01.getDouble("DOTCRM");

                    objRtn.totQTYDOC = totQTYC;
                    objRtn.totGROSS = totGROSS;
                    objRtn.totISC = totISC;
                    objRtn.totUATP = totUATP;
                    objRtn.totHFEE = totHFEE;
                    objRtn.totOTHER = totOTHER;
                    //objRtn.totOCOMIS = totOCOMIS;
                    objRtn.totTAX = totTAX;
                    objRtn.totNETO = totNETO;
                    //objRtn.totAvg = (objRtn.totQTYDOC > 0) ? objRtn.totGROSS / objRtn.totQTYDOC : 0;

                    //Paginación ===================================================
                    objRtn.page.PAGNUM = filter.page.PAGNUM;
                    objRtn.page.PAGROW = filter.page.PAGROW;
                    objRtn.page.TOTPAG = filter.page.TOTPAG;
                    objRtn.page.TOTROW = filter.page.TOTROW;

                    lstRtn.add(objRtn);
                }
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
    
    public List<A050Filter> loadPX199SQP00235(WRF016Filter filter, HashMap<String, String> hmAeropuertos) throws SQLException, Exception {

        List<A050Filter> lstRtn = new ArrayList<A050Filter>(0);
        A050Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00235(?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);
            cstmt01.registerOutParameter(9, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.FINVOICE);
            cstmt01.setString(3, filter.PERMONT);
            cstmt01.setString(4, filter.TUSO);
            cstmt01.setString(5, filter.AIRLINE);
            cstmt01.setInt(6, filter.page.PAGNUM);
            cstmt01.setInt(7, filter.page.PAGROW);
            cstmt01.setInt(8, filter.page.TOTPAG);
            cstmt01.setInt(9, filter.page.TOTROW);

            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(6);
            filter.page.PAGROW = cstmt01.getInt(7);
            filter.page.TOTPAG = cstmt01.getInt(8);
            filter.page.TOTROW = cstmt01.getInt(9);

            rs01 = cstmt01.getResultSet();

            while (rs01.next()) {
                objRtn = new A050Filter();
                objRtn.A050FCONTA = filter.FINVOICE;//FINVOICE
                objRtn.strFormatDate = Functions.getMonthConvert(filter.FINVOICE);
                objRtn.A050PSTRF = filter.PERMONT;//PERMONT
                objRtn.strFormatDate = filter.strFormatDate;
                objRtn.A050MONEDA = filter.AIRLINE;//CURRENP
                objRtn.strDescripcion = filter.strDescripcion;
                objRtn.A050AIRLI3 = filter.AIRLINE;//AIRLINE
                objRtn.A050KEY = rs01.getString("A020CIA") + " " + rs01.getString("A020FORMA") + rs01.getString("A020SERIE") + " " + rs01.getString("A020CUPON");
                if (objRtn.A050KEY.length() >= 14) {
                    objRtn.strMonthF = Obtener_APEX(rs01.getString("A020CIA"), rs01.getString("A020FORMA"), rs01.getString("A020SERIE"), rs01.getString("A020CUPON"), cstmt01);
                }
                objRtn.A050FVUELO = Functions.getMonthConvert(rs01.getString("DFLIGHT"));
                objRtn.A050TUSO = rs01.getString("A020TUSO").trim();
                objRtn.A050MNRCD = rs01.getString("A020MONEDA");
                objRtn.A050CRTR = rs01.getString("A020SUFACT").trim();
                objRtn.A050BDATE = rs01.getString("A020SUFECH").trim();
                objRtn.A050RMSN = rs01.getString("A020RMANT").trim();


                objRtn.A050ACEPTA = rs01.getDouble("GROSS");//Gross
                objRtn.A050COMISI = rs01.getDouble("ISC");
                objRtn.A050TUA = rs01.getDouble("TAX");
                objRtn.A050COMISP = rs01.getDouble("A020ANALIZ");
                objRtn.A050NETO = objRtn.A050ACEPTA + objRtn.A050COMISI + objRtn.A050TUA;
                if (!objRtn.strMonthF.trim().equals("")) {
                    objRtn.strMonthF = "YES";
                }

                //Paginación ===================================================
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
    
    public String Obtener_APEX(String ccia, String forma, String serie, String cupon, CallableStatement cstmt) throws SQLException, Exception {

        String SQLCLL01 = "", fte = "";
        SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX162S07A1280(?,?,?,?,?,?)}";

        //cstmt = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);
        cstmt = session.getCNXIBMDB2().getIBMDB2Connection().prepareCall(SQLCLL01);

        cstmt.registerOutParameter(6, Types.VARCHAR);

        cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
        cstmt.setString(2, ccia);
        cstmt.setString(3, forma);
        cstmt.setString(4, serie);
        cstmt.setString(5, cupon);
        cstmt.setString(6, "");


        cstmt.execute();

        fte = cstmt.getString(6);

        return fte;
    }
    
    public List<A050Filter> loadPX199SQP00154(WRF016Filter filter, HashMap<String, String> hmAeropuertos) throws SQLException, Exception {

        List<A050Filter> lstRtn = new ArrayList<A050Filter>(0);
        A050Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00154(?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);
            cstmt01.registerOutParameter(9, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.FINVOICE);
            cstmt01.setString(3, filter.PERMONT);
            cstmt01.setString(4, filter.TUSO);
            cstmt01.setString(5, filter.AIRLINE);
            cstmt01.setInt(6, filter.page.PAGNUM);
            cstmt01.setInt(7, filter.page.PAGROW);
            cstmt01.setInt(8, filter.page.TOTPAG);
            cstmt01.setInt(9, filter.page.TOTROW);

            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(6);
            filter.page.PAGROW = cstmt01.getInt(7);
            filter.page.TOTPAG = cstmt01.getInt(8);
            filter.page.TOTROW = cstmt01.getInt(9);

            rs01 = cstmt01.getResultSet();

            while (rs01.next()) {
                objRtn = new A050Filter();
                objRtn.A050FCONTA = filter.FINVOICE;//FINVOICE
                objRtn.strFormatDate = Functions.getMonthConvert(filter.FINVOICE);
                objRtn.A050PSTRF = filter.PERMONT;//PERMONT
                objRtn.strFormatDate = filter.strFormatDate;
                objRtn.A050MONEDA = filter.AIRLINE;//CURRENP
                objRtn.strDescripcion = filter.strDescripcion;
                objRtn.A050AIRLI3 = filter.AIRLINE;//AIRLINE
                objRtn.A050KEY = rs01.getString("A050KEY").trim();
                if (rs01.getString("A050KEY").length() >= 14) {
                    objRtn.A050KEY = rs01.getString("A050KEY").substring(0, 3) + " " + rs01.getString("A050KEY").substring(3, 13) + " " + rs01.getString("A050KEY").substring(13, 14);
                    objRtn.strMonthF = Obtener_APEX(rs01.getString("A050KEY").substring(0, 3), rs01.getString("A050KEY").substring(3, 7), rs01.getString("A050KEY").substring(7, 13), rs01.getString("A050KEY").substring(13, 14), cstmt01);
                } else {
                    objRtn.A050KEY = rs01.getString("A050KEY");
                }
                objRtn.A050FVUELO = Functions.getMonthConvert(rs01.getString("A050FVUELO"));
                objRtn.A050CRTR = rs01.getString("A050CRTR").trim();
                objRtn.A050TUSO = rs01.getString("A050TUSO").trim();
                objRtn.A050NVUELO = rs01.getString("A050NVUELO").trim();
                objRtn.A050RUTVOL = rs01.getString("A050RUTVOL").trim();
                objRtn.CITYO = Functions.fillString(rs01.getString("A050RUTVOL"), 6).substring(0, 3);
                objRtn.CITYD = Functions.fillString(rs01.getString("A050RUTVOL"), 6).substring(3);
                if (hmAeropuertos.containsKey(objRtn.CITYO.trim().toUpperCase())) {
                    objRtn.strDescOrigen = hmAeropuertos.get(objRtn.CITYO.trim().toUpperCase()).toString();
                }
                if (hmAeropuertos.containsKey(objRtn.CITYD.trim().toUpperCase())) {
                    objRtn.strDescDestino = hmAeropuertos.get(objRtn.CITYD.trim().toUpperCase()).toString();
                }
                objRtn.A050CARS = rs01.getString("A050CARS").trim();
                objRtn.A050RBDS = rs01.getString("A050RBDS").trim();
                objRtn.A050MNRCD = rs01.getString("A050MNRCD").trim();
                objRtn.A050VALOR = rs01.getDouble("A050VALOR");
                objRtn.A050ACEPTA = rs01.getDouble("A050ACEPTA");//Gross
                //objRtn.A050COMISI = rs01.getDouble("A050COMISI");
                //objRtn.A050COMISP = rs01.getDouble("A050COMISP");
                objRtn.A050COMISI = rs01.getDouble("A050COMISI") - rs01.getDouble("A050OVRAMT");
                objRtn.A050COMISP = rs01.getDouble("A050COMISP") - rs01.getDouble("A050OVRISC");
                objRtn.A050OVRAMT = rs01.getDouble("A050OVRAMT");
                objRtn.A050OVRISC = rs01.getDouble("A050OVRISC");
                objRtn.A050TUA = rs01.getDouble("A050TUA");
                objRtn.A050NETO = rs01.getDouble("A050NETO");
                if (!objRtn.strMonthF.trim().equals("")) {
                    objRtn.strMonthF = "YES";
                }

                //Paginación ===================================================
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
    
    public List<A729> loadPX164SQP0076(A020Filter filter) throws SQLException, Exception {

        //NOTA: MODIFICAR EL PROCEDURE PORQUE SÓLO TRAE LOS PRIMEROS 4 TAXES
        List<A729> lstTaxes = new ArrayList<A729>();
        A729 tax;
        String uso = filter.A020TUSO.trim();
        if (uso.equals("")) {
            uso = "01";
        }
        //int cantTaxes = 0;
        //Para comprobar que taxes no se repitan (debido al nombre)
        HashMap<String, String> hmTaxes = new HashMap<String, String>();

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP0076(?,?,?,?,?,?)}";
        Connection cnx = null;
        try {

            //==================================================================
            String strNroprt = "";
            /* if (filter.A020NROPRT.trim().length() == 0) {
             strNroprt = filter.strTicket.trim().substring(3, 13);
             } else if (filter.A020NROPRT.trim().length() == 9) {
             strNroprt = "0" + filter.A020NROPRT.trim();
             } else {
             strNroprt = filter.A020NROPRT.trim();
             }*/
            //==================================================================
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(6, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.strTicket.trim().substring(0, 3));
            cstmt.setString(3, filter.strTicket.trim().substring(3, 13));//strNroprt SIN CUPON
            cstmt.setString(4, filter.strTicket.trim().substring(13));//CUPON
            //cstmt.setString(5, "01");//USO
            cstmt.setString(5, uso);//USO
            cstmt.setInt(6, 0);
            cstmt.execute();

            //cantTaxes = cstmt.getInt(5);

            rst = cstmt.getResultSet();

            while (rst.next()) {

                tax = new A729();
                tax.A729CODTAX = rst.getString("A729CODTAX").trim();
                tax.A729TAXRES = rst.getDouble("A729TAXRES");
                tax.A729MDARES = rst.getString("A729MDARES").trim();
//                tax.strNombre = rst.getString("A1202TNAME").trim();
                tax.A729VALTAX = rst.getDouble("A729VALTAX");

                if (!hmTaxes.containsKey(rst.getString("A729CODTAX").trim())) {
                    lstTaxes.add(tax);
                    hmTaxes.put(rst.getString("A729CODTAX").trim(), rst.getString("A729CODTAX").trim());
                }
            }

            try {
                rst.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
            try {
                cstmt.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

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

        return lstTaxes;
    }
    
    public List<A050Filter> loadPX199SQP00236(WRF016Filter filter, HashMap<String, String> hmAeropuertos) throws SQLException, Exception {

        List<A050Filter> lstRtn = new ArrayList<A050Filter>(0);
        A050Filter objRtn;
        String IN_FLAG = "";
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00237(?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.registerOutParameter(5, Types.VARCHAR);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_TKT.substring(0, 3));//CIA
            cstmt01.setString(3, filter.IN_TKT.substring(3, 7));//FORMA
            cstmt01.setString(4, filter.IN_TKT.substring(7, 13));//SERIE
            cstmt01.setString(5, "");//SERIE
            cstmt01.execute();
            IN_FLAG = cstmt01.getString(5);

            rs01 = cstmt01.getResultSet();

            while (rs01.next()) {
                objRtn = new A050Filter();
                if (IN_FLAG.equals("A020")) {
                    objRtn.A050PSTRF = rs01.getString("A020PERI").trim();
                    objRtn.strFormatDate = rs01.getString("A020FRECHA").trim();
                    objRtn.A050AIRLI3 = rs01.getString("A020AIRLI3").trim();
                    objRtn.A050CRTR = rs01.getString("A050CRTR").trim();
                    objRtn.A050KEY = rs01.getString("A020CIA") + " " + rs01.getString("A020FORMA") + rs01.getString("A020SERIE") + " " + rs01.getString("A020CUPON");
                    if (objRtn.A050KEY.length() >= 14) {
                        objRtn.strMonthF = Obtener_APEX(rs01.getString("A020CIA"), rs01.getString("A020FORMA"), rs01.getString("A020SERIE"), rs01.getString("A020CUPON"), cstmt01);
                    }
                    objRtn.A050FVUELO = Functions.getMonthConvert(rs01.getString("DFLIGHT"));
                    objRtn.A050TUSO = rs01.getString("A020TUSO").trim();
                    objRtn.A050MNRCD = rs01.getString("A020MONEDA");
                    objRtn.A050ACEPTA = rs01.getDouble("GROSS");//Gross
                    objRtn.A050COMISI = rs01.getDouble("ISC");
                    objRtn.A050TUA = rs01.getDouble("TAX");
                    objRtn.A050COMISP = rs01.getDouble("A020ANALIZ");
                    objRtn.strSQL = IN_FLAG;
                    objRtn.A050NETO = objRtn.A050ACEPTA + objRtn.A050COMISI + objRtn.A050TUA;
                    if (!objRtn.strMonthF.trim().equals("")) {
                        objRtn.strMonthF = "YES";
                    }

                } else {
                    objRtn.A050PSTRF = rs01.getString("A050PSTRF").trim();//PERMONT 
                    objRtn.strFormatDate = rs01.getString("A050FCONTA").trim();
                    objRtn.A050AIRLI3 = rs01.getString("A050AIRLI3").trim();
                    objRtn.A050CRTR = rs01.getString("A050CRTR").trim();
                    objRtn.A050KEY = rs01.getString("A050KEY").trim();
                    if (rs01.getString("A050KEY").length() >= 14) {
                        objRtn.A050KEY = rs01.getString("A050KEY").substring(0, 3) + " " + rs01.getString("A050KEY").substring(3, 13) + " " + rs01.getString("A050KEY").substring(13, 14);
                        objRtn.strMonthF = Obtener_APEX(rs01.getString("A050KEY").substring(0, 3), rs01.getString("A050KEY").substring(3, 7), rs01.getString("A050KEY").substring(7, 13), rs01.getString("A050KEY").substring(13, 14), cstmt01);
                    } else {
                        objRtn.A050KEY = rs01.getString("A050KEY");
                    }
                    objRtn.A050FVUELO = Functions.getMonthConvert(rs01.getString("A050FVUELO"));
                    objRtn.A050TUSO = rs01.getString("A050TUSO").trim();
                    objRtn.A050NVUELO = rs01.getString("A050NVUELO").trim();
                    objRtn.A050RUTVOL = rs01.getString("A050RUTVOL").trim();
                    objRtn.CITYO = Functions.fillString(rs01.getString("A050RUTVOL"), 6).substring(0, 3);
                    objRtn.CITYD = Functions.fillString(rs01.getString("A050RUTVOL"), 6).substring(3);
                    if (hmAeropuertos.containsKey(objRtn.CITYO.trim().toUpperCase())) {
                        objRtn.strDescOrigen = hmAeropuertos.get(objRtn.CITYO.trim().toUpperCase()).toString();
                    }
                    if (hmAeropuertos.containsKey(objRtn.CITYD.trim().toUpperCase())) {
                        objRtn.strDescDestino = hmAeropuertos.get(objRtn.CITYD.trim().toUpperCase()).toString();
                    }
                    objRtn.A050CARS = rs01.getString("A050CARS").trim();
                    objRtn.A050RBDS = rs01.getString("A050RBDS").trim();
                    objRtn.A050MNRCD = rs01.getString("A050MNRCD").trim();
                    objRtn.A050VALOR = rs01.getDouble("A050VALOR");
                    objRtn.A050ACEPTA = rs01.getDouble("A050ACEPTA");//Gross
                    objRtn.A050COMISI = rs01.getDouble("A050COMISI") - rs01.getDouble("A050OVRAMT");
                    objRtn.A050COMISP = rs01.getDouble("A050COMISP") - rs01.getDouble("A050OVRISC");
                    objRtn.A050OVRAMT = rs01.getDouble("A050OVRAMT");
                    objRtn.A050OVRISC = rs01.getDouble("A050OVRISC");
                    objRtn.A050TUA = rs01.getDouble("A050TUA");
                    objRtn.A050NETO = rs01.getDouble("A050NETO");
                    objRtn.strSQL = IN_FLAG;
                    if (!objRtn.strMonthF.trim().equals("")) {
                        objRtn.strMonthF = "YES";
                    }

                }
                lstRtn.add(objRtn);
            }

        } catch (Exception e) {
            e.printStackTrace();
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
    
    public List<A050Filter> loadPX199_Reject(WRF016Filter filter, HashMap<String, String> hmAeropuertos) throws SQLException, Exception {
        List<A050Filter> lstRtn = new ArrayList<>(0);
        A050Filter objRtn;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00235_Rej(?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_REJNUMBER);
            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new A050Filter();
                objRtn.A050FCONTA = filter.FINVOICE;//FINVOICE
                objRtn.strFormatDate = Functions.getMonthConvert(filter.FINVOICE);
                objRtn.A050PSTRF = filter.PERMONT;//PERMONT
                objRtn.strFormatDate = filter.strFormatDate;
                objRtn.A050MONEDA = filter.AIRLINE;//CURRENP
                objRtn.strDescripcion = filter.strDescripcion;
                objRtn.A050AIRLI3 = filter.AIRLINE;//AIRLINE
                objRtn.A050KEY = rs01.getString("A020CIA") + " " + rs01.getString("A020FORMA") + rs01.getString("A020SERIE") + " " + rs01.getString("A020CUPON");
                if (objRtn.A050KEY.length() >= 14) {
                    objRtn.strMonthF = Obtener_APEX(rs01.getString("A020CIA"), rs01.getString("A020FORMA"), rs01.getString("A020SERIE"), rs01.getString("A020CUPON"), cstmt01);
                }
                objRtn.A050FVUELO = Functions.getMonthConvert(rs01.getString("DFLIGHT"));
                objRtn.A050TUSO = rs01.getString("A020TUSO").trim();
                objRtn.A050MNRCD = rs01.getString("A020MONEDA");
                objRtn.A050CRTR = rs01.getString("A020SUFACT").trim();
                objRtn.A050BDATE = rs01.getString("A020SUFECH").trim();
                objRtn.A050RMSN = rs01.getString("A020RMANT").trim();


                objRtn.A050ACEPTA = rs01.getDouble("GROSS");//Gross
                objRtn.A050COMISI = rs01.getDouble("ISC");
                objRtn.A050TUA = rs01.getDouble("TAX");
                objRtn.A050COMISP = rs01.getDouble("A020ANALIZ");
                objRtn.A050NETO = objRtn.A050ACEPTA + objRtn.A050COMISI + objRtn.A050TUA;
                if (!objRtn.strMonthF.trim().equals("")) {
                    objRtn.strMonthF = "YES";
                }

                lstRtn.add(objRtn);
            }
        } catch (Exception e) {
            e.printStackTrace();
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

    
    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }
}
