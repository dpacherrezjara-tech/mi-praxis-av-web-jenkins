
Ext.define('Ext.Praxis.controller.refund.RefundInputs.RefundInputsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.RefundInputsController',
    fecha: new Date(),
    childs: '5',
    bean: '',
//    beanTicket: {},
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
        prototype.id = 'RefundInputsForm';
        prototype.url = CONTEXTPATH + '/RefundInputs';
        this.childs = Ext.getCmp(prototype.id + '-panelMain').items.items;
        me.panelActual = '-vskMain';
        global.selectedChild(me.childs, prototype.id + me.panelActual);


        this.control({
            //   -------------------Eventos Genericos --------------------
            '#RefundInputsForm-xpanel': {
                afterrender: this.xpanel_afterrender
            },
            '#RefundInputsForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#RefundInputsForm-btnClear': {
                click: this.btnClear_click
            },
            '#RefundInputsForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#RefundInputsForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#RefundInputsForm-btnAdd': {
                click: this.btnAdd_click
            },
            '#RefundInputsForm-btnBack': {
                click: this.btnBack_click
            },
            '#RefundInputsForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#RefundInputsForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#RefundInputsForm-btn-pag-next': {
                click: this.pagNext
            },
            '#RefundInputsForm-btn-pag-last': {
                click: this.pagLast
            },
            '#RefundInputsForm-cmbDateFromYear': {
                afterrender: this.afterRenderYear
            }
            //-----------------Eventos Especificos -------------------    
        });
    },

    xpanel_afterrender: function (obj, e) {
        this.setStoreData();
        this.setFormatParameter();
        this.search();


    },

    setStoreData: function () {

        var storeComboDataYear =
                win.getStoreYear(false);

        Ext.getCmp(
                prototype.id + '-cmbDateFromYear'
                ).bindStore(storeComboDataYear);
    },

    afterRenderYear: function (obj) {

        obj.setValue(me.fecha.getFullYear());

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

        this.search();


    },

    setFormatParameter: function () {

        me.bean = {};

        me.bean.IN_YEAR =
                Ext.getCmp(
                        prototype.id + '-cmbDateFromYear'
                        ).getValue();

        me.searchParams =
                JSON.stringify(me.bean);

        return {
            beanString: me.searchParams,
            bean: me.bean
        };
    },

    search: function () {

        let lstData = [];
        me.drillDown = [];
        //this.showGrid('-vskMain');
        me.panelActual = '-vskMain';
        var storeGridDatas = Ext.create('Ext.Praxis.store.refund.GridData', {
            proxy: {
                url: prototype.url + '/searchV1'
            }, listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = {beanString: me.searchParams, dw_excel: false};
                },
                load: function (obj) {

                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    }
                }
            }
        });

        Ext.getCmp(prototype.id + '-gridData').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridData').setStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);



    },

    //DETAIL 1

    onViewDataDetail: function (column, e, row, column, x, rowData) {
        let processDate = rowData.data.FCARG
        Ext.getCmp(prototype.id + '-vskMain').mask('Loading...');
        var getYear = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue();

        var paramsDetail = {};

        paramsDetail.IN_YEAR = processDate;

        me.searchParams =
                JSON.stringify(paramsDetail);
        //this.showGrid('-detailTicket2');
        me.drillDown.push(me.panelActual);
        me.panelActual = '-detailTicket2';
        global.selectedChild(
                me.childs,
                prototype.id + me.panelActual
                );
        console.log(paramsDetail, 'paramsDetailAAAA');
        this.obtainData();


    },

    obtainData: function (paramsDetail) {
        var storeGridDatas12 = Ext.create('Ext.Praxis.store.refund.GridData', {
            proxy: {
                url: prototype.url + '/searchTktDetail'
            }, listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = {beanString: me.searchParams, dw_excel: false};
                },
                load: function (obj) {
                    console.log(obj, 'obj')
                    if (obj.data.items.length === 0) {
                        Ext.getCmp(prototype.id + '-vskMain').unmask('Loading...');
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    } else {
                        Ext.getCmp(prototype.id + '-vskMain').unmask('Loading...');
                        var pag = Ext.getCmp(prototype.id + '-paggin');
                        var pagData = pag.getPageData();
                        Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                    }
                }
            }
        });

        Ext.getCmp(prototype.id + '-gridDataDetailTicketRTS2').bindStore(storeGridDatas12);
        Ext.getCmp(prototype.id + '-gridDataDetailTicketRTS2').setStore(storeGridDatas12);
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas12);
    },

////////////////////////////////////////////////////
// DETALLE 2



    onViewDataDetail2: function (column, e, row, column, x, rowData) {




        var paramsDetail = {};

        paramsDetail.IN_FCARGA = rowData.data.FCARG;

        paramsDetail.IN_SEQ = rowData.data.A5003SEQ;

        paramsDetail.IN_STATUS = column;

        me.searchParamsDetail = JSON.stringify(paramsDetail);

        me.drillDown.push(me.panelActual);

        me.panelActual = '-detailTicket';


        global.selectedChild(me.childs,prototype.id + me.panelActual);
        Ext.getCmp(prototype.id + '-boxPag').show();

        this.obtainData2();

        //Ext.getCmp(prototype.id + '-txtTICKET').enable();

    },

    obtainData2: function (paramsDetail) {
        console.log(paramsDetail, 'paramsDetail');
        var storeGridDatas12 = Ext.create('Ext.Praxis.store.refund.GridData', {
            proxy: {
                url: prototype.url + '/searchTktDetailAll'
            }, listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = {beanString: me.searchParamsDetail, dw_excel: false};
                },
                load: function (obj) {
                    console.log(obj, 'obj')
                    if (obj.data.length === 0) {
                        Ext.getCmp(prototype.id + '-vskMain').unmask('Loading...');
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    } else {
                        Ext.getCmp(prototype.id + '-vskMain').unmask('Loading...');
                        var pag = Ext.getCmp(prototype.id + '-paggin');
                        var pagData = pag.getPageData();
                        Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                    }
                }
            }
        });


        Ext.getCmp(prototype.id + '-gridDataDetailTicket').bindStore(storeGridDatas12);
        Ext.getCmp(prototype.id + '-gridDataDetailTicket').setStore(storeGridDatas12);
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas12);
    },

    //////////////////////////////////////////////

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
//    winDataEntry: function(action, rec) {
//        action = action === null || action === undefined ? 'U' : action;
//        rec = rec === null || rec === undefined ? {} : rec;       
//        
//        console.log(rec,'PRUEBA MESAJE');
//        
//        Ext.create('Ext.Praxis.view.payments.PaymentScheduleForm.DataEntry', {
//            id: prototype.id + '-dataEntry',
//            params: {
//                action: action,
//                rec: rec.data,
//                listaPaises : me.lstCountry,
//                
//                lst:me.lst
//            }
//        }).show();
//    },
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
    setWidthPie: function () {

    var ancho = Ext.getCmp(
        prototype.id + me.panelActual
    ).getWidth();

    var pie = Ext.getCmp(
        prototype.id + '-pie'
    );

    if (pie) {
        pie.setWidth(ancho);
    }
},
    getPaggin: function () {

        me.pagginActual = '';

        switch (me.panelActual) {

            case '-vskMain':

                me.pagginActual = '-paggin';
                break;

            case '-detailTicket2':

                me.pagginActual = '-paggin';
                break;

            case '-detailTicket':

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
