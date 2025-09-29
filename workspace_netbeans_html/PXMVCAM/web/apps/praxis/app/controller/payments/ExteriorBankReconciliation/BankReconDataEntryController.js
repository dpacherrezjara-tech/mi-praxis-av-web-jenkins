/* global axios */

Ext.define('Ext.Praxis.controller.payments.ExteriorBankReconciliation.BankReconDataEntryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.BankReconDataEntryController',
    url: CONTEXTPATH + '/BankReconciliationExt',
    miscUrl: CONTEXTPATH + '/MiscellaneousCatalog',
    bean: {},
    headers: [],
    settlements: [],
    taxes: [],
    request: axios.create({
        baseURL: CONTEXTPATH + '/BankReconciliationExt',
        timeout: 0
    }),
    miscRequest: axios.create({
        baseURL: CONTEXTPATH + '/MiscellaneousCatalog',
        timeout: 0
    }),
    notifier: new AWN(),
    init: function (view) {
        Ext.util.CSS.createStyleSheet(`
            .custom-toast {
                font-size: 15px;
            }
        `, prototype.idDE + '-customStyle');
    },
    afterRender: async function () {
        this.view.mask('Loading...');
        await this.loadFilters();
        await this.getData();
        this.view.unmask();
    },
    loadFilters: async function () {
        const me = this;
        //const res = await fetch(`${me.miscUrl}/loadMdpFilters`);
        try {
            const res = await me.miscRequest.get('/loadMdpFilters');
            const data = res.data;
            me.codpro = data.CODPRO;
            me.paises = data.PAISES;
            me.monedas = data.MONEDAS;
            //<editor-fold defaultstate="collapsed" desc="Bank Browser">
            const cmbFilterCODPRO = Ext.getCmp(prototype.idDE + '-cmbFilterCODPRO');
            global.setComboStore(cmbFilterCODPRO, me.codpro, 'A4451KEY2', 'A4451DESC1', '');
            cmbFilterCODPRO.on('select', function (cmb, record) {
                Ext.getCmp(prototype.idDE + '-txtFilterSEQPRO').setValue(record.data.A4451SEQ || '');
            });
            //</editor-fold>
        } catch (e) {
            console.error(e);
            me.notifier.alert('Filters not loaded');
        }
    },
    getData: async function () {
        const me = this;
        let params = me.formatParameters(me.view.obj);
        try {
            const res = await me.request('/loadStatementInfo', {
                params: params
            });
            const data = res.data;
            global.cleanPXobj(data.response);
            console.log(data);
            const form = Ext.getCmp(prototype.idDE + '-mainForm').getForm();
            //me.limpiaObjetoPX(data.response);

            me.bean = data.response;
            me.clearData();
            form.reset();
            form.setValues(me.bean);

            const corep = (me.bean.COREP || '').trim();
            if (me.bean.STVAL !== '3' && ['AB', 'BM', 'VN'].includes(corep)) {
                await me.setMatchGridsNew();
            } else if (me.bean.STVAL !== '3') {
                me.headers = data.headers;
                me.settlements = data.settlements;
                me.taxes = data.taxes;
                me.setMatchGrids();
            } else {
                me.setPendingGrids();
            }
            me.view.center();

        } catch (e) {
            console.error(e);
            me.notifier.alert('Error on load Bank Info');
            me.view.close();
        }
    },
    //<editor-fold defaultstate="collapsed" desc="ARUBABANK, MANCO MADURO, VISANET">
    setMatchGridsNew: async function () {
        const me = this;
        let parameters = {
            "IN_FAJUST": me.bean.FAJUST.trim(),
            "IN_IDCADJ": me.bean.IDCADJ.trim(),
        };
        console.log('params', parameters);

        Ext.getCmp(prototype.idDE + '-btn-reverse').show();
        const panelAMV = Ext.getCmp(prototype.idDE + '-panelAMV');
        const gridHeader = Ext.getCmp(prototype.idDE + '-panelHeaderAMV');
        const gridStatement = Ext.getCmp(prototype.idDE + '-panelStatementAMV');
        const gridSale = Ext.getCmp(prototype.idDE + '-panelSaleAMV');
        const gridTaxes = Ext.getCmp(prototype.idDE + '-panelTaxesAMV');

        let store = await global.callStoreGet('PRAXISMP', 'MPS253', parameters);
        console.log('store', store.lstRs);
        if (store.lstRs.length > 0) {
            let dataHeader = store.lstRs[0];
            let dataStatement = store.lstRs[1];
            let dataSale = store.lstRs[2];
            let dataTaxes = store.lstRs[3];

            gridHeader.setStore(dataHeader);
            gridStatement.setStore(dataStatement);
            gridSale.setStore(dataSale);
            gridTaxes.setStore(dataTaxes);

            panelAMV.show();
        } else {
            panelAMV.hide();
        }


    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Match">
    setMatchGrids: function () {
        const me = this;
        Ext.getCmp(prototype.idDE + '-panelAMV').hide();
        Ext.getCmp(prototype.idDE + '-btn-update').hide();
        Ext.getCmp(prototype.idDE + '-btn-reverse').show();
        Ext.getCmp(prototype.idDE + '-btn-excel').show();
        const panelMatch = Ext.getCmp(prototype.idDE + '-panelMatch');
        const gridHeader = Ext.getCmp(prototype.idDE + '-gridHeadersMatch');
        const gridSettl = Ext.getCmp(prototype.idDE + '-gridSettlementsMatch');
        const gridTax = Ext.getCmp(prototype.idDE + '-gridTaxesMatch');

        const qtyHeaders = Ext.getCmp(prototype.idDE + '-txtQtyHeaders');
        const qtySales = Ext.getCmp(prototype.idDE + '-txtQtySettlSales');
        const qtyDebits = Ext.getCmp(prototype.idDE + '-txtQtySettlDebits');
        const qtyVoid = Ext.getCmp(prototype.idDE + '-txtQtySettlVoid');
        const qtyTaxes = Ext.getCmp(prototype.idDE + '-txtQtySettlTaxes');
        const qtySettl = Ext.getCmp(prototype.idDE + '-txtQtySettl');

        const totalHeaders = Ext.getCmp(prototype.idDE + '-txtTotalHeaders');
        const totalSales = Ext.getCmp(prototype.idDE + '-txtTotalSettlSales');
        const totalDebits = Ext.getCmp(prototype.idDE + '-txtTotalSettlDebits');
        const totalVoid = Ext.getCmp(prototype.idDE + '-txtTotalSettlVoid');
        const totalTaxes = Ext.getCmp(prototype.idDE + '-txtTotalSettlTaxes');
        const totalSettl = Ext.getCmp(prototype.idDE + '-txtTotalSettl');

        let tsettl = 0, ttax = 0;

        if (me.headers.length > 0) {
            let storeHeader = new Ext.data.Store({
                data: me.headers
            });
            gridHeader.setStore(storeHeader);
            gridHeader.show();
            qtyHeaders.setValue(storeHeader.getCount());
            if (me.headers.filter(x => x.MONEDAPAGO.trim() === '').length > 0) {
                totalHeaders.setValue(storeHeader.sum('NETO'));
            } else {
                totalHeaders.setValue(storeHeader.sum('IMPORTEPAG'));
            }
            qtyHeaders.show();
            totalHeaders.show();
        } else {
            qtyHeaders.hide();
            totalHeaders.hide();
        }

        if (me.settlements.length > 0) {
            let storeSettl = new Ext.data.Store({
                pageSize: 100, // Número de registros por página
                data: me.settlements,
                proxy: {
                    type: 'memory', // Los datos están cargados en memoria
                    enablePaging: true // Habilitar la paginación en memoria
                }
            });
            gridSettl.setStore(storeSettl);
            gridSettl.show();

            let contadores = global.countBy(me.settlements, 'TDOC');

            qtySales.setValue(contadores.S || 0);
            qtyDebits.setValue(contadores.D || 0);
            qtyVoid.setValue(contadores.V || 0);
            qtySettl.setValue(me.settlements.length);


            if (me.settlements.filter(x => x.MONEDAPAGO.trim() === '').length > 0) {
                totalSales.setValue(global.sumByFilter(me.settlements, 'NETO', 'TDOC', 'S'));
                totalDebits.setValue(global.sumByFilter(me.settlements, 'NETO', 'TDOC', 'D'));
                totalVoid.setValue(global.sumByFilter(me.settlements, 'NETO', 'TDOC', 'V'));
                tsettl = global.sumBy(me.settlements, 'NETO');

            } else {
                totalSales.setValue(global.sumByFilter(me.settlements, 'IMPORTEPAG', 'TDOC', 'S'));
                totalDebits.setValue(global.sumByFilter(me.settlements, 'IMPORTEPAG', 'TDOC', 'D'));
                totalVoid.setValue(global.sumByFilter(me.settlements, 'IMPORTEPAG', 'TDOC', 'V'));
                tsettl = global.sumBy(me.settlements, 'IMPORTEPAG');
            }
        }

        if (me.taxes.length > 0) {
            let storeTax = new Ext.data.Store({
                data: me.taxes
            });
            gridTax.setStore(storeTax);
            gridTax.show();
            qtyTaxes.setValue(storeTax.getCount());
            if (me.settlements.filter(x => x.MONEDAPAGO.trim().length === '') > 0) {
                totalTaxes.setValue(storeTax.sum('IMPORTE'));
                ttax = storeTax.sum('IMPORTE');
            } else {
                totalTaxes.setValue(storeTax.sum('IMPORTEPAG'));
                ttax = storeTax.sum('IMPORTEPAG');
            }
            gridSettl.setWidth('65%');
        } else {
            gridSettl.setWidth('100%');
        }

        totalSettl.setValue(tsettl + ttax);

        panelMatch.show();
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Pending">
    setPendingGrids: function () {
        const panelMatch = Ext.getCmp(prototype.idDE + '-panelPending');
        const panelAMV = Ext.getCmp(prototype.idDE + '-panelAMV');
        Ext.getCmp(prototype.idDE + '-btn-update').show();
        Ext.getCmp(prototype.idDE + '-btn-reverse').hide();
        Ext.getCmp(prototype.idDE + '-btn-excel').hide();
        panelAMV.hide();
        panelMatch.show();
    },
    onAddSettlements: async function () {
        const me = this;
        const panelPending = Ext.getCmp(prototype.idDE + '-panelPending');
        panelPending.mask('Scanning...');
        const formFilters = Ext.getCmp(prototype.idDE + '-pendingFilters').getForm();
        let params = formFilters.getValues();
        try {
            const res = await me.request.get('loadSettlementScanner', {
                params: params
            });
            const data = res.data;
            me.addDataHeaders(data.headers);
            me.addDataSettlements(data.response);
            me.addDataTaxes(data.taxes);
        } catch (e) {
            console.error(e);
        } finally {
            me.view.center();
            if (me.settlements.length > 0 || me.taxes.length > 0) {
                Ext.getCmp(prototype.idDE + '-downloadConciliation').setDisabled(false);
            }
        }
        panelPending.unmask();
    },
    addDataHeaders: function (data) {
        const me = this;
        let keys = ['CCUST', 'PRDA', 'CODPRO', 'CCUSTPRO', 'FLIQUIDACI',
            'LIQUIDACIO', 'MERCHAND', 'MONEDALIQ', 'PAISLIQ', 'MONEDA', 'SDATE'];
        let response = global.arrayAddUnique(data, me.headers, keys);
        me.headers = response.data;
        console.log('Headers: ', response);
        me.reloadHeaders();
    },
    addDataSettlements: function (data) {
        const me = this;
        let keys = ['CCUST', 'SDATE', 'SCOUNTRY', 'TDOC', 'CODEBANK',
            'SCARCOD', 'SCARDN', 'SAUTHOC', 'SEQ', 'SVFOP'];
        let response = global.arrayAddUnique(data, me.settlements, keys);
        me.settlements = response.data;
        console.log('Settlements: ', response);
        me.reloadSettlements();
        Ext.toast({
            html: `<div class = "custom-toast">Total found: <b style="color:blue">${response.added}</b><br>` +
                    `Total Added: <b style="color:green">${response.inserted}</b><br>` +
                    `Total Duplicated: <b style="color:red">${response.duplicated}</b></div>`,
            title: 'Notification',
            align: 't',
            closable: true,
            width: 300,
            timeout: 15000
        });
    },
    addDataTaxes: function (data) {
        const me = this;
        let keys = ['CCUST', 'PRDA', 'CODPRO', 'CCUSTPRO', 'FLIQUIDACI',
            'LIQUIDACIO', 'MERCHAND', 'MONEDA', 'CODIGO', 'CORRL'];
        let response = global.arrayAddUnique(data, me.taxes, keys);
        me.taxes = response.data;
        console.log('Taxes: ', response);
        me.reloadTaxes();
    },
    onCleanSettlGrid: function () {
        const me = this;
        const gridHeaders = Ext.getCmp(prototype.idDE + '-gridHeadersPending');
        const gridSettlements = Ext.getCmp(prototype.idDE + '-gridSettlementsPending');
        const gridTaxes = Ext.getCmp(prototype.idDE + '-gridTaxesPending');
        me.headers = [];
        me.settlements = [];
        me.taxes = [];
        gridHeaders.setStore(null);
        gridHeaders.hide();
        gridSettlements.setStore(null);
        gridTaxes.setStore(null);
    },
    onDeleteHeaderPending: function (grid, td, rowIndex, cellIndex, e, record, tr, eOpts) {
        const me = this;
        const {CCUST, CODPRO, CCUSTPRO, LIQUIDACIO, FLIQUIDACI, MERCHAND} = record.data;
        let removeSettl = me.settlements.filter(x =>
            x.CCUST.trim() === CCUST.trim() &&
                    x.CODPRO.trim() === CODPRO.trim() &&
                    x.CCUSTPRO.trim() === CCUSTPRO.trim() &&
                    x.LIQUIDACIO.trim() === LIQUIDACIO.trim() &&
                    x.ADATE.trim() === FLIQUIDACI.trim() &&
                    x.MERCHAND.trim() === MERCHAND.trim()
        );
        let removeTaxes = me.taxes.filter(x =>
            x.CCUST.trim() === CCUST.trim() &&
                    x.CODPRO.trim() === CODPRO.trim() &&
                    x.CCUSTPRO.trim() === CCUSTPRO.trim() &&
                    x.LIQUIDACIO.trim() === LIQUIDACIO.trim() &&
                    x.FLIQUIDACI.trim() === FLIQUIDACI.trim() &&
                    x.MERCHAND.trim() === MERCHAND.trim()
        );

        console.log('Index Del: ', grid.getStore().indexOf(record));
        me.headers.splice(grid.getStore().indexOf(record), 1);
        //grid.getStore().remove(record);
        let keysSettl = ['CCUST', 'CODPRO', 'CCUSTPRO', 'LIQUIDACIO', 'ADATE', 'MERCHAND'];
        let response = global.arrayRemove(removeSettl, me.settlements, keysSettl);
        me.settlements = response.data;
        let settlRemoved = response.removed;

        let keysTaxes = ['CCUST', 'CODPRO', 'CCUSTPRO', 'LIQUIDACIO', 'FLIQUIDACI', 'MERCHAND'];
        response = global.arrayRemove(removeTaxes, me.taxes, keysTaxes);
        me.taxes = response.data;
        let taxRemoved = response.removed;

        me.reloadHeaders();
        me.reloadSettlements();
        me.reloadTaxes();

        Ext.toast({
            html: `<div class = "custom-toast">Total Settlements removed: <b style="color:red">${settlRemoved}</b><br>
                    Total Taxes removed: <b style="color:red">${taxRemoved}</b><br>`,
            title: 'Notification',
            align: 't',
            closable: true,
            width: 300,
            timeout: 15000 // 10 segundos
        });
    },
    onDeleteSettlPending: function (grid, td, rowIndex, cellIndex, e, record, tr, eOpts) {
        const me = this;
        const {CCUST, CODPRO, CCUSTPRO, LIQUIDACIO, ADATE, MERCHAND} = record.data;
        let removeHeaders = me.headers.filter(x =>
            x.CCUST.trim() === CCUST.trim() &&
                    x.CODPRO.trim() === CODPRO.trim() &&
                    x.CCUSTPRO.trim() === CCUSTPRO.trim() &&
                    x.LIQUIDACIO.trim() === LIQUIDACIO.trim() &&
                    x.FLIQUIDACI.trim() === ADATE.trim() &&
                    x.MERCHAND.trim() === MERCHAND.trim()
        );
        let removeTaxes = me.taxes.filter(x =>
            x.CCUST.trim() === CCUST.trim() &&
                    x.CODPRO.trim() === CODPRO.trim() &&
                    x.CCUSTPRO.trim() === CCUSTPRO.trim() &&
                    x.LIQUIDACIO.trim() === LIQUIDACIO.trim() &&
                    x.FLIQUIDACI.trim() === ADATE.trim() &&
                    x.MERCHAND.trim() === MERCHAND.trim()
        );
        let removedHeaders = 0;
        let removedSettl = 0;
        let removedTaxes = 0;

        console.log('Total headers removed ', removeHeaders.length);
        if (removeHeaders.length > 0) {
            let removeSettl = me.settlements.filter(x =>
                x.CCUST.trim() === CCUST.trim() &&
                        x.CODPRO.trim() === CODPRO.trim() &&
                        x.CCUSTPRO.trim() === CCUSTPRO.trim() &&
                        x.LIQUIDACIO.trim() === LIQUIDACIO.trim() &&
                        x.ADATE.trim() === ADATE.trim() &&
                        x.MERCHAND.trim() === MERCHAND.trim()
            );
            let keysHeader = ['CCUST', 'CODPRO', 'CCUSTPRO', 'LIQUIDACIO', 'FLIQUIDACI', 'MERCHAND'];
            let response = global.arrayRemove(removeHeaders, me.headers, keysHeader);
            removedHeaders = response.removed;
            me.headers = response.data;

            response = global.arrayRemove(removeTaxes, me.taxes, keysHeader);
            removedTaxes = response.removed;
            me.taxes = response.data;

            let keysSettl = ['CCUST', 'CODPRO', 'CCUSTPRO', 'LIQUIDACIO', 'ADATE', 'MERCHAND'];
            response = global.arrayRemove(removeSettl, me.settlements, keysSettl);
            removedSettl = response.removed;
            me.settlements = response.data;
        } else {
            console.log('Index Del: ', grid.getStore().indexOf(record));
            me.settlements.splice(grid.getStore().indexOf(record), 1);
            removedSettl = 1;
        }

        me.reloadHeaders();
        me.reloadSettlements();
        me.reloadTaxes();

        Ext.toast({
            html: `<div class = "custom-toast">Total Settlements removed: <b style="color:red">${removedSettl}</b><br>
                    Total Headers removed: <b style="color:red">${removedHeaders}</b><br>
                    Total Taxes removed: <b style="color:red">${removedTaxes}</b>`,
            title: 'Notification',
            align: 't',
            closable: true,
            width: 300,
            timeout: 15000 // 10 segundos
        });

    },
    onDeleteTaxPending: function (grid, td, rowIndex, cellIndex, e, record, tr, eOpts) {
        const me = this;
        const {CCUST, CODPRO, CCUSTPRO, LIQUIDACIO, FLIQUIDACI, MERCHAND} = record.data;
        let removeHeaders = me.headers.filter(x =>
            x.CCUST.trim() === CCUST.trim() &&
                    x.CODPRO.trim() === CODPRO.trim() &&
                    x.CCUSTPRO.trim() === CCUSTPRO.trim() &&
                    x.LIQUIDACIO.trim() === LIQUIDACIO.trim() &&
                    x.FLIQUIDACI.trim() === FLIQUIDACI.trim() &&
                    x.MERCHAND.trim() === MERCHAND.trim()
        );
        let removeSettl = me.settlements.filter(x =>
            x.CCUST.trim() === CCUST.trim() &&
                    x.CODPRO.trim() === CODPRO.trim() &&
                    x.CCUSTPRO.trim() === CCUSTPRO.trim() &&
                    x.LIQUIDACIO.trim() === LIQUIDACIO.trim() &&
                    x.ADATE.trim() === FLIQUIDACI.trim() &&
                    x.MERCHAND.trim() === MERCHAND.trim()
        );
        let removeTaxes = me.taxes.filter(x =>
            x.CCUST.trim() === CCUST.trim() &&
                    x.CODPRO.trim() === CODPRO.trim() &&
                    x.CCUSTPRO.trim() === CCUSTPRO.trim() &&
                    x.LIQUIDACIO.trim() === LIQUIDACIO.trim() &&
                    x.FLIQUIDACI.trim() === FLIQUIDACI.trim() &&
                    x.MERCHAND.trim() === MERCHAND.trim()
        );
        let removedHeaders = 0;
        let removedSettl = 0;
        let removedTaxes = 0;

        let keysHeader = ['CCUST', 'CODPRO', 'CCUSTPRO', 'LIQUIDACIO', 'FLIQUIDACI', 'MERCHAND'];
        let response = global.arrayRemove(removeHeaders, me.headers, keysHeader);
        removedHeaders = response.removed;
        me.headers = response.data;

        let keysSettl = ['CCUST', 'CODPRO', 'CCUSTPRO', 'LIQUIDACIO', 'ADATE', 'MERCHAND'];
        response = global.arrayRemove(removeSettl, me.settlements, keysSettl);
        removedSettl = response.removed;
        me.settlements = response.data;

        let keysTaxes = ['CCUST', 'CODPRO', 'CCUSTPRO', 'LIQUIDACIO', 'FLIQUIDACI', 'MERCHAND'];
        response = global.arrayRemove(removeTaxes, me.taxes, keysTaxes);
        removedTaxes = response.removed;
        me.taxes = response.data;

        me.reloadHeaders();
        me.reloadSettlements();
        me.reloadTaxes();

        Ext.toast({
            html: `<div class = "custom-toast">Total Settlements removed: <b style="color:red">${removedSettl}</b><br>
                    Total Headers removed: <b style="color:red">${removedHeaders}</b><br>
                    Total Taxes removed: <b style="color:red">${removedTaxes}</b>`,
            title: 'Notification',
            align: 't',
            closable: true,
            width: 300,
            timeout: 15000 // 10 segundos
        });
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Handlers">
    onCancelClick: function () {
        this.view.close();
    },
    onDownloadConciliation: async function () {
        const panelPending = Ext.getCmp(prototype.idDE + '-panelPending');
        const me = this;
        let params = {
            bankInfo: me.bean,
            headers: me.headers,
            settlements: me.settlements,
            taxes: me.taxes
        };
        global.downloadFile(me.request, '/downloadExcelEECC', params);
    },
    onUpdateConciliation: function (btn) {
        let params = this.formatUpdateParams();
        Ext.Msg.show(
                {
                    title: '.:PRAXIS:.',
                    msg: 'Are you sure to update?',
                    buttons: Ext.MessageBox.YESNO,
                    scope: this,
                    animateTarget: btn,
                    icon: Ext.MessageBox.QUESTION,
                    modal: true,
                    fn: function (btn) {
                        if (btn === 'yes') {
                            this.maintenanceEECC(params);
                        }
                    }
                });
    },
    maintenanceEECC: async function (params) {
        const me = this;
        me.view.mask('Loading...');
        try {
            const res = await me.request.post('loadConciliationF1', params);
            //console.log(res);
            const{SQLRES, SQLMSG} = res.data;
            if (SQLRES === 0) {
                me.notifier.warning(`Error on Update:<br><b style="color:#fc9b63;">${SQLMSG}</b>`
                        , {durations: {warning: 0}});
            } else {
                me.notifier.success(SQLMSG);
            }
        } catch (e) {
            console.error(e);
            me.notifier.alert(e.response.data);
        } finally {
            me.getData();
            me.view.unmask();
            me.view.reloadGrid();
        }
    },
    onReverseConciliation: function (btn) {
        let params = this.formatReverseParams();
        Ext.Msg.show(
                {
                    title: '.:PRAXIS:.',
                    msg: 'Are you sure to reverse?',
                    buttons: Ext.MessageBox.YESNO,
                    scope: this,
                    animateTarget: btn,
                    icon: Ext.MessageBox.QUESTION,
                    modal: true,
                    fn: function (btn) {
                        if (btn === 'yes') {
                            this.reverseEECC(params);
                        }
                    }
                });
    },
    reverseEECC: async function (params) {
        const me = this;
        me.view.mask('Loading...');
        try {
            const arr = ['VN', 'BM', 'AB'];
            if (!arr.includes(params.IN_CODPRO)) {
                await global.callStorePost('PRAXISMP', 'MPS286',params);
            } else {
                await global.callStorePost('PRAXISMP', 'MPS285',params);
            }
            me.notifier.success(`Reversed Conciliation`);
        } catch (e) {
            console.error(e);
            me.notifier.alert('System Error');
        } finally {
            await me.getData();
            me.view.unmask();
        }
    },
    onOpenFilters: function () {
        const openFilters = Ext.getCmp(prototype.idDE + '-btn-openFilters');
        const hideFilters = Ext.getCmp(prototype.idDE + '-btn-hideFilters');
        const formFilters = Ext.getCmp(prototype.idDE + '-filterGrids');
        openFilters.hide();
        formFilters.show();
        hideFilters.show();
    },
    onHideFilters: function () {
        const openFilters = Ext.getCmp(prototype.idDE + '-btn-openFilters');
        const hideFilters = Ext.getCmp(prototype.idDE + '-btn-hideFilters');
        const formFilters = Ext.getCmp(prototype.idDE + '-filterGrids');
        openFilters.show();
        formFilters.hide();
        hideFilters.hide();
    },
    onDeleteByFilter: function (btn) {
        const me = this;
        let keys = btn.up('form').getForm().getValues();

        let removeHeaders = global.filterArrayByObj(me.headers, keys, true);
        let removeSettl = global.filterArrayByObj(me.settlements, keys, true);
        let removeTaxes = global.filterArrayByObj(me.taxes, keys, true);

        let removedHeaders = 0, removedSettl = 0, removedTaxes = 0;

        let keysHeader = ['CCUST', 'CODPRO', 'CCUSTPRO', 'LIQUIDACIO', 'FLIQUIDACI', 'MERCHAND'];
        let response = global.arrayRemove(removeHeaders, me.headers, keysHeader);
        removedHeaders = response.removed;
        me.headers = response.data;

        let keysSettl = ['CCUST', 'CODPRO', 'CCUSTPRO', 'LIQUIDACIO', 'ADATE', 'MERCHAND'];
        response = global.arrayRemove(removeSettl, me.settlements, keysSettl);
        removedSettl = response.removed;
        me.settlements = response.data;

        let keysTaxes = ['CCUST', 'CODPRO', 'CCUSTPRO', 'LIQUIDACIO', 'FLIQUIDACI', 'MERCHAND'];
        response = global.arrayRemove(removeTaxes, me.taxes, keysTaxes);
        removedTaxes = response.removed;
        me.taxes = response.data;

        me.reloadHeaders();
        me.reloadSettlements();
        me.reloadTaxes();

        Ext.toast({
            html: `<div class = "custom-toast">Total Settlements removed: <b style="color:red">${removedSettl}</b><br>
                    Total Headers removed: <b style="color:red">${removedHeaders}</b><br>
                    Total Taxes removed: <b style="color:red">${removedTaxes}</b>`,
            title: 'Notification',
            align: 't',
            closable: true,
            width: 300,
            timeout: 15000 // 10 segundos
        });
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Reload Grids">
    reloadHeaders: function () {
        const me = this;
        const gridHeaders = Ext.getCmp(prototype.idDE + '-gridHeadersPending');
        const qtyHeaders = Ext.getCmp(prototype.idDE + '-txtQtyHeaders2');
        const totalHeaders = Ext.getCmp(prototype.idDE + '-txtTotalHeaders2');
        if (me.headers.length > 0) {
            gridHeaders.show();
        }
        let store = new Ext.data.Store({
            data: me.headers
        });
        gridHeaders.setStore(store);
        qtyHeaders.setValue(me.headers.length);
        if (me.headers.filter(x => x.MONEDAPAGO.trim() === '').length > 0) {
            totalHeaders.setValue(store.sum('NETO'));
        } else {
            totalHeaders.setValue(store.sum('IMPORTEPAG'));
        }
    },
    reloadSettlements: function () {
        const me = this;
        const gridSettlements = Ext.getCmp(prototype.idDE + '-gridSettlementsPending');

        const qtySales = Ext.getCmp(prototype.idDE + '-txtQtySettlSales2');
        const qtyDebits = Ext.getCmp(prototype.idDE + '-txtQtySettlDebits2');
        const qtyVoid = Ext.getCmp(prototype.idDE + '-txtQtySettlVoid2');
        const qtySettl = Ext.getCmp(prototype.idDE + '-txtQtySettl2');

        const totalSales = Ext.getCmp(prototype.idDE + '-txtTotalSettlSales2');
        const totalDebits = Ext.getCmp(prototype.idDE + '-txtTotalSettlDebits2');
        const totalVoid = Ext.getCmp(prototype.idDE + '-txtTotalSettlVoid2');
        const totalSettl = Ext.getCmp(prototype.idDE + '-txtTotalSettl2');

        let store = new Ext.data.Store({
            pageSize: 100,
            data: me.settlements,
            proxy: {
                type: 'memory', // Los datos están cargados en memoria
                enablePaging: true // Habilitar la paginación en memoria
            }
        });
        gridSettlements.setStore(store);

        let contadores = global.countBy(me.settlements, 'TDOC');

        qtySales.setValue(contadores.S || 0);
        qtyDebits.setValue(contadores.D || 0);
        qtyVoid.setValue(contadores.V || 0);
        qtySettl.setValue(me.settlements.length);

        let tsettl = 0.00;
        if (me.settlements.filter(x => x.MONEDAPAGO.trim() === '').length > 0) {
            totalSales.setValue(global.sumByFilter(me.settlements, 'NETO', 'TDOC', 'S'));
            totalDebits.setValue(global.sumByFilter(me.settlements, 'NETO', 'TDOC', 'D'));
            totalVoid.setValue(global.sumByFilter(me.settlements, 'NETO', 'TDOC', 'V'));
            tsettl = global.sumBy(me.settlements, 'NETO');

        } else {
            totalSales.setValue(global.sumByFilter(me.settlements, 'IMPORTEPAG', 'TDOC', 'S'));
            totalDebits.setValue(global.sumByFilter(me.settlements, 'IMPORTEPAG', 'TDOC', 'D'));
            totalVoid.setValue(global.sumByFilter(me.settlements, 'IMPORTEPAG', 'TDOC', 'V'));
            tsettl = global.sumBy(me.settlements, 'IMPORTEPAG');
        }
        totalSettl.setValue(tsettl);
    },
    reloadTaxes: function () {
        const me = this;
        const gridTaxes = Ext.getCmp(prototype.idDE + '-gridTaxesPending');
        const qtyTaxes = Ext.getCmp(prototype.idDE + '-txtQtySettlTaxes2');
        const totalTaxes = Ext.getCmp(prototype.idDE + '-txtTotalSettlTaxes2');
        let store = new Ext.data.Store({
            data: me.taxes
        });
        gridTaxes.setStore(store);

        qtyTaxes.setValue(me.taxes.length);

        if (me.taxes.filter(x => x.MONEDAPAGO.trim() === '').length > 0) {
            totalTaxes.setValue(global.sumBy(me.taxes, 'IMPORTE'));

        } else {
            totalTaxes.setValue(global.sumBy(me.taxes, 'IMPORTEPAG'));
        }
    },
    clearData: function () {
        const me = this;
        const panelPending = Ext.getCmp(prototype.idDE + '-panelPending');
        const panelMatch = Ext.getCmp(prototype.idDE + '-panelMatch');
        panelPending.hide();
        panelMatch.hide();
        const gridHeader = Ext.getCmp(prototype.idDE + '-gridHeadersMatch');
        const gridSettl = Ext.getCmp(prototype.idDE + '-gridSettlementsMatch');
        const gridTax = Ext.getCmp(prototype.idDE + '-gridTaxesMatch');
        gridHeader.setStore(null);
        gridSettl.setStore(null);
        gridTax.setStore(null);
        me.settlements = [];
        me.headers = [];
        me.taxes = [];
        me.reloadHeaders();
        me.reloadSettlements();
        me.reloadTaxes();
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Formateo de Parametros">
    formatParameters: function (obj) {
        let params = {
            IN_CCUST: obj.CCUST,
            IN_ADATE: obj.ADATE,
            IN_SOCIETY: obj.SOCIETY,
            IN_CODEBANK: obj.CODEBANK,
            IN_BANDOC: obj.BANDOC,
            IN_DATECI: obj.DATECI,
            IN_TRANCI: obj.TRANCI,
            IN_CODPRO: obj.CODPRO,
            IN_SEQPRO: obj.CCUSTPRO
        };
        return params;
    },
    formatUpdateParams: function () {
        const me = this;
        let params = {
            bankInfo: me.bean,
            headers: me.headers,
            settlements: me.settlements,
            taxes: me.taxes
        };
        return params;
    },
    formatReverseParams: function () {
        const me = this;
        let params = {
            VP_CODPRO: me.bean.CODPRO,
            VP_BANDOC: me.bean.BANDOC,
            VP_DATECI: me.bean.DATECI,
            VP_TRANCI: me.bean.TRANCI,
            IN_DATEC: me.bean.FAJUST,
            IN_TRANC: me.bean.IDCADJ.trim(),
            IN_CODPRO: me.bean.CODPRO
        };
        return params;
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Utilitarios">
    getCmp: function ( {id}){
        return Ext.getCmp(prototype.id + id);
    },
    limpiaObjetoPX: function (obj) {
        for (let key in obj) {
            if (typeof obj[key] === 'string') {
                obj[key] = obj[key].trimEnd();
            }
        }
    },
    requestObjectSP: function (jsonData) {
        const resultado = {};
        for (const clave in jsonData) {
            if (jsonData.hasOwnProperty(clave)) {
                // Convierte la clave a mayúsculas y añade "IN" como prefijo
                const nuevaClave = `IN_${clave.toUpperCase()}`;

                // Asigna el valor original a la nueva clave
                resultado[nuevaClave] = jsonData[clave];
            }
        }
        return resultado;
    },
    requestObjectPX: function (jsonData) {
        const resultado = {};
        for (const clave in jsonData) {
            if (jsonData.hasOwnProperty(clave)) {
                // Convierte la clave a mayúsculas y añade "IN" como prefijo
                const nuevaClave = `${clave.toUpperCase()}`;

                // Asigna el valor original a la nueva clave
                resultado[nuevaClave] = jsonData[clave];
            }
        }
        return resultado;
    }
    //</editor-fold>
});


