/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.dao.discharges;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import javax.xml.transform.OutputKeys;
import javax.xml.transform.Source;
import javax.xml.transform.Transformer;
import javax.xml.transform.sax.SAXSource;
import javax.xml.transform.sax.SAXTransformerFactory;
import javax.xml.transform.stream.StreamResult;
import net.miatech.beans.SQP03961Filter;
import net.miatech.beans.SQP03962Filter;
import net.miatech.beans.SQP03963Filter;
import net.miatech.beans.SQP03964Filter;
import net.miatech.beans.SQP03965Filter;
import net.miatech.beans.SQP03974Filter;
import net.miatech.beans.SQP04051Filter;
import net.miatech.beans.spring.implement.IServerSession;
import org.apache.log4j.Logger;
import org.xml.sax.InputSource;

/**
 *
 * @author vhidalgo
 */
public class NoShowDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public NoShowDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public NoShowDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<SQP03961Filter> loadSQP03961(SQP03961Filter filter) throws SQLException, Exception {
        List<SQP03961Filter> lstRtn = new ArrayList<>(0);
        SQP03961Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL SQP03961(?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(5, Types.INTEGER);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.VP_A3933FPROC1);
            cstmt01.setString(3, filter.VP_A3933FPROC2);
            cstmt01.setString(4, filter.VP_A3933STAT);
            //param pagin
            cstmt01.setInt(5, filter.page.PAGNUM);
            cstmt01.setInt(6, filter.page.PAGROW);
            cstmt01.setInt(7, filter.page.TOTPAG);
            cstmt01.setInt(8, filter.page.TOTROW);
            cstmt01.execute();
            // Recupera paginacion SQL
            filter.page.PAGNUM = cstmt01.getInt(5);
            filter.page.PAGROW = cstmt01.getInt(6);
            filter.page.TOTPAG = cstmt01.getInt(7);
            filter.page.TOTROW = cstmt01.getInt(8);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new SQP03961Filter();
                objRtn.A3933CCUST = rs01.getString("A3933CCUST");
                objRtn.A3933FPROC = rs01.getString("A3933FPROC");
                objRtn.A3933TRECI = rs01.getInt("A3933TRECI");
                objRtn.A3933TARCH = rs01.getInt("A3933TARCH");
                objRtn.A3933RANGF = rs01.getString("A3933RANGF").trim();
                objRtn.A3933STAT = rs01.getString("A3933STAT");
                objRtn.A3933USRIN = rs01.getString("A3933USRIN");                
                objRtn.A3933FECIN = rs01.getString("A3933FECIN");
                objRtn.A3933HORIN = rs01.getString("A3933HORIN");
                objRtn.A3933USRAC = rs01.getString("A3933USRAC");
                objRtn.A3933FECAC = rs01.getString("A3933FECAC");
                objRtn.A3933HORAC = rs01.getString("A3933HORAC");
                objRtn.QTY_CADUCO = rs01.getInt("QTY_CADUCO"); 
                objRtn.TOT_CADUCO = rs01.getDouble("TOT_CADUCO");                 
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

    public List<SQP03962Filter> loadSQP03962(SQP03962Filter filter) throws SQLException, Exception {
        List<SQP03962Filter> lstRtn = new ArrayList<>(0);
        SQP03962Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL SQP03962(?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);
            cstmt01.registerOutParameter(9, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.A3932RPDA);
            cstmt01.setString(3, filter.VP_TICKET);
            cstmt01.setString(4, filter.A3932SEQ);
            cstmt01.setString(5, filter.A3932ESTAD);
            //param pagin
            cstmt01.setInt(6, filter.page.PAGNUM);
            cstmt01.setInt(7, filter.page.PAGROW);
            cstmt01.setInt(8, filter.page.TOTPAG);
            cstmt01.setInt(9, filter.page.TOTROW);
            cstmt01.execute();
            // Recupera paginacion SQL
            filter.page.PAGNUM = cstmt01.getInt(6);
            filter.page.PAGROW = cstmt01.getInt(7);
            filter.page.TOTPAG = cstmt01.getInt(8);
            filter.page.TOTROW = cstmt01.getInt(9);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new SQP03962Filter();
                objRtn.A3932CCUST = rs01.getString("A3932CCUST");
                objRtn.A3932RPDA = rs01.getString("A3932RPDA");
                objRtn.VP_TICKET = rs01.getString("A3932CCIA")+rs01.getString("A3932FORMA")+rs01.getString("A3932SERIE");
                objRtn.A3932CCIA = rs01.getString("A3932CCIA");
                objRtn.A3932FORMA = rs01.getString("A3932FORMA");
                objRtn.A3932SERIE = rs01.getString("A3932SERIE");                
                objRtn.A3932SEQ = rs01.getString("A3932SEQ");
                objRtn.A3932CUPON = rs01.getInt("A3932CUPON");
                objRtn.A3932STNBR = rs01.getString("A3932STNBR");
                objRtn.A3932PNR = rs01.getString("A3932PNR");
                objRtn.A3932SALED = rs01.getString("A3932SALED");
                objRtn.A3932TDOC = rs01.getString("A3932TDOC");
                objRtn.A3932PAX = rs01.getString("A3932PAX").trim();
                objRtn.A3932FVLO = rs01.getString("A3932FVLO");
                objRtn.A3932NVLO = rs01.getString("A3932NVLO");
                objRtn.A3932CARRA = rs01.getString("A3932CARRA");
                objRtn.A3932DEPAR = rs01.getString("A3932DEPAR");
                objRtn.A3932ARRIV = rs01.getString("A3932ARRIV");
                objRtn.A3932ITINE = rs01.getString("A3932ITINE").trim();
                objRtn.A3932FBASE = rs01.getString("A3932FBASE");
                objRtn.A3932FRULE = rs01.getString("A3932FRULE");
                objRtn.A3932BCLAS = rs01.getString("A3932BCLAS");
                objRtn.A3932CSTAT = rs01.getString("A3932CSTAT");
                objRtn.A3932ENDOR = rs01.getString("A3932ENDOR").trim();
                objRtn.A3932RMARK = rs01.getString("A3932RMARK").trim();
                //--
                objRtn.A3932STCAD = rs01.getString("A3932STCAD").trim();
                objRtn.A3932ESTAD = rs01.getString("A3932ESTAD_00").trim();
                objRtn.A3932NINTR = rs01.getInt("A3932NINTR");
                
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
    public List<SQP03963Filter> loadSQP03963(SQP03963Filter filter) throws SQLException, Exception {
        List<SQP03963Filter> lstRtn = new ArrayList<>(0);
        SQP03963Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL SQP03963(?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);
            cstmt01.registerOutParameter(9, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.A3934FPROC);
            cstmt01.setString(3, filter.VP_TICKET);
            cstmt01.setString(4, filter.A3934SEQ);
            cstmt01.setString(5, filter.A3934STSER);
            //param pagin
            cstmt01.setInt(6, filter.page.PAGNUM);
            cstmt01.setInt(7, filter.page.PAGROW);
            cstmt01.setInt(8, filter.page.TOTPAG);
            cstmt01.setInt(9, filter.page.TOTROW);
            cstmt01.execute();
            // Recupera paginacion SQL
            filter.page.PAGNUM = cstmt01.getInt(6);
            filter.page.PAGROW = cstmt01.getInt(7);
            filter.page.TOTPAG = cstmt01.getInt(8);
            filter.page.TOTROW = cstmt01.getInt(9);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new SQP03963Filter();
                objRtn.A3934CCUST = rs01.getString("A3934CCUST");
                objRtn.A3934FPROC = rs01.getString("A3934FPROC");
                objRtn.A3934CIA = rs01.getString("A3934CIA");
                objRtn.A3934FORMA = rs01.getString("A3934FORMA");
                objRtn.A3934SERIE = rs01.getString("A3934SERIE");
                objRtn.A3934SEQ = rs01.getString("A3934SEQ");
                objRtn.A3934CUPON = rs01.getString("A3934CUPON");
                objRtn.A3934CORRL = rs01.getInt("A3934CORRL");
                objRtn.A3934ARCH = rs01.getString("A3934ARCH");
                objRtn.A3934CODER = rs01.getString("A3934CODER");
                objRtn.A3934DATA = rs01.getString("A3934DATA").trim();
                objRtn.A3934STSER = rs01.getString("A3934STSER");
                objRtn.A3934USRIN = rs01.getString("A3934USRIN");
                objRtn.A3934FECIN = rs01.getString("A3934FECIN");
                objRtn.A3934HORIN = rs01.getString("A3934HORIN");
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
    public static String prettyPrintXml(String sourceXml) {
        try {
            Transformer serializer = SAXTransformerFactory.newInstance().newTransformer();
            serializer.setOutputProperty(OutputKeys.INDENT, "yes");
            serializer.setOutputProperty("{http://xml.apache.org/xslt}indent-amount", "2");
            Source xmlSource = new SAXSource(new InputSource(new ByteArrayInputStream(sourceXml.getBytes())));
            StreamResult res = new StreamResult(new ByteArrayOutputStream());
            serializer.transform(xmlSource, res);
            return new String(((ByteArrayOutputStream) res.getOutputStream()).toByteArray());
        } catch (Exception e) {

            // TODO log error
            return sourceXml;
        }
    }
    public List<SQP03964Filter> loadSQP03964(SQP03964Filter filter) throws SQLException, Exception {
        List<SQP03964Filter> lstRtn = new ArrayList<>(0);
        SQP03964Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL SQP03964(?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);
            cstmt01.registerOutParameter(9, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.FPROC);
            cstmt01.setString(3, filter.TICKET_NUMBER );
            cstmt01.setString(4, filter.SEQ);
            cstmt01.setString(5, filter.OPRESULTCODE);
            //param pagin
            cstmt01.setInt(6, filter.page.PAGNUM);
            cstmt01.setInt(7, filter.page.PAGROW);
            cstmt01.setInt(8, filter.page.TOTPAG);
            cstmt01.setInt(9, filter.page.TOTROW);
            cstmt01.execute();
            // Recupera paginacion SQL
            filter.page.PAGNUM = cstmt01.getInt(6);
            filter.page.PAGROW = cstmt01.getInt(7);
            filter.page.TOTPAG = cstmt01.getInt(8);
            filter.page.TOTROW = cstmt01.getInt(9);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new SQP03964Filter();
                objRtn.CCUST = rs01.getString("CCUST");
                objRtn.TICKET_NUMBER = rs01.getString("TICKET_NUMBER");
                objRtn.SEQ = rs01.getString("SEQ");
                objRtn.FPROC = rs01.getString("FPROC");                
                objRtn.INFO = prettyPrintXml(rs01.getString("INFO"));
                objRtn.OPRESULTCODE = rs01.getString("OPRESULTCODE");
                objRtn.OPRESULTDESCRIPTION = rs01.getString("OPRESULTDESCRIPTION");
                objRtn.ESTADO = rs01.getString("ESTADO");
                objRtn.USRIN = rs01.getString("USRIN");
                objRtn.FECIN = rs01.getTimestamp("FECIN");
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
    
    public List<SQP03965Filter> getSQP03965Filter(SQP03965Filter filter) throws SQLException, Exception {
        List<SQP03965Filter> lstRtn = new ArrayList<SQP03965Filter>(0);
        SQP03965Filter objRtn;
        
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null, rs02 = null , rs03 = null, rs04 = null;
        String SQLCLL01 = "{CALL PRAXIS.SQP03965(?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.A3935CCIA);
            cstmt01.setString(3, filter.A3935FORMA);
            cstmt01.setString(4, filter.A3935SERIE);
            cstmt01.setString(5, filter.A3935SEQ);
            cstmt01.execute();
            rs01 = cstmt01.getResultSet();
            
            /*pos 0*/
            while (rs01.next()) {
                
                objRtn  = new SQP03965Filter();                                
                objRtn.A3935CCUST = rs01.getString("A3935CCUST");                                        
                objRtn.A3935CCIA = rs01.getString("A3935CCIA");                
                objRtn.A3935FORMA = rs01.getString("A3935FORMA");
                objRtn.A3935SERIE = rs01.getString("A3935SERIE");
                objRtn.A3935SEQ = rs01.getString("A3935SEQ");
                objRtn.A3935DCHEQ = rs01.getString("A3935DCHEQ");
                objRtn.A3935TCPNS = rs01.getInt("A3935TCPNS");
                objRtn.A3935FLAG = rs01.getString("A3935FLAG");
                objRtn.A3935FPROC = rs01.getString("A3935FPROC");
                objRtn.A3935TRNCU = rs01.getString("A3935TRNCU");
                objRtn.A3935TDOC = rs01.getString("A3935TDOC");
                objRtn.A3935AGENT = rs01.getString("A3935AGENT");
                objRtn.A3935CODIT = rs01.getString("A3935CODIT");
                objRtn.A3935FECVT = rs01.getString("A3935FECVT");
                objRtn.A3935PNR = rs01.getString("A3935PNR");
                objRtn.A3935PNRSP = rs01.getString("A3935PNRSP");
                objRtn.A3935FRESV = rs01.getString("A3935FRESV");
                objRtn.A3935ETKT = rs01.getString("A3935ETKT");
                objRtn.A3935ORIG = rs01.getString("A3935ORIG");
                objRtn.A3935DEST = rs01.getString("A3935DEST");
                objRtn.A3935ITTY = rs01.getString("A3935ITTY");
                objRtn.A3935PAX = rs01.getString("A3935PAX").trim();
                objRtn.A3935TPAX = rs01.getString("A3935TPAX");
                objRtn.A3935INCLT = rs01.getString("A3935INCLT");
                objRtn.A3935CSABR = rs01.getString("A3935CSABR");
                objRtn.A3935PCITY = rs01.getString("A3935PCITY");
                objRtn.A3935CIUVT = rs01.getString("A3935CIUVT");
                objRtn.A3935PSVTA = rs01.getString("A3935PSVTA");
                objRtn.A3935CPUI = rs01.getString("A3935CPUI");
                objRtn.A3935ENDOR = rs01.getString("A3935ENDOR").trim();
                objRtn.A3935FRCA = rs01.getString("A3935FRCA").trim();                
                lstRtn.add(objRtn);
            }
            /*pos 1*/
            if (cstmt01.getMoreResults()) {
                rs02 = cstmt01.getResultSet();
                while (rs02.next()) {
                    objRtn = new SQP03965Filter();
                    objRtn.det_cpn.A3936CCUST = rs02.getString("A3936CCUST");
                    objRtn.det_cpn.A3936CCIA = rs02.getString("A3936CCIA");
                    objRtn.det_cpn.A3936FORMA = rs02.getString("A3936FORMA");
                    objRtn.det_cpn.A3936SERIE = rs02.getString("A3936SERIE");
                    objRtn.det_cpn.A3936SEQ = rs02.getString("A3936SEQ");
                    objRtn.det_cpn.A3936SEQ = rs02.getString("A3936SEQ");
                    objRtn.det_cpn.A3936CUPON = rs02.getInt("A3936CUPON");
                    objRtn.det_cpn.A3936SECPN = rs02.getInt("A3936SECPN");
                    objRtn.det_cpn.A3936FLAG = rs02.getString("A3936FLAG");
                    objRtn.det_cpn.A3936NSEQ = rs02.getInt("A3936NSEQ");
                    objRtn.det_cpn.A3936CIAI = rs02.getString("A3936CIAI");
                    objRtn.det_cpn.A3936FORMI = rs02.getString("A3936FORMI");
                    objRtn.det_cpn.A3936SERII = rs02.getString("A3936SERII");
                    objRtn.det_cpn.A3936ORIG = rs02.getString("A3936ORIG");
                    objRtn.det_cpn.A3936DEST = rs02.getString("A3936DEST");
                    objRtn.det_cpn.A3936CARN = rs02.getString("A3936CARN");
                    objRtn.det_cpn.A3936CARA = rs02.getString("A3936CARA");
                    objRtn.det_cpn.A3936NVLO = rs02.getString("A3936NVLO");
                    objRtn.det_cpn.A3936FVLO = rs02.getString("A3936FVLO");
                    objRtn.det_cpn.A3936HVLO = rs02.getString("A3936HVLO");
                    objRtn.det_cpn.A3936FVLA = rs02.getString("A3936FVLA");
                    objRtn.det_cpn.A3936CLAS = rs02.getString("A3936CLAS");
                    objRtn.det_cpn.A3936FBUS = rs02.getString("A3936FBUS");
                    objRtn.det_cpn.A3936TDSG = rs02.getString("A3936TDSG");
                    objRtn.det_cpn.A3936BSTA = rs02.getString("A3936BSTA");
                    objRtn.det_cpn.A3936CSTA = rs02.getString("A3936CSTA");
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
     public List<SQP03974Filter> loadSQP03974Filter(SQP03974Filter filter) throws SQLException, Exception {
        List<SQP03974Filter> lstRtn = new ArrayList<>(0);
        SQP03974Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL SQP03974(?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);
            cstmt01.registerOutParameter(9, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.A3980FFILE);
            cstmt01.setString(3, filter.VP_TICKET);
            cstmt01.setString(4, filter.A3980SEQ);
            cstmt01.setString(5, filter.A3980APLIC);
            //param pagin
            cstmt01.setInt(6, filter.page.PAGNUM);
            cstmt01.setInt(7, filter.page.PAGROW);
            cstmt01.setInt(8, filter.page.TOTPAG);
            cstmt01.setInt(9, filter.page.TOTROW);
            cstmt01.execute();
            // Recupera paginacion SQL
            filter.page.PAGNUM = cstmt01.getInt(6);
            filter.page.PAGROW = cstmt01.getInt(7);
            filter.page.TOTPAG = cstmt01.getInt(8);
            filter.page.TOTROW = cstmt01.getInt(9);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new SQP03974Filter();
                objRtn.A3980CCUST = rs01.getString("A3980CCUST");
                objRtn.A3980RPDA = rs01.getString("A3980RPDA");                
                objRtn.A3980FFILE = rs01.getString("A3980FFILE").trim();
                objRtn.A3980CCIA = rs01.getString("A3980CCIA");
                objRtn.A3980FORMA = rs01.getString("A3980FORMA");                
                objRtn.A3980SERIE = rs01.getString("A3980SERIE");
                objRtn.A3980SEQ = rs01.getString("A3980SEQ");
                objRtn.A3980CUPON = rs01.getString("A3980CUPON");
                objRtn.A3980TICKI = rs01.getString("A3980TICKI");
                objRtn.A3980TICKA = rs01.getString("A3980TICKA");                
                objRtn.A3980CORR = rs01.getString("A3980CORR");
                objRtn.A3980APLIC = rs01.getString("A3980APLIC");
                objRtn.A3980TEXT = rs01.getString("A3980TEXT").trim();
                objRtn.A3980USRIN = rs01.getString("A3980USRIN");
                objRtn.A3980FECIN = rs01.getString("A3980FECIN");
                objRtn.A3980HORIN = rs01.getString("A3980HORIN");                
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
     public List<SQP04051Filter> loadSQP04051Filter(SQP04051Filter filter) throws SQLException, Exception {
        List<SQP04051Filter> lstRtn = new ArrayList<>(0);
        SQP04051Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL SQP04051(?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.A3935FPROC);                        
            cstmt01.execute();
            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new SQP04051Filter();
                objRtn.A3935CCIA = rs01.getString("A3935CCIA");
                objRtn.A3935FORMA = rs01.getString("A3935FORMA");                
                objRtn.A3935SERIE = rs01.getString("A3935SERIE");
                objRtn.det_cpn.A3936CCIA = rs01.getString("A3936CCIA");
                objRtn.det_cpn.A3936FORMA = rs01.getString("A3936FORMA");                
                objRtn.det_cpn.A3936SERIE = rs01.getString("A3936SERIE");
                objRtn.A3935TCPNS = rs01.getInt("A3935TCPNS");
                objRtn.det_cpn.A3936FLAG = rs01.getString("A3936FLAG");
                objRtn.A3935FPROC = rs01.getString("A3935FPROC");
                objRtn.A3935TRNCU = rs01.getString("A3935TRNCU");                
                objRtn.A3935TDOC = rs01.getString("A3935TDOC");
                objRtn.A3935AGENT = rs01.getString("A3935AGENT");
                objRtn.A3935CODIT = rs01.getString("A3935CODIT");
                objRtn.A3935FECVT = rs01.getString("A3935FECVT");
                objRtn.A3935PNR = rs01.getString("A3935PNR");
                objRtn.A3935PNRSP = rs01.getString("A3935PNRSP");   
                objRtn.A3935FRESV = rs01.getString("A3935FRESV");   
                objRtn.A3935PAX = rs01.getString("A3935PAX");
                objRtn.A3935TPAX = rs01.getString("A3935TPAX");
                objRtn.A3935INCLT = rs01.getString("A3935INCLT");
                objRtn.A3935PCITY = rs01.getString("A3935PCITY");
                objRtn.A3935CIUVT = rs01.getString("A3935CIUVT");
                objRtn.A3935PSVTA = rs01.getString("A3935PSVTA");
                objRtn.A3935CPUI = rs01.getString("A3935CPUI");
                objRtn.A3935ENDOR = rs01.getString("A3935ENDOR");
                objRtn.det_cpn.A3936CUPON = rs01.getInt("A3936CUPON");
                objRtn.det_cpn.A3936SECPN = rs01.getInt("A3936SECPN");
                objRtn.det_cpn.A3936ORIG = rs01.getString("A3936ORIG");
                objRtn.det_cpn.A3936DEST = rs01.getString("A3936DEST");
                objRtn.det_cpn.A3936CARN = rs01.getString("A3936CARN");
                objRtn.det_cpn.A3936CARA = rs01.getString("A3936CARA");
                objRtn.det_cpn.A3936NVLO = rs01.getString("A3936NVLO");
                objRtn.det_cpn.A3936FVLO = rs01.getString("A3936FVLO");
                objRtn.det_cpn.A3936HVLO = rs01.getString("A3936HVLO");
                objRtn.det_cpn.A3936FVLA = rs01.getString("A3936FVLA");
                objRtn.det_cpn.A3936HVLA = rs01.getString("A3936HVLA");
                objRtn.det_cpn.A3936CLAS = rs01.getString("A3936CLAS");
                objRtn.det_cpn.A3936FBUS = rs01.getString("A3936FBUS");
                objRtn.det_cpn.A3936TDSG = rs01.getString("A3936TDSG");
                objRtn.det_cpn.A3936BSTA = rs01.getString("A3936BSTA");
                objRtn.det_cpn.A3936CSTA = rs01.getString("A3936CSTA");
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

}
