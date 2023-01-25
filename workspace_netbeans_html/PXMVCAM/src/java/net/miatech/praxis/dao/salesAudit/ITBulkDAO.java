/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.dao.salesAudit;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.SaleAudit.A2537Filter;
import net.miatech.beans.SaleAudit.A2643Filter;
import net.miatech.beans.SaleAudit.A2644Filter;

import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.A051;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author lmendoza
 */
public class ITBulkDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public ITBulkDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public ITBulkDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }
    
     public List<A2644Filter> Search(A2644Filter filter) throws SQLException, Exception {
        List<A2644Filter> lstRtn = new ArrayList<>(0);
        A2644Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PXNETAS.SQP00983(?,?, ?, ?, ?, ?, ?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);
            cstmt01.registerOutParameter(9, Types.INTEGER);

            cstmt01.setString(1, filter.VP_OPCION);
            cstmt01.setString(2, filter.VP_A2644ID);
            cstmt01.setString(3, filter.VP_A2644TIPO);
            cstmt01.setString(4, filter.VP_A2644TCODE);
            cstmt01.setString(5, filter.A2644SEQ);

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
                objRtn = new A2644Filter();
                objRtn.A2644ID = rs01.getString("A2644ID").trim();
                objRtn.A2644SEQ = rs01.getString("A2644SEQ");
                objRtn.A2643TCODE = rs01.getString("A2643TCODE");

                objRtn.A2644FAMI = rs01.getString("A2644FAMI");
                objRtn.A2644SFAMI = rs01.getString("A2644SFAMI");
                objRtn.A2644TIPO = rs01.getString("A2644TIPO");
                objRtn.A2643VENTP = rs01.getString("A2643VENTP");
                objRtn.A2643VIGD = rs01.getString("A2643VIGD");
                objRtn.A2643VIGH = rs01.getString("A2643VIGH");
                objRtn.A2644INDIC = rs01.getString("A2644INDIC");
                objRtn.A2643IEMI = rs01.getString("A2643IEMI");
                objRtn.A2644INGRE = rs01.getString("A2644INGRE");
                objRtn.A2644FINGR = rs01.getString("A2644FINGR");
                objRtn.A2644HINGR = rs01.getString("A2644HINGR");
                objRtn.A2644MODIF = rs01.getString("A2644MODIF");
                objRtn.A2644FMODI = rs01.getString("A2644FMODI");
                objRtn.A2644HMODI = rs01.getString("A2644HMODI");
                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;

                lstRtn.add(objRtn);
            }

        } catch (Exception e) {
            e.getMessage();
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

    public A2643Filter SearchDetalle(A2643Filter filter) throws SQLException, Exception {
        A2643Filter objRtn = new A2643Filter();

        CallableStatement cstmt01 = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL PXNETAS.SQP00991(?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, filter.VP_A2644ID);
            cstmt01.setString(2, filter.VP_A2644SEQ);

            cstmt01.execute();

            rst = cstmt01.getResultSet();

            while (rst.next()) {
                objRtn = new A2643Filter();
                objRtn.A2643ID = rst.getString("A2643ID");
                objRtn.A2643SEQ = rst.getString("A2643SEQ");
                objRtn.A2643TCODE = rst.getString("A2643TCODE");
                objRtn.A2643VIGD = rst.getString("A2643VIGD");
                objRtn.A2643VIGH = rst.getString("A2643VIGH");
                objRtn.A2643VENTP = rst.getString("A2643VENTP");
                objRtn.A2643AGEN = rst.getString("A2643AGEN");
                objRtn.A2643FSOLI = rst.getString("A2643FSOLI");
                objRtn.A2643COMIS = rst.getString("A2643COMIS");
                objRtn.A2643PCOMI = rst.getString("A2643PCOMI");
                objRtn.A2643SOLI = rst.getString("A2643SOLI");
                objRtn.A2643AUTO = rst.getString("A2643AUTO");
                objRtn.A2643AAUT = rst.getString("A2643AAUT");
                objRtn.A2643COMEN = rst.getString("A2643COMEN");
                objRtn.A2643OWRT = rst.getString("A2643OWRT");
                objRtn.A2643IORIG = rst.getString("A2643IORIG");
                objRtn.A2643ORIG = rst.getString("A2643ORIG");
                objRtn.A2643IDEST = rst.getString("A2643IDEST");
                objRtn.A2643DEST = rst.getString("A2643DEST");
                objRtn.A2643RUTO = rst.getString("A2643RUTO");
                objRtn.A2643BOOK = rst.getString("A2643BOOK");
                objRtn.A2643ACCO = rst.getString("A2643ACCO");
                objRtn.A2643FBASI = rst.getString("A2643FBASI");
                objRtn.A2643MONE = rst.getString("A2643MONE");
                objRtn.A2643FSINQ = rst.getInt("A2643FSINQ");
                objRtn.A2643Q = rst.getInt("A2643Q");
                objRtn.A2643FARE = rst.getInt("A2643FARE");
                objRtn.A2643BIN = rst.getString("A2643BIN");
                objRtn.A2643CANAL = rst.getString("A2643CANAL");
                objRtn.A2643SCANA = rst.getString("A2643SCANA");
                objRtn.A2643FRESD = rst.getString("A2643FRESD");
                objRtn.A2643FRESH = rst.getString("A2643FRESH");
                objRtn.A2643FVEND = rst.getString("A2643FVEND");
                objRtn.A2643FVENH = rst.getString("A2643FVENH");
                objRtn.A2643FVUED = rst.getString("A2643FVUED");
                objRtn.A2643FVUEH = rst.getString("A2643FVUEH");
                objRtn.A2643TIPVJ = rst.getString("A2643TIPVJ");
                objRtn.A2643CXR = rst.getString("A2643CXR");
                objRtn.A2643VAAPL = rst.getString("A2643VAAPL");
                objRtn.A2643GDS = rst.getString("A2643GDS");
                objRtn.A2643IEMI = rst.getString("A2643IEMI");
                objRtn.A2643PNR = rst.getString("A2643PNR");
                objRtn.A2643TAXE = rst.getInt("A2643TAXE");
                objRtn.A2643TMND = rst.getString("A2643TMND");
                objRtn.A2643FEQU = rst.getInt("A2643FEQU");
                objRtn.A2643MFEQ = rst.getString("A2643MFEQ");
                objRtn.A2643SEASO = rst.getString("A2643SEASO");
                objRtn.A2643STOP = rst.getString("A2643STOP");
                objRtn.A2643TPSJ = rst.getString("A2643TPSJ");
                objRtn.A2643EPAIS = rst.getString("A2643EPAIS");
                objRtn.A2643BDSD = rst.getString("A2643BDSD");
                objRtn.A2643BHST = rst.getString("A2643BHST");
                objRtn.A2643PDES = rst.getString("A2643PDES");
                objRtn.A2643CAPP = rst.getString("A2643CAPP");
                objRtn.A2643NPAX = rst.getString("A2643NPAX");
                objRtn.A2643TKT = rst.getString("A2643TKT");
                objRtn.A2643EMIN = rst.getString("A2643EMIN");
                objRtn.A2643EMAX = rst.getString("A2643EMAX");
                objRtn.A2643IT2 = rst.getString("A2643IT2");
                objRtn.A2643CGRUP = rst.getString("A2643CGRUP");
                objRtn.A2643CCCAM = rst.getString("A2643CCCAM");
                objRtn.A2643MCCCA = rst.getString("A2643MCCCA");
                objRtn.A2643SVARI = rst.getString("A2643SVARI");
                objRtn.A2643HSALI = rst.getString("A2643HSALI");
                objRtn.A2643HLLEG = rst.getString("A2643HLLEG");
                objRtn.A2643CODIG = rst.getString("A2643CODIG");
                objRtn.A2643DSUPF = rst.getString("A2643DSUPF");
                objRtn.A2643INGRE = rst.getString("A2643INGRE");
                objRtn.A2643FINGR = rst.getString("A2643FINGR");
                objRtn.A2643HINGR = rst.getString("A2643HINGR");
                objRtn.A2643MODIF = rst.getString("A2643MODIF");
                objRtn.A2643FMODI = rst.getString("A2643FMODI");
                objRtn.A2643HMODI = rst.getString("A2643HMODI");
            }

        } catch (Exception e) {
            e.getMessage();
        } finally {
            if (rst != null) {
                try {
                    rst.close();
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

        return objRtn;
    }

    public List<A2643Filter> SearchReference(String tCode) throws SQLException, Exception {
        List<A2643Filter> lstRtn = new ArrayList<>(0);
        A2643Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PXNETAS.SQP01031(?, ?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, tCode);
            cstmt01.execute();
            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new A2643Filter();
                objRtn.A2681Reference = rs01.getString("A2681CDALT");
                lstRtn.add(objRtn);
            }

        } catch (Exception e) {
            e.getMessage();
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
    
    
    
    
    public A2644Filter  mantenimientoITNetas( A2644Filter filter ) throws SQLException, Exception {           
        
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PXNETAS.SQP01032(?, ?, ?, ?, ?, ?, ?, ?, ?, ?,"
                + "                               ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,"
                + "                               ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, "
                + "                               ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, "
                + "                               ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, "
                + "                               ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, "
                + "                               ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, "
                + "                               ?, ?, ?, ?  )}";
        Connection cnx = null;

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection(); 
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(73, Types.VARCHAR);  
            cstmt01.registerOutParameter(74, Types.VARCHAR);
            // Cabecera
            cstmt01.setString(1, filter.VP_OPCION );
            cstmt01.setString(2, filter.A2644FAMI);
            cstmt01.setString(3, filter.A2644SFAMI );
            cstmt01.setString(4, filter.A2644ID);
            cstmt01.setString(5, filter.A2644SEQ);
            cstmt01.setString(6, filter.A2644TIPO);
            cstmt01.setString(7, filter.A2644INDIC); 
            // Detalle

            cstmt01.setString(8, filter.A2643TCODE);
            cstmt01.setString(9, filter.A2643VIGD);
            cstmt01.setString(10, filter.A2643VIGH);      
            cstmt01.setString(11, filter.A2643VENTP);
            cstmt01.setString(12, filter.A2643AGEN);      
            cstmt01.setString(13, filter.A2643FSOLI);
            cstmt01.setString(14, filter.A2643COMIS);
            cstmt01.setString(15, filter.A2643PCOMI);
            cstmt01.setString(16, filter.A2643SOLI);
            cstmt01.setString(17, filter.A2643AUTO);
            
            cstmt01.setString(18, filter.A2643AAUT);
            cstmt01.setString(19, filter.A2643COMEN);
            cstmt01.setString(20, filter.A2643OWRT);
            cstmt01.setString(21, filter.A2643IORIG);
            cstmt01.setString(22, filter.A2643ORIG);
            cstmt01.setString(23, filter.A2643IDEST);
            cstmt01.setString(24, filter.A2643DEST);
            cstmt01.setString(25, filter.A2643RUTO);         
            cstmt01.setString(26, filter.A2643BOOK);
            
            cstmt01.setString(27, filter.A2643ACCO);
            cstmt01.setString(28, filter.A2643FBASI);
            cstmt01.setString(29, filter.A2643MONE);
            cstmt01.setInt(30, filter.A2643FSINQ);
            cstmt01.setInt(31, filter.A2643Q);
            cstmt01.setInt(32, filter.A2643FARE);
            cstmt01.setString(33, filter.A2643BIN);
            cstmt01.setString(34, filter.A2643CANAL);
            cstmt01.setString(35, filter.A2643SCANA);           
            cstmt01.setString(36, filter.A2643FRESD);
            
            cstmt01.setString(37, filter.A2643FRESH);
            cstmt01.setString(38, filter.A2643FVEND);
            cstmt01.setString(39, filter.A2643FVENH);
            cstmt01.setString(40, filter.A2643FVUED);
            cstmt01.setString(41, filter.A2643FVUEH);
            cstmt01.setString(42, filter.A2643TIPVJ);
            cstmt01.setString(43, filter.A2643CXR);
            cstmt01.setString(44, filter.A2643VAAPL);
            cstmt01.setString(45, filter.A2643GDS);           
            cstmt01.setString(46, filter.A2643IEMI);
            
            cstmt01.setString(47, filter.A2643PNR);
            cstmt01.setInt(48, filter.A2643TAXE);
            cstmt01.setString(49, filter.A2643TMND);
            cstmt01.setInt(50, filter.A2643FEQU);
            cstmt01.setString(51, filter.A2643MFEQ);
            cstmt01.setString(52, filter.A2643SEASO);
            cstmt01.setString(53, filter.A2643STOP);
            cstmt01.setString(54, filter.A2643TPSJ);
            cstmt01.setString(55, filter.A2643EPAIS);           
            cstmt01.setString(56, filter.A2643BDSD);
            
            cstmt01.setString(57, filter.A2643BHST);
            cstmt01.setString(58, filter.A2643PDES);
            cstmt01.setString(59, filter.A2643CAPP);
            cstmt01.setString(60, filter.A2643NPAX);
            cstmt01.setString(61, filter.A2643TKT);
            cstmt01.setString(62, filter.A2643EMIN);
            cstmt01.setString(63, filter.A2643EMAX);
            cstmt01.setString(64, filter.A2643IT2);
            cstmt01.setString(65, filter.A2643CGRUP);           
            cstmt01.setString(66, filter.A2643CCCAM);
            
            cstmt01.setString(67, filter.A2643MCCCA);
            cstmt01.setString(68, filter.A2643SVARI);
            cstmt01.setString(69, filter.A2643HSALI);
            cstmt01.setString(70, filter.A2643HLLEG);
            cstmt01.setString(71, filter.A2643CODIG);
            cstmt01.setString(72, filter.A2643DSUPF);  

            cstmt01.execute();                        
            filter.dbException.SQLCODE = cstmt01.getString(73);
            filter.dbException.MESSAGE = cstmt01.getString(74);                        
        } finally {
            if (cstmt01 != null) {                
                try { cstmt01.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
        return filter;
    }
    
    
    
    public List<A051> cargarComboType() throws SQLException, Exception {

        List<A051> lstRtn = new ArrayList<A051>(0);
        A051 objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PXNETAS.SQP01037(?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1,"CB");
            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            int pos = 0;
            while (rs01.next()) {
                pos++;
                objRtn = new A051();
                objRtn.A051KEY2 = rs01.getString("A051KEY2");//
                objRtn.A051DESCR1 = rs01.getString("A051DESCR1");//

                lstRtn.add(objRtn);
            }

        } catch (Exception e) {
            e.getMessage();
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

}
