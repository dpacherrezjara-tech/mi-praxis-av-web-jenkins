/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.dao.gerencial;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.SQP01558Filter;
import net.miatech.beans.SQP01559Filter;
import net.miatech.beans.SQP01560Filter;
import net.miatech.beans.SQP01561Filter;
import net.miatech.beans.SQP01562Filter;
import net.miatech.beans.SQP01929Filter;
import net.miatech.beans.SQP01930Filter;
import net.miatech.beans.SQP01931Filter;
import net.miatech.beans.SQP01932Filter;
import net.miatech.beans.SQP02020Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author vhidalgo
 */
public class GdsDAO {

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

    public List<SQP01558Filter> getSQP01558Filter(SQP01558Filter filter) throws SQLException, Exception {
        List<SQP01558Filter> lstRtn = new ArrayList<SQP01558Filter>(0);
        SQP01558Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null, rs02 = null;
        String SQLCLL01 = "{CALL PXBIDT.SQP01558(?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.VP_YEAR);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new SQP01558Filter();
                objRtn.NBR = rs01.getString("NBR");
                objRtn.MES = rs01.getString("MES");
                objRtn.strDescription = Functions.getMonthConvert(objRtn.MES);
                objRtn.PAX = rs01.getInt("PAX");
                objRtn.BN = rs01.getInt("BN");
                objRtn.NET = rs01.getDouble("NET");
                objRtn.PAXM = rs01.getInt("PAXM");
                objRtn.NETM = rs01.getDouble("NETM");
                objRtn.PAXNM = rs01.getInt("PAXNM");
                objRtn.NETNM = rs01.getDouble("NETNM");
                objRtn.PAXNU = rs01.getInt("PAXNU");
                objRtn.NETNU = rs01.getDouble("NETNU");
                objRtn.PNOMATCH = rs01.getDouble("PNOMATCH");
                objRtn.OVERAGE = rs01.getDouble("OVERAGE");
                objRtn.CANCEL = rs01.getDouble("CANCEL");
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
    public List<SQP01562Filter> getSQP01562Filter(SQP01562Filter filter) throws SQLException, Exception  {
        List<SQP01562Filter> lstRtn = new ArrayList<SQP01562Filter>(0);
        SQP01562Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null, rs02 = null;
        String SQLCLL01 = "{CALL PXBIDT.SQP01562(?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.registerOutParameter(4, Types.INTEGER);
            cstmt01.registerOutParameter(5, Types.INTEGER);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.VP_YEAR);
            cstmt01.setString(3, filter.VP_AGTNAM);
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
                objRtn = new SQP01562Filter();
                objRtn.NBR = rs01.getString("NBR");
                objRtn.AGTCOD = rs01.getString("AGTCOD");
                objRtn.AGTNAM = rs01.getString("AGTNAM");
                objRtn.PAX = rs01.getInt("PAX");
                objRtn.BN = rs01.getInt("BN");
                objRtn.NET = rs01.getDouble("NET");
                objRtn.PAXM = rs01.getInt("PAXM");
                objRtn.NETM = rs01.getDouble("NETM");
                objRtn.PAXNM = rs01.getInt("PAXNM");
                objRtn.NETNM = rs01.getDouble("NETNM");
                objRtn.PAXNU = rs01.getInt("PAXNU");
                objRtn.NETNU = rs01.getDouble("NETNU");
                objRtn.OVERAGE = rs01.getDouble("OVERAGE");
                objRtn.PNOMATCH = rs01.getDouble("PNOMATCH");
                objRtn.CANCEL = rs01.getDouble("CANCEL");

                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;
                
                lstRtn.add(objRtn);
            }
            
            if ( cstmt01.getMoreResults() ){
                rs02 = cstmt01.getResultSet();
                while (rs02.next()) {
                    filter.TOT_PAX = rs02.getInt("PAX");
                    filter.TOT_NET = rs02.getInt("NET");
                    filter.TOT_PAXM = rs02.getInt("PAXM");
                    filter.TOT_NETM = rs02.getInt("NETM");
                    filter.TOT_PAXNU = rs02.getInt("PAXNU");
                    filter.TOT_NETNU = rs02.getInt("NETNU");
                    filter.TOT_PAXNM = rs02.getInt("PAXNM");
                    filter.TOT_NETNM = rs02.getInt("NETNM");
                    filter.TOT_OVERAGE = rs02.getInt("OVERAGE");
                    filter.TOT_CANCEL = rs02.getInt("CANCEL");
                }
            }                        
//            if ( cstmt01.getMoreResults() ){
//                Iterator iter = lstRtn.iterator();
//                Integer vi = 0;
//                while(iter.hasNext()){
//                    if ( vi == 0 ){
//                        
//                    }
//                    ++vi;
//                }
//            }

            /*if (cstmt01.getMoreResults()) {
             objRtn = new SQP01536Filter();
             objRtn.typeColumn = 1;
             lstRtn.add(objRtn);
             rs02 = cstmt01.getResultSet();
             while (rs02.next()) {
             objRtn = new SQP01536Filter();

             objRtn.typeColumn = 2;
                    
             lstRtn.add(objRtn);
             }
             }*/
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
    
    public List<SQP01559Filter> getSQP01559Filter(SQP01559Filter filter) throws SQLException, Exception  {
        List<SQP01559Filter> lstRtn = new ArrayList<SQP01559Filter>(0);
        SQP01559Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null, rs02 = null;
        String SQLCLL01 = "{CALL PXBIDT.SQP01559(?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.VP_MES);
            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new SQP01559Filter();
                objRtn.NBR = rs01.getString("NBR");
                objRtn.FDATE = rs01.getString("FDATE");
                objRtn.PAX = rs01.getInt("PAX");
                objRtn.BN = rs01.getInt("BN");
                objRtn.NET = rs01.getDouble("NET");
                objRtn.PAXM = rs01.getInt("PAXM");
                objRtn.NETM = rs01.getDouble("NETM");
                objRtn.PAXNM = rs01.getInt("PAXNM");
                objRtn.NETNM = rs01.getDouble("NETNM");
                objRtn.PAXNU = rs01.getInt("PAXNU");
                objRtn.NETNU = rs01.getDouble("NETNU");
                objRtn.OVERAGE = rs01.getDouble("OVERAGE");
                objRtn.PNOMATCH = rs01.getDouble("PNOMATCH");
                objRtn.CANCEL = rs01.getDouble("CANCEL");
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
    
    public List<SQP01560Filter> getSQP01560Filter(SQP01560Filter filter) throws SQLException, Exception {
        List<SQP01560Filter> lstRtn = new ArrayList<SQP01560Filter>(0);
        SQP01560Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null, rs02 = null;
        String SQLCLL01 = "{CALL PXBIDT.SQP01560(?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.VP_SEGDATE);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new SQP01560Filter();
                objRtn.NBR = rs01.getString("NBR");
                objRtn.FDATE = rs01.getString("FDATE");
                objRtn.FNUMBER = rs01.getString("FNUMBER");
                objRtn.PAX = rs01.getInt("PAX");
                objRtn.BN = rs01.getInt("BN");
                objRtn.NET = rs01.getDouble("NET");
                objRtn.PAXM = rs01.getInt("PAXM");
                objRtn.NETM = rs01.getDouble("NETM");
                objRtn.PAXNM = rs01.getInt("PAXNM");
                objRtn.NETNM = rs01.getDouble("NETNM");
                objRtn.PAXNU = rs01.getInt("PAXNU");
                objRtn.NETNU = rs01.getDouble("NETNU");
                objRtn.OVERAGE = rs01.getDouble("OVERAGE");
                objRtn.PNOMATCH = rs01.getDouble("PNOMATCH");
                objRtn.CANCEL = rs01.getDouble("CANCEL");
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
    public List<SQP01561Filter> getSQP01561Filter(SQP01561Filter filter) throws SQLException, Exception {
        List<SQP01561Filter> lstRtn = new ArrayList<SQP01561Filter>(0);
        SQP01561Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null, rs02 = null;
        String SQLCLL01 = "{CALL PXBIDT.SQP01561(?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.VP_SEGDATE);
            cstmt01.setString(3, filter.VP_FNUMBER);
            cstmt01.setString(4, filter.VNR);
            cstmt01.execute();
            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new SQP01561Filter();
                objRtn.NBR = rs01.getString("NBR");
                objRtn.GDS = rs01.getString("GDS");
                objRtn.FNUMBER = rs01.getString("FNUMBER");
                objRtn.SEGDATE = rs01.getString("SEGDATE");
                objRtn.ORIGEN = rs01.getString("ORIGEN");
                objRtn.DESTINO = rs01.getString("DESTINO");
                objRtn.PAXNAME = rs01.getString("PAXNAME");
                objRtn.NUMSEAT = rs01.getInt("NUMSEAT");
                objRtn.BN = rs01.getInt("BN");
                objRtn.NET = rs01.getDouble("NET");
                objRtn.VCPN = rs01.getDouble("VCPN");
                objRtn.CCIA = rs01.getString("CCIA");
                objRtn.FORMA = rs01.getString("FORMA");
                objRtn.SERIE = rs01.getString("SERIE");
                objRtn.SEQ = rs01.getString("SEQ");
                objRtn.CUPON = rs01.getString("CUPON");
                objRtn.VNR = rs01.getString("VNR");
                objRtn.IATA = rs01.getString("IATA");
                objRtn.AGNAME = rs01.getString("AGNAME");
                objRtn.ORI_DST = rs01.getString("ORIGEN") + '-' + rs01.getString("DESTINO");
                objRtn.TKT = rs01.getString("CCIA") + ' ' + rs01.getString("FORMA") + ' ' + rs01.getString("SERIE") + ' ' + rs01.getString("CUPON");
                objRtn.OVERAGE = rs01.getDouble("OVERAGE");
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
    public List<SQP02020Filter> getSQP02020Filter(SQP02020Filter filter) throws SQLException, Exception  {
        List<SQP02020Filter> lstRtn = new ArrayList<SQP02020Filter>(0);
        SQP02020Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null, rs02 = null;
        String SQLCLL01 = "{CALL PXBIDT.SQP02020(?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.VP_YEAR);
            cstmt01.setString(3, filter.VP_MONTH);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new SQP02020Filter();
                objRtn.NO = rs01.getInt("NO");
                objRtn.ESTADO = rs01.getString("ESTADO");
                objRtn.VNR = rs01.getString("VNR");
                objRtn.VNR_NAME = rs01.getString("VNR_NAME");
                objRtn.NET = rs01.getDouble("NET");
                objRtn.BN = rs01.getInt("BN");
                objRtn.PAX = rs01.getInt("PAX");
                objRtn.AVG = rs01.getDouble("AVG");                
                objRtn.PNLT = rs01.getDouble("PNLT");

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
    
    public List<SQP01929Filter> getSQP01929Filter(SQP01929Filter filter) throws SQLException, Exception  {
        List<SQP01929Filter> lstRtn = new ArrayList<SQP01929Filter>(0);
        SQP01929Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null, rs02 = null;
        String SQLCLL01 = "{CALL PXBIDT.SQP01929(?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.VP_DATE);
            cstmt01.setString(3, filter.VP_UNPRO);
            cstmt01.setString(4, filter.VP_IATA);
            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new SQP01929Filter();
                objRtn.NO = rs01.getInt("NO");
                objRtn.FDATE = rs01.getString("FDATE");
                objRtn.GDS = rs01.getString("GDS");
                objRtn.GDS_NAME = rs01.getString("GDS_NAME");
                objRtn.VNR = rs01.getString("VNR");
                objRtn.VNR_NAME = rs01.getString("VNR_NAME");
                objRtn.NET = rs01.getDouble("NET");
                objRtn.PAX = rs01.getInt("PAX");
                objRtn.AVG = rs01.getDouble("AVG");
                objRtn.BN = rs01.getInt("BN");                
                objRtn.PNLT = rs01.getDouble("PNLT");

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
    
     public List<SQP01932Filter> getSQP01932Filter(SQP01932Filter filter) throws SQLException, Exception  {
        List<SQP01932Filter> lstRtn = new ArrayList<SQP01932Filter>(0);
        SQP01932Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null, rs02 = null;
        String SQLCLL01 = "{CALL PXBIDT.SQP01932(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
        
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.registerOutParameter(10, Types.INTEGER);
            cstmt01.registerOutParameter(11, Types.INTEGER);
            cstmt01.registerOutParameter(12, Types.INTEGER);
            cstmt01.registerOutParameter(13, Types.INTEGER);
            
            cstmt01.registerOutParameter(14, Types.DOUBLE);
            cstmt01.registerOutParameter(15, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.VP_FDATE);
            cstmt01.setString(3, filter.VP_GDS);
            cstmt01.setString(4, filter.VP_VNR);
            cstmt01.setString(5, filter.VP_COUNTRY);
            cstmt01.setString(6, filter.VP_IATA);
            cstmt01.setString(7, filter.VP_PSEUDOC);
            cstmt01.setString(8, filter.VP_UNPRO);
            cstmt01.setString(9, filter.VP_FLAG_IATA);
            
            cstmt01.setInt(10, filter.page.PAGNUM);
            cstmt01.setInt(11, filter.page.PAGROW);
            cstmt01.setInt(12, filter.page.TOTPAG);
            cstmt01.setInt(13, filter.page.TOTROW);

            cstmt01.execute();
            
            filter.OU_TOTNET = cstmt01.getDouble(14);
            filter.OU_TOTPAX = cstmt01.getInt(15);

            filter.page.PAGNUM = cstmt01.getInt(10);
            filter.page.PAGROW = cstmt01.getInt(11);
            filter.page.TOTPAG = cstmt01.getInt(12);
            filter.page.TOTROW = cstmt01.getInt(13);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new SQP01932Filter();
                objRtn.NO = rs01.getInt("NO");
                if ( !"".equals(filter.VP_FDATE) &&  !"".equals(filter.VP_GDS) &&  !"".equals(filter.VP_VNR) &&  "".equals(filter.VP_COUNTRY) &&  "".equals(filter.VP_IATA)){
                    objRtn.GDS = rs01.getString("GDS");
                    objRtn.GDS_NAME = rs01.getString("GDS_NAME");
                    objRtn.COUNTRY = rs01.getString("COUNTRY");
                    objRtn.COUNTRY_NAME = rs01.getString("COUNTRY_NAME");
                    objRtn.NET = rs01.getDouble("NET");
                    objRtn.PAX = rs01.getInt("PAX");
                }
                if ( !"".equals(filter.VP_FDATE) &&  !"".equals(filter.VP_GDS) &&  !"".equals(filter.VP_VNR) &&  !"".equals(filter.VP_COUNTRY) &&  "".equals(filter.VP_IATA)){
                    objRtn.COUNTRY = rs01.getString("COUNTRY");
                    objRtn.COUNTRY_NAME = rs01.getString("COUNTRY_NAME");
                    objRtn.PSEUDOC = rs01.getString("PSEUDOC");
                    objRtn.IATA = rs01.getString("IATA");
                    objRtn.AGNAME = rs01.getString("AGNAME");
                    objRtn.NET = rs01.getDouble("NET");
                    objRtn.PAX = rs01.getInt("PAX");
                }
                if ( !"".equals(filter.VP_FDATE) &&  !"".equals(filter.VP_GDS) &&  !"".equals(filter.VP_VNR) &&  !"".equals(filter.VP_COUNTRY) &&  !"".equals(filter.VP_IATA)){
                    objRtn.GDS_NAME = rs01.getString("GDS_NAME");
                    objRtn.PARTNER = rs01.getString("PARTNER");
                    objRtn.COUNTRY = rs01.getString("COUNTRY");
                    objRtn.IATA = rs01.getString("IATA");
                    objRtn.PSEUDOC = rs01.getString("PSEUDOC");
                    objRtn.AGNAME = rs01.getString("AGNAME");
                    objRtn.PNRGDS = rs01.getString("PNRGDS");
                    objRtn.FNUMBER = rs01.getString("FNUMBER");
                    objRtn.FDATE = rs01.getString("FDATE");
                    objRtn.ORIGEN = rs01.getString("ORIGEN");
                    objRtn.DESTINO = rs01.getString("DESTINO");
                    objRtn.PAXNAME = rs01.getString("PAXNAME");
                    objRtn.NUMSEAT = rs01.getInt("NUMSEAT");
                    objRtn.BN = rs01.getInt("BN");
                    objRtn.NET = rs01.getDouble("NET");
                    objRtn.VNR_NAME = rs01.getString("VNR_NAME");
                    objRtn.ESTAFIN = !"I".equals(rs01.getString("ESTAFIN"));
                    objRtn.OPSDATE = rs01.getString("OPSDATE");
                    objRtn.GDS = rs01.getString("GDS");
                    objRtn.SEQR = rs01.getInt("SEQR");
                    objRtn.SEQBIDT = rs01.getInt("SEQBIDT");
                }
                
                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;
                
                objRtn.OU_TOTNET = filter.OU_TOTNET;
                objRtn.OU_TOTPAX = filter.OU_TOTPAX;

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
     public List<SQP01930Filter> getSQP01930Filter(SQP01930Filter filter) throws SQLException, Exception {
        List<SQP01930Filter> lstRtn = new ArrayList<SQP01930Filter>(0);
        SQP01930Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null, rs02 = null;
        String SQLCLL01 = "{CALL PXBIDT.SQP01930(?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.registerOutParameter(5, Types.INTEGER);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.VP_DATE);
            cstmt01.setString(3, filter.VP_UNPRO);
            cstmt01.setString(4, filter.VP_IATA);
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
                objRtn = new SQP01930Filter();
                objRtn.NO = rs01.getInt("NO");
                objRtn.COUNTRY = rs01.getString("COUNTRY");
                objRtn.COUNTRY_NAME = rs01.getString("COUNTRY_NAME");
                objRtn.NET = rs01.getDouble("NET");
                objRtn.PAX = rs01.getInt("PAX");
                objRtn.BN = rs01.getInt("BN");
                objRtn.PNLT = rs01.getDouble("PNLT");
                objRtn.AVG = rs01.getDouble("AVG");

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
     public List<SQP01931Filter> getSQP01931Filter(SQP01931Filter filter) throws SQLException, Exception {
        List<SQP01931Filter> lstRtn = new ArrayList<SQP01931Filter>(0);
        SQP01931Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null, rs02 = null;
        String SQLCLL01 = "{CALL PXBIDT.SQP01931(?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.registerOutParameter(5, Types.INTEGER);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.VP_DATE);
            cstmt01.setString(3, filter.VP_UNPRO);
            cstmt01.setString(4, filter.VP_IATA);
            
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
                objRtn = new SQP01931Filter();
                objRtn.NO = rs01.getInt("NO");
                objRtn.PSEUDOC = rs01.getString("PSEUDOC");
                objRtn.IATA = rs01.getString("IATA");
                objRtn.AGNAME = rs01.getString("AGNAME");
                objRtn.NET = rs01.getDouble("NET");
                objRtn.PAX = rs01.getInt("PAX");
                objRtn.BN = rs01.getInt("BN");
                objRtn.AVG = rs01.getInt("AVG");
                objRtn.PNLT = rs01.getInt("PNLT");

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
}
