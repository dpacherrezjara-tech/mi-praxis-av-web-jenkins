/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.dao.sales;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.A1740Filter;
import net.miatech.beans.A2016Filter;
import net.miatech.beans.A2017Filter;
import net.miatech.beans.A2056Filter;

import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.A2016;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author lmendoza
 */
public class EstimationReverseProcessDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public EstimationReverseProcessDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public EstimationReverseProcessDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A2017Filter> loadPX251S01A2017(A2017Filter filter) throws SQLException, Exception {
        List<A2017Filter> lstRtn = new ArrayList<A2017Filter>(0);
        A2017Filter objRtn;
        int PAGINIT = 0, totPAGS = 0, totRowsPag = filter.page.PAGROW, totRows = -1;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX251S01A2017(?,?,?,?,?,?,?,?,?)}";
        //String SQLCLL01 = "{CALL LIBSAP14.PX251S01A2017(?,?,?,?,?,?,?,?,?)}";        

        Connection cnx = null;
        try {
            if (filter.page.PAGNUM > 0) {
                PAGINIT = (filter.page.PAGNUM - 1) * totRowsPag + 1;
            }

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.registerOutParameter("IO_PAGNUM", Types.INTEGER);
            cstmt01.registerOutParameter("IO_PAGROW", Types.INTEGER);
            cstmt01.registerOutParameter("IO_TOTPAG", Types.INTEGER);
            cstmt01.registerOutParameter("IO_TOTROW", Types.INTEGER);

            cstmt01.setString("IN_A2017CCUST", session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString("IN_A2017FUENT", filter.IN_A2017FUENT);
            cstmt01.setString("IN_A2017FPROC", filter.IN_A2017FPROC);
            cstmt01.setString("IN_A2017SFUEN", filter.IN_A2017SFUEN);
            cstmt01.setString("IN_A2017PSVTA", filter.IN_A2017PSVTA);

            cstmt01.setInt("IO_PAGNUM", PAGINIT);
            cstmt01.setInt("IO_PAGROW", totRowsPag);
            cstmt01.setInt("IO_TOTPAG", totRows);
            cstmt01.setInt("IO_TOTROW", filter.page.TOTROW);

            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt("IO_PAGNUM");
            filter.page.PAGROW = cstmt01.getInt("IO_PAGROW");
            filter.page.TOTPAG = cstmt01.getInt("IO_TOTPAG");
            filter.page.TOTROW = cstmt01.getInt("IO_TOTROW");

            if (filter.page.TOTROW > 0 && filter.page.TOTROW == cstmt01.getInt("IO_PAGROW")) {
                totRows = filter.page.TOTROW;
                totPAGS = filter.page.TOTPAG;
            } else {
                try {
                    totRows = cstmt01.getInt("IO_TOTROW");
                    int total = (int) (totRows / totRowsPag);
                    int resto = (totRows % totRowsPag);

                    if (resto > 0) {
                        totPAGS = total + 1;
                    } else {
                        totPAGS = total;
                    }

                } catch (Exception e) {
                    totPAGS = totRows / totRowsPag;
                }
            }

            filter.page.TOTPAG = totPAGS;

            rs01 = cstmt01.getResultSet();
            int pos = 0;
            while (rs01.next()) {
                pos++;
                objRtn = new A2017Filter();
                objRtn.RN = rs01.getLong("RN");
                objRtn.A2017CCUST = rs01.getString("A2017CCUST").trim();
                objRtn.A2017PSVTA = rs01.getString("A2017PSVTA").trim();
                objRtn.A2017GRUPO = rs01.getString("A2017GRUPO").trim();
                objRtn.A2017FUENT = rs01.getString("A2017FUENT").trim();
                objRtn.A2017SFUEN = rs01.getString("A2017SFUEN").trim();
                objRtn.A2017FCONT = Functions.getMonthConvertDate(rs01.getString("A2017FCONT").trim());
                objRtn.A2017IDCON = rs01.getString("A2017IDCON").trim();
                objRtn.A2017FPROC = Functions.getMonthConvertDate(rs01.getString("A2017FPROC").trim());
                objRtn.A2017IDFIL = rs01.getString("A2017IDFIL").trim();
                objRtn.A2017STPRO = rs01.getString("A2017STPRO").trim();
                objRtn.A2017MDA = rs01.getString("A2017MDA").trim();
                objRtn.A2017MODO = rs01.getString("A2017MODO").trim();
                objRtn.A2017USRIN = rs01.getString("A2017USRIN").trim();
                objRtn.A2017FECIN = rs01.getString("A2017FECIN").trim();
                objRtn.A2017HORIN = rs01.getString("A2017HORIN").trim();
                objRtn.A2017USRAC = rs01.getString("A2017USRAC").trim();
                objRtn.A2017FECAC = rs01.getString("A2017FECAC").trim();
                objRtn.A2017HORAC = rs01.getString("A2017HORAC").trim();
                objRtn.REVERSION = (rs01.getString("A2017SPROC").equals("C") && rs01.getString("A2017STS0").equals("Y") && rs01.getString("A2017STPRO").equals("0") ? true : false);//rs01.getBoolean("A2017STPRO");
                objRtn.A2017ESTADO = rs01.getString("A2017ESTADO").trim();
                objRtn.A2017SPROC = rs01.getString("A2017SPROC");
                objRtn.A2017STATU = rs01.getString("A2017STATU").trim();
                objRtn.A2017STS0 = rs01.getString("A2017STS0");
                //objRtn.POLIZA = (rs01.getString("A2017STS0").equals("Y")? true : false);

                objRtn.page.PAGNUM = filter.page.PAGNUM / filter.page.PAGROW + 1;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;

                lstRtn.add(objRtn);
            }
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

    //Lista Cuenta
    public List<A2016> loadPX251S01A2016(A2017Filter filter) throws SQLException, Exception {
        List<A2016> objRtn = new ArrayList<A2016>(0);

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX251S01A2016(?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString("IN_A2016GRUPO", filter.A2017GRUPO);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();

            while (rs01.next()) {
                A2016Filter obj = new A2016Filter();

                obj.A2016CCUST = rs01.getString("A2016CCUST");
                obj.A2016GRUPO = rs01.getString("A2016GRUPO");
                obj.A2016FUENT = rs01.getString("A2016FUENT");
                obj.A2016SUBFU = rs01.getString("A2016SUBFU");
                obj.A2016CUR = rs01.getString("A2016CUR");
                obj.A2016PAIS = rs01.getString("A2016PAIS");
                obj.A2016FP = rs01.getString("A2016FP");
                obj.A2016MODO = rs01.getString("A2016MODO");
                obj.A2016FPRO = rs01.getString("A2016FPRO");
                obj.A2016FCONT = rs01.getString("A2016FCONT");
                obj.A2016CIAF = rs01.getString("A2016CIAF").trim();
                obj.A2016UNID = rs01.getString("A2016UNID").trim();
                obj.A2016CECO = rs01.getString("A2016CECO").trim();
                obj.A2016UBICA = rs01.getString("A2016UBICA").trim();
                obj.A2016CUENT = rs01.getString("A2016CUENT").trim();
                obj.A2016SUBCU = rs01.getString("A2016SUBCU").trim();
                obj.A2016EQUI = rs01.getString("A2016EQUI").trim();
                obj.A2016ICIA = rs01.getString("A2016ICIA").trim();
                obj.A2016TITU = rs01.getString("A2016TITU").trim();
                obj.A2016ACTIV = rs01.getDouble("A2016ACTIV");
                obj.A2016PASIV = rs01.getDouble("A2016PASIV");
                obj.A2016CUENTA = rs01.getString("A2016CUENTA").trim();
                obj.A2016TITRA = rs01.getString("A2016TITRA").trim();
                obj.A2016TIPO = rs01.getString("A2016TIPO").trim();
                obj.A2016SUBTI = rs01.getString("A2016SUBTI").trim();
                obj.A2016CATEG = rs01.getString("A2016CATEG").trim();
                objRtn.add(obj);

            }
        } catch (Exception ex) {
            String msj = ex.getMessage();
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

    //CRUD
    public String CRUDPX251S02A2017(A2017Filter filter, String strOption) throws SQLException, Exception {
        CallableStatement cs = null;
        ResultSet rst = null;
        String strSQL;
        String STR_RESULT = "";

        Connection cnx = null;
        try {
            strSQL = "{CALL " + session.getMainLibrary() + ".PX251S02A2017(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
            //strSQL = "{CALL LIBSAP14.PX251S02A2017(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";            

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(strSQL);

            cs.setString("IN_ACTION", strOption);
            cs.setString("IN_A2017CCUST", session.getUserView().getCustomerInfo().CCUST);
            cs.setString("IN_A2017GRUPO", filter.IN_A2017GRUPO);
            cs.setString("IN_A2017FPROC", filter.IN_A2017FPROC);
            cs.setString("IN_A2017FUENT", filter.IN_A2017FUENT);
            cs.setString("IN_A2017SFUEN", filter.IN_A2017SFUEN);
            cs.setString("IN_A2017PSVTA", filter.IN_A2017PSVTA);
            cs.setString("IN_A2017MDA", filter.IN_A2017MDA);
            cs.setString("IN_A2017STPRO", filter.IN_A2017STPRO);
            cs.setString("IN_A2017FCONT", filter.IN_A2017FCONT);
            cs.setString("IN_A2017MODO", filter.IN_A2017MODO);
            cs.setString("IN_A2017SPROC", filter.IN_A2017SPROC);
            cs.setString("IN_USR", session.getUserView().getUserInfo().USR);
            cs.setString("IN_FEC", Functions.getFechaActual());
            cs.setString("IN_HOR", Functions.getHoraActual());
            cs.setString("IN_A2017GRUPO_OLD", filter.IN_A2017GRUPO_OLD);
            cs.execute();

            rst = cs.getResultSet();
            while (rst.next()) {
                STR_RESULT = rst.getString("VMESSAGE");
            }
            try {
                cs.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            //Si insertó la cabecera, insertar CUENTAS
            if (STR_RESULT.equals("RECORD INSERTED") || STR_RESULT.equals("RECORD UPDATED")) {

                String STR_RESULT_CUEN = "";

                for (int i = 0; i < filter.ESTIMADOS.size(); i++) {
                    A2016 obj = filter.ESTIMADOS.get(i);
                    obj.A2016GRUPO = filter.IN_A2017GRUPO;

                    STR_RESULT_CUEN = CRUDPX251S02A2016(obj, "I");
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            strSQL = null;
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
        }

        return STR_RESULT;
    }

    //CRUD Cuentas
    public String CRUDPX251S02A2016(A2016 filter, String strOption) throws SQLException, Exception {
        CallableStatement cs = null;
        ResultSet rst = null;
        String strSQL;
        String STR_RESULT = "";
        String codigo = "";

        Connection cnx = null;
        try {
            strSQL = "{CALL " + session.getMainLibrary() + ".PX251S02A2016(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(strSQL);

            cs.setString("IN_ACTION", strOption);
            cs.setString("IN_A2016CCUST", session.getUserView().getCustomerInfo().CCUST);
            cs.setString("IN_A2016GRUPO", filter.A2016GRUPO);
            cs.setString("IN_A2016PAIS", filter.A2016PAIS);
            cs.setString("IN_A2016FUENT", filter.A2016FUENT);
            cs.setString("IN_A2016SUBFU", filter.A2016SUBFU);
            cs.setString("IN_A2016CUR", filter.A2016CUR);
            cs.setString("IN_A2016FP", filter.A2016FP);
            cs.setString("IN_A2016MODO", filter.A2016MODO);
            cs.setString("IN_A2016FPRO", filter.A2016FPRO);
            cs.setString("IN_A2016FCONT", filter.A2016FCONT);
            cs.setString("IN_A2016CIAF", filter.A2016CIAF);
            cs.setString("IN_A2016UNID", filter.A2016UNID);
            cs.setString("IN_A2016CECO", filter.A2016CECO);
            cs.setString("IN_A2016UBICA", filter.A2016UBICA);
            cs.setString("IN_A2016CUENT", filter.A2016CUENT);
            cs.setString("IN_A2016SUBCU", filter.A2016SUBCU);
            cs.setString("IN_A2016EQUI", filter.A2016EQUI);
            cs.setString("IN_A2016ICIA", filter.A2016ICIA);
            cs.setString("IN_A2016TITU", filter.A2016TITU);
            cs.setDouble("IN_A2016ACTIV", filter.A2016ACTIV);
            cs.setDouble("IN_A2016PASIV", filter.A2016PASIV);
            cs.setString("IN_A2016TITRA", filter.A2016TITRA);
            cs.setString("IN_A2016TIPO", filter.A2016TIPO);
            cs.setString("IN_A2016SUBTI", filter.A2016SUBTI);
            cs.setString("IN_A2016CATEG", filter.A2016CATEG);
            cs.setString("IN_USR", session.getUserView().getUserInfo().USR);
            cs.setString("IN_FEC", Functions.getFechaActual());
            cs.setString("IN_HOR", Functions.getHoraActual());
            cs.execute();

            rst = cs.getResultSet();
            while (rst.next()) {
                STR_RESULT = rst.getString("VMESSAGE");
                codigo = rst.getString("VSQLCODE");
            }
            try {
                cs.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            strSQL = null;
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
        }

        return STR_RESULT;
    }

    //Lista NRO GRUPO 
    public List<A2017Filter> loadPX251S03A2017() throws SQLException, Exception {
        List<A2017Filter> objRtn = new ArrayList<A2017Filter>(0);

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX251S03A2017}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.execute();

            rs01 = cstmt01.getResultSet();

            while (rs01.next()) {
                A2017Filter obj = new A2017Filter();;
                obj.A2017GRUPO = rs01.getString("A2017GRUPO");

                objRtn.add(obj);

            }
        } catch (Exception ex) {
            String msj = ex.getMessage();
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

    //Lista CUENTAS
    public List<A1740Filter> loadCuentas() throws SQLException, Exception {
        List<A1740Filter> lstRtn = new ArrayList<A1740Filter>(0);
        A1740Filter objRtn; 

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX251S01A1740}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new A1740Filter();
                objRtn.A1740TITU = rs01.getString("A1740TITU").trim();
                objRtn.A1740TITRA = rs01.getString("A1740TITRA").trim();
                objRtn.A1740TIPO = rs01.getString("A1740TIPO").trim();
                objRtn.A1740SUBTI = rs01.getString("A1740SUBTI").trim();
                objRtn.A1740CATEG = rs01.getString("A1740CATEG").trim();
                objRtn.A1740CIA = rs01.getString("A1740CIA").trim();
                objRtn.A1740UNIDA = rs01.getString("A1740UNIDA").trim();
                objRtn.A1740CECOS = rs01.getString("A1740CECOS").trim();
                objRtn.A1740UBICA = rs01.getString("A1740UBICA").trim();
                objRtn.A1740CTA = rs01.getString("A1740CTA").trim();
                objRtn.A1740SCTA = rs01.getString("A1740SCTA").trim();
                objRtn.A1740EQUI = rs01.getString("A1740EQUI").trim();
                objRtn.A1740ICIA = rs01.getString("A1740ICIA").trim();
                objRtn.A1740CLIE = rs01.getString("A1740CLIE").trim();

                lstRtn.add(objRtn);
            }

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

    public String Reversa(List<A2017Filter> filter) throws SQLException, Exception {
        CallableStatement cs = null;
        ResultSet rst = null;
        String strSQL;
        String STR_RESULT = "";
        String subfu = "";
        Connection cnx = null;
        try {

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();

            deletePoliza("A2101"); //Elimina data anterior
            for (A2017Filter obj : filter) {
                subfu = obj.IN_A2017FUENT.equals("ASR") ? obj.IN_A2017SFUEN : "";

                strSQL = "{CALL " + session.getMainLibrary() + ".PX251S04A2017(?,?,?,?,?,?,?,?,?,?)}";
                //strSQL = "{CALL LIBSAP14.PX251S04A2017(?,?,?,?,?,?,?,?,?,?)}";            

                cs = cnx.prepareCall(strSQL);

                cs.setString("IN_A2017CCUST", session.getUserView().getCustomerInfo().CCUST);
                cs.setString("IN_A2017GRUPO", obj.IN_A2017GRUPO);
                cs.setString("IN_A2017FCONT", obj.IN_A2017FCONT.replaceAll("/", ""));
                cs.setString("IN_USR", session.getUserView().getUserInfo().USR);
                cs.setString("IN_FEC", Functions.getFechaActual());
                cs.setString("IN_HOR", Functions.getHoraActual());
                cs.setString("IN_A2017FUENT", obj.IN_A2017FUENT);
                cs.setString("IN_A2017PSVTA", obj.IN_A2017PSVTA);
                cs.setString("IN_A2017SFUEN", subfu);
                cs.setString("IN_A2017MDA", obj.IN_A2017MDA);
                cs.execute();

                rst = cs.getResultSet();
                while (rst.next()) {
                    STR_RESULT = rst.getString("VMESSAGE");
                }
            }

            try {
                cs.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
            //cnx.commit();       

        } catch (Exception e) {
            //if(cnx != null) cnx.rollback();
            STR_RESULT = "AN ERROR OCURRED WHEN TRYING TO SAVE THE RECORD.";
            e.printStackTrace();
        } finally {
            strSQL = null;
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
        }

        return STR_RESULT;
    }

    public String Estimados(List<A2017Filter> filter) throws SQLException, Exception {
        CallableStatement cs = null;
        ResultSet rst = null;
        String strSQL;
        String STR_RESULT = "";
        String subfu = "";
        Connection cnx = null;
        try {

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();

            deletePoliza("A2095"); //Elimina data anterior

            for (A2017Filter obj : filter) {
                subfu = obj.A2017FUENT.equals("ASR") ? obj.A2017SFUEN : "";
                strSQL = "{CALL " + session.getMainLibrary() + ".PX251S05A2017(?,?,?,?,?,?,?,?,?,?)}";
                // strSQL = "{CALL LIBSAP14.PX251S05A2017(?,?,?,?,?,?,?,?,?,?)}";            

                cs = cnx.prepareCall(strSQL);

                cs.setString("IN_A2017CCUST", session.getUserView().getCustomerInfo().CCUST);
                cs.setString("IN_A2017FCONT", obj.A2017FCONT.replaceAll("/", ""));
                cs.setString("IN_A2017FUENT", obj.A2017FUENT);
                cs.setString("IN_A2017PSVTA", obj.A2017PSVTA);
                cs.setString("IN_A2017SFUEN", subfu);
                cs.setString("IN_A2017MDA", obj.A2017MDA);
                cs.setString("IN_A2017GRUPO", obj.A2017GRUPO);
                cs.setString("IN_USR", session.getUserView().getUserInfo().USR);
                cs.setString("IN_FEC", Functions.getFechaActual());
                cs.setString("IN_HOR", Functions.getHoraActual());
                cs.execute();

                rst = cs.getResultSet();
                while (rst.next()) {
                    STR_RESULT = rst.getString("VMESSAGE");
                }
            }

            try {
                cs.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
            //cnx.commit();       

        } catch (Exception e) {
            //if(cnx != null) cnx.rollback();
            STR_RESULT = "AN ERROR OCURRED WHEN TRYING TO SAVE THE RECORD.";
            e.printStackTrace();
        } finally {
            strSQL = null;
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
        }

        return STR_RESULT;
    }

    public void deletePoliza(String filter) throws SQLException, Exception {
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX251S01A2095(?)}";
        //String SQLCLL01 = "{CALL LIBSAP14.PX251S01A2095(?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, filter);
            cstmt01.execute();

        } catch (SQLException ex) {
            String data = ex.getMessage();
        } catch (Exception e) {
            String data = e.getMessage();
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
    }

    public List<A2056Filter> loadResultadoDownload(String filter) throws SQLException, Exception {
        List<A2056Filter> lstRtn = new ArrayList<A2056Filter>(0);
        A2056Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX251S01A2056(?)}";
        //String SQLCLL01 = "{CALL LIBSAP14.PX251S01A2056(?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, filter);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();

            while (rs01.next()) {
                objRtn = new A2056Filter();
                objRtn.RN = rs01.getLong("RN");
                objRtn.FPROC = rs01.getString("FPROC").trim();
                objRtn.FCONT = rs01.getString("FCONT").trim();
                objRtn.FUENT = rs01.getString("FUENT").trim();
                objRtn.PAIS = rs01.getString("PAIS").trim();
                objRtn.SUBFU = rs01.getString("SUBFU").trim();
                objRtn.CIA = rs01.getString("CIA").trim();

                lstRtn.add(objRtn);
            }
        } catch (SQLException ex) {
            String data = ex.getMessage();
        } catch (Exception e) {
            String data = e.getMessage();
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

    public List<A2056Filter> getTramaFile(A2056Filter filter) throws SQLException, Exception {
        List<A2056Filter> lstRtn = new ArrayList<A2056Filter>(0);
        A2056Filter objRtn;
        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX251S02A2056(?,?,?,?,?,?)}";
        //String SQLCLL01 = "{CALL LIBSAP14.PX251S02A2056(?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, filter.FPROC);
            cstmt01.setString(2, filter.FUENT);
            cstmt01.setString(3, filter.PAIS);
            cstmt01.setString(4, filter.SUBFU);
            cstmt01.setString(5, filter.CIA);
            cstmt01.setString(6, filter.IN_TIPO);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();

            while (rs01.next()) {
                objRtn = new A2056Filter();
                objRtn.CADENA = rs01.getString("CADENA").trim();
                objRtn.NCAMPO = rs01.getString("NCAMPO").trim();
                objRtn.CIA = rs01.getString("CIA").trim();

                lstRtn.add(objRtn);
            }

        } catch (SQLException ex) {
            String data = ex.getMessage();
        } catch (Exception e) {
            String data = e.getMessage();
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

}
