
Ext.define('Ext.Praxis.controller.payments.BSPLink.BSPLinkController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.BSPLinkController',
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
    paramsDetail: {},
    paramsTKT: {},
    dataObtain: {},
    beanTKT: {},
    dataGrid: [],
    init: function (view) {
        me = this;
        prototype.id = 'BSPLinkForm';
        prototype.url = CONTEXTPATH + '/BSPLink';
        prototype.urlMaster = CONTEXTPATH + '/MasterController';
        this.childs = Ext.getCmp(prototype.id + '-panelMain').items.items;
        me.panelActual = '-boxMainData';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        this.control({
//            //   -------------------Eventos Genericos --------------------
            '#BSPLinkForm-xpanel': {
                afterrender: this.xpanel_afterrender
            },
            '#BSPLinkForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#BSPLinkForm-btnClear': {
                click: this.btnClear_click
            },
            '#BSPLinkForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#BSPLinkForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#BSPLinkForm-btnAdd': {
                click: this.btnAdd_click
            },
            '#BSPLinkForm-btnBack': {
                click: this.btnBack_click
            },
            '#BSPLinkForm-cmbDateFromMonth': {
                afterrender: this.afterRenderMonth,
                select: this.selectComboFromMonth
            },
            '#BSPLinkForm-cmbDateToMonth': {
                afterrender: this.afterRenderMonth,
                select: this.selectComboToMonth
            },
            '#BSPLinkForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#BSPLinkForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#BSPLinkForm-btn-pag-next': {
                click: this.pagNext
            },
            '#BSPLinkForm-btn-pag-last': {
                click: this.pagLast
            }

        });
    },
    xpanel_afterrender: function (obj, e) {
        this.obtainData();
        this.HabilitarCampo();
    },
    
    DeshabilitarCampo: function() {
        Ext.getCmp(prototype.id + '-cmbDateFromYear').disable();
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').disable();
        Ext.getCmp(prototype.id + '-cmbDateFromDay').disable();
        Ext.getCmp(prototype.id + '-cmbDateToYear').disable();
        Ext.getCmp(prototype.id + '-cmbDateToMonth').disable();
        Ext.getCmp(prototype.id + '-cmbDateToDay').disable();
        Ext.getCmp(prototype.id + '-cmbPERNUM').disable();
        Ext.getCmp(prototype.id + '-cmbPROCIND').disable();
        Ext.getCmp(prototype.id + '-cmbCode').disable();
        Ext.getCmp(prototype.id + '-cmbTRANSTYPE').disable();
        Ext.getCmp(prototype.id + '-txtAGENTE').disable();
    },
    
    HabilitarCampo: function() {
        Ext.getCmp(prototype.id + '-cmbDateFromYear').enable();
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').enable();
        Ext.getCmp(prototype.id + '-cmbDateFromDay').enable();
        Ext.getCmp(prototype.id + '-cmbDateToYear').enable();
        Ext.getCmp(prototype.id + '-cmbDateToMonth').enable();
        Ext.getCmp(prototype.id + '-cmbDateToDay').enable();
        Ext.getCmp(prototype.id + '-cmbPERNUM').enable();
        Ext.getCmp(prototype.id + '-cmbPROCIND').enable();
        Ext.getCmp(prototype.id + '-cmbCode').enable();
        Ext.getCmp(prototype.id + '-cmbTRANSTYPE').enable();
        Ext.getCmp(prototype.id + '-txtAGENTE').enable();
    },
    
    eventKey: function (e, eOpts) {
        if (eOpts.getKey() === 13) {
            this.btnSearch_click();
        }
    },
    
    BuscarTKT_keyDownHandler: function (e, eOpts) {
        var ticket = Ext.getCmp(prototype.id + '-txtTKT').getValue();
        
        switch (eOpts.getKey()) {
            case  13:
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
                
                if(ticket.trim() !== ''){
                    this.DeshabilitarCampo();
                }
                break;
            case 8:
                this.HabilitarCampo();
                break;
            case 32:
                this.HabilitarCampo();
                break;
            case 46:
                this.HabilitarCampo();
                break;
        }
        
        if(ticket.trim() === ''){
            this.HabilitarCampo();
	} 
        
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

        var cmbPERNUM = Ext.getCmp(prototype.id + '-cmbPERNUM');
        cmbPERNUM.bindStore(Ext.create('Ext.data.ArrayStore', {
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
        cmbPERNUM.setValue("");

        var cmbPROCIND = Ext.getCmp(prototype.id + '-cmbPROCIND');
        cmbPROCIND.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "All"],
                ["1", "1 - BILLED ELECTRONICALLY"],
                ["2", "2 - BILLED ELECTRONICALLY"],
                ["3", "3"],
                ["4", "4 - NOT PRESENTED TO CARD COMPANY"]
            ]
        }));
        cmbPROCIND.setValue("");
        
        var cmbTRANSTYPE = Ext.getCmp(prototype.id + '-cmbTRANSTYPE');
        cmbTRANSTYPE.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["S", "SALES"],
                ["R", "REFUNDS"]
            ]
        }));
        cmbTRANSTYPE.setValue("S");

        this.dataObtain.CARD = 2;
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

                var lstCard = res.lstCard;
                var storeData = Ext.create('Ext.data.Store', {
                    data: lstCard,
                    autoLoad: true
                });

                Ext.getCmp(prototype.id + '-cmbCode').bindStore(storeData);
                Ext.getCmp(prototype.id + '-cmbCode').setValue('');
                me.btnSearch_click();
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

        me.bean.PERIOD = Ext.getCmp(prototype.id + '-cmbPERNUM').getValue();
        me.bean.PROCIND = Ext.getCmp(prototype.id + '-cmbPROCIND').getValue();
        me.bean.ENTITY = Ext.getCmp(prototype.id + '-cmbCode').getValue();
        me.bean.AGENTE = Ext.getCmp(prototype.id + '-txtAGENTE').getValue( );
        me.bean.TRANSTYPE = Ext.getCmp(prototype.id + '-cmbTRANSTYPE').getValue();
                
        var beanString = JSON.stringify(me.bean);
        searchParams = {
            beanString: beanString,
            bean: me.bean
        };
    },
    
    btnSearch_click: function (obj, e) {
        var tkt = Ext.getCmp(prototype.id + '-txtTKT').getValue();
        this.HabilitarCampo();
        if (tkt.trim() !== '') {
            if (tkt.trim().length === 13) {
                
                me.beanTKT.IN_TKT = tkt
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
        } else {
            this.setFormatParameter();
            this.setGridData();
        }
    },

    setGridData: function () {
        win.lblUser_toolTip("Estructura: A2282");
        me.panelActual = '-boxMainData';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
//        me.setWidthPie();
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        }
        else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/search'
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
                            Ext.getCmp(prototype.id + '-TOTdblAmount').setText('');
                            global.Msg({
                                msg: 'Data not found.'
                            });
                        } 
                        else {
                            var data = obj.data.items[0].data;
                            Ext.getCmp(prototype.id + '-TOTdblAmount').setText(Ext.util.Format.number(data.TOTdblAmount, '0,000'));
                        }
                        me.setWidthPie();
                    }
                }
            });
            global.clear();
            Ext.getCmp(prototype.id + '-gridMainData').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
        }
    },
    
    setGridDataTKT: function () {
        win.lblUser_toolTip("Estructura: A2282");
        me.panelActual = '-boxTKT';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
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
//                            console.log(data);
                        }
                    }
                }
            });
            global.clear();
            Ext.getCmp(prototype.id + '-gridTKT').bindStore(storeGridDatas);
    },

    validateFields: function () {
        var msj = '';
        var bean = searchParams.bean;

        return msj;
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
        Ext.getCmp(prototype.id + '-cmbPERNUM').setValue('');
        Ext.getCmp(prototype.id + '-cmbPROCIND').setValue('');
        Ext.getCmp(prototype.id + '-cmbCode').setValue('');
        Ext.getCmp(prototype.id + '-txtAGENTE').setValue('');
        Ext.getCmp(prototype.id + '-txtTKT').setValue('');
        Ext.getCmp(prototype.id + '-cmbDateFromYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateToYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').setValue('');
        Ext.getCmp(prototype.id + '-cmbDateToMonth').setValue('');
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
                
        switch (me.panelActual) {
            case  '-boxMainData':
                global.getFile(prototype.url + '/getXLSX?beanString=' + searchParams.beanString);
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
            case '-boxTKT':
                me.pagginActual = '-paggin2';
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
    
    pagFirst: function(obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.moveFirst();
    }, pagPrevious: function(obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.movePrevious();
    },
    pagNext: function(obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.moveNext();
    },
    pagLast: function(obj, e) {
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