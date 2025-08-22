Ext.define('Ext.Praxis.controller.payments.TemplateReconciliation.TemplateReconciliationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.TemplateReconciliationController',
    fecha: new Date(),
    objA3096: {},
    bean: {},
    beanTicket: {},
    beanExcel: {},
    beanDetDay: {},
    beanDebits: {},
    beanBandoc: {},
    beanDiscounts: {},
    beanSales: {},
    beanSettlements: {},
    beanHead: {},
    beanConciliation: {},
    loadDate: '',
    searchParams: {},
    paramsObtainData: {},
    paramsDetail: {},
    me: '',
    childs: '',
    drillDown: [],
    gridActual: '-boxMainData',
    boxActual: '-vskMain',
    pagginActual: '-paggin',
    user: '',
    esIgual: 0,
    columnCode: '',
    init: function (view) {
        me = this;
        prototype.urlMaster = CONTEXTPATH + '/MasterController';
        prototype.urlBank = CONTEXTPATH + '/BankReconciliation';
//        this.childs = Ext.getCmp(prototype.id + '-panelMain').items.items;
        me.panelActual = '-panelGridDataDetalle';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
//        console.log(this.childS, 'HIJOSSSS')
        this.control({
            // -------------------Eventos Genericos --------------------
            '#TemplateReconciliationForm-xpanel': {
                afterrender: this.xpanel_afterrender
            },
            '#TemplateReconciliationForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#TemplateReconciliationForm-btnClear': {
                click: this.btnClear_click
            },
            '#TemplateReconciliationForm-btnBack': {
                click: this.btnBack_click
            },
            '#TemplateReconciliationForm-cmbDateFromYear': {
                afterrender: this.afterRenderYear,
                select: this.selectComboFromYear
            },
            '#TemplateReconciliationForm-cmbDateToYear': {
                afterrender: this.afterRenderYear,
                select: this.selectComboFromYear
            },
            '#TemplateReconciliationForm-cmbDateFromMonth': {
                afterrender: this.afterRenderMonth,
                select: this.selectComboFromMonth
            },
            '#TemplateReconciliationForm-cmbDateFromDay': {
                afterrender: this.afterRenderDay,
                select: this.selectComboFromDay
            },
            '#TemplateReconciliationForm-cmbDateToMonth': {
                afterrender: this.afterRenderMonth
            },
            '#TemplateReconciliationForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#TemplateReconciliationForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#TemplateReconciliationForm-btn-pag-next': {
                click: this.pagNext
            },
            '#TemplateReconciliationForm-btn-pag-last': {
                click: this.pagLast
            },
            '#TemplateReconciliationForm-btnTxtLayoutBsplink': {
                click: this.btnTxtLayoutBsplink
            },
            '#TemplateReconciliationForm-btnTxtLayoutBsplink_UATP': {
                click: this.btnTxtLayoutBsplink_UATP
            },
            '#TemplateReconciliationForm-btnTxtLayoutBsplink_UATPUnif': {
                click: this.btnTxtLayoutBsplink_UATPUnif
            },
            '#TemplateReconciliationForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#TemplateReconciliationForm-btnLog': {
                click: this.executeLog
            },
            '#TemplateReconciliationForm-btnExcelLog': {
                click: this.btnExcelLog_click
            },
        });

    },
    init_this: function () {
        me = this;
    },
    xpanel_afterrender: function(obj, e) {
        this.setStoreData();
//        this.btnSearch_click();
    },
    
    btnSearch_click: function () {
        this.setFormatParameter();
//        this.search();
    },
    setFormatParameter: function () {
        
        me.bean = {};
        let getCustomer = Ext.getCmp(prototype.id + '-typeClient').getValue();
        let getProcessor = Ext.getCmp(prototype.id + '-cmbCOREP').getValue();
        let getDateFrom = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue() +
                                Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue() + Ext.getCmp(prototype.id + '-cmbDateDay').getValue();
        let getDateTo = Ext.getCmp(prototype.id + '-cmbDateToYear').getValue() +
                                Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue() + Ext.getCmp(prototype.id + '-cmbDateToDay').getValue();

        me.bean.IN_CCUST = getCustomer;
//        me.bean.IN_DATE = getSettlementDate;
        me.bean.IN_DATE_FROM = getDateFrom;
        me.bean.IN_DATE_TO = getDateTo;
        me.bean.IN_CODPRO = 'WPP';
        me.panelActual = '-vskMain';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        this.searchParams.beanString = JSON.stringify(me.bean);
        console.log(me.bean, 'me.bean')
        
    },
    search: function () {
        
        let lstData = []

        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/getPendingSettlements'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = me.searchParams;
                },
                load: function(obj) {
                    console.log(obj,'obj')
                    var pag = Ext.getCmp(prototype.id + '-paggin2');
                    var pagData = pag.getPageData();
                    console.log(pagData,'pagData')

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
//        Ext.getCmp(prototype.id + '-gridData').bindStore(storeGridDatas);
//        Ext.getCmp(prototype.id + '-paggin2').bindStore(storeGridDatas);
//        Ext.getCmp(prototype.id + '-pie').setVisible(true);
    },
    showGrid: function (nameGrid) {

        if (me.drillDown.indexOf(nameGrid) === -1) {
            var paginacion = Ext.getCmp(prototype.id + '-boxPag');
            //Mostrar paginacion
            if (nameGrid === '-vskMain' || nameGrid === '-panelGridDataDetalle')
            {
                paginacion.setVisible(true);
            } else {
                paginacion.setVisible(false);
            }

            me.drillDown.push(nameGrid);
            Ext.getCmp(prototype.id + me.boxActual).hide();
            me.boxActual = nameGrid;
            Ext.getCmp(prototype.id + me.boxActual).show();
            console.log(me.drillDown,'me.drillDown')
        }
    },
    btnExcel_click: function () {
        this.setFormatParameter();
        console.log(this.searchParams,'this.searchParams')
        Ext.Msg.show({
            title: '.:PRAXISEX:.',
            msg: 'Download Excel ?',
            buttons: Ext.MessageBox.OKCANCEL,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn === 'ok') {
                    this.exportExcel();
                }
            }
        });
    },
    exportExcel: function() {
        console.log(this.boxActual,'this.boxActual')
        console.log(me.boxActual,'this.boxActual')
        if (this.boxActual === '-boxMainData') {
            console.log('entre excel')
            me.goURLpost('excelAccountingInterfaces', this.searchParams.beanString, Ext.getCmp(prototype.id + '-gridData').config.columns.items);
        }
    },
    getPaggin: function () {
        me.pagginActual = '';
        switch (me.panelActual) {
            case  '-panelGridDataDetalle':
                me.pagginActual = '-paggin';
                break;
            case '-vskMain':
                me.pagginActual = '-paggin2';
                break;
            case '-panelGridDataDay':
                me.pagginActual = '-paggin3';
                break;
            case '-panelGridDataDetalle':
                me.pagginActual = '-paggin4';
                break;
            case '-panelGridDetCardByS':
                me.pagginActual = '-paggin5';
                break;
            case '-panelGridDetCardNbrByS':
                me.pagginActual = '-paggin6';
                break;
            case '-panelGridDataTicket':
                me.pagginActual = '-paggin7';
                break;
            case '-panelGridDetDayByS':
                me.pagginActual = '-paggin8';
                break;
            case '-boxDebitsData':
                me.pagginActual = '-pagginDebits';
                break;
            case '-panelGridDetCardByS_Debits':
                me.pagginActual = '-pagginDebits_country';
                break;
            case '-panelGridDataDetalle_DEBITS':
                me.pagginActual = '-pagginDebits_detail';
                break;
        }

    },
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
    eventKey: function (e, eOpts) {
        if (eOpts.getKey() === 13) {
            this.btnSearch_click();
        }
    },
    joinMultiSelect: function (element){
        let comboBox = element.getValue();
        return comboBox.join('|');
    },
    selectedChild: function (padre, child, add) {
        add = add === undefined ? true : add;
        if (add && this.peek() !== prototype.id + '-' + child)
            this.stack.push(prototype.id + '-' + child);
        win.selectedChild(padre, child);
        var paggin = this.getPaggin();
        if (paggin === null) {
            Ext.getCmp(prototype.id + '-boxPaginacion').hide();
            Ext.getCmp(prototype.id + '-boxPagDetail').hide();
            console.log('NIKAAAAAAAAAA')
        } else {
            var pagData = paggin.getPageData();
            console.log('selectedChild');
            console.log(padre + child + add);
            console.log(Ext.getCmp(prototype.id + '-paggin9'));
            console.log(paggin);
            console.log(pagData);

            var currentPage = win.formatLngNumber(pagData.currentPage);
            var pageCount = win.formatLngNumber(pagData.pageCount);
            var total = win.formatLngNumber(pagData.total);

            win.setText('lblPagActual', currentPage);
            win.setText('lblPagTotal', pageCount);
            win.setText('lblRowsTotal', total);

            Ext.getCmp(prototype.id + '-boxPaginacion').show();
            Ext.getCmp(prototype.id + '-boxPagDetail').show();

            var width = 0, wt;
            var boxChild = Ext.getCmp(prototype.id + '-' + child).items.items;
            for (var i = 0; i < boxChild.length; i++) {
                wt = boxChild[i].getWidth();
                if (wt > width) {
                    width = wt;
                }
            }
            Ext.getCmp(prototype.id + '-boxPagDetail').setWidth(width);
        }
    },
    updateTotalsOnCheck: function(column, rowIndex, checked, record) {
        let recordSettlements = me.getGridRecords(prototype.id + '-gridData');
        let totalSettlements = 0;
        let totalComision = 0;
        let totalComistota = 0;
        let totalNeto = 0;

        // Calcular totales
        for (let row of recordSettlements) {
            totalSettlements += row.TOTAL || 0;
            totalComision += row.COMISION || 0;
            totalComistota += row.COMISTOTA || 0;
            totalNeto += row.NETO || 0;
        }

        var grid = Ext.getCmp(prototype.id + '-gridData');
        var store = grid.getStore();
        var tam = store.getCount();

        // Actualizar el último registro con los totales
        if (tam > 0) {
            var lastRecord = store.getAt(tam - 1);
            lastRecord.set('TOTAL_LIQ', totalSettlements);
            lastRecord.set('TOTAL_COMISION', totalComision);
            lastRecord.set('TOTAL_COMISTOTA', totalComistota);
            lastRecord.set('TOTAL_NETO', totalNeto);
        }

        // Actualizar selecciones
        store.suspendEvents();
        store.each(function(record) {
            record.set('select', record.get('checkActive') === true); // Asumo que debería ser como en tu función original
            record.commit();
        });
        store.resumeEvents();

        grid.getView().refresh();
        
        me.updateGridTotal()
    },
    updateGridBandoc: function (column, rowIndex, checked, record) {
        var grid = Ext.getCmp(prototype.id + '-gridData21');
        var store = grid.getStore();

        grid.getView().refresh();

        store.suspendEvents();
        store.each(function (record) {
            record.set('select', record.get('checkActive') === true);
            record.commit();
        });
        store.resumeEvents();
        
        me.updateGridTotal();
    },
    updateGridBandocSale: function (column, rowIndex, checked, record) {

        let recordBandocSale = me.getGridRecords(prototype.id + '-gridData212');
        let totalBandocSale = 0;
        
        for (let row of recordBandocSale) {
            totalBandocSale += row.NETO || 0;
        }
        
        var grid = Ext.getCmp(prototype.id + '-gridData212');
        var store = grid.getStore();
        var tam = store.getCount();
        
        if (tam > 0) {
            var lastRecord = store.getAt(0);
            lastRecord.set('TOTAL_NETO', totalBandocSale);
        }

        grid.getView().refresh();

        store.suspendEvents();
        store.each(function (record) {
            record.set('select', record.get('checkActive') === true);
            record.commit();
        });
        store.resumeEvents();
        
        var grid = Ext.getCmp(prototype.id + '-gridData212');
        var store = grid.getStore();

        grid.getView().refresh();

        store.suspendEvents();
        store.each(function (record) {
            record.set('select', record.get('checkActive') === true);
            record.commit();
        });
        store.resumeEvents();
        
        me.updateGridTotalSale();
    },
    updateGridSale: function (column, rowIndex, checked, record) {

        let recordBandocSale = me.getGridRecords(prototype.id + '-gridDataVentas');
        let totalBandocSale = 0;
        
        for (let row of recordBandocSale) {
            totalBandocSale += row.SVFOP || 0;
        }
        
        console.log(totalBandocSale,'totalBandocSale')
        
        var grid = Ext.getCmp(prototype.id + '-gridDataVentas');
        var store = grid.getStore();
        var tam = store.getCount();
        
        if (tam > 0) {
            var lastRecord = store.getAt(0);
            lastRecord.set('TOTAL_SVFOP', totalBandocSale);
        }

        grid.getView().refresh();

        store.suspendEvents();
        store.each(function (record) {
            record.set('select', record.get('checkActive') === true);
            record.commit();
        });
        store.resumeEvents();
        
        var grid = Ext.getCmp(prototype.id + '-gridDataVentas');
        var store = grid.getStore();

        grid.getView().refresh();

        store.suspendEvents();
        store.each(function (record) {
            record.set('select', record.get('checkActive') === true);
            record.commit();
        });
        store.resumeEvents();
        
        me.updateGridTotalSale();
    },
    updateGridDiscount: function (column, rowIndex, checked, record) {
        console.log(record.data.blockChange,'record')
        
        if (record.data.blockChange) {
            // Restaurar el valor anterior
            record.set('checkActive', true);
            // Salir de la función sin hacer nada más
            return;
        }

        let recordDiscount = me.getGridRecords(prototype.id + '-gridDataDescuentos');
        let totalImport = 0;
        let totalImportPag = 0;
        
        for (let row of recordDiscount) {
            totalImport += row.IMPORTECeba || 0;
            totalImportPag += row.IMPORTEPAG || 0;
        }
        
        var grid = Ext.getCmp(prototype.id + '-gridDataDescuentos');
        var store = grid.getStore();
        var tam = store.getCount();
        
        if (tam > 0) {
            var lastRecord = store.getAt(0);
            lastRecord.set('TOTAL_IMPORTE', totalImport);
            lastRecord.set('TOTAL_IMPORTEPAG', totalImportPag);
        }

        grid.getView().refresh();

        store.suspendEvents();
        store.each(function (record) {
            record.set('select', record.get('checkActive') === true);
            record.commit();
        });
        store.resumeEvents();
        
        me.updateGridTotal();
    },
    updateGridHead: function (column, rowIndex, checked, record) {
        var grid = Ext.getCmp(prototype.id + '-gridDataCabecera');
        var store = grid.getStore();

        store.suspendEvents();
        store.each(function (record) {
            record.set('select', true);
            record.commit();
        });
        store.resumeEvents();
        grid.getView().refresh();
    },
    searchAllGrid: function (e, eOpts) {
        if (eOpts.getKey() !== 13) return false;
        this.searchDiscounts();
        this.searchSettlements();
    },
    verifyConciliation: function() {
        
//        if (this.esIgual !== 0) {
//            Ext.Msg.show({
//                title: '.:PRAXISEX:.',
//                msg: 'La Diferencia tiene que ser 0.',
//                buttons: Ext.MessageBox.OK,
//                icon: Ext.MessageBox.ERROR,
//                modal: true
//            });
//            return
//        }
        
        Ext.Msg.show({
            title: '.:PRAXISEX:.',
            msg: 'Are you sure you want to execute the conciliation?',
            buttons: Ext.MessageBox.OKCANCEL,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn === 'ok') {
                    this.executeConciliation();
                }
            }
        });
    },
    executeConciliation: function() {
        let me = this;
        me.beanConciliation = {};
        
        let recordDiscounts = me.getGridRecordsDiscount(prototype.id + '-gridDataDescuentos');
        let recordBandoc = me.getGridRecords(prototype.id + '-gridData21');
        let recordSettlements = me.getGridRecords(prototype.id + '-gridData');
        let recordHead = me.getGridRecords(prototype.id + '-gridDataCabecera');
        let recordSale = me.getGridRecords(prototype.id + '-gridDataVentas');
        let getProcess = Ext.getCmp(prototype.id + '-cmbCOREP').getValue();
        let getCustomer = Ext.getCmp(prototype.id + '-typeClient').getValue();
        
        if (!recordBandoc.length) {
            global.Msg({
                msg: 'No ha seleccionado un bandoc.'
            });
            return
        }
        
        if (getProcess !== "VN" && getProcess !== "BM" && getProcess !== "CO") {
            if (!recordSettlements.length) {
                global.Msg({
                    msg: 'No ha seleccionado liquidaciones.'
                });
                return
            }
        } else {
            if (!recordSale.length) {
                global.Msg({
                    msg: 'No ha seleccionado Ventas.'
                });
                return
            }
        }
        
        let cleanSettlements = recordSettlements.map(function(item) {
            return {
                RN: item.RN,
                SDATE: item.SDATE ? item.SDATE.trim() : '',
                SCOUNTRY: item.SCOUNTRY ? item.SCOUNTRY.trim() : '',
                TDOC: item.TDOC ? item.TDOC.trim() : '',
                CODEBANK: item.CODEBANK ? item.CODEBANK.trim() : '',
                SCARCOD: item.SCARCOD ? item.SCARCOD.trim() : '',
                SCARDN: item.SCARDN ? item.SCARDN.trim() : '',
                SAUTHOC: item.SAUTHOC ? item.SAUTHOC.trim() : '',
                SEQ: item.SEQ ? item.SEQ.trim() : '',
                SVFOP: item.SVFOP,
                TOTAL: item.TOTAL,
                NETO: item.NETO,
                CODPRO: item.CODPRO ? item.CODPRO.trim() : '',
                CCUSTPRO: item.CCUSTPRO ? item.CCUSTPRO.trim() : '',
                PRDA: item.PRDA ? item.PRDA.trim() : '',
                ADATE: item.ADATE ? item.ADATE.trim() : '',
                MERCHAND: item.MERCHAND ? item.MERCHAND.trim() : '',
                LIQUIDACIO: item.LIQUIDACIO ? item.LIQUIDACIO.trim() : '',
                SCURRENCY: item.SCURRENCY ? item.SCURRENCY.trim() : '',
                IMPORTEPAG: item.IMPORTEPAG
            };
        });
        
        let cleanDiscounts = recordDiscounts.map(function(item) {
            return {
                RN: item.RN,
                CODPRO: item.CODPRO,
                FLIQUIDACI: item.FLIQUIDACI,
                MONEDA: item.MONEDA,
                CCUSTPRO: item.CCUSTPRO,
                CCUST: item.CCUST,
                PRDA: item.PRDA,
                ADATE: item.ADATE,
                MERCHAND: item.MERCHAND,
                MONEDAPAGO: item.MONEDAPAGO,
                LIQUIDACIO: item.LIQUIDACIO,
                IMPORTECeba: item.IMPORTECeba,
                IMPORTEPAG: item.IMPORTEPAG
            };
        });

        let cleanBandoc = recordBandoc.map(function(item) {
            return {
                CCUST: item.CCUST,
                BANDOC: item.BANDOC,
                VALDATE: item.VALDATE,
                ADATE: item.ADATE,
                NETO: item.NETO,
                ACCOUNT: item.ACCOUNT,
                SOCIETY: item.SOCIETY,
                CODEBANK_EC: item.CODEBANK
            };
        });
        
        let cleanSale = recordBandoc.map(function(item) {
            return {
                CCUST: item.CCUST,
                CCIA: item.CCIA,
                FORMA: item.FORMA,
                SERIE: item.SERIE,
                TDOC: item.TDOC,
                SCARDNCOR: item.SCARDNCOR,
                SAUTHOC: item.SAUTHOC,
                SEQ: item.SEQ,
                CORRL: item.CORRL,
                SVFOP: item.SVFOP,
                TOTAL: item.TOTAL,
            };
        });

        console.log(cleanSettlements)
        console.log(cleanDiscounts)
        console.log(cleanBandoc)
        console.log(cleanSale)

        me.beanConciliation.IN_CCUST = getCustomer;
        me.beanConciliation.IN_CODPRO = getProcess;

        let searchParamsConciliation = {
            beanString: JSON.stringify(me.beanConciliation),
            beanDiscounts: JSON.stringify(cleanDiscounts),
            beanBandoc: JSON.stringify(cleanBandoc),
            beanHead: JSON.stringify(recordHead),
            beanSettlements: JSON.stringify(cleanSettlements),
            beanSales: JSON.stringify(cleanSale)
        };
        
        console.log(searchParamsConciliation, 'searchParamsConciliation');
        
        me.sendConciliation(searchParamsConciliation, function(responseData) {
            console.log(responseData)
        });
        
    },
    sendConciliation: function (params, callback) {
        Ext.Ajax.request({
            url: prototype.url + '/executeConciliation',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: params.beanString, beanDiscounts: params.beanDiscounts, beanBandoc: params.beanBandoc, 
                beanHead: params.beanHead, beanSettlements: params.beanSettlements, beanSales:params.beanSales},
            beforerequest:  Ext.getCmp(prototype.id + '-xpanel').mask('Loading...'),
            success: function(response, options) {
                
                Ext.getCmp(prototype.id + '-xpanel').unmask('Loading...');
                let res = Ext.JSON.decode(response.responseText);
                console.log(res,'res')

                if (res.success) {
                    global.Msg({msg: res.result});
                    
                    Ext.getCmp(prototype.id + '-gridDataDescuentos').getStore().removeAll();
                    Ext.getCmp(prototype.id + '-gridDataDescuentos').getView().refresh();
                    
                    Ext.getCmp(prototype.id + '-gridData21').getStore().removeAll();
                    Ext.getCmp(prototype.id + '-gridData21').getView().refresh();
                    
                    Ext.getCmp(prototype.id + '-gridDataVentas').getStore().removeAll();
                    Ext.getCmp(prototype.id + '-gridDataVentas').getView().refresh();
                    
                    me.searchSettlements();
                    me.updateGridTotal();
                    
                } else {
                    
                    global.Msg({msg: res.result});
                    
                    callback(res); 
                }
            },
            failure: function(response, options) {
                Ext.getCmp(prototype.id + '-xpanel').unmask('Loading...');
                console.error("Error en la petición AJAX");
                global.Msg({msg: "Error al obtener datos"});
            }
        });
    },
    getGridRecords: function(gridId) {
        var grid = Ext.getCmp(gridId);
        if (!grid) {
            console.error('Grid not found with ID:', gridId);
            return [];
        }

        var store = grid.getStore();
        if (!store) {
            console.error('The grid has no associated store.');
            return [];
        }

        return store.getRange()
            .map(record => record.getData())
            .filter(data => data.checkActive === true);
    },
    getGridRecordsDiscount: function(gridId) {
        var grid = Ext.getCmp(gridId);
        if (!grid) {
            console.error('Grid not found with ID:', gridId);
            return [];
        }

        var store = grid.getStore();
        if (!store) {
            console.error('The grid has no associated store.');
            return [];
        }

        return store.getRange()
            .map(record => record.getData())
            .filter(data => data.checkActive === true && data.blockChange === false);
    },
    getGridRecordsSettlements: function(gridId) {
        var grid = Ext.getCmp(gridId);
        if (!grid) {
            console.error('Grid not found with ID:', gridId);
            return [];
        }

        var store = grid.getStore();
        if (!store) {
            console.error('The grid has no associated store.');
            return [];
        }

        return store.getRange()
            .map(record => record.getData())
            .filter(data => data.checkActive === true);
    },
    // <editor-fold defaultstate="collapsed" desc="Llenar Grilla Bandoc para Ventas">
    searchBandocSales: function (e, eOpts) {
        if (eOpts.getKey() !== 13) return false;
        this.fetchBandocSales();
    },
    fetchBandocSales: function () {
        let me = this;
        me.beanBandoc = {};

        let getProcess  = Ext.getCmp(prototype.id + '-cmbCOREP').getValue();
        let getBandoc   = Ext.getCmp(prototype.id + '-txtBandocSale').getValue();
        let getCustomer = Ext.getCmp(prototype.id + '-typeClient').getValue();

        me.beanBandoc.IN_CCUST    = getCustomer;
        me.beanBandoc.IN_BANDOC   = getBandoc;
        me.beanBandoc.IN_DATEFROM = '';
        me.beanBandoc.IN_DATETO   = '';
        me.beanBandoc.IN_CODPRO   = '';

        let searchParamsBandoc = {
            beanString: JSON.stringify(me.beanBandoc)
        };
        
        me.getBandocSales(searchParamsBandoc);
       
    },
    getBandocSales: function (params) {
        
        var storeGridDiscounts = Ext.create('Ext.Praxis.store.flown.PassengerConciliation.GridData', {
            proxy: {
                url: prototype.url + '/getPendingDepositsSales'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = params;
                },
                load: function(obj) {
                    console.log(obj.data, 'BANDOC SALE');
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    } else {
                        var bean = obj.data.items[0].data;
                    }
                    
                    me.updateGridTotalSale();
                }
            }
        });

        Ext.getCmp(prototype.id + '-gridData212').setStore(storeGridDiscounts);
        storeGridDiscounts.load();
        
    },
    // </editor-fold>
    // <editor-fold defaultstate="collapsed" desc="Llenar Grilla Bandoc">
    searchBandoc: function (e, eOpts) {
        if (eOpts.getKey() !== 13) return false;
        this.fetchBandoc();
    },
    fetchBandoc: function () {
        let me = this;
        me.beanBandoc = {};

        let getProcess  = Ext.getCmp(prototype.id + '-cmbCOREP').getValue();
        let getBandoc   = Ext.getCmp(prototype.id + '-txtBandoc').getValue();
        let getCustomer = Ext.getCmp(prototype.id + '-typeClient').getValue();

        me.beanBandoc.IN_CCUST    = getCustomer;
        me.beanBandoc.IN_BANDOC   = getBandoc;
        me.beanBandoc.IN_DATEFROM = '';
        me.beanBandoc.IN_DATETO   = '';
        me.beanBandoc.IN_CODPRO   = '';

        let searchParamsBandoc = {
            beanString: JSON.stringify(me.beanBandoc)
        };
        
        me.getBandoc(searchParamsBandoc);
       
    },
    getBandoc: function (params) {
        
        var storeGridDiscounts = Ext.create('Ext.Praxis.store.flown.PassengerConciliation.GridData', {
            proxy: {
                url: prototype.url + '/getPendingDeposits'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = params;
                },
                load: function(obj) {
                    console.log(obj.data);
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    } else {
                        var bean = obj.data.items[0].data;
                    }
                    
                    me.updateGridTotal();
                }
            }
        });

        Ext.getCmp(prototype.id + '-gridData21').setStore(storeGridDiscounts);
        storeGridDiscounts.load();
        
    },
    // </editor-fold>
    // <editor-fold defaultstate="collapsed" desc="Llenar Grilla Descuentos">
    searchDiscounts: function () {
        let recordSettlements = me.getGridRecords(prototype.id + '-gridData');
        
        if (!recordSettlements.length) {
            global.Msg({
                msg: 'Seleccione las liquidaciones primero.'
            });
            return;
        }
        
        this.fetchDiscounts();
    },
    fetchDiscounts: function () {
        let me = this;
        me.beanDiscounts = {};

        let getProcess = Ext.getCmp(prototype.id + '-cmbCOREP').getValue();
        let getCustomer = Ext.getCmp(prototype.id + '-typeClient').getValue();
        let getDateFrom = Ext.Date.format(Ext.getCmp(prototype.id + '-txtFromDisc').getValue(), 'Ymd');
        let getDateTo = Ext.Date.format(Ext.getCmp(prototype.id + '-txtToDisc').getValue(), 'Ymd');
        let getMerchant = Ext.getCmp(prototype.id + '-txtMerchant').getValue();
        let getLiquidation = Ext.getCmp(prototype.id + '-txtLiquidation').getValue();
        let recordSettlements = me.getGridRecords(prototype.id + '-gridData');
        let merchands = [];
        let liquidaciones = [];
        
        for (let sett of recordSettlements) {
            let merch = (sett.MERCHAND || '').toString().trim();
            let liq = (sett.LIQUIDACIO || '').toString().trim();

            if (!merchands.includes(merch)) {
                merchands.push(merch);
            }

            if (!liquidaciones.includes(liq)) {
                liquidaciones.push(liq);
            }
        }
        
        
        me.beanDiscounts.IN_CCUST = getCustomer;
        me.beanDiscounts.IN_CODPRO = getProcess;
        me.beanDiscounts.IN_DATEFROM = getDateFrom;
        me.beanDiscounts.IN_DATETO = getDateTo;
        me.beanDiscounts.IN_MERCHANT = getMerchant;
        me.beanDiscounts.IN_LIQUIDATION = getLiquidation;

        let searchParamsDiscounts = {
            beanString: JSON.stringify(me.beanDiscounts),
            beanMerchand: JSON.stringify(merchands),
            beanLiquidation: JSON.stringify(liquidaciones)
        };

        console.log(searchParamsDiscounts, 'searchParamsDiscounts');

        me.getDiscounts(searchParamsDiscounts);
    },
    getDiscounts: function (params) {
        
        var storeGridDiscounts = Ext.create('Ext.Praxis.store.flown.PassengerConciliation.GridData', {
            proxy: {
                url: prototype.url + '/getPendingDiscounts'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = params;
                },
                load: function(obj) {
                    console.log(obj.data);
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    } else {
                        var bean = obj.data.items[0].data;
//                        me.setTotalRowGridData(bean);
                    }
                    
                    me.updateGridTotal();
                }
            }
        });

        Ext.getCmp(prototype.id + '-gridDataDescuentos').setStore(storeGridDiscounts);
        storeGridDiscounts.load();
    },
    // </editor-fold>
    // <editor-fold defaultstate="collapsed" desc="Llenar Grilla Liquidaciones">
    searchSettlements: function () {
        this.fetchSettlements();
    },
    fetchSettlements: function () {
        let me = this;
        me.beanSettlements = {};

        let getProcess = Ext.getCmp(prototype.id + '-cmbCOREP').getValue();
        let getCustomer = Ext.getCmp(prototype.id + '-typeClient').getValue();
        let getDateFrom = Ext.Date.format(Ext.getCmp(prototype.id + '-txtFromSett').getValue(), 'Ymd');
        let getDateTo = Ext.Date.format(Ext.getCmp(prototype.id + '-txtToSett').getValue(), 'Ymd');
        let getMerchant = Ext.getCmp(prototype.id + '-txtMerchant').getValue();
        let getLiquidation = Ext.getCmp(prototype.id + '-txtLiquidation').getValue();
        
        me.beanSettlements.IN_CCUST = getCustomer;
        me.beanSettlements.IN_DATEFROM = getDateFrom;
        me.beanSettlements.IN_DATETO = getDateTo;
        me.beanSettlements.IN_CODPRO = getProcess;
        me.beanSettlements.IN_MERCHANT = getMerchant;
        me.beanSettlements.IN_LIQUIDATION = getLiquidation;

        let searchParamsSettlements = {
            beanString: JSON.stringify(me.beanSettlements)
        };

        console.log(searchParamsSettlements, 'searchParamsBandoc');

        me.getSettlements(searchParamsSettlements, function(responseData) {
            let store = Ext.create('Ext.data.Store', {
                data: responseData.data
            });

            Ext.getCmp(prototype.id + '-gridData').bindStore(store);
        });
    },
    getSettlements: function (params, callback) {
        
        
        
        var storeGridDatas = Ext.create('Ext.Praxis.store.flown.PassengerConciliation.GridData', {
            proxy: {
                url: prototype.url + '/getPendingSettlements'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = params;
                },
                load: function(obj) {
                    console.log(obj.data);
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    } else {
                        var bean = obj.data.items[0].data;
//                        me.setTotalRowGridData(bean);
                    }
                    
                    me.updateGridTotal();
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridData').setStore(storeGridDatas);
    },
    // </editor-fold>
    // <editor-fold defaultstate="collapsed" desc="Llenar Grilla Ventas">
    searchSales: function () {
        let recordBandoc = me.getGridRecords(prototype.id + '-gridData212');
        
        if (!recordBandoc.length) {
            global.Msg({
                msg: 'Seleccione los bandoc primero.'
            });
            return;
        }
        
        this.fetchSales();
    },
    fetchSales: function () {
        let me = this;
        me.beanSales = {};

        let getProcess = Ext.getCmp(prototype.id + '-cmbCOREP').getValue();
        let getCustomer = Ext.getCmp(prototype.id + '-typeClient').getValue();
        let getDateFrom = Ext.Date.format(Ext.getCmp(prototype.id + '-txtFromSale').getValue(), 'Ymd');
        let getDateTo = Ext.Date.format(Ext.getCmp(prototype.id + '-txtToSale').getValue(), 'Ymd');
        let getAgent = Ext.getCmp(prototype.id + '-txtAgentSale').getValue();
        let getCountry = Ext.getCmp(prototype.id + '-txtCountrySale').getValue();

        
        
        me.beanSales.IN_CCUST = getCustomer;
        me.beanSales.IN_CODPRO = getProcess;
        me.beanSales.IN_DATEFROM = getDateFrom;
        me.beanSales.IN_DATETO = getDateTo;
        me.beanSales.IN_SAGENT = getAgent;
        me.beanSales.IN_COUNTRY = getCountry;

        let searchParamsSales = {
            beanString: JSON.stringify(me.beanSales)
        };

        console.log(searchParamsSales, 'searchParamsSales');

        me.getSales(searchParamsSales);
    },
    getSales: function (params) {
        
        var storeGridSale = Ext.create('Ext.Praxis.store.flown.PassengerConciliation.GridData', {
            proxy: {
                url: prototype.url + '/getPendingSales'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = params;
                },
                load: function(obj) {
                    console.log(obj.data);
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    } else {
                        var bean = obj.data.items[0].data;
//                        me.setTotalRowGridData(bean);
                    }
                    
                    me.updateGridTotalSale();
                }
            }
        });

        Ext.getCmp(prototype.id + '-gridDataVentas').setStore(storeGridSale);
        storeGridSale.load();
    },
    // </editor-fold>
    // <editor-fold defaultstate="collapsed" desc="Llenar Grilla Cabecera">
    searchHead: function () {
        this.fetchHead();
    },
    fetchHead: function () {
        let me = this;
        me.beanHead = {};

        let getProcess = Ext.getCmp(prototype.id + '-cmbCOREP').getValue();
        let getCustomer = Ext.getCmp(prototype.id + '-typeClient').getValue();
        let getDateFrom = Ext.getCmp(prototype.id + '-cmbDateFromYearHead').getValue() + Ext.getCmp(prototype.id + '-cmbDateFromMonthHead').getValue() + Ext.getCmp(prototype.id + '-cmbDateDayHead').getValue();
        let getDateTo = Ext.getCmp(prototype.id + '-cmbDateToYearHead').getValue() + Ext.getCmp(prototype.id + '-cmbDateToMonthHead').getValue() + Ext.getCmp(prototype.id + '-cmbDateToDayHead').getValue();

        me.beanHead.IN_CCUST = getCustomer;
        me.beanHead.IN_DATEFROM = getDateFrom;
        me.beanHead.IN_DATETO = getDateTo;
        me.beanHead.IN_CODPRO = getProcess;

        let searchParamsHead = {
            beanString: JSON.stringify(me.beanHead)
        };

        console.log(searchParamsHead, 'searchParamsHead');

        me.getHead(searchParamsHead, function(responseData) {
            let store = Ext.create('Ext.data.Store', {
                data: responseData.data
            });

            Ext.getCmp(prototype.id + '-gridDataCabecera').bindStore(store);
        });
    },
    getHead: function (params, callback) {
        Ext.Ajax.request({
            url: prototype.url + '/getPendingHeads',
            method: 'POST',
            timeout: 60000000,
            params: params,
            beforerequest:  Ext.getCmp(prototype.id + '-gridDataCabecera').mask('Loading...'),
            success: function(response, options) {
                Ext.getCmp(prototype.id + '-gridDataCabecera').unmask('Loading...');
                let res = Ext.JSON.decode(response.responseText);

                if (!res.success) {
                    global.Msg({msg: res.sesion});
                } else {
                    
                    if (!res.data.length) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    }
                    
                    callback(res); // Retorna los datos mediante callback
                }
            },
            failure: function(response, options) {
                Ext.getCmp(prototype.id + '-gridDataCabecera').unmask('Loading...');
                console.error("Error en la petición AJAX");
                global.Msg({msg: "Error al obtener datos"});
            }
        });
    },
    // </editor-fold>
    // <editor-fold defaultstate="collapsed" desc="Combo Date">
    cbxDateFromYear_changeHandler: function() {
        Ext.getCmp(prototype.id + '-cmbDateToYear').setValue(Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue());
    },
    cbxDateFromMonth_changeHandler: function() {
        Ext.getCmp(prototype.id + '-cmbDateToMonth').setValue(Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue());
    },
    cbxDateFromDay_changeHandler: function() {
        Ext.getCmp(prototype.id + '-cmbDateToDay').setValue(Ext.getCmp(prototype.id + '-cmbDateFromDay').getValue());
    },
    cbxDateFromYear_changeHandlerDesc: function() {
        Ext.getCmp(prototype.id + '-cmbDateToYearDesc').setValue(Ext.getCmp(prototype.id + '-cmbDateFromYearDesc').getValue());
    },
    cbxDateFromMonth_changeHandlerDesc: function() {
        Ext.getCmp(prototype.id + '-cmbDateToMonthDesc').setValue(Ext.getCmp(prototype.id + '-cmbDateFromMonthDesc').getValue());
    },
    cbxDateFromDay_changeHandlerDesc: function() {
        Ext.getCmp(prototype.id + '-cmbDateToDayDesc').setValue(Ext.getCmp(prototype.id + '-cmbDateFromDayDesc').getValue());
    },
    cbxDateFromYear_changeHandlerHead: function() {
        Ext.getCmp(prototype.id + '-cmbDateToYearHead').setValue(Ext.getCmp(prototype.id + '-cmbDateFromYearHead').getValue());
    },
    cbxDateFromMonth_changeHandlerHead: function() {
        Ext.getCmp(prototype.id + '-cmbDateToMonthHead').setValue(Ext.getCmp(prototype.id + '-cmbDateFromMonthHead').getValue());
    },
    cbxDateFromDay_changeHandlerHead: function() {
        Ext.getCmp(prototype.id + '-cmbDateToDayHead').setValue(Ext.getCmp(prototype.id + '-cmbDateFromDayHead').getValue());
    },
    // </editor-fold>
    // <editor-fold defaultstate="collapsed" desc="Paginado">
    pagFirst: function(obj, e) {
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
        console.log(this.getPaggin(), 'this.getPaggin')
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        console.log(pag, 'pag')
        pag.moveNext();
    },
    pagLast: function (obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.moveLast();
    },
    // </editor-fold>
    // <editor-fold defaultstate="collapsed" desc="Llenar Filtros">
    setStoreData: function () {
        // Obtener la fecha de ayer
//        var yesterday = new Date();
//        yesterday.setMonth(yesterday.getMonth() - 1);
//
//        var month = yesterday.getMonth() + 1;
//        var day = yesterday.getDate();
//        var year = yesterday.getFullYear();
//
//        if (month < 10) {
//            month = '0' + month;
//        }
//
//        if (day < 10) {
//            day = '0' + day;
//        }
//
//        var storeComboDataYear = win.getStoreYear(false);
//        var storeComboDataMonth = win.getStoreMonth(true);
//        var storeComboDataDay = win.getStoreDays(true);
//        
//        /* cabecera */
//        Ext.getCmp(prototype.id + '-cmbDateFromYearHead').bindStore(storeComboDataYear);
//        Ext.getCmp(prototype.id + '-cmbDateToYearHead').bindStore(storeComboDataYear);
//        Ext.getCmp(prototype.id + '-cmbDateFromMonthHead').bindStore(storeComboDataMonth);
//        Ext.getCmp(prototype.id + '-cmbDateToMonthHead').bindStore(storeComboDataMonth);
//        Ext.getCmp(prototype.id + '-cmbDateDayHead').bindStore(storeComboDataDay);
//        Ext.getCmp(prototype.id + '-cmbDateToDayHead').bindStore(storeComboDataDay);
//        
//        /* blue */
//        Ext.getCmp(prototype.id + '-cmbDateFromYear').bindStore(storeComboDataYear);
//        Ext.getCmp(prototype.id + '-cmbDateToYear').bindStore(storeComboDataYear);
//        Ext.getCmp(prototype.id + '-cmbDateFromMonth').bindStore(storeComboDataMonth);
//        Ext.getCmp(prototype.id + '-cmbDateToMonth').bindStore(storeComboDataMonth);
//        Ext.getCmp(prototype.id + '-cmbDateDay').bindStore(storeComboDataDay);
//        Ext.getCmp(prototype.id + '-cmbDateToDay').bindStore(storeComboDataDay);
//        
//        Ext.getCmp(prototype.id + '-cmbDateFromYear').setValue(year);
//        Ext.getCmp(prototype.id + '-cmbDateToYear').setValue(year);
//        Ext.getCmp(prototype.id + '-cmbDateFromMonth').setValue(month);
//        Ext.getCmp(prototype.id + '-cmbDateToMonth').setValue(month);
//        Ext.getCmp(prototype.id + '-cmbDateDay').setValue('01'); // Ahora se establece el día de ayer
//        Ext.getCmp(prototype.id + '-cmbDateToDay').setValue('15');
//        
//        /* orange */
//        Ext.getCmp(prototype.id + '-cmbDateFromYearDesc').bindStore(storeComboDataYear);
//        Ext.getCmp(prototype.id + '-cmbDateToYearDesc').bindStore(storeComboDataYear);
//        Ext.getCmp(prototype.id + '-cmbDateFromMonthDesc').bindStore(storeComboDataMonth);
//        Ext.getCmp(prototype.id + '-cmbDateToMonthDesc').bindStore(storeComboDataMonth);
//        Ext.getCmp(prototype.id + '-cmbDateDayDesc').bindStore(storeComboDataDay);
//        Ext.getCmp(prototype.id + '-cmbDateToDayDesc').bindStore(storeComboDataDay);
//        
//        Ext.getCmp(prototype.id + '-cmbDateFromYearHead').setValue(year);
//        Ext.getCmp(prototype.id + '-cmbDateToYearHead').setValue(year);
//        Ext.getCmp(prototype.id + '-cmbDateFromMonthHead').setValue(month);
//        Ext.getCmp(prototype.id + '-cmbDateToMonthHead').setValue(month);
//        Ext.getCmp(prototype.id + '-cmbDateDayHead').setValue('01');
//        Ext.getCmp(prototype.id + '-cmbDateToDayHead').setValue('15');
//        
//        
//        Ext.getCmp(prototype.id + '-cmbDateFromYearDesc').setValue(year);
//        Ext.getCmp(prototype.id + '-cmbDateToYearDesc').setValue(year);
//        Ext.getCmp(prototype.id + '-cmbDateFromMonthDesc').setValue(month);
//        Ext.getCmp(prototype.id + '-cmbDateToMonthDesc').setValue(month);
//        Ext.getCmp(prototype.id + '-cmbDateDayDesc').setValue('01'); // Ahora se establece el día de ayer
//        Ext.getCmp(prototype.id + '-cmbDateToDayDesc').setValue('15');
        
        this.paramsObtainData.COREP = 2;
        this.paramsObtainData.COUNTRY = 2;
        
        Ext.Ajax.request({
            url: prototype.urlMaster + '/obtainData',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getBody().mask('Loading...'),
            params: {
                beanString: JSON.stringify(this.paramsObtainData)
            },
            success: function (response, options) {
                Ext.getBody().unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);
                var lstProcessor = res.lstProcessor;
                var lstCountry = res.lstCountry;
               
                var storeDataProcessor = Ext.create('Ext.data.Store', {
                    data: lstProcessor,
                    autoLoad: true
                });
                
                var storeDataCountrys = Ext.create('Ext.data.Store', {
                    data: lstCountry,
                    autoLoad: true
                });
                
                Ext.getCmp(prototype.id + '-cmbCOREP').bindStore(storeDataProcessor);
                Ext.getCmp(prototype.id + '-cmbCOREP').setValue('CO');
                
                Ext.getCmp(prototype.id + '-txtCountrySale').bindStore(storeDataCountrys);
            }
        });
    },
    // </editor-fold>
    updateGridTotal: function () {
        let recordDiscounts = me.getGridRecords(prototype.id + '-gridDataDescuentos');
        let recordBandoc = me.getGridRecords(prototype.id + '-gridData21');
        let recordSettlements = me.getGridRecords(prototype.id + '-gridData');
        let recordSales = me.getGridRecords(prototype.id + '-gridDataVentas');

        this.esIgual = 0;
        let totalDescGrid = 0;
        let totalSettGrid = 0;
        let totalSaleGrid = 0;
        let comisionSettGrid = 0;
        let totalBandocGrid = 0;

        if (recordDiscounts.length) {
            for (let desc of recordDiscounts) {
                totalDescGrid += Number(desc.IMPORTECeba) || 0;
            }
        }

        if (recordBandoc.length) {
            for (let bandoc of recordBandoc) {
                totalBandocGrid += Number(bandoc.NETO) || 0;
            }
        }

        if (recordSettlements.length) {
            for (let sett of recordSettlements) {
                totalSettGrid += Number(sett.TOTAL) || 0;
                comisionSettGrid += Number(sett.COMISION) || 0;
            }
        }
        
        if (recordSales.length) {
            for (let sale of recordSales) {
                totalSaleGrid += Number(sale.SVFOP) || 0;
            }
        }

        let formattedDesc = Ext.util.Format.number(totalDescGrid, '0,000.00');
        let formattedBandoc = Ext.util.Format.number(totalBandocGrid, '0,000.00');
        let formattedSett = Ext.util.Format.number(totalSettGrid, '0,000.00');
        let formattedSale = Ext.util.Format.number(totalSaleGrid, '0,000.00');
        let formattedComision = Ext.util.Format.number(comisionSettGrid, '0,000.00');

        let calculo = Math.abs(totalSettGrid - Math.abs(comisionSettGrid) - Math.abs(totalDescGrid) - Math.abs(totalSaleGrid));
        let formattedDiff = Ext.util.Format.number(calculo, '0,000.00');
        
        let diferencia_bandoc_calculo = totalBandocGrid - calculo;
        let formattedDiffB = Ext.util.Format.number(diferencia_bandoc_calculo, '0,000.00');

        let cmpDesc = Ext.getCmp(prototype.id + '-txtTotalDescGrid');
//        let cmpBandoc = Ext.getCmp(prototype.id + '-txtTotalBandocGrid');
        let cmpSett = Ext.getCmp(prototype.id + '-txtTotalSettGrid');
        let cmpSale = Ext.getCmp(prototype.id + '-txtVentasSettGrid');
        let cmpComision = Ext.getCmp(prototype.id + '-txtComisionSettGrid');
        let cmpDiff = Ext.getCmp(prototype.id + '-txtTotalDiffGrid');
        let cmpDiffB = Ext.getCmp(prototype.id + '-txtTotalDiff');

        cmpDesc.setValue(formattedDesc);
//        cmpBandoc.setValue(formattedBandoc);
        cmpSett.setValue(formattedSett);
        cmpSale.setValue(formattedSale);
        cmpDiff.setValue(formattedDiff);
        cmpDiffB.setValue(formattedDiffB);
        cmpComision.setValue(formattedComision);

        
        this.esIgual = diferencia_bandoc_calculo === 0;

        let colorFondo = this.esIgual ? '#4CAF50' : '#F44336';
        let colorTexto = 'white';

        Ext.defer(function () {
            [cmpDiffB].forEach(cmp => {
                let el = cmp.getEl();
                if (el) {
                    el.setStyle({
                        'background-color': colorFondo,
                        'color': colorTexto,
                        'font-weight': 'bold',
                        'border-radius': '0px'
                    });
                }
            });
        }, 10);
    },
    updateGridTotalSale: function () {
        let recordBandoc = me.getGridRecords(prototype.id + '-gridData212');
        let recordSales = me.getGridRecords(prototype.id + '-gridDataVentas');

        this.esIgual = 0;
        let totalBandoc = 0;
        let totalSales = 0;

        if (recordSales.length) {
            for (let sale of recordSales) {
                totalSales += Number(sale.SVFOP) || 0;
            }
        }

        if (recordBandoc.length) {
            for (let bandoc of recordBandoc) {
                totalBandoc += Number(bandoc.NETO) || 0;
            }
        }

        let formattedBandoc = Ext.util.Format.number(totalBandoc, '0,000.00');
        let formattedSale = Ext.util.Format.number(totalSales, '0,000.00');

        let calculo = Math.abs(totalBandoc - totalSales);
        let formattedDiff = Ext.util.Format.number(calculo, '0,000.00');
        
        let cmpDeposito = Ext.getCmp(prototype.id + '-txtTotalDeposito');
        let cmpVenta = Ext.getCmp(prototype.id + '-txtVentas');
        let cmpDiferencia = Ext.getCmp(prototype.id + '-txtTotalDiffVenta');

        cmpDeposito.setValue(formattedBandoc);
        cmpVenta.setValue(formattedSale);
        cmpDiferencia.setValue(formattedDiff);

        this.esIgual = calculo === 0;

        let colorFondo = this.esIgual ? '#4CAF50' : '#F44336';
        let colorTexto = 'white';

        Ext.defer(function () {
            [cmpDiferencia].forEach(cmp => {
                let el = cmp.getEl();
                if (el) {
                    el.setStyle({
                        'background-color': colorFondo,
                        'color': colorTexto,
                        'font-weight': 'bold',
                        'border-radius': '0px'
                    });
                }
            });
        }, 10);
    },
    changeProcessor: function () {
        
        let getProcess = Ext.getCmp(prototype.id + '-cmbCOREP').getValue();
        this.changeViewTemplate(getProcess)
        
        Ext.getCmp(prototype.id + '-gridDataDescuentos').getStore().removeAll();
        Ext.getCmp(prototype.id + '-gridDataDescuentos').getView().refresh();
        
        Ext.getCmp(prototype.id + '-gridDataVentas').getStore().removeAll();
        Ext.getCmp(prototype.id + '-gridDataVentas').getView().refresh();
        
        Ext.getCmp(prototype.id + '-gridData21').getStore().removeAll();
        Ext.getCmp(prototype.id + '-gridData21').getView().refresh();
        
        if (getProcess !== "VN" && getProcess !== "BM" && getProcess !== "CO") {
            me.searchSettlements();
            me.updateGridTotal();
        } else {
            me.updateGridTotalSale();
        }
        
    },
    changeViewTemplate: function(getProcess) {
        
        if (getProcess !== "VN" && getProcess !== "BM" && getProcess !== "CO") {
            console.log(1)
            Ext.getCmp(prototype.id + "-boxConsultas2").hide();
            Ext.getCmp(prototype.id + "-boxConsultas").show();
            Ext.getCmp(prototype.id + "-gridData21").show();
            Ext.getCmp(prototype.id + "-txtBandoc").show();
            Ext.getCmp(prototype.id + "-btnExecute").show();
            Ext.getCmp("panelResumenTotales").show();
            Ext.getCmp("panelResumenBandocMenosCalculo").show();
        } else {
            console.log(2)
            Ext.getCmp(prototype.id + "-boxConsultas2").show();
            Ext.getCmp(prototype.id + "-boxConsultas").hide();
            Ext.getCmp(prototype.id + "-gridData21").hide();
            Ext.getCmp(prototype.id + "-txtBandoc").hide();
            Ext.getCmp(prototype.id + "-btnExecute").hide();
            Ext.getCmp("panelResumenTotales").hide();
            Ext.getCmp("panelResumenBandocMenosCalculo").hide();
            Ext.getCmp(prototype.id + '-centerC-panel02')
            .getEl()
            .setStyle('margin-top', '60px');



        }
        
        
    },
    verifyConciliationSale: function() {
        
//        if (this.esIgual !== 0) {
//            Ext.Msg.show({
//                title: '.:PRAXISEX:.',
//                msg: 'La Diferencia tiene que ser 0.',
//                buttons: Ext.MessageBox.OK,
//                icon: Ext.MessageBox.ERROR,
//                modal: true
//            });
//            return
//        }
        
        Ext.Msg.show({
            title: '.:PRAXISEX:.',
            msg: 'Are you sure you want to execute the conciliation?',
            buttons: Ext.MessageBox.OKCANCEL,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn === 'ok') {
                    this.executeConciliationSale();
                }
            }
        });
    },
    executeConciliationSale: function() {
        let me = this;
        me.beanConciliation = {};
        
        
        let recordDiscounts = me.getGridRecordsDiscount(prototype.id + '-gridDataDescuentos');
        let recordSettlements = me.getGridRecords(prototype.id + '-gridData');
        let recordHead = me.getGridRecords(prototype.id + '-gridDataCabecera');
        let recordBandoc = me.getGridRecords(prototype.id + '-gridData212');
        let recordSale = me.getGridRecords(prototype.id + '-gridDataVentas');
        let getProcess = Ext.getCmp(prototype.id + '-cmbCOREP').getValue();
        let getCustomer = Ext.getCmp(prototype.id + '-typeClient').getValue();
        
        if (!recordBandoc.length) {
            global.Msg({
                msg: 'No ha seleccionado un bandoc.'
            });
            return
        }
        
        if (!recordSale.length) {
            global.Msg({
                msg: 'No ha seleccionado Ventas.'
            });
            return
        }
        
        let cleanSettlements = recordSettlements.map(function(item) {
            return {
                RN: item.RN,
                SDATE: item.SDATE ? item.SDATE.trim() : '',
                SCOUNTRY: item.SCOUNTRY ? item.SCOUNTRY.trim() : '',
                TDOC: item.TDOC ? item.TDOC.trim() : '',
                CODEBANK: item.CODEBANK ? item.CODEBANK.trim() : '',
                SCARCOD: item.SCARCOD ? item.SCARCOD.trim() : '',
                SCARDN: item.SCARDN ? item.SCARDN.trim() : '',
                SAUTHOC: item.SAUTHOC ? item.SAUTHOC.trim() : '',
                SEQ: item.SEQ ? item.SEQ.trim() : '',
                SVFOP: item.SVFOP,
                TOTAL: item.TOTAL,
                NETO: item.NETO,
                CODPRO: item.CODPRO ? item.CODPRO.trim() : '',
                CCUSTPRO: item.CCUSTPRO ? item.CCUSTPRO.trim() : '',
                PRDA: item.PRDA ? item.PRDA.trim() : '',
                ADATE: item.ADATE ? item.ADATE.trim() : '',
                MERCHAND: item.MERCHAND ? item.MERCHAND.trim() : '',
                LIQUIDACIO: item.LIQUIDACIO ? item.LIQUIDACIO.trim() : '',
                SCURRENCY: item.SCURRENCY ? item.SCURRENCY.trim() : '',
                IMPORTEPAG: item.IMPORTEPAG
            };
        });
        
        let cleanDiscounts = recordDiscounts.map(function(item) {
            return {
                RN: item.RN,
                CODPRO: item.CODPRO,
                FLIQUIDACI: item.FLIQUIDACI,
                MONEDA: item.MONEDA,
                CCUSTPRO: item.CCUSTPRO,
                CCUST: item.CCUST,
                PRDA: item.PRDA,
                ADATE: item.ADATE,
                MERCHAND: item.MERCHAND,
                MONEDAPAGO: item.MONEDAPAGO,
                LIQUIDACIO: item.LIQUIDACIO,
                IMPORTECeba: item.IMPORTECeba,
                IMPORTEPAG: item.IMPORTEPAG
            };
        });

        let cleanBandoc = recordBandoc.map(function(item) {
            return {
                CCUST: item.CCUST,
                BANDOC: item.BANDOC,
                VALDATE: item.VALDATE,
                ADATE: item.ADATE,
                NETO: item.NETO,
                ACCOUNT: item.ACCOUNT,
                SOCIETY: item.SOCIETY,
                CODEBANK_EC: item.CODEBANK
            };
        });
        
        let cleanSale = recordSale.map(function(item) {
            return {
                CCUST: item.CCUST,
                CCIA: item.CCIA,
                FORMA: item.FORMA,
                SERIE: item.SERIE,
                TDOC: item.TDOC,
                SCARDNCOR: item.SCARDNCOR,
                SAUTHOC: item.SAUTHOC,
                SEQ: item.SEQ,
                CORRL: item.CORRL,
                SVFOP: item.SVFOP,
                TOTAL: item.TOTAL,
            };
        });

        console.log(cleanSettlements)
        console.log(cleanDiscounts)
        console.log(cleanBandoc)
        console.log(cleanSale)

        me.beanConciliation.IN_CCUST = getCustomer;
        me.beanConciliation.IN_CODPRO = getProcess;

        let searchParamsConciliation = {
            beanString: JSON.stringify(me.beanConciliation),
            beanDiscounts: JSON.stringify(cleanDiscounts),
            beanBandoc: JSON.stringify(cleanBandoc),
            beanHead: JSON.stringify(recordHead),
            beanSettlements: JSON.stringify(cleanSettlements),
            beanSales: JSON.stringify(cleanSale)
        };
        
        console.log(searchParamsConciliation, 'searchParamsConciliation');
        
        me.sendConciliationSale(searchParamsConciliation, function(responseData) {
            console.log(responseData)
        });
        
    },
    sendConciliationSale: function (params, callback) {
        Ext.Ajax.request({
            url: prototype.url + '/executeConciliation',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: params.beanString, beanDiscounts: params.beanDiscounts, beanBandoc: params.beanBandoc, 
                beanHead: params.beanHead, beanSettlements: params.beanSettlements, beanSales:params.beanSales},
            beforerequest:  Ext.getCmp(prototype.id + '-xpanel').mask('Loading...'),
            success: function(response, options) {
                
                Ext.getCmp(prototype.id + '-xpanel').unmask('Loading...');
                let res = Ext.JSON.decode(response.responseText);
                console.log(res,'res')

                if (res.success) {
                    global.Msg({msg: res.result});
                    
                    Ext.getCmp(prototype.id + '-gridDataDescuentos').getStore().removeAll();
                    Ext.getCmp(prototype.id + '-gridDataDescuentos').getView().refresh();
                    
                    Ext.getCmp(prototype.id + '-gridData21').getStore().removeAll();
                    Ext.getCmp(prototype.id + '-gridData21').getView().refresh();
                    
                    Ext.getCmp(prototype.id + '-gridData212').getStore().removeAll();
                    Ext.getCmp(prototype.id + '-gridData212').getView().refresh();
                    
                    Ext.getCmp(prototype.id + '-gridDataVentas').getStore().removeAll();
                    Ext.getCmp(prototype.id + '-gridDataVentas').getView().refresh();
                    
                    me.searchSettlements();
                    me.updateGridTotal();
                    me.updateGridTotalSale();
                    
                } else {
                    
                    global.Msg({msg: res.result});
                    
                    callback(res); 
                }
            },
            failure: function(response, options) {
                Ext.getCmp(prototype.id + '-xpanel').unmask('Loading...');
                console.error("Error en la petición AJAX");
                global.Msg({msg: "Error al obtener datos"});
            }
        });
    },
});