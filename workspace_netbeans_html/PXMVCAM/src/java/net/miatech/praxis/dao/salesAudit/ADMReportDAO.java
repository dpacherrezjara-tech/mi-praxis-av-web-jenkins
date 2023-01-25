package net.miatech.praxis.dao.salesAudit;

// <editor-fold defaultstate="collapsed" desc="import">
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.exceptions.SpringException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.SaleAudit.A1580Filter;
import net.miatech.beans.SaleAudit.A1673Filter;
import net.miatech.beans.SaleAudit.A3807Filter;
import net.miatech.beans.SaleAudit.SQP00911Filter;
import net.miatech.praxis.SaleAudit.A1580;
import net.miatech.praxis.SaleAudit.A1673;
import net.miatech.praxis.SaleAudit.A2553;
import net.miatech.praxis.SaleAudit.SQP00911;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

// </editor-fold>
/**
 *
 * @author gsanchez
 */
public class ADMReportDAO {

    private IServerSession session;
    private static final Logger logError = Logger.getLogger("errorLog");

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<SQP00911Filter> SearchReportADM(SQP00911Filter filter) throws SQLException, Exception {
        List<SQP00911Filter> lstRtn = new ArrayList<SQP00911Filter>(0);
        SQP00911Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        //String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00911XX(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
        String SQLCLL01 = "{CALL PXSAUDIT.SQP00911(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.registerOutParameter(27, Types.INTEGER);
            cstmt01.registerOutParameter(28, Types.INTEGER);
            cstmt01.registerOutParameter(29, Types.INTEGER);
            cstmt01.registerOutParameter(30, Types.INTEGER);

            cstmt01.setString(1, filter.OPCIONTYPE);
            cstmt01.setString(2, filter.COMBOBY);
            cstmt01.setString(3, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(4, filter.CIA);
            cstmt01.setString(5, filter.FORMA);
            cstmt01.setString(6, filter.SERIE);
            if (filter.NUMBERADM.equals("")) {
                cstmt01.setString(7, filter.NUMBERADM);
            } else {
                cstmt01.setString(7, filter.NUMBERADM.trim());
            }
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
            if (filter.VP_CNXPA.equals("")) {
                cstmt01.setString(20, filter.VP_CNXPA);
            } else {
                cstmt01.setString(20, filter.VP_CNXPA.trim());
            }
            cstmt01.setString(21, filter.VP_TUORCODE);
            cstmt01.setString(22, filter.VP_USER);
            cstmt01.setString(23, filter.VP_TYPE);
            cstmt01.setString(24, filter.VP_AREA);
            cstmt01.setString(25, filter.VP_EPR);
            cstmt01.setString(26, filter.VP_PNR);

            cstmt01.setInt(27, filter.page.PAGNUM);
            cstmt01.setInt(28, filter.page.PAGROW);
            cstmt01.setInt(29, filter.page.TOTPAG);
            cstmt01.setInt(30, filter.page.TOTROW);

            cstmt01.execute();

            //*System.out.println("Aqui entro con Filtro Categoria: ");
            filter.page.PAGNUM = cstmt01.getInt(27);
            filter.page.PAGROW = cstmt01.getInt(28);
            filter.page.TOTPAG = cstmt01.getInt(29);
            filter.page.TOTROW = cstmt01.getInt(30);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new SQP00911Filter();
                if (filter.OPCIONTYPE.equals("6")) {
                    objRtn.A2548CODR1 = rs01.getString("A2673CODE");
                    objRtn.A2548EMISION = rs01.getString("A2673ERROR");
                    objRtn.A2548DESC1 = rs01.getString("A2673TYPE");
                } else if (filter.OPCIONTYPE.equals("9")) {
                    objRtn.A2548TIKET = rs01.getString("A2548CIA") + "" + rs01.getString("A2548FORMA") + "" + rs01.getString("A2548SERIE");
                    objRtn.A2548CDGT = rs01.getString("A2548CDGT");
                    objRtn.A2548TRNCO = rs01.getString("A2548TRNCO");
                    objRtn.A2548CANTIDAD = rs01.getInt("A2548CATNMEMO");
                    objRtn.A2548NETO = rs01.getDouble("A2548NETO");
                    objRtn.A2548REGIS = rs01.getString("A2548REGIS");
                    objRtn.A2548FVTA = rs01.getString("A2548FVTA");
                } else if (filter.OPCIONTYPE.equals("10")) {
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
                    objRtn.A2548TOTAL = rs01.getDouble("A2548TOTAL");

                    objRtn.A2548TARIA = rs01.getDouble("A2548TARIA");
                    objRtn.A2548TTAXA = rs01.getDouble("A2548TTAXA");
                    objRtn.A2548SERVA = rs01.getDouble("A2548SERVA");
                    objRtn.A2548IVACA = rs01.getDouble("A2548IVACA");
                    objRtn.A2548COMIA = rs01.getDouble("A2548COMIA");
                    objRtn.A2548SCOMA = rs01.getDouble("A2548SCOMA");
                    objRtn.A2548TAXCA = rs01.getDouble("A2548TAXCA");
                    objRtn.A2548PORCA = rs01.getDouble("A2548PORCA");
                    objRtn.A2548PENAA = rs01.getDouble("A2548PENAA");
                    objRtn.A2548FEEA = rs01.getDouble("A2548FEEA");
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
                    objRtn.A2548TOTAD = rs01.getDouble("A2548TOTAD");
                    objRtn.A2548TOTAD = rs01.getDouble("A2548TOTAD");
                    objRtn.A2548NETO = rs01.getDouble("A2548NETO");
                } else {
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
                    objRtn.A2548CNREL = rs01.getString("A2548CNREL");
                    objRtn.A2548PRECR = rs01.getString("A2548PRECR");
                    
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
                    objRtn.A2548STCOR = rs01.getString("A2548STCOR");
                    objRtn.A2548FECOR = rs01.getString("A2548FECOR");
                    objRtn.A2548NRCOR = rs01.getString("A2548NRCOR");
                    objRtn.A2548PNR = rs01.getString("A2548PNR");
                    objRtn.A2548EPR = rs01.getString("A2548EPR");

                    objRtn.A2548FCONT = rs01.getString("A2548FCONT");
                    objRtn.A2548CPN = rs01.getString("A2548CPN");

                    if (rs01.getString("A2548CODR1") != null) {
                        objRtn.A2548DESC1 = rs01.getString("A2548CODR1") + "-" + rs01.getString("A2548DESC1");
                    }
                    if (rs01.getString("A2548CODR2") != null) {
                        objRtn.A2548CODR2 = rs01.getString("A2548CODR2") + "-" + rs01.getString("A2548DESC2");
                    }
                    objRtn.A2548DESC3 = rs01.getString("A2548DESC3");
                    
                    objRtn.A2548CATNDOCUM = rs01.getInt("VL_CANTDOC");
                    objRtn.A2548CATNMEMO = rs01.getInt("A2548CATNMEMO");

                }

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

    public List<A1580Filter> SearchCalcuArelonia(A1580Filter filter) throws SQLException, Exception {
        List<A1580Filter> lstRtn = new ArrayList<A1580Filter>(0);
        A1580Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        //String SQLCLL01 = "{CALL PRAXIS.SQP00866(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
        //String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00911XX(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
        String SQLCLL01 = "{CALL PXSAUDIT.SQP00911(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

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
            cstmt01.setString(4, filter.VP_CIA);
            cstmt01.setString(5, filter.VP_FORMA);
            cstmt01.setString(6, filter.VP_SERIE);
            cstmt01.setString(7, filter.NUMBERADM);
            cstmt01.setString(8, filter.DATEFROM);
            cstmt01.setString(9, filter.DATETO);
            cstmt01.setString(10, filter.COUNTRY);
            cstmt01.setString(11, filter.CURRENCY);
            cstmt01.setString(12, filter.CHANNEL);
            cstmt01.setString(13, filter.AUTMAN);
            cstmt01.setString(14, filter.STATUS);
            cstmt01.setString(15, filter.COMBOCHANNEL);
            cstmt01.setString(16, filter.VP_SEQ);
            cstmt01.setString(17, filter.VP_CUPON);
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

                objRtn = new A1580Filter();
                objRtn.A1580FROM = rs01.getString("A1580FROM");
                objRtn.A1580TO = rs01.getString("A1580TO");
                objRtn.A1580CLASE = rs01.getString("A1580CLASE");
                objRtn.A1580FBASI = rs01.getString("A1580FBASI");
                objRtn.A1580RUTAC = rs01.getString("A1580RUTAC");
                objRtn.A1580FMIOR = rs01.getDouble("A1580FMIOR");
                objRtn.A1580QMIOR = rs01.getDouble("A1580QMIOR");
                objRtn.CODIT = rs01.getString("CODIT");
                objRtn.A1580FAORI = rs01.getDouble("A1580FAORI");
                objRtn.A1580CHAMI = rs01.getDouble("A1580CHAMI");
                objRtn.A1580TOTMI = rs01.getDouble("A1580TOTMI");

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

    public List<A1673Filter> SearchCalcuImpuestos(A1673Filter filter) throws SQLException, Exception {
        List<A1673Filter> lstRtn = new ArrayList<A1673Filter>(0);
        A1673Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        //String SQLCLL01 = "{CALL PRAXIS.SQP00866(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
        //String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00911XX(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
        String SQLCLL01 = "{CALL PXSAUDIT.SQP00911(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

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
            cstmt01.setString(4, filter.VP_CIA);
            cstmt01.setString(5, filter.VP_FORMA);
            cstmt01.setString(6, filter.VP_SERIE);
            cstmt01.setString(7, filter.NUMBERADM);
            cstmt01.setString(8, filter.DATEFROM);
            cstmt01.setString(9, filter.DATETO);
            cstmt01.setString(10, filter.COUNTRY);
            cstmt01.setString(11, filter.CURRENCY);
            cstmt01.setString(12, filter.CHANNEL);
            cstmt01.setString(13, filter.AUTMAN);
            cstmt01.setString(14, filter.STATUS);
            cstmt01.setString(15, filter.COMBOCHANNEL);
            cstmt01.setString(16, filter.VP_SEQ);
            cstmt01.setString(17, filter.VP_CUPON);
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

                objRtn = new A1673Filter();
                objRtn.A1673CDTAX = rs01.getString("A1673CDTAX");
                objRtn.A1673TXORI = rs01.getDouble("A1673TXORI");
                objRtn.A1673TXMIA = rs01.getDouble("A1673TXMIA");
                objRtn.A1673TXDIF = rs01.getDouble("A1673TXDIF");
                //objRtn.CANT_ROW = rs01.getInt("RN");

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

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public List<A2553> loadTracing(A2553 filter) throws SQLException, Exception {
        List<A2553> lstRtn = new ArrayList<A2553>(0);
        A2553 objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        //String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00952(?,?)}";
        String SQLCLL01 = "{CALL PXSAUDIT.SQP00952(?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.A2553NMEMO);
            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {

                objRtn = new A2553();
                //objRtn.RN = rs01.getInt("RN");
                objRtn.A2553REGIS = rs01.getString("A2553REGIS");
                objRtn.A2553FREGI = rs01.getString("A2553FREGI");
                objRtn.A2553HREGI = rs01.getString("A2553HREGI");
                objRtn.A2553TYPO = rs01.getString("A2553TYPO");
                objRtn.A2553DESCR = rs01.getString("A2553DESCR");
                objRtn.A2553ARCHV = rs01.getString("A2553ARCHV");
                objRtn.A2553ARCHV2 = rs01.getString("A2553ARHV2");
                objRtn.A2553ARCHV3 = rs01.getString("A2553ARHV3");
                objRtn.A2553STAT = rs01.getString("A2553STAT");
                objRtn.ESTADO = rs01.getString("ESTADO");
                objRtn.A2553FOLIO = rs01.getString("A2553FOLIO");
                objRtn.A2553PAIS = rs01.getString("A2553PAIS");

                /*objRtn.page.PAGNUM = filter.page.PAGNUM;
                 objRtn.page.PAGROW = filter.page.PAGROW;
                 objRtn.page.TOTPAG = filter.page.TOTPAG;
                 objRtn.page.TOTROW = filter.page.TOTROW;*/
                lstRtn.add(objRtn);
            }
        } catch (SQLException e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
        } catch (Exception ex) {
            logError.error("Exception -> User:" + session.getUserView().getUserInfo().USR + " Message: " + ex.getMessage(), ex);
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

    public List<SQP00911Filter> lstRazones(A2553 filter) throws SQLException, Exception {
        List<SQP00911Filter> lstRtn = new ArrayList<SQP00911Filter>(0);
        SQP00911Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        //String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00911XX(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
        String SQLCLL01 = "{CALL PXSAUDIT.SQP02174(?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.A2553NMEMO);
            cstmt01.execute();
            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new SQP00911Filter();
                objRtn.A2548CODR1 = rs01.getString("A2673CODE");
                objRtn.A2548EMISION = rs01.getString("A2673ERROR");
                objRtn.A2548DESC1 = rs01.getString("A2673TYPE");
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

    public List<SQP00911Filter> lstTKTS(A2553 filter) throws SQLException, Exception {
        List<SQP00911Filter> lstRtn = new ArrayList<SQP00911Filter>(0);
        SQP00911Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        //String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00911XX(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
        String SQLCLL01 = "{CALL PXSAUDIT.SQP02175(?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.A2553NMEMO);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new SQP00911Filter();
                objRtn.A2548TIKET = rs01.getString("A2548CIA") + "" + rs01.getString("A2548FORMA") + "" + rs01.getString("A2548SERIE");
                objRtn.A2548TRNCO = rs01.getString("A2548TRNCO");
                objRtn.A2548NETO = rs01.getDouble("A2548NETO");
                objRtn.A2548PREME = rs01.getString("A2548PREME");
                objRtn.A2548CNXPA = rs01.getString("A2548CNXPA");
                objRtn.A2548MDA = rs01.getString("A2548MDA");

                objRtn.A2548TARID = rs01.getDouble("A2548TARID");
                objRtn.A2548TTAXD = rs01.getDouble("A2548TTAXD");
                objRtn.A2548SERVD = rs01.getDouble("A2548SERVD");
                objRtn.A2548IVACD = rs01.getDouble("A2548IVACD");
                objRtn.A2548COMID = rs01.getDouble("A2548COMID");
                objRtn.A2548SCOMD = rs01.getDouble("A2548SCOMD");
                objRtn.A2548TAXCD = rs01.getDouble("A2548TAXCD");
                objRtn.A2548PORCD = rs01.getDouble("A2548PORCD");
                objRtn.A2548PENAD = rs01.getDouble("A2548PENAD");
                objRtn.A2548FEED = rs01.getDouble("A2548FEED");
                objRtn.A2548TTACD = rs01.getDouble("A2548TTACD");
                objRtn.A2548TTAMD = rs01.getDouble("A2548TTAMD");
                objRtn.A2548TCARD = rs01.getDouble("A2548TCARD");
                objRtn.A2548TOTAD = rs01.getDouble("A2548TOTAD");
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

    public String insertTracing(A2553 filter) throws SQLException, Exception {
        CallableStatement cs = null;
        ResultSet rst = null;
        String strSQL;
        String STR_RESULT = "";

        session.getCNXIBMDB2().open();
        try {
            // String SQLCLL01 = "{CALL PXSAUDIT.SQP00953(?,?,?,?,?,?,?,?,?,?,?,?,?)}";
            String SQLCLL01 = "{CALL PXSAUDIT.SQP00953(?,?,?,?,?,?,?,?,?,?,?)}";
            cs = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);

            cs.setString("IN_CCUST", session.getUserView().getCustomerInfo().CCUST);

            cs.setString("IN_TRNCU", filter.A2553TRNCU);
            cs.setString("IN_STAT", filter.A2553STAT);
            cs.setString("IN_NMEMO", filter.A2553NMEMO);
            cs.setString("IN_DESCR", filter.A2553DESCR);
            cs.setString("IN_ARCHV", filter.A2553ARCHV);
            //cs.setString("IN_ARCHV2", filter.A2553ARCHV2);
            //cs.setString("IN_ARCHV3", filter.A2553ARCHV3);
            cs.setString("IN_PAIS", filter.A2553PAIS);
            cs.setString("IN_FOLIO", filter.A2553FOLIO);

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

    public List<A1673Filter> searchLstProvisi(A1673Filter filter) throws SQLException, Exception {
        List<A1673Filter> lstRtn = new ArrayList<A1673Filter>(0);
        A1673Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PXSAUDIT.SQP02035(?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.VP_PREME);
            cstmt01.setString(3, filter.VP_CNXPA);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {

                objRtn = new A1673Filter();
                objRtn.A1673FORMA = rs01.getString("A3161CIA") + "" + rs01.getString("A3161FORMA") + "" + rs01.getString("A3161SERIE") + "" + rs01.getString("A3161SEQ") + "" + rs01.getString("A3161CUPON");
                objRtn.A1673TRNCU = rs01.getString("A3161TRNCU");
                objRtn.A1673MONED = rs01.getString("A3161MONED");
                objRtn.A1673TXMIA = rs01.getDouble("A3161COMIC");
                objRtn.IATA = rs01.getString("A3161IATA");
                objRtn.DIREC = rs01.getString("A3161DESCR");
                objRtn.A1673PAIS = rs01.getString("A3161PAIS");
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

    public String insertTKT(ArrayList<SQP00911Filter> filter) throws SQLException, Exception {
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

    public String insertLisTracingFile(ArrayList<SQP00911Filter> ListDebitos, A2553 filter) throws SQLException, Exception {
        CallableStatement cs = null;
        ResultSet rst = null;
        String strSQL;
        String STR_RESULT = "";

        session.getCNXIBMDB2().open();
        try {
            String SQLCLL01 = "{CALL PXSAUDIT.SQP01858(?,?,?,?,?,?,?,?,?,?,?)}";
            //String SQLCLL01 = "{CALL PXSAUDIT.SQP03352(?,?,?,?,?,?,?,?,?,?,?,?,?)}";
            cs = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);
            for (SQP00911Filter obj : ListDebitos) {

                cs.setString("IN_CCUST", session.getUserView().getCustomerInfo().CCUST);
                cs.setString("IN_TRNCU", obj.A2548TRNCO);
                cs.setString("IN_STAT", filter.A2553STAT);
                cs.setString("IN_NMEMO", obj.A2548CNXPA);
                cs.setString("IN_DESCR", filter.A2553DESCR);
                cs.setString("IN_ARCHV", filter.A2553ARCHV);
                //cs.setString("IN_ARCHV2", filter.A2553ARCHV2);
                //cs.setString("IN_ARCHV3", filter.A2553ARCHV3);
                cs.setString("IN_PAIS", obj.A2548PAIS);
                cs.setString("IN_FOLIO", filter.A2553FOLIO);
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

    public SQP00911Filter SearchDataIni(SQP00911Filter filter) throws SQLException, Exception {
        SQP00911Filter lstGeneral = null;

        List<SQP00911> lst_dataIni = new ArrayList<SQP00911>(0);
        List<A1580> lst_CalcuArelonia = new ArrayList<A1580>(0);
        List<A1673> lst_CalcuImpuestos = new ArrayList<A1673>(0);
        List<A2553> lst_razones = new ArrayList<A2553>(0);

        SQP00911Filter objRtnGeneral = null;
        SQP00911 objlst_dataIni = null;
        A1580 objlst_CalcuArelonia = null;
        A1673 objlst_CalcuImpuestos = null;
        A2553 objlst_razones = null;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        ResultSet rs02 = null;
        ResultSet rs03 = null;
        ResultSet rs04 = null;

        String SQLCLL01 = "{CALL PXSAUDIT.SQP03360(?,?)}";//SQP03361

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.VP_PREME);
            cstmt01.execute();
            rs01 = cstmt01.getResultSet();
            ///VALIDACION DE TARJETAS
            while (rs01.next()) {
                objlst_dataIni = new SQP00911();
                objlst_dataIni.A2548CCUST = rs01.getString("A2548CCUST");
                objlst_dataIni.A2548PREME = rs01.getString("A2548PREME");
                objlst_dataIni.A2548NMEMO = rs01.getString("A2548NMEMO");
                objlst_dataIni.A2548FEMI = rs01.getString("A2548FEMI");
                objlst_dataIni.A2548BASE = rs01.getString("A2548BASE");
                objlst_dataIni.A2548TO = rs01.getString("A2548TO");
                objlst_dataIni.A2548IATA = rs01.getString("A2548IATA");
                objlst_dataIni.A2548EMPLE = rs01.getString("A2548EMPLE");
                objlst_dataIni.A2548FLAG = rs01.getString("A2548FLAG");
                objlst_dataIni.A2548STAT = rs01.getString("A2548STAT");
                objlst_dataIni.A2548TRNCU = rs01.getString("A2548TRNCU");
                objlst_dataIni.A2548CNXPA = rs01.getString("A2548CNXPA");
                objlst_dataIni.A2548NFACT = rs01.getString("A2548NFACT");
                objlst_dataIni.A2548CIA = rs01.getString("A2548CIA");
                objlst_dataIni.A2548FORMA = rs01.getString("A2548FORMA");
                objlst_dataIni.A2548SERIE = rs01.getString("A2548SERIE");
                objlst_dataIni.A2548TIKET = rs01.getString("A2548CIA") + "" + rs01.getString("A2548FORMA") + "" + rs01.getString("A2548SERIE");
                objlst_dataIni.A2548CDGT = rs01.getString("A2548CDGT");
                objlst_dataIni.A2548TRNCO = rs01.getString("A2548TRNCO");
                objlst_dataIni.A2548CNJ = rs01.getString("A2548CNJ");
                objlst_dataIni.A2548PAIS = rs01.getString("A2548PAIS");
                objlst_dataIni.A2548TVTA = rs01.getString("A2548TVTA");
                objlst_dataIni.A2548FTE = rs01.getString("A2548FTE");
                objlst_dataIni.A2548CANAL = rs01.getString("A2548CANAL");
                objlst_dataIni.A2548FVTA = rs01.getString("A2548FVTA");
                objlst_dataIni.A2548TPAX = rs01.getString("A2548TPAX");
                objlst_dataIni.A2548PAX = rs01.getString("A2548PAX");
                objlst_dataIni.A2548CODIT = rs01.getString("A2548CODIT");
                objlst_dataIni.A2548CPN = rs01.getString("A2548CPN");
                objlst_dataIni.A2548USOS = rs01.getString("A2548USOS");
                objlst_dataIni.A2548MDA = rs01.getString("A2548MDA");
                objlst_dataIni.A2548TASAC = rs01.getString("A2548TASAC");
                objlst_dataIni.A2548TASAA = rs01.getString("A2548TASAA");
                objlst_dataIni.A2548NRCOR = rs01.getString("A2548NRCOR");

                objlst_dataIni.A2548EMITI = rs01.getString("A2548EMITI");
                objlst_dataIni.A2548FEMIT = rs01.getString("A2548FEMIT");
                objlst_dataIni.A2548ENVIA = rs01.getString("A2548ENVIA");
                objlst_dataIni.A2548FENVI = rs01.getString("A2548FENVI");
                objlst_dataIni.A2548DISPU = rs01.getString("A2548DISPU");
                objlst_dataIni.A2548FDISP = rs01.getString("A2548FDISP");
                objlst_dataIni.A2548SEQ = rs01.getString("A2548SEQ");
                objlst_dataIni.A2548OBSER = rs01.getString("A2548OBSER");
                objlst_dataIni.A2548CIUD = rs01.getString("A2548CIUD");
                objlst_dataIni.A2548TASAD = rs01.getString("A2548TASAD");

                objlst_dataIni.A2548REGIS = rs01.getString("A2548REGIS");
                objlst_dataIni.A2548FREGI = rs01.getString("A2548FREGI");
                objlst_dataIni.A2548FCONT = rs01.getString("A2548FCONT");
                objlst_dataIni.A2548TYPE = rs01.getString("A2548TYPE");
                objlst_dataIni.A2548AREA = rs01.getString("A2548AREA");
                objlst_dataIni.A2548FFILE = rs01.getString("A2548FFILE");
                objlst_dataIni.A2548CTAC = rs01.getString("A2548CTAC");
                objlst_dataIni.A2548DESC1 = rs01.getString("A2548DESC1");
                objlst_dataIni.A2548NMERF = rs01.getString("A2548NMERF");
                objlst_dataIni.AGENCY = rs01.getString("AGENCY");
                objlst_dataIni.A2548FPROC = rs01.getString("A2548FPROC");
                objlst_dataIni.DIRAGENCY = rs01.getString("DIRAGENCY");
                objlst_dataIni.A2548CATNDOCUM = rs01.getInt("VL_CANTDOC");
                objlst_dataIni.A2548TCAMB = rs01.getDouble("A2548TCAMB");
                //AERO
                objlst_dataIni.A2548TARIF = rs01.getDouble("A2548TARIF");
                objlst_dataIni.A2548TTAX = rs01.getDouble("A2548TTAX");
                objlst_dataIni.A2548SERVI = rs01.getDouble("A2548SERVI");
                objlst_dataIni.A2548COMIS = rs01.getDouble("A2548COMIS");
                objlst_dataIni.A2548SCOM = rs01.getDouble("A2548SCOM");
                objlst_dataIni.A2548TAXCM = rs01.getDouble("A2548TAXCM");
                objlst_dataIni.A2548PORCO = rs01.getDouble("A2548PORCO");
                objlst_dataIni.A2548PENAL = rs01.getDouble("A2548PENAL");
                objlst_dataIni.A2548FEE = rs01.getDouble("A2548FEE");
                objlst_dataIni.A2548TOTAL = rs01.getDouble("A2548TOTAL");
                //AGENCIA
                objlst_dataIni.A2548TARIA = rs01.getDouble("A2548TARIA");
                objlst_dataIni.A2548TTAXA = rs01.getDouble("A2548TTAXA");
                objlst_dataIni.A2548SERVA = rs01.getDouble("A2548SERVA");
                objlst_dataIni.A2548COMIA = rs01.getDouble("A2548COMIA");
                objlst_dataIni.A2548SCOMA = rs01.getDouble("A2548SCOMA");
                objlst_dataIni.A2548TAXCA = rs01.getDouble("A2548TAXCA");
                objlst_dataIni.A2548PORCA = rs01.getDouble("A2548PORCA");
                objlst_dataIni.A2548PENAA = rs01.getDouble("A2548PENAA");
                objlst_dataIni.A2548FEEA = rs01.getDouble("A2548FEEA");
                objlst_dataIni.A2548TOTAA = rs01.getDouble("A2548TOTAA");
                //DIFEREN

                objlst_dataIni.A2548TARID = rs01.getDouble("A2548TARID");
                objlst_dataIni.A2548TTAXD = rs01.getDouble("A2548TTAXD");
                objlst_dataIni.A2548COMID = rs01.getDouble("A2548COMID");
                objlst_dataIni.A2548SCOMD = rs01.getDouble("A2548SCOMD");
                objlst_dataIni.A2548TAXCD = rs01.getDouble("A2548TAXCD");
                objlst_dataIni.A2548PORCD = rs01.getDouble("A2548PORCD");
                objlst_dataIni.A2548PENAD = rs01.getDouble("A2548PENAD");
                objlst_dataIni.A2548FEED = rs01.getDouble("A2548FEED");
                objlst_dataIni.A2548TTACD = rs01.getDouble("A2548TTACD");
                objlst_dataIni.A2548TTAMD = rs01.getDouble("A2548TTAMD");
                objlst_dataIni.A2548TCARD = rs01.getDouble("A2548TCARD");
                objlst_dataIni.A2548IVACD = rs01.getDouble("A2548IVACD");
                objlst_dataIni.A2548IVACS = rs01.getDouble("A2548IVACS");
                objlst_dataIni.A2548IVACA = rs01.getDouble("A2548IVACA");
                objlst_dataIni.A2548TOTAD = rs01.getDouble("A2548TOTAD");
                objlst_dataIni.A2548SERVD = rs01.getDouble("A2548SERVD");
                objlst_dataIni.A2548NETO = rs01.getDouble("A2548NETO");

                lst_dataIni.add(objlst_dataIni);
            }
            ////LIST DOCUMENTS
            if (cstmt01.getMoreResults()) {
                rs02 = cstmt01.getResultSet();
                while (rs02.next()) {
                    objlst_CalcuArelonia = new A1580();

                    objlst_CalcuArelonia.A1580FROM = rs02.getString("A1580FROM");
                    objlst_CalcuArelonia.A1580TO = rs02.getString("A1580TO");
                    objlst_CalcuArelonia.A1580CLASE = rs02.getString("A1580CLASE");
                    objlst_CalcuArelonia.A1580FBASI = rs02.getString("A1580FBASI");
                    objlst_CalcuArelonia.A1580RUTAC = rs02.getString("A1580RUTAC");
                    objlst_CalcuArelonia.CODIT = rs02.getString("CODIT");

                    objlst_CalcuArelonia.A1580FMIOR = rs02.getDouble("A1580FMIOR");
                    objlst_CalcuArelonia.A1580QMIOR = rs02.getDouble("A1580QMIOR");
                    objlst_CalcuArelonia.TotalFare = rs02.getDouble("TotalFare");
                    objlst_CalcuArelonia.A1580FAORI = rs02.getDouble("A1580FAORI");
                    objlst_CalcuArelonia.A1580CHAMI = rs02.getDouble("A1580CHAMI");
                    objlst_CalcuArelonia.A1580TOTMI = rs02.getDouble("A1580TOTMI");
                    objlst_CalcuArelonia.TotalTKT = rs02.getDouble("TotalTKT");

                    lst_CalcuArelonia.add(objlst_CalcuArelonia);
                }
            }
            //Card Type
            if (cstmt01.getMoreResults()) {
                rs03 = cstmt01.getResultSet();
                while (rs03.next()) {
                    objlst_CalcuImpuestos = new A1673();

                    objlst_CalcuImpuestos.A1673CDTAX = rs03.getString("A1673CDTAX");
                    objlst_CalcuImpuestos.A1673CDATO = rs03.getString("A2739CDATO");
                    
                    objlst_CalcuImpuestos.A1673TXORI = rs03.getDouble("A1673TXORI");
                    objlst_CalcuImpuestos.A1673TXMIA = rs03.getDouble("A1673TXMIA");
                    objlst_CalcuImpuestos.A1673TXDIF = rs03.getDouble("A1673TXDIF");
                    
                    lst_CalcuImpuestos.add(objlst_CalcuImpuestos);
                }
            }
            //LIST DE RAZONES
            if (cstmt01.getMoreResults()) {
                rs04 = cstmt01.getResultSet();
                while (rs04.next()) {
                    objlst_razones = new A2553();
                    objlst_razones.A2553CNXPA = rs04.getString("A2673CNXPA");
                    objlst_razones.A2553TYPO = rs04.getString("A2673TYPE");
                    objlst_razones.A2553CODE = rs04.getString("A2673CODE");
                    objlst_razones.A2553DESCR = rs04.getString("A2673ERROR");

                    lst_razones.add(objlst_razones);
                }
            }

            // FIN DE LA AGENCIA
            objRtnGeneral = new SQP00911Filter();
            objRtnGeneral.lst_Ini = lst_dataIni;
            objRtnGeneral.lst_CalcuArelonia = lst_CalcuArelonia;
            objRtnGeneral.lst_CalcuImpuestos = lst_CalcuImpuestos;
            objRtnGeneral.lst_Calcurazones = lst_razones;

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

    public List<A3807Filter> SearchTasaIva(A3807Filter filter) throws SQLException, Exception {
        List<A3807Filter> lstRtn = new ArrayList<A3807Filter>(0);
        A3807Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PXSAUDIT.SQP03548(?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.VP_PREME);
            cstmt01.setString(3, filter.VP_CNXPA);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {

                objRtn = new A3807Filter();
                objRtn.A3807CCUST = rs01.getString("A3807CCUST");
                objRtn.A3807PREME = rs01.getString("A3807PREME");
                objRtn.A3807CNXPA = rs01.getString("A3807CNXPA");
                objRtn.A3807CORRL = rs01.getString("A3807CORRL");
                objRtn.A3807TYPE = rs01.getString("A3807TYPE");
                objRtn.A3807TRNCU = rs01.getString("A3807TRNCU");
                objRtn.A3807FLAG = rs01.getString("A3807FLAG");
                objRtn.A3807DESC = rs01.getString("A3807DESC");
                objRtn.A3807TASA = rs01.getString("A3807TASA");
                objRtn.A3807IAPI = rs01.getString("A3807IAPI");
                objRtn.A3807IFA16 = rs01.getString("A3807IFA16");
                objRtn.A3807IFA00 = rs01.getString("A3807IFA00");

                objRtn.A3807FARE = rs01.getDouble("A3807FARE");
                objRtn.A3807IVA = rs01.getDouble("A3807IVA");
                objRtn.A3807RANGO = rs01.getDouble("A3807RANGO");
                objRtn.A3807FA16L = rs01.getDouble("A3807FA16L");
                objRtn.A3807FA00L = rs01.getDouble("A3807FA00L");

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
