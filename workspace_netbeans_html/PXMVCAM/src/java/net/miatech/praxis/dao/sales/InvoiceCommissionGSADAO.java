package net.miatech.praxis.dao.sales;

// <editor-fold defaultstate="collapsed" desc="Imports">
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.PX144S01A1775Filter;
import net.miatech.beans.PX144S01A1826Filter;
import net.miatech.beans.PX144S02A1826Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.exceptions.SpringException;

// </editor-fold>
/**
 *
 * @author gsanchez
 */
public class InvoiceCommissionGSADAO {

    // <editor-fold defaultstate="collapsed" desc="Variables locales">
    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private String strSQL;
    // </editor-fold>

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<PX144S01A1826Filter> loadPX144S01A1826(PX144S01A1826Filter filter) throws SQLException, Exception {
        List<PX144S01A1826Filter> lstRtn = new ArrayList<>(0);
        PX144S01A1826Filter objRtn;

        strSQL = "{CALL PX144S01A1826(?,?,?,?,?,?,?,?)}";
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();            
            cs = cnx.prepareCall(strSQL);    
            cs.registerOutParameter(5, Types.INTEGER);
            cs.registerOutParameter(6, Types.INTEGER);
            cs.registerOutParameter(7, Types.INTEGER);
            cs.registerOutParameter(8, Types.INTEGER);

            cs.setString(1, filter.VP_A1826CCUST);
            cs.setString(2, filter.VP_A1826GSA);
            cs.setString(3, filter.VP_A1826LOTE);
            cs.setString(4, filter.VP_A1826FFACT);
            cs.setInt(5, filter.page.PAGNUM);
            cs.setInt(6, filter.page.PAGROW);
            cs.setInt(7, filter.page.TOTPAG);
            cs.setInt(8, filter.page.TOTROW);            
            cs.execute();
            filter.page.PAGNUM = cs.getInt(5);
            filter.page.PAGROW = cs.getInt(6);
            filter.page.TOTPAG = cs.getInt(7);
            filter.page.TOTROW = cs.getInt(8);
            
            rst = cs.getResultSet();
            while (rst.next()) {
                objRtn = new PX144S01A1826Filter();                
                objRtn.A1826CCUST = rst.getString("A1826CCUST") ;
                objRtn.A1826LOTE = rst.getString("A1826LOTE") ;                
                objRtn.A1826GSA = rst.getString("A1826GSA") ;
                objRtn.A1826NFACT = rst.getString("A1826NFACT") ;
                objRtn.A1826SEQ = rst.getString("A1826SEQ");
                objRtn.A1826FFACT = rst.getString("A1826FFACT");
                objRtn.A1826FPROC = rst.getString("A1826FPROC");
                objRtn.A1826MONED = rst.getString("A1826MONED");
                objRtn.A1826PAIS = rst.getString("A1826PAIS");
                objRtn.A1826TFAC = rst.getString("A1826TFAC");
                objRtn.A1826TPER = rst.getString("A1826TPER");
                objRtn.A1826TCOM = rst.getDouble("A1826TCOM");    
                objRtn.A1826STATU = rst.getString("A1826STATU");                     
                objRtn.A1826INDCO = rst.getString("A1826INDCO");    
                objRtn.A1826IDCON = rst.getString("A1826IDCON");                 
                objRtn.A1826UCONT = rst.getString("A1826UCONT"); 
                objRtn.A1826FCONT = rst.getString("A1826FCONT"); 
                objRtn.A1826HCONT = rst.getString("A1826HCONT"); 
                objRtn.A1826REGIS = rst.getString("A1826REGIS"); 
                objRtn.A1826FREGI = rst.getString("A1826FREGI"); 
                objRtn.A1826HREGI = rst.getString("A1826HREGI"); 
                objRtn.A1826REVIS = rst.getString("A1826REVIS"); 
                objRtn.A1826FREVI = rst.getString("A1826FREVI"); 
                objRtn.A1826HREVI = rst.getString("A1826HREVI");
                objRtn.A1839RSOC = rst.getString("A1839RSOC");
                objRtn.A1826FRECE = rst.getString("A1826FRECE");
                objRtn.TFACTURA = rst.getString("TFACTURA");
                
                //Pagin
                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;
                lstRtn.add(objRtn);
            }
        } finally {
            setClose();
        }
        return lstRtn;
    }
    
    public PX144S02A1826Filter  setPX144S02A1826( PX144S02A1826Filter filter ) throws SQLException, Exception {        
        strSQL = "{CALL PX144S02A1826(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();            
            cs = cnx.prepareCall(strSQL);  
            cs.registerOutParameter(14, Types.VARCHAR);
            cs.registerOutParameter(15, Types.VARCHAR);
            
            cs.setString(1, filter.VP_ACTION );
            cs.setString(2, filter.VP_A1826CCUST );
            cs.setString(3, filter.VP_A1826LOTE );
            cs.setString(4, filter.VP_A1826GSA);
            cs.setString(5, filter.VP_A1826FPROC);
            cs.setString(6, filter.VP_A1826MONED);                        
            cs.setDouble(7, filter.VP_A1826TCOM);            
            cs.setString(8, filter.VP_A1826NFACT.trim() ); 
            cs.setString(9, filter.VP_A1826FFACT ); 
            cs.setString(10, filter.VP_A1826STATU ); 
            cs.setString(11, filter.VP_A1826SEQ );
            cs.setString(12, filter.VP_A1826TFAC );
            cs.setString(13, filter.VP_A1826TPER );
            
            cs.execute();                        
            filter.dbException.SQLCODE = cs.getString(14);
            filter.dbException.MESSAGE = cs.getString(15);                        
        } finally {
            setClose();
        }
        return filter;
    }
    
    public List<PX144S01A1775Filter> loadPX144S01A1775(PX144S01A1775Filter filter) throws SQLException, Exception {
        List<PX144S01A1775Filter> lstRtn = new ArrayList<>(0);
        PX144S01A1775Filter objRtn;

        strSQL = "{CALL PX144S01A1775(?,?,?,?,?)}";
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();            
            cs = cnx.prepareCall(strSQL);            
            cs.setString(1, filter.VP_CCUST);
            cs.setString(2, filter.VP_GSA);
            cs.setString(3, filter.VP_LOTE);                        
            cs.setString(4, filter.VP_FPROC_LOTE);                        
            cs.setString(5, filter.VP_TYPE_COMM);
            cs.execute();            
            rst = cs.getResultSet();
            while (rst.next()) {
                objRtn = new PX144S01A1775Filter();                                                
                objRtn.TOT_COMM_GIVE = rst.getDouble("TOT_COMM_GIVE");
                objRtn.MONEDA_PAGO = rst.getString("MONEDA_PAGO");
                lstRtn.add(objRtn);
            }
        } finally {
            setClose();
        }
        return lstRtn;
    }
    
    public String get_PX112S03A1757( String VP_OPTION, String VP_PARAM  ) throws SQLException, Exception {        
        String lstRtn = "";
        
        String SQLCLL01 = "{CALL PX112S03A1757(?,?,?)}";
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();            
            cs = cnx.prepareCall(SQLCLL01);  
            cs.registerOutParameter(3, Types.VARCHAR);
            cs.setString(1, VP_OPTION );
            cs.setString(2, VP_PARAM );
            cs.execute();
            lstRtn = cs.getString(3);
            
        } finally {
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
