/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.sales.ConciliationARC.ConciliationARCController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ConciliationARCController',
    fecha: new Date(),
    paginActual: '',
    drillDown: [],
    gridActual: '',
    me: '',
    searchParams: {},
    paramsDetail: {},
    init: function(view) {
        prototype.id = 'ConciliationARCForm';
        prototype.url = CONTEXTPATH + '/ConciliationARC';
        me = this;
                
        this.control({
            // -------------------Eventos Genericos --------------------
            '#ConciliationARCForm-xpanel': {
                afterrender: this.xpanel_afterrender
            },
            '#ConciliationARCForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#ConciliationARCForm-btnClear': {
                click: this.btnClear_click
            },
            '#ConciliationARCForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#ConciliationARCForm-btnBack': {
                click: this.btnBack_click
            },
            '#ConciliationARCForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#ConciliationARCForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#ConciliationARCForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#ConciliationARCForm-btn-pag-next': {
                click: this.pagNext
            },
            '#ConciliationARCForm-btn-pag-last': {
                click: this.pagLast
            },
            //-----------------Eventos Especificos -------------------            

            '#ConciliationARCForm-cbxSearchBy': {
                change: this.changeCmbSearchBy
            }

        });
    },
    xpanel_afterrender: function(obj, e) {
        this.setStoreData();
//      this.btnSearch_click();
    },
    eventKey: function(e, eOpts) {
        if (eOpts.getKey() === 13) {
            this.btnSearch_click();
        }
    },
    onUpperValue: function(field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    setStoreData: function() {

        var cbxSearchBy = Ext.getCmp(prototype.id + '-cbxSearchBy');
        cbxSearchBy.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "Select"],
                ["1", "Processing Date"]
            ]
        }));
        cbxSearchBy.setValue("");
        var cbxBank = Ext.getCmp(prototype.id + '-cbxBank');
        cbxBank.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "ALL"],
                ["ELW", "ELW"],
                ["IAR", "IAR"],
                ["IAP", "IAP"]
            ]
        }));
        cbxBank.setValue("");
    },
    changeCmbSearchBy: function(obj, value) {
        this.clearFields();
        if (value === '') {
            Ext.getCmp(prototype.id + '-txtFPRDA_FROM').hide();
            Ext.getCmp(prototype.id + '-txtFPRDA_TO').hide();
            Ext.getCmp(prototype.id + '-cbxBank').hide();
        } else {
            Ext.getCmp(prototype.id + '-txtFPRDA_FROM').show();
            Ext.getCmp(prototype.id + '-txtFPRDA_TO').show();
            Ext.getCmp(prototype.id + '-cbxBank').show();                        
            Ext.getCmp(prototype.id + '-txtFPRDA_FROM').focus();            
        }
    },
    btnSearch_click: function(obj, e) {
        //this.setFormatParameter();
        this.setGridData(obj, e);
    },
    setFormatParameter: function() {

        var IN_TFILTER = Ext.getCmp(prototype.id + '-cbxSearchBy').getValue();
        var IN_FPRDA_FROM = Ext.util.Format.date(Ext.getCmp(prototype.id + '-txtFPRDA_FROM').getValue(), 'Ymd');
        var IN_FPRDA_TO = Ext.util.Format.date(Ext.getCmp(prototype.id + '-txtFPRDA_TO').getValue(), 'Ymd');
        var IN_BANK = Ext.getCmp(prototype.id + '-cbxBank').getValue();

        searchParams = {
            IN_TFILTER: IN_TFILTER,
            IN_FPRDA_FROM: IN_FPRDA_FROM,
            IN_FPRDA_TO: IN_FPRDA_TO,
            IN_BANK: IN_BANK
        };
        //console.log(searchParams);
    },
    setGridData: function(obj, val) {
        win.lblUser_toolTip("Estructura: A1698, A1720");
        this.setFormatParameter();
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
            
        }
    },
    validateFields: function() {
        var opt = searchParams.IN_TFILTER.trim();
        var msj = '';

        if (opt === '') {
            msj = 'Select filter';
            return msj;
        }
        if (searchParams.IN_FPRDA_FROM === '' || searchParams.IN_FPRDA_TO === '') {
            msj = 'Enter date From/To","PRAXIS';
            return msj;
        }

        return msj;
    },
    btnBack_click: function(obj, e) {
        global.showMenu();
    },
    btnClear_click: function(obj, e) {
        Ext.getCmp(prototype.id + '-cbxSearchBy').setValue('');
        this.clearFields();
    },
    clearFields: function() {
        Ext.getCmp(prototype.id + '-txtFPRDA_FROM').setValue('');
        Ext.getCmp(prototype.id + '-txtFPRDA_TO').setValue('');
        Ext.getCmp(prototype.id + '-cbxBank').setValue('');
        Ext.getCmp(prototype.id + '-gridData').getStore().removeAll();
    },
    btnExcel_click: function(obj, e) {

        this.setFormatParameter();
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({
                msg: msj
            });
        } else {
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
        }
    },
    exportExcel: function() {
        this.setFormatParameter();
        global.getFile(prototype.url + '/getXLSX?IN_TFILTER=' + searchParams.IN_TFILTER
                + '&IN_FPRDA_FROM=' + searchParams.IN_FPRDA_FROM
                + '&IN_FPRDA_TO=' + searchParams.IN_FPRDA_TO
                + '&IN_BANK=' + searchParams.IN_BANK
                );
    },
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

        Ext.create('Ext.Praxis.view.sales.ConciliationARCForm.DataEntry', {
            id: prototype.id + '-dataEntry',
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
    },
    onTextKeypress: function( obj , e , eOpts){
        if ( e.getKey() === e.ENTER ){
            this.btnSearch_click();
        }
    }
});
