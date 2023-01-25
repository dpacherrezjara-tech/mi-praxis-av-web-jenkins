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
import net.miatech.beans.SaleAudit.A3648Filter;
import net.miatech.beans.SaleAudit.A3652Filter;
import net.miatech.beans.SaleAudit.A3669Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.SaleAudit.A3648;
import net.miatech.praxis.SaleAudit.A3649;
import net.miatech.praxis.SaleAudit.A3652;
import net.miatech.praxis.SaleAudit.A3653;
import net.miatech.praxis.SaleAudit.A3654;
import net.miatech.praxis.SaleAudit.A3655;
import net.miatech.praxis.SaleAudit.A3660;
import net.miatech.utils.Functions;
import net.miatech.utils.TimeFormatToday;
import net.miatech.utils.WorkStation;
import org.apache.log4j.Logger;

/**
 *
 * @author zperez
 */
public class RFNDQueryDAO {

    private IServerSession session;
    private static final Logger logError = Logger.getLogger("errorLog");
    private TimeFormatToday today = new TimeFormatToday();
    private WorkStation workStation = WorkStation.getInstance();

    public RFNDQueryDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public RFNDQueryDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A3647Filter> SearchReportQueryRFND(A3647Filter filter) throws SQLException, Exception {
        List<A3647Filter> lstRtn = new ArrayList<A3647Filter>(0);
        A3647Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PXRFNDESP.SQP03097(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

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
                objRtn.TOTALCANT = rs01.getInt("CANTKO") + rs01.getInt("CANTOK") + rs01.getInt("CANTNK") + rs01.getInt("CANTPE");
                objRtn.SUMAOK = rs01.getDouble("SUMAOK");
                //BPO        
                objRtn.BPOOK = rs01.getInt("BPOOK");
                objRtn.BPOKO = rs01.getInt("BPOKO");
                objRtn.TOTALBPO = rs01.getInt("BPOOK") + rs01.getInt("BPOKO");
                // CAMBIO DE ESTATUS
                objRtn.STOEN = rs01.getInt("STOEN");
                objRtn.STORET = rs01.getInt("STORET");
                objRtn.TOTALSTO = rs01.getInt("STOEN") + rs01.getInt("STORET");
                //RFND FINANCIERO EN SABRE
                objRtn.RFNDSABRE = rs01.getInt("RFNDSABRE");
                objRtn.RFNDSABRET = rs01.getInt("RFNDSABRET");
                objRtn.TOTALSABRET = rs01.getInt("RFNDSABRE") + rs01.getInt("RFNDSABRET");
                //
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

    public List<A3648Filter> searchDetail(A3648Filter filter) throws SQLException, Exception {
        List<A3648Filter> lstRtn = new ArrayList<A3648Filter>(0);
        A3648Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PXRFNDESP.SQP04533(?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_PREME);
            cstmt01.setString(3, filter.IN_ANIO);
            cstmt01.setString(4, filter.IN_DATEFROM);
            cstmt01.setString(5, filter.IN_USER);
            cstmt01.setString(6, filter.IN_TKT);
            cstmt01.setString(7, filter.IN_IATA);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new A3648Filter();
                objRtn.A3648RN = rs01.getInt("RN");

                objRtn.A3648CCUST = rs01.getString("A3648CCUST");
                objRtn.A3648PREME = rs01.getString("A3648PREME");
                objRtn.A3648ANIO = rs01.getString("A3648ANIO");
                objRtn.A3648CIA = rs01.getString("A3648CIA");
                objRtn.A3648FORMA = rs01.getString("A3648FORMA");
                objRtn.A3648SERIE = rs01.getString("A3648SERIE");
                objRtn.A3648SEQ = rs01.getString("A3648SEQ");
                objRtn.A3648TICKET = rs01.getString("A3648CIA") + "" + rs01.getString("A3648FORMA") + "" + rs01.getString("A3648SERIE");
                objRtn.A3648CORRL = rs01.getString("A3648CORRL");

                objRtn.A3648MARCA = rs01.getString("A3648MARCA");
                objRtn.A3648SMDA = rs01.getString("A3648SMDA");
                objRtn.A3648SMDAQ = rs01.getString("A3648SMDAQ");

                objRtn.A3648STARF = rs01.getDouble("A3648STARF");
                objRtn.A3648STARQ = rs01.getDouble("A3648STARQ");
                objRtn.A3648SCOMI = rs01.getDouble("A3648SCOMI");
                objRtn.A3648SSCOM = rs01.getDouble("A3648SSCOM");
                objRtn.A3648STTAX = rs01.getDouble("A3648STTAX");
                objRtn.A3648STOTL = rs01.getDouble("A3648STOTL");
                //A720
                objRtn.A3648SPAX = rs01.getString("A3648SPAX");
                objRtn.A3648STPAX = rs01.getString("A3648STPAX");
                objRtn.A3648SIATA = rs01.getString("A3648SIATA");
                objRtn.A3648AGENCY = rs01.getString("A3648AGENCY");
                objRtn.A3648STRCU = rs01.getString("A3648STRCU");
                objRtn.A3648STDOC = rs01.getString("A3648STDOC");
                objRtn.A3648SPVTA = rs01.getString("A3648SPVTA");
                objRtn.A3648CIAI = rs01.getString("A3648CIAI");
                objRtn.A3648FORMI = rs01.getString("A3648FORMI");
                objRtn.A3648SEREI = rs01.getString("A3648SEREI");
                objRtn.A3648CARR1 = rs01.getString("A3648CARR1");
                objRtn.A3648CARR2 = rs01.getString("A3648CARR2");
                objRtn.A3648CARR3 = rs01.getString("A3648CARR3");
                objRtn.A3648CARR4 = rs01.getString("A3648CARR4");
                //XML
                objRtn.A3648XFSAL = rs01.getString("A3648XFSAL");
                objRtn.A3648XPNR = rs01.getString("A3648XPNR");
                objRtn.A3648XCPN = rs01.getString("A3648XCPN");
                objRtn.A3648XELCT = rs01.getString("A3648XELCT");
                objRtn.A3648XORIG = rs01.getString("A3648XORIG");
                objRtn.A3648XDEST = rs01.getString("A3648XDEST");
                objRtn.A3648XIDFI = rs01.getString("A3648XIDFI");
                objRtn.A3648XPAX = rs01.getString("A3648XPAX");
                objRtn.A3648XTPAX = rs01.getString("A3648XTPAX");
                objRtn.A3648XIATA = rs01.getString("A3648XIATA");
                objRtn.A3648XTRCU = rs01.getString("A3648XTRCU");
                objRtn.A3648XMDA = rs01.getString("A3648XMDA");
                objRtn.A3648XMDAQ = rs01.getString("A3648XMDAQ");
                objRtn.A3648XTARF = rs01.getDouble("A3648XTARF");
                objRtn.A3648XTARQ = rs01.getDouble("A3648XTARQ");
                objRtn.A3648XCOMI = rs01.getDouble("A3648XCOMI");
                objRtn.A3648XCOMI = rs01.getDouble("A3648XCOMI");
                objRtn.A3648XSCOM = rs01.getDouble("A3648XSCOM");
                objRtn.A3648XTTAX = rs01.getDouble("A3648XTTAX");
                objRtn.A3648XROE = rs01.getDouble("A3648XROE");
                objRtn.A3648XSTAT = rs01.getString("A3648XSTAT");
                objRtn.A3648XTOTL = rs01.getDouble("A3648XTOTL");
                objRtn.A3648XENDR = rs01.getString("A3648XENDR");
                objRtn.A3648XFARC = rs01.getString("A3648XFARC");
                objRtn.A3648XRDBE = rs01.getString("A3648XRDBE");
                objRtn.A3648XRFDB = rs01.getString("A3648XRFDB");
                objRtn.A3648XFEE = rs01.getString("A3648XFEE");
                objRtn.A3648XERES = rs01.getString("A3648XERES");
                objRtn.A3648XLKTS = rs01.getString("A3648XLKTS");
                objRtn.A3648SFW = rs01.getString("A3648SFW");
                //masivos
                objRtn.A3648TRNCM = rs01.getString("A3648TRNCM");
                objRtn.A3648MMDA = rs01.getString("A3648MMDA");
                objRtn.A3648MONTO = rs01.getDouble("A3648MONTO");
                //para la solicitud
                objRtn.A3648CPN = rs01.getString("A3648CPN");
                objRtn.A3648CPN1D = rs01.getString("A3648CPN1D");
                objRtn.A3648CPN2D = rs01.getString("A3648CPN2D");
                objRtn.A3648CPN3D = rs01.getString("A3648CPN3D");
                objRtn.A3648CPN4D = rs01.getString("A3648CPN4D");
                objRtn.A3648CPN4D = rs01.getString("A3648CPN4D");
                objRtn.A3648TRFND = rs01.getString("A3648TRFND");
                objRtn.A3648MDAD = rs01.getString("A3648MDAD");
                objRtn.A3648MDAQD = rs01.getString("A3648MDAQD");
                objRtn.A3648MDA = rs01.getString("A3648MDA");
                objRtn.A3648TARID = rs01.getDouble("A3648TARID");
                objRtn.A3648STAQD = rs01.getDouble("A3648STAQD");
                objRtn.A3648TTAXD = rs01.getDouble("A3648TTAXD");
                objRtn.A3648COMID = rs01.getDouble("A3648COMID");
                objRtn.A3648SCOMD = rs01.getDouble("A3648SCOMD");
                objRtn.A3648TOTAD = rs01.getDouble("A3648TOTAD");
                objRtn.A3648FRERQ = rs01.getString("A3648FRERQ");
                objRtn.A3648NCARD = rs01.getString("A3648NCARD");
                objRtn.A3648FLAG = rs01.getString("A3648FLAG");
                objRtn.A3648STATO = rs01.getString("A3648STATO");
                objRtn.A3648STAPG = rs01.getString("A3648STAPG");
                objRtn.A3648STUSO = rs01.getString("A3648STUSO");
                objRtn.A3648GRUPO = rs01.getString("A3648GRUPO");
                objRtn.A3648FGUPO = rs01.getString("A3648FGUPO");
                objRtn.A3648HGUPO = rs01.getString("A3648HGUPO");
                objRtn.A3648REGIS = rs01.getString("A3648REGIS");
                objRtn.A3648FREGI = rs01.getString("A3648FREGI");
                objRtn.A3648HREGI = rs01.getString("A3648HREGI");
                objRtn.A3648REVIS = rs01.getString("A3648REVIS");
                objRtn.A3648FREVI = rs01.getString("A3648FREVI");
                objRtn.A3648HREVI = rs01.getString("A3648HREVI");
                objRtn.A3648COCD = rs01.getString("A3647COCD");
                objRtn.A3648ARCD = rs01.getString("A3647ARCD");
                objRtn.A3648CODE = rs01.getString("A3649CODE");
                objRtn.A3648ERROR = rs01.getString("A3649ERROR");
                objRtn.A3648ARCHI = rs01.getString("A3649ARCHI");
                objRtn.A3648ESTADO = rs01.getString("A3648ESTADO");
                objRtn.A3648FOLIO = rs01.getString("A3647FOLIO");
                objRtn.A3648RAAG = rs01.getString("A3647RAAG");
                objRtn.A3648CONJT = rs01.getString("A3648CONJT");
                objRtn.A3648CARR5 = rs01.getString("A3648CARR5");
                objRtn.A3648CARR6 = rs01.getString("A3648CARR6");
                objRtn.A3648CARR7 = rs01.getString("A3648CARR7");
                objRtn.A3648CARR8 = rs01.getString("A3648CARR8");
                objRtn.A3648CPN5D = rs01.getString("A3648CPN5D");
                objRtn.A3648CPN6D = rs01.getString("A3648CPN6D");
                objRtn.A3648CPN7D = rs01.getString("A3648CPN7D");
                objRtn.A3648CPN8D = rs01.getString("A3648CPN8D");

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

    public A3647Filter SearchQueryRFNDetail(A3647Filter filter) throws SQLException, Exception {
        A3647Filter lstGeneral = null;
        List<A3648> lst_DOCUMENTS = new ArrayList<A3648>(0);
        List<A3649> lst_RAZON = new ArrayList<A3649>(0);

        A3647Filter objRtnGeneral = null;
        A3648 objlst_DOCUMENTS = null;
        A3649 objlst_RAZON = null;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        ResultSet rs02 = null;

        String SQLCLL01 = "{CALL LIBSAP26.SQP03098(?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_CIA);
            cstmt01.setString(3, filter.IN_PREME);
            cstmt01.setString(4, filter.IN_DATEFROM);
            cstmt01.setString(5, filter.IN_ANIO);
            cstmt01.execute();
            rs01 = cstmt01.getResultSet();
            ///LIST DOCUMENTS
            /*while (rs01.next()) {
                objlst_DOCUMENTS = new A3648();
                objlst_DOCUMENTS.A3648CCUST = rs01.getString("A3648CCUST");
                objlst_DOCUMENTS.A3648CIA = rs01.getString("A3648CIA");
                objlst_DOCUMENTS.A3648FORMA = rs01.getString("A3648FORMA");
                objlst_DOCUMENTS.A3648SERIE = rs01.getString("A3648SERIE");
                objlst_DOCUMENTS.A3648SEQ = rs01.getString("A3648SEQ");
                objlst_DOCUMENTS.A3648CORRL = rs01.getString("A3648CORRL");
                objlst_DOCUMENTS.A3648TKT = rs01.getString("A3648CIA") + "" + rs01.getString("A3648FORMA") + "" + rs01.getString("A3648SERIE");
                objlst_DOCUMENTS.A3648PREME = rs01.getString("A3648PREME");
                objlst_DOCUMENTS.A3648TIDOC = rs01.getString("A3648TIDOC");
                objlst_DOCUMENTS.A3648CIAI = rs01.getString("A3648CIAI");
                objlst_DOCUMENTS.A3648FORMI = rs01.getString("A3648FORMI");
                objlst_DOCUMENTS.A3648SEREI = rs01.getString("A3648SEREI");
                objlst_DOCUMENTS.A3648FLAG = rs01.getString("A3648FLAG");
                objlst_DOCUMENTS.A3648FEE = rs01.getString("A3648FEE");
                objlst_DOCUMENTS.A3648PAIVTA = rs01.getString("A3648AIVTA");

                objlst_DOCUMENTS.A3648FVNTA = rs01.getString("A3648FSALE");
                objlst_DOCUMENTS.A3648PNR = rs01.getString("A3648PNR");
                objlst_DOCUMENTS.A3648CUPON = rs01.getString("A3648CUPON");
                objlst_DOCUMENTS.A3648ELECT = rs01.getString("A3648ELECT");
                objlst_DOCUMENTS.A3648ORIGE = rs01.getString("A3648ORIGE");
                objlst_DOCUMENTS.A3648DESTI = rs01.getString("A3648DESTI");
                objlst_DOCUMENTS.A3648IDFIS = rs01.getString("A3648IDFIS");
                objlst_DOCUMENTS.A3648PAX = rs01.getString("A3648PAX");
                objlst_DOCUMENTS.A3648TPAX = rs01.getString("A3648TPAX");
                objlst_DOCUMENTS.A3648IATA = rs01.getString("A3648IATA");
                objlst_DOCUMENTS.A3648TRNCU = rs01.getString("A3648TRNCU");
                objlst_DOCUMENTS.A3648MDA = rs01.getString("A3648MDA");

                objlst_DOCUMENTS.A3648STATU = rs01.getString("A3648STATU");
                objlst_DOCUMENTS.A3648ENDOR = rs01.getString("A3648ENDOR");
                objlst_DOCUMENTS.A3648FAREC = rs01.getString("A3648FAREC");
                objlst_DOCUMENTS.A3648FRERQ = rs01.getString("A3648FRERQ");
                objlst_DOCUMENTS.A3648REGRQ = rs01.getString("A3648REGRQ");

                objlst_DOCUMENTS.A3648CPN1 = rs01.getString("A3648CPN1");
                objlst_DOCUMENTS.A3648CPN2 = rs01.getString("A3648CPN2");
                objlst_DOCUMENTS.A3648CPN3 = rs01.getString("A3648CPN3");
                objlst_DOCUMENTS.A3648CPN4 = rs01.getString("A3648CPN4");
                objlst_DOCUMENTS.A3648TRFND = rs01.getString("A3648TRFND");

                objlst_DOCUMENTS.A3648REGIS = rs01.getString("A3648REGIS");
                objlst_DOCUMENTS.A3648FREGI = rs01.getString("A3648FREGI");
                objlst_DOCUMENTS.A3648HREGI = rs01.getString("A3648HREGI");
                objlst_DOCUMENTS.A3648REVIS = rs01.getString("A3648REVIS");
                objlst_DOCUMENTS.A3648FREVI = rs01.getString("A3648FREVI");
                objlst_DOCUMENTS.A3648HREVI = rs01.getString("A3648HREVI");
                objlst_DOCUMENTS.A3648RFNDB = rs01.getString("A3648RFNDB");
                objlst_DOCUMENTS.A3648ANIO = rs01.getString("A3648ANIO");
                objlst_DOCUMENTS.A3648MARCA = rs01.getString("A3648MARCA");
                objlst_DOCUMENTS.A3648STFIN = rs01.getString("A3648STFIN");
                objlst_DOCUMENTS.A3648STATO = rs01.getString("A3648STATO");
                //AGENCIA
                objlst_DOCUMENTS.A3648TARIF = rs01.getDouble("A3648TARIF");
                objlst_DOCUMENTS.A3648TARIQ = rs01.getDouble("A3648TARIQ");
                objlst_DOCUMENTS.A3648COMIS = rs01.getDouble("A3648COMIS");
                objlst_DOCUMENTS.A3648SCOM = rs01.getDouble("A3648SCOM");
                objlst_DOCUMENTS.A3648TTAX = rs01.getDouble("A3648TTAX");
                objlst_DOCUMENTS.A3648ROE = rs01.getDouble("A3648ROE");
                objlst_DOCUMENTS.A3648TOTAL = rs01.getDouble("A3648TOTAL");
                ///AM

                objlst_DOCUMENTS.A3648TARID = rs01.getDouble("A3648TARID");
                objlst_DOCUMENTS.A3648TTAXD = rs01.getDouble("A3648TTAXD");
                objlst_DOCUMENTS.A3648COMID = rs01.getDouble("A3648COMID");
                objlst_DOCUMENTS.A3648SCOMD = rs01.getDouble("A3648SCOMD");
                objlst_DOCUMENTS.A3648TOTAD = rs01.getDouble("A3648TOTAD");
                lst_DOCUMENTS.add(objlst_DOCUMENTS);
            }
            ////LIST DE RAZONES 
            if (cstmt01.getMoreResults()) {
                rs02 = cstmt01.getResultSet();
                while (rs02.next()) {
                    objlst_RAZON = new A3649();
                    objlst_RAZON.A3649CCUST = rs02.getString("A3649CCUST");
                    objlst_RAZON.A3649PREME = rs02.getString("A3649PREME");
                    objlst_RAZON.A3649CORRL = rs02.getString("A3649CORRL");
                    objlst_RAZON.A3649FLAG = rs02.getString("A3649FLAG");
                    objlst_RAZON.A3649TYPE = rs02.getString("A3649TYPE");
                    objlst_RAZON.A3649BASE = rs02.getString("A3649BASE");
                    objlst_RAZON.A3649CODE = rs02.getString("A3649CODE");
                    objlst_RAZON.A3649ERROR = rs02.getString("A3649ERROR");
                    objlst_RAZON.A3649ARCHI = rs02.getString("A3649ARCHI");
                    objlst_RAZON.A3649REGRQ = rs02.getString("A3649REGRQ");
                    objlst_RAZON.A3649FRERQ = rs02.getString("A3649FRERQ");
                    objlst_RAZON.A3649REGIS = rs02.getString("A3649REGIS");
                    objlst_RAZON.A3649FREGI = rs02.getString("A3649FREGI");
                    objlst_RAZON.A3649HREGI = rs02.getString("A3649HREGI");
                    lst_RAZON.add(objlst_RAZON);
                }
            }*/

            // FIN DE LA AGENCIA
            objRtnGeneral = new A3647Filter();
            objRtnGeneral.lst_DOCUMENTS = lst_DOCUMENTS;
            objRtnGeneral.lst_RAZON = lst_RAZON;

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

    public String ProcesaMantenimiento(A3647Filter beanGuardarA3389) throws SQLException, Exception {
        CallableStatement cs = null;
        ResultSet rst = null;
        String strSQL;
        String STR_RESULT = "";

        session.getCNXIBMDB2().open();
        try {
            String SQLCLL01 = "{CALL LIBSAP26.SQP03102(?,?,?,?,?,?,?)}";//SQP02515
            cs = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);

            cs.setString("IN_CCUST", session.getUserView().getCustomerInfo().CCUST);
            cs.setString("IN_PREME", beanGuardarA3389.IN_PREME);
            cs.setString("IN_ANIO", beanGuardarA3389.IN_ANIO);//FALTA
            cs.setString("IN_STATUS", beanGuardarA3389.IN_STATUS);
            cs.setString("IN_REGIS", session.getUserView().getUserInfo().USR);
            cs.setString("IN_FREGI", Functions.getFechaActual());
            cs.setString("IN_HREGI", Functions.getHoraActual());
            cs.execute();

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

    public String ProcesaManualRFNDTCKT(A3648Filter filter, String lstaTaxes, String lstaRazones, String lstafop) throws SQLException, Exception {
        CallableStatement cs = null;
        CallableStatement cs2 = null;
        ResultSet rst = null;
        ResultSet rst2 = null;
        String strSQL;
        String STR_RESULT = "";
        session.getCNXIBMDB2().open();
        try {
            String SQLCLL01 = "{CALL PXRFNDESP.SQP03104(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";//SQP02515
            String SQLCLL02 = "{CALL PXRFNDESP.SQP04572(?,?,?)}";
            cs = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);

            cs.setString("IN_CCUST", session.getUserView().getCustomerInfo().CCUST);
            cs.setString("IN_FOLIO", filter.IN_FOLIO);
            cs.setString("IN_COUNTRY", filter.IN_COUNTRY);
            cs.setString("IN_CORRL", filter.IN_CORRL);
            cs.setString("IN_PREME", filter.IN_PREME);
            cs.setString("IN_ANIO", filter.IN_ANIO);
            cs.setString("IN_CIA", filter.IN_CIA);
            cs.setString("IN_FORMA", filter.IN_FORMA);
            cs.setString("IN_SERIE", filter.IN_SERIE);
            cs.setString("IN_SEQ", filter.IN_SEQ);
            cs.setDouble("IN_TARIF", filter.IN_TARIF);
            cs.setString("IN_MDA", filter.IN_MDA);
            cs.setDouble("IN_TARIFEQUI", filter.IN_TARIFEQUI);
            cs.setString("IN_MDAEQUI", filter.IN_MDAEQUI);
            cs.setDouble("IN_TTAX", filter.IN_TTAX);
            cs.setDouble("IN_COMMI", filter.IN_COMMI);
            cs.setDouble("IN_TOTALRFND", filter.IN_TOTALRFND);
            cs.setString("IN_STATUS", filter.IN_STATUS);
            cs.setString("IN_CONJU", filter.IN_CONJU);
            cs.setString("IN_MARCA", filter.IN_MARCA);
            cs.setString("IN_CPN1", filter.IN_CPN1);
            cs.setString("IN_CPN2", filter.IN_CPN2);
            cs.setString("IN_CPN3", filter.IN_CPN3);
            cs.setString("IN_CPN4", filter.IN_CPN4);
            cs.setString("IN_CPN5", filter.IN_CPN5);
            cs.setString("IN_CPN6", filter.IN_CPN6);
            cs.setString("IN_CPN7", filter.IN_CPN7);
            cs.setString("IN_CPN8", filter.IN_CPN8);
            cs.setString("IN_TRFND", filter.IN_TRFND);
            cs.setString("IN_LSTATaxes", lstaTaxes);
            cs.setString("IN_LSTARazones", lstaRazones);
            cs.setString("IN_LSTAfop", lstafop);
            cs.setString("IN_REGIS", session.getUserView().getUserInfo().USR);
            cs.setString("IN_FREGI", Functions.getFechaActual());
            cs.setString("IN_HREGI", Functions.getHoraActual());
            cs.execute();

            rst = cs.getResultSet();

            while (rst.next()) {
                STR_RESULT = rst.getString("VMESSAGE");
                if (rst.getString("VMESSAGE").equals("RECORD INSERTED")) {
                    cs2 = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL02);
                    cs2.setString(1, session.getUserView().getCustomerInfo().CCUST);
                    cs2.setString(2, filter.IN_PREME);
                    cs2.setString(3, filter.IN_ANIO);
                    cs2.execute();
                    rst2 = cs2.getResultSet();
                    while (rst2.next()) {
                        STR_RESULT = rst2.getString("VMESSAGE");
                    }
                    cs2.close();
                }
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

    public A3647Filter SearchQueryRFNDetailTCKT(A3647Filter filter) throws SQLException, Exception {
        A3647Filter lstGeneral = null;
        List<A3648> lst_DOCUMENTS = new ArrayList<A3648>(0);
        List<A3649> lst_RAZON = new ArrayList<A3649>(0);

        List<A3652> TEM_TAXESAGEN = new ArrayList<A3652>(0);
        List<A3652> TEM_TAXESAM = new ArrayList<A3652>(0);
        List<A3653> TEM_CARD = new ArrayList<A3653>(0);
        List<A3654> TEM_COUPNS = new ArrayList<A3654>(0);
        List<A3655> TEM_HISTORY = new ArrayList<A3655>(0);
        List<A3660> lst_USOS = new ArrayList<A3660>(0);

        A3647Filter objRtnGeneral = null;
        A3648 objlst_DOCUMENTS = null;
        A3649 objlst_RAZON = null;
        A3660 objlst_USOS = null;

        A3652 objlst_TAXESAGEN = null;
        A3652 objlst_TAXESAM = null;
        A3653 objlst_CARD = null;
        A3654 objlst_COUPNS = null;
        A3655 objlst_HISTORY = null;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        ResultSet rs02 = null;
        ResultSet rs03 = null;
        ResultSet rs04 = null;
        ResultSet rs05 = null;
        ResultSet rs06 = null;
        ResultSet rs07 = null;

        String SQLCLL01 = "{CALL PXRFNDESP.SQP03105(?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_PREME);
            cstmt01.setString(3, filter.IN_ANIO);
            cstmt01.setString(4, filter.IN_CIA);
            cstmt01.setString(5, filter.IN_FORMA);
            cstmt01.setString(6, filter.IN_SERIE);
            cstmt01.setString(7, filter.IN_SEQ);
            cstmt01.setString(8, filter.IN_CORRL);

            cstmt01.execute();
            rs01 = cstmt01.getResultSet();
            ////LIST TAXES 
            while (rs01.next()) {
                objlst_TAXESAGEN = new A3652();
                objlst_TAXESAGEN.A3652CCUST = rs01.getString("A3652CCUST");
                objlst_TAXESAGEN.A3652CIA = rs01.getString("A3652CIA");
                objlst_TAXESAGEN.A3652FORMA = rs01.getString("A3652FORMA");
                objlst_TAXESAGEN.A3652SERIE = rs01.getString("A3652SERIE");
                objlst_TAXESAGEN.A3652SEQ = rs01.getString("A3652SEQ");
                objlst_TAXESAGEN.A3652CORRL = rs01.getString("A3652CORRL");
                objlst_TAXESAGEN.A3652CDTAX = rs01.getString("A3652CDTAX");
                //objlst_TAXESAGEN.A3652MONEQ = rs01.getString("A3652MONEQ");
                objlst_TAXESAGEN.A3652MONED = rs01.getString("A3652MONED");
                objlst_TAXESAGEN.A3652PAIS = rs01.getString("A3652PAIS");
                objlst_TAXESAGEN.A3652TPTAX = rs01.getString("A3652TPTAX");
                objlst_TAXESAGEN.A3652CTRL = rs01.getString("A3652CTRL");
                objlst_TAXESAGEN.A3652APFC = rs01.getString("A3652APFC");
                objlst_TAXESAGEN.A3652STAT = rs01.getString("A3652STAT");
                objlst_TAXESAGEN.A3652ERROR = rs01.getString("A3652ERROR");
                objlst_TAXESAGEN.A3652PREME = rs01.getString("A3652PREME");
                objlst_TAXESAGEN.A3652ANIO = rs01.getString("A3652ANIO");
                objlst_TAXESAGEN.A3652TYPE = rs01.getString("A3652TYPE");
                objlst_TAXESAGEN.A3652TXMIA = rs01.getDouble("A3652TXMIA");
                objlst_TAXESAGEN.A3652TXDIF = rs01.getDouble("A3652TXDIF");

                TEM_TAXESAGEN.add(objlst_TAXESAGEN);
            }
            ////LIST Card Type
            if (cstmt01.getMoreResults()) {
                rs02 = cstmt01.getResultSet();
                while (rs02.next()) {
                    objlst_CARD = new A3653();
                    objlst_CARD.A3653CCUST = rs02.getString("A3653CCUST");
                    objlst_CARD.A3653CIA = rs02.getString("A3653CIA");
                    objlst_CARD.A3653FORMA = rs02.getString("A3653FORMA");
                    objlst_CARD.A3653SERIE = rs02.getString("A3653SERIE");
                    objlst_CARD.A3653SEQ = rs02.getString("A3653SEQ");
                    objlst_CARD.A3653CFOP = rs02.getString("A3653CFOP");
                    objlst_CARD.A3653TYCAR = rs02.getString("A3653TYCAR");
                    objlst_CARD.A3653CUR = rs02.getString("A3653CUR");
                    objlst_CARD.A3653NTARJ = rs02.getString("A3653NTARJ");
                    objlst_CARD.A3653FEXP = rs02.getString("A3653FEXP");
                    objlst_CARD.A3653CAPL = rs02.getString("A3653CAPL");
                    objlst_CARD.A3653PREME = rs02.getString("A3653PREME");
                    objlst_CARD.A3653ANIO = rs02.getString("A3653ANIO");
                    objlst_CARD.A3653CORRL = rs02.getString("A3653CORRL");
                    objlst_CARD.A3653TYPE = rs02.getString("A3653TYPE");
                    objlst_CARD.A3653MONTO = rs02.getDouble("A3653MONTO");
                    objlst_CARD.A3653MONTE = rs02.getDouble("A3653MONTE");
                    objlst_CARD.A3653TOTAL = rs02.getDouble("A3653TOTAL");
                    TEM_CARD.add(objlst_CARD);
                }
            }
            ////LISTA DE CUPONES IN_XMLLISCOUPNS 
            if (cstmt01.getMoreResults()) {
                rs03 = cstmt01.getResultSet();
                while (rs03.next()) {
                    objlst_COUPNS = new A3654();
                    objlst_COUPNS.A3654CCUST = rs03.getString("A3654CCUST");
                    objlst_COUPNS.A3648CIA = rs03.getString("A3654CIA");
                    objlst_COUPNS.A3648FORMA = rs03.getString("A3654FORMA");
                    objlst_COUPNS.A3648SERIE = rs03.getString("A3654SERIE");
                    objlst_COUPNS.A3648SEQ = rs03.getString("A3654SEQ");
                    objlst_COUPNS.A3654CPN = rs03.getString("A3654CPN");
                    objlst_COUPNS.A3654MARKE = rs03.getString("A3654MARKE");
                    objlst_COUPNS.A3654NFLGH = rs03.getString("A3654NFLGH");
                    objlst_COUPNS.A3654CLAS = rs03.getString("A3654CLAS");
                    objlst_COUPNS.A3654FBASI = rs03.getString("A3654FBASI");
                    objlst_COUPNS.A3654ORIGE = rs03.getString("A3654ORIGE");
                    objlst_COUPNS.A3654FORIG = rs03.getString("A3654FORIG");
                    objlst_COUPNS.A3654HORIG = rs03.getString("A3654HORIG");
                    objlst_COUPNS.A3654DESTI = rs03.getString("A3654DESTI");
                    objlst_COUPNS.A3654FDEST = rs03.getString("A3654FDEST");
                    objlst_COUPNS.A3654HDEST = rs03.getString("A3654HDEST");
                    objlst_COUPNS.A3654BOOKI = rs03.getString("A3654BOOKI");
                    objlst_COUPNS.A3654CURS1 = rs03.getString("A3654CURS1");
                    objlst_COUPNS.A3654CURS2 = rs03.getString("A3654CURS2");
                    objlst_COUPNS.A3654CURS3 = rs03.getString("A3654CURS3");
                    objlst_COUPNS.A3654CURS4 = rs03.getString("A3654CURS4");
                    objlst_COUPNS.A3654PROVI = rs03.getString("A3654PROVI");
                    objlst_COUPNS.A3654BAGAL = rs03.getString("A3654BAGAL");
                    objlst_COUPNS.A3654STOP = rs03.getString("A3654STOP");
                    objlst_COUPNS.A3654USE1 = rs03.getString("A3654USE1");
                    objlst_COUPNS.A3654USE2 = rs03.getString("A3654USE2");
                    objlst_COUPNS.A3654USE3 = rs03.getString("A3654USE3");
                    objlst_COUPNS.A3654MONTO = rs03.getDouble("A3654MONTO");
                    objlst_COUPNS.A3654FAREC = rs03.getString("A3654FAREC");
                    objlst_COUPNS.A3654DESIG = rs03.getString("A3654DESIG");
                    objlst_COUPNS.A3654PREME = rs03.getString("A3654PREME");
                    objlst_COUPNS.A3654ANIO = rs03.getString("A3654ANIO");
                    objlst_COUPNS.A3654CORRL = rs03.getString("A3654CORRL");
                    objlst_COUPNS.A3654TYPE = rs03.getString("A3654TYPE");
                    objlst_COUPNS.A3654FLAG = rs03.getString("A3654FLAG");
                    TEM_COUPNS.add(objlst_COUPNS);
                }
            }
            ////LISTA DE HISTORIAL IN_XMLHISTORY
            if (cstmt01.getMoreResults()) {
                rs04 = cstmt01.getResultSet();
                while (rs04.next()) {
                    objlst_HISTORY = new A3655();
                    objlst_HISTORY.A3655CCUST = rs04.getString("A3655CCUST");

                    objlst_HISTORY.A3655CIA = rs04.getString("A3655CIA");
                    objlst_HISTORY.A3655FORMA = rs04.getString("A3655FORMA");
                    objlst_HISTORY.A3655SERIE = rs04.getString("A3655SERIE");
                    objlst_HISTORY.A3655SEQ = rs04.getString("A3655SEQ");
                    objlst_HISTORY.A3655CPN = rs04.getString("A3655CPN");
                    objlst_HISTORY.A3655PROVI = rs04.getString("A3655PROVI");
                    objlst_HISTORY.A3655WORKL = rs04.getString("A3655WORKL");
                    objlst_HISTORY.A3655HOMEL = rs04.getString("A3655HOMEL");
                    objlst_HISTORY.A3655DATE = rs04.getString("A3655DATE");
                    objlst_HISTORY.A3655HDAT1 = rs04.getString("A3655HDAT1");
                    objlst_HISTORY.A3655INPUT = rs04.getString("A3655INPUT");
                    objlst_HISTORY.A3655SUPPO = rs04.getString("A3655SUPPO");
                    objlst_HISTORY.A3655OLDRE = rs04.getString("A3655OLDRE");
                    objlst_HISTORY.A3655PURGE = rs04.getString("A3655PURGE");
                    objlst_HISTORY.A3655STATU = rs04.getString("A3655STATU");
                    objlst_HISTORY.A3655CHIST = rs04.getString("A3655CHIST");
                    objlst_HISTORY.A3655PREME = rs04.getString("A3655PREME");
                    objlst_HISTORY.A3655CORRL = rs04.getString("A3655CORRL");
                    objlst_HISTORY.A3655TYPE = rs04.getString("A3655TYPE");
                    objlst_HISTORY.A3655REGIS = rs04.getString("A3655REGIS");
                    objlst_HISTORY.A3655FREGI = rs04.getString("A3655FREGI");
                    objlst_HISTORY.A3655HREGI = rs04.getString("A3655HREGI");
                    TEM_HISTORY.add(objlst_HISTORY);
                }
            }
            ////LISTA DE RAZONES TICKTES
            if (cstmt01.getMoreResults()) {
                rs05 = cstmt01.getResultSet();
                while (rs05.next()) {
                    objlst_RAZON = new A3649();
                    objlst_RAZON.A3649CCUST = rs05.getString("A3656CCUST");
                    objlst_RAZON.A3649PREME = rs05.getString("A3656PREME");
                    objlst_RAZON.A3649ANIO = rs05.getString("A3656ANIO");
                    objlst_RAZON.A3659CIA = rs05.getString("A3656CIA");
                    objlst_RAZON.A3659FORMA = rs05.getString("A3656FORMA");
                    objlst_RAZON.A3659SERIE = rs05.getString("A3656SERIE");
                    objlst_RAZON.A3659SEQ = rs05.getString("A3656SEQ");
                    objlst_RAZON.A3649CORRL = rs05.getString("A3656CORRL");
                    objlst_RAZON.A3649TYPE = rs05.getString("A3656TYPE");
                    objlst_RAZON.A3649BASE = rs05.getString("A3656BASE");
                    objlst_RAZON.A3649CODE = rs05.getString("A3656CODE");
                    objlst_RAZON.A3649FAMIL = rs05.getString("A3656FAMIL");
                    objlst_RAZON.A3649ERROR = rs05.getString("A3656ERROR");
                    objlst_RAZON.A3649REGIS = rs05.getString("A3656REGIS");
                    objlst_RAZON.A3649FREGI = rs05.getString("A3656FREGI");
                    objlst_RAZON.A3649HREGI = rs05.getString("A3656HREGI");
                    lst_RAZON.add(objlst_RAZON);
                }
            }
            ////LISTA USOS SABRE
            if (cstmt01.getMoreResults()) {
                rs06 = cstmt01.getResultSet();
                while (rs06.next()) {
                    objlst_USOS = new A3660();
                    objlst_USOS.A3660CCUST = rs06.getString("A3660CCUST");
                    objlst_USOS.A3660PREME = rs06.getString("A3660PREME");
                    objlst_USOS.A3660ANIO = rs06.getString("A3660ANIO");
                    objlst_USOS.A3660CIA = rs06.getString("A3660CIA");
                    objlst_USOS.A3660FORMA = rs06.getString("A3660FORMA");
                    objlst_USOS.A3660SERIE = rs06.getString("A3660SERIE");
                    objlst_USOS.A3660SEQ = rs06.getString("A3660SEQ");
                    objlst_USOS.A3660CORRL = rs06.getString("A3660CORRL");
                    objlst_USOS.A3660TICKT = rs06.getString("A3660TICKT");
                    objlst_USOS.A3660CPN = rs06.getString("A3660CPN");
                    objlst_USOS.A3660FCAMB = rs06.getString("A3660FCAMB");

                    objlst_USOS.A3660HCAMB = rs06.getString("A3660HCAMB");
                    objlst_USOS.A3660CODE = rs06.getString("A3660CODE");
                    objlst_USOS.A3660STINI = rs06.getString("A3660STINI");
                    objlst_USOS.A3660STFIN = rs06.getString("A3660STFIN");
                    objlst_USOS.A3660FLAG = rs06.getString("A3660FLAG");
                    objlst_USOS.A3660REGIS = rs06.getString("A3660REGIS");
                    objlst_USOS.A3660FREGI = rs06.getString("A3660FREGI");
                    objlst_USOS.A3660HREGI = rs06.getString("A3660HREGI");

                    lst_USOS.add(objlst_USOS);
                }
            }
            ////LISTA DE BOLETOS REPETIDOS 
            if (cstmt01.getMoreResults()) {
                rs07 = cstmt01.getResultSet();
                while (rs07.next()) {
                    objlst_DOCUMENTS = new A3648();
                    objlst_DOCUMENTS.A3648CCUST = rs07.getString("A3648CCUST");

                    lst_DOCUMENTS.add(objlst_DOCUMENTS);
                }
            }

            // FIN DE LA AGENCIA
            objRtnGeneral = new A3647Filter();
            objRtnGeneral.lst_TAXESAGEN = TEM_TAXESAGEN;
            objRtnGeneral.lst_Card = TEM_CARD;
            objRtnGeneral.LIS_COUPNS = TEM_COUPNS;
            objRtnGeneral.LIS_HISTORY = TEM_HISTORY;
            objRtnGeneral.lst_RAZON = lst_RAZON;
            objRtnGeneral.lst_USOS = lst_USOS;
            objRtnGeneral.lst_DOCUMENTS = lst_DOCUMENTS;

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

    public A3647Filter ProcesaUpdateUsosCPN(A3647Filter filter) throws SQLException, Exception {
        A3647Filter lstGeneral = null;
        List<A3660> lst_USOS = new ArrayList<A3660>(0);

        A3647Filter objRtnGeneral = null;
        A3660 objlst_USOS = null;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PXRFNDESP.SQP04576(?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_PREME);
            cstmt01.setString(3, filter.IN_ANIO);
            cstmt01.setString(4, filter.IN_CIA);
            cstmt01.setString(5, filter.IN_FORMA);
            cstmt01.setString(6, filter.IN_SERIE);
            cstmt01.setString(7, filter.IN_SEQ);
            cstmt01.setString(8, filter.IN_CORRL);
            cstmt01.execute();
            rs01 = cstmt01.getResultSet();
            ///LIST DOCUMENTS
            while (rs01.next()) {
                objlst_USOS = new A3660();
                objlst_USOS.A3660CCUST = rs01.getString("A3660CCUST");
                objlst_USOS.A3660PREME = rs01.getString("A3660PREME");
                objlst_USOS.A3660ANIO = rs01.getString("A3660ANIO");
                objlst_USOS.A3660CIA = rs01.getString("A3660CIA");
                objlst_USOS.A3660FORMA = rs01.getString("A3660FORMA");
                objlst_USOS.A3660SERIE = rs01.getString("A3660SERIE");
                objlst_USOS.A3660SEQ = rs01.getString("A3660SEQ");
                objlst_USOS.A3660CORRL = rs01.getString("A3660CORRL");
                objlst_USOS.A3660TICKT = rs01.getString("A3660TICKT");
                objlst_USOS.A3660CPN = rs01.getString("A3660CPN");
                objlst_USOS.A3660FCAMB = rs01.getString("A3660FCAMB");

                objlst_USOS.A3660HCAMB = rs01.getString("A3660HCAMB");
                objlst_USOS.A3660CODE = rs01.getString("A3660CODE");
                objlst_USOS.A3660STINI = rs01.getString("A3660STINI");
                objlst_USOS.A3660STFIN = rs01.getString("A3660STFIN");
                objlst_USOS.A3660FLAG = rs01.getString("A3660FLAG");
                objlst_USOS.A3660REGIS = rs01.getString("A3660REGIS");
                objlst_USOS.A3660FREGI = rs01.getString("A3660FREGI");
                objlst_USOS.A3660HREGI = rs01.getString("A3660HREGI");

                lst_USOS.add(objlst_USOS);
            }
            // FIN DE LA AGENCIA
            objRtnGeneral = new A3647Filter();
            objRtnGeneral.lst_USOS = lst_USOS;

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

    public String ProcesaDeleteTAXManual(A3652Filter filter) throws SQLException, Exception {
        CallableStatement cs = null;
        ResultSet rst = null;
        String strSQL;
        String STR_RESULT = "";

        session.getCNXIBMDB2().open();
        try {
            String SQLCLL01 = "{CALL PXRFNDESP.SQP03458(?,?,?,?,?,?,?,?,?)}";
            cs = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);

            cs.setString("IN_CCUST", session.getUserView().getCustomerInfo().CCUST);
            cs.setString("IN_OPTION", filter.IN_OPTION);
            cs.setString("IN_A3652CIA", filter.A3652CIA);
            cs.setString("IN_A3652FORMA", filter.A3652FORMA);
            cs.setString("IN_A3652SERIE", filter.A3652SERIE);
            cs.setString("IN_A3652SEQ", filter.A3652SEQ);
            cs.setString("IN_A3652CORRL", filter.A3652CORRL);
            cs.setString("IN_A3652PREME", filter.A3652PREME);
            cs.setString("IN_A3652ANIO", filter.A3652ANIO);

            cs.execute();

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

    public List<A3669Filter> SearchDetailError(A3669Filter filter) throws SQLException, Exception {
        List<A3669Filter> lstRtn = new ArrayList<A3669Filter>(0);
        A3669Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PXRFNDESP.SQP04648(?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_PREME);
            cstmt01.setString(3, filter.IN_ANIO);
            cstmt01.setString(4, filter.IN_CIA);
            cstmt01.setString(5, filter.IN_FORMA);
            cstmt01.setString(6, filter.IN_SERIE);
            cstmt01.setString(7, filter.IN_SEQ);
            cstmt01.setString(8, filter.IN_CORRL);
            cstmt01.execute();
            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new A3669Filter();

                objRtn.A3669CCUST = rs01.getString("A3669CCUST");
                objRtn.A3669PREME = rs01.getString("A3669PREME");
                objRtn.A3669ANIO = rs01.getString("A3669ANIO");
                objRtn.A3669CORR = rs01.getString("A3669CORR");
                objRtn.A3669SEQ = rs01.getString("A3669SEQ");
                objRtn.A3669FLAG = rs01.getString("A3669FLAG");
                objRtn.A3669DESC = rs01.getString("A3669DESC");
                objRtn.A3669REGIS = rs01.getString("A3669REGIS");
                objRtn.A3669FREGI = rs01.getString("A3669FREGI");
                objRtn.A3669HREGI = rs01.getString("A3669HREGI");
                objRtn.A3669REVIS = rs01.getString("A3669REVIS");
                objRtn.A3669FREVI = rs01.getString("A3669FREVI");
                objRtn.A3669HREVI = rs01.getString("A3669HREVI");

                lstRtn.add(objRtn);

                //System.out.println("Aqui entro con Filtro Categoria: " +lstRtn);
            }
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
