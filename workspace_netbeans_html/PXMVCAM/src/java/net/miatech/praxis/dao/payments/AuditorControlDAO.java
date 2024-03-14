/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.dao.payments;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Types;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import net.miatech.beans.spring.implement.IServerSession;
import net.miatech.librfnd.filter.CPF030Filter;
import net.miatech.librfnd.filter.CPF031Filter;
import net.miatech.utils.Functions;

/**
 *
 * @author lmendoza
 */
public class AuditorControlDAO {

    private IServerSession session;
    private CallableStatement cs = null;
    private Statement stmt = null;
    private ResultSet rst = null;
    private Connection cnx = null;

    public void setSession(IServerSession ss) {
        this.session = ss;
    }

    public List<CPF031Filter> search(CPF031Filter filter) throws Exception {

        List<CPF031Filter> lista = new ArrayList<>();
        CPF031Filter bean;
        long totPRODUS = 0, totDIASL = 0;

        try {

//            String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP03741(?,?,?,?,?,?,?,?)}";
            String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP03741_BS(?,?,?,?,?,?,?,?)}";

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(SQLCLL01);
            cs.registerOutParameter(5, Types.INTEGER);
            cs.registerOutParameter(6, Types.INTEGER);
            cs.registerOutParameter(7, Types.INTEGER);
            cs.registerOutParameter(8, Types.INTEGER);

            cs.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cs.setString(2, filter.IN_DATEFROM.trim());
            cs.setString(3, filter.IN_DATETO.trim());
            cs.setString(4, filter.IN_USEAC.trim());

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
                bean = new CPF031Filter();
                bean.IN_DATEFROM = filter.IN_DATEFROM;
                bean.IN_DATETO = filter.IN_DATETO;

                bean.RN = rst.getInt("RN");
                bean.FEUP = rst.getString("DATE").trim();
                bean.UAUDIT = rst.getString("UAUDIT").trim();
                bean.NOMB = rst.getString("NAMEUSAR").trim();
                bean.APE = rst.getString("APEUSAR").trim();
                bean.TQMATCH = rst.getInt("TQMATCH");
                bean.TQPEND = rst.getInt("TQPEND");
                bean.TOTAL = rst.getInt("TOTAL");
                bean.PORCENTAJE = rst.getDouble("TQMATCH") / rst.getDouble("TOTAL") * 100;
                
//                bean.NOMB = rst.getString("NOMB").trim();
//                bean.APE = rst.getString("APE").trim();
//                bean.PRODUS = rst.getInt("PRODUS");
//                bean.TOTALP = rst.getInt("TOTALP");
//                bean.DIASL = rst.getInt("DIASL");
//                bean.PROMET = rst.getInt("PROMET");
//                bean.PORCENTAJE = Functions.redondear(rst.getDouble("PORCENTAJE"), 2);
//                bean.desPORCENTAJE = Functions.redondear(rst.getDouble("PORCENTAJE"), 2) + "%";
//
                totPRODUS = totPRODUS + bean.TQMATCH;
//                totDIASL = totDIASL + bean.DIASL;

                bean.page.PAGNUM = filter.page.PAGNUM;
                bean.page.PAGROW = filter.page.PAGROW;
                bean.page.TOTPAG = filter.page.TOTPAG;
                bean.page.TOTROW = filter.page.TOTROW;
                lista.add(bean);
            }

            for (int i = 0; i < lista.size(); i++) {
                lista.get(i).totPRODUS = totPRODUS;
//                lista.get(i).totDIASL = totDIASL;
            }

            setClose();

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            setClose();
        }

        return lista;

    }

    public List<CPF031Filter> searchDataDetail(CPF031Filter filter) throws Exception {

        List<CPF031Filter> lista = new ArrayList<>();
        CPF031Filter bean;

        try {

            String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP03742(?,?,?,?,?,?,?,?,?)}";

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(SQLCLL01);
            cs.registerOutParameter(6, Types.INTEGER);
            cs.registerOutParameter(7, Types.INTEGER);
            cs.registerOutParameter(8, Types.INTEGER);
            cs.registerOutParameter(9, Types.INTEGER);

            cs.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cs.setString(2, filter.FECHAP);
            cs.setString(3, filter.USEAC.trim());
            cs.setString(4, filter.IN_DATEFROM.trim());
            cs.setString(5, filter.IN_DATETO.trim());

            cs.setInt(6, filter.page.PAGNUM);
            cs.setInt(7, filter.page.PAGROW);
            cs.setInt(8, filter.page.TOTPAG);
            cs.setInt(9, filter.page.TOTROW);
            cs.execute();

            filter.page.PAGNUM = cs.getInt(6);
            filter.page.PAGROW = cs.getInt(7);
            filter.page.TOTPAG = cs.getInt(8);
            filter.page.TOTROW = cs.getInt(9);

            rst = cs.getResultSet();

            while (rst.next()) {
                bean = new CPF031Filter();
                bean.FECAC = filter.FECAC;

                bean.RN = rst.getInt("RN");
                bean.IN_DATEFROM = filter.IN_DATEFROM;
                bean.IN_DATETO = filter.IN_DATETO;
                bean.FECHAP = filter.FECHAP;
                bean.USEAC = filter.USEAC;
                bean.totPRODUS = filter.PRODUS;
                bean.totTOTALP = filter.TOTALP;
                bean.FECAC = rst.getString("FECAC").trim();
                bean.FASIG = rst.getString("FASIG").trim();
                bean.PRODUS = rst.getInt("PRODUS");
                bean.DIASL = rst.getInt("DIASL");
                bean.TMOTI = rst.getString("TMOTI").trim();
                if (bean.TMOTI.equals("I")) {
                    bean.desTMOTI = "Involuntary";
                } else if (bean.TMOTI.equals("V")) {
                    bean.desTMOTI = "Voluntary";
                } else {
                    bean.desTMOTI = bean.TMOTI;
                }
                bean.TEMI = rst.getString("TEMI").trim();
                if (bean.TEMI.equals("1")) {
                    bean.desTEMI = "SALE";
                } else if (bean.TEMI.equals("2")) {
                    bean.desTEMI = "EXCH";
                } else {
                    bean.desTEMI = bean.TEMI;
                }
                bean.TRFND = rst.getString("TRFND").trim();
                if (bean.TRFND.equals("P")) {
                    bean.desTRFND = "Parcial";
                } else if (bean.TRFND.equals("T")) {
                    bean.desTRFND = "Total";
                } else {
                    bean.desTRFND = bean.TRFND;
                }
                bean.PROMED = rst.getInt("PROMED");
                bean.TOTALP = rst.getInt("TOTALP");
                bean.DIAAC = rst.getString("DIAAC").trim();
                bean.HORAI = rst.getString("HORAI").trim();
                bean.HORASR = rst.getString("HORASR").trim();
                bean.HORAIR = rst.getString("HORAIR").trim();
                bean.HORAS = rst.getString("HORAS").trim();

                bean.page.PAGNUM = filter.page.PAGNUM;
                bean.page.PAGROW = filter.page.PAGROW;
                bean.page.TOTPAG = filter.page.TOTPAG;
                bean.page.TOTROW = filter.page.TOTROW;
                lista.add(bean);
            }

            setClose();

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            setClose();
        }

        return lista;

    }

    public List<CPF030Filter> searchDetailDay(CPF031Filter filter, String flag) throws Exception {

        List<CPF030Filter> lista = new ArrayList<>();
        CPF030Filter bean;

        try {

            String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP03743_1(?,?,?,?,?,?,?,?,?,?,?,?,?,?)}";

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(SQLCLL01);
            cs.registerOutParameter(11, Types.INTEGER);
            cs.registerOutParameter(12, Types.INTEGER);
            cs.registerOutParameter(13, Types.INTEGER);
            cs.registerOutParameter(14, Types.INTEGER);

            cs.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cs.setString(2, filter.FECAC);
            cs.setString(3, filter.USEAC);
            cs.setString(4, filter.TMOTI);
            cs.setString(5, filter.TEMI);
            cs.setString(6, filter.TRFND);
            cs.setString(7, filter.FASIG);
            cs.setString(8, flag);
            cs.setString(9, filter.IN_DATEFROM);
            cs.setString(10, filter.IN_DATETO);

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
                bean = new CPF030Filter();
                bean.totPRODUS = filter.PRODUS;

                bean.RN = rst.getInt("RN");
                bean.FCARG = rst.getString("FCARG").trim();
                bean.FASIG = rst.getString("FASIG").trim();
                bean.FECAC = rst.getString("FECAC").trim();
                bean.subFECAC = bean.FECAC.substring(0, 6);
                bean.DIAAC = rst.getString("DIAAC").trim();
                bean.USEAC = rst.getString("USEAC").trim();
                bean.HORAI = rst.getString("HORAI").trim();
                bean.HORASR = rst.getString("HORASR").trim();
                bean.HORAIR = rst.getString("HORAIR").trim();
                bean.HORAS = rst.getString("HORAS").trim();
                bean.TIPO = rst.getString("TIPO").trim();
                bean.TMOTI = rst.getString("TMOTI").trim();
                if (bean.TMOTI.equals("I")) {
                    bean.desTMOTI = "Involuntary";
                } else if (bean.TMOTI.equals("V")) {
                    bean.desTMOTI = "Voluntary";
                } else if (bean.TMOTI.equals("W")) {
                    bean.desTMOTI = "Waiver";
                } else if (bean.TMOTI.equals("E")) {
                    bean.desTMOTI = "Exception";
                } else {
                    bean.desTMOTI = bean.TMOTI;
                }
                bean.TEMI = rst.getString("TEMI").trim();
                if (bean.TEMI.equals("1")) {
                    bean.desTEMI = "Primera Emision";
                } else if (bean.TEMI.equals("2")) {
                    bean.desTEMI = "Reemision";
                } else {
                    bean.desTEMI = bean.TEMI;
                }
                bean.TRFND = rst.getString("TRFND").trim();
                if (bean.TRFND.equals("P")) {
                    bean.desTRFND = "Parcial";
                } else if (bean.TRFND.equals("T")) {
                    bean.desTRFND = "Total";
                } else {
                    bean.desTRFND = bean.TRFND;
                }
                bean.ESTAD = rst.getString("ESTAD").trim();
                if (bean.ESTAD.equals("0")) {
                    bean.desESTAD = "Procesado/Autorizado-RF";
                } else if (bean.ESTAD.equals("1")) {
                    bean.desESTAD = "Renegado/Rechazado";
                } else if (bean.ESTAD.equals("2")) {
                    bean.desESTAD = "En consulta";
                } else if (bean.ESTAD.equals("4")) {
                    bean.desESTAD = "Bajo Revision";
                } else if (bean.ESTAD.equals("5")) {
                    bean.desESTAD = "Devuelto a Lan";
                } else if (bean.ESTAD.equals("6")) {
                    bean.desESTAD = "Procesado Contact Cente";
                } else if (bean.ESTAD.equals("7")) {
                    bean.desESTAD = "Enviada a Cus/Operacion";
                } else if (bean.ESTAD.equals("8")) {
                    bean.desESTAD = "Pagado por sap";
                } else {
                    bean.desESTAD = bean.ESTAD;
                }
                bean.TKT = rst.getString("TKT").trim();
                bean.HORAC = rst.getString("HORAC").trim();
                bean.MINCAL = rst.getString("MINCAL").trim();
                bean.MINDET = rst.getString("MINDET").trim();
                bean.RULE = rst.getString("RULE").trim();
                bean.HORCAL = rst.getString("HORCAL").trim();

                bean.page.PAGNUM = filter.page.PAGNUM;
                bean.page.PAGROW = filter.page.PAGROW;
                bean.page.TOTPAG = filter.page.TOTPAG;
                bean.page.TOTROW = filter.page.TOTROW;
                lista.add(bean);
            }

            setClose();

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            setClose();
        }

        return lista;

    }

    public List<CPF031Filter> searchDataDetailAll(CPF031Filter filter) throws Exception {

        List<CPF031Filter> lista = new ArrayList<>();
        CPF031Filter bean;

        try {

            String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP03745(?,?,?,?,?,?)}";

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(SQLCLL01);
            cs.registerOutParameter(3, Types.INTEGER);
            cs.registerOutParameter(4, Types.INTEGER);
            cs.registerOutParameter(5, Types.INTEGER);
            cs.registerOutParameter(6, Types.INTEGER);

            cs.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cs.setString(2, filter.FECHAP);

            cs.setInt(3, filter.page.PAGNUM);
            cs.setInt(4, filter.page.PAGROW);
            cs.setInt(5, filter.page.TOTPAG);
            cs.setInt(6, filter.page.TOTROW);
            cs.execute();

            filter.page.PAGNUM = cs.getInt(3);
            filter.page.PAGROW = cs.getInt(4);
            filter.page.TOTPAG = cs.getInt(5);
            filter.page.TOTROW = cs.getInt(6);

            rst = cs.getResultSet();

            while (rst.next()) {
                bean = new CPF031Filter();
                bean.FECAC = filter.FECAC;

                bean.RN = rst.getInt("RN");
                bean.FECHAP = filter.FECHAP;
//                bean.USEAC = filter.USEAC;
//                bean.totPRODUS = filter.PRODUS;
//                bean.totTOTALP = filter.TOTALP;
                bean.USEAC = rst.getString("USEAC").trim();
                bean.FECAC = rst.getString("FECAC").trim();
                bean.PRODUS = rst.getInt("PRODUS");
                bean.DIASL = rst.getInt("DIASL");
                bean.TMOTI = rst.getString("TMOTI").trim();
                if (bean.TMOTI.equals("I")) {
                    bean.desTMOTI = "Involuntary";
                } else if (bean.TMOTI.equals("V")) {
                    bean.desTMOTI = "Voluntary";
                } else {
                    bean.desTMOTI = bean.TMOTI;
                }
                bean.TEMI = rst.getString("TEMI").trim();
                if (bean.TEMI.equals("1")) {
                    bean.desTEMI = "SALE";
                } else if (bean.TEMI.equals("2")) {
                    bean.desTEMI = "EXCH";
                } else {
                    bean.desTEMI = bean.TEMI;
                }
                bean.TRFND = rst.getString("TRFND").trim();
                if (bean.TRFND.equals("P")) {
                    bean.desTRFND = "Parcial";
                } else if (bean.TRFND.equals("T")) {
                    bean.desTRFND = "Total";
                } else {
                    bean.desTRFND = bean.TRFND;
                }
                bean.PROMED = rst.getInt("PROMED");
                bean.TOTALP = rst.getInt("TOTALP");
                bean.DIAAC = rst.getString("DIAAC").trim();
                bean.HORAI = rst.getString("HORAI").trim();
                bean.HORASR = rst.getString("HORASR").trim();
                bean.HORAIR = rst.getString("HORAIR").trim();
                bean.HORAS = rst.getString("HORAS").trim();

                bean.page.PAGNUM = filter.page.PAGNUM;
                bean.page.PAGROW = filter.page.PAGROW;
                bean.page.TOTPAG = filter.page.TOTPAG;
                bean.page.TOTROW = filter.page.TOTROW;
                lista.add(bean);
            }

            setClose();

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            setClose();
        }

        return lista;

    }

    //---------------------------------------------------------------------------------------
    public List<CPF030Filter> searchByAsigDateMonth(CPF031Filter filter) throws Exception {

        List<CPF030Filter> lista = new ArrayList<>();
        CPF030Filter bean;
        long totPENDING = 0, totAUDITADOS = 0, totAsig = 0;

        try {

            String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP03751(?,?,?,?,?,?,?,?)}";

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(SQLCLL01);
            cs.registerOutParameter(5, Types.INTEGER);
            cs.registerOutParameter(6, Types.INTEGER);
            cs.registerOutParameter(7, Types.INTEGER);
            cs.registerOutParameter(8, Types.INTEGER);

            cs.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cs.setString(2, filter.IN_DATEFROM.trim());
            cs.setString(3, filter.IN_DATETO.trim());
            cs.setString(4, filter.IN_USEAC.trim());

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
                bean = new CPF030Filter();
                bean.IN_DATEFROM = filter.IN_DATEFROM;
                bean.IN_DATETO = filter.IN_DATETO;
                bean.IN_USEAC = filter.IN_USEAC;

                bean.RN = rst.getInt("RN");
                bean.CCUST = rst.getString("CCUST").trim();
                bean.FASIG = rst.getString("FASIG").trim();
                bean.UASIG = rst.getString("UASIG").trim();
                bean.qtyPENDING = rst.getInt("qtyPENDING");
                bean.qtyAUDITADOS = rst.getInt("qtyAUDITADOS");
                bean.qtyTotal = bean.qtyPENDING + bean.qtyAUDITADOS;
                bean.DIAS_LABORADOS = rst.getInt("DIAS_LABORADOS");
                bean.DIF_DIAS = rst.getInt("DIF_DIAS");
                bean.minFECAC = rst.getString("minFECAC").trim();
                bean.maxFECAC = rst.getString("maxFECAC").trim();
//                bean.NOMB = rst.getString("NOMB").trim();
//                bean.APE = rst.getString("APE").trim();

                totPENDING = totPENDING + bean.qtyPENDING;
                totAUDITADOS = totAUDITADOS + bean.qtyAUDITADOS;
                totAsig = totAsig + bean.qtyTotal;

                bean.page.PAGNUM = filter.page.PAGNUM;
                bean.page.PAGROW = filter.page.PAGROW;
                bean.page.TOTPAG = filter.page.TOTPAG;
                bean.page.TOTROW = filter.page.TOTROW;
                lista.add(bean);
            }

            for (int i = 0; i < lista.size(); i++) {
                lista.get(i).totPENDING = totPENDING;
                lista.get(i).totAUDITADOS = totAUDITADOS;
                lista.get(i).totAsig = totAsig;
            }

            setClose();

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            setClose();
        }

        return lista;

    }

    public List<CPF030Filter> searchByAsigDate(CPF031Filter filter) throws Exception {

        List<CPF030Filter> lista = new ArrayList<>();
        CPF030Filter bean;
        long totPENDING = 0, totAUDITADOS = 0, totAsig = 0;

        try {

//            String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP03750(?,?,?,?,?,?,?,?)}";
            String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP03750_1(?,?,?,?,?,?,?,?)}";

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(SQLCLL01);
            cs.registerOutParameter(5, Types.INTEGER);
            cs.registerOutParameter(6, Types.INTEGER);
            cs.registerOutParameter(7, Types.INTEGER);
            cs.registerOutParameter(8, Types.INTEGER);

            cs.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cs.setString(2, filter.IN_DATEFROM.trim());
            cs.setString(3, filter.IN_DATETO.trim());
            cs.setString(4, filter.IN_UASIG.trim());

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
                bean = new CPF030Filter();
                bean.IN_DATEFROM = filter.IN_DATEFROM;
                bean.IN_DATETO = filter.IN_DATETO;
                bean.IN_FASIG = filter.FASIG;

                bean.RN = rst.getInt("RN");
                bean.CCUST = rst.getString("CCUST").trim();
                bean.FASIG = rst.getString("FASIG").trim();
                bean.UASIG = rst.getString("UASIG").trim();
                bean.qtyPENDING = rst.getInt("qtyPENDING");
                bean.qtyAUDITADOS = rst.getInt("qtyAUDITADOS");
                bean.qtyTotal = bean.qtyPENDING + bean.qtyAUDITADOS;
                bean.DIAS_LABORADOS = rst.getInt("DIAS_LABORADOS");
                bean.DIF_DIAS = rst.getInt("DIF_DIAS");
                bean.minFECAC = rst.getString("minFECAC").trim();
                bean.maxFECAC = rst.getString("maxFECAC").trim();

                totPENDING = totPENDING + bean.qtyPENDING;
                totAUDITADOS = totAUDITADOS + bean.qtyAUDITADOS;
                totAsig = totAsig + bean.qtyTotal;

                bean.page.PAGNUM = filter.page.PAGNUM;
                bean.page.PAGROW = filter.page.PAGROW;
                bean.page.TOTPAG = filter.page.TOTPAG;
                bean.page.TOTROW = filter.page.TOTROW;
                lista.add(bean);
            }

            for (int i = 0; i < lista.size(); i++) {
                lista.get(i).totPENDING = totPENDING;
                lista.get(i).totAUDITADOS = totAUDITADOS;
                lista.get(i).totAsig = totAsig;
            }

            setClose();

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            setClose();
        }

        return lista;

    }

    //---------------------------------------------------------------------------------------
    public List<?> searchProcess(CPF031Filter filter) throws Exception {

        List<CPF031Filter> lista = new ArrayList<>();
        CPF031Filter bean;

        List LISTA = new ArrayList();
        HashMap hm = new HashMap();
        HashMap hmap = new HashMap();

        try {

            String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP03770(?,?,?,?,?,?,?,?,?)}";

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(SQLCLL01);
            cs.registerOutParameter(6, Types.INTEGER);
            cs.registerOutParameter(7, Types.INTEGER);
            cs.registerOutParameter(8, Types.INTEGER);
            cs.registerOutParameter(9, Types.INTEGER);

            cs.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cs.setString(2, filter.FECHAP);
            cs.setString(3, filter.IN_USEAC.trim());
            cs.setString(4, filter.IN_DATEFROM.trim());
            cs.setString(5, filter.IN_DATETO.trim());

            cs.setInt(6, filter.page.PAGNUM);
            cs.setInt(7, filter.page.PAGROW);
            cs.setInt(8, filter.page.TOTPAG);
            cs.setInt(9, filter.page.TOTROW);
            cs.execute();

            filter.page.PAGNUM = cs.getInt(6);
            filter.page.PAGROW = cs.getInt(7);
            filter.page.TOTPAG = cs.getInt(8);
            filter.page.TOTROW = cs.getInt(9);

            rst = cs.getResultSet();

            String useac = "";
            String strdia = "";
            while (rst.next()) {

                if (!useac.equals("") && !useac.equals(rst.getString("USEAC").trim())) {

                    for (int dia = 1; dia <= 31; dia++) {
                        strdia = Functions.fillZeros(2, String.valueOf(dia));
                        if (!hm.containsKey("dia" + strdia)) {
                            hm.put("dia" + strdia, 0);
                        }
                    }

                    LISTA.add(hm);
                    hm = new HashMap();
                }

                useac = rst.getString("USEAC").trim();

                hm.put("USEAC", useac);
//                hm.put("PRODUS", rst.getInt("PRODUS"));
                hm.put("dia" + rst.getString("FECAC").subSequence(6, 8), rst.getInt("PRODUS"));

            }
            for (int dia = 1; dia <= 31; dia++) {
                strdia = Functions.fillZeros(2, String.valueOf(dia));
                if (!hm.containsKey("dia" + strdia)) {
                    hm.put("dia" + strdia, 0);
                }
            }

            LISTA.add(hm);

            setClose();

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            setClose();
        }

        return LISTA;

    }
    
    public HashMap searchProcess_1(CPF031Filter filter) throws Exception {

        HashMap hm = new HashMap();
        List<CPF031Filter> lista = new ArrayList<>();
        List<CPF031Filter> lista2 = new ArrayList<>();
        List<CPF031Filter> lista3 = new ArrayList<>();
        CPF031Filter bean;
        
        long totDIA01 = 0, totDIA02 = 0, totDIA03 = 0, totDIA04 = 0, totDIA05 = 0, totDIA06 = 0, totDIA07 = 0, totDIA08 = 0, totDIA09 = 0, totDIA10 = 0,
             totDIA11 = 0, totDIA12 = 0, totDIA13 = 0, totDIA14 = 0, totDIA15 = 0, totDIA16 = 0, totDIA17 = 0, totDIA18 = 0, totDIA19 = 0, totDIA20 = 0,
             totDIA21 = 0, totDIA22 = 0, totDIA23 = 0, totDIA24 = 0, totDIA25 = 0, totDIA26 = 0, totDIA27 = 0, totDIA28 = 0, totDIA29 = 0, totDIA30 = 0, totDIA31 = 0;
        long longTotDIA = 0;
        
        try {

            String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP03770_1(?,?,?,?,?,?,?,?,?)}";

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(SQLCLL01);
            cs.registerOutParameter(6, Types.INTEGER);
            cs.registerOutParameter(7, Types.INTEGER);
            cs.registerOutParameter(8, Types.INTEGER);
            cs.registerOutParameter(9, Types.INTEGER);

            cs.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cs.setString(2, filter.FECHAP);
            cs.setString(3, filter.IN_USEAC.trim());
            cs.setString(4, filter.IN_DATEFROM.trim());
            cs.setString(5, filter.IN_DATETO.trim());

            cs.setInt(6, filter.page.PAGNUM);
            cs.setInt(7, filter.page.PAGROW);
            cs.setInt(8, filter.page.TOTPAG);
            cs.setInt(9, filter.page.TOTROW);
            cs.execute();

            filter.page.PAGNUM = cs.getInt(6);
            filter.page.PAGROW = cs.getInt(7);
            filter.page.TOTPAG = cs.getInt(8);
            filter.page.TOTROW = cs.getInt(9);

            rst = cs.getResultSet();
            
            //Obteniendo los Totales ===========================================
            while (rst.next()) {
                bean = new CPF031Filter();
                bean.ESTADO = rst.getString("ESTADO");
                bean.QTY_TOTAL = rst.getInt("QTY_TOTAL");
                bean.QTY_TOTAL_ORIGINAL = rst.getInt("QTY_TOTAL_ORIGINAL");
                
                lista2.add(bean);
            }
            rst.close();
            
            if (cs.getMoreResults()) {
                rst = cs.getResultSet();
                
                while (rst.next()) {
                    totDIA01 = rst.getInt("DIA01");
                    totDIA02 = rst.getInt("DIA02");
                    totDIA03 = rst.getInt("DIA03");
                    totDIA04 = rst.getInt("DIA04");
                    totDIA05 = rst.getInt("DIA05");
                    totDIA06 = rst.getInt("DIA06");
                    totDIA07 = rst.getInt("DIA07");
                    totDIA08 = rst.getInt("DIA08");
                    totDIA09 = rst.getInt("DIA09");
                    totDIA10 = rst.getInt("DIA10");
                    totDIA11 = rst.getInt("DIA11");
                    totDIA12 = rst.getInt("DIA12");
                    totDIA13 = rst.getInt("DIA13");
                    totDIA14 = rst.getInt("DIA14");
                    totDIA15 = rst.getInt("DIA15");
                    totDIA16 = rst.getInt("DIA16");
                    totDIA17 = rst.getInt("DIA17");
                    totDIA18 = rst.getInt("DIA18");
                    totDIA19 = rst.getInt("DIA19");
                    totDIA20 = rst.getInt("DIA20");
                    totDIA21 = rst.getInt("DIA21");
                    totDIA22 = rst.getInt("DIA22");
                    totDIA23 = rst.getInt("DIA23");
                    totDIA24 = rst.getInt("DIA24");
                    totDIA25 = rst.getInt("DIA25");
                    totDIA26 = rst.getInt("DIA26");
                    totDIA27 = rst.getInt("DIA27");
                    totDIA28 = rst.getInt("DIA28");
                    totDIA29 = rst.getInt("DIA29");
                    totDIA30 = rst.getInt("DIA30");
                    totDIA31 = rst.getInt("DIA31");
                }
            }
            
            if (cs.getMoreResults()) {
                rst = cs.getResultSet();
            
                while (rst.next()) {
                    
                    bean = new CPF031Filter();
                    bean.FECHAP = filter.FECHAP;
                    bean.IN_USEAC = filter.IN_USEAC;
                    bean.IN_DATEFROM = filter.IN_DATEFROM;
                    bean.IN_DATETO = filter.IN_DATETO;

                    bean.USEAC = rst.getString("USEAC");
                    bean.DIA01 = rst.getInt("DIA01");
                    bean.DIA02 = rst.getInt("DIA02");
                    bean.DIA03 = rst.getInt("DIA03");
                    bean.DIA04 = rst.getInt("DIA04");
                    bean.DIA05 = rst.getInt("DIA05");
                    bean.DIA06 = rst.getInt("DIA06");
                    bean.DIA07 = rst.getInt("DIA07");
                    bean.DIA08 = rst.getInt("DIA08");
                    bean.DIA09 = rst.getInt("DIA09");
                    bean.DIA10 = rst.getInt("DIA10");
                    bean.DIA11 = rst.getInt("DIA11");
                    bean.DIA12 = rst.getInt("DIA12");
                    bean.DIA13 = rst.getInt("DIA13");
                    bean.DIA14 = rst.getInt("DIA14");
                    bean.DIA15 = rst.getInt("DIA15");
                    bean.DIA16 = rst.getInt("DIA16");
                    bean.DIA17 = rst.getInt("DIA17");
                    bean.DIA18 = rst.getInt("DIA18");
                    bean.DIA19 = rst.getInt("DIA19");
                    bean.DIA20 = rst.getInt("DIA20");
                    bean.DIA21 = rst.getInt("DIA21");
                    bean.DIA22 = rst.getInt("DIA22");
                    bean.DIA23 = rst.getInt("DIA23");
                    bean.DIA24 = rst.getInt("DIA24");
                    bean.DIA25 = rst.getInt("DIA25");
                    bean.DIA26 = rst.getInt("DIA26");
                    bean.DIA27 = rst.getInt("DIA27");
                    bean.DIA28 = rst.getInt("DIA28");
                    bean.DIA29 = rst.getInt("DIA29");
                    bean.DIA30 = rst.getInt("DIA30");
                    bean.DIA31 = rst.getInt("DIA31");
                    
                    bean.totDIA = bean.DIA01 + bean.DIA02 + bean.DIA03 + bean.DIA04 + bean.DIA05 + bean.DIA06 + bean.DIA07 + bean.DIA08 + bean.DIA09 + bean.DIA10 +
                                    bean.DIA11 + bean.DIA12 + bean.DIA13 + bean.DIA14 + bean.DIA15 + bean.DIA16 + bean.DIA17 + bean.DIA18 + bean.DIA19 + bean.DIA20 +
                                    bean.DIA21 + bean.DIA22 + bean.DIA23 + bean.DIA24 + bean.DIA25 + bean.DIA26 + bean.DIA27 + bean.DIA28 + bean.DIA29 + bean.DIA30 + bean.DIA31;
                    
                    longTotDIA = longTotDIA + bean.totDIA;
                    
                    bean.totDIA01 = totDIA01;
                    bean.totDIA02 = totDIA02;
                    bean.totDIA03 = totDIA03;
                    bean.totDIA04 = totDIA04;
                    bean.totDIA05 = totDIA05;
                    bean.totDIA06 = totDIA06;
                    bean.totDIA07 = totDIA07;
                    bean.totDIA08 = totDIA08;
                    bean.totDIA09 = totDIA09;
                    bean.totDIA10 = totDIA10;
                    bean.totDIA11 = totDIA11;
                    bean.totDIA12 = totDIA12;
                    bean.totDIA13 = totDIA13;
                    bean.totDIA14 = totDIA14;
                    bean.totDIA15 = totDIA15;
                    bean.totDIA16 = totDIA16;
                    bean.totDIA17 = totDIA17;
                    bean.totDIA18 = totDIA18;
                    bean.totDIA19 = totDIA19;
                    bean.totDIA20 = totDIA20;
                    bean.totDIA21 = totDIA21;
                    bean.totDIA22 = totDIA22;
                    bean.totDIA23 = totDIA23;
                    bean.totDIA24 = totDIA24;
                    bean.totDIA25 = totDIA25;
                    bean.totDIA26 = totDIA26;
                    bean.totDIA27 = totDIA27;
                    bean.totDIA28 = totDIA28;
                    bean.totDIA29 = totDIA29;
                    bean.totDIA30 = totDIA30;
                    bean.totDIA31 = totDIA31;
                    
                    //%
//                    bean.porcDIA01 = (double)bean.DIA01/(double)bean.totDIA01;
                    bean.porcDIA01 = Functions.redondear((double)bean.DIA01/(double)bean.totDIA01 *100, 2) + "%";
                    bean.porcDIA02 = Functions.redondear((double)bean.DIA02/(double)bean.totDIA02 *100, 2) + "%";
                    bean.porcDIA03 = Functions.redondear((double)bean.DIA03/(double)bean.totDIA03 *100, 2) + "%";
                    bean.porcDIA04 = Functions.redondear((double)bean.DIA04/(double)bean.totDIA04 *100, 2) + "%";
                    bean.porcDIA05 = Functions.redondear((double)bean.DIA05/(double)bean.totDIA05 *100, 2) + "%";
                    bean.porcDIA06 = Functions.redondear((double)bean.DIA06/(double)bean.totDIA06 *100, 2) + "%";
                    bean.porcDIA07 = Functions.redondear((double)bean.DIA07/(double)bean.totDIA07 *100, 2) + "%";
                    bean.porcDIA08 = Functions.redondear((double)bean.DIA08/(double)bean.totDIA08 *100, 2) + "%";
                    bean.porcDIA09 = Functions.redondear((double)bean.DIA09/(double)bean.totDIA09 *100, 2) + "%";
                    bean.porcDIA10 = Functions.redondear((double)bean.DIA10/(double)bean.totDIA10 *100, 2) + "%";
                    bean.porcDIA11 = Functions.redondear((double)bean.DIA11/(double)bean.totDIA11 *100, 2) + "%";
                    bean.porcDIA12 = Functions.redondear((double)bean.DIA12/(double)bean.totDIA12 *100, 2) + "%";
                    bean.porcDIA13 = Functions.redondear((double)bean.DIA13/(double)bean.totDIA13 *100, 2) + "%";
                    bean.porcDIA14 = Functions.redondear((double)bean.DIA14/(double)bean.totDIA14 *100, 2) + "%";
                    bean.porcDIA15 = Functions.redondear((double)bean.DIA15/(double)bean.totDIA15 *100, 2) + "%";
                    bean.porcDIA16 = Functions.redondear((double)bean.DIA16/(double)bean.totDIA16 *100, 2) + "%";
                    bean.porcDIA17 = Functions.redondear((double)bean.DIA17/(double)bean.totDIA17 *100, 2) + "%";
                    bean.porcDIA18 = Functions.redondear((double)bean.DIA18/(double)bean.totDIA18 *100, 2) + "%";
                    bean.porcDIA19 = Functions.redondear((double)bean.DIA19/(double)bean.totDIA19 *100, 2) + "%";
                    bean.porcDIA20 = Functions.redondear((double)bean.DIA20/(double)bean.totDIA20 *100, 2) + "%";
                    bean.porcDIA21 = Functions.redondear((double)bean.DIA21/(double)bean.totDIA21 *100, 2) + "%";
                    bean.porcDIA22 = Functions.redondear((double)bean.DIA22/(double)bean.totDIA22 *100, 2) + "%";
                    bean.porcDIA23 = Functions.redondear((double)bean.DIA23/(double)bean.totDIA23 *100, 2) + "%";
                    bean.porcDIA24 = Functions.redondear((double)bean.DIA24/(double)bean.totDIA24 *100, 2) + "%";
                    bean.porcDIA25 = Functions.redondear((double)bean.DIA25/(double)bean.totDIA25 *100, 2) + "%";
                    bean.porcDIA26 = Functions.redondear((double)bean.DIA26/(double)bean.totDIA26 *100, 2) + "%";
                    bean.porcDIA27 = Functions.redondear((double)bean.DIA27/(double)bean.totDIA27 *100, 2) + "%";
                    bean.porcDIA28 = Functions.redondear((double)bean.DIA28/(double)bean.totDIA28 *100, 2) + "%";
                    bean.porcDIA29 = Functions.redondear((double)bean.DIA29/(double)bean.totDIA29 *100, 2) + "%";
                    bean.porcDIA30 = Functions.redondear((double)bean.DIA30/(double)bean.totDIA30 *100, 2) + "%";
                    bean.porcDIA31 = Functions.redondear((double)bean.DIA31/(double)bean.totDIA31 *100, 2) + "%";
                    
//                    bean.totPorcDIA = Functions.redondear((double)bean.totDIA/(double)longTotDIA *100, 2) + "%";

                    lista.add(bean);
                }
            }
            
            for (int i = 0; i < lista.size(); i++) {
                lista.get(i).longTotDIA = longTotDIA;       
                lista.get(i).totPorcDIA = Functions.redondear((double)lista.get(i).totDIA/(double)longTotDIA *100, 2) + "%";
            }
            
            hm.put("lst1", lista);
            hm.put("lst2", lista2);

            setClose();

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            setClose();
        }

        return hm;

    }

    public List<CPF030Filter> searchProcessDay(CPF031Filter filter, String flag) throws Exception {

        List<CPF030Filter> lista = new ArrayList<>();
        CPF030Filter bean;

        try {

            String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP03773(?,?,?,?,?,?,?)}";

            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cs = cnx.prepareCall(SQLCLL01);
            cs.registerOutParameter(4, Types.INTEGER);
            cs.registerOutParameter(5, Types.INTEGER);
            cs.registerOutParameter(6, Types.INTEGER);
            cs.registerOutParameter(7, Types.INTEGER);

            cs.setString(1, session.getUserView().getCustomerInfo().CCUST);
            cs.setString(2, filter.USEAC);
            cs.setString(3, filter.FECAC);

            cs.setInt(4, filter.page.PAGNUM);
            cs.setInt(5, filter.page.PAGROW);
            cs.setInt(6, filter.page.TOTPAG);
            cs.setInt(7, filter.page.TOTROW);
            cs.execute();

            filter.page.PAGNUM = cs.getInt(4);
            filter.page.PAGROW = cs.getInt(5);
            filter.page.TOTPAG = cs.getInt(6);
            filter.page.TOTROW = cs.getInt(7);

            rst = cs.getResultSet();

            while (rst.next()) {
                bean = new CPF030Filter();
                bean.totPRODUS = filter.PRODUS;
                bean.USEAC = filter.USEAC;
                bean.FECAC = filter.FECAC;

                bean.RN = rst.getInt("RN");
                bean.FCARG = rst.getString("FCARG").trim();
                bean.FASIG = rst.getString("FASIG").trim();
                bean.FECAC = rst.getString("FECAC").trim();
                bean.subFECAC = bean.FECAC.substring(0, 6);
                bean.DIAAC = rst.getString("DIAAC").trim();
                bean.USEAC = rst.getString("USEAC").trim();
                bean.HORAI = rst.getString("HORAI").trim();
                bean.HORASR = rst.getString("HORASR").trim();
                bean.HORAIR = rst.getString("HORAIR").trim();
                bean.HORAS = rst.getString("HORAS").trim();
                bean.TIPO = rst.getString("TIPO").trim();
                bean.TMOTI = rst.getString("TMOTI").trim();
                if (bean.TMOTI.equals("I")) {
                    bean.desTMOTI = "Involuntary";
                } else if (bean.TMOTI.equals("V")) {
                    bean.desTMOTI = "Voluntary";
                } else if (bean.TMOTI.equals("W")) {
                    bean.desTMOTI = "Waiver";
                } else if (bean.TMOTI.equals("E")) {
                    bean.desTMOTI = "Exception";
                } else {
                    bean.desTMOTI = bean.TMOTI;
                }
                bean.TEMI = rst.getString("TEMI").trim();
                if (bean.TEMI.equals("1")) {
                    bean.desTEMI = "Primera Emision";
                } else if (bean.TEMI.equals("2")) {
                    bean.desTEMI = "Reemision";
                } else {
                    bean.desTEMI = bean.TEMI;
                }
                bean.TRFND = rst.getString("TRFND").trim();
                if (bean.TRFND.equals("P")) {
                    bean.desTRFND = "Parcial";
                } else if (bean.TRFND.equals("T")) {
                    bean.desTRFND = "Total";
                } else {
                    bean.desTRFND = bean.TRFND;
                }
                bean.ESTAD = rst.getString("ESTAD").trim();
                if (bean.ESTAD.equals("0")) {
                    bean.desESTAD = "Procesado/Autorizado-RF";
                } else if (bean.ESTAD.equals("1")) {
                    bean.desESTAD = "Renegado/Rechazado";
                } else if (bean.ESTAD.equals("2")) {
                    bean.desESTAD = "En consulta";
                } else if (bean.ESTAD.equals("4")) {
                    bean.desESTAD = "Bajo Revision";
                } else if (bean.ESTAD.equals("5")) {
                    bean.desESTAD = "Devuelto a Lan";
                } else if (bean.ESTAD.equals("6")) {
                    bean.desESTAD = "Procesado Contact Cente";
                } else if (bean.ESTAD.equals("7")) {
                    bean.desESTAD = "Enviada a Cus/Operacion";
                } else if (bean.ESTAD.equals("8")) {
                    bean.desESTAD = "Pagado por sap";
                } else {
                    bean.desESTAD = bean.ESTAD;
                }
                bean.TKT = rst.getString("TKT").trim();
                bean.HORAC = rst.getString("HORAC").trim();
                bean.MINCAL = rst.getString("MINCAL").trim();
                bean.MINDET = rst.getString("MINDET").trim();
                bean.RULE = rst.getString("RULE").trim();
                bean.HORCAL = rst.getString("HORCAL").trim();

                bean.page.PAGNUM = filter.page.PAGNUM;
                bean.page.PAGROW = filter.page.PAGROW;
                bean.page.TOTPAG = filter.page.TOTPAG;
                bean.page.TOTROW = filter.page.TOTROW;
                lista.add(bean);
            }

            setClose();

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            setClose();
        }

        return lista;

    }
    
    private void setClose() {
        if (rst != null) {
            try {
                rst.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        if (cs != null) {
            try {
                cs.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        //===============
        try {
            session.getCNXIBMDB2().closeIBMDB2Connection(cnx);
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }
    
    public String loadSQP04496(CPF030Filter filter) throws Exception {
        String message = "OK";
        CallableStatement cstmt = null;
        String SQLCLL01 = "{CALL " + session.getMainLibrary() + ".SQP04496(?,?,?,?)}";

        try {
            cnx = session.getCNXIBMDB2().getIBMDB2Connection();
            cstmt = cnx.prepareCall(SQLCLL01);

            cstmt.registerOutParameter(4, Types.VARCHAR);

            cstmt.setString(1, session.getUserView().getCustomerInfo().CCUST.trim());
            cstmt.setString(2, filter.IN_DATEFROM.trim());
            cstmt.setString(3, filter.IN_DATETO.trim());
            cstmt.setString(4, "");

            cstmt.execute();

            message = cstmt.getString(4);

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            setClose();
        }

        return message;
    }
}
