/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.sales.GainLossRefund.GainLossRefundController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.GainLossRefundController',
    fecha: new Date(),
    paginActual: '',
    drillDown: [],
    gridActual: '',
    me: '',
    searchParams: {},
    paramsDetail: {},
    init: function(view) {
        prototype.id = 'GainLossRefundForm';
        prototype.url = CONTEXTPATH + '/GainLossRefund';
        me = this;
        this.control({
            // -------------------Eventos Genericos --------------------
            '#GainLossRefundForm-xpanel': {
                afterrender: this.xpanel_afterrender
            },
            '#GainLossRefundForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#GainLossRefundForm-btnClear': {
                click: this.btnClear_click
            },
            '#GainLossRefundForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#GainLossRefundForm-btnBack': {
                click: this.btnBack_click
            },
            '#GainLossRefundForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#GainLossRefundForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#GainLossRefundForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#GainLossRefundForm-btn-pag-next': {
                click: this.pagNext
            },
            '#GainLossRefundForm-btn-pag-last': {
                click: this.pagLast
            },
            //-----------------Eventos Especificos -------------------            

            '#GainLossRefundForm-cmbOpcion': {
                change: this.changeCmbOpcion
            },
            '#GainLossRefundForm-txtFilterGroup': {
                keyup: this.eventKey,
                change: this.onUpperValue
            },
            '#GainLossRefundForm-txtFilterAgent': {
                keyup: this.eventKey,
                change: this.onUpperValue
            },
            '#GainLossRefundForm-txtFilterCountry': {
                keyup: this.eventKey,
                change: this.onUpperValue
            },
            '#GainLossRefundForm-txtFilterTkt': {
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
        var cmbOpcion = Ext.getCmp(prototype.id + '-cmbOpcion');
        cmbOpcion.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "Select"],
                ["PDATE", "Processing Date"],
                ["GROUP", "Group"],
                ["TKT", "Ticket"]

            ]
        }));
        cmbOpcion.setValue("");

        var cmbSource = Ext.getCmp(prototype.id + '-cmbSource');
        cmbSource.bindStore(Ext.create('Ext.data.ArrayStore', {
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
        cmbSource.setValue("");

        var cmbStatus = Ext.getCmp(prototype.id + '-cmbStatus');
        cmbStatus.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "All"],
                ["D", "Difference"],
                ["E", "Equivalent"]
            ]
        }));
        cmbStatus.setValue("");
    },
    changeCmbOpcion: function(obj, value) {
        this.clearFields();
        switch (value) {

            case 'PDATE':
                Ext.getCmp(prototype.id + '-txtFilterDateFrom').show();
                Ext.getCmp(prototype.id + '-txtFilterDateTo').show();
                Ext.getCmp(prototype.id + '-cmbSource').show();
                Ext.getCmp(prototype.id + '-txtFilterAgent').show();
                Ext.getCmp(prototype.id + '-txtFilterCountry').show();
                Ext.getCmp(prototype.id + '-cmbStatus').show();

                Ext.getCmp(prototype.id + '-txtFilterGroup').hide();
                Ext.getCmp(prototype.id + '-txtFilterTkt').hide();

                break;
            case 'GROUP':
                Ext.getCmp(prototype.id + '-txtFilterDateFrom').hide();
                Ext.getCmp(prototype.id + '-txtFilterDateTo').hide();
                Ext.getCmp(prototype.id + '-cmbSource').hide();
                Ext.getCmp(prototype.id + '-txtFilterAgent').hide();
                Ext.getCmp(prototype.id + '-txtFilterCountry').hide();
                Ext.getCmp(prototype.id + '-cmbStatus').show();

                Ext.getCmp(prototype.id + '-txtFilterGroup').show();
                Ext.getCmp(prototype.id + '-txtFilterTkt').hide();
                break;
            case 'TKT':
                Ext.getCmp(prototype.id + '-txtFilterDateFrom').hide();
                Ext.getCmp(prototype.id + '-txtFilterDateTo').hide();
                Ext.getCmp(prototype.id + '-cmbSource').hide();
                Ext.getCmp(prototype.id + '-txtFilterAgent').hide();
                Ext.getCmp(prototype.id + '-txtFilterCountry').hide();
                Ext.getCmp(prototype.id + '-cmbStatus').show();

                Ext.getCmp(prototype.id + '-txtFilterGroup').hide();
                Ext.getCmp(prototype.id + '-txtFilterTkt').show();
                break;
            default:
                Ext.getCmp(prototype.id + '-txtFilterDateFrom').hide();
                Ext.getCmp(prototype.id + '-txtFilterDateTo').hide();
                Ext.getCmp(prototype.id + '-cmbSource').hide();
                Ext.getCmp(prototype.id + '-txtFilterAgent').hide();
                Ext.getCmp(prototype.id + '-txtFilterCountry').hide();
                Ext.getCmp(prototype.id + '-cmbStatus').hide();

                Ext.getCmp(prototype.id + '-txtFilterGroup').hide();
                Ext.getCmp(prototype.id + '-txtFilterTkt').hide();
                break;

        }
    },
    btnSearch_click: function(obj, e) {
        //this.setFormatParameter();
        this.setGridData(obj, e);
    },
    setFormatParameter: function() {

        var IN_TFILTER = '';
        var IN_FROM = '';
        var IN_TO = '';
        var IN_FUENTE = '';
        var IN_IATA = '';
        var IN_PAIS = '';
        var IN_GAINLOSS = '';
        var IN_GRUPO = '';
        var IN_TKT = '';
        IN_TFILTER = Ext.getCmp(prototype.id + '-cmbOpcion').getValue();

        switch (IN_TFILTER) {
            case 'PDATE':
                IN_TFILTER = '1';
                IN_FROM = Ext.util.Format.date(Ext.getCmp(prototype.id + '-txtFilterDateFrom').getValue(), 'Ymd');
                IN_TO = Ext.util.Format.date(Ext.getCmp(prototype.id + '-txtFilterDateTo').getValue(), 'Ymd');
                IN_FUENTE = Ext.getCmp(prototype.id + '-cmbSource').getValue();
                IN_IATA = Ext.getCmp(prototype.id + '-txtFilterAgent').getValue();
                IN_PAIS = Ext.getCmp(prototype.id + '-txtFilterCountry').getValue();
                IN_GAINLOSS = Ext.getCmp(prototype.id + '-cmbStatus').getValue();
                break;
            case 'GROUP':
                IN_TFILTER = '2';
                IN_GRUPO = Ext.getCmp(prototype.id + '-txtFilterGroup').getValue();
                IN_GAINLOSS = Ext.getCmp(prototype.id + '-cmbStatus').getValue();
                break;
            case 'TKT':
                IN_TFILTER = '3';
                IN_TKT = Ext.getCmp(prototype.id + '-txtFilterTkt').getValue();
                IN_GAINLOSS = Ext.getCmp(prototype.id + '-cmbStatus').getValue();
                break;
            default:
                IN_TFILTER = '0';
        }

        searchParams = {
            IN_TFILTER: IN_TFILTER,
            IN_FROM: IN_FROM,
            IN_TO: IN_TO,
            IN_FUENTE: IN_FUENTE,
            IN_IATA: IN_IATA,
            IN_PAIS: IN_PAIS,
            IN_GAINLOSS: IN_GAINLOSS,
            IN_GRUPO: IN_GRUPO,
            IN_TKT: IN_TKT
        };
        console.log(searchParams);
    },
    setGridData: function(obj, val) {
        win.lblUser_toolTip("Estructura: A1530");
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
        Ext.getCmp(prototype.id + '-cmbOpcion').setValue('');
        this.clearFields();
    },
    clearFields: function() {
        Ext.getCmp(prototype.id + '-cmbStatus').setValue('');
        Ext.getCmp(prototype.id + '-cmbSource').setValue('');
        Ext.getCmp(prototype.id + '-txtFilterDateFrom').setValue('');
        Ext.getCmp(prototype.id + '-txtFilterDateTo').setValue('');

        Ext.getCmp(prototype.id + '-txtFilterGroup').setValue('');
        Ext.getCmp(prototype.id + '-txtFilterAgent').setValue('');
        Ext.getCmp(prototype.id + '-txtFilterCountry').setValue('');
        Ext.getCmp(prototype.id + '-txtFilterTkt').setValue('');


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
        global.getFile(prototype.url + '/getXLSX?IN_TFILTER=' + searchParams.IN_TFILTER
                + '&IN_FROM=' + searchParams.IN_FROM
                + '&IN_TO=' + searchParams.IN_TO
                + '&IN_FUENTE=' + searchParams.IN_FUENTE
                + '&IN_IATA=' + searchParams.IN_IATA
                + '&IN_PAIS=' + searchParams.IN_PAIS
                + '&IN_GAINLOSS=' + searchParams.IN_GAINLOSS
                + '&IN_GRUPO=' + searchParams.IN_GRUPO
                + '&IN_TKT=' + searchParams.IN_TKT
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
