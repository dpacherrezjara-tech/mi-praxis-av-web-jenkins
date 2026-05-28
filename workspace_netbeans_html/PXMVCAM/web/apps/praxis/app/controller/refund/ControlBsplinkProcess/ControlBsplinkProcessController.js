
Ext.define('Ext.Praxis.controller.refund.ControlBsplinkProcess.ControlBsplinkProcessController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ControlBsplinkProcessController',
    fecha: new Date(),
    childs: '5',
    bean: '',
    paginActual: '',
    drillDown: [],
    lstCountry: [],
    lstBank: [],
    gridActual: '',
    panelActual: '',
    fileName: '',
    me: '',
    searchParams: {},
    paramsDetail: {},
    dataObtain: {},

    init: function (view) {
        me = this;
        prototype.id = 'ControlBsplinkProcessForm';
        prototype.url = CONTEXTPATH + '/ControlBsplinkProcess';
        this.childs = Ext.getCmp(prototype.id + '-panelMain').items.items;
        me.panelActual = '-panelMainAvianca';
        global.selectedChild(me.childs, prototype.id + me.panelActual);


        this.control({
            //   -------------------Eventos Genericos --------------------
            '#ControlBsplinkProcessForm-xpanel': {
                afterrender: this.xpanel_afterrender
            },
            '#ControlBsplinkProcessForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#ControlBsplinkProcessForm-btnClear': {
                click: this.btnClear_click
            },
            '#ControlBsplinkProcessForm-btnExcel': {
                click: this.btnClear_click
            },

            '#ControlBsplinkProcessForm-btnExcelAv': {
                click: this.imgExcel_clickHandlerAV
            },

            '#ControlBsplinkProcessForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#ControlBsplinkProcessForm-btnAdd': {
                click: this.btnAdd_click
            },
            '#ControlBsplinkProcessForm-btnBack': {
                click: this.btnBack_click
            },
            '#ControlBsplinkProcessForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#ControlBsplinkProcessForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#ControlBsplinkProcessForm-btn-pag-next': {
                click: this.pagNext
            },
            '#ControlBsplinkProcessForm-btn-pag-last': {
                click: this.pagLast
            },
            '#ControlBsplinkProcessForm-cmbDateFromYear': {
                afterrender: this.afterRenderYear
            },
            '#ControlBsplinkProcessForm-cmbDateFromMonth': {
                afterrender: this.afterRenderMonth,
                select: this.selectComboFromMonth
            },
            '#ControlBsplinkProcessForm-cmbDateToYear': {
                afterrender: this.afterRenderYear
            },
            '#ControlBsplinkProcessForm-cmbDateToMonth': {
                afterrender: this.afterRenderMonth
            },
            '#ControlBsplinkProcessForm-cmbDateFromDay': {
                afterrender: this.afterRenderDay,
                select: this.selectComboFromDay
            },
            '#ControlBsplinkProcessForm-cmbDateToDay': {
                afterrender: this.afterRenderDay
            }
            //-----------------Eventos Especificos -------------------    
        });
    },

    xpanel_afterrender: function (obj, e) {
        this.setStoreData();
        this.btnSearch_click();
//        this.obtainData();


    },

    afterRenderYear: function (obj) {
        obj.setValue(me.fecha.getFullYear());
    },
    afterRenderMonth: function (obj) {
        obj.setValue('');

    },
    selectComboFromMonth: function (obj) {
        var comboToMonth = Ext.getCmp(prototype.id + '-cmbDateToMonth');
        comboToMonth.setValue(obj.getValue());
    },
    selectComboFromDay: function (obj) {
        var comboToDay = Ext.getCmp(prototype.id + '-cmbDateToDay');
        comboToDay.setValue(obj.getValue());
    },
    afterRenderDay: function (obj) {
        obj.setValue('');
    },

    setStoreData: function () {


        var storeComboDataYear = win.getStoreYear(false);
        Ext.getCmp(prototype.id + '-cmbDateFromYear').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbDateToYear').bindStore(storeComboDataYear);
        var storeComboDataMonth = win.getStoreMonth(true);
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').bindStore(storeComboDataMonth);
        Ext.getCmp(prototype.id + '-cmbDateToMonth').bindStore(storeComboDataMonth);
        var storeComboDataDay = win.getStoreDays(true);
        Ext.getCmp(prototype.id + '-cmbDateFromDay').bindStore(storeComboDataDay);
        Ext.getCmp(prototype.id + '-cmbDateToDay').bindStore(storeComboDataDay);


    },

    eventKey: function (e, eOpts) {
        if (eOpts.getKey() === 13) {
            this.btnSearch_click();
        }
    },
    onUpperValue: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },

    btnSearch_click: function (obj, e) {
        this.setFormatParameter();
        this.setGridDataAvianca();


    },

    setFormatParameter: function () {

        me.bean = {};

        var monthFrom = Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue();
        var monthTo = Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue();
        var dayFrom = Ext.getCmp(prototype.id + '-cmbDateFromDay').getValue();
        var dayTo = Ext.getCmp(prototype.id + '-cmbDateToDay').getValue();
        monthFrom = monthFrom.toString().length === 1 ? "0" + monthFrom : monthFrom;

        monthTo = monthTo.toString().length === 1 ? "0" + monthTo : monthTo;

        dayFrom = dayFrom.toString().length === 1 ? "0" + dayFrom : dayFrom;

        dayTo = dayTo.toString().length === 1 ? "0" + dayTo : dayTo;

        me.bean = {};
        me.bean.IN_DATEFROM = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue() + "" + monthFrom + ""
                + dayFrom;
        me.bean.IN_DATETO = Ext.getCmp(prototype.id + '-cmbDateToYear').getValue() + "" + monthTo + ""
                + dayTo;

        var beanString = JSON.stringify(me.bean);

        var params = {
            beanString: beanString,
            bean: me.bean
        };
        return params;

    },

    setGridDataAvianca: function () {

        //this.showGrid('-panelMainAvianca');
        me.panelActual = '-panelMainAvianca';

        global.selectedChild(
                me.childs,
                prototype.id + me.panelActual
                );
        var parameters = this.setFormatParameter();
        me.searchParams = parameters.bean;
        console.log(parameters);

        var storeGridData = Ext.create('Ext.Praxis.store.refund.GridData', {
            proxy: {
                url: prototype.url + '/searchAvianca'
            }, listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = {
                        beanString: parameters.beanString
                    };
                },
                load: function (obj) {
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    } else {
                        console.log(obj.data);
                    }
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridDataAvianca').bindStore(storeGridData);
        Ext.getCmp(prototype.id + '-gridDataAvianca').setStore(storeGridData);
    },

    onClickDetailAvianca: function (IN_A4547FLAG, cmp, cpm2, numRow, numCol, cpm3, rowData) {
        var params = {
            A3096DAUTH: rowData.data.A3096DAUTH,
            IN_A4547FLAG: IN_A4547FLAG,
            IN_SEQ: rowData.data.A3096RBT1
        };

        me.searchParams = JSON.stringify(params);


        //  PANEL ACTUAL
        me.drillDown.push(me.panelActual);

        //  DETAIL
        me.panelActual = '-panelMainAviancaDetail';

        global.selectedChild(
                me.childs,
                prototype.id + me.panelActual
                );

        var storeGridData = Ext.create('Ext.Praxis.store.refund.GridData', {
            proxy: {
                url: prototype.url + '/searchStatusBSPLinkAvianca'
            }, listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = {beanString: me.searchParams, dw_excel: false};
                },
                load: function (obj) {
                    if (obj.data.items.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    } else {
                        console.log(obj.data);
                        //Ext.getCmp(prototype.id + '-lblRowsTotal').setText(Ext.util.Format.number(pagData.total, '0,000'));
                    }
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridDataAviancaDetail').bindStore(storeGridData);


    },

    imgExcel_clickHandlerAV: function (obj, e) {
        var win = Ext.create('Ext.window.Window', {
            title: 'Select Date and Sequence',
            modal: true,
            header: {
                style: `
                    background: #1976D2;
                    color: white;
                    font-size: 14px;
                    font-weight: bold;
                `
                        },
            width: 250,
            bodyPadding: 10,
            resizable: false,
            closable: true,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            bodyStyle: 'background-color: #F9FAFB; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.15);',
            defaults: {
                labelAlign: 'right',
                labelWidth: 60,
                margin: '7 0 10 0',
                style: 'background-color:white; border-radius:6px;'
            },
            items: [
                {
                    xtype: 'combo',
                    fieldLabel: 'Year',
                    queryMode: 'local',
                    editable: false,
                    valueField: 'code',
                    displayField: 'name',
                    store: Ext.create('Ext.data.Store', {
                        fields: ['code', 'name'],
                        data: [
                            {code: '2025', name: '2025'},
                            {code: '2026', name: '2026'},
                            {code: '2027', name: '2027'},
                            {code: '2028', name: '2028'}
                        ]
                    }),
                    value: new Date().getFullYear().toString(),
                    itemId: 'cmbYear'
                },
                {
                    xtype: 'combo',
                    fieldLabel: 'Month',
                    queryMode: 'local',
                    editable: false,
                    valueField: 'code',
                    displayField: 'name',
                    store: Ext.create('Ext.data.Store', {
                        fields: ['code', 'name'],
                        data: [
                            {code: '01', name: 'January'},
                            {code: '02', name: 'February'},
                            {code: '03', name: 'March'},
                            {code: '04', name: 'April'},
                            {code: '05', name: 'May'},
                            {code: '06', name: 'June'},
                            {code: '07', name: 'July'},
                            {code: '08', name: 'August'},
                            {code: '09', name: 'September'},
                            {code: '10', name: 'October'},
                            {code: '11', name: 'November'},
                            {code: '12', name: 'December'}
                        ]
                    }),
                    value: Ext.String.leftPad(new Date().getMonth() + 1, 2, '0'),
                    itemId: 'cmbMonth'
                },
                {
                    xtype: 'combo',
                    fieldLabel: 'Day',
                    queryMode: 'local',
                    editable: false,
                    valueField: 'code',
                    displayField: 'name',
                    store: Ext.create('Ext.data.Store', {
                        fields: ['code', 'name'],
                        data: Array.from({length: 31}, (v, i) => {
                            const day = String(i + 1).padStart(2, '0');
                            return {code: day, name: day};
                        })
                    }),
                    value: Ext.String.leftPad(new Date().getDate(), 2, '0'),
                    itemId: 'cmbDay'
                },
                {
                    xtype: 'combo',
                    fieldLabel: 'Sequence',
                    queryMode: 'local',
                    editable: false,
                    valueField: 'code',
                    displayField: 'name',
                    store: Ext.create('Ext.data.Store', {
                        fields: ['code', 'name'],
                        data: Array.from({length: 11}, (v, i) => {
                            const seq = String(i).padStart(2, '0');
                            return {code: seq, name: seq};
                        })
                    }),
                    value: '00',
                    itemId: 'cmbSequence'
                }
            ],

            buttonAlign: 'center',

            fbar: {
                style: `
                        background: #5C92CC;
                        border-top: 1px solid #B7C9DC;
                        padding: 14px;
                    `,
                layout: {
                    pack: 'center'
                },
                items: [

                    {
                        text: 'Generate',
                        iconCls: 'x-fa fa-file-excel',
                        scale: 'medium',
                        style: `
                                background-color: #1976D2;
                                color: red;
                                font-weight: bold;
                                border-radius: 6px;
                                padding: 2px 11px;
                                border: none;
                            `,
                        handler: function () {

                            var year = win.down('#cmbYear').getValue(),
                                    month = win.down('#cmbMonth').getValue(),
                                    day = win.down('#cmbDay').getValue(),
                                    seq = win.down('#cmbSequence').getValue();

                            if (!year || !month || !day || !seq) {
                                Ext.Msg.alert('Error', 'Please select Year, Month, Day, and Sequence.');
                                return;
                            }

                            var fecha = year + month + day;

                            this.btnExcel_clickAVE(fecha, seq);

                            win.close();
                        },
                        scope: this
                    },
                    {
                        text: 'Cancel',
                        iconCls: 'x-fa fa-times',
                        scale: 'medium',
                        style: `
                                background-color: #90A4AE;
                                color: red;
                                font-weight: bold;
                                border-radius: 6px;
                                padding: 2px 11px;
                                border: none;
                                margin-left: 10px;
                            `,
                        handler: function () {
                            win.close();
                        }
                    }

                ]
            }


        });

        win.show();
    },

    btnExcel_clickAVE: function (fecha, seq) {

        let aviancaObject = {};

        aviancaObject.FCARGAVIANCA = fecha;
        aviancaObject.IN_SEQ = seq;

        console.log(aviancaObject);
        var beanString = JSON.stringify(aviancaObject);
        var paramDetail = {
            beanString: beanString
        };

        var beanString = JSON.stringify(aviancaObject);
        console.log(beanString, 'PERR');
        global.getFile(
                prototype.url +
                '/excelStatusBSPLinkAviancaToAvianca?beanString=' +
                encodeURIComponent(beanString)
                );
    },

    validateFields: function () {
        var msj = '';
        var bean = me.bean;

        return msj;
    },
    btnAdd_click: function () {
        this.winDataEntry('I');
    },

    ///data entry ingreso ///

    onEditClick: function (grid, rowIndex, colIndex) {

        var rec = grid.getStore().getAt(rowIndex);
        this.winDataEntry('U', rec);
    },

    btnBack_click: function (obj, e) {

        if (me.drillDown.length > 0) {
            me.panelActual = me.drillDown.pop();
            global.selectedChild(me.childs, prototype.id + me.panelActual);

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

        Ext.getCmp(prototype.id + '-cmbDateFromMonth')?.setValue('');
        Ext.getCmp(prototype.id + '-cmbDateFromDay')?.setValue('');
        Ext.getCmp(prototype.id + '-cmbDateToMonth')?.setValue('');
        Ext.getCmp(prototype.id + '-cmbDateToDay')?.setValue('');



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

        this.setFormatParameter();

        switch (me.panelActual) {

            case '-panelMainAvianca':

                global.getFile(
                        prototype.url +
                        '/getXLSX?beanString=' +
                        encodeURI(JSON.stringify(me.bean))
                        );

                break;

            case '-panelMainAviancaDetail':

                global.getFile(
                        prototype.url +
                        '/getXLSXDetail?beanString=' +
                        encodeURI(me.searchParams)
                        );

                break;

            default:

                global.Msg({
                    msg: 'Under Construction'
                });
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
//    setWidthPie: function () {
//        var ancho = Ext.getCmp(prototype.id + me.panelActual).getWidth();
//        Ext.getCmp(prototype.id + '-pie').setWidth(ancho);
//    },
    getPaggin: function () {
        me.pagginActual = '';
        switch (me.panelActual) {
            case  '-panelGridData':
                me.pagginActual = '-paggin';
                break;
        }
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
    }


}
);
