
Ext.define('Ext.Praxis.controller.payments.ForecastPayment.ForecastPaymentController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ForecastPaymentController',
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
        prototype.id = 'ForecastPaymentForm';
        prototype.url = CONTEXTPATH + '/ForecastPayment';
        prototype.urlMaster = CONTEXTPATH + '/MasterController';
        this.childs = Ext.getCmp(prototype.id + '-panelMain').items.items;
        me.panelActual = '-boxMainData';
        global.selectedChild(me.childs, prototype.id + me.panelActual);


        this.control({
//            //   -------------------Eventos Genericos --------------------
            '#ForecastPaymentForm-xpanel': {
                afterrender: this.xpanel_afterrender
            },
            '#ForecastPaymentForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#ForecastPaymentForm-btnClear': {
                click: this.btnClear_click
            },
            '#ForecastPaymentForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#ForecastPaymentForm-btnReport': {
                click: this.btnReport_click
            },
            '#ForecastPaymentForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#ForecastPaymentForm-btnAdd': {
                click: this.btnAdd_click
            },
            '#ForecastPaymentForm-btnBack': {
                click: this.btnBack_click
            },
            '#ForecastPaymentForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#ForecastPaymentForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#ForecastPaymentForm-btn-pag-next': {
                click: this.pagNext
            },
            '#ForecastPaymentForm-btn-pag-last': {
                click: this.pagLast
            },
            '#ForecastPaymentForm-cmbDateFromYear': {
                afterrender: this.afterRenderYear,
                select: this.selectComboFromYear
            },
            '#ForecastPaymentForm-cmbDateToYear': {
                afterrender: this.afterRenderYear
            },
            '#ForecastPaymentForm-cmbDateFromMonth': {
                afterrender: this.afterRenderMonth,
                select: this.selectComboFromMonth
            },
            '#ForecastPaymentForm-cmbDateToMonth': {
                afterrender: this.afterRenderMonth,
                select: this.selectComboToMonth
            },
            '#ForecastPaymentForm-cmbDateFromDay': {
                select: this.selectComboFromDay
            }

        });
    },
    xpanel_afterrender: function (obj, e) {
        this.obtainData();
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

        var cmbFecFiltro = Ext.getCmp(prototype.id + '-cmbFecFiltro');
        cmbFecFiltro.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["SDATE", "Sale Date"]
            ]
        }));
        cmbFecFiltro.setValue("SDATE");
        
        var cmbSPAYMENT = Ext.getCmp(prototype.id + '-cmbSPAYMENT');
        cmbSPAYMENT.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "All"],
                ["CC", "Credit Card"],
                ["CH", "Cash"]
            ]
        }));
        cmbSPAYMENT.setValue("");
        
        Ext.Ajax.request({
            url: prototype.urlMaster + '/obtainData',
            method: 'POST',
            timeout: 60000000,
            params: {
                beanString: JSON.stringify({
                    COUNTRY: 2, CARD: 2
                })
            },
            success: function (response, options) {
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    Ext.getCmp(prototype.id + '-cmbCountry').bindStore(
                            Ext.create('Ext.data.Store', {data: res.lstCountry, autoLoad: true})
                            );
                    me.lstTarjetas = res.lstCard;
//                    Ext.getCmp(prototype.id + '-cmbCardType').bindStore(
//                            Ext.create('Ext.data.Store', {data: me.lstTarjetas, autoLoad: true})
//                            );
                    win.setValue('cmbCountry', '');
//                    win.setValue('cmbCardType', '');
                    me.btnSearch_click();
                } else
                    global.clear();
            },
            failure: function (response, opts) {
                console.log('server-side failure with status code ' + response.status);
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
        me.bean.IN_SCOUNTRY = Ext.getCmp(prototype.id + '-cmbCountry').getValue();
        me.bean.IN_SPAYMENT = Ext.getCmp(prototype.id + '-cmbSPAYMENT').getValue();
        me.bean.IN_TKT = Ext.getCmp(prototype.id + '-txtTKT').getValue();
        me.bean.IN_SAGENT = Ext.getCmp(prototype.id + '-txtSAGENT').getValue();
        me.bean.IN_SAUTHOC = Ext.getCmp(prototype.id + '-txtSAUTHOC').getValue();
        me.bean.IN_SPNR = Ext.getCmp(prototype.id + '-txtSPNR').getValue().trim();
        me.bean.IN_SCARDN1 = Ext.getCmp(prototype.id + '-txtCard1').getValue().trim();
        me.bean.IN_SCARDN2 = Ext.getCmp(prototype.id + '-txtCard2').getValue().trim();


        var beanString = JSON.stringify(me.bean);
        searchParams = {
            beanString: beanString,
            bean: me.bean
        };
        console.log(searchParams);
    },
    btnReport_click: function (obj, e) {
       
        
        let years = [];
        let currentYear = new Date().getFullYear();
        for (let i = currentYear - 10; i <= currentYear + 10; i++) {
            years.push(i);
        }

        var dialog = Ext.create('Ext.window.Window', {
            title: 'Generate Report',
            width: 600,
            layout: 'fit',
            bodyPadding: 10,
            bodyStyle: 'background-color: #BAE8F0;',
            modal: true,
            items: [
                {
                    xtype: 'form', // Define the form
                    border: false,
                    bodyStyle: 'background-color: #BAE8F0;',
                    items: [
                        {
                            xtype: 'textarea',
                            fieldLabel: 'Emails',
                            width: 500,
                            vtype: 'multiemail',
                            emptyText: 'prueba1@miatech.net,prueba2@miatech.net',
                            afterBodyEl: [
                                '<div style="color: black; font-size: 9px; margin-top: 0px;"><b>',
                                'Enter emails between commas',
                                '</div>'
                            ],
                            name: 'mail_notification'
                        },
                        {
                            xtype: 'combobox',
                            fieldLabel: 'Year',
                            name: 'year',
                            store: years,
                            queryMode: 'local',
                            forceSelection: true
                        },
                        {
                            xtype: 'combobox',
                            fieldLabel: 'Month',
                            name: 'month',
                            store: Ext.create('Ext.data.Store', {
                                fields: ['month', 'display'],
                                data: [
                                    {month: '01', display: 'Jan'},
                                    {month: '02', display: 'Feb'},
                                    {month: '03', display: 'Mar'},
                                    {month: '04', display: 'Apr'},
                                    {month: '05', display: 'May'},
                                    {month: '06', display: 'Jun'},
                                    {month: '07', display: 'Jul'},
                                    {month: '08', display: 'Aug'},
                                    {month: '09', display: 'Sep'},
                                    {month: '10', display: 'Oct'},
                                    {month: '11', display: 'Nov'},
                                    {month: '12', display: 'Dec'}
                                ]
                            }),
                            queryMode: 'local',
                            displayField: 'display',
                            valueField: 'month'
                        },
                        
                    ]
                }
            ],
            buttons: [
                {
                    text: 'Generar',
                    handler: function() {
                        let beanDialog = {}
                        let form = dialog.down('form').getForm();
                        let values = form.getValues();
                        let periodo = values.year + values.month; 
                        let emailValidate = true
                        console.log(values, ' wadafa');
                        beanDialog.periodo = periodo
                        beanDialog.mail_notificacion = values.mail_notification
                        let emails = values.mail_notification.split(",")
                        let countE = emails.length                            
                        for (let i = 0; i < emails.length; i++) {
                            if (!emails[i].includes("@")) {
                                emailValidate = false;
                            }
                        }
                        if( !beanDialog.periodo || beanDialog.periodo == '' || !beanDialog.mail_notificacion || beanDialog.mail_notificacion == ''){
                            global.Msg({
                                msg: 'Complete the fields'
                            });
                            return false
                        }
                        if( beanDialog.mail_notificacion != '' && !emailValidate ){
                            global.Msg({
                                msg: 'Enter the emails correctly and between commas'
                            });
                            return false
                        }
                        console.log('beandialog', beanDialog)
                        Ext.Ajax.request({
                            url: prototype.url + '/serviceReport' ,
                            method: 'POST',
                            timeout: 60000000,
                            params: {beanString: JSON.stringify(beanDialog)},
                            success: function(response, options){
                                var res = Ext.JSON.decode(response.responseText);
                                console.log(res, 'res')
                                if (res.success){
                                    console.log(res.msg, 'msg')
                                }else{
                                    console.log(res.msg, 'msg')
                                }
                            },
                            failure: function(response, opts) {
                                console.log('server-side failure with status code '+response.status);
                            }
                        });
                        dialog.hide();
                    }
                }
            ]
        });

        dialog.show();
        
    },
    btnSearch_click: function (obj, e) {  
        
        
        this.setFormatParameter();  //obtengo los Parametros
        this.setGridData();
    },

    setGridData: function () {
        win.lblUser_toolTip("Estructura: MPF074");

        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/search'  //ES LA RUTA // CONECTO AL JAVA
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
                            global.Msg({
                                msg: 'Data not found.'
                            });
                        } else {
                            var data = obj.data.items[0].data;

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

        Ext.create('Ext.Praxis.view.payments.ForecastPaymentForm.DataEntry', {
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
        Ext.getCmp(prototype.id + '-cmbDateFromYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateToYear').setValue(this.fecha.getFullYear());

        Ext.getCmp(prototype.id + '-cmbCountry').setValue('');
        Ext.getCmp(prototype.id + '-cmbSPAYMENT').setValue('');
        Ext.getCmp(prototype.id + '-txtSAGENT').setValue('');
        Ext.getCmp(prototype.id + '-txtTKT').setValue('');
        Ext.getCmp(prototype.id + '-txtCard1').setValue('');
        Ext.getCmp(prototype.id + '-txtCard2').setValue('');
        Ext.getCmp(prototype.id + '-txtSAUTHOC').setValue('');
        Ext.getCmp(prototype.id + '-txtSPNR').setValue('');
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
        console.log(me.panelActual);
        switch (me.panelActual) {
            case  '-boxMainData':
                global.getFile(prototype.url + '/getXLSX?beanString=' + encodeURI(searchParams.beanString));
                break;
                default:
                global.Msg(
                        {msg: 'Under Construction'
                        });
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