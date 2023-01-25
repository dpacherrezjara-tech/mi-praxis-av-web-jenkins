Ext.define('Ext.Praxis.controller.flown.Discharges.DischargesController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DischargesController',
    fecha: new Date(),
    searchParams: {},
    _path: '',
    me: '',
    drillDown: [],
    panelActual: '',
    childs: '5',
    paramsDetail: {},
    setContext: function () {
        me = this;
    },
    init: function(view) {
        me = this;
        prototype.id = 'DischargesForm';
        prototype.url = CONTEXTPATH+'/Discharges';
        prototype.widthContenedor = 860;
        prototype.widthGrid = 751;
        this.childs = Ext.getCmp(prototype.id + '-boxConsultas').items.items;
        me.panelActual = '-boxGridDeciduousForMonth';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        this.control({
        });
    },
    afterRender: function () {
        this.setStoreData();
        this.btnClear_click();
        this.btnSearch_click();
        Ext.getCmp(prototype.id+'-boxSearchFilter').setVisible(false);
    },
    // <editor-fold defaultstate="collapsed" desc="Combo Date">
    onFromYearChange: function(combo, newValue, oldValue, eOpts) {
        var comboToYear = Ext.getCmp(prototype.id+'-cmbDateToYear');
        var comboToMonth = Ext.getCmp(prototype.id+'-cmbDateToMonth');
        if (newValue!=='') {
            if (newValue > comboToYear.getValue()) {
                comboToYear.setValue(newValue);
            }
        } else {
            comboToYear.setValue(newValue);
            comboToMonth.setValue(newValue);
        }
    },
    onToYearChange: function(combo, newValue, oldValue, eOpts) {
        var comboFromYear = Ext.getCmp(prototype.id+'-cmbDateFromYear');
        if (newValue!=='') {
            if (comboFromYear.getValue()!=='') {
                if (newValue < comboFromYear.getValue()) {
                    comboFromYear.setValue(newValue);
                }
            } else comboFromYear.setValue(newValue);
        } else {
            comboFromYear.setValue(newValue);
        }
    },
    onFromMonthChange: function(combo, newValue, oldValue, eOpts) {
        var comboToMonth = Ext.getCmp(prototype.id+'-cmbDateToMonth');
        if (newValue!=='') {
            if (this.getValue("cmbDateFromYear") === this.getValue("cmbDateToYear")) {
                if (newValue > comboToMonth.getValue()) {
                    comboToMonth.setValue(newValue);
                }
            }
        } else {
            comboToMonth.setValue(newValue);
        }
    },
    onToMonthChange: function(combo, newValue, oldValue, eOpts) {
        var comboFromMonth = Ext.getCmp(prototype.id+'-cmbDateFromMonth');
        if (newValue!=='') {
            if (this.getValue("cmbDateFromYear") === this.getValue("cmbDateToYear")) {
                if (comboFromMonth.getValue()!=='') {
                    if (newValue < comboFromMonth.getValue()) {
                        comboFromMonth.setValue(newValue);
                    }
                } else comboFromMonth.setValue(newValue);
            }
        } else {
            comboFromMonth.setValue(newValue);
        }
    },
    setStoreData: function() {
        var storeComboDataYear = win.getStoreYear(true);
        Ext.getCmp(prototype.id+'-cmbDateFromYear').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id+'-cmbDateToYear').bindStore(storeComboDataYear);

        var storeComboDataMonth = win.getStoreMonth(true);
        Ext.getCmp(prototype.id+'-cmbDateFromMonth').bindStore(storeComboDataMonth);
        Ext.getCmp(prototype.id+'-cmbDateToMonth').bindStore(storeComboDataMonth);
    },
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="Info">
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="OnByZona_Click">
    OnByZona_Click: function (obj, metaData, rowNum, columnNum, obj2, rowData) {

        me.drillDown.push(me.panelActual);
        me.panelActual = '-boxGridDeciduousForZona';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        me.paramsDetail.beanString = JSON.stringify(rowData.data);
        this.SetOnByZona_Click();
    },
    SetOnByZona_Click: function () {
        win.lblUser_toolTip("Estructura: A1785");
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/searchZona'
                }, listeners: {
                    beforeload: function (obj) {
                        obj.proxy.extraParams = me.paramsDetail;
                    },

                    load: function (obj) {
                        if (obj.data.length === 0) {
                            global.Msg({
                                msg: 'Data not found.'
                            });
                        } else {
                            var data = obj.data.items[0].data;
//                            console.log(data);
                            Ext.getCmp(prototype.id + '-gridDeciduousForZona').setTitle('<center style="font-size:12px;"> Sales Date   ' + data.strFormatDate + '</center>');
                           
                        }
                    }
                }
            });

            global.clear();
            Ext.getCmp(prototype.id + '-gridDeciduousForZona').bindStore(storeGridDatas);
        }
    },
    // </editor-fold>
     
    // <editor-fold defaultstate="collapsed" desc="OnGridDetCity">
    OnGridDetCity: function (obj, metaData, rowNum, columnNum, obj2, rowData) {

        me.drillDown.push(me.panelActual);
        me.panelActual = '-boxGridDeciduousForCity';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        me.paramsDetail.beanString = JSON.stringify(rowData.data);
        this.SetOnGridDetCity();
    },
    SetOnGridDetCity: function () {
        win.lblUser_toolTip("Estructura: A1785");
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/searchCityPair'
                }, listeners: {
                    beforeload: function (obj) {
                        obj.proxy.extraParams = me.paramsDetail;
                    },

                    load: function (obj) {
                        if (obj.data.length === 0) {
                            global.Msg({
                                msg: 'Data not found.'
                            });
                        } else {
                            var data = obj.data.items[0].data;
//                            console.log(data);
                            Ext.getCmp(prototype.id + '-gridDeciduousForCity').setTitle('<center style="font-size:12px;"> Sales Date  ' + data.strFormatDate + '   Zona:   ' + data.strFormatDate3 + '</center>');
                           
                        }
                    }
                }
            });

            global.clear();
            Ext.getCmp(prototype.id + '-gridDeciduousForCity').bindStore(storeGridDatas);
        }
    },
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="Options">
    btnSearch_click: function(obj, e) {
        this.setFormatParameter();
        this.setGridData();
    },
    btnFilter_click: function(obj) {
        var option = Ext.getCmp(prototype.id+'-boxSearchFilter');
        if (option.isVisible()) option.setVisible(false);
        else option.setVisible(true);
    },
    btnExcel_click: function(obj, e) {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Download Excel ?',
            buttons: Ext.MessageBox.OKCANCEL,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn === 'ok') {
                    this.exportExcel();
                }
            }
        });
    },
    btnClear_click: function(obj, e) {
        // <editor-fold defaultstate="collapsed" desc="Clear Combo Date">
//        var mes = new Date().getMonth()+1;
//        if(mes < 10) mes = "0"+mes;
        Ext.getCmp(prototype.id+'-cmbDateFromMonth').setValue('');
        Ext.getCmp(prototype.id+'-cmbDateToMonth').setValue('');
        Ext.getCmp(prototype.id+'-cmbDateFromYear').setValue(new Date().getFullYear());
        Ext.getCmp(prototype.id+'-cmbDateToYear').setValue(new Date().getFullYear());
        // </editor-fold>
        
        // <editor-fold defaultstate="collapsed" desc="Clear Campos">
        this.setValue("cbxTipoFecha", "1");
        this.setValue("txtTKT", "");
        this.setValue("cmbTIPOC", "");
        // </editor-fold>
        this.focus("txtTKT");
        
        // <editor-fold defaultstate="collapsed" desc="Clear Grilla">
        Ext.getCmp(prototype.id+'-gridDeciduousForMonth').getStore().removeAll();
        // </editor-fold>
//        Ext.getCmp(prototype.id+'-boxMainDataDetailFTE').hide();
        Ext.getCmp(prototype.id+'-boxGridDeciduousForMonth').show();
    },
    btnBack_click: function() {
//        if (Ext.getCmp(prototype.id+'-boxGridDeciduousForMonth').isVisible()) {
//            var heightMenu = 400;
//            Ext.getCmp('App-main-region-content-north').setHeight(heightMenu);
//        }
        if (me.drillDown.length > 0) {
            me.panelActual = me.drillDown.pop();
            global.selectedChild(me.childs, prototype.id + me.panelActual);
        } else {
            global.showMenu();
        }
    },
    // </editor-fold>

    // <editor-fold defaultstate="collapsed" desc="setFormatParameter">
    setFormatParameter: function() {
        searchParams = {};
        // <editor-fold defaultstate="collapsed" desc="Combo Date">
        var fyear = Ext.getCmp(prototype.id+'-cmbDateFromYear').getValue();
        var fmonth = Ext.getCmp(prototype.id+'-cmbDateFromMonth').getValue();
        
        var tyear = Ext.getCmp(prototype.id+'-cmbDateToYear').getValue();
        var tmonth = Ext.getCmp(prototype.id+'-cmbDateToMonth').getValue();
        // </editor-fold>
        
        // <editor-fold defaultstate="collapsed" desc="llenarData">
        var cmbTIPOC = this.getValue("cmbTIPOC");
        var cbxTipoFecha = this.getValue("cbxTipoFecha");
        var IN_TKT = Ext.getCmp(prototype.id+'-txtTKT').getValue();
        // </editor-fold>
        
        // <editor-fold defaultstate="collapsed" desc="asignación">
        searchParams = {
            yearFrom: fyear,
            monthFrom: fmonth,
            yearTo: tyear,
            monthTo: tmonth,
            TIPOC: cmbTIPOC,
            IN_TIPOFECHA: cbxTipoFecha,
            IN_TKT: cbxTipoFecha,
        };
        
        _path = prototype.url+'/getXLSX?' +
                'yearFrom='+searchParams.yearFrom+'&' +
                'monthFrom='+searchParams.monthFrom+'&' +
                'yearTo='+searchParams.yearTo+'&' +
                'monthTo='+searchParams.monthTo+'&' +
                'TIPOC='+searchParams.TIPOC+'&' +
                'IN_TIPOFECHA='+searchParams.IN_TIPOFECHA+'&' +
                'IN_TKT='+searchParams.IN_TKT;
        // </editor-fold>
    },
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="setGridData">
    setGridData: function() {
        var storeGridDatas = Ext.create('Ext.Praxis.store.flown.Discharges.GridDataMonth', {
            proxy: {
                url: prototype.url+'/searchMonth'
            },
            listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function(obj, obj2, success, obj4, obj5) {
                    win.lblUser_toolTip("Estructura: A1785");
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found'
                        });
                    }
                }
            }
        });
        Ext.getCmp(prototype.id+'-gridDeciduousForMonth').bindStore(storeGridDatas);
    },
    // </editor-fold>
    
    exportExcel: function() {
//        if (Ext.getCmp(prototype.id+'-boxGridDeciduousForMonth').isVisible()) {
//            global.getFile(_path);
//        }
//        console.log(me.panelActual);
        switch (me.panelActual) {
            case  '-boxGridDeciduousForMonth':
                global.getFile(_path);
                break;
            case  '-boxGridDeciduousForZona':
                global.getFile(prototype.url + '/getXLSX_Zona?beanString=' + me.paramsDetail.beanString);
                break;
            case  '-boxGridDeciduousForCity':
                global.getFile(prototype.url + '/getXLSX_City?beanString=' + me.paramsDetail.beanString);
                break;
        }
    },

    validateFields: function () {
        var msj = '';
        var bean = searchParams.bean;

        return msj;
    },
    
    // <editor-fold defaultstate="collapsed" desc="Funciones para la paginación">
    pagFirst: function(obj, e) {
        if (Ext.getCmp(prototype.id+'-boxMainData').isVisible()) {
            Ext.getCmp(prototype.id+'-paggin').moveFirst();
        }
    },
    pagPrevious: function(obj, e) {
        if (Ext.getCmp(prototype.id+'-boxMainData').isVisible()) {
            Ext.getCmp(prototype.id+'-paggin').movePrevious();
        }
    },
    pagNext: function(obj, e) {
        if (Ext.getCmp(prototype.id+'-boxMainData').isVisible()) {
            Ext.getCmp(prototype.id+'-paggin').moveNext();
        }
    },
    pagLast: function(obj, e) {
        if (Ext.getCmp(prototype.id+'-boxMainData').isVisible()) {
            Ext.getCmp(prototype.id+'-paggin').moveLast();
        }
    },
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="Utilitarios">
    getValue: function(id) {
        return Ext.getCmp(prototype.id+'-'+id).getValue();
    },
    focus: function(id) {
        Ext.getCmp(prototype.id+'-'+id).focus();
    },
    setValue: function(id, txt) {
        return Ext.getCmp(prototype.id+'-'+id).setValue(txt);
    },
    onUpperValue: function(field, newValue, oldValue){
        field.setValue(newValue.toUpperCase());
    },
    onTextKeypress: function( obj , e , eOpts){
        if ( e.getKey() === e.ENTER ){
            this.btnSearch_click();
        }
    }
    // </editor-fold>
});
