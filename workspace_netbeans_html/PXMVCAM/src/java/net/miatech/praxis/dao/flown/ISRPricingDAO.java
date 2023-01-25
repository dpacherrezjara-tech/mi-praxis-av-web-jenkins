package net.miatech.praxis.dao.flown;

// <editor-fold defaultstate="collapsed" desc="Imports">
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.A728Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.utils.Functions;

// </editor-fold>
/**
 *
 * @author gsanchez
 */
public class ISRPricingDAO {

    // <editor-fold defaultstate="collapsed" desc="Variables locales">
    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private String strSQL;
    // </editor-fold>

    public ISRPricingDAO() {
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A728Filter> loadPX088S01A728(A728Filter filter) throws SQLException, Exception {
        List<A728Filter> lstRtn = new ArrayList<>(0);
        A728Filter objRtn;

        strSQL = "{CALL " + session.getMainLibrary() + ".SQP0001(?,?,?,?,?,?,?)}";
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(strSQL);

            cs.registerOutParameter(4, Types.INTEGER);
            cs.registerOutParameter(5, Types.INTEGER);
            cs.registerOutParameter(6, Types.INTEGER);
            cs.registerOutParameter(7, Types.INTEGER);

            cs.setString(1, session.getUserView().getCustomerInfo().CCUST.trim());
            cs.setString(2, filter.IN_FECHA_FROM);
            cs.setString(3, filter.IN_FECHA_TO);
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

                objRtn = new A728Filter();
                objRtn.A728FECVTA = rst.getString("A728FECVTA");
                objRtn.strFormatDate = Functions.getMonthConvert(objRtn.A728FECVTA);
                objRtn.A728AIRLIN = rst.getString("A728AIRLIN");
                objRtn.A728CIA = rst.getString("A728CIA");
                objRtn.A728NRODOC = rst.getString("A728NRODOC");
                objRtn.A728CUPON = rst.getString("A728CUPON");
                objRtn.A728MONEDA = rst.getString("A728MONEDA");
                objRtn.A728TARIFA = rst.getDouble("A728TARIFA");
                objRtn.A728CARRA1 = rst.getString("A728CARRA1");
                objRtn.A728RUTAO = rst.getString("A728RUTAO");
                objRtn.strDescORIG = rst.getString("DESC_ORIG");
                objRtn.A728RUTAD = rst.getString("A728RUTAD");
                objRtn.strDescDEST = rst.getString("DESC_DEST");
                objRtn.A728CARRN1 = rst.getString("A728CARRN1");
                objRtn.A728NVLO1 = rst.getString("A728NVLO1");
                objRtn.A728BOOKI1 = rst.getString("A728BOOKI1");
                objRtn.A728CLASE1 = rst.getString("A728CLASE1");
                objRtn.A728FBASE1 = rst.getString("A728FBASE1");
                objRtn.A728MONREG = rst.getString("A728MONREG");
                objRtn.A728VALOR1 = rst.getDouble("A728VALOR1");
                if (objRtn.A728VALOR1 == 888888.88) {
                    objRtn.A728VALOR1 = 0;
                }

                //Paginación ===================================================
                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;

                lstRtn.add(objRtn);
            }
        } finally {
            setClose();
        }

        return lstRtn;
    }
    
    public List<A728Filter> loadPX088S02A720(A728Filter filter) throws SQLException, Exception {
        List<A728Filter> lstRtn = new ArrayList<>(0);
        A728Filter objRtn;

        strSQL = "{CALL " + session.getMainLibrary() + ".PX088S02A728(?,?,?,?,?,?,?)}";
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(strSQL);

            cs.registerOutParameter(4, Types.INTEGER);
            cs.registerOutParameter(5, Types.INTEGER);
            cs.registerOutParameter(6, Types.INTEGER);
            cs.registerOutParameter(7, Types.INTEGER);

            cs.setString(1, session.getUserView().getCustomerInfo().CCUST.trim());
            cs.setString(2, filter.IN_FECHA_FROM);
            cs.setString(3, filter.IN_FECHA_TO);
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
                objRtn = new A728Filter();
                objRtn.A728FECVTA = rst.getString("A720FECVTA");
                objRtn.strFormatDate = Functions.getMonthConvert(objRtn.A728FECVTA);
                objRtn.A728CIA = rst.getString("A720CIA");
                objRtn.A728NRODOC = rst.getString("A720FORMA") + rst.getString("A720SERIE");
                objRtn.A728CUPON = "1";
                objRtn.A728MONEDA = rst.getString("A720MONEDA");
                objRtn.A728CARRA1 = rst.getString("A720CARRA1");
                objRtn.A728RUTAO = rst.getString("A720RUTA0");
                //objRtn.strDescORIG = rst.getString("DESC_ORIG");
                objRtn.A728RUTAD = rst.getString("A720RUTA1");
                //objRtn.strDescDEST = rst.getString("DESC_DEST");
                objRtn.A728NVLO1 = rst.getString("A720NVLO1");
                objRtn.A728BOOKI1 = rst.getString("A720BOOKI1");
                objRtn.A728CLASE1 = rst.getString("A720CLASE1");
                objRtn.A728FBASE1 = rst.getString("A720FBORI1");
                objRtn.A728MONREG = rst.getString("A720MNTFM1");
                objRtn.A728VALOR1 = rst.getDouble("A720VALOR1");
                if (objRtn.A728VALOR1 == 888888.88) {
                    objRtn.A728VALOR1 = 0;
                }

                //Paginación ===================================================
                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;

                lstRtn.add(objRtn);

                if (!rst.getString("A720RUTA2").equals("")) {
                    objRtn = new A728Filter();
                    objRtn.A728FECVTA = rst.getString("A720FECVTA");
                    objRtn.strFormatDate = Functions.getMonthConvert(objRtn.A728FECVTA);
                    objRtn.A728CIA = rst.getString("A720CIA");
                    objRtn.A728NRODOC = rst.getString("A720FORMA") + rst.getString("A720SERIE");
                    objRtn.A728CUPON = "2";
                    objRtn.A728MONEDA = rst.getString("A720MONEDA");
                    objRtn.A728CARRA1 = rst.getString("A720CARRA2");
                    objRtn.A728RUTAO = rst.getString("A720RUTA1");
                    objRtn.A728RUTAD = rst.getString("A720RUTA2");
                    objRtn.A728NVLO1 = rst.getString("A720NVLO2");
                    objRtn.A728VALOR1 = rst.getDouble("A720VALOR2");
                    objRtn.A728BOOKI1 = rst.getString("A720BOOKI2");
                    objRtn.A728CLASE1 = rst.getString("A720CLASE2");
                    objRtn.A728FBASE1 = rst.getString("A720FBORI2");
                    objRtn.A728MONREG = rst.getString("A720MNTFM2");
                    if (objRtn.A728VALOR1 == 888888.88) {
                        objRtn.A728VALOR1 = 0;
                    }
                    //Paginación ===================================================
                    objRtn.page.PAGNUM = filter.page.PAGNUM;
                    objRtn.page.PAGROW = filter.page.PAGROW;
                    objRtn.page.TOTPAG = filter.page.TOTPAG;
                    objRtn.page.TOTROW = filter.page.TOTROW;

                    lstRtn.add(objRtn);

                    if (!rst.getString("A720RUTA3").equals("")) {
                        objRtn = new A728Filter();
                        objRtn.A728FECVTA = rst.getString("A720FECVTA");
                        objRtn.strFormatDate = Functions.getMonthConvert(objRtn.A728FECVTA);
                        objRtn.A728CIA = rst.getString("A720CIA");
                        objRtn.A728NRODOC = rst.getString("A720FORMA") + rst.getString("A720SERIE");
                        objRtn.A728MONEDA = rst.getString("A720MONEDA");
                        objRtn.A728CARRA1 = rst.getString("A720CARRA3");
                        objRtn.A728CUPON = "3";
                        objRtn.A728RUTAO = rst.getString("A720RUTA2");
                        objRtn.A728RUTAD = rst.getString("A720RUTA3");
                        objRtn.A728NVLO1 = rst.getString("A720NVLO3");
                        objRtn.A728BOOKI1 = rst.getString("A720BOOKI3");
                        objRtn.A728CLASE1 = rst.getString("A720CLASE3");
                        objRtn.A728FBASE1 = rst.getString("A720FBORI3");
                        objRtn.A728MONREG = rst.getString("A720MNTFM3");
                        objRtn.A728VALOR1 = rst.getDouble("A720VALOR3");
                        if (objRtn.A728VALOR1 == 888888.88) {
                            objRtn.A728VALOR1 = 0;
                        }
                        //Paginación ===================================================
                        objRtn.page.PAGNUM = filter.page.PAGNUM;
                        objRtn.page.PAGROW = filter.page.PAGROW;
                        objRtn.page.TOTPAG = filter.page.TOTPAG;
                        objRtn.page.TOTROW = filter.page.TOTROW;

                        lstRtn.add(objRtn);

                        if (!rst.getString("A720RUTA4").equals("")) {
                            objRtn = new A728Filter();
                            objRtn.A728FECVTA = rst.getString("A720FECVTA");
                            objRtn.strFormatDate = Functions.getMonthConvert(objRtn.A728FECVTA);
                            objRtn.A728CIA = rst.getString("A720CIA");
                            objRtn.A728NRODOC = rst.getString("A720FORMA") + rst.getString("A720SERIE");
                            objRtn.A728MONEDA = rst.getString("A720MONEDA");
                            objRtn.A728CARRA1 = rst.getString("A720CARRA4");
                            objRtn.A728CUPON = "4";
                            objRtn.A728RUTAO = rst.getString("A720RUTA3");
                            objRtn.A728RUTAD = rst.getString("A720RUTA4");
                            objRtn.A728NVLO1 = rst.getString("A720NVLO4");
                            objRtn.A728BOOKI1 = rst.getString("A720BOOKI4");
                            objRtn.A728CLASE1 = rst.getString("A720CLASE4");
                            objRtn.A728FBASE1 = rst.getString("A720FBORI4");
                            objRtn.A728MONREG = rst.getString("A720MNTFM4");
                            objRtn.A728VALOR1 = rst.getDouble("A720VALOR4");
                            if (objRtn.A728VALOR1 == 888888.88) {
                                objRtn.A728VALOR1 = 0;
                            }
                            //Paginación ===================================================
                            objRtn.page.PAGNUM = filter.page.PAGNUM;
                            objRtn.page.PAGROW = filter.page.PAGROW;
                            objRtn.page.TOTPAG = filter.page.TOTPAG;
                            objRtn.page.TOTROW = filter.page.TOTROW;

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
