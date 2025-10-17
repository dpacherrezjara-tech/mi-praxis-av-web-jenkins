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
    paramsObtainData: {},
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
        var fechaActual = me.fecha || new Date();

        // === Cálculo de mes actual y 4 meses atrás ===
        var monthActual = fechaActual.getMonth() + 1; // 1-12
        var yearActual = fechaActual.getFullYear();

        // Restar 4 meses (sin romper el año)
        var fechaDesde = new Date(fechaActual);
        fechaDesde.setMonth(fechaDesde.getMonth() - 4);

        var monthDesde = fechaDesde.getMonth() + 1;
        var yearDesde = fechaDesde.getFullYear();

        // Formatear con 2 dígitos para coincidir con "code" del store ("01", "02", etc.)
        if (monthActual < 10) monthActual = '0' + monthActual;
        if (monthDesde < 10) monthDesde = '0' + monthDesde;

        // === Vincular los stores ===
        Ext.getCmp(prototype.id + '-cmbDateFromYear').bindStore(win.getStoreYear(false));
        Ext.getCmp(prototype.id + '-cmbDateToYear').bindStore(win.getStoreYear(false));
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').bindStore(win.getStoreMonth(true));
        Ext.getCmp(prototype.id + '-cmbDateToMonth').bindStore(win.getStoreMonth(true));
        Ext.getCmp(prototype.id + '-cmbDateDay').bindStore(win.getStoreDays(true));
        Ext.getCmp(prototype.id + '-cmbDateToDay').bindStore(win.getStoreDays(true));

        // === Asignar valores ===
        Ext.getCmp(prototype.id + '-cmbDateFromYear').setValue(yearDesde);
        Ext.getCmp(prototype.id + '-cmbDateToYear').setValue(yearActual);

        Ext.getCmp(prototype.id + '-cmbDateFromMonth').setValue(monthActual); 
        Ext.getCmp(prototype.id + '-cmbDateToMonth').setValue(monthActual); 

        Ext.getCmp(prototype.id + '-cmbDateDay').setValue("");
        Ext.getCmp(prototype.id + '-cmbDateToDay').setValue("");
        
        this.paramsObtainData.COUNTRY = 2;
        Ext.Ajax.request({
            url: prototype.urlMaster + '/obtainData',
            method: 'POST',
            timeout: 60000000,
            params: {
                beanString: JSON.stringify(this.paramsObtainData)
            },
            success: function (response, options) {
                
                var res = Ext.JSON.decode(response.responseText);
                me.lstCountry = res.lstCountry;

                var storeData3 = Ext.create('Ext.data.Store', {
                    data: me.lstCountry,
                    autoLoad: true
                });
                Ext.getCmp(prototype.id + '-cmbCountry').bindStore(storeData3);
                Ext.getCmp(prototype.id + '-cmbCountry').setValue('');
                global.clear();
            }
        });
        
        
    },
    obtainDataBKP: function () {
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
        } else if (me.panelActual === '-panelGridDataDetail') {
            this.setGridDataDetail(false);
        }  else {
            me.setFormatParameter();
            me.setGridData();
        }
        
    },
    
    // <editor-fold defaultstate="collapsed" desc="setGridData">
    setFormatParameterDashboard: function () {
        me.bean = {};
        
        me.bean.IN_FECHA_FROM = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue() + Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue();
        me.bean.IN_FECHA_TO = Ext.getCmp(prototype.id + '-cmbDateToYear').getValue() + Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue();
        me.bean.IN_COUNTRY = Ext.getCmp(prototype.id + '-cmbCountry').getValue() ;
        
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
                            
                            let QTY_INVOICES = 0;
                            let SVFOPL = 0;
                            let QTY_100_ALL = 0;
                            let QTY_100_PENDING = 0;

                            let a = [];
                            let dataRoot = { text: '.', expanded: false, children: [] };

                            Ext.Object.each(lstData, function (index, value) {
                                if (a.indexOf(value.strFormatDate) < 0) {

                                    // Acumuladores por mes
                                    let V_QTY_INVOICES = 0;
                                    let V_SVFOPL = 0;
                                    let V_QTY_100_ALL = 0;
                                    let V_QTY_100_PENDING = 0;

                                    // Calcular sumas por mes
                                    Ext.Object.each(lstData, function (index, valuex) {
                                        if (value.strFormatDate === valuex.strFormatDate) {
                                            V_QTY_INVOICES += valuex.QTY_INVOICES;
                                            V_SVFOPL += valuex.SVFOPL;
                                            V_QTY_100_ALL += valuex.QTY_100_ALL;
                                            V_QTY_100_PENDING += valuex.QTY_100_PENDING;
                                        }
                                    });

                                    // Sumar a los totales generales
                                    QTY_INVOICES += V_QTY_INVOICES;
                                    SVFOPL += V_SVFOPL;
                                    QTY_100_ALL += V_QTY_100_ALL;
                                    QTY_100_PENDING += V_QTY_100_PENDING;

                                    // Agregar nodo padre (mes)
                                    a.push(value.strFormatDate);
                                    dataRoot.children.push({
                                        strFormatDate: value.strFormatDate,
                                        QTY_INVOICES: V_QTY_INVOICES,
                                        SVFOPL: V_SVFOPL,
                                        QTY_100_ALL: V_QTY_100_ALL,
                                        QTY_100_PENDING: V_QTY_100_PENDING,
                                        expanded: false,
                                        children: []
                                    });

                                    // Agregar nodos hijos (sociedades)
                                    Ext.Object.each(lstData, function (index, value01) {
                                        if (value.strFormatDate === value01.strFormatDate) {
                                            dataRoot.children[a.indexOf(value.strFormatDate)].children.push({
                                                strFormatDate: value01.strFormatDate,
                                                CCUST: value01.SOCIETY,
                                                QTY_INVOICES: value01.QTY_INVOICES,
                                                SVFOPL: value01.SVFOPL,
                                                QTY_100_ALL: value01.QTY_100_ALL,
                                                QTY_100_PENDING: value01.QTY_100_PENDING,
                                                leaf: true
                                            });
                                        }
                                    });
                                }
                            });

                            // Asignar al store
                            var storeTree = Ext.create('Ext.data.TreeStore', {
                                root: dataRoot
                            });
                            Ext.getCmp(prototype.id + '-gridSumaryMain').setStore(storeTree);

                            // Mostrar totales formateados
                            Ext.getCmp(prototype.id + '-QTY_INVOICES').setText(Ext.util.Format.number(QTY_INVOICES, '0,000'));
                            Ext.getCmp(prototype.id + '-SVFOPL').setText(Ext.util.Format.number(SVFOPL, '0,000.00'));
                            Ext.getCmp(prototype.id + '-QTY_100_ALL').setText(Ext.util.Format.number(QTY_100_ALL, '0,000'));
                            Ext.getCmp(prototype.id + '-QTY_100_PENDING').setText(Ext.util.Format.number(QTY_100_PENDING, '0,000'));

                            
                            
                            let totals = [];
                            let totalCantidad = QTY_INVOICES + QTY_100_ALL + QTY_100_PENDING;

                            if (totalCantidad > 0) {
                                let aviancaPerc = (QTY_INVOICES / totalCantidad) * 100;
                                let praxisTotalPerc = (QTY_100_ALL / totalCantidad) * 100;
                                let praxisPendingPerc = (QTY_100_PENDING / totalCantidad) * 100;

                                totals.push({
                                    LABEL: 'Avianca',
                                    Perc2: QTY_INVOICES,
                                    VENDOR: 'Avianca:\n' + Ext.util.Format.number(aviancaPerc, '0.00%')
                                });

                                totals.push({
                                    LABEL: 'Praxis Total',
                                    Perc2: QTY_100_ALL,
                                    VENDOR: 'Praxis Total:\n' + Ext.util.Format.number(praxisTotalPerc, '0.00%')
                                });

                                totals.push({
                                    LABEL: 'Praxis Pendiente',
                                    Perc2: QTY_100_PENDING,
                                    VENDOR: 'Praxis Pendiente:\n' + Ext.util.Format.number(praxisPendingPerc, '0.00%')
                                });
                            }

                            let storeDataPie = Ext.create('Ext.data.Store', {
                                data: totals,
                                autoLoad: true
                            });

                            Ext.getCmp(prototype.id + '-displayPolarSM').bindStore(storeDataPie);

                          // === GRÁFICO DE BARRAS AGRUPADAS POR MES ===
let dataBar = [];

// Recorremos los meses agrupados (padres del árbol)
Ext.Array.each(dataRoot.children, function (mes) {
    dataBar.push({
        month: mes.strFormatDate,    // Ejemplo: "2025-Jan"
        Avianca: mes.QTY_INVOICES,
        PraxisTotal: mes.QTY_100_ALL,
        PraxisPend: mes.QTY_100_PENDING
    });
});

// Ordenar los meses correctamente (YYYY-MMM)
const monthOrder = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

dataBar.sort((a, b) => {
    const [yearA, monA] = a.month.split('-');
    const [yearB, monB] = b.month.split('-');

    // Comparar primero el año
    const yearDiff = parseInt(yearA) - parseInt(yearB);
    if (yearDiff !== 0) return yearDiff;

    // Luego el orden del mes
    return monthOrder.indexOf(monA) - monthOrder.indexOf(monB);
});

// Configuramos el gráfico dinámicamente
let chart = Ext.getCmp(prototype.id + '-displayBarSM');

chart.setStore({
    fields: ['month', 'Avianca', 'PraxisTotal', 'PraxisPend'],
    data: dataBar
});

// Ajustamos la serie a los tres campos
let serie = chart.getSeries()[0];
serie.setYField(['Avianca', 'PraxisTotal', 'PraxisPend']);
serie.setTitle(['Avianca', 'Praxis Total', 'Praxis Pendiente']);




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
        me.bean.IN_COUNTRY = Ext.getCmp(prototype.id + '-cmbCountry').getValue() ;
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
                 Ext.getCmp(prototype.id + '-cmbCountry').setDisabled(false);
                 Ext.getCmp(prototype.id + '-cmbDateFromYear').setDisabled(false);
                 Ext.getCmp(prototype.id + '-cmbDateFromMonth').setDisabled(false);
                 Ext.getCmp(prototype.id + '-cmbDateToYear').setDisabled(false);
                 Ext.getCmp(prototype.id + '-cmbDateToMonth').setDisabled(false);
                  Ext.getCmp(prototype.id + '-panelHeight').setHeight(660);
                break;
            case  '-panelGridDataDetail':
                me.pagginActual = '-paggin';
                Ext.getCmp(prototype.id + '-pie').setVisible(true);
                Ext.getCmp(prototype.id + '-txtINVOICE').setDisabled(false);
                Ext.getCmp(prototype.id + '-cmbCountry').setDisabled(true);
                Ext.getCmp(prototype.id + '-cmbDateFromYear').setDisabled(true);
                 Ext.getCmp(prototype.id + '-cmbDateFromMonth').setDisabled(true);
                 Ext.getCmp(prototype.id + '-cmbDateToYear').setDisabled(true);
                 Ext.getCmp(prototype.id + '-cmbDateToMonth').setDisabled(true);
                  Ext.getCmp(prototype.id + '-panelHeight').setHeight(590);
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