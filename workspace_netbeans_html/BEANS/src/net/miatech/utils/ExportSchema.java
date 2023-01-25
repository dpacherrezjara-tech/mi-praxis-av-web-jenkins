/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.miatech.utils;

import java.util.List;
import java.util.ArrayList;

/**
 *
 * @author asifuentes
 */
public class ExportSchema {
    public String id = "";
    public String text = "";
    public String dataIndex = "";
    public String dataAlign = "";
    public String type = "";
    public ExportSchema[] columns;
    public int level = 0;
    public int cells = 0;
    public int index = 0;
    public List<ExportSchema> headerRows = new ArrayList<ExportSchema>();
    public List<ExportSchema> tempFields = new ArrayList<ExportSchema>();
    public List<ExportSchema> footerRows = new ArrayList<ExportSchema>();
    public int rowFrom = 0;
    public int rowTo = 0;
    public int colFrom = 0;
    public int colTo = 0;
    public String strcolFrom = "0";
    
    public ExportSchema(){ }
    
    public ExportSchema(String id, String text, String dataIndex, String dataAlign){
        this.text = id;
        this.text = text;
        this.dataIndex = dataIndex;
        this.dataAlign = dataAlign;
    }
    
    public ExportSchema(String dataIndex, int index){
        this.dataIndex = dataIndex;
        this.index = index;
    }
}
