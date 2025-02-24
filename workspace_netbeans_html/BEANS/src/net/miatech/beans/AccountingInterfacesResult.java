/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.beans;

import java.util.List;

/**
 *
 * @author singa
 */
public class AccountingInterfacesResult {
    private List<SQP04091Filter> records; // Lista de registros
    private SQP04091Filter totals;       // Totales
    
    public List<SQP04091Filter> getRecords() {
        return records;
    }

    public void setRecords(List<SQP04091Filter> records) {
        this.records = records;
    }

    public SQP04091Filter getTotals() {
        return totals;
    }

    public void setTotals(SQP04091Filter totals) {
        this.totals = totals;
    }
}
