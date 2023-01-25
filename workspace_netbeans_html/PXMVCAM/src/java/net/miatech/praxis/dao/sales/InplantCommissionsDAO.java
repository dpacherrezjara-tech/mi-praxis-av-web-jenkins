package net.miatech.praxis.dao.sales;

// <editor-fold defaultstate="collapsed" desc="Imports">
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.exceptions.SpringException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.PX116S01A1738Filter;
import net.miatech.beans.PX116S02A1710Filter;
import net.miatech.beans.PX116S03A1738Filter;
import org.apache.log4j.Logger;

// </editor-fold>
/**
 *
 * @author gsanchez
 * @update jbazan
 */
public class InplantCommissionsDAO {

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

    public List<PX116S01A1738Filter> loadPX116S01A1738(PX116S01A1738Filter filter) throws SQLException, Exception {
        List<PX116S01A1738Filter> lstRtn = new ArrayList<>(0);
        PX116S01A1738Filter objRtn;
        
        strSQL = "{CALL " + session.getMainLibrary() + ".PX116S01A1738(?,?,?,?,?,?,?,?,?)}";
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();  cs = cnx.prepareCall(strSQL);
            cs.registerOutParameter(6, Types.INTEGER);
            cs.registerOutParameter(7, Types.INTEGER);
            cs.registerOutParameter(8, Types.INTEGER);
            cs.registerOutParameter(9, Types.INTEGER);
            
            cs.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cs.setString(2, filter.IN_CIA);
            cs.setString(3, filter.IN_FORMA);
            cs.setString(4, filter.IN_SERIE);
            //cs.setString(5, filter.IN_CUPON);
            cs.setString(5, filter.IN_NLOTE);
            cs.setInt(6, filter.page.PAGNUM);
            cs.setInt(7, filter.page.PAGROW);
            cs.setInt(8, filter.page.TOTPAG);
            cs.setInt(9, filter.page.TOTROW);
            
            cs.execute();
            
            filter.page.PAGNUM = cs.getInt(6);
            filter.page.PAGROW = cs.getInt(7);
            filter.page.TOTPAG = cs.getInt(8);
            filter.page.TOTROW = cs.getInt(9);
            
            rst = cs.getResultSet();
            while (rst.next()) {
                objRtn = new PX116S01A1738Filter();
                objRtn.RN = rst.getLong("RN");
                objRtn.A1738CCUST = rst.getString("A1738CCUST");
                objRtn.A1738CIA = rst.getString("A1738CIA");
                objRtn.DOCUMENT = rst.getString("A1738FORMA") + rst.getString("A1738SERIE");
                objRtn.A1738FORMA = rst.getString("A1738FORMA");
                objRtn.A1738SERIE = rst.getString("A1738SERIE");
                objRtn.A1738CUPON = rst.getString("A1738CUPON");
                objRtn.A1738CORRL = rst.getString("A1738CORRL");
                objRtn.A1738NLOTE = rst.getString("A1738NLOTE");
                objRtn.A1738SLOTE = rst.getString("A1738SLOTE");
                objRtn.A1738TRNCU = rst.getString("A1738TRNCU");
                objRtn.A1738USCR = rst.getString("A1738USCR");
                objRtn.A1738FECR = rst.getString("A1738FECR");
                objRtn.A1738HOCR = rst.getString("A1738HOCR");
                objRtn.A1738USUP = rst.getString("A1738USUP");
                objRtn.A1738FEUP = rst.getString("A1738FEUP");
                objRtn.A1738HOUP = rst.getString("A1738HOUP");
                
                objRtn.A1738FVTA = rst.getString("A1738FVTA");
                objRtn.A1738MDACP = rst.getString("A1738MDACP");
                objRtn.A1738TOUR = rst.getString("A1738TOUR");
                objRtn.A1738IATA = rst.getString("A1738IATA");
                objRtn.A1738NVLO = rst.getString("A1738NVLO");
                objRtn.A1738SECOR = rst.getString("A1738SECOR");
                objRtn.A1738SECDS = rst.getString("A1738SECDS");
                objRtn.A1738CARR = rst.getString("A1738CARR");
                objRtn.A1738CLAS = rst.getString("A1738CLAS");
                objRtn.A1738FBAS = rst.getString("A1738FBAS");
                objRtn.A1738DESIG = rst.getString("A1738DESIG");
                objRtn.A1738VALCP = rst.getDouble("A1738VALCP");
                objRtn.A1738PAX = rst.getString("A1738PAX");
                objRtn.A1738FOP = rst.getString("A1738FOP");
                objRtn.A1738NTARJ = rst.getString("A1738NTARJ");
                objRtn.A1738TCRUC = rst.getString("A1738TCRUC");
                objRtn.A1738FCRUC = rst.getString("A1738FCRUC");
                objRtn.A1738VCPLC = rst.getDouble("A1738VCPLC");
                objRtn.A1738MDALC = rst.getString("A1738MDALC");
                objRtn.A1738ADC = rst.getDouble("A1738ADC");
                objRtn.A1738MDAAD = rst.getString("A1738MDAAD");
                
                objRtn.A720RUTA = rst.getString("A1738SECOR") + "-" + rst.getString("A1738SECDS");
                objRtn.A1738STPRO = rst.getString("A1738STPRO");
                objRtn.A1738STVTA = rst.getString("A1738STVTA");
                objRtn.A1738ERROR = rst.getString("A1738ERROR");
                /*
                objRtn.A720FECVTA = rst.getString("A720FECVTA");
                objRtn.A720MONREG = rst.getString("A720MONREG");
                objRtn.A720CODIT = rst.getString("A720CODIT");
                objRtn.A720AGENTE = rst.getString("A720AGENTE");
                
                objRtn.A720NVLO1 = rst.getString("A720NVLO1");
                objRtn.A720RUTA0 = rst.getString("A720RUTA0");
                objRtn.A720RUTA1 = rst.getString("A720RUTA1");
                objRtn.A720CARRA1 = rst.getString("A720CARRA1");
                objRtn.A720BOOKI1 = rst.getString("A720BOOKI1");
                objRtn.A720FBORI1 = rst.getString("A720FBORI1");
                objRtn.A720VALOR1 = rst.getDouble("A720VALOR1");
                
                objRtn.A720NVLO2 = rst.getString("A720NVLO2");
                objRtn.A720RUTA2 = rst.getString("A720RUTA2");
                objRtn.A720CARRA2 = rst.getString("A720CARRA2");
                objRtn.A720BOOKI2 = rst.getString("A720BOOKI2");
                objRtn.A720FBORI2 = rst.getString("A720FBORI2");
                objRtn.A720VALOR2 = rst.getDouble("A720VALOR2");
                
                objRtn.A720NVLO3 = rst.getString("A720NVLO3");
                objRtn.A720RUTA3 = rst.getString("A720RUTA3");
                objRtn.A720CARRA3 = rst.getString("A720CARRA3");
                objRtn.A720BOOKI3 = rst.getString("A720BOOKI3");
                objRtn.A720FBORI3 = rst.getString("A720FBORI3");
                objRtn.A720VALOR3 = rst.getDouble("A720VALOR3");
                
                objRtn.A720NVLO4 = rst.getString("A720NVLO4");
                objRtn.A720RUTA4 = rst.getString("A720RUTA4");
                objRtn.A720CARRA4 = rst.getString("A720CARRA4");
                objRtn.A720BOOKI4 = rst.getString("A720BOOKI4");
                objRtn.A720FBORI4 = rst.getString("A720FBORI4");
                objRtn.A720VALOR4 = rst.getDouble("A720VALOR4");
                */
                if(objRtn.A1738TRNCU.equals("RFND")){
                    objRtn.A1738VALCP = objRtn.A1738VALCP * -1;
                    objRtn.A1738VCPLC = objRtn.A1738VCPLC * -1;
                    objRtn.A1738ADC = objRtn.A1738ADC * -1;
                }
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
    
    public PX116S02A1710Filter loadPX116S02A1710() throws SQLException, Exception {
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        PX116S02A1710Filter filter = new PX116S02A1710Filter();

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX116S02A1710(?,?,?,?)}";
        Connection cnx = null;
        
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();  cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(2, Types.CHAR);
            cstmt01.registerOutParameter(3, Types.VARCHAR);
            cstmt01.registerOutParameter(4, Types.VARCHAR);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            
            cstmt01.execute();

            filter.OU_NLOTE = cstmt01.getString(2);
            filter.dbException.SQLCODE = cstmt01.getString(3);
            filter.dbException.MESSAGE = cstmt01.getString(4);
        } finally {
            if (rs01 != null) {
                try { rs01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
            }
            if (cstmt01 != null) {
                try { cstmt01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
        return filter;
    }
    
    public PX116S03A1738Filter loadPX116S03A1738(PX116S03A1738Filter filter) throws SQLException, Exception {
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX116S03A1738(?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();  
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(7, Types.VARCHAR);
            cstmt01.registerOutParameter(8, Types.VARCHAR);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_CIA);
            cstmt01.setString(3, filter.IN_FORMA);
            cstmt01.setString(4, filter.IN_SERIE.substring(0, 6));
            //cstmt01.setString(5, filter.IN_CUPON);
            cstmt01.setString(5, filter.IN_NLOTE);
            cstmt01.setLong(6, filter.IN_SLOTE);
            
            cstmt01.execute();

            filter.dbException.SQLCODE = cstmt01.getString(7);
            filter.dbException.MESSAGE = cstmt01.getString(8);
        } finally {
            if (rs01 != null) {
                try { rs01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
            }
            if (cstmt01 != null) {
                try { cstmt01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
        return filter;
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }
}
