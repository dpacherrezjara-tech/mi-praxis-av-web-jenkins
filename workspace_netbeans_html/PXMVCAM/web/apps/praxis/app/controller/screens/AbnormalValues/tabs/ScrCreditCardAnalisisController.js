Ext.define('Ext.Praxis.controller.screens.AbnormalValues.tabs.ScrCreditCardAnalisisController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ScrCreditCardAnalisisController',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    searchParams: {},
    columns2: {},
    bean: {},
    beanDet: {},
    beanTkt: {},
    meScrCreditCardAnalisis: '',
    dw_excel: false,
    boxActual: '-boxMainDataScrCreditCardAnalisis',
    drillDown: [],
    _path: '',
    // </editor-fold>
    init: function (view) {
        meScrCreditCardAnalisis = this;
        console.log('ScrCreditCardAnalisisController - initt');
        console.log(meScrCreditCardAnalisis.drillDown);

        prototypeProgram.view = 'screens-abnormal-values-form';
        prototypeProgram.nprog = 'PX00000414';
        prototypeProgram.title = 'Warning Values';
        prototypeProgram.modulo = '';
    },
    afterRender: function () {
        console.log('ScrCreditCardAnalisisController - after');
    },
    btnSearch_click: function (bean) {
        console.log(' ScrCreditCardAnalisisController - btnSearch_click');

        this.bean = bean;
        console.log(this.bean);
        meScrCreditCardAnalisis.drillDown = [];
        console.log('**********************=' + meScrCreditCardAnalisis.drillDown);
        this.btnSearchSrcCreditCardAnalisis_click();
    },
    btnSearchSrcCreditCardAnalisis_click: function () {

        console.log(' ScrCreditCardAnalisisController - btnSearchSrcCreditCardAnalisis_click');

        this.setFormatParameter();

        this.showGrid('-boxMainDataScrCreditCardAnalisis');
        this.hidePagination_clickHandler();

        Ext.Ajax.request({
            url: prototype.url + '/searchCCA',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getBody().mask('Loading...'),
            params: {beanString: this.searchParams, dw_excel: false},
            success: function (response, options) {
                Ext.getBody().unmask('Loading...');
                console.log(response);

                var res = Ext.JSON.decode(response.responseText);
                var lstData = res.lstData_CCard_S;
                var lstData2 = res.lstData_CCard_R;

                 if (lstData.length > 0 && lstData2.length > 0) {
                    
                        var bean = lstData[0];
                        Ext.getCmp(prototype.id + '-titFechaS_ABCC').setText(bean.strDescripcion4);
                    

                        var bean2 = lstData2[0];
                        Ext.getCmp(prototype.id + '-titFechaR_ABCC').setText(bean2.strDescripcion4);
                    console.log(bean2.Aud1);

                    var storeData = Ext.create('Ext.data.Store', {
                        data: lstData,
                        autoLoad: true
                    });

                    var storeData2 = Ext.create('Ext.data.Store', {
                        data: lstData2,
                        autoLoad: true
                    });

                    Ext.getCmp(prototype.id + '-gridDataScrCreditCardSalesAnalisis').bindStore(storeData);
                    Ext.getCmp(prototype.id + '-gridDataScrCreditCardRefundAnalisis').bindStore(storeData2);
                }else {
                    global.Msg({msg: 'Data not found.'});
                }
            }
        });

//        meSales.dw_excel = false;

    },
    setFormatParameter: function () {
//        meScrCreditCardAnalisis.bean = {};
        var beanString = JSON.stringify(meScrCreditCardAnalisis.bean);
        this.searchParams = beanString;
//        console.log(meScrCreditCardAnalisis.bean);
    },
    showGrid: function (nameGrid) {

        me.panelActual = nameGrid;//PARA PAGINACION

        Ext.getCmp(prototype.id + meScrCreditCardAnalisis.boxActual).hide();

        meScrCreditCardAnalisis.boxActual = nameGrid;
        meScrCreditCardAnalisis.drillDown.push(meScrCreditCardAnalisis.boxActual);

        Ext.getCmp(prototype.id + meScrCreditCardAnalisis.boxActual).show();
    },
    imgBack_clickHandler: function () {

        if (meScrCreditCardAnalisis.drillDown.length > 0) {
            Ext.getCmp(prototype.id + meScrCreditCardAnalisis.boxActual).hide();

            if (meScrCreditCardAnalisis.boxActual === '-boxMainDataScrCreditCardAnalisis') {
                meScrCreditCardAnalisis.hidePagination_clickHandler();
            }
//            else if(meScrCreditCardAnalisis.boxActual === '-boxByTkt'){
//                meScrCreditCardAnalisis.showPagination_clickHandler();
//            }

            meScrCreditCardAnalisis.drillDown.pop();
            meScrCreditCardAnalisis.boxActual = meScrCreditCardAnalisis.drillDown[meScrCreditCardAnalisis.drillDown.length - 1];
            Ext.getCmp(prototype.id + meScrCreditCardAnalisis.boxActual).show();
        }
    },
    imgExcel_clickHandler: function () {

        console.log('imgExcel_clickHandler');
        meScrCreditCardAnalisis.dw_excel = true;
        if (meScrCreditCardAnalisis.boxActual === '-boxMainDataScrCreditCardAnalisis') {
            meScrCreditCardAnalisis.goURLpost('search', meScrCreditCardAnalisis.searchParams, Ext.getCmp(prototype.id + '-gridDataScrCreditCardAnalisis').config.columns.items);
        } else {
            meScrCreditCardAnalisis.dw_excel = false;
        }
    },
    goURLpost: function (method, parms, columns) {

        var js_columns = JSON.stringify(columns);

        var mapForm = document.createElement("form");
        mapForm.target = "_blank";
        mapForm.method = "POST"; // or "post" if appropriate
        mapForm.action = prototype.url + '/' + method + '?dw_excel=true';

        var mapInput = document.createElement("input");
        mapInput.type = "text";
        mapInput.name = "beanString";
        mapInput.value = parms;
        mapForm.appendChild(mapInput);

        var mapInput = document.createElement("input");
        mapInput.type = "text";
        mapInput.name = "columns";
        mapInput.value = js_columns;
        mapForm.appendChild(mapInput);

        document.body.appendChild(mapForm);
        mapForm.submit();
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