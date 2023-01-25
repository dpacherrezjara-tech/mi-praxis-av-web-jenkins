/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.dao.sales;


import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import net.miatech.beans.SaleAudit.SQP01597Filter;
import net.miatech.beans.implement.IServerSession;
//import static net.miatech.praxis.SaleAudit.dao.BackEndCommissionDAO.pasarGarbageCollector;
import net.miatech.utils.Functions;
import net.miatech.utils.TimeFormatToday;
import net.miatech.utils.WorkStation;
import org.apache.log4j.Logger;
/**
 *
 * @author jbazan
 */
public class BwrBackEndCommissionAsyncDAO implements Runnable {
    private SQP01597Filter filter;
    private IServerSession session;
    private static final Logger logError = Logger.getLogger("errorLog");
    BwrBackEndCommissionAsyncDAO(SQP01597Filter filter){
        this.filter = filter;
    }
    public BwrBackEndCommissionAsyncDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }
    
    
    @Override
    public void run(){
        Connection conn = null;
        CallableStatement cstmt= null; 
        
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        List<SQP01597Filter> lstRtn = new ArrayList<SQP01597Filter>(0);
        String SQLCLL01 = "{CALL PXCOMM.SQP01675(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}"; 
        Connection cnx = null;
        
        try{ 
            /*conn = Connection("Pdr"); 
            String query = "{ call "+ sp_name+"(?) }";
            cstmt = conn.prepareCall(query);
            cstmt.setString(1,"PDR_USER");
            cstmt.execute();*/
            
            
            cnx = session.getCNXIBMDB2().getIBMDB2Connection(); 
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(15, Types.VARCHAR);
            cstmt01.registerOutParameter(16, Types.VARCHAR);
            
            
            cstmt01.setString(1, filter.A3012AIRLI);
            cstmt01.setString(2, filter.A3012CODAC);
            cstmt01.setString(3, filter.A3012INDAC);
            cstmt01.setString(4, filter.A3012VRSAC);
            cstmt01.setString(5, filter.VP_ACTION );//Environment
            cstmt01.setString(6, filter.A3012APCUR);//TypeProcessCalc
            cstmt01.setString(7, filter.A3012APCURN);//Forma
            
            cstmt01.setString(8, filter.A3012COLOR);//CodigoForma
            
            cstmt01.setString(9, filter.A3012CDESQ);//TypeProccess
            
            cstmt01.setString(10, filter.A3012CURCO);//Year
            cstmt01.setString(11, filter.A3012CUROR);//typeperiod
            cstmt01.setString(12, filter.A3012DESCI);//Period
            cstmt01.setString(13, filter.A3012DESCR);//Pais
            cstmt01.setString(14, filter.A3012ERREX);//fuente
            
            
            /*cstmt01.setString(12, session.getUserView().getCustomerInfo().USR);
            cstmt01.setString(13, filter.A1155FINGR);
            cstmt01.setString(14, filter.A1155HINGR);
            cstmt01.setString(15, session.getUserView().getCustomerInfo().USR);
            cstmt01.setString(16, filter.A1155FMODI);
            cstmt01.setString(17, filter.A1155HMODI);*/
            
            
            cstmt01.execute();
            filter.OU_SQLCODE = cstmt01.getString(15);
            filter.OU_MESSAGE = cstmt01.getString(16);
            
            SQP01597Filter objRtn;
            objRtn = new SQP01597Filter();
            objRtn.OU_SQLCODE = filter.OU_SQLCODE;
            objRtn.OU_MESSAGE = filter.OU_MESSAGE;
            lstRtn.add(objRtn);
            
            
            
            
        } catch (SQLException ex) {
            java.util.logging.Logger.getLogger(BwrBackEndCommissionAsyncDAO.class.getName()).log(Level.SEVERE, null, ex);
        }finally{
            /*if(cstmt != null)
            cstmt.close();
            if(conn != null)close(conn);*/
            if (cstmt01 != null) {                
                try { cstmt01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        } 
    }
    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }
}
