
Ext.define('Ext.Praxis.controller.payments.SalesConciliationManual.SalesConciliationManualController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.SalesConciliationManualController',
    fecha: new Date(),
    childs: '5',
    bean: '',
    paginActual: '',
    drillDown: [],
    lstCountry: [],
    gridActual: '',
    panelActual: '',
    reg99: 0,
    me: '',
    dup: '',
    searchParams: {},
    paramsDetail: {},
    paramsTKT: {},
    dataObtain: {},
    beanTKT: {},
    beanDetDayMain: {},
    beanDetDay: {},
    beanDetail: {},
    beanDetailByS: {},
    beanDetailByD: {},
    beanDetailByF: {},
    dataGrid: [],
    init: function (view) {
        me = this;
        prototype.id = 'SalesConciliationManualForm';
        prototype.url = CONTEXTPATH + '/SalesConciliationManual';
        prototype.urlMaster = CONTEXTPATH + '/MasterController';
        this.childs = Ext.getCmp(prototype.id + '-panelMain').items.items;
        me.panelActual = '-panelGridDataMain';
        global.selectedChild(me.childs, prototype.id + me.panelActual);


        this.control({
//            //   -------------------Eventos Genericos --------------------
            '#SalesConciliationManualForm-xpanel': {
                afterrender: this.xpanel_afterrender
            },
            '#SalesConciliationManualForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#SalesConciliationManualForm-btnClear': {
                click: this.btnClear_click
            },
            '#SalesConciliationManualForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#SalesConciliationManualForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#SalesConciliationManualForm-btnAdd': {
                click: this.btnAdd_click
            },
            '#SalesConciliationManualForm-btnBack': {
                click: this.btnBack_click
            },
            '#SalesConciliationManualForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#SalesConciliationManualForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#SalesConciliationManualForm-btn-pag-next': {
                click: this.pagNext
            },
            '#SalesConciliationManualForm-btn-pag-last': {
                click: this.pagLast
            },
            '#SalesConciliationManualForm-cmbDateFromYear': {
                afterrender: this.afterRenderYear,
                select: this.selectComboFromYear
            },
            '#SalesConciliationManualForm-cmbDateToYear': {
                afterrender: this.afterRenderYear
            },
            '#SalesConciliationManualForm-cmbDateFromMonth': {
                afterrender: this.afterRenderMonth,
                select: this.selectComboFromMonth
            },
            '#SalesConciliationManualForm-cmbDateToMonth': {
                afterrender: this.afterRenderMonth,
                select: this.selectComboToMonth
            },
            '#SalesConciliationManualForm-cmbDateFromDay': {
                select: this.selectComboFromDay
            }

        });
    },
    xpanel_afterrender: function (obj, e) {
        this.obtainData();
    },
    eventKey: function (e, eOpts) {
        if (eOpts.getKey() === 13) {
            this.btnSearch_click();
        }
    },

    onUpperValue: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },

    obtainData: function () {

        var storeComboDataYear = win.getStoreYear(false);
        var storeComboDataMonth = win.getStoreMonth(true);
        var storeComboDataDay = win.getStoreDays(true);

        Ext.getCmp(prototype.id + '-cmbDateFromYear').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').bindStore(storeComboDataMonth);
        Ext.getCmp(prototype.id + '-cmbDateFromDay').bindStore(storeComboDataDay);

        Ext.getCmp(prototype.id + '-cmbDateFromYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').setValue('');
        Ext.getCmp(prototype.id + '-cmbDateFromDay').setValue('');

        Ext.getCmp(prototype.id + '-cmbDateToYear').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbDateToMonth').bindStore(storeComboDataMonth);
        Ext.getCmp(prototype.id + '-cmbDateToDay').bindStore(storeComboDataDay);

        Ext.getCmp(prototype.id + '-cmbDateToYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateToMonth').setValue('');
        Ext.getCmp(prototype.id + '-cmbDateToDay').setValue('');

        var cmbFecFiltro = Ext.getCmp(prototype.id + '-cmbFecFiltro');
        cmbFecFiltro.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["PRDA", "Proc Date"]
            ]
        }));
        cmbFecFiltro.setValue("PRDA");
        
        var cmbFCONCEP = Ext.getCmp(prototype.id + '-cmbFCONCEP');
        cmbFCONCEP.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "All"],
                ["I", "Settlement"],
                ["V", "Sales"]
            ]
        }));
        cmbFCONCEP.setValue("");
        
//        var cmbSPAYMENT = Ext.getCmp(prototype.id + '-cmbSPAYMENT');
//        cmbSPAYMENT.bindStore(Ext.create('Ext.data.ArrayStore', {
//            autoLoad: false,
//            fields: ['code', 'name'],
//            data: [
//                ["", "All"],
//                ["CC", "Credit Card"],
//                ["CH", "Cash"]
//            ]
//        }));
//        cmbSPAYMENT.setValue("");
        
        Ext.Ajax.request({
            url: prototype.urlMaster + '/obtainData',
            method: 'POST',
            timeout: 60000000,
            params: {
                beanString: JSON.stringify({
                    COUNTRY: 2, CARD: 2
                })
            },
            success: function (response, options) {
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
//                    Ext.getCmp(prototype.id + '-cmbCountry').bindStore(
//                            Ext.create('Ext.data.Store', {data: res.lstCountry, autoLoad: true})
//                            );
//                    me.lstTarjetas = res.lstCard;
////                    Ext.getCmp(prototype.id + '-cmbCardType').bindStore(
////                            Ext.create('Ext.data.Store', {data: me.lstTarjetas, autoLoad: true})
////                            );
//                    win.setValue('cmbCountry', '');
//                    win.setValue('cmbCardType', '');
                    me.btnSearch_click();
                } else
                    global.clear();
            },
            failure: function (response, opts) {
                console.log('server-side failure with status code ' + response.status);
            }
        });
    },
    
    setFormatParameter: function () {
        me.bean = {};

        me.bean.IN_DATE_FROM = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue() +
                Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue() +
                Ext.getCmp(prototype.id + '-cmbDateFromDay').getValue();

        me.bean.IN_DATE_TO = Ext.getCmp(prototype.id + '-cmbDateToYear').getValue() +
                Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue() +
                Ext.getCmp(prototype.id + '-cmbDateToDay').getValue();
        //me.bean.IN_SCOUNTRY = Ext.getCmp(prototype.id + '-cmbCountry').getValue();
        //me.bean.IN_SPAYMENT = Ext.getCmp(prototype.id + '-cmbSPAYMENT').getValue();
        me.bean.IN_TKT = Ext.getCmp(prototype.id + '-txtTKT').getValue();
        me.bean.IN_FCONCEP = Ext.getCmp(prototype.id + '-cmbFCONCEP').getValue();
//        me.bean.IN_SAGENT = Ext.getCmp(prototype.id + '-txtSAGENT').getValue();
//        me.bean.IN_SAUTHOC = Ext.getCmp(prototype.id + '-txtSAUTHOC').getValue();
//        me.bean.IN_SPNR = Ext.getCmp(prototype.id + '-txtSPNR').getValue().trim();
//        me.bean.IN_SCARDN1 = Ext.getCmp(prototype.id + '-txtCard1').getValue().trim();
//        me.bean.IN_SCARDN2 = Ext.getCmp(prototype.id + '-txtCard2').getValue().trim();
        

        var beanString = JSON.stringify(me.bean);
        searchParams = {
            beanString: beanString,
            bean: me.bean
        };
        console.log(searchParams, 'searchParamss' );
        
    },

    btnSearch_click: function (obj, e) {  
        this.setFormatParameter();  //obtengo los Parametros
        if( Ext.getCmp(prototype.id + '-txtTKT').getValue() != '' || Ext.getCmp(prototype.id + '-cmbFCONCEP').getValue() != ''){
            this.setGridDataDetail()
        }else{
            this.setGridData(); 
        }
    },

    setGridData: function () {
        win.lblUser_toolTip("Estructura: MPF114");
        me.drillDown.push(me.panelActual);
        me.panelActual = '-panelGridDataMain'
        me.flag = 'all';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        win.lblUser_toolTip("Estructura: MPF114");
        me.setWidthPie();
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/search'  //ES LA RUTA // CONECTO AL JAVA
                }, listeners: {
                    beforeload: function (obj) {
                        Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');
                        obj.proxy.extraParams = searchParams;
                    },
                    load: function (obj) {
                        Ext.getCmp(prototype.id + '-contentInfo').unmask();
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

                        }
                        me.setWidthPie();
                    }
                }
            });
            global.clear();
            Ext.getCmp(prototype.id + '-gridDataMain').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
        }
    },
    
    setGridDataDetail: function (){
        
        me.drillDown.push(me.panelActual);
        me.panelActual = '-panelGridDataDet'
        me.flag = 'all';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        win.lblUser_toolTip("Estructura: MPF114");
        me.setWidthPie();
        
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/searchDetail'
                }, listeners: {
                    beforeload: function (obj) {
                        obj.proxy.extraParams = searchParams;
                    },
                    load: function (obj) {
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
                            var data = obj.data.items[0].data;
                            Ext.getCmp(prototype.id + '-gridDataDet').setTitle('<center style="font-size:11px;">' + data.strTitulo + '</center>');
//                            win.setText('lblTittleByDayS', data.strTitulo);
                        }
                    }
                }
            });
            global.clear();
            Ext.getCmp(prototype.id + '-gridDataDet').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin3').bindStore(storeGridDatas);
        }
    },
    onGridDayMain: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
        me.drillDown.push(me.panelActual);
        me.panelActual = '-panelGridDataMainDay'
        me.flag = 'all';
        global.selectedChild(me.childs, prototype.id + me.panelActual); 
        this.beanDetDayMain.IN_PRDA = rowData.data.PRDA;
        console.log(this.beanDetDayMain, 'this.beanDetDayMain')
        me.paramsDetail.beanString = JSON.stringify(this.beanDetDayMain);
        this.setGridDataMainDay();
        
    },
    setGridDataMainDay: function () {
        win.lblUser_toolTip("Estructura: MPF114");
        me.setWidthPie();
        
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/searchMainDay'
                }, listeners: {
                    beforeload: function (obj) {
                        obj.proxy.extraParams = me.paramsDetail;
                    },
                    load: function (obj) {
                        var pag = Ext.getCmp(prototype.id + '-paggin5');
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
                            Ext.getCmp(prototype.id + '-gridDataMainDay').setTitle('<center style="font-size:11px;">' + data.strTitulo + '</center>');
//                            win.setText('lblTittleByDayS', data.strTitulo);
                        }
                    }
                }
            });
            global.clear();
            Ext.getCmp(prototype.id + '-gridDataMainDay').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin5').bindStore(storeGridDatas);
        }
    },
    onGridDay: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
        let cantidad = 0
        
        console.log(columnNum, 'columnNum')
        switch (columnNum) {
            case 1:
                console.log('ENTRA AL MATCH');
                this.beanDetDay.IN_FCONCEP = 'I'
                this.beanDetDay.IN_STVAL = '5'
                this.beanDetDay.IN_TITLE = '' + rowData.data.strFormatDate + ' - ' + 'Settlements Processed'
                cantidad = rowData.data.lngQSETTMATCH;
                break;
            case 2:
                console.log('ENTRA AL NPROC');
                this.beanDetDay.IN_FCONCEP = 'I'
                this.beanDetDay.IN_STVAL = '3'
                this.beanDetDay.IN_TITLE = '' + rowData.data.strFormatDate + ' - ' + 'Settlements Not Processed'
                cantidad = rowData.data.lngQSETTPEND;
                break;
            case 4:
                console.log('ENTRA AL MATCH');
                this.beanDetDay.IN_STVAL = '5'
                this.beanDetDay.IN_FCONCEP = 'V'
                this.beanDetDay.IN_TITLE = '' + rowData.data.strFormatDate + ' - ' + 'Ticket Processed'
                cantidad = rowData.data.lngQTKTMATCH;
                break;
            case 5:
                console.log('ENTRA AL NPROC');
                this.beanDetDay.IN_STVAL = '3'
                this.beanDetDay.IN_FCONCEP = 'V'
                this.beanDetDay.IN_TITLE = '' + rowData.data.strFormatDate + ' - ' + 'Ticket Not Processed'
                cantidad = rowData.data.lngQTKTPEND;
                break;
        }
        console.log(cantidad, 'cantidad')
        if(cantidad == 0){
            global.Msg({ msg: 'Data not found.'})
            return false
        }
        //CAMBIO DE GRILLA A OTRA AL BAJAR
        me.drillDown.push(me.panelActual);
        me.panelActual = '-panelGridDataDate'
        me.flag = 'all';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        this.beanDetDay.IN_PRDA = rowData.data.PRDA;
        console.log( this.beanDetDay, ' this.beanDetDay')
        me.paramsDetail.beanString = JSON.stringify(this.beanDetDay);
        this.setGridDataDetDay();

        
    },
    setGridDataDetDay: function () {
        win.lblUser_toolTip("Estructura: MPF114");
        me.setWidthPie();
        
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/searchDetDay'
                }, listeners: {
                    beforeload: function (obj) {
                        obj.proxy.extraParams = me.paramsDetail;
                    },
                    load: function (obj) {
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
                            var data = obj.data.items[0].data;
                            Ext.getCmp(prototype.id + '-gridDataDate').setTitle('<center style="font-size:11px;">' + data.strTitulo + '</center>');
//                            win.setText('lblTittleByDayS', data.strTitulo);
                        }
                    }
                }
            });
            global.clear();
            Ext.getCmp(prototype.id + '-gridDataDate').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin2').bindStore(storeGridDatas);
        }
    },
    onGridDetalleByDay: function (obj, metaData, rowNum, columnNum, obj2, rowData){
        //PARAMETROS Y FUNCIONES PARA CAMBIAR GRILLA
        me.drillDown.push(me.panelActual);
        me.panelActual = '-panelGridDataDetByD'
        me.flag = 'all';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        this.beanDetailByD.IN_PRDA = rowData.data.PRDA;
        console.log( this.beanDetailByD, ' this.beanDetailByF')
        me.paramsDetail.beanString = JSON.stringify(this.beanDetailByD);
        this.setGridDataDetailByD();
    },
    setGridDataDetailByD: function (){
        win.lblUser_toolTip("Estructura: MPF114");
        me.setWidthPie();
        
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/searchDetailByD'
                }, listeners: {
                    beforeload: function (obj) {
                        obj.proxy.extraParams = me.paramsDetail;
                    },
                    load: function (obj) {
                        var pag = Ext.getCmp(prototype.id + '-paggin6');
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
                            Ext.getCmp(prototype.id + '-gridDataDetByD').setTitle('<center style="font-size:11px;">' + data.strTitulo + '</center>');
//                            win.setText('lblTittleByDayS', data.strTitulo);
                        }
                    }
                }
            });
            global.clear();
            Ext.getCmp(prototype.id + '-gridDataDetByD').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin6').bindStore(storeGridDatas);
        }
    },
    onGridDetalleByS: function (obj, metaData, rowNum, columnNum, obj2, rowData){
        //PARAMETROS Y FUNCIONES PARA CAMBIAR GRILLA
        me.drillDown.push(me.panelActual);
        me.panelActual = '-panelGridDataDetByS'
        me.flag = 'all';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        
        switch (columnNum) {
            case 1:

                this.beanDetailByS.IN_PRDA = rowData.data.PRDA
                this.beanDetailByS.IN_FCONCEP = 'I'
                this.beanDetailByS.IN_STVAL = '5'
//                this.beanDetDay.IN_TITLE = '' + rowData.data.strFormatDate + ' - ' + 'Settlements Processed'
//                cantidad = rowData.data.lngQSETTMATCH;
                break;
            case 2:

                this.beanDetailByS.IN_PRDA = rowData.data.PRDA
                this.beanDetailByS.IN_FCONCEP = 'I'
                this.beanDetailByS.IN_STVAL = '3'
//                this.beanDetDay.IN_TITLE = '' + rowData.data.strFormatDate + ' - ' + 'Settlements Not Processed'
//                cantidad = rowData.data.lngQSETTPEND;
                break;
            case 4:

                this.beanDetailByS.IN_PRDA = rowData.data.PRDA
                this.beanDetailByS.IN_FCONCEP = 'V'
                this.beanDetailByS.IN_STVAL = '5'
//                this.beanDetDay.IN_TITLE = '' + rowData.data.strFormatDate + ' - ' + 'Ticket Processed'
//                cantidad = rowData.data.lngQTKTMATCH;
                break;
            case 5:

                this.beanDetailByS.IN_PRDA = rowData.data.PRDA
                this.beanDetailByS.IN_STVAL = '3'
                this.beanDetailByS.IN_FCONCEP = 'V'
//                this.beanDetDay.IN_TITLE = '' + rowData.data.strFormatDate + ' - ' + 'Ticket Not Processed'
//                cantidad = rowData.data.lngQTKTPEND;
                break;
        }
        
        

        me.paramsDetail.beanString = JSON.stringify(this.beanDetailByS);
        this.setGridDataDetailByS();
    },
    setGridDataDetailByS: function (){
        win.lblUser_toolTip("Estructura: MPF114");
        me.setWidthPie();
        
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/searchDetailByS'
                }, listeners: {
                    beforeload: function (obj) {
                        obj.proxy.extraParams = me.paramsDetail;
                    },
                    load: function (obj) {
                        var pag = Ext.getCmp(prototype.id + '-paggin7');
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
                            Ext.getCmp(prototype.id + '-gridDataDetByS').setTitle('<center style="font-size:11px;">' + data.strTitulo + '</center>');
//                            win.setText('lblTittleByDayS', data.strTitulo);
                        }
                    }
                }
            });
            global.clear();
            Ext.getCmp(prototype.id + '-gridDataDetByS').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin7').bindStore(storeGridDatas);
        }
    },
    onGridDetail: function (obj, metaData, rowNum, columnNum, obj2, rowData){
        
        me.drillDown.push(me.panelActual);
        me.panelActual = '-panelGridDataDetByF'
        me.flag = 'all';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        this.beanDetailByF.IN_PRDA = rowData.data.PRDA;
        this.beanDetailByF.IN_SCURRENCY = rowData.data.SCURRENCY;
        this.beanDetailByF.IN_FCONCEP = rowData.data.IN_FCONCEP;
        this.beanDetailByF.IN_STVAL = rowData.data.IN_STVAL;
        this.beanDetailByF.IN_TITLE = rowData.data.strTitulo;
        console.log( this.beanDetailByF, ' this.beanDetailByF')
        me.paramsDetail.beanString = JSON.stringify(this.beanDetailByF);
        this.setGridDataDetailByF();
    },
    setGridDataDetailByF: function (){
        win.lblUser_toolTip("Estructura: MPF114");
        me.setWidthPie();
        
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/searchDetailByF'
                }, listeners: {
                    beforeload: function (obj) {
                        obj.proxy.extraParams = me.paramsDetail;
                    },
                    load: function (obj) {
                        var pag = Ext.getCmp(prototype.id + '-paggin4');
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
                            Ext.getCmp(prototype.id + '-gridDataDetByF').setTitle('<center style="font-size:11px;">' + data.strTitulo + '</center>');
//                            win.setText('lblTittleByDayS', data.strTitulo);
                        }
                    }
                }
            });
            global.clear();
            Ext.getCmp(prototype.id + '-gridDataDetByF').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin4').bindStore(storeGridDatas);
        }
    },
    validateFields: function () {
        var msj = '';
        var bean = searchParams.bean;

        return msj;
    },
    btnAdd_click: function () {
        this.winDataEntry('I');
    },

    onEditClick: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        this.winDataEntry('U', rec);
    },
    winDataEntry: function (action, rec) {
        action = action === null || action === undefined ? 'U' : action;
        rec = rec === null || rec === undefined ? {} : rec;

        Ext.create('Ext.Praxis.view.payments.SalesConciliationManualForm.DataEntry', {
            id: prototype.id + '-dataEntry',
            params: {
                action: action,
                rec: rec,
                lstCountry: me.lstCountry
            }
        }).show();
    },

    btnBack_click: function (obj, e) {

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
    btnClear_click: function (obj, e) {
        Ext.getCmp(prototype.id + '-cmbDateFromYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateToYear').setValue(this.fecha.getFullYear());

        Ext.getCmp(prototype.id + '-cmbDateFromMonth').setValue('');
        Ext.getCmp(prototype.id + '-cmbDateFromDay').setValue('');
        Ext.getCmp(prototype.id + '-cmbDateToMonth').setValue('');
        Ext.getCmp(prototype.id + '-cmbDateToDay').setValue('');
//        Ext.getCmp(prototype.id + '-txtSAGENT').setValue('');
        Ext.getCmp(prototype.id + '-txtTKT').setValue('');
        Ext.getCmp(prototype.id + '-cmbFCONCEP').setValue('');
//        Ext.getCmp(prototype.id + '-txtCard1').setValue('');
//        Ext.getCmp(prototype.id + '-txtCard2').setValue('');
//        Ext.getCmp(prototype.id + '-txtSAUTHOC').setValue('');
//        Ext.getCmp(prototype.id + '-txtSPNR').setValue('');
    },
    btnExcel_click: function (obj, e) {
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
                fn: function (btn) {
                    if (btn === 'ok') {
                        this.exportExcel();
                    }
                }
            });
        }
    },
    exportExcel: function () {
        console.log(me.panelActual);
        switch (me.panelActual) {
            case  '-panelGridDataDetByF':
                global.getFile(prototype.url + '/getXLSXDetailByF?beanString=' + encodeURI(me.paramsDetail.beanString));
                break;
                case  '-panelGridDataDetByS':
                global.getFile(prototype.url + '/getXLSXDetailByS?beanString=' + encodeURI(me.paramsDetail.beanString));
                break;
                case  '-panelGridDataDetByD':
                global.getFile(prototype.url + '/getXLSXDetailByD?beanString=' + encodeURI(me.paramsDetail.beanString));
                break;
                default:
                global.Msg(
                        {msg: 'Under Construction'
                        });
        }
    },
    btnFilter_click: function (obj) {
        var option = Ext.getCmp(prototype.id + '-contFilter');
        if (option.isVisible()) {
            option.setVisible(false);
        } else {
            option.setVisible(true);
        }
    },
    setWidthPie: function () {

        var ancho = Ext.getCmp(prototype.id + me.panelActual).getWidth();
        Ext.getCmp(prototype.id + '-pie').setWidth(ancho);
        Ext.getCmp(prototype.id + '-pie').setVisible(true);
    },
    getPaggin: function () {
        me.pagginActual = '';
        switch (me.panelActual) {
            case  '-panelGridDataMain':
                me.pagginActual = '-paggin';
                break;
            case  '-panelGridDataDate':
                me.pagginActual = '-paggin2';
                break;
            case  '-panelGridDataDet':
                me.pagginActual = '-paggin3';
                break;
            case  '-panelGridDataDetByF':
                me.pagginActual = '-paggin4';
                break
            case  '-panelGridDataMainDay':
                me.pagginActual = '-paggin5';
                break;
            case  '-panelGridDataDetByD':
                me.pagginActual = '-paggin6';
                break;
            case  '-panelGridDataDetByS':
                me.pagginActual = '-paggin7';
                break;
        }
    },
    afterRenderYear: function (obj) {
        obj.setValue(this.fecha.getFullYear());
    },
    afterRenderMonth: function (obj) {
        obj.setValue('01');
    },
    selectComboFromYear: function (obj) {
        var comboToYear = Ext.getCmp(prototype.id + '-cmbDateToYear');
        var storeComboDataYear = win.getStoreYear2(false, obj.getValue());
        comboToYear.bindStore(storeComboDataYear);
        comboToYear.setValue(obj.getValue());
    },
    selectComboFromMonth: function (obj) {
        var comboToMonth = Ext.getCmp(prototype.id + '-cmbDateToMonth');
        comboToMonth.setValue(obj.getValue());
    },
    selectComboToMonth: function (obj) {
        var comboFromYear = Ext.getCmp(prototype.id + '-cmbDateFromYear');
        var comboToYear = Ext.getCmp(prototype.id + '-cmbDateToYear');
        var comboFromMonth = Ext.getCmp(prototype.id + '-cmbDateFromMonth');
        if (comboFromYear.getValue() === comboToYear.getValue()) {
            if (obj.getValue() < comboFromMonth.getValue()) {
                comboFromMonth.setValue(obj.getValue());
            }
        }
    },
    selectComboFromDay: function (obj) {
        var comboToDay = Ext.getCmp(prototype.id + '-cmbDateToDay');
        comboToDay.setValue(obj.getValue());
    },

    /*     
     * Funciones para la paginacion     
     */

    pagFirst: function (obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.moveFirst();
    }, pagPrevious: function (obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.movePrevious();
    },
    pagNext: function (obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.moveNext();
    },
    pagLast: function (obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.moveLast();
    },
    getInt: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right';
        return Ext.util.Format.number(value, '0,000');
    },
    getDouble: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right';
        return Ext.util.Format.number(value, '0,000.00');
    },
    getText: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:left';
        return value;
    },
    getDoubleColor1: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right;background:#F2FAFC';
        return Ext.util.Format.number(value, '0,000.00');
    },
    getDoubleColor2: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right;background:#DFF0ED';
        return Ext.util.Format.number(value, '0,000.00');
    },
    getDoubleColor3: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right;background:#FCF5F2';
        return Ext.util.Format.number(value, '0,000.00');
    }
}
);