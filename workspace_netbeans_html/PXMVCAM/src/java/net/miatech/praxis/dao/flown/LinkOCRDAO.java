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
import net.miatech.beans.A1692Filter;

import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author lmendoza
 */
public class LinkOCRDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public LinkOCRDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public LinkOCRDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public String loadPX095SQP00155(A1692Filter filter, String flag) throws SQLException, Exception {

        CallableStatement cs = null;
        String strSQL;
        String msj = "";

        Connection cnx = null;
        try {

            strSQL = "{CALL " + session.getMainLibrary() + ".SQP00155(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(strSQL);
            cs.registerOutParameter(13, Types.VARCHAR);
            cs.registerOutParameter(14, Types.VARCHAR);
            cs.registerOutParameter(15, Types.VARCHAR);
            cs.registerOutParameter(16, Types.VARCHAR);

            cs.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cs.setString(2, filter.CDEPART.trim());
            cs.setString(3, filter.CARRIVA.trim());
            cs.setString(4, filter.NFLIGHT.trim());
            cs.setString(5, filter.DFLIGHT.trim());
            cs.setString(6, filter.PSVVTA.trim());
            cs.setString(7, filter.AGTIA.trim());
            cs.setString(8, filter.CARR.trim());
            cs.setString(9, flag.trim());
            cs.setString(10, filter.RFIC.trim());
            cs.setString(11, filter.RECODE.trim());
            cs.setString(12, filter.TKTASO);
            cs.setString(13, "");
            cs.setString(14, "");
            cs.setString(15, "");
            cs.setString(16, "");
            cs.execute();

            //Obteniendo el Carrier correcto ===================================
            if (cs.getString(13) != null) {
                filter.IN_CARR = cs.getString(13).trim();
            }
            //Obteniendo la zona resultante ====================================
            if (cs.getString(14) != null) {
                filter.ZONA = cs.getString(14).trim();
            }
            //Obteniendo el Tipo de Operacion ==================================
            if (cs.getString(15) != null) {
                filter.TOPER = cs.getString(15).trim();
                filter.TVTA = cs.getString(15).trim();
                filter.TOPUS = cs.getString(15).trim();
            }
            //Obteniendo el mensaje de error ===================================    
            if (cs.getString(16) != null) {
                msj = cs.getString(16).trim();
            }

            if (msj.trim().equals("") && filter.CARR.trim().equals("")) {
                msj = "Carrier value is required.";
            }

            try {
                cs.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

        } catch (Exception e) {
            e.getMessage();
        } finally {
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
        }

        return msj;
    }

    public String loadPX095S08VALID(A1692Filter filter, String flag) throws SQLException, Exception {

        CallableStatement cs = null;
        String strSQL;
        String msj = "";

        Connection cnx = null;
        try {
            //PX09500005
            strSQL = "{CALL " + session.getMainLibrary() + ".SQP04358(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(strSQL);
            cs.registerOutParameter(11, Types.VARCHAR);
            cs.registerOutParameter(12, Types.VARCHAR);
            cs.registerOutParameter(13, Types.VARCHAR);
            cs.registerOutParameter(14, Types.VARCHAR);
            cs.registerOutParameter(15, Types.VARCHAR);

            cs.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cs.setString(2, filter.CDEPART.trim());
            cs.setString(3, filter.CARRIVA.trim());
            cs.setString(4, filter.NFLIGHT.trim());
            cs.setString(5, filter.DFLIGHT.trim());
            cs.setString(6, filter.PSVVTA.trim());
            cs.setString(7, filter.AGTIA.trim());
            cs.setString(8, filter.CARR.trim());
            cs.setString(9, filter.STVAL.trim());
            cs.setString(10, flag.trim());
            cs.setString(11, "");//INOUT   IO_NCARR     VARCHAR(2),   -- CARRIER A1691
            cs.setString(12, "");//INOUT   IO_ZONE      VARCHAR(3),   -- ZONA
            cs.setString(13, "");//INOUT   IO_TOPER     VARCHAR(1),   -- TIPO DE OPERACIÓN
            cs.setString(14, "");//INOUT   IO_MSJ       VARCHAR(100), -- MENSAJE DE SALIDA
            cs.setString(15, "");//INOUT   IO_NPLANE    VARCHAR(10)   -- AVION
            cs.execute();

            //Obteniendo el Carrier correcto ===================================
            if (cs.getString(11) != null) {
                filter.IN_CARR = cs.getString(11).trim();
            }
            //Obteniendo la zona resultante ====================================
            if (cs.getString(12) != null) {
                filter.ZONA = cs.getString(12).trim();
            }
            //Obteniendo el Tipo de Operacion ==================================
            if (cs.getString(13) != null) {
                filter.TOPER = cs.getString(13).trim();
                filter.TVTA = cs.getString(13).trim();
                filter.TOPUS = cs.getString(13).trim();
            }
            //Obteniendo el mensaje de error ===================================    
            if (cs.getString(14) != null) {
                msj = cs.getString(14).trim();
            }
            //Obteniendo el nplane correcto ===================================
            if (cs.getString(15) != null) {
                filter.NPLANE = cs.getString(15).trim();
            }

            try {
                cs.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

        } catch (Exception e) {
            e.getMessage();
        } finally {
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
        }

        return msj;
    }

    public String loadPX083SQP0069(A1692Filter filter, String strOption) throws SQLException, Exception {

        //REALIZA EL INSERT, UPDATE O DELETE DE UN REGISTRO EN LA TABLA A1691.
        String strMsj = "An Unexpected Error Ocurred.";
        if (strOption.trim().equals("I")) {
            filter.STVAL = "1";//Status Pendiente
            if (filter.VCPN > 0) {
                filter.STVAL = "2";//Status Valorizado
                //Cambio agregado 20150930 a pedido de FVR (Correo)
                filter.FECVAL = Functions.getFechaActual();
                if (filter.MDACP.trim().equals("MXN")) {
                    filter.FVAL = "3";
                } else {
                    filter.FVAL = "1";
                }
            }
        } else if (strOption.trim().equals("U")) {
            if (filter.VCPN > 0 && filter.STVAL.trim().equals("1")) {
                filter.STVAL = "2";//Status Valorizado
                //Cambio agregado 20150930 a pedido de FVR (Correo)
                filter.FECVAL = Functions.getFechaActual();
                if (filter.MDACP.trim().equals("MXN")) {
                    filter.FVAL = "3";
                } else {
                    filter.FVAL = "1";
                }
            }
        }
        if (filter.CARR.trim().equals("")) {
            filter.CARR = filter.IN_CARR;
        }

        CallableStatement cstmt = null;

        Connection cnx = null;
        try {
            String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP0069(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(28, Types.VARCHAR);

            cstmt.setString(1, strOption.trim());
            cstmt.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(3, filter.CCIA.trim());
            cstmt.setString(4, filter.FORMA.trim());
            cstmt.setString(5, filter.SERIE.trim());
            cstmt.setString(6, filter.CUPON.trim());
            cstmt.setString(7, filter.DCHEQ.trim());
            cstmt.setString(8, filter.STVAL.trim());
            cstmt.setString(9, filter.DFLIGHT.trim());
            cstmt.setString(10, filter.NFLIGHT.trim());
            cstmt.setString(11, filter.CDEPART.trim());
            cstmt.setString(12, filter.CARRIVA.trim());
            cstmt.setString(13, filter.ZONA.trim());
            cstmt.setString(14, filter.CARR.trim());
            cstmt.setDouble(15, filter.VCPN);
            cstmt.setDouble(16, filter.COMISI);
            cstmt.setDouble(17, filter.VTAX);
            cstmt.setString(18, filter.MDACP.trim());
            cstmt.setString(19, filter.RFIC.trim());
            cstmt.setString(20, filter.RECODE.trim());
            cstmt.setString(21, filter.TKTASO.trim());
            cstmt.setString(22, session.getUserView().getUserInfo().USR);
            cstmt.setString(23, Functions.getFechaActual());
            cstmt.setString(24, Functions.getHoraActual());
            cstmt.setString(25, filter.FOPERZUL.trim());
            cstmt.setString(26, filter.FVAL.trim());
            cstmt.setString(27, filter.FECVAL.trim());
            cstmt.setString(28, "");
            cstmt.execute();

            strMsj = cstmt.getString(28);

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

    public String loadPX083SQP0070(A1692Filter filter) throws SQLException, Exception {

        CallableStatement cs = null;
        String strSQL;
        String msj;

        Connection cnx = null;
        try {

            strSQL = "{CALL " + session.getMainLibrary() + ".SQP0070(?,?,?,?,?,?,?,?)}";

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(strSQL);

            cs.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cs.setString(2, filter.DFLIGHT.trim());
            cs.setString(3, filter.NFLIGHT.trim());
            cs.setString(4, filter.CDEPART.trim());
            cs.setString(5, filter.CARRIVA.trim());
            cs.setString(6, session.getUserView().getUserInfo().USR);
            cs.setString(7, Functions.getFechaActual());
            cs.setString(8, Functions.getHoraActual());
            cs.execute();
            try {
                cs.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

        } finally {
            msj = "Operation was successful";
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
        }

        return msj;
    }

    public String loadPX095SQP0071(A1692Filter filter) throws SQLException, Exception {

        //REALIZA EL INSERT, UPDATE O DELETE DE UN REGISTRO EN LA TABLA A1691.
        String strMsj = "Operation was successful.";
        filter.STVAL = "1";//Status Pendiente
        if (filter.VCPN > 0 && filter.FECVAL.trim().isEmpty()) {
            filter.STVAL = "2";//Status Valorizado
            //Cambio agregado 20150930 a pedido de FVR (Correo)
            filter.FECVAL = Functions.getFechaActual();
            if (filter.MDACP.trim().equals("MXN")) {
                filter.FVAL = "3";
            } else {
                filter.FVAL = "1";
            }
        }
        //A pedido de ENS 20150120
        if (filter.QTYPAX == 0) {
            filter.QTYPAX = 1;
        }

        CallableStatement cstmt = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP0071_1(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.CCIA.trim());
            cstmt.setString(3, filter.FORMA.trim());
            cstmt.setString(4, filter.SERIE.trim());
            cstmt.setString(5, filter.CUPON.trim());
            cstmt.setString(6, filter.DCHEQ.trim());
            cstmt.setString(7, filter.SEQ.trim());
            cstmt.setString(8, filter.STVAL.trim());
            cstmt.setString(9, filter.DFLIGHT.trim());
            cstmt.setString(10, filter.NFLIGHT.trim());
            cstmt.setString(11, filter.CDEPART.trim());
            cstmt.setString(12, filter.CARRIVA.trim());
            cstmt.setString(13, filter.ZONA.trim());
            cstmt.setString(14, filter.IN_CARR.trim());//filter.CARR.trim()
            cstmt.setDouble(15, filter.VCPN);
            cstmt.setDouble(16, filter.COMISI);
            cstmt.setDouble(17, filter.VTAX);
            cstmt.setString(18, filter.MDACP.trim());
            cstmt.setString(19, session.getUserView().getUserInfo().USR);
            cstmt.setString(20, Functions.getFechaActual());
            cstmt.setString(21, Functions.getHoraActual());
            cstmt.setString(22, filter.TDOC.trim());
            cstmt.setString(23, filter.FLOAD.trim());
            cstmt.setInt(24, filter.QTYPAX);
            cstmt.setString(25, Functions.getFechaActual()); //filter.FCONT.trim() se cambió a pedido de ENS 20150120
            cstmt.setString(26, filter.CABI);
            cstmt.setString(27, filter.CLAS);
            cstmt.setString(28, filter.FBASE);
            cstmt.setString(29, filter.FOPERZUL.trim());
            cstmt.setString(30, filter.FVAL.trim());
            cstmt.setString(31, filter.FECVAL.trim());
            cstmt.setString(32, filter.NPLANE.trim());
            cstmt.execute();

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

    public String loadPX095S12QCAL(A1692Filter filter, String recalculo) throws SQLException, Exception {

        CallableStatement cs = null;
        String strSQL;
        String msj;

        Connection cnx = null;
        try {

            //INDICA SI SE HACE EL CALCULO DE VUELO (SOLO CUANDO CAMBIO DE VUELO) : Y/'' FECHAVUELO/NROVUELO/ORIGEN/DESTINO
            if (recalculo.startsWith("Y") && recalculo.trim().length() == 19) {
                //PARA DESCONTAR DE LAS CANTIDADES DE CPNS DEL VUELO ORIGINAL
                //PX09500009
                strSQL = "{CALL " + session.getMainLibrary() + ".PX095S12QCAL(?,?,?,?,?,?,?,?,?,?)}";

                cnx = session.getCNXIBMDB2().getIBMDB2Connection();
                cs = cnx.prepareCall(strSQL);

                //YDDDDDDDDNNNNOOODDD
                cs.setString(1, session.getUserView().getCustomerInfo().CCUST);
                cs.setString(2, recalculo.substring(13, 16));
                cs.setString(3, recalculo.substring(16, 19));
                cs.setString(4, recalculo.substring(9, 13));
                cs.setString(5, recalculo.substring(1, 9));
                cs.setString(6, "");
                cs.setString(7, session.getUserView().getUserInfo().USR);
                cs.setString(8, Functions.getFechaActual());
                cs.setString(9, Functions.getHoraActual());
                cs.setString(10, "");
                //Indica si el vuelo ha cambiado (Ruta o Nro) para restar del anterior y sumar el nuevo.
                cs.execute();
                try {
                    cs.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }

            //Recalculo del vuelo modificado ===================================
            //PX09500009
            strSQL = "{CALL " + session.getMainLibrary() + ".PX095S12QCAL(?,?,?,?,?,?,?,?,?,?)}";

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(strSQL);

            cs.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cs.setString(2, filter.CDEPART.trim());
            cs.setString(3, filter.CARRIVA.trim());
            cs.setString(4, filter.NFLIGHT.trim());
            cs.setString(5, filter.DFLIGHT.trim());
            cs.setString(6, filter.LEGSEQ.trim());
            cs.setString(7, session.getUserView().getUserInfo().USR);
            cs.setString(8, Functions.getFechaActual());
            cs.setString(9, Functions.getHoraActual());
            cs.setString(10, "");
            //Indica si el vuelo ha cambiado (Ruta o Nro) para restar del anterior y sumar el nuevo.
            cs.execute();
            try {
                cs.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

        } finally {
            msj = "Operation was successful";
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
        }

        return msj;
    }

    public String loadPX187_SQP00118(A1692Filter filter, String fechaScan, String img) throws SQLException, Exception {

        //VERIFICA QUE EL REGISTRO EXISTA EN A1690, QUE CCIA SEA VALIDO 
        //Y HACE UPDATE AL CAMPO FILENAME
        String mensaje = "";
        String ruta = fechaScan + "\\" + img + ".jpg";
        CallableStatement cstmt = null;

        //Connection cnx = null; 
        Connection cnx = null;
        try {
            String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00118(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
            //cstmt = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(16, Types.VARCHAR);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.strTicket.substring(1, 4));//CCIA
            cstmt.setString(3, filter.strTicket.substring(4, 8));//FORMA
            cstmt.setString(4, filter.strTicket.substring(8, 14));//SERIE
            cstmt.setString(5, filter.strTicket.substring(0, 1));//CUPON
            cstmt.setString(6, ruta.trim());
            cstmt.setString(7, session.getUserView().getUserInfo().USR);
            cstmt.setString(8, Functions.getFechaActual());
            cstmt.setString(9, Functions.getHoraActual());
            cstmt.setString(10, filter.TDOC.trim());//TDOC
            cstmt.setString(11, filter.FCONT.trim());//PRDA
            cstmt.setString(12, filter.DFLIGHT.trim());//TDOC
            cstmt.setString(13, filter.NFLIGHT.trim());//TDOC
            cstmt.setString(14, filter.CDEPART.trim());//TDOC
            cstmt.setString(15, filter.CARRIVA.trim());//TDOC
            cstmt.setString(16, "");
            cstmt.executeUpdate();

            //Obteniendo el mensaje resultante =================================
            if (cstmt.getString(16) != null) {
                mensaje = cstmt.getString(16).trim();
            }
            try {
                cstmt.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (mensaje.trim().equals("")) {
                mensaje = "The OCR image has been saved correctly.";
            }

        } catch (Exception e) {
            mensaje = e.getMessage();
            //e.printStackTrace();
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

        return mensaje;
    }

    public String loadPX187_SQP02435(A1692Filter filter, String fechaScan, String img) throws SQLException, Exception {

        //VERIFICA QUE EL REGISTRO EXISTA EN A1690, QUE CCIA SEA VALIDO 
        //Y HACE UPDATE AL CAMPO FILENAME
        String mensaje = "";
        String ruta = fechaScan + "\\" + img + ".jpg";
        CallableStatement cstmt = null;

        //PX13500008
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP02435(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
        //Connection cnx = null; 
        Connection cnx = null;
        try {

            //cstmt = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(16, Types.VARCHAR);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.strTicket.substring(1, 4));//CCIA
            cstmt.setString(3, filter.strTicket.substring(4, 8));//FORMA
            cstmt.setString(4, filter.strTicket.substring(8, 14));//SERIE
            cstmt.setString(5, filter.strTicket.substring(0, 1));//CUPON
            cstmt.setString(6, ruta.trim());
            cstmt.setString(7, session.getUserView().getUserInfo().USR);
            cstmt.setString(8, Functions.getFechaActual());
            cstmt.setString(9, Functions.getHoraActual());
            cstmt.setString(10, filter.TDOC.trim());//TDOC
            cstmt.setString(11, filter.FCONT.trim());//PRDA
            cstmt.setString(12, filter.DFLIGHT.trim());//TDOC
            cstmt.setString(13, filter.NFLIGHT.trim());//TDOC
            cstmt.setString(14, filter.CDEPART.trim());//TDOC
            cstmt.setString(15, filter.CARRIVA.trim());//TDOC
            cstmt.setString(16, "");
            cstmt.executeUpdate();

            //Obteniendo el mensaje resultante =================================
            if (cstmt.getString(16) != null) {
                mensaje = cstmt.getString(16).trim();
            }
            try {
                cstmt.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (mensaje.trim().equals("")) {
                mensaje = "The OCR image has been saved correctly.";
            }

        } catch (Exception e) {
            mensaje = e.getMessage();
            //e.printStackTrace();
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

        return mensaje;
    }

}
