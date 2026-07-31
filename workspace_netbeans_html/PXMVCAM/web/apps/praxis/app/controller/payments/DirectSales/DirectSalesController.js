Ext.define('Ext.Praxis.controller.payments.DirectSales.DirectSalesController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DirectSalesController',
    fecha: new Date(),
    bean: '',
    paginActual: '',
    drillDown: [],
    lstCountry: [],
    panelActual: '',
    fileName: '',
    me: '',
    searchParams: {},
    beanDetCielo: {},
    paramsDetail: {},
    paramsObtainData: {},
    paramsDetailCielo: {},
    init: function (view) {
        me = this;
        prototype.id = 'DirectSalesForm';
        prototype.url = CONTEXTPATH + '/DirectSales';
        prototype.urlMaster = CONTEXTPATH + '/MasterController';
        this.childs = Ext.getCmp(prototype.id + '-panelMain').items.items;
        me.panelActual = '-panelGridDataDetail';
        prototypeProgram.view = 'payments-BSP-file-download';
        prototypeProgram.nprog = 'PX00001032';
        prototypeProgram.title = 'Downloaded Cash Files';
        prototypeProgram.modulo = '';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        // <editor-fold defaultstate="collapsed" desc="Eventos Genericos">
        this.control({
            '#DirectSalesForm-xpanel': {
                afterrender: this.xpanel_afterrender
            },
            '#DirectSalesForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#DirectSalesForm-btnClear': {
                click: this.btnClear_click
            },
            '#DirectSalesForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#DirectSalesForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#DirectSalesForm-btnAdd': {
                click: this.btnAdd_click
            },
            '#DirectSalesForm-btnBack': {
                click: this.btnBack_click
            },
            '#DirectSalesForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#DirectSalesForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#DirectSalesForm-btn-pag-next': {
                click: this.pagNext
            },
            '#DirectSalesForm-btn-pag-last': {
                click: this.pagLast
            },
            //-----------------Eventos Especificos -------------------            
            '#DirectSalesForm-cmbDateFromYear': {
                select: this.selectComboFromYear
            },
            '#DirectSalesForm-cmbDateFromMonth': {
                select: this.selectComboFromMonth
            },
            '#DirectSalesForm-cmbDateFromDay': {
                select: this.selectComboFromDay
            },
            '#DirectSalesForm-cmbDateFromYearARC': {
                select: this.selectComboFromYearARC
            },
            '#DirectSalesForm-cmbDateFromMonthARC': {
                select: this.selectComboFromMonthARC
            },
            '#DirectSalesForm-cmbDateFromDayARC': {
                select: this.selectComboFromDayARC
            },
        });
        // </editor-fold>
    },
    xpanel_afterrender: function () {
        me.obtainData();
        me.btnSearch_click();
    },
    obtainData: function () {
        var fechaActual = me.fecha || new Date();

        // Año actual (ya está bien como número)
        var yearActual = fechaActual.getFullYear();

        // Mes actual CONVERTIDO a string de 2 dígitos
        var monthActual = (fechaActual.getMonth() + 1).toString().padStart(2, '0');

        // Bind stores
        Ext.getCmp(prototype.id + '-cmbDateFromYear').bindStore(win.getStoreYear(true));
        Ext.getCmp(prototype.id + '-cmbDateToYear').bindStore(win.getStoreYear(true));
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').bindStore(win.getStoreMonth(true));
        Ext.getCmp(prototype.id + '-cmbDateToMonth').bindStore(win.getStoreMonth(true));
        Ext.getCmp(prototype.id + '-cmbDateFromDay').bindStore(win.getStoreDays(true));
        Ext.getCmp(prototype.id + '-cmbDateToDay').bindStore(win.getStoreDays(true));

        // Por defecto solo se marca el año (mes en "All"), para que la búsqueda
        // inicial traiga el año completo en vez de un solo mes.
        Ext.getCmp(prototype.id + '-cmbDateFromYear').setValue(yearActual);
        Ext.getCmp(prototype.id + '-cmbDateToYear').setValue(yearActual);
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').setValue("");
        Ext.getCmp(prototype.id + '-cmbDateToMonth').setValue("");
        Ext.getCmp(prototype.id + '-cmbDateFromDay').setValue("");
        Ext.getCmp(prototype.id + '-cmbDateToDay').setValue("");

        // Lo mismo para combos ARC
        Ext.getCmp(prototype.id + '-cmbDateFromYearARC').bindStore(win.getStoreYear(true));
        Ext.getCmp(prototype.id + '-cmbDateToYearARC').bindStore(win.getStoreYear(true));
        Ext.getCmp(prototype.id + '-cmbDateFromMonthARC').bindStore(win.getStoreMonth(true));
        Ext.getCmp(prototype.id + '-cmbDateToMonthARC').bindStore(win.getStoreMonth(true));
        Ext.getCmp(prototype.id + '-cmbDateFromDayARC').bindStore(win.getStoreDays(true));
        Ext.getCmp(prototype.id + '-cmbDateToDayARC').bindStore(win.getStoreDays(true));

        Ext.getCmp(prototype.id + '-cmbDateFromYearARC').setValue(yearActual);
        Ext.getCmp(prototype.id + '-cmbDateToYearARC').setValue(yearActual);
        Ext.getCmp(prototype.id + '-cmbDateFromMonthARC').setValue(monthActual);
        Ext.getCmp(prototype.id + '-cmbDateToMonthARC').setValue(monthActual);
        Ext.getCmp(prototype.id + '-cmbDateFromDayARC').setValue("");
        Ext.getCmp(prototype.id + '-cmbDateToDayARC').setValue("");

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
    btnSearch_click: function (obj, e) {
        let fs = Ext.getCmp(prototype.id + '-titleFieldsetBSP');
        let selectedBy = Ext.getCmp(prototype.id + '-cmbInputDate').getValue();

//        if (selectedBy === 'S') {
//            fs.setTitle('<span style="color:#1a4d8f;font-weight:bold;">SALES DATE</span>');
//        } else if (selectedBy === 'U') {
//            fs.setTitle('<span style="color:#1a4d8f;font-weight:bold;">PAYMENT DATE</span>');
//        }

        let seg = Ext.getCmp(prototype.id + '-segViewMode');
        let selected = seg.getValue();
        this.drillDown = [];

        if (selected === 0) {
            Ext.getCmp(prototype.id + '-panelBSP').setVisible(true);
            Ext.getCmp(prototype.id + '-panelARC').setVisible(false);
            this.setFormatParameter();
            this.setGridData();
        } else if (selected === 1) {
            Ext.getCmp(prototype.id + '-panelBSP').setVisible(false);
            Ext.getCmp(prototype.id + '-panelARC').setVisible(true);
            this.setFormatParameterARC();
            this.setGridDataARC();
        }
    },
    setFormatParameter: function () {
        me.bean = {};

        // MPS774 trabaja a nivel de periodo (YYYYMM), no de día
        // IN_SEARCH decide qué fecha filtra/agrupa el periodo: 'S' = Sales Date (SDATE), 'A' = Abono Date (ADATE)
        // La conversión a USD (F0002) siempre usa SDATE, sin importar este valor.
        me.bean.IN_SEARCH = Ext.getCmp(prototype.id + '-cmbInputDate').getValue() || 'A';

        // Si el mes queda en blanco (combo "All"), se manda solo el año (4 dígitos)
        // y MPS774 lo expande a todo el año (equivalente a 01 a 12). Si además se
        // selecciona un día, se manda año+mes+día (8 dígitos) y MPS774 filtra a
        // ese día exacto, pero el árbol del dashboard sigue agrupando por mes
        // (PERIODO siempre es año+mes, sin importar la precisión del filtro).
        me.bean.IN_DATE_FROM = me.buildDate(
                Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue(),
                Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue(),
                Ext.getCmp(prototype.id + '-cmbDateFromDay').getValue()
                );
        me.bean.IN_DATE_TO = me.buildDate(
                Ext.getCmp(prototype.id + '-cmbDateToYear').getValue(),
                Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue(),
                Ext.getCmp(prototype.id + '-cmbDateToDay').getValue()
                );
        me.bean.IN_CCUST = Ext.getCmp(prototype.id + '-typeSociety').getValue() || '';
        me.bean.IN_SCOUNTRY = Ext.getCmp(prototype.id + '-cmbCountry').getValue() || '';
        me.bean.IN_SAGENT = Ext.getCmp(prototype.id + '-txtAgent').getValue() || '';

        var beanString = JSON.stringify(me.bean);
        searchParams = {
            bean: me.bean,
            beanString: beanString
        };

        console.log(searchParams, 'searchParams');
    },
    setGridData: function () {
        win.lblUser_toolTip("Estructura: MPS774");
        me.panelActual = '-panelGridDataDetail';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        me.setWidthPie();

        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchDashboard'
            }, listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function (obj) {
                    Ext.getCmp(prototype.id + '-panelGridDataDetail').unmask();

                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                        Ext.getCmp(prototype.id + '-gridDataDetail').setStore(null);
                        Ext.get(prototype.id + '-dashTotalVal').setHtml('0');
                        Ext.get(prototype.id + '-dashMatchVal').setHtml('0');
                        Ext.get(prototype.id + '-dashPendVal').setHtml('0');
                        var sumIdsDS = ['DSQTOTAL', 'DSAMTTOTAL', 'DSQMATCH', 'DSPCT', 'DSQMANUAL', 'DSAMTMATCH', 'DSQPEND', 'DSAMTPEND'];
                        Ext.Array.each(sumIdsDS, function (id) {
                            Ext.getCmp(prototype.id + '-sum-' + id).setText('0');
                        });
                        var chartEmpty = Ext.getCmp(prototype.id + '-chartBSP');
                        if (chartEmpty) {
                            chartEmpty.getStore().loadData([]);
                        }
                        return;
                    }

                    var items = obj.getData().items.map(function (r) {
                        return r.data;
                    });
                    // Última fila = totales generales (misma convención que CargoStatus/MPS657)
                    var totals = items[items.length - 1];
                    var rows = items.slice(0, items.length - 1);

                    Ext.get(prototype.id + '-dashTotalVal').setHtml(Ext.util.Format.number(totals.TOTAL_QTOTAL, '0,000'));
                    Ext.get(prototype.id + '-dashMatchVal').setHtml(Ext.util.Format.number(totals.TOTAL_QMATCH + (totals.TOTAL_QMANUAL || 0), '0,000'));
                    Ext.get(prototype.id + '-dashPendVal').setHtml(Ext.util.Format.number(totals.TOTAL_QPEND, '0,000'));

                    // ── Fila de totales al pie de la grilla (fake summary, igual que CargoStatus) ──
                    Ext.getCmp(prototype.id + '-sum-DSQTOTAL').setText(Ext.util.Format.number(totals.TOTAL_QTOTAL, '0,000'));
                    Ext.getCmp(prototype.id + '-sum-DSAMTTOTAL').setText(Ext.util.Format.number(totals.TOTAL_AMTTOTAL, '0,000.00'));
                    Ext.getCmp(prototype.id + '-sum-DSQMATCH').setText(Ext.util.Format.number(totals.TOTAL_QMATCH, '0,000'));
                    Ext.getCmp(prototype.id + '-sum-DSPCT').setText(Ext.util.Format.number(totals.TOTAL_PCT, '0.00') + ' %');
                    Ext.getCmp(prototype.id + '-sum-DSQMANUAL').setText(Ext.util.Format.number(totals.TOTAL_QMANUAL, '0,000'));
                    Ext.getCmp(prototype.id + '-sum-DSAMTMATCH').setText(Ext.util.Format.number(totals.TOTAL_AMTMATCH, '0,000.00'));
                    Ext.getCmp(prototype.id + '-sum-DSQPEND').setText(Ext.util.Format.number(totals.TOTAL_QPEND, '0,000'));
                    Ext.getCmp(prototype.id + '-sum-DSAMTPEND').setText(Ext.util.Format.number(totals.TOTAL_AMTPEND, '0,000.00'));

                    // ── Árbol agrupado por MES (padre = periodo con totales, hijo = aerolínea) ──
                    var periodOrder = [];
                    var dataRoot = {text: '.', expanded: true, children: []};

                    Ext.Array.each(rows, function (row) {
                        var periodo = row.ADATE;
                        var periodoTexto = row.strFormatDate;
                        if (Ext.Array.indexOf(periodOrder, periodo) === -1) {
                            periodOrder.push(periodo);

                            var V_QTOTAL = 0, V_QMATCH = 0, V_QMANUAL = 0, V_QPEND = 0;
                            var V_AMTTOTAL = 0, V_AMTMATCH = 0, V_AMTPEND = 0;
                            var children = [];

                            Ext.Array.each(rows, function (det) {
                                if (det.ADATE !== periodo) {
                                    return;
                                }
                                V_QTOTAL += det.VL_QTY_TOTAL || 0;
                                V_QMATCH += det.VL_QTY_MATCH || 0;
                                V_QMANUAL += det.VL_QTY_MANUAL || 0;
                                V_QPEND += det.VL_QTY_PEND || 0;
                                V_AMTTOTAL += det.VL_AMT_TOTAL || 0;
                                V_AMTMATCH += det.VL_AMT_MATCH || 0;
                                V_AMTPEND += det.VL_AMT_PEND || 0;

                                children.push({
                                    text: '',
                                    CCUST: det.CCUST,
                                    ADATE: det.ADATE,
                                    strFormatDate: '',
                                    VL_QTY_TOTAL: det.VL_QTY_TOTAL,
                                    VL_AMT_TOTAL: det.VL_AMT_TOTAL,
                                    VL_QTY_MATCH: det.VL_QTY_MATCH,
                                    PCT_PROCESADO: det.PCT_PROCESADO,
                                    VL_QTY_MANUAL: det.VL_QTY_MANUAL,
                                    VL_AMT_MATCH: det.VL_AMT_MATCH,
                                    VL_QTY_PEND: det.VL_QTY_PEND,
                                    VL_AMT_PEND: det.VL_AMT_PEND,
                                    leaf: true
                                });
                            });

                            dataRoot.children.push({
                                text: periodoTexto,
                                CCUST: '',
                                ADATE: periodo,
                                strFormatDate: periodoTexto,
                                VL_QTY_TOTAL: V_QTOTAL,
                                VL_AMT_TOTAL: V_AMTTOTAL,
                                VL_QTY_MATCH: V_QMATCH,
                                PCT_PROCESADO: V_QTOTAL > 0 ? ((V_QMATCH + V_QMANUAL) * 100 / V_QTOTAL) : 0,
                                VL_QTY_MANUAL: V_QMANUAL,
                                VL_AMT_MATCH: V_AMTMATCH,
                                VL_QTY_PEND: V_QPEND,
                                VL_AMT_PEND: V_AMTPEND,
                                expanded: false,
                                children: children
                            });
                        }
                    });

                    var storeTree = Ext.create('Ext.data.TreeStore', {root: dataRoot});
                    Ext.getCmp(prototype.id + '-gridDataDetail').setStore(storeTree);

                    // ── Gráfico: un punto por mes, usando los totales ya calculados en el árbol ──
                    var chartData = [];
                    Ext.Array.each(dataRoot.children, function (mes) {
                        chartData.push({
                            mes: mes.strFormatDate,
                            total: mes.VL_QTY_TOTAL,
                            match: mes.VL_QTY_MATCH + mes.VL_QTY_MANUAL,
                            pending: mes.VL_QTY_PEND
                        });
                    });
                    var chart = Ext.getCmp(prototype.id + '-chartBSP');
                    if (chart) {
                        chart.getStore().loadData(chartData);
                    }
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-panelGridDataDetail').mask('Loading...');
        storeGridDatas.load();
        this.getPaggin();
        this.checkExchangePending();

    },
    // Botón "Conciliacion": ejecuta MPS320, que concilia contra el banco
    // (MPF102) las ventas directas pendientes (STVAL='3') y actualiza MPF190.
    onCallSummaryMPF132: function () {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Are you sure you want to run the reconciliation?',
            buttons: Ext.MessageBox.YESNO,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function (result) {
                if (result !== 'yes') {
                    return;
                }
                Ext.getCmp(prototype.id + '-boxConsultas').mask('Running reconciliation...');
                Ext.Ajax.request({
                    url: prototype.url + '/runReconciliation',
                    method: 'POST',
                    timeout: 300000,
                    params: {},
                    success: function (response) {
                        Ext.getCmp(prototype.id + '-boxConsultas').unmask();
                        var res = Ext.JSON.decode(response.responseText);
                        if (res.success) {
                            global.Msg({msg: res.message || 'Reconciliation executed successfully.'});
                            me.btnSearch_click();
                        } else {
                            global.Msg({msg: 'Error running reconciliation: ' + res.message});
                        }
                    },
                    failure: function (response) {
                        Ext.getCmp(prototype.id + '-boxConsultas').unmask();
                        global.Msg({msg: 'Server error: ' + response.statusText});
                    }
                });
            }
        });
    },
    // Avisa si hay fechas de venta (SDATE) en el filtro actual que no tienen
    // tasa de cambio cargada en MPF033 (F0002 las devuelve en 0 en silencio).
    // Se muestra como un panel al costado izquierdo de la grilla (no como
    // ícono en la barra de opciones, para que no pase desapercibido).
    checkExchangePending: function () {
        var panel = Ext.getCmp(prototype.id + '-panelFxWarning');
        if (!panel) {
            return;
        }
        Ext.Ajax.request({
            url: prototype.url + '/searchExchangePending',
            method: 'POST',
            timeout: 60000000,
            params: {
                beanString: searchParams.beanString
            },
            success: function (response) {
                var res = Ext.JSON.decode(response.responseText);
                if (res.data && res.data.length > 0) {
                    var html = '<b>Missing exchange rate for:</b><br/>';
                    Ext.Array.each(res.data, function (row) {
                        html += row.SDATE + ' - ' + row.SCURRENCY + '<br/>';
                    });
                    var textEl = Ext.get(prototype.id + '-fxWarningBox');
                    if (textEl) {
                        textEl.dom.setAttribute('data-qtip', html);
                    }
                    panel.show();
                } else {
                    panel.hide();
                }
            },
            failure: function () {
                panel.hide();
            }
        });
    },
    onGridSaleCielo: function (obj, metaData, rowNum, columnNum, obj2, rowData) {

        if (me.panelActual !== '-panelDetailSaleCielo') {
            me.drillDown.push(me.panelActual);
            me.panelActual = '-panelDetailSaleCielo';
            global.selectedChild(me.childs, prototype.id + me.panelActual);
        }

        let dataRow = rowData.data;
        this.beanDetCielo = {};
        this.beanDetCielo.IN_SCARDN = dataRow.SCARDN;
        this.beanDetCielo.IN_SAUTHOC = dataRow.SAUTHOC;
        me.paramsDetailCielo.beanString = JSON.stringify(this.beanDetCielo);
        console.log(me.paramsDetailCielo.beanString);
        this.setGridDataSaleCielo();
    },

    setGridDataSaleCielo: function () {
        var me = this;

        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
            proxy: {
                url: prototype.url + '/searchDetailSaleCielo'
            },
            listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = me.paramsDetailCielo;
                },
                load: function (store) {
                    var pag = Ext.getCmp(prototype.id + '-paggin1');
                    var pagData = pag.getPageData();
                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));

                    me.setWidthPie();

                    var detailGrid = Ext.getCmp(prototype.id + '-gridDataDetailSaleCielo');

                    if (store.getCount() === 0) {
                        global.Msg({msg: 'Data not found.'});
                        detailGrid.setTitle('No data available');
                    } else {
                        // --- ARMADO DEL TÍTULO COMPLETO CON TODOS LOS DATOS ---
                        var data = store.getAt(0).data;

                        var dynamicTitle =
                                '<b>Sales Date:</b> ' + data.SDATE + ' &nbsp;&nbsp;|&nbsp;&nbsp; ' +
                                '<b>Country:</b> ' + data.SCOUNTRY + ' &nbsp;&nbsp;|&nbsp;&nbsp; ' +
                                '<b>PNR:</b> ' + data.SPNR + ' &nbsp;&nbsp;|&nbsp;&nbsp; ' +
                                '<b>Code:</b> ' + data.SCARCOD + ' &nbsp;&nbsp;|&nbsp;&nbsp; ' +
                                '<b>Card:</b> ' + data.SCARDN + ' &nbsp;&nbsp;|&nbsp;&nbsp; ' +
                                '<b>Auth:</b> ' + data.SAUTHOC;

                        // Asignamos el título a la grilla de detalle
                        detailGrid.setTitle(dynamicTitle);
                        // ------------------------------------------------------
                    }


                }
            }
        });

        global.clear();
        Ext.getCmp(prototype.id + '-gridDataDetailSaleCielo').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin1').bindStore(storeGridDatas);
    },
    
    
    onGridDetalleCielo: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
        
         if (me.panelActual !== '-panelDetailCielo') {
            me.drillDown.push(me.panelActual);
            me.panelActual = '-panelDetailCielo';
            global.selectedChild(me.childs, prototype.id + me.panelActual);
        }
        
         let dataRow = rowData.data;
         this.beanDetCielo = {}
         this.beanDetCielo.IN_CCUST = dataRow.CCUST;
         this.beanDetCielo.IN_SDATE = dataRow.SDATE;
         this.beanDetCielo.IN_SCOUNTRY = dataRow.SCOUNTRY;
         this.beanDetCielo.IN_TDOC = dataRow.TDOC;
         this.beanDetCielo.IN_SCARCOD = dataRow.SCARCOD;
         this.beanDetCielo.IN_SCARDN = dataRow.SCARDN;
         this.beanDetCielo.IN_SCARDNCOR = dataRow.SCARDNCOR;
         me.paramsDetailCielo.beanString = JSON.stringify(this.beanDetCielo);
        console.log(me.paramsDetailCielo.beanString)
        this.setGridDataDetallCielo();
},
setGridDataDetallCielo: function () {
    var me = this;
    
    var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
        proxy: {
            url: prototype.url + '/searchDetailCielo'
        }, 
        listeners: {
            beforeload: function (obj) {
                obj.proxy.extraParams = me.paramsDetailCielo;
            },
            load: function (store) { 
                var pag = Ext.getCmp(prototype.id + '-paggin2');
                var pagData = pag.getPageData();
                Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                
                var detailGrid = Ext.getCmp(prototype.id + '-gridDataDetailCielo');

                if (store.getCount() === 0) { 
                    global.Msg({ msg: 'Data not found.' });
                    detailGrid.setTitle('No data available');
                } else {
                    // --- ARMADO DEL TÍTULO COMPLETO CON TODOS LOS DATOS ---
                    var data = store.getAt(0).data; 
                    
                    var dynamicTitle = 
                        '<b>Sales Date:</b> ' + data.SDATE + ' &nbsp;&nbsp;|&nbsp;&nbsp; ' +
//                        '<b>Status:</b> ' + data.strDescStatus + ' &nbsp;&nbsp;|&nbsp;&nbsp; ' +
                        '<b>Country:</b> ' + data.SCOUNTRY + ' &nbsp;&nbsp;|&nbsp;&nbsp; ' +
                        '<b>Merchant:</b> ' + data.MERCHNC + ' &nbsp;&nbsp;|&nbsp;&nbsp; ' +
                        '<b>Process:</b> ' + data.COREP + ' &nbsp;&nbsp;|&nbsp;&nbsp; ' +
//                        '<b>Doc. Type:</b> ' + data.descTDOC + ' &nbsp;&nbsp;|&nbsp;&nbsp; ' +
//                        '<b>Business:</b> ' + data.NEGOC + ' &nbsp;&nbsp;|&nbsp;&nbsp; ' +
                        '<b>Code:</b> ' + data.SCARCOD + ' &nbsp;&nbsp;|&nbsp;&nbsp; ' +
                        '<b>Card:</b> '  + data.SCARDN + ' &nbsp;&nbsp;|&nbsp;&nbsp; ' +
                        '<b>Auth:</b> ' + data.SAUTHOC;
                    
                    // Asignamos el título a la grilla de detalle
                    detailGrid.setTitle(dynamicTitle);
                    // ------------------------------------------------------
                }

                me.setWidthPie();
            }
        }
    });
    
    global.clear();
    Ext.getCmp(prototype.id + '-gridDataDetailCielo').bindStore(storeGridDatas);
    Ext.getCmp(prototype.id + '-paggin2').bindStore(storeGridDatas);
},
    
    
    

    setFormatParameterARC: function () {
        me.bean = {};

        // Settlement From
        me.bean.IN_FECHA_FROM = me.buildDate(
                Ext.getCmp(prototype.id + '-cmbDateFromYearARC').getValue(),
                Ext.getCmp(prototype.id + '-cmbDateFromMonthARC').getValue(),
                Ext.getCmp(prototype.id + '-cmbDateFromDayARC').getValue()
                );

        // Settlement To
        me.bean.IN_FECHA_TO = me.buildDate(
                Ext.getCmp(prototype.id + '-cmbDateToYearARC').getValue(),
                Ext.getCmp(prototype.id + '-cmbDateToMonthARC').getValue(),
                Ext.getCmp(prototype.id + '-cmbDateToDayARC').getValue()
                );

        // Additional
        me.bean.IN_SOCIETY = Ext.getCmp(prototype.id + '-typeSocietyARC').getValue() || '';
        me.bean.IN_COMAND = Ext.getCmp(prototype.id + '-cmbComand').getValue() || '';
        me.bean.IN_FILE_NAME = Ext.getCmp(prototype.id + '-txtINameFileARC').getValue() || '';
        me.bean.IN_OPTION = Ext.getCmp(prototype.id + '-cmbInputDateARC').getValue() || '';

        var beanString = JSON.stringify(me.bean);
        searchParams = {
            bean: me.bean,
            beanString: beanString
        };

        console.log(searchParams, 'searchParamsARC');
    },
    setGridDataARC: function () {
        win.lblUser_toolTip("Estructura: MPF218");
        me.panelActual = '-panelGridDataARC';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        me.setWidthPie();

        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchARC'
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
        Ext.getCmp(prototype.id + '-gridDataDetailARC').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);

    },
    onViewCSVARC: function (column, e, row, colIndex, x, rowData) {
        let data = rowData.data;
        const filename = data.NAMEFILE;

        if (!filename) {
            Ext.Msg.alert('Error', 'No se encontró el nombre del archivo.');
            return;
        }

        const imageUrl = prototype.url
                + '/getARCImage'
                + '?filename=' + encodeURIComponent(filename);

        Ext.create('Ext.window.Window', {
            title: 'ARC Image Viewer',
            modal: true,
            width: 1300,
            height: 800,
            layout: 'fit',
            items: [{
                    xtype: 'panel',
                    autoScroll: true,
                    bodyStyle: 'background:#000;',
                    items: [{
                            xtype: 'image',
                            src: imageUrl,
                            style: {
                                display: 'block',
                                transform: 'scale(1.4)', // 🔍 nivel de zoom
                                transformOrigin: 'top left', // 🎯 foco arriba izquierda
                                margin: '0'
                            }
                        }]
                }],
            buttons: [{
                    text: 'Close',
                    handler: function (btn) {
                        btn.up('window').close();
                    }
                }]
        }).show();

    },
    onDownloadCSVARC: function (column, e, row, colIndex, x, rowData) {
        let data = rowData.data;

        const datePed = data.PEDARC;     // "25/12/07"  (YY/MM/DD)
        let filename = data.NAMEFILE;   // sin .txt

        if (!datePed || !filename) {
            Ext.Msg.alert(
                    'Error',
                    'Faltan parámetros para la descarga (Date PED, File Name).'
                    );
            return;
        }

        // PEDARC = YY/MM/DD
        const parts = datePed.split('/');

        if (parts.length !== 3) {
            Ext.Msg.alert('Error', 'Formato de fecha PED inválido: ' + datePed);
            return;
        }

        const year = '20' + parts[0];   // ✅ 25 → 2025

        // asegurar extensión .txt
        if (!filename.toLowerCase().endsWith('.txt')) {
            filename += '.txt';
        }

        const url = prototype.url + '/getTXTARC'
                + '?year=' + encodeURIComponent(year)
                + '&filename=' + encodeURIComponent(filename);

        console.log('Solicitando:', url);

        global.getFile(url);
    },
    onGridDetDirectSales: function (column, cell, rowIndex, colIndex, e, record) {
        var data = record.data;

        // colIndex del árbol: 1=Airline, 2=Qty/Total, 4=Auto, 6=Manual, 8=W/O Settlement
        var stVal = '';
        switch (colIndex) {
            case 4:
                stVal = '1'; // Auto -> Match
                break;
            case 6:
                stVal = '5'; // Manual -> Match Manual
                break;
            case 8:
                stVal = '3'; // W/O Settlement -> Pending
                break;
            default:
                stVal = ''; // Airline o Qty/Total -> todos los estados
                break;
        }

        me.drillDown.push(me.panelActual);
        me.panelActual = '-panelDetailDirectSales';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        var bean = {};
        bean.IN_CCUST = data.CCUST || '';
        bean.IN_SEARCH = Ext.getCmp(prototype.id + '-cmbInputDate').getValue() || 'A';
        bean.IN_PERIODO = data.ADATE || '';
        bean.IN_STVAL = stVal;
        bean.IN_SCOUNTRY = Ext.getCmp(prototype.id + '-cmbCountry').getValue() || '';
        me.paramsDetail.beanString = JSON.stringify(bean);
        me.beanDetDirectSales = bean;

        this.setGridDetDirectSales();
    },
    setGridDetDirectSales: function () {
        win.lblUser_toolTip("Estructura: MPS775");
        me.setWidthPie();

        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchDetail'
            },
            listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = me.paramsDetail;
                },
                load: function (obj) {
                    var pag = Ext.getCmp(prototype.id + '-paggin3');
                    var pagData = pag.getPageData();
                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));

                    var detGrid = Ext.getCmp(prototype.id + '-gridDetailDirectSales');
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                        detGrid.setTitle('No data available');
                    } else {
                        var names = {'133': 'Lacsa', '134': 'Avianca', '202': 'Taca', '547': 'Aerogal', '729': 'Tampa'};
                        var estados = {'1': 'Auto', '5': 'Manual', '3': 'W/O Statement'};
                        var bean = me.beanDetDirectSales || {};
                        var airlineTxt = bean.IN_CCUST ? (names[bean.IN_CCUST] || bean.IN_CCUST) : 'Avianca Group';
                        var estadoTxt = estados[bean.IN_STVAL] || 'Total';

                        detGrid.setTitle(
                                '<b>Period:</b> ' + (bean.IN_PERIODO || '') +
                                ' &nbsp;&nbsp;|&nbsp;&nbsp; <b>Airline:</b> ' + airlineTxt +
                                ' &nbsp;&nbsp;|&nbsp;&nbsp; <b>Status:</b> ' + estadoTxt
                                );
                    }

                    me.setWidthPie();
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDetailDirectSales').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin3').bindStore(storeGridDatas);
        this.getPaggin();
    },
    onEditDirectSalesClick: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        Ext.create('Ext.Praxis.view.payments.DirectSalesForm.DataEntry', {
            id: prototype.id + '-dataEntry',
            params: {
                action: 'U',
                rec: rec
            }
        }).show();
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
            case  '-panelGridDataDetail':
                global.getFile(prototype.url + '/getXLSXDashboard?beanString=' + encodeURI(searchParams.beanString));
                break;
            case  '-panelDetailDirectSales':
                global.getFile(prototype.url + '/getXLSXDetail?beanString=' + encodeURI(me.paramsDetail.beanString));
                break;
            case  '-panelGridDataARC':
                global.getFile(prototype.url + '/getXLSXARC?beanString=' + encodeURI(searchParams.beanString));
                break;
            default:
                global.Msg({msg: 'Under Construction'});
        }
    },
    buildDate: function (y, m, d) {
        // Convertir a string y limpiar
        y = String(y || '').trim();
        m = String(m || '').trim();
        d = String(d || '').trim();

        if (!y)
            return '';

        // Asegurar que mes tenga 2 dígitos si existe
        if (m) {
            m = m.padStart(2, '0');
            // Asegurar que día tenga 2 dígitos si existe
            if (d) {
                d = d.padStart(2, '0');
            }
        }

        return y + m + d;
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
        var option = Ext.getCmp(prototype.id + '-contentFilter');
        if (option.isVisible()) {
            option.setVisible(false);
        } else {
            option.setVisible(true);
        }
    },
    getPaggin: function () {
        me.pagginActual = '';
        console.log(me.panelActual, 'me.panelActual')
        switch (me.panelActual) {
            case  '-panelGridDataDetail':
                // MPS774 no pagina (dataset agregado), no hay footer de paginación
                Ext.getCmp(prototype.id + '-pie').setVisible(false);
                me.pagginActual = '';
                break;
            case  '-panelGridDataARC':
                me.pagginActual = '-paggin';
                Ext.getCmp(prototype.id + '-pie').setVisible(true);
                me.pagginActual = '-paggin';
                break;
            case  '-panelDetailDirectSales':
                me.pagginActual = '-paggin3';
                Ext.getCmp(prototype.id + '-pie').setVisible(true);
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
        if (comboToYear.getValue() <= comboFromYear.getValue() && comboToMonth.getValue() < comboFromMonth.getValue()) {
            comboFromMonth.setValue(comboToMonth.getValue())
        }
    },
    selectComboFromMonth: function (obj) {
        var comboToMonth = Ext.getCmp(prototype.id + '-cmbDateToMonth');
        comboToMonth.setValue(obj.getValue());
    },
    selectComboFromDay: function (obj) {
        var comboToDay = Ext.getCmp(prototype.id + '-cmbDateToDay');
        comboToDay.setValue(obj.getValue());
    },
    selectComboFromYearARC: function (obj) {
        var comboToYear = Ext.getCmp(prototype.id + '-cmbDateToYearARC');
        var storeComboDataYear = win.getStoreYear2(false, obj.getValue());
        let comboFromYear = Ext.getCmp(prototype.id + '-cmbDateFromYearARC');
        let comboFromMonth = Ext.getCmp(prototype.id + '-cmbDateFromMonthARC');
        let comboToMonth = Ext.getCmp(prototype.id + '-cmbDateToMonthARC');
        comboToYear.bindStore(storeComboDataYear);
        comboToYear.setValue(obj.getValue());
        if (comboToYear.getValue() <= comboFromYear.getValue() && comboToMonth.getValue() < comboFromMonth.getValue()) {
            comboFromMonth.setValue(comboToMonth.getValue())
        }
    },
    selectComboFromMonthARC: function (obj) {
        var comboToMonth = Ext.getCmp(prototype.id + '-cmbDateToMonthARC');
        comboToMonth.setValue(obj.getValue());
    },
    selectComboFromDayARC: function (obj) {
        var comboToDay = Ext.getCmp(prototype.id + '-cmbDateToDayARC');
        comboToDay.setValue(obj.getValue());
    },
    getPeriodoYYYYMM: function (strFormatDate) {
        if (!strFormatDate)
            return null;

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
            this.btnSearch_click();
        }
    },
    onDownloadCSV: function (column, e, row, colIndex, x, rowData) {
        let data = rowData.data;
        const country = data.COUNTRY;
        const dateSett = data.DATESETT;
        const customer = data.CUSTOMER;
        const filename = data.NAMEFILE;

        if (!country || !dateSett || !customer) {
            Ext.Msg.alert('Error', 'Faltan parámetros para la descarga (Country, Customer o Settlement Date).');
            return;
        }

        const url = prototype.url + '/getCSV'
                + '?country=' + encodeURIComponent(country)
                + '&dateSett=' + encodeURIComponent(dateSett)
                + '&customer=' + encodeURIComponent(customer)
                + '&filename=' + encodeURIComponent(filename);

        console.log('Solicitando:', url);

        global.getFile(url);
    },
    onDownloadAllCSV: function () {
        let me = this;
        let url = null;

        switch (me.panelActual) {

            case '-panelGridDataDetail': // BSP
                console.log('ZIP BSP permitido');
                url = prototype.url + '/getBulkCSV';
                break;

            case '-panelGridDataARC': // ARC
                console.log('ZIP ARC permitido');
                url = prototype.url + '/getBulkTXTARC';
                break;

            default:
                global.Msg({msg: 'Under Construction'});
                return;
        }

        if (!searchParams || !searchParams.beanString) {
            Ext.Msg.alert(
                    "Error",
                    "Debe realizar una búsqueda antes de descargar."
                    );
            return;
        }

        console.log("Solicitando ZIP con filtros:", searchParams);
        console.log("Endpoint:", url);

        me.getFileByPost(url, {
            beanString: searchParams.beanString
        });
    },
    getFileByPost: function (url, params) {
        var form = document.createElement("form");
        form.setAttribute("method", "POST");
        form.setAttribute("action", url);
        form.setAttribute("target", "_blank");

        for (var key in params) {
            if (params.hasOwnProperty(key)) {
                var hiddenField = document.createElement("input");
                hiddenField.setAttribute("type", "hidden");
                hiddenField.setAttribute("name", key);
                hiddenField.setAttribute("value", params[key]);
                form.appendChild(hiddenField);
            }
        }

        document.body.appendChild(form);
        form.submit();
        form.remove();
    }
}
);