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
import net.miatech.beans.spring.UserView;

import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.dao.master.MasterDAO;
import net.miatech.praxis.flown.A1708;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author lmendoza
 */
public class ZoneMasterFileDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public ZoneMasterFileDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public ZoneMasterFileDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List loadFlownZone(A1708 filter, UserView user) throws Exception, SQLException {

        CallableStatement cs = null;
        ResultSet rst = null;
        String strSQL;
        A1708 bean;
        HashMap hm = new HashMap();
        hm.put("ASI", "ASIA");
        hm.put("CAN", "CANADA");
        hm.put("CAR", "CARIBE");
        hm.put("CAM", "CENTROAMERICA");
        hm.put("USA", "ESTADOS UNIDOS");
        hm.put("EUR", "EUROPA");
        hm.put("FRO", "FRONTERA");
        hm.put("LOC", "LOCAL");
        hm.put("PLA", "PLAYA");
        hm.put("SUD", "SUDAMERICA");
        hm.put("OCE", "OCEANIA");
        hm.put("AFR", "AFRICA");
        hm.put("TJX", "FRONTERA XPRESS");

        List<A1708> listaData = new ArrayList();

        Connection cnx = null;

        try {
            strSQL = "{CALL " + session.getMainLibrary() + ".SQP02360(?,?,?,?,?,?,?,?)}";

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(strSQL);

            cs.registerOutParameter(5, Types.INTEGER);
            cs.registerOutParameter(6, Types.INTEGER);
            cs.registerOutParameter(7, Types.INTEGER);
            cs.registerOutParameter(8, Types.INTEGER);

            cs.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cs.setString(2, filter.TREG.trim());
            cs.setString(3, filter.ATOS.trim());
            cs.setString(4, filter.strValor.trim());

            cs.setInt(5, filter.page.PAGNUM);
            cs.setInt(6, filter.page.PAGROW);
            cs.setInt(7, filter.page.TOTPAG);
            cs.setInt(8, filter.page.TOTROW);
            cs.execute();

            filter.page.PAGNUM = cs.getInt(5);//1
            filter.page.PAGROW = cs.getInt(6);//20
            filter.page.TOTPAG = cs.getInt(7);//17
            filter.page.TOTROW = cs.getInt(8);//340

            rst = cs.getResultSet();

            while (rst.next()) {

                bean = new A1708();

                if (hm.containsKey(rst.getString("ZONA").trim().toUpperCase())) {
                    bean.strZONA = hm.get(rst.getString("ZONA").trim()).toString();
                }
                bean.pos = rst.getLong("RN");
                bean.CCUST = rst.getString("CCUST");
                bean.TREG = rst.getString("TREG");
                bean.ATOS = rst.getString("ATOS");
                bean.strAeropuerto = rst.getString("DESC_ATOS");
                bean.ZONA = rst.getString("ZONA");
                bean.USCR = rst.getString("USCR");
                bean.FECR = rst.getString("FECR");
                bean.HOCR = Functions.ConvertedTime(rst.getString("HOCR"));
                bean.USUP = rst.getString("USUP");
                bean.FEUP = rst.getString("FEUP");
                bean.HOUP = Functions.ConvertedTime(rst.getString("HOUP"));
                //Paginación ===================================================
                bean.page.PAGNUM = filter.page.PAGNUM;
                bean.page.PAGROW = filter.page.PAGROW;
                bean.page.TOTPAG = filter.page.TOTPAG;
                bean.page.TOTROW = filter.page.TOTROW;

                listaData.add(bean);
            }

            try {
                rst.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
            try {
                cs.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

        } catch (Exception e) {
        } finally {
            if (rst != null) {
                try {
                    rst.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            if (cs != null) {
                try {
                    cs.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            //===============
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
        return listaData;
    }

    public List loadFlownZone2(A1708 filter, UserView user) throws Exception, SQLException {

        MasterDAO masterDAO = new MasterDAO();
        masterDAO.setSession(session);
        HashMap<String, String> hmAeropuertos = masterDAO.loadCiudadesHash();
        HashMap<String, String> hmZona = masterDAO.loadZonasHash();
        HashMap<String, String> hmZona2 = masterDAO.loadZonasHash6();

        CallableStatement cs = null;
        ResultSet rst = null;
        String strSQL;
        A1708 bean = new A1708();
        List<A1708> listaData = new ArrayList();
        HashMap hm = new HashMap();
        hm.put("ASI", "ASIA");
        hm.put("CAN", "CANADA");
        hm.put("CAR", "CARIBE");
        hm.put("CAM", "CENTROAMERICA");
        hm.put("USA", "ESTADOS UNIDOS");
        hm.put("EUR", "EUROPA");
        hm.put("FRO", "FRONTERA");
        hm.put("LOC", "LOCAL");
        hm.put("PLA", "PLAYA");
        hm.put("SUD", "SUDAMERICA");
        hm.put("OCE", "OCEANIA");
        hm.put("AFR", "AFRICA");
        hm.put("TJX", "FRONTERA XPRESS");
        Connection cnx = null;

        try {
            strSQL = "{CALL " + session.getMainLibrary() + ".PX037S01PXA1708(?,?,?,?,?,?,?,?,?)}";

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(strSQL);

            cs.registerOutParameter(6, Types.INTEGER);
            cs.registerOutParameter(7, Types.INTEGER);
            cs.registerOutParameter(8, Types.INTEGER);
            cs.registerOutParameter(9, Types.INTEGER);

            cs.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cs.setString(2, filter.TREG.trim());
            cs.setString(3, filter.ATOS.trim());
            cs.setString(4, filter.ciudaOri.trim());
            cs.setString(5, filter.ciudaDes.trim());
            cs.setInt(6, filter.page.PAGNUM);
            cs.setInt(7, filter.page.PAGROW);
            cs.setInt(8, filter.page.TOTPAG);
            cs.setInt(9, filter.page.TOTROW);
            cs.execute();

            filter.page.PAGNUM = cs.getInt(6);//1
            filter.page.PAGROW = 1;//20
            filter.page.TOTPAG = cs.getInt(8);//17
            filter.page.TOTROW = cs.getInt(9);//340

            rst = cs.getResultSet();
            boolean aux = false;
            int cont = 0;
            while (rst.next()) {
                cont++;
                bean.pos = rst.getLong("RN");
                bean.CCUST = rst.getString("CCUST");
                bean.TREG = rst.getString("TREG");
                bean.ATOS = rst.getString("ATOS");
                bean.ciudaOri = filter.ciudaOri;
                bean.ciudaDes = filter.ciudaDes;
                if (hmAeropuertos.containsKey(filter.ciudaOri)) {
                    bean.strCiudadOri = hmAeropuertos.get(filter.ciudaOri).toString();
                }
                if (hmAeropuertos.containsKey(filter.ciudaDes)) {
                    bean.strCiudaDes = hmAeropuertos.get(filter.ciudaDes).toString();
                }
                if (hmZona.containsKey(filter.ciudaOri)) {
                    bean.zonaCiudadOri = hmZona.get(filter.ciudaOri).toString();
                }
                if (hmZona.containsKey(filter.ciudaDes)) {
                    bean.zonaCiudaDes = hmZona.get(filter.ciudaDes).toString();
                }
                if (hm.containsKey(bean.zonaCiudadOri)) {
                    bean.strzonaCiudadOri = hm.get(bean.zonaCiudadOri).toString();
                }
                if (hm.containsKey(bean.zonaCiudaDes)) {
                    bean.strzonaCiudaDes = hm.get(bean.zonaCiudaDes).toString();
                }
                bean.zonaRe = bean.zonaCiudadOri + bean.zonaCiudaDes;
                if (hmZona2.containsKey(bean.zonaRe)) {
                    bean.strzonaRe = hmZona2.get(bean.zonaRe).toString();
                }

                bean.strAeropuerto = rst.getString("DESC_ATOS");
                bean.ZONA = rst.getString("ZONA");
                bean.USCR = rst.getString("USCR");
                bean.FECR = rst.getString("FECR");
                bean.HOCR = Functions.ConvertedTime(rst.getString("HOCR"));
                bean.USUP = rst.getString("USUP");
                bean.FEUP = rst.getString("FEUP");
                bean.HOUP = Functions.ConvertedTime(rst.getString("HOUP"));
                //Paginación ===================================================
                bean.page.PAGNUM = filter.page.PAGNUM;
                bean.page.PAGROW = 1;
                bean.page.TOTPAG = filter.page.TOTPAG;
                bean.page.TOTROW = filter.page.TOTROW;
                aux = true;
            }
            if (aux) {
                listaData.add(bean);
            }

            try {
                rst.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
            try {
                cs.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

        } catch (Exception e) {
        } finally {
            if (rst != null) {
                try {
                    rst.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            if (cs != null) {
                try {
                    cs.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            //===============
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
        return listaData;
    }

    public List loadFlownZone3(A1708 filter, UserView user) throws SQLException, Exception {
        CallableStatement cs = null;
        ResultSet rst = null;
        String strSQL;
        A1708 bean;

        List<A1708> listaData = new ArrayList();
        HashMap hm = new HashMap();
        hm.put("ASI", "ASIA");
        hm.put("CAN", "CANADA");
        hm.put("CAR", "CARIBE");
        hm.put("CAM", "CENTROAMERICA");
        hm.put("USA", "ESTADOS UNIDOS");
        hm.put("EUR", "EUROPA");
        hm.put("FRO", "FRONTERA");
        hm.put("LOC", "LOCAL");
        hm.put("PLA", "PLAYA");
        hm.put("SUD", "SUDAMERICA");
        hm.put("OCE", "OCEANIA");
        hm.put("AFR", "AFRICA");
        hm.put("TJX", "FRONTERA XPRESS");
        Connection cnx = null;

        try {
            strSQL = "{CALL " + session.getMainLibrary() + ".SQP02361(?,?,?,?,?,?,?)}";

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(strSQL);

            cs.registerOutParameter(4, Types.INTEGER);
            cs.registerOutParameter(5, Types.INTEGER);
            cs.registerOutParameter(6, Types.INTEGER);
            cs.registerOutParameter(7, Types.INTEGER);

            cs.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cs.setString(2, filter.TREG.trim());
            cs.setString(3, filter.ZONA.trim());

            cs.setInt(4, filter.page.PAGNUM);
            cs.setInt(5, filter.page.PAGROW);
            cs.setInt(6, filter.page.TOTPAG);
            cs.setInt(7, filter.page.TOTROW);
            cs.execute();

            filter.page.PAGNUM = cs.getInt(4);//1
            filter.page.PAGROW = cs.getInt(5);//20
            filter.page.TOTPAG = cs.getInt(6);//17
            filter.page.TOTROW = cs.getInt(7);//340

            rst = cs.getResultSet();

            while (rst.next()) {

                bean = new A1708();

                if (hm.containsKey(rst.getString("ZONA").trim().toUpperCase())) {
                    bean.strZONA = hm.get(rst.getString("ZONA").trim()).toString();
                }

                if (hm.containsKey(rst.getString("ATOS").substring(0, 3).trim().toUpperCase())) {
                    bean.strzonaCiudadOri = hm.get(rst.getString("ATOS").substring(0, 3).trim()).toString();
                }
                if (hm.containsKey(rst.getString("ATOS").substring(3, 6).trim().toUpperCase())) {
                    bean.strzonaCiudaDes = hm.get(rst.getString("ATOS").substring(3, 6).trim()).toString();
                }
                bean.pos = rst.getLong("RN");

                bean.TREG = rst.getString("TREG");
                bean.ATOS = rst.getString("ATOS");

                bean.ZONA = rst.getString("ZONA");

                //Paginación ===================================================
                bean.page.PAGNUM = filter.page.PAGNUM;
                bean.page.PAGROW = filter.page.PAGROW;
                bean.page.TOTPAG = filter.page.TOTPAG;
                bean.page.TOTROW = filter.page.TOTROW;

                listaData.add(bean);
            }

            try {
                rst.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
            try {
                cs.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

        } catch (Exception e) {
        } finally {
            if (rst != null) {
                try {
                    rst.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            if (cs != null) {
                try {
                    cs.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            //===============
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
        return listaData;
    }

    public int maintanceFlownZone(A1708 filter, String strOption) throws Exception, SQLException {
        CallableStatement cs;
        String strSQL;
        int result = 0;

        Connection cnx = null;
        try {

            strSQL = "{CALL " + session.getMainLibrary() + ".PX037S02PXA1708(?,?,?,?,?,?,?,?)}";

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(strSQL);

            cs.setString(1, strOption);
            cs.setString(2, filter.CCUST);
            cs.setString(3, filter.TREG);
            cs.setString(4, filter.ATOS);
            cs.setString(5, filter.ZONA);
            cs.setString(6, session.getUserView().getUserInfo().USR);
            cs.setString(7, Functions.getFechaActual());
            cs.setString(8, Functions.getHoraActual());

            result = cs.executeUpdate();

            try {
                cs.close();
            } catch (SQLException e) {
                System.out.println(e.getMessage());
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
        } catch (Exception e) {
            String msg = e.getMessage();
            System.out.println(msg);

            if (msg.contains("dupli")) {
                result = 2;                 //Cuando ocurre una excepcion de clave duplicada
            } else {
                result = 1;                  //Cuando ocurreo otro tipo de excepcion
            }
        } finally {
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return result;
    }

}
