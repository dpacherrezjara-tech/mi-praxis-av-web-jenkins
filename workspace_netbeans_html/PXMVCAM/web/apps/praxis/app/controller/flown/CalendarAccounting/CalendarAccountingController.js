/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.flown.CalendarAccounting.CalendarAccountingController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.CalendarAccountingController',
    fecha: new Date(),
    dateFrom: '',
    dateTo: '',
    flightNumber: '',
    searchParams: {},
    me: '',
    setContext: function () {
        me = this;
    },
    init: function(view) {
        prototype.id = 'CalendarAccountingForm';
        prototype.url = CONTEXTPATH + '/CalendarAccounting';

        var me = this;
        this.control({
            // -------------------Eventos Genericos --------------------
            '#CalendarAccountingForm-xpanel': {
                afterrender: this.xpanel_afterrender
            }
            ,
            '#CalendarAccountingForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#CalendarAccountingForm-btnClear': {
                click: this.btnClear_click
            },
            '#CalendarAccountingForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#CalendarAccountingForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#CalendarAccountingForm-btnAdd': {
                click: this.btnAdd_click
            },
            '#CalendarAccountingForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#CalendarAccountingForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#CalendarAccountingForm-btn-pag-next': {
                click: this.pagNext
            },
            '#CalendarAccountingForm-btn-pag-last': {
                click: this.pagLast
            }

        });
    },
    xpanel_afterrender: function(obj, e) {

       // this.btnSearch_click();

    }
    ,
    btnSearch_click: function(obj, e) {
        this.setFormatParameter();
        this.setGridData(obj, e);
    },
    setFormatParameter: function() {
        var dateFrom = Ext.getCmp(prototype.id + '-dateFrom');
        var dateTo = Ext.getCmp(prototype.id + '-dateTo');
        var valid = false;

        if (dateFrom.getValue() === null || dateFrom.getValue() === '' || dateTo.getValue() === null || dateTo.getValue() === '') {
            valid = false;
        } else {
            if (dateFrom.isValid() && dateTo.isValid()) {
                if (dateFrom.getRawValue() <= dateTo.getRawValue()) {
                    valid = true;
                } else {
                    valid = false;
                }
            } else {
                valid = false;
            }
        }
        if (valid) {           
        } else {
            global.Msg({
                msg: 'Date Invalid'
            });
        }


        this.dateFrom = dateFrom.getRawValue();
        this.dateTo = dateTo.getRawValue();

        searchParams = {
            dateFrom: this.dateFrom,
            dateTo: this.dateTo
        };
        console.log("DateFrom : " + this.dateFrom);
        console.log("DateTo : " + this.dateTo);

    },
    setGridData: function(obj, val) {
        this.setFormatParameter();
        console.log("URL : " + prototype.url + '/search');
        var storeGridDatas = Ext.create('Ext.Praxis.store.flown.CalendarAccounting.GridData', {
            proxy: {
                url: prototype.url + '/search'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function(obj) {
                    var pag = Ext.getCmp(prototype.id + '-paggin');
                    var pagData = pag.getPageData();

                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(pagData.currentPage);
                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(pagData.pageCount);
                    Ext.getCmp(prototype.id + '-lbl-total').setText(pagData.total);
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    }
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridData').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
    },
    btnClear_click: function(obj, e) {
        Ext.getCmp(prototype.id + '-dateFrom').setValue("");
        Ext.getCmp(prototype.id + '-dateTo').setValue("");
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
        this.setFormatParameter();        
        global.getFile(prototype.url + '/getXLSX?dateFrom=' + searchParams.dateFrom + '&dateTo=' + searchParams.dateTo);
    },
    
    btnFilter_click: function(obj) {
        var option = Ext.getCmp(prototype.id + '-contentFilter');
        if (option.isVisible()) {
            option.setVisible(false);
        } else {
            option.setVisible(true);
        }
    },
    
    btnAdd_click: function(obj, e) {
        this.winDataEntry('I');
    },
    /**
     * Metodos usados para editar
     * */
    onEditClick: function(grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        this.winDataEntry('U', rec);
    },
    
    winDataEntry: function(action, rec) {
        action = action === null || action === undefined ? 'U' : action;
        rec = rec === null || rec === undefined ? {} : rec;
        Ext.create('Ext.Praxis.view.flown.CalendarAccountingForm.DataEntry', {
            id: prototype.id + '-dataEntry',
            params: {
                action: action,
                rec: rec
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
