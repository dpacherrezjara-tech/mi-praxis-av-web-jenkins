/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.sales.SalesReport.SalesReportController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.SalesReportController',
    fecha: new Date(),
    drillDown: [],
    gridActual: '',
    me: '',
    searchParams: {},
    bean: {},
    init: function (view) {
        // prototype.id = 'SalesReportForm';
        // prototype.url = CONTEXTPATH + '/SalesReport';
        // me = this;
        // this.control({
        //     // -------------------Eventos Genericos --------------------
        //     '#SalesReportForm-xpanel': {
        //         afterrender: this.xpanel_afterrender
        //     },
        //     '#SalesReportForm-btnSearch': {
        //         click: this.btnSearch_click ----
        //     },
        //     '#SalesReportForm-btnClear': {
        //         click: this.btnClear_click
        //     },
        //     '#SalesReportForm-btnExcel': {
        //         click: this.btnExcel_click
        //     },
        //     '#SalesReportForm-btnAdd': {
        //         click: this.btnAdd_click
        //     },
        //     '#SalesReportForm-btnFilter': {
        //         click: this.btnFilter_click
        //     },
        //     '#SalesReportForm-btnBack': {
        //         click: this.btnBack_click
        //     },
        //     '#SalesReportForm-btn-pag-first': {
        //         click: this.pagFirst
        //     },
        //     '#SalesReportForm-btn-pag-previous': {
        //         click: this.pagPrevious
        //     },
        //     '#SalesReportForm-btn-pag-next': {
        //         click: this.pagNext
        //     },
        //     '#SalesReportForm-btn-pag-last': {
        //         click: this.pagLast
        //     },
        //     //-----------------Eventos Especificos -------------------           
        //     '#SalesReportForm-cmbDate': {
        //         change: this.onChangeCmbDate
        //     },
        //     '#SalesReportForm-cmbSource': {
        //         change: this.onChangeCmbSource
        //     },
        //     '#SalesReportForm-txtCountry': {
        //         change: this.onUpperValue
        //     },
        //     '#SalesReportForm-txtCurrency': {
        //         change: this.onUpperValue
        //     }
        // });

    },

    onPagingBeforeChange01: function (obj, page, opts) {
        obj.store.proxy.extraParams = this.bean;
    },

    OnBeforeShow: function () {
        prototype.id = 'SalesReportForm';
        prototype.idGr = 'DataEntryGrupo';
        prototype.widthContenedor = 1366;
        prototype.heightContenedor = 768;
        prototype.idRfnd = 'SalesReportFormRfnd';
        prototype.idAdm = 'SalesReportFormAdm';
        prototype.idSale = 'SalesReportFormSale';
        prototype.idRfndFOP = 'SalesReportFormRfndFOP';
        prototype.idRfndTAX = 'SalesReportFormRfndTAX';
        prototype.idRfndTAXCOMM = 'SalesReportFormRfndTAXCOMM';
        prototype.idRfndFareCalc = 'SalesReportFormRfndFareCalc';
        prototype.idRfndCOMM = 'SalesReportFormRfndCOMM';
        prototype.iderr = 'DataEntryError';
        prototype.ideterr = 'DataDetailEntryError';
        prototype.url = CONTEXTPATH + '/SalesReport';
    },

    afterRender: function (obj, e) {
        console.log('Afterrender');
        this.setStoreData();

        Ext.getCmp(prototype.id + '-paggin').getCmpPaginator().on('beforechange', me.onPagingBeforeChange01, this);
        this.btnSearch_click();
    },
    onUpperValue: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    eventKey: function (e, eOpts) {
        if (eOpts.getKey() === 13) {
            this.btnSearch_click();
        }
    },
    setStoreData: function () {
        Ext.getCmp(prototype.id + '-cmbDateYear').bindStore(win.getStoreYear(false));
        Ext.getCmp(prototype.id + '-cmbDateMonth').bindStore(win.getStoreMonth(true));
        Ext.getCmp(prototype.id + '-cmbDateDay').bindStore(win.getStoreDays(true));

        Ext.getCmp(prototype.id + '-cmbDateYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateMonth').setValue("");
        Ext.getCmp(prototype.id + '-cmbDateDay').setValue("");

        var cmbDate = Ext.getCmp(prototype.id + '-cmbDate');
        var cmbSource = Ext.getCmp(prototype.id + '-cmbSource');
        var cmbBanco = Ext.getCmp(prototype.id + '-cmbBanco');
        var cmbStatus = Ext.getCmp(prototype.id + '-cmbStatus');

        cmbDate.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: true,
            fields: ['code', 'name'],
            data: [
                ["", "Select"],
                ["1", "Processing Date"],
                ["5", "Ending From"],
                ["2", "Ending To"],
                ["3", "Group"],
                ["4", "File Id"],
                ["6", "Ticket"]
            ]
        }));
        cmbDate.setValue("1");

        cmbSource.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: true,
            fields: ['code', 'name'],
            data: [
                ["", "Select"],
                ["BSP", "BSP"],
                ["ARC", "ARC"],
                ["ASR", "ASR"],
                ["MAN", "MAN"]
            ]
        }));
        cmbSource.setValue("BSP");

        cmbBanco.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: true,
            fields: ['code', 'name'],
            data: [
                ["", "All"],
                ["04", "IAP (04)"],
                ["05", "ELW (05)"],
                ["07", "IAR (07)"]

            ]
        }));
        cmbBanco.setValue("");

        cmbStatus.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: true,
            fields: ['code', 'name'],
            data: [
                ["", "All"],
                ["0", "OPEN"],
                ["1", "CLOSED"]

            ]
        }));
        cmbStatus.setValue("");

    },
    hideComponents: function () {
        Ext.getCmp(prototype.id + '-labelSource').hide();
        Ext.getCmp(prototype.id + '-labelSource2').hide();
        Ext.getCmp(prototype.id + '-cmbDateYear').hide();
        Ext.getCmp(prototype.id + '-cmbDateMonth').hide();
        Ext.getCmp(prototype.id + '-cmbDateDay').hide();
        Ext.getCmp(prototype.id + '-cmbSource').hide();
        Ext.getCmp(prototype.id + '-txtCountry').hide();
        Ext.getCmp(prototype.id + '-cmbBanco').hide();
        Ext.getCmp(prototype.id + '-txtCurrency').hide();
        Ext.getCmp(prototype.id + '-txtIata').hide();
        Ext.getCmp(prototype.id + '-cmbStatus').hide();
        Ext.getCmp(prototype.id + '-txtGroup').hide();
        Ext.getCmp(prototype.id + '-txtIdFil').hide();
        Ext.getCmp(prototype.id + '-txtCia').hide();
        Ext.getCmp(prototype.id + '-txtTicket').hide();
    },
    onFocus: function (id) {
        Ext.getCmp(prototype.id + id).focus();
    },
    onChangeCmbDate: function (obj, value) {
        this.hideComponents();
        this.btnClear_click(null, value);
        switch (value) {
            case '1':
            case '2':
            case '5':
                Ext.getCmp(prototype.id + '-cmbDateYear').show();
                Ext.getCmp(prototype.id + '-cmbDateMonth').show();
                Ext.getCmp(prototype.id + '-cmbDateDay').show();
                Ext.getCmp(prototype.id + '-cmbSource').show();
                Ext.getCmp(prototype.id + '-labelSource').show();
                Ext.getCmp(prototype.id + '-labelSource2').show();
                Ext.getCmp(prototype.id + '-cmbSource').setValue("BSP");
                this.onChangeCmbSource(null, 'BSP');
                break;
            case '3':
                Ext.getCmp(prototype.id + '-txtGroup').show();
                this.onFocus('-txtGroup');
                break;
            case '4':
                Ext.getCmp(prototype.id + '-txtIdFil').show();
                this.onFocus('-txtIdFil');
                break;
            case '6':
                Ext.getCmp(prototype.id + '-txtCia').show();
                Ext.getCmp(prototype.id + '-txtTicket').show();
                Ext.getCmp(prototype.id + '-txtCia').setValue('139');
                this.onFocus('-txtTicket');
                break;
        }
    },
    onChangeCmbSource: function (obj, value) {
        switch (value) {
            case 'BSP':
            case 'ASR':
            case 'MAN':
                Ext.getCmp(prototype.id + '-txtCountry').show();
                Ext.getCmp(prototype.id + '-cmbBanco').hide();
                Ext.getCmp(prototype.id + '-txtCurrency').show();
                Ext.getCmp(prototype.id + '-txtIata').show();
                Ext.getCmp(prototype.id + '-cmbStatus').show();
                break;
            case 'ARC':
                Ext.getCmp(prototype.id + '-txtCountry').hide();
                Ext.getCmp(prototype.id + '-cmbBanco').show();
                Ext.getCmp(prototype.id + '-txtCurrency').hide();
                Ext.getCmp(prototype.id + '-txtIata').hide();
                Ext.getCmp(prototype.id + '-cmbStatus').show();
                break;
            default:
                Ext.getCmp(prototype.id + '-txtCountry').hide();
                Ext.getCmp(prototype.id + '-cmbBanco').hide();
                Ext.getCmp(prototype.id + '-txtCurrency').hide();
                Ext.getCmp(prototype.id + '-txtIata').hide();
                Ext.getCmp(prototype.id + '-cmbStatus').hide();
                break;
        }
    },
    btnSearch_click: function (obj, e) {
        this.setFormatParameter();
        this.setGridData(obj, e);
    },
    setFormatParameter: function () {
        var AIRLINE = '139';
        var CIUVT = '';
        var year = Ext.getCmp(prototype.id + '-cmbDateYear').getValue();
        var month = Ext.getCmp(prototype.id + '-cmbDateMonth').getValue();
        var day = Ext.getCmp(prototype.id + '-cmbDateDay').getValue();
        if (year === null || year === '') {
            Ext.getCmp(prototype.id + '-cmbDateYear').setValue(this.fecha.getFullYear());
            year = '' + this.fecha.getFullYear();
        }
        if (month === null || month === '') {
            month = '';
        }
        if (day === null || day === '') {
            day = '';
        }
        var FECHARPT = year + month + day;
        var FUENTE = Ext.getCmp(prototype.id + '-cmbSource').getValue();
        var PAIS = Ext.getCmp(prototype.id + '-txtCountry').getValue();
        var BANCO = Ext.getCmp(prototype.id + '-cmbBanco').getValue();
        var STPRO = Ext.getCmp(prototype.id + '-cmbStatus').getValue();
        var MONEDA = Ext.getCmp(prototype.id + '-txtCurrency').getValue();
        var FLAG = Ext.getCmp(prototype.id + '-cmbDate').getValue();
        var GRUPO = Ext.getCmp(prototype.id + '-txtGroup').getValue();
        var IATA = Ext.getCmp(prototype.id + '-txtIata').getValue();
        var TKT = Ext.getCmp(prototype.id + '-txtCia').getValue() + Ext.getCmp(prototype.id + '-txtTicket').getValue();
        if (FLAG === '4') {
            GRUPO = Ext.getCmp(prototype.id + '-txtIdFil').getValue();
        }

        searchParams = {
            AIRLINE: AIRLINE,
            CIUVT: CIUVT,
            FECHARPT: FECHARPT,
            FUENTE: FUENTE,
            PAIS: PAIS,
            BANCO: BANCO,
            STPRO: STPRO,
            MONEDA: MONEDA,
            FLAG: FLAG,
            GRUPO: GRUPO,
            IATA: IATA,
            TKT: TKT
        };
        //console.log(searchParams);
    },
    validateFields: function () {
        var opt = searchParams.FLAG;
        var msj = '';
        switch (opt) {
            case '1':
            case '2':
            case '5':
                if (searchParams.FUENTE.trim() === '') {
                    msj = 'Enter the required fields';
                }
                break;
            case '3':
                break;
            case '4':
                if (searchParams.GRUPO.trim() === '') {
                    msj = 'Enter IDFIL';
                }
                break;
            case '6':
                if (searchParams.TKT.length < 13) {
                    msj = 'Enter a Valid Ticket';
                }
                break;
            default:
                msj = 'Enter the required fields';

        }
        return msj;
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
                        // var pag = Ext.getCmp(prototype.id + '-paggin');
                        // var pagData = pag.getPageData();
                        // Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                        // Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                        // Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
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
            Ext.getCmp(prototype.id + '-paggin').setStore(storeGridDatas);
        }
    },
    onClickGrupo: function (obj, metaData, rowNum, column, obj2, rowData) {
        var data = rowData.data;
        if (data.A1530TICAP === 'M') {
            if (data.A1530STPRO !== 'CLOSED') {
                this.winDataEntry('U', data);
                //console.log("edit");
            } else {
                global.Msg({
                    msg: 'The group is closed.'
                });
            }
        } else {
            global.Msg({
                msg: 'The group is not Manual Capture.'
            });
        }
    },
    /**
     * Metodos usados para editar
     * */
    btnAdd_click: function (obj, e) {
        this.winDataEntry('I');
    },
    onEditClick: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        var dataEntryGrupo = Ext.create('Ext.Praxis.view.sales.SalesReportForm.DataEntryGrupo', {
            id: prototype.id + '-dataEntryGrupo',
            params: {
                rec: rec,
                option: 'TKT'
            }
        });
        dataEntryGrupo.show();
    },
    winDataEntry: function (action, data) {
        action = action === null || action === undefined ? 'U' : action;
        data = data === null || data === undefined ? {} : data;

        var dataEntry = Ext.create('Ext.Praxis.view.sales.SalesReportForm.DataEntry', {
            id: prototype.id + '-dataEntry',
            params: {
                action: action,
                data: data
            }
        });
        dataEntry.show();
    },
    btnBack_click: function (obj, e) {
        global.showMenu();
    },
    btnClear_click: function (obj, e) {
        Ext.getCmp(prototype.id + '-cmbDateYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateMonth').setValue('');
        Ext.getCmp(prototype.id + '-cmbDateDay').setValue('');
        Ext.getCmp(prototype.id + '-txtCountry').setValue('');
        Ext.getCmp(prototype.id + '-cmbBanco').setValue('');
        Ext.getCmp(prototype.id + '-txtCurrency').setValue('');
        Ext.getCmp(prototype.id + '-txtIata').setValue('');
        Ext.getCmp(prototype.id + '-txtGroup').setValue('');
        Ext.getCmp(prototype.id + '-txtIdFil').setValue('');
        Ext.getCmp(prototype.id + '-txtCia').setValue('');
        Ext.getCmp(prototype.id + '-txtTicket').setValue('');
        Ext.getCmp(prototype.id + '-cmbStatus').setValue('');
        Ext.getCmp(prototype.id + '-cmbSource').setValue('');
        if (e === '') {
            Ext.getCmp(prototype.id + '-cmbDate').setValue('');
        }
    },
    btnExcel_click: function (obj, e) {
        Ext.Msg.show({
            title: '.:PRAXISAM:.',
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
    },
    exportExcel: function () {
        global.getFile(prototype.url + '/getXLSX?AIRLINE=' + searchParams.AIRLINE
                + '&CIUVT=' + searchParams.CIUVT
                + '&FECHARPT=' + searchParams.FECHARPT
                + '&FUENTE=' + searchParams.FUENTE
                + '&PAIS=' + searchParams.PAIS
                + '&BANCO=' + searchParams.BANCO
                + '&MONEDA=' + searchParams.MONEDA
                + '&FLAG=' + searchParams.FLAG
                + '&GRUPO=' + searchParams.GRUPO
                + '&IATA=' + searchParams.IATA
                + '&TKT=' + searchParams.TKT
                + '&STPRO=' + searchParams.STPRO);
    },
    btnFilter_click: function (obj) {
        var option = Ext.getCmp(prototype.id + '-contentFilter');
        if (option.isVisible()) {
            option.setVisible(false);
        } else {
            option.setVisible(true);
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
    },
    onTextKeypress: function (obj, e, eOpts) {
        if (e.getKey() === e.ENTER) {
            this.btnSearch_click();
        }
    }
});