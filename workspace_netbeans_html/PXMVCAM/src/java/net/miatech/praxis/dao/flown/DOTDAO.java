package net.miatech.praxis.dao.flown;

// <editor-fold defaultstate="collapsed" desc="Imports">
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.DatabaseMetaData;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Vector;
import net.miatech.beans.A3084Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.exceptions.SpringException;

// </editor-fold>
/**
 *
 * @author gsanchez
 */
public class DOTDAO {

    // <editor-fold defaultstate="collapsed" desc="Variables locales">
    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private String strSQL;
    // </editor-fold>

    public DOTDAO() {
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }
    
    public List<A3084Filter> loadSQP01807(A3084Filter filter) throws SQLException, Exception {
        List<A3084Filter> lstRtn = new ArrayList<>(0);
        A3084Filter objRtn;

        int totQTYCOUP = 0, totQTYCOUPD = 0, totQTYCOUPU = 0, totQCPNTOT = 0, totQCPNTOTD = 0, totQCPNTOTU = 0;
        double totAMOUFARE = 0, totAMOUFARED = 0, totAMOUFAREU = 0;

        strSQL = "{CALL " + session.getMainLibrary() + ".SQP01807(?,?,?,?)}";
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(strSQL);

            cs.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cs.setString(2, filter.IN_FECHA_FROM);
            cs.setString(3, filter.QUARTER); // quarter
            cs.setString(4, filter.FTE);//fte

            cs.execute();

            rst = cs.getResultSet();
            while (rst.next()) {
                totQTYCOUP += rst.getInt("QTYCOUP");
                totQCPNTOT += rst.getInt("QCPNTOT");
                totAMOUFARE += rst.getDouble("FARE");

                totQTYCOUPD += rst.getInt("QTYCOUPD");
                totQCPNTOTD += rst.getInt("QCPNTOTD");
                totAMOUFARED += rst.getDouble("FARED");

                totQTYCOUPU += rst.getInt("QTYCOUPU");
                totQCPNTOTU += rst.getInt("QCPNTOTU");
                totAMOUFAREU += rst.getDouble("FAREU");

            }
//            try {
//                rst.close();
//            } catch (SQLException e) {
//                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
//            }
            if (cs.getMoreResults()) {
                rst = cs.getResultSet();
                while (rst.next()) {
                    objRtn = new A3084Filter();
                    objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                    objRtn.FTE = filter.FTE;
                    objRtn.YEAR = rst.getString("YEAR").trim();
                    objRtn.QUARTER = rst.getString("QUARTER").trim();
                    objRtn.strDescripcion = objRtn.YEAR + " - 0" + objRtn.QUARTER;
                    objRtn.strFCON = "USD";

                    objRtn.QTYCOUP = (rst.getInt("QTYCOUP"));
                    objRtn.QCPNTOT = (rst.getInt("QCPNTOT"));
                    objRtn.FARE = (rst.getDouble("FARE"));

                    objRtn.QTYCOUPD = (rst.getInt("QTYCOUPD"));
                    objRtn.QCPNTOTD = (rst.getInt("QCPNTOTD"));
                    objRtn.FARED = (rst.getDouble("FARED"));

                    objRtn.QTYCOUPU = (rst.getInt("QTYCOUPU"));
                    objRtn.QCPNTOTU = (rst.getInt("QCPNTOTU"));
                    objRtn.FAREU = (rst.getDouble("FAREU"));

                    objRtn.totQTYCOUP = totQTYCOUP;
                    objRtn.totQCPNTOT = totQCPNTOT;
                    objRtn.FARETOT = totAMOUFARE;

                    objRtn.totQTYCOUPD = totQTYCOUPD;
                    objRtn.totQCPNTOTD = totQCPNTOTD;
                    objRtn.FARETOTD = totAMOUFARED;

                    objRtn.totQTYCOUPU = totQTYCOUPU;
                    objRtn.totQCPNTOTU = totQCPNTOTU;
                    objRtn.FARETOTU = totAMOUFAREU;

                    lstRtn.add(objRtn);
                }
            }
        } finally {
            setClose();
        }

        return lstRtn;
    }
    
    public List<A3084Filter> loadSQP01808(A3084Filter filter) throws SQLException, Exception {
        List<A3084Filter> lstRtn = new ArrayList<>(0);
        A3084Filter objRtn;

        int totQTYCOUP = 0, totQTYCOUPD = 0, totQTYCOUPU = 0, totQCPNTOT = 0, totQCPNTOTD = 0, totQCPNTOTU = 0;
        double totAMOUFARE = 0, totAMOUFARED = 0, totAMOUFAREU = 0;

        strSQL = "{CALL " + session.getMainLibrary() + ".SQP01808(?,?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(strSQL);

            cs.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cs.setString(2, filter.IN_FECHA_FROM);
            cs.setString(3, filter.QUARTER); // quarter
            cs.setString(4, filter.FTE);//fte

            cs.execute();

            rst = cs.getResultSet();
            while (rst.next()) {
                totQTYCOUP += rst.getInt("QTYCOUP");
                totQCPNTOT += rst.getInt("QCPNTOT");
                totAMOUFARE += rst.getDouble("FARE");
                totQTYCOUPD += rst.getInt("QTYCOUPD");
                totQCPNTOTD += rst.getInt("QCPNTOTD");
                totAMOUFARED += rst.getDouble("FARED");
                totQTYCOUPU += rst.getInt("QTYCOUPU");
                totQCPNTOTU += rst.getInt("QCPNTOTU");
                totAMOUFAREU += rst.getDouble("FAREU");

            }
//            try {
//                rst.close();
//            } catch (SQLException e) {
//                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
//            }
            if (cs.getMoreResults()) {
                rst = cs.getResultSet();
                while (rst.next()) {
                    objRtn = new A3084Filter();
                    objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                    objRtn.QUARTER = filter.QUARTER;
                    objRtn.strFCON = filter.strFCON;//CURRENCY
                    objRtn.YEAR = filter.YEAR;
                    objRtn.strDescripcion = filter.strDescripcion; //year - quarter

                    if (objRtn.QUARTER.equals("1")) {
                        objRtn.strQuarter = "First Quarter";
                    } else if (objRtn.QUARTER.equals("2")) {
                        objRtn.strQuarter = "Second Quarter";
                    } else if (objRtn.QUARTER.equals("3")) {
                        objRtn.strQuarter = "Thrid Quarter";
                    } else if (objRtn.QUARTER.equals("4")) {
                        objRtn.strQuarter = "Fourth Quarter";
                    }
                    objRtn.FTE = rst.getString("FTE");
                    if (rst.getString("FTE").equals("1")) {
                        objRtn.strFte = "ON LINE";
                    } else if (rst.getString("FTE").equals("2")) {
                        objRtn.strFte = "CHARTER";
                    } else if (rst.getString("FTE").equals("3")) {
                        objRtn.strFte = "OAL";
                    }
                    objRtn.QTYCOUP = (rst.getInt("QTYCOUP"));
                    objRtn.QCPNTOT = (rst.getInt("QCPNTOT"));
                    objRtn.FARE = (rst.getDouble("FARE"));
                    objRtn.QTYCOUPD = (rst.getInt("QTYCOUPD"));
                    objRtn.QCPNTOTD = (rst.getInt("QCPNTOTD"));
                    objRtn.FARED = (rst.getDouble("FARED"));
                    objRtn.QTYCOUPU = (rst.getInt("QTYCOUPU"));
                    objRtn.QCPNTOTU = (rst.getInt("QCPNTOTU"));
                    objRtn.FAREU = (rst.getDouble("FAREU"));

                    objRtn.totQTYCOUP = totQTYCOUP;
                    objRtn.totQCPNTOT = totQCPNTOT;
                    objRtn.FARETOT = totAMOUFARE;

                    objRtn.totQTYCOUPD = totQTYCOUPD;
                    objRtn.totQCPNTOTD = totQCPNTOTD;
                    objRtn.FARETOTD = totAMOUFARED;

                    objRtn.totQTYCOUPU = totQTYCOUPU;
                    objRtn.totQCPNTOTU = totQCPNTOTU;
                    objRtn.FARETOTU = totAMOUFAREU;

                    lstRtn.add(objRtn);
                }
            }
        } finally {
            setClose();
        }

        return lstRtn;
    }
    
    public List<A3084Filter> loadDOT_COBOL(A3084Filter filter, HashMap<String, String> hmAeropuertos) throws SQLException, Exception {

        List<A3084Filter> lstRtn = new ArrayList<>(0);
        A3084Filter objRtn;

        HashMap hmCarr = new HashMap();
        hmCarr.put("AM", "AEROMEXICO");
        hmCarr.put("5D", "AM CONNECT");
        hmCarr.put("VW", "AEROMAR");

        DatabaseMetaData dmd = null;
        String strBuffer = "";

        HashMap hmTemp = new HashMap();
        int num = 0;
        if (filter.page.PAGROW == -1) {
            num = 1;
        } else {
            if (filter.strPag.equals("Y")) {
                //Retroceder
                num = filter.RN - 20;
            } else {
                num = filter.RN + 1;
            }
        }

        try {

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            dmd = cnx.getMetaData();
            int Z = 20;
            cs = cnx.prepareCall("{CALL PRAXIS".concat(dmd.getCatalogSeparator()).concat("SPRUT10550(?)}"));
            strBuffer = filter.bufferToString(session.getUserView().getCustomerInfo().CCUST, filter.strTicket, filter.strPag, "A3084B", filter.strTipo);

            cs.setString(1, strBuffer);
            cs.registerOutParameter(1, Types.CHAR);
            cs.execute();

            String sBuffer = cs.getString(1);

            if (!sBuffer.trim().isEmpty()) {

                int itemp = 0;

                String PrimerTkt = filter.PrimerstrTicket;
                for (int i = 0; i < Z; i++) {

                    itemp = 271 + (i * 143);

                    objRtn = new A3084Filter();
                    objRtn.page.PAGNUM = filter.page.PAGNUM;
                    objRtn.RN = num;
                    if (num == 1) {
                        PrimerTkt = sBuffer.substring(itemp + 0, itemp + 14);
                    }
                    objRtn.YEAR = filter.YEAR;
                    objRtn.QUARTER = filter.QUARTER;
                    objRtn.FTE = filter.FTE;
                    objRtn.strTipo = filter.strTipo; // flag
                    objRtn.strFCON = filter.strFCON;//currency
                    objRtn.strQuarter = filter.strQuarter;
                    objRtn.strFte = filter.strFte;
                    objRtn.PrimerstrTicket = PrimerTkt;
                    objRtn.TICKET = sBuffer.substring(itemp + 0, itemp + 13) + " " + sBuffer.substring(itemp + 13, itemp + 14);
                    objRtn.strSQL = sBuffer.substring(itemp + 29, itemp + 42) + " " + sBuffer.substring(itemp + 42, itemp + 43);

                    // <editor-fold defaultstate="collapsed" desc="hmAeropuertos.containsKey">
                    if (hmAeropuertos.containsKey(sBuffer.substring(itemp + 43, itemp + 46).trim().toUpperCase())) {
                        objRtn.strDesCity01 = hmAeropuertos.get(sBuffer.substring(itemp + 43, itemp + 46)).toString() + " - "
                                + sBuffer.substring(itemp + 46, itemp + 49) + " - "
                                + sBuffer.substring(itemp + 49, itemp + 52) + " - "
                                + sBuffer.substring(itemp + 52, itemp + 53);
                    }

                    if (hmAeropuertos.containsKey(sBuffer.substring(itemp + 53, itemp + 56).trim().toUpperCase())) {
                        objRtn.strDesCity02 = hmAeropuertos.get(sBuffer.substring(itemp + 53, itemp + 56)).toString() + " - "
                                + sBuffer.substring(itemp + 56, itemp + 59) + " - "
                                + sBuffer.substring(itemp + 59, itemp + 62) + " - "
                                + sBuffer.substring(itemp + 62, itemp + 63);
                    }

                    if (hmAeropuertos.containsKey(sBuffer.substring(itemp + 63, itemp + 66).trim().toUpperCase())) {
                        objRtn.strDesCity03 = hmAeropuertos.get(sBuffer.substring(itemp + 63, itemp + 66)).toString() + "  - "
                                + sBuffer.substring(itemp + 66, itemp + 69) + " - "
                                + sBuffer.substring(itemp + 69, itemp + 72) + " - "
                                + sBuffer.substring(itemp + 72, itemp + 73);
                    }

                    if (hmAeropuertos.containsKey(sBuffer.substring(itemp + 73, itemp + 76).trim().toUpperCase())) {
                        objRtn.strDesCity04 = hmAeropuertos.get(sBuffer.substring(itemp + 73, itemp + 76)).toString() + "  - "
                                + sBuffer.substring(itemp + 76, itemp + 79) + " - "
                                + sBuffer.substring(itemp + 79, itemp + 82) + " - "
                                + sBuffer.substring(itemp + 82, itemp + 83);
                    }

                    if (hmAeropuertos.containsKey(sBuffer.substring(itemp + 83, itemp + 86).trim().toUpperCase())) {
                        objRtn.strDesCity05 = hmAeropuertos.get(sBuffer.substring(itemp + 83, itemp + 86)).toString() + "  - "
                                + sBuffer.substring(itemp + 86, itemp + 89) + " - "
                                + sBuffer.substring(itemp + 89, itemp + 92) + " - "
                                + sBuffer.substring(itemp + 92, itemp + 93);
                    }

                    if (hmAeropuertos.containsKey(sBuffer.substring(itemp + 93, itemp + 96).trim().toUpperCase())) {
                        objRtn.strDesCity06 = hmAeropuertos.get(sBuffer.substring(itemp + 93, itemp + 96)).toString() + "  - "
                                + sBuffer.substring(itemp + 96, itemp + 99) + " - "
                                + sBuffer.substring(itemp + 99, itemp + 102) + " - "
                                + sBuffer.substring(itemp + 102, itemp + 103);
                    }

                    if (hmAeropuertos.containsKey(sBuffer.substring(itemp + 103, itemp + 106).trim().toUpperCase())) {
                        objRtn.strDesCity07 = hmAeropuertos.get(sBuffer.substring(itemp + 103, itemp + 106)).toString() + "  - "
                                + sBuffer.substring(itemp + 106, itemp + 109) + " - "
                                + sBuffer.substring(itemp + 109, itemp + 112) + " - "
                                + sBuffer.substring(itemp + 112, itemp + 113);
                    }

                    if (hmAeropuertos.containsKey(sBuffer.substring(itemp + 113, itemp + 116).trim().toUpperCase())) {
                        objRtn.strDesCity08 = hmAeropuertos.get(sBuffer.substring(itemp + 113, itemp + 116)).toString() + "  - "
                                + sBuffer.substring(itemp + 116, itemp + 119) + " - "
                                + sBuffer.substring(itemp + 119, itemp + 122) + " - "
                                + sBuffer.substring(itemp + 122, itemp + 123);
                    }

                    if (hmAeropuertos.containsKey(sBuffer.substring(itemp + 123, itemp + 126).trim().toUpperCase())) {
                        objRtn.strDesCity09 = hmAeropuertos.get(sBuffer.substring(itemp + 123, itemp + 126)).toString() + "  - "
                                + sBuffer.substring(itemp + 126, itemp + 129) + " - "
                                + sBuffer.substring(itemp + 129, itemp + 132) + " - "
                                + sBuffer.substring(itemp + 132, itemp + 133);
                    }

                    if (hmAeropuertos.containsKey(sBuffer.substring(itemp + 133, itemp + 136).trim().toUpperCase())) {
                        objRtn.strDesCity10 = hmAeropuertos.get(sBuffer.substring(itemp + 133, itemp + 136)).toString() + "  - "
                                + sBuffer.substring(itemp + 136, itemp + 139) + " - "
                                + sBuffer.substring(itemp + 139, itemp + 142) + " - "
                                + sBuffer.substring(itemp + 142, itemp + 143);
                    }

                    if (hmAeropuertos.containsKey(sBuffer.substring(itemp + 143, itemp + 146).trim().toUpperCase())) {
                        objRtn.strDesCity11 = hmAeropuertos.get(sBuffer.substring(itemp + 143, itemp + 146)).toString() + "  - "
                                + sBuffer.substring(itemp + 146, itemp + 149) + " - "
                                + sBuffer.substring(itemp + 149, itemp + 152) + " - "
                                + sBuffer.substring(itemp + 152, itemp + 153);
                    }

                    if (hmAeropuertos.containsKey(sBuffer.substring(itemp + 153, itemp + 156).trim().toUpperCase())) {
                        objRtn.strDesCity12 = hmAeropuertos.get(sBuffer.substring(itemp + 153, itemp + 156)).toString() + "  - "
                                + sBuffer.substring(itemp + 156, itemp + 159) + " - "
                                + sBuffer.substring(itemp + 159, itemp + 162) + " - "
                                + sBuffer.substring(itemp + 162, itemp + 163);
                    }

                    if (hmAeropuertos.containsKey(sBuffer.substring(itemp + 163, itemp + 166).trim().toUpperCase())) {
                        objRtn.strDesCity13 = hmAeropuertos.get(sBuffer.substring(itemp + 163, itemp + 166)).toString() + "  - "
                                + sBuffer.substring(itemp + 166, itemp + 169) + " - "
                                + sBuffer.substring(itemp + 169, itemp + 172) + " - "
                                + sBuffer.substring(itemp + 172, itemp + 173);
                    }

                    if (hmAeropuertos.containsKey(sBuffer.substring(itemp + 173, itemp + 176).trim().toUpperCase())) {
                        objRtn.strDesCity14 = hmAeropuertos.get(sBuffer.substring(itemp + 173, itemp + 176)).toString() + "  - "
                                + sBuffer.substring(itemp + 176, itemp + 179) + " - "
                                + sBuffer.substring(itemp + 179, itemp + 182) + " - "
                                + sBuffer.substring(itemp + 182, itemp + 183);
                    }

                    if (hmAeropuertos.containsKey(sBuffer.substring(itemp + 183, itemp + 186).trim().toUpperCase())) {
                        objRtn.strDesCity15 = hmAeropuertos.get(sBuffer.substring(itemp + 183, itemp + 186)).toString() + "  - "
                                + sBuffer.substring(itemp + 186, itemp + 189) + " - "
                                + sBuffer.substring(itemp + 189, itemp + 192) + " - "
                                + sBuffer.substring(itemp + 192, itemp + 193);
                    }

                    if (hmAeropuertos.containsKey(sBuffer.substring(itemp + 193, itemp + 196).trim().toUpperCase())) {
                        objRtn.strDesCity16 = hmAeropuertos.get(sBuffer.substring(itemp + 193, itemp + 196)).toString() + "  - "
                                + sBuffer.substring(itemp + 196, itemp + 199) + " - "
                                + sBuffer.substring(itemp + 199, itemp + 202) + " - "
                                + sBuffer.substring(itemp + 202, itemp + 203);
                    }

                    if (hmAeropuertos.containsKey(sBuffer.substring(itemp + 203, itemp + 206).trim().toUpperCase())) {
                        objRtn.strDesCity17 = hmAeropuertos.get(sBuffer.substring(itemp + 203, itemp + 206)).toString() + "  - "
                                + sBuffer.substring(itemp + 206, itemp + 209) + " - "
                                + sBuffer.substring(itemp + 209, itemp + 212) + " - "
                                + sBuffer.substring(itemp + 212, itemp + 213);
                    }

                    if (hmAeropuertos.containsKey(sBuffer.substring(itemp + 213, itemp + 216).trim().toUpperCase())) {
                        objRtn.strDesCity18 = hmAeropuertos.get(sBuffer.substring(itemp + 213, itemp + 216)).toString() + "  - "
                                + sBuffer.substring(itemp + 216, itemp + 219) + " - "
                                + sBuffer.substring(itemp + 219, itemp + 222) + " - "
                                + sBuffer.substring(itemp + 222, itemp + 223);
                    }

                    if (hmAeropuertos.containsKey(sBuffer.substring(itemp + 223, itemp + 226).trim().toUpperCase())) {
                        objRtn.strDesCity19 = hmAeropuertos.get(sBuffer.substring(itemp + 223, itemp + 226)).toString() + "  - "
                                + sBuffer.substring(itemp + 226, itemp + 229) + " - "
                                + sBuffer.substring(itemp + 229, itemp + 232) + " - "
                                + sBuffer.substring(itemp + 232, itemp + 233);
                    }

                    if (hmAeropuertos.containsKey(sBuffer.substring(itemp + 233, itemp + 236).trim().toUpperCase())) {
                        objRtn.strDesCity20 = hmAeropuertos.get(sBuffer.substring(itemp + 233, itemp + 236)).toString() + "  - "
                                + sBuffer.substring(itemp + 236, itemp + 239) + " - "
                                + sBuffer.substring(itemp + 239, itemp + 242) + " - "
                                + sBuffer.substring(itemp + 242, itemp + 243);
                    }
                    // </editor-fold>

                    // <editor-fold defaultstate="collapsed" desc="objRtn.strCity">
                    objRtn.strCity01 = sBuffer.substring(itemp + 43, itemp + 46) + "  - "
                            + sBuffer.substring(itemp + 46, itemp + 49) + " - "
                            + sBuffer.substring(itemp + 49, itemp + 52) + " - "
                            + sBuffer.substring(itemp + 52, itemp + 53);

                    objRtn.strCity02 = sBuffer.substring(itemp + 53, itemp + 56) + "  - "
                            + sBuffer.substring(itemp + 56, itemp + 59) + " - "
                            + sBuffer.substring(itemp + 59, itemp + 62) + " - "
                            + sBuffer.substring(itemp + 62, itemp + 63);

                    objRtn.strCity03 = sBuffer.substring(itemp + 63, itemp + 66) + "  - "
                            + sBuffer.substring(itemp + 66, itemp + 69) + " - "
                            + sBuffer.substring(itemp + 69, itemp + 72) + " - "
                            + sBuffer.substring(itemp + 72, itemp + 73);

                    objRtn.strCity04 = sBuffer.substring(itemp + 73, itemp + 76) + "  - "
                            + sBuffer.substring(itemp + 76, itemp + 79) + " - "
                            + sBuffer.substring(itemp + 79, itemp + 82) + " - "
                            + sBuffer.substring(itemp + 82, itemp + 83);

                    objRtn.strCity05 = sBuffer.substring(itemp + 83, itemp + 86) + "  - "
                            + sBuffer.substring(itemp + 86, itemp + 89) + " - "
                            + sBuffer.substring(itemp + 89, itemp + 92) + " - "
                            + sBuffer.substring(itemp + 92, itemp + 93);

                    objRtn.strCity06 = sBuffer.substring(itemp + 93, itemp + 96) + "  - "
                            + sBuffer.substring(itemp + 96, itemp + 99) + " - "
                            + sBuffer.substring(itemp + 99, itemp + 102) + " - "
                            + sBuffer.substring(itemp + 102, itemp + 103);

                    objRtn.strCity07 = sBuffer.substring(itemp + 103, itemp + 106) + "  - "
                            + sBuffer.substring(itemp + 106, itemp + 109) + " - "
                            + sBuffer.substring(itemp + 109, itemp + 112) + " - "
                            + sBuffer.substring(itemp + 112, itemp + 113);

                    objRtn.strCity08 = sBuffer.substring(itemp + 113, itemp + 116) + "  - "
                            + sBuffer.substring(itemp + 116, itemp + 119) + " - "
                            + sBuffer.substring(itemp + 119, itemp + 122) + " - "
                            + sBuffer.substring(itemp + 122, itemp + 123);

                    objRtn.strCity09 = sBuffer.substring(itemp + 123, itemp + 126) + "  - "
                            + sBuffer.substring(itemp + 126, itemp + 129) + " - "
                            + sBuffer.substring(itemp + 129, itemp + 132) + " - "
                            + sBuffer.substring(itemp + 132, itemp + 133);

                    objRtn.strCity10 = sBuffer.substring(itemp + 133, itemp + 136) + "  - "
                            + sBuffer.substring(itemp + 136, itemp + 139) + " - "
                            + sBuffer.substring(itemp + 139, itemp + 142) + " - "
                            + sBuffer.substring(itemp + 142, itemp + 143);

                    objRtn.strCity11 = sBuffer.substring(itemp + 143, itemp + 146) + "  - "
                            + sBuffer.substring(itemp + 146, itemp + 149) + " - "
                            + sBuffer.substring(itemp + 149, itemp + 152) + " - "
                            + sBuffer.substring(itemp + 152, itemp + 153);

                    objRtn.strCity12 = sBuffer.substring(itemp + 153, itemp + 156) + "  - "
                            + sBuffer.substring(itemp + 156, itemp + 159) + " - "
                            + sBuffer.substring(itemp + 159, itemp + 162) + " - "
                            + sBuffer.substring(itemp + 162, itemp + 163);

                    objRtn.strCity13 = sBuffer.substring(itemp + 163, itemp + 166) + "  - "
                            + sBuffer.substring(itemp + 166, itemp + 169) + " - "
                            + sBuffer.substring(itemp + 169, itemp + 172) + " - "
                            + sBuffer.substring(itemp + 172, itemp + 173);

                    objRtn.strCity14 = sBuffer.substring(itemp + 173, itemp + 176) + "  - "
                            + sBuffer.substring(itemp + 176, itemp + 179) + " - "
                            + sBuffer.substring(itemp + 179, itemp + 182) + " - "
                            + sBuffer.substring(itemp + 182, itemp + 183);

                    objRtn.strCity15 = sBuffer.substring(itemp + 183, itemp + 186) + "  - "
                            + sBuffer.substring(itemp + 186, itemp + 189) + " - "
                            + sBuffer.substring(itemp + 189, itemp + 192) + " - "
                            + sBuffer.substring(itemp + 192, itemp + 193);

                    objRtn.strCity16 = sBuffer.substring(itemp + 193, itemp + 196) + "  - "
                            + sBuffer.substring(itemp + 196, itemp + 199) + " - "
                            + sBuffer.substring(itemp + 199, itemp + 202) + " - "
                            + sBuffer.substring(itemp + 202, itemp + 203);

                    objRtn.strCity17 = sBuffer.substring(itemp + 203, itemp + 206) + "  - "
                            + sBuffer.substring(itemp + 206, itemp + 209) + " - "
                            + sBuffer.substring(itemp + 209, itemp + 212) + " - "
                            + sBuffer.substring(itemp + 212, itemp + 213);

                    objRtn.strCity18 = sBuffer.substring(itemp + 213, itemp + 216) + "  - "
                            + sBuffer.substring(itemp + 216, itemp + 219) + " - "
                            + sBuffer.substring(itemp + 219, itemp + 222) + " - "
                            + sBuffer.substring(itemp + 222, itemp + 223);

                    objRtn.strCity19 = sBuffer.substring(itemp + 223, itemp + 226) + "  - "
                            + sBuffer.substring(itemp + 226, itemp + 229) + " - "
                            + sBuffer.substring(itemp + 229, itemp + 232) + " - "
                            + sBuffer.substring(itemp + 232, itemp + 233);

                    objRtn.strCity20 = sBuffer.substring(itemp + 233, itemp + 236) + "  - "
                            + sBuffer.substring(itemp + 236, itemp + 239) + " - "
                            + sBuffer.substring(itemp + 239, itemp + 242) + " - "
                            + sBuffer.substring(itemp + 242, itemp + 243);
                    // </editor-fold>

                    objRtn.CCIA = sBuffer.substring(itemp + 0, itemp + 3);
                    objRtn.FORMA = sBuffer.substring(itemp + 3, itemp + 7);
                    objRtn.SERIE = sBuffer.substring(itemp + 7, itemp + 13);
                    objRtn.FARE = Double.parseDouble(sBuffer.substring(itemp + 13, itemp + 26)) / 100;
                    objRtn.PASSCOUN = Integer.parseInt(sBuffer.substring(itemp + 26, itemp + 29));

                    objRtn.CCIAF = sBuffer.substring(itemp + 29, itemp + 32);
                    objRtn.FORMAF = sBuffer.substring(itemp + 32, itemp + 36);
                    objRtn.SERIEF = sBuffer.substring(itemp + 36, itemp + 42);
                    objRtn.CUPONF = sBuffer.substring(itemp + 42, itemp + 43);

                    // <editor-fold defaultstate="collapsed" desc="objRtn.CAMPO = sBuffer.substring">
                    objRtn.AIRCODE01 = sBuffer.substring(itemp + 43, itemp + 46); //city
                    objRtn.OPECARR01 = sBuffer.substring(itemp + 46, itemp + 49); //
                    objRtn.TKTCARR01 = sBuffer.substring(itemp + 49, itemp + 52);
                    objRtn.FAREBAS01 = sBuffer.substring(itemp + 52, itemp + 53); //class

                    objRtn.AIRCODE02 = sBuffer.substring(itemp + 53, itemp + 56);
                    objRtn.OPECARR02 = sBuffer.substring(itemp + 56, itemp + 59);
                    objRtn.TKTCARR02 = sBuffer.substring(itemp + 59, itemp + 62);
                    objRtn.FAREBAS02 = sBuffer.substring(itemp + 62, itemp + 63);

                    objRtn.AIRCODE03 = sBuffer.substring(itemp + 63, itemp + 66);
                    objRtn.OPECARR03 = sBuffer.substring(itemp + 66, itemp + 69);
                    objRtn.TKTCARR03 = sBuffer.substring(itemp + 69, itemp + 72);
                    objRtn.FAREBAS03 = sBuffer.substring(itemp + 72, itemp + 73);

                    objRtn.AIRCODE04 = sBuffer.substring(itemp + 73, itemp + 76);
                    objRtn.OPECARR04 = sBuffer.substring(itemp + 76, itemp + 79);
                    objRtn.TKTCARR04 = sBuffer.substring(itemp + 79, itemp + 82);
                    objRtn.FAREBAS04 = sBuffer.substring(itemp + 82, itemp + 83);

                    objRtn.AIRCODE05 = sBuffer.substring(itemp + 83, itemp + 86);
                    objRtn.OPECARR05 = sBuffer.substring(itemp + 86, itemp + 89);
                    objRtn.TKTCARR05 = sBuffer.substring(itemp + 89, itemp + 92);
                    objRtn.FAREBAS05 = sBuffer.substring(itemp + 92, itemp + 93);

                    objRtn.AIRCODE06 = sBuffer.substring(itemp + 93, itemp + 96);
                    objRtn.OPECARR06 = sBuffer.substring(itemp + 96, itemp + 99);
                    objRtn.TKTCARR06 = sBuffer.substring(itemp + 99, itemp + 102);
                    objRtn.FAREBAS06 = sBuffer.substring(itemp + 102, itemp + 103);

                    objRtn.AIRCODE07 = sBuffer.substring(itemp + 103, itemp + 106);
                    objRtn.OPECARR07 = sBuffer.substring(itemp + 106, itemp + 109);
                    objRtn.TKTCARR07 = sBuffer.substring(itemp + 109, itemp + 112);
                    objRtn.FAREBAS07 = sBuffer.substring(itemp + 112, itemp + 113);

                    objRtn.AIRCODE08 = sBuffer.substring(itemp + 113, itemp + 116);
                    objRtn.OPECARR08 = sBuffer.substring(itemp + 116, itemp + 119);
                    objRtn.TKTCARR08 = sBuffer.substring(itemp + 119, itemp + 122);
                    objRtn.FAREBAS08 = sBuffer.substring(itemp + 122, itemp + 123);

                    objRtn.AIRCODE09 = sBuffer.substring(itemp + 123, itemp + 126);
                    objRtn.OPECARR09 = sBuffer.substring(itemp + 126, itemp + 129);
                    objRtn.TKTCARR09 = sBuffer.substring(itemp + 129, itemp + 132);
                    objRtn.FAREBAS09 = sBuffer.substring(itemp + 132, itemp + 133);

                    objRtn.AIRCODE10 = sBuffer.substring(itemp + 133, itemp + 136);
                    objRtn.OPECARR10 = sBuffer.substring(itemp + 136, itemp + 139);
                    objRtn.TKTCARR10 = sBuffer.substring(itemp + 139, itemp + 142);
                    objRtn.FAREBAS10 = sBuffer.substring(itemp + 142, itemp + 143);

                    objRtn.AIRCODE11 = sBuffer.substring(itemp + 143, itemp + 146);
                    objRtn.OPECARR11 = sBuffer.substring(itemp + 146, itemp + 149);
                    objRtn.TKTCARR11 = sBuffer.substring(itemp + 149, itemp + 152);
                    objRtn.FAREBAS11 = sBuffer.substring(itemp + 152, itemp + 153);

                    objRtn.AIRCODE12 = sBuffer.substring(itemp + 153, itemp + 156);
                    objRtn.OPECARR12 = sBuffer.substring(itemp + 156, itemp + 159);
                    objRtn.TKTCARR12 = sBuffer.substring(itemp + 159, itemp + 162);
                    objRtn.FAREBAS12 = sBuffer.substring(itemp + 162, itemp + 163);

                    objRtn.AIRCODE13 = sBuffer.substring(itemp + 163, itemp + 166);
                    objRtn.OPECARR13 = sBuffer.substring(itemp + 166, itemp + 169);
                    objRtn.TKTCARR13 = sBuffer.substring(itemp + 169, itemp + 172);
                    objRtn.FAREBAS13 = sBuffer.substring(itemp + 172, itemp + 173);

                    objRtn.AIRCODE14 = sBuffer.substring(itemp + 173, itemp + 176);
                    objRtn.OPECARR14 = sBuffer.substring(itemp + 176, itemp + 179);
                    objRtn.TKTCARR14 = sBuffer.substring(itemp + 179, itemp + 182);
                    objRtn.FAREBAS14 = sBuffer.substring(itemp + 182, itemp + 183);

                    objRtn.AIRCODE15 = sBuffer.substring(itemp + 183, itemp + 186);
                    objRtn.OPECARR15 = sBuffer.substring(itemp + 186, itemp + 189);
                    objRtn.TKTCARR15 = sBuffer.substring(itemp + 189, itemp + 192);
                    objRtn.FAREBAS15 = sBuffer.substring(itemp + 192, itemp + 193);

                    objRtn.AIRCODE16 = sBuffer.substring(itemp + 193, itemp + 196);
                    objRtn.OPECARR16 = sBuffer.substring(itemp + 196, itemp + 199);
                    objRtn.TKTCARR16 = sBuffer.substring(itemp + 199, itemp + 202);
                    objRtn.FAREBAS16 = sBuffer.substring(itemp + 202, itemp + 203);

                    objRtn.AIRCODE17 = sBuffer.substring(itemp + 203, itemp + 206);
                    objRtn.OPECARR17 = sBuffer.substring(itemp + 206, itemp + 209);
                    objRtn.TKTCARR17 = sBuffer.substring(itemp + 209, itemp + 212);
                    objRtn.FAREBAS17 = sBuffer.substring(itemp + 212, itemp + 213);

                    objRtn.AIRCODE18 = sBuffer.substring(itemp + 213, itemp + 216);
                    objRtn.OPECARR18 = sBuffer.substring(itemp + 216, itemp + 219);
                    objRtn.TKTCARR18 = sBuffer.substring(itemp + 219, itemp + 222);
                    objRtn.FAREBAS18 = sBuffer.substring(itemp + 222, itemp + 223);

                    objRtn.AIRCODE19 = sBuffer.substring(itemp + 223, itemp + 226);
                    objRtn.OPECARR19 = sBuffer.substring(itemp + 226, itemp + 229);
                    objRtn.TKTCARR19 = sBuffer.substring(itemp + 229, itemp + 232);
                    objRtn.FAREBAS19 = sBuffer.substring(itemp + 232, itemp + 233);

                    objRtn.AIRCODE20 = sBuffer.substring(itemp + 233, itemp + 236);
                    objRtn.OPECARR20 = sBuffer.substring(itemp + 236, itemp + 239);
                    objRtn.TKTCARR20 = sBuffer.substring(itemp + 239, itemp + 242);
                    objRtn.FAREBAS20 = sBuffer.substring(itemp + 242, itemp + 243);
                    // </editor-fold>

                    if (!objRtn.TICKET.trim().isEmpty()) {
                        if (filter.strPag.equals("Y")) {
                            //Retroceder
                            hmTemp.put(objRtn.TICKET.trim(), objRtn);
                        } else {
                            lstRtn.add(objRtn);
                        }
                    }
                    num++;
                }

                if (filter.strPag.equals("Y")) {
                    num = num - 20;
                    if (!hmTemp.isEmpty()) {
                        Vector v = new Vector(hmTemp.keySet());
                        Collections.sort(v);
                        Iterator it = v.iterator();
                        while (it.hasNext()) {
                            String keyI = (String) (it.next());
                            objRtn = (A3084Filter) hmTemp.get(keyI);
                            objRtn.RN = num;
                            num++;
                            lstRtn.add(objRtn);
                        }
                    }
                }
            }

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
