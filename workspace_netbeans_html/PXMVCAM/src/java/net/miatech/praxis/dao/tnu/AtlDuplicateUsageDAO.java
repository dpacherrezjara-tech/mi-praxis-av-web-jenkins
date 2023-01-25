/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package net.miatech.praxis.dao.tnu;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.A1547Filter;
import net.miatech.beans.spring.implement.IServerSession;
import static net.miatech.praxis.dao.tnu.AtlUsageNoSaleDAO.pasarGarbageCollector;
import net.miatech.praxis.exceptions.SpringException;
import org.apache.log4j.Logger;

/**
 *
 * @author vhidalgo
 */
public class AtlDuplicateUsageDAO {
    private IServerSession session;
    private static final Logger logError = Logger.getLogger("errorLog");
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    
    public AtlDuplicateUsageDAO() {
        
    }
    
    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public AtlDuplicateUsageDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }
    
    public List<A1547Filter> loadPX225S01A1547(A1547Filter filter) throws Exception {
        List<A1547Filter> lstRtn = new ArrayList<A1547Filter>(0);
        A1547Filter objRtn;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PX225S01A1547(?,?,?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            //config
            cstmt01.registerOutParameter(8, Types.INTEGER);
            cstmt01.registerOutParameter(9, Types.INTEGER);
            cstmt01.registerOutParameter(10, Types.INTEGER);
            cstmt01.registerOutParameter(11, Types.INTEGER);
            //in
            cstmt01.setString(1, filter.VP_OPCION );   
            cstmt01.setString(2, session.getUserView().getCustomerInfo().CCUST);   
            cstmt01.setString(3, filter.VP_TICKET);
            cstmt01.setString(4, filter.VP_TUSO);
            cstmt01.setString(5, filter.VP_FECHA1);
            cstmt01.setString(6, filter.VP_FECHA2);
            cstmt01.setString(7, filter.VP_NFLIGHT);
            //out
            cstmt01.setInt(8, filter.page.PAGE);
            cstmt01.setInt(9, filter.page.LIMIT);
            cstmt01.setInt(10, 0);//DEPRECATED
            cstmt01.setInt(11, filter.page.TOTROWS);
            
            cstmt01.execute();
            int TOTROWS = cstmt01.getInt(11);                
            rs01 = cstmt01.getResultSet();            
            while (rs01.next()) {                
                objRtn = new A1547Filter();
                objRtn.RN = rs01.getLong("RN");
                objRtn.A1547FUENT = rs01.getString("A1547FUENT").trim();
                objRtn.A1547AGTIA = rs01.getString("A1547AGTIA").trim();                
                objRtn.A1547TUSO = rs01.getString("A1547TUSO").trim();
                objRtn.A1547FUSO = rs01.getString("A1547FUSO").trim();
                objRtn.A1547CIA = rs01.getString("A1547CIA").trim();
                objRtn.A1547FORMA = rs01.getString("A1547FORMA").trim();
                objRtn.A1547SERIE = rs01.getString("A1547SERIE").trim();
                objRtn.A1547CUPON = rs01.getString("A1547CUPON").trim();
                objRtn.A1547ORIG = rs01.getString("A1547ORIG").trim();
                objRtn.A1547DEST = rs01.getString("A1547DEST").trim();
                objRtn.A1547NVLO = rs01.getString("A1547NVLO").trim();
                objRtn.A1547CARR = rs01.getString("A1547CARR").trim();
                objRtn.A1547VCPUS = rs01.getDouble("A1547VCPUS");
                objRtn.A1547MDARV = rs01.getString("A1547MDARV").trim();              
                objRtn.A1547TICKT = rs01.getString("A1547TICKT").trim();
                objRtn.page.TOTROWS = TOTROWS;                
                lstRtn.add(objRtn);
            }
        } catch (Exception ex) {
            String err = ex.getMessage();
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
}
