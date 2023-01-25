/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.sales.InvoiceCommissionFOB.InvoiceCommissionFOBController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.InvoiceCommissionFOBController',
    fecha: new Date(),
    drillDown: [],
    gridActual: '',
    me: '',
    searchParams: {},
    paramsDetail: {},
    init: function(){
        prototype.id = 'InvoiceCommissionFOBForm';
        prototype.url = CONTEXTPATH + '/InvoiceCommissionFOB';
        me = this;
    },
    afterRender: function () {
        Ext.getCmp(prototype.id + '-txtCodIATA').show();
        Ext.getCmp(prototype.id + '-txtA1757FFACT').hide();
        Ext.getCmp(prototype.id + '-txtA1757LOTE').hide();
        Ext.getCmp(prototype.id + '-txtCodIATA').focus();
        this.setStoreData();
        this.btnSearch_click();
    },
    eventKey: function(e, eOpts) {

        if (eOpts.getKey() === 13) {
            this.btnSearch_click();
        }
    },
    onUpperValue: function(field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    }
    ,
    setStoreData: function() {
        var Cmb_TypeFilter = Ext.getCmp(prototype.id + '-Cmb_TypeFilter');
        Cmb_TypeFilter.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["1", "Code IATA"],
                ["2", "Date Invoice"],
                ["3", "Lote"]
            ]
        }));
        Cmb_TypeFilter.setValue("1");
    },
    onChangeSearch: function(obj, value) {
        switch (value) {
            case '1':
                Ext.getCmp(prototype.id + '-txtCodIATA').show();
                Ext.getCmp(prototype.id + '-txtA1757FFACT').hide();
                Ext.getCmp(prototype.id + '-txtA1757LOTE').hide();
                Ext.getCmp(prototype.id + '-txtCodIATA').focus();
                break;
            case '2':
                Ext.getCmp(prototype.id + '-txtCodIATA').hide();
                Ext.getCmp(prototype.id + '-txtA1757FFACT').show();
                Ext.getCmp(prototype.id + '-txtA1757LOTE').hide();
                Ext.getCmp(prototype.id + '-txtA1757FFACT').focus();
                break;
            default:
                Ext.getCmp(prototype.id + '-txtCodIATA').hide();
                Ext.getCmp(prototype.id + '-txtA1757FFACT').hide();
                Ext.getCmp(prototype.id + '-txtA1757LOTE').show();
                Ext.getCmp(prototype.id + '-txtA1757LOTE').focus();
                break;
        }
    },
    btnSearch_click: function(obj, e) {
        this.setFormatParameter();
        this.setGridData(obj, e);
    },
    setFormatParameter: function() {
        var Cmb_TypeFilter = Ext.getCmp(prototype.id + '-Cmb_TypeFilter').getValue();
        var VP_A1757CCUST = '139';
        var VP_A1757FFACT = ''
        var VP_A1757IATA = '';
        var VP_A1757LOTE = '';
        if(Cmb_TypeFilter == '1') VP_A1757IATA = Ext.getCmp(prototype.id + '-txtCodIATA').getValue().trim();
        if(Cmb_TypeFilter == '2') VP_A1757FFACT = Ext.util.Format.date(Ext.getCmp(prototype.id + '-txtA1757FFACT').getValue(), 'Ymd');        
        if(Cmb_TypeFilter == '3') VP_A1757LOTE = Ext.getCmp(prototype.id + '-txtA1757LOTE').getValue().trim();
        
        searchParams = {
            VP_A1757CCUST: VP_A1757CCUST,
            VP_A1757FFACT: VP_A1757FFACT,
            VP_A1757IATA: VP_A1757IATA,
            VP_A1757LOTE: VP_A1757LOTE
        };
//        console.log(searchParams);
    },
    setGridData: function(obj, val) {
        var storeGridDatas = Ext.create('Ext.Praxis.store.sales.InvoiceCommissionFOB.GridData', {
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
    btnLoad_click: function() {
        this.winDataEntryExcel('I');
    },
    winDataEntryExcel: function(action, data) {
        action = action === null || action === undefined ? 'U' : action;
        data = data === null || data === undefined ? {} : data;
        Ext.create('Ext.Praxis.view.sales.InvoiceCommissionFOBForm.LoadFile', {
            id: 'LoadFileInvoiceCommissionFOBForm',
            params: {
                action: action,
                data: data
            }
        }).show();
    },
    btnAdd_click: function() {
        this.winDataEntry('I');
    },
    onEditClick: function(grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        this.winDataEntry('U', rec);
    },
    winDataEntry: function(action, rec) {
        action = action === null || action === undefined ? 'U' : action;
        rec = rec === null || rec === undefined ? {} : rec;
        Ext.create('Ext.Praxis.view.sales.InvoiceCommissionFOBForm.DataEntry', {
            id: prototype.id + '-DataEntryInvoiceCommissionFOBForm',
            params: {
                action: action,
                rec: rec
            }
        }).show();
    },
    btnBack_click: function(obj, e) {
        global.showMenu();
    },
    btnClear_click: function(obj, e) {
        Ext.getCmp(prototype.id + '-Cmb_TypeFilter').setValue("1");
        Ext.getCmp(prototype.id + '-txtCodIATA').setValue("");
        Ext.getCmp(prototype.id + '-txtA1757LOTE').setValue("");
        Ext.getCmp(prototype.id + '-txtA1757FFACT').setValue("");
        Ext.getCmp(prototype.id + '-gridData').getStore().removeAll();
        Ext.getCmp(prototype.id + '-txtCodIATA').focus();
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
        global.getFile(prototype.url + '/getXLSX?VP_A1757CCUST=' + searchParams.VP_A1757CCUST
                + '&VP_A1757FFACT=' + searchParams.VP_A1757FFACT
                + '&VP_A1757IATA=' + searchParams.VP_A1757IATA
                + '&VP_A1757LOTE=' + searchParams.VP_A1757LOTE);
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
