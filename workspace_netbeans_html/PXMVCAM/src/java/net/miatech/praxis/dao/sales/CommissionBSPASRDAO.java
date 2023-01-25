package net.miatech.praxis.dao.sales;

// <editor-fold defaultstate="collapsed" desc="Imports">
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.PX119S01A1775Filter;
import net.miatech.beans.PX119S01A1776Filter;
import net.miatech.beans.SQP00105Filter;
import net.miatech.beans.SQP0083Filter;
import net.miatech.beans.SQP0089Filter;
import net.miatech.beans.SQP0099Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.exceptions.SpringException;

// </editor-fold>
/**
 *
 * @author gsanchez
 */
public class CommissionBSPASRDAO {

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
    
    public List<PX119S01A1775Filter> loadPX119S01A1775(PX119S01A1775Filter filter) throws SQLException, Exception {
        List<PX119S01A1775Filter> lstRtn = new ArrayList<>(0);
        PX119S01A1775Filter objRtn;

        strSQL = "{CALL PX119S01A1775(?,?,?,?,?,?,?,?,?)}";
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();            
            cs = cnx.prepareCall(strSQL);
            cs.registerOutParameter(6, Types.INTEGER);
            cs.registerOutParameter(7, Types.INTEGER);
            cs.registerOutParameter(8, Types.INTEGER);
            cs.registerOutParameter(9, Types.INTEGER);

            cs.setString(1, filter.IN_A1775CCUST);
            cs.setString(2, filter.IN_A1775GSA);
            cs.setString(3, filter.IN_A1775LOTE);
            cs.setString(4, filter.IN_A1775FINI);
            cs.setString(5, filter.A1775STAT );
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
                objRtn = new PX119S01A1775Filter();                
                objRtn.A1775CCUST = rst.getString("A1775CCUST");
                objRtn.A1775IATA = rst.getString("A1775IATA");
                objRtn.A1775LOTE = rst.getString("A1775LOTE");
                objRtn.A1775GSA = rst.getString("A1775GSA");
                objRtn.A1775PAIS = rst.getString("A1775PAIS");
                objRtn.A1775FUENT = rst.getString("A1775FUENT");
                objRtn.A1775SFUEN = rst.getString("A1775SFUEN");
                objRtn.A1775TFUEN = rst.getString("A1775TFUEN");
                objRtn.A1775FINI = rst.getString("A1775FINI");
                objRtn.A1775FFIN = rst.getString("A1775FFIN");
                objRtn.A1775STAT = rst.getString("A1775STAT");
                objRtn.A1775UENV = rst.getString("A1775UENV");
                objRtn.A1775FENV = rst.getString("A1775FENV");
                objRtn.A1775HENV = rst.getString("A1775HENV");
                objRtn.A1775STRC = rst.getString("A1775STRC");
                objRtn.A1775UREC = rst.getString("A1775UREC");
                objRtn.A1775FREC = rst.getString("A1775FREC");
                objRtn.A1775HREC = rst.getString("A1775HREC");
                
                objRtn.A1775TFARE = rst.getDouble("A1775TFARE"); 
                objRtn.A1775TFRON = rst.getDouble("A1775TFRON"); 
                objRtn.A1775TFROF = rst.getDouble("A1775TFROF"); 
                objRtn.A1775TFRNT = rst.getDouble("A1775TFRNT"); 
                objRtn.A1775COMON = rst.getDouble("A1775COMON");
                objRtn.A1775COMOF = rst.getDouble("A1775COMOF");
                objRtn.A1775SCGSA = rst.getDouble("A1775SCGSA");
                objRtn.A1775BCTAR = rst.getDouble("A1775BCTAR");
                objRtn.A1775BCNET = rst.getDouble("A1775BCNET");
                objRtn.A1775BASE = rst.getDouble("A1775BASE");
                objRtn.A1775TCFDR = rst.getDouble("A1775TCFDR");
                objRtn.A1775TPAG = rst.getDouble("A1775TPAG");                                
                objRtn.A1775OBSER = rst.getString("A1775OBSER");
                objRtn.A1839RSOC = rst.getString("A1839RSOC");                
                objRtn.A1826INDCO = rst.getString("A1826INDCO");
                objRtn.A1775PAIS_00 = rst.getString("A1775PAIS_00");                
                objRtn.A1775MDALC = rst.getString("A1775MDALC");
                objRtn.A1775ASRON = rst.getDouble("A1775ASRON"); 
                objRtn.A1775ASROF = rst.getDouble("A1775ASROF");
                objRtn.A1775FACUS = rst.getString("A1775FACUS");
                objRtn.A1775HACUS = rst.getString("A1775HACUS"); 
                objRtn.A1775MPAG = rst.getString("A1775MPAG"); 
                objRtn.A1775MDARV = rst.getString("A1775MDARV"); 
                objRtn.ACUSE = rst.getString("ACUSE"); 
                
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
    
    public List<PX119S01A1776Filter> loadPX119S01A1776(PX119S01A1776Filter filter) throws SQLException, Exception {
        List<PX119S01A1776Filter> lstRtn = new ArrayList<>(0);
        PX119S01A1776Filter objRtn;
        strSQL = "{CALL PX119S01A1776(?,?,?,?,?,?,?,?,?,?,?)}";
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();            
            cs = cnx.prepareCall(strSQL);
            cs.registerOutParameter(8, Types.INTEGER);
            cs.registerOutParameter(9, Types.INTEGER);
            cs.registerOutParameter(10, Types.INTEGER);
            cs.registerOutParameter(11, Types.INTEGER);
            
            cs.setInt(1, filter.IN_OPCION);
            cs.setString(2, filter.IN_A1776CCUST);
            cs.setString(3, filter.IN_A1776GSA);
            cs.setString(4, filter.IN_A1776PAIS);
            cs.setString(5, filter.IN_A1776LOTE);
            cs.setString(6, filter.IN_TKT);
            cs.setString(7, filter.IN_A1776MDALC);            
            cs.setInt(8, filter.page.PAGNUM);
            cs.setInt(9, filter.page.PAGROW);
            cs.setInt(10, filter.page.TOTPAG);
            cs.setInt(11, filter.page.TOTROW);

            cs.execute();

            filter.page.PAGNUM = cs.getInt(8);
            filter.page.PAGROW = cs.getInt(9);
            filter.page.TOTPAG = cs.getInt(10);
            filter.page.TOTROW = cs.getInt(11);

            rst = cs.getResultSet();
            while (rst.next()) {
                objRtn = new PX119S01A1776Filter();                
                objRtn.A1776CCUST = rst.getString("A1776CCUST");                
                objRtn.A1776LOTE = rst.getString("A1776LOTE");
                objRtn.A1776CIA = rst.getString("A1776CIA");
                objRtn.A1776FORMA = rst.getString("A1776FORMA");
                objRtn.A1776SERIE = rst.getString("A1776SERIE");
                objRtn.TKT = rst.getString("TKT");
                objRtn.A1776CUPON = rst.getString("A1776CUPON");
                objRtn.A1776SECU = rst.getString("A1776SECU");
                objRtn.A1776GSA = rst.getString("A1776GSA");
                objRtn.A1776PAIS = rst.getString("A1776PAIS");
                objRtn.A1776IATA = rst.getString("A1776IATA");
                objRtn.A1776GRUPO = rst.getString("A1776GRUPO");
                objRtn.A1776IDFIL = rst.getString("A1776IDFIL");
                objRtn.A1776TCAMB = rst.getDouble("A1776TCAMB");
                objRtn.A1776FECVT = rst.getString("A1776FECVT");
                objRtn.A1776TRNCU = rst.getString("A1776TRNCU");
                objRtn.A1776CODIT = rst.getString("A1776CODIT");
                objRtn.A1776CFOP = rst.getString("A1776CFOP");
                objRtn.A1776PCSC = rst.getDouble("A1776PCSC");
                objRtn.A1776ACSC = rst.getDouble("A1776ACSC");
                objRtn.A1776CARR = rst.getString("A1776CARR");
                objRtn.A1776FBAS = rst.getString("A1776FBAS");
                objRtn.A1776CLAS = rst.getString("A1776CLAS");
                objRtn.A1776FARE = rst.getDouble("A1776FARE");
                objRtn.A1776MDAFA = rst.getString("A1776MDAFA");
                objRtn.A1776ADC = rst.getDouble("A1776ADC");
                objRtn.A1776MDAAD = rst.getString("A1776MDAAD");
                objRtn.A1776OBSER = rst.getString("A1776OBSER");
                objRtn.A1776FREGI = rst.getString("A1776FREGI");              
                objRtn.A1776APLIC = rst.getString("A1776APLIC");
                objRtn.A1776FUENT = rst.getString("A1776FUENT");
                objRtn.A1776VCPLC = rst.getDouble("A1776VCPLC");
                objRtn.A1776ORIG = rst.getString("A1776ORIG");
                objRtn.A1776DEST = rst.getString("A1776DEST");                
                objRtn.A1776NVLO = rst.getString("A1776NVLO");
                objRtn.A1776MDALC = rst.getString("A1776MDALC");
                objRtn.A1839MLOC = rst.getString("A1839MLOC");
                objRtn.A1776GMDAP = rst.getString("A1776GMDAP");
                objRtn.A1776GPAGC = rst.getDouble("A1776GPAGC");
                objRtn.A1776ACSL = rst.getDouble("A1776ACSL");
                objRtn.A1776GTCAM = rst.getDouble("A1776GTCAM");
                objRtn.A1776CHON = rst.getDouble("A1776CHON");
                objRtn.A1776CHOFF = rst.getDouble("A1776CHOFF");
                objRtn.A1776INDI = rst.getString("A1776INDI");
                objRtn.FARE_ON = rst.getDouble("FARE_ON");
                objRtn.FARE_OFF = rst.getDouble("FARE_OFF");
                
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
    
    /*Datos para envio del Mail
     */    
    public List<SQP0089Filter> getSQP0089Filter(SQP0089Filter filter) throws SQLException, Exception {        
        List<SQP0089Filter> lstRtn = new ArrayList<>(0);
        SQP0089Filter objRtn;

        strSQL = "{CALL SQP0089(?,?,?,?,?)}";
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();            
            cs = cnx.prepareCall(strSQL);
            cs.setString(1, filter.VP_A1775CCUST);
            cs.setString(2, filter.VP_A1775GSA);
            cs.setString(3, filter.VP_A1775PAIS );            
            cs.setString(4, filter.VP_A1775LOTE );
            cs.setString(5, filter.VP_A1775MDALC );
            cs.execute();
            rst = cs.getResultSet();            
            while (rst.next()) {
                objRtn = new SQP0089Filter();               
                objRtn.A1775LOTE  = rst.getString("A1775LOTE");
                objRtn.A1775GSA  = rst.getString("A1775GSA");
                objRtn.A1839RSOC  = rst.getString("A1839RSOC");                
                objRtn.A1775PAIS  = rst.getString("A1775PAIS");
                objRtn.A1839DPAIS  = rst.getString("A1839DPAIS");
                objRtn.PERIODRPTE  = rst.getString("PERIODRPTE");
                objRtn.A1839EMAIL  = rst.getString("A1839EMAIL");
                objRtn.EmailCcp  = rst.getString("EmailCcp");
                objRtn.EmailRe  = rst.getString("EmailRe");
                objRtn.Asunto  = rst.getString("Asunto");
                objRtn.Mensaje  = rst.getString("Mensaje");            
                lstRtn.add(objRtn);
            }
        } finally {
            setClose();
        }
        return lstRtn;
    }
    
    /* Data Reporte PDF/TXT para Envio a GSA 
     */
    public SQP0099Filter getSQP0099Filter(SQP0099Filter filter) throws SQLException, Exception {
        SQP0099Filter beanData = new SQP0099Filter();  
        
        List<PX119S01A1776Filter> lstRws = new ArrayList<>();
        PX119S01A1776Filter Rws;
        int rTotal;

        strSQL = "{CALL SQP0099(?,?,?,?,?)}";
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();            
            cs = cnx.prepareCall(strSQL);           
            cs.setString(1, filter.VP_A1775CCUST);
            cs.setString(2, filter.VP_A1775GSA);
            cs.setString(3, filter.VP_A1775PAIS );
            cs.setString(4, filter.VP_A1775LOTE );
            cs.setString(5, filter.VP_A1775MDALC );
            cs.execute();                                    
            // Datos de Cabecera            
            rst = cs.getResultSet();                        
            // Datos de Detalle   
            rTotal = 0;
            while (rst.next()) {
                rTotal++;
                if ( rTotal == 1 ){
                    beanData = new SQP0099Filter();
                    beanData.A1775LOTE  = rst.getString("A1775LOTE");                   
                    beanData.A1775GSA   = rst.getString("A1775GSA");
                    beanData.A1775PAIS  = rst.getString("A1775PAIS");
                    beanData.A1775FUENT = rst.getString("A1775FUENT");
                    beanData.A1775SFUEN  = rst.getString("A1775SFUEN");
                    beanData.A1775TFUEN  = rst.getString("A1775TFUEN"); 
                    beanData.A1775FINI  = rst.getString("A1775FINI"); 
                    beanData.A1775FFIN  = rst.getString("A1775FFIN");  
                    beanData.A1775STAT  = rst.getString("A1775STAT"); 
                    beanData.A1775MDALC  = rst.getString("A1775MDALC"); 
                    beanData.A1775ASRON  = rst.getDouble("A1775ASRON"); 
                    beanData.A1775ASROF  =  rst.getDouble("A1775ASROF");   
                    beanData.A1775TFARE  =  rst.getDouble("A1775TFARE");   
                    beanData.A1775TFRON  =  rst.getDouble("A1775TFRON");   
                    beanData.A1775TFROF  =  rst.getDouble("A1775TFROF");   
                    beanData.A1775TFRNT  =  rst.getDouble("A1775TFRNT");   
                    beanData.A1775COMON  =  rst.getDouble("A1775COMON");   
                    beanData.A1775COMOF  =  rst.getDouble("A1775COMOF");   
                    beanData.A1775SCGSA  =  rst.getDouble("A1775SCGSA");   
                    beanData.A1775BCTAR  =  rst.getDouble("A1775BCTAR"); 
                    beanData.A1775BCNET  =  rst.getDouble("A1775BCNET");
                    beanData.A1775BASE   =   rst.getDouble("A1775BASE");
                    beanData.A1775TCFDR  =  rst.getDouble("A1775TCFDR");
                    beanData.A1775TPAG   =   rst.getDouble("A1775TPAG");
                    beanData.A1839RSOC   =   rst.getString("A1839RSOC"); 
                    beanData.A1839DPAIS  =  rst.getString("A1839DPAIS"); 
                    // Add
                    beanData.A1775MPAG  =  rst.getString("A1775MPAG");
                    beanData.A1775MDARV  =  rst.getString("A1775MDARV");
                    beanData.A1775FENV  =  rst.getString("A1775FENV");
                }
                
                Rws = new PX119S01A1776Filter();                
                Rws.TKT         = rst.getString("TKT");
                Rws.A1776CUPON  = rst.getString("A1776CUPON");                  
                Rws.A1776SECU   = rst.getString("A1776SECU");                  
                Rws.A1776FUENT  = rst.getString("A1776FUENT");  
                Rws.A1776TRNCU  = rst.getString("A1776TRNCU");
                Rws.A1776CARR   = rst.getString("A1776CARR");
                Rws.A1776FBAS   = rst.getString("A1776FBAS");
                Rws.A1776FECVT = rst.getString("A1776FECVT");
                Rws.A1776CLAS  = rst.getString("A1776CLAS");
                Rws.A1776CODIT = rst.getString("A1776CODIT");                
                Rws.A1776CFOP  = rst.getString("A1776CFOP");
                Rws.A1776APLIC = rst.getString("A1776APLIC");
                Rws.A1776ACSC  = rst.getDouble("A1776ACSC");
                Rws.A1776PCSC  = rst.getDouble("A1776PCSC"); 
                
                Rws.A1776ORIG  = rst.getString("A1776ORIG");
                Rws.A1776DEST  = rst.getString("A1776DEST");
                Rws.A1776NVLO  = rst.getString("A1776NVLO");
                Rws.A1776MDALC = rst.getString("A1776MDALC");
                Rws.A1776VCPLC = rst.getDouble("A1776VCPLC");
                Rws.A1776ACSR  = rst.getDouble("A1776ACSR");
                Rws.A1839MLOC  = rst.getString("A1839MLOC");
                
                Rws.A1776GMDAP  = rst.getString("A1776GMDAP");
                Rws.A1776GPAGC  = rst.getDouble("A1776GPAGC");
                Rws.A1776ACSL   = rst.getDouble("A1776ACSL");
                Rws.A1776GTCAM  = rst.getDouble("A1776GTCAM");
                Rws.A1776INDI  = rst.getString("A1776INDI");
                Rws.FARE_ON  = rst.getDouble("FARE_ON");
                Rws.FARE_OFF  = rst.getDouble("FARE_OFF");
                
                
                lstRws.add(Rws);                
            }
            beanData.lstRws = lstRws;
            
        } finally {
            setClose();
        }
        return beanData;
    }
    
    /*
     * Actualiza envio de reporte a GSA
     * Proceso Individual
     */
    public SQP0083Filter  setSQP0083Filter( SQP0083Filter filter ) throws SQLException, Exception {
        
        String SQLCLL01 = "{CALL SQP0083(?,?,?,?,?,?,?,?,?)}";
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();            
            cs = cnx.prepareCall(SQLCLL01);
            cs.registerOutParameter(8, Types.VARCHAR);
            cs.registerOutParameter(9, Types.VARCHAR);            
            cs.setString(1, filter.VP_ACTION );
            cs.setString(2, filter.VP_A1775CCUST );            
            cs.setString(3, filter.VP_A1775GSA);              
            cs.setString(4, filter.VP_A1775PAIS );
            cs.setString(5, filter.VP_A1775LOTE );
            cs.setString(6, filter.VP_A1775MDALC );
            cs.setString(7, filter.VP_TIPO_ENVIO );
            cs.execute();                        
            filter.dbException.SQLCODE = cs.getString(8);
            filter.dbException.MESSAGE = cs.getString(9);                        
        } finally {
            setClose();
        }
        return filter;
    }
    
    /*
     * Actualiza ACUSE 
     */
    public SQP00105Filter  setSQP00105Filter( SQP00105Filter filter ) throws SQLException, Exception {        
        String SQLCLL01 = "{CALL SQP00105(?,?,?,?,?,?,?,?,?,?)}";
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();            
            cs = cnx.prepareCall(SQLCLL01);    
            cs.registerOutParameter(9, Types.VARCHAR);
            cs.registerOutParameter(10, Types.VARCHAR);
            
            cs.setString(1, filter.VP_ACTION );
            cs.setString(2, filter.VP_A1775CCUST );
            cs.setString(3, filter.VP_A1775GSA);            
            cs.setString(4, filter.VP_A1775PAIS);  
            cs.setString(5, filter.VP_A1775LOTE);
            cs.setString(6, filter.VP_A1775MDALC);
            cs.setString(7, filter.A1775FACUS );
            cs.setString(8, filter.A1775HACUS );            
            cs.execute();                        
            filter.dbException.SQLCODE = cs.getString(9);
            filter.dbException.MESSAGE = cs.getString(10); 
            
        } finally {
            setClose();
        }
        return filter;
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
