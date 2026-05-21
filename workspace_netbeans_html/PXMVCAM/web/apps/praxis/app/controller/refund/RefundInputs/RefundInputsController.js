
Ext.define('Ext.Praxis.controller.refund.RefundInputs.RefundInputsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.RefundInputsController',
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

        console.log(me.panelActual);
        if (me.panelActual === '-detailTicket') {

            var paramsDetail = JSON.parse(me.searchParamsDetail);

            paramsDetail.IN_TICKET =
                    Ext.getCmp(prototype.id + '-txtTICKET').getValue();

            me.searchParamsDetail =
                    JSON.stringify(paramsDetail);

            this.obtainData2();

        } else {

            this.setFormatParameter();

            this.search();
        }
    },

    setFormatParameter: function () {

        me.bean = {};
        me.bean.IN_YEAR =Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue();

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
        paramsDetail.IN_YEAR = processDate;
        me.searchParamsDett =
                JSON.stringify(paramsDetail);

        me.searchParams =
                JSON.stringify(paramsDetail);
        me.drillDown.push(me.panelActual);
        me.panelActual = '-detailTicket2';
        global.selectedChild(
                me.childs,
                prototype.id + me.panelActual
                );
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


        global.selectedChild(me.childs, prototype.id + me.panelActual);
        Ext.getCmp(prototype.id + '-boxPag').show();

        this.obtainData2();

        Ext.getCmp(prototype.id + '-txtTICKET').show();

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

    /// CARGA ARCHIVOS


    onLoadClick_TktIatas: function () {
        var msjPregunta = '', msjError = '';
        msjPregunta = 'Sure to load file?';

        if (msjError === '') {
            Ext.Msg.show({
                title: '.:Upload File:.',
                msg: msjPregunta,
                buttons: Ext.MessageBox.YESNO,
                scope: this,
                icon: Ext.MessageBox.WARNING,
                modal: true,
                fn: function (btn) {
                    if (btn === 'yes') {
                        this.onFileLoadTktIatas();
                    }
                }
            });
        }
    },
    onFileLoadTktIatas: function () {

        var fileIatas = Ext.getCmp(prototype.id + '-fileIatas').getValue();
        var fileObj = Ext.getCmp(prototype.id + '-fileIatas').fileInputEl.dom.files[0];
        this.bean.fileTktIatas = Ext.getCmp(prototype.id + '-fileIatas').fileInputEl.dom.files[0];
        var me = this;

        if (fileIatas === '') {
            Ext.MessageBox.alert('PRAXIS', "::: Select only one file. Please :::", function (btn, text) {
                if (btn === 'ok' || btn === 'cancel')
                    setTimeout(function () {
                        Ext.getCmp(agency.id + '-fileIatas').focus();
                    }.bind(this), 100);
            }.bind(this));
            return;
        }

        var maxSizeMB = 1.5; // cambia este valor según tu necesidad
        var sizeMB = fileObj.size / (1024 * 1024);

        if (sizeMB > maxSizeMB) {
            Ext.MessageBox.alert('PRAXIS', 'The file is too large (' + sizeMB.toFixed(2) + ' MB). Max allowed: ' + maxSizeMB + ' MB.');
            Ext.getCmp(prototype.id + '-fileIatas').fileInputEl.dom.value = '';
            return;
        }

        var reader = new FileReader();

        reader.onload = function (e) {
            var arrBytes = e.target.result;

            Ext.Ajax.request({
                url: prototype.url + '/loadIatas',
                method: 'POST',
                timeout: 60000000,
                rawData: arrBytes,
                headers: {
                    'Content-Type': 'application/octet-stream'
                },
                params: {
                    filename: fileIatas
                },
                beforerequest: Ext.getCmp(prototype.id + '-xpanel').mask('Uploading a file...'),
                success: function (response) {
                    Ext.getCmp(prototype.id + '-xpanel').unmask();
                    var res = Ext.JSON.decode(response.responseText);

                    var mensaje = res.msjResult;
                    if (res.success) {
                        global.Msg({msg: mensaje});
                        me.setFormatParameter();
                        me.search();

                    } else {
                        global.Msg({msg: 'Ocurrio un error. (' + mensaje + ')', icon: 0});
                    }
//                    this.btnClear_click
                },
                failure: function (response) {
                    console.log(response, 'response');

                    var msg = 'Ocurrió un error inesperado.';
                    if (response.status === 405) {
                        msg = 'Error 405: El método HTTP POST no está permitido para esta operación.';
                    } else if (response.statusText) {
                        msg = 'Error ' + response.status + ': ' + response.statusText;
                    }

                    global.Msg({msg: msg, icon: 0});
                    Ext.getCmp(prototype.id + '-xpanel').unmask();
                    Ext.getCmp(prototype.id + '-fileIatas').fileInputEl.dom.value = '';
                }

            });

        }
        reader.readAsArrayBuffer(this.bean.fileTktIatas);
    },

    ///
    /// EXCEL

    goURLpost: function (method, parms, columns) {

        var js_columns = JSON.stringify(columns);
        var mapForm = document.createElement("form");
        mapForm.target = "_blank";
        mapForm.method = "POST"; // or "post" if appropriate
        mapForm.action = prototype.url + '/' + method + '?dw_excel=true';
        var mapInput = document.createElement("input");
        mapInput.type = "text";
        mapInput.name = "beanString";
        mapInput.value = parms;
        mapForm.appendChild(mapInput);
        var mapInput = document.createElement("input");
        mapInput.type = "text";
        mapInput.name = "columns";
        mapInput.value = js_columns;
        mapForm.appendChild(mapInput);
        var mapInput = document.createElement("input");
        mapInput.type = "text";
        mapInput.name = "columns";
        mapInput.value = js_columns;
        mapForm.appendChild(mapInput);
        document.body.appendChild(mapForm);
        mapForm.submit();
    },

    btnExcel_click: function (obj, e) {

        //this.setFormatParameter();
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

        if (me.panelActual === '-vskMain') {

            me.goURLpost(
                    'excelTotal',
                    me.searchParams,
                    Ext.getCmp(prototype.id + '-gridData').config.columns.items
                    );

        } else if (me.panelActual === '-detailTicket2') {

            me.goURLpost(
                    'excelTotalDett',
                    me.searchParamsDett,
                    Ext.getCmp(prototype.id + '-gridDataDetailTicketRTS2').config.columns.items
                    );

        } else if (me.panelActual === '-detailTicket') {

            me.goURLpost(
                    'searchTktDetailAll',
                    me.searchParamsDetail,
                    Ext.getCmp(prototype.id + '-gridDataDetailTicket').config.columns.items
                    );
        }
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


        Ext.getCmp(prototype.id + '-txtTICKET')?.setValue('');





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
