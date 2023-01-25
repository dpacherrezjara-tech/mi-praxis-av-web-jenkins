/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package net.miatech.libmiatec.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

import net.miatech.provider.ConnectionIBMDB2Server;
import net.miatech.libmiatec.A1440;
import net.miatech.libmiatec.F001;
import net.miatech.libmiatec.F014;
import net.miatech.libmiatec.F015;
import net.miatech.libmiatec.F016;
import net.miatech.libmiatec.F017;
import net.miatech.libmiatec.F018;
import net.miatech.libmiatec.F019;
import net.miatech.libmiatec.F020;
import net.miatech.libmiatec.F023;
import net.miatech.libmiatec.F024;
import net.miatech.libmiatec.F025;
import net.miatech.libmiatec.F060;
import net.miatech.libmiatec.F061;
import net.miatech.libmiatec.F062;

/**
 *
 * @author rmayta
 */
public class Libmiatec {
    public ConnectionIBMDB2Server cnxIBMDB2;
    public String CUSTOMER_CODE = "";

    public Libmiatec(){
        
    }

    public A1440 getA1440(String RSNCD) throws SQLException {
        return getA1440(RSNCD, "20111001", "99999999");
    }

    public A1440 getA1440(String RSNCD, String EFEC, String DISC) throws SQLException {
        A1440 fileA1440 = new A1440();

        // <editor-fold defaultstate="collapsed" desc="{...} SQLQRY01">
        String SQLQRY01 = "SELECT "
                + "RTRIM(A1440RSNCD) AS A1440RSNCD, RTRIM(A1440EFEC) AS A1440EFEC, RTRIM(A1440DISC) AS A1440DISC, RTRIM(A1440RSNTX) AS A1440RSNTX, RTRIM(A1440RSNTP) AS A1440RSNTP, RTRIM(A1440BRKID) AS A1440BRKID, RTRIM(A1440TYPTR) AS A1440TYPTR, RTRIM(A1440FARFL) AS A1440FARFL, RTRIM(A1440ISCFL) AS A1440ISCFL, RTRIM(A1440OTCFL) AS A1440OTCFL, RTRIM(A1440UATFL) AS A1440UATFL, RTRIM(A1440HAFFL) AS A1440HAFFL, RTRIM(A1440TAXFL) AS A1440TAXFL, RTRIM(A1440VATFL) AS A1440VATFL, RTRIM(A1440INGRE) AS A1440INGRE, RTRIM(A1440FINGR) AS A1440FINGR, RTRIM(A1440HINGR) AS A1440HINGR, RTRIM(A1440REVIS) AS A1440REVIS, RTRIM(A1440FREVI) AS A1440FREVI, RTRIM(A1440HREVI) AS A1440HREVI"
                + " FROM LIBMIATEC.A1440 WHERE "
                + "A1440RSNCD = '" + RSNCD + "' AND "
                + "A1440EFEC = '" + EFEC + "' AND "
                + "A1440DISC = '" + DISC + "'";
        // </editor-fold>

        Statement stmt01 = cnxIBMDB2.getConnection().createStatement();
        ResultSet rs01 = stmt01.executeQuery(SQLQRY01);
        if(rs01.next()){
            fileA1440.A1440RSNCD = rs01.getString("A1440RSNCD");
            fileA1440.A1440EFEC = rs01.getString("A1440EFEC");
            fileA1440.A1440DISC = rs01.getString("A1440DISC");
            fileA1440.A1440RSNTX = rs01.getString("A1440RSNTX");
            fileA1440.A1440RSNTP = rs01.getString("A1440RSNTP");
            fileA1440.A1440BRKID = rs01.getString("A1440BRKID");
            fileA1440.A1440TYPTR = rs01.getString("A1440TYPTR");
            fileA1440.A1440FARFL = rs01.getString("A1440FARFL");
            fileA1440.A1440ISCFL = rs01.getString("A1440ISCFL");
            fileA1440.A1440OTCFL = rs01.getString("A1440OTCFL");
            fileA1440.A1440UATFL = rs01.getString("A1440UATFL");
            fileA1440.A1440HAFFL = rs01.getString("A1440HAFFL");
            fileA1440.A1440TAXFL = rs01.getString("A1440TAXFL");
            fileA1440.A1440VATFL = rs01.getString("A1440VATFL");
            fileA1440.A1440INGRE = rs01.getString("A1440INGRE");
            fileA1440.A1440FINGR = rs01.getString("A1440FINGR");
            fileA1440.A1440HINGR = rs01.getString("A1440HINGR");
            fileA1440.A1440REVIS = rs01.getString("A1440REVIS");
            fileA1440.A1440FREVI = rs01.getString("A1440FREVI");
            fileA1440.A1440HREVI = rs01.getString("A1440HREVI");

            fileA1440.FOUND = true;
        }
        rs01.close();
        stmt01.close();

        return fileA1440;
    }

    public F001 getF001(int NBRID) throws SQLException {
        return getF001(CUSTOMER_CODE, NBRID);
    }

    public F001 getF001(String CSTID, int NBRID) throws SQLException {
        F001 file001 = new F001();

        // <editor-fold defaultstate="collapsed" desc="{...} SQLQRY01">
        String SQLQRY01 = "SELECT "
                + "RTRIM(F001CSTID) AS F001CSTID, F001NBRID, RTRIM(F001BLACD3) AS F001BLACD3, RTRIM(F001BDACD3) AS F001BDACD3, RTRIM(F001INVNBA) AS F001INVNBA, RTRIM(F001COLCD3) AS F001COLCD3, RTRIM(F001COBCD3) AS F001COBCD3, RTRIM(F001IDECID) AS F001IDECID, RTRIM(F001BLACD) AS F001BLACD, RTRIM(F001BDACD) AS F001BDACD, RTRIM(F001BILCD) AS F001BILCD, RTRIM(F001INVNB) AS F001INVNB, RTRIM(F001BILDTY) AS F001BILDTY, RTRIM(F001BILDTM) AS F001BILDTM, RTRIM(F001BILDTD) AS F001BILDTD, RTRIM(F001COLCD) AS F001COLCD, RTRIM(F001COBCD) AS F001COBCD, RTRIM(F001PERNB) AS F001PERNB, RTRIM(F001SMTID) AS F001SMTID, RTRIM(F001DGSFL) AS F001DGSFL, RTRIM(F001INVDTY) AS F001INVDTY, RTRIM(F001INVDTM) AS F001INVDTM, RTRIM(F001INVDTD) AS F001INVDTD, F001LTBRT, RTRIM(F001PRVDTY) AS F001PRVDTY, RTRIM(F001PRVDTM) AS F001PRVDTM, RTRIM(F001PRVDTD) AS F001PRVDTD, RTRIM(F001NFCFL) AS F001NFCFL, RTRIM(F001SPDFL) AS F001SPDFL, RTRIM(F001BLLID) AS F001BLLID, RTRIM(F001BDLID) AS F001BDLID, RTRIM(F001INVTP) AS F001INVTP, RTRIM(F001USIID) AS F001USIID, RTRIM(F001USIDT) AS F001USIDT, RTRIM(F001USITM) AS F001USITM, RTRIM(F001USMID) AS F001USMID, RTRIM(F001USMDT) AS F001USMDT, RTRIM(F001USMTM) AS F001USMTM"
                + " FROM LIBMIATEC.F001 WHERE "
                + "F001CSTID = '" + CSTID + "' AND "
                + "F001NBRID = '" + NBRID + "'";
        // </editor-fold>

        Statement stmt01 = cnxIBMDB2.getConnection().createStatement();
        ResultSet rs01 = stmt01.executeQuery(SQLQRY01);
        if(rs01.next()){
            file001.F001CSTID = rs01.getString("F001CSTID");
            file001.F001NBRID = rs01.getInt("F001NBRID");
            file001.F001BLACD3 = rs01.getString("F001BLACD3");
            file001.F001BDACD3 = rs01.getString("F001BDACD3");
            file001.F001INVNBA = rs01.getString("F001INVNBA");
            file001.F001COLCD3 = rs01.getString("F001COLCD3");
            file001.F001COBCD3 = rs01.getString("F001COBCD3");
            file001.F001IDECID = rs01.getString("F001IDECID");
            file001.F001BLACD = rs01.getString("F001BLACD");
            file001.F001BDACD = rs01.getString("F001BDACD");
            file001.F001BILCD = rs01.getString("F001BILCD");
            file001.F001INVNB = rs01.getString("F001INVNB");
            file001.F001BILDTY = rs01.getString("F001BILDTY");
            file001.F001BILDTM = rs01.getString("F001BILDTM");
            file001.F001BILDTD = rs01.getString("F001BILDTD");
            file001.F001COLCD = rs01.getString("F001COLCD");
            file001.F001COBCD = rs01.getString("F001COBCD");
            file001.F001PERNB = rs01.getString("F001PERNB");
            file001.F001SMTID = rs01.getString("F001SMTID");
            file001.F001DGSFL = rs01.getString("F001DGSFL");
            file001.F001INVDTY = rs01.getString("F001INVDTY");
            file001.F001INVDTM = rs01.getString("F001INVDTM");
            file001.F001INVDTD = rs01.getString("F001INVDTD");
            file001.F001LTBRT = rs01.getDouble("F001LTBRT");
            file001.F001PRVDTY = rs01.getString("F001PRVDTY");
            file001.F001PRVDTM = rs01.getString("F001PRVDTM");
            file001.F001PRVDTD = rs01.getString("F001PRVDTD");
            file001.F001NFCFL = rs01.getString("F001NFCFL");
            file001.F001SPDFL = rs01.getString("F001SPDFL");
            file001.F001BLLID = rs01.getString("F001BLLID");
            file001.F001BDLID = rs01.getString("F001BDLID");
            file001.F001INVTP = rs01.getString("F001INVTP");
            file001.F001USIID = rs01.getString("F001USIID");
            file001.F001USIDT = rs01.getString("F001USIDT");
            file001.F001USITM = rs01.getString("F001USITM");
            file001.F001USMID = rs01.getString("F001USMID");
            file001.F001USMDT = rs01.getString("F001USMDT");
            file001.F001USMTM = rs01.getString("F001USMTM");

            file001.FOUND = true;
        }
        rs01.close();
        stmt01.close();

        return file001;
    }

    public F014 getF014(int NBRID, int SRCCDA, int BRKSQA) throws SQLException {
        return getF014(CUSTOMER_CODE, NBRID, SRCCDA, BRKSQA);
    }

    public F014 getF014(String CSTID, int NBRID, int SRCCDA, int BRKSQA) throws SQLException {
        F014 fileF014 = new F014();

        // <editor-fold defaultstate="collapsed" desc="{...} SQLQRY01">
        String SQLQRY01 = "SELECT "
                    + "ROW_NUMBER() OVER() AS ROWNUM,"
                    + "RTRIM(F014CSTID) AS F014CSTID, F014NBRID, F014SRCCDA, F014BRKSQA, RTRIM(F014BATSQA) AS F014BATSQA, RTRIM(F014RCBSQA) AS F014RCBSQA, RTRIM(F014BATSQ) AS F014BATSQ, RTRIM(F014RCBSQ) AS F014RCBSQ, RTRIM(F014YRINBA) AS F014YRINBA, RTRIM(F014YRRNBA) AS F014YRRNBA, RTRIM(F014RBCNB) AS F014RBCNB, RTRIM(F014RSTFL) AS F014RSTFL, RTRIM(F014SRCCD) AS F014SRCCD, RTRIM(F014RSNCD) AS F014RSNCD, RTRIM(F014OURTX) AS F014OURTX, RTRIM(F014YRINB) AS F014YRINB, RTRIM(F014YRIDTY) AS F014YRIDTY, RTRIM(F014YRIDTM) AS F014YRIDTM, RTRIM(F014YRIDTP) AS F014YRIDTP, RTRIM(F014YRRNB) AS F014YRRNB, RTRIM(F014FBCNB) AS F014FBCNB, RTRIM(F014FCPNB) AS F014FCPNB,"
                    + "F014GRSBAM, F014GRSAAM, F014GRSDAM, F014TAXBAM, F014TAXAAM, F014TAXDAM, F014ISCWAM, F014ISCAAM, F014ISCDAM, F014OTCWAM, F014OTCAAM, F014OTCDAM, F014HAFWAM, F014HAFAAM, F014HAFDAM, F014UATWAM, F014UATAAM, F014UATDAM, F014VATBAM, F014VATAAM, F014VATDAM, F014NTRMAM, F014SPCRT, F014NASAM,"
                    + "RTRIM(F014ATOFL) AS F014ATOFL, RTRIM(F014ATVFL) AS F014ATVFL, F014ATTQT, RTRIM(F014OWUTX) AS F014OWUTX, RTRIM(F014ISVFL) AS F014ISVFL, RTRIM(F014ISRFL) AS F014ISRFL, RTRIM(F014FBCFL) AS F014FBCFL, RTRIM(F014FTERM) AS F014FTERM, RTRIM(F014PRERM) AS F014PRERM, RTRIM(F014CIATK) AS F014CIATK, RTRIM(F014FORTK) AS F014FORTK, RTRIM(F014SERTK) AS F014SERTK, RTRIM(F014CPNTK) AS F014CPNTK, RTRIM(F014DCHTK) AS F014DCHTK,"
                    + "RTRIM(F014USIID) AS F014USIID, RTRIM(F014USIDT) AS F014USIDT, RTRIM(F014USITM) AS F014USITM, RTRIM(F014USMID) AS F014USMID, RTRIM(F014USMDT) AS F014USMDT, RTRIM(F014USMTM) AS F014USMTM"
                    + " FROM LIBMIATEC.F014 WHERE "
                    + "F014CSTID = '" + CSTID + "' AND "
                    + "F014NBRID = '" + NBRID + "' AND "
                    + "F014SRCCDA = '" + SRCCDA + "' AND "
                    + "F014BRKSQA = '" + BRKSQA + "'";
        // </editor-fold>

        Statement stmt01 = cnxIBMDB2.getConnection().createStatement();
        ResultSet rs01 = stmt01.executeQuery(SQLQRY01);
        if(rs01.next()){
            fileF014.F014CSTID = rs01.getString("F014CSTID");
            fileF014.F014NBRID = rs01.getInt("F014NBRID");
            fileF014.F014SRCCDA = rs01.getInt("F014SRCCDA");
            fileF014.F014BRKSQA = rs01.getInt("F014BRKSQA");
            fileF014.F014BATSQA = rs01.getString("F014BATSQA");
            fileF014.F014RCBSQA = rs01.getString("F014RCBSQA");
            fileF014.F014BATSQ = rs01.getString("F014BATSQ");
            fileF014.F014RCBSQ = rs01.getString("F014RCBSQ");
            fileF014.F014YRINBA = rs01.getString("F014YRINBA");
            fileF014.F014YRRNBA = rs01.getString("F014YRRNBA");
            fileF014.F014RBCNB = rs01.getString("F014RBCNB");
            fileF014.F014RSTFL = rs01.getString("F014RSTFL");
            fileF014.F014SRCCD = rs01.getString("F014SRCCD");
            fileF014.F014RSNCD = rs01.getString("F014RSNCD");
            fileF014.F014OURTX = rs01.getString("F014OURTX");
            fileF014.F014YRINB = rs01.getString("F014YRINB");
            fileF014.F014YRIDTY = rs01.getString("F014YRIDTY");
            fileF014.F014YRIDTM = rs01.getString("F014YRIDTM");
            fileF014.F014YRIDTP = rs01.getString("F014YRIDTP");
            fileF014.F014YRRNB = rs01.getString("F014YRRNB");
            fileF014.F014FBCNB = rs01.getString("F014FBCNB");
            fileF014.F014FCPNB = rs01.getString("F014FCPNB");
            fileF014.F014GRSBAM = rs01.getDouble("F014GRSBAM");
            fileF014.F014GRSAAM = rs01.getDouble("F014GRSAAM");
            fileF014.F014GRSDAM = rs01.getDouble("F014GRSDAM");
            fileF014.F014TAXBAM = rs01.getDouble("F014TAXBAM");
            fileF014.F014TAXAAM = rs01.getDouble("F014TAXAAM");
            fileF014.F014TAXDAM = rs01.getDouble("F014TAXDAM");
            fileF014.F014ISCWAM = rs01.getDouble("F014ISCWAM");
            fileF014.F014ISCAAM = rs01.getDouble("F014ISCAAM");
            fileF014.F014ISCDAM = rs01.getDouble("F014ISCDAM");
            fileF014.F014OTCWAM = rs01.getDouble("F014OTCWAM");
            fileF014.F014OTCAAM = rs01.getDouble("F014OTCAAM");
            fileF014.F014OTCDAM = rs01.getDouble("F014OTCDAM");
            fileF014.F014HAFWAM = rs01.getDouble("F014HAFWAM");
            fileF014.F014HAFAAM = rs01.getDouble("F014HAFAAM");
            fileF014.F014HAFDAM = rs01.getDouble("F014HAFDAM");
            fileF014.F014UATWAM = rs01.getDouble("F014UATWAM");
            fileF014.F014UATAAM = rs01.getDouble("F014UATAAM");
            fileF014.F014UATDAM = rs01.getDouble("F014UATDAM");
            fileF014.F014VATBAM = rs01.getDouble("F014VATBAM");
            fileF014.F014VATAAM = rs01.getDouble("F014VATAAM");
            fileF014.F014VATDAM = rs01.getDouble("F014VATDAM");
            fileF014.F014NTRMAM = rs01.getDouble("F014NTRMAM");
            fileF014.F014SPCRT = rs01.getDouble("F014SPCRT");
            fileF014.F014NASAM = rs01.getDouble("F014NASAM");
            fileF014.F014ATOFL = rs01.getString("F014ATOFL");
            fileF014.F014ATVFL = rs01.getString("F014ATVFL");
            fileF014.F014ATTQT = rs01.getInt("F014ATTQT");
            fileF014.F014OWUTX = rs01.getString("F014OWUTX");
            fileF014.F014ISVFL = rs01.getString("F014ISVFL");
            fileF014.F014ISRFL = rs01.getString("F014ISRFL");
            fileF014.F014FBCFL = rs01.getString("F014FBCFL");
            fileF014.F014FTERM = rs01.getString("F014FTERM");
            fileF014.F014PRERM = rs01.getString("F014PRERM");
            fileF014.F014CIATK = rs01.getString("F014CIATK");
            fileF014.F014FORTK = rs01.getString("F014FORTK");
            fileF014.F014SERTK = rs01.getString("F014SERTK");
            fileF014.F014CPNTK = rs01.getString("F014CPNTK");
            fileF014.F014DCHTK = rs01.getString("F014DCHTK");
            fileF014.F014USIID = rs01.getString("F014USIID");
            fileF014.F014USIDT = rs01.getString("F014USIDT");
            fileF014.F014USITM = rs01.getString("F014USITM");
            fileF014.F014USMID = rs01.getString("F014USMID");
            fileF014.F014USMDT = rs01.getString("F014USMDT");
            fileF014.F014USMTM = rs01.getString("F014USMTM");

            fileF014.FOUND = true;
        }
        rs01.close();
        stmt01.close();

        return fileF014;
    }

    public F015 getF015(int NBRID, int SRCCDA, int BRKSQA, int RMKSQB) throws SQLException {
        return getF015(CUSTOMER_CODE, NBRID, SRCCDA, BRKSQA, RMKSQB);
    }

    public F015 getF015(String CSTID, int NBRID, int SRCCDA, int BRKSQA, int RMKSQB) throws SQLException {
        F015 fileF015 = new F015();

        // <editor-fold defaultstate="collapsed" desc="{...} SQLQRY01">
        String SQLQRY01 = "SELECT "
                + "RTRIM(F015CSTID) AS F015CSTID, F015NBRID, F015SRCCDA, F015BRKSQA, F015RMKSQB, RTRIM(F015RBCNB) AS F015RBCNB, RTRIM(F015RMKTX1) AS F015RMKTX1, RTRIM(F015RMKTX2) AS F015RMKTX2, RTRIM(F015RMKTX3) AS F015RMKTX3, RTRIM(F015RMKTX4) AS F015RMKTX4, RTRIM(F015RMKTX5) AS F015RMKTX5, RTRIM(F015USIID) AS F015USIID, RTRIM(F015USIDT) AS F015USIDT, RTRIM(F015USITM) AS F015USITM, RTRIM(F015USMID) AS F015USMID, RTRIM(F015USMDT) AS F015USMDT, RTRIM(F015USMTM) AS F015USMTM"
                + " FROM LIBMIATEC.F015 WHERE "
                + "F015CSTID = '" + CSTID + "' AND "
                + "F015NBRID = '" + NBRID + "' AND "
                + "F015SRCCDA = '" + SRCCDA + "' AND "
                + "F015BRKSQA = '" + BRKSQA + "' AND "
                + "F015RMKSQB = '" + RMKSQB + "'";
        // </editor-fold>

        Statement stmt01 = cnxIBMDB2.getConnection().createStatement();
        ResultSet rs01 = stmt01.executeQuery(SQLQRY01);
        if(rs01.next()){
            fileF015.F015CSTID = rs01.getString("F015CSTID");
            fileF015.F015NBRID = rs01.getInt("F015NBRID");
            fileF015.F015SRCCDA = rs01.getInt("F015SRCCDA");
            fileF015.F015BRKSQA = rs01.getInt("F015BRKSQA");
            fileF015.F015RMKSQB = rs01.getInt("F015RMKSQB");
            fileF015.F015RBCNB = rs01.getString("F015RBCNB");
            fileF015.F015RMKTX1 = rs01.getString("F015RMKTX1");
            fileF015.F015RMKTX2 = rs01.getString("F015RMKTX2");
            fileF015.F015RMKTX3 = rs01.getString("F015RMKTX3");
            fileF015.F015RMKTX4 = rs01.getString("F015RMKTX4");
            fileF015.F015RMKTX5 = rs01.getString("F015RMKTX5");
            fileF015.F015USIID = rs01.getString("F015USIID");
            fileF015.F015USIDT = rs01.getString("F015USIDT");
            fileF015.F015USITM = rs01.getString("F015USITM");
            fileF015.F015USMID = rs01.getString("F015USMID");
            fileF015.F015USMDT = rs01.getString("F015USMDT");
            fileF015.F015USMTM = rs01.getString("F015USMTM");

            fileF015.FOUND = true;
        }
        rs01.close();
        stmt01.close();

        return fileF015;
    }

    public F015[] getF015_A(int NBRID, int SRCCDA, int BRKSQA) throws SQLException {
        return getF015_A(CUSTOMER_CODE, NBRID, SRCCDA, BRKSQA);
    }

    public F015[] getF015_A(String CSTID, int NBRID, int SRCCDA, int BRKSQA) throws SQLException {

        ArrayList<F015> listF015 = new ArrayList<F015>(0);
        F015 fileF015;

        // <editor-fold defaultstate="collapsed" desc="{...} SQLQRY01">
        String SQLQRY01 = "SELECT "
                + "RTRIM(F015CSTID) AS F015CSTID, F015NBRID, F015SRCCDA, F015BRKSQA, F015RMKSQB, RTRIM(F015RBCNB) AS F015RBCNB, RTRIM(F015RMKTX1) AS F015RMKTX1, RTRIM(F015RMKTX2) AS F015RMKTX2, RTRIM(F015RMKTX3) AS F015RMKTX3, RTRIM(F015RMKTX4) AS F015RMKTX4, RTRIM(F015RMKTX5) AS F015RMKTX5, RTRIM(F015USIID) AS F015USIID, RTRIM(F015USIDT) AS F015USIDT, RTRIM(F015USITM) AS F015USITM, RTRIM(F015USMID) AS F015USMID, RTRIM(F015USMDT) AS F015USMDT, RTRIM(F015USMTM) AS F015USMTM"
                + " FROM LIBMIATEC.F015 WHERE "
                + "F015CSTID = '" + CSTID + "' AND "
                + "F015NBRID = '" + NBRID + "' AND "
                + "F015SRCCDA = '" + SRCCDA + "' AND "
                + "F015BRKSQA = '" + BRKSQA + "'";
        // </editor-fold>

        Statement stmt01 = cnxIBMDB2.getConnection().createStatement();
        ResultSet rs01 = stmt01.executeQuery(SQLQRY01);
        while(rs01.next()){
            fileF015 = new F015();
            fileF015.F015CSTID = rs01.getString("F015CSTID");
            fileF015.F015NBRID = rs01.getInt("F015NBRID");
            fileF015.F015SRCCDA = rs01.getInt("F015SRCCDA");
            fileF015.F015BRKSQA = rs01.getInt("F015BRKSQA");
            fileF015.F015RMKSQB = rs01.getInt("F015RMKSQB");
            fileF015.F015RBCNB = rs01.getString("F015RBCNB");
            fileF015.F015RMKTX1 = rs01.getString("F015RMKTX1");
            fileF015.F015RMKTX2 = rs01.getString("F015RMKTX2");
            fileF015.F015RMKTX3 = rs01.getString("F015RMKTX3");
            fileF015.F015RMKTX4 = rs01.getString("F015RMKTX4");
            fileF015.F015RMKTX5 = rs01.getString("F015RMKTX5");
            fileF015.F015USIID = rs01.getString("F015USIID");
            fileF015.F015USIDT = rs01.getString("F015USIDT");
            fileF015.F015USITM = rs01.getString("F015USITM");
            fileF015.F015USMID = rs01.getString("F015USMID");
            fileF015.F015USMDT = rs01.getString("F015USMDT");
            fileF015.F015USMTM = rs01.getString("F015USMTM");

            fileF015.FOUND = true;

            listF015.add(fileF015);
        }
        rs01.close();
        stmt01.close();

        return listF015.toArray(new F015[listF015.size()]);
    }

    public F016 getF016(int NBRID, int SRCCDA, int BRKSQA, int VATSQB) throws SQLException {
        return getF016(CUSTOMER_CODE, NBRID, SRCCDA, BRKSQA, VATSQB);
    }

    public F016 getF016(String CSTID, int NBRID, int SRCCDA, int BRKSQA, int VATSQB) throws SQLException {
        F016 fileF016 = new F016();

        // <editor-fold defaultstate="collapsed" desc="{...} SQLQRY01">
        String SQLQRY01 = "SELECT "
                + "RTRIM(F016CSTID) AS F016CSTID, F016NBRID, F016SRCCDA, F016BRKSQA, F016VATSQB,"
                + "RTRIM(F016RBCNB) AS F016RBCNB, RTRIM(F016VATID1) AS F016VATID1, RTRIM(F016VATLB1) AS F016VATLB1, RTRIM(F016VATTX1) AS F016VATTX1,"
                + "F016VTBAM1, F016VTPPC1, F016VATAM1,"
                + "RTRIM(F016USIID) AS F016USIID, RTRIM(F016USIDT) AS F016USIDT, RTRIM(F016USITM) AS F016USITM, RTRIM(F016USMID) AS F016USMID, RTRIM(F016USMDT) AS F016USMDT, RTRIM(F016USMTM) AS F016USMTM"
                + " FROM LIBMIATEC.F016 WHERE "
                + "F016CSTID = '" + CSTID + "' AND "
                + "F016NBRID = '" + NBRID + "' AND "
                + "F016SRCCDA = '" + SRCCDA + "' AND "
                + "F016BRKSQA = '" + BRKSQA + "' AND "
                + "F017VATSQB = '" + VATSQB + "'";
        // </editor-fold>

        Statement stmt01 = cnxIBMDB2.getConnection().createStatement();
        ResultSet rs01 = stmt01.executeQuery(SQLQRY01);
        if(rs01.next()){
            fileF016.F016CSTID = rs01.getString("F016CSTID");
            fileF016.F016NBRID = rs01.getInt("F016NBRID");
            fileF016.F016SRCCDA = rs01.getInt("F016SRCCDA");
            fileF016.F016BRKSQA = rs01.getInt("F016BRKSQA");
            fileF016.F016VATSQB = rs01.getInt("F016VATSQB");
            fileF016.F016RBCNB = rs01.getString("F016RBCNB");
            fileF016.F016VATID1 = rs01.getString("F016VATID1");
            fileF016.F016VATLB1 = rs01.getString("F016VATLB1");
            fileF016.F016VATTX1 = rs01.getString("F016VATTX1");
            fileF016.F016VTBAM1 = rs01.getDouble("F016VTBAM1");
            fileF016.F016VTPPC1 = rs01.getDouble("F016VTPPC1");
            fileF016.F016VATAM1 = rs01.getDouble("F016VATAM1");
            fileF016.F016USIID = rs01.getString("F016USIID");
            fileF016.F016USIDT = rs01.getString("F016USIDT");
            fileF016.F016USITM = rs01.getString("F016USITM");
            fileF016.F016USMID = rs01.getString("F016USMID");
            fileF016.F016USMDT = rs01.getString("F016USMDT");
            fileF016.F016USMTM = rs01.getString("F016USMTM");

            fileF016.FOUND = true;
        }
        rs01.close();
        stmt01.close();

        return fileF016;
    }

    public F016[] getF016_A(int NBRID, int SRCCDA, int BRKSQA) throws SQLException {
        return getF016_A(CUSTOMER_CODE, NBRID, SRCCDA, BRKSQA);
    }

    public F016[] getF016_A(String CSTID, int NBRID, int SRCCDA, int BRKSQA) throws SQLException {
        ArrayList<F016> listF016 = new ArrayList<F016>(0);
        F016 fileF016;

        // <editor-fold defaultstate="collapsed" desc="{...} SQLQRY01">
        String SQLQRY01 = "SELECT "
                + "RTRIM(F016CSTID) AS F016CSTID, F016NBRID, F016SRCCDA, F016BRKSQA, F016VATSQB,"
                + "RTRIM(F016RBCNB) AS F016RBCNB, RTRIM(F016VATID1) AS F016VATID1, RTRIM(F016VATLB1) AS F016VATLB1, RTRIM(F016VATTX1) AS F016VATTX1,"
                + "F016VTBAM1, F016VTPPC1, F016VATAM1,"
                + "RTRIM(F016USIID) AS F016USIID, RTRIM(F016USIDT) AS F016USIDT, RTRIM(F016USITM) AS F016USITM, RTRIM(F016USMID) AS F016USMID, RTRIM(F016USMDT) AS F016USMDT, RTRIM(F016USMTM) AS F016USMTM"
                + " FROM LIBMIATEC.F016 WHERE "
                + "F016CSTID = '" + CSTID + "' AND "
                + "F016NBRID = '" + NBRID + "' AND "
                + "F016SRCCDA = '" + SRCCDA + "' AND "
                + "F016BRKSQA = '" + BRKSQA + "'";
        // </editor-fold>

        Statement stmt01 = cnxIBMDB2.getConnection().createStatement();
        ResultSet rs01 = stmt01.executeQuery(SQLQRY01);
        while(rs01.next()){
            fileF016 = new F016();
            fileF016.F016CSTID = rs01.getString("F016CSTID");
            fileF016.F016NBRID = rs01.getInt("F016NBRID");
            fileF016.F016SRCCDA = rs01.getInt("F016SRCCDA");
            fileF016.F016BRKSQA = rs01.getInt("F016BRKSQA");
            fileF016.F016VATSQB = rs01.getInt("F016VATSQB");
            fileF016.F016RBCNB = rs01.getString("F016RBCNB");
            fileF016.F016VATID1 = rs01.getString("F016VATID1");
            fileF016.F016VATLB1 = rs01.getString("F016VATLB1");
            fileF016.F016VATTX1 = rs01.getString("F016VATTX1");
            fileF016.F016VTBAM1 = rs01.getDouble("F016VTBAM1");
            fileF016.F016VTPPC1 = rs01.getDouble("F016VTPPC1");
            fileF016.F016VATAM1 = rs01.getDouble("F016VATAM1");
            fileF016.F016USIID = rs01.getString("F016USIID");
            fileF016.F016USIDT = rs01.getString("F016USIDT");
            fileF016.F016USITM = rs01.getString("F016USITM");
            fileF016.F016USMID = rs01.getString("F016USMID");
            fileF016.F016USMDT = rs01.getString("F016USMDT");
            fileF016.F016USMTM = rs01.getString("F016USMTM");

            fileF016.FOUND = true;

            listF016.add(fileF016);
        }
        rs01.close();
        stmt01.close();

        return listF016.toArray(new F016[listF016.size()]);
    }

    public F017 getF017(int NBRID, int SRCCDA, int BRKSQA, int BRKSQB) throws SQLException {
        return getF017(CUSTOMER_CODE, NBRID, SRCCDA, BRKSQA, BRKSQB);
    }

    public F017 getF017(String CSTID, int NBRID, int SRCCDA, int BRKSQA, int BRKSQB) throws SQLException {
        F017 fileF017 = new F017();

        // <editor-fold defaultstate="collapsed" desc="{...} SQLQRY01">
        String SQLQRY01 = "SELECT "
                + "RTRIM(F017CSTID) AS F017CSTID,"
                + "F017NBRID, F017SRCCDA, F017BRKSQA, F017BRKSQB,"
                + "RTRIM(F017RBCNB) AS F017RBCNB, RTRIM(F017TKACD) AS F017TKACD, RTRIM(F017CPNNB) AS F017CPNNB, RTRIM(F017TKDNB) AS F017TKDNB, RTRIM(F017CKDNB) AS F017CKDNB, RTRIM(F017FRACD) AS F017FRACD, RTRIM(F017TOACD) AS F017TOACD,"
                + "F017GRSBAM, F017GRSAAM, F017GRSDAM, F017TAXBAM, F017TAXAAM, F017TAXDAM, F017ISCWPC, F017ISCWAM, F017ISCAPC, F017ISCAAM, F017ISCDAM, F017OTCWPC, F017OTCWAM, F017OTCAPC, F017OTCAAM, F017OTCDAM, F017HAFWAM, F017HAFAAM, F017HAFDAM, F017UATWPC, F017UATWAM, F017UATAPC, F017UATAAM, F017UATDAM, F017VATBAM, F017VATAAM, F017VATDAM, F017NTCPAM,"
                + "RTRIM(F017NFPCD) AS F017NFPCD, RTRIM(F017AGSFL) AS F017AGSFL, RTRIM(F017AGVFL) AS F017AGVFL, RTRIM(F017OPMIFL) AS F017OPMIFL, RTRIM(F017VPMIFL) AS F017VPMIFL, RTRIM(F017SACCD) AS F017SACCD, RTRIM(F017ATOFL) AS F017ATOFL, RTRIM(F017ATVFL) AS F017ATVFL,"
                + "F017ATTQT,"
                + "RTRIM(F017ISVFL) AS F017ISVFL, RTRIM(F017RSNCD) AS F017RSNCD, RTRIM(F017REFTX1) AS F017REFTX1, RTRIM(F017REFTX2) AS F017REFTX2, RTRIM(F017REFTX3) AS F017REFTX3, RTRIM(F017REFTX4) AS F017REFTX4, RTRIM(F017REFTX5) AS F017REFTX5, RTRIM(F017OWUTX) AS F017OWUTX, RTRIM(F017FTERM) AS F017FTERM, RTRIM(F017PRERM) AS F017PRERM,"
                + "RTRIM(F017USIID) AS F017USIID, RTRIM(F017USIDT) AS F017USIDT, RTRIM(F017USITM) AS F017USITM, RTRIM(F017USMID) AS F017USMID, RTRIM(F017USMDT) AS F017USMDT, RTRIM(F017USMTM) AS F017USMTM"
                + " FROM LIBMIATEC.F017 WHERE "
                + "F017CSTID = '" + CSTID + "' AND "
                + "F017NBRID = '" + NBRID + "' AND "
                + "F017SRCCDA = '" + SRCCDA + "' AND "
                + "F017BRKSQA = '" + BRKSQA + "' AND "
                + "F017BRKSQB = '" + BRKSQB + "'";
        // </editor-fold>

        Statement stmt01 = cnxIBMDB2.getConnection().createStatement();
        ResultSet rs01 = stmt01.executeQuery(SQLQRY01);
        if(rs01.next()){
            fileF017.F017CSTID = rs01.getString("F017CSTID");
            fileF017.F017NBRID = rs01.getInt("F017NBRID");
            fileF017.F017SRCCDA = rs01.getInt("F017SRCCDA");
            fileF017.F017BRKSQA = rs01.getInt("F017BRKSQA");
            fileF017.F017BRKSQB = rs01.getInt("F017BRKSQB");
            fileF017.F017RBCNB = rs01.getString("F017RBCNB");
            fileF017.F017TKACD = rs01.getString("F017TKACD");
            fileF017.F017CPNNB = rs01.getString("F017CPNNB");
            fileF017.F017TKDNB = rs01.getString("F017TKDNB");
            fileF017.F017CKDNB = rs01.getString("F017CKDNB");
            fileF017.F017FRACD = rs01.getString("F017FRACD");
            fileF017.F017TOACD = rs01.getString("F017TOACD");
            fileF017.F017GRSBAM = rs01.getDouble("F017GRSBAM");
            fileF017.F017GRSAAM = rs01.getDouble("F017GRSAAM");
            fileF017.F017GRSDAM = rs01.getDouble("F017GRSDAM");
            fileF017.F017TAXBAM = rs01.getDouble("F017TAXBAM");
            fileF017.F017TAXAAM = rs01.getDouble("F017TAXAAM");
            fileF017.F017TAXDAM = rs01.getDouble("F017TAXDAM");
            fileF017.F017ISCWPC = rs01.getDouble("F017ISCWPC");
            fileF017.F017ISCWAM = rs01.getDouble("F017ISCWAM");
            fileF017.F017ISCAPC = rs01.getDouble("F017ISCAPC");
            fileF017.F017ISCAAM = rs01.getDouble("F017ISCAAM");
            fileF017.F017ISCDAM = rs01.getDouble("F017ISCDAM");
            fileF017.F017OTCWPC = rs01.getDouble("F017OTCWPC");
            fileF017.F017OTCWAM = rs01.getDouble("F017OTCWAM");
            fileF017.F017OTCAPC = rs01.getDouble("F017OTCAPC");
            fileF017.F017OTCAAM = rs01.getDouble("F017OTCAAM");
            fileF017.F017OTCDAM = rs01.getDouble("F017OTCDAM");
            fileF017.F017HAFWAM = rs01.getDouble("F017HAFWAM");
            fileF017.F017HAFAAM = rs01.getDouble("F017HAFAAM");
            fileF017.F017HAFDAM = rs01.getDouble("F017HAFDAM");
            fileF017.F017UATWPC = rs01.getDouble("F017UATWPC");
            fileF017.F017UATWAM = rs01.getDouble("F017UATWAM");
            fileF017.F017UATAPC = rs01.getDouble("F017UATAPC");
            fileF017.F017UATAAM = rs01.getDouble("F017UATAAM");
            fileF017.F017UATDAM = rs01.getDouble("F017UATDAM");
            fileF017.F017VATBAM = rs01.getDouble("F017VATBAM");
            fileF017.F017VATAAM = rs01.getDouble("F017VATAAM");
            fileF017.F017VATDAM = rs01.getDouble("F017VATDAM");
            fileF017.F017NTCPAM = rs01.getDouble("F017NTCPAM");
            fileF017.F017NFPCD = rs01.getString("F017NFPCD");
            fileF017.F017AGSFL = rs01.getString("F017AGSFL");
            fileF017.F017AGVFL = rs01.getString("F017AGVFL");
            fileF017.F017OPMIFL = rs01.getString("F017OPMIFL");
            fileF017.F017VPMIFL = rs01.getString("F017VPMIFL");
            fileF017.F017SACCD = rs01.getString("F017SACCD");
            fileF017.F017ATOFL = rs01.getString("F017ATOFL");
            fileF017.F017ATVFL = rs01.getString("F017ATVFL");
            fileF017.F017ATTQT = rs01.getInt("F017ATTQT");
            fileF017.F017ISVFL = rs01.getString("F017ISVFL");
            fileF017.F017RSNCD = rs01.getString("F017RSNCD");
            fileF017.F017REFTX1 = rs01.getString("F017REFTX1");
            fileF017.F017REFTX2 = rs01.getString("F017REFTX2");
            fileF017.F017REFTX3 = rs01.getString("F017REFTX3");
            fileF017.F017REFTX4 = rs01.getString("F017REFTX4");
            fileF017.F017REFTX5 = rs01.getString("F017REFTX5");
            fileF017.F017OWUTX = rs01.getString("F017OWUTX");
            fileF017.F017FTERM = rs01.getString("F017FTERM");
            fileF017.F017PRERM = rs01.getString("F017PRERM");
            fileF017.F017USIID = rs01.getString("F017USIID");
            fileF017.F017USIDT = rs01.getString("F017USIDT");
            fileF017.F017USITM = rs01.getString("F017USITM");
            fileF017.F017USMID = rs01.getString("F017USMID");
            fileF017.F017USMDT = rs01.getString("F017USMDT");
            fileF017.F017USMTM = rs01.getString("F017USMTM");

            fileF017.FOUND = true;
        }
        rs01.close();
        stmt01.close();

        return fileF017;
    }

    public F017[] getF017_A(int NBRID, int SRCCDA, int BRKSQA) throws SQLException {
        return getF017_A(CUSTOMER_CODE, NBRID, SRCCDA, BRKSQA);
    }

    public F017[] getF017_A(String CSTID, int NBRID, int SRCCDA, int BRKSQA) throws SQLException {
        ArrayList<F017> listF017 = new ArrayList<F017>(0);
        F017 fileF017;

        // <editor-fold defaultstate="collapsed" desc="{...} SQLQRY01">
        String SQLQRY01 = "SELECT "
                + "RTRIM(F017CSTID) AS F017CSTID,"
                + "F017NBRID, F017SRCCDA, F017BRKSQA, F017BRKSQB,"
                + "RTRIM(F017RBCNB) AS F017RBCNB, RTRIM(F017TKACD) AS F017TKACD, RTRIM(F017CPNNB) AS F017CPNNB, RTRIM(F017TKDNB) AS F017TKDNB, RTRIM(F017CKDNB) AS F017CKDNB, RTRIM(F017FRACD) AS F017FRACD, RTRIM(F017TOACD) AS F017TOACD,"
                + "F017GRSBAM, F017GRSAAM, F017GRSDAM, F017TAXBAM, F017TAXAAM, F017TAXDAM, F017ISCWPC, F017ISCWAM, F017ISCAPC, F017ISCAAM, F017ISCDAM, F017OTCWPC, F017OTCWAM, F017OTCAPC, F017OTCAAM, F017OTCDAM, F017HAFWAM, F017HAFAAM, F017HAFDAM, F017UATWPC, F017UATWAM, F017UATAPC, F017UATAAM, F017UATDAM, F017VATBAM, F017VATAAM, F017VATDAM, F017NTCPAM,"
                + "RTRIM(F017NFPCD) AS F017NFPCD, RTRIM(F017AGSFL) AS F017AGSFL, RTRIM(F017AGVFL) AS F017AGVFL, RTRIM(F017OPMIFL) AS F017OPMIFL, RTRIM(F017VPMIFL) AS F017VPMIFL, RTRIM(F017SACCD) AS F017SACCD, RTRIM(F017ATOFL) AS F017ATOFL, RTRIM(F017ATVFL) AS F017ATVFL,"
                + "F017ATTQT,"
                + "RTRIM(F017ISVFL) AS F017ISVFL, RTRIM(F017RSNCD) AS F017RSNCD, RTRIM(F017REFTX1) AS F017REFTX1, RTRIM(F017REFTX2) AS F017REFTX2, RTRIM(F017REFTX3) AS F017REFTX3, RTRIM(F017REFTX4) AS F017REFTX4, RTRIM(F017REFTX5) AS F017REFTX5, RTRIM(F017OWUTX) AS F017OWUTX, RTRIM(F017FTERM) AS F017FTERM, RTRIM(F017PRERM) AS F017PRERM,"
                + "RTRIM(F017USIID) AS F017USIID, RTRIM(F017USIDT) AS F017USIDT, RTRIM(F017USITM) AS F017USITM, RTRIM(F017USMID) AS F017USMID, RTRIM(F017USMDT) AS F017USMDT, RTRIM(F017USMTM) AS F017USMTM"
                + " FROM LIBMIATEC.F017 WHERE "
                + "F017CSTID = '" + CSTID + "' AND "
                + "F017NBRID = '" + NBRID + "' AND "
                + "F017SRCCDA = '" + SRCCDA + "' AND "
                + "F017BRKSQA = '" + BRKSQA + "'";
        // </editor-fold>

        Statement stmt01 = cnxIBMDB2.getConnection().createStatement();
        ResultSet rs01 = stmt01.executeQuery(SQLQRY01);
        while(rs01.next()){
            fileF017 = new F017();
            fileF017.F017CSTID = rs01.getString("F017CSTID");
            fileF017.F017NBRID = rs01.getInt("F017NBRID");
            fileF017.F017SRCCDA = rs01.getInt("F017SRCCDA");
            fileF017.F017BRKSQA = rs01.getInt("F017BRKSQA");
            fileF017.F017BRKSQB = rs01.getInt("F017BRKSQB");
            fileF017.F017RBCNB = rs01.getString("F017RBCNB");
            fileF017.F017TKACD = rs01.getString("F017TKACD");
            fileF017.F017CPNNB = rs01.getString("F017CPNNB");
            fileF017.F017TKDNB = rs01.getString("F017TKDNB");
            fileF017.F017CKDNB = rs01.getString("F017CKDNB");
            fileF017.F017FRACD = rs01.getString("F017FRACD");
            fileF017.F017TOACD = rs01.getString("F017TOACD");
            fileF017.F017GRSBAM = rs01.getDouble("F017GRSBAM");
            fileF017.F017GRSAAM = rs01.getDouble("F017GRSAAM");
            fileF017.F017GRSDAM = rs01.getDouble("F017GRSDAM");
            fileF017.F017TAXBAM = rs01.getDouble("F017TAXBAM");
            fileF017.F017TAXAAM = rs01.getDouble("F017TAXAAM");
            fileF017.F017TAXDAM = rs01.getDouble("F017TAXDAM");
            fileF017.F017ISCWPC = rs01.getDouble("F017ISCWPC");
            fileF017.F017ISCWAM = rs01.getDouble("F017ISCWAM");
            fileF017.F017ISCAPC = rs01.getDouble("F017ISCAPC");
            fileF017.F017ISCAAM = rs01.getDouble("F017ISCAAM");
            fileF017.F017ISCDAM = rs01.getDouble("F017ISCDAM");
            fileF017.F017OTCWPC = rs01.getDouble("F017OTCWPC");
            fileF017.F017OTCWAM = rs01.getDouble("F017OTCWAM");
            fileF017.F017OTCAPC = rs01.getDouble("F017OTCAPC");
            fileF017.F017OTCAAM = rs01.getDouble("F017OTCAAM");
            fileF017.F017OTCDAM = rs01.getDouble("F017OTCDAM");
            fileF017.F017HAFWAM = rs01.getDouble("F017HAFWAM");
            fileF017.F017HAFAAM = rs01.getDouble("F017HAFAAM");
            fileF017.F017HAFDAM = rs01.getDouble("F017HAFDAM");
            fileF017.F017UATWPC = rs01.getDouble("F017UATWPC");
            fileF017.F017UATWAM = rs01.getDouble("F017UATWAM");
            fileF017.F017UATAPC = rs01.getDouble("F017UATAPC");
            fileF017.F017UATAAM = rs01.getDouble("F017UATAAM");
            fileF017.F017UATDAM = rs01.getDouble("F017UATDAM");
            fileF017.F017VATBAM = rs01.getDouble("F017VATBAM");
            fileF017.F017VATAAM = rs01.getDouble("F017VATAAM");
            fileF017.F017VATDAM = rs01.getDouble("F017VATDAM");
            fileF017.F017NTCPAM = rs01.getDouble("F017NTCPAM");
            fileF017.F017NFPCD = rs01.getString("F017NFPCD");
            fileF017.F017AGSFL = rs01.getString("F017AGSFL");
            fileF017.F017AGVFL = rs01.getString("F017AGVFL");
            fileF017.F017OPMIFL = rs01.getString("F017OPMIFL");
            fileF017.F017VPMIFL = rs01.getString("F017VPMIFL");
            fileF017.F017SACCD = rs01.getString("F017SACCD");
            fileF017.F017ATOFL = rs01.getString("F017ATOFL");
            fileF017.F017ATVFL = rs01.getString("F017ATVFL");
            fileF017.F017ATTQT = rs01.getInt("F017ATTQT");
            fileF017.F017ISVFL = rs01.getString("F017ISVFL");
            fileF017.F017RSNCD = rs01.getString("F017RSNCD");
            fileF017.F017REFTX1 = rs01.getString("F017REFTX1");
            fileF017.F017REFTX2 = rs01.getString("F017REFTX2");
            fileF017.F017REFTX3 = rs01.getString("F017REFTX3");
            fileF017.F017REFTX4 = rs01.getString("F017REFTX4");
            fileF017.F017REFTX5 = rs01.getString("F017REFTX5");
            fileF017.F017OWUTX = rs01.getString("F017OWUTX");
            fileF017.F017FTERM = rs01.getString("F017FTERM");
            fileF017.F017PRERM = rs01.getString("F017PRERM");
            fileF017.F017USIID = rs01.getString("F017USIID");
            fileF017.F017USIDT = rs01.getString("F017USIDT");
            fileF017.F017USITM = rs01.getString("F017USITM");
            fileF017.F017USMID = rs01.getString("F017USMID");
            fileF017.F017USMDT = rs01.getString("F017USMDT");
            fileF017.F017USMTM = rs01.getString("F017USMTM");

            fileF017.FOUND = true;

            listF017.add(fileF017);
        }
        rs01.close();
        stmt01.close();

        return listF017.toArray(new F017[listF017.size()]);
    }

    public F018 getF018(int NBRID, int SRCCDA, int BRKSQA, int BRKSQB, int TAXSQC) throws SQLException {
        return getF018(CUSTOMER_CODE, NBRID, SRCCDA, BRKSQA, BRKSQB, TAXSQC);
    }

    public F018 getF018(String CSTID, int NBRID, int SRCCDA, int BRKSQA, int BRKSQB, int TAXSQC) throws SQLException {
        F018 fileF018 = new F018();

        // <editor-fold defaultstate="collapsed" desc="{...} SQLQRY01">
        String SQLQRY01 = "SELECT "
                + "RTRIM(F018CSTID) AS F018CSTID,"
                + "F018NBRID, F018SRCCDA, F018BRKSQA, F018BRKSQB, F018TAXSQC,"
                + "RTRIM(F018RBCNB) AS F018RBCNB, RTRIM(F018TKACD) AS F018TKACD, RTRIM(F018CPNNB) AS F018CPNNB, RTRIM(F018TKDNB) AS F018TKDNB, RTRIM(F018TAXCD1) AS F018TAXCD1,"
                + "F018TAXAM1, F018TXPAM1,"
                + "RTRIM(F018COPCD1) AS F018COPCD1,"
                + "F018TXBAM1,"
                + "RTRIM(F018USIID) AS F018USIID, RTRIM(F018USIDT) AS F018USIDT, RTRIM(F018USITM) AS F018USITM, RTRIM(F018USMID) AS F018USMID, RTRIM(F018USMDT) AS F018USMDT, RTRIM(F018USMTM) AS F018USMTM"
                + " FROM LIBMIATEC.F018 WHERE "
                + "F018CSTID = '" + CSTID + "' AND "
                + "F018NBRID = '" + NBRID + "' AND "
                + "F018SRCCDA = '" + SRCCDA + "' AND "
                + "F018BRKSQA = '" + BRKSQA + "' AND "
                + "F018BRKSQB = '" + BRKSQB + "' AND "
                + "F018TAXSQC = '" + TAXSQC + "'";
        // </editor-fold>

        Statement stmt01 = cnxIBMDB2.getConnection().createStatement();
        ResultSet rs01 = stmt01.executeQuery(SQLQRY01);
        if(rs01.next()){
            fileF018.F018CSTID = rs01.getString("F018CSTID");
            fileF018.F018NBRID = rs01.getInt("F018NBRID");
            fileF018.F018SRCCDA = rs01.getInt("F018SRCCDA");
            fileF018.F018BRKSQA = rs01.getInt("F018BRKSQA");
            fileF018.F018BRKSQB = rs01.getInt("F018BRKSQB");
            fileF018.F018TAXSQC = rs01.getInt("F018TAXSQC");
            fileF018.F018RBCNB = rs01.getString("F018RBCNB");
            fileF018.F018TKACD = rs01.getString("F018TKACD");
            fileF018.F018CPNNB = rs01.getString("F018CPNNB");
            fileF018.F018TKDNB = rs01.getString("F018TKDNB");
            fileF018.F018TAXCD1 = rs01.getString("F018TAXCD1");
            fileF018.F018TAXAM1 = rs01.getDouble("F018TAXAM1");
            fileF018.F018TXPAM1 = rs01.getDouble("F018TXPAM1");
            fileF018.F018COPCD1 = rs01.getString("F018COPCD1");
            fileF018.F018TXBAM1 = rs01.getDouble("F018TXBAM1");
            fileF018.F018USIID = rs01.getString("F018USIID");
            fileF018.F018USIDT = rs01.getString("F018USIDT");
            fileF018.F018USITM = rs01.getString("F018USITM");
            fileF018.F018USMID = rs01.getString("F018USMID");
            fileF018.F018USMDT = rs01.getString("F018USMDT");
            fileF018.F018USMTM = rs01.getString("F018USMTM");

            fileF018.FOUND = true;
        }
        rs01.close();
        stmt01.close();

        return fileF018;
    }

    public F018[] getF018_A(int NBRID, int SRCCDA, int BRKSQA, int BRKSQB) throws SQLException {
        return getF018_A(CUSTOMER_CODE, NBRID, SRCCDA, BRKSQA, BRKSQB);
    }

    public F018[] getF018_A(String CSTID, int NBRID, int SRCCDA, int BRKSQA, int BRKSQB) throws SQLException {
        ArrayList<F018> listF018 = new ArrayList<F018>(0);
        F018 fileF018;

        // <editor-fold defaultstate="collapsed" desc="{...} SQLQRY01">
        String SQLQRY01 = "SELECT "
                + "RTRIM(F018CSTID) AS F018CSTID,"
                + "F018NBRID, F018SRCCDA, F018BRKSQA, F018BRKSQB, F018TAXSQC,"
                + "RTRIM(F018RBCNB) AS F018RBCNB, RTRIM(F018TKACD) AS F018TKACD, RTRIM(F018CPNNB) AS F018CPNNB, RTRIM(F018TKDNB) AS F018TKDNB, RTRIM(F018TAXCD1) AS F018TAXCD1,"
                + "F018TAXAM1, F018TXPAM1,"
                + "RTRIM(F018COPCD1) AS F018COPCD1,"
                + "F018TXBAM1,"
                + "RTRIM(F018USIID) AS F018USIID, RTRIM(F018USIDT) AS F018USIDT, RTRIM(F018USITM) AS F018USITM, RTRIM(F018USMID) AS F018USMID, RTRIM(F018USMDT) AS F018USMDT, RTRIM(F018USMTM) AS F018USMTM"
                + " FROM LIBMIATEC.F018 WHERE "
                + "F018CSTID = '" + CSTID + "' AND "
                + "F018NBRID = '" + NBRID + "' AND "
                + "F018SRCCDA = '" + SRCCDA + "' AND "
                + "F018BRKSQA = '" + BRKSQA + "' AND "
                + "F018BRKSQB = '" + BRKSQB + "'";
        // </editor-fold>

        Statement stmt01 = cnxIBMDB2.getConnection().createStatement();
        ResultSet rs01 = stmt01.executeQuery(SQLQRY01);
        while(rs01.next()){
            fileF018 = new F018();
            fileF018.F018CSTID = rs01.getString("F018CSTID");
            fileF018.F018NBRID = rs01.getInt("F018NBRID");
            fileF018.F018SRCCDA = rs01.getInt("F018SRCCDA");
            fileF018.F018BRKSQA = rs01.getInt("F018BRKSQA");
            fileF018.F018BRKSQB = rs01.getInt("F018BRKSQB");
            fileF018.F018TAXSQC = rs01.getInt("F018TAXSQC");
            fileF018.F018RBCNB = rs01.getString("F018RBCNB");
            fileF018.F018TKACD = rs01.getString("F018TKACD");
            fileF018.F018CPNNB = rs01.getString("F018CPNNB");
            fileF018.F018TKDNB = rs01.getString("F018TKDNB");
            fileF018.F018TAXCD1 = rs01.getString("F018TAXCD1");
            fileF018.F018TAXAM1 = rs01.getDouble("F018TAXAM1");
            fileF018.F018TXPAM1 = rs01.getDouble("F018TXPAM1");
            fileF018.F018COPCD1 = rs01.getString("F018COPCD1");
            fileF018.F018TXBAM1 = rs01.getDouble("F018TXBAM1");
            fileF018.F018USIID = rs01.getString("F018USIID");
            fileF018.F018USIDT = rs01.getString("F018USIDT");
            fileF018.F018USITM = rs01.getString("F018USITM");
            fileF018.F018USMID = rs01.getString("F018USMID");
            fileF018.F018USMDT = rs01.getString("F018USMDT");
            fileF018.F018USMTM = rs01.getString("F018USMTM");

            fileF018.FOUND = true;

            listF018.add(fileF018);
        }
        rs01.close();
        stmt01.close();

        return listF018.toArray(new F018[listF018.size()]);
    }

    public F018[] getF018_B(int NBRID, int SRCCDA, int BRKSQA) throws SQLException {
        return getF018_B(CUSTOMER_CODE, NBRID, SRCCDA, BRKSQA);
    }

    public F018[] getF018_B(String CSTID, int NBRID, int SRCCDA, int BRKSQA) throws SQLException {
        ArrayList<F018> listF018 = new ArrayList<F018>(0);
        F018 fileF018;

        // <editor-fold defaultstate="collapsed" desc="{...} SQLQRY01">
        String SQLQRY01 = "SELECT "
                + "RTRIM(F018CSTID) AS F018CSTID,"
                + "F018NBRID, F018SRCCDA, F018BRKSQA, F018BRKSQB, F018TAXSQC,"
                + "RTRIM(F018RBCNB) AS F018RBCNB, RTRIM(F018TKACD) AS F018TKACD, RTRIM(F018CPNNB) AS F018CPNNB, RTRIM(F018TKDNB) AS F018TKDNB, RTRIM(F018TAXCD1) AS F018TAXCD1,"
                + "F018TAXAM1, F018TXPAM1,"
                + "RTRIM(F018COPCD1) AS F018COPCD1,"
                + "F018TXBAM1,"
                + "RTRIM(F018USIID) AS F018USIID, RTRIM(F018USIDT) AS F018USIDT, RTRIM(F018USITM) AS F018USITM, RTRIM(F018USMID) AS F018USMID, RTRIM(F018USMDT) AS F018USMDT, RTRIM(F018USMTM) AS F018USMTM"
                + " FROM LIBMIATEC.F018 WHERE "
                + "F018CSTID = '" + CSTID + "' AND "
                + "F018NBRID = '" + NBRID + "' AND "
                + "F018SRCCDA = '" + SRCCDA + "' AND "
                + "F018BRKSQA = '" + BRKSQA + "'";
        // </editor-fold>

        Statement stmt01 = cnxIBMDB2.getConnection().createStatement();
        ResultSet rs01 = stmt01.executeQuery(SQLQRY01);
        while(rs01.next()){
            fileF018 = new F018();
            fileF018.F018CSTID = rs01.getString("F018CSTID");
            fileF018.F018NBRID = rs01.getInt("F018NBRID");
            fileF018.F018SRCCDA = rs01.getInt("F018SRCCDA");
            fileF018.F018BRKSQA = rs01.getInt("F018BRKSQA");
            fileF018.F018BRKSQB = rs01.getInt("F018BRKSQB");
            fileF018.F018TAXSQC = rs01.getInt("F018TAXSQC");
            fileF018.F018RBCNB = rs01.getString("F018RBCNB");
            fileF018.F018TKACD = rs01.getString("F018TKACD");
            fileF018.F018CPNNB = rs01.getString("F018CPNNB");
            fileF018.F018TKDNB = rs01.getString("F018TKDNB");
            fileF018.F018TAXCD1 = rs01.getString("F018TAXCD1");
            fileF018.F018TAXAM1 = rs01.getDouble("F018TAXAM1");
            fileF018.F018TXPAM1 = rs01.getDouble("F018TXPAM1");
            fileF018.F018COPCD1 = rs01.getString("F018COPCD1");
            fileF018.F018TXBAM1 = rs01.getDouble("F018TXBAM1");
            fileF018.F018USIID = rs01.getString("F018USIID");
            fileF018.F018USIDT = rs01.getString("F018USIDT");
            fileF018.F018USITM = rs01.getString("F018USITM");
            fileF018.F018USMID = rs01.getString("F018USMID");
            fileF018.F018USMDT = rs01.getString("F018USMDT");
            fileF018.F018USMTM = rs01.getString("F018USMTM");

            fileF018.FOUND = true;

            listF018.add(fileF018);
        }
        rs01.close();
        stmt01.close();

        return listF018.toArray(new F018[listF018.size()]);
    }

    public F019 getF019(int NBRID, int SRCCDA, int BRKSQA, int BRKSQB, int TAXSQC) throws SQLException {
        return getF019(CUSTOMER_CODE, NBRID, SRCCDA, BRKSQA, BRKSQB, TAXSQC);
    }

    public F019 getF019(String CSTID, int NBRID, int SRCCDA, int BRKSQA, int BRKSQB, int TAXSQC) throws SQLException {
        F019 fileF019 = new F019();

        // <editor-fold defaultstate="collapsed" desc="{...} SQLQRY01">
        String SQLQRY01 = "SELECT "
                + "RTRIM(F019CSTID) AS F019CSTID,"
                + "F019NBRID, F019SRCCDA, F019BRKSQA, F019BRKSQB, F019TAXSQC,"
                + "RTRIM(F019RBCNB) AS F019RBCNB, RTRIM(F019TKACD) AS F019TKACD, RTRIM(F019CPNNB) AS F019CPNNB, RTRIM(F019TKDNB) AS F019TKDNB, RTRIM(F019TAXCD1) AS F019TAXCD1,"
                + "F019TAXAM1, F019TXPAM1,"
                + "RTRIM(F019COPCD1) AS F019COPCD1,"
                + "F019TXBAM1,"
                + "RTRIM(F019USIID) AS F019USIID, RTRIM(F019USIDT) AS F019USIDT, RTRIM(F019USITM) AS F019USITM, RTRIM(F019USMID) AS F019USMID, RTRIM(F019USMDT) AS F019USMDT, RTRIM(F019USMTM) AS F019USMTM"
                + " FROM LIBMIATEC.F019 WHERE "
                + "F019CSTID = '" + CSTID + "' AND "
                + "F019NBRID = '" + NBRID + "' AND "
                + "F019SRCCDA = '" + SRCCDA + "' AND "
                + "F019BRKSQA = '" + BRKSQA + "' AND "
                + "F019BRKSQB = '" + BRKSQB + "' AND "
                + "F019TAXSQC = '" + TAXSQC + "'";
        // </editor-fold>

        Statement stmt01 = cnxIBMDB2.getConnection().createStatement();
        ResultSet rs01 = stmt01.executeQuery(SQLQRY01);
        if(rs01.next()){
            fileF019.F019CSTID = rs01.getString("F019CSTID");
            fileF019.F019NBRID = rs01.getInt("F019NBRID");
            fileF019.F019SRCCDA = rs01.getInt("F019SRCCDA");
            fileF019.F019BRKSQA = rs01.getInt("F019BRKSQA");
            fileF019.F019BRKSQB = rs01.getInt("F019BRKSQB");
            fileF019.F019TAXSQC = rs01.getInt("F019TAXSQC");
            fileF019.F019RBCNB = rs01.getString("F019RBCNB");
            fileF019.F019TKACD = rs01.getString("F019TKACD");
            fileF019.F019CPNNB = rs01.getString("F019CPNNB");
            fileF019.F019TKDNB = rs01.getString("F019TKDNB");
            fileF019.F019TAXCD1 = rs01.getString("F019TAXCD1");
            fileF019.F019TAXAM1 = rs01.getDouble("F019TAXAM1");
            fileF019.F019TXPAM1 = rs01.getDouble("F019TXPAM1");
            fileF019.F019COPCD1 = rs01.getString("F019COPCD1");
            fileF019.F019TXBAM1 = rs01.getDouble("F019TXBAM1");
            fileF019.F019USIID = rs01.getString("F019USIID");
            fileF019.F019USIDT = rs01.getString("F019USIDT");
            fileF019.F019USITM = rs01.getString("F019USITM");
            fileF019.F019USMID = rs01.getString("F019USMID");
            fileF019.F019USMDT = rs01.getString("F019USMDT");
            fileF019.F019USMTM = rs01.getString("F019USMTM");

            fileF019.FOUND = true;
        }
        rs01.close();
        stmt01.close();

        return fileF019;
    }

    public F019[] getF019_A(int NBRID, int SRCCDA, int BRKSQA, int BRKSQB) throws SQLException {
        return getF019_A(CUSTOMER_CODE, NBRID, SRCCDA, BRKSQA, BRKSQB);
    }

    public F019[] getF019_A(String CSTID, int NBRID, int SRCCDA, int BRKSQA, int BRKSQB) throws SQLException {
        ArrayList<F019> listF019 = new ArrayList<F019>(0);
        F019 fileF019;

        // <editor-fold defaultstate="collapsed" desc="{...} SQLQRY01">
        String SQLQRY01 = "SELECT "
                + "RTRIM(F019CSTID) AS F019CSTID,"
                + "F019NBRID, F019SRCCDA, F019BRKSQA, F019BRKSQB, F019TAXSQC,"
                + "RTRIM(F019RBCNB) AS F019RBCNB, RTRIM(F019TKACD) AS F019TKACD, RTRIM(F019CPNNB) AS F019CPNNB, RTRIM(F019TKDNB) AS F019TKDNB, RTRIM(F019TAXCD1) AS F019TAXCD1,"
                + "F019TAXAM1, F019TXPAM1,"
                + "RTRIM(F019COPCD1) AS F019COPCD1,"
                + "F019TXBAM1,"
                + "RTRIM(F019USIID) AS F019USIID, RTRIM(F019USIDT) AS F019USIDT, RTRIM(F019USITM) AS F019USITM, RTRIM(F019USMID) AS F019USMID, RTRIM(F019USMDT) AS F019USMDT, RTRIM(F019USMTM) AS F019USMTM"
                + " FROM LIBMIATEC.F019 WHERE "
                + "F019CSTID = '" + CSTID + "' AND "
                + "F019NBRID = '" + NBRID + "' AND "
                + "F019SRCCDA = '" + SRCCDA + "' AND "
                + "F019BRKSQA = '" + BRKSQA + "' AND "
                + "F019BRKSQB = '" + BRKSQB + "'";
        // </editor-fold>

        Statement stmt01 = cnxIBMDB2.getConnection().createStatement();
        ResultSet rs01 = stmt01.executeQuery(SQLQRY01);
        while(rs01.next()){
            fileF019 = new F019();
            fileF019.F019CSTID = rs01.getString("F019CSTID");
            fileF019.F019NBRID = rs01.getInt("F019NBRID");
            fileF019.F019SRCCDA = rs01.getInt("F019SRCCDA");
            fileF019.F019BRKSQA = rs01.getInt("F019BRKSQA");
            fileF019.F019BRKSQB = rs01.getInt("F019BRKSQB");
            fileF019.F019TAXSQC = rs01.getInt("F019TAXSQC");
            fileF019.F019RBCNB = rs01.getString("F019RBCNB");
            fileF019.F019TKACD = rs01.getString("F019TKACD");
            fileF019.F019CPNNB = rs01.getString("F019CPNNB");
            fileF019.F019TKDNB = rs01.getString("F019TKDNB");
            fileF019.F019TAXCD1 = rs01.getString("F019TAXCD1");
            fileF019.F019TAXAM1 = rs01.getDouble("F019TAXAM1");
            fileF019.F019TXPAM1 = rs01.getDouble("F019TXPAM1");
            fileF019.F019COPCD1 = rs01.getString("F019COPCD1");
            fileF019.F019TXBAM1 = rs01.getDouble("F019TXBAM1");
            fileF019.F019USIID = rs01.getString("F019USIID");
            fileF019.F019USIDT = rs01.getString("F019USIDT");
            fileF019.F019USITM = rs01.getString("F019USITM");
            fileF019.F019USMID = rs01.getString("F019USMID");
            fileF019.F019USMDT = rs01.getString("F019USMDT");
            fileF019.F019USMTM = rs01.getString("F019USMTM");

            fileF019.FOUND = true;

            listF019.add(fileF019);
        }
        rs01.close();
        stmt01.close();

        return listF019.toArray(new F019[listF019.size()]);
    }

    public F019[] getF019_B(int NBRID, int SRCCDA, int BRKSQA) throws SQLException {
        return getF019_B(CUSTOMER_CODE, NBRID, SRCCDA, BRKSQA);
    }

    public F019[] getF019_B(String CSTID, int NBRID, int SRCCDA, int BRKSQA) throws SQLException {
        ArrayList<F019> listF019 = new ArrayList<F019>(0);
        F019 fileF019;

        // <editor-fold defaultstate="collapsed" desc="{...} SQLQRY01">
        String SQLQRY01 = "SELECT "
                + "RTRIM(F019CSTID) AS F019CSTID,"
                + "F019NBRID, F019SRCCDA, F019BRKSQA, F019BRKSQB, F019TAXSQC,"
                + "RTRIM(F019RBCNB) AS F019RBCNB, RTRIM(F019TKACD) AS F019TKACD, RTRIM(F019CPNNB) AS F019CPNNB, RTRIM(F019TKDNB) AS F019TKDNB, RTRIM(F019TAXCD1) AS F019TAXCD1,"
                + "F019TAXAM1, F019TXPAM1,"
                + "RTRIM(F019COPCD1) AS F019COPCD1,"
                + "F019TXBAM1,"
                + "RTRIM(F019USIID) AS F019USIID, RTRIM(F019USIDT) AS F019USIDT, RTRIM(F019USITM) AS F019USITM, RTRIM(F019USMID) AS F019USMID, RTRIM(F019USMDT) AS F019USMDT, RTRIM(F019USMTM) AS F019USMTM"
                + " FROM LIBMIATEC.F019 WHERE "
                + "F019CSTID = '" + CSTID + "' AND "
                + "F019NBRID = '" + NBRID + "' AND "
                + "F019SRCCDA = '" + SRCCDA + "' AND "
                + "F019BRKSQA = '" + BRKSQA + "'";
        // </editor-fold>

        Statement stmt01 = cnxIBMDB2.getConnection().createStatement();
        ResultSet rs01 = stmt01.executeQuery(SQLQRY01);
        while(rs01.next()){
            fileF019 = new F019();
            fileF019.F019CSTID = rs01.getString("F019CSTID");
            fileF019.F019NBRID = rs01.getInt("F019NBRID");
            fileF019.F019SRCCDA = rs01.getInt("F019SRCCDA");
            fileF019.F019BRKSQA = rs01.getInt("F019BRKSQA");
            fileF019.F019BRKSQB = rs01.getInt("F019BRKSQB");
            fileF019.F019TAXSQC = rs01.getInt("F019TAXSQC");
            fileF019.F019RBCNB = rs01.getString("F019RBCNB");
            fileF019.F019TKACD = rs01.getString("F019TKACD");
            fileF019.F019CPNNB = rs01.getString("F019CPNNB");
            fileF019.F019TKDNB = rs01.getString("F019TKDNB");
            fileF019.F019TAXCD1 = rs01.getString("F019TAXCD1");
            fileF019.F019TAXAM1 = rs01.getDouble("F019TAXAM1");
            fileF019.F019TXPAM1 = rs01.getDouble("F019TXPAM1");
            fileF019.F019COPCD1 = rs01.getString("F019COPCD1");
            fileF019.F019TXBAM1 = rs01.getDouble("F019TXBAM1");
            fileF019.F019USIID = rs01.getString("F019USIID");
            fileF019.F019USIDT = rs01.getString("F019USIDT");
            fileF019.F019USITM = rs01.getString("F019USITM");
            fileF019.F019USMID = rs01.getString("F019USMID");
            fileF019.F019USMDT = rs01.getString("F019USMDT");
            fileF019.F019USMTM = rs01.getString("F019USMTM");

            fileF019.FOUND = true;

            listF019.add(fileF019);
        }
        rs01.close();
        stmt01.close();

        return listF019.toArray(new F019[listF019.size()]);
    }

    public F020 getF020(int NBRID, int SRCCDA, int BRKSQA, int BRKSQB, int VATSQC) throws SQLException {
        return getF020(CUSTOMER_CODE, NBRID, SRCCDA, BRKSQA, BRKSQB, VATSQC);
    }

    public F020 getF020(String CSTID, int NBRID, int SRCCDA, int BRKSQA, int BRKSQB, int VATSQC) throws SQLException {
        F020 fileF020 = new F020();

        // <editor-fold defaultstate="collapsed" desc="{...} SQLQRY01">
        String SQLQRY01 = "SELECT "
                + "RTRIM(F020CSTID) AS F020CSTID, F020NBRID, F020SRCCDA, F020BRKSQA, F020BRKSQB, F020VATSQC,"
                + "RTRIM(F020RBCNB) AS F020RBCNB, RTRIM(F020TKACD) AS F020TKACD, RTRIM(F020CPNNB) AS F020CPNNB, RTRIM(F020TKDNB) AS F020TKDNB, RTRIM(F020VATID1) AS F020VATID1, RTRIM(F020VATLB1) AS F020VATLB1, RTRIM(F020VATTX1) AS F020VATTX1,"
                + "F020VTBAM1, F020VTPPC1, F020VATAM1,"
                + "RTRIM(F020USIID) AS F020USIID, RTRIM(F020USIDT) AS F020USIDT, RTRIM(F020USITM) AS F020USITM, RTRIM(F020USMID) AS F020USMID, RTRIM(F020USMDT) AS F020USMDT, RTRIM(F020USMTM) AS F020USMTM"
                + " FROM LIBMIATEC.F020 WHERE "
                + "F020CSTID = '" + CSTID + "' AND "
                + "F020NBRID = '" + NBRID + "' AND "
                + "F020SRCCDA = '" + SRCCDA + "' AND "
                + "F020BRKSQA = '" + BRKSQA + "' AND "
                + "F020BRKSQB = '" + BRKSQB + "' AND "
                + "F020VATSQC = '" + VATSQC + "'";
        // </editor-fold>

        Statement stmt01 = cnxIBMDB2.getConnection().createStatement();
        ResultSet rs01 = stmt01.executeQuery(SQLQRY01);
        if(rs01.next()){
            fileF020.F020CSTID = rs01.getString("F020CSTID");
            fileF020.F020NBRID = rs01.getInt("F020NBRID");
            fileF020.F020SRCCDA = rs01.getInt("F020SRCCDA");
            fileF020.F020BRKSQA = rs01.getInt("F020BRKSQA");
            fileF020.F020BRKSQB = rs01.getInt("F020BRKSQB");
            fileF020.F020VATSQC = rs01.getInt("F020VATSQC");
            fileF020.F020RBCNB = rs01.getString("F020RBCNB");
            fileF020.F020TKACD = rs01.getString("F020TKACD");
            fileF020.F020CPNNB = rs01.getString("F020CPNNB");
            fileF020.F020TKDNB = rs01.getString("F020TKDNB");
            fileF020.F020VATID1 = rs01.getString("F020VATID1");
            fileF020.F020VATLB1 = rs01.getString("F020VATLB1");
            fileF020.F020VATTX1 = rs01.getString("F020VATTX1");
            fileF020.F020VTBAM1 = rs01.getDouble("F020VTBAM1");
            fileF020.F020VTPPC1 = rs01.getDouble("F020VTPPC1");
            fileF020.F020VATAM1 = rs01.getDouble("F020VATAM1");
            fileF020.F020USIID = rs01.getString("F020USIID");
            fileF020.F020USIDT = rs01.getString("F020USIDT");
            fileF020.F020USITM = rs01.getString("F020USITM");
            fileF020.F020USMID = rs01.getString("F020USMID");
            fileF020.F020USMDT = rs01.getString("F020USMDT");
            fileF020.F020USMTM = rs01.getString("F020USMTM");

            fileF020.FOUND = true;
        }
        rs01.close();
        stmt01.close();

        return fileF020;
    }

    public F020[] getF020_A(int NBRID, int SRCCDA, int BRKSQA, int BRKSQB) throws SQLException {
        return getF020_A(CUSTOMER_CODE, NBRID, SRCCDA, BRKSQA, BRKSQB);
    }

    public F020[] getF020_A(String CSTID, int NBRID, int SRCCDA, int BRKSQA, int BRKSQB) throws SQLException {
        ArrayList<F020> listF020 = new ArrayList<F020>(0);
        F020 fileF020;

        // <editor-fold defaultstate="collapsed" desc="{...} SQLQRY01">
        String SQLQRY01 = "SELECT "
                + "RTRIM(F020CSTID) AS F020CSTID, F020NBRID, F020SRCCDA, F020BRKSQA, F020BRKSQB, F020VATSQC,"
                + "RTRIM(F020RBCNB) AS F020RBCNB, RTRIM(F020TKACD) AS F020TKACD, RTRIM(F020CPNNB) AS F020CPNNB, RTRIM(F020TKDNB) AS F020TKDNB, RTRIM(F020VATID1) AS F020VATID1, RTRIM(F020VATLB1) AS F020VATLB1, RTRIM(F020VATTX1) AS F020VATTX1,"
                + "F020VTBAM1, F020VTPPC1, F020VATAM1,"
                + "RTRIM(F020USIID) AS F020USIID, RTRIM(F020USIDT) AS F020USIDT, RTRIM(F020USITM) AS F020USITM, RTRIM(F020USMID) AS F020USMID, RTRIM(F020USMDT) AS F020USMDT, RTRIM(F020USMTM) AS F020USMTM"
                + " FROM LIBMIATEC.F020 WHERE "
                + "F020CSTID = '" + CSTID + "' AND "
                + "F020NBRID = '" + NBRID + "' AND "
                + "F020SRCCDA = '" + SRCCDA + "' AND "
                + "F020BRKSQA = '" + BRKSQA + "' AND "
                + "F020BRKSQB = '" + BRKSQB + "'";
        // </editor-fold>

        Statement stmt01 = cnxIBMDB2.getConnection().createStatement();
        ResultSet rs01 = stmt01.executeQuery(SQLQRY01);
        while(rs01.next()){
            fileF020 = new F020();
            fileF020.F020CSTID = rs01.getString("F020CSTID");
            fileF020.F020NBRID = rs01.getInt("F020NBRID");
            fileF020.F020SRCCDA = rs01.getInt("F020SRCCDA");
            fileF020.F020BRKSQA = rs01.getInt("F020BRKSQA");
            fileF020.F020BRKSQB = rs01.getInt("F020BRKSQB");
            fileF020.F020VATSQC = rs01.getInt("F020VATSQC");
            fileF020.F020RBCNB = rs01.getString("F020RBCNB");
            fileF020.F020TKACD = rs01.getString("F020TKACD");
            fileF020.F020CPNNB = rs01.getString("F020CPNNB");
            fileF020.F020TKDNB = rs01.getString("F020TKDNB");
            fileF020.F020VATID1 = rs01.getString("F020VATID1");
            fileF020.F020VATLB1 = rs01.getString("F020VATLB1");
            fileF020.F020VATTX1 = rs01.getString("F020VATTX1");
            fileF020.F020VTBAM1 = rs01.getDouble("F020VTBAM1");
            fileF020.F020VTPPC1 = rs01.getDouble("F020VTPPC1");
            fileF020.F020VATAM1 = rs01.getDouble("F020VATAM1");
            fileF020.F020USIID = rs01.getString("F020USIID");
            fileF020.F020USIDT = rs01.getString("F020USIDT");
            fileF020.F020USITM = rs01.getString("F020USITM");
            fileF020.F020USMID = rs01.getString("F020USMID");
            fileF020.F020USMDT = rs01.getString("F020USMDT");
            fileF020.F020USMTM = rs01.getString("F020USMTM");

            fileF020.FOUND = true;

            listF020.add(fileF020);
        }
        rs01.close();
        stmt01.close();

        return listF020.toArray(new F020[listF020.size()]);
    }

    public F020[] getF020_B(int NBRID, int SRCCDA, int BRKSQA) throws SQLException {
        return getF020_B(CUSTOMER_CODE, NBRID, SRCCDA, BRKSQA);
    }

    public F020[] getF020_B(String CSTID, int NBRID, int SRCCDA, int BRKSQA) throws SQLException {
        ArrayList<F020> listF020 = new ArrayList<F020>(0);
        F020 fileF020;

        // <editor-fold defaultstate="collapsed" desc="{...} SQLQRY01">
        String SQLQRY01 = "SELECT "
                + "RTRIM(F020CSTID) AS F020CSTID, F020NBRID, F020SRCCDA, F020BRKSQA, F020BRKSQB, F020VATSQC,"
                + "RTRIM(F020RBCNB) AS F020RBCNB, RTRIM(F020TKACD) AS F020TKACD, RTRIM(F020CPNNB) AS F020CPNNB, RTRIM(F020TKDNB) AS F020TKDNB, RTRIM(F020VATID1) AS F020VATID1, RTRIM(F020VATLB1) AS F020VATLB1, RTRIM(F020VATTX1) AS F020VATTX1,"
                + "F020VTBAM1, F020VTPPC1, F020VATAM1,"
                + "RTRIM(F020USIID) AS F020USIID, RTRIM(F020USIDT) AS F020USIDT, RTRIM(F020USITM) AS F020USITM, RTRIM(F020USMID) AS F020USMID, RTRIM(F020USMDT) AS F020USMDT, RTRIM(F020USMTM) AS F020USMTM"
                + " FROM LIBMIATEC.F020 WHERE "
                + "F020CSTID = '" + CSTID + "' AND "
                + "F020NBRID = '" + NBRID + "' AND "
                + "F020SRCCDA = '" + SRCCDA + "' AND "
                + "F020BRKSQA = '" + BRKSQA + "'";
        // </editor-fold>

        Statement stmt01 = cnxIBMDB2.getConnection().createStatement();
        ResultSet rs01 = stmt01.executeQuery(SQLQRY01);
        while(rs01.next()){
            fileF020 = new F020();
            fileF020.F020CSTID = rs01.getString("F020CSTID");
            fileF020.F020NBRID = rs01.getInt("F020NBRID");
            fileF020.F020SRCCDA = rs01.getInt("F020SRCCDA");
            fileF020.F020BRKSQA = rs01.getInt("F020BRKSQA");
            fileF020.F020BRKSQB = rs01.getInt("F020BRKSQB");
            fileF020.F020VATSQC = rs01.getInt("F020VATSQC");
            fileF020.F020RBCNB = rs01.getString("F020RBCNB");
            fileF020.F020TKACD = rs01.getString("F020TKACD");
            fileF020.F020CPNNB = rs01.getString("F020CPNNB");
            fileF020.F020TKDNB = rs01.getString("F020TKDNB");
            fileF020.F020VATID1 = rs01.getString("F020VATID1");
            fileF020.F020VATLB1 = rs01.getString("F020VATLB1");
            fileF020.F020VATTX1 = rs01.getString("F020VATTX1");
            fileF020.F020VTBAM1 = rs01.getDouble("F020VTBAM1");
            fileF020.F020VTPPC1 = rs01.getDouble("F020VTPPC1");
            fileF020.F020VATAM1 = rs01.getDouble("F020VATAM1");
            fileF020.F020USIID = rs01.getString("F020USIID");
            fileF020.F020USIDT = rs01.getString("F020USIDT");
            fileF020.F020USITM = rs01.getString("F020USITM");
            fileF020.F020USMID = rs01.getString("F020USMID");
            fileF020.F020USMDT = rs01.getString("F020USMDT");
            fileF020.F020USMTM = rs01.getString("F020USMTM");

            fileF020.FOUND = true;

            listF020.add(fileF020);
        }
        rs01.close();
        stmt01.close();

        return listF020.toArray(new F020[listF020.size()]);
    }

    public F024 getF024(int NBRID, int SRCCDA, int BRKSQA) throws SQLException {
        return getF024(CUSTOMER_CODE, NBRID, SRCCDA, BRKSQA);
    }

    public F024 getF024(String CSTID, int NBRID, int SRCCDA, int BRKSQA) throws SQLException {
        F024 fileF024 = new F024();

        // <editor-fold defaultstate="collapsed" desc="{...} SQLQRY01">
        String SQLQRY01 = "SELECT "
                + "RTRIM(F024CSTID) AS F024CSTID, F024NBRID, F024SRCCDA, F024BRKSQA,"
                + "RTRIM(F024BATSQA) AS F024BATSQA, RTRIM(F024RCBSQA) AS F024RCBSQA, RTRIM(F024BATSQ) AS F024BATSQ, RTRIM(F024RCBSQ) AS F024RCBSQ, RTRIM(F024SRCCD) AS F024SRCCD, RTRIM(F024RBCNB) AS F024RBCNB, RTRIM(F024RSNCD) AS F024RSNCD, RTRIM(F024OURTX) AS F024OURTX, RTRIM(F024CRFNB) AS F024CRFNB, RTRIM(F024FIMNB) AS F024FIMNB, RTRIM(F024FCPNB) AS F024FCPNB, RTRIM(F024YRINB) AS F024YRINB, RTRIM(F024YRBDTY) AS F024YRBDTY, RTRIM(F024YRBDTM) AS F024YRBDTM, RTRIM(F024YRBDTP) AS F024YRBDTP,"
                + "F024GRSAM, F024TAXAM, F024ISCAM, F024OTCAM, F024HAFAM, F024UATAM, F024VATAM, F024NTBCAM,"
                + "RTRIM(F024ATOFL) AS F024ATOFL, RTRIM(F024ATVFL) AS F024ATVFL,"
                + "F024ATTQT,"
                + "RTRIM(F024OWUTX) AS F024OWUTX, RTRIM(F024ISVFL) AS F024ISVFL, RTRIM(F024FTERM) AS F024FTERM, RTRIM(F024PRERM) AS F024PRERM,"
                + "RTRIM(F024USIID) AS F024USIID, RTRIM(F024USIDT) AS F024USIDT, RTRIM(F024USITM) AS F024USITM, RTRIM(F024USMID) AS F024USMID, RTRIM(F024USMDT) AS F024USMDT, RTRIM(F024USMTM) AS F024USMTM"
                + " FROM LIBMIATEC.F024 WHERE "
                + "F024CSTID = '" + CSTID + "' AND "
                + "F024NBRID = '" + NBRID + "' AND "
                + "F024SRCCDA = '" + SRCCDA + "' AND "
                + "F024BRKSQA = '" + BRKSQA + "'";
        // </editor-fold>

        Statement stmt01 = cnxIBMDB2.getConnection().createStatement();
        ResultSet rs01 = stmt01.executeQuery(SQLQRY01);
        if(rs01.next()){
            fileF024.F024CSTID = rs01.getString("F024CSTID");
            fileF024.F024NBRID = rs01.getInt("F024NBRID");
            fileF024.F024SRCCDA = rs01.getInt("F024SRCCDA");
            fileF024.F024BRKSQA = rs01.getInt("F024BRKSQA");
            fileF024.F024BATSQA = rs01.getString("F024BATSQA");
            fileF024.F024RCBSQA = rs01.getString("F024RCBSQA");
            fileF024.F024BATSQ = rs01.getString("F024BATSQ");
            fileF024.F024RCBSQ = rs01.getString("F024RCBSQ");
            fileF024.F024SRCCD = rs01.getString("F024SRCCD");
            fileF024.F024RBCNB = rs01.getString("F024RBCNB");
            fileF024.F024RSNCD = rs01.getString("F024RSNCD");
            fileF024.F024OURTX = rs01.getString("F024OURTX");
            fileF024.F024CRFNB = rs01.getString("F024CRFNB");
            fileF024.F024FIMNB = rs01.getString("F024FIMNB");
            fileF024.F024FCPNB = rs01.getString("F024FCPNB");
            fileF024.F024YRINB = rs01.getString("F024YRINB");
            fileF024.F024YRBDTY = rs01.getString("F024YRBDTY");
            fileF024.F024YRBDTM = rs01.getString("F024YRBDTM");
            fileF024.F024YRBDTP = rs01.getString("F024YRBDTP");
            fileF024.F024GRSAM = rs01.getDouble("F024GRSAM");
            fileF024.F024TAXAM = rs01.getDouble("F024TAXAM");
            fileF024.F024ISCAM = rs01.getDouble("F024ISCAM");
            fileF024.F024OTCAM = rs01.getDouble("F024OTCAM");
            fileF024.F024HAFAM = rs01.getDouble("F024HAFAM");
            fileF024.F024UATAM = rs01.getDouble("F024UATAM");
            fileF024.F024VATAM = rs01.getDouble("F024VATAM");
            fileF024.F024NTBCAM = rs01.getDouble("F024NTBCAM");
            fileF024.F024ATOFL = rs01.getString("F024ATOFL");
            fileF024.F024ATVFL = rs01.getString("F024ATVFL");
            fileF024.F024ATTQT = rs01.getInt("F024ATTQT");
            fileF024.F024OWUTX = rs01.getString("F024OWUTX");
            fileF024.F024ISVFL = rs01.getString("F024ISVFL");
            fileF024.F024FTERM = rs01.getString("F024FTERM");
            fileF024.F024PRERM = rs01.getString("F024PRERM");
            fileF024.F024USIID = rs01.getString("F024USIID");
            fileF024.F024USIDT = rs01.getString("F024USIDT");
            fileF024.F024USITM = rs01.getString("F024USITM");
            fileF024.F024USMID = rs01.getString("F024USMID");
            fileF024.F024USMDT = rs01.getString("F024USMDT");
            fileF024.F024USMTM = rs01.getString("F024USMTM");

            fileF024.FOUND = true;
        }
        rs01.close();
        stmt01.close();

        return fileF024;
    }

    public F025 getF025(int NBRID, int SRCCDA, int BRKSQA, int BRKSQB) throws SQLException {
        return getF025(CUSTOMER_CODE, NBRID, SRCCDA, BRKSQA, BRKSQB);
    }

    public F025 getF025(String CSTID, int NBRID, int SRCCDA, int BRKSQA, int BRKSQB) throws SQLException {
        F025 fileF025 = new F025();

        // <editor-fold defaultstate="collapsed" desc="{...} SQLQRY01">
        String SQLQRY01 = "SELECT "
                + "RTRIM(F025CSTID) AS F025CSTID, F025NBRID, F025SRCCDA, F025BRKSQA, F025BRKSQB,"
                + "RTRIM(F025RBCNB) AS F025RBCNB, RTRIM(F025TKACD) AS F025TKACD, RTRIM(F025CPNNB) AS F025CPNNB, RTRIM(F025TKDNB) AS F025TKDNB, RTRIM(F025CKDNB) AS F025CKDNB, RTRIM(F025FRACD) AS F025FRACD, RTRIM(F025TOACD) AS F025TOACD,"
                + "F025GRSBAM, F025TAXBAM, F025ISCWPC, F025ISCWAM, F025OTCWPC, F025OTCWAM, F025HAFWAM, F025UATWPC, F025UATWAM, F025VATBAM, F025NTCPAM,"
                + "RTRIM(F025NFPCD) AS F025NFPCD, RTRIM(F025AGSFL) AS F025AGSFL, RTRIM(F025AGVFL) AS F025AGVFL, RTRIM(F025OPMIFL) AS F025OPMIFL, RTRIM(F025VPMIFL) AS F025VPMIFL, RTRIM(F025SACCD) AS F025SACCD, RTRIM(F025ATOFL) AS F025ATOFL, RTRIM(F025ATVFL) AS F025ATVFL,"
                + "F025ATTQT,"
                + "RTRIM(F025ISVFL) AS F025ISVFL, RTRIM(F025CADFL) AS F025CADFL, RTRIM(F025ETKFL) AS F025ETKFL, RTRIM(F025DSGCD) AS F025DSGCD, RTRIM(F025FLTNB) AS F025FLTNB, RTRIM(F025FLTDTY) AS F025FLTDTY, RTRIM(F025FLTDTM) AS F025FLTDTM, RTRIM(F025FLTDTD) AS F025FLTDTD, RTRIM(F025CBCCD) AS F025CBCCD, RTRIM(F025PMTID) AS F025PMTID, RTRIM(F025RSNCD) AS F025RSNCD, RTRIM(F025REFTX1) AS F025REFTX1, RTRIM(F025REFTX2) AS F025REFTX2, RTRIM(F025REFTX3) AS F025REFTX3, RTRIM(F025REFTX4) AS F025REFTX4, RTRIM(F025REFTX5) AS F025REFTX5, RTRIM(F025OWUTX) AS F025OWUTX,"
                + "RTRIM(F025USIID) AS F025USIID, RTRIM(F025USIDT) AS F025USIDT, RTRIM(F025USITM) AS F025USITM, RTRIM(F025USMID) AS F025USMID, RTRIM(F025USMDT) AS F025USMDT, RTRIM(F025USMTM) AS F025USMTM"
                + " FROM LIBMIATEC.F025 WHERE "
                + "F025CSTID = '" + CSTID + "' AND "
                + "F025NBRID = '" + NBRID + "' AND "
                + "F025SRCCDA = '" + SRCCDA + "' AND "
                + "F025BRKSQA = '" + BRKSQA + "' AND "
                + "F017BRKSQB = '" + BRKSQB + "'";
        // </editor-fold>

        Statement stmt01 = cnxIBMDB2.getConnection().createStatement();
        ResultSet rs01 = stmt01.executeQuery(SQLQRY01);
        if(rs01.next()){
            fileF025.F025CSTID = rs01.getString("F025CSTID");
            fileF025.F025NBRID = rs01.getInt("F025NBRID");
            fileF025.F025SRCCDA = rs01.getInt("F025SRCCDA");
            fileF025.F025BRKSQA = rs01.getInt("F025BRKSQA");
            fileF025.F025BRKSQB = rs01.getInt("F025BRKSQB");
            fileF025.F025RBCNB = rs01.getString("F025RBCNB");
            fileF025.F025TKACD = rs01.getString("F025TKACD");
            fileF025.F025CPNNB = rs01.getString("F025CPNNB");
            fileF025.F025TKDNB = rs01.getString("F025TKDNB");
            fileF025.F025CKDNB = rs01.getString("F025CKDNB");
            fileF025.F025FRACD = rs01.getString("F025FRACD");
            fileF025.F025TOACD = rs01.getString("F025TOACD");
            fileF025.F025GRSBAM = rs01.getDouble("F025GRSBAM");
            fileF025.F025TAXBAM = rs01.getDouble("F025TAXBAM");
            fileF025.F025ISCWPC = rs01.getDouble("F025ISCWPC");
            fileF025.F025ISCWAM = rs01.getDouble("F025ISCWAM");
            fileF025.F025OTCWPC = rs01.getDouble("F025OTCWPC");
            fileF025.F025OTCWAM = rs01.getDouble("F025OTCWAM");
            fileF025.F025HAFWAM = rs01.getDouble("F025HAFWAM");
            fileF025.F025UATWPC = rs01.getDouble("F025UATWPC");
            fileF025.F025UATWAM = rs01.getDouble("F025UATWAM");
            fileF025.F025VATBAM = rs01.getDouble("F025VATBAM");
            fileF025.F025NTCPAM = rs01.getDouble("F025NTCPAM");
            fileF025.F025NFPCD = rs01.getString("F025NFPCD");
            fileF025.F025AGSFL = rs01.getString("F025AGSFL");
            fileF025.F025AGVFL = rs01.getString("F025AGVFL");
            fileF025.F025OPMIFL = rs01.getString("F025OPMIFL");
            fileF025.F025VPMIFL = rs01.getString("F025VPMIFL");
            fileF025.F025SACCD = rs01.getString("F025SACCD");
            fileF025.F025ATOFL = rs01.getString("F025ATOFL");
            fileF025.F025ATVFL = rs01.getString("F025ATVFL");
            fileF025.F025ATTQT = rs01.getInt("F025ATTQT");
            fileF025.F025ISVFL = rs01.getString("F025ISVFL");
            fileF025.F025CADFL = rs01.getString("F025CADFL");
            fileF025.F025ETKFL = rs01.getString("F025ETKFL");
            fileF025.F025DSGCD = rs01.getString("F025DSGCD");
            fileF025.F025FLTNB = rs01.getString("F025FLTNB");
            fileF025.F025FLTDTY = rs01.getString("F025FLTDTY");
            fileF025.F025FLTDTM = rs01.getString("F025FLTDTM");
            fileF025.F025FLTDTD = rs01.getString("F025FLTDTD");
            fileF025.F025CBCCD = rs01.getString("F025CBCCD");
            fileF025.F025PMTID = rs01.getString("F025PMTID");
            fileF025.F025RSNCD = rs01.getString("F025RSNCD");
            fileF025.F025REFTX1 = rs01.getString("F025REFTX1");
            fileF025.F025REFTX2 = rs01.getString("F025REFTX2");
            fileF025.F025REFTX3 = rs01.getString("F025REFTX3");
            fileF025.F025REFTX4 = rs01.getString("F025REFTX4");
            fileF025.F025REFTX5 = rs01.getString("F025REFTX5");
            fileF025.F025OWUTX = rs01.getString("F025OWUTX");
            fileF025.F025USIID = rs01.getString("F025USIID");
            fileF025.F025USIDT = rs01.getString("F025USIDT");
            fileF025.F025USITM = rs01.getString("F025USITM");
            fileF025.F025USMID = rs01.getString("F025USMID");
            fileF025.F025USMDT = rs01.getString("F025USMDT");
            fileF025.F025USMTM = rs01.getString("F025USMTM");

            fileF025.FOUND = true;
        }
        rs01.close();
        stmt01.close();

        return fileF025;
    }

    public F025[] getF025_A(int NBRID, int SRCCDA, int BRKSQA) throws SQLException {
        return getF025_A(CUSTOMER_CODE, NBRID, SRCCDA, BRKSQA);
    }

    public F025[] getF025_A(String CSTID, int NBRID, int SRCCDA, int BRKSQA) throws SQLException {
        ArrayList<F025> listF025 = new ArrayList<F025>(0);
        F025 fileF025;

        // <editor-fold defaultstate="collapsed" desc="{...} SQLQRY01">
        String SQLQRY01 = "SELECT "
                + "RTRIM(F025CSTID) AS F025CSTID, F025NBRID, F025SRCCDA, F025BRKSQA, F025BRKSQB,"
                + "RTRIM(F025RBCNB) AS F025RBCNB, RTRIM(F025TKACD) AS F025TKACD, RTRIM(F025CPNNB) AS F025CPNNB, RTRIM(F025TKDNB) AS F025TKDNB, RTRIM(F025CKDNB) AS F025CKDNB, RTRIM(F025FRACD) AS F025FRACD, RTRIM(F025TOACD) AS F025TOACD,"
                + "F025GRSBAM, F025TAXBAM, F025ISCWPC, F025ISCWAM, F025OTCWPC, F025OTCWAM, F025HAFWAM, F025UATWPC, F025UATWAM, F025VATBAM, F025NTCPAM,"
                + "RTRIM(F025NFPCD) AS F025NFPCD, RTRIM(F025AGSFL) AS F025AGSFL, RTRIM(F025AGVFL) AS F025AGVFL, RTRIM(F025OPMIFL) AS F025OPMIFL, RTRIM(F025VPMIFL) AS F025VPMIFL, RTRIM(F025SACCD) AS F025SACCD, RTRIM(F025ATOFL) AS F025ATOFL, RTRIM(F025ATVFL) AS F025ATVFL,"
                + "F025ATTQT,"
                + "RTRIM(F025ISVFL) AS F025ISVFL, RTRIM(F025CADFL) AS F025CADFL, RTRIM(F025ETKFL) AS F025ETKFL, RTRIM(F025DSGCD) AS F025DSGCD, RTRIM(F025FLTNB) AS F025FLTNB, RTRIM(F025FLTDTY) AS F025FLTDTY, RTRIM(F025FLTDTM) AS F025FLTDTM, RTRIM(F025FLTDTD) AS F025FLTDTD, RTRIM(F025CBCCD) AS F025CBCCD, RTRIM(F025PMTID) AS F025PMTID, RTRIM(F025RSNCD) AS F025RSNCD, RTRIM(F025REFTX1) AS F025REFTX1, RTRIM(F025REFTX2) AS F025REFTX2, RTRIM(F025REFTX3) AS F025REFTX3, RTRIM(F025REFTX4) AS F025REFTX4, RTRIM(F025REFTX5) AS F025REFTX5, RTRIM(F025OWUTX) AS F025OWUTX,"
                + "RTRIM(F025USIID) AS F025USIID, RTRIM(F025USIDT) AS F025USIDT, RTRIM(F025USITM) AS F025USITM, RTRIM(F025USMID) AS F025USMID, RTRIM(F025USMDT) AS F025USMDT, RTRIM(F025USMTM) AS F025USMTM"
                + " FROM LIBMIATEC.F025 WHERE "
                + "F025CSTID = '" + CSTID + "' AND "
                + "F025NBRID = '" + NBRID + "' AND "
                + "F025SRCCDA = '" + SRCCDA + "' AND "
                + "F025BRKSQA = '" + BRKSQA + "'";
        // </editor-fold>

        Statement stmt01 = cnxIBMDB2.getConnection().createStatement();
        ResultSet rs01 = stmt01.executeQuery(SQLQRY01);
        while(rs01.next()){
            fileF025 = new F025();
            fileF025.F025CSTID = rs01.getString("F025CSTID");
            fileF025.F025NBRID = rs01.getInt("F025NBRID");
            fileF025.F025SRCCDA = rs01.getInt("F025SRCCDA");
            fileF025.F025BRKSQA = rs01.getInt("F025BRKSQA");
            fileF025.F025BRKSQB = rs01.getInt("F025BRKSQB");
            fileF025.F025RBCNB = rs01.getString("F025RBCNB");
            fileF025.F025TKACD = rs01.getString("F025TKACD");
            fileF025.F025CPNNB = rs01.getString("F025CPNNB");
            fileF025.F025TKDNB = rs01.getString("F025TKDNB");
            fileF025.F025CKDNB = rs01.getString("F025CKDNB");
            fileF025.F025FRACD = rs01.getString("F025FRACD");
            fileF025.F025TOACD = rs01.getString("F025TOACD");
            fileF025.F025GRSBAM = rs01.getDouble("F025GRSBAM");
            fileF025.F025TAXBAM = rs01.getDouble("F025TAXBAM");
            fileF025.F025ISCWPC = rs01.getDouble("F025ISCWPC");
            fileF025.F025ISCWAM = rs01.getDouble("F025ISCWAM");
            fileF025.F025OTCWPC = rs01.getDouble("F025OTCWPC");
            fileF025.F025OTCWAM = rs01.getDouble("F025OTCWAM");
            fileF025.F025HAFWAM = rs01.getDouble("F025HAFWAM");
            fileF025.F025UATWPC = rs01.getDouble("F025UATWPC");
            fileF025.F025UATWAM = rs01.getDouble("F025UATWAM");
            fileF025.F025VATBAM = rs01.getDouble("F025VATBAM");
            fileF025.F025NTCPAM = rs01.getDouble("F025NTCPAM");
            fileF025.F025NFPCD = rs01.getString("F025NFPCD");
            fileF025.F025AGSFL = rs01.getString("F025AGSFL");
            fileF025.F025AGVFL = rs01.getString("F025AGVFL");
            fileF025.F025OPMIFL = rs01.getString("F025OPMIFL");
            fileF025.F025VPMIFL = rs01.getString("F025VPMIFL");
            fileF025.F025SACCD = rs01.getString("F025SACCD");
            fileF025.F025ATOFL = rs01.getString("F025ATOFL");
            fileF025.F025ATVFL = rs01.getString("F025ATVFL");
            fileF025.F025ATTQT = rs01.getInt("F025ATTQT");
            fileF025.F025ISVFL = rs01.getString("F025ISVFL");
            fileF025.F025CADFL = rs01.getString("F025CADFL");
            fileF025.F025ETKFL = rs01.getString("F025ETKFL");
            fileF025.F025DSGCD = rs01.getString("F025DSGCD");
            fileF025.F025FLTNB = rs01.getString("F025FLTNB");
            fileF025.F025FLTDTY = rs01.getString("F025FLTDTY");
            fileF025.F025FLTDTM = rs01.getString("F025FLTDTM");
            fileF025.F025FLTDTD = rs01.getString("F025FLTDTD");
            fileF025.F025CBCCD = rs01.getString("F025CBCCD");
            fileF025.F025PMTID = rs01.getString("F025PMTID");
            fileF025.F025RSNCD = rs01.getString("F025RSNCD");
            fileF025.F025REFTX1 = rs01.getString("F025REFTX1");
            fileF025.F025REFTX2 = rs01.getString("F025REFTX2");
            fileF025.F025REFTX3 = rs01.getString("F025REFTX3");
            fileF025.F025REFTX4 = rs01.getString("F025REFTX4");
            fileF025.F025REFTX5 = rs01.getString("F025REFTX5");
            fileF025.F025OWUTX = rs01.getString("F025OWUTX");
            fileF025.F025USIID = rs01.getString("F025USIID");
            fileF025.F025USIDT = rs01.getString("F025USIDT");
            fileF025.F025USITM = rs01.getString("F025USITM");
            fileF025.F025USMID = rs01.getString("F025USMID");
            fileF025.F025USMDT = rs01.getString("F025USMDT");
            fileF025.F025USMTM = rs01.getString("F025USMTM");

            fileF025.FOUND = true;

            listF025.add(fileF025);
        }
        rs01.close();
        stmt01.close();

        return listF025.toArray(new F025[listF025.size()]);
    }

    public F060 getF060(int NBRID, int SRCCDA, int BRKSQA) throws SQLException {
        return getF060(CUSTOMER_CODE, NBRID, SRCCDA, BRKSQA);
    }

    public F060 getF060(String CSTID, int NBRID, int SRCCDA, int BRKSQA) throws SQLException {
        F060 fileF060 = new F060();

        // <editor-fold defaultstate="collapsed" desc="{...} SQLQRY01">
        String SQLQRY01 = "SELECT "
                + "RTRIM(F060CSTID) AS F060CSTID, F060NBRID, F060SRCCDA, F060BRKSQA,"
                + "RTRIM(F060BATSQA) AS F060BATSQA, RTRIM(F060RCBSQA) AS F060RCBSQA, RTRIM(F060BATSQ) AS F060BATSQ, RTRIM(F060RCBSQ) AS F060RCBSQ, RTRIM(F060TKACD) AS F060TKACD, RTRIM(F060CPNNB) AS F060CPNNB, RTRIM(F060TKDNB) AS F060TKDNB, RTRIM(F060CKDNB) AS F060CKDNB,"
                + "F060GRSAM, F060ISCPC, F060TAXAM,"
                + "RTRIM(F060CADFL) AS F060CADFL, RTRIM(F060SRCCD) AS F060SRCCD, RTRIM(F060ETKFL) AS F060ETKFL, RTRIM(F060OPMIFL) AS F060OPMIFL, RTRIM(F060VPMIFL) AS F060VPMIFL, RTRIM(F060DSGCD) AS F060DSGCD, RTRIM(F060FLTNB) AS F060FLTNB, RTRIM(F060FLTDTY) AS F060FLTDTY, RTRIM(F060FLTDTM) AS F060FLTDTM, RTRIM(F060FLTDTD) AS F060FLTDTD, RTRIM(F060FRACD) AS F060FRACD, RTRIM(F060TOACD) AS F060TOACD, RTRIM(F060FLRTX) AS F060FLRTX, RTRIM(F060HAFTP) AS F060HAFTP,"
                + "F060HAFAM,"
                + "RTRIM(F060SACCD) AS F060SACCD, F060ISCAM, F060OTCPC, F060OTCAM, F060UATPC, F060UATAM, F060VATAM, F060NTCAM, RTRIM(F060CBCCD) AS F060CBCCD, RTRIM(F060PMTID) AS F060PMTID, RTRIM(F060NFPCD) AS F060NFPCD, RTRIM(F060AGSFL) AS F060AGSFL, RTRIM(F060AGVFL) AS F060AGVFL, RTRIM(F060ATOFL) AS F060ATOFL, RTRIM(F060ATVFL) AS F060ATVFL,"
                + "F060ATTQT,"
                + "F060SCHAM, RTRIM(F060ISVFL) AS F060ISVFL, RTRIM(F060RSNCD) AS F060RSNCD, RTRIM(F060REFTX1) AS F060REFTX1, RTRIM(F060REFTX2) AS F060REFTX2, RTRIM(F060REFTX3) AS F060REFTX3, RTRIM(F060REFTX4) AS F060REFTX4, RTRIM(F060REFTX5) AS F060REFTX5, RTRIM(F060OWUTX) AS F060OWUTX, RTRIM(F060FTECP) AS F060FTECP,"
                + "RTRIM(F060USIID) AS F060USIID, RTRIM(F060USIDT) AS F060USIDT, RTRIM(F060USITM) AS F060USITM, RTRIM(F060USMID) AS F060USMID, RTRIM(F060USMDT) AS F060USMDT, RTRIM(F060USMTM) AS F060USMTM"
                + " FROM LIBMIATEC.F060 WHERE "
                + "F060CSTID = '" + CSTID + "' AND "
                + "F060NBRID = '" + NBRID + "' AND "
                + "F060SRCCDA = '" + SRCCDA + "' AND "
                + "F060BRKSQA = '" + BRKSQA + "'";
        // </editor-fold>

        Statement stmt01 = cnxIBMDB2.getConnection().createStatement();
        ResultSet rs01 = stmt01.executeQuery(SQLQRY01);
        if(rs01.next()){
            fileF060.F060CSTID = rs01.getString("F060CSTID");
            fileF060.F060NBRID = rs01.getInt("F060NBRID");
            fileF060.F060SRCCDA = rs01.getInt("F060SRCCDA");
            fileF060.F060BRKSQA = rs01.getInt("F060BRKSQA");
            fileF060.F060BATSQA = rs01.getString("F060BATSQA");
            fileF060.F060RCBSQA = rs01.getString("F060RCBSQA");
            fileF060.F060BATSQ = rs01.getString("F060BATSQ");
            fileF060.F060RCBSQ = rs01.getString("F060RCBSQ");
            fileF060.F060TKACD = rs01.getString("F060TKACD");
            fileF060.F060CPNNB = rs01.getString("F060CPNNB");
            fileF060.F060TKDNB = rs01.getString("F060TKDNB");
            fileF060.F060CKDNB = rs01.getString("F060CKDNB");
            fileF060.F060GRSAM = rs01.getDouble("F060GRSAM");
            fileF060.F060ISCPC = rs01.getDouble("F060ISCPC");
            fileF060.F060TAXAM = rs01.getDouble("F060TAXAM");
            fileF060.F060CADFL = rs01.getString("F060CADFL");
            fileF060.F060SRCCD = rs01.getString("F060SRCCD");
            fileF060.F060ETKFL = rs01.getString("F060ETKFL");
            fileF060.F060OPMIFL = rs01.getString("F060OPMIFL");
            fileF060.F060VPMIFL = rs01.getString("F060VPMIFL");
            fileF060.F060DSGCD = rs01.getString("F060DSGCD");
            fileF060.F060FLTNB = rs01.getString("F060FLTNB");
            fileF060.F060FLTDTY = rs01.getString("F060FLTDTY");
            fileF060.F060FLTDTM = rs01.getString("F060FLTDTM");
            fileF060.F060FLTDTD = rs01.getString("F060FLTDTD");
            fileF060.F060FRACD = rs01.getString("F060FRACD");
            fileF060.F060TOACD = rs01.getString("F060TOACD");
            fileF060.F060FLRTX = rs01.getString("F060FLRTX");
            fileF060.F060HAFTP = rs01.getString("F060HAFTP");
            fileF060.F060HAFAM = rs01.getDouble("F060HAFAM");
            fileF060.F060SACCD = rs01.getString("F060SACCD");
            fileF060.F060ISCAM = rs01.getDouble("F060ISCAM");
            fileF060.F060OTCPC = rs01.getDouble("F060OTCPC");
            fileF060.F060OTCAM = rs01.getDouble("F060OTCAM");
            fileF060.F060UATPC = rs01.getDouble("F060UATPC");
            fileF060.F060UATAM = rs01.getDouble("F060UATAM");
            fileF060.F060VATAM = rs01.getDouble("F060VATAM");
            fileF060.F060NTCAM = rs01.getDouble("F060NTCAM");
            fileF060.F060CBCCD = rs01.getString("F060CBCCD");
            fileF060.F060PMTID = rs01.getString("F060PMTID");
            fileF060.F060NFPCD = rs01.getString("F060NFPCD");
            fileF060.F060AGSFL = rs01.getString("F060AGSFL");
            fileF060.F060AGVFL = rs01.getString("F060AGVFL");
            fileF060.F060ATOFL = rs01.getString("F060ATOFL");
            fileF060.F060ATVFL = rs01.getString("F060ATVFL");
            fileF060.F060ATTQT = rs01.getInt("F060ATTQT");
            fileF060.F060SCHAM = rs01.getDouble("F060SCHAM");
            fileF060.F060ISVFL = rs01.getString("F060ISVFL");
            fileF060.F060RSNCD = rs01.getString("F060RSNCD");
            fileF060.F060REFTX1 = rs01.getString("F060REFTX1");
            fileF060.F060REFTX2 = rs01.getString("F060REFTX2");
            fileF060.F060REFTX3 = rs01.getString("F060REFTX3");
            fileF060.F060REFTX4 = rs01.getString("F060REFTX4");
            fileF060.F060REFTX5 = rs01.getString("F060REFTX5");
            fileF060.F060OWUTX = rs01.getString("F060OWUTX");
            fileF060.F060FTECP = rs01.getString("F060FTECP");
            fileF060.F060USIID = rs01.getString("F060USIID");
            fileF060.F060USIDT = rs01.getString("F060USIDT");
            fileF060.F060USITM = rs01.getString("F060USITM");
            fileF060.F060USMID = rs01.getString("F060USMID");
            fileF060.F060USMDT = rs01.getString("F060USMDT");
            fileF060.F060USMTM = rs01.getString("F060USMTM");

            fileF060.FOUND = true;
        }
        rs01.close();
        stmt01.close();

        return fileF060;
    }

    public F061 getF061(int NBRID, int SRCCDA, int BRKSQA, int TAXSQB) throws SQLException {
        return getF061(CUSTOMER_CODE, NBRID, SRCCDA, BRKSQA, TAXSQB);
    }

    public F061 getF061(String CSTID, int NBRID, int SRCCDA, int BRKSQA, int TAXSQB) throws SQLException {
        F061 fileF061 = new F061();

        // <editor-fold defaultstate="collapsed" desc="{...} SQLQRY01">
        String SQLQRY01 = "SELECT "
                + "RTRIM(F061CSTID) AS F061CSTID, F061NBRID, F061SRCCDA, F061BRKSQA, F061TAXSQB,"
                + "RTRIM(F061TKACD) AS F061TKACD, RTRIM(F061CPNNB) AS F061CPNNB, RTRIM(F061TKDNB) AS F061TKDNB, RTRIM(F061TAXCD1) AS F061TAXCD1,"
                + "F061TAXAM1, F061TXPAM1,"
                + "RTRIM(F061COPCD1) AS F061COPCD1,"
                + "F061TXBAM1,"
                + "RTRIM(F061USIID) AS F061USIID, RTRIM(F061USIDT) AS F061USIDT, RTRIM(F061USITM) AS F061USITM, RTRIM(F061USMID) AS F061USMID, RTRIM(F061USMDT) AS F061USMDT, RTRIM(F061USMTM) AS F061USMTM"
                + " FROM LIBMIATEC.F061 WHERE "
                + "F061CSTID = '" + CSTID + "' AND "
                + "F061NBRID = '" + NBRID + "' AND "
                + "F061SRCCDA = '" + SRCCDA + "' AND "
                + "F061BRKSQA = '" + BRKSQA + "' AND "
                + "F061TAXSQB = '" + TAXSQB + "'";
        // </editor-fold>

        Statement stmt01 = cnxIBMDB2.getConnection().createStatement();
        ResultSet rs01 = stmt01.executeQuery(SQLQRY01);
        if(rs01.next()){
            fileF061.F061CSTID = rs01.getString("F061CSTID");
            fileF061.F061NBRID = rs01.getInt("F061NBRID");
            fileF061.F061SRCCDA = rs01.getInt("F061SRCCDA");
            fileF061.F061BRKSQA = rs01.getInt("F061BRKSQA");
            fileF061.F061TAXSQB = rs01.getInt("F061TAXSQB");
            fileF061.F061TKACD = rs01.getString("F061TKACD");
            fileF061.F061CPNNB = rs01.getString("F061CPNNB");
            fileF061.F061TKDNB = rs01.getString("F061TKDNB");
            fileF061.F061TAXCD1 = rs01.getString("F061TAXCD1");
            fileF061.F061TAXAM1 = rs01.getDouble("F061TAXAM1");
            fileF061.F061TXPAM1 = rs01.getDouble("F061TXPAM1");
            fileF061.F061COPCD1 = rs01.getString("F061COPCD1");
            fileF061.F061TXBAM1 = rs01.getDouble("F061TXBAM1");
            fileF061.F061USIID = rs01.getString("F061USIID");
            fileF061.F061USIDT = rs01.getString("F061USIDT");
            fileF061.F061USITM = rs01.getString("F061USITM");
            fileF061.F061USMID = rs01.getString("F061USMID");
            fileF061.F061USMDT = rs01.getString("F061USMDT");
            fileF061.F061USMTM = rs01.getString("F061USMTM");

            fileF061.FOUND = true;
        }
        rs01.close();
        stmt01.close();

        return fileF061;
    }

    public F061[] getF061_A(int NBRID, int SRCCDA, int BRKSQA) throws SQLException {
        return getF061_A(CUSTOMER_CODE, NBRID, SRCCDA, BRKSQA);
    }

    public F061[] getF061_A(String CSTID, int NBRID, int SRCCDA, int BRKSQA) throws SQLException {
        ArrayList<F061> listF061 = new ArrayList<F061>(0);
        F061 fileF061;

        // <editor-fold defaultstate="collapsed" desc="{...} SQLQRY01">
        String SQLQRY01 = "SELECT "
                + "RTRIM(F061CSTID) AS F061CSTID, F061NBRID, F061SRCCDA, F061BRKSQA, F061TAXSQB,"
                + "RTRIM(F061TKACD) AS F061TKACD, RTRIM(F061CPNNB) AS F061CPNNB, RTRIM(F061TKDNB) AS F061TKDNB, RTRIM(F061TAXCD1) AS F061TAXCD1,"
                + "F061TAXAM1, F061TXPAM1,"
                + "RTRIM(F061COPCD1) AS F061COPCD1,"
                + "F061TXBAM1,"
                + "RTRIM(F061USIID) AS F061USIID, RTRIM(F061USIDT) AS F061USIDT, RTRIM(F061USITM) AS F061USITM, RTRIM(F061USMID) AS F061USMID, RTRIM(F061USMDT) AS F061USMDT, RTRIM(F061USMTM) AS F061USMTM"
                + " FROM LIBMIATEC.F061 WHERE "
                + "F061CSTID = '" + CSTID + "' AND "
                + "F061NBRID = '" + NBRID + "' AND "
                + "F061SRCCDA = '" + SRCCDA + "' AND "
                + "F061BRKSQA = '" + BRKSQA + "'";
        // </editor-fold>

        Statement stmt01 = cnxIBMDB2.getConnection().createStatement();
        ResultSet rs01 = stmt01.executeQuery(SQLQRY01);
        while(rs01.next()){
            fileF061 = new F061();
            fileF061.F061CSTID = rs01.getString("F061CSTID");
            fileF061.F061NBRID = rs01.getInt("F061NBRID");
            fileF061.F061SRCCDA = rs01.getInt("F061SRCCDA");
            fileF061.F061BRKSQA = rs01.getInt("F061BRKSQA");
            fileF061.F061TAXSQB = rs01.getInt("F061TAXSQB");
            fileF061.F061TKACD = rs01.getString("F061TKACD");
            fileF061.F061CPNNB = rs01.getString("F061CPNNB");
            fileF061.F061TKDNB = rs01.getString("F061TKDNB");
            fileF061.F061TAXCD1 = rs01.getString("F061TAXCD1");
            fileF061.F061TAXAM1 = rs01.getDouble("F061TAXAM1");
            fileF061.F061TXPAM1 = rs01.getDouble("F061TXPAM1");
            fileF061.F061COPCD1 = rs01.getString("F061COPCD1");
            fileF061.F061TXBAM1 = rs01.getDouble("F061TXBAM1");
            fileF061.F061USIID = rs01.getString("F061USIID");
            fileF061.F061USIDT = rs01.getString("F061USIDT");
            fileF061.F061USITM = rs01.getString("F061USITM");
            fileF061.F061USMID = rs01.getString("F061USMID");
            fileF061.F061USMDT = rs01.getString("F061USMDT");
            fileF061.F061USMTM = rs01.getString("F061USMTM");

            fileF061.FOUND = true;

            listF061.add(fileF061);
        }
        rs01.close();
        stmt01.close();

        return listF061.toArray(new F061[listF061.size()]);
    }

    public F062 getF062(int NBRID, int SRCCDA, int BRKSQA, int VATSQB) throws SQLException {
        return getF062(CUSTOMER_CODE, NBRID, SRCCDA, BRKSQA, VATSQB);
    }

    public F062 getF062(String CSTID, int NBRID, int SRCCDA, int BRKSQA, int VATSQB) throws SQLException {
        F062 fileF062 = new F062();

        // <editor-fold defaultstate="collapsed" desc="{...} SQLQRY01">
        String SQLQRY01 = "SELECT "
                + "RTRIM(F062CSTID) AS F062CSTID, F062NBRID, F062SRCCDA, F062BRKSQA, F062VATSQB,"
                + "RTRIM(F062TKACD) AS F062TKACD, RTRIM(F062CPNNB) AS F062CPNNB, RTRIM(F062TKDNB) AS F062TKDNB, RTRIM(F062VATID1) AS F062VATID1, RTRIM(F062VATLB1) AS F062VATLB1, RTRIM(F062VATTX1) AS F062VATTX1,"
                + "F062VTBAM1, F062VTPPC1, F062VATAM1,"
                + "RTRIM(F062USIID) AS F062USIID, RTRIM(F062USIDT) AS F062USIDT, RTRIM(F062USITM) AS F062USITM, RTRIM(F062USMID) AS F062USMID, RTRIM(F062USMDT) AS F062USMDT, RTRIM(F062USMTM) AS F062USMTM"
                + " FROM LIBMIATEC.F062 WHERE "
                + "F062CSTID = '" + CSTID + "' AND "
                + "F062NBRID = '" + NBRID + "' AND "
                + "F062SRCCDA = '" + SRCCDA + "' AND "
                + "F062BRKSQA = '" + BRKSQA + "' AND "
                + "F062VATSQB = '" + VATSQB + "'";
        // </editor-fold>

        Statement stmt01 = cnxIBMDB2.getConnection().createStatement();
        ResultSet rs01 = stmt01.executeQuery(SQLQRY01);
        if(rs01.next()){
            fileF062.F062CSTID = rs01.getString("F062CSTID");
            fileF062.F062NBRID = rs01.getInt("F062NBRID");
            fileF062.F062SRCCDA = rs01.getInt("F062SRCCDA");
            fileF062.F062BRKSQA = rs01.getInt("F062BRKSQA");
            fileF062.F062VATSQB = rs01.getInt("F062VATSQB");
            fileF062.F062TKACD = rs01.getString("F062TKACD");
            fileF062.F062CPNNB = rs01.getString("F062CPNNB");
            fileF062.F062TKDNB = rs01.getString("F062TKDNB");
            fileF062.F062VATID1 = rs01.getString("F062VATID1");
            fileF062.F062VATLB1 = rs01.getString("F062VATLB1");
            fileF062.F062VATTX1 = rs01.getString("F062VATTX1");
            fileF062.F062VTBAM1 = rs01.getDouble("F062VTBAM1");
            fileF062.F062VTPPC1 = rs01.getDouble("F062VTPPC1");
            fileF062.F062VATAM1 = rs01.getDouble("F062VATAM1");
            fileF062.F062USIID = rs01.getString("F062USIID");
            fileF062.F062USIDT = rs01.getString("F062USIDT");
            fileF062.F062USITM = rs01.getString("F062USITM");
            fileF062.F062USMID = rs01.getString("F062USMID");
            fileF062.F062USMDT = rs01.getString("F062USMDT");
            fileF062.F062USMTM = rs01.getString("F062USMTM");

            fileF062.FOUND = true;
        }
        rs01.close();
        stmt01.close();

        return fileF062;
    }

    public F062[] getF062_A(int NBRID, int SRCCDA, int BRKSQA) throws SQLException {
        return getF062_A(CUSTOMER_CODE, NBRID, SRCCDA, BRKSQA);
    }

    public F062[] getF062_A(String CSTID, int NBRID, int SRCCDA, int BRKSQA) throws SQLException {
        ArrayList<F062> listF062 = new ArrayList<F062>(0);
        F062 fileF062;

        // <editor-fold defaultstate="collapsed" desc="{...} SQLQRY01">
        String SQLQRY01 = "SELECT "
                + "RTRIM(F062CSTID) AS F062CSTID, F062NBRID, F062SRCCDA, F062BRKSQA, F062VATSQB,"
                + "RTRIM(F062TKACD) AS F062TKACD, RTRIM(F062CPNNB) AS F062CPNNB, RTRIM(F062TKDNB) AS F062TKDNB, RTRIM(F062VATID1) AS F062VATID1, RTRIM(F062VATLB1) AS F062VATLB1, RTRIM(F062VATTX1) AS F062VATTX1,"
                + "F062VTBAM1, F062VTPPC1, F062VATAM1,"
                + "RTRIM(F062USIID) AS F062USIID, RTRIM(F062USIDT) AS F062USIDT, RTRIM(F062USITM) AS F062USITM, RTRIM(F062USMID) AS F062USMID, RTRIM(F062USMDT) AS F062USMDT, RTRIM(F062USMTM) AS F062USMTM"
                + " FROM LIBMIATEC.F062 WHERE "
                + "F062CSTID = '" + CSTID + "' AND "
                + "F062NBRID = '" + NBRID + "' AND "
                + "F062SRCCDA = '" + SRCCDA + "' AND "
                + "F062BRKSQA = '" + BRKSQA + "'";
        // </editor-fold>

        Statement stmt01 = cnxIBMDB2.getConnection().createStatement();
        ResultSet rs01 = stmt01.executeQuery(SQLQRY01);
        while(rs01.next()){
            fileF062 = new F062();
            fileF062.F062CSTID = rs01.getString("F062CSTID");
            fileF062.F062NBRID = rs01.getInt("F062NBRID");
            fileF062.F062SRCCDA = rs01.getInt("F062SRCCDA");
            fileF062.F062BRKSQA = rs01.getInt("F062BRKSQA");
            fileF062.F062VATSQB = rs01.getInt("F062VATSQB");
            fileF062.F062TKACD = rs01.getString("F062TKACD");
            fileF062.F062CPNNB = rs01.getString("F062CPNNB");
            fileF062.F062TKDNB = rs01.getString("F062TKDNB");
            fileF062.F062VATID1 = rs01.getString("F062VATID1");
            fileF062.F062VATLB1 = rs01.getString("F062VATLB1");
            fileF062.F062VATTX1 = rs01.getString("F062VATTX1");
            fileF062.F062VTBAM1 = rs01.getDouble("F062VTBAM1");
            fileF062.F062VTPPC1 = rs01.getDouble("F062VTPPC1");
            fileF062.F062VATAM1 = rs01.getDouble("F062VATAM1");
            fileF062.F062USIID = rs01.getString("F062USIID");
            fileF062.F062USIDT = rs01.getString("F062USIDT");
            fileF062.F062USITM = rs01.getString("F062USITM");
            fileF062.F062USMID = rs01.getString("F062USMID");
            fileF062.F062USMDT = rs01.getString("F062USMDT");
            fileF062.F062USMTM = rs01.getString("F062USMTM");

            fileF062.FOUND = true;

            listF062.add(fileF062);
        }
        rs01.close();
        stmt01.close();

        return listF062.toArray(new F062[listF062.size()]);
    }

    public F023 getF023(int NBRID, int SRCCDA, int BRKSQA, int BRKSQB, int PSLSQC) throws SQLException {
        return getF023(CUSTOMER_CODE, NBRID, SRCCDA, BRKSQA, BRKSQB, PSLSQC);
    }

    public F023 getF023(String CSTID, int NBRID, int SRCCDA, int BRKSQA, int BRKSQB, int PSLSQC) throws SQLException {
        F023 fileF023 = new F023();

        // <editor-fold defaultstate="collapsed" desc="{...} SQLQRY01">
        String SQLQRY01 = "SELECT "
                + "RTRIM(F023CSTID) AS F023CSTID, F023NBRID, F023SRCCDA, F023BRKSQA, F023BRKSQB, F023PSLSQC,"
                + "RTRIM(F023RBCNB) AS F023RBCNB, RTRIM(F023TKACD) AS F023TKACD, RTRIM(F023CPNNB) AS F023CPNNB, RTRIM(F023TKDNB) AS F023TKDNB,"
                + "F023PSLTX1, F023PSLTX2, F023PSLTX3, F023PSLTX4, F023PSLTX5,"
                + "RTRIM(F023USIID) AS F023USIID, RTRIM(F023USIDT) AS F023USIDT, RTRIM(F023USITM) AS F023USITM, RTRIM(F023USMID) AS F023USMID, RTRIM(F023USMDT) AS F023USMDT, RTRIM(F023USMTM) AS F023USMTM"
                + " FROM LIBMIATEC.F023 WHERE "
                + "F023CSTID = '" + CSTID + "' AND "
                + "F023NBRID = '" + NBRID + "' AND "
                + "F023SRCCDA = '" + SRCCDA + "' AND "
                + "F023BRKSQA = '" + BRKSQA + "' AND "
                + "F023BRKSQB = '" + BRKSQB + "' AND "
                + "F023PSLSQC = '" + PSLSQC + "'";
        // </editor-fold>

        Statement stmt01 = cnxIBMDB2.getConnection().createStatement();
        ResultSet rs01 = stmt01.executeQuery(SQLQRY01);
        if(rs01.next()){
            fileF023.F023CSTID = rs01.getString("F023CSTID");
            fileF023.F023NBRID = rs01.getInt("F023NBRID");
            fileF023.F023SRCCDA = rs01.getInt("F023SRCCDA");
            fileF023.F023BRKSQA = rs01.getInt("F023BRKSQA");
            fileF023.F023BRKSQB = rs01.getInt("F023BRKSQB");
            fileF023.F023PSLSQC = rs01.getInt("F023PSLSQC");
            fileF023.F023RBCNB = rs01.getString("F023RBCNB");
            fileF023.F023TKACD = rs01.getString("F023TKACD");
            fileF023.F023CPNNB = rs01.getString("F023CPNNB");
            fileF023.F023TKDNB = rs01.getString("F023TKDNB");
            fileF023.F023PSLTX1 = rs01.getString("F023PSLTX1");
            fileF023.F023PSLTX2 = rs01.getString("F023PSLTX2");
            fileF023.F023PSLTX3 = rs01.getString("F023PSLTX3");
            fileF023.F023PSLTX4 = rs01.getString("F023PSLTX4");
            fileF023.F023PSLTX5 = rs01.getString("F023PSLTX5");
            fileF023.F023USIID = rs01.getString("F023USIID");
            fileF023.F023USIDT = rs01.getString("F023USIDT");
            fileF023.F023USITM = rs01.getString("F023USITM");
            fileF023.F023USMID = rs01.getString("F023USMID");
            fileF023.F023USMDT = rs01.getString("F023USMDT");
            fileF023.F023USMTM = rs01.getString("F023USMTM");

            fileF023.FOUND = true;
        }
        rs01.close();
        stmt01.close();

        return fileF023;
    }

    public F023[] getF023_A(int NBRID, int SRCCDA, int BRKSQA, int BRKSQB) throws SQLException {
        return getF023_A(CUSTOMER_CODE, NBRID, SRCCDA, BRKSQA, BRKSQB);
    }

    public F023[] getF023_A(String CSTID, int NBRID, int SRCCDA, int BRKSQA, int BRKSQB) throws SQLException {
        ArrayList<F023> listF023 = new ArrayList<F023>(0);
        F023 fileF023;

        // <editor-fold defaultstate="collapsed" desc="{...} SQLQRY01">
        String SQLQRY01 = "SELECT "
                + "RTRIM(F023CSTID) AS F023CSTID, F023NBRID, F023SRCCDA, F023BRKSQA, F023BRKSQB, F023PSLSQC,"
                + "RTRIM(F023RBCNB) AS F023RBCNB, RTRIM(F023TKACD) AS F023TKACD, RTRIM(F023CPNNB) AS F023CPNNB, RTRIM(F023TKDNB) AS F023TKDNB,"
                + "F023PSLTX1, F023PSLTX2, F023PSLTX3, F023PSLTX4, F023PSLTX5,"
                + "RTRIM(F023USIID) AS F023USIID, RTRIM(F023USIDT) AS F023USIDT, RTRIM(F023USITM) AS F023USITM, RTRIM(F023USMID) AS F023USMID, RTRIM(F023USMDT) AS F023USMDT, RTRIM(F023USMTM) AS F023USMTM"
                + " FROM LIBMIATEC.F023 WHERE "
                + "F023CSTID = '" + CSTID + "' AND "
                + "F023NBRID = '" + NBRID + "' AND "
                + "F023SRCCDA = '" + SRCCDA + "' AND "
                + "F023BRKSQA = '" + BRKSQA + "' AND "
                + "F023BRKSQB = '" + BRKSQB + "'";
        // </editor-fold>

        Statement stmt01 = cnxIBMDB2.getConnection().createStatement();
        ResultSet rs01 = stmt01.executeQuery(SQLQRY01);
        while(rs01.next()){
            fileF023 = new F023();
            fileF023.F023CSTID = rs01.getString("F023CSTID");
            fileF023.F023NBRID = rs01.getInt("F023NBRID");
            fileF023.F023SRCCDA = rs01.getInt("F023SRCCDA");
            fileF023.F023BRKSQA = rs01.getInt("F023BRKSQA");
            fileF023.F023BRKSQB = rs01.getInt("F023BRKSQB");
            fileF023.F023PSLSQC = rs01.getInt("F023PSLSQC");
            fileF023.F023RBCNB = rs01.getString("F023RBCNB");
            fileF023.F023TKACD = rs01.getString("F023TKACD");
            fileF023.F023CPNNB = rs01.getString("F023CPNNB");
            fileF023.F023TKDNB = rs01.getString("F023TKDNB");
            fileF023.F023PSLTX1 = rs01.getString("F023PSLTX1");
            fileF023.F023PSLTX2 = rs01.getString("F023PSLTX2");
            fileF023.F023PSLTX3 = rs01.getString("F023PSLTX3");
            fileF023.F023PSLTX4 = rs01.getString("F023PSLTX4");
            fileF023.F023PSLTX5 = rs01.getString("F023PSLTX5");
            fileF023.F023USIID = rs01.getString("F023USIID");
            fileF023.F023USIDT = rs01.getString("F023USIDT");
            fileF023.F023USITM = rs01.getString("F023USITM");
            fileF023.F023USMID = rs01.getString("F023USMID");
            fileF023.F023USMDT = rs01.getString("F023USMDT");
            fileF023.F023USMTM = rs01.getString("F023USMTM");

            fileF023.FOUND = true;

            listF023.add(fileF023);
        }
        rs01.close();
        stmt01.close();

        return listF023.toArray(new F023[listF023.size()]);
    }

    public F023[] getF023_B(int NBRID, int SRCCDA, int BRKSQA) throws SQLException {
        return getF023_B(CUSTOMER_CODE, NBRID, SRCCDA, BRKSQA);
    }

    public F023[] getF023_B(String CSTID, int NBRID, int SRCCDA, int BRKSQA) throws SQLException {
        ArrayList<F023> listF023 = new ArrayList<F023>(0);
        F023 fileF023;

        // <editor-fold defaultstate="collapsed" desc="{...} SQLQRY01">
        String SQLQRY01 = "SELECT "
                + "RTRIM(F023CSTID) AS F023CSTID, F023NBRID, F023SRCCDA, F023BRKSQA, F023BRKSQB, F023PSLSQC,"
                + "RTRIM(F023RBCNB) AS F023RBCNB, RTRIM(F023TKACD) AS F023TKACD, RTRIM(F023CPNNB) AS F023CPNNB, RTRIM(F023TKDNB) AS F023TKDNB,"
                + "F023PSLTX1, F023PSLTX2, F023PSLTX3, F023PSLTX4, F023PSLTX5,"
                + "RTRIM(F023USIID) AS F023USIID, RTRIM(F023USIDT) AS F023USIDT, RTRIM(F023USITM) AS F023USITM, RTRIM(F023USMID) AS F023USMID, RTRIM(F023USMDT) AS F023USMDT, RTRIM(F023USMTM) AS F023USMTM"
                + " FROM LIBMIATEC.F023 WHERE "
                + "F023CSTID = '" + CSTID + "' AND "
                + "F023NBRID = '" + NBRID + "' AND "
                + "F023SRCCDA = '" + SRCCDA + "' AND "
                + "F023BRKSQA = '" + BRKSQA + "'";
        // </editor-fold>

        Statement stmt01 = cnxIBMDB2.getConnection().createStatement();
        ResultSet rs01 = stmt01.executeQuery(SQLQRY01);
        while(rs01.next()){
            fileF023 = new F023();
            fileF023.F023CSTID = rs01.getString("F023CSTID");
            fileF023.F023NBRID = rs01.getInt("F023NBRID");
            fileF023.F023SRCCDA = rs01.getInt("F023SRCCDA");
            fileF023.F023BRKSQA = rs01.getInt("F023BRKSQA");
            fileF023.F023BRKSQB = rs01.getInt("F023BRKSQB");
            fileF023.F023PSLSQC = rs01.getInt("F023PSLSQC");
            fileF023.F023RBCNB = rs01.getString("F023RBCNB");
            fileF023.F023TKACD = rs01.getString("F023TKACD");
            fileF023.F023CPNNB = rs01.getString("F023CPNNB");
            fileF023.F023TKDNB = rs01.getString("F023TKDNB");
            fileF023.F023PSLTX1 = rs01.getString("F023PSLTX1");
            fileF023.F023PSLTX2 = rs01.getString("F023PSLTX2");
            fileF023.F023PSLTX3 = rs01.getString("F023PSLTX3");
            fileF023.F023PSLTX4 = rs01.getString("F023PSLTX4");
            fileF023.F023PSLTX5 = rs01.getString("F023PSLTX5");
            fileF023.F023USIID = rs01.getString("F023USIID");
            fileF023.F023USIDT = rs01.getString("F023USIDT");
            fileF023.F023USITM = rs01.getString("F023USITM");
            fileF023.F023USMID = rs01.getString("F023USMID");
            fileF023.F023USMDT = rs01.getString("F023USMDT");
            fileF023.F023USMTM = rs01.getString("F023USMTM");

            fileF023.FOUND = true;

            listF023.add(fileF023);
        }
        rs01.close();
        stmt01.close();

        return listF023.toArray(new F023[listF023.size()]);
    }
}
