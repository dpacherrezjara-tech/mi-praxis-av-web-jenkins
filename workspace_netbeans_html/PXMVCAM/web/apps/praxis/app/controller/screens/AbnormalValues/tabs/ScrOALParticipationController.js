Ext.define('Ext.Praxis.controller.screens.AbnormalValues.tabs.ScrOALParticipationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ScrOALParticipationController',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    searchParams: {},
    columns2: {},
    bean: {},
    beanDet: {},
    meOAL: '',
    dw_excel: false,
    boxActual: '-boxMainDataOAL',
    drillDown: [],
    _path: '',
    // </editor-fold>
    init: function (view) {
        meOAL = this;
        console.log('ScrOALParticipationController - initt');
        meOAL.drillDown.push(meOAL.boxActual);
        console.log(meOAL.drillDown);
    },
    afterRender: function () {

        console.log('ScrOALParticipationController - after');

    },
    btnSearch_click: function (bean) {
        console.log(' ScrOALParticipationController - btnSearch_click');
        meOAL.drillDown = [];
        this.showGrid('-boxMainDataOAL');
        
        this.bean = bean;
        console.log(this.bean);
        this.btnSearchOALParticipation_click();
    },
    btnSearchOALParticipation_click: function () {

        console.log(' ScrOALParticipationController - btnSearchOALParticipation_click');

        this.setFormatParameter();
        win.lblUser_toolTip("Estructura: IMF116");
        Ext.Ajax.request({
            url: prototype.url + '/searchOAL',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getBody().mask('Loading...'),
            params: {beanString: this.searchParams, dw_excel: false},
            success: function (response, options) {
                Ext.getBody().unmask('Loading...');
                console.log(response);

                var res = Ext.JSON.decode(response.responseText);
                console.log('if');
                var lstData = res.lstData;
                console.log(lstData);
                var storeData = Ext.create('Ext.data.Store', {
                    data: lstData,
                    autoLoad: true
                });
                Ext.getCmp(prototype.id + '-gridMainDataOAL').bindStore(storeData);
                Ext.getCmp(prototype.id + '-gridMainDataOAL').setStore(storeData);
            }
        });

//        meOAL.dw_excel = false;

    },
    setFormatParameter: function () {
//        meOAL.bean = {};
        var beanString = JSON.stringify(meOAL.bean);
        this.searchParams = beanString;
//        console.log(meOAL.bean);
    },
    viewgridDetWeek_colHandler: function () {

        win.lblUser_toolTip("Estructura: IMF121");

        Ext.Ajax.request({
            url: prototype.url + '/searchDifferenceByWeek',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getBody().mask('Loading...'),
            params: {beanString: JSON.stringify(meOAL.beanDet), dw_excel: false},
            success: function (response, options) {
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
    showGrid: function (nameGrid) {
        me.panelActual = nameGrid;
        Ext.getCmp(prototype.id + meOAL.boxActual).hide();

        meOAL.boxActual = nameGrid;
        meOAL.drillDown.push(meOAL.boxActual);

        Ext.getCmp(prototype.id + meOAL.boxActual).show();

//        console.log('showGrid == ' + meOAL.drillDown);


    },
    imgBack_clickHandler: function () {

        if (meOAL.drillDown.length > 1) {
            Ext.getCmp(prototype.id + meOAL.boxActual).hide();            
            meOAL.drillDown.pop();
            meOAL.boxActual = meOAL.drillDown[meOAL.drillDown.length - 1];
            Ext.getCmp(prototype.id + meOAL.boxActual).show();
            
            if (meOAL.boxActual === '-boxMainDataOAL') {
                meOAL.hidePagination_clickHandler();
            }
        }
//        console.log('imgBack_clickHandler == ' + meOAL.drillDown);

    },
    clickDetTotalCoupons_colHandler: function (param, column, e, row, column, x, rowData) {        
        this.showGrid('-boxDetailOAL');
        this.showPagination_clickHandler();

        rowData.data.IN_OPTION = param;
        var beanString = JSON.stringify(rowData.data);
        this.searchParams = beanString;
        this.btnSearchDetailOAL();
    },
    btnSearchDetailOAL: function () {
        console.log(' ScrOALParticipationController - btnSearchDetailOAL');

        win.lblUser_toolTip("Estructura: IMF115");

        var storeGridDatas = Ext.create('Ext.Praxis.store.flown.FlightConciliation.GridData', {/*20 filas*/
            proxy: {url: prototype.url + '/searchOALDetail'
            },
            listeners: {
                beforeload: function (obj) {
                    Ext.getCmp(prototype.id + '-boxPrincipalOAL').mask('Loading...');
                    obj.proxy.extraParams = {beanString: meOAL.searchParams, dw_excel: false};
                },
                load: function (obj, obj2, success, obj4, obj5) {
                    Ext.getCmp(prototype.id + '-boxPrincipalOAL').unmask();

                    if (obj.data.length > 0) {
                        var Objtemp = obj.data.items[0].data;

                        var pag = Ext.getCmp(prototype.id + '-pagginSrcDetailOAL');
                        var pagData = pag.getPageData();
//                        console.log(pagData);
                        Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));


                        //Ext.getCmp(prototype.id + '-titDetExchange').setText('Sales Date : ' + Objtemp.strFormatDate);


                    } else {
                        global.Msg({msg: 'Data not found'});
                    }
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridDetailOAL').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-pagginSrcDetailOAL').bindStore(storeGridDatas);

//        meOAL.dw_excel = false;

    },
    showPagination_clickHandler: function () {
        Ext.getCmp(prototype.id + '-boxPaginacion').show();
        Ext.getCmp(prototype.id + '-lblPagination').show();
    },
    hidePagination_clickHandler: function () {
        Ext.getCmp(prototype.id + '-boxPaginacion').hide();
        Ext.getCmp(prototype.id + '-lblPagination').hide();
    }
});