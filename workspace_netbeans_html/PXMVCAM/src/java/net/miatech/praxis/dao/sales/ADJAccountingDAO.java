/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.dao.sales;

import com.ibm.as400.access.AS400DataType;
import com.ibm.as400.access.AS400Message;
import com.ibm.as400.access.AS400Structure;
import com.ibm.as400.access.ProgramCall;
import com.ibm.as400.access.ProgramParameter;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import net.miatech.beans.A1716Filter;
import net.miatech.beans.A1740Filter;
import net.miatech.beans.A1939Filter;
import net.miatech.beans.A2024Filter;
import net.miatech.beans.A720Filter;
import net.miatech.beans.PX0241S01A720Filter;
import net.miatech.beans.PX040S01A1716Filter;

import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.praxis.A1740;
import net.miatech.praxis.classes.App;
import net.miatech.utils.AS400Map;
import net.miatech.utils.Functions;
import org.apache.log4j.Logger;

/**
 *
 * @author lmendoza
 */
public class ADJAccountingDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private ResultSet rst = null;
    private Connection cnx = null;
    private static final Logger logError = Logger.getLogger("errorLog");

    public ADJAccountingDAO() {
    }

    public static void pasarGarbageCollector() {
        System.gc();
        System.runFinalization();
        System.gc();
    }

    public ADJAccountingDAO(IServerSession ss) {
        session = ss;
    }

    public void setSession(IServerSession ss) {
        session = ss;
    }

    public List<A720Filter> loadTicketDao(A720Filter filter) throws SQLException, Exception {
        List<A720Filter> lstRtn = new ArrayList<>(0);
        A720Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        //String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP00365(?,?,?,?,?,?,?)}";
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP03659(?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, filter.strOption);
            cstmt01.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(3, filter.A720CIA);
            cstmt01.setString(4, filter.A720FORMA);
            cstmt01.setString(5, filter.A720SERIE);
            cstmt01.setString(6, filter.A720CUPON1);
            cstmt01.setString(7, filter.A720SEQ);
            cstmt01.setString(8, filter.A720DATE);
            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new A720Filter();

                objRtn.A720AIRLIN = rs01.getString("A720AIRLIN");
                objRtn.A720SEQ = rs01.getString("A720SEQ");
                objRtn.SEQVTA = rs01.getString("SEQVTA");
                objRtn.A720GRUPO = rs01.getString("A720GRUPO");
                objRtn.A720FUENT = rs01.getString("A1530FUENT");
                objRtn.A720PAIVTA = rs01.getString("A720PAIVTA");
                objRtn.A720SFUEN = rs01.getString("A1530SFUEN");
                objRtn.A720MONREG = rs01.getString("A1530TFUEN");
                objRtn.A720PAIS = rs01.getString("A1530BANCO");
                objRtn.A720AGENTE = rs01.getString("A720AGENTE");

                objRtn.A720NVLO1 = rs01.getString("A1530CSABR");
                objRtn.A720FVLO1 = rs01.getString("A1530FPROC");
                objRtn.A720CARRN1 = rs01.getString("A1530MDA");
                objRtn.A720TCAMB = rs01.getDouble("A720TCAMB");
                objRtn.A720FECVTA = rs01.getString("A720FECVTA");
                objRtn.A720TRNCU = rs01.getString("A720TRNCU");
                objRtn.A720TDOC = rs01.getString("A720TDOC");
                objRtn.A720TFORMA = rs01.getString("A720TFORMA");

                objRtn.A720RUTA0 = rs01.getString("A720RUTA0");
                objRtn.A720RUTA1 = rs01.getString("A720RUTA1");
                objRtn.A720RUTA2 = rs01.getString("A720RUTA2");
                objRtn.A720RUTA3 = rs01.getString("A720RUTA3");
                objRtn.A720RUTA4 = rs01.getString("A720RUTA4");
                objRtn.A720CARRA1 = rs01.getString("A720CARRA1");
                objRtn.A720CARRA2 = rs01.getString("A720CARRA2");
                objRtn.A720CARRA3 = rs01.getString("A720CARRA3");
                objRtn.A720CARRA4 = rs01.getString("A720CARRA4");
                objRtn.A720NVLO1 = rs01.getString("A720NVLO1");
                objRtn.A720NVLO2 = rs01.getString("A720NVLO2");
                objRtn.A720NVLO3 = rs01.getString("A720NVLO3");
                objRtn.A720NVLO4 = rs01.getString("A720NVLO4");

                objRtn.A720RFIC = rs01.getString("A720RFIC");
                objRtn.A720TPTKT = rs01.getString("A720TPTKT");
                objRtn.A720FVLO2 = rs01.getString("A720FVLO2");
                objRtn.A720NSTOCK = rs01.getString("A720NSTOCK");
                objRtn.A720PNR = rs01.getString("A720PNR");
                objRtn.A720NBDA1 = rs01.getString("A1530AGENT");

                objRtn.A1541RSCMV = rs01.getDouble("A1541RSCMV");
                objRtn.A1541RYQVE = rs01.getDouble("A1541RYQVE");
                objRtn.A720FBASIS = rs01.getString("A720FBASIS");
                objRtn.A1541LYQVE = rs01.getDouble("A1541LYQVE");
                objRtn.A1541TCRVE = rs01.getDouble("A1541TCRVE");
                objRtn.A1541VCPRV = rs01.getDouble("A1541VCPRV");
                objRtn.A1541MREVE = rs01.getString("A1541MREVE");
                objRtn.A1541RCMVE = rs01.getDouble("A1541RCMVE");
                objRtn.A1541VCPVE = rs01.getDouble("A1541VCPVE");
                objRtn.A1541MDAVE = rs01.getString("A1541MDAVE");
                objRtn.A1541LCMVE = rs01.getDouble("A1541LCMVE");
                objRtn.A1541LSCMV = rs01.getDouble("A1541LSCMV");

                objRtn.A720TTARJ = rs01.getString("A1531TTARJ");
                objRtn.A720NREF = rs01.getString("A1531NREF");
                objRtn.A720MDATC = rs01.getString("A720MDATC");
                objRtn.A720CARRIER = rs01.getString("CARRIER");

                //A720MDATC  VL_AR VL_AP VL_FCONT VL_HCONT VL_STATUS
                objRtn.A720GL = rs01.getString("VL_GL");
                objRtn.A720AR = rs01.getString("VL_AR");
                objRtn.A720AP = rs01.getString("VL_AP");
                objRtn.A720FCONT = rs01.getString("VL_FCONT");
                objRtn.A720HCONT = rs01.getString("VL_HCONT");
                objRtn.A720STATUS = rs01.getString("VL_STATUS");
                // objRtn.A720MENSAJE = rs01.getString("VL_MENSAJE");

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
        ResultSet rs01 = null; //17
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP03657(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.registerOutParameter(14, Types.INTEGER);
            cstmt01.registerOutParameter(15, Types.INTEGER);
            cstmt01.registerOutParameter(16, Types.INTEGER);
            cstmt01.registerOutParameter(17, Types.INTEGER);

            cstmt01.setInt(1, filter.VP_FILTER);
            cstmt01.setString(2, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(3, filter.VP_FROM_FILER);
            cstmt01.setString(4, filter.VP_TO_FILTER);
            cstmt01.setString(5, filter.VP_CIA);
            cstmt01.setString(6, filter.VP_FORMA);
            cstmt01.setString(7, filter.VP_SERIE);
            cstmt01.setString(8, filter.VP_Seq);
            cstmt01.setString(9, filter.VP_TypeVoid);
            cstmt01.setString(10, filter.VP_TypeUse);
            cstmt01.setInt(11, filter.VP_TPCMBO);
            cstmt01.setString(12, filter.VP_IATA);
            cstmt01.setString(13, filter.VP_USER);

            cstmt01.setInt(14, filter.page.PAGNUM);
            cstmt01.setInt(15, filter.page.PAGROW);
            cstmt01.setInt(16, filter.page.TOTPAG);
            cstmt01.setInt(17, filter.page.TOTROW);

            cstmt01.execute(); //hola

            filter.page.PAGNUM = cstmt01.getInt(14);
            filter.page.PAGROW = cstmt01.getInt(15);
            filter.page.TOTPAG = cstmt01.getInt(16);
            filter.page.TOTROW = cstmt01.getInt(17);

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
        return lstRtn;
        //return lstRtn;
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

    public List<PX040S01A1716Filter> loadPX040S01A1716(PX040S01A1716Filter filter) throws SQLException, Exception {
        List<PX040S01A1716Filter> lstRtn = new ArrayList<>(0);
        PX040S01A1716Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null, rs02 = null, rs03 = null, rs04 = null, rs05 = null, rs06 = null, rs07 = null, rs08 = null, rs09 = null, rs10 = null, rs11 = null, rs12 = null;

        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP03662(?,?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, filter.VP_A1716CCUST);
            cstmt01.setString(2, filter.VP_A1716CIA);
            cstmt01.setString(3, filter.VP_A1716FORMA);
            cstmt01.setString(4, filter.VP_A1716SERIE);
            cstmt01.setString(5, filter.VP_A1716SEQ);
            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new PX040S01A1716Filter();
                objRtn.A1716CCUST = rs01.getString("A1716CCUST");
                objRtn.A1716CIA = rs01.getString("A1716CIA");
                objRtn.A1716FORMA = rs01.getString("A1716FORMA");
                objRtn.A1716SERIE = rs01.getString("A1716SERIE");
                objRtn.A1716CUPON = rs01.getString("A1716CUPON");
                objRtn.A1716SEQT = rs01.getString("A1716SEQT");
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
                objRtn.A1716CURRV = rs01.getString("A1716CURRV");
                objRtn.A1716ACTRV = rs01.getDouble("A1716ACTRV");
                objRtn.A1716PASRV = rs01.getDouble("A1716PASRV");
                objRtn.A1716CUENT = rs01.getString("A1716CUENT");
                objRtn.A1716SUBCU = rs01.getString("A1716SUBCU");
                objRtn.A1716IDFIL = rs01.getString("A1716IDFIL");
                objRtn.A1716TIDOC = rs01.getString("A1716TIDOC");
                objRtn.A1716ORIG = rs01.getString("A1716ORIG");
                objRtn.A1716FCONT = rs01.getString("A1716FCONT");

                objRtn.A1716TITU = rs01.getString("A1716TITU");

                objRtn.A1716COPE = rs01.getString("A1716COPE");
                objRtn.A1716PROV = rs01.getString("A1716PROV");
                objRtn.A1716IDCON = rs01.getString("A1716IDCON");

                //ZPP
                objRtn.A1716FILE = rs01.getString("A1716FILE");
                objRtn.A1716CLIEN = rs01.getString("A1716CLIEN");
                objRtn.A1716DIREC = rs01.getString("A1716DIREC");
                objRtn.A1716FOPI = rs01.getString("A1716FOPI");
                objRtn.A1716SEQT = rs01.getString("A1716SEQT");

                objRtn.TCOL = rs01.getString("TCOL");

                if (objRtn.A1716MODO.isEmpty() || objRtn.A1716MODO.equals("---------")) {
                    objRtn.A1716MODO = objRtn.A1716CIA; //Format example: "TOTAL AR S100-499:".
                }

                lstRtn.add(objRtn);
            }
            //<editor-fold defaultstate="collapsed" desc="{...}">
            if (cstmt01.getMoreResults()) {
                rs02 = cstmt01.getResultSet();
                while (rs02.next()) {
                    objRtn = new PX040S01A1716Filter();
                    objRtn.A1716CCUST = rs02.getString("A1716CCUST");
                    objRtn.A1716CIA = rs02.getString("A1716CIA");
                    objRtn.A1716FORMA = rs02.getString("A1716FORMA");
                    objRtn.A1716SERIE = rs02.getString("A1716SERIE");
                    objRtn.A1716CUPON = rs02.getString("A1716CUPON");
                    objRtn.A1716SEQT = rs02.getString("A1716SEQT");
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
                    objRtn.A1716IDCON = rs02.getString("A1716IDCON");

                    //ZPP
                    objRtn.A1716FILE = rs02.getString("A1716FILE");
                    objRtn.A1716CLIEN = rs02.getString("A1716CLIEN");
                    objRtn.A1716DIREC = rs02.getString("A1716DIREC");
                    objRtn.A1716FOPI = rs02.getString("A1716FOPI");
                    objRtn.A1716SEQT = rs02.getString("A1716SEQT");

                    objRtn.A1716ACTRV = rs02.getDouble("A1716ACTRV");
                    objRtn.A1716PASRV = rs02.getDouble("A1716PASRV");

                    objRtn.TCOL = rs02.getString("TCOL");
                    if (objRtn.A1716MODO.isEmpty() || objRtn.A1716MODO.equals("---------")) {
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
                        objRtn.A1716SEQT = rs03.getString("A1716SEQT");
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
                        //objRtn.A1716ACTRV = rs03.getDouble("A1716ACTIV");
                        //objRtn.A1716PASRV = rs03.getDouble("A1716PASIV");
                        objRtn.A1716CUENT = rs03.getString("A1716CUENT");
                        objRtn.A1716SUBCU = rs03.getString("A1716SUBCU");
                        objRtn.A1716IDFIL = rs03.getString("A1716IDFIL");
                        objRtn.A1716TIDOC = rs03.getString("A1716TIDOC");
                        objRtn.A1716ORIG = rs03.getString("A1716ORIG");
                        objRtn.A1716FCONT = rs03.getString("A1716FCONT");

                        objRtn.A1716TITU = rs03.getString("A1716TITU");

                        objRtn.A1716COPE = rs03.getString("A1716COPE");
                        objRtn.A1716PROV = rs03.getString("A1716PROV");

                        objRtn.A1716IDCON = rs03.getString("A1716IDCON");

                        objRtn.TCOL = rs03.getString("TCOL");
                        //ZPP
                        objRtn.A1716FILE = rs03.getString("A1716FILE");
                        objRtn.A1716CLIEN = rs03.getString("A1716CLIEN");
                        objRtn.A1716DIREC = rs03.getString("A1716DIREC");
                        objRtn.A1716FOPI = rs03.getString("A1716FOPI");
                        objRtn.A1716SEQT = rs03.getString("A1716SEQT");
                        if (objRtn.A1716MODO.isEmpty() || objRtn.A1716MODO.equals("---------")) {
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
                            objRtn.A1716SEQT = rs04.getString("A1716SEQT");
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

                            objRtn.A1716IDCON = rs04.getString("A1716IDCON");

                            objRtn.TCOL = rs04.getString("TCOL");

                            //ZPP
                            objRtn.A1716FILE = rs04.getString("A1716FILE");
                            objRtn.A1716CLIEN = rs04.getString("A1716CLIEN");
                            objRtn.A1716DIREC = rs04.getString("A1716DIREC");
                            objRtn.A1716FOPI = rs04.getString("A1716FOPI");
                            objRtn.A1716SEQT = rs04.getString("A1716SEQT");
//                            
//                             if(objRtn.A1716CIA.length() >= 5 && objRtn.A1716CIA.substring(0, 5).equals("TOTAL")){
//
//                             }
//                            
                            if (objRtn.A1716MODO.isEmpty() || objRtn.A1716MODO.equals("---------")) {
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
                                objRtn.A1716SEQT = rs05.getString("A1716SEQT");
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

                                objRtn.A1716IDCON = rs05.getString("A1716IDCON");

                                //ZPP
                                objRtn.A1716FILE = rs05.getString("A1716FILE");
                                objRtn.A1716CLIEN = rs05.getString("A1716CLIEN");
                                objRtn.A1716DIREC = rs05.getString("A1716DIREC");
                                objRtn.A1716FOPI = rs05.getString("A1716FOPI");
                                objRtn.A1716SEQT = rs05.getString("A1716SEQT");

                                objRtn.TCOL = rs05.getString("TCOL");
//                                
//                                 if(objRtn.A1716CIA.length() >= 5 && objRtn.A1716CIA.substring(0, 5).equals("TOTAL")){
//
//                                 }
//                                
                                if (objRtn.A1716MODO.isEmpty() || objRtn.A1716MODO.equals("---------")) {
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
                                    objRtn.A1716SEQT = rs06.getString("A1716SEQT");
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

                                    objRtn.A1716IDCON = rs06.getString("A1716IDCON");

                                    objRtn.TCOL = rs06.getString("TCOL");
                                    //ZPP
                                    objRtn.A1716FILE = rs06.getString("A1716FILE");
                                    objRtn.A1716CLIEN = rs06.getString("A1716CLIEN");
                                    objRtn.A1716DIREC = rs06.getString("A1716DIREC");
                                    objRtn.A1716FOPI = rs06.getString("A1716FOPI");
                                    objRtn.A1716SEQT = rs06.getString("A1716SEQT");

                                    objRtn.A1716ACTRV = rs06.getDouble("A1716ACTRV");
                                    objRtn.A1716PASRV = rs06.getDouble("A1716PASRV");
//                                    
//                                     if(objRtn.A1716CIA.length() >= 5 && objRtn.A1716CIA.substring(0, 5).equals("TOTAL")){
//
//                                     }
//                                    
                                    if (objRtn.A1716MODO.isEmpty() || objRtn.A1716MODO.equals("---------")) {
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
                                        objRtn.A1716SEQT = rs07.getString("A1716SEQT");
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
                                        objRtn.A1716ACTRV = rs07.getDouble("A1716ACTRV");
                                        objRtn.A1716PASRV = rs07.getDouble("A1716PASRV");

                                        objRtn.A1716TITU = rs07.getString("A1716TITU");

                                        objRtn.A1716COPE = rs07.getString("A1716COPE");
                                        objRtn.A1716PROV = rs07.getString("A1716PROV");

                                        objRtn.A1716IDCON = rs07.getString("A1716IDCON");

                                        objRtn.TCOL = rs07.getString("TCOL");
//                                       
//ZPP
                                        objRtn.A1716FILE = rs07.getString("A1716FILE");
                                        objRtn.A1716CLIEN = rs07.getString("A1716CLIEN");
                                        objRtn.A1716DIREC = rs07.getString("A1716DIREC");
                                        objRtn.A1716FOPI = rs07.getString("A1716FOPI");
                                        objRtn.A1716SEQT = rs07.getString("A1716SEQT");
//                                         if(objRtn.A1716CIA.length() >= 5 && objRtn.A1716CIA.substring(0, 5).equals("TOTAL")){
//
//                                         }
//                                        
                                        if (objRtn.A1716MODO.isEmpty() || objRtn.A1716MODO.equals("---------")) {
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
                                            objRtn.A1716SEQT = rs08.getString("A1716SEQT");
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

                                            objRtn.A1716IDCON = rs08.getString("A1716IDCON");

                                            //ZPP
                                            objRtn.A1716FILE = rs08.getString("A1716FILE");
                                            objRtn.A1716CLIEN = rs08.getString("A1716CLIEN");
                                            objRtn.A1716DIREC = rs08.getString("A1716DIREC");
                                            objRtn.A1716FOPI = rs08.getString("A1716FOPI");
                                            objRtn.A1716SEQT = rs08.getString("A1716SEQT");
                                            objRtn.A1716ACTRV = rs08.getDouble("A1716ACTRV");
                                            objRtn.A1716PASRV = rs08.getDouble("A1716PASRV");

                                            objRtn.TCOL = rs08.getString("TCOL");
//                                            
//                                             if(objRtn.A1716CIA.length() >= 5 && objRtn.A1716CIA.substring(0, 5).equals("TOTAL")){
//
//                                             }
//                                            
                                            if (objRtn.A1716MODO.isEmpty() || objRtn.A1716MODO.equals("---------")) {
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
                                                objRtn.A1716SEQT = rs09.getString("A1716SEQT");
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

                                                objRtn.A1716IDCON = rs09.getString("A1716IDCON");

                                                objRtn.TCOL = rs09.getString("TCOL");

                                                //ZPP
                                                objRtn.A1716FILE = rs09.getString("A1716FILE");
                                                objRtn.A1716CLIEN = rs09.getString("A1716CLIEN");
                                                objRtn.A1716DIREC = rs09.getString("A1716DIREC");
                                                objRtn.A1716FOPI = rs09.getString("A1716FOPI");
                                                objRtn.A1716SEQT = rs09.getString("A1716SEQT");
                                                objRtn.A1716ACTRV = rs09.getDouble("A1716ACTRV");
                                                objRtn.A1716PASRV = rs09.getDouble("A1716PASRV");
//                                                
//                                                 if(objRtn.A1716CIA.length() >= 5 && objRtn.A1716CIA.substring(0, 5).equals("TOTAL")){
//
//                                                 }
//                                                
                                                if (objRtn.A1716MODO.isEmpty() || objRtn.A1716MODO.equals("---------")) {
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
                                                    objRtn.A1716SEQT = rs10.getString("A1716SEQT");
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

                                                    objRtn.A1716IDCON = rs10.getString("A1716IDCON");

                                                    objRtn.TCOL = rs10.getString("TCOL");
                                                    //ZPP
                                                    objRtn.A1716FILE = rs10.getString("A1716FILE");
                                                    objRtn.A1716CLIEN = rs10.getString("A1716CLIEN");
                                                    objRtn.A1716DIREC = rs10.getString("A1716DIREC");
                                                    objRtn.A1716FOPI = rs10.getString("A1716FOPI");
                                                    objRtn.A1716SEQT = rs10.getString("A1716SEQT");
//                                                    
//                                                     if(objRtn.A1716CIA.length() >= 5 && objRtn.A1716CIA.substring(0, 5).equals("TOTAL")){
//
//                                                     }
//                                                    
                                                    if (objRtn.A1716MODO.isEmpty() || objRtn.A1716MODO.equals("---------")) {
                                                        objRtn.A1716MODO = objRtn.A1716CIA; //Format example: "TOTAL AR S100-499:".
                                                    }

                                                    lstRtn.add(objRtn);
                                                }
                                                if (cstmt01.getMoreResults()) {
                                                    rs11 = cstmt01.getResultSet();
                                                    while (rs11.next()) {
                                                        objRtn = new PX040S01A1716Filter();
                                                        objRtn.A1716CCUST = rs11.getString("A1716CCUST");
                                                        objRtn.A1716CIA = rs11.getString("A1716CIA");
                                                        objRtn.A1716FORMA = rs11.getString("A1716FORMA");
                                                        objRtn.A1716SERIE = rs11.getString("A1716SERIE");
                                                        objRtn.A1716CUPON = rs11.getString("A1716CUPON");
                                                        objRtn.A1716SEQT = rs11.getString("A1716SEQT");
                                                        objRtn.A1716SEQ = rs11.getString("A1716SEQ");

                                                        objRtn.A1716MODO = rs11.getString("A1716MODO");
                                                        objRtn.A1716FUENT = rs11.getString("A1716FUENT");
                                                        objRtn.A1716SUBFU = rs11.getString("A1716SUBFU");
                                                        objRtn.A1716FP = rs11.getString("A1716FP");

                                                        objRtn.A1716FUENT = rs11.getString("A1716FUENT");
                                                        objRtn.A1716ESTAD = rs11.getString("A1716ESTAD");
                                                        objRtn.A1716FFILE = rs11.getString("A1716FFILE");
                                                        objRtn.A1716FPRO = rs11.getString("A1716FPRO");
                                                        objRtn.A1716GRUPO = rs11.getString("A1716GRUPO");
                                                        objRtn.A1716CUR = rs11.getString("A1716CUR");
                                                        objRtn.A1716ACTIV = rs11.getDouble("A1716ACTIV");
                                                        objRtn.A1716PASIV = rs11.getDouble("A1716PASIV");
                                                        objRtn.A1716CUENT = rs11.getString("A1716CUENT");
                                                        objRtn.A1716SUBCU = rs11.getString("A1716SUBCU");
                                                        objRtn.A1716IDFIL = rs11.getString("A1716IDFIL");
                                                        objRtn.A1716TIDOC = rs11.getString("A1716TIDOC");
                                                        objRtn.A1716ORIG = rs11.getString("A1716ORIG");
                                                        objRtn.A1716FCONT = rs11.getString("A1716FCONT");

                                                        objRtn.A1716TITU = rs11.getString("A1716TITU");

                                                        objRtn.A1716COPE = rs11.getString("A1716COPE");
                                                        objRtn.A1716PROV = rs11.getString("A1716PROV");

                                                        objRtn.A1716IDCON = rs11.getString("A1716IDCON");

                                                        objRtn.TCOL = rs11.getString("TCOL");
                                                        //ZPP
                                                        objRtn.A1716FILE = rs11.getString("A1716FILE");
                                                        objRtn.A1716CLIEN = rs11.getString("A1716CLIEN");
                                                        objRtn.A1716DIREC = rs11.getString("A1716DIREC");
                                                        objRtn.A1716FOPI = rs11.getString("A1716FOPI");
                                                        objRtn.A1716SEQT = rs11.getString("A1716SEQT");
//                                                        
//                                                         if(objRtn.A1716CIA.length() >= 5 && objRtn.A1716CIA.substring(0, 5).equals("TOTAL")){
//
//                                                         }
//                                                        
                                                        if (objRtn.A1716MODO.isEmpty() || objRtn.A1716MODO.equals("---------")) {
                                                            objRtn.A1716MODO = objRtn.A1716CIA; //Format example: "TOTAL AR S100-499:".
                                                        }

                                                        lstRtn.add(objRtn);
                                                    }
                                                    if (cstmt01.getMoreResults()) {
                                                        rs12 = cstmt01.getResultSet();
                                                        while (rs12.next()) {
                                                            objRtn = new PX040S01A1716Filter();
                                                            objRtn.A1716CCUST = rs12.getString("A1716CCUST");
                                                            objRtn.A1716CIA = rs12.getString("A1716CIA");
                                                            objRtn.A1716FORMA = rs12.getString("A1716FORMA");
                                                            objRtn.A1716SERIE = rs12.getString("A1716SERIE");
                                                            objRtn.A1716CUPON = rs12.getString("A1716CUPON");
                                                            objRtn.A1716SEQT = rs12.getString("A1716SEQT");
                                                            objRtn.A1716SEQ = rs12.getString("A1716SEQ");

                                                            objRtn.A1716MODO = rs12.getString("A1716MODO");
                                                            objRtn.A1716FUENT = rs12.getString("A1716FUENT");
                                                            objRtn.A1716SUBFU = rs12.getString("A1716SUBFU");
                                                            objRtn.A1716FP = rs12.getString("A1716FP");

                                                            objRtn.A1716FUENT = rs12.getString("A1716FUENT");
                                                            objRtn.A1716ESTAD = rs12.getString("A1716ESTAD");
                                                            objRtn.A1716FFILE = rs12.getString("A1716FFILE");
                                                            objRtn.A1716FPRO = rs12.getString("A1716FPRO");
                                                            objRtn.A1716GRUPO = rs12.getString("A1716GRUPO");
                                                            objRtn.A1716CUR = rs12.getString("A1716CUR");
                                                            objRtn.A1716ACTIV = rs12.getDouble("A1716ACTIV");
                                                            objRtn.A1716PASIV = rs12.getDouble("A1716PASIV");
                                                            objRtn.A1716CUENT = rs12.getString("A1716CUENT");
                                                            objRtn.A1716SUBCU = rs12.getString("A1716SUBCU");
                                                            objRtn.A1716IDFIL = rs12.getString("A1716IDFIL");
                                                            objRtn.A1716TIDOC = rs12.getString("A1716TIDOC");
                                                            objRtn.A1716ORIG = rs12.getString("A1716ORIG");
                                                            objRtn.A1716FCONT = rs12.getString("A1716FCONT");

                                                            objRtn.A1716TITU = rs12.getString("A1716TITU");

                                                            objRtn.A1716COPE = rs12.getString("A1716COPE");
                                                            objRtn.A1716PROV = rs12.getString("A1716PROV");

                                                            objRtn.A1716IDCON = rs12.getString("A1716IDCON");

                                                            objRtn.TCOL = rs12.getString("TCOL");
                                                            //ZPP
                                                            objRtn.A1716FILE = rs12.getString("A1716FILE");
                                                            objRtn.A1716CLIEN = rs12.getString("A1716CLIEN");
                                                            objRtn.A1716DIREC = rs12.getString("A1716DIREC");
                                                            objRtn.A1716FOPI = rs12.getString("A1716FOPI");
                                                            objRtn.A1716SEQT = rs12.getString("A1716SEQT");
//                                                            
//                                                             if(objRtn.A1716CIA.length() >= 5 && objRtn.A1716CIA.substring(0, 5).equals("TOTAL")){
//
//                                                             }
//                                                            
                                                            if (objRtn.A1716MODO.isEmpty() || objRtn.A1716MODO.equals("---------")) {
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
                }
            }
            //</editor-fold>
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
            strSQL = "{CALL " + session.getMainLibrary() + ".SQP00686(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
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

    public String insertTKT(A2024Filter[] filter) throws SQLException, Exception {
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

    public List<PX0241S01A720Filter> loadViewAccounting(PX0241S01A720Filter filter) throws SQLException, Exception {
        List<PX0241S01A720Filter> lstRtn = new ArrayList<PX0241S01A720Filter>(0);
        PX0241S01A720Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL PRAXIS.PXTMP(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, filter.AIRLINE);
            cstmt01.setString(2, filter.TRANSACTION);
            cstmt01.setString(3, filter.TKT);
            cstmt01.setString(4, filter.SEQ);
            cstmt01.setString(5, filter.CUPON1);
            cstmt01.setString(6, filter.CUPON2);
            cstmt01.setString(7, filter.CUPON3);
            cstmt01.setString(8, filter.CUPON4);

            cstmt01.setString(9, filter.FROM);
            cstmt01.setString(10, filter.TO);
            cstmt01.setString(11, filter.FUENTE);
            cstmt01.setString(12, filter.PAIS);
            cstmt01.setString(13, filter.CHANNEL);

            cstmt01.setString(14, filter.FLAG);
            cstmt01.setString(15, filter.STERROR);
            cstmt01.setInt(16, filter.SEQTRAN);
            cstmt01.setString(17, filter.MODE);

            cstmt01.execute();
            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                if (filter.FLAG.equals("1")) {
                    int x1 = 1;
                    int x2 = 2;
                    int x3 = 3;
                    int x4 = 4;
                    int x5 = 5;
                    int x6 = 6;
                    int x8 = 8;
                    int x9 = 9;
                    int x10 = 10;
                    int x13 = 13;
                    int x15 = 15;
                    int x19 = 19;
                    int x29 = 29;
                    int x30 = 30;
                    if (!filter.TRANSACTION.equals("EXCH")) {
                        if (filter.TRANSACTION.equals("MEMO") || filter.TRANSACTION.equals("ACMS") || filter.TRANSACTION.equals("ADMS")) { //ZPP DADO DE BAJA 20171023 PARA IMPLEMETAR NUEVA FORMA
                            for (int i = 0; i < 40; i++) {
                                if (rs01.getString("PRE_CONTA").substring(125 + (i * x9), 134 + (i * x9)).trim().length() > 0) {
                                    objRtn = new PX0241S01A720Filter();
                                    //<editor-fold defaultstate="collapsed" desc="{...}">
                                    objRtn.TKT = rs01.getString("PRE_CONTA").substring(23, 36);
                                    objRtn.SEQ = rs01.getString("PRE_CONTA").substring(36, 38);
                                    objRtn.STATUS = rs01.getString("STATUS");
                                    objRtn.ERROR = rs01.getString("PRE_CONTA").substring(38, 39);
                                    objRtn.CODERROR = rs01.getString("PRE_CONTA").substring(39, 45);
                                    objRtn.MENSAJE = rs01.getString("PRE_CONTA").substring(45, 125);
                                    objRtn.GRUPO = rs01.getString("PRE_CONTA").substring(125 + (i * x9), 134 + (i * x9));
                                    objRtn.FUENTE = rs01.getString("PRE_CONTA").substring(485 + (i * x3), 488 + (i * x3));
                                    objRtn.PAIS = rs01.getString("PRE_CONTA").substring(605 + (i * x2), 607 + (i * x2));
                                    objRtn.SUBFUENTE = rs01.getString("PRE_CONTA").substring(685 + (i * x3), 688 + (i * x3));
                                    objRtn.TFUENTE = rs01.getString("PRE_CONTA").substring(805 + (i * x3), 808 + (i * x3));
                                    objRtn.BANCO = rs01.getString("PRE_CONTA").substring(925 + (i * x2), 927 + (i * x2));
                                    objRtn.IATA = rs01.getString("PRE_CONTA").substring(1005 + (i * x8), 1013 + (i * x8));
                                    objRtn.CSABRE = rs01.getString("PRE_CONTA").substring(1325 + (i * x5), 1330 + (i * x5));
                                    objRtn.FECHARPT = rs01.getString("PRE_CONTA").substring(1525 + (i * x8), 1533 + (i * x8));
                                    objRtn.MONEDA = rs01.getString("PRE_CONTA").substring(1845 + (i * x3), 1848 + (i * x3));
                                    objRtn.TCAMB = rs01.getString("PRE_CONTA").substring(1965 + (i * x13), 1972 + (i * x13)) + "." + rs01.getString("PRE_CONTA").substring(1972 + (i * x13), 1978 + (i * x13));
                                    objRtn.FECVTA = rs01.getString("PRE_CONTA").substring(2485 + (i * x8), 2493 + (i * x8));
                                    objRtn.TRANSACTION = rs01.getString("PRE_CONTA").substring(2805 + (i * x4), 2809 + (i * x4));
                                    objRtn.TDOC = rs01.getString("PRE_CONTA").substring(2965 + (i * x4), 2969 + (i * x4));
                                    objRtn.TFOR = rs01.getString("PRE_CONTA").substring(3125 + (i * x3), 3128 + (i * x3));
                                    objRtn.CONCEPT1 = rs01.getString("PRE_CONTA").substring(3245 + (i * x4), 3249 + (i * x4));
                                    objRtn.CONCEPT2 = rs01.getString("PRE_CONTA").substring(3405 + (i * x3), 3408 + (i * x3));
                                    objRtn.CONCEPT3 = rs01.getString("PRE_CONTA").substring(3525 + (i * x2), 3527 + (i * x2));
                                    objRtn.TTARJ = rs01.getString("PRE_CONTA").substring(3605 + (i * x2), 3607 + (i * x2));
                                    objRtn.NTARJ = rs01.getString("PRE_CONTA").substring(3685 + (i * x19), 3704 + (i * x19));
                                    objRtn.RFIC = rs01.getString("PRE_CONTA").substring(4445 + (i * x1), 4446 + (i * x1));
                                    objRtn.RFIS = rs01.getString("PRE_CONTA").substring(4485 + (i * x3), 4488 + (i * x3));
                                    if (this.cambia_caracter(rs01.getString("PRE_CONTA").substring(4619 + (i * x15), 4620 + (i * x15))).trim().length() > 1) {
                                        objRtn.DEBITO = "-" + rs01.getString("PRE_CONTA").substring(4605 + (i * x15), 4618 + (i * x15)) + "." + rs01.getString("PRE_CONTA").substring(4618 + (i * x15), 4619 + (i * x15)) + this.cambia_caracter(rs01.getString("PRE_CONTA").substring(4619 + (i * x15), 4620 + (i * x15))).substring(2, 2);
                                    } else {
                                        objRtn.DEBITO = rs01.getString("PRE_CONTA").substring(4605 + (i * x15), 4618 + (i * x15)) + "." + rs01.getString("PRE_CONTA").substring(4618 + (i * x15), 4620 + (i * x15));
                                    }
                                    if (Double.parseDouble(objRtn.DEBITO) == 0.00) {
                                        objRtn.DEBITO = "";
                                    }
                                    if (this.cambia_caracter(rs01.getString("PRE_CONTA").substring(5219 + (i * x15), 5220 + (i * x15))).trim().length() > 1) {
                                        objRtn.CREDITO = "-" + rs01.getString("PRE_CONTA").substring(5205 + (i * x15), 5218 + (i * x15)) + "." + rs01.getString("PRE_CONTA").substring(5218 + (i * x15), 5219 + (i * x15)) + this.cambia_caracter(rs01.getString("PRE_CONTA").substring(5219 + (i * x15), 5220 + (i * x15))).substring(2, 2);
                                    } else {
                                        objRtn.CREDITO = rs01.getString("PRE_CONTA").substring(5205 + (i * x15), 5218 + (i * x15)) + "." + rs01.getString("PRE_CONTA").substring(5218 + (i * x15), 5220 + (i * x15));
                                    }
                                    if (Double.parseDouble(objRtn.CREDITO) == 0.00) {
                                        objRtn.CREDITO = "";
                                    }
                                    if (this.cambia_caracter(rs01.getString("PRE_CONTA").substring(5819 + (i * x15), 5820 + (i * x15))).trim().length() > 1) {
                                        objRtn.DEBITORV = "-" + rs01.getString("PRE_CONTA").substring(5805 + (i * x15), 5818 + (i * x15)) + "." + rs01.getString("PRE_CONTA").substring(5818 + (i * x15), 5819 + (i * x15)) + this.cambia_caracter(rs01.getString("PRE_CONTA").substring(5819 + (i * x15), 5820 + (i * x15))).substring(2, 2);
                                    } else {
                                        objRtn.DEBITORV = rs01.getString("PRE_CONTA").substring(5805 + (i * x15), 5818 + (i * x15)) + "." + rs01.getString("PRE_CONTA").substring(5818 + (i * x15), 5820 + (i * x15));
                                    }
                                    if (Double.parseDouble(objRtn.DEBITORV) == 0.00) {
                                        objRtn.DEBITORV = "";
                                    }
                                    if (this.cambia_caracter(rs01.getString("PRE_CONTA").substring(6419 + (i * x15), 6420 + (i * x15))).trim().length() > 1) {
                                        objRtn.CREDITORV = "-" + rs01.getString("PRE_CONTA").substring(6405 + (i * x15), 6418 + (i * x15)) + "." + rs01.getString("PRE_CONTA").substring(6418 + (i * x15), 6419 + (i * x15)) + this.cambia_caracter(rs01.getString("PRE_CONTA").substring(6419 + (i * x15), 6420 + (i * x15))).substring(2, 2);
                                    } else {
                                        objRtn.CREDITORV = rs01.getString("PRE_CONTA").substring(6405 + (i * x15), 6418 + (i * x15)) + "." + rs01.getString("PRE_CONTA").substring(6418 + (i * x15), 6420 + (i * x15));
                                    }
                                    if (Double.parseDouble(objRtn.CREDITORV) == 0.00) {
                                        objRtn.CREDITORV = "";
                                    }
                                    objRtn.TASA = rs01.getString("PRE_CONTA").substring(7005 + (i * x2), 7007 + (i * x2));
                                    objRtn.FOP_IVA = rs01.getString("PRE_CONTA").substring(7085 + (i * x2), 7087 + (i * x2));
                                    objRtn.FOPEN = rs01.getString("PRE_CONTA").substring(7165 + (i * x8), 7173 + (i * x8));
                                    objRtn.VRIC = rs01.getString("PRE_CONTA").substring(7485 + (i * x10), 7495 + (i * x10));
                                    objRtn.PFC = rs01.getString("PRE_CONTA").substring(7885 + (i * x3), 7888 + (i * x3));
                                    objRtn.PNR = rs01.getString("PRE_CONTA").substring(8005 + (i * x6), 8011 + (i * x6));
                                    objRtn.IATAVTA = rs01.getString("PRE_CONTA").substring(8245 + (i * x8), 8253 + (i * x8));
                                    objRtn.FECUSO = rs01.getString("PRE_CONTA").substring(8565 + (i * x8), 8573 + (i * x8));
                                    objRtn.CTA = (rs01.getString("PRE_CONTA").substring(8885 + (i * x29), 8914 + (i * x29))).trim();

                                    objRtn.LIB1 = rs01.getString("PRE_CONTA").substring(10045 + (i * x2), 10047 + (i * x2));
                                    objRtn.CIA1 = rs01.getString("PRE_CONTA").substring(10125 + (i * x2), 10127 + (i * x2));
                                    objRtn.CLIENTE = rs01.getString("PRE_CONTA").substring(10205 + (i * x10), 10215 + (i * x10));
                                    objRtn.DIRECCION = rs01.getString("PRE_CONTA").substring(10605 + (i * x10), 10615 + (i * x10));
                                    objRtn.PROVEEDOR = rs01.getString("PRE_CONTA").substring(11005 + (i * x10), 11015 + (i * x10));
                                    objRtn.TD_ORACLE = rs01.getString("PRE_CONTA").substring(11405 + (i * x15), 11420 + (i * x15));
                                    objRtn.COMB = rs01.getString("PRE_CONTA").substring(12005 + (i * x2), 12007 + (i * x2));
                                    objRtn.TITULO = rs01.getString("PRE_CONTA").substring(12085 + (i * x30), 12115 + (i * x30));
                                    objRtn.SUCURSAL = rs01.getString("PRE_CONTA").substring(13285 + (i * x30), 13315 + (i * x30));
                                    objRtn.CTACTRL = rs01.getString("PRE_CONTA").substring(14485 + (i * x29), 14514 + (i * x29));
                                    objRtn.TITULOCTRL = rs01.getString("PRE_CONTA").substring(15645 + (i * x30), 15675 + (i * x30));
                                    objRtn.LIBCTRL = rs01.getString("PRE_CONTA").substring(16845 + (i * x2), 16847 + (i * x2));
                                    objRtn.CTAPROVEE = rs01.getString("PRE_CONTA").substring(16925 + (i * x29), 16954 + (i * x29));
                                    objRtn.TITULOPROVEE = rs01.getString("PRE_CONTA").substring(18085 + (i * x30), 18115 + (i * x30));
                                    objRtn.LIBPROVEE = rs01.getString("PRE_CONTA").substring(19285 + (i * x2), 19287 + (i * x2));
                                    objRtn.CTACTRLPROVEE = rs01.getString("PRE_CONTA").substring(19365 + (i * x29), 19394 + (i * x29));
                                    objRtn.TITULOCTRLPROVEE = rs01.getString("PRE_CONTA").substring(20525 + (i * x30), 20555 + (i * x30));
                                    objRtn.LIBCTRLPROVEE = rs01.getString("PRE_CONTA").substring(21725 + (i * x2), 21727 + (i * x2));
                                    objRtn.CTAARPROVEE = rs01.getString("PRE_CONTA").substring(21805 + (i * x29), 21834 + (i * x29));
                                    objRtn.TITULOARPROVEE = rs01.getString("PRE_CONTA").substring(22965 + (i * x30), 22995 + (i * x30));
                                    objRtn.LIBARPROVEE = rs01.getString("PRE_CONTA").substring(24165 + (i * x2), 24167 + (i * x2));
                                    objRtn.CLIENTEAR06 = rs01.getString("PRE_CONTA").substring(24245 + (i * x10), 24255 + (i * x10));
                                    objRtn.DIRECCIONAR06 = rs01.getString("PRE_CONTA").substring(24645 + (i * x10), 24655 + (i * x10));
                                    objRtn.TD_ORACLEAR06 = rs01.getString("PRE_CONTA").substring(25045 + (i * x15), 25060 + (i * x15));
                                    //</editor-fold>
                                    lstRtn.add(objRtn);
                                } else {
                                    if (i == 0) {
                                        objRtn = new PX0241S01A720Filter();
                                        objRtn.ERROR = rs01.getString("PRE_CONTA").substring(38, 39);
                                        objRtn.CODERROR = rs01.getString("PRE_CONTA").substring(39, 45);
                                        objRtn.MENSAJE = rs01.getString("PRE_CONTA").substring(45, 125);
                                        lstRtn.add(objRtn);
                                    } else {
                                        i = 50;
                                    }
                                }
                            }
                        }
                        /* ZPP INICIO 20171023*/
                        if (filter.TRANSACTION.equals("SALE")) {
                            session.getCNXIBMDB2().openSystem();
                            ProgramCall program = new ProgramCall(session.getCNXIBMDB2().getSystem());
                            try {
                                App.CALL_CL3050(session.getCNXIBMDB2().getSystem(), session.getMainLibrary(), session.getUserView().getCustomerInfo().CCUST);
                                String programName = "/QSYS.LIB/" + session.getMainLibrary() + ".LIB/PRO11093.PGM";//
                                //<editor-fold defaultstate="collapsed" desc="{...} Mapping">
                                AS400Map mapping = new AS400Map();

                                //<editor-fold defaultstate="collapsed" desc="{...} TRAMA-10204-IN    ">
                                class IDX_TRAMA_10204_IN {

                                    static final int TRAMA_10204_IN = 0;
                                }
                                AS400DataType[] TRAMA_10204_IN = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...} 01 REC-DATA-10204-IN    ">
                                class IDX_REC_DATA_10204_IN {

                                    static final int DATOS_IN = 0;
                                }
                                AS400DataType[] REC_DATA_10204_IN = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}   03 DATOS-IN      ">
                                class IDX_DATOS_IN {

                                    static final int REC_PROGRAMA_10204 = 0;
                                    static final int REC_GRUPO_10204 = 1;
                                    static final int REC_TRNC_10204 = 2;
                                    static final int REC_CIA_10204 = 3;
                                    static final int REC_FORMA_10204 = 4;
                                    static final int REC_SERIE_10204 = 5;
                                    static final int REC_SEQ_10204 = 6;
                                }
                                AS400DataType[] DATOS_IN = new AS400DataType[7];
                                DATOS_IN[IDX_DATOS_IN.REC_PROGRAMA_10204] = mapping.Char(10);
                                DATOS_IN[IDX_DATOS_IN.REC_GRUPO_10204] = mapping.Char(9);
                                DATOS_IN[IDX_DATOS_IN.REC_TRNC_10204] = mapping.Char(4);
                                DATOS_IN[IDX_DATOS_IN.REC_CIA_10204] = mapping.Char(3);
                                DATOS_IN[IDX_DATOS_IN.REC_FORMA_10204] = mapping.Char(4);
                                DATOS_IN[IDX_DATOS_IN.REC_SERIE_10204] = mapping.Char(6);
                                DATOS_IN[IDX_DATOS_IN.REC_SEQ_10204] = mapping.Char(2);

                                REC_DATA_10204_IN[IDX_REC_DATA_10204_IN.DATOS_IN] = mapping.Char(mapping.GetDimension(DATOS_IN));
                                TRAMA_10204_IN[IDX_TRAMA_10204_IN.TRAMA_10204_IN] = mapping.Char(mapping.GetDimension(REC_DATA_10204_IN));
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...} TRAMA-10204    ">
                                class IDX_TRAMA_10204 {

                                    static final int TRAMA_10204 = 0;
                                }
                                AS400DataType[] TRAMA_10204 = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...} 01 REC-DATA-10204    ">
                                class IDX_REC_DATA_10204 {

                                    static final int DATOS_INPUT = 0;
                                    static final int DATOS_OUTPUT = 1;
                                }
                                AS400DataType[] REC_DATA_10204 = new AS400DataType[2];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}   03 DATOS-INPUT      ">
                                class IDX_DATOS_INPUT {

                                    static final int REC_PROGRAMA_10204 = 0;
                                    static final int REC_GRUPO_10204 = 1;
                                    static final int REC_TRNC_10204 = 2;
                                    static final int REC_CIA_10204 = 3;
                                    static final int REC_FORMA_10204 = 4;
                                    static final int REC_SERIE_10204 = 5;
                                    static final int REC_SEQ_10204 = 6;
                                }
                                AS400DataType[] DATOS_INPUT = new AS400DataType[7];
                                DATOS_INPUT[IDX_DATOS_INPUT.REC_PROGRAMA_10204] = mapping.Char(10);
                                DATOS_INPUT[IDX_DATOS_INPUT.REC_GRUPO_10204] = mapping.Char(9);
                                DATOS_INPUT[IDX_DATOS_INPUT.REC_TRNC_10204] = mapping.Char(4);
                                DATOS_INPUT[IDX_DATOS_INPUT.REC_CIA_10204] = mapping.Char(3);
                                DATOS_INPUT[IDX_DATOS_INPUT.REC_FORMA_10204] = mapping.Char(4);
                                DATOS_INPUT[IDX_DATOS_INPUT.REC_SERIE_10204] = mapping.Char(6);
                                DATOS_INPUT[IDX_DATOS_INPUT.REC_SEQ_10204] = mapping.Char(2);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}   03 DATOS-OUTPUT * ">
                                class IDX_DATOS_OUTPUT {

                                    static final int REC_ESTADO_10204 = 0;
                                    static final int REC_CODERR_10204 = 1;
                                    static final int REC_MSJERR_10204 = 2;
                                    static final int RD_GRUPO = 3;
                                    static final int RD_FUENT = 4;
                                    static final int RD_PSVTA = 5;
                                    static final int RD_SFUEN = 6;
                                    static final int RD_TFUEN = 7;
                                    static final int RD_BANCO = 8;
                                    static final int RD_AGENT = 9;
                                    static final int RD_CSABR = 10;
                                    static final int RD_FPROC = 11;
                                    static final int RD_MDALOC = 12;
                                    static final int RD_TCAMB = 13;
                                    static final int RD_FECVTA = 14;
                                    static final int RD_TRNC = 15;
                                    static final int RD_TDOC = 16;
                                    static final int RD_TFOR = 17;
                                    static final int RD_CONP1 = 18;
                                    static final int RD_CONP2 = 19;
                                    static final int RD_CONP3 = 20;
                                    static final int RD_TTARJ = 21;
                                    static final int RD_NTARJ = 22;
                                    static final int RD_RFIC = 23;
                                    static final int RD_RFIS = 24;
                                    static final int RD_DEBLOC = 25;
                                    static final int RD_CRELOC = 26;
                                    static final int RD_DEBREV = 27;
                                    static final int RD_CREREV = 28;
                                    static final int RD_TASIVA = 29;
                                    static final int RD_FOPIVA = 30;
                                    static final int RD_FOPEN = 31;
                                    static final int RD_VRIC = 32;
                                    static final int RD_PFC = 33;
                                    static final int RD_PNR = 34;
                                    static final int RD_AGTVTA = 35;
                                    static final int RD_FECUSO = 36;
                                    static final int RD_CTA = 37;
                                    static final int RD_LIB1 = 38;
                                    static final int RD_LIB1CIA = 39;
                                    static final int RD_CLIENT = 40;
                                    static final int RD_DIRECC = 41;
                                    static final int RD_PROVEE = 42;
                                    static final int RD_TD_ORAC = 43;
                                    static final int RD_COMB = 44;
                                    static final int RD_TITU = 45;
                                    static final int RD_SURC = 46;
                                    //ZPP
                                    static final int RD_CTAC = 47;
                                    static final int RD_TITUC = 48;
                                    static final int RD_LIB1C = 49;
                                    static final int RD_CTAP = 50;
                                    static final int RD_TITUP = 51;
                                    static final int RD_TLIB1P = 52;
                                    static final int RD_CTAPC = 53;
                                    static final int RD_TITUPC = 54;
                                    static final int RD_LIB1PC = 55;
                                    static final int RD_CTAPAR = 56;
                                    static final int RD_TITUPAR = 57;
                                    static final int RD_LIB1PAR = 58;
                                    static final int RD_CLIENTAR = 59;
                                    static final int RD_DIRECCAR = 60;
                                    static final int RD_TDORACAR = 61;
                                }
                                AS400DataType[] DATOS_OUTPUT = new AS400DataType[62];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 REC-ESTADO-10204">
                                AS400DataType[] REC_ESTADO_10204 = new AS400DataType[1];
                                REC_ESTADO_10204[0] = mapping.Char(1);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 REC-CODERR-10204">
                                AS400DataType[] REC_CODERR_10204 = new AS400DataType[1];
                                REC_CODERR_10204[0] = mapping.Char(6);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 REC-MSJERR-10204">
                                AS400DataType[] REC_MSJERR_10204 = new AS400DataType[1];
                                REC_MSJERR_10204[0] = mapping.Char(80);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-GRUPO       ">
                                AS400DataType[] RD_GRUPO = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-GRUPO     ">
                                class IDX_WO_GRUPO {

                                    static final int RD_GRUPO = 0;
                                }
                                AS400DataType[] WO_GRUPO = new AS400DataType[1];
                                WO_GRUPO[IDX_WO_GRUPO.RD_GRUPO] = mapping.Char(9);

                                RD_GRUPO[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_GRUPO)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-FUENT       ">
                                AS400DataType[] RD_FUENT = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-FUENT     ">
                                class IDX_WO_FUENT {

                                    static final int RD_FUENT = 0;
                                }
                                AS400DataType[] WO_FUENT = new AS400DataType[1];
                                WO_FUENT[IDX_WO_FUENT.RD_FUENT] = mapping.Char(3);

                                RD_FUENT[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_FUENT)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-PSVTA       ">
                                AS400DataType[] RD_PSVTA = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-PSVTA     ">
                                class IDX_WO_PSVTA {

                                    static final int RD_PSVTA = 0;
                                }
                                AS400DataType[] WO_PSVTA = new AS400DataType[1];
                                WO_PSVTA[IDX_WO_PSVTA.RD_PSVTA] = mapping.Char(2);

                                RD_PSVTA[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_PSVTA)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-SFUEN       ">
                                AS400DataType[] RD_SFUEN = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-SFUEN     ">
                                class IDX_WO_SFUEN {

                                    static final int RD_SFUEN = 0;
                                }
                                AS400DataType[] WO_SFUEN = new AS400DataType[1];
                                WO_SFUEN[IDX_WO_SFUEN.RD_SFUEN] = mapping.Char(3);

                                RD_SFUEN[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_SFUEN)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-TFUEN       ">
                                AS400DataType[] RD_TFUEN = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-TFUEN     ">
                                class IDX_WO_TFUEN {

                                    static final int RD_TFUEN = 0;
                                }
                                AS400DataType[] WO_TFUEN = new AS400DataType[1];
                                WO_TFUEN[IDX_WO_TFUEN.RD_TFUEN] = mapping.Char(3);

                                RD_TFUEN[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_TFUEN)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-BANCO       ">
                                AS400DataType[] RD_BANCO = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-BANCO     ">
                                class IDX_WO_BANCO {

                                    static final int RD_BANCO = 0;
                                }
                                AS400DataType[] WO_BANCO = new AS400DataType[1];
                                WO_BANCO[IDX_WO_BANCO.RD_BANCO] = mapping.Char(2);

                                RD_BANCO[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_BANCO)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-AGENT       ">
                                AS400DataType[] RD_AGENT = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-AGENT     ">
                                class IDX_WO_AGENT {

                                    static final int RD_AGENT = 0;
                                }
                                AS400DataType[] WO_AGENT = new AS400DataType[1];
                                WO_AGENT[IDX_WO_AGENT.RD_AGENT] = mapping.Char(8);

                                RD_AGENT[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_AGENT)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-CSABR       ">
                                AS400DataType[] RD_CSABR = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-CSABR     ">
                                class IDX_WO_CSABR {

                                    static final int RD_CSABR = 0;
                                }
                                AS400DataType[] WO_CSABR = new AS400DataType[1];
                                WO_CSABR[IDX_WO_CSABR.RD_CSABR] = mapping.Char(5);

                                RD_CSABR[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_CSABR)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-FPROC       ">
                                AS400DataType[] RD_FPROC = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-FPROC     ">
                                class IDX_WO_FPROC {

                                    static final int RD_FPROC = 0;
                                }
                                AS400DataType[] WO_FPROC = new AS400DataType[1];
                                WO_FPROC[IDX_WO_FPROC.RD_FPROC] = mapping.Char(8);

                                RD_FPROC[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_FPROC)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-MDALOC       ">
                                AS400DataType[] RD_MDALOC = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-MDALOC     ">
                                class IDX_WO_MDALOC {

                                    static final int RD_MDALOC = 0;
                                }
                                AS400DataType[] WO_MDALOC = new AS400DataType[1];
                                WO_MDALOC[IDX_WO_MDALOC.RD_MDALOC] = mapping.Char(3);

                                RD_MDALOC[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_MDALOC)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-TCAMB       ">
                                AS400DataType[] RD_TCAMB = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-TCAMB     ">
                                class IDX_WO_TCAMB {

                                    static final int RD_TCAMB = 0;
                                }
                                AS400DataType[] WO_TCAMB = new AS400DataType[1];
                                WO_TCAMB[IDX_WO_TCAMB.RD_TCAMB] = mapping.Numeric(7, 6, true);

                                RD_TCAMB[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_TCAMB)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-FECVTA       ">
                                AS400DataType[] RD_FECVTA = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-FECVTA     ">
                                class IDX_WO_FECVTA {

                                    static final int RD_FECVTA = 0;
                                }
                                AS400DataType[] WO_FECVTA = new AS400DataType[1];
                                WO_FECVTA[IDX_WO_FECVTA.RD_FECVTA] = mapping.Char(8);

                                RD_FECVTA[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_FECVTA)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-TRNC       ">
                                AS400DataType[] RD_TRNC = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-TRNC     ">
                                class IDX_WO_TRNC {

                                    static final int RD_TRNC = 0;
                                }
                                AS400DataType[] WO_TRNC = new AS400DataType[1];
                                WO_TRNC[IDX_WO_TRNC.RD_TRNC] = mapping.Char(4);

                                RD_TRNC[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_TRNC)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-TDOC       ">
                                AS400DataType[] RD_TDOC = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-TDOC     ">
                                class IDX_WO_TDOC {

                                    static final int RD_TDOC = 0;
                                }
                                AS400DataType[] WO_TDOC = new AS400DataType[1];
                                WO_TDOC[IDX_WO_TDOC.RD_TDOC] = mapping.Char(4);

                                RD_TDOC[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_TDOC)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-TFOR       ">
                                AS400DataType[] RD_TFOR = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-TFOR     ">
                                class IDX_WO_TFOR {

                                    static final int RD_TFOR = 0;
                                }
                                AS400DataType[] WO_TFOR = new AS400DataType[1];
                                WO_TFOR[IDX_WO_TFOR.RD_TFOR] = mapping.Char(3);

                                RD_TFOR[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_TFOR)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-CONP1       ">
                                AS400DataType[] RD_CONP1 = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-CONP1     ">
                                class IDX_WO_CONP1 {

                                    static final int RD_CONP1 = 0;
                                }
                                AS400DataType[] WO_CONP1 = new AS400DataType[1];
                                WO_CONP1[IDX_WO_CONP1.RD_CONP1] = mapping.Char(4);

                                RD_CONP1[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_CONP1)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-CONP2       ">
                                AS400DataType[] RD_CONP2 = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-CONP2     ">
                                class IDX_WO_CONP2 {

                                    static final int RD_CONP2 = 0;
                                }
                                AS400DataType[] WO_CONP2 = new AS400DataType[1];
                                WO_CONP2[IDX_WO_CONP2.RD_CONP2] = mapping.Char(3);

                                RD_CONP2[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_CONP2)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-CONP3       ">
                                AS400DataType[] RD_CONP3 = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-CONP3     ">
                                class IDX_WO_CONP3 {

                                    static final int RD_CONP3 = 0;
                                }
                                AS400DataType[] WO_CONP3 = new AS400DataType[1];
                                WO_CONP3[IDX_WO_CONP3.RD_CONP3] = mapping.Char(2);

                                RD_CONP3[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_CONP3)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-TTARJ       ">
                                AS400DataType[] RD_TTARJ = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-TTARJ     ">
                                class IDX_WO_TTARJ {

                                    static final int RD_TTARJ = 0;
                                }
                                AS400DataType[] WO_TTARJ = new AS400DataType[1];
                                WO_TTARJ[IDX_WO_TTARJ.RD_TTARJ] = mapping.Char(2);

                                RD_TTARJ[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_TTARJ)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-NTARJ       ">
                                AS400DataType[] RD_NTARJ = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-NTARJ     ">
                                class IDX_WO_NTARJ {

                                    static final int RD_NTARJ = 0;
                                }
                                AS400DataType[] WO_NTARJ = new AS400DataType[1];
                                WO_NTARJ[IDX_WO_NTARJ.RD_NTARJ] = mapping.Char(19);

                                RD_NTARJ[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_NTARJ)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-RFIC       ">
                                AS400DataType[] RD_RFIC = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-RFIC     ">
                                class IDX_WO_RFIC {

                                    static final int RD_RFIC = 0;
                                }
                                AS400DataType[] WO_RFIC = new AS400DataType[1];
                                WO_RFIC[IDX_WO_RFIC.RD_RFIC] = mapping.Char(1);

                                RD_RFIC[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_RFIC)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-RFIS       ">
                                AS400DataType[] RD_RFIS = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-RFIS     ">
                                class IDX_WO_RFIS {

                                    static final int RD_RFIS = 0;
                                }
                                AS400DataType[] WO_RFIS = new AS400DataType[1];
                                WO_RFIS[IDX_WO_RFIS.RD_RFIS] = mapping.Char(3);

                                RD_RFIS[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_RFIS)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-DEBLOC       ">
                                AS400DataType[] RD_DEBLOC = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-DEBLOC     ">
                                class IDX_WO_DEBLOC {

                                    static final int RD_DEBLOC = 0;
                                }
                                AS400DataType[] WO_DEBLOC = new AS400DataType[1];
                                WO_DEBLOC[IDX_WO_DEBLOC.RD_DEBLOC] = mapping.Numeric(13, 2, true);

                                RD_DEBLOC[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_DEBLOC)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-CRELOC       ">
                                AS400DataType[] RD_CRELOC = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-CRELOC     ">
                                class IDX_WO_CRELOC {

                                    static final int RD_CRELOC = 0;
                                }
                                AS400DataType[] WO_CRELOC = new AS400DataType[1];
                                WO_CRELOC[IDX_WO_CRELOC.RD_CRELOC] = mapping.Numeric(13, 2, true);

                                RD_CRELOC[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_CRELOC)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-DEBREV       ">
                                AS400DataType[] RD_DEBREV = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-DEBREV     ">
                                class IDX_WO_DEBREV {

                                    static final int RD_DEBREV = 0;
                                }
                                AS400DataType[] WO_DEBREV = new AS400DataType[1];
                                WO_DEBREV[IDX_WO_DEBREV.RD_DEBREV] = mapping.Numeric(13, 2, true);

                                RD_DEBREV[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_DEBREV)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-CREREV       ">
                                AS400DataType[] RD_CREREV = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-CREREV     ">
                                class IDX_WO_CREREV {

                                    static final int RD_CREREV = 0;
                                }
                                AS400DataType[] WO_CREREV = new AS400DataType[1];
                                WO_CREREV[IDX_WO_CREREV.RD_CREREV] = mapping.Numeric(13, 2, true);

                                RD_CREREV[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_CREREV)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-TASIVA       ">
                                AS400DataType[] RD_TASIVA = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-TASIVA     ">
                                class IDX_WO_TASIVA {

                                    static final int RD_TASIVA = 0;
                                }
                                AS400DataType[] WO_TASIVA = new AS400DataType[1];
                                WO_TASIVA[IDX_WO_TASIVA.RD_TASIVA] = mapping.Char(2);

                                RD_TASIVA[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_TASIVA)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-FOPIVA       ">
                                AS400DataType[] RD_FOPIVA = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-FOPIVA     ">
                                class IDX_WO_FOPIVA {

                                    static final int RD_FOPIVA = 0;
                                }
                                AS400DataType[] WO_FOPIVA = new AS400DataType[1];
                                WO_FOPIVA[IDX_WO_FOPIVA.RD_FOPIVA] = mapping.Char(2);

                                RD_FOPIVA[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_FOPIVA)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-FOPEN       ">
                                AS400DataType[] RD_FOPEN = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-FOPEN     ">
                                class IDX_WO_FOPEN {

                                    static final int RD_FOPEN = 0;
                                }
                                AS400DataType[] WO_FOPEN = new AS400DataType[1];
                                WO_FOPEN[IDX_WO_FOPEN.RD_FOPEN] = mapping.Char(8);

                                RD_FOPEN[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_FOPEN)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-VRIC       ">
                                AS400DataType[] RD_VRIC = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-VRIC     ">
                                class IDX_WO_VRIC {

                                    static final int RD_VRIC = 0;
                                }
                                AS400DataType[] WO_VRIC = new AS400DataType[1];
                                WO_VRIC[IDX_WO_VRIC.RD_VRIC] = mapping.Char(10);

                                RD_VRIC[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_VRIC)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-PFC       ">
                                AS400DataType[] RD_PFC = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-PFC     ">
                                class IDX_WO_PFC {

                                    static final int RD_PFC = 0;
                                }
                                AS400DataType[] WO_PFC = new AS400DataType[1];
                                WO_PFC[IDX_WO_PFC.RD_PFC] = mapping.Char(3);

                                RD_PFC[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_PFC)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-PNR       ">
                                AS400DataType[] RD_PNR = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-PNR     ">
                                class IDX_WO_PNR {

                                    static final int RD_PNR = 0;
                                }
                                AS400DataType[] WO_PNR = new AS400DataType[1];
                                WO_PNR[IDX_WO_PNR.RD_PNR] = mapping.Char(6);

                                RD_PNR[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_PNR)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-AGTVTA       ">
                                AS400DataType[] RD_AGTVTA = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-AGTVTA     ">
                                class IDX_WO_AGTVTA {

                                    static final int RD_AGTVTA = 0;
                                }
                                AS400DataType[] WO_AGTVTA = new AS400DataType[1];
                                WO_AGTVTA[IDX_WO_AGTVTA.RD_AGTVTA] = mapping.Char(8);

                                RD_AGTVTA[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_AGTVTA)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-FECUSO       ">
                                AS400DataType[] RD_FECUSO = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-FECUSO     ">
                                class IDX_WO_FECUSO {

                                    static final int RD_FECUSO = 0;
                                }
                                AS400DataType[] WO_FECUSO = new AS400DataType[1];
                                WO_FECUSO[IDX_WO_FECUSO.RD_FECUSO] = mapping.Char(8);

                                RD_FECUSO[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_FECUSO)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-CTA       ">
                                AS400DataType[] RD_CTA = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-CTA     ">
                                class IDX_WO_CTA {

                                    static final int RD_CTA = 0;
                                }
                                AS400DataType[] WO_CTA = new AS400DataType[1];
                                WO_CTA[IDX_WO_CTA.RD_CTA] = mapping.Char(29);

                                RD_CTA[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_CTA)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-LIB1       ">
                                AS400DataType[] RD_LIB1 = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-LIB1     ">
                                class IDX_WO_LIB1 {

                                    static final int RD_LIB1 = 0;
                                }
                                AS400DataType[] WO_LIB1 = new AS400DataType[1];
                                WO_LIB1[IDX_WO_LIB1.RD_LIB1] = mapping.Char(2);

                                RD_LIB1[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_LIB1)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-LIB1CIA       ">
                                AS400DataType[] RD_LIB1CIA = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-LIB1CIA     ">
                                class IDX_WO_LIB1CIA {

                                    static final int RD_LIB1CIA = 0;
                                }
                                AS400DataType[] WO_LIB1CIA = new AS400DataType[1];
                                WO_LIB1CIA[IDX_WO_LIB1CIA.RD_LIB1CIA] = mapping.Char(2);

                                RD_LIB1CIA[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_LIB1CIA)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-CLIENT       ">
                                AS400DataType[] RD_CLIENT = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-CLIENT     ">
                                class IDX_WO_CLIENT {

                                    static final int RD_CLIENT = 0;
                                }
                                AS400DataType[] WO_CLIENT = new AS400DataType[1];
                                WO_CLIENT[IDX_WO_CLIENT.RD_CLIENT] = mapping.Char(10);

                                RD_CLIENT[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_CLIENT)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-DIRECC       ">
                                AS400DataType[] RD_DIRECC = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-DIRECC     ">
                                class IDX_WO_DIRECC {

                                    static final int RD_DIRECC = 0;
                                }
                                AS400DataType[] WO_DIRECC = new AS400DataType[1];
                                WO_DIRECC[IDX_WO_DIRECC.RD_DIRECC] = mapping.Char(10);

                                RD_DIRECC[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_DIRECC)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-PROVEE       ">
                                AS400DataType[] RD_PROVEE = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-PROVEE     ">
                                class IDX_WO_PROVEE {

                                    static final int RD_PROVEE = 0;
                                }
                                AS400DataType[] WO_PROVEE = new AS400DataType[1];
                                WO_PROVEE[IDX_WO_PROVEE.RD_PROVEE] = mapping.Char(10);

                                RD_PROVEE[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_PROVEE)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-TD-ORAC       ">
                                AS400DataType[] RD_TD_ORAC = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-TD-ORAC     ">
                                class IDX_WO_TD_ORAC {

                                    static final int RD_TD_ORAC = 0;
                                }
                                AS400DataType[] WO_TD_ORAC = new AS400DataType[1];
                                WO_TD_ORAC[IDX_WO_TD_ORAC.RD_TD_ORAC] = mapping.Char(15);

                                RD_TD_ORAC[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_TD_ORAC)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-COMB       ">
                                AS400DataType[] RD_COMB = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-COMB     ">
                                class IDX_WO_COMB {

                                    static final int RD_COMB = 0;
                                }
                                AS400DataType[] WO_COMB = new AS400DataType[1];
                                WO_COMB[IDX_WO_COMB.RD_COMB] = mapping.Numeric(2, 0, false);

                                RD_COMB[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_COMB)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-TITU       ">
                                AS400DataType[] RD_TITU = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-TITU     ">
                                class IDX_WO_TITU {

                                    static final int RD_TITU = 0;
                                }
                                AS400DataType[] WO_TITU = new AS400DataType[1];
                                WO_TITU[IDX_WO_TITU.RD_TITU] = mapping.Char(30);

                                RD_TITU[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_TITU)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-SURC       ">
                                AS400DataType[] RD_SURC = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-SURC     ">
                                class IDX_WO_SURC {

                                    static final int RD_SURC = 0;
                                }
                                AS400DataType[] WO_SURC = new AS400DataType[1];
                                WO_SURC[IDX_WO_SURC.RD_SURC] = mapping.Char(30);

                                RD_SURC[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_SURC)), 200);
                                //</editor-fold>

                                //ZENOBIO 20171023
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-CTAC       ">
                                AS400DataType[] RD_CTAC = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-CTAC     ">
                                class IDX_WO_CTAC {

                                    static final int RD_CTAC = 0;
                                }
                                AS400DataType[] WO_CTAC = new AS400DataType[1];
                                WO_CTAC[IDX_WO_CTAC.RD_CTAC] = mapping.Char(29);
                                RD_CTAC[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_CTAC)), 200);
                                //</editor-fold>
                                //SEGUNDO
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-TITUC       ">
                                AS400DataType[] RD_TITUC = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-TITUC     ">
                                class IDX_WO_TITUC {

                                    static final int RD_TITUC = 0;
                                }
                                AS400DataType[] WO_TITUC = new AS400DataType[1];
                                WO_TITUC[IDX_WO_TITUC.RD_TITUC] = mapping.Char(30);
                                RD_TITUC[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_TITUC)), 200);
                                //</editor-fold>
                                //TERCER
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-LIB1C       ">
                                AS400DataType[] RD_LIB1C = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-LIB1C     ">
                                class IDX_WO_LIB1C {

                                    static final int RD_LIB1C = 0;
                                }
                                AS400DataType[] WO_LIB1C = new AS400DataType[1];
                                WO_LIB1C[IDX_WO_LIB1C.RD_LIB1C] = mapping.Char(2);
                                RD_LIB1C[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_LIB1C)), 200);
                                //</editor-fold>
                                //CUARTO
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-CTAP       ">
                                AS400DataType[] RD_CTAP = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-CTAP     ">
                                class IDX_WO_CTAP {

                                    static final int RD_CTAP = 0;
                                }
                                AS400DataType[] WO_CTAP = new AS400DataType[1];
                                WO_CTAP[IDX_WO_CTAP.RD_CTAP] = mapping.Char(29);
                                RD_CTAP[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_CTAP)), 200);
                                //</editor-fold>
                                //QUINTO
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-CTAP       ">
                                AS400DataType[] RD_TITUP = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-CTAP     ">
                                class IDX_WO_TITUP {

                                    static final int RD_TITUP = 0;
                                }
                                AS400DataType[] WO_TITUP = new AS400DataType[1];
                                WO_TITUP[IDX_WO_TITUP.RD_TITUP] = mapping.Char(30);
                                RD_TITUP[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_TITUP)), 200);
                                //</editor-fold>
                                //SEXTO
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-TLIB1P       ">
                                AS400DataType[] RD_TLIB1P = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-TLIB1P     ">
                                class IDX_WO_TLIB1P {

                                    static final int RD_TLIB1P = 0;
                                }
                                AS400DataType[] WO_TLIB1P = new AS400DataType[1];
                                WO_TLIB1P[IDX_WO_TLIB1P.RD_TLIB1P] = mapping.Char(2);
                                RD_TLIB1P[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_TLIB1P)), 200);
                                //</editor-fold>
                                //SEPTIMO
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-CTAPC       ">
                                AS400DataType[] RD_CTAPC = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-CTAPC     ">
                                class IDX_WO_CTAPC {

                                    static final int RD_CTAPC = 0;
                                }
                                AS400DataType[] WO_CTAPC = new AS400DataType[1];
                                WO_CTAPC[IDX_WO_CTAPC.RD_CTAPC] = mapping.Char(29);
                                RD_CTAPC[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_CTAPC)), 200);
                                //</editor-fold>
                                //OCTVA
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-TITUPC       ">
                                AS400DataType[] RD_TITUPC = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-TITUPC     ">
                                class IDX_WO_TITUPC {

                                    static final int RD_TITUPC = 0;
                                }
                                AS400DataType[] WO_TITUPC = new AS400DataType[1];
                                WO_TITUPC[IDX_WO_TITUPC.RD_TITUPC] = mapping.Char(30);
                                RD_TITUPC[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_TITUPC)), 200);
                                //</editor-fold>
                                //NUEVE
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-LIB1PC       ">
                                AS400DataType[] RD_LIB1PC = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-LIB1PC     ">
                                class IDX_WO_LIB1PC {

                                    static final int RD_LIB1PC = 0;
                                }
                                AS400DataType[] WO_LIB1PC = new AS400DataType[1];
                                WO_LIB1PC[IDX_WO_LIB1PC.RD_LIB1PC] = mapping.Char(2);
                                RD_LIB1PC[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_LIB1PC)), 200);
                                //</editor-fold>
                                //DIES
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-LIB1PC       ">
                                AS400DataType[] RD_CTAPAR = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-LIB1PC     ">
                                class IDX_WO_CTAPAR {

                                    static final int RD_CTAPAR = 0;
                                }
                                AS400DataType[] WO_CTAPAR = new AS400DataType[1];
                                WO_CTAPAR[IDX_WO_CTAPAR.RD_CTAPAR] = mapping.Char(29);
                                RD_CTAPAR[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_CTAPAR)), 200);
                                //</editor-fold>
                                //ONCE
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-TITUPAR       ">
                                AS400DataType[] RD_TITUPAR = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-TITUPAR     ">
                                class IDX_WO_TITUPAR {

                                    static final int RD_TITUPAR = 0;
                                }
                                AS400DataType[] WO_TITUPAR = new AS400DataType[1];
                                WO_TITUPAR[IDX_WO_TITUPAR.RD_TITUPAR] = mapping.Char(30);
                                RD_TITUPAR[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_TITUPAR)), 200);
                                //</editor-fold>
                                //DOCE
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-TITUPAR       ">
                                AS400DataType[] RD_LIB1PAR = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-TITUPAR     ">
                                class IDX_WO_LIB1PAR {

                                    static final int RD_LIB1PAR = 0;
                                }
                                AS400DataType[] WO_LIB1PAR = new AS400DataType[1];
                                WO_LIB1PAR[IDX_WO_LIB1PAR.RD_LIB1PAR] = mapping.Char(2);
                                RD_LIB1PAR[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_LIB1PAR)), 200);
                                //</editor-fold>
                                //TRECE
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-CLIENTAR       ">
                                AS400DataType[] RD_CLIENTAR = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-CLIENTAR     ">
                                class IDX_WO_CLIENTAR {

                                    static final int RD_CLIENTAR = 0;
                                }
                                AS400DataType[] WO_CLIENTAR = new AS400DataType[1];
                                WO_CLIENTAR[IDX_WO_CLIENTAR.RD_CLIENTAR] = mapping.Char(10);
                                RD_CLIENTAR[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_CLIENTAR)), 200);
                                //</editor-fold>
                                //CATORCE
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-DIRECCAR       ">
                                AS400DataType[] RD_DIRECCAR = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-DIRECCAR     ">
                                class IDX_WO_DIRECCAR {

                                    static final int RD_DIRECCAR = 0;
                                }
                                AS400DataType[] WO_DIRECCAR = new AS400DataType[1];
                                WO_DIRECCAR[IDX_WO_DIRECCAR.RD_DIRECCAR] = mapping.Char(10);
                                RD_DIRECCAR[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_DIRECCAR)), 200);
                                //</editor-fold>
                                //QUINCE
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-DIRECCAR       ">
                                AS400DataType[] RD_TDORACAR = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-DIRECCAR     ">
                                class IDX_WO_TDORACAR {

                                    static final int RD_TDORACAR = 0;
                                }
                                AS400DataType[] WO_TDORACAR = new AS400DataType[1];
                                WO_TDORACAR[IDX_WO_TDORACAR.RD_TDORACAR] = mapping.Char(15);
                                RD_TDORACAR[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_TDORACAR)), 200);
                                //</editor-fold>

                                //ZENOBIO FIN
                                //<editor-fold defaultstate="collapsed" desc="{...}*DATOS_OUTPUT">
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.REC_ESTADO_10204] = mapping.Char(mapping.GetDimension(REC_ESTADO_10204));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.REC_CODERR_10204] = mapping.Char(mapping.GetDimension(REC_CODERR_10204));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.REC_MSJERR_10204] = mapping.Char(mapping.GetDimension(REC_MSJERR_10204));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_GRUPO] = mapping.Char((mapping.GetDimension(WO_GRUPO) * mapping.getOccursSize(RD_GRUPO[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_FUENT] = mapping.Char((mapping.GetDimension(WO_FUENT) * mapping.getOccursSize(RD_FUENT[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_PSVTA] = mapping.Char((mapping.GetDimension(WO_PSVTA) * mapping.getOccursSize(RD_PSVTA[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_SFUEN] = mapping.Char((mapping.GetDimension(WO_SFUEN) * mapping.getOccursSize(RD_SFUEN[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_TFUEN] = mapping.Char((mapping.GetDimension(WO_TFUEN) * mapping.getOccursSize(RD_TFUEN[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_BANCO] = mapping.Char((mapping.GetDimension(WO_BANCO) * mapping.getOccursSize(RD_BANCO[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_AGENT] = mapping.Char((mapping.GetDimension(WO_AGENT) * mapping.getOccursSize(RD_AGENT[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_CSABR] = mapping.Char((mapping.GetDimension(WO_CSABR) * mapping.getOccursSize(RD_CSABR[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_FPROC] = mapping.Char((mapping.GetDimension(WO_FPROC) * mapping.getOccursSize(RD_FPROC[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_MDALOC] = mapping.Char((mapping.GetDimension(WO_MDALOC) * mapping.getOccursSize(RD_MDALOC[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_TCAMB] = mapping.Char((mapping.GetDimension(WO_TCAMB) * mapping.getOccursSize(RD_TCAMB[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_FECVTA] = mapping.Char((mapping.GetDimension(WO_FECVTA) * mapping.getOccursSize(RD_FECVTA[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_TRNC] = mapping.Char((mapping.GetDimension(WO_TRNC) * mapping.getOccursSize(RD_TRNC[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_TDOC] = mapping.Char((mapping.GetDimension(WO_TDOC) * mapping.getOccursSize(RD_TDOC[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_TFOR] = mapping.Char((mapping.GetDimension(WO_TFOR) * mapping.getOccursSize(RD_TFOR[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_CONP1] = mapping.Char((mapping.GetDimension(WO_CONP1) * mapping.getOccursSize(RD_CONP1[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_CONP2] = mapping.Char((mapping.GetDimension(WO_CONP2) * mapping.getOccursSize(RD_CONP2[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_CONP3] = mapping.Char((mapping.GetDimension(WO_CONP3) * mapping.getOccursSize(RD_CONP3[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_TTARJ] = mapping.Char((mapping.GetDimension(WO_TTARJ) * mapping.getOccursSize(RD_TTARJ[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_NTARJ] = mapping.Char((mapping.GetDimension(WO_NTARJ) * mapping.getOccursSize(RD_NTARJ[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_RFIC] = mapping.Char((mapping.GetDimension(WO_RFIC) * mapping.getOccursSize(RD_RFIC[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_RFIS] = mapping.Char((mapping.GetDimension(WO_RFIS) * mapping.getOccursSize(RD_RFIS[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_DEBLOC] = mapping.Char((mapping.GetDimension(WO_DEBLOC) * mapping.getOccursSize(RD_DEBLOC[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_CRELOC] = mapping.Char((mapping.GetDimension(WO_CRELOC) * mapping.getOccursSize(RD_CRELOC[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_DEBREV] = mapping.Char((mapping.GetDimension(WO_DEBREV) * mapping.getOccursSize(RD_DEBREV[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_CREREV] = mapping.Char((mapping.GetDimension(WO_CREREV) * mapping.getOccursSize(RD_CREREV[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_TASIVA] = mapping.Char((mapping.GetDimension(WO_TASIVA) * mapping.getOccursSize(RD_TASIVA[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_FOPIVA] = mapping.Char((mapping.GetDimension(WO_FOPIVA) * mapping.getOccursSize(RD_FOPIVA[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_FOPEN] = mapping.Char((mapping.GetDimension(WO_FOPEN) * mapping.getOccursSize(RD_FOPEN[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_VRIC] = mapping.Char((mapping.GetDimension(WO_VRIC) * mapping.getOccursSize(RD_VRIC[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_PFC] = mapping.Char((mapping.GetDimension(WO_PFC) * mapping.getOccursSize(RD_PFC[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_PNR] = mapping.Char((mapping.GetDimension(WO_PNR) * mapping.getOccursSize(RD_PNR[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_AGTVTA] = mapping.Char((mapping.GetDimension(WO_AGTVTA) * mapping.getOccursSize(RD_AGTVTA[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_FECUSO] = mapping.Char((mapping.GetDimension(WO_FECUSO) * mapping.getOccursSize(RD_FECUSO[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_CTA] = mapping.Char((mapping.GetDimension(WO_CTA) * mapping.getOccursSize(RD_CTA[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_LIB1] = mapping.Char((mapping.GetDimension(WO_LIB1) * mapping.getOccursSize(RD_LIB1[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_LIB1CIA] = mapping.Char((mapping.GetDimension(WO_LIB1CIA) * mapping.getOccursSize(RD_LIB1CIA[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_CLIENT] = mapping.Char((mapping.GetDimension(WO_CLIENT) * mapping.getOccursSize(RD_CLIENT[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_DIRECC] = mapping.Char((mapping.GetDimension(WO_DIRECC) * mapping.getOccursSize(RD_DIRECC[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_PROVEE] = mapping.Char((mapping.GetDimension(WO_PROVEE) * mapping.getOccursSize(RD_PROVEE[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_TD_ORAC] = mapping.Char((mapping.GetDimension(WO_TD_ORAC) * mapping.getOccursSize(RD_TD_ORAC[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_COMB] = mapping.Char((mapping.GetDimension(WO_COMB) * mapping.getOccursSize(RD_COMB[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_TITU] = mapping.Char((mapping.GetDimension(WO_TITU) * mapping.getOccursSize(RD_TITU[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_SURC] = mapping.Char((mapping.GetDimension(WO_SURC) * mapping.getOccursSize(RD_SURC[0])));
                                //</editor-fold>

                                //ZPP 20171023
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_CTAC] = mapping.Char((mapping.GetDimension(WO_CTAC) * mapping.getOccursSize(RD_CTAC[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_TITUC] = mapping.Char((mapping.GetDimension(WO_TITUC) * mapping.getOccursSize(RD_TITUC[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_LIB1C] = mapping.Char((mapping.GetDimension(WO_LIB1C) * mapping.getOccursSize(RD_LIB1C[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_CTAP] = mapping.Char((mapping.GetDimension(WO_CTAP) * mapping.getOccursSize(RD_CTAP[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_TITUP] = mapping.Char((mapping.GetDimension(WO_TITUP) * mapping.getOccursSize(RD_TITUP[0])));

                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_TLIB1P] = mapping.Char((mapping.GetDimension(WO_TLIB1P) * mapping.getOccursSize(RD_TLIB1P[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_CTAPC] = mapping.Char((mapping.GetDimension(WO_CTAPC) * mapping.getOccursSize(RD_CTAPC[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_TITUPC] = mapping.Char((mapping.GetDimension(WO_TITUPC) * mapping.getOccursSize(RD_TITUPC[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_LIB1PC] = mapping.Char((mapping.GetDimension(WO_LIB1PC) * mapping.getOccursSize(RD_LIB1PC[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_CTAPAR] = mapping.Char((mapping.GetDimension(WO_CTAPAR) * mapping.getOccursSize(RD_CTAPAR[0])));

                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_TITUPAR] = mapping.Char((mapping.GetDimension(WO_TITUPAR) * mapping.getOccursSize(RD_TITUPAR[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_LIB1PAR] = mapping.Char((mapping.GetDimension(WO_LIB1PAR) * mapping.getOccursSize(RD_LIB1PAR[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_CLIENTAR] = mapping.Char((mapping.GetDimension(WO_CLIENTAR) * mapping.getOccursSize(RD_CLIENTAR[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_DIRECCAR] = mapping.Char((mapping.GetDimension(WO_DIRECCAR) * mapping.getOccursSize(RD_DIRECCAR[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_TDORACAR] = mapping.Char((mapping.GetDimension(WO_TDORACAR) * mapping.getOccursSize(RD_TDORACAR[0])));
                                //FIN ZPP

                                REC_DATA_10204[IDX_REC_DATA_10204.DATOS_INPUT] = mapping.Char(mapping.GetDimension(DATOS_INPUT));
                                REC_DATA_10204[IDX_REC_DATA_10204.DATOS_OUTPUT] = mapping.Char(mapping.GetDimension(DATOS_OUTPUT));

                                int dim = mapping.GetDimension(REC_DATA_10204);

                                TRAMA_10204[IDX_TRAMA_10204.TRAMA_10204] = mapping.Char(dim);

                                //<editor-fold defaultstate="collapsed" desc="{...} Structures">
                                AS400Structure structure = new AS400Structure(TRAMA_10204);
                                AS400Structure structure00 = new AS400Structure(REC_DATA_10204);
                                AS400Structure structure01 = new AS400Structure(DATOS_INPUT);
                                AS400Structure structure02 = new AS400Structure(DATOS_OUTPUT);
                                AS400Structure structure03 = new AS400Structure(REC_ESTADO_10204);
                                AS400Structure structure04 = new AS400Structure(REC_CODERR_10204);
                                AS400Structure structure05 = new AS400Structure(REC_MSJERR_10204);
                                AS400Structure structure06 = new AS400Structure(RD_GRUPO);
                                AS400Structure structure07 = new AS400Structure(WO_GRUPO);
                                AS400Structure structure08 = new AS400Structure(RD_FUENT);
                                AS400Structure structure09 = new AS400Structure(WO_FUENT);
                                AS400Structure structure10 = new AS400Structure(RD_PSVTA);
                                AS400Structure structure11 = new AS400Structure(WO_PSVTA);
                                AS400Structure structure12 = new AS400Structure(RD_SFUEN);
                                AS400Structure structure13 = new AS400Structure(WO_SFUEN);
                                AS400Structure structure14 = new AS400Structure(RD_TFUEN);
                                AS400Structure structure15 = new AS400Structure(WO_TFUEN);
                                AS400Structure structure16 = new AS400Structure(RD_BANCO);
                                AS400Structure structure17 = new AS400Structure(WO_BANCO);
                                AS400Structure structure18 = new AS400Structure(RD_AGENT);
                                AS400Structure structure19 = new AS400Structure(WO_AGENT);
                                AS400Structure structure20 = new AS400Structure(RD_CSABR);
                                AS400Structure structure21 = new AS400Structure(WO_CSABR);
                                AS400Structure structure22 = new AS400Structure(RD_FPROC);
                                AS400Structure structure23 = new AS400Structure(WO_FPROC);
                                AS400Structure structure24 = new AS400Structure(RD_MDALOC);
                                AS400Structure structure25 = new AS400Structure(WO_MDALOC);
                                AS400Structure structure26 = new AS400Structure(RD_TCAMB);
                                AS400Structure structure27 = new AS400Structure(WO_TCAMB);
                                AS400Structure structure28 = new AS400Structure(RD_FECVTA);
                                AS400Structure structure29 = new AS400Structure(WO_FECVTA);
                                AS400Structure structure30 = new AS400Structure(RD_TRNC);
                                AS400Structure structure31 = new AS400Structure(WO_TRNC);
                                AS400Structure structure32 = new AS400Structure(RD_TDOC);
                                AS400Structure structure33 = new AS400Structure(WO_TDOC);
                                AS400Structure structure34 = new AS400Structure(RD_TFOR);
                                AS400Structure structure35 = new AS400Structure(WO_TFOR);
                                AS400Structure structure36 = new AS400Structure(RD_CONP1);
                                AS400Structure structure37 = new AS400Structure(WO_CONP1);
                                AS400Structure structure38 = new AS400Structure(RD_CONP2);
                                AS400Structure structure39 = new AS400Structure(WO_CONP2);
                                AS400Structure structure40 = new AS400Structure(RD_CONP3);
                                AS400Structure structure41 = new AS400Structure(WO_CONP3);
                                AS400Structure structure42 = new AS400Structure(RD_TTARJ);
                                AS400Structure structure43 = new AS400Structure(WO_TTARJ);
                                AS400Structure structure44 = new AS400Structure(RD_NTARJ);
                                AS400Structure structure45 = new AS400Structure(WO_NTARJ);
                                AS400Structure structure46 = new AS400Structure(RD_RFIC);
                                AS400Structure structure47 = new AS400Structure(WO_RFIC);
                                AS400Structure structure48 = new AS400Structure(RD_RFIS);
                                AS400Structure structure49 = new AS400Structure(WO_RFIS);
                                AS400Structure structure50 = new AS400Structure(RD_DEBLOC);
                                AS400Structure structure51 = new AS400Structure(WO_DEBLOC);
                                AS400Structure structure52 = new AS400Structure(RD_CRELOC);
                                AS400Structure structure53 = new AS400Structure(WO_CRELOC);
                                AS400Structure structure54 = new AS400Structure(RD_DEBREV);
                                AS400Structure structure55 = new AS400Structure(WO_DEBREV);
                                AS400Structure structure56 = new AS400Structure(RD_CREREV);
                                AS400Structure structure57 = new AS400Structure(WO_CREREV);
                                AS400Structure structure58 = new AS400Structure(RD_TASIVA);
                                AS400Structure structure59 = new AS400Structure(WO_TASIVA);
                                AS400Structure structure60 = new AS400Structure(RD_FOPIVA);
                                AS400Structure structure61 = new AS400Structure(WO_FOPIVA);
                                AS400Structure structure62 = new AS400Structure(RD_FOPEN);
                                AS400Structure structure63 = new AS400Structure(WO_FOPEN);
                                AS400Structure structure64 = new AS400Structure(RD_VRIC);
                                AS400Structure structure65 = new AS400Structure(WO_VRIC);
                                AS400Structure structure66 = new AS400Structure(RD_PFC);
                                AS400Structure structure67 = new AS400Structure(WO_PFC);
                                AS400Structure structure68 = new AS400Structure(RD_PNR);
                                AS400Structure structure69 = new AS400Structure(WO_PNR);
                                AS400Structure structure70 = new AS400Structure(RD_AGTVTA);
                                AS400Structure structure71 = new AS400Structure(WO_AGTVTA);
                                AS400Structure structure72 = new AS400Structure(RD_FECUSO);
                                AS400Structure structure73 = new AS400Structure(WO_FECUSO);
                                AS400Structure structure74 = new AS400Structure(RD_CTA);
                                AS400Structure structure75 = new AS400Structure(WO_CTA);
                                AS400Structure structure76 = new AS400Structure(RD_LIB1);
                                AS400Structure structure77 = new AS400Structure(WO_LIB1);
                                AS400Structure structure78 = new AS400Structure(RD_LIB1CIA);
                                AS400Structure structure79 = new AS400Structure(WO_LIB1CIA);
                                AS400Structure structure80 = new AS400Structure(RD_CLIENT);
                                AS400Structure structure81 = new AS400Structure(WO_CLIENT);
                                AS400Structure structure82 = new AS400Structure(RD_DIRECC);
                                AS400Structure structure83 = new AS400Structure(WO_DIRECC);
                                AS400Structure structure84 = new AS400Structure(RD_PROVEE);
                                AS400Structure structure85 = new AS400Structure(WO_PROVEE);
                                AS400Structure structure86 = new AS400Structure(RD_TD_ORAC);
                                AS400Structure structure87 = new AS400Structure(WO_TD_ORAC);
                                AS400Structure structure88 = new AS400Structure(RD_COMB);
                                AS400Structure structure89 = new AS400Structure(WO_COMB);
                                AS400Structure structure90 = new AS400Structure(RD_TITU);
                                AS400Structure structure91 = new AS400Structure(WO_TITU);
                                AS400Structure structure92 = new AS400Structure(RD_SURC);
                                AS400Structure structure93 = new AS400Structure(WO_SURC);
                                //</editor-fold>
                                //</editor-fold>

                                //ZPP 20171023
                                AS400Structure structure94 = new AS400Structure(RD_CTAC);
                                AS400Structure structure95 = new AS400Structure(WO_CTAC);
                                AS400Structure structure96 = new AS400Structure(RD_TITUC);
                                AS400Structure structure97 = new AS400Structure(WO_TITUC);
                                AS400Structure structure98 = new AS400Structure(RD_LIB1C);
                                AS400Structure structure99 = new AS400Structure(WO_LIB1C);
                                AS400Structure structure100 = new AS400Structure(RD_CTAP);
                                AS400Structure structure101 = new AS400Structure(WO_CTAP);
                                AS400Structure structure102 = new AS400Structure(RD_TITUP);
                                AS400Structure structure103 = new AS400Structure(WO_TITUP);

                                AS400Structure structure104 = new AS400Structure(RD_TLIB1P);
                                AS400Structure structure105 = new AS400Structure(WO_TLIB1P);
                                AS400Structure structure106 = new AS400Structure(RD_CTAPC);
                                AS400Structure structure107 = new AS400Structure(WO_CTAPC);
                                AS400Structure structure108 = new AS400Structure(RD_TITUPC);
                                AS400Structure structure109 = new AS400Structure(WO_TITUPC);
                                AS400Structure structure110 = new AS400Structure(RD_LIB1PC);
                                AS400Structure structure111 = new AS400Structure(WO_LIB1PC);
                                AS400Structure structure112 = new AS400Structure(RD_CTAPAR);
                                AS400Structure structure113 = new AS400Structure(WO_CTAPAR);

                                AS400Structure structure114 = new AS400Structure(RD_TITUPAR);
                                AS400Structure structure115 = new AS400Structure(WO_TITUPAR);
                                AS400Structure structure116 = new AS400Structure(RD_LIB1PAR);
                                AS400Structure structure117 = new AS400Structure(WO_LIB1PAR);
                                AS400Structure structure118 = new AS400Structure(RD_CLIENTAR);
                                AS400Structure structure119 = new AS400Structure(WO_CLIENTAR);
                                AS400Structure structure120 = new AS400Structure(RD_DIRECCAR);
                                AS400Structure structure121 = new AS400Structure(WO_DIRECCAR);
                                AS400Structure structure122 = new AS400Structure(RD_TDORACAR);
                                AS400Structure structure123 = new AS400Structure(WO_TDORACAR);
                                //FIN ZPP

                                ProgramParameter[] parameterList = new ProgramParameter[2];
                                parameterList[0] = new ProgramParameter(TRAMA_10204_IN[IDX_TRAMA_10204_IN.TRAMA_10204_IN].toBytes(rs01.getString("PRE_CONTA")));
                                parameterList[1] = new ProgramParameter(dim);

                                program.setProgram(programName, parameterList);

                                if (program.run() != true) {
                                    System.out.println("Program failed!");
                                    AS400Message[] messagelist = program.getMessageList();
                                    for (int i = 0; i < messagelist.length; ++i) {
                                        System.out.println(messagelist[i]);
                                    }
                                } else {
                                    byte[] receiverVar = parameterList[1].getOutputData();
                                    //<editor-fold defaultstate="collapsed" desc="{...} Load Trama">
                                    Object[] N_TRAMA_10204 = (Object[]) structure.toObject(receiverVar, 0);
                                    Object[] N01_REC_DATA_10204 = (Object[]) structure00.toObject(TRAMA_10204[0].toBytes(N_TRAMA_10204[0]), 0);
                                    Object[] N03_DATOS_INPUT = (Object[]) structure01.toObject(REC_DATA_10204[0].toBytes(N01_REC_DATA_10204[0]), 0);
                                    Object[] N03_DATOS_OUTPUT = (Object[]) structure02.toObject(REC_DATA_10204[1].toBytes(N01_REC_DATA_10204[1]), 0);
                                    Object[] N04_REC_ESTADO_10204 = (Object[]) structure03.toObject(REC_ESTADO_10204[0].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.REC_ESTADO_10204]), 0);
                                    Object[] N04_REC_CODERR_10204 = (Object[]) structure04.toObject(REC_CODERR_10204[0].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.REC_CODERR_10204]), 0);
                                    Object[] N04_REC_MSJERR_10204 = (Object[]) structure05.toObject(REC_MSJERR_10204[0].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.REC_MSJERR_10204]), 0);

                                    Object[] N04_RD_GRUPO = (Object[]) ((Object[]) structure06.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_GRUPO].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_GRUPO]), 0))[0];
                                    List<Object[]> N04_WO_GRUPO = new ArrayList<Object[]>(N04_RD_GRUPO.length);
                                    for (Object N04_RD_GRUPO1 : N04_RD_GRUPO) {
                                        N04_WO_GRUPO.add((Object[]) structure07.toObject(mapping.Char(mapping.GetDimension(WO_GRUPO)).toBytes(N04_RD_GRUPO1), 0));
                                    }
                                    Object[] N04_RD_FUENT = (Object[]) ((Object[]) structure08.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_FUENT].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_FUENT]), 0))[0];
                                    List<Object[]> N04_WO_FUENT = new ArrayList<Object[]>(N04_RD_FUENT.length);
                                    for (Object N04_RD_FUENT1 : N04_RD_FUENT) {
                                        N04_WO_FUENT.add((Object[]) structure09.toObject(mapping.Char(mapping.GetDimension(WO_FUENT)).toBytes(N04_RD_FUENT1), 0));
                                    }
                                    Object[] N04_RD_PSVTA = (Object[]) ((Object[]) structure10.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_PSVTA].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_PSVTA]), 0))[0];
                                    List<Object[]> N04_WO_PSVTA = new ArrayList<Object[]>(N04_RD_PSVTA.length);
                                    for (Object N04_RD_PSVTA1 : N04_RD_PSVTA) {
                                        N04_WO_PSVTA.add((Object[]) structure11.toObject(mapping.Char(mapping.GetDimension(WO_PSVTA)).toBytes(N04_RD_PSVTA1), 0));
                                    }
                                    Object[] N04_RD_SFUEN = (Object[]) ((Object[]) structure12.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_SFUEN].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_SFUEN]), 0))[0];
                                    List<Object[]> N04_WO_SFUEN = new ArrayList<Object[]>(N04_RD_SFUEN.length);
                                    for (Object N04_RD_SFUEN1 : N04_RD_SFUEN) {
                                        N04_WO_SFUEN.add((Object[]) structure13.toObject(mapping.Char(mapping.GetDimension(WO_SFUEN)).toBytes(N04_RD_SFUEN1), 0));
                                    }
                                    Object[] N04_RD_TFUEN = (Object[]) ((Object[]) structure14.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_TFUEN].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_TFUEN]), 0))[0];
                                    List<Object[]> N04_WO_TFUEN = new ArrayList<Object[]>(N04_RD_TFUEN.length);
                                    for (Object N04_RD_TFUEN1 : N04_RD_TFUEN) {
                                        N04_WO_TFUEN.add((Object[]) structure15.toObject(mapping.Char(mapping.GetDimension(WO_TFUEN)).toBytes(N04_RD_TFUEN1), 0));
                                    }
                                    Object[] N04_RD_BANCO = (Object[]) ((Object[]) structure16.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_BANCO].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_BANCO]), 0))[0];
                                    List<Object[]> N04_WO_BANCO = new ArrayList<Object[]>(N04_RD_BANCO.length);
                                    for (Object N04_RD_BANCO1 : N04_RD_BANCO) {
                                        N04_WO_BANCO.add((Object[]) structure17.toObject(mapping.Char(mapping.GetDimension(WO_BANCO)).toBytes(N04_RD_BANCO1), 0));
                                    }
                                    Object[] N04_RD_AGENT = (Object[]) ((Object[]) structure18.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_AGENT].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_AGENT]), 0))[0];
                                    List<Object[]> N04_WO_AGENT = new ArrayList<Object[]>(N04_RD_AGENT.length);
                                    for (Object N04_RD_AGENT1 : N04_RD_AGENT) {
                                        N04_WO_AGENT.add((Object[]) structure19.toObject(mapping.Char(mapping.GetDimension(WO_AGENT)).toBytes(N04_RD_AGENT1), 0));
                                    }
                                    Object[] N04_RD_CSABR = (Object[]) ((Object[]) structure20.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_CSABR].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_CSABR]), 0))[0];
                                    List<Object[]> N04_WO_CSABR = new ArrayList<Object[]>(N04_RD_CSABR.length);
                                    for (Object N04_RD_CSABR1 : N04_RD_CSABR) {
                                        N04_WO_CSABR.add((Object[]) structure21.toObject(mapping.Char(mapping.GetDimension(WO_CSABR)).toBytes(N04_RD_CSABR1), 0));
                                    }
                                    Object[] N04_RD_FPROC = (Object[]) ((Object[]) structure22.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_FPROC].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_FPROC]), 0))[0];
                                    List<Object[]> N04_WO_FPROC = new ArrayList<Object[]>(N04_RD_FPROC.length);
                                    for (Object N04_RD_FPROC1 : N04_RD_FPROC) {
                                        N04_WO_FPROC.add((Object[]) structure23.toObject(mapping.Char(mapping.GetDimension(WO_FPROC)).toBytes(N04_RD_FPROC1), 0));
                                    }
                                    Object[] N04_RD_MDALOC = (Object[]) ((Object[]) structure24.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_MDALOC].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_MDALOC]), 0))[0];
                                    List<Object[]> N04_WO_MDALOC = new ArrayList<Object[]>(N04_RD_MDALOC.length);
                                    for (Object N04_RD_MDALOC1 : N04_RD_MDALOC) {
                                        N04_WO_MDALOC.add((Object[]) structure25.toObject(mapping.Char(mapping.GetDimension(WO_MDALOC)).toBytes(N04_RD_MDALOC1), 0));
                                    }
                                    Object[] N04_RD_TCAMB = (Object[]) ((Object[]) structure26.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_TCAMB].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_TCAMB]), 0))[0];
                                    List<Object[]> N04_WO_TCAMB = new ArrayList<Object[]>(N04_RD_TCAMB.length);
                                    for (Object N04_RD_TCAMB1 : N04_RD_TCAMB) {
                                        N04_WO_TCAMB.add((Object[]) structure27.toObject(mapping.Char(mapping.GetDimension(WO_TCAMB)).toBytes(N04_RD_TCAMB1), 0));
                                    }
                                    Object[] N04_RD_FECVTA = (Object[]) ((Object[]) structure28.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_FECVTA].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_FECVTA]), 0))[0];
                                    List<Object[]> N04_WO_FECVTA = new ArrayList<Object[]>(N04_RD_FECVTA.length);
                                    for (Object N04_RD_FECVTA1 : N04_RD_FECVTA) {
                                        N04_WO_FECVTA.add((Object[]) structure29.toObject(mapping.Char(mapping.GetDimension(WO_FECVTA)).toBytes(N04_RD_FECVTA1), 0));
                                    }
                                    Object[] N04_RD_TRNC = (Object[]) ((Object[]) structure30.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_TRNC].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_TRNC]), 0))[0];
                                    List<Object[]> N04_WO_TRNC = new ArrayList<Object[]>(N04_RD_TRNC.length);
                                    for (Object N04_RD_TRNC1 : N04_RD_TRNC) {
                                        N04_WO_TRNC.add((Object[]) structure31.toObject(mapping.Char(mapping.GetDimension(WO_TRNC)).toBytes(N04_RD_TRNC1), 0));
                                    }
                                    Object[] N04_RD_TDOC = (Object[]) ((Object[]) structure32.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_TDOC].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_TDOC]), 0))[0];
                                    List<Object[]> N04_WO_TDOC = new ArrayList<Object[]>(N04_RD_TDOC.length);
                                    for (Object N04_RD_TDOC1 : N04_RD_TDOC) {
                                        N04_WO_TDOC.add((Object[]) structure33.toObject(mapping.Char(mapping.GetDimension(WO_TDOC)).toBytes(N04_RD_TDOC1), 0));
                                    }
                                    Object[] N04_RD_TFOR = (Object[]) ((Object[]) structure34.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_TFOR].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_TFOR]), 0))[0];
                                    List<Object[]> N04_WO_TFOR = new ArrayList<Object[]>(N04_RD_TFOR.length);
                                    for (Object N04_RD_TFOR1 : N04_RD_TFOR) {
                                        N04_WO_TFOR.add((Object[]) structure35.toObject(mapping.Char(mapping.GetDimension(WO_TFOR)).toBytes(N04_RD_TFOR1), 0));
                                    }
                                    Object[] N04_RD_CONP1 = (Object[]) ((Object[]) structure36.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_CONP1].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_CONP1]), 0))[0];
                                    List<Object[]> N04_WO_CONP1 = new ArrayList<Object[]>(N04_RD_CONP1.length);
                                    for (Object N04_RD_CONP11 : N04_RD_CONP1) {
                                        N04_WO_CONP1.add((Object[]) structure37.toObject(mapping.Char(mapping.GetDimension(WO_CONP1)).toBytes(N04_RD_CONP11), 0));
                                    }
                                    Object[] N04_RD_CONP2 = (Object[]) ((Object[]) structure38.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_CONP2].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_CONP2]), 0))[0];
                                    List<Object[]> N04_WO_CONP2 = new ArrayList<Object[]>(N04_RD_CONP2.length);
                                    for (Object N04_RD_CONP21 : N04_RD_CONP2) {
                                        N04_WO_CONP2.add((Object[]) structure39.toObject(mapping.Char(mapping.GetDimension(WO_CONP2)).toBytes(N04_RD_CONP21), 0));
                                    }
                                    Object[] N04_RD_CONP3 = (Object[]) ((Object[]) structure40.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_CONP3].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_CONP3]), 0))[0];
                                    List<Object[]> N04_WO_CONP3 = new ArrayList<Object[]>(N04_RD_CONP3.length);
                                    for (Object N04_RD_CONP31 : N04_RD_CONP3) {
                                        N04_WO_CONP3.add((Object[]) structure41.toObject(mapping.Char(mapping.GetDimension(WO_CONP3)).toBytes(N04_RD_CONP31), 0));
                                    }
                                    Object[] N04_RD_TTARJ = (Object[]) ((Object[]) structure42.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_TTARJ].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_TTARJ]), 0))[0];
                                    List<Object[]> N04_WO_TTARJ = new ArrayList<Object[]>(N04_RD_TTARJ.length);
                                    for (Object N04_RD_TTARJ1 : N04_RD_TTARJ) {
                                        N04_WO_TTARJ.add((Object[]) structure43.toObject(mapping.Char(mapping.GetDimension(WO_TTARJ)).toBytes(N04_RD_TTARJ1), 0));
                                    }
                                    Object[] N04_RD_NTARJ = (Object[]) ((Object[]) structure44.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_NTARJ].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_NTARJ]), 0))[0];
                                    List<Object[]> N04_WO_NTARJ = new ArrayList<Object[]>(N04_RD_NTARJ.length);
                                    for (Object N04_RD_NTARJ1 : N04_RD_NTARJ) {
                                        N04_WO_NTARJ.add((Object[]) structure45.toObject(mapping.Char(mapping.GetDimension(WO_NTARJ)).toBytes(N04_RD_NTARJ1), 0));
                                    }
                                    Object[] N04_RD_RFIC = (Object[]) ((Object[]) structure46.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_RFIC].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_RFIC]), 0))[0];
                                    List<Object[]> N04_WO_RFIC = new ArrayList<Object[]>(N04_RD_RFIC.length);
                                    for (Object N04_RD_RFIC1 : N04_RD_RFIC) {
                                        N04_WO_RFIC.add((Object[]) structure47.toObject(mapping.Char(mapping.GetDimension(WO_RFIC)).toBytes(N04_RD_RFIC1), 0));
                                    }
                                    Object[] N04_RD_RFIS = (Object[]) ((Object[]) structure48.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_RFIS].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_RFIS]), 0))[0];
                                    List<Object[]> N04_WO_RFIS = new ArrayList<Object[]>(N04_RD_RFIS.length);
                                    for (Object N04_RD_RFIS1 : N04_RD_RFIS) {
                                        N04_WO_RFIS.add((Object[]) structure49.toObject(mapping.Char(mapping.GetDimension(WO_RFIS)).toBytes(N04_RD_RFIS1), 0));
                                    }
                                    Object[] N04_RD_DEBLOC = (Object[]) ((Object[]) structure50.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_DEBLOC].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_DEBLOC]), 0))[0];
                                    List<Object[]> N04_WO_DEBLOC = new ArrayList<Object[]>(N04_RD_DEBLOC.length);
                                    for (Object N04_RD_DEBLOC1 : N04_RD_DEBLOC) {
                                        N04_WO_DEBLOC.add((Object[]) structure51.toObject(mapping.Char(mapping.GetDimension(WO_DEBLOC)).toBytes(N04_RD_DEBLOC1), 0));
                                    }
                                    Object[] N04_RD_CRELOC = (Object[]) ((Object[]) structure52.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_CRELOC].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_CRELOC]), 0))[0];
                                    List<Object[]> N04_WO_CRELOC = new ArrayList<Object[]>(N04_RD_CRELOC.length);
                                    for (Object N04_RD_CRELOC1 : N04_RD_CRELOC) {
                                        N04_WO_CRELOC.add((Object[]) structure53.toObject(mapping.Char(mapping.GetDimension(WO_CRELOC)).toBytes(N04_RD_CRELOC1), 0));
                                    }
                                    Object[] N04_RD_DEBREV = (Object[]) ((Object[]) structure54.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_DEBREV].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_DEBREV]), 0))[0];
                                    List<Object[]> N04_WO_DEBREV = new ArrayList<Object[]>(N04_RD_DEBREV.length);
                                    for (Object N04_RD_DEBREV1 : N04_RD_DEBREV) {
                                        N04_WO_DEBREV.add((Object[]) structure55.toObject(mapping.Char(mapping.GetDimension(WO_DEBREV)).toBytes(N04_RD_DEBREV1), 0));
                                    }
                                    Object[] N04_RD_CREREV = (Object[]) ((Object[]) structure56.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_CREREV].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_CREREV]), 0))[0];
                                    List<Object[]> N04_WO_CREREV = new ArrayList<Object[]>(N04_RD_CREREV.length);
                                    for (Object N04_RD_CREREV1 : N04_RD_CREREV) {
                                        N04_WO_CREREV.add((Object[]) structure57.toObject(mapping.Char(mapping.GetDimension(WO_CREREV)).toBytes(N04_RD_CREREV1), 0));
                                    }
                                    Object[] N04_RD_TASIVA = (Object[]) ((Object[]) structure58.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_TASIVA].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_TASIVA]), 0))[0];
                                    List<Object[]> N04_WO_TASIVA = new ArrayList<Object[]>(N04_RD_TASIVA.length);
                                    for (Object N04_RD_TASIVA1 : N04_RD_TASIVA) {
                                        N04_WO_TASIVA.add((Object[]) structure59.toObject(mapping.Char(mapping.GetDimension(WO_TASIVA)).toBytes(N04_RD_TASIVA1), 0));
                                    }
                                    Object[] N04_RD_FOPIVA = (Object[]) ((Object[]) structure60.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_FOPIVA].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_FOPIVA]), 0))[0];
                                    List<Object[]> N04_WO_FOPIVA = new ArrayList<Object[]>(N04_RD_FOPIVA.length);
                                    for (Object N04_RD_FOPIVA1 : N04_RD_FOPIVA) {
                                        N04_WO_FOPIVA.add((Object[]) structure61.toObject(mapping.Char(mapping.GetDimension(WO_FOPIVA)).toBytes(N04_RD_FOPIVA1), 0));
                                    }
                                    Object[] N04_RD_FOPEN = (Object[]) ((Object[]) structure62.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_FOPEN].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_FOPEN]), 0))[0];
                                    List<Object[]> N04_WO_FOPEN = new ArrayList<Object[]>(N04_RD_FOPEN.length);
                                    for (Object N04_RD_FOPEN1 : N04_RD_FOPEN) {
                                        N04_WO_FOPEN.add((Object[]) structure63.toObject(mapping.Char(mapping.GetDimension(WO_FOPEN)).toBytes(N04_RD_FOPEN1), 0));
                                    }
                                    Object[] N04_RD_VRIC = (Object[]) ((Object[]) structure64.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_VRIC].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_VRIC]), 0))[0];
                                    List<Object[]> N04_WO_VRIC = new ArrayList<Object[]>(N04_RD_VRIC.length);
                                    for (Object N04_RD_VRIC1 : N04_RD_VRIC) {
                                        N04_WO_VRIC.add((Object[]) structure65.toObject(mapping.Char(mapping.GetDimension(WO_VRIC)).toBytes(N04_RD_VRIC1), 0));
                                    }
                                    Object[] N04_RD_PFC = (Object[]) ((Object[]) structure66.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_PFC].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_PFC]), 0))[0];
                                    List<Object[]> N04_WO_PFC = new ArrayList<Object[]>(N04_RD_PFC.length);
                                    for (Object N04_RD_PFC1 : N04_RD_PFC) {
                                        N04_WO_PFC.add((Object[]) structure67.toObject(mapping.Char(mapping.GetDimension(WO_PFC)).toBytes(N04_RD_PFC1), 0));
                                    }
                                    Object[] N04_RD_PNR = (Object[]) ((Object[]) structure68.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_PNR].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_PNR]), 0))[0];
                                    List<Object[]> N04_WO_PNR = new ArrayList<Object[]>(N04_RD_PNR.length);
                                    for (Object N04_RD_PNR1 : N04_RD_PNR) {
                                        N04_WO_PNR.add((Object[]) structure69.toObject(mapping.Char(mapping.GetDimension(WO_PNR)).toBytes(N04_RD_PNR1), 0));
                                    }
                                    Object[] N04_RD_AGTVTA = (Object[]) ((Object[]) structure70.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_AGTVTA].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_AGTVTA]), 0))[0];
                                    List<Object[]> N04_WO_AGTVTA = new ArrayList<Object[]>(N04_RD_AGTVTA.length);
                                    for (Object N04_RD_AGTVTA1 : N04_RD_AGTVTA) {
                                        N04_WO_AGTVTA.add((Object[]) structure71.toObject(mapping.Char(mapping.GetDimension(WO_AGTVTA)).toBytes(N04_RD_AGTVTA1), 0));
                                    }
                                    Object[] N04_RD_FECUSO = (Object[]) ((Object[]) structure72.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_FECUSO].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_FECUSO]), 0))[0];
                                    List<Object[]> N04_WO_FECUSO = new ArrayList<Object[]>(N04_RD_FECUSO.length);
                                    for (Object N04_RD_FECUSO1 : N04_RD_FECUSO) {
                                        N04_WO_FECUSO.add((Object[]) structure73.toObject(mapping.Char(mapping.GetDimension(WO_FECUSO)).toBytes(N04_RD_FECUSO1), 0));
                                    }
                                    Object[] N04_RD_CTA = (Object[]) ((Object[]) structure74.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_CTA].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_CTA]), 0))[0];
                                    List<Object[]> N04_WO_CTA = new ArrayList<Object[]>(N04_RD_CTA.length);
                                    for (Object N04_RD_CTA1 : N04_RD_CTA) {
                                        N04_WO_CTA.add((Object[]) structure75.toObject(mapping.Char(mapping.GetDimension(WO_CTA)).toBytes(N04_RD_CTA1), 0));
                                    }
                                    Object[] N04_RD_LIB1 = (Object[]) ((Object[]) structure76.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_LIB1].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_LIB1]), 0))[0];
                                    List<Object[]> N04_WO_LIB1 = new ArrayList<Object[]>(N04_RD_LIB1.length);
                                    for (Object N04_RD_LIB11 : N04_RD_LIB1) {
                                        N04_WO_LIB1.add((Object[]) structure77.toObject(mapping.Char(mapping.GetDimension(WO_LIB1)).toBytes(N04_RD_LIB11), 0));
                                    }
                                    Object[] N04_RD_LIB1CIA = (Object[]) ((Object[]) structure78.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_LIB1CIA].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_LIB1CIA]), 0))[0];
                                    List<Object[]> N04_WO_LIB1CIA = new ArrayList<Object[]>(N04_RD_LIB1CIA.length);
                                    for (Object N04_RD_LIB1CIA1 : N04_RD_LIB1CIA) {
                                        N04_WO_LIB1CIA.add((Object[]) structure79.toObject(mapping.Char(mapping.GetDimension(WO_LIB1CIA)).toBytes(N04_RD_LIB1CIA1), 0));
                                    }
                                    Object[] N04_RD_CLIENT = (Object[]) ((Object[]) structure80.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_CLIENT].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_CLIENT]), 0))[0];
                                    List<Object[]> N04_WO_CLIENT = new ArrayList<Object[]>(N04_RD_CLIENT.length);
                                    for (Object N04_RD_CLIENT1 : N04_RD_CLIENT) {
                                        N04_WO_CLIENT.add((Object[]) structure81.toObject(mapping.Char(mapping.GetDimension(WO_CLIENT)).toBytes(N04_RD_CLIENT1), 0));
                                    }
                                    Object[] N04_RD_DIRECC = (Object[]) ((Object[]) structure82.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_DIRECC].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_DIRECC]), 0))[0];
                                    List<Object[]> N04_WO_DIRECC = new ArrayList<Object[]>(N04_RD_DIRECC.length);
                                    for (Object N04_RD_DIRECC1 : N04_RD_DIRECC) {
                                        N04_WO_DIRECC.add((Object[]) structure83.toObject(mapping.Char(mapping.GetDimension(WO_DIRECC)).toBytes(N04_RD_DIRECC1), 0));
                                    }
                                    Object[] N04_RD_PROVEE = (Object[]) ((Object[]) structure84.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_PROVEE].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_PROVEE]), 0))[0];
                                    List<Object[]> N04_WO_PROVEE = new ArrayList<Object[]>(N04_RD_PROVEE.length);
                                    for (Object N04_RD_PROVEE1 : N04_RD_PROVEE) {
                                        N04_WO_PROVEE.add((Object[]) structure85.toObject(mapping.Char(mapping.GetDimension(WO_PROVEE)).toBytes(N04_RD_PROVEE1), 0));
                                    }
                                    Object[] N04_RD_TD_ORAC = (Object[]) ((Object[]) structure86.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_TD_ORAC].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_TD_ORAC]), 0))[0];
                                    List<Object[]> N04_WO_TD_ORAC = new ArrayList<Object[]>(N04_RD_TD_ORAC.length);
                                    for (Object N04_RD_TD_ORAC1 : N04_RD_TD_ORAC) {
                                        N04_WO_TD_ORAC.add((Object[]) structure87.toObject(mapping.Char(mapping.GetDimension(WO_TD_ORAC)).toBytes(N04_RD_TD_ORAC1), 0));
                                    }
                                    Object[] N04_RD_COMB = (Object[]) ((Object[]) structure88.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_COMB].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_COMB]), 0))[0];
                                    List<Object[]> N04_WO_COMB = new ArrayList<Object[]>(N04_RD_COMB.length);
                                    for (Object N04_RD_COMB1 : N04_RD_COMB) {
                                        N04_WO_COMB.add((Object[]) structure89.toObject(mapping.Char(mapping.GetDimension(WO_COMB)).toBytes(N04_RD_COMB1), 0));
                                    }
                                    Object[] N04_RD_TITU = (Object[]) ((Object[]) structure90.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_TITU].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_TITU]), 0))[0];
                                    List<Object[]> N04_WO_TITU = new ArrayList<Object[]>(N04_RD_TITU.length);
                                    for (Object N04_RD_TITU1 : N04_RD_TITU) {
                                        N04_WO_TITU.add((Object[]) structure91.toObject(mapping.Char(mapping.GetDimension(WO_TITU)).toBytes(N04_RD_TITU1), 0));
                                    }
                                    Object[] N04_RD_SURC = (Object[]) ((Object[]) structure92.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_SURC].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_SURC]), 0))[0];
                                    List<Object[]> N04_WO_SURC = new ArrayList<Object[]>(N04_RD_SURC.length);
                                    for (Object N04_RD_SURC1 : N04_RD_SURC) {
                                        N04_WO_SURC.add((Object[]) structure93.toObject(mapping.Char(mapping.GetDimension(WO_SURC)).toBytes(N04_RD_SURC1), 0));
                                    }

                                    //zpp 20171023 ini
                                    Object[] N04_RD_CTAC = (Object[]) ((Object[]) structure94.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_CTAC].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_CTAC]), 0))[0];
                                    List<Object[]> N04_WO_CTAC = new ArrayList<Object[]>(N04_RD_CTAC.length);
                                    for (Object N04_RD_CTAC1 : N04_RD_CTAC) {
                                        N04_WO_CTAC.add((Object[]) structure95.toObject(mapping.Char(mapping.GetDimension(WO_CTAC)).toBytes(N04_RD_CTAC1), 0));
                                    }
                                    Object[] N04_RD_TITUC = (Object[]) ((Object[]) structure96.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_TITUC].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_TITUC]), 0))[0];
                                    List<Object[]> N04_WO_TITUC = new ArrayList<Object[]>(N04_RD_TITUC.length);
                                    for (Object N04_RD_TITUC1 : N04_RD_TITUC) {
                                        N04_WO_TITUC.add((Object[]) structure97.toObject(mapping.Char(mapping.GetDimension(WO_TITUC)).toBytes(N04_RD_TITUC1), 0));
                                    }
                                    Object[] N04_RD_LIB1C = (Object[]) ((Object[]) structure98.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_LIB1C].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_LIB1C]), 0))[0];
                                    List<Object[]> N04_WO_LIB1C = new ArrayList<Object[]>(N04_RD_LIB1C.length);
                                    for (Object N04_RD_LIB1C1 : N04_RD_LIB1C) {
                                        N04_WO_LIB1C.add((Object[]) structure99.toObject(mapping.Char(mapping.GetDimension(WO_LIB1C)).toBytes(N04_RD_LIB1C1), 0));
                                    }
                                    Object[] N04_RD_CTAP = (Object[]) ((Object[]) structure100.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_CTAP].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_CTAP]), 0))[0];
                                    List<Object[]> N04_WO_CTAP = new ArrayList<Object[]>(N04_RD_CTAP.length);
                                    for (Object N04_RD_CTAP1 : N04_RD_CTAP) {
                                        N04_WO_CTAP.add((Object[]) structure101.toObject(mapping.Char(mapping.GetDimension(WO_CTAP)).toBytes(N04_RD_CTAP1), 0));
                                    }
                                    Object[] N04_RD_TITUP = (Object[]) ((Object[]) structure102.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_TITUP].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_TITUP]), 0))[0];
                                    List<Object[]> N04_WO_TITUP = new ArrayList<Object[]>(N04_RD_TITUP.length);
                                    for (Object N04_RD_TITUP1 : N04_RD_TITUP) {
                                        N04_WO_TITUP.add((Object[]) structure103.toObject(mapping.Char(mapping.GetDimension(WO_TITUP)).toBytes(N04_RD_TITUP1), 0));
                                    }
                                    Object[] N04_RD_TLIB1P = (Object[]) ((Object[]) structure104.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_TLIB1P].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_TLIB1P]), 0))[0];
                                    List<Object[]> N04_WO_TLIB1P = new ArrayList<Object[]>(N04_RD_TLIB1P.length);
                                    for (Object N04_RD_TLIB1P1 : N04_RD_TLIB1P) {
                                        N04_WO_TLIB1P.add((Object[]) structure105.toObject(mapping.Char(mapping.GetDimension(WO_TLIB1P)).toBytes(N04_RD_TLIB1P1), 0));
                                    }
                                    Object[] N04_RD_CTAPC = (Object[]) ((Object[]) structure106.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_CTAPC].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_CTAPC]), 0))[0];
                                    List<Object[]> N04_WO_CTAPC = new ArrayList<Object[]>(N04_RD_CTAPC.length);
                                    for (Object N04_RD_CTAPC1 : N04_RD_CTAPC) {
                                        N04_WO_CTAPC.add((Object[]) structure107.toObject(mapping.Char(mapping.GetDimension(WO_CTAPC)).toBytes(N04_RD_CTAPC1), 0));
                                    }
                                    Object[] N04_RD_TITUPC = (Object[]) ((Object[]) structure108.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_TITUPC].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_TITUPC]), 0))[0];
                                    List<Object[]> N04_WO_TITUPC = new ArrayList<Object[]>(N04_RD_TITUPC.length);
                                    for (Object N04_RD_TITUPC1 : N04_RD_TITUPC) {
                                        N04_WO_TITUPC.add((Object[]) structure109.toObject(mapping.Char(mapping.GetDimension(WO_TITUPC)).toBytes(N04_RD_TITUPC1), 0));
                                    }
                                    Object[] N04_RD_LIB1PC = (Object[]) ((Object[]) structure110.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_LIB1PC].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_LIB1PC]), 0))[0];
                                    List<Object[]> N04_WO_LIB1PC = new ArrayList<Object[]>(N04_RD_LIB1PC.length);
                                    for (Object N04_RD_LIB1PC1 : N04_RD_LIB1PC) {
                                        N04_WO_LIB1PC.add((Object[]) structure111.toObject(mapping.Char(mapping.GetDimension(WO_LIB1PC)).toBytes(N04_RD_LIB1PC1), 0));
                                    }
                                    Object[] N04_RD_CTAPAR = (Object[]) ((Object[]) structure112.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_CTAPAR].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_CTAPAR]), 0))[0];
                                    List<Object[]> N04_WO_CTAPAR = new ArrayList<Object[]>(N04_RD_CTAPAR.length);
                                    for (Object N04_RD_CTAPAR1 : N04_RD_CTAPAR) {
                                        N04_WO_CTAPAR.add((Object[]) structure113.toObject(mapping.Char(mapping.GetDimension(WO_CTAPAR)).toBytes(N04_RD_CTAPAR1), 0));
                                    }
                                    Object[] N04_RD_TITUPAR = (Object[]) ((Object[]) structure114.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_TITUPAR].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_TITUPAR]), 0))[0];
                                    List<Object[]> N04_WO_TITUPAR = new ArrayList<Object[]>(N04_RD_TITUPAR.length);
                                    for (Object N04_RD_TITUPAR1 : N04_RD_TITUPAR) {
                                        N04_WO_TITUPAR.add((Object[]) structure115.toObject(mapping.Char(mapping.GetDimension(WO_TITUPAR)).toBytes(N04_RD_TITUPAR1), 0));
                                    }
                                    Object[] N04_RD_LIB1PAR = (Object[]) ((Object[]) structure116.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_LIB1PAR].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_LIB1PAR]), 0))[0];
                                    List<Object[]> N04_WO_LIB1PAR = new ArrayList<Object[]>(N04_RD_LIB1PAR.length);
                                    for (Object N04_RD_LIB1PAR1 : N04_RD_LIB1PAR) {
                                        N04_WO_LIB1PAR.add((Object[]) structure117.toObject(mapping.Char(mapping.GetDimension(WO_LIB1PAR)).toBytes(N04_RD_LIB1PAR1), 0));
                                    }
                                    Object[] N04_RD_CLIENTAR = (Object[]) ((Object[]) structure118.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_CLIENTAR].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_CLIENTAR]), 0))[0];
                                    List<Object[]> N04_WO_CLIENTAR = new ArrayList<Object[]>(N04_RD_CLIENTAR.length);
                                    for (Object N04_RD_CLIENTAR1 : N04_RD_CLIENTAR) {
                                        N04_WO_CLIENTAR.add((Object[]) structure119.toObject(mapping.Char(mapping.GetDimension(WO_CLIENTAR)).toBytes(N04_RD_CLIENTAR1), 0));
                                    }
                                    Object[] N04_RD_DIRECCAR = (Object[]) ((Object[]) structure120.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_DIRECCAR].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_DIRECCAR]), 0))[0];
                                    List<Object[]> N04_WO_DIRECCAR = new ArrayList<Object[]>(N04_RD_DIRECCAR.length);
                                    for (Object N04_RD_DIRECCAR1 : N04_RD_DIRECCAR) {
                                        N04_WO_DIRECCAR.add((Object[]) structure121.toObject(mapping.Char(mapping.GetDimension(WO_DIRECCAR)).toBytes(N04_RD_DIRECCAR1), 0));
                                    }
                                    Object[] N04_RD_TDORACAR = (Object[]) ((Object[]) structure122.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_TDORACAR].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_TDORACAR]), 0))[0];
                                    List<Object[]> N04_WO_TDORACAR = new ArrayList<Object[]>(N04_RD_TDORACAR.length);
                                    for (Object N04_RD_TDORACAR1 : N04_RD_TDORACAR) {
                                        N04_WO_TDORACAR.add((Object[]) structure123.toObject(mapping.Char(mapping.GetDimension(WO_TDORACAR)).toBytes(N04_RD_TDORACAR1), 0));
                                    }
                                    //zpp 20171023 fin

                                    //</editor-fold>
                                    for (int i = 0; i < N04_RD_GRUPO.length; i++) {
                                        System.out.println(i);
                                        if (i == 199) {//ZENOBIO 89
                                            i = i;
                                        } else {
                                            System.out.println(i);
                                        }
                                        if (mapping.getString(N04_WO_GRUPO.get(i)[IDX_WO_GRUPO.RD_GRUPO]).trim().length() > 0) {
                                            objRtn = new PX0241S01A720Filter();
                                            //<editor-fold defaultstate="collapsed" desc="{...}">
                                            objRtn.TKT = mapping.getString(N03_DATOS_INPUT[IDX_DATOS_INPUT.REC_CIA_10204]) + mapping.getString(N03_DATOS_INPUT[IDX_DATOS_INPUT.REC_FORMA_10204]) + mapping.getString(N03_DATOS_INPUT[IDX_DATOS_INPUT.REC_SERIE_10204]);
                                            objRtn.SEQ = mapping.getString(N03_DATOS_INPUT[IDX_DATOS_INPUT.REC_SEQ_10204]);
                                            objRtn.STATUS = rs01.getString("STATUS");
                                            objRtn.ERROR = mapping.getString(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.REC_ESTADO_10204]);
                                            objRtn.CODERROR = mapping.getString(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.REC_CODERR_10204]);
                                            objRtn.MENSAJE = mapping.getString(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.REC_MSJERR_10204]);
                                            objRtn.GRUPO = mapping.getString(N04_WO_GRUPO.get(i)[IDX_WO_GRUPO.RD_GRUPO]);
                                            objRtn.FUENTE = mapping.getString(N04_WO_FUENT.get(i)[IDX_WO_FUENT.RD_FUENT]);
                                            objRtn.PAIS = mapping.getString(N04_WO_PSVTA.get(i)[IDX_WO_PSVTA.RD_PSVTA]);
                                            objRtn.SUBFUENTE = mapping.getString(N04_WO_SFUEN.get(i)[IDX_WO_SFUEN.RD_SFUEN]);
                                            objRtn.TFUENTE = mapping.getString(N04_WO_TFUEN.get(i)[IDX_WO_TFUEN.RD_TFUEN]);
                                            objRtn.BANCO = mapping.getString(N04_WO_BANCO.get(i)[IDX_WO_BANCO.RD_BANCO]);
                                            objRtn.IATA = mapping.getString(N04_WO_AGENT.get(i)[IDX_WO_AGENT.RD_AGENT]);
                                            objRtn.CSABRE = mapping.getString(N04_WO_CSABR.get(i)[IDX_WO_CSABR.RD_CSABR]);
                                            objRtn.FECHARPT = mapping.getString(N04_WO_FPROC.get(i)[IDX_WO_FPROC.RD_FPROC]);
                                            objRtn.MONEDA = mapping.getString(N04_WO_MDALOC.get(i)[IDX_WO_MDALOC.RD_MDALOC]);
                                            objRtn.TCAMB = Double.toString(mapping.getDouble(N04_WO_TCAMB.get(i)[IDX_WO_TCAMB.RD_TCAMB]));
                                            objRtn.FECVTA = mapping.getString(N04_WO_FECVTA.get(i)[IDX_WO_FECVTA.RD_FECVTA]);
                                            objRtn.TRANSACTION = mapping.getString(N04_WO_TRNC.get(i)[IDX_WO_TRNC.RD_TRNC]);
                                            objRtn.TDOC = mapping.getString(N04_WO_TDOC.get(i)[IDX_WO_TDOC.RD_TDOC]);
                                            objRtn.TFOR = mapping.getString(N04_WO_TFOR.get(i)[IDX_WO_TFOR.RD_TFOR]);
                                            objRtn.CONCEPT1 = mapping.getString(N04_WO_CONP1.get(i)[IDX_WO_CONP1.RD_CONP1]);
                                            objRtn.CONCEPT2 = mapping.getString(N04_WO_CONP2.get(i)[IDX_WO_CONP2.RD_CONP2]);
                                            objRtn.CONCEPT3 = mapping.getString(N04_WO_CONP3.get(i)[IDX_WO_CONP3.RD_CONP3]);
                                            objRtn.TTARJ = mapping.getString(N04_WO_TTARJ.get(i)[IDX_WO_TTARJ.RD_TTARJ]);
                                            objRtn.NTARJ = mapping.getString(N04_WO_NTARJ.get(i)[IDX_WO_NTARJ.RD_NTARJ]);
                                            objRtn.RFIC = mapping.getString(N04_WO_RFIC.get(i)[IDX_WO_RFIC.RD_RFIC]);
                                            objRtn.RFIS = mapping.getString(N04_WO_RFIS.get(i)[IDX_WO_RFIS.RD_RFIS]);
                                            objRtn.DEBITO = Double.toString(mapping.getDouble(N04_WO_DEBLOC.get(i)[IDX_WO_DEBLOC.RD_DEBLOC]));
                                            if (Double.parseDouble(objRtn.DEBITO) == 0d) {
                                                objRtn.DEBITO = "";
                                            }
                                            objRtn.CREDITO = Double.toString(mapping.getDouble(N04_WO_CRELOC.get(i)[IDX_WO_CRELOC.RD_CRELOC]));
                                            if (Double.parseDouble(objRtn.CREDITO) == 0d) {
                                                objRtn.CREDITO = "";
                                            }
                                            objRtn.DEBITORV = Double.toString(mapping.getDouble(N04_WO_DEBREV.get(i)[IDX_WO_DEBREV.RD_DEBREV]));
                                            if (Double.parseDouble(objRtn.DEBITORV) == 0d) {
                                                objRtn.DEBITORV = "";
                                            }
                                            objRtn.CREDITORV = Double.toString(mapping.getDouble(N04_WO_CREREV.get(i)[IDX_WO_CREREV.RD_CREREV]));
                                            if (Double.parseDouble(objRtn.CREDITORV) == 0d) {
                                                objRtn.CREDITORV = "";
                                            }
                                            objRtn.TASA = mapping.getString(N04_WO_TASIVA.get(i)[IDX_WO_TASIVA.RD_TASIVA]);
                                            objRtn.FOP_IVA = mapping.getString(N04_WO_FOPIVA.get(i)[IDX_WO_FOPIVA.RD_FOPIVA]);
                                            objRtn.FOPEN = mapping.getString(N04_WO_FOPEN.get(i)[IDX_WO_FOPEN.RD_FOPEN]);
                                            objRtn.VRIC = mapping.getString(N04_WO_VRIC.get(i)[IDX_WO_VRIC.RD_VRIC]);
                                            objRtn.PFC = mapping.getString(N04_WO_PFC.get(i)[IDX_WO_PFC.RD_PFC]);
                                            objRtn.PNR = mapping.getString(N04_WO_PNR.get(i)[IDX_WO_PNR.RD_PNR]);
                                            objRtn.IATAVTA = mapping.getString(N04_WO_AGTVTA.get(i)[IDX_WO_AGTVTA.RD_AGTVTA]);
                                            objRtn.FECUSO = mapping.getString(N04_WO_FECUSO.get(i)[IDX_WO_FECUSO.RD_FECUSO]);
                                            objRtn.CTA = mapping.getString(N04_WO_CTA.get(i)[IDX_WO_CTA.RD_CTA]);
                                            objRtn.LIB1 = mapping.getString(N04_WO_LIB1.get(i)[IDX_WO_LIB1.RD_LIB1]);
                                            objRtn.CIA1 = mapping.getString(N04_WO_LIB1CIA.get(i)[IDX_WO_LIB1CIA.RD_LIB1CIA]);
                                            objRtn.CLIENTE = mapping.getString(N04_WO_CLIENT.get(i)[IDX_WO_CLIENT.RD_CLIENT]);
                                            objRtn.DIRECCION = mapping.getString(N04_WO_DIRECC.get(i)[IDX_WO_DIRECC.RD_DIRECC]);
                                            objRtn.PROVEEDOR = mapping.getString(N04_WO_PROVEE.get(i)[IDX_WO_PROVEE.RD_PROVEE]);
                                            objRtn.TD_ORACLE = mapping.getString(N04_WO_TD_ORAC.get(i)[IDX_WO_TD_ORAC.RD_TD_ORAC]);
                                            objRtn.COMB = Integer.toString(mapping.getInt(N04_WO_COMB.get(i)[IDX_WO_COMB.RD_COMB]));
                                            objRtn.TITULO = mapping.getString(N04_WO_TITU.get(i)[IDX_WO_TITU.RD_TITU]);
                                            objRtn.SUCURSAL = mapping.getString(N04_WO_SURC.get(i)[IDX_WO_SURC.RD_SURC]);
                                            //</editor-fold>
                                            lstRtn.add(objRtn);
                                        } else {
                                            /*objRtn = new PX0241S01A720Filter();
                                            objRtn.ERROR = mapping.getString(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.REC_ESTADO_10204]);
                                            objRtn.CODERROR = mapping.getString(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.REC_CODERR_10204]);
                                            objRtn.MENSAJE = mapping.getString(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.REC_MSJERR_10204]);
                                            lstRtn.add(objRtn);*/
                                            if (i == 0) {
                                                objRtn = new PX0241S01A720Filter();
                                                objRtn.ERROR = mapping.getString(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.REC_ESTADO_10204]);
                                                objRtn.CODERROR = mapping.getString(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.REC_CODERR_10204]);
                                                objRtn.MENSAJE = mapping.getString(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.REC_MSJERR_10204]);
                                                lstRtn.add(objRtn);
                                            } else {
                                                objRtn = new PX0241S01A720Filter();
                                                objRtn.NTARJ = "TOTAL";
                                                objRtn.DEBITO = Double.toString(mapping.getDouble(N04_WO_DEBLOC.get(199)[IDX_WO_DEBLOC.RD_DEBLOC]));
                                                if (Double.parseDouble(objRtn.DEBITO) == 0d) {
                                                    objRtn.DEBITO = "";
                                                }
                                                objRtn.CREDITO = Double.toString(mapping.getDouble(N04_WO_CRELOC.get(199)[IDX_WO_CRELOC.RD_CRELOC]));
                                                if (Double.parseDouble(objRtn.CREDITO) == 0d) {
                                                    objRtn.CREDITO = "";
                                                }
                                                objRtn.DEBITORV = Double.toString(mapping.getDouble(N04_WO_DEBREV.get(199)[IDX_WO_DEBREV.RD_DEBREV]));
                                                if (Double.parseDouble(objRtn.DEBITORV) == 0d) {
                                                    objRtn.DEBITORV = "";
                                                }
                                                objRtn.CREDITORV = Double.toString(mapping.getDouble(N04_WO_CREREV.get(199)[IDX_WO_CREREV.RD_CREREV]));
                                                if (Double.parseDouble(objRtn.CREDITORV) == 0d) {
                                                    objRtn.CREDITORV = "";
                                                }
                                                lstRtn.add(objRtn);
                                                i = 200;//99
                                            }
                                        }
                                    }
                                }
                            } finally {
                                session.getCNXIBMDB2().closeSystem();
                            }

                        }
                        /*FIN 20171023 */
                        if (filter.TRANSACTION.equals("RFND")) {
                            session.getCNXIBMDB2().openSystem();
                            ProgramCall program = new ProgramCall(session.getCNXIBMDB2().getSystem());
                            try {
                                App.CALL_CL3050(session.getCNXIBMDB2().getSystem(), session.getMainLibrary(), session.getUserView().getCustomerInfo().CCUST);
                                String programName = "/QSYS.LIB/" + session.getMainLibrary() + ".LIB/PRO10818.PGM";

                                //<editor-fold defaultstate="collapsed" desc="{...} Mapping">
                                AS400Map mapping = new AS400Map();

                                //<editor-fold defaultstate="collapsed" desc="{...} TRAMA-10206-IN    ">
                                class IDX_TRAMA_10206_IN {

                                    static final int TRAMA_10206_IN = 0;
                                }
                                AS400DataType[] TRAMA_10206_IN = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...} 01 REC-DATA-10206-IN    ">
                                class IDX_REC_DATA_10206_IN {

                                    static final int DATOS_IN = 0;
                                }
                                AS400DataType[] REC_DATA_10206_IN = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}   03 DATOS-IN      ">
                                class IDX_DATOS_IN {

                                    static final int REC_PROGRAMA_10206 = 0;
                                    static final int REC_GRUPO_10206 = 1;
                                    static final int REC_TRNC_10206 = 2;
                                    static final int REC_CIA_10206 = 3;
                                    static final int REC_FORMA_10206 = 4;
                                    static final int REC_SERIE_10206 = 5;
                                    static final int REC_SEQ_10206 = 6;
                                    static final int REC_CUPON1_10206 = 7;
                                    static final int REC_CUPON2_10206 = 8;
                                    static final int REC_CUPON3_10206 = 9;
                                    static final int REC_CUPON4_10206 = 10;
                                }
                                AS400DataType[] DATOS_IN = new AS400DataType[11];
                                DATOS_IN[IDX_DATOS_IN.REC_PROGRAMA_10206] = mapping.Char(10);
                                DATOS_IN[IDX_DATOS_IN.REC_GRUPO_10206] = mapping.Char(9);
                                DATOS_IN[IDX_DATOS_IN.REC_TRNC_10206] = mapping.Char(4);
                                DATOS_IN[IDX_DATOS_IN.REC_CIA_10206] = mapping.Char(3);
                                DATOS_IN[IDX_DATOS_IN.REC_FORMA_10206] = mapping.Char(4);
                                DATOS_IN[IDX_DATOS_IN.REC_SERIE_10206] = mapping.Char(6);
                                DATOS_IN[IDX_DATOS_IN.REC_SEQ_10206] = mapping.Char(2);
                                DATOS_IN[IDX_DATOS_IN.REC_CUPON1_10206] = mapping.Char(1);
                                DATOS_IN[IDX_DATOS_IN.REC_CUPON2_10206] = mapping.Char(1);
                                DATOS_IN[IDX_DATOS_IN.REC_CUPON3_10206] = mapping.Char(1);
                                DATOS_IN[IDX_DATOS_IN.REC_CUPON4_10206] = mapping.Char(1);

                                REC_DATA_10206_IN[IDX_REC_DATA_10206_IN.DATOS_IN] = mapping.Char(mapping.GetDimension(DATOS_IN));
                                TRAMA_10206_IN[IDX_TRAMA_10206_IN.TRAMA_10206_IN] = mapping.Char(mapping.GetDimension(REC_DATA_10206_IN));
                                //</editor-fold>

                                //<editor-fold defaultstate="collapsed" desc="{...} TRAMA-10206    ">
                                class IDX_TRAMA_10206 {

                                    static final int TRAMA_10206 = 0;
                                }
                                AS400DataType[] TRAMA_10206 = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...} 01 REC-DATA-10206    ">
                                class IDX_REC_DATA_10206 {

                                    static final int DATOS_INPUT = 0;
                                    static final int DATOS_OUTPUT = 1;
                                }
                                AS400DataType[] REC_DATA_10206 = new AS400DataType[2];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}   03 DATOS-INPUT      ">
                                class IDX_DATOS_INPUT {

                                    static final int REC_PROGRAMA_10206 = 0;
                                    static final int REC_GRUPO_10206 = 1;
                                    static final int REC_TRNC_10206 = 2;
                                    static final int REC_CIA_10206 = 3;
                                    static final int REC_FORMA_10206 = 4;
                                    static final int REC_SERIE_10206 = 5;
                                    static final int REC_SEQ_10206 = 6;
                                    static final int REC_CUPON1_10206 = 7;
                                    static final int REC_CUPON2_10206 = 8;
                                    static final int REC_CUPON3_10206 = 9;
                                    static final int REC_CUPON4_10206 = 10;
                                }
                                AS400DataType[] DATOS_INPUT = new AS400DataType[11];
                                DATOS_INPUT[IDX_DATOS_INPUT.REC_PROGRAMA_10206] = mapping.Char(10);
                                DATOS_INPUT[IDX_DATOS_INPUT.REC_GRUPO_10206] = mapping.Char(9);
                                DATOS_INPUT[IDX_DATOS_INPUT.REC_TRNC_10206] = mapping.Char(4);
                                DATOS_INPUT[IDX_DATOS_INPUT.REC_CIA_10206] = mapping.Char(3);
                                DATOS_INPUT[IDX_DATOS_INPUT.REC_FORMA_10206] = mapping.Char(4);
                                DATOS_INPUT[IDX_DATOS_INPUT.REC_SERIE_10206] = mapping.Char(6);
                                DATOS_INPUT[IDX_DATOS_INPUT.REC_SEQ_10206] = mapping.Char(2);
                                DATOS_INPUT[IDX_DATOS_INPUT.REC_CUPON1_10206] = mapping.Char(1);
                                DATOS_INPUT[IDX_DATOS_INPUT.REC_CUPON2_10206] = mapping.Char(1);
                                DATOS_INPUT[IDX_DATOS_INPUT.REC_CUPON3_10206] = mapping.Char(1);
                                DATOS_INPUT[IDX_DATOS_INPUT.REC_CUPON4_10206] = mapping.Char(1);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}   03 DATOS-OUTPUT * ">
                                class IDX_DATOS_OUTPUT {

                                    static final int REC_ESTADO_10206 = 0;
                                    static final int REC_CODERR_10206 = 1;
                                    static final int REC_MSJERR_10206 = 2;
                                    static final int RD_GRUPO = 3;
                                    static final int RD_FUENT = 4;
                                    static final int RD_PSVTA = 5;
                                    static final int RD_SFUEN = 6;
                                    static final int RD_TFUEN = 7;
                                    static final int RD_BANCO = 8;
                                    static final int RD_AGENT = 9;
                                    static final int RD_CSABR = 10;
                                    static final int RD_FPROC = 11;
                                    static final int RD_MDALOC = 12;
                                    static final int RD_TCAMB = 13;
                                    static final int RD_FECVTA = 14;
                                    static final int RD_TRNC = 15;
                                    static final int RD_TDOC = 16;
                                    static final int RD_TFOR = 17;
                                    static final int RD_CONP1 = 18;
                                    static final int RD_CONP2 = 19;
                                    static final int RD_CONP3 = 20;
                                    static final int RD_TTARJ = 21;
                                    static final int RD_NTARJ = 22;
                                    static final int RD_RFIC = 23;
                                    static final int RD_RFIS = 24;
                                    static final int RD_DEBLOC = 25;
                                    static final int RD_CRELOC = 26;
                                    static final int RD_DEBREV = 27;
                                    static final int RD_CREREV = 28;
                                    static final int RD_TASIVA = 29;
                                    static final int RD_FOPIVA = 30;
                                    static final int RD_FOPEN = 31;
                                    static final int RD_VRIC = 32;
                                    static final int RD_PFC = 33;
                                    static final int RD_PNR = 34;
                                    static final int RD_AGTVTA = 35;
                                    static final int RD_FECUSO = 36;
                                    static final int RD_CTA = 37;
                                    static final int RD_LIB1 = 38;
                                    static final int RD_LIB1CIA = 39;
                                    static final int RD_CLIENT = 40;
                                    static final int RD_DIRECC = 41;
                                    static final int RD_PROVEE = 42;
                                    static final int RD_TD_ORAC = 43;
                                    static final int RD_COMB = 44;
                                    static final int RD_TITU = 45;
                                    static final int RD_SURC = 46;
                                    static final int RD_CTAC = 47;
                                    static final int RD_TITUC = 48;
                                    static final int RD_LIB1C = 49;
                                    static final int RD_CTAP = 50;
                                    static final int RD_TITUP = 51;
                                    static final int RD_LIB1P = 52;
                                    static final int RD_CTAPC = 53;
                                    static final int RD_TITUPC = 54;
                                    static final int RD_LIB1PC = 55;
                                    static final int RD_CTAPAR = 56;
                                    static final int RD_TITUPAR = 57;
                                    static final int RD_LIB1PAR = 58;
                                    static final int RD_CLIENTAR = 59;
                                    static final int RD_DIRECCAR = 60;
                                    static final int RD_TD_ORACAR = 61;
                                }
                                AS400DataType[] DATOS_OUTPUT = new AS400DataType[62];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 REC-ESTADO-10206">
                                AS400DataType[] REC_ESTADO_10206 = new AS400DataType[1];
                                REC_ESTADO_10206[0] = mapping.Char(1);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 REC-CODERR-10206">
                                AS400DataType[] REC_CODERR_10206 = new AS400DataType[1];
                                REC_CODERR_10206[0] = mapping.Char(6);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 REC-MSJERR-10206">
                                AS400DataType[] REC_MSJERR_10206 = new AS400DataType[1];
                                REC_MSJERR_10206[0] = mapping.Char(80);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-GRUPO       ">
                                AS400DataType[] RD_GRUPO = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-GRUPO     ">
                                class IDX_WO_GRUPO {

                                    static final int RD_GRUPO = 0;
                                }
                                AS400DataType[] WO_GRUPO = new AS400DataType[1];
                                WO_GRUPO[IDX_WO_GRUPO.RD_GRUPO] = mapping.Char(9);

                                RD_GRUPO[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_GRUPO)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-FUENT       ">
                                AS400DataType[] RD_FUENT = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-FUENT     ">
                                class IDX_WO_FUENT {

                                    static final int RD_FUENT = 0;
                                }
                                AS400DataType[] WO_FUENT = new AS400DataType[1];
                                WO_FUENT[IDX_WO_FUENT.RD_FUENT] = mapping.Char(3);

                                RD_FUENT[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_FUENT)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-PSVTA       ">
                                AS400DataType[] RD_PSVTA = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-PSVTA     ">
                                class IDX_WO_PSVTA {

                                    static final int RD_PSVTA = 0;
                                }
                                AS400DataType[] WO_PSVTA = new AS400DataType[1];
                                WO_PSVTA[IDX_WO_PSVTA.RD_PSVTA] = mapping.Char(2);

                                RD_PSVTA[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_PSVTA)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-SFUEN       ">
                                AS400DataType[] RD_SFUEN = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-SFUEN     ">
                                class IDX_WO_SFUEN {

                                    static final int RD_SFUEN = 0;
                                }
                                AS400DataType[] WO_SFUEN = new AS400DataType[1];
                                WO_SFUEN[IDX_WO_SFUEN.RD_SFUEN] = mapping.Char(3);

                                RD_SFUEN[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_SFUEN)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-TFUEN       ">
                                AS400DataType[] RD_TFUEN = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-TFUEN     ">
                                class IDX_WO_TFUEN {

                                    static final int RD_TFUEN = 0;
                                }
                                AS400DataType[] WO_TFUEN = new AS400DataType[1];
                                WO_TFUEN[IDX_WO_TFUEN.RD_TFUEN] = mapping.Char(3);

                                RD_TFUEN[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_TFUEN)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-BANCO       ">
                                AS400DataType[] RD_BANCO = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-BANCO     ">
                                class IDX_WO_BANCO {

                                    static final int RD_BANCO = 0;
                                }
                                AS400DataType[] WO_BANCO = new AS400DataType[1];
                                WO_BANCO[IDX_WO_BANCO.RD_BANCO] = mapping.Char(2);

                                RD_BANCO[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_BANCO)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-AGENT       ">
                                AS400DataType[] RD_AGENT = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-AGENT     ">
                                class IDX_WO_AGENT {

                                    static final int RD_AGENT = 0;
                                }
                                AS400DataType[] WO_AGENT = new AS400DataType[1];
                                WO_AGENT[IDX_WO_AGENT.RD_AGENT] = mapping.Char(8);

                                RD_AGENT[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_AGENT)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-CSABR       ">
                                AS400DataType[] RD_CSABR = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-CSABR     ">
                                class IDX_WO_CSABR {

                                    static final int RD_CSABR = 0;
                                }
                                AS400DataType[] WO_CSABR = new AS400DataType[1];
                                WO_CSABR[IDX_WO_CSABR.RD_CSABR] = mapping.Char(5);

                                RD_CSABR[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_CSABR)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-FPROC       ">
                                AS400DataType[] RD_FPROC = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-FPROC     ">
                                class IDX_WO_FPROC {

                                    static final int RD_FPROC = 0;
                                }
                                AS400DataType[] WO_FPROC = new AS400DataType[1];
                                WO_FPROC[IDX_WO_FPROC.RD_FPROC] = mapping.Char(8);

                                RD_FPROC[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_FPROC)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-MDALOC       ">
                                AS400DataType[] RD_MDALOC = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-MDALOC     ">
                                class IDX_WO_MDALOC {

                                    static final int RD_MDALOC = 0;
                                }
                                AS400DataType[] WO_MDALOC = new AS400DataType[1];
                                WO_MDALOC[IDX_WO_MDALOC.RD_MDALOC] = mapping.Char(3);

                                RD_MDALOC[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_MDALOC)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-TCAMB       ">
                                AS400DataType[] RD_TCAMB = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-TCAMB     ">
                                class IDX_WO_TCAMB {

                                    static final int RD_TCAMB = 0;
                                }
                                AS400DataType[] WO_TCAMB = new AS400DataType[1];
                                WO_TCAMB[IDX_WO_TCAMB.RD_TCAMB] = mapping.Numeric(7, 6, true);

                                RD_TCAMB[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_TCAMB)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-FECVTA       ">
                                AS400DataType[] RD_FECVTA = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-FECVTA     ">
                                class IDX_WO_FECVTA {

                                    static final int RD_FECVTA = 0;
                                }
                                AS400DataType[] WO_FECVTA = new AS400DataType[1];
                                WO_FECVTA[IDX_WO_FECVTA.RD_FECVTA] = mapping.Char(8);

                                RD_FECVTA[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_FECVTA)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-TRNC       ">
                                AS400DataType[] RD_TRNC = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-TRNC     ">
                                class IDX_WO_TRNC {

                                    static final int RD_TRNC = 0;
                                }
                                AS400DataType[] WO_TRNC = new AS400DataType[1];
                                WO_TRNC[IDX_WO_TRNC.RD_TRNC] = mapping.Char(4);

                                RD_TRNC[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_TRNC)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-TDOC       ">
                                AS400DataType[] RD_TDOC = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-TDOC     ">
                                class IDX_WO_TDOC {

                                    static final int RD_TDOC = 0;
                                }
                                AS400DataType[] WO_TDOC = new AS400DataType[1];
                                WO_TDOC[IDX_WO_TDOC.RD_TDOC] = mapping.Char(4);

                                RD_TDOC[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_TDOC)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-TFOR       ">
                                AS400DataType[] RD_TFOR = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-TFOR     ">
                                class IDX_WO_TFOR {

                                    static final int RD_TFOR = 0;
                                }
                                AS400DataType[] WO_TFOR = new AS400DataType[1];
                                WO_TFOR[IDX_WO_TFOR.RD_TFOR] = mapping.Char(3);

                                RD_TFOR[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_TFOR)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-CONP1       ">
                                AS400DataType[] RD_CONP1 = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-CONP1     ">
                                class IDX_WO_CONP1 {

                                    static final int RD_CONP1 = 0;
                                }
                                AS400DataType[] WO_CONP1 = new AS400DataType[1];
                                WO_CONP1[IDX_WO_CONP1.RD_CONP1] = mapping.Char(4);

                                RD_CONP1[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_CONP1)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-CONP2       ">
                                AS400DataType[] RD_CONP2 = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-CONP2     ">
                                class IDX_WO_CONP2 {

                                    static final int RD_CONP2 = 0;
                                }
                                AS400DataType[] WO_CONP2 = new AS400DataType[1];
                                WO_CONP2[IDX_WO_CONP2.RD_CONP2] = mapping.Char(3);

                                RD_CONP2[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_CONP2)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-CONP3       ">
                                AS400DataType[] RD_CONP3 = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-CONP3     ">
                                class IDX_WO_CONP3 {

                                    static final int RD_CONP3 = 0;
                                }
                                AS400DataType[] WO_CONP3 = new AS400DataType[1];
                                WO_CONP3[IDX_WO_CONP3.RD_CONP3] = mapping.Char(2);

                                RD_CONP3[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_CONP3)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-TTARJ       ">
                                AS400DataType[] RD_TTARJ = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-TTARJ     ">
                                class IDX_WO_TTARJ {

                                    static final int RD_TTARJ = 0;
                                }
                                AS400DataType[] WO_TTARJ = new AS400DataType[1];
                                WO_TTARJ[IDX_WO_TTARJ.RD_TTARJ] = mapping.Char(2);

                                RD_TTARJ[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_TTARJ)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-NTARJ       ">
                                AS400DataType[] RD_NTARJ = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-NTARJ     ">
                                class IDX_WO_NTARJ {

                                    static final int RD_NTARJ = 0;
                                }
                                AS400DataType[] WO_NTARJ = new AS400DataType[1];
                                WO_NTARJ[IDX_WO_NTARJ.RD_NTARJ] = mapping.Char(19);

                                RD_NTARJ[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_NTARJ)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-RFIC       ">
                                AS400DataType[] RD_RFIC = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-RFIC     ">
                                class IDX_WO_RFIC {

                                    static final int RD_RFIC = 0;
                                }
                                AS400DataType[] WO_RFIC = new AS400DataType[1];
                                WO_RFIC[IDX_WO_RFIC.RD_RFIC] = mapping.Char(1);

                                RD_RFIC[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_RFIC)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-RFIS       ">
                                AS400DataType[] RD_RFIS = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-RFIS     ">
                                class IDX_WO_RFIS {

                                    static final int RD_RFIS = 0;
                                }
                                AS400DataType[] WO_RFIS = new AS400DataType[1];
                                WO_RFIS[IDX_WO_RFIS.RD_RFIS] = mapping.Char(3);

                                RD_RFIS[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_RFIS)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-DEBLOC       ">
                                AS400DataType[] RD_DEBLOC = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-DEBLOC     ">
                                class IDX_WO_DEBLOC {

                                    static final int RD_DEBLOC = 0;
                                }
                                AS400DataType[] WO_DEBLOC = new AS400DataType[1];
                                WO_DEBLOC[IDX_WO_DEBLOC.RD_DEBLOC] = mapping.Numeric(13, 2, true);

                                RD_DEBLOC[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_DEBLOC)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-CRELOC       ">
                                AS400DataType[] RD_CRELOC = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-CRELOC     ">
                                class IDX_WO_CRELOC {

                                    static final int RD_CRELOC = 0;
                                }
                                AS400DataType[] WO_CRELOC = new AS400DataType[1];
                                WO_CRELOC[IDX_WO_CRELOC.RD_CRELOC] = mapping.Numeric(13, 2, true);

                                RD_CRELOC[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_CRELOC)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-DEBREV       ">
                                AS400DataType[] RD_DEBREV = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-DEBREV     ">
                                class IDX_WO_DEBREV {

                                    static final int RD_DEBREV = 0;
                                }
                                AS400DataType[] WO_DEBREV = new AS400DataType[1];
                                WO_DEBREV[IDX_WO_DEBREV.RD_DEBREV] = mapping.Numeric(13, 2, true);

                                RD_DEBREV[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_DEBREV)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-CREREV       ">
                                AS400DataType[] RD_CREREV = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-CREREV     ">
                                class IDX_WO_CREREV {

                                    static final int RD_CREREV = 0;
                                }
                                AS400DataType[] WO_CREREV = new AS400DataType[1];
                                WO_CREREV[IDX_WO_CREREV.RD_CREREV] = mapping.Numeric(13, 2, true);

                                RD_CREREV[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_CREREV)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-TASIVA       ">
                                AS400DataType[] RD_TASIVA = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-TASIVA     ">
                                class IDX_WO_TASIVA {

                                    static final int RD_TASIVA = 0;
                                }
                                AS400DataType[] WO_TASIVA = new AS400DataType[1];
                                WO_TASIVA[IDX_WO_TASIVA.RD_TASIVA] = mapping.Char(2);

                                RD_TASIVA[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_TASIVA)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-FOPIVA       ">
                                AS400DataType[] RD_FOPIVA = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-FOPIVA     ">
                                class IDX_WO_FOPIVA {

                                    static final int RD_FOPIVA = 0;
                                }
                                AS400DataType[] WO_FOPIVA = new AS400DataType[1];
                                WO_FOPIVA[IDX_WO_FOPIVA.RD_FOPIVA] = mapping.Char(2);

                                RD_FOPIVA[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_FOPIVA)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-FOPEN       ">
                                AS400DataType[] RD_FOPEN = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-FOPEN     ">
                                class IDX_WO_FOPEN {

                                    static final int RD_FOPEN = 0;
                                }
                                AS400DataType[] WO_FOPEN = new AS400DataType[1];
                                WO_FOPEN[IDX_WO_FOPEN.RD_FOPEN] = mapping.Char(8);

                                RD_FOPEN[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_FOPEN)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-VRIC       ">
                                AS400DataType[] RD_VRIC = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-VRIC     ">
                                class IDX_WO_VRIC {

                                    static final int RD_VRIC = 0;
                                }
                                AS400DataType[] WO_VRIC = new AS400DataType[1];
                                WO_VRIC[IDX_WO_VRIC.RD_VRIC] = mapping.Char(10);

                                RD_VRIC[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_VRIC)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-PFC       ">
                                AS400DataType[] RD_PFC = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-PFC     ">
                                class IDX_WO_PFC {

                                    static final int RD_PFC = 0;
                                }
                                AS400DataType[] WO_PFC = new AS400DataType[1];
                                WO_PFC[IDX_WO_PFC.RD_PFC] = mapping.Char(3);

                                RD_PFC[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_PFC)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-PNR       ">
                                AS400DataType[] RD_PNR = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-PNR     ">
                                class IDX_WO_PNR {

                                    static final int RD_PNR = 0;
                                }
                                AS400DataType[] WO_PNR = new AS400DataType[1];
                                WO_PNR[IDX_WO_PNR.RD_PNR] = mapping.Char(6);

                                RD_PNR[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_PNR)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-AGTVTA       ">
                                AS400DataType[] RD_AGTVTA = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-AGTVTA     ">
                                class IDX_WO_AGTVTA {

                                    static final int RD_AGTVTA = 0;
                                }
                                AS400DataType[] WO_AGTVTA = new AS400DataType[1];
                                WO_AGTVTA[IDX_WO_AGTVTA.RD_AGTVTA] = mapping.Char(8);

                                RD_AGTVTA[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_AGTVTA)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-FECUSO       ">
                                AS400DataType[] RD_FECUSO = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-FECUSO     ">
                                class IDX_WO_FECUSO {

                                    static final int RD_FECUSO = 0;
                                }
                                AS400DataType[] WO_FECUSO = new AS400DataType[1];
                                WO_FECUSO[IDX_WO_FECUSO.RD_FECUSO] = mapping.Char(8);

                                RD_FECUSO[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_FECUSO)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-CTA       ">
                                AS400DataType[] RD_CTA = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-CTA     ">
                                class IDX_WO_CTA {

                                    static final int RD_CTA = 0;
                                }
                                AS400DataType[] WO_CTA = new AS400DataType[1];
                                WO_CTA[IDX_WO_CTA.RD_CTA] = mapping.Char(29);

                                RD_CTA[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_CTA)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-LIB1       ">
                                AS400DataType[] RD_LIB1 = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-LIB1     ">
                                class IDX_WO_LIB1 {

                                    static final int RD_LIB1 = 0;
                                }
                                AS400DataType[] WO_LIB1 = new AS400DataType[1];
                                WO_LIB1[IDX_WO_LIB1.RD_LIB1] = mapping.Char(2);

                                RD_LIB1[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_LIB1)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-LIB1CIA       ">
                                AS400DataType[] RD_LIB1CIA = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-LIB1CIA     ">
                                class IDX_WO_LIB1CIA {

                                    static final int RD_LIB1CIA = 0;
                                }
                                AS400DataType[] WO_LIB1CIA = new AS400DataType[1];
                                WO_LIB1CIA[IDX_WO_LIB1CIA.RD_LIB1CIA] = mapping.Char(2);

                                RD_LIB1CIA[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_LIB1CIA)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-CLIENT       ">
                                AS400DataType[] RD_CLIENT = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-CLIENT     ">
                                class IDX_WO_CLIENT {

                                    static final int RD_CLIENT = 0;
                                }
                                AS400DataType[] WO_CLIENT = new AS400DataType[1];
                                WO_CLIENT[IDX_WO_CLIENT.RD_CLIENT] = mapping.Char(10);

                                RD_CLIENT[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_CLIENT)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-DIRECC       ">
                                AS400DataType[] RD_DIRECC = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-DIRECC     ">
                                class IDX_WO_DIRECC {

                                    static final int RD_DIRECC = 0;
                                }
                                AS400DataType[] WO_DIRECC = new AS400DataType[1];
                                WO_DIRECC[IDX_WO_DIRECC.RD_DIRECC] = mapping.Char(10);

                                RD_DIRECC[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_DIRECC)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-PROVEE       ">
                                AS400DataType[] RD_PROVEE = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-PROVEE     ">
                                class IDX_WO_PROVEE {

                                    static final int RD_PROVEE = 0;
                                }
                                AS400DataType[] WO_PROVEE = new AS400DataType[1];
                                WO_PROVEE[IDX_WO_PROVEE.RD_PROVEE] = mapping.Char(10);

                                RD_PROVEE[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_PROVEE)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-TD-ORAC       ">
                                AS400DataType[] RD_TD_ORAC = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-TD-ORAC     ">
                                class IDX_WO_TD_ORAC {

                                    static final int RD_TD_ORAC = 0;
                                }
                                AS400DataType[] WO_TD_ORAC = new AS400DataType[1];
                                WO_TD_ORAC[IDX_WO_TD_ORAC.RD_TD_ORAC] = mapping.Char(15);

                                RD_TD_ORAC[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_TD_ORAC)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-COMB       ">
                                AS400DataType[] RD_COMB = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-COMB     ">
                                class IDX_WO_COMB {

                                    static final int RD_COMB = 0;
                                }
                                AS400DataType[] WO_COMB = new AS400DataType[1];
                                WO_COMB[IDX_WO_COMB.RD_COMB] = mapping.Numeric(2, 0, false);

                                RD_COMB[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_COMB)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-TITU       ">
                                AS400DataType[] RD_TITU = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-TITU     ">
                                class IDX_WO_TITU {

                                    static final int RD_TITU = 0;
                                }
                                AS400DataType[] WO_TITU = new AS400DataType[1];
                                WO_TITU[IDX_WO_TITU.RD_TITU] = mapping.Char(30);

                                RD_TITU[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_TITU)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-SURC       ">
                                AS400DataType[] RD_SURC = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-SURC     ">
                                class IDX_WO_SURC {

                                    static final int RD_SURC = 0;
                                }
                                AS400DataType[] WO_SURC = new AS400DataType[1];
                                WO_SURC[IDX_WO_SURC.RD_SURC] = mapping.Char(30);

                                RD_SURC[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_SURC)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-CTAC       ">
                                AS400DataType[] RD_CTAC = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-CTAC     ">
                                class IDX_WO_CTAC {

                                    static final int RD_CTAC = 0;
                                }
                                AS400DataType[] WO_CTAC = new AS400DataType[1];
                                WO_CTAC[IDX_WO_CTAC.RD_CTAC] = mapping.Char(29);

                                RD_CTAC[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_CTAC)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-TITUC       ">
                                AS400DataType[] RD_TITUC = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-TITUC     ">
                                class IDX_WO_TITUC {

                                    static final int RD_TITUC = 0;
                                }
                                AS400DataType[] WO_TITUC = new AS400DataType[1];
                                WO_TITUC[IDX_WO_TITUC.RD_TITUC] = mapping.Char(30);

                                RD_TITUC[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_TITUC)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-LIB1C       ">
                                AS400DataType[] RD_LIB1C = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-LIB1C     ">
                                class IDX_WO_LIB1C {

                                    static final int RD_LIB1C = 0;
                                }
                                AS400DataType[] WO_LIB1C = new AS400DataType[1];
                                WO_LIB1C[IDX_WO_LIB1C.RD_LIB1C] = mapping.Char(2);

                                RD_LIB1C[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_LIB1C)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-CTAP       ">
                                AS400DataType[] RD_CTAP = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-CTAP     ">
                                class IDX_WO_CTAP {

                                    static final int RD_CTAP = 0;
                                }
                                AS400DataType[] WO_CTAP = new AS400DataType[1];
                                WO_CTAP[IDX_WO_CTAP.RD_CTAP] = mapping.Char(29);

                                RD_CTAP[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_CTAP)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-TITUP       ">
                                AS400DataType[] RD_TITUP = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-TITUP     ">
                                class IDX_WO_TITUP {

                                    static final int RD_TITUP = 0;
                                }
                                AS400DataType[] WO_TITUP = new AS400DataType[1];
                                WO_TITUP[IDX_WO_TITUP.RD_TITUP] = mapping.Char(30);

                                RD_TITUP[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_TITUP)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-LIB1P       ">
                                AS400DataType[] RD_LIB1P = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-LIB1P     ">
                                class IDX_WO_LIB1P {

                                    static final int RD_LIB1P = 0;
                                }
                                AS400DataType[] WO_LIB1P = new AS400DataType[1];
                                WO_LIB1P[IDX_WO_LIB1P.RD_LIB1P] = mapping.Char(2);

                                RD_LIB1P[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_LIB1P)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-CTAPC       ">
                                AS400DataType[] RD_CTAPC = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-CTAPC     ">
                                class IDX_WO_CTAPC {

                                    static final int RD_CTAPC = 0;
                                }
                                AS400DataType[] WO_CTAPC = new AS400DataType[1];
                                WO_CTAPC[IDX_WO_CTAPC.RD_CTAPC] = mapping.Char(29);

                                RD_CTAPC[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_CTAPC)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-TITUPC       ">
                                AS400DataType[] RD_TITUPC = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-TITUPC     ">
                                class IDX_WO_TITUPC {

                                    static final int RD_TITUPC = 0;
                                }
                                AS400DataType[] WO_TITUPC = new AS400DataType[1];
                                WO_TITUPC[IDX_WO_TITUPC.RD_TITUPC] = mapping.Char(30);

                                RD_TITUPC[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_TITUPC)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-LIB1PC       ">
                                AS400DataType[] RD_LIB1PC = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-LIB1PC     ">
                                class IDX_WO_LIB1PC {

                                    static final int RD_LIB1PC = 0;
                                }
                                AS400DataType[] WO_LIB1PC = new AS400DataType[1];
                                WO_LIB1PC[IDX_WO_LIB1PC.RD_LIB1PC] = mapping.Char(2);

                                RD_LIB1PC[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_LIB1PC)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-CTAPAR       ">
                                AS400DataType[] RD_CTAPAR = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-CTAPAR     ">
                                class IDX_WO_CTAPAR {

                                    static final int RD_CTAPAR = 0;
                                }
                                AS400DataType[] WO_CTAPAR = new AS400DataType[1];
                                WO_CTAPAR[IDX_WO_CTAPAR.RD_CTAPAR] = mapping.Char(29);

                                RD_CTAPAR[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_CTAPAR)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-TITUPAR       ">
                                AS400DataType[] RD_TITUPAR = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-TITUPAR     ">
                                class IDX_WO_TITUPAR {

                                    static final int RD_TITUPAR = 0;
                                }
                                AS400DataType[] WO_TITUPAR = new AS400DataType[1];
                                WO_TITUPAR[IDX_WO_TITUPAR.RD_TITUPAR] = mapping.Char(30);

                                RD_TITUPAR[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_TITUPAR)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-LIB1PAR       ">
                                AS400DataType[] RD_LIB1PAR = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-LIB1PAR     ">
                                class IDX_WO_LIB1PAR {

                                    static final int RD_LIB1PAR = 0;
                                }
                                AS400DataType[] WO_LIB1PAR = new AS400DataType[1];
                                WO_LIB1PAR[IDX_WO_LIB1PAR.RD_LIB1PAR] = mapping.Char(2);

                                RD_LIB1PAR[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_LIB1PAR)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-CLIENTAR       ">
                                AS400DataType[] RD_CLIENTAR = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-CLIENTAR     ">
                                class IDX_WO_CLIENTAR {

                                    static final int RD_CLIENTAR = 0;
                                }
                                AS400DataType[] WO_CLIENTAR = new AS400DataType[1];
                                WO_CLIENTAR[IDX_WO_CLIENTAR.RD_CLIENTAR] = mapping.Char(10);

                                RD_CLIENTAR[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_CLIENTAR)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-DIRECCAR       ">
                                AS400DataType[] RD_DIRECCAR = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-DIRECCAR     ">
                                class IDX_WO_DIRECCAR {

                                    static final int RD_DIRECCAR = 0;
                                }
                                AS400DataType[] WO_DIRECCAR = new AS400DataType[1];
                                WO_DIRECCAR[IDX_WO_DIRECCAR.RD_DIRECCAR] = mapping.Char(10);

                                RD_DIRECCAR[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_DIRECCAR)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-TD-ORACAR       ">
                                AS400DataType[] RD_TD_ORACAR = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-TD-ORACAR     ">
                                class IDX_WO_TD_ORACAR {

                                    static final int RD_TD_ORACAR = 0;
                                }
                                AS400DataType[] WO_TD_ORACAR = new AS400DataType[1];
                                WO_TD_ORACAR[IDX_WO_TD_ORACAR.RD_TD_ORACAR] = mapping.Char(15);

                                RD_TD_ORACAR[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_TD_ORACAR)), 200);
                                //</editor-fold>

                                //<editor-fold defaultstate="collapsed" desc="{...}*DATOS_OUTPUT">
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.REC_ESTADO_10206] = mapping.Char(mapping.GetDimension(REC_ESTADO_10206));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.REC_CODERR_10206] = mapping.Char(mapping.GetDimension(REC_CODERR_10206));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.REC_MSJERR_10206] = mapping.Char(mapping.GetDimension(REC_MSJERR_10206));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_GRUPO] = mapping.Char((mapping.GetDimension(WO_GRUPO) * mapping.getOccursSize(RD_GRUPO[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_FUENT] = mapping.Char((mapping.GetDimension(WO_FUENT) * mapping.getOccursSize(RD_FUENT[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_PSVTA] = mapping.Char((mapping.GetDimension(WO_PSVTA) * mapping.getOccursSize(RD_PSVTA[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_SFUEN] = mapping.Char((mapping.GetDimension(WO_SFUEN) * mapping.getOccursSize(RD_SFUEN[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_TFUEN] = mapping.Char((mapping.GetDimension(WO_TFUEN) * mapping.getOccursSize(RD_TFUEN[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_BANCO] = mapping.Char((mapping.GetDimension(WO_BANCO) * mapping.getOccursSize(RD_BANCO[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_AGENT] = mapping.Char((mapping.GetDimension(WO_AGENT) * mapping.getOccursSize(RD_AGENT[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_CSABR] = mapping.Char((mapping.GetDimension(WO_CSABR) * mapping.getOccursSize(RD_CSABR[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_FPROC] = mapping.Char((mapping.GetDimension(WO_FPROC) * mapping.getOccursSize(RD_FPROC[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_MDALOC] = mapping.Char((mapping.GetDimension(WO_MDALOC) * mapping.getOccursSize(RD_MDALOC[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_TCAMB] = mapping.Char((mapping.GetDimension(WO_TCAMB) * mapping.getOccursSize(RD_TCAMB[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_FECVTA] = mapping.Char((mapping.GetDimension(WO_FECVTA) * mapping.getOccursSize(RD_FECVTA[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_TRNC] = mapping.Char((mapping.GetDimension(WO_TRNC) * mapping.getOccursSize(RD_TRNC[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_TDOC] = mapping.Char((mapping.GetDimension(WO_TDOC) * mapping.getOccursSize(RD_TDOC[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_TFOR] = mapping.Char((mapping.GetDimension(WO_TFOR) * mapping.getOccursSize(RD_TFOR[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_CONP1] = mapping.Char((mapping.GetDimension(WO_CONP1) * mapping.getOccursSize(RD_CONP1[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_CONP2] = mapping.Char((mapping.GetDimension(WO_CONP2) * mapping.getOccursSize(RD_CONP2[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_CONP3] = mapping.Char((mapping.GetDimension(WO_CONP3) * mapping.getOccursSize(RD_CONP3[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_TTARJ] = mapping.Char((mapping.GetDimension(WO_TTARJ) * mapping.getOccursSize(RD_TTARJ[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_NTARJ] = mapping.Char((mapping.GetDimension(WO_NTARJ) * mapping.getOccursSize(RD_NTARJ[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_RFIC] = mapping.Char((mapping.GetDimension(WO_RFIC) * mapping.getOccursSize(RD_RFIC[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_RFIS] = mapping.Char((mapping.GetDimension(WO_RFIS) * mapping.getOccursSize(RD_RFIS[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_DEBLOC] = mapping.Char((mapping.GetDimension(WO_DEBLOC) * mapping.getOccursSize(RD_DEBLOC[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_CRELOC] = mapping.Char((mapping.GetDimension(WO_CRELOC) * mapping.getOccursSize(RD_CRELOC[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_DEBREV] = mapping.Char((mapping.GetDimension(WO_DEBREV) * mapping.getOccursSize(RD_DEBREV[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_CREREV] = mapping.Char((mapping.GetDimension(WO_CREREV) * mapping.getOccursSize(RD_CREREV[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_TASIVA] = mapping.Char((mapping.GetDimension(WO_TASIVA) * mapping.getOccursSize(RD_TASIVA[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_FOPIVA] = mapping.Char((mapping.GetDimension(WO_FOPIVA) * mapping.getOccursSize(RD_FOPIVA[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_FOPEN] = mapping.Char((mapping.GetDimension(WO_FOPEN) * mapping.getOccursSize(RD_FOPEN[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_VRIC] = mapping.Char((mapping.GetDimension(WO_VRIC) * mapping.getOccursSize(RD_VRIC[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_PFC] = mapping.Char((mapping.GetDimension(WO_PFC) * mapping.getOccursSize(RD_PFC[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_PNR] = mapping.Char((mapping.GetDimension(WO_PNR) * mapping.getOccursSize(RD_PNR[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_AGTVTA] = mapping.Char((mapping.GetDimension(WO_AGTVTA) * mapping.getOccursSize(RD_AGTVTA[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_FECUSO] = mapping.Char((mapping.GetDimension(WO_FECUSO) * mapping.getOccursSize(RD_FECUSO[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_CTA] = mapping.Char((mapping.GetDimension(WO_CTA) * mapping.getOccursSize(RD_CTA[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_LIB1] = mapping.Char((mapping.GetDimension(WO_LIB1) * mapping.getOccursSize(RD_LIB1[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_LIB1CIA] = mapping.Char((mapping.GetDimension(WO_LIB1CIA) * mapping.getOccursSize(RD_LIB1CIA[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_CLIENT] = mapping.Char((mapping.GetDimension(WO_CLIENT) * mapping.getOccursSize(RD_CLIENT[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_DIRECC] = mapping.Char((mapping.GetDimension(WO_DIRECC) * mapping.getOccursSize(RD_DIRECC[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_PROVEE] = mapping.Char((mapping.GetDimension(WO_PROVEE) * mapping.getOccursSize(RD_PROVEE[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_TD_ORAC] = mapping.Char((mapping.GetDimension(WO_TD_ORAC) * mapping.getOccursSize(RD_TD_ORAC[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_COMB] = mapping.Char((mapping.GetDimension(WO_COMB) * mapping.getOccursSize(RD_COMB[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_TITU] = mapping.Char((mapping.GetDimension(WO_TITU) * mapping.getOccursSize(RD_TITU[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_SURC] = mapping.Char((mapping.GetDimension(WO_SURC) * mapping.getOccursSize(RD_SURC[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_CTAC] = mapping.Char((mapping.GetDimension(WO_CTAC) * mapping.getOccursSize(RD_CTAC[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_TITUC] = mapping.Char((mapping.GetDimension(WO_TITUC) * mapping.getOccursSize(RD_TITUC[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_LIB1C] = mapping.Char((mapping.GetDimension(WO_LIB1C) * mapping.getOccursSize(RD_LIB1C[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_CTAP] = mapping.Char((mapping.GetDimension(WO_CTAP) * mapping.getOccursSize(RD_CTAP[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_TITUP] = mapping.Char((mapping.GetDimension(WO_TITUP) * mapping.getOccursSize(RD_TITUP[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_LIB1P] = mapping.Char((mapping.GetDimension(WO_LIB1P) * mapping.getOccursSize(RD_LIB1P[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_CTAPC] = mapping.Char((mapping.GetDimension(WO_CTAPC) * mapping.getOccursSize(RD_CTAPC[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_TITUPC] = mapping.Char((mapping.GetDimension(WO_TITUPC) * mapping.getOccursSize(RD_TITUPC[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_LIB1PC] = mapping.Char((mapping.GetDimension(WO_LIB1PC) * mapping.getOccursSize(RD_LIB1PC[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_CTAPAR] = mapping.Char((mapping.GetDimension(WO_CTAPAR) * mapping.getOccursSize(RD_CTAPAR[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_TITUPAR] = mapping.Char((mapping.GetDimension(WO_TITUPAR) * mapping.getOccursSize(RD_TITUPAR[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_LIB1PAR] = mapping.Char((mapping.GetDimension(WO_LIB1PAR) * mapping.getOccursSize(RD_LIB1PAR[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_CLIENTAR] = mapping.Char((mapping.GetDimension(WO_CLIENTAR) * mapping.getOccursSize(RD_CLIENTAR[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_DIRECCAR] = mapping.Char((mapping.GetDimension(WO_DIRECCAR) * mapping.getOccursSize(RD_DIRECCAR[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_TD_ORACAR] = mapping.Char((mapping.GetDimension(WO_TD_ORACAR) * mapping.getOccursSize(RD_TD_ORACAR[0])));
                                //</editor-fold>
                                REC_DATA_10206[IDX_REC_DATA_10206.DATOS_INPUT] = mapping.Char(mapping.GetDimension(DATOS_INPUT));
                                REC_DATA_10206[IDX_REC_DATA_10206.DATOS_OUTPUT] = mapping.Char(mapping.GetDimension(DATOS_OUTPUT));

                                int dim = mapping.GetDimension(REC_DATA_10206);

                                TRAMA_10206[IDX_TRAMA_10206.TRAMA_10206] = mapping.Char(dim);

                                //<editor-fold defaultstate="collapsed" desc="{...} Structures">
                                AS400Structure structure = new AS400Structure(TRAMA_10206);
                                AS400Structure structure00 = new AS400Structure(REC_DATA_10206);
                                AS400Structure structure01 = new AS400Structure(DATOS_INPUT);
                                AS400Structure structure02 = new AS400Structure(DATOS_OUTPUT);
                                AS400Structure structure03 = new AS400Structure(REC_ESTADO_10206);
                                AS400Structure structure04 = new AS400Structure(REC_CODERR_10206);
                                AS400Structure structure05 = new AS400Structure(REC_MSJERR_10206);
                                AS400Structure structure06 = new AS400Structure(RD_GRUPO);
                                AS400Structure structure07 = new AS400Structure(WO_GRUPO);
                                AS400Structure structure08 = new AS400Structure(RD_FUENT);
                                AS400Structure structure09 = new AS400Structure(WO_FUENT);
                                AS400Structure structure10 = new AS400Structure(RD_PSVTA);
                                AS400Structure structure11 = new AS400Structure(WO_PSVTA);
                                AS400Structure structure12 = new AS400Structure(RD_SFUEN);
                                AS400Structure structure13 = new AS400Structure(WO_SFUEN);
                                AS400Structure structure14 = new AS400Structure(RD_TFUEN);
                                AS400Structure structure15 = new AS400Structure(WO_TFUEN);
                                AS400Structure structure16 = new AS400Structure(RD_BANCO);
                                AS400Structure structure17 = new AS400Structure(WO_BANCO);
                                AS400Structure structure18 = new AS400Structure(RD_AGENT);
                                AS400Structure structure19 = new AS400Structure(WO_AGENT);
                                AS400Structure structure20 = new AS400Structure(RD_CSABR);
                                AS400Structure structure21 = new AS400Structure(WO_CSABR);
                                AS400Structure structure22 = new AS400Structure(RD_FPROC);
                                AS400Structure structure23 = new AS400Structure(WO_FPROC);
                                AS400Structure structure24 = new AS400Structure(RD_MDALOC);
                                AS400Structure structure25 = new AS400Structure(WO_MDALOC);
                                AS400Structure structure26 = new AS400Structure(RD_TCAMB);
                                AS400Structure structure27 = new AS400Structure(WO_TCAMB);
                                AS400Structure structure28 = new AS400Structure(RD_FECVTA);
                                AS400Structure structure29 = new AS400Structure(WO_FECVTA);
                                AS400Structure structure30 = new AS400Structure(RD_TRNC);
                                AS400Structure structure31 = new AS400Structure(WO_TRNC);
                                AS400Structure structure32 = new AS400Structure(RD_TDOC);
                                AS400Structure structure33 = new AS400Structure(WO_TDOC);
                                AS400Structure structure34 = new AS400Structure(RD_TFOR);
                                AS400Structure structure35 = new AS400Structure(WO_TFOR);
                                AS400Structure structure36 = new AS400Structure(RD_CONP1);
                                AS400Structure structure37 = new AS400Structure(WO_CONP1);
                                AS400Structure structure38 = new AS400Structure(RD_CONP2);
                                AS400Structure structure39 = new AS400Structure(WO_CONP2);
                                AS400Structure structure40 = new AS400Structure(RD_CONP3);
                                AS400Structure structure41 = new AS400Structure(WO_CONP3);
                                AS400Structure structure42 = new AS400Structure(RD_TTARJ);
                                AS400Structure structure43 = new AS400Structure(WO_TTARJ);
                                AS400Structure structure44 = new AS400Structure(RD_NTARJ);
                                AS400Structure structure45 = new AS400Structure(WO_NTARJ);
                                AS400Structure structure46 = new AS400Structure(RD_RFIC);
                                AS400Structure structure47 = new AS400Structure(WO_RFIC);
                                AS400Structure structure48 = new AS400Structure(RD_RFIS);
                                AS400Structure structure49 = new AS400Structure(WO_RFIS);
                                AS400Structure structure50 = new AS400Structure(RD_DEBLOC);
                                AS400Structure structure51 = new AS400Structure(WO_DEBLOC);
                                AS400Structure structure52 = new AS400Structure(RD_CRELOC);
                                AS400Structure structure53 = new AS400Structure(WO_CRELOC);
                                AS400Structure structure54 = new AS400Structure(RD_DEBREV);
                                AS400Structure structure55 = new AS400Structure(WO_DEBREV);
                                AS400Structure structure56 = new AS400Structure(RD_CREREV);
                                AS400Structure structure57 = new AS400Structure(WO_CREREV);
                                AS400Structure structure58 = new AS400Structure(RD_TASIVA);
                                AS400Structure structure59 = new AS400Structure(WO_TASIVA);
                                AS400Structure structure60 = new AS400Structure(RD_FOPIVA);
                                AS400Structure structure61 = new AS400Structure(WO_FOPIVA);
                                AS400Structure structure62 = new AS400Structure(RD_FOPEN);
                                AS400Structure structure63 = new AS400Structure(WO_FOPEN);
                                AS400Structure structure64 = new AS400Structure(RD_VRIC);
                                AS400Structure structure65 = new AS400Structure(WO_VRIC);
                                AS400Structure structure66 = new AS400Structure(RD_PFC);
                                AS400Structure structure67 = new AS400Structure(WO_PFC);
                                AS400Structure structure68 = new AS400Structure(RD_PNR);
                                AS400Structure structure69 = new AS400Structure(WO_PNR);
                                AS400Structure structure70 = new AS400Structure(RD_AGTVTA);
                                AS400Structure structure71 = new AS400Structure(WO_AGTVTA);
                                AS400Structure structure72 = new AS400Structure(RD_FECUSO);
                                AS400Structure structure73 = new AS400Structure(WO_FECUSO);
                                AS400Structure structure74 = new AS400Structure(RD_CTA);
                                AS400Structure structure75 = new AS400Structure(WO_CTA);
                                AS400Structure structure76 = new AS400Structure(RD_LIB1);
                                AS400Structure structure77 = new AS400Structure(WO_LIB1);
                                AS400Structure structure78 = new AS400Structure(RD_LIB1CIA);
                                AS400Structure structure79 = new AS400Structure(WO_LIB1CIA);
                                AS400Structure structure80 = new AS400Structure(RD_CLIENT);
                                AS400Structure structure81 = new AS400Structure(WO_CLIENT);
                                AS400Structure structure82 = new AS400Structure(RD_DIRECC);
                                AS400Structure structure83 = new AS400Structure(WO_DIRECC);
                                AS400Structure structure84 = new AS400Structure(RD_PROVEE);
                                AS400Structure structure85 = new AS400Structure(WO_PROVEE);
                                AS400Structure structure86 = new AS400Structure(RD_TD_ORAC);
                                AS400Structure structure87 = new AS400Structure(WO_TD_ORAC);
                                AS400Structure structure88 = new AS400Structure(RD_COMB);
                                AS400Structure structure89 = new AS400Structure(WO_COMB);
                                AS400Structure structure90 = new AS400Structure(RD_TITU);
                                AS400Structure structure91 = new AS400Structure(WO_TITU);
                                AS400Structure structure92 = new AS400Structure(RD_SURC);
                                AS400Structure structure93 = new AS400Structure(WO_SURC);
                                AS400Structure structure94 = new AS400Structure(RD_CTAC);
                                AS400Structure structure95 = new AS400Structure(WO_CTAC);
                                AS400Structure structure96 = new AS400Structure(RD_TITUC);
                                AS400Structure structure97 = new AS400Structure(WO_TITUC);
                                AS400Structure structure98 = new AS400Structure(RD_LIB1C);
                                AS400Structure structure99 = new AS400Structure(WO_LIB1C);
                                AS400Structure structure100 = new AS400Structure(RD_CTAP);
                                AS400Structure structure101 = new AS400Structure(WO_CTAP);
                                AS400Structure structure102 = new AS400Structure(RD_TITUP);
                                AS400Structure structure103 = new AS400Structure(WO_TITUP);
                                AS400Structure structure104 = new AS400Structure(RD_LIB1P);
                                AS400Structure structure105 = new AS400Structure(WO_LIB1P);
                                AS400Structure structure106 = new AS400Structure(RD_CTAPC);
                                AS400Structure structure107 = new AS400Structure(WO_CTAPC);
                                AS400Structure structure108 = new AS400Structure(RD_TITUPC);
                                AS400Structure structure109 = new AS400Structure(WO_TITUPC);
                                AS400Structure structure110 = new AS400Structure(RD_LIB1PC);
                                AS400Structure structure111 = new AS400Structure(WO_LIB1PC);
                                AS400Structure structure112 = new AS400Structure(RD_CTAPAR);
                                AS400Structure structure113 = new AS400Structure(WO_CTAPAR);
                                AS400Structure structure114 = new AS400Structure(RD_TITUPAR);
                                AS400Structure structure115 = new AS400Structure(WO_TITUPAR);
                                AS400Structure structure116 = new AS400Structure(RD_LIB1PAR);
                                AS400Structure structure117 = new AS400Structure(WO_LIB1PAR);
                                AS400Structure structure118 = new AS400Structure(RD_CLIENTAR);
                                AS400Structure structure119 = new AS400Structure(WO_CLIENTAR);
                                AS400Structure structure120 = new AS400Structure(RD_DIRECCAR);
                                AS400Structure structure121 = new AS400Structure(WO_DIRECCAR);
                                AS400Structure structure122 = new AS400Structure(RD_TD_ORACAR);
                                AS400Structure structure123 = new AS400Structure(WO_TD_ORACAR);
                                //</editor-fold>
                                //</editor-fold>

                                ProgramParameter[] parameterList = new ProgramParameter[2];
                                parameterList[0] = new ProgramParameter(TRAMA_10206_IN[IDX_TRAMA_10206_IN.TRAMA_10206_IN].toBytes(rs01.getString("PRE_CONTA")));
                                parameterList[1] = new ProgramParameter(dim);

                                program.setProgram(programName, parameterList);

                                if (program.run() != true) {
                                    System.out.println("Program failed!");
                                    AS400Message[] messagelist = program.getMessageList();
                                    for (int i = 0; i < messagelist.length; ++i) {
                                        System.out.println(messagelist[i]);
                                    }
                                } else {
                                    byte[] receiverVar = parameterList[1].getOutputData();
                                    //<editor-fold defaultstate="collapsed" desc="{...} Load Trama">
                                    Object[] N_TRAMA_10206 = (Object[]) structure.toObject(receiverVar, 0);
                                    Object[] N01_REC_DATA_10206 = (Object[]) structure00.toObject(TRAMA_10206[0].toBytes(N_TRAMA_10206[0]), 0);
                                    Object[] N03_DATOS_INPUT = (Object[]) structure01.toObject(REC_DATA_10206[0].toBytes(N01_REC_DATA_10206[0]), 0);
                                    Object[] N03_DATOS_OUTPUT = (Object[]) structure02.toObject(REC_DATA_10206[1].toBytes(N01_REC_DATA_10206[1]), 0);
                                    Object[] N04_REC_ESTADO_10206 = (Object[]) structure03.toObject(REC_ESTADO_10206[0].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.REC_ESTADO_10206]), 0);
                                    Object[] N04_REC_CODERR_10206 = (Object[]) structure04.toObject(REC_CODERR_10206[0].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.REC_CODERR_10206]), 0);
                                    Object[] N04_REC_MSJERR_10206 = (Object[]) structure05.toObject(REC_MSJERR_10206[0].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.REC_MSJERR_10206]), 0);

                                    Object[] N04_RD_GRUPO = (Object[]) ((Object[]) structure06.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_GRUPO].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_GRUPO]), 0))[0];
                                    List<Object[]> N04_WO_GRUPO = new ArrayList<Object[]>(N04_RD_GRUPO.length);
                                    for (Object N04_RD_GRUPO1 : N04_RD_GRUPO) {
                                        N04_WO_GRUPO.add((Object[]) structure07.toObject(mapping.Char(mapping.GetDimension(WO_GRUPO)).toBytes(N04_RD_GRUPO1), 0));
                                    }
                                    Object[] N04_RD_FUENT = (Object[]) ((Object[]) structure08.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_FUENT].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_FUENT]), 0))[0];
                                    List<Object[]> N04_WO_FUENT = new ArrayList<Object[]>(N04_RD_FUENT.length);
                                    for (Object N04_RD_FUENT1 : N04_RD_FUENT) {
                                        N04_WO_FUENT.add((Object[]) structure09.toObject(mapping.Char(mapping.GetDimension(WO_FUENT)).toBytes(N04_RD_FUENT1), 0));
                                    }
                                    Object[] N04_RD_PSVTA = (Object[]) ((Object[]) structure10.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_PSVTA].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_PSVTA]), 0))[0];
                                    List<Object[]> N04_WO_PSVTA = new ArrayList<Object[]>(N04_RD_PSVTA.length);
                                    for (Object N04_RD_PSVTA1 : N04_RD_PSVTA) {
                                        N04_WO_PSVTA.add((Object[]) structure11.toObject(mapping.Char(mapping.GetDimension(WO_PSVTA)).toBytes(N04_RD_PSVTA1), 0));
                                    }
                                    Object[] N04_RD_SFUEN = (Object[]) ((Object[]) structure12.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_SFUEN].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_SFUEN]), 0))[0];
                                    List<Object[]> N04_WO_SFUEN = new ArrayList<Object[]>(N04_RD_SFUEN.length);
                                    for (Object N04_RD_SFUEN1 : N04_RD_SFUEN) {
                                        N04_WO_SFUEN.add((Object[]) structure13.toObject(mapping.Char(mapping.GetDimension(WO_SFUEN)).toBytes(N04_RD_SFUEN1), 0));
                                    }
                                    Object[] N04_RD_TFUEN = (Object[]) ((Object[]) structure14.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_TFUEN].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_TFUEN]), 0))[0];
                                    List<Object[]> N04_WO_TFUEN = new ArrayList<Object[]>(N04_RD_TFUEN.length);
                                    for (Object N04_RD_TFUEN1 : N04_RD_TFUEN) {
                                        N04_WO_TFUEN.add((Object[]) structure15.toObject(mapping.Char(mapping.GetDimension(WO_TFUEN)).toBytes(N04_RD_TFUEN1), 0));
                                    }
                                    Object[] N04_RD_BANCO = (Object[]) ((Object[]) structure16.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_BANCO].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_BANCO]), 0))[0];
                                    List<Object[]> N04_WO_BANCO = new ArrayList<Object[]>(N04_RD_BANCO.length);
                                    for (Object N04_RD_BANCO1 : N04_RD_BANCO) {
                                        N04_WO_BANCO.add((Object[]) structure17.toObject(mapping.Char(mapping.GetDimension(WO_BANCO)).toBytes(N04_RD_BANCO1), 0));
                                    }
                                    Object[] N04_RD_AGENT = (Object[]) ((Object[]) structure18.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_AGENT].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_AGENT]), 0))[0];
                                    List<Object[]> N04_WO_AGENT = new ArrayList<Object[]>(N04_RD_AGENT.length);
                                    for (Object N04_RD_AGENT1 : N04_RD_AGENT) {
                                        N04_WO_AGENT.add((Object[]) structure19.toObject(mapping.Char(mapping.GetDimension(WO_AGENT)).toBytes(N04_RD_AGENT1), 0));
                                    }
                                    Object[] N04_RD_CSABR = (Object[]) ((Object[]) structure20.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_CSABR].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_CSABR]), 0))[0];
                                    List<Object[]> N04_WO_CSABR = new ArrayList<Object[]>(N04_RD_CSABR.length);
                                    for (Object N04_RD_CSABR1 : N04_RD_CSABR) {
                                        N04_WO_CSABR.add((Object[]) structure21.toObject(mapping.Char(mapping.GetDimension(WO_CSABR)).toBytes(N04_RD_CSABR1), 0));
                                    }
                                    Object[] N04_RD_FPROC = (Object[]) ((Object[]) structure22.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_FPROC].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_FPROC]), 0))[0];
                                    List<Object[]> N04_WO_FPROC = new ArrayList<Object[]>(N04_RD_FPROC.length);
                                    for (Object N04_RD_FPROC1 : N04_RD_FPROC) {
                                        N04_WO_FPROC.add((Object[]) structure23.toObject(mapping.Char(mapping.GetDimension(WO_FPROC)).toBytes(N04_RD_FPROC1), 0));
                                    }
                                    Object[] N04_RD_MDALOC = (Object[]) ((Object[]) structure24.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_MDALOC].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_MDALOC]), 0))[0];
                                    List<Object[]> N04_WO_MDALOC = new ArrayList<Object[]>(N04_RD_MDALOC.length);
                                    for (Object N04_RD_MDALOC1 : N04_RD_MDALOC) {
                                        N04_WO_MDALOC.add((Object[]) structure25.toObject(mapping.Char(mapping.GetDimension(WO_MDALOC)).toBytes(N04_RD_MDALOC1), 0));
                                    }
                                    Object[] N04_RD_TCAMB = (Object[]) ((Object[]) structure26.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_TCAMB].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_TCAMB]), 0))[0];
                                    List<Object[]> N04_WO_TCAMB = new ArrayList<Object[]>(N04_RD_TCAMB.length);
                                    for (Object N04_RD_TCAMB1 : N04_RD_TCAMB) {
                                        N04_WO_TCAMB.add((Object[]) structure27.toObject(mapping.Char(mapping.GetDimension(WO_TCAMB)).toBytes(N04_RD_TCAMB1), 0));
                                    }
                                    Object[] N04_RD_FECVTA = (Object[]) ((Object[]) structure28.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_FECVTA].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_FECVTA]), 0))[0];
                                    List<Object[]> N04_WO_FECVTA = new ArrayList<Object[]>(N04_RD_FECVTA.length);
                                    for (Object N04_RD_FECVTA1 : N04_RD_FECVTA) {
                                        N04_WO_FECVTA.add((Object[]) structure29.toObject(mapping.Char(mapping.GetDimension(WO_FECVTA)).toBytes(N04_RD_FECVTA1), 0));
                                    }
                                    Object[] N04_RD_TRNC = (Object[]) ((Object[]) structure30.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_TRNC].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_TRNC]), 0))[0];
                                    List<Object[]> N04_WO_TRNC = new ArrayList<Object[]>(N04_RD_TRNC.length);
                                    for (Object N04_RD_TRNC1 : N04_RD_TRNC) {
                                        N04_WO_TRNC.add((Object[]) structure31.toObject(mapping.Char(mapping.GetDimension(WO_TRNC)).toBytes(N04_RD_TRNC1), 0));
                                    }
                                    Object[] N04_RD_TDOC = (Object[]) ((Object[]) structure32.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_TDOC].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_TDOC]), 0))[0];
                                    List<Object[]> N04_WO_TDOC = new ArrayList<Object[]>(N04_RD_TDOC.length);
                                    for (Object N04_RD_TDOC1 : N04_RD_TDOC) {
                                        N04_WO_TDOC.add((Object[]) structure33.toObject(mapping.Char(mapping.GetDimension(WO_TDOC)).toBytes(N04_RD_TDOC1), 0));
                                    }
                                    Object[] N04_RD_TFOR = (Object[]) ((Object[]) structure34.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_TFOR].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_TFOR]), 0))[0];
                                    List<Object[]> N04_WO_TFOR = new ArrayList<Object[]>(N04_RD_TFOR.length);
                                    for (Object N04_RD_TFOR1 : N04_RD_TFOR) {
                                        N04_WO_TFOR.add((Object[]) structure35.toObject(mapping.Char(mapping.GetDimension(WO_TFOR)).toBytes(N04_RD_TFOR1), 0));
                                    }
                                    Object[] N04_RD_CONP1 = (Object[]) ((Object[]) structure36.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_CONP1].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_CONP1]), 0))[0];
                                    List<Object[]> N04_WO_CONP1 = new ArrayList<Object[]>(N04_RD_CONP1.length);
                                    for (Object N04_RD_CONP11 : N04_RD_CONP1) {
                                        N04_WO_CONP1.add((Object[]) structure37.toObject(mapping.Char(mapping.GetDimension(WO_CONP1)).toBytes(N04_RD_CONP11), 0));
                                    }
                                    Object[] N04_RD_CONP2 = (Object[]) ((Object[]) structure38.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_CONP2].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_CONP2]), 0))[0];
                                    List<Object[]> N04_WO_CONP2 = new ArrayList<Object[]>(N04_RD_CONP2.length);
                                    for (Object N04_RD_CONP21 : N04_RD_CONP2) {
                                        N04_WO_CONP2.add((Object[]) structure39.toObject(mapping.Char(mapping.GetDimension(WO_CONP2)).toBytes(N04_RD_CONP21), 0));
                                    }
                                    Object[] N04_RD_CONP3 = (Object[]) ((Object[]) structure40.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_CONP3].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_CONP3]), 0))[0];
                                    List<Object[]> N04_WO_CONP3 = new ArrayList<Object[]>(N04_RD_CONP3.length);
                                    for (Object N04_RD_CONP31 : N04_RD_CONP3) {
                                        N04_WO_CONP3.add((Object[]) structure41.toObject(mapping.Char(mapping.GetDimension(WO_CONP3)).toBytes(N04_RD_CONP31), 0));
                                    }
                                    Object[] N04_RD_TTARJ = (Object[]) ((Object[]) structure42.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_TTARJ].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_TTARJ]), 0))[0];
                                    List<Object[]> N04_WO_TTARJ = new ArrayList<Object[]>(N04_RD_TTARJ.length);
                                    for (Object N04_RD_TTARJ1 : N04_RD_TTARJ) {
                                        N04_WO_TTARJ.add((Object[]) structure43.toObject(mapping.Char(mapping.GetDimension(WO_TTARJ)).toBytes(N04_RD_TTARJ1), 0));
                                    }
                                    Object[] N04_RD_NTARJ = (Object[]) ((Object[]) structure44.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_NTARJ].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_NTARJ]), 0))[0];
                                    List<Object[]> N04_WO_NTARJ = new ArrayList<Object[]>(N04_RD_NTARJ.length);
                                    for (Object N04_RD_NTARJ1 : N04_RD_NTARJ) {
                                        N04_WO_NTARJ.add((Object[]) structure45.toObject(mapping.Char(mapping.GetDimension(WO_NTARJ)).toBytes(N04_RD_NTARJ1), 0));
                                    }
                                    Object[] N04_RD_RFIC = (Object[]) ((Object[]) structure46.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_RFIC].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_RFIC]), 0))[0];
                                    List<Object[]> N04_WO_RFIC = new ArrayList<Object[]>(N04_RD_RFIC.length);
                                    for (Object N04_RD_RFIC1 : N04_RD_RFIC) {
                                        N04_WO_RFIC.add((Object[]) structure47.toObject(mapping.Char(mapping.GetDimension(WO_RFIC)).toBytes(N04_RD_RFIC1), 0));
                                    }
                                    Object[] N04_RD_RFIS = (Object[]) ((Object[]) structure48.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_RFIS].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_RFIS]), 0))[0];
                                    List<Object[]> N04_WO_RFIS = new ArrayList<Object[]>(N04_RD_RFIS.length);
                                    for (Object N04_RD_RFIS1 : N04_RD_RFIS) {
                                        N04_WO_RFIS.add((Object[]) structure49.toObject(mapping.Char(mapping.GetDimension(WO_RFIS)).toBytes(N04_RD_RFIS1), 0));
                                    }
                                    Object[] N04_RD_DEBLOC = (Object[]) ((Object[]) structure50.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_DEBLOC].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_DEBLOC]), 0))[0];
                                    List<Object[]> N04_WO_DEBLOC = new ArrayList<Object[]>(N04_RD_DEBLOC.length);
                                    for (Object N04_RD_DEBLOC1 : N04_RD_DEBLOC) {
                                        N04_WO_DEBLOC.add((Object[]) structure51.toObject(mapping.Char(mapping.GetDimension(WO_DEBLOC)).toBytes(N04_RD_DEBLOC1), 0));
                                    }
                                    Object[] N04_RD_CRELOC = (Object[]) ((Object[]) structure52.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_CRELOC].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_CRELOC]), 0))[0];
                                    List<Object[]> N04_WO_CRELOC = new ArrayList<Object[]>(N04_RD_CRELOC.length);
                                    for (Object N04_RD_CRELOC1 : N04_RD_CRELOC) {
                                        N04_WO_CRELOC.add((Object[]) structure53.toObject(mapping.Char(mapping.GetDimension(WO_CRELOC)).toBytes(N04_RD_CRELOC1), 0));
                                    }
                                    Object[] N04_RD_DEBREV = (Object[]) ((Object[]) structure54.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_DEBREV].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_DEBREV]), 0))[0];
                                    List<Object[]> N04_WO_DEBREV = new ArrayList<Object[]>(N04_RD_DEBREV.length);
                                    for (Object N04_RD_DEBREV1 : N04_RD_DEBREV) {
                                        N04_WO_DEBREV.add((Object[]) structure55.toObject(mapping.Char(mapping.GetDimension(WO_DEBREV)).toBytes(N04_RD_DEBREV1), 0));
                                    }
                                    Object[] N04_RD_CREREV = (Object[]) ((Object[]) structure56.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_CREREV].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_CREREV]), 0))[0];
                                    List<Object[]> N04_WO_CREREV = new ArrayList<Object[]>(N04_RD_CREREV.length);
                                    for (Object N04_RD_CREREV1 : N04_RD_CREREV) {
                                        N04_WO_CREREV.add((Object[]) structure57.toObject(mapping.Char(mapping.GetDimension(WO_CREREV)).toBytes(N04_RD_CREREV1), 0));
                                    }
                                    Object[] N04_RD_TASIVA = (Object[]) ((Object[]) structure58.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_TASIVA].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_TASIVA]), 0))[0];
                                    List<Object[]> N04_WO_TASIVA = new ArrayList<Object[]>(N04_RD_TASIVA.length);
                                    for (Object N04_RD_TASIVA1 : N04_RD_TASIVA) {
                                        N04_WO_TASIVA.add((Object[]) structure59.toObject(mapping.Char(mapping.GetDimension(WO_TASIVA)).toBytes(N04_RD_TASIVA1), 0));
                                    }
                                    Object[] N04_RD_FOPIVA = (Object[]) ((Object[]) structure60.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_FOPIVA].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_FOPIVA]), 0))[0];
                                    List<Object[]> N04_WO_FOPIVA = new ArrayList<Object[]>(N04_RD_FOPIVA.length);
                                    for (Object N04_RD_FOPIVA1 : N04_RD_FOPIVA) {
                                        N04_WO_FOPIVA.add((Object[]) structure61.toObject(mapping.Char(mapping.GetDimension(WO_FOPIVA)).toBytes(N04_RD_FOPIVA1), 0));
                                    }
                                    Object[] N04_RD_FOPEN = (Object[]) ((Object[]) structure62.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_FOPEN].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_FOPEN]), 0))[0];
                                    List<Object[]> N04_WO_FOPEN = new ArrayList<Object[]>(N04_RD_FOPEN.length);
                                    for (Object N04_RD_FOPEN1 : N04_RD_FOPEN) {
                                        N04_WO_FOPEN.add((Object[]) structure63.toObject(mapping.Char(mapping.GetDimension(WO_FOPEN)).toBytes(N04_RD_FOPEN1), 0));
                                    }
                                    Object[] N04_RD_VRIC = (Object[]) ((Object[]) structure64.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_VRIC].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_VRIC]), 0))[0];
                                    List<Object[]> N04_WO_VRIC = new ArrayList<Object[]>(N04_RD_VRIC.length);
                                    for (Object N04_RD_VRIC1 : N04_RD_VRIC) {
                                        N04_WO_VRIC.add((Object[]) structure65.toObject(mapping.Char(mapping.GetDimension(WO_VRIC)).toBytes(N04_RD_VRIC1), 0));
                                    }
                                    Object[] N04_RD_PFC = (Object[]) ((Object[]) structure66.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_PFC].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_PFC]), 0))[0];
                                    List<Object[]> N04_WO_PFC = new ArrayList<Object[]>(N04_RD_PFC.length);
                                    for (Object N04_RD_PFC1 : N04_RD_PFC) {
                                        N04_WO_PFC.add((Object[]) structure67.toObject(mapping.Char(mapping.GetDimension(WO_PFC)).toBytes(N04_RD_PFC1), 0));
                                    }
                                    Object[] N04_RD_PNR = (Object[]) ((Object[]) structure68.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_PNR].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_PNR]), 0))[0];
                                    List<Object[]> N04_WO_PNR = new ArrayList<Object[]>(N04_RD_PNR.length);
                                    for (Object N04_RD_PNR1 : N04_RD_PNR) {
                                        N04_WO_PNR.add((Object[]) structure69.toObject(mapping.Char(mapping.GetDimension(WO_PNR)).toBytes(N04_RD_PNR1), 0));
                                    }
                                    Object[] N04_RD_AGTVTA = (Object[]) ((Object[]) structure70.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_AGTVTA].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_AGTVTA]), 0))[0];
                                    List<Object[]> N04_WO_AGTVTA = new ArrayList<Object[]>(N04_RD_AGTVTA.length);
                                    for (Object N04_RD_AGTVTA1 : N04_RD_AGTVTA) {
                                        N04_WO_AGTVTA.add((Object[]) structure71.toObject(mapping.Char(mapping.GetDimension(WO_AGTVTA)).toBytes(N04_RD_AGTVTA1), 0));
                                    }
                                    Object[] N04_RD_FECUSO = (Object[]) ((Object[]) structure72.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_FECUSO].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_FECUSO]), 0))[0];
                                    List<Object[]> N04_WO_FECUSO = new ArrayList<Object[]>(N04_RD_FECUSO.length);
                                    for (Object N04_RD_FECUSO1 : N04_RD_FECUSO) {
                                        N04_WO_FECUSO.add((Object[]) structure73.toObject(mapping.Char(mapping.GetDimension(WO_FECUSO)).toBytes(N04_RD_FECUSO1), 0));
                                    }
                                    Object[] N04_RD_CTA = (Object[]) ((Object[]) structure74.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_CTA].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_CTA]), 0))[0];
                                    List<Object[]> N04_WO_CTA = new ArrayList<Object[]>(N04_RD_CTA.length);
                                    for (Object N04_RD_CTA1 : N04_RD_CTA) {
                                        N04_WO_CTA.add((Object[]) structure75.toObject(mapping.Char(mapping.GetDimension(WO_CTA)).toBytes(N04_RD_CTA1), 0));
                                    }
                                    Object[] N04_RD_LIB1 = (Object[]) ((Object[]) structure76.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_LIB1].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_LIB1]), 0))[0];
                                    List<Object[]> N04_WO_LIB1 = new ArrayList<Object[]>(N04_RD_LIB1.length);
                                    for (Object N04_RD_LIB11 : N04_RD_LIB1) {
                                        N04_WO_LIB1.add((Object[]) structure77.toObject(mapping.Char(mapping.GetDimension(WO_LIB1)).toBytes(N04_RD_LIB11), 0));
                                    }
                                    Object[] N04_RD_LIB1CIA = (Object[]) ((Object[]) structure78.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_LIB1CIA].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_LIB1CIA]), 0))[0];
                                    List<Object[]> N04_WO_LIB1CIA = new ArrayList<Object[]>(N04_RD_LIB1CIA.length);
                                    for (Object N04_RD_LIB1CIA1 : N04_RD_LIB1CIA) {
                                        N04_WO_LIB1CIA.add((Object[]) structure79.toObject(mapping.Char(mapping.GetDimension(WO_LIB1CIA)).toBytes(N04_RD_LIB1CIA1), 0));
                                    }
                                    Object[] N04_RD_CLIENT = (Object[]) ((Object[]) structure80.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_CLIENT].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_CLIENT]), 0))[0];
                                    List<Object[]> N04_WO_CLIENT = new ArrayList<Object[]>(N04_RD_CLIENT.length);
                                    for (Object N04_RD_CLIENT1 : N04_RD_CLIENT) {
                                        N04_WO_CLIENT.add((Object[]) structure81.toObject(mapping.Char(mapping.GetDimension(WO_CLIENT)).toBytes(N04_RD_CLIENT1), 0));
                                    }
                                    Object[] N04_RD_DIRECC = (Object[]) ((Object[]) structure82.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_DIRECC].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_DIRECC]), 0))[0];
                                    List<Object[]> N04_WO_DIRECC = new ArrayList<Object[]>(N04_RD_DIRECC.length);
                                    for (Object N04_RD_DIRECC1 : N04_RD_DIRECC) {
                                        N04_WO_DIRECC.add((Object[]) structure83.toObject(mapping.Char(mapping.GetDimension(WO_DIRECC)).toBytes(N04_RD_DIRECC1), 0));
                                    }
                                    Object[] N04_RD_PROVEE = (Object[]) ((Object[]) structure84.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_PROVEE].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_PROVEE]), 0))[0];
                                    List<Object[]> N04_WO_PROVEE = new ArrayList<Object[]>(N04_RD_PROVEE.length);
                                    for (Object N04_RD_PROVEE1 : N04_RD_PROVEE) {
                                        N04_WO_PROVEE.add((Object[]) structure85.toObject(mapping.Char(mapping.GetDimension(WO_PROVEE)).toBytes(N04_RD_PROVEE1), 0));
                                    }
                                    Object[] N04_RD_TD_ORAC = (Object[]) ((Object[]) structure86.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_TD_ORAC].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_TD_ORAC]), 0))[0];
                                    List<Object[]> N04_WO_TD_ORAC = new ArrayList<Object[]>(N04_RD_TD_ORAC.length);
                                    for (Object N04_RD_TD_ORAC1 : N04_RD_TD_ORAC) {
                                        N04_WO_TD_ORAC.add((Object[]) structure87.toObject(mapping.Char(mapping.GetDimension(WO_TD_ORAC)).toBytes(N04_RD_TD_ORAC1), 0));
                                    }
                                    Object[] N04_RD_COMB = (Object[]) ((Object[]) structure88.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_COMB].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_COMB]), 0))[0];
                                    List<Object[]> N04_WO_COMB = new ArrayList<Object[]>(N04_RD_COMB.length);
                                    for (Object N04_RD_COMB1 : N04_RD_COMB) {
                                        N04_WO_COMB.add((Object[]) structure89.toObject(mapping.Char(mapping.GetDimension(WO_COMB)).toBytes(N04_RD_COMB1), 0));
                                    }
                                    Object[] N04_RD_TITU = (Object[]) ((Object[]) structure90.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_TITU].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_TITU]), 0))[0];
                                    List<Object[]> N04_WO_TITU = new ArrayList<Object[]>(N04_RD_TITU.length);
                                    for (Object N04_RD_TITU1 : N04_RD_TITU) {
                                        N04_WO_TITU.add((Object[]) structure91.toObject(mapping.Char(mapping.GetDimension(WO_TITU)).toBytes(N04_RD_TITU1), 0));
                                    }
                                    Object[] N04_RD_SURC = (Object[]) ((Object[]) structure92.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_SURC].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_SURC]), 0))[0];
                                    List<Object[]> N04_WO_SURC = new ArrayList<Object[]>(N04_RD_SURC.length);
                                    for (Object N04_RD_SURC1 : N04_RD_SURC) {
                                        N04_WO_SURC.add((Object[]) structure93.toObject(mapping.Char(mapping.GetDimension(WO_SURC)).toBytes(N04_RD_SURC1), 0));
                                    }
                                    Object[] N04_RD_CTAC = (Object[]) ((Object[]) structure94.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_CTAC].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_CTAC]), 0))[0];
                                    List<Object[]> N04_WO_CTAC = new ArrayList<Object[]>(N04_RD_CTAC.length);
                                    for (Object N04_RD_CTAC1 : N04_RD_CTAC) {
                                        N04_WO_CTAC.add((Object[]) structure95.toObject(mapping.Char(mapping.GetDimension(WO_CTAC)).toBytes(N04_RD_CTAC1), 0));
                                    }
                                    Object[] N04_RD_TITUC = (Object[]) ((Object[]) structure96.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_TITUC].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_TITUC]), 0))[0];
                                    List<Object[]> N04_WO_TITUC = new ArrayList<Object[]>(N04_RD_TITUC.length);
                                    for (Object N04_RD_TITUC1 : N04_RD_TITUC) {
                                        N04_WO_TITUC.add((Object[]) structure97.toObject(mapping.Char(mapping.GetDimension(WO_TITUC)).toBytes(N04_RD_TITUC1), 0));
                                    }
                                    Object[] N04_RD_LIB1C = (Object[]) ((Object[]) structure98.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_LIB1C].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_LIB1C]), 0))[0];
                                    List<Object[]> N04_WO_LIB1C = new ArrayList<Object[]>(N04_RD_LIB1C.length);
                                    for (Object N04_RD_LIB1C1 : N04_RD_LIB1C) {
                                        N04_WO_LIB1C.add((Object[]) structure99.toObject(mapping.Char(mapping.GetDimension(WO_LIB1C)).toBytes(N04_RD_LIB1C1), 0));
                                    }
                                    Object[] N04_RD_CTAP = (Object[]) ((Object[]) structure100.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_CTAP].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_CTAP]), 0))[0];
                                    List<Object[]> N04_WO_CTAP = new ArrayList<Object[]>(N04_RD_CTAP.length);
                                    for (Object N04_RD_CTAP1 : N04_RD_CTAP) {
                                        N04_WO_CTAP.add((Object[]) structure101.toObject(mapping.Char(mapping.GetDimension(WO_CTAP)).toBytes(N04_RD_CTAP1), 0));
                                    }
                                    Object[] N04_RD_TITUP = (Object[]) ((Object[]) structure102.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_TITUP].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_TITUP]), 0))[0];
                                    List<Object[]> N04_WO_TITUP = new ArrayList<Object[]>(N04_RD_TITUP.length);
                                    for (Object N04_RD_TITUP1 : N04_RD_TITUP) {
                                        N04_WO_TITUP.add((Object[]) structure103.toObject(mapping.Char(mapping.GetDimension(WO_TITUP)).toBytes(N04_RD_TITUP1), 0));
                                    }
                                    Object[] N04_RD_LIB1P = (Object[]) ((Object[]) structure104.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_LIB1P].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_LIB1P]), 0))[0];
                                    List<Object[]> N04_WO_LIB1P = new ArrayList<Object[]>(N04_RD_LIB1P.length);
                                    for (Object N04_RD_LIB1P1 : N04_RD_LIB1P) {
                                        N04_WO_LIB1P.add((Object[]) structure105.toObject(mapping.Char(mapping.GetDimension(WO_LIB1P)).toBytes(N04_RD_LIB1P1), 0));
                                    }
                                    Object[] N04_RD_CTAPC = (Object[]) ((Object[]) structure106.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_CTAPC].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_CTAPC]), 0))[0];
                                    List<Object[]> N04_WO_CTAPC = new ArrayList<Object[]>(N04_RD_CTAPC.length);
                                    for (Object N04_RD_CTAPC1 : N04_RD_CTAPC) {
                                        N04_WO_CTAPC.add((Object[]) structure107.toObject(mapping.Char(mapping.GetDimension(WO_CTAPC)).toBytes(N04_RD_CTAPC1), 0));
                                    }
                                    Object[] N04_RD_TITUPC = (Object[]) ((Object[]) structure108.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_TITUPC].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_TITUPC]), 0))[0];
                                    List<Object[]> N04_WO_TITUPC = new ArrayList<Object[]>(N04_RD_TITUPC.length);
                                    for (Object N04_RD_TITUPC1 : N04_RD_TITUPC) {
                                        N04_WO_TITUPC.add((Object[]) structure109.toObject(mapping.Char(mapping.GetDimension(WO_TITUPC)).toBytes(N04_RD_TITUPC1), 0));
                                    }
                                    Object[] N04_RD_LIB1PC = (Object[]) ((Object[]) structure110.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_LIB1PC].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_LIB1PC]), 0))[0];
                                    List<Object[]> N04_WO_LIB1PC = new ArrayList<Object[]>(N04_RD_LIB1PC.length);
                                    for (Object N04_RD_LIB1PC1 : N04_RD_LIB1PC) {
                                        N04_WO_LIB1PC.add((Object[]) structure111.toObject(mapping.Char(mapping.GetDimension(WO_LIB1PC)).toBytes(N04_RD_LIB1PC1), 0));
                                    }
                                    Object[] N04_RD_CTAPAR = (Object[]) ((Object[]) structure112.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_CTAPAR].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_CTAPAR]), 0))[0];
                                    List<Object[]> N04_WO_CTAPAR = new ArrayList<Object[]>(N04_RD_CTAPAR.length);
                                    for (Object N04_RD_CTAPAR1 : N04_RD_CTAPAR) {
                                        N04_WO_CTAPAR.add((Object[]) structure113.toObject(mapping.Char(mapping.GetDimension(WO_CTAPAR)).toBytes(N04_RD_CTAPAR1), 0));
                                    }
                                    Object[] N04_RD_TITUPAR = (Object[]) ((Object[]) structure114.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_TITUPAR].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_TITUPAR]), 0))[0];
                                    List<Object[]> N04_WO_TITUPAR = new ArrayList<Object[]>(N04_RD_TITUPAR.length);
                                    for (Object N04_RD_TITUPAR1 : N04_RD_TITUPAR) {
                                        N04_WO_TITUPAR.add((Object[]) structure115.toObject(mapping.Char(mapping.GetDimension(WO_TITUPAR)).toBytes(N04_RD_TITUPAR1), 0));
                                    }
                                    Object[] N04_RD_LIB1PAR = (Object[]) ((Object[]) structure116.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_LIB1PAR].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_LIB1PAR]), 0))[0];
                                    List<Object[]> N04_WO_LIB1PAR = new ArrayList<Object[]>(N04_RD_LIB1PAR.length);
                                    for (Object N04_RD_LIB1PAR1 : N04_RD_LIB1PAR) {
                                        N04_WO_LIB1PAR.add((Object[]) structure117.toObject(mapping.Char(mapping.GetDimension(WO_LIB1PAR)).toBytes(N04_RD_LIB1PAR1), 0));
                                    }
                                    Object[] N04_RD_CLIENTAR = (Object[]) ((Object[]) structure118.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_CLIENTAR].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_CLIENTAR]), 0))[0];
                                    List<Object[]> N04_WO_CLIENTAR = new ArrayList<Object[]>(N04_RD_CLIENTAR.length);
                                    for (Object N04_RD_CLIENTAR1 : N04_RD_CLIENTAR) {
                                        N04_WO_CLIENTAR.add((Object[]) structure119.toObject(mapping.Char(mapping.GetDimension(WO_CLIENTAR)).toBytes(N04_RD_CLIENTAR1), 0));
                                    }
                                    Object[] N04_RD_DIRECCAR = (Object[]) ((Object[]) structure120.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_DIRECCAR].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_DIRECCAR]), 0))[0];
                                    List<Object[]> N04_WO_DIRECCAR = new ArrayList<Object[]>(N04_RD_DIRECCAR.length);
                                    for (Object N04_RD_DIRECCAR1 : N04_RD_DIRECCAR) {
                                        N04_WO_DIRECCAR.add((Object[]) structure121.toObject(mapping.Char(mapping.GetDimension(WO_DIRECCAR)).toBytes(N04_RD_DIRECCAR1), 0));
                                    }
                                    Object[] N04_RD_TD_ORACAR = (Object[]) ((Object[]) structure122.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_TD_ORACAR].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_TD_ORACAR]), 0))[0];
                                    List<Object[]> N04_WO_TD_ORACAR = new ArrayList<Object[]>(N04_RD_TD_ORACAR.length);
                                    for (Object N04_RD_TD_ORACAR1 : N04_RD_TD_ORACAR) {
                                        N04_WO_TD_ORACAR.add((Object[]) structure123.toObject(mapping.Char(mapping.GetDimension(WO_TD_ORACAR)).toBytes(N04_RD_TD_ORACAR1), 0));
                                    }
                                    //</editor-fold>
                                    for (int i = 0; i < N04_RD_GRUPO.length; i++) {
                                        System.out.println(i);
                                        if (i == 199) {//ZENOBIO 89
                                            i = i;
                                        } else {
                                            System.out.println(i);
                                        }
                                        if (mapping.getString(N04_WO_GRUPO.get(i)[IDX_WO_GRUPO.RD_GRUPO]).trim().length() > 0) {
                                            objRtn = new PX0241S01A720Filter();
                                            //<editor-fold defaultstate="collapsed" desc="{...}">
                                            objRtn.TKT = mapping.getString(N03_DATOS_INPUT[IDX_DATOS_INPUT.REC_CIA_10206]) + mapping.getString(N03_DATOS_INPUT[IDX_DATOS_INPUT.REC_FORMA_10206]) + mapping.getString(N03_DATOS_INPUT[IDX_DATOS_INPUT.REC_SERIE_10206]);
                                            objRtn.SEQ = mapping.getString(N03_DATOS_INPUT[IDX_DATOS_INPUT.REC_SEQ_10206]);
                                            objRtn.STATUS = rs01.getString("STATUS");
                                            objRtn.ERROR = mapping.getString(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.REC_ESTADO_10206]);
                                            objRtn.CODERROR = mapping.getString(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.REC_CODERR_10206]);
                                            objRtn.MENSAJE = mapping.getString(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.REC_MSJERR_10206]);
                                            objRtn.GRUPO = mapping.getString(N04_WO_GRUPO.get(i)[IDX_WO_GRUPO.RD_GRUPO]);
                                            objRtn.FUENTE = mapping.getString(N04_WO_FUENT.get(i)[IDX_WO_FUENT.RD_FUENT]);
                                            objRtn.PAIS = mapping.getString(N04_WO_PSVTA.get(i)[IDX_WO_PSVTA.RD_PSVTA]);
                                            objRtn.SUBFUENTE = mapping.getString(N04_WO_SFUEN.get(i)[IDX_WO_SFUEN.RD_SFUEN]);
                                            objRtn.TFUENTE = mapping.getString(N04_WO_TFUEN.get(i)[IDX_WO_TFUEN.RD_TFUEN]);
                                            objRtn.BANCO = mapping.getString(N04_WO_BANCO.get(i)[IDX_WO_BANCO.RD_BANCO]);
                                            objRtn.IATA = mapping.getString(N04_WO_AGENT.get(i)[IDX_WO_AGENT.RD_AGENT]);
                                            objRtn.CSABRE = mapping.getString(N04_WO_CSABR.get(i)[IDX_WO_CSABR.RD_CSABR]);
                                            objRtn.FECHARPT = mapping.getString(N04_WO_FPROC.get(i)[IDX_WO_FPROC.RD_FPROC]);
                                            objRtn.MONEDA = mapping.getString(N04_WO_MDALOC.get(i)[IDX_WO_MDALOC.RD_MDALOC]);
                                            objRtn.TCAMB = Double.toString(mapping.getDouble(N04_WO_TCAMB.get(i)[IDX_WO_TCAMB.RD_TCAMB]));
                                            objRtn.FECVTA = mapping.getString(N04_WO_FECVTA.get(i)[IDX_WO_FECVTA.RD_FECVTA]);
                                            objRtn.TRANSACTION = mapping.getString(N04_WO_TRNC.get(i)[IDX_WO_TRNC.RD_TRNC]);
                                            objRtn.TDOC = mapping.getString(N04_WO_TDOC.get(i)[IDX_WO_TDOC.RD_TDOC]);
                                            objRtn.TFOR = mapping.getString(N04_WO_TFOR.get(i)[IDX_WO_TFOR.RD_TFOR]);
                                            objRtn.CONCEPT1 = mapping.getString(N04_WO_CONP1.get(i)[IDX_WO_CONP1.RD_CONP1]);
                                            objRtn.CONCEPT2 = mapping.getString(N04_WO_CONP2.get(i)[IDX_WO_CONP2.RD_CONP2]);
                                            objRtn.CONCEPT3 = mapping.getString(N04_WO_CONP3.get(i)[IDX_WO_CONP3.RD_CONP3]);
                                            objRtn.TTARJ = mapping.getString(N04_WO_TTARJ.get(i)[IDX_WO_TTARJ.RD_TTARJ]);
                                            objRtn.NTARJ = mapping.getString(N04_WO_NTARJ.get(i)[IDX_WO_NTARJ.RD_NTARJ]);
                                            objRtn.RFIC = mapping.getString(N04_WO_RFIC.get(i)[IDX_WO_RFIC.RD_RFIC]);
                                            objRtn.RFIS = mapping.getString(N04_WO_RFIS.get(i)[IDX_WO_RFIS.RD_RFIS]);
                                            objRtn.DEBITO = Double.toString(mapping.getDouble(N04_WO_DEBLOC.get(i)[IDX_WO_DEBLOC.RD_DEBLOC]));
                                            if (Double.parseDouble(objRtn.DEBITO) == 0d) {
                                                objRtn.DEBITO = "";
                                            }
                                            objRtn.CREDITO = Double.toString(mapping.getDouble(N04_WO_CRELOC.get(i)[IDX_WO_CRELOC.RD_CRELOC]));
                                            if (Double.parseDouble(objRtn.CREDITO) == 0d) {
                                                objRtn.CREDITO = "";
                                            }
                                            objRtn.DEBITORV = Double.toString(mapping.getDouble(N04_WO_DEBREV.get(i)[IDX_WO_DEBREV.RD_DEBREV]));
                                            if (Double.parseDouble(objRtn.DEBITORV) == 0d) {
                                                objRtn.DEBITORV = "";
                                            }
                                            objRtn.CREDITORV = Double.toString(mapping.getDouble(N04_WO_CREREV.get(i)[IDX_WO_CREREV.RD_CREREV]));
                                            if (Double.parseDouble(objRtn.CREDITORV) == 0d) {
                                                objRtn.CREDITORV = "";
                                            }
                                            objRtn.TASA = mapping.getString(N04_WO_TASIVA.get(i)[IDX_WO_TASIVA.RD_TASIVA]);
                                            objRtn.FOP_IVA = mapping.getString(N04_WO_FOPIVA.get(i)[IDX_WO_FOPIVA.RD_FOPIVA]);
                                            objRtn.FOPEN = mapping.getString(N04_WO_FOPEN.get(i)[IDX_WO_FOPEN.RD_FOPEN]);
                                            objRtn.VRIC = mapping.getString(N04_WO_VRIC.get(i)[IDX_WO_VRIC.RD_VRIC]);
                                            objRtn.PFC = mapping.getString(N04_WO_PFC.get(i)[IDX_WO_PFC.RD_PFC]);
                                            objRtn.PNR = mapping.getString(N04_WO_PNR.get(i)[IDX_WO_PNR.RD_PNR]);
                                            objRtn.IATAVTA = mapping.getString(N04_WO_AGTVTA.get(i)[IDX_WO_AGTVTA.RD_AGTVTA]);
                                            objRtn.FECUSO = mapping.getString(N04_WO_FECUSO.get(i)[IDX_WO_FECUSO.RD_FECUSO]);
                                            objRtn.CTA = mapping.getString(N04_WO_CTA.get(i)[IDX_WO_CTA.RD_CTA]);
                                            objRtn.LIB1 = mapping.getString(N04_WO_LIB1.get(i)[IDX_WO_LIB1.RD_LIB1]);
                                            objRtn.CIA1 = mapping.getString(N04_WO_LIB1CIA.get(i)[IDX_WO_LIB1CIA.RD_LIB1CIA]);
                                            objRtn.CLIENTE = mapping.getString(N04_WO_CLIENT.get(i)[IDX_WO_CLIENT.RD_CLIENT]);
                                            objRtn.DIRECCION = mapping.getString(N04_WO_DIRECC.get(i)[IDX_WO_DIRECC.RD_DIRECC]);
                                            objRtn.PROVEEDOR = mapping.getString(N04_WO_PROVEE.get(i)[IDX_WO_PROVEE.RD_PROVEE]);
                                            objRtn.TD_ORACLE = mapping.getString(N04_WO_TD_ORAC.get(i)[IDX_WO_TD_ORAC.RD_TD_ORAC]);
                                            objRtn.COMB = Integer.toString(mapping.getInt(N04_WO_COMB.get(i)[IDX_WO_COMB.RD_COMB]));
                                            objRtn.TITULO = mapping.getString(N04_WO_TITU.get(i)[IDX_WO_TITU.RD_TITU]);
                                            objRtn.SUCURSAL = mapping.getString(N04_WO_SURC.get(i)[IDX_WO_SURC.RD_SURC]);
                                            objRtn.CTACTRL = mapping.getString(N04_WO_CTAC.get(i)[IDX_WO_CTAC.RD_CTAC]);
                                            objRtn.TITULOCTRL = mapping.getString(N04_WO_TITUC.get(i)[IDX_WO_TITUC.RD_TITUC]);
                                            objRtn.LIBCTRL = mapping.getString(N04_WO_LIB1C.get(i)[IDX_WO_LIB1C.RD_LIB1C]);
                                            objRtn.CTAPROVEE = mapping.getString(N04_WO_CTAP.get(i)[IDX_WO_CTAP.RD_CTAP]);
                                            objRtn.TITULOPROVEE = mapping.getString(N04_WO_TITUP.get(i)[IDX_WO_TITUP.RD_TITUP]);
                                            objRtn.LIBPROVEE = mapping.getString(N04_WO_LIB1P.get(i)[IDX_WO_LIB1P.RD_LIB1P]);
                                            objRtn.CTACTRLPROVEE = mapping.getString(N04_WO_CTAPC.get(i)[IDX_WO_CTAPC.RD_CTAPC]);
                                            objRtn.TITULOCTRLPROVEE = mapping.getString(N04_WO_TITUPC.get(i)[IDX_WO_TITUPC.RD_TITUPC]);
                                            objRtn.LIBCTRLPROVEE = mapping.getString(N04_WO_LIB1PC.get(i)[IDX_WO_LIB1PC.RD_LIB1PC]);
                                            objRtn.CTAARPROVEE = mapping.getString(N04_WO_CTAPAR.get(i)[IDX_WO_CTAPAR.RD_CTAPAR]);
                                            objRtn.TITULOARPROVEE = mapping.getString(N04_WO_TITUPAR.get(i)[IDX_WO_TITUPAR.RD_TITUPAR]);
                                            objRtn.LIBARPROVEE = mapping.getString(N04_WO_LIB1PAR.get(i)[IDX_WO_LIB1PAR.RD_LIB1PAR]);
                                            objRtn.CLIENTEAR06 = mapping.getString(N04_WO_CLIENTAR.get(i)[IDX_WO_CLIENTAR.RD_CLIENTAR]);
                                            objRtn.DIRECCIONAR06 = mapping.getString(N04_WO_DIRECCAR.get(i)[IDX_WO_DIRECCAR.RD_DIRECCAR]);
                                            objRtn.TD_ORACLEAR06 = mapping.getString(N04_WO_TD_ORACAR.get(i)[IDX_WO_TD_ORACAR.RD_TD_ORACAR]);
                                            //</editor-fold>
                                            lstRtn.add(objRtn);
                                        } else {
                                            /*objRtn = new PX0241S01A720Filter();
                                            objRtn.ERROR = mapping.getString(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.REC_ESTADO_10206]);
                                            objRtn.CODERROR = mapping.getString(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.REC_CODERR_10206]);
                                            objRtn.MENSAJE = mapping.getString(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.REC_MSJERR_10206]);
                                            lstRtn.add(objRtn);*/
                                            if (i == 0) {
                                                objRtn = new PX0241S01A720Filter();
                                                objRtn.ERROR = mapping.getString(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.REC_ESTADO_10206]);
                                                objRtn.CODERROR = mapping.getString(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.REC_CODERR_10206]);
                                                objRtn.MENSAJE = mapping.getString(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.REC_MSJERR_10206]);
                                                lstRtn.add(objRtn);
                                            } else {
                                                objRtn = new PX0241S01A720Filter();
                                                objRtn.NTARJ = "TOTAL";
                                                objRtn.DEBITO = Double.toString(mapping.getDouble(N04_WO_DEBLOC.get(199)[IDX_WO_DEBLOC.RD_DEBLOC]));
                                                if (Double.parseDouble(objRtn.DEBITO) == 0d) {
                                                    objRtn.DEBITO = "";
                                                }
                                                objRtn.CREDITO = Double.toString(mapping.getDouble(N04_WO_CRELOC.get(199)[IDX_WO_CRELOC.RD_CRELOC]));
                                                if (Double.parseDouble(objRtn.CREDITO) == 0d) {
                                                    objRtn.CREDITO = "";
                                                }
                                                objRtn.DEBITORV = Double.toString(mapping.getDouble(N04_WO_DEBREV.get(199)[IDX_WO_DEBREV.RD_DEBREV]));
                                                if (Double.parseDouble(objRtn.DEBITORV) == 0d) {
                                                    objRtn.DEBITORV = "";
                                                }
                                                objRtn.CREDITORV = Double.toString(mapping.getDouble(N04_WO_CREREV.get(199)[IDX_WO_CREREV.RD_CREREV]));
                                                if (Double.parseDouble(objRtn.CREDITORV) == 0d) {
                                                    objRtn.CREDITORV = "";
                                                }
                                                lstRtn.add(objRtn);
                                                i = 200;//ZENOBIO 90
                                            }
                                        }
                                    }
                                }
                            } finally {
                                session.getCNXIBMDB2().closeSystem();
                            }
                        }
                    } else {
                        //NOVITO 20170104
                        if (filter.TRANSACTION.equals("EXCH")) {
                            session.getCNXIBMDB2().openSystem();
                            ProgramCall program = new ProgramCall(session.getCNXIBMDB2().getSystem());
                            try {
                                App.CALL_CL3050(session.getCNXIBMDB2().getSystem(), session.getMainLibrary(), session.getUserView().getCustomerInfo().CCUST);
                                String programName = "/QSYS.LIB/" + session.getMainLibrary() + ".LIB/PRO10972.PGM";//PRO10208  PRO10972
                                //<editor-fold defaultstate="collapsed" desc="{...} Mapping">
                                AS400Map mapping = new AS400Map();

                                //<editor-fold defaultstate="collapsed" desc="{...} TRAMA-10208-IN    ">
                                class IDX_TRAMA_10208_IN {

                                    static final int TRAMA_10208_IN = 0;
                                }
                                AS400DataType[] TRAMA_10208_IN = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...} 01 REC-DATA-10208-IN    ">
                                class IDX_REC_DATA_10208_IN {

                                    static final int DATOS_IN = 0;
                                }
                                AS400DataType[] REC_DATA_10208_IN = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}   03 DATOS-IN      ">
                                class IDX_DATOS_IN {

                                    static final int REC_PROGRAMA_10208 = 0;
                                    static final int REC_GRUPO_10208 = 1;
                                    static final int REC_TRNC_10208 = 2;
                                    static final int REC_CIA_10208 = 3;
                                    static final int REC_FORMA_10208 = 4;
                                    static final int REC_SERIE_10208 = 5;
                                    static final int REC_SEQ_10208 = 6;
                                }
                                AS400DataType[] DATOS_IN = new AS400DataType[7];
                                DATOS_IN[IDX_DATOS_IN.REC_PROGRAMA_10208] = mapping.Char(10);
                                DATOS_IN[IDX_DATOS_IN.REC_GRUPO_10208] = mapping.Char(9);
                                DATOS_IN[IDX_DATOS_IN.REC_TRNC_10208] = mapping.Char(4);
                                DATOS_IN[IDX_DATOS_IN.REC_CIA_10208] = mapping.Char(3);
                                DATOS_IN[IDX_DATOS_IN.REC_FORMA_10208] = mapping.Char(4);
                                DATOS_IN[IDX_DATOS_IN.REC_SERIE_10208] = mapping.Char(6);
                                DATOS_IN[IDX_DATOS_IN.REC_SEQ_10208] = mapping.Char(2);

                                REC_DATA_10208_IN[IDX_REC_DATA_10208_IN.DATOS_IN] = mapping.Char(mapping.GetDimension(DATOS_IN));
                                TRAMA_10208_IN[IDX_TRAMA_10208_IN.TRAMA_10208_IN] = mapping.Char(mapping.GetDimension(REC_DATA_10208_IN));
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...} TRAMA-10208    ">
                                class IDX_TRAMA_10208 {

                                    static final int TRAMA_10208 = 0;
                                }
                                AS400DataType[] TRAMA_10208 = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...} 01 REC-DATA-10208    ">
                                class IDX_REC_DATA_10208 {

                                    static final int DATOS_INPUT = 0;
                                    static final int DATOS_OUTPUT = 1;
                                }
                                AS400DataType[] REC_DATA_10208 = new AS400DataType[2];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}   03 DATOS-INPUT      ">
                                class IDX_DATOS_INPUT {

                                    static final int REC_PROGRAMA_10208 = 0;
                                    static final int REC_GRUPO_10208 = 1;
                                    static final int REC_TRNC_10208 = 2;
                                    static final int REC_CIA_10208 = 3;
                                    static final int REC_FORMA_10208 = 4;
                                    static final int REC_SERIE_10208 = 5;
                                    static final int REC_SEQ_10208 = 6;
                                }
                                AS400DataType[] DATOS_INPUT = new AS400DataType[7];
                                DATOS_INPUT[IDX_DATOS_INPUT.REC_PROGRAMA_10208] = mapping.Char(10);
                                DATOS_INPUT[IDX_DATOS_INPUT.REC_GRUPO_10208] = mapping.Char(9);
                                DATOS_INPUT[IDX_DATOS_INPUT.REC_TRNC_10208] = mapping.Char(4);
                                DATOS_INPUT[IDX_DATOS_INPUT.REC_CIA_10208] = mapping.Char(3);
                                DATOS_INPUT[IDX_DATOS_INPUT.REC_FORMA_10208] = mapping.Char(4);
                                DATOS_INPUT[IDX_DATOS_INPUT.REC_SERIE_10208] = mapping.Char(6);
                                DATOS_INPUT[IDX_DATOS_INPUT.REC_SEQ_10208] = mapping.Char(2);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}   03 DATOS-OUTPUT * ">
                                class IDX_DATOS_OUTPUT {

                                    static final int REC_ESTADO_10208 = 0;
                                    static final int REC_CODERR_10208 = 1;
                                    static final int REC_MSJERR_10208 = 2;
                                    static final int RD_GRUPO = 3;
                                    static final int RD_FUENT = 4;
                                    static final int RD_PSVTA = 5;
                                    static final int RD_SFUEN = 6;
                                    static final int RD_TFUEN = 7;
                                    static final int RD_BANCO = 8;
                                    static final int RD_AGENT = 9;
                                    static final int RD_CSABR = 10;
                                    static final int RD_FPROC = 11;
                                    static final int RD_MDALOC = 12;
                                    static final int RD_TCAMB = 13;
                                    static final int RD_FECVTA = 14;
                                    static final int RD_TRNC = 15;
                                    static final int RD_TDOC = 16;
                                    static final int RD_TFOR = 17;
                                    static final int RD_CONP1 = 18;
                                    static final int RD_CONP2 = 19;
                                    static final int RD_CONP3 = 20;
                                    static final int RD_TTARJ = 21;
                                    static final int RD_NTARJ = 22;
                                    static final int RD_RFIC = 23;
                                    static final int RD_RFIS = 24;
                                    static final int RD_DEBLOC = 25;
                                    static final int RD_CRELOC = 26;
                                    static final int RD_DEBREV = 27;
                                    static final int RD_CREREV = 28;
                                    static final int RD_TASIVA = 29;
                                    static final int RD_FOPIVA = 30;
                                    static final int RD_FOPEN = 31;
                                    static final int RD_VRIC = 32;
                                    static final int RD_PFC = 33;
                                    static final int RD_PNR = 34;
                                    static final int RD_AGTVTA = 35;
                                    static final int RD_FECUSO = 36;
                                    static final int RD_CTA = 37;
                                    static final int RD_LIB1 = 38;
                                    static final int RD_LIB1CIA = 39;
                                    static final int RD_CLIENT = 40;
                                    static final int RD_DIRECC = 41;
                                    static final int RD_PROVEE = 42;
                                    static final int RD_TD_ORAC = 43;
                                    static final int RD_COMB = 44;
                                    static final int RD_TITU = 45;
                                    static final int RD_SURC = 46;
                                }
                                AS400DataType[] DATOS_OUTPUT = new AS400DataType[47];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 REC-ESTADO-10208">
                                AS400DataType[] REC_ESTADO_10208 = new AS400DataType[1];
                                REC_ESTADO_10208[0] = mapping.Char(1);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 REC-CODERR-10208">
                                AS400DataType[] REC_CODERR_10208 = new AS400DataType[1];
                                REC_CODERR_10208[0] = mapping.Char(6);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 REC-MSJERR-10208">
                                AS400DataType[] REC_MSJERR_10208 = new AS400DataType[1];
                                REC_MSJERR_10208[0] = mapping.Char(80);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-GRUPO       ">
                                AS400DataType[] RD_GRUPO = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-GRUPO     ">
                                class IDX_WO_GRUPO {

                                    static final int RD_GRUPO = 0;
                                }
                                AS400DataType[] WO_GRUPO = new AS400DataType[1];
                                WO_GRUPO[IDX_WO_GRUPO.RD_GRUPO] = mapping.Char(9);

                                RD_GRUPO[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_GRUPO)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-FUENT       ">
                                AS400DataType[] RD_FUENT = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-FUENT     ">
                                class IDX_WO_FUENT {

                                    static final int RD_FUENT = 0;
                                }
                                AS400DataType[] WO_FUENT = new AS400DataType[1];
                                WO_FUENT[IDX_WO_FUENT.RD_FUENT] = mapping.Char(3);

                                RD_FUENT[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_FUENT)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-PSVTA       ">
                                AS400DataType[] RD_PSVTA = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-PSVTA     ">
                                class IDX_WO_PSVTA {

                                    static final int RD_PSVTA = 0;
                                }
                                AS400DataType[] WO_PSVTA = new AS400DataType[1];
                                WO_PSVTA[IDX_WO_PSVTA.RD_PSVTA] = mapping.Char(2);

                                RD_PSVTA[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_PSVTA)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-SFUEN       ">
                                AS400DataType[] RD_SFUEN = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-SFUEN     ">
                                class IDX_WO_SFUEN {

                                    static final int RD_SFUEN = 0;
                                }
                                AS400DataType[] WO_SFUEN = new AS400DataType[1];
                                WO_SFUEN[IDX_WO_SFUEN.RD_SFUEN] = mapping.Char(3);

                                RD_SFUEN[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_SFUEN)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-TFUEN       ">
                                AS400DataType[] RD_TFUEN = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-TFUEN     ">
                                class IDX_WO_TFUEN {

                                    static final int RD_TFUEN = 0;
                                }
                                AS400DataType[] WO_TFUEN = new AS400DataType[1];
                                WO_TFUEN[IDX_WO_TFUEN.RD_TFUEN] = mapping.Char(3);

                                RD_TFUEN[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_TFUEN)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-BANCO       ">
                                AS400DataType[] RD_BANCO = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-BANCO     ">
                                class IDX_WO_BANCO {

                                    static final int RD_BANCO = 0;
                                }
                                AS400DataType[] WO_BANCO = new AS400DataType[1];
                                WO_BANCO[IDX_WO_BANCO.RD_BANCO] = mapping.Char(2);

                                RD_BANCO[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_BANCO)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-AGENT       ">
                                AS400DataType[] RD_AGENT = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-AGENT     ">
                                class IDX_WO_AGENT {

                                    static final int RD_AGENT = 0;
                                }
                                AS400DataType[] WO_AGENT = new AS400DataType[1];
                                WO_AGENT[IDX_WO_AGENT.RD_AGENT] = mapping.Char(8);

                                RD_AGENT[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_AGENT)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-CSABR       ">
                                AS400DataType[] RD_CSABR = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-CSABR     ">
                                class IDX_WO_CSABR {

                                    static final int RD_CSABR = 0;
                                }
                                AS400DataType[] WO_CSABR = new AS400DataType[1];
                                WO_CSABR[IDX_WO_CSABR.RD_CSABR] = mapping.Char(5);

                                RD_CSABR[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_CSABR)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-FPROC       ">
                                AS400DataType[] RD_FPROC = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-FPROC     ">
                                class IDX_WO_FPROC {

                                    static final int RD_FPROC = 0;
                                }
                                AS400DataType[] WO_FPROC = new AS400DataType[1];
                                WO_FPROC[IDX_WO_FPROC.RD_FPROC] = mapping.Char(8);

                                RD_FPROC[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_FPROC)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-MDALOC       ">
                                AS400DataType[] RD_MDALOC = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-MDALOC     ">
                                class IDX_WO_MDALOC {

                                    static final int RD_MDALOC = 0;
                                }
                                AS400DataType[] WO_MDALOC = new AS400DataType[1];
                                WO_MDALOC[IDX_WO_MDALOC.RD_MDALOC] = mapping.Char(3);

                                RD_MDALOC[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_MDALOC)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-TCAMB       ">
                                AS400DataType[] RD_TCAMB = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-TCAMB     ">
                                class IDX_WO_TCAMB {

                                    static final int RD_TCAMB = 0;
                                }
                                AS400DataType[] WO_TCAMB = new AS400DataType[1];
                                WO_TCAMB[IDX_WO_TCAMB.RD_TCAMB] = mapping.Numeric(7, 6, true);

                                RD_TCAMB[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_TCAMB)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-FECVTA       ">
                                AS400DataType[] RD_FECVTA = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-FECVTA     ">
                                class IDX_WO_FECVTA {

                                    static final int RD_FECVTA = 0;
                                }
                                AS400DataType[] WO_FECVTA = new AS400DataType[1];
                                WO_FECVTA[IDX_WO_FECVTA.RD_FECVTA] = mapping.Char(8);

                                RD_FECVTA[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_FECVTA)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-TRNC       ">
                                AS400DataType[] RD_TRNC = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-TRNC     ">
                                class IDX_WO_TRNC {

                                    static final int RD_TRNC = 0;
                                }
                                AS400DataType[] WO_TRNC = new AS400DataType[1];
                                WO_TRNC[IDX_WO_TRNC.RD_TRNC] = mapping.Char(4);

                                RD_TRNC[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_TRNC)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-TDOC       ">
                                AS400DataType[] RD_TDOC = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-TDOC     ">
                                class IDX_WO_TDOC {

                                    static final int RD_TDOC = 0;
                                }
                                AS400DataType[] WO_TDOC = new AS400DataType[1];
                                WO_TDOC[IDX_WO_TDOC.RD_TDOC] = mapping.Char(4);

                                RD_TDOC[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_TDOC)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-TFOR       ">
                                AS400DataType[] RD_TFOR = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-TFOR     ">
                                class IDX_WO_TFOR {

                                    static final int RD_TFOR = 0;
                                }
                                AS400DataType[] WO_TFOR = new AS400DataType[1];
                                WO_TFOR[IDX_WO_TFOR.RD_TFOR] = mapping.Char(3);

                                RD_TFOR[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_TFOR)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-CONP1       ">
                                AS400DataType[] RD_CONP1 = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-CONP1     ">
                                class IDX_WO_CONP1 {

                                    static final int RD_CONP1 = 0;
                                }
                                AS400DataType[] WO_CONP1 = new AS400DataType[1];
                                WO_CONP1[IDX_WO_CONP1.RD_CONP1] = mapping.Char(4);

                                RD_CONP1[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_CONP1)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-CONP2       ">
                                AS400DataType[] RD_CONP2 = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-CONP2     ">
                                class IDX_WO_CONP2 {

                                    static final int RD_CONP2 = 0;
                                }
                                AS400DataType[] WO_CONP2 = new AS400DataType[1];
                                WO_CONP2[IDX_WO_CONP2.RD_CONP2] = mapping.Char(3);

                                RD_CONP2[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_CONP2)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-CONP3       ">
                                AS400DataType[] RD_CONP3 = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-CONP3     ">
                                class IDX_WO_CONP3 {

                                    static final int RD_CONP3 = 0;
                                }
                                AS400DataType[] WO_CONP3 = new AS400DataType[1];
                                WO_CONP3[IDX_WO_CONP3.RD_CONP3] = mapping.Char(2);

                                RD_CONP3[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_CONP3)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-TTARJ       ">
                                AS400DataType[] RD_TTARJ = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-TTARJ     ">
                                class IDX_WO_TTARJ {

                                    static final int RD_TTARJ = 0;
                                }
                                AS400DataType[] WO_TTARJ = new AS400DataType[1];
                                WO_TTARJ[IDX_WO_TTARJ.RD_TTARJ] = mapping.Char(2);

                                RD_TTARJ[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_TTARJ)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-NTARJ       ">
                                AS400DataType[] RD_NTARJ = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-NTARJ     ">
                                class IDX_WO_NTARJ {

                                    static final int RD_NTARJ = 0;
                                }
                                AS400DataType[] WO_NTARJ = new AS400DataType[1];
                                WO_NTARJ[IDX_WO_NTARJ.RD_NTARJ] = mapping.Char(19);

                                RD_NTARJ[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_NTARJ)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-RFIC       ">
                                AS400DataType[] RD_RFIC = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-RFIC     ">
                                class IDX_WO_RFIC {

                                    static final int RD_RFIC = 0;
                                }
                                AS400DataType[] WO_RFIC = new AS400DataType[1];
                                WO_RFIC[IDX_WO_RFIC.RD_RFIC] = mapping.Char(1);

                                RD_RFIC[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_RFIC)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-RFIS       ">
                                AS400DataType[] RD_RFIS = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-RFIS     ">
                                class IDX_WO_RFIS {

                                    static final int RD_RFIS = 0;
                                }
                                AS400DataType[] WO_RFIS = new AS400DataType[1];
                                WO_RFIS[IDX_WO_RFIS.RD_RFIS] = mapping.Char(3);

                                RD_RFIS[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_RFIS)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-DEBLOC       ">
                                AS400DataType[] RD_DEBLOC = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-DEBLOC     ">
                                class IDX_WO_DEBLOC {

                                    static final int RD_DEBLOC = 0;
                                }
                                AS400DataType[] WO_DEBLOC = new AS400DataType[1];
                                WO_DEBLOC[IDX_WO_DEBLOC.RD_DEBLOC] = mapping.Numeric(13, 2, true);

                                RD_DEBLOC[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_DEBLOC)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-CRELOC       ">
                                AS400DataType[] RD_CRELOC = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-CRELOC     ">
                                class IDX_WO_CRELOC {

                                    static final int RD_CRELOC = 0;
                                }
                                AS400DataType[] WO_CRELOC = new AS400DataType[1];
                                WO_CRELOC[IDX_WO_CRELOC.RD_CRELOC] = mapping.Numeric(13, 2, true);

                                RD_CRELOC[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_CRELOC)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-DEBREV       ">
                                AS400DataType[] RD_DEBREV = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-DEBREV     ">
                                class IDX_WO_DEBREV {

                                    static final int RD_DEBREV = 0;
                                }
                                AS400DataType[] WO_DEBREV = new AS400DataType[1];
                                WO_DEBREV[IDX_WO_DEBREV.RD_DEBREV] = mapping.Numeric(13, 2, true);

                                RD_DEBREV[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_DEBREV)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-CREREV       ">
                                AS400DataType[] RD_CREREV = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-CREREV     ">
                                class IDX_WO_CREREV {

                                    static final int RD_CREREV = 0;
                                }
                                AS400DataType[] WO_CREREV = new AS400DataType[1];
                                WO_CREREV[IDX_WO_CREREV.RD_CREREV] = mapping.Numeric(13, 2, true);

                                RD_CREREV[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_CREREV)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-TASIVA       ">
                                AS400DataType[] RD_TASIVA = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-TASIVA     ">
                                class IDX_WO_TASIVA {

                                    static final int RD_TASIVA = 0;
                                }
                                AS400DataType[] WO_TASIVA = new AS400DataType[1];
                                WO_TASIVA[IDX_WO_TASIVA.RD_TASIVA] = mapping.Char(2);

                                RD_TASIVA[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_TASIVA)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-FOPIVA       ">
                                AS400DataType[] RD_FOPIVA = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-FOPIVA     ">
                                class IDX_WO_FOPIVA {

                                    static final int RD_FOPIVA = 0;
                                }
                                AS400DataType[] WO_FOPIVA = new AS400DataType[1];
                                WO_FOPIVA[IDX_WO_FOPIVA.RD_FOPIVA] = mapping.Char(2);

                                RD_FOPIVA[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_FOPIVA)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-FOPEN       ">
                                AS400DataType[] RD_FOPEN = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-FOPEN     ">
                                class IDX_WO_FOPEN {

                                    static final int RD_FOPEN = 0;
                                }
                                AS400DataType[] WO_FOPEN = new AS400DataType[1];
                                WO_FOPEN[IDX_WO_FOPEN.RD_FOPEN] = mapping.Char(8);

                                RD_FOPEN[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_FOPEN)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-VRIC       ">
                                AS400DataType[] RD_VRIC = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-VRIC     ">
                                class IDX_WO_VRIC {

                                    static final int RD_VRIC = 0;
                                }
                                AS400DataType[] WO_VRIC = new AS400DataType[1];
                                WO_VRIC[IDX_WO_VRIC.RD_VRIC] = mapping.Char(10);

                                RD_VRIC[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_VRIC)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-PFC       ">
                                AS400DataType[] RD_PFC = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-PFC     ">
                                class IDX_WO_PFC {

                                    static final int RD_PFC = 0;
                                }
                                AS400DataType[] WO_PFC = new AS400DataType[1];
                                WO_PFC[IDX_WO_PFC.RD_PFC] = mapping.Char(3);

                                RD_PFC[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_PFC)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-PNR       ">
                                AS400DataType[] RD_PNR = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-PNR     ">
                                class IDX_WO_PNR {

                                    static final int RD_PNR = 0;
                                }
                                AS400DataType[] WO_PNR = new AS400DataType[1];
                                WO_PNR[IDX_WO_PNR.RD_PNR] = mapping.Char(6);

                                RD_PNR[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_PNR)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-AGTVTA       ">
                                AS400DataType[] RD_AGTVTA = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-AGTVTA     ">
                                class IDX_WO_AGTVTA {

                                    static final int RD_AGTVTA = 0;
                                }
                                AS400DataType[] WO_AGTVTA = new AS400DataType[1];
                                WO_AGTVTA[IDX_WO_AGTVTA.RD_AGTVTA] = mapping.Char(8);

                                RD_AGTVTA[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_AGTVTA)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-FECUSO       ">
                                AS400DataType[] RD_FECUSO = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-FECUSO     ">
                                class IDX_WO_FECUSO {

                                    static final int RD_FECUSO = 0;
                                }
                                AS400DataType[] WO_FECUSO = new AS400DataType[1];
                                WO_FECUSO[IDX_WO_FECUSO.RD_FECUSO] = mapping.Char(8);

                                RD_FECUSO[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_FECUSO)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-CTA       ">
                                AS400DataType[] RD_CTA = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-CTA     ">
                                class IDX_WO_CTA {

                                    static final int RD_CTA = 0;
                                }
                                AS400DataType[] WO_CTA = new AS400DataType[1];
                                WO_CTA[IDX_WO_CTA.RD_CTA] = mapping.Char(29);

                                RD_CTA[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_CTA)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-LIB1       ">
                                AS400DataType[] RD_LIB1 = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-LIB1     ">
                                class IDX_WO_LIB1 {

                                    static final int RD_LIB1 = 0;
                                }
                                AS400DataType[] WO_LIB1 = new AS400DataType[1];
                                WO_LIB1[IDX_WO_LIB1.RD_LIB1] = mapping.Char(2);

                                RD_LIB1[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_LIB1)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-LIB1CIA       ">
                                AS400DataType[] RD_LIB1CIA = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-LIB1CIA     ">
                                class IDX_WO_LIB1CIA {

                                    static final int RD_LIB1CIA = 0;
                                }
                                AS400DataType[] WO_LIB1CIA = new AS400DataType[1];
                                WO_LIB1CIA[IDX_WO_LIB1CIA.RD_LIB1CIA] = mapping.Char(2);

                                RD_LIB1CIA[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_LIB1CIA)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-CLIENT       ">
                                AS400DataType[] RD_CLIENT = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-CLIENT     ">
                                class IDX_WO_CLIENT {

                                    static final int RD_CLIENT = 0;
                                }
                                AS400DataType[] WO_CLIENT = new AS400DataType[1];
                                WO_CLIENT[IDX_WO_CLIENT.RD_CLIENT] = mapping.Char(10);

                                RD_CLIENT[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_CLIENT)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-DIRECC       ">
                                AS400DataType[] RD_DIRECC = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-DIRECC     ">
                                class IDX_WO_DIRECC {

                                    static final int RD_DIRECC = 0;
                                }
                                AS400DataType[] WO_DIRECC = new AS400DataType[1];
                                WO_DIRECC[IDX_WO_DIRECC.RD_DIRECC] = mapping.Char(10);

                                RD_DIRECC[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_DIRECC)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-PROVEE       ">
                                AS400DataType[] RD_PROVEE = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-PROVEE     ">
                                class IDX_WO_PROVEE {

                                    static final int RD_PROVEE = 0;
                                }
                                AS400DataType[] WO_PROVEE = new AS400DataType[1];
                                WO_PROVEE[IDX_WO_PROVEE.RD_PROVEE] = mapping.Char(10);

                                RD_PROVEE[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_PROVEE)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-TD-ORAC       ">
                                AS400DataType[] RD_TD_ORAC = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-TD-ORAC     ">
                                class IDX_WO_TD_ORAC {

                                    static final int RD_TD_ORAC = 0;
                                }
                                AS400DataType[] WO_TD_ORAC = new AS400DataType[1];
                                WO_TD_ORAC[IDX_WO_TD_ORAC.RD_TD_ORAC] = mapping.Char(15);

                                RD_TD_ORAC[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_TD_ORAC)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-COMB       ">
                                AS400DataType[] RD_COMB = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-COMB     ">
                                class IDX_WO_COMB {

                                    static final int RD_COMB = 0;
                                }
                                AS400DataType[] WO_COMB = new AS400DataType[1];
                                WO_COMB[IDX_WO_COMB.RD_COMB] = mapping.Numeric(2, 0, false);

                                RD_COMB[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_COMB)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-TITU       ">
                                AS400DataType[] RD_TITU = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-TITU     ">
                                class IDX_WO_TITU {

                                    static final int RD_TITU = 0;
                                }
                                AS400DataType[] WO_TITU = new AS400DataType[1];
                                WO_TITU[IDX_WO_TITU.RD_TITU] = mapping.Char(30);

                                RD_TITU[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_TITU)), 200);
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}       04 RD-SURC       ">
                                AS400DataType[] RD_SURC = new AS400DataType[1];
                                //</editor-fold>
                                //<editor-fold defaultstate="collapsed" desc="{...}          04 WO-SURC     ">
                                class IDX_WO_SURC {

                                    static final int RD_SURC = 0;
                                }
                                AS400DataType[] WO_SURC = new AS400DataType[1];
                                WO_SURC[IDX_WO_SURC.RD_SURC] = mapping.Char(30);

                                RD_SURC[0] = mapping.Occurs(mapping.Char(mapping.GetDimension(WO_SURC)), 200);
                                //</editor-fold>

                                //<editor-fold defaultstate="collapsed" desc="{...}*DATOS_OUTPUT">
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.REC_ESTADO_10208] = mapping.Char(mapping.GetDimension(REC_ESTADO_10208));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.REC_CODERR_10208] = mapping.Char(mapping.GetDimension(REC_CODERR_10208));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.REC_MSJERR_10208] = mapping.Char(mapping.GetDimension(REC_MSJERR_10208));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_GRUPO] = mapping.Char((mapping.GetDimension(WO_GRUPO) * mapping.getOccursSize(RD_GRUPO[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_FUENT] = mapping.Char((mapping.GetDimension(WO_FUENT) * mapping.getOccursSize(RD_FUENT[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_PSVTA] = mapping.Char((mapping.GetDimension(WO_PSVTA) * mapping.getOccursSize(RD_PSVTA[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_SFUEN] = mapping.Char((mapping.GetDimension(WO_SFUEN) * mapping.getOccursSize(RD_SFUEN[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_TFUEN] = mapping.Char((mapping.GetDimension(WO_TFUEN) * mapping.getOccursSize(RD_TFUEN[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_BANCO] = mapping.Char((mapping.GetDimension(WO_BANCO) * mapping.getOccursSize(RD_BANCO[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_AGENT] = mapping.Char((mapping.GetDimension(WO_AGENT) * mapping.getOccursSize(RD_AGENT[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_CSABR] = mapping.Char((mapping.GetDimension(WO_CSABR) * mapping.getOccursSize(RD_CSABR[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_FPROC] = mapping.Char((mapping.GetDimension(WO_FPROC) * mapping.getOccursSize(RD_FPROC[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_MDALOC] = mapping.Char((mapping.GetDimension(WO_MDALOC) * mapping.getOccursSize(RD_MDALOC[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_TCAMB] = mapping.Char((mapping.GetDimension(WO_TCAMB) * mapping.getOccursSize(RD_TCAMB[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_FECVTA] = mapping.Char((mapping.GetDimension(WO_FECVTA) * mapping.getOccursSize(RD_FECVTA[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_TRNC] = mapping.Char((mapping.GetDimension(WO_TRNC) * mapping.getOccursSize(RD_TRNC[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_TDOC] = mapping.Char((mapping.GetDimension(WO_TDOC) * mapping.getOccursSize(RD_TDOC[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_TFOR] = mapping.Char((mapping.GetDimension(WO_TFOR) * mapping.getOccursSize(RD_TFOR[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_CONP1] = mapping.Char((mapping.GetDimension(WO_CONP1) * mapping.getOccursSize(RD_CONP1[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_CONP2] = mapping.Char((mapping.GetDimension(WO_CONP2) * mapping.getOccursSize(RD_CONP2[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_CONP3] = mapping.Char((mapping.GetDimension(WO_CONP3) * mapping.getOccursSize(RD_CONP3[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_TTARJ] = mapping.Char((mapping.GetDimension(WO_TTARJ) * mapping.getOccursSize(RD_TTARJ[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_NTARJ] = mapping.Char((mapping.GetDimension(WO_NTARJ) * mapping.getOccursSize(RD_NTARJ[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_RFIC] = mapping.Char((mapping.GetDimension(WO_RFIC) * mapping.getOccursSize(RD_RFIC[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_RFIS] = mapping.Char((mapping.GetDimension(WO_RFIS) * mapping.getOccursSize(RD_RFIS[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_DEBLOC] = mapping.Char((mapping.GetDimension(WO_DEBLOC) * mapping.getOccursSize(RD_DEBLOC[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_CRELOC] = mapping.Char((mapping.GetDimension(WO_CRELOC) * mapping.getOccursSize(RD_CRELOC[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_DEBREV] = mapping.Char((mapping.GetDimension(WO_DEBREV) * mapping.getOccursSize(RD_DEBREV[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_CREREV] = mapping.Char((mapping.GetDimension(WO_CREREV) * mapping.getOccursSize(RD_CREREV[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_TASIVA] = mapping.Char((mapping.GetDimension(WO_TASIVA) * mapping.getOccursSize(RD_TASIVA[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_FOPIVA] = mapping.Char((mapping.GetDimension(WO_FOPIVA) * mapping.getOccursSize(RD_FOPIVA[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_FOPEN] = mapping.Char((mapping.GetDimension(WO_FOPEN) * mapping.getOccursSize(RD_FOPEN[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_VRIC] = mapping.Char((mapping.GetDimension(WO_VRIC) * mapping.getOccursSize(RD_VRIC[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_PFC] = mapping.Char((mapping.GetDimension(WO_PFC) * mapping.getOccursSize(RD_PFC[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_PNR] = mapping.Char((mapping.GetDimension(WO_PNR) * mapping.getOccursSize(RD_PNR[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_AGTVTA] = mapping.Char((mapping.GetDimension(WO_AGTVTA) * mapping.getOccursSize(RD_AGTVTA[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_FECUSO] = mapping.Char((mapping.GetDimension(WO_FECUSO) * mapping.getOccursSize(RD_FECUSO[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_CTA] = mapping.Char((mapping.GetDimension(WO_CTA) * mapping.getOccursSize(RD_CTA[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_LIB1] = mapping.Char((mapping.GetDimension(WO_LIB1) * mapping.getOccursSize(RD_LIB1[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_LIB1CIA] = mapping.Char((mapping.GetDimension(WO_LIB1CIA) * mapping.getOccursSize(RD_LIB1CIA[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_CLIENT] = mapping.Char((mapping.GetDimension(WO_CLIENT) * mapping.getOccursSize(RD_CLIENT[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_DIRECC] = mapping.Char((mapping.GetDimension(WO_DIRECC) * mapping.getOccursSize(RD_DIRECC[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_PROVEE] = mapping.Char((mapping.GetDimension(WO_PROVEE) * mapping.getOccursSize(RD_PROVEE[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_TD_ORAC] = mapping.Char((mapping.GetDimension(WO_TD_ORAC) * mapping.getOccursSize(RD_TD_ORAC[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_COMB] = mapping.Char((mapping.GetDimension(WO_COMB) * mapping.getOccursSize(RD_COMB[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_TITU] = mapping.Char((mapping.GetDimension(WO_TITU) * mapping.getOccursSize(RD_TITU[0])));
                                DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_SURC] = mapping.Char((mapping.GetDimension(WO_SURC) * mapping.getOccursSize(RD_SURC[0])));
                                //</editor-fold>
                                REC_DATA_10208[IDX_REC_DATA_10208.DATOS_INPUT] = mapping.Char(mapping.GetDimension(DATOS_INPUT));
                                REC_DATA_10208[IDX_REC_DATA_10208.DATOS_OUTPUT] = mapping.Char(mapping.GetDimension(DATOS_OUTPUT));

                                int dim = mapping.GetDimension(REC_DATA_10208);

                                TRAMA_10208[IDX_TRAMA_10208.TRAMA_10208] = mapping.Char(dim);

                                //<editor-fold defaultstate="collapsed" desc="{...} Structures">
                                AS400Structure structure = new AS400Structure(TRAMA_10208);
                                AS400Structure structure00 = new AS400Structure(REC_DATA_10208);
                                AS400Structure structure01 = new AS400Structure(DATOS_INPUT);
                                AS400Structure structure02 = new AS400Structure(DATOS_OUTPUT);
                                AS400Structure structure03 = new AS400Structure(REC_ESTADO_10208);
                                AS400Structure structure04 = new AS400Structure(REC_CODERR_10208);
                                AS400Structure structure05 = new AS400Structure(REC_MSJERR_10208);
                                AS400Structure structure06 = new AS400Structure(RD_GRUPO);
                                AS400Structure structure07 = new AS400Structure(WO_GRUPO);
                                AS400Structure structure08 = new AS400Structure(RD_FUENT);
                                AS400Structure structure09 = new AS400Structure(WO_FUENT);
                                AS400Structure structure10 = new AS400Structure(RD_PSVTA);
                                AS400Structure structure11 = new AS400Structure(WO_PSVTA);
                                AS400Structure structure12 = new AS400Structure(RD_SFUEN);
                                AS400Structure structure13 = new AS400Structure(WO_SFUEN);
                                AS400Structure structure14 = new AS400Structure(RD_TFUEN);
                                AS400Structure structure15 = new AS400Structure(WO_TFUEN);
                                AS400Structure structure16 = new AS400Structure(RD_BANCO);
                                AS400Structure structure17 = new AS400Structure(WO_BANCO);
                                AS400Structure structure18 = new AS400Structure(RD_AGENT);
                                AS400Structure structure19 = new AS400Structure(WO_AGENT);
                                AS400Structure structure20 = new AS400Structure(RD_CSABR);
                                AS400Structure structure21 = new AS400Structure(WO_CSABR);
                                AS400Structure structure22 = new AS400Structure(RD_FPROC);
                                AS400Structure structure23 = new AS400Structure(WO_FPROC);
                                AS400Structure structure24 = new AS400Structure(RD_MDALOC);
                                AS400Structure structure25 = new AS400Structure(WO_MDALOC);
                                AS400Structure structure26 = new AS400Structure(RD_TCAMB);
                                AS400Structure structure27 = new AS400Structure(WO_TCAMB);
                                AS400Structure structure28 = new AS400Structure(RD_FECVTA);
                                AS400Structure structure29 = new AS400Structure(WO_FECVTA);
                                AS400Structure structure30 = new AS400Structure(RD_TRNC);
                                AS400Structure structure31 = new AS400Structure(WO_TRNC);
                                AS400Structure structure32 = new AS400Structure(RD_TDOC);
                                AS400Structure structure33 = new AS400Structure(WO_TDOC);
                                AS400Structure structure34 = new AS400Structure(RD_TFOR);
                                AS400Structure structure35 = new AS400Structure(WO_TFOR);
                                AS400Structure structure36 = new AS400Structure(RD_CONP1);
                                AS400Structure structure37 = new AS400Structure(WO_CONP1);
                                AS400Structure structure38 = new AS400Structure(RD_CONP2);
                                AS400Structure structure39 = new AS400Structure(WO_CONP2);
                                AS400Structure structure40 = new AS400Structure(RD_CONP3);
                                AS400Structure structure41 = new AS400Structure(WO_CONP3);
                                AS400Structure structure42 = new AS400Structure(RD_TTARJ);
                                AS400Structure structure43 = new AS400Structure(WO_TTARJ);
                                AS400Structure structure44 = new AS400Structure(RD_NTARJ);
                                AS400Structure structure45 = new AS400Structure(WO_NTARJ);
                                AS400Structure structure46 = new AS400Structure(RD_RFIC);
                                AS400Structure structure47 = new AS400Structure(WO_RFIC);
                                AS400Structure structure48 = new AS400Structure(RD_RFIS);
                                AS400Structure structure49 = new AS400Structure(WO_RFIS);
                                AS400Structure structure50 = new AS400Structure(RD_DEBLOC);
                                AS400Structure structure51 = new AS400Structure(WO_DEBLOC);
                                AS400Structure structure52 = new AS400Structure(RD_CRELOC);
                                AS400Structure structure53 = new AS400Structure(WO_CRELOC);
                                AS400Structure structure54 = new AS400Structure(RD_DEBREV);
                                AS400Structure structure55 = new AS400Structure(WO_DEBREV);
                                AS400Structure structure56 = new AS400Structure(RD_CREREV);
                                AS400Structure structure57 = new AS400Structure(WO_CREREV);
                                AS400Structure structure58 = new AS400Structure(RD_TASIVA);
                                AS400Structure structure59 = new AS400Structure(WO_TASIVA);
                                AS400Structure structure60 = new AS400Structure(RD_FOPIVA);
                                AS400Structure structure61 = new AS400Structure(WO_FOPIVA);
                                AS400Structure structure62 = new AS400Structure(RD_FOPEN);
                                AS400Structure structure63 = new AS400Structure(WO_FOPEN);
                                AS400Structure structure64 = new AS400Structure(RD_VRIC);
                                AS400Structure structure65 = new AS400Structure(WO_VRIC);
                                AS400Structure structure66 = new AS400Structure(RD_PFC);
                                AS400Structure structure67 = new AS400Structure(WO_PFC);
                                AS400Structure structure68 = new AS400Structure(RD_PNR);
                                AS400Structure structure69 = new AS400Structure(WO_PNR);
                                AS400Structure structure70 = new AS400Structure(RD_AGTVTA);
                                AS400Structure structure71 = new AS400Structure(WO_AGTVTA);
                                AS400Structure structure72 = new AS400Structure(RD_FECUSO);
                                AS400Structure structure73 = new AS400Structure(WO_FECUSO);
                                AS400Structure structure74 = new AS400Structure(RD_CTA);
                                AS400Structure structure75 = new AS400Structure(WO_CTA);
                                AS400Structure structure76 = new AS400Structure(RD_LIB1);
                                AS400Structure structure77 = new AS400Structure(WO_LIB1);
                                AS400Structure structure78 = new AS400Structure(RD_LIB1CIA);
                                AS400Structure structure79 = new AS400Structure(WO_LIB1CIA);
                                AS400Structure structure80 = new AS400Structure(RD_CLIENT);
                                AS400Structure structure81 = new AS400Structure(WO_CLIENT);
                                AS400Structure structure82 = new AS400Structure(RD_DIRECC);
                                AS400Structure structure83 = new AS400Structure(WO_DIRECC);
                                AS400Structure structure84 = new AS400Structure(RD_PROVEE);
                                AS400Structure structure85 = new AS400Structure(WO_PROVEE);
                                AS400Structure structure86 = new AS400Structure(RD_TD_ORAC);
                                AS400Structure structure87 = new AS400Structure(WO_TD_ORAC);
                                AS400Structure structure88 = new AS400Structure(RD_COMB);
                                AS400Structure structure89 = new AS400Structure(WO_COMB);
                                AS400Structure structure90 = new AS400Structure(RD_TITU);
                                AS400Structure structure91 = new AS400Structure(WO_TITU);
                                AS400Structure structure92 = new AS400Structure(RD_SURC);
                                AS400Structure structure93 = new AS400Structure(WO_SURC);
                                //</editor-fold>
                                //</editor-fold>

                                ProgramParameter[] parameterList = new ProgramParameter[2];
                                parameterList[0] = new ProgramParameter(TRAMA_10208_IN[IDX_TRAMA_10208_IN.TRAMA_10208_IN].toBytes(rs01.getString("PRE_CONTA")));
                                parameterList[1] = new ProgramParameter(dim);

                                program.setProgram(programName, parameterList);

                                if (program.run() != true) {
                                    System.out.println("Program failed!");
                                    AS400Message[] messagelist = program.getMessageList();
                                    for (int i = 0; i < messagelist.length; ++i) {
                                        System.out.println(messagelist[i]);
                                    }
                                } else {
                                    byte[] receiverVar = parameterList[1].getOutputData();
                                    //<editor-fold defaultstate="collapsed" desc="{...} Load Trama">
                                    Object[] N_TRAMA_10208 = (Object[]) structure.toObject(receiverVar, 0);
                                    Object[] N01_REC_DATA_10208 = (Object[]) structure00.toObject(TRAMA_10208[0].toBytes(N_TRAMA_10208[0]), 0);
                                    Object[] N03_DATOS_INPUT = (Object[]) structure01.toObject(REC_DATA_10208[0].toBytes(N01_REC_DATA_10208[0]), 0);
                                    Object[] N03_DATOS_OUTPUT = (Object[]) structure02.toObject(REC_DATA_10208[1].toBytes(N01_REC_DATA_10208[1]), 0);
                                    Object[] N04_REC_ESTADO_10208 = (Object[]) structure03.toObject(REC_ESTADO_10208[0].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.REC_ESTADO_10208]), 0);
                                    Object[] N04_REC_CODERR_10208 = (Object[]) structure04.toObject(REC_CODERR_10208[0].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.REC_CODERR_10208]), 0);
                                    Object[] N04_REC_MSJERR_10208 = (Object[]) structure05.toObject(REC_MSJERR_10208[0].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.REC_MSJERR_10208]), 0);

                                    Object[] N04_RD_GRUPO = (Object[]) ((Object[]) structure06.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_GRUPO].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_GRUPO]), 0))[0];
                                    List<Object[]> N04_WO_GRUPO = new ArrayList<Object[]>(N04_RD_GRUPO.length);
                                    for (Object N04_RD_GRUPO1 : N04_RD_GRUPO) {
                                        N04_WO_GRUPO.add((Object[]) structure07.toObject(mapping.Char(mapping.GetDimension(WO_GRUPO)).toBytes(N04_RD_GRUPO1), 0));
                                    }
                                    Object[] N04_RD_FUENT = (Object[]) ((Object[]) structure08.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_FUENT].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_FUENT]), 0))[0];
                                    List<Object[]> N04_WO_FUENT = new ArrayList<Object[]>(N04_RD_FUENT.length);
                                    for (Object N04_RD_FUENT1 : N04_RD_FUENT) {
                                        N04_WO_FUENT.add((Object[]) structure09.toObject(mapping.Char(mapping.GetDimension(WO_FUENT)).toBytes(N04_RD_FUENT1), 0));
                                    }
                                    Object[] N04_RD_PSVTA = (Object[]) ((Object[]) structure10.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_PSVTA].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_PSVTA]), 0))[0];
                                    List<Object[]> N04_WO_PSVTA = new ArrayList<Object[]>(N04_RD_PSVTA.length);
                                    for (Object N04_RD_PSVTA1 : N04_RD_PSVTA) {
                                        N04_WO_PSVTA.add((Object[]) structure11.toObject(mapping.Char(mapping.GetDimension(WO_PSVTA)).toBytes(N04_RD_PSVTA1), 0));
                                    }
                                    Object[] N04_RD_SFUEN = (Object[]) ((Object[]) structure12.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_SFUEN].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_SFUEN]), 0))[0];
                                    List<Object[]> N04_WO_SFUEN = new ArrayList<Object[]>(N04_RD_SFUEN.length);
                                    for (Object N04_RD_SFUEN1 : N04_RD_SFUEN) {
                                        N04_WO_SFUEN.add((Object[]) structure13.toObject(mapping.Char(mapping.GetDimension(WO_SFUEN)).toBytes(N04_RD_SFUEN1), 0));
                                    }
                                    Object[] N04_RD_TFUEN = (Object[]) ((Object[]) structure14.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_TFUEN].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_TFUEN]), 0))[0];
                                    List<Object[]> N04_WO_TFUEN = new ArrayList<Object[]>(N04_RD_TFUEN.length);
                                    for (Object N04_RD_TFUEN1 : N04_RD_TFUEN) {
                                        N04_WO_TFUEN.add((Object[]) structure15.toObject(mapping.Char(mapping.GetDimension(WO_TFUEN)).toBytes(N04_RD_TFUEN1), 0));
                                    }
                                    Object[] N04_RD_BANCO = (Object[]) ((Object[]) structure16.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_BANCO].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_BANCO]), 0))[0];
                                    List<Object[]> N04_WO_BANCO = new ArrayList<Object[]>(N04_RD_BANCO.length);
                                    for (Object N04_RD_BANCO1 : N04_RD_BANCO) {
                                        N04_WO_BANCO.add((Object[]) structure17.toObject(mapping.Char(mapping.GetDimension(WO_BANCO)).toBytes(N04_RD_BANCO1), 0));
                                    }
                                    Object[] N04_RD_AGENT = (Object[]) ((Object[]) structure18.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_AGENT].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_AGENT]), 0))[0];
                                    List<Object[]> N04_WO_AGENT = new ArrayList<Object[]>(N04_RD_AGENT.length);
                                    for (Object N04_RD_AGENT1 : N04_RD_AGENT) {
                                        N04_WO_AGENT.add((Object[]) structure19.toObject(mapping.Char(mapping.GetDimension(WO_AGENT)).toBytes(N04_RD_AGENT1), 0));
                                    }
                                    Object[] N04_RD_CSABR = (Object[]) ((Object[]) structure20.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_CSABR].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_CSABR]), 0))[0];
                                    List<Object[]> N04_WO_CSABR = new ArrayList<Object[]>(N04_RD_CSABR.length);
                                    for (Object N04_RD_CSABR1 : N04_RD_CSABR) {
                                        N04_WO_CSABR.add((Object[]) structure21.toObject(mapping.Char(mapping.GetDimension(WO_CSABR)).toBytes(N04_RD_CSABR1), 0));
                                    }
                                    Object[] N04_RD_FPROC = (Object[]) ((Object[]) structure22.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_FPROC].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_FPROC]), 0))[0];
                                    List<Object[]> N04_WO_FPROC = new ArrayList<Object[]>(N04_RD_FPROC.length);
                                    for (Object N04_RD_FPROC1 : N04_RD_FPROC) {
                                        N04_WO_FPROC.add((Object[]) structure23.toObject(mapping.Char(mapping.GetDimension(WO_FPROC)).toBytes(N04_RD_FPROC1), 0));
                                    }
                                    Object[] N04_RD_MDALOC = (Object[]) ((Object[]) structure24.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_MDALOC].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_MDALOC]), 0))[0];
                                    List<Object[]> N04_WO_MDALOC = new ArrayList<Object[]>(N04_RD_MDALOC.length);
                                    for (Object N04_RD_MDALOC1 : N04_RD_MDALOC) {
                                        N04_WO_MDALOC.add((Object[]) structure25.toObject(mapping.Char(mapping.GetDimension(WO_MDALOC)).toBytes(N04_RD_MDALOC1), 0));
                                    }
                                    Object[] N04_RD_TCAMB = (Object[]) ((Object[]) structure26.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_TCAMB].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_TCAMB]), 0))[0];
                                    List<Object[]> N04_WO_TCAMB = new ArrayList<Object[]>(N04_RD_TCAMB.length);
                                    for (Object N04_RD_TCAMB1 : N04_RD_TCAMB) {
                                        N04_WO_TCAMB.add((Object[]) structure27.toObject(mapping.Char(mapping.GetDimension(WO_TCAMB)).toBytes(N04_RD_TCAMB1), 0));
                                    }
                                    Object[] N04_RD_FECVTA = (Object[]) ((Object[]) structure28.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_FECVTA].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_FECVTA]), 0))[0];
                                    List<Object[]> N04_WO_FECVTA = new ArrayList<Object[]>(N04_RD_FECVTA.length);
                                    for (Object N04_RD_FECVTA1 : N04_RD_FECVTA) {
                                        N04_WO_FECVTA.add((Object[]) structure29.toObject(mapping.Char(mapping.GetDimension(WO_FECVTA)).toBytes(N04_RD_FECVTA1), 0));
                                    }
                                    Object[] N04_RD_TRNC = (Object[]) ((Object[]) structure30.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_TRNC].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_TRNC]), 0))[0];
                                    List<Object[]> N04_WO_TRNC = new ArrayList<Object[]>(N04_RD_TRNC.length);
                                    for (Object N04_RD_TRNC1 : N04_RD_TRNC) {
                                        N04_WO_TRNC.add((Object[]) structure31.toObject(mapping.Char(mapping.GetDimension(WO_TRNC)).toBytes(N04_RD_TRNC1), 0));
                                    }
                                    Object[] N04_RD_TDOC = (Object[]) ((Object[]) structure32.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_TDOC].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_TDOC]), 0))[0];
                                    List<Object[]> N04_WO_TDOC = new ArrayList<Object[]>(N04_RD_TDOC.length);
                                    for (Object N04_RD_TDOC1 : N04_RD_TDOC) {
                                        N04_WO_TDOC.add((Object[]) structure33.toObject(mapping.Char(mapping.GetDimension(WO_TDOC)).toBytes(N04_RD_TDOC1), 0));
                                    }
                                    Object[] N04_RD_TFOR = (Object[]) ((Object[]) structure34.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_TFOR].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_TFOR]), 0))[0];
                                    List<Object[]> N04_WO_TFOR = new ArrayList<Object[]>(N04_RD_TFOR.length);
                                    for (Object N04_RD_TFOR1 : N04_RD_TFOR) {
                                        N04_WO_TFOR.add((Object[]) structure35.toObject(mapping.Char(mapping.GetDimension(WO_TFOR)).toBytes(N04_RD_TFOR1), 0));
                                    }
                                    Object[] N04_RD_CONP1 = (Object[]) ((Object[]) structure36.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_CONP1].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_CONP1]), 0))[0];
                                    List<Object[]> N04_WO_CONP1 = new ArrayList<Object[]>(N04_RD_CONP1.length);
                                    for (Object N04_RD_CONP11 : N04_RD_CONP1) {
                                        N04_WO_CONP1.add((Object[]) structure37.toObject(mapping.Char(mapping.GetDimension(WO_CONP1)).toBytes(N04_RD_CONP11), 0));
                                    }
                                    Object[] N04_RD_CONP2 = (Object[]) ((Object[]) structure38.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_CONP2].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_CONP2]), 0))[0];
                                    List<Object[]> N04_WO_CONP2 = new ArrayList<Object[]>(N04_RD_CONP2.length);
                                    for (Object N04_RD_CONP21 : N04_RD_CONP2) {
                                        N04_WO_CONP2.add((Object[]) structure39.toObject(mapping.Char(mapping.GetDimension(WO_CONP2)).toBytes(N04_RD_CONP21), 0));
                                    }
                                    Object[] N04_RD_CONP3 = (Object[]) ((Object[]) structure40.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_CONP3].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_CONP3]), 0))[0];
                                    List<Object[]> N04_WO_CONP3 = new ArrayList<Object[]>(N04_RD_CONP3.length);
                                    for (Object N04_RD_CONP31 : N04_RD_CONP3) {
                                        N04_WO_CONP3.add((Object[]) structure41.toObject(mapping.Char(mapping.GetDimension(WO_CONP3)).toBytes(N04_RD_CONP31), 0));
                                    }
                                    Object[] N04_RD_TTARJ = (Object[]) ((Object[]) structure42.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_TTARJ].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_TTARJ]), 0))[0];
                                    List<Object[]> N04_WO_TTARJ = new ArrayList<Object[]>(N04_RD_TTARJ.length);
                                    for (Object N04_RD_TTARJ1 : N04_RD_TTARJ) {
                                        N04_WO_TTARJ.add((Object[]) structure43.toObject(mapping.Char(mapping.GetDimension(WO_TTARJ)).toBytes(N04_RD_TTARJ1), 0));
                                    }
                                    Object[] N04_RD_NTARJ = (Object[]) ((Object[]) structure44.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_NTARJ].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_NTARJ]), 0))[0];
                                    List<Object[]> N04_WO_NTARJ = new ArrayList<Object[]>(N04_RD_NTARJ.length);
                                    for (Object N04_RD_NTARJ1 : N04_RD_NTARJ) {
                                        N04_WO_NTARJ.add((Object[]) structure45.toObject(mapping.Char(mapping.GetDimension(WO_NTARJ)).toBytes(N04_RD_NTARJ1), 0));
                                    }
                                    Object[] N04_RD_RFIC = (Object[]) ((Object[]) structure46.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_RFIC].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_RFIC]), 0))[0];
                                    List<Object[]> N04_WO_RFIC = new ArrayList<Object[]>(N04_RD_RFIC.length);
                                    for (Object N04_RD_RFIC1 : N04_RD_RFIC) {
                                        N04_WO_RFIC.add((Object[]) structure47.toObject(mapping.Char(mapping.GetDimension(WO_RFIC)).toBytes(N04_RD_RFIC1), 0));
                                    }
                                    Object[] N04_RD_RFIS = (Object[]) ((Object[]) structure48.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_RFIS].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_RFIS]), 0))[0];
                                    List<Object[]> N04_WO_RFIS = new ArrayList<Object[]>(N04_RD_RFIS.length);
                                    for (Object N04_RD_RFIS1 : N04_RD_RFIS) {
                                        N04_WO_RFIS.add((Object[]) structure49.toObject(mapping.Char(mapping.GetDimension(WO_RFIS)).toBytes(N04_RD_RFIS1), 0));
                                    }
                                    Object[] N04_RD_DEBLOC = (Object[]) ((Object[]) structure50.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_DEBLOC].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_DEBLOC]), 0))[0];
                                    List<Object[]> N04_WO_DEBLOC = new ArrayList<Object[]>(N04_RD_DEBLOC.length);
                                    for (Object N04_RD_DEBLOC1 : N04_RD_DEBLOC) {
                                        N04_WO_DEBLOC.add((Object[]) structure51.toObject(mapping.Char(mapping.GetDimension(WO_DEBLOC)).toBytes(N04_RD_DEBLOC1), 0));
                                    }
                                    Object[] N04_RD_CRELOC = (Object[]) ((Object[]) structure52.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_CRELOC].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_CRELOC]), 0))[0];
                                    List<Object[]> N04_WO_CRELOC = new ArrayList<Object[]>(N04_RD_CRELOC.length);
                                    for (Object N04_RD_CRELOC1 : N04_RD_CRELOC) {
                                        N04_WO_CRELOC.add((Object[]) structure53.toObject(mapping.Char(mapping.GetDimension(WO_CRELOC)).toBytes(N04_RD_CRELOC1), 0));
                                    }
                                    Object[] N04_RD_DEBREV = (Object[]) ((Object[]) structure54.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_DEBREV].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_DEBREV]), 0))[0];
                                    List<Object[]> N04_WO_DEBREV = new ArrayList<Object[]>(N04_RD_DEBREV.length);
                                    for (Object N04_RD_DEBREV1 : N04_RD_DEBREV) {
                                        N04_WO_DEBREV.add((Object[]) structure55.toObject(mapping.Char(mapping.GetDimension(WO_DEBREV)).toBytes(N04_RD_DEBREV1), 0));
                                    }
                                    Object[] N04_RD_CREREV = (Object[]) ((Object[]) structure56.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_CREREV].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_CREREV]), 0))[0];
                                    List<Object[]> N04_WO_CREREV = new ArrayList<Object[]>(N04_RD_CREREV.length);
                                    for (Object N04_RD_CREREV1 : N04_RD_CREREV) {
                                        N04_WO_CREREV.add((Object[]) structure57.toObject(mapping.Char(mapping.GetDimension(WO_CREREV)).toBytes(N04_RD_CREREV1), 0));
                                    }
                                    Object[] N04_RD_TASIVA = (Object[]) ((Object[]) structure58.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_TASIVA].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_TASIVA]), 0))[0];
                                    List<Object[]> N04_WO_TASIVA = new ArrayList<Object[]>(N04_RD_TASIVA.length);
                                    for (Object N04_RD_TASIVA1 : N04_RD_TASIVA) {
                                        N04_WO_TASIVA.add((Object[]) structure59.toObject(mapping.Char(mapping.GetDimension(WO_TASIVA)).toBytes(N04_RD_TASIVA1), 0));
                                    }
                                    Object[] N04_RD_FOPIVA = (Object[]) ((Object[]) structure60.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_FOPIVA].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_FOPIVA]), 0))[0];
                                    List<Object[]> N04_WO_FOPIVA = new ArrayList<Object[]>(N04_RD_FOPIVA.length);
                                    for (Object N04_RD_FOPIVA1 : N04_RD_FOPIVA) {
                                        N04_WO_FOPIVA.add((Object[]) structure61.toObject(mapping.Char(mapping.GetDimension(WO_FOPIVA)).toBytes(N04_RD_FOPIVA1), 0));
                                    }
                                    Object[] N04_RD_FOPEN = (Object[]) ((Object[]) structure62.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_FOPEN].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_FOPEN]), 0))[0];
                                    List<Object[]> N04_WO_FOPEN = new ArrayList<Object[]>(N04_RD_FOPEN.length);
                                    for (Object N04_RD_FOPEN1 : N04_RD_FOPEN) {
                                        N04_WO_FOPEN.add((Object[]) structure63.toObject(mapping.Char(mapping.GetDimension(WO_FOPEN)).toBytes(N04_RD_FOPEN1), 0));
                                    }
                                    Object[] N04_RD_VRIC = (Object[]) ((Object[]) structure64.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_VRIC].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_VRIC]), 0))[0];
                                    List<Object[]> N04_WO_VRIC = new ArrayList<Object[]>(N04_RD_VRIC.length);
                                    for (Object N04_RD_VRIC1 : N04_RD_VRIC) {
                                        N04_WO_VRIC.add((Object[]) structure65.toObject(mapping.Char(mapping.GetDimension(WO_VRIC)).toBytes(N04_RD_VRIC1), 0));
                                    }
                                    Object[] N04_RD_PFC = (Object[]) ((Object[]) structure66.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_PFC].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_PFC]), 0))[0];
                                    List<Object[]> N04_WO_PFC = new ArrayList<Object[]>(N04_RD_PFC.length);
                                    for (Object N04_RD_PFC1 : N04_RD_PFC) {
                                        N04_WO_PFC.add((Object[]) structure67.toObject(mapping.Char(mapping.GetDimension(WO_PFC)).toBytes(N04_RD_PFC1), 0));
                                    }
                                    Object[] N04_RD_PNR = (Object[]) ((Object[]) structure68.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_PNR].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_PNR]), 0))[0];
                                    List<Object[]> N04_WO_PNR = new ArrayList<Object[]>(N04_RD_PNR.length);
                                    for (Object N04_RD_PNR1 : N04_RD_PNR) {
                                        N04_WO_PNR.add((Object[]) structure69.toObject(mapping.Char(mapping.GetDimension(WO_PNR)).toBytes(N04_RD_PNR1), 0));
                                    }
                                    Object[] N04_RD_AGTVTA = (Object[]) ((Object[]) structure70.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_AGTVTA].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_AGTVTA]), 0))[0];
                                    List<Object[]> N04_WO_AGTVTA = new ArrayList<Object[]>(N04_RD_AGTVTA.length);
                                    for (Object N04_RD_AGTVTA1 : N04_RD_AGTVTA) {
                                        N04_WO_AGTVTA.add((Object[]) structure71.toObject(mapping.Char(mapping.GetDimension(WO_AGTVTA)).toBytes(N04_RD_AGTVTA1), 0));
                                    }
                                    Object[] N04_RD_FECUSO = (Object[]) ((Object[]) structure72.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_FECUSO].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_FECUSO]), 0))[0];
                                    List<Object[]> N04_WO_FECUSO = new ArrayList<Object[]>(N04_RD_FECUSO.length);
                                    for (Object N04_RD_FECUSO1 : N04_RD_FECUSO) {
                                        N04_WO_FECUSO.add((Object[]) structure73.toObject(mapping.Char(mapping.GetDimension(WO_FECUSO)).toBytes(N04_RD_FECUSO1), 0));
                                    }
                                    Object[] N04_RD_CTA = (Object[]) ((Object[]) structure74.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_CTA].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_CTA]), 0))[0];
                                    List<Object[]> N04_WO_CTA = new ArrayList<Object[]>(N04_RD_CTA.length);
                                    for (Object N04_RD_CTA1 : N04_RD_CTA) {
                                        N04_WO_CTA.add((Object[]) structure75.toObject(mapping.Char(mapping.GetDimension(WO_CTA)).toBytes(N04_RD_CTA1), 0));
                                    }
                                    Object[] N04_RD_LIB1 = (Object[]) ((Object[]) structure76.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_LIB1].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_LIB1]), 0))[0];
                                    List<Object[]> N04_WO_LIB1 = new ArrayList<Object[]>(N04_RD_LIB1.length);
                                    for (Object N04_RD_LIB11 : N04_RD_LIB1) {
                                        N04_WO_LIB1.add((Object[]) structure77.toObject(mapping.Char(mapping.GetDimension(WO_LIB1)).toBytes(N04_RD_LIB11), 0));
                                    }
                                    Object[] N04_RD_LIB1CIA = (Object[]) ((Object[]) structure78.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_LIB1CIA].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_LIB1CIA]), 0))[0];
                                    List<Object[]> N04_WO_LIB1CIA = new ArrayList<Object[]>(N04_RD_LIB1CIA.length);
                                    for (Object N04_RD_LIB1CIA1 : N04_RD_LIB1CIA) {
                                        N04_WO_LIB1CIA.add((Object[]) structure79.toObject(mapping.Char(mapping.GetDimension(WO_LIB1CIA)).toBytes(N04_RD_LIB1CIA1), 0));
                                    }
                                    Object[] N04_RD_CLIENT = (Object[]) ((Object[]) structure80.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_CLIENT].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_CLIENT]), 0))[0];
                                    List<Object[]> N04_WO_CLIENT = new ArrayList<Object[]>(N04_RD_CLIENT.length);
                                    for (Object N04_RD_CLIENT1 : N04_RD_CLIENT) {
                                        N04_WO_CLIENT.add((Object[]) structure81.toObject(mapping.Char(mapping.GetDimension(WO_CLIENT)).toBytes(N04_RD_CLIENT1), 0));
                                    }
                                    Object[] N04_RD_DIRECC = (Object[]) ((Object[]) structure82.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_DIRECC].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_DIRECC]), 0))[0];
                                    List<Object[]> N04_WO_DIRECC = new ArrayList<Object[]>(N04_RD_DIRECC.length);
                                    for (Object N04_RD_DIRECC1 : N04_RD_DIRECC) {
                                        N04_WO_DIRECC.add((Object[]) structure83.toObject(mapping.Char(mapping.GetDimension(WO_DIRECC)).toBytes(N04_RD_DIRECC1), 0));
                                    }
                                    Object[] N04_RD_PROVEE = (Object[]) ((Object[]) structure84.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_PROVEE].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_PROVEE]), 0))[0];
                                    List<Object[]> N04_WO_PROVEE = new ArrayList<Object[]>(N04_RD_PROVEE.length);
                                    for (Object N04_RD_PROVEE1 : N04_RD_PROVEE) {
                                        N04_WO_PROVEE.add((Object[]) structure85.toObject(mapping.Char(mapping.GetDimension(WO_PROVEE)).toBytes(N04_RD_PROVEE1), 0));
                                    }
                                    Object[] N04_RD_TD_ORAC = (Object[]) ((Object[]) structure86.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_TD_ORAC].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_TD_ORAC]), 0))[0];
                                    List<Object[]> N04_WO_TD_ORAC = new ArrayList<Object[]>(N04_RD_TD_ORAC.length);
                                    for (Object N04_RD_TD_ORAC1 : N04_RD_TD_ORAC) {
                                        N04_WO_TD_ORAC.add((Object[]) structure87.toObject(mapping.Char(mapping.GetDimension(WO_TD_ORAC)).toBytes(N04_RD_TD_ORAC1), 0));
                                    }
                                    Object[] N04_RD_COMB = (Object[]) ((Object[]) structure88.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_COMB].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_COMB]), 0))[0];
                                    List<Object[]> N04_WO_COMB = new ArrayList<Object[]>(N04_RD_COMB.length);
                                    for (Object N04_RD_COMB1 : N04_RD_COMB) {
                                        N04_WO_COMB.add((Object[]) structure89.toObject(mapping.Char(mapping.GetDimension(WO_COMB)).toBytes(N04_RD_COMB1), 0));
                                    }
                                    Object[] N04_RD_TITU = (Object[]) ((Object[]) structure90.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_TITU].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_TITU]), 0))[0];
                                    List<Object[]> N04_WO_TITU = new ArrayList<Object[]>(N04_RD_TITU.length);
                                    for (Object N04_RD_TITU1 : N04_RD_TITU) {
                                        N04_WO_TITU.add((Object[]) structure91.toObject(mapping.Char(mapping.GetDimension(WO_TITU)).toBytes(N04_RD_TITU1), 0));
                                    }
                                    Object[] N04_RD_SURC = (Object[]) ((Object[]) structure92.toObject(DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_SURC].toBytes(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.RD_SURC]), 0))[0];
                                    List<Object[]> N04_WO_SURC = new ArrayList<Object[]>(N04_RD_SURC.length);
                                    for (Object N04_RD_SURC1 : N04_RD_SURC) {
                                        N04_WO_SURC.add((Object[]) structure93.toObject(mapping.Char(mapping.GetDimension(WO_SURC)).toBytes(N04_RD_SURC1), 0));
                                    }
                                    //</editor-fold>
                                    for (int i = 0; i < N04_RD_GRUPO.length; i++) {
                                        System.out.println(i);
                                        if (i == 199) {//ZENOBIO 89
                                            i = i;
                                        } else {
                                            System.out.println(i);
                                        }
                                        if (mapping.getString(N04_WO_GRUPO.get(i)[IDX_WO_GRUPO.RD_GRUPO]).trim().length() > 0) {
                                            objRtn = new PX0241S01A720Filter();
                                            //<editor-fold defaultstate="collapsed" desc="{...}">
                                            objRtn.TKT = mapping.getString(N03_DATOS_INPUT[IDX_DATOS_INPUT.REC_CIA_10208]) + mapping.getString(N03_DATOS_INPUT[IDX_DATOS_INPUT.REC_FORMA_10208]) + mapping.getString(N03_DATOS_INPUT[IDX_DATOS_INPUT.REC_SERIE_10208]);
                                            objRtn.SEQ = mapping.getString(N03_DATOS_INPUT[IDX_DATOS_INPUT.REC_SEQ_10208]);
                                            objRtn.STATUS = rs01.getString("STATUS");
                                            objRtn.ERROR = mapping.getString(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.REC_ESTADO_10208]);
                                            objRtn.CODERROR = mapping.getString(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.REC_CODERR_10208]);
                                            objRtn.MENSAJE = mapping.getString(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.REC_MSJERR_10208]);
                                            objRtn.GRUPO = mapping.getString(N04_WO_GRUPO.get(i)[IDX_WO_GRUPO.RD_GRUPO]);
                                            objRtn.FUENTE = mapping.getString(N04_WO_FUENT.get(i)[IDX_WO_FUENT.RD_FUENT]);
                                            objRtn.PAIS = mapping.getString(N04_WO_PSVTA.get(i)[IDX_WO_PSVTA.RD_PSVTA]);
                                            objRtn.SUBFUENTE = mapping.getString(N04_WO_SFUEN.get(i)[IDX_WO_SFUEN.RD_SFUEN]);
                                            objRtn.TFUENTE = mapping.getString(N04_WO_TFUEN.get(i)[IDX_WO_TFUEN.RD_TFUEN]);
                                            objRtn.BANCO = mapping.getString(N04_WO_BANCO.get(i)[IDX_WO_BANCO.RD_BANCO]);
                                            objRtn.IATA = mapping.getString(N04_WO_AGENT.get(i)[IDX_WO_AGENT.RD_AGENT]);
                                            objRtn.CSABRE = mapping.getString(N04_WO_CSABR.get(i)[IDX_WO_CSABR.RD_CSABR]);
                                            objRtn.FECHARPT = mapping.getString(N04_WO_FPROC.get(i)[IDX_WO_FPROC.RD_FPROC]);
                                            objRtn.MONEDA = mapping.getString(N04_WO_MDALOC.get(i)[IDX_WO_MDALOC.RD_MDALOC]);
                                            objRtn.TCAMB = Double.toString(mapping.getDouble(N04_WO_TCAMB.get(i)[IDX_WO_TCAMB.RD_TCAMB]));
                                            objRtn.FECVTA = mapping.getString(N04_WO_FECVTA.get(i)[IDX_WO_FECVTA.RD_FECVTA]);
                                            objRtn.TRANSACTION = mapping.getString(N04_WO_TRNC.get(i)[IDX_WO_TRNC.RD_TRNC]);
                                            objRtn.TDOC = mapping.getString(N04_WO_TDOC.get(i)[IDX_WO_TDOC.RD_TDOC]);
                                            objRtn.TFOR = mapping.getString(N04_WO_TFOR.get(i)[IDX_WO_TFOR.RD_TFOR]);
                                            objRtn.CONCEPT1 = mapping.getString(N04_WO_CONP1.get(i)[IDX_WO_CONP1.RD_CONP1]);
                                            objRtn.CONCEPT2 = mapping.getString(N04_WO_CONP2.get(i)[IDX_WO_CONP2.RD_CONP2]);
                                            objRtn.CONCEPT3 = mapping.getString(N04_WO_CONP3.get(i)[IDX_WO_CONP3.RD_CONP3]);
                                            objRtn.TTARJ = mapping.getString(N04_WO_TTARJ.get(i)[IDX_WO_TTARJ.RD_TTARJ]);
                                            objRtn.NTARJ = mapping.getString(N04_WO_NTARJ.get(i)[IDX_WO_NTARJ.RD_NTARJ]);
                                            objRtn.RFIC = mapping.getString(N04_WO_RFIC.get(i)[IDX_WO_RFIC.RD_RFIC]);
                                            objRtn.RFIS = mapping.getString(N04_WO_RFIS.get(i)[IDX_WO_RFIS.RD_RFIS]);
                                            objRtn.DEBITO = Double.toString(mapping.getDouble(N04_WO_DEBLOC.get(i)[IDX_WO_DEBLOC.RD_DEBLOC]));
                                            if (Double.parseDouble(objRtn.DEBITO) == 0d) {
                                                objRtn.DEBITO = "";
                                            }
                                            objRtn.CREDITO = Double.toString(mapping.getDouble(N04_WO_CRELOC.get(i)[IDX_WO_CRELOC.RD_CRELOC]));
                                            if (Double.parseDouble(objRtn.CREDITO) == 0d) {
                                                objRtn.CREDITO = "";
                                            }
                                            objRtn.DEBITORV = Double.toString(mapping.getDouble(N04_WO_DEBREV.get(i)[IDX_WO_DEBREV.RD_DEBREV]));
                                            if (Double.parseDouble(objRtn.DEBITORV) == 0d) {
                                                objRtn.DEBITORV = "";
                                            }
                                            objRtn.CREDITORV = Double.toString(mapping.getDouble(N04_WO_CREREV.get(i)[IDX_WO_CREREV.RD_CREREV]));
                                            if (Double.parseDouble(objRtn.CREDITORV) == 0d) {
                                                objRtn.CREDITORV = "";
                                            }
                                            objRtn.TASA = mapping.getString(N04_WO_TASIVA.get(i)[IDX_WO_TASIVA.RD_TASIVA]);
                                            objRtn.FOP_IVA = mapping.getString(N04_WO_FOPIVA.get(i)[IDX_WO_FOPIVA.RD_FOPIVA]);
                                            objRtn.FOPEN = mapping.getString(N04_WO_FOPEN.get(i)[IDX_WO_FOPEN.RD_FOPEN]);
                                            objRtn.VRIC = mapping.getString(N04_WO_VRIC.get(i)[IDX_WO_VRIC.RD_VRIC]);
                                            objRtn.PFC = mapping.getString(N04_WO_PFC.get(i)[IDX_WO_PFC.RD_PFC]);
                                            objRtn.PNR = mapping.getString(N04_WO_PNR.get(i)[IDX_WO_PNR.RD_PNR]);
                                            objRtn.IATAVTA = mapping.getString(N04_WO_AGTVTA.get(i)[IDX_WO_AGTVTA.RD_AGTVTA]);
                                            objRtn.FECUSO = mapping.getString(N04_WO_FECUSO.get(i)[IDX_WO_FECUSO.RD_FECUSO]);
                                            objRtn.CTA = mapping.getString(N04_WO_CTA.get(i)[IDX_WO_CTA.RD_CTA]);
                                            objRtn.LIB1 = mapping.getString(N04_WO_LIB1.get(i)[IDX_WO_LIB1.RD_LIB1]);
                                            objRtn.CIA1 = mapping.getString(N04_WO_LIB1CIA.get(i)[IDX_WO_LIB1CIA.RD_LIB1CIA]);
                                            objRtn.CLIENTE = mapping.getString(N04_WO_CLIENT.get(i)[IDX_WO_CLIENT.RD_CLIENT]);
                                            objRtn.DIRECCION = mapping.getString(N04_WO_DIRECC.get(i)[IDX_WO_DIRECC.RD_DIRECC]);
                                            objRtn.PROVEEDOR = mapping.getString(N04_WO_PROVEE.get(i)[IDX_WO_PROVEE.RD_PROVEE]);
                                            objRtn.TD_ORACLE = mapping.getString(N04_WO_TD_ORAC.get(i)[IDX_WO_TD_ORAC.RD_TD_ORAC]);
                                            objRtn.COMB = Integer.toString(mapping.getInt(N04_WO_COMB.get(i)[IDX_WO_COMB.RD_COMB]));
                                            objRtn.TITULO = mapping.getString(N04_WO_TITU.get(i)[IDX_WO_TITU.RD_TITU]);
                                            objRtn.SUCURSAL = mapping.getString(N04_WO_SURC.get(i)[IDX_WO_SURC.RD_SURC]);
                                            //</editor-fold>
                                            lstRtn.add(objRtn);
                                        } else {
                                            /*objRtn = new PX0241S01A720Filter();
                                            objRtn.ERROR = mapping.getString(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.REC_ESTADO_10208]);
                                            objRtn.CODERROR = mapping.getString(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.REC_CODERR_10208]);
                                            objRtn.MENSAJE = mapping.getString(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.REC_MSJERR_10208]);
                                            lstRtn.add(objRtn);*/
                                            if (i == 0) {
                                                objRtn = new PX0241S01A720Filter();
                                                objRtn.ERROR = mapping.getString(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.REC_ESTADO_10208]);
                                                objRtn.CODERROR = mapping.getString(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.REC_CODERR_10208]);
                                                objRtn.MENSAJE = mapping.getString(N03_DATOS_OUTPUT[IDX_DATOS_OUTPUT.REC_MSJERR_10208]);
                                                lstRtn.add(objRtn);
                                            } else {
                                                objRtn = new PX0241S01A720Filter();
                                                objRtn.NTARJ = "TOTAL";
                                                objRtn.DEBITO = Double.toString(mapping.getDouble(N04_WO_DEBLOC.get(199)[IDX_WO_DEBLOC.RD_DEBLOC]));
                                                if (Double.parseDouble(objRtn.DEBITO) == 0d) {
                                                    objRtn.DEBITO = "";
                                                }
                                                objRtn.CREDITO = Double.toString(mapping.getDouble(N04_WO_CRELOC.get(199)[IDX_WO_CRELOC.RD_CRELOC]));
                                                if (Double.parseDouble(objRtn.CREDITO) == 0d) {
                                                    objRtn.CREDITO = "";
                                                }
                                                objRtn.DEBITORV = Double.toString(mapping.getDouble(N04_WO_DEBREV.get(199)[IDX_WO_DEBREV.RD_DEBREV]));
                                                if (Double.parseDouble(objRtn.DEBITORV) == 0d) {
                                                    objRtn.DEBITORV = "";
                                                }
                                                objRtn.CREDITORV = Double.toString(mapping.getDouble(N04_WO_CREREV.get(199)[IDX_WO_CREREV.RD_CREREV]));
                                                if (Double.parseDouble(objRtn.CREDITORV) == 0d) {
                                                    objRtn.CREDITORV = "";
                                                }
                                                lstRtn.add(objRtn);
                                                i = 200;//99
                                            }
                                        }
                                    }
                                }
                            } finally {
                                session.getCNXIBMDB2().closeSystem();
                            }

                        }

                        //FIN NOVITO 20170104
                    }
                    if (filter.TRANSACTION.equals("MEMO") || filter.TRANSACTION.equals("ACMS") || filter.TRANSACTION.equals("ADMS")) {//filter.TRANSACTION.equals("SALE") ||
                        int i = 39;
                        objRtn = new PX0241S01A720Filter();
                        //<editor-fold defaultstate="collapsed" desc="{...}">
                        objRtn.NTARJ = "TOTAL";
                        if (this.cambia_caracter(rs01.getString("PRE_CONTA").substring(4619 + (i * x15), 4620 + (i * x15))).trim().length() > 1) {
                            objRtn.DEBITO = "-" + rs01.getString("PRE_CONTA").substring(4605 + (i * x15), 4618 + (i * x15)) + "." + rs01.getString("PRE_CONTA").substring(4618 + (i * x15), 4619 + (i * x15)) + this.cambia_caracter(rs01.getString("PRE_CONTA").substring(4619 + (i * x15), 4620 + (i * x15))).substring(2, 2);
                        } else {
                            objRtn.DEBITO = rs01.getString("PRE_CONTA").substring(4605 + (i * x15), 4618 + (i * x15)) + "." + rs01.getString("PRE_CONTA").substring(4618 + (i * x15), 4620 + (i * x15));
                        }
                        //objRtn.DEBITO = rs01.getString("PRE_CONTA").substring(4605 + (i * x15), 4618 + (i * x15)) + "." + rs01.getString("PRE_CONTA").substring(4618 + (i * x15), 4620 + (i * x15));
                        if (this.cambia_caracter(rs01.getString("PRE_CONTA").substring(5219 + (i * x15), 5220 + (i * x15))).trim().length() > 1) {
                            objRtn.CREDITO = "-" + rs01.getString("PRE_CONTA").substring(5205 + (i * x15), 5218 + (i * x15)) + "." + rs01.getString("PRE_CONTA").substring(5218 + (i * x15), 5219 + (i * x15)) + this.cambia_caracter(rs01.getString("PRE_CONTA").substring(5219 + (i * x15), 5220 + (i * x15))).substring(2, 2);
                        } else {
                            objRtn.CREDITO = rs01.getString("PRE_CONTA").substring(5205 + (i * x15), 5218 + (i * x15)) + "." + rs01.getString("PRE_CONTA").substring(5218 + (i * x15), 5220 + (i * x15));
                        }
                        //objRtn.CREDITO = rs01.getString("PRE_CONTA").substring(5205 + (i * x15), 5218 + (i * x15)) + "." + rs01.getString("PRE_CONTA").substring(5218 + (i * x15), 5220 + (i * x15));
                        if (this.cambia_caracter(rs01.getString("PRE_CONTA").substring(5819 + (i * x15), 5820 + (i * x15))).trim().length() > 1) {
                            objRtn.DEBITORV = "-" + rs01.getString("PRE_CONTA").substring(5805 + (i * x15), 5818 + (i * x15)) + "." + rs01.getString("PRE_CONTA").substring(5818 + (i * x15), 5819 + (i * x15)) + this.cambia_caracter(rs01.getString("PRE_CONTA").substring(5819 + (i * x15), 5820 + (i * x15))).substring(2, 2);
                        } else {
                            objRtn.DEBITORV = rs01.getString("PRE_CONTA").substring(5805 + (i * x15), 5818 + (i * x15)) + "." + rs01.getString("PRE_CONTA").substring(5818 + (i * x15), 5820 + (i * x15));
                        }
                        //objRtn.DEBITORV = rs01.getString("PRE_CONTA").substring(5805 + (i * x15), 5818 + (i * x15)) + "." + rs01.getString("PRE_CONTA").substring(5818 + (i * x15), 5820 + (i * x15));
                        if (this.cambia_caracter(rs01.getString("PRE_CONTA").substring(6419 + (i * x15), 6420 + (i * x15))).trim().length() > 1) {
                            objRtn.CREDITORV = "-" + rs01.getString("PRE_CONTA").substring(6405 + (i * x15), 6418 + (i * x15)) + "." + rs01.getString("PRE_CONTA").substring(6418 + (i * x15), 6419 + (i * x15)) + this.cambia_caracter(rs01.getString("PRE_CONTA").substring(6419 + (i * x15), 6420 + (i * x15))).substring(2, 2);
                        } else {
                            objRtn.CREDITORV = rs01.getString("PRE_CONTA").substring(6405 + (i * x15), 6418 + (i * x15)) + "." + rs01.getString("PRE_CONTA").substring(6418 + (i * x15), 6420 + (i * x15));
                        }
                        //objRtn.CREDITORV = rs01.getString("PRE_CONTA").substring(6405 + (i * x15), 6418 + (i * x15)) + "." + rs01.getString("PRE_CONTA").substring(6418 + (i * x15), 6420 + (i * x15));
                        //</editor-fold>
                        lstRtn.add(objRtn);
                    }
                } else {
                    objRtn = new PX0241S01A720Filter();
                    objRtn.TICKET = rs01.getString("TICKET");
                    objRtn.SQ = rs01.getString("SEQ");
                    objRtn.CUPONES = rs01.getString("CUPONES");
                    objRtn.TRNCU = rs01.getString("TRNCU");
                    objRtn.ESTADO = rs01.getString("ESTADO");
                    objRtn.MENSAJETKT = rs01.getString("MENSAJE");
                    objRtn.ERR = rs01.getString("ERROR");
                    objRtn.MSJ = rs01.getString("MSJ");
                    objRtn.QTY = rs01.getInt("QTY");
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
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
            pasarGarbageCollector();
        }

        return lstRtn;
    }

    public String cambia_caracter(String VL_CARACTER) {
        if (VL_CARACTER.equals("{")) {
            VL_CARACTER = "0";
        } else if (VL_CARACTER.equals("A")) {
            VL_CARACTER = "1";
        } else if (VL_CARACTER.equals("B")) {
            VL_CARACTER = "2";
        } else if (VL_CARACTER.equals("C")) {
            VL_CARACTER = "3";
        } else if (VL_CARACTER.equals("D")) {
            VL_CARACTER = "4";
        } else if (VL_CARACTER.equals("E")) {
            VL_CARACTER = "5";
        } else if (VL_CARACTER.equals("F")) {
            VL_CARACTER = "6";
        } else if (VL_CARACTER.equals("G")) {
            VL_CARACTER = "7";
        } else if (VL_CARACTER.equals("H")) {
            VL_CARACTER = "8";
        } else if (VL_CARACTER.equals("I")) {
            VL_CARACTER = "9";
        } else if (VL_CARACTER.equals("}")) {
            VL_CARACTER = "-0";
        } else if (VL_CARACTER.equals("J")) {
            VL_CARACTER = "-1";
        } else if (VL_CARACTER.equals("K")) {
            VL_CARACTER = "-2";
        } else if (VL_CARACTER.equals("L")) {
            VL_CARACTER = "-3";
        } else if (VL_CARACTER.equals("M")) {
            VL_CARACTER = "-4";
        } else if (VL_CARACTER.equals("N")) {
            VL_CARACTER = "-5";
        } else if (VL_CARACTER.equals("O")) {
            VL_CARACTER = "-6";
        } else if (VL_CARACTER.equals("P")) {
            VL_CARACTER = "-7";
        } else if (VL_CARACTER.equals("Q")) {
            VL_CARACTER = "-8";
        } else if (VL_CARACTER.equals("R")) {
            VL_CARACTER = "-9";
        }
        return VL_CARACTER;
    }

    public List<A1740> loadDocumentType() throws SQLException, Exception, Exception {
        List<A1740> lstRtn = new ArrayList<A1740>(0);
        A1740 objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        //PX12200001
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX122S01A1740}";

        Connection cnx = null; //session.getCNXIBMDB2().open();         
        try {
            //cstmt01 = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);      
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new A1740();
                objRtn.A1740TITRA = rs01.getString("A1740TITRA");
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
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);//session.getCNXIBMDB2().close();
            pasarGarbageCollector();
        }
        return lstRtn;
    }

    public List<A1740> loadCategory() throws SQLException, Exception {
        List<A1740> lstRtn = new ArrayList<A1740>(0);
        A1740 objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        //PX12200005
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX122S05A1740}";

        Connection cnx = null; //session.getCNXIBMDB2().open();         
        try {
            //cstmt01 = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);      
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new A1740();
                objRtn.A1740CATEG = rs01.getString("A1740CATEG");
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
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);//session.getCNXIBMDB2().close();
            pasarGarbageCollector();
        }
        return lstRtn;
    }

    public List<A1740Filter> loadAccountType() throws SQLException, Exception {
        List<A1740Filter> lstRtn = new ArrayList<A1740Filter>(0);
        A1740Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;

        //PX12200002
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".PX122S02A1740}";

        Connection cnx = null; //session.getCNXIBMDB2().open();         
        try {
            //cstmt01 = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);      
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new A1740Filter();
                objRtn.A1740TIPO = rs01.getString("A1740TIPO");
                objRtn.A1740TIPODESC = rs01.getString("A1740TIPODESC");
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
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);//session.getCNXIBMDB2().close();
            pasarGarbageCollector();
        }
        return lstRtn;
    }

    public String loadGuardar(A2024Filter filter, String lstCorrectData) throws SQLException, Exception {
        CallableStatement cs = null;
        ResultSet rst = null;
        String strSQL;
        String STR_RESULT = "";

        session.getCNXIBMDB2().open();
        try {
            String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP03699(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";
            cs = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);
            cs.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cs.setInt(2, filter.VP_FILTER);
            cs.setString(3, filter.VP_opt);
            cs.setString(4, filter.VP_CIA);
            cs.setString(5, filter.VP_TICKET);
            cs.setString(6, filter.VP_Seq);
            cs.setString(7, filter.VP_Cpn);
            cs.setString(8, filter.VP_Date);
            cs.setString(9, filter.A2024TTARJ);
            cs.setString(10, filter.A2024NTARJ);
            cs.setString(11, filter.A2024RFIC);
            cs.setString(12, filter.A2024RFIS);
            cs.setString(13, filter.A2024VRICOC);
            cs.setString(14, filter.A2024FECVTA);
            cs.setString(15, filter.A2024AGENT);
            cs.setString(16, filter.A2024IATAUSU);
            cs.setString(17, filter.A2024GRUPO);
            cs.setString(18, filter.A2024TDOC);
            cs.setString(19, filter.A2024TRNC);
            cs.setString(20, filter.A2024TFUEN);
            cs.setString(21, filter.A2024BANCO);
            cs.setString(22, filter.A2024PSVTA);
            cs.setString(23, filter.A2024CSABR);
            cs.setString(24, filter.A2024FPROC);
            cs.setDouble(25, filter.A2024TCAMB);
            cs.setString(26, filter.A2024TASIVA);
            cs.setString(27, filter.A2024PNRLOC);
            cs.setString(28, filter.A2024FOPENC);
            cs.setString(29, filter.A2024DESCRIP);
            cs.setString(30, filter.VP_TypeUse);
            cs.setString(31, filter.VP_TypeVoid);
            cs.setDouble(32, filter.A1541VCPVE);
            cs.setString(33, filter.A1541MDAVE);
            cs.setDouble(34, filter.A1541LCMVE);
            cs.setDouble(35, filter.A1541LSCMV);
            cs.setDouble(36, filter.A1541LYQVE);
            cs.setString(37, filter.FBASIS);
            cs.setString(38, filter.CARRIER);
            cs.setString(39, filter.ESTA_TNU);
            cs.setString(40, filter.REFE);
            cs.setString(41, filter.TKTSEQ);
            cs.setString(42, filter.ORI);
            cs.setString(43, filter.DESTI);
            cs.setString(44, filter.NVLO);
            cs.setString(45, filter.CARR);
            cs.setDouble(46, filter.AMOUNT);
            cs.setDouble(47, filter.AMOUNTRV);
            cs.setDouble(48, filter.A1541TCRVE);
            cs.setDouble(49, filter.A1541VCPRV);
            cs.setString(50, filter.A1541MREVE);
            cs.setDouble(51, filter.A1541RCMVE);
            cs.setDouble(52, filter.A1541RSCMV);
            cs.setDouble(53, filter.A1541LYQVERV);
            cs.setString(54, filter.A1541AGENTE);
            cs.setString(55, session.getUserView().getUserInfo().USR);
            cs.setString(56, filter.VP_SEQVTA);
            cs.setString(57, lstCorrectData.trim());

            cs.execute();
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

    public String maintenance(ArrayList<A2024Filter> filter) throws SQLException, Exception {
        CallableStatement cs = null;
        ResultSet rst = null;
        String strSQL;
        String STR_RESULT = "";

        session.getCNXIBMDB2().open();
        try {
            String SQLCLL01 = "{CALL PRAXIS.SQP03705(?,?,?,?,?,?)}";
            cs = session.getCNXIBMDB2().getConnection().prepareCall(SQLCLL01);
            for (A2024Filter obj : filter) {

                cs.setString("IN_CCUST", session.getUserView().getCustomerInfo().CCUST);
                cs.setString("IN_TICKET", obj.A2024CODER);
                cs.setString("IN_CUPON", obj.A2024CUPON);
                cs.setString("IN_SEQ", obj.A2024SEQ);
                cs.setInt("IN_CORRL", obj.A2024CORRL);
                cs.setString("IN_STATUS", "PP");

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

    public String lstdelete(A2024Filter filter) throws SQLException, Exception {
        CallableStatement cs = null;
        ResultSet rst = null;
        String strSQL;
        String result = "";

        Connection cnx = null;
        try {
            strSQL = "{CALL PRAXIS.SQP03705(?,?,?,?,?,?)}";
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(strSQL);

            cs.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cs.setString(2, filter.A2024CODER);
            cs.setString(3, filter.A2024CUPON);
            cs.setString(4, filter.A2024SEQ);
            cs.setInt(5, filter.A2024CORRL);
            cs.setString(6, "AN");
            cs.execute(); //hola

            rst = cs.getResultSet();
            while (rst.next()) {
                result = rst.getString("VMESSAGE");
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

    public List<A2024Filter> loadCargarDatos(A2024Filter filter) throws SQLException, Exception {
        List<A2024Filter> lstRtn = new ArrayList<A2024Filter>(0);
        A2024Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null;
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP03707(?,?,?,?,?)}";

        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.A2024CODER);
            cstmt01.setString(3, filter.A2024CUPON);
            cstmt01.setString(4, filter.A2024SEQ);
            cstmt01.setInt(5, filter.A2024CORRL);

            cstmt01.execute();

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new A2024Filter();

                objRtn.GRUPO = rs01.getString("GRUPO");
                objRtn.CIA = rs01.getString("CIA");
                objRtn.A2024TRNCD = rs01.getString("TRNC");
                objRtn.A2024CUPON = rs01.getString("CUPON");
                objRtn.FORMA = rs01.getString("FORMA");
                objRtn.SERIE = rs01.getString("SERIE");
                objRtn.SEQ = rs01.getString("SEQ");
                objRtn.A2024CORRL = rs01.getInt("CORRL");
                objRtn.A2024CORRLACC = rs01.getInt("CORRLACC");
                //objRtn.A2024ESTADO = rs01.getString("ESTADO");
                objRtn.A2024CODERR = rs01.getString("CODERR");
                objRtn.A2024MSJERR = rs01.getString("MSJERR");
                objRtn.A2024FUENT = rs01.getString("FUENT");
                objRtn.A2024PSVTA = rs01.getString("PSVTA");
                objRtn.A2024SFUEN = rs01.getString("SFUEN");
                objRtn.A2024TFUEN = rs01.getString("TFUEN");
                objRtn.A2024BANCO = rs01.getString("BANCO");
                objRtn.A2024AGENT = rs01.getString("AGENT");
                objRtn.A2024CSABR = rs01.getString("CSABR");
                objRtn.A2024FPROC = rs01.getString("FPROC");
                objRtn.A2024MDALOC = rs01.getString("MDALOC");
                objRtn.A2024TCAMB = rs01.getInt("TCAMB");
                //objRtn.A2024FECVTA = rs01.getString("FECVTA");
                objRtn.A2024TDOC = rs01.getString("TDOC");
                objRtn.A2024TFOR = rs01.getString("TFOR");
                objRtn.A2024CONP1 = rs01.getString("CONP1");
                objRtn.A2024CONP2 = rs01.getString("CONP2");
                objRtn.A2024CONP3 = rs01.getString("CONP3");
                objRtn.A2024CONP3 = rs01.getString("CONP3");
                objRtn.A2024TTARJ = rs01.getString("TTARJ");
                objRtn.A2024NTARJ = rs01.getString("NTARJ");
                objRtn.A2024RFIC = rs01.getString("RFIC");
                objRtn.A2024RFIS = rs01.getString("RFIS");

                objRtn.A2024DEBLOC = rs01.getDouble("DEBLOC");
                objRtn.A2024CRELOC = rs01.getDouble("CRELOC");
                objRtn.A2024DEBREV = rs01.getDouble("DEBREV");
                objRtn.A2024CREREV = rs01.getDouble("CREREV");

                objRtn.A2024TASIVA = rs01.getString("TASIVA");
                objRtn.A2024FOPIVA = rs01.getString("FOPIVA");
                objRtn.A2024FOPENC = rs01.getString("FOPENC");

                objRtn.A2024VRICOC = rs01.getString("VRICOC");
                objRtn.A2024PFCLOC = rs01.getString("PFCLOC");
                objRtn.A2024PNRLOC = rs01.getString("PNRLOC");
                //objRtn.A2024AGENT = rs01.getString("AGTVTA");
                objRtn.A2024FECUSO = rs01.getString("FECUSO");
                objRtn.A2024CTA = rs01.getString("CTA");
                objRtn.A2024LIB1 = rs01.getString("LIB1");
                objRtn.A2024LIB1CIA = rs01.getString("LIB1CIA");
                objRtn.A2024CLIENT = rs01.getString("CLIENT");
                objRtn.A2024DIRECC = rs01.getString("DIRECC");
                objRtn.A2024PROVEE = rs01.getString("PROVEE");
                objRtn.A2024ORAC = rs01.getString("ORAC");
                objRtn.A2024COMB = rs01.getDouble("COMB");
                objRtn.A2024TITU = rs01.getString("TITU");
                objRtn.A2024SURC = rs01.getString("SURC");
                objRtn.ESTA_TNU = rs01.getString("ESTTNU");
                objRtn.A2024CTAC = rs01.getString("CTAC");
                objRtn.A2024TITUC = rs01.getString("TITUC");
                objRtn.A2024LIB1C = rs01.getString("LIB1C");
                objRtn.A2024CTAP = rs01.getString("CTAP");
                objRtn.A2024TITUP = rs01.getString("TITUP");
                objRtn.A2024LIB1P = rs01.getString("LIB1P");
                objRtn.A2024CTAPC = rs01.getString("CTAPC");
                objRtn.A2024TITUPC = rs01.getString("TITUPC");
                objRtn.A2024LIB1PC = rs01.getString("LIB1PC");
                objRtn.A2024CTAPAR = rs01.getString("CTAPAR");
                objRtn.A2024TITUPAR = rs01.getString("TITUPAR");
                objRtn.A2024LIB1PAR = rs01.getString("LIB1PAR");
                objRtn.A2024CLIENTAR = rs01.getString("CLIENTAR");
                objRtn.A2024DIRECCAR = rs01.getString("DIRECCAR");
                objRtn.A2024ORACAR = rs01.getString("ORACAR");
                //objRtn.A2024DESCRIP = rs01.getString("DESCRIP");
                objRtn.A2024CODA = rs01.getDouble("CODA");
                objRtn.A2024CODP = rs01.getDouble("CODP");
                objRtn.A2024TIPOIVA = rs01.getString("TIPOIVA");
                objRtn.A2024TIPOIVA = rs01.getString("TIPOIVA");
                objRtn.A2024TIPOMX = rs01.getString("TIPOMX");
                objRtn.A2024IATAUSU = rs01.getString("IATAUSU");
                objRtn.A2024USRIN = rs01.getString("USRIN");
                objRtn.A2024FECIN = rs01.getString("FECIN");
                objRtn.A2024HORIN = rs01.getString("HORIN");
                objRtn.MARCA = rs01.getString("MARCA");
                objRtn.A2024FPROC = rs01.getString("FEPROC");
                objRtn.A2024AREA = rs01.getString("AREA");
                objRtn.A2024GRUPO = rs01.getString("GRUPO");
                objRtn.A2024TRNC = rs01.getString("TRNC");
                objRtn.A2024TTRAX = rs01.getString("TTRAX");
                objRtn.A2024AGENT = rs01.getString("AGENT");
                objRtn.A2024FECVTA = rs01.getString("FECVTA");
                objRtn.A2024DESCRIP = rs01.getString("DESCRIP");
                objRtn.A2024ESTADO = rs01.getString("ESTADO");
                objRtn.A2024ESTTRX = rs01.getString("ESTTRX");
                objRtn.VP_TypeVoid = rs01.getString("TKTVOID");
                objRtn.A1541VCPVE = rs01.getDouble("VCPVE");
                objRtn.A1541MDAVE = rs01.getString("MDAVE");
                objRtn.A1541LCMVE = rs01.getDouble("LCMVE");
                objRtn.A1541LSCMV = rs01.getDouble("LSCMV");
                objRtn.A1541LYQVE = rs01.getDouble("LYQVE");
                objRtn.A1541TCRVE = rs01.getDouble("TCRVE");
                objRtn.A1541VCPRV = rs01.getDouble("VCPRV");
                objRtn.A1541MREVE = rs01.getString("MREVE");
                objRtn.A1541RCMVE = rs01.getDouble("RCMVE");
                objRtn.A1541RSCMV = rs01.getDouble("RSCMV");
                objRtn.A1541RYQVE = rs01.getDouble("RYQVE");
                objRtn.A1541FPFISC = rs01.getString("FPFISC");
                objRtn.A1541TTRANS = rs01.getString("TTRANS");
                objRtn.A1541CIANEW = rs01.getString("CIANEW");
                objRtn.A1541FORMANEW = rs01.getString("FORMANEW");
                objRtn.A1541SERIENEW = rs01.getString("SERIENEW");
                objRtn.A1541CUPONNEW = rs01.getString("CUPONNEW");
                objRtn.A1541SEQNEW = rs01.getString("SEQNEW");
                objRtn.A1541FBORI1 = rs01.getString("FBORI1");
                objRtn.A1541FBUSO1 = rs01.getString("FBUSO1");
                objRtn.A1541ESTTNU = rs01.getString("ESTTNU");
                objRtn.A1541IATAUSU = rs01.getString("IATAUSU");
                objRtn.A1541USRIN = rs01.getString("USRIN");
                objRtn.A1541FECIN = rs01.getString("FECIN");
                objRtn.A1541HORIN = rs01.getString("HORIN");
                objRtn.A1541TKTASOC = rs01.getString("TKTASOC");
                objRtn.A1541ASOCSEQ = rs01.getString("ASOCSEQ");
                objRtn.A1541ELIMUSU = rs01.getString("ELIMUSU");
                objRtn.A1541FECPRO = rs01.getString("FECPRO");
                objRtn.A1541CARR = rs01.getString("CARR");
                objRtn.A1541CDEPART = rs01.getString("CDEPART");
                objRtn.A1541CARRIVA = rs01.getString("CARRIVA");
                objRtn.A1541NFLIGHT = rs01.getString("NFLIGHT");
                objRtn.A1541AMOUNTLOC = rs01.getDouble("AMOUNTLOC");
                objRtn.A1541AMOUNTRV = rs01.getDouble("AMOUNTRV");
                objRtn.A1541FEUSO = rs01.getString("FEUSO");
                objRtn.A1541FCONT = rs01.getString("FCONT");
                objRtn.A1541HCONT = rs01.getString("HCONT");
                objRtn.A1541IDCON = rs01.getString("IDCON");
                objRtn.A1541PCONT = rs01.getString("PCONT");
                objRtn.A1541REVIS = rs01.getString("REVIS");
                objRtn.A1541FREVI = rs01.getString("FREVI");
                objRtn.A1541HREVI = rs01.getString("HREVI");
                objRtn.A1541SEQVTA = rs01.getString("SEQVTA");

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

    public List<A2024Filter> loadDatosTicktes(A2024Filter filter) throws SQLException, Exception {
        List<A2024Filter> lstRtn = new ArrayList<>(0);
        A2024Filter objRtn;

        CallableStatement cstmt01 = null;
        ResultSet rs01 = null; //17
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP03723(?,?,?,?)}";
        Connection cnx = null;
        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt01 = cnx.prepareCall(SQLCLL01);

            cstmt01.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cstmt01.setString(2, filter.VP_TypeUse);
            cstmt01.setString(3, filter.VP_CIA);
            cstmt01.setString(4, filter.VP_BOLETO);

            cstmt01.execute(); //hola

            rs01 = cstmt01.getResultSet();
            while (rs01.next()) {
                objRtn = new A2024Filter();
                objRtn.A2024PAX = rs01.getString("A720PAX");
                objRtn.A2024FECVTA = rs01.getString("A720FECVTA");
                objRtn.A2024NREF = rs01.getString("A1531NREF");
                objRtn.A2024TICKET = rs01.getString("TICKET");
                objRtn.A2024CIUVTA = rs01.getString("A720CIUVTA");
                objRtn.A2024TARIFA = rs01.getDouble("A720TARIFA");
                objRtn.A2024MONEDA = rs01.getString("A720MONEDA");
                objRtn.A2024PNR = rs01.getString("A720PNR");
                objRtn.A2024AGENTE = rs01.getString("A720AGENTE");
                objRtn.A2024VFOP = rs01.getDouble("A1531VFOP");
                objRtn.A2024SEQ = rs01.getString("A720SEQ");

                lstRtn.add(objRtn);
            }
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
        return lstRtn;
        //return lstRtn;
    }

}
