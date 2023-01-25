Ext.define('Ext.Praxis.controller.screens.AbnormalValues.tabs.ScrDifferenceFareController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ScrDifferenceFareController',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    searchParams: {},
    columns2: {},
    bean: {},
    beanDet: {},
    meDifference: '',
    dw_excel: false,
    boxActual: '-boxMainDataDifference',
    drillDown: [],
    _path: '',
    // </editor-fold>
    init: function(view) {
        meDifference = this;
        console.log('ScrDifferenceFareController - initt');
        meDifference.drillDown.push(meDifference.boxActual);
        console.log(meDifference.drillDown);
    },
    afterRender: function() {

        console.log('ScrDifferenceFareController - after');

    },
    btnSearch_click: function(bean) {
        console.log(' ScrDifferenceFareController - btnSearch_click');

        this.bean = bean;
        console.log(this.bean);
        this.btnSearchDifference_click();
    },
    btnSearchDifference_click: function() {

        console.log(' ScrDifferenceFareController - btnSearchDifference_click');

        this.setFormatParameter();
        win.lblUser_toolTip("Estructura: IMF121");
        Ext.Ajax.request({
            url: prototype.url + '/searchDifferenceFare',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getBody().mask('Loading...'),
            params: {beanString: this.searchParams, dw_excel: false},
            success: function(response, options) {
                Ext.getBody().unmask('Loading...');
                console.log(response);

                var res = Ext.JSON.decode(response.responseText);
                console.log('if');
                var lstData = res.lstData;
//                console.log(lstData);
                var storeData = Ext.create('Ext.data.Store', {
                    data: lstData,
                    autoLoad: true
                });
                Ext.getCmp(prototype.id + '-gridMainData').bindStore(storeData);
            }
        });

//        meDifference.dw_excel = false;

    },
    setFormatParameter: function() {
//        meDifference.bean = {};
        var beanString = JSON.stringify(meDifference.bean);
        this.searchParams = beanString;
//        console.log(meDifference.bean);
    },
    clickgridDetWeek_colHandler: function(column, e, row, column, x, rowData) {
        this.beanDet = x.record.data;
        this.showGrid('-boxWeek');

        console.log(this.beanDet);
        this.viewgridDetWeek_colHandler();
    },
    viewgridDetWeek_colHandler: function() {

        win.lblUser_toolTip("Estructura: IMF121");

        Ext.Ajax.request({
            url: prototype.url + '/searchDifferenceByWeek',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getBody().mask('Loading...'),
            params: {beanString: JSON.stringify(meDifference.beanDet), dw_excel: false},
            success: function(response, options) {
                Ext.getBody().unmask('Loading...');
                console.log(response);

                var res = Ext.JSON.decode(response.responseText);
                console.log('if');
                var lstData = res.lstData;
                console.log(lstData);
                Ext.getCmp(prototype.id + '-titgridDetWeekS').setText(lstData[0].strTitulo);

                var storeData = Ext.create('Ext.data.Store', {
                    data: lstData,
                    autoLoad: true
                });
                Ext.getCmp(prototype.id + '-gridDetWeek').bindStore(storeData);
                Ext.getCmp(prototype.id + '-gridDetWeek').setStore(storeData);
                Ext.getCmp(prototype.id + '-gridDetWeek').getStore().reload();
            }
        });
    },
    showGrid: function(nameGrid) {

        Ext.getCmp(prototype.id + meDifference.boxActual).hide();

        meDifference.boxActual = nameGrid;
        meDifference.drillDown.push(meDifference.boxActual);

        Ext.getCmp(prototype.id + meDifference.boxActual).show();

//        console.log('showGrid == ' + meDifference.drillDown);


    },
    imgBack_clickHandler: function() {

        if (meDifference.drillDown.length > 0) {
            Ext.getCmp(prototype.id + meDifference.boxActual).hide();
            meDifference.drillDown.pop();
            meDifference.boxActual = meDifference.drillDown[meDifference.drillDown.length - 1];
            Ext.getCmp(prototype.id + meDifference.boxActual).show();
        }
//        console.log('imgBack_clickHandler == ' + meDifference.drillDown);

    },
});