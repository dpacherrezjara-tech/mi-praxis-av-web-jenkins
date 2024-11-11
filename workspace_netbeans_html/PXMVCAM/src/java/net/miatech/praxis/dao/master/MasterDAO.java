package net.miatech.praxis.dao.master;

// <editor-fold defaultstate="collapsed" desc="import">
import static com.ibm.as400.data.PcmlMessageLog.logError;
//import static com.sun.corba.se.impl.activation.ServerMain.logError;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import net.miatech.beans.A1691Filter;
import net.miatech.beans.A2826Filter;
import net.miatech.beans.PX041S01INF001Filter;
import net.miatech.beans.spring.UserView;

import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.libmiatec.A006;
import net.miatech.libmiatec.A1007;
import net.miatech.libmiatec.A1248;
import net.miatech.praxis.A005;
import net.miatech.praxis.A051;
import net.miatech.praxis.flown.A2826;
import net.miatech.praxis.interline.filter.A1852Filter;
import net.miatech.praxis.payment.A2280;
import net.miatech.librfnd.filter.CPF031Filter;
import net.miatech.praxis.payment.A2287;
import net.miatech.praxis.payment.filter.A2280Filter;
import net.miatech.praxis.payment.filter.A2357Filter;
import net.miatech.praxis.spring.INF020;
import static net.miatech.utils.Functions.pasarGarbageCollector;
import net.miatech.utils.spring.Application;
import org.apache.log4j.Logger;
// </editor-fold>

/**
 *
 * @author lmendoza
 */
public class MasterDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private Statement stmt = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private Application application;

    private static final Logger logError = Logger.getLogger("errorLog");

    public MasterDAO() {
    }

    public MasterDAO(IServerSession ss) {
        this.session = ss;
        application = new Application(session.getPropertySession());
    }

    public void setSession(IServerSession ss) {
        this.session = ss;
    }
    
    public void setApp(Application application) {
        this.application = application;
    }

    public List<A1007> loadCiudades() throws SQLException {
        System.out.println(" MasterDAO - loadCiudades");
        List<A1007> lstRtn = new ArrayList<>(0);
        A1007 objRtn;
        objRtn = new A1007();
        objRtn.A1007CTATO = "";
        objRtn.A1007NOMBR = "All";
        lstRtn.add(objRtn);

        try {

            String strSQL = "SELECT A1007CTATO, A1007NOMBR, A1007CIUD, A1007NOMCD, A1007PAIS "
                    + "FROM PRAXIS.A1007 ORDER BY A1007CTATO ";

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            stmt = cnx.createStatement();
            rst = stmt.executeQuery(strSQL);

            while (rst.next()) {
                objRtn = new A1007();
                objRtn.A1007CTATO = rst.getString("A1007CTATO").trim();
                objRtn.A1007NOMBR = rst.getString("A1007CTATO").trim() + " - " + rst.getString("A1007NOMBR").trim();

                lstRtn.add(objRtn);
            }
            setClose();

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            setClose();
        }

        return lstRtn;

    }

    public List<A2826> loadZone() throws SQLException {

        System.out.println(" MasterDAO - loadZone");

        List<A2826> listaZona = new ArrayList<>();
        A2826 zona = new A2826();
        zona.CCIA = "";
        zona.ZONA = "All";
        listaZona.add(zona);

        try {

            String strSQL = "SELECT ZONA FROM PRAXIS.A2826 GROUP BY ZONA ORDER BY ZONA DESC";
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            stmt = cnx.createStatement();
            rst = stmt.executeQuery(strSQL);

            while (rst.next()) {
                zona = new A2826();
                zona.ZONA = rst.getString("ZONA").trim();
                zona.CCIA = rst.getString("ZONA").trim();
                listaZona.add(zona);
            }
            setClose();

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            setClose();
        }

        return listaZona;

    }

    public List<A1007> loadCiudades2() throws SQLException {
        System.out.println(" MasterDAO - loadCiudades2");
        List<A1007> lstRtn = new ArrayList<A1007>(0);
        A1007 objRtn;
        objRtn = new A1007();
        objRtn.A1007CTATO = "";
        objRtn.A1007NOMBR = "All";
        lstRtn.add(objRtn);

        try {

            String strSQL = "SELECT A1007CTATO, A1007NOMBR, A1007CIUD, A1007NOMCD, A1007PAIS "
                    + "FROM PRAXIS.A1007 ORDER BY A1007CTATO ";

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            stmt = cnx.createStatement();
            rst = stmt.executeQuery(strSQL);

            while (rst.next()) {
                objRtn = new A1007();
                objRtn.A1007CTATO = rst.getString("A1007CTATO").trim();
                objRtn.A1007NOMBR = rst.getString("A1007NOMBR").trim() + " - " + rst.getString("A1007CTATO").trim();

                lstRtn.add(objRtn);
            }
            setClose();

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            setClose();
        }

        return lstRtn;

    }

    public List<A1007> loadCiudades3() throws SQLException {
        System.out.println(" MasterDAO - loadCiudades3");
        List<A1007> lstRtn = new ArrayList<>(0);
        A1007 objRtn;

        try {

            String strSQL = "SELECT A1007CTATO, A1007NOMBR, A1007CIUD, A1007NOMCD, A1007PAIS "
                    + "FROM PRAXIS.A1007 ORDER BY A1007CTATO ";

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            stmt = cnx.createStatement();
            rst = stmt.executeQuery(strSQL);

            while (rst.next()) {
                objRtn = new A1007();
                objRtn.A1007CTATO = rst.getString("A1007CTATO").trim();
                objRtn.A1007NOMBR = rst.getString("A1007NOMBR").trim();
                objRtn.A1007CIUD = rst.getString("A1007CIUD").trim();
                objRtn.A1007NOMCD = rst.getString("A1007NOMCD").trim();
                objRtn.A1007PAIS = rst.getString("A1007PAIS").trim();

                lstRtn.add(objRtn);
            }
            setClose();

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            setClose();
        }

        return lstRtn;

    }

    public HashMap<String, String> loadCiudadesHash() {

        HashMap<String, String> hmCiudades = new HashMap<String, String>();
        Statement stmt = null;
        ResultSet rst = null;
        String strSQL = "";

        try {

            strSQL = "SELECT A1007CTATO, A1007NOMBR, A1007CIUD, A1007NOMCD, A1007PAIS "
                    + "FROM PRAXIS.A1007 ORDER BY A1007CTATO ";

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            stmt = cnx.createStatement();
            rst = stmt.executeQuery(strSQL);

            while (rst.next()) {
                hmCiudades.put(rst.getString("A1007CTATO").trim(), rst.getString("A1007NOMBR").trim());
            }
            setClose();

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            setClose();
        }

        return hmCiudades;

    }

    public List<A005> loadAirlines() throws Exception {

        List<A005> lista = new ArrayList<>();
        A005 record;
        record = new A005();
        record.A005KEY = "";
        record.A005KEY2 = "All";
        lista.add(record);

        String sql = "SELECT * FROM " + session.getMainLibrary() + ".A005 WHERE A005KEY NOT LIKE '%*%' AND A005KEY<>''";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            stmt = cnx.createStatement();
            rst = stmt.executeQuery(sql);

            while (rst.next()) {

                record = new A005();
                record.A005KEY = rst.getString("A005KEY").trim();
                if (rst.getString("A005KEY3").trim().isEmpty()) {
                    record.A005KEY2 = rst.getString("A005KEY2").trim();
                } else {
                    record.A005KEY2 = rst.getString("A005KEY3").trim();
                }
                lista.add(record);
            }
        } finally {
            setClose();
        }

        return lista;
    }

    public HashMap<String, String> loadAirlinesHash() {

        HashMap<String, String> hmAerolineas = new HashMap<String, String>();
        Statement stmt = null;
        ResultSet rst = null;
        String strSQL = "";

        try {

            strSQL = "SELECT A005KEY, A005KEY2, A005KEY3 FROM PRAXIS.A005 WHERE A005KEY NOT LIKE '%*%' AND A005KEY<>''";

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            stmt = cnx.createStatement();
            rst = stmt.executeQuery(strSQL);

            while (rst.next()) {
                if (rst.getString("A005KEY3").trim().isEmpty()) {
                    hmAerolineas.put(rst.getString("A005KEY").trim(), rst.getString("A005KEY2").trim());
                } else {
                    hmAerolineas.put(rst.getString("A005KEY").trim(), rst.getString("A005KEY3").trim());
                }
            }
            setClose();

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            setClose();
        }

        return hmAerolineas;

    }

    public HashMap<String, String> loadZonasHash() {

        //Connection con = null;
        Statement stmt = null;
        ResultSet rst = null;
        String strSQL = "";
        HashMap<String, String> hmZona = new HashMap<String, String>();

        try {

            strSQL = "SELECT ATOS, ZONA "
                    + "FROM PRAXIS.A1708 WHERE LENGTH(RTRIM(ATOS)) = 3 ORDER BY ATOS ";

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            stmt = cnx.createStatement();
            rst = stmt.executeQuery(strSQL);

            while (rst.next()) {

                hmZona.put(rst.getString("ATOS").trim(), rst.getString("ZONA").trim());
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (rst != null) {
                    try {
                        rst.close();
                    } catch (SQLException e) {

                    }
                }
                if (stmt != null) {
                    try {
                        stmt.close();
                    } catch (SQLException e) {

                    }
                }
            } catch (Exception ex) {
                ex.printStackTrace();
            }
        }

        return hmZona;
    }

    public HashMap<String, String> loadPaisesHash() {

        //Connection con = null;
        Statement stmt = null;
        ResultSet rst = null;
        String strSQL = "";
        HashMap<String, String> hmPaises = new HashMap<String, String>();

        try {

            strSQL = "SELECT A006KEY, A006KEY1 FROM PRAXIS.A006 WHERE LENGTH(RTRIM(A006KEY)) = 2 ";

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            stmt = cnx.createStatement();
            rst = stmt.executeQuery(strSQL);

            while (rst.next()) {
                hmPaises.put(rst.getString("A006KEY").trim(), rst.getString("A006KEY1").trim());
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (rst != null) {
                    try {
                        rst.close();
                    } catch (SQLException e) {
                    }
                }
                if (stmt != null) {
                    try {
                        stmt.close();
                    } catch (SQLException e) {
                    }
                }
            } catch (Exception ex) {
                ex.printStackTrace();
            }
        }

        return hmPaises;
    }

    public HashMap<String, String> loadZonasHash6() {
        //Connection con = null;
        Statement stmt = null;
        ResultSet rst = null;
        String strSQL = "";
        HashMap<String, String> hmZona2 = new HashMap<String, String>();

        try {

            strSQL = "SELECT ATOS, ZONA "
                    + "FROM PRAXIS.A1708 WHERE LENGTH(RTRIM(ATOS)) = 6 AND TREG = 2 ORDER BY ATOS ";

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            stmt = cnx.createStatement();
            rst = stmt.executeQuery(strSQL);

            while (rst.next()) {
                hmZona2.put(rst.getString("ATOS").trim(), rst.getString("ZONA").trim());
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (rst != null) {
                    try {
                        rst.close();
                    } catch (SQLException e) {

                    }
                }
                if (stmt != null) {
                    try {
                        stmt.close();
                    } catch (SQLException e) {

                    }
                }
            } catch (Exception ex) {
                ex.printStackTrace();
            }
        }

        return hmZona2;
    }

    public List<A006> loadPaises() {

        System.out.println(" MasterDAO - loadPaises");
        List<A006> listaPaises = new ArrayList<>();
        A006 pais;

        try {

            String strSQL = "SELECT A006KEY, A006KEY1 FROM PRAXIS.A006 WHERE LENGTH(RTRIM(A006KEY)) = 2 ";

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            stmt = cnx.createStatement();
            rst = stmt.executeQuery(strSQL);

            while (rst.next()) {
                pais = new A006();
                pais.A006PAIS = rst.getString("A006KEY").trim();
                pais.A006NOMBRE = rst.getString("A006KEY1").trim();
                if (pais.A006NOMBRE.contains("VENEZUELA")) {
                    pais.A006NOMBRE = "VENEZUELA";
                }
                listaPaises.add(pais);
            }
            setClose();

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            setClose();
        }
        return listaPaises;
    }

    public List<A006> loadPaises2() {

        System.out.println(" MasterDAO - loadPaises");
        List<A006> listaPaises = new ArrayList<>();
        A006 pais;
        pais = new A006();
        pais.A006PAIS = "";
        pais.A006NOMBRE = "All";
        listaPaises.add(pais);

        try {

            String strSQL = "SELECT A006KEY, A006KEY1 FROM PRAXIS.A006 WHERE LENGTH(RTRIM(A006KEY)) = 2 ";

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            stmt = cnx.createStatement();
            rst = stmt.executeQuery(strSQL);

            while (rst.next()) {
                pais = new A006();
                pais.A006PAIS = rst.getString("A006KEY").trim();
                pais.A006NOMBRE = rst.getString("A006KEY1").trim();
                if (pais.A006NOMBRE.contains("VENEZUELA")) {
                    pais.A006NOMBRE = "VENEZUELA";
                }

                pais.A006NOMBRE = pais.A006PAIS + " - " + pais.A006NOMBRE;
                listaPaises.add(pais);
            }
            setClose();

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            setClose();
        }
        return listaPaises;
    }

    public List<A2826Filter> loadPaisesA2826() {

        System.out.println(" MasterDAO - loadPaisesA2826");
        List<A2826Filter> listaPaises = new ArrayList<>();
        A2826Filter pais;

        pais = new A2826Filter();
        pais.CCIA = "";
        pais.strDescripcion = "All";
        listaPaises.add(pais);

        try {

            String strSQL = "SELECT CCIA , IFNULL((SELECT TRIM(A005KEY2) FROM PRAXIS.A005 "
                    + "WHERE  A005KEY=CCIA GROUP BY A005KEY2),'''') AS DES_CCIA FROM PRAXIS.A2826 WHERE CCIA <> '139' AND CCUST='139' GROUP BY CCIA ORDER BY CCIA";

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            stmt = cnx.createStatement();
            rst = stmt.executeQuery(strSQL);

            while (rst.next()) {
                pais = new A2826Filter();
                pais.CCIA = rst.getString("CCIA").trim();
                pais.strDescripcion = pais.CCIA + "-" + rst.getString("DES_CCIA").trim();
                if (pais.strDescripcion.contains("VENEZUELA")) {
                    pais.strDescripcion = pais.CCIA + "-" + "VENEZUELA";
                }
                listaPaises.add(pais);
            }
            setClose();

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            setClose();
        }
        return listaPaises;
    }

    public List<A051> loadCountry() {
        List<A051> lstRtn = new ArrayList<>(0);
        A051 objRtn;
        try {
            String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX128S01A051}";

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(SQLCLL01);
            cs.execute();

            rst = cs.getResultSet();
            while (rst.next()) {
                objRtn = new A051();
                objRtn.A051KEY2 = rst.getString("A051KEY2").trim();
                objRtn.A051DESCR1 = rst.getString("A051DESCR1").trim();
                lstRtn.add(objRtn);
            }
        } catch (Exception ex) {
            System.out.println(ex.getMessage());
            ex.printStackTrace();
        } finally {
            setClose();
        }

        return lstRtn;
    }

    public List<A006> loadCurrency() {
        List<A006> lstRtn = new ArrayList<>(0);
        A006 objRtn;
        try {
            String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX128S01A006}";

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(SQLCLL01);
            cs.execute();

            rst = cs.getResultSet();
            while (rst.next()) {
                objRtn = new A006();
                objRtn.A006MONEDA = rst.getString("A006MONEDA").trim();
                lstRtn.add(objRtn);
            }
        } catch (Exception ex) {
            System.out.println(ex.getMessage());
            ex.printStackTrace();
        } finally {
            setClose();
        }

        return lstRtn;
    }

    public List<A051> loadTax() throws SQLException {
        List<A051> lstRtn = new ArrayList<>(0);
        A051 objRtn;
        try {
            String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX127S01A1741}";

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(SQLCLL01);
            cs.execute();

            rst = cs.getResultSet();
            while (rst.next()) {
                objRtn = new A051();
                objRtn.A051DESCR1 = rst.getString("A051DESCR1").trim();
                lstRtn.add(objRtn);
            }

        } catch (Exception ex) {
            System.out.println(ex.getMessage());
            ex.printStackTrace();
        } finally {
            setClose();
        }

        return lstRtn;
    }

    public List<String> loadSubFu() throws SQLException {
        List<String> lstRtn = new ArrayList<>(0);

        try {
            String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX128S03A1736}";

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(SQLCLL01);
            cs.execute();

            rst = cs.getResultSet();
            while (rst.next()) {
                lstRtn.add(rst.getString("A1736SUBFU"));
            }

        } catch (Exception ex) {
            System.out.println(ex.getMessage());
        } finally {
            setClose();
        }

        return lstRtn;
    }

    public List<String> loadFP() throws SQLException {
        List<String> lstRtn = new ArrayList<>(0);

        try {
            String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX128S04A1736}";

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(SQLCLL01);
            cs.execute();

            rst = cs.getResultSet();
            while (rst.next()) {
                lstRtn.add(rst.getString("A1736FP"));
            }

        } catch (Exception ex) {
            System.out.println(ex.getMessage());
        } finally {
            setClose();
        }

        return lstRtn;
    }

    public List<A051> loadTypeCC() throws SQLException {
        List<A051> lstRtn = new ArrayList<>(0);
        A051 objRtn;
        try {
            String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX128S02A051}";

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(SQLCLL01);
            cs.execute();

            rst = cs.getResultSet();
            while (rst.next()) {
                objRtn = new A051();
                objRtn.A051KEY2 = rst.getString("A051KEY2");
                objRtn.A051DESCR1 = rst.getString("A051DESCR1");
                lstRtn.add(objRtn);
            }

        } catch (Exception ex) {
            System.out.println(ex.getMessage());
        } finally {
            setClose();
        }
        return lstRtn;
    }

    public List<A005> loadAirlines(boolean ingresarAll) throws Exception {

        List<A005> lista = new ArrayList<>();
        A005 record;

        if (ingresarAll) {
            record = new A005();
            record.A005KEY = "";
            record.A005KEY2 = "All";
            lista.add(record);
        }

        String sql = "SELECT * FROM " + session.getMainLibrary() + ".A005 WHERE A005KEY NOT LIKE '%*%' AND A005KEY<>''";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            stmt = cnx.createStatement();
            rst = stmt.executeQuery(sql);

            while (rst.next()) {

                record = new A005();
                record.A005KEY = rst.getString("A005KEY").trim();
                if (rst.getString("A005KEY3").trim().isEmpty()) {
                    record.A005KEY2 = rst.getString("A005KEY2").trim();
                } else {
                    record.A005KEY2 = rst.getString("A005KEY3").trim();
                }
                lista.add(record);
            }
        } finally {
            setClose();
        }

        return lista;
    }

    public List<A005> loadAirlines2() throws Exception {

        List<A005> lista = new ArrayList<>();
        A005 record;
        record = new A005();
        record.A005KEY = "";
        record.A005KEY2 = "All";
        lista.add(record);

        String sql = "SELECT * FROM " + session.getMainLibrary() + ".A005 WHERE A005KEY NOT LIKE '%*%' AND A005KEY<>''";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            stmt = cnx.createStatement();
            rst = stmt.executeQuery(sql);

            while (rst.next()) {

                record = new A005();
                record.A005KEY = rst.getString("A005KEY").trim();
                if (rst.getString("A005KEY3").trim().isEmpty()) {
                    record.A005KEY2 = record.A005KEY + "-" + rst.getString("A005KEY2").trim();
                } else {
                    record.A005KEY2 = record.A005KEY + "-" + rst.getString("A005KEY3").trim();
                }
                lista.add(record);
            }
        } finally {
            setClose();
        }

        return lista;
    }

    public List<A005> loadAIRLINE(byte flag) throws Exception {

        List<A005> lista = new ArrayList<>();
        A005 record;
        if (flag == 2) {
            record = new A005();
            record.A005KEY = "";
            record.A005KEY2 = "All";
            lista.add(record);
        }

        String sql = "SELECT * FROM " + session.getMainLibrary() + ".A005 WHERE A005KEY NOT LIKE '%*%' AND A005KEY<>''";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            stmt = cnx.createStatement();
            rst = stmt.executeQuery(sql);

            while (rst.next()) {

                record = new A005();
                record.A005KEY = rst.getString("A005KEY").trim();
                if (rst.getString("A005KEY3").trim().isEmpty()) {
                    record.A005KEY2 = record.A005KEY + " - " + rst.getString("A005KEY2").trim();
                } else {
                    record.A005KEY2 = record.A005KEY + " - " + rst.getString("A005KEY3").trim();
                }
                lista.add(record);
            }
        } finally {
            setClose();
        }

        return lista;
    }

    public List<A1852Filter> loadSource() throws Exception {

        //Connection con = null;
        Statement stmt = null;
        ResultSet rst = null;
        String sql = "";
        List<A1852Filter> listaSource = new ArrayList<>();
        A1852Filter source;

        try {

            sql = "SELECT CODSOUR, DESSOU FROM PRAXIS.A1852 ORDER BY CODSOUR";

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            stmt = cnx.createStatement();
            rst = stmt.executeQuery(sql);

            while (rst.next()) {
                source = new A1852Filter();
                source.CODSOUR = rst.getString("CODSOUR").trim();
                source.DESSOU = rst.getString("DESSOU").trim();
                listaSource.add(source);
            }
        } finally {
            setClose();
        }
        return listaSource;
    }

    public List<A1852Filter> loadSource(UserView user) throws Exception {

        //Connection con = null;
        Statement stmt = null;
        ResultSet rst = null;
        String strSQL = "";
        List<A1852Filter> listaSource = new ArrayList<A1852Filter>();
        A1852Filter source;

        try {

            strSQL = "SELECT CODSOUR, DESSOU FROM PRAXIS.A1852 ORDER BY CODSOUR";

            //con = Proveedor.getConnectionIS(user);
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            stmt = cnx.createStatement();
            rst = stmt.executeQuery(strSQL);

            while (rst.next()) {
                source = new A1852Filter();
                source.CODSOUR = rst.getString("CODSOUR").trim();
                source.DESSOU = rst.getString("DESSOU").trim();
                listaSource.add(source);
            }

        } finally {
            try {
                if (rst != null) {
                    try {
                        rst.close();
                    } catch (SQLException e) {
                        logError.error("Message: " + e.getMessage(), e);
                    }
                }
                if (stmt != null) {
                    try {
                        stmt.close();
                    } catch (SQLException e) {
                        logError.error("Message: " + e.getMessage(), e);
                    }
                }
                /*if (con != null) {
                 try { con.close(); } catch(SQLException e) { logError.error("Message: " + e.getMessage() ,e); }
                 con = null;
                 }*/
            } catch (Exception ex) {
                ex.printStackTrace();
            }
        }

        return listaSource;
    }

    public List<A1852Filter> loadSource2() throws Exception {

        //Connection con = null;
        Statement stmt = null;
        ResultSet rst = null;
        String sql = "";
        List<A1852Filter> listaSource = new ArrayList<>();
        A1852Filter source;

        try {

            sql = "SELECT CODSOUR, DESSOU FROM PRAXIS.A1852 ORDER BY CODSOUR";

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            stmt = cnx.createStatement();
            rst = stmt.executeQuery(sql);

            while (rst.next()) {
                source = new A1852Filter();
                source.CODSOUR = rst.getString("CODSOUR").trim();
                source.DESSOU = source.CODSOUR + " - " + rst.getString("DESSOU").trim();
                listaSource.add(source);
            }
        } finally {
            setClose();
        }
        return listaSource;
    }

    public List<A1691Filter> loadSourceA1691() throws Exception {

        //Connection con = null;
        Statement stmt = null;
        ResultSet rst = null;
        String strSQL = "";
        List<A1691Filter> listaPaises = new ArrayList<>();
        A1691Filter pais;

        try {

            strSQL = "SELECT NOMFILE "
                    + " FROM PRAXIS.A2366 GROUP BY NOMFILE ORDER BY NOMFILE";

            //con = Proveedor.getConnectionIS(user);
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            stmt = cnx.createStatement();
            rst = stmt.executeQuery(strSQL);

            while (rst.next()) {
                pais = new A1691Filter();
                pais.NOMFILE = rst.getString("NOMFILE").trim();
                listaPaises.add(pais);
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (rst != null) {
                    try {
                        rst.close();
                    } catch (SQLException e) {
                        logError.error("Message: " + e.getMessage(), e);
                    }
                }
                if (stmt != null) {
                    try {
                        stmt.close();
                    } catch (SQLException e) {
                        logError.error("Message: " + e.getMessage(), e);
                    }
                }
                /*if (con != null) {
                 try { con.close(); } catch(SQLException e) { logError.error("Message: " + e.getMessage() ,e); }
                 con = null;
                 }*/
            } catch (Exception ex) {
                ex.printStackTrace();
            }
        }

        return listaPaises;
    }

    public List<A1852Filter> loadSOURCE(byte flag) throws Exception {

        //Connection con = null;
        Statement stmt = null;
        ResultSet rst = null;
        String sql = "";
        List<A1852Filter> listaSource = new ArrayList<>();
        A1852Filter source;
        if (flag == 2) {
            source = new A1852Filter();
            source.CODSOUR = "";
            source.DESSOU = "All";
            listaSource.add(source);
        }

        try {

            sql = "SELECT CODSOUR, DESSOU FROM PRAXIS.A1852 ORDER BY CODSOUR";

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            stmt = cnx.createStatement();
            rst = stmt.executeQuery(sql);

            while (rst.next()) {
                source = new A1852Filter();
                source.CODSOUR = rst.getString("CODSOUR").trim();
                source.DESSOU = source.CODSOUR + " - " + rst.getString("DESSOU").trim();
                listaSource.add(source);
            }
        } finally {
            setClose();
        }
        return listaSource;
    }

    public List<A1852Filter> loadUSO(byte flag) throws Exception {
        List<A1852Filter> lstRtn = new ArrayList<A1852Filter>(0);
        A1852Filter objRtn;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".A1852_USOS(?)}";

        Connection cnx = null;
        if (flag == 2) {
            objRtn = new A1852Filter();
            objRtn.CODSOUR = "";
            objRtn.DESSOU = "All";
            lstRtn.add(objRtn);
        }
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new A1852Filter();
                objRtn.CODSOUR = rs01.getString("CODSOUR").trim();
                objRtn.DESSOU = objRtn.CODSOUR + "-" + rs01.getString("DESSOU").trim();

                lstRtn.add(objRtn);
            }
        } catch (Exception e) {
            e.getMessage();
        } finally {
            setClose();
        }
        return lstRtn;
    }

    public List<A051> loadUSO(String calfa, byte flag) throws Exception {
        List<A051> lstRtn = new ArrayList<A051>(0);
        A051 objRtn;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PXS01_USOS(?)}";

        Connection cnx = null;
        if (flag == 2 || flag == 4) {
            objRtn = new A051();
            objRtn.A051KEY2 = "";
            objRtn.A051DESCR1 = "All";
            lstRtn.add(objRtn);
        }
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.setString(1, calfa);
            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new A051();
                objRtn.A051KEY2 = rs01.getString("A051KEY2").trim();
                objRtn.A051DESCR1 = objRtn.A051KEY2 + " - " + rs01.getString("A051DESCR1").trim();

                lstRtn.add(objRtn);
            }
        } catch (Exception e) {
            e.getMessage();
        } finally {
            setClose();
        }
        return lstRtn;
    }

    public List<A1248> loadFieldsA1248(byte flag, String tipo, String tabname, String num) throws Exception {

        List<A1248> lista = new ArrayList<A1248>();
        A1248 record;

        Connection cnx = null;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00116(?,?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, tipo.trim());
            cstmt.setString(3, "");//CAMPO
            cstmt.setString(4, tabname);//TABNAME
            cstmt.execute();

            rst = cstmt.getResultSet();

            while (rst.next()) {

                record = new A1248();
                record.TABNAME = rst.getString("TABNAME").trim();
                record.USERFIELD = rst.getString("USERFIELD").trim();
                record.DESCRIPT = rst.getString("DESCRIPT").trim();
                record.SYSTFIELD = rst.getString("SYSTFIELD").trim();
                record.DATATYPE = rst.getString("DATATYPE").trim();
                record.SUBSTRFL = rst.getString("SUBSTRFL").trim();
                record.FlagNum = num;
                lista.add(record);
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            setClose();
        }

        return lista;

    }

    public List<A2280Filter> loadBank() throws SQLException, Exception {

        List<A2280Filter> lstRtn = new ArrayList<>();
        A2280Filter objRtn;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP01908(?)}";

        Connection cnx = null;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);

            cstmt01.execute();
            objRtn = new A2280Filter();
            objRtn.CODEBANK = "";
            objRtn.NAMEBANK = "All";
            objRtn.IN_CODE_IN_NAME = "All";
            lstRtn.add(objRtn);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new A2280Filter();
                objRtn.CODEBANK = rs01.getString("CODEBANK");
                objRtn.NAMEBANK = rs01.getString("NAMEBANK");
                objRtn.IN_CODE_IN_NAME = objRtn.CODEBANK + " - " + objRtn.NAMEBANK;
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

    public List<A2280> loadTarjetas() {

        //Connection con = null;
        Statement stmt = null;
        ResultSet rst = null;
        String strSQL = "";
        List<A2280> listaTarjetas = new ArrayList<>();
        A2280 tarjetas;

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();

            strSQL = "SELECT CODECAR, NAMECAR FROM PRAXIS.A2280A GROUP BY CODECAR, NAMECAR ORDER BY CODECAR";

            //con = Proveedor.getConnectionIS(user);
            stmt = cnx.createStatement();
            rst = stmt.executeQuery(strSQL);
            tarjetas = new A2280();
            tarjetas.CODE = "";
            tarjetas.NAME = "All";
            listaTarjetas.add(tarjetas);

            while (rst.next()) {
                tarjetas = new A2280();
                tarjetas.CODE = rst.getString("CODECAR").trim();
                tarjetas.NAME = tarjetas.CODE + " - " + rst.getString("NAMECAR").trim();

                listaTarjetas.add(tarjetas);
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (rst != null) {
                    try {
                        rst.close();
                    } catch (SQLException e) {
                        logError.error("Message: " + e.getMessage(), e);
                    }
                }
                if (stmt != null) {
                    try {
                        stmt.close();
                    } catch (SQLException e) {
                        logError.error("Message: " + e.getMessage(), e);
                    }
                }

            } catch (Exception ex) {
                ex.printStackTrace();
            }
        }

        return listaTarjetas;
    }
    
    public List<CPF031Filter> loadUaudits() {

        //Connection con = null;
        Statement stmt = null;
        ResultSet rst = null;
        String strSQL = "";
        List<CPF031Filter> listaUaudits = new ArrayList<>();
        CPF031Filter Uaudits;

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();

            strSQL = "SELECT DISTINCT UAUDIT,IFNULL((SELECT A804NOMB FROM PRAXISMP.MPAUDIT WHERE UAUDIT = A804USAR FETCH FIRST 1 ROWS ONLY), '''') NAMEUSAR,IFNULL((SELECT A804APE FROM PRAXISMP.MPAUDIT WHERE UAUDIT = A804USAR FETCH FIRST 1 ROWS ONLY), '''') APEUSAR FROM PRAXISMP.MPF100 WHERE UAUDIT <> '' ";

            //con = Proveedor.getConnectionIS(user);
            stmt = cnx.createStatement();
            rst = stmt.executeQuery(strSQL);
            Uaudits = new CPF031Filter();
            Uaudits.UAUDIT = "";
            Uaudits.NAME = "All";
            listaUaudits.add(Uaudits);

            while (rst.next()) {
                Uaudits = new CPF031Filter();
                Uaudits.UAUDIT = rst.getString("UAUDIT").trim();
                Uaudits.NAME = Uaudits.UAUDIT + " - " + rst.getString("NAMEUSAR").trim() + " " + rst.getString("APEUSAR").trim();

                listaUaudits.add(Uaudits);
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (rst != null) {
                    try {
                        rst.close();
                    } catch (SQLException e) {
                        logError.error("Message: " + e.getMessage(), e);
                    }
                }
                if (stmt != null) {
                    try {
                        stmt.close();
                    } catch (SQLException e) {
                        logError.error("Message: " + e.getMessage(), e);
                    }
                }

            } catch (Exception ex) {
                ex.printStackTrace();
            }
        }

        return listaUaudits;
    }
    
    public List<CPF031Filter> lstProcessor() {

        //Connection con = null;
        Statement stmt = null;
        ResultSet rst = null;
        String strSQL = "";
        List<CPF031Filter> listaProcessor = new ArrayList<>();
        CPF031Filter Processor;

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();

            strSQL = "(SELECT DISTINCT A.CODE,(SELECT MAX(CORE) FROM PRAXISMP.MPF109 WHERE CODE = A.CODE) AS CORE FROM PRAXISMP.MPF109 A) UNION ALL (SELECT 'AT','UATP' FROM (VALUES ('')) AS TBL01)";

            //con = Proveedor.getConnectionIS(user);
            stmt = cnx.createStatement();
            rst = stmt.executeQuery(strSQL);
            Processor = new CPF031Filter();
            Processor.VALUE = "";
            Processor.NAME = "All";
            listaProcessor.add(Processor);

            while (rst.next()) {
                Processor = new CPF031Filter();
                Processor.VALUE = rst.getString("CODE").trim();
                Processor.NAME = Processor.VALUE + " - " + rst.getString("CORE").trim();

                listaProcessor.add(Processor);
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (rst != null) {
                    try {
                        rst.close();
                    } catch (SQLException e) {
                        logError.error("Message: " + e.getMessage(), e);
                    }
                }
                if (stmt != null) {
                    try {
                        stmt.close();
                    } catch (SQLException e) {
                        logError.error("Message: " + e.getMessage(), e);
                    }
                }

            } catch (Exception ex) {
                ex.printStackTrace();
            }
        }

        return listaProcessor;
    }

    public List<A2287> loadRejections() {

        //Connection con = null;
        Statement stmt = null;
        ResultSet rst = null;
        String strSQL = "";
        List<A2287> listaRejections = new ArrayList<A2287>();
        A2287 rejection;
        Connection cnx = null;

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();

            strSQL = "SELECT CODEREJ, DESCREJ FROM PRAXIS.A2287 ORDER BY CODEREJ";

            stmt = cnx.createStatement();
            rst = stmt.executeQuery(strSQL);
            rejection = new A2287();
            rejection.CODEREJ = "";
            rejection.DESCREJ = "All";
            listaRejections.add(rejection);

            while (rst.next()) {
                rejection = new A2287();
                rejection.CODEREJ = rst.getString("CODEREJ").trim();
//                rejection.DESCREJ = rst.getString("DESCREJ").trim();
                rejection.DESCREJ = rejection.CODEREJ + " - " + rst.getString("DESCREJ").trim();
                listaRejections.add(rejection);
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (rst != null) {
                    try {
                        rst.close();
                    } catch (SQLException e) {
                        logError.error("Message: " + e.getMessage(), e);
                    }
                }
                if (stmt != null) {
                    try {
                        stmt.close();
                    } catch (SQLException e) {
                        logError.error("Message: " + e.getMessage(), e);
                    }
                }
            } catch (Exception ex) {
                ex.printStackTrace();
            }
        }

        return listaRejections;
    }

    public HashMap<String, String> loadErrorHash() {

        //Connection con = null;
        Statement stmt = null;
        ResultSet rst = null;
        String strSQL = "";
        HashMap<String, String> hmDescError = new HashMap<String, String>();

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();

            strSQL = "SELECT CODEM, DESCR FROM PRAXIS.A2353 ORDER BY CODEM";

            stmt = cnx.createStatement();
            rst = stmt.executeQuery(strSQL);

            while (rst.next()) {
                hmDescError.put(rst.getString("CODEM").trim(), rst.getString("DESCR").trim());
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (rst != null) {
                    try {
                        rst.close();
                    } catch (SQLException e) {
                        logError.error("Message: " + e.getMessage(), e);
                    }
                }
                if (stmt != null) {
                    try {
                        stmt.close();
                    } catch (SQLException e) {
                        logError.error("Message: " + e.getMessage(), e);
                    }
                }
            } catch (Exception ex) {
                ex.printStackTrace();
            }
        }

        return hmDescError;
    }

    public HashMap<String, String> loadCardHash() {

        //Connection con = null;
        Statement stmt = null;
        ResultSet rst = null;
        String strSQL = "";
        HashMap<String, String> hmDescCard = new HashMap<String, String>();

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();

            strSQL = "SELECT CODECAR, NAMECAR FROM PRAXIS.A2280 GROUP BY CODECAR, NAMECAR ORDER BY CODECAR";

            stmt = cnx.createStatement();
            rst = stmt.executeQuery(strSQL);

            while (rst.next()) {
                hmDescCard.put(rst.getString("CODECAR").trim(), rst.getString("NAMECAR").trim());
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (rst != null) {
                    try {
                        rst.close();
                    } catch (SQLException e) {
                        logError.error("Message: " + e.getMessage(), e);
                    }
                }
                if (stmt != null) {
                    try {
                        stmt.close();
                    } catch (SQLException e) {
                        logError.error("Message: " + e.getMessage(), e);
                    }
                }
            } catch (Exception ex) {
                ex.printStackTrace();
            }
        }

        return hmDescCard;
    }

    public List<A2280> loadAdjType() {

        //Connection con = null;
        Statement stmt = null;
        ResultSet rst = null;
        String strSQL = "";
        List<A2280> listaAdjs = new ArrayList<>();
        A2280 adjs;
        adjs = new A2280();
        adjs.CODE = "";
        adjs.NAME = "All";
        listaAdjs.add(adjs);

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();

            strSQL = "SELECT CODETB CODE, DESCRE1 NAME FROM PRAXISMP.A4169 WHERE CCUST = '134' AND TTABLA = '89' AND CODETB <> ''";

            //con = Proveedor.getConnectionIS(user);
            stmt = cnx.createStatement();
            rst = stmt.executeQuery(strSQL);

            while (rst.next()) {
                adjs = new A2280();
                adjs.CODE = rst.getString("CODE").trim();
                adjs.NAME = rst.getString("NAME").trim();

                listaAdjs.add(adjs);
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (rst != null) {
                    try {
                        rst.close();
                    } catch (SQLException e) {
                        logError.error("Message: " + e.getMessage(), e);
                    }
                }
                if (stmt != null) {
                    try {
                        stmt.close();
                    } catch (SQLException e) {
                        logError.error("Message: " + e.getMessage(), e);
                    }
                }

            } catch (Exception ex) {
                ex.printStackTrace();
            }
        }

        return listaAdjs;
    }
    
    public List<A2280> loadADMType() {

        //Connection con = null;
        Statement stmt = null;
        ResultSet rst = null;
        String strSQL = "";
        List<A2280> listaAdjs = new ArrayList<>();
        A2280 adjs;

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();

            strSQL = "SELECT CODETB CODE, DESCRE1 NAME FROM PRAXISMP.A4169 WHERE CCUST = ''134'' AND TTABLA = '89' AND CODETB IN (''03'',''04'',''06'')";

            //con = Proveedor.getConnectionIS(user);
            stmt = cnx.createStatement();
            rst = stmt.executeQuery(strSQL);

            while (rst.next()) {
                adjs = new A2280();
                adjs.CODE = rst.getString("CODE").trim();
                adjs.NAME = rst.getString("NAME").trim();

                listaAdjs.add(adjs);
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (rst != null) {
                    try {
                        rst.close();
                    } catch (SQLException e) {
                        logError.error("Message: " + e.getMessage(), e);
                    }
                }
                if (stmt != null) {
                    try {
                        stmt.close();
                    } catch (SQLException e) {
                        logError.error("Message: " + e.getMessage(), e);
                    }
                }

            } catch (Exception ex) {
                ex.printStackTrace();
            }
        }

        return listaAdjs;
    }

    /*
    public List<A1852Filter> loadSource() {

        List<A1852Filter> listaSource = new ArrayList<A1852Filter>();
        A1852Filter source;

        try {

            String strSQL = "SELECT CODSOUR, DESSOU FROM PRAXIS.A1852 WHERE CCUST='"+ session.getUserView().getCustomerInfo().CCUST +"' ORDER BY CODSOUR";

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            stmt = cnx.createStatement();
            rst = stmt.executeQuery(strSQL);

            while (rst.next()) {
                source = new A1852Filter();
                source.CODSOUR = rst.getString("CODSOUR").trim();
                source.DESSOU = rst.getString("DESSOU").trim();
                listaSource.add(source);
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            setClose();
        }

        return listaSource;
    }*/
    public List<A2357Filter> loadPX382SQP03189() throws SQLException, Exception {

        List<A2357Filter> lstRtn = new ArrayList<>();
        A2357Filter objRtn;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP03189(?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new A2357Filter();
                objRtn.CTRAN = rs01.getString("CTRAN").trim();
                objRtn.DESCEECC = rs01.getString("DESCEECC").trim();

                lstRtn.add(objRtn);
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

    public List<INF020> loadSQP03628(String USERW) throws Exception {

//        cs = null;
//        rst = null;
//        cnx = null;
        INF020 record = null;
        List<INF020> lista = new ArrayList<INF020>();

        //String SQLCLL01 = "{CALL LIBRFND.SQP03628(?)}";
        String SQLCLL01 = "{CALL PRAXIS.SQP03628(?)}";

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        Connection cnx = null;

        try {

            cnx = getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, USERW);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();

            //Obteniendo los Totales ===========================================
            while (rs01.next()) {
                record = new INF020();
                //record.IN_COUNTRY = filter.IN_COUNTRY.trim();
                record.CCUST = rs01.getString("CCUST");
                record.SIATA = rs01.getString("descrip");

                lista.add(record);
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                rs01.close();
                cstmt01.close();
            } catch (Exception e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
        }

        return lista;

    }

    public List<A005> loadCurrencies() throws Exception {

        List<A005> lista = new ArrayList<>();
        A005 record;
        record = new A005();
        record.A005KEY = "";
        record.A005KEY2 = "All";
        lista.add(record);

        String sql = "SELECT A051KEY2, A051COMENT FROM PRAXISMP.A051 WHERE A051KEY1 = 'T2'";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            stmt = cnx.createStatement();
            rst = stmt.executeQuery(sql);

            while (rst.next()) {

                record = new A005();
                record.A005KEY = rst.getString("A051KEY2").trim();
                if (rst.getString("A051COMENT").trim().isEmpty()) {
                    record.A005KEY2 = record.A005KEY + "-" + rst.getString("A051KEY2").trim();
                } else {
                    record.A005KEY2 = record.A005KEY + "-" + rst.getString("A051COMENT").trim();
                }

                lista.add(record);
            }
        } finally {
            setClose();
        }

        return lista;
    }
    

    public Connection getIBMDB2Connection() {

        String url = "jdbc:as400://10.0.0.25/PRAXIS;libraries=PRAXIS"; //PRODUCCION
        //String url = "jdbc:as400://10.0.0.47/PRAXIS;libraries=PRAXISMP"; //DESARROLLO

        try {
            Class.forName("com.ibm.as400.access.AS400JDBCDriver");
            DriverManager.setLoginTimeout(60 * 10); // 10min

            //return DriverManager.getConnection(url, "RBTAVIANCA", "rbtavia"); //DESARROLLO
            return DriverManager.getConnection(url, "USRWEBAV", "gt23yv90");//PRODUCCION
        } catch (Exception ex) {
            return null;
        }
    }

    private void setClose() {
        if (rst != null) {
            try {
                rst.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        if (cs != null) {
            try {
                cs.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        //===============
        try {
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }
    
    
    public PX041S01INF001Filter loadPX0000INF053( String nprog  ) throws SQLException, Exception {

        List<PX041S01INF001Filter> lstRtn = new ArrayList<>();
        PX041S01INF001Filter objRtn =new PX041S01INF001Filter();
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        
        UserView user = this.session.getUserView();
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP_USERPERMIS_MASTER_INFO53(?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, user.getUserInfo().USR);
            cstmt01.setString(3,  nprog);


            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new PX041S01INF001Filter();
                objRtn.PERMA = rs01.getString("PERMA").trim();
                objRtn.PERML = rs01.getString("PERML").trim();
                objRtn.PERMC = rs01.getString("PERMC").trim();
                objRtn.PERMM = rs01.getString("PERMM").trim();
                objRtn.PERME = rs01.getString("PERME").trim();
                objRtn.PERMX = rs01.getString("PERMX").trim();

                
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

        return objRtn;
    }
}
