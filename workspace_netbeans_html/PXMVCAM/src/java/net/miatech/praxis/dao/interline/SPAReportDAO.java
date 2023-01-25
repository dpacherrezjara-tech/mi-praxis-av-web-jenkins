package net.miatech.praxis.dao.interline;

// <editor-fold defaultstate="collapsed" desc="import">
import java.io.File;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.exceptions.SpringException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import net.miatech.beans.ServerSession;
import net.miatech.praxis.interline.A1402;
import net.miatech.praxis.interline.WRF014;
import net.miatech.praxis.interline.filter.A1155Filter;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

// </editor-fold>
/**
 *
 * @author gsanchez
 */
public class SPAReportDAO {

    // <editor-fold defaultstate="collapsed" desc="Variables locales">
    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private String strSQL;
    private static final Logger logError = Logger.getLogger("errorLog");
    // </editor-fold>

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A1155Filter> loadPX154S01A1155(A1155Filter filter) throws SQLException, Exception {

        List<A1155Filter> lstRtn = new ArrayList<A1155Filter>(0);
        A1155Filter objRtn;
        HashMap hmDesc = new HashMap();
        hmDesc.put("S", "SPA");
        hmDesc.put("C", "Charges");
        hmDesc.put("F", "FIM");
        hmDesc.put("G", "GSA");
        hmDesc.put("I", "ISC");
        hmDesc.put("M", "Mexipass");
        hmDesc.put("Q", "Frecuenta");
        hmDesc.put("U", "UATP");
        hmDesc.put("Z", "ZED");
        hmDesc.put("V", "INV");

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        Connection cnx = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX154S01A1155_GG_TEMP(?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(11, Types.INTEGER);
            cstmt01.registerOutParameter(12, Types.INTEGER);
            cstmt01.registerOutParameter(13, Types.INTEGER);
            cstmt01.registerOutParameter(14, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_FECHA_FROM);
            cstmt01.setString(3, filter.IN_FECHA_TO);
            cstmt01.setString(4, filter.IN_STATUS);
            cstmt01.setString(5, filter.IN_AIRLINE);
            cstmt01.setString(6, filter.IN_INDICATOR);
            cstmt01.setString(7, filter.IN_VIGENTE);
            cstmt01.setString(8, filter.IN_CIA1);
            cstmt01.setString(9, filter.IN_CIA2);
            cstmt01.setString(10, filter.IN_FFIN);
            cstmt01.setInt(11, filter.page.PAGNUM);
            cstmt01.setInt(12, filter.page.PAGROW);
            cstmt01.setInt(13, filter.page.TOTPAG);
            cstmt01.setInt(14, filter.page.TOTROW);

            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(11);
            filter.page.PAGROW = cstmt01.getInt(12);
            filter.page.TOTPAG = cstmt01.getInt(13);
            filter.page.TOTROW = cstmt01.getInt(14);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new A1155Filter();
                objRtn.A1155UMODI = session.getUserView().getUserInfo().USR;//USUARIO
                objRtn.A1155AIRLI = session.getUserView().getCustomerInfo().CCUST;
                objRtn.A1155CNUM = rs01.getString("A1155CNUM");//setStrNumCia
                objRtn.A1155CIAFM = rs01.getString("A1155CIAFM");//setStrFCia
                objRtn.A1155CIA1 = rs01.getString("A1155CIA1");//setStrLitName
                objRtn.A1155CODAC = rs01.getString("A1155CODAC");//setStrCodAgree
                objRtn.strDescripcion2 = rs01.getString("DES_A1155CODAC1") + " - " + rs01.getString("DES_A1155CODAC2");
                objRtn.A1155INDAC = rs01.getString("A1155INDAC").trim();//setStrIndAgree

                if (hmDesc.containsKey(objRtn.A1155INDAC.trim())) {
                    objRtn.strDescripcion = hmDesc.get(objRtn.A1155INDAC.trim()).toString();
                } else {
                    objRtn.strDescripcion = objRtn.A1155INDAC;
                }

                objRtn.A1155VRSAC = rs01.getString("A1155VRSAC");//setStrVrAgree
                objRtn.A1155FINI = rs01.getString("A1155FINI");//setStrInitDate
                objRtn.strFormatDate = Functions.getMonthConvert(objRtn.A1155FINI);
                objRtn.A1155FFIN = rs01.getString("A1155FFIN");//setStrFinalDate
                objRtn.strFormatDate1 = Functions.getMonthConvert(objRtn.A1155FFIN);
                objRtn.A1155FESTA = rs01.getString("A1155FESTA");//setStrState
//                if (objRtn.A1155FESTA.equals("C") || objRtn.A1155FESTA.equals("U")) {
//                    objRtn.strDescripcion1 = "Certified, C"; // Certified
//                } else if (objRtn.A1155FESTA.equals("P")) {
//                    objRtn.strDescripcion1 = "Certified, T"; //Test
//                } else if (objRtn.A1155FESTA.equals("D")) {
//                    objRtn.strDescripcion1 = "Certified, D"; //Development
//                } else {
//                    objRtn.strDescripcion = "Certified";
//                }
                if (objRtn.A1155FESTA.equals("C")) {
                    objRtn.strDescripcion1 = "Certified"; // Certified
                } else if (objRtn.A1155FESTA.equals("P")) {
                    objRtn.strDescripcion1 = "Test"; //Test
                } else if (objRtn.A1155FESTA.equals("D")) {
                    objRtn.strDescripcion1 = "Development"; //Development
                } else if (objRtn.A1155FESTA.equals("U")) {
                    objRtn.strDescripcion1 = "Upgrade";
                } else if (objRtn.A1155FESTA.equals("R")) {
                    objRtn.strDescripcion1 = "Register";
                } else {
                    objRtn.strDescripcion1 = "";
                }
                objRtn.A1155SRP = rs01.getString("A1155SRP");//setStrSRP
                objRtn.A1155PRO = rs01.getString("A1155PRO");//setStrPRO
                objRtn.A1155TRAMO = rs01.getString("A1155TRAMO");//setStrMontoFijo
                objRtn.A1155FNUM = rs01.getString("A1155FNUM");//setStrMetDefa
                if (objRtn.A1155FNUM.equals("")) {
                    objRtn.A1155FNUM = "-";
                }
                objRtn.A1155UINGR = rs01.getString("A1155UINGR");//setStrEnteredBy
                objRtn.A1155FRECE = rs01.getString("A1155FRECE");//setStrRecepDate
                objRtn.strFormatDate2 = Functions.getMonthConvert(objRtn.A1155FRECE);
                objRtn.A1155FINGR = rs01.getString("A1155FINGR");//setStrLoadingDate
                objRtn.strFormatDate3 = Functions.getMonthConvert(objRtn.A1155FINGR);
                objRtn.A1155FMODI = rs01.getString("A1155FMODI");//setStrCertifiedDate
                objRtn.strFormatDate4 = Functions.getMonthConvert(objRtn.A1155FMODI);
                //objRtn.A1155ESTAD = rs01.getString("A1155ESTAD");//setStrA1155ESTAD
                if (rs01.getString("A1155ESTAD").equals("N")) {
                    objRtn.A1155ESTAD = "New";
                }
                objRtn.A1155IDSCO = rs01.getString("A1155IDSCO");//setStrA1155IDSCO
                objRtn.A1155FNAME = rs01.getString("A1155FNAME").replace("\\", "\\\\");//setStrA1155FNAME
                //objRtn.A1155FNAME = rs01.getString("A1155FNAME").trim().replace("", "\\\\Correo\\acuerdos\\139-AM\\SA-083");//setStrA1155FNAME

                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;

                if (rs01.getString("A1155CIAFM").trim().equals("139")) {
                    if (rs01.getString("A1155FNUM").trim().equals("139")) {
                        lstRtn.add(objRtn);
                    }
                } else {
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

    public List<A1155Filter> loadPX154S01A1155_2(A1155Filter filter) throws SQLException, Exception {

        List<A1155Filter> lstRtn = new ArrayList<A1155Filter>(0);
        A1155Filter objRtn;
        HashMap hmDesc = new HashMap();
        hmDesc.put("S", "SPA");
        hmDesc.put("C", "Charges");
        hmDesc.put("F", "FIM");
        hmDesc.put("G", "GSA");
        hmDesc.put("I", "ISC");
        hmDesc.put("M", "Mexipass");
        hmDesc.put("Q", "Frecuenta");
        hmDesc.put("U", "UATP");
        hmDesc.put("Z", "ZED");
        hmDesc.put("V", "INV");

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        Connection cnx = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX154S01A1155_GG_2(?,?,?,?,?,?,?,?,?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(8, Types.INTEGER);
            cstmt01.registerOutParameter(9, Types.INTEGER);
            cstmt01.registerOutParameter(10, Types.INTEGER);
            cstmt01.registerOutParameter(11, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_FECHA_FROM);
            cstmt01.setString(3, filter.IN_FECHA_TO);
            cstmt01.setString(4, filter.IN_STATUS);
            cstmt01.setString(5, filter.IN_AIRLINE);
            cstmt01.setString(6, filter.IN_INDICATOR);
            cstmt01.setString(7, filter.IN_VIGENTE);
            cstmt01.setInt(8, filter.page.PAGNUM);
            cstmt01.setInt(9, filter.page.PAGROW);
            cstmt01.setInt(10, filter.page.TOTPAG);
            cstmt01.setInt(11, filter.page.TOTROW);

            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(8);
            filter.page.PAGROW = cstmt01.getInt(9);
            filter.page.TOTPAG = cstmt01.getInt(10);
            filter.page.TOTROW = cstmt01.getInt(11);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new A1155Filter();
                objRtn.A1155AIRLI = session.getUserView().getCustomerInfo().CCUST;
                objRtn.A1155CIA1 = rs01.getString("A1155CIA1");//setStrLitName
                objRtn.A1155CIA2 = rs01.getString("A1155CIA2");
                objRtn.DESC = rs01.getString("DESC");
                objRtn.A1155FNUM = rs01.getString("A1155FNUM");
                objRtn.AGREEMENT = objRtn.A1155CIA2 + " - " + objRtn.A1155FNUM + "\t" + objRtn.DESC;
//                objRtn.A1155CODAC = rs01.getString("A1155CODAC");//setStrCodAgree
//                objRtn.strDescripcion2 = rs01.getString("DES_A1155CODAC1") + " - " + rs01.getString("DES_A1155CODAC2");
//                objRtn.A1155INDAC = rs01.getString("A1155INDAC").trim();//setStrIndAgree
                objRtn.strDescripcion = "SPA";

//                objRtn.A1155VRSAC = rs01.getString("A1155VRSAC");//setStrVrAgree
//                objRtn.A1155FINI = rs01.getString("A1155FINI");//setStrInitDate
//                objRtn.strFormatDate = Functions.getMonthConvert(objRtn.A1155FINI);
                objRtn.A1155FFIN = rs01.getString("A1155FFIN");//setStrFinalDate
                objRtn.strFormatDate1 = Functions.getMonthConvert(objRtn.A1155FFIN);
                objRtn.A1155FESTA = rs01.getString("A1155FESTA");//setStrState
                if (objRtn.A1155FESTA.equals("C")) {
                    objRtn.strDescripcion1 = "Certified"; // Certified
                } else if (objRtn.A1155FESTA.equals("P")) {
                    objRtn.strDescripcion1 = "Test"; //Test
                } else if (objRtn.A1155FESTA.equals("D")) {
                    objRtn.strDescripcion1 = "Development"; //Development
                } else if (objRtn.A1155FESTA.equals("U")) {
                    objRtn.strDescripcion1 = "Upgrade";
                } else if (objRtn.A1155FESTA.equals("R")) {
                    objRtn.strDescripcion1 = "Register";
                } else {
                    objRtn.strDescripcion1 = "";
                }
                objRtn.A1155ANEXO = rs01.getInt("ANEXO");
//                objRtn.A1155SRP = rs01.getString("A1155SRP");//setStrSRP
//                objRtn.A1155PRO = rs01.getString("A1155PRO");//setStrPRO
//                objRtn.A1155TRAMO = rs01.getString("A1155TRAMO");//setStrMontoFijo
//                objRtn.A1155FNUM = rs01.getString("A1155FNUM");//setStrMetDefa
//                if (objRtn.A1155FNUM.equals("")) {
//                    objRtn.A1155FNUM = "-";
//                }
//                objRtn.A1155UINGR = rs01.getString("A1155UINGR");//setStrEnteredBy
//                objRtn.A1155FRECE = rs01.getString("A1155FRECE");//setStrRecepDate
//                objRtn.strFormatDate2 = Functions.getMonthConvert(objRtn.A1155FRECE);
//                objRtn.A1155FINGR = rs01.getString("A1155FINGR");//setStrLoadingDate
//                objRtn.strFormatDate3 = Functions.getMonthConvert(objRtn.A1155FINGR);
//                objRtn.A1155FMODI = rs01.getString("A1155FMODI");//setStrCertifiedDate
//                objRtn.strFormatDate4 = Functions.getMonthConvert(objRtn.A1155FMODI);
//                //objRtn.A1155ESTAD = rs01.getString("A1155ESTAD");//setStrA1155ESTAD
//                if (rs01.getString("A1155ESTAD").equals("N")) {
//                    objRtn.A1155ESTAD = "New";
//                }
//                objRtn.A1155IDSCO = rs01.getString("A1155IDSCO");//setStrA1155IDSCO
//                objRtn.A1155FNAME = rs01.getString("A1155FNAME").replace("\\", "\\\\");//setStrA1155FNAME
                //objRtn.A1155FNAME = rs01.getString("A1155FNAME").trim().replace("", "\\\\Correo\\acuerdos\\139-AM\\SA-083");//setStrA1155FNAME

                objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                objRtn.IN_FECHA_TO = filter.IN_FECHA_TO;
                objRtn.IN_STATUS = filter.IN_STATUS;
                objRtn.IN_AIRLINE = filter.IN_AIRLINE;
                objRtn.IN_INDICATOR = filter.IN_INDICATOR;
                objRtn.IN_VIGENTE = filter.IN_VIGENTE;
                objRtn.IN_CIA1 = objRtn.A1155CIA1.trim();
                objRtn.IN_CIA2 = objRtn.A1155CIA2.trim();
                objRtn.IN_FFIN = objRtn.A1155FFIN.trim();

                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;
//
//                if (rs01.getString("A1155CIAFM").trim().equals("139")) {
//                    if (rs01.getString("A1155FNUM").trim().equals("139")) {
//                        lstRtn.add(objRtn);
//                    }
//                } else {
//                    lstRtn.add(objRtn);
//                }
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

    public List<A1402> loadPX154S02A1402(A1155Filter filter) throws SQLException, Exception {
        List<A1402> lstRtn = new ArrayList<A1402>(0);
        A1402 objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX154S02A1402(?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, session.getUserView().getCustomerInfo().CCUST + filter.A1155CODAC.trim() + " " + filter.A1155INDAC.trim() + " " + filter.A1155VRSAC.trim());

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new A1402();
                objRtn.NROPRT = rs01.getString("NROPRT");
                objRtn.ACUCO1 = rs01.getString("ACUCO1");
                objRtn.TEXT1 = rs01.getString("TEXT1");
                objRtn.TEXT2 = rs01.getString("TEXT2");

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

    public List<WRF014> loadPX154S03WRF014(A1155Filter filter) throws SQLException, Exception {
        List<WRF014> lstRtn = new ArrayList<WRF014>(0);
        WRF014 objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX154S03WRF014(?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.A1155CIAFM.trim());
            cstmt01.setString(3, filter.A1155CODAC.trim());
            cstmt01.setString(4, filter.A1155INDAC.trim());
            cstmt01.setString(5, filter.A1155VRSAC.trim());

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new WRF014();

                objRtn.AIRLINE = rs01.getString("AIRLINE");
                objRtn.CODAC = rs01.getString("CODAC");
                objRtn.INDAC = rs01.getString("INDAC");
                objRtn.VRSAC = rs01.getString("VRSAC");
                objRtn.SEQAC = rs01.getString("SEQAC");
                objRtn.REFE = rs01.getString("REFE");
                objRtn.FBEGIN = rs01.getString("FBEGIN");
                objRtn.strFormatDate = Functions.getMonthConvert(objRtn.FBEGIN);
                objRtn.FENDIN = rs01.getString("FENDIN");
                objRtn.strFormatDate1 = Functions.getMonthConvert(objRtn.FENDIN);
                objRtn.FSEND = rs01.getString("FSEND");
                objRtn.strFormatDate2 = Functions.getMonthConvert(objRtn.FSEND);
                objRtn.FRECE = rs01.getString("FRECE");
                objRtn.strFormatDate3 = Functions.getMonthConvert(objRtn.FRECE);
                objRtn.FENTR = rs01.getString("FENTR");
                objRtn.strFormatDate4 = Functions.getMonthConvert(objRtn.FENTR);

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

    public String loadPX154SQP00822(WRF014 filter) throws SQLException, Exception {
        //REALIZA EL INSERT, UPDATE O DELETE DE UN REGISTRO EN LA TABLA A1786.
        String strMsj = "An Unexpected Error Ocurred.";

        CallableStatement cstmt = null;

        String SQLCLL01 = "{CALL PRAXIS.SQP00822(?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(14, Types.VARCHAR);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, session.getUserView().getUserInfo().USR);
            cstmt.setString(3, filter.AIRLINE.trim());
            cstmt.setString(4, filter.CODAC.trim());
            cstmt.setString(5, filter.INDAC.trim());
            cstmt.setString(6, filter.VRSAC.trim());
            cstmt.setString(7, filter.SEQAC.trim());
            cstmt.setString(8, filter.REFE.trim());
            cstmt.setString(9, filter.FBEGIN.trim());
            cstmt.setString(10, filter.FENDIN.trim());
            cstmt.setString(11, filter.FSEND.trim());
            cstmt.setString(12, filter.FRECE.trim());
            cstmt.setString(13, filter.FENTR.trim());
            cstmt.setString(14, "");
            cstmt.execute();

            strMsj = cstmt.getString(14);

        } catch (Exception e) {
            e.getMessage();
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

    private void setClose() {

        if (rst != null) {
            try {
                rst.close();
            } catch (SQLException e) {
                throw new SpringException(e);
            }
        }
        if (cs != null) {
            try {
                cs.close();
            } catch (SQLException e) {
                throw new SpringException(e);
            }
        }
        try {
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
        } catch (Exception ex) {
            throw new SpringException(ex);
        }
        pasarGarbageCollector();
    }

    public List<A1155Filter> loadFileNames(A1155Filter filter) throws Exception {

        String[] directorio = new String[10];
//        filter.A1155FNAME = filter.A1155FNAME.trim().toUpperCase().replace("RS", session.getProperty("RUTA_REPOSITORY_2")).replace("CORREO", session.getProperty("RUTA_REPOSITORY_2"));
        filter.A1155FNAME = filter.A1155FNAME.trim().toUpperCase().replace("RS", (String) session.getPropertySession().get("RUTA_REPOSITORY_2")).replace("CORREO", (String) session.getPropertySession().get("RUTA_REPOSITORY_2"));
        String ruta = filter.A1155FNAME.trim();

        List<A1155Filter> lstRtn = new ArrayList<A1155Filter>(0);
        A1155Filter objRtn;

        if (ruta != null && !ruta.trim().equals("")) {

            if (ruta.endsWith(".PDF") || ruta.endsWith(".DOC")) {
                ruta = ruta.substring(0, ruta.lastIndexOf("\\") - 1);
                filter.A1155FNAME = ruta;
            }

            try {

                File path = new File(ruta);

                if (path.exists()) {
                    directorio = path.list();

                } else {
                    //error.setStrMensaje("There Path of these documents does not exist.");
                }

            } catch (Exception e) {
                e.printStackTrace();
            }

            if (directorio != null) {

                for (int i = 0; i < directorio.length; i++) {
                    objRtn = new A1155Filter();
                    objRtn.strDescripcion = directorio[i];//nombre archivos
                    objRtn.strDescripcion2 = filter.A1155FNAME.replace("\\", "*");//ruta
                    objRtn.strDescripcion3 = session.getUserView().getUserInfo().USR;
                    if (!objRtn.strDescripcion.endsWith(".db") && objRtn.strDescripcion.contains(".") && !objRtn.strDescripcion.endsWith(".msg") && objRtn.strDescripcion.contains(filter.strFormatDate.replaceAll("-", ""))) {
                        lstRtn.add(objRtn);
                    }
                }
            }
        }

        return lstRtn;
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }
}
