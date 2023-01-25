package net.miatech.praxis.dao.sales;

// <editor-fold defaultstate="collapsed" desc="Imports">
import java.math.BigDecimal;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.A1805Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.exceptions.SpringException;
import static org.apache.commons.lang.StringUtils.join;

// </editor-fold>
/**
 *
 * @author gsanchez
 */
public class ConsortiumCommissionsDAO {

    // <editor-fold defaultstate="collapsed" desc="Variables locales">
    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private String strSQL;
    // </editor-fold>

    public ConsortiumCommissionsDAO() {
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }
    
    public String getSQP01320(A1805Filter filter) throws SQLException, Exception
    {
         String sRtn="";
         
         strSQL = "{CALL " + session.getMainLibrary() + ".SQP01320(?,?,?,?,?,?,?,?,?,?,?,?)}";
         
         session.getCNXIBMDB2().openNative();
         try {
             cs = session.getCNXIBMDB2().getIBMDB2Connection().prepareCall(strSQL);
             
             cs.registerOutParameter(12, Types.VARCHAR);
                     
             cs.setString(1, filter.IN_A1805CCUST);
             cs.setString(2, filter.IN_A1805APL);
             cs.setString(3, filter.IN_A1805CLIEN);
             cs.setString(4, filter.IN_A1805POLIZ);
             cs.setString(5, filter.IN_A1805FECHA);
             cs.setString(6, filter.IN_A1805BATCH);
             cs.setString(7, filter.IN_A1805PROGA);
             cs.setString(8, filter.IN_A1805MODO);
             cs.setString(9, filter.IN_A1805FILE);
             cs.setString(10, session.getUserView().getUserInfo().USR);
             cs.setString(11, filter.IN_PARAM);
             cs.setString(12, filter.OU_A1805STATU);
             cs.execute();
             
             sRtn = cs.getString("IN_A1805STATU");
             //sRtn = "C";
         }finally {
            setClose();
        }
         
         return sRtn; 
    }
    
    public List<A1805Filter> downloadText(String filter) throws SQLException, Exception
    {
        List<A1805Filter> lstRtn = new ArrayList<>(0);
        A1805Filter objRtn;
            
       strSQL = "{CALL " + session.getMainLibrary() + ".PX158S02A1717(?)}";
        try {
             cnx = session.getCNXIBMDB2().getIBMDB2Connection();  cs = cnx.prepareCall(strSQL);
             
             cs.setString(1, filter);
             cs.execute();
             
             rst = cs.getResultSet();          
            
             while (rst.next()) {                 
                objRtn = new A1805Filter();

                objRtn.OU_TRAMATXT = rst.getString("LOTE");
                objRtn.OU_TRAMATXT = objRtn.OU_TRAMATXT.trim();
                String[] line = objRtn.OU_TRAMATXT.split("\\|");
                
                BigDecimal doFix;
                int intFix = 0;
                boolean flg = false;
                String tipo = "";                
                
                if(filter.substring(0, 3).equals("L80"))
                {
                    if(line[6].toString().trim().length()>0)
                    {
                        doFix = new BigDecimal(line[6].toString());
                        if(doFix == (new BigDecimal(0)))
                        {
                          line[6] = "";
                        }
                        else
                        {
                          line[6] = String.valueOf(doFix);
                        }
                    }
                    
                    if(line[12].toString().trim().length()>0)
                    {
                        doFix = new BigDecimal(line[12].toString());
                        if(doFix == (new BigDecimal(0)))
                        {
                          line[12] = "";
                        }
                        else
                        {
                          line[12] = String.valueOf(doFix);
                        }
                    }
                }
                
                if(filter.substring(0, 3).equals("L81"))
                {
                    if(line[2].toString().trim().length()>0)
                    {
                        doFix = new BigDecimal(line[2].toString());
                        if(doFix == (new BigDecimal(0)))
                        {
                          line[2] = "";
                        }
                        else
                        {
                          line[2] = String.valueOf(doFix);
                        }
                    }
                }
                
                objRtn.OU_TRAMATXT =  join(line,"|");
                
                lstRtn.add(objRtn);
             }
        }finally {
            setClose();
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
