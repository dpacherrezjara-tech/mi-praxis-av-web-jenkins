/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package net.miatech.praxis.classes;

import java.util.List;
import java.util.Map;

/**
 *
 * @author asifuentes
 */
public class ExportMultipleStruct {
    public Class _class;
    public List list;
    public Map<String, String> mapFields;
    public List<Map<String,Integer>> masterHeaders;

    ExportMultipleStruct(){ };

    public ExportMultipleStruct(Class __class, List _list, Map<String, String> _mapFields){
        this._class = __class;
        this.list = _list;
        this.mapFields = _mapFields;
    }    
    
    public ExportMultipleStruct(Class __class, List _list, Map<String, String> _mapFields, List<Map<String,Integer>> _masterHeaders){
        this._class = __class;
        this.list = _list;
        this.mapFields = _mapFields;
        this.masterHeaders = _masterHeaders;
    }
}