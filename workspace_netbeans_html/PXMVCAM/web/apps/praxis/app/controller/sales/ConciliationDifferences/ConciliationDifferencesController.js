/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.sales.ConciliationDifferences.ConciliationDifferencesController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ConciliationDifferencesController',
    fecha: new Date(),
    paginActual: '',
    drillDown: [],
    gridActual: '',
    me: '',
    searchParams: {},
    paramsDetail: {},
    tipo: 'T',
    init: function (view) {
        prototype.id = 'ConciliationDifferencesForm';
        prototype.url = CONTEXTPATH + '/ConciliationDifferences';
        me = this;
        this.control({
            // -------------------Eventos Genericos --------------------
            '#ConciliationDifferencesForm-xpanel': {
                afterrender: this.xpanel_afterrender
            },
            '#ConciliationDifferencesForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#ConciliationDifferencesForm-btnClear': {
                click: this.btnClear_click
            },
            '#ConciliationDifferencesForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#ConciliationDifferencesForm-btnBack': {
                click: this.btnBack_click
            },
            '#ConciliationDifferencesForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#ConciliationDifferencesForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#ConciliationDifferencesForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#ConciliationDifferencesForm-btn-pag-next': {
                click: this.pagNext
            },
            '#ConciliationDifferencesForm-btn-pag-last': {
                click: this.pagLast
            },
            //-----------------Eventos Especificos -------------------            

            '#ConciliationDifferencesForm-cbxSearchBy': {
                change: this.changeCmbSearchBy
            },
            '#ConciliationDifferencesForm-txtPais': {
                keyup: this.eventKey,
                change: this.onUpperValue
            }
        });
    },
    xpanel_afterrender: function (obj, e) {
        this.setStoreData();
//      this.btnSearch_click();
    },
    eventKey: function (e, eOpts) {
        if (eOpts.getKey() === 13) {
            this.btnSearch_click();
        }
    },
    onUpperValue: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    setStoreData: function () {

        var cbxSearchBy = Ext.getCmp(prototype.id + '-cbxSearchBy');
        cbxSearchBy.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "Select"],
                ["1", "Processing Date"],
                ["2", "Open Date"]
            ]
        }));
        cbxSearchBy.setValue("2");

    },
    tnvMain_changeHandler: function (tab, x) {
        
        var me = this;
        var tabPanel = Ext.getCmp(prototype.id + '-tnvMain');
        var activeTab = tabPanel.getActiveTab();
        var activeTabIndex = tabPanel.items.indexOf(activeTab);
        switch (activeTabIndex) {
            case 0:
                win.lblUser_toolTip("Estructura: PXF051");
                me.tipo = 'T';
                break;
            case 1:
                me.tipo = 'A';
                win.lblUser_toolTip("Estructura: PXF053");
                break;
        }
        me.btnSearch_click();
        
    },
    changeCmbSearchBy: function (obj, value) {
        this.clearFields();
        if (value === '') {
            Ext.getCmp(prototype.id + '-txtFPRDA_FROM').hide();
            Ext.getCmp(prototype.id + '-txtFPRDA_TO').hide();
            Ext.getCmp(prototype.id + '-txtPais').hide();
        } else {
            Ext.getCmp(prototype.id + '-txtFPRDA_FROM').show();
            Ext.getCmp(prototype.id + '-txtFPRDA_TO').show();
            Ext.getCmp(prototype.id + '-txtPais').show();
            Ext.getCmp(prototype.id + '-txtFPRDA_FROM').focus();
        }
    },
    CmbSource_clickHandler: function (obj, value) {
        //console.log(value);
        //Ext.getCmp(prototype.id + '-contentInfo').hide();
        //Ext.getCmp(prototype.id02 + '-contentInfo').hide();

        Ext.getCmp(prototype.id + '-gridDataByAmount01').hide(); // BSP/ARC
        Ext.getCmp(prototype.id + '-gridDataByAmount02').hide(); //ASR
        Ext.getCmp(prototype.id + '-cmbBank').hide();
        Ext.getCmp(prototype.id + '-txtIATA').hide();

        if (value === 'BSP' || value === 'ARC') {
            Ext.getCmp(prototype.id + '-cbxSearchBy').setValue('1');            
            Ext.getCmp(prototype.id + '-gridDataByAmount01').show(); // BSP/ARC
            if (value === 'ARC'){
               Ext.getCmp(prototype.id + '-cmbBank').show();
            }
        } else if (value === 'ASR') {
            Ext.getCmp(prototype.id + '-cbxSearchBy').setValue('2');            
            Ext.getCmp(prototype.id + '-gridDataByAmount02').show(); // BSP/ARC            
            Ext.getCmp(prototype.id + '-txtIATA').show();
        }
    },
    btnSearch_click: function (obj, e) {
        //limpiar grids
        Ext.getCmp(prototype.id + '-gridDataByAmount01').getStore().removeAll();
        Ext.getCmp(prototype.id + '-gridDataByAmount02').getStore().removeAll();
        Ext.getCmp(prototype.id + '-gridDataByTrx01').getStore().removeAll();
        Ext.getCmp(prototype.id01 + '-gridData').getStore().removeAll();
        
        var IN_FUENTE = Ext.getCmp(prototype.id + '-cmbSource').getValue().trim();
        var me = this;
        if (me.tipo === 'A') {
            if (IN_FUENTE === 'BSP' || IN_FUENTE === 'ARC') {
                this.setGridData(obj, e);
            } else if (IN_FUENTE === 'ASR') {
                this.setGridDataASR(obj, e);
            }
        }
        if (me.tipo === 'T') {
            if (IN_FUENTE === 'BSP' || IN_FUENTE === 'ARC') {
                global.Msg({
                    msg: 'Opción no implementada para fuente de venta ' + IN_FUENTE
                });
            } else if (IN_FUENTE === 'ASR') {
                this.setGridDataASRTRX(obj, e);
            }
        }
    },
    onDetalleClick: function (obj, rowIndex) {
        var rec = obj.getStore().getAt(rowIndex);
        var me = this;
        //console.log(rec);
        var p_searchParams = {
            IN_TFILTER: '',
            IN_FPRDA1: rec.data.A1698FPRDA,
            IN_FPRDA2: rec.data.A1698FPRDA,
            IN_BANK: rec.data.A1698BANK,
            IN_FUENTE: rec.data.A1698SOURC,
            IN_PAIS: rec.data.A1698PAIS,
            IN_IATA: '', //--pendiente
            IN_MDA: rec.data.CURRENCY,
            IN_IDFIL: rec.data.A1698IDFIL, //-- para detalle de cada linea        
            IN_STATUS: rec.data.STATUS_DIFF,
            IN_TIPO: me.tipo
        };
        this.setGridDataDetalle(p_searchParams);
    },
    getIATA00: function () {
        var me = this;
        if (me.tipo === 'A') {
            return me.getIATA();
        }
        if (me.tipo === 'T') {
            return me.getIATA01();
        }
    },
    getIATA: function () {
        //carga detalle
        var store;
        var agent = new Array();
        var IN_FUENTE = Ext.getCmp(prototype.id + '-cmbSource').getValue().trim();
        if (IN_FUENTE === 'BSP' || IN_FUENTE === 'ARC')
            store = Ext.getCmp(prototype.id + '-gridDataByAmount01').getStore();
        if (IN_FUENTE === 'ASR')
            store = Ext.getCmp(prototype.id + '-gridDataByAmount02').getStore();
        for (var i = 0; i < store.data.items.length; i++) {
            agent.push({
                A1530AGENT: store.data.items[i].data.A1530AGENT
            });
        }
        return JSON.stringify(agent);
    },
    getIATA01: function () {
        //carga detalle
        var store;
        var agent = new Array();
        var IN_FUENTE = Ext.getCmp(prototype.id + '-cmbSource').getValue().trim();

        if (IN_FUENTE === 'BSP' || IN_FUENTE === 'ARC') {
            //store = Ext.getCmp(prototype.id + '-gridDataByAmount01').getStore();
        }
        if (IN_FUENTE === 'ASR') {
            store = Ext.getCmp(prototype.id + '-gridDataByTrx01').getStore();
        }

        for (var i = 0; i < store.data.items.length; i++) {
            agent.push({
                A1530AGENT: store.data.items[i].data.STATION
            });
        }
        //console.log(JSON.stringify(agent));
        return JSON.stringify(agent);
    },
    setFormatParameter: function (p_TFILTER) {
        var me = this;
        var IN_TFILTER = p_TFILTER; //Ext.getCmp(prototype.id + '-cbxSearchBy').getValue();
        var IN_FPRDA1 = Ext.util.Format.date(Ext.getCmp(prototype.id + '-txtFPRDA_FROM').getValue(), 'Ymd');
        var IN_FPRDA2 = Ext.util.Format.date(Ext.getCmp(prototype.id + '-txtFPRDA_TO').getValue(), 'Ymd');
        var IN_BANK = Ext.getCmp(prototype.id + '-cmbBank').getValue().trim();
        var IN_FUENTE = Ext.getCmp(prototype.id + '-cmbSource').getValue().trim();
        var IN_PAIS = Ext.getCmp(prototype.id + '-txtPais').getValue().trim();
        var IN_IATA = '';
        if (IN_FUENTE === 'ASR') 
            IN_IATA = Ext.getCmp(prototype.id + '-txtIATA').getValue();
        var IN_MDA = '';
        var IN_IDFIL = '';
        var IN_STATUS = ''; // Ext.getCmp(prototype.id + '-cmbStatus').getValue().trim(); NO_USADO
        
        me.searchParams = {
            IN_TFILTER: IN_TFILTER,
            IN_FPRDA1: IN_FPRDA1,
            IN_FPRDA2: IN_FPRDA2,
            IN_BANK: IN_BANK,
            IN_FUENTE: IN_FUENTE,
            IN_PAIS: IN_PAIS,
            IN_IATA: IN_IATA,
            IN_MDA: IN_MDA,
            IN_IDFIL: IN_IDFIL, //-- para detalle de cada linea        
            IN_STATUS: IN_STATUS,
            IN_TIPO: me.tipo
        };
        //console.log(searchParams);
    },
    setGridData: function (obj, val) {
        win.lblUser_toolTip("Estructura: A1698, A1720");
        var me = this;
        this.setFormatParameter('A');
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({
                msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.sales.GridData', {
                proxy: {
                    url: prototype.url + '/search'
                }, listeners: {
                    beforeload: function (obj) {
                        obj.proxy.extraParams = me.searchParams;
                    },
                    load: function (obj) {
                        var pag = Ext.getCmp(prototype.id + '-paggin');
                        var pagData = pag.getPageData();
                        //console.log(pagData);
                        Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                        if (obj.data.length === 0) {
                            global.Msg({
                                msg: 'Data not found.'
                            });
                            return;
                        }
                        //carga detalle

                        me.setGridDataDetalle(me.searchParams);
                    }
                }
            });
            global.clear();
            Ext.getCmp(prototype.id + '-gridDataByAmount01').setStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
        }
    },
    setGridDataASR: function (obj, val) {
        win.lblUser_toolTip("Estructura: A1720, PXF053");
        var me = this;
        this.setFormatParameter('A');
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({
                msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.sales.GridData', {
                proxy: {
                    url: prototype.url + '/searchASR'
                }, listeners: {
                    beforeload: function (obj) {
                        obj.proxy.extraParams = me.searchParams;
                    },
                    load: function (obj) {
//                        var pag = Ext.getCmp(prototype.id + '-paggin');
//                        var pagData = pag.getPageData();
//                        //console.log(pagData);
//                        Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
//                        Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
//                        Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                        if (obj.data.length === 0) {
                            global.Msg({
                                msg: 'Data not found.'
                            });
                            return;
                        }
                        me.setGridDataDetalle();//me.searchParams, jsonIATA
                    }
                }
            });
            global.clear();
            Ext.getCmp(prototype.id + '-gridDataByAmount02').setStore(storeGridDatas);
            //Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
        }
    },
    setGridDataASRTRX: function (obj, val) {
        win.lblUser_toolTip("Estructura: A1720, PXF053");
        var me = this;
        this.setFormatParameter('T');
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({
                msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.sales.GridData', {
                proxy: {
                    url: prototype.url + '/searchASRTRX'
                }, listeners: {
                    beforeload: function (obj) {
                        obj.proxy.extraParams = me.searchParams;
                    },
                    load: function (obj) {
//                        var pag = Ext.getCmp(prototype.id + '-paggin');
//                        var pagData = pag.getPageData();
//                        //console.log(pagData);
//                        Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
//                        Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
//                        Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                        if (obj.data.length === 0) {
                            global.Msg({
                                msg: 'Data not found.'
                            });
                            return;
                        }
                        me.setGridDataDetalle();//me.searchParams, jsonIATA
                    }
                }
            });
            global.clear();
            Ext.getCmp(prototype.id + '-gridDataByTrx01').setStore(storeGridDatas);
            //Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
        }
    },

    setGridDataDetalle: function () {
        //win.lblUser_toolTip("Estructura: * ");
        var me = this;
        var IN_TFILTER = Ext.getCmp(prototype.id + '-cbxSearchBy').getValue();
        var IN_FPRDA1 = Ext.util.Format.date(Ext.getCmp(prototype.id + '-txtFPRDA_FROM').getValue(), 'Ymd');
        var IN_FPRDA2 = Ext.util.Format.date(Ext.getCmp(prototype.id + '-txtFPRDA_TO').getValue(), 'Ymd');
        var IN_BANK = Ext.getCmp(prototype.id + '-cmbBank').getValue().trim();
        var IN_FUENTE = Ext.getCmp(prototype.id + '-cmbSource').getValue().trim();
        var IN_PAIS = Ext.getCmp(prototype.id + '-txtPais').getValue().trim();
        var IN_IATA = me.getIATA00(); //json
        var IN_MDA = '';
        var IN_IDFIL = '';
        var IN_STATUS = ''; // Ext.getCmp(prototype.id + '-cmbStatus').getValue().trim(); NO_USADO

        me.searchParams = {
            IN_TFILTER: IN_TFILTER,
            IN_FPRDA1: IN_FPRDA1,
            IN_FPRDA2: IN_FPRDA2,
            IN_BANK: IN_BANK,
            IN_FUENTE: IN_FUENTE,
            IN_PAIS: IN_PAIS,
            IN_IATA: IN_IATA,
            IN_MDA: IN_MDA,
            IN_IDFIL: IN_IDFIL, //-- para detalle de cada linea        
            IN_STATUS: IN_STATUS,
            IN_TIPO: me.tipo
        };

        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({
                msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.sales.GridData', {
                proxy: {
                    url: prototype.url + '/searchDetalle'
                }, listeners: {
                    beforeload: function (obj) {
                        obj.proxy.extraParams = me.searchParams;
                    },
                    load: function (obj) {
                        var pag = Ext.getCmp(prototype.id + '-paggin');
                        var pagData = pag.getPageData();
                        //console.log(pagData);
                        Ext.getCmp(prototype.id01 + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                        Ext.getCmp(prototype.id01 + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                        Ext.getCmp(prototype.id01 + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                        if (obj.data.length === 0) {
                            global.Msg({
                                msg: 'Data not found.'
                            });
                        }
                    }
                }
            });
            global.clear();
            Ext.getCmp(prototype.id01 + '-gridData').setStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
        }
    },
    validateFields: function () {
        var me = this;
        var opt = me.searchParams.IN_TFILTER.trim();
        var msj = '';

        if (opt === '') {
            msj = 'Select filter';
            return msj;
        }
        if (me.searchParams.IN_FPRDA_FROM === '' || me.searchParams.IN_FPRDA_TO === '') {
            msj = 'Enter date From/To","PRAXIS';
            return msj;
        }

        return msj;
    },
    btnBack_click: function (obj, e) {
        global.showMenu();
    },
    btnClear_click: function (obj, e) {
        Ext.getCmp(prototype.id + '-cbxSearchBy').setValue('');
        this.clearFields();
        Ext.getCmp(prototype.id + '-gridData').getStore().removeAll();
    },
    clearFields: function () {
//        Ext.getCmp(prototype.id + '-txtFPRDA_FROM').setValue('');
//        Ext.getCmp(prototype.id + '-txtFPRDA_TO').setValue('');
//        Ext.getCmp(prototype.id + '-txtPais').setValue('');
    },
    btnExcel_click: function (obj, e) {
        var me = this;
        var IN_TFILTER = Ext.getCmp(prototype.id + '-cbxSearchBy').getValue();
        var IN_FPRDA1 = Ext.util.Format.date(Ext.getCmp(prototype.id + '-txtFPRDA_FROM').getValue(), 'Ymd');
        var IN_FPRDA2 = Ext.util.Format.date(Ext.getCmp(prototype.id + '-txtFPRDA_TO').getValue(), 'Ymd');
        var IN_BANK = Ext.getCmp(prototype.id + '-cmbBank').getValue().trim();
        var IN_FUENTE = Ext.getCmp(prototype.id + '-cmbSource').getValue().trim();
        var IN_PAIS = Ext.getCmp(prototype.id + '-txtPais').getValue().trim();
        var IN_IATA = me.getIATA00(); //json
        var IN_MDA = '';
        var IN_IDFIL = '';
        var IN_STATUS = ''; // Ext.getCmp(prototype.id + '-cmbStatus').getValue().trim(); NO_USADO

        me.searchParams = {
            IN_TFILTER: IN_TFILTER,
            IN_FPRDA1: IN_FPRDA1,
            IN_FPRDA2: IN_FPRDA2,
            IN_BANK: IN_BANK,
            IN_FUENTE: IN_FUENTE,
            IN_PAIS: IN_PAIS,
            IN_IATA: IN_IATA,
            IN_MDA: IN_MDA,
            IN_IDFIL: IN_IDFIL, //-- para detalle de cada linea        
            IN_STATUS: IN_STATUS,
            IN_TIPO: me.tipo
        };
        
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({
                msg: msj
            });
        } else {
            Ext.Msg.show({
                title: '.:PRAXIS:.',
                msg: 'Download detail ?',
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
        var me = this;
        //this.setFormatParameter();
        
        global.getFile(prototype.url + '/getXLSX?beanString='+encodeURI(JSON.stringify(me.searchParams)));
//        global.getFile(prototype.url + '/getXLSX?IN_TFILTER=' + me.searchParams.IN_TFILTER
//                + '&IN_FPRDA1=' + me.searchParams.IN_FPRDA1
//                + '&IN_FPRDA2=' + me.searchParams.IN_FPRDA2
//                + '&IN_BANK=' + me.searchParams.IN_BANK
//                + '&IN_FUENTE=' + me.searchParams.IN_FUENTE
//                + '&IN_PAIS=' + me.searchParams.IN_PAIS
//                + '&IN_IATA=' + encodeURI(JSON.stringify(me.searchParams.IN_IATA)) 
//                + '&IN_MDA=' + me.searchParams.IN_MDA
//                + '&IN_IDFIL=' + me.searchParams.IN_IDFIL
//                + '&IN_STATUS=' + me.searchParams.IN_STATUS
//                );
    },
    btnFilter_click: function (obj) {
        var option = Ext.getCmp(prototype.id + '-contentFilter');
        if (option.isVisible()) {
            option.setVisible(false);
        } else {
            option.setVisible(true);
        }
    },
    
    onEditClick: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        var all = grid.getStore();
        this.winDataEntry('U', rec, all, rowIndex);

    },
    
    winDataEntry: function (action, rec, all, rowIndex) {
        action = action === null || action === undefined ? 'U' : action;
        rec = rec === null || rec === undefined ? {} : rec;
        all = all === null || all === undefined ? {} : all;
        rowIndex = rowIndex === null || rowIndex === undefined ? {} : rowIndex;
        
        console.log(rec.data.A1698SOURC);
        if (rec.data.A1698SOURC === 'BSP'){
           Ext.create('Ext.Praxis.view.sales.ConciliationDifferencesForm.DataEntry', {
                id: prototype.id + '-dataEntry',
                params: {
                    action: action,
                    rec: rec,
                    all: all,
                    rowIndex: rowIndex
                }
            }).show(); 
        }
        if (rec.data.A1698SOURC === 'ARC'){
           Ext.create('Ext.Praxis.view.sales.ConciliationDifferencesForm.DataEntryARC', {
                id: prototype.id + '-dataEntry',
                params: {
                    action: action,
                    rec: rec,
                    all: all,
                    rowIndex: rowIndex
                }
            }).show(); 
        }
        

    },
    //detalle de diferencias ASR
    onActionClick: function(grid, rowIndex, colIndex) {
        //alert('DataEntryTransaction');
        var store = grid.getStore();
        var data = store.getAt(rowIndex).data;
        Ext.create('Ext.Praxis.view.sales.ConciliationASRForm.DataEntryTransaction', {
            id: 'DataEntryTransactionConciliationASRForm',
            params: {
                action: 'U',
                data: data
            }
        }).show();
    },
    /*     
     * Funciones para la paginacion     
     */
    pagFirst: function (obj, e) {
        var pag = Ext.getCmp(prototype.id + '-paggin');
        var pagData = pag.getPageData();
        pag.moveFirst();
    },
    pagPrevious: function (obj, e) {
        var pag = Ext.getCmp(prototype.id + '-paggin');
        var pagData = pag.getPageData();
        pag.movePrevious();
    },
    pagNext: function (obj, e) {
        var pag = Ext.getCmp(prototype.id + '-paggin');
        var pagData = pag.getPageData();
        pag.moveNext();
    },
    pagLast: function (obj, e) {
        var pag = Ext.getCmp(prototype.id + '-paggin');
        var pagData = pag.getPageData();
        pag.moveLast();
    },
    onTextKeypress: function (obj, e, eOpts) {
        if (e.getKey() === e.ENTER) {
            this.btnSearch_click();
        }
    }


});
