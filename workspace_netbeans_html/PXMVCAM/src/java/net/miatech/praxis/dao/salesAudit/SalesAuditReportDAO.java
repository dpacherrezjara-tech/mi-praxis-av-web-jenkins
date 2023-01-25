package net.miatech.praxis.dao.salesAudit;

// <editor-fold defaultstate="collapsed" desc="import">
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.exceptions.SpringException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.SaleAudit.A1580Filter;
import net.miatech.beans.SaleAudit.A1672Filter;
import net.miatech.beans.SaleAudit.A1673Filter;
import net.miatech.beans.SaleAudit.SQP00989Filter;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

// </editor-fold>
/**
 *
 * @author gsanchez
 */
public class SalesAuditReportDAO {

    private IServerSession session;
    private static final Logger logError = Logger.getLogger("errorLog");

    public void setSession(IServerSession ss) {
        session = ss;
    }
    
    public List<A1672Filter> lstsearch(A1672Filter filter) throws SQLException, Exception {
        List<A1672Filter> lstRtn = new ArrayList<A1672Filter>(0);
        A1672Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PXSAUDIT.SQP01011(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
        //String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00807(?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.registerOutParameter(21, Types.INTEGER);
            cstmt01.registerOutParameter(22, Types.INTEGER);
            cstmt01.registerOutParameter(23, Types.INTEGER);
            cstmt01.registerOutParameter(24, Types.INTEGER);

            cstmt01.setInt(1, filter.VP_FILTER);
            cstmt01.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(3, filter.VP_CIA);
            cstmt01.setString(4, filter.VP_FRMSRIE);
            cstmt01.setString(5, filter.VP_SEQ);
            cstmt01.setString(6, filter.VP_SOURCE);
            cstmt01.setString(7, filter.VP_CANAL);
            cstmt01.setString(8, filter.VP_IATA);
            cstmt01.setString(9, filter.VP_IT);
            cstmt01.setString(10, filter.VP_FBASIS);
            cstmt01.setString(11, filter.VP_CODREASON);
            cstmt01.setString(12, filter.VP_TYMEMO);
            cstmt01.setString(13, filter.VP_AUDIT);
            cstmt01.setString(14, filter.VP_STATUS);
            cstmt01.setString(15, filter.VP_DATEFROM);
            cstmt01.setString(16, filter.VP_DATETO);
            cstmt01.setString(17, filter.VP_TRNCU);
            cstmt01.setString(18, filter.VP_STREVISION);
            cstmt01.setString(19, filter.VP_TDOC);
            cstmt01.setString(20, filter.VP_PAIS);

            cstmt01.setInt(21, filter.page.PAGNUM);
            cstmt01.setInt(22, filter.page.PAGROW);
            cstmt01.setInt(23, filter.page.TOTPAG);
            cstmt01.setInt(24, filter.page.TOTROW);

            cstmt01.execute();

            //System.out.println("Aqui entro con Filtro Categoria: ");
            filter.page.PAGNUM = cstmt01.getInt(21);
            filter.page.PAGROW = cstmt01.getInt(22);
            filter.page.TOTPAG = cstmt01.getInt(23);
            filter.page.TOTROW = cstmt01.getInt(24);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {

                objRtn = new A1672Filter();
                if (!filter.VP_FILTER.equals("4") || (filter.VP_FILTER.equals("4") && rs01.getString("TRAMO").equals("1"))) {
                    //PRIMARY KEY
                    objRtn.A1672CCUST = rs01.getString("A1672CCUST");
                    objRtn.A1672CIA = rs01.getString("A1672CIA");
                    objRtn.A1672FORMA = rs01.getString("A1672FORMA");
                    objRtn.A1672SERIE = rs01.getString("A1672SERIE");
                    objRtn.A1672SEQ = rs01.getString("A1672SEQ");
                    objRtn.A1672CUPON = rs01.getString("A1672CUPON");
                    if(rs01.getString("A1672STO0").equals("YES")){
                        if(rs01.getString("A1672REVIS").trim().equals("")){
                            objRtn.A1672REVIS = "AUT";
                        }else{
                            objRtn.A1672REVIS = rs01.getString("A1672REVIS");
                        }
                        
                    }else{
                        objRtn.A1672REVIS = rs01.getString("A1672REVIS");
                    }
                    

                    objRtn.A1672TICKET = rs01.getString("A1672TICKET");
                    objRtn.A1672FUENT = rs01.getString("A1672FUENT");
                    objRtn.A1672TRNCU = rs01.getString("A1672TRNCU");
                    objRtn.A1672FVENT = rs01.getString("A1672FVENT");
                    objRtn.A1672FPROC = rs01.getString("A1672FPROC");
                    objRtn.A1672CANAL = rs01.getString("A1672CANAL");
                    objRtn.A1672AGENT = rs01.getString("A1672AGENT");
                    objRtn.A1672NAGENCY = rs01.getString("A1672NAGENCY");
                    objRtn.A1672CODIT = rs01.getString("A1672CODIT");
                    objRtn.A1672ITIN = rs01.getString("A1672ITIN");
                    objRtn.A1672FBASI = rs01.getString("A1672FBASI");
                    objRtn.A1672ERROR = rs01.getString("A1672ERROR");
                    objRtn.A1672NREASON = rs01.getString("A1672NREASON");
                    objRtn.A1672MEMO = rs01.getString("A1672MEMO");
                    objRtn.A1672CURRENCY = rs01.getString("A1672CURRENCY");
                    objRtn.A1672TTMIA = rs01.getString("A1672TTMIA");
                    objRtn.A1672TTAGT = rs01.getString("A1672TTAGT");
                    objRtn.A1672TTDIF = rs01.getString("A1672TTDIF");

                    objRtn.A1672STO0 = rs01.getString("A1672STO0");
                    objRtn.A1672FLADM = rs01.getString("A1672FLADM");
                    objRtn.A1672STAT = rs01.getString("A1672STAT");
                    objRtn.A1672TDOC = rs01.getString("A1672TDOC");

                    objRtn.A1672GRUPO = rs01.getString("A1672GRUPO");
                    objRtn.A1672PAIVT = rs01.getString("A1672PAIVT");
                    objRtn.A2548FLAG = rs01.getString("STATACEPT");
                    objRtn.A1672FREGI = rs01.getString("A1672FREGI");
                    objRtn.A1672CHADI = rs01.getString("A2548NMEMO");

                    objRtn.A1672COMEN = rs01.getString("A1672COMEN");
                    objRtn.A1672CMBPO = rs01.getString("A1672CMBPO");
                    objRtn.A1672TKCNX = rs01.getString("A1672CNX1");
                    objRtn.A1672IDFIL = rs01.getString("A1672IDFIL");

                    objRtn.page.PAGNUM = filter.page.PAGNUM;
                    objRtn.page.PAGROW = filter.page.PAGROW;
                    objRtn.page.TOTPAG = filter.page.TOTPAG;
                    objRtn.page.TOTROW = filter.page.TOTROW;
                    lstRtn.add(objRtn);
                }
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
    
    public List<A1580Filter> lstComponent(A1672Filter filter) throws SQLException, Exception {
        List<A1580Filter> lstRtn = new ArrayList<A1580Filter>(0);
        A1580Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PXSAUDIT.SQP01012(?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.VP_CIA);
            cstmt01.setString(3, filter.VP_FRMSRIE);
            cstmt01.setString(4, filter.VP_SEQ);
            cstmt01.setString(5, filter.VP_CUPON);
            cstmt01.setString(6, filter.VP_TRNCU);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {

                objRtn = new A1580Filter();

                objRtn.A1580CORRL = rs01.getString("A1580CORRL");
                objRtn.A1580FROM = rs01.getString("A1580FROM") + '-' + rs01.getString("A1580TO");
                objRtn.A1580TO = rs01.getString("A1580TO");
                objRtn.A1580CARR = rs01.getString("A1580CARR");
                objRtn.A1580CLASE = rs01.getString("A1580CLASE");
                objRtn.A1580NVLO = rs01.getString("A1580NVLO");
                objRtn.A1580FVLO = rs01.getString("A1580FVLO");
                objRtn.A1580HVLO = rs01.getString("A1580HVLO");
                objRtn.A1580FBASI = rs01.getString("A1580FBASI");
                objRtn.A1580FARE = rs01.getDouble("A1580FARE");
                objRtn.A1580MDA = rs01.getString("A1580MDA");
                objRtn.A1580MORIG = rs01.getString("A1580MORIG");
                objRtn.A1580FAORI = rs01.getDouble("A1580FAORI");
                objRtn.A1580QORIG = rs01.getDouble("A1580QORIG");
                objRtn.A1580NUC = rs01.getDouble("A1580NUC");
                objRtn.A1580ROE = rs01.getDouble("A1580ROE");

                objRtn.A1580STAT = rs01.getString("A1580STAT");
                objRtn.A1580SBSTA = rs01.getString("A1580SBSTA");
                objRtn.A1580ERROR = rs01.getString("A1580ERROR");
                objRtn.A1580MMORI = rs01.getString("A1580MMORI");
                objRtn.A1580FMIOR = rs01.getDouble("A1580FMIOR");
                objRtn.A1580QMIOR = rs01.getDouble("A1580QMIOR");
                objRtn.A1580FADIF = rs01.getDouble("A1580FADIF");
                objRtn.A1580QDIF = rs01.getDouble("A1580QDIF");

                objRtn.A1580CCUST = rs01.getString("A1580CCUST");
                objRtn.A1580CIA = rs01.getString("A1580CIA");
                objRtn.A1580FORMA = rs01.getString("A1580FORMA");
                objRtn.A1580SERIE = rs01.getString("A1580SERIE");
                objRtn.A1580SEQ = rs01.getString("A1580SEQ");
                objRtn.A1580CUPON = rs01.getString("A1580CUPON");
                objRtn.A1580TRNCU = rs01.getString("A1580TRNCU");
                objRtn.A1580FLADM = rs01.getString("A1580FLADM");

                objRtn.A1580Q = rs01.getDouble("A1580Q");
                objRtn.A1580MDAAT = rs01.getString("A1580MDAAT");
                objRtn.A1580ROEAT = rs01.getDouble("A1580ROEAT");
                objRtn.A1580FARAT = rs01.getDouble("A1580FARAT");
                objRtn.A1580QATPC = rs01.getDouble("A1580QATPC");
                objRtn.A1580SOATP = rs01.getDouble("A1580SOATP");
                objRtn.A1580YQATP = rs01.getDouble("A1580YQATP");
                objRtn.A1580YRATP = rs01.getDouble("A1580YRATP");
                objRtn.A1580SOMIO = rs01.getDouble("A1580SOMIO");
                objRtn.A1580YQMIO = rs01.getDouble("A1580YQMIO");
                objRtn.A1580YRMIO = rs01.getDouble("A1580YRMIO");
                objRtn.A1580YQORI = rs01.getDouble("A1580YQORI");
                objRtn.A1580YRORI = rs01.getDouble("A1580YRORI");
                objRtn.A1580YQDIF = rs01.getDouble("A1580YQDIF");
                objRtn.A1580YRDIF = rs01.getDouble("A1580YRDIF");

                objRtn.A1580FEEAT = rs01.getString("A1580FEEAT");
                objRtn.A1580SOVER = rs01.getString("A1580SOVER");
                objRtn.A1580SOORI = rs01.getString("A1580SOORI");
                objRtn.A1580APPLY = rs01.getString("A1580APPLY");
                objRtn.A1580MDAPN = rs01.getString("A1580MDAPN");
                objRtn.A1580PENAL = rs01.getString("A1580PENAL");
                objRtn.A1580INCCP = rs01.getString("A1580INCCP");
                objRtn.A1580EXCLU = rs01.getString("A1580EXCLU");
                objRtn.A1580TOX = rs01.getString("A1580TOX");
                objRtn.A1580FROMX = rs01.getString("A1580FROMX");

                lstRtn.add(objRtn);

                System.out.println("termino lista COMPONENTE");
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

    public List<A1580Filter> lstComponentUsed(A1672Filter filter) throws SQLException, Exception {
        List<A1580Filter> lstRtn = new ArrayList<A1580Filter>(0);
        A1580Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PXSAUDIT.SQP01501(?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.VP_CIA);
            cstmt01.setString(3, filter.VP_FRMSRIE);
            cstmt01.setString(4, filter.VP_SEQ);
            cstmt01.setString(5, filter.VP_CUPON);
            cstmt01.setString(6, filter.VP_TRNCU);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {

                objRtn = new A1580Filter();

                objRtn.A1580CORRL = rs01.getString("A2908CORRL");
                objRtn.A1580FROM = rs01.getString("A2908FROM") + '-' + rs01.getString("A2908TO");
                objRtn.A1580CARR = rs01.getString("A2908CARR");
                objRtn.A1580CLASE = rs01.getString("A2908CLASE");
                objRtn.A1580FBASI = rs01.getString("A2908FBASI");
                objRtn.A1580FARE = rs01.getDouble("A2908FARE");
                objRtn.A1580MDAAT = rs01.getString("A2908MDAAT");
                objRtn.A1580NUC = rs01.getDouble("A2908NUC");
                objRtn.A1580ROEAT = rs01.getDouble("A2908ROEAT");

                objRtn.A1580STAT = rs01.getString("A2908STAT");
                objRtn.A1580ERROR = rs01.getString("A2908ERROR");
                objRtn.A1580MMORI = rs01.getString("A2908MMORI");
                objRtn.A1580FMIOR = rs01.getDouble("A2908FMIOR");
                objRtn.A1580QMIOR = rs01.getDouble("A2908QMIOR");

                objRtn.A1580FLADM = rs01.getString("A2908FLADM");

                objRtn.A1580Q = rs01.getDouble("A2908Q");
                objRtn.A1580SOMIO = rs01.getDouble("A2908SOMIO");

                objRtn.A1580FEEAT = rs01.getString("A2908FEEAT");
                objRtn.A1580SOVER = rs01.getString("A2908SOVER");
                objRtn.A1580APPLY = rs01.getString("A2908APPLY");
                objRtn.A1580PENAL = rs01.getString("A2908PENAL");
                objRtn.A1580INCCP = rs01.getString("A2908INCCP");
                objRtn.A1580EXCLU = rs01.getString("A2908EXCLU");

                lstRtn.add(objRtn);

                System.out.println("termino lista COMPONENTE");
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

    public List<A1580Filter> lstComponentOld(A1672Filter filter) throws SQLException, Exception {
        List<A1580Filter> lstRtn = new ArrayList<A1580Filter>(0);
        A1580Filter recADM2 = null;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PXSAUDIT.SQP01431(?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.VP_CIA);
            cstmt01.setString(3, filter.VP_FRMSRIE);
            cstmt01.setString(4, filter.VP_SEQ);
            cstmt01.setString(5, filter.VP_CUPON);
            cstmt01.setString(6, filter.VP_TRNCU);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {

                recADM2 = new A1580Filter();

                recADM2.A1580APPLY = rs01.getString("A2837APPLY");
                recADM2.A1580CIA = rs01.getString("A2837CIA");
                recADM2.A1580FORMA = rs01.getString("A2837FORMA");
                recADM2.A1580SERIE = rs01.getString("A2837SERIE");
                recADM2.A1580SEQ = rs01.getString("A2837SEQ");
                recADM2.A1580CUPON = rs01.getString("A2837CUPON");
                recADM2.A1580TRNCU = rs01.getString("A2837TRNCU");
                recADM2.A1580CORRL = rs01.getString("A2837CORRL");
                recADM2.A2837CIANW = rs01.getString("A2837CIANW") + rs01.getString("A2837FORNW") + rs01.getString("A2837SERNW");
                recADM2.A2837FORNW = rs01.getString("A2837FORNW");
                recADM2.A2837SERNW = rs01.getString("A2837SERNW");
                recADM2.A2837CCORR = rs01.getString("A2837CCORR");
                recADM2.A2837CONEX = rs01.getString("A2837CONEX");
                recADM2.A1580FROM = rs01.getString("A2837FROM") + rs01.getString("A2837TO");
                recADM2.A1580TO = rs01.getString("A2837TO");
                recADM2.A2837CIAPA = rs01.getString("A2837CIAPA") + rs01.getString("A2837FORPA") + rs01.getString("A2837SERPA");
                recADM2.A2837FORPA = rs01.getString("A2837FORPA");
                recADM2.A2837SERPA = rs01.getString("A2837SERPA");
                recADM2.A1580CARR = rs01.getString("A2837CARR");
                recADM2.A1580CLASE = rs01.getString("A2837CLASE");
                recADM2.A1580FBASI = rs01.getString("A2837FBASI");
                recADM2.A1580MDAAT = rs01.getString("A2837MDAAT");
                recADM2.A1580ROEAT = rs01.getDouble("A2837ROEAT");
                recADM2.A1580FEEAT = rs01.getString("A2837FEEAT");
                recADM2.A1580MMORI = rs01.getString("A2837MMORI");
                recADM2.A1580FMIOR = rs01.getDouble("A2837FMIOR");
                recADM2.A1580QMIOR = rs01.getDouble("A2837QMIOR");
                recADM2.A2837FEEMI = rs01.getString("A2837FEEMI");
                recADM2.A1580MDA = rs01.getString("A2837MDA");
                recADM2.A1580FARE = rs01.getDouble("A2837FARE");
                recADM2.A1580Q = rs01.getDouble("A2837Q");
                recADM2.A2837BSR = rs01.getDouble("A2837BSR");
                recADM2.A1580MORIG = rs01.getString("A2837MORIG");
                recADM2.A1580FAORI = rs01.getDouble("A2837FAORI");
                recADM2.A1580QORIG = rs01.getDouble("A2837QORIG");
                recADM2.A1580YQORI = rs01.getDouble("A2837YQORI");
                recADM2.A1580YRORI = rs01.getDouble("A2837YRORI");
                recADM2.A1580STAT = rs01.getString("A2837STAT");
                recADM2.A1580ERROR = rs01.getString("A2837ERROR");
                recADM2.A1580FROMX = rs01.getString("A2837FROMX");
                recADM2.A1580TOX = rs01.getString("A2837TOX");
                recADM2.A2837FLAGO = rs01.getString("A2837FLAGO");
                recADM2.A2837TRNCO = rs01.getString("A2837TRNCO");
                recADM2.A2837FEMIO = rs01.getString("A2837FEMIO");
                recADM2.A2837IATAO = rs01.getString("A2837IATAO");

                lstRtn.add(recADM2);
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

    public List<A1673Filter> lstTax(A1672Filter filter) throws SQLException, Exception {
        List<A1673Filter> lstRtn = new ArrayList<A1673Filter>(0);
        A1673Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PXSAUDIT.SQP01013(?,?,?,?,?,?)}";
        //String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00807(?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.VP_CIA);
            cstmt01.setString(3, filter.VP_FRMSRIE);
            cstmt01.setString(4, filter.VP_SEQ);
            cstmt01.setString(5, filter.VP_CUPON);
            cstmt01.setString(6, filter.VP_TRNCU);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {

                objRtn = new A1673Filter();

                objRtn.A1673CORRL = rs01.getString("A1673CORRL");
                objRtn.A1673CDTAX = rs01.getString("A1673CDTAX");
                objRtn.A1673CDATO = rs01.getString("A1673CDATO");
                objRtn.A1673MORIG = rs01.getString("A1673MORIG");
                objRtn.A1673TXORI = rs01.getDouble("A1673TXORI");

                objRtn.A1673STAT = rs01.getString("A1673STAT");
                objRtn.A1673TXDIF = rs01.getDouble("A1673TXDIF");
                objRtn.A1673TXDAF = rs01.getDouble("A1673TXDAF");
                objRtn.A1673TXVTA = rs01.getDouble("A1673TXVTA");
                objRtn.A1673TXUSE = rs01.getDouble("A1673TXUSE");

                objRtn.A1673SBSTA = rs01.getString("A1673SBSTA");
                objRtn.A1673ERROR = rs01.getString("A1673ERROR");
                objRtn.A1673MONED = rs01.getString("A1673MONED");
                objRtn.A1673TXMIA = rs01.getDouble("A1673TXMIA");

                lstRtn.add(objRtn);

                System.out.println("termino lista TAX");
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
    
    public SQP00989Filter searchADMData(A1672Filter filter) throws SQLException, Exception {

        SQP00989Filter recADM = new SQP00989Filter();

        CallableStatement cstmt01 = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL PXSAUDIT.SQP00993(?,?,?,?,?,?)}";

        Connection cnx = null;
        try {

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.VP_CIA + filter.VP_FRMSRIE);
            cstmt01.setString(3, filter.VP_CUPON.trim());
            cstmt01.setString(4, filter.VP_SEQ);
            cstmt01.setString(5, filter.VP_TRNCU);
            cstmt01.setString(6, filter.A1672AGENT);

            cstmt01.execute();

            rst = cstmt01.getResultSet();
            while (rst.next()) {

                recADM = new SQP00989Filter();
                recADM.A1672CIA = rst.getString("A1672CIA").trim();
                recADM.A1672FORMA = rst.getString("A1672FORMA").trim();
                recADM.A1672SERIE = rst.getString("A1672SERIE").trim();
                recADM.strTicket = recADM.A1672CIA + " " + recADM.A1672FORMA + recADM.A1672SERIE;
                recADM.A1672FVENT = rst.getString("A1672FVENT").trim();
                recADM.A1672FUENT = rst.getString("A1672FUENT").trim();
                recADM.A1672CANAL = rst.getString("A1672CANAL").trim();
                recADM.A1672CTYVT = rst.getString("A1672CTYVT").trim();
                recADM.A1672PAIVT = rst.getString("A1672PAIVT").trim();
                recADM.A1672AGENT = rst.getString("A1672AGENT").trim();
                recADM.A1672FPROC = rst.getString("A1672FPROC").trim();
                recADM.A1672STAT = rst.getString("A1672STAT").trim();
                recADM.A1672MONTT = rst.getString("A1672MONTT").trim();
                recADM.A1672FLADM = rst.getString("A1672FLADM").trim();
                recADM.A1672CUPON = rst.getString("A1672CUPON").trim();
                recADM.A1672SEQ = rst.getString("A1672SEQ").trim();
                recADM.A1672TRNCU = rst.getString("A1672TRNCU").trim();
                recADM.A1672CURRENCY = rst.getString("A1672CURRENCY");

                recADM.A1672UASIG = rst.getString("A1672UASIG").trim();
                recADM.A1672FASIG = rst.getString("A1672FASIG").trim();
                recADM.A1672REVIS = rst.getString("A1672REVIS").trim();
                recADM.A1672FREVI = rst.getString("A1672FREVI").trim();
                recADM.A1672CTYEM = rst.getString("A1672CTYEM").trim();
                recADM.A1672TPAX = rst.getString("A1672TPAX").trim();
                recADM.A1672TARTK = rst.getString("A1672TARTK").trim();
                recADM.A1672EQVTK = rst.getString("A1672EQVTK").trim();
                recADM.A1672MONET = rst.getString("A1672MONET").trim();
                recADM.A1672ADC = rst.getString("A1672ADC").trim();
                recADM.A1672NUC = rst.getString("A1672NUC").trim();
                recADM.A1672ROE = rst.getString("A1672ROE").trim();
                recADM.A1672PLUS = rst.getString("A1672PLUS").trim();
                recADM.A1672SOVER = rst.getString("A1672SOVER").trim();
                recADM.A1672TCAMB = rst.getString("A1672TCAMB").trim();
                recADM.A1672CODIT = rst.getString("A1672CODIT").trim();
                recADM.A1672TDOC = rst.getString("A1672TDOC").trim();
                recADM.A1672GRUPO = rst.getString("A1672GRUPO").trim();
                recADM.A1672FCMI = rst.getString("A1672FCMI").trim();
                recADM.A1672TIPOF = rst.getString("A1672TIPOF").trim();
                recADM.A1672PAIEM = rst.getString("A1672PAIEM").trim();
                recADM.A1672COMEN = rst.getString("A1672COMEN").trim();
                recADM.A1672MODI = rst.getString("A1672MODI").trim();
                recADM.A1672ARPI = rst.getString("A1672ARPI").trim();
                recADM.A1672FCPI = rst.getString("A1672FCPI").trim();
                recADM.A1672SASI = rst.getString("A1672SASI").trim();
                recADM.A1672TRNCO = rst.getString("A1672TRNCO").trim();
                recADM.A1672IATAV = rst.getString("A1672IATAV").trim();
                recADM.A1672FECSL = rst.getString("A1672FECSL").trim();
                recADM.A1672FUENV = rst.getString("A1672FUENV").trim();
                recADM.A1672TRF = rst.getString("A1672TRF").trim();
                recADM.A1672ERROR = rst.getString("ERROR");
                recADM.A1672CMBPO = rst.getString("A1672CMBPO");

                recADM.A1672FMORI = rst.getString("A1672FMORI");
                recADM.A1672FAORI = rst.getString("A1672FAORI");
                recADM.A1672FADIF = rst.getString("A1672FADIF");

                recADM.A1672QMORI = rst.getString("A1672QMORI");
                recADM.A1672QORIG = rst.getString("A1672QORIG");
                recADM.A1672QDIF = rst.getString("A1672QDIF");

                recADM.A1672TXMIA = rst.getString("A1672TXMIA");
                recADM.A1672TXAGT = rst.getString("A1672TXAGT");
                recADM.A1672TXDIF = rst.getString("A1672TXDIF");

                recADM.A1672COMIA = rst.getString("A1672COMIA");
                recADM.A1672COAGT = rst.getString("A1672COAGT");
                recADM.A1672CODIF = rst.getString("A1672CODIF");

                recADM.A1672SCDIF = rst.getString("A1672SCDIF");
                recADM.A1672SCMIA = rst.getString("A1672SCMIA");
                recADM.A1672SCAGT = rst.getString("A1672SCAGT");

                recADM.A1672OVMIA = rst.getString("A1672OVMIA");
                recADM.A1672OVAGT = rst.getString("A1672OVAGT");
                recADM.A1672OVDIF = rst.getString("A1672OVDIF");

                recADM.A1672CHAMI = rst.getString("A1672CHAMI");
                recADM.A1672CHAOR = rst.getString("A1672CHAOR");
                recADM.A1672CHADI = rst.getString("A1672CHADI");

                recADM.A1672TTMIA = rst.getString("A1672TTMIA");
                recADM.A1672TTAGT = rst.getString("A1672TTAGT");
                recADM.A1672TTDIF = rst.getString("A1672TTDIF");
                //ZPP
                recADM.A1672CONXV = rst.getString("A1672CONXV");
                recADM.A1672ITIN = rst.getString("A1672ITIN");
                recADM.A1672CARR = rst.getString("A1672CARR");
                recADM.A1672NVLO = rst.getString("A1672NVLO");
                recADM.A1672FVLO = rst.getString("A1672FVLO");
                recADM.A1672CLASE = rst.getString("A1672CLASE");
                recADM.A1672CABIN = rst.getString("A1672CABIN");
                recADM.A1672FBASI = rst.getString("A1672FBASI");
                recADM.A1672MOTAI = rst.getString("A1672MOTAI");
                recADM.A1672MOEAI = rst.getString("A1672MOEAI");
                recADM.A1672DI = rst.getString("A1672DI");
                recADM.A1672FEMIO = rst.getString("A1672FEMIO");
                recADM.A1672IATAO = rst.getString("A1672IATAO");
                recADM.A1672CEMIO = rst.getString("A1672CEMIO");
                recADM.A1672CIAOR = rst.getString("A1672CIAOR");
                recADM.A1672FOROR = rst.getString("A1672FOROR");
                recADM.A1672SEROR = rst.getString("A1672SEROR");
                recADM.A1672QTYTK = rst.getString("A1672QTYTK");
                recADM.A1672DIVTA = rst.getString("A1672DIVTA");
                recADM.A1672FAREM = rst.getString("A1672FAREM");
                recADM.A1672EQVM = rst.getString("A1672EQVM");
                recADM.A1672CPNS = rst.getString("A1672CPNS");
                recADM.A1672MDAAD = rst.getString("A1672MDAAD");
                recADM.A1672FLAGP = rst.getString("A1672FLAGP");
                recADM.A1672FRESV = rst.getString("A1672FRESV");
                recADM.A1672MOTAU = rst.getString("A1672MOTAU");
                recADM.A1672MOEAU = rst.getString("A1672MOEAU");
                recADM.A1672RFIS = rst.getString("A1672RFIS");
                recADM.A1672RFICM = rst.getString("A1672RFICM");
                recADM.A1672CODWA = rst.getString("A1672CODWA");
                recADM.A1672CNX1 = rst.getString("A1672CNX1");
                recADM.A1672CNX2 = rst.getString("A1672CNX2");
                recADM.A1672CNX3 = rst.getString("A1672CNX3");
                recADM.A1672CNX4 = rst.getString("A1672CNX4");
                recADM.A1672QOVER = rst.getDouble("A1672QOVER");
                recADM.A1672YQORI = rst.getDouble("A1672YQORI");
                recADM.A1672PSCAG = rst.getString("A1672PSCAG");
                recADM.A1672TARAI = rst.getDouble("A1672TARAI");
                recADM.A1672EQVAI = rst.getDouble("A1672EQVAI");
                recADM.A1672YQPGM = rst.getDouble("A1672YQPGM");
                recADM.A1672YRPGM = rst.getDouble("A1672YRPGM");
                recADM.A1672PNTMI = rst.getDouble("A1672PNTMI");
                recADM.A1672FAREN = rst.getDouble("A1672FAREN");
                recADM.A1672EQVN = rst.getDouble("A1672EQVN");
                recADM.A1672BSR = rst.getDouble("A1672BSR");
                recADM.A1672TARAU = rst.getDouble("A1672TARAU");
                recADM.A1672EQVAU = rst.getDouble("A1672EQVAU");
                recADM.A1672SOVAI = rst.getDouble("A1672SOVAI");
                recADM.A1672ADCAI = rst.getDouble("A1672ADCAI");
                recADM.A1672FAOLD = rst.getDouble("A1672FAOLD");
                recADM.A1672PNTIV = rst.getDouble("A1672PNTIV");
                recADM.A1672RUTAF = rst.getString("A1672RUTAF");
                recADM.A1672NAMEF = rst.getString("A1672NAMEF");
                 recADM.A1672TKCNX = rst.getString("A1672CNX1");

            }
        } finally {
            if (rst != null) {
                try {
                    rst.close();
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
        return recADM;
    }
    
    public List<A1672Filter> lstItinerary(A1672Filter filter) throws SQLException, Exception {
        List<A1672Filter> lstRtn = new ArrayList<A1672Filter>(0);
        A1672Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PXSAUDIT.SQP01153(?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.VP_CIA + filter.VP_FRMSRIE);
            cstmt01.setString(3, filter.VP_SEQ);
            cstmt01.setString(4, filter.VP_CUPON);
            cstmt01.setString(5, filter.VP_TRNCU.trim());

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {

                objRtn = new A1672Filter();

                objRtn.VP_FRMSRIE = filter.VP_CIA + filter.VP_FRMSRIE;
                objRtn.A1672CUPON = rs01.getString("CUPON");
                objRtn.ORIGEN = rs01.getString("ORIGEN");
                objRtn.DESTINO = rs01.getString("DESTINO");
                objRtn.A1672CARR = rs01.getString("CARRIER");
                objRtn.A1672NVLO = rs01.getString("NVLO");
                objRtn.A1672FVLO = rs01.getString("FVLO");
                objRtn.A1672CLASE = rs01.getString("CLASE");
                objRtn.A1672FBASI = rs01.getString("FBASIS");
                objRtn.A1672CONEX = rs01.getString("CONEXION");
                objRtn.A1672CABIN = rs01.getString("CABINA");
                objRtn.A1672CPNS = rs01.getString("CUPONES");

                lstRtn.add(objRtn);

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
}
