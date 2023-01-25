/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.sales.AuditControl.AuditControlController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.AuditControlController',
    flightNumber: '',
    carrier: '',
    searchParams: {},
    me: '',
    setContext: function () {
        me = this;
    },
    init: function(view) {
        prototype.id = 'AuditControlForm';
        prototype.url = CONTEXTPATH + '/AuditControl';
        var me = this;
        this.control({
            // -------------------Eventos Genericos --------------------
            '#AuditControlForm-xpanel': {
                afterrender: this.xpanel_afterrender
            }
            ,
            '#AuditControlForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#AuditControlForm-btnClear': {
                click: this.btnClear_click
            },
            '#AuditControlForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#AuditControlForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#AuditControlForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#AuditControlForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#AuditControlForm-btn-pag-next': {
                click: this.pagNext
            },
            '#AuditControlForm-btn-pag-last': {
                click: this.pagLast
            },
            '#AuditControlForm-cboModulo': {
                change: this.onChangeModule
            }
        });
    },
    xpanel_afterrender: function(obj, e) {

        this.loadCombo();
        Ext.getCmp(prototype.id+'-cboModulo').setValue("");
        //Ext.getCmp(prototype.id + '-txtDateProc').hide();
        //Ext.getCmp(prototype.id + '-txtDateTo').hide();
        this.setStoreData();
       // this.btnSearch_click();

    },
    
    //<editor-fold defaultstate="collapsed" desc="loadCombo">
    loadCombo: function () {
        Ext.Ajax.request({
            url: prototype.url + '/loadModulo',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getBody().mask(),
            success: function(response, options){
                var res = Ext.JSON.decode(response.responseText);
                Ext.getBody().unmask();
                
                var lstModule = res.lstModule;
                //<editor-fold defaultstate="collapsed" desc="cboModulo">
                var module = new Array();
                module.push(['', 'All']);
                lstModule.forEach(function callback(currentValue, index, array) {
                    module.push([currentValue.SUB_MODULE, currentValue.LABEL]);
                });
                var store1 = Ext.create('Ext.data.ArrayStore', {
                    storeId: 'module', autoLoad: true, data: module, fields: ['code', 'name']
                });
                Ext.getCmp(prototype.id+'-cboModulo').bindStore(store1);
                //</editor-fold>

            }
        });
    },
    //</editor-fold>
    setStoreData: function() {
        //var cboModulo = Ext.getCmp(prototype.id + '-cboModulo');
        var cboEstado = Ext.getCmp(prototype.id + '-cboEstado');

        /*cboModulo.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: true,
            fields: ['code', 'name'],
            data: [
                ["", "All"],
                ["PSALES", "Sales"]
            ]}));
        cboModulo.setValue("");*/

        cboEstado.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: true,
            fields: ['code', 'name'],
            data: [
                ["0", "All"],
                ["1", "ACTIVE"],
                ["2", "COMPLEMENT"],
                ["3", "REPLACED"]
            ]}));
        cboEstado.setValue("0");
    },
    onChangeModule: function() {
        /*var opt = Ext.getCmp(prototype.id + '-cboModulo').getValue();
        if (opt === '') {
            Ext.getCmp(prototype.id + '-txtDateProc').hide();
            Ext.getCmp(prototype.id + '-txtDateTo').hide();
        } else {
            Ext.getCmp(prototype.id + '-txtDateProc').show();
            Ext.getCmp(prototype.id + '-txtDateTo').show();
        }*/

    },
    btnSearch_click: function(obj, e) {
        this.setGridData(obj, e);
    },
    setParams: function() {

        var IN_MODULO = Ext.getCmp(prototype.id + '-cboModulo').getValue();
        var IN_SEQ = Ext.getCmp(prototype.id + '-txtSEQ').getValue();
        var IN_STATUS = Ext.getCmp(prototype.id + '-cboEstado').getValue();
        var IN_DATEPROC = Ext.getCmp(prototype.id + '-txtDateProc').getValue();
        var IN_DATEFROM = Ext.getCmp(prototype.id + '-txtDateFrom').getValue();
        var IN_DATETO = Ext.getCmp(prototype.id + '-txtDateTo').getValue();
        var IN_PROC_DATE = '';
        var IN_FROM_DATE = '';
        var IN_TO_DATE = '';
        IN_DATEPROC = Ext.util.Format.date(IN_DATEPROC, 'Ymd');
        IN_DATEFROM = Ext.util.Format.date(IN_DATEFROM, 'Ymd');
        IN_DATETO = Ext.util.Format.date(IN_DATETO, 'Ymd');
        
        IN_PROC_DATE = IN_DATEPROC;
        IN_FROM_DATE = IN_DATEFROM;
        IN_TO_DATE = IN_DATETO;
        

        searchParams = {
            IN_MODULO: IN_MODULO,
            IN_SEQ: IN_SEQ,
            IN_STATUS: IN_STATUS,
            IN_PROC_DATE: IN_PROC_DATE,
            IN_FROM_DATE: IN_FROM_DATE,
            IN_TO_DATE: IN_TO_DATE
        };
        console.log("-------------Parametros enviados-----------");
        console.log("IN_MODULO : " + searchParams.IN_MODULO);
        console.log("IN_SEQ : " + searchParams.IN_SEQ);
        console.log("IN_STATUS : " + searchParams.IN_STATUS);
        console.log("IN_PROC_DATE : " + searchParams.IN_PROC_DATE);
        console.log("IN_FROM_DATE : " + searchParams.IN_FROM_DATE);
        console.log("IN_TO_DATE : " + searchParams.IN_TO_DATE);
        console.log("-------------------------------------------");
    },
    setGridData: function(obj, val) {
        this.setParams();
        console.log("URL : " + prototype.url + '/search');
        var storeGridDatas = Ext.create('Ext.Praxis.store.sales.AuditControl.GridData', {
            proxy: {
                url: prototype.url + '/search'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function(obj) {
                    var pag = Ext.getCmp(prototype.id + '-paggin');
                    var pagData = pag.getPageData();
                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    }
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridData').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
    },
    btnClear_click: function(obj, e) {
        Ext.getCmp(prototype.id + '-txtDateProc').setValue('');
        Ext.getCmp(prototype.id + '-txtDateFrom').setValue('');
        Ext.getCmp(prototype.id + '-txtDateTo').setValue('');
        Ext.getCmp(prototype.id + '-cboModulo').setValue('');
        Ext.getCmp(prototype.id + '-cboEstado').setValue('');
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
    exportExcel: function() {
        this.setParams();
        global.getFile(prototype.url + '/getXLSX?IN_MODULO=' + searchParams.IN_MODULO
                + '&IN_STATUS=' + searchParams.IN_STATUS
                + '&IN_SEQ=' + searchParams.IN_SEQ
                + '&IN_PROC_DATE=' + searchParams.IN_PROC_DATE
                + '&IN_FROM_DATE=' + searchParams.IN_FROM_DATE
                + '&IN_TO_DATE=' + searchParams.IN_TO_DATE
                );
    }
    ,
    btnFilter_click: function(obj) {
        var option = Ext.getCmp(prototype.id + '-contentFilter');
        if (option.isVisible()) {
            option.setVisible(false);
        } else {
            option.setVisible(true);
        }
    },
    
    onEditClick: function(grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        var all = grid.getStore();
        this.winDataEntry('U', rec, all, rowIndex);
    },
    winDataEntry: function(action, rec, all, rowIndex) {
        action = action === null || action === undefined ? 'U' : action;
        rec = rec === null || rec === undefined ? {} : rec;
        all = all === null || all === undefined ? {} : all;
        rowIndex = rowIndex === null || rowIndex === undefined ? {} : rowIndex;

        Ext.create('Ext.Praxis.view.sales.AuditControlForm.DataEntry', {
            //id: prototype.id + '-dataEntry',
            id: 'DataEntryAuditControlForm',
            params: {
                action: action,
                rec: rec,
                all: all,
                rowIndex: rowIndex
            }
        }).show();

    },
    /*     
     * Funciones para la paginacion     
     */
    pagFirst: function(obj, e) {
        var pag = Ext.getCmp(prototype.id + '-paggin');
        var pagData = pag.getPageData();
        pag.moveFirst();
    },
    pagPrevious: function(obj, e) {
        var pag = Ext.getCmp(prototype.id + '-paggin');
        var pagData = pag.getPageData();
        pag.movePrevious();
    },
    pagNext: function(obj, e) {
        var pag = Ext.getCmp(prototype.id + '-paggin');
        var pagData = pag.getPageData();
        pag.moveNext();

    },
    pagLast: function(obj, e) {
        var pag = Ext.getCmp(prototype.id + '-paggin');
        var pagData = pag.getPageData();
        pag.moveLast();
    }
});
