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
import net.miatech.beans.SaleAudit.SQP01046Filter;
import net.miatech.beans.SaleAudit.SQP01059Filter;
import net.miatech.beans.SaleAudit.SQP01061Filter;
import net.miatech.beans.SaleAudit.SQP01072Filter;
import net.miatech.beans.SaleAudit.SQP01073Filter;
import net.miatech.beans.SaleAudit.SQP01075Filter;
import net.miatech.beans.SaleAudit.SQP01076Filter;
import net.miatech.beans.SaleAudit.SQP01086Filter;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

// </editor-fold>
/**
 *
 * @author jmeiggs
 */
public class TaxesByCodeDAO {

    private IServerSession session;
    private static final Logger logError = Logger.getLogger("errorLog");

    public void setSession(IServerSession ss) {
        session = ss;
    }
    
    public List<SQP01059Filter> getLoadSQP01059(SQP01059Filter filter) throws SQLException, Exception {
        List<SQP01059Filter> lstRtn = new ArrayList<SQP01059Filter>(0);
        SQP01059Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PXTTBS.SQP01059(?, ?)}";


        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            
            cstmt01.setString(1, filter.VP_COUNTRY);
            cstmt01.setString(2, filter.VP_TAXCODE);
            
            cstmt01.execute();
            
            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new SQP01059Filter();
                objRtn.A1224ORG = rs01.getString("A1224ORG").trim();
                objRtn.A1007NOMBR = rs01.getString("A1007NOMBR").trim();
                objRtn.A1334PDEP = rs01.getString("A1334PDEP").trim();
                objRtn.A1334PARR = rs01.getString("A1334PARR").trim();

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
    
    public List<SQP01061Filter> getLoadSQP01061(SQP01061Filter filter) throws SQLException, Exception {
        List<SQP01061Filter> lstRtn = new ArrayList<SQP01061Filter>(0);
        SQP01061Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PXTTBS.SQP01061(?, ?, ?, ?)}";


        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            
            cstmt01.setString(1, filter.VP_DATE);
            cstmt01.setString(2, filter.VP_COUNTRY);
            cstmt01.setString(3, filter.VP_TAXCODE);
            cstmt01.setString(4, filter.VP_TAXID);
            
            cstmt01.execute();
            
            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new SQP01061Filter();
                objRtn.IDTAX = rs01.getString("IDTAX").trim();
                objRtn.TAXNAME = rs01.getString("TAXNAME").trim();
                objRtn.CODCOUNTRY = rs01.getString("CODCOUNTRY").trim();
                objRtn.NOMCOUNTRY = rs01.getString("NOMCOUNTRY").trim();
                objRtn.TAXCODE = rs01.getString("TAXCODE").trim();
                objRtn.TAXDEFINITION = rs01.getString("TAXDEFINITION").trim();
                objRtn.APPDESCRIPTION = rs01.getString("APPDESCRIPTION").trim();
                objRtn.COLDESCRIPTION = rs01.getString("COLDESCRIPTION").trim();
                objRtn.APPICABLETO = rs01.getString("APPICABLETO").trim();
                objRtn.COMMENTS = rs01.getString("COMMENTS").trim();
                objRtn.INTERLINEABLE = rs01.getString("INTERLINEABLE").trim();
                objRtn.SELLING = rs01.getString("SELLING").trim();
                objRtn.LIFTING = rs01.getString("LIFTING").trim();
                objRtn.OTHERS = rs01.getString("OTHERS").trim();
                objRtn.SALE = rs01.getString("SALE").trim();
                objRtn.DEPARTURE = rs01.getString("DEPARTURE").trim();
                objRtn.ARRIVAL = rs01.getString("ARRIVAL").trim();
                objRtn.LASTDATE = rs01.getString("LASTDATE").trim();            

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
    
    public List<SQP01072Filter> getLoadSQP01072(SQP01072Filter filter) throws SQLException, Exception {
        List<SQP01072Filter> lstRtn = new ArrayList<SQP01072Filter>(0);
        SQP01072Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

         String SQLCLL01 = "{CALL PXTTBS.SQP01072(?,?,?,?,?)}";


        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            
            cstmt01.setString(1, filter.VP_DATE);
            cstmt01.setString(2, filter.VP_TAXCODE);
            cstmt01.setString(3, filter.VP_TAXID);
            cstmt01.setString(4, filter.VP_COUNTRY);
            cstmt01.setString(5, filter.VP_AIRPORT);
            
            cstmt01.execute();
            
            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new SQP01072Filter();
                objRtn.A1224EFD = rs01.getString("A1224EFD").trim();
                objRtn.A1224EXD = rs01.getString("A1224EXD").trim();
                objRtn.A1224LRT = rs01.getString("A1224LRT").trim();
                objRtn.A1224LAM = rs01.getString("A1224LAM").trim();
                objRtn.A1224LCU = rs01.getString("A1224LCU").trim();
                objRtn.A1224CODE = rs01.getString("A1224CODE").trim();
                objRtn.A1224DET = rs01.getString("A1224DET").trim();
                objRtn.A1224DAS = rs01.getString("A1224DAS").trim();
                objRtn.A1224DAT = rs01.getString("A1224DAT").trim();
                objRtn.A1224EAM = rs01.getString("A1224EAM").trim();

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
    
    public List<SQP01073Filter> getLoadSQP01073(SQP01073Filter filter) throws SQLException, Exception {
        List<SQP01073Filter> lstRtn = new ArrayList<SQP01073Filter>(0);
        SQP01073Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PXTTBS.SQP01073(?,?,?,?)}";


        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            
            cstmt01.setString(1, filter.VP_DATE);
            cstmt01.setString(2, filter.VP_AIRPORT);
            cstmt01.setString(3, filter.VP_TAXCODE);
            cstmt01.setString(4, filter.VP_TAXID);
            
            cstmt01.execute();
            
            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new SQP01073Filter();
                objRtn.A1232CEXEM = rs01.getString("A1232CEXEM").trim();
                objRtn.A1218DETA1 = rs01.getString("A1218DETA1").trim();
                objRtn.A1232EFD = rs01.getString("A1232EFD").trim();
                objRtn.A1232EXD = rs01.getString("A1232EXD").trim();                

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
    
    public List<SQP01075Filter> getLoadSQP01075(SQP01075Filter filter) throws SQLException, Exception {
        List<SQP01075Filter> lstRtn = new ArrayList<SQP01075Filter>(0);
        SQP01075Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PXTTBS.SQP01075(?)}";


        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            
            cstmt01.setString(1, filter.VP_COUNTRY);
            
            cstmt01.execute();
            
            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new SQP01075Filter();
                objRtn.A1224ORG = rs01.getString("A1224ORG").trim();
                objRtn.A1007NOMBR = rs01.getString("A1007NOMBR").trim();              

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
    
    public List<SQP01076Filter> getLoadSQP01076(SQP01076Filter filter) throws SQLException, Exception {
        List<SQP01076Filter> lstRtn = new ArrayList<SQP01076Filter>(0);
        SQP01076Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PXTTBS.SQP01076(?, ?)}";


        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            
            cstmt01.setString(1, filter.VP_COUNTRY);
            cstmt01.setString(2, filter.VP_AIRPORT);
            
            cstmt01.execute();
            
            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new SQP01076Filter();
                objRtn.A1202CODTA = rs01.getString("A1202CODTA").trim();
                objRtn.A1202IDTAX = rs01.getString("A1202IDTAX").trim();
                objRtn.A1202TNAME = rs01.getString("A1202TNAME").trim();     
                objRtn.A1334PDEP = rs01.getString("A1334PDEP").trim();     

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
    
    public List<SQP01086Filter> getLoadSQP01086(SQP01086Filter filter) throws SQLException, Exception {
        List<SQP01086Filter> lstRtn = new ArrayList<SQP01086Filter>(0);
        SQP01086Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PXTTBS.SQP01086(?, ?)}";


        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            
            cstmt01.setString(1, filter.VP_COUNTRY);
            cstmt01.setString(2, filter.VP_AIRPORT);
            
            cstmt01.execute();
            
            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new SQP01086Filter();
                objRtn.A1202CODTA = rs01.getString("A1202CODTA").trim();
                objRtn.A1202TNAME = rs01.getString("A1202TNAME").trim();     
                objRtn.A1334PARR = rs01.getString("A1334PARR").trim();     

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
