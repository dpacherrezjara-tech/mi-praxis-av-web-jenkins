/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.dao.gerencial;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import net.miatech.beans.SQP00768;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.libmiatec.A1248;
import net.miatech.praxis.exceptions.SpringException;
import org.apache.log4j.Logger;

/**
 *
 * @author lmendoza
 */
public class BusinessToolsDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public BusinessToolsDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public BusinessToolsDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A1248> loadFiles(String tabla) throws Exception {

        List<A1248> lista = new ArrayList<>();
        A1248 record;

        CallableStatement cstmt = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00835(?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, tabla);
            cstmt.execute();

            rst = cstmt.getResultSet();
            while (rst.next()) {

                record = new A1248();
                record.SOURCEF = rst.getString("SOURCEF");
                record.TABNAME = rst.getString("TABNAME");
                record.DESCRIPT = rst.getString("DESCRIPT");
                record.USERFIELD = rst.getString("USERFIELD");
                record.SYSTFIELD = rst.getString("SYSTFIELD");
                record.DATATYPE = rst.getString("DATATYPE");
                record.strModul = rst.getString("MODUL");
                record.strColor = rst.getString("COLOR");

                lista.add(record);
            }
            try {
                rst.close();
            } catch (SQLException e) {
                throw new SpringException(e);
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (rst != null) {
                    try {
                        rst.close();
                    } catch (SQLException e) {
                        throw new SpringException(e);
                    }
                }
                if (cstmt != null) {
                    try {
                        cstmt.close();
                    } catch (SQLException e) {
                        throw new SpringException(e);
                    }
                }
                session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            } catch (Exception e) {
            }

            pasarGarbageCollector();
        }

        return lista;
    }

    public List<A1248> loadPX275SQP01033(String tabla1, String tabla2) throws Exception {
        List<A1248> lista = new ArrayList<>();
        A1248 record;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP01033(?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, tabla1);
            cstmt01.setString(3, tabla2);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {

                record = new A1248();
                record.TABNAME = rs01.getString("TABNAME").trim();
                record.ALIAS = rs01.getString("ALIAS");
                record.COLOR = rs01.getString("COLOR");
                record.USERFIELD = rs01.getString("USERFIELD").trim();
                record.DESCRIPT = rs01.getString("DESCRIPT").trim();
                record.SYSTFIELD = rs01.getString("SYSTFIELD").trim();
                record.DATATYPE = rs01.getString("DATATYPE").trim();
                record.SUBSTRFL = rs01.getString("SUBSTRFL").trim();
                record.LENGHTF = rs01.getInt("LENGHTF");
                record.DECIMALF = rs01.getInt("DECIMALF");
                //record.FHELP = rs01.getString("FHELP").trim();
                record.DCOLHDG = rs01.getString("DCOLHDG").trim();
                record.FLAGUPDATE = rs01.getString("FLAGUPDATE").trim();
                record.FIELDTYPE = rs01.getString("FIELDTYPE").trim();
                record.strExample = rs01.getString("FHELP").trim();
                if (rs01.getString("DCOLHDG").contains("*")) {
                    record.FLAG = "1";
                    record.DCOLHDG = "\t " + rs01.getString("DCOLHDG").trim().replace("*", "\t \n \t");
                }

                lista.add(record);
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (rs01 != null) {
                try {
                    rs01.close();
                } catch (SQLException e) {
                    throw new SpringException(e);
                }
            }
            if (cstmt01 != null) {
                try {
                    cstmt01.close();
                } catch (SQLException e) {
                    throw new SpringException(e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }
        return lista;
    }

    public List<SQP00768> loadPX275SQP01034(String tabla1) throws Exception {
        List<SQP00768> lista = new ArrayList<>();
        SQP00768 record;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP01034(?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, tabla1);
            cstmt01.setString(3, session.getUserView().getCustomerInfo().USR.trim());

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();

            while (rs01.next()) {

                record = new SQP00768();
                record.strCodigo = rs01.getString("CODIGO");
                record.strDescrip = rs01.getString("DESCRIP");
                record.IN_TABLA2 = rs01.getString("TABJOIN");
                lista.add(record);
            }
            try {
                rs01.close();
            } catch (SQLException e) {
                throw new SpringException(e);
            }
            cstmt01.close();

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (rs01 != null) {
                    try {
                        rs01.close();
                    } catch (SQLException e) {
                        throw new SpringException(e);
                    }
                }
                if (cstmt01 != null) {
                    cstmt01.close();
                }
            } catch (Exception ex) {
                ex.printStackTrace();
            }
        }

        return lista;
    }

    public List<SQP00768> loadPXPRUEBA(SQP00768 filter) throws Exception {

        //Para traer data del Programa de Query del Manifiesto de Vuelo
        List<SQP00768> lista = new ArrayList<SQP00768>(0);
        SQP00768 obj;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "";
        double TOT1 = 0, TOT2 = 0, TOT3 = 0, TOT4 = 0, TOT5 = 0, TOT6 = 0, TOT7 = 0, TOT8 = 0, TOT9 = 0, TOT10 = 0;
        double TOT11 = 0, TOT12 = 0, TOT13 = 0, TOT14 = 0, TOT15 = 0, TOT16 = 0, TOT17 = 0, TOT18 = 0, TOT19 = 0, TOT20 = 0;
        double TOT21 = 0, TOT22 = 0, TOT23 = 0, TOT24 = 0, TOT25 = 0, TOT26 = 0, TOT27 = 0, TOT28 = 0, TOT29 = 0, TOT30 = 0;
        double TOT31 = 0, TOT32 = 0, TOT33 = 0, TOT34 = 0, TOT35 = 0, TOT36 = 0, TOT37 = 0, TOT38 = 0, TOT39 = 0, TOT40 = 0;
        double TOT41 = 0, TOT42 = 0, TOT43 = 0, TOT44 = 0, TOT45 = 0, TOT46 = 0, TOT47 = 0, TOT48 = 0, TOT49 = 0, TOT50 = 0;
        double TOT51 = 0, TOT52 = 0, TOT53 = 0, TOT54 = 0, TOT55 = 0, TOT56 = 0, TOT57 = 0, TOT58 = 0, TOT59 = 0, TOT60 = 0;
        double TOT61 = 0, TOT62 = 0, TOT63 = 0, TOT64 = 0, TOT65 = 0, TOT66 = 0, TOT67 = 0, TOT68 = 0, TOT69 = 0, TOT70 = 0;
        double TOT71 = 0, TOT72 = 0, TOT73 = 0, TOT74 = 0, TOT75 = 0, TOT76 = 0, TOT77 = 0;
        SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00768(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;

        if ("1".equals(filter.IN_FLAG_CPN_SALE)) {
            String strSql_FVLO = "";
            String strSql_NVLO = "";
            String strSql_ORI = "";
            String strSql_DES = "";
            String strSql_VALUE= "";

            strSql_FVLO = " CASE WHEN A1692.CUPON ='1' THEN  A720FVLO1  "
                    + "WHEN A1692.CUPON='2' THEN  A720FVLO2   "
                    + "WHEN A1692.CUPON='3' THEN  A720FVLO3   "
                    + "WHEN A1692.CUPON='4' THEN  A720FVLO4   END AS A720FVLO";

            strSql_NVLO = " CASE WHEN A1692.CUPON='1' THEN  A720NVLO1  "
                    + "WHEN A1692.CUPON='2' THEN  A720NVLO2   "
                    + "WHEN A1692.CUPON='3' THEN  A720NVLO3   "
                    + "WHEN A1692.CUPON='4' THEN  A720NVLO4   END AS A720NVLO";

            strSql_ORI = " CASE WHEN A1692.CUPON='1' THEN  A720RUTA0  "
                    + "WHEN A1692.CUPON='2' THEN  A720RUTA1   "
                    + "WHEN A1692.CUPON='3' THEN  A720RUTA2   "
                    + "WHEN A1692.CUPON='4' THEN  A720RUTA3   END AS A720RUTA_0";

            strSql_DES = " CASE WHEN A1692.CUPON='1' THEN  A720RUTA1  "
                    + "WHEN A1692.CUPON='2' THEN  A720RUTA2   "
                    + "WHEN A1692.CUPON='3' THEN  A720RUTA3   "
                    + "WHEN A1692.CUPON='4' THEN  A720RUTA4   END AS A720RUTA_1";
            
            strSql_VALUE = " CASE WHEN A1692.CUPON='1' THEN  A720VALOR1  "
                    + "WHEN A1692.CUPON='2' THEN  A720VALOR2   "
                    + "WHEN A1692.CUPON='3' THEN  A720VALOR3   "
                    + "WHEN A1692.CUPON='4' THEN  A720VALOR4   END AS A720VALOR";

            filter.strSelectA = filter.strSelectA.trim() + "," + strSql_FVLO + "," + strSql_NVLO + "," + strSql_ORI + "," + strSql_DES+ "," + strSql_VALUE +", A720FECVTA";
        }
        System.out.println(filter.strSelectA);
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(14, Types.INTEGER);
            cstmt.registerOutParameter(15, Types.INTEGER);
            cstmt.registerOutParameter(16, Types.INTEGER);
            cstmt.registerOutParameter(17, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.strCliente);
            cstmt.setString(3, filter.strFecha);
            cstmt.setString(4, filter.IN_FECHA_FROM);
            cstmt.setString(5, filter.IN_FECHA_TO);
            cstmt.setString(6, filter.strSQL.trim());
            cstmt.setString(7, filter.strSelectA.trim().replace("@", "''"));
            cstmt.setString(8, filter.strSelectN.trim().replace("@", "''"));
            cstmt.setString(9, filter.strOrderBy.trim());
            cstmt.setString(10, filter.IN_SOURCEF.trim());
            cstmt.setString(11, filter.IN_SOURCEF2.trim());
            cstmt.setString(12, filter.IN_TABLA);
            cstmt.setString(13, filter.IN_TABLA2);
            cstmt.setInt(14, filter.page.PAGNUM);
            cstmt.setInt(15, filter.page.PAGROW);
            cstmt.setInt(16, filter.page.TOTPAG);
            cstmt.setInt(17, filter.page.TOTROW);
            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(14);
            filter.page.PAGROW = cstmt.getInt(15);
            filter.page.TOTPAG = cstmt.getInt(16);
            filter.page.TOTROW = cstmt.getInt(17);

            rst = cstmt.getResultSet();

            while (rst.next()) {
                if (!filter.strSelectN.trim().equals("")) {
                    TOT1 = rst.getDouble("tot1");
                    TOT2 = rst.getDouble("tot2");
                    TOT3 = rst.getDouble("tot3");
                    TOT4 = rst.getDouble("tot4");
                    TOT5 = rst.getDouble("tot5");
                    TOT6 = rst.getDouble("tot6");
                    TOT7 = rst.getDouble("tot7");
                    if (filter.RN > 7) {
                        TOT8 = rst.getDouble("tot8");
                        TOT9 = rst.getDouble("tot9");
                        TOT10 = rst.getDouble("tot10");
                        TOT11 = rst.getDouble("tot11");
                        TOT12 = rst.getDouble("tot12");
                        TOT13 = rst.getDouble("tot13");
                        TOT14 = rst.getDouble("tot14");
                    }
                    if (filter.RN > 14) {
                        TOT15 = rst.getDouble("tot15");
                        TOT16 = rst.getDouble("tot16");
                        TOT17 = rst.getDouble("tot17");
                        TOT18 = rst.getDouble("tot18");
                        TOT19 = rst.getDouble("tot19");
                        TOT20 = rst.getDouble("tot20");
                        TOT21 = rst.getDouble("tot21");
                    }
                    if (filter.RN > 21) {
                        TOT22 = rst.getDouble("tot22");
                        TOT23 = rst.getDouble("tot23");
                        TOT24 = rst.getDouble("tot24");
                        TOT25 = rst.getDouble("tot25");
                        TOT26 = rst.getDouble("tot26");
                        TOT27 = rst.getDouble("tot27");
                        TOT28 = rst.getDouble("tot28");
                    }
                    if (filter.RN > 28) {
                        TOT29 = rst.getDouble("tot29");
                        TOT30 = rst.getDouble("tot30");
                        TOT31 = rst.getDouble("tot31");
                        TOT32 = rst.getDouble("tot32");
                        TOT33 = rst.getDouble("tot33");
                        TOT34 = rst.getDouble("tot34");
                        TOT35 = rst.getDouble("tot35");
                    }
                    if (filter.RN > 35) {
                        TOT36 = rst.getDouble("tot36");
                        TOT37 = rst.getDouble("tot37");
                        TOT38 = rst.getDouble("tot38");
                        TOT39 = rst.getDouble("tot39");
                        TOT40 = rst.getDouble("tot40");
                        TOT41 = rst.getDouble("tot41");
                        TOT42 = rst.getDouble("tot42");
                    }
                    if (filter.RN > 42) {
                        TOT43 = rst.getDouble("tot43");
                        TOT44 = rst.getDouble("tot44");
                        TOT45 = rst.getDouble("tot45");
                        TOT46 = rst.getDouble("tot46");
                        TOT47 = rst.getDouble("tot47");
                        TOT48 = rst.getDouble("tot48");
                        TOT49 = rst.getDouble("tot49");
                    }
                    if (filter.RN > 49) {
                        TOT50 = rst.getDouble("tot50");
                        TOT51 = rst.getDouble("tot51");
                        TOT52 = rst.getDouble("tot52");
                        TOT53 = rst.getDouble("tot53");
                        TOT54 = rst.getDouble("tot54");
                        TOT55 = rst.getDouble("tot55");
                        TOT56 = rst.getDouble("tot56");
                    }
                    if (filter.RN > 56) {
                        TOT57 = rst.getDouble("tot57");
                        TOT58 = rst.getDouble("tot58");
                        TOT59 = rst.getDouble("tot59");
                        TOT60 = rst.getDouble("tot60");
                        TOT61 = rst.getDouble("tot61");
                        TOT62 = rst.getDouble("tot62");
                        TOT63 = rst.getDouble("tot63");
                    }
                    if (filter.RN > 63) {
                        TOT64 = rst.getDouble("tot64");
                        TOT65 = rst.getDouble("tot65");
                        TOT66 = rst.getDouble("tot66");
                        TOT67 = rst.getDouble("tot67");
                        TOT68 = rst.getDouble("tot68");
                        TOT69 = rst.getDouble("tot69");
                        TOT70 = rst.getDouble("tot70");
                    }
                    if (filter.RN > 70) {
                        TOT71 = rst.getDouble("tot71");
                        TOT72 = rst.getDouble("tot72");
                        TOT73 = rst.getDouble("tot73");
                        TOT74 = rst.getDouble("tot74");
                        TOT75 = rst.getDouble("tot75");
                        TOT76 = rst.getDouble("tot76");
                        TOT77 = rst.getDouble("tot77");
                    }
                }
            }
            rst.close();
            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();
                while (rst.next()) {
                    obj = new SQP00768();
                    obj.RN = rst.getLong("RN");

                    obj.column1 = rst.getString("column1");
                    obj.column2 = rst.getString("column2");
                    obj.column3 = rst.getString("column3");
                    obj.column4 = rst.getString("column4");
                    obj.column5 = rst.getString("column5");
                    obj.column6 = rst.getString("column6");
                    obj.column7 = rst.getString("column7");

                    if (filter.RN > 7) {
                        obj.column8 = rst.getString("column8");
                        obj.column9 = rst.getString("column9");
                        obj.column10 = rst.getString("column10");
                        obj.column11 = rst.getString("column11");
                        obj.column12 = rst.getString("column12");
                        obj.column13 = rst.getString("column13");
                        obj.column14 = rst.getString("column14");
                    }
                    if (filter.RN > 14) {
                        obj.column15 = rst.getString("column15");
                        obj.column16 = rst.getString("column16");
                        obj.column17 = rst.getString("column17");
                        obj.column18 = rst.getString("column18");
                        obj.column19 = rst.getString("column19");
                        obj.column20 = rst.getString("column20");
                        obj.column21 = rst.getString("column21");
                    }
                    if (filter.RN > 21) {
                        obj.column22 = rst.getString("column22");
                        obj.column23 = rst.getString("column23");
                        obj.column24 = rst.getString("column24");
                        obj.column25 = rst.getString("column25");
                        obj.column26 = rst.getString("column26");
                        obj.column27 = rst.getString("column27");
                        obj.column28 = rst.getString("column28");
                    }
                    if (filter.RN > 28) {
                        obj.column29 = rst.getString("column29");
                        obj.column30 = rst.getString("column30");
                        obj.column31 = rst.getString("column31");
                        obj.column32 = rst.getString("column32");
                        obj.column33 = rst.getString("column33");
                        obj.column34 = rst.getString("column34");
                        obj.column35 = rst.getString("column35");
                    }
                    if (filter.RN > 35) {
                        obj.column36 = rst.getString("column36");
                        obj.column37 = rst.getString("column37");
                        obj.column38 = rst.getString("column38");
                        obj.column39 = rst.getString("column39");
                        obj.column40 = rst.getString("column40");
                        obj.column41 = rst.getString("column41");
                        obj.column42 = rst.getString("column42");
                    }
                    if (filter.RN > 42) {
                        obj.column43 = rst.getString("column43");
                        obj.column44 = rst.getString("column44");
                        obj.column45 = rst.getString("column45");
                        obj.column46 = rst.getString("column46");
                        obj.column47 = rst.getString("column47");
                        obj.column48 = rst.getString("column48");
                        obj.column49 = rst.getString("column49");
                    }
                    if (filter.RN > 49) {
                        obj.column50 = rst.getString("column50");
                        obj.column51 = rst.getString("column51");
                        obj.column52 = rst.getString("column52");
                        obj.column53 = rst.getString("column53");
                        obj.column54 = rst.getString("column54");
                        obj.column55 = rst.getString("column55");
                        obj.column56 = rst.getString("column56");
                    }
                    if (filter.RN > 56) {
                        obj.column57 = rst.getString("column57");
                        obj.column58 = rst.getString("column58");
                        obj.column59 = rst.getString("column59");
                        obj.column60 = rst.getString("column60");
                        obj.column61 = rst.getString("column61");
                        obj.column62 = rst.getString("column62");
                        obj.column63 = rst.getString("column63");
                    }
                    if (filter.RN > 63) {
                        obj.column64 = rst.getString("column64");
                        obj.column65 = rst.getString("column65");
                        obj.column66 = rst.getString("column66");
                        obj.column67 = rst.getString("column67");
                        obj.column68 = rst.getString("column68");
                        obj.column69 = rst.getString("column69");
                        obj.column70 = rst.getString("column70");
                    }
                    if (filter.RN > 70) {
                        obj.column71 = rst.getString("column71");
                        obj.column58 = rst.getString("column72");
                        obj.column59 = rst.getString("column73");
                        obj.column60 = rst.getString("column74");
                        obj.column61 = rst.getString("column75");
                        obj.column62 = rst.getString("column76");
                        obj.column63 = rst.getString("column77");
                    }

                    if ("1".equals(filter.IN_FLAG_CPN_SALE)) {
                        obj.A720FVLO = rst.getString("A720FVLO");
                        obj.A720NVLO = rst.getString("A720NVLO");
                        obj.A720RUTA_0 = rst.getString("A720RUTA_0");
                        obj.A720RUTA_1 = rst.getString("A720RUTA_1");
                        obj.A720FECVTA = rst.getString("A720FECVTA");
                        obj.A720VALOR = rst.getDouble("A720VALOR");

                    }
                    
                    obj.tot1 = TOT1;
                    obj.tot2 = TOT2;
                    obj.tot3 = TOT3;
                    obj.tot4 = TOT4;
                    obj.tot5 = TOT5;
                    obj.tot6 = TOT6;
                    obj.tot7 = TOT7;
                    obj.tot8 = TOT8;
                    obj.tot9 = TOT9;
                    obj.tot10 = TOT10;
                    obj.tot11 = TOT11;
                    obj.tot12 = TOT12;
                    obj.tot13 = TOT13;
                    obj.tot14 = TOT14;
                    obj.tot15 = TOT15;
                    obj.tot16 = TOT16;
                    obj.tot17 = TOT17;
                    obj.tot18 = TOT18;
                    obj.tot19 = TOT19;
                    obj.tot20 = TOT20;
                    obj.tot21 = TOT21;
                    obj.tot22 = TOT22;
                    obj.tot23 = TOT23;
                    obj.tot24 = TOT24;
                    obj.tot25 = TOT25;
                    obj.tot26 = TOT26;
                    obj.tot27 = TOT27;
                    obj.tot28 = TOT28;
                    obj.tot29 = TOT29;
                    obj.tot30 = TOT30;
                    obj.tot31 = TOT31;
                    obj.tot32 = TOT32;
                    obj.tot33 = TOT33;
                    obj.tot34 = TOT34;
                    obj.tot35 = TOT35;
                    obj.tot36 = TOT36;
                    obj.tot37 = TOT37;
                    obj.tot38 = TOT38;
                    obj.tot39 = TOT39;
                    obj.tot40 = TOT40;
                    obj.tot41 = TOT41;
                    obj.tot42 = TOT42;
                    obj.tot43 = TOT43;
                    obj.tot44 = TOT44;
                    obj.tot45 = TOT45;
                    obj.tot46 = TOT46;
                    obj.tot47 = TOT47;
                    obj.tot48 = TOT48;
                    obj.tot49 = TOT49;
                    obj.tot50 = TOT50;
                    obj.tot51 = TOT51;
                    obj.tot52 = TOT52;
                    obj.tot53 = TOT53;
                    obj.tot54 = TOT54;
                    obj.tot55 = TOT55;
                    obj.tot56 = TOT56;
                    obj.tot57 = TOT57;
                    obj.tot58 = TOT58;
                    obj.tot59 = TOT59;
                    obj.tot60 = TOT60;
                    obj.tot61 = TOT61;
                    obj.tot62 = TOT62;
                    obj.tot63 = TOT63;
                    obj.tot64 = TOT64;
                    obj.tot65 = TOT65;
                    obj.tot66 = TOT66;
                    obj.tot67 = TOT67;
                    obj.tot68 = TOT68;
                    obj.tot69 = TOT69;
                    obj.tot70 = TOT70;
                    obj.tot71 = TOT71;
                    obj.tot72 = TOT72;
                    obj.tot73 = TOT73;
                    obj.tot74 = TOT74;
                    obj.tot75 = TOT75;
                    obj.tot76 = TOT76;
                    obj.tot77 = TOT77;

                    obj.page.PAGNUM = filter.page.PAGNUM;
                    obj.page.PAGROW = filter.page.PAGROW;
                    obj.page.TOTPAG = filter.page.TOTPAG;
                    obj.page.TOTROW = filter.page.TOTROW;

                    lista.add(obj);
                }

            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (rst != null) {
                try {
                    rst.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            if (cstmt != null) {
                try {
                    cstmt.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return lista;
    }

    public List<SQP00768> loadPXPRUEBA2(SQP00768 filter) throws Exception {

        //Para traer data del Programa de Query del Manifiesto de Vuelo
        List<SQP00768> lista = new ArrayList<>(0);
        SQP00768 obj;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "";
        long totQTY = 0;
        double TOT1 = 0, TOT2 = 0, TOT3 = 0, TOT4 = 0, TOT5 = 0, TOT6 = 0, TOT7 = 0, TOT8 = 0, TOT9 = 0, TOT10 = 0;
        double TOT11 = 0, TOT12 = 0, TOT13 = 0, TOT14 = 0, TOT15 = 0, TOT16 = 0, TOT17 = 0, TOT18 = 0, TOT19 = 0, TOT20 = 0;
        double TOT21 = 0, TOT22 = 0, TOT23 = 0, TOT24 = 0, TOT25 = 0, TOT26 = 0, TOT27 = 0, TOT28 = 0, TOT29 = 0, TOT30 = 0;
        double TOT31 = 0, TOT32 = 0, TOT33 = 0, TOT34 = 0, TOT35 = 0, TOT36 = 0, TOT37 = 0, TOT38 = 0, TOT39 = 0, TOT40 = 0;
        double TOT41 = 0, TOT42 = 0, TOT43 = 0, TOT44 = 0, TOT45 = 0, TOT46 = 0, TOT47 = 0, TOT48 = 0, TOT49 = 0, TOT50 = 0;;
        double TOT51 = 0, TOT52 = 0, TOT53 = 0, TOT54 = 0, TOT55 = 0, TOT56 = 0, TOT57 = 0, TOT58 = 0, TOT59 = 0, TOT60 = 0;;
        double TOT61 = 0, TOT62 = 0, TOT63 = 0;
        SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00825(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
        System.out.println("--> " + SQLCLL01);
        String ff = filter.strSelectA.trim().replace("@", "''");

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(17, Types.INTEGER);
            cstmt.registerOutParameter(18, Types.INTEGER);
            cstmt.registerOutParameter(19, Types.INTEGER);
            cstmt.registerOutParameter(20, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.strCliente);
            cstmt.setString(3, filter.strFecha);
            cstmt.setString(4, filter.IN_FECHA_FROM);
            cstmt.setString(5, filter.IN_FECHA_TO);
            cstmt.setString(6, filter.strSQL.trim());
            cstmt.setString(7, filter.strEtiquetas.trim());
            cstmt.setString(8, filter.strSelect.trim());
            cstmt.setString(9, filter.strSelectA.trim().replace("@", "''"));
            cstmt.setString(10, filter.strSelectN.trim().replace("@", "''"));
            cstmt.setString(11, filter.strOrderBy.trim());
            cstmt.setString(12, filter.strOrderByEtiquetas.trim());
            cstmt.setString(13, filter.IN_SOURCEF.trim());
            cstmt.setString(14, filter.IN_SOURCEF2.trim());
            cstmt.setString(15, filter.IN_TABLA);
            cstmt.setString(16, filter.IN_TABLA2);
            cstmt.setInt(17, filter.page.PAGNUM);
            cstmt.setInt(18, filter.page.PAGROW);
            cstmt.setInt(19, filter.page.TOTPAG);
            cstmt.setInt(20, filter.page.TOTROW);
            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(17);
            filter.page.PAGROW = cstmt.getInt(18);
            filter.page.TOTPAG = cstmt.getInt(19);
            filter.page.TOTROW = cstmt.getInt(20);

            rst = cstmt.getResultSet();

            while (rst.next()) {
                if (!filter.strSelectN.trim().equals("")) {
                    totQTY = rst.getLong("QTY");
                    TOT1 = rst.getDouble("tot1");
                    TOT2 = rst.getDouble("tot2");
                    TOT3 = rst.getDouble("tot3");
                    TOT4 = rst.getDouble("tot4");
                    TOT5 = rst.getDouble("tot5");
                    TOT6 = rst.getDouble("tot6");
                    TOT7 = rst.getDouble("tot7");
                    if (filter.RN > 7) {
                        TOT8 = rst.getDouble("tot8");
                        TOT9 = rst.getDouble("tot9");
                        TOT10 = rst.getDouble("tot10");
                        TOT11 = rst.getDouble("tot11");
                        TOT12 = rst.getDouble("tot12");
                        TOT13 = rst.getDouble("tot13");
                        TOT14 = rst.getDouble("tot14");
                    }
                    if (filter.RN > 14) {
                        TOT15 = rst.getDouble("tot15");
                        TOT16 = rst.getDouble("tot16");
                        TOT17 = rst.getDouble("tot17");
                        TOT18 = rst.getDouble("tot18");
                        TOT19 = rst.getDouble("tot19");
                        TOT20 = rst.getDouble("tot20");
                        TOT21 = rst.getDouble("tot21");
                    }
                    if (filter.RN > 21) {
                        TOT22 = rst.getDouble("tot22");
                        TOT23 = rst.getDouble("tot23");
                        TOT24 = rst.getDouble("tot24");
                        TOT25 = rst.getDouble("tot25");
                        TOT26 = rst.getDouble("tot26");
                        TOT27 = rst.getDouble("tot27");
                        TOT28 = rst.getDouble("tot28");
                    }
                    if (filter.RN > 28) {
                        TOT29 = rst.getDouble("tot29");
                        TOT30 = rst.getDouble("tot30");
                        TOT31 = rst.getDouble("tot31");
                        TOT32 = rst.getDouble("tot32");
                        TOT33 = rst.getDouble("tot33");
                        TOT34 = rst.getDouble("tot34");
                        TOT35 = rst.getDouble("tot35");
                    }
                    if (filter.RN > 35) {
                        TOT36 = rst.getDouble("tot36");
                        TOT37 = rst.getDouble("tot37");
                        TOT38 = rst.getDouble("tot38");
                        TOT39 = rst.getDouble("tot39");
                        TOT40 = rst.getDouble("tot40");
                        TOT41 = rst.getDouble("tot41");
                        TOT42 = rst.getDouble("tot42");
                    }
                    if (filter.RN > 42) {
                        TOT43 = rst.getDouble("tot43");
                        TOT44 = rst.getDouble("tot44");
                        TOT45 = rst.getDouble("tot45");
                        TOT46 = rst.getDouble("tot46");
                        TOT47 = rst.getDouble("tot47");
                        TOT48 = rst.getDouble("tot48");
                        TOT49 = rst.getDouble("tot49");
                    }
                    if (filter.RN > 49) {
                        TOT50 = rst.getDouble("tot50");
                        TOT51 = rst.getDouble("tot51");
                        TOT52 = rst.getDouble("tot52");
                        TOT53 = rst.getDouble("tot53");
                        TOT54 = rst.getDouble("tot54");
                        TOT55 = rst.getDouble("tot55");
                        TOT56 = rst.getDouble("tot56");
                    }
                    if (filter.RN > 56) {
                        TOT57 = rst.getDouble("tot57");
                        TOT58 = rst.getDouble("tot58");
                        TOT59 = rst.getDouble("tot59");
                        TOT60 = rst.getDouble("tot60");
                        TOT61 = rst.getDouble("tot61");
                        TOT62 = rst.getDouble("tot62");
                        TOT63 = rst.getDouble("tot63");
                    }
                }
            }
            rst.close();
            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();
                while (rst.next()) {
                    obj = new SQP00768();
                    obj.QTY = rst.getLong("QTY");

                    obj.column1 = rst.getString("column1");
                    obj.column2 = rst.getString("column2");
                    obj.column3 = rst.getString("column3");
                    obj.column4 = rst.getString("column4");
                    obj.column5 = rst.getString("column5");
                    obj.column6 = rst.getString("column6");
                    obj.column7 = rst.getString("column7");

                    if (filter.RN > 7) {
                        obj.column8 = rst.getString("column8");
                        obj.column9 = rst.getString("column9");
                        obj.column10 = rst.getString("column10");
                        obj.column11 = rst.getString("column11");
                        obj.column12 = rst.getString("column12");
                        obj.column13 = rst.getString("column13");
                        obj.column14 = rst.getString("column14");
                    }
                    if (filter.RN > 14) {
                        obj.column15 = rst.getString("column15");
                        obj.column16 = rst.getString("column16");
                        obj.column17 = rst.getString("column17");
                        obj.column18 = rst.getString("column18");
                        obj.column19 = rst.getString("column19");
                        obj.column20 = rst.getString("column20");
                        obj.column21 = rst.getString("column21");
                    }
                    if (filter.RN > 21) {
                        obj.column22 = rst.getString("column22");
                        obj.column23 = rst.getString("column23");
                        obj.column24 = rst.getString("column24");
                        obj.column25 = rst.getString("column25");
                        obj.column26 = rst.getString("column26");
                        obj.column27 = rst.getString("column27");
                        obj.column28 = rst.getString("column28");
                    }
                    if (filter.RN > 28) {
                        obj.column29 = rst.getString("column29");
                        obj.column30 = rst.getString("column30");
                        obj.column31 = rst.getString("column31");
                        obj.column32 = rst.getString("column32");
                        obj.column33 = rst.getString("column33");
                        obj.column34 = rst.getString("column34");
                        obj.column35 = rst.getString("column35");
                    }
                    if (filter.RN > 35) {
                        obj.column36 = rst.getString("column36");
                        obj.column37 = rst.getString("column37");
                        obj.column38 = rst.getString("column38");
                        obj.column39 = rst.getString("column39");
                        obj.column40 = rst.getString("column40");
                        obj.column41 = rst.getString("column41");
                        obj.column42 = rst.getString("column42");
                    }
                    if (filter.RN > 42) {
                        obj.column43 = rst.getString("column43");
                        obj.column44 = rst.getString("column44");
                        obj.column45 = rst.getString("column45");
                        obj.column46 = rst.getString("column46");
                        obj.column47 = rst.getString("column47");
                        obj.column48 = rst.getString("column48");
                        obj.column49 = rst.getString("column49");
                    }
                    if (filter.RN > 49) {
                        obj.column50 = rst.getString("column50");
                        obj.column51 = rst.getString("column51");
                        obj.column52 = rst.getString("column52");
                        obj.column53 = rst.getString("column53");
                        obj.column54 = rst.getString("column54");
                        obj.column55 = rst.getString("column55");
                        obj.column56 = rst.getString("column56");
                    }
                    if (filter.RN > 56) {
                        obj.column57 = rst.getString("column57");
                        obj.column58 = rst.getString("column58");
                        obj.column59 = rst.getString("column59");
                        obj.column60 = rst.getString("column60");
                        obj.column61 = rst.getString("column61");
                        obj.column62 = rst.getString("column62");
                        obj.column63 = rst.getString("column63");
                    }

                    obj.tot1 = TOT1;
                    obj.tot2 = TOT2;
                    obj.tot3 = TOT3;
                    obj.tot4 = TOT4;
                    obj.tot5 = TOT5;
                    obj.tot6 = TOT6;
                    obj.tot7 = TOT7;
                    obj.tot8 = TOT8;
                    obj.tot9 = TOT9;
                    obj.tot10 = TOT10;
                    obj.tot11 = TOT11;
                    obj.tot12 = TOT12;
                    obj.tot13 = TOT13;
                    obj.tot14 = TOT14;
                    obj.tot15 = TOT15;
                    obj.tot16 = TOT16;
                    obj.tot17 = TOT17;
                    obj.tot18 = TOT18;
                    obj.tot19 = TOT19;
                    obj.tot20 = TOT20;
                    obj.tot21 = TOT21;
                    obj.tot22 = TOT22;
                    obj.tot23 = TOT23;
                    obj.tot24 = TOT24;
                    obj.tot25 = TOT25;
                    obj.tot26 = TOT26;
                    obj.tot27 = TOT27;
                    obj.tot28 = TOT28;
                    obj.tot29 = TOT29;
                    obj.tot30 = TOT30;
                    obj.tot31 = TOT31;
                    obj.tot32 = TOT32;
                    obj.tot33 = TOT33;
                    obj.tot34 = TOT34;
                    obj.tot35 = TOT35;
                    obj.tot36 = TOT36;
                    obj.tot37 = TOT37;
                    obj.tot38 = TOT38;
                    obj.tot39 = TOT39;
                    obj.tot40 = TOT40;
                    obj.tot41 = TOT41;
                    obj.tot42 = TOT42;
                    obj.tot43 = TOT43;
                    obj.tot44 = TOT44;
                    obj.tot45 = TOT45;
                    obj.tot46 = TOT46;
                    obj.tot47 = TOT47;
                    obj.tot48 = TOT48;
                    obj.tot49 = TOT49;
                    obj.tot50 = TOT50;
                    obj.tot51 = TOT51;
                    obj.tot52 = TOT52;
                    obj.tot53 = TOT53;
                    obj.tot54 = TOT54;
                    obj.tot55 = TOT55;
                    obj.tot56 = TOT56;
                    obj.tot57 = TOT57;
                    obj.tot58 = TOT58;
                    obj.tot59 = TOT59;
                    obj.tot60 = TOT60;
                    obj.tot61 = TOT61;
                    obj.tot62 = TOT62;
                    obj.tot63 = TOT63;

                    obj.totQTY = totQTY;

                    obj.page.PAGNUM = filter.page.PAGNUM;
                    obj.page.PAGROW = filter.page.PAGROW;
                    obj.page.TOTPAG = filter.page.TOTPAG;
                    obj.page.TOTROW = filter.page.TOTROW;

                    lista.add(obj);
                }
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (rst != null) {
                try {
                    rst.close();
                } catch (SQLException e) {
                    throw new SpringException(e);
                }
            }
            if (cstmt != null) {
                try {
                    cstmt.close();
                } catch (SQLException e) {
                    throw new SpringException(e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return lista;
    }

    public String loadPX282SQP00777(SQP00768 filter) {
        //REALIZA EL INSERT, UPDATE O DELETE DE UN REGISTRO EN LA TABLA A1702.
        String strMsj = "An Unexpected Error Ocurred.";
        //filter.strSaveQuery = filter.strSaveQuery.trim().replace(filter.IN_TABLA + ".", "");

        CallableStatement cstmt = null;

        Connection cnx = null;
        try {
            String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00777(?,?,?,?,?,?,?,?,?,?,?,?)}";
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(12, Types.VARCHAR);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, session.getUserView().getUserInfo().USR);
            cstmt.setString(3, filter.strFecha);
            cstmt.setString(4, (filter.chkGroup) ? "1" : "");
            cstmt.setString(5, filter.strCodigo);
            cstmt.setString(6, filter.strDescrip);
            cstmt.setString(7, filter.strSaveSelect.trim());
            cstmt.setString(8, filter.strSaveQuery.trim());
            cstmt.setString(9, filter.IN_TABLA);
            cstmt.setString(10, filter.IN_TABLA2);
            cstmt.setString(11, filter.IN_USU);
            cstmt.setString(12, "");
            cstmt.execute();

            strMsj = cstmt.getString(12);

        } catch (Exception e) {
            String mensaje = e.getMessage();
            System.out.println(">>" + mensaje);
            e.getMessage();
        } finally {
            if (cstmt != null) {
                try {
                    cstmt.close();
                } catch (SQLException e) {
                    throw new SpringException(e);
                }
            }
            try {
                session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            } catch (Exception ex) {
                String mensaje = ex.getMessage();
                System.out.println(">>" + mensaje);
                java.util.logging.Logger.getLogger(BusinessToolsDAO.class.getName()).log(Level.SEVERE, null, ex);
            }
            pasarGarbageCollector();
        }

        return strMsj;
    }

    public List<SQP00768> loadPX282SQP00808(String tabla, String codigo) throws Exception {

        List<SQP00768> lista = new ArrayList<>();
        SQP00768 record;
        String[] linea;
        String Queryname = "", Query = "", Fecha = "", TablaJoin = "";
        boolean chkGroup = false;

        Connection cnx = null;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00808(?,?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, session.getUserView().getCustomerInfo().USR);
            cstmt.setString(3, tabla);
            cstmt.setString(4, codigo);
            cstmt.execute();

            rst = cstmt.getResultSet();

            while (rst.next()) {
                TablaJoin = rst.getString("TABJOIN");
                Queryname = rst.getString("DESCRIP");
                Query = rst.getString("QUERYF");
                linea = rst.getString("SELECTF").split(";");
                chkGroup = (rst.getString("FLAGSGB").equals("1") ? true : false);
                Fecha = rst.getString("FECHAF");
                for (int c = 0; c < linea.length; c++) {
                    record = new SQP00768();

                    String[] campos;
                    campos = linea[c].split("\\#");

                    record.strCampo = campos[0];
                    record.strOrderBy = campos[1].replace("@", "");
                    record.strAscDesc = Integer.parseInt(campos[2]);
                    record.orden = Integer.parseInt(campos[3].trim());

                    record.strDescrip = Queryname;
                    record.strSQL = Query;
                    record.chkGroup = chkGroup;
                    record.strFecha = Fecha;
                    record.IN_TABLA2 = TablaJoin;

                    lista.add(record);
                }

            }
            try {
                rst.close();
            } catch (SQLException e) {
                throw new SpringException(e);
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (rst != null) {
                    try {
                        rst.close();
                    } catch (SQLException e) {
                        throw new SpringException(e);
                    }
                }
                if (cstmt != null) {
                    try {
                        cstmt.close();
                    } catch (SQLException e) {
                        throw new SpringException(e);
                    }
                }
                session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            } catch (Exception e) {
            }

            pasarGarbageCollector();
        }

        return lista;
    }

    public List<A1248> loadOperadores() throws Exception {

        List<A1248> lista = new ArrayList<>();
        A1248 record;

        CallableStatement cstmt = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP02860(?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.execute();

            rst = cstmt.getResultSet();
            while (rst.next()) {

                record = new A1248();
                record.OPERADOR = rst.getString("USERFIELD").trim();
                record.DESCRIPT = rst.getString("DESCRIPT").trim();

                lista.add(record);
            }
            try {
                rst.close();
            } catch (SQLException e) {
                throw new SpringException(e);
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (rst != null) {
                    try {
                        rst.close();
                    } catch (SQLException e) {
                        throw new SpringException(e);
                    }
                }
                if (cstmt != null) {
                    try {
                        cstmt.close();
                    } catch (SQLException e) {
                        throw new SpringException(e);
                    }
                }
                session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            } catch (Exception e) {
            }

            pasarGarbageCollector();
        }

        return lista;
    }

    public SQP00768 executeValuation(SQP00768 filter) throws SQLException,Exception {

        List<SQP00768> lista = new ArrayList<>(0);
        SQP00768 obj;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "";
        SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00768U(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;

        try {

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(16, Types.INTEGER);
            cstmt.registerOutParameter(17, Types.INTEGER);
            cstmt.registerOutParameter(18, Types.VARCHAR);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, session.getUserView().getCustomerInfo().USR);
            cstmt.setString(3, filter.strCliente);
            cstmt.setString(4, filter.strFecha);
            cstmt.setString(5, filter.IN_FECHA_FROM);
            cstmt.setString(6, filter.IN_FECHA_TO);
            cstmt.setString(7, filter.strSQL.trim());
            cstmt.setString(8, filter.strSelectA.trim().replace("@", "''"));
            cstmt.setString(9, filter.strSelectN.trim().replace("@", "''"));
            cstmt.setString(10, filter.strOrderBy.trim());
            cstmt.setString(11, filter.IN_SOURCEF.trim());
            cstmt.setString(12, filter.IN_SOURCEF2.trim());
            cstmt.setString(13, filter.IN_TABLA);
            cstmt.setString(14, filter.IN_TABLA2);
            cstmt.setString(15, filter.IN_VALID_MFSTO);
            cstmt.setLong(16, filter.QTY);
            cstmt.setLong(17, filter.QTY_UPDATE);
            cstmt.setString(18, filter.strMSG);

            cstmt.execute();

            filter.QTY = cstmt.getInt(16);
            filter.QTY_UPDATE = cstmt.getInt(17);
            filter.strMSG = cstmt.getString(18);

            
        

        } catch (Exception e) {
            e.printStackTrace();
            filter.strMSG = e.getMessage();
        } finally {
            try {
                if (rst != null) {
                    try {
                        rst.close();
                    } catch (SQLException e) {
                        throw new SpringException(e);
                    }
                }
                if (cstmt != null) {
                    try {
                        cstmt.close();
                    } catch (SQLException e) {
                        throw new SpringException(e);
                    }
                }
                session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            } catch (Exception e) {
            }

            pasarGarbageCollector();
        }

        return filter;
    }
}
