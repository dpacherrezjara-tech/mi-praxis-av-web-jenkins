/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.sales.TicketsExchangeOAL.TicketsExchangeOALController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.TicketsExchangeOALController',
    fecha: new Date(),
    paginActual: '',
    drillDown: [],
    gridActual: '',
    me: '',
    searchParams: {},
    paramsDetail: {},
    init: function(view) {
        prototype.id = 'TicketsExchangeOALForm';
        prototype.url = CONTEXTPATH + '/TicketsExchangeOAL';
        me = this;
        this.control({
            // -------------------Eventos Genericos --------------------
            '#TicketsExchangeOALForm-xpanel': {
                afterrender: this.xpanel_afterrender
            },
            '#TicketsExchangeOALForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#TicketsExchangeOALForm-btnClear': {
                click: this.btnClear_click
            },
            '#TicketsExchangeOALForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#TicketsExchangeOALForm-btnBack': {
                click: this.btnBack_click
            },
            '#TicketsExchangeOALForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#TicketsExchangeOALForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#TicketsExchangeOALForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#TicketsExchangeOALForm-btn-pag-next': {
                click: this.pagNext
            },
            '#TicketsExchangeOALForm-btn-pag-last': {
                click: this.pagLast
            },
            //-----------------Eventos Especificos -------------------            

            '#TicketsExchangeOALForm-cmbDate': {
                change: this.changeCmbDate
            },
            '#TicketsExchangeOALForm-cmbSource': {
                change: this.changeCmbSource
            },
            '#TicketsExchangeOALForm-txtCountry': {
                keyup: this.eventKey,
                change: this.onUpperValue
            },
            '#TicketsExchangeOALForm-txtIata': {
                keyup: this.eventKey,
                change: this.onUpperValue
            },
            '#TicketsExchangeOALForm-txtGroup': {
                keyup: this.eventKey,
                change: this.onUpperValue
            },
            '#TicketsExchangeOALForm-txtTicket': {
                keyup: this.eventKey,
                change: this.onUpperValue
            },
            '#TicketsExchangeOALForm-txtInvoice': {
                keyup: this.eventKey,
                change: this.onUpperValue
            }
        });
    },
    xpanel_afterrender: function(obj, e) {
        this.setStoreData();
//      this.btnSearch_click();
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
        var cmbDate = Ext.getCmp(prototype.id + '-cmbDate');
        cmbDate.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "Select"],
                ["1", "Processing Date"],
                ["2", "Ending Date"],
                ["7", "Accounting Date"],
                ["4", "Invoice IxC"],
                ["8", "Invoice Period"],
                ["3", "Group"],
                ["5", "New Ticket"],
                ["6", "Old Ticket"]

            ]
        }));
        cmbDate.setValue("");

        var cmbSource = Ext.getCmp(prototype.id + '-cmbSource');
        cmbSource.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "All"],
                ["B", "BSP"],
                ["A", "ARC"],
                ["S", "ASR"],
                ["M", "MAN"]
            ]
        }));
        cmbSource.setValue("");

        var cmbBanco = Ext.getCmp(prototype.id + '-cmbBanco');
        cmbBanco.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "All"],
                ["04", "ELW"],
                ["07", "IAR"],
                ["05", "IAR"]
            ]
        }));
        cmbBanco.setValue("");
        var cmbStatus = Ext.getCmp(prototype.id + '-cmbStatus');
        cmbStatus.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "All"],
                ["0", "OPEN"],
                ["1", "CLOSE"],
                ["C", "ACCOUNTING"]
            ]
        }));
        cmbStatus.setValue("");
        var cmbPeriod = Ext.getCmp(prototype.id + '-cmbPeriod');
        cmbPeriod.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "All"],
                ["01", "01"],
                ["02", "02"],
                ["03", "03"],
                ["04", "04"]
            ]
        }));
        cmbPeriod.setValue("");
        var cmbFacturado = Ext.getCmp(prototype.id + '-cmbFacturado');
        cmbFacturado.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "All"],
                ["0", "Invoice"],
                ["", "Not Invoice"]

            ]
        }));
        cmbFacturado.setValue("");
    },
    changeCmbDate: function(obj, value) {
        this.clearFields();
        this.hideComponents();
        switch (value) {

            case '1':
            case '2':
            case '7':
                Ext.getCmp(prototype.id + '-txtFDesde').show();
                Ext.getCmp(prototype.id + '-txtFHasta').show();
                Ext.getCmp(prototype.id + '-cmbSource').show();

                break;

            case '3':
                Ext.getCmp(prototype.id + '-txtGroup').show();
                break;
            case '4':
                Ext.getCmp(prototype.id + '-cmbFacturado').show();
                break;
            case '5':
            case '6':
                Ext.getCmp(prototype.id + '-txtTicket').show();

                break;

            case '8':
                Ext.getCmp(prototype.id + '-txtInvoice').show();
                Ext.getCmp(prototype.id + '-cmbPeriod').show();

                break;
        }
    },
    hideComponents: function() {

        Ext.getCmp(prototype.id + '-cmbFacturado').hide();
        Ext.getCmp(prototype.id + '-cmbSource').hide();
        Ext.getCmp(prototype.id + '-cmbBanco').hide();
        Ext.getCmp(prototype.id + '-cmbPeriod').hide();
        Ext.getCmp(prototype.id + '-txtCountry').hide();
        Ext.getCmp(prototype.id + '-txtFDesde').hide();
        Ext.getCmp(prototype.id + '-txtFHasta').hide();
        Ext.getCmp(prototype.id + '-txtIata').hide();
        Ext.getCmp(prototype.id + '-cmbStatus').hide();
        Ext.getCmp(prototype.id + '-txtGroup').hide();
        Ext.getCmp(prototype.id + '-txtTicket').hide();
        Ext.getCmp(prototype.id + '-txtInvoice').hide();

    },
    changeCmbSource: function(obj, value) {
        Ext.getCmp(prototype.id + '-txtIata').show();
        Ext.getCmp(prototype.id + '-cmbStatus').show();
        Ext.getCmp(prototype.id + '-txtCountry').show();
        Ext.getCmp(prototype.id + '-cmbBanco').show();
        switch (value) {
            case 'B':
            case 'S':
            case 'M':
                Ext.getCmp(prototype.id + '-cmbBanco').hide();
                break;
            case 'A':
                Ext.getCmp(prototype.id + '-txtCountry').hide();
                break;
            default:
                Ext.getCmp(prototype.id + '-txtIata').hide();
                Ext.getCmp(prototype.id + '-cmbStatus').hide();
                Ext.getCmp(prototype.id + '-txtCountry').hide();
                Ext.getCmp(prototype.id + '-cmbBanco').hide();
        }

    },
    btnSearch_click: function(obj, e) {
        //this.setFormatParameter();
        this.setGridData(obj, e);
    },
    setFormatParameter: function() {

        var IN_OPCION = Ext.getCmp(prototype.id + '-cmbDate').getValue();
        var IN_FLAG = Ext.getCmp(prototype.id + '-cmbDate').getValue();
        var IN_FECHAFROM = Ext.util.Format.date(Ext.getCmp(prototype.id + '-txtFDesde').getValue(), 'Ymd');
        var IN_FECHATO = Ext.util.Format.date(Ext.getCmp(prototype.id + '-txtFHasta').getValue(), 'Ymd');
        var IN_SOURCE = Ext.getCmp(prototype.id + '-cmbSource').getValue();
        var IN_PAIS = Ext.getCmp(prototype.id + '-txtCountry').getValue();
        var IN_BANCO = Ext.getCmp(prototype.id + '-cmbBanco').getValue();
        var IN_IATA = Ext.getCmp(prototype.id + '-txtIata').getValue();
        var IN_STATUS = Ext.getCmp(prototype.id + '-cmbStatus').getValue();
        var IN_GRUPO = Ext.getCmp(prototype.id + '-txtGroup').getValue();
        var IN_TKT = Ext.getCmp(prototype.id + '-txtTicket').getValue();
        var IN_INDICATOR = Ext.getCmp(prototype.id + '-cmbFacturado').getValue();
        var IN_INVOICE = Ext.getCmp(prototype.id + '-txtInvoice').getValue();
        var IN_PERIOD = IN_INVOICE + Ext.getCmp(prototype.id + '-cmbPeriod').getValue();


        if(IN_FECHAFROM.length===8 || IN_SOURCE!=='' || IN_PAIS!=='' || IN_BANCO!=='' || IN_IATA!=='' || IN_STATUS!==''){
		IN_OPCION = 2;
	}else if(IN_GRUPO !== ''){
		IN_OPCION = 3;
	}else if(IN_TKT !== ''){
		if(IN_FLAG === '5'){
			IN_OPCION = 5;
		}else{
			IN_OPCION = 6;
		}
	}else if(IN_FLAG === '4'){
		IN_OPCION = 4;
	}else if(IN_INVOICE !== ''){
		IN_OPCION = 8;
	}


//        if (IN_INVOICE.trim() === '') {
//            IN_OPCION = '1';
//        }
        searchParams = {
            IN_OPCION: IN_OPCION,
            IN_FLAG: IN_FLAG,
            IN_FECHAFROM: IN_FECHAFROM,
            IN_FECHATO: IN_FECHATO,
            IN_SOURCE: IN_SOURCE,
            IN_PAIS: IN_PAIS,
            IN_BANCO: IN_BANCO,
            IN_IATA: IN_IATA,
            IN_STATUS: IN_STATUS,
            IN_GRUPO: IN_GRUPO,
            IN_TKT: IN_TKT,
            IN_INDICATOR: IN_INDICATOR,
            IN_INVOICE: IN_INVOICE,
            IN_PERIOD: IN_PERIOD
        };
        console.log(searchParams);
    },
    setGridData: function(obj, val) {
        win.lblUser_toolTip("Estructura: A1530/A720/A730");
        this.setFormatParameter();

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
                    }
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridData').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);

    },
    btnBack_click: function(obj, e) {
        global.showMenu();
    },
    btnClear_click: function(obj, e) {
        Ext.getCmp(prototype.id + '-cmbDate').setValue('');
        this.clearFields();
    },
    clearFields: function() {
        Ext.getCmp(prototype.id + '-cmbFacturado').setValue('');
        Ext.getCmp(prototype.id + '-cmbSource').setValue('');
        Ext.getCmp(prototype.id + '-cmbBanco').setValue('');
        Ext.getCmp(prototype.id + '-cmbPeriod').setValue('');
        Ext.getCmp(prototype.id + '-txtCountry').setValue('');
        Ext.getCmp(prototype.id + '-txtFDesde').setValue('');
        Ext.getCmp(prototype.id + '-txtFHasta').setValue('');
        Ext.getCmp(prototype.id + '-txtIata').setValue('');
        Ext.getCmp(prototype.id + '-cmbStatus').setValue('');
        Ext.getCmp(prototype.id + '-txtGroup').setValue('');
        Ext.getCmp(prototype.id + '-txtTicket').setValue('');
        Ext.getCmp(prototype.id + '-txtInvoice').setValue('');
    },
    btnExcel_click: function(obj, e) {

        //this.setFormatParameter();

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
        this.setFormatParameter();
        global.getFile(prototype.url + '/getXLSX?IN_OPCION=' + searchParams.IN_OPCION
                + '&IN_FLAG=' + searchParams.IN_FLAG
                + '&IN_FECHAFROM=' + searchParams.IN_FECHAFROM
                + '&IN_FECHATO=' + searchParams.IN_FECHATO
                + '&IN_SOURCE=' + searchParams.IN_SOURCE
                + '&IN_PAIS=' + searchParams.IN_PAIS
                + '&IN_BANCO=' + searchParams.IN_BANCO
                + '&IN_IATA=' + searchParams.IN_IATA
                + '&IN_STATUS=' + searchParams.IN_STATUS
                + '&IN_GRUPO=' + searchParams.IN_GRUPO
                + '&IN_TKT=' + searchParams.IN_TKT
                + '&IN_INDICATOR=' + searchParams.IN_INDICATOR
                + '&IN_PERIOD=' + searchParams.IN_PERIOD
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
