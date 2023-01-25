package net.miatech.praxis.dao.flown;

// <editor-fold defaultstate="collapsed" desc="import">
import static com.ibm.as400.data.PcmlMessageLog.logError;
import static com.ibm.as400.data.PcmlMessageLog.logError;
import static com.sun.corba.se.impl.activation.ServerMain.logError;
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
import net.miatech.beans.A1691Filter;
import net.miatech.beans.A1692Filter;
import net.miatech.beans.A1691Filter2;
import net.miatech.beans.A3729Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.A2149;
import net.miatech.praxis.exceptions.SpringException;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

// </editor-fold>
/**
 *
 * @author gsanchezs Modificado por Luis Zambrano
 */
public class FlightConciliationDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private String strSQL;
    private static final Logger logError = Logger.getLogger("errorLog");

    public FlightConciliationDAO() {
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A1691Filter> loadPX095S01A1691(A1691Filter filter) throws SQLException, Exception {
        List<A1691Filter> lstCons = new ArrayList<>(0);
        A1691Filter beanCons;
        String strFecha = "", NFLIGHT = filter.NFLIGHT.trim(); //YYYYMM
        int QPEND = 0, QPRO = 0, QCLO = 0, QSSIM = 0, QODS = 0, QVCR = 0, QPHY = 0, QtyCANCEL = 0;
        int QSVOPRO = 0, QSVOPEND = 0, QSVVPRO = 0, QSVVPEND = 0, QFFLOW = 0;

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

        try {
            strSQL = "{CALL " + session.getMainLibrary() + ".PX095S01A1691(?,?,?,?,?,?,?)}";

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(strSQL);

            cs.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cs.setString(2, filter.yearFrom + filter.monthFrom + filter.dayFrom);
            cs.setString(3, filter.yearTo + filter.monthTo + filter.dayTo);
            cs.setString(4, filter.CARRI.trim());
            cs.setString(5, filter.FFLOW.trim());
            cs.setString(6, NFLIGHT);
            cs.setString(7, Functions.getFechaActual());
            cs.execute();

            rst = cs.getResultSet();
            while (rst.next()) {
                if (!strFecha.equals("") && !strFecha.equals(rst.getString("DATE").trim())) {

                    beanCons = new A1691Filter();
                    beanCons.yearFrom = filter.yearFrom;
                    beanCons.monthFrom = filter.monthFrom;
                    beanCons.dayFrom = filter.dayFrom;
                    beanCons.yearTo = filter.yearTo;
                    beanCons.monthTo = filter.monthTo;
                    beanCons.dayTo = filter.dayTo;
                    beanCons.CARRI = filter.CARRI;
                    beanCons.FFLOW = filter.FFLOW;

                    beanCons.DFLIGHT = strFecha;
                    beanCons.NFLIGHT = NFLIGHT;
                    beanCons.strFormatDate = Functions.getMonthConvert(strFecha);
                    beanCons.lngQSSIM = QSSIM;
                    beanCons.lngQODS = QODS;
                    beanCons.lngQtyCANCEL = QtyCANCEL;
                    beanCons.lngQVCR = QVCR;
                    beanCons.lngQPRO = QPEND;
                    beanCons.lngQCLO = QPRO;
                    beanCons.lngQACC = QCLO;
                    beanCons.lngQSVOPRO = QSVOPRO;
                    beanCons.lngQSVOPEND = QSVOPEND;
                    beanCons.lngQSVVPRO = QSVVPRO;
                    beanCons.lngQSVVPEND = QSVVPEND;
                    beanCons.lngQPHY = QPHY;
                    beanCons.lngQFFLOW = QFFLOW;
                    lstCons.add(beanCons);
                    QSSIM = 0;
                    QODS = 0;
                    QtyCANCEL = 0;
                    QVCR = 0;
                    QPRO = 0;
                    QPEND = 0;
                    QCLO = 0;
                    QSVOPRO = 0;
                    QSVOPEND = 0;
                    QSVVPRO = 0;
                    QSVVPEND = 0;
                    QPHY = 0;
                    QFFLOW = 0;
                }

                strFecha = rst.getString("DATE").trim();

                if (rst.getInt("STVAL") == 3 && rst.getString("FMULTI").equals("L")) {
                    //Cerrado MATCH (En grilla 'Procesado')
                    QPRO += rst.getLong("QREC");
                    /*if (!rst.getString("FSTAPO").trim().equals("3")) {
                     QPRO += rst.getLong("QREC");
                     }
                     //Cerrado & Contabilizado (En grilla 'Cerrado') Sólo si el vuelo está cerrado y el Flag de contabilizado está cerrado
                     if (rst.getString("FSTAPO").trim().equals("3")) {
                     QCLO += rst.getLong("QREC");
                     }*/
                } else if (rst.getInt("STVAL") == 4 && rst.getString("FMULTI").equals("L")) {
                    //Cerrado (En grilla 'Cerrado') 
                    QCLO += rst.getLong("QREC");
                } else //Procesado (En grilla 'Pendiente') Sólo si ha llegado ODS o VCR y no es StandBy(STVAL!=1)
                {
                    if (rst.getInt("STVAL") != 3 && rst.getInt("STVAL") != 4 && rst.getString("FMULTI").equals("L") && rst.getInt("STVAL") != 1) {
                        if (rst.getString("FSTAOD").trim().equals("1") || rst.getString("FSTAVC").trim().equals("1")) {
                            QPEND += rst.getLong("QREC");
                        }
                    }
                }
                //Status SSIM
                if (rst.getString("FSTASS").trim().equals("1")) {
                    QSSIM += rst.getLong("QREC");
                    //SSIM vs ODS
                    if (rst.getString("FSTAOD").trim().equals("1")) {
                        QSVOPRO += rst.getLong("QREC");
                    } else {
                        QSVOPEND += rst.getLong("QREC");
                    }
                    //SSIM vs VCR
                    if (rst.getString("FSTAVC").trim().equals("1")) {
                        QSVVPRO += rst.getLong("QREC");
                    } else if (rst.getString("STVAL").trim().equals("1")) {
                        QSVVPEND += rst.getLong("QREC");
                    }
                }
                //Status ODS
                if (rst.getString("FSTAOD").trim().equals("1")) {
                    QODS += rst.getLong("QREC");
                }
                if (rst.getString("STVAL").trim().equals("5") || rst.getString("FSTAOD").equals("3")) {
                    QtyCANCEL += rst.getLong("QtyCANCEL");
                }
                //Status VCR
                if (rst.getString("FSTAVC").trim().equals("1")) {
                    QVCR += rst.getLong("QREC");
                }
                //Status PHY
                if (rst.getString("FSTAFI").trim().equals("1")) {
                    QPHY += rst.getLong("QREC");
                }
                //Status FFLOW
                if (rst.getString("FFLOW").trim().equals("U")) {
                    QFFLOW += rst.getLong("QREC");
                }
            }

            if (!strFecha.equals("")) {
                beanCons = new A1691Filter();
                beanCons.yearFrom = filter.yearFrom;
                beanCons.monthFrom = filter.monthFrom;
                beanCons.dayFrom = filter.dayFrom;
                beanCons.yearTo = filter.yearTo;
                beanCons.monthTo = filter.monthTo;
                beanCons.dayTo = filter.dayTo;
                beanCons.CARRI = filter.CARRI;
                beanCons.FFLOW = filter.FFLOW;

                beanCons.DFLIGHT = strFecha;
                beanCons.NFLIGHT = NFLIGHT;
                beanCons.strFormatDate = Functions.getMonthConvert(strFecha);
                beanCons.lngQSSIM = QSSIM;
                beanCons.lngQODS = QODS;
                beanCons.lngQtyCANCEL = QtyCANCEL;
                beanCons.lngQVCR = QVCR;
                beanCons.lngQPRO = QPEND;
                beanCons.lngQCLO = QPRO;
                beanCons.lngQACC = QCLO;
                beanCons.lngQSVOPRO = QSVOPRO;
                beanCons.lngQSVOPEND = QSVOPEND;
                beanCons.lngQSVVPRO = QSVVPRO;
                beanCons.lngQSVVPEND = QSVVPEND;
                beanCons.lngQPHY = QPHY;
                beanCons.lngQFFLOW = QFFLOW;
                lstCons.add(beanCons);
            }
        } finally {
            setClose();
        }

        return lstCons;
    }

    public List<A1692Filter> loadPX095S09A1692(A1691Filter filter, HashMap<String, String> hmAeropuertos) throws SQLException, Exception {

        List<A1692Filter> lstRtn = new ArrayList<>(0);
        A1692Filter objRtn;

        try {
            //PX09500012
            strSQL = "{CALL " + session.getMainLibrary() + ".PX095S09A1692(?,?,?,?,?)}";

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(strSQL);

            cs.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cs.setString(2, filter.IN_TKT.substring(0, 3));//CIA
            cs.setString(3, filter.IN_TKT.substring(3, 7));//FORMA
            cs.setString(4, filter.IN_TKT.substring(7, 13));//SERIE
            cs.setString(5, filter.IN_SEQRO);

            cs.execute();

            rst = cs.getResultSet();
            while (rst.next()) {
                objRtn = new A1692Filter();
                objRtn.QTYPAX = rst.getInt("QTYPAX");
                objRtn.CCIA = rst.getString("CCIA").trim();
                objRtn.FORMA = rst.getString("FORMA").trim();
                objRtn.SERIE = rst.getString("SERIE").trim();
                objRtn.CUPON = rst.getString("CUPON").trim();
                objRtn.SEQRO = rst.getString("SEQRO").trim();
                objRtn.SEQ = rst.getString("SEQ").trim();
                objRtn.strTicket = rst.getString("CCIA").trim() + " " + rst.getString("FORMA").trim() + rst.getString("SERIE").trim() + " " + rst.getString("CUPON").trim();
                objRtn.FCONT = rst.getString("FCONT").trim();
                objRtn.strFormatDate2 = Functions.getMonthConvert(objRtn.FCONT);
                objRtn.CDEPART = rst.getString("CDEPART").trim();
                objRtn.CARRIVA = rst.getString("CARRIVA").trim();
                if (hmAeropuertos.containsKey(rst.getString("CDEPART").trim().toUpperCase())) {
                    objRtn.strDescCDEPART = hmAeropuertos.get(rst.getString("CDEPART").trim()).toString();
                }
                if (hmAeropuertos.containsKey(rst.getString("CARRIVA").trim().toUpperCase())) {
                    objRtn.strDescCARRIVA = hmAeropuertos.get(rst.getString("CARRIVA").trim()).toString();
                }
                objRtn.CLAS = rst.getString("CLAS");
                objRtn.IDCON = rst.getString("IDCON").trim();
                objRtn.FBASE = rst.getString("FBASE").trim();
                objRtn.NFLIGHT = rst.getString("NFLIGHT").trim();
                objRtn.DFLIGHT = rst.getString("DFLIGHT").trim();
                objRtn.LEGSEQ = rst.getString("LEGSEQ").trim();
                objRtn.strFormatDate = Functions.getMonthConvert(objRtn.DFLIGHT);
                objRtn.TDOC = rst.getString("TDOC").trim();
                objRtn.PSVVTA = rst.getString("PSVVTA").trim();
                objRtn.AGTIA = rst.getString("AGTIA").trim();
                objRtn.FVTA = rst.getString("FVTA").trim();
                if (rst.getString("FLOAD").trim().equals("2")) {
                    objRtn.FLOAD = "OCR";
                } else if (rst.getString("FLOAD").trim().equals("3")) {
                    objRtn.FLOAD = "VCR";
                } else if (rst.getString("FLOAD").trim().equals("4")) {
                    objRtn.FLOAD = "FIM";
                } else if (rst.getString("FLOAD").trim().equals("M")) {
                    objRtn.FLOAD = "MANUAL";
                } else {
                    objRtn.FLOAD = rst.getString("FLOAD").trim();
                }
                objRtn.strFormatFVTA = Functions.getMonthConvert(rst.getString("FVTA").trim());
                objRtn.TOPUS = rst.getString("TOPUS").trim();
                objRtn.CARR = rst.getString("CARR").trim();
                objRtn.CABI = rst.getString("CABI").trim();
                objRtn.FECVAL = rst.getString("FECVAL").trim();
                objRtn.strFormatFECVAL = Functions.getMonthConvert(rst.getString("FECVAL").trim());
                objRtn.MDACP = rst.getString("MDACP").trim();
                objRtn.VCPMX = rst.getDouble("VCPMX");
                objRtn.TCMUS = rst.getDouble("TCMUS");
                objRtn.VCPUS = rst.getDouble("VCPUS");
                objRtn.FVAL = rst.getString("FVAL");
                objRtn.VCPN = rst.getDouble("VCPN");
                if (objRtn.FVAL.equals("1")) {
                    objRtn.strDescFVAL = "ISR Values/Sales";
                } else if (objRtn.FVAL.equals("2")) {
                    objRtn.strDescFVAL = "Average Value";
                    objRtn.VCPN = rst.getDouble("VCPMX");
                } else if (objRtn.FVAL.equals("3")) {
                    objRtn.strDescFVAL = "VTR";
                } else if (objRtn.FVAL.equals("4")) {
                    objRtn.strDescFVAL = "Manual Value";
                }
                objRtn.STCON = rst.getString("STCON");
                if (objRtn.STCON.equals("1")) {
                    objRtn.strDescSTCON = "Contabilizado.";
                } else if (objRtn.STCON.equals("2")) {
                    objRtn.strDescSTCON = "Contabilizado Provisión.";
                } else if (objRtn.STCON.equals("3")) {
                    objRtn.strDescSTCON = "Extorno.";
                } else if (objRtn.STCON.equals("4")) {
                    objRtn.strDescSTCON = "Extorno contabilizado.";
                } else if (objRtn.STCON.equals("5")) {
                    objRtn.strDescSTCON = "VTR.";
                } else if (objRtn.STCON.equals("6")) {
                    objRtn.strDescSTCON = "GL 5D.";
                }

                lstRtn.add(objRtn);
            }
        } catch (Exception e) {
            e.getMessage();
        } finally {
            setClose();
        }

        return lstRtn;
    }

    public List<A1691Filter2> loadPX095S02A1691(A1691Filter2 filter, String strTipo, HashMap<String, String> hmAeropuertos, String f_Diff) throws SQLException, Exception {
        List<A1691Filter2> lstCons = new ArrayList<>(0);
        A1691Filter2 beanCons;
        String strDesc = "";
        long QCPNOD = 0, QCPNVC = 0, QCPAD = 0, QCPCHD = 0, QCPINF = 0, QCPTRA = 0, QCPNOCR = 0, QCPNMA = 0, QCPNTOT = 0, QCPNLEG = 0, QCPNVAL = 0, DIFFODSVCR = 0;
        int QCPNFI = 0, QCPNFRE = 0;
        if (strTipo.equals("QPRO")) {
            strDesc = " Detail of Quantity Pending";
        } else if (strTipo.equals("QCLO")) {
            strDesc = " Detail of Quantity Processed";
        } else if (strTipo.equals("QACC")) {
            strDesc = " Flights Closed";
        } else if (strTipo.equals("QSSIM")) {
            strDesc = " Detail of SSIM File";
        } else if (strTipo.equals("QODS")) {
            strDesc = " Detail of ODS File";
        } else if (strTipo.equals("QVCR")) {
            strDesc = " Detail of VCR File";
        } else if (strTipo.equals("QPHY")) {
            strDesc = " Detail of Flight Manifest Envelope";
        } else if (strTipo.equals("QSVOPRO")) {
            strDesc = " Detail of SSIM vs ODS Processed";
        } else if (strTipo.equals("QSVOPEND")) {
            strDesc = " Detail of SSIM vs ODS Pending";
        } else if (strTipo.equals("QSVVPRO")) {
            strDesc = " Detail of SSIM vs VCR Processed";
        } else if (strTipo.equals("QSVVPEND")) {
            strDesc = " Detail of SSIM vs VCR Pending";
        } else if (strTipo.equals("QFFLOW")) {
            strDesc = " Detail of Unscheduled";
        } else if (strTipo.equals("QtyCANCEL")) {
            strDesc = " Detail of ODS File Cancelled";
        }

        try {
            //PX09500002
            strSQL = "{CALL " + session.getMainLibrary() + ".SQP04427(?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(strSQL);

            cs.registerOutParameter(11, Types.INTEGER);
            cs.registerOutParameter(12, Types.INTEGER);
            cs.registerOutParameter(13, Types.INTEGER);
            cs.registerOutParameter(14, Types.INTEGER);

            cs.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cs.setString(2, filter.yearFrom + filter.monthFrom + filter.dayFrom);
            cs.setString(3, filter.yearTo + filter.monthTo + filter.dayTo);
            cs.setString(4, filter.CARRI.trim());
            cs.setString(5, filter.FFLOW.trim());
            cs.setString(6, filter.DFLIGHT.substring(0, 6));
            cs.setString(7, strTipo);
            cs.setString(8, filter.NFLIGHT);
            cs.setString(9, filter.IN_OBS);
            cs.setString(10, f_Diff);
            cs.setInt(11, filter.page.PAGNUM);
            cs.setInt(12, filter.page.PAGROW);
            cs.setInt(13, filter.page.TOTPAG);
            cs.setInt(14, filter.page.TOTROW);
            cs.execute();

            filter.page.PAGNUM = cs.getInt(11);
            filter.page.PAGROW = cs.getInt(12);
            filter.page.TOTPAG = cs.getInt(13);
            filter.page.TOTROW = cs.getInt(14);

            rst = cs.getResultSet();
            while (rst.next()) {
                QCPNOD = rst.getLong("QCPNOD");
                QCPNVC = rst.getLong("QCPNVC");
                QCPNLEG = rst.getLong("QCPNLEG");
                QCPNOCR = rst.getLong("QCPNOCR");
                QCPNMA = rst.getLong("QCPNMA");
                QCPNTOT = rst.getLong("QCPNTOT");
                QCPNFI = rst.getInt("QCPNFI");
                QCPNFRE = rst.getInt("QCPNFRE");

                QCPAD = rst.getLong("QCPAD");
                QCPCHD = rst.getLong("QCPCHD");
                QCPINF = rst.getLong("QCPINF");
                QCPTRA = rst.getLong("QCPTRA");
                QCPNVAL = rst.getLong("QCPNVAL");

                DIFFODSVCR = QCPNOD - QCPNVC;
            }

            if (cs.getMoreResults()) {
                rst = cs.getResultSet();
                while (rst.next()) {
                    beanCons = new A1691Filter2();
                    beanCons.yearFrom = filter.yearFrom;
                    beanCons.monthFrom = filter.monthFrom;
                    beanCons.dayFrom = filter.dayFrom;
                    beanCons.yearTo = filter.yearTo;
                    beanCons.monthTo = filter.monthTo;
                    beanCons.dayTo = filter.dayTo;
                    beanCons.strSQL = strTipo;

                    beanCons.strDescripcion = strDesc;
                    beanCons.CARRI = rst.getString("CARRI").trim();
                    beanCons.DESCRIP = rst.getString("DESCRIP").trim();
                    beanCons.FCLOFO = rst.getString("FCLOFO");
                    if (rst.getString("FCLOFO").trim().equals("1")) {
                        beanCons.strFCLOFO = "AUTOMATIC";
                        beanCons.strDesFCLOFO = "FORCED AUTOMATIC";
                    } else if (rst.getString("FCLOFO").trim().equals("2")) {
                        beanCons.strFCLOFO = "MANUAL";
                        beanCons.strDesFCLOFO = "FORCED MANUAL";
                    } else {
                        beanCons.strFCLOFO = "";
                        beanCons.strDesFCLOFO = "";
                    }

                    beanCons.FFLOW = rst.getString("FFLOW").trim();
                    if (rst.getString("FFLOW").trim().equals("C")) {
                        beanCons.strDescFFLOW = "Charter";
                    } else if (rst.getString("FFLOW").trim().equals("X")) {
                        beanCons.strDescFFLOW = "Canceled";
                    } else if (rst.getString("FFLOW").trim().equals("U")) {
                        beanCons.strDescFFLOW = "Unscheduled";
                    } else if (rst.getString("FFLOW").trim().equals("P")) {
                        if (rst.getString("FMULTI").trim().equals("S")) {
                            beanCons.strDescFFLOW = "Leg";
                        } else {
                            beanCons.strDescFFLOW = "Scheduled";
                        }
                    } else {
                        beanCons.strDescFFLOW = "(None)";
                    }
                    beanCons.FSENDSS = rst.getString("FSENDSS").trim();
                    beanCons.strFormatFSENDSS = Functions.getMonthConvert(rst.getString("FSENDSS").trim());
                    beanCons.CDEPART = rst.getString("CDEPART").trim();
                    if (hmAeropuertos.containsKey(rst.getString("CDEPART").trim().toUpperCase())) {
                        beanCons.strDescCDEPART = hmAeropuertos.get(rst.getString("CDEPART").trim()).toString();
                    }
                    beanCons.CARRIVA = rst.getString("CARRIVA").trim();
                    if (hmAeropuertos.containsKey(rst.getString("CARRIVA").trim().toUpperCase())) {
                        beanCons.strDescCARRIVA = hmAeropuertos.get(rst.getString("CARRIVA").trim()).toString();
                    }
                    beanCons.NFLIGHT = rst.getString("NFLIGHT").trim();
                    beanCons.DFLIGHT = rst.getString("DFLIGHT").trim();
                    beanCons.FSENDFI = rst.getString("FSENDFI").trim();
                    beanCons.strFormatDate3 = Functions.getMonthConvert(beanCons.FSENDFI);
                    beanCons.LEGSEQ = rst.getString("LEGSEQ").trim();
                    beanCons.strFormatDate = Functions.getMonthConvert(beanCons.DFLIGHT);
                    beanCons.FSENDOD = rst.getString("FSENDOD").trim();
                    beanCons.strFormatFSENDOD = Functions.getMonthConvert(rst.getString("FSENDOD").trim());
                    beanCons.FSENDVC = rst.getString("FSENDVC").trim();
                    beanCons.strFormatFSENDVC = Functions.getMonthConvert(rst.getString("FSENDVC").trim());

                    beanCons.FOPERZUL = rst.getString("FOPERZUL");
                    beanCons.strFormatDate2 = Functions.getMonthConvert(beanCons.FOPERZUL);
                    beanCons.FMULTI = rst.getString("FMULTI").trim();
                    beanCons.QCPNOD = rst.getLong("QCPNOD");
                    beanCons.QCPNFI = rst.getInt("QCPNFI");
                    beanCons.QCPNFRE = rst.getInt("QCPNFRE");
                    beanCons.QCPNOCR = rst.getLong("QCPNOCR");
                    beanCons.QCPNVC = rst.getLong("QCPNVC");
                    beanCons.QCPNLEG = rst.getLong("QCPNLEG");
                    beanCons.QCPNMA = rst.getLong("QCPNMA");
                    beanCons.QCPNTOT = rst.getLong("QCPNTOT");
                    beanCons.QCPNVAL = rst.getLong("QCPNVAL");
                    beanCons.lngQDIFF = rst.getLong("QCPNTOT") - rst.getInt("QCPNFI");
                    beanCons.DIFFODSVCR = rst.getLong("QCPNOD") - rst.getInt("QCPNVC");

                    /*if(rst.getString("FMULTI").trim().equals("L")){
                     beanCons.lngQVCR = rst.getLong("QTOT");
                     }*/
                    beanCons.QCPAD = rst.getLong("QCPAD");
                    beanCons.QCPCHD = rst.getLong("QCPCHD");
                    beanCons.QCPINF = rst.getLong("QCPINF");
                    beanCons.QCPTRA = rst.getLong("QCPTRA");

                    beanCons.totQCPNOD = QCPNOD;
                    beanCons.totQCPNVC = QCPNVC;
                    beanCons.totQCPNLEG = QCPNLEG;
                    beanCons.totQCPNOCR = QCPNOCR;
                    beanCons.totQCPNMA = QCPNMA;
                    beanCons.totQCPNTOT = QCPNTOT;
                    beanCons.totQCPAD = QCPAD;
                    beanCons.totQCPCHD = QCPCHD;
                    beanCons.totQCPINF = QCPINF;
                    beanCons.totQCPTRA = QCPTRA;
                    beanCons.totQCPNFI = QCPNFI;
                    beanCons.totQCPNFRE = QCPNFRE;
                    beanCons.totQCPNVAL = QCPNVAL;
                    beanCons.totQCPNVAL = QCPNVAL;
                    beanCons.totDIFFODSVCR = DIFFODSVCR;

                    beanCons.totDiff = QCPNTOT - QCPNFI;

                    beanCons.page.PAGNUM = filter.page.PAGNUM;
                    beanCons.page.PAGROW = filter.page.PAGROW;
                    beanCons.page.TOTPAG = filter.page.TOTPAG;
                    beanCons.page.TOTROW = filter.page.TOTROW;

                    lstCons.add(beanCons);
                }
            }
        } finally {
            setClose();
        }

        return lstCons;
    }

    public List<A1691Filter> loadPX095S15A1691(A1691Filter filter) throws SQLException, Exception {
        List<A1691Filter> lstCons = new ArrayList<>(0);
        A1691Filter beanCons;
        long QCPNOD = 0, QCPNVC = 0, QCPAD = 0, QCPCHD = 0, QCPINF = 0, QCPTRA = 0, QCPNOCR = 0, QCPNMA = 0, QCPNTOT = 0;

        try {
            strSQL = "{CALL " + session.getMainLibrary() + ".PX095S15A1691(?,?,?,?,?,?,?,?,?,?,?)}";

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(strSQL);

            cs.registerOutParameter(8, Types.INTEGER);
            cs.registerOutParameter(9, Types.INTEGER);
            cs.registerOutParameter(10, Types.INTEGER);
            cs.registerOutParameter(11, Types.INTEGER);

            cs.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cs.setString(2, filter.CARRI);
            cs.setString(3, filter.FFLOW);
            cs.setString(4, filter.DFLIGHT);
            cs.setString(5, filter.FOPERZUL);
            cs.setString(6, filter.strSQL);//strTipo
            cs.setString(7, filter.NFLIGHT);
            cs.setInt(8, filter.page.PAGNUM);
            cs.setInt(9, filter.page.PAGROW);
            cs.setInt(10, filter.page.TOTPAG);
            cs.setInt(11, filter.page.TOTROW);
            cs.execute();

            filter.page.PAGNUM = cs.getInt(8);
            filter.page.PAGROW = cs.getInt(9);
            filter.page.TOTPAG = cs.getInt(10);
            filter.page.TOTROW = cs.getInt(11);

            rst = cs.getResultSet();
            while (rst.next()) {
                QCPNOD = rst.getLong("QCPNOD");
                QCPNVC = rst.getLong("QCPNVC");
                QCPNOCR = rst.getLong("QCPNOCR");
                QCPNMA = rst.getLong("QCPNMA");
                QCPNTOT = rst.getLong("QCPNTOT");

                QCPAD = rst.getLong("QCPAD");
                QCPCHD = rst.getLong("QCPCHD");
                QCPINF = rst.getLong("QCPINF");
                QCPTRA = rst.getLong("QCPTRA");
            }

            if (cs.getMoreResults()) {
                rst = cs.getResultSet();
                char a = ' ';

                while (rst.next()) {
                    beanCons = new A1691Filter();
                    beanCons.yearFrom = filter.yearFrom;
                    beanCons.monthFrom = filter.monthFrom;
                    beanCons.dayFrom = filter.dayFrom;
                    beanCons.yearTo = filter.yearTo;
                    beanCons.monthTo = filter.monthTo;
                    beanCons.dayTo = filter.dayTo;

                    beanCons.strDescripcion = filter.strDescripcion;
                    beanCons.CARRI = rst.getString("CARRI").trim();
                    beanCons.FCLOFO = rst.getString("FCLOFO");
                    switch (Integer.parseInt(Functions.fillZeros(1, rst.getString("FCLOFO").trim()))) {
                        case 1:
                            beanCons.strFCLOFO = "AUTOMATIC";
                            beanCons.strDesFCLOFO = "FORCED AUTOMATIC";
                            break;
                        case 2:
                            beanCons.strFCLOFO = "MANUAL";
                            beanCons.strDesFCLOFO = "FORCED MANUAL";
                            break;
                    }
                    /*if (rst.getString("FCLOFO").trim().equals("1")) {
                     beanCons.strFCLOFO = "AUTOMATIC";
                     beanCons.strDesFCLOFO = "FORCED AUTOMATIC";
                     } else if (rst.getString("FCLOFO").trim().equals("2")) {
                     beanCons.strFCLOFO = "MANUAL";
                     beanCons.strDesFCLOFO = "FORCED MANUAL";
                     } else {
                     beanCons.strFCLOFO = "";
                     beanCons.strDesFCLOFO = "";
                     }*/

                    beanCons.FFLOW = rst.getString("FFLOW").trim();
                    a = Functions.fillString(rst.getString("FFLOW").trim(), 1).charAt(0);
                    switch (a) {
                        case 'C':
                            beanCons.strDescFFLOW = "Charter";
                            break;
                        case 'X':
                            beanCons.strDescFFLOW = "Canceled";
                            break;
                        case 'U':
                            beanCons.strDescFFLOW = "Unscheduled";
                            break;
                        case 'P':
                            beanCons.strDescFFLOW = "Scheduled";
                            break;
                        default:
                            beanCons.strDescFFLOW = "(None)";
                            break;
                    }
                    /*if (rst.getString("FFLOW").trim().equals("C")) {
                     beanCons.strDescFFLOW = "Charter";
                     } else if (rst.getString("FFLOW").trim().equals("X")) {
                     beanCons.strDescFFLOW = "Canceled";
                     } else if (rst.getString("FFLOW").trim().equals("U")) {
                     beanCons.strDescFFLOW = "Unscheduled";
                     } else if (rst.getString("FFLOW").trim().equals("P")) {
                     beanCons.strDescFFLOW = "Scheduled";
                     } else {
                     beanCons.strDescFFLOW = "(None)";
                     }*/
                    beanCons.FSENDSS = rst.getString("FSENDSS").trim();
                    beanCons.strFormatFSENDSS = Functions.getMonthConvert(rst.getString("FSENDSS").trim());
                    beanCons.CDEPART = rst.getString("CDEPART").trim();
                    beanCons.strDescCDEPART = rst.getString("DES_CDEPART");
                    beanCons.CARRIVA = rst.getString("CARRIVA").trim();
                    beanCons.strDescCARRIVA = rst.getString("DES_CARRIVA");
                    beanCons.NFLIGHT = rst.getString("NFLIGHT").trim();
                    beanCons.DFLIGHT = rst.getString("DFLIGHT").trim();
                    beanCons.LEGSEQ = rst.getString("LEGSEQ").trim();
                    beanCons.strFormatDate = Functions.getMonthConvert(beanCons.DFLIGHT);
                    beanCons.FSENDOD = rst.getString("FSENDOD").trim();
                    beanCons.strFormatFSENDOD = Functions.getMonthConvert(rst.getString("FSENDOD").trim());
                    beanCons.FSENDVC = rst.getString("FSENDVC").trim();
                    beanCons.strFormatFSENDVC = Functions.getMonthConvert(rst.getString("FSENDVC").trim());

                    beanCons.FOPERZUL = rst.getString("FMULTI");//fmulti
                    beanCons.strFormatDate2 = Functions.getMonthConvert(rst.getString("FOPERZUL"));

                    beanCons.QCPNOD = rst.getLong("QCPNOD");
                    beanCons.QCPNOCR = rst.getLong("QCPNOCR");
                    beanCons.QCPNVC = rst.getLong("QCPNVC");
                    beanCons.QCPNMA = rst.getLong("QCPNMA");
                    beanCons.QCPNTOT = rst.getLong("QCPNTOT");
                    /*if(rst.getString("FMULTI").trim().equals("L")){
                     beanCons.lngQVCR = rst.getLong("QTOT");
                     }*/

                    beanCons.QCPAD = rst.getLong("QCPAD");
                    beanCons.QCPCHD = rst.getLong("QCPCHD");
                    beanCons.QCPINF = rst.getLong("QCPINF");
                    beanCons.QCPTRA = rst.getLong("QCPTRA");

                    beanCons.totQCPNOD = QCPNOD;
                    beanCons.totQCPNVC = QCPNVC;
                    beanCons.totQCPNOCR = QCPNOCR;
                    beanCons.totQCPNMA = QCPNMA;
                    beanCons.totQCPNTOT = QCPNTOT;
                    beanCons.totQCPAD = QCPAD;
                    beanCons.totQCPCHD = QCPCHD;
                    beanCons.totQCPINF = QCPINF;
                    beanCons.totQCPTRA = QCPTRA;

                    beanCons.page.PAGNUM = filter.page.PAGNUM;
                    beanCons.page.PAGROW = filter.page.PAGROW;
                    beanCons.page.TOTPAG = filter.page.TOTPAG;
                    beanCons.page.TOTROW = filter.page.TOTROW;

                    lstCons.add(beanCons);
                }
            }
        } finally {
            setClose();
        }

        return lstCons;
    }

    public List<A3729Filter> loadPX095SGGA3729(A3729Filter filter) throws SQLException, Exception {
        List<A3729Filter> lstCons = new ArrayList<>(0);
        A3729Filter beanCons;

        try {

            String strSQL = "{CALL " + session.getMainLibrary() + ".SQP04322(?,?,?,?,?,?)}";

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(strSQL);

            cs.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cs.setString(2, filter.DFLIGHT);
            cs.setString(3, filter.NFLIGHT);
            cs.setString(4, filter.IN_FSABRE);
            cs.setString(5, filter.CDEPART);
            cs.setString(6, "A3729");

            cs.execute();

            rst = cs.getResultSet();
            while (rst.next()) {

                beanCons = new A3729Filter();

                beanCons.RN = rst.getLong("RN");
                beanCons.CHAIR = rst.getString("CHAIR").trim();
                beanCons.strTicket = rst.getString("TICKET").trim();
//                beanCons.strTicket = rst.getString("CCIA").trim() + " " + rst.getString("FORMA").trim() + rst.getString("SERIE").trim();
//                beanCons.NPAX = rst.getString("NPAX").trim();
                beanCons.FNAME = rst.getString("FNAME").trim();
                beanCons.LNAME = rst.getString("LNAME").trim();
                beanCons.SEQ = rst.getString("SEQ").trim();
                beanCons.SPNR = rst.getString("SPNR").trim();
                beanCons.DFLIGHT = rst.getString("DFLIGHT").trim();
                beanCons.strFormatDate = Functions.getMonthConvert(beanCons.DFLIGHT);
//                beanCons.strDescripcion = Functions.getMonthConvert(beanCons.DFLIGHT);
                beanCons.NFLIGHT = rst.getString("NFLIGHT").trim();
                beanCons.CDEPART = rst.getString("CDEPART").trim();
                beanCons.CARRIVA = rst.getString("CARRIVA").trim();
                beanCons.STVAL = rst.getString("STVAL");
                if (rst.getString("STVAL").trim().equals("1")) {
                    beanCons.desSTVAL = "No conciliado";
                } else if (rst.getString("STVAL").trim().equals("0")) {
                    beanCons.desSTVAL = "Conciliado";
                }

                beanCons.FSABRE = rst.getString("FSABRE").trim();
                if (rst.getString("FSABRE").trim().equals("0")) {
                    beanCons.descFSABRE = "Not Found";
                } else if (rst.getString("FSABRE").trim().equals("1")) {
                    beanCons.descFSABRE = "Found";
                } else if (rst.getString("FSABRE").trim().equals("2")) {
                    beanCons.descFSABRE = "Found but not matching coupon";
                } else if (rst.getString("FSABRE").trim().equals("4")) {
                    beanCons.descFSABRE = "No Revenue(Employes/Oth)";
                } else if (rst.getString("FSABRE").trim().equals("5")) {
                    beanCons.descFSABRE = "Manual";
                } else if (rst.getString("FSABRE").trim().equals("6")) {
                    beanCons.descFSABRE = "BPO Found";
                }

                beanCons.STASABR = rst.getString("STASABR").trim();

                beanCons.FSALES = rst.getString("FSALES").trim();
                if (beanCons.FSALES.equals("0")) {
                    beanCons.descFSALES = "No existe";
                } else if (beanCons.FSALES.equals("1")) {
                    beanCons.descFSALES = "Existe";
                }

                beanCons.LNKMVLO = rst.getString("LNKMVLO").trim();
                beanCons.STVCR = rst.getString("STVCR").trim();

                if (rst.getString("STVCR").trim().equals("Y")) {
                    beanCons.desSTVCR = "Yes";
                } else if (rst.getString("STVCR").trim().equals("")) {
                    beanCons.desSTVCR = "";
                }

                beanCons.TPAX = rst.getString("TPAX").trim();
                beanCons.TPAX_V = rst.getString("TPAX_V").trim();

                if (!beanCons.TPAX_V.equals("")) {
                    beanCons.TPAX = beanCons.TPAX_V;
                }

                if (beanCons.TPAX.equals("A")) {
                    beanCons.desPAX = "Adult";
                } else if (beanCons.TPAX.equals("C")) {
                    beanCons.desPAX = "Children";
                } else if (beanCons.TPAX.equals("I")) {
                    beanCons.desPAX = "Infant";
                } else if (beanCons.TPAX.equals("INF")) {
                    beanCons.desPAX = "Infant";
                }

                beanCons.FA720 = rst.getString("FA720").trim();
//                if (rst.getString("FA720").trim().equals("")) {
//                    beanCons.descFSALES = "";
//                } else {
//                    beanCons.descFSALES = "Yes";
//                }

                beanCons.USCR = rst.getString("USCR").trim();
                beanCons.FECR = rst.getString("FECR").trim();
                beanCons.HOCR = rst.getString("HOCR").trim();
                beanCons.USUP = rst.getString("USUP").trim();
                beanCons.FEUP = rst.getString("FEUP").trim();
                beanCons.HOUP = rst.getString("HOUP").trim();

                lstCons.add(beanCons);

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

        return lstCons;
    }

    public List<A1692Filter> loadPX095S05A1692(A1691Filter2 filter, String strTipo, HashMap<String, String> hmPaises) throws SQLException, Exception {

        List<A1692Filter> lstCons = new ArrayList<>(0);
        A1692Filter beanTkt;
        HashMap hmEstado = new HashMap();
        hmEstado.put("0", "Hard Block");
        hmEstado.put("1", "Pending/Without Sale");
        hmEstado.put("2", "Valued");
        hmEstado.put("3", "Closed");
        int QTYPAX = 0;

        /*String carriva=filter.CARRIVA.trim();
         if(filter.strTitulo.equals("LEG")){
         filter.CARRIVA = ""; 
         }*/
        String cdepart = filter.CDEPART.trim();
        if (filter.strTitulo.equals("LEG")) {
            filter.CDEPART = "";
        }

        try {
            //PX09500003
//            strSQL = "{CALL " + session.getMainLibrary() + ".PX095S05A1692_1(?,?,?,?,?,?,?,?,?,?)}";
            strSQL = "{CALL " + session.getMainLibrary() + ".PX095S05A1692_1_G(?,?,?,?,?,?,?,?,?,?)}";

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(strSQL);

            cs.registerOutParameter(7, Types.INTEGER);
            cs.registerOutParameter(8, Types.INTEGER);
            cs.registerOutParameter(9, Types.INTEGER);
            cs.registerOutParameter(10, Types.INTEGER);

            cs.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cs.setString(2, filter.DFLIGHT.trim());
            cs.setString(3, filter.NFLIGHT.trim());
            cs.setString(4, filter.CDEPART.trim());
            cs.setString(5, filter.CARRIVA.trim());
            cs.setString(6, strTipo);
            cs.setInt(7, filter.page.PAGNUM);
            cs.setInt(8, filter.page.PAGROW);
            cs.setInt(9, filter.page.TOTPAG);
            cs.setInt(10, filter.page.TOTROW);
            cs.execute();

            filter.page.PAGNUM = cs.getInt(7);
            filter.page.PAGROW = cs.getInt(8);
            filter.page.TOTPAG = cs.getInt(9);
            filter.page.TOTROW = cs.getInt(10);

            rst = cs.getResultSet();
            while (rst.next()) {
                QTYPAX = rst.getInt("QTYPAX");
            }

            if (cs.getMoreResults()) {
                rst = cs.getResultSet();
                while (rst.next()) {
                    beanTkt = new A1692Filter();
                    beanTkt.QTYPAX = rst.getInt("QTYPAX");
                    beanTkt.totTAX = QTYPAX;
                    beanTkt.strDescripcion = filter.strTitulo;
                    beanTkt.strDescCDEPART = " - Departure: " + filter.CDEPART;
                    if (!filter.CARRIVA.trim().equals("")) {
                        beanTkt.strDescCARRIVA = " - Arrival: " + filter.CARRIVA;
                    }
                    beanTkt.FFLOW = rst.getString("FFLOW").trim();
                    if (rst.getString("FFLOW").trim().equals("P")) {
                        beanTkt.strFFLOW = "Scheduled";
                    } else if (rst.getString("FFLOW").trim().equals("C")) {
                        beanTkt.strFFLOW = "Charter";
                    } else if (rst.getString("FFLOW").trim().equals("X")) {
                        beanTkt.strFFLOW = "Canceled";
                    } else if (rst.getString("FFLOW").trim().equals("U")) {
                        beanTkt.strFFLOW = "Unscheduled";
                    }
                    beanTkt.CCIA = rst.getString("CCIA").trim();
                    beanTkt.FORMA = rst.getString("FORMA").trim();
                    beanTkt.SERIE = rst.getString("SERIE").trim();
                    beanTkt.CUPON = rst.getString("CUPON").trim();
                    beanTkt.SEQ = rst.getString("SEQ").trim();
                    beanTkt.strTicket = rst.getString("CCIA").trim() + " " + rst.getString("FORMA").trim() + rst.getString("SERIE").trim() + " " + rst.getString("CUPON").trim();
                    beanTkt.SEQRO = rst.getString("SEQRO").trim();
                    beanTkt.FCONT = rst.getString("FCONT").trim();
                    beanTkt.strFormatDate2 = Functions.getMonthConvert(beanTkt.FCONT);
                    beanTkt.CDEPART = rst.getString("CDEPART").trim();
                    beanTkt.CARRIVA = rst.getString("CARRIVA").trim();
                    if (filter.strTitulo.equals("LEG") && !cdepart.equals(beanTkt.CDEPART.trim())) {
                        beanTkt.strSQL = "verde";
                    }
                    beanTkt.NFLIGHT = rst.getString("NFLIGHT").trim();
                    beanTkt.DFLIGHT = rst.getString("DFLIGHT").trim();
                    beanTkt.LEGSEQ = rst.getString("LEGSEQ").trim();
                    beanTkt.strFormatDate = beanTkt.DFLIGHT.substring(0, 4) + "-" + beanTkt.DFLIGHT.substring(4, 6) + "-" + beanTkt.DFLIGHT.substring(6);
                    //beanTkt.TDOC = rst.getString("TDOC").trim();
                    beanTkt.FBASE = rst.getString("FBASE");
                    beanTkt.STVAL = rst.getString("STVAL");
                    if (hmEstado.containsKey(beanTkt.STVAL.trim())) {
                        beanTkt.strDescSTVAL = hmEstado.get(beanTkt.STVAL.trim()).toString();
                    }

                    beanTkt.FVAL = rst.getString("FVAL");
                    /*if (beanTkt.FVAL.equals("1")) {
                     beanTkt.strDescFVAL = "ISR Values";
                     } else if (beanTkt.FVAL.equals("2")) {
                     beanTkt.strDescFVAL = "Average RBD";
                     } else if (beanTkt.FVAL.equals("3")) {
                     beanTkt.strDescFVAL = "Average FARE BASIS";
                     } else if (beanTkt.FVAL.trim().equals("")) {
                     beanTkt.strDescFVAL = "Sale";
                     }*/
                    if (beanTkt.FVAL.equals("1")) {
                        beanTkt.strDescFVAL = "ISR Values/Sales";
                        beanTkt.VCPN = rst.getDouble("VCPN");
                        beanTkt.VCPN0 = rst.getDouble("VCPN0");
                        beanTkt.VCPN16 = rst.getDouble("VCPN16");
                    } else if (beanTkt.FVAL.equals("2")) {
                        beanTkt.strDescFVAL = "Average Value";
                        beanTkt.VCPN = rst.getDouble("VCPMX");
                        beanTkt.VCPN0 = rst.getDouble("VCPN0");
                        beanTkt.VCPN16 = rst.getDouble("VCPN16");
                    } else if (beanTkt.FVAL.equals("3")) {
                        beanTkt.strDescFVAL = "VTR";
                        beanTkt.VCPN = rst.getDouble("VCPN");
                        beanTkt.VCPN0 = rst.getDouble("VCPN0");
                        beanTkt.VCPN16 = rst.getDouble("VCPN16");
                    } else if (beanTkt.FVAL.equals("4")) {
                        beanTkt.strDescFVAL = "Manual Value";
                        beanTkt.VCPN = rst.getDouble("VCPN");
                        beanTkt.VCPN0 = rst.getDouble("VCPN0");
                        beanTkt.VCPN16 = rst.getDouble("VCPN16");
                    }

                    beanTkt.PSVVTA = rst.getString("PSVVTA").trim();
                    beanTkt.FTE = rst.getString("FTE").trim();
                    if (hmPaises.containsKey(rst.getString("PSVVTA").trim().toUpperCase())) {
                        beanTkt.strDescPSVVTA = hmPaises.get(rst.getString("PSVVTA").trim()).toString();
                    }
                    //beanTkt.AGTIA = rst.getString("AGTIA").trim();
                    beanTkt.FVTA = rst.getString("FVTA").trim();
                    beanTkt.strFormatFVTA = Functions.getMonthConvert(beanTkt.FVTA);
                    beanTkt.TOPUS = rst.getString("TOPUS").trim();
                    beanTkt.CARR = rst.getString("CARR").trim();
                    //beanTkt.CABI = rst.getString("CABI").trim();
                    beanTkt.CLAS = rst.getString("CLAS").trim();

                    beanTkt.COMISI = rst.getDouble("COMISI");
                    beanTkt.MDACP = rst.getString("MDACP").trim();
                    beanTkt.VCPMX = rst.getDouble("VCPMX");
                    beanTkt.TCMUS = rst.getDouble("TCMUS");
                    beanTkt.VCPUS = rst.getDouble("VCPUS");

                    if (rst.getString("FILENAME") != null
                            && !rst.getString("FILENAME").trim().equals("-")) {
                        beanTkt.FILENAME = rst.getString("FILENAME").trim();
                    }
                    beanTkt.strFCON = Functions.getMonthConvert(beanTkt.FCONT);

                    beanTkt.STCON = rst.getString("STCON").trim();
                    if (beanTkt.STCON.equals("1")) {
                        beanTkt.strDescSTCON = "Contabilizado";
                    } else if (beanTkt.STCON.equals("2")) {
                        beanTkt.strDescSTCON = "Contabilizado";
                    } else if (beanTkt.STCON.equals("3")) {
                        beanTkt.strDescSTCON = "Contabilizado";
                    } else if (beanTkt.STCON.equals("4")) {
                        beanTkt.strDescSTCON = "Contabilizado";
                    } else if (beanTkt.STCON.equals("5")) {
                        beanTkt.strDescSTCON = "Contabilizado";
                    } else if (beanTkt.STCON.equals("6")) {
                        beanTkt.strDescSTCON = "Contabilizado";
                    } else {
                        beanTkt.strDescSTCON = " ";
                    }

                    beanTkt.IDCON = rst.getString("IDCON").trim();
                    beanTkt.VYQ = rst.getDouble("VYQ");
                    beanTkt.VYQ0 = rst.getDouble("VYQ0");
                    beanTkt.VYQ16 = rst.getDouble("VYQ16");

                    beanTkt.page.PAGNUM = filter.page.PAGNUM;
                    beanTkt.page.PAGROW = filter.page.PAGROW;
                    beanTkt.page.TOTPAG = filter.page.TOTPAG;
                    beanTkt.page.TOTROW = filter.page.TOTROW;

                    lstCons.add(beanTkt);
                }
            }
        } finally {
            setClose();
        }

        return lstCons;
    }

    public A1691Filter loadPX095S04A1691(A1691Filter filter, HashMap<String, String> hmAeropuertos) throws SQLException, Exception {

        A1691Filter beanCons = new A1691Filter();

        try {
            //PX09500004
            strSQL = "{CALL " + session.getMainLibrary() + ".SQP04432(?,?,?,?,?,?,?)}";

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(strSQL);

            cs.registerOutParameter(6, Types.VARCHAR);
            cs.registerOutParameter(7, Types.VARCHAR);

            cs.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cs.setString(2, filter.DFLIGHT.trim());
            cs.setString(3, filter.NFLIGHT.trim());
            cs.setString(4, filter.CDEPART.trim());
            cs.setString(5, filter.CARRIVA.trim());

            cs.setString(6, "");
            cs.setString(7, "");
            cs.execute();

            rst = cs.getResultSet();
            if (rst.next()) {
                beanCons = new A1691Filter();
                beanCons.CCUST = rst.getString("CCUST").trim();
                beanCons.STVAL = rst.getString("STVAL").trim();
                beanCons.CARRI = rst.getString("CARRI").trim();
                beanCons.FFLOW = rst.getString("FFLOW").trim();
                beanCons.IN_CARRIER = session.getUserView().getCustomerInfo().USR.trim();
                //beanCons.TOPER = rst.getString("TOPER").trim();
                //Obteniendo el Tipo de Operacion ==============================
                if (cs.getString(6) != null) {
                    beanCons.TOPER = cs.getString(6).trim();
                }
                //Obteniendo Descripción ODS ===================================
                if (cs.getString(7) != null) {
                    beanCons.strDescripcion = cs.getString(7);
                }
                beanCons.FSENDSS = rst.getString("FSENDSS").trim();
                beanCons.CDEPART = rst.getString("CDEPART").trim();
                if (hmAeropuertos.containsKey(rst.getString("CDEPART").trim().toUpperCase())) {
                    beanCons.strDescCDEPART = hmAeropuertos.get(rst.getString("CDEPART").trim()).toString();
                }
                beanCons.CARRIVA = rst.getString("CARRIVA").trim();
                if (hmAeropuertos.containsKey(rst.getString("CARRIVA").trim().toUpperCase())) {
                    beanCons.strDescCARRIVA = hmAeropuertos.get(rst.getString("CARRIVA").trim()).toString();
                }
                beanCons.ZONE = rst.getString("ZONA").trim();
                beanCons.MINICONEC = rst.getString("MINICONEC").trim();
                beanCons.LEGSEQ = rst.getString("LEGSEQ").trim();
                beanCons.NFLIGHT = rst.getString("NFLIGHT").trim();
                beanCons.DFLIGHT = rst.getString("DFLIGHT").trim();
                beanCons.NPLANE = rst.getString("NPLANE").trim();
                beanCons.FSTASS = rst.getString("FSTASS").trim();
                beanCons.LOCDEP = rst.getString("LOCDEP");
                beanCons.LOCARR = rst.getString("LOCARR");
                beanCons.UTCDEP = rst.getString("UTCDEP");
                beanCons.UTCARR = rst.getString("UTCARR");
                beanCons.FMULTI = rst.getString("FMULTI");

                beanCons.FOPERZUL = rst.getString("FOPERZUL").trim();
                beanCons.FSENDOD = rst.getString("FSENDOD").trim();
                beanCons.QCPNOD = rst.getLong("QCPNOD");
                beanCons.FSTAOD = rst.getString("FSTAOD").trim();
                beanCons.FSENDVC = rst.getString("FSENDVC").trim();
                beanCons.FSTAVC = rst.getString("FSTAVC").trim();
                beanCons.QCPNVC = rst.getLong("QCPNVC");
                beanCons.QCPNMA = rst.getLong("QCPNMA");
                beanCons.QCPNTOT = rst.getLong("QCPNTOT");
                beanCons.QCPNOCR = rst.getLong("QCPNOCR");
                beanCons.QCPNON = rst.getLong("QCPNON");
                beanCons.QCPNOAL = rst.getLong("QCPNOAL");
                beanCons.QCPHARB = rst.getLong("QCPHARB");
                beanCons.QCPCFRE = rst.getLong("QCPNFRE");
                beanCons.QCPCABY = rst.getLong("QCPCABY");
                beanCons.QCPCABF = rst.getLong("QCPCABF");
                beanCons.QCPAD = rst.getLong("QCPAD");
                beanCons.QCPCHD = rst.getLong("QCPCHD");
                beanCons.QCPINF = rst.getLong("QCPINF");
                beanCons.QCPTRA = rst.getLong("QCPTRA");
                beanCons.FCLOSE = rst.getString("FCLOSE").trim();
                beanCons.QCPNVAL = rst.getLong("QCPNVAL");
                beanCons.FSTAPO = rst.getString("FSTAPO").trim();
                beanCons.FSENDFI = rst.getString("FSENDFI").trim();
                beanCons.QCPNFI = rst.getInt("QCPNFI");
                beanCons.QCPNFRE = rst.getInt("QCPNFRE");
                beanCons.FSTAFI = rst.getString("FSTAFI").trim();
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

    public String loadPX095S08VALID(A1692Filter filter, String flag) throws SQLException, Exception {

        String msj = "";
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

        } finally {
            setClose();
        }

        return msj;
    }

    public String loadPX095S03A1691(A1691Filter filter, String strOption) throws SQLException {

        //REALIZA EL INSERT, UPDATE O DELETE DE UN REGISTRO EN LA TABLA A1691.
        String strMsj = "Operation was successful.";

        try {
            //PX09500006
            strSQL = "{CALL " + session.getMainLibrary() + ".SQP04413(?,?,?,?,?,?,?,?,?,?"
                    + ",?,?,?,?,?,?,?,?,?,?"
                    + ",?,?,?,?,?,?,?,?,?,?"
                    + ",?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(strSQL);

            cs.setString(1, strOption.trim());
            cs.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cs.setString(3, filter.STVAL.trim());
            cs.setString(4, filter.CARRI.trim());
            cs.setString(5, filter.FFLOW.trim());
            cs.setString(6, filter.TOPER.trim());
            cs.setString(7, filter.FSENDSS.trim());
            cs.setString(8, filter.CDEPART.trim());
            cs.setString(9, filter.CARRIVA.trim());
            cs.setString(10, filter.ZONE.trim());
            cs.setString(11, filter.MINICONEC.trim());
            cs.setString(12, filter.LEGSEQ.trim());
            cs.setString(13, filter.NFLIGHT.trim());
            cs.setString(14, filter.DFLIGHT.trim());
            cs.setString(15, filter.NPLANE.trim());
            cs.setString(16, filter.FSTASS.trim());
            cs.setString(17, filter.FSENDOD.trim());
            cs.setInt(18, Integer.parseInt(String.valueOf(filter.QCPNOD)));
            cs.setString(19, filter.FSTAOD.trim());
            cs.setString(20, filter.FSENDVC.trim());
            cs.setString(21, filter.FSTAVC.trim());
            cs.setInt(22, Integer.parseInt(String.valueOf(filter.QCPNVC)));
            cs.setInt(23, Integer.parseInt(String.valueOf(filter.QCPNMA)));
            cs.setInt(24, Integer.parseInt(String.valueOf(filter.QCPNTOT)));
            cs.setInt(25, Integer.parseInt(String.valueOf(filter.QCPNOAL)));
            cs.setInt(26, Integer.parseInt(String.valueOf(filter.QCPHARB)));
            cs.setString(27, filter.FSENDFI.trim());
            cs.setInt(28, filter.QCPNFI);
            cs.setInt(29, filter.QCPNFRE);
            cs.setString(30, filter.FSTAFI.trim());
            cs.setString(31, filter.FSTAPO.trim());
            cs.setString(32, filter.LOCDEP);
            cs.setString(33, filter.LOCARR);
            cs.setString(34, filter.UTCDEP);
            cs.setString(35, filter.UTCARR);
            cs.setString(36, session.getUserView().getCustomerInfo().USR.trim());
            cs.setString(37, Functions.getFechaActual());
            cs.setString(38, Functions.getHoraActual());
            cs.setString(39, filter.FOPERZUL.trim());
            cs.setInt(40, Integer.parseInt(String.valueOf(filter.QCPTRA)));
            cs.setInt(41, Integer.parseInt(String.valueOf(filter.QCPAD)));
            cs.setInt(42, Integer.parseInt(String.valueOf(filter.QCPCHD)));
            cs.setInt(43, Integer.parseInt(String.valueOf(filter.QCPINF)));

            cs.setString(44, filter.strDescripcion);
            cs.setString(45, filter.FMULTI.trim());
            cs.execute();

        } catch (Exception e) {
            strMsj = e.getMessage();
            e.printStackTrace();
        } finally {
            setClose();
        }

        return strMsj;
    }

    public String loadPX095SQP04753(A3729Filter filter) throws SQLException {

        //REALIZA EL INSERT, UPDATE O DELETE DE UN REGISTRO EN LA TABLA A1691.
        String strMsj = "Operation was successful.";

        try {
            //PX09500006
            strSQL = "{CALL " + session.getMainLibrary() + ".SQP04753(?,?,?)}";

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(strSQL);

            cs.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cs.setString(2, filter.DFLIGHT);
            cs.setString(3, filter.NFLIGHT);
            
            cs.execute();

        } catch (Exception e) {
            strMsj = e.getMessage();
            e.printStackTrace();
        } finally {
            setClose();
        }

        return strMsj;
    }

    public A1692Filter loadPX095S06A1692(String strTicket, String strSeq, HashMap<String, String> hmAeropuertos, HashMap<String, String> hmPaises) throws SQLException, Exception {

        A1692Filter beanCons = new A1692Filter();

        int seq = 0;
        String Flag = "", tktpadre = "";

        //PX09500007
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX095S06A1692(?,?,?,?,?,?)}";//Schema
        try {

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(SQLCLL01);

            cs.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cs.setString(2, strTicket.substring(0, 3));
            cs.setString(3, strTicket.substring(3, 7));
            cs.setString(4, strTicket.substring(7, 13));
            cs.setString(5, strTicket.substring(13, 14));
            cs.setString(6, strSeq);
            cs.execute();

            rst = cs.getResultSet();

            if (rst.next()) {
                seq = rst.getInt("A720NSEQ");
                Flag = rst.getString("A720FLAG");
                tktpadre = rst.getString("A720CIAI") + rst.getString("A720FORMAI") + rst.getString("A720SERIEI");
            }
            rst.close();
            if (cs.getMoreResults()) {
                rst = cs.getResultSet();
                if (rst.next()) {
                    beanCons = new A1692Filter();
                    beanCons.monthTo = tktpadre;
                    beanCons.yearTo = Flag;
                    beanCons.CPN_Billed = seq;

                    if (rst.getString("STAT") != null && !rst.getString("STAT").trim().equals("-")) {
                        beanCons.strDescSTVAL = rst.getString("STAT").trim();
                    }
                    beanCons.CCUST = rst.getString("CCUST").trim();
                    beanCons.CCIA = rst.getString("CCIA").trim();
                    beanCons.FORMA = rst.getString("FORMA").trim();
                    beanCons.SERIE = rst.getString("SERIE").trim();
                    beanCons.CUPON = rst.getString("CUPON").trim();
                    beanCons.strTicket = rst.getString("CCIA").trim() + rst.getString("FORMA").trim() + rst.getString("SERIE").trim() + rst.getString("CUPON").trim();
                    beanCons.DCHEQ = rst.getString("DCHEQ").trim();
                    beanCons.SEQ = rst.getString("SEQ").trim();
                    beanCons.STVAL = rst.getString("STVAL").trim();
                    beanCons.FVAL = rst.getString("FVAL").trim();
                    beanCons.STCON = rst.getString("STCON").trim();
                    beanCons.FTE = rst.getString("FTE").trim();
                    beanCons.FLOAD = rst.getString("FLOAD").trim();
                    beanCons.FOPERZUL = rst.getString("FOPERZUL").trim();
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
                    beanCons.LEGSEQ = rst.getString("LEGSEQ").trim();
                    beanCons.NPLANE = rst.getString("NPLANE").trim();
                    beanCons.ZONA = rst.getString("ZONA").trim();
                    //beanCons.STORG = rst.getString("STORG").trim();
                    beanCons.CDOC = rst.getString("CDOC").trim();
                    beanCons.TDOC = rst.getString("TDOC").trim();
                    beanCons.PSVVTA = rst.getString("PSVVTA").trim();
                    if (hmPaises.containsKey(rst.getString("PSVVTA").trim().toUpperCase())) {
                        beanCons.strDescPSVVTA = hmPaises.get(rst.getString("PSVVTA").trim()).toString();
                    }
                    beanCons.AGTIA = rst.getString("AGTIA").trim();
                    beanCons.FVTA = rst.getString("FVTA").trim();
                    beanCons.TVTA = rst.getString("TVTA").trim();
                    beanCons.TPAX = rst.getString("TPAX").trim();
                    if (rst.getString("TOPER") != null && !rst.getString("TOPER").trim().equals("")) {
                        beanCons.TOPUS = rst.getString("TOPER").trim();
                    } else {
                        beanCons.TOPUS = rst.getString("TOPUS").trim();
                    }
                    beanCons.CARR = rst.getString("CARR").trim();
                    beanCons.CABI = rst.getString("CABI").trim();
                    beanCons.CLAS = rst.getString("CLAS").trim();
                    beanCons.FBASE = rst.getString("FBASE").trim();
                    beanCons.CFF = rst.getString("CFF").trim();
                    beanCons.VCPN = rst.getDouble("VCPN");
                    beanCons.COMISI = rst.getDouble("COMISI");
                    beanCons.VTAX = rst.getDouble("VTAX");
                    beanCons.MDACP = rst.getString("MDACP").trim();
                    beanCons.VCPMX = rst.getDouble("VCPMX");
                    beanCons.TCMUS = rst.getDouble("TCMUS");
                    beanCons.VCPUS = rst.getDouble("VCPUS");
                    beanCons.QTYPAX = rst.getInt("QTYPAX");
                    beanCons.FCONT = rst.getString("FCONT").trim();
                    beanCons.IDCON = rst.getString("IDCON").trim();
                    beanCons.USCR = rst.getString("USCR").trim();
                    beanCons.FECR = rst.getString("FECR").trim();
                    beanCons.HOCR = Functions.ConvertedTime(rst.getString("HOCR").trim());
                    beanCons.USUP = rst.getString("USUP").trim();
                    beanCons.FEUP = rst.getString("FEUP").trim();
                    beanCons.HOUP = Functions.ConvertedTime(rst.getString("HOUP").trim());
                    //Deshabiltado a Raíz del cambio del A720 A PRAXIS.
                    if (rst.getString("A1711SOURC") != null && !rst.getString("A1711SOURC").trim().equals("-")) {
                        beanCons.strFuente = rst.getString("A1711SOURC").trim();
                        beanCons.FTE = rst.getString("A1711SOURC").trim();
                    }
                    beanCons.FECVAL = rst.getString("FECVAL");
                    beanCons.FINVO = rst.getString("FINVO").trim();
                    //beanCons.strFuente = rst.getString("FTE").trim();
                }
            }
        } finally {
            setClose();
        }

        return beanCons;
    }

    public A1692Filter loadPX095S06A1692_1(String strTicket, String strSeq, String seqRol, HashMap<String, String> hmAeropuertos, HashMap<String, String> hmPaises) throws SQLException, Exception {

        A1692Filter beanCons = new A1692Filter();

        CallableStatement cstmt = null;
        ResultSet rst = null;
        int seq = 0;
        String Flag = "", tktpadre = "";

        //PX09500007
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX095S06A1692_1(?,?,?,?,?,?,?)}";//Schema

        Connection cnx = null;
        try {

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.setString(2, strTicket.substring(0, 3));
            cstmt.setString(3, strTicket.substring(3, 7));
            cstmt.setString(4, strTicket.substring(7, 13));
            cstmt.setString(5, strTicket.substring(13, 14));
            cstmt.setString(6, strSeq);
            cstmt.setString(7, seqRol);
            cstmt.execute();

            rst = cstmt.getResultSet();

            if (rst.next()) {
                seq = rst.getInt("A720NSEQ");
                Flag = rst.getString("A720FLAG");
                tktpadre = rst.getString("A720CIAI") + rst.getString("A720FORMAI") + rst.getString("A720SERIEI");
            }
            rst.close();
            if (cstmt.getMoreResults()) {
                rst = cstmt.getResultSet();
                if (rst.next()) {
                    beanCons = new A1692Filter();
                    beanCons.monthTo = tktpadre;
                    beanCons.yearTo = Flag;
                    beanCons.CPN_Billed = seq;

                    if (rst.getString("STAT") != null && !rst.getString("STAT").trim().equals("-")) {
                        beanCons.strDescSTVAL = rst.getString("STAT").trim();
                    }
                    beanCons.FFLOW = rst.getString("FFLOW").trim();
                    if (rst.getString("FFLOW").trim().equals("P")) {
                        beanCons.strFFLOW = "Scheduled";
                    } else if (rst.getString("FFLOW").trim().equals("C")) {
                        beanCons.strFFLOW = "Charter";
                    } else if (rst.getString("FFLOW").trim().equals("X")) {
                        beanCons.strFFLOW = "Canceled";
                    } else if (rst.getString("FFLOW").trim().equals("U")) {
                        beanCons.strFFLOW = "Unscheduled";
                    }
                    beanCons.CCUST = rst.getString("CCUST").trim();
                    beanCons.CCIA = rst.getString("CCIA").trim();
                    beanCons.FORMA = rst.getString("FORMA").trim();
                    beanCons.SERIE = rst.getString("SERIE").trim();
                    beanCons.CUPON = rst.getString("CUPON").trim();
                    beanCons.SEQRO = rst.getString("SEQRO").trim();
                    beanCons.strTicket = rst.getString("CCIA").trim() + rst.getString("FORMA").trim() + rst.getString("SERIE").trim() + rst.getString("CUPON").trim();
                    beanCons.DCHEQ = rst.getString("DCHEQ").trim();
                    beanCons.SEQ = rst.getString("SEQ").trim();
                    beanCons.STVAL = rst.getString("STVAL").trim();
                    beanCons.FVAL = rst.getString("FVAL").trim();
                    beanCons.STCON = rst.getString("STCON").trim();
                    beanCons.FTE = rst.getString("FTE").trim();
                    beanCons.FLOAD = rst.getString("FLOAD").trim();
                    beanCons.FOPERZUL = rst.getString("FOPERZUL").trim();
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
                    beanCons.LEGSEQ = rst.getString("LEGSEQ").trim();
                    beanCons.FDUP = rst.getString("FDUP").trim();

                    if (beanCons.FDUP.equals("Y")) {
                        beanCons.FDUP = "DUPLICATE";
                    }

                    beanCons.NPLANE = rst.getString("NPLANE").trim();
                    beanCons.ZONA = rst.getString("ZONA").trim();
                    //beanCons.STORG = rst.getString("STORG").trim();
                    beanCons.CDOC = rst.getString("CDOC").trim();
                    beanCons.TDOC = rst.getString("TDOC").trim();
                    beanCons.PSVVTA = rst.getString("PSVVTA").trim();
                    if (hmPaises.containsKey(rst.getString("PSVVTA").trim().toUpperCase())) {
                        beanCons.strDescPSVVTA = hmPaises.get(rst.getString("PSVVTA").trim()).toString();
                    }
                    beanCons.AGTIA = rst.getString("AGTIA").trim();
                    beanCons.FVTA = rst.getString("FVTA").trim();
                    beanCons.TVTA = rst.getString("TVTA").trim();
                    beanCons.TPAX = rst.getString("TPAX").trim();
                    if (rst.getString("TOPER") != null && !rst.getString("TOPER").trim().equals("")) {
                        beanCons.TOPUS = rst.getString("TOPER").trim();
                    } else {
                        beanCons.TOPUS = rst.getString("TOPUS").trim();
                    }
                    beanCons.CARR = rst.getString("CARR").trim();
                    beanCons.CABI = rst.getString("CABI").trim();
                    beanCons.CLAS = rst.getString("CLAS").trim();
                    beanCons.FBASE = rst.getString("FBASE").trim();
                    beanCons.CFF = rst.getString("CFF").trim();
                    beanCons.VCPN = rst.getDouble("VCPN");
                    beanCons.COMISI = rst.getDouble("COMISI");
                    beanCons.VTAX = rst.getDouble("VTAX");
                    beanCons.MDACP = rst.getString("MDACP").trim();
                    beanCons.VCPMX = rst.getDouble("VCPMX");
                    beanCons.TCMUS = rst.getDouble("TCMUS");
                    beanCons.VCPUS = rst.getDouble("VCPUS");
                    beanCons.QTYPAX = rst.getInt("QTYPAX");
                    beanCons.FCONT = rst.getString("FCONT").trim();
                    beanCons.IDCON = rst.getString("IDCON").trim();
                    beanCons.USCR = rst.getString("USCR").trim();
                    beanCons.FECR = rst.getString("FECR").trim();
                    beanCons.HOCR = Functions.ConvertedTime(rst.getString("HOCR").trim());
                    beanCons.USUP = rst.getString("USUP").trim();
                    beanCons.FEUP = rst.getString("FEUP").trim();
                    beanCons.HOUP = Functions.ConvertedTime(rst.getString("HOUP").trim());
                    //Deshabiltado a Raíz del cambio del A720 A PRAXIS.
                    if (rst.getString("A1711SOURC") != null && !rst.getString("A1711SOURC").trim().equals("-")) {
                        beanCons.strFuente = rst.getString("A1711SOURC").trim();
                        beanCons.FTE = rst.getString("A1711SOURC").trim();
                    }
                    beanCons.FECVAL = rst.getString("FECVAL");
                    beanCons.FINVO = rst.getString("FINVO").trim();
                    //beanCons.strFuente = rst.getString("FTE").trim();
                }
            }

        } catch (Exception e) {
            e.getMessage();
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

        return beanCons;
    }

    public A1692Filter loadPX095SQP0009(A1692Filter filter) throws SQLException, Exception {
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP0009(?,?,?,?,?,?)}";
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(SQLCLL01);
            cs.registerOutParameter(6, Types.VARCHAR);

            cs.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cs.setString(2, filter.CCIA.trim());
            cs.setString(3, filter.FORMA.trim());
            cs.setString(4, filter.SERIE.trim());
            cs.setString(5, filter.CUPON.trim());
            cs.setString(6, "");
            cs.execute();

            //Obteniendo Fecha Contable ========================================
            if (cs.getString(6) != null) {
                filter.FCONT = cs.getString(6).trim();
            }

            rst = cs.getResultSet();
            if (rst.next()) {
                filter.PSVVTA = rst.getString("A720PAIVTA").trim();
                filter.FVTA = rst.getString("A720FECVTA").trim();
                filter.AGTIA = rst.getString("A720AGENTE").trim();
                filter.TVTA = rst.getString("A720TVENTA").trim();
            }
        } finally {
            setClose();
        }
        return filter;
    }

    public A1692Filter loadPX083SQP0008(A1692Filter filter) throws SQLException, Exception {
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP0008(?,?,?,?,?)}";
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(SQLCLL01);

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

    public String loadPX095S07A1692(A1692Filter filter, String strOption) throws SQLException, Exception {

        //REALIZA EL INSERT, UPDATE O DELETE DE UN REGISTRO EN LA TABLA A1691.
        String strMsj = "Operation was successful.";
        if (strOption.trim().equals("I")) {
            filter.STVAL = "1";//Status Pendiente
            if (filter.VCPN > 0) {
                filter.STVAL = "2";//Status Valorizado
                filter.FECVAL = Functions.getFechaActual();
                if (filter.MDACP.trim().equals("MXN")) {
                    filter.FVAL = "3";
                } else {
                    filter.FVAL = "1";
                }
            }
        } else if (filter.VCPN > 0 && filter.STVAL.trim().equals("1")) {
            filter.STVAL = "2";//Status Valorizado
            filter.FECVAL = Functions.getFechaActual();
            if (filter.MDACP.trim().equals("MXN")) {
                filter.FVAL = "3";
            } else {
                filter.FVAL = "1";
            }
        }

        if (filter.QTYPAX <= 0) {
            filter.QTYPAX = 1;
        }

        //PX09500008
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX095S07A1692_2(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,"
                + "?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
        try {

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(SQLCLL01);
            cs.registerOutParameter(54, Types.VARCHAR);

            cs.setString(1, strOption.trim());
            cs.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cs.setString(3, filter.CCIA.trim());
            cs.setString(4, filter.FORMA.trim());
            cs.setString(5, filter.SERIE.trim());
            cs.setString(6, filter.CUPON.trim());
            cs.setString(7, filter.DCHEQ.trim());
            cs.setString(8, filter.SEQ.trim());
            cs.setString(9, filter.STVAL.trim());
            cs.setString(10, filter.FVAL.trim());
            cs.setString(11, filter.STCON.trim());
            cs.setString(12, filter.FTE.trim());
            cs.setString(13, filter.DFLIGHT.trim());
            cs.setString(14, filter.NFLIGHT.trim());
            cs.setString(15, filter.CDEPART.trim());
            cs.setString(16, filter.CARRIVA.trim());
            cs.setString(17, filter.LEGSEQ.trim());
            cs.setString(18, filter.NPLANE.trim());
            cs.setString(19, filter.ZONA.trim());
            cs.setString(20, "");//filter.STORG.trim()
            cs.setString(21, filter.CDOC.trim());
            cs.setString(22, filter.TDOC.trim());
            cs.setString(23, filter.PSVVTA.trim());
            cs.setString(24, filter.AGTIA.trim());
            cs.setString(25, filter.FVTA.trim());
            cs.setString(26, filter.TVTA.trim());
            cs.setString(27, filter.TPAX.trim());
            cs.setString(28, filter.TOPUS.trim());
            cs.setString(29, filter.CARR.trim());
            cs.setString(30, filter.CABI.trim());
            cs.setString(31, filter.CLAS.trim());
            cs.setString(32, filter.FBASE.trim());
            cs.setString(33, filter.CFF.trim());
            cs.setDouble(34, filter.VCPN);
            cs.setDouble(35, filter.COMISI);
            cs.setDouble(36, filter.VTAX);
            cs.setString(37, filter.MDACP.trim());
            cs.setDouble(38, filter.VCPMX);
            cs.setDouble(39, filter.TCMUS);
            cs.setDouble(40, filter.VCPUS);
            cs.setString(41, filter.FCONT.trim());
            cs.setString(42, session.getUserView().getCustomerInfo().USR.trim());
            cs.setString(43, Functions.getFechaActual());
            cs.setString(44, Functions.getHoraActual());
            cs.setString(45, filter.FLOAD.trim());
            cs.setInt(46, filter.QTYPAX);
            cs.setString(47, filter.FECVAL);//FECVAL
            cs.setString(48, filter.FOPERZUL);
            cs.setDouble(49, filter.VYQ);
            cs.setDouble(50, filter.VCPN0);
            cs.setDouble(51, filter.VCPN16);
            cs.setDouble(52, filter.VYQ0);
            cs.setDouble(53, filter.VYQ16);
            cs.setString(54, "");//MSJ
            cs.execute();

            //Obteniendo el mensaje de error ===================================    
            if (cs.getString(54) != null) {
                strMsj = cs.getString(54).trim();
                if (strMsj.trim().equals("")) {
                    strMsj = "Operation was successful.";
                }
            }
        } finally {
            setClose();
        }

        return strMsj;
    }

    public String loadPX095S12QCAL(A1692Filter filter, String recalculo) throws SQLException, Exception {
        String strSQL;
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
                cs.setString(7, session.getUserView().getCustomerInfo().USR.trim());
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
            cs.setString(7, session.getUserView().getCustomerInfo().USR.trim());
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

    public List<A1692Filter> loadPX072S06A1692(A1692Filter filter, HashMap hmAeropuertos, HashMap<String, String> hmPaises) throws SQLException, Exception {

        //Para traer data del Programa de Query del Manifiesto de Vuelo
        List<A1692Filter> lstTkt = new ArrayList<>(0);
        A1692Filter beanTkt;

        // <editor-fold defaultstate="collapsed" desc=" 'DATE' ">
        filter.yearFrom = Functions.fillZeros(4, filter.yearFrom).replace("00", "");//YYYY
        filter.monthFrom = Functions.fillZeros(2, filter.monthFrom).replace("00", "");//MM
        filter.dayFrom = Functions.fillZeros(2, filter.dayFrom).replace("00", "");//DD
        filter.dayTo = Functions.fillZeros(2, filter.dayTo).replace("00", "");//DD
        //</editor-fold>

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00209(?,?,?,?,?,?,?,?,?,?)}";
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(SQLCLL01);

            cs.registerOutParameter(7, Types.INTEGER);
            cs.registerOutParameter(8, Types.INTEGER);
            cs.registerOutParameter(9, Types.INTEGER);
            cs.registerOutParameter(10, Types.INTEGER);

            cs.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cs.setString(2, filter.yearFrom.trim());
            cs.setString(3, filter.monthFrom.trim());
            cs.setString(4, filter.dayFrom.trim());
            cs.setString(5, filter.dayTo.trim());
            cs.setString(6, filter.strSQL.trim());
            cs.setInt(7, filter.page.PAGNUM);
            cs.setInt(8, filter.page.PAGROW);
            cs.setInt(9, filter.page.TOTPAG);
            cs.setInt(10, filter.page.TOTROW);
            cs.execute();

            filter.page.PAGNUM = cs.getInt(7);
            filter.page.PAGROW = cs.getInt(8);
            filter.page.TOTPAG = cs.getInt(9);
            filter.page.TOTROW = cs.getInt(10);

            rst = cs.getResultSet();
            while (rst.next()) {

                beanTkt = new A1692Filter();
                beanTkt.CARR = filter.CARR;
                beanTkt.yearFrom = filter.yearFrom;
                beanTkt.monthFrom = filter.monthFrom;
                beanTkt.dayFrom = filter.dayFrom;
                beanTkt.dayTo = filter.dayTo;
                beanTkt.strSQL = filter.strSQL;

                beanTkt.CCIA = rst.getString("CCIA").trim();
                beanTkt.FORMA = rst.getString("FORMA").trim();
                beanTkt.SERIE = rst.getString("SERIE").trim();
                beanTkt.CUPON = rst.getString("CUPON").trim();
                beanTkt.strTicket = rst.getString("CCIA").trim() + " " + rst.getString("FORMA").trim() + rst.getString("SERIE").trim() + " " + rst.getString("CUPON").trim();
                beanTkt.FCONT = rst.getString("FCONT").trim();
                beanTkt.strFormatDate2 = Functions.getMonthConvert(beanTkt.FCONT);
                beanTkt.CDEPART = rst.getString("CDEPART").trim();
                if (hmAeropuertos.containsKey(rst.getString("CDEPART").trim().toUpperCase())) {
                    beanTkt.strDescCDEPART = hmAeropuertos.get(rst.getString("CDEPART").trim()).toString();
                }
                beanTkt.CARRIVA = rst.getString("CARRIVA").trim();
                if (hmAeropuertos.containsKey(rst.getString("CARRIVA").trim().toUpperCase())) {
                    beanTkt.strDescCARRIVA = hmAeropuertos.get(rst.getString("CARRIVA").trim()).toString();
                }
                beanTkt.NFLIGHT = rst.getString("NFLIGHT").trim();
                beanTkt.DFLIGHT = rst.getString("DFLIGHT").trim();
                beanTkt.strFormatDate = Functions.getMonthConvert(beanTkt.DFLIGHT);
                beanTkt.LEGSEQ = rst.getString("LEGSEQ").trim();
                beanTkt.TDOC = rst.getString("TDOC").trim();
                beanTkt.PSVVTA = rst.getString("PSVVTA").trim();
                if (hmPaises.containsKey(rst.getString("PSVVTA").trim().toUpperCase())) {
                    beanTkt.strDescPSVVTA = hmPaises.get(rst.getString("PSVVTA").trim()).toString();
                }
                beanTkt.AGTIA = rst.getString("AGTIA").trim();
                beanTkt.FVTA = rst.getString("FVTA").trim();
                beanTkt.strFormatFVTA = Functions.getMonthConvert(beanTkt.FVTA);
                beanTkt.TOPUS = rst.getString("TOPUS").trim();
                beanTkt.CARR = rst.getString("CARR").trim();
                beanTkt.CABI = rst.getString("CABI").trim();
                beanTkt.VCPN = rst.getDouble("VCPN");
                beanTkt.COMISI = rst.getDouble("COMISI");
                beanTkt.MDACP = rst.getString("MDACP").trim();
                beanTkt.VCPMX = rst.getDouble("VCPMX");
                beanTkt.TCMUS = rst.getDouble("TCMUS");
                beanTkt.VCPUS = rst.getDouble("VCPUS");

                beanTkt.page.PAGNUM = filter.page.PAGNUM;
                beanTkt.page.PAGROW = filter.page.PAGROW;
                beanTkt.page.TOTPAG = filter.page.TOTPAG;
                beanTkt.page.TOTROW = filter.page.TOTROW;

                lstTkt.add(beanTkt);
            }
        } finally {
            setClose();
        }
        return lstTkt;
    }

    public A2149 insertFavoriteMenu(A2149 filter) throws SQLException, Exception {
        CallableStatement cs = null;
        ResultSet rst = null;
        String strSQL;
        Connection cnx = session.getCNXIBMDB2().getIBMDB2Connection();
        try {
            Functions.msjConsola("PRAXIS", session.getUserView().getUserInfo().USR, "insertFavoriteMenu");
            strSQL = "{CALL " + session.getMainLibrary() + ".SQP00553(?,?,?,?,?)}";
            cs = cnx.prepareCall(strSQL);
            cs.setString(1, "1");
            cs.setString(2, filter.A2149IDMEN);
            cs.setString(3, filter.A2149ICON);
            cs.setString(4, session.getUserView().getUserInfo().USR);
            cs.setString(5, filter.A2149MNUNM);
            cs.execute();
            rst = cs.getResultSet();
            try {
                cs.close();
            } catch (SQLException e) {
                //logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            strSQL = null;
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
        }

        return filter;
    }

    public A2149 deleteFavoriteMenu(A2149 filter) throws SQLException, Exception {
        CallableStatement cs = null;
        ResultSet rst = null;
        String strSQL;
        Connection cnx = session.getCNXIBMDB2().getIBMDB2Connection();
        try {
            Functions.msjConsola("PRAXIS", session.getUserView().getUserInfo().USR, "deleteFavoriteMenu");
            strSQL = "{CALL " + session.getMainLibrary() + ".SQP00555(?,?)}";
            cs = cnx.prepareCall(strSQL);
            cs.setString(1, filter.A2149IDMEN);
            cs.setString(2, session.getUserView().getUserInfo().USR);
            cs.execute();
            rst = cs.getResultSet();
            try {
                cs.close();
            } catch (SQLException e) {
                //slogError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            strSQL = null;
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
        }

        return filter;
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

    public HashMap loadSQP03651() throws SQLException, Exception {

        HashMap hm = new HashMap();
        A1691Filter obj = new A1691Filter();
        A1691Filter obj2 = new A1691Filter();

        CallableStatement cstmt = null;
        ResultSet rst = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP03651(?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt.execute();

            rst = cstmt.getResultSet();
            while (rst.next()) {

                obj.strDescripcion = rst.getString("REG_CONTROL");
                obj.QCPNFI = rst.getInt("NENV");

            }
            hm.put("ODS", obj);
            rst.close();
            if (cstmt.getMoreResults()) {

                rst = cstmt.getResultSet();
                while (rst.next()) {

                    obj2.strDescripcion = rst.getString("REG_CONTROL");
                    obj2.QCPNFI = rst.getInt("NENV");

                }

                hm.put("VCRJ", obj2);

            }

        } catch (Exception e) {
            //e.getMessage();
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

        return hm;
    }

    public List<A3729Filter> loadPX095SQP04286(A3729Filter filter) throws SQLException, Exception {
        List<A3729Filter> lstCons = new ArrayList<>(0);
        A3729Filter beanCons;
        String strFecha = "", NFLIGHT = filter.NFLIGHT.trim(); //YYYYMM
        int QPEND = 0, QPRO = 0, QCLO = 0, QSSIM = 0, QODS = 0, QVCR = 0, QPHY = 0, QtyCANCEL = 0;
        int QSVOPRO = 0, QSVOPEND = 0, QSVVPRO = 0, QSVVPEND = 0, QFFLOW = 0;

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

        try {

            String strSQL = "{CALL " + session.getMainLibrary() + ".SQP04286(?,?,?,?,?)}";

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(strSQL);

            cs.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cs.setString(2, filter.yearFrom + filter.monthFrom + filter.dayFrom);
            cs.setString(3, filter.yearTo + filter.monthTo + filter.dayTo);
            cs.setString(4, filter.IN_FSABRE);
            cs.setString(5, filter.NFLIGHT);

            cs.execute();

            rst = cs.getResultSet();
            while (rst.next()) {

                beanCons = new A3729Filter();

                beanCons.RN = rst.getLong("RN");
                beanCons.CHAIR = rst.getString("CHAIR").trim();
                beanCons.strTicket = rst.getString("TICKET").trim();
//                beanCons.strTicket = rst.getString("CCIA").trim() + " " + rst.getString("FORMA").trim() + rst.getString("SERIE").trim();
//                beanCons.NPAX = rst.getString("NPAX").trim();
                beanCons.SEQ = rst.getString("SEQ").trim();
//                beanCons.SPNR = rst.getString("SPNR").trim();
                beanCons.FNAME = rst.getString("FNAME").trim();
                beanCons.LNAME = rst.getString("LNAME").trim();
                beanCons.DFLIGHT = rst.getString("DFLIGHT").trim();
                beanCons.strFormatDate = Functions.getMonthConvert(beanCons.DFLIGHT);
//                beanCons.strDescripcion = Functions.getMonthConvert(beanCons.DFLIGHT);
                beanCons.NFLIGHT = rst.getString("NFLIGHT").trim();
                beanCons.CDEPART = rst.getString("CDEPART").trim();
                beanCons.CARRIVA = rst.getString("CARRIVA").trim();
                beanCons.STVAL = rst.getString("STVAL");
                if (rst.getString("STVAL").trim().equals("1")) {
                    beanCons.desSTVAL = "No conciliado";
                } else if (rst.getString("STVAL").trim().equals("0")) {
                    beanCons.desSTVAL = "Conciliado";
                }

                beanCons.FSABRE = rst.getString("FSABRE").trim();
                if (rst.getString("FSABRE").trim().equals("0")) {
                    beanCons.descFSABRE = "Not Found";
                } else if (rst.getString("FSABRE").trim().equals("1")) {
                    beanCons.descFSABRE = "Found";
                } else if (rst.getString("FSABRE").trim().equals("2")) {
                    beanCons.descFSABRE = "Found but not matching coupon";
                } else if (rst.getString("FSABRE").trim().equals("4")) {
                    beanCons.descFSABRE = "No Revenue(Employes/Oth)";
                } else if (rst.getString("FSABRE").trim().equals("5")) {
                    beanCons.descFSABRE = "Manual";
                } else if (rst.getString("FSABRE").trim().equals("6")) {
                    beanCons.descFSABRE = "BPO Found";
                }

                beanCons.STASABR = rst.getString("STASABR").trim();

                beanCons.FSALES = rst.getString("FSALES").trim();
                if (rst.getString("FSALES").trim().equals("0")) {
                    beanCons.descFSALES = "No existe";
                } else if (rst.getString("FSALES").trim().equals("1")) {
                    beanCons.descFSALES = "Existe";
                }

                beanCons.LNKMVLO = rst.getString("LNKMVLO").trim();
                beanCons.STVCR = rst.getString("STVCR").trim();

                if (rst.getString("STVCR").trim().equals("Y")) {
                    beanCons.desSTVCR = "Yes";
                } else if (rst.getString("STVCR").trim().equals("")) {
                    beanCons.desSTVCR = "";
                }

                beanCons.TPAX = rst.getString("TPAX").trim();
                beanCons.TPAX_V = rst.getString("TPAX_V").trim();

                if (!beanCons.TPAX_V.equals("")) {
                    beanCons.TPAX = beanCons.TPAX_V;
                }

                if (beanCons.TPAX.equals("A")) {
                    beanCons.desPAX = "Adult";
                } else if (beanCons.TPAX.equals("C")) {
                    beanCons.desPAX = "Children";
                } else if (beanCons.TPAX.equals("I")) {
                    beanCons.desPAX = "Infant";
                } else if (beanCons.TPAX.equals("INF")) {
                    beanCons.desPAX = "Infant";
                }

                beanCons.FA720 = rst.getString("FA720").trim();
//                if (rst.getString("FA720").trim().equals("")) {
//                    beanCons.descFSALES = "";
//                } else {
//                    beanCons.descFSALES = "Yes";
//                }

                beanCons.USCR = rst.getString("USCR").trim();
                beanCons.FECR = rst.getString("FECR").trim();
                beanCons.HOCR = rst.getString("HOCR").trim();
                beanCons.USUP = rst.getString("USUP").trim();
                beanCons.FEUP = rst.getString("FEUP").trim();
                beanCons.HOUP = rst.getString("HOUP").trim();

                lstCons.add(beanCons);

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

        return lstCons;
    }

    public A3729Filter SQP04282(List<A3729Filter> lstTKT) throws Exception {
        //REALIZA UPDATE DE CUPON EN LA TABLA A3729.

        boolean correct = false;
        A3729Filter result = new A3729Filter();;
        List<A3729Filter> lst_tkt_error = new ArrayList<A3729Filter>();
        int QTY_UPDATE = 0;

        CallableStatement cstmt = null;
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04282(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            for (int i = 0; i < lstTKT.size(); ++i) {

                A3729Filter item = lstTKT.get(i);
                try {
                    cstmt.registerOutParameter(19, Types.INTEGER);

                    cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST.trim());
                    cstmt.setString(2, item.DFLIGHT.trim());
                    cstmt.setString(3, item.NFLIGHT.trim());
                    cstmt.setString(4, item.LNAME.trim());
                    cstmt.setString(5, item.FNAME.trim());
                    cstmt.setString(6, item.TPAX.trim());
                    cstmt.setString(7, item.CHAIR.trim());
                    cstmt.setString(8, item.strTicket.trim());
                    cstmt.setString(9, item.STVAL.trim());
                    cstmt.setString(10, item.CDEPART.trim());
                    cstmt.setString(11, item.CARRIVA.trim());
                    cstmt.setString(12, item.STVCR.trim());
                    cstmt.setString(13, item.FSABRE.trim());
                    cstmt.setString(14, item.STASABR.trim());
                    cstmt.setString(15, item.CUPON.trim());
                    cstmt.setString(16, session.getUserView().getUserInfo().USR);
                    cstmt.setString(17, Functions.getFechaActual());
                    cstmt.setString(18, Functions.getHoraActual());
                    cstmt.setInt(19, 0);

                    cstmt.execute();

                    item.qty_update = cstmt.getInt(19);
                    QTY_UPDATE += item.qty_update;

                } catch (Exception e) {
                    e.printStackTrace();
                }
            }

            result.qty_update = QTY_UPDATE;

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (rst != null) {
                try {
                    rst.close();
                } catch (SQLException e) {
                    logError.error("SQLException Manifest -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            if (cstmt != null) {
                try {
                    cstmt.close();
                } catch (SQLException e) {
                    logError.error("SQLException Manifest -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return result;
    }

    public A3729Filter SQP04400(List<A3729Filter> lstTKT) throws Exception {
        //REALIZA UPDATE EN A3729.

        boolean correct = false;
        A3729Filter result = new A3729Filter();;
        List<A3729Filter> lst_tkt_error = new ArrayList<A3729Filter>();
        int QTY_UPDATE = 0;

        CallableStatement cstmt = null;
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04400(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            for (int i = 0; i < lstTKT.size(); ++i) {

                A3729Filter item = lstTKT.get(i);
                try {
                    cstmt.registerOutParameter(19, Types.INTEGER);

                    cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST.trim());
                    cstmt.setString(2, item.DFLIGHT.trim());
                    cstmt.setString(3, item.NFLIGHT.trim());
                    cstmt.setString(4, item.LNAME.trim());
                    cstmt.setString(5, item.FNAME.trim());
                    cstmt.setString(6, item.TPAX.trim());
                    cstmt.setString(7, item.CHAIR.trim());
                    cstmt.setString(8, item.strTicket.trim());
                    cstmt.setString(9, item.STVAL.trim());
                    cstmt.setString(10, item.CDEPART.trim());
                    cstmt.setString(11, item.CARRIVA.trim());
                    cstmt.setString(12, item.STVCR.trim());
                    cstmt.setString(13, item.FSABRE.trim());
                    cstmt.setString(14, item.STASABR.trim());
                    cstmt.setString(15, item.CUPON.trim());
                    cstmt.setString(16, session.getUserView().getUserInfo().USR);
                    cstmt.setString(17, Functions.getFechaActual());
                    cstmt.setString(18, Functions.getHoraActual());
                    cstmt.setInt(19, 0);

                    cstmt.execute();

                    item.qty_update = cstmt.getInt(19);
                    QTY_UPDATE += item.qty_update;

                } catch (Exception e) {
                    e.printStackTrace();
                }
            }

            result.qty_update = QTY_UPDATE;

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (rst != null) {
                try {
                    rst.close();
                } catch (SQLException e) {
                    logError.error("SQLException Manifest -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            if (cstmt != null) {
                try {
                    cstmt.close();
                } catch (SQLException e) {
                    logError.error("SQLException Manifest -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return result;
    }

    public String SQP04320(A3729Filter filter) throws SQLException, Exception {
        //REALIZA UPDATE  DE UN REGISTRO EN LA TABLA A3729.

        String strMsj = "";
        CallableStatement cstmt = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04320(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, filter.option.trim());
            cstmt.setString(2, session.getUserView().getCustomerInfo().CCUST.trim());
            cstmt.setString(3, filter.TICKET.trim());
            cstmt.setString(4, filter.CUPON.trim());

            cstmt.setString(5, filter.DFLIGHT.trim());
            cstmt.setString(6, filter.NFLIGHT.trim());
            cstmt.setString(7, filter.TPAX.trim());

            cstmt.setString(8, filter.CDEPART.trim());
            cstmt.setString(9, filter.CARRIVA.trim());
            cstmt.setString(10, filter.CHAIR.trim());

            cstmt.setString(11, filter.LNAME.trim());
            cstmt.setString(12, filter.FNAME.trim());

            cstmt.setString(13, filter.STVAL.trim());
            cstmt.setString(14, filter.STVCR.trim());
            cstmt.setString(15, filter.FSALES.trim());
            cstmt.setString(16, filter.FSABRE.trim());
            cstmt.setString(17, filter.STASABR.trim());

            cstmt.setString(18, filter.SEQ.trim());

            cstmt.setString(19, session.getUserView().getUserInfo().USR);
            cstmt.setString(20, Functions.getFechaActual());
            cstmt.setString(21, Functions.getHoraActual());
            cstmt.setString(22, "A3729");
            cstmt.execute();

            strMsj = "Upgrade was successful.";

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

        return strMsj;

    }

    public boolean SQP04321(A3729Filter filter) throws SQLException, Exception {

        //VALIDAR SI EXISTE EL NUEVO TICKET EN A3729.
        boolean existe = false;
        CallableStatement cstmt = null;

        String SQLCLL01 = "SELECT CCUST FROM PRAXIS.A3729 WHERE CCUST = ? AND TICKET = ? AND CUPON = ? LIMIT 1";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST.trim());
            cstmt.setString(2, filter.TICKET_2.trim());
            cstmt.setString(3, filter.CUPON_2.trim());
            cstmt.execute();

            rst = cstmt.getResultSet();
            if (rst.next()) {
                existe = true;
            }

        } catch (Exception e) {
            e.printStackTrace();
//            strMsj = e.getMessage();
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

        return existe;

    }

    public String SQP04323(A3729Filter filter) throws SQLException, Exception {
        //REALIZA INSERT Y LUEGO DELETE DE UN REGISTRO EN LA TABLA A3729.

        String strMsj = "";
        CallableStatement cstmt = null;
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04323(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.setString(1, filter.option.trim());
            cstmt.setString(2, session.getUserView().getCustomerInfo().CCUST.trim());
            cstmt.setString(3, filter.TICKET.trim());
            cstmt.setString(4, filter.TICKET_2.trim());
            cstmt.setString(5, filter.CUPON.trim());
            cstmt.setString(6, filter.CUPON_2.trim());

            cstmt.setString(7, filter.DFLIGHT.trim());
            cstmt.setString(8, filter.NFLIGHT.trim());
            cstmt.setString(9, filter.TPAX.trim());

            cstmt.setString(10, filter.CDEPART.trim());
            cstmt.setString(11, filter.CARRIVA.trim());
            cstmt.setString(12, filter.CHAIR.trim());

            cstmt.setString(13, filter.LNAME.trim());
            cstmt.setString(14, filter.FNAME.trim());

            cstmt.setString(15, filter.STVAL.trim());
            cstmt.setString(16, filter.STVCR.trim());
            cstmt.setString(17, filter.FSALES.trim());
            cstmt.setString(18, filter.FSABRE.trim());
            cstmt.setString(19, filter.STASABR.trim());

            cstmt.setString(20, filter.SEQ.trim());
            cstmt.setString(21, filter.LNKMVLO.trim());

            cstmt.setString(22, filter.USCR.trim());
            cstmt.setString(23, filter.FECR.trim());
            cstmt.setString(24, filter.HOCR.trim());

            cstmt.setString(25, session.getUserView().getUserInfo().USR);
            cstmt.setString(26, Functions.getFechaActual());
            cstmt.setString(27, Functions.getHoraActual());
            cstmt.setString(28, "A3729");
            cstmt.execute();

            strMsj = "Insertion was successful.";

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

        return strMsj;

    }

    public String SQP04550(A3729Filter filter) throws SQLException, Exception {
        //REALIZA DELETE DE DULPICADOS EN LA TABLA A3729.

        String strMsj = "";
        CallableStatement cstmt = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04550(?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(9, Types.INTEGER);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST.trim());
            cstmt.setString(2, filter.DFLIGHT.trim());
            cstmt.setString(3, filter.NFLIGHT.trim());
            cstmt.setString(4, filter.CDEPART.trim());
            cstmt.setString(5, filter.CARRIVA.trim());

            cstmt.setString(6, session.getUserView().getUserInfo().USR);
            cstmt.setString(7, Functions.getFechaActual());
            cstmt.setString(8, Functions.getHoraActual());
            cstmt.setInt(9, 0);
            cstmt.execute();

            if (cstmt.getInt(9) > 0) {
                strMsj = "Upgrade was successful.";
            } else {
                strMsj = "No records found.";
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

        return strMsj;

    }

}
