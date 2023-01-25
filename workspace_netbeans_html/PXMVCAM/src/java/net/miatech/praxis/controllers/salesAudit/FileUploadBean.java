/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.praxis.controllers.salesAudit;

import org.springframework.web.multipart.commons.CommonsMultipartFile;

/**
 *
 * @author zperez
 */
public class FileUploadBean {

    private CommonsMultipartFile files;
    private String Folio;
    private String Status;
    private String date;
    private String Argument;
    private String CNXPA;
    private String PAIS;
    private String TRNCU;
    private String NAMEFILE;
    private String NAMEFILE2;
    private String NAMEFILE3;

    public CommonsMultipartFile getFile() {
        return files;
    }

    public void setFile(CommonsMultipartFile file) {
        this.files = file;
    }

    public String getFolio() {
        return Folio;
    }

    public void setFolio(String Folio) {
        this.Folio = Folio;
    }

    public String getStatus() {
        return Status;
    }

    public void setStatus(String Status) {
        this.Status = Status;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getArgument() {
        return Argument;
    }

    public void setArgument(String Argument) {
        this.Argument = Argument;
    }

    public String getCNXPA() {
        return CNXPA;
    }

    public void setCNXPA(String CNXPA) {
        this.CNXPA = CNXPA;
    }

    public String getPAIS() {
        return PAIS;
    }

    public void setPAIS(String PAIS) {
        this.PAIS = PAIS;
    }

    public String getTRNCU() {
        return TRNCU;
    }

    public void setTRNCU(String TRNCU) {
        this.TRNCU = TRNCU;
    }

    public String getNAMEFILE() {
        return NAMEFILE;
    }

    public void setNAMEFILE(String NAMEFILE) {
        this.NAMEFILE = NAMEFILE;
    }

    public String getNAMEFILE2() {
        return NAMEFILE2;
    }

    public void setNAMEFILE2(String NAMEFILE2) {
        this.NAMEFILE2 = NAMEFILE2;
    }

    public String getNAMEFILE3() {
        return NAMEFILE3;
    }

    public void setNAMEFILE3(String NAMEFILE3) {
        this.NAMEFILE3 = NAMEFILE3;
    }

}
