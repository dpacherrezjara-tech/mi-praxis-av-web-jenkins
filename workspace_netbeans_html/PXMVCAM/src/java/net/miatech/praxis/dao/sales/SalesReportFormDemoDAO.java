/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.dao.sales;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import java.util.HashMap;
import net.miatech.utils.Functions;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.libmiatec.A006;
import net.miatech.praxis.exceptions.SpringException;

/**
 *
 * @author remicioluis
 */
public class SalesReportFormDemoDAO {
    
    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private String strSQL;
    private List<A006> listaData = new ArrayList();
    private HashMap RSP = new HashMap<String, String>();

    public SalesReportFormDemoDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public SalesReportFormDemoDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A006> loadCountryMasterFile(A006 filter) throws Exception {

        int totRows = 0;
        try {
            strSQL = "{CALL " + session.getMainLibrary() + ".PX022S03PXA006(?,?,?,?,?,?,?)}";

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(strSQL);
            cs.registerOutParameter(5, Types.INTEGER);
            cs.registerOutParameter(6, Types.INTEGER);
            cs.registerOutParameter(7, Types.INTEGER);

            cs.setString(1, "139");
            cs.setString(2, filter.strCampo);
            cs.setString(3, filter.strValor);
            cs.setString(4, filter.strName.trim());
            cs.setInt(5, filter.LIMIT);
            cs.setInt(6, filter.START);
            cs.setInt(7, filter.TOTROWS);
            //System.out.print("SQL :"+cs.getParameterMetaData().toString());
            cs.execute();
            totRows = cs.getInt(7);
            rst = cs.getResultSet();
            listaData.clear();
            A006 bean;
            while (rst.next()) {
                System.out.print("ROW :" + rst.getString("A006KEY").toString() + "n/");
                bean = new A006();
                bean.A006PAIS = rst.getString("A006KEY").trim();
                bean.A006NOMBRE = rst.getString("A006KEY1").trim();
                bean.A006KEY = rst.getString("A006KEY").trim();
                bean.A006KEY1 = rst.getString("A006KEY1").trim();
                bean.CODMONEDANUM = rst.getString("CODMONEDANUM").trim();
                bean.CODMONEDAALPHA = rst.getString("CODMONEDAALPHA");
                bean.NOMMONEDA = rst.getString("NOMMONEDA");
                bean.intTotalRws = totRows;
                listaData.add(bean);
            }
            setClose();
        } finally {
            setClose();
        }
        return listaData;
    }

    public HashMap setMaintanceA006(A006 filter, String strOption, String strCampo) throws Exception {
        try {
            strSQL = "{CALL " + session.getMainLibrary() + ".PX022S04PXA006(?,?,?,?,?,?,?,?,?,?)}";
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(strSQL);
            cs.setString(1, strOption);
            cs.setString(2, strCampo);
            cs.setString(3, filter.A006KEY);
            cs.setString(4, filter.A006KEY1);
            cs.setString(5, filter.CODMONEDANUM);
            cs.setString(6, filter.CODMONEDAALPHA);
            cs.setString(7, filter.NOMMONEDA);
            cs.setString(8, session.getUserView().getUserInfo().USR);
            cs.setString(9, Functions.getFechaActual());
            cs.setString(10, Functions.getHoraActual());
            // cs.execute();
            rst = cs.getResultSet();

            while (rst.next()) {
                RSP.put("sql_code", rst.getString("VSQLCODE"));
                RSP.put("response", rst.getString("VMESSAGE"));
            }
            setClose();
        } finally {
            setClose();
        }
        return RSP;
    }
    
    public List get_AuditData_A006(String keyTable, String Table) throws Exception {
        String texto = "";
        CallableStatement cs = null;
        String strSQL;
        //List listado = new ArrayList();
        List<A006> listado = new ArrayList();
        A006 bean;

        strSQL = "{CALL " + session.getMainLibrary() + ".PX020S04PXA005(?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(strSQL);
            cs.registerOutParameter(3, Types.VARCHAR);
            cs.setString(1, Table);
            cs.setString(2, keyTable);
            cs.setString(3, "");
            cs.execute();
            texto = cs.getString(3);
            bean = new A006();
            bean.A006USRCR = texto.substring(43, 52);
            bean.A006FECCR = texto.substring(53, 62);
            bean.A006HORCR = texto.substring(63, 72);
            bean.A006USRAC = texto.substring(73, 82);
            bean.A006FECAC = texto.substring(83, 92);
            bean.A006HORAC = texto.substring(93, 102);
            listado.add(bean);

        } finally {
            setClose();
        }
        return listado;
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
    
}
