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
        switch (this.actionCode) {
            case 'U':
                this.getData();
                Ext.getCmp(prototype.id + '-btn-save').hide();
                Ext.getCmp(prototype.id + '-btn-delete').hide();
                Ext.getCmp(prototype.id + '-btn-cancel').show();
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
                    Ext.getCmp(prototype.id + '-cmbSCARCOD').bindStore(
                            Ext.create('Ext.data.Store', {data: res.lstCard, autoLoad: true}));
                    Ext.getCmp(prototype.id + '-cmbSCARCOD').setValue('');
                    if(res.userPermis.PERMM === 'Y'){
                        Ext.getCmp(prototype.id + '-btn-reverse').show();
                    }else{
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
        if (this.bean.data.CCUSTPRO === '00'){
            cfuente = 'BSP';
        } else if (this.bean.data.CCUSTPRO === '01') {
            cfuente = 'ICCS';
        } else if (this.bean.data.CCUSTPRO === '02') {
            cfuente = 'ARC';
        }
        this.setValue('de-txtVALDATEL', this.beanResult.VALDATE);
        this.setValue('de-txtInput', cfuente);
        this.setValue('de-txtNegoc', 'PASAJES');
        
        if(this.beanResult.SCURRENCY === 'EUR'){
            Ext.getCmp(prototype.id + '-btnTS_HEADER').getEl().down('#chkHeader').dom.checked = true;
        }else{
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
        if (meDE.bean.data.IN_STVAL === 'Match' ) {
            meDE.bean.data.IN_STVAL = '1';
        } else if ( meDE.bean.data.IN_STVAL === 'Match Manual' ){
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
        if (meDE.bean.data.IN_STVAL === 'Match' ) {
            meDE.beanRefreshHeader.IN_STVAL = '1';
        } else if ( meDE.bean.data.IN_STVAL === 'Match Manual' ){
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
        
        if (this.beanScan.IN_STVAL === 'Match' ) {
            this.beanScan.IN_STVAL = '1';
        } else if ( this.beanScan.IN_STVAL === 'Match Manual' ){
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
        var panelScan    = Ext.getCmp(prototype.id + '-panelDataInfoScan');
        var gridScanArc  = Ext.getCmp(prototype.id + '-gridDataInfoScanArc');
        var gridScan     = Ext.getCmp(prototype.id + '-gridDataInfoScan');

        if (gridScanArc && gridScan) {
            gridScanArc.bindStore(storeData); 
            gridScan.bindStore(storeData);    
        }

        // ... resto de tu lógica de visualización de paneles ...
        if (meDE.bean.data.CCUSTPRO == '02') {
             if(panelScanArc) panelScanArc.show(); 
                if(panelScan)    panelScan.hide(); 
            } else {
                if(panelScanArc) panelScanArc.hide(); 
                if(panelScan)    panelScan.show(); 

                // Lógica adicional de columnas
                if(meDE.bean.data.TINPUT == 'I'){
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
    onChangeHeader: function (){
       
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
    
    hiddenGridColumns: function (){
        Ext.getCmp(prototype.id + '-columnPAYAMOU').hide()
        Ext.getCmp(prototype.id + '-columnSAGENT').hide()
        Ext.getCmp(prototype.id + '-columnCONCEPT').hide()
//        Ext.getCmp(prototype.id + '-gridDataInfoScan').hide()
//        Ext.getCmp(prototype.id + '-gridDataInfoScan').hide()
        
    },
    hiddenGridColumnsBSP: function (){
        Ext.getCmp(prototype.id + '-columnUSDEQUI').hide();
        Ext.getCmp(prototype.id + '-columnDESC_SCOUNTRY').setWidth(130);
        Ext.getCmp(prototype.id + '-columnSAGENT').setWidth(80);
        Ext.getCmp(prototype.id + '-columnSCONSOL').setWidth(85);
        console.log("Entra aqui");
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
    exportExcel: function () {
        me.paramsDetail.beanString = JSON.stringify(this.beanScan);
        global.getFile(prototype.url + '/getXLSXEntry?beanString=' + encodeURI(me.paramsDetail.beanString));
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
    clear_keyDownHandler: function () {

        this.setValue('txtFromADATE', null);
        this.setValue('txtToADATE', null);
        this.setValue('txtFromSDATE', null);
        this.setValue('txtToSDATE', null);
        this.setValue('txtACCNUMBER', '');
        this.setValue('txtNETO', '');
        this.setValue('cmbSCARCOD', '');

    },
    selectAdateFiltro: function () {
        if (win.getValue('txtFromADATE').trim() === '') {
            this.inhabilitarFiltrosAdate();
        } else {
            this.habilitarFiltrosAdate();
        }
    },
    inhabilitarFiltrosAdate: function () {
        win.enabled('txtToADATE', false);
        win.setValue('txtToADATE', '');
    },
    habilitarFiltrosAdate: function () {
        win.enabled('txtToADATE', true);
    },
    selectSdateFiltro: function () {
        if (win.getValue('txtFromADATE').trim() === '') {
            this.inhabilitarFiltrosSdate();
        } else {
            this.habilitarFiltrosSdate();
        }
    },
    inhabilitarFiltrosSdate: function () {
        win.enabled('txtToSDATE', false);
        win.setValue('txtToSDATE', '');
    },
    habilitarFiltrosSdate: function () {
        win.enabled('txtToSDATE', true);
    },
    clear_tableNormal: function () {

        win.setValue('de-txtQty', '');
        win.setValue('de-txtSumAmount', '');
        let storeDataClear = Ext.create('Ext.data.Store', {
            data: '',
            autoLoad: true
        });
        Ext.getCmp(prototype.id + '-gridDataInfoScan').bindStore(storeDataClear);

        this.sumAmount = 0;
    },
    cambiaParams: function (checkbox, newValue, oldValue, eOpts) {
        this.beanScan = {}
        let chkMERCHANT = Ext.getCmp(prototype.id01 + '-chkMERCHANT').getValue();
        let chkACCNUMBER = Ext.getCmp(prototype.id01 + '-chkACCNUMBER').getValue();
        let chkADATE = Ext.getCmp(prototype.id01 + '-chkADATE').getValue();
        let chkSDATE = Ext.getCmp(prototype.id01 + '-chkSDATE').getValue();
        var fecha_a_validar = "";
        this.beanScan.IN_FROMADATE = (Ext.getCmp(prototype.id + '-txtFromADATE').getValue() === null) ? fecha_a_validar : Ext.util.Format.date(Ext.getCmp(prototype.id + '-txtFromADATE').getValue(), 'Ymd');
        this.beanScan.IN_TOADATE = (Ext.getCmp(prototype.id + '-txtToADATE').getValue() === null) ? fecha_a_validar : Ext.util.Format.date(Ext.getCmp(prototype.id + '-txtToADATE').getValue(), 'Ymd');
        this.beanScan.IN_FROMSDATE = (Ext.getCmp(prototype.id + '-txtFromSDATE').getValue() === null) ? fecha_a_validar : Ext.util.Format.date(Ext.getCmp(prototype.id + '-txtFromSDATE').getValue(), 'Ymd');
        this.beanScan.IN_TOSDATE = (Ext.getCmp(prototype.id + '-txtToSDATE').getValue() === null) ? fecha_a_validar : Ext.util.Format.date(Ext.getCmp(prototype.id + '-txtToSDATE').getValue(), 'Ymd');
        this.beanScan.IN_SCARCOD = Ext.getCmp(prototype.id + '-cmbSCARCOD').getValue();

        this.beanScan.IN_ACCNUMBER = Ext.getCmp(prototype.id + '-txtACCNUMBER').getValue();
        if (this.beanScan.IN_ACCNUMBER === '') {
            this.beanScan.IN_ACCNUMBER = Ext.getCmp(prototype.id + '-de-txtACCNUMBER').getValue();
        }
        if (!chkACCNUMBER) {
            this.beanScan.IN_ACCNUMBER = '';
        }

        this.beanScan.IN_MERCHAND = Ext.getCmp(prototype.id + '-txtMERCHANT').getValue();
        if (this.beanScan.IN_MERCHAND === '') {
            this.beanScan.IN_MERCHAND = Ext.getCmp(prototype.id + '-de-txtMERCHAND').getValue();
        }
        if (!chkMERCHANT) {
            this.beanScan.IN_MERCHAND = '';
        }

        if (this.beanScan.IN_FROMADATE === '') {
            this.beanScan.IN_FROMADATE = Ext.getCmp(prototype.id + '-de-txtVALDATE').getValue();
        }
        if (!chkADATE) {
            this.beanScan.IN_FROMADATE = '';
        }

        this.beanScan.IN_CODEBANK = meDE.bean.data.CODEBANK;
        this.beanScan.IN_BANDOC = meDE.bean.data.BANDOC;
        this.beanScan.IN_strNETO = Ext.getCmp(prototype.id + '-txtNETO').getValue();
        this.beanScan.IN_STVAL = meDE.bean.data.STVAL;
        
        
        this.beanScan.IN_TERMI = Ext.getCmp(prototype.id + '-txtTERMI').getValue();
        this.beanScan.IN_SAGENT = Ext.getCmp(prototype.id + '-txtSAGENT').getValue();
        this.beanScan.IN_SEQ = Ext.getCmp(prototype.id + '-txtSEQ').getValue();
        this.beanScan.IN_RED = Ext.getCmp(prototype.id + '-txtRED').getValue();
        
        if (this.beanScan.IN_STVAL === 'Match' ) {
            this.beanScan.IN_STVAL = '1';
        } else if ( this.beanScan.IN_STVAL === 'Match Manual' ){
            this.beanScan.IN_STVAL = '5';
        } else {
            this.beanScan.IN_STVAL = 'P';
        }

        if (
                !this.beanScan.IN_FROMADATE &&
                !this.beanScan.IN_TOADATE &&
                !this.beanScan.IN_FROMSDATE &&
                !this.beanScan.IN_TOSDATE &&
                !this.beanScan.IN_SCARCOD &&
                !this.beanScan.IN_ACCNUMBER &&
                !this.beanScan.IN_VALDATE &&
                !this.beanScan.IN_strNETO
                ) {
            global.Msg({msg: 'Fields to Scan must be filled out'});
            return;
        }

        // Obtener el componente del grid
        let gridComponentNormalon = Ext.getCmp(prototype.id + '-gridDataInfoScan');
        let dataGrid = gridComponentNormalon.getStore().getData().items;
        let constructorExcluir = {}.constructor;
        let arrayConstructor = dataGrid.filter(function (elemento) {
            return elemento.constructor !== constructorExcluir;
        });
        let arrayNormal = [];
        if (arrayConstructor.length > 0) {
            for (let value of arrayConstructor) {
                arrayNormal.push(value.data);
            }
        }
        console.log(arrayNormal,'arrayNormal')
        let listAux = {};

        for (let value of arrayNormal) {
            listAux[`${value.descSTVAL}#${value.CCUST}#${value.descTDOC}#${value.SDATE}#${value.SAGENT}#${value.TERMI}#${value.SCARCOD}#${value.SCARDN}#${value.SAUTHOC}#${value.SCURRENCY}#${value.NETO}#${value.RED}#${value.SEQ}`] = "repetido";
        }
        
        var beanString = JSON.stringify(this.beanScan);
//        Ext.Ajax.request({
//            url: prototype.url + '/searchBean_DETAIL_CO',
//            method: 'POST',
//            timeout: 60000000,
//            beforerequest: Ext.getCmp(prototype.id + '-dataEntry').mask('Loading...'),
//            params: {beanString: beanString},
//            success: function (response, options) {
//                Ext.getCmp(prototype.id + '-dataEntry').unmask('Loading...');
//                var res = Ext.JSON.decode(response.responseText);
//
//                if (res.success) {
//                    let lstNormal = arrayNormal.length > 0 ? arrayNormal : [];
//                    console.log(lstNormal, 'lstNormal')
//                    console.log(res.data, 'res.data')
//                    for (let item of res.data) {
//                        if (`${item.descSTVAL}#${item.CCUST}#${item.descTDOC}#${item.SDATE}#${item.SAGENT}#${item.TERMI}#${item.SCARCOD}#${item.SCARDN}#${item.SAUTHOC}#${item.SCURRENCY}#${item.NETO}#${item.RED}#${item.SEQ}` in listAux) {
//                            continue
//                        }
//                        lstNormal.push({
//                            descSTVAL: item.descSTVAL,
//                            CCUST: item.CCUST,
//                            descTDOC: item.descTDOC,
//                            SDATE: item.SDATE,
//                            SAGENT: item.SAGENT,
//                            TERMI: item.TERMI,
//                            SCARCOD: item.SCARCOD,
//                            SCARDN: item.SCARDN,
//                            SAUTHOC: item.SAUTHOC,
//                            SCURRENCY: item.SCURRENCY,
//                            MERCHAND: item.MERCHAND,
//                            BANDOC: item.BANDOC,
//                            CORES: item.CORES,
//                            ACCNUMBER: item.ACCNUMBER,
//                            ADATE: item.ADATE,
//                            NETO: item.NETO,
//                            RED: item.RED,
//                            SEQ: item.SEQ,
//                            TDOC: item.TDOC
//                        })
//                    }
//
//                    var storeDataNormal = Ext.create('Ext.data.Store', {
//                        data: lstNormal,
//                        autoLoad: true
//                    });
//                    console.log(lstNormal, 'lstNormal dadadadada')
//                    Ext.getCmp(prototype.id + '-gridDataInfoScan').bindStore(storeDataNormal);
//
//                    meDE.calcularMontos();
//                    meDE.calcularDiferencias();
//                } else {
//                    global.Msg({msg: res.Mensaje});
//                }
//            }
//        });
    },
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
    onReverseClick: function (btn) {
        

        Ext.Msg.show({
            title: '.:Confirmation:.',
            msg: 'Are you sure to Reverse?',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
//            animateTarget: btn,
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
    reverseOption: function (){
        let datos = {}
        datos.IN_BANDOC = Ext.getCmp(prototype.id + '-de-txtBANDOC').getValue().trim()
        datos.IN_DATECI = Ext.getCmp(prototype.id + '-de-txtDATECI').getValue().trim()
        datos.IN_TRANCI = Ext.getCmp(prototype.id + '-de-txtTRANCI').getValue().trim()
        console.log(datos,'reverseOption')
        Ext.Ajax.request({
            url: prototype.url + '/reverseOption',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(datos)},
            beforerequest: Ext.getCmp(prototype.id + '-dataEntry').mask('Loading...'),
            success: function (response, opts) {
                Ext.getCmp(prototype.id + '-dataEntry').unmask();
                var res = Ext.JSON.decode(response.responseText);
                console.log(res);
                if (res.success) {
                    let objResult = res.result;
                    Ext.create('Ext.window.Window', {
                        title: objResult.MESSAGE,
                        width: 500,
                        height: 380,
                        modal: true,  // Hace que la ventana sea modal
                        closable: true,
                        layout: 'fit',
                        items: [
                            {
                                xtype: 'panel',
            //                    bodyPadding: 10,
                                tpl: new Ext.XTemplate( `
                                    <style>
                                        .styled-table {
                                            width: 100%;
                                            border-collapse: collapse;
                                            margin: 0px 0;
                                            font-size: 12px;
                                            font-family: Arial, sans-serif;
                                            text-align: left;
                                        }
                                        .styled-table thead {
                                            background-color: #7f98a8;
                                            color: white;
                                        }
                                        .styled-table th, .styled-table td {
                                            padding: 12px 15px;
                                            border: 1px solid #ddd;
                                        }
                                        .styled-table tbody tr:nth-child(even) {
                                            background-color: #f2f2f2;
                                        }
                                        .styled-table tbody tr:hover {
                                            background-color: #e0e0e0;
                                        }
                                        .styled-table tbody th {
                                            background-color: #f9f9f9;
                                            font-weight: bold;
                                        }
                                    </style>
                                    <table class="styled-table">
                                        <thead>
                                            <tr>
                                                <th></th>
                                                <th>Quantity</th>
                                                <th>Updated</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th>Acc. Statements</th> 
                                                <td>{QTYP102}</td> 
                                                <td>{QTYPROC102}</td>
                                            </tr>
                                            <tr>
                                                <th>Settlements Phase I</th> 
                                                <td>{QTYP060}</td> 
                                                <td>{QTYPROC060}</td> 
                                            </tr>
                                            <tr>
                                                <th>Settlements Phase II</th> 
                                                <td>{QTYP101}</td> 
                                                <td>{QTYPROC101}</td> 
                                            </tr>
                                            <tr>
                                                <th>Tickets</th> 
                                                <td>{QTYP100}</td> 
                                                <td>{QTYPROC100}</td> 
                                            </tr>
                                            <tr>
                                                <th>Refund Trans.</th> 
                                                <td>{QTYP075}</td> 
                                                <td>{QTYPROC075}</td> 
                                            </tr>
                                            <tr>
                                                <th>Chargueback Trans.</th> 
                                                <td>{QTYP076}</td> 
                                                <td>{QTYPROC076}</td> 
                                            </tr>
                                            <tr>
                                                <th>Acredit. Trans.</th> 
                                                <td>{QTYP077}</td> 
                                                <td>{QTYPROC077}</td> 
                                            </tr>
                                        </tbody>
                                    </table>`
                                ),
                                data: objResult
                            }
                        ],
                        buttons: [
                            {
                                text: 'Cerrar',
                                handler: function() {
                                    meDE.gridRefresh()
                                    this.up('window').close();
                                    Ext.getCmp(prototype.id + '-dataEntry').close();
                                    
                                    
                                    
                                }
                            }
                        ]
                    }).show();
                    
                    
                } else
                    global.Msg({msg: res.sesion});
            },
            failure: function (response, opts) {
                console.log('server-side failure with status code ' + response.status);
                Ext.getCmp(prototype.id + '-dataEntry').unmask();
            }
        });
    },
    gridRefresh: function () {
        console.log(panelActual, 'panel de parent control')
        switch(panelActual){
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
                + '&cycle=' + encodeURIComponent(cycle) + '&input=' + encodeURIComponent(input)+ '&dateARC=' + encodeURIComponent(dateARC);

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
            beforerequest: function() {
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
                            if(btnSearch) {
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
    
});