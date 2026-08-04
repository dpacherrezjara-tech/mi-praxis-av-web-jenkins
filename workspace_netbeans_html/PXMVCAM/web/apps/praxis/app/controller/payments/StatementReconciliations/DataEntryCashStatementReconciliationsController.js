Ext.define('Ext.Praxis.controller.payments.StatementReconciliations.DataEntryCashStatementReconciliationsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryCashStatementReconciliationsController',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    meDE: '',
    controllerParent: '',
    panelActual: '',
    paramsGrid: '',
    actionCode: '',
    bean: {},
    beanResult: {},
    lstCountry: [],
    searchParams: {},
    searchParamsPending: {},
    beanDetails: {},
    beanScan: {},
    beanAgrupa: {},
    beanRefreshHeader: {},
    lstA1852: {},
    dataObtain: {},
    totalNetoScan: 0,
    totalPayamouScan: 0,
    // </editor-fold>
    init: function (view) {
        prototype.id = 'StatementReconciliationsForm';
        prototype.url = CONTEXTPATH + '/StatementReconciliations';
        meDE = this;
        this.p = this.view.params;
        this.actionCode = this.p.action;
        this.bean = this.p.rec;
        this.lstCountry = this.p.lstCountry;
        controllerParent = this.p.controllerParent;
        panelActual = this.p.panelActual;
        paramsGrid = this.p.paramsGrid;
        this.obtainData();

    },
    afterRender: function () {
        console.log('afterRender');
        var cmpToggle = Ext.getCmp(prototype.id + '-btnTS_HEADER');
        var chkEl = cmpToggle.getEl().down('#chkHeader');

        if (chkEl) {
            chkEl.on('change', function () {
                meDE.onChangeHeader();
            });
        }
        meDE.initScanFilters();
        // El id de gridDataInfoScanArc es fijo (prototype.id + '-gridDataInfoScanArc')
        // en cada apertura del Data Entry -- si el usuario buscó, cerró sin usar
        // "Clean Detail" y volvió a abrir, el store de la búsqueda anterior podía
        // seguir ahí. Se fuerza un store vacío al abrir para que el scan siempre
        // arranque limpio, sin depender de que el usuario lo limpie a mano.
        meDE.clear_tableNormal();
        switch (this.actionCode) {
            case 'U':
                this.getData();
                Ext.getCmp(prototype.id + '-btn-save').hide();
                Ext.getCmp(prototype.id + '-btn-delete').hide();
                Ext.getCmp(prototype.id + '-btn-cancel').show();

                if (meDE.bean.data.STVAL === "1" || meDE.bean.data.STVAL === "5") {
                    Ext.getCmp(prototype.id + '-btn-update').hide();
                } else {
                    Ext.getCmp(prototype.id + '-btn-update').show();
                }

                break;
        }
    },
    obtainData: function () {
        console.log('obtainData');
        this.dataObtain.CARD = 2;
        this.dataObtain.BANK = 2;
        this.dataObtain.USERPERMIS = 2;
        this.dataObtain.NPROG = sessionStorage.getItem('nprog');

        Ext.Ajax.request({
            url: prototype.urlMaster + '/obtainData',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(this.dataObtain)},
            success: function (response, options) {
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    me.lstCard = res.lstCard;
                    // "Reverse Match" solo aplica a conciliaciones MANUALES (STVAL=5),
                    // no tendría sentido reversar un match automático (STVAL=1) por acá.
                    if (res.userPermis.PERMM === 'Y' && meDE.bean.data.STVAL === '5') {
                        Ext.getCmp(prototype.id + '-btn-reverse').show();
                    } else {
                        Ext.getCmp(prototype.id + '-btn-reverse').hide();
                    }
                } else
                    global.Msg({msg: res.sesion});
            }
        });
    },
    mostrarData: function () {
        console.log('mostrarData');


        // STATEMENT INFORMATION 
        let  cfuente = '';
        if (this.bean.data.CCUSTPRO === '00') {
            cfuente = 'BSP';
        } else if (this.bean.data.CCUSTPRO === '01') {
            cfuente = 'ICCS';
        } else if (this.bean.data.CCUSTPRO === '02') {
            cfuente = 'ARC';
        }
        this.setValue('de-txtVALDATEL', this.beanResult.VALDATE);
        this.setValue('de-txtInput', cfuente);
        this.setValue('de-txtNegoc', 'PASAJES');

        if (this.beanResult.SCURRENCY === 'EUR') {
            Ext.getCmp(prototype.id + '-btnTS_HEADER').getEl().down('#chkHeader').dom.checked = true;
        } else {
            Ext.getCmp(prototype.id + '-btnTS_HEADER').getEl().down('#chkHeader').dom.checked = false;
        }

        this.setValue('de-txtdescTDOC', this.beanResult.descTDOC);
        this.setValue('de-txtTDOC', this.beanResult.TDOC);
        this.setValue('de-txtCODEBANK', this.beanResult.CODEBANK);
        this.setValue('de-txtNAME', this.beanResult.NAME);
        this.setValue('de-txtNAMEP', this.beanResult.NAMEP);
        this.setValue('de-txtSTVAL', this.beanResult.descSTVAL);
        this.setValue('de-txtSCOUNTRY', this.beanResult.DESC_SCOUNTRY);
        this.setValue('de-txtACCOUNT', this.beanResult.ACCNUMBER);
        this.setValue('de-txtVALDATE', this.beanResult.VALDATE);
        this.setValue('de-txtSCOUNTRY_COD', this.beanResult.SCOUNTRY);
        this.setValue('de-txtSOCIETY', this.beanResult.CCUST);
        this.setValue('de-txtDATECI', this.beanResult.DATECI);
        this.setValue('de-txtTRANCI', this.beanResult.TRANCI);
        this.setValue('de-txtQTYTRAN1', this.beanResult.QTYTRAN1);
        this.setValue('de-txtSOCIETYS', this.beanResult.CCUST);
        this.setValue('de-txtACCOUNTCASH', this.beanResult.ACCOUNT);

        this.setValue('de-txtMERCHAND', this.beanResult.MERCHAND);
        this.setValue('de-txtBANDOC', this.beanResult.BANDOC);
        this.setValue('de-txtSCURRENCY', this.beanResult.SCURRENCY);
        this.setValue('de-txtNETO', Ext.util.Format.number(this.beanResult.NETO, '0,000.00'));

        this.setValue('de-txtMERCHANDL', this.beanResult.MERCHANDL);
        this.setValue('de-txtBANDOCL', this.beanResult.BANDOCL);
        this.setValue('de-txtCOREPL', this.beanResult.COREPL);
        this.setValue('de-txtSCURRENCYL', this.beanResult.SCURRENCY);
        this.setValue('de-txtACCNUMBERL', this.beanResult.ACCNUMBER);
        this.setValue('de-txtDIFF', Ext.util.Format.number(this.beanResult.DIFF, '0,000.00'));
        this.setValue('txtUSCR', this.beanResult.USCR);
        this.setValue('txtFECR', this.beanResult.FECR);
        this.setValue('txtHOCR', this.beanResult.HOCR);
        this.setValue('txtUSUP', this.beanResult.USUP);
        this.setValue('txtFEUP', this.beanResult.FEUP);
        this.setValue('txtHOUP', this.beanResult.HOUP);

        this.setValue('de-txtTEXTO', meDE.bean.data.TEXTO);
        this.setValue('de-txtTEXTOLAR', meDE.bean.data.TEXTOLAR);

    },
    //<editor-fold defaultstate="collapsed" desc="llenarData">
    llenarData: function () {
        console.log('llenarData');
        var bean = {};
        bean.TDOC = this.getValue("de-txtTDOC");
        bean.CODEBANK = this.getValue("de-txtCODEBANK");
        bean.NAME = this.getValue("de-txtNAME");
        bean.STVAL = this.getValue("de-txtSTVAL");
        bean.CCUST = this.getValue("de-txtSOCIETY");
        bean.DATECI = this.getValue("de-txtDATECI");
        bean.QTYTRAN1 = this.getValue("de-txtQTYTRAN1");
        bean.VALDATE = this.getValue("de-txtVALDATE");
        bean.MERCHAND = this.getValue("de-txtMERCHAND");
        bean.BANDOC = this.getValue("de-txtBANDOC");
        bean.NETO = this.getValue("de-txtNETO");
        bean.VALDATEL = this.getValue("de-txtVALDATEL");
        bean.MERCHANDL = this.getValue("de-txtMERCHANDL");
        bean.BANDOCL = this.getValue("de-txtBANDOCL");
        bean.SCURRENCYL = this.getValue("de-txtSCURRENCYL");
        bean.NETOL = this.getValue("de-txtNETOL");
        bean.ACCNUMBER = this.getValue("de-txtACCNUMBER");
        bean.DIFF = this.getValue("de-txtDIFF");
        bean.USCR = this.getValue("txtUSCR").trim();
        bean.FECR = this.getValue("txtFECR").trim();
        bean.HOCR = this.getValue("txtHOCR").trim();
        bean.USUP = this.getValue("txtUSUP").trim();
        bean.FEUP = this.getValue("txtFEUP").trim();
        bean.HOUP = this.getValue("txtHOUP").trim();
        return bean;
    },
    getData: function () {
        console.log('getData');
        console.log('meDE.bean', meDE.bean);
        meDE.bean.data.IN_TRANCI = meDE.bean.data.TRANCI;
        meDE.bean.data.IN_DATECI = meDE.bean.data.DATECI;
        meDE.bean.data.IN_BANDOC = meDE.bean.data.BANDOC;
        meDE.bean.data.IN_STVAL = meDE.bean.data.STVAL;
        meDE.bean.data.SCURRENCY = meDE.bean.data.SCURRENCY;
        meDE.bean.data.IN_CBATCH = meDE.bean.data.CBATCH;
        meDE.bean.data.IN_FECR = meDE.bean.data.FECR;
//        meDE.bean.data.IN_CONSULTA = meDE.bean.data.FECR;
        if (meDE.bean.data.IN_STVAL === 'Match') {
            meDE.bean.data.IN_STVAL = '1';
        } else if (meDE.bean.data.IN_STVAL === 'Match Manual') {
            meDE.bean.data.IN_STVAL = '5';
        } else {
            meDE.bean.data.IN_STVAL = '3';
        }
        var beanString = JSON.stringify(meDE.bean.data);
        Ext.Ajax.request({
            url: prototype.url + '/searchBeanCash',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getCmp(prototype.id + '-dataEntryCash').mask('Loading...'),
            params: {beanString: beanString},
            success: function (response, options) {
                Ext.getCmp(prototype.id + '-dataEntryCash').unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);
                meDE.beanResult = res.data;
                meDE.onSearchCompleteDetail();
                meDE.mostrarData();
            }
        });
    },

    getDataRefreshHeader: function (SCURRENCY) {

        meDE.beanRefreshHeader = {}
        meDE.beanRefreshHeader.IN_TRANCI = meDE.bean.data.TRANCI;
        meDE.beanRefreshHeader.IN_DATECI = meDE.bean.data.DATECI;
        meDE.beanRefreshHeader.IN_BANDOC = meDE.bean.data.BANDOC;
        meDE.beanRefreshHeader.IN_STVAL = meDE.bean.data.STVAL;
        meDE.beanRefreshHeader.IN_SCURRENCY = SCURRENCY;
        meDE.beanRefreshHeader.IN_CONSULTA = '1';

        meDE.beanRefreshHeader.IN_CBATCH = meDE.bean.data.CBATCH;
        meDE.beanRefreshHeader.IN_FECR = meDE.bean.data.FECR;
//        meDE.bean.data.IN_CONSULTA = meDE.bean.data.FECR;
        if (meDE.bean.data.IN_STVAL === 'Match') {
            meDE.beanRefreshHeader.IN_STVAL = '1';
        } else if (meDE.bean.data.IN_STVAL === 'Match Manual') {
            meDE.beanRefreshHeader.IN_STVAL = '5';
        } else {
            meDE.beanRefreshHeader.IN_STVAL = '3';
        }
        var beanString = JSON.stringify(meDE.beanRefreshHeader);
        Ext.Ajax.request({
            url: prototype.url + '/searchBeanCash',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getCmp(prototype.id + '-dataEntryCash').mask('Loading...'),
            params: {beanString: beanString},
            success: function (response, options) {
                Ext.getCmp(prototype.id + '-dataEntryCash').unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);
                meDE.beanResult = res.data;
                meDE.onSearchCompleteDetail();
                meDE.mostrarData();
            }
        });
    },
    onSearchCompleteDetail: function () {
        console.log('onSearchCompleteDetail');
        console.log(meDE.bean.data, 'BEAN DATA');
        console.log(meDE.beanResult, 'BEAN beanResult');
        console.log(meDE.bean.data.TINPUT, 'BEAN DATA DE JOSUE');
        this.beanScan = {}
        this.beanScan.IN_BANDOC = meDE.bean.data.BANDOC;
        this.beanScan.IN_STVAL = meDE.bean.data.STVAL;
        this.beanScan.IN_DATECI = meDE.beanResult.DATECI;
        this.beanScan.IN_TRANCI = meDE.beanResult.TRANCI;
        this.beanScan.IN_TINPUT = meDE.bean.data.TINPUT;
        this.beanScan.IN_SCOUNTRY = meDE.beanResult.SCOUNTRY;
        this.beanScan.IN_CBATCH = meDE.beanResult.CBATCH;
        this.beanScan.IN_FECR = meDE.beanResult.FECR;

        if (this.beanScan.IN_STVAL === 'Match') {
            this.beanScan.IN_STVAL = '1';
        } else if (this.beanScan.IN_STVAL === 'Match Manual') {
            this.beanScan.IN_STVAL = '5';
        } else {
            this.beanScan.IN_STVAL = '3';
        }
        console.log(this.beanScan, 'this.beanScan')
        var beanString = JSON.stringify(this.beanScan);
        Ext.Ajax.request({
            url: prototype.url + '/searchBean_LiquiCash',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getCmp(prototype.id + '-dataEntryCash').mask('Loading...'),
            params: {beanString: beanString},
            success: function (response, options) {
                Ext.getCmp(prototype.id + '-dataEntryCash').unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);

                if (res.success) {
                    // 🔥 CAMBIO: Usamos los datos directos del backend, SIN agregar filas de sumario manuales
                    // ExtJS Grid con feature 'summary' hará la matemática solo.
                    var data = Ext.isArray(res.data) ? res.data : [];

                    var storeData = Ext.create('Ext.data.Store', {
                        data: data, // Usamos la data limpia
                        autoLoad: true
                    });

                    // --- SECCIÓN ELIMINADA: Ya no necesitas calcular totalNeto ni totalPayamou aquí ---
                    // --- SECCIÓN ELIMINADA: Ya no necesitas data.push(summaryRec) ---

                    var panelScanArc = Ext.getCmp(prototype.id + '-panelDataInfoScanARC');
                    var panelScan = Ext.getCmp(prototype.id + '-panelDataInfoScan');
                    var gridScanArc = Ext.getCmp(prototype.id + '-gridDataInfoScanArc');
                    var gridScan = Ext.getCmp(prototype.id + '-gridDataInfoScan');

                    if (gridScan) {
                        gridScan.bindStore(storeData);
                    }
                    // gridDataInfoScanArc ya no se llena con el mismo store de "Detail Settlement 2" (pendiente definir su propia fuente de datos).

                    // ... resto de tu lógica de visualización de paneles ...
                    var panelScanCard = Ext.getCmp(prototype.id + '-panelScanCard');
                    var panelScanCard2 = Ext.getCmp(prototype.id + '-panelScanCard2');

                    var panelSumAmountQty = Ext.getCmp(prototype.id + '-panelSumAmountQty');

                    // Si "Detail Settlement 2" ya trae registros, no hace falta el scan (ni su grilla ni los filtros de búsqueda).
                    // Si no trae registros, se oculta la grilla y se muestran los filtros para buscar manualmente.
                    if (data.length > 0) {
                        if (panelScan) panelScan.show();
                        if (panelScanCard) panelScanCard.hide();
                        if (panelScanCard2) panelScanCard2.hide();
                        if (panelSumAmountQty) panelSumAmountQty.show(); // es de "Detail Settlement 2", solo aplica cuando esa grilla se ve
                    } else {
                        if (panelScan) panelScan.hide();
                        if (panelScanCard) panelScanCard.show();
                        if (panelScanCard2) panelScanCard2.show();
                        if (panelSumAmountQty) panelSumAmountQty.hide(); // con el scan activo no aplica (siempre mostraba 0.00 / 0)
                    }

                    // Si ya está Match o Match Manual (1 o 5), no tiene sentido mostrar la grilla ARC de abajo.
                    var btnToggleVoucher = Ext.getCmp(prototype.id + '-btnToggleVoucher');
                    if (meDE.bean.data.STVAL == '1' || meDE.bean.data.STVAL == '5') {
                        if (panelScanArc) panelScanArc.hide();
                        // Mostrar/Ocultar Voucher solo tiene sentido si ya está conciliado
                        // (lee el SFILE de "Detail Settlement 2"); en Pending no hay nada que mostrar.
                        if (btnToggleVoucher) btnToggleVoucher.show();
                    } else {
                        if (panelScanArc) panelScanArc.show();
                        if (btnToggleVoucher) btnToggleVoucher.hide();
                    }

                    if (meDE.bean.data.STVAL == '3') {
                        // Lógica adicional de columnas
                        if (meDE.bean.data.TINPUT == 'I') {
                            meDE.hiddenGridColumns();
                        } else if (meDE.bean.data.TINPUT == 'B' || meDE.bean.data.TINPUT == 'A') {
                            meDE.hiddenGridColumnsBSP();
                        }
                    }

                    meDE.calcularMontos();
                    meDE.calcularDiferencias();
                } else {
                    global.Msg({msg: res.Mensaje});
                }
            }
        });
    },
    onChangeHeader: function () {

        var cmpToggle = Ext.getCmp(prototype.id + '-btnTS_HEADER');

        var chk = false;
        if (cmpToggle && cmpToggle.getEl()) {
            var chkEl = cmpToggle.getEl().down('#chkHeader');
            chk = chkEl ? chkEl.dom.checked : false;
        }

        if (chk) {
            console.log("TOGGLE → EUR");
            this.getDataRefreshHeader('EUR')

        } else {
            console.log("TOGGLE → USD");
            this.getDataRefreshHeader('USD')
        }
//        return false;

    },
    //</editor-fold>

    // "Detail Settlement 2" ahora usa siempre el mismo set de columnas que el
    // scan (Nbr/Status/Country/Agent/Abono Date/Currency/Neto/Payamou/Reference/
    // Filename/Npag), sin importar el origen (ICCS/BSP/ARC) -- ya no hace falta
    // ocultar/ajustar columnas por TINPUT (Concept/Sconsol/Amount USD ya no existen).
    hiddenGridColumns: function () {
    },
    hiddenGridColumnsBSP: function () {
    },
    calcularMontos: function () {
        console.log('calcularMontos');
        var grid = Ext.getCmp(prototype.id + '-gridDataInfoScan');
        var store = grid.getStore();
        var calculateButton = this.lookupReference('calculateButton');
        if (store.getCount() > 0 && store.getCount() < 22) {
            calculateButton.show();
        } else {
            calculateButton.hide();
        }

        this.sumAmount = 0;
        this.lstSendManual = [];
        var store_gridInfoScan = Ext.getCmp(prototype.id + '-gridDataInfoScan').getStore();

        for (var i = 0; i < store_gridInfoScan.data.length; i++) {
            var dataRow1 = store_gridInfoScan.data.items[i];
            this.lstSendManual.push(dataRow1.data);

            if (dataRow1.data.STMANUAL !== 'Blocked') {
                var neto = parseFloat(dataRow1.data.PAYAMOU) || 0;
                var comistota = parseFloat(dataRow1.data.COMISTOTA) || 0;

                if (comistota !== 0) {
                    this.sumAmount += neto + comistota;
                } else {
                    this.sumAmount += neto;
                }
            }
        }

        if (this.beanResult.STVAL === '1') {
            this.setValue('de-txtNETOL', Ext.util.Format.number(this.beanResult.NETO, '0,000.00'));
            this.setValue('de-txtDIFF', Ext.util.Format.number(this.beanResult.NETO - this.beanResult.NETO, '0,000.00'));
        } else {
            this.setValue('de-txtNETOL', Ext.util.Format.number(this.sumAmount, '0,000.00'));
            this.setValue('de-txtDIFF', Ext.util.Format.number(this.beanResult.NETO - this.sumAmount, '0,000.00'));
        }
        this.setValue('de-txtSumAmount', Ext.util.Format.number(this.sumAmount, '0,000.00'));
        this.setValue('de-txtQty', store_gridInfoScan.data.length);

        Ext.getCmp(prototype.id + '-gridDataInfoScan').getView().refresh();
    },
    calcularDiferencias: function () {
        console.log('calcularDiferencias');
        var grid = Ext.getCmp(prototype.id + '-gridDataInfoScan');

        var store = grid.getStore();
        var calculateButton = this.lookupReference('calculateButton');

        var models = grid.getStore().getModel();
        var comg = '';
        var MERCHAND = '';
        var BANDOC = '';
        var SCURRENCY = '';
        var ACCNUMBER = '';
        var ADATE = '';
        grid.getStore().each(function (record) {
            comg = record.get('CCUST').trim();
            MERCHAND = record.get('MERCHAND').trim();
            BANDOC = record.get('BANDOC').trim();
            SCURRENCY = record.get('SCURRENCY').trim();
            ACCNUMBER = record.get('ACCNUMBER').trim();
            ADATE = record.get('ADATE').trim();
        });

        var comp = Ext.getCmp(prototype.id + '-de-txtSOCIETY').getValue();

        if (store.getCount() > 0 && store.getCount() < 22) {

            var model = grid.getStore().getModel();
            var suma = 0;
            grid.getStore().each(function (record) {
                suma += record.get('NETO');
            });
            var diff = Math.abs(Ext.getCmp(prototype.id + '-de-txtDIFF').getValue().replace(/,/g, '').replace('.00', ''));

            var grid = Ext.getCmp(prototype.id + '-gridDataInfoScan');
            var store = grid.getStore();
            var records = store.getRange();
            this.desmarcarRegistros(records);
            if (diff !== 0) {
                var timeout = 6000; // 6 segundos
                var startTime = new Date().getTime();

                var findCombinationsWithTimeout = function () {
                    var currentTime = new Date().getTime();
                    if (currentTime - startTime < timeout) {
                        this.findCombinations(records, 0, 0, [], diff);
                    } else {
                        console.log('Tiempo límite alcanzado. La búsqueda se ha interrumpido.');
                    }
                }.bind(this);

                setTimeout(findCombinationsWithTimeout, 0);
            } else {
                this.desmarcarRegistros(records);
            }
        }
    },

    findCombinations: function (records, index, sum, combination, diff) {
        if (sum === diff) {
            this.mostrarCombinacionValida(combination, diff);
            combination.forEach(function (record) {
                record.set('isInValidCombination', true);
            });
            return;
        }
        if (index >= records.length || sum > diff) {
            return;
        }

        this.findCombinations(records, index + 1, sum + records[index].get('NETO'), combination.concat(records[index]), diff);
        this.findCombinations(records, index + 1, sum, combination, diff);
    },

    getExcel: function (records, index, sum, combination, diff) {
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
    // El excel exporta el CARRITO (lo acumulado en gridDataInfoScanArc tras 1 o
    // varias búsquedas), no una búsqueda puntual -- por eso se manda por POST
    // (global.openWindowWithPost, mismo patrón que GSACommisionsReportController)
    // en vez del GET con beanString: la lista puede ser larga para ir en la URL.
    exportExcel: function () {
        var store = Ext.getCmp(prototype.id + '-gridDataInfoScanArc').getStore();
        var cart = [];
        store.each(function (record) {
            cart.push(record.data);
        });

        if (cart.length === 0) {
            global.Msg({msg: 'No hay registros en la lista para exportar.'});
            return;
        }

        global.openWindowWithPost(prototype.url + '/getXLSXScanCart', 'beanString', JSON.stringify(cart));
    },
    mostrarCombinacionValida: function (combination, diff) {
        console.log('Se encontró una combinación válida:');
        console.log('Valor deseado:', diff);
        console.log('Registros:');
        combination.forEach(function (record) {
            console.log(record.get('NETO'));
        });
    },
    desmarcarRegistros: function (records) {
        records.forEach(function (record) {
            if (record.get('isInValidCombination')) {
                record.set('isInValidCombination', false);
            }
        });
    },
    marcarClientes: function (records) {
        records.forEach(function (record) {
            if (record.get('isInValidClient')) {
                record.set('isInValidClient', true);
            }
        });
    },
    desmarcarClientes: function (records) {
        records.forEach(function (record) {
            if (record.get('isInValidClient')) {
                record.set('isInValidClient', false);
            }
        });
    },
    removeTKT: function (grid, rowIndex, colIndex) {

        var store_gridInfoScan = Ext.getCmp(prototype.id + '-gridDataInfoScan').getStore();
        store_gridInfoScan.removeAt(rowIndex);
        Ext.getCmp(prototype.id + '-gridDataInfoScan').getView().refresh();
        this.calcularMontos();
        var checkbox = Ext.getCmp(prototype.id01 + '-chkMERCHANT');
        var estaMarcado = checkbox.getValue();
        if (estaMarcado) {
//            console.log('El checkbox está marcado');
            meDE.calcularDiferencias();
        } else {
//            console.log('El checkbox no está marcado');
        }
    },
    // "Clean Detail" limpia la grilla del scan MPF190 (gridDataInfoScanArc), no
    // "Detail Settlement 2" -- son grillas distintas, y el scan es la que vive en
    // este mismo panel de filtros junto al botón.
    clear_tableNormal: function () {
        meDE.totalNetoScan = 0;
        meDE.totalPayamouScan = 0;
        meDE.setValue('de-txtTotalNetoScan', Ext.util.Format.number(0, '0,000.00'));
        meDE.setValue('de-txtTotalPayamouScan', Ext.util.Format.number(0, '0,000.00'));

        let storeDataClear = Ext.create('Ext.data.Store', {
            data: [],
            autoLoad: true
        });
        var grid = Ext.getCmp(prototype.id + '-gridDataInfoScanArc');
        grid.bindStore(storeDataClear);
        grid.getView().refresh();
    },
    // Botón "Del." de cada fila de la grilla del scan (igual patrón que removeTKT
    // en los demás DataEntry, pero apuntando a gridDataInfoScanArc). Como el scan
    // ahora es un "carrito" acumulado, hay que recalcular los totales al borrar.
    removeScanRow: function (grid, rowIndex, colIndex) {
        var gridArc = Ext.getCmp(prototype.id + '-gridDataInfoScanArc');
        gridArc.getStore().removeAt(rowIndex);
        meDE.recalcularTotalesScan();
        gridArc.getView().refresh();
    },
    // Botón "Img." (ojito) de cada fila del scan: abre el voucher/comprobante de
    // esa venta directa (MPF190) en una pestaña nueva -- mismo endpoint que usa
    // DirectSales (downloadVoucher) para mostrarlo inline en su propio Data Entry,
    // pero acá se abre en pestaña aparte porque este Data Entry (Cash) YA tiene
    // su propio iframe pdfIframeVoucher mostrando el scan del extracto (MPF102);
    // reusarlo taparía esa imagen y confundiría cuál documento se está viendo.
    viewImageScan: function (grid, rowIndex, colIndex) {
        var record = grid.getStore().getAt(rowIndex);
        if (!record) {
            return;
        }
        var row = record.data;
        if (!row.SFILE) {
            global.Msg({msg: 'Este registro no tiene archivo adjunto.'});
            return;
        }

        var year = (row.ADATE || '').toString().substring(0, 4);
        var targetPage = parseInt(row.NPAG, 10);
        var pageHash = (!isNaN(targetPage) && targetPage > 0) ? ('#page=' + targetPage) : '';

        var url = CONTEXTPATH + '/DirectSales/downloadVoucher' +
                '?sfile=' + encodeURIComponent(row.SFILE) +
                '&sagent=' + encodeURIComponent(row.SAGENT) +
                '&year=' + encodeURIComponent(year) +
                '&adate=' + encodeURIComponent(row.ADATE) +
                '&disposition=inline' + pageHash;

        window.open(url, '_blank');
    },
    // Botón "Conc." de cada fila del scan: concilia MANUALMENTE (STVAL='5') el
    // MPF102 abierto en este Data Entry contra la venta directa (MPF190) de esa
    // fila, vía MPS779. Al ser manual, solo valida Neto igual + Moneda igual +
    // Tipo de documento = Sales (sin las reglas de canal/agente de MPS320) --
    // se valida del lado del cliente antes de llamar al servidor, que igual
    // las vuelve a validar.
    conciliarScan: function (grid, rowIndex, colIndex) {
        var record = grid.getStore().getAt(rowIndex);
        if (!record) {
            return;
        }
        var row = record.data;

        var netoExtracto = parseFloat(meDE.beanResult.NETO) || 0;
        var netoVenta = parseFloat(row.NETO) || 0;

        if (Math.abs(netoExtracto - netoVenta) > 0.009) {
            global.Msg({msg: 'Los montos no coinciden (Extracto: ' + Ext.util.Format.number(netoExtracto, '0,000.00')
                        + ' vs. Venta Directa: ' + Ext.util.Format.number(netoVenta, '0,000.00') + '). No se puede conciliar.'});
            return;
        }
        if ((meDE.beanResult.SCURRENCY || '').trim() !== (row.SCURRENCY || '').trim()) {
            global.Msg({msg: 'Las monedas no coinciden entre el extracto y la venta directa.'});
            return;
        }
        if ((meDE.beanResult.TDOC || '').trim() !== 'S') {
            global.Msg({msg: 'El registro del extracto no es de tipo Sales, no se puede conciliar.'});
            return;
        }

        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: '¿Confirma conciliar el extracto contra la venta directa Nbr ' + (rowIndex + 1)
                    + ' (Neto ' + Ext.util.Format.number(netoVenta, '0,000.00') + ')?',
            buttons: Ext.MessageBox.YESNO,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function (btn) {
                if (btn !== 'yes') {
                    return;
                }

                var bean = {
                    // MPF102 (el extracto abierto en este Data Entry)
                    CCUST: meDE.bean.data.CCUST,
                    BANDOC: meDE.beanResult.BANDOC,
                    DATECI: meDE.beanResult.DATECI,
                    TRANCI: meDE.beanResult.TRANCI,
                    TDOC: meDE.beanResult.TDOC,
                    NETO_102: netoExtracto,
                    SCURRENCY_102: meDE.beanResult.SCURRENCY,
                    // MPF190 (la fila elegida en el scan) -- CCUST propio, puede ser
                    // distinto al de la MPF102 (el scan busca mezclado en 133/134/202/547).
                    CCUST_190: row.CCUST,
                    TREG: row.TREG,
                    ADATE_190: row.ADATE,
                    SCOUNTRY: row.SCOUNTRY,
                    SAGENT: row.SAGENT,
                    SCURRENCY_190: row.SCURRENCY,
                    CBATCH: row.CBATCH,
                    SEQ: row.SEQ,
                    NETO_190: netoVenta
                };

                Ext.getCmp(prototype.id + '-dataEntryCash').mask('Conciliando...');
                Ext.Ajax.request({
                    url: prototype.url + '/conciliarManualScan',
                    method: 'POST',
                    timeout: 60000000,
                    params: {beanString: JSON.stringify(bean)},
                    success: function (response) {
                        Ext.getCmp(prototype.id + '-dataEntryCash').unmask();
                        var res = Ext.JSON.decode(response.responseText);
                        if (res.success) {
                            global.Msg({
                                msg: res.Mensaje,
                                icon: 1,
                                fn: function () {
                                    Ext.getCmp(prototype.id + '-dataEntryCash').close();
                                    var btnSearch = Ext.getCmp(prototype.id + '-btnSearch');
                                    if (btnSearch) {
                                        btnSearch.fireEvent('click', {});
                                    }
                                }
                            });
                        } else {
                            global.Msg({msg: res.Mensaje || 'No se pudo conciliar.'});
                        }
                    },
                    failure: function () {
                        Ext.getCmp(prototype.id + '-dataEntryCash').unmask();
                        global.Msg({msg: 'Error de comunicación con el servidor.'});
                    }
                });
            }
        });
    },
    // Llave única de MPF190 (misma que usa DirectSales/MPS777 para el UPDATE:
    // CCUST+TREG+ADATE+SCOUNTRY+SAGENT+SCURRENCY+CBATCH+SEQ). Sirve para
    // deduplicar cuando el carrito acumula resultados de varias búsquedas.
    buildScanRowKey: function (row) {
        return [row.CCUST, row.TREG, row.ADATE, row.SCOUNTRY, row.SAGENT, row.SCURRENCY, row.CBATCH, row.SEQ].join('#');
    },
    // El SP solo calcula el total de SU búsqueda puntual; como el carrito acumula
    // varias búsquedas, el total mostrado en el summary de la grilla tiene que ser
    // el de TODO lo que quedó acumulado, así que se recalcula del lado del cliente.
    recalcularTotalesScan: function () {
        var store = Ext.getCmp(prototype.id + '-gridDataInfoScanArc').getStore();
        var totalNeto = 0;
        var totalPayamou = 0;
        store.each(function (record) {
            totalNeto += parseFloat(record.get('NETO')) || 0;
            totalPayamou += parseFloat(record.get('PAYAMOU')) || 0;
        });
        meDE.totalNetoScan = totalNeto;
        meDE.totalPayamouScan = totalPayamou;

        meDE.setValue('de-txtTotalNetoScan', Ext.util.Format.number(totalNeto, '0,000.00'));
        meDE.setValue('de-txtTotalPayamouScan', Ext.util.Format.number(totalPayamou, '0,000.00'));
    },
    // <editor-fold defaultstate="collapsed" desc="Scan MPF190 (MPS778)">
    initScanFilters: function () {
        var yearActual = new Date().getFullYear();

        Ext.getCmp(prototype.id + '-cmbDateFromYearScan').bindStore(win.getStoreYear(true));
        Ext.getCmp(prototype.id + '-cmbDateToYearScan').bindStore(win.getStoreYear(true));
        Ext.getCmp(prototype.id + '-cmbDateFromMonthScan').bindStore(win.getStoreMonth(true));
        Ext.getCmp(prototype.id + '-cmbDateToMonthScan').bindStore(win.getStoreMonth(true));
        Ext.getCmp(prototype.id + '-cmbDateFromDayScan').bindStore(win.getStoreDays(true));
        Ext.getCmp(prototype.id + '-cmbDateToDayScan').bindStore(win.getStoreDays(true));

        Ext.getCmp(prototype.id + '-cmbDateFromYearScan').setValue(yearActual);
        Ext.getCmp(prototype.id + '-cmbDateToYearScan').setValue(yearActual);
        Ext.getCmp(prototype.id + '-cmbDateFromMonthScan').setValue('');
        Ext.getCmp(prototype.id + '-cmbDateToMonthScan').setValue('');
        Ext.getCmp(prototype.id + '-cmbDateFromDayScan').setValue('');
        Ext.getCmp(prototype.id + '-cmbDateToDayScan').setValue('');

        var storeDataCountry = Ext.create('Ext.data.Store', {
            data: meDE.lstCountry,
            autoLoad: true
        });
        Ext.getCmp(prototype.id + '-cmbCountryScanMPF190').bindStore(storeDataCountry);
        Ext.getCmp(prototype.id + '-cmbCountryScanMPF190').setValue('');
    },
    // Al elegir Año/Mes/Día en "From" se replica en "To" (igual que DirectSalesController).
    selectComboFromYearScan: function (obj) {
        Ext.getCmp(prototype.id + '-cmbDateToYearScan').setValue(obj.getValue());
    },
    selectComboFromMonthScan: function (obj) {
        Ext.getCmp(prototype.id + '-cmbDateToMonthScan').setValue(obj.getValue());
    },
    selectComboFromDayScan: function (obj) {
        Ext.getCmp(prototype.id + '-cmbDateToDayScan').setValue(obj.getValue());
    },
    buildScanDate: function (y, m, d) {
        y = String(y || '').trim();
        m = String(m || '').trim();
        d = String(d || '').trim();

        if (!y) {
            return '';
        }
        if (m) {
            m = m.padStart(2, '0');
            if (d) {
                d = d.padStart(2, '0');
            }
        }
        return y + m + d;
    },
    eventKeyScan: function (field, e) {
        if (e.getKey() === 13) {
            meDE.searchMPF190Scan();
        }
    },
    clearMPF190ScanFilters: function () {
        Ext.getCmp(prototype.id + '-cmbInputDateScan').setValue('A');
        Ext.getCmp(prototype.id + '-cmbDateFromMonthScan').setValue('');
        Ext.getCmp(prototype.id + '-cmbDateFromDayScan').setValue('');
        Ext.getCmp(prototype.id + '-cmbDateToMonthScan').setValue('');
        Ext.getCmp(prototype.id + '-cmbDateToDayScan').setValue('');
        Ext.getCmp(prototype.id + '-typeSocietyScan').setValue('');
        Ext.getCmp(prototype.id + '-cmbCountryScanMPF190').setValue('');
        Ext.getCmp(prototype.id + '-txtAgentScan').setValue('');
    },
    // Programa MPS778: busca directo en MPF190 (siempre STVAL='3', Pending), sin paginado.
    // No reemplaza la grilla "Arc" (gridDataInfoScanArc): funciona como un carrito,
    // acumulando los resultados de cada búsqueda y deduplicando por la llave real
    // de MPF190 (ver buildScanRowKey), igual patrón que usa BankReconciliation Cash
    // para su grid de conciliación.
    searchMPF190Scan: function () {
        var bean = {};
        bean.IN_CCUST = Ext.getCmp(prototype.id + '-typeSocietyScan').getValue() || '';
        bean.IN_SEARCH = Ext.getCmp(prototype.id + '-cmbInputDateScan').getValue() || 'A';
        bean.IN_DATE_FROM = meDE.buildScanDate(
                Ext.getCmp(prototype.id + '-cmbDateFromYearScan').getValue(),
                Ext.getCmp(prototype.id + '-cmbDateFromMonthScan').getValue(),
                Ext.getCmp(prototype.id + '-cmbDateFromDayScan').getValue()
                );
        bean.IN_DATE_TO = meDE.buildScanDate(
                Ext.getCmp(prototype.id + '-cmbDateToYearScan').getValue(),
                Ext.getCmp(prototype.id + '-cmbDateToMonthScan').getValue(),
                Ext.getCmp(prototype.id + '-cmbDateToDayScan').getValue()
                );
        bean.IN_SCOUNTRY = Ext.getCmp(prototype.id + '-cmbCountryScanMPF190').getValue() || '';
        bean.IN_SAGENT = Ext.getCmp(prototype.id + '-txtAgentScan').getValue() || '';

        var beanString = JSON.stringify(bean);
        var grid = Ext.getCmp(prototype.id + '-gridDataInfoScanArc');

        Ext.getCmp(prototype.id + '-dataEntryCash').mask('Loading...');
        Ext.Ajax.request({
            url: prototype.url + '/searchMPF190Scan',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: beanString},
            success: function (response) {
                Ext.getCmp(prototype.id + '-dataEntryCash').unmask();
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    // Si la grilla todavía no tiene store (primera búsqueda), se arranca
                    // con uno vacío para poder usar store.add() igual que en las siguientes.
                    if (!grid.getStore() || !grid.getStore().add) {
                        grid.bindStore(Ext.create('Ext.data.Store', {data: [], autoLoad: true}));
                    }
                    var store = grid.getStore();

                    var existingKeys = {};
                    store.each(function (record) {
                        existingKeys[meDE.buildScanRowKey(record.data)] = true;
                    });

                    var nuevos = (res.data || []).filter(function (item) {
                        return !existingKeys[meDE.buildScanRowKey(item)];
                    });

                    store.add(nuevos);

                    // El total del SP es solo de esta búsqueda puntual; como el carrito
                    // acumula varias búsquedas, se recalcula sobre TODO lo acumulado.
                    meDE.recalcularTotalesScan();
                    grid.getView().refresh();

                    if (!res.data || res.data.length === 0) {
                        global.Msg({msg: 'Data not found.'});
                    } else if (nuevos.length === 0) {
                        global.Msg({msg: 'No hay candidatos nuevos (ya estaban en la lista).'});
                    }
                } else {
                    global.Msg({msg: res.Mensaje || 'Error searching MPF190.'});
                }
            },
            failure: function () {
                Ext.getCmp(prototype.id + '-dataEntryCash').unmask();
                global.Msg({msg: 'Error de comunicación con el servidor.'});
            }
        });
    },
    // </editor-fold>
    validateFields: function () {
        var msj = '';
        var bean = searchParams.bean;

        return msj;
    },
    //<editor-fold defaultstate="collapsed" desc="limpiarData">
    limpiarData: function () {
        this.setValue('txtSCOUNTRY', '');
        this.setValue('cmbSTVAL', '');
        this.setValue('txtADATE', '');
        this.setValue('txtCODEBANK', '');
        this.setValue('txtBANDOC', '');
        this.setValue('txtSCURRENCY', '');
        this.setValue('txtNETO', '');
        this.setValue('txtUSCR', '');
        this.setValue('txtFECR', '');
        this.setValue('txtHOCR', '');
        this.setValue('txtUSUP', '');
        this.setValue('txtFEUP', '');
        this.setValue('txtHOUP', '');
    },
    //</editor-fold>
    //
    // <editor-fold defaultstate="collapsed" desc="Botones">
    onSaveClick: function (btn) {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Are you sure to insert ?',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function (btn) {
                if (btn === 'yes') {
                    var beanTemp = {};
                    this.llenarData(beanTemp);
                    var msjResult = this.validacionInsert(beanTemp);
                    if (msjResult === '') {
                        beanTemp.option = 'I';
                        this.maintenanceBean(beanTemp);
                    } else {
                        global.Msg({msg: msjResult});
                    }
                }
            }
        });
    },
    onUpdateClick: function (btn) {
        var deci = this.preexecuteOption();
        if (deci) {
            Ext.Msg.show({
                title: '.:Confirmation:.',
                msg: 'Are you sure to Update?',
                buttons: Ext.MessageBox.YESNO,
                scope: this,
                icon: Ext.MessageBox.QUESTION,
                modal: true,
                fn: function (btn) {
                    if (btn === 'yes') {
                        var beanTemp = {};
                        beanTemp = this.llenarData();
                        var msjResult = this.validacionInsert(beanTemp);
                        if (msjResult === '') {
                            beanTemp.option = 'U';
                            this.maintenanceBean(beanTemp);
                        } else {
                            global.Msg({msg: msjResult});
                        }
                    }
                }
            });
        }
    },
    // "Reverse Match": reversa una conciliación MANUAL hecha por MPS779 (STVAL=5)
    // vía MPS780. Solo se muestra cuando el registro está en STVAL=5 (ver obtainData).
    onReverseClick: function (btn) {
        Ext.Msg.show({
            title: '.:Confirmation:.',
            msg: 'Are you sure to Reverse?',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function (btn) {
                if (btn === 'yes') {
                    this.reverseOption();
                }
            }
        });
    },
    onDeleteClick: function (btn) {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Are you sure to delete ?',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function (btn) {
                if (btn === 'yes') {
                    var beanTemp = {};
                    this.llenarData(beanTemp);
                    beanTemp.option = 'D';
                    this.maintenanceBean(beanTemp);
                }
            }
        });
    },
    onCancelClick: function (btn) {

        this.view.close();

    },
    // </editor-fold>

    //<editor-fold defaultstate="collapsed" desc="executeOption">
    // Reversa vía MPS780: identifica el par MPF102/MPF190 por BANDOC/DATECI/TRANCI
    // (el mismo "link" que dejó MPS779 al conciliar), no hace falta nada más.
    reverseOption: function () {
        var bean = {
            CCUST: meDE.bean.data.CCUST,
            BANDOC: meDE.beanResult.BANDOC,
            DATECI: meDE.beanResult.DATECI,
            TRANCI: meDE.beanResult.TRANCI
        };

        Ext.getCmp(prototype.id + '-dataEntryCash').mask('Reversando...');
        Ext.Ajax.request({
            url: prototype.url + '/reversarManualScan',
            method: 'POST',
            timeout: 60000000,
            params: bean,
            success: function (response) {
                Ext.getCmp(prototype.id + '-dataEntryCash').unmask();
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    global.Msg({
                        msg: res.Mensaje,
                        icon: 1,
                        fn: function () {
                            Ext.getCmp(prototype.id + '-dataEntryCash').close();
                            var btnSearch = Ext.getCmp(prototype.id + '-btnSearch');
                            if (btnSearch) {
                                btnSearch.fireEvent('click', {});
                            }
                        }
                    });
                } else {
                    global.Msg({msg: res.Mensaje || 'No se pudo reversar.'});
                }
            },
            failure: function () {
                Ext.getCmp(prototype.id + '-dataEntryCash').unmask();
                global.Msg({msg: 'Error de comunicación con el servidor.'});
            }
        });
    },
    gridRefresh: function () {
        console.log(panelActual, 'panel de parent control')
        switch (panelActual) {
            case '-boxDetDetails':
                controllerParent.setGridDataDetBANDOC();
                console.log('entra a')
                break;
        }
    },
    preexecuteOption: function () {
        //Modificacion

        var ASVFOP = parseFloat(Ext.getCmp(prototype.id + '-de-txtNETO').getValue().replace(/,/g, '').replace('.00', ''));
        var BSVFOP = parseFloat(Ext.getCmp(prototype.id + '-de-txtSumAmount').getValue().replace(/,/g, '').replace('.00', ''));
        var DIFF = parseFloat(Ext.getCmp(prototype.id + '-de-txtDIFF').getValue().replace(/,/g, '').replace('.00', ''));
        var MONEDA = Ext.getCmp(prototype.id + '-de-txtSCURRENCY').getValue();
        var ACCNUMBER = Ext.getCmp(prototype.id + '-de-txtACCNUMBER').getValue();
        var ACCNUMBERL = Ext.getCmp(prototype.id + '-de-txtACCNUMBERL').getValue();

        let datos = {};

        //Validar datos de la cabecera 
        let miGrilla = Ext.getCmp(prototype.id + '-gridDataInfoScan');
        datos = this.procesarRegistros(miGrilla);

        if (DIFF !== 0 && MONEDA !== 'COP') {
            global.Msg({msg: 'The Sum Amount is not equal to the Transaction Amount Stattement.'});
            return false;
        }

        if (DIFF == 0) {
            console.log('entra a DIF = 0', DIFF);
            return true;
        } else if (DIFF !== 0 && DIFF < 100) {
            console.log('entra a DIF < 100', DIFF);
            return true;
        } else {
            console.log('entra a ELSE', DIFF);
            global.Msg({msg: 'The Sum Amount is not equal to the Transaction Amount Stattement.'});
            return false;
        }

        if (Array.isArray(datos) && datos.length === 0) {
            global.Msg({msg: 'There is no data in the scan.'});
            return false;
        }

        if (ACCNUMBER !== ACCNUMBERL) {
            global.Msg({msg: 'The bank account on the Statement is not the same in the Settlement.'});
            return false;
        }

    },
    maintenanceBean: function (option) {

        let datos = {};
        console.error('Entró al procesar Registros');

        let miGrilla = Ext.getCmp(prototype.id + '-gridDataInfoScan');
        datos = this.procesarRegistros(miGrilla);

        Ext.Ajax.request({
            url: prototype.url + '/executeOption',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: datos, option: option},
            beforerequest: Ext.getCmp(prototype.id + '-dataEntry').mask('Loading...'),
            success: function (response, opts) {
                Ext.getCmp(prototype.id + '-dataEntry').unmask();
                var res = Ext.JSON.decode(response.responseText);
                console.log(res);
                if (res.success) {

                    global.Msg({
                        msg: res.Mensaje,
                        icon: 1,
                        fn: function () {

                            Ext.getCmp(prototype.id + '-dataEntry').close();
                            Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});
                        }
                    });
                } else
                    global.Msg({msg: res.sesion});
            },
            failure: function (response, opts) {
                console.log('server-side failure with status code ' + response.status);
                Ext.getCmp(prototype.id + '-dataEntry').unmask();
            }
        });

    },
    //</editor-fold>

    procesarRegistros: function (grilla) {
        var listaDeDatos = [];
        grilla.getStore().each(function (record) {
            console.log(record.get('TDOC'), 'recorget tdoc')
            console.log(record.get('SCARCOD'), 'recorget tdoc')
            let registro = {
                CODEBANK: Ext.getCmp(prototype.id + '-de-txtCODEBANK').getValue(),
                VALDATE: Ext.getCmp(prototype.id + '-de-txtVALDATE').getValue(),
                DATECI: Ext.getCmp(prototype.id + '-de-txtDATECI').getValue(),
                TRANCI: Ext.getCmp(prototype.id + '-de-txtTRANCI').getValue(),
                TDOC: Ext.getCmp(prototype.id + '-de-txtTDOC').getValue(), //MANDATORIO EL TDOC DEL ESTADO DE CUENTA SEGUN LUIS ALCIDES 2024/12/05 "NIÑOS CON NIÑOS Y NIÑAS CON NIÑAS"
//                TDOC: record.get('TDOC').trim(),
                MERCHAND: Ext.getCmp(prototype.id + '-de-txtMERCHAND').getValue(),
                BANDOC: Ext.getCmp(prototype.id + '-de-txtBANDOC').getValue(),
                COREPL: record.get('CORES').trim(),
                SDATE: record.get('SDATE').trim(),
                SAGENT: record.get('SAGENT').trim(),
                TERMI: record.get('TERMI').trim(),
                SCARCOD: record.get('SCARCOD').trim(),
                SCARDN: record.get('SCARDN').trim(),
                SAUTHOC: record.get('SAUTHOC').trim(),
                SCURRENCY: 'COP',
                TOTAL: record.get('TOTAL'),
                NETO: record.get('NETO'),
                RED: record.get('RED').trim(),
                SEQ: record.get('SEQ').trim(),
                NETOC: parseFloat(Ext.getCmp(prototype.id + '-de-txtSumAmount').getValue().replace(/,/g, '').replace('.00', ''))
            };

            listaDeDatos.push(registro);
        });

        console.log(listaDeDatos, 'listaDeDatos');
        var datosEnJSON = Ext.JSON.encode(listaDeDatos);
        return datosEnJSON;
    },
    ExportCSV: function () {
        console.log('Descargando CSV...');

        const country = this.beanResult.SCOUNTRY;
        const date = this.beanResult.VALDATE;
        const dateARC = this.beanResult.ADATE;
        const ccustR = this.beanResult.CCUST;
        const cycle = this.beanResult.DCYCLE.trim();
        const input = this.beanResult.TINPUT.trim();

        if (!country || !date || !ccustR || !cycle || !input) {
            Ext.Msg.alert('Error', 'Faltan parámetros para la descarga.');
            return;
        }

        // Enviamos los dos parámetros al backend
        const url = prototype.url + '/getCSV?country=' + encodeURIComponent(country)
                + '&date=' + encodeURIComponent(date) + '&ccustR=' + encodeURIComponent(ccustR)
                + '&cycle=' + encodeURIComponent(cycle) + '&input=' + encodeURIComponent(input) + '&dateARC=' + encodeURIComponent(dateARC);

        console.log('Solicitando:', url);

        global.getFile(url);
    },
    validacionInsert: function (beanTemp) {
        var msjResult = '';

        if (this.getValue("de-txtdescTDOC") === '') {
            msjResult = "Document type cannot be empty.";
        }
        return msjResult;
    },
    // <editor-fold defaultstate="collapsed" desc="Utilitarios">
    getValue: function (id) {
        return Ext.getCmp(prototype.id + '-' + id).getValue();
    },
    focus: function (id) {
        Ext.getCmp(prototype.id + '-' + id).focus();
    },
    setValue: function (id, txt) {
        Ext.getCmp(prototype.id + '-' + id).setValue(txt);
    },
    onUpperValue: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    onTextKeypress: function (obj, e, eOpts) {
        if (e.getKey() === e.ENTER) {
//            this.btnSearch_click();
        }
    },

// </editor-fold>,

    onUpdateFieldsEx: function (btn) {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Are you sure to Update Fields?',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function (btn) {
                if (btn === 'yes') {
                    var beanTemp = this.llenarDataField();
                    this.maintenanceBeanFields(beanTemp);
                }
            }
        });
    },
    llenarDataField: function () {
        var bean = {};
        bean.IN_ACCOUNT = this.getValue("de-txtACCOUNTCASH");
        bean.IN_TEXTO = this.getValue("de-txtTEXTO");
        bean.IN_TEXTOLAR = this.getValue("de-txtTEXTOLAR");
        bean.IN_CCUST = meDE.bean.data.CCUST;
        bean.IN_ADATE = meDE.bean.data.ADATE;
        bean.IN_SOCIETY = meDE.bean.data.SOCIETY;
        bean.IN_CODEBANK = meDE.bean.data.CODEBANK;
        bean.IN_BANDOC = meDE.bean.data.BANDOC;
        console.log('Bean a enviar:', bean);
        return bean;
    },
    maintenanceBeanFields: function (beanData) {
        var beanString = JSON.stringify(beanData);

        Ext.getCmp(prototype.id + '-dataEntryCash').mask('Updating...');

        Ext.Ajax.request({
            url: prototype.url + '/updateFields102',
            method: 'POST',
            timeout: 600000,
            params: {
                beanString: beanString
            },
            beforerequest: function () {
                Ext.getCmp(prototype.id + '-dataEntryCash').mask('Updating...');
            },
            success: function (response, opts) {
                Ext.getCmp(prototype.id + '-dataEntryCash').unmask();
                var res = Ext.JSON.decode(response.responseText);
                console.log('Respuesta DB:', res);

                if (res.success) {
                    global.Msg({
                        msg: res.Mensaje,
                        icon: 1,
                        fn: function () {
                            Ext.getCmp(prototype.id + '-dataEntryCash').close();
                            var btnSearch = Ext.getCmp(prototype.id + '-btnSearch');
                            if (btnSearch) {
                                btnSearch.fireEvent('click', {});
                            }
                        }
                    });
                } else {
                    Ext.Msg.alert('Atención', res.Mensaje || 'Error al actualizar.');
                }
            },
            failure: function (response, opts) {
                console.log('server-side failure with status code ' + response.status);
                Ext.getCmp(prototype.id + '-dataEntryCash').unmask();
                Ext.Msg.alert('Error', 'Fallo de comunicación con el servidor.');
            }
        });
    },
    onToggleVoucher: function (btn) {
        var win = this.getView();
        var panelVoucher = Ext.getCmp(prototype.id + '-panelVoucher');

        // originalWidth debe ser el ancho normal de la ventana (1200, ver DataEntryCash.js)
        // y expandedWidth = ese ancho + el del panelVoucher (720) + su margen (10).
        var originalWidth = 1200;
        var expandedWidth = 1930;

        if (panelVoucher) {
            if (panelVoucher.isHidden()) {

                let info = Ext.getCmp(prototype.id + '-gridDataInfoScan').getStore().getData().items[0].data;

                var sfile = info.SFILE;
                var sagent = info.SAGENT;
                // Se usa SDATE (Sales Date), no ADATE (Abono Date) -- mismo criterio que
                // DataEntryDirectSalesController.js (loadVoucher): el nombre real del
                // archivo en la carpeta se arma con la fecha de venta, y ADATE puede
                // venir mal cargada (desfasada del archivo real).
                var sdate = info.SDATE;
                var npage = info.NPAG;

                console.log('onToggleVoucher -> SFILE=[' + sfile + '] SAGENT=[' + sagent + '] SDATE=[' + sdate + '] NPAG=[' + npage + ']');

                var iframe = document.getElementById('pdfIframeVoucher');

                if (sfile && sagent && sdate) {
                    var year = sdate.toString().substring(0, 4);

                    var targetPage = parseInt(npage, 10);
                    var pageHash = (!isNaN(targetPage) && targetPage > 0) ? ('#page=' + targetPage) : '';

                    // Mismo endpoint que usa DirectSales (DataEntryDirectSalesController.js
                    // -> loadVoucher): decide del lado del servidor si sirve .pdf/.png/.jpg
                    // según lo que realmente exista en la carpeta, y si SFILE no calza por
                    // nombre exacto busca por prefijo "sagent_sdate" (fallback ya probado).
                    var url = CONTEXTPATH + '/DirectSales/downloadVoucher' +
                            '?sfile=' + encodeURIComponent(sfile) +
                            '&sagent=' + encodeURIComponent(sagent) +
                            '&year=' + encodeURIComponent(year) +
                            '&sdate=' + encodeURIComponent(sdate) +
                            '&disposition=inline' + pageHash;

                    console.log('onToggleVoucher -> url=' + url);

                    if (iframe) {
                        iframe.src = url;
                    }
                } else {
                    if (iframe) {
                        iframe.removeAttribute('src');
                    }
                    Ext.Msg.alert('Warning', 'No hay datos suficientes (SFILE, SAGENT, SDATE) para cargar el documento.');
                }

                // Expandir la ventana
                panelVoucher.show();
                win.setWidth(expandedWidth);
            } else {
                // Contraer la ventana y vaciar el iframe para liberar memoria
                var iframe = document.getElementById('pdfIframeVoucher');
                if (iframe) {
                    iframe.removeAttribute('src');
                }

                panelVoucher.hide();
                win.setWidth(originalWidth);
            }

            // Centrar simétricamente la ventana
            win.center();
        }
    }
});