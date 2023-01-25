/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.dao.eecta;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.sql.Blob;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.eecta.SQP03875Filter;
import net.miatech.praxis.eecta.SQP03878Filter;
import net.miatech.praxis.eecta.SQP03879Filter;
import net.miatech.praxis.eecta.SQP03887Filter;
import net.miatech.praxis.eecta.SQP03888Filter;
import net.miatech.praxis.eecta.SQP03959Filter;
import net.miatech.praxis.eecta.SQP03960Filter;
import net.miatech.praxis.eecta.SQP04006Filter;
import net.miatech.praxis.eecta.SQP04038Filter;
import net.miatech.praxis.eecta.SQP04039Filter;
import org.apache.log4j.Logger;
import org.springframework.web.multipart.MultipartFile;

/**
 *
 * @author vhidalgo
 */
public class CatalogoClienteDAO {

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

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public List<SQP03878Filter> getSQP03878Filter(SQP03878Filter filter) throws SQLException, Exception {
        List<SQP03878Filter> lstRtn = new ArrayList<SQP03878Filter>(0);
        SQP03878Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null, rs02 = null;
        String SQLCLL01 = "{CALL PXUATP.SQP03878(?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.registerOutParameter(5, Types.INTEGER);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.VP_OPCION);
            cstmt01.setString(3, filter.VP_CDCLI);
            cstmt01.setString(4, filter.VP_PARAM1);
            cstmt01.setInt(5, filter.page.PAGNUM);
            cstmt01.setInt(6, filter.page.PAGROW);
            cstmt01.setInt(7, filter.page.TOTPAG);
            cstmt01.setInt(8, filter.page.TOTROW);
            cstmt01.execute();
            filter.page.PAGNUM = cstmt01.getInt(5);
            filter.page.PAGROW = cstmt01.getInt(6);
            filter.page.TOTPAG = cstmt01.getInt(7);
            filter.page.TOTROW = cstmt01.getInt(8);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new SQP03878Filter();
                objRtn.A3953CCUST = rs01.getString("A3953CCUST");
                objRtn.A3953CDCLI = rs01.getString("A3953CDCLI");
                objRtn.A3953RSOCI = rs01.getString("A3953RSOCI");
                objRtn.A3953NCOME = rs01.getString("A3953NCOME");
                objRtn.A3953RFC = rs01.getString("A3953RFC");
                objRtn.A3953DIRE1 = rs01.getString("A3953DIRE1");
                objRtn.A3953DIRE2 = rs01.getString("A3953DIRE2");
                objRtn.A3953REFER = rs01.getString("A3953REFER");
                objRtn.A3953COLON = rs01.getString("A3953COLON");
                objRtn.A3953DELEG = rs01.getString("A3953DELEG");
                objRtn.A3953CIUDA = rs01.getString("A3953CIUDA");
                objRtn.A3953ESTAD = rs01.getString("A3953ESTAD");
                objRtn.A3953PAIS = rs01.getString("A3953PAIS");
                objRtn.A3953NPAIS = rs01.getString("A3953NPAIS");
                objRtn.A3953CP = rs01.getString("A3953CP");
                objRtn.A3953TELE1 = rs01.getString("A3953TELE1");
                objRtn.A3953TELE2 = rs01.getString("A3953TELE2");
                objRtn.A3953CDMTR = rs01.getString("A3953CDMTR");
                objRtn.A3953TCLIN = rs01.getString("A3953TCLIN");
                objRtn.A3953TORGN = rs01.getString("A3953TORGN");
                objRtn.A3953CONTR = rs01.getString("A3953CONTR");
                objRtn.A3953CTAMA = rs01.getString("A3953CTAMA");
                objRtn.A3953CDORA = rs01.getString("A3953CDORA");
                objRtn.A3953BANCO = rs01.getString("A3953BANCO");
                objRtn.A3953CTABC = rs01.getString("A3953CTABC");
                objRtn.A3953INDPE = rs01.getString("A3953INDPE");
                objRtn.A3953INDPL = rs01.getString("A3953INDPL");
                objRtn.A3953INDPP = rs01.getString("A3953INDPP");
                objRtn.A3953DIAPP = rs01.getInt("A3953DIAPP");
                objRtn.A3953PLZCR = rs01.getInt("A3953PLZCR");
                objRtn.A3953FALTA = rs01.getString("A3953FALTA");
                objRtn.A3953FBAJA = rs01.getString("A3953FBAJA");
                objRtn.A3953ARCPD = rs01.getString("A3953ARCPD");
                objRtn.A3953ARCTX = rs01.getString("A3953ARCTX");
                objRtn.A3953ARCEC = rs01.getString("A3953ARCEC");
                objRtn.A3953ARCFZ = rs01.getString("A3953ARCFZ");
                objRtn.A3953ARCFX = rs01.getString("A3953ARCFX");
                objRtn.A3953LOGO = rs01.getString("A3953LOGO").trim();
                objRtn.A3953STSID = rs01.getString("A3953STSID");
                objRtn.A3953STSDV = rs01.getString("A3953STSDV");
                objRtn.A3953REGIS = rs01.getString("A3953REGIS");
                objRtn.A3953FREGI = rs01.getString("A3953FREGI");
                objRtn.A3953HREGI = rs01.getString("A3953HREGI");
                objRtn.A3953REVIS = rs01.getString("A3953REVIS");
                objRtn.A3953FREVI = rs01.getString("A3953FREVI");
                objRtn.A3953HREVI = rs01.getString("A3953HREVI");
                //adicionales (CORRELATIVO LISTA VENTA)
                objRtn.A3962CONT1 = rs01.getInt("A3962CONT1");
                objRtn.A3962CONT2 = rs01.getInt("A3962CONT2");
                objRtn.A3962CONT1_E = rs01.getInt("A3962CONT1_E");
                

                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;

                lstRtn.add(objRtn);
            }

        } finally {
            if (rs01 != null) {
                try {
                    rs01.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            if (cstmt01 != null) {
                try {
                    cstmt01.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return lstRtn;
    }

    public SQP03879Filter setSQP03879Filter(SQP03879Filter filter) throws SQLException, Exception {
        CallableStatement cstmt = null;
        String SQLCLL01 = "{CALL PXUATP.SQP03879(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(42, Types.VARCHAR);
            cstmt.registerOutParameter(43, Types.VARCHAR);
            cstmt.registerOutParameter(44, Types.VARCHAR);

            cstmt.setString(1, filter.VP_ACTION);
            cstmt.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(3, filter.A3953CDCLI);
            cstmt.setString(4, filter.A3953RSOCI);
            cstmt.setString(5, filter.A3953NCOME);
            cstmt.setString(6, filter.A3953RFC);
            cstmt.setString(7, filter.A3953DIRE1);
            cstmt.setString(8, filter.A3953DIRE2);
            cstmt.setString(9, filter.A3953REFER);
            cstmt.setString(10, filter.A3953COLON);
            cstmt.setString(11, filter.A3953DELEG.trim());
            cstmt.setString(12, filter.A3953CIUDA);
            cstmt.setString(13, filter.A3953ESTAD);
            cstmt.setString(14, filter.A3953PAIS);
            cstmt.setString(15, filter.A3953NPAIS);
            cstmt.setString(16, filter.A3953CP);
            cstmt.setString(17, filter.A3953TELE1);
            cstmt.setString(18, filter.A3953TELE2);
            cstmt.setString(19, filter.A3953CDMTR);
            cstmt.setString(20, filter.A3953TCLIN);
            cstmt.setString(21, filter.A3953TORGN);
            cstmt.setString(22, filter.A3953CONTR.trim());
            cstmt.setString(23, filter.A3953CTAMA);
            cstmt.setString(24, filter.A3953CDORA);
            cstmt.setString(25, filter.A3953BANCO);
            cstmt.setString(26, filter.A3953CTABC);
            cstmt.setString(27, filter.A3953INDPE);
            cstmt.setString(28, filter.A3953INDPL);
            cstmt.setString(29, filter.A3953INDPP);
            cstmt.setInt(30, filter.A3953DIAPP);
            cstmt.setInt(31, filter.A3953PLZCR);
            cstmt.setString(32, filter.A3953FALTA);
            cstmt.setString(33, filter.A3953FBAJA);
            cstmt.setString(34, filter.A3953ARCPD);
            cstmt.setString(35, filter.A3953ARCTX);
            cstmt.setString(36, filter.A3953ARCEC);
            cstmt.setString(37, filter.A3953ARCFZ);
            cstmt.setString(38, filter.A3953ARCFX);
            cstmt.setString(39, filter.A3953LOGO.trim());
            cstmt.setString(40, filter.A3953STSID);
            cstmt.setString(41, filter.A3953STSDV);
            cstmt.execute();
            filter.dbException.SQLCODE = cstmt.getString(42);
            filter.dbException.MESSAGE = cstmt.getString(43);
            filter.OU_A3953CDCLI = cstmt.getString(44);
            
        } finally {
            if (cstmt != null) {
                try {
                    cstmt.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
        return filter;
    }

    public SQP03875Filter setSQP03875(SQP03875Filter filter, MultipartFile logofile) throws SQLException, Exception {
        CallableStatement cstmt01 = null;
        String SQLCLL01 = "{CALL PXUATP.SQP03875(?,?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(7, Types.BLOB);
            cstmt01.registerOutParameter(8, Types.VARCHAR);
            cstmt01.registerOutParameter(9, Types.VARCHAR);
            cstmt01.registerOutParameter(10, Types.VARCHAR); 
            
            filter.VP_PATHTMP= "/Dumps/";            
            filter.VP_NOMBRE = "L"+filter.VP_CDCLI+".jpg";
            File file = new File(filter.VP_PATHTMP + filter.VP_NOMBRE );
            if(!logofile.isEmpty()){                
                if (!file.exists()) 
                //Functions.deleteFile( filter.VP_PATHTMP + filter.VP_NOMBRE + ".jpg");                    
                logofile.transferTo(file);
            }              
            File fileload = new File(filter.VP_PATHTMP+filter.VP_NOMBRE);
            FileInputStream fis;
            fis = new FileInputStream(fileload);  
            
            cstmt01.setString(1, filter.VP_OPCION);
            cstmt01.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(3, filter.VP_CDCLI);
            cstmt01.setString(4, filter.VP_NOMBRE);
            cstmt01.setString(5, filter.VP_PATHTMP);
            cstmt01.setBinaryStream(6, fis, (int) fileload.length());
            cstmt01.execute();             
            filter.OU_CIMG = cstmt01.getBlob(7);
            filter.OU_NOMBRE=cstmt01.getString(8);                                                    
            filter.dbException.SQLCODE = cstmt01.getString(9);
            filter.dbException.MESSAGE = cstmt01.getString(10);
            
        } finally {
            if (cstmt01 != null) {
                try {
                    cstmt01.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
        return filter;
    }
    public SQP03875Filter get_clienteLogo(SQP03875Filter filter) throws SQLException, Exception {
        CallableStatement cstmt01 = null;
        String SQLCLL01 = "{CALL PXUATP.SQP03875(?,?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            
            cstmt01.registerOutParameter(7, Types.BLOB);
            cstmt01.registerOutParameter(8, Types.VARCHAR);
            cstmt01.registerOutParameter(9, Types.VARCHAR);
            cstmt01.registerOutParameter(10, Types.VARCHAR); 
            
            cstmt01.setString(1, filter.VP_OPCION);
            cstmt01.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(3, filter.VP_CDCLI);
            cstmt01.setString(4, filter.VP_NOMBRE);
            cstmt01.setString(5, filter.VP_PATHTMP);
            cstmt01.setBinaryStream(6, null, 0 );            
            cstmt01.execute();             
            filter.OU_CIMG = cstmt01.getBlob(7);
            filter.OU_NOMBRE=cstmt01.getString(8);                        
            //Fetch BLOB from DB
            if( filter.OU_CIMG != null ){
                Blob blb= filter.OU_CIMG; 
                byte barr[]=blb.getBytes(1,(int)blb.length());                
                String Rutatmp = session.getPropertySession().get("RUTA_DOWNLOAD")+"\\";
                FileOutputStream fout=new FileOutputStream( Rutatmp + filter.OU_NOMBRE );
                //FileOutputStream fout=new FileOutputStream("/Dumps/"+ filter.OU_NOMBRE  );                
                fout.write(barr);                
                fout.close();
            }                
            filter.dbException.SQLCODE = cstmt01.getString(9);
            filter.dbException.MESSAGE = cstmt01.getString(10);
            
        } finally {
            if (cstmt01 != null) {
                try {
                    cstmt01.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
        return filter;
    }
    
    
    public List<SQP03887Filter> getSQP03887Filter(SQP03887Filter filter) throws SQLException, Exception {
        List<SQP03887Filter> lstRtn = new ArrayList<SQP03887Filter>(0);
        SQP03887Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null, rs02 = null;
        String SQLCLL01 = "{CALL PXUATP.SQP03887(?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);
            cstmt01.registerOutParameter(9, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.VP_OPCION);
            cstmt01.setString(3, filter.VP_A3954TCUAT);
            cstmt01.setString(4, filter.VP_A3954CDCLI);
            cstmt01.setString(5, filter.VP_A3954DESCR);
            cstmt01.setInt(6, filter.page.PAGNUM);
            cstmt01.setInt(7, filter.page.PAGROW);
            cstmt01.setInt(8, filter.page.TOTPAG);
            cstmt01.setInt(9, filter.page.TOTROW);
            cstmt01.execute();
            filter.page.PAGNUM = cstmt01.getInt(6);
            filter.page.PAGROW = cstmt01.getInt(7);
            filter.page.TOTPAG = cstmt01.getInt(8);
            filter.page.TOTROW = cstmt01.getInt(9);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new SQP03887Filter();
                objRtn.A3954CCUST = rs01.getString("A3954CCUST");
                objRtn.A3954TCUAT = rs01.getString("A3954TCUAT").trim();
                objRtn.A3954DESCR = rs01.getString("A3954DESCR").trim();
                objRtn.A3954CDCLI = rs01.getString("A3954CDCLI").trim();
                //objRtn.A3954IDUAT = rs01.getString("A3954IDUAT").trim();
                //objRtn.A3954TCUAM = rs01.getString("A3954TCUAM").trim();
                objRtn.A3954FALTA = rs01.getString("A3954FALTA").trim();
                objRtn.A3954FBAJA = rs01.getString("A3954FBAJA").trim();
                objRtn.A3954REGIS = rs01.getString("A3954REGIS");
                objRtn.A3954FREGI = rs01.getString("A3954FREGI");
                objRtn.A3954HREGI = rs01.getString("A3954HREGI");
                objRtn.A3954REVIS = rs01.getString("A3954REVIS");
                objRtn.A3954FREVI = rs01.getString("A3954FREVI");
                objRtn.A3954HREVI = rs01.getString("A3954HREVI");
                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;

                lstRtn.add(objRtn);
            }

        } finally {
            if (rs01 != null) {
                try {
                    rs01.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            if (cstmt01 != null) {
                try {
                    cstmt01.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return lstRtn;
    }
    public SQP03888Filter setSQP03888(SQP03888Filter filter ) throws SQLException, Exception {
        CallableStatement cstmt01 = null;
        String SQLCLL01 = "{CALL PXUATP.SQP03888(?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(8, Types.VARCHAR);
            cstmt01.registerOutParameter(9, Types.VARCHAR);                        
            cstmt01.setString(1, filter.VP_ACTION);
            cstmt01.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(3, filter.A3954TCUAT);
            cstmt01.setString(4, filter.A3954DESCR);
            cstmt01.setString(5, filter.A3954CDCLI);
            //cstmt01.setString(6, filter.A3954IDUAT);
            //cstmt01.setString(7, filter.A3954TCUAM);
            cstmt01.setString(6, filter.A3954FALTA);
            cstmt01.setString(7, filter.A3954FBAJA);
            cstmt01.execute();            
            filter.dbException.SQLCODE = cstmt01.getString(8);
            filter.dbException.MESSAGE = cstmt01.getString(9);
            
        } finally {
            if (cstmt01 != null) {
                try {
                    cstmt01.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
        return filter;
    }
    public List<SQP03959Filter> getSQP03959Filter(SQP03959Filter filter) throws SQLException, Exception {
        List<SQP03959Filter> lstRtn = new ArrayList<SQP03959Filter>(0);
        SQP03959Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null, rs02 = null;
        String SQLCLL01 = "{CALL PXUATP.SQP03959(?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);
            cstmt01.registerOutParameter(9, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.VP_OPCION);
            cstmt01.setString(3, filter.A3979CDCLI);
            cstmt01.setString(4, filter.A3979IDCLI);
            cstmt01.setString(5, filter.A3979DESCR);
            cstmt01.setInt(6, filter.page.PAGNUM);
            cstmt01.setInt(7, filter.page.PAGROW);
            cstmt01.setInt(8, filter.page.TOTPAG);
            cstmt01.setInt(9, filter.page.TOTROW);
            cstmt01.execute();
            filter.page.PAGNUM = cstmt01.getInt(6);
            filter.page.PAGROW = cstmt01.getInt(7);
            filter.page.TOTPAG = cstmt01.getInt(8);
            filter.page.TOTROW = cstmt01.getInt(9);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new SQP03959Filter();
                objRtn.A3979CCUST = rs01.getString("A3979CCUST");
                objRtn.A3979CDCLI = rs01.getString("A3979CDCLI").trim();
                objRtn.A3979SEQID = rs01.getString("A3979SEQID").trim();
                objRtn.A3979DESCR = rs01.getString("A3979DESCR").trim();
                objRtn.A3979IDCLI = rs01.getString("A3979IDCLI").trim();                
                objRtn.A3979FALTA = rs01.getString("A3979FALTA").trim();
                objRtn.A3979FBAJA = rs01.getString("A3979FBAJA").trim();
                objRtn.A3979REGIS = rs01.getString("A3979REGIS");
                objRtn.A3979FREGI = rs01.getString("A3979FREGI");
                objRtn.A3979HREGI = rs01.getString("A3979HREGI");
                objRtn.A3979REVIS = rs01.getString("A3979REVIS");
                objRtn.A3979FREVI = rs01.getString("A3979FREVI");
                objRtn.A3979HREVI = rs01.getString("A3979HREVI");
                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;

                lstRtn.add(objRtn);
            }

        } finally {
            if (rs01 != null) {
                try {
                    rs01.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            if (cstmt01 != null) {
                try {
                    cstmt01.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return lstRtn;
    }
    public SQP03960Filter setSQP03960(SQP03960Filter filter ) throws SQLException, Exception {
        CallableStatement cstmt01 = null;
        String SQLCLL01 = "{CALL PXUATP.SQP03960(?,?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(9, Types.VARCHAR);
            cstmt01.registerOutParameter(10, Types.VARCHAR);                        
            cstmt01.setString(1, filter.VP_ACTION);
            cstmt01.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(3, filter.A3979CDCLI);
            cstmt01.setString(4, filter.A3979SEQID);
            cstmt01.setString(5, filter.A3979DESCR.trim());
            cstmt01.setString(6, filter.A3979IDCLI);            
            cstmt01.setString(7, filter.A3979FALTA);
            cstmt01.setString(8, filter.A3979FBAJA);
            cstmt01.execute();            
            filter.dbException.SQLCODE = cstmt01.getString(9);
            filter.dbException.MESSAGE = cstmt01.getString(10);
            
        } finally {
            if (cstmt01 != null) {
                try {
                    cstmt01.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
        return filter;
    }
     public List<SQP04006Filter> getSQP04006Filter(SQP04006Filter filter) throws SQLException, Exception {
        List<SQP04006Filter> lstRtn = new ArrayList<SQP04006Filter>(0);
        SQP04006Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null, rs02 = null;
        String SQLCLL01 = "{CALL PXUATP.SQP04006(?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.registerOutParameter(5, Types.INTEGER);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.VP_A3965CDCLI);
            cstmt01.setString(3, filter.VP_A3965PERIO);
            cstmt01.setString(4, filter.VP_A3965FEJEC);            
            cstmt01.setInt(5, filter.page.PAGNUM);
            cstmt01.setInt(6, filter.page.PAGROW);
            cstmt01.setInt(7, filter.page.TOTPAG);
            cstmt01.setInt(8, filter.page.TOTROW);
            cstmt01.execute();
            filter.page.PAGNUM = cstmt01.getInt(5);
            filter.page.PAGROW = cstmt01.getInt(6);
            filter.page.TOTPAG = cstmt01.getInt(7);
            filter.page.TOTROW = cstmt01.getInt(8);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new SQP04006Filter();
                objRtn.A3965CCUST = rs01.getString("A3965CCUST");
                objRtn.A3965CDCLI = rs01.getString("A3965CDCLI");
                objRtn.A3965PERIO = rs01.getString("A3965PERIO");
                objRtn.A3965INDPE = rs01.getString("A3965INDPE");
                objRtn.A3965FEJEC = rs01.getString("A3965FEJEC");   
                objRtn.A3965FPERI = rs01.getString("A3965FPERI");                
                objRtn.A3965FINIP = rs01.getString("A3965FINIP");
                objRtn.A3965FFINP = rs01.getString("A3965FFINP");
                objRtn.A3965STAT = rs01.getString("A3965STAT");
                objRtn.A3965ENV = rs01.getString("A3965ENV");
                objRtn.A3965PROCE = rs01.getString("A3965PROCE");
                objRtn.A3965FPROC = rs01.getString("A3965FPROC");
                objRtn.A3965HPROC = rs01.getString("A3965HPROC");
                objRtn.A3965REGIS = rs01.getString("A3965REGIS");
                objRtn.A3965FREGI = rs01.getString("A3965FREGI");
                objRtn.A3965HREGI = rs01.getString("A3965HREGI");
                objRtn.A3965REVIS = rs01.getString("A3965REVIS");
                objRtn.A3965FREVI = rs01.getString("A3965FREVI");
                objRtn.A3965HREVI = rs01.getString("A3965HREVI");
                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;

                lstRtn.add(objRtn);
            }

        } finally {
            if (rs01 != null) {
                try {
                    rs01.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            if (cstmt01 != null) {
                try {
                    cstmt01.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return lstRtn;
    }
      public List<SQP04038Filter> getSQP04038Filter(SQP04038Filter filter) throws SQLException, Exception {
        List<SQP04038Filter> lstRtn = new ArrayList<SQP04038Filter>(0);
        SQP04038Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null, rs02 = null;
        String SQLCLL01 = "{CALL PXUATP.SQP04038(?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.registerOutParameter(4, Types.INTEGER);
            cstmt01.registerOutParameter(5, Types.INTEGER);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.VP_A4007CDCLI);
            cstmt01.setString(3, filter.VP_A4007CONTR);                     
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
                objRtn = new SQP04038Filter();
                objRtn.A4007CCUST = rs01.getString("A4007CCUST");
                objRtn.A4007CDCLI = rs01.getString("A4007CDCLI");
                objRtn.A4007CONTR = rs01.getString("A4007CONTR");
                objRtn.A4007DESCR = rs01.getString("A4007DESCR");
                objRtn.A4007TCTR = rs01.getString("A4007TCTR");   
                objRtn.A4007FALTA = rs01.getString("A4007FALTA");                
                objRtn.A4007FBAJA = rs01.getString("A4007FBAJA");
                objRtn.A4007REGIS = rs01.getString("A4007REGIS");
                objRtn.A4007FREGI = rs01.getString("A4007FREGI");
                objRtn.A4007HREGI = rs01.getString("A4007HREGI");
                objRtn.A4007REVIS = rs01.getString("A4007REVIS");
                objRtn.A4007FREVI = rs01.getString("A4007FREVI");
                objRtn.A4007HREVI = rs01.getString("A4007HREVI");
                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;

                lstRtn.add(objRtn);
            }

        } finally {
            if (rs01 != null) {
                try {
                    rs01.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            if (cstmt01 != null) {
                try {
                    cstmt01.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return lstRtn;
    }
      public SQP04039Filter setSQP04039Filter(SQP04039Filter filter ) throws SQLException, Exception {
        CallableStatement cstmt01 = null;
        String SQLCLL01 = "{CALL PXUATP.SQP04039(?,?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(9, Types.VARCHAR);
            cstmt01.registerOutParameter(10, Types.VARCHAR);                        
            cstmt01.setString(1, filter.VP_ACTION);
            cstmt01.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(3, filter.A4007CDCLI);
            cstmt01.setString(4, filter.A4007CONTR);
            cstmt01.setString(5, filter.A4007DESCR.trim());
            cstmt01.setString(6, filter.A4007TCTR);            
            cstmt01.setString(7, filter.A4007FALTA);
            cstmt01.setString(8, filter.A4007FBAJA);
            cstmt01.execute();            
            filter.dbException.SQLCODE = cstmt01.getString(9);
            filter.dbException.MESSAGE = cstmt01.getString(10);
            
        } finally {
            if (cstmt01 != null) {
                try {
                    cstmt01.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
        return filter;
    }
    
}
