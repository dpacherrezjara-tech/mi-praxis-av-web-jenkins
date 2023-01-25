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
import net.miatech.beans.SaleAudit.SQP00911Filter;
import net.miatech.beans.spring.implement.IServerSession;
import static net.miatech.utils.Functions.pasarGarbageCollector;
import org.apache.log4j.Logger;

/**
 *
 * @author zperez
 */
public class DocumentsControlDAO {

    private IServerSession session;
    private static final Logger logError = Logger.getLogger("errorLog");

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<SQP00911Filter> SearchReportGeneral(SQP00911Filter filter) throws SQLException, Exception {
        List<SQP00911Filter> lstRtn = new ArrayList<SQP00911Filter>(0);
        SQP00911Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PXSAUDIT.SQP03079(?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.COMBOBY);
            cstmt01.setString(3, filter.OPCIONTYPE);
            cstmt01.setString(4, filter.VP_TYPE);
            cstmt01.setString(5, filter.DATEFROM);
            cstmt01.setString(6, filter.DATETO);
            cstmt01.setString(7, filter.COUNTRY);
            cstmt01.setString(8, filter.VP_IATA);
            cstmt01.setString(9, filter.COMBOCHANNEL);
            cstmt01.setString(10, filter.VP_AREA);
            cstmt01.setString(11, filter.BASE);
            cstmt01.setString(12, filter.STATUS);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new SQP00911Filter();
                objRtn.A2548BASE = rs01.getString("A2548BASE");
                objRtn.A2548BASEDES = rs01.getString("A2548BASEDES");
                objRtn.A2548AREA = rs01.getString("A2548AREA");
                objRtn.A2548AREADES = rs01.getString("A2548AREADES");
                objRtn.A2548TRNCU = rs01.getString("A2548TRNCU");
                objRtn.A2548FREGI = rs01.getString("A2548FREGI");
                objRtn.A2548CATNNTD = rs01.getInt("CANTBSP");
                objRtn.A2548CATNNTC = rs01.getInt("CANTARC");
                objRtn.A2548CATNFAC = rs01.getInt("CANTASR");
                objRtn.A2548CATNDOCUM = rs01.getInt("CANTBSP") + rs01.getInt("CANTARC") + rs01.getInt("CANTASR");
                objRtn.A2548IVACD = rs01.getDouble("USDBSP");
                objRtn.A2548IVACA = rs01.getDouble("USDARC");
                objRtn.A2548IVACS = rs01.getDouble("USDASR");
                objRtn.A2548TOTAA = rs01.getDouble("USDASR") + rs01.getDouble("USDBSP") + rs01.getDouble("USDARC");
                objRtn.TARIFA = rs01.getDouble("MXNBSP");
                objRtn.TRFPAG = rs01.getDouble("MXNARC");
                objRtn.A2548SUMACM = rs01.getDouble("MXNASR");
                objRtn.A2548TOTAD = rs01.getDouble("MXNASR") + rs01.getDouble("MXNBSP") + rs01.getDouble("MXNASR");
                objRtn.A2548PAIS = rs01.getString("A2548PAIS");
                objRtn.A2548IATA = rs01.getString("A2548IATA");
                objRtn.strNombreAgente = rs01.getString("A2548IATA");
                objRtn.A2548FLAG = rs01.getString("A2548FLAG");
                objRtn.A2548STAT = rs01.getString("A2548STAT");
                //NUEVOS CAMBIOS
                objRtn.CANTBSPACM = rs01.getInt("CANTBSPACM");
                objRtn.CANTARCACM = rs01.getInt("CANTARCACM");
                objRtn.CANTASRACM = rs01.getInt("CANTASRACM");
                objRtn.CANTTOTALACM = rs01.getInt("CANTTOTALACM");
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

    public List<SQP00911Filter> SearchReportStatus(SQP00911Filter filter) throws SQLException, Exception {
        List<SQP00911Filter> lstRtn = new ArrayList<SQP00911Filter>(0);
        SQP00911Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PXSAUDIT.SQP03077(?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.COMBOBY);
            cstmt01.setString(3, filter.OPCIONTYPE);
            cstmt01.setString(4, filter.VP_TYPE);
            cstmt01.setString(5, filter.DATEFROM);
            cstmt01.setString(6, filter.DATETO);
            cstmt01.setString(7, filter.COUNTRY);
            cstmt01.setString(8, filter.VP_IATA);
            cstmt01.setString(9, filter.COMBOCHANNEL);
            cstmt01.setString(10, filter.VP_AREA);
            cstmt01.setString(11, filter.BASE);
            cstmt01.setString(12, filter.STATUS);
            cstmt01.setString(13, filter.VP_RAZON);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new SQP00911Filter();

                objRtn.A2548BASE = rs01.getString("A2548BASE");
                objRtn.A2548BASEDES = rs01.getString("A2548BASEDES");
                objRtn.A2548AREA = rs01.getString("A2548AREA");
                objRtn.A2548AREADES = rs01.getString("A2548AREADES");

                objRtn.A2548TRNCU = rs01.getString("A2548TRNCU");
                objRtn.A2548FREGI = rs01.getString("A2548FREGI");
                objRtn.A2548CATNNTD = rs01.getInt("CANTBSP");
                objRtn.A2548CATNNTC = rs01.getInt("CANTARC");
                objRtn.A2548CATNFAC = rs01.getInt("CANTASR");
                objRtn.A2548CATNDOCUM = rs01.getInt("CANTBSP") + rs01.getInt("CANTARC") + rs01.getInt("CANTASR");
                objRtn.A2548IVACD = rs01.getDouble("USDBSP");
                objRtn.A2548IVACA = rs01.getDouble("USDARC");
                objRtn.A2548IVACS = rs01.getDouble("USDASR");
                objRtn.A2548TOTAA = rs01.getDouble("USDASR") + rs01.getDouble("USDBSP") + rs01.getDouble("USDARC");
                objRtn.TARIFA = rs01.getDouble("MXNBSP");
                objRtn.TRFPAG = rs01.getDouble("MXNARC");
                objRtn.A2548SUMACM = rs01.getDouble("MXNASR");
                objRtn.A2548TOTAD = rs01.getDouble("MXNASR") + rs01.getDouble("MXNBSP") + rs01.getDouble("MXNASR");
                objRtn.A2548PAIS = rs01.getString("A2548PAIS");
                objRtn.A2548IATA = rs01.getString("A2548IATA");
                objRtn.strNombreAgente = rs01.getString("A2548IATA");
                objRtn.A2548FLAG = rs01.getString("A2548FLAG");
                objRtn.A2548STAT = rs01.getString("A2548STAT");
                //NUEVOS CAMBIOS
                objRtn.CANTBSPACM = rs01.getInt("CANTBSPACM");
                objRtn.CANTARCACM = rs01.getInt("CANTARCACM");
                objRtn.CANTASRACM = rs01.getInt("CANTASRACM");
                objRtn.CANTTOTALACM = rs01.getInt("CANTTOTALACM");
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

    public List<SQP00911Filter> SearchReportrazon(SQP00911Filter filter) throws SQLException, Exception {
        List<SQP00911Filter> lstRtn = new ArrayList<SQP00911Filter>(0);
        SQP00911Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PXSAUDIT.SQP03076(?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.COMBOBY);
            cstmt01.setString(3, filter.OPCIONTYPE);
            cstmt01.setString(4, filter.VP_TYPE);
            cstmt01.setString(5, filter.DATEFROM);
            cstmt01.setString(6, filter.DATETO);
            cstmt01.setString(7, filter.COUNTRY);
            cstmt01.setString(8, filter.VP_IATA);
            cstmt01.setString(9, filter.COMBOCHANNEL);
            cstmt01.setString(10, filter.VP_AREA);
            cstmt01.setString(11, filter.BASE);
            cstmt01.setString(12, filter.STATUS);
            cstmt01.setString(13, filter.VP_TYPERAZON);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new SQP00911Filter();
                objRtn.A2548BASE = rs01.getString("A2548BASE");
                objRtn.A2548BASEDES = rs01.getString("A2548BASEDES");
                objRtn.A2548AREA = rs01.getString("A2548AREA");
                objRtn.A2548AREADES = rs01.getString("A2548AREADES");
                objRtn.A2548FLAG = rs01.getString("A2548FLAG");
                objRtn.A2548STAT = rs01.getString("A2548STAT");

                objRtn.A2548TRNCU = rs01.getString("A2548TRNCU");
                objRtn.A2548FREGI = rs01.getString("A2548FREGI");
                objRtn.A2548CATNNTD = rs01.getInt("CANTBSP");
                objRtn.A2548CATNNTC = rs01.getInt("CANTARC");
                objRtn.A2548CATNFAC = rs01.getInt("CANTASR");
                objRtn.A2548CATNDOCUM = rs01.getInt("CANTBSP") + rs01.getInt("CANTARC") + rs01.getInt("CANTASR");
                objRtn.A2548IVACD = rs01.getDouble("USDBSP");
                objRtn.A2548IVACA = rs01.getDouble("USDARC");
                objRtn.A2548IVACS = rs01.getDouble("USDASR");
                objRtn.A2548TOTAA = rs01.getDouble("USDASR") + rs01.getDouble("USDBSP") + rs01.getDouble("USDARC");
                objRtn.TARIFA = rs01.getDouble("MXNBSP");
                objRtn.TRFPAG = rs01.getDouble("MXNARC");
                objRtn.A2548SUMACM = rs01.getDouble("MXNASR");
                objRtn.A2548TOTAD = rs01.getDouble("MXNASR") + rs01.getDouble("MXNBSP") + rs01.getDouble("MXNASR");
                objRtn.A2548PAIS = rs01.getString("A2548PAIS");
                objRtn.A2548IATA = rs01.getString("A2548IATA");
                objRtn.strNombreAgente = rs01.getString("A2548IATA");
                objRtn.A2548DESC2 = rs01.getString("A2673TYPE");
                objRtn.CANTBSPACM = rs01.getInt("CANTBSPACM");
                objRtn.CANTARCACM = rs01.getInt("CANTARCACM");
                objRtn.CANTASRACM = rs01.getInt("CANTASRACM");
                objRtn.CANTTOTALACM = rs01.getInt("CANTTOTALACM");
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

    public List<SQP00911Filter> SearchReportADM(SQP00911Filter filter) throws SQLException, Exception {
        List<SQP00911Filter> lstRtn = new ArrayList<SQP00911Filter>(0);
        SQP00911Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PXSAUDIT.SQP03172(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.registerOutParameter(17, Types.INTEGER);
            cstmt01.registerOutParameter(18, Types.INTEGER);
            cstmt01.registerOutParameter(19, Types.INTEGER);
            cstmt01.registerOutParameter(20, Types.INTEGER);

            cstmt01.setString(1, filter.OPCIONTYPE);
            cstmt01.setString(2, filter.COMBOBY);
            cstmt01.setString(3, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(4, filter.DATEFROM);
            cstmt01.setString(5, filter.DATETO);
            cstmt01.setString(6, filter.VP_AREA);
            cstmt01.setString(7, filter.BASE);
            cstmt01.setString(8, filter.TRNCU);
            cstmt01.setString(9, filter.COUNTRY);
            cstmt01.setString(10, filter.VP_IATA);
            cstmt01.setString(11, filter.VP_EROOR);
            cstmt01.setString(12, filter.CHANNEL);
            cstmt01.setString(13, filter.VP_RAZON);
            cstmt01.setString(14, filter.VP_TYPERAZON);
            cstmt01.setString(15, filter.STATUS);
            cstmt01.setString(16, filter.VP_USER);

            cstmt01.setInt(17, filter.page.PAGNUM);
            cstmt01.setInt(18, filter.page.PAGROW);
            cstmt01.setInt(19, filter.page.TOTPAG);
            cstmt01.setInt(20, filter.page.TOTROW);

            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(17);
            filter.page.PAGROW = cstmt01.getInt(18);
            filter.page.TOTPAG = cstmt01.getInt(19);
            filter.page.TOTROW = cstmt01.getInt(20);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new SQP00911Filter();
                objRtn.A2548CCUST = rs01.getString("A2548CCUST");
                objRtn.A2548PREME = rs01.getString("A2548PREME");
                objRtn.A2548FFILE = rs01.getString("A2548FFILE");
                objRtn.A2548NFACT = rs01.getString("A2548NFACT");
                objRtn.A2548NMEMO = rs01.getString("A2548NMEMO");
                objRtn.A2548FEMI = rs01.getString("A2548FEMI");
                objRtn.A2548BASE = rs01.getString("A2548BASE");
                objRtn.A2548TO = rs01.getString("A2548TO");
                objRtn.A2548FPROC = rs01.getString("A2548FPROC");
                objRtn.A2548IATA = rs01.getString("A2548IATA");
                objRtn.A2548EMPLE = rs01.getString("A2548EMPLE");
                objRtn.A2548FLAG = rs01.getString("A2548FLAG");
                objRtn.A2548STAT = rs01.getString("A2548STAT");
                objRtn.A2548TRNCU = rs01.getString("A2548TRNCU");
                objRtn.A2548CNXPA = rs01.getString("A2548CNXPA");
                objRtn.A2548CIA = rs01.getString("A2548CIA");
                objRtn.A2548FORMA = rs01.getString("A2548FORMA");
                objRtn.A2548SERIE = rs01.getString("A2548SERIE");
                objRtn.A2548CDGT = rs01.getString("A2548CDGT");
                objRtn.A2548TRNCO = rs01.getString("A2548TRNCO");
                objRtn.A2548CNJ = rs01.getString("A2548CNJ");
                objRtn.A2548PAIS = rs01.getString("A2548PAIS");
                objRtn.A2548TVTA = rs01.getString("A2548TVTA");
                objRtn.A2548FTE = rs01.getString("A2548FTE");
                objRtn.A2548CANAL = rs01.getString("A2548CANAL");
                objRtn.A2548FVTA = rs01.getString("A2548FVTA");
                objRtn.A2548NMERF = rs01.getString("A2548NMERF");
                objRtn.A2548TPAX = rs01.getString("A2548TPAX");
                objRtn.A2548PAX = rs01.getString("A2548PAX");
                objRtn.A2548CODIT = rs01.getString("A2548CODIT");
                objRtn.A2548CPN = rs01.getString("A2548CPN");
                objRtn.A2548USOS = rs01.getString("A2548USOS");
                objRtn.A2548TCAMB = rs01.getDouble("A2548TCAMB");
                objRtn.A2548MDA = rs01.getString("A2548MDA");
                objRtn.A2548TARIF = rs01.getDouble("A2548TARIF");
                objRtn.A2548TTAX = rs01.getDouble("A2548TTAX");
                objRtn.A2548SERVI = rs01.getDouble("A2548SERVI") + rs01.getDouble("A2548TCARD");
                objRtn.A2548IVACS = rs01.getDouble("A2548IVACS") + rs01.getDouble("A2548TTAMD");
                objRtn.A2548COMIS = rs01.getDouble("A2548COMIS");
                objRtn.A2548SCOM = rs01.getDouble("A2548SCOM");
                objRtn.A2548TAXCM = rs01.getDouble("A2548TAXCM");
                objRtn.A2548PORCO = rs01.getDouble("A2548PORCO");
                objRtn.A2548PENAL = rs01.getDouble("A2548PENAL");
                objRtn.A2548FEE = rs01.getDouble("A2548FEE");
                objRtn.A2548IVACA = rs01.getDouble("A2548IVACA");
                objRtn.A2548TASAC = rs01.getString("A2548TASAC");
                objRtn.A2548TOTAL = rs01.getDouble("A2548TOTAL");
                objRtn.A2548TARIA = rs01.getDouble("A2548TARIA");
                objRtn.A2548TARIA = rs01.getDouble("A2548TARIA");
                objRtn.A2548SERVA = rs01.getDouble("A2548SERVA");
                objRtn.A2548COMIA = rs01.getDouble("A2548COMIA");
                objRtn.A2548SCOMA = rs01.getDouble("A2548SCOMA");
                objRtn.A2548TAXCA = rs01.getDouble("A2548TAXCA");
                objRtn.A2548PORCA = rs01.getDouble("A2548PORCA");
                objRtn.A2548PENAA = rs01.getDouble("A2548PENAA");
                objRtn.A2548FEEA = rs01.getDouble("A2548FEEA");
                objRtn.A2548TASAA = rs01.getString("A2548TASAA");
                objRtn.A2548TOTAA = rs01.getDouble("A2548TOTAA");
                objRtn.A2548TARID = rs01.getDouble("A2548TARID");
                objRtn.A2548TTAXD = rs01.getDouble("A2548TTAXD");
                objRtn.A2548SERVD = rs01.getDouble("A2548SERVD") + rs01.getDouble("A2548TCARD");
                objRtn.A2548IVACD = rs01.getDouble("A2548IVACD") + rs01.getDouble("A2548TTAMD");
                objRtn.A2548COMID = rs01.getDouble("A2548COMID");
                objRtn.A2548SCOMD = rs01.getDouble("A2548SCOMD");
                objRtn.A2548TAXCD = rs01.getDouble("A2548TAXCD");
                objRtn.A2548PORCD = rs01.getDouble("A2548PORCD");
                objRtn.A2548PENAD = rs01.getDouble("A2548PENAD");
                objRtn.A2548FEED = rs01.getDouble("A2548FEED");
                objRtn.A2548TTACD = rs01.getDouble("A2548TTACD");
                objRtn.A2548TTAMD = rs01.getDouble("A2548TTAMD");
                objRtn.A2548TCARD = rs01.getDouble("A2548TCARD");
                objRtn.A2548TASAD = rs01.getString("A2548TASAD");
                objRtn.A2548TOTAD = rs01.getDouble("A2548TOTAD");
                objRtn.A2548NETO = rs01.getDouble("A2548NETO");
                objRtn.A2548REGIS = rs01.getString("A2548REGIS");
                objRtn.A2548FREGI = rs01.getString("A2548FREGI");
                objRtn.A2548TIKET = rs01.getString("A2548CIA") + "" + rs01.getString("A2548FORMA") + "" + rs01.getString("A2548SERIE");
                objRtn.A2548TTAXA = rs01.getDouble("A2548TTAXA");
                objRtn.AGENCY = rs01.getString("AGENCY");
                objRtn.DIRAGENCY = rs01.getString("DIRAGENCY");
                objRtn.A2548EMITI = rs01.getString("A2548EMITI");
                objRtn.A2548FEMIT = rs01.getString("A2548FEMIT");
                objRtn.A2548ENVIA = rs01.getString("A2548ENVIA");
                objRtn.A2548FENVI = rs01.getString("A2548FENVI");
                objRtn.A2548DISPU = rs01.getString("A2548DISPU");
                objRtn.A2548FDISP = rs01.getString("A2548FDISP");
                objRtn.A2548SEQ = rs01.getString("A2548SEQ");
                objRtn.A2548OBSER = rs01.getString("A2548OBSER");
                objRtn.A2548CIUD = rs01.getString("A2548CIUD");
                objRtn.A2548AREA = rs01.getString("A2548AREA");
                objRtn.A2548TYPE = rs01.getString("A2548TYPE");
                objRtn.A2548CTAC = rs01.getString("A2548CTAC");

                objRtn.A2548FCONT = rs01.getString("A2548FCONT");
                objRtn.A2548CPN = rs01.getString("A2548CPN");
                objRtn.A2548DESC1 = rs01.getString("A2548CODR1") + "-" + rs01.getString("A2548DESC1");
                objRtn.A2548CATNDOCUM = rs01.getInt("VL_CANTDOC");

                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;

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

}
