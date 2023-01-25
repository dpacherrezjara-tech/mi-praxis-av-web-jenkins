/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.dao.flown;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.logging.Level;
import net.miatech.beans.A1691Filter;
import net.miatech.beans.A1692Filter;
import net.miatech.beans.A1952Filter;
import net.miatech.beans.spring.UserView;

import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author lmendoza
 */
public class CouponsEstimatedValueDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public CouponsEstimatedValueDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public CouponsEstimatedValueDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A1692Filter> loadPX098SQP0007(A1692Filter filter) throws SQLException, Exception {

        List<A1692Filter> lstRtn = new ArrayList<A1692Filter>(0);
        A1692Filter objRtn;
        String tkt = Functions.fillString(filter.IN_TKT, 13);
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        // <editor-fold defaultstate="collapsed" desc=" 'DATE' ">
        // filter.yearFrom = Functions.fillZeros(4, filter.yearFrom).replace("00", "");//YYYY
        //filter.monthFrom = Functions.fillZeros(2, filter.monthFrom).replace("00", "");
        //filter.dayFrom = Functions.fillZeros(2, filter.dayFrom).replace("00", "");
        //filter.dayTo = Functions.fillZeros(2, filter.dayTo).replace("00", "");
        //</editor-fold>
        //String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX098SQP0007(?,?,?,?,?,?,?,?,?,?,?,?)}";
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04428(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
        double rate = 0, rate_RE = 0;
        Connection cnx = null;

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.registerOutParameter(13, Types.INTEGER);
            cstmt01.registerOutParameter(14, Types.INTEGER);
            cstmt01.registerOutParameter(15, Types.INTEGER);
            cstmt01.registerOutParameter(16, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setInt(2, filter.IN_TIPOFECHA);
            //cstmt01.setString(3, filter.yearFrom + filter.monthFrom);
            //cstmt01.setString(4, filter.dayFrom + filter.dayTo);
            cstmt01.setString(3, filter.IN_FECHA_FROM);
            cstmt01.setString(4, filter.IN_FECHA_TO);
            cstmt01.setString(5, filter.IN_TKT);
            cstmt01.setString(6, filter.IN_SEQ);
            cstmt01.setString(7, filter.IN_CARR);
            cstmt01.setString(8, filter.IN_ZONA); //ZONA
            cstmt01.setString(9, filter.IN_STVAL); //STOCL
            cstmt01.setString(10, filter.IN_NFLIGHT); //STVAL
            cstmt01.setString(11, filter.IN_TYPE); //Tipo de consulta (FLOWN o EMD)
            cstmt01.setString(12, filter.IN_FVAL);
            cstmt01.setInt(13, filter.page.PAGNUM);
            cstmt01.setInt(14, filter.page.PAGROW);
            cstmt01.setInt(15, filter.page.TOTPAG);
            cstmt01.setInt(16, filter.page.TOTROW);

            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(13);
            filter.page.PAGROW = cstmt01.getInt(14);
            filter.page.TOTPAG = cstmt01.getInt(15);
            filter.page.TOTROW = cstmt01.getInt(16);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                rate = rs01.getDouble("A1526RATE");
                rate_RE = rs01.getDouble("A1526RATERE");
            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {

                    objRtn = new A1692Filter();

                    objRtn.CCIA = rs01.getString("CCIA").trim();
                    objRtn.FORMA = rs01.getString("FORMA").trim();
                    objRtn.SERIE = rs01.getString("SERIE").trim();
                    objRtn.CUPON = rs01.getString("CUPON").trim();
                    objRtn.SEQ = rs01.getString("SEQ").trim();
                    objRtn.strTicket = rs01.getString("CCIA").trim() + " " + rs01.getString("FORMA").trim() + rs01.getString("SERIE").trim() + " " + rs01.getString("CUPON").trim();
                    objRtn.CDEPART = rs01.getString("CDEPART").trim();
                    objRtn.CARRIVA = rs01.getString("CARRIVA").trim();
                    objRtn.DFLIGHT = rs01.getString("DFLIGHT").trim();
                    objRtn.strDescripcion = rs01.getString("CDEPART").trim() + "-" + rs01.getString("CARRIVA").trim();
                    objRtn.strFormatDate2 = Functions.getMonthConvert(objRtn.DFLIGHT);
                    objRtn.NFLIGHT = rs01.getString("NFLIGHT").trim();
                    objRtn.fecha = rs01.getString("DVCR").trim();
                    objRtn.strFormatDate = Functions.getMonthConvert(objRtn.fecha);
                    objRtn.FECR = rs01.getString("FECR").trim();
                    objRtn.strFormatFVTA = Functions.getMonthConvert(objRtn.FECR);
                    objRtn.ZONA = rs01.getString("ZONA").trim();
                    objRtn.CARR = rs01.getString("CARR").trim();
                    objRtn.STVAL = rs01.getString("STCON").trim();
                    objRtn.strDescSTVAL = "Pending";
                    objRtn.FVAL = rs01.getString("FVAL").trim();
                    if(rs01.getString("FVAL").trim().equals("1")){
                     objRtn.strFVAL ="YES";
                    }else{
                     objRtn.strFVAL= "NO"; 
                    }

                    /*objRtn.STVAL = rs01.getString("STVAL").trim();
                     if(rs01.getString("STVAL").trim().equals("7")){
                     objRtn.strDescSTVAL = "Pending-Value";       
                     }else if(rs01.getString("STVAL").trim().equals("1")){
                     objRtn.strDescSTVAL = "Pending-Without Sale";     
                     }else if(rs01.getString("STVAL").trim().equals("9")){
                     objRtn.strDescSTVAL = "Pending-Oracle";      
                     }else if(rs01.getString("STVAL").trim().equals("2")){
                     objRtn.strDescSTVAL = "Valued";      
                     }else if(rs01.getString("STVAL").trim().equals("3")){
                     objRtn.strDescSTVAL = "Closed";      
                     }else if(rs01.getString("STVAL").trim().equals("0")){
                     objRtn.strDescSTVAL = "Hard Block";      
                     }*/
                    objRtn.LEGSEQ = rs01.getString("LEGSEQ").trim();
                    objRtn.FBASE = rs01.getString("FBASE").trim();
                    objRtn.CLAS = rs01.getString("CLAS").trim();

                    objRtn.VCPN = rs01.getDouble("VCPN");

                    objRtn.MDACP = rs01.getString("MDACP").trim();  //moneda
                    
                    
                    objRtn.STATUS = rs01.getString("STVAL").trim();
                    if( objRtn.STATUS.equals("7") || objRtn.STATUS.equals("9")  ){
                        objRtn.VCPMX = objRtn.VCPN;
                    }else{
                        objRtn.VCPMX = (double) Math.round(rs01.getDouble("VCPMX") * 100) / 100;  //valor usd
                    }

                    objRtn.STCON = rs01.getString("STCON").trim();
                    if (objRtn.STCON.equals("2")) {
                        objRtn.strDescFVAL = "Provisional Post";
                    } else if (objRtn.STCON.equals("3")) {
                        objRtn.strDescFVAL = "Reverse";
                    } else {
                        objRtn.strDescFVAL = objRtn.STCON;
                    }
                    objRtn.TCMUS = rate;
                    objRtn.A1437RATE = rate_RE;//tipo de cambio usd a mxn

                    objRtn.A1437RCOMI = (objRtn.VCPMX > 0) ? objRtn.VCPMX * objRtn.TCMUS : 0.00;  //valor mxn
                    objRtn.VCPUS = (double) Math.round(objRtn.A1437RCOMI * 100) / 100;
                    objRtn.strDescSTNEW=rs01.getString("strFlag").trim();

                    objRtn.page.PAGNUM = filter.page.PAGNUM;
                    objRtn.page.PAGROW = filter.page.PAGROW;
                    objRtn.page.TOTPAG = filter.page.TOTPAG;
                    objRtn.page.TOTROW = filter.page.TOTROW;

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
