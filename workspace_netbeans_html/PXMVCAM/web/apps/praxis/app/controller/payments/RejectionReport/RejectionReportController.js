/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.payments.RejectionReport.RejectionReportController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.RejectionReportController',
    fecha: new Date(),
    childs: '5',
    bean: '',
    paginActual: '',
    drillDown: [],
    lstCountry: [],
    gridActual: '',
    panelActual: '',
    reg99: 0,
    me: '',
    dup: '',
    searchParams: {},
    paramsDetail: {},
    paramsTKT: {},
    dataObtain: {},
    beanTKT: {},
    dataGrid: [],
    init: function (view) {
        me = this;
        prototype.id = 'RejectionReportForm';
        prototype.url = CONTEXTPATH + '/RejectionReport';
        prototype.urlMaster = CONTEXTPATH + '/MasterController';
        this.childs = Ext.getCmp(prototype.id + '-panelMain').items.items;
        me.panelActual = '-boxMainData';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        this.control({
//            //   -------------------Eventos Genericos --------------------
            '#RejectionReportForm-xpanel': {
                afterrender: this.xpanel_afterrender
            },
            '#RejectionReportForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#RejectionReportForm-btnClear': {
                click: this.btnClear_click
            },
            '#RejectionReportForm-btnExcel': {
//                click: this.btnExcel_click
            },
            '#RejectionReportForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#RejectionReportForm-btnAdd': {
                click: this.btnAdd_click
            },
            '#RejectionReportForm-btnBack': {
                click: this.btnBack_click
            },
            '#RejectionReportForm-cmbDateFromMonth': {
                afterrender: this.afterRenderMonth,
                select: this.selectComboFromMonth
            },
            '#RejectionReportForm-cmbDateToMonth': {
                afterrender: this.afterRenderMonth,
                select: this.selectComboToMonth
            },
            '#RejectionReportForm-btnEmail': {
                click: this.btnEmail_click
            }

        });
    },
    xpanel_afterrender: function (obj, e) {
        this.obtainData();
    },
    eventKey: function (e, eOpts) {
        if (eOpts.getKey() === 13) {
            this.btnSearch_click();
        }
    },
    
    onUpperValue: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    
    obtainData: function () {

        var storeComboDataYear = win.getStoreYear(false);
        var storeComboDataMonth = win.getStoreMonth(true);

        Ext.getCmp(prototype.id + '-cmbDateFromYear').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').bindStore(storeComboDataMonth);

        Ext.getCmp(prototype.id + '-cmbDateFromYear').setValue(this.fecha.getFullYear());
//        Ext.getCmp(prototype.id + '-cmbDateFromMonth').setValue(this.fecha.getMonth() + 1);
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').setValue('');


        Ext.getCmp(prototype.id + '-cmbDateToYear').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbDateToMonth').bindStore(storeComboDataMonth);

        Ext.getCmp(prototype.id + '-cmbDateToYear').setValue(this.fecha.getFullYear());
//        Ext.getCmp(prototype.id + '-cmbDateToMonth').setValue(this.fecha.getMonth() + 1);
        Ext.getCmp(prototype.id + '-cmbDateToMonth').setValue('');

        var cmbDate = Ext.getCmp(prototype.id + '-cmbDate');
        cmbDate.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["FECVTA", "Sales Date"],
                ["FECPROC", "Process Date"]
            ]
        }));
        cmbDate.setValue("FECVTA");

        this.dataObtain.REJECTIONS = 2;
        Ext.Ajax.request({
            url: prototype.urlMaster + '/obtainData',
            method: 'POST',
            timeout: 60000000,
//            beforerequest: Ext.getCmp(prototype.id + '-boxMainData').mask('Loading...'),
            params: {
                beanString: JSON.stringify(this.dataObtain)},
            success: function (response, options) {
//                Ext.getCmp(prototype.id + '-boxMainData').unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);
                var listaRejections = res.listaRejections;
                var storeData = Ext.create('Ext.data.Store', {
                    data: listaRejections,
                    autoLoad: true
                });
                
                Ext.getCmp(prototype.id + '-cmbCODREJ').bindStore(storeData);
                Ext.getCmp(prototype.id + '-cmbCODREJ').setValue("");
                me.btnSearch_click();
            }
        });
    },

    setFormatParameter: function () {
        me.bean = {};

        me.bean.strYearFrom = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue();
        me.bean.strMonthFrom = Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue();
                        
        me.bean.strYearTo = Ext.getCmp(prototype.id + '-cmbDateToYear').getValue();
        me.bean.strMonthTo = Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue();

        me.bean.strDate = Ext.getCmp(prototype.id + '-cmbDate').getValue();
        me.bean.AFILN = Ext.getCmp(prototype.id + '-txtAFILN').getValue();
        me.bean.CODAUT = Ext.getCmp(prototype.id + '-txtCODAUT').getValue();
        me.bean.ACCOUNT = Ext.getCmp(prototype.id + '-txtACCOUNT').getValue();
        me.bean.CODREJ = Ext.getCmp(prototype.id + '-cmbCODREJ').getValue();
                
        var beanString = JSON.stringify(me.bean);
        searchParams = {
            beanString: beanString,
            bean: me.bean
        };
    },
    
    btnSearch_click: function (obj, e) {
        this.setFormatParameter();
        this.setGridData();
    },

    setGridData: function () {
        win.lblUser_toolTip("Estructura: A2288");
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        }
        else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/search'
                }, listeners: {
                    beforeload: function (obj) {
                        Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');
                        obj.proxy.extraParams = searchParams;
                    },
                    load: function (obj) {
                        Ext.getCmp(prototype.id + '-contentInfo').unmask();
                        var pag = Ext.getCmp(prototype.id + '-paggin');
                        var pagData = pag.getPageData();
                        Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                        if (obj.data.length === 0) {
                            global.Msg({
                                msg: 'Data not found.'
                            });
                        } else {
                            var data = obj.data.items[0].data;
                        }
//                        me.setWidthPie();
                    }
                }
            });
            global.clear();
            Ext.getCmp(prototype.id + '-gridMainData').bindStore(storeGridDatas);
//            Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
        }
    },
    
    validateFields: function () {
        var msj = '';
        var bean = searchParams.bean;
        return msj;
    },
    
    btnBack_click: function (obj, e) {
        if (me.drillDown.length > 0) {
            me.panelActual = me.drillDown.pop();
            global.selectedChild(me.childs, prototype.id + me.panelActual);
            me.setWidthPie();
            this.getPaggin();
            if (me.pagginActual !== '') {
                var pag = Ext.getCmp(prototype.id + me.pagginActual);
                var pagData = pag.getPageData();
                Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
            }
        } else {
            global.showMenu();
        }
    },
    
    btnClear_click: function (obj, e) {
        Ext.getCmp(prototype.id + '-cmbDateFromYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateToYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').setValue('');
        Ext.getCmp(prototype.id + '-cmbDateToMonth').setValue('');
        Ext.getCmp(prototype.id + '-txtAFILN').setValue('');
        Ext.getCmp(prototype.id + '-txtCODAUT').setValue('');
        Ext.getCmp(prototype.id + '-txtACCOUNT').setValue('');
        Ext.getCmp(prototype.id + '-cmbCODREJ').setValue('');
    },
    
    btnEmail_click: function(grid, rowIndex, colIndex) {
        this.winDataEntry('U', me.bean);
    },
    
    winDataEntry: function (action, rec) {
        rec = rec === null || rec === undefined ? {} : rec;
        
        Ext.create('Ext.Praxis.view.payments.RejectionReportForm.DataEntry', {
            id: prototype.id + '-dataEntry',
            params: {
                action: action,
                rec: rec
            }
        }).show();
    },
    
    btnExcel_click: function (obj, e) {
        this.setFormatParameter();
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            Ext.Msg.show({
                title: '.:PRAXIS:.',
                msg: 'Download Excel ?',
                buttons: Ext.MessageBox.OKCANCEL,
                scope: this,
                icon: Ext.MessageBox.QUESTION,
                modal: true,
                fn: function (btn) {
                    if (btn === 'ok') {
                        this.exportExcel();
                    }
                }
            });
        }
    },
    exportExcel: function () {
        if(dup){
            me.bean.strOrden = '1';
            me.paramsDetail.beanString = JSON.stringify(me.bean);
        }else{ 
            me.bean.strOrden = '0';
            me.paramsDetail.beanString = JSON.stringify(me.bean);
        }
                
        switch (me.panelActual) {
            case  '-boxMainData':
                global.getFile(prototype.url + '/getXLSX?beanString=' + me.paramsDetail.beanString);
                break;
            default:
                global.Msg(
                     {msg: 'Under Construction'
                });
        }
    },
    
    btnFilter_click: function (obj) {
        var option = Ext.getCmp(prototype.id + '-contentFilter');
        if (option.isVisible()) {
            option.setVisible(false);
        } else {
            option.setVisible(true);
        }
    },
    setWidthPie: function () {
        
        var ancho = Ext.getCmp(prototype.id + me.panelActual).getWidth();
        Ext.getCmp(prototype.id + '-pie').setWidth(ancho);
        Ext.getCmp(prototype.id + '-pie').setVisible(true);
    },
    getPaggin: function () {
        me.pagginActual = '';
        switch (me.panelActual) {
            case  '-boxMainData':
                me.pagginActual = '-paggin';
                break;
            case '-boxMainDataDupli':
                me.pagginActual = '-paggin2';
                break;
        }
    },
    afterRenderYear: function (obj) {
        obj.setValue(this.fecha.getFullYear());
    },
    afterRenderMonth: function (obj) {
        obj.setValue('01');
    },
    selectComboFromYear: function (obj) {
        var comboToYear = Ext.getCmp(prototype.id + '-cmbDateToYear');
        var storeComboDataYear = win.getStoreYear2(false, obj.getValue());
        comboToYear.bindStore(storeComboDataYear);
        comboToYear.setValue(obj.getValue());
    },
    selectComboFromMonth: function (obj) {
        var comboToMonth = Ext.getCmp(prototype.id + '-cmbDateToMonth');
        comboToMonth.setValue(obj.getValue());
    },
    selectComboToMonth: function (obj) {
        var comboFromYear = Ext.getCmp(prototype.id + '-cmbDateFromYear');
        var comboToYear = Ext.getCmp(prototype.id + '-cmbDateToYear');
        var comboFromMonth = Ext.getCmp(prototype.id + '-cmbDateFromMonth');
        if (comboFromYear.getValue() === comboToYear.getValue()) {
            if (obj.getValue() < comboFromMonth.getValue()) {
                comboFromMonth.setValue(obj.getValue());
            }
        }
    },
    cbxDateFromYear_changeHandler: function() {
        Ext.getCmp(prototype.id+'-cmbDateToYear').setValue(Ext.getCmp(prototype.id+'-cmbDateFromYear').getValue());
    },
    selectComboFromDay: function (obj) {
        var comboToDay = Ext.getCmp(prototype.id + '-cmbDateToDay');
        comboToDay.setValue(obj.getValue());
    },
    
    /*     
     * Funciones para la paginacion     
     */

    getInt: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right';
        return Ext.util.Format.number(value, '0,000');
    },
    getDouble: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right';
        return Ext.util.Format.number(value, '0,000.00');
    },
    getText: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:left';
        return value;
    },
    getDoubleColor1: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right;background:#F2FAFC';
        return Ext.util.Format.number(value, '0,000.00');
    },
    getDoubleColor2: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right;background:#DFF0ED';
        return Ext.util.Format.number(value, '0,000.00');
    },
    getDoubleColor3: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right;background:#FCF5F2';
        return Ext.util.Format.number(value, '0,000.00');
    }
}
);