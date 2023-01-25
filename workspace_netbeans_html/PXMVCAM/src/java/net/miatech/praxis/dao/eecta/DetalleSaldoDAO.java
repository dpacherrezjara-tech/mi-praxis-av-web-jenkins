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
import net.miatech.praxis.eecta.SQP04000Filter;
import org.apache.log4j.Logger;

/**
 *
 * @author vhidalgo
 */
public class DetalleSaldoDAO {
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

    public List<SQP04000Filter> getSQP04000(SQP04000Filter filter) throws SQLException, Exception {
        List<SQP04000Filter> lstRtn = new ArrayList<SQP04000Filter>(0);
        SQP04000Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null, rs02 = null;
        String SQLCLL01 = "{CALL PXUATP.SQP04000(?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(11, Types.INTEGER);
            cstmt01.registerOutParameter(12, Types.INTEGER);
            cstmt01.registerOutParameter(13, Types.INTEGER);
            cstmt01.registerOutParameter(14, Types.INTEGER);            
            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.VP_FDATE1);
            cstmt01.setString(3, filter.VP_FDATE2);            
            cstmt01.setString(4, filter.VP_CDCLI);            
            cstmt01.setString(5, filter.VP_RSOCI);            
            cstmt01.setString(6, filter.VP_NRRPT);            
            cstmt01.setString(7, filter.VP_REFPG);            
            cstmt01.setString(8, filter.VP_CTABC);            
            cstmt01.setString(9, filter.VP_STSPG);            
            cstmt01.setString(10, filter.VP_BOLETO);                                 
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
                objRtn = new SQP04000Filter();
                objRtn.A3958CCUST =  rs01.getString("A3958CCUST");                
                objRtn.A3958CIA = rs01.getString("A3958CIA");
                objRtn.A3958FORMA = rs01.getString("A3958FORMA");
                objRtn.A3958SERIE = rs01.getString("A3958SERIE");
                objRtn.A3958SEQ = rs01.getString("A3958SEQ");
                objRtn.A3958NRRPT = rs01.getString("A3958NRRPT");
                objRtn.A3958SQRPT = rs01.getString("A3958SQRPT");
                objRtn.A3958CDCLI = rs01.getString("A3958CDCLI");
                objRtn.A3953RSOCI = rs01.getString("A3953RSOCI").trim();
                objRtn.A3958SOLER = rs01.getString("A3958SOLER");
                objRtn.A3958GESTR = rs01.getString("A3958GESTR");
                objRtn.A3958CFDI = rs01.getString("A3958CFDI");
                objRtn.A3958RFC = rs01.getString("A3958RFC");
                objRtn.A3958FECTB = rs01.getString("A3958FECTB");
                objRtn.A3958GRUPO = rs01.getString("A3958GRUPO");
                objRtn.A3958FPROC = rs01.getString("A3958FPROC");
                objRtn.A3958TRNCU = rs01.getString("A3958TRNCU");
                objRtn.A3958PNR = rs01.getString("A3958PNR");
                objRtn.A3958FEVTA = rs01.getString("A3958FEVTA");                
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

