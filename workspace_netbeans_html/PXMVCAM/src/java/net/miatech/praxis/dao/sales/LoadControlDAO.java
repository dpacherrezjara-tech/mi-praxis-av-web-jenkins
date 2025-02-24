package net.miatech.praxis.dao.sales;

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
import net.miatech.beans.PX019S01A1348Filter;
import net.miatech.beans.PX019S01A1536Filter;
import net.miatech.beans.PX019S01A1697Filter;
import net.miatech.beans.PX019S01A1698Filter;
import net.miatech.beans.PX037S06PRO9822Filter;
import net.miatech.beans.PX037S07PRO9876Filter;
import net.miatech.beans.PX037S08A1724Filter;
import net.miatech.beans.PX074S01PPRO9824Filter;
import net.miatech.beans.PX074S02PRO9878Filter;
import net.miatech.beans.SPPRO10042Filter;
import net.miatech.beans.SQP03605Filter;
import net.miatech.beans.SQP03606Filter;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

// </editor-fold>

/**
 *
 * @author gsanchez
 */
public class LoadControlDAO {

    private IServerSession session;
    private static final Logger logError = Logger.getLogger("errorLog");

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<PX019S01A1698Filter> loadPX019S01A1698(PX019S01A1698Filter filter) throws SQLException, Exception {
        List<PX019S01A1698Filter> lstRtn = new ArrayList<PX019S01A1698Filter>(0);
        PX019S01A1698Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PX019S01A1698(?,?,?,?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();  cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(9, Types.INTEGER);
            cstmt01.registerOutParameter(10, Types.INTEGER);
            cstmt01.registerOutParameter(11, Types.INTEGER);
            cstmt01.registerOutParameter(12, Types.INTEGER);
            
//          cstmt01.setString(1, filter.IN_A1698CCUST);
            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_A1698SOURC);
            cstmt01.setString(3, filter.IN_A1698PAIS);
            cstmt01.setString(4, filter.IN_A1698BANK);
            cstmt01.setString(5, filter.IN_A1698FPRDA);
            cstmt01.setString(6, filter.IN_A1698FFILE);
            cstmt01.setString(7, filter.IN_A1698HFILE);
            cstmt01.setString(8, filter.IN_A1698FREGI);
            cstmt01.setInt(9, filter.page.PAGNUM);
            cstmt01.setInt(10, filter.page.PAGROW);
            cstmt01.setInt(11, filter.page.TOTPAG);
            cstmt01.setInt(12, filter.page.TOTROW);
            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(9);
            filter.page.PAGROW = cstmt01.getInt(10);
            filter.page.TOTPAG = cstmt01.getInt(11);
            filter.page.TOTROW = cstmt01.getInt(12);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new PX019S01A1698Filter();                 
                objRtn.NO = rs01.getInt("NO");
                objRtn.A1698BANK = rs01.getString("A1698BANK");
                objRtn.A1698CCUST = rs01.getString("A1698CCUST");
                objRtn.A1698FCARG = rs01.getString("A1698FCARG");
                objRtn.A1698FFILE = rs01.getString("A1698FFILE");
                objRtn.A1698FPRDA = rs01.getString("A1698FPRDA");
                objRtn.A1698HCARG = rs01.getString("A1698HCARG");                
                objRtn.A1698HFILE = rs01.getString("A1698HFILE");
                objRtn.A1698IDFIL = rs01.getString("A1698IDFIL");
                objRtn.A1698LINE = rs01.getInt("A1698LINE");
                objRtn.A1698PAIS = rs01.getString("A1698PAIS");
                objRtn.A1698SQNR = rs01.getInt("A1698SQNR");
                objRtn.A1698STCAR = rs01.getString("A1698STCAR");
                objRtn.A1698STREC = rs01.getString("A1698STREC");
                objRtn.A1698UCARG = rs01.getString("A1698UCARG"); 
                objRtn.A1698SOURC = rs01.getString("A1698SOURC");                                
                objRtn.A1698STREC_00 = rs01.getString("A1698STREC_00");
                objRtn.A1698STCAR_00 = rs01.getString("A1698STCAR_00");
                objRtn.A1698STPRO_00 = rs01.getString("A1698STPRO_00");
                objRtn.A1698FPRDA_00 = rs01.getString("A1698FPRDA_00");
                objRtn.A1698FFILE_00 = rs01.getString("A1698FFILE_00");                	                
                objRtn.A1698FREGI = rs01.getString("A1698FREGI");                	                
                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;
                lstRtn.add(objRtn);
            }
        } finally {
            if (rs01 != null) try { rs01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }            
            if (cstmt01 != null) try { cstmt01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }            
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
        return lstRtn;
    }
    
    public List<PX037S08A1724Filter> loadPX037S08A1724(PX037S08A1724Filter filter) throws SQLException, Exception {
        List<PX037S08A1724Filter> lstRtn = new ArrayList<PX037S08A1724Filter>(0);
        PX037S08A1724Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PX037S08A1724(?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();  cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(4, Types.INTEGER);
            cstmt01.registerOutParameter(5, Types.INTEGER);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            
            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_IDFIL);
            cstmt01.setString(3, filter.IN_FUENT);
            cstmt01.setInt(4, filter.page.PAGNUM);
            cstmt01.setInt(5, filter.page.PAGROW);
            cstmt01.setInt(6, filter.page.TOTPAG);
            cstmt01.setInt(7, filter.page.TOTROW);
            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(4);
            filter.page.PAGROW = cstmt01.getInt(5);
            filter.page.TOTPAG = cstmt01.getInt(6);
            filter.page.TOTROW = cstmt01.getInt(7);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new PX037S08A1724Filter();                 
                objRtn.RN = rs01.getLong("RN");
                objRtn.A1724CCUST = rs01.getString("A1724CCUST");
                objRtn.A1724IDFIL = rs01.getString("A1724IDFIL");
                objRtn.A1724GRUPO = rs01.getString("A1724GRUPO");
                objRtn.A1724TRANS = rs01.getString("A1724TRANS");              
                objRtn.A1724CIA = rs01.getString("A1724CIA");
                objRtn.A1724FORMA = rs01.getString("A1724FORMA");
                objRtn.A1724SERIE = rs01.getString("A1724SERIE");
                objRtn.A1724SEQ = rs01.getString("A1724SEQ");
                objRtn.A1724CUPON = rs01.getString("A1724CUPON");
                objRtn.A1724TIPO = rs01.getString("A1724TIPO");
                objRtn.A1724CORRL = rs01.getString("A1724CORRL");
                objRtn.A1724ARCH = rs01.getString("A1724ARCH");
                objRtn.A1724CAMPO = rs01.getString("A1724CAMPO");
                objRtn.A1724CODER = rs01.getString("A1724CODER");
                objRtn.A1724CORRE = rs01.getString("A1724CORRE");
                objRtn.A1724FUENT = rs01.getString("A1724FUENT");
                objRtn.A1724SFUEN = rs01.getString("A1724SFUEN");
                objRtn.A1724CIUVT = rs01.getString("A1724CIUVT");
                objRtn.A1724PSVTA = rs01.getString("A1724PSVTA");
                objRtn.A1724AGENT = rs01.getString("A1724AGENT");
                objRtn.A1724FHAST = rs01.getString("A1724FHAST");
                objRtn.A1724FPROC = rs01.getString("A1724FPROC");
                objRtn.A1724PROG = rs01.getString("A1724PROG");
                objRtn.A1724LINE = rs01.getInt("A1724LINE");
                objRtn.A1724DATA = rs01.getString("A1724DATA");
                objRtn.A1724STSER = rs01.getString("A1724STSER");
                objRtn.A1724TIPCO = rs01.getString("A1724TIPCO");
                objRtn.A1724USRFZ = rs01.getString("A1724USRFZ");
                objRtn.A1724FECFZ = rs01.getString("A1724FECFZ");
                objRtn.A1724HORFZ = rs01.getString("A1724HORFZ");
                objRtn.A1724USRIN = rs01.getString("A1724USRIN");
                objRtn.A1724FECIN = rs01.getString("A1724FECIN");
                objRtn.A1724HORIN = rs01.getString("A1724HORIN");
                objRtn.A1724USRAC = rs01.getString("A1724USRAC");
                objRtn.A1724FECAC = rs01.getString("A1724FECAC");
                objRtn.A1724HORAC = rs01.getString("A1724HORAC");
                objRtn.A1272DES = rs01.getString("A1272DES");
                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;
                lstRtn.add(objRtn);
            }
        } finally {
            if (rs01 != null) try { rs01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }            
            if (cstmt01 != null) try { cstmt01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }            
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
        return lstRtn;
    }
    
    public List<PX019S01A1536Filter> loadPX019S01A1536( PX019S01A1536Filter filter) throws SQLException, Exception {
        List<PX019S01A1536Filter> lstRtn = new ArrayList<PX019S01A1536Filter>(0);
        PX019S01A1536Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PX019S01A1536TXT(?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();  cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(1, Types.INTEGER);
            cstmt01.registerOutParameter(2, Types.INTEGER);
            cstmt01.registerOutParameter(3, Types.INTEGER);
            cstmt01.registerOutParameter(4, Types.INTEGER);
            
            cstmt01.setInt(1, filter.page.PAGNUM);
            cstmt01.setInt(2, filter.page.PAGROW);
            cstmt01.setInt(3, filter.page.TOTPAG);
            cstmt01.setInt(4, filter.page.TOTROW);
            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(1);
            filter.page.PAGROW = cstmt01.getInt(2);
            filter.page.TOTPAG = cstmt01.getInt(3);
            filter.page.TOTROW = cstmt01.getInt(4);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new PX019S01A1536Filter();
                objRtn.DELIVERY = rs01.getString("DELIVERY");
                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;
                lstRtn.add(objRtn);
            }
        } finally {
            if (rs01 != null) try { rs01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }            
            if (cstmt01 != null) try { cstmt01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }            
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
        return lstRtn;
    }
    
    public List<PX019S01A1697Filter> loadPX019S01A1697(PX019S01A1697Filter filter) throws SQLException, Exception {
        List<PX019S01A1697Filter> lstRtn = new ArrayList<PX019S01A1697Filter>(0);
        PX019S01A1697Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PX019S01A1697(?,?,?,?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();  cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(9, Types.INTEGER);
            cstmt01.registerOutParameter(10, Types.INTEGER);
            cstmt01.registerOutParameter(11, Types.INTEGER);
            cstmt01.registerOutParameter(12, Types.INTEGER);
            
            // cstmt01.setString(1, filter.IN_A1697CCUST);
            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_A1697SOURC);
            cstmt01.setString(3, filter.IN_A1697PAIS);
            cstmt01.setString(4, filter.IN_A1697BANK);
            cstmt01.setString(5, filter.IN_A1697FPRDA);
            cstmt01.setString(6, filter.IN_A1697FFILE);
            cstmt01.setString(7, filter.IN_A1697HFILE);
            cstmt01.setString(8, filter.IN_A1697FREGI);
            cstmt01.setInt(9, filter.page.PAGNUM);
            cstmt01.setInt(10, filter.page.PAGROW);
            cstmt01.setInt(11, filter.page.TOTPAG);
            cstmt01.setInt(12, filter.page.TOTROW);
            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(9);
            filter.page.PAGROW = cstmt01.getInt(10);
            filter.page.TOTPAG = cstmt01.getInt(11);
            filter.page.TOTROW = cstmt01.getInt(12);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new PX019S01A1697Filter();                 
                objRtn.NO = rs01.getInt("NO");
                objRtn.A1697CCUST = rs01.getString("A1697CCUST");
                objRtn.A1697SOURC = rs01.getString("A1697SOURC");
                objRtn.A1697PAIS = rs01.getString("A1697PAIS");
                objRtn.A1697BANK = rs01.getString("A1697BANK");              
                objRtn.A1697FPRDA = rs01.getString("A1697FPRDA");
                objRtn.A1697FFILE = rs01.getString("A1697FFILE");
                objRtn.A1697HFILE = rs01.getString("A1697HFILE");
                objRtn.A1697CDERR = rs01.getString("A1697CDERR");
                objRtn.A1697SEQ = rs01.getString("A1697SEQ");
                objRtn.A1697IDFIL = rs01.getString("A1697IDFIL");
                objRtn.A1697REGIS = rs01.getString("A1697REGIS");
                objRtn.A1697FREGI = rs01.getString("A1697FREGI");
                objRtn.A1697HREGI = rs01.getString("A1697HREGI");
                objRtn.A1697REGVI = rs01.getString("A1697REGVI");
                objRtn.A1697FREVI = rs01.getString("A1697FREVI");
                objRtn.A1697HREVI = rs01.getString("A1697HREVI");
                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;
                lstRtn.add(objRtn);
            }
        } finally {
            if (rs01 != null) try { rs01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }            
            if (cstmt01 != null) try { cstmt01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }            
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
        return lstRtn;
    }
    
    public List<PX019S01A1348Filter> loadPX019S01A1348( PX019S01A1348Filter filter) throws SQLException, Exception {
        List<PX019S01A1348Filter> lstRtn = new ArrayList<PX019S01A1348Filter>(0);
        PX019S01A1348Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PX019S01A1348TXT(?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();  cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(1, Types.INTEGER);
            cstmt01.registerOutParameter(2, Types.INTEGER);
            cstmt01.registerOutParameter(3, Types.INTEGER);
            cstmt01.registerOutParameter(4, Types.INTEGER);
            
            cstmt01.setInt(1, filter.page.PAGNUM);
            cstmt01.setInt(2, filter.page.PAGROW);
            cstmt01.setInt(3, filter.page.TOTPAG);
            cstmt01.setInt(4, filter.page.TOTROW);
            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(1);
            filter.page.PAGROW = cstmt01.getInt(2);
            filter.page.TOTPAG = cstmt01.getInt(3);
            filter.page.TOTROW = cstmt01.getInt(4);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new PX019S01A1348Filter();
                objRtn.DELIVERY = rs01.getString("DELIVERY");
                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;
                lstRtn.add(objRtn);
            }
        } finally {
            if (rs01 != null) try { rs01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }            
            if (cstmt01 != null) try { cstmt01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }            
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
        return lstRtn;
    }
    
    public PX074S02PRO9878Filter loadPX074S02PRO9878(PX074S02PRO9878Filter filter) throws SQLException, Exception {
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PX074S02PRO9878(?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();  cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(4, Types.CHAR);
            
            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_PROGRAM);
            cstmt01.setInt(3, filter.IN_NROID);
            cstmt01.execute();

            filter.OU_STATUS = cstmt01.getString(4);
        } finally {
            if (rs01 != null) try { rs01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
            if (cstmt01 != null) try { cstmt01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }            
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
        return filter;
    }
    
    public PX074S01PPRO9824Filter loadPX074S01PPRO9824(PX074S01PPRO9824Filter filter) throws SQLException, Exception {
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PX074S01PPRO9824(?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();  cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(2, Types.INTEGER);
            cstmt01.registerOutParameter(3, Types.CHAR);
            
            cstmt01.setString(1, filter.IN_PROGRAM);
            cstmt01.execute();

            filter.OU_QTYREG = cstmt01.getInt(2);
            filter.OU_STATUS = cstmt01.getString(3);
        } finally {
            if (rs01 != null) try { rs01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }            
            if (cstmt01 != null) try { cstmt01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }            
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
        return filter;
    }
    
    public SQP03605Filter loadSQP03605Filter(SQP03605Filter filter) throws SQLException, Exception {
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL SQP03605(?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();  cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(2, Types.INTEGER);
            cstmt01.registerOutParameter(3, Types.CHAR);            
            cstmt01.setString(1, filter.VP_CCUST);
            cstmt01.execute();
            filter.dbException.SQLCODE = cstmt01.getString(2);
            filter.dbException.MESSAGE = cstmt01.getString(3);
            
        } finally {
            if (rs01 != null) try { rs01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }            
            if (cstmt01 != null) try { cstmt01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }            
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
        return filter;
    }
     public SQP03606Filter loadSQP03606Filter(SQP03606Filter filter) throws SQLException, Exception {
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL SQP03606(?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();  cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(3, Types.INTEGER);
            cstmt01.registerOutParameter(4, Types.CHAR);            
            cstmt01.setString(1, filter.VP_CCUST);
            cstmt01.setString(2, filter.VP_NROID);
            cstmt01.execute();
            filter.dbException.SQLCODE = cstmt01.getString(3);
            filter.dbException.MESSAGE = cstmt01.getString(4);
            
        } finally {
            if (rs01 != null) try { rs01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }            
            if (cstmt01 != null) try { cstmt01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }            
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
        return filter;
    }
    
    public PX037S06PRO9822Filter loadPX037S06PRO9822(PX037S06PRO9822Filter filter) throws SQLException, Exception {
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PX037S06PRO9822(?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();  cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(2, Types.INTEGER);
            cstmt01.registerOutParameter(3, Types.CHAR);
            
            cstmt01.setString(1, filter.IN_PROGRAM);
            cstmt01.execute();

            filter.OU_QTYREG = cstmt01.getInt(2);
            filter.OU_STATUS = cstmt01.getString(3);
        } finally {
            if (rs01 != null) try { rs01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }            
            if (cstmt01 != null) try { cstmt01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }            
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
        return filter;
    }

    public PX037S07PRO9876Filter loadPX037S07PRO9876(PX037S07PRO9876Filter filter) throws SQLException, Exception {
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PX037S07PRO9876(?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();  cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(4, Types.CHAR);
            
            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_PROGRAM);
            cstmt01.setInt(3, filter.IN_NROID);
            cstmt01.execute();

            filter.OU_STATUS = cstmt01.getString(4);
        } finally {
            if (rs01 != null) try { rs01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
            if (cstmt01 != null) try { cstmt01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }            
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
        return filter;
    }
    
    public SPPRO10042Filter setSPPRO10042(SPPRO10042Filter filter) throws SQLException, Exception {
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL SPPRO10042(?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();  
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(4, Types.INTEGER);
            cstmt01.registerOutParameter(5, Types.CHAR);
            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.VP_PRDA);
            cstmt01.setString(3, filter.VP_FUENT);
            cstmt01.execute();
            filter.dbException.SQLCODE = String.valueOf(cstmt01.getInt(4));
            filter.dbException.MESSAGE = cstmt01.getString(5);
            
        } finally {
            if (rs01 != null) try { rs01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
            if (cstmt01 != null) try { cstmt01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }            
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
