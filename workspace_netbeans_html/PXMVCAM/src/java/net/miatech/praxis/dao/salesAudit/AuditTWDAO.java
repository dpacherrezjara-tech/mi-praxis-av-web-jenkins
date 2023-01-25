/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package net.miatech.praxis.dao.salesAudit;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.SQP00768;
import net.miatech.beans.spring.implement.IServerSession;
import org.apache.log4j.Logger;

/**
 *
 * @author jtorres
 */
public class AuditTWDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public AuditTWDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public AuditTWDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }
    

    public String loadPX449SQP02560(SQP00768 filter) throws SQLException, Exception {
        //REALIZA EL INSERT, UPDATE O DELETE DE UN REGISTRO EN LA TABLA A1702.
        String strMsj = "An Unexpected Error Ocurred.";

        CallableStatement cstmt = null;
        String SQLCLL01="";
        if(!filter.strSQLUpdateReplace.trim().equals("")){
            //Toda la trama de FareBase 
            SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP02572(?,?,?,?,?,?,?,?,?,?,?)}";
        }else{
            //Para un solo FareBase de la Trama
            SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP02560(?,?,?,?,?,?,?,?,?,?,?)}";
        }

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(11, Types.VARCHAR);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, session.getUserView().getUserInfo().USR);
            cstmt.setString(3, filter.strFecha);
            cstmt.setString(4, filter.IN_FECHA_FROM);
            cstmt.setString(5, filter.IN_FECHA_TO);
            cstmt.setString(6, filter.strSQL.trim());
            cstmt.setString(7, filter.strSubstr.trim());
            cstmt.setString(8, filter.strSQLUpdateCampo.trim());
            cstmt.setString(9, filter.strSQLUpdateValor);
            cstmt.setString(10, filter.strSQLUpdateReplace);
            cstmt.setString(11, "");
            cstmt.execute();

            strMsj = cstmt.getString(11);

        } catch (Exception e) {
            strMsj = e.getMessage();
        } finally {
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

        return strMsj;
    }
    
    

    public List<SQP00768> loadPX282SQP02561(SQP00768 filter) throws SQLException, Exception {

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
        double TOT41 = 0, TOT42 = 0, TOT43 = 0, TOT44 = 0, TOT45 = 0, TOT46 = 0, TOT47 = 0, TOT48 = 0, TOT49 = 0, TOT50 = 0;;
        double TOT51 = 0, TOT52 = 0, TOT53 = 0, TOT54 = 0, TOT55 = 0, TOT56 = 0, TOT57 = 0, TOT58 = 0, TOT59 = 0, TOT60 = 0;;
        double TOT61 = 0, TOT62 = 0, TOT63 = 0;
        SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP02561(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
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
    

    public String loadPX449SQP02586(SQP00768 filter) throws SQLException, Exception {
        //REALIZA EL INSERT, UPDATE O DELETE DE UN REGISTRO EN LA TABLA A1702.
        String strMsj = "An Unexpected Error Ocurred.";

        CallableStatement cstmt = null;
        String SQLCLL01="";
        
        SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP02586(?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(13, Types.VARCHAR);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, session.getUserView().getUserInfo().USR);
            cstmt.setString(3, filter.strFecha);
            cstmt.setString(4, filter.IN_FECHA_FROM);
            cstmt.setString(5, filter.IN_FECHA_TO);
            cstmt.setString(6, filter.strSQL.trim());
            cstmt.setString(7, filter.strSubstr.trim());
            cstmt.setString(8, filter.strSQLUpdateCampo.trim());
            cstmt.setString(9, filter.strSQLUpdateValor);
            cstmt.setString(10, filter.strSQLUpdateReplace);
            cstmt.setString(11, filter.IN_SOURCEF2);
            cstmt.setString(12, filter.IN_TABLA2);
            cstmt.setString(13, "");
            cstmt.execute();

            strMsj = cstmt.getString(13);

        } catch (Exception e) {
            strMsj = e.getMessage();
        } finally {
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

        return strMsj;
    }
    
    

    public String loadPX449SQP02637(SQP00768 filter) throws SQLException, Exception {
        //REALIZA EL INSERT, UPDATE O DELETE DE UN REGISTRO EN LA TABLA A1702.
        String strMsj = "An Unexpected Error Ocurred.";

        CallableStatement cstmt = null;
        String SQLCLL01="";
        
        SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP02637(?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(14, Types.VARCHAR);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, session.getUserView().getUserInfo().USR);
            cstmt.setString(3, filter.strFecha);
            cstmt.setString(4, filter.IN_FECHA_FROM);
            cstmt.setString(5, filter.IN_FECHA_TO);
            cstmt.setString(6, filter.strSQL.trim());
            cstmt.setString(7, filter.strSubstr.trim());
            cstmt.setString(8, filter.strSQLUpdateCampo.trim());
            cstmt.setString(9, filter.strSQLUpdateValor);
            cstmt.setString(10, filter.strSQLUpdateReplace);
            cstmt.setString(11, filter.strComentario);
            cstmt.setString(12, filter.IN_SOURCEF2);
            cstmt.setString(13, filter.IN_TABLA2);
            cstmt.setString(14, "");
            cstmt.execute();

            strMsj = cstmt.getString(14);

        } catch (Exception e) {
            strMsj = e.getMessage();
        } finally {
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

        return strMsj;
    }
 
    

    public String loadPX449SQP03587(SQP00768 filter) throws SQLException, Exception {
        //REALIZA EL INSERT, UPDATE O DELETE DE UN REGISTRO EN LA TABLA A1702.
        String strMsj = "An Unexpected Error Ocurred.";

        CallableStatement cstmt = null;
        String SQLCLL01="";
        
        SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP03587(?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(14, Types.VARCHAR);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, session.getUserView().getUserInfo().USR);
            cstmt.setString(3, filter.strFecha);
            cstmt.setString(4, filter.IN_FECHA_FROM);
            cstmt.setString(5, filter.IN_FECHA_TO);
            cstmt.setString(6, filter.strSQL.trim());
            cstmt.setString(7, filter.strSubstr.trim());
            cstmt.setString(8, filter.strSQLUpdateCampo.trim());
            cstmt.setString(9, filter.strSQLUpdateValor);
            cstmt.setString(10, filter.strSQLUpdateReplace);
            cstmt.setString(11, filter.strComentario);
            cstmt.setString(12, filter.IN_SOURCEF2);
            cstmt.setString(13, filter.IN_TABLA2);
            cstmt.setString(14, "");
            cstmt.execute();

            strMsj = cstmt.getString(14);

        } catch (Exception e) {
            strMsj = e.getMessage();
        } finally {
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

        return strMsj;
    }
    

    public List<SQP00768> loadPX449SQP02655(String tabla, String codigo,String flag) throws SQLException, Exception {

        List<SQP00768> lista = new ArrayList<SQP00768>();
        SQP00768 record;
        String[] linea;
        String Queryname = "", Query = "", Fecha = "", TablaJoin = "";
        boolean chkGroup = false;

        Connection cnx = null;

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP02655(?,?,?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, session.getUserView().getCustomerInfo().USR);
            cstmt.setString(3, tabla);
            cstmt.setString(4, codigo);
            cstmt.setString(5, flag);
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
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
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
            } catch (Exception e) {
            }

            pasarGarbageCollector();
        }

        return lista;
    }
    

    public List<SQP00768> loadPX449SQP02688() throws SQLException, Exception {
        List<SQP00768> lista = new ArrayList<SQP00768>();
        SQP00768 record;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP02688(?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();

            while (rs01.next()) {
                
                record = new SQP00768();
                record.strCodigo = rs01.getString("A2560CODRZ");
                record.strDescrip = rs01.getString("A2560COMRE");
                record.strComentario = rs01.getString("A2560COMES");
                lista.add(record);
            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
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
                        logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
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
    

    public String loadPX449SQP02689(SQP00768 filter) throws SQLException, Exception {
        //REALIZA EL INSERT, UPDATE O DELETE DE UN REGISTRO EN LA TABLA A1702.
        String strMsj = "An Unexpected Error Ocurred.";

        CallableStatement cstmt = null;
        String SQLCLL01="";
        
        SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP02689(?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(10, Types.VARCHAR);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, session.getUserView().getUserInfo().USR);
            cstmt.setString(3, filter.strFecha);
            cstmt.setString(4, filter.IN_FECHA_FROM);
            cstmt.setString(5, filter.IN_FECHA_TO);
            cstmt.setString(6, filter.strSQL.trim());
            cstmt.setString(7, filter.strCodReasons.trim());
            cstmt.setString(8, filter.IN_SOURCEF2);
            cstmt.setString(9, filter.IN_TABLA2);
            cstmt.setString(10, "");
            cstmt.execute();

            strMsj = cstmt.getString(10);

        } catch (Exception e) {
            strMsj = e.getMessage();
        } finally {
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

        return strMsj;
    }
    

    public String loadPX449SQP02690(SQP00768 filter) throws SQLException, Exception {
        //REALIZA EL INSERT, UPDATE O DELETE DE UN REGISTRO EN LA TABLA A1702.
        String strMsj = "An Unexpected Error Ocurred.";

        CallableStatement cstmt = null;
        String SQLCLL01="";
        
        SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP02690(?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(13, Types.VARCHAR);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, session.getUserView().getUserInfo().USR);
            cstmt.setString(3, filter.strFecha);
            cstmt.setString(4, filter.IN_FECHA_FROM);
            cstmt.setString(5, filter.IN_FECHA_TO);
            cstmt.setString(6, filter.strSQL.trim());
            cstmt.setString(7, filter.strSubstr.trim());
            cstmt.setString(8, filter.strSQLUpdateCampo.trim());
            cstmt.setString(9, filter.strSQLUpdateValor);
            cstmt.setString(10, filter.strSQLUpdateReplace);
            cstmt.setString(11, filter.IN_SOURCEF2);
            cstmt.setString(12, filter.IN_TABLA2);
            cstmt.setString(13, "");
            cstmt.execute();

            strMsj = cstmt.getString(13);

        } catch (Exception e) {
            strMsj = e.getMessage();
        } finally {
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

        return strMsj;
    }
    

    public String loadPX449SQP02744(SQP00768 filter) throws SQLException, Exception {
        //REALIZA EL INSERT, UPDATE O DELETE DE UN REGISTRO EN LA TABLA A1702.
        String strMsj = "An Unexpected Error Ocurred.";

        CallableStatement cstmt = null;
        String SQLCLL01="";
        
        SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP03287(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(17, Types.VARCHAR);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, session.getUserView().getUserInfo().USR);
            cstmt.setString(3, filter.strFecha);
            cstmt.setString(4, filter.IN_FECHA_FROM);
            cstmt.setString(5, filter.IN_FECHA_TO);
            cstmt.setString(6, filter.strSQL.trim());
            cstmt.setString(7, filter.strSubstr.trim());
            cstmt.setString(8, filter.strSQLUpdateCampo.trim());
            cstmt.setString(9, filter.strSQLUpdateValor);
            cstmt.setString(10, filter.strSQLUpdateReplace);
            cstmt.setString(11, filter.IN_SOURCEF2);
            cstmt.setString(12, filter.IN_TABLA2);
            cstmt.setString(13, filter.IN_CDTAX);
            cstmt.setString(14, filter.IN_MONED);
            cstmt.setDouble(15, filter.IN_TXMIA);
            cstmt.setString(16, filter.strCampo);
            cstmt.setString(17, "");
            cstmt.execute();

            
            strMsj = cstmt.getString(17);

        } catch (Exception e) {
            strMsj = e.getMessage();
        } finally {
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

        return strMsj;
    }
    

    public String loadPX449SQP02936(SQP00768 filter) throws SQLException, Exception {
        //FORCE MATCH.
        String strMsj = "An Unexpected Error Ocurred.";

        CallableStatement cstmt = null;
        String SQLCLL01="";
        
        SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP02936(?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(13, Types.VARCHAR);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, session.getUserView().getUserInfo().USR);
            cstmt.setString(3, filter.strFecha);
            cstmt.setString(4, filter.IN_FECHA_FROM);
            cstmt.setString(5, filter.IN_FECHA_TO);
            cstmt.setString(6, filter.strSQL.trim());
            cstmt.setString(7, filter.strSubstr.trim());
            cstmt.setString(8, filter.strSQLUpdateCampo.trim());
            cstmt.setString(9, filter.strSQLUpdateValor);
            cstmt.setString(10, filter.strSQLUpdateReplace);
            cstmt.setString(11, filter.IN_SOURCEF2);
            cstmt.setString(12, filter.IN_TABLA2);
            cstmt.setString(13, "");
            cstmt.execute();

            strMsj = cstmt.getString(13);

        } catch (Exception e) {
            strMsj = e.getMessage();
        } finally {
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

        return strMsj;
    }
    
    
    

    public String loadPX449SQP002XXZZ(List<SQP00768> lstExcel) throws SQLException, Exception {
        //REALIZA EL INSERT, UPDATE O DELETE DE UN REGISTRO EN LA TABLA A1702.
        String strMsj = "0 ";
        int  cont = 0 ;

        CallableStatement cstmt = null;
        String SQLCLL01="",strTKT="";
        String TRNCU="",SEQ="",CUPON="",CIA="",FORMA="",SERIE="",COMMENT="";
        SQP00768 obj =null;
        
        SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP02937(?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            
            for (int i = 0; i < lstExcel.size(); i++) {
       
                strTKT = lstExcel.get(i).column1;
                TRNCU = lstExcel.get(i).column1;
                SEQ = lstExcel.get(i).column2;
                CUPON = lstExcel.get(i).column3;
                CIA = lstExcel.get(i).column4;
                FORMA = lstExcel.get(i).column5;
                SERIE = lstExcel.get(i).column6;
                COMMENT = lstExcel.get(i).column7;
                //strTKT = lstExcel.get(i).toString();
                
                cstmt.registerOutParameter(10, Types.INTEGER);

                cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
                cstmt.setString(2, session.getUserView().getUserInfo().USR);
                cstmt.setString(3, CIA.trim());
                cstmt.setString(4, FORMA.trim());
                cstmt.setString(5, SERIE.trim());
                cstmt.setString(6, SEQ.trim());
                cstmt.setString(7, CUPON.trim());
                cstmt.setString(8, TRNCU.trim());
                cstmt.setString(9, COMMENT.trim());

                cstmt.setInt(10, 0);
                cstmt.execute();

                cont += cstmt.getInt(10);
                
            }
            
            
            strMsj = cont + " actualizados.";
        } catch (Exception e) {
            strMsj = e.getMessage();
        } finally {
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

        return strMsj;
    }
    
    

    public String loadPX449SQP02937(String ruta) throws SQLException, Exception {
        //REALIZA EL INSERT, UPDATE O DELETE DE UN REGISTRO EN LA TABLA A1702.
        String strMsj = "0 ";
        int  cont = 0 ;

        BufferedReader br = null;
        CallableStatement cstmt = null;
        String SQLCLL01="",strTKT="";
        String TRNCU="",SEQ="",CUPON="",CIA="",FORMA="",SERIE="",COMMENT="";
        SQP00768 obj =null;
        
        SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP02937(?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            
            cstmt.registerOutParameter(10, Types.INTEGER);
                
            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, session.getUserView().getUserInfo().USR);
            

            br = new BufferedReader(new FileReader(ruta));
            String line = br.readLine();

            while (null != line) {
                
                String[] fields = line.split(",");
       
                strTKT = fields[0];
                TRNCU = fields[0];
                SEQ = fields[1];
                CUPON = fields[2];
                CIA = fields[3];
                FORMA = fields[4];
                SERIE = fields[5];
                COMMENT = fields[6];
                //strTKT = lstExcel.get(i).toString();
                

                cstmt.setString(3, CIA.trim());
                cstmt.setString(4, FORMA.trim());
                cstmt.setString(5, SERIE.trim());
                cstmt.setString(6, SEQ.trim());
                cstmt.setString(7, CUPON.trim());
                cstmt.setString(8, TRNCU.trim());
                cstmt.setString(9, COMMENT.trim());

                cstmt.setInt(10, 0);
                cstmt.execute();

                cont += cstmt.getInt(10);
                
                line = br.readLine();
            }
            
            
            strMsj = cont + " actualizados.";
        } catch (Exception e) {
            strMsj = e.getMessage();
        } finally {
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

        return strMsj;
    }

    public String loadPX449SQP03744(String ruta) throws SQLException, IOException, Exception {

        BufferedReader br = null;
        CallableStatement cs = null;
        String strSQL = "", SEPARATOR = ",", QUOTE = "\"";
        String IN_TKT = "",WS_SEQ="",WS_CUPON="",WS_TRNCU="",IN_MONEDA="";
        double IN_TAXVAL = 0;
        String msj = " ", strTrama = "";
        int IO_QTY = 0;
        int IO_QTY_ERROR = 0;

        strSQL = "{CALL PRAXIS.SQP03744(?,?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(strSQL);

            cs.registerOutParameter(9, Types.INTEGER);
            cs.registerOutParameter(10, Types.INTEGER);

            cs.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cs.setString(2, session.getUserView().getUserInfo().USR);

            br = new BufferedReader(new FileReader(ruta));
            String line = br.readLine();

            while (null != line) {

//                cantReg++;
                String[] fields = line.split(SEPARATOR);
                IN_TKT = fields[0];
                WS_SEQ = fields[1];
                WS_CUPON = fields[2];
                WS_TRNCU = fields[3];
                IN_TAXVAL = Double.parseDouble(fields[4]);
//                fields = removeTrailingQuotes(fields, QUOTE);
                // System.out.println(Arrays.toString(fields));
                cs.setString(3, IN_TKT);//TKT
                cs.setString(4, WS_SEQ);
                cs.setString(5, WS_CUPON);
                cs.setString(6, WS_TRNCU);
                cs.setString(7, "");
                cs.setDouble(8, IN_TAXVAL);
                cs.setInt(9, 0);
                cs.setInt(10, 0);
                cs.execute();

                IO_QTY += cs.getInt(9);
                IO_QTY_ERROR += cs.getInt(10);
                
                line = br.readLine();
            }

        } catch (Exception e) {
            e.printStackTrace();
            msj = "Error : " + e.getMessage();
        } finally {
            if (null != br) {
                br.close();
            }
            if (cs != null) {
                try {
                    cs.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            // =================
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
            msj = "Operation Successful : " + IO_QTY + " afeccted , " + IO_QTY_ERROR + " not affected";
        }

        return msj;
    }
    
}
