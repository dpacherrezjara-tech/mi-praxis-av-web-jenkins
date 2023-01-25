/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.payments.SalesComplementAmex.SalesComplementAmexController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.SalesComplementAmexController',
    fecha: new Date(),
    childs: '5',
    bean: '',
    beanDay: {},
    beanDetTran: {},
    beanDetCard: {},
    beanBank: {},
    beanTkt: {},
    beanDet: {},
    beanPGTkt: {},
    paginActual: '',
    drillDown: [],
    lstCountry: [],
    gridActual: '',
    panelActual: '',
    fileName: '',
    reg99: 0,
    me: '',
    searchParams: {},
    paramsDetail: {},
    paramsDetailPGTkt: {},
    dataObtain: {},
    dataGrid: [],
    init: function (view) {
        me = this;
        prototype.id = 'SalesComplementAmexForm';
        prototype.url = CONTEXTPATH + '/SalesComplementAmex';
        prototype.urlMaster = CONTEXTPATH + '/MasterController';
        this.childs = Ext.getCmp(prototype.id + '-panelMain').items.items;
        me.panelActual = '-panelGridData';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        this.control({
//            //   -------------------Eventos Genericos --------------------
            '#SalesComplementAmexForm-xpanel': {
                afterrender: this.xpanel_afterrender
            },
            '#SalesComplementAmexForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#SalesComplementAmexForm-btnClear': {
                click: this.btnClear_click
            },
            '#SalesComplementAmexForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#SalesComplementAmexForm-btnPdf': {
                click: this.btnPdf_click
            },
            '#SalesComplementAmexForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#SalesComplementAmexForm-btnAdd': {
                click: this.btnAdd_click
            },
            '#SalesComplementAmexForm-btnBack': {
                click: this.btnBack_click
            },
            '#SalesComplementAmexForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#SalesComplementAmexForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#SalesComplementAmexForm-btn-pag-next': {
                click: this.pagNext
            },
            '#SalesComplementAmexForm-btn-pag-last': {
                click: this.pagLast
            },
            '#SalesComplementAmexForm-cmbDateFromYear': {
//                afterrender: this.afterRenderYear,
                select: this.selectComboFromYear
            },
            '#SalesComplementAmexForm-cmbDateFromMonth': {
//                afterrender: this.afterRenderMonth,
                select: this.selectComboFromMonth
            },
            '#SalesComplementAmexForm-cmbDateToMonth': {
//                afterrender: this.afterRenderMonth,
                select: this.selectComboToMonth
            }

        });
    },
    xpanel_afterrender: function (obj, e) {
        this.obtainData();
        this.btnSearch_click();
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

        var month = this.fecha.getMonth() + 1;

        if (month < 10) {
            month = '0' + month;
        }

        var storeComboDataYear = win.getStoreYear(false);
        var storeComboDataMonth = win.getStoreMonth(true);

        Ext.getCmp(prototype.id + '-cmbDateFromYear').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').bindStore(storeComboDataMonth);

        Ext.getCmp(prototype.id + '-cmbDateFromYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').setValue('');


        Ext.getCmp(prototype.id + '-cmbDateToYear').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbDateToMonth').bindStore(storeComboDataMonth);

        Ext.getCmp(prototype.id + '-cmbDateToYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateToMonth').setValue('');

        //me.btnSearch_click();
    },
    filterPNRSettlement: function (e, eOpts) {
        switch (eOpts.getKey()) {
            case 13:
                this.btnSearch_click();
        }
    },
    setFormatParameter: function () {
        me.bean = {};

        me.bean.IN_DATEFROM = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue() + Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue();
        me.bean.IN_DATETO = Ext.getCmp(prototype.id + '-cmbDateToYear').getValue() + Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue();
        me.bean.IN_FAMEX = Ext.getCmp(prototype.id + '-cmbFindByFAMEX').getValue();
        me.bean.IN_STVAL = Ext.getCmp(prototype.id + '-cmbFindBySTVAL').getValue();
        me.bean.IN_TKT = Ext.getCmp(prototype.id + '-txtTKT').getValue();
        me.bean.IN_PNR = Ext.getCmp(prototype.id + '-txtPNR').getValue();
        me.bean.IN_DATE = "SDATE";
        me.bean.IN_SCARDN1 = Ext.getCmp(prototype.id + '-txtCC1').getValue();
        me.bean.IN_SCARDN2 = Ext.getCmp(prototype.id + '-txtCC2').getValue();
        me.bean.IN_SAUTHOC = Ext.getCmp(prototype.id + '-txtAuth').getValue();
        me.bean.IN_MERCHIDL = Ext.getCmp(prototype.id + '-cmbFindByLigas').getValue();
        me.bean.IN_MERCHIDT = Ext.getCmp(prototype.id + '-cmbFindByTablet').getValue();
        console.log(me.bean.IN_COMPLTYPE);
        var beanString = JSON.stringify(me.bean);
        searchParams = {
            beanString: beanString,
            bean: me.bean
        };
    },
    txtField_keyDownHandler: function (e, eOpts) {
        switch (eOpts.getKey()) {
            case 13:
                this.btnSearch_click();
        }
    },
    btnSearch_click: function (obj, e) {
        console.log('SEARCH');
        var selectedValue = Ext.getCmp(prototype.id + '-radiogroupTypeX').getValue().rbgTypeX;
        var stval = Ext.getCmp(prototype.id + '-cmbFindBySTVAL').getValue();
        console.log(selectedValue);
        console.log(stval);
        this.setFormatParameter();

        switch (selectedValue) {
            case 'P':

                this.setGridData();
                if (stval === '2') {
                    Ext.getCmp(prototype.id + '-plusAccounting').setVisible(true);
                    Ext.getCmp(prototype.id + '-plusAddPax').setVisible(false);
                    Ext.getCmp(prototype.id + '-gridDataMain').setWidth(1400);
                } else {
                    Ext.getCmp(prototype.id + '-plusAccounting').setVisible(false);
                    Ext.getCmp(prototype.id + '-plusAddPax').setVisible(true);
                    Ext.getCmp(prototype.id + '-gridDataMain').setWidth(1760);
                }
                break;
            case 'L':

                this.setGridDataLiga();
                if (stval === '2') {
                    Ext.getCmp(prototype.id + '-LigaAccounting').setVisible(true);
                } else {
                    Ext.getCmp(prototype.id + '-LigaAccounting').setVisible(false);
                }
                break;
            case 'T':

                this.setGridDataTablet();
                if (stval === '2') {
                    Ext.getCmp(prototype.id + '-TabletAccounting').setVisible(true);
                } else {
                    Ext.getCmp(prototype.id + '-TabletAccounting').setVisible(false);
                }
                break;
        }
    },
    setGridData: function () {
        win.lblUser_toolTip("Estructura: A4124");
        me.panelActual = '-panelGridData';
        Ext.getCmp(prototype.id + '-cmbFindByLigas').setVisible(false);
        Ext.getCmp(prototype.id + '-cmbFindByTablet').setVisible(false);
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        me.setWidthPie();
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/search'
            }, listeners: {
                beforeload: function (obj) {
                    Ext.getCmp(prototype.id + me.panelActual).mask('Loading...');
                    obj.proxy.extraParams = searchParams;
                },
                load: function (obj) {
                    Ext.getCmp(prototype.id + me.panelActual).unmask();
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
                        //Ext.getCmp(prototype.id + '-gridDataMain').setTitle('<center style="font-size:12px;">MERCHANT ID: 9353227755 - AEROMEXICO PLUSGRADE</center>');
                    }
                    me.setWidthPie();
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataMain').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridDataMain').setStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
    },
    onTktsDetail: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
        console.log(rowData);
        me.drillDown.push(me.panelActual);
        me.panelActual = '-panelDetPGTkt';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        this.beanPGTkt.IN_SDATES = rowData.data.SDATES;
        this.beanPGTkt.IN_SPNR = rowData.data.PNR;
        this.beanPGTkt.IN_PLUSGRADE = rowData.data.PLUSGRAID;

        console.log(this.beanPGTkt);

        //me.paramsDetail.beanString = JSON.stringify(this.beanPricing);
        me.paramsDetailPGTkt.beanString = JSON.stringify(this.beanPGTkt);
        this.setGridDataDetPGTkt();
    },
    setGridDataDetPGTkt: function () {
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchPGByTkt'
            }, listeners: {
                beforeload: function (obj) {
                    Ext.getCmp(prototype.id + me.panelActual).mask('Loading...');
                    obj.proxy.extraParams = me.paramsDetailPGTkt;
                },
                load: function (obj) {
                    Ext.getCmp(prototype.id + me.panelActual).unmask();
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
                        //Ext.getCmp(prototype.id + '-gridDataMainLiga').setTitle('<center style="font-size:12px;">MERCHANT ID: ' + data.MERCHID + ' - AEROMEXICO LIGAS</center>');
                    }
                    me.setWidthPie();
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataPGTkt').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridDataPGTkt').setStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin4').bindStore(storeGridDatas);
    },
    setGridDataLiga: function () {
        win.lblUser_toolTip("Estructura: A4166");
        me.panelActual = '-panelGridDataLiga';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        me.setWidthPie();
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchLiga'
            }, listeners: {
                beforeload: function (obj) {
                    Ext.getCmp(prototype.id + me.panelActual).mask('Loading...');
                    obj.proxy.extraParams = searchParams;
                },
                load: function (obj) {
                    Ext.getCmp(prototype.id + me.panelActual).unmask();
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
                        //Ext.getCmp(prototype.id + '-gridDataMainLiga').setTitle('<center style="font-size:12px;">MERCHANT ID: ' + data.MERCHID + ' - AEROMEXICO LIGAS</center>');
                    }
                    me.setWidthPie();
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataMainLiga').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridDataMainLiga').setStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin2').bindStore(storeGridDatas);
    },
    setGridDataTablet: function () {
        win.lblUser_toolTip("Estructura: A4166");
        me.panelActual = '-panelGridDataTablet';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        me.setWidthPie();
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchTablet'
            }, listeners: {
                beforeload: function (obj) {
                    Ext.getCmp(prototype.id + me.panelActual).mask('Loading...');
                    obj.proxy.extraParams = searchParams;
                },
                load: function (obj) {
                    Ext.getCmp(prototype.id + me.panelActual).unmask();
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
                        //Ext.getCmp(prototype.id + '-gridDataMainTablet').setTitle('<center style="font-size:12px;">MERCHANT ID: ' + data.MERCHID + ' - AEROMEXICO TABLET</center>');
                    }
                    me.setWidthPie();
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataMainTablet').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridDataMainTablet').setStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin3').bindStore(storeGridDatas);
    },
    rbChangeType: function () {

        var cmbFindByFAMEX = Ext.getCmp(prototype.id + '-cmbFindByFAMEX');
        var selectedValue = Ext.getCmp(prototype.id + '-radiogroupTypeX').getValue().rbgTypeX;
        var stval = Ext.getCmp(prototype.id + '-cmbFindBySTVAL').getValue();
        console.log(selectedValue);
        this.btnClear_click();
        switch (selectedValue) {
            case 'P':
                Ext.getCmp(prototype.id + '-cmbFindByLigas').setVisible(false);
                Ext.getCmp(prototype.id + '-cmbFindByTablet').setVisible(false);
                cmbFindByFAMEX.bindStore(Ext.create('Ext.data.ArrayStore', {
                    autoLoad: false,
                    fields: ['code', 'name'],
                    data: [
                        ["X", "All"],
                        ["", "Pending"],
                        ["1", "Match"],
                    ]
                }));
                cmbFindByFAMEX.setValue("X");
                this.setFormatParameter();
                this.setGridData();
                if (stval === '2') {
                    Ext.getCmp(prototype.id + '-plusAccounting').setVisible(true);
                    Ext.getCmp(prototype.id + '-plusAddPax').setVisible(false);
                    Ext.getCmp(prototype.id + '-gridDataMain').setWidth(1400);
                } else {
                    Ext.getCmp(prototype.id + '-plusAccounting').setVisible(false);
                    Ext.getCmp(prototype.id + '-plusAddPax').setVisible(true);
                    Ext.getCmp(prototype.id + '-gridDataMain').setWidth(1760);
                }
                break;
            case 'L':
                Ext.getCmp(prototype.id + '-cmbFindByLigas').setVisible(true);
                Ext.getCmp(prototype.id + '-cmbFindByTablet').setVisible(false);
                cmbFindByFAMEX.bindStore(Ext.create('Ext.data.ArrayStore', {
                    autoLoad: false,
                    fields: ['code', 'name'],
                    data: [
                        ["X", "All"],
                        ["", "Pending"],
                        ["2", "Match"],
                    ]
                }));
                cmbFindByFAMEX.setValue("X");
                this.setFormatParameter();
                this.setGridDataLiga();
                if (stval === '2') {
                    Ext.getCmp(prototype.id + '-LigaAccounting').setVisible(true);
                } else {
                    Ext.getCmp(prototype.id + '-LigaAccounting').setVisible(false);
                }
                break;
            case 'T':
                Ext.getCmp(prototype.id + '-cmbFindByLigas').setVisible(false);
                Ext.getCmp(prototype.id + '-cmbFindByTablet').setVisible(true);
                cmbFindByFAMEX.bindStore(Ext.create('Ext.data.ArrayStore', {
                    autoLoad: false,
                    fields: ['code', 'name'],
                    data: [
                        ["X", "All"],
                        ["", "Pending"],
                        ["3", "Match"],
                    ]
                }));
                cmbFindByFAMEX.setValue("X");
                this.setFormatParameter();
                this.setGridDataTablet();
                if (stval === '2') {
                    Ext.getCmp(prototype.id + '-TabletAccounting').setVisible(true);
                } else {
                    Ext.getCmp(prototype.id + '-TabletAccounting').setVisible(false);
                }
                break;
        }
    },
    imgByTDOC_clickHandler: function () {
//        this.btnSearch_click();
    },
    gridData_VIEWTKT_clickHandler: function (column, e, row, column, x, rowData) {
        var data = x.record.data;
        var strTkt = data.EMDNUMBER;
        var beanProMasterTicket = {};

        prototypeProgram.view = 'payments-sales-complement-amex-form';
        prototypeProgram.nprog = 'PX00000585';
        prototypeProgram.title = 'Sales Complement to Amex';
        prototypeProgram.modulo = '';
//        
        beanProMasterTicket.IN_CIA = strTkt.substr(0, 3);
        beanProMasterTicket.IN_FORMA = strTkt.substr(3, 4);
        beanProMasterTicket.IN_SERIE = strTkt.substr(7, 6);
//        beanProMasterTicket.IN_SEQ = '00';

        console.log(beanProMasterTicket);

        win.displayProMasterTicket(this, 'ViewFlightConciliation', beanProMasterTicket);
    },
    gridData_DetVIEWTKT_clickHandler: function (column, e, row, column, x, rowData) {
        var data = x.record.data;
        var strTkt = data.TKT;
        var beanProMasterTicket = {};

        prototypeProgram.view = 'payments-sales-complement-amex-form';
        prototypeProgram.nprog = 'PX00000585';
        prototypeProgram.title = 'Sales Complement to Amex';
        prototypeProgram.modulo = '';
//        
        beanProMasterTicket.IN_CIA = strTkt.substr(0, 3);
        beanProMasterTicket.IN_FORMA = strTkt.substr(3, 4);
        beanProMasterTicket.IN_SERIE = strTkt.substr(7, 6);
//        beanProMasterTicket.IN_SEQ = '00';

        console.log(beanProMasterTicket);

        win.displayProMasterTicket(this, 'ViewFlightConciliation', beanProMasterTicket);
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

        Ext.create('Ext.Praxis.view.payments.SalesComplementAmexForm.DataEntry', {
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
//        Ext.getCmp(prototype.id + '-cmbDateFromYear').setValue(this.fecha.getFullYear());
//        Ext.getCmp(prototype.id + '-cmbDateFromMonth').setValue('');
//        Ext.getCmp(prototype.id + '-cmbDateToYear').setValue(this.fecha.getFullYear());
//        Ext.getCmp(prototype.id + '-cmbDateToMonth').setValue('');   
          Ext.getCmp(prototype.id + '-cmbFindByLigas').setValue('');
          Ext.getCmp(prototype.id + '-cmbFindByTablet').setValue('');
    },
    btnExcel_click: function (obj, e) {

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
    },
    exportExcel: function () {
        console.log(me.panelActual);
        switch (me.panelActual) {
            case  '-panelGridData':
                var stval = Ext.getCmp(prototype.id + '-cmbFindBySTVAL').getValue();
                if (stval === '2') {
                    this.setFormatParameter();
                    global.getFile(prototype.url + '/getXLSX1?beanString=' + searchParams.beanString);
                } else {
                    this.setFormatParameter();
                    global.getFile(prototype.url + '/getXLSX?beanString=' + searchParams.beanString);
                }
                break;
            case  '-panelGridDataLiga':
                this.setFormatParameter();
                global.getFile(prototype.url + '/getXLSXLiga?beanString=' + searchParams.beanString);
                break;
            case  '-panelGridDataTablet':
                this.setFormatParameter();
                global.getFile(prototype.url + '/getXLSXTablet?beanString=' + searchParams.beanString);
                break;
        }
    },
    btnFilter_click: function (obj) {
        var option = Ext.getCmp(prototype.id + '-contentFilter');
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
            case  '-panelGridData':
                me.pagginActual = '-paggin';
                break;
            case  '-panelGridDataLiga':
                me.pagginActual = '-paggin2';
                break;
            case  '-panelGridDataTablet':
                me.pagginActual = '-paggin3';
                break;
            case  '-panelDetPGTkt':
                me.pagginActual = '-paggin4';
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
    onViewPNR: function (a, b, c, d, e, rowData) {
//        var rec = grid.getStore().getAt(rowIndex);
        this.winDataEntry_PNR('', rowData);
    },
    winDataEntry_PNR: function (action, rec) {
        action = action === null || action === undefined ? 'U' : action;
        rec = rec === null || rec === undefined ? {} : rec;
        console.log(rec);
        Ext.create('Ext.Praxis.view.payments.SalesComplementAmexForm.DataEntry', {
            id: prototype.id + '-dataEntry',
            params: {
                action: action,
                rec: rec,
//                lstCountry: me.lstCountry
            }
        }).show();
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


