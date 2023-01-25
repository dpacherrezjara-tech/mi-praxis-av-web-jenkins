package net.miatech.praxis.dao.sales;

// <editor-fold defaultstate="collapsed" desc="Imports">
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
import net.miatech.beans.SaleAudit.A1673Filter;
import net.miatech.beans.SaleAudit.A2960Filter;
import net.miatech.beans.SaleAudit.SQP00911Filter;
import net.miatech.beans.SaleAudit.SQP01362Filter;
import net.miatech.praxis.A051;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

// </editor-fold>
/**
 *
 * @author gsanchez
 */
public class DeterminationOfCommissionDAO {

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

    public List<SQP01362Filter> getListTicketTesting(SQP01362Filter filter) throws SQLException, Exception {
        List<SQP01362Filter> lstRtn = new ArrayList<SQP01362Filter>(0);
        SQP01362Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PXCOMM.SQP01801(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";//" + session.getMainLibrary() + "
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            //cstmt01.registerOutParameter(5, Types.INTEGER);
            //cstmt01.setString(2, session.getUserView().getCustomerInfo().CCUST);
            
            cstmt01.registerOutParameter(12, Types.INTEGER);
            cstmt01.registerOutParameter(13, Types.INTEGER);
            cstmt01.registerOutParameter(14, Types.INTEGER);
            cstmt01.registerOutParameter(15, Types.INTEGER);
            
            cstmt01.setString(1, filter.VP_CIA);
            cstmt01.setString(2, filter.VP_FPROC_D);
            cstmt01.setString(3, filter.VP_FPROC_H);
            cstmt01.setString(4, filter.VP_FORMA);
            cstmt01.setString(5, filter.VP_SERIE);
            cstmt01.setString(6, filter.VP_A2959IATAH);
            cstmt01.setString(7, filter.VP_A2959AGENT);
            cstmt01.setString(8, filter.A2845INDAC);
            cstmt01.setString(9, filter.VP_SCHEMA);
            cstmt01.setString(10, filter.VP_FUENT);
            cstmt01.setString(11, filter.VP_PAIVTA);
            
            cstmt01.setInt(12, filter.page.PAGNUM);
            cstmt01.setInt(13, filter.page.PAGROW);
            cstmt01.setInt(14, filter.page.TOTPAG);
            cstmt01.setInt(15, filter.page.TOTROW);
            cstmt01.execute();
            
            filter.page.PAGNUM = cstmt01.getInt(12);
            filter.page.PAGROW = cstmt01.getInt(13);
            filter.page.TOTPAG = cstmt01.getInt(14);
            filter.page.TOTROW = cstmt01.getInt(15);

            rs01 = cstmt01.getResultSet();

            while (rs01.next()) {
                objRtn = new SQP01362Filter();
                objRtn.RN = rs01.getInt("RN");
                objRtn.A2845AIRLI = rs01.getString("A2845AIRLI");
                objRtn.A2845FPROC = Functions.getMonthConvertDate(rs01.getString("A2845FPROC"));//rs01.getString("A2650FPROC").trim();
                objRtn.A2845CIA = rs01.getString("A2845CIA").trim();
                objRtn.A2845FORMA = rs01.getString("A2845FORMA").trim();
                objRtn.A2845SERIE = rs01.getString("A2845SERIE").trim();
                objRtn.A2845CUPON = rs01.getString("A2845CUPON").trim();
                objRtn.A2845SEQ = rs01.getString("A2845SEQ").trim();
                //objRtn.A2845DCHEQ = rs01.getString("A2845DCHEQ").trim();
                objRtn.A2845CIAI = rs01.getString("A2845CIAI").trim();
                objRtn.A2845FORMI = rs01.getString("A2845FORMI").trim();
                objRtn.A2845SERII = rs01.getString("A2845SERII").trim();
                objRtn.A2845FLAG = rs01.getString("A2845FLAG").trim();
                objRtn.A2845NSEQ = rs01.getString("A2845NSEQ").trim();
                //objRtn.A2845CTKTC = rs01.getString("A2845CTKTC").trim();
                objRtn.A2845CODAC = rs01.getString("A2845CODAC").trim();
                objRtn.A2845INDAC = rs01.getString("A2845INDAC").trim();
                objRtn.A2845VRSAC = rs01.getString("A2845VRSAC").trim();
                objRtn.A2845IATAH = rs01.getString("A2845IATAH").trim();
                objRtn.A2845AGENT = rs01.getString("A2845AGENT").trim();
                objRtn.A2845TVENT = rs01.getString("A2845TVENT").trim();
                objRtn.A2845ORIG = rs01.getString("A2845ORIG").trim();
                objRtn.A2845CODIT = rs01.getString("A2845CODIT").trim();
                objRtn.A2845FECVT = Functions.getMonthConvertDate(rs01.getString("A2845FECVT"));
                objRtn.A2845PAIVT = rs01.getString("A2845PAIVT").trim();
                objRtn.A2845CIUVT = rs01.getString("A2845CIUVT").trim();
                objRtn.A2845PAIEM = rs01.getString("A2845PAIEM").trim();
                objRtn.A2845CIUEM = rs01.getString("A2845CIUEM").trim();
                //objRtn.A2845TRNCO = rs01.getString("A2845TRNCO").trim();
                objRtn.A2845TRNCU = rs01.getString("A2845TRNCU").trim();
                objRtn.A2845TDOC = rs01.getString("A2845TDOC").trim();
                //objRtn.A2845PAIS = rs01.getString("A2845PAIS").trim();
                objRtn.A2845RPDA = rs01.getString("A2845RPDA").trim();
                objRtn.A2845GRUPO = rs01.getString("A2845GRUPO").trim();


                objRtn.A2845STAT = rs01.getString("A2845STAT").trim();
                objRtn.A2845IDFIL = rs01.getString("A2845IDFIL").trim();
                //objRtn.A2845TCREG = rs01.getString("A2845TCREG").trim();
                //objRtn.A2845MNREG = rs01.getString("A2845MNREG").trim();
                //objRtn.A2845TCSYS = rs01.getString("A2845TCSYS").trim();
                //objRtn.A2845MNSYS = rs01.getString("A2845MNSYS").trim();
                objRtn.A2845PRO = rs01.getString("A2845PRO").trim();
                objRtn.A2845BASE = rs01.getString("A2845BASE").trim();
                objRtn.A2845MONET = rs01.getString("A2845MONET").trim();
                objRtn.A2845TARIF = rs01.getString("A2845TARIF").trim();
                objRtn.A2845MDAPG = rs01.getString("A2845MDAPG").trim();
                objRtn.A2845TRFPG = rs01.getString("A2845TRFPG").trim();
                objRtn.A2845TCAPG = rs01.getString("A2845TCAPG").trim();


                objRtn.A2845TRNUC = rs01.getString("A2845TRNUC").trim();
                objRtn.A2845ROE = rs01.getString("A2845ROE").trim();
                objRtn.A2845CPLUS = rs01.getString("A2845CPLUS").trim();
                objRtn.A2845CSOVR = rs01.getString("A2845CSOVR").trim();
                objRtn.A2845QSOVR = rs01.getString("A2845QSOVR").trim();
                objRtn.A2845TAJUS = rs01.getString("A2845TAJUS").trim();
                //objRtn.A2845RFIC = rs01.getString("A2845RFIC").trim();
                objRtn.A2845FARE = rs01.getString("A2845FARE").trim();
                objRtn.A2845MDAFA = rs01.getString("A2845MDAFA").trim();
                objRtn.A2845ADC = rs01.getString("A2845ADC").trim();
                objRtn.A2845MDAAD = rs01.getString("A2845MDAAD").trim();
                objRtn.A2845ORIGX = rs01.getString("A2845ORIGX").trim();
                objRtn.A2845MDAOR = rs01.getString("A2845MDAOR").trim();



                objRtn.A2845TCAMB = rs01.getString("A2845TCAMB").trim();
                objRtn.A2845MDARV = rs01.getString("A2845MDARV").trim();
                objRtn.A2845FARRV = rs01.getString("A2845FARRV").trim();
                objRtn.A2845ADCRV = rs01.getString("A2845ADCRV").trim();
                objRtn.A2845ORIRV = rs01.getString("A2845ORIRV").trim();
                objRtn.A2845RUTA0 = rs01.getString("A2845RUTA0").trim();
                objRtn.A2845CONEX = rs01.getString("A2845CONEX").trim();
                objRtn.A2845RUTA = rs01.getString("A2845RUTA").trim();
                objRtn.A2845VIA = rs01.getString("A2845VIA").trim();
                objRtn.A2845CARRN = rs01.getString("A2845CARRN").trim();
                objRtn.A2845CARRA = rs01.getString("A2845CARRA").trim();
                objRtn.A2845NVLO = rs01.getString("A2845NVLO").trim();
                objRtn.A2845FVLO = rs01.getString("A2845FVLO").trim();
                //objRtn.A2845HVLO = rs01.getString("A2845HVLO").trim();
                objRtn.A2845BOOKI = rs01.getString("A2845BOOKI").trim();
                objRtn.A2845CLASE = rs01.getString("A2845CLASE").trim();
                objRtn.A2845FBORI = rs01.getString("A2845FBORI").trim();

                objRtn.A2845FBUSO = rs01.getString("A2845FBUSO").trim();
                objRtn.A2845PORDS = rs01.getString("A2845PORDS").trim();
                objRtn.A2845TDESC = rs01.getString("A2845TDESC").trim();
                objRtn.A2845TYPCP = rs01.getString("A2845TYPCP").trim();
                objRtn.A2845TBASE = rs01.getString("A2845TBASE").trim();
                objRtn.A2845STBAS = rs01.getString("A2845STBAS").trim();
                objRtn.A2845FARES = rs01.getString("A2845FARES").trim();
                objRtn.A2845TFARE = rs01.getString("A2845TFARE").trim();
                objRtn.A2845DIFER = rs01.getString("A2845DIFER").trim();
                objRtn.A2845FDIFE = rs01.getString("A2845FDIFE").trim();
                objRtn.A2845TRFM = rs01.getString("A2845TRFM").trim();
                objRtn.A2845MNTFM = rs01.getString("A2845MNTFM").trim();
                objRtn.A2845SS = rs01.getString("A2845SS").trim();
                objRtn.A2845PLUS = rs01.getString("A2845PLUS").trim();
                objRtn.A2845STOP = rs01.getString("A2845STOP").trim();
                objRtn.A2845MNACU = rs01.getString("A2845MNACU").trim();
                objRtn.A2845ACUE = rs01.getString("A2845ACUE").trim();

                objRtn.A2845ACUBS = rs01.getString("A2845ACUBS").trim();
                objRtn.A2845ACUST = rs01.getString("A2845ACUST").trim();
                objRtn.A2845PVRST = rs01.getString("A2845PVRST").trim();
                objRtn.A2845FBCAR = rs01.getString("A2845FBCAR").trim();
                objRtn.A2845SCOMI = rs01.getString("A2845SCOMI").trim();
                objRtn.A2845PROPB = rs01.getString("A2845PROPB").trim();
                objRtn.A2845MONPB = rs01.getString("A2845MONPB").trim();
                objRtn.A2845TCPPB = rs01.getString("A2845TCPPB").trim();
                objRtn.A2845VALAC = rs01.getString("A2845VALAC").trim();
                objRtn.A2845MONAC = rs01.getString("A2845MONAC").trim();

                objRtn.A2845VLMPA = rs01.getString("A2845VLMPA").trim();
                objRtn.A2845VLSRP = rs01.getString("A2845VLSRP").trim();
                objRtn.A2845INDPR = rs01.getString("A2845INDPR").trim();
                objRtn.A2845INISC = rs01.getString("A2845INISC").trim();
                objRtn.A2845ISC = rs01.getString("A2845ISC").trim();
                objRtn.A2845COEFI = rs01.getString("A2845COEFI").trim();
                objRtn.A2845VLISC = rs01.getString("A2845VLISC").trim();
                objRtn.A2845SCM = rs01.getString("A2845SCM").trim();
                objRtn.A2845GSA = rs01.getString("A2845GSA").trim();
                objRtn.A2845VLGSA = rs01.getString("A2845VLGSA").trim();
                //objRtn.A2845CIP = rs01.getString("A2845CIP").trim();
                //objRtn.A2845MIA = rs01.getString("A2845MIA").trim();
                objRtn.A2845FUENT = rs01.getString("A2845FUENT").trim();
                
                //objRtn.A2845QIN = rs01.getString("A2845QIN").trim();
                //objRtn.A2845Q = rs01.getString("A2845Q").trim();
                //objRtn.A2845QMTH = rs01.getString("A2845QMTH").trim();
                //objRtn.A2845AJUSQ = rs01.getString("A2845AJUSQ").trim();

                //objRtn.A2845LOHO = rs01.getString("A2845LOHO").trim();
                objRtn.A2845PRRCM = rs01.getString("A2845PRRCM").trim();
                objRtn.A2845TAJUQ = rs01.getString("A2845TAJUQ").trim();
                objRtn.A2845COMMI = rs01.getString("A2845COMMI").trim();
                objRtn.A2845MDACO = rs01.getString("A2845MDACO").trim();
                //objRtn.A2845INITR = rs01.getString("A2845INITR").trim();
                objRtn.A2845PORCO = rs01.getString("A2845PORCO").trim();
                objRtn.A2845POUPF = rs01.getString("A2845POUPF").trim();
                objRtn.A2845APLUF = rs01.getString("A2845APLUF").trim();
                objRtn.A2845APLBE = rs01.getString("A2845APLBE").trim();

                objRtn.A2845TLBBE = rs01.getString("A2845TLBBE").trim();
                objRtn.A2845TAGRF = rs01.getString("A2845TAGRF").trim();
                objRtn.A2845PRODU = rs01.getString("A2845PRODU").trim();
                objRtn.A2845APPLY = rs01.getString("A2845APPLY").trim();
                objRtn.A2845FPROI = rs01.getString("A2845FPROI").trim();
                objRtn.A2845FPROF = rs01.getString("A2845FPROF").trim();

                objRtn.A2845FEJEC = rs01.getString("A2845FEJEC").trim();
                objRtn.A2845CDERR = rs01.getString("A2845CDERR").trim();
                objRtn.A2845REGIS = rs01.getString("A2845REGIS").trim();
                objRtn.A2845FREGI = rs01.getString("A2845FREGI").trim();
                objRtn.A2845HREGI = rs01.getString("A2845HREGI").trim();
                objRtn.A2845CRTRE = rs01.getString("A2845CRTRE").trim();
                
                objRtn.A2845VCARD = rs01.getString("A2845VCARD").trim();
                objRtn.A2845TTARJ = rs01.getString("A2845TTARJ").trim();
                objRtn.A2845CFOP = rs01.getString("A2845CFOP").trim();
                
                objRtn.A2845TTCOM = rs01.getString("A2845TTCOM").trim();
                objRtn.A2845VUPFR = rs01.getString("A2845VUPFR").trim();
                
                objRtn.A2845PRSCM = rs01.getString("A2845PRSCM").trim();
                
                objRtn.A2845SFUEN = rs01.getString("A2845SFUEN").trim();
                objRtn.A2845TFUEN = rs01.getString("A2845TFUEN").trim();
                objRtn.A2845FORMN = rs01.getString("A2845FORMN").trim();
                objRtn.A2845SERIN = rs01.getString("A2845SERIN").trim();
                objRtn.A2845VCARN = rs01.getString("A2845VCARN").trim();
                objRtn.A2845VALOR = rs01.getString("A2845VALOR").trim();
                objRtn.A2845LRRCM = rs01.getString("A2845LRRCM").trim();
                objRtn.A2845LRSCM = rs01.getString("A2845LRSCM").trim();
                objRtn.A2845TTAX = rs01.getString("A2845TTAX").trim();
                
                objRtn.DIFERENCIA = rs01.getString("DIFERENCIA").trim();
                objRtn.ROUND = rs01.getString("ROUND").trim();
                objRtn.DIFERENCIA_IVA_TOTAL = rs01.getString("DIFERENCIA_IVA_TOTAL").trim();
                objRtn.ROUND_IVA = rs01.getString("ROUND_IVA").trim();
                objRtn.DIFERENCIA_IVA_TOTAL = rs01.getString("DIFERENCIA_IVA_TOTAL").trim();
                objRtn.APPLY_ADM = rs01.getString("APPLY_ADM").trim();
                
                
                objRtn.A2845VALOL = rs01.getString("VALOR_TARIFA").trim(); 
                objRtn.A2845CIVAS = rs01.getString("A2845CIVAS").trim();
                objRtn.A2845PTOCO = rs01.getString("A2845PTOCO").trim();
                objRtn.A2845VTOCO = rs01.getString("A2845VTOCO").trim();
                /*
                objRtn.A1155UINGR = rs01.getString("A1155UINGR").trim();
                objRtn.A1155FINGR = Functions.getMonthConvertDate(rs01.getString("A1155FINGR").trim());
                objRtn.A1155HINGR = Functions.ConvertedTime(rs01.getString("A1155HINGR").trim());
                objRtn.A1155UMODI = rs01.getString("A1155UMODI").trim();
                objRtn.A1155FMODI = Functions.getMonthConvertDate(rs01.getString("A1155FMODI").trim());
                objRtn.A1155HMODI = Functions.ConvertedTime(rs01.getString("A1155HMODI").trim());*/
     
                objRtn.TOT_FARE_TAKEN = rs01.getString("TOT_FARE_TAKEN").trim();

                objRtn.TOT_VALUE_COMMISSION_TAKE = rs01.getString("TOT_VALUE_COMMISSION_TAKE").trim();
                objRtn.TOT_APPLY_COMMISSION_TAKE = rs01.getString("TOT_APPLY_COMMISSION_TAKE").trim();
                objRtn.TOT_APPLY_UP = rs01.getString("TOT_APPLY_UP").trim();
                objRtn.TOT_VALUE_UP = rs01.getString("TOT_VALUE_UP").trim();
                objRtn.TOT_DIFFERENCE_VALUE_TKT = rs01.getString("TOT_DIFFERENCE_VALUE_TKT").trim();
                objRtn.TOT_DIFFERENCE_ROUND_TKT = rs01.getString("TOT_DIFFERENCE_ROUND_TKT").trim();
                objRtn.TOT_DIFFERENCE_IVA_ROUND_TKT = rs01.getString("TOT_DIFFERENCE_IVA_ROUND_TKT").trim();
                objRtn.TOT_TOTAL_TKT = rs01.getString("TOT_TOTAL_TKT").trim();
                
                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;

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
    
    public List<SQP01362Filter> getListTicket(SQP01362Filter filter) throws SQLException, Exception, Exception {
        List<SQP01362Filter> lstRtn = new ArrayList<SQP01362Filter>(0);
        SQP01362Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PXCOMM.SQP01362(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";//" + session.getMainLibrary() + "
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            //cstmt01.registerOutParameter(5, Types.INTEGER);
            //cstmt01.setString(2, session.getUserView().getCustomerInfo().CCUST);
            
            cstmt01.registerOutParameter(12, Types.INTEGER);
            cstmt01.registerOutParameter(13, Types.INTEGER);
            cstmt01.registerOutParameter(14, Types.INTEGER);
            cstmt01.registerOutParameter(15, Types.INTEGER);
            
            cstmt01.setString(1, filter.VP_CIA);
            cstmt01.setString(2, filter.VP_FPROC_D);
            cstmt01.setString(3, filter.VP_FPROC_H);
            cstmt01.setString(4, filter.VP_FORMA);
            cstmt01.setString(5, filter.VP_SERIE);
            cstmt01.setString(6, filter.VP_A2959IATAH);
            cstmt01.setString(7, filter.VP_AGENTE);
            cstmt01.setString(8, filter.A2845INDAC);
            cstmt01.setString(9, filter.VP_SCHEMA);
            cstmt01.setString(10, filter.VP_FUENT);
            cstmt01.setString(11, filter.VP_PAIVTA);
            
            cstmt01.setInt(12, filter.page.PAGNUM);
            cstmt01.setInt(13, filter.page.PAGROW);
            cstmt01.setInt(14, filter.page.TOTPAG);
            cstmt01.setInt(15, filter.page.TOTROW);
            cstmt01.execute();
            
            filter.page.PAGNUM = cstmt01.getInt(12);
            filter.page.PAGROW = cstmt01.getInt(13);
            filter.page.TOTPAG = cstmt01.getInt(14);
            filter.page.TOTROW = cstmt01.getInt(15);

            rs01 = cstmt01.getResultSet();

            while (rs01.next()) {
                objRtn = new SQP01362Filter();
                objRtn.RN = rs01.getInt("RN");
                objRtn.A2845AIRLI = rs01.getString("A2845AIRLI");
                objRtn.A2845FPROC = Functions.getMonthConvertDate(rs01.getString("A2845FPROC"));//rs01.getString("A2650FPROC").trim();
                objRtn.A2845CIA = rs01.getString("A2845CIA").trim();
                objRtn.A2845FORMA = rs01.getString("A2845FORMA").trim();
                objRtn.A2845SERIE = rs01.getString("A2845SERIE").trim();
                objRtn.A2845CUPON = rs01.getString("A2845CUPON").trim();
                objRtn.A2845SEQ = rs01.getString("A2845SEQ").trim();
                //objRtn.A2845DCHEQ = rs01.getString("A2845DCHEQ").trim();
                objRtn.A2845CIAI = rs01.getString("A2845CIAI").trim();
                objRtn.A2845FORMI = rs01.getString("A2845FORMI").trim();
                objRtn.A2845SERII = rs01.getString("A2845SERII").trim();
                objRtn.A2845FLAG = rs01.getString("A2845FLAG").trim();
                objRtn.A2845NSEQ = rs01.getString("A2845NSEQ").trim();
                //objRtn.A2845CTKTC = rs01.getString("A2845CTKTC").trim();
                objRtn.A2845CODAC = rs01.getString("A2845CODAC").trim();
                objRtn.A2845INDAC = rs01.getString("A2845INDAC").trim();
                objRtn.A2845VRSAC = rs01.getString("A2845VRSAC").trim();
                objRtn.A2845IATAH = rs01.getString("A2845IATAH").trim();
                objRtn.A2845AGENT = rs01.getString("A2845AGENT").trim();
                objRtn.A2845TVENT = rs01.getString("A2845TVENT").trim();
                objRtn.A2845ORIG = rs01.getString("A2845ORIG").trim();
                objRtn.A2845CODIT = rs01.getString("A2845CODIT").trim();
                objRtn.A2845FECVT = Functions.getMonthConvertDate(rs01.getString("A2845FECVT"));
                objRtn.A2845PAIVT = rs01.getString("A2845PAIVT").trim();
                objRtn.A2845CIUVT = rs01.getString("A2845CIUVT").trim();
                objRtn.A2845PAIEM = rs01.getString("A2845PAIEM").trim();
                objRtn.A2845CIUEM = rs01.getString("A2845CIUEM").trim();
                //objRtn.A2845TRNCO = rs01.getString("A2845TRNCO").trim();
                objRtn.A2845TRNCU = rs01.getString("A2845TRNCU").trim();
                objRtn.A2845TDOC = rs01.getString("A2845TDOC").trim();
                //objRtn.A2845PAIS = rs01.getString("A2845PAIS").trim();
                objRtn.A2845RPDA = rs01.getString("A2845RPDA").trim();
                objRtn.A2845GRUPO = rs01.getString("A2845GRUPO").trim();


                objRtn.A2845STAT = rs01.getString("A2845STAT").trim();
                objRtn.A2845IDFIL = rs01.getString("A2845IDFIL").trim();
                //objRtn.A2845TCREG = rs01.getString("A2845TCREG").trim();
                //objRtn.A2845MNREG = rs01.getString("A2845MNREG").trim();
                //objRtn.A2845TCSYS = rs01.getString("A2845TCSYS").trim();
                //objRtn.A2845MNSYS = rs01.getString("A2845MNSYS").trim();
                objRtn.A2845PRO = rs01.getString("A2845PRO").trim();
                objRtn.A2845BASE = rs01.getString("A2845BASE").trim();
                objRtn.A2845MONET = rs01.getString("A2845MONET").trim();
                objRtn.A2845TARIF = rs01.getString("A2845TARIF").trim();
                objRtn.A2845MDAPG = rs01.getString("A2845MDAPG").trim();
                objRtn.A2845TRFPG = rs01.getString("A2845TRFPG").trim();
                objRtn.A2845TCAPG = rs01.getString("A2845TCAPG").trim();


                objRtn.A2845TRNUC = rs01.getString("A2845TRNUC").trim();
                objRtn.A2845ROE = rs01.getString("A2845ROE").trim();
                objRtn.A2845CPLUS = rs01.getString("A2845CPLUS").trim();
                objRtn.A2845CSOVR = rs01.getString("A2845CSOVR").trim();
                objRtn.A2845QSOVR = rs01.getString("A2845QSOVR").trim();
                objRtn.A2845TAJUS = rs01.getString("A2845TAJUS").trim();
                //objRtn.A2845RFIC = rs01.getString("A2845RFIC").trim();
                objRtn.A2845FARE = rs01.getString("A2845FARE").trim();
                objRtn.A2845MDAFA = rs01.getString("A2845MDAFA").trim();
                objRtn.A2845ADC = rs01.getString("A2845ADC").trim();
                objRtn.A2845MDAAD = rs01.getString("A2845MDAAD").trim();
                objRtn.A2845ORIGX = rs01.getString("A2845ORIGX").trim();
                objRtn.A2845MDAOR = rs01.getString("A2845MDAOR").trim();



                objRtn.A2845TCAMB = rs01.getString("A2845TCAMB").trim();
                objRtn.A2845MDARV = rs01.getString("A2845MDARV").trim();
                objRtn.A2845FARRV = rs01.getString("A2845FARRV").trim();
                objRtn.A2845ADCRV = rs01.getString("A2845ADCRV").trim();
                objRtn.A2845ORIRV = rs01.getString("A2845ORIRV").trim();
                objRtn.A2845RUTA0 = rs01.getString("A2845RUTA0").trim();
                objRtn.A2845CONEX = rs01.getString("A2845CONEX").trim();
                objRtn.A2845RUTA = rs01.getString("A2845RUTA").trim();
                objRtn.A2845VIA = rs01.getString("A2845VIA").trim();
                objRtn.A2845CARRN = rs01.getString("A2845CARRN").trim();
                objRtn.A2845CARRA = rs01.getString("A2845CARRA").trim();
                objRtn.A2845NVLO = rs01.getString("A2845NVLO").trim();
                objRtn.A2845FVLO = rs01.getString("A2845FVLO").trim();
                //objRtn.A2845HVLO = rs01.getString("A2845HVLO").trim();
                objRtn.A2845BOOKI = rs01.getString("A2845BOOKI").trim();
                objRtn.A2845CLASE = rs01.getString("A2845CLASE").trim();
                objRtn.A2845FBORI = rs01.getString("A2845FBORI").trim();

                objRtn.A2845FBUSO = rs01.getString("A2845FBUSO").trim();
                objRtn.A2845PORDS = rs01.getString("A2845PORDS").trim();
                objRtn.A2845TDESC = rs01.getString("A2845TDESC").trim();
                objRtn.A2845TYPCP = rs01.getString("A2845TYPCP").trim();
                objRtn.A2845TBASE = rs01.getString("A2845TBASE").trim();
                objRtn.A2845STBAS = rs01.getString("A2845STBAS").trim();
                objRtn.A2845FARES = rs01.getString("A2845FARES").trim();
                objRtn.A2845TFARE = rs01.getString("A2845TFARE").trim();
                objRtn.A2845DIFER = rs01.getString("A2845DIFER").trim();
                objRtn.A2845FDIFE = rs01.getString("A2845FDIFE").trim();
                objRtn.A2845TRFM = rs01.getString("A2845TRFM").trim();
                objRtn.A2845MNTFM = rs01.getString("A2845MNTFM").trim();
                objRtn.A2845SS = rs01.getString("A2845SS").trim();
                objRtn.A2845PLUS = rs01.getString("A2845PLUS").trim();
                objRtn.A2845STOP = rs01.getString("A2845STOP").trim();
                objRtn.A2845MNACU = rs01.getString("A2845MNACU").trim();
                objRtn.A2845ACUE = rs01.getString("A2845ACUE").trim();

                objRtn.A2845ACUBS = rs01.getString("A2845ACUBS").trim();
                objRtn.A2845ACUST = rs01.getString("A2845ACUST").trim();
                objRtn.A2845PVRST = rs01.getString("A2845PVRST").trim();
                objRtn.A2845FBCAR = rs01.getString("A2845FBCAR").trim();
                objRtn.A2845SCOMI = rs01.getString("A2845SCOMI").trim();
                objRtn.A2845PROPB = rs01.getString("A2845PROPB").trim();
                objRtn.A2845MONPB = rs01.getString("A2845MONPB").trim();
                objRtn.A2845TCPPB = rs01.getString("A2845TCPPB").trim();
                objRtn.A2845VALAC = rs01.getString("A2845VALAC").trim();
                objRtn.A2845MONAC = rs01.getString("A2845MONAC").trim();

                objRtn.A2845VLMPA = rs01.getString("A2845VLMPA").trim();
                objRtn.A2845VLSRP = rs01.getString("A2845VLSRP").trim();
                objRtn.A2845INDPR = rs01.getString("A2845INDPR").trim();
                objRtn.A2845INISC = rs01.getString("A2845INISC").trim();
                objRtn.A2845ISC = rs01.getString("A2845ISC").trim();
                objRtn.A2845COEFI = rs01.getString("A2845COEFI").trim();
                objRtn.A2845VLISC = rs01.getString("A2845VLISC").trim();
                objRtn.A2845SCM = rs01.getString("A2845SCM").trim();
                objRtn.A2845GSA = rs01.getString("A2845GSA").trim();
                objRtn.A2845VLGSA = rs01.getString("A2845VLGSA").trim();
                //objRtn.A2845CIP = rs01.getString("A2845CIP").trim();
                //objRtn.A2845MIA = rs01.getString("A2845MIA").trim();
                objRtn.A2845FUENT = rs01.getString("A2845FUENT").trim();
                
                //objRtn.A2845QIN = rs01.getString("A2845QIN").trim();
                //objRtn.A2845Q = rs01.getString("A2845Q").trim();
                //objRtn.A2845QMTH = rs01.getString("A2845QMTH").trim();
                //objRtn.A2845AJUSQ = rs01.getString("A2845AJUSQ").trim();

                //objRtn.A2845LOHO = rs01.getString("A2845LOHO").trim();
                objRtn.A2845PRRCM = rs01.getString("A2845PRRCM").trim();
                objRtn.A2845TAJUQ = rs01.getString("A2845TAJUQ").trim();
                objRtn.A2845COMMI = rs01.getString("A2845COMMI").trim();
                objRtn.A2845MDACO = rs01.getString("A2845MDACO").trim();
                //objRtn.A2845INITR = rs01.getString("A2845INITR").trim();
                objRtn.A2845PORCO = rs01.getString("A2845PORCO").trim();
                objRtn.A2845POUPF = rs01.getString("A2845POUPF").trim();
                objRtn.A2845APLUF = rs01.getString("A2845APLUF").trim();
                objRtn.A2845APLBE = rs01.getString("A2845APLBE").trim();

                objRtn.A2845TLBBE = rs01.getString("A2845TLBBE").trim();
                objRtn.A2845TAGRF = rs01.getString("A2845TAGRF").trim();
                objRtn.A2845PRODU = rs01.getString("A2845PRODU").trim();
                objRtn.A2845APPLY = rs01.getString("A2845APPLY").trim();
                objRtn.A2845FPROI = rs01.getString("A2845FPROI").trim();
                objRtn.A2845FPROF = rs01.getString("A2845FPROF").trim();

                objRtn.A2845FEJEC = rs01.getString("A2845FEJEC").trim();
                objRtn.A2845CDERR = rs01.getString("A2845CDERR").trim();
                objRtn.A2845REGIS = rs01.getString("A2845REGIS").trim();
                objRtn.A2845FREGI = rs01.getString("A2845FREGI").trim();
                objRtn.A2845HREGI = rs01.getString("A2845HREGI").trim();
                objRtn.A2845CRTRE = rs01.getString("A2845CRTRE").trim();
                
                objRtn.A2845VCARD = rs01.getString("A2845VCARD").trim();
                objRtn.A2845TTARJ = rs01.getString("A2845TTARJ").trim();
                objRtn.A2845CFOP = rs01.getString("A2845CFOP").trim();
                
                objRtn.A2845TTCOM = rs01.getString("A2845TTCOM").trim();
                objRtn.A2845VUPFR = rs01.getString("A2845VUPFR").trim();
                
                objRtn.A2845PRSCM = rs01.getString("A2845PRSCM").trim();
                
                objRtn.A2845SFUEN = rs01.getString("A2845SFUEN").trim();
                objRtn.A2845TFUEN = rs01.getString("A2845TFUEN").trim();
                objRtn.A2845FORMN = rs01.getString("A2845FORMN").trim();
                objRtn.A2845SERIN = rs01.getString("A2845SERIN").trim();
                objRtn.A2845VCARN = rs01.getString("A2845VCARN").trim();
                objRtn.A2845VALOR = rs01.getString("A2845VALOR").trim();
                objRtn.A2845LRRCM = rs01.getString("A2845LRRCM").trim();
                objRtn.A2845LRSCM = rs01.getString("A2845LRSCM").trim();
                objRtn.A2845TTAX = rs01.getString("A2845TTAX").trim();
                
                objRtn.DIFERENCIA = rs01.getString("DIFERENCIA").trim();
                objRtn.ROUND = rs01.getString("ROUND").trim();
                objRtn.DIFERENCIA_IVA_TOTAL = rs01.getString("DIFERENCIA_IVA_TOTAL").trim();
                objRtn.ROUND_IVA = rs01.getString("ROUND_IVA").trim();
                objRtn.DIFERENCIA_IVA_TOTAL = rs01.getString("DIFERENCIA_IVA_TOTAL").trim();
                objRtn.APPLY_ADM = rs01.getString("APPLY_ADM").trim();
                
                
                objRtn.A2845VALOL = rs01.getString("VALOR_TARIFA").trim(); 
                objRtn.A2845CIVAS = rs01.getString("A2845CIVAS").trim();
                objRtn.A2845PTOCO = rs01.getString("A2845PTOCO").trim();
                objRtn.A2845VTOCO = rs01.getString("A2845VTOCO").trim();
                /*
                objRtn.A1155UINGR = rs01.getString("A1155UINGR").trim();
                objRtn.A1155FINGR = Functions.getMonthConvertDate(rs01.getString("A1155FINGR").trim());
                objRtn.A1155HINGR = Functions.ConvertedTime(rs01.getString("A1155HINGR").trim());
                objRtn.A1155UMODI = rs01.getString("A1155UMODI").trim();
                objRtn.A1155FMODI = Functions.getMonthConvertDate(rs01.getString("A1155FMODI").trim());
                objRtn.A1155HMODI = Functions.ConvertedTime(rs01.getString("A1155HMODI").trim());*/
     
                objRtn.TOT_FARE_TAKEN = rs01.getString("TOT_FARE_TAKEN").trim();

                objRtn.TOT_VALUE_COMMISSION_TAKE = rs01.getString("TOT_VALUE_COMMISSION_TAKE").trim();
                objRtn.TOT_APPLY_COMMISSION_TAKE = rs01.getString("TOT_APPLY_COMMISSION_TAKE").trim();
                objRtn.TOT_APPLY_UP = rs01.getString("TOT_APPLY_UP").trim();
                objRtn.TOT_VALUE_UP = rs01.getString("TOT_VALUE_UP").trim();
                objRtn.TOT_DIFFERENCE_VALUE_TKT = rs01.getString("TOT_DIFFERENCE_VALUE_TKT").trim();
                objRtn.TOT_DIFFERENCE_ROUND_TKT = rs01.getString("TOT_DIFFERENCE_ROUND_TKT").trim();
                objRtn.TOT_DIFFERENCE_IVA_ROUND_TKT = rs01.getString("TOT_DIFFERENCE_IVA_ROUND_TKT").trim();
                objRtn.TOT_TOTAL_TKT = rs01.getString("TOT_TOTAL_TKT").trim();
                
                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;

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
    
    public List<A051> getListSchema(SQP01362Filter filter) throws SQLException, Exception {
        List<A051> lstRtn = new ArrayList<A051>(0);
        A051 objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PXCOMM.SQP01680(?,?)}";//" + session.getMainLibrary() + "
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.setString(1, filter.VP_CIA);
            cstmt01.setString(2, filter.A2845INDAC);
            cstmt01.execute();

            rs01 = cstmt01.getResultSet();

            while (rs01.next()) {
                objRtn = new A051();
                objRtn.A051KEY2 = rs01.getString("CODE").trim();
                objRtn.A051DESCR1 = rs01.getString("A3051TITLE").trim();

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
    
    public List<SQP01362Filter> getListFPROC(SQP01362Filter filter) throws SQLException, Exception {
        List<SQP01362Filter> lstRtn = new ArrayList<SQP01362Filter>(0);
        SQP01362Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PXCOMM.SQP01510(?,?,?,?,?,?,?,?,?,?,?,?)}";//SQP01363
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            
            cstmt01.registerOutParameter(9, Types.INTEGER);
            cstmt01.registerOutParameter(10, Types.INTEGER);
            cstmt01.registerOutParameter(11, Types.INTEGER);
            cstmt01.registerOutParameter(12, Types.INTEGER);
            
            cstmt01.setString(1, filter.VP_CIA);
            cstmt01.setString(2, filter.VP_FPROC_D);
            cstmt01.setString(3, filter.VP_FPROC_H);
            cstmt01.setString(4, filter.VP_FUENT);
            cstmt01.setString(5, filter.VP_PAIVTA);
            cstmt01.setString(6, filter.A2845INDAC);
            cstmt01.setString(7, filter.VP_SCHEMA);
            cstmt01.setString(8, filter.VP_STATUS);
            
            cstmt01.setInt(9, filter.page.PAGNUM);
            cstmt01.setInt(10, filter.page.PAGROW);
            cstmt01.setInt(11, filter.page.TOTPAG);
            cstmt01.setInt(12, filter.page.TOTROW);
            
            cstmt01.execute();
            
            filter.page.PAGNUM = cstmt01.getInt(9);
            filter.page.PAGROW = cstmt01.getInt(10);
            filter.page.TOTPAG = cstmt01.getInt(11);
            filter.page.TOTROW = cstmt01.getInt(12);

            rs01 = cstmt01.getResultSet();

            while (rs01.next()) {
                objRtn = new SQP01362Filter();
                objRtn.RN = rs01.getInt("RN");
                objRtn.A2845AIRLI = rs01.getString("A2959AIRLI").trim();
                objRtn.A2845AGENT = rs01.getString("A2845AGENT").trim();
                objRtn.A2845IATAH = rs01.getString("A2845IATAH").trim();
                objRtn.A003KEY3 = rs01.getString("A003KEY3").trim();
                objRtn.A2845FUENT = rs01.getString("A2845FUENT").trim();
                objRtn.A2845PAIVT = rs01.getString("A2845PAIVT").trim();
                objRtn.A2845MDAFA = rs01.getString("A2845MDAFA").trim();
                objRtn.A2845FARE = rs01.getString("A2845FARE").trim();
                //objRtn.A2845POUPF = rs01.getString("A2845POUPF").trim();
                /*objRtn.A2650VUPFR = rs01.getString("A2650VUPFR").trim();//Functions.getMonthConvertDate(rst.getString("A1736FREGI"));
                objRtn.A2650POVCO = rs01.getString("A2650POVCO").trim();//Functions.getMonthConvertDate(rs01.getString("A1155FRECE").trim());//Functions.ConvertedTime(rst.getString("A1736HREGI"));
                objRtn.A2650VOVCO = rs01.getString("A2650VOVCO").trim();//Functions.getMonthConvertDate(rst.getString("A1736FINI"));
                objRtn.A2650PTOCO = rs01.getString("A2650PTOCO").trim();//Functions.getMonthConvertDate(rst.getString("A1736FFIN"));
                objRtn.A2650VTOCO = rs01.getString("A2650VTOCO").trim();
                objRtn.DIFFA = rs01.getString("DIFFA").trim();
                objRtn.DIFFB = rs01.getString("DIFFB").trim();*/
     
                objRtn.A2845TTCOM = rs01.getString("A2845TTCOM").trim();
                objRtn.A2845VUPFR = rs01.getString("A2845VUPFR").trim();
                
                objRtn.DIFERENCIA = rs01.getString("DIFERENCIA").trim();
                objRtn.ROUND = rs01.getString("ROUND").trim();
                objRtn.DIFERENCIA_IVA_TOTAL = rs01.getString("DIFERENCIA_IVA_TOTAL").trim();
                objRtn.ROUND_IVA = rs01.getString("ROUND_IVA").trim();
                objRtn.DIFERENCIA_IVA_TOTAL = rs01.getString("DIFERENCIA_IVA_TOTAL").trim();
                objRtn.APPLY_ADM = rs01.getString("APPLY_ADM").trim();
                objRtn.STATUS = rs01.getString("STATUS").trim();
                objRtn.LOTE = rs01.getString("LOTE").trim();
                objRtn.A2959FPERI = rs01.getString("A2959FPERI").trim();
                
                objRtn.A2959CODAC = rs01.getString("A2959CODAC").trim();
                objRtn.A2959INDAC = rs01.getString("A2959INDAC").trim();
                objRtn.A2959VRSAC = rs01.getString("A2959VRSAC").trim();
                objRtn.A2959BASE = rs01.getString("A2959BASE").trim();
                objRtn.A2959TRNCO = rs01.getString("A2959TRNCO").trim();
                objRtn.A2959PREME = rs01.getString("A2959PREME").trim();
                
                objRtn.A2959REPRO = rs01.getString("A2959REPRO").trim();
                
                objRtn.TOT_LOCAL_FARE = rs01.getString("TOT_LOCAL_FARE").trim();
                objRtn.TOT_VALE_COMMISSION = rs01.getString("TOT_VALE_COMMISSION").trim();
                objRtn.TOT_GIVEN_COMMISSION_VALUE = rs01.getString("TOT_GIVEN_COMMISSION_VALUE").trim();
                objRtn.TOT_DIFFERENCE_VALUE = rs01.getString("TOT_DIFFERENCE_VALUE").trim();
                objRtn.TOT_DIFFERENCE_ROUND = rs01.getString("TOT_DIFFERENCE_ROUND").trim();
                objRtn.TOT_DIFFERENCE_IVA_ROUND = rs01.getString("TOT_DIFFERENCE_IVA_ROUND").trim();
                objRtn.TOT_TOTAL = rs01.getString("TOT_TOTAL").trim();
    
                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;

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
    
    public List<SQP01362Filter> getListFPROCTesting(SQP01362Filter filter) throws SQLException, Exception {
        List<SQP01362Filter> lstRtn = new ArrayList<SQP01362Filter>(0);
        SQP01362Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PXCOMM.SQP01802(?,?,?,?,?,?,?,?,?,?,?,?)}";//SQP01363
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            
            cstmt01.registerOutParameter(9, Types.INTEGER);
            cstmt01.registerOutParameter(10, Types.INTEGER);
            cstmt01.registerOutParameter(11, Types.INTEGER);
            cstmt01.registerOutParameter(12, Types.INTEGER);
            
            cstmt01.setString(1, filter.VP_CIA);
            cstmt01.setString(2, filter.VP_FPROC_D);
            cstmt01.setString(3, filter.VP_FPROC_H);
            cstmt01.setString(4, filter.VP_FUENT);
            cstmt01.setString(5, filter.VP_PAIVTA);
            cstmt01.setString(6, filter.A2845INDAC);
            cstmt01.setString(7, filter.VP_SCHEMA);
            cstmt01.setString(8, filter.VP_STATUS);
            
            cstmt01.setInt(9, filter.page.PAGNUM);
            cstmt01.setInt(10, filter.page.PAGROW);
            cstmt01.setInt(11, filter.page.TOTPAG);
            cstmt01.setInt(12, filter.page.TOTROW);
            
            cstmt01.execute();
            
            filter.page.PAGNUM = cstmt01.getInt(9);
            filter.page.PAGROW = cstmt01.getInt(10);
            filter.page.TOTPAG = cstmt01.getInt(11);
            filter.page.TOTROW = cstmt01.getInt(12);

            rs01 = cstmt01.getResultSet();

            while (rs01.next()) {
                objRtn = new SQP01362Filter();
                objRtn.RN = rs01.getInt("RN");
                objRtn.A2845AIRLI = rs01.getString("A2959AIRLI").trim();
                objRtn.A2845AGENT = rs01.getString("A2845AGENT").trim();
                objRtn.A2845IATAH = rs01.getString("A2845IATAH").trim();
                objRtn.A003KEY3 = rs01.getString("A003KEY3").trim();
                objRtn.A2845FUENT = rs01.getString("A2845FUENT").trim();
                objRtn.A2845PAIVT = rs01.getString("A2845PAIVT").trim();
                objRtn.A2845MDAFA = rs01.getString("A2845MDAFA").trim();
                objRtn.A2845FARE = rs01.getString("A2845FARE").trim();
                //objRtn.A2845POUPF = rs01.getString("A2845POUPF").trim();
                /*objRtn.A2650VUPFR = rs01.getString("A2650VUPFR").trim();//Functions.getMonthConvertDate(rst.getString("A1736FREGI"));
                objRtn.A2650POVCO = rs01.getString("A2650POVCO").trim();//Functions.getMonthConvertDate(rs01.getString("A1155FRECE").trim());//Functions.ConvertedTime(rst.getString("A1736HREGI"));
                objRtn.A2650VOVCO = rs01.getString("A2650VOVCO").trim();//Functions.getMonthConvertDate(rst.getString("A1736FINI"));
                objRtn.A2650PTOCO = rs01.getString("A2650PTOCO").trim();//Functions.getMonthConvertDate(rst.getString("A1736FFIN"));
                objRtn.A2650VTOCO = rs01.getString("A2650VTOCO").trim();
                objRtn.DIFFA = rs01.getString("DIFFA").trim();
                objRtn.DIFFB = rs01.getString("DIFFB").trim();*/
     
                objRtn.A2845TTCOM = rs01.getString("A2845TTCOM").trim();
                objRtn.A2845VUPFR = rs01.getString("A2845VUPFR").trim();
                
                objRtn.DIFERENCIA = rs01.getString("DIFERENCIA").trim();
                objRtn.ROUND = rs01.getString("ROUND").trim();
                objRtn.DIFERENCIA_IVA_TOTAL = rs01.getString("DIFERENCIA_IVA_TOTAL").trim();
                objRtn.ROUND_IVA = rs01.getString("ROUND_IVA").trim();
                objRtn.DIFERENCIA_IVA_TOTAL = rs01.getString("DIFERENCIA_IVA_TOTAL").trim();
                objRtn.APPLY_ADM = rs01.getString("APPLY_ADM").trim();
                objRtn.STATUS = rs01.getString("STATUS").trim();
                objRtn.LOTE = rs01.getString("LOTE").trim();
                objRtn.A2959FPERI = rs01.getString("A2959FPERI").trim();
                
                objRtn.A2959CODAC = rs01.getString("A2959CODAC").trim();
                objRtn.A2959INDAC = rs01.getString("A2959INDAC").trim();
                objRtn.A2959VRSAC = rs01.getString("A2959VRSAC").trim();
                objRtn.A2959BASE = rs01.getString("A2959BASE").trim();
                objRtn.A2959TRNCO = rs01.getString("A2959TRNCO").trim();
                objRtn.A2959PREME = rs01.getString("A2959PREME").trim();
                
                objRtn.A2959REPRO = rs01.getString("A2959REPRO").trim();
                
                objRtn.TOT_LOCAL_FARE = rs01.getString("TOT_LOCAL_FARE").trim();
                objRtn.TOT_VALE_COMMISSION = rs01.getString("TOT_VALE_COMMISSION").trim();
                objRtn.TOT_GIVEN_COMMISSION_VALUE = rs01.getString("TOT_GIVEN_COMMISSION_VALUE").trim();
                objRtn.TOT_DIFFERENCE_VALUE = rs01.getString("TOT_DIFFERENCE_VALUE").trim();
                objRtn.TOT_DIFFERENCE_ROUND = rs01.getString("TOT_DIFFERENCE_ROUND").trim();
                objRtn.TOT_DIFFERENCE_IVA_ROUND = rs01.getString("TOT_DIFFERENCE_IVA_ROUND").trim();
                objRtn.TOT_TOTAL = rs01.getString("TOT_TOTAL").trim();
    
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
    
    public String getLoadCommiADMACM(A2960Filter filter) throws SQLException, Exception {

        CallableStatement cstmt = null;
        ResultSet rst = null;
        String STR_RESULT = "";
        String strSQL;

        String SQLCLL01 = "{CALL PXCOMM.SQP01508(?,?,?,?,?,?,?,?,?,?,?)}";
        //String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00807(?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.setString("IN_CCUST", session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString("VP_FROM_FILTER", filter.IN_DATEFROM);
            cstmt.setString("VP_TO_FILTER", filter.IN_DATETO);
            cstmt.setString("VP_TO_PERIODO", filter.IN_DATEPER1);
            cstmt.setString("VP_LOTE", filter.IN_LOTE);
            cstmt.setString("VP_IATA", filter.IN_IATA);
            cstmt.setString("VP_TYPE", filter.IN_SELET_TYPE);
            cstmt.setString("IN_BASE", filter.IN_SELET_BASE);

            cstmt.setString("IN_USER", session.getUserView().getUserInfo().USR);
            cstmt.setString("IN_FREGI", Functions.getFechaActual());
            cstmt.setString("IN_HREGI", Functions.getHoraActual());

            cstmt.execute();
            rst = cstmt.getResultSet();
            while (rst.next()) {
                STR_RESULT = rst.getString("VMESSAGE");
            }
            cstmt.close();
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
    
    public List<SQP00911Filter> SearchReportADM(SQP00911Filter filter) throws SQLException, Exception {
        List<SQP00911Filter> lstRtn = new ArrayList<SQP00911Filter>(0);
        SQP00911Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

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
    
    public List<SQP01362Filter> getListFPROCHISTORY(SQP01362Filter filter) throws SQLException, Exception {
        List<SQP01362Filter> lstRtn = new ArrayList<SQP01362Filter>(0);
        SQP01362Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PXCOMM.SQP01554(?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";//SQP01363
        Connection cnx = null;
        
        /*
            public String VP_A2959IATAH = "";
            public String VP_A2959AGENT = "";
         */
        
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            
            cstmt01.registerOutParameter(11, Types.INTEGER);
            cstmt01.registerOutParameter(12, Types.INTEGER);
            cstmt01.registerOutParameter(13, Types.INTEGER);
            cstmt01.registerOutParameter(14, Types.INTEGER);
            
            cstmt01.setString(1, filter.VP_CIA);
            cstmt01.setString(2, filter.VP_FPROC_D);
            cstmt01.setString(3, filter.VP_FPROC_H);
            cstmt01.setString(4, filter.VP_FUENT);
            cstmt01.setString(5, filter.VP_PAIVTA);
            cstmt01.setString(6, filter.A2845INDAC);
            cstmt01.setString(7, filter.VP_SCHEMA);
            cstmt01.setString(8, filter.VP_STATUS);
            
            cstmt01.setString(9, filter.VP_A2959IATAH);
            cstmt01.setString(10, filter.VP_A2959AGENT);
            
            
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
                objRtn = new SQP01362Filter();
                objRtn.RN = rs01.getInt("RN");
                objRtn.A2845AIRLI = rs01.getString("A2959AIRLI").trim();
                objRtn.A2845AGENT = rs01.getString("A2845AGENT").trim();
                objRtn.A2845IATAH = rs01.getString("A2845IATAH").trim();
                objRtn.A003KEY3 = rs01.getString("A003KEY3").trim();
                objRtn.A2845FUENT = rs01.getString("A2845FUENT").trim();
                objRtn.A2845PAIVT = rs01.getString("A2845PAIVT").trim();
                objRtn.A2845MDAFA = rs01.getString("A2845MDAFA").trim();
                objRtn.A2845FARE = rs01.getString("A2845FARE").trim();
                //objRtn.A2845POUPF = rs01.getString("A2845POUPF").trim();
                /*objRtn.A2650VUPFR = rs01.getString("A2650VUPFR").trim();//Functions.getMonthConvertDate(rst.getString("A1736FREGI"));
                objRtn.A2650POVCO = rs01.getString("A2650POVCO").trim();//Functions.getMonthConvertDate(rs01.getString("A1155FRECE").trim());//Functions.ConvertedTime(rst.getString("A1736HREGI"));
                objRtn.A2650VOVCO = rs01.getString("A2650VOVCO").trim();//Functions.getMonthConvertDate(rst.getString("A1736FINI"));
                objRtn.A2650PTOCO = rs01.getString("A2650PTOCO").trim();//Functions.getMonthConvertDate(rst.getString("A1736FFIN"));
                objRtn.A2650VTOCO = rs01.getString("A2650VTOCO").trim();
                objRtn.DIFFA = rs01.getString("DIFFA").trim();
                objRtn.DIFFB = rs01.getString("DIFFB").trim();*/
     
                objRtn.A2845TTCOM = rs01.getString("A2845TTCOM").trim();
                objRtn.A2845VUPFR = rs01.getString("A2845VUPFR").trim();
                
                objRtn.DIFERENCIA = rs01.getString("DIFERENCIA").trim();
                objRtn.ROUND = rs01.getString("ROUND").trim();
                objRtn.DIFERENCIA_IVA_TOTAL = rs01.getString("DIFERENCIA_IVA_TOTAL").trim();
                objRtn.ROUND_IVA = rs01.getString("ROUND_IVA").trim();
                objRtn.DIFERENCIA_IVA_TOTAL = rs01.getString("DIFERENCIA_IVA_TOTAL").trim();
                objRtn.APPLY_ADM = rs01.getString("APPLY_ADM").trim();
                objRtn.STATUS = rs01.getString("STATUS").trim();
                objRtn.LOTE = rs01.getString("LOTE").trim();
                objRtn.A2959FPERI = rs01.getString("A2959FPERI").trim();
                
                objRtn.A2959CODAC = rs01.getString("A2959CODAC").trim();
                objRtn.A2959INDAC = rs01.getString("A2959INDAC").trim();
                objRtn.A2959VRSAC = rs01.getString("A2959VRSAC").trim();
                objRtn.A2959BASE = rs01.getString("A2959BASE").trim();
                objRtn.A2959TRNCO = rs01.getString("A2959TRNCO").trim();
                objRtn.A2959PREME = rs01.getString("A2959PREME").trim();
                
                objRtn.A2959RMODI = rs01.getString("A2959RMODI").trim();
                objRtn.A2959FMODI = rs01.getString("A2959FMODI").trim();
                objRtn.A2959HMODI = rs01.getString("A2959HMODI").trim();
                objRtn.A2959FLAG = rs01.getString("A2959FLAG").trim();
                
                objRtn.TOT_LOCAL_FARE = rs01.getString("TOT_LOCAL_FARE").trim();
                objRtn.TOT_VALE_COMMISSION = rs01.getString("TOT_VALE_COMMISSION").trim();
                objRtn.TOT_GIVEN_COMMISSION_VALUE = rs01.getString("TOT_GIVEN_COMMISSION_VALUE").trim();
                objRtn.TOT_DIFFERENCE_VALUE = rs01.getString("TOT_DIFFERENCE_VALUE").trim();
                objRtn.TOT_DIFFERENCE_ROUND = rs01.getString("TOT_DIFFERENCE_ROUND").trim();
                objRtn.TOT_DIFFERENCE_IVA_ROUND = rs01.getString("TOT_DIFFERENCE_IVA_ROUND").trim();
                objRtn.TOT_TOTAL = rs01.getString("TOT_TOTAL").trim();
    
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

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }
}
