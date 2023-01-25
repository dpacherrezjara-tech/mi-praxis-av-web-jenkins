/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.salesaudit.MassiveRefunduatpForm.MassiveRefunduatpFormErrorBPOController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.MassiveRefunduatpFormErrorBPOController',
    beanguardar: {},
    totalcpn: 0,
    totalcpnuse: 0,
    beanTMP: {},
    urlWin01: CONTEXTPATH + '/MassiveRefunduatpForm',
    init: function (view) {
        var me = this;
    },
    onClickCancel: function (btn) {
        var me = this;
        me.view.close();
    },
    afterRender: function () {
        var me = this;
        me.setStores();
        me.onLoadDataGrid();
    },
    setStores: function () {
        var grid01 = Ext.getCmp(prototype.idMassiveRefunduatpFormErrorBPO + '-grid');

        var store01 = Ext.create('Ext.data.Store', {
            storeId: prototype.idMassiveRefunduatpFormErrorBPO + '-store-grid01'
        });
        //
        grid01.setStore(store01);

    },
    onLoadDataGrid: function () {
        var me = this;
        rec = me.view.params.rec;

        Ext.getCmp(prototype.idMassiveRefunduatpFormErrorBPO + '-win').mask('Please Wait....');
        Ext.Ajax.request({
            url: me.urlWin01 + '/SearchDetailError/',
            method: 'POST',
            timeout: '300000',
            params: {
                IN_PREME: Ext.String.trim(rec.get('A4076PREME')),
                IN_ANIO: Ext.String.trim(rec.get('A4076ANIO')),
                IN_CORR: rec.get('A4076CORR')
            },
            success: function (response, options) {
                Ext.getCmp(prototype.idMassiveRefunduatpFormErrorBPO + '-win').unmask();
                var res = Ext.JSON.decode(response.responseText);
                //
                Ext.getCmp(prototype.idMassiveRefunduatpFormErrorBPO + '-grid').getStore().removeAll();
                Ext.getCmp(prototype.idMassiveRefunduatpFormErrorBPO + '-grid').getStore().loadData(res.lst_Error);

            }
        });
    },
    onRendererColumnAttr: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.tdAttr = 'data-qtip="' + value + '"';
        return value;
    },

});

