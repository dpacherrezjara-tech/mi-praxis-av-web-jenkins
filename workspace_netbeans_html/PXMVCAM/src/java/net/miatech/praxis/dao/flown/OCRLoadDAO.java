package net.miatech.praxis.dao.flown;

// <editor-fold defaultstate="collapsed" desc="Imports">
import net.miatech.praxis.dao.sales.*;
import static com.ibm.as400.data.PcmlMessageLog.logError;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Vector;
import java.util.logging.Level;
import java.util.logging.Logger;
import net.miatech.beans.A1692Filter;
import net.miatech.beans.SaleAudit.SQP01356Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.utils.Functions;

// </editor-fold>
/**
 *
 * @author gsanchez
 */
public class OCRLoadDAO {

    // <editor-fold defaultstate="collapsed" desc="Variables locales">
    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private String strSQL;
    // </editor-fold>

    public OCRLoadDAO() {
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A1692Filter> loadPX083S01A1692TKT(A1692Filter filter, HashMap<String, String> hmAeropuertos) throws SQLException, Exception {

        List<A1692Filter> lstTkts = new ArrayList<>(0);
        A1692Filter beanTkt;
        try {
            strSQL = "{CALL " + session.getMainLibrary() + ".SQP00986(?,?,?,?,?,?,?,?)}";
            
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(strSQL);

            cs.registerOutParameter(5, Types.INTEGER);
            cs.registerOutParameter(6, Types.INTEGER);
            cs.registerOutParameter(7, Types.INTEGER);
            cs.registerOutParameter(8, Types.INTEGER);

            cs.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cs.setString(2, filter.IN_TKT.substring(0, 3));//CIA
            cs.setString(3, filter.IN_TKT.substring(3, 7));//FORMA
            cs.setString(4, filter.IN_TKT.substring(7, 13));//SERIE

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

            while (rst.next()) {
                beanTkt = new A1692Filter();
                beanTkt.CCIA = rst.getString("CCIA").trim();
                beanTkt.FORMA = rst.getString("FORMA").trim();
                beanTkt.SERIE = rst.getString("SERIE").trim();
                beanTkt.CUPON = rst.getString("CUPON").trim();
                beanTkt.strTicket = rst.getString("CCIA").trim() + " " + rst.getString("FORMA").trim() + rst.getString("SERIE").trim() + " " + rst.getString("CUPON").trim();
                //beanTkt.FCONT = rst.getString("FCONT").trim();
                //beanTkt.strFormatDate2 = Functions.getMonthConvert(beanTkt.FCONT);
                beanTkt.CDEPART = rst.getString("CDEPART").trim();
                if (hmAeropuertos.containsKey(rst.getString("CDEPART").trim().toUpperCase())) {
                    beanTkt.strDescCDEPART = hmAeropuertos.get(rst.getString("CDEPART").trim()).toString();
                }
                beanTkt.CARRIVA = rst.getString("CARRIVA").trim();
                if (hmAeropuertos.containsKey(rst.getString("CARRIVA").trim().toUpperCase())) {
                    beanTkt.strDescCARRIVA = hmAeropuertos.get(rst.getString("CARRIVA").trim()).toString();
                }
                beanTkt.NFLIGHT = rst.getString("NFLIGHT").trim();
                // beanTkt.IN_NFLIGHT = NFLIGHT;
                beanTkt.DFLIGHT = rst.getString("DFLIGHT").trim();
                //beanTkt.LEGSEQ = rst.getString("LEGSEQ").trim();
                beanTkt.strFormatDate = Functions.getMonthConvert(beanTkt.DFLIGHT);
                beanTkt.TDOC = rst.getString("TDOC").trim();
                beanTkt.PRDA = Functions.getMonthConvert(rst.getString("PRDA").trim());
                //beanTkt.PSVVTA = rst.getString("PSVVTA").trim();
                /*if (hmPaises.containsKey(rst.getString("PSVVTA").trim().toUpperCase())) {
                 beanTkt.strDescPSVVTA = hmPaises.get(rst.getString("PSVVTA").trim()).toString();
                 }*/
                //beanTkt.AGTIA = rst.getString("AGTIA").trim();
                //beanTkt.FVTA = rst.getString("FVTA").trim();
                //beanTkt.strFormatFVTA = Functions.getMonthConvert(beanTkt.FVTA);
                //beanTkt.TOPUS = rst.getString("TOPUS").trim();
                //beanTkt.CARR = rst.getString("CARR").trim();
                //beanTkt.CABI = rst.getString("CABI").trim();
                //beanTkt.VCPN = rst.getDouble("VCPN");
                //beanTkt.MDACP = rst.getString("MDACP").trim();
                //beanTkt.VCPMX = rst.getDouble("VCPMX");
                //beanTkt.TCMUS = rst.getDouble("TCMUS");
                //beanTkt.VCPUS = rst.getDouble("VCPUS");

                beanTkt.page.PAGNUM = filter.page.PAGNUM;
                beanTkt.page.PAGROW = filter.page.PAGROW;
                beanTkt.page.TOTPAG = filter.page.TOTPAG;
                beanTkt.page.TOTROW = filter.page.TOTROW;

                lstTkts.add(beanTkt);
            }

        } finally {
            setClose();
        }

        return lstTkts;
    }

    public List<A1692Filter> loadPX083S01A1692(A1692Filter filter, HashMap<String, String> hmAeropuertos) throws SQLException, Exception {

        List<A1692Filter> lstTkts = new ArrayList<>(0);
        A1692Filter beanTkt;
        String NFLIGHT = filter.NFLIGHT.trim();

        if (!NFLIGHT.equals("") && NFLIGHT.length() < 4) {
            NFLIGHT = Functions.fillZeros(4, NFLIGHT);
        }

        // <editor-fold defaultstate="collapsed" desc=" 'DATE' ">
        filter.yearFrom = Functions.fillZeros(4, filter.yearFrom).replace("00", "");//YYYY
        filter.monthFrom = Functions.fillZeros(2, filter.monthFrom).replace("00", "");
        filter.dayFrom = Functions.fillZeros(2, filter.dayFrom).replace("00", "");
        filter.yearTo = Functions.fillZeros(4, filter.yearTo).replace("00", "");//YYYY
        filter.monthTo = Functions.fillZeros(2, filter.monthTo).replace("00", "");
        filter.dayTo = Functions.fillZeros(2, filter.dayTo).replace("00", "");
        //</editor-fold>

        strSQL = "{CALL " + session.getMainLibrary() + ".PX083S01A1692(?,?,?,?,?,?,?,?,?,?,?,?,?)}";
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(strSQL);

            cs.registerOutParameter(10, Types.INTEGER);
            cs.registerOutParameter(11, Types.INTEGER);
            cs.registerOutParameter(12, Types.INTEGER);
            cs.registerOutParameter(13, Types.INTEGER);

            cs.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cs.setString(2, filter.yearFrom + filter.monthFrom + filter.dayFrom);
            cs.setString(3, filter.yearTo + filter.monthTo + filter.dayTo);
            cs.setString(4, Functions.getFechaActual());
            cs.setString(5, NFLIGHT);
            cs.setString(6, filter.STVAL.trim());
            cs.setString(7, filter.PSVVTA.trim());
            cs.setString(8, filter.CDEPART.trim());
            cs.setString(9, filter.CARRIVA.trim());
            cs.setInt(10, filter.page.PAGNUM);
            cs.setInt(11, filter.page.PAGROW);
            cs.setInt(12, filter.page.TOTPAG);
            cs.setInt(13, filter.page.TOTROW);
            cs.execute();

            filter.page.PAGNUM = cs.getInt(10);
            filter.page.PAGROW = cs.getInt(11);
            filter.page.TOTPAG = cs.getInt(12);
            filter.page.TOTROW = cs.getInt(13);

            rst = cs.getResultSet();

            while (rst.next()) {
                beanTkt = new A1692Filter();
                beanTkt.CCIA = rst.getString("CCIA").trim();
                beanTkt.FORMA = rst.getString("FORMA").trim();
                beanTkt.SERIE = rst.getString("SERIE").trim();
                beanTkt.CUPON = rst.getString("CUPON").trim();
                beanTkt.strTicket = rst.getString("CCIA").trim() + " " + rst.getString("FORMA").trim() + rst.getString("SERIE").trim() + " " + rst.getString("CUPON").trim();
                //beanTkt.FCONT = rst.getString("FCONT").trim();
                //beanTkt.strFormatDate2 = Functions.getMonthConvert(beanTkt.FCONT);
                beanTkt.CDEPART = rst.getString("CDEPART").trim();
                if (hmAeropuertos.containsKey(rst.getString("CDEPART").trim().toUpperCase())) {
                    beanTkt.strDescCDEPART = hmAeropuertos.get(rst.getString("CDEPART").trim()).toString();
                }
                beanTkt.CARRIVA = rst.getString("CARRIVA").trim();
                if (hmAeropuertos.containsKey(rst.getString("CARRIVA").trim().toUpperCase())) {
                    beanTkt.strDescCARRIVA = hmAeropuertos.get(rst.getString("CARRIVA").trim()).toString();
                }
                beanTkt.NFLIGHT = rst.getString("NFLIGHT").trim();
                beanTkt.IN_NFLIGHT = NFLIGHT;
                beanTkt.DFLIGHT = rst.getString("DFLIGHT").trim();
                //beanTkt.LEGSEQ = rst.getString("LEGSEQ").trim();
                beanTkt.strFormatDate = Functions.getMonthConvert(beanTkt.DFLIGHT);
                beanTkt.TDOC = rst.getString("TDOC").trim();
                beanTkt.PRDA = Functions.getMonthConvert(rst.getString("PRDA").trim());
                //beanTkt.PSVVTA = rst.getString("PSVVTA").trim();
                /*if (hmPaises.containsKey(rst.getString("PSVVTA").trim().toUpperCase())) {
                 beanTkt.strDescPSVVTA = hmPaises.get(rst.getString("PSVVTA").trim()).toString();
                 }*/
                //beanTkt.AGTIA = rst.getString("AGTIA").trim();
                //beanTkt.FVTA = rst.getString("FVTA").trim();
                //beanTkt.strFormatFVTA = Functions.getMonthConvert(beanTkt.FVTA);
                //beanTkt.TOPUS = rst.getString("TOPUS").trim();
                //beanTkt.CARR = rst.getString("CARR").trim();
                //beanTkt.CABI = rst.getString("CABI").trim();
                //beanTkt.VCPN = rst.getDouble("VCPN");
                //beanTkt.MDACP = rst.getString("MDACP").trim();
                //beanTkt.VCPMX = rst.getDouble("VCPMX");
                //beanTkt.TCMUS = rst.getDouble("TCMUS");
                //beanTkt.VCPUS = rst.getDouble("VCPUS");

                beanTkt.page.PAGNUM = filter.page.PAGNUM;
                beanTkt.page.PAGROW = filter.page.PAGROW;
                beanTkt.page.TOTPAG = filter.page.TOTPAG;
                beanTkt.page.TOTROW = filter.page.TOTROW;

                lstTkts.add(beanTkt);
            }
        } finally {
            setClose();
        }

        return lstTkts;
    }
    
    public A1692Filter loadPX083SQP0068(String strTicket, HashMap<String, String> hmAeropuertos) throws SQLException, Exception {

        A1692Filter beanCons = new A1692Filter();

        strSQL = "{CALL " + session.getMainLibrary() + ".SQP0068(?,?,?,?,?)}";
        try {

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(strSQL);

            cs.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cs.setString(2, strTicket.substring(0, 3));
            cs.setString(3, strTicket.substring(3, 7));
            cs.setString(4, strTicket.substring(7, 13));
            cs.setString(5, strTicket.substring(13, 14));
            cs.execute();

            rst = cs.getResultSet();
            if (rst.next()) {
                beanCons = new A1692Filter();
                beanCons.CCUST = rst.getString("CCUST").trim();
                beanCons.CCIA = rst.getString("CCIA").trim();
                beanCons.FORMA = rst.getString("FORMA").trim();
                beanCons.SERIE = rst.getString("SERIE").trim();
                beanCons.CUPON = rst.getString("CUPON").trim();
                beanCons.strTicket = rst.getString("CCIA").trim() + rst.getString("FORMA").trim() + rst.getString("SERIE").trim() + rst.getString("CUPON").trim();
                beanCons.DCHEQ = rst.getString("DCHEQ").trim();
                beanCons.STVAL = rst.getString("STVAL").trim();
                beanCons.DFLIGHT = rst.getString("DFLIGHT").trim();
                beanCons.NFLIGHT = rst.getString("NFLIGHT").trim();
                beanCons.CDEPART = rst.getString("CDEPART").trim();
                if (hmAeropuertos.containsKey(rst.getString("CDEPART").trim().toUpperCase())) {
                    beanCons.strDescCDEPART = hmAeropuertos.get(rst.getString("CDEPART").trim()).toString();
                }
                beanCons.CARRIVA = rst.getString("CARRIVA").trim();
                if (hmAeropuertos.containsKey(rst.getString("CARRIVA").trim().toUpperCase())) {
                    beanCons.strDescCARRIVA = hmAeropuertos.get(rst.getString("CARRIVA").trim()).toString();
                }
                beanCons.FILENAME = rst.getString("FILENAME").trim();
                beanCons.TDOC = rst.getString("TDOC").trim();
                beanCons.USCR = rst.getString("USCR").trim();
                beanCons.FECR = rst.getString("FECR").trim();
                beanCons.HOCR = Functions.ConvertedTime(rst.getString("HOCR").trim());
                beanCons.USUP = rst.getString("USUP").trim();
                beanCons.FEUP = rst.getString("FEUP").trim();
                beanCons.HOUP = Functions.ConvertedTime(rst.getString("HOUP").trim());
            }
        } finally {
            setClose();
        }

        return beanCons;
    }
    
    public A1692Filter loadPX083SQP0008(A1692Filter filter) throws SQLException, Exception {
        try {
            strSQL = "{CALL " + session.getMainLibrary() + ".SQP0008(?,?,?,?,?)}";
            
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(strSQL);

            cs.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cs.setString(2, filter.DFLIGHT.trim());
            cs.setString(3, filter.NFLIGHT.trim());
            cs.setString(4, filter.CDEPART.trim());
            cs.setString(5, filter.CARRIVA.trim());
            cs.execute();

            rst = cs.getResultSet();
            if (rst.next()) {
                filter.CARR = rst.getString("CARRI").trim();
                filter.LEGSEQ = rst.getString("LEGSEQ").trim();
                filter.NPLANE = rst.getString("NPLANE").trim();
            }

        } finally {
            setClose();
        }

        return filter;
    }
    
    public String loadPX083SQP01281(A1692Filter filter, String flag) throws SQLException, Exception {
        String msj = "";
        try {
            //PX09500005
            strSQL = "{CALL " + session.getMainLibrary() + ".SQP01281(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(strSQL);
            cs.registerOutParameter(13, Types.VARCHAR);
            cs.registerOutParameter(14, Types.VARCHAR);
            cs.registerOutParameter(15, Types.VARCHAR);
            cs.registerOutParameter(16, Types.VARCHAR);
            cs.registerOutParameter(17, Types.VARCHAR);

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
            cs.setString(11, filter.TKTASO.trim());
            cs.setString(12, filter.strTicket.trim());
            cs.setString(13, "");//INOUT   IO_NCARR     VARCHAR(2),   -- CARRIER A1691
            cs.setString(14, "");//INOUT   IO_ZONE      VARCHAR(3),   -- ZONA
            cs.setString(15, "");//INOUT   IO_TOPER     VARCHAR(1),   -- TIPO DE OPERACIÓN
            cs.setString(16, "");//INOUT   IO_MSJ       VARCHAR(100), -- MENSAJE DE SALIDA
            cs.setString(17, "");//INOUT   IO_NPLANE    VARCHAR(10)   -- AVION
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
            //Obteniendo el nplane correcto ===================================
            if (cs.getString(17) != null) {
                filter.NPLANE = cs.getString(17).trim();
            }
        } finally {
            setClose();
        }

        return msj;
    }
    
    public String loadPX083SQP0069(A1692Filter filter, String strOption) throws SQLException {

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
        try {
            strSQL = "{CALL " + session.getMainLibrary() + ".SQP0069(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
            
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(strSQL);
            cs.registerOutParameter(28, Types.VARCHAR);

            cs.setString(1, strOption.trim());
            cs.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cs.setString(3, filter.CCIA.trim());
            cs.setString(4, filter.FORMA.trim());
            cs.setString(5, filter.SERIE.trim());
            cs.setString(6, filter.CUPON.trim());
            cs.setString(7, filter.DCHEQ.trim());
            cs.setString(8, filter.STVAL.trim());
            cs.setString(9, filter.DFLIGHT.trim());
            cs.setString(10, filter.NFLIGHT.trim());
            cs.setString(11, filter.CDEPART.trim());
            cs.setString(12, filter.CARRIVA.trim());
            cs.setString(13, filter.ZONA.trim());
            cs.setString(14, filter.CARR.trim());
            cs.setDouble(15, filter.VCPN);
            cs.setDouble(16, filter.COMISI);
            cs.setDouble(17, filter.VTAX);
            cs.setString(18, filter.MDACP.trim());
            cs.setString(19, filter.RFIC.trim());
            cs.setString(20, filter.RECODE.trim());
            cs.setString(21, filter.TKTASO.trim());
            cs.setString(22, session.getUserView().getUserInfo().USR);
            cs.setString(23, Functions.getFechaActual());
            cs.setString(24, Functions.getHoraActual());
            cs.setString(25, filter.FOPERZUL.trim());
            cs.setString(26, filter.FVAL.trim());
            cs.setString(27, filter.FECVAL.trim());
            cs.setString(28, "");
            cs.execute();

            strMsj = cs.getString(28);

        } catch (Exception e) {
            strMsj = e.getMessage();
        } finally {
            setClose();
        }

        return strMsj;
    }
    
    public String loadPX083SQP0070(A1692Filter filter) throws SQLException, Exception {
        String msj;
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
        } finally {
            msj = "Operation was successful";
            setClose();
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
        strSQL = "{CALL " + session.getMainLibrary() + ".SQP0071_1(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
        try {

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(strSQL);

            cs.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cs.setString(2, filter.CCIA.trim());
            cs.setString(3, filter.FORMA.trim());
            cs.setString(4, filter.SERIE.trim());
            cs.setString(5, filter.CUPON.trim());
            cs.setString(6, filter.DCHEQ.trim());
            cs.setString(7, filter.SEQ.trim());
            cs.setString(8, filter.STVAL.trim());
            cs.setString(9, filter.DFLIGHT.trim());
            cs.setString(10, filter.NFLIGHT.trim());
            cs.setString(11, filter.CDEPART.trim());
            cs.setString(12, filter.CARRIVA.trim());
            cs.setString(13, filter.ZONA.trim());
            cs.setString(14, filter.IN_CARR.trim());//filter.CARR.trim()
            cs.setDouble(15, filter.VCPN);
            cs.setDouble(16, filter.COMISI);
            cs.setDouble(17, filter.VTAX);
            cs.setString(18, filter.MDACP.trim());
            cs.setString(19, session.getUserView().getUserInfo().USR);
            cs.setString(20, Functions.getFechaActual());
            cs.setString(21, Functions.getHoraActual());
            cs.setString(22, filter.TDOC.trim());
            cs.setString(23, filter.FLOAD.trim());
            cs.setInt(24, filter.QTYPAX);
            cs.setString(25, Functions.getFechaActual()); //filter.FCONT.trim() se cambió a pedido de ENS 20150120
            cs.setString(26, filter.CABI);
            cs.setString(27, filter.CLAS);
            cs.setString(28, filter.FBASE);
            cs.setString(29, filter.FOPERZUL.trim());
            cs.setString(30, filter.FVAL.trim());
            cs.setString(31, filter.FECVAL.trim());
            cs.setString(32, filter.NPLANE.trim());
            cs.execute();

        } catch (Exception e) {
            strMsj = e.getMessage();
        } finally {
            setClose();
        }

        return strMsj;
    }
    
    public String loadPX095S12QCAL(A1692Filter filter, String recalculo) throws SQLException, Exception {
        String msj;
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
        } finally {
            msj = "Operation was successful";
            setClose();
        }

        return msj;
    }
    
    public String loadPX083SQP0072(A1692Filter filter, String strOption) throws SQLException {

        //REALIZA EL INSERT, UPDATE O DELETE DE UN REGISTRO EN LA TABLA A1690.
        String strMsj = "Operation was successful.";

        try {
            strSQL = "{CALL " + session.getMainLibrary() + ".SQP0072(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(strSQL);
            cs.registerOutParameter(16, Types.VARCHAR);

            cs.setString(1, strOption.trim());
            cs.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cs.setString(3, filter.CCIA.trim());
            cs.setString(4, filter.FORMA.trim());
            cs.setString(5, filter.SERIE.trim());
            cs.setString(6, filter.CUPON.trim());
            cs.setString(7, filter.DCHEQ.trim());
            cs.setString(8, filter.STVAL.trim());
            cs.setString(9, filter.DFLIGHT.trim());
            cs.setString(10, filter.NFLIGHT.trim());
            cs.setString(11, filter.CDEPART.trim());
            cs.setString(12, filter.CARRIVA.trim());
            cs.setString(13, session.getUserView().getUserInfo().USR);
            cs.setString(14, Functions.getFechaActual());
            cs.setString(15, Functions.getHoraActual());
            cs.setString(16, "");//MSJ
            cs.execute();

            //Obteniendo el mensaje de error ===================================    
            if (cs.getString(16) != null) {
                strMsj = cs.getString(16).trim();
            }

        } catch (Exception e) {
            strMsj = e.getMessage();
        } finally {
            setClose();
        }

        return strMsj;
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
