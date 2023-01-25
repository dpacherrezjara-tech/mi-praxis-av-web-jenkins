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
import net.miatech.beans.A1939Filter;
import net.miatech.beans.A2024Filter;
import net.miatech.beans.A720Filter;
import net.miatech.beans.PX040S01A1716Filter;

import net.miatech.beans.spring.implement.IServerSession;
import org.apache.log4j.Logger;

/**
 *
 * @author lmendoza
 */
public class ADJUsesDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public ADJUsesDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public ADJUsesDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A2024Filter> SearchADJUses(A2024Filter filter) throws SQLException, Exception {
        List<A2024Filter> lstRtn = new ArrayList<A2024Filter>(0);
        A2024Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP03622(?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.registerOutParameter(11, Types.INTEGER);
            cstmt01.registerOutParameter(12, Types.INTEGER);
            cstmt01.registerOutParameter(13, Types.INTEGER);
            cstmt01.registerOutParameter(14, Types.INTEGER);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setInt(2, filter.VP_FILTER);
            cstmt01.setString(3, filter.VP_FROM_FILER);
            cstmt01.setString(4, filter.VP_TO_FILTER);
            cstmt01.setString(5, filter.VP_BOLETO);
            cstmt01.setString(6, filter.VP_GRUPO);
            cstmt01.setString(7, filter.VP_TypeVoid);
            cstmt01.setString(8, filter.VP_TypeUse);
            cstmt01.setInt(9, filter.VP_TPCMBO);
            cstmt01.setString(10, filter.VP_IATA);

            cstmt01.setInt(11, filter.page.PAGNUM);
            cstmt01.setInt(12, filter.page.PAGROW);
            cstmt01.setInt(13, filter.page.TOTPAG);
            cstmt01.setInt(14, filter.page.TOTROW);

            cstmt01.execute();

            filter.page.PAGNUM = cstmt01.getInt(11);
            filter.page.PAGROW = cstmt01.getInt(12);
            filter.page.TOTPAG = cstmt01.getInt(13);
            filter.page.TOTROW = cstmt01.getInt(14);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {

                objRtn = new A2024Filter();
                objRtn.GRUPO = rs01.getString("GRUPO").trim();
                objRtn.A2024TRNC = rs01.getString("TRNC").trim();
                objRtn.A2024CIA = rs01.getString("CIA").trim();
                objRtn.A2024FORMA = rs01.getString("FORMA").trim();
                objRtn.A2024SERIE = rs01.getString("SERIE").trim();

                objRtn.A2024SEQ = rs01.getString("SEQ").trim();
                objRtn.A2024CUPON = rs01.getString("CUPON").trim();
                objRtn.A2024CORRL = rs01.getInt("CORRL");
                objRtn.A2024AGENT = rs01.getString("AGENT").trim();
                objRtn.A2024FECVTA = rs01.getString("FECVTA").trim();
                objRtn.A2024TTARJ = rs01.getString("TTARJ").trim();
                objRtn.A2024NTARJ = rs01.getString("NTARJ").trim();
                objRtn.A2024RFIC = rs01.getString("RFIC").trim();
                objRtn.A2024RFIS = rs01.getString("RFIS").trim();
                objRtn.A2024VRICOC = rs01.getString("VRICOC").trim();
                objRtn.A2024DESCRIP = rs01.getString("DESCRIP").trim();
                objRtn.A2024IATAUSU = rs01.getString("IATAUSU").trim();
                objRtn.A2024USRIN = rs01.getString("USRIN").trim();
                objRtn.A2024FECIN = rs01.getString("FECIN").trim();
                objRtn.SEQ = rs01.getString("CORRL").trim();
                objRtn.A2024ESTADO = rs01.getString("ESTADO").trim();
                objRtn.A2024CODER = rs01.getString("TICKET");
                objRtn.VP_TypeUse = rs01.getString("ESTTRX");
                objRtn.VP_TypeVoid = rs01.getString("TKTVOID");
                objRtn.VP_TPCMBO = rs01.getInt("TTRANS");
                objRtn.VP_TTRAX = rs01.getInt("TTRAX");
                objRtn.ESTA_TNU = rs01.getString("ESTTNU");
                objRtn.FBASIS = rs01.getString("FBORI1");
                objRtn.A1541FCONT = rs01.getString("FCONT");
                objRtn.A1541IDCON = rs01.getString("IDCON");
                objRtn.A2024FUENT = rs01.getString("FUENT");
                objRtn.A2024SFUEN = rs01.getString("SFUEN");
                objRtn.A2024PSVTA = rs01.getString("PSVTA");
                objRtn.A2024FECPRO = rs01.getString("FECPRO");
                if (objRtn.A2024ESTADO.equalsIgnoreCase("AN") || objRtn.A2024ESTADO.equalsIgnoreCase("OK")) {
                    objRtn.VP_Flag = false;
                    objRtn.VP_FlagDisabled = false;
                } else {
                    objRtn.VP_Flag = true;
                    objRtn.VP_FlagDisabled = true;
                }
                //objRtn.CANT_ROW = rs01.getInt("RN");

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

    public List<A720Filter> loadTicketDao(A720Filter filter) throws SQLException, Exception {
        List<A720Filter> lstRtn = new ArrayList<>(0);
        A720Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        //String SQLCLL01 = "{CALL PRAXIS.SQP00365(?,?,?,?,?)}";
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00365(?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, filter.strOption);
            cstmt01.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(3, filter.A720CIA);
            cstmt01.setString(4, filter.A720FORMA);
            cstmt01.setString(5, filter.A720SERIE);
            cstmt01.setString(6, filter.A720CARRIER);
            cstmt01.setString(7, filter.A720SEQ);
            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new A720Filter();

                objRtn.A720SEQ = rs01.getString("A720SEQ");
                objRtn.A720GRUPO = rs01.getString("A720GRUPO");
                objRtn.A720CIUEMI = rs01.getString("A720CIUEMI");
                objRtn.A720PAIVTA = rs01.getString("A720PAIVTA");
                objRtn.A720CIUVTA = rs01.getString("A720CIUVTA");
                objRtn.A720MONREG = rs01.getString("A720MONREG");
                objRtn.A720PAIS = rs01.getString("A720PAIS");
                objRtn.A720AGENTE = rs01.getString("A720AGENTE");
                objRtn.A720NVLO1 = rs01.getString("A720NVLO1");
                objRtn.A720FVLO1 = rs01.getString("A720FVLO1");

                objRtn.A720CARRN1 = rs01.getString("A720CARRN1");
                objRtn.A720TCAMB = rs01.getDouble("A720TCAMB");
                objRtn.A720FECVTA = rs01.getString("A720FECVTA");
                objRtn.A720TRNCU = rs01.getString("A720TRNCU");
                objRtn.A720TDOC = rs01.getString("A720TDOC");
                objRtn.A720TFORMA = rs01.getString("A720TFORMA");
                objRtn.A720FBST1 = rs01.getString("A720FBST1");
                objRtn.A720SUBPA1 = rs01.getString("A720SUBPA1");
                objRtn.A720RFIC = rs01.getString("A720RFIC");
                objRtn.A720MDATC = rs01.getString("A720MDATC");
                objRtn.A720TPTKT = rs01.getString("A720TPTKT");
                objRtn.A720FVLO2 = rs01.getString("A720FVLO2");
                objRtn.A720NSTOCK = rs01.getString("A720NSTOCK");
                objRtn.A720PNR = rs01.getString("A720PNR");
                objRtn.A720NBDA1 = rs01.getString("A720NBDA1");
                objRtn.A720CARRIER = rs01.getString("CARRIER");
                objRtn.A1541VCPVE = rs01.getDouble("A1541VCPVE");
                objRtn.A1541MDAVE = rs01.getString("A1541MDAVE");
                objRtn.A1541LCMVE = rs01.getDouble("A1541LCMVE");
                objRtn.A1541LSCMV = rs01.getDouble("A1541LSCMV");
                objRtn.A1541LYQVE = rs01.getDouble("A1541LYQVE");
                objRtn.A1541TCRVE = rs01.getDouble("A1541TCRVE");
                objRtn.A1541VCPRV = rs01.getDouble("A1541VCPRV");
                objRtn.A1541MREVE = rs01.getString("A1541MREVE");
                objRtn.A1541RCMVE = rs01.getDouble("A1541RCMVE");
                objRtn.A1541RSCMV = rs01.getDouble("A1541RSCMV");
                objRtn.A1541RYQVE = rs01.getDouble("A1541RYQVE");
                objRtn.A720FBASIS = rs01.getString("A720FBASIS");

                objRtn.A720GL = rs01.getString("VL_GL");
                objRtn.A720AR = rs01.getString("VL_AR");
                objRtn.A720AP = rs01.getString("VL_AP");
                objRtn.A720FCONT = rs01.getString("VL_FCONT");
                objRtn.A720HCONT = rs01.getString("VL_HCONT");
                objRtn.A720STATUS = rs01.getString("VL_STATUS");
                objRtn.A720MENSAJE = rs01.getString("VL_MENSAJE");
                /*NUEVOS PROCEOS*/
                objRtn.A720RUTA0 = rs01.getString("A720RUTA0");
                objRtn.A720RUTA1 = rs01.getString("A720RUTA1");
                objRtn.A720RUTA2 = rs01.getString("A720RUTA2");
                objRtn.A720RUTA3 = rs01.getString("A720RUTA3");
                objRtn.A720RUTA4 = rs01.getString("A720RUTA4");
                objRtn.A720CARRA1 = rs01.getString("A720CARRA1");
                objRtn.A720CARRA2 = rs01.getString("A720CARRA2");
                objRtn.A720CARRA3 = rs01.getString("A720CARRA3");
                objRtn.A720CARRA4 = rs01.getString("A720CARRA4");
                objRtn.A720NVLO1 = rs01.getString("A720NVLO1DES");
                objRtn.A720NVLO2 = rs01.getString("A720NVLO2");
                objRtn.A720NVLO3 = rs01.getString("A720NVLO3");
                objRtn.A720NVLO4 = rs01.getString("A720NVLO4");
                /*FINAL DE LOS CAMBIOS*/

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

    public List<A1939Filter> loadAccountNumber(A1939Filter filter) throws SQLException, Exception {
        List<A1939Filter> lstRtn = new ArrayList<A1939Filter>(0);
        A1939Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00369(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
        ///String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00369(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);
            cstmt01.registerOutParameter(18, Types.CHAR);
            cstmt01.registerOutParameter(19, Types.CHAR);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.VL_CIA);
            cstmt01.setString(3, filter.VL_FORMA);
            cstmt01.setString(4, filter.VL_SERIE);
            cstmt01.setString(5, filter.VL_GRUPO);
            cstmt01.setString(6, filter.VL_TCAMBIO);
            cstmt01.setString(7, filter.VL_TDOC);
            cstmt01.setString(8, filter.VL_TFOR);
            cstmt01.setString(9, filter.VL_CUPON1);
            cstmt01.setString(10, filter.VL_CUPON2);
            cstmt01.setString(11, filter.VL_CUPON3);
            cstmt01.setString(12, filter.VL_TTARJ);
            cstmt01.setString(13, filter.VL_NTARJ);
            cstmt01.setString(14, filter.VL_RFIC);
            cstmt01.setString(15, filter.VL_RFIS);
            cstmt01.setString(16, filter.VL_VRICOC);
            cstmt01.setString(17, filter.VL_MDA);
            cstmt01.setString(18, filter.VP_ERROR);
            cstmt01.setString(19, filter.VP_MENSAJE);
            cstmt01.setString(20, filter.VL_OPTION);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new A1939Filter();
                objRtn.CTA = rs01.getString("VL_CTA").trim();
                objRtn.LIB1 = rs01.getString("VL_LIB1").trim();
                objRtn.LIB1CIA = rs01.getString("VL_LIB1CIA").trim();
                objRtn.CLIENT = rs01.getString("VL_CLIENT").trim();
                objRtn.DIRECC = rs01.getString("VL_DIRECC").trim();
                objRtn.PROVEE = rs01.getString("VL_PROVEE").trim();
                objRtn.ORAC = rs01.getString("VL_TD_ORAC").trim();
                objRtn.COMB = rs01.getDouble("VL_COMB");
                objRtn.TITU = rs01.getString("VL_TITU").trim();
                objRtn.SURC = rs01.getString("VL_SURC").trim();
                objRtn.CTAC = rs01.getString("VL_CTAC").trim();
                objRtn.TITUC = rs01.getString("VL_TITUC").trim();
                objRtn.CTAP = rs01.getString("VL_CTAP").trim();
                objRtn.TITUP = rs01.getString("VL_TITUP").trim();
                objRtn.LIB1P = rs01.getString("VL_LIB1P").trim();
                objRtn.CTAPC = rs01.getString("VL_CTAPC").trim();
                objRtn.TITUPC = rs01.getString("VL_TITUPC").trim();
                objRtn.LIB1PC = rs01.getString("VL_LIB1PC").trim();
                objRtn.CTAPAR = rs01.getString("VL_CTAPAR").trim();
                objRtn.TITUPAR = rs01.getString("VL_TITUPAR").trim();
                objRtn.LIB1PAR = rs01.getString("VL_LIB1PAR").trim();
                objRtn.CLIENTAR = rs01.getString("VL_CLIENTAR").trim();
                objRtn.DIRECCAR = rs01.getString("VL_DIRECCAR").trim();
                objRtn.ORACAR = rs01.getString("VL_TD_ORACAR").trim();
                objRtn.LIB1C = rs01.getString("VL_LIB1C").trim();
                //
                objRtn.VL_CTA_PROV_AR1 = rs01.getString("VL_CTA_PROV_AR1");
                objRtn.VL_CTA_PROV_AR2 = rs01.getString("VL_CTA_PROV_AR2");
                objRtn.VL_CTA_PROV_AP = rs01.getString("VL_CTA_PROV_AP");
                objRtn.VL_TITU_AR1 = rs01.getString("VL_CLIE_AR1");
                objRtn.VL_TITU_AR2 = rs01.getString("VL_CLIE_AR2");
                objRtn.VL_TITU_AP = rs01.getString("VL_CLIE_AP");
                //

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

    public A2024Filter accountADJMaintance(PX040S01A1716Filter gridDataTktAccountingDEBE, A2024Filter filter, String strOption, Integer i) throws SQLException, Exception {
        CallableStatement cs = null;
        ResultSet rst = null;
        String strSQL;

        Connection cnx = null;
        try {
            strSQL = "{CALL " + session.getMainLibrary() + ".SQP00375(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,? ,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(strSQL);
            cs.setInt(1, i);
            cs.setString(2, filter.A2024GRUPO);
            cs.setString(3, filter.A2024TRNC);
            cs.setString(4, filter.CIA);
            cs.setString(5, filter.FORMA);
            cs.setString(6, filter.SERIE);
            //cs.setString(7, "00");//00filter.SEQ
            // cs.setString(7, filter.SEQ);
            cs.setString(7, gridDataTktAccountingDEBE.A1716SEQT);
            cs.setString(8, gridDataTktAccountingDEBE.A1716FUENT);
            cs.setString(9, filter.A2024PSVTA);
            cs.setString(10, gridDataTktAccountingDEBE.A1716SUBFU);
            cs.setString(11, filter.A2024TFUEN);
            cs.setString(12, filter.A2024BANCO);
            cs.setString(13, filter.A2024AGENT);
            cs.setString(14, filter.A2024CSABR);
            cs.setString(15, filter.A2024FPROC);//SE CAE
            //cs.setString(16, filter.A2024MDALOC);
            cs.setString(16, gridDataTktAccountingDEBE.A1716CUR);
            cs.setDouble(17, filter.A2024TCAMB);
            cs.setString(18, filter.A2024FECVTA);
            cs.setString(19, filter.A2024TDOC);
            cs.setString(20, filter.A2024TFOR);
            cs.setString(21, gridDataTktAccountingDEBE.CONP1);
            cs.setString(22, gridDataTktAccountingDEBE.CONP2);
            cs.setString(23, gridDataTktAccountingDEBE.CONP3);
            cs.setString(24, filter.A2024TTARJ);
            cs.setString(25, filter.A2024NTARJ);
            cs.setString(26, filter.A2024RFIC);
            cs.setString(27, filter.A2024RFIS);
            cs.setDouble(28, gridDataTktAccountingDEBE.A1716ACTIV);
            cs.setDouble(29, gridDataTktAccountingDEBE.A1716PASIV);
            cs.setDouble(30, gridDataTktAccountingDEBE.ACTIV2);
            cs.setDouble(31, gridDataTktAccountingDEBE.PASIV2);
            cs.setString(32, filter.A2024TASIVA);//*****
            cs.setString(33, filter.A2024FOPIVA); //FOPIVA vacio
            cs.setString(34, filter.A2024FOPENC);
            cs.setString(35, filter.A2024VRICOC);
            cs.setString(36, filter.A2024PFCLOC); //PFCLOC vacio
            cs.setString(37, filter.A2024PNRLOC);
            cs.setString(38, gridDataTktAccountingDEBE.A1716CUENT);
            cs.setString(39, gridDataTktAccountingDEBE.LIB1);
            cs.setString(40, gridDataTktAccountingDEBE.LIB1CIA);
            cs.setString(41, (gridDataTktAccountingDEBE.A1716CLIEN).trim());
            cs.setString(42, gridDataTktAccountingDEBE.A1716DIREC);
            cs.setString(43, gridDataTktAccountingDEBE.A1716PROV);
            cs.setString(44, gridDataTktAccountingDEBE.ORAC);
            cs.setDouble(45, gridDataTktAccountingDEBE.COMB);
            cs.setString(46, (gridDataTktAccountingDEBE.A1716TITU).trim());
            cs.setString(47, gridDataTktAccountingDEBE.A1716FUENT);
            cs.setString(48, gridDataTktAccountingDEBE.CTAC);///aca ver
            cs.setString(49, gridDataTktAccountingDEBE.TITUC);
            cs.setString(50, gridDataTktAccountingDEBE.LIB1C);
            cs.setString(51, gridDataTktAccountingDEBE.CTAP);
            cs.setString(52, gridDataTktAccountingDEBE.TITUP);
            cs.setString(53, gridDataTktAccountingDEBE.LIB1P);
            cs.setString(54, gridDataTktAccountingDEBE.CTAPC);
            cs.setString(55, gridDataTktAccountingDEBE.TITUPC);
            cs.setString(56, gridDataTktAccountingDEBE.LIB1PC);/*VERFICAR*/

            cs.setString(57, gridDataTktAccountingDEBE.CTAPAR);
            cs.setString(58, gridDataTktAccountingDEBE.TITUPAR);
            cs.setString(59, gridDataTktAccountingDEBE.LIB1PAR);
            cs.setString(60, gridDataTktAccountingDEBE.CLIENTAR);
            cs.setString(61, gridDataTktAccountingDEBE.DIRECCAR);
            cs.setString(62, gridDataTktAccountingDEBE.ORACAR);
            cs.setString(63, filter.A2024IATAUSU);
            cs.setString(64, session.getUserView().getUserInfo().USR);
            cs.setString(65, filter.A2024DESCRIP);
            cs.setInt(66, filter.VP_FILTER);
            cs.setString(67, gridDataTktAccountingDEBE.A1716MARCA);
            cs.setString(68, gridDataTktAccountingDEBE.A1716FILE);
            cs.setString(69, gridDataTktAccountingDEBE.A1716FP);
            cs.setString(70, gridDataTktAccountingDEBE.A1716ORIG);
            //cs.setString(71, filter.A2024CUPON);
            cs.setString(71, gridDataTktAccountingDEBE.A1716CUPON);
            cs.setString(72, gridDataTktAccountingDEBE.A1716MODO);
            cs.setString(73, filter.VP_TypeUse);
            cs.setString(74, filter.VP_TypeVoid);
            cs.setString(75, session.getUserView().getCustomerInfo().CCUST);
            cs.setDouble(76, filter.A1541VCPVE);
            cs.setString(77, filter.A1541MDAVE);
            cs.setDouble(78, filter.A1541LCMVE);
            cs.setDouble(79, filter.A1541LSCMV);
            cs.setDouble(80, filter.A1541LYQVE);

            cs.setDouble(81, filter.A1541TCRVE);
            cs.setDouble(82, filter.A1541VCPRV);
            cs.setString(83, filter.A1541MREVE);
            cs.setDouble(84, filter.A1541RCMVE);
            cs.setDouble(85, filter.A1541RSCMV);
            cs.setDouble(86, filter.A1541RYQVE);
            cs.setInt(87, filter.VP_TPCMBO);
            //******///
            cs.setString(88, filter.ESTA_TNU);
            cs.setString(89, filter.FBASIS);
            cs.setString(90, filter.REFE);
            cs.setString(91, filter.TKTSEQ);
            ////****///
            cs.execute();

            rst = cs.getResultSet();
            while (rst.next()) {
                filter.dbException.SQLCODE = rst.getString("VSQLCODE");
                filter.dbException.MESSAGE = rst.getString("VMESSAGE");
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

        return filter;
    }

    public List<A2024Filter> lstsearch(A2024Filter filter) throws SQLException, Exception {
        List<A2024Filter> lstRtn = new ArrayList<>(0);
        A2024Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00378(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.registerOutParameter(11, Types.INTEGER);
            cstmt01.registerOutParameter(12, Types.INTEGER);
            cstmt01.registerOutParameter(13, Types.INTEGER);
            cstmt01.registerOutParameter(14, Types.INTEGER);

            cstmt01.setInt(1, filter.VP_FILTER);
            cstmt01.setString(2, filter.VP_FROM_FILER);
            cstmt01.setString(3, filter.VP_TO_FILTER);
            //cstmt01.setString(4, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setInt(4, filter.A2024CORRL);
            cstmt01.setString(5, filter.VP_CIA);
            cstmt01.setString(6, filter.VP_FORMA);
            cstmt01.setString(7, filter.VP_SERIE);
            cstmt01.setString(8, filter.VP_GRUPO);
            if (filter.VP_FILTER.equals(4)) {
                cstmt01.setString(9, filter.A2024SEQ);
            } else {
                cstmt01.setString(9, "00");//SEC
            }
            cstmt01.setInt(10, filter.VP_TPCMBO);//SEC

            cstmt01.setInt(11, filter.page.PAGNUM);
            cstmt01.setInt(12, filter.page.PAGROW);
            cstmt01.setInt(13, filter.page.TOTPAG);
            cstmt01.setInt(14, filter.page.TOTROW);
            cstmt01.setString(15, filter.VP_TypeVoid);
            cstmt01.setString(16, filter.VP_TypeUse);

            cstmt01.execute(); //hola

            filter.page.PAGNUM = cstmt01.getInt(11);
            filter.page.PAGROW = cstmt01.getInt(12);
            filter.page.TOTPAG = cstmt01.getInt(13);
            filter.page.TOTROW = cstmt01.getInt(14);

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new A2024Filter();
                objRtn.GRUPO = rs01.getString("GRUPO").trim();
                objRtn.A2024TRNC = rs01.getString("TRNC").trim();
                objRtn.A2024CIA = rs01.getString("CIA").trim();
                objRtn.A2024FORMA = rs01.getString("FORMA").trim();
                objRtn.A2024SERIE = rs01.getString("SERIE").trim();

                objRtn.A2024SEQ = rs01.getString("SEQ").trim();
                objRtn.A2024CUPON = rs01.getString("CUPON").trim();
                objRtn.A2024CORRL = rs01.getInt("CORRL");
                objRtn.A2024AGENT = rs01.getString("AGENT").trim();
                objRtn.A2024FECVTA = rs01.getString("FECVTA").trim();
                objRtn.A2024TTARJ = rs01.getString("TTARJ").trim();
                objRtn.A2024NTARJ = rs01.getString("NTARJ").trim();
                objRtn.A2024RFIC = rs01.getString("RFIC").trim();
                objRtn.A2024RFIS = rs01.getString("RFIS").trim();
                objRtn.A2024VRICOC = rs01.getString("VRICOC").trim();
                objRtn.A2024DESCRIP = rs01.getString("DESCRIP").trim();
                objRtn.A2024IATAUSU = rs01.getString("IATAUSU").trim();
                objRtn.A2024USRIN = rs01.getString("USRIN").trim();
                objRtn.A2024FECIN = rs01.getString("FECIN").trim();
                objRtn.SEQ = rs01.getString("CORRL").trim();
                objRtn.A2024ESTADO = rs01.getString("ESTADO").trim();
                objRtn.A2024CODER = rs01.getString("TICKET");
                objRtn.VP_TypeUse = rs01.getString("ESTTRX");
                objRtn.VP_TypeVoid = rs01.getString("TKTVOID");
                objRtn.VP_TPCMBO = rs01.getInt("TTRANS");
                objRtn.VP_TTRAX = rs01.getInt("TTRAX");
                objRtn.ESTA_TNU = rs01.getString("ESTTNU");
                objRtn.FBASIS = rs01.getString("FBORI1");
                objRtn.A1541FCONT = rs01.getString("FCONT");
                objRtn.A1541IDCON = rs01.getString("IDCON");
                if (filter.VP_FILTER.equals(1) || filter.VP_FILTER.equals(2) || filter.VP_FILTER.equals(3)) {
                    objRtn.SQUARE = rs01.getDouble("SQUARE");
                    objRtn.CREREV = rs01.getDouble("CREREV");
                    objRtn.DEBREV = rs01.getDouble("DEBREV");
                    objRtn.DEBLOC = rs01.getDouble("DEBLOC");
                    objRtn.CRELOC = rs01.getDouble("CRELOC");
                    objRtn.SQUARELOC = rs01.getDouble("SQUARELOC");

                }

                if (filter.VP_FILTER != 5 && filter.VP_FILTER != 6 && filter.VP_FILTER != 7 && filter.VP_FILTER != 8) {
                    objRtn.A2024FUENT = rs01.getString("FUENT");
                    objRtn.A2024SFUEN = rs01.getString("SFUEN");
                    objRtn.A2024PSVTA = rs01.getString("PSVTA");
                }
                if (filter.VP_FILTER != 4 && filter.VP_FILTER != 5 && filter.VP_FILTER != 6 && filter.VP_FILTER != 7 && filter.VP_FILTER != 8) {
                    objRtn.A2024FECPRO = rs01.getString("FECPRO");
                }
                if (filter.VP_FILTER == 4) {
                    objRtn.A2024CTA = rs01.getString("CTA").trim();
                    objRtn.A2024MDALOC = rs01.getString("MDALOC").trim();
                    objRtn.A2024DEBLOC = rs01.getDouble("DEBLOC");
                    objRtn.A2024CRELOC = rs01.getDouble("CRELOC");
                    objRtn.A2024DEBREV = rs01.getDouble("DEBREV");
                    objRtn.A2024CREREV = rs01.getDouble("CREREV");
                    objRtn.A2024TITU = rs01.getString("TITU").trim();
                    objRtn.A2024CLIENT = rs01.getString("CLIENT").trim();
                    objRtn.A2024PROVEE = rs01.getString("PROVEE").trim();
                    objRtn.A2024TDOC = rs01.getString("TDOC").trim();
                    objRtn.A2024LIB1 = rs01.getString("LIB1");
                    objRtn.MARCA = rs01.getString("MARCA");
                    objRtn.CONP1 = rs01.getString("CONP1");
                    objRtn.CONP2 = rs01.getString("CONP2");
                    objRtn.REFE = rs01.getString("TKTASOC");
                    objRtn.TKTSEQ = rs01.getString("ASOCSEQ");

                }
                if (filter.VP_FILTER == 5 || filter.VP_FILTER == 4) {
                    objRtn.A1541VCPVE = rs01.getDouble("A1541VCPVE");
                    objRtn.A1541MDAVE = rs01.getString("A1541MDAVE");
                    objRtn.A1541LCMVE = rs01.getDouble("A1541LCMVE");
                    objRtn.A1541LSCMV = rs01.getDouble("A1541LSCMV");
                    objRtn.A1541LYQVE = rs01.getDouble("A1541LYQVE");
                    /* **campos rev zpp*/
                    objRtn.A1541TCRVE = rs01.getDouble("A1541TCRVE");
                    objRtn.A1541VCPRV = rs01.getDouble("A1541VCPRV");
                    objRtn.A1541MREVE = rs01.getString("A1541MREVE");
                    objRtn.A1541RCMVE = rs01.getDouble("A1541RCMVE");
                    objRtn.A1541RSCMV = rs01.getDouble("A1541RSCMV");
                    objRtn.A1541RYQVE = rs01.getDouble("A1541RYQVE");
                    /*campos nuevos zpp*/
                    objRtn.ORI = rs01.getString("CDEPART");
                    objRtn.DESTI = rs01.getString("CARRIVA");
                    objRtn.CARR = rs01.getString("CARR");
                    objRtn.NVLO = rs01.getString("NFLIGHT");
                    objRtn.AMOUNT = rs01.getDouble("AMOUNTLOC");
                    objRtn.AMOUNTRV = rs01.getDouble("AMOUNTRV");
                    objRtn.TKTDATE = rs01.getString("FEUSO");
                }

                if (objRtn.A2024ESTADO.equalsIgnoreCase("AN") || objRtn.A2024ESTADO.equalsIgnoreCase("OK")) {
                    objRtn.VP_Flag = false;
                    objRtn.VP_FlagDisabled = false;
                } else {
                    objRtn.VP_Flag = true;
                    objRtn.VP_FlagDisabled = true;
                }

                System.out.println("objRtn.A2024ESTADO : " + objRtn.A2024ESTADO);
                objRtn.page.PAGNUM = filter.page.PAGNUM;
                objRtn.page.PAGROW = filter.page.PAGROW;
                objRtn.page.TOTPAG = filter.page.TOTPAG;
                objRtn.page.TOTROW = filter.page.TOTROW;///

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

    public String insertAprobList(ArrayList<A2024Filter> filter) throws SQLException, Exception {
        CallableStatement cs = null;
        ResultSet rst = null;
        String strSQL;
        String STR_RESULT = "";

        session.getCNXIBMDB2().open();
        try {
            String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00575(?,?,?,?,?,?,?,?)}";
            cs = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);
            for (A2024Filter obj : filter) {

                cs.setInt(1, obj.VP_FILTER);
                cs.setString(2, obj.A2024CIA);
                cs.setString(3, obj.A2024FORMA);
                cs.setString(4, obj.A2024SERIE);
                cs.setInt(5, obj.A2024CORRL);
                cs.setString(6, session.getUserView().getUserInfo().USR);
                cs.setString(7, obj.A2024CUPON);
                cs.setString(8, obj.A2024SEQ);

                cs.execute();
            }
            rst = cs.getResultSet();

            while (rst.next()) {
                STR_RESULT = rst.getString("VMESSAGE");
            }
            cs.close();
        } catch (SQLException e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            STR_RESULT = e.getMessage();
        } catch (Exception e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
            STR_RESULT = e.getMessage();
        } finally {
            strSQL = null;
            session.getCNXIBMDB2().close();
        }

        return STR_RESULT;
    }

    public A2024Filter lstMaintance(A2024Filter filter) throws SQLException, Exception {
        CallableStatement cs = null;
        A2024Filter result = new A2024Filter();
        ResultSet rst = null;
        String strSQL;

        Connection cnx = null;
        try {
            strSQL = "{CALL " + session.getMainLibrary() + ".SQP00575(?,?,?,?,?,?,?,?)}";
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(strSQL);

            cs.setInt(1, filter.VP_FILTER);
            cs.setString(2, filter.A2024CIA);
            cs.setString(3, filter.A2024FORMA);
            cs.setString(4, filter.A2024SERIE);
            cs.setInt(5, filter.A2024CORRL);
            cs.setString(6, session.getUserView().getUserInfo().USR);
            cs.setString(7, filter.A2024CUPON);
            cs.setString(8, filter.A2024SEQ);
            cs.execute(); //hola

            rst = cs.getResultSet();
            while (rst.next()) {
                result.dbException.MESSAGE = rst.getString("VMESSAGE");
                result.dbException.SQLCODE = rst.getString("VSQLCODE");
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

        return result;
    }

    public A2024Filter lstdelete(A2024Filter filter) throws SQLException, Exception {
        CallableStatement cs = null;
        ResultSet rst = null;
        String strSQL;
        A2024Filter result = new A2024Filter();

        Connection cnx = null;
        try {
            strSQL = "{CALL " + session.getMainLibrary() + ".SQP00575(?,?,?,?,?,?,?,?)}";
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(strSQL);

            cs.setInt(1, filter.VP_FILTER);
            cs.setString(2, filter.VP_CIA);
            cs.setString(3, filter.VP_FORMA);
            cs.setString(4, filter.VP_SERIE);
            cs.setInt(5, filter.VP_CORREL);
            //cs.setString(6, "00");//SEC
            cs.setString(6, session.getUserView().getUserInfo().USR);
            cs.setString(7, filter.A2024CUPON);
            cs.setString(8, filter.A2024SEQ);
            cs.execute(); //hola

            rst = cs.getResultSet();
            while (rst.next()) {
                result.dbException.MESSAGE = rst.getString("VMESSAGE");
                result.dbException.SQLCODE = rst.getString("VSQLCODE");
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

        return result;
    }

    public List<PX040S01A1716Filter> loadPX040S01A1716(PX040S01A1716Filter filter) throws SQLException, Exception {
        List<PX040S01A1716Filter> lstRtn = new ArrayList<>(0);
        PX040S01A1716Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null, rs02 = null, rs03 = null, rs04 = null, rs05 = null, rs06 = null, rs07 = null, rs08 = null, rs09 = null, rs10 = null;

        //String SQLCLL01 = "{CALL PX040S01A1716(?,?,?,?)}";
        // String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00584ZZ(?,?,?,?)}";
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00584ZW(?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, filter.VP_A1716CCUST);
            cstmt01.setString(2, filter.VP_A1716CIA);
            cstmt01.setString(3, filter.VP_A1716FORMA);
            cstmt01.setString(4, filter.VP_A1716SERIE);
            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new PX040S01A1716Filter();
                objRtn.A1716CCUST = rs01.getString("A1716CCUST");
                objRtn.A1716CIA = rs01.getString("A1716CIA");
                objRtn.A1716FORMA = rs01.getString("A1716FORMA");
                objRtn.A1716SERIE = rs01.getString("A1716SERIE");
                objRtn.A1716CUPON = rs01.getString("A1716CUPON");
                objRtn.A1716SEQ = rs01.getString("A1716SEQ");

                objRtn.A1716MODO = rs01.getString("A1716MODO");
                objRtn.A1716FUENT = rs01.getString("A1716FUENT");
                objRtn.A1716SUBFU = rs01.getString("A1716SUBFU");
                objRtn.A1716FP = rs01.getString("A1716FP");

                objRtn.A1716FUENT = rs01.getString("A1716FUENT");
                objRtn.A1716ESTAD = rs01.getString("A1716ESTAD");
                objRtn.A1716FFILE = rs01.getString("A1716FFILE");
                objRtn.A1716FPRO = rs01.getString("A1716FPRO");
                objRtn.A1716GRUPO = rs01.getString("A1716GRUPO");
                objRtn.A1716CUR = rs01.getString("A1716CUR");
                objRtn.A1716ACTIV = rs01.getDouble("A1716ACTIV");
                objRtn.A1716PASIV = rs01.getDouble("A1716PASIV");
                objRtn.A1716CUENT = rs01.getString("A1716CUENT");
                objRtn.A1716SUBCU = rs01.getString("A1716SUBCU");
                objRtn.A1716IDFIL = rs01.getString("A1716IDFIL");
                objRtn.A1716TIDOC = rs01.getString("A1716TIDOC");
                objRtn.A1716ORIG = rs01.getString("A1716ORIG");
                objRtn.A1716FCONT = rs01.getString("A1716FCONT");

                objRtn.A1716TITU = rs01.getString("A1716TITU");

                objRtn.A1716COPE = rs01.getString("A1716COPE");
                objRtn.A1716PROV = rs01.getString("A1716PROV");

                //ZPP
                objRtn.A1716FILE = rs01.getString("A1716FILE");
                objRtn.A1716CLIEN = rs01.getString("A1716CLIEN");
                objRtn.A1716DIREC = rs01.getString("A1716DIREC");
                objRtn.A1716FOPI = rs01.getString("A1716FOPI");
                objRtn.A1716SEQT = rs01.getString("A1716SEQT");

                objRtn.TCOL = rs01.getString("TCOL");
                /*
                 if(objRtn.A1716CIA.length() >= 5 && objRtn.A1716CIA.substring(0, 5).equals("TOTAL")){
                    
                 }
                 */
                if (objRtn.A1716MODO.isEmpty()) {
                    objRtn.A1716MODO = objRtn.A1716CIA; //Format example: "TOTAL AR S100-499:".
                }

                lstRtn.add(objRtn);
            }
            if (cstmt01.getMoreResults()) {
                rs02 = cstmt01.getResultSet();
                while (rs02.next()) {
                    objRtn = new PX040S01A1716Filter();
                    objRtn.A1716CCUST = rs02.getString("A1716CCUST");
                    objRtn.A1716CIA = rs02.getString("A1716CIA");
                    objRtn.A1716FORMA = rs02.getString("A1716FORMA");
                    objRtn.A1716SERIE = rs02.getString("A1716SERIE");
                    objRtn.A1716CUPON = rs02.getString("A1716CUPON");
                    objRtn.A1716SEQ = rs02.getString("A1716SEQ");

                    objRtn.A1716MODO = rs02.getString("A1716MODO");
                    objRtn.A1716FUENT = rs02.getString("A1716FUENT");
                    objRtn.A1716SUBFU = rs02.getString("A1716SUBFU");
                    objRtn.A1716FP = rs02.getString("A1716FP");

                    objRtn.A1716FUENT = rs02.getString("A1716FUENT");
                    objRtn.A1716ESTAD = rs02.getString("A1716ESTAD");
                    objRtn.A1716FFILE = rs02.getString("A1716FFILE");
                    objRtn.A1716FPRO = rs02.getString("A1716FPRO");
                    objRtn.A1716GRUPO = rs02.getString("A1716GRUPO");
                    objRtn.A1716CUR = rs02.getString("A1716CUR");
                    objRtn.A1716ACTIV = rs02.getDouble("A1716ACTIV");
                    objRtn.A1716PASIV = rs02.getDouble("A1716PASIV");
                    objRtn.A1716CUENT = rs02.getString("A1716CUENT");
                    objRtn.A1716SUBCU = rs02.getString("A1716SUBCU");
                    objRtn.A1716IDFIL = rs02.getString("A1716IDFIL");
                    objRtn.A1716TIDOC = rs02.getString("A1716TIDOC");
                    objRtn.A1716ORIG = rs02.getString("A1716ORIG");
                    objRtn.A1716FCONT = rs02.getString("A1716FCONT");

                    objRtn.A1716TITU = rs02.getString("A1716TITU");

                    objRtn.A1716COPE = rs02.getString("A1716COPE");
                    objRtn.A1716PROV = rs02.getString("A1716PROV");

                    objRtn.TCOL = rs02.getString("TCOL");
                    /*
                     if(objRtn.A1716CIA.length() >= 5 && objRtn.A1716CIA.substring(0, 5).equals("TOTAL")){

                     }
                     */
                    if (objRtn.A1716MODO.isEmpty()) {
                        objRtn.A1716MODO = objRtn.A1716CIA; //Format example: "TOTAL AR S100-499:".
                    }

                    lstRtn.add(objRtn);
                }
                if (cstmt01.getMoreResults()) {
                    rs03 = cstmt01.getResultSet();
                    while (rs03.next()) {
                        objRtn = new PX040S01A1716Filter();
                        objRtn.A1716CCUST = rs03.getString("A1716CCUST");
                        objRtn.A1716CIA = rs03.getString("A1716CIA");
                        objRtn.A1716FORMA = rs03.getString("A1716FORMA");
                        objRtn.A1716SERIE = rs03.getString("A1716SERIE");
                        objRtn.A1716CUPON = rs03.getString("A1716CUPON");
                        objRtn.A1716SEQ = rs03.getString("A1716SEQ");

                        objRtn.A1716MODO = rs03.getString("A1716MODO");
                        objRtn.A1716FUENT = rs03.getString("A1716FUENT");
                        objRtn.A1716SUBFU = rs03.getString("A1716SUBFU");
                        objRtn.A1716FP = rs03.getString("A1716FP");

                        objRtn.A1716FUENT = rs03.getString("A1716FUENT");
                        objRtn.A1716ESTAD = rs03.getString("A1716ESTAD");
                        objRtn.A1716FFILE = rs03.getString("A1716FFILE");
                        objRtn.A1716FPRO = rs03.getString("A1716FPRO");
                        objRtn.A1716GRUPO = rs03.getString("A1716GRUPO");
                        objRtn.A1716CUR = rs03.getString("A1716CUR");
                        objRtn.A1716ACTIV = rs03.getDouble("A1716ACTIV");
                        objRtn.A1716PASIV = rs03.getDouble("A1716PASIV");
                        objRtn.A1716CUENT = rs03.getString("A1716CUENT");
                        objRtn.A1716SUBCU = rs03.getString("A1716SUBCU");
                        objRtn.A1716IDFIL = rs03.getString("A1716IDFIL");
                        objRtn.A1716TIDOC = rs03.getString("A1716TIDOC");
                        objRtn.A1716ORIG = rs03.getString("A1716ORIG");
                        objRtn.A1716FCONT = rs03.getString("A1716FCONT");

                        objRtn.A1716TITU = rs03.getString("A1716TITU");

                        objRtn.A1716COPE = rs03.getString("A1716COPE");
                        objRtn.A1716PROV = rs03.getString("A1716PROV");

                        objRtn.TCOL = rs03.getString("TCOL");
                        /*
                         if(objRtn.A1716CIA.length() >= 5 && objRtn.A1716CIA.substring(0, 5).equals("TOTAL")){

                         }
                         */
                        if (objRtn.A1716MODO.isEmpty()) {
                            objRtn.A1716MODO = objRtn.A1716CIA; //Format example: "TOTAL AR S100-499:".
                        }

                        lstRtn.add(objRtn);
                    }
                    if (cstmt01.getMoreResults()) {
                        rs04 = cstmt01.getResultSet();
                        while (rs04.next()) {
                            objRtn = new PX040S01A1716Filter();
                            objRtn.A1716CCUST = rs04.getString("A1716CCUST");
                            objRtn.A1716CIA = rs04.getString("A1716CIA");
                            objRtn.A1716FORMA = rs04.getString("A1716FORMA");
                            objRtn.A1716CUPON = rs04.getString("A1716CUPON");
                            objRtn.A1716SERIE = rs04.getString("A1716SERIE");
                            objRtn.A1716SEQ = rs04.getString("A1716SEQ");

                            objRtn.A1716MODO = rs04.getString("A1716MODO");
                            objRtn.A1716FUENT = rs04.getString("A1716FUENT");
                            objRtn.A1716SUBFU = rs04.getString("A1716SUBFU");
                            objRtn.A1716FP = rs04.getString("A1716FP");

                            objRtn.A1716FUENT = rs04.getString("A1716FUENT");
                            objRtn.A1716ESTAD = rs04.getString("A1716ESTAD");
                            objRtn.A1716FFILE = rs04.getString("A1716FFILE");
                            objRtn.A1716FPRO = rs04.getString("A1716FPRO");
                            objRtn.A1716GRUPO = rs04.getString("A1716GRUPO");
                            objRtn.A1716CUR = rs04.getString("A1716CUR");
                            objRtn.A1716ACTIV = rs04.getDouble("A1716ACTIV");
                            objRtn.A1716PASIV = rs04.getDouble("A1716PASIV");
                            objRtn.A1716CUENT = rs04.getString("A1716CUENT");
                            objRtn.A1716SUBCU = rs04.getString("A1716SUBCU");
                            objRtn.A1716IDFIL = rs04.getString("A1716IDFIL");
                            objRtn.A1716TIDOC = rs04.getString("A1716TIDOC");
                            objRtn.A1716ORIG = rs04.getString("A1716ORIG");
                            objRtn.A1716FCONT = rs04.getString("A1716FCONT");

                            objRtn.A1716TITU = rs04.getString("A1716TITU");

                            objRtn.A1716COPE = rs04.getString("A1716COPE");
                            objRtn.A1716PROV = rs04.getString("A1716PROV");

                            objRtn.TCOL = rs04.getString("TCOL");
                            /*
                             if(objRtn.A1716CIA.length() >= 5 && objRtn.A1716CIA.substring(0, 5).equals("TOTAL")){

                             }
                             */
                            if (objRtn.A1716MODO.isEmpty()) {
                                objRtn.A1716MODO = objRtn.A1716CIA; //Format example: "TOTAL AR S100-499:".
                            }

                            lstRtn.add(objRtn);
                        }
                        if (cstmt01.getMoreResults()) {
                            rs05 = cstmt01.getResultSet();
                            while (rs05.next()) {
                                objRtn = new PX040S01A1716Filter();
                                objRtn.A1716CCUST = rs05.getString("A1716CCUST");
                                objRtn.A1716CIA = rs05.getString("A1716CIA");
                                objRtn.A1716FORMA = rs05.getString("A1716FORMA");
                                objRtn.A1716SERIE = rs05.getString("A1716SERIE");
                                objRtn.A1716CUPON = rs05.getString("A1716CUPON");
                                objRtn.A1716SEQ = rs05.getString("A1716SEQ");

                                objRtn.A1716MODO = rs05.getString("A1716MODO");
                                objRtn.A1716FUENT = rs05.getString("A1716FUENT");
                                objRtn.A1716SUBFU = rs05.getString("A1716SUBFU");
                                objRtn.A1716FP = rs05.getString("A1716FP");

                                objRtn.A1716FUENT = rs05.getString("A1716FUENT");
                                objRtn.A1716ESTAD = rs05.getString("A1716ESTAD");
                                objRtn.A1716FFILE = rs05.getString("A1716FFILE");
                                objRtn.A1716FPRO = rs05.getString("A1716FPRO");
                                objRtn.A1716GRUPO = rs05.getString("A1716GRUPO");
                                objRtn.A1716CUR = rs05.getString("A1716CUR");
                                objRtn.A1716ACTIV = rs05.getDouble("A1716ACTIV");
                                objRtn.A1716PASIV = rs05.getDouble("A1716PASIV");
                                objRtn.A1716CUENT = rs05.getString("A1716CUENT");
                                objRtn.A1716SUBCU = rs05.getString("A1716SUBCU");
                                objRtn.A1716IDFIL = rs05.getString("A1716IDFIL");
                                objRtn.A1716TIDOC = rs05.getString("A1716TIDOC");
                                objRtn.A1716ORIG = rs05.getString("A1716ORIG");
                                objRtn.A1716FCONT = rs05.getString("A1716FCONT");

                                objRtn.A1716TITU = rs05.getString("A1716TITU");

                                objRtn.A1716COPE = rs05.getString("A1716COPE");
                                objRtn.A1716PROV = rs05.getString("A1716PROV");

                                objRtn.TCOL = rs05.getString("TCOL");
                                /*
                                 if(objRtn.A1716CIA.length() >= 5 && objRtn.A1716CIA.substring(0, 5).equals("TOTAL")){

                                 }
                                 */
                                if (objRtn.A1716MODO.isEmpty()) {
                                    objRtn.A1716MODO = objRtn.A1716CIA; //Format example: "TOTAL AR S100-499:".
                                }

                                lstRtn.add(objRtn);
                            }
                            if (cstmt01.getMoreResults()) {
                                rs06 = cstmt01.getResultSet();
                                while (rs06.next()) {
                                    objRtn = new PX040S01A1716Filter();
                                    objRtn.A1716CCUST = rs06.getString("A1716CCUST");
                                    objRtn.A1716CIA = rs06.getString("A1716CIA");
                                    objRtn.A1716FORMA = rs06.getString("A1716FORMA");
                                    objRtn.A1716SERIE = rs06.getString("A1716SERIE");
                                    objRtn.A1716CUPON = rs06.getString("A1716CUPON");
                                    objRtn.A1716SEQ = rs06.getString("A1716SEQ");

                                    objRtn.A1716MODO = rs06.getString("A1716MODO");
                                    objRtn.A1716FUENT = rs06.getString("A1716FUENT");
                                    objRtn.A1716SUBFU = rs06.getString("A1716SUBFU");
                                    objRtn.A1716FP = rs06.getString("A1716FP");

                                    objRtn.A1716FUENT = rs06.getString("A1716FUENT");
                                    objRtn.A1716ESTAD = rs06.getString("A1716ESTAD");
                                    objRtn.A1716FFILE = rs06.getString("A1716FFILE");
                                    objRtn.A1716FPRO = rs06.getString("A1716FPRO");
                                    objRtn.A1716GRUPO = rs06.getString("A1716GRUPO");
                                    objRtn.A1716CUR = rs06.getString("A1716CUR");
                                    objRtn.A1716ACTIV = rs06.getDouble("A1716ACTIV");
                                    objRtn.A1716PASIV = rs06.getDouble("A1716PASIV");
                                    objRtn.A1716CUENT = rs06.getString("A1716CUENT");
                                    objRtn.A1716SUBCU = rs06.getString("A1716SUBCU");
                                    objRtn.A1716IDFIL = rs06.getString("A1716IDFIL");
                                    objRtn.A1716TIDOC = rs06.getString("A1716TIDOC");
                                    objRtn.A1716ORIG = rs06.getString("A1716ORIG");
                                    objRtn.A1716FCONT = rs06.getString("A1716FCONT");

                                    objRtn.A1716TITU = rs06.getString("A1716TITU");

                                    objRtn.A1716COPE = rs06.getString("A1716COPE");
                                    objRtn.A1716PROV = rs06.getString("A1716PROV");

                                    objRtn.TCOL = rs06.getString("TCOL");
                                    /*
                                     if(objRtn.A1716CIA.length() >= 5 && objRtn.A1716CIA.substring(0, 5).equals("TOTAL")){

                                     }
                                     */
                                    if (objRtn.A1716MODO.isEmpty()) {
                                        objRtn.A1716MODO = objRtn.A1716CIA; //Format example: "TOTAL AR S100-499:".
                                    }

                                    lstRtn.add(objRtn);
                                }
                                if (cstmt01.getMoreResults()) {
                                    rs07 = cstmt01.getResultSet();
                                    while (rs07.next()) {
                                        objRtn = new PX040S01A1716Filter();
                                        objRtn.A1716CCUST = rs07.getString("A1716CCUST");
                                        objRtn.A1716CIA = rs07.getString("A1716CIA");
                                        objRtn.A1716FORMA = rs07.getString("A1716FORMA");
                                        objRtn.A1716SERIE = rs07.getString("A1716SERIE");
                                        objRtn.A1716CUPON = rs07.getString("A1716CUPON");
                                        objRtn.A1716SEQ = rs07.getString("A1716SEQ");

                                        objRtn.A1716MODO = rs07.getString("A1716MODO");
                                        objRtn.A1716FUENT = rs07.getString("A1716FUENT");
                                        objRtn.A1716SUBFU = rs07.getString("A1716SUBFU");
                                        objRtn.A1716FP = rs07.getString("A1716FP");

                                        objRtn.A1716FUENT = rs07.getString("A1716FUENT");
                                        objRtn.A1716ESTAD = rs07.getString("A1716ESTAD");
                                        objRtn.A1716FFILE = rs07.getString("A1716FFILE");
                                        objRtn.A1716FPRO = rs07.getString("A1716FPRO");
                                        objRtn.A1716GRUPO = rs07.getString("A1716GRUPO");
                                        objRtn.A1716CUR = rs07.getString("A1716CUR");
                                        objRtn.A1716ACTIV = rs07.getDouble("A1716ACTIV");
                                        objRtn.A1716PASIV = rs07.getDouble("A1716PASIV");
                                        objRtn.A1716CUENT = rs07.getString("A1716CUENT");
                                        objRtn.A1716SUBCU = rs07.getString("A1716SUBCU");
                                        objRtn.A1716IDFIL = rs07.getString("A1716IDFIL");
                                        objRtn.A1716TIDOC = rs07.getString("A1716TIDOC");
                                        objRtn.A1716ORIG = rs07.getString("A1716ORIG");
                                        objRtn.A1716FCONT = rs07.getString("A1716FCONT");

                                        objRtn.A1716TITU = rs07.getString("A1716TITU");

                                        objRtn.A1716COPE = rs07.getString("A1716COPE");
                                        objRtn.A1716PROV = rs07.getString("A1716PROV");

                                        objRtn.TCOL = rs07.getString("TCOL");
                                        /*
                                         if(objRtn.A1716CIA.length() >= 5 && objRtn.A1716CIA.substring(0, 5).equals("TOTAL")){

                                         }
                                         */
                                        if (objRtn.A1716MODO.isEmpty()) {
                                            objRtn.A1716MODO = objRtn.A1716CIA; //Format example: "TOTAL AR S100-499:".
                                        }

                                        lstRtn.add(objRtn);
                                    }
                                    if (cstmt01.getMoreResults()) {
                                        rs08 = cstmt01.getResultSet();
                                        while (rs08.next()) {
                                            objRtn = new PX040S01A1716Filter();
                                            objRtn.A1716CCUST = rs08.getString("A1716CCUST");
                                            objRtn.A1716CIA = rs08.getString("A1716CIA");
                                            objRtn.A1716FORMA = rs08.getString("A1716FORMA");
                                            objRtn.A1716SERIE = rs08.getString("A1716SERIE");
                                            objRtn.A1716CUPON = rs08.getString("A1716CUPON");
                                            objRtn.A1716SEQ = rs08.getString("A1716SEQ");

                                            objRtn.A1716MODO = rs08.getString("A1716MODO");
                                            objRtn.A1716FUENT = rs08.getString("A1716FUENT");
                                            objRtn.A1716SUBFU = rs08.getString("A1716SUBFU");
                                            objRtn.A1716FP = rs08.getString("A1716FP");

                                            objRtn.A1716FUENT = rs08.getString("A1716FUENT");
                                            objRtn.A1716ESTAD = rs08.getString("A1716ESTAD");
                                            objRtn.A1716FFILE = rs08.getString("A1716FFILE");
                                            objRtn.A1716FPRO = rs08.getString("A1716FPRO");
                                            objRtn.A1716GRUPO = rs08.getString("A1716GRUPO");
                                            objRtn.A1716CUR = rs08.getString("A1716CUR");
                                            objRtn.A1716ACTIV = rs08.getDouble("A1716ACTIV");
                                            objRtn.A1716PASIV = rs08.getDouble("A1716PASIV");
                                            objRtn.A1716CUENT = rs08.getString("A1716CUENT");
                                            objRtn.A1716SUBCU = rs08.getString("A1716SUBCU");
                                            objRtn.A1716IDFIL = rs08.getString("A1716IDFIL");
                                            objRtn.A1716TIDOC = rs08.getString("A1716TIDOC");
                                            objRtn.A1716ORIG = rs08.getString("A1716ORIG");
                                            objRtn.A1716FCONT = rs08.getString("A1716FCONT");

                                            objRtn.A1716TITU = rs08.getString("A1716TITU");

                                            objRtn.A1716COPE = rs08.getString("A1716COPE");
                                            objRtn.A1716PROV = rs08.getString("A1716PROV");

                                            objRtn.TCOL = rs08.getString("TCOL");
                                            /*
                                             if(objRtn.A1716CIA.length() >= 5 && objRtn.A1716CIA.substring(0, 5).equals("TOTAL")){

                                             }
                                             */
                                            if (objRtn.A1716MODO.isEmpty()) {
                                                objRtn.A1716MODO = objRtn.A1716CIA; //Format example: "TOTAL AR S100-499:".
                                            }

                                            lstRtn.add(objRtn);
                                        }
                                        if (cstmt01.getMoreResults()) {
                                            rs09 = cstmt01.getResultSet();
                                            while (rs09.next()) {
                                                objRtn = new PX040S01A1716Filter();
                                                objRtn.A1716CCUST = rs09.getString("A1716CCUST");
                                                objRtn.A1716CIA = rs09.getString("A1716CIA");
                                                objRtn.A1716FORMA = rs09.getString("A1716FORMA");
                                                objRtn.A1716SERIE = rs09.getString("A1716SERIE");
                                                objRtn.A1716CUPON = rs09.getString("A1716CUPON");
                                                objRtn.A1716SEQ = rs09.getString("A1716SEQ");

                                                objRtn.A1716MODO = rs09.getString("A1716MODO");
                                                objRtn.A1716FUENT = rs09.getString("A1716FUENT");
                                                objRtn.A1716SUBFU = rs09.getString("A1716SUBFU");
                                                objRtn.A1716FP = rs09.getString("A1716FP");

                                                objRtn.A1716FUENT = rs09.getString("A1716FUENT");
                                                objRtn.A1716ESTAD = rs09.getString("A1716ESTAD");
                                                objRtn.A1716FFILE = rs09.getString("A1716FFILE");
                                                objRtn.A1716FPRO = rs09.getString("A1716FPRO");
                                                objRtn.A1716GRUPO = rs09.getString("A1716GRUPO");
                                                objRtn.A1716CUR = rs09.getString("A1716CUR");
                                                objRtn.A1716ACTIV = rs09.getDouble("A1716ACTIV");
                                                objRtn.A1716PASIV = rs09.getDouble("A1716PASIV");
                                                objRtn.A1716CUENT = rs09.getString("A1716CUENT");
                                                objRtn.A1716SUBCU = rs09.getString("A1716SUBCU");
                                                objRtn.A1716IDFIL = rs09.getString("A1716IDFIL");
                                                objRtn.A1716TIDOC = rs09.getString("A1716TIDOC");
                                                objRtn.A1716ORIG = rs09.getString("A1716ORIG");
                                                objRtn.A1716FCONT = rs09.getString("A1716FCONT");

                                                objRtn.A1716TITU = rs09.getString("A1716TITU");

                                                objRtn.A1716COPE = rs09.getString("A1716COPE");
                                                objRtn.A1716PROV = rs09.getString("A1716PROV");

                                                objRtn.TCOL = rs09.getString("TCOL");
                                                /*
                                                 if(objRtn.A1716CIA.length() >= 5 && objRtn.A1716CIA.substring(0, 5).equals("TOTAL")){

                                                 }
                                                 */
                                                if (objRtn.A1716MODO.isEmpty()) {
                                                    objRtn.A1716MODO = objRtn.A1716CIA; //Format example: "TOTAL AR S100-499:".
                                                }

                                                lstRtn.add(objRtn);
                                            }
                                            if (cstmt01.getMoreResults()) {
                                                rs10 = cstmt01.getResultSet();
                                                while (rs10.next()) {
                                                    objRtn = new PX040S01A1716Filter();
                                                    objRtn.A1716CCUST = rs10.getString("A1716CCUST");
                                                    objRtn.A1716CIA = rs10.getString("A1716CIA");
                                                    objRtn.A1716FORMA = rs10.getString("A1716FORMA");
                                                    objRtn.A1716SERIE = rs10.getString("A1716SERIE");
                                                    objRtn.A1716CUPON = rs10.getString("A1716CUPON");
                                                    objRtn.A1716SEQ = rs10.getString("A1716SEQ");

                                                    objRtn.A1716MODO = rs10.getString("A1716MODO");
                                                    objRtn.A1716FUENT = rs10.getString("A1716FUENT");
                                                    objRtn.A1716SUBFU = rs10.getString("A1716SUBFU");
                                                    objRtn.A1716FP = rs10.getString("A1716FP");

                                                    objRtn.A1716FUENT = rs10.getString("A1716FUENT");
                                                    objRtn.A1716ESTAD = rs10.getString("A1716ESTAD");
                                                    objRtn.A1716FFILE = rs10.getString("A1716FFILE");
                                                    objRtn.A1716FPRO = rs10.getString("A1716FPRO");
                                                    objRtn.A1716GRUPO = rs10.getString("A1716GRUPO");
                                                    objRtn.A1716CUR = rs10.getString("A1716CUR");
                                                    objRtn.A1716ACTIV = rs10.getDouble("A1716ACTIV");
                                                    objRtn.A1716PASIV = rs10.getDouble("A1716PASIV");
                                                    objRtn.A1716CUENT = rs10.getString("A1716CUENT");
                                                    objRtn.A1716SUBCU = rs10.getString("A1716SUBCU");
                                                    objRtn.A1716IDFIL = rs10.getString("A1716IDFIL");
                                                    objRtn.A1716TIDOC = rs10.getString("A1716TIDOC");
                                                    objRtn.A1716ORIG = rs10.getString("A1716ORIG");
                                                    objRtn.A1716FCONT = rs10.getString("A1716FCONT");

                                                    objRtn.A1716TITU = rs10.getString("A1716TITU");

                                                    objRtn.A1716COPE = rs10.getString("A1716COPE");
                                                    objRtn.A1716PROV = rs10.getString("A1716PROV");

                                                    objRtn.TCOL = rs10.getString("TCOL");
                                                    /*
                                                     if(objRtn.A1716CIA.length() >= 5 && objRtn.A1716CIA.substring(0, 5).equals("TOTAL")){

                                                     }
                                                     */
                                                    if (objRtn.A1716MODO.isEmpty()) {
                                                        objRtn.A1716MODO = objRtn.A1716CIA; //Format example: "TOTAL AR S100-499:".
                                                    }

                                                    lstRtn.add(objRtn);
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
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
            if (rs02 != null) {
                try {
                    rs02.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            if (rs03 != null) {
                try {
                    rs03.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            if (rs04 != null) {
                try {
                    rs04.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            if (rs05 != null) {
                try {
                    rs05.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            if (rs06 != null) {
                try {
                    rs06.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            if (rs07 != null) {
                try {
                    rs07.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            if (rs08 != null) {
                try {
                    rs08.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            if (rs09 != null) {
                try {
                    rs09.close();
                } catch (SQLException e) {
                    logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
                }
            }
            if (rs10 != null) {
                try {
                    rs10.close();
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

    public A2024Filter lstSave(A2024Filter SaveFilter) throws SQLException, Exception {
        CallableStatement cs = null;
        A2024Filter result = new A2024Filter();
        ResultSet rst = null;
        String strSQL;

        Connection cnx = null;
        try {
            strSQL = "{CALL " + session.getMainLibrary() + ".SQP03627(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(strSQL);

            cs.setInt(1, SaveFilter.VP_FILTER);
            cs.setString(2, SaveFilter.CIA);
            cs.setString(3, SaveFilter.FORMA);
            cs.setString(4, SaveFilter.SERIE);
            cs.setString(5, SaveFilter.A2024GRUPO);
            cs.setString(6, SaveFilter.A2024TDOC);
            cs.setString(7, SaveFilter.A2024TRNC);
            cs.setString(8, SaveFilter.A2024FECIN);
            cs.setString(9, SaveFilter.A2024TTARJ);
            cs.setString(10, SaveFilter.A2024NTARJ);
            cs.setString(11, SaveFilter.A2024RFIC);
            cs.setString(12, SaveFilter.A2024RFIS);
            cs.setString(13, SaveFilter.A2024VRICOC);
            cs.setString(14, SaveFilter.A2024FECVTA);
            cs.setString(15, SaveFilter.A2024AGENT);
            cs.setString(16, SaveFilter.A2024SFUEN);
            cs.setDouble(17, SaveFilter.A1541VCPVE);
            cs.setString(18, SaveFilter.A1541MDAVE);
            cs.setDouble(19, SaveFilter.A1541LCMVE);
            cs.setDouble(20, SaveFilter.A1541LSCMV);
            cs.setDouble(21, SaveFilter.A1541LYQVE);
            cs.setDouble(22, SaveFilter.A1541TCRVE);
            cs.setDouble(23, SaveFilter.A1541VCPRV);
            cs.setString(24, SaveFilter.A1541MREVE);
            cs.setDouble(25, SaveFilter.A1541RCMVE);
            cs.setDouble(26, SaveFilter.A1541RSCMV);
            cs.setDouble(27, SaveFilter.A1541RYQVE);
            cs.setString(28, SaveFilter.SEQ);
            cs.setString(29, SaveFilter.VP_TypeUse);
            cs.setString(30, SaveFilter.VP_TypeVoid);
            cs.setString(31, SaveFilter.A2024DESCRIP);
            cs.setString(32, SaveFilter.A2024IATAUSU);
            cs.setString(33, SaveFilter.A1531TFOP);
            cs.setString(34, SaveFilter.CIANEW);
            cs.setString(35, SaveFilter.FORMANEW);
            cs.setString(36, SaveFilter.SERIENEW);
            cs.setInt(37, SaveFilter.VP_TPCMBO);
            cs.setString(38, session.getUserView().getUserInfo().USR);
            cs.setString(39, session.getUserView().getCustomerInfo().CCUST);
            cs.setString(40, SaveFilter.A2024CUPON);

            cs.setString(41, SaveFilter.ESTA_TNU);
            cs.setString(42, SaveFilter.FBASIS);

            cs.setString(43, SaveFilter.REFE);
            cs.setString(44, SaveFilter.TKTSEQ);

            cs.setString(45, SaveFilter.ORI);
            cs.setString(46, SaveFilter.DESTI);
            cs.setString(47, SaveFilter.CARR);
            cs.setString(48, SaveFilter.NVLO);
            cs.setDouble(49, SaveFilter.AMOUNT);
            cs.setDouble(50, SaveFilter.AMOUNTRV);
            cs.setString(51, SaveFilter.TKTDATE);

            cs.execute(); //hola

            rst = cs.getResultSet();
            while (rst.next()) {
                result.dbException.SQLCODE = rst.getString("VSQLCODE");
                result.dbException.MESSAGE = rst.getString("VMESSAGE");
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

        return result;
    }

    public String insertTKT(ArrayList<A2024Filter> filter) throws SQLException, Exception {
        CallableStatement cs = null;
        ResultSet rst = null;
        String strSQL;
        String STR_RESULT = "";

        session.getCNXIBMDB2().open();
        try {
            String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00575(?,?,?,?,?,?,?,?)}";
            //String SQLCLL01 = "{CALL PXSAUDIT.SQP00575(?,?,?,?,?,?,?)}";
            cs = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);
            for (A2024Filter obj : filter) {

                cs.setInt(1, 1);
                cs.setString(2, obj.A2024CIA);
                cs.setString(3, obj.A2024FORMA);
                cs.setString(4, obj.A2024SERIE);
                cs.setInt(5, obj.A2024CORRL);
                cs.setString(6, session.getUserView().getUserInfo().USR);
                cs.setString(7, obj.A2024CUPON);
                cs.setString(8, obj.A2024SEQ);

                cs.execute();
            }
            rst = cs.getResultSet();

            while (rst.next()) {
                STR_RESULT = rst.getString("VMESSAGE");
            }
            cs.close();
        } catch (SQLException e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
        } catch (Exception e) {
            logError.error("SQLException -> User:" + session.getUserView().getUserInfo().USR + " Message: " + e.getMessage(), e);
        } finally {
            strSQL = null;
            session.getCNXIBMDB2().close();
        }

        return STR_RESULT;
    }

    public List<A1740Filter> SearchCta(A1740Filter filter) throws SQLException, Exception {
        List<A1740Filter> lstRtn = new ArrayList<>(0);
        A1740Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        //String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00378(?,?,?,?,?,?,?,?,?,?,?,?,?)}";"LIBSAP25"
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP01835(?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, filter.A1740TIPODESC);
            cstmt01.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(3, filter.IN_A1740SUBTI_OLD);
            cstmt01.setString(4, filter.IN_A1740TIPO);
            cstmt01.setString(5, filter.A1740SUBTI);
            cstmt01.setString(6, filter.A1740CATEG);
            cstmt01.setString(7, filter.A1740CTA);
            cstmt01.setString(8, filter.A1740SCTA);
            cstmt01.setString(9, filter.IN_A1740TIPO_OLD);

            cstmt01.execute(); //hola

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new A1740Filter();
                objRtn.A1740TITRA = rs01.getString("A1740TITRA").trim();
                objRtn.A1740TIPO = rs01.getString("A1740TIPO").trim();
                objRtn.A1740TIPODESC = rs01.getString("A1740TIPODESC").trim();
                objRtn.A1740CTA = rs01.getString("A1740CIA").trim() + "-" + rs01.getString("A1740UNIDA").trim() + "-" + rs01.getString("A1740CECOS").trim() + "-" + rs01.getString("A1740UBICA").trim() + "-" + rs01.getString("A1740CTA").trim() + "-" + rs01.getString("A1740SCTA").trim() + "-" + rs01.getString("A1740EQUI").trim() + "-" + rs01.getString("A1740ICIA").trim();
                objRtn.A1740CLIE = rs01.getString("A1740CLIE").trim();
                objRtn.A1740SUBTI = rs01.getString("A1740SUBTI").trim();
                objRtn.A1740CATEG = rs01.getString("A1740CATEG").trim();
                lstRtn.add(objRtn);
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
