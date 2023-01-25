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
import net.miatech.beans.PX040S01A1716Filter;
import net.miatech.beans.PX040S01A720Filter;
import net.miatech.beans.PX040S01A720ResultSet01;
import net.miatech.beans.PX040S01A720ResultSet02;
import net.miatech.beans.PX040S01A720ResultSet03;
import net.miatech.beans.PX040S01A720ResultSet04;
import net.miatech.beans.PX040S01A720ResultSet05;
import net.miatech.beans.PX040S01A720ResultSet07;
import net.miatech.beans.PX040S01A720ResultSet11;
import net.miatech.beans.PX040S01A720ResultSet12;
import net.miatech.beans.PX040S01A720ResultSet13;
import net.miatech.beans.PX040S01A720ResultSet14;
import net.miatech.beans.PX040S01A720ResultSet15;
import net.miatech.beans.PX040S02A720Filter;
import net.miatech.beans.S0007A720Filter;
import net.miatech.beans.S0007A730Filter;
import net.miatech.beans.SQP00697Filter;
import net.miatech.praxis.A720;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

//</editor-fold>
/**
 *
 * @author gsanchez
 */
public class ProTKTDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<S0007A720Filter> loadS0007A720(S0007A720Filter filter) throws SQLException, Exception {
        List<S0007A720Filter> lstRtn = new ArrayList<S0007A720Filter>(0);
        S0007A720Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL S0007A720(?,?,?,?,?)}";

        Connection cnx = null; //session.getCNXIBMDB2().open();
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            //cstmt01 = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, filter.IN_AIRLIN);
            cstmt01.setString(2, filter.IN_CIA);
            cstmt01.setString(3, filter.IN_FORMA);
            cstmt01.setString(4, filter.IN_SERIE);
            cstmt01.setString(5, filter.A720SEQ);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                    objRtn = new S0007A720Filter();
                    objRtn.A720CIA = rs01.getString("A720CIA");
                    objRtn.A720FORMA = rs01.getString("A720FORMA");
                    objRtn.A720SERIE = rs01.getString("A720SERIE");
                    objRtn.A720SEQ = rs01.getString("A720SEQ");
                    objRtn.A720DCHEQ = rs01.getString("A720DCHEQ");
                    objRtn.A720FLAG = rs01.getString("A720FLAG");
                    objRtn.A720NSEQ = rs01.getInt("A720NSEQ");
                    objRtn.A720CTKTC = rs01.getInt("A720CTKTC");
                    objRtn.A720AGENTE = rs01.getString("A720AGENTE");
                    objRtn.A720CODIT = rs01.getString("A720CODIT").trim();
                    objRtn.A720TARIFA = rs01.getDouble("A720TARIFA");
                    objRtn.A720MONEDA = rs01.getString("A720MONEDA");
                    objRtn.A720TRFPAG = rs01.getDouble("A720TRFPAG");
                    objRtn.A720MDAPAG = rs01.getString("A720MDAPAG");
                    objRtn.A720GRUPO = rs01.getString("A720GRUPO");
                    objRtn.A720IDFIL = rs01.getString("A720IDFIL");
                    objRtn.A720FLAGTN = rs01.getString("A720FLAGTN");
                    objRtn.A720VRIC = rs01.getString("A720VRIC");
                    objRtn.A720FECVTA = rs01.getString("A720FECVTA");
                    objRtn.A720MONREG = rs01.getString("A720MONREG");
                    objRtn.A720CIAI = rs01.getString("A720CIAI");
                    objRtn.A720FORMAI = rs01.getString("A720FORMAI");
                    objRtn.A720SERIEI = rs01.getString("A720SERIEI");
                    objRtn.A720ORIG = rs01.getString("A720ORIG");
                    objRtn.A720PAIS = rs01.getString("A720PAIS");
                    objRtn.TICKET = rs01.getString("A720CIA") + rs01.getString("A720FORMA") +rs01.getString("A720SERIE");
                    
                    objRtn.A720TRNN = rs01.getString("A720TRNN");
                    objRtn.A720TRNSQ = rs01.getString("A720TRNSQ");
                    objRtn.A720TRNCU = rs01.getString("A720TRNCU");
                    objRtn.A720TDOC = rs01.getString("A720TDOC");
                    objRtn.A720PAX = rs01.getString("A720PAX");
                    objRtn.A720TPAX = rs01.getString("A720TPAX");
                    objRtn.A720RFIC = rs01.getString("A720RFIC");
                    
                    objRtn.A720FARE = rs01.getDouble("A720FARE");
                    objRtn.A720ADC = rs01.getDouble("A720ADC");
                    objRtn.A720ORIGEX = rs01.getDouble("A720ORIGEX");
                    objRtn.A720ORCMEX = rs01.getDouble("A720ORCMEX");
                    objRtn.A720ORSCEX = rs01.getDouble("A720ORSCEX");
                    objRtn.A720VDSCT = rs01.getDouble("A720VDSCT");
                    objRtn.A720TQ = rs01.getDouble("A720TQ");
                    objRtn.A720TYQ = rs01.getDouble("A720TYQ");
                    
                    objRtn.A720MDATQ = rs01.getString("A720MDATQ");
                    objRtn.A720MDAYQ = rs01.getString("A720MDAYQ");
                    objRtn.A720MDADF = rs01.getString("A720MDADF");
                    objRtn.A720DIFPX = rs01.getDouble("A720DIFPX");
                    objRtn.A720MDAOI = rs01.getString("A720MDAOI");
                    objRtn.A720OING = rs01.getDouble("A720OING");
                    
                    objRtn.A720MDAFP = rs01.getString("A720MDAFP");
                    objRtn.A720TFOP = rs01.getDouble("A720TFOP");
                    objRtn.A720MDATX = rs01.getString("A720MDATX");
                    objRtn.A720TTAX = rs01.getDouble("A720TTAX");
                    objRtn.A720MDACM = rs01.getString("A720MDACM");
                    objRtn.A720TCOM = rs01.getDouble("A720TCOM");
                    objRtn.A720MDATC = rs01.getString("A720MDATC");
                    objRtn.A720TTXC = rs01.getDouble("A720TTXC");
                    
                    objRtn.A720MDAFA = rs01.getString("A720MDAFA");
                    objRtn.A720MDAAD = rs01.getString("A720MDAAD");
                    objRtn.A720MDAOR = rs01.getString("A720MDAOR");
                    objRtn.A720MDDS = rs01.getString("A720MDDS");
                    objRtn.A720MDATQ = rs01.getString("A720MDATQ");
                    objRtn.A720MDAYQ = rs01.getString("A720MDAYQ");
                    objRtn.A720STAT = rs01.getString("A720STAT");
                    
                    objRtn.A720REGIST = rs01.getString("A720REGIST");
                    objRtn.A720FREGIS = rs01.getString("A720FREGIS");
                    objRtn.A720REVISA = rs01.getString("A720REVISA");
                    objRtn.A720FREVIS = rs01.getString("A720FREVIS");
                    
                    objRtn.ERRORDESC = rs01.getString("ERRORDESC").trim();
                    
                    lstRtn.add(objRtn);
            }
        } finally {
            if (rs01 != null) {
                try { rs01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
            }
            if (cstmt01 != null) {
                //try { cstmt01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
            }
            //session.getCNXIBMDB2().close();
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
        return lstRtn;
    }
    
    public List<S0007A720Filter> loadS0007A720Grilla(S0007A720Filter filter) throws SQLException, Exception {
        List<S0007A720Filter> lstRtn = new ArrayList<S0007A720Filter>(0);
        S0007A720Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL S0007A720(?,?,?,?,?)}";

        Connection cnx = null; //session.getCNXIBMDB2().open();
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            //cstmt01 = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, filter.IN_AIRLIN);
            cstmt01.setString(2, filter.IN_CIA);
            cstmt01.setString(3, filter.IN_FORMA);
            cstmt01.setString(4, filter.IN_SERIE);
            cstmt01.setString(5, filter.A720SEQ);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                for(int i=1;i<=4;i++){
                    objRtn = new S0007A720Filter();
                    objRtn.A720MONREG = rs01.getString("A720MONREG");
                    objRtn.TICKET = rs01.getString("A720CIA") + rs01.getString("A720FORMA") +rs01.getString("A720SERIE");
                    objRtn.CPUI = "";
                    objRtn.CUPON = i + "";
                    objRtn.CONEX = rs01.getString("A720CONEX" + i);
                    int op = i - 1;
                    objRtn.ORIGEN = rs01.getString("A720RUTA" + op);
                    objRtn.DESTINO = rs01.getString("A720RUTA" + i);
                    objRtn.CARRIER = rs01.getString("A720CARRA" + i);
                    objRtn.CLASE = rs01.getString("A720CLASE" + i);
                    objRtn.FLIGHT = rs01.getString("A720NVLO" + i);
                    objRtn.DFLIGHT = rs01.getString("A720FVLO" + i);
                    objRtn.FAREBASIS = rs01.getString("A720FBUSO" + i).trim();
                    objRtn.CPNCUR = rs01.getString("A720MONREG");
                    objRtn.CPN = rs01.getDouble("A720VALOR" + i);
                    objRtn.QCUR = rs01.getString("A720MONREG");
                    objRtn.Q = rs01.getDouble("A720Q" + i);
                    objRtn.YQCUR = rs01.getString("A720MONREG");
                    objRtn.YQ = rs01.getDouble("A720YQ" + i);
                    objRtn.A720TYQRV = rs01.getDouble("A720TYQRV");
                    objRtn.A720TTCMRV = rs01.getDouble("A720TTCMRV");
                    objRtn.A720TTSCRV = rs01.getDouble("A720TTSCRV");
                    objRtn.COMM_G = rs01.getDouble("A720PRRCM" + i);
                    objRtn.SCOMM = rs01.getDouble("A720PRSCM" + i);
                    
                    if(objRtn.DESTINO.trim().length() ==0 ){
                        objRtn.TICKET = "";
                        objRtn.CPUI = "";
                        objRtn.CONEX = "";
                        objRtn.ORIGEN = "";
                        objRtn.DESTINO = "";
                        objRtn.CARRIER = "";
                        objRtn.CLASE = "";
                        objRtn.FLIGHT = "";
                        objRtn.DFLIGHT = "";
                        objRtn.FAREBASIS = "";
                        objRtn.CPNCUR = "";
                        objRtn.QCUR = "";
                        objRtn.YQCUR = "";
                    }
                    if(objRtn.DESTINO.trim().length()>0)lstRtn.add(objRtn);
                 }
            }
        } finally {
            if (rs01 != null) {
                try { rs01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
            }
            if (cstmt01 != null) {
                //try { cstmt01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
            }
            //session.getCNXIBMDB2().close();
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
        return lstRtn;
    }
    
    public List<S0007A730Filter> loadS0007A730(S0007A720Filter filter) throws SQLException, Exception {
        List<S0007A730Filter> lstRtn = new ArrayList<S0007A730Filter>(0);
        S0007A730Filter objRtn;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        
        String SQLCLL01 = "{CALL S0007A730(?,?,?,?,?)}";
        
        Connection cnx = null; //session.getCNXIBMDB2().open();
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            //cstmt01 = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, "139");
            cstmt01.setString(2, filter.A720CIAI);
            cstmt01.setString(3, filter.A720FORMAI);
            cstmt01.setString(4, filter.A720SERIEI);
            cstmt01.setString(5, filter.A720SEQ);
            
            cstmt01.execute();
            
            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new S0007A730Filter();
                objRtn.A730CIA = rs01.getString("A730CIA");
                objRtn.DOCUMENTO = rs01.getString("A730FORMA") + rs01.getString("A730SERIE");
                objRtn.CUPON = rs01.getString("A730CUPON1") + rs01.getString("A730CUPON2") + rs01.getString("A730CUPON3") + rs01.getString("A730CUPON4");
                objRtn.CNJ = rs01.getString("A730FLAG") + rs01.getString("A730NSEQ");
                objRtn.A730MONREG = rs01.getString("A730MONREG");
                objRtn.VALUE = 0.00;
                if(!rs01.getString("A730CUPON1").trim().isEmpty()){
                    switch (Integer.parseInt(rs01.getString("A730CUPON1"))) {
                        case 1:  objRtn.VALUE = objRtn.VALUE + rs01.getDouble("A730VALOR1");
                                 break;
                        case 2:  objRtn.VALUE = objRtn.VALUE + rs01.getDouble("A730VALOR2");
                                 break;
                        case 3:  objRtn.VALUE = objRtn.VALUE + rs01.getDouble("A730VALOR3");
                                 break;
                        case 4:  objRtn.VALUE = objRtn.VALUE + rs01.getDouble("A730VALOR4");
                                 break;
                    }
                }
                if(!rs01.getString("A730CUPON2").trim().isEmpty()){
                    switch (Integer.parseInt(rs01.getString("A730CUPON2"))) {
                        case 1:  objRtn.VALUE = objRtn.VALUE + rs01.getDouble("A730VALOR1");
                                 break;
                        case 2:  objRtn.VALUE = objRtn.VALUE + rs01.getDouble("A730VALOR2");
                                 break;
                        case 3:  objRtn.VALUE = objRtn.VALUE + rs01.getDouble("A730VALOR3");
                                 break;
                        case 4:  objRtn.VALUE = objRtn.VALUE + rs01.getDouble("A730VALOR4");
                                 break;
                    }
                }
                if(!rs01.getString("A730CUPON3").trim().isEmpty()){
                    switch (Integer.parseInt(rs01.getString("A730CUPON3"))) {
                        case 1:  objRtn.VALUE = objRtn.VALUE + rs01.getDouble("A730VALOR1");
                                 break;
                        case 2:  objRtn.VALUE = objRtn.VALUE + rs01.getDouble("A730VALOR2");
                                 break;
                        case 3:  objRtn.VALUE = objRtn.VALUE + rs01.getDouble("A730VALOR3");
                                 break;
                        case 4:  objRtn.VALUE = objRtn.VALUE + rs01.getDouble("A730VALOR4");
                                 break;
                    }
                }
                if(!rs01.getString("A730CUPON4").trim().isEmpty()){
                    switch (Integer.parseInt(rs01.getString("A730CUPON4"))) {
                        case 1:  objRtn.VALUE = objRtn.VALUE + rs01.getDouble("A730VALOR1");
                                 break;
                        case 2:  objRtn.VALUE = objRtn.VALUE + rs01.getDouble("A730VALOR2");
                                 break;
                        case 3:  objRtn.VALUE = objRtn.VALUE + rs01.getDouble("A730VALOR3");
                                 break;
                        case 4:  objRtn.VALUE = objRtn.VALUE + rs01.getDouble("A730VALOR4");
                                 break;
                    }
                }
                lstRtn.add(objRtn);
            }
        } finally {
            if (rs01 != null) {
                try { rs01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
            }
            if (cstmt01 != null) {
                //try { cstmt01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
            }
            //session.getCNXIBMDB2().close();
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return lstRtn;
    }
    
    public List<S0007A720Filter> loadS0007A720Tot(S0007A720Filter filter) throws SQLException, Exception {
        List<S0007A720Filter> lstRtn = new ArrayList<S0007A720Filter>(0);
        S0007A720Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL S0007A720TOT(?,?,?,?,?)}";

        Connection cnx = null; //session.getCNXIBMDB2().open();
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            //cstmt01 = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, "139");
            cstmt01.setString(2, filter.A720CIAI);
            cstmt01.setString(3, filter.A720FORMAI);
            cstmt01.setString(4, filter.A720SERIEI);
            cstmt01.setString(5, filter.A720SEQ);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new S0007A720Filter();
                objRtn.FOP = rs01.getDouble("FOP");
                objRtn.FOPRV = rs01.getDouble("FOPRV");
                objRtn.FOPBAL = rs01.getDouble("FOPBAL");
                objRtn.TAX = rs01.getDouble("TAX");
                objRtn.TAXRV = rs01.getDouble("TAXRV");
                objRtn.COMM = rs01.getDouble("COMM");
                objRtn.COMMRV = rs01.getDouble("COMMRV");
                objRtn.TAXCOMM = rs01.getDouble("TAXCOMM");
                objRtn.TAXCOMMRV = rs01.getDouble("TAXCOMMRV");
                objRtn.FOPCUR = rs01.getString("FOPCUR");
                objRtn.TAXCUR = rs01.getString("TAXCUR");
                objRtn.COMMCUR = rs01.getString("COMMCUR");
                objRtn.TAXCOMMCUR = rs01.getString("TAXCOMMCUR");
                lstRtn.add(objRtn);
            }
        } finally {
            if (rs01 != null) {
                try { rs01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
            }
            if (cstmt01 != null) {
                //try { cstmt01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
            }
            //session.getCNXIBMDB2().close();
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

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }
}
