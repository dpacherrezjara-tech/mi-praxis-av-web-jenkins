/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.dao.widgets;

import com.ibm.as400.access.AS400DataType;
import com.ibm.as400.access.AS400Message;
import com.ibm.as400.access.AS400Structure;
import com.ibm.as400.access.ProgramCall;
import com.ibm.as400.access.ProgramParameter;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.A1526Filter;
import net.miatech.beans.FACSIMILFilter;
import net.miatech.beans.PRORATEFilter;
import net.miatech.beans.S0001A713Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.A720;
import net.miatech.praxis.classes.App;
import net.miatech.utils.AS400Map;
import net.miatech.utils.Util;
import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;

/**
 *
 * @author jjulca
 */
public class ProrateDAO {
    private IServerSession session;
    private static final Logger logError = Logger.getLogger("errorLog");
    
    public ProrateDAO() {
    }
    
    public ProrateDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }
    
    public S0001A713Filter searchA720Data(S0001A713Filter filter) throws SQLException, Exception {

        S0001A713Filter beanA720 = new S0001A713Filter();

        CallableStatement cstmt01 = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04169(?,?,?,?,?,?)}";

        Connection cnx = null;
        try {

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.VP_GRUPO);
            cstmt01.setString(3, filter.VP_CIA.trim());
            cstmt01.setString(4, filter.VP_FORMA);
            cstmt01.setString(5, filter.VP_SERIE);
            cstmt01.setString(6, filter.VP_SEQ);

            cstmt01.execute();

            rst = cstmt01.getResultSet();
            while (rst.next()) {
                beanA720 = new S0001A713Filter();
                beanA720.A713CIA = rst.getString("A720CIA").trim();
                beanA720.A713FORMA = rst.getString("A720FORMA").trim();
                beanA720.A713SERIE = rst.getString("A720SERIE").trim();
                beanA720.A713GRUPO = rst.getString("A720GRUPO").trim();
                beanA720.A713ORIG = rst.getString("A720ORIG").trim();
                beanA720.A713FLAG = rst.getString("A720FLAG").trim();
                beanA720.A713NSTOCK = rst.getString("A720NSTOCK").trim();
                beanA720.A713RPDA = rst.getString("A720RPDA").trim();
                beanA720.A713CTKTC = rst.getInt("A720CTKTC");
                beanA720.A713PRO = rst.getString("A720PRO").trim();
                beanA720.A713BASE = rst.getString("A720BASE").trim();
                beanA720.A713MONREG = rst.getString("A720MONREG").trim();
                beanA720.A713MONSYS = rst.getString("A720MONSYS").trim();
                beanA720.A713FECVTA = rst.getString("A720FECVTA").trim();
                beanA720.A713CODIT = rst.getString("A720CODIT").trim();
                beanA720.A713CIUVTA = rst.getString("A720CIUVTA").trim();
                beanA720.A713PAIVTA = rst.getString("A720PAIVTA").trim();
                beanA720.A713CIUEMI = rst.getString("A720CIUEMI").trim();
                beanA720.A713PAIEMI = rst.getString("A720PAIEMI").trim();
                beanA720.A713TARIFA = rst.getDouble("A720TARIFA");
                beanA720.A713MONEDA = rst.getString("A720MONEDA").trim();
                beanA720.A713TRFPAG = rst.getDouble("A720TRFPAG");
                beanA720.A713MDAPAG = rst.getString("A720MDAPAG").trim();
                beanA720.A713TAJUST = rst.getDouble("A720TAJUST");
                beanA720.A713TRFNUC = rst.getDouble("A720TRFNUC");
                beanA720.A713ROE = rst.getDouble("A720ROE");
                beanA720.A713CSOVER = rst.getDouble("A720CSOVER");
                beanA720.A713QSOVER = rst.getInt("A720QSOVER");
                beanA720.A713CPLUSS = rst.getDouble("A720CPLUSS");
                beanA720.A713TAJUSQ = rst.getDouble("A720TAJUSQ");
                beanA720.A713COMMIS = rst.getDouble("A720COMMIS");
                beanA720.A713MDACOM = rst.getString("A720MDACOM").trim();
                beanA720.A713PORCOM = rst.getDouble("A720PORCOM");
                beanA720.A713FARE = rst.getDouble("A720FARE");
                beanA720.A713MDAFA = rst.getString("A720MDAFA").trim();
                beanA720.A713MDARV = rst.getString("A720MDARV").trim();
                beanA720.A713FARERV = rst.getDouble("A720FARERV");
                beanA720.A713SUBPA1 = rst.getString("A720SUBPA1").trim();
                beanA720.A713CIAS = rst.getString("A720CIAS").trim();
                beanA720.A713FORMAS = rst.getString("A720FORMAS").trim();
                beanA720.A713SERIES = rst.getString("A720SERIES").trim();
                beanA720.A713TVENTA = rst.getString("A720TVENTA").trim();
                beanA720.A713AGENTE = rst.getString("A720AGENTE").trim();
                beanA720.A713INITRA = rst.getString("A720INITRA").trim();
                beanA720.A713TCAPAG = rst.getDouble("A720TCAPAG");
                beanA720.A713REGIST = rst.getString("A720REGIST").trim();
                beanA720.A713FREGIS = rst.getString("A720FREGIS").trim();
                beanA720.A713REVISA = rst.getString("A720REVISA").trim();
                beanA720.A713FREVIS = rst.getString("A720FREVIS").trim();
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
        return beanA720;
    }
    
    public List<S0001A713Filter> searchA720ListaCupon(S0001A713Filter filter) throws SQLException, Exception {

        S0001A713Filter beanA720 = new S0001A713Filter();
        List<S0001A713Filter> lstA720 = new ArrayList<>();
        
        CallableStatement cstmt01 = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04170(?,?,?,?,?)}";

        Connection cnx = null;
        try {

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            
            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.VP_CIA.trim());
            cstmt01.setString(3, filter.VP_FORMA);
            cstmt01.setString(4, filter.VP_SERIE);
            cstmt01.setString(5, filter.VP_SEQ);

            cstmt01.execute();

            rst = cstmt01.getResultSet();
            while (rst.next()) {

                beanA720 = new S0001A713Filter();
                beanA720.A713CIA = rst.getString("A720CIA").trim();
                beanA720.A713FORMA = rst.getString("A720FORMA").trim();
                beanA720.A713SERIE = rst.getString("A720SERIE").trim();
                beanA720.A713CUPON = rst.getString("A720CUPON").trim();
                beanA720.TICKET = rst.getString("A720CIA").trim() + rst.getString("A720FORMA").trim() + rst.getString("A720SERIE").trim();
                beanA720.A713CONEX1 = rst.getString("A720CONEX1").trim();
                beanA720.A713RUTA0 = rst.getString("A720RUTA0").trim();
                beanA720.A713RUTA1 = rst.getString("A720RUTA1").trim();
                beanA720.A713CARRA1 = rst.getString("A720CARRA1").trim();
                beanA720.A713NVLO1 = rst.getString("A720NVLO1").trim();
                beanA720.A713FVLO1 = rst.getString("A720FVLO1").trim();
                beanA720.A713HVLO1 = rst.getString("A720HVLO1").trim();
                beanA720.A713BOOKI1 = rst.getString("A720BOOKI1").trim();
                beanA720.A713CLASE1 = rst.getString("A720CLASE1").trim();
                beanA720.A713FBUSO1 = rst.getString("A720FBUSO1").trim();
                beanA720.A713FBORI1 = rst.getString("A720FBORI1").trim();
                beanA720.A713LOHO1 = rst.getString("A720LOHO1").trim();
                beanA720.A713TBASE1 = rst.getString("A720TBASE1").trim();
                beanA720.A713STBAS1 = rst.getString("A720STBAS1").trim();
                beanA720.A713TDESC1 = rst.getString("A720TDESC1").trim();
                beanA720.A713PORDS1 = rst.getDouble("A720PORDS1");
                beanA720.A713VIA1 = rst.getString("A720VIA1").trim();
                beanA720.A713FARE1 = rst.getDouble("A720FARE1");
                beanA720.A713TFARE1 = rst.getString("A720TFARE1").trim();
                beanA720.A713SS1 = rst.getDouble("A720SS1");
                beanA720.A713DIFER1 = rst.getDouble("A720DIFER1");
                beanA720.A713FDIFE1 = rst.getString("A720FDIFE1").trim();
                beanA720.A713CFARE1 = rst.getString("A720CFARE1").trim();
                beanA720.A713TRFM1 = rst.getDouble("A720TRFM1");
                beanA720.A713MNTFM1 = rst.getString("A720MNTFM1").trim();
                beanA720.A713VLSRP1 = rst.getDouble("A720VLSRP1");
                beanA720.A713VLMPA1 = rst.getDouble("A720VLMPA1");
                beanA720.A713ACUE1 = rst.getDouble("A720ACUE1");
                beanA720.A713ACUEO1 = rst.getDouble("A720ACUEO1");
                beanA720.A713ISC1 = rst.getDouble("A720ISC1");
                beanA720.A713AJUST1 = rst.getDouble("A720AJUST1");
                beanA720.A713VALOR1 = rst.getDouble("A720VALOR1");
                beanA720.A713QIN1 = rst.getDouble("A720QIN1");
                beanA720.A713Q1 = rst.getDouble("A720Q1");
                beanA720.A713FACT1 = rst.getDouble("A720FACT1");
                beanA720.A713PPRO1 = rst.getDouble("A720PPRO1");
                beanA720.A713PROV1 = rst.getDouble("A720PROV1");
                beanA720.A713YQ1 = rst.getDouble("A720YQ1");
                beanA720.A713IV1 = rst.getDouble("A720IV1");
                beanA720.A713PRRCM1 = rst.getDouble("A720PRRCM1");
                beanA720.A713PRSCM1 = rst.getDouble("A720PRSCM1");
                beanA720.A713INDPR1 = rst.getString("A720INDPR1").trim();
                beanA720.A713CIAI = rst.getString("A720CIAI").trim();
                beanA720.A713FORMAI = rst.getString("A720FORMAI").trim();
                beanA720.A713SERIEI = rst.getString("A720SERIEI").trim();
                beanA720.A713VALOL1 = rst.getDouble("A720VALOL1");
                beanA720.A713LRRCM1 = rst.getDouble("A720LRRCM1");
                beanA720.A713LRSCM1 = rst.getDouble("A720LRSCM1");
                beanA720.A713LYQ1 = rst.getDouble("A720LYQ1");
                beanA720.A713LIV1 = rst.getDouble("A720LIV1");
                lstA720.add(beanA720);
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
        return lstA720;
    }
    
    public S0001A713Filter searchA713Data(S0001A713Filter filter) throws SQLException, Exception {

        S0001A713Filter beanA713 = new S0001A713Filter();

        CallableStatement cstmt01 = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP03436(?,?,?,?,?,?)}";

        Connection cnx = null;
        try {

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.VP_GRUPO);
            cstmt01.setString(3, filter.VP_CIA.trim());
            cstmt01.setString(4, filter.VP_FORMA);
            cstmt01.setString(5, filter.VP_SERIE);
            cstmt01.setString(6, filter.VP_SEQ);

            cstmt01.execute();

            rst = cstmt01.getResultSet();
            while (rst.next()) {

                beanA713 = new S0001A713Filter();
                beanA713.A713CIA = rst.getString("A713CIA").trim();
                beanA713.A713FORMA = rst.getString("A713FORMA").trim();
                beanA713.A713SERIE = rst.getString("A713SERIE").trim();
                beanA713.A713GRUPO = rst.getString("A713GRUPO").trim();
                beanA713.A713ORIG = rst.getString("A713ORIG").trim();
                beanA713.A713FLAG = rst.getString("A713FLAG").trim();
                beanA713.A713NSTOCK = rst.getString("A713NSTOCK").trim();
                beanA713.A713RPDA = rst.getString("A713RPDA").trim();
                beanA713.A713CTKTC = rst.getInt("A713CTKTC");
                beanA713.A713PRO = rst.getString("A713PRO").trim();
                beanA713.A713BASE = rst.getString("A713BASE").trim();
                beanA713.A713MONREG = rst.getString("A713MONREG").trim();
                beanA713.A713MONSYS = rst.getString("A713MONSYS").trim();
                beanA713.A713FECVTA = rst.getString("A713FECVTA").trim();
                beanA713.A713CODIT = rst.getString("A713CODIT").trim();
                beanA713.A713CIUVTA = rst.getString("A713CIUVTA").trim();
                beanA713.A713PAIVTA = rst.getString("A713PAIVTA").trim();
                beanA713.A713CIUEMI = rst.getString("A713CIUEMI").trim();
                beanA713.A713PAIEMI = rst.getString("A713PAIEMI").trim();
                beanA713.A713TARIFA = rst.getDouble("A713TARIFA");
                beanA713.A713MONEDA = rst.getString("A713MONEDA").trim();
                beanA713.A713TRFPAG = rst.getDouble("A713TRFPAG");
                beanA713.A713MDAPAG = rst.getString("A713MDAPAG").trim();
                beanA713.A713TAJUST = rst.getDouble("A713TAJUST");
                beanA713.A713TRFNUC = rst.getDouble("A713TRFNUC");
                beanA713.A713ROE = rst.getDouble("A713ROE");
                beanA713.A713CSOVER = rst.getDouble("A713CSOVER");
                beanA713.A713QSOVER = rst.getInt("A713QSOVER");
                beanA713.A713CPLUSS = rst.getDouble("A713CPLUSS");
                beanA713.A713TAJUSQ = rst.getDouble("A713TAJUSQ");
                beanA713.A713COMMIS = rst.getDouble("A713COMMIS");
                beanA713.A713MDACOM = rst.getString("A713MDACOM").trim();
                beanA713.A713PORCOM = rst.getDouble("A713PORCOM");
                beanA713.A713FARE = rst.getDouble("A713FARE");
                beanA713.A713MDAFA = rst.getString("A713MDAFA").trim();
                beanA713.A713MDARV = rst.getString("A713MDARV").trim();
                beanA713.A713FARERV = rst.getDouble("A713FARERV");
                beanA713.A713SUBPA1 = rst.getString("A713SUBPA1").trim();
                beanA713.A713CIAS = rst.getString("A713CIAS").trim();
                beanA713.A713FORMAS = rst.getString("A713FORMAS").trim();
                beanA713.A713SERIES = rst.getString("A713SERIES").trim();
                beanA713.A713TVENTA = rst.getString("A713TVENTA").trim();
                beanA713.A713AGENTE = rst.getString("A713AGENTE").trim();
                beanA713.A713INITRA = rst.getString("A713INITRA").trim();
                beanA713.A713TCAPAG = rst.getDouble("A713TCAPAG");
                beanA713.A713REGIST = rst.getString("A713REGIST").trim();
                beanA713.A713FREGIS = rst.getString("A713FREGIS").trim();
                beanA713.A713REVISA = rst.getString("A713REVISA").trim();
                beanA713.A713FREVIS = rst.getString("A713FREVIS").trim();
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
        return beanA713;
    }
    
    public List<S0001A713Filter> searchA713ListaCupon(S0001A713Filter filter) throws SQLException, Exception {

        S0001A713Filter beanA713 = new S0001A713Filter();
        List<S0001A713Filter> lstA713 = new ArrayList<>();
        
        CallableStatement cstmt01 = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP03445(?,?,?,?,?)}";

        Connection cnx = null;
        try {

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.VP_CIA.trim());
            cstmt01.setString(3, filter.VP_FORMA);
            cstmt01.setString(4, filter.VP_SERIE);
            cstmt01.setString(5, filter.VP_SEQ);

            cstmt01.execute();

            rst = cstmt01.getResultSet();
            while (rst.next()) {

                beanA713 = new S0001A713Filter();
                beanA713.A713CIA = rst.getString("A713CIA").trim();
                beanA713.A713FORMA = rst.getString("A713FORMA").trim();
                beanA713.A713SERIE = rst.getString("A713SERIE").trim();
                beanA713.A713CUPON = rst.getString("A713CUPON").trim();
                beanA713.TICKET = rst.getString("A713CIA").trim() + rst.getString("A713FORMA").trim() + rst.getString("A713SERIE").trim();
                beanA713.A713CONEX1 = rst.getString("A713CONEX1").trim();
                beanA713.A713RUTA0 = rst.getString("A713RUTA0").trim();
                beanA713.A713RUTA1 = rst.getString("A713RUTA1").trim();
                beanA713.A713CARRA1 = rst.getString("A713CARRA1").trim();
                beanA713.A713NVLO1 = rst.getString("A713NVLO1").trim();
                beanA713.A713FVLO1 = rst.getString("A713FVLO1").trim();
                beanA713.A713HVLO1 = rst.getString("A713HVLO1").trim();
                beanA713.A713BOOKI1 = rst.getString("A713BOOKI1").trim();
                beanA713.A713CLASE1 = rst.getString("A713CLASE1").trim();
                beanA713.A713FBUSO1 = rst.getString("A713FBUSO1").trim();
                beanA713.A713FBORI1 = rst.getString("A713FBORI1").trim();
                beanA713.A713LOHO1 = rst.getString("A713LOHO1").trim();
                beanA713.A713TBASE1 = rst.getString("A713TBASE1").trim();
                beanA713.A713STBAS1 = rst.getString("A713STBAS1").trim();
                beanA713.A713TDESC1 = rst.getString("A713TDESC1").trim();
                beanA713.A713PORDS1 = rst.getDouble("A713PORDS1");
                beanA713.A713VIA1 = rst.getString("A713VIA1").trim();
                beanA713.A713FARE1 = rst.getDouble("A713FARE1");
                beanA713.A713TFARE1 = rst.getString("A713TFARE1").trim();
                beanA713.A713SS1 = rst.getDouble("A713SS1");
                beanA713.A713DIFER1 = rst.getDouble("A713DIFER1");
                beanA713.A713FDIFE1 = rst.getString("A713FDIFE1").trim();
                beanA713.A713CFARE1 = rst.getString("A713CFARE1").trim();
                beanA713.A713TRFM1 = rst.getDouble("A713TRFM1");
                beanA713.A713MNTFM1 = rst.getString("A713MNTFM1").trim();
                beanA713.A713VLSRP1 = rst.getDouble("A713VLSRP1");
                beanA713.A713VLMPA1 = rst.getDouble("A713VLMPA1");
                beanA713.A713ACUE1 = rst.getDouble("A713ACUE1");
                beanA713.A713ACUEO1 = rst.getDouble("A713ACUEO1");
                beanA713.A713ISC1 = rst.getDouble("A713ISC1");
                beanA713.A713AJUST1 = rst.getDouble("A713AJUST1");
                beanA713.A713VALOR1 = rst.getDouble("A713VALOR1");
                beanA713.A713QIN1 = rst.getDouble("A713QIN1");
                beanA713.A713Q1 = rst.getDouble("A713Q1");
                beanA713.A713FACT1 = rst.getDouble("A713FACT1");
                beanA713.A713PPRO1 = rst.getDouble("A713PPRO1");
                beanA713.A713PROV1 = rst.getDouble("A713PROV1");
                beanA713.A713YQ1 = rst.getDouble("A713YQ1");
                beanA713.A713IV1 = rst.getDouble("A713IV1");
                beanA713.A713PRRCM1 = rst.getDouble("A713PRRCM1");
                beanA713.A713PRSCM1 = rst.getDouble("A713PRSCM1");
                beanA713.A713INDPR1 = rst.getString("A713INDPR1").trim();
                beanA713.A713CIAI = rst.getString("A713CIAI").trim();
                beanA713.A713FORMAI = rst.getString("A713FORMAI").trim();
                beanA713.A713SERIEI = rst.getString("A713SERIEI").trim();
                beanA713.A713VALOL1 = rst.getDouble("A713VALOL1");
                beanA713.A713LRRCM1 = rst.getDouble("A713LRRCM1");
                beanA713.A713LRSCM1 = rst.getDouble("A713LRSCM1");
                beanA713.A713LYQ1 = rst.getDouble("A713LYQ1");
                beanA713.A713LIV1 = rst.getDouble("A713LIV1");
                
                lstA713.add(beanA713);
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
        return lstA713;
    }
    
    public A1526Filter searchA1526(A1526Filter filter) throws SQLException, Exception {

        A1526Filter bean = new A1526Filter();

        CallableStatement cstmt01 = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP03437(?,?,?)}";

        Connection cnx = null;
        try {

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, filter.IN_CURR_FROM);
            cstmt01.setString(2, filter.IN_CURR_TO.trim());
            cstmt01.setString(3, filter.IN_DATE);

            cstmt01.execute();

            rst = cstmt01.getResultSet();
            while (rst.next()) {

                bean = new A1526Filter();
                bean.A1526EFF = rst.getString("A1526EFF").trim();
                bean.A1526DIS = rst.getString("A1526DIS").trim();
                bean.A1526CUR = rst.getString("A1526CUR").trim();
                bean.A1526CUR2 = rst.getString("A1526CUR2").trim();
                bean.A1526RATE = rst.getDouble("A1526RATE");
                bean.A1526FLAG1 = rst.getString("A1526FLAG1").trim();
                bean.A1526FLAG2 = rst.getString("A1526FLAG2").trim();
                bean.A1526FLAG3 = rst.getString("A1526FLAG3").trim();
                bean.A1526UCRE = rst.getString("A1526UCRE").trim();;
                bean.A1526DCRE = rst.getString("A1526DCRE").trim();
                bean.A1526TCRE = rst.getString("A1526TCRE").trim();
                bean.A1526UUPD = rst.getString("A1526UUPD").trim();
                bean.A1526DUPD = rst.getString("A1526DUPD").trim();
                bean.A1526TUPD = rst.getString("A1526TUPD").trim();                
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
        return bean;
    }
    
    public String searchDeliveryRFND(FACSIMILFilter filter, String fuente) throws SQLException, Exception {
        String ccust = session.getUserView().getCustomerInfo().CCUST;
        CallableStatement cs = null;
        ResultSet rst = null;
        String strSQL;
        String strTEXTO = "";
        Connection cnx = null;
        try {
            if (fuente.trim().equals("A") || fuente.trim().equals("ARC")) {
                //ARC--En caso cambien a Reembolso y que no buesque siempre venta seria: " + session.getMainLibrary() + ".PX01S01A1347RFND
                //ARC--En caso cambien a Venta seria: " + session.getMainLibrary() + ".PX01S01A1347
                strSQL = "{CALL " + session.getMainLibrary() + ".PX01S01A1347RFND(?,?,?,?)}";
            } else if (fuente.trim().equals("S") || fuente.trim().equals("ASR")) {
                //ASR--En caso cambien a Reembolso y que no buesque siempre venta seria: " + session.getMainLibrary() + ".PX01S02A1536RFND
                //ASR--En caso cambien a Venta seria: " + session.getMainLibrary() + ".PX01S02A1536
                strSQL = "{CALL " + session.getMainLibrary() + ".PX01S02A1536RFND(?,?,?,?)}";
            } else {
                //BSP--En caso cambien a Reembolso y que no buesque siempre venta seria: " + session.getMainLibrary() + ".PX01S03A1348RFND
                //BSP--En caso cambien a Venta seria: " + session.getMainLibrary() + ".PX01S03A1348
                strSQL = "{CALL " + session.getMainLibrary() + ".PX01S03A1348RFND(?,?,?,?)}";
            }
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(strSQL);
            cs.setString(1, ccust);
            cs.setString(2, filter.TDNR.trim());
            cs.setString(3, filter.SEQTKT.trim());
            cs.setString(4, filter.IDFILE.trim());
            cs.execute();
            if (fuente.trim().equals("A") || fuente.trim().equals("ARC")) {
                rst = cs.getResultSet();
                while (rst.next()) {
                    strTEXTO += rst.getString("SMSG") + rst.getString("SQNR")
                            + " " + rst.getString("STNQ") + " " + rst.getString("DAIS")
                            + rst.getString("TRNN") + rst.getString("TKTN")
                            + rst.getString("CDGT") + rst.getString("ARCMAXLONG") + "\n";
                }
            } else {
                rst = cs.getResultSet();
                while (rst.next()) {
                    strTEXTO += rst.getString("SMSG") + rst.getString("SQNR")
                            + " " + rst.getString("STNQ") + " " + rst.getString("DAIS")
                            + rst.getString("TRNN") + rst.getString("TDNR")
                            + rst.getString("CDGT") + rst.getString("BSPMAXLONG") + "\n";
                }
            }
            try {
                rst.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
            try {
                cs.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
        } finally {
            if (rst != null) {
                try {
                    rst.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            if (cs != null) {
                try {
                    cs.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            // =================
            pasarGarbageCollector();
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
        }
        return strTEXTO;
    }
    
    public String SQP03439(S0001A713Filter filter) throws SQLException, Exception{
        CallableStatement cs = null;
        ResultSet rst = null;
        String strSQL;
        String strResult = "";
        Connection cnx = null;
        
        try{
            strSQL = "{CALL " + session.getMainLibrary() + ".SQP03439(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(strSQL);
            cs.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cs.setString(2, filter.A713CIA.trim());
            cs.setString(3, filter.A713FORMA.trim());
            cs.setString(4, filter.A713SERIE.trim());
            cs.setString(5, filter.A713CUPON.trim());
            cs.setString(6, filter.A713SEQ.trim());
            cs.setString(7, filter.A713GRUPO.trim());
            cs.setString(8, filter.A713FECVTA.trim());
            cs.setString(9, filter.A713CODIT.trim());
            cs.setString(10, filter.A713CIUVTA.trim());
            cs.setString(11, filter.A713PAIVTA.trim());
            cs.setString(12, filter.A713CIUEMI.trim());
            cs.setString(13, filter.A713PAIEMI.trim());
            cs.setDouble(14, filter.A713TAJUST);
            cs.setString(15, filter.A713STAT.trim());
            cs.setString(16, filter.A713BASE.trim());
            cs.setString(17, filter.A713MONREG.trim());
            cs.setString(18, filter.A713INITRA.trim());
            cs.setString(19, filter.A713MONSYS.trim());
            cs.setString(20, filter.A713INDMOD.trim());
            cs.setDouble(21, filter.A713TARIFA);
            cs.setString(22, filter.A713MONEDA.trim());
            cs.setDouble(23, filter.A713TRFPAG);
            cs.setString(24, filter.A713MDAPAG.trim());
            cs.setDouble(25, filter.A713TRFNUC);
            cs.setString(26, filter.A713MDAFA.trim());
            cs.setDouble(27, filter.A713FARE);
            cs.setString(28, filter.A713MDARVA.trim());
            cs.setDouble(29, filter.A713FARERV);
            cs.setDouble(30, filter.A713ROE);
            cs.setDouble(31, filter.A713CSOVER);
            cs.setInt(32, filter.A713QSOVER);
            cs.setDouble(33, filter.A713CPLUSS);
            cs.setDouble(34, filter.A713TAJUSQ);
            cs.setDouble(35, filter.A713COMMIS);
            cs.setString(36, filter.A713MDACOM.trim());
            cs.setDouble(37, filter.A713PORCOM);
            cs.setString(38, session.getUserView().getCustomerInfo().USR);
            cs.setString(39, filter.BPADRE.trim());
            cs.setString(40, filter.BPREV.trim());
            cs.setString(41, filter.A713CONEX1.trim());
            cs.setString(42, filter.A713RUTA0.trim());
            cs.setString(43, filter.A713RUTA1.trim());
            cs.setString(44, filter.A713CARRA1.trim());
            cs.setString(45, filter.A713NVLO1.trim());
            cs.setString(46, filter.A713FVLO1.trim());
            cs.setString(47, filter.A713BOOKI1.trim());
            cs.setString(48, filter.A713CLASE1.trim());
            cs.setString(49, filter.A713FBUSO1.trim());
            cs.setString(50, filter.A713TBASE1.trim());
            cs.setString(51, filter.A713STBAS1.trim());
            cs.setString(52, filter.A713TDESC1.trim());
            cs.setDouble(53, filter.A713PORDS1);
            cs.setString(54, filter.A713VIA1.trim());
            cs.setDouble(55, filter.A713FARE1);
            cs.setString(56, filter.A713TFARE1.trim());
            cs.setDouble(57, filter.A713SS1);
            cs.setDouble(58, filter.A713DIFER1);
            cs.setString(59, filter.A713FDIFE1.trim());
            cs.setString(60, filter.A713CFARE1.trim());
            cs.setString(61, filter.A713MNTFM1.trim());
            cs.setDouble(62, filter.A713VLSRP1);
            cs.setDouble(63, filter.A713VLMPA1);
            cs.setDouble(64, filter.A713ACUE1);
            cs.setDouble(65, filter.A713ISC1);
            cs.setDouble(66, filter.A713VALOR1);
            cs.setDouble(67, filter.A713VALOL1);
            cs.setDouble(68, filter.A713AJUST1);
            cs.setDouble(69, filter.A713ACUEO1);
            cs.setDouble(70, filter.A713QIN1);
            cs.setDouble(71, filter.A713Q1);
            cs.setDouble(72, filter.A713FACT1);
            cs.setDouble(73, filter.A713PPRO1);
            cs.setDouble(74, filter.A713PROV1);
            cs.setDouble(75, filter.A713PRRCM1);
            cs.setDouble(76, filter.A713PRSCM1);
            cs.setDouble(77, filter.A713YQ1);
            cs.setDouble(78, filter.A713IV1);
            cs.setString(79, filter.A713INDPR1.trim());
            cs.setString(80, filter.A713HVLO1.trim());
            cs.execute();
            
            strResult = "OK";
            
        }catch (SQLException e) {
            strResult = e.getMessage();
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
        }
        
        return strResult;
    }
    
    public String SQP03440(S0001A713Filter filter) throws SQLException, Exception{
        CallableStatement cs = null;
        ResultSet rst = null;
        String strSQL;
        String strResult = "";
        Connection cnx = null;
        
        try{
            strSQL = "{CALL " + session.getMainLibrary() + ".SQP03440(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(strSQL);
            cs.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cs.setString(2, filter.A713CIA.trim());
            cs.setString(3, filter.A713FORMA.trim());
            cs.setString(4, filter.A713SERIE.trim());
            cs.setString(5, filter.A713CIAI.trim());
            cs.setString(6, filter.A713FORMAI.trim());
            cs.setString(7, filter.A713SERIEI.trim());
            cs.setString(8, filter.A713FLAG.trim());
            cs.setInt(9, filter.A713NSEQ);            
            cs.setString(10, filter.A713SEQ.trim());            
            cs.setString(11, filter.A713GRUPO.trim());
            cs.setString(12, filter.A713FECVTA.trim());
            cs.setString(13, filter.A713CODIT.trim());
            cs.setString(14, filter.A713CIUVTA.trim());
            cs.setString(15, filter.A713PAIVTA.trim());
            cs.setString(16, filter.A713CIUEMI.trim());
            cs.setString(17, filter.A713PAIEMI.trim());            
            cs.setDouble(18, filter.A713TARIFA);
            cs.setString(19, filter.A713MONEDA.trim());
            cs.setDouble(20, filter.A713TRFPAG);
            cs.setString(21, filter.A713MDAPAG.trim());
            cs.setDouble(22, filter.A713TRFNUC);
            cs.setDouble(23, filter.A713ROE);
            cs.setDouble(24, filter.A713CSOVER);
            cs.setInt(25, filter.A713QSOVER);
            cs.setDouble(26, filter.A713CPLUSS);
            cs.setDouble(27, filter.A713TAJUSQ);
            cs.setDouble(28, filter.A713COMMIS);
            cs.setString(29, filter.A713MDACOM.trim());
            cs.setString(30, filter.A713STAT.trim());
            cs.setString(31, filter.A713INITRA.trim());
            cs.setString(32, filter.A713CONEX1.trim());
            cs.setString(33, filter.A713RUTA0.trim());
            cs.setString(34, filter.A713RUTA1.trim());
            cs.setString(35, filter.A713CARRA1.trim());
            cs.setString(36, filter.A713NVLO1.trim());
            cs.setString(37, filter.A713FVLO1.trim());
            cs.setString(38, filter.A713BOOKI1.trim());
            cs.setString(39, filter.A713CLASE1.trim());
            cs.setString(40, filter.A713FBUSO1.trim());
            cs.setString(41, filter.A713FBORI1.trim());
            cs.setString(42, filter.A713TBASE1.trim());
            cs.setString(43, filter.A713LOHO1.trim());
            cs.setString(44, filter.A713STBAS1.trim());
            cs.setString(45, filter.A713TDESC1.trim());
            cs.setDouble(46, filter.A713PORDS1);
            cs.setString(47, filter.A713VIA1.trim());
            cs.setDouble(48, filter.A713FARE1);
            cs.setString(49, filter.A713TFARE1.trim());
            cs.setDouble(50, filter.A713SS1);
            cs.setDouble(51, filter.A713DIFER1);
            cs.setString(52, filter.A713FDIFE1.trim());
            cs.setString(53, filter.A713CFARE1.trim());
            cs.setString(54, filter.A713MNTFM1.trim());
            cs.setDouble(55, filter.A713ACUE1);
            cs.setDouble(56, filter.A713ACUEO1);
            cs.setDouble(57, filter.A713ISC1);
            cs.setDouble(58, filter.A713AJUST1);
            cs.setDouble(59, filter.A713VALOR1);
            cs.setDouble(60, filter.A713QIN1);
            cs.setDouble(61, filter.A713VLSRP1);
            cs.setDouble(62, filter.A713VLMPA1);
            cs.setDouble(63, filter.A713Q1);
            cs.setDouble(64, filter.A713FACT1);
            cs.setDouble(65, filter.A713PPRO1);
            cs.setDouble(66, filter.A713PROV1);
            cs.setDouble(67, filter.A713PRRCM1);
            cs.setDouble(68, filter.A713PORCOM);
            cs.setString(69, filter.A713HVLO1.trim());
            cs.setString(70, session.getUserView().getCustomerInfo().USR);            
            
            cs.execute();
            
            strResult = "OK";
            
        }catch (SQLException e) {
            strResult = e.getMessage();
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
        }
        
        return strResult;
    }
    
    public List<S0001A713Filter> SQP03441(S0001A713Filter filter) throws SQLException, Exception {

        S0001A713Filter beanA713 = new S0001A713Filter();
        List<S0001A713Filter> lstA713 = new ArrayList<>();
        
        CallableStatement cstmt01 = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP03441(?,?,?,?,?)}";

        Connection cnx = null;
        try {

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.A713CIA.trim());
            cstmt01.setString(3, filter.A713FORMA);
            cstmt01.setString(4, filter.A713SERIE);
            cstmt01.setString(5, filter.A713SEQ);

            cstmt01.execute();

            rst = cstmt01.getResultSet();
            while (rst.next()) {
                beanA713 = new S0001A713Filter();
                beanA713.A713CIA = rst.getString("A713CIA").trim();
                beanA713.A713FORMA = rst.getString("A713FORMA").trim();
                beanA713.A713SERIE = rst.getString("A713SERIE").trim();                
                beanA713.TICKET = rst.getString("A713CIA").trim() + rst.getString("A713FORMA").trim() + rst.getString("A713SERIE").trim();
                beanA713.A713CIAI = rst.getString("A713CIAI").trim();
                beanA713.A713FORMAI = rst.getString("A713FORMAI").trim();
                beanA713.A713SERIEI = rst.getString("A713SERIEI").trim();
                
                lstA713.add(beanA713);
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
        return lstA713;
    }       
    
    public List<A720> prorateoTicket(PRORATEFilter beanProrate) throws SQLException, Exception {
        Connection cnx = null;
        PreparedStatement stmt = null;
        ResultSet rst = null;
        String strSQL = "";
        List<A720> lstProrate = new ArrayList<A720>(0);
        A720 objRtn;
        try {
            session.getCNXIBMDB2().openSystem();
            ProgramCall program = new ProgramCall(session.getCNXIBMDB2().getSystem());
            try {
                App.CALL_CL3050(session.getCNXIBMDB2().getSystem(), session.getMainLibrary(), session.getUserView().getCustomerInfo().CCUST);
                String programName = "/QSYS.LIB/" + session.getMainLibrary() + ".LIB/RUT01260.PGM";//RUT1050JD

                //<editor-fold defaultstate="collapsed" desc="{...} Mapping">
                AS400Map mapping = new AS400Map();
                //<editor-fold defaultstate="collapsed" desc="{...} 01 RECEIVING_DATA">
                AS400DataType[] RECEIVING_DATA = new AS400DataType[7];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}     02 LK_PROGRAM">
                AS400DataType[] LK_PROGRAM = new AS400DataType[1];
                LK_PROGRAM[0] = mapping.Char(10);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}     02 LK_BATCH">
                AS400DataType[] LK_BATCH = new AS400DataType[1];
                LK_BATCH[0] = mapping.Char(1);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}     02 LK_MOSTRAR_SCR">
                AS400DataType[] LK_MOSTRAR_SCR = new AS400DataType[1];
                LK_MOSTRAR_SCR[0] = mapping.Char(1);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}     02 LK_CREA_LOG">
                AS400DataType[] LK_CREA_LOG = new AS400DataType[1];
                LK_CREA_LOG[0] = mapping.Char(1);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}     02 DATOS_INPUT">
                class IDX_DATOS_INPUT {

                    static final int LK_METODO = 0;
                    static final int LK_BASE_DOM = 1;
                    static final int LK_BASE_INT = 2;
                    static final int LK_TIPO_AJUSTE = 3;
                    static final int LK_CIALIT = 4;
                    static final int LK_CIA = 5;
                    static final int LK_FORMA = 6;
                    static final int LK_SERIE = 7;
                    static final int LK_CUPON = 8;
                    static final int LK_REGI_MDA = 9;
                    static final int LK_TUSO = 10;
                    static final int LK_FUSO = 11;
                    static final int LK_FVIAJE = 12;
                    static final int LK_FVENTA = 13;
                    static final int LK_TVENTA = 14;
                    static final int LK_FFACTU = 15;
                    static final int LK_FARE_MDA = 16;
                    static final int LK_FARE = 17;
                    static final int LK_EQV_MDA = 18;
                    static final int LK_EQV_FARE = 19;
                    static final int LK_EQV_TC = 20;
                    static final int LK_SAMPLING = 21;
                    static final int LK_NUC = 22;
                    static final int LK_NUC_MDA = 23;
                    static final int LK_ROE = 24;
                    static final int LK_IPLUS = 25;
                    static final int LK_TPLUS = 26;
                    static final int LK_QSTOPOVER = 27;
                    static final int LK_TSTOPOVER = 28;
                    static final int LK_EXCHANGE = 29;
                    static final int LK_CAMBIO_RUT = 30;
                    static final int LK_ORIGEN = 31;
                    static final int LO_SL = 32;
                    static final int LO_XO = 33;
                    static final int LO_M = 34;
                    static final int LO_AFTER = 35;
                    static final int LO_BEFOR = 36;
                    static final int LO_RUTING = 37;
                    static final int LO_AIRLONG = 38;
                    static final int LO_TRANSP = 39;
                    static final int LO_VIA = 40;
                    static final int LO_BASE = 41;
                    static final int LO_TBASE = 42;
                    static final int LO_SBTBASE = 43;
                    static final int LO_CLASE = 44;
                    static final int LO_RBD = 45;
                    static final int LO_TEMPOR = 46;
                    static final int LO_NVLO = 47;
                    static final int LO_FVLO = 48;
                    static final int LO_TDESC = 49;
                    static final int LO_PDESC = 50;
                    static final int LO_BREAK = 51;
                    static final int LO_INDST = 52;
                    static final int LO_PLUS = 53;
                    static final int LO_Q = 54;
                    static final int LO_DIFL = 55;
                    static final int LO_INDIF = 56;
                    static final int LO_ACU_MDA = 57;
                    static final int LO_ACU_I = 58;
                    static final int LO_TFM_MDA = 59;
                    static final int LO_TFM_I = 60;
                    static final int VALIDO_PARA_VIAJAR_INPUT = 61;
                }

                AS400DataType[] DATOS_INPUT = new AS400DataType[62];
                DATOS_INPUT[IDX_DATOS_INPUT.LK_METODO] = mapping.Char(3);
                DATOS_INPUT[IDX_DATOS_INPUT.LK_BASE_DOM] = mapping.Char(1);
                DATOS_INPUT[IDX_DATOS_INPUT.LK_BASE_INT] = mapping.Char(1);
                DATOS_INPUT[IDX_DATOS_INPUT.LK_TIPO_AJUSTE] = mapping.Char(1);
                DATOS_INPUT[IDX_DATOS_INPUT.LK_CIALIT] = mapping.Char(3);
                DATOS_INPUT[IDX_DATOS_INPUT.LK_CIA] = mapping.Char(3);
                DATOS_INPUT[IDX_DATOS_INPUT.LK_FORMA] = mapping.Char(4);
                DATOS_INPUT[IDX_DATOS_INPUT.LK_SERIE] = mapping.Char(6);
                DATOS_INPUT[IDX_DATOS_INPUT.LK_CUPON] = mapping.Char(1);
                DATOS_INPUT[IDX_DATOS_INPUT.LK_REGI_MDA] = mapping.Char(3);
                DATOS_INPUT[IDX_DATOS_INPUT.LK_TUSO] = mapping.Char(2);
                DATOS_INPUT[IDX_DATOS_INPUT.LK_FUSO] = mapping.Char(8);
                DATOS_INPUT[IDX_DATOS_INPUT.LK_FVIAJE] = mapping.Char(8);
                DATOS_INPUT[IDX_DATOS_INPUT.LK_FVENTA] = mapping.Char(8);
                DATOS_INPUT[IDX_DATOS_INPUT.LK_TVENTA] = mapping.Char(1);
                DATOS_INPUT[IDX_DATOS_INPUT.LK_FFACTU] = mapping.Char(8);
                DATOS_INPUT[IDX_DATOS_INPUT.LK_FARE_MDA] = mapping.Char(3);
                DATOS_INPUT[IDX_DATOS_INPUT.LK_FARE] = mapping.Numeric(11, 2, true);
                DATOS_INPUT[IDX_DATOS_INPUT.LK_EQV_MDA] = mapping.Char(3);
                DATOS_INPUT[IDX_DATOS_INPUT.LK_EQV_FARE] = mapping.Numeric(11, 2, true);
                DATOS_INPUT[IDX_DATOS_INPUT.LK_EQV_TC] = mapping.Numeric(7, 6, true);
                DATOS_INPUT[IDX_DATOS_INPUT.LK_SAMPLING] = mapping.Char(1);
                DATOS_INPUT[IDX_DATOS_INPUT.LK_NUC] = mapping.Numeric(11, 2, true);
                DATOS_INPUT[IDX_DATOS_INPUT.LK_NUC_MDA] = mapping.Char(3);
                DATOS_INPUT[IDX_DATOS_INPUT.LK_ROE] = mapping.Numeric(7, 6, true);
                DATOS_INPUT[IDX_DATOS_INPUT.LK_IPLUS] = mapping.Char(1);
                DATOS_INPUT[IDX_DATOS_INPUT.LK_TPLUS] = mapping.Numeric(11, 2, true);
                DATOS_INPUT[IDX_DATOS_INPUT.LK_QSTOPOVER] = mapping.Numeric(2, 0, true);
                DATOS_INPUT[IDX_DATOS_INPUT.LK_TSTOPOVER] = mapping.Numeric(11, 2, true);
                DATOS_INPUT[IDX_DATOS_INPUT.LK_EXCHANGE] = mapping.Char(1);
                DATOS_INPUT[IDX_DATOS_INPUT.LK_CAMBIO_RUT] = mapping.Char(1);
                DATOS_INPUT[IDX_DATOS_INPUT.LK_ORIGEN] = mapping.Char(3);
                //DATOS_INPUT[IDX_DATOS_INPUT.LK_SELEC] = mapping.Char(8);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_SL">
                AS400DataType[] LO_SL = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_SELEC">
                class IDX_LK_SELEC {

                    static final int LK_SELEC = 0;
                }
                LO_SL[IDX_LK_SELEC.LK_SELEC] = mapping.Numeric(2, 0);
                DATOS_INPUT[IDX_DATOS_INPUT.LO_SL] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_SL)), 4);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_XO">
                AS400DataType[] LO_XO = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_XO">
                class IDX_LK_XO {

                    static final int LK_XO = 0;
                }
                LO_XO[IDX_LK_XO.LK_XO] = mapping.Char(1);
                DATOS_INPUT[IDX_DATOS_INPUT.LO_XO] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_XO)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_M">
                AS400DataType[] LO_M = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_M">
                class IDX_LK_M {

                    static final int LK_M = 0;
                }
                LO_M[IDX_LK_M.LK_M] = mapping.Char(1);
                DATOS_INPUT[IDX_DATOS_INPUT.LO_M] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_M)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_AFTER">
                AS400DataType[] LO_AFTER = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_AFTER">
                class IDX_LK_AFTER {

                    static final int LK_AFTER = 0;
                }
                LO_AFTER[IDX_LK_AFTER.LK_AFTER] = mapping.Char(8);
                DATOS_INPUT[IDX_DATOS_INPUT.LO_AFTER] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_AFTER)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_BEFOR">
                AS400DataType[] LO_BEFOR = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_BEFOR">
                class IDX_LK_BEFOR {

                    static final int LK_BEFOR = 0;
                }
                LO_BEFOR[IDX_LK_BEFOR.LK_BEFOR] = mapping.Char(8);
                DATOS_INPUT[IDX_DATOS_INPUT.LO_BEFOR] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_BEFOR)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_RUTING">
                AS400DataType[] LO_RUTING = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_RUTING">
                class IDX_LK_RUTING {

                    static final int LK_RUTING = 0;
                }
                LO_RUTING[IDX_LK_RUTING.LK_RUTING] = mapping.Char(3);
                DATOS_INPUT[IDX_DATOS_INPUT.LO_RUTING] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_RUTING)), 41);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_AIRLONG">
                AS400DataType[] LO_AIRLONG = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_AIRLONG">
                class IDX_LK_AIRLONG {

                    static final int LK_AIRLONG = 0;
                }
                LO_AIRLONG[IDX_LK_AIRLONG.LK_AIRLONG] = mapping.Char(3);
                DATOS_INPUT[IDX_DATOS_INPUT.LO_AIRLONG] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_AIRLONG)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_TRANSP">
                AS400DataType[] LO_TRANSP = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_TRANSP">
                class IDX_LK_TRANSP {

                    static final int LK_TRANSP = 0;
                }
                LO_TRANSP[IDX_LK_TRANSP.LK_TRANSP] = mapping.Char(2);
                DATOS_INPUT[IDX_DATOS_INPUT.LO_TRANSP] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_TRANSP)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_VIA">
                AS400DataType[] LO_VIA = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_VIA">
                class IDX_LK_VIA {

                    static final int LK_VIA = 0;
                }
                LO_VIA[IDX_LK_VIA.LK_VIA] = mapping.Char(2);
                DATOS_INPUT[IDX_DATOS_INPUT.LO_VIA] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_VIA)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_BASE">
                AS400DataType[] LO_BASE = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_BASE">
                class IDX_LK_BASE {

                    static final int LK_BASE = 0;
                }
                LO_BASE[IDX_LK_BASE.LK_BASE] = mapping.Char(15);
                DATOS_INPUT[IDX_DATOS_INPUT.LO_BASE] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_BASE)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_TBASE">
                AS400DataType[] LO_TBASE = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_TBASE">
                class IDX_LK_TBASE {

                    static final int LK_TBASE = 0;
                }
                LO_TBASE[IDX_LK_TBASE.LK_TBASE] = mapping.Char(1);
                DATOS_INPUT[IDX_DATOS_INPUT.LO_TBASE] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_TBASE)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_SBTBASE">
                AS400DataType[] LO_SBTBASE = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_SBTBASE">
                class IDX_LK_SBTBASE {

                    static final int LK_SBTBASE = 0;
                }
                LO_SBTBASE[IDX_LK_SBTBASE.LK_SBTBASE] = mapping.Char(2);
                DATOS_INPUT[IDX_DATOS_INPUT.LO_SBTBASE] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_SBTBASE)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_CLASE">
                AS400DataType[] LO_CLASE = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_CLASE">
                class IDX_LK_CLASE {

                    static final int LK_CLASE = 0;
                }
                LO_CLASE[IDX_LK_CLASE.LK_CLASE] = mapping.Char(1);
                DATOS_INPUT[IDX_DATOS_INPUT.LO_CLASE] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_CLASE)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_RBD">
                AS400DataType[] LO_RBD = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_RBD">
                class IDX_LK_RBD {

                    static final int LK_RBD = 0;
                }
                LO_RBD[IDX_LK_RBD.LK_RBD] = mapping.Char(1);
                DATOS_INPUT[IDX_DATOS_INPUT.LO_RBD] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_RBD)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_TEMPOR">
                AS400DataType[] LO_TEMPOR = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_TEMPOR">
                class IDX_LK_TEMPOR {

                    static final int LK_TEMPOR = 0;
                }
                LO_TEMPOR[IDX_LK_TEMPOR.LK_TEMPOR] = mapping.Char(1);
                DATOS_INPUT[IDX_DATOS_INPUT.LO_TEMPOR] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_TEMPOR)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_NVLO">
                AS400DataType[] LO_NVLO = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_NVLO">
                class IDX_LK_NVLO {

                    static final int LK_NVLO = 0;
                }
                LO_NVLO[IDX_LK_NVLO.LK_NVLO] = mapping.Char(5);
                DATOS_INPUT[IDX_DATOS_INPUT.LO_NVLO] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_NVLO)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_FVLO">
                AS400DataType[] LO_FVLO = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_FVLO">
                class IDX_LK_FVLO {

                    static final int LK_FVLO = 0;
                }
                LO_FVLO[IDX_LK_FVLO.LK_FVLO] = mapping.Char(8);
                DATOS_INPUT[IDX_DATOS_INPUT.LO_FVLO] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_FVLO)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_TDESC">
                AS400DataType[] LO_TDESC = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_TDESC">
                class IDX_LK_TDESC {

                    static final int LK_TDESC = 0;
                }
                LO_TDESC[IDX_LK_TDESC.LK_TDESC] = mapping.Char(2);
                DATOS_INPUT[IDX_DATOS_INPUT.LO_TDESC] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_TDESC)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_PDESC">
                AS400DataType[] LO_PDESC = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_PDESC">
                class IDX_LK_PDESC {

                    static final int LK_PDESC = 0;
                }
                LO_PDESC[IDX_LK_PDESC.LK_PDESC] = mapping.Numeric(3, 2, true);
                DATOS_INPUT[IDX_DATOS_INPUT.LO_PDESC] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_PDESC)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_BREAK">
                AS400DataType[] LO_BREAK = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_BREAK">
                class IDX_LK_BREAK {

                    static final int LK_BREAK = 0;
                }
                LO_BREAK[IDX_LK_BREAK.LK_BREAK] = mapping.Numeric(8, 2, true);
                DATOS_INPUT[IDX_DATOS_INPUT.LO_BREAK] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_BREAK)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_INDST">
                AS400DataType[] LO_INDST = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_INDST">
                class IDX_LK_INDST {

                    static final int LK_INDST = 0;
                }
                LO_INDST[IDX_LK_INDST.LK_INDST] = mapping.Char(1);
                DATOS_INPUT[IDX_DATOS_INPUT.LO_INDST] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_INDST)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_PLUS">
                AS400DataType[] LO_PLUS = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_PLUS">
                class IDX_LK_PLUS {

                    static final int LK_PLUS = 0;
                }
                LO_PLUS[IDX_LK_PLUS.LK_PLUS] = mapping.Numeric(8, 2, true);
                DATOS_INPUT[IDX_DATOS_INPUT.LO_PLUS] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_PLUS)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_Q">
                AS400DataType[] LO_Q = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_Q">
                class IDX_LK_Q {

                    static final int LK_Q = 0;
                }
                LO_Q[IDX_LK_Q.LK_Q] = mapping.Numeric(8, 2, true);
                DATOS_INPUT[IDX_DATOS_INPUT.LO_Q] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_Q)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_DIFL">
                AS400DataType[] LO_DIFL = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_DIFL">
                class IDX_LK_DIFL {

                    static final int LK_DIFL = 0;
                }
                LO_DIFL[IDX_LK_DIFL.LK_DIFL] = mapping.Numeric(8, 2, true);
                DATOS_INPUT[IDX_DATOS_INPUT.LO_DIFL] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_DIFL)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_INDIF">
                AS400DataType[] LO_INDIF = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_INDIF">
                class IDX_LK_INDIF {

                    static final int LK_INDIF = 0;
                }
                LO_INDIF[IDX_LK_INDIF.LK_INDIF] = mapping.Char(1);
                DATOS_INPUT[IDX_DATOS_INPUT.LO_INDIF] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_INDIF)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_ACU_MDA">
                AS400DataType[] LO_ACU_MDA = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_ACU_MDA">
                class IDX_LK_ACU_MDA {

                    static final int LK_ACU_MDA = 0;
                }
                LO_ACU_MDA[IDX_LK_ACU_MDA.LK_ACU_MDA] = mapping.Char(3);
                DATOS_INPUT[IDX_DATOS_INPUT.LO_ACU_MDA] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_ACU_MDA)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_ACU_I">
                AS400DataType[] LO_ACU_I = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_ACU_I">
                class IDX_LK_ACU_I {

                    static final int LK_ACU_I = 0;
                }
                LO_ACU_I[IDX_LK_ACU_I.LK_ACU_I] = mapping.Numeric(8, 2, true);
                DATOS_INPUT[IDX_DATOS_INPUT.LO_ACU_I] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_ACU_I)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_TFM_MDA">
                AS400DataType[] LO_TFM_MDA = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_TFM_MDA">
                class IDX_LK_TFM_MDA {

                    static final int LK_TFM_MDA = 0;
                }
                LO_TFM_MDA[IDX_LK_TFM_MDA.LK_TFM_MDA] = mapping.Char(3);
                DATOS_INPUT[IDX_DATOS_INPUT.LO_TFM_MDA] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_TFM_MDA)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_TFM_I">
                AS400DataType[] LO_TFM_I = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_TFM_I">
                class IDX_LK_TFM_I {

                    static final int LK_TFM_I = 0;
                }
                LO_TFM_I[IDX_LK_TFM_I.LK_TFM_I] = mapping.Numeric(8, 2, true);
                DATOS_INPUT[IDX_DATOS_INPUT.LO_TFM_I] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_TFM_I)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 VALIDO_PARA_VIAJAR_INPUT">
                class IDX_VALIDO_PARA_VIAJAR_INPUT {

                    static final int LO_RUT_V = 0;
                    static final int LO_TRN_V = 1;
                    static final int LO_BAS_V = 2;
                    static final int LO_RBD_V = 3;
                    static final int LO_VLO_V = 4;
                    static final int LO_FVL_V = 5;
                }

                AS400DataType[] VALIDO_PARA_VIAJAR_INPUT = new AS400DataType[6];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LO_RUT_V">
                AS400DataType[] LO_RUT_V = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}                 05 LK_RUT_V">
                class IDX_LK_RUT_V {

                    static final int LK_RUT_V = 0;
                }
                LO_RUT_V[IDX_LK_RUT_V.LK_RUT_V] = mapping.Char(3);
                VALIDO_PARA_VIAJAR_INPUT[IDX_VALIDO_PARA_VIAJAR_INPUT.LO_RUT_V] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_RUT_V)), 5);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LO_TRN_V">
                AS400DataType[] LO_TRN_V = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}                 05 LK_TRN_V">
                class IDX_LK_TRN_V {

                    static final int LK_TRN_V = 0;
                }
                LO_TRN_V[IDX_LK_TRN_V.LK_TRN_V] = mapping.Char(2);
                VALIDO_PARA_VIAJAR_INPUT[IDX_VALIDO_PARA_VIAJAR_INPUT.LO_TRN_V] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_TRN_V)), 4);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LO_BAS_V">
                AS400DataType[] LO_BAS_V = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}                 05 LK_BAS_V">
                class IDX_LK_BAS_V {

                    static final int LK_BAS_V = 0;
                }
                LO_BAS_V[IDX_LK_BAS_V.LK_BAS_V] = mapping.Char(15);
                VALIDO_PARA_VIAJAR_INPUT[IDX_VALIDO_PARA_VIAJAR_INPUT.LO_BAS_V] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_BAS_V)), 4);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LO_RBD_V">
                AS400DataType[] LO_RBD_V = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}                 05 LK_RBD_V">
                class IDX_LK_RBD_V {

                    static final int LK_RBD_V = 0;
                }
                LO_RBD_V[IDX_LK_RBD_V.LK_RBD_V] = mapping.Char(1);
                VALIDO_PARA_VIAJAR_INPUT[IDX_VALIDO_PARA_VIAJAR_INPUT.LO_RBD_V] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_RBD_V)), 4);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LO_VLO_V">
                AS400DataType[] LO_VLO_V = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}                 05 LK_VLO_V">
                class IDX_LK_VLO_V {

                    static final int LK_VLO_V = 0;
                }
                LO_VLO_V[IDX_LK_VLO_V.LK_VLO_V] = mapping.Char(5);
                VALIDO_PARA_VIAJAR_INPUT[IDX_VALIDO_PARA_VIAJAR_INPUT.LO_VLO_V] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_VLO_V)), 4);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LO_FVL_V">
                AS400DataType[] LO_FVL_V = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}                 05 LK_FVL_V">
                class IDX_LK_FVL_V {

                    static final int LK_FVL_V = 0;
                }
                LO_FVL_V[IDX_LK_FVL_V.LK_FVL_V] = mapping.Char(8);
                VALIDO_PARA_VIAJAR_INPUT[IDX_VALIDO_PARA_VIAJAR_INPUT.LO_FVL_V] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_FVL_V)), 4);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}     02 DATOS_OUPUT">
                class IDX_DATOS_OUPUT {

                    static final int LK_REGI_TC = 0;
                    static final int LK_SYST_MDA = 1;
                    static final int LK_SYST_TC = 2;
                    static final int LO_FACTOR = 3;
                    static final int LO_PROVIS = 4;
                    static final int LO_PPROVI = 5;
                    static final int LO_SUBPAR = 6;
                    static final int LO_TARIFA = 7;
                    static final int LO_YANQUI = 8;
                    static final int LO_ACU_O = 9;
                    static final int LO_ACU_CD = 10;
                    static final int LO_ACU_AUTO = 11;
                    static final int LO_ACU_APLICA = 12;
                    static final int LO_ACU_ERROR = 13;
                    static final int LO_INDISC = 14;
                    static final int LO_ISC = 15;
                    static final int LK_INDSRP = 16;
                    static final int LO_SRP = 17;
                    static final int LO_MPA = 18;
                    static final int LO_SOVER = 19;
                    static final int LO_FARE_ATBP = 20;
                    static final int LO_FARE_SYST = 21;
                    static final int LO_COEF = 22;
                    static final int LK_TVALOR_SYST = 23;
                    static final int LO_VALOR_SYST = 24;
                    static final int LK_TAJUSTE_SYST = 25;
                    static final int LO_AJUSTE_SYST = 26;
                    static final int LK_TVALOR = 27;
                    static final int LO_VALOR = 28;
                    static final int LO_INDPR = 29;
                    static final int LK_TAJUSTE = 30;
                    static final int LO_AJUSTE = 31;
                    static final int LK_ESTADO = 32;
                    static final int LK_CODERROR = 33;
                    static final int LK_MSJERROR = 34;
                    static final int LO_CODLOG = 35;
                    static final int LO_TXTLOG = 36;
                }

                AS400DataType[] DATOS_OUPUT = new AS400DataType[37];
                DATOS_OUPUT[IDX_DATOS_OUPUT.LK_REGI_TC] = mapping.Numeric(7, 6, true);
                DATOS_OUPUT[IDX_DATOS_OUPUT.LK_SYST_MDA] = mapping.Char(3);
                DATOS_OUPUT[IDX_DATOS_OUPUT.LK_SYST_TC] = mapping.Numeric(7, 6, true);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_FACTOR">
                AS400DataType[] LO_FACTOR = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_FACTOR">
                class IDX_LK_FACTOR {

                    static final int LK_FACTOR = 0;
                }
                LO_FACTOR[IDX_LK_FACTOR.LK_FACTOR] = mapping.Numeric(8, 2, true);
                DATOS_OUPUT[IDX_DATOS_OUPUT.LO_FACTOR] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_FACTOR)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_PROVIS">
                AS400DataType[] LO_PROVIS = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_PROVIS">
                class IDX_LK_PROVIS {

                    static final int LK_PROVIS = 0;
                }
                LO_PROVIS[IDX_LK_PROVIS.LK_PROVIS] = mapping.Numeric(8, 2, true);
                DATOS_OUPUT[IDX_DATOS_OUPUT.LO_PROVIS] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_PROVIS)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_PPROVI">
                AS400DataType[] LO_PPROVI = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_PPROVI">
                class IDX_LK_PPROVI {

                    static final int LK_PPROVI = 0;
                }
                LO_PPROVI[IDX_LK_PPROVI.LK_PPROVI] = mapping.Numeric(3, 2, true);
                DATOS_OUPUT[IDX_DATOS_OUPUT.LO_PPROVI] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_PPROVI)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_SUBPAR">
                AS400DataType[] LO_SUBPAR = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_SUBPAR">
                class IDX_LK_SUBPAR {

                    static final int LK_SUBPAR = 0;
                }
                LO_SUBPAR[IDX_LK_SUBPAR.LK_SUBPAR] = mapping.Char(20);
                DATOS_OUPUT[IDX_DATOS_OUPUT.LO_SUBPAR] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_SUBPAR)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_TARIFA">
                AS400DataType[] LO_TARIFA = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_TARIFA">
                class IDX_LK_TARIFA {

                    static final int LK_TARIFA = 0;
                }
                LO_TARIFA[IDX_LK_TARIFA.LK_TARIFA] = mapping.Numeric(8, 2, true);
                DATOS_OUPUT[IDX_DATOS_OUPUT.LO_TARIFA] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_TARIFA)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_YANQUI">
                AS400DataType[] LO_YANQUI = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_YANQUI">
                class IDX_LK_YANQUI {

                    static final int LK_YANQUI = 0;
                }
                LO_YANQUI[IDX_LK_YANQUI.LK_YANQUI] = mapping.Numeric(8, 2, true);
                DATOS_OUPUT[IDX_DATOS_OUPUT.LO_YANQUI] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_YANQUI)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_ACU_O">
                AS400DataType[] LO_ACU_O = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_ACU_O">
                class IDX_LK_ACU_O {

                    static final int LK_ACU_O = 0;
                }
                LO_ACU_O[IDX_LK_ACU_O.LK_ACU_O] = mapping.Numeric(8, 2, true);
                DATOS_OUPUT[IDX_DATOS_OUPUT.LO_ACU_O] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_ACU_O)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_ACU_CD">
                AS400DataType[] LO_ACU_CD = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_ACU_CD">
                class IDX_LK_ACU_CD {

                    static final int LK_ACU_CD = 0;
                }
                LO_ACU_CD[IDX_LK_ACU_CD.LK_ACU_CD] = mapping.Char(20);
                DATOS_OUPUT[IDX_DATOS_OUPUT.LO_ACU_CD] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_ACU_CD)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_ACU_AUTO">
                AS400DataType[] LO_ACU_AUTO = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_ACU_AUTO">
                class IDX_LK_ACU_AUTO {

                    static final int LK_ACU_AUTO = 0;
                }
                LO_ACU_AUTO[IDX_LK_ACU_AUTO.LK_ACU_AUTO] = mapping.Char(1);
                DATOS_OUPUT[IDX_DATOS_OUPUT.LO_ACU_AUTO] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_ACU_AUTO)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_ACU_APLICA">
                AS400DataType[] LO_ACU_APLICA = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_ACU_APLICA">
                class IDX_LK_ACU_APLICA {

                    static final int LK_ACU_APLICA = 0;
                }
                LO_ACU_APLICA[IDX_LK_ACU_APLICA.LK_ACU_APLICA] = mapping.Char(1);
                DATOS_OUPUT[IDX_DATOS_OUPUT.LO_ACU_APLICA] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_ACU_APLICA)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_ACU_ERROR">
                AS400DataType[] LO_ACU_ERROR = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_ACU_ERROR">
                class IDX_LK_ACU_ERROR {

                    static final int LK_ACU_ERROR = 0;
                }
                LO_ACU_ERROR[IDX_LK_ACU_ERROR.LK_ACU_ERROR] = mapping.Char(3);
                DATOS_OUPUT[IDX_DATOS_OUPUT.LO_ACU_ERROR] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_ACU_ERROR)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_INDISC">
                AS400DataType[] LO_INDISC = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_INDISC">
                class IDX_LK_INDISC {

                    static final int LK_INDISC = 0;
                }
                LO_INDISC[IDX_LK_INDISC.LK_INDISC] = mapping.Char(1);
                DATOS_OUPUT[IDX_DATOS_OUPUT.LO_INDISC] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_INDISC)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_ISC">
                AS400DataType[] LO_ISC = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_ISC">
                class IDX_LK_ISC {

                    static final int LK_ISC = 0;
                }
                LO_ISC[IDX_LK_ISC.LK_ISC] = mapping.Numeric(3, 2, true);
                DATOS_OUPUT[IDX_DATOS_OUPUT.LO_ISC] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_ISC)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_SRP">
                AS400DataType[] LO_SRP = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_SRP">
                class IDX_LK_SRP {

                    static final int LK_SRP = 0;
                }
                LO_SRP[IDX_LK_SRP.LK_SRP] = mapping.Numeric(8, 2, true);
                DATOS_OUPUT[IDX_DATOS_OUPUT.LO_SRP] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_SRP)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_MPA">
                AS400DataType[] LO_MPA = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_MPA">
                class IDX_LK_MPA {

                    static final int LK_MPA = 0;
                }
                LO_MPA[IDX_LK_MPA.LK_MPA] = mapping.Numeric(8, 2, true);
                DATOS_OUPUT[IDX_DATOS_OUPUT.LO_MPA] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_MPA)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_SOVER">
                AS400DataType[] LO_SOVER = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_SOVER">
                class IDX_LK_SOVER {

                    static final int LK_SOVER = 0;
                }
                LO_SOVER[IDX_LK_SOVER.LK_SOVER] = mapping.Numeric(8, 2, true);
                DATOS_OUPUT[IDX_DATOS_OUPUT.LO_SOVER] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_SOVER)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_FARE_ATBP">
                AS400DataType[] LO_FARE_ATBP = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_FARE_ATBP">
                class IDX_LK_FARE_ATBP {

                    static final int LK_FARE_ATBP = 0;
                }
                LO_FARE_ATBP[IDX_LK_FARE_ATBP.LK_FARE_ATBP] = mapping.Numeric(8, 2, true);
                DATOS_OUPUT[IDX_DATOS_OUPUT.LO_FARE_ATBP] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_FARE_ATBP)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_FARE_SYST">
                AS400DataType[] LO_FARE_SYST = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_FARE_SYST">
                class IDX_LK_FARE_SYST {

                    static final int LK_FARE_SYST = 0;
                }
                LO_FARE_SYST[IDX_LK_FARE_SYST.LK_FARE_SYST] = mapping.Numeric(8, 2, true);
                DATOS_OUPUT[IDX_DATOS_OUPUT.LO_FARE_SYST] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_FARE_SYST)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_COEF">
                AS400DataType[] LO_COEF = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_COEF">
                class IDX_LK_COEF {

                    static final int LK_COEF = 0;
                }
                LO_COEF[IDX_LK_COEF.LK_COEF] = mapping.Numeric(4, 2, true);
                DATOS_OUPUT[IDX_DATOS_OUPUT.LO_COEF] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_COEF)), 40);
                //</editor-fold>
                //LO_COEF[IDX_LK_COEF.LK_COEF] = mapping.Numeric(1, 5, true);
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_VALOR_SYST">
                AS400DataType[] LO_VALOR_SYST = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_VALOR_SYST">
                class IDX_LK_VALOR_SYST {

                    static final int LK_VALOR_SYST = 0;
                }
                LO_VALOR_SYST[IDX_LK_VALOR_SYST.LK_VALOR_SYST] = mapping.Numeric(8, 2, true);
                DATOS_OUPUT[IDX_DATOS_OUPUT.LO_VALOR_SYST] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_VALOR_SYST)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_AJUSTE_SYST">
                AS400DataType[] LO_AJUSTE_SYST = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_AJUSTE_SYST">
                class IDX_LK_AJUSTE_SYST {

                    static final int LK_AJUSTE_SYST = 0;
                }
                LO_AJUSTE_SYST[IDX_LK_AJUSTE_SYST.LK_AJUSTE_SYST] = mapping.Numeric(8, 2, true);
                DATOS_OUPUT[IDX_DATOS_OUPUT.LO_AJUSTE_SYST] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_AJUSTE_SYST)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_VALOR">
                AS400DataType[] LO_VALOR = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_VALOR">
                class IDX_LK_VALOR {

                    static final int LK_VALOR = 0;
                }
                LO_VALOR[IDX_LK_VALOR.LK_VALOR] = mapping.Numeric(8, 2, true);
                DATOS_OUPUT[IDX_DATOS_OUPUT.LO_VALOR] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_VALOR)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_INDPR">
                AS400DataType[] LO_INDPR = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_INDPR">
                class IDX_LK_INDPR {

                    static final int LK_INDPR = 0;
                }
                LO_INDPR[IDX_LK_INDPR.LK_INDPR] = mapping.Char(1);
                DATOS_OUPUT[IDX_DATOS_OUPUT.LO_INDPR] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_INDPR)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_AJUSTE">
                AS400DataType[] LO_AJUSTE = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_AJUSTE">
                class IDX_LK_AJUSTE {

                    static final int LK_AJUSTE = 0;
                }
                LO_AJUSTE[IDX_LK_AJUSTE.LK_AJUSTE] = mapping.Numeric(8, 2, true);
                DATOS_OUPUT[IDX_DATOS_OUPUT.LO_AJUSTE] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_AJUSTE)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_CODLOG">
                AS400DataType[] LO_CODLOG = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_CODLOG">
                class IDX_LK_CODLOG {

                    static final int LK_CODLOG = 0;
                }
                LO_CODLOG[IDX_LK_CODLOG.LK_CODLOG] = mapping.Char(6);
                DATOS_OUPUT[IDX_DATOS_OUPUT.LO_CODLOG] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_CODLOG)), 200);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_TXTLOG">
                AS400DataType[] LO_TXTLOG = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_TXTLOG">
                class IDX_LK_TXTLOG {

                    static final int LK_TXTLOG = 0;
                }
                LO_TXTLOG[IDX_LK_TXTLOG.LK_TXTLOG] = mapping.Char(80);
                DATOS_OUPUT[IDX_DATOS_OUPUT.LO_TXTLOG] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_TXTLOG)), 200);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}     02 DATOS_IO">
                class IDX_DATOS_IO {

                    static final int LK_AIRFACT = 0;
                    static final int LK_AIRFACTLT = 1;
                    static final int LK_AIRENDO = 2;
                    static final int LK_AIRENDOLT = 3;
                    static final int LK_MDA_ATBP = 4;
                    static final int LO_SUBPAR_CD = 5;
                    static final int LO_ACH = 6;
                    static final int LO_TRF = 7;
                    static final int LO_COEF_SRP = 8;
                    static final int LO_COEF_MPA = 9;
                    static final int LO_COEF_ACH = 10;
                    static final int LO_COEF_TRF = 11;
                    static final int LK_SECTOR_ORG = 12;
                    static final int LK_SECTOR_DST = 13;
                    static final int LO_ACU_BASE = 14;
                    static final int LK_ATBP_TC = 15;
                    static final int LO_Q_ATBP = 16;
                    static final int LO_Q_SYST = 17;
                    static final int LK_IT = 18;
                    static final int LK_CTYVTA = 19;
                    static final int LK_COUVTA = 20;
                    static final int LK_CTYEMI = 21;
                    static final int LK_COUEMI = 22;
                    static final int LK_FRMTYP = 23;
                    static final int LK_TKTTYP = 24;
                    static final int LO_FBTYP = 25;
                    static final int LO_FBUSE = 26;
                    static final int LO_SCMM = 27;
                    static final int LO_PRVPB = 28;
                    static final int LO_PRVPB_CUR = 29;
                    static final int LO_PRVPB_TC = 30;
                    static final int LO_ACUPB = 31;
                    static final int LO_ACUPB_CUR = 32;
                    static final int LO_ACUDSC = 33;
                    static final int LO_ACUFIM = 34;
                    static final int LO_BRKF_R006 = 35;
                    static final int LO_BRKQ_R006 = 36;
                    static final int LO_IGSA_R006 = 37;
                    static final int LO_GSA_R006 = 38;
                    static final int LO_ICARG_R006 = 39;
                    static final int LO_VCARG_R006 = 40;
                    static final int LO_MCARG_R006 = 41;
                    static final int LO_PCARG_R006 = 42;
                    static final int LO_CCARG_R006 = 43;
                    static final int LK_TIPO_PROC = 44;
                    static final int LO_BOLETO = 45;
                    static final int LO_CODPRT = 46;
                    static final int LO_Q_IN = 47;
                    static final int LO_Q_OUT = 48;
                    static final int LO_Q_MTH = 49;
                    static final int LO_Q_AJUS = 50;
                    static final int LK_TAJUSTE_Q = 51;
                    static final int LK_COMMIS = 52;
                    static final int LK_MDACOMM = 53;
                    static final int LO_PRRCOMM = 54;
                }

                AS400DataType[] DATOS_IO = new AS400DataType[55];
                DATOS_IO[IDX_DATOS_IO.LK_AIRFACT] = mapping.Char(3);
                DATOS_IO[IDX_DATOS_IO.LK_AIRFACTLT] = mapping.Char(2);
                DATOS_IO[IDX_DATOS_IO.LK_AIRENDO] = mapping.Char(3);
                DATOS_IO[IDX_DATOS_IO.LK_AIRENDOLT] = mapping.Char(2);
                DATOS_IO[IDX_DATOS_IO.LK_MDA_ATBP] = mapping.Char(3);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_SUBPAR_CD">
                AS400DataType[] LO_SUBPAR_CD = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_SUBPAR_CD">
                class IDX_LK_SUBPAR_CD {

                    static final int LK_SUBPAR_CD = 0;
                }
                LO_SUBPAR_CD[IDX_LK_SUBPAR_CD.LK_SUBPAR_CD] = mapping.Char(2);
                DATOS_IO[IDX_DATOS_IO.LO_SUBPAR_CD] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_SUBPAR_CD)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_ACH">
                AS400DataType[] LO_ACH = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_ACH">
                class IDX_LK_ACH {

                    static final int LK_ACH = 0;
                }
                LO_ACH[IDX_LK_ACH.LK_ACH] = mapping.Numeric(8, 2, true);
                DATOS_IO[IDX_DATOS_IO.LO_ACH] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_ACH)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_TRF">
                AS400DataType[] LO_TRF = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_TRF">
                class IDX_LK_TRF {

                    static final int LK_TRF = 0;
                }
                LO_TRF[IDX_LK_TRF.LK_TRF] = mapping.Numeric(8, 2, true);
                DATOS_IO[IDX_DATOS_IO.LO_TRF] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_TRF)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_COEF_SRP">
                AS400DataType[] LO_COEF_SRP = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_COEF_SRP">
                class IDX_LK_COEF_SRP {

                    static final int LK_COEF_SRP = 0;
                }
                LO_COEF_SRP[IDX_LK_COEF_SRP.LK_COEF_SRP] = mapping.Numeric(4, 2, true);
                DATOS_IO[IDX_DATOS_IO.LO_COEF_SRP] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_COEF_SRP)), 40);
                //</editor-fold>
                //LO_COEF_SRP[IDX_LK_COEF_SRP.LK_COEF_SRP] = mapping.Numeric(1, 5, true);
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_COEF_MPA">
                AS400DataType[] LO_COEF_MPA = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_COEF_MPA">
                class IDX_LK_COEF_MPA {

                    static final int LK_COEF_MPA = 0;
                }
                LO_COEF_MPA[IDX_LK_COEF_MPA.LK_COEF_MPA] = mapping.Numeric(4, 2, true);
                DATOS_IO[IDX_DATOS_IO.LO_COEF_MPA] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_COEF_MPA)), 40);
                //</editor-fold>
                //LO_COEF_MPA[IDX_LK_COEF_MPA.LK_COEF_MPA] = mapping.Numeric(1, 5, true);
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_COEF_ACH">
                AS400DataType[] LO_COEF_ACH = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_COEF_ACH">
                class IDX_LK_COEF_ACH {

                    static final int LK_COEF_ACH = 0;
                }
                LO_COEF_ACH[IDX_LK_COEF_ACH.LK_COEF_ACH] = mapping.Numeric(4, 2, true);
                DATOS_IO[IDX_DATOS_IO.LO_COEF_ACH] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_COEF_ACH)), 40);
                //</editor-fold>
                //LO_COEF_ACH[IDX_LK_COEF_ACH.LK_COEF_ACH] = mapping.Numeric(1, 5, true);
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_COEF_TRF">
                AS400DataType[] LO_COEF_TRF = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_COEF_TRF">
                class IDX_LK_COEF_TRF {

                    static final int LK_COEF_TRF = 0;
                }
                LO_COEF_TRF[IDX_LK_COEF_TRF.LK_COEF_TRF] = mapping.Numeric(4, 2, true);
                DATOS_IO[IDX_DATOS_IO.LO_COEF_TRF] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_COEF_TRF)), 40);
                //</editor-fold>
                //LO_COEF_TRF[IDX_LK_COEF_TRF.LK_COEF_TRF] = mapping.Numeric(1, 5, true);
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_ACU_BASE">
                AS400DataType[] LO_ACU_BASE = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_ACU_BASE">
                class IDX_LK_ACU_BASE {

                    static final int LK_ACU_BASE = 0;
                }
                LO_ACU_BASE[IDX_LK_ACU_BASE.LK_ACU_BASE] = mapping.Char(4);
                DATOS_IO[IDX_DATOS_IO.LO_ACU_BASE] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_ACU_BASE)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_Q_ATBP">
                AS400DataType[] LO_Q_ATBP = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_Q_ATBP">
                class IDX_LK_Q_ATBP {

                    static final int LK_Q_ATBP = 0;
                }
                LO_Q_ATBP[IDX_LK_Q_ATBP.LK_Q_ATBP] = mapping.Numeric(8, 2, true);
                DATOS_IO[IDX_DATOS_IO.LO_Q_ATBP] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_Q_ATBP)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_Q_SYST">
                AS400DataType[] LO_Q_SYST = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_Q_SYST">
                class IDX_LK_Q_SYST {

                    static final int LK_Q_SYST = 0;
                }
                LO_Q_SYST[IDX_LK_Q_SYST.LK_Q_SYST] = mapping.Numeric(8, 2, true);
                DATOS_IO[IDX_DATOS_IO.LO_Q_SYST] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_Q_SYST)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_FBTYP">
                AS400DataType[] LO_FBTYP = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_FBTYP">
                class IDX_LK_FBTYP {

                    static final int LK_FBTYP = 0;
                }
                LO_FBTYP[IDX_LK_FBTYP.LK_FBTYP] = mapping.Char(2);
                DATOS_IO[IDX_DATOS_IO.LO_FBTYP] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_FBTYP)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_FBUSE">
                AS400DataType[] LO_FBUSE = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_FBUSE">
                class IDX_LK_FBUSE {

                    static final int LK_FBUSE = 0;
                }
                LO_FBUSE[IDX_LK_FBUSE.LK_FBUSE] = mapping.Char(2);
                DATOS_IO[IDX_DATOS_IO.LO_FBUSE] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_FBUSE)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_SCMM">
                AS400DataType[] LO_SCMM = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_SCMM">
                class IDX_LK_SCMM {

                    static final int LK_SCMM = 0;
                }
                LO_SCMM[IDX_LK_SCMM.LK_SCMM] = mapping.Numeric(3, 2, true);
                DATOS_IO[IDX_DATOS_IO.LO_SCMM] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_SCMM)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_PRVPB">
                AS400DataType[] LO_PRVPB = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_PRVPB">
                class IDX_LK_PRVPB {

                    static final int LK_PRVPB = 0;
                }
                LO_PRVPB[IDX_LK_PRVPB.LK_PRVPB] = mapping.Numeric(8, 2, true);
                DATOS_IO[IDX_DATOS_IO.LO_PRVPB] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_PRVPB)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_PRVPB_CUR">
                AS400DataType[] LO_PRVPB_CUR = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_PRVPB_CUR">
                class IDX_LK_PRVPB_CUR {

                    static final int LK_PRVPB_CUR = 0;
                }
                LO_PRVPB_CUR[IDX_LK_PRVPB_CUR.LK_PRVPB_CUR] = mapping.Char(3);
                DATOS_IO[IDX_DATOS_IO.LO_PRVPB_CUR] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_PRVPB_CUR)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_PRVPB_TC">
                AS400DataType[] LO_PRVPB_TC = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_PRVPB_TC">
                class IDX_LK_PRVPB_TC {

                    static final int LK_PRVPB_TC = 0;
                }
                LO_PRVPB_TC[IDX_LK_PRVPB_TC.LK_PRVPB_TC] = mapping.Numeric(7, 5, true);
                DATOS_IO[IDX_DATOS_IO.LO_PRVPB_TC] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_PRVPB_TC)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_ACUPB">
                AS400DataType[] LO_ACUPB = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_ACUPB">
                class IDX_LK_ACUPB {

                    static final int LK_ACUPB = 0;
                }
                LO_ACUPB[IDX_LK_ACUPB.LK_ACUPB] = mapping.Numeric(8, 2, true);
                DATOS_IO[IDX_DATOS_IO.LO_ACUPB] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_ACUPB)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_ACUPB_CUR">
                AS400DataType[] LO_ACUPB_CUR = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_ACUPB_CUR">
                class IDX_LK_ACUPB_CUR {

                    static final int LK_ACUPB_CUR = 0;
                }
                LO_ACUPB_CUR[IDX_LK_ACUPB_CUR.LK_ACUPB_CUR] = mapping.Char(3);
                DATOS_IO[IDX_DATOS_IO.LO_ACUPB_CUR] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_ACUPB_CUR)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_ACUDSC">
                AS400DataType[] LO_ACUDSC = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_ACUDSC">
                class IDX_LK_ACUDSC {

                    static final int LK_ACUDSC = 0;
                }
                LO_ACUDSC[IDX_LK_ACUDSC.LK_ACUDSC] = mapping.Numeric(3, 2, true);
                DATOS_IO[IDX_DATOS_IO.LO_ACUDSC] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_ACUDSC)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_ACUFIM">
                AS400DataType[] LO_ACUFIM = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_ACUFIM">
                class IDX_LK_ACUFIM {

                    static final int LK_ACUFIM = 0;
                }
                LO_ACUFIM[IDX_LK_ACUFIM.LK_ACUFIM] = mapping.Char(1);
                DATOS_IO[IDX_DATOS_IO.LO_ACUFIM] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_ACUFIM)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_BRKF_R006">
                AS400DataType[] LO_BRKF_R006 = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_BRKF_R006">
                class IDX_LK_BRKF_R006 {

                    static final int LK_BRKF_R006 = 0;
                }
                LO_BRKF_R006[IDX_LK_BRKF_R006.LK_BRKF_R006] = mapping.Char(1);
                DATOS_IO[IDX_DATOS_IO.LO_BRKF_R006] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_BRKF_R006)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_BRKQ_R006">
                AS400DataType[] LO_BRKQ_R006 = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_BRKQ_R006">
                class IDX_LK_BRKQ_R006 {

                    static final int LK_BRKQ_R006 = 0;
                }
                LO_BRKQ_R006[IDX_LK_BRKQ_R006.LK_BRKQ_R006] = mapping.Char(1);
                DATOS_IO[IDX_DATOS_IO.LO_BRKQ_R006] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_BRKQ_R006)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_IGSA_R006">
                AS400DataType[] LO_IGSA_R006 = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_IGSA_R006">
                class IDX_LK_IGSA_R006 {

                    static final int LK_IGSA_R006 = 0;
                }
                LO_IGSA_R006[IDX_LK_IGSA_R006.LK_IGSA_R006] = mapping.Char(1);
                DATOS_IO[IDX_DATOS_IO.LO_IGSA_R006] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_IGSA_R006)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_GSA_R006">
                AS400DataType[] LO_GSA_R006 = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_GSA_R006">
                class IDX_LK_GSA_R006 {

                    static final int LK_GSA_R006 = 0;
                }
                LO_GSA_R006[IDX_LK_GSA_R006.LK_GSA_R006] = mapping.Numeric(3, 2, true);
                DATOS_IO[IDX_DATOS_IO.LO_GSA_R006] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_GSA_R006)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_ICARG_R006">
                AS400DataType[] LO_ICARG_R006 = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_ICARG_R006">
                class IDX_LK_ICARG_R006 {

                    static final int LK_ICARG_R006 = 0;
                }
                LO_ICARG_R006[IDX_LK_ICARG_R006.LK_ICARG_R006] = mapping.Char(1);
                DATOS_IO[IDX_DATOS_IO.LO_ICARG_R006] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_ICARG_R006)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_VCARG_R006">
                AS400DataType[] LO_VCARG_R006 = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_VCARG_R006">
                class IDX_LK_VCARG_R006 {

                    static final int LK_VCARG_R006 = 0;
                }
                LO_VCARG_R006[IDX_LK_VCARG_R006.LK_VCARG_R006] = mapping.Numeric(8, 2, true);
                DATOS_IO[IDX_DATOS_IO.LO_VCARG_R006] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_VCARG_R006)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_MCARG_R006">
                AS400DataType[] LO_MCARG_R006 = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_MCARG_R006">
                class IDX_LK_MCARG_R006 {

                    static final int LK_MCARG_R006 = 0;
                }
                LO_MCARG_R006[IDX_LK_MCARG_R006.LK_MCARG_R006] = mapping.Char(3);
                DATOS_IO[IDX_DATOS_IO.LO_MCARG_R006] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_MCARG_R006)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_PCARG_R006">
                AS400DataType[] LO_PCARG_R006 = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_PCARG_R006">
                class IDX_LK_PCARG_R006 {

                    static final int LK_PCARG_R006 = 0;
                }
                LO_PCARG_R006[IDX_LK_PCARG_R006.LK_PCARG_R006] = mapping.Numeric(3, 2, true);
                DATOS_IO[IDX_DATOS_IO.LO_PCARG_R006] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_PCARG_R006)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_CCARG_R006">
                AS400DataType[] LO_CCARG_R006 = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_CCARG_R006">
                class IDX_LK_CCARG_R006 {

                    static final int LK_CCARG_R006 = 0;
                }
                LO_CCARG_R006[IDX_LK_CCARG_R006.LK_CCARG_R006] = mapping.Char(2);
                DATOS_IO[IDX_DATOS_IO.LO_CCARG_R006] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_CCARG_R006)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_BOLETO">
                AS400DataType[] LO_BOLETO = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_BOLETO">
                class IDX_LK_BOLETO {

                    static final int LK_BOLETO = 0;
                }
                LO_BOLETO[IDX_LK_BOLETO.LK_BOLETO] = mapping.Char(14);
                DATOS_IO[IDX_DATOS_IO.LO_BOLETO] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_BOLETO)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_CODPRT">
                AS400DataType[] LO_CODPRT = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_CODPRT">
                class IDX_LK_CODPRT {

                    static final int LK_CODPRT = 0;
                }
                LO_CODPRT[IDX_LK_CODPRT.LK_CODPRT] = mapping.Char(6);
                DATOS_IO[IDX_DATOS_IO.LO_CODPRT] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_CODPRT)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_Q_IN">
                AS400DataType[] LO_Q_IN = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_Q_IN">
                class IDX_LK_Q_IN {

                    static final int LK_Q_IN = 0;
                }
                LO_Q_IN[IDX_LK_Q_IN.LK_Q_IN] = mapping.Numeric(8, 2, true);
                DATOS_IO[IDX_DATOS_IO.LO_Q_IN] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_Q_IN)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_Q_OUT">
                AS400DataType[] LO_Q_OUT = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_Q_OUT">
                class IDX_LK_Q_OUT {

                    static final int LK_Q_OUT = 0;
                }
                LO_Q_OUT[IDX_LK_Q_OUT.LK_Q_OUT] = mapping.Numeric(8, 2, true);
                DATOS_IO[IDX_DATOS_IO.LO_Q_OUT] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_Q_OUT)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_Q_MTH">
                AS400DataType[] LO_Q_MTH = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_Q_MTH">
                class IDX_LK_Q_MTH {

                    static final int LK_Q_MTH = 0;
                }
                LO_Q_MTH[IDX_LK_Q_MTH.LK_Q_MTH] = mapping.Char(3);
                DATOS_IO[IDX_DATOS_IO.LO_Q_MTH] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_Q_MTH)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_Q_AJUS">
                AS400DataType[] LO_Q_AJUS = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_Q_AJUS">
                class IDX_LK_Q_AJUS {

                    static final int LK_Q_AJUS = 0;
                }
                LO_Q_AJUS[IDX_LK_Q_AJUS.LK_Q_AJUS] = mapping.Numeric(8, 2, true);
                DATOS_IO[IDX_DATOS_IO.LO_Q_AJUS] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_Q_AJUS)), 40);
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}         03 LO_PRRCOMM">
                AS400DataType[] LO_PRRCOMM = new AS400DataType[1];
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="{...}             04 LK_PRRCOMM">
                class IDX_LK_PRRCOMM {

                    static final int LK_PRRCOMM = 0;
                }
                LO_PRRCOMM[IDX_LK_PRRCOMM.LK_PRRCOMM] = mapping.Numeric(8, 2, true);
                DATOS_IO[IDX_DATOS_IO.LO_PRRCOMM] = mapping.Occurs(mapping.Char(mapping.GetDimension(LO_PRRCOMM)), 40);
                //</editor-fold>

                //DATOS_INPUT: Faltantes
                DATOS_INPUT[IDX_DATOS_INPUT.VALIDO_PARA_VIAJAR_INPUT] = mapping.Char(mapping.GetDimension(VALIDO_PARA_VIAJAR_INPUT));//mapping.Char(139);

                //DATOS_OUTPUT: Faltantes
                DATOS_OUPUT[IDX_DATOS_OUPUT.LK_INDSRP] = mapping.Char(1);
                DATOS_OUPUT[IDX_DATOS_OUPUT.LK_TVALOR_SYST] = mapping.Numeric(11, 2, true);
                DATOS_OUPUT[IDX_DATOS_OUPUT.LK_TAJUSTE_SYST] = mapping.Numeric(11, 2, true);
                DATOS_OUPUT[IDX_DATOS_OUPUT.LK_TVALOR] = mapping.Numeric(11, 2, true);
                DATOS_OUPUT[IDX_DATOS_OUPUT.LK_TAJUSTE] = mapping.Numeric(11, 2, true);
                DATOS_OUPUT[IDX_DATOS_OUPUT.LK_ESTADO] = mapping.Char(1);
                DATOS_OUPUT[IDX_DATOS_OUPUT.LK_CODERROR] = mapping.Char(6);
                DATOS_OUPUT[IDX_DATOS_OUPUT.LK_MSJERROR] = mapping.Char(80);

                //DATOS_IO: Faltantes
                DATOS_IO[IDX_DATOS_IO.LK_SECTOR_ORG] = mapping.Char(3);
                DATOS_IO[IDX_DATOS_IO.LK_SECTOR_DST] = mapping.Char(3);
                DATOS_IO[IDX_DATOS_IO.LK_ATBP_TC] = mapping.Numeric(7, 6, true);
                DATOS_IO[IDX_DATOS_IO.LK_IT] = mapping.Char(20);
                DATOS_IO[IDX_DATOS_IO.LK_CTYVTA] = mapping.Char(3);
                DATOS_IO[IDX_DATOS_IO.LK_COUVTA] = mapping.Char(2);
                DATOS_IO[IDX_DATOS_IO.LK_CTYEMI] = mapping.Char(3);
                DATOS_IO[IDX_DATOS_IO.LK_COUEMI] = mapping.Char(2);
                DATOS_IO[IDX_DATOS_IO.LK_FRMTYP] = mapping.Char(3);
                DATOS_IO[IDX_DATOS_IO.LK_TKTTYP] = mapping.Char(3);
                DATOS_IO[IDX_DATOS_IO.LK_TIPO_PROC] = mapping.Char(4);
                DATOS_IO[IDX_DATOS_IO.LK_TAJUSTE_Q] = mapping.Numeric(11, 2, true);
                DATOS_IO[IDX_DATOS_IO.LK_COMMIS] = mapping.Numeric(11, 2, true);
                DATOS_IO[IDX_DATOS_IO.LK_MDACOMM] = mapping.Char(3);

                RECEIVING_DATA[0] = mapping.Char(mapping.GetDimension(LK_PROGRAM));
                RECEIVING_DATA[1] = mapping.Char(mapping.GetDimension(LK_BATCH));
                RECEIVING_DATA[2] = mapping.Char(mapping.GetDimension(LK_MOSTRAR_SCR));
                RECEIVING_DATA[3] = mapping.Char(mapping.GetDimension(LK_CREA_LOG));
                RECEIVING_DATA[4] = mapping.Char(mapping.GetDimension(DATOS_INPUT));
                RECEIVING_DATA[5] = mapping.Char(mapping.GetDimension(DATOS_OUPUT));
                RECEIVING_DATA[6] = mapping.Char(mapping.GetDimension(DATOS_IO));
                //</editor-fold>

                //<editor-fold defaultstate="collapsed" desc="{...} Structure">
                AS400Structure structure = new AS400Structure(RECEIVING_DATA);

                int dim = mapping.GetDimension(LK_PROGRAM)
                        + mapping.GetDimension(LK_BATCH)
                        + mapping.GetDimension(LK_MOSTRAR_SCR)
                        + mapping.GetDimension(LK_CREA_LOG)
                        + mapping.GetDimension(DATOS_INPUT)
                        + mapping.GetDimension(DATOS_OUPUT)
                        + mapping.GetDimension(DATOS_IO) + 1;

                AS400Structure structure01 = new AS400Structure(LK_PROGRAM);
                AS400Structure structure02 = new AS400Structure(LK_BATCH);
                AS400Structure structure03 = new AS400Structure(LK_MOSTRAR_SCR);
                AS400Structure structure04 = new AS400Structure(LK_CREA_LOG);
                AS400Structure structure05 = new AS400Structure(DATOS_INPUT);
                AS400Structure structure06 = new AS400Structure(DATOS_OUPUT);
                AS400Structure structure07 = new AS400Structure(DATOS_IO);

                AS400Structure structure08 = new AS400Structure(LO_RUTING);
                AS400Structure structure09 = new AS400Structure(LO_BOLETO);
                AS400Structure structure10 = new AS400Structure(LO_XO);
                AS400Structure structure11 = new AS400Structure(LO_TRANSP);
                AS400Structure structure12 = new AS400Structure(LO_NVLO);
                AS400Structure structure13 = new AS400Structure(LO_FVLO);
                AS400Structure structure14 = new AS400Structure(LO_RBD);
                AS400Structure structure15 = new AS400Structure(LO_CLASE);
                AS400Structure structure16 = new AS400Structure(LO_BASE);
                AS400Structure structure17 = new AS400Structure(LO_TBASE);
                AS400Structure structure18 = new AS400Structure(LO_SBTBASE);
                AS400Structure structure19 = new AS400Structure(LO_TDESC);
                AS400Structure structure20 = new AS400Structure(LO_PDESC);
                AS400Structure structure21 = new AS400Structure(LO_BREAK);
                AS400Structure structure22 = new AS400Structure(LO_INDST);
                AS400Structure structure23 = new AS400Structure(LO_Q);
                AS400Structure structure24 = new AS400Structure(LO_SRP);
                AS400Structure structure25 = new AS400Structure(LO_MPA);
                AS400Structure structure26 = new AS400Structure(LO_ACU_O);
                AS400Structure structure27 = new AS400Structure(LO_ACU_CD);
                AS400Structure structure28 = new AS400Structure(LO_ISC);
                AS400Structure structure29 = new AS400Structure(LO_VALOR);
                AS400Structure structure30 = new AS400Structure(LO_AJUSTE);
                AS400Structure structure31 = new AS400Structure(LO_Q_OUT);
                AS400Structure structure32 = new AS400Structure(LO_FACTOR);
                AS400Structure structure33 = new AS400Structure(LO_PPROVI);
                AS400Structure structure34 = new AS400Structure(LO_PROVIS);
                AS400Structure structure35 = new AS400Structure(LO_PRRCOMM);
                AS400Structure structure36 = new AS400Structure(LO_INDPR);
                AS400Structure structure37 = new AS400Structure(LO_TXTLOG);
                AS400Structure structure38 = new AS400Structure(LO_VIA);
                AS400Structure structure39 = new AS400Structure(LO_DIFL);
                AS400Structure structure40 = new AS400Structure(LO_INDIF);
                AS400Structure structure41 = new AS400Structure(LO_TFM_I);
                AS400Structure structure42 = new AS400Structure(LO_TFM_MDA);
                AS400Structure structure43 = new AS400Structure(LO_ACU_I);
                AS400Structure structure44 = new AS400Structure(LO_Q_IN);
                AS400Structure structure45 = new AS400Structure(LO_YANQUI);
                //</editor-fold>

                //<editor-fold defaultstate="collapsed" desc="{...} Calcular CiaLit">
                cnx = session.getCNXIBMDB2().getIBMDB2Connection();
                String CiaLit = "";
                String IssuedBy = "";
                strSQL = "SELECT A005KEY1, A005KEY2, A005KEY3 FROM " + session.getMainLibrary() + ".A005 WHERE A005KEY = '" + beanProrate.LK_CIA + "'";
                stmt = cnx.prepareStatement(strSQL);
                stmt.execute();
                rst = stmt.getResultSet();
                if (rst.next()) {
                    if (rst.getString("A005KEY3").trim().isEmpty()) {
                        IssuedBy = rst.getString("A005KEY2").trim();
                    } else {
                        IssuedBy = rst.getString("A005KEY3").trim();
                    }
                    CiaLit = rst.getString("A005KEY1").trim();
                }
                try {
                    rst.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
                rst = null;
                //</editor-fold>

                ProgramParameter[] parameterList = new ProgramParameter[2];
                /*StringBuffer sb = new StringBuffer(39991);
                 for ( int i=0;i < 39991;i++) {
                 sb.append("0");
                 }*/
                //<editor-fold defaultstate="collapsed" desc="{...} Trama">
                String trama = "";
                trama = "RUT1050WEBSNN"
                        + StringUtils.rightPad(beanProrate.LK_METODO, 3)
                        + StringUtils.rightPad(beanProrate.LK_BASE_DOM, 1)
                        + StringUtils.rightPad(beanProrate.LK_BASE_INT, 1)
                        + StringUtils.rightPad(beanProrate.LK_TIPO_AJUSTE, 1)
                        + StringUtils.rightPad(CiaLit, 3)
                        + StringUtils.rightPad(beanProrate.LK_CIA, 3)
                        + StringUtils.rightPad(beanProrate.LK_FORMA, 4)
                        + StringUtils.rightPad(beanProrate.LK_SERIE, 6)
                        + StringUtils.rightPad(beanProrate.LK_CUPON, 1)
                        + StringUtils.rightPad(beanProrate.LK_REGI_MDA, 3)
                        + StringUtils.rightPad(beanProrate.LK_TUSO, 2)
                        + StringUtils.rightPad(beanProrate.LK_FUSO, 8)
                        + StringUtils.rightPad(beanProrate.LK_FVIAJE, 8)
                        + StringUtils.rightPad(beanProrate.LK_FVENTA, 8)
                        + StringUtils.rightPad(beanProrate.LK_TVENTA, 1)
                        + StringUtils.rightPad(beanProrate.LK_FFACTU, 8)
                        + StringUtils.rightPad(beanProrate.LK_FARE_MDA, 3)
                        + beanProrate.LK_FARE
                        + StringUtils.rightPad(beanProrate.LK_EQV_MDA, 3)
                        + beanProrate.LK_EQV_FARE
                        + beanProrate.LK_EQV_TC
                        + StringUtils.rightPad(beanProrate.LK_SAMPLIG, 1)
                        + beanProrate.LK_NUC
                        + StringUtils.rightPad(beanProrate.LK_NUC_MDA, 3)
                        + beanProrate.LK_ROE
                        + StringUtils.rightPad(beanProrate.LK_IPLUS, 1)
                        + beanProrate.LK_TPLUS
                        + beanProrate.LK_QSTOPOVER
                        + beanProrate.LK_TSTOPOVER
                        + StringUtils.rightPad(beanProrate.LK_EXCHANGE, 1)
                        + StringUtils.rightPad(beanProrate.LK_CAMBIO_RUT, 1)
                        + StringUtils.rightPad(beanProrate.LK_ORIGEN, 3)
                        + beanProrate.LO_SL
                        + StringUtils.rightPad(beanProrate.LO_XO, 40)
                        + StringUtils.rightPad(beanProrate.LO_M, 40)
                        + StringUtils.rightPad(beanProrate.LO_AFTER, 320)
                        + StringUtils.rightPad(beanProrate.LO_BEFOR, 320)
                        + StringUtils.rightPad(beanProrate.LO_RUTING, 123)
                        + StringUtils.rightPad(beanProrate.LO_AIRLONG, 120)
                        + StringUtils.rightPad(beanProrate.LO_TRANSP, 80)
                        + StringUtils.rightPad(beanProrate.LO_VIA, 80)
                        + StringUtils.rightPad(beanProrate.LO_BASE, 600)
                        + StringUtils.rightPad(beanProrate.LO_TBASE, 40)
                        + StringUtils.rightPad(beanProrate.LO_SBTBASE, 80)
                        + StringUtils.rightPad(beanProrate.LO_CLASE, 40)
                        + StringUtils.rightPad(beanProrate.LO_RBD, 40)
                        + StringUtils.rightPad(beanProrate.LO_TEMPOR, 40)
                        + StringUtils.rightPad(beanProrate.LO_NVLO, 200)
                        + StringUtils.rightPad(beanProrate.LO_FVLO, 320)
                        + StringUtils.rightPad(beanProrate.LO_TDESC, 80)
                        + Util.fillZeros2(200, beanProrate.LO_PDESC)
                        + Util.fillZeros2(400, beanProrate.LO_BREAK)
                        + StringUtils.rightPad(beanProrate.LO_INDST, 40)
                        + Util.fillZeros2(400, beanProrate.LO_PLUS)
                        + Util.fillZeros2(400, beanProrate.LO_Q)
                        + Util.fillZeros2(400, beanProrate.LO_DIFL)
                        + StringUtils.rightPad(beanProrate.LO_INDIF, 40)
                        + StringUtils.rightPad(beanProrate.LO_ACU_MDA, 120)
                        + Util.fillZeros2(400, beanProrate.LO_ACU_I)
                        + StringUtils.rightPad(beanProrate.LO_TFM_MDA, 120)
                        + Util.fillZeros2(400, beanProrate.LO_TFM_I)
                        + StringUtils.rightPad(beanProrate.LO_RUT_V, 15)
                        + StringUtils.rightPad(beanProrate.LO_TRN_V, 8)
                        + StringUtils.rightPad(beanProrate.LO_BAS_V, 60)
                        + StringUtils.rightPad(beanProrate.LO_RBD_V, 4)
                        + StringUtils.rightPad(beanProrate.LO_VLO_V, 20)
                        + StringUtils.rightPad(beanProrate.LO_FVL_V, 32)
                        + beanProrate.LK_REGI_TC
                        + StringUtils.rightPad(beanProrate.LK_SYST_MDA, 3)
                        + StringUtils.rightPad(beanProrate.LK_SYST_TC, 13)
                        + Util.fillZeros2(400, beanProrate.LO_FACTOR)
                        + Util.fillZeros2(400, beanProrate.LO_PROVIS)
                        + Util.fillZeros2(200, beanProrate.LO_PPROVI)
                        + StringUtils.rightPad(beanProrate.LO_SUBPAR, 800)
                        + Util.fillZeros2(400, beanProrate.LO_TARIFA)
                        + Util.fillZeros2(400, beanProrate.LO_YANQUI)
                        + Util.fillZeros2(400, beanProrate.LO_ACU_O)
                        + StringUtils.rightPad(beanProrate.LO_ACU_CD, 800)
                        + StringUtils.rightPad(beanProrate.LO_ACU_AUTO, 40)
                        + StringUtils.rightPad(beanProrate.LO_ACU_APLICA, 40)
                        + StringUtils.rightPad(beanProrate.LO_ACU_ERROR, 120)
                        + StringUtils.rightPad(beanProrate.LO_INDISC, 40)
                        + Util.fillZeros2(200, beanProrate.LO_ISC)
                        + StringUtils.rightPad(beanProrate.LK_INDSRP, 1)
                        + Util.fillZeros2(400, beanProrate.LO_SRP)
                        + Util.fillZeros2(400, beanProrate.LO_MPA)
                        + Util.fillZeros2(400, beanProrate.LO_SOVER)
                        + Util.fillZeros2(400, beanProrate.LO_FARE_ATBP)
                        + Util.fillZeros2(400, beanProrate.LO_FARE_SYST)
                        + Util.fillZeros2(240, beanProrate.LO_COEF)
                        + beanProrate.LK_TVALOR_SYST
                        + Util.fillZeros2(400, beanProrate.LO_VALOR_SYST)
                        + beanProrate.LK_TAJUSTE_SYST
                        + Util.fillZeros2(400, beanProrate.LO_AJUSTE_SYST)
                        + beanProrate.LK_TVALOR
                        + Util.fillZeros2(400, beanProrate.LO_VALOR)
                        + StringUtils.rightPad(beanProrate.LO_INDPR, 40)
                        + beanProrate.LK_TAJUSTE
                        + Util.fillZeros2(400, beanProrate.LO_AJUSTE)
                        + StringUtils.rightPad(beanProrate.LK_ESTADO, 1)
                        + StringUtils.rightPad(beanProrate.LK_CODERROR, 6)
                        + StringUtils.rightPad(beanProrate.LK_MSJERROR, 80)
                        + StringUtils.rightPad(beanProrate.LO_CODLOG, 1200)
                        + StringUtils.rightPad(beanProrate.LO_TXTLOG, 16000)
                        + StringUtils.rightPad(beanProrate.LK_AIRFACT, 3)
                        + StringUtils.rightPad(beanProrate.LK_AIRFACTLT, 2)
                        + StringUtils.rightPad(beanProrate.LK_AIRENDO, 3)
                        + StringUtils.rightPad(beanProrate.LK_AIRENDOLT, 2)
                        + StringUtils.rightPad(beanProrate.LK_MDA_ATBP, 3)
                        + StringUtils.rightPad(beanProrate.LO_SUBPAR_CD, 80)
                        + Util.fillZeros2(400, beanProrate.LO_ACH)
                        + Util.fillZeros2(400, beanProrate.LO_TRF)
                        + Util.fillZeros2(240, beanProrate.LO_COEF_SRP)
                        + Util.fillZeros2(240, beanProrate.LO_COEF_MPA)
                        + Util.fillZeros2(240, beanProrate.LO_COEF_ACH)
                        + Util.fillZeros2(240, beanProrate.LO_COEF_TRF)
                        + StringUtils.rightPad(beanProrate.LK_SECTOR_ORG, 3)
                        + StringUtils.rightPad(beanProrate.LK_SECTOR_DST, 3)
                        + StringUtils.rightPad(beanProrate.LO_ACU_BASE, 160)
                        + beanProrate.LK_ATBP_TC
                        + Util.fillZeros2(400, beanProrate.LO_Q_ATBP)
                        + Util.fillZeros2(400, beanProrate.LO_Q_SYST)
                        + StringUtils.rightPad(beanProrate.LK_IT, 20)
                        + StringUtils.rightPad(beanProrate.LK_CTYVTA, 3)
                        + StringUtils.rightPad(beanProrate.LK_COUVTA, 2)
                        + StringUtils.rightPad(beanProrate.LK_CTYEMI, 3)
                        + StringUtils.rightPad(beanProrate.LK_COUEMI, 2)
                        + StringUtils.rightPad(beanProrate.LK_FRMTYP, 3)
                        + StringUtils.rightPad(beanProrate.LK_TKTTYP, 3)
                        + StringUtils.rightPad(beanProrate.LO_FBTYP, 80)
                        + StringUtils.rightPad(beanProrate.LO_FBUSE, 80)
                        + Util.fillZeros2(200, beanProrate.LO_SCMM)
                        + Util.fillZeros2(400, beanProrate.LO_PRVPB)
                        + StringUtils.rightPad(beanProrate.LO_PRVPB_CUR, 120)
                        + Util.fillZeros2(480, beanProrate.LO_PRVPB_TC)
                        + Util.fillZeros2(400, beanProrate.LO_ACUPB)
                        + StringUtils.rightPad(beanProrate.LO_ACUPB_CUR, 120)
                        + Util.fillZeros2(200, beanProrate.LO_ACUDSC)
                        + StringUtils.rightPad(beanProrate.LO_ACUFIM, 40)
                        + StringUtils.rightPad(beanProrate.LO_BRKF_R006, 40)
                        + StringUtils.rightPad(beanProrate.LO_BRKQ_R006, 40)
                        + StringUtils.rightPad(beanProrate.LO_IGSA_R006, 40)
                        + Util.fillZeros2(200, beanProrate.LO_GSA_R006)
                        + StringUtils.rightPad(beanProrate.LO_ICARG_R006, 40)
                        + Util.fillZeros2(400, beanProrate.LO_VCARG_R006)
                        + StringUtils.rightPad(beanProrate.LO_MCARG_R006, 120)
                        + Util.fillZeros2(200, beanProrate.LO_PCARG_R006)
                        + StringUtils.rightPad(beanProrate.LO_CCARG_R006, 80)
                        + StringUtils.rightPad(beanProrate.LK_TIPO_PROC, 4)
                        + StringUtils.rightPad(beanProrate.LO_BOLETO, 560)
                        + StringUtils.rightPad(beanProrate.LO_CODPRT, 240)
                        + Util.fillZeros2(400, beanProrate.LK_Q_IN)
                        + Util.fillZeros2(400, beanProrate.LK_Q_OUT)
                        + StringUtils.rightPad(beanProrate.LK_Q_MTH, 120)
                        + Util.fillZeros2(400, beanProrate.LK_Q_AJUS)
                        + beanProrate.LK_TAJUST_Q
                        + beanProrate.LK_COMMIS
                        + StringUtils.rightPad(beanProrate.LK_MDACOMM, 3)
                        + Util.fillZeros2(400, beanProrate.LK_PRRCOMM) + " ";
                //</editor-fold>

                parameterList[0] = new ProgramParameter(mapping.Char(dim).toBytes(trama));
                parameterList[1] = new ProgramParameter(dim);

                program.setProgram(programName, parameterList);

                if (program.run() != true) {
                    System.out.println("Program failed!");
                    AS400Message[] messagelist = program.getMessageList();
                    for (int i = 0; i < messagelist.length; ++i) {
                        //System.out.println(messagelist[i]);
                        objRtn = new A720();
                        objRtn.LK_ESTADO = "1";
                        objRtn.LK_CODERROR = "RUT1050";
                        objRtn.LK_MSJERROR = messagelist[i].toString();
                        lstProrate.add(objRtn);
                    }
                } else {
                    byte[] receiverVar = parameterList[1].getOutputData();

                    //<editor-fold defaultstate="collapsed" desc="{...} Load Trama">
                    Object[] N01_RECEIVING_DATA = (Object[]) structure.toObject(receiverVar, 0);
                    String N02_LK_PROGRAM = (String) ((Object[]) structure01.toObject(RECEIVING_DATA[0].toBytes(N01_RECEIVING_DATA[0]), 0))[0];
                    String N02_LK_BATCH = (String) ((Object[]) structure02.toObject(RECEIVING_DATA[1].toBytes(N01_RECEIVING_DATA[1]), 0))[0];
                    String N02_LK_MOSTRAR_SCR = (String) ((Object[]) structure03.toObject(RECEIVING_DATA[2].toBytes(N01_RECEIVING_DATA[2]), 0))[0];
                    String N02_LK_CREA_LOG = (String) ((Object[]) structure04.toObject(RECEIVING_DATA[3].toBytes(N01_RECEIVING_DATA[3]), 0))[0];
                    Object[] N02_DATOS_INPUT = (Object[]) structure05.toObject(RECEIVING_DATA[4].toBytes(N01_RECEIVING_DATA[4]), 0);
                    Object[] N02_DATOS_OUPUT = (Object[]) structure06.toObject(RECEIVING_DATA[5].toBytes(N01_RECEIVING_DATA[5]), 0);
                    Object[] N02_DATOS_IO = (Object[]) structure07.toObject(RECEIVING_DATA[6].toBytes(N01_RECEIVING_DATA[6]), 0);

                    Object[] N03_LO_TRANSP = (Object[]) ((Object[]) N02_DATOS_INPUT[IDX_DATOS_INPUT.LO_TRANSP]);
                    List<Object[]> N04_LO_TRANSP = new ArrayList<Object[]>(N03_LO_TRANSP.length);
                    for (int i = 0; i < N03_LO_TRANSP.length; i++) {
                        N04_LO_TRANSP.add((Object[]) structure11.toObject(mapping.Char(mapping.GetDimension(LO_TRANSP)).toBytes(N03_LO_TRANSP[i]), 0));
                        if ((N03_LO_TRANSP[i]).toString().trim().equals("")) {
                            i = N03_LO_TRANSP.length + 1;
                        }
                    }
                    Object[] N03_LO_RUTING = (Object[]) ((Object[]) N02_DATOS_INPUT[IDX_DATOS_INPUT.LO_RUTING]);
                    List<Object[]> N04_LO_RUTING = new ArrayList<Object[]>(N03_LO_RUTING.length);
                    for (int i = 0; i < N04_LO_TRANSP.size() + 1; i++) {
                        N04_LO_RUTING.add((Object[]) structure08.toObject(mapping.Char(mapping.GetDimension(LO_RUTING)).toBytes(N03_LO_RUTING[i]), 0));
                    }
                    Object[] N03_LO_BOLETO = (Object[]) ((Object[]) N02_DATOS_IO[IDX_DATOS_IO.LO_BOLETO]);
                    List<Object[]> N04_LO_BOLETO = new ArrayList<Object[]>(N03_LO_BOLETO.length);
                    for (int i = 0; i < N04_LO_TRANSP.size(); i++) {
                        N04_LO_BOLETO.add((Object[]) structure09.toObject(mapping.Char(mapping.GetDimension(LO_BOLETO)).toBytes(N03_LO_BOLETO[i]), 0));
                    }
                    Object[] N03_LO_XO = (Object[]) ((Object[]) N02_DATOS_INPUT[IDX_DATOS_INPUT.LO_XO]);
                    List<Object[]> N04_LO_XO = new ArrayList<Object[]>(N03_LO_XO.length);
                    for (int i = 0; i < N04_LO_TRANSP.size(); i++) {
                        N04_LO_XO.add((Object[]) structure10.toObject(mapping.Char(mapping.GetDimension(LO_XO)).toBytes(N03_LO_XO[i]), 0));
                    }
                    Object[] N03_LO_NVLO = (Object[]) ((Object[]) N02_DATOS_INPUT[IDX_DATOS_INPUT.LO_NVLO]);
                    List<Object[]> N04_LO_NVLO = new ArrayList<Object[]>(N03_LO_NVLO.length);
                    for (int i = 0; i < N04_LO_TRANSP.size(); i++) {
                        N04_LO_NVLO.add((Object[]) structure12.toObject(mapping.Char(mapping.GetDimension(LO_NVLO)).toBytes(N03_LO_NVLO[i]), 0));
                    }
                    Object[] N03_LO_FVLO = (Object[]) ((Object[]) N02_DATOS_INPUT[IDX_DATOS_INPUT.LO_FVLO]);
                    List<Object[]> N04_LO_FVLO = new ArrayList<Object[]>(N03_LO_FVLO.length);
                    for (int i = 0; i < N04_LO_TRANSP.size(); i++) {
                        N04_LO_FVLO.add((Object[]) structure13.toObject(mapping.Char(mapping.GetDimension(LO_FVLO)).toBytes(N03_LO_FVLO[i]), 0));
                    }
                    Object[] N03_LO_RBD = (Object[]) ((Object[]) N02_DATOS_INPUT[IDX_DATOS_INPUT.LO_RBD]);
                    List<Object[]> N04_LO_RBD = new ArrayList<Object[]>(N03_LO_RBD.length);
                    for (int i = 0; i < N04_LO_TRANSP.size(); i++) {
                        N04_LO_RBD.add((Object[]) structure14.toObject(mapping.Char(mapping.GetDimension(LO_RBD)).toBytes(N03_LO_RBD[i]), 0));
                    }
                    Object[] N03_LO_CLASE = (Object[]) ((Object[]) N02_DATOS_INPUT[IDX_DATOS_INPUT.LO_CLASE]);
                    List<Object[]> N04_LO_CLASE = new ArrayList<Object[]>(N03_LO_CLASE.length);
                    for (int i = 0; i < N04_LO_TRANSP.size(); i++) {
                        N04_LO_CLASE.add((Object[]) structure15.toObject(mapping.Char(mapping.GetDimension(LO_CLASE)).toBytes(N03_LO_CLASE[i]), 0));
                    }
                    Object[] N03_LO_BASE = (Object[]) ((Object[]) N02_DATOS_INPUT[IDX_DATOS_INPUT.LO_BASE]);
                    List<Object[]> N04_LO_BASE = new ArrayList<Object[]>(N03_LO_BASE.length);
                    for (int i = 0; i < N04_LO_TRANSP.size(); i++) {
                        N04_LO_BASE.add((Object[]) structure16.toObject(mapping.Char(mapping.GetDimension(LO_BASE)).toBytes(N03_LO_BASE[i]), 0));
                    }
                    Object[] N03_LO_TBASE = (Object[]) ((Object[]) N02_DATOS_INPUT[IDX_DATOS_INPUT.LO_TBASE]);
                    List<Object[]> N04_LO_TBASE = new ArrayList<Object[]>(N03_LO_TBASE.length);
                    for (int i = 0; i < N04_LO_TRANSP.size(); i++) {
                        N04_LO_TBASE.add((Object[]) structure17.toObject(mapping.Char(mapping.GetDimension(LO_TBASE)).toBytes(N03_LO_TBASE[i]), 0));
                    }
                    Object[] N03_LO_SBTBASE = (Object[]) ((Object[]) N02_DATOS_INPUT[IDX_DATOS_INPUT.LO_SBTBASE]);
                    List<Object[]> N04_LO_SBTBASE = new ArrayList<Object[]>(N03_LO_SBTBASE.length);
                    for (int i = 0; i < N04_LO_TRANSP.size(); i++) {
                        N04_LO_SBTBASE.add((Object[]) structure18.toObject(mapping.Char(mapping.GetDimension(LO_SBTBASE)).toBytes(N03_LO_SBTBASE[i]), 0));
                    }
                    Object[] N03_LO_TDESC = (Object[]) ((Object[]) N02_DATOS_INPUT[IDX_DATOS_INPUT.LO_TDESC]);
                    List<Object[]> N04_LO_TDESC = new ArrayList<Object[]>(N03_LO_TDESC.length);
                    for (int i = 0; i < N04_LO_TRANSP.size(); i++) {
                        N04_LO_TDESC.add((Object[]) structure19.toObject(mapping.Char(mapping.GetDimension(LO_TDESC)).toBytes(N03_LO_TDESC[i]), 0));
                    }
                    Object[] N03_LO_PDESC = (Object[]) ((Object[]) N02_DATOS_INPUT[IDX_DATOS_INPUT.LO_PDESC]);
                    List<Object[]> N04_LO_PDESC = new ArrayList<Object[]>(N03_LO_PDESC.length);
                    for (int i = 0; i < N04_LO_TRANSP.size(); i++) {
                        N04_LO_PDESC.add((Object[]) structure20.toObject(mapping.Char(mapping.GetDimension(LO_PDESC)).toBytes(N03_LO_PDESC[i]), 0));
                    }
                    Object[] N03_LO_BREAK = (Object[]) ((Object[]) N02_DATOS_INPUT[IDX_DATOS_INPUT.LO_BREAK]);
                    List<Object[]> N04_LO_BREAK = new ArrayList<Object[]>(N03_LO_BREAK.length);
                    for (int i = 0; i < N04_LO_TRANSP.size(); i++) {
                        N04_LO_BREAK.add((Object[]) structure21.toObject(mapping.Char(mapping.GetDimension(LO_BREAK)).toBytes(N03_LO_BREAK[i]), 0));
                    }
                    Object[] N03_LO_INDST = (Object[]) ((Object[]) N02_DATOS_INPUT[IDX_DATOS_INPUT.LO_INDST]);
                    List<Object[]> N04_LO_INDST = new ArrayList<Object[]>(N03_LO_INDST.length);
                    for (int i = 0; i < N04_LO_TRANSP.size(); i++) {
                        N04_LO_INDST.add((Object[]) structure22.toObject(mapping.Char(mapping.GetDimension(LO_INDST)).toBytes(N03_LO_INDST[i]), 0));
                    }
                    Object[] N03_LO_Q = (Object[]) ((Object[]) N02_DATOS_INPUT[IDX_DATOS_INPUT.LO_Q]);
                    List<Object[]> N04_LO_Q = new ArrayList<Object[]>(N03_LO_Q.length);
                    for (int i = 0; i < N04_LO_TRANSP.size(); i++) {
                        N04_LO_Q.add((Object[]) structure23.toObject(mapping.Char(mapping.GetDimension(LO_Q)).toBytes(N03_LO_Q[i]), 0));
                    }
                    Object[] N03_LO_SRP = (Object[]) ((Object[]) N02_DATOS_OUPUT[IDX_DATOS_OUPUT.LO_SRP]);
                    List<Object[]> N04_LO_SRP = new ArrayList<Object[]>(N03_LO_SRP.length);
                    for (int i = 0; i < N04_LO_TRANSP.size(); i++) {
                        N04_LO_SRP.add((Object[]) structure24.toObject(mapping.Char(mapping.GetDimension(LO_SRP)).toBytes(N03_LO_SRP[i]), 0));
                    }
                    Object[] N03_LO_MPA = (Object[]) ((Object[]) N02_DATOS_OUPUT[IDX_DATOS_OUPUT.LO_MPA]);
                    List<Object[]> N04_LO_MPA = new ArrayList<Object[]>(N03_LO_MPA.length);
                    for (int i = 0; i < N04_LO_TRANSP.size(); i++) {
                        N04_LO_MPA.add((Object[]) structure25.toObject(mapping.Char(mapping.GetDimension(LO_MPA)).toBytes(N03_LO_MPA[i]), 0));
                    }
                    Object[] N03_LO_ACU_O = (Object[]) ((Object[]) N02_DATOS_OUPUT[IDX_DATOS_OUPUT.LO_ACU_O]);
                    List<Object[]> N04_LO_ACU_O = new ArrayList<Object[]>(N03_LO_ACU_O.length);
                    for (int i = 0; i < N04_LO_TRANSP.size(); i++) {
                        N04_LO_ACU_O.add((Object[]) structure26.toObject(mapping.Char(mapping.GetDimension(LO_ACU_O)).toBytes(N03_LO_ACU_O[i]), 0));
                    }
                    Object[] N03_LO_ACU_CD = (Object[]) ((Object[]) N02_DATOS_OUPUT[IDX_DATOS_OUPUT.LO_ACU_CD]);
                    List<Object[]> N04_LO_ACU_CD = new ArrayList<Object[]>(N03_LO_ACU_CD.length);
                    for (int i = 0; i < N04_LO_TRANSP.size(); i++) {
                        N04_LO_ACU_CD.add((Object[]) structure27.toObject(mapping.Char(mapping.GetDimension(LO_ACU_CD)).toBytes(N03_LO_ACU_CD[i]), 0));
                    }
                    Object[] N03_LO_ISC = (Object[]) ((Object[]) N02_DATOS_OUPUT[IDX_DATOS_OUPUT.LO_ISC]);
                    List<Object[]> N04_LO_ISC = new ArrayList<Object[]>(N03_LO_ISC.length);
                    for (int i = 0; i < N04_LO_TRANSP.size(); i++) {
                        N04_LO_ISC.add((Object[]) structure28.toObject(mapping.Char(mapping.GetDimension(LO_ISC)).toBytes(N03_LO_ISC[i]), 0));
                    }
                    Object[] N03_LO_VALOR = (Object[]) ((Object[]) N02_DATOS_OUPUT[IDX_DATOS_OUPUT.LO_VALOR]);
                    List<Object[]> N04_LO_VALOR = new ArrayList<Object[]>(N03_LO_VALOR.length);
                    for (int i = 0; i < N04_LO_TRANSP.size(); i++) {
                        N04_LO_VALOR.add((Object[]) structure29.toObject(mapping.Char(mapping.GetDimension(LO_VALOR)).toBytes(N03_LO_VALOR[i]), 0));
                    }
                    Object[] N03_LO_AJUSTE = (Object[]) ((Object[]) N02_DATOS_OUPUT[IDX_DATOS_OUPUT.LO_AJUSTE]);
                    List<Object[]> N04_LO_AJUSTE = new ArrayList<Object[]>(N03_LO_AJUSTE.length);
                    for (int i = 0; i < N04_LO_TRANSP.size(); i++) {
                        N04_LO_AJUSTE.add((Object[]) structure30.toObject(mapping.Char(mapping.GetDimension(LO_AJUSTE)).toBytes(N03_LO_AJUSTE[i]), 0));
                    }
                    Object[] N03_LO_Q_OUT = (Object[]) ((Object[]) N02_DATOS_IO[IDX_DATOS_IO.LO_Q_OUT]);
                    List<Object[]> N04_LO_Q_OUT = new ArrayList<Object[]>(N03_LO_Q_OUT.length);
                    for (int i = 0; i < N04_LO_TRANSP.size(); i++) {
                        N04_LO_Q_OUT.add((Object[]) structure31.toObject(mapping.Char(mapping.GetDimension(LO_Q_OUT)).toBytes(N03_LO_Q_OUT[i]), 0));
                    }
                    Object[] N03_LO_FACTOR = (Object[]) ((Object[]) N02_DATOS_OUPUT[IDX_DATOS_OUPUT.LO_FACTOR]);
                    List<Object[]> N04_LO_FACTOR = new ArrayList<Object[]>(N03_LO_FACTOR.length);
                    for (int i = 0; i < N04_LO_TRANSP.size(); i++) {
                        N04_LO_FACTOR.add((Object[]) structure32.toObject(mapping.Char(mapping.GetDimension(LO_FACTOR)).toBytes(N03_LO_FACTOR[i]), 0));
                    }
                    Object[] N03_LO_PPROVI = (Object[]) ((Object[]) N02_DATOS_OUPUT[IDX_DATOS_OUPUT.LO_PPROVI]);
                    List<Object[]> N04_LO_PPROVI = new ArrayList<Object[]>(N03_LO_PPROVI.length);
                    for (int i = 0; i < N04_LO_TRANSP.size(); i++) {
                        N04_LO_PPROVI.add((Object[]) structure33.toObject(mapping.Char(mapping.GetDimension(LO_PPROVI)).toBytes(N03_LO_PPROVI[i]), 0));
                    }
                    Object[] N03_LO_PROVIS = (Object[]) ((Object[]) N02_DATOS_OUPUT[IDX_DATOS_OUPUT.LO_PROVIS]);
                    List<Object[]> N04_LO_PROVIS = new ArrayList<Object[]>(N03_LO_PROVIS.length);
                    for (int i = 0; i < N04_LO_TRANSP.size(); i++) {
                        N04_LO_PROVIS.add((Object[]) structure34.toObject(mapping.Char(mapping.GetDimension(LO_PROVIS)).toBytes(N03_LO_PROVIS[i]), 0));
                    }
                    Object[] N03_LO_PRRCOMM = (Object[]) ((Object[]) N02_DATOS_IO[IDX_DATOS_IO.LO_PRRCOMM]);
                    List<Object[]> N04_LO_PRRCOMM = new ArrayList<Object[]>(N03_LO_PRRCOMM.length);
                    for (int i = 0; i < N04_LO_TRANSP.size(); i++) {
                        N04_LO_PRRCOMM.add((Object[]) structure35.toObject(mapping.Char(mapping.GetDimension(LO_PRRCOMM)).toBytes(N03_LO_PRRCOMM[i]), 0));
                    }
                    Object[] N03_LO_INDPR = (Object[]) ((Object[]) N02_DATOS_OUPUT[IDX_DATOS_OUPUT.LO_INDPR]);
                    List<Object[]> N04_LO_INDPR = new ArrayList<Object[]>(N03_LO_INDPR.length);
                    for (int i = 0; i < N04_LO_TRANSP.size(); i++) {
                        N04_LO_INDPR.add((Object[]) structure36.toObject(mapping.Char(mapping.GetDimension(LO_INDPR)).toBytes(N03_LO_INDPR[i]), 0));
                    }
                    Object[] N03_LO_TXTLOG = (Object[]) ((Object[]) N02_DATOS_OUPUT[IDX_DATOS_OUPUT.LO_TXTLOG]);
                    List<Object[]> N04_LO_TXTLOG = new ArrayList<Object[]>(N03_LO_TXTLOG.length);
                    for (int i = 0; i < N04_LO_TRANSP.size(); i++) {
                        N04_LO_TXTLOG.add((Object[]) structure37.toObject(mapping.Char(mapping.GetDimension(LO_TXTLOG)).toBytes(N03_LO_TXTLOG[i]), 0));
                    }
                    Object[] N03_LO_VIA = (Object[]) ((Object[]) N02_DATOS_INPUT[IDX_DATOS_INPUT.LO_VIA]);
                    List<Object[]> N04_LO_VIA = new ArrayList<Object[]>(N03_LO_VIA.length);
                    for (int i = 0; i < N04_LO_TRANSP.size(); i++) {
                        N04_LO_VIA.add((Object[]) structure38.toObject(mapping.Char(mapping.GetDimension(LO_VIA)).toBytes(N03_LO_VIA[i]), 0));
                    }
                    Object[] N03_LO_DIFL = (Object[]) ((Object[]) N02_DATOS_INPUT[IDX_DATOS_INPUT.LO_DIFL]);
                    List<Object[]> N04_LO_DIFL = new ArrayList<Object[]>(N03_LO_DIFL.length);
                    for (int i = 0; i < N04_LO_TRANSP.size(); i++) {
                        N04_LO_DIFL.add((Object[]) structure39.toObject(mapping.Char(mapping.GetDimension(LO_DIFL)).toBytes(N03_LO_DIFL[i]), 0));
                    }
                    Object[] N03_LO_INDIF = (Object[]) ((Object[]) N02_DATOS_INPUT[IDX_DATOS_INPUT.LO_INDIF]);
                    List<Object[]> N04_LO_INDIF = new ArrayList<Object[]>(N03_LO_INDIF.length);
                    for (int i = 0; i < N04_LO_TRANSP.size(); i++) {
                        N04_LO_INDIF.add((Object[]) structure40.toObject(mapping.Char(mapping.GetDimension(LO_INDIF)).toBytes(N03_LO_INDIF[i]), 0));
                    }
                    Object[] N03_LO_TFM_I = (Object[]) ((Object[]) N02_DATOS_INPUT[IDX_DATOS_INPUT.LO_TFM_I]);
                    List<Object[]> N04_LO_TFM_I = new ArrayList<Object[]>(N03_LO_TFM_I.length);
                    for (int i = 0; i < N04_LO_TRANSP.size(); i++) {
                        N04_LO_TFM_I.add((Object[]) structure41.toObject(mapping.Char(mapping.GetDimension(LO_TFM_I)).toBytes(N03_LO_TFM_I[i]), 0));
                    }
                    Object[] N03_LO_TFM_MDA = (Object[]) ((Object[]) N02_DATOS_INPUT[IDX_DATOS_INPUT.LO_TFM_MDA]);
                    List<Object[]> N04_LO_TFM_MDA = new ArrayList<Object[]>(N03_LO_TFM_MDA.length);
                    for (int i = 0; i < N04_LO_TRANSP.size(); i++) {
                        N04_LO_TFM_MDA.add((Object[]) structure42.toObject(mapping.Char(mapping.GetDimension(LO_TFM_MDA)).toBytes(N03_LO_TFM_MDA[i]), 0));
                    }
                    Object[] N03_LO_ACU_I = (Object[]) ((Object[]) N02_DATOS_INPUT[IDX_DATOS_INPUT.LO_ACU_I]);
                    List<Object[]> N04_LO_ACU_I = new ArrayList<Object[]>(N03_LO_ACU_I.length);
                    for (int i = 0; i < N04_LO_TRANSP.size(); i++) {
                        N04_LO_ACU_I.add((Object[]) structure43.toObject(mapping.Char(mapping.GetDimension(LO_ACU_I)).toBytes(N03_LO_ACU_I[i]), 0));
                    }
                    Object[] N03_LO_Q_IN = (Object[]) ((Object[]) N02_DATOS_IO[IDX_DATOS_IO.LO_Q_IN]);
                    List<Object[]> N04_LO_Q_IN = new ArrayList<Object[]>(N03_LO_Q_IN.length);
                    for (int i = 0; i < N04_LO_TRANSP.size(); i++) {
                        N04_LO_Q_IN.add((Object[]) structure44.toObject(mapping.Char(mapping.GetDimension(LO_Q_IN)).toBytes(N03_LO_Q_IN[i]), 0));
                    }
                    Object[] N03_LO_YANQUI = (Object[]) ((Object[]) N02_DATOS_OUPUT[IDX_DATOS_OUPUT.LO_YANQUI]);
                    List<Object[]> N04_LO_YANQUI = new ArrayList<Object[]>(N03_LO_YANQUI.length);
                    for (int i = 0; i < N04_LO_TRANSP.size(); i++) {
                        N04_LO_YANQUI.add((Object[]) structure45.toObject(mapping.Char(mapping.GetDimension(LO_YANQUI)).toBytes(N03_LO_YANQUI[i]), 0));
                    }
                    String N03_LK_TAJUSTE = N02_DATOS_OUPUT[30].toString();
                    //</editor-fold>

                    if (mapping.getString(N02_DATOS_OUPUT[IDX_DATOS_OUPUT.LK_ESTADO]).equals("0")) {
                        double totalSRP = 0;
                        double totalMPA = 0;
                        double totalVALOR = 0;
                        double totalQ = 0;
                        int j = 0;
                        for (int i = 0; i < 200; i++) {
                            if (!mapping.getString(N04_LO_TRANSP.get(i)[0]).trim().equals("")) {
                                objRtn = new A720();
                                objRtn.TKT = mapping.getString(N04_LO_BOLETO.get(i)[0]).trim();
                                j++;
                                if (j == 5) {
                                    j = 1;
                                }
                                objRtn.CPNPR = j + "";//(i + 1) + "";
                                objRtn.A720RUTAO = mapping.getString(N04_LO_RUTING.get(i)[0]).trim();
                                objRtn.A720RUTAD = mapping.getString(N04_LO_RUTING.get(i + 1)[0]).trim();
                                objRtn.A720CONEX = mapping.getString(N04_LO_XO.get(i)[0]).trim();
                                objRtn.A720CARRA = mapping.getString(N04_LO_TRANSP.get(i)[0]).trim();
                                objRtn.A720NVLO = mapping.getString(N04_LO_NVLO.get(i)[0]).trim();
                                objRtn.A720FVLO = mapping.getString(N04_LO_FVLO.get(i)[0]).trim();
                                objRtn.A720BOOKI = mapping.getString(N04_LO_RBD.get(i)[0]).trim();
                                objRtn.A720CLASE = mapping.getString(N04_LO_CLASE.get(i)[0]).trim();
                                objRtn.A720FBUSO = mapping.getString(N04_LO_BASE.get(i)[0]).trim();
                                objRtn.A720TBASE = mapping.getString(N04_LO_TBASE.get(i)[0]).trim();
                                objRtn.A720STBAS = mapping.getString(N04_LO_SBTBASE.get(i)[0]).trim();
                                objRtn.A720TDESC = mapping.getString(N04_LO_TDESC.get(i)[0]).trim();
                                objRtn.A720PORDS = mapping.getDouble(N04_LO_PDESC.get(i)[0]);
                                objRtn.A720FARE = mapping.getDouble(N04_LO_BREAK.get(i)[0]);
                                objRtn.A720TFARE = mapping.getString(N04_LO_INDST.get(i)[0]).trim();
                                objRtn.A720SS = mapping.getDouble(N04_LO_Q.get(i)[0]);
                                objRtn.A720VLSRP = mapping.getDouble(N04_LO_SRP.get(i)[0]);
                                objRtn.A720VLMPA = mapping.getDouble(N04_LO_MPA.get(i)[0]);
                                objRtn.A720ACUEO = mapping.getDouble(N04_LO_ACU_O.get(i)[0]);
                                objRtn.A720ACUCD = mapping.getString(N04_LO_ACU_CD.get(i)[0]).trim();
                                objRtn.A720ISC = mapping.getDouble(N04_LO_ISC.get(i)[0]);
                                objRtn.A720VALOR = mapping.getDouble(N04_LO_VALOR.get(i)[0]);
                                objRtn.A720AJUST = mapping.getDouble(N04_LO_AJUSTE.get(i)[0]);
                                objRtn.A720Q = mapping.getDouble(N04_LO_Q_OUT.get(i)[0]);
                                objRtn.A720FACT = mapping.getDouble(N04_LO_FACTOR.get(i)[0]);
                                objRtn.A720PPRO = mapping.getDouble(N04_LO_PPROVI.get(i)[0]);
                                objRtn.A720PROV = mapping.getDouble(N04_LO_PROVIS.get(i)[0]);
                                objRtn.A720PRRCM = mapping.getDouble(N04_LO_PRRCOMM.get(i)[0]);
                                objRtn.A720PRSCM = 0.00;//mapping.getDouble(N04_LO_PRRCOMM.get(i)[0]);
                                objRtn.A720YQ = 0.00;//mapping.getDouble(N04_LO_PRRCOMM.get(i)[0]);
                                objRtn.A720INDPR = mapping.getString(N04_LO_INDPR.get(i)[0]).trim();
                                objRtn.A720VIA = mapping.getString(N04_LO_VIA.get(i)[0]).trim();
                                objRtn.A720DIFL = mapping.getDouble(N04_LO_DIFL.get(i)[0]);
                                objRtn.A720INDIF = mapping.getString(N04_LO_INDIF.get(i)[0]).trim();
                                objRtn.A720TRFM = mapping.getDouble(N04_LO_TFM_I.get(i)[0]);
                                objRtn.A720MNTFM = mapping.getString(N04_LO_TFM_MDA.get(i)[0]).trim();
                                objRtn.A720ACUE = mapping.getDouble(N04_LO_ACU_I.get(i)[0]);
                                objRtn.A720QIN = mapping.getDouble(N04_LO_Q_IN.get(i)[0]);
                                objRtn.A720TAJUST = Double.parseDouble(N03_LK_TAJUSTE);
                                objRtn.A720YANQ = mapping.getDouble(N04_LO_YANQUI.get(i)[0]);
                                objRtn.LO_TXTLOG = mapping.getString(N04_LO_TXTLOG.get(i)[0]).trim();
                                objRtn.LK_ESTADO = mapping.getString(N02_DATOS_OUPUT[IDX_DATOS_OUPUT.LK_ESTADO]).trim();
                                objRtn.LK_CODERROR = mapping.getString(N02_DATOS_OUPUT[IDX_DATOS_OUPUT.LK_CODERROR]).trim();
                                objRtn.LK_MSJERROR = mapping.getString(N02_DATOS_OUPUT[IDX_DATOS_OUPUT.LK_MSJERROR]).trim();
                                totalSRP = totalSRP + objRtn.A720VLSRP;
                                totalMPA = totalMPA + objRtn.A720VLMPA;
                                totalVALOR = totalVALOR + objRtn.A720VALOR;
                                totalQ = totalQ + objRtn.A720Q;
                                lstProrate.add(objRtn);
                            } else {
                                objRtn = new A720();
                                objRtn.A720CONEX = "Z";
                                objRtn.A720VLSRP = totalSRP;
                                objRtn.A720VLMPA = totalMPA;
                                objRtn.A720VALOR = totalVALOR;
                                objRtn.A720Q = totalQ;
                                lstProrate.add(objRtn);
                                i = 201;
                            }
                        }
                    } else {
                        objRtn = new A720();
                        objRtn.LK_ESTADO = mapping.getString(N02_DATOS_OUPUT[IDX_DATOS_OUPUT.LK_ESTADO]).trim();
                        objRtn.LK_CODERROR = mapping.getString(N02_DATOS_OUPUT[IDX_DATOS_OUPUT.LK_CODERROR]).trim();
                        objRtn.LK_MSJERROR = mapping.getString(N02_DATOS_OUPUT[IDX_DATOS_OUPUT.LK_MSJERROR]).trim();
                        lstProrate.add(objRtn);
                    }
                }
            } finally {
                session.getCNXIBMDB2().closeSystem();
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
        return lstProrate;
    }
    
    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }
}
