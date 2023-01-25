/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.sales.EMDDetail.EMDDetailController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.EMDDetailController',
    fecha: new Date(),
    paginActual: '',
    drillDown: [],
    gridActual: '',
    me: '',
    searchParams: {},
    paramsDetail: {},
    init: function (view) {
        prototype.id = 'EMDDetailForm';
        prototype.url = CONTEXTPATH + '/EMDDetail';
        me = this;
        this.control({
            // -------------------Eventos Genericos --------------------
            '#EMDDetailForm-xpanel': {
                afterrender: this.xpanel_afterrender
            },
            '#EMDDetailForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#EMDDetailForm-btnClear': {
                click: this.btnClear_click
            },
            '#EMDDetailForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#EMDDetailForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#EMDDetailForm-btnBack': {
                click: this.btnBack_click
            },
            '#EMDDetailForm-btnTxt': {
                click: this.btnTxt_click
            },
            '#EMDDetailForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#EMDDetailForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#EMDDetailForm-btn-pag-next': {
                click: this.pagNext
            },
            '#EMDDetailForm-btn-pag-last': {
                click: this.pagLast
            },
            //-----------------Eventos Especificos -------------------            

            '#EMDDetailForm-cmbOpcion': {
                change: this.changeCmbOpcion
            },
            '#EMDDetailForm-cmbSALES': {
                change: this.changeCmbSALES
            },
            '#EMDDetailForm-txtFilterCOUNTRY': {
                keyup: this.eventKey,
                change: this.onUpperValue
            },
            '#EMDDetailForm-txtFilterCHANNEL': {
                keyup: this.eventKey,
                change: this.onUpperValue
            },
            '#EMDDetailForm-txtFilterIATA': {
                keyup: this.eventKey,
                change: this.onUpperValue
            },
            '#EMDDetailForm-txtFilterGRUPO': {
                keyup: this.eventKey,
                change: this.onUpperValue
            },
            '#EMDDetailForm-txtFilterCONTABLE': {
                keyup: this.eventKey,
                change: this.onUpperValue
            }

        });
    },
    xpanel_afterrender: function (obj, e) {
        this.setStoreData();
//      this.btnSearch_click();
    },
    eventKey: function (e, eOpts) {
        if (eOpts.getKey() === 13) {
            this.btnSearch_click();
        }
    },
    onUpperValue: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    setStoreData: function () {
        var cmbOpcion = Ext.getCmp(prototype.id + '-cmbOpcion');
        cmbOpcion.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["1", "Accounting ID"],
                ["2", "Processing Date"],
                ["3", "Accounting Date"],
                ["4", "Sale Date"],
                ["5", "Group"]
            ]
        }));
        cmbOpcion.setValue("2");

        var cmbSALES = Ext.getCmp(prototype.id + '-cmbSALES');
        cmbSALES.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "All"],
                ["ARC", "ARC"],
                ["BSP", "BSP"],
                ["ASR", "ASR"],
                ["MAN", "MAN"]
            ]
        }));
        cmbSALES.setValue("");

        var cmbBANK = Ext.getCmp(prototype.id + '-cmbBANK');
        cmbBANK.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "All"],
                ["04", "IAP"],
                ["07", "IAR"],
                ["05", "ELW"]
            ]
        }));
        cmbBANK.setValue("");
    },
    changeCmbOpcion: function (obj, value) {
        this.clearFields();
        switch (value) {

            case '1':
                Ext.getCmp(prototype.id + '-txtFilterCONTABLE').show();

                Ext.getCmp(prototype.id + '-txtFilterGRUPO').hide();
                Ext.getCmp(prototype.id + '-txtFilterDateFrom').hide();
                Ext.getCmp(prototype.id + '-txtFilterDateTo').hide();
                Ext.getCmp(prototype.id + '-panelFilters2').hide();

                break;
            case '5':

                Ext.getCmp(prototype.id + '-txtFilterGRUPO').show();

                Ext.getCmp(prototype.id + '-txtFilterDateFrom').hide();
                Ext.getCmp(prototype.id + '-txtFilterDateTo').hide();
                Ext.getCmp(prototype.id + '-txtFilterCONTABLE').hide();
                Ext.getCmp(prototype.id + '-panelFilters2').hide();

                break;
            case '2':
            case '3':
            case '4':
                Ext.getCmp(prototype.id + '-panelFilters2').show();
                Ext.getCmp(prototype.id + '-txtFilterDateFrom').show();
                Ext.getCmp(prototype.id + '-txtFilterDateTo').show();

                Ext.getCmp(prototype.id + '-txtFilterCONTABLE').hide();
                Ext.getCmp(prototype.id + '-txtFilterGRUPO').hide();

                break;
        }
    },
    changeCmbSALES: function (obj, value) {
        switch (value) {
            case 'ARC':
                Ext.getCmp(prototype.id + '-cmbBANK').show();
                Ext.getCmp(prototype.id + '-txtFilterCOUNTRY').hide();
                Ext.getCmp(prototype.id + '-txtFilterCHANNEL').hide();
                Ext.getCmp(prototype.id + '-txtFilterIATA').hide();

                break;
            case 'BSP':
                Ext.getCmp(prototype.id + '-cmbBANK').hide();
                Ext.getCmp(prototype.id + '-txtFilterCOUNTRY').show();
                Ext.getCmp(prototype.id + '-txtFilterCHANNEL').hide();
                Ext.getCmp(prototype.id + '-txtFilterIATA').hide();


                break;
            case 'ASR':
                Ext.getCmp(prototype.id + '-cmbBANK').hide();
                Ext.getCmp(prototype.id + '-txtFilterCOUNTRY').hide();
                Ext.getCmp(prototype.id + '-txtFilterCHANNEL').show();
                Ext.getCmp(prototype.id + '-txtFilterIATA').show();


                break;
            case 'MAN':
                Ext.getCmp(prototype.id + '-cmbBANK').hide();
                Ext.getCmp(prototype.id + '-txtFilterCOUNTRY').show();
                Ext.getCmp(prototype.id + '-txtFilterCHANNEL').hide();
                Ext.getCmp(prototype.id + '-txtFilterIATA').hide();


                break;
            default:
                Ext.getCmp(prototype.id + '-cmbBANK').hide();
                Ext.getCmp(prototype.id + '-txtFilterCOUNTRY').hide();
                Ext.getCmp(prototype.id + '-txtFilterCHANNEL').hide();
                Ext.getCmp(prototype.id + '-txtFilterIATA').hide();

        }
    },
    btnSearch_click: function (obj, e) {
        //this.setFormatParameter();
        this.setGridData(obj, e);
    },
    setFormatParameter: function () {

        var Opcion = Ext.getCmp(prototype.id + '-cmbOpcion').getValue();
        var SALES = Ext.getCmp(prototype.id + '-cmbSALES').getValue();
        var BANK = Ext.getCmp(prototype.id + '-cmbBANK').getValue();

        var CONTABLE = Ext.getCmp(prototype.id + '-txtFilterCONTABLE').getValue();
        var GRUPO = Ext.getCmp(prototype.id + '-txtFilterGRUPO').getValue();
        var DateFrom = Ext.util.Format.date(Ext.getCmp(prototype.id + '-txtFilterDateFrom').getValue(), 'Ymd');
        var DateTo = Ext.util.Format.date(Ext.getCmp(prototype.id + '-txtFilterDateTo').getValue(), 'Ymd');
        var COUNTRY = Ext.getCmp(prototype.id + '-txtFilterCOUNTRY').getValue();
        var CHANNEL = Ext.getCmp(prototype.id + '-txtFilterCHANNEL').getValue();
        var IATA = Ext.getCmp(prototype.id + '-txtFilterIATA').getValue();
        var txtFilterRFIC = Ext.getCmp(prototype.id + '-txtFilterRFIC').getValue();
        var txtFilterServiceCode = Ext.getCmp(prototype.id + '-txtFilterServiceCode').getValue();


        searchParams = {
            Opcion: Opcion,
            SALES: SALES,
            BANK: BANK,
            CONTABLE: CONTABLE,
            GRUPO: GRUPO,
            DateFrom: DateFrom,
            DateTo: DateTo,
            COUNTRY: COUNTRY,
            CHANNEL: CHANNEL,
            IATA: IATA,
            RFIC: txtFilterRFIC,
            ServiceCode: txtFilterServiceCode
        };
        console.log(searchParams);
    },
    setGridData: function (obj, val) {
        win.lblUser_toolTip("Estructura: A1530");
        this.setFormatParameter();
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({
                msg: msj
            });
        } else {

            var storeGridDatas = Ext.create('Ext.Praxis.store.sales.GridData', {
                proxy: {
                    url: prototype.url + '/search'
                }, listeners: {
                    beforeload: function (obj) {
                        obj.proxy.extraParams = searchParams;
                    },
                    load: function (obj) {
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
            global.clear();
            Ext.getCmp(prototype.id + '-gridData').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
        }
    },
    validateFields: function () {
        var opt = searchParams.Opcion;
        var msj = '';
        switch (opt) {
            case '1':
                if (searchParams.CONTABLE.trim() === '') {
                    msj = 'Enter CONTABLE';
                }
                break;
            case '5':
                if (searchParams.GRUPO.trim() === '') {
                    msj = 'Enter GROUP';
                }
                break;
            case '2':
            case '3':
            case '4':
                if (searchParams.DateFrom.trim() === '') {
                    msj = 'Enter DATE FROM';
                }
                break;
        }
        return msj;
    },
    btnBack_click: function (obj, e) {
        global.showMenu();
    },
    btnClear_click: function (obj, e) {
        Ext.getCmp(prototype.id + '-cmbOpcion').setValue('2');
        Ext.getCmp(prototype.id + '-cmbContrytax').setValue('1');
        Ext.getCmp(prototype.id + '-cmbSALES').setValue('');
        Ext.getCmp(prototype.id + '-cmbBANK').setValue('');

        Ext.getCmp(prototype.id + '-txtFilterCONTABLE').setValue('');
        Ext.getCmp(prototype.id + '-txtFilterGRUPO').setValue('');
        Ext.getCmp(prototype.id + '-txtFilterDateFrom').setValue('');
        Ext.getCmp(prototype.id + '-txtFilterDateTo').setValue('');
        Ext.getCmp(prototype.id + '-txtFilterCOUNTRY').setValue('');
        Ext.getCmp(prototype.id + '-txtFilterCHANNEL').setValue('');
        Ext.getCmp(prototype.id + '-txtFilterIATA').setValue('');


    },
    clearFields: function () {
        Ext.getCmp(prototype.id + '-cmbSALES').setValue('');
        Ext.getCmp(prototype.id + '-cmbBANK').setValue('');
        Ext.getCmp(prototype.id + '-txtFilterCONTABLE').setValue('');
        Ext.getCmp(prototype.id + '-txtFilterGRUPO').setValue('');
        Ext.getCmp(prototype.id + '-txtFilterDateFrom').setValue('');
        Ext.getCmp(prototype.id + '-txtFilterDateTo').setValue('');
        Ext.getCmp(prototype.id + '-txtFilterCOUNTRY').setValue('');
        Ext.getCmp(prototype.id + '-txtFilterCHANNEL').setValue('');
        Ext.getCmp(prototype.id + '-txtFilterIATA').setValue('');

    },
    btnExcel_click: function (obj, e) {

        this.setFormatParameter();
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({
                msg: msj
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
        this.setFormatParameter();
        global.getFile(prototype.url + '/getXLSX?Opcion=' + searchParams.Opcion
                + '&SALES=' + searchParams.SALES
                + '&BANK=' + searchParams.BANK
                + '&GRUPO=' + searchParams.GRUPO
                + '&CONTABLE=' + searchParams.CONTABLE
                + '&DateFrom=' + searchParams.DateFrom
                + '&DateTo=' + searchParams.DateTo
                + '&COUNTRY=' + searchParams.COUNTRY
                + '&CHANNEL=' + searchParams.CHANNEL
                + '&IATA=' + searchParams.IATA
                + '&RFIC=' + searchParams.RFIC
                + '&ServiceCode=' + searchParams.ServiceCode
                );
    },
    btnFilter_click: function (obj) {
        var option = Ext.getCmp(prototype.id + '-contentFilter');
        if (option.isVisible()) {
            option.setVisible(false);
        } else {
            option.setVisible(true);
        }
    },
    btnTxt_click: function () {
        this.setFormatParameter();
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({
                msg: msj
            });
        } else {
            global.getFile(prototype.url + '/getFileTxt?Opcion=' + searchParams.Opcion
                    + '&SALES=' + searchParams.SALES
                    + '&BANK=' + searchParams.BANK
                    + '&GRUPO=' + searchParams.GRUPO
                    + '&CONTABLE=' + searchParams.CONTABLE
                    + '&DateFrom=' + searchParams.DateFrom
                    + '&DateTo=' + searchParams.DateTo
                    + '&COUNTRY=' + searchParams.COUNTRY
                    + '&CHANNEL=' + searchParams.CHANNEL
                    + '&IATA=' + searchParams.IATA
                    + '&RFIC=' + searchParams.RFIC
                    + '&ServiceCode=' + searchParams.ServiceCode
                    );
        }
    },
    /*     
     * Funciones para la paginacion     
     */
    pagFirst: function (obj, e) {
        var pag = Ext.getCmp(prototype.id + '-paggin');
        var pagData = pag.getPageData();
        pag.moveFirst();
    },
    pagPrevious: function (obj, e) {
        var pag = Ext.getCmp(prototype.id + '-paggin');
        var pagData = pag.getPageData();
        pag.movePrevious();
    },
    pagNext: function (obj, e) {
        var pag = Ext.getCmp(prototype.id + '-paggin');
        var pagData = pag.getPageData();
        pag.moveNext();
    },
    pagLast: function (obj, e) {
        var pag = Ext.getCmp(prototype.id + '-paggin');
        var pagData = pag.getPageData();
        pag.moveLast();
    }



});
