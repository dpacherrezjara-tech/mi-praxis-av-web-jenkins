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
import net.miatech.beans.A1691Filter;
import net.miatech.beans.A1692Filter;
import net.miatech.beans.A1786Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

// </editor-fold>
/**
 *
 * @author gsanchez
 */
public class MultilegReportDAO {

    // <editor-fold defaultstate="collapsed" desc="Variables locales">
    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private String strSQL;
    private static final Logger logError = Logger.getLogger("errorLog");
    // </editor-fold>

    public MultilegReportDAO() {
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A1786Filter> loadPX087S02A1786(A1786Filter filter) throws SQLException, Exception {

        List<A1786Filter> lstRtn = new ArrayList<>(0);
        A1786Filter objRtn;
        long PAX = 0;
        double AMTMXN = 0, AMTUSD = 0;

        strSQL = "{CALL " + session.getMainLibrary() + ".PX087S07A1737(?,?,?,?,?)}";
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(strSQL);

            cs.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cs.setString(2, filter.IN_FECHA_FROM);
            cs.setString(3, filter.IN_FECHA_TO);
            cs.setString(4, filter.IN_CARRIER);
            cs.setString(5, filter.IN_QTYLEG);
            cs.execute();

            rst = cs.getResultSet();

            while (rst.next()) {
                PAX = rst.getInt("PAXL");
                AMTMXN = rst.getDouble("AMTMXNL");
                AMTUSD = rst.getDouble("AMTUSDL");
            }
            rst.close();

            if (cs.getMoreResults()) {
                rst = cs.getResultSet();
                while (rst.next()) {
                    objRtn = new A1786Filter();
                    objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                    objRtn.IN_FECHA_TO = filter.IN_FECHA_TO;
                    objRtn.DFLIGHT = rst.getString("DFLIGHT");
                    objRtn.strFormatDate = Functions.getMonthConvert(objRtn.DFLIGHT);
                    //objRtn.CARRIER = rst.getString("CARRIER");
                    objRtn.NFLIGHT = rst.getString("NFLIGHT");
                    objRtn.ORIG = rst.getString("ORIG");
                    objRtn.DEST = rst.getString("DEST");
                    objRtn.strDescripcion = objRtn.ORIG + " - " + objRtn.DEST;
                    objRtn.PAX = rst.getInt("PAX");
                    objRtn.AMTMXN = rst.getDouble("AMTMXNL");
                    objRtn.AMTUSD = rst.getDouble("AMTUSDL");

                    objRtn.totPAX = PAX;
                    objRtn.totAMTMXN = AMTMXN;
                    objRtn.totAMTUSD = AMTUSD;

                    lstRtn.add(objRtn);
                }
            }
        } finally {
            setClose();
        }

        return lstRtn;
    }

    public List<A1786Filter> loadPX087S01A1786(A1786Filter filter) throws SQLException, Exception {

        List<A1786Filter> lstRtn = new ArrayList<>(0);
        A1786Filter objRtn;
        long PAX = 0, QTYFLIG = 0;
        double AMTMXN = 0, AMTUSD = 0;
        long LEGS = 0, NBROD = 0;

        strSQL = "{CALL " + session.getMainLibrary() + ".PX087S05A1737(?,?,?,?,?,?,?,?)}";
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(strSQL);

            cs.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cs.setString(2, filter.DFLIGHT);
            cs.setString(3, filter.IN_FECHA_FROM);
            cs.setString(4, filter.IN_FECHA_TO);
            cs.setString(5, filter.NFLIGHT);
            cs.setString(6, filter.CARRIER);
            cs.setString(7, filter.ORIG);
            cs.setString(8, filter.DEST);
            cs.execute();

            rst = cs.getResultSet();

            while (rst.next()) {
                PAX = rst.getInt("PAXL");
                AMTMXN = rst.getDouble("AMTMXNL");
                AMTUSD = rst.getDouble("AMTUSDL");
            }
            rst.close();

            if (cs.getMoreResults()) {
                String cost = "";
                rst = cs.getResultSet();
                while (rst.next()) {
                    objRtn = new A1786Filter();

                    //if(!cost.equals(rst.getString("DFLIGHT")+rst.getString("CARRIER")+rst.getString("NFLIGHT")+rst.getString("ORIG")+rst.getString("DEST"))){
                    if (!cost.equals(rst.getString("FOPERZUL") + rst.getString("NFLIGHT") + rst.getString("ORIG") + rst.getString("DEST"))) {
                        //objRtn.DFLIGHT = rst.getString("DFLIGHT");
                        objRtn.FOPERZUL = rst.getString("FOPERZUL");
                        objRtn.strFormatDate = Functions.getMonthConvert(objRtn.FOPERZUL);
                        //objRtn.CARRIER = rst.getString("CARRIER");
                        objRtn.NFLIGHT = rst.getString("NFLIGHT");
                        objRtn.ORIG = rst.getString("ORIG");
                        objRtn.DEST = rst.getString("DEST");
                        objRtn.strDescripcion = objRtn.ORIG + " - " + objRtn.DEST;
                        /*objRtn.PAX = rst.getInt("PAX");
                         objRtn.AMTMXN = rst.getDouble("MXN");*/
                        objRtn.PAX = rst.getInt("PAXTOT");
                        objRtn.AMTMXN = rst.getDouble("MXNTOT");
                        objRtn.AMTUSD = rst.getDouble("USDTOT");
                    }

                    //cost =rst.getString("DFLIGHT")+rst.getString("CARRIER")+rst.getString("NFLIGHT")+rst.getString("ORIG")+rst.getString("DEST") ;
                    cost = rst.getString("FOPERZUL") + rst.getString("NFLIGHT") + rst.getString("ORIG") + rst.getString("DEST");

                    objRtn.FLAGLEG = rst.getString("FLAGLEG");
                    objRtn.strDescripcion3 = rst.getString("DFLIGHT");
                    objRtn.FOPERZUL = rst.getString("FOPERZUL");
                    objRtn.strDescripcion4 = rst.getString("CARRIER");
                    objRtn.strDescripcion5 = rst.getString("NFLIGHT");
                    objRtn.ORIGL = rst.getString("ORIGL");
                    objRtn.DESTL = rst.getString("DESTL");
                    objRtn.CARRIER = rst.getString("CARRIER");
                    objRtn.strDescripcion2 = objRtn.ORIGL + " - " + objRtn.DESTL;

                    objRtn.PAXL = rst.getInt("PAXL");
                    objRtn.AMTMXNL = rst.getDouble("AMTMXNL");
                    objRtn.AMTUSDL = rst.getDouble("AMTUSDL");

                    objRtn.totPAX = PAX;
                    objRtn.totAMTMXN = AMTMXN;
                    objRtn.totAMTUSD = AMTUSD;

                    lstRtn.add(objRtn);
                }
            }
        } finally {
            setClose();
        }

        return lstRtn;
    }

    public List<A1692Filter> loadPX087S08A1692(A1691Filter filter, String strTipo, HashMap<String, String> hmPaises) throws SQLException, Exception {

        List<A1692Filter> lstCons = new ArrayList<>(0);
        A1692Filter beanTkt;
        HashMap hmEstado = new HashMap();
        hmEstado.put("0", "Hard Block");
        hmEstado.put("1", "Pending/Without Sale");
        hmEstado.put("2", "Valued");
        hmEstado.put("3", "Closed");
        int QTYPAX = 0;

        strSQL = "{CALL " + session.getMainLibrary() + ".PX087S08A1692(?,?,?,?,?,?,?,?,?,?,?)}";
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(strSQL);

            cs.registerOutParameter(8, Types.INTEGER);
            cs.registerOutParameter(9, Types.INTEGER);
            cs.registerOutParameter(10, Types.INTEGER);
            cs.registerOutParameter(11, Types.INTEGER);

            cs.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cs.setString(2, filter.DFLIGHT);
            cs.setString(3, filter.FOPERZUL);
            cs.setString(4, filter.NFLIGHT);
            cs.setString(5, filter.CDEPART);
            cs.setString(6, filter.CARRIVA);
            cs.setString(7, filter.CARRI);
            cs.setInt(8, filter.page.PAGNUM);
            cs.setInt(9, filter.page.PAGROW);
            cs.setInt(10, filter.page.TOTPAG);
            cs.setInt(11, filter.page.TOTROW);
            cs.execute();

            filter.page.PAGNUM = cs.getInt(8);
            filter.page.PAGROW = cs.getInt(9);
            filter.page.TOTPAG = cs.getInt(10);
            filter.page.TOTROW = cs.getInt(11);

            rst = cs.getResultSet();
            while (rst.next()) {
                QTYPAX = rst.getInt("QTYPAX");
            }
//            try {
//                rst.close();
//            } catch (SQLException e) {
//                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
//            }

            if (cs.getMoreResults()) {
                rst = cs.getResultSet();
                while (rst.next()) {
                    beanTkt = new A1692Filter();
                    beanTkt.FLAGLEG = filter.FLAGLEG;
                    beanTkt.QTYPAX = rst.getInt("QTYPAX");
                    beanTkt.totTAX = QTYPAX;
                    beanTkt.strDescCDEPART = " - Departure: " + filter.CDEPART;
                    if (!filter.CARRIVA.trim().equals("")) {
                        beanTkt.strDescCARRIVA = " - Arrival: " + filter.CARRIVA;
                    }
                    beanTkt.CCIA = rst.getString("CCIA").trim();
                    beanTkt.FORMA = rst.getString("FORMA").trim();
                    beanTkt.SERIE = rst.getString("SERIE").trim();
                    beanTkt.CUPON = rst.getString("CUPON").trim();
                    beanTkt.strTicket = rst.getString("CCIA").trim() + " " + rst.getString("FORMA").trim() + rst.getString("SERIE").trim() + " " + rst.getString("CUPON").trim();
                    beanTkt.FCONT = rst.getString("FCONT").trim();
                    beanTkt.strFormatDate2 = Functions.getMonthConvert(beanTkt.FCONT);
                    beanTkt.CDEPART = rst.getString("CDEPART").trim();
                    beanTkt.CARRIVA = rst.getString("CARRIVA").trim();
                    beanTkt.NFLIGHT = rst.getString("NFLIGHT").trim();
                    beanTkt.DFLIGHT = rst.getString("DFLIGHT").trim();
                    beanTkt.LEGSEQ = rst.getString("LEGSEQ").trim();
                    beanTkt.strFormatDate = beanTkt.DFLIGHT.substring(0, 4) + "-" + beanTkt.DFLIGHT.substring(4, 6) + "-" + beanTkt.DFLIGHT.substring(6);
                    //beanTkt.TDOC = rst.getString("TDOC").trim();
                    beanTkt.FBASE = rst.getString("FBASE");
                    beanTkt.STVAL = rst.getString("STVAL");
                    if (hmEstado.containsKey(beanTkt.STVAL.trim())) {
                        beanTkt.strDescSTVAL = hmEstado.get(beanTkt.STVAL.trim()).toString();
                    }

                    beanTkt.FVAL = rst.getString("FVAL");
                    /*if (beanTkt.FVAL.equals("1")) {
                     beanTkt.strDescFVAL = "ISR Values";
                     } else if (beanTkt.FVAL.equals("2")) {
                     beanTkt.strDescFVAL = "Average RBD";
                     } else if (beanTkt.FVAL.equals("3")) {
                     beanTkt.strDescFVAL = "Average FARE BASIS";
                     } else if (beanTkt.FVAL.trim().equals("")) {
                     beanTkt.strDescFVAL = "Sale";
                     }*/
                    if (beanTkt.FVAL.equals("1")) {
                        beanTkt.strDescFVAL = "ISR Values/Sales";
                        beanTkt.VCPN = rst.getDouble("VCPN");
                    } else if (beanTkt.FVAL.equals("2")) {
                        beanTkt.strDescFVAL = "Average Value";
                        beanTkt.VCPN = rst.getDouble("VCPMX");
                    } else if (beanTkt.FVAL.equals("3")) {
                        beanTkt.strDescFVAL = "VTR";
                        beanTkt.VCPN = rst.getDouble("VCPN");
                    } else if (beanTkt.FVAL.equals("4")) {
                        beanTkt.strDescFVAL = "Manual Value";
                        beanTkt.VCPN = rst.getDouble("VCPN");
                    }

                    beanTkt.PSVVTA = rst.getString("PSVVTA").trim();
                    if (hmPaises.containsKey(rst.getString("PSVVTA").trim().toUpperCase())) {
                        beanTkt.strDescPSVVTA = hmPaises.get(rst.getString("PSVVTA").trim()).toString();
                    }
                    //beanTkt.AGTIA = rst.getString("AGTIA").trim();
                    beanTkt.FVTA = rst.getString("FVTA").trim();
                    beanTkt.strFormatFVTA = Functions.getMonthConvert(beanTkt.FVTA);
                    beanTkt.TOPUS = rst.getString("TOPUS").trim();
                    beanTkt.CARR = rst.getString("CARR").trim();
                    //beanTkt.CABI = rst.getString("CABI").trim();
                    beanTkt.CLAS = rst.getString("CLAS").trim();

                    beanTkt.COMISI = rst.getDouble("COMISI");
                    beanTkt.MDACP = rst.getString("MDACP").trim();
                    beanTkt.VCPMX = rst.getDouble("VCPMX");
                    beanTkt.TCMUS = rst.getDouble("TCMUS");
                    beanTkt.VCPUS = rst.getDouble("VCPUS");

                    if (rst.getString("FILENAME") != null
                            && !rst.getString("FILENAME").trim().equals("-")) {
                        beanTkt.FILENAME = rst.getString("FILENAME").trim();
                    }

                    beanTkt.page.PAGNUM = filter.page.PAGNUM;
                    beanTkt.page.PAGROW = filter.page.PAGROW;
                    beanTkt.page.TOTPAG = filter.page.TOTPAG;
                    beanTkt.page.TOTROW = filter.page.TOTROW;

                    lstCons.add(beanTkt);
                }
            }
        } finally {
            setClose();
        }

        return lstCons;
    }

    public List<A1692Filter> loadPX087S05A1897(A1692Filter filter) throws SQLException, Exception {

        List<A1692Filter> lstCons = new ArrayList<>(0);
        A1692Filter beanTkt;
        int QTYPAX = 0;

        strSQL = "{CALL " + session.getMainLibrary() + ".PX087S06A1897(?,?,?,?,?,?,?,?,?,?)}";
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(strSQL);

            cs.registerOutParameter(7, Types.INTEGER);
            cs.registerOutParameter(8, Types.INTEGER);
            cs.registerOutParameter(9, Types.INTEGER);
            cs.registerOutParameter(10, Types.INTEGER);

            cs.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cs.setString(2, filter.DFLIGHT);
            cs.setString(3, filter.CCIA);
            cs.setString(4, filter.FORMA);
            cs.setString(5, filter.SERIE);
            cs.setString(6, filter.CUPON);
            cs.setInt(7, filter.page.PAGNUM);
            cs.setInt(8, filter.page.PAGROW);
            cs.setInt(9, filter.page.TOTPAG);
            cs.setInt(10, filter.page.TOTROW);
            cs.execute();

            filter.page.PAGNUM = cs.getInt(7);
            filter.page.PAGROW = cs.getInt(8);
            filter.page.TOTPAG = cs.getInt(9);
            filter.page.TOTROW = cs.getInt(10);

            /*rst = cs.getResultSet();
             while (rst.next()) {
             QTYPAX = rst.getInt("QTYPAX");
             }
             try {
             rst.close();
             } catch (SQLException e) {
             logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
             }*/
            //if (cs.getMoreResults()) {
            rst = cs.getResultSet();
            while (rst.next()) {
                beanTkt = new A1692Filter();
                beanTkt.DFLIGHT = rst.getString("FVLO");
                beanTkt.strFormatDate = Functions.getMonthConvert(beanTkt.DFLIGHT);
                beanTkt.CDEPART = rst.getString("ORIGEN");
                beanTkt.CARRIVA = rst.getString("DESTINO");
                beanTkt.CARR = rst.getString("CARRIER");
                beanTkt.CCIA = rst.getString("CIA");
                beanTkt.FORMA = rst.getString("FORMA");
                beanTkt.SERIE = rst.getString("SERIE");
                beanTkt.CUPON = rst.getString("CUPON");
                beanTkt.strTicket = rst.getString("CIA") + " " + rst.getString("FORMA") + rst.getString("SERIE");
                beanTkt.LEGSEQ = rst.getString("SUBLEG");
                beanTkt.NFLIGHT = rst.getString("NVLO");
                beanTkt.FBASE = rst.getString("FBASIS");
                beanTkt.CLAS = rst.getString("CLASE");
                beanTkt.RPK = rst.getString("RBD");
                beanTkt.MDACP = rst.getString("MDAREV");
                beanTkt.VCPN = rst.getDouble("VALQN");//Amount
                beanTkt.COMISI = rst.getDouble("VALCOMMN");//Comm
                beanTkt.ISC = rst.getDouble("VALOVRCOMN");//Over Comm
                beanTkt.A1692CREDTOTAL = rst.getDouble("VALYQN");//YQ

                beanTkt.page.PAGNUM = filter.page.PAGNUM;
                beanTkt.page.PAGROW = filter.page.PAGROW;
                beanTkt.page.TOTPAG = filter.page.TOTPAG;
                beanTkt.page.TOTROW = filter.page.TOTROW;

                lstCons.add(beanTkt);
            }
            //}
        } finally {
            setClose();
        }

        return lstCons;
    }
    

    public String loadPX087SQP04261(A1786Filter filter) throws SQLException, Exception {
        //FORCE MATCH.
        String strMsj = "An Unexpected Error Ocurred.";

        CallableStatement cstmt = null;
        String SQLCLL01="";
        
        SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04261(?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(7, Types.VARCHAR);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, session.getUserView().getUserInfo().USR);
            cstmt.setString(3, filter.DFLIGHT);
            cstmt.setString(4, filter.NFLIGHT);
            cstmt.setString(5, filter.ORIG);
            cstmt.setString(6, filter.DEST);
            cstmt.setString(7, "");
            cstmt.execute();

            strMsj = cstmt.getString(7);

        } catch (Exception e) {
            strMsj = e.getMessage();
        } finally {
            setClose();
        }

        return strMsj;
    }


    private void setClose() throws Exception {

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
//                throw new SpringException(e);
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
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
