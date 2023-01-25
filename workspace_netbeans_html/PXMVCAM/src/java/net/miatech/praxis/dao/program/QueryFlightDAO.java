package net.miatech.praxis.dao.program;

// <editor-fold defaultstate="collapsed" desc="Imports">
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Types;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import net.miatech.beans.A1691Filter;
import net.miatech.beans.A1692Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.libmiatec.A1248;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.utils.Functions;

// </editor-fold>
/**
 *
 * @author gsanchez
 */
public class QueryFlightDAO {

    // <editor-fold defaultstate="collapsed" desc="Variables locales">
    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private String strSQL;
    // </editor-fold>

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A1248> loadFieldsConditions() throws Exception {

        Statement stmt = null;
        String sql = "";
        List<A1248> lista = new ArrayList<>();
        A1248 record;

       /* String sql = "SELECT * FROM " + session.getMainLibrary() + ".A1248 WHERE TABNAME='COMPARADOR' "
                + "ORDER BY USERFIELD ASC ";*/

      //  Connection cnx = null;
        try {
              sql = "SELECT * FROM " + session.getMainLibrary() + ".A1248 WHERE TABNAME='COMPARADOR' "
                + "ORDER BY USERFIELD ASC ";
             
          cnx = session.getCNXIBMDB2().getIBMDB2Connection();  
          stmt = cnx.createStatement();
            rst = stmt.executeQuery(sql);
           
             while (rst.next()) {

                record = new A1248();
                record.TABNAME = rst.getString("TABNAME").trim();
                record.USERFIELD = rst.getString("USERFIELD").trim();
                record.DESCRIPT = rst.getString("DESCRIPT").trim();
                record.SYSTFIELD = rst.getString("SYSTFIELD").trim();
                record.DATATYPE = rst.getString("DATATYPE").trim();
                record.SUBSTRFL = rst.getString("SUBSTRFL").trim();
                lista.add(record);
            }
//            try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            stmt.close();
        } finally {
            setClose();
            if (stmt != null) {
                stmt.close();
            }
        }
        return lista;
    }
    
    public List<A1248> loadFields(String tabla) throws Exception {

        Statement stmt = null;
        String sql = "";
        List<A1248> lista = new ArrayList<>();
        A1248 record;

        try {
            if(tabla.equals("A1691")){
                sql = "SELECT * FROM " + session.getMainLibrary() + ".A1248 WHERE TABNAME = 'A1691' OR TABNAME = 'A1692' ORDER BY TABNAME,ORDERSEL,USERFIELD ASC ";
            }else{
                 sql = "SELECT * FROM " + session.getMainLibrary() + ".A1248 WHERE TABNAME = '" + tabla + "' ORDER BY ORDERSEL,USERFIELD ASC ";
            }
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            stmt = cnx.createStatement();
            rst = stmt.executeQuery(sql);
            
            while (rst.next()) {

                record = new A1248();
                record.TABNAME = rst.getString("TABNAME").trim();
                record.USERFIELD = rst.getString("USERFIELD").trim();
                record.DESCRIPT = rst.getString("DESCRIPT").trim();
                record.SYSTFIELD = rst.getString("SYSTFIELD").trim();
                record.DATATYPE = rst.getString("DATATYPE").trim();
                record.SUBSTRFL = rst.getString("SUBSTRFL").trim();
                record.LENGHTF = rst.getInt("LENGHTF");
                record.strExample = rst.getString("FHELP").trim();
                lista.add(record);
            }
//            try { rst.close(); } catch(SQLException e) { logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage() ,e); }
//            stmt.close();
        } finally {
            if (stmt != null) {
                stmt.close();
            }
        }
        return lista;
    }
    
    public List<A1691Filter> loadPX072S04A1691(A1691Filter filter, HashMap hmAeropuertos) throws SQLException, Exception {

        //Para traer data del Programa de Query del Manifiesto de Vuelo
        List<A1691Filter> lstCons = new ArrayList<>(0);
        A1691Filter beanCons;

        // <editor-fold defaultstate="collapsed" desc=" 'DATE' ">
        filter.yearFrom = Functions.fillZeros(4, filter.yearFrom).replace("00", "");//YYYY
        filter.monthFrom = Functions.fillZeros(2, filter.monthFrom).replace("00", "");//MM
        filter.dayFrom = Functions.fillZeros(2, filter.dayFrom).replace("00", "");//DD
        filter.dayTo = Functions.fillZeros(2, filter.dayTo).replace("00", "");//DD
        //</editor-fold>

        //System.out.println(filter.strSQL.trim());
        long QCPNVC = 0, QCPCON = 0, QCPNON = 0, QCPNVAL = 0, QCPNOAL = 0, QCPNTOT = 0, QCPNOD = 0, QCPNCON = 0, lngQDIFF = 0, QCPNLEG = 0;
        double VCPNUSD = 0, VCPNLOC = 0;
        strSQL = "{CALL " + session.getMainLibrary() + ".SQP00206(?,?,?,?,?,?,?,?,?,?,?)}";
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(strSQL);

            cs.registerOutParameter(8, Types.INTEGER);
            cs.registerOutParameter(9, Types.INTEGER);
            cs.registerOutParameter(10, Types.INTEGER);
            cs.registerOutParameter(11, Types.INTEGER);

            cs.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cs.setString(2, filter.yearFrom.trim());
            cs.setString(3, filter.monthFrom.trim());
            cs.setString(4, filter.dayFrom.trim());
            cs.setString(5, filter.dayTo.trim());
            cs.setString(6, filter.strSQL.trim());
            cs.setString(7, filter.strTitulo.trim());
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
                QCPNOD = rst.getLong("QCPNODR");
                QCPNVC = rst.getLong("QCPNVCR");
                QCPNOAL = rst.getLong("QCPNOALR");
                QCPNON = rst.getLong("QCPNONR");
                QCPNTOT = rst.getLong("QCPNTOTR");
                QCPNVAL = rst.getLong("QCPNVALR");//CPN Valorizados
                QCPCON = rst.getLong("QCPCONR");//CPN Contabilizados
                QCPNCON = rst.getLong("QCPNTOTR") - rst.getLong("QCPCONR");//CPN No Contabilizados
                lngQDIFF = rst.getLong("QCPNTOTR") - rst.getLong("QCPNVALR");//CPN No Valorizados
                QCPNLEG = rst.getLong("QTY92R");
                VCPNLOC = rst.getDouble("VCPNR");
            }
            rst.close();

            if (cs.getMoreResults()) {
                rst = cs.getResultSet();
                while (rst.next()) {
                    beanCons = new A1691Filter();
                    beanCons.CARRI = filter.CARRI;
                    beanCons.yearFrom = filter.yearFrom;
                    beanCons.monthFrom = filter.monthFrom;
                    beanCons.dayFrom = filter.dayFrom;
                    beanCons.dayTo = filter.dayTo;
                    beanCons.strSQL = filter.strSQL;
                    beanCons.strTitulo = filter.strTitulo;

                    beanCons.CARRI = rst.getString("CARRI").trim();
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
                    if (rst.getString("FSENDSS").trim().length() == 8) {
                        beanCons.strFormatFSENDSS = rst.getString("FSENDSS").trim().substring(0, 4) + "-" + rst.getString("FSENDSS").trim().substring(4, 6) + "-" + rst.getString("FSENDSS").trim().substring(6);
                    } else {
                        beanCons.strFormatFSENDSS = rst.getString("FSENDSS").trim();
                    }
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
                    beanCons.LEGSEQ = rst.getString("LEGSEQ").trim();
                    //beanCons.strFormatDate = beanCons.DFLIGHT.substring(0, 4) + "-" + beanCons.DFLIGHT.substring(4, 6) + "-" + beanCons.DFLIGHT.substring(6);
                    beanCons.strFormatDate = Functions.getMonthConvert(beanCons.DFLIGHT);
                    beanCons.FSENDOD = rst.getString("FSENDOD").trim();
                    if (rst.getString("FSENDOD").trim().length() == 8) {
                        beanCons.strFormatFSENDOD = rst.getString("FSENDOD").trim().substring(0, 4) + "-" + rst.getString("FSENDOD").trim().substring(4, 6) + "-" + rst.getString("FSENDOD").trim().substring(6);
                    } else {
                        beanCons.strFormatFSENDOD = rst.getString("FSENDOD").trim();
                    }
                    beanCons.QCPNOD = rst.getLong("QCPNOD");
                    beanCons.FSENDVC = rst.getString("FSENDVC").trim();
                    if (rst.getString("FSENDVC").trim().length() == 8) {
                        beanCons.strFormatFSENDVC = rst.getString("FSENDVC").trim().substring(0, 4) + "-" + rst.getString("FSENDVC").trim().substring(4, 6) + "-" + rst.getString("FSENDVC").trim().substring(6);
                    } else {
                        beanCons.strFormatFSENDVC = rst.getString("FSENDVC").trim();
                    }
                    beanCons.QCPNVC = rst.getLong("QCPNVC");
                    beanCons.QCPNOAL = rst.getLong("QCPNOAL");
                    beanCons.QCPNON = rst.getLong("QCPNON");
                    beanCons.QCPNTOT = rst.getLong("QCPNTOT");
                    beanCons.QCPNVAL = rst.getLong("QCPNVAL");//CPN Valorizados
                    beanCons.QCPCON = rst.getLong("QCPCON");//CPN Contabilizados
                    beanCons.QCPNCON = rst.getLong("QCPNTOT") - rst.getLong("QCPCON");//CPN No Contabilizados
                    beanCons.VCPNLOC = rst.getDouble("VCPN");

                    beanCons.A1791ORAV = (beanCons.QCPNTOT > 0) ? (beanCons.QCPCON * 100) / beanCons.QCPNTOT : 0;
                    beanCons.lngQDIFF = beanCons.QCPNTOT - beanCons.QCPNVAL;//CPN No Valorizados

                    beanCons.QCPNLEG = rst.getLong("QTY92");

                    beanCons.totQCPNOD = QCPNOD;
                    beanCons.totQCPNVC = QCPNVC;
                    beanCons.totQCPNOAL = QCPNOAL;
                    beanCons.totQCPNON = QCPNON;
                    beanCons.totQCPNTOT = QCPNTOT;
                    beanCons.totQCPNVAL = QCPNVAL;//CPN Valorizados
                    beanCons.totQCPCON = QCPCON;//CPN Contabilizados
                    beanCons.totQCPNCON = QCPNCON;//CPN No Contabilizados
                    beanCons.totlngQDIFF = lngQDIFF;
                    beanCons.totQCPNLEG = QCPNLEG;
                    beanCons.totVCPNLOC = VCPNLOC;

                    beanCons.page.PAGNUM = filter.page.PAGNUM;
                    beanCons.page.PAGROW = filter.page.PAGROW;
                    beanCons.page.TOTPAG = filter.page.TOTPAG;
                    beanCons.page.TOTROW = filter.page.TOTROW;

                    lstCons.add(beanCons);
                }
            }
        } finally {
            setClose();
        }

        return lstCons;
    }
    
    public List<A1691Filter> loadPX072S11A1691(A1691Filter filter) throws SQLException, Exception {

        //Para traer data del Programa de Query del Manifiesto de Vuelo
        List<A1691Filter> lstCons = new ArrayList<>(0);
        A1691Filter beanCons;
        long PEND = 0, QCPNOAL = 0, QCPNON = 0, QCPNVAL = 0, NVAL = 0, QCPNTOT = 0, QCPCON = 0;
        double VCPNUSD = 0, VCPNLOC = 0, VCPN = 0;

        // <editor-fold defaultstate="collapsed" desc=" 'DATE' ">
        filter.yearFrom = Functions.fillZeros(4, filter.yearFrom).replace("00", "");//YYYY
        filter.monthFrom = Functions.fillZeros(2, filter.monthFrom).replace("00", "");//MM
        filter.dayFrom = Functions.fillZeros(2, filter.dayFrom).replace("00", "");//DD
        filter.dayTo = Functions.fillZeros(2, filter.dayTo).replace("00", "");//DD
        //</editor-fold>

        //System.out.println(filter.strSQL.trim());
        strSQL = "{CALL " + session.getMainLibrary() + ".PX072S01A1691(?,?,?,?,?,?,?,?,?,?,?,?)}";
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(strSQL);

            cs.registerOutParameter(9, Types.INTEGER);
            cs.registerOutParameter(10, Types.INTEGER);
            cs.registerOutParameter(11, Types.INTEGER);
            cs.registerOutParameter(12, Types.INTEGER);

            cs.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cs.setString(2, filter.yearFrom.trim());
            cs.setString(3, filter.monthFrom.trim());
            cs.setString(4, filter.dayFrom.trim());
            cs.setString(5, filter.dayTo.trim());
            cs.setString(6, filter.strSQL.trim());
            cs.setString(7, filter.strFCLOFO.trim());
            cs.setString(8, filter.DFLIGHT.trim());
            cs.setInt(9, filter.page.PAGNUM);
            cs.setInt(10, filter.page.PAGROW);
            cs.setInt(11, filter.page.TOTPAG);
            cs.setInt(12, filter.page.TOTROW);
            cs.execute();

            filter.page.PAGNUM = cs.getInt(9);
            filter.page.PAGROW = cs.getInt(10);
            filter.page.TOTPAG = cs.getInt(11);
            filter.page.TOTROW = cs.getInt(12);

            rst = cs.getResultSet();
            while (rst.next()) {
                QCPNTOT = rst.getLong("QCPNTOT");
                QCPNVAL = rst.getLong("QCPNVAL");
                NVAL = QCPNTOT - QCPNVAL;
                QCPCON = rst.getLong("QCPCON");
                PEND = rst.getLong("PEND");
                QCPNON = rst.getLong("QCPNON");
                QCPNOAL = rst.getLong("QCPNOAL");
                VCPNUSD = rst.getDouble("VCPNUSD");
                VCPNLOC = rst.getDouble("VCPNLOC");
                VCPN = rst.getDouble("VCPN");
            }
            rst.close();

            if (cs.getMoreResults()) {
                rst = cs.getResultSet();
                while (rst.next()) {
                    beanCons = new A1691Filter();
                    if (filter.strFCLOFO.equals("")) {
                        beanCons.NFLIGHT = rst.getString("NFLIGHT").trim();
                    }

                    beanCons.DFLIGHT = rst.getString("DFLIGHT").trim();
                    beanCons.strFormatDate = Functions.getMonthConvert(beanCons.DFLIGHT);
                    beanCons.QCPAD = rst.getLong("PEND");
                    beanCons.QCPNOAL = rst.getLong("QCPNOAL");
                    beanCons.QCPNON = rst.getLong("QCPNON");
                    beanCons.QCPNTOT = rst.getLong("QCPNTOT");
                    beanCons.QCPNVAL = rst.getLong("QCPNVAL");//CPN Valorizados
                    beanCons.lngQDIFF = beanCons.QCPNTOT - beanCons.QCPNVAL;//CPN No Valorizados
                    beanCons.QCPCON = rst.getLong("QCPCON");//CPN Contabilizados
                    beanCons.A1791ORAV = (beanCons.QCPNTOT > 0) ? (beanCons.QCPCON * 100) / beanCons.QCPNTOT : 0;
                    beanCons.VCPNLOC = rst.getDouble("VCPNLOC");
                    beanCons.VCPNUSD = rst.getDouble("VCPNUSD");
                    beanCons.VCPN = rst.getDouble("VCPN");
                    beanCons.strSQL = filter.strSQL;

                    beanCons.totQCPNTOT = QCPNTOT;
                    beanCons.totQCPNVAL = QCPNVAL;
                    beanCons.totDiff = NVAL;//NO VALORADOS
                    beanCons.totQCPCON = QCPCON;//contabilizados
                    beanCons.totQCPINF = PEND;//Pendientes
                    beanCons.totQCPNVC = QCPNON;//AM
                    beanCons.totQCPNOCR = QCPNOAL;//OAL
                    beanCons.totVCPNLOC = VCPNLOC;
                    beanCons.totVCPNUSD = VCPNUSD;
                    beanCons.totVCPN = VCPN;

                    beanCons.page.PAGNUM = filter.page.PAGNUM;
                    beanCons.page.PAGROW = filter.page.PAGROW;
                    beanCons.page.TOTPAG = filter.page.TOTPAG;
                    beanCons.page.TOTROW = filter.page.TOTROW;

                    lstCons.add(beanCons);
                }

            }
        } finally {
            setClose();
        }

        return lstCons;
    }
    
    public List<A1691Filter> loadPX072SQP00313(A1691Filter filter) throws SQLException, Exception {

        //Para traer data del Programa de Query del Manifiesto de Vuelo
        List<A1691Filter> lstCons = new ArrayList<>(0);
        A1691Filter beanCons;

        long QCPNVC = 0, QCPCON = 0, QCPNON = 0, QCPNVAL = 0, QCPNOAL = 0, QCPNTOT = 0, QCPNOD = 0, QCPNCON = 0, lngQDIFF = 0, QCPNLEG = 0, TOTCON = 0;
        double TOTUSD = 0, TOTMXN = 0;

        // <editor-fold defaultstate="collapsed" desc=" 'DATE' ">
        filter.yearFrom = Functions.fillZeros(4, filter.yearFrom).replace("00", "");//YYYY
        filter.monthFrom = Functions.fillZeros(2, filter.monthFrom).replace("00", "");//MM
        filter.dayFrom = Functions.fillZeros(2, filter.dayFrom).replace("00", "");//DD
        filter.dayTo = Functions.fillZeros(2, filter.dayTo).replace("00", "");//DD
        //</editor-fold>

        if (filter.strFormatDate2.trim().equals("")) {
            filter.strFormatDate2 = "DFLIGHT";
        }

        strSQL = "{CALL " + session.getMainLibrary() + ".SQP00313(?,?,?,?,?,?,?,?)}";
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(strSQL);

            cs.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cs.setString(2, filter.strFormatDate2.trim());
            cs.setString(3, filter.yearFrom.trim());
            cs.setString(4, filter.monthFrom.trim());
            cs.setString(5, filter.dayFrom.trim());
            cs.setString(6, filter.dayTo.trim());
            cs.setString(7, filter.strSQL.trim());
            cs.setString(8, filter.strTitulo.trim());
            cs.execute();

            rst = cs.getResultSet();
            while (rst.next()) {
                QCPNOAL += rst.getLong("QCPNOAL");
                QCPNON += rst.getLong("QCPNON");
                QCPNTOT += rst.getLong("QCPNTOT");
                QCPNVAL += rst.getLong("QCPNVAL");//CPN Valorizados
                QCPCON += rst.getLong("QCPCON");//CPN Contabilizados
                QCPNCON += rst.getLong("QCPNTOT") - rst.getLong("QCPCON");//CPN No Contabilizados
                lngQDIFF += rst.getLong("QCPNTOT") - rst.getLong("QCPNVAL");//CPN No Valorizados
                TOTUSD += rst.getDouble("AMTUSD");
                TOTMXN += rst.getDouble("AMTMXN");
                TOTCON += rst.getLong("TOTCON");
            }
            rst.close();

            if (cs.getMoreResults()) {
                rst = cs.getResultSet();
                while (rst.next()) {

                    if (rst.getLong("QCPNTOT") > 0) {

                        beanCons = new A1691Filter();
                        beanCons.strFormatDate2 = filter.strFormatDate2;
                        beanCons.CARRI = filter.CARRI;
                        beanCons.yearFrom = filter.yearFrom;
                        beanCons.monthFrom = filter.monthFrom;
                        beanCons.dayFrom = filter.dayFrom;
                        beanCons.dayTo = filter.dayTo;
                        beanCons.strSQL = filter.strSQL;
                        beanCons.strTitulo = filter.strTitulo;
                        /*if (filter.dayFrom.equals(filter.dayTo)) {
                         beanCons.strFormatDate = filter.yearFrom + filter.monthFrom + filter.dayFrom;
                         } else {
                         beanCons.strFormatDate = filter.yearFrom + filter.monthFrom + filter.dayFrom + " - " + filter.yearFrom + filter.monthFrom + filter.dayTo;
                         }*/
                        beanCons.strFormatDate = rst.getString("DATE").trim();
                        //beanCons.QCPNOD = rst.getLong("QCPNOD");
                        //beanCons.QCPNVC = rst.getLong("QCPNVC");
                        beanCons.QCPNOAL = rst.getLong("QCPNOAL");
                        beanCons.QCPNON = rst.getLong("QCPNON");
                        beanCons.QCPNTOT = rst.getLong("QCPNTOT");
                        beanCons.QCPNVAL = rst.getLong("QCPNVAL");//CPN Valorizados
                        beanCons.QCPCON = rst.getLong("QCPCON");//CPN Contabilizados
                        beanCons.QCPNCON = rst.getLong("QCPNTOT") - rst.getLong("QCPCON");//CPN No Contabilizados
                        beanCons.VCPNUSD = rst.getDouble("AMTUSD");
                        beanCons.VCPNLOC = rst.getDouble("AMTMXN");
                        beanCons.QCPNOCR = rst.getLong("TOTCON");//Cupones A1716 Pre Accounting
                        if (beanCons.QCPCON - beanCons.QCPNOCR != 0) {
                            beanCons.strDescFFLOW = "0xFF0000";
                        }

                        beanCons.A1791ORAV = (beanCons.QCPNTOT > 0) ? (beanCons.QCPCON * 100) / beanCons.QCPNTOT : 0;
                        beanCons.lngQDIFF = beanCons.QCPNTOT - beanCons.QCPNVAL;//CPN No Valorizados

                        beanCons.totQCPNOAL = QCPNOAL;
                        beanCons.totQCPNON = QCPNON;
                        beanCons.totQCPNTOT = QCPNTOT;
                        beanCons.totQCPNVAL = QCPNVAL;//CPN Valorizados
                        beanCons.totQCPCON = QCPCON;//CPN Contabilizados
                        beanCons.totQCPNCON = QCPNCON;//CPN No Contabilizados
                        beanCons.totlngQDIFF = lngQDIFF;
                        beanCons.totVCPNUSD = TOTUSD;
                        beanCons.totVCPNLOC = TOTMXN;
                        beanCons.totQCPNOCR = TOTCON;//Cupones A1716 Pre Accounting
                        //beanCons.QCPNLEG = rst.getLong("QTY92");

                        lstCons.add(beanCons);
                    }
                }
            }
        } finally {
            setClose();
        }

        return lstCons;
    }
    
    public List<A1692Filter> loadSQP00212(A1691Filter filter, HashMap<String, String> hmPaises) throws SQLException, Exception {

        List<A1692Filter> lstCons = new ArrayList<>(0);
        A1692Filter beanTkt;
        HashMap hmEstado = new HashMap();
        hmEstado.put("0", "Hard Block");
        hmEstado.put("1", "Pending/Without Sale");
        hmEstado.put("2", "Valued");
        hmEstado.put("3", "Closed");
        int QTYPAX = 0;

        String cdepart = filter.CDEPART.trim();
        if (filter.strTitulo.equals("LEG")) {
            filter.CDEPART = "";
        }

        strSQL = "{CALL " + session.getMainLibrary() + ".SQP00212(?,?,?,?,?,?,?,?,?,?)}";
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(strSQL);

            cs.registerOutParameter(7, Types.INTEGER);
            cs.registerOutParameter(8, Types.INTEGER);
            cs.registerOutParameter(9, Types.INTEGER);
            cs.registerOutParameter(10, Types.INTEGER);

            cs.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cs.setString(2, filter.DFLIGHT.trim());
            cs.setString(3, filter.NFLIGHT.trim());
            cs.setString(4, filter.CDEPART.trim());
            cs.setString(5, filter.CARRIVA.trim());
            cs.setString(6, filter.strSQL.trim());

            cs.setInt(7, filter.page.PAGNUM);
            cs.setInt(8, filter.page.PAGROW);
            cs.setInt(9, filter.page.TOTPAG);
            cs.setInt(10, filter.page.TOTROW);
            cs.execute();

            filter.page.PAGNUM = cs.getInt(7);
            filter.page.PAGROW = cs.getInt(8);
            filter.page.TOTPAG = cs.getInt(9);
            filter.page.TOTROW = cs.getInt(10);

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
                    beanTkt.QTYPAX = rst.getInt("QTYPAX");
                    beanTkt.totTAX = QTYPAX;
                    beanTkt.strDescripcion = filter.strTitulo;
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
                    if (filter.strTitulo.equals("LEG") && !cdepart.equals(beanTkt.CDEPART.trim())) {
                        beanTkt.strSQL = "verde";
                    }
                    beanTkt.NFLIGHT = rst.getString("NFLIGHT").trim();
                    beanTkt.DFLIGHT = rst.getString("DFLIGHT").trim();
                    beanTkt.LEGSEQ = rst.getString("LEGSEQ").trim();
                    beanTkt.strFormatDate = beanTkt.DFLIGHT.substring(0, 4) + "-" + beanTkt.DFLIGHT.substring(4, 6) + "-" + beanTkt.DFLIGHT.substring(6);
                    beanTkt.FBASE = rst.getString("FBASE");
                    beanTkt.STVAL = rst.getString("STVAL");
                    if (hmEstado.containsKey(beanTkt.STVAL.trim())) {
                        beanTkt.strDescSTVAL = hmEstado.get(beanTkt.STVAL.trim()).toString();
                    }

                    beanTkt.FVAL = rst.getString("FVAL");

                    if (beanTkt.FVAL.equals("1")) {
                        beanTkt.strDescFVAL = "ISR Values/Sales";
                        beanTkt.VCPN = rst.getDouble("VCPN");
                    } else if (beanTkt.FVAL.equals("2")) {
                        beanTkt.strDescFVAL = "Average Value";
                        beanTkt.VCPN = rst.getDouble("VCPMX");
                    } else if (beanTkt.FVAL.equals("3")) {
                        beanTkt.strDescFVAL = "VTR";
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
    
    public List<A1692Filter> loadPX072SQP00317(A1691Filter filter, HashMap<String, String> hmPaises, String flag) throws SQLException, Exception {

        List<A1692Filter> lstCons = new ArrayList<>(0);
        A1692Filter beanTkt;
        HashMap hmEstado = new HashMap();
        hmEstado.put("0", "Hard Block");
        hmEstado.put("1", "Pending/Without Sale");
        hmEstado.put("2", "Valued");
        hmEstado.put("3", "Closed");
        long totPAX = 0;

        // <editor-fold defaultstate="collapsed" desc=" 'DATE' ">
        filter.yearFrom = Functions.fillZeros(4, filter.yearFrom).replace("00", "");//YYYY
        filter.monthFrom = Functions.fillZeros(2, filter.monthFrom).replace("00", "");//MM
        filter.dayFrom = Functions.fillZeros(2, filter.dayFrom).replace("00", "");//DD
        filter.dayTo = Functions.fillZeros(2, filter.dayTo).replace("00", "");//DD
        //</editor-fold>

        //EN EL AS400 ES SQP00317.
        //SE CREO SQP00317_1 PORQUE NO TENGO AUTORIZACION PARA BORRAR EL ORIGINAL
        String strSQL = "{CALL " + session.getMainLibrary() + ".SQP00317(?,?,?,?,?,?,?,?,?)}";
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(strSQL);

            cs.registerOutParameter(6, Types.INTEGER);
            cs.registerOutParameter(7, Types.INTEGER);
            cs.registerOutParameter(8, Types.INTEGER);
            cs.registerOutParameter(9, Types.INTEGER);

            cs.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cs.setString(2, filter.strFormatDate2.trim());
            cs.setString(3, filter.strFormatDate.trim());
            cs.setString(4, filter.strTitulo.trim());
            cs.setString(5, flag.trim());

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
                totPAX = rst.getLong("QTYPAX");
            }
            rst.close();

            if (cs.getMoreResults()) {
                rst = cs.getResultSet();

                while (rst.next()) {
                    beanTkt = new A1692Filter();
                    beanTkt.SEQ = flag.trim();
                    beanTkt.strFormatDate2 = filter.strFormatDate2;
                    beanTkt.strFormatDate = filter.strFormatDate;
                    beanTkt.strSQL = filter.strTitulo;

                    beanTkt.QTYPAX = rst.getInt("QTYPAX");
                    beanTkt.strDescripcion = filter.strTitulo;
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
                    beanTkt.strDescSTNEW = Functions.getMonthConvert(beanTkt.FCONT);
                    beanTkt.CDEPART = rst.getString("CDEPART").trim();
                    beanTkt.CARRIVA = rst.getString("CARRIVA").trim();

                    beanTkt.IDCON = rst.getString("IDCON").trim();
                    beanTkt.NFLIGHT = rst.getString("NFLIGHT").trim();
                    beanTkt.DFLIGHT = rst.getString("DFLIGHT").trim();
                    beanTkt.LEGSEQ = rst.getString("LEGSEQ").trim();
                    beanTkt.strFuente = beanTkt.DFLIGHT.substring(0, 4) + "-" + beanTkt.DFLIGHT.substring(4, 6) + "-" + beanTkt.DFLIGHT.substring(6);
                    beanTkt.FBASE = rst.getString("FBASE");
                    beanTkt.STVAL = rst.getString("STVAL");
                    if (hmEstado.containsKey(beanTkt.STVAL.trim())) {
                        beanTkt.strDescSTVAL = hmEstado.get(beanTkt.STVAL.trim()).toString();
                    }

                    beanTkt.FVAL = rst.getString("FVAL");

                    if (beanTkt.FVAL.equals("1")) {
                        beanTkt.strDescFVAL = "ISR Values/Sales";
                        beanTkt.VCPN = rst.getDouble("VCPN");
                    } else if (beanTkt.FVAL.equals("2")) {
                        beanTkt.strDescFVAL = "Average Value";
                        beanTkt.VCPN = rst.getDouble("VCPMX");
                    } else if (beanTkt.FVAL.equals("3")) {
                        beanTkt.strDescFVAL = "VTR";
                        beanTkt.VCPN = rst.getDouble("VCPN");
                    }

                    beanTkt.STCON = rst.getString("STCON");

                    if (beanTkt.STCON.equals("1")) {
                        beanTkt.strDescSTCON = "Contabilizado.";
                    } else if (beanTkt.STCON.equals("2")) {
                        beanTkt.strDescSTCON = "Contabilizado Provisión.";
                    } else if (beanTkt.STCON.equals("3")) {
                        beanTkt.strDescSTCON = "Extorno.";
                    } else if (beanTkt.STCON.equals("4")) {
                        beanTkt.strDescSTCON = "Extorno contabilizado.";
                    } else if (beanTkt.STCON.equals("5")) {
                        beanTkt.strDescSTCON = "VTR.";
                    } else if (beanTkt.STCON.equals("6")) {
                        beanTkt.strDescSTCON = "GL 5D.";
                    }

                    beanTkt.PSVVTA = rst.getString("PSVVTA").trim();
                    if (hmPaises.containsKey(rst.getString("PSVVTA").trim().toUpperCase())) {
                        beanTkt.strDescPSVVTA = hmPaises.get(rst.getString("PSVVTA").trim()).toString();
                    }
                    beanTkt.FVTA = rst.getString("FVTA").trim();
                    beanTkt.strFormatFVTA = Functions.getMonthConvert(beanTkt.FVTA);
                    beanTkt.TOPUS = rst.getString("TOPUS").trim();
                    beanTkt.CARR = rst.getString("CARR").trim();
                    beanTkt.CLAS = rst.getString("CLAS").trim();

                    beanTkt.COMISI = rst.getDouble("COMISI");
                    beanTkt.MDACP = rst.getString("MDACP").trim();
                    beanTkt.VCPMX = rst.getDouble("VCPMX");
                    beanTkt.TCMUS = rst.getDouble("TCMUS");
                    beanTkt.VCPUS = rst.getDouble("VCPUS");
                    beanTkt.A1437RATE = rst.getDouble("A729TAXRES");
                    if (rst.getString("FILENAME") != null
                            && !rst.getString("FILENAME").trim().equals("-")) {
                        beanTkt.FILENAME = rst.getString("FILENAME").trim();
                    }
                    beanTkt.totCPN_Proc = totPAX;

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
    
    public List<A1691Filter> loadPX072SQP00692(A1691Filter filter) throws SQLException, Exception {

        //Para traer data del Programa de Query del Manifiesto de Vuelo
        List<A1691Filter> lstCons = new ArrayList<>(0);
        A1691Filter beanCons;

        long QCPCON = 0, QCPNON = 0, QCPNVAL = 0, QCPNOAL = 0, QCPNTOT = 0, QCPNCON = 0, lngQDIFF = 0;

        String strSQL = "{CALL " + session.getMainLibrary() + ".SQP00692(?,?,?,?)}";
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(strSQL);

            cs.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cs.setString(2, filter.strFormatDate.trim());
            cs.setString(3, filter.strSQL.trim());
            cs.setString(4, filter.strTitulo.trim());
            cs.execute();

            rst = cs.getResultSet();
            while (rst.next()) {
                QCPNOAL = rst.getLong("QCPNOALR");
                QCPNON = rst.getLong("QCPNONR");
                QCPNTOT = rst.getLong("QCPNTOTR");
                QCPNVAL = rst.getLong("QCPNVALR");//CPN Valorizados
                QCPCON = rst.getLong("QCPCONR");//CPN Contabilizados
                QCPNCON = rst.getLong("QCPNTOTR") - rst.getLong("QCPCONR");//CPN No Contabilizados
                lngQDIFF = rst.getLong("QCPNTOTR") - rst.getLong("QCPNVALR");//CPN No Valorizados
            }
            rst.close();

            if (cs.getMoreResults()) {
                rst = cs.getResultSet();
                while (rst.next()) {

                    if (rst.getLong("QCPNTOT") > 0) {

                        beanCons = new A1691Filter();
                        beanCons.strFormatDate2 = filter.strFormatDate;
                        beanCons.CARRI = filter.CARRI;
                        beanCons.yearFrom = filter.yearFrom;
                        beanCons.monthFrom = filter.monthFrom;
                        beanCons.dayFrom = filter.dayFrom;
                        beanCons.dayTo = filter.dayTo;
                        beanCons.strSQL = filter.strSQL;
                        beanCons.strTitulo = filter.strTitulo;
                        beanCons.strFormatDate = rst.getString("DATE").trim();
                        beanCons.QCPNOAL = rst.getLong("QCPNOAL");
                        beanCons.QCPNON = rst.getLong("QCPNON");
                        beanCons.QCPNTOT = rst.getLong("QCPNTOT");
                        beanCons.QCPNVAL = rst.getLong("QCPNVAL");//CPN Valorizados
                        beanCons.QCPCON = rst.getLong("QCPCON");//CPN Contabilizados
                        beanCons.QCPNCON = rst.getLong("QCPNTOT") - rst.getLong("QCPCON");//CPN No Contabilizados

                        beanCons.A1791ORAV = (beanCons.QCPNTOT > 0) ? (beanCons.QCPCON * 100) / beanCons.QCPNTOT : 0;
                        beanCons.lngQDIFF = beanCons.QCPNTOT - beanCons.QCPNVAL;//CPN No Valorizados

                        beanCons.totQCPNOAL = QCPNOAL;
                        beanCons.totQCPNON = QCPNON;
                        beanCons.totQCPNTOT = QCPNTOT;
                        beanCons.totQCPNVAL = QCPNVAL;//CPN Valorizados
                        beanCons.totQCPCON = QCPCON;//CPN Contabilizados
                        beanCons.totQCPNCON = QCPNCON;//CPN No Contabilizados
                        beanCons.totlngQDIFF = lngQDIFF;

                        lstCons.add(beanCons);
                    }
                }
            }
        } finally {
            setClose();
        }

        return lstCons;
    }
    
    public List<A1692Filter> loadPX072SQP00693(A1691Filter filter, HashMap<String, String> hmPaises, String flag) throws SQLException, Exception {

        List<A1692Filter> lstCons = new ArrayList<>(0);
        A1692Filter beanTkt;
        HashMap hmEstado = new HashMap();
        hmEstado.put("0", "Hard Block");
        hmEstado.put("1", "Pending/Without Sale");
        hmEstado.put("2", "Valued");
        hmEstado.put("3", "Closed");
        long totPAX = 0;

        strSQL = "{CALL " + session.getMainLibrary() + ".SQP00693(?,?,?,?,?,?,?,?,?)}";
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(strSQL);

            cs.registerOutParameter(6, Types.INTEGER);
            cs.registerOutParameter(7, Types.INTEGER);
            cs.registerOutParameter(8, Types.INTEGER);
            cs.registerOutParameter(9, Types.INTEGER);

            cs.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cs.setString(2, filter.strFormatDate2.trim());
            cs.setString(3, filter.strFormatDate.trim());
            cs.setString(4, flag.trim());
            cs.setString(5, filter.strTitulo.trim());

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
                totPAX = rst.getLong("QTYPAX");
            }
            rst.close();

            if (cs.getMoreResults()) {
                rst = cs.getResultSet();

                while (rst.next()) {
                    beanTkt = new A1692Filter();
                    beanTkt.SEQ = flag.trim();
                    beanTkt.strFormatDate2 = filter.strFormatDate2;
                    beanTkt.strFormatDate = filter.strFormatDate;
                    beanTkt.strSQL = filter.strTitulo;

                    beanTkt.QTYPAX = rst.getInt("QTYPAX");
                    beanTkt.strDescripcion = filter.strTitulo;
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
                    beanTkt.strDescSTNEW = Functions.getMonthConvert(beanTkt.FCONT);
                    beanTkt.CDEPART = rst.getString("CDEPART").trim();
                    beanTkt.CARRIVA = rst.getString("CARRIVA").trim();

                    beanTkt.IDCON = rst.getString("IDCON").trim();
                    beanTkt.NFLIGHT = rst.getString("NFLIGHT").trim();
                    beanTkt.DFLIGHT = rst.getString("DFLIGHT").trim();
                    beanTkt.LEGSEQ = rst.getString("LEGSEQ").trim();
                    beanTkt.strFuente = beanTkt.DFLIGHT.substring(0, 4) + "-" + beanTkt.DFLIGHT.substring(4, 6) + "-" + beanTkt.DFLIGHT.substring(6);
                    beanTkt.FBASE = rst.getString("FBASE");
                    beanTkt.STVAL = rst.getString("STVAL");
                    if (hmEstado.containsKey(beanTkt.STVAL.trim())) {
                        beanTkt.strDescSTVAL = hmEstado.get(beanTkt.STVAL.trim()).toString();
                    }

                    beanTkt.FVAL = rst.getString("FVAL");

                    if (beanTkt.FVAL.equals("1")) {
                        beanTkt.strDescFVAL = "ISR Values/Sales";
                        beanTkt.VCPN = rst.getDouble("VCPN");
                    } else if (beanTkt.FVAL.equals("2")) {
                        beanTkt.strDescFVAL = "Average Value";
                        beanTkt.VCPN = rst.getDouble("VCPMX");
                    } else if (beanTkt.FVAL.equals("3")) {
                        beanTkt.strDescFVAL = "VTR";
                        beanTkt.VCPN = rst.getDouble("VCPN");
                    }

                    beanTkt.STCON = rst.getString("STCON");

                    if (beanTkt.STCON.equals("1")) {
                        beanTkt.strDescSTCON = "Contabilizado.";
                    } else if (beanTkt.STCON.equals("2")) {
                        beanTkt.strDescSTCON = "Contabilizado Provisión.";
                    } else if (beanTkt.STCON.equals("3")) {
                        beanTkt.strDescSTCON = "Extorno.";
                    } else if (beanTkt.STCON.equals("4")) {
                        beanTkt.strDescSTCON = "Extorno contabilizado.";
                    } else if (beanTkt.STCON.equals("5")) {
                        beanTkt.strDescSTCON = "VTR.";
                    } else if (beanTkt.STCON.equals("6")) {
                        beanTkt.strDescSTCON = "GL 5D.";
                    }

                    beanTkt.PSVVTA = rst.getString("PSVVTA").trim();
                    if (hmPaises.containsKey(rst.getString("PSVVTA").trim().toUpperCase())) {
                        beanTkt.strDescPSVVTA = hmPaises.get(rst.getString("PSVVTA").trim()).toString();
                    }
                    beanTkt.FVTA = rst.getString("FVTA").trim();
                    beanTkt.strFormatFVTA = Functions.getMonthConvert(beanTkt.FVTA);
                    beanTkt.TOPUS = rst.getString("TOPUS").trim();
                    beanTkt.CARR = rst.getString("CARR").trim();
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
                    beanTkt.totCPN_Proc = totPAX;

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
    
    public List<A1691Filter> loadPX072S08A1691(A1691Filter filter) throws SQLException, Exception {

        //Para traer data del Programa de Query del Manifiesto de Vuelo
        List<A1691Filter> lstCons = new ArrayList<>(0);
        A1691Filter beanCons;

        String fecAnterior = Functions.restXDaystoDate(Functions.getFechaActual(), 1);
        filter.yearFrom = fecAnterior.substring(0, 4);//YYYY
        filter.monthFrom = fecAnterior.substring(4, 6);//MM
        filter.dayFrom = fecAnterior.substring(6);//DD
        filter.dayTo = fecAnterior.substring(6);

        //System.out.println(filter.strSQL.trim());
        strSQL = "{CALL " + session.getMainLibrary() + ".SQP00211(?,?,?,?,?,?)}";
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(strSQL);

            cs.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cs.setString(2, filter.yearFrom.trim());
            cs.setString(3, filter.monthFrom.trim());
            cs.setString(4, filter.dayFrom.trim());
            cs.setString(5, filter.dayTo.trim());
            cs.setString(6, filter.strSQL.trim());
            cs.execute();

            rst = cs.getResultSet();
            while (rst.next()) {
                beanCons = new A1691Filter();
                beanCons.DFLIGHT = rst.getString("DFLIGHT").trim();
                //beanCons.NFLIGHT = rst.getString("NFLIGHT").trim();
                //beanCons.CARRI = rst.getString("CARRI").trim();
                beanCons.CDEPART = rst.getString("CDEPART").trim();
                lstCons.add(beanCons);
            }
        } finally {
            setClose();
        }

        return lstCons;
    }
    
    public List<A1692Filter> loadPX072S02A1692(A1691Filter filter, HashMap<String, String> hmPaises) throws SQLException, Exception {

        List<A1692Filter> lstTkts = new ArrayList<>(0);
        A1692Filter beanTkt;
        String strDesc = "";
        double USD = 0, MXN = 0;
        int QTYPAX = 0;

        strSQL = "{CALL " + session.getMainLibrary() + ".PX072S02A1692(?,?,?,?,?,?,?,?)}";
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(strSQL);

            cs.registerOutParameter(5, Types.INTEGER);
            cs.registerOutParameter(6, Types.INTEGER);
            cs.registerOutParameter(7, Types.INTEGER);
            cs.registerOutParameter(8, Types.INTEGER);

            cs.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cs.setString(2, filter.DFLIGHT);
            cs.setString(3, filter.NFLIGHT);
            cs.setString(4, filter.strFCLOFO);

            cs.setInt(5, filter.page.PAGNUM);
            cs.setInt(6, filter.page.PAGROW);
            cs.setInt(7, filter.page.TOTPAG);
            cs.setInt(8, filter.page.TOTROW);
            cs.execute();

            filter.page.PAGNUM = cs.getInt(5);
            filter.page.PAGROW = cs.getInt(6);
            filter.page.TOTPAG = cs.getInt(7);
            filter.page.TOTROW = cs.getInt(8);

            rst = cs.getResultSet();

            rst = cs.getResultSet();
            while (rst.next()) {
                USD = rst.getDouble("USD");
                MXN = rst.getDouble("MXN");
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
                    beanTkt.CARR = filter.CARRI;
                    beanTkt.strDescripcion = strDesc;
                    beanTkt.CCIA = rst.getString("CCIA").trim();
                    beanTkt.FORMA = rst.getString("FORMA").trim();
                    beanTkt.SERIE = rst.getString("SERIE").trim();
                    beanTkt.CUPON = rst.getString("CUPON").trim();
                    beanTkt.strTicket = rst.getString("CCIA").trim() + " " + rst.getString("FORMA").trim() + rst.getString("SERIE").trim() + " " + rst.getString("CUPON").trim();
                    beanTkt.DFLIGHT = rst.getString("DFLIGHT");
                    beanTkt.strFormatDate = Functions.getMonthConvert(beanTkt.DFLIGHT);
                    beanTkt.NFLIGHT = rst.getString("NFLIGHT");
                    beanTkt.CARR = rst.getString("CARR");
                    beanTkt.CDEPART = rst.getString("CDEPART");
                    if (hmPaises.containsKey(rst.getString("CDEPART").trim().toUpperCase())) {
                        beanTkt.strDescCDEPART = hmPaises.get(rst.getString("CDEPART").trim()).toString();
                    }
                    beanTkt.CARRIVA = rst.getString("CARRIVA");
                    if (hmPaises.containsKey(rst.getString("CARRIVA").trim().toUpperCase())) {
                        beanTkt.strDescCARRIVA = hmPaises.get(rst.getString("CARRIVA").trim()).toString();
                    }

                    beanTkt.FBASE = rst.getString("FBASE");
                    beanTkt.CLAS = rst.getString("CLAS");
                    beanTkt.CABI = rst.getString("CABI");
                    //beanTkt.MDACP = rst.getString("MDACP");
                    beanTkt.VCPMX = rst.getDouble("MXN");
                    beanTkt.VCPUS = rst.getDouble("USD");
                    //beanTkt.VCPN = rst.getDouble("VCPN");

                    beanTkt.FVAL = rst.getString("FVAL");

                    if (beanTkt.FVAL.equals("1")) {
                        beanTkt.strDescFVAL = "ISR Values/Sales";
                    } else if (beanTkt.FVAL.equals("2")) {
                        beanTkt.strDescFVAL = "Average Value";
                    } else if (beanTkt.FVAL.equals("3")) {
                        beanTkt.strDescFVAL = "VTR";
                    }
                    beanTkt.IDCON = rst.getString("IDCON");
                    beanTkt.STCON = rst.getString("STCON");

                    if (beanTkt.STCON.equals("1")) {
                        beanTkt.strDescripcion = "Contabilizado.";
                    } else if (beanTkt.STCON.equals("2")) {
                        beanTkt.strDescripcion = "Contabilizado Provisión.";
                    } else if (beanTkt.STCON.equals("3")) {
                        beanTkt.strDescripcion = "Extorno.";
                    } else if (beanTkt.STCON.equals("4")) {
                        beanTkt.strDescripcion = "Extorno contabilizado.";
                    } else if (beanTkt.STCON.equals("5")) {
                        beanTkt.strDescripcion = "VTR.";
                    } else if (beanTkt.STCON.equals("6")) {
                        beanTkt.strDescripcion = "GL 5D.";
                    }

                    beanTkt.QTYPAX = rst.getInt("QTYPAX");

                    beanTkt.totTAX = QTYPAX;
                    beanTkt.totVCPUS = USD; //total USD
                    beanTkt.totVCPMX = MXN;  //total MXN

                    beanTkt.page.PAGNUM = filter.page.PAGNUM;
                    beanTkt.page.PAGROW = filter.page.PAGROW;
                    beanTkt.page.TOTPAG = filter.page.TOTPAG;
                    beanTkt.page.TOTROW = filter.page.TOTROW;

                    lstTkts.add(beanTkt);
                }

            }
        } finally {
            setClose();
        }

        return lstTkts;
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
