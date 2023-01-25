/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.sales.FareMasterFile.FareMasterFileController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.FareMasterFileController',
    fecha: new Date(),
    searchParams: {},
    init: function(view) {
        console.log('1)  APPLICATION Fare Master File - CONTROLLER FARE MASTER FILE- INIT');
        prototype.id = 'FareMasterFileForm';
        prototype.url = CONTEXTPATH + '/FareMasterFile';
        var me = this;
        this.control({
            // -------------------Eventos Genericos --------------------
            '#FareMasterFileForm-xpanel': {
                afterrender: this.xpanel_afterrender}
            ,
            '#FareMasterFileForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#FareMasterFileForm-btnClear': {
                click: this.btnClear_click
            },
            '#FareMasterFileForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#FareMasterFileForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#FareMasterFileForm-btnBack': {
                click: this.btnBack_click
            },
            '#FareMasterFileForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#FareMasterFileForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#FareMasterFileForm-btn-pag-next': {
                click: this.pagNext
            },
            '#FareMasterFileForm-btn-pag-last': {
                click: this.pagLast
            }

            //-----------------Eventos Especificos -------------------
            ,
            '#FareMasterFileForm-cmbSearchType': {
                select: this.selectcmbSearchType
            },
            '#FareMasterFileForm-txtIdSubscription': {
                keyup: this.eventKey,
                change: this.onUpperValue

            },
            '#FareMasterFileForm-txtFareClass': {
                keyup: this.eventKey,
                change: this.onUpperValue

            },
            '#FareMasterFileForm-txtFareClass0': {
                keyup: this.eventKey,
                change: this.onUpperValue
            },
            '#FareMasterFileForm-txtFareClass1': {
                keyup: this.eventKey,
                change: this.onUpperValue

            },
//            '#FareMasterFileForm-txtDestination': {
//                keyup: this.eventKey,
//                change: this.onUpperValue
//            },
//            '#FareMasterFileForm-cmbDateFromYear': {
//                afterrender: this.afterRenderYear,
//                select: this.selectComboFromYear
//            },
//            '#FareMasterFileForm-cmbDateToYear': {
//                afterrender: this.afterRenderYear
//            }
//            ,
//            '#FareMasterFileForm-cmbDateFromMonth': {
//                afterrender: this.afterRenderMonthFrom,
//                select: this.selectComboFromMonth
//            },
//            '#FareMasterFileForm-cmbDateToMonth': {
//                afterrender: this.afterRenderMonthTo,
//                select: this.selectComboToMonth
//            },
//            '#FareMasterFileForm-rbgFactorDataDisplay': {
//                change: this.radioChange
//            }
        });
    },
    xpanel_afterrender: function(obj, e) {
        this.setStoreData();

        Ext.getCmp(prototype.id + '-panelSuscription').show();
        Ext.getCmp(prototype.id + '-panelCarrier').hide();
        Ext.getCmp(prototype.id + '-panelFarebasis').hide();
        Ext.getCmp(prototype.id + '-panelDirectionalInd').hide();

        this.btnSearch_click();
    },
    selectcmbSearchType: function(obj) {

        var opt = obj.getValue();
        switch (opt) {
            case '1':
                Ext.getCmp(prototype.id + '-panelSuscription').show();
                Ext.getCmp(prototype.id + '-panelCarrier').hide();
                Ext.getCmp(prototype.id + '-panelFarebasis').hide();
                Ext.getCmp(prototype.id + '-panelDirectionalInd').hide();
                break;
            case '2':
                Ext.getCmp(prototype.id + '-panelSuscription').hide();
                Ext.getCmp(prototype.id + '-panelCarrier').show();
                Ext.getCmp(prototype.id + '-panelFarebasis').hide();
                Ext.getCmp(prototype.id + '-panelDirectionalInd').hide();
                break;
            case '3':
                Ext.getCmp(prototype.id + '-panelSuscription').hide();
                Ext.getCmp(prototype.id + '-panelCarrier').hide();
                Ext.getCmp(prototype.id + '-panelFarebasis').show();
                Ext.getCmp(prototype.id + '-panelDirectionalInd').hide();
                break;
            case '4':
                Ext.getCmp(prototype.id + '-panelSuscription').hide();
                Ext.getCmp(prototype.id + '-panelCarrier').hide();
                Ext.getCmp(prototype.id + '-panelFarebasis').hide();
                Ext.getCmp(prototype.id + '-panelDirectionalInd').show();
                break;
        }

    },
    onUpperValue: function(field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    setStoreData: function() {




        var cmbSearch = Ext.getCmp(prototype.id + '-cmbSearchType');
        cmbSearch.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["1", "Subscription"],
                ["2", "Carrier"],
                ["3", "Farebasis"],
                ["4", "Directional Ind."]
            ]
        }));
        Ext.getCmp(prototype.id + '-cmbSearchType').setValue(1);

        var cbxProductCode = Ext.getCmp(prototype.id + '-cbxProductCode');
        cbxProductCode.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "All"],
                ["I", "To / From North Amer"],
                ["A", "Except To / From N.Amer (All Fares)"]
            ]
        }));
        Ext.getCmp(prototype.id + '-cbxProductCode').setValue("");

        var cmbTransmissionType = Ext.getCmp(prototype.id + '-cmbTransmissionType');
        cmbTransmissionType.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "All"],
                ["A", "All Adds"],
                ["C", "Changes"]
            ]
        }));
        Ext.getCmp(prototype.id + '-cmbTransmissionType').setValue("");

        var storeComboDataYear = win.getStoreYear(false);
        var storeComboDataMonth = win.getStoreMonth(false);
        var storeComboDataDay = win.getStoreDays(false);
        Ext.getCmp(prototype.id + '-cbxDateOfFileYear').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cbxDateOfFileYear').setValue(2013);
        Ext.getCmp(prototype.id + '-cbxDateOfFileMonth').bindStore(storeComboDataMonth);
        Ext.getCmp(prototype.id + '-cbxDateOfFileMonth').setValue('0' + (this.fecha.getMonth() + 1));
        Ext.getCmp(prototype.id + '-cbxDateOfFileDay').bindStore(storeComboDataDay);
        Ext.getCmp(prototype.id + '-cbxDateOfFileDay').setValue('01');

        //--------------------------------------------------------------------------
        var storeEmpty = Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "All"]
            ]
        });


        Ext.getCmp(prototype.id + '-cbxCarrierCode').bindStore(storeEmpty);
        Ext.getCmp(prototype.id + '-cbxCarrierCode').setValue("");
        Ext.getCmp(prototype.id + '-cbxCarrierName').bindStore(storeEmpty);
        Ext.getCmp(prototype.id + '-cbxCarrierName').setValue("");


        var cbxDirectionalInd = Ext.getCmp(prototype.id + '-cbxDirectionalInd');
        cbxDirectionalInd.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "All"],
                ["F", "From Origin City"],
                ["T", "To Origin City"]
            ]
        }));
        Ext.getCmp(prototype.id + '-cbxDirectionalInd').setValue("");

        Ext.getCmp(prototype.id + '-cbxTariffEffDateYear').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cbxTariffEffDateYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cbxTariffEffDateMonth').bindStore(storeComboDataMonth);
        Ext.getCmp(prototype.id + '-cbxTariffEffDateMonth').setValue('0' + (this.fecha.getMonth() + 1));
        Ext.getCmp(prototype.id + '-cbxTariffEffDateDay').bindStore(storeComboDataDay);
        Ext.getCmp(prototype.id + '-cbxTariffEffDateDay').setValue('01');


        Ext.getCmp(prototype.id + '-cbxCarrierCode0').bindStore(storeEmpty);
        Ext.getCmp(prototype.id + '-cbxCarrierCode0').setValue("");
        Ext.getCmp(prototype.id + '-cbxCarrierName0').bindStore(storeEmpty);
        Ext.getCmp(prototype.id + '-cbxCarrierName0').setValue("");

        Ext.getCmp(prototype.id + '-cbxCarrierCode1').bindStore(storeEmpty);
        Ext.getCmp(prototype.id + '-cbxCarrierCode1').setValue("");
        Ext.getCmp(prototype.id + '-cbxCarrierName1').bindStore(storeEmpty);
        Ext.getCmp(prototype.id + '-cbxCarrierName1').setValue("");


        var cbxDirectionalInd0 = Ext.getCmp(prototype.id + '-cbxDirectionalInd0');
        cbxDirectionalInd0.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "All"],
                ["F", "From Origin City"],
                ["T", "To Origin City"]
            ]
        }));
        Ext.getCmp(prototype.id + '-cbxDirectionalInd0').setValue("");

        Ext.getCmp(prototype.id + '-cbxTariffEffDateYear0').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cbxTariffEffDateYear0').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cbxTariffEffDateMonth0').bindStore(storeComboDataMonth);
        Ext.getCmp(prototype.id + '-cbxTariffEffDateMonth0').setValue('0' + (this.fecha.getMonth() + 1));
        Ext.getCmp(prototype.id + '-cbxTariffEffDateDay0').bindStore(storeComboDataDay);
        Ext.getCmp(prototype.id + '-cbxTariffEffDateDay0').setValue('01');

        Ext.getCmp(prototype.id + '-cbxLastDateYear').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cbxLastDateYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cbxLastDateMonth').bindStore(storeComboDataMonth);
        Ext.getCmp(prototype.id + '-cbxLastDateMonth').setValue('0' + (this.fecha.getMonth() + 1));
        Ext.getCmp(prototype.id + '-cbxLastDateDay').bindStore(storeComboDataDay);
        Ext.getCmp(prototype.id + '-cbxLastDateDay').setValue('01');

        var storeCity1 = Ext.create('Ext.Praxis.store.sales.FareMasterFile.FilterBy', {
            proxy: {
                url: prototype.url + '/getCities'
            }
        });
        var storeCity2 = Ext.create('Ext.Praxis.store.sales.FareMasterFile.FilterBy', {
            proxy: {
                url: prototype.url + '/getCities2'
            }
        });


        Ext.getCmp(prototype.id + '-cbxOriCityCode').bindStore(storeCity1);
        Ext.getCmp(prototype.id + '-cbxOriCityCode').setValue("");
        Ext.getCmp(prototype.id + '-cbxOriCityName').bindStore(storeCity2);
        Ext.getCmp(prototype.id + '-cbxOriCityName').setValue("");
        Ext.getCmp(prototype.id + '-cbxDestCityCode').bindStore(storeCity1);
        Ext.getCmp(prototype.id + '-cbxDestCityCode').setValue("");
        Ext.getCmp(prototype.id + '-cbxDestCityName').bindStore(storeCity2);
        Ext.getCmp(prototype.id + '-cbxDestCityName').setValue("");

        Ext.getCmp(prototype.id + '-cbxOriCityCode0').bindStore(storeCity1);
        Ext.getCmp(prototype.id + '-cbxOriCityCode0').setValue("");
        Ext.getCmp(prototype.id + '-cbxOriCityName0').bindStore(storeCity2);
        Ext.getCmp(prototype.id + '-cbxOriCityName0').setValue("");
        Ext.getCmp(prototype.id + '-cbxDestCityCode0').bindStore(storeCity1);
        Ext.getCmp(prototype.id + '-cbxDestCityCode0').setValue("");
        Ext.getCmp(prototype.id + '-cbxDestCityName0').bindStore(storeCity2);
        Ext.getCmp(prototype.id + '-cbxDestCityName0').setValue("");

        Ext.getCmp(prototype.id + '-cbxOriCityCode1').bindStore(storeCity1);
        Ext.getCmp(prototype.id + '-cbxOriCityCode1').setValue("");
        Ext.getCmp(prototype.id + '-cbxOriCityName1').bindStore(storeCity2);
        Ext.getCmp(prototype.id + '-cbxOriCityName1').setValue("");
        Ext.getCmp(prototype.id + '-cbxDestCityCode1').bindStore(storeCity1);
        Ext.getCmp(prototype.id + '-cbxDestCityCode1').setValue("");
        Ext.getCmp(prototype.id + '-cbxDestCityName1').bindStore(storeCity2);
        Ext.getCmp(prototype.id + '-cbxDestCityName1').setValue("");




    }
    ,
    btnSearch_click: function(obj, e) {
        this.setGridData(obj, e);
    },
    setParams: function() {


        var IN_TFILTER = Ext.getCmp(prototype.id + '-cmbSearchType').getValue();
        var IN_SUBSCRIP = Ext.getCmp(prototype.id + '-txtIdSubscription').getValue();
        var IN_PRODUCT = Ext.getCmp(prototype.id + '-cbxProductCode').getValue();
        var IN_XMTTYPE = Ext.getCmp(prototype.id + '-cmbTransmissionType').getValue();
        var IN_DATEFILE = Ext.getCmp(prototype.id + '-cbxDateOfFileYear').getValue() +
                Ext.getCmp(prototype.id + '-cbxDateOfFileMonth').getValue() +
                Ext.getCmp(prototype.id + '-cbxDateOfFileDay').getValue();
        var IN_CXRCD = '';
        var IN_FARECLCD = '';
        var IN_ORIGCITY = '';
        var IN_DESTCITY = '';
        var IN_DI = '';
        var IN_TAREFFDATE = '';
        var IN_DATESDIS = Ext.getCmp(prototype.id + '-cbxLastDateYear').getValue() +
                Ext.getCmp(prototype.id + '-cbxLastDateMonth').getValue() +
                Ext.getCmp(prototype.id + '-cbxLastDateDay').getValue();


        switch (IN_TFILTER) {
            case '1':
                break;
            case '2':
                IN_CXRCD = Ext.getCmp(prototype.id + '-cbxCarrierCode').getValue();
                IN_FARECLCD = Ext.getCmp(prototype.id + '-txtFareClass').getValue();
                IN_ORIGCITY = Ext.getCmp(prototype.id + '-cbxOriCityCode').getValue();
                IN_DESTCITY = Ext.getCmp(prototype.id + '-cbxDestCityCode').getValue();
                IN_DI = Ext.getCmp(prototype.id + '-cbxDirectionalInd').getValue();
                IN_TAREFFDATE = Ext.getCmp(prototype.id + '-cbxTariffEffDateYear').getValue() +
                        Ext.getCmp(prototype.id + '-cbxTariffEffDateMonth').getValue() +
                        Ext.getCmp(prototype.id + '-cbxTariffEffDateDay').getValue();
                break;
            case '3':
                IN_CXRCD = Ext.getCmp(prototype.id + '-cbxCarrierCode0').getValue();
                IN_FARECLCD = Ext.getCmp(prototype.id + '-txtFareClass').getValue();
                IN_ORIGCITY = Ext.getCmp(prototype.id + '-cbxOriCityCode0').getValue();
                IN_DESTCITY = Ext.getCmp(prototype.id + '-cbxDestCityCode0').getValue();

                break;
            case '4':
                IN_CXRCD = Ext.getCmp(prototype.id + '-cbxCarrierCode1').getValue();
                IN_DI = Ext.getCmp(prototype.id + '-cbxDirectionalInd0').getValue();
                IN_ORIGCITY = Ext.getCmp(prototype.id + '-cbxOriCityCode1').getValue();
                IN_DESTCITY = Ext.getCmp(prototype.id + '-cbxDestCityCode1').getValue();
                IN_FARECLCD = Ext.getCmp(prototype.id + '-txtFareClass1').getValue();
                IN_TAREFFDATE = Ext.getCmp(prototype.id + '-cbxTariffEffDateYear0').getValue() +
                        Ext.getCmp(prototype.id + '-cbxTariffEffDateMonth0').getValue() +
                        Ext.getCmp(prototype.id + '-cbxTariffEffDateDay0').getValue();
                break;
        }



        searchParams = {
            IN_TFILTER: IN_TFILTER,
            IN_SUBSCRIP: IN_SUBSCRIP,
            IN_PRODUCT: IN_PRODUCT,
            IN_XMTTYPE: IN_XMTTYPE,
            IN_DATEFILE: IN_DATEFILE,
            IN_CXRCD: IN_CXRCD,
            IN_FARECLCD: IN_FARECLCD,
            IN_ORIGCITY: IN_ORIGCITY,
            IN_DESTCITY: IN_DESTCITY,
            IN_DI: IN_DI,
            IN_TAREFFDATE: IN_TAREFFDATE,
            IN_DATESDIS: IN_DATESDIS
        };

        console.log(searchParams);



    },
    setGridData: function(obj, val) {
        this.setParams();
        console.log("URL : " + prototype.url + '/search');
        var storeGridDatas = Ext.create('Ext.Praxis.store.sales.FareMasterFile.GridData', {
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
                    }
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridData').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
    },
    eventKey: function(e, eOpts) {

        if (eOpts.getKey() === 13) {
            this.btnSearch_click();
        }
    }
    ,
    btnClear_click: function(obj, e) {

        Ext.getCmp(prototype.id + '-txtIdSubscription').setValue();
        Ext.getCmp(prototype.id + '-txtFareClass').setValue();
        Ext.getCmp(prototype.id + '-txtFareClass0').setValue();
        Ext.getCmp(prototype.id + '-txtFareClass1').setValue();
        Ext.getCmp(prototype.id + '-cmbSearchType').setValue(1);
        Ext.getCmp(prototype.id + '-cbxProductCode').setValue("");
        Ext.getCmp(prototype.id + '-cmbTransmissionType').setValue("");
        Ext.getCmp(prototype.id + '-cbxDateOfFileYear').setValue(2013);
        Ext.getCmp(prototype.id + '-cbxDateOfFileMonth').setValue('0' + (this.fecha.getMonth() + 1));
        Ext.getCmp(prototype.id + '-cbxDateOfFileDay').setValue('01');

        //--------------------------------------------------------------------------




        Ext.getCmp(prototype.id + '-cbxCarrierCode').setValue("");
        Ext.getCmp(prototype.id + '-cbxCarrierName').setValue("");
        Ext.getCmp(prototype.id + '-cbxDirectionalInd').setValue("");
        Ext.getCmp(prototype.id + '-cbxTariffEffDateYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cbxTariffEffDateMonth').setValue('0' + (this.fecha.getMonth() + 1));
        Ext.getCmp(prototype.id + '-cbxTariffEffDateDay').setValue('01');
        Ext.getCmp(prototype.id + '-cbxCarrierCode0').setValue("");
        Ext.getCmp(prototype.id + '-cbxCarrierName0').setValue("");
        Ext.getCmp(prototype.id + '-cbxCarrierCode1').setValue("");
        Ext.getCmp(prototype.id + '-cbxCarrierName1').setValue("");
        Ext.getCmp(prototype.id + '-cbxDirectionalInd0').setValue("");
        Ext.getCmp(prototype.id + '-cbxTariffEffDateYear0').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cbxTariffEffDateMonth0').setValue('0' + (this.fecha.getMonth() + 1));
        Ext.getCmp(prototype.id + '-cbxTariffEffDateDay0').setValue('01');
        Ext.getCmp(prototype.id + '-cbxLastDateYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cbxLastDateMonth').setValue('0' + (this.fecha.getMonth() + 1));
        Ext.getCmp(prototype.id + '-cbxLastDateDay').setValue('01');


        Ext.getCmp(prototype.id + '-cbxOriCityCode').setValue("");
        Ext.getCmp(prototype.id + '-cbxOriCityName').setValue("");
        Ext.getCmp(prototype.id + '-cbxDestCityCode').setValue("");
        Ext.getCmp(prototype.id + '-cbxDestCityName').setValue("");
        Ext.getCmp(prototype.id + '-cbxOriCityCode0').setValue("");
        Ext.getCmp(prototype.id + '-cbxOriCityName0').setValue("");
        Ext.getCmp(prototype.id + '-cbxDestCityCode0').setValue("");
        Ext.getCmp(prototype.id + '-cbxDestCityName0').setValue("");
        Ext.getCmp(prototype.id + '-cbxOriCityCode1').setValue("");
        Ext.getCmp(prototype.id + '-cbxOriCityName1').setValue("");
        Ext.getCmp(prototype.id + '-cbxDestCityCode1').setValue("");
        Ext.getCmp(prototype.id + '-cbxDestCityName1').setValue("");


    },
    btnExcel_click: function(obj, e) {
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
    },
    exportExcel: function() {
        this.setParams();



        global.getFile(prototype.url + '/getXLSX?IN_TFILTER=' + searchParams.IN_TFILTER
                + '&IN_SUBSCRIP=' + searchParams.IN_SUBSCRIP
                + '&IN_PRODUCT=' + searchParams.IN_PRODUCT
                + '&IN_XMTTYPE=' + searchParams.IN_XMTTYPE
                + '&IN_DATEFILE=' + searchParams.IN_DATEFILE
                + '&IN_CXRCD=' + searchParams.IN_CXRCD
                + '&IN_FARECLCD=' + searchParams.IN_FARECLCD
                + '&IN_ORIGCITY=' + searchParams.IN_ORIGCITY
                + '&IN_DESTCITY=' + searchParams.IN_DESTCITY
                + '&IN_DI=' + searchParams.IN_DI
                + '&IN_TAREFFDATE=' + searchParams.IN_TAREFFDATE
                + '&IN_DATESDIS=' + searchParams.IN_DATESDIS
                );
    }
    ,
    btnFilter_click: function(obj) {
        var option = Ext.getCmp(prototype.id + '-contentFilter');
        if (option.isVisible()) {
            option.setVisible(false);
        } else {
            option.setVisible(true);
        }
    },
    /**
     * Metodos usados para el CRUD
     * */
    btnAdd_click: function(obj, e) {
        this.winDataEntry('I');
    },
    onEditClick: function(grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        var all = grid.getStore();
        this.winDataEntry('U', rec, all, rowIndex);
    },
    winDataEntry: function(action, rec, all, rowIndex) {
        action = action === null || action === undefined ? 'U' : action;
        rec = rec === null || rec === undefined ? {} : rec;
        all = all === null || all === undefined ? {} : all;
        rowIndex = rowIndex === null || rowIndex === undefined ? {} : rowIndex;

        Ext.create('Ext.Praxis.view.sales.Resolution024Form.DataEntry', {
            id: prototype.id + '-dataEntry',
            params: {
                action: action,
                rec: rec,
                all: all,
                rowIndex: rowIndex
            }
        }).show();

    },
    /*     
     * Funciones para la paginacion     
     */
    pagFirst: function(obj, e) {
        var pag = Ext.getCmp(prototype.id + '-paggin');
        var pagData = pag.getPageData();
        pag.moveFirst();
    },
    pagPrevious: function(obj, e) {
        var pag = Ext.getCmp(prototype.id + '-paggin');
        var pagData = pag.getPageData();
        pag.movePrevious();
    },
    pagNext: function(obj, e) {
        var pag = Ext.getCmp(prototype.id + '-paggin');
        var pagData = pag.getPageData();
        pag.moveNext();

    },
    pagLast: function(obj, e) {
        var pag = Ext.getCmp(prototype.id + '-paggin');
        var pagData = pag.getPageData();
        pag.moveLast();
    },
    btnBack_click: function(obj, e) {
        var heightMenu = 400;
        Ext.getCmp('App-main' + '-region-content-north').setHeight(heightMenu);
    }
});
