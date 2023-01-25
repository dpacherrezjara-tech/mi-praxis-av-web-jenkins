/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.sales.TAXDetail.TAXDetailController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.TAXDetailController',
    fecha: new Date(),
    paginActual: '',
    drillDown: [],
    gridActual: '',
    me: '',
    searchParams: {},
    paramsDetail: {},
    init: function(view) {
        prototype.id = 'TAXDetailForm';
        prototype.url = CONTEXTPATH + '/TAXDetail';
        me = this;
        this.control({
            // -------------------Eventos Genericos --------------------
            '#TAXDetailForm-xpanel': {
                afterrender: this.xpanel_afterrender
            },
            '#TAXDetailForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#TAXDetailForm-btnClear': {
                click: this.btnClear_click
            },
            '#TAXDetailForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#TAXDetailForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#TAXDetailForm-btnBack': {
                click: this.btnBack_click
            },
            '#TAXDetailForm-btnSend': {
                click: this.btnSend_click
            },
            '#TAXDetailForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#TAXDetailForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#TAXDetailForm-btn-pag-next': {
                click: this.pagNext
            },
            '#TAXDetailForm-btn-pag-last': {
                click: this.pagLast
            },
            //-----------------Eventos Especificos -------------------            

            '#TAXDetailForm-cmbOpcion': {
                change: this.changeCmbOpcion
            },
            '#TAXDetailForm-cmbContrytax': {
                change: this.changeCmbContrytax
            },
            '#TAXDetailForm-cmbSALES': {
                change: this.changeCmbSALES
            },
            '#TAXDetailForm-txtFilterCOUNTRY': {
                keyup: this.eventKey,
                change: this.onUpperValue
            },
            '#TAXDetailForm-txtFilterCHANNEL': {
                keyup: this.eventKey,
                change: this.onUpperValue
            },
            '#TAXDetailForm-txtFilterTax': {
                keyup: this.eventKey,
                change: this.onUpperValue
            },
            '#TAXDetailForm-txtFilterIATA': {
                keyup: this.eventKey,
                change: this.onUpperValue
            },
            '#TAXDetailForm-txtFilterCurrency': {
                keyup: this.eventKey,
                change: this.onUpperValue
            },
            '#TAXDetailForm-txtFilterContryTax': {
                keyup: this.eventKey,
                change: this.onUpperValue
            }
        });
    },
    xpanel_afterrender: function(obj, e) {
        this.setStoreData();
//        this.btnSearch_click();
    },
    eventKey: function(e, eOpts) {
        if (eOpts.getKey() === 13) {
            this.btnSearch_click();
        }
    },
    onUpperValue: function(field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    setStoreData: function() {
        var cmbOpcion = Ext.getCmp(prototype.id + '-cmbOpcion');
        cmbOpcion.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["1", "Accounting ID"],
                ["2", "Processing Date"],
                ["3", "Accounting Date"],
               // ["4", "Sale Date"],
                ["5", "Group"]
            ]
        }));
        cmbOpcion.setValue("2");

        var cmbContrytax = Ext.getCmp(prototype.id + '-cmbContrytax');
        cmbContrytax.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["1", "By Source"],
                ["2", "By Country"]
            ]
        }));
        cmbContrytax.setValue("1");

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
    changeCmbOpcion: function(obj, value) {

        switch (value) {
            case '1':
                Ext.getCmp(prototype.id + '-txtFilterCONTABLE').show();
                Ext.getCmp(prototype.id + '-txtFilterTax').show();

                Ext.getCmp(prototype.id + '-txtFilterGRUPO').hide();
                Ext.getCmp(prototype.id + '-txtFilterDateFrom').hide();
                Ext.getCmp(prototype.id + '-txtFilterDateTo').hide();
                // Ext.getCmp(prototype.id + '-txtTotalRev').hide();
                Ext.getCmp(prototype.id + '-panelFilters2').hide();

                break;
            case '5':
                Ext.getCmp(prototype.id + '-txtFilterTax').show();
                Ext.getCmp(prototype.id + '-txtFilterGRUPO').show();

                Ext.getCmp(prototype.id + '-txtFilterDateFrom').hide();
                Ext.getCmp(prototype.id + '-txtFilterDateTo').hide();
                // Ext.getCmp(prototype.id + '-txtTotalRev').hide();
                Ext.getCmp(prototype.id + '-txtFilterCONTABLE').hide();
                Ext.getCmp(prototype.id + '-panelFilters2').hide();

                break;
            case '2':
            case '3':
            case '4':
                Ext.getCmp(prototype.id + '-panelFilters2').show();
                Ext.getCmp(prototype.id + '-txtFilterDateFrom').show();
                Ext.getCmp(prototype.id + '-txtFilterDateTo').show();
                Ext.getCmp(prototype.id + '-txtFilterTax').show();

                Ext.getCmp(prototype.id + '-txtFilterCONTABLE').hide();
                Ext.getCmp(prototype.id + '-txtFilterGRUPO').hide();
                // Ext.getCmp(prototype.id + '-txtTotalRev').hide();
                break;
        }
    },
    changeCmbContrytax: function(obj, value) {
        switch (value) {
            case '1':
                Ext.getCmp(prototype.id + '-cmbSALES').show();
                Ext.getCmp(prototype.id + '-cmbBANK').show();
                Ext.getCmp(prototype.id + '-txtFilterCOUNTRY').show();
                Ext.getCmp(prototype.id + '-txtFilterCHANNEL').show();
                Ext.getCmp(prototype.id + '-txtFilterIATA').show();
                Ext.getCmp(prototype.id + '-txtFilterCurrency').show();
                Ext.getCmp(prototype.id + '-txtFilterContryTax').hide();
                Ext.getCmp(prototype.id + '-cmbSALES').setValue('');
                this.changeCmbSALES(obj, '');

                break;
            case '2':
                Ext.getCmp(prototype.id + '-txtFilterContryTax').show();
                Ext.getCmp(prototype.id + '-cmbSALES').hide();
                Ext.getCmp(prototype.id + '-cmbBANK').hide();
                Ext.getCmp(prototype.id + '-txtFilterCOUNTRY').hide();
                Ext.getCmp(prototype.id + '-txtFilterCHANNEL').hide();
                Ext.getCmp(prototype.id + '-txtFilterIATA').hide();
                Ext.getCmp(prototype.id + '-txtFilterCurrency').hide();

                break;
        }
    },
    changeCmbSALES: function(obj, value) {
        switch (value) {
            case 'ARC':
                Ext.getCmp(prototype.id + '-cmbBANK').show();
                Ext.getCmp(prototype.id + '-txtFilterCOUNTRY').hide();
                Ext.getCmp(prototype.id + '-txtFilterCHANNEL').hide();
                Ext.getCmp(prototype.id + '-txtFilterIATA').hide();
                Ext.getCmp(prototype.id + '-txtFilterCurrency').show();
                break;
            case 'BSP':
                Ext.getCmp(prototype.id + '-cmbBANK').hide();
                Ext.getCmp(prototype.id + '-txtFilterCOUNTRY').show();
                Ext.getCmp(prototype.id + '-txtFilterCHANNEL').hide();
                Ext.getCmp(prototype.id + '-txtFilterIATA').hide();
                Ext.getCmp(prototype.id + '-txtFilterCurrency').show();

                break;
            case 'ASR':
                Ext.getCmp(prototype.id + '-cmbBANK').hide();
                Ext.getCmp(prototype.id + '-txtFilterCOUNTRY').hide();
                Ext.getCmp(prototype.id + '-txtFilterCHANNEL').show();
                Ext.getCmp(prototype.id + '-txtFilterIATA').show();
                Ext.getCmp(prototype.id + '-txtFilterCurrency').show();

                break;
            case 'MAN':
                Ext.getCmp(prototype.id + '-cmbBANK').hide();
                Ext.getCmp(prototype.id + '-txtFilterCOUNTRY').show();
                Ext.getCmp(prototype.id + '-txtFilterCHANNEL').hide();
                Ext.getCmp(prototype.id + '-txtFilterIATA').hide();
                Ext.getCmp(prototype.id + '-txtFilterCurrency').show();

                break;
            default:
                Ext.getCmp(prototype.id + '-cmbBANK').hide();
                Ext.getCmp(prototype.id + '-txtFilterCOUNTRY').hide();
                Ext.getCmp(prototype.id + '-txtFilterCHANNEL').hide();
                Ext.getCmp(prototype.id + '-txtFilterIATA').hide();
                Ext.getCmp(prototype.id + '-txtFilterCurrency').show();

        }
    },
    btnSearch_click: function(obj, e) {
        //this.setFormatParameter();
        this.setGridData(obj, e);
    },
    setFormatParameter: function() {

        var Opcion = Ext.getCmp(prototype.id + '-cmbOpcion').getValue();
        var SALES = Ext.getCmp(prototype.id + '-cmbSALES').getValue();
        var BANK = Ext.getCmp(prototype.id + '-cmbBANK').getValue();
        var Tax = Ext.getCmp(prototype.id + '-txtFilterTax').getValue();
        var CONTABLE = Ext.getCmp(prototype.id + '-txtFilterCONTABLE').getValue();
        var GRUPO = Ext.getCmp(prototype.id + '-txtFilterGRUPO').getValue();
        var DateFrom = Ext.util.Format.date(Ext.getCmp(prototype.id + '-txtFilterDateFrom').getValue(), 'Ymd');
        var DateTo = Ext.util.Format.date(Ext.getCmp(prototype.id + '-txtFilterDateTo').getValue(), 'Ymd');
        var COUNTRY = Ext.getCmp(prototype.id + '-txtFilterCOUNTRY').getValue();
        var CHANNEL = Ext.getCmp(prototype.id + '-txtFilterCHANNEL').getValue();
        var IATA = Ext.getCmp(prototype.id + '-txtFilterIATA').getValue();
        var Currency = Ext.getCmp(prototype.id + '-txtFilterCurrency').getValue();
        var COUNTRYTAX = Ext.getCmp(prototype.id + '-txtFilterContryTax').getValue();

        searchParams = {
            Opcion: Opcion,
            SALES: SALES,
            BANK: BANK,
            Tax: Tax,
            CONTABLE: CONTABLE,
            GRUPO: GRUPO,
            DateFrom: DateFrom,
            DateTo: DateTo,
            COUNTRY: COUNTRY,
            CHANNEL: CHANNEL,
            IATA: IATA,
            Currency: Currency,
            COUNTRYTAX: COUNTRYTAX
        };
       // console.log(searchParams);
    },
    setGridData: function(obj, val) {
        win.lblUser_toolTip("Estructura: A1530");
        Ext.getCmp(prototype.id + '-txtTotalRev').hide();
        Ext.getCmp(prototype.id + '-txtTotalLoc').hide();
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
                        } else {
                            var data = obj.data.items[0].data;
                            /*if (Ext.getCmp(prototype.id + '-txtFilterGRUPO').getValue() !== '') {
                                Ext.getCmp(prototype.id + '-txtTotalLoc').show();
                                Ext.getCmp(prototype.id + '-txtTotalLoc').setValue(Ext.util.Format.number(data.TOTAL_LOC, '0,000.00'));
                            }
                            Ext.getCmp(prototype.id + '-txtTotalRev').show();
                            Ext.getCmp(prototype.id + '-txtTotalRev').setValue(Ext.util.Format.number(data.TOTAL_REV, '0,000.00'));*/
                        }
                    }
                }
            });
            global.clear();
            Ext.getCmp(prototype.id + '-gridData').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
        }
    },
    validateFields: function() {
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
                if (searchParams.Tax.trim() === '') {
                    msj = 'Enter Tax';
                }
                break;
        }
        return msj;
    },
    btnBack_click: function(obj, e) {
        global.showMenu();
    },
    btnClear_click: function(obj, e) {
        Ext.getCmp(prototype.id + '-cmbOpcion').setValue('2');
        Ext.getCmp(prototype.id + '-cmbContrytax').setValue('1');
        Ext.getCmp(prototype.id + '-cmbSALES').setValue('');
        Ext.getCmp(prototype.id + '-cmbBANK').setValue('');
        Ext.getCmp(prototype.id + '-txtFilterTax').setValue('');
        Ext.getCmp(prototype.id + '-txtFilterCONTABLE').setValue('');
        Ext.getCmp(prototype.id + '-txtFilterGRUPO').setValue('');
        Ext.getCmp(prototype.id + '-txtFilterDateFrom').setValue('');
        Ext.getCmp(prototype.id + '-txtFilterDateTo').setValue('');
        Ext.getCmp(prototype.id + '-txtFilterCOUNTRY').setValue('');
        Ext.getCmp(prototype.id + '-txtFilterCHANNEL').setValue('');
        Ext.getCmp(prototype.id + '-txtFilterIATA').setValue('');
        Ext.getCmp(prototype.id + '-txtFilterCurrency').setValue('');
        Ext.getCmp(prototype.id + '-txtFilterContryTax').setValue('');
    },
    btnExcel_click: function(obj, e) {
        
        this.setFormatParameter();
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({
                msg: msj
            });
        } else {
            Ext.create('Ext.Praxis.view.sales.TAXDetailForm.DataEntry', {
                id: prototype.id + '-dataEntry',
                params: {
                    searchParams: searchParams
                }
            }).show();
        }
        
        
//        Ext.Msg.show({
//            title: '.:PRAXIS:.',
//            msg: 'Download Excel ?',
//            buttons: Ext.MessageBox.OKCANCEL,
//            scope: this,
//            icon: Ext.MessageBox.QUESTION,
//            modal: true,
//            fn: function(btn) {
//                if (btn === 'ok') {
//                    this.exportExcel();
//                }
//            }
//        });
    },
    exportExcel: function() {
        this.setFormatParameter();
        global.getFile(prototype.url + '/getXLSX?Opcion=' + searchParams.Opcion
                + '&SALES=' + searchParams.SALES
                + '&BANK=' + searchParams.BANK
                + '&Tax=' + searchParams.Tax
                + '&CONTABLE=' + searchParams.CONTABLE
                + '&DateFrom=' + searchParams.DateFrom
                + '&DateTo=' + searchParams.DateTo
                + '&COUNTRY=' + searchParams.COUNTRY
                + '&CHANNEL=' + searchParams.CHANNEL
                + '&IATA=' + searchParams.IATA
                + '&Currency=' + searchParams.Currency
                + '&COUNTRYTAX=' + searchParams.COUNTRYTAX
                );
    },
    btnFilter_click: function(obj) {
        var option = Ext.getCmp(prototype.id + '-contentFilter');
        if (option.isVisible()) {
            option.setVisible(false);
        } else {
            option.setVisible(true);
        }
    },
    btnSend_click: function() {
        this.setFormatParameter();
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({
                msg: msj
            });
        } else {
            Ext.create('Ext.Praxis.view.sales.TAXDetailForm.DataEntry', {
                id: prototype.id + '-dataEntry',
                params: {
                    searchParams: searchParams
                }
            }).show();
        }
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
    }



});
