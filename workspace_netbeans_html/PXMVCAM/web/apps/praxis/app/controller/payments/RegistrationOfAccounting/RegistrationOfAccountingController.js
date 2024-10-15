/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.payments.RegistrationOfAccounting.RegistrationOfAccountingController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.RegistrationOfAccountingController',
    requires: [
        'Ext.Praxis.view.payments.RegistrationOfAccountingForm.Info'
    ],
    bean: {},
    searchParams: {},
    
    me: '',
    init: function () {
        me = this;
        me.panelActual = '-gridMainData';
    },
    afterRender: function () {
        this.setStoreDataGrid(); //del grid selected
        this.loadProcessors();//   
        this.btnSearch_click();
    },
    setStoreDataGrid: function () {
        //del grid selected        
        Ext.create('Ext.Praxis.store.payments.GridData', {});
    },
    onProcessClick: function () {
        this.winDataEntry('I', undefined);
    },
    onRevertClick: function () {
        this.winDataEntry('R', undefined);
    },
    loadProcessors: function() {
        var processors = new Array();
        var store;
        Ext.Ajax.request({
            url: prototype.url + '/loadProcessors',
            method: 'POST',
            timeout: 60000,
            autoLoad: true,
            success: function(response, options) {
                var res = Ext.JSON.decode(response.responseText);
                var data = res.data;

                data.forEach(function callback(record, index, array) {
                    processors.push([record.A051KEY2, record.A051DESCR1]);
                });
                store = Ext.create('Ext.data.ArrayStore', {
                    storeId: 'processors', autoLoad: true, data: processors, fields: ['code', 'name']
                });
                Ext.getCmp(prototype.id + '-cmbProcessor').bindStore(store);
            },
            failure: function(response) {
                console.log('server-side failure with status code ' + response.status);
            }
        });
    },
    setFormatParameter: function () {
        var me = this;
        me.bean = {};
        me.bean.VP_CCUST  = Ext.getCmp(prototype.id + '-cmbAirline').getValue();
        me.bean.VP_OPCION = "";    
        me.bean.VP_MODO = Ext.getCmp(prototype.id + '-cmbMode').getValue();
        me.bean.VP_PROCESA = Ext.getCmp(prototype.id + '-cmbProcessor').getValue();
        me.bean.VP_IDCON = Ext.getCmp(prototype.id + '-txtAccountingId').getValue();
        me.bean.VP_DTYPE = Ext.getCmp(prototype.id + '-cmbdateType').getValue();
        me.bean.VP_FDATE1 = Ext.util.Format.date(Ext.getCmp(prototype.id + '-fecha1').getValue(), 'Ymd');
        me.bean.VP_FDATE2 = Ext.util.Format.date(Ext.getCmp(prototype.id + '-fecha2').getValue(), 'Ymd');  
        var beanString = JSON.stringify(me.bean);
        searchParams = {
            beanString: beanString
        };
    },
    btnSearch_click: function (obj, e) {
        this.setFormatParameter();
        this.setGridData();
    },
    validateFields: function () {
        var msj = '';
        //var bean = searchParams.bean;
        return msj;
    },
    setGridData: function () {
        win.lblUser_toolTip("Estructura: MPF101 - A4545");
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/searchRegistration'
                }, listeners: {
                    beforeload: function (obj) {
                        Ext.getCmp(prototype.id + '-panel-contenedor-grid').mask('Loading...');
                        obj.proxy.extraParams = searchParams;
                    },
                    load: function (obj) {
                        Ext.getCmp(prototype.id + '-panel-contenedor-grid').unmask();
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
                            var data = obj.data.items[0].data;
                            console.log(data);
                        }
                        // me.setWidthPie();
                    }
                }
            });
            //global.clear();
            var panel = Ext.getCmp(prototype.id + '-contenedor-grid');
            panel.removeAll();
            var gridPanel = Ext.create({
                region: 'center',
                xtype: prototype.id + '-info',
                id: prototype.id + '-contentInfo'
            });
            panel.add(gridPanel);
            Ext.getCmp(prototype.id + '-gridMainData').setStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
        }
    },
    winDataEntry: function (action, rec) {
        action = action === null || action === undefined ? 'U' : action;
        rec = rec === null || rec === undefined ? {} : rec;
        Ext.create('Ext.Praxis.view.payments.RegistrationOfAccountingForm.DataEntry', {
            id: prototype.id + '-dataEntry',
            params: {
                action: action,
                rec: rec
            }
        }).show();
    },
    winDownloadFiles: function (action, rec) {
        action = action === null || action === undefined ? 'U' : action;
        rec = rec === null || rec === undefined ? {} : rec;
        Ext.create('Ext.Praxis.view.payments.RegistrationOfAccountingForm.DataEntryDownload', {
            id: prototype.id01 + '-dataEntryDownload',
            params: {
                action: action,
                rec: rec
            }
        }).show();
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
            case  '-gridMainData':
                global.getFile(prototype.url + '/getXLSXRegistration?beanString=' + encodeURI(searchParams.beanString));
//                global.getFileExcelPost('search', JSON.stringify(me.bean), Ext.getCmp(prototype.id + '-gridDataAirport').config.columns.items);
                console.log('Excel Test');
                break;
            default:
                global.Msg(
                    {msg: 'Under Construction'
                });
        }

    },
    btnPagFirst_click: function(obj, e) {
        var pag = Ext.getCmp(prototype.id + '-paggin');
        var pagData = pag.getPageData();
        pag.moveFirst();
    },
    btnPagPrev_click: function(obj, e) {
        var pag = Ext.getCmp(prototype.id + '-paggin');
        var pagData = pag.getPageData();
        pag.movePrevious();
    },
    btnPagAfter_click: function(obj, e) {
        var pag = Ext.getCmp(prototype.id + '-paggin');
        var pagData = pag.getPageData();
        pag.moveNext();
    },
    btnPagLast_click: function(obj, e) {
        var pag = Ext.getCmp(prototype.id + '-paggin');
        var pagData = pag.getPageData();
        pag.moveLast();
    }
});