/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.dao.salesAudit;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.SaleAudit.A2966Filter;
import net.miatech.beans.SaleAudit.SQP00911Filter;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.SaleAudit.A2553;
import net.miatech.praxis.SaleAudit.SQP00911;
import net.miatech.utils.TimeFormatToday;
import net.miatech.utils.WorkStation;
import org.apache.log4j.Logger;

/**
 *
 * @author zperez
 */
public class DebitBilledReportFormDAO {

    private IServerSession session;
    private static final Logger logError = Logger.getLogger("errorLog");

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A2966Filter> SearchDebitos(A2966Filter filter) throws SQLException, Exception {
        List<A2966Filter> lstRtn = new ArrayList<A2966Filter>(0);
        A2966Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL PXSAUDIT.SQP02156(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.registerOutParameter(15, Types.INTEGER);
            cstmt01.registerOutParameter(16, Types.INTEGER);
            cstmt01.registerOutParameter(17, Types.INTEGER);
            cstmt01.registerOutParameter(18, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.OPCIONTYPE);
            cstmt01.setString(3, filter.NUMBERADM);
            cstmt01.setString(4, filter.DATEFROM);
            cstmt01.setString(5, filter.DATETO);
            cstmt01.setString(6, filter.COUNTRY);
            cstmt01.setString(7, filter.CURRENCY);
            cstmt01.setString(8, filter.AUTMAN);
            cstmt01.setString(9, filter.STATUS);
            cstmt01.setString(10, filter.COMBOCHANNEL);
            cstmt01.setString(11, filter.TRNCU);
            cstmt01.setString(12, filter.VP_CNXPA);
            cstmt01.setString(13, filter.VP_AREA);
            cstmt01.setString(14, filter.VP_TYPE);
            cstmt01.setInt(15, filter.page.PAGNUM);
            cstmt01.setInt(16, filter.page.PAGROW);
            cstmt01.setInt(17, filter.page.TOTPAG);
            cstmt01.setInt(18, filter.page.TOTROW);

            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(15);
            filter.page.PAGROW = cstmt01.getInt(16);
            filter.page.TOTPAG = cstmt01.getInt(17);
            filter.page.TOTROW = cstmt01.getInt(18);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {

                objRtn = new A2966Filter();
                objRtn.A2966CCUST = rs01.getString("A2966CCUST");
                objRtn.A2966NMEMO = rs01.getString("A2966NMEMO");
                objRtn.A2966PAIS = rs01.getString("A2966PAIS");
                objRtn.A2966TRNCU = rs01.getString("A2966TRNCU");
                objRtn.A2966FTE = rs01.getString("A2966FTE");
                objRtn.A2966BASE = rs01.getString("A2966BASE");
                objRtn.A2966PROCE = rs01.getString("A2966PROCE");
                objRtn.A2966STAT = rs01.getString("A2966STAT");
                objRtn.A2966FLAG = rs01.getString("A2966FLAG");
                objRtn.A2966MDA = rs01.getString("A2966MDA");
                objRtn.A2966MDARV = rs01.getString("A2966MDARV");
                objRtn.A2966FEVTA = rs01.getString("A2966FEVTA");
                objRtn.A2966FPROC = rs01.getString("A2966FPROC");
                objRtn.A2966CNXPA = rs01.getString("A2548CNXPA");

                objRtn.A2966TOTAL = rs01.getDouble("A2966TOTAL");
                objRtn.A2966TOTAA = rs01.getDouble("A2966TOTAA");
                objRtn.A2966TOTAD = rs01.getDouble("A2966TOTAD");
                objRtn.A2966TCAMB = rs01.getDouble("A2966TCAMB");
                objRtn.A2966TOTRV = rs01.getDouble("A2966TOTRV");

                objRtn.A2966FPRO = rs01.getString("A2966FPRO");
                objRtn.A2966IATA = rs01.getString("A2966IATA");
                objRtn.A2966NMERF = rs01.getString("A2966NMERF");
                objRtn.A2966NFACT = rs01.getString("A2966NFACT");
                objRtn.A2966AREA = rs01.getString("A2966AREA");
                objRtn.A2966TYPE = rs01.getString("A2966TYPE");
                objRtn.A2966IDFIL = rs01.getString("A2966IDFIL");
                objRtn.A2966ORIGN = rs01.getString("A2966ORIGN");
                objRtn.A2966DESCR = rs01.getString("A2966DESCR");
                objRtn.A2966REFER = rs01.getString("A2966REFER");
                objRtn.A2966FCONT = rs01.getString("A2966FCONT");
                objRtn.A2966REGIS = rs01.getString("A2966REGIS");
                objRtn.A2966FREGI = rs01.getString("A2966FREGI");
                objRtn.A2966HREGI = rs01.getString("A2966HREGI");
                objRtn.A2966AGENCY = rs01.getString("AGENCY");

                objRtn.A2966BASEDES = rs01.getString("A2966BASEDES");
                objRtn.A2966TYPEDES = rs01.getString("A2966TYPEDES");
                objRtn.A2966AREADES = rs01.getString("A2966AREADES");
                /**
                 * ACM REFERENCIA DEL TKT
                 */
                if (rs01.getString("NMEMOACM") != null) {
                    objRtn.A2966NMEMOACM = rs01.getString("NMEMOACM");
                    objRtn.A2548REGISCM = rs01.getString("A2548REGISCM");
                } else {
                    objRtn.A2966NMEMOACM = "";
                    objRtn.A2548REGISCM = "";
                }

                objRtn.A2966NETOACM = rs01.getDouble("NETOACM");

                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;

                lstRtn.add(objRtn);

                //System.out.println("Aqui entro con Filtro Categoria: " +lstRtn);
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

    public SQP00911Filter SearchDataGeneral(A2966Filter filter) throws SQLException, Exception {
        SQP00911Filter lstGeneral = null;

        //principal
        List<SQP00911> lst_dataIni = new ArrayList<SQP00911>(0);
        List<A2553> lst_razones = new ArrayList<A2553>(0);
        List<SQP00911> lst_lstTKTS = new ArrayList<SQP00911>(0);

        //conexcion
        List<SQP00911> lst_dataIniADMRefe = new ArrayList<SQP00911>(0);
        List<A2553> lst_razonesADMRefe = new ArrayList<A2553>(0);
        List<SQP00911> lst_lstTKTSADMRefe = new ArrayList<SQP00911>(0);

        SQP00911Filter objRtnGeneral = null;
        //primer
        SQP00911 objlst_dataIni = null;
        A2553 objlst_razones = null;
        SQP00911 objlst_lstTKTS = null;
        //segundo
        SQP00911 objlst_dataIniADMRefe = null;
        A2553 objlst_razonesADMRefe = null;
        SQP00911 objlst_lstTKTSADMRefe = null;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        ResultSet rs02 = null;
        ResultSet rs03 = null;
        ResultSet rs04 = null;
        ResultSet rs05 = null;
        ResultSet rs06 = null;

        String SQLCLL01 = "{CALL PXSAUDIT.SQP03419(?,?,?,?,?,?,?,?,?,?)}";
        //SQP02173
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.NUMBERADM);
            cstmt01.setString(3, filter.COUNTRY);
            cstmt01.setString(4, filter.TRNCU);
            cstmt01.setString(5, filter.CHANNEL);
            cstmt01.setString(6, filter.IATA);
            cstmt01.setString(7, filter.VP_TYPE);
            cstmt01.setString(8, filter.VP_AREA);
            cstmt01.setString(9, filter.VP_NMERF);
             cstmt01.setString(10, filter.VP_CNXPA);
            cstmt01.execute();
            rs01 = cstmt01.getResultSet();
            ///VALIDACION DE TARJETAS
            while (rs01.next()) {
                objlst_dataIni = new SQP00911();
                objlst_dataIni.A2548REGIS = rs01.getString("A2548REGIS");
                objlst_dataIni.A2548FREGI = rs01.getString("A2548FREGI");
                objlst_dataIni.A2548NMERF = rs01.getString("A2548NMERF");
                objlst_dataIni.A2548CNXPA = rs01.getString("A2548CNXPA");
                objlst_dataIni.A2548NMEMO = rs01.getString("A2548NMEMO");

                objlst_dataIni.A2548TARID = rs01.getDouble("A2548TARID");
                objlst_dataIni.A2548TTAXD = rs01.getDouble("A2548TTAXD");
                objlst_dataIni.A2548SERVD = rs01.getDouble("A2548SERVD");
                objlst_dataIni.A2548IVACD = rs01.getDouble("A2548IVACD");
                objlst_dataIni.A2548COMID = rs01.getDouble("A2548COMID");
                objlst_dataIni.A2548SCOMD = rs01.getDouble("A2548SCOMD");
                objlst_dataIni.A2548TAXCD = rs01.getDouble("A2548TAXCD");
                objlst_dataIni.A2548PENAD = rs01.getDouble("A2548PENAD");
                objlst_dataIni.A2548TTACD = rs01.getDouble("A2548TTACD");
                objlst_dataIni.A2548TTAMD = rs01.getDouble("A2548TTAMD");
                objlst_dataIni.A2548TCARD = rs01.getDouble("A2548TCARD");
                objlst_dataIni.A2548NETO = rs01.getDouble("A2548NETO");

                lst_dataIni.add(objlst_dataIni);
            }
            ////LIST DOCUMENTS
            if (cstmt01.getMoreResults()) {
                rs02 = cstmt01.getResultSet();
                while (rs02.next()) {
                    objlst_lstTKTS = new SQP00911();
                    objlst_lstTKTS.A2548TIKET = rs02.getString("A2548CIA") + "" + rs02.getString("A2548FORMA") + "" + rs02.getString("A2548SERIE");
                    objlst_lstTKTS.A2548TRNCO = rs02.getString("A2548TRNCO");
                    objlst_lstTKTS.A2548NETO = rs02.getDouble("A2548NETO");
                    objlst_lstTKTS.A2548PREME = rs02.getString("A2548PREME");
                    objlst_lstTKTS.A2548CNXPA = rs02.getString("A2548CNXPA");
                    objlst_lstTKTS.A2548MDA = rs02.getString("A2548MDA");

                    lst_lstTKTS.add(objlst_lstTKTS);
                }
            }
            //LIST DE RAZONES
            if (cstmt01.getMoreResults()) {
                rs03 = cstmt01.getResultSet();
                while (rs03.next()) {
                    objlst_razones = new A2553();
                    objlst_razones.A2553TYPO = rs03.getString("A2673TYPE");
                    objlst_razones.A2553CODE = rs03.getString("A2673CODE");
                    objlst_razones.A2553DESCR = rs03.getString("A2673ERROR");

                    lst_razones.add(objlst_razones);
                }
            }
            //LIST data general de la conexion
            if (cstmt01.getMoreResults()) {
                rs04 = cstmt01.getResultSet();
                while (rs04.next()) {
                    objlst_dataIniADMRefe = new SQP00911();
                    objlst_dataIniADMRefe.A2548REGIS = rs04.getString("A2548REGIS");
                    objlst_dataIniADMRefe.A2548FREGI = rs04.getString("A2548FREGI");
                    objlst_dataIniADMRefe.A2548NMERF = rs04.getString("A2548NMERF");
                    objlst_dataIniADMRefe.A2548CNXPA = rs04.getString("A2548CNXPA");
                    objlst_dataIniADMRefe.A2548NMEMO = rs04.getString("A2548NMEMO");
                    objlst_dataIniADMRefe.A2548TRNCU = rs04.getString("A2548TRNCU");

                    objlst_dataIniADMRefe.A2548TARID = rs04.getDouble("A2548TARID");
                    objlst_dataIniADMRefe.A2548TTAXD = rs04.getDouble("A2548TTAXD");
                    objlst_dataIniADMRefe.A2548SERVD = rs04.getDouble("A2548SERVD");
                    objlst_dataIniADMRefe.A2548IVACD = rs04.getDouble("A2548IVACD");
                    objlst_dataIniADMRefe.A2548COMID = rs04.getDouble("A2548COMID");
                    objlst_dataIniADMRefe.A2548SCOMD = rs04.getDouble("A2548SCOMD");
                    objlst_dataIniADMRefe.A2548TAXCD = rs04.getDouble("A2548TAXCD");
                    objlst_dataIniADMRefe.A2548PENAD = rs04.getDouble("A2548PENAD");
                    objlst_dataIniADMRefe.A2548TTACD = rs04.getDouble("A2548TTACD");
                    objlst_dataIniADMRefe.A2548TTAMD = rs04.getDouble("A2548TTAMD");
                    objlst_dataIniADMRefe.A2548TCARD = rs04.getDouble("A2548TCARD");
                    objlst_dataIniADMRefe.A2548NETO = rs04.getDouble("A2548NETO");

                    lst_dataIniADMRefe.add(objlst_dataIniADMRefe);
                }
            }
            ////LIST DOCUMENTS de la data general
            if (cstmt01.getMoreResults()) {
                rs05 = cstmt01.getResultSet();
                while (rs05.next()) {
                    objlst_lstTKTSADMRefe = new SQP00911();
                    objlst_lstTKTSADMRefe.A2548TIKET = rs05.getString("A2548CIA") + "" + rs05.getString("A2548FORMA") + "" + rs05.getString("A2548SERIE");
                    objlst_lstTKTSADMRefe.A2548TRNCO = rs05.getString("A2548TRNCO");
                    objlst_lstTKTSADMRefe.A2548NETO = rs05.getDouble("A2548NETO");
                    objlst_lstTKTSADMRefe.A2548PREME = rs05.getString("A2548PREME");
                    objlst_lstTKTSADMRefe.A2548CNXPA = rs05.getString("A2548CNXPA");
                    objlst_lstTKTSADMRefe.A2548MDA = rs05.getString("A2548MDA");

                    lst_lstTKTSADMRefe.add(objlst_lstTKTSADMRefe);
                }
            }
            //LIST DE RAZONES de la data general
            if (cstmt01.getMoreResults()) {
                rs06 = cstmt01.getResultSet();
                while (rs06.next()) {
                    objlst_razonesADMRefe = new A2553();
                    objlst_razonesADMRefe.A2553TYPO = rs06.getString("A2673TYPE");
                    objlst_razonesADMRefe.A2553CODE = rs06.getString("A2673CODE");
                    objlst_razonesADMRefe.A2553DESCR = rs06.getString("A2673ERROR");

                    lst_razonesADMRefe.add(objlst_razonesADMRefe);
                }
            }

            // FIN DE LA AGENCIA
            objRtnGeneral = new SQP00911Filter();
            objRtnGeneral.lst_Ini = lst_dataIni;
            objRtnGeneral.lst_Calcurazones = lst_razones;
            objRtnGeneral.lst_TKT = lst_lstTKTS;
            objRtnGeneral.lst_dataIniADMRefe = lst_dataIniADMRefe;
            objRtnGeneral.lst_lstTKTSADMRefe = lst_lstTKTSADMRefe;
            objRtnGeneral.lst_razonesADMRefe = lst_razonesADMRefe;

            lstGeneral = objRtnGeneral;
        } catch (SQLException e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
        } catch (Exception e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
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
        return lstGeneral;

    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

}
