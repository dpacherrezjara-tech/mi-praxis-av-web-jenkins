/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.salesaudit.RFNDQuery.RFNDFormErrorBPOController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.RFNDFormErrorBPOController',
    beanguardar: {},
    totalcpn: 0,
    totalcpnuse: 0,
    beanTMP: {},
    urlWin01: CONTEXTPATH + '/RFNDQuery',
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
        var grid01 = Ext.getCmp(prototype.idRFNDFormErrorBPO + '-grid');

        var store01 = Ext.create('Ext.data.Store', {
            storeId: prototype.idRFNDFormErrorBPO + '-store-grid01'
        });
        //
        grid01.setStore(store01);

    },
    onLoadDataGrid: function () {
        var me = this;
        rec = me.view.params.rec;

        Ext.getCmp(prototype.idRFNDFormErrorBPO + '-win').mask('Please Wait....');
        Ext.Ajax.request({
            url: me.urlWin01 + '/SearchDetailError/',
            method: 'POST',
            timeout: '300000',
            params: {
                IN_CCUST: Ext.String.trim(rec.get('A3648CCUST')),
                IN_PREME: Ext.String.trim(rec.get('A3648PREME')),
                IN_ANIO: Ext.String.trim(rec.get('A3648ANIO')),
                IN_CIA: Ext.String.trim(rec.get('A3648CIA')),
                IN_FORMA: Ext.String.trim(rec.get('A3648FORMA')),
                IN_SERIE: Ext.String.trim(rec.get('A3648SERIE')),
                IN_SEQ: Ext.String.trim(rec.get('A3648SEQ')),
                IN_CORRL: Ext.String.trim(rec.get('A3648CORRL'))                
            },
            success: function (response, options) {
                Ext.getCmp(prototype.idRFNDFormErrorBPO + '-win').unmask();
                var res = Ext.JSON.decode(response.responseText);
                //
                Ext.getCmp(prototype.idRFNDFormErrorBPO + '-grid').getStore().removeAll();
                Ext.getCmp(prototype.idRFNDFormErrorBPO + '-grid').getStore().loadData(res.lst_Error);

            }
        });
    },
    onRendererColumnAttr: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.tdAttr = 'data-qtip="' + value + '"';
        return value;
    },

});

