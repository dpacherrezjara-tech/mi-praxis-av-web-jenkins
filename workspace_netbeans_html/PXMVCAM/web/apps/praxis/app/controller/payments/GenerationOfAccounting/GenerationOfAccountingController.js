/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.payments.GenerationOfAccounting.GenerationOfAccountingController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.GenerationOfAccountingController',
    requires: [
        'Ext.Praxis.view.payments.GenerationOfAccountingForm.Info'
    ],
    bean: {},
    searchParams: {},
    me: '',
    init: function () {
        me = this;
    },
    afterRender: function () {
        this.setStoreDataGrid(); //del grid selected
        this.btnSearch_click();
    },
    setStoreDataGrid: function () {
        //del grid selected        
        Ext.create('Ext.Praxis.store.payments.GridData', {});
    },
    onProcessClick: function () {
        this.winDataEntry('I', undefined);
    },
    onDownloadClick: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        console.log(rec.data);
        //var n;
        for (var i = 1; i <= parseInt(rec.data.A4556NARCH); i++) {
           // n += i;
            console.log('n>>' + i );
            this.getDownloadFileTxt(rec.data, i);
        }        
    },
    getDownloadFileTxt: function (rec, in_LEXT) {

        var str_msg = 'Download File?';
        var bean = {};
        bean.IN_TIPO = rec.A4556TFILE;
        bean.IN_LEXT = in_LEXT;
        bean.FNAME = rec.A4556TFILE_0;

        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: str_msg,
            buttons: Ext.MessageBox.OKCANCEL,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function (btn) {
                if (btn === 'ok') {
                    global.getFile(prototype.url + '/getDownloadFileTxt?beanString=' + encodeURI(JSON.stringify(bean)));
                }
            }
        });
    },
    setFormatParameter: function () {
        var me = this;
        me.bean = {};
        me.bean.VP_OPCION = "1";
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
        win.lblUser_toolTip("Estructura: A4556");
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/search'
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
        Ext.create('Ext.Praxis.view.payments.GenerationOfAccountingForm.DataEntry', {
            id: prototype.id + '-dataEntry',
            params: {
                action: action,
                rec: rec
            }
        }).show();
    }
});