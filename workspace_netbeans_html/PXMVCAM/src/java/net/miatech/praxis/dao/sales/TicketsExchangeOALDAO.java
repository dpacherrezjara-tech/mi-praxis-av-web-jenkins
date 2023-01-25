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
import net.miatech.beans.PX150S01A730Filter;

import net.miatech.beans.spring.implement.IServerSession;
import org.apache.log4j.Logger;

/**
 *
 * @author lmendoza
 */
public class TicketsExchangeOALDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public TicketsExchangeOALDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public TicketsExchangeOALDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<PX150S01A730Filter> loadPX150S01A730(PX150S01A730Filter filter) throws SQLException, Exception {
        List<PX150S01A730Filter> lstRtn = new ArrayList<>(0);
        PX150S01A730Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL SQP00224_1(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";// PX150S01A730
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(14, Types.INTEGER);
            cstmt01.registerOutParameter(15, Types.INTEGER);
            cstmt01.registerOutParameter(16, Types.INTEGER);
            cstmt01.registerOutParameter(17, Types.INTEGER);
            cstmt01.setInt(1, filter.IN_OPCION);
            cstmt01.setString(2, filter.IN_FLAG);
            cstmt01.setString(3, filter.IN_FECHAFROM);
            cstmt01.setString(4, filter.IN_FECHATO);
            cstmt01.setString(5, filter.IN_SOURCE);
            cstmt01.setString(6, filter.IN_PAIS);
            cstmt01.setString(7, filter.IN_BANCO);
            cstmt01.setString(8, filter.IN_IATA);
            cstmt01.setString(9, filter.IN_STATUS);
            cstmt01.setString(10, filter.IN_GRUPO);
            cstmt01.setString(11, filter.IN_TKT);
            cstmt01.setString(12, filter.IN_INDICATOR);
            cstmt01.setString(13, filter.IN_PERIOD);
            //param pagin
            cstmt01.setInt(14, filter.page.PAGNUM);
            cstmt01.setInt(15, filter.page.PAGROW);
            cstmt01.setInt(16, filter.page.TOTPAG);
            cstmt01.setInt(17, filter.page.TOTROW);
            cstmt01.execute();
            // Recupera paginacion SQL
            filter.page.PAGNUM = cstmt01.getInt(14);
            filter.page.PAGROW = cstmt01.getInt(15);
            filter.page.TOTPAG = cstmt01.getInt(16);
            filter.page.TOTROW = cstmt01.getInt(17);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new PX150S01A730Filter();
                //objRtn.A720GRUPO = rs01.getString("A720GRUPO");
                //objRtn.A1530STPRO = rs01.getString("A1530STPRO");
                objRtn.A1964FCONT = rs01.getString("A1964FCONT");
                objRtn.A1964INVOICE = rs01.getString("A1964INVOICE");
                objRtn.A1530FPROC = rs01.getString("A1530FPROC");
                objRtn.A720ORIG = rs01.getString("A720ORIG");
                objRtn.A720AGENTE = rs01.getString("A720AGENTE");
                objRtn.A720FECVTA = rs01.getString("A720FECVTA");
                objRtn.A730FECVTA = rs01.getString("A730FECVTA");
                objRtn.A720CIAI = rs01.getString("A720CIAI");
                objRtn.A720DOCUMENT = rs01.getString("A720DOCUMENT");
                objRtn.A730CIA = rs01.getString("A730CIA");
                objRtn.A730DOCUMENT = rs01.getString("A730DOCUMENT");
                objRtn.A720ETKT = rs01.getString("A720ETKT");
                objRtn.A730FLAG = rs01.getString("A730FLAG") + rs01.getString("A730NSEQ");
                objRtn.A730NSEQ = rs01.getString("A730NSEQ");
                objRtn.A730CUPON = rs01.getString("A730_CUPON");
                objRtn.A730MONREG = rs01.getString("A730MONREG");
                objRtn.DES_A050CRTR = rs01.getString("DES_A050CRTR");
                // objRtn.DES_A050FCONTA =Functions.getMonthConvert( rs01.getString("DES_A050FCONTA"));
                objRtn.DES_A050FCONTA = rs01.getString("DES_A050FCONTA");
                objRtn.VALUE = rs01.getDouble("A730_VALOR");
                if (objRtn.VALUE == 0) {
                    objRtn.VALUE = rs01.getDouble("A730_VALOR");
                }
                objRtn.A050ACEPTA = rs01.getDouble("VAL_A050ACEPTA");
                if (objRtn.A050ACEPTA == 0) {
                    objRtn.A050ACEPTA = rs01.getDouble("VAL_A050ACEPTA");
                }
                objRtn.Diff = rs01.getDouble("A730_VALOR") - rs01.getDouble("VAL_A050ACEPTA");
                if (objRtn.Diff == 0) {
                    objRtn.Diff = rs01.getDouble("A730_VALOR") - rs01.getDouble("VAL_A050ACEPTA");
                }
                if (objRtn.Diff <= -5.00) {
                    objRtn.strColor = "rojo";
                }
                objRtn.INDICATORIxC = "";
                objRtn.FECHAIxC = "";
                objRtn.FACTURAIxC = "";
                /*
                 objRtn.A730CUPON1 = rs01.getString("A730CUPON1");
                 objRtn.A730CUPON2 = rs01.getString("A730CUPON2");
                 objRtn.A730CUPON3 = rs01.getString("A730CUPON3");
                 objRtn.A730CUPON4 = rs01.getString("A730CUPON4");
                 /*objRtn.VALUE = 0.00;
                 String flag = "N";
                 if((!rs01.getString("A730CUPON1").trim().isEmpty()) && Integer.parseInt(rs01.getString("A730CUPON1")) != 0){
                 flag = "S";
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
                 if((!rs01.getString("A730CUPON2").trim().isEmpty()) && Integer.parseInt(rs01.getString("A730CUPON2")) != 0){
                 flag = "S";
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
                 if((!rs01.getString("A730CUPON3").trim().isEmpty()) && Integer.parseInt(rs01.getString("A730CUPON3")) != 0){
                 flag = "S";
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
                 if((!rs01.getString("A730CUPON4").trim().isEmpty()) && Integer.parseInt(rs01.getString("A730CUPON4")) != 0){
                 flag = "S";
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
                 if(flag.equals("N")){
                 objRtn.A730CUPON1 = rs01.getString("A730LOHO1");
                 objRtn.A730CUPON2 = rs01.getString("A730LOHO2");
                 objRtn.A730CUPON3 = rs01.getString("A730LOHO3");
                 objRtn.A730CUPON4 = rs01.getString("A730LOHO4");
                 if((!rs01.getString("A730LOHO1").trim().isEmpty()) && Integer.parseInt(rs01.getString("A730LOHO1")) != 0){
                 switch (Integer.parseInt(rs01.getString("A730LOHO1"))) {
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
                 if((!rs01.getString("A730LOHO2").trim().isEmpty()) && Integer.parseInt(rs01.getString("A730LOHO2")) != 0){
                 switch (Integer.parseInt(rs01.getString("A730LOHO2"))) {
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
                 if((!rs01.getString("A730LOHO3").trim().isEmpty()) && Integer.parseInt(rs01.getString("A730LOHO3")) != 0){
                 switch (Integer.parseInt(rs01.getString("A730LOHO3"))) {
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
                 if((!rs01.getString("A730LOHO4").trim().isEmpty()) && Integer.parseInt(rs01.getString("A730LOHO4")) != 0){
                 switch (Integer.parseInt(rs01.getString("A730LOHO4"))) {
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
                 }*/
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
