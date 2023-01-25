/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.sales.InvoiceCommissionConsortia.InvoiceCommissionConsortiaController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.InvoiceCommissionConsortiaController',
    fecha: new Date(),
    drillDown: [],
    gridActual: '',
    me: '',
    searchParams: {},
    paramsDetail: {},
    init: function(view) {
        prototype.id = 'InvoiceCommissionConsortiaForm';
        prototype.url = CONTEXTPATH + '/InvoiceCommissionConsortia';
        me = this;
        this.control({
            // -------------------Eventos Genericos --------------------
            '#InvoiceCommissionConsortiaForm-xpanel': {
                afterrender: this.xpanel_afterrender
            },
            '#InvoiceCommissionConsortiaForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#InvoiceCommissionConsortiaForm-btnClear': {
                click: this.btnClear_click
            },
            '#InvoiceCommissionConsortiaForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#InvoiceCommissionConsortiaForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#InvoiceCommissionConsortiaForm-btnAdd': {
                click: this.btnAdd_click
            },
            '#InvoiceCommissionConsortiaForm-btnLoad': {
                click: this.btnLoad_click
            },
            '#InvoiceCommissionConsortiaForm-btnBack': {
                click: this.btnBack_click
            },
            '#InvoiceCommissionConsortiaForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#InvoiceCommissionConsortiaForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#InvoiceCommissionConsortiaForm-btn-pag-next': {
                click: this.pagNext
            },
            '#InvoiceCommissionConsortiaForm-btn-pag-last': {
                click: this.pagLast
            },
            //-----------------Eventos Especificos -------------------            
            '#InvoiceCommissionConsortiaForm-Cmb_TypeFilter': {
                change: this.onChangeSearch
            },
            '#InvoiceCommissionConsortiaForm-txtCodIATA': {
                keyup: this.eventKey,
                change: this.onUpperValue
            },
            '#InvoiceCommissionConsortiaForm-txtA1757LOTE': {
                keyup: this.eventKey,
                change: this.onUpperValue
            }
        });
    },
    xpanel_afterrender: function(obj, e) {
        Ext.getCmp(prototype.id + '-txtCodIATA').show();
        Ext.getCmp(prototype.id + '-txtA1757FFACT').hide();
        Ext.getCmp(prototype.id + '-txtA1757LOTE').hide();
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
                break;
            case '2':
                Ext.getCmp(prototype.id + '-txtCodIATA').hide();
                Ext.getCmp(prototype.id + '-txtA1757FFACT').show();
                Ext.getCmp(prototype.id + '-txtA1757LOTE').hide();
                break;
            default:
                Ext.getCmp(prototype.id + '-txtCodIATA').hide();
                Ext.getCmp(prototype.id + '-txtA1757FFACT').hide();
                Ext.getCmp(prototype.id + '-txtA1757LOTE').show();
                break;
        }
    },
    btnSearch_click: function(obj, e) {
        this.setFormatParameter();
        this.setGridData(obj, e);
    },
    setFormatParameter: function() {
        var VP_A2447CCUST = '139';
        var VP_A2447FFACT = Ext.util.Format.date(Ext.getCmp(prototype.id + '-txtA1757FFACT').getValue(), 'Ymd');
        var VP_A2447IATA = Ext.getCmp(prototype.id + '-txtCodIATA').getValue().trim();
        var VP_A2447LOTE = Ext.getCmp(prototype.id + '-txtA1757LOTE').getValue().trim();

        searchParams = {
            VP_A2447CCUST: VP_A2447CCUST,
            VP_A2447FFACT: VP_A2447FFACT,
            VP_A2447IATA: VP_A2447IATA,
            VP_A2447LOTE: VP_A2447LOTE
        };
        //console.log(searchParams);
    },
    setGridData: function(obj, val) {
        var storeGridDatas = Ext.create('Ext.Praxis.store.sales.InvoiceCommissionConsortia.GridData', {
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
        Ext.create('Ext.Praxis.view.sales.InvoiceCommissionConsortiaForm.LoadFile', {
            id: 'LoadFileInvoiceCommissionConsortiaForm',
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
        Ext.create('Ext.Praxis.view.sales.InvoiceCommissionConsortiaForm.DataEntry', {
            id: prototype.id + '-DataEntryInvoiceCommissionConsortiaForm',
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
        Ext.getCmp(prototype.id + '-txtCodIATA').setValue("");
        Ext.getCmp(prototype.id + '-txtA1757LOTE').setValue("");
        Ext.getCmp(prototype.id + '-txtA1757FFACT').setValue("");
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
        global.getFile(prototype.url + '/getXLSX?VP_A2447CCUST=' + searchParams.VP_A2447CCUST
                + '&VP_A2447FFACT=' + searchParams.VP_A2447FFACT
                + '&VP_A2447LOTE=' + searchParams.VP_A2447LOTE
                + '&VP_A2447IATA=' + searchParams.VP_A2447IATA);
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
