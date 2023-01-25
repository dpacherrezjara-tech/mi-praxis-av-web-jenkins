/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.interline.FrequentFlyer.FrequentFlyerController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.FrequentFlyerController',
    fecha: new Date(),
    paginActual: '',
    drillDown: [],
    gridActual: '',
    childs: '',
    me: '',
    paramsTKT: {},
    beanTKT: {},
    searchParams: {},
    searchParamsDetail: {},
    init: function(view) {
        prototype.id = 'FrequentFlyerForm';
        prototype.url = CONTEXTPATH + '/FrequentFlyer';
        prototype.urlMaster = CONTEXTPATH + '/MasterController';
        me = this;
        me.panelActual = '-panelMain';
        this.childs = Ext.getCmp(prototype.id + '-panelMain0').items.items;
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        this.control({
            // -------------------Eventos Genericos --------------------
            '#FrequentFlyerForm-xpanel': {
                afterrender: this.xpanel_afterrender
            },
            '#FrequentFlyerForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#FrequentFlyerForm-btnClear': {
                click: this.btnClear_click
            },
            '#FrequentFlyerForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#FrequentFlyerForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#FrequentFlyerForm-btnBack': {
                click: this.btnBack_click
            },
            '#FrequentFlyerForm-btnTxt': {
                click: this.btnTxt_click
            },
            '#FrequentFlyerForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#FrequentFlyerForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#FrequentFlyerForm-btn-pag-next': {
                click: this.pagNext
            },
            '#FrequentFlyerForm-btn-pag-last': {
                click: this.pagLast
            },
            //-----------------Eventos Especificos -------------------            
            '#FrequentFlyerForm-cmbDateFromYear': {
                select: this.selectComboFromYear
            },
            '#FrequentFlyerForm-cmbDateFromMonth': {
                select: this.selectComboFromMonth
            },
            '#FrequentFlyerForm-cmbDateToMonth': {
                select: this.selectComboToMonth
            },
            '#FrequentFlyerForm-btnADM': {
                change: this.selectBtnADM
            }
//            '#FrequentFlyerForm-cmbOpcion': {
//                change: this.changeCmbOpcion
//            },
//            '#FrequentFlyerForm-cmbSALES': {
//                change: this.changeCmbSALES
//            },
//            '#FrequentFlyerForm-txtFilterCOUNTRY': {
//                keyup: this.eventKey,
//                change: this.onUpperValue
//            },
//            '#FrequentFlyerForm-txtFilterCHANNEL': {
//                keyup: this.eventKey,
//                change: this.onUpperValue
//            },
//            '#FrequentFlyerForm-txtFilterIATA': {
//                keyup: this.eventKey,
//                change: this.onUpperValue
//            },
//            '#FrequentFlyerForm-txtFilterGRUPO': {
//                keyup: this.eventKey,
//                change: this.onUpperValue
//            },
//            '#FrequentFlyerForm-txtFilterCONTABLE': {
//                keyup: this.eventKey,
//                change: this.onUpperValue
//            }

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
    selectComboFromYear: function(obj) {
        var comboToYear = Ext.getCmp(prototype.id + '-cmbDateToYear');
        var storeComboDataYear = win.getStoreYear2(false, obj.getValue());
        comboToYear.bindStore(storeComboDataYear);
        comboToYear.setValue(obj.getValue());
    },
    selectComboFromMonth: function(obj) {
        var comboToMonth = Ext.getCmp(prototype.id + '-cmbDateToMonth');
        comboToMonth.setValue(obj.getValue());
    },
    selectComboToMonth: function(obj) {
        var comboFromYear = Ext.getCmp(prototype.id + '-cmbDateFromYear');
        var comboToYear = Ext.getCmp(prototype.id + '-cmbDateToYear');
        var comboFromMonth = Ext.getCmp(prototype.id + '-cmbDateFromMonth');
        if (comboFromYear.getValue() === comboToYear.getValue()) {
            if (obj.getValue() < comboFromMonth.getValue()) {
                comboFromMonth.setValue(obj.getValue());
            }
        }
    },
    selectBtnADM: function(obj) {
        if (obj.getValue()) {
            Ext.getCmp(prototype.id + '-txtIATA').show();
            this.btnSearch_click_ADM();
        } else {
            Ext.getCmp(prototype.id + '-txtIATA').hide();
            this.btnSearch_click();
        }

    },
    setStoreData: function() {
        console.log(prototype.url);
        Ext.getCmp(prototype.id + '-cmbDateFromYear').bindStore(win.getStoreYear(false));
        Ext.getCmp(prototype.id + '-cmbDateToYear').bindStore(win.getStoreYear(false));
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').bindStore(win.getStoreMonth(true));
        Ext.getCmp(prototype.id + '-cmbDateToMonth').bindStore(win.getStoreMonth(true));

        Ext.getCmp(prototype.id + '-cmbDateFromYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateToYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').setValue("");
        Ext.getCmp(prototype.id + '-cmbDateToMonth').setValue("");

        var cmbFecha = Ext.getCmp(prototype.id + '-cmbFecha');
        cmbFecha.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["1", "Clearing Date"],
                ["2", "Invoice Date"]
            ]
        }));
        cmbFecha.setValue("2");

        var cmbStatus = Ext.getCmp(prototype.id + '-cmbStatus');
        cmbStatus.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "All"],
                ["C", "Closed"],
                ["P", "Pending"]
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

        Ext.Ajax.request({
            url: prototype.urlMaster + '/obtainDataAirline',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getBody().mask('Loading...'),
            params: '',
            success: function(response, options) {
                Ext.getBody().unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);
                var lstData = res.lstData;
                var storeData = Ext.create('Ext.data.Store', {
                    data: lstData,
                    autoLoad: true
                });
                Ext.getCmp(prototype.id + '-cmbAerolinea').bindStore(storeData);
                Ext.getCmp(prototype.id + '-cmbAerolinea').setValue('');
                global.clear();
                me.btnSearch_click();
            }
        });
    },
    changeCmbOpcion: function(obj, value) {
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
    btnSearch_click: function(obj, e) {
        
        var ticket = Ext.getCmp(prototype.id + '-txtTKT').getValue();
        if(ticket !== ''){
            if (ticket.trim().length === 13) {
                me.beanTKT.IN_TKT = ticket
                var beanString = JSON.stringify(me.beanTKT);
                me.paramsTKT = {
                    beanString: beanString,
                };
                this.setGridDataTKT();
            } else {
                global.Msg({
                    msg: 'Ticket number must contain 13 digits.'
                });
            }
        }else{
            Ext.getCmp(prototype.id + '-panelPie').show();
            this.setFormatParameter();
            this.setGridData(obj, e);
        }
    },
    btnSearch_click_ADM: function(obj, e) {
        this.setFormatParameter();
        var longitud_tkt = searchParams.bean.IN_TKT.length;

        if (longitud_tkt > 0) {
            if (longitud_tkt === 13) {
                searchParams.bean.url = '/searchTKTADM';
                searchParams.bean.panel = '-panelMainADM';
                searchParams.bean.gridData = '-panelMainADM';
            } else {
                global.Msg({
                    msg: 'Ticket number must contain 13 digits.'
                });
                return;
            }
        } else {

            searchParams.bean.url = '/searchWRF170';
            searchParams.bean.panel = '-panelWRF170';
            searchParams.bean.gridData = '-gridDataWRF170';

        }
        this.setGridDataADM();

    },
    setFormatParameter: function() {
        var bean = {};

        bean.IN_TIPOFECHA = Ext.getCmp(prototype.id + '-cmbFecha').getValue();
        bean.IN_FECHA_FROM = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue() + Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue();
        bean.IN_FECHA_TO = Ext.getCmp(prototype.id + '-cmbDateToYear').getValue() + Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue();
        bean.IN_AIRLINE = Ext.getCmp(prototype.id + '-cmbAerolinea').getValue();

        bean.IN_PERIOD = Ext.getCmp(prototype.id + '-cmbPeriod').getValue();
        bean.IN_TYPE = Ext.getCmp(prototype.id + '-cmbStatus').getValue();
        bean.IN_SOURCE = Ext.getCmp(prototype.id + '-txtIATA').getValue();
        bean.IN_TKT = Ext.getCmp(prototype.id + '-txtTKT').getValue();
        bean.url = '';
        bean.panel = '';
        bean.gridData = '';
        var beanString = JSON.stringify(bean);
        searchParams = {
            bean: bean,
            beanString: beanString
        };
    },
    setGridData: function(obj, val) {
        win.lblUser_toolTip("Estructura: WRF002");
        this.setFormatParameter();
        me.panelActual = '-panelMain';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        me.setWidthPie();
        // var msj = this.validateFields();
        var msj = '';
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {

            var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
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
        }
    },
    setGridDataADM: function(obj, val) {
        win.lblUser_toolTip("Estructura: WRF002");
        me.panelActual = searchParams.bean.panel;
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        me.setWidthPie();
        var url = searchParams.bean.url;
        var gridData = searchParams.bean.gridData;

        console.log(searchParams);
//        var msj = this.validateFields();
        var msj = '';
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {

            var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
                proxy: {
                    url: prototype.url + url
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
            Ext.getCmp(prototype.id + gridData).bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-grafico01').bindStore(storeGridDatas);
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
                break;
        }
        return msj;
    },
    onSetDetailWRF170: function(obj, metaData, rowNum, columnNum, obj2, rowData) {


        var data = rowData.data;
        var beanDetail = {};
        var flag = '';
        beanDetail.IN_FECHA_FROM = data.FINVOICE;
        beanDetail.IN_FECHA_TO = data.FINVOICE;
        beanDetail.strFormatDate = data.strFormatDate;
        beanDetail.IN_FCLAS = data.strFormatDate;

        switch (columnNum) {
            case 0:
                flag = '';
                break;
            case 5:
                flag = '1';
                break;
            case 6:
                flag = '2';
                break;
        }
        beanDetail.IN_FCLAS = flag;

        var beanString = JSON.stringify(beanDetail);
        me.searchParamsDetail = {
            bean: beanDetail,
            beanString: beanString
        };
        console.log(me.searchParamsDetail);
        console.log(me.searchParamsDetail);
        this.setGridDataDetailWRF170();



    },
    setGridDataDetailWRF170: function() {
        win.lblUser_toolTip("Estructura: WRF002");
        me.drillDown.push(me.panelActual);
        me.panelActual = '-panelMainDataADM';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        me.setWidthPie();
        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
            proxy: {
                url: prototype.url + '/searchADM'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = me.searchParamsDetail;
                },
                load: function(obj) {
                    var pag = Ext.getCmp(prototype.id + '-paggin2');
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
        Ext.getCmp(prototype.id + '-gridDataADM').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin2').bindStore(storeGridDatas);
    },
    gridData_VIEWTKT_clickHandler: function(column, e, row, column, x, rowData) {
        var data = x.record.data;
        var strTkt = data.strDescripcion;
        var beanProMasterTicket = {};
        beanProMasterTicket.IN_CIA = strTkt.substr(0, 3);
        beanProMasterTicket.IN_FORMA = strTkt.substr(4, 4);
        beanProMasterTicket.IN_SERIE = strTkt.substr(8, 7);
        console.log(beanProMasterTicket.IN_CIA);
        console.log(beanProMasterTicket.IN_FORMA);
        console.log(beanProMasterTicket.IN_SERIE);
        beanProMasterTicket.IN_SEQ = '00';

        win.displayProMasterTicket(this, 'ViewFrecuentFlyer', beanProMasterTicket);
    },
    btnBack_click: function(obj, e) {

        if (me.drillDown.length > 0) {
            console.log(me.drillDown);
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
    getPaggin: function() {
        me.pagginActual = '';
        switch (me.panelActual) {
            case  '-panelMainDataADM':
                me.pagginActual = '-paggin2';
                break;
            default:
                me.pagginActual = '-paggin';
        }
    },
    btnClear_click: function(obj, e) {
//        Ext.getCmp(prototype.id + '-cmbOpcion').setValue('2');
//        Ext.getCmp(prototype.id + '-cmbContrytax').setValue('1');
//        Ext.getCmp(prototype.id + '-cmbSALES').setValue('');
//        Ext.getCmp(prototype.id + '-cmbBANK').setValue('');
//
//        Ext.getCmp(prototype.id + '-txtFilterCONTABLE').setValue('');
//        Ext.getCmp(prototype.id + '-txtFilterGRUPO').setValue('');
//        Ext.getCmp(prototype.id + '-txtFilterDateFrom').setValue('');
//        Ext.getCmp(prototype.id + '-txtFilterDateTo').setValue('');
//        Ext.getCmp(prototype.id + '-txtFilterCOUNTRY').setValue('');
//        Ext.getCmp(prototype.id + '-txtFilterCHANNEL').setValue('');
//        Ext.getCmp(prototype.id + '-txtFilterIATA').setValue('');
        
        Ext.getCmp(prototype.id + '-txtTKT').setValue('');


    },
    clearFields: function() {
        Ext.getCmp(prototype.id + '-cmbSALES').setValue('');
        Ext.getCmp(prototype.id + '-cmbBANK').setValue('');
        Ext.getCmp(prototype.id + '-txtFilterCONTABLE').setValue('');
        Ext.getCmp(prototype.id + '-txtFilterGRUPO').setValue('');
        Ext.getCmp(prototype.id + '-txtFilterDateFrom').setValue('');
        Ext.getCmp(prototype.id + '-txtFilterDateTo').setValue('');
        Ext.getCmp(prototype.id + '-txtFilterCOUNTRY').setValue('');
        Ext.getCmp(prototype.id + '-txtFilterCHANNEL').setValue('');
        Ext.getCmp(prototype.id + '-txtFilterIATA').setValue('');

    }, btnExcel_click: function(obj, e) {

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
                fn: function(btn) {
                    if (btn === 'ok') {
                        this.exportExcel();
                    }
                }
            });
        }
    },
    exportExcel: function() {

        var beanString = '';
        switch (me.panelActual) {

            case  '-panelMain':
                beanString = searchParams.beanString;
                var strEncode = encodeURI(prototype.url + '/getXLSX?beanString=' + beanString);
                global.getFile(strEncode);
                break;
            case '-panelWRF170':
                beanString = searchParams.beanString;
                var strEncode = encodeURI(prototype.url + '/getADMXLSX?beanString=' + beanString);
                global.getFile(strEncode);

                break;
            case '-panelMainDataADM':
                beanString = me.searchParamsDetail.beanString;
                var strEncode = encodeURI(prototype.url + '/getADMDetailXLSX?beanString=' + beanString);
                global.getFile(strEncode);
                break;
            default:
                global.Msg({msg: 'Under Construction'});
        }
    },
    btnFilter_click: function(obj) {
        var option = Ext.getCmp(prototype.id + '-contentFilter');
        if (option.isVisible()) {
            option.setVisible(false);
        } else {
            option.setVisible(true);
        }
    },
    btnTxt_click: function() {
        this.setFormatParameter();
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
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
                    );
        }
    },
    setWidthPie: function() {
        var ancho = Ext.getCmp(prototype.id + me.panelActual).getWidth();

        Ext.getCmp(prototype.id + '-panelPie').setWidth(ancho);
        Ext.getCmp(prototype.id + '-panelPieInterno').setWidth(ancho);
    },
    viewProrate: function(column, e, row, column, x, rowData) {

//        var data = x.record.data;
//        var nroprt = data.NROPRT;
//
//        this.post_to_url(CONTEXTPATH + '/Home?'
//                + 'strMod=FreqFlyer&'
//                + 'nroprt=' + nroprt
//                + '#program-prorrateo-form', {}, 'post', 'ProrrateoForm');

        var data = x.record.data;
        var nroprt = data.NROPRT;

        prototypeProgram.view = 'interline-frequent-flyer-form';
        prototypeProgram.nprog = 'PX00000198';
        prototypeProgram.title = 'Frequent Flyer';
        prototypeProgram.modulo = '';

        win.displayBwrProrrateo(this, 'FreqFlyer', nroprt);
    },
    post_to_url: function(path, params, method, id) {
        method = method || "post";

        var form = document.createElement("form");
        form.setAttribute("method", method);
        form.setAttribute("action", path);
        form.setAttribute("id", id);

        document.body.appendChild(form);
        form.submit();
    },
    BuscarTKT_keyDownHandler: function(obj, e, eOpts) {
        var ticket = Ext.getCmp(prototype.id + '-txtTKT').getValue();
        switch (e.getKey()) {
            case 13:
                if (ticket.trim().length === 13) {
                    me.beanTKT.IN_TKT = ticket
                    var beanString = JSON.stringify(me.beanTKT);
                    me.paramsTKT = {
                        beanString: beanString,
                    };
                    this.setGridDataTKT();
                } else {
                    global.Msg({
                        msg: 'Ticket number must contain 13 digits.'
                    });
                }
        }
    },
    setGridDataTKT: function () {
        win.lblUser_toolTip("Estructura: A2282");
        me.panelActual = '-boxTKT';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        
        Ext.getCmp(prototype.id + '-panelPie').hide();
        
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchTKT'
            }, listeners: {
                beforeload: function (obj) {
                    Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');
                    obj.proxy.extraParams = me.paramsTKT;
                },
                load: function (obj) {
                    Ext.getCmp(prototype.id + '-contentInfo').unmask();
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    } else {
                        var data = obj.data.items[0].data;
                        console.log(data);
//                            console.log(data);
                    }
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridTKT').bindStore(storeGridDatas);
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
    getDouble: function(value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right';
        return Ext.util.Format.number(value, '0,000.00');
    },
    getInt: function(value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right';
        return Ext.util.Format.number(value, '0,000');
    },
});
