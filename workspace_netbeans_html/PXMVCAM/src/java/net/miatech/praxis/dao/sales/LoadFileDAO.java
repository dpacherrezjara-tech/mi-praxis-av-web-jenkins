package net.miatech.praxis.dao.sales;

// <editor-fold defaultstate="collapsed" desc="Imports">
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.A1789Filter;
import net.miatech.beans.SQP01170Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.exceptions.SpringException;

// </editor-fold>
/**
 *
 * @author gsanchez
 */
public class LoadFileDAO {

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

    public List<SQP01170Filter> loadSQP01170(SQP01170Filter filter) throws SQLException, Exception {
        List<SQP01170Filter> lstRtn = new ArrayList<>(0);
        SQP01170Filter objRtn;
        String SQLCLL01 = "{CALL SQP01170(?,?,?,?,?,?,?)}";
         try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();            
            cs = cnx.prepareCall(SQLCLL01); 
            cs.registerOutParameter(4, Types.INTEGER);
            cs.registerOutParameter(5, Types.INTEGER); 
            cs.registerOutParameter(6, Types.INTEGER); 
            cs.registerOutParameter(7, Types.INTEGER); 
            
            cs.setString(1, filter.VP_CCUST );
            cs.setString(2, filter.VP_FCARGA1 );                        
            cs.setString(3, filter.VP_FCARGA2 );  
            
            cs.setInt(4, filter.page.PAGNUM);
            cs.setInt(5, filter.page.PAGROW);
            cs.setInt(6, filter.page.TOTPAG);
            cs.setInt(7, filter.page.TOTROW);
            
            cs.execute();            
            filter.page.PAGNUM = cs.getInt(4);
            filter.page.PAGROW = cs.getInt(5);
            filter.page.TOTPAG = cs.getInt(6);
            filter.page.TOTROW = cs.getInt(7);
                        
            rst = cs.getResultSet();
            while (rst.next()) {
                objRtn = new SQP01170Filter();                
                objRtn.CCUST = rst.getString("CCUST");                
                objRtn.FCARGA = rst.getString("FCARGA");                  
                objRtn.FPERDES = rst.getString("FPERDES");                
                objRtn.FPERHAS = rst.getString("FPERHAS");                
                objRtn.TOTALRE = rst.getInt("TOTALRE");
                objRtn.ESTADO = rst.getString("ESTADO"); 
                objRtn.USCREA = rst.getString("USCREA");
                objRtn.FECREA =  rst.getString("FECREA");   
                objRtn.HOCREA =  rst.getString("HOCREA"); 
                
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
    
    public void setSQP01117(A1789Filter filter) throws SQLException, Exception {
        String SQLCLL01 = "{CALL SQP01117("
                + "?,?,?,?,?,?,?,?,?,?,"
                + "?,?,?,?,?,?,?,?,?,?"
                + ")}";
        //String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP01117(?,?,?)}";
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(SQLCLL01);
            cs.registerOutParameter(19, Types.VARCHAR);
            cs.registerOutParameter(20, Types.VARCHAR);
            cs.setString(1, filter.VP_OPCION);
            cs.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cs.setString(3, filter.VP_FPERDES);
            cs.setString(4, filter.VP_FPERHAS);
            cs.setString(5, session.getUserView().getCustomerInfo().CCUST); //filter.A1789CIA);
            cs.setString(6, filter.A1789FORMA);
            cs.setString(7, filter.A1789SERIE);
            cs.setString(8, filter.A1789IATA);
            cs.setString(9, filter.A1789NGPS);
            cs.setString(10, filter.A1789SRES);
            cs.setString(11, filter.A1789PNR);
            cs.setString(12, filter.A1789TFORM);
            cs.setString(13, filter.A1789FECVT);
            cs.setDouble(14, filter.A1789TCAMB);
            cs.setString(15, filter.A1789MDA);
            cs.setDouble(16, filter.A1789TOTAL);
            cs.setString(17, filter.A1789NPAX);
            cs.setDouble(18, filter.A1789STOTA);
            cs.execute();
            filter.dbException.SQLCODE = cs.getString(19);
            filter.dbException.MESSAGE = cs.getString(20);
        } finally {
            setClose();
        }
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
