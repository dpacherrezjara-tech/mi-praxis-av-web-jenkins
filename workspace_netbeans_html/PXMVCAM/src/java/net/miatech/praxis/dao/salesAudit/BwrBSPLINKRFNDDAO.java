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
import net.miatech.beans.SaleAudit.A3389Filter;
import net.miatech.beans.SaleAudit.A3402Filter;
import net.miatech.beans.SaleAudit.A3404Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.SaleAudit.A3391;
import net.miatech.praxis.SaleAudit.A3392;
import net.miatech.praxis.SaleAudit.A3401;
import net.miatech.praxis.SaleAudit.A3402;
import net.miatech.praxis.SaleAudit.A3403;
import net.miatech.praxis.SaleAudit.A3407;
import net.miatech.praxis.SaleAudit.A3408;
import net.miatech.praxis.classes.ProMail;
import net.miatech.utils.TimeFormatToday;
import net.miatech.utils.WorkStation;
import net.miatech.utils.Functions;
import org.apache.commons.lang.StringEscapeUtils;
import org.apache.log4j.Logger;

/**
 *
 * @author lremicio
 */
public class BwrBSPLINKRFNDDAO {

    private IServerSession session;
    private static final Logger logError = Logger.getLogger("errorLog");
    private TimeFormatToday today = new TimeFormatToday();
    private WorkStation workStation = WorkStation.getInstance();

    public BwrBSPLINKRFNDDAO() {

    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public BwrBSPLINKRFNDDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A3389Filter> SearchReportQueryRFND(A3389Filter filter) throws SQLException, Exception {
        List<A3389Filter> lstRtn = new ArrayList<A3389Filter>(0);
        A3389Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PXSAUDIT.SQP02512(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.registerOutParameter(14, Types.INTEGER);
            cstmt01.registerOutParameter(15, Types.INTEGER);
            cstmt01.registerOutParameter(16, Types.INTEGER);
            cstmt01.registerOutParameter(17, Types.INTEGER);

            cstmt01.setString(1, filter.IN_OPTION);
            cstmt01.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(3, filter.IN_CIA);
            cstmt01.setString(4, filter.IN_FORMA);
            cstmt01.setString(5, filter.IN_SERIE);
            cstmt01.setString(6, filter.IN_SEQ);
            cstmt01.setString(7, filter.IN_DOCUMET);
            cstmt01.setString(8, filter.IN_DATEFROM);
            cstmt01.setString(9, filter.IN_DATETO);
            cstmt01.setString(10, filter.IN_COUNTRY);
            cstmt01.setString(11, filter.IN_STATUS);
            cstmt01.setString(12, filter.IN_USER);
            cstmt01.setString(13, filter.IN_IATA);

            cstmt01.setInt(14, filter.page.PAGNUM);
            cstmt01.setInt(15, filter.page.PAGROW);
            cstmt01.setInt(16, filter.page.TOTPAG);
            cstmt01.setInt(17, filter.page.TOTROW);

            cstmt01.execute();

            //*System.out.println("Aqui entro con Filtro Categoria: ");
            filter.page.PAGNUM = cstmt01.getInt(14);
            filter.page.PAGROW = cstmt01.getInt(15);
            filter.page.TOTPAG = cstmt01.getInt(16);
            filter.page.TOTROW = cstmt01.getInt(17);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new A3389Filter();
                objRtn.A3389CCUST = rs01.getString("A3389CCUST");
                objRtn.A3389PREME = rs01.getString("A3389PREME");
                objRtn.A3389TKTDUPLI = rs01.getString("A3389TKTDUPLI");

                objRtn.A3389TVTA = rs01.getString("A3389TVTA");
                objRtn.A3389VATG = rs01.getString("A3389VATG");
                objRtn.A3389FMODI = rs01.getString("A3389FMODI");
                objRtn.A3389VCASH = rs01.getDouble("A3389VCASH");
                objRtn.A3389ARCH1 = rs01.getString("A3389ARCH1");
                objRtn.A3389FREGI = rs01.getString("A3389FREGI");
                objRtn.A3389VMSCA = rs01.getDouble("A3389VMSCA");
                objRtn.A3389VMSCC = rs01.getDouble("A3389VMSCC");
                objRtn.A3389TARIF = rs01.getDouble("A3389TARIF");
                objRtn.A3389TARIU = rs01.getDouble("A3389TARIU");
                objRtn.A3389TARED = rs01.getDouble("A3389TARED");
                objRtn.A3389COMIS = rs01.getDouble("A3389COMIS");
                objRtn.A3389PORCO = rs01.getDouble("A3389PORCO");
                objRtn.A3389TTAX = rs01.getDouble("A3389TTAX");
                objRtn.A3389PENAL = rs01.getDouble("A3389PENAL");
                objRtn.A3389PORPE = rs01.getDouble("A3389PORPE");
                objRtn.A3389TOTAL = rs01.getDouble("A3389TOTAL");

                objRtn.A3389PAIS = rs01.getString("A3389PAIS");
                objRtn.A3389NUMER = rs01.getString("A3389NUMER");
                objRtn.A3389TKT = rs01.getString("A3389TKT");
                objRtn.A3389TRNCU = rs01.getString("A3389TRNCU");
                objRtn.A3389FUETE = rs01.getString("A3389FUETE");
                objRtn.A3389STATU = rs01.getString("A3389STATU");
                objRtn.A3389IATA = rs01.getString("A3389IATA");
                objRtn.A3389NOMAGENCY = rs01.getString("A3389NOMAGENCY");
                objRtn.A3389FAPPI = rs01.getString("A3389FAPPI");
                objRtn.A3389FAUTO = rs01.getString("A3389FAUTO");
                objRtn.A3389MDA = rs01.getString("A3389MDA");
                objRtn.A3389TOTAL = rs01.getDouble("A3389TOTAL");
                objRtn.A3389PAX = rs01.getString("A3389PAX");
                if (objRtn.A3389PAIS.equals("CN")) {
                    objRtn.A3389RAAG = StringEscapeUtils.escapeJava(rs01.getString("A3389RACN"));
                    objRtn.A3389RACN = rs01.getString("A3389RACN");
                } else {
                    objRtn.A3389RAAG = rs01.getString("A3389RAAG");
                    objRtn.A3389RACN = rs01.getString("A3389RAAG");
                }
                //objRtn.A3389RAAG = rs01.getString("A3389RAAG");
                objRtn.A3389REGAS = rs01.getString("A3389REGAS");
                objRtn.A3389FLAG = rs01.getString("A3389FLAG");
                objRtn.A3389STATO = rs01.getString("A3389STATO");
                objRtn.A3389EMAIL = rs01.getString("A3389EMAIL");
                objRtn.A3389SEMAF = rs01.getString("TRAFFIC_LIGHT");
                objRtn.A3389DIAS = rs01.getString("DIAS");
                objRtn.A3389HREGA = rs01.getString("A3389HREGA");
                objRtn.A3389RAAR = rs01.getString("A3389RAAR");
                objRtn.A3389RAUD = rs01.getString("A3389RAUD");
                objRtn.A3389HAUTO = rs01.getString("A3389HAUTO");
                objRtn.A3389PGNA = rs01.getString("A3389PGNA");
                objRtn.A3389TKTDUPLI2 = rs01.getString("A3389TKTDUPLIS");
                objRtn.A3389CHANEL = rs01.getString("A3389CHANEL");

                objRtn.A3389FREJE = rs01.getString("A3389FREJE");
                objRtn.A3389HRERR = rs01.getString("A3389HRERR");
                objRtn.A3389TARIA = rs01.getDouble("A3389TARIA");
                objRtn.A3389FRERR = rs01.getString("A3389FRERR");

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

    public A3389Filter SearchQueryRFNDetail(A3389Filter filter) throws SQLException, Exception {
        A3389Filter lstGeneral = null;
        List<A3402> lst_TAXES = new ArrayList<A3402>(0);
        List<A3391> lst_DOCUMENTS = new ArrayList<A3391>(0);
        List<A3392> lst_CardType = new ArrayList<A3392>(0);
        //lsita de agencias
        List<A3401> lst_RFNDAGNT = new ArrayList<A3401>(0);
        List<A3402> lst_TAXESAGNT = new ArrayList<A3402>(0);
        List<A3407> lst_DOCUMENTSAGNT = new ArrayList<A3407>(0);
        List<A3408> lst_CardTypeAGNT = new ArrayList<A3408>(0);
        List<A3403> lst_RAZON = new ArrayList<A3403>(0);

        A3389Filter objRtnGeneral = null;
        A3402 objlst_TAXES = null;
        A3391 objlst_DOCUMENTS = null;
        A3392 objlst_CardType = null;

        //resulatdo de agencias
        A3401 objlst_RFNDAGNT = null;
        A3402 objlst_TAXESAGNT = null;
        A3407 objlst_DOCUMENTSAGNT = null;
        A3408 objlst_CardTypeAGNT = null;
        A3403 objlst_RAZON = null;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        ResultSet rs02 = null;
        ResultSet rs03 = null;
        ResultSet rs04 = null;
        ResultSet rs05 = null;
        ResultSet rs06 = null;
        ResultSet rs07 = null;
        ResultSet rs08 = null;

        String SQLCLL01 = "{CALL PXSAUDIT.SQP02513(?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_CIA);
            cstmt01.setString(3, filter.IN_PREME);
            cstmt01.setString(4, filter.IN_DATEFROM);
            cstmt01.execute();
            rs01 = cstmt01.getResultSet();
            ///VALIDACION DE TARJETAS
            while (rs01.next()) {
                objlst_TAXES = new A3402();
                objlst_TAXES.A3402CDTAX = rs01.getString("AGEN");
                objlst_TAXES.A3402CDATO = rs01.getString("AERO");
                objlst_TAXES.A3402CORRL = rs01.getString("EXITE");
                lst_TAXES.add(objlst_TAXES);
            }
            ////LIST DOCUMENTS
            if (cstmt01.getMoreResults()) {
                rs02 = cstmt01.getResultSet();
                while (rs02.next()) {
                    objlst_DOCUMENTS = new A3391();
                    objlst_DOCUMENTS.A3391CCUST = rs02.getString("A3391CCUST");
                    objlst_DOCUMENTS.A3391CIA = rs02.getString("A3391CIA");
                    objlst_DOCUMENTS.A3391FORMA = rs02.getString("A3391FORMA");
                    objlst_DOCUMENTS.A3391SERIE = rs02.getString("A3391SERIE");
                    objlst_DOCUMENTS.A3391TKT = rs02.getString("A3391FORMA") + "" + rs02.getString("A3391SERIE");
                    objlst_DOCUMENTS.A3391SEQ = rs02.getString("A3391SEQ");
                    objlst_DOCUMENTS.A3391CUPON = rs02.getString("A3391CUPON");
                    objlst_DOCUMENTS.A3391TRNCU = rs02.getString("A3391TRNCU");
                    objlst_DOCUMENTS.A3391CORRL = rs02.getString("A3391CORRL");
                    objlst_DOCUMENTS.A3391PREME = rs02.getString("A3391PREME");
                    objlst_DOCUMENTS.A3391FVNTA = rs02.getString("A3391FVNTA");
                    objlst_DOCUMENTS.A3391WAIVE = rs02.getString("A3391WAIVE");
                    lst_DOCUMENTS.add(objlst_DOCUMENTS);
                }
            }
            //Card Type
            if (cstmt01.getMoreResults()) {
                rs03 = cstmt01.getResultSet();
                while (rs03.next()) {
                    objlst_CardType = new A3392();

                    objlst_CardType.A3392CFOP = rs03.getString("A3392CFOP");
                    objlst_CardType.A3392TYCAR = rs03.getString("A3392TYCAR");
                    objlst_CardType.A3392NTARJ = rs03.getString("A3392NTARJ");
                    objlst_CardType.A3392MONTO = rs03.getDouble("A3392MONTO");
                    objlst_CardType.A3392MONTE = rs03.getDouble("A3392MONTE");
                    objlst_CardType.A3392TOTAL = rs03.getDouble("A3392TOTAL");
                    objlst_CardType.A3392PREME = rs03.getString("A3392PREME");
                    objlst_CardType.A3392CORRL = rs03.getString("A3392CORRL");
                    lst_CardType.add(objlst_CardType);
                }
            }
            //LSITA DE DATOS DE LA AGENCIA
            if (cstmt01.getMoreResults()) {
                rs04 = cstmt01.getResultSet();
                while (rs04.next()) {
                    objlst_RFNDAGNT = new A3401();
                    objlst_RFNDAGNT.A3401STATU = rs04.getString("A3401STATU");
                    objlst_RFNDAGNT.A3401TKTXM = rs04.getString("A3401TKTXM");
                    objlst_RFNDAGNT.A3401TRNCU = rs04.getString("A3401TRNCU");
                    objlst_RFNDAGNT.A3401CHEKD = rs04.getString("A3401CHEKD");
                    objlst_RFNDAGNT.A3401CPN = rs04.getString("A3401CPN");
                    objlst_RFNDAGNT.A3401MDA = rs04.getString("A3401MDA");
                    objlst_RFNDAGNT.A3401MDAPG = rs04.getString("A3401MDAPG");
                    objlst_RFNDAGNT.A3401FLAG = rs04.getString("A3401FLAG");
                    objlst_RFNDAGNT.A3401RAAG = rs04.getString("A3401RAAG");
                    objlst_RFNDAGNT.A3401ARCH1 = rs04.getString("A3401ARCH1");

                    objlst_RFNDAGNT.A3401TARIF = rs04.getDouble("A3401TARIF");
                    objlst_RFNDAGNT.A3401TRFPG = rs04.getDouble("A3401TRFPG");
                    objlst_RFNDAGNT.A3401TRFNC = rs04.getDouble("A3401TRFNC");
                    objlst_RFNDAGNT.A3401ROE = rs04.getDouble("A3401ROE");
                    objlst_RFNDAGNT.A3401COMIS = rs04.getDouble("A3401COMIS");
                    objlst_RFNDAGNT.A3401PORCO = rs04.getDouble("A3401PORCO");
                    objlst_RFNDAGNT.A3401TTAX = rs04.getDouble("A3401TTAX");
                    objlst_RFNDAGNT.A3401PENAL = rs04.getDouble("A3401PENAL");
                    objlst_RFNDAGNT.A3401PORPE = rs04.getDouble("A3401PORPE");
                    objlst_RFNDAGNT.A3401IVAPE = rs04.getDouble("A3401IVAPE");
                    objlst_RFNDAGNT.A3401TOTAL = rs04.getDouble("A3401TOTAL");
                    objlst_RFNDAGNT.A3401NETO = rs04.getDouble("A3401NETO");
                    lst_RFNDAGNT.add(objlst_RFNDAGNT);
                }
            }
            //lst_TAXES AGNT

            //LIST DOCUMENTS
            if (cstmt01.getMoreResults()) {
                rs06 = cstmt01.getResultSet();
                while (rs06.next()) {
                    objlst_DOCUMENTSAGNT = new A3407();
                    objlst_DOCUMENTSAGNT.A3407CCUST = rs06.getString("A3407CCUST");
                    objlst_DOCUMENTSAGNT.A3407CIA = rs06.getString("A3407CIA");
                    objlst_DOCUMENTSAGNT.A3407TKT = rs06.getString("A3407FORMA") + "" + rs06.getString("A3407SERIE");
                    objlst_DOCUMENTSAGNT.A3407FORMA = rs06.getString("A3407FORMA");
                    objlst_DOCUMENTSAGNT.A3407SERIE = rs06.getString("A3407SERIE");
                    objlst_DOCUMENTSAGNT.A3407SEQ = rs06.getString("A3407SEQ");
                    objlst_DOCUMENTSAGNT.A3407CUPON = rs06.getString("A3407CUPON");
                    objlst_DOCUMENTSAGNT.A3407TRNCU = rs06.getString("A3407TRNCU");
                    objlst_DOCUMENTSAGNT.A3407CORRL = rs06.getString("A3407CORRL");
                    objlst_DOCUMENTSAGNT.A3407PREME = rs06.getString("A3407PREME");
                    objlst_DOCUMENTSAGNT.A3407FVNTA = rs06.getString("A3407FVNTA");
                    objlst_DOCUMENTSAGNT.A3407WAIVE = rs06.getString("A3407WAIVE");
                    lst_DOCUMENTSAGNT.add(objlst_DOCUMENTSAGNT);
                }
            }
            //LIST TARJETAS
            if (cstmt01.getMoreResults()) {
                rs07 = cstmt01.getResultSet();
                while (rs07.next()) {
                    objlst_CardTypeAGNT = new A3408();
                    objlst_CardTypeAGNT.A3408CCUST = rs07.getString("A3408CCUST");
                    objlst_CardTypeAGNT.A3408CFOP = rs07.getString("A3408CFOP");
                    objlst_CardTypeAGNT.A3408TYCAR = rs07.getString("A3408TYCAR");
                    objlst_CardTypeAGNT.A3408CUR = rs07.getString("A3408CUR");
                    objlst_CardTypeAGNT.A3408NTARJ = rs07.getString("A3408NTARJ");
                    objlst_CardTypeAGNT.A3408PREME = rs07.getString("A3408PREME");
                    objlst_CardTypeAGNT.A3408CORRL = rs07.getString("A3408CORRL");

                    objlst_CardTypeAGNT.A3408MONTO = rs07.getDouble("A3408MONTO");
                    objlst_CardTypeAGNT.A3408MONTE = rs07.getDouble("A3408MONTE");
                    objlst_CardTypeAGNT.A3408TOTAL = rs07.getDouble("A3408TOTAL");
                    lst_CardTypeAGNT.add(objlst_CardTypeAGNT);
                }
            }
            //LIST DE RAZONES
            if (cstmt01.getMoreResults()) {
                rs08 = cstmt01.getResultSet();
                while (rs08.next()) {
                    objlst_RAZON = new A3403();
                    objlst_RAZON.A3403TYPE = rs08.getString("A3403TYPE");
                    objlst_RAZON.A3403CODE = rs08.getString("A3403CODE");
                    objlst_RAZON.A3403ERROR = rs08.getString("A3403ERROR");
                    objlst_RAZON.A3403SEQ = rs08.getString("A3403SEQ");
                    lst_RAZON.add(objlst_RAZON);
                }
            }

            // FIN DE LA AGENCIA
            objRtnGeneral = new A3389Filter();
            objRtnGeneral.lst_TAXES = lst_TAXES;
            objRtnGeneral.lst_DOCUMENTS = lst_DOCUMENTS;
            objRtnGeneral.lst_CardType = lst_CardType;
            objRtnGeneral.lst_RFNDAGNT = lst_RFNDAGNT;
            //objRtnGeneral.lst_TAXESAGNT = lst_TAXESAGNT;
            objRtnGeneral.lst_DOCUMENTSAGNT = lst_DOCUMENTSAGNT;
            objRtnGeneral.lst_CardTypeAGNT = lst_CardTypeAGNT;
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

    public List<A3404Filter> SearchRFNDRazon(A3404Filter filter) throws SQLException, Exception {
        List<A3404Filter> lstRtn = new ArrayList<A3404Filter>(0);
        A3404Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        //String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00911XX(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
        String SQLCLL01 = "{CALL PXSAUDIT.SQP02514(?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_PAIS);
            cstmt01.execute();
            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new A3404Filter();
                objRtn.A3404CCUST = rs01.getString("A3404CCUST");
                objRtn.A3404CODRZ = rs01.getString("A3404CODRZ");
                objRtn.A3404FAMIL = rs01.getString("A3404FAMIL");
                objRtn.A3404COMRE = rs01.getString("A3404COMRE");
                objRtn.A3404COMES = rs01.getString("A3404COMES");
                objRtn.A3404COMEN = rs01.getString("A3404COMEN");
                objRtn.A3404COMPO = rs01.getString("A3404COMPO");
                objRtn.A3404COMFR = rs01.getString("A3404COMFR");
                objRtn.IN_COMENT = rs01.getString("VL_LENG");
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

    public String ProcesaManualRFND(A3389Filter beanGuardarA3389, ArrayList<A3404Filter> gridDataRazones) throws SQLException, Exception {
        CallableStatement cs = null;
        ResultSet rst = null;
        String strSQL;
        String STR_RESULT = "";
        String valida = "Y";

        session.getCNXIBMDB2().open();
        try {
            //String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00953(?,?,?,?,?,?,?,?,?,?)}";
            String SQLCLL01 = "{CALL PXSAUDIT.SQP02515(?,?,?,?,?,?,?,?,?,?,?,?,?)}";
            cs = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);
            //if (beanGuardarA3389.IN_STATUS.equals("R")) {
            for (A3404Filter obj : gridDataRazones) {

                cs.setString("IN_CCUST", session.getUserView().getCustomerInfo().CCUST);
                cs.setString("IN_PREME", beanGuardarA3389.IN_PREME);
                cs.setString("IN_STATUS", beanGuardarA3389.IN_STATUS);
                cs.setString("IN_CODRZ", obj.A3404CODRZ);
                cs.setString("IN_ERROR", obj.A3404ERROR);
                cs.setString("IN_FAMIL", obj.A3404FAMIL);
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
            STR_RESULT = e.getMessage();
        } catch (Exception e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            STR_RESULT = e.getMessage();
        } finally {
            strSQL = null;
            session.getCNXIBMDB2().close();
        }

        return STR_RESULT;
    }

    public List<A3389Filter> ReportRFNDEMAIL() throws SQLException, Exception {
        List<A3389Filter> lstRtn = new ArrayList<A3389Filter>(0);
        A3389Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PXSAUDIT.SQP02512(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
        String SQLCLL02 = "{CALL PXSAUDIT.SQP02568(?,?,?,?,?,?,?,?,?,?)}";

        String strUsuario, strFecha, strHora;
        strUsuario = session.getUserView().getUserInfo().USR;
        strFecha = Functions.getFechaActual();
        strHora = Functions.getHoraActual();
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.registerOutParameter(14, Types.INTEGER);
            cstmt01.registerOutParameter(15, Types.INTEGER);
            cstmt01.registerOutParameter(16, Types.INTEGER);
            cstmt01.registerOutParameter(17, Types.INTEGER);

            cstmt01.setString(1, "1");
            cstmt01.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(3, "");
            cstmt01.setString(4, "");
            cstmt01.setString(5, "");
            cstmt01.setString(6, "");
            cstmt01.setString(7, "");
            cstmt01.setString(8, "");
            cstmt01.setString(9, "");
            cstmt01.setString(10, "");
            cstmt01.setString(11, "");
            cstmt01.setString(12, "");
            cstmt01.setString(13, "");

            cstmt01.setInt(14, 1);
            cstmt01.setInt(15, -1);
            cstmt01.setInt(16, -1);
            cstmt01.setInt(17, -1);

            cstmt01.execute();

            //*System.out.println("Aqui entro con Filtro Categoria: ");
            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new A3389Filter();
                if (rs01.getString("A3389EMAIL").equals("0")) {
                    if (!rs01.getString("TRAFFIC_LIGHT").equals("GREEN")) {
                        objRtn.A3389CCUST = rs01.getString("A3389CCUST");
                        objRtn.A3389PREME = rs01.getString("A3389PREME");
                        objRtn.A3389TKT = rs01.getString("A3389TKT");
                        objRtn.A3389PAIS = rs01.getString("A3389PAIS");
                        objRtn.A3389NUMER = rs01.getString("A3389NUMER");
                        objRtn.A3389IATA = rs01.getString("A3389IATA");
                        objRtn.A3389TOTAL = rs01.getDouble("A3389TOTAL");
                        objRtn.A3389SEMAF = rs01.getString("TRAFFIC_LIGHT");
                        objRtn.A3389REGAS = rs01.getString("A3389REGAS");
                        objRtn.A3389DIAS = rs01.getString("DIAS");
                        lstRtn.add(objRtn);
                        //PARA AGREAR LOS CORREOS
                        cstmt01 = cnx.prepareCall(SQLCLL02);
                        cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
                        cstmt01.setString(2, objRtn.A3389TKT);
                        cstmt01.setString(3, objRtn.A3389PREME);
                        cstmt01.setString(4, objRtn.A3389PAIS);
                        cstmt01.setString(5, objRtn.A3389IATA);
                        cstmt01.setString(6, objRtn.A3389DIAS);
                        cstmt01.setDouble(7, objRtn.A3389TOTAL);

                        cstmt01.setString(8, strUsuario);
                        cstmt01.setString(9, strFecha);
                        cstmt01.setString(10, strHora);

                        cstmt01.execute();
                        //strRtn = cstmt01.getString(6);
                    }
                }

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
        if (lstRtn.size() > 0) {
            SendMail(lstRtn);
        }
        return lstRtn;
    }

    public boolean SendMail(List<A3389Filter> ListData) {
        boolean iboolean = false;

        /**
         * obtener los neumeros de debitos
         */
        //mensajes de los debitos
        String VL_DESCRICABE = "<b><p>" + " Document                 " + " Ticket                   " + " IATA         " + " COUNTRY     " + " AUDITOR          " + "Days" + "</p></b>";//CR
        String strMails = "";
        String VL_CORRE_XGUTIERREZ = "<b><p>" + " Document                 " + " Ticket                   " + " IATA         " + " COUNTRY     " + " AUDITOR          " + "Days" + "</p></b>";//CR
        String VL_CORRE_XTERESAA = "<b><p>" + " Document                 " + " Ticket                   " + " IATA         " + " COUNTRY     " + " AUDITOR          " + "Days" + "</p></b>";//CR
        String VL_CORRE_XNANCYM = "<b><p>" + " Document                 " + " Ticket                   " + " IATA         " + " COUNTRY     " + " AUDITOR          " + "Days" + "</p></b>";//CR
        String VL_CORRE_XHAYDEEA = "<b><p>" + " Document                 " + " Ticket                   " + " IATA         " + " COUNTRY     " + " AUDITOR          " + "Days" + "</p></b>";//CR
        String VL_CORRE_XCARRIAGA = "<b><p>" + " Document                 " + " Ticket                   " + " IATA         " + " COUNTRY     " + " AUDITOR          " + "Days" + "</p></b>";//CR
        String VL_CORRE_XEULALIAB = "<b><p>" + " Document                 " + " Ticket                   " + " IATA         " + " COUNTRY     " + " AUDITOR          " + "Days" + "</p></b>";//CR
        String VL_CORRE_XYISSELH = "<b><p>" + " Document                 " + " Ticket                   " + " IATA         " + " COUNTRY     " + " AUDITOR          " + "Days" + "</p></b>";//CR

        String VL_ING_XGUTIERREZ = "";
        String VL_ING_XTERESAA = "";
        String VL_ING_XNANCYM = "";
        String VL_ING_XHAYDEEA = "";
        String VL_ING_XCARRIAGA = "";
        String VL_ING_XEULALIAB = "";
        String VL_ING_XYISSELH = "";
        String VL_ING_GENERA = "";

        for (int i = 0; i < ListData.size(); i++) {
            VL_ING_GENERA = "1";
            if (ListData.get(i).A3389REGAS.equals("XGUTIERREZ")) {
                VL_CORRE_XGUTIERREZ += ListData.get(i).A3389NUMER + " - " + ListData.get(i).A3389TKT + " - " + ListData.get(i).A3389IATA + " - " + ListData.get(i).A3389PAIS + " - " + ListData.get(i).A3389REGAS + " - " + ListData.get(i).A3389DIAS + " dias " + "<br>";
                VL_ING_XGUTIERREZ = "1";
            }
            if (ListData.get(i).A3389REGAS.equals("XTERESAA")) {
                VL_CORRE_XTERESAA += ListData.get(i).A3389NUMER + " - " + ListData.get(i).A3389TKT + " - " + ListData.get(i).A3389IATA + " - " + ListData.get(i).A3389PAIS + " - " + ListData.get(i).A3389REGAS + " - " + ListData.get(i).A3389DIAS + " dias " + "<br>";
                VL_ING_XTERESAA = "1";
            }
            if (ListData.get(i).A3389REGAS.equals("XNANCYM")) {
                VL_CORRE_XNANCYM += ListData.get(i).A3389NUMER + " - " + ListData.get(i).A3389TKT + " - " + ListData.get(i).A3389IATA + " - " + ListData.get(i).A3389PAIS + " - " + ListData.get(i).A3389REGAS + " - " + ListData.get(i).A3389DIAS + " dias " + "<br>";
                VL_ING_XNANCYM = "1";
            }
            if (ListData.get(i).A3389REGAS.equals("XHAYDEEA")) {
                VL_CORRE_XHAYDEEA += ListData.get(i).A3389NUMER + " - " + ListData.get(i).A3389TKT + " - " + ListData.get(i).A3389IATA + " - " + ListData.get(i).A3389PAIS + " - " + ListData.get(i).A3389REGAS + " - " + ListData.get(i).A3389DIAS + " dias " + "<br>";
                VL_ING_XHAYDEEA = "1";
            }
            if (ListData.get(i).A3389REGAS.equals("XCARRIAGA")) {
                VL_CORRE_XCARRIAGA += ListData.get(i).A3389NUMER + " - " + ListData.get(i).A3389TKT + " - " + ListData.get(i).A3389IATA + " - " + ListData.get(i).A3389PAIS + " - " + ListData.get(i).A3389REGAS + " - " + ListData.get(i).A3389DIAS + " dias " + "<br>";
                VL_ING_XCARRIAGA = "1";
            }
            if (ListData.get(i).A3389REGAS.equals("XEULALIAB")) {
                VL_CORRE_XEULALIAB += ListData.get(i).A3389NUMER + " - " + ListData.get(i).A3389TKT + " - " + ListData.get(i).A3389IATA + " - " + ListData.get(i).A3389PAIS + " - " + ListData.get(i).A3389REGAS + " - " + ListData.get(i).A3389DIAS + " dias " + "<br>";
                VL_ING_XEULALIAB = "1";
            }
            if (ListData.get(i).A3389REGAS.equals("XYISSELH")) {
                VL_CORRE_XYISSELH += ListData.get(i).A3389NUMER + " - " + ListData.get(i).A3389TKT + " - " + ListData.get(i).A3389IATA + " - " + ListData.get(i).A3389PAIS + " - " + ListData.get(i).A3389REGAS + " - " + ListData.get(i).A3389DIAS + " dias " + "<br>";
                VL_ING_XYISSELH = "1";
            }
            VL_DESCRICABE += ListData.get(i).A3389NUMER + " - " + ListData.get(i).A3389TKT + " - " + ListData.get(i).A3389IATA + " - " + ListData.get(i).A3389PAIS + " - " + ListData.get(i).A3389REGAS + " - " + ListData.get(i).A3389DIAS + " dias " + "<br>";
        }

        ProMail proMail = new ProMail();
        List<String> receptores = new ArrayList<String>();
        receptores.add("notificaciones@miatech.net");
        String[] parts = null;

        if (VL_ING_GENERA.equals("1")) {
            strMails = "zperez@miatech.net;pvazquez@aeromexico.com;ebarraza@aeromexico.com";
            List<String> Ccp = new ArrayList<String>();
            //strMails = "zperez@miatech.net";
            parts = strMails.split(";");
            for (int i = 0; i < parts.length; i++) {
                Ccp.add(parts[i]);
            }
            String emisor = "notificaciones@miatech.net";//Data.EmailRe;
            String asunto = "Relación de Notificaciones de RFND  no atendidas";//Data.Asunto;

            String VL_MENSAJE = "<b>Estimados(as):</b><br><br>" + "" + "Por este medio se env&iacute;an los RFND no atendidas ." + ""
                    + " los RFND son los siguientes.</b><br><br>"
                    + " <b>" + "Venta Indirecta" + "</b><br><br> " + ""
                    + VL_DESCRICABE + "</b><br><br>"
                    + "" + " <b>Gerencia de Control de RFND - Grupo Aeromexico</b></p>";
            String mensaje = VL_MENSAJE;//Data.Mensaje;
            iboolean = proMail.enviaSalesAudit(emisor, asunto, receptores, Ccp, mensaje, "notificaciones@miatech.net", session);
        }
        if (VL_ING_XGUTIERREZ.equals("1")) {
            strMails = "jgutierrezm@aeromexico.com";
            List<String> Ccp = new ArrayList<String>();
            parts = strMails.split(";");
            for (int i = 0; i < parts.length; i++) {
                Ccp.add(parts[i]);
            }
            String emisor = "notificaciones@miatech.net";//Data.EmailRe;
            String asunto = "Relación de Notificaciones de RFND  no atendidas";//Data.Asunto;

            String VL_MENSAJE = "<b>Estimados(as):</b><br><br>" + "" + "Por este medio se env&iacute;an los RFND no atendidas ." + ""
                    + " los RFND son los siguientes.</b><br><br>"
                    + " <b>" + "Venta Indirecta" + "</b><br><br> " + ""
                    + VL_CORRE_XGUTIERREZ + "</b><br><br>"
                    + "" + " <b>Gerencia de Control de RFND - Grupo Aeromexico</b></p>";
            String mensaje = VL_MENSAJE;//Data.Mensaje;
            iboolean = proMail.enviaSalesAudit(emisor, asunto, receptores, Ccp, mensaje, "notificaciones@miatech.net", session);
        }

        if (VL_ING_XTERESAA.equals("1")) {
            strMails = "tavalos@aeromexico.com";
            List<String> Ccp = new ArrayList<String>();
            parts = strMails.split(";");
            for (int i = 0; i < parts.length; i++) {
                Ccp.add(parts[i]);
            }
            String emisor = "notificaciones@miatech.net";//Data.EmailRe;
            String asunto = "Relación de Notificaciones de RFND  no atendidas";//Data.Asunto;

            String VL_MENSAJE = "<b>Estimados(as):</b><br><br>" + "" + "Por este medio se env&iacute;an los RFND no atendidas ." + ""
                    + " los RFND son los siguientes.</b><br><br>"
                    + " <b>" + "Venta Indirecta" + "</b><br><br> " + ""
                    + VL_CORRE_XTERESAA + "</b><br><br>"
                    + "" + " <b>Gerencia de Control de RFND - Grupo Aeromexico</b></p>";
            String mensaje = VL_MENSAJE;//Data.Mensaje;
            iboolean = proMail.enviaSalesAudit(emisor, asunto, receptores, Ccp, mensaje, "notificaciones@miatech.net", session);
        }

        if (VL_ING_XNANCYM.equals("1")) {
            strMails = "nmmorales@aeromexico.com";
            List<String> Ccp = new ArrayList<String>();
            parts = strMails.split(";");
            for (int i = 0; i < parts.length; i++) {
                Ccp.add(parts[i]);
            }
            String emisor = "notificaciones@miatech.net";//Data.EmailRe;
            String asunto = "Relación de Notificaciones de RFND  no atendidas";//Data.Asunto;

            String VL_MENSAJE = "<b>Estimados(as):</b><br><br>" + "" + "Por este medio se env&iacute;an los RFND no atendidas ." + ""
                    + " los RFND son los siguientes.</b><br><br>"
                    + " <b>" + "Venta Indirecta" + "</b><br><br> " + ""
                    + VL_CORRE_XNANCYM + "</b><br><br>"
                    + "" + " <b>Gerencia de Control de RFND - Grupo Aeromexico</b></p>";
            String mensaje = VL_MENSAJE;//Data.Mensaje;
            iboolean = proMail.enviaSalesAudit(emisor, asunto, receptores, Ccp, mensaje, "notificaciones@miatech.net", session);
        }
        if (VL_ING_XHAYDEEA.equals("1")) {
            strMails = "harenas@aeromexico.com";
            List<String> Ccp = new ArrayList<String>();
            parts = strMails.split(";");
            for (int i = 0; i < parts.length; i++) {
                Ccp.add(parts[i]);
            }
            String emisor = "notificaciones@miatech.net";//Data.EmailRe;
            String asunto = "Relación de Notificaciones de RFND  no atendidas";//Data.Asunto;

            String VL_MENSAJE = "<b>Estimados(as):</b><br><br>" + "" + "Por este medio se env&iacute;an los RFND no atendidas ." + ""
                    + " los RFND son los siguientes.</b><br><br>"
                    + " <b>" + "Venta Indirecta" + "</b><br><br> " + ""
                    + VL_CORRE_XHAYDEEA + "</b><br><br>"
                    + "" + " <b>Gerencia de Control de RFND - Grupo Aeromexico</b></p>";
            String mensaje = VL_MENSAJE;//Data.Mensaje;
            iboolean = proMail.enviaSalesAudit(emisor, asunto, receptores, Ccp, mensaje, "notificaciones@miatech.net", session);
        }
        if (VL_ING_XCARRIAGA.equals("1")) {
            strMails = "cmarriaga@aeromexico.com";
            List<String> Ccp = new ArrayList<String>();
            parts = strMails.split(";");
            for (int i = 0; i < parts.length; i++) {
                Ccp.add(parts[i]);
            }
            String emisor = "notificaciones@miatech.net";//Data.EmailRe;
            String asunto = "Relación de Notificaciones de RFND  no atendidas";//Data.Asunto;

            String VL_MENSAJE = "<b>Estimados(as):</b><br><br>" + "" + "Por este medio se env&iacute;an los RFND no atendidas ." + ""
                    + " los RFND son los siguientes.</b><br><br>"
                    + " <b>" + "Venta Indirecta" + "</b><br><br> " + ""
                    + VL_CORRE_XCARRIAGA + "</b><br><br>"
                    + "" + " <b>Gerencia de Control de RFND - Grupo Aeromexico</b></p>";
            String mensaje = VL_MENSAJE;//Data.Mensaje;
            iboolean = proMail.enviaSalesAudit(emisor, asunto, receptores, Ccp, mensaje, "notificaciones@miatech.net", session);
        }
        if (VL_ING_XEULALIAB.equals("1")) {
            strMails = "ebautista@aeromexico.com";
            List<String> Ccp = new ArrayList<String>();
            parts = strMails.split(";");
            for (int i = 0; i < parts.length; i++) {
                Ccp.add(parts[i]);
            }
            String emisor = "notificaciones@miatech.net";//Data.EmailRe;
            String asunto = "Relación de Notificaciones de RFND  no atendidas";//Data.Asunto;

            String VL_MENSAJE = "<b>Estimados(as):</b><br><br>" + "" + "Por este medio se env&iacute;an los RFND no atendidas ." + ""
                    + " los RFND son los siguientes.</b><br><br>"
                    + " <b>" + "Venta Indirecta" + "</b><br><br> " + ""
                    + VL_CORRE_XEULALIAB + "</b><br><br>"
                    + "" + " <b>Gerencia de Control de RFND - Grupo Aeromexico</b></p>";
            String mensaje = VL_MENSAJE;//Data.Mensaje;
            iboolean = proMail.enviaSalesAudit(emisor, asunto, receptores, Ccp, mensaje, "notificaciones@miatech.net", session);
        }

        if (VL_ING_XYISSELH.equals("1")) {
            strMails = "ymholguinp@aeromexico.com";
            List<String> Ccp = new ArrayList<String>();
            parts = strMails.split(";");
            for (int i = 0; i < parts.length; i++) {
                Ccp.add(parts[i]);
            }
            String emisor = "notificaciones@miatech.net";//Data.EmailRe;
            String asunto = "Relación de Notificaciones de RFND  no atendidas";//Data.Asunto;

            String VL_MENSAJE = "<b>Estimados(as):</b><br><br>" + "" + "Por este medio se env&iacute;an los RFND no atendidas ." + ""
                    + " los RFND son los siguientes.</b><br><br>"
                    + " <b>" + "Venta Indirecta" + "</b><br><br> " + ""
                    + VL_CORRE_XYISSELH + "</b><br><br>"
                    + "" + " <b>Gerencia de Control de RFND - Grupo Aeromexico</b></p>";
            String mensaje = VL_MENSAJE;//Data.Mensaje;
            iboolean = proMail.enviaSalesAudit(emisor, asunto, receptores, Ccp, mensaje, "notificaciones@miatech.net", session);
        }

        return iboolean;
    }

    public List<A3402Filter> searchLstTax(A3402Filter filter) throws SQLException, Exception {
        List<A3402Filter> lstRtn = new ArrayList<A3402Filter>(0);
        A3402Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PXSAUDIT.SQP02698(?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, filter.IN_OPTION);
            cstmt01.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(3, filter.IN_CIA);
            cstmt01.setString(4, filter.IN_PREME);
            cstmt01.setString(5, filter.IN_DATEFROM);
            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new A3402Filter();
                objRtn.A3402CCUST = rs01.getString("CCUST");
                objRtn.A3402CDTAX = rs01.getString("CDTAX");
                objRtn.A3402CDATO = rs01.getString("CONCE");
                objRtn.A3402MONED = rs01.getString("MONED");
                objRtn.A3402PREME = rs01.getString("PREME");
                objRtn.IN_COUNTRY = rs01.getString("PAIS");

                objRtn.A3402TXUSD = rs01.getDouble("AGE");
                objRtn.A3402TXMIA = rs01.getDouble("MIA");
                objRtn.A3402TXDIF = rs01.getDouble("DIF");

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
