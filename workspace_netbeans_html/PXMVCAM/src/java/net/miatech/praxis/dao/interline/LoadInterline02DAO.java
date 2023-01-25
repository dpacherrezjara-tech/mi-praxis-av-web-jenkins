package net.miatech.praxis.dao.interline;

import java.sql.CallableStatement;
import java.sql.Statement;
import java.sql.Connection;
import java.sql.DatabaseMetaData;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import net.miatech.beans.spring.implement.IServerSession;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import net.miatech.beans.A020Filter;
import net.miatech.beans.A050Filter;
import net.miatech.beans.A1692Filter;
import net.miatech.beans.A720Filter;
import net.miatech.libmiatec.A021;
import net.miatech.praxis.flown.A728;
import net.miatech.praxis.interline.A1851;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author gsanchez
 */
public class LoadInterline02DAO {

    private IServerSession session;
    private static final Logger logError = Logger.getLogger("errorLog");

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public HashMap loadPX164SQP0098(A728 filter) throws SQLException, Exception {

        A728 dataA728 = new A728();
        //ROUNTING
        A728 sector;
        List<A728> list = new ArrayList<A728>();
        int intQty = 0;
        HashMap<String, Object> hmResultado = new HashMap<String, Object>();
        HashMap<String, String> hmAMTV = new HashMap<String, String>();
        hmAMTV.put("S", "SRP");
        hmAMTV.put("A", "SPA");
        hmAMTV.put("AZ", "ZED");
        hmAMTV.put("AM", "MXP");
        hmAMTV.put("AQ", "FQT");
        hmAMTV.put("AP", "SMP");
        hmAMTV.put("A&", "F&F");
        hmAMTV.put("AR", "RTW");
        hmAMTV.put("AL", "GLB");
        hmAMTV.put("M", "MPA");
        hmAMTV.put("P", "MPA");
        hmAMTV.put("R", "RTW");
        hmAMTV.put("H", "ACH");

        CallableStatement cstmt = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP0098(?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            //cstmt = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, session.getUserView().getCustomerInfoComplete().fileA005.A005KEY1);
            cstmt.setString(3, filter.A728NROPRT.trim());
            cstmt.setString(4, filter.A728CIA.trim());
            cstmt.setString(5, filter.A728NRODOC.trim());
            cstmt.setString(6, filter.A728CUPON.trim());
            cstmt.execute();

            rs01 = cstmt.getResultSet();
            dataA728.A728NROPRT = filter.A728NROPRT;
            dataA728.A728CIA = filter.A728CIA;
            dataA728.A728NRODOC = filter.A728NRODOC;
            dataA728.A728CUPON = filter.A728CUPON;

            // <editor-fold defaultstate="collapsed" desc="OBTENIENDO DATOS DEL A728">
            while (rs01.next()) {
                if (intQty == 0) {

                    dataA728.A728NROPRT = rs01.getString("A728NROPRT").trim();
                    dataA728.A728CIA = rs01.getString("A728CIA").trim();
                    dataA728.A728NRODOC = rs01.getString("A728NRODOC").trim();
                    dataA728.A728CUPON = rs01.getString("A728CUPON").trim();
                    dataA728.A728FECFAC = rs01.getString("A728FECFAC").trim();
                    dataA728.A728FECVTA = rs01.getString("A728FECVTA").trim();
                    dataA728.A728AIRFAC = rs01.getString("A728AIRFAC").trim();
                    dataA728.A728CTYVTA = rs01.getString("A728CTYVTA").trim();
                    dataA728.A728CTYEMI = rs01.getString("A728CTYEMI").trim();
                    dataA728.A728GRUPO = rs01.getString("A728GRUPO").trim();
                    dataA728.A728COUVTA = rs01.getString("A728COUVTA").trim();
                    dataA728.A728COUEMI = rs01.getString("A728COUEMI").trim();
                    dataA728.A728AJTRAM = rs01.getString("A728AJTRAM").trim();
                    dataA728.A728SECOR = rs01.getString("A728SECOR").trim();
                    dataA728.A728SECDS = rs01.getString("A728SECDS").trim();
                    dataA728.A728ATBP = rs01.getDouble("A728ATBP");
                    dataA728.A728MDAATB = rs01.getString("A728MDAATB").trim();
                    dataA728.A728CODTAX = rs01.getString("A728CODTAX").trim();
                    dataA728.A728TDESC = rs01.getString("A728TDESC").trim();
                    dataA728.A728PORDES = rs01.getDouble("A728PORDES");
                    dataA728.A728CODIT = rs01.getString("A728CODIT").trim();
                    dataA728.A728CSOVER = rs01.getDouble("A728CSOVER");
                    dataA728.A728QSOVER = rs01.getInt("A728QSOVER");
                    dataA728.A728IPLUS = rs01.getString("A728IPLUS").trim();
                    dataA728.A728CPLUSS = rs01.getInt("A728CPLUSS");
                    dataA728.A728TAJUST = rs01.getDouble("A728TAJUST");
                    dataA728.A728RUTORG = rs01.getString("A728RUTORG").trim();
                    dataA728.A728MONSYS = rs01.getString("A728MONSYS").trim();
                    dataA728.A728LOHO = rs01.getString("A728LOHO").trim();
                    dataA728.A728TARIFA = rs01.getDouble("A728TARIFA");
                    dataA728.A728MONEDA = rs01.getString("A728MONEDA").trim();
                    dataA728.A728TRFPAG = rs01.getDouble("A728TRFPAG");
                    dataA728.A728MDAPAG = rs01.getString("A728MDAPAG").trim();
                    dataA728.A728ROE = rs01.getDouble("A728ROE");
                    //======================================================
                    //CAMPOS ADICIONALES QUE SON EXTRAIDOS PERO NO MAODIFICADOS EN EL FORMULARIO
                    dataA728.A728SEQPRT = rs01.getString("A728SEQPRT").trim();
                    dataA728.A728DCHEQ = rs01.getString("A728DCHEQ").trim();
                    dataA728.A728TVENTA = rs01.getString("A728TVENTA").trim();
                    dataA728.A728TCAREG = rs01.getDouble("A728TCAREG");
                    dataA728.A728MONREG = rs01.getString("A728MONREG").trim();
                    dataA728.A728TCASYS = rs01.getDouble("A728TCASYS");
                    dataA728.A728TCAPAG = rs01.getDouble("A728TCAPAG");
                    dataA728.A728INDSAM = rs01.getString("A728INDSAM").trim();
                    dataA728.A728INDPRT = rs01.getInt("A728INDPRT");
                    dataA728.A728SELEC = rs01.getString("A728SELEC").trim();
                    dataA728.A728FREGIS = rs01.getString("A728FREGIS").trim();
                    dataA728.A728HREGIS = rs01.getString("A728HREGIS").trim();
                    dataA728.A728REGIST = rs01.getString("A728REGIST").trim();
                    dataA728.valTiempoLimite = true;
                    dataA728.tieneComision = false;
                    //======================================================
                    //======================================================
                    sector = new A728();
                    sector.A728RUTAD = rs01.getString("A728RUTAO").trim();
                    sector.A728RERUT = rs01.getString("A728RERUT").trim();

                    list.add(sector);
                }

                if (rs01.getString("A728SECOR").trim().equals(rs01.getString("A728RUTAO").trim())
                        && rs01.getString("A728SECDS").trim().equals(rs01.getString("A728RUTAD").trim())) {
                    dataA728.A728FVLO1 = rs01.getString("A728FVLO1").trim();
                    dataA728.A728FBASE1 = rs01.getString("A728FBASE1").trim();
                }

                if (!rs01.getString("A728RUTAD").trim().equals("")) {

                    sector = new A728();
                    sector.A728RUTAD = rs01.getString("A728RUTAD").trim();
                    sector.A728CARRA1 = rs01.getString("A728CARRA1").trim();
                    sector.A728NVLO1 = rs01.getString("A728NVLO1").trim();
                    sector.A728BOOKI1 = rs01.getString("A728BOOKI1").trim();
                    sector.A728SS1 = rs01.getDouble("A728SS1");
                    sector.A728XO = rs01.getString("A728XO").trim();
                    sector.A728FACT1 = rs01.getLong("A728FACT1");
                    sector.A728PROV1 = rs01.getDouble("A728PROV1");
                    sector.A728PPRO1 = rs01.getDouble("A728PPRO1");
                    sector.A728TARI1 = rs01.getDouble("A728TARI1");
                    sector.A728ACUEO1 = rs01.getDouble("A728ACUEO1");
                    sector.A728VALOR1 = rs01.getDouble("A728VALOR1");

                    if (rs01.getString("A728INDPR1").trim().equals("A")) {
                        sector.strAMTV = "SPA";
                        if (rs01.getString("A728ACUCO1").trim().length()>=10 && 
                                hmAMTV.containsKey("A" + rs01.getString("A728ACUCO1").substring(9, 10))) {
                            sector.strAMTV = hmAMTV.get("A" + rs01.getString("A728ACUCO1").substring(9, 10)).toString();
                        }
                    } else {
                        if (hmAMTV.containsKey(rs01.getString("A728INDPR1").trim())) {
                            sector.strAMTV = hmAMTV.get(rs01.getString("A728INDPR1").trim()).toString();
                        }
                    }
                    sector.A728AJUST1 = rs01.getDouble("A728AJUST1");
                    //==============================================================
                    //CAMPOS ADICIONALES QUE SON EXTRAIDOS PERO NO MAODIFICADOS EN EL FORMULARIO
                    sector.A728VIA1 = rs01.getString("A728VIA1").trim();
                    sector.A728CARRN1 = rs01.getString("A728CARRN1").trim();
                    sector.A728FVLO1 = rs01.getString("A728FVLO1").trim();
                    sector.A728CLASE1 = rs01.getString("A728CLASE1").trim();
                    sector.A728FBASE1 = rs01.getString("A728FBASE1").trim();
                    sector.A728LOHO = rs01.getString("A728LOHO").trim();
                    sector.A728TBASE1 = rs01.getString("A728TBASE1").trim();
                    sector.A728STBAS1 = rs01.getString("A728STBAS1").trim();
                    sector.A728FARE1 = rs01.getDouble("A728FARE1");
                    sector.A728TFARE1 = rs01.getString("A728TFARE1").trim();
                    sector.A728DIFER1 = rs01.getDouble("A728DIFER1");
                    sector.A728FDIFE1 = rs01.getString("A728FDIFE1").trim();
                    sector.A728TRFM1 = rs01.getDouble("A728TRFM1");
                    sector.A728MNTFM1 = rs01.getString("A728MNTFM1").trim();
                    sector.A728CPLUSS = rs01.getDouble("A728CPLUSS");
                    sector.A728STOP1 = rs01.getDouble("A728STOP1");
                    sector.A728MNACU1 = rs01.getString("A728MNACU1").trim();
                    sector.A728ACUCO1 = rs01.getString("A728ACUCO1").trim();
                    sector.A728ACUE1 = rs01.getDouble("A728ACUE1");
                    sector.A728YANQ1 = rs01.getDouble("A728YANQ1");
                    sector.A728SUBPA1 = rs01.getString("A728SUBPA1").trim();
                    sector.A728VLMPA1 = rs01.getDouble("A728VLMPA1");
                    sector.A728VLSRP1 = rs01.getDouble("A728VLSRP1");
                    sector.A728INDPR1 = rs01.getString("A728INDPR1").trim();
                    sector.A728INDISC = rs01.getString("A728INDISC").trim();
                    sector.A728ISC = rs01.getDouble("A728ISC");
                    sector.A728COEFIC = rs01.getDouble("A728COEFIC");
                    sector.A728ACUBS1 = rs01.getString("A728ACUBS1").trim();
                    sector.A728ACUST1 = rs01.getString("A728ACUST1").trim();
                    sector.A728PRVST1 = rs01.getString("A728PRVST1").trim();
                    sector.A728RERUT = rs01.getString("A728RERUT").trim();
                    //=================================================================
                        /*Para saber si la ruta que viene pertenece al sector a prorratear.
                     Esto se hace para que se pueda mostrar "La pistolita" */
                    if (list.get(list.size() - 1).A728RUTAD.trim().equals(rs01.getString("A728SECOR").trim())
                            && rs01.getString("A728RUTAD").trim().equals(rs01.getString("A728SECDS").trim())) {
                        list.get(list.size() - 1).esSector = "solo";
                        sector.esSector = "todo";
                        dataA728.A728RERUT = rs01.getString("A728RERUT").trim();
                    }
                    //=================================================================
                    list.add(sector);
                }

                intQty++;
            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            //Esta porción de código se hace para colocar el X/O en la ciudad correcta .. debido
            //a que el X/O q traía pertenecía al sector anterior
            for (int x = 0; x < list.size() - 1; x++) {
                list.get(x).A728XO = list.get(x + 1).A728XO;
            }
            if (list != null && list.size() > 0) {
                //Seteando el X/O de la última ciudad del Routing ya q es imposible q 
                //esta tenga ESCALA
                list.get(list.size() - 1).A728XO = "";
            }
            //data.setSECTORS(list);

            //</editor-fold>
            if (cstmt.getMoreResults()) {
                // <editor-fold defaultstate="collapsed" desc="OBTENIENDO DATOS DEL A005">
                rs01 = cstmt.getResultSet();
                if (rs01.next()) {
                    if (rs01.getString("A005KEY3").trim().isEmpty()) {
                        dataA728.strAirlineName = rs01.getString("A005KEY2").trim();
                    } else {
                        dataA728.strAirlineName = rs01.getString("A005KEY3").trim();
                    }
                    dataA728.strAlfa = rs01.getString("A005KEY1");
                    dataA728.strCHS = rs01.getString("A005CHS");
                }
                try {
                    rs01.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
                //</editor-fold>
            }

            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
            try {
                cstmt.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            hmResultado.put("A728", dataA728);
            hmResultado.put("SECTORES", list);

        } finally {
            if (rs01 != null) {
                try {
                    rs01.close();
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

        return hmResultado;
    }

    public HashMap loadPX164SQP0074(A020Filter filter) throws SQLException, Exception {

        A020Filter data = new A020Filter();
        A728 dataA728 = new A728();

        //ROUNTING
        A728 sector;
        List<A728> list = new ArrayList<A728>();
        int intQty = 0;
        HashMap<String, Object> hmResultado = new HashMap<String, Object>();
        HashMap<String, String> hmAMTV = new HashMap<String, String>();
        hmAMTV.put("S", "SRP");
        hmAMTV.put("A", "SPA");
        hmAMTV.put("AZ", "ZED");
        hmAMTV.put("AM", "MXP");
        hmAMTV.put("AQ", "FQT");
        hmAMTV.put("AP", "SMP");
        hmAMTV.put("A&", "F&F");
        hmAMTV.put("AR", "RTW");
        hmAMTV.put("AL", "GLB");
        hmAMTV.put("M", "MPA");
        hmAMTV.put("P", "MPA");
        hmAMTV.put("R", "RTW");
        hmAMTV.put("H", "ACH");

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP0074(?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, session.getUserView().getCustomerInfoComplete().fileA005.A005KEY1);
            cstmt.setString(3, filter.strTicket.trim().replace(" ", "").replace(" ", ""));
            cstmt.setString(4, filter.A020NROPRT);
            cstmt.setString(5, filter.A020FVLO);
            cstmt.execute();

            rst = cstmt.getResultSet();

            // <editor-fold defaultstate="collapsed" desc="OBTENIENDO DATOS DEL A050">
            data.strTicket = filter.strTicket.trim().replace(" ", "").replace(" ", "");

            if (rst.next()) {

                data.A020KEY = rst.getString("A050NROPRT").trim();
                data.A020NROPRT = rst.getString("A050NROPRT").trim();
                data.A020TCALC = rst.getString("A050TCALC").trim();
                data.A020TIPORM = rst.getString("A050TIPORM").trim();
                data.A020TUSO = rst.getString("A050TUSO").trim();
                data.A020TOTDEB = rst.getDouble("A050TOTDEB");
                data.A020NETO = rst.getDouble("A050NETO");
                data.A020USER = rst.getString("A050USER").trim();
                data.A020SDATE = rst.getString("A050SDATE").trim();
                data.A020ACEPTA = rst.getDouble("A050ACEPTA");
                data.A020TOTHAB = rst.getDouble("A050TOTHAB");
                data.A020PSTRF = rst.getString("A050PSTRF").trim();
                data.A020RMSN = rst.getString("A050RMSN").trim();
                data.A020MONEDA = rst.getString("A050MONEDA").trim();
                data.A020STIME = rst.getString("A050STIME").trim();
                data.A020TARIFA = rst.getDouble("A050TARIFA");
                data.A020COMISI = rst.getDouble("A050COMISI");
                data.A020GRUPO = rst.getString("A050GRUPO").trim();
                data.A020FAREUS = rst.getDouble("A050FAREUS");
                data.A020COMISP = rst.getDouble("A050COMISP");
                data.A020FUSO = rst.getString("A050FUSO").trim();
                data.A020MNRCD = rst.getString("A050MNRCD").trim();
                data.A020BASE = rst.getString("A050BASE").trim();
                data.A020DEBHAB = rst.getString("A050DEBHAB").trim();
                data.A020QSEGUS = rst.getDouble("A050QSEGUS");
                data.A050TUA = rst.getDouble("A050TUA");
                data.A050FCONTA = rst.getString("A050FCONTA");
                data.A050CRTR = rst.getString("A050CRTR");
                data.A050AIRLI3 = rst.getString("A050AIRLI3");
                data.A050FVUELO = rst.getString("A050FVUELO");
                data.A050NVUELO = rst.getString("A050NVUELO");
                data.A050RUTVOL = rst.getString("A050RUTVOL");
                data.A050FBILLE = rst.getString("A050FBILLE");
                data.A050QPAX = rst.getLong("A050QPAX");
                data.DES_BAIR = rst.getString("DES_BAIR");
                data.A050OVRAMT = rst.getDouble("A050OVRAMT");
                data.A050OVRISC = rst.getDouble("A050OVRISC");

                if (rst.getString("A050TICKE1") != null && rst.getString("A050TICKE2") != null) {
                    data.A020TICKE1 = rst.getString("A050TICKE1").trim().concat("\n").concat(rst.getString("A050TICKE2").trim());
                } else {
                    data.A020TICKE1 = "";
                }

                //Guardando los comentarios ====================================
                /*data.A020CODOB1 = rst.getString("A050CODOB1").trim();
                 data.A020CODOB2 = rst.getString("A050CODOB2").trim();
                 data.A020CODOB3 = rst.getString("A050CODOB3").trim();
                 data.A020COMME1 = rst.getString("A050COMME1").trim();
                 data.A020COMME2 = rst.getString("A050COMME2").trim();
                 data.A020COMME3 = rst.getString("A050COMME3").trim();

                 for (int i = 1; i < 6; i++) {
                 comentario = new A021();
                    
                 if (rst.getString("A020CODOB" + i) != null && !rst.getString("A020CODOB" + i).trim().equals("")) {
                 comentario.A021KEY = rst.getString("A020CODOB" + i).trim();
                 if (rst.getString("A020COMME" + i) != null) {
                 comentario.A021COMEN1 = rst.getString("A020COMME" + i).trim();
                 } else {
                 //(Consultar si se debe buscar el texto del comentario)
                 comentario.A021COMEN1 = "";
                 }
                 if ((i + 1) < 6) {
                 if (rst.getString("A020CODOB" + (i + 1)) == null
                 || rst.getString("A020CODOB" + (i + 1)).trim().equals("")) {
                 comentario.A021COMEN2 = rst.getString("A020COMME" + (i + 1));
                 } else {
                 comentario.A021COMEN2 = "";
                 }
                 } else {
                 //Para el comentario 6
                 comentario.A021COMEN2 = rst.getString("A020COMME" + (i + 1));
                 }
                 if (rst.getString("A020DEBHAB") != null) {
                 comentario.A021CONCEP = Functions.fillString(rst.getString("A020DEBHAB"), 5).substring(i - 1, i);
                 } else {
                 comentario.A021CONCEP = " ";
                 }

                 lstComentarios.add(comentario);
                 }

                 }

                 Functions.limpiarCamposA020Comentarios(data);
                 comentario = null;
                 for (int i = 0; i < listaComentarios.size(); i++) {
                 comentario = listaComentarios.get(i);
                 Functions.colocarComentarios(data, comentario);
                 }*/
            }
            try {
                rst.close();
            } catch (SQLException e) {
                e.printStackTrace();
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
            //</editor-fold>

            if (cstmt.getMoreResults()) {
                // <editor-fold defaultstate="collapsed" desc="OBTENIENDO DATOS DEL A728">
                rst = cstmt.getResultSet();
                boolean poseeSector = false;
                while (rst.next()) {
                    //if (intQty == 0) {
                    dataA728.A728CUPON = rst.getString("A728CUPON").trim();
                    dataA728.A728FECVTA = rst.getString("A728FECVTA").trim();
                    dataA728.A728AIRFAC = rst.getString("A728AIRFAC").trim();
                    dataA728.A728CTYVTA = rst.getString("A728CTYVTA").trim();
                    dataA728.A728CTYEMI = rst.getString("A728CTYEMI").trim();
                    dataA728.A728GRUPO = rst.getString("A728GRUPO").trim();
                    dataA728.A728COUVTA = rst.getString("A728COUVTA").trim();
                    dataA728.A728COUEMI = rst.getString("A728COUEMI").trim();
                    dataA728.A728AJTRAM = rst.getString("A728AJTRAM").trim();
                    dataA728.A728SECOR = rst.getString("A728SECOR").trim();
                    dataA728.A728SECDS = rst.getString("A728SECDS").trim();
                    dataA728.A728ATBP = rst.getDouble("A728ATBP");
                    dataA728.A728MDAATB = rst.getString("A728MDAATB").trim();
                    dataA728.A728CODTAX = rst.getString("A728CODTAX").trim();
                    dataA728.A728TDESC = rst.getString("A728TDESC").trim();
                    dataA728.A728PORDES = rst.getDouble("A728PORDES");
                    dataA728.A728CODIT = rst.getString("A728CODIT").trim();
                    dataA728.A728CSOVER = rst.getDouble("A728CSOVER");
                    dataA728.A728QSOVER = rst.getInt("A728QSOVER");
                    dataA728.A728IPLUS = rst.getString("A728IPLUS").trim();
                    dataA728.A728CPLUSS = rst.getInt("A728CPLUSS");
                    dataA728.A728TAJUST = rst.getDouble("A728TAJUST");
                    dataA728.A728RUTORG = rst.getString("A728RUTORG").trim();
                    dataA728.A728MONSYS = rst.getString("A728MONSYS").trim();
                    dataA728.A728LOHO = rst.getString("A728LOHO").trim();
                    dataA728.A728TARIFA = rst.getDouble("A728TARIFA");
                    dataA728.A728MONEDA = rst.getString("A728MONEDA").trim();
                    dataA728.A728TRFPAG = rst.getDouble("A728TRFPAG");
                    dataA728.A728MDAPAG = rst.getString("A728MDAPAG").trim();
                    dataA728.A728ROE = rst.getDouble("A728ROE");
                    //======================================================
                    //CAMPOS ADICIONALES QUE SON EXTRAIDOS PERO NO MAODIFICADOS EN EL FORMULARIO
                    dataA728.A728SEQPRT = rst.getString("A728SEQPRT").trim();
                    dataA728.A728DCHEQ = rst.getString("A728DCHEQ").trim();
                    dataA728.A728TVENTA = rst.getString("A728TVENTA").trim();
                    dataA728.A728TCAREG = rst.getDouble("A728TCAREG");
                    dataA728.A728MONREG = rst.getString("A728MONREG").trim();
                    dataA728.A728TCASYS = rst.getDouble("A728TCASYS");
                    dataA728.A728TCAPAG = rst.getDouble("A728TCAPAG");
                    dataA728.A728INDSAM = rst.getString("A728INDSAM").trim();
                    dataA728.A728INDPRT = rst.getInt("A728INDPRT");
                    dataA728.A728SELEC = rst.getString("A728SELEC").trim();
                    dataA728.valTiempoLimite = true;
                    dataA728.tieneComision = false;
                    //======================================================
                    //======================================================

                    sector = new A728();
                    sector.A728RUTAO = rst.getString("A728RUTAO").trim();//FROM
                    sector.A728RERUT = rst.getString("A728RERUT").trim();

                    //list.add(sector);
                    //}
                    if (rst.getString("A728SECOR").trim().equals(rst.getString("A728RUTAO").trim())
                            && rst.getString("A728SECDS").trim().equals(rst.getString("A728RUTAD").trim())) {
                        dataA728.A728FVLO1 = rst.getString("A728FVLO1").trim();
                        dataA728.A728FBASE1 = rst.getString("A728FBASE1").trim();
                        sector.esSector = "todo";
                        dataA728.A728RERUT = rst.getString("A728RERUT").trim();
                    }

                    //if (!rst.getString("A728RUTAD").trim().equals("")) {
                    //sector = new A728();
                    sector.A728RUTAD = rst.getString("A728RUTAD").trim();//TO
                    sector.A728CARRA1 = rst.getString("A728CARRA1").trim();
                    sector.A728NVLO1 = rst.getString("A728NVLO1").trim();
                    sector.A728BOOKI1 = rst.getString("A728BOOKI1").trim();
                    sector.A728SS1 = rst.getDouble("A728SS1");
                    sector.A728XO = rst.getString("A728XO").trim();
                    sector.A728FACT1 = rst.getLong("A728FACT1");
                    sector.A728PROV1 = rst.getDouble("A728PROV1");
                    sector.A728PPRO1 = rst.getDouble("A728PPRO1");
                    sector.A728TARI1 = rst.getDouble("A728TARI1");
                    sector.A728ACUEO1 = rst.getDouble("A728ACUEO1");
                    sector.A728VALOR1 = rst.getDouble("A728VALOR1");

                    if (rst.getString("A728INDPR1").trim().equals("A")) {
                        sector.strAMTV = "SPA";
                        if (rst.getString("A728ACUCO1").trim().length() >= 10 &&
                                hmAMTV.containsKey("A" + rst.getString("A728ACUCO1").substring(9, 10))) {
                            sector.strAMTV = hmAMTV.get("A" + rst.getString("A728ACUCO1").substring(9, 10)).toString();
                        }
                    } else {
                        if (hmAMTV.containsKey(rst.getString("A728INDPR1").trim())) {
                            sector.strAMTV = hmAMTV.get(rst.getString("A728INDPR1").trim()).toString();
                        }
                    }
                    sector.A728AJUST1 = rst.getDouble("A728AJUST1");
                    //==============================================================
                    //CAMPOS ADICIONALES QUE SON EXTRAIDOS PERO NO MAODIFICADOS EN EL FORMULARIO
                    sector.A728VIA1 = rst.getString("A728VIA1").trim();
                    sector.A728CARRN1 = rst.getString("A728CARRN1").trim();
                    sector.A728FVLO1 = rst.getString("A728FVLO1").trim();
                    sector.A728CLASE1 = rst.getString("A728CLASE1").trim();
                    sector.A728FBASE1 = rst.getString("A728FBASE1").trim();
                    sector.A728LOHO = rst.getString("A728LOHO").trim();
                    sector.A728TBASE1 = rst.getString("A728TBASE1").trim();
                    sector.A728STBAS1 = rst.getString("A728STBAS1").trim();
                    sector.A728FARE1 = rst.getDouble("A728FARE1");
                    sector.A728TFARE1 = rst.getString("A728TFARE1").trim();
                    sector.A728DIFER1 = rst.getDouble("A728DIFER1");
                    sector.A728FDIFE1 = rst.getString("A728FDIFE1").trim();
                    sector.A728TRFM1 = rst.getDouble("A728TRFM1");
                    sector.A728MNTFM1 = rst.getString("A728MNTFM1").trim();
                    sector.A728CPLUSS = rst.getDouble("A728CPLUSS");
                    sector.A728STOP1 = rst.getDouble("A728STOP1");
                    sector.A728MNACU1 = rst.getString("A728MNACU1").trim();
                    sector.A728ACUCO1 = rst.getString("A728ACUCO1").trim();
                    sector.A728ACUE1 = rst.getDouble("A728ACUE1");
                    sector.A728YANQ1 = rst.getDouble("A728YANQ1");
                    sector.A728SUBPA1 = rst.getString("A728SUBPA1").trim();
                    sector.A728VLMPA1 = rst.getDouble("A728VLMPA1");
                    sector.A728VLSRP1 = rst.getDouble("A728VLSRP1");
                    sector.A728INDPR1 = rst.getString("A728INDPR1").trim();
                    sector.A728INDISC = rst.getString("A728INDISC").trim();
                    sector.A728ISC = rst.getDouble("A728ISC");
                    sector.A728COEFIC = rst.getDouble("A728COEFIC");
                    sector.A728ACUBS1 = rst.getString("A728ACUBS1").trim();
                    sector.A728ACUST1 = rst.getString("A728ACUST1").trim();
                    sector.A728PRVST1 = rst.getString("A728PRVST1").trim();
                    sector.A728RERUT = rst.getString("A728RERUT").trim();
                    //=================================================================
                        /*Para saber si la ruta que viene pertenece al sector a prorratear.
                     Esto se hace para que se pueda mostrar "La pistolita" */
                    /*if (list.get(list.size() - 1).A728RUTAO.trim().equals(rst.getString("A728SECOR").trim())
                     && rst.getString("A728RUTAD").trim().equals(rst.getString("A728SECDS").trim())) {
                     list.get(list.size() - 1).esSector = "solo";
                     sector.esSector = "todo";
                     dataA728.A728RERUT = rst.getString("A728RERUT").trim();
                     poseeSector = true;
                     }*/
                    //=================================================================
                    list.add(sector);
                    //}

                    intQty++;
                }
                try {
                    rst.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
                if (!poseeSector) {
                    data.strMsgError = "DANGER : Error. The Ticket has errors on Prorate Route. (A728)";
                }

                //Esta porción de código se hace para colocar el X/O en la ciudad correcta .. debido
                //a que el X/O q traía pertenecía al sector anterior
                for (int x = 0; x < list.size() - 1; x++) {
                    list.get(x).A728XO = list.get(x + 1).A728XO;
                }
                if (list != null && list.size() > 0) {
                    //Seteando el X/O de la última ciudad del Routing ya q es imposible q 
                    //esta tenga ESCALA
                    list.get(list.size() - 1).A728XO = "";
                }
                //data.setSECTORS(list);

                //</editor-fold>
            }

            if (cstmt.getMoreResults()) {
                // <editor-fold defaultstate="collapsed" desc="OBTENIENDO DATOS DEL A1200">
                rst = cstmt.getResultSet();
                if (rst.next()) {
                    String file = rst.getString("FILENAME");
                    data.strFileName = file;
                    data.strFileNameOrg = file;
                    data.strETKT = rst.getString("ETKTIND");
                    data.strUSAC = rst.getString("USAC");
                }
                try {
                    rst.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
                //</editor-fold>
            }

            if (cstmt.getMoreResults()) {
                // <editor-fold defaultstate="collapsed" desc="OBTENIENDO DATOS DEL A005">
                rst = cstmt.getResultSet();
                if (rst.next()) {
                    if (rst.getString("A005KEY3").trim().isEmpty()) {
                        data.strAirlineName = rst.getString("A005KEY2").trim();
                    } else {
                        data.strAirlineName = rst.getString("A005KEY3").trim();
                    }
                    data.strAlfa = rst.getString("A005KEY1");
                    data.strCHS = rst.getString("A005CHS");
                }
                try {
                    rst.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
                //</editor-fold>
            }

            try {
                rst.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
            try {
                cstmt.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            hmResultado.put("A020", data);
            hmResultado.put("A728", dataA728);
            hmResultado.put("SECTORES", list);

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

        return hmResultado;
    }

    public String savedComments_SQP0106(List<A021> listaComentarios, List<A020Filter> listaSQL) throws SQLException, Exception {

        String mensaje = "Comments were saved correctly.";
        A020Filter beanComentario = new A020Filter();
        String strConcept = "";
        String A020PSTRF = findLastClearingDate(session.getUserView().getCustomerInfoComplete().fileA005.A005KEY1)[1].trim();

        CallableStatement cstmt = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP0106(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {

            //Colocando los comentarios en un objeto A020
            for (int i = 0; i < listaComentarios.size(); i++) {
                strConcept += listaComentarios.get(i).A021CONCEP.trim();
                Functions.colocarComentariosA020(beanComentario, listaComentarios.get(i));
            }

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            if (!beanComentario.A020CODOB1.trim().equals("")) {
                for (int i = 0; i < listaSQL.size(); i++) {

                    cstmt = cnx.prepareCall(SQLCLL01);

                    cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
                    cstmt.setString(2, session.getUserView().getCustomerInfoComplete().fileA005.A005KEY1);
                    cstmt.setString(3, Functions.getFechaActual());
                    cstmt.setString(4, Functions.getHoraActual());
                    cstmt.setString(5, A020PSTRF);
                    cstmt.setString(6, session.getUserView().getUserInfo().USR);
                    cstmt.setString(7, listaSQL.get(i).A020KEY.trim());
                    cstmt.setString(8, beanComentario.A020CODOB1.trim());
                    cstmt.setString(9, beanComentario.A020CODOB2.trim());
                    cstmt.setString(10, beanComentario.A020CODOB3.trim());
                    cstmt.setString(11, beanComentario.A020CODOB4.trim());
                    cstmt.setString(12, beanComentario.A020CODOB5.trim());
                    cstmt.setString(13, beanComentario.A020COMME1.trim());
                    cstmt.setString(14, beanComentario.A020COMME2.trim());
                    cstmt.setString(15, beanComentario.A020COMME3.trim());
                    cstmt.setString(16, beanComentario.A020COMME4.trim());
                    cstmt.setString(17, beanComentario.A020COMME5.trim());
                    cstmt.setString(18, beanComentario.A020COMME6.trim());
                    cstmt.setString(19, strConcept);
                    cstmt.executeUpdate();

                    try {
                        cstmt.close();
                    } catch (SQLException e) {
                        logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                    }
                }
            }

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

    public String[] findLastClearingDate(String calfa) throws SQLException, Exception {

        //*************** Para coger la última fecha de Clearing *************************
        String[] arrayPRO094 = new String[2];
        CallableStatement cstmt = null;
        session.getCNXIBMDB2().open();

        try {
            Connection cnx = null;
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();

            DatabaseMetaData dmd = cnx.getMetaData();
            cstmt = cnx.prepareCall("{CALL PRAXIS" + dmd.getCatalogSeparator() + "SPCL3050(?)}");
            cstmt.setString(1, calfa.trim());//colocando la librería

            cstmt.execute();
            try {
                cstmt.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            cstmt = cnx.prepareCall("{CALL PRAXIS" + dmd.getCatalogSeparator() + "SPPRO094(?)}");
            cstmt.setString(1, "01".concat(Functions.fillString("", 9)));
            cstmt.registerOutParameter(1, Types.CHAR);
            cstmt.execute();
            try {
                arrayPRO094[0] = cstmt.getString(1).substring(2, 8); //Fecha de Clearing
                arrayPRO094[1] = cstmt.getString(1).substring(8, 10); //Campo Pre- Cierre
            } catch (Exception e) {
            }

        } finally {

            if (cstmt != null) {
                try {
                    cstmt.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().close();
            pasarGarbageCollector();
        }

        //**********************************************************************************
        return arrayPRO094;

    }

    public A021 searchComment_SQP0107(String codigo, String fechaClearing) throws SQLException, Exception {

        A021 invoice = null;
        CallableStatement cstmt = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP0107(?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, Functions.fillString(codigo.trim(), 4));
            cstmt.setString(3, fechaClearing.trim());
            cstmt.execute();

            rs01 = cstmt.getResultSet();

            if (rs01.next()) {
                invoice = new A021();
                invoice.A021KEY = rs01.getString("A021KEY").trim();
                invoice.A021COMEN1 = rs01.getString("A021COMEN1").trim();
                invoice.A021COMEN2 = rs01.getString("A021COMEN2").trim();
                invoice.A021COMEN3 = rs01.getString("A021COMEN3").trim();
                invoice.A021COMEN4 = rs01.getString("A021COMEN4").trim();
                invoice.A021COMEN5 = rs01.getString("A021COMEN5").trim();
                invoice.A021COMEN6 = rs01.getString("A021COMEN6").trim();
                invoice.A021CONCEP = rs01.getString("A021CONCEP").trim();
            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
            try {
                cstmt.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
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

        return invoice;
    }

    public List<A021> searchComment_SQP00117(String codigo) throws SQLException, Exception {

        A021 invoice = null;
        CallableStatement cstmt = null;
        ResultSet rs01 = null;
        List<A021> lista = new ArrayList<A021>();

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00117(?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, codigo.trim());
            cstmt.execute();

            rs01 = cstmt.getResultSet();

            while (rs01.next()) {
                invoice = new A021();
                invoice.A021KEY = rs01.getString("A021KEY").trim();
                invoice.A021COMEN1 = rs01.getString("A021COMEN1").trim();
                invoice.A021COMEN2 = rs01.getString("A021COMEN2").trim();
                invoice.A021COMEN3 = rs01.getString("A021COMEN3").trim();
                invoice.A021COMEN4 = rs01.getString("A021COMEN4").trim();
                invoice.A021COMEN5 = rs01.getString("A021COMEN5").trim();
                invoice.A021COMEN6 = rs01.getString("A021COMEN6").trim();
                invoice.A021CONCEP = rs01.getString("A021CONCEP").trim();
                invoice.strDescripcion = rs01.getString("A021COMEN1").trim() + rs01.getString("A021COMEN2").trim()
                        + rs01.getString("A021COMEN3").trim() + rs01.getString("A021COMEN4").trim()
                        + rs01.getString("A021COMEN5").trim() + rs01.getString("A021COMEN6").trim();
                lista.add(invoice);
            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
            try {
                cstmt.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

        } finally {
            if (rs01 != null) {
                try {
                    rs01.close();
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

    public List<A720Filter> loadPX191S01A720(A720Filter filter) throws SQLException, Exception {

        List<A720Filter> lstRtn = new ArrayList<A720Filter>(0);
        A720Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String IN_OAL = "", IN_BILL = "";
        if (filter.IN_OAL) {
            IN_OAL = "Y";
        }
        if (filter.IN_BILLING) {
            IN_BILL = "Y";
        }

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX191S01A1798(?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);
            cstmt01.registerOutParameter(9, Types.INTEGER);
            cstmt01.registerOutParameter(10, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_FECHA_FROM);
            cstmt01.setString(3, filter.IN_FECHA_TO);
            cstmt01.setString(4, filter.IN_CIA);
            cstmt01.setString(5, IN_OAL);
            cstmt01.setString(6, IN_BILL);
            cstmt01.setInt(7, filter.page.PAGNUM);
            cstmt01.setInt(8, filter.page.PAGROW);
            cstmt01.setInt(9, filter.page.TOTPAG);
            cstmt01.setInt(10, filter.page.TOTROW);

            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(7);
            filter.page.PAGROW = cstmt01.getInt(8);
            filter.page.TOTPAG = cstmt01.getInt(9);
            filter.page.TOTROW = cstmt01.getInt(10);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new A720Filter();
                objRtn.A720CIA = rs01.getString("A720CIA");
                objRtn.A720FORMA = rs01.getString("A720FORMA");
                objRtn.A720SERIE = rs01.getString("A720SERIE");
                objRtn.strDescripcion = objRtn.A720CIA + " " + objRtn.A720FORMA + objRtn.A720SERIE;
                objRtn.A720MONREG = rs01.getString("A720MONREG");
                objRtn.A720FECVTA = rs01.getString("A720FECVTA");
                objRtn.strFormatDate = Functions.getMonthConvert(objRtn.A720FECVTA);
                objRtn.A720MONEDA = rs01.getString("A720MONEDA");
                objRtn.A720TARIFA = rs01.getDouble("A720TARIFA");
                objRtn.A720MDAPAG = rs01.getString("A720MDAPAG");
                objRtn.A720TRFPAG = rs01.getDouble("A720TRFPAG");

                objRtn.A720NVLO1 = rs01.getString("A720NVLO1");
                objRtn.A720FVLO1 = rs01.getString("A720FVLO1");
                objRtn.strFormatDate1 = Functions.getMonthConvert(objRtn.A720FVLO1);
                objRtn.A720FINVO1 = rs01.getString("A720FINVO1");
                objRtn.A720VALOR1 = rs01.getDouble("A720VALOR1");
                objRtn.A720CARRA1 = rs01.getString("A720CARRA1");
                if (!rs01.getString("A720RUTA0").trim().equals("")) {
                    objRtn.strDescripcion1 = rs01.getString("A720RUTA0") + "-" + rs01.getString("A720RUTA1");
                }

                objRtn.A720NVLO2 = rs01.getString("A720NVLO2");
                objRtn.A720FVLO2 = rs01.getString("A720FVLO2");
                objRtn.strFormatDate2 = Functions.getMonthConvert(objRtn.A720FVLO2);
                objRtn.A720VALOR2 = rs01.getDouble("A720VALOR2");
                objRtn.A720FINVO2 = rs01.getString("A720FINVO2");
                objRtn.A720CARRA2 = rs01.getString("A720CARRA2");
                if (!rs01.getString("A720RUTA1").trim().equals("") && !rs01.getString("A720RUTA2").trim().equals("")) {
                    objRtn.strDescripcion2 = rs01.getString("A720RUTA1") + "-" + rs01.getString("A720RUTA2");
                }

                objRtn.A720NVLO3 = rs01.getString("A720NVLO3");
                objRtn.A720FVLO3 = rs01.getString("A720FVLO3");
                objRtn.strFormatDate3 = Functions.getMonthConvert(objRtn.A720FVLO3);
                objRtn.A720VALOR3 = rs01.getDouble("A720VALOR3");
                objRtn.A720FINVO3 = rs01.getString("A720FINVO3");
                objRtn.A720CARRA3 = rs01.getString("A720CARRA3");
                if (!rs01.getString("A720RUTA2").trim().equals("") && !rs01.getString("A720RUTA3").trim().equals("")) {
                    objRtn.strDescripcion3 = rs01.getString("A720RUTA2") + "-" + rs01.getString("A720RUTA3");
                }

                objRtn.A720NVLO4 = rs01.getString("A720NVLO4");
                objRtn.A720FVLO4 = rs01.getString("A720FVLO4");
                objRtn.strFormatDate4 = Functions.getMonthConvert(objRtn.A720FVLO4);
                objRtn.A720VALOR4 = rs01.getDouble("A720VALOR4");
                objRtn.A720FINVO4 = rs01.getString("A720FINVO4");
                objRtn.A720CARRA4 = rs01.getString("A720CARRA4");
                if (!rs01.getString("A720RUTA3").trim().equals("") && !rs01.getString("A720RUTA4").trim().equals("")) {
                    objRtn.strDescripcion4 = rs01.getString("A720RUTA3") + "-" + rs01.getString("A720RUTA4");
                }

                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;
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

    public List<A720Filter> loadPX191S02A720(A720Filter filter) throws SQLException, Exception {

        List<A720Filter> lstRtn = new ArrayList<A720Filter>(0);
        A720Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String IN_OAL = "", IN_BILL = "";
        if (filter.IN_OAL) {
            IN_OAL = "Y";
        }
        if (filter.IN_BILLING) {
            IN_BILL = "Y";
        }

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX191S02A1884(?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(8, Types.INTEGER);
            cstmt01.registerOutParameter(9, Types.INTEGER);
            cstmt01.registerOutParameter(10, Types.INTEGER);
            cstmt01.registerOutParameter(11, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setInt(2, filter.IN_TIPOFECHA);
            cstmt01.setString(3, filter.IN_FECHA_FROM);
            cstmt01.setString(4, filter.IN_FECHA_TO);
            cstmt01.setString(5, filter.IN_CIA);
            cstmt01.setString(6, IN_OAL);
            cstmt01.setString(7, IN_BILL);
            cstmt01.setInt(8, filter.page.PAGNUM);
            cstmt01.setInt(9, filter.page.PAGROW);
            cstmt01.setInt(10, filter.page.TOTPAG);
            cstmt01.setInt(11, filter.page.TOTROW);

            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(8);
            filter.page.PAGROW = cstmt01.getInt(9);
            filter.page.TOTPAG = cstmt01.getInt(10);
            filter.page.TOTROW = cstmt01.getInt(11);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new A720Filter();
                objRtn.A720CIA = rs01.getString("CIA");
                objRtn.A720FORMA = rs01.getString("FORMA");
                objRtn.A720SERIE = rs01.getString("SERIE");
                objRtn.A720ACCO = rs01.getString("CUPON");
                objRtn.strDescripcion = objRtn.A720CIA + " " + objRtn.A720FORMA + objRtn.A720SERIE + " " + objRtn.A720ACCO;
                objRtn.A720MONREG = rs01.getString("MONREG");
                objRtn.A720FECVTA = rs01.getString("FECVTA");
                objRtn.strFormatDate = Functions.getMonthConvert(objRtn.A720FECVTA);
                objRtn.A720MONEDA = rs01.getString("MONEDA");
                objRtn.A720TARIFA = rs01.getDouble("TARIFA");
                objRtn.A720MDAPAG = rs01.getString("MDAPAG");
                objRtn.A720TRFPAG = rs01.getDouble("TRFPAG");

                objRtn.A720NVLO1 = rs01.getString("NFLIGHT");
                objRtn.A720FVLO1 = rs01.getString("DFLIGHT");
                objRtn.A720RUTA0 = rs01.getString("CDEPART");
                objRtn.A720RUTA1 = rs01.getString("CARRIVA");

                objRtn.strFormatDate1 = Functions.getMonthConvert(objRtn.A720FVLO1);
                objRtn.A720FINVO1 = rs01.getString("FINVO");
                objRtn.A720VALOR1 = rs01.getDouble("VALOR");
                objRtn.A720CARRA1 = rs01.getString("CARRA");

                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;
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

    public List<A1851> loadPX186S01A1851(A1851 filter) throws SQLException, Exception {
        List<A1851> lstRtn = new ArrayList<A1851>(0);
        A1851 objRtn;

        CallableStatement cs = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX186S01A1851(?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(SQLCLL01);

            cs.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cs.setString(2, filter.IN_FECHA_FROM);
            cs.setString(3, filter.IN_FECHA_TO);

            cs.execute();

            rs01 = cs.getResultSet();

            while (rs01.next()) {
                objRtn = new A1851();
                objRtn.FINVOIC = rs01.getString("FINVOIC");
                objRtn.strFormatDate = Functions.getMonthConvert(objRtn.FINVOIC);
                objRtn.PERIOD = rs01.getString("PERIO");
                objRtn.DOENV = rs01.getString("DOENV");
                objRtn.strFormatDate1 = Functions.getMonthConvert(objRtn.DOENV);
                objRtn.TIMESI = rs01.getString("TIMESI");
                objRtn.strDescripcion = Functions.ConvertedTime(objRtn.TIMESI);
                objRtn.DCENV = rs01.getString("DCENV");
                objRtn.strFormatDate2 = Functions.getMonthConvert(objRtn.DCENV);
                objRtn.TIMESO = rs01.getString("TIMESO");
                objRtn.strDescripcion1 = Functions.ConvertedTime(objRtn.TIMESO);
                objRtn.DENVI = rs01.getString("DENVI");
                objRtn.strFormatDate3 = Functions.getMonthConvert(objRtn.DENVI);
                objRtn.TIMESE = rs01.getString("TIMESE");
                objRtn.strDescripcion2 = Functions.ConvertedTime(objRtn.TIMESE);
                objRtn.STVAL = rs01.getString("STVAL");
                if(objRtn.STVAL.equals("0")){
                    objRtn.desSTVAL = "Closed";
                }else if(objRtn.STVAL.equals("1")){
                    objRtn.desSTVAL = "Processed";
                }
                objRtn.USCR = rs01.getString("USCR");
                objRtn.FECR = rs01.getString("FECR");
                objRtn.HOCR = rs01.getString("HOCR");
                objRtn.USUP = rs01.getString("USUP");
                objRtn.FEUP = rs01.getString("FEUP");
                objRtn.HOUP = rs01.getString("HOUP");

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
            if (cs != null) {
                try {
                    cs.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return lstRtn;
    }

    public A1851 loadPX186_SQP00122() throws SQLException, Exception {
        //OBTIENE ÚLTIMA FECHA DE PERIODO ABIERTO
        A1851 objRtn = new A1851();

        CallableStatement cs = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00122(?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(SQLCLL01);
            cs.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cs.execute();

            rs01 = cs.getResultSet();

            if (rs01.next()) {
                objRtn.FINVOIC = rs01.getString("FINVOIC");
                objRtn.strFormatDate = Functions.getMonthConvert(objRtn.FINVOIC);
                objRtn.PERIOD = rs01.getString("PERIO");
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
            if (cs != null) {
                try {
                    cs.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return objRtn;
    }

    public String loadPX186S02A1851(A1851 filter, String option) throws SQLException, Exception {
        //REALIZA EL INSERT, UPDATE O DELETE DE UN REGISTRO EN LA TABLA A1849.
        String strMsj = "Operation was successful.";

        CallableStatement cstmt = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX186S02A1851(?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, option);
            cstmt.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(3, filter.FINVOIC.trim());
            cstmt.setString(4, filter.PERIOD.trim());
            cstmt.setString(5, filter.STVAL.trim());
            cstmt.setString(6, filter.DOENV.trim());
            cstmt.setString(7, filter.TIMESI.trim());
            cstmt.setString(8, filter.DCENV.trim());
            cstmt.setString(9, filter.TIMESO.trim());
            cstmt.setString(10, filter.DENVI.trim());
            cstmt.setString(11, filter.TIMESE.trim());
            cstmt.execute();

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

    public String loadPX186_SQP00123(A1851 filter) throws SQLException, Exception {
        //REALIZA EL CIERRE CONTABLE Y APERTURA EL SIGUIENTE PERIODO.
        //MODIFICA LAS TABLAS A1851 Y A041
        String strMsj = "";

        CallableStatement cstmt = null;
        long fInvoiceSig = Long.parseLong(filter.FINVOIC.trim());
        long periodSig = Long.parseLong(filter.PERIOD.trim());
        if (periodSig == 4) {
            fInvoiceSig = Long.parseLong(Functions.suma1Month(filter.FINVOIC.trim()));
            periodSig = 1;
        } else {
            periodSig = periodSig + 1;
        }

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00123(?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(9, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.FINVOIC.trim());
            cstmt.setString(3, Functions.fillZeros(6, String.valueOf(fInvoiceSig)));
            cstmt.setString(4, filter.PERIOD.trim());
            cstmt.setString(5, Functions.fillZeros(2, String.valueOf(periodSig)));
            cstmt.setString(6, session.getUserView().getUserInfo().USR);
            cstmt.setString(7, Functions.getFechaActual());
            cstmt.setString(8, Functions.getHoraActual());
            cstmt.setString(9, "");
            cstmt.executeUpdate();

            if (cstmt.getString(9) != null && !cstmt.getString(9).trim().equals("")) {
                strMsj = cstmt.getString(9).trim();
            } else {
                strMsj = "Operation was successful.";
            }

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

    public List<A1692Filter> loadPX204S01A1692(A1692Filter filter) throws SQLException, Exception {

        List<A1692Filter> lstRtn = new ArrayList<A1692Filter>(0);
        A1692Filter objRtn;
        long CPN_P = 0, CPN_A = 0, CPN_B = 0, VCPN_P = 0, CPNTOT = 0;
        double VCPN_A = 0, VCPN_B = 0;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00160(?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_FECHA_FROM);
            cstmt01.setString(3, filter.IN_FECHA_TO);
            cstmt01.setString(4, filter.IN_CARR);
            cstmt01.setString(5, filter.IN_STVAL);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                CPN_P = rs01.getLong("CPN_P");
                CPN_A = rs01.getLong("CPN_A");
                CPN_B = rs01.getLong("CPN_B");
                CPNTOT = CPN_P + CPN_A + CPN_B;
                VCPN_P = rs01.getLong("QTYPAX_A");
                VCPN_A = rs01.getDouble("VCPN_A");
                VCPN_B = rs01.getDouble("VCPN_B");
            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new A1692Filter();
                    objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                    objRtn.IN_FECHA_TO = filter.IN_FECHA_TO;
                    objRtn.DFLIGHT = rs01.getString("DFLIGHT");
                    objRtn.strFormatDate = Functions.getMonthConvert(objRtn.DFLIGHT);
                    if (filter.IN_STVAL.equals("")) {
                        objRtn.CARR = rs01.getString("CARR");
                        if (objRtn.CARR.equals("AM")) {
                            objRtn.strDescripcion = "Aeroméxico";
                        } else if (objRtn.CARR.equals("5D")) {
                            objRtn.strDescripcion = "AM Connect";
                        } else if (objRtn.CARR.equals("VW")) {
                            objRtn.strDescripcion = "Aeromar";
                        }
                    }
                    objRtn.MDACP = rs01.getString("MONED");

                    objRtn.CPN_Proc = rs01.getLong("CPN_P");
                    objRtn.CPN_Aud = rs01.getLong("CPN_A");;
                    objRtn.CPN_Bill = rs01.getLong("CPN_B");;
                    objRtn.VCPN_Aud = rs01.getDouble("VCPN_A");
                    objRtn.VCPN_Bill = rs01.getDouble("VCPN_B");;
                    objRtn.CPN_TOT = objRtn.CPN_Proc + objRtn.CPN_Aud + objRtn.CPN_Bill;
                    objRtn.VCPN_Billed = rs01.getLong("QTYPAX_A");
                    objRtn.totCPN_Proc = CPN_P;
                    objRtn.totCPN_Aud = CPN_A;
                    objRtn.totCPN_Bill = CPN_B;
                    objRtn.totNETO = CPNTOT; //TOTAL CUPONES
                    objRtn.RN = VCPN_P;
                    objRtn.totVCPN_Aud = VCPN_A;
                    objRtn.totVCPN_Bill = VCPN_B;

                    objRtn.page.PAGNUM = filter.page.PAGNUM;
                    objRtn.page.PAGROW = filter.page.PAGROW;
                    objRtn.page.TOTPAG = filter.page.TOTPAG;
                    objRtn.page.TOTROW = filter.page.TOTROW;

                    lstRtn.add(objRtn);
                }
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

    public List<A1692Filter> loadPX204S02A1692(A1692Filter filter) throws SQLException, Exception {

        List<A1692Filter> lstRtn = new ArrayList<A1692Filter>(0);
        A1692Filter objRtn;
        long CPN_P = 0, CPN_A = 0, CPN_B = 0, VCPN_P = 0, CPNTOT = 0;
        double VCPN_A = 0, VCPN_B = 0;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00162(?,?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);
            cstmt01.registerOutParameter(9, Types.INTEGER);
            cstmt01.registerOutParameter(10, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_FECHA_FROM);
            cstmt01.setString(3, filter.IN_FECHA_TO);
            cstmt01.setString(4, filter.DFLIGHT);
            cstmt01.setString(5, filter.CARR);
            cstmt01.setString(6, filter.CCIA);

            cstmt01.setInt(7, filter.page.PAGNUM);
            cstmt01.setInt(8, filter.page.PAGROW);
            cstmt01.setInt(9, filter.page.TOTPAG);
            cstmt01.setInt(10, filter.page.TOTROW);

            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(7);
            filter.page.PAGROW = cstmt01.getInt(8);
            filter.page.TOTPAG = cstmt01.getInt(9);
            filter.page.TOTROW = cstmt01.getInt(10);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                CPN_P = rs01.getLong("CPN_P");
                CPN_A = rs01.getLong("CPN_A");
                CPN_B = rs01.getLong("CPN_B");
                CPNTOT = CPN_P + CPN_A + CPN_B;
                VCPN_P = rs01.getLong("QTYPAX_A");
                VCPN_A = rs01.getLong("VCPN_A");
                VCPN_B = rs01.getLong("VCPN_B");
            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new A1692Filter();
                    objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                    objRtn.IN_FECHA_TO = filter.IN_FECHA_TO;
                    objRtn.DFLIGHT = rs01.getString("DFLIGHT");
                    objRtn.strFormatDate = Functions.getMonthConvert(objRtn.DFLIGHT);
                    objRtn.strFormatDate2 = filter.strFormatDate;
                    objRtn.CCIA = rs01.getString("CCIA");
                    objRtn.strDescripcion = rs01.getString("DES_CIA");
                    objRtn.CARR = filter.CARR;
                    objRtn.strDescSTNEW = filter.strDescripcion;
                    objRtn.MDACP = rs01.getString("MONED");
                    objRtn.CPN_Proc = rs01.getLong("CPN_P");
                    objRtn.CPN_Aud = rs01.getLong("CPN_A");
                    objRtn.CPN_Bill = rs01.getLong("CPN_B");
                    objRtn.VCPN_Aud = rs01.getDouble("VCPN_A");
                    objRtn.VCPN_Bill = rs01.getDouble("VCPN_B");
                    objRtn.CPN_TOT = objRtn.CPN_Proc + objRtn.CPN_Aud + objRtn.CPN_Bill;
                    objRtn.VCPN_Billed = rs01.getLong("QTYPAX_A");
                    objRtn.totCPN_Proc = CPN_P;
                    objRtn.totCPN_Aud = CPN_A;
                    objRtn.totCPN_Bill = CPN_B;
                    objRtn.totVCPN_Aud = VCPN_A;
                    objRtn.totVCPN_Bill = VCPN_B;
                    objRtn.totNETO = CPNTOT; //TOTAL CUPONES
                    objRtn.RN = VCPN_P;
                    objRtn.page.PAGNUM = filter.page.PAGNUM;
                    objRtn.page.PAGROW = filter.page.PAGROW;
                    objRtn.page.TOTPAG = filter.page.TOTPAG;
                    objRtn.page.TOTROW = filter.page.TOTROW;

                    lstRtn.add(objRtn);
                }
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

    public List<A1692Filter> loadPX204S10A1692(A1692Filter filter) throws SQLException, Exception {

        List<A1692Filter> lstRtn = new ArrayList<A1692Filter>(0);
        A1692Filter objRtn;
        long CPN_P = 0, CPN_A = 0, CPN_B = 0, CPNTOT = 0;;
        double VCPN_P = 0, VCPN_A = 0, VCPN_B = 0;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX204S10A1692(?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);
            cstmt01.registerOutParameter(9, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_FECHA_FROM);
            cstmt01.setString(3, filter.IN_FECHA_TO);
            cstmt01.setString(4, filter.DFLIGHT);
            cstmt01.setString(5, filter.CARR);

            cstmt01.setInt(6, filter.page.PAGNUM);
            cstmt01.setInt(7, filter.page.PAGROW);
            cstmt01.setInt(8, filter.page.TOTPAG);
            cstmt01.setInt(9, filter.page.TOTROW);

            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(6);
            filter.page.PAGROW = cstmt01.getInt(7);
            filter.page.TOTPAG = cstmt01.getInt(8);
            filter.page.TOTROW = cstmt01.getInt(9);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                CPN_P = rs01.getLong("CPN_P");
                CPN_A = rs01.getLong("CPN_A");
                CPN_B = rs01.getLong("CPN_B");
                CPNTOT = CPN_P + CPN_A + CPN_B;
                //VCPN_P = rs01.getLong("VCPN_P");
                VCPN_A = rs01.getLong("VCPN_A");
                VCPN_B = rs01.getLong("VCPN_B");
            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new A1692Filter();
                    objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                    objRtn.IN_FECHA_TO = filter.IN_FECHA_TO;
                    objRtn.DFLIGHT = rs01.getString("DFLIGHT");
                    objRtn.strFormatDate = Functions.getMonthConvert(objRtn.DFLIGHT);
                    objRtn.strFormatDate2 = filter.strFormatDate;
                    objRtn.CCIA = rs01.getString("CCIA");
                    objRtn.strDescripcion = rs01.getString("DES_CIA");
                    objRtn.CARR = filter.CARR;
                    objRtn.strDescSTNEW = filter.strDescripcion;
                    objRtn.MDACP = rs01.getString("MONED");
                    objRtn.CPN_Proc = rs01.getLong("CPN_P");
                    objRtn.CPN_Aud = rs01.getLong("CPN_A");;
                    objRtn.CPN_Bill = rs01.getLong("CPN_B");;
                    objRtn.VCPN_Aud = rs01.getDouble("VCPN_A");
                    objRtn.VCPN_Bill = rs01.getDouble("VCPN_B");;
                    objRtn.CPN_TOT = objRtn.CPN_Proc + objRtn.CPN_Aud + objRtn.CPN_Bill;

                    objRtn.totCPN_Proc = CPN_P;
                    objRtn.totCPN_Aud = CPN_A;
                    objRtn.totCPN_Bill = CPN_B;
                    objRtn.totVCPN_Aud = VCPN_A;
                    objRtn.totVCPN_Bill = VCPN_B;
                    objRtn.totNETO = CPNTOT; //TOTAL CUPONES

                    objRtn.page.PAGNUM = filter.page.PAGNUM;
                    objRtn.page.PAGROW = filter.page.PAGROW;
                    objRtn.page.TOTPAG = filter.page.TOTPAG;
                    objRtn.page.TOTROW = filter.page.TOTROW;

                    lstRtn.add(objRtn);
                }
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

    public List<A1692Filter> loadPX204S04A1692(A1692Filter filter) throws Exception {

        List<A1692Filter> lstRtn = new ArrayList<A1692Filter>(0);
        A1692Filter objRtn;
        long CPN_P = 0, CPN_A = 0, CPN_B = 0, CPNTOT = 0;
        double VCPN_P = 0, VCPN_A = 0, VCPN_B = 0;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00393(?,?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);
            cstmt01.registerOutParameter(9, Types.INTEGER);
            cstmt01.registerOutParameter(10, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_FECHA_FROM);
            cstmt01.setString(3, filter.IN_FECHA_TO);
            cstmt01.setString(4, filter.DFLIGHT);
            cstmt01.setString(5, filter.CARR);
            cstmt01.setString(6, filter.FINVO);

            cstmt01.setInt(7, filter.page.PAGNUM);
            cstmt01.setInt(8, filter.page.PAGROW);
            cstmt01.setInt(9, filter.page.TOTPAG);
            cstmt01.setInt(10, filter.page.TOTROW);

            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(7);
            filter.page.PAGROW = cstmt01.getInt(8);
            filter.page.TOTPAG = cstmt01.getInt(9);
            filter.page.TOTROW = cstmt01.getInt(10);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                CPN_P = rs01.getLong("CPN_P");
                CPN_A = rs01.getLong("CPN_A");
                CPN_B = rs01.getLong("CPN_B");
                CPNTOT = CPN_P + CPN_A + CPN_B;
                //VCPN_P = rs01.getLong("VCPN_P");
                VCPN_A = rs01.getDouble("VCPN_A");
                VCPN_B = rs01.getDouble("VCPN_B");
            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new A1692Filter();
                    objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                    objRtn.IN_FECHA_TO = filter.IN_FECHA_TO;
                    objRtn.DFLIGHT = rs01.getString("DFLIGHT");
                    objRtn.strFormatDate = Functions.getMonthConvert(objRtn.DFLIGHT);
                    objRtn.strFormatDate2 = filter.strFormatDate;
                    objRtn.CCIA = rs01.getString("CCIA");
                    objRtn.strDescripcion = rs01.getString("DES_CIA");
                    objRtn.CARR = filter.CARR;
                    objRtn.FINVO = filter.FINVO;
                    objRtn.strDescSTNEW = filter.strDescripcion;
                    objRtn.MDACP = rs01.getString("MONED");
                    objRtn.CPN_Proc = rs01.getLong("CPN_P");
                    objRtn.CPN_Aud = rs01.getLong("CPN_A");;
                    objRtn.CPN_Bill = rs01.getLong("CPN_B");;
                    objRtn.VCPN_Aud = rs01.getDouble("VCPN_A");
                    objRtn.VCPN_Bill = rs01.getDouble("VCPN_B");;
                    objRtn.CPN_TOT = objRtn.CPN_Proc + objRtn.CPN_Aud + objRtn.CPN_Bill;

                    objRtn.totCPN_Proc = CPN_P;
                    objRtn.totCPN_Aud = CPN_A;
                    objRtn.totCPN_Bill = CPN_B;
                    objRtn.totVCPN_Aud = VCPN_A;
                    objRtn.totVCPN_Bill = VCPN_B;
                    objRtn.totNETO = CPNTOT; //TOTAL CUPONES

                    objRtn.page.PAGNUM = filter.page.PAGNUM;
                    objRtn.page.PAGROW = filter.page.PAGROW;
                    objRtn.page.TOTPAG = filter.page.TOTPAG;
                    objRtn.page.TOTROW = filter.page.TOTROW;

                    lstRtn.add(objRtn);
                }
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

    public List<A1692Filter> loadPX204S03A1692(A1692Filter filter) throws SQLException, Exception {

        List<A1692Filter> lstRtn = new ArrayList<A1692Filter>(0);
        A1692Filter objRtn;
        double totVCPN = 0;
        long totPAX = 0;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00163(?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(6, Types.INTEGER);
            cstmt01.registerOutParameter(7, Types.INTEGER);
            cstmt01.registerOutParameter(8, Types.INTEGER);
            cstmt01.registerOutParameter(9, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.DFLIGHT);
            cstmt01.setString(3, filter.CARR);
            cstmt01.setString(4, filter.CCIA);
            cstmt01.setString(5, filter.FINVO);

            cstmt01.setInt(6, filter.page.PAGNUM);
            cstmt01.setInt(7, filter.page.PAGROW);
            cstmt01.setInt(8, filter.page.TOTPAG);
            cstmt01.setInt(9, filter.page.TOTROW);

            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(6);
            filter.page.PAGROW = cstmt01.getInt(7);
            filter.page.TOTPAG = cstmt01.getInt(8);
            filter.page.TOTROW = cstmt01.getInt(9);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                totVCPN = rs01.getDouble("VCPN");
                totPAX = rs01.getLong("QTYPAX");
            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new A1692Filter();
                    objRtn.strSQL = filter.strDescripcion;
                    objRtn.FINVO = rs01.getString("FINVO");
                    objRtn.CCIA = rs01.getString("CCIA");
                    objRtn.FORMA = rs01.getString("FORMA");
                    objRtn.SERIE = rs01.getString("SERIE");
                    objRtn.CUPON = rs01.getString("CUPON");
                    objRtn.strTicket = rs01.getString("CCIA") + " " + rs01.getString("FORMA") + rs01.getString("SERIE") + " " + rs01.getString("CUPON");
                    objRtn.FCONT = rs01.getString("FCONT");
                    objRtn.strFormatDate2 = Functions.getMonthConvert(objRtn.FCONT);
                    objRtn.ZONA = rs01.getString("ZONA");
                    objRtn.CDEPART = rs01.getString("CDEPART");
                    objRtn.CARRIVA = rs01.getString("CARRIVA");
                    objRtn.DFLIGHT = rs01.getString("DFLIGHT");
                    objRtn.strFormatDate = Functions.getMonthConvert(objRtn.DFLIGHT);
                    objRtn.NFLIGHT = rs01.getString("NFLIGHT");
                    objRtn.LEGSEQ = rs01.getString("LEGSEQ");
                    objRtn.TDOC = rs01.getString("TDOC");
                    objRtn.PSVVTA = rs01.getString("PSVVTA");
                    objRtn.AGTIA = rs01.getString("AGTIA");
                    objRtn.FVTA = rs01.getString("FVTA");
                    objRtn.FTE = rs01.getString("FTE");
                    objRtn.strFormatFVTA = Functions.getMonthConvert(objRtn.FVTA);
                    objRtn.TOPUS = rs01.getString("TOPUS");
                    objRtn.CARR = rs01.getString("CARR");
                    objRtn.CABI = rs01.getString("CABI");
                    objRtn.VCPN = rs01.getDouble("VCPN");
                    objRtn.MDACP = rs01.getString("MDACP");
                    objRtn.VCPMX = rs01.getDouble("VCPMX");
                    objRtn.TCMUS = rs01.getDouble("TCMUS");
                    objRtn.VCPUS = rs01.getDouble("VCPUS");
                    objRtn.COMISI = rs01.getDouble("COMISI");
                    objRtn.difVakues = totVCPN;

                    objRtn.QTYPAX = rs01.getInt("QTYPAX");
                    objRtn.totTAX = totPAX;//Total de Pasajeros

                    objRtn.page.PAGNUM = filter.page.PAGNUM;
                    objRtn.page.PAGROW = filter.page.PAGROW;
                    objRtn.page.TOTPAG = filter.page.TOTPAG;
                    objRtn.page.TOTROW = filter.page.TOTROW;

                    lstRtn.add(objRtn);
                }
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

    public List<A1692Filter> loadPX204S05A1692(A1692Filter filter) throws SQLException, Exception {

        List<A1692Filter> lstRtn = new ArrayList<A1692Filter>(0);
        A1692Filter objRtn;
        double totVCPN = 0;
        
        if(filter.IN_TKT.trim().length() < 13){
            filter.IN_TKT = Functions.fillZeros(13, filter.IN_TKT);
        }

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00165(?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.IN_TKT.substring(0, 3));//CIA
            cstmt01.setString(3, filter.IN_TKT.substring(3, 7));//FORMA
            cstmt01.setString(4, filter.IN_TKT.substring(7, 13));//SERIE
            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                totVCPN = rs01.getDouble("VCPN");
            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt01.getMoreResults()) {
                rs01 = cstmt01.getResultSet();
                while (rs01.next()) {
                    objRtn = new A1692Filter();
                    objRtn.strSQL = rs01.getString("DES_CCIA");
                    objRtn.FINVO = rs01.getString("FINVO");
                    objRtn.CCIA = rs01.getString("CCIA");
                    objRtn.FORMA = rs01.getString("FORMA");
                    objRtn.SERIE = rs01.getString("SERIE");
                    objRtn.CUPON = rs01.getString("CUPON");
                    objRtn.strTicket = rs01.getString("CCIA") + " " + rs01.getString("FORMA") + rs01.getString("SERIE") + " " + rs01.getString("CUPON");
                    objRtn.FCONT = rs01.getString("FCONT");
                    objRtn.strFormatDate2 = Functions.getMonthConvert(objRtn.FCONT);
                    objRtn.ZONA = rs01.getString("ZONA");
                    objRtn.CDEPART = rs01.getString("CDEPART");
                    objRtn.CARRIVA = rs01.getString("CARRIVA");
                    objRtn.DFLIGHT = rs01.getString("DFLIGHT");
                    objRtn.strFormatDate = Functions.getMonthConvert(objRtn.DFLIGHT);
                    objRtn.NFLIGHT = rs01.getString("NFLIGHT");
                    objRtn.LEGSEQ = rs01.getString("LEGSEQ");
                    objRtn.TDOC = rs01.getString("TDOC");
                    objRtn.PSVVTA = rs01.getString("PSVVTA");
                    objRtn.AGTIA = rs01.getString("AGTIA");
                    objRtn.FVTA = rs01.getString("FVTA");
                    objRtn.FTE = rs01.getString("FTE");
                    objRtn.strFormatFVTA = Functions.getMonthConvert(objRtn.FVTA);
                    objRtn.TOPUS = rs01.getString("TOPUS");
                    objRtn.CARR = rs01.getString("CARR");
                    objRtn.CABI = rs01.getString("CABI");
                    objRtn.VCPN = rs01.getDouble("VCPN");
                    objRtn.MDACP = rs01.getString("MDACP");
                    objRtn.VCPMX = rs01.getDouble("VCPMX");
                    objRtn.TCMUS = rs01.getDouble("TCMUS");
                    objRtn.VCPUS = rs01.getDouble("VCPUS");
                    objRtn.COMISI = rs01.getDouble("COMISI");
                    objRtn.difVakues = totVCPN;

                    lstRtn.add(objRtn);
                }
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
    
//    public List<A050Filter> loadPX216S01WRF071(A050Filter filter) throws SQLException, Exception {
//
//        List<A050Filter> list = new ArrayList<A050Filter>();
//        A050Filter objRtn;
//        long totQTY = 0;
//        double A050ACEPTA = 0, A050COMISI = 0, A050OVRAMT = 0, A050TUA = 0, A050NETO = 0;
//        String IN_PERIOD = filter.IN_PERIOD.trim();
//        CallableStatement cstmt = null;
//        ResultSet rs01 = null;
//        /* if (!IN_PERIOD.equals("") && IN_PERIOD.length() < 6) {
//         IN_PERIOD = Functions.fillZeros(6, IN_PERIOD);
//         } */
//        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00220(?,?,?,?,?,?,?,?,?,?)}";
//        Connection cnx = null;
//        try {
//            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
//            cstmt = cnx.prepareCall(SQLCLL01);
//            cstmt.registerOutParameter(7, Types.INTEGER);
//            cstmt.registerOutParameter(8, Types.INTEGER);
//            cstmt.registerOutParameter(9, Types.INTEGER);
//            cstmt.registerOutParameter(10, Types.INTEGER);
//
//            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
//            cstmt.setString(2, filter.IN_FECHA_FROM);
//            cstmt.setString(3, filter.IN_FECHA_TO);
//            cstmt.setString(4, filter.PERIOD);//STATUS
//            cstmt.setString(5, filter.TUSO);
//            cstmt.setString(6, IN_PERIOD);
//            cstmt.setInt(7, filter.page.PAGNUM);
//            cstmt.setInt(8, -1);
//            cstmt.setInt(9, filter.page.TOTPAG);
//            cstmt.setInt(10, filter.page.TOTROW);
//            cstmt.execute();
//
//            filter.page.PAGNUM = cstmt.getInt(7);
//            filter.page.PAGROW = cstmt.getInt(8);
//            filter.page.TOTPAG = cstmt.getInt(9);
//            filter.page.TOTROW = cstmt.getInt(10);
//
//            rs01 = cstmt.getResultSet();
//
//            while (rs01.next()) {
//                totQTY = rs01.getLong("QTYC");
//                A050ACEPTA = rs01.getDouble("GROSS");
//                A050COMISI = rs01.getDouble("ISC");
//                A050OVRAMT = rs01.getDouble("OCOMIS");
//                A050TUA = rs01.getDouble("TAX");
//                A050NETO = rs01.getDouble("NETO");
//            }
//            try {
//                rs01.close();
//            } catch (SQLException e) {
//                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
//            }
//
//            if (cstmt.getMoreResults()) {
//                rs01 = cstmt.getResultSet();
//
//                while (rs01.next()) {
//
//                    objRtn = new A050Filter();
//                    objRtn.A050GRUPO = rs01.getString("GRUPO");
//                    objRtn.PERIOD = rs01.getString("PERIOD");
//
//                    if (!objRtn.PERIOD.equals("")) {
//                        objRtn.strEstado = "Processed";
//                    } else {
//                        objRtn.strEstado = "Pending";
//                    }
//                    objRtn.A050FCONTA = rs01.getString("DFEVAL");
//                    objRtn.A050AIRLI3 = rs01.getString("CIA");
//                    objRtn.strDescripcion = rs01.getString("DES_CIA");
//                    objRtn.strFormatDate = Functions.getMonthConvert(objRtn.A050FCONTA);
//                    objRtn.QCUPON = rs01.getLong("QTYC");
//                    objRtn.A050ACEPTA = rs01.getDouble("GROSS");
//                    objRtn.A050COMISI = rs01.getDouble("ISC");
//                    objRtn.A050OVRAMT = rs01.getDouble("OCOMIS");
//                    objRtn.A050TUA = rs01.getDouble("TAX");
//                    objRtn.A050NETO = rs01.getDouble("NETO");
//                    objRtn.TUSO = rs01.getString("TUSO");
//
//                    objRtn.totQTY = totQTY;
//                    objRtn.totA050ACEPTA = A050ACEPTA;
//                    objRtn.totA050COMISI = A050COMISI;
//                    objRtn.totA050OVRAMT = A050OVRAMT;
//                    objRtn.totA050TUA = A050TUA;
//                    objRtn.totA050NETO = A050NETO;
//                    objRtn.IN_PERIOD = IN_PERIOD;
//
//                    objRtn.page.PAGNUM = filter.page.PAGNUM;
//                    objRtn.page.PAGROW = filter.page.PAGROW;
//                    objRtn.page.TOTPAG = filter.page.TOTPAG;
//                    objRtn.page.TOTROW = filter.page.TOTROW;
//
//                    list.add(objRtn);
//
//                }
//            }
//
//        } finally {
//            if (rs01 != null) {
//                try {
//                    rs01.close();
//                } catch (SQLException e) {
//                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
//                }
//            }
//            if (cstmt != null) {
//                try {
//                    cstmt.close();
//                } catch (SQLException e) {
//                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
//                }
//            }
//            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
//            pasarGarbageCollector();
//        }
//
//        return list;
//    }
    
    public List<A050Filter> loadPX216S02A050_ISR(A050Filter filter) throws SQLException, Exception {

        List<A050Filter> list = new ArrayList<A050Filter>();
        A050Filter objRtn;
        long TOT = 0, QNMATCH = 0, QMATCH = 0, QAUDIT = 0;
        //String IN_PERIOD = filter.IN_PERIOD.trim();
        
        CallableStatement cstmt = null;
        ResultSet rs01 = null;
        Connection cnx = null;
        
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP03335_1(?,?,?,?,?,?)}";
        
        try {
            
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_FECHA_FROM);
            cstmt.setString(3, filter.PERIOD);//STATUS
            cstmt.setString(4, filter.TUSO);
            cstmt.setString(5, "");//GRUPO NO ES NECESARIO
            cstmt.setString(6, filter.IN_SFL);//SFL
            cstmt.execute();

            rs01 = cstmt.getResultSet();

            while (rs01.next()) {
                TOT = rs01.getLong("TOT");
                QNMATCH = rs01.getLong("QNMATCH");
                QMATCH = rs01.getLong("QMATCH");
                QAUDIT = rs01.getLong("QAUDIT");
            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt.getMoreResults()) {
                rs01 = cstmt.getResultSet();

                while (rs01.next()) {

                    objRtn = new A050Filter();
                    objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                    objRtn.PERIOD = filter.PERIOD;
                    objRtn.TUSO = filter.TUSO;
                    objRtn.IN_SFL = filter.IN_SFL;
                    
                    objRtn.A050FUSO = rs01.getString("A050FUSO");
                    objRtn.strDescripcion = rs01.getString("RANGO");
                    objRtn.QTY = rs01.getLong("TOT");
                    objRtn.QMATCH = rs01.getLong("QMATCH");
                    objRtn.QNMATCH = rs01.getLong("QNMATCH");
                    objRtn.QAUDIT = rs01.getLong("QAUDIT");

                    objRtn.totQTY = TOT;
                    objRtn.totQMATCH = QMATCH;
                    objRtn.totQNMATCH = QNMATCH;
                    objRtn.totQAUDIT = QAUDIT;

                    list.add(objRtn);
                }
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

        return list;
    }
    
    public List<A050Filter> loadPX216S02A050_ISR_UNMATCH(A050Filter filter) throws SQLException, Exception {

        List<A050Filter> list = new ArrayList<A050Filter>();
        A050Filter objRtn;
        long TOT = 0, QNMATCH = 0, QMATCH = 0, QAUDIT = 0, QMATCH730 = 0, QNMATCH730 = 0;
        //String IN_PERIOD = filter.IN_PERIOD.trim();
        
        CallableStatement cstmt = null;
        ResultSet rs01 = null;
        Connection cnx = null;
        
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP03373(?,?,?,?,?,?)}";
        
        try {
            
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_FECHA_FROM);
            cstmt.setString(3, filter.PERIOD);//STATUS
            cstmt.setString(4, filter.TUSO);
            cstmt.setString(5, "");//GRUPO NO ES NECESARIO
            cstmt.setString(6, filter.IN_SFL);//SFL
            cstmt.execute();

            rs01 = cstmt.getResultSet();

            while (rs01.next()) {
                TOT = rs01.getLong("TOT");
                QNMATCH = rs01.getLong("QNMATCH");
                QMATCH = rs01.getLong("QMATCH");
                
                QMATCH730 = rs01.getLong("QMATCH730");
                QNMATCH730 = rs01.getLong("QNMATCH730");
                QAUDIT = rs01.getLong("QAUDIT");
            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt.getMoreResults()) {
                rs01 = cstmt.getResultSet();

                while (rs01.next()) {

                    objRtn = new A050Filter();
                    objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                    objRtn.PERIOD = filter.PERIOD;
                    objRtn.TUSO = filter.TUSO;
                    objRtn.IN_SFL = filter.IN_SFL;
                    
                    objRtn.A050FUSO = rs01.getString("A050FUSO");
                    objRtn.strDescripcion = rs01.getString("RANGO");
                    objRtn.QTY = rs01.getLong("TOT");
                    objRtn.QMATCH = rs01.getLong("QMATCH");
                    objRtn.QNMATCH = rs01.getLong("QNMATCH");
                    
                    objRtn.QMATCH730 = rs01.getLong("QMATCH730");
                    objRtn.QNMATCH730 = rs01.getLong("QNMATCH730");
                    objRtn.QAUDIT = rs01.getLong("QAUDIT");

                    objRtn.totQTY = TOT;
                    objRtn.totQMATCH = QMATCH;
                    objRtn.totQNMATCH = QNMATCH;
                    
                    objRtn.totQMATCH730 = QMATCH730;
                    objRtn.totQNMATCH730 = QNMATCH730;
                    objRtn.totQAUDIT = QAUDIT;

                    list.add(objRtn);
                }
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

        return list;
    }
    
    public List<A050Filter> loadPX216S03A050_ISR_TKT_UM(A050Filter filter) throws SQLException, Exception {

        List<A050Filter> list = new ArrayList<A050Filter>();
        A050Filter objRtn;
        String ruta = "";
        String sector = "";
        int n = 0, x = 0, v = 0;
        String Msj = "", strTitulo = "Flight Date : " + filter.A050FUSO.trim();

        CallableStatement cstmt = null;
        ResultSet rs01 = null;
        Connection cnx = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP03374_1(?,?,?,?,?,?,?,?,?,?)}";

        try {
            
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            
            cstmt.registerOutParameter(7, Types.INTEGER);
            cstmt.registerOutParameter(8, Types.INTEGER);
            cstmt.registerOutParameter(9, Types.INTEGER);
            cstmt.registerOutParameter(10, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.A050FUSO.trim());
            cstmt.setString(3, filter.PERIOD);//STATUS
            cstmt.setString(4, filter.TUSO);
            cstmt.setString(5, "");//GRUPO NO ES NECESARIO
            cstmt.setString(6, filter.IN_SFL);//SFL
            cstmt.setInt(7, filter.page.PAGNUM);
            cstmt.setInt(8, filter.page.PAGROW);
            cstmt.setInt(9, filter.page.TOTPAG);
            cstmt.setInt(10, filter.page.TOTROW);
            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(7);
            filter.page.PAGROW = cstmt.getInt(8);
            filter.page.TOTPAG = cstmt.getInt(9);
            filter.page.TOTROW = cstmt.getInt(10);

            rs01 = cstmt.getResultSet();

            while (rs01.next()) {

                objRtn = new A050Filter();
                objRtn.A050FUSO = filter.A050FUSO;
                objRtn.PERIOD = filter.PERIOD;
                objRtn.TUSO = filter.TUSO;
                objRtn.IN_SFL = filter.IN_SFL;

                objRtn.strDescripcion5 = Msj;
                objRtn.RN = rs01.getInt("RN");
                objRtn.strTicket = rs01.getString("A050KEY");
                objRtn.A050GRUPO = rs01.getString("A050GRUPO");
                objRtn.A050NROPRT = rs01.getString("A050NROPRT");
                objRtn.A050BASE = rs01.getString("A050BASE");
                objRtn.A050TUA = rs01.getDouble("A050TUA");//TUA
                objRtn.A050ACEPTA = rs01.getDouble("A050ACEPTA");
                objRtn.A050COMISP = rs01.getDouble("A050COMISP");//% comision
                objRtn.A050COMISI = rs01.getDouble("A050COMISI");//Importe comision
                objRtn.A050OVRISC = rs01.getDouble("A050OVRISC");//%OVR-ISC
                objRtn.A050OVRAMT = rs01.getDouble("A050OVRAMT");//AMOUNT OVR-COMIS
                objRtn.A050NETO = rs01.getDouble("A050NETO");
                objRtn.A050FVUELO = rs01.getString("A050FVUELO");
                objRtn.strFormatDate1 = Functions.getMonthConvert(objRtn.A050FVUELO);
                if(!rs01.getString("CCIA").trim().equals("-") && !rs01.getString("CCIA").trim().isEmpty()){
                    objRtn.strDescripcion2 = "Y";
                }else{
                    objRtn.strDescripcion2 = "";
                }
                objRtn.strTitulo = strTitulo;

                //objRtn.A050CLASE=rs01.getString("A050CLASE");
                //objRtn.A050CARS = rs01.getString("A050CARS");
                objRtn.A050RUTVOL = rs01.getString("A050RUTVOL");//BCNMAD
                objRtn.strDescripcion = objRtn.A050RUTVOL.substring(0, 3) + " - " + objRtn.A050RUTVOL.substring(3);
                ruta = Functions.fillString(rs01.getString("A050RUTA"), 6);//BCNMADMEXVERMEXMADBCN
                //sector = objRtn.A050RUTAP;
                sector = objRtn.A050RUTVOL;
                n = 0;
                x = 0;
                v = 0;

                for (int i = 0; i < ruta.length(); i += 3) {
                    if (i + 6 <= ruta.length()
                            && ruta.substring(i, i + 3).equals(sector.substring(0, 3))
                            && ruta.substring(i + 3, i + 6).equals(sector.substring(3, 6))) {
                        objRtn.A050TRANSP = rs01.getString("A050TRANSP").substring(n, n + 2);
                        objRtn.A050CLASE = rs01.getString("A050CLASE").substring(x, x + 1);
                        objRtn.A050VUELO = rs01.getString("A050VUELO").substring(v, v + 5);
                    }
                    v += 5;
                    n += 2;
                    x++;
                }

                objRtn.A050FCONTA = rs01.getString("A050FCONTA");
                objRtn.strFormatDate = Functions.getMonthConvert(objRtn.A050FCONTA);
                objRtn.A050TUSO = rs01.getString("A050TUSO");
                objRtn.A050MNRCD = rs01.getString("A050MNRCD");
                objRtn.A050AIRLI3 = rs01.getString("A050AIRLI3");
                objRtn.strDescripcion1 = rs01.getString("DES_CIA");

                /*if (Msj.toUpperCase().contains("TAX")) {
                    objRtn.strMarcaTAX = rs01.getString("IND");
                } else if (Msj.toUpperCase().contains("COMMISS")) {
                    objRtn.strMarcaCOMI = rs01.getString("IND");
                } else {
                    objRtn.strMarcaNETO = rs01.getString("IND");
                }
                objRtn.strMarcaOVERISC = rs01.getString("OVERISC");*/

                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;

                list.add(objRtn);

            }

            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
            try {
                cstmt.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

        } catch (Exception e) {
            //e.getMessage();
            e.printStackTrace();
        } finally {
            if (rs01 != null) {
                try {
                    rs01.close();
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

        return list;
    }
    
    public String loadPX216_VALID_AFTER_CLOSE_DAY(A050Filter filter) throws SQLException, Exception {
        
        String strMsj = "Operation was successful.";

        CallableStatement cstmt = null;
        Connection cnx = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQPVALID_ISR(?,?,?)}";

        try {
            
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(3, Types.VARCHAR);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.A050FUSO);
            cstmt.setString(3, "");
            cstmt.execute();

            strMsj = cstmt.getString(3);
            

        } catch (Exception e) {
            strMsj = "ERROR : " + strMsj + " - " + e.getMessage();
            e.printStackTrace();
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
    
    public String loadPX216_ISR_CLOSE_DAY(A050Filter filter) throws SQLException, Exception {
        
        String strMsj = "Operation was successful.";

        CallableStatement cstmt = null;
        Connection cnx = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP03371(?,?,?,?)}";

        try {
            
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(4, Types.VARCHAR);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.A050FUSO);
            cstmt.setString(3, session.getUserView().getUserInfo().USR);
            cstmt.setString(4, "");
            cstmt.execute();

            strMsj = cstmt.getString(4);
            
            if(strMsj.trim().isEmpty()){
                strMsj = "Operation was successful.";
            }

        } catch (Exception e) {
            strMsj = "ERROR : " + strMsj + " - " + e.getMessage();
            e.printStackTrace();
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
    
    public List<A050Filter> loadPX216S02A050_ISR_GRUPO(A050Filter filter, String strFLAG) throws SQLException, Exception {

        List<A050Filter> list = new ArrayList<A050Filter>();
        A050Filter objRtn;
        long totQTY = 0;
        double A050ACEPTA = 0, A050COMISI = 0, A050OVRAMT = 0, A050TUA = 0, A050NETO = 0;
        String IN_PERIOD = filter.IN_PERIOD.trim();
        CallableStatement cstmt = null;
        ResultSet rs01 = null;
        Connection cnx = null;
        
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP03337(?,?,?,?,?,?,?,?,?,?)}";
        
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(7, Types.INTEGER);
            cstmt.registerOutParameter(8, Types.INTEGER);
            cstmt.registerOutParameter(9, Types.INTEGER);
            cstmt.registerOutParameter(10, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_FECHA_FROM);
            cstmt.setString(3, filter.PERIOD);//STATUS
            cstmt.setString(4, filter.TUSO);
            cstmt.setString(5, IN_PERIOD);
            cstmt.setString(6, strFLAG);
            cstmt.setInt(7, filter.page.PAGNUM);
            cstmt.setInt(8, filter.page.PAGROW);
            cstmt.setInt(9, filter.page.TOTPAG);
            cstmt.setInt(10, filter.page.TOTROW);
            cstmt.execute();

            filter.page.PAGNUM = cstmt.getInt(7);
            filter.page.PAGROW = cstmt.getInt(8);
            filter.page.TOTPAG = cstmt.getInt(9);
            filter.page.TOTROW = cstmt.getInt(10);

            rs01 = cstmt.getResultSet();

            while (rs01.next()) {
                totQTY = rs01.getLong("QTYC");
                A050ACEPTA = rs01.getDouble("GROSS");
                A050COMISI = rs01.getDouble("ISC");
                A050OVRAMT = rs01.getDouble("OCOMIS");
                A050TUA = rs01.getDouble("TAX");
                A050NETO = rs01.getDouble("NETO");
            }
            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

            if (cstmt.getMoreResults()) {
                rs01 = cstmt.getResultSet();

                while (rs01.next()) {

                    objRtn = new A050Filter();
                    objRtn.IN_FECHA_FROM = filter.IN_FECHA_FROM;
                    objRtn.A050GRUPO = rs01.getString("GRUPO");
                    objRtn.PERIOD = rs01.getString("PERIOD");

                    if (!objRtn.PERIOD.equals("")) {
                        objRtn.strEstado = "Processed";
                    } else {
                        objRtn.strEstado = "Pending";
                    }
                    objRtn.A050FCONTA = rs01.getString("DFEVAL");
                    objRtn.A050AIRLI3 = rs01.getString("CIA");
                    objRtn.strDescripcion = rs01.getString("DES_CIA");
                    if(strFLAG.trim().equals("1")){
                        objRtn.strFormatDate = rs01.getString("DFEVAL");
                    }else{
                        objRtn.strFormatDate = Functions.getMonthConvert(objRtn.A050FCONTA);
                    }
                    objRtn.QCUPON = rs01.getLong("QTYC");
                    objRtn.A050ACEPTA = rs01.getDouble("GROSS");
                    objRtn.A050COMISI = rs01.getDouble("ISC");
                    objRtn.A050OVRAMT = rs01.getDouble("OCOMIS");
                    objRtn.A050TUA = rs01.getDouble("TAX");
                    objRtn.A050NETO = rs01.getDouble("NETO");
                    objRtn.TUSO = rs01.getString("TUSO");
                    
                    /*objRtn.A050GRUPO = rs01.getString("A050GRUPO");
                    objRtn.PERIOD = rs01.getString("A050PSTRF");

                    if (!objRtn.PERIOD.equals("")) {
                        objRtn.strEstado = "Processed";
                    } else {
                        objRtn.strEstado = "Pending";
                    }
                    objRtn.A050FCONTA = rs01.getString("A050FUSO");
                    objRtn.A050AIRLI3 = rs01.getString("A050AIRLI3");
                    objRtn.strDescripcion = rs01.getString("DES_CIA");
                    objRtn.strFormatDate = Functions.getMonthConvert(objRtn.A050FCONTA);
                    objRtn.QCUPON = rs01.getLong("QTYC");
                    objRtn.A050ACEPTA = rs01.getDouble("GROSS");
                    objRtn.A050COMISI = rs01.getDouble("ISC");
                    objRtn.A050OVRAMT = rs01.getDouble("OCOMIS");
                    objRtn.A050TUA = rs01.getDouble("TAX");
                    objRtn.A050NETO = rs01.getDouble("NETO");
                    objRtn.TUSO = rs01.getString("A050TUSO");*/

                    objRtn.totQTY = totQTY;
                    objRtn.totA050ACEPTA = A050ACEPTA;
                    objRtn.totA050COMISI = A050COMISI;
                    objRtn.totA050OVRAMT = A050OVRAMT;
                    objRtn.totA050TUA = A050TUA;
                    objRtn.totA050NETO = A050NETO;
                    objRtn.IN_PERIOD = IN_PERIOD;

                    objRtn.page.PAGNUM = filter.page.PAGNUM;
                    objRtn.page.PAGROW = filter.page.PAGROW;
                    objRtn.page.TOTPAG = filter.page.TOTPAG;
                    objRtn.page.TOTROW = filter.page.TOTROW;

                    list.add(objRtn);

                }
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

        return list;
    }
    
    public List<A050Filter> loadPX216S02A050(A050Filter filter) throws SQLException, Exception {

        List<A050Filter> list = new ArrayList<A050Filter>();
        A050Filter objRtn;
        String ruta = "";
        String sector = "";
        int n = 0, x = 0, v = 0;
        String Msj = "";

        CallableStatement cstmt = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00221(?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(7, Types.VARCHAR);
            cstmt.registerOutParameter(8, Types.INTEGER);
            cstmt.registerOutParameter(9, Types.INTEGER);
            cstmt.registerOutParameter(10, Types.INTEGER);
            cstmt.registerOutParameter(11, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.A050GRUPO.trim());
            cstmt.setString(3, filter.strSQL.replace("AND ()", "").trim());
            cstmt.setString(4, filter.A050AIRLI3);
            cstmt.setString(5, filter.PERIOD);
            cstmt.setString(6, filter.TUSO);
            cstmt.setString(7, "");
            cstmt.setInt(8, filter.page.PAGNUM);
            cstmt.setInt(9, filter.page.PAGROW);
            cstmt.setInt(10, filter.page.TOTPAG);
            cstmt.setInt(11, filter.page.TOTROW);
            cstmt.execute();

            Msj = cstmt.getString(7).trim();
            filter.page.PAGNUM = cstmt.getInt(8);
            filter.page.PAGROW = cstmt.getInt(9);
            filter.page.TOTPAG = cstmt.getInt(10);
            filter.page.TOTROW = cstmt.getInt(11);

            rs01 = cstmt.getResultSet();

            while (rs01.next()) {

                objRtn = new A050Filter();
                objRtn.PERIOD = filter.PERIOD;
                objRtn.TUSO = filter.TUSO;

                objRtn.strDescripcion5 = Msj;
                objRtn.strTicket = rs01.getString("A050KEY").trim();
                objRtn.A050GRUPO = rs01.getString("A050GRUPO").trim();
                objRtn.A050NROPRT = rs01.getString("A050NROPRT").trim();
                objRtn.A050BASE = rs01.getString("A050BASE").trim();
                objRtn.A050TUA = rs01.getDouble("A050TUA");//TUA
                objRtn.A050ACEPTA = rs01.getDouble("A050ACEPTA");
                objRtn.A050COMISP = rs01.getDouble("A050COMISP");//% comision
                objRtn.A050COMISI = rs01.getDouble("A050COMISI");//Importe comision
                objRtn.A050OVRISC = rs01.getDouble("A050OVRISC");//%OVR-ISC
                objRtn.A050OVRAMT = rs01.getDouble("A050OVRAMT");//AMOUNT OVR-COMIS
                objRtn.A050NETO = rs01.getDouble("A050NETO");
                objRtn.A050FVUELO = rs01.getString("A050FVUELO").trim();
                objRtn.strFormatDate1 = Functions.getMonthConvert(objRtn.A050FVUELO);

                //objRtn.A050CLASE=rs01.getString("A050CLASE");
                //objRtn.A050CARS = rs01.getString("A050CARS");
                objRtn.A050RUTVOL = Functions.fillString(rs01.getString("A050RUTVOL").trim(), 6);//BCNMAD
                objRtn.strDescripcion = objRtn.A050RUTVOL.substring(0, 3) + " - " + objRtn.A050RUTVOL.substring(3);
                ruta = Functions.fillString(rs01.getString("A050RUTA").trim(), 6);//BCNMADMEXVERMEXMADBCN
                //sector = objRtn.A050RUTAP;
                sector = objRtn.A050RUTVOL;
                n = 0;
                x = 0;
                v = 0;

                try {
                    for (int i = 0; i < ruta.length(); i += 3) {
                        if (i + 6 <= ruta.length()
                                && ruta.substring(i, i + 3).equals(sector.substring(0, 3))
                                && ruta.substring(i + 3, i + 6).equals(sector.substring(3, 6))) {
                            objRtn.A050TRANSP = rs01.getString("A050TRANSP").substring(n, n + 2);
                            objRtn.A050CLASE = rs01.getString("A050CLASE").substring(x, x + 1);
                            objRtn.A050VUELO = rs01.getString("A050VUELO").substring(v, v + 5);
                        }
                        v += 5;
                        n += 2;
                        x++;
                    }
                } catch (Exception e) {
                }

                objRtn.A050FCONTA = rs01.getString("A050FCONTA").trim();
                objRtn.A050PSTRF = rs01.getString("A050PSTRF").trim();
                objRtn.strFormatDate = Functions.getMonthConvert(objRtn.A050FCONTA);
                objRtn.A050TUSO = rs01.getString("A050TUSO").trim();
                objRtn.A050MNRCD = rs01.getString("A050MNRCD").trim();
                objRtn.A050AIRLI3 = rs01.getString("A050AIRLI3").trim();
                objRtn.strDescripcion1 = rs01.getString("DES_CIA").trim();

                if (Msj.toUpperCase().contains("TAX")) {
                    objRtn.strMarcaTAX = rs01.getString("IND");
                } else if (Msj.toUpperCase().contains("COMMISS")) {
                    objRtn.strMarcaCOMI = rs01.getString("IND");
                } else {
                    objRtn.strMarcaNETO = rs01.getString("IND");
                }
                objRtn.strMarcaOVERISC = rs01.getString("OVERISC");

                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;

                list.add(objRtn);

            }

            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
            try {
                cstmt.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

        } finally {
            if (rs01 != null) {
                try {
                    rs01.close();
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

        return list;
    }

    public String loadPX216S03A050(A050Filter filter) throws SQLException, Exception {
        //REALIZA EL INSERT, UPDATE O DELETE DE UN REGISTRO EN LA TABLA A1849.
        String strMsj = "An Unexpected Error Ocurred.";
        //String strMsj = "Operation was successful.";

        CallableStatement cstmt = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00222(?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(8, Types.VARCHAR);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.A050GRUPO);
            cstmt.setString(3, filter.strSQL.replace("AND ()", "").trim());
            cstmt.setString(4, session.getUserView().getCustomerInfo().USR);
            cstmt.setString(5, filter.A050AIRLI3);
            cstmt.setString(6, filter.PERIOD);
            cstmt.setString(7, filter.TUSO);
            cstmt.setString(8, "");
            cstmt.execute();

            strMsj = cstmt.getString(8);

        } catch (Exception e) {
            strMsj = strMsj + " - " + e.getMessage();
            e.printStackTrace();
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

    public List<A050Filter> loadPX216SQP01925(A050Filter filter) throws SQLException, Exception {

        List<A050Filter> list = new ArrayList<A050Filter>();
        A050Filter objRtn;
        String ruta = "";
        String sector = "";
        int n = 0, x = 0, v = 0;
        String Msj = "", Grupos = "";

        CallableStatement cstmt = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP01925(?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(8, Types.VARCHAR);
            cstmt.registerOutParameter(9, Types.VARCHAR);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_GRUPO_FROM.trim());
            cstmt.setString(3, filter.IN_GRUPO_TO.trim());
            cstmt.setString(4, filter.strSQL.replace("AND ()", "").trim());
            cstmt.setString(5, filter.A050AIRLI3);
            cstmt.setString(6, filter.PERIOD);
            cstmt.setString(7, filter.TUSO);
            cstmt.setString(8, "");
            cstmt.setString(9, "");
            cstmt.execute();

            Grupos = cstmt.getString(8).trim();
            Msj = cstmt.getString(9).trim();

            rs01 = cstmt.getResultSet();

            objRtn = new A050Filter();
            objRtn.PERIOD = filter.PERIOD;
            objRtn.TUSO = filter.TUSO;

            objRtn.strDescripcion4 = Grupos;
            objRtn.strDescripcion5 = Msj;

            list.add(objRtn);

        } finally {
            if (rs01 != null) {
                try {
                    rs01.close();
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

        return list;
    }

    public String loadPX216SQP01926(A050Filter filter) throws SQLException, Exception {
        //REALIZA EL INSERT, UPDATE O DELETE DE UN REGISTRO EN LA TABLA A1849.
        String strMsj = "An Unexpected Error Ocurred.";
        //String strMsj = "Operation was successful.";

        CallableStatement cstmt = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP01926(?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(9, Types.VARCHAR);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_GRUPO_FROM);
            cstmt.setString(3, filter.IN_GRUPO_TO);
            cstmt.setString(4, filter.strSQL.replace("AND ()", "").trim());
            cstmt.setString(5, session.getUserView().getCustomerInfo().USR);
            cstmt.setString(6, filter.A050AIRLI3);
            cstmt.setString(7, filter.PERIOD);
            cstmt.setString(8, filter.TUSO);
            cstmt.setString(9, "");
            cstmt.execute();

            strMsj = cstmt.getString(9);

        } catch (Exception e) {
            strMsj = strMsj + " - " + e.getMessage();
            e.printStackTrace();
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

    public List<A020Filter> loadPX195S01A020(A020Filter filter) throws SQLException, Exception {
        List<A020Filter> lstRtn = new ArrayList<A020Filter>(0);
        A020Filter objRtn;

        CallableStatement cs = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00225(?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(SQLCLL01);

            cs.registerOutParameter(8, Types.INTEGER);
            cs.registerOutParameter(9, Types.INTEGER);
            cs.registerOutParameter(10, Types.INTEGER);
            cs.registerOutParameter(11, Types.INTEGER);

            cs.setString(1, session.getUserView().getCustomerInfoComplete().fileA005.A005KEY1);
            cs.setInt(2, filter.IN_TIPOFECHA);
            cs.setString(3, filter.IN_FECHA_FROM);
            cs.setString(4, filter.IN_FECHA_TO);
            cs.setString(5, filter.IN_CIA);
            cs.setString(6, filter.IN_CODOBO);//Periodo
            cs.setString(7, filter.IN_STATUS);//Source Code
            cs.setInt(8, filter.page.PAGNUM);
            cs.setInt(9, filter.page.PAGROW);
            cs.setInt(10, filter.page.TOTPAG);
            cs.setInt(11, filter.page.TOTROW);

            cs.execute();

            filter.page.PAGNUM = cs.getInt(8);
            filter.page.PAGROW = cs.getInt(9);
            filter.page.TOTPAG = cs.getInt(10);
            filter.page.TOTROW = cs.getInt(11);

            rs01 = cs.getResultSet();

            while (rs01.next()) {
                objRtn = new A020Filter();
                objRtn.A020FRECHA = rs01.getString("A020FRECHA");
                objRtn.strFormatDate = Functions.getMonthConvert(objRtn.A020FRECHA);
                objRtn.A020PSTRF = rs01.getString("A020PSTRF");
                objRtn.A020KEY = rs01.getString("A020KEY");
                objRtn.A020CIA = rs01.getString("A020CIA");
                objRtn.A020FORMA = rs01.getString("A020FORMA");
                objRtn.A020SERIE = rs01.getString("A020SERIE");
                objRtn.A020CUPON = rs01.getString("A020CUPON");
                objRtn.strUSAC = rs01.getString("SETAUTC");
                objRtn.strDescripcion = objRtn.A020CIA + " " + objRtn.A020FORMA + objRtn.A020SERIE + " " + objRtn.A020CUPON;
                objRtn.A020AIRLI3 = rs01.getString("A020AIRLI3");
                objRtn.A020SUFACT = rs01.getString("A020SUFACT");
                objRtn.A020SUFECH = rs01.getString("A020SUFECH");
                objRtn.strFormatDate1 = Functions.getMonthConvert(objRtn.A020SUFECH);
                objRtn.A020SUDEBI = rs01.getDouble("A020SUDEBI");
                objRtn.A020IMPNAC = rs01.getDouble("A020IMPNAC");
                objRtn.A020TOTDEB = rs01.getDouble("A020TOTDEB");
                objRtn.A020ACEPTA = rs01.getDouble("A020ACEPTA");
                objRtn.A020IMPINT = rs01.getDouble("A020IMPINT");
                objRtn.A020TOTHAB = rs01.getDouble("A020TOTHAB");
                objRtn.A020NETO = rs01.getDouble("A020NETO");
                objRtn.A020CODMOT = rs01.getString("A020CODMOT");
                objRtn.A020RMSN = rs01.getString("A020RMSN");
                objRtn.A020GRUPO = rs01.getString("A020GRUPO");
                objRtn.A020TUSO = rs01.getString("A020TUSO");

                //Paginación ===================================================
                objRtn.page.PAGNUM = filter.page.PAGNUM;
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
            if (cs != null) {
                try {
                    cs.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return lstRtn;
    }
    
    public List<A050Filter> loadPX216S03A050_ISR_TKT(A050Filter filter) throws SQLException, Exception {

        List<A050Filter> list = new ArrayList<A050Filter>();
        A050Filter objRtn;
        String ruta = "";
        String sector = "";
        int n = 0, x = 0, v = 0;
        String Msj = "";

        CallableStatement cstmt = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP03338_1(?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(7, Types.VARCHAR);
            cstmt.registerOutParameter(8, Types.INTEGER);
            cstmt.registerOutParameter(9, Types.INTEGER);
            cstmt.registerOutParameter(10, Types.INTEGER);
            cstmt.registerOutParameter(11, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.A050GRUPO.trim());
            cstmt.setString(3, filter.strSQL.replace("AND ()", "").trim());
            cstmt.setString(4, filter.A050AIRLI3);
            cstmt.setString(5, filter.PERIOD);
            cstmt.setString(6, filter.TUSO);
            cstmt.setString(7, "");
            cstmt.setInt(8, filter.page.PAGNUM);
            cstmt.setInt(9, filter.page.PAGROW);
            cstmt.setInt(10, filter.page.TOTPAG);
            cstmt.setInt(11, filter.page.TOTROW);
            cstmt.execute();

            Msj = cstmt.getString(7).trim();
            filter.page.PAGNUM = cstmt.getInt(8);
            filter.page.PAGROW = cstmt.getInt(9);
            filter.page.TOTPAG = cstmt.getInt(10);
            filter.page.TOTROW = cstmt.getInt(11);

            rs01 = cstmt.getResultSet();

            while (rs01.next()) {

                objRtn = new A050Filter();
                objRtn.PERIOD = filter.PERIOD;
                objRtn.TUSO = filter.TUSO;

                objRtn.strDescripcion5 = Msj;
                objRtn.strTicket = rs01.getString("A050KEY");
                objRtn.A050GRUPO = rs01.getString("A050GRUPO");
                objRtn.A050NROPRT = rs01.getString("A050NROPRT");
                objRtn.A050BASE = rs01.getString("A050BASE");
                objRtn.A050TUA = rs01.getDouble("A050TUA");//TUA
                objRtn.A050ACEPTA = rs01.getDouble("A050ACEPTA");
                objRtn.A050COMISP = rs01.getDouble("A050COMISP");//% comision
                objRtn.A050COMISI = rs01.getDouble("A050COMISI");//Importe comision
                objRtn.A050OVRISC = rs01.getDouble("A050OVRISC");//%OVR-ISC
                objRtn.A050OVRAMT = rs01.getDouble("A050OVRAMT");//AMOUNT OVR-COMIS
                objRtn.A050NETO = rs01.getDouble("A050NETO");
                objRtn.A050FVUELO = rs01.getString("A050FVUELO");
                objRtn.strFormatDate1 = Functions.getMonthConvert(objRtn.A050FVUELO);
                if(!rs01.getString("CCIA").trim().equals("-") && !rs01.getString("CCIA").trim().isEmpty()){
                    objRtn.strDescripcion2 = "Y";
                }else{
                    objRtn.strDescripcion2 = "";
                }

                //objRtn.A050CLASE=rs01.getString("A050CLASE");
                //objRtn.A050CARS = rs01.getString("A050CARS");
                objRtn.A050RUTVOL = rs01.getString("A050RUTVOL");//BCNMAD
                objRtn.strDescripcion = objRtn.A050RUTVOL.substring(0, 3) + " - " + objRtn.A050RUTVOL.substring(3);
                ruta = Functions.fillString(rs01.getString("A050RUTA"), 6);//BCNMADMEXVERMEXMADBCN
                //sector = objRtn.A050RUTAP;
                sector = objRtn.A050RUTVOL;
                n = 0;
                x = 0;
                v = 0;

                for (int i = 0; i < ruta.length(); i += 3) {
                    if (i + 6 <= ruta.length()
                            && ruta.substring(i, i + 3).equals(sector.substring(0, 3))
                            && ruta.substring(i + 3, i + 6).equals(sector.substring(3, 6))) {
                        objRtn.A050TRANSP = rs01.getString("A050TRANSP").substring(n, n + 2);
                        objRtn.A050CLASE = rs01.getString("A050CLASE").substring(x, x + 1);
                        objRtn.A050VUELO = rs01.getString("A050VUELO").substring(v, v + 5);
                    }
                    v += 5;
                    n += 2;
                    x++;
                }

                objRtn.A050FCONTA = rs01.getString("A050FCONTA");
                objRtn.strFormatDate = Functions.getMonthConvert(objRtn.A050FCONTA);
                objRtn.A050TUSO = rs01.getString("A050TUSO");
                objRtn.A050MNRCD = rs01.getString("A050MNRCD");
                objRtn.A050AIRLI3 = rs01.getString("A050AIRLI3");
                objRtn.strDescripcion1 = rs01.getString("DES_CIA");

                if (Msj.toUpperCase().contains("TAX")) {
                    objRtn.strMarcaTAX = rs01.getString("IND");
                } else if (Msj.toUpperCase().contains("COMMISS")) {
                    objRtn.strMarcaCOMI = rs01.getString("IND");
                } else {
                    objRtn.strMarcaNETO = rs01.getString("IND");
                }
                objRtn.strMarcaOVERISC = rs01.getString("OVERISC");

                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;

                list.add(objRtn);

            }

            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
            try {
                cstmt.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

        } catch (Exception e) {
            //e.getMessage();
            e.printStackTrace();
        } finally {
            if (rs01 != null) {
                try {
                    rs01.close();
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

        return list;
    }

    public List<A050Filter> loadPX216_ISR_VALIDATE_GROUPS(A050Filter filter) throws SQLException, Exception {

        List<A050Filter> list = new ArrayList<A050Filter>();
        A050Filter objRtn;
        String Msj = "", Grupos = "";

        CallableStatement cstmt = null;
        ResultSet rs01 = null;
        Connection cnx = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP03339(?,?,?,?,?,?,?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(8, Types.VARCHAR);
            cstmt.registerOutParameter(9, Types.VARCHAR);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_GRUPO_FROM.trim());
            cstmt.setString(3, filter.IN_GRUPO_TO.trim());
            cstmt.setString(4, filter.strSQL.replace("AND ()", "").trim());
            cstmt.setString(5, filter.A050AIRLI3);
            cstmt.setString(6, filter.PERIOD);
            cstmt.setString(7, filter.TUSO);
            cstmt.setString(8, "");
            cstmt.setString(9, "");
            cstmt.execute();

            Grupos = cstmt.getString(8).trim();
            Msj = cstmt.getString(9).trim();

            rs01 = cstmt.getResultSet();

            objRtn = new A050Filter();
            objRtn.PERIOD = filter.PERIOD;
            objRtn.TUSO = filter.TUSO;

            objRtn.strDescripcion4 = Grupos;
            objRtn.strDescripcion5 = Msj;

            list.add(objRtn);

            try {
                rs01.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
            try {
                cstmt.close();
            } catch (SQLException e) {
                logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }

        } catch (Exception e) {
            //e.getMessage();
            e.printStackTrace();
        } finally {
            if (rs01 != null) {
                try {
                    rs01.close();
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

        return list;
    }

    public String loadPX216_ISR_CLOSE_GROUP(A050Filter filter) throws SQLException, Exception {
        
        //REALIZA EL INSERT, UPDATE O DELETE DE UN REGISTRO EN LA TABLA A1849.
        String strMsj = "An Unexpected Error Ocurred.";
        //String strMsj = "Operation was successful.";

        CallableStatement cstmt = null;
        Connection cnx = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP03369(?,?,?,?,?,?,?,?)}";

        try {
            
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(8, Types.VARCHAR);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.A050GRUPO);
            cstmt.setString(3, filter.strSQL.replace("AND ()", "").trim());
            cstmt.setString(4, session.getUserView().getCustomerInfo().USR);
            cstmt.setString(5, filter.A050AIRLI3);
            cstmt.setString(6, filter.PERIOD);
            cstmt.setString(7, filter.TUSO);
            cstmt.setString(8, "");
            cstmt.execute();

            strMsj = cstmt.getString(8);

        } catch (Exception e) {
            strMsj = strMsj + " - " + e.getMessage();
            e.printStackTrace();
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

    public String loadPX216_ISR_CLOSE_RANGE_GROUPS(A050Filter filter) throws SQLException, Exception {
        
        //REALIZA EL INSERT, UPDATE O DELETE DE UN REGISTRO EN LA TABLA A1849.
        String strMsj = "An Unexpected Error Ocurred.";
        //String strMsj = "Operation was successful.";

        CallableStatement cstmt = null;
        Connection cnx = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP03340(?,?,?,?,?,?,?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(9, Types.VARCHAR);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.IN_GRUPO_FROM);
            cstmt.setString(3, filter.IN_GRUPO_TO);
            cstmt.setString(4, filter.strSQL.replace("AND ()", "").trim());
            cstmt.setString(5, session.getUserView().getCustomerInfo().USR);
            cstmt.setString(6, filter.A050AIRLI3);
            cstmt.setString(7, filter.PERIOD);
            cstmt.setString(8, filter.TUSO);
            cstmt.setString(9, "");
            cstmt.execute();

            strMsj = cstmt.getString(9);

        } catch (Exception e) {
            strMsj = strMsj + " - " + e.getMessage();
            e.printStackTrace();
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

    
    // Buscar si existe FINVOIC ( duplicado A1851)
    public boolean searchDate_A1851(String fech) throws Exception {
    
        boolean existe = false;
        PreparedStatement cstmt = null;
        Connection cnx = null;
        ResultSet rst = null;
        
//        String SQLCLL03 = "SELECT CCUST FROM PRAXIS.TEMP_GG_A1851 WHERE SUBSTR(FINVOIC,1,4) = ? LIMIT 1 ";
        String SQLCLL03 = "SELECT CCUST FROM PRAXIS.A1851 WHERE SUBSTR(FINVOIC,1,4) = ? LIMIT 1 ";
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareStatement(SQLCLL03);
            
            cstmt.setString(1, fech);
            cstmt.execute();
            
            rst = cstmt.getResultSet();
            if(rst.next()){
                existe = true;
            }
        }
        catch (SQLException e) {
            e.printStackTrace();
        }
        catch (Exception e2) {
            System.out.println("Error: " + e2);
        }
        return existe;
        
    }
    
    public boolean insert_A1851(List<A1851> lstRtn, String strFechDuplicat) throws SQLException, Exception {

        boolean loadOk = false;
        boolean deleteOk = false;
        
        Connection cnx = null;
        CallableStatement cstmt = null;
        PreparedStatement pstmt = null;
        Statement stmt = null;
        
        try {
            try {
                if(!strFechDuplicat.equals("")){
                    // BORRAR
//                    String SQL_DELETE = "DELETE " + session.getMainLibrary() + ".TEMP_GG_A1851 WHERE CCUST = ? AND SUBSTR(FINVOIC,1,4) = ?";
                    String SQL_DELETE = "DELETE " + session.getMainLibrary() + ".A1851 WHERE CCUST = ? AND SUBSTR(FINVOIC,1,4) = ?";

                    pstmt = session.getCNXIBMDB2().getIBMDB2Connection().prepareStatement(SQL_DELETE);

                    pstmt.setString(1, session.getUserView().getCustomerInfo().CCUST.trim());
                    pstmt.setString(2, strFechDuplicat);
                    pstmt.executeUpdate();
                    
                    deleteOk = true;
                }
            } finally {
                if (pstmt != null) {
                    pstmt.close();
                }
                // =================
                pasarGarbageCollector();
                session.getCNXIBMDB2().close();
            }
            
            if( (strFechDuplicat.equals("") && deleteOk == false) || (!strFechDuplicat.equals("") && deleteOk == true) ){
                String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04317(?,?,?,?,?,?,?,?,?,?,?,?,?)}";

                cnx = session.getCNXIBMDB2().getIBMDB2Connection();
                cstmt = cnx.prepareCall(SQLCLL01);

                for (int i = 0; i < lstRtn.size(); ++i) {
                    A1851 item = lstRtn.get(i);

                    cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST.trim());
                    cstmt.setString(2, item.FINVOIC);
                    cstmt.setString(3, item.PERIOD);
                    
                    cstmt.setString(4, item.DOENV);
                    cstmt.setString(5, item.TIMESI);

                    cstmt.setString(6, item.DCENV);
                    cstmt.setString(7, item.TIMESO);

                    cstmt.setString(8, item.DENVI);
                    cstmt.setString(9, item.TIMESE);
                    cstmt.setString(10,"1");
                    cstmt.setString(11, session.getUserView().getUserInfo().USR);
                    cstmt.setString(12, Functions.getFechaActual());
                    cstmt.setString(13, Functions.getHoraActual());
                    cstmt.execute();
                }

                loadOk = true;
            }


        } catch (Exception e) {
            e.printStackTrace();
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

        return loadOk;
    }
    
    
    
    public boolean insert_A1851_BK(List<A1851> lstRtn, String flagDupli) throws SQLException, Exception {

        PreparedStatement cstmt = null;
        boolean loadOk = false;
        Connection cnx = null;
        
        //        String SQLCLL04 = " INSERT INTO PRAXIS.A1851(CCUST, FINVOIC, PERIO, DOENV, TIMESI, DCENV, TIMESO, DENVI, TIMESE, USCR, FECR, HOCR) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)";
        String SQLCLL01 = " INSERT INTO PRAXIS.TEMP_GG_A1851(CCUST, FINVOIC, PERIO, DOENV, TIMESI, DCENV, TIMESO, DENVI, TIMESE, USCR, FECR, HOCR) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)";
        
        try {
            
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareStatement(SQLCLL01);
            
            for (int i = 0; i < lstRtn.size(); ++i) {
                A1851 item = lstRtn.get(i);
            
                cstmt.setString(1, "139");
                cstmt.setString(2, item.FINVOIC);
                cstmt.setString(3, item.PERIOD);
                
                cstmt.setString(4, item.DOENV);
                cstmt.setString(5, item.TIMESI);
                
                cstmt.setString(6, item.DCENV);
                cstmt.setString(7, item.TIMESO);
                
                cstmt.setString(8, item.DENVI);
                cstmt.setString(9, item.TIMESE);
            
                cstmt.setString(10, "SAP43");
                cstmt.setString(11, Functions.getFechaActual());
                cstmt.setString(12, Functions.getHoraActual());
                cstmt.execute();
            }
            
            loadOk = true;


        } catch (Exception e) {
            e.printStackTrace();
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

        return loadOk;
    }
    
    
    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }
}
