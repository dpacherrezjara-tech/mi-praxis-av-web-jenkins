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
import net.miatech.beans.UserView;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

// </editor-fold>

/* 
 ******************************************************************
 * Program Information                                            *
 *                                                                *
 * Project    : PRAXIS - AM                                       *          
 * Document   : SSIMComplementaryFilesFormDAO                     *                           
 * Created on : 19/02/2018, 15:03:15                              *                
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
public class SSIMDuplicatedDAO {

    // <editor-fold defaultstate="collapsed" desc="Imports">
    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");
    
    // </editor-fold>

    public SSIMDuplicatedDAO() {
    }

    public SSIMDuplicatedDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }
    
    public List<A1691Filter> loadPX232S01A1691(A1691Filter filter, HashMap<String, String> hmAeropuertos) {
        List<A1691Filter> lstCons = new ArrayList<>(0);
        A1691Filter beanCons;
        long QCPNOD = 0, QCPNVC = 0, QCPAD = 0, QCPCHD = 0, QCPINF = 0, QCPTRA = 0, QCPNOCR = 0, QCPNMA = 0, QCPNTOT = 0, QCPNLEG = 0;
        int QCPNFI = 0;
        try {
            String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX232S01A1691(?,?,?,?,?,?,?,?,?)}";
            
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(SQLCLL01);
            cs.registerOutParameter(6, Types.INTEGER);
            cs.registerOutParameter(7, Types.INTEGER);
            cs.registerOutParameter(8, Types.INTEGER);
            cs.registerOutParameter(9, Types.INTEGER);

            cs.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cs.setString(2, filter.IN_FECHA_FROM);
            cs.setString(3, filter.IN_FECHA_TO);
            cs.setString(4, filter.IN_NFLIGHT);
            cs.setString(5, Functions.getFechaActual());
            cs.setInt(6, filter.page.PAGNUM);
            cs.setInt(7, filter.page.PAGROW);
            cs.setInt(8, filter.page.TOTPAG);
            cs.setInt(9, filter.page.TOTROW);

            cs.execute();
            filter.page.PAGNUM = cs.getInt(6);
            filter.page.PAGROW = cs.getInt(7);
            filter.page.TOTPAG = cs.getInt(8);
            filter.page.TOTROW = cs.getInt(9);

            rst = cs.getResultSet();
            while (rst.next()) {
                QCPNOD = rst.getLong("QCPNOD");
                QCPNVC = rst.getLong("QCPNVC");
                QCPNLEG = rst.getLong("QCPNLEG");
                QCPNOCR = rst.getLong("QCPNOCR");
                QCPNMA = rst.getLong("QCPNMA");
                QCPNTOT = rst.getLong("QCPNTOT");
                QCPNFI = rst.getInt("QCPNFI");

                QCPAD = rst.getLong("QCPAD");
                QCPCHD = rst.getLong("QCPCHD");
                QCPINF = rst.getLong("QCPINF");
                QCPTRA = rst.getLong("QCPTRA");
            }

            try {
                rst.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            } catch (Exception e) {
                logError.error("Exception -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cs.getMoreResults()) {
                rst = cs.getResultSet();
                while (rst.next()) {
                    beanCons = new A1691Filter();
                    beanCons.RN = rst.getLong("RN");
                    beanCons.CARRI = rst.getString("CARRI").trim();
                    beanCons.FCLOFO = rst.getString("FCLOFO");
                    if (rst.getString("FCLOFO").trim().equals("1")) {
                        beanCons.strFCLOFO = "AUTOMATIC";
                        beanCons.strDesFCLOFO = "FORCED AUTOMATIC";
                    } else if (rst.getString("FCLOFO").trim().equals("2")) {
                        beanCons.strFCLOFO = "MANUAL";
                        beanCons.strDesFCLOFO = "FORCED MANUAL";
                    } else {
                        beanCons.strFCLOFO = "";
                        beanCons.strDesFCLOFO = "";
                    }

                    beanCons.FFLOW = rst.getString("FFLOW").trim();
                    if (rst.getString("FFLOW").trim().equals("C")) {
                        beanCons.strDescFFLOW = "Charter";
                    } else if (rst.getString("FFLOW").trim().equals("X")) {
                        beanCons.strDescFFLOW = "Canceled";
                    } else if (rst.getString("FFLOW").trim().equals("U")) {
                        beanCons.strDescFFLOW = "Unscheduled";
                    } else if (rst.getString("FFLOW").trim().equals("P")) {
                        beanCons.strDescFFLOW = "Scheduled";
                    } else {
                        beanCons.strDescFFLOW = "(None)";
                    }
                    beanCons.FSENDSS = rst.getString("FSENDSS").trim();
                    beanCons.strFormatFSENDSS = Functions.getMonthConvert(rst.getString("FSENDSS").trim());
                    beanCons.CDEPART = rst.getString("CDEPART").trim();
                    if (hmAeropuertos.containsKey(rst.getString("CDEPART").trim().toUpperCase())) {
                        beanCons.strDescCDEPART = hmAeropuertos.get(rst.getString("CDEPART").trim()).toString();
                    }
                    beanCons.CARRIVA = rst.getString("CARRIVA").trim();
                    if (hmAeropuertos.containsKey(rst.getString("CARRIVA").trim().toUpperCase())) {
                        beanCons.strDescCARRIVA = hmAeropuertos.get(rst.getString("CARRIVA").trim()).toString();
                    }
                    beanCons.NFLIGHT = rst.getString("NFLIGHT").trim();
                    beanCons.DFLIGHT = rst.getString("DFLIGHT").trim();
                    beanCons.FSENDFI = rst.getString("FSENDFI").trim();
                    beanCons.strFormatDate3 = Functions.getMonthConvert(beanCons.FSENDFI);
                    beanCons.LEGSEQ = rst.getString("LEGSEQ").trim();
                    beanCons.strFormatDate = Functions.getMonthConvert(beanCons.DFLIGHT);
                    beanCons.FSENDOD = rst.getString("FSENDOD").trim();
                    beanCons.strFormatFSENDOD = Functions.getMonthConvert(rst.getString("FSENDOD").trim());
                    beanCons.FSENDVC = rst.getString("FSENDVC").trim();
                    beanCons.strFormatFSENDVC = Functions.getMonthConvert(rst.getString("FSENDVC").trim());
                    beanCons.FOPERZUL = rst.getString("FOPERZUL");
                    beanCons.strFormatDate2 = Functions.getMonthConvert(beanCons.FOPERZUL);
                    beanCons.QCPNOD = rst.getLong("QCPNOD");
                    beanCons.QCPNFI = rst.getInt("QCPNFI");
                    beanCons.QCPNOCR = rst.getLong("QCPNOCR");
                    beanCons.QCPNVC = rst.getLong("QCPNVC");
                    beanCons.QCPNLEG = rst.getLong("QCPNLEG");
                    beanCons.QCPNMA = rst.getLong("QCPNMA");
                    beanCons.QCPNTOT = rst.getLong("QCPNTOT");

                    beanCons.QCPAD = rst.getLong("QCPAD");
                    beanCons.QCPCHD = rst.getLong("QCPCHD");
                    beanCons.QCPINF = rst.getLong("QCPINF");
                    beanCons.QCPTRA = rst.getLong("QCPTRA");

                    beanCons.page.PAGNUM = filter.page.PAGNUM;
                    beanCons.page.PAGROW = filter.page.PAGROW;
                    beanCons.page.TOTPAG = filter.page.TOTPAG;
                    beanCons.page.TOTROW = filter.page.TOTROW;

                    lstCons.add(beanCons);
                }
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            setClose();
        }
        return lstCons;
    }
    
    public A1691Filter loadPX095S04A1691(A1691Filter filter, HashMap<String, String> hmAeropuertos) throws SQLException, Exception {

        A1691Filter beanCons = new A1691Filter();

        //PX09500004
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX095S04A1691(?,?,?,?,?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(SQLCLL01);

            cs.registerOutParameter(6, Types.VARCHAR);
            cs.registerOutParameter(7, Types.VARCHAR);

            cs.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cs.setString(2, filter.DFLIGHT);
            cs.setString(3, filter.NFLIGHT);
            cs.setString(4, filter.CDEPART);
            cs.setString(5, filter.CARRIVA);

            cs.setString(6, "");
            cs.setString(7, "");
            cs.execute();

            rst = cs.getResultSet();
            if (rst.next()) {
                beanCons = new A1691Filter();
                beanCons.CCUST = rst.getString("CCUST").trim();
                beanCons.STVAL = rst.getString("STVAL").trim();
                beanCons.CARRI = rst.getString("CARRI").trim();
                beanCons.FFLOW = rst.getString("FFLOW").trim();
                beanCons.IN_CARRIER = session.getUserView().getUserInfo().USR;
                //beanCons.TOPER = rst.getString("TOPER").trim();
                //Obteniendo el Tipo de Operacion ==============================
                if (cs.getString(6) != null) {
                    beanCons.TOPER = cs.getString(6).trim();
                }
                //Obteniendo Descripción ODS ===================================
                if (cs.getString(7) != null) {
                    beanCons.strDescripcion = cs.getString(7).trim();
                }
                beanCons.FSENDSS = rst.getString("FSENDSS").trim();
                beanCons.CDEPART = rst.getString("CDEPART").trim();
                if (hmAeropuertos.containsKey(rst.getString("CDEPART").trim().toUpperCase())) {
                    beanCons.strDescCDEPART = hmAeropuertos.get(rst.getString("CDEPART").trim()).toString();
                }
                beanCons.CARRIVA = rst.getString("CARRIVA").trim();
                if (hmAeropuertos.containsKey(rst.getString("CARRIVA").trim().toUpperCase())) {
                    beanCons.strDescCARRIVA = hmAeropuertos.get(rst.getString("CARRIVA").trim()).toString();
                }
                beanCons.ZONE = rst.getString("ZONA").trim();
                beanCons.MINICONEC = rst.getString("MINICONEC").trim();
                beanCons.LEGSEQ = rst.getString("LEGSEQ").trim();
                beanCons.NFLIGHT = rst.getString("NFLIGHT").trim();
                beanCons.DFLIGHT = rst.getString("DFLIGHT").trim();
                beanCons.NPLANE = rst.getString("NPLANE").trim();
                beanCons.FSTASS = rst.getString("FSTASS").trim();
                beanCons.LOCDEP = rst.getString("LOCDEP");
                beanCons.LOCARR = rst.getString("LOCARR");
                beanCons.UTCDEP = rst.getString("UTCDEP");
                beanCons.UTCARR = rst.getString("UTCARR");

                beanCons.FOPERZUL = rst.getString("FOPERZUL").trim();
                beanCons.FSENDOD = rst.getString("FSENDOD").trim();
                beanCons.QCPNOD = rst.getLong("QCPNOD");
                beanCons.FSTAOD = rst.getString("FSTAOD").trim();
                beanCons.FSENDVC = rst.getString("FSENDVC").trim();
                beanCons.FSTAVC = rst.getString("FSTAVC").trim();
                beanCons.QCPNVC = rst.getLong("QCPNVC");
                beanCons.QCPNMA = rst.getLong("QCPNMA");
                beanCons.QCPNTOT = rst.getLong("QCPNTOT");
                beanCons.QCPNOCR = rst.getLong("QCPNOCR");
                beanCons.QCPNON = rst.getLong("QCPNON");
                beanCons.QCPNOAL = rst.getLong("QCPNOAL");
                beanCons.QCPHARB = rst.getLong("QCPHARB");
                beanCons.QCPCFRE = rst.getLong("QCPNFRE");
                beanCons.QCPCABY = rst.getLong("QCPCABY");
                beanCons.QCPCABF = rst.getLong("QCPCABF");
                beanCons.QCPAD = rst.getLong("QCPAD");
                beanCons.QCPCHD = rst.getLong("QCPCHD");
                beanCons.QCPINF = rst.getLong("QCPINF");
                beanCons.QCPTRA = rst.getLong("QCPTRA");
                beanCons.FCLOSE = rst.getString("FCLOSE").trim();
                beanCons.QCPNVAL = rst.getLong("QCPNVAL");
                beanCons.FSTAPO = rst.getString("FSTAPO").trim();
                beanCons.FSENDFI = rst.getString("FSENDFI").trim();
                beanCons.QCPNFI = rst.getInt("QCPNFI");
                beanCons.FSTAFI = rst.getString("FSTAFI").trim();
                beanCons.USCR = rst.getString("USCR").trim();
                beanCons.FECR = rst.getString("FECR").trim();
                beanCons.HOCR = Functions.ConvertedTime(rst.getString("HOCR").trim());
                beanCons.USUP = rst.getString("USUP").trim();
                beanCons.FEUP = rst.getString("FEUP").trim();
                beanCons.HOUP = Functions.ConvertedTime(rst.getString("HOUP").trim());
            }

        } catch (Exception e) {
            e.getMessage();
        } finally {
            setClose();
        }

        return beanCons;
    }
    
    public String loadPX232S02A1691(A1691Filter filter, String strOption) throws SQLException, Exception {

        //REALIZA EL INSERT, UPDATE O DELETE DE UN REGISTRO EN LA TABLA A1691.
        String strMsj = "An Unexpected Error Ocurred(NF).";

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX232S02A1691(?,?,?,?,?,?,?,?,?,?,"
                + "?,?,?,?,?,?,?,?,?,?,"
                + "?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(SQLCLL01);

            cs.registerOutParameter(35, Types.VARCHAR);

            cs.setString(1, strOption.trim());
            cs.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cs.setString(3, filter.STVAL.trim());
            cs.setString(4, filter.CARRI.trim());
            cs.setString(5, filter.FFLOW.trim());
            cs.setString(6, filter.TOPER.trim());
            cs.setString(7, filter.FSENDSS.trim());
            cs.setString(8, filter.CDEPART.trim());
            cs.setString(9, filter.CARRIVA.trim());
            cs.setString(10, filter.ZONE.trim());
            cs.setString(11, filter.MINICONEC.trim());
            cs.setString(12, filter.LEGSEQ.trim());
            cs.setString(13, filter.NFLIGHT.trim());
            cs.setString(14, filter.DFLIGHT.trim());
            cs.setString(15, filter.NPLANE.trim());
            cs.setString(16, filter.FSTASS.trim());
            cs.setString(17, filter.FSENDOD.trim());
            cs.setInt(18, Integer.parseInt(String.valueOf(filter.QCPNOD)));
            cs.setString(19, filter.FSTAOD.trim());
            cs.setString(20, filter.FSENDVC.trim());
            cs.setString(21, filter.FSTAVC.trim());
            cs.setInt(22, Integer.parseInt(String.valueOf(filter.QCPNVC)));
            cs.setInt(23, Integer.parseInt(String.valueOf(filter.QCPNMA)));
            cs.setInt(24, Integer.parseInt(String.valueOf(filter.QCPNTOT)));
            cs.setInt(25, Integer.parseInt(String.valueOf(filter.QCPNOAL)));
            cs.setInt(26, Integer.parseInt(String.valueOf(filter.QCPHARB)));
            cs.setString(27, filter.FSENDFI.trim());
            cs.setInt(28, filter.QCPNFI);
            cs.setString(29, filter.FSTAFI.trim());
            cs.setString(30, filter.FSTAPO.trim());
            cs.setString(31, session.getUserView().getUserInfo().USR);
            cs.setString(32, filter.FOPERZUL.trim());
            cs.setInt(33, Integer.parseInt(String.valueOf(filter.QCPTRA)));
            cs.setString(34, filter.strDescripcion.trim());
            cs.setString(35, "");
            cs.execute();

            strMsj = cs.getString(35);

        } catch (Exception e) {
            e.getMessage();
        } finally {
            setClose();
        }

        return strMsj;
    }
    
    // <editor-fold defaultstate="collapsed" desc="Cerrar Conexión">
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
    // </editor-fold>
}
