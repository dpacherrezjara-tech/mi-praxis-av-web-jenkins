/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.dao.eecta;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.eecta.SQP03942Filter;
import net.miatech.praxis.eecta.SQP03943Filter;
import net.miatech.praxis.eecta.SQP03951Filter;
import net.miatech.praxis.eecta.SQP03952Filter;
import net.miatech.praxis.eecta.SQP03955Filter;
import net.miatech.praxis.eecta.SQP03956Filter;
import net.miatech.praxis.eecta.SQP04053Filter;
import net.miatech.praxis.eecta.SQP04059Filter;
 import org.apache.log4j.Logger;

/**
 *
 * @author vhidalgo
 */
public class AplPaymentDAO {
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

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public List<SQP03942Filter> getSQP03942Filter(SQP03942Filter filter) throws SQLException, Exception {
        List<SQP03942Filter> lstRtn = new ArrayList<SQP03942Filter>(0);
        SQP03942Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null, rs02 = null;
        String SQLCLL01 = "{CALL PXUATP.SQP03942(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;        
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(12, Types.INTEGER);
            cstmt01.registerOutParameter(13, Types.INTEGER);
            cstmt01.registerOutParameter(14, Types.INTEGER);
            cstmt01.registerOutParameter(15, Types.INTEGER);
            
            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.VP_OPCION);
            cstmt01.setString(3, filter.VP_FDATE1);
            cstmt01.setString(4, filter.VP_FDATE2);
            cstmt01.setString(5, filter.VP_CDCLI);
            cstmt01.setString(6, filter.VP_RSOCI);
            cstmt01.setString(7, filter.VP_NRRPT);
            cstmt01.setString(8, filter.VP_REFPG);
            cstmt01.setString(9, filter.VP_CTABC);
            cstmt01.setString(10, filter.VP_STSPG);
            cstmt01.setString(11, filter.VP_BOLET);
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
                objRtn = new SQP03942Filter();
                objRtn.A3957NRRPT = rs01.getString("A3957NRRPT");
                objRtn.A3957CDCLI = rs01.getString("A3957CDCLI");                
                objRtn.A3953RSOCI = rs01.getString("A3953RSOCI");
                objRtn.A3957REFBC = rs01.getString("A3957REFBC");
                objRtn.A3953BANCO = rs01.getString("A3953BANCO");
                objRtn.A3953CTABC = rs01.getString("A3953CTABC");                
                objRtn.A3957INIPR = rs01.getString("A3957INIPR");
                objRtn.A3957FINPR = rs01.getString("A3957FINPR");                
                objRtn.A3957MDLOC = rs01.getString("A3957MDLOC");
                objRtn.A3957FARE = rs01.getDouble("A3957FARE");
                objRtn.A3957IVA = rs01.getDouble("A3957IVA");
                objRtn.A3957TUA = rs01.getDouble("A3957TUA");
                objRtn.A3957YR = rs01.getDouble("A3957YR");
                objRtn.A3957YQ = rs01.getDouble("A3957YQ");
                objRtn.A3957OTR = rs01.getDouble("A3957OTR");
                objRtn.A3957TOT = rs01.getDouble("A3957TOT");
                //news
                objRtn.A3957TIPPG = rs01.getString("A3957TIPPG");      
                objRtn.A3957STSPG = rs01.getString("A3957STSPG");                                     
                objRtn.A3957TOTAP = rs01.getDouble("A3957TOTAP");
                objRtn.A3957SALDP = rs01.getDouble("A3957SALDP");
                    
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
    public List<SQP03951Filter> getSQP03951Filter(SQP03951Filter filter) throws SQLException, Exception {
        List<SQP03951Filter> lstRtn = new ArrayList<SQP03951Filter>(0);
        SQP03951Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null, rs02 = null;
        String SQLCLL01 = "{CALL PXUATP.SQP03951(?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.VP_A3958NRRPT);
            cstmt01.setString(3, filter.VP_A3958CDCLI);
            cstmt01.setString(4, filter.VP_TFILTTRO);
            cstmt01.setString(5, filter.VP_PARAM1);
            cstmt01.execute();
            
            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new SQP03951Filter();
                objRtn.A3958CCUST =  rs01.getString("A3958CCUST");
                objRtn.TICKET_NUMBER = rs01.getString("A3958CIA")+rs01.getString("A3958FORMA")+rs01.getString("A3958SERIE");
                objRtn.A3958CIA = rs01.getString("A3958CIA");
                objRtn.A3958FORMA = rs01.getString("A3958FORMA");
                objRtn.A3958SERIE = rs01.getString("A3958SERIE");
                objRtn.A3958SEQ = rs01.getString("A3958SEQ");
                objRtn.A3958NRRPT = rs01.getString("A3958NRRPT");
                objRtn.A3958SQRPT = rs01.getString("A3958SQRPT");
                objRtn.A3958CDCLI = rs01.getString("A3958CDCLI");
                objRtn.A3958SOLER = rs01.getString("A3958SOLER");
                objRtn.A3958GESTR = rs01.getString("A3958GESTR");
                objRtn.A3958CFDI = rs01.getString("A3958CFDI");
                objRtn.A3958RFC = rs01.getString("A3958RFC");
                objRtn.A3958FECTB = rs01.getString("A3958FECTB");
                objRtn.A3958GRUPO = rs01.getString("A3958GRUPO");
                objRtn.A3958FPROC = rs01.getString("A3958FPROC");
                objRtn.A3958TRNCU = rs01.getString("A3958TRNCU");
                objRtn.A3958FARE = rs01.getDouble("A3958FARE");
                objRtn.A3958IVA = rs01.getDouble("A3958IVA");
                objRtn.A3958TUA = rs01.getDouble("A3958TUA");
                objRtn.A3958YR = rs01.getDouble("A3958YR");
                objRtn.A3958YQ = rs01.getDouble("A3958YQ");
                objRtn.A3958OTR = rs01.getDouble("A3958OTR");
                objRtn.A3958TOT = rs01.getDouble("A3958TOT");
                objRtn.A3958PAX = rs01.getString("A3958PAX");
                objRtn.A3958IDCON = rs01.getString("A3958IDCON");
                objRtn.A3958FCONT = rs01.getString("A3958FCONT");     
                objRtn.A3958TOTAP = rs01.getDouble("A3958TOTAP");     
                objRtn.A3958SALDP = rs01.getDouble("A3958SALDP");
                objRtn.A3958STSPG = rs01.getString("A3958STSPG");                
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
    
    public SQP03952Filter setSQP03952Filter(SQP03952Filter filter) throws SQLException, Exception {
        CallableStatement cstmt = null;
        String SQLCLL01 = "{CALL PXUATP.SQP03952(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(14, Types.VARCHAR);
            cstmt.registerOutParameter(15, Types.VARCHAR);            
            cstmt.setString(1, filter.VP_ACTION);
            cstmt.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(3, filter.A3959REFPG);
            cstmt.setString(4, filter.A3959FECPG);
            cstmt.setDouble(5, filter.A3959TOTPG);
            cstmt.setString(6, filter.A3959MDAPG);
            cstmt.setString(7, filter.A3959TIPPG);
            cstmt.setString(8, filter.A3959NRRPT);
            cstmt.setString(9, filter.A3959CDCLI);
            cstmt.setString(10, filter.A3959BANCO.trim());
            cstmt.setString(11, filter.A3959CTABC.trim());
            cstmt.setString(12, filter.VP_TICKET_NC.trim());
            cstmt.setString(13, filter.VP_json_detail);
            cstmt.execute();
            filter.dbException.SQLCODE = cstmt.getString(14);
            filter.dbException.MESSAGE = cstmt.getString(15);
                        
        } finally {
            if (cstmt != null) {
                try {
                    cstmt.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
        return filter;
    }
    
    public List<SQP03955Filter> getSQP03955Filter(SQP03955Filter filter) throws SQLException, Exception {
        List<SQP03955Filter> lstRtn = new ArrayList<SQP03955Filter>(0);
        SQP03955Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null, rs02 = null;
        String SQLCLL01 = "{CALL PXUATP.SQP03955(?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.VP_NRRPT);
            cstmt01.setString(3, filter.VP_CDCLI);            
            cstmt01.execute();
            
            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new SQP03955Filter();
                objRtn.A3959CCUST =  rs01.getString("A3959CCUST");
                objRtn.A3959IDPG = rs01.getString("A3959IDPG");                
                //objRtn.A3959REFPG = rs01.getString("A3959REFPG");
                objRtn.A3959FECPG = rs01.getString("A3959FECPG");
                objRtn.A3959MDAPG = rs01.getString("A3959MDAPG");
                objRtn.A3959TOTPG = rs01.getDouble("A3959TOTPG");                
                objRtn.A3959TIPPG = rs01.getString("A3959TIPPG_00");
                objRtn.A3959NRRPT = rs01.getString("A3959NRRPT");
                objRtn.A3959CDCLI = rs01.getString("A3959CDCLI");
                //objRtn.A3959BANCO = rs01.getString("A3959BANCO");                
                //objRtn.A3959CTABC = rs01.getString("A3959CTABC");
                objRtn.A3959REGIS = rs01.getString("A3959REGIS");
                objRtn.A3959FREGI = rs01.getString("A3959FREGI");
                objRtn.A3959HREGI = rs01.getString("A3959HREGI");
                objRtn.A3959REVIS = rs01.getString("A3959REVIS");
                objRtn.A3959FREVI = rs01.getString("A3959FREVI");
                objRtn.A3959HREVI = rs01.getString("A3959HREVI");                
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
     public List<SQP03956Filter> getSQP03956Filter(SQP03956Filter filter) throws SQLException, Exception {
        List<SQP03956Filter> lstRtn = new ArrayList<SQP03956Filter>(0);
        SQP03956Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null, rs02 = null;
        String SQLCLL01 = "{CALL PXUATP.SQP03956(?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(4, Types.INTEGER);
            cstmt01.registerOutParameter(5, Types.INTEGER);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            
            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.VP_IDPG);
            cstmt01.setString(3, filter.TICKET_NUMBER);
            cstmt01.setInt(4, filter.page.PAGNUM);
            cstmt01.setInt(5, filter.page.PAGROW);
            cstmt01.setInt(6, filter.page.TOTPAG);
            cstmt01.setInt(7, filter.page.TOTROW);            
            cstmt01.execute();            
            filter.page.PAGNUM = cstmt01.getInt(4);
            filter.page.PAGROW = cstmt01.getInt(5);
            filter.page.TOTPAG = cstmt01.getInt(6);
            filter.page.TOTROW = cstmt01.getInt(7);
            
            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new SQP03956Filter();
                objRtn.A3977CCUST =  rs01.getString("A3977CCUST");
                objRtn.TICKET_NUMBER = rs01.getString("A3977CIA")+rs01.getString("A3977FORMA")+rs01.getString("A3977SERIE");
                objRtn.A3977CIA = rs01.getString("A3977CIA");
                objRtn.A3977FORMA = rs01.getString("A3977FORMA");
                objRtn.A3977SERIE = rs01.getString("A3977SERIE");
                objRtn.A3977SEQ = rs01.getString("A3977SEQ");
                objRtn.A3977TRNCU = rs01.getString("A3977TRNCU");
                objRtn.A3977GRUPO = rs01.getString("A3977GRUPO");
                objRtn.A3977SQAPL = rs01.getString("A3977SQAPL");
                objRtn.A3977NRRPT = rs01.getString("A3977NRRPT");
                objRtn.A3977SQRPT = rs01.getString("A3977SQRPT");
                objRtn.A3977CDCLI = rs01.getString("A3977CDCLI");
                objRtn.A3977TIPPG = rs01.getString("A3977TIPPG_00");
                objRtn.A3977STSPG = rs01.getString("A3977STSPG_00");
                objRtn.A3977IDPG = rs01.getString("A3977IDPG");
                objRtn.A3977SQPG = rs01.getString("A3977SQPG");
                objRtn.A3977REFPG = rs01.getString("A3977REFPG");
                objRtn.A3977FECPG = rs01.getString("A3977FECPG");
                objRtn.A3977BANCO = rs01.getString("A3977BANCO");
                objRtn.A3977CTABC = rs01.getString("A3977CTABC");
                objRtn.A3977TRXPG = rs01.getString("A3977TRXPG");
                
                //importe
                objRtn.A3977TOT = rs01.getDouble("A3977TOT");
                objRtn.A3977TOTAP = rs01.getDouble("A3977TOTAP");
                objRtn.A3977SALD = rs01.getDouble("A3977SALD");
                objRtn.A3977MDA = rs01.getString("A3977MDA");
                //audit
                objRtn.A3977APLIC = rs01.getString("A3977APLIC");
                objRtn.A3977FAPLC = rs01.getString("A3977FAPLC");
                objRtn.A3977HAPLC = rs01.getString("A3977HAPLC");
                objRtn.A3977REGIS = rs01.getString("A3977REGIS");
                objRtn.A3977FREGI = rs01.getString("A3977FREGI");
                objRtn.A3977HREGI = rs01.getString("A3977HREGI");
                objRtn.A3977REVIS = rs01.getString("A3977REVIS");
                objRtn.A3977FREVI = rs01.getString("A3977FREVI");
                objRtn.A3977HREVI = rs01.getString("A3977HREVI");
                
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
     public SQP03943Filter setSQP03943Filter(SQP03943Filter filter) throws SQLException, Exception {
        CallableStatement cstmt = null;
        String SQLCLL01 = "{CALL PXUATP.SQP03943(?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(13, Types.VARCHAR);
            cstmt.registerOutParameter(14, Types.VARCHAR);            
            cstmt.setString(1, filter.VP_ACTION);
            cstmt.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(3, filter.A3959REFPG);
            cstmt.setString(4, filter.A3959FECPG);
            cstmt.setDouble(5, filter.A3959TOTPG);
            cstmt.setString(6, filter.A3959MDAPG);
            cstmt.setString(7, filter.A3959TIPPG);
            cstmt.setString(8, filter.A3959NRRPT);
            cstmt.setString(9, filter.A3959CDCLI);
            cstmt.setString(10, filter.A3959BANCO.trim());
            cstmt.setString(11, filter.A3959CTABC.trim()); 
            cstmt.setString(12, filter.VP_CAPL); 
            
            cstmt.execute();
            filter.dbException.SQLCODE = cstmt.getString(13);
            filter.dbException.MESSAGE = cstmt.getString(14);
                        
        } finally {
            if (cstmt != null) {
                try {
                    cstmt.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
        return filter;
    }
     public SQP04059Filter setSQP04059Filter(SQP04059Filter filter ) throws SQLException, Exception {        
        SQP04059Filter objRtn; 
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PXUATP.SQP04059(?,?,?,?,?,?)}";
        Connection cnx = null;        
        ResultSet rst = null;        
        cnx = session.getCNXIBMDB2().getIBMDB2Connection();
        try {
                cstmt01 = cnx.prepareCall(SQLCLL01);            
                cstmt01.registerOutParameter(4, Types.VARCHAR);
                cstmt01.registerOutParameter(5, Types.VARCHAR);
                cstmt01.registerOutParameter(6, Types.VARCHAR);
                cstmt01.setString(1, filter.VP_ACTION);
                cstmt01.setString(2, session.getUserView().getCustomerInfo().CCUST);
                cstmt01.setString(3, filter.VP_JSON);
                cstmt01.execute();
                objRtn = new SQP04059Filter();                
                objRtn.dbException.SQLCODE = cstmt01.getString(4);
                objRtn.dbException.MESSAGE = cstmt01.getString(5);
                objRtn.OU_A4021LOTE = cstmt01.getString(6);
                
        } finally {
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
        return objRtn;
    }
     public List<SQP04053Filter> getSQP04053Filter(SQP04053Filter filter) throws SQLException, Exception {
        List<SQP04053Filter> lstRtn = new ArrayList<SQP04053Filter>(0);
        SQP04053Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null, rs02 = null;
        String SQLCLL01 = "{CALL PXUATP.SQP04053(?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(5, Types.INTEGER);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);
            
            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.VP_A4021LOTE);
            cstmt01.setString(3, filter.VP_BOLETO);
            cstmt01.setString(4, filter.VP_A4021STAT);
            cstmt01.setInt(5, filter.page.PAGNUM);
            cstmt01.setInt(6, filter.page.PAGROW);
            cstmt01.setInt(7, filter.page.TOTPAG);
            cstmt01.setInt(8, filter.page.TOTROW);            
            cstmt01.execute();            
            filter.page.PAGNUM = cstmt01.getInt(5);
            filter.page.PAGROW = cstmt01.getInt(6);
            filter.page.TOTPAG = cstmt01.getInt(7);
            filter.page.TOTROW = cstmt01.getInt(8);            
            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new SQP04053Filter();
                objRtn.A4021CCUST =  rs01.getString("A4021CCUST");                
                objRtn.A4021LOTE = rs01.getString("A4021LOTE");
                objRtn.A4021SQCG = rs01.getString("A4021SQCG");
                objRtn.A4021CIA = rs01.getString("A4021CIA");
                objRtn.A4021FORMA = rs01.getString("A4021FORMA");
                objRtn.A4021SERIE = rs01.getString("A4021SERIE");
                objRtn.A4021UUID = rs01.getString("A4021UUID");
                objRtn.A4021REFPG = rs01.getString("A4021REFPG");
                objRtn.A4021FECPG = rs01.getString("A4021FECPG");
                objRtn.A4021TOTPG = rs01.getDouble("A4021TOTPG");
                objRtn.A4021MDAPG = rs01.getString("A4021MDAPG");
                objRtn.A4021STAT = rs01.getString("A4021STAT");
                objRtn.A4021CODER = rs01.getString("A4021CODER");
                objRtn.A4021DESER = rs01.getString("A4021DESER");
                objRtn.A4021NRRPT = rs01.getString("A4021NRRPT");
                objRtn.A4021CDCLI = rs01.getString("A4021CDCLI");
                objRtn.A3953RSOCI = rs01.getString("A3953RSOCI");
                objRtn.A4021TOVTA = rs01.getDouble("A4021TOVTA");
                objRtn.A4021TODIF = rs01.getDouble("A4021TODIF");
                objRtn.A4021BANCO = rs01.getString("A4021BANCO");
                objRtn.A4021CTABC = rs01.getString("A4021CTABC");               
                //audit
                objRtn.A4021REGIS = rs01.getString("A4021REGIS");
                objRtn.A4021FREGI = rs01.getString("A4021FREGI");
                objRtn.A4021HREGI = rs01.getString("A4021HREGI");
                
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
}
