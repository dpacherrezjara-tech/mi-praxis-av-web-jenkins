/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.flown.FlightInteractPraxis.FlightInteractPraxisController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.FlightInteractPraxisController',
    fecha: new Date(),
    dateFrom: '',
    dateTo: '',
    me: '',
    searchParams: {},
    setContext: function() {
        me = this;
    },
    init: function(view) {
        prototype.id = 'FlightInteractPraxisForm';
        prototype.url = CONTEXTPATH + '/FlightInteractPraxis';

        me = this;
        this.control({
            // -------------------Eventos Genericos --------------------
            '#FlightInteractPraxisForm-xpanel': {
                afterrender: this.xpanel_afterrender
            }
            ,
            '#FlightInteractPraxisForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#FlightInteractPraxisForm-btnClear': {
                click: this.btnClear_click
            },
            '#FlightInteractPraxisForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#FlightInteractPraxisForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#FlightInteractPraxisForm-btnBack': {
                click: this.btnBack_click
            },
            '#FlightInteractPraxisForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#FlightInteractPraxisForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#FlightInteractPraxisForm-btn-pag-next': {
                click: this.pagNext
            },
            '#FlightInteractPraxisForm-btn-pag-last': {
                click: this.pagLast
            }
        });
    },
    xpanel_afterrender: function(obj, e) {
        this.btnSearch_click();
    }
    ,
    btnSearch_click: function(obj, e) {
        this.setGridData(obj, e);
    }
    ,
    setFormatParameter: function() {
        var date = Ext.getCmp(prototype.id + '-txtFecha').getValue();
        if (date === null) {
            date = "";
        }
        date = Ext.util.Format.date(date, 'Ymd');
        searchParams = {
            date: date
        };
        console.log("date : " + date);
    },
    setGridData: function(obj, val) {
        this.setFormatParameter();
        console.log("URL : " + prototype.url + '/search');
        var storeGridDatas = Ext.create('Ext.Praxis.store.flown.FlightInteractPraxis.GridData', {
            proxy: {
                url: prototype.url + '/search'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function(obj) {
                    var pag = Ext.getCmp(prototype.id + '-paggin');
                    var pagData = pag.getPageData();
                    var currentPage = Ext.util.Format.number(pagData.currentPage, '0,000');
                    var pageCount = Ext.util.Format.number(pagData.pageCount, '0,000');
                    var total = Ext.util.Format.number(pagData.total, '0,000');

                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(currentPage);
                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(pageCount);
                    Ext.getCmp(prototype.id + '-lbl-total').setText(total);
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
    }
    ,
    btnClear_click: function(obj, e) {
        var date = Ext.getCmp(prototype.id + '-txtFecha');
        date.setValue("");

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
        global.getFile(prototype.url + '/getXLSX?date=' + searchParams.date);
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
    btnAdd_click: function(obj, e) {
        this.winDataEntry('I');
    },
    btnBack_click: function(obj, e) {
        global.showMenu();
    },
    /**
     * Metodos usados para editar
     * */
    onEditClick: function(grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        var all = grid.getStore();
        this.winDataEntry('U', rec, all, rowIndex);
    },
    winDataEntry: function(action, rec, all, rowIndex) {
        action = action === null || action === undefined ? 'U' : action;
        rec = rec === null || rec === undefined ? {} : rec;
        all = all === null || all === undefined ? {} : all;

        var strTicket = rec.data.strTicket.replace(" ", '').replace(" ", '');

        Ext.Ajax.request({
            url: prototype.url + '/searchBeanTkt',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getCmp(prototype.id + '-gridData').mask('Loading...'),
            params: {
                strTicket: strTicket
            },
            success: function(response, options) {
                var res = Ext.JSON.decode(response.responseText);
                var beanConsTkt = res.beanConsTkt;
                var msjVal = res.msjVal;

                console.log(beanConsTkt);
                console.log(msjVal);

                var dataEntry = Ext.create('Ext.Praxis.view.flown.FlightInteractPraxisForm.DataEntry', {
                    id: prototype.id + '-dataEntry',
                    params: {
                        action: action,
                        beanConsTkt: beanConsTkt,
                        msjVal: msjVal,
                        all: all,
                        rowIndex: rowIndex
                    }
                });
                dataEntry.setId(prototype.id + "-dataEntry");
                dataEntry.show();
                Ext.getCmp(prototype.id + '-gridData').unmask();
            }
        });



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
