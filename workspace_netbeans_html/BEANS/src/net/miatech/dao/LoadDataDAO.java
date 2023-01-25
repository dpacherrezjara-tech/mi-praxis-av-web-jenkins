/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.dao;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.DatabaseMetaData;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Types;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import net.miatech.beans.UserView;
import net.miatech.beans.implement.IServerSession;
import net.miatech.libcust.A005;
import net.miatech.libcust.A005D;
import net.miatech.libcust.A005wr;
import net.miatech.libmiatec.A006;
import net.miatech.libmiatec.A1007;
import net.miatech.praxis.interline.filter.A1852Filter;
import net.miatech.praxis.interline.filter.A1852FilterD;
import net.miatech.praxis.payment.A2280;
import net.miatech.praxis.payment.filter.A2280Filter;
import net.miatech.praxis.payment.filter.A2290Filter;
import net.miatech.beans.A1691Filter;
import net.miatech.beans.A2826Filter;
import net.miatech.praxis.flown.A1686;
import net.miatech.praxis.flown.A2826;
import net.miatech.praxis.payment.A2287;
import net.miatech.provider.Proveedor;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author rmayta
 */
public class LoadDataDAO {

    private IServerSession session;
    private final Logger logError = Logger.getLogger("errorLog");

    public LoadDataDAO() {
    }

    public LoadDataDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public String getRutaImagen(String ccust, UserView user, String grupo, String nroprt, String doc) {

        Connection con = null;
        Statement stmt = null;
        ResultSet rst = null;
        String strSQL = "", ruta = "";

        if (!grupo.trim().equals("") && (!nroprt.trim().equals("") || !doc.trim().equals(""))) {

            strSQL = "SELECT FILENAME FROM PRAXIS.A1200 WHERE CCUST = '"
                    + ccust.trim().concat("' ");

            if (!grupo.trim().equals("")) {
                strSQL += "AND GRUPO = '".concat(grupo.trim()).concat("' ");
            }

            if (!nroprt.trim().equals("")) {
                strSQL += "AND NROPRT = '".concat(nroprt.trim()).concat("' ");
            }

            if (!doc.trim().equals("")) {
                strSQL += "AND CCIA = '".concat(doc.trim().substring(0, 3)).concat("' ")
                        + "AND FORMA = '".concat(doc.trim().substring(3, 7)).concat("' ")
                        + "AND SERIE = '".concat(doc.trim().substring(7, 13)).concat("' ")
                        + "AND CUPON = '".concat(doc.trim().substring(13, 14)).concat("' ");
            }

            try {

                con = Proveedor.getConnectionIS(user);
                stmt = con.createStatement();
                rst = stmt.executeQuery(strSQL);

                while (rst.next()) {
                    ruta = rst.getString("FILENAME").trim();
                }
                try {
                    rst.close();
                } catch (SQLException e) {
                    logError.error("Message: " + e.getMessage(), e);
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
                    if (con != null) {
                        try {
                            con.close();
                        } catch (SQLException e) {
                            logError.error("Message: " + e.getMessage(), e);
                        }
                        con = null;
                    }
                } catch (Exception ex) {
                    ex.printStackTrace();
                }
            }

        }

        return ruta;
    }

    public String[] findLastClearingDate(Connection conPro, String calfa, UserView user) {

        //*************** Para coger la última fecha de Clearing *************************
        String[] arrayPRO094 = new String[2];
        CallableStatement cstmt = null;
        boolean cerrarCnx = false;

        try {
            if (conPro == null) {
                conPro = Proveedor.getConnectionIS(user);
                cerrarCnx = true;
            }
            DatabaseMetaData dmd = conPro.getMetaData();
            cstmt = conPro.prepareCall("{CALL PRAXIS" + dmd.getCatalogSeparator() + "SPCL3050(?)}");
            cstmt.setString(1, calfa.trim());//colocando la librería

            cstmt.execute();
            cstmt.close();

            cstmt = conPro.prepareCall("{CALL PRAXIS" + dmd.getCatalogSeparator() + "SPPRO094(?)}");
            cstmt.setString(1, "01".concat(Functions.fillString("", 9)));
            cstmt.registerOutParameter(1, Types.CHAR);
            cstmt.execute();
            arrayPRO094[0] = cstmt.getString(1).substring(2, 8); //Fecha de Clearing

            arrayPRO094[1] = cstmt.getString(1).substring(8, 10); //Campo Pre- Cierre

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (cstmt != null) {
                    cstmt.close();
                }
                if (conPro != null && cerrarCnx) {
                    conPro.close();
                    conPro = null;
                }
            } catch (Exception ex) {
                ex.printStackTrace();
            }
        }

        //**********************************************************************************
        return arrayPRO094;

    }

    public String comprobarAerolinea(UserView user, String aero, String ccust) {

        Connection con = null;
        Statement stmt = null;
        ResultSet rst = null;
        String mensj = "";

        String sql = "SELECT A005KEY2 FROM PRAXIS.A005 WHERE A005KEY = '".concat(aero.trim().toUpperCase()).concat("' ");

        try {

            con = Proveedor.getConnectionIS(user);
            stmt = con.createStatement();
            rst = stmt.executeQuery(sql);
            if (rst.next()) {
                mensj = rst.getString("A005KEY2");
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
                if (con != null) {
                    try {
                        con.close();
                    } catch (SQLException e) {
                        logError.error("Message: " + e.getMessage(), e);
                    }
                    con = null;
                }
            } catch (Exception ex) {
                ex.printStackTrace();
            }
        }

        return mensj;

    }

    public List<A1007> loadCiudades(Connection con, UserView user) {

        //Connection con = null;
        Statement stmt = null;
        ResultSet rst = null;
        String strSQL = "";
        List<A1007> listaCiudades = new ArrayList<A1007>();
        A1007 ciudad;

        try {

            strSQL = "SELECT A1007CTATO, A1007NOMBR, A1007CIUD, A1007NOMCD, A1007PAIS "
                    + "FROM PRAXIS.A1007 ORDER BY A1007CTATO ";

            //con = Proveedor.getConnectionIS(user);
            stmt = con.createStatement();
            rst = stmt.executeQuery(strSQL);

            while (rst.next()) {
                ciudad = new A1007();
                ciudad.A1007CTATO = rst.getString("A1007CTATO").trim();
                ciudad.A1007NOMBR = rst.getString("A1007NOMBR").trim();
                ciudad.A1007CIUD = rst.getString("A1007CIUD").trim();
                ciudad.A1007NOMCD = rst.getString("A1007NOMCD").trim();
                ciudad.A1007PAIS = rst.getString("A1007PAIS").trim();
                listaCiudades.add(ciudad);
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

        return listaCiudades;
    }

    public List<A2280> loadTarjetas(Connection con, UserView user) {

        //Connection con = null;
        Statement stmt = null;
        ResultSet rst = null;
        String strSQL = "";
        List<A2280> listaTarjetas = new ArrayList<A2280>();
        A2280 tarjetas;

        try {

            //strSQL = "SELECT CODECAR, NAMECAR FROM PRAXIS.A2280A GROUP BY CODECAR, NAMECAR ORDER BY CODECAR";
            strSQL = "SELECT DISTINCT CODECAR, NAMECAR FROM PRAXIS.A2280A ORDER BY CODECAR";

            //con = Proveedor.getConnectionIS(user);
            stmt = con.createStatement();
            rst = stmt.executeQuery(strSQL);

            while (rst.next()) {
                tarjetas = new A2280();
                tarjetas.CODE = rst.getString("CODECAR").trim();
                tarjetas.NAME = rst.getString("NAMECAR").trim();

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

    public List<A006> loadPaises(Connection con, UserView user) {

        //Connection con = null;
        Statement stmt = null;
        ResultSet rst = null;
        String strSQL = "";
        List<A006> listaPaises = new ArrayList<A006>();
        A006 pais;

        try {

            strSQL = "SELECT A006KEY, A006KEY1 FROM PRAXIS.A006 WHERE LENGTH(RTRIM(A006KEY)) = 2 ";

            //con = Proveedor.getConnectionIS(user);
            stmt = con.createStatement();
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

    public List<A2290Filter> loadPaisesA2290(Connection con, UserView user) {

        //Connection con = null;
        Statement stmt = null;
        ResultSet rst = null;
        String strSQL = "";
        List<A2290Filter> listaPaises = new ArrayList<A2290Filter>();
        A2290Filter pais;

        try {

            strSQL = "SELECT SCOUNTRY, "
                    + "IFNULL((SELECT TRIM(A006KEY1) FROM PRAXIS.A006 WHERE LENGTH(RTRIM(A006KEY)) = 2 AND A006KEY=SCOUNTRY GROUP BY A006KEY1),'') AS DES_SCOUNTRY"
                    + " FROM PRAXIS.A2290T WHERE CCUST = '139' AND SCOUNTRY <> '' GROUP BY SCOUNTRY ORDER BY SCOUNTRY";

            //con = Proveedor.getConnectionIS(user);
            stmt = con.createStatement();
            rst = stmt.executeQuery(strSQL);

            while (rst.next()) {
                pais = new A2290Filter();
                pais.SCOUNTRY = rst.getString("SCOUNTRY").trim();
                pais.strDescCountry = rst.getString("DES_SCOUNTRY").trim();
                if (pais.strDescCountry.contains("VENEZUELA")) {
                    pais.strDescCountry = "VENEZUELA";
                }
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

    public List<A2826Filter> loadPaisesA2826(Connection con, UserView user) {

        //Connection con = null;
        Statement stmt = null;
        ResultSet rst = null;
        String strSQL = "";
        List<A2826Filter> listaPaises = new ArrayList<A2826Filter>();
        A2826Filter pais;

        try {

            strSQL = "SELECT CCIA , IFNULL((SELECT TRIM(A005KEY2) FROM PRAXIS.A005 WHERE  A005KEY=CCIA GROUP BY A005KEY2),'''') AS DES_CCIA FROM PRAXIS.A2826 WHERE CCIA <> '139' AND CCUST='139' GROUP BY CCIA ORDER BY CCIA";

            //con = Proveedor.getConnectionIS(user);
            stmt = con.createStatement();
            rst = stmt.executeQuery(strSQL);

            while (rst.next()) {
                pais = new A2826Filter();
                pais.CCIA = rst.getString("CCIA").trim();
                pais.strDescripcion = rst.getString("DES_CCIA").trim();
                if (pais.strDescripcion.contains("VENEZUELA")) {
                    pais.strDescripcion = "VENEZUELA";
                }
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

    public List<A1691Filter> loadSourceA1691(Connection con, UserView user) {

        //Connection con = null;
        Statement stmt = null;
        ResultSet rst = null;
        String strSQL = "";
        List<A1691Filter> listaPaises = new ArrayList<A1691Filter>();
        A1691Filter pais;

        try {

            strSQL = "SELECT NOMFILE "
                    + " FROM PRAXIS.A2366 GROUP BY NOMFILE ORDER BY NOMFILE";

            //con = Proveedor.getConnectionIS(user);
            stmt = con.createStatement();
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

    public List<A2287> loadRejections(Connection con, UserView user) {

        //Connection con = null;
        Statement stmt = null;
        ResultSet rst = null;
        String strSQL = "";
        List<A2287> listaRejections = new ArrayList<A2287>();
        A2287 rejection;

        try {

            strSQL = "SELECT CODEREJ, DESCREJ FROM PRAXIS.A2287 ORDER BY CODEREJ";

            stmt = con.createStatement();
            rst = stmt.executeQuery(strSQL);

            while (rst.next()) {
                rejection = new A2287();
                rejection.CODEREJ = rst.getString("CODEREJ").trim();
                rejection.DESCREJ = rst.getString("DESCREJ").trim();
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

    public HashMap<String, String> loadPaisesHash(Connection con, UserView user) {

        //Connection con = null;
        Statement stmt = null;
        ResultSet rst = null;
        String strSQL = "";
        HashMap<String, String> hmPaises = new HashMap<String, String>();

        try {

            strSQL = "SELECT A006KEY, A006KEY1 FROM PRAXIS.A006 WHERE LENGTH(RTRIM(A006KEY)) = 2 ";

            stmt = con.createStatement();
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

        return hmPaises;
    }

    public HashMap<String, String> loadCiudadesHash(Connection con, UserView user) {

        //Connection con = null;
        Statement stmt = null;
        ResultSet rst = null;
        String strSQL = "";
        HashMap<String, String> hmCiudades = new HashMap<String, String>();

        try {

            strSQL = "SELECT A1007CTATO, A1007NOMBR, A1007CIUD, A1007NOMCD, A1007PAIS "
                    + "FROM PRAXIS.A1007 ORDER BY A1007CTATO ";

            //con = Proveedor.getConnectionIS(user);
            stmt = con.createStatement();
            rst = stmt.executeQuery(strSQL);

            while (rst.next()) {
                hmCiudades.put(rst.getString("A1007CTATO").trim(), rst.getString("A1007NOMBR").trim());
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

        return hmCiudades;
    }

    public HashMap<String, String> loadZonasHash(Connection con, UserView user) {

        //Connection con = null;
        Statement stmt = null;
        ResultSet rst = null;
        String strSQL = "";
        HashMap<String, String> hmZona = new HashMap<String, String>();

        try {

            strSQL = "SELECT ATOS, ZONA "
                    + "FROM PRAXIS.A1708 WHERE LENGTH(RTRIM(ATOS)) = 3 ORDER BY ATOS ";

            //con = Proveedor.getConnectionIS(user);
            stmt = con.createStatement();
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

        return hmZona;
    }

    public HashMap<String, String> loadZonasHash6(Connection con, UserView user) {

        //Connection con = null;
        Statement stmt = null;
        ResultSet rst = null;
        String strSQL = "";
        HashMap<String, String> hmZona2 = new HashMap<String, String>();

        try {

            strSQL = "SELECT ATOS, ZONA "
                    + "FROM PRAXIS.A1708 WHERE LENGTH(RTRIM(ATOS)) = 6 AND TREG = 2 ORDER BY ATOS ";

            //con = Proveedor.getConnectionIS(user);
            stmt = con.createStatement();
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

        return hmZona2;
    }

    public List<String> loadPeriodosA1607(Connection con, UserView user) {

        //Connection con = null;
        Statement stmt = null;
        ResultSet rst = null;
        String strSQL = "";
        List<String> listaPeriodos = new ArrayList<String>();

        try {

            strSQL = "SELECT A1607PDAM, A1607PDAW, A1607PCYC FROM "
                    + "PRAXIS.A1607 WHERE A1607PDAM <> '' AND A1607PDAW <> '' "
                    + "AND A1607PCYC <> '' GROUP BY A1607PDAM, A1607PDAW, A1607PCYC";

            stmt = con.createStatement();
            rst = stmt.executeQuery(strSQL);

            while (rst.next()) {
                listaPeriodos.add(rst.getString("A1607PDAM").trim() + rst.getString("A1607PDAW").trim() + rst.getString("A1607PCYC").trim());
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

        return listaPeriodos;
    }

    public List<String> loadMonedas(Connection con, UserView user) {

        //Connection con = null;
        Statement stmt = null;
        ResultSet rst = null;
        String strSQL = "";
        List<String> listaMonedas = new ArrayList<String>();

        try {

            strSQL = "SELECT A006MONEDA FROM PRAXIS.A006 WHERE LENGTH(RTRIM(A006MONEDA)) = 3 GROUP BY A006MONEDA ORDER BY A006MONEDA";

            stmt = con.createStatement();
            rst = stmt.executeQuery(strSQL);

            while (rst.next()) {
                listaMonedas.add(rst.getString("A006MONEDA").trim());
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

        return listaMonedas;
    }

    public HashMap<String, String> loadPaisesHM(Connection con, UserView user) {

        //Connection con = null;
        Statement stmt = null;
        ResultSet rst = null;
        String strSQL = "";
        HashMap<String, String> hmPaises = new HashMap<String, String>();

        try {

            strSQL = "SELECT A006KEY, A006KEY1 FROM PRAXIS.A006 WHERE LENGTH(RTRIM(A006KEY)) = 2 ";

            //con = Proveedor.getConnectionIS(user);
            stmt = con.createStatement();
            rst = stmt.executeQuery(strSQL);

            while (rst.next()) {
                //CODIGO, NOMBRE PAIS
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

        return hmPaises;
    }

    public HashMap<String, String> loadNombrePaisesXmonedaHM(Connection con, UserView user) {

        //Connection con = null;
        Statement stmt = null;
        ResultSet rst = null;
        String strSQL = "";
        HashMap<String, String> hmPaises = new HashMap<String, String>();

        try {

            strSQL = "SELECT A006KEY, A006KEY1 FROM PRAXIS.A006 WHERE LENGTH(RTRIM(A006KEY)) = 3 ";

            //con = Proveedor.getConnectionIS(user);
            stmt = con.createStatement();
            rst = stmt.executeQuery(strSQL);

            while (rst.next()) {
                //CODIGO, NOMBRE PAIS
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

        return hmPaises;
    }

    public HashMap<String, String> loadAirlinesHash(Connection con, String calfa) {

        //Connection con = null;
        Statement stmt = null;
        ResultSet rst = null;
        String strSQL = "";
        HashMap<String, String> hmAerolineas = new HashMap<String, String>();

        try {

            strSQL = "SELECT A005KEY, A005KEY2, A005KEY3 FROM PRAXIS.A005 WHERE A005KEY NOT LIKE '%*%' AND A005KEY<>''";

            //con = Proveedor.getConnectionIS(user);
            stmt = con.createStatement();
            rst = stmt.executeQuery(strSQL);

            while (rst.next()) {
                if (rst.getString("A005KEY3").trim().isEmpty()) {
                    hmAerolineas.put(rst.getString("A005KEY").trim(), rst.getString("A005KEY2").trim());
                } else {
                    hmAerolineas.put(rst.getString("A005KEY").trim(), rst.getString("A005KEY3").trim());
                }
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

        return hmAerolineas;
    }

    public List<A005> loadAirlines(Connection con, String calfa, UserView user) {

        //Connection con = null;
        Statement stmt = null;
        ResultSet rst = null;
        String strSQL = "";
        A005 airline = null;
        List<A005> listaAerolineas = new ArrayList<A005>();
        //A005KEY3(Nombre Comercial) / A005KEY2(Nombre Aerolinea)
        strSQL = "SELECT A005KEY, A005KEY2, A005KEY3 FROM PRAXIS.A005 WHERE A005KEY NOT LIKE '%*%' AND A005KEY<>''";

        try {
            //con = Proveedor.getConnectionIS(user);
            stmt = con.createStatement();
            rst = stmt.executeQuery(strSQL);
            while (rst.next()) {
                airline = new A005();
                airline.A005KEY = rst.getString("A005KEY").trim();
                if (rst.getString("A005KEY3").trim().equals("")) {
                    airline.A005KEY2 = rst.getString("A005KEY2").trim();
                } else {
                    airline.A005KEY2 = rst.getString("A005KEY3").trim();
                }
                listaAerolineas.add(airline);
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

        return listaAerolineas;
    }

    public List<A005D> loadAirlinesD(Connection con, String calfa, UserView user) {

        //Connection con = null;
        Statement stmt = null;
        ResultSet rst = null;
        String strSQL = "";
        A005D airline = null;
        List<A005D> listaAerolineas = new ArrayList<A005D>();
        //A005KEY3(Nombre Comercial) / A005KEY2(Nombre Aerolinea)
        strSQL = "SELECT A005KEY, A005KEY2, A005KEY3 FROM PRAXIS.A005 WHERE A005KEY NOT LIKE '%*%' AND A005KEY<>''";

        try {
            //con = Proveedor.getConnectionIS(user);
            stmt = con.createStatement();
            rst = stmt.executeQuery(strSQL);
            while (rst.next()) {
                airline = new A005D();
                airline.A005KEY = rst.getString("A005KEY").trim();
                if (rst.getString("A005KEY3").trim().equals("")) {
                    airline.A005KEY2 = rst.getString("A005KEY2").trim();
                } else {
                    airline.A005KEY2 = rst.getString("A005KEY3").trim();
                }
                listaAerolineas.add(airline);
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

        return listaAerolineas;
    }

    public List<A005> loadAirlinesAlfa(Connection con, UserView user) {

        //Connection con = null;
        Statement stmt = null;
        ResultSet rst = null;
        String strSQL = "";
        A005 airline = null;
        List<A005> listaAerolineas = new ArrayList<A005>();
        //A005KEY3(Nombre Comercial) / A005KEY2(Nombre Aerolinea)
        strSQL = "SELECT A005KEY1, A005KEY2, A005KEY3 FROM PRAXIS.A005 WHERE A005KEY NOT LIKE '%*%' AND A005KEY<>'' ORDER BY A005KEY1";

        try {
            //con = Proveedor.getConnectionIS(user);
            stmt = con.createStatement();
            rst = stmt.executeQuery(strSQL);
            while (rst.next()) {
                airline = new A005();
                airline.A005KEY = rst.getString("A005KEY1").trim();
                if (rst.getString("A005KEY3").trim().equals("")) {
                    airline.A005KEY2 = rst.getString("A005KEY2").trim();
                } else {
                    airline.A005KEY2 = rst.getString("A005KEY3").trim();
                }
                listaAerolineas.add(airline);
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

        return listaAerolineas;
    }

    public List<A005wr> loadAirlineswr(Connection con, String calfa, UserView user) {

        //Connection con = null;
        Statement stmt = null;
        ResultSet rst = null;
        String strSQL = "";
        A005wr airline = null;
        List<A005wr> listaAerolineaswr = new ArrayList<A005wr>();
        //A005KEY3(Nombre Comercial) / A005KEY2(Nombre Aerolinea)
        strSQL = "SELECT A005KEY, A005KEY2, A005KEY3 FROM PRAXIS.A005 WHERE A005KEY NOT LIKE '%*%' AND A005KEY<>''";

        try {
            //con = Proveedor.getConnectionIS(user);
            stmt = con.createStatement();
            rst = stmt.executeQuery(strSQL);
            while (rst.next()) {
                airline = new A005wr();
                airline.A005KEY = rst.getString("A005KEY").trim();
                if (rst.getString("A005KEY3").trim().equals("")) {
                    airline.A005KEY2 = rst.getString("A005KEY2").trim();
                } else {
                    airline.A005KEY2 = rst.getString("A005KEY3").trim();
                }
                listaAerolineaswr.add(airline);
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

        return listaAerolineaswr;
    }

    public List<HashMap<String, String>> loadCiudadesA1007(Connection con, UserView user) {

        Statement stmt = null;
        ResultSet rst = null;
        String strSQL = "";
        List<HashMap<String, String>> listado = new ArrayList<HashMap<String, String>>();
        HashMap<String, String> hm;

        try {

            strSQL = "SELECT A.A1007CTATO, A.A1007PAIS, A.A1007NOMCD, A.A1007CIUD "
                    + "FROM PRAXIS.A1007 A ORDER BY A.A1007CIUD ";

            con = Proveedor.getConnectionIS(user);
            stmt = con.createStatement();
            rst = stmt.executeQuery(strSQL);

            while (rst.next()) {
                hm = new HashMap<String, String>();
                hm.put("A1007CTATO", rst.getString("A1007CTATO").trim());
                hm.put("A1007CIUD", rst.getString("A1007CIUD").trim());
                hm.put("A1007NOMCD", rst.getString("A1007NOMCD").trim());
                hm.put("A1007PAIS", rst.getString("A1007PAIS").trim());
                listado.add(hm);
            }
            try {
                rst.close();
            } catch (SQLException e) {
                logError.error("Message: " + e.getMessage(), e);
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

        return listado;
    }

    public List<A1852Filter> loadSource(Connection con, UserView user) {

        //Connection con = null;
        Statement stmt = null;
        ResultSet rst = null;
        String strSQL = "";
        List<A1852Filter> listaSource = new ArrayList<A1852Filter>();
        A1852Filter source;

        try {

            strSQL = "SELECT CODSOUR, DESSOU FROM PRAXIS.A1852 ORDER BY CODSOUR";

            //con = Proveedor.getConnectionIS(user);
            stmt = con.createStatement();
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

    public List<A1852FilterD> loadSource_D(Connection con, UserView user) {

        //Connection con = null;
        Statement stmt = null;
        ResultSet rst = null;
        String strSQL = "";
        List<A1852FilterD> listaSource = new ArrayList<A1852FilterD>();
        A1852FilterD source;

        try {

            strSQL = "SELECT CODSOUR, DESSOU FROM PRAXIS.A1852 ORDER BY CODSOUR";

            //con = Proveedor.getConnectionIS(user);
            stmt = con.createStatement();
            rst = stmt.executeQuery(strSQL);

            while (rst.next()) {
                source = new A1852FilterD();
                source.CODSOUR = rst.getString("CODSOUR").trim();
                source.DESSOU = rst.getString("DESSOU").trim();
                listaSource.add(source);
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

        return listaSource;
    }

    public List<A2280Filter> loadCardBank(Connection con, UserView user) {

        //Connection con = null;
        Statement stmt = null;
        ResultSet rst = null;
        String strSQL = "";
        List<A2280Filter> listaPaises = new ArrayList<A2280Filter>();
        A2280Filter pais;

        try {

            strSQL = "SELECT CODECAR, NAMECAR FROM PRAXIS.A2280A GROUP BY CODECAR, NAMECAR ORDER BY CODECAR";

            //con = Proveedor.getConnectionIS(user);
            stmt = con.createStatement();
            rst = stmt.executeQuery(strSQL);

            while (rst.next()) {
                pais = new A2280Filter();
                pais.CODEBANK = rst.getString("CODECAR").trim();
                pais.NAMEBANK = rst.getString("NAMECAR").trim();

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

    public HashMap<String, String> loadCardHash(Connection con, UserView user) {

        //Connection con = null;
        Statement stmt = null;
        ResultSet rst = null;
        String strSQL = "";
        HashMap<String, String> hmDescCard = new HashMap<String, String>();

        try {

            strSQL = "SELECT CODECAR, NAMECAR FROM PRAXIS.A2280 GROUP BY CODECAR, NAMECAR ORDER BY CODECAR";

            stmt = con.createStatement();
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

    public HashMap<String, String> loadRejectionHash(Connection con, UserView user) {

        //Connection con = null;
        Statement stmt = null;
        ResultSet rst = null;
        String strSQL = "";
        HashMap<String, String> hmDescCard = new HashMap<String, String>();

        try {

            strSQL = "SELECT CODEREJ, DESCREJ FROM PRAXIS.A2287 ORDER BY CODEREJ";

            stmt = con.createStatement();
            rst = stmt.executeQuery(strSQL);

            while (rst.next()) {
                hmDescCard.put(rst.getString("CODEREJ").trim(), rst.getString("DESCREJ").trim());
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

    public HashMap<String, String> loadErrorHash(Connection con, UserView user) {

        //Connection con = null;
        Statement stmt = null;
        ResultSet rst = null;
        String strSQL = "";
        HashMap<String, String> hmDescError = new HashMap<String, String>();

        try {

            strSQL = "SELECT CODEM, DESCR FROM PRAXIS.A2353 ORDER BY CODEM";

            stmt = con.createStatement();
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

    public HashMap<String, String> loadBankHash(Connection con, UserView user) {

        //Connection con = null;
        Statement stmt = null;
        ResultSet rst = null;
        String strSQL = "";
        HashMap<String, String> hmDescCard = new HashMap<String, String>();

        try {

            strSQL = "SELECT CODEBANK, NAMEBANK FROM PRAXIS.A2281 ORDER BY CODEBANK";

            stmt = con.createStatement();
            rst = stmt.executeQuery(strSQL);

            while (rst.next()) {
                hmDescCard.put(rst.getString("CODEBANK").trim(), rst.getString("NAMEBANK").trim());
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

    public List<A2280> loadBanks(Connection con, UserView user) {

        //Connection con = null;
        Statement stmt = null;
        ResultSet rst = null;
        String strSQL = "";
        List<A2280> listaBancos = new ArrayList<A2280>();
        A2280 banco;

        try {

            strSQL = "SELECT CODEBANK, NAMEBANK FROM PRAXIS.A2281 GROUP BY CODEBANK, NAMEBANK ORDER BY CODEBANK ";

            //con = Proveedor.getConnectionIS(user);
            stmt = con.createStatement();
            rst = stmt.executeQuery(strSQL);

            while (rst.next()) {
                banco = new A2280();
                banco.CODEBANK = rst.getString("CODEBANK").trim();
                banco.NAMEBANK = rst.getString("NAMEBANK").trim();
                listaBancos.add(banco);
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

        return listaBancos;
    }

    public HashMap<String, String> loadCurrencyHash(Connection con, UserView user) {

        //Connection con = null;
        Statement stmt = null;
        ResultSet rst = null;
        String strSQL = "";
        HashMap<String, String> hmDescCard = new HashMap<String, String>();

        try {

            strSQL = "SELECT A006KEY, A006MONEDA FROM PRAXIS.A006 WHERE LENGTH(TRIM(A006KEY))=3 "
                    + "AND TRIM(A006MONEDA) <> '' ORDER BY A006KEY";

            stmt = con.createStatement();
            rst = stmt.executeQuery(strSQL);

            while (rst.next()) {
                hmDescCard.put(rst.getString("A006KEY").trim(), rst.getString("A006MONEDA").trim().substring(3));
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

    public List<A2826> loadZONA(Connection con, String calfa, UserView user) {

        //Connection con = null;
        Statement stmt = null;
        ResultSet rst = null;
        String strSQL = "";
        A2826 zona = null;
        List<A2826> listaZona = new ArrayList<A2826>();

        strSQL = "SELECT ZONA FROM PRAXIS.A2826 GROUP BY ZONA ORDER BY ZONA DESC";

        try {
            //con = Proveedor.getConnectionIS(user);
            stmt = con.createStatement();
            rst = stmt.executeQuery(strSQL);
            while (rst.next()) {
                zona = new A2826();
                zona.ZONA = rst.getString("ZONA").trim();

                listaZona.add(zona);
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

        return listaZona;
    }

    public HashMap<String, String> loadTransction(Connection con, UserView user) {

        //Connection con = null;
        Statement stmt = null;
        ResultSet rst = null;
        String strSQL = "";
        HashMap<String, String> hmDescTran = new HashMap<String, String>();

        try {

            strSQL = "SELECT A003KEY, A003KEY1 FROM PRAXIS.A003 GROUP BY A003KEY, A003KEY1 ORDER BY A003KEY";

            stmt = con.createStatement();
            rst = stmt.executeQuery(strSQL);

            while (rst.next()) {
                hmDescTran.put(rst.getString("A003KEY").trim(), rst.getString("A003KEY1").trim());
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

        return hmDescTran;
    }

    public List<A1686> loadFuentesCargaA1686(UserView user) {

        Connection con = null;
        Statement stmt = null;
        ResultSet rst = null;
        String strSQL = "";
        A1686 fuente = null;
        List<A1686> listaFuentes = new ArrayList<A1686>();
        HashMap hmDesc = new HashMap();
        //hmDesc.put("EMD", "EMD"); //IGUALES NO SE TOMARAN EN CUENTA
        //hmDesc.put("IXC", "IXC");
        hmDesc.put("SISI", "SIS IB");
        hmDesc.put("SISO", "SIS OB");
        hmDesc.put("ISR", "TCN (ISR)");
        hmDesc.put("EMDN", "EMD Delta");
        //hmDesc.put("ODS", "ODS");
        //hmDesc.put("SSIM", "SSIM");
        //hmDesc.put("VCR", "VCR");
        //hmDesc.put("XL", "XL");
        //hmDesc.put("OCR", "OCR");
        
        strSQL = "SELECT FUENTE FROM PRAXIS.A1686 WHERE FUENTE <> '' GROUP BY FUENTE ORDER BY FUENTE ";

        try {
//            con = Proveedor.getConnectionIS(user);
            con = session.getCNXIBMDB2().getIBMDB2Connection();
            stmt = con.createStatement();
            rst = stmt.executeQuery(strSQL);
            while (rst.next()) {
                fuente = new A1686();
                fuente.FUENTE = rst.getString("FUENTE").trim();
                if(hmDesc.containsKey(fuente.FUENTE)){
                    fuente.MENSA = hmDesc.get(rst.getString("FUENTE").trim()).toString();
                }else{
                    fuente.MENSA = rst.getString("FUENTE").trim();
                }
                listaFuentes.add(fuente);
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
                if (con != null) {
                    try {
                        con.close();
                    } catch (SQLException e) {
                        logError.error("Message: " + e.getMessage(), e);
                    }
                    con = null;
                }
            } catch (Exception ex) {
                ex.printStackTrace();
            }
        }

        return listaFuentes;
    }
}
