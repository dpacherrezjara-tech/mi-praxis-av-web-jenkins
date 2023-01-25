/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.salesaudit.LoadGranPlan.LoadGranPlanController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.LoadGranPlanController',
    fecha: new Date(),
    childs: '',
    bean: '',
    paginActual: '',
    drillDown: [],
    gridActual: '',
    panelActual: '',
    me: '',
    searchParams: {},
    paramsDetail: {},
    init: function(view) {
        me = this;
        prototype.id = 'LoadGranPlanForm';
        prototype.url = CONTEXTPATH + '/LoadGranPlanSa';
        prototype.urlMaster = CONTEXTPATH + '/MasterController';
        this.childs = Ext.getCmp(prototype.id + '-panelMain').items.items;
        me.panelActual = '-panelGridData';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        this.control({
            // -------------------Eventos Genericos --------------------
            '#LoadGranPlanForm-xpanel': {
                afterrender: this.xpanel_afterrender
            },
            '#LoadGranPlanForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#LoadGranPlanForm-btnClear': {
                click: this.btnClear_click
            },
            '#LoadGranPlanForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#LoadGranPlanForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#LoadGranPlanForm-btnBack': {
                click: this.btnBack_click
            },
            '#LoadGranPlanForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#LoadGranPlanForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#LoadGranPlanForm-btn-pag-next': {
                click: this.pagNext
            },
            '#LoadGranPlanForm-btn-pag-last': {
                click: this.pagLast
            },
            //-----------------Eventos Especificos -------------------            
            '#LoadGranPlanForm-btnLoadGP': {
                click: this.onClickbtnLoadGP
            }
        });
    },
    xpanel_afterrender: function(obj, e) {
        this.setStoreData();
        //this.btnSearch_click();
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

        var ComboBy = Ext.getCmp(prototype.id + '-ComboBy');
        ComboBy.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["1", "Processing Date"],
                ["2", "System Date"]
            ]
        }));
        ComboBy.setValue("1");

    },
    setFormatParameter: function() {

        me.bean = {};
        me.bean.VP_FILTER = Ext.getCmp(prototype.id + '-ComboBy').getValue();
        me.bean.VP_FROM_FILTER = Ext.util.Format.date(Ext.getCmp(prototype.id + '-txtFilterDateFrom').getValue(), 'Ymd');
        me.bean.VP_TO_FILTER = Ext.util.Format.date(Ext.getCmp(prototype.id + '-txtFilterDateTo').getValue(), 'Ymd');
        me.bean.VP_FROM_FILTER2 = Ext.util.Format.date(Ext.getCmp(prototype.id + '-txtFilterDateFrom').getValue(), 'Ymd');
        me.bean.VP_TO_FILTER2 = Ext.util.Format.date(Ext.getCmp(prototype.id + '-txtFilterDateTo').getValue(), 'Ymd');
//        if (me.bean.VP_FILTER === '1') {           
//            me.bean.VP_FROM_FILTER2 = '';
//            me.bean.VP_TO_FILTER2 = '';
//        } else {
//            me.bean.VP_FROM_FILTER = '';
//            me.bean.VP_TO_FILTER = '';
//        }

        var beanString = JSON.stringify(me.bean);
        searchParams = {
            bean: me.bean,
            beanString: beanString
        };
        console.log(me.bean);
    },
    btnSearch_click: function(obj, e) {
        this.setFormatParameter();
        this.setGridData();
    },
    // <editor-fold defaultstate="collapsed" desc="setGridData">

    setGridData: function() {
        win.lblUser_toolTip("Estructura: search");

        me.panelActual = '-panelGridData';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        me.setWidthPie();
        this.setFormatParameter();
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.salesAudit.GridData', {
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
    // </editor-fold>



    validateFields: function() {
        var msj = '';
        var bean = searchParams.bean;

        if (bean.VP_FROM_FILTER !== '') {
            if (bean.VP_TO_FILTER === '') {
                msj = 'Enter Date To';
            }
        }
        if (bean.VP_TO_FILTER !== '') {
            if (bean.VP_FROM_FILTER === '') {
                msj = 'Enter Date From';
            }
        }
        return msj;

    },
    onClickbtnLoadGP: function() {
        Ext.create('Ext.Praxis.view.salesaudit.LoadGranPlanForm.DataEntry', {
            id: prototype.id + '-dataEntry',
            params: {
//                action: action,
//                rec: rec
            }
        }).show();

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
        Ext.getCmp(prototype.id + '-txtFilterDateFrom').setValue('');
        Ext.getCmp(prototype.id + '-txtFilterDateTo').setValue('');
        Ext.getCmp(prototype.id + '-ComboType').setValue('');
        Ext.getCmp(prototype.id + '-txtPais').setValue('');
        Ext.getCmp(prototype.id + '-ComboStatus').setValue('A');

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
                global.getFile(prototype.url + '/getXLSX?beanString=' + searchParams.beanString);
                break;
            default:
                global.Msg(
                        {msg: 'Under Construction'
                        });
        }

    },
    btnFilter_click: function(obj) {
        var option = Ext.getCmp(prototype.id + '-panelFilters1');
        if (option.isVisible()) {
            option.setVisible(false);
        } else {
            option.setVisible(true);
        }
    },
    setWidthPie: function() {
        var ancho = Ext.getCmp(prototype.id + me.panelActual).getWidth();
        Ext.getCmp(prototype.id + '-panelPie').setWidth(ancho);
    },
    getPaggin: function() {
        me.pagginActual = '';
        switch (me.panelActual) {
            case  '-panelGridData':
                me.pagginActual = '-paggin';
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
    },
    getText: function(value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:left';
        return value;
    },
    getDoubleColor1: function(value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right;background:#F2FAFC';
        return Ext.util.Format.number(value, '0,000.00');
    },
    getDoubleColor2: function(value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right;background:#DFF0ED';
        return Ext.util.Format.number(value, '0,000.00');
    },
    getDoubleColor3: function(value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right;background:#FCF5F2';
        return Ext.util.Format.number(value, '0,000.00');
    }


});
