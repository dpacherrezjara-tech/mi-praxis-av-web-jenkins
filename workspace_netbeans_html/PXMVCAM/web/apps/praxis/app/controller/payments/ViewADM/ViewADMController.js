
Ext.define('Ext.Praxis.controller.payments.ViewADM.ViewADMController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ViewADMController',
    fecha: new Date(),
    childs: '5',
    bean: '',
    paginActual: '',
    drillDown: [],
    lstCountry: [],
    lstTarjetas: [],
    gridActual: '',
    panelActual: '',
    reg99: 0,
    me: '',
    
    dup: '',
    searchParams: {},
    paramsDetail: {},
    paramsReportADM: {},
    paramsTKT: {},
    dataObtain: {},
    beanTKT: {},
    beanDetDayMain: {},
    beanDetCountry: {},
    beanDetCard: {},
    beanDetDetailByF: {},
    beanDetDetailByEyes: {},
    beanDetDetailByEyesCountry: {},
    beanDetail: {},
    beanDetailByS: {},
    beanDetailByD: {},
    beanDetailByF: {},
    dataGrid: [],
    
    init: function (view) {
        me = this;
        prototype.id = 'ViewADMForm';
        prototype.url = CONTEXTPATH + '/ViewADM';
        prototype.urlMaster = CONTEXTPATH + '/MasterController';
        this.childs = Ext.getCmp(prototype.id + '-panelMain').items.items;
        me.panelActual = '-panelGridDataMain';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        this.control({
//            //   -------------------Eventos Genericos --------------------
            '#ViewADMForm-xpanel': {
                afterrender: this.xpanel_afterrender
            },
            '#ViewADMForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#ViewADMForm-btnClear': {
                click: this.btnClear_click
            },
            '#ViewADMForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#ViewADMForm-btnReportADM': {
                click: this.btnReportADM
            },
            '#ViewADMForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#ViewADMForm-btnAdd': {
                click: this.btnAdd_click
            },
            '#ViewADMForm-btnBack': {
                click: this.btnBack_click
            },
            '#ViewADMForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#ViewADMForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#ViewADMForm-btn-pag-next': {
                click: this.pagNext
            },
            '#ViewADMForm-btn-pag-last': {
                click: this.pagLast
            },
            '#ViewADMForm-cmbDateFromYear': {
                afterrender: this.afterRenderYear,
                select: this.selectComboFromYear
            },
            '#ViewADMForm-cmbDateToYear': {
                afterrender: this.afterRenderYear
            },
            '#ViewADMForm-cmbDateFromMonth': {
                afterrender: this.afterRenderMonth,
                select: this.selectComboFromMonth
            },
            '#ViewADMForm-cmbDateToMonth': {
                afterrender: this.afterRenderMonth,
                select: this.selectComboToMonth
            },
            '#ViewADMForm-cmbDateFromDay': {
                select: this.selectComboFromDay
            },
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
                ["SDATE", "Sales Date"]
            ]
        }));
        cmbFecFiltro.setValue("SDATE");
        
        
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
                    me.lstCountry = res.lstCountry;
                    me.lstTarjetas = res.lstCard;
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
        me.bean.IN_ADMNUM = Ext.getCmp(prototype.id + '-txtADMNUM').getValue();
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
        if( Ext.getCmp(prototype.id + '-txtTKT').getValue() != '' || Ext.getCmp(prototype.id + '-txtADMNUM').getValue() != ''){
            this.setGridDataDetail()
        }else{
            this.setGridData(); 
        }
    },
//    changeTS: function () {
//        console.log('HOLAAAAA')
//    },
//    
//    chgJesus: function () {
//        console.log('HOLAAAAA xdddddddddddddd')
//    },
//    clickToggleSwitch: function () {
//        console.log('WADAFAAAAA')
//    },
    setGridData: function () {
        
        me.drillDown.push(me.panelActual);
        me.panelActual = '-panelGridDataMain'
        me.flag = 'all';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        win.lblUser_toolTip("Estructura: MPF100");
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
        win.lblUser_toolTip("Estructura: MPF100");
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
                        Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');
                    },
                    load: function (obj) {
                        Ext.getCmp(prototype.id + '-contentInfo').unmask();
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
                            Ext.getCmp(prototype.id + '-gridDataDet').setTitle('<center style="font-size:11px;">' + data.strTitulo + '</center>');
//                            win.setText('lblTittleByDayS', data.strTitulo);
                        }
                    }
                }
            });
            global.clear();
            Ext.getCmp(prototype.id + '-gridDataDet').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin5').bindStore(storeGridDatas);
        }
    },

    onGridCountryByF: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
        let cantidad = 0
        
        console.log(columnNum, 'columnNum')
        switch (columnNum) {
            case 1:
                this.beanDetCountry.IN_TDOC = ''
                this.beanDetCountry.IN_FSEND = 'Y'
                this.beanDetCountry.IN_FRCV = ''
                this.beanDetCountry.IN_TITLE = '' + rowData.data.strFormatDate + ' - ' + 'Sent Agency'
                cantidad = rowData.data.lngQSENT;
                break;
            case 2:
                this.beanDetCountry.IN_TDOC = ''
                this.beanDetCountry.IN_FSEND = ''
                this.beanDetCountry.IN_FRCV = 'P'
                this.beanDetCountry.IN_TITLE = '' + rowData.data.strFormatDate + ' - ' + 'Not Answered'
                cantidad = rowData.data.lngQSENTPEND;
                break;
            case 4:
                this.beanDetCountry.IN_TDOC = ''
                this.beanDetCountry.IN_FSEND = ''
                this.beanDetCountry.IN_FRCV = 'A'
                this.beanDetCountry.IN_TITLE = '' + rowData.data.strFormatDate + ' - ' + 'Answered'
                cantidad = rowData.data.lngQSENTANS;
                break;
            case 5:
                this.beanDetCountry.IN_TDOC = ''
                this.beanDetCountry.IN_FSEND = ''
                this.beanDetCountry.IN_FRCV = '1'
                this.beanDetCountry.IN_TITLE = '' + rowData.data.strFormatDate + ' - ' + 'Accepted'
                cantidad = rowData.data.lngQSENTACCEP;
                break;
            case 6:
                this.beanDetCountry.IN_TDOC = ''
                this.beanDetCountry.IN_FSEND = ''
                this.beanDetCountry.IN_FRCV = '2'
                this.beanDetCountry.IN_TITLE = '' + rowData.data.strFormatDate + ' - ' + 'Rejected'
                cantidad = rowData.data.lngQSENTREJ;
                break;
            case 7:
                this.beanDetCountry.IN_TDOC = 'A'
                this.beanDetCountry.IN_FSEND = ''
                this.beanDetCountry.IN_FRCV = ''
                this.beanDetCountry.IN_TITLE = '' + rowData.data.strFormatDate + ' - ' + 'Adjustment'
                cantidad = rowData.data.lngQADJ;
                break;
        }
        console.log(cantidad, 'cantidad')
        if(cantidad == 0){
            global.Msg({ msg: 'Data not found.'})
            return false
        }
        //CAMBIO DE GRILLA A OTRA AL BAJAR
        me.drillDown.push(me.panelActual);
        me.panelActual = '-panelGridDataCountryByF'
        me.flag = 'all';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        this.beanDetCountry.IN_SDATE = rowData.data.SDATE;
        console.log( this.beanDetCountry, ' this.beanDetDay')
        me.paramsDetail.beanString = JSON.stringify(this.beanDetCountry);
        this.setGridDataDetCountry();

        
    },
    setGridDataDetCountry: function () {
        win.lblUser_toolTip("Estructura: MPF100");
        me.setWidthPie();
//        Ext.getCmp(prototype.id + '-pie').setWidth(602);
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/searchDetCountryByF'
                }, listeners: {
                    beforeload: function (obj) {
                        obj.proxy.extraParams = me.paramsDetail;
                        Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');
                    },
                    load: function (obj) {
                        Ext.getCmp(prototype.id + '-contentInfo').unmask();
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
                            Ext.getCmp(prototype.id + '-gridDataCountryByF').setTitle('<center style="font-size:11px;">' + data.strTitulo + '</center>');
//                            win.setText('lblTittleByDayS', data.strTitulo);
                        }
                    }
                }
            });
            global.clear();
            Ext.getCmp(prototype.id + '-gridDataCountryByF').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin2').bindStore(storeGridDatas);
        }
    },
    onGridCardByF: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
        let cantidad = 0
        
        console.log(columnNum, 'columnNum')
        
        console.log(cantidad, 'cantidad')
        
        //CAMBIO DE GRILLA A OTRA AL BAJAR
        me.drillDown.push(me.panelActual);
        me.panelActual = '-panelGridDataCardByF'
        me.flag = 'all';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        this.beanDetCard.IN_SDATE = rowData.data.IN_SDATE;
        this.beanDetCard.IN_FSEND = rowData.data.IN_FSEND;
        this.beanDetCard.IN_FRCV = rowData.data.IN_FRCV;
        this.beanDetCard.IN_TDOC = rowData.data.IN_TDOC;
        this.beanDetCard.IN_SCURRENCY = rowData.data.SCURRENCY;
        this.beanDetCard.IN_SCOUNTRY = rowData.data.SCOUNTRY;
        this.beanDetCard.IN_TITLE = rowData.data.strTitulo;
        console.log(this.beanDetCard.IN_TITLE, 'this.beanDetCard.IN_TITLE')
        console.log( this.beanDetCard, ' this.beanDetDay')
        me.paramsDetail.beanString = JSON.stringify(this.beanDetCard);
        this.setGridDataDetCardByF();

        
    },
    setGridDataDetCardByF: function () {
        win.lblUser_toolTip("Estructura: MPF100");
        me.setWidthPie();
//        Ext.getCmp(prototype.id + '-pie').setWidth(452);
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/searchDetCardByF'
                }, listeners: {
                    beforeload: function (obj) {
                        obj.proxy.extraParams = me.paramsDetail;
                        Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');
                    },
                    load: function (obj) {
                        Ext.getCmp(prototype.id + '-contentInfo').unmask();
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
                            Ext.getCmp(prototype.id + '-gridDataCardByF').setTitle('<center style="font-size:11px;">' + data.strTitulo + '</center>');
//                            win.setText('lblTittleByDayS', data.strTitulo);
                        }
                    }
                }
            });
            global.clear();
            Ext.getCmp(prototype.id + '-gridDataCardByF').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin3').bindStore(storeGridDatas);
        }
    },
    onGridDetDetailByF: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
        let cantidad = 0
        
        console.log(columnNum, 'columnNum')
        
        console.log(cantidad, 'cantidad')
        
        //CAMBIO DE GRILLA A OTRA AL BAJAR
        me.drillDown.push(me.panelActual);
        me.panelActual = '-panelGridDataDetDetailByF'
        me.flag = 'all';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        this.beanDetDetailByF.IN_SDATE = rowData.data.IN_SDATE;
        this.beanDetDetailByF.IN_FSEND = rowData.data.IN_FSEND;
        this.beanDetDetailByF.IN_FRCV = rowData.data.IN_FRCV;
        this.beanDetDetailByF.IN_TDOC = rowData.data.IN_TDOC;
        this.beanDetDetailByF.IN_SCURRENCY = rowData.data.IN_SCURRENCY;
        this.beanDetDetailByF.IN_SCOUNTRY = rowData.data.IN_SCOUNTRY;
        this.beanDetDetailByF.IN_SAGENT = rowData.data.SAGENT;
        this.beanDetDetailByF.IN_TITLE = rowData.data.strTitulo;
        console.log(this.beanDetDetailByF.IN_TITLE, 'this.beanDetDetailByF.IN_TITLE')
        console.log( this.beanDetDetailByF, ' this.beanDetDetailByF')
        me.paramsDetail.beanString = JSON.stringify(this.beanDetDetailByF);
        this.setGridDataDetDetailByF();
    },
    setGridDataDetDetailByF: function () {
        win.lblUser_toolTip("Estructura: MPF100");
        me.setWidthPie();
//        Ext.getCmp(prototype.id + '-pie').setWidth(1102);
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/searchDetDetailByF'
                }, listeners: {
                    beforeload: function (obj) {
                        obj.proxy.extraParams = me.paramsDetail;
                        Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');
                    },
                    load: function (obj) {
                        Ext.getCmp(prototype.id + '-contentInfo').unmask();
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
                            Ext.getCmp(prototype.id + '-gridDetDetailByF').setTitle('<center style="font-size:11px;">' + data.strTitulo + '</center>');
//                            win.setText('lblTittleByDayS', data.strTitulo);
                        }
                    }
                }
            });
            global.clear();
            Ext.getCmp(prototype.id + '-gridDetDetailByF').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin4').bindStore(storeGridDatas);
        }
    },
    onViewClickTotal: function (obj, metaData, rowNum, columnNum, obj2, rowData){

        this.beanDetDetailByEyes.IN_FSEND = ''
        this.beanDetDetailByEyes.IN_FRCV = ''
        this.beanDetDetailByEyes.IN_TITLE = '' + rowData.data.strFormatDate + ' - ' + 'Total ADM'
        me.drillDown.push(me.panelActual);
        me.panelActual = '-panelGridDataDetDetailByEyes'
        me.flag = 'all';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        this.beanDetDetailByEyes.IN_SDATE = rowData.data.SDATE;
        console.log( this.beanDetDetailByEyes, ' this.beanDetDetailByEyes')
        me.paramsDetail.beanString = JSON.stringify(this.beanDetDetailByEyes);
        this.setGridDataDetailByEyes();
    },
    onViewClickSent: function (obj, metaData, rowNum, columnNum, obj2, rowData){

        this.beanDetDetailByEyes.IN_FSEND = 'Y'
        this.beanDetDetailByEyes.IN_FRCV = ''
        this.beanDetDetailByEyes.IN_TITLE = '' + rowData.data.strFormatDate + ' - ' + 'Sent Agency'
        me.drillDown.push(me.panelActual);
        me.panelActual = '-panelGridDataDetDetailByEyes'
        me.flag = 'all';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        this.beanDetDetailByEyes.IN_SDATE = rowData.data.SDATE;
        console.log( this.beanDetDetailByEyes, ' this.beanDetDetailByEyes')
        me.paramsDetail.beanString = JSON.stringify(this.beanDetDetailByEyes);
        this.setGridDataDetailByEyes();
    },
    onViewClickPend: function (obj, metaData, rowNum, columnNum, obj2, rowData){

        this.beanDetDetailByEyes.IN_FSEND = 'P'
        this.beanDetDetailByEyes.IN_FRCV = ''
        this.beanDetDetailByEyes.IN_TITLE = '' + rowData.data.strFormatDate + ' - ' + 'Pendings'
        me.drillDown.push(me.panelActual);
        me.panelActual = '-panelGridDataDetDetailByEyes'
        me.flag = 'all';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        this.beanDetDetailByEyes.IN_SDATE = rowData.data.SDATE;
        console.log( this.beanDetDetailByEyes, ' this.beanDetDetailByEyes')
        me.paramsDetail.beanString = JSON.stringify(this.beanDetDetailByEyes);
        this.setGridDataDetailByEyes();
    },
    onViewClickAns: function (obj, metaData, rowNum, columnNum, obj2, rowData){
        this.beanDetDetailByEyes.IN_FSEND = ''
        this.beanDetDetailByEyes.IN_FRCV = 'A'
        this.beanDetDetailByEyes.IN_TITLE = '' + rowData.data.strFormatDate + ' - ' + 'Answered'
        me.drillDown.push(me.panelActual);
        me.panelActual = '-panelGridDataDetDetailByEyes'
        me.flag = 'all';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        this.beanDetDetailByEyes.IN_SDATE = rowData.data.SDATE;
        console.log( this.beanDetDetailByEyes, ' this.beanDetDetailByEyes')
        me.paramsDetail.beanString = JSON.stringify(this.beanDetDetailByEyes);
        this.setGridDataDetailByEyes();
    },
    onViewClickSentPend: function (obj, metaData, rowNum, columnNum, obj2, rowData){
        this.beanDetDetailByEyes.IN_FSEND = ''
        this.beanDetDetailByEyes.IN_FRCV = 'P'
        this.beanDetDetailByEyes.IN_TITLE = '' + rowData.data.strFormatDate + ' - ' + 'Sent Pendings'
        me.drillDown.push(me.panelActual);
        me.panelActual = '-panelGridDataDetDetailByEyes'
        me.flag = 'all';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        this.beanDetDetailByEyes.IN_SDATE = rowData.data.SDATE;
        console.log( this.beanDetDetailByEyes, ' this.beanDetDetailByEyes')
        me.paramsDetail.beanString = JSON.stringify(this.beanDetDetailByEyes);
        this.setGridDataDetailByEyes();
    },
    onViewClickAccep: function (obj, metaData, rowNum, columnNum, obj2, rowData){
        this.beanDetDetailByEyes.IN_FSEND = ''
        this.beanDetDetailByEyes.IN_FRCV = '1'
        this.beanDetDetailByEyes.IN_TITLE = '' + rowData.data.strFormatDate + ' - ' + 'Accepted'
        me.drillDown.push(me.panelActual);
        me.panelActual = '-panelGridDataDetDetailByEyes'
        me.flag = 'all';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        this.beanDetDetailByEyes.IN_SDATE = rowData.data.SDATE;
        console.log( this.beanDetDetailByEyes, ' this.beanDetDetailByEyes')
        me.paramsDetail.beanString = JSON.stringify(this.beanDetDetailByEyes);
        this.setGridDataDetailByEyes();
    },
    onViewClickSentRejec: function (obj, metaData, rowNum, columnNum, obj2, rowData){
        this.beanDetDetailByEyes.IN_FSEND = ''
        this.beanDetDetailByEyes.IN_FRCV = '2'
        this.beanDetDetailByEyes.IN_TITLE = '' + rowData.data.strFormatDate + ' - ' + 'Rejected'
        me.drillDown.push(me.panelActual);
        me.panelActual = '-panelGridDataDetDetailByEyes'
        me.flag = 'all';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        this.beanDetDetailByEyes.IN_SDATE = rowData.data.SDATE;
        console.log( this.beanDetDetailByEyes, ' this.beanDetDetailByEyes')
        me.paramsDetail.beanString = JSON.stringify(this.beanDetDetailByEyes);
        this.setGridDataDetailByEyes();
    },
    setGridDataDetailByEyes: function (){
        win.lblUser_toolTip("Estructura: MPF100");
        me.setWidthPie();
        
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/searchDetailByEyes'
                }, listeners: {
                    beforeload: function (obj) {
                        obj.proxy.extraParams = me.paramsDetail;
                        Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');
                    },
                    load: function (obj) {
                        Ext.getCmp(prototype.id + '-contentInfo').unmask();
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
                            Ext.getCmp(prototype.id + '-gridDetDetailByEyes').setTitle('<center style="font-size:11px;">' + data.strTitulo + '</center>');
//                            win.setText('lblTittleByDayS', data.strTitulo);
                        }
                    }
                }
            });
            global.clear();
            Ext.getCmp(prototype.id + '-gridDetDetailByEyes').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin6').bindStore(storeGridDatas);
        }
    },
    onViewClickCountry: function (obj, metaData, rowNum, columnNum, obj2, rowData){

        this.beanDetDetailByEyesCountry.IN_SDATE = rowData.data.IN_SDATE;
        this.beanDetDetailByEyesCountry.IN_FSEND = rowData.data.IN_FSEND;
        this.beanDetDetailByEyesCountry.IN_FRCV = rowData.data.IN_FRCV;
        this.beanDetDetailByEyesCountry.IN_TDOC = rowData.data.IN_TDOC;
        this.beanDetDetailByEyesCountry.IN_SCURRENCY = rowData.data.SCURRENCY;
        this.beanDetDetailByEyesCountry.IN_SCOUNTRY = rowData.data.SCOUNTRY;
        this.beanDetDetailByEyesCountry.IN_TITLE = rowData.data.strTitulo;
        me.drillDown.push(me.panelActual);
        me.panelActual = '-panelGridDataDetDetailByEyesCountry'
        me.flag = 'all';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        console.log( this.beanDetDetailByEyesCountry, ' this.beanDetDetailByEyesCountry')
        me.paramsDetail.beanString = JSON.stringify(this.beanDetDetailByEyesCountry);
        this.setGridDataDetailByEyesCountry();
    },
    setGridDataDetailByEyesCountry: function (){
        win.lblUser_toolTip("Estructura: MPF100");
        me.setWidthPie();
        
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/searchDetailByEyesCountry'
                }, listeners: {
                    beforeload: function (obj) {
                        obj.proxy.extraParams = me.paramsDetail;
                        Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');
                    },
                    load: function (obj) {
                        Ext.getCmp(prototype.id + '-contentInfo').unmask();
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
                            Ext.getCmp(prototype.id + '-gridDetDetailByEyesCountry').setTitle('<center style="font-size:11px;">' + data.strTitulo + '</center>');
//                            win.setText('lblTittleByDayS', data.strTitulo);
                        }
                    }
                }
            });
            global.clear();
            Ext.getCmp(prototype.id + '-gridDetDetailByEyesCountry').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin7').bindStore(storeGridDatas);
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

    viewDataEntry_clickHandler: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
         
        let beanTicket = {}
        beanTicket.CCIA = rowData.data.CCIA
        beanTicket.FORMA = rowData.data.FORMA
        beanTicket.SERIE = rowData.data.SERIE
        beanTicket.TDOC = rowData.data.TDOC
        beanTicket.SCARDNCOR = rowData.data.SCARDNCOR
        beanTicket.SAUTHOC = rowData.data.SAUTHOC
        beanTicket.STVAL = rowData.data.STVAL
        beanTicket.ADMNUM = rowData.data.ADMNUM
        console.log(beanTicket, 'beanTicket')
        this.winDataEntry('U', beanTicket);
    },
    winDataEntry: function (action, rec) {
        action = action === null || action === undefined ? 'U' : action;
        rec = rec === null || rec === undefined ? {} : rec;
        console.log(rec, 'recccccccccccc')
        console.log(me.panelActual, 'me.panelActual')
        Ext.create('Ext.Praxis.view.payments.ViewADMForm.DataEntry', {
            id: prototype.id + '-dataEntry',
            params: {
                action: action,
                rec: rec,
                lstCountry: me.lstCountry,
                paramsRefresh: me.paramsDetail,
                instancia: me,
                panel: me.panelActual
            }
        }).show();
    },
    sendMail_clickHandler: function () {

        console.log('sendMail_clickHandler');
        
        me.dpick= win = Ext.create('Ext.window.Window', {
            title: 'Seleccionar Fecha',
            modal: true,
            width: 280,
            height: 200,
            layout: 'hbox',
//            align: 'center',
            items: [
                {
                    xtype: 'monthpicker',
                    id:prototype.id + '-monthPicker',
//                    listeners: {
////                        cancelclick: 'cancelarSeleccionFecha',
//                        monthdblclick: 'aceptarSeleccionFecha'
//                    }
                },
                {
                    xtype: 'button',
                    padding: '10px 10px 10px 10px',
                    margin: '60px 0px 0px 0px',
                    text: 'Enviar Correo',
                    handler: this.aceptarSeleccionFecha
                }
            ]
        });
        me.dpick.show();
           
    },
    aceptarSeleccionFecha: function(button) {
//        var window = button.up('window'); // Obtener la ventana que contiene el MonthPicker
//        var monthpicker = window.down('monthpicker'); // Obtener el componente MonthPicker
        var monthpicker = Ext.getCmp(prototype.id + '-monthPicker'); // Obtener el componente MonthPicker
        var selectedDate = monthpicker.getValue(); // Obtener la fecha seleccionada
//        console.log('Año xxxxxxx:', selectedDate);
        if (selectedDate) {
            var year = selectedDate[1]; // Obtener el año seleccionado
            var month = selectedDate[0] + 1; // Obtener el mes seleccionado (los meses son base 0)
            month = Ext.String.leftPad(month,2,'0');
            
            console.log('Año seleccionado:', year);
            console.log('Mes seleccionado:', month);
            
            // Luego puedes realizar las acciones que necesites con el año y el mes seleccionados
            // Por ejemplo, enviar esta información al servidor para enviar un correo electrónico
            me.enviarCorreo(year +''+ month);
        } else {
            console.error('No se ha seleccionado ninguna fecha');
        }
//        this.enviarFechaSeleccionada(fechaSeleccionada);
    },
    enviarCorreo: function (fecha) {
        me.dpick.close();
        console.log('enviarCorreo');
        console.log(fecha);
        var msj='¿Estás seguro de enviar Correo para la fecha : '+ fecha + ' ?';
        
        Ext.Msg.show({
            title: '.:Confirmation:.',
            msg: msj,
            buttons: Ext.MessageBox.OKCANCEL,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function (btn) {
                if (btn === 'ok') {
//                            this.sendEmailtoIATA(me.lstSendIata);
                    console.log(me.lstSendIata);

                    var listaCadena = [];
//                            console.log(listaCadena);

                    Ext.Ajax.request({
                        url: prototype.url + '/sendEmail',
                        method: 'POST',
                        timeout: 60000000,
                        beforerequest: Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...'),
                        params: {v_fecha: fecha},
                        success: function (response, options) {
                            Ext.getCmp(prototype.id + '-contentInfo').unmask('Loading...');
                            var res = Ext.JSON.decode(response.responseText);
                            console.log(res);
                            var msj = String(res.msj);

                            global.Msg({msg: msj});

                        }
                    });
                }
            }
        });
            
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
        Ext.getCmp(prototype.id + '-txtADMNUM').setValue('');
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
            case  '-panelGridDataDetDetailByEyes':
                global.getFile(prototype.url + '/getXLSXDetailByEyes?beanString=' + encodeURI(me.paramsDetail.beanString));
                break;
                case  '-panelGridDataDetDetailByEyesCountry':
                global.getFile(prototype.url + '/getXLSXDetailByEyesCountry?beanString=' + encodeURI(me.paramsDetail.beanString));
                break;
                case  '-panelGridDataDetDetailByF':
                global.getFile(prototype.url + '/getXLSXDetailByF?beanString=' + encodeURI(me.paramsDetail.beanString));
                break;
                default:
                global.Msg(
                        {msg: 'Under Construction'
                        });
        }
    },
    btnReportADM: function (obj) {
        let years = [];
        let currentYear = new Date().getFullYear();
        for (let i = currentYear - 10; i <= currentYear + 10; i++) {
            years.push(i);
        }

        var dialog = Ext.create('Ext.window.Window', {
            title: 'Generate Report',
            width: 300,
            layout: 'fit',
            bodyPadding: 10,
            bodyStyle: 'background-color: #BAE8F0;',
            modal: true,
            items: [
                {
                    xtype: 'form', // Define the form
                    border: false,
                    bodyStyle: 'background-color: #BAE8F0;',
                    items: [
                        {
                            xtype: 'combobox',
                            fieldLabel: 'Av Group',
                            name: 'cliente',
                            store: Ext.create('Ext.data.Store', {
                                fields: ['code', 'name'],
                                data: [
                                    ["134", "AVIANCA"],["202", "TACA"],["133", "LACSA"],["547", "AEROGAL"]
                                ]
                            }),
                            queryMode: 'local',
                            displayField: 'name',
                            valueField: 'code',
                            value: "134"
                        },
                        // FUENTE
                         {
                            xtype: 'combobox',
                            fieldLabel: 'Source',
                            name: 'cfuente',
                            store: Ext.create('Ext.data.Store', {
                                fields: ['fuente'],
                                data: [
                                    { fuente: 'BSP' },
                                    { fuente: 'ARC' },
                                    { fuente: 'AMA' }
                                ]
                            }),
                            queryMode: 'local',
                            displayField: 'fuente',
                            valueField: 'fuente',
                            value: "BSP"
                        },
                        {
                            xtype: 'combobox',
                            fieldLabel: 'Year',
                            name: 'year',
                            store: years,
                            queryMode: 'local',
                            forceSelection: true
                        },
                        {
                            xtype: 'combobox',
                            fieldLabel: 'Month',
                            name: 'month',
                            store: Ext.create('Ext.data.Store', {
                                fields: ['month', 'display'],
                                data: [
                                    {month: '01', display: 'Jan'},
                                    {month: '02', display: 'Feb'},
                                    {month: '03', display: 'Mar'},
                                    {month: '04', display: 'Apr'},
                                    {month: '05', display: 'May'},
                                    {month: '06', display: 'Jun'},
                                    {month: '07', display: 'Jul'},
                                    {month: '08', display: 'Aug'},
                                    {month: '09', display: 'Sep'},
                                    {month: '10', display: 'Oct'},
                                    {month: '11', display: 'Nov'},
                                    {month: '12', display: 'Dec'}
                                ]
                            }),
                            queryMode: 'local',
                            displayField: 'display',
                            valueField: 'month'
                        },
                        {
                            xtype: 'combobox',
                            fieldLabel: 'Country',
                            name: 'country',
                            store: Ext.create('Ext.data.Store', {
                                fields: ['A006PAIS', 'A006NOMBRE'],
                                data: me.lstCountry
                            }),
                            value: 'CO',
                            queryMode: 'local',
                            valueField: 'A006PAIS',
                            displayField: 'A006NOMBRE',
                            listeners:{
                            }
                        },
                        {
                            xtype: 'combobox',
                            fieldLabel: 'Card Code',
                            name: 'card',
                            store: Ext.create('Ext.data.Store', {
                                fields: ['CODE', 'NAME'],
                                data: me.lstTarjetas
                            }),
                            value: '',
                            queryMode: 'local',
                            valueField: 'CODE',
                            displayField: 'NAME',
                            listeners:{
                            }
                        }
                        
                    ]
                }
            ],
            buttons: [
                {
                    text: 'Generar',
                    handler: function() {
                        let beanReportADM = {}
                        let form = dialog.down('form').getForm();
                        let values = form.getValues();
                        if( values.year == '' || values.month == '' ){
                            global.Msg({
                                msg: 'Enter the period'
                            });
                            return false
                        }
//                        if( values.country == '' ){
//                            global.Msg({
//                                msg: 'Enter the country'
//                            });
//                            return false
//                        }
                        
                        let periodo = values.year + values.month; 
                        beanReportADM.SDATE = periodo
                        beanReportADM.SCOUNTRY = values.country
                        beanReportADM.SCARCOD = values.card
                        beanReportADM.CCUST = values.cliente
                        beanReportADM.CFUENTE  = values.cfuente 
                        console.log('beanReportADM', beanReportADM);
                        console.log(me.lstCountry, 'me.lstCountry');
                        console.log(me.lstTarjetas, 'me.lstTarjetas');
                        
                        me.paramsReportADM.beanString = JSON.stringify(beanReportADM)
                        global.getFile(prototype.url + '/getXLSXReportADM?beanString=' + encodeURI(me.paramsReportADM.beanString));
                        dialog.hide();
                    }
                }
            ]
        });

        dialog.show();
//        me.paramsReportADM.beanString = JSON.stringify(beanReportADM)
//        global.getFile(prototype.url + '/getXLSXReportADM?beanString=' + encodeURI(me.paramsReportADM.beanString));
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
        if (ancho > 650) {
            Ext.getCmp(prototype.id + '-pie').setWidth(ancho);
        } else {
            Ext.getCmp(prototype.id + '-pie').setWidth(800);
        }
        Ext.getCmp(prototype.id + '-pie').setVisible(true);
    },
    getPaggin: function () {
        me.pagginActual = '';
        switch (me.panelActual) {
            case  '-panelGridDataMain':
                me.pagginActual = '-paggin';
                break;
            case  '-panelGridDataCountryByF':
                me.pagginActual = '-paggin2';
                break;
            case  '-panelGridDataCardByF':
                me.pagginActual = '-paggin3';
                break;
            case  '-panelGridDataDetDetailByF':
                me.pagginActual = '-paggin4';
                break
            case  '-panelGridDataDet':
                me.pagginActual = '-paggin5';
                break;
            case  '-panelGridDataDetDetailByEyes':
                me.pagginActual = '-paggin6';
                break;
            case  '-panelGridDataDetDetailByEyesCountry':
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