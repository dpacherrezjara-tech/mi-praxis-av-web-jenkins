/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.dao.payments;

import java.io.BufferedReader;
import net.miatech.praxis.dao.interline.*;
import net.miatech.praxis.dao.sales.*;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import net.miatech.beans.ReportEmdDetailsA1530Filter;
import net.miatech.beans.spring.ServerSession;

import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.A003;
import net.miatech.praxis.interline.filter.SFI021Filter;
import net.miatech.praxis.interline.filter.WRF016Filter;
import net.miatech.praxis.payment.A4202;
import net.miatech.praxis.payment.MPF218;
import net.miatech.praxis.payment.MPF218Filter;
import net.miatech.praxis.payment.MPF221;
import net.miatech.praxis.payment.MPF221Filter;
import net.miatech.praxis.payment.MPF295;
import net.miatech.praxis.payment.MPF295Filter;
import net.miatech.praxis.payment.filter.A2280Filter;
import net.miatech.praxis.payment.filter.A2287Filter;
import net.miatech.praxis.payment.filter.A2290Filter;
import net.miatech.praxis.payment.filter.A2354Filter;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author lmendoza
 */
public class CargoGuideDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public CargoGuideDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public CargoGuideDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<MPF295> loadMPS587(MPF295Filter filter) throws SQLException, Exception {

        List<MPF295> lstData = new ArrayList<MPF295>(0);
        MPF295 bean;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + "MP.MPS587(?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(8, Types.INTEGER);
            cstmt.registerOutParameter(9, Types.INTEGER);
            cstmt.registerOutParameter(10, Types.INTEGER);
            cstmt.registerOutParameter(11, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_FECHA_FROM.trim());
            cstmt.setString(3, filter.IN_FECHA_TO.trim());
            cstmt.setString(4, filter.IN_OPTION.trim());
            cstmt.setString(5, filter.IN_SCURRENCY.trim());
            cstmt.setString(6, filter.IN_COUNTRY.trim());
            cstmt.setString(7, filter.IN_STVAL.trim());
            cstmt.setInt(8, filter.page.PAGNUM);
            cstmt.setInt(9, filter.page.PAGROW);
            cstmt.setInt(10, filter.page.TOTPAG);
            cstmt.setInt(11, filter.page.TOTROW);

            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(8);
            filter.page.PAGROW = cstmt.getInt(9);
            filter.page.TOTPAG = cstmt.getInt(10);
            filter.page.TOTROW = cstmt.getInt(11);

            rst = cstmt.getResultSet();
            while (rst.next()) {
                bean = new MPF295();
                bean.RN = rst.getLong("RN");
                bean.CCUST = rst.getString("CCUST").trim();
                bean.SCOUNTRY = rst.getString("SCOUNTRY").trim();
                bean.NCICLO = rst.getString("NCICLO").trim();
                bean.METPAGO = rst.getString("METPAGO").trim();
                bean.SCURRENCY = rst.getString("SCURRENCY").trim();
                bean.ADATE = rst.getString("ADATE").trim();
                bean.PAYDAY = rst.getString("PAYDAY").trim();
                bean.NPAGE = rst.getString("NPAGE").trim();
                bean.MONTO = rst.getDouble("MONTO");
                bean.CUSCA = rst.getString("CUSCA").trim();
                bean.CODPSE = rst.getString("CODPSE").trim();
                bean.BANDOC = rst.getString("BANDOC").trim();
                bean.TYPE = rst.getString("TYPE").trim();
                bean.SEQ = rst.getString("SEQ").trim();
                
                bean.USCR = rst.getString("USCR").trim();
                bean.FECR = rst.getString("FECR").trim();
                bean.HOCR = rst.getString("HOCR").trim();
                
                bean.USUP = rst.getString("USUP").trim();
                bean.FEUP = rst.getString("FEUP").trim();
                bean.HOUP = rst.getString("HOUP").trim();
                
                bean.page.PAGNUM = filter.page.PAGNUM;
                bean.page.PAGROW = filter.page.PAGROW;
                bean.page.TOTPAG = filter.page.TOTPAG;
                bean.page.TOTROW = filter.page.TOTROW;

                lstData.add(bean);
            }
            rst.close();

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (rst != null) {
                try {
                    rst.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
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

        return lstData;
    }
    
    public Map<String, Object> updateMPS588(MPF295Filter bean) throws SQLException, Exception {
        Map<String, Object> response = new HashMap<>();
        CallableStatement cstmt = null;
        Connection cnx = null;

        String SQLCLL = "{CALL PRAXISMP.MPS588(?,?,?,?,?,?,?,?,?,?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL);

            // --- 1. SETEAMOS LAS LLAVES Y CAMPOS ---
            cstmt.setString(1, bean.IN_CCUST);
            cstmt.setString(2, bean.IN_SCOUNTRY);
            cstmt.setString(3, bean.IN_NPAGE);
            cstmt.setString(4, bean.IN_PAYDAY);
            cstmt.setString(5, bean.IN_TYPE);
            cstmt.setString(6, bean.IN_SEQ);
            cstmt.setDouble(7, bean.IN_MONTO); 
            cstmt.setString(8, bean.IN_ADATE); 
            cstmt.setString(9, bean.option);
            cstmt.setString(10, session.getUserView().getUserInfo().USR);

            cstmt.registerOutParameter(11, Types.INTEGER); 
            cstmt.registerOutParameter(12, Types.VARCHAR); 

            cstmt.execute();

            int outCode = cstmt.getInt(11);
            String outMensaje = cstmt.getString(12);

            response.put("success", (outCode == 1)); 
            response.put("mensaje", outMensaje);

        } catch (Exception e) {
            e.printStackTrace();
            response.put("success", false);
            response.put("mensaje", "Error en BD: " + e.getMessage());
        } finally {
            // Cerramos conexiones para evitar memory leaks
            if (cstmt != null) {
                try {
                    cstmt.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
        }

        return response;
    }
}
