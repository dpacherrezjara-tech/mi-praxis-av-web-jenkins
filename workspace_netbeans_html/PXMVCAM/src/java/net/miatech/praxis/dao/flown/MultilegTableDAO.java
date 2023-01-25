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
import net.miatech.beans.A1737Filter;
import net.miatech.beans.spring.UserView;

import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.master.MasterDAO;
import net.miatech.praxis.flown.A1708;
import net.miatech.praxis.flown.A1737;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author lmendoza
 */
public class MultilegTableDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public MultilegTableDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public MultilegTableDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A1737Filter> loadPX103S01A1737(A1737Filter filter, HashMap<String, String> hmAeropuertos) throws SQLException, Exception {

        List<A1737Filter> lstRtn = new ArrayList<>(0);
        A1737Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        Connection cnx = null;

        try {
            String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX103S01A1737_3(?,?,?,?,?,?,?,?)}";
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(5, Types.INTEGER);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_FECHA_FROM.trim());
            cstmt01.setString(3, filter.IN_FECHA_TO.trim());
            cstmt01.setString(4, filter.NFLIGHT.trim());
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
                objRtn = new A1737Filter();
                objRtn.RN = rs01.getLong("RN");
                objRtn.DFLIGHT = rs01.getString("DFLIGHT");
                objRtn.FOPERZUL = rs01.getString("FOPERZUL");
                objRtn.strFormatDate = Functions.getMonthConvert(objRtn.DFLIGHT);
                objRtn.strFormatDate2 = Functions.getMonthConvert(objRtn.FOPERZUL);
                objRtn.CARR1 = rs01.getString("CARR1");
                objRtn.CARR2 = rs01.getString("CARR2");
                objRtn.CARR3 = rs01.getString("CARR3");
                objRtn.CARR4 = rs01.getString("CARR4");
                objRtn.CARR5 = rs01.getString("CARR5");
                objRtn.CARR6 = rs01.getString("CARR6");
                objRtn.CARR7 = rs01.getString("CARR7");
                objRtn.MATRIC1 = rs01.getString("MATRIC1");
                objRtn.MATRIC2 = rs01.getString("MATRIC2");
                objRtn.MATRIC3 = rs01.getString("MATRIC3");
                objRtn.MATRIC4 = rs01.getString("MATRIC4");
                objRtn.MATRIC5 = rs01.getString("MATRIC5");
                objRtn.MATRIC6 = rs01.getString("MATRIC6");
                objRtn.MATRIC7 = rs01.getString("MATRIC7");

                objRtn.NFLIGHT = rs01.getString("NFLIGHT");
                objRtn.CDEPART = rs01.getString("CDEPART");
                objRtn.LEGSEQ = rs01.getString("LEGSEQ");
                if (objRtn.LEGSEQ.equals("01")) {
                    objRtn.CCUST = "0x005200";
                    objRtn.FEUP = "bold";
                } else if (objRtn.LEGSEQ.substring(1).equals("1")) {
                    objRtn.CCUST = rs01.getString("COLOR");//"0x0000FF";
                    objRtn.FEUP = rs01.getString("SIZ");
                } else {
                    objRtn.CCUST = "0x244066";
                    objRtn.FEUP = "normal";
                }

                if (hmAeropuertos.containsKey(rs01.getString("CDEPART").trim().toUpperCase())) {
                    objRtn.strDescripcionCDEPART = hmAeropuertos.get(rs01.getString("CDEPART").trim()).toString();
                }
                objRtn.CARRIVA = rs01.getString("CARRIVA");
                if (hmAeropuertos.containsKey(rs01.getString("CARRIVA").trim().toUpperCase())) {
                    objRtn.strDescripcionCARRIVA = hmAeropuertos.get(rs01.getString("CARRIVA").trim()).toString();
                }
                objRtn.BASICML = rs01.getInt("BASICM");

                objRtn.DEPARTLEG1 = rs01.getString("DEPARTLEG1");
                if (hmAeropuertos.containsKey(rs01.getString("DEPARTLEG1").trim().toUpperCase())) {
                    objRtn.strDescripcionDEPARTLEG1 = hmAeropuertos.get(rs01.getString("DEPARTLEG1").trim()).toString();
                }
                objRtn.ARRIVALEG1 = rs01.getString("ARRIVALEG1");
                if (hmAeropuertos.containsKey(rs01.getString("ARRIVALEG1").trim().toUpperCase())) {
                    objRtn.strDescripcionARRIVALEG1 = hmAeropuertos.get(rs01.getString("ARRIVALEG1").trim()).toString();
                }
                objRtn.BASICML1 = rs01.getInt("BASICML1");

                objRtn.DEPARTLEG2 = rs01.getString("DEPARTLEG2");

                if (hmAeropuertos.containsKey(rs01.getString("DEPARTLEG2").trim().toUpperCase())) {
                    objRtn.strDescripcionDEPARTLEG2 = hmAeropuertos.get(rs01.getString("DEPARTLEG2").trim()).toString();
                }
                objRtn.ARRIVALEG2 = rs01.getString("ARRIVALEG2");
                if (hmAeropuertos.containsKey(rs01.getString("ARRIVALEG2").trim().toUpperCase())) {
                    objRtn.strDescripcionARRIVALEG2 = hmAeropuertos.get(rs01.getString("ARRIVALEG2").trim()).toString();
                }
                objRtn.BASICML2 = rs01.getInt("BASICML2");

                objRtn.DEPARTLEG3 = rs01.getString("DEPARTLEG3");
                if (hmAeropuertos.containsKey(rs01.getString("DEPARTLEG3").trim().toUpperCase())) {
                    objRtn.strDescripcionDEPARTLEG3 = hmAeropuertos.get(rs01.getString("DEPARTLEG3").trim()).toString();
                }
                objRtn.ARRIVALEG3 = rs01.getString("ARRIVALEG3");
                if (hmAeropuertos.containsKey(rs01.getString("ARRIVALEG3").trim().toUpperCase())) {
                    objRtn.strDescripcionARRIVALEG3 = hmAeropuertos.get(rs01.getString("ARRIVALEG3").trim()).toString();
                }
                objRtn.BASICML3 = rs01.getInt("BASICML3");

                objRtn.DEPARTLEG4 = rs01.getString("DEPARTLEG4");
                if (hmAeropuertos.containsKey(rs01.getString("DEPARTLEG4").trim().toUpperCase())) {
                    objRtn.strDescripcionDEPARTLEG4 = hmAeropuertos.get(rs01.getString("DEPARTLEG4").trim()).toString();
                }
                objRtn.ARRIVALEG4 = rs01.getString("ARRIVALEG4");
                if (hmAeropuertos.containsKey(rs01.getString("ARRIVALEG4").trim().toUpperCase())) {
                    objRtn.strDescripcionARRIVALEG4 = hmAeropuertos.get(rs01.getString("ARRIVALEG4").trim()).toString();
                }
                objRtn.BASICML4 = rs01.getInt("BASICML4");

                objRtn.DEPARTLEG5 = rs01.getString("DEPARTLEG5");
                if (hmAeropuertos.containsKey(rs01.getString("DEPARTLEG5").trim().toUpperCase())) {
                    objRtn.strDescripcionDEPARTLEG5 = hmAeropuertos.get(rs01.getString("DEPARTLEG5").trim()).toString();
                }
                objRtn.ARRIVALEG5 = rs01.getString("ARRIVALEG5");
                if (hmAeropuertos.containsKey(rs01.getString("ARRIVALEG5").trim().toUpperCase())) {
                    objRtn.strDescripcionARRIVALEG5 = hmAeropuertos.get(rs01.getString("ARRIVALEG5").trim()).toString();
                }
                objRtn.BASICML5 = rs01.getInt("BASICML5");
                objRtn.USCR = rs01.getString("USCR");
                objRtn.FECR = rs01.getString("FECR");
                objRtn.HOCR = Functions.ConvertedTime(rs01.getString("HOCR"));
                objRtn.USUP = rs01.getString("USUP");
                objRtn.FEUP = rs01.getString("FEUP");
                objRtn.HOUP = Functions.ConvertedTime(rs01.getString("HOUP"));

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

    public String loadPX103S03A1737(A1737 filter, String option)  {
        //REALIZA EL INSERT, UPDATE O DELETE DE UN REGISTRO EN LA TABLA A1702.
        System.out.println(" Estamos en el DAO");
        String strMsj = "An Unexpected Error Ocurred.";

        CallableStatement cstmt = null;

        String SQLCLL01 = "{CALL PRAXIS.PX103S03A1737(?,?,?,?,?,?,?,?,?,?,"
                + "?,?,?,?,?,?,?,?,?,?,"
                + "?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(37, Types.VARCHAR);

            cstmt.setString(1, option);
            cstmt.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(3, filter.DFLIGHT);
            cstmt.setString(4, filter.NFLIGHT);
            cstmt.setString(5, filter.CDEPART);
            cstmt.setString(6, filter.CARRIVA);
            cstmt.setString(7, filter.LEGSEQ);
            cstmt.setInt(8, filter.BASICML);
            cstmt.setString(9, filter.DEPARTLEG1);
            cstmt.setString(10, filter.ARRIVALEG1);
            cstmt.setInt(11, filter.BASICML1);
            cstmt.setString(12, filter.DEPARTLEG2);
            cstmt.setString(13, filter.ARRIVALEG2);
            cstmt.setInt(14, filter.BASICML2);
            cstmt.setString(15, filter.DEPARTLEG3);
            cstmt.setString(16, filter.ARRIVALEG3);
            cstmt.setInt(17, filter.BASICML3);
            cstmt.setString(18, filter.DEPARTLEG4);
            cstmt.setString(19, filter.ARRIVALEG4);
            cstmt.setInt(20, filter.BASICML4);
            cstmt.setString(21, filter.DEPARTLEG5);
            cstmt.setString(22, filter.ARRIVALEG5);
            cstmt.setInt(23, filter.BASICML5);
            cstmt.setString(24, filter.DEPARTLEG6);
            cstmt.setString(25, filter.ARRIVALEG6);
            cstmt.setInt(26, filter.BASICML6);
            cstmt.setString(27, filter.DEPARTLEG7);
            cstmt.setString(28, filter.ARRIVALEG7);
            cstmt.setInt(29, filter.BASICML7);
            cstmt.setString(30, filter.CARR1);
            cstmt.setString(31, filter.CARR2);
            cstmt.setString(32, filter.CARR3);
            cstmt.setString(33, filter.CARR4);
            cstmt.setString(34, filter.CARR5);
            cstmt.setString(35, filter.CARR6);
            cstmt.setString(36, filter.CARR7);

            cstmt.setString(37, " ");
            cstmt.execute();

            strMsj = cstmt.getString(37);
            System.out.println(" Mensaje devuelto : "+strMsj);
        } catch (Exception e) {
            System.out.println(" Excepcion DAO : \n"+e.getMessage());
            e.getMessage();
        } finally {
            if (cstmt != null) {
                try {
                    cstmt.close();
                } catch (SQLException e) {
                    try {
                        logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                    } catch (Exception ex) {
                        java.util.logging.Logger.getLogger(MultilegTableDAO.class.getName()).log(Level.SEVERE, null, ex);
                    }
                }
            }
            try {
                session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            } catch (Exception ex) {
                java.util.logging.Logger.getLogger(MultilegTableDAO.class.getName()).log(Level.SEVERE, null, ex);
            }
            pasarGarbageCollector();
        }

        return strMsj;
    }
}
