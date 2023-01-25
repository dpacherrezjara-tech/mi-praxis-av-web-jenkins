package net.miatech.praxis.dao.flown;

// <editor-fold defaultstate="collapsed" desc="Imports">
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.A005;
import net.miatech.praxis.flown.A1707;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.utils.Functions;

// </editor-fold>

/* 
 ******************************************************************
 * Program Information                                            *
 *                                                                *
 * Project    : PRAXIS - AM                                       *          
 * Document   : SSIMComplementaryFilesDAO                         *                           
 * Created on : 13/02/2018, 12:38:15                              *                
 * Author     : Gregory Sánchez (gsanchez)                        *           
 *                                                                *
 ******************************************************************
 *                  MIAMI TECHNOLOGY GROUP, INC.                  *
 *                           MIATECH                              *
 *                           OF PERU                              *
 ******************************************************************
 * CODIGO PRG FECHA      CONCEPTO
 * 201601 RMC 20-09-2016 SE CREA PROGRAMA A PEDIDO DE JGG.
 ******************************************************************
 */
public class SSIMComplementaryFilesDAO {
    
    // <editor-fold defaultstate="collapsed" desc="Variables locales">
    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private String strSQL;
    private List<A1707> listaData = new ArrayList();
    private A1707 a;
    // </editor-fold>

    public SSIMComplementaryFilesDAO() {
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }
    
    public List<A1707> loadPX104S01A1707(A1707 filter, HashMap<String, String> hmAeropuertos) throws SQLException {
        List<A1707> lstRtn = new ArrayList<>(0);
        A1707 objRtn;

        try {
            String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX104S01A1707(?,?,?,?,?,?)}";
            
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(SQLCLL01);
            
            // <editor-fold defaultstate="collapsed" desc="cs.registerOutParameter([#], [TIPO]);">
            cs.registerOutParameter(3, Types.INTEGER);
            cs.registerOutParameter(4, Types.INTEGER);
            cs.registerOutParameter(5, Types.INTEGER);
            cs.registerOutParameter(6, Types.INTEGER);
            // </editor-fold>

            // <editor-fold defaultstate="collapsed" desc="cs.set([#], [VALOR]);">
            cs.setString(1, session.getUserView().getCustomerInfo().CCUST.trim());
            cs.setString(2, filter.NFLIGHT.trim());
            cs.setInt(3, filter.page.PAGNUM);
            cs.setInt(4, filter.page.PAGROW);
            cs.setInt(5, filter.page.TOTPAG);
            cs.setInt(6, filter.page.TOTROW);
            // </editor-fold>

            cs.execute();

            filter.page.PAGNUM = cs.getInt(3);//1
            filter.page.PAGROW = cs.getInt(4);//20
            filter.page.TOTPAG = cs.getInt(5);//17
            filter.page.TOTROW = cs.getInt(6);//340

            rst = cs.getResultSet();

            while (rst.next()) {

                objRtn = new A1707();
                objRtn.RN = rst.getLong("RN");
                objRtn.NFLIGHT = rst.getString("NFLIGHT").trim();
                objRtn.CARRIVA = rst.getString("CARRIVA").trim();
                if (hmAeropuertos.containsKey(rst.getString("CARRIVA").trim().toUpperCase())) {
                    objRtn.strCARRIVA = hmAeropuertos.get(rst.getString("CARRIVA").trim());
                }
                objRtn.CDEPART = rst.getString("CDEPART").trim();
                if (hmAeropuertos.containsKey(rst.getString("CDEPART").trim().toUpperCase())) {
                    objRtn.strCDEPART = hmAeropuertos.get(rst.getString("CDEPART").trim());
                }
                objRtn.NSEQ = rst.getLong("NSEQ");
                objRtn.LEG = rst.getLong("LEG");
                objRtn.FSSIM = rst.getString("FSSIM").trim();
                objRtn.FREQ = rst.getString("FREQ").trim();
                objRtn.CARRIER = rst.getString("CARRIER").trim();
                objRtn.NFLIGHTH = rst.getString("NFLIGHTH").trim();
                objRtn.CARRIERH = rst.getString("CARRIERH").trim();
                objRtn.TOPER = rst.getString("TOPER").trim();
                if (objRtn.TOPER.trim().equals("D")) {
                    objRtn.TOPER = "Domestic";
                } else if (objRtn.TOPER.trim().equals("I")) {
                    objRtn.TOPER = "International";
                } else {
                    objRtn.TOPER = "(None)";
                }
                objRtn.USCR = rst.getString("USCR").trim();
                objRtn.FECR = rst.getString("FECR").trim();
                objRtn.HOCR = Functions.ConvertedTime(rst.getString("HOCR").trim());
                objRtn.USUP = rst.getString("USUP").trim();
                objRtn.FEUP = rst.getString("FEUP").trim();
                objRtn.HOUP = Functions.ConvertedTime(rst.getString("HOUP")).trim();

                //Paginación ===================================================
                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;

                lstRtn.add(objRtn);
            }
        } catch (Exception e) {
            e.getMessage();
        } finally {
            setClose();
        }

        return lstRtn;
    }
    
    public A1707 loadPX104S02A1707(A1707 filter, HashMap<String, String> hmAeropuertos) throws SQLException, Exception {
        a = new A1707();

        try {
            String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX104S02A1707(?,?,?,?,?)}";
            
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(SQLCLL01);

            cs.setString(1, session.getUserView().getCustomerInfo().CCUST.trim());
            cs.setString(2, filter.NFLIGHT.trim());
            cs.setString(3, filter.CDEPART.trim());
            cs.setLong(4, filter.NSEQ);
            cs.setString(5, filter.CARRIVA.trim());

            cs.execute();

            rst = cs.getResultSet();
            while (rst.next()) {
                a.CCUST = rst.getString("CCUST").trim();
                a.NFLIGHT = rst.getString("NFLIGHT").trim();
                a.CDEPART = rst.getString("CDEPART").trim();
                if (hmAeropuertos.containsKey(rst.getString("CDEPART").trim().toUpperCase())) {
                    a.strCDEPART = hmAeropuertos.get(rst.getString("CDEPART").trim()).toString();
                }
                a.CARRIVA = rst.getString("CARRIVA").trim();
                if (hmAeropuertos.containsKey(rst.getString("CARRIVA").trim().toUpperCase())) {
                    a.strCARRIVA = hmAeropuertos.get(rst.getString("CARRIVA").trim()).toString();
                }
                a.NSEQ = rst.getLong("NSEQ");
                a.LEG = rst.getLong("LEG");
                a.FSSIM = rst.getString("FSSIM").trim();
                a.FREQ = rst.getString("FREQ").trim().trim();
                a.CARRIER = rst.getString("CARRIER").trim();
                a.NFLIGHTH = rst.getString("NFLIGHTH").trim();
                a.CARRIERH = rst.getString("CARRIERH").trim();
                a.TOPER = rst.getString("TOPER").trim();
                if (rst.getString("TOPER").trim().equals("D")) {
                    a.strTOPER = "Domestic";
                } else if (rst.getString("TOPER").trim().equals("I")) {
                    a.strTOPER = "International";
                } else {
                    a.strTOPER = "(None)";
                }

                a.USCR = rst.getString("USCR");
                a.FECR = rst.getString("FECR");
                a.HOCR = Functions.ConvertedTime(rst.getString("HOCR"));
                a.USUP = rst.getString("USUP");
                a.FEUP = rst.getString("FEUP");
                a.HOUP = Functions.ConvertedTime(rst.getString("HOUP"));
            }
        } finally {
            setClose();
        }

        return a;
    }
    
    public String loadPX104S03A1707(A1707 a, String option) {
        //REALIZA EL INSERT, UPDATE O DELETE DE UN REGISTRO EN LA TABLA A1707.
        String strMsj = "Operation was successful.";

        try {
            String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX104S03A1707(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(SQLCLL01);
            // <editor-fold defaultstate="collapsed" desc="cs.registerOutParameter([#], Types.[TIPO]);">
            
            // </editor-fold>

            // <editor-fold defaultstate="collapsed" desc="cs.setString([#], a.[CAMPO]);">
            cs.setString(1, option);
            cs.setString(2, session.getUserView().getCustomerInfo().CCUST.trim());
            cs.setString(3, a.NFLIGHT.trim());
            cs.setString(4, a.CDEPART.trim());
            cs.setString(5, a.CARRIVA.trim());
            cs.setLong(6, a.NSEQ);
            cs.setLong(7, a.LEG);
            cs.setString(8, a.FSSIM.trim());
            cs.setString(9, a.FREQ.trim());
            cs.setString(10, a.CARRIER.trim());
            cs.setString(11, a.NFLIGHTH.trim());
            cs.setString(12, a.CARRIERH.trim());
            cs.setString(13, a.TOPER.trim());

            cs.setString(14, session.getUserView().getUserInfo().USR);
            cs.setString(15, Functions.getFechaActual());
            cs.setString(16, Functions.getHoraActual());
            // </editor-fold>

            cs.execute();

            // <editor-fold defaultstate="collapsed" desc="strMsj = cs.getString([#]);">
            
            // </editor-fold>
        } catch(SQLException e) {
            if (e.getMessage().contains("duplicada")) {
                strMsj = "Duplicated row";
            }
        } catch(Exception e2) {
            if (e2.getMessage().contains("duplicada")) {
                strMsj = "Duplicated row";
            }
        }
        finally {
            setClose();
        }
        return strMsj;
    }

    public List<A005> loadPX104S04A005() throws SQLException {

        List<A005> lstRtn = new ArrayList<>(0);
        A005 objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        try {
            String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX104S04PXA005()}";

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new A005();

                objRtn.A005KEY1 = rs01.getString("A005KEY1");
                if (rs01.getString("A005KEY3").trim().isEmpty()) {
                    objRtn.A005KEY2 = rs01.getString("A005KEY2").trim();
                } else {
                    objRtn.A005KEY2 = rs01.getString("A005KEY3").trim();
                }
                lstRtn.add(objRtn);
            }
        } catch (Exception e) {
            e.getMessage();
        } finally {
            setClose();
        }

        return lstRtn;
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

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }
}
