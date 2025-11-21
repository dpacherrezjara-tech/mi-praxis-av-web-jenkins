package net.miatech.praxis.dao.payments;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Time;
import java.util.ArrayList;
import java.util.List;

import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.payment.MPFER90;
import org.apache.log4j.Logger;

public class DataImportMonitoringDAO {

    private IServerSession session;
     private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");
    
    
           public DataImportMonitoringDAO() {
    }
        
    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public DataImportMonitoringDAO(IServerSession ss) {
        session = ss;
    }
    
    
    
    
    
    public void setSession(IServerSession ss) {
        this.session = ss;
    }
    
    
    

    public List<MPFER90> listProcesses(MPFER90 filter)throws SQLException, Exception {

        List<MPFER90> listaData = new ArrayList<>();
        MPFER90 bean;
        
        String SQL = "{CALL PRAXISMP.MPS388(?)}";
        Connection cnx = null;
        CallableStatement cstmt = null;
        ResultSet rst = null;

        
        
        
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQL);
            
            cstmt.setString(1, filter.IN_PROCPAIS.trim());


            cstmt.execute();

           

            rst = cstmt.getResultSet();

            while (rst != null && rst.next()) {
                bean = new MPFER90();

                bean.PROCID = rst.getString("PROCID");
                bean.PROCNAME = rst.getString("PROCNAME");
                bean.PROCDESC = rst.getString("DESCRIP");
                bean.PROCSTATUS = rst.getString("PROCSTAT");
                bean.PROCPAIS = rst.getString("PROCPAIS");
                bean.PROCMESSAG = rst.getString("MENSA");
                bean.PROCFILE = rst.getString("PROCFILE");
                bean.PROCDATE = rst.getString("PROCDATE");
                bean.PROCINI = rst.getString("PROCINI");
                bean.PROCFIN = rst.getString("PROCFIN");
                bean.CPROGRAM = rst.getString("CPROGRAM");
                





                listaData.add(bean);
            }
            

        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        } finally {
            if (rst != null) try {
                rst.close();
            } catch (SQLException ignored) {
            }
            if (cstmt != null) try {
                cstmt.close();
            } catch (SQLException ignored) {
            }
            if (cnx != null) {
                session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            }
            pasarGarbageCollector();
        }

        return listaData;
        
    }
    
    
    
}

