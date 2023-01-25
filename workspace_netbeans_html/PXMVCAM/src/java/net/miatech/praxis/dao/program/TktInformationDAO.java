package net.miatech.praxis.dao.program;

//<editor-fold defaultstate="collapsed" desc="import">
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.exceptions.SpringException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.PX036S01A1531Filter;
import net.miatech.beans.PX036S01A1532Filter;
import net.miatech.beans.PX036S01A1533Filter;
import net.miatech.beans.PX036S01A1534Filter;
import net.miatech.beans.PX036S01A1721Filter;
import net.miatech.beans.S0001A1730Filter;
import org.apache.log4j.Logger;

//</editor-fold>
/**
 *
 * @author gsanchez
 */
public class TktInformationDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public void setSession(IServerSession ss) {
        session = ss;
    }
    
    public List<PX036S01A1721Filter> loadPX036S01A1721( PX036S01A1721Filter filter  ) throws SQLException, Exception {
        List<PX036S01A1721Filter> lstRtn = new ArrayList<PX036S01A1721Filter>(0);
        PX036S01A1721Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PX036S01A1721(?,?,?,?,?)}";
        Connection cnx = null;
        
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();  cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.setString(1, filter.IN_AIRLIN);
            cstmt01.setString(2, filter.IN_CIA);
            cstmt01.setString(3, filter.IN_FORMA);
            cstmt01.setString(4, filter.IN_SERIE);
            cstmt01.setString(5, filter.A1721SEQ);
            cstmt01.execute();
            
            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new PX036S01A1721Filter();
                objRtn.A1721CCUST = rs01.getString("A1721CCUST");
                objRtn.A1721CIA = rs01.getString("A1721CIA");
                objRtn.A1721FORMA = rs01.getString("A1721FORMA");
                objRtn.A1721SERIE = rs01.getString("A1721SERIE");
                objRtn.A1721SEQ = rs01.getString("A1721SEQ");
                objRtn.A1721TIPO = rs01.getString("A1721TIPO");
                objRtn.A1721CORRL = rs01.getString("A1721CORRL");
                objRtn.A1721FRCA = rs01.getString("A1721FRCA");
                objRtn.A1721GRUPO = rs01.getString("A1721GRUPO");
                objRtn.A1721IDFIL = rs01.getString("A1721IDFIL");
                objRtn.A1721USRIN = rs01.getString("A1721USRIN");
                objRtn.A1721FECIN = rs01.getString("A1721FECIN");
                objRtn.A1721HORIN = rs01.getString("A1721HORIN");
                objRtn.A1721USRAC = rs01.getString("A1721USRAC");
                objRtn.A1721FECAC = rs01.getString("A1721FECAC");
                objRtn.A1721HORAC = rs01.getString("A1721HORAC");
                lstRtn.add(objRtn);
            }
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

        return lstRtn;
    }
    
    public List<S0001A1730Filter> loadBalance( S0001A1730Filter filter  ) throws SQLException, Exception {
        List<S0001A1730Filter> lstRtn = new ArrayList<S0001A1730Filter>(0);
        S0001A1730Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL NEWOLDA1730(?,?,?,?)}";
        Connection cnx = null;
        
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();  cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.setString(1, filter.IN_AIRLIN);
            cstmt01.setString(2, filter.IN_CIA);
            cstmt01.setString(3, filter.IN_FORMA);
            cstmt01.setString(4, filter.IN_SERIE);
            cstmt01.execute();
            
            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new S0001A1730Filter();
                objRtn.A1730CCUST = rs01.getString("A1730CCUST");
                objRtn.A1730CI720 = rs01.getString("A1730CI720");
                objRtn.A1730FO720 = rs01.getString("A1730FO720");
                objRtn.A1730SE720 = rs01.getString("A1730SE720");
                objRtn.A1730SQ720 = rs01.getString("A1730SQ720");
                objRtn.A1730FLAG = rs01.getString("A1730FLAG");
                objRtn.A1730CIA = rs01.getString("A1730CIA");
                objRtn.A1730FORMA = rs01.getString("A1730FORMA");
                objRtn.A1730SERIE = rs01.getString("A1730SERIE");
                objRtn.A1730MDAOR = rs01.getString("A1730MDAOR");
                objRtn.A1730CORRL = rs01.getString("A1730CORRL");
                objRtn.A1730FCAMB = rs01.getString("A1730FCAMB");
                objRtn.A1730TCAMB = rs01.getDouble("A1730TCAMB");
                objRtn.A1730MDALC = rs01.getString("A1730MDALC");
                objRtn.A1730MDARV = rs01.getString("A1730MDARV");
                objRtn.A1730VFAR = rs01.getDouble("A1730VFAR");
                objRtn.A1730VFARR = rs01.getDouble("A1730VFARR");
                objRtn.A1730VCOM = rs01.getDouble("A1730VCOM");
                objRtn.A1730VCOMR = rs01.getDouble("A1730VCOMR");
                objRtn.A1730VSCM = rs01.getDouble("A1730VSCM");
                objRtn.A1730VSCMR = rs01.getDouble("A1730VSCMR");
                objRtn.A1730VTXC = rs01.getDouble("A1730VTXC");
                objRtn.A1730VTXCR = rs01.getDouble("A1730VTXCR");
                objRtn.A1730CTX1 = rs01.getString("A1730CTX1");
                objRtn.A1730ATX1 = rs01.getString("A1730ATX1");
                objRtn.A1730VTX1 = rs01.getDouble("A1730VTX1");
                objRtn.A1730RTX1 = rs01.getDouble("A1730RTX1");
                objRtn.A1730VTR1 = rs01.getDouble("A1730VTR1");
                objRtn.A1730CTX2 = rs01.getString("A1730CTX2");
                objRtn.A1730ATX2 = rs01.getString("A1730ATX2");
                objRtn.A1730VTX2 = rs01.getDouble("A1730VTX2");
                objRtn.A1730RTX2 = rs01.getDouble("A1730RTX2");
                objRtn.A1730VTR2 = rs01.getDouble("A1730VTR2");
                objRtn.A1730CTX3 = rs01.getString("A1730CTX3");
                objRtn.A1730ATX3 = rs01.getString("A1730ATX3");
                objRtn.A1730VTX3 = rs01.getDouble("A1730VTX3");
                objRtn.A1730RTX3 = rs01.getDouble("A1730RTX3");
                objRtn.A1730VTR3 = rs01.getDouble("A1730VTR3");
                objRtn.A1730CTX4 = rs01.getString("A1730CTX4");
                objRtn.A1730ATX4 = rs01.getString("A1730ATX4");
                objRtn.A1730VTX4 = rs01.getDouble("A1730VTX4");
                objRtn.A1730RTX4 = rs01.getDouble("A1730RTX4");
                objRtn.A1730VTR4 = rs01.getDouble("A1730VTR4");
                objRtn.A1730CTX5 = rs01.getString("A1730CTX5");
                objRtn.A1730ATX5 = rs01.getString("A1730ATX5");
                objRtn.A1730VTX5 = rs01.getDouble("A1730VTX5");
                objRtn.A1730RTX5 = rs01.getDouble("A1730RTX5");
                objRtn.A1730VTR5 = rs01.getDouble("A1730VTR5");
                objRtn.A1730CTX6 = rs01.getString("A1730CTX6");
                objRtn.A1730ATX6 = rs01.getString("A1730ATX6");
                objRtn.A1730VTX6 = rs01.getDouble("A1730VTX6");
                objRtn.A1730RTX6 = rs01.getDouble("A1730RTX6");
                objRtn.A1730VTR6 = rs01.getDouble("A1730VTR6");
                objRtn.A1730CTX7 = rs01.getString("A1730CTX7");
                objRtn.A1730ATX7 = rs01.getString("A1730ATX7");
                objRtn.A1730VTX7 = rs01.getDouble("A1730VTX7");
                objRtn.A1730RTX7 = rs01.getDouble("A1730RTX7");
                objRtn.A1730VTR7 = rs01.getDouble("A1730VTR7");
                objRtn.A1730CTX8 = rs01.getString("A1730CTX8");
                objRtn.A1730ATX8 = rs01.getString("A1730ATX8");
                objRtn.A1730VTX8 = rs01.getDouble("A1730VTX8");
                objRtn.A1730RTX8 = rs01.getDouble("A1730RTX8");
                objRtn.A1730VTR8 = rs01.getDouble("A1730VTR8");
                objRtn.A1730CTX9 = rs01.getString("A1730CTX9");
                objRtn.A1730ATX9 = rs01.getString("A1730ATX9");
                objRtn.A1730VTX9 = rs01.getDouble("A1730VTX9");
                objRtn.A1730RTX9 = rs01.getDouble("A1730RTX9");
                objRtn.A1730VTR9 = rs01.getDouble("A1730VTR9");
                objRtn.A1730CTX10 = rs01.getString("A1730CTX10");
                objRtn.A1730ATX10 = rs01.getString("A1730ATX10");
                objRtn.A1730VTX10 = rs01.getDouble("A1730VTX10");
                objRtn.A1730RTX10 = rs01.getDouble("A1730RTX10");
                objRtn.A1730VTR10 = rs01.getDouble("A1730VTR10");
                objRtn.A1730CTX11 = rs01.getString("A1730CTX11");
                objRtn.A1730ATX11 = rs01.getString("A1730ATX11");
                objRtn.A1730VTX11 = rs01.getDouble("A1730VTX11");
                objRtn.A1730RTX11 = rs01.getDouble("A1730RTX11");
                objRtn.A1730VTR11 = rs01.getDouble("A1730VTR11");
                objRtn.A1730CTX12 = rs01.getString("A1730CTX12");
                objRtn.A1730ATX12 = rs01.getString("A1730ATX12");
                objRtn.A1730VTX12 = rs01.getDouble("A1730VTX12");
                objRtn.A1730RTX12 = rs01.getDouble("A1730RTX12");
                objRtn.A1730VTR12 = rs01.getDouble("A1730VTR12");
                objRtn.A1730CTX13 = rs01.getString("A1730CTX13");
                objRtn.A1730ATX13 = rs01.getString("A1730ATX13");
                objRtn.A1730VTX13 = rs01.getDouble("A1730VTX13");
                objRtn.A1730RTX13 = rs01.getDouble("A1730RTX13");
                objRtn.A1730VTR13 = rs01.getDouble("A1730VTR13");
                objRtn.A1730CTX14 = rs01.getString("A1730CTX14");
                objRtn.A1730ATX14 = rs01.getString("A1730ATX14");
                objRtn.A1730VTX14 = rs01.getDouble("A1730VTX14");
                objRtn.A1730RTX14 = rs01.getDouble("A1730RTX14");
                objRtn.A1730VTR14 = rs01.getDouble("A1730VTR14");
                objRtn.A1730CTX15 = rs01.getString("A1730CTX15");
                objRtn.A1730ATX15 = rs01.getString("A1730ATX15");
                objRtn.A1730VTX15 = rs01.getDouble("A1730VTX15");
                objRtn.A1730RTX15 = rs01.getDouble("A1730RTX15");
                objRtn.A1730VTR15 = rs01.getDouble("A1730VTR15");
                objRtn.A1730CTX16 = rs01.getString("A1730CTX16");
                objRtn.A1730ATX16 = rs01.getString("A1730ATX16");
                objRtn.A1730VTX16 = rs01.getDouble("A1730VTX16");
                objRtn.A1730RTX16 = rs01.getDouble("A1730RTX16");
                objRtn.A1730VTR16 = rs01.getDouble("A1730VTR16");
                objRtn.A1730IND = rs01.getString("A1730IND");
                objRtn.A1730GRUPO = rs01.getString("A1730GRUPO");
                objRtn.A1730IDFIL = rs01.getString("A1730IDFIL");
                objRtn.CANTIDAD = rs01.getInt("CANT");
                objRtn.A1730FLAG = rs01.getString("A1730FLAG");
                if(objRtn.A1730FLAG.equals("N")){
                    objRtn.A1730FLAG="NEW";
                    objRtn.TKT = objRtn.A1730CI720 + objRtn.A1730FO720 + objRtn.A1730SE720;
                }else if(objRtn.A1730FLAG.equals("X")){
                    objRtn.A1730FLAG="DIF";
                    objRtn.TKT = objRtn.A1730CI720 + objRtn.A1730FO720 + objRtn.A1730SE720;
                }else{
                    objRtn.A1730FLAG="OLD";
                    objRtn.TKT = objRtn.A1730CIA + objRtn.A1730FORMA + objRtn.A1730SERIE;
                }
                lstRtn.add(objRtn);
            }
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

        return lstRtn;
    }
    
    public List<PX036S01A1531Filter> loadPX036S01A1531( PX036S01A1531Filter filter  ) throws SQLException, Exception {
        List<PX036S01A1531Filter> lstRtn = new ArrayList<PX036S01A1531Filter>(0);
        PX036S01A1531Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PX036S01A1531(?,?,?,?,?)}";
        Connection cnx = null;

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();  cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.setString(1, filter.IN_AIRLIN);
            cstmt01.setString(2, filter.IN_CIA);
            cstmt01.setString(3, filter.IN_FORMA);
            cstmt01.setString(4, filter.IN_SERIE);
            cstmt01.setString(5, filter.A1531SEQ);
            
            cstmt01.execute();
            
            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new PX036S01A1531Filter();
                objRtn.A1531CCUST = rs01.getString("A1531CCUST");
                objRtn.A1531CIA = rs01.getString("A1531CIA");
                objRtn.A1531FORMA = rs01.getString("A1531FORMA");
                objRtn.A1531SERIE = rs01.getString("A1531SERIE");
                objRtn.A1531SEQ = rs01.getString("A1531SEQ");
                objRtn.A1531CORRL = rs01.getString("A1531CORRL");
                objRtn.A1531CFOP = rs01.getString("A1531CFOP");
                objRtn.A1531TFOP = rs01.getString("A1531TFOP");
                objRtn.A1531TTARJ = rs01.getString("A1531TTARJ");
                objRtn.A1531TCNTR = rs01.getString("A1531TCNTR");
                objRtn.A1531VFOP = rs01.getDouble("A1531VFOP");
                objRtn.A1531MFOP = rs01.getString("A1531MFOP");
                objRtn.A1531VFOPR = rs01.getDouble("A1531VFOPR");
                objRtn.A1531MFOPR = rs01.getString("A1531MFOPR");
                objRtn.A1531NREF = rs01.getString("A1531NREF");
                objRtn.A1531FEXP = rs01.getString("A1531FEXP");
                objRtn.A1531CAPL = rs01.getString("A1531CAPL");
                objRtn.A1531NFAC = rs01.getString("A1531NFAC");
                objRtn.A1531FFAC = rs01.getString("A1531FFAC");
                objRtn.A1531VFAC = rs01.getDouble("A1531VFAC");
                objRtn.A1531ECCB = rs01.getString("A1531ECCB");
                objRtn.A1531EXPC = rs01.getString("A1531EXPC");
                objRtn.A1531REFN = rs01.getString("A1531REFN");
                objRtn.A1531TACN = rs01.getString("A1531TACN");
                objRtn.A1531RISN = rs01.getString("A1531RISN");
                objRtn.A1531CCSQ = rs01.getString("A1531CCSQ");
                objRtn.A1531TRNC = rs01.getString("A1531TRNC");
                objRtn.A1531GRUPO = rs01.getString("A1531GRUPO");
                objRtn.A1531IDFIL = rs01.getString("A1531IDFIL");
                objRtn.A1531ST720 = rs01.getString("A1531ST720");
                objRtn.A1531ST730 = rs01.getString("A1531ST730");
                objRtn.A1531USRIN = rs01.getString("A1531USRIN");
                objRtn.A1531FECIN = rs01.getString("A1531FECIN");
                objRtn.A1531HORIN = rs01.getString("A1531HORIN");
                objRtn.A1531USRAC = rs01.getString("A1531USRAC");
                objRtn.A1531FECAC = rs01.getString("A1531FECAC");
                objRtn.A1531HORAC = rs01.getString("A1531HORAC");
                objRtn.A1531MNETR = rs01.getString("A1531MNETR");
                objRtn.A1531VNETR = rs01.getDouble("A1531VNETR");
                lstRtn.add(objRtn);
            }
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

        return lstRtn;
    }
    
    public List<PX036S01A1532Filter> loadPX036S01A1532( PX036S01A1532Filter filter  ) throws SQLException, Exception {
        List<PX036S01A1532Filter> lstRtn = new ArrayList<PX036S01A1532Filter>(0);
        PX036S01A1532Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PX036S01A1532(?,?,?,?,?)}";
        Connection cnx = null;
        
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();  cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.setString(1, filter.IN_AIRLIN);
            cstmt01.setString(2, filter.IN_CIA);
            cstmt01.setString(3, filter.IN_FORMA);
            cstmt01.setString(4, filter.IN_SERIE);
            cstmt01.setString(5, filter.A1532SEQ);
            cstmt01.execute();
            
            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new PX036S01A1532Filter();
                objRtn.A1532CCUST = rs01.getString("A1532CCUST");
                objRtn.A1532CIA = rs01.getString("A1532CIA");
                objRtn.A1532FORMA = rs01.getString("A1532FORMA");
                objRtn.A1532SERIE = rs01.getString("A1532SERIE");
                objRtn.A1532SEQ = rs01.getString("A1532SEQ");
                objRtn.A1532CORRL = rs01.getString("A1532CORRL");
                objRtn.A1532CTAX = rs01.getString("A1532CTAX");
                objRtn.A1532PSTAX = rs01.getString("A1532PSTAX");
                objRtn.A1532TIPO = rs01.getString("A1532TIPO");
                objRtn.A1532TCTR = rs01.getString("A1532TCTR");
                objRtn.A1532RATE = rs01.getDouble("A1532RATE");
                objRtn.A1532VTAX = rs01.getDouble("A1532VTAX");
                objRtn.A1532MTAX = rs01.getString("A1532MTAX");
                objRtn.A1532VTAXR = rs01.getDouble("A1532VTAXR");
                objRtn.A1532MTAXR = rs01.getString("A1532MTAXR");
                objRtn.A1532CPFC = rs01.getString("A1532CPFC");
                objRtn.A1532APFC = rs01.getString("A1532APFC");
                objRtn.A1532MCF = rs01.getString("A1532MCF");
                objRtn.A1532NCMCF = rs01.getString("A1532NCMCF");
                objRtn.A1532NRFCF = rs01.getString("A1532NRFCF");
                objRtn.A1532GRUPO = rs01.getString("A1532GRUPO");
                objRtn.A1532IDFIL = rs01.getString("A1532IDFIL");
                objRtn.A1532USRIN = rs01.getString("A1532USRIN");
                objRtn.A1532FECIN = rs01.getString("A1532FECIN");
                objRtn.A1532HORIN = rs01.getString("A1532HORIN");
                objRtn.A1532USRAC = rs01.getString("A1532USRAC");
                objRtn.A1532FECAC = rs01.getString("A1532FECAC");
                objRtn.A1532HORAC = rs01.getString("A1532HORAC");
                lstRtn.add(objRtn);
            }
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

        return lstRtn;
    }
    
    public List<PX036S01A1533Filter> loadPX036S01A1533( PX036S01A1533Filter filter  ) throws SQLException, Exception {
        List<PX036S01A1533Filter> lstRtn = new ArrayList<PX036S01A1533Filter>(0);
        PX036S01A1533Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PX036S01A1533(?,?,?,?,?)}";
        Connection cnx = null;
        
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();  cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.setString(1, filter.IN_AIRLIN);
            cstmt01.setString(2, filter.IN_CIA);
            cstmt01.setString(3, filter.IN_FORMA);
            cstmt01.setString(4, filter.IN_SERIE);
            cstmt01.setString(5, filter.A1533SEQ);
            cstmt01.execute();
            
            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new PX036S01A1533Filter();
                objRtn.A1533CCUST = rs01.getString("A1533CCUST");
                objRtn.A1533CIA = rs01.getString("A1533CIA");
                objRtn.A1533FORMA = rs01.getString("A1533FORMA");
                objRtn.A1533SERIE = rs01.getString("A1533SERIE");
                objRtn.A1533SEQ = rs01.getString("A1533SEQ");
                objRtn.A1533CORRL = rs01.getString("A1533CORRL");
                objRtn.A1533CCOM = rs01.getString("A1533CCOM");
                objRtn.A1533TIPO = rs01.getString("A1533TIPO");
                objRtn.A1533RATE = rs01.getDouble("A1533RATE");
                objRtn.A1533VCOM = rs01.getDouble("A1533VCOM");
                objRtn.A1533MCOM = rs01.getString("A1533MCOM");
                objRtn.A1533VCOMR = rs01.getDouble("A1533VCOMR");
                objRtn.A1533MCOMR = rs01.getString("A1533MCOMR");
                objRtn.A1533GRUPO = rs01.getString("A1533GRUPO");
                objRtn.A1533IDFIL = rs01.getString("A1533IDFIL");
                objRtn.A1533USRIN = rs01.getString("A1533USRIN");
                objRtn.A1533FECIN = rs01.getString("A1533FECIN");
                objRtn.A1533HORIN = rs01.getString("A1533HORIN");
                objRtn.A1533USRAC = rs01.getString("A1533USRAC");
                objRtn.A1533FECAC = rs01.getString("A1533FECAC");
                objRtn.A1533HORAC = rs01.getString("A1533HORAC");
                lstRtn.add(objRtn);
            }
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

        return lstRtn;
    }
    
    public List<PX036S01A1534Filter> loadPX036S01A1534( PX036S01A1534Filter filter  ) throws SQLException, Exception {
        List<PX036S01A1534Filter> lstRtn = new ArrayList<PX036S01A1534Filter>(0);
        PX036S01A1534Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PX036S01A1534(?,?,?,?,?)}";
        Connection cnx = null;
        
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();  cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.setString(1, filter.IN_AIRLIN);
            cstmt01.setString(2, filter.IN_CIA);
            cstmt01.setString(3, filter.IN_FORMA);
            cstmt01.setString(4, filter.IN_SERIE);
            cstmt01.setString(5, filter.A1534SEQ);
            cstmt01.execute();
            
            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new PX036S01A1534Filter();
                objRtn.A1534CCUST = rs01.getString("A1534CCUST");
                objRtn.A1534CIA = rs01.getString("A1534CIA");
                objRtn.A1534FORMA = rs01.getString("A1534FORMA");
                objRtn.A1534SERIE = rs01.getString("A1534SERIE");
                objRtn.A1534SEQ = rs01.getString("A1534SEQ");
                objRtn.A1534CORRL = rs01.getString("A1534CORRL");
                objRtn.A1534CTCOM = rs01.getString("A1534CTCOM");
                objRtn.A1534TIPO = rs01.getString("A1534TIPO");
                objRtn.A1534RATE = rs01.getDouble("A1534RATE");
                objRtn.A1534VTXC = rs01.getDouble("A1534VTXC");
                objRtn.A1534MTXC = rs01.getString("A1534MTXC");
                objRtn.A1534VTXCR = rs01.getDouble("A1534VTXCR");
                objRtn.A1534MTXCR = rs01.getString("A1534MTXCR");
                objRtn.A1534GRUPO = rs01.getString("A1534GRUPO");
                objRtn.A1534IDFIL = rs01.getString("A1534IDFIL");
                objRtn.A1534USRIN = rs01.getString("A1534USRIN");
                objRtn.A1534FECIN = rs01.getString("A1534FECIN");
                objRtn.A1534HORIN = rs01.getString("A1534HORIN");
                objRtn.A1534USRAC = rs01.getString("A1534USRAC");
                objRtn.A1534FECAC = rs01.getString("A1534FECAC");
                objRtn.A1534HORAC = rs01.getString("A1534HORAC");
                lstRtn.add(objRtn);
            }
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

        return lstRtn;
    }
    
    public List<PX036S01A1721Filter> loadReference( PX036S01A1721Filter filter  ) throws SQLException, Exception {
        List<PX036S01A1721Filter> lstRtn = new ArrayList<PX036S01A1721Filter>(0);
        PX036S01A1721Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PX036S02A1721(?,?,?,?,?,?)}";
        Connection cnx = null;
        
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();  cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.setString(1, filter.IN_AIRLIN);
            cstmt01.setString(2, filter.IN_CIA);
            cstmt01.setString(3, filter.IN_FORMA);
            cstmt01.setString(4, filter.IN_SERIE);
            cstmt01.setString(5, filter.A1721SEQ);
            cstmt01.setString(6, filter.IN_TIPO);
            cstmt01.execute();
            
            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new PX036S01A1721Filter();
                objRtn.A1721FRCA = rs01.getString("A1721FRCA");
                lstRtn.add(objRtn);
            }
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

        return lstRtn;
    }
    
    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }
}
