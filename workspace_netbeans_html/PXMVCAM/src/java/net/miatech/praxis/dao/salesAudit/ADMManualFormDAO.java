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
import net.miatech.beans.SaleAudit.A1673Filter;
import net.miatech.beans.SaleAudit.A2560Filter;
import net.miatech.beans.SaleAudit.SQP00911Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.SaleAudit.A1673;
import net.miatech.praxis.SaleAudit.SQP00911;
import net.miatech.utils.Functions;
import net.miatech.utils.TimeFormatToday;
import net.miatech.utils.WorkStation;
import org.apache.log4j.Logger;

/**
 *
 * @author zperez
 */
public class ADMManualFormDAO {

    private IServerSession session;
    private static final Logger logError = Logger.getLogger("errorLog");
    private TimeFormatToday today = new TimeFormatToday();
    private WorkStation workStation = WorkStation.getInstance();

    public ADMManualFormDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public ADMManualFormDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<SQP00911Filter> search(SQP00911Filter filter) throws SQLException, Exception {
        List<SQP00911Filter> lstRtn = new ArrayList<SQP00911Filter>(0);
        SQP00911Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PXSAUDIT.SQP03402(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.registerOutParameter(25, Types.INTEGER);
            cstmt01.registerOutParameter(26, Types.INTEGER);
            cstmt01.registerOutParameter(27, Types.INTEGER);
            cstmt01.registerOutParameter(28, Types.INTEGER);

            cstmt01.setString(1, filter.OPCIONTYPE);
            cstmt01.setString(2, filter.COMBOBY);
            cstmt01.setString(3, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(4, filter.CIA);
            cstmt01.setString(5, filter.FORMA);
            cstmt01.setString(6, filter.SERIE);
            cstmt01.setString(7, filter.NUMBERADM);
            cstmt01.setString(8, filter.DATEFROM);
            cstmt01.setString(9, filter.DATETO);
            cstmt01.setString(10, filter.COUNTRY);
            cstmt01.setString(11, filter.CURRENCY);
            cstmt01.setString(12, filter.CHANNEL);
            cstmt01.setString(13, filter.AUTMAN);
            cstmt01.setString(14, filter.STATUS);
            cstmt01.setString(15, filter.COMBOCHANNEL);
            cstmt01.setString(16, filter.SEQ);
            cstmt01.setString(17, filter.CUPON);
            cstmt01.setString(18, filter.TRNCU);
            cstmt01.setString(19, filter.VP_PREME);
            cstmt01.setString(20, filter.VP_CNXPA);
            cstmt01.setString(21, filter.VP_TUORCODE);
            cstmt01.setString(22, filter.VP_USER);
            cstmt01.setString(23, filter.VP_TYPE);
            cstmt01.setString(24, filter.VP_AREA);

            cstmt01.setInt(25, filter.page.PAGNUM);
            cstmt01.setInt(26, filter.page.PAGROW);
            cstmt01.setInt(27, filter.page.TOTPAG);
            cstmt01.setInt(28, filter.page.TOTROW);

            cstmt01.execute();

            //*System.out.println("Aqui entro con Filtro Categoria: ");
            filter.page.PAGNUM = cstmt01.getInt(25);
            filter.page.PAGROW = cstmt01.getInt(26);
            filter.page.TOTPAG = cstmt01.getInt(27);
            filter.page.TOTROW = cstmt01.getInt(28);

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

                if (filter.OPCIONTYPE.equals("1") || filter.OPCIONTYPE.equals("5")) {
                    objRtn.A2548SUMADM = rs01.getDouble("A2548SUMADM");
                    objRtn.A2548CATNMEMO = rs01.getInt("A2548CATNMEMO");

                    objRtn.A2548CATNACM = rs01.getInt("VL_QTYACM");
                    objRtn.A2548SUMACM = rs01.getDouble("VL_AMTACM");
                    objRtn.A2548CATNNTD = rs01.getInt("VL_QTYNTD");
                    objRtn.A2548SUMNTD = rs01.getDouble("VL_AMTNTD");
                    objRtn.A2548CATNNTC = rs01.getInt("VL_QTYNTC");
                    objRtn.A2548SUMNTC = rs01.getDouble("VL_AMTNTC");
                    objRtn.A2548CATNFAD = rs01.getInt("VL_QTYFAD");
                    objRtn.A2548SUMFAD = rs01.getDouble("VL_AMTFAD");
                    objRtn.A2548CATNFAC = rs01.getInt("VL_QTYFAC");
                    objRtn.A2548SUMFAC = rs01.getDouble("VL_AMTFAC");

                }
                objRtn.A2548AGRCNXPANMO = rs01.getString("A2548CNXPA") + "-" + rs01.getString("A2548NMEMO");
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

                if (rs01.getString("A2548CODR1") != null) {
                    objRtn.A2548DESC1 = rs01.getString("A2548CODR1") + "-" + rs01.getString("A2548DESC1");
                }
                if (rs01.getString("A2548CODR2") != null) {
                    objRtn.A2548CODR2 = rs01.getString("A2548CODR2") + "-" + rs01.getString("A2548DESC2");
                }
                if (rs01.getString("A2548CODR3") != null) {
                    objRtn.A2548DESC3 = rs01.getString("A2548CODR3") + "-" + rs01.getString("A2548DESC3");
                }
                objRtn.A2548CATNDOCUM = rs01.getInt("VL_CANTDOC");
                objRtn.A2548CATNMEMO = rs01.getInt("A2548CATNMEMO");

                // A2548EMISION
                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;

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

    public SQP00911Filter SearchDataACMADM(SQP00911Filter filter) throws SQLException, Exception {
        SQP00911Filter lstGeneral = null;

        List<SQP00911> lst_dataIni = new ArrayList<SQP00911>(0);
        List<A1673> lst_CalcuImpuestos = new ArrayList<A1673>(0);

        SQP00911Filter objRtnGeneral = null;
        SQP00911 objlst_dataIni = null;
        A1673 objlst_CalcuImpuestos = null;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        ResultSet rs02 = null;

        String SQLCLL01 = "{CALL PXSAUDIT.SQP03387(?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, filter.OPCIONTYPE);
            cstmt01.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(3, filter.CIA);
            cstmt01.setString(4, filter.FORMA);
            cstmt01.setString(5, filter.SERIE);
            cstmt01.setString(6, filter.CUPON);
            cstmt01.setString(7, filter.SEQ);
            cstmt01.setString(8, filter.DATEFROM);
            cstmt01.setString(9, filter.DATETO);
            cstmt01.setString(10, filter.NUMBERADM);
            cstmt01.setString(11, filter.CHANNEL);
            cstmt01.setString(12, filter.TRNCU);
            cstmt01.setString(13, filter.COUNTRY);
            cstmt01.execute();
            rs01 = cstmt01.getResultSet();
            ///VALIDACION DE TARJETAS
            while (rs01.next()) {
                objlst_dataIni = new SQP00911();
                objlst_dataIni.A2548PAIS = rs01.getString("A2548PAIS");
                objlst_dataIni.A2548IATA = rs01.getString("A2548IATA");
                objlst_dataIni.A2548TRNCU = rs01.getString("A2548TRNCU");
                objlst_dataIni.A2548NMEMO = rs01.getString("A2548NMEMO");
                objlst_dataIni.A2548DECMO = rs01.getString("A2548DECMO");
                objlst_dataIni.A2548MDA = rs01.getString("A2548MDA");
                objlst_dataIni.A2548FTE = rs01.getString("A2548FTE");
                objlst_dataIni.A2548FTE = rs01.getString("A2548CANAL");
                objlst_dataIni.A2548CANAL = rs01.getString("A2548CANAL");
                objlst_dataIni.A2548CTAC = rs01.getString("A2548CTAC");
                objlst_dataIni.A2548AREA = rs01.getString("A2548AREA");
                objlst_dataIni.A2548TRNCO = rs01.getString("A2548TRNCO");
                objlst_dataIni.A2548CNXPA = rs01.getString("A2548CNXPA");
                objlst_dataIni.AGENCY = rs01.getString("AGENCIA");
                objlst_dataIni.DIRAGENCY = rs01.getString("DIRECCION");
                /*AEROLINEA*/
                objlst_dataIni.A2548TARIF = rs01.getDouble("A2548TARIF");
                objlst_dataIni.A2548TTAX = rs01.getDouble("A2548TTAX");
                objlst_dataIni.A2548SERVI = rs01.getDouble("A2548SERVI");
                objlst_dataIni.A2548IVACS = rs01.getDouble("A2548IVACS");
                objlst_dataIni.A2548COMIS = rs01.getDouble("A2548COMIS");
                objlst_dataIni.A2548SCOM = rs01.getDouble("A2548SCOM");
                objlst_dataIni.A2548TAXCM = rs01.getDouble("A2548TAXCM");
                /*AGENCIA*/
                objlst_dataIni.A2548TARIA = rs01.getDouble("A2548TARIA");
                objlst_dataIni.A2548TTAXA = rs01.getDouble("A2548TTAXA");
                objlst_dataIni.A2548SERVA = rs01.getDouble("A2548SERVA");
                objlst_dataIni.A2548IVACA = rs01.getDouble("A2548IVACA");
                objlst_dataIni.A2548COMIA = rs01.getDouble("A2548COMIA");
                objlst_dataIni.A2548SCOMA = rs01.getDouble("A2548SCOMA");
                objlst_dataIni.A2548TAXCA = rs01.getDouble("A2548TAXCA");
                /*DIFERENCIA*/
                objlst_dataIni.A2548TARID = rs01.getDouble("A2548TARID");
                objlst_dataIni.A2548TTAXD = rs01.getDouble("A2548TTAXD");
                objlst_dataIni.A2548SERVD = rs01.getDouble("A2548SERVD");
                objlst_dataIni.A2548IVACD = rs01.getDouble("A2548IVACD");
                objlst_dataIni.A2548COMID = rs01.getDouble("A2548COMID");
                objlst_dataIni.A2548SCOMD = rs01.getDouble("A2548SCOMD");
                objlst_dataIni.A2548TAXCD = rs01.getDouble("A2548TAXCD");
                objlst_dataIni.A2548PENAA = rs01.getDouble("A2548PENAA");
                objlst_dataIni.A2548PENAL = rs01.getDouble("A2548PENAL");
                objlst_dataIni.A2548PENAD = rs01.getDouble("A2548PENAD");

                /*CARGOS*/
                objlst_dataIni.A2548TCARD = rs01.getDouble("A2548TCARD");
                /*IVA CARGOS*/
                objlst_dataIni.A2548TTAMD = rs01.getDouble("A2548TTAMD");
                /*SUBTOTAL*/
                objlst_dataIni.A2548TOTAD = rs01.getDouble("A2548TOTAD");
                /*NETO*/
                objlst_dataIni.A2548NETO = rs01.getDouble("A2548NETO");
                /*CARGO X SERVICIO*/
                objlst_dataIni.A2548SERVI = rs01.getDouble("A2548SERVI");
                /*IVA CARGO*/
                objlst_dataIni.A2548IVACS = rs01.getDouble("A2548IVACS");

                objlst_dataIni.A2548DECMO = rs01.getString("A2548DECMO");

                lst_dataIni.add(objlst_dataIni);
            }
            ////LIST DOCUMENTS
            if (cstmt01.getMoreResults()) {
                rs02 = cstmt01.getResultSet();
                while (rs02.next()) {
                    objlst_CalcuImpuestos = new A1673();

                    objlst_CalcuImpuestos.A1673CDTAX = rs02.getString("A2739CDTAX");
                    objlst_CalcuImpuestos.A1673CDATO = rs02.getString("A1673CDATO");
                    objlst_CalcuImpuestos.A1673TXORI = rs02.getDouble("A2739TXORI");
                    objlst_CalcuImpuestos.A1673TXMIA = rs02.getDouble("A2739TXMIA");
                    objlst_CalcuImpuestos.A1673TXDIF = rs02.getDouble("A2739TXDIF");
                    objlst_CalcuImpuestos.A1673MONED = rs02.getString("A2739MONED");
                    objlst_CalcuImpuestos.A1673MORIG = rs02.getString("A2739MONED");
                    lst_CalcuImpuestos.add(objlst_CalcuImpuestos);
                }
            }

            // FIN DE LA AGENCIA
            objRtnGeneral = new SQP00911Filter();
            objRtnGeneral.lst_Ini = lst_dataIni;
            objRtnGeneral.lst_CalcuImpuestos = lst_CalcuImpuestos;

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

    public List<A1673Filter> SearchDataCalcuImpuestos(A1673Filter filter) throws SQLException, Exception {
        List<A1673Filter> lstRtn = new ArrayList<A1673Filter>(0);
        A1673Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PXSAUDIT.SQP01026(?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.registerOutParameter(10, Types.INTEGER);
            cstmt01.registerOutParameter(11, Types.INTEGER);
            cstmt01.registerOutParameter(12, Types.INTEGER);
            cstmt01.registerOutParameter(13, Types.INTEGER);

            cstmt01.setString(1, filter.OPCIONTYPE);
            cstmt01.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(3, filter.VP_CIA);
            cstmt01.setString(4, filter.VP_FORMA);
            cstmt01.setString(5, filter.VP_SERIE);
            cstmt01.setString(6, filter.VP_CUPON);
            cstmt01.setString(7, filter.VP_SEQ);
            cstmt01.setString(8, filter.DATEFROM);
            cstmt01.setString(9, filter.DATETO);

            cstmt01.setInt(10, filter.page.PAGNUM);
            cstmt01.setInt(11, filter.page.PAGROW);
            cstmt01.setInt(12, filter.page.TOTPAG);
            cstmt01.setInt(13, filter.page.TOTROW);

            cstmt01.execute();

            //*System.out.println("Aqui entro con Filtro Categoria: ");
            filter.page.PAGNUM = cstmt01.getInt(10);
            filter.page.PAGROW = cstmt01.getInt(11);
            filter.page.TOTPAG = cstmt01.getInt(12);
            filter.page.TOTROW = cstmt01.getInt(13);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new A1673Filter();

                objRtn.A1673CDTAX = rs01.getString("A1673CDTAX");
                objRtn.A1673TXORI = rs01.getDouble("A1673TXORI");
                objRtn.A1673TXMIA = rs01.getDouble("A1673TXORI");
                objRtn.A1673TXDIF = 0.00;

                objRtn.A1673CIA = rs01.getString("A1673CIA");
                objRtn.A1673FORMA = rs01.getString("A1673FORMA");
                objRtn.A1673SERIE = rs01.getString("A1673SERIE");
                objRtn.A1673CORRL = rs01.getString("A1673CIA") + "" + rs01.getString("A1673FORMA") + "" + rs01.getString("A1673SERIE");
                objRtn.A1673Existdebit = rs01.getString("VL_EXIST_DEBITOS");

                objRtn.CANT_ROW = rs01.getInt("RN");
                objRtn.A1673STATUS = rs01.getString("VL_FLAG");

                objRtn.IATA = rs01.getString("A720AGENTE");
                objRtn.AGENCIA = rs01.getString("AGENCIA");
                objRtn.DIREC = rs01.getString("DIRECCION");
                objRtn.FECVTA = rs01.getString("A720FECVTA");
                objRtn.FUENT = rs01.getString("A1530FUENT");
                objRtn.SFUEN = rs01.getString("A1530SFUEN");
                objRtn.DCHEQ = rs01.getString("A720DCHEQ");
                objRtn.FLAG = rs01.getString("A720FLAG");
                objRtn.CODIT = rs01.getString("A720CODIT");
                objRtn.TVENTA = rs01.getString("A720TVENTA");
                objRtn.TARIFA = rs01.getDouble("A720TARIFA");
                objRtn.MONEDA = rs01.getString("A720MONEDA");
                objRtn.A1673MONED = rs01.getString("A720MONEDA");
                objRtn.A1673MORIG = rs01.getString("A720MONEDA");
                objRtn.TRFPAG = rs01.getDouble("A720TRFPAG");
                objRtn.MDAPAG = rs01.getString("A720MDAPAG");
                objRtn.COUNTRY = rs01.getString("A1530PSVTA");
                objRtn.CDGT_MONEDA = rs01.getString("VL_CDGT");
                objRtn.A1673RATE = rs01.getDouble("A1673RATE");

                objRtn.A1673SBSTA = "3";
                objRtn.PASSNAME = rs01.getString("A720PAX");

                objRtn.COMISION = rs01.getDouble("VL_COMISION");
                if (rs01.getDouble("VL_COMISION") > 0) {
                    double COMIS = rs01.getDouble("VL_COMISION");
                    COMIS = COMIS * -1;
                    objRtn.COMISIOND = COMIS;
                }
                objRtn.OVERCOMISION = rs01.getDouble("VL_OVERCOMISION");
                if (rs01.getDouble("VL_OVERCOMISION") > 0) {
                    double OVERCOMIS = rs01.getDouble("VL_OVERCOMISION");
                    OVERCOMIS = OVERCOMIS * -1;
                    objRtn.OVERCOMISIOND = OVERCOMIS;
                }
                objRtn.TAXONCOMI = rs01.getDouble("VL_TAXONCOMI");
                if (rs01.getDouble("VL_TAXONCOMI") > 0) {
                    double TAXONCOMI = rs01.getDouble("VL_TAXONCOMI");
                    TAXONCOMI = TAXONCOMI * -1;
                    objRtn.TAXONCOMID = TAXONCOMI;
                }
                objRtn.TYPEONCOMI = rs01.getString("VL_TYPEONCOMI");
                objRtn.A1673SEQ = rs01.getString("A720NSEQ");
                objRtn.A1673PAIS = rs01.getString("A1530PSVTA");

                objRtn.IVAADM = rs01.getDouble("VL_IVAADM");
                objRtn.CARGOADM = rs01.getDouble("VL_CARGOADM");

                if (filter.OPCIONTYPE.equals("2")) {
                    objRtn.A1673CUPON = rs01.getString("A713CUPON1") + "" + rs01.getString("A713CUPON2") + "" + rs01.getString("A713CUPON3") + "" + rs01.getString("A713CUPON4");
                } else {
                    objRtn.A1673CUPON = " ";
                }
                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;

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

    public List<A2560Filter> SearchADManualRazon(A2560Filter filter) throws SQLException, Exception {
        List<A2560Filter> lstRtn = new ArrayList<A2560Filter>(0);
        A2560Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PXSAUDIT.SQP00998(?, ?, ?, ?, ?, ?, ?, ?,?, ?, ?, ?, ?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.registerOutParameter(10, Types.INTEGER);
            cstmt01.registerOutParameter(11, Types.INTEGER);
            cstmt01.registerOutParameter(12, Types.INTEGER);
            cstmt01.registerOutParameter(13, Types.INTEGER);

            cstmt01.setString(1, filter.VP_OPCION);
            cstmt01.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(3, filter.VP_CODRAZ);
            cstmt01.setString(4, filter.VP_FAM);

            cstmt01.setString(5, filter.VP_CIA);
            cstmt01.setString(6, filter.VP_FORMA);
            cstmt01.setString(7, filter.VP_SERIE);
            cstmt01.setString(8, filter.VP_SEQ);
            cstmt01.setString(9, filter.VP_CPN);

            cstmt01.setInt(10, filter.page.PAGNUM);
            cstmt01.setInt(11, filter.page.PAGROW);
            cstmt01.setInt(12, filter.page.TOTPAG);
            cstmt01.setInt(13, filter.page.TOTROW);

            cstmt01.execute();

            //*System.out.println("Aqui entro con Filtro Categoria: ");
            filter.page.PAGNUM = cstmt01.getInt(10);
            filter.page.PAGROW = cstmt01.getInt(11);
            filter.page.TOTPAG = cstmt01.getInt(12);
            filter.page.TOTROW = cstmt01.getInt(13);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new A2560Filter();

                if (filter.VP_OPCION.equals("2")) {
                    objRtn.A2560AMOUNT = rs01.getDouble("A2560AMOUNT");
                    objRtn.A2560MDA = rs01.getString("A2548MDA");
                    objRtn.A2560CPN = rs01.getString("A2548CPN");
                    objRtn.A2560NMEMO = rs01.getString("A2548NMEMO");
                    objRtn.A2560TRNCO = rs01.getString("A2548TRNCO");
                    objRtn.A2560TKT = rs01.getString("A2560HREVI");
                    objRtn.A2560FLAG = rs01.getString("A2548FLAG");
                    objRtn.A2560CODRZ = rs01.getString("A2560CODRZ");
                    objRtn.A2560COMES = rs01.getString("A2560COMES");
                    objRtn.A2560FAMIL = rs01.getString("A2560FAMIL");
                } else {
                    objRtn.A2560CCUST = rs01.getString("A2560CCUST");
                    objRtn.A2560CODRZ = rs01.getString("A2560CODRZ");
                    objRtn.A2560FAMIL = rs01.getString("A2560FAMIL");
                    objRtn.A2560COMRE = rs01.getString("A2560COMRE");
                    objRtn.A2560COMES = rs01.getString("A2560COMES");
                    objRtn.A2560COMEN = rs01.getString("A2560COMEN");
                    objRtn.A2560COMPO = rs01.getString("A2560COMPO");
                    objRtn.A2560COMFR = rs01.getString("A2560COMFR");
                    objRtn.A2560REGIS = rs01.getString("A2560REGIS");
                    objRtn.A2560FREGI = rs01.getString("A2560FREGI");
                    objRtn.A2560HREGI = rs01.getString("A2560HREGI");
                    objRtn.A2560REVIS = rs01.getString("A2560REVIS");
                    objRtn.A2560FREVI = rs01.getString("A2560FREVI");
                    objRtn.A2560HREVI = rs01.getString("A2560HREVI");
                    objRtn.A2560IDIOMA = rs01.getString("LENG");
                }
                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;

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

    public String ProcesaManualADM(SQP00911Filter filter, String lstaTaxes, String lstaRazones) throws SQLException, Exception {
        CallableStatement cs = null;
        ResultSet rst = null;
        String strSQL;
        String STR_RESULT = "";

        session.getCNXIBMDB2().open();
        try {
            String SQLCLL01 = "{CALL PXSAUDIT.SQP03403(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";//SQP02515
            cs = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);

            cs.setString("IN_CCUST", session.getUserView().getCustomerInfo().CCUST);

            cs.setString("IN_A2548TRNCU", filter.A2548TRNCU);
            cs.setString("IN_A2548TRNCO", filter.A2548TRNCO);
            cs.setString("IN_A2548FTE", filter.A2548FTE);
            cs.setString("IN_A2548CANAL", filter.A2548CANAL);
            cs.setString("IN_A2548PAIS", filter.A2548PAIS);
            cs.setString("IN_A2548MDA", filter.A2548MDA);
            cs.setString("IN_A2548AREA", filter.A2548AREA);
            cs.setString("IN_A2548TIKET", filter.A2548TIKET);
            cs.setString("IN_A2548SEQ", filter.A2548SEQ);
            cs.setString("IN_A2548CPN", filter.A2548CPN);
            cs.setString("IN_A2548FVTA", filter.A2548FVTA);
            cs.setString("IN_A2548IATA", filter.A2548IATA);
            cs.setString("IN_A2548NMEMO", filter.A2548NMEMO);
            cs.setString("IN_A2548CTAC", filter.A2548CTAC);
            cs.setString("IN_A2548TVTA", filter.A2548TVTA);
            cs.setString("IN_A2548OBSER", filter.A2548OBSER);
            cs.setString("IN_A2548ASOCI", filter.A2548ASOCI);

            cs.setDouble("IN_A2548TARIF", filter.A2548TARIF);
            cs.setDouble("IN_A2548TARIA", filter.A2548TARIA);
            cs.setDouble("IN_A2548TARID", filter.A2548TARID);
            cs.setDouble("IN_A2548TTAX", filter.A2548TTAX);
            cs.setDouble("IN_A2548TTAXA", filter.A2548TTAXA);
            cs.setDouble("IN_A2548TTAXD", filter.A2548TTAXD);
            cs.setDouble("IN_A2548PENAL", filter.A2548PENAL);
            cs.setDouble("IN_A2548PENAA", filter.A2548PENAA);
            cs.setDouble("IN_A2548PENAD", filter.A2548PENAD);
            cs.setDouble("IN_A2548COMIS", filter.A2548COMIS);
            cs.setDouble("IN_A2548COMIA", filter.A2548COMIA);
            cs.setDouble("IN_A2548COMID", filter.A2548COMID);
            cs.setDouble("IN_A2548SCOM", filter.A2548SCOM);
            cs.setDouble("IN_A2548SCOMA", filter.A2548SCOMA);
            cs.setDouble("IN_A2548SCOMD", filter.A2548SCOMD);
            cs.setDouble("IN_A2548TAXCM", filter.A2548TAXCM);
            cs.setDouble("IN_A2548TAXCA", filter.A2548TAXCA);
            cs.setDouble("IN_A2548TAXCD", filter.A2548TAXCD);
            cs.setDouble("IN_A2548TOTAL", filter.A2548TOTAL);
            cs.setDouble("IN_A2548TCARD", filter.A2548TCARD);
            cs.setDouble("IN_A2548TTAMD", filter.A2548TTAMD);
            cs.setDouble("IN_A2548NETO", filter.A2548NETO);

            cs.setString("IN_LSTATaxes", lstaTaxes);
            cs.setString("IN_LSTARazones", lstaRazones);
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
            STR_RESULT=e.getMessage();
        } catch (Exception e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            STR_RESULT=e.getMessage();
        } finally {
            strSQL = null;
            session.getCNXIBMDB2().close();
        }

        return STR_RESULT;
    }

    public String insertTKTManual(ArrayList<SQP00911Filter> filter) throws SQLException, Exception {
        CallableStatement cs = null;
        ResultSet rst = null;
        String strSQL;
        String STR_RESULT = "";

        session.getCNXIBMDB2().open();
        try {
            String SQLCLL01 = "{CALL PXSAUDIT.SQP00953(?,?,?,?,?,?,?,?,?,?,?)}";
            cs = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);
            for (SQP00911Filter obj : filter) {

                cs.setString("IN_CCUST", session.getUserView().getCustomerInfo().CCUST);
                cs.setString("IN_TRNCU", obj.A2548TRNCO);
                cs.setString("IN_STAT", "99");
                cs.setString("IN_NMEMO", obj.A2548CNXPA);
                cs.setString("IN_DESCR", "");
                cs.setString("IN_ARCHV", "");
                //cs.setString("IN_ARCHV2", "");
                //cs.setString("IN_ARCHV3", "");
                cs.setString("IN_PAIS", obj.A2548PAIS);
                cs.setString("IN_FOLIO", "");
                cs.setString("IN_REGIS", session.getUserView().getUserInfo().USR);
                cs.setString("IN_FREGI", Functions.getFechaActual());
                cs.setString("IN_HREGI", Functions.getHoraActual());

                cs.execute();
            }
            rst = cs.getResultSet();

            while (rst.next()) {
                STR_RESULT = rst.getString("VMESSAGE");
            }
            cs.close();
        } catch (SQLException e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            STR_RESULT=e.getMessage();
        } catch (Exception e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            STR_RESULT=e.getMessage();
        } finally {
            strSQL = null;
            session.getCNXIBMDB2().close();
        }

        return STR_RESULT;
    }

    public String DeleteADMMANUAL(SQP00911Filter filter) throws SQLException, Exception {
        CallableStatement cs = null;
        ResultSet rst = null;
        String strSQL;
        String STR_RESULT = "";

        session.getCNXIBMDB2().open();
        try {
            String SQLCLL01 = "{CALL PXSAUDIT.SQP00953(?,?,?,?,?,?,?,?,?,?,?)}";
            cs = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);
            cs.setString("IN_CCUST", session.getUserView().getCustomerInfo().CCUST);

            cs.setString("IN_TRNCU", filter.A2548TRNCO);
            cs.setString("IN_STAT", "99");
            cs.setString("IN_NMEMO", filter.A2548CNXPA);
            cs.setString("IN_DESCR", "");
            cs.setString("IN_ARCHV", "DELETE");
            cs.setString("IN_PAIS", filter.A2548PAIS);
            cs.setString("IN_FOLIO", "");

            cs.setString("IN_REGIS", session.getUserView().getUserInfo().USR);
            cs.setString("IN_FREGI", Functions.getFechaActual());
            cs.setString("IN_HREGI", Functions.getHoraActual());
            //cs.setString("IN_OLD", filter.CAMPO);

            cs.execute();
            rst = cs.getResultSet();

            while (rst.next()) {
                STR_RESULT = rst.getString("VMESSAGE");
            }
            cs.close();
        } catch (SQLException e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            STR_RESULT=e.getMessage();
        } catch (Exception e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            STR_RESULT=e.getMessage();
        } finally {
            strSQL = null;
            session.getCNXIBMDB2().close();
        }

        return STR_RESULT;
    }

}
