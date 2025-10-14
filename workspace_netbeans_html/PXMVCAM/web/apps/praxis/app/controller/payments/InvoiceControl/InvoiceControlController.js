/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.payments.InvoiceControl.InvoiceControlController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.InvoiceControlController',
    fecha: new Date(),
    childs: '5',
    bean: '',
    beanHistoric: '',
    paginActual: '',
    drillDown: [],
    lstCountry: [],
    gridActual: '',
    panelActual: '',
    fileName: '',
    society: '',
    month:'',
    me: '',
    searchParams: {},
    searchParamsHistoric: {},
    paramsDetail: {},
    dataObtain: {},
    init: function (view) {
        me = this;
        prototype.id = 'InvoiceControlForm';
        prototype.url = CONTEXTPATH + '/InvoiceControl';
        this.childs = Ext.getCmp(prototype.id + '-panelMain').items.items;
        me.panelActual = '-panelGridSumaryMain';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        this.control({
//            //   -------------------Eventos Genericos --------------------
            '#InvoiceControlForm-xpanel': {
                afterrender: this.xpanel_afterrender
            },
            '#InvoiceControlForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#InvoiceControlForm-btnClear': {
                click: this.btnClear_click
            },
            '#InvoiceControlForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#InvoiceControlForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#InvoiceControlForm-btnAdd': {
                click: this.btnAdd_click
            },
            '#InvoiceControlForm-btnBack': {
                click: this.btnBack_click
            },
            '#InvoiceControlForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#InvoiceControlForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#InvoiceControlForm-btn-pag-next': {
                click: this.pagNext
            },
            '#InvoiceControlForm-btn-pag-last': {
                click: this.pagLast
            },
            //-----------------Eventos Especificos -------------------            
            '#InvoiceControlForm-cmbDateFromYear': {
                select: this.selectComboFromYear
            },
            '#InvoiceControlForm-cmbDateToYear': {
                select: this.selectComboToYear
            },
            '#InvoiceControlForm-cmbDateFromMonth': {
                select: this.selectComboFromMonth
            },
            '#InvoiceControlForm-cmbDateToMonth': {
                select: this.selectComboToMonth
            },
            '#BankReconciliationForm-cmbDateDay': {
                select: this.selectComboFromDay
            },
            '#BankReconciliationForm-cmbDateToDay': {
                select: this.selectComboToDay
            }
        });
    },
    xpanel_afterrender: function () {
        me.obtainData();
        me.btnSearch_click();
    },
    obtainData: function () {
        var month = me.fecha.getMonth() + 1;
        if (month < 10) {
            month = '0' + month;
        }
        Ext.getCmp(prototype.id + '-cmbDateFromYear').bindStore(win.getStoreYear(false));
        Ext.getCmp(prototype.id + '-cmbDateToYear').bindStore(win.getStoreYear(false));
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').bindStore(win.getStoreMonth(true));
        Ext.getCmp(prototype.id + '-cmbDateToMonth').bindStore(win.getStoreMonth(true));
        Ext.getCmp(prototype.id + '-cmbDateDay').bindStore(win.getStoreDays(true));
        Ext.getCmp(prototype.id + '-cmbDateToDay').bindStore(win.getStoreDays(true));

        Ext.getCmp(prototype.id + '-cmbDateFromYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateToYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').setValue("01");
        Ext.getCmp(prototype.id + '-cmbDateToMonth').setValue("01");
        Ext.getCmp(prototype.id + '-cmbDateDay').setValue("");
        Ext.getCmp(prototype.id + '-cmbDateDay').setValue("");

    },
    btnSearch_click: function (obj, e) {
        
        if (me.panelActual === '-panelGridSumaryMain') {
            me.setFormatParameterDashboard();
            me.setGridDataDashboard();
        } else {
            me.setFormatParameter();
            me.setGridData();
        }
        
    },
    
    // <editor-fold defaultstate="collapsed" desc="setGridData">
    setFormatParameterDashboard: function () {
        me.bean = {};
        
        me.bean.IN_FECHA_FROM = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue() + Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue();
        me.bean.IN_FECHA_TO = Ext.getCmp(prototype.id + '-cmbDateToYear').getValue() + Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue();
        
        var beanString = JSON.stringify(me.bean);
        searchParams = {
            bean: me.bean,
            beanString: beanString
        };
    },
    setGridDataDashboard: function () {
        console.log(searchParams, 'searchParamsDashboard');
        win.lblUser_toolTip("Estructura: MPF214");
        me.panelActual = '-panelGridSumaryMain';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        me.setWidthPie();
        
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/searchSumaryMain'
                }, listeners: {
                    beforeload: function (obj) {
                        Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');
                        obj.proxy.extraParams = searchParams;
                    },
                    load: function (obj) {
                        Ext.getCmp(prototype.id + '-contentInfo').unmask();
                       
                        if (obj.data.length === 0) {
                            global.Msg({
                                msg: 'Data not found.'
                            });
                        } else {
                            
                            let lstData = []
                            for (let value of obj.data.items) {
                                lstData.push(value.data)
                            }
                            
                            let lastRecord = lstData.length > 0 ? lstData[lstData.length - 1] : null;
                            
                            let QTY_TOTAL = lastRecord.QTY_TOTAL;
                            let AMOUNT_TOTAL_USD = lastRecord.AMOUNT_TOTAL_USD;
                            let AMOUNT_TOTAL_ACTIVE = lastRecord.AMOUNT_TOTAL_ACTIVE;
                            let AMOUNT_TOTAL_DIFFERENCE = lastRecord.AMOUNT_TOTAL_DIFFERENCE;
                            let AMOUNT_TOTAL_MPF100 = lastRecord.AMOUNT_TOTAL_MPF100;
                            let AMOUNT_TOTAL_DIFFERENCE_100 = lastRecord.AMOUNT_TOTAL_DIFFERENCE_100;
                            let AMOUNT_TOTAL_PENDING_MPF100 = lastRecord.AMOUNT_TOTAL_PENDING_MPF100;
                            
                            let a = [];
                            let dataRoot = {text: '.', expanded: false, children: []};

                            Ext.Object.each(lstData, function (index, value) {
                                if (a.indexOf(value.strFormatDate) < 0) {
                                    let x = [];
                                    
                                    let V_QTY = 0;
                                    let V_AMOUNT_USD = 0;
                                    let V_AMOUNT_ACTIVE = 0;
                                    let V_AMOUNT_DIFFERENCE = 0;
                                    let V_AMOUNT_MPF100 = 0;
                                    let V_AMOUNT_DIFFERENCE_100 = 0;
                                    let V_AMOUNT_PENDING_MPF100 = 0;
                        
                                    Ext.Object.each(lstData, function (index, valuex) {
                                        if (value.strFormatDate === valuex.strFormatDate) {
                                             V_QTY += valuex.QTY;
                                             V_AMOUNT_USD += valuex.SVFOPL;
                                             V_AMOUNT_ACTIVE += valuex.SUM_ACTIVE;
                                             V_AMOUNT_DIFFERENCE+= valuex.DIFFERENCE;
                                             V_AMOUNT_MPF100+= valuex.SUM_MPF100;
                                             V_AMOUNT_DIFFERENCE_100+= valuex.DIFFERENCE_100;
                                             V_AMOUNT_PENDING_MPF100+= valuex.PENDING_MPF100;
                                        }
                                    });

                                    a.push(value.strFormatDate);
                                    dataRoot.children.push({
                                        strFormatDate: value.strFormatDate,
                                        QTY : V_QTY ,
                                        SVFOPL : V_AMOUNT_USD ,
                                        SUM_ACTIVE : V_AMOUNT_ACTIVE ,
                                        DIFFERENCE : V_AMOUNT_DIFFERENCE ,
                                        SUM_MPF100 : V_AMOUNT_MPF100 ,
                                        DIFFERENCE_100 : V_AMOUNT_DIFFERENCE_100 ,
                                        PENDING_MPF100 : V_AMOUNT_PENDING_MPF100 ,
                                        expanded: false, children: []
                                    });
                                    
                                    let b = [];
                                    Ext.Object.each(lstData, function (index, value01) {
                                        if (value.strFormatDate === value01.strFormatDate) {
                                            dataRoot.children[a.indexOf(value.strFormatDate)].children.push({
                                                strFormatDate: value01.strFormatDate,
                                                CCUST: value01.SOCIETY,
                                                QTY : value01.QTY ,
                                                SVFOPL : value01.SVFOPL ,
                                                SUM_ACTIVE : value01.SUM_ACTIVE ,
                                                DIFFERENCE : value01.DIFFERENCE ,
                                                SUM_MPF100 : value01.SUM_MPF100 ,
                                                DIFFERENCE_100 : value01.DIFFERENCE_100 ,
                                                PENDING_MPF100 : value01.PENDING_MPF100 ,
                                                leaf: true
                                            });
                                        }
                                    });
                                }
                            });
                            console.log(dataRoot, 'dataRoot')
                            var storeTree = Ext.create('Ext.data.TreeStore', {
                                root: dataRoot
                            });

                            Ext.getCmp(prototype.id + '-gridSumaryMain').setStore(storeTree);
                            
                            Ext.getCmp(prototype.id + '-QTY_TOTAL').setText(Ext.util.Format.number(QTY_TOTAL, '0,000'));
                            Ext.getCmp(prototype.id + '-AMOUNT_TOTAL_USD').setText(Ext.util.Format.number(AMOUNT_TOTAL_USD, '0,000'));
                            Ext.getCmp(prototype.id + '-AMOUNT_TOTAL_MPF100').setText(Ext.util.Format.number(AMOUNT_TOTAL_MPF100, '0,000'));
                            Ext.getCmp(prototype.id + '-AMOUNT_TOTAL_DIFFERENCE_100').setText(Ext.util.Format.number(AMOUNT_TOTAL_DIFFERENCE_100, '0,000'));
                            Ext.getCmp(prototype.id + '-AMOUNT_TOTAL_ACTIVE').setText(Ext.util.Format.number(AMOUNT_TOTAL_ACTIVE, '0,000'));
                            Ext.getCmp(prototype.id + '-AMOUNT_TOTAL_DIFFERENCE').setText(Ext.util.Format.number(AMOUNT_TOTAL_DIFFERENCE, '0,000'));
                            Ext.getCmp(prototype.id + '-AMOUNT_TOTAL_PENDING_MPF100').setText(Ext.util.Format.number(AMOUNT_TOTAL_PENDING_MPF100, '0,000'));
                            
                            var data = lastRecord;
                            console.log(lastRecord, 'datadata');
                            console.log(obj, 'objobj');
                            
                            return;
                            
                            let item = {};
                            let item2 = {};
                            let item3 = {};
                            let item4 = {};
                            let item5 = {};
                            let totals = [];
                            let totalCantidad = lastRecord.QTY_TOTAL_REFUND +
                                lastRecord.QTY_TOTAL_CHGBACK +
                                lastRecord.QTY_TOTAL_REVERSE_CHGBACK +
                                lastRecord.QTY_TOTAL_ACRED +
                                lastRecord.QTY_TOTAL_PENDING;

                            let refundMatch = (lastRecord.QTY_TOTAL_REFUND / totalCantidad) * 100;
                            let chgbkMatch = (lastRecord.QTY_TOTAL_CHGBACK / totalCantidad) * 100;
                            let reverseChgbkMatch = (lastRecord.QTY_TOTAL_REVERSE_CHGBACK / totalCantidad) * 100;
                            let acreditMatch = (lastRecord.QTY_TOTAL_ACRED / totalCantidad) * 100;
                            let othersPend = (lastRecord.QTY_TOTAL_PENDING / totalCantidad) * 100;

                            if (obj.data.items.length > 0) {
                                totals.push({
                                    LABEL: 'Refund',
                                    Perc2: lastRecord.QTY_TOTAL_REFUND,
                                    VENDOR: 'Refund:\n' + Ext.util.Format.number(refundMatch, '0.00%')
                                });

                                totals.push({
                                    LABEL: 'Pending',
                                    Perc2: lastRecord.QTY_TOTAL_PENDING,
                                    VENDOR: 'Pending:\n' + Ext.util.Format.number(othersPend, '0.00%')
                                });
                                totals.push({
                                    LABEL: 'Chgback',
                                    Perc2: lastRecord.QTY_TOTAL_CHGBACK,
                                    VENDOR: 'Chgback:\n' + Ext.util.Format.number(chgbkMatch, '0.00%')
                                });
                                totals.push({
                                    LABEL: 'Acredit',
                                    Perc2: lastRecord.QTY_TOTAL_ACRED,
                                    VENDOR: 'Acredit:\n'+ Ext.util.Format.number(acreditMatch, '0.00%')
                                });
                                totals.push({
                                    LABEL: 'Chgback Reverse',
                                    Perc2: lastRecord.QTY_TOTAL_REVERSE_CHGBACK,
                                    VENDOR: 'Chgback Reverse:\n' + Ext.util.Format.number(reverseChgbkMatch, '0.00%')
                                });
                            }

                            var storeData1er = Ext.create('Ext.data.Store', {
                                data: totals,
                                autoLoad: true
                            });

                            Ext.getCmp(prototype.id + '-displayPolarSM').bindStore(storeData1er);
                            //Ext.getCmp(prototype.id + '-lblTittlePaidSumaryMain').setText('Totals Debits: ' + Ext.util.Format.number(totalCantidad, '0,000'));

                            let dataBar = [
                                {
                                    category: 'Refund',
                                    USD: lastRecord.AMOUNT_TOTAL_REFUND_USD,
                                    SEND: lastRecord.AMOUNT_TOTAL_REFUND_SEND,
                                    SAP: lastRecord.AMOUNT_TOTAL_REFUND_SAP
                                },
                                {
                                    category: 'Chargeback',
                                    USD: lastRecord.AMOUNT_TOTAL_CHGBACK_USD,
                                    SEND: lastRecord.AMOUNT_TOTAL_CHGBACK_SEND,
                                    SAP: lastRecord.AMOUNT_TOTAL_CHGBACK_SAP
                                },
                                {
                                    category: 'Reverse ChgBck',
                                    USD: lastRecord.AMOUNT_TOTAL_REVERSE_CHGBACK_USD,
                                    SEND: lastRecord.AMOUNT_TOTAL_REVERSE_CHGBACK_SEND,
                                    SAP: lastRecord.AMOUNT_TOTAL_REVERSE_CHGBACK_SAP
                                },
                                {
                                    category: 'Acreditaciones',
                                    USD: lastRecord.AMOUNT_TOTAL_ACRED_USD,
                                    SEND: lastRecord.AMOUNT_TOTAL_ACRED_SEND,
                                    SAP: lastRecord.AMOUNT_TOTAL_ACRED_SAP
                                },
                                {
                                    category: 'Pendiente',
                                    USD: lastRecord.AMOUNT_TOTAL_PENDING_USD,
                                    SEND: lastRecord.AMOUNT_TOTAL_PENDING_SEND,
                                    SAP: lastRecord.AMOUNT_TOTAL_PENDING_SAP
                                }
                            ];

                            let chart = Ext.getCmp(prototype.id + '-displayBarSM');
                            chart.setStore({
                                fields: ['category', 'USD', 'SEND', 'SAP'],
                                data: dataBar
                            });

                            chart.getSeries()[0].setTitle(['Amount USD', 'Amount SEND', 'Amount SAP']);

                        }
                    }
                }
            });
        me.getPaggin(); 
    },
    setFormatParameter: function () {
        me.bean = {};
        me.bean.IN_FECHA_FROM = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue() + Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue();
        me.bean.IN_FECHA_TO = Ext.getCmp(prototype.id + '-cmbDateToYear').getValue() + Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue();
        me.bean.IN_SOCIETY = Ext.getCmp(prototype.id + '-typeSociety').getValue();
        me.bean.IN_INVOICE = Ext.getCmp(prototype.id + '-txtINVOICE').getValue();
        
        var beanString = JSON.stringify(me.bean);
        searchParams = {
            bean: me.bean,
            beanString: beanString
        };
        console.log(searchParams, 'searchParams')
    },
    setGridData: function () {
        win.lblUser_toolTip("Estructura: MPF214");
        me.panelActual = '-panelGridDataDetail';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        me.setWidthPie();
        
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/search'
                }, listeners: {
                    beforeload: function (obj) {
                        obj.proxy.extraParams = searchParams;
                    },
                    load: function (obj) {
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
            Ext.getCmp(prototype.id + '-gridDataDetail').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
        
    },
    onGridDataDetail: function (column, e, rowIndex, colIndex, rowData) {
        
        let esPadre = rowData.record.childNodes.length ? true : false;
        let rowPadre = rowData.record.data;
        let fecha = this.getPeriodoYYYYMM(rowPadre.strFormatDate);
        me.bean = {};
        
        if (esPadre) {
            me.bean.IN_SOCIETY = "";
        } else {
            me.bean.IN_SOCIETY = rowPadre.CCUST;
        }
        
        const mapCCUST = {
            '2K01': '547',
            'AV01': '134',
            'LR01': '133',
            'TA01': '202'
        };
        
        let codigo = mapCCUST[rowPadre.CCUST];
        Ext.getCmp(prototype.id + '-typeSociety').setValue(codigo);
        console.log(codigo,"RAAAAAAAAAAAAA")
        
        me.bean.IN_DATE = fecha;
        me.bean.IN_INVOICE = "";
        me.paramsDetail.beanString = JSON.stringify(me.bean);
        console.log(me.bean, 'searchParams');
        this.setGridDataDetail(true);
    },
    setGridDataDetail: function (down){
        console.log(down,'down')
        if (down) {
            me.drillDown.push(me.panelActual);
            me.panelActual = '-panelGridDataDetail';
            global.selectedChild(me.childs, prototype.id + me.panelActual);
        }
        
        win.lblUser_toolTip("Estructura: MPF214");
        console.log(me.panelActual,'me.panelActual')
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchDataDetail'
            }, listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = me.paramsDetail;
                },
                load: function (obj) {
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
                    me.setWidthPie();
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataDetail').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
        me.getPaggin(); 
    },
    // </editor-fold>
    onLoadClick: function () {
        var fileField = Ext.getCmp(prototype.id + '-file');
        var fileValue = fileField.getValue();

        if (!fileValue) {
            Ext.Msg.alert('Validation', 'Please select an Excel file before loading.');
            return;
        }

        var msjPregunta = 'Sure to load file?';

        Ext.MessageBox.show({
            title: 'Load Merchants',
            msg: msjPregunta,
            buttons: Ext.MessageBox.OKCANCEL,
            icon: Ext.MessageBox.WARNING,
            fn: function (btn) {
                if (btn === 'ok') {
                    me.onFileLoad();
                }
            }
        });
    },
    onFileLoad: function () {
        let beanValidation = {};
        let value = "I";
        beanValidation.OPTION = value;
        console.log(beanValidation.OPTION);
        var file = Ext.getCmp(prototype.id + '-file').getValue();
        let beanString = JSON.stringify(beanValidation);

        var form = Ext.getCmp(prototype.id + '-formMerchant').getForm();

        form.submit({
            url: prototype.url + '/setUploadInvoice',
            waitMsg: 'Uploading your sure to upload the file...',
            params: {fileName: file, beanString: beanString},
            success: function (f, o) {

                var res = Ext.decode(o.response.responseText);
                var msjResult = res.msjResult;
                global.Msg({msg: msjResult});
                Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});

            },
            failure: function (response) {
                console.log('server-side failure with status code ' + response.status);
            }
        });

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
        switch (me.panelActual) {
            case  '-panelGridSumaryMain':
                me.setFormatParameterDashboard()
                global.getFile(prototype.url + '/getXLSXDashboard?beanString=' + encodeURI(searchParams.beanString));
                break;
             case  '-panelGridDataDetail':
                global.getFile(prototype.url + '/getXLSXDetail?beanString=' + encodeURI(me.paramsDetail.beanString));
                break;
            default:
                global.Msg(
                        {msg: 'Under Construction'
                        });
        }

    },
    onDownloadFile: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
        me.paramsDetail.beanString = JSON.stringify(rowData.data);
        me.fileName = rowData.data.A2536NAMEF;
        Ext.Ajax.request({
            url: prototype.url + '/download',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getCmp(prototype.id + '-gridData').mask('Loading...'),
            params: me.paramsDetail,
            success: function (response, options) {
                Ext.getCmp(prototype.id + '-gridData').unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);

                var resultByte = res.bytes;
                var bytes = new Uint8Array(resultByte); // pass your byte response to this constructor
                var blob = new Blob([bytes], {type: "application/png"});// change resultByte to bytes

                var link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = me.fileName;
                link.click();
            }
        });

    },
    btnFilter_click: function (obj) {
//        console.log('btnFilter_click');
        var option = Ext.getCmp(prototype.id + '-contentFilter');
        if (option.isVisible()) {
            option.setVisible(false);
        } else {
            option.setVisible(true);
        }
    },
    getPaggin: function () {
        me.pagginActual = '';
        console.log(me.panelActual,'me.panelActual')
        switch (me.panelActual) {
            case  '-panelGridSumaryMain':
                console.log("WAFA?")
                 Ext.getCmp(prototype.id + '-pie').setVisible(false);
                 Ext.getCmp(prototype.id + '-txtINVOICE').setDisabled(true);
                 Ext.getCmp(prototype.id + '-typeSociety').setValue('');
                break;
            case  '-panelGridDataDetail':
                me.pagginActual = '-paggin';
                Ext.getCmp(prototype.id + '-pie').setVisible(true);
                Ext.getCmp(prototype.id + '-txtINVOICE').setDisabled(false);
                break;
            case  '-panelGridDataHistoric':
                me.pagginActual = '-paggin';
                break;
        }
    },
    // <editor-fold defaultstate="collapsed" desc="Funciones para la paginacion ">
    pagFirst: function (obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.moveFirst();
    },
    pagPrevious: function (obj, e) {
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
    },
    selectComboFromYear: function (obj) {
        var comboToYear = Ext.getCmp(prototype.id + '-cmbDateToYear');
        var storeComboDataYear = win.getStoreYear2(false, obj.getValue());
        let comboFromYear = Ext.getCmp(prototype.id + '-cmbDateFromYear');
        let comboFromMonth = Ext.getCmp(prototype.id + '-cmbDateFromMonth');
        let comboToMonth = Ext.getCmp(prototype.id + '-cmbDateToMonth');
        comboToYear.bindStore(storeComboDataYear);
        comboToYear.setValue(obj.getValue());
        if( comboToYear.getValue() <= comboFromYear.getValue() && comboToMonth.getValue() < comboFromMonth.getValue() ){
            comboFromMonth.setValue(comboToMonth.getValue())
        }
    },
    selectComboToYear: function (obj) {
        let comboFromYear = Ext.getCmp(prototype.id + '-cmbDateFromYear');
        let comboToYear = Ext.getCmp(prototype.id + '-cmbDateToYear');
        let comboFromMonth = Ext.getCmp(prototype.id + '-cmbDateFromMonth');
        let comboToMonth = Ext.getCmp(prototype.id + '-cmbDateToMonth');
        if( comboToYear.getValue() < comboFromYear.getValue()  ){
           comboFromYear.setValue(comboToYear.getValue()); 
        }
        if( comboToYear.getValue() <= comboFromYear.getValue() && comboToMonth.getValue() < comboFromMonth.getValue() ){
            comboFromMonth.setValue(comboToMonth.getValue())
        }
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
    selectComboToDay: function (obj) {
        var comboFromYear = Ext.getCmp(prototype.id + '-cmbDateFromYear');
        var comboToYear = Ext.getCmp(prototype.id + '-cmbDateToYear');
        var comboFromMonth = Ext.getCmp(prototype.id + '-cmbDateFromMonth');
        var comboToMonth = Ext.getCmp(prototype.id + '-cmbDateToMonth');
        var comboFromDay = Ext.getCmp(prototype.id + '-cmbDateDay');
        if (comboFromMonth.getValue() === comboToMonth.getValue()) {
            if (obj.getValue() < comboFromDay.getValue()) {
                comboFromDay.setValue(obj.getValue());
            }
        }
        if(comboFromDay.getValue() === ''){
            comboFromDay.setValue(obj.getValue());
        }
    },
    getPeriodoYYYYMM: function(strFormatDate) {
        if (!strFormatDate) return null;

        let [anio, mesTxt] = strFormatDate.split('-');
        const meses = {
            Jan: '01', Feb: '02', Mar: '03', Apr: '04',
            May: '05', Jun: '06', Jul: '07', Aug: '08',
            Sep: '09', Oct: '10', Nov: '11', Dec: '12'
        };
        return anio + (meses[mesTxt] || '00');
    },
    onUpperValue: function (obj, e, eOpts) {
        let value = obj.getValue().toUpperCase();
        obj.setValue(value);
    },
    setWidthPie: function () {
        var ancho = Ext.getCmp(prototype.id + me.panelActual).getWidth();
        Ext.getCmp(prototype.id + '-pie').setWidth(ancho);
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
    // </editor-fold>
    eventKey: function (e, eOpts) {
        if (eOpts.getKey() === 13) {
            me.bean.IN_INVOICE = Ext.getCmp(prototype.id + '-txtINVOICE').getValue();
            me.paramsDetail.beanString = JSON.stringify(me.bean);
            console.log(me.bean, 'searchParamsaaaa');
            this.setGridDataDetail(false);
        }
    }
}
);