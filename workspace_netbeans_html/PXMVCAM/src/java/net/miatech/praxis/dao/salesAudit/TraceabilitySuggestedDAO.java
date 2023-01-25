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
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.SaleAudit.A1672Filter;
import net.miatech.beans.SaleAudit.SQP00911Filter;
import net.miatech.beans.SaleAudit.SQP00989Filter;
import net.miatech.beans.spring.implement.IServerSession;
import static net.miatech.utils.Functions.pasarGarbageCollector;
import org.apache.log4j.Logger;

/**
 *
 * @author zperez
 */
public class TraceabilitySuggestedDAO {

    private IServerSession session;
    private static final Logger logError = Logger.getLogger("errorLog");

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public A1672Filter Search(A1672Filter filter) throws SQLException, Exception {
        A1672Filter lstGeneral = null;
        List<A1672Filter> lst_reporte_1 = new ArrayList<A1672Filter>(0);
        List<A1672Filter> lst_reporte_2 = new ArrayList<A1672Filter>(0);

        A1672Filter objRtnGeneral = null;
        A1672Filter reporte_1 = null;
        A1672Filter reporte_2 = null;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        ResultSet rs02 = null;

        String SQLCLL01 = "{CALL PXSAUDIT.SQP03343(?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.VP_OPTION);
            cstmt01.setString(3, filter.VP_DATEFROM);
            cstmt01.setString(4, filter.VP_DATETO);
            cstmt01.setString(5, filter.VP_COUNTRY);
            cstmt01.setString(6, filter.VP_IATA);
            cstmt01.setString(7, filter.VP_SOURCE);

            cstmt01.execute();
            rs01 = cstmt01.getResultSet();
            ///LIST DOCUMENTS
            while (rs01.next()) {
                reporte_1 = new A1672Filter();
                reporte_1.A1672FPROC = rs01.getString("FPROCDES");
                reporte_1.CANTTOT = rs01.getInt("CANTTOT");
                reporte_1.CANTADM = rs01.getInt("CANTADM");
                reporte_1.ADMUSD = rs01.getDouble("ADMUSD");
                reporte_1.CANTADMACEP = rs01.getInt("CANTADMACEP");
                reporte_1.ADMACEPUSD = rs01.getDouble("ADMACEPUSD");
                reporte_1.CANTADMACEPORC = rs01.getDouble("CANTADMACEPORC");
                reporte_1.CANTADMRECH = rs01.getInt("CANTADMRECH");
                reporte_1.ADMRECHUSD = rs01.getDouble("ADMRECHUSD");
                reporte_1.CANTADMRECHPORC = rs01.getDouble("CANTADMRECHPORC");
                reporte_1.CANTADMREV = rs01.getInt("CANTADMREV");
                reporte_1.ADMREVUSD = rs01.getDouble("ADMREVUSD");
                reporte_1.CANTADMREVPORC = rs01.getDouble("CANTADMREVPORC");
                reporte_1.CANTADMENV = rs01.getInt("CANTADMENV");
                reporte_1.ADMENVUSD = rs01.getDouble("ADMENVUSD");
                reporte_1.CANTADMENVPORC = rs01.getDouble("CANTADMENVPORC");
                reporte_1.CANTBILLED = rs01.getInt("CANTBILLED");
                reporte_1.BILLEDUSD = rs01.getDouble("BILLEDUSD");
                reporte_1.CANTBILLEDPORC = rs01.getDouble("CANTBILLEDPORC");

                reporte_1.A1672PAIVT = rs01.getString("A1672PAIVT");
                reporte_1.A1672FUENT = rs01.getString("A1672FUENT");
                reporte_1.A1672AGENT = rs01.getString("A1672AGENT");

                reporte_1.CANTADMJUSTI = rs01.getInt("CANTADMJUSTI");
                reporte_1.CANTADMREUDITE = rs01.getInt("CANTADMREUDITE");
                reporte_1.CANTADMPENGROUP = rs01.getInt("CANTADMPENGROUP");
                reporte_1.CANTADMAUTORI = rs01.getInt("CANTADMAUTORI");
                reporte_1.CANTADMSINCLIE = rs01.getInt("CANTADMSINCLIE");
                reporte_1.CANTADMIATADISA = rs01.getInt("CANTADMIATADISA");
                reporte_1.CANTADMGDS = rs01.getInt("CANTADMGDS");
                reporte_1.CANTASR = rs01.getInt("CANTASR");
                reporte_1.CANTBSP = rs01.getInt("CANTBSP");
                reporte_1.CANTJUSTIADMREPORT = rs01.getInt("CANTJUSTIADMREPORT");

                reporte_1.CANTARC = rs01.getInt("CANTARC");
                reporte_1.CANTABSP = rs01.getInt("CANTABSP");
                reporte_1.CANTOTAL = rs01.getInt("CANTABSP") + rs01.getInt("CANTARC") + rs01.getInt("CANTASR");
                reporte_1.TOTALGROUP = rs01.getInt("CANTADMPENGROUP") + rs01.getInt("CANTADMSINCLIE") + rs01.getInt("CANTADMJUSTI") + rs01.getInt("CANTADMREUDITE") + rs01.getInt("CANTADMAUTORI") + rs01.getInt("CANTADMIATADISA");
                if (filter.VP_OPTION.equals("2")) {
                    reporte_1.A1672IATAO = rs01.getString("AGENCY");
                }
                lst_reporte_1.add(reporte_1);
            }
            ////LIST DE RAZONES 
            /*if (cstmt01.getMoreResults()) {
                rs02 = cstmt01.getResultSet();
                while (rs02.next()) {
                    reporte_2 = new A1672Filter();
                    reporte_2.A1672CCUST = rs02.getString("A3649CCUST");
                    lst_reporte_2.add(reporte_2);
                }
            }*/

            // FIN DE LA AGENCIA
            objRtnGeneral = new A1672Filter();
            objRtnGeneral.lst_reporte1 = lst_reporte_1;
            //objRtnGeneral.lst_reporte2 = lst_reporte_2;

            lstGeneral = objRtnGeneral;
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
        return lstGeneral;

    }

    public A1672Filter SearchSumaria(A1672Filter filter) throws SQLException, Exception {
        A1672Filter lstGeneral = null;
        List<A1672Filter> lst_reporte_1 = new ArrayList<A1672Filter>(0);
        List<A1672Filter> lst_reporte_2 = new ArrayList<A1672Filter>(0);

        A1672Filter objRtnGeneral = null;
        A1672Filter reporte_1 = null;
        A1672Filter reporte_2 = null;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        ResultSet rs02 = null;

        String SQLCLL01 = "{CALL PXSAUDIT.SQP03656(?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.VP_OPTION);
            cstmt01.setString(3, filter.VP_DATEFROM);
            cstmt01.setString(4, filter.VP_DATETO);
            cstmt01.setString(5, filter.VP_COUNTRY);
            cstmt01.setString(6, filter.VP_IATA);
            cstmt01.setString(7, filter.VP_SOURCE);

            cstmt01.execute();
            rs01 = cstmt01.getResultSet();
            ///LIST DOCUMENTS
            while (rs01.next()) {
                reporte_1 = new A1672Filter();
                reporte_1.A1672FPROC = rs01.getString("FPROCDES");
                reporte_1.CANTTOT = rs01.getInt("CANTTOT");
                reporte_1.CANTADM = rs01.getInt("CANTADM");
                reporte_1.ADMUSD = rs01.getDouble("ADMUSD");
                reporte_1.CANTADMACEP = rs01.getInt("CANTADMACEP");
                reporte_1.ADMACEPUSD = rs01.getDouble("ADMACEPUSD");
                reporte_1.CANTADMACEPORC = rs01.getDouble("CANTADMACEPORC");
                reporte_1.CANTADMRECH = rs01.getInt("CANTADMRECH");
                reporte_1.ADMRECHUSD = rs01.getDouble("ADMRECHUSD");
                reporte_1.CANTADMRECHPORC = rs01.getDouble("CANTADMRECHPORC");
                reporte_1.CANTADMREV = rs01.getInt("CANTADMREV");
                reporte_1.ADMREVUSD = rs01.getDouble("ADMREVUSD");
                reporte_1.CANTADMREVPORC = rs01.getDouble("CANTADMREVPORC");
                reporte_1.CANTADMENV = rs01.getInt("CANTADMENV");
                reporte_1.ADMENVUSD = rs01.getDouble("ADMENVUSD");
                reporte_1.CANTADMENVPORC = rs01.getDouble("CANTADMENVPORC");
                reporte_1.CANTBILLED = rs01.getInt("CANTBILLED");
                reporte_1.BILLEDUSD = rs01.getDouble("BILLEDUSD");
                reporte_1.CANTBILLEDPORC = rs01.getDouble("CANTBILLEDPORC");

                reporte_1.A1672PAIVT = rs01.getString("A1672PAIVT");
                reporte_1.A1672FUENT = rs01.getString("A1672FUENT");
                reporte_1.A1672AGENT = rs01.getString("A1672AGENT");

                reporte_1.CANTADMJUSTI = rs01.getInt("CANTADMJUSTI");
                reporte_1.CANTADMREUDITE = rs01.getInt("CANTADMREUDITE");
                reporte_1.CANTADMPENGROUP = rs01.getInt("CANTADMPENGROUP");
                reporte_1.CANTADMAUTORI = rs01.getInt("CANTADMAUTORI");
                reporte_1.CANTADMSINCLIE = rs01.getInt("CANTADMSINCLIE");
                reporte_1.CANTADMIATADISA = rs01.getInt("CANTADMIATADISA");
                reporte_1.CANTADMGDS = rs01.getInt("CANTADMGDS");
                reporte_1.CANTASR = rs01.getInt("CANTASR");
                reporte_1.CANTBSP = rs01.getInt("CANTBSP");
                reporte_1.CANTJUSTIADMREPORT = rs01.getInt("CANTJUSTIADMREPORT");

                reporte_1.CANTARC = rs01.getInt("CANTARC");
                reporte_1.CANTABSP = rs01.getInt("CANTABSP");
                reporte_1.CANTOTAL = rs01.getInt("CANTABSP") + rs01.getInt("CANTARC") + rs01.getInt("CANTASR");
                reporte_1.TOTALGROUP = rs01.getInt("CANTADMPENGROUP") + rs01.getInt("CANTADMSINCLIE") + rs01.getInt("CANTADMJUSTI") + rs01.getInt("CANTADMREUDITE") + rs01.getInt("CANTADMAUTORI") + rs01.getInt("CANTADMIATADISA");
                if (filter.VP_OPTION.equals("2")) {
                    reporte_1.A1672IATAO = rs01.getString("AGENCY");
                }
                lst_reporte_1.add(reporte_1);
            }
            // FIN DE LA AGENCIA
            objRtnGeneral = new A1672Filter();
            objRtnGeneral.lst_reporte1 = lst_reporte_1;
            //objRtnGeneral.lst_reporte2 = lst_reporte_2;

            lstGeneral = objRtnGeneral;
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
        return lstGeneral;

    }

    public List<SQP00911Filter> SearchDetail(A1672Filter filter) throws SQLException, Exception {
        List<SQP00911Filter> lstRtn = new ArrayList<SQP00911Filter>(0);
        SQP00911Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        int cont = 0;

        String SQLCLL01 = "{CALL PXSAUDIT.SQP03764(?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.VP_OPTION);
            cstmt01.setString(3, filter.VP_DATEFROM);
            cstmt01.setString(4, filter.VP_DATETO);
            cstmt01.setString(5, filter.VP_IATA);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new SQP00911Filter();
                objRtn.A2548FLAG = rs01.getString("A2548FLAG");
                objRtn.A2548FREGI = rs01.getString("A2548FREGI");
                objRtn.A2548CATNNTD = rs01.getInt("CANTBSP");
                objRtn.A2548CATNNTC = rs01.getInt("CANTARC");
                objRtn.A2548CATNFAC = rs01.getInt("CANTASR");
                objRtn.A2548CATNDOCUM = rs01.getInt("CANTBSP") + rs01.getInt("CANTARC") + rs01.getInt("CANTASR");
                objRtn.A2548IVACD = rs01.getDouble("USDBSP");
                objRtn.A2548IVACA = rs01.getDouble("USDARC");
                objRtn.A2548IVACS = rs01.getDouble("USDASR");
                objRtn.A2548TOTAA = rs01.getDouble("USDASR") + rs01.getDouble("USDBSP") + rs01.getDouble("USDARC");
                objRtn.A2548FLAG = rs01.getString("A2548FLAG");
                objRtn.A2548STAT = rs01.getString("A2548STAT");
                objRtn.A2548IATA = rs01.getString("A2548IATA");
                objRtn.AGENCY = rs01.getString("AGENCY");
                //NUEVOS CAMBIOS
                objRtn.CANTBSPACM = rs01.getInt("CANTBSPACM");
                objRtn.CANTARCACM = rs01.getInt("CANTARCACM");
                objRtn.CANTASRACM = rs01.getInt("CANTASRACM");
                objRtn.CANTTOTALACM = rs01.getInt("CANTTOTALACM");
                objRtn.TTIVACARGO = rs01.getDouble("TTIVACARGO");
                objRtn.TTCARGO = rs01.getDouble("TTCARGO"); 
                if (objRtn.A2548FLAG.equals("Approved") || objRtn.A2548FLAG.equals("Billed")) {
                    if (cont == 0) {
                        objRtn.PENDIGROUP = rs01.getDouble("PENDIGROUP");
                        objRtn.PENDISCLIE = rs01.getDouble("PENDISCLIE");
                        cont++;
                    } else {
                        objRtn.PENDIGROUP = 0.00;
                        objRtn.PENDISCLIE = 0.00;
                    }
                } else {
                    objRtn.PENDIGROUP = 0.00;
                    objRtn.PENDISCLIE = 0.00;
                }

                objRtn.CANTGROUP = filter.VP_GROUP;
                objRtn.CANTCLIE = filter.VP_CLIE;
                objRtn.CANTJUSTI = filter.VP_JUSTI;
                objRtn.CANTAUTORI = filter.VP_AUTORI;
                objRtn.CANTDISABLE = filter.VP_DISABLE;
                objRtn.CANTGDS = filter.VP_GDS;

                //sumas
                //DATOS GENERALS
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

    public List<SQP00911Filter> SearchReportADM(A1672Filter filter) throws SQLException, Exception {
        List<SQP00911Filter> lstRtn = new ArrayList<SQP00911Filter>(0);
        SQP00911Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PXSAUDIT.SQP03765(?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.VP_OPTION);
            cstmt01.setString(3, filter.VP_DATEFROM);
            cstmt01.setString(4, filter.VP_DATETO);
            cstmt01.setString(5, filter.VP_FLAG);
            cstmt01.setString(6, filter.VP_IATA);

            cstmt01.execute();

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

                //sumas
                //DATOS GENERALS
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

    public List<SQP00989Filter> SearchDetailPendiente(SQP00989Filter filter) throws SQLException, Exception {

        CallableStatement cs = null;
        ResultSet rst = null;
        String strSQL;
        String msjeError;
        String[] msjeError2 = new String[9];
        String msjeError3 = "";
        SQP00989Filter beanADM;
        List<SQP00989Filter> listaData = new ArrayList<SQP00989Filter>();
        List<SQP00989Filter> lstTotCurr = new ArrayList<SQP00989Filter>();

        session.getCNXIBMDB2().open();
        try {

            //  strSQL = "{CALL PXSAUDIT.SQP00990(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
            strSQL = "{CALL PXSAUDIT.SQP03787(?,?,?,?,?)}";

            cs = session.getCNXIBMDB2().getConnection().prepareCall(strSQL);

            cs.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cs.setString(2, filter.DATEFROM);
            cs.setString(3, filter.DATETO);
            cs.setString(4, filter.BOOKTO);
            cs.setString(5, filter.A1672AGENT);

            cs.execute();

            rst = cs.getResultSet();
            int pos = 0;

            while (rst.next()) {
                pos++;
                beanADM = new SQP00989Filter();
                beanADM.A1672CCUST = session.getUserView().getCustomerInfo().CCUST;
                beanADM.A1672AGENT = rst.getString("A1672AGENT").trim();
                beanADM.A1672PAIVT = rst.getString("A1672PAIVT").trim();
                beanADM.A1672FVENT = rst.getString("A1672FVENT").trim();
                beanADM.A1672FUENT = rst.getString("A1672FUENT").trim();
                beanADM.A1672CANAL = rst.getString("A1672CANAL").trim();
                beanADM.A1672NAMEF = rst.getString("AGENCY").trim();
                msjeError = rst.getString("A1580DESC2").trim();
                msjeError2 = msjeError.split(";");

                for (int i = 0; i < msjeError2.length; i++) {
                    msjeError3 += msjeError2[i] + "\n";
                }
                beanADM.A1580DESC2 = msjeError3;
                beanADM.strTicket = rst.getString("A1672CIA").trim() + " " + rst.getString("A1672FORMA").trim() + rst.getString("A1672SERIE").trim();
                beanADM.A1672CIA = rst.getString("A1672CIA").trim();
                beanADM.A1672FORMA = rst.getString("A1672FORMA").trim();
                beanADM.A1672SERIE = rst.getString("A1672SERIE").trim();
                beanADM.A1672CUPON = rst.getString("A1672CUPON");
                beanADM.A1672SEQ = rst.getString("A1672SEQ").trim();
                beanADM.A1672TRNCU = rst.getString("A1672TRNCU").trim();
                beanADM.A1672MONTT = rst.getString("A1672MNADM").trim();
                beanADM.A1672TTMIA = rst.getString("A1672TTMIA");
                beanADM.A1672TTAGT = rst.getString("A1672TTAGT");
                beanADM.A1672TTDIF = rst.getString("A1672TTDIF");
                beanADM.A1672BAGFT = rst.getString("A1672BAGFT");
                beanADM.A1672CODIT = rst.getString("A1672CODIT").trim();
                beanADM.A1672FLADM = rst.getString("A1672FLADM").trim();
                beanADM.A1672ERROR = rst.getString("A1672ERROR").trim();
                beanADM.A1672FPROC = rst.getString("A1672FPROC").trim();
                beanADM.A1672TDOC = rst.getString("A1672TDOC").trim();
                beanADM.A1672FBASI = rst.getString("A1672FBASI").trim();
                beanADM.A1672CODIT = rst.getString("A1672CODIT").trim();
                beanADM.A1672ITIN = rst.getString("A1672ITIN").trim();
                beanADM.A1672FREGI = rst.getString("A1672FREGI").trim();
                beanADM.A1672FREVI = rst.getString("A1672FREVI").trim();
                beanADM.A2657NREF = rst.getString("A1672RULNO").trim();
                beanADM.A1672FCMI = rst.getString("A1672FCMI").trim();
                beanADM.A1672PNR = rst.getString("A1672PNR").trim();
                beanADM.A1672CORREO = rst.getInt("A1672CORREO");

                listaData.add(beanADM);
                msjeError3 = "";
            }
            rst.close();
            //  }

            cs.close();

        } finally {
            if (rst != null) {
                rst.close();
            }
            if (cs != null) {
                cs.close();
            }
            // =================
            session.getCNXIBMDB2().close();
            pasarGarbageCollector();
        }
        return listaData;
    }

}
