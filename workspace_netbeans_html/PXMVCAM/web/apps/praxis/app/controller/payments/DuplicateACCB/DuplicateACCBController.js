/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.payments.DuplicateACCB.DuplicateACCBController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DuplicateACCBController',
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
    beanProMasterTicket: {},
    paramsDetail: {},
    paramsTKT: {},
    dataObtain: {},
    beanTKT: {},
    dataGrid: [],
    init: function (view) {
        me = this;
        prototype.id = 'DuplicateACCBForm';
        prototype.url = CONTEXTPATH + '/DuplicateACCB';
        prototype.urlMaster = CONTEXTPATH + '/MasterController';
        this.childs = Ext.getCmp(prototype.id + '-panelMain').items.items;
        me.panelActual = '-boxMainData';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        
        prototypeProgram.view = 'payments-duplicate-accb-form';
        prototypeProgram.nprog = 'PX00000370';
        prototypeProgram.title = 'Duplicate ACCB';
        prototypeProgram.modulo = '';


        this.control({
//            //   -------------------Eventos Genericos --------------------
            '#DuplicateACCBForm-xpanel': {
                afterrender: this.xpanel_afterrender
            },
            '#DuplicateACCBForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#DuplicateACCBForm-btnClear': {
                click: this.btnClear_click
            },
            '#DuplicateACCBForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#DuplicateACCBForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#DuplicateACCBForm-btnAdd': {
                click: this.btnAdd_click
            },
            '#DuplicateACCBForm-btnBack': {
                click: this.btnBack_click
            },
            '#DuplicateACCBForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#DuplicateACCBForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#DuplicateACCBForm-btn-pag-next': {
                click: this.pagNext
            },
            '#DuplicateACCBForm-btn-pag-last': {
                click: this.pagLast
            },
//            '#DuplicateACCBForm-cmbDateFromYear': {
//                afterrender: this.afterRenderYear,
//                select: this.selectComboFromYear
//            },
//            '#DuplicateACCBForm-cmbDateToYear': {
//                afterrender: this.afterRenderYear
//            },
            '#DuplicateACCBForm-cmbDateFromMonth': {
                afterrender: this.afterRenderMonth
            },
            '#DuplicateACCBForm-cmbDateToMonth': {
                afterrender: this.afterRenderMonth
            }
//            '#DuplicateACCBForm-cmbDateFromDay': {
//                select: this.selectComboFromDay
//            }

        });
    },
    xpanel_afterrender: function (obj, e) {
        var option = Ext.getCmp(prototype.id + '-contFilter');
        option.setVisible(false);
        this.obtainData();
    },
    eventKey: function (e, eOpts) {
        if (eOpts.getKey() === 13) {
            this.btnSearch_click();
        }
    },

    BuscarTKT_keyDownHandler: function (e, eOpts) {
        var ticket = Ext.getCmp(prototype.id + '-txtTICKET').getValue();
//        if (ticket.trim() !== '') {
        if (eOpts.getKey() === 13) {
            if (ticket.trim().length === 13) {

                me.beanTKT.IN_TICKET = Ext.getCmp(prototype.id + '-txtTICKET').getValue();
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
//        }
    },

    onUpperValue: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },

    obtainData: function () {

        var storeComboDataYear = win.getStoreYear(false);
        var storeComboDataMonth = win.getStoreMonth(false);
        var storeComboDataDay = win.getStoreDays(true);

        Ext.getCmp(prototype.id + '-cmbDateFromYear').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').bindStore(storeComboDataMonth);
        Ext.getCmp(prototype.id + '-cmbDateFromDay').bindStore(storeComboDataDay);

        Ext.getCmp(prototype.id + '-cmbDateFromYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateFromDay').setValue('');


        Ext.getCmp(prototype.id + '-cmbDateToYear').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbDateToMonth').bindStore(storeComboDataMonth);
        Ext.getCmp(prototype.id + '-cmbDateToDay').bindStore(storeComboDataDay);

        Ext.getCmp(prototype.id + '-cmbDateToYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateToDay').setValue('');

        var cmbTDOC = Ext.getCmp(prototype.id + '-cmbTDOC');
        cmbTDOC.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "All"],
                ["S", "SALES"],
                ["R", "REFUNDS"]
            ]
        }));
        cmbTDOC.setValue("");

        var cmbFTEA = Ext.getCmp(prototype.id + '-cmbFTEA');
        cmbFTEA.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "All"],
                ["B", "Billed"],
                ["N", "No Billed"],
                ["L", "Local"]
            ]
        }));
        cmbFTEA.setValue("");

        this.dataObtain.COUNTRY = 2;
        Ext.Ajax.request({
            url: prototype.urlMaster + '/obtainData',
            method: 'POST',
            timeout: 60000000,
//            beforerequest: Ext.getCmp(prototype.id + '-boxMainData').mask('Loading...'),
            params: {
                beanString: JSON.stringify(this.dataObtain)},
            success: function (response, options) {
//                Ext.getCmp(prototype.id + '-boxMainData').unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);

                var lstCountry = res.lstCountry;
                var storeData = Ext.create('Ext.data.Store', {
                    data: lstCountry,
                    autoLoad: true
                });


                Ext.getCmp(prototype.id + '-cmbCOUNTRY').bindStore(storeData);
                Ext.getCmp(prototype.id + '-cmbCOUNTRY').setValue('');
                me.btnSearch_click();
            }
        });
    },

    setFormatParameter: function () {
//        me.bean = {};

        me.bean.IN_FECHA_FROM = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue() +
                Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue() +
                Ext.getCmp(prototype.id + '-cmbDateFromDay').getValue();

        me.bean.IN_FECHA_TO = Ext.getCmp(prototype.id + '-cmbDateToYear').getValue() +
                Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue() +
                Ext.getCmp(prototype.id + '-cmbDateToDay').getValue();

        me.bean.IN_COUNTRY = Ext.getCmp(prototype.id + '-cmbCOUNTRY').getValue();
        me.bean.IN_AGENT = Ext.getCmp(prototype.id + '-txtAGENTE').getValue();
        me.bean.IN_TICKET = Ext.getCmp(prototype.id + '-txtTICKET').getValue();
        me.bean.IN_TDOC = Ext.getCmp(prototype.id + '-cmbTDOC').getValue( );
        me.bean.IN_FTE = Ext.getCmp(prototype.id + '-cmbFTEA').getValue();

//        var str = Ext.getCmp(prototype.id + '-chkDpli').getValue();

//        var beanString = JSON.stringify(me.bean);
//        searchParams = {
//            beanString: beanString,
//            bean: me.bean
//        };
    },

    btnSearch_click: function (obj, e) {

        me.bean = {};
        var tkt = Ext.getCmp(prototype.id + '-txtTICKET').getValue();

        if (tkt.trim() !== '') {
            if (tkt.trim().length === 13) {

                me.beanTKT = {};
                me.beanTKT.IN_TICKET = tkt;
                var beanString = JSON.stringify(me.beanTKT);
                me.paramsTKT = {
                    beanString: beanString,
                    beanTKT: me.beanTKT
                };
                this.setGridDataTKT();
            } else {
                global.Msg({
                    msg: 'Ticket number must contain 13 digits.'
                });
            }
        } else {
            dup = Ext.getCmp(prototype.id + '-chkDpli').getValue();
            if (dup) {
                me.bean.strOrden = '1';
                this.setFormatParameter();
                me.paramsDetail.beanString = JSON.stringify(me.bean);
            } else {
                me.bean.strOrden = '0';
                this.setFormatParameter();
                me.paramsDetail.beanString = JSON.stringify(me.bean);
            }
            this.setGridData();
        }
    },

    setGridData: function () {
        win.lblUser_toolTip("Estructura: A2271");

        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/search'
            }, listeners: {
                beforeload: function (obj) {
                    Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');
                    obj.proxy.extraParams = me.paramsDetail;
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

                        if (dup) {
                            me.panelActual = '-boxMainDataDupli';
                            global.selectedChild(me.childs, prototype.id + me.panelActual);
                            Ext.getCmp(prototype.id + '-dblAMOUNTDupli').setText(Ext.util.Format.number(data.dblAMOUNT, '0,000'));

                        } else {
                            me.panelActual = '-boxMainData';
                            global.selectedChild(me.childs, prototype.id + me.panelActual);
                            Ext.getCmp(prototype.id + '-dblAMOUNT').setText(Ext.util.Format.number(data.dblAMOUNT, '0,000'));
                        }
                    }
                    me.setWidthPie();
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridMainData').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridDataDupli').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
    },

    setGridDataTKT: function () {
        win.lblUser_toolTip("Estructura: A2271");

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
                        console.log(data);
                        if (dup) {
                            me.panelActual = '-boxMainDataDupli';
                            global.selectedChild(me.childs, prototype.id + me.panelActual);
                            Ext.getCmp(prototype.id + '-dblAMOUNTDupli').setText(Ext.util.Format.number(data.dblAMOUNT, '0,000'));

                        } else {
                            me.panelActual = '-boxMainData';
                            global.selectedChild(me.childs, prototype.id + me.panelActual);
                            Ext.getCmp(prototype.id + '-dblAMOUNT').setText(Ext.util.Format.number(data.dblAMOUNT, '0,000'));
                        }
                        Ext.getCmp(prototype.id + '-dblAMOUNT').setText(Ext.util.Format.number(data.dblAMOUNT, '0,000'));
                    }
                    me.setWidthPie();
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridMainData').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridDataDupli').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
    },
    
    gridData_VIEWTKT_clickHandler: function (column, e, row, column, x, rowData) {
        var data = x.record.data;
        var strTkt = data.DOCNUM;
        
        this.beanProMasterTicket.IN_CIA = strTkt.substr(0, 3);
        this.beanProMasterTicket.IN_FORMA = strTkt.substr(3, 4);
        this.beanProMasterTicket.IN_SERIE = strTkt.substr(7, 7);
//        beanProMasterTicket.IN_SEQ = '00';
        console.log(this.beanProMasterTicket);

        win.displayProMasterTicket(this, 'ViewDuplicateACCB', this.beanProMasterTicket);
    },

    validateFields: function () {
        var msj = '';
        var bean = searchParams.bean;

        return msj;
    },
    btnAdd_click: function () {
        this.winDataEntry('I');
    },
//    onEditClick: function(grid, rowIndex, colIndex) {
//        var rec = grid.getStore().getAt(rowIndex);
//        this.winDataEntry('U', rec);
//    },
    onEditClick: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        this.winDataEntry('U', rec);
    },
    winDataEntry: function (action, rec) {
        action = action === null || action === undefined ? 'U' : action;
        rec = rec === null || rec === undefined ? {} : rec;

        Ext.create('Ext.Praxis.view.payments.DuplicateACCBForm.DataEntry', {
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
        Ext.getCmp(prototype.id + '-txtAGENTE').setValue('');
        Ext.getCmp(prototype.id + '-txtTICKET').setValue('');
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
        me.bean = {};
        this.setFormatParameter();
        if (dup) {
            me.bean.strOrden = '1';
            me.paramsDetail.beanString = JSON.stringify(me.bean);
        } else {
            me.bean.strOrden = '0';
            me.paramsDetail.beanString = JSON.stringify(me.bean);
        }

        switch (me.panelActual) {
            case  '-boxMainData':
                global.getFile(prototype.url + '/getXLSX?beanString=' + me.paramsDetail.beanString);
                break;

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
            case  '-boxMainData':
                me.pagginActual = '-paggin';
                break;
            case '-boxMainDataDupli':
                me.pagginActual = '-paggin2';
                break;
        }
    },
    afterRenderYear: function (obj) {
        obj.setValue(this.fecha.getFullYear());
    },
    afterRenderMonth: function (obj) {
        var month = this.fecha.getMonth() + 1;
        if (month < 9) {
            obj.setValue('0' + month);
        } else {
            obj.setValue((month));
        }
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