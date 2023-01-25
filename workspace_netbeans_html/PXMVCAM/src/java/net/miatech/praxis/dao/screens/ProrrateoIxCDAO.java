package net.miatech.praxis.dao.screens;

//<editor-fold defaultstate="collapsed" desc="import">
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import net.miatech.beans.A020Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.libmiatec.A729;
import net.miatech.praxis.flown.A728;
import org.apache.log4j.Logger;

//</editor-fold>

/**
 *
 * @author gsanchez
 */
public class ProrrateoIxCDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public ProrrateoIxCDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public ProrrateoIxCDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
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

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP0074_1(?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, session.getUserView().getCustomerInfoComplete().fileA005.A005KEY1);
            cstmt.setString(3, filter.strTicket.trim().replace(" ", "").replace(" ", ""));
            cstmt.setString(4, filter.A020NROPRT);
            cstmt.setString(5, filter.A020FVLO.replace("-", "").replace("-", ""));
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
                data.DES_BAIR = rst.getString("DES_BAIR").trim();
                data.A050OVRAMT = rst.getDouble("A050OVRAMT");
                data.A050OVRISC = rst.getDouble("A050OVRISC");
                data.A020SUFECH = rst.getString("DES_BAIR").trim();

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
                        if (hmAMTV.containsKey("A" + rst.getString("A728ACUCO1").substring(9, 10))) {
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
    
    public List<A729> loadPX164SQP0076(A020Filter filter) throws SQLException, Exception {

        //NOTA: MODIFICAR EL PROCEDURE PORQUE SÓLO TRAE LOS PRIMEROS 4 TAXES
        List<A729> lstTaxes = new ArrayList<A729>();
        A729 tax;
        String uso = filter.A020TUSO.trim();
        if (uso.equals("")) {
            uso = "01";
        }
        //int cantTaxes = 0;
        //Para comprobar que taxes no se repitan (debido al nombre)
        HashMap<String, String> hmTaxes = new HashMap<String, String>();

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP0076(?,?,?,?,?,?)}";
        Connection cnx = null;
        try {

            //==================================================================
            String strNroprt = "";
            /* if (filter.A020NROPRT.trim().length() == 0) {
             strNroprt = filter.strTicket.trim().substring(3, 13);
             } else if (filter.A020NROPRT.trim().length() == 9) {
             strNroprt = "0" + filter.A020NROPRT.trim();
             } else {
             strNroprt = filter.A020NROPRT.trim();
             }*/
            //==================================================================
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);
            cstmt.registerOutParameter(6, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, filter.strTicket.trim().substring(0, 3));
            cstmt.setString(3, filter.strTicket.trim().substring(3, 13));//strNroprt SIN CUPON
            cstmt.setString(4, filter.strTicket.trim().substring(13));//CUPON
            //cstmt.setString(5, "01");//USO
            cstmt.setString(5, uso);//USO
            cstmt.setInt(6, 0);
            cstmt.execute();

            //cantTaxes = cstmt.getInt(5);

            rst = cstmt.getResultSet();

            while (rst.next()) {

                tax = new A729();
                tax.A729CODTAX = rst.getString("A729CODTAX").trim();
                tax.A729TAXRES = rst.getDouble("A729TAXRES");
                tax.A729MDARES = rst.getString("A729MDARES").trim();
                tax.strNombre = rst.getString("A1202TNAME").trim();
                tax.A729VALTAX = rst.getDouble("A729VALTAX");

                if (!hmTaxes.containsKey(rst.getString("A729CODTAX").trim())) {
                    lstTaxes.add(tax);
                    hmTaxes.put(rst.getString("A729CODTAX").trim(), rst.getString("A729CODTAX").trim());
                }
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

        return lstTaxes;
    }
    
    public String CAMBIAR_USO(String uso, String tkt) throws SQLException, Exception {

        //REALIZA EL INSERT, UPDATE O DELETE DE UN REGISTRO EN LA TABLA A1849.
        String strMsj = "An Unexpected Error Ocurred.";
        //String strMsj = "Operation was successful.";

        CallableStatement cstmt = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".CAMBIAR_USO(?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(7, Types.VARCHAR);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, tkt.substring(0, 3));//CIA
            cstmt.setString(3, tkt.substring(3, 7));//FORMA
            cstmt.setString(4, tkt.substring(7, 13));//SERIE
            cstmt.setString(5, tkt.substring(13, 14));//CUPON
            cstmt.setString(6, uso);
            cstmt.setString(7, "");
            cstmt.execute();

            strMsj = cstmt.getString(7);

        } catch (Exception e) {
            strMsj = "Error : " + strMsj + " - " + e.getMessage();
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
}
