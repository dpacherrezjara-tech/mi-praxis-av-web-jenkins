/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.flown.AverageFare.AverageFareController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.AverageFareController',
    fecha: new Date(),
    childs: '',
    paginActual: '',
    drillDown: [],
    gridActual: '',
    panelActual: '',
    searchParams: {},
    paramsDetail: {},
    me: '',
    setContext: function () {
        me = this;
    },
    init: function(view) {
        me = this;
        prototype.id = 'AverageFareForm';
        prototype.url = CONTEXTPATH + '/AverageFare';
        prototype.urlMaster = CONTEXTPATH + '/MasterController';
        this.childs = Ext.getCmp(prototype.id + '-panelMain').items.items;
        me.panelActual = '-panelGridData';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        this.control({
            // -------------------Eventos Genericos --------------------
            '#AverageFareForm-xpanel': {
                afterrender: this.xpanel_afterrender
            },
            '#AverageFareForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#AverageFareForm-btnClear': {
                click: this.btnClear_click
            },
            '#AverageFareForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#AverageFareForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#AverageFareForm-btnBack': {
                click: this.btnBack_click
            },
            '#AverageFareForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#AverageFareForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#AverageFareForm-btn-pag-next': {
                click: this.pagNext
            },
            '#AverageFareForm-btn-pag-last': {
                click: this.pagLast
            }
            //-----------------Eventos Especificos -------------------            

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
    setStoreData: function() {

        Ext.Ajax.request({
            url: prototype.urlMaster + '/obtainDataCity',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getBody().mask('Loading...'),
            params: '',
            success: function(response, options) {
                Ext.getBody().unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);
                var lstData = res.lstData;
                var storeData = Ext.create('Ext.data.Store', {
                    data: lstData,
                    autoLoad: true
                });
                Ext.getCmp(prototype.id + '-cmbCARRIVA').bindStore(storeData);
                Ext.getCmp(prototype.id + '-cmbCDEPART').bindStore(storeData);
                Ext.getCmp(prototype.id + '-cmbCARRIVA').setValue('');
                Ext.getCmp(prototype.id + '-cmbCDEPART').setValue('');
                global.clear();
                me.btnSearch_click();
            }
        });
    },
    btnSearch_click: function(obj, e) {
        this.setFormatParameter();
        this.setGridData(obj, e);
    },
    setFormatParameter: function() {
        var bean = {};

        bean.VP_A1781ORIG = Ext.getCmp(prototype.id + '-cmbCDEPART').getValue();
        bean.VP_A1781DEST = Ext.getCmp(prototype.id + '-cmbCARRIVA').getValue();
        bean.VP_A1781RBD = Ext.getCmp(prototype.id + '-txtA1781RBD').getValue().trim();
        bean.VP_A1781FARE = Ext.getCmp(prototype.id + '-txtFARE').getValue().trim();

        var beanString = JSON.stringify(bean);
        searchParams = {
            beanString: beanString
        };
    },
    setGridData: function(obj, val) {
        win.lblUser_toolTip("Estructura: A1804");
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
                        } else {
                            var item = obj.data.items[0].data;
                            Ext.getCmp(prototype.id + '-labelTitle1').setText(item.strTitulo);
                            Ext.getCmp(prototype.id + '-labelTitle1').setVisible(true);

                        }
                    }
                }
            });
            global.clear();
            Ext.getCmp(prototype.id + '-gridData').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);

        }
    },
    setGridDataDetail: function(data) {
        win.lblUser_toolTip("Estructura: A1804");
        me.setWidthPie();
        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
            proxy: {
                url: prototype.url + '/searchDetail'
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
                        Ext.getCmp(prototype.id + '-labelTitle2').setText(beanD.Titulo);
                    }
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataDetail').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin2').bindStore(storeGridDatas);
    },
    onSetGridDataDetail: function(obj, metaData, rowNum, columnNum, obj2, rowData) {
        me.drillDown.push(me.panelActual);
        me.panelActual = '-panelGridDataDetail';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        me.paramsDetail.beanString = JSON.stringify(rowData.data);
        this.setGridDataDetail();

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

        Ext.getCmp(prototype.id + '-cmbCARRIVA').setValue('');
        Ext.getCmp(prototype.id + '-cmbCDEPART').setValue('');
        Ext.getCmp(prototype.id + '-txtFARE').setValue('');
        Ext.getCmp(prototype.id + '-txtA1781RBD').setValue('');

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
            case  '-panelGridDataDetail':
                global.getFile(prototype.url + '/getDetailXLSX?beanString=' + me.paramsDetail.beanString);
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
            case  '-panelGridDataDetail':
                ancho = 762;
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
            case  '-panelGridDataDetail':
                me.pagginActual = '-paggin2';
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
    }
});
