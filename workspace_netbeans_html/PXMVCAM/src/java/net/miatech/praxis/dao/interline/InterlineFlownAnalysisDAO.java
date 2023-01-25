/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package net.miatech.praxis.dao.interline;

import net.miatech.praxis.dao.sales.*;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.ReportEmdDetailsA1530Filter;

import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.interline.filter.WRF016Filter;
import net.miatech.praxis.interline.filter.WRF071Filter;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;
/**
 *
 * @author andrea
 */

public class InterlineFlownAnalysisDAO {
    
    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public InterlineFlownAnalysisDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public InterlineFlownAnalysisDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

      public List<WRF071Filter> loadSQP00213(WRF071Filter filter) throws SQLException, Exception {
        List<WRF071Filter> lstRtn = new ArrayList<>(0);
        WRF071Filter objRtn;
         long totQTYC = 0, totQGRUPO = 0;
        double totGROSS = 0, totISC = 0, totOCOMIS = 0, totTAX = 0, totNETO = 0;
        CallableStatement cs = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00213(?,?,?,?,?,?,?,?)}";//" + session.getMainLibrary() + "
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(SQLCLL01);

            cs.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cs.setInt(2, filter.IN_TIPOFECHA);
            cs.setString(3, filter.IN_FECHA_FROM);
            cs.setString(4, filter.IN_FECHA_TO);
            cs.setString(5, filter.IN_CURRENCY);
            cs.setString(6, filter.IN_AIRLINE);
            cs.setString(7, filter.FECHA);
            cs.setString(8, filter.IN_PERIOD);

            cs.execute();

            rs01 = cs.getResultSet();
            while (rs01.next()) {
                totQTYC = rs01.getInt("QTYC");
                totQGRUPO = rs01.getInt("QGROUP");
                totGROSS = rs01.getDouble("GROSS");
                totISC = rs01.getDouble("ISC");
                totOCOMIS = rs01.getDouble("OCOMIS");
                totTAX = rs01.getDouble("TAX");
                totNETO = rs01.getDouble("NETO");

            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cs.getMoreResults()) {
                rs01 = cs.getResultSet();
                while (rs01.next()) {
                    objRtn = new WRF071Filter();
                    objRtn.FECHA = rs01.getString("FECHA");
                    objRtn.IN_PERIOD = rs01.getString("PERIOD");
                    objRtn.strFormatDate = Functions.getMonthConvert(rs01.getString("FECHA"));
                    objRtn.MONED = rs01.getString("MONED");
                    objRtn.QTYC = rs01.getInt("QTYC");
                    objRtn.QGRUPO = rs01.getInt("QGROUP");
                    objRtn.GROSS = rs01.getDouble("GROSS");
                    objRtn.ISC = rs01.getDouble("ISC");
                    objRtn.OCOMIS = rs01.getDouble("OCOMIS");
                    objRtn.TAX = rs01.getDouble("TAX");
                    objRtn.NETO = rs01.getDouble("NETO");
                    objRtn.Avg = (objRtn.QTYC > 0) ? objRtn.GROSS / objRtn.QTYC : 0;

                    objRtn.totQTYDOC = totQTYC;
                    objRtn.totQGRUPO = totQGRUPO;
                    objRtn.totGROSS = totGROSS;
                    objRtn.totISC = totISC;
                    objRtn.totOCOMIS = totOCOMIS;
                    objRtn.totTAX = totTAX;
                    objRtn.totNETO = totNETO;
                    objRtn.totAvg = (objRtn.totQTYDOC > 0) ? objRtn.totGROSS / objRtn.totQTYDOC : 0;

                    objRtn.IN_AIRLINE = filter.IN_AIRLINE;
                    objRtn.IN_CURRENCY = filter.IN_CURRENCY;
                    objRtn.IN_TIPOFECHA = filter.IN_TIPOFECHA;
                    objRtn.strDescripcion4 = Functions.getMonthConvert(filter.FECHA);

                    lstRtn.add(objRtn);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (rs01 != null) {
                try {
                    rs01.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            if (cs != null) {
                try {
                    cs.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return lstRtn;
    }
     
      
        public List<WRF071Filter> loadPX162S08WRF071(WRF071Filter filter) throws SQLException, Exception {
        List<WRF071Filter> lstRtn = new ArrayList<>(0);
        WRF071Filter objRtn;
         long totQTYC = 0, totQGRUPO = 0;
        double totGROSS = 0, totISC = 0, totOCOMIS = 0, totTAX = 0, totNETO = 0;
        CallableStatement cs = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX162S08WRF071(?,?,?,?,?,?,?,?)}";//" + session.getMainLibrary() + "
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(SQLCLL01);

            cs.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cs.setInt(2, filter.IN_TIPOFECHA);
            cs.setString(3, filter.IN_FECHA_FROM);
            cs.setString(4, filter.IN_FECHA_TO);
            cs.setString(5, filter.IN_CURRENCY);
            cs.setString(6, filter.IN_AIRLINE);
            cs.setString(7, filter.FECHA);
            cs.setString(8, filter.IN_PERIOD);

            cs.execute();

            rs01 = cs.getResultSet();
            while (rs01.next()) {
                totQTYC = rs01.getInt("QTYC");
                totGROSS = rs01.getDouble("GROSS");
                totISC = rs01.getDouble("ISC");
                totOCOMIS = rs01.getDouble("OCOMIS");
                totTAX = rs01.getDouble("TAX");
                totNETO = rs01.getDouble("NETO");

            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cs.getMoreResults()) {
                rs01 = cs.getResultSet();
                while (rs01.next()) {
                    objRtn = new WRF071Filter();
                    objRtn.strFormatDate=filter.strFormatDate;
                    objRtn.CIA = rs01.getString("CIA");
                    objRtn.IN_GB = rs01.getString("GRUPO");
                    objRtn.IN_PERIOD = filter.IN_PERIOD;
                    objRtn.strDescripcion = rs01.getString("DES_CIA");
                    objRtn.MONED = rs01.getString("MONED");
                    objRtn.QTYC = rs01.getInt("QTYC");
                    objRtn.GROSS = rs01.getDouble("GROSS");
                    objRtn.ISC = rs01.getDouble("ISC");
                    objRtn.OCOMIS = rs01.getDouble("OCOMIS");
                    objRtn.TAX = rs01.getDouble("TAX");
                    objRtn.NETO = rs01.getDouble("NETO");
                    objRtn.Avg = (objRtn.QTYC > 0) ? objRtn.GROSS / objRtn.QTYC : 0;

                    objRtn.totQTYDOC = totQTYC;
                    objRtn.totGROSS = totGROSS;
                    objRtn.totISC = totISC;
                    objRtn.totOCOMIS = totOCOMIS;
                    objRtn.totTAX = totTAX;
                    objRtn.totNETO = totNETO;
                    objRtn.totAvg = (objRtn.totQTYDOC > 0) ? objRtn.totGROSS / objRtn.totQTYDOC : 0;

                    objRtn.IN_AIRLINE = filter.IN_AIRLINE;
                    objRtn.IN_CURRENCY = filter.IN_CURRENCY;
                    objRtn.IN_TIPOFECHA = filter.IN_TIPOFECHA;
                    objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                    objRtn.IN_FECHA_TO = filter.IN_FECHA_TO;
                    objRtn.strDescripcion4 = Functions.getMonthConvert(filter.FECHA);
                    objRtn.FECHA = filter.FECHA;

                    lstRtn.add(objRtn);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (rs01 != null) {
                try {
                    rs01.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            if (cs != null) {
                try {
                    cs.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return lstRtn;
    }  
      
        
         public List<WRF071Filter> loadPX162S05A1437(WRF071Filter filter) throws SQLException, Exception {
        List<WRF071Filter> lstRtn = new ArrayList<>(0);
        WRF071Filter objRtn;
         long totQTYC = 0, totQGRUPO = 0;
        double totGROSS = 0, totISC = 0, totOCOMIS = 0, totTAX = 0, totNETO = 0;
        CallableStatement cs = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX162S05A050(?,?,?,?,?,?,?,?)}";//" + session.getMainLibrary() + "
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(SQLCLL01);

            cs.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cs.setInt(2, filter.IN_TIPOFECHA);
            cs.setString(3, filter.IN_FECHA_FROM);
            cs.setString(4, filter.IN_FECHA_TO);
            cs.setString(5, filter.IN_CURRENCY);
            cs.setString(6, filter.IN_AIRLINE);
            cs.setString(7, filter.FECHA);
            cs.setString(8, filter.IN_PERIOD);

            cs.execute();

            rs01 = cs.getResultSet();
            while (rs01.next()) {
                totQTYC = rs01.getInt("QTYC");
                totGROSS = rs01.getDouble("GROSS");
                totISC = rs01.getDouble("ISC");
                totOCOMIS = rs01.getDouble("OCOMIS");
                totTAX = rs01.getDouble("TAX");
                totNETO = rs01.getDouble("NETO");

            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cs.getMoreResults()) {
                rs01 = cs.getResultSet();
                while (rs01.next()) {
                    objRtn = new WRF071Filter();
                    objRtn.strFormatDate=filter.strFormatDate;
                    objRtn.CIA = rs01.getString("CIA");
                    objRtn.IN_GB = rs01.getString("GRUPO");
                    objRtn.IN_PERIOD = filter.IN_PERIOD;
                    objRtn.strDescripcion = rs01.getString("DES_CIA");
                    objRtn.MONED = rs01.getString("MONED");
                    objRtn.QTYC = rs01.getInt("QTYC");
                    objRtn.GROSS = rs01.getDouble("GROSS");
                    objRtn.ISC = rs01.getDouble("ISC");
                    objRtn.OCOMIS = rs01.getDouble("OCOMIS");
                    objRtn.TAX = rs01.getDouble("TAX");
                    objRtn.NETO = rs01.getDouble("NETO");
                    objRtn.Avg = (objRtn.QTYC > 0) ? objRtn.GROSS / objRtn.QTYC : 0;

                    objRtn.totQTYDOC = totQTYC;
                    objRtn.totGROSS = totGROSS;
                    objRtn.totISC = totISC;
                    objRtn.totOCOMIS = totOCOMIS;
                    objRtn.totTAX = totTAX;
                    objRtn.totNETO = totNETO;
                    objRtn.totAvg = (objRtn.totQTYDOC > 0) ? objRtn.totGROSS / objRtn.totQTYDOC : 0;

                    objRtn.IN_AIRLINE = filter.IN_AIRLINE;
                    objRtn.IN_CURRENCY = filter.IN_CURRENCY;
                    objRtn.IN_TIPOFECHA = filter.IN_TIPOFECHA;
                    objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                    objRtn.IN_FECHA_TO = filter.IN_FECHA_TO;
                    objRtn.strDescripcion4 = Functions.getMonthConvert(filter.FECHA);
                    objRtn.FECHA = filter.FECHA;

                    lstRtn.add(objRtn);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (rs01 != null) {
                try {
                    rs01.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            if (cs != null) {
                try {
                    cs.close();
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
