    /* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.interline.InvoiceConciliation.InvoiceConciliationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.InvoiceConciliationController',
    fecha: new Date(),
    childs: '',
    paginActual: '',
    drillDown: [],
    gridActual: '',
    panelActual: '',
    me: '',
    searchParams: {},
    paramsDetail: {},
    paramsDetailSource: {},
    init: function(view) {
        me = this;
        prototype.id = 'InvoiceConciliationForm';
        prototype.url = CONTEXTPATH + '/InvoiceConciliation';
        prototype.urlMaster = CONTEXTPATH + '/MasterController';
        this.childs = Ext.getCmp(prototype.id + '-panelMain').items.items;
        me.panelActual = '-panelGridData';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        this.control({
            // -------------------Eventos Genericos --------------------
            '#InvoiceConciliationForm-xpanel': {
                afterrender: this.xpanel_afterrender
            },
            '#InvoiceConciliationForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#InvoiceConciliationForm-btnClear': {
                click: this.btnClear_click
            },
            '#InvoiceConciliationForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#InvoiceConciliationForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#InvoiceConciliationForm-btnBack': {
                click: this.btnBack_click
            },
            '#InvoiceConciliationForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#InvoiceConciliationForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#InvoiceConciliationForm-btn-pag-next': {
                click: this.pagNext
            },
            '#InvoiceConciliationForm-btn-pag-last': {
                click: this.pagLast
            },
            //-----------------Eventos Especificos -------------------            
            '#InvoiceConciliationForm-cmbDateFromYear': {
                select: this.selectComboFromYear
            },
            '#InvoiceConciliationForm-cmbDateFromMonth': {
                select: this.selectComboFromMonth
            },
            '#InvoiceConciliationForm-cmbDateToMonth': {
                select: this.selectComboToMonth
            }
        });
    },
    xpanel_afterrender: function(obj, e) {
        this.setStoreData();
    },
    eventKey: function(e, eOpts) {
        if (eOpts.getKey() === 13) {
            this.btnSearch_click();
        }
    },
    onUpperValue: function(field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    selectComboFromYear: function(obj) {
        var comboToYear = Ext.getCmp(prototype.id + '-cmbDateToYear');
        var storeComboDataYear = win.getStoreYear2(false, obj.getValue());
        comboToYear.bindStore(storeComboDataYear);
        comboToYear.setValue(obj.getValue());
    },
    selectComboFromMonth: function(obj) {
        var comboToMonth = Ext.getCmp(prototype.id + '-cmbDateToMonth');
        comboToMonth.setValue(obj.getValue());
    },
    selectComboToMonth: function(obj) {
        var comboFromYear = Ext.getCmp(prototype.id + '-cmbDateFromYear');
        var comboToYear = Ext.getCmp(prototype.id + '-cmbDateToYear');
        var comboFromMonth = Ext.getCmp(prototype.id + '-cmbDateFromMonth');
        if (comboFromYear.getValue() === comboToYear.getValue()) {
            if (obj.getValue() < comboFromMonth.getValue()) {
                comboFromMonth.setValue(obj.getValue());
            }
        }
    },
    setStoreData: function() {
        console.log(prototype.url);
        Ext.getCmp(prototype.id + '-cmbDateFromYear').bindStore(win.getStoreYear(false));
        Ext.getCmp(prototype.id + '-cmbDateToYear').bindStore(win.getStoreYear(false));
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').bindStore(win.getStoreMonth(true));
        Ext.getCmp(prototype.id + '-cmbDateToMonth').bindStore(win.getStoreMonth(true));

        Ext.getCmp(prototype.id + '-cmbDateFromYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateToYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').setValue("");
        Ext.getCmp(prototype.id + '-cmbDateToMonth').setValue("");


        var cmbPeriod = Ext.getCmp(prototype.id + '-cmbPeriod');
        cmbPeriod.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "All"],
                ["01", "01"],
                ["02", "02"],
                ["03", "03"],
                ["04", "04"]
            ]
        }));
        cmbPeriod.setValue("");
        
        
        var cmbAerolinea = Ext.getCmp(prototype.id + '-cmbAerolinea');
        cmbAerolinea.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["I", "ICH"],
                ["B", "NO ICH"]
            ]
        }));
        cmbAerolinea.setValue("I");
        
        global.clear();
        me.btnSearch_click();
//
//        Ext.Ajax.request({
//            url: prototype.urlMaster + '/obtainDataAirline',
//            method: 'POST',
//            timeout: 60000000,
//            beforerequest: Ext.getBody().mask('Loading...'),
//            params: '',
//            success: function(response, options) {
//                Ext.getBody().unmask('Loading...');
//                var res = Ext.JSON.decode(response.responseText);
//                var lstData = res.lstData;
//                var storeData = Ext.create('Ext.data.Store', {
//                    data: lstData,
//                    autoLoad: true
//                });
//                Ext.getCmp(prototype.id + '-cmbAerolinea').bindStore(storeData);
//                Ext.getCmp(prototype.id + '-cmbAerolinea').setValue('');
//                global.clear();
//                me.btnSearch_click();
//            }
//        });
    },
    btnSearch_click: function(obj, e) {
        this.setFormatParameter();
        this.setGridData(obj, e);
    },
    setFormatParameter: function() {
        var bean = {};

        bean.yearFrom = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue();
        bean.monthFrom = Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue();
        bean.yearTo = Ext.getCmp(prototype.id + '-cmbDateToYear').getValue();
        bean.monthTo = Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue();
        bean.IN_FECHA_FROM = bean.yearFrom + '' + bean.monthFrom;
        bean.IN_FECHA_TO = bean.yearTo + '' + bean.monthTo;
        bean.A508CAMARA = Ext.getCmp(prototype.id + '-cmbAerolinea').getValue();
        bean.IN_PERIOD = Ext.getCmp(prototype.id + '-cmbPeriod').getValue();

        var beanString = JSON.stringify(bean);
        searchParams = {
            beanString: beanString
        };
    },
    setGridData: function(obj, val) {
        win.lblUser_toolTip("Estructura: A508");
        me.setWidthPie();
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        this.setFormatParameter();
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {

            var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
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
            Ext.getCmp(prototype.id + '-gridDataP1').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-gridDataP2').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-gridDataP3').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-gridDataP4').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);

        }
    },
    setGridDataDetByCia: function(data) {
        win.lblUser_toolTip("Estructura: A094");
        me.setWidthPie();
        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
            proxy: {
                url: prototype.url + '/searchDetailA094'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = me.paramsDetail;
                },
                load: function(obj) {
                    var pag = Ext.getCmp(prototype.id + '-paggin2');
                    var pagData = pag.getPageData();
                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    } else {
                        var beanD = obj.data.items[0].data;
                        var title = 'Clearing Date ' + beanD.strFormatDate + ' Period ' + beanD.A094PERIOD;
                        Ext.getCmp(prototype.id + '-labelTitle2').setText(title);
                    }
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataA094P1').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridDataA094P2').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridDataA094P3').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin2').bindStore(storeGridDatas);
    },
    onSetGridDataDetByCia: function(obj, metaData, rowNum, columnNum, obj2, rowData) {
        me.drillDown.push(me.panelActual);
        me.panelActual = '-panelGridDataByCia';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        me.paramsDetail.beanString = JSON.stringify(rowData.data);
        this.setGridDataDetByCia();

    },
    setGridDataDetBySource: function(data) {
        win.lblUser_toolTip("Estructura: A1199");
        me.setWidthPie();
        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
            proxy: {
                url: prototype.url + '/searchDetailA096'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = me.paramsDetailSource;
                },
                load: function(obj) {
                    var pag = Ext.getCmp(prototype.id + '-paggin3');
                    var pagData = pag.getPageData();
                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    } else {
                        var beanD = obj.data.items[0].data;
                        var title = 'Clearing Date ' + beanD.strFormatDate + ' Period ' + beanD.A096PERIOD + '  ' + beanD.A096CIA + ' - ' + beanD.strDescripcion;
                        Ext.getCmp(prototype.id + '-labelTitle3').setText(title);
                    }
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataBySource').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin3').bindStore(storeGridDatas);
    },
    onSetGridDataDetBySource: function(obj, metaData, rowNum, columnNum, obj2, rowData) {
        me.drillDown.push(me.panelActual);
        me.panelActual = '-panelGridDataBySource';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        me.paramsDetailSource.beanString = JSON.stringify(rowData.data);
        this.setGridDataDetBySource();

    },
    validateFields: function() {
        var msj = '';
        return msj;
    },
    btnBack_click: function(obj, e) {

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
    btnClear_click: function(obj, e) {

        Ext.getCmp(prototype.id + '-cmbDateFromYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateToYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').setValue('');
        Ext.getCmp(prototype.id + '-cmbDateToMonth').setValue('');
        Ext.getCmp(prototype.id + '-cmbAerolinea').setValue('');
        Ext.getCmp(prototype.id + '-cmbPeriod').setValue('');

    },
    btnExcel_click: function(obj, e) {

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
        switch (me.panelActual) {
            case  '-panelGridData':
                var strEncode = encodeURI(prototype.url + '/getXLSX?beanString=' + searchParams.beanString);
                global.getFile(strEncode);
                break;
            case '-panelGridDataByCia':
                var strEncode = encodeURI(prototype.url + '/getXLSXCia?beanString=' + me.paramsDetail.beanString);
                global.getFile(strEncode);
            case '-panelGridDataBySource':
                var strEncode = encodeURI(prototype.url + '/getXLSXSource?beanString=' + me.paramsDetailSource.beanString);
                global.getFile(strEncode);
                break;
            default:
                global.Msg(
                        {msg: 'Under Construction'
                        });
        }

    },
    btnFilter_click: function(obj) {
        var option = Ext.getCmp(prototype.id + '-contentFilter');
        if (option.isVisible()) {
            option.setVisible(false);
        } else {
            option.setVisible(true);
        }
    },
    setWidthPie: function() {
        var ancho = 500;
        switch (me.panelActual) {
            case  '-panelGridData':
                ancho = 1280;
                break;
            case '-panelGridDataByCia':
                ancho = 1070;
                break;
            case '-panelGridDataBySource':
                ancho = 880;
                break;
        }

        Ext.getCmp(prototype.id + '-panelPie').setWidth(ancho);
    },
    getPaggin: function() {
        me.pagginActual = '';
        switch (me.panelActual) {
            case  '-panelGridData':
                me.pagginActual = '-paggin';
                break;
            case '-panelGridDataByCia':
                me.pagginActual = '-paggin2';
                break;
            case '-panelGridDataBySource':
                me.pagginActual = '-paggin3';
                break;
        }
    },
    /*     
     * Funciones para la paginacion     
     */
    pagFirst: function(obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.moveFirst();
    }, pagPrevious: function(obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.movePrevious();
    },
    pagNext: function(obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.moveNext();
    },
    pagLast: function(obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.moveLast();
    },
    getInt: function(value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right';
        return Ext.util.Format.number(value, '0,000');
    },
    getDouble: function(value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right';
        return Ext.util.Format.number(value, '0,000.00');
    }


});
