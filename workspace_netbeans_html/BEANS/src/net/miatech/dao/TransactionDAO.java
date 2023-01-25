/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.dao;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.BSPF120Filter;
import net.miatech.beans.implement.IServerSession;
import net.miatech.praxis.BSPF120;

/**
 *
 * @author jruiz
 */
public class TransactionDAO {
    
    private IServerSession session;
    
    public TransactionDAO() {
    }
    
    public TransactionDAO(IServerSession ss) {
        session = ss;
    }
    
    public void setSession(IServerSession ss) {
        session = ss;
    }
    
    public List<BSPF120> loadTransactionsList(BSPF120Filter filter) throws SQLException {
        
        Statement stmt;
        ResultSet rst;
        BSPF120 bn;
        List<BSPF120> listData = new ArrayList<BSPF120>();
        
        StringBuilder strSQL = new StringBuilder();
        
        strSQL.append("CALL PRAXIS.BSPF120S004('").append(session.getUserView().getCustomerInfo().CCUST).append("',")
                .append("'").append(filter.TCODE).append("',")
                .append("'").append(filter.DESCRPI).append("',")
                .append("'").append(filter.FISSUE).append("',")
                .append("'").append(filter.FADM).append("',")
                .append("'").append(filter.FREFUND).append("',")
                .append("'").append(filter.FACM).append("')");
        Connection cnx = null;
        System.out.println(strSQL.toString());
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection(); 
            stmt = cnx.createStatement();
            rst = stmt.executeQuery(strSQL.toString());
            int pos = 0;
            
            while (rst.next()) {
                pos++;
                bn = new BSPF120();
                bn.CCUST = rst.getString("CCUST");
                bn.DESCRPI = rst.getString("DESCRPI");
                bn.FACM = rst.getString("FACM");
                bn.FADM = rst.getString("FADM");
                bn.FECR = rst.getString("FECR");
                bn.FEUP = rst.getString("FEUP");
                bn.FISSUE = rst.getString("FISSUE");
                bn.FREFUND = rst.getString("FREFUND");
                bn.HOCR = rst.getString("HOCR");
                bn.HOUP = rst.getString("HOUP");
                bn.TCODE = rst.getString("TCODE");
                bn.USCR = rst.getString("USCR");
                bn.USUP = rst.getString("USUP");
                listData.add(bn);
            }
            
        } finally {
            stmt = null;
            rst = null;
            strSQL = null;
            bn = null;
        }
        
        return listData;
    }
    
    public int maintanceTransaction(String strOption, BSPF120 bn) throws SQLException {
        
        Statement stmt = null;
        int result = -1;
        /*
         IN   IN_CHOPTION CHAR(1),
         IN   IN_VCCCUST  VARCHAR(3),
         IN   IN_VCTCODE VARCHAR(4),
         IN   IN_VCDESCRPI VARCHAR(40),
         IN   IN_CHFISSUE CHAR(1), 
         IN   IN_CHFADM CHAR(1),
         IN   IN_CHFREFUND CHAR(1),
         IN   IN_CHFACM CHAR(1),
         IN   IN_VCUSCR VARCHAR(10),
         IN   IN_VCUSUP VARCHAR(10)
         
         */
        StringBuilder strSQL = new StringBuilder();
        
        strSQL.append("CALL PRAXIS.BSPF120S003('").append(strOption).append("',")
                .append("'").append(session.getUserView().getCustomerInfo().CCUST).append("',")
                .append("'").append(bn.TCODE).append("',")
                .append("'").append(bn.DESCRPI).append("',")
                .append("'").append(bn.FISSUE).append("',")
                .append("'").append(bn.FADM).append("',")
                .append("'").append(bn.FREFUND).append("',")
                .append("'").append(bn.FACM).append("',")
                .append("'").append(session.getUserView().getUserInfo().USR).append("',")
                .append("'").append(session.getUserView().getUserInfo().USR).append("')");
        
        Connection cnx = null;
        System.out.println(strSQL.toString());
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection(); 
            stmt = cnx.createStatement();
            result = stmt.executeUpdate(strSQL.toString());
            
        } finally {
            stmt = null;
            strSQL = null;
            bn = null;
        }
        
        System.out.println(result);
        return result;
    }
}
