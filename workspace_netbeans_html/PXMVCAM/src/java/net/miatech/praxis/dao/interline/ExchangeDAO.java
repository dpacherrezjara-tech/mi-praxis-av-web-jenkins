/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.dao.interline;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.A720Filter;

import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author lmendoza
 */
public class ExchangeDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public ExchangeDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public ExchangeDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A720Filter> loadPX202S01A730(A720Filter filter) throws SQLException, Exception {

        List<A720Filter> lstRtn = new ArrayList<>(0);
        A720Filter objRtn;
        
        int contador = 0;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX202S01A730(?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);
            cstmt01.registerOutParameter(9, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_FECHA_FROM);
            cstmt01.setString(3, filter.IN_FECHA_TO);
            cstmt01.setString(4, filter.IN_CIA);
            cstmt01.setString(5, filter.strOption);//Invoice no Invoice
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
                
                objRtn = new A720Filter();
                objRtn.A720CIA = rs01.getString("A730CIA");
                objRtn.A720FORMA = rs01.getString("A730FORMA");
                objRtn.A720SERIE = rs01.getString("A730SERIE");
                objRtn.strDescripcion = objRtn.A720CIA + " " + objRtn.A720FORMA + objRtn.A720SERIE;
                objRtn.A720MONREG = rs01.getString("A730MONREG");
                objRtn.A720FECVTA = rs01.getString("A730FECVTA");
                objRtn.strFormatDate = Functions.getMonthConvert(objRtn.A720FECVTA);
                objRtn.A720MONEDA = rs01.getString("A730MONEDA");
                objRtn.A720TARIFA = rs01.getDouble("A730TARIFA");
                //objRtn.A720MDAPAG = rs01.getString("A730MDAPAG");
                //objRtn.A720TRFPAG = rs01.getDouble("A730TRFPAG");

                objRtn.A720NVLO1 = rs01.getString("A730NVLO1");
                objRtn.A720FVLO1 = rs01.getString("A730FVLO1");
                objRtn.strFormatDate1 = Functions.getMonthConvert(objRtn.A720FVLO1);
                //objRtn.A720FINVO1 = rs01.getString("A730FINVO1");
                objRtn.A720VALOR1 = rs01.getDouble("A730VALOR1");
                objRtn.A720CARRA1 = rs01.getString("A730CARRA1");
                if (!rs01.getString("A730RUTA0").trim().equals("")) {
                    objRtn.strDescripcion1 = rs01.getString("A730RUTA0") + "-" + rs01.getString("A730RUTA1");
                }

                objRtn.A720NVLO2 = rs01.getString("A730NVLO2");
                objRtn.A720FVLO2 = rs01.getString("A730FVLO2");
                objRtn.strFormatDate2 = Functions.getMonthConvert(objRtn.A720FVLO2);
                objRtn.A720VALOR2 = rs01.getDouble("A730VALOR2");
                //objRtn.A720FINVO2 = rs01.getString("A730FINVO2");
                objRtn.A720CARRA2 = rs01.getString("A730CARRA2");
                if (!rs01.getString("A730RUTA1").trim().equals("") && !rs01.getString("A730RUTA2").trim().equals("")) {
                    objRtn.strDescripcion2 = rs01.getString("A730RUTA1") + "-" + rs01.getString("A730RUTA2");
                }

                objRtn.A720NVLO3 = rs01.getString("A730NVLO3");
                objRtn.A720FVLO3 = rs01.getString("A730FVLO3");
                objRtn.strFormatDate3 = Functions.getMonthConvert(objRtn.A720FVLO3);
                objRtn.A720VALOR3 = rs01.getDouble("A730VALOR3");
                //objRtn.A720FINVO3 = rs01.getString("A730FINVO3");
                objRtn.A720CARRA3 = rs01.getString("A730CARRA3");
                if (!rs01.getString("A730RUTA2").trim().equals("") && !rs01.getString("A730RUTA3").trim().equals("")) {
                    objRtn.strDescripcion3 = rs01.getString("A730RUTA2") + "-" + rs01.getString("A730RUTA3");
                }

                objRtn.A720NVLO4 = rs01.getString("A730NVLO4");
                objRtn.A720FVLO4 = rs01.getString("A730FVLO4");
                objRtn.strFormatDate4 = Functions.getMonthConvert(objRtn.A720FVLO4);
                objRtn.A720VALOR4 = rs01.getDouble("A730VALOR4");
                //objRtn.A720FINVO4 = rs01.getString("A730FINVO4");
                objRtn.A720CARRA4 = rs01.getString("A730CARRA4");
                if (!rs01.getString("A730RUTA3").trim().equals("") && !rs01.getString("A730RUTA4").trim().equals("")) {
                    objRtn.strDescripcion4 = rs01.getString("A730RUTA3") + "-" + rs01.getString("A730RUTA4");
                }

                objRtn.strDescripcion5 = rs01.getString("A730CIA720") + " " + rs01.getString("A730FOR720") + rs01.getString("A730SER720");
                
                if(contador != 0){
                    if(lstRtn.get(contador - 1).strDescripcion5.equals(objRtn.strDescripcion5)){
                        objRtn.A720MONEDA = lstRtn.get(contador - 1).A720MONEDA;
                        objRtn.A720TARIFA = lstRtn.get(contador - 1).A720TARIFA;
                    }
                }

                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;
                lstRtn.add(objRtn);
                
                contador++;
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
