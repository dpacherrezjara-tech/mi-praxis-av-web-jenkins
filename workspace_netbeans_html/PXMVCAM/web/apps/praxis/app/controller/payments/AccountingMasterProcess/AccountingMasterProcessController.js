// Controller delegado para las rowActions de la grilla principal.
// Delega onRowAction al ViewController padre (AccountingMasterProcessController)
// usando la jerarquía de componentes para no depender de IDs globales.
Ext.define('Ext.Praxis.controller.payments.AccountingMasterProcess.MainGridRowCtrl', {
    extend: 'Ext.Base',
    baseCtrl: null,
    widgetView: null,
    onRowAction: function (action, record) {
        if (action !== 'detail') return;
        const form = this.widgetView && this.widgetView.up('AccountingMasterProcessForm');
        if (form) form.getController().onOpenDetailModal(record.getData());
    },
    onWidgetReady: function () { }
});

Ext.define('Ext.Praxis.controller.payments.AccountingMasterProcess.AccountingMasterProcessController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.AccountingMasterProcessController',
    url: CONTEXTPATH + '/AccountingReport',
    procesadores: [],
    request: axios.create({
        baseURL: CONTEXTPATH + '/AccountingReport',
        timeout: 20000
    }),
    init: function (view) {
        //window.location.reload();
        prototype.id = 'AccountingMasterProcessForm';
        prototype.url = CONTEXTPATH + '/AccountingReport';
        prototype.width = 1900;
        prototype.height = 630;
        fechaActual = new Date(), mesActual = fechaActual.getMonth(), anioActual = fechaActual.getFullYear();
    },
    afterRender: async function () {
        await this.loadFilters();
    },
    loadFilters: async function () {
        const me = this;
        me.view.mask('Loading...');
        try {
            const res = await global.callStoreGet('PRAXISMP', 'MPS124', {});
            me.procesadores = (res.lstRs && res.lstRs.at(0)) || [];
            me._refreshProcessors();
        } catch (e) {
            console.error(e);
        } finally {
            me.view.unmask();
            me.loadGrid();
        }
    },

    onChangeProceso: function () {
        this._refreshProcessors();
    },

    onChangeCcust: function () {
        this._refreshProcessors();
    },

    onChangeTipocon: function () {
        this._refreshProcessors();
    },

    _refreshProcessors: function () {
        const me = this;
        const proceso = Ext.getCmp(prototype.id + '-cmbProceso').getValue();
        const ccust = Ext.getCmp(prototype.id + '-cmbCcust').getValue();
        const tipocon = Ext.getCmp(prototype.id + '-cmbTIPOCON').getValue();
        const data = me.procesadores.filter(x =>
            x.PROC_TYPE.trim() === proceso &&
            x.CLIENTE.trim() === ccust &&
            x.ACC_TYPE.trim() === tipocon
        );
        global.setComboStore(
            Ext.getCmp(prototype.id + '-cmbCODPRO'),
            data, 'PROCESADOR', 'PROC_DESC', ''
        );
    },
    loadGrid: function () {
        const me = this;
        const params = me.formatParams();
        const mainPanel = Ext.getCmp(prototype.id + '-mainContent');

        const existingGrid = Ext.getCmp(prototype.id + '-MainGrid-1');
        if (existingGrid) {
            // El widget ya existe: solo recarga el store con los nuevos params
            existingGrid.getController().reload(params);
            return;
        }

        mainPanel.removeAll();
        mainPanel.add({
            xtype: 'storeprocgrid',
            id: prototype.id + '-MainGrid-1',
            library: 'PRAXISMP',
            storeProcedure: 'MPS466',
            storeParams: params,
            customController: 'Ext.Praxis.controller.payments.AccountingMasterProcess.MainGridRowCtrl',
            rowActions: [{ action: 'detail', tooltip: 'Ver Detalle Contable' }],
            width: prototype.width,
            height: prototype.height,
            excelColumns: [
                {
                    header: 'Type', dataIndex: 'TIPOCON',
                    formatter: function (v) {
                        return { DEB: 'Debits', REG: 'Regular', ADJ: 'Adjustment', ADM: "ADM's", SAL: 'Sale W/O Settl', REV: 'Reverse' }[v] || v;
                    }
                },
                { header: 'ID', dataIndex: 'IDCONT' },
                { header: 'Deposits', dataIndex: 'QTY_SEQ' },
                { header: 'Errors', dataIndex: 'QTY_POS' },
                {
                    header: 'Status', dataIndex: 'STCONT',
                    formatter: function (v) {
                        return { '0': 'Processing', '1': 'Closed', '2': 'Accounting Errors', '3': 'Ready to Send', '4': 'Reversed', '5': 'SFTP', '7': 'Process Error', '8': 'No Data' }[v] || v;
                    }
                },
                { header: 'Client', dataIndex: 'CCUST' },
                { header: 'Processor', dataIndex: 'CODPRO' },
                { header: 'Posting Date', dataIndex: 'FCONT' },
                { header: 'Initial Date', dataIndex: 'PRDAF' },
                { header: 'Final Date', dataIndex: 'PRDAT' },
                { header: 'Generation Time', dataIndex: 'HCONT' },
                { header: 'Generation Date', dataIndex: 'FSEND' }
            ],
            // Sin rowActions por ahora — se implementarán en modal
            gridColumns: {
                defaults: {
                    align: 'center',
                    menuDisabled: true,
                    sortable: true
                },
                items: [
                    {
                        text: 'RN',
                        locked: true,
                        xtype: 'rownumberer',
                        width: 40
                    },
                    {
                        text: 'Type', dataIndex: 'TIPOCON', width: 100,
                        renderer: function (value, metaData) {
                            const opts = {
                                'DEB': 'Debits',
                                'REG': 'Regular',
                                'ADJ': 'Adjustment',
                                'ADM': "ADM's",
                                'SAL': "Sale W/O Settl",
                                'REV': "Reverse"
                            };
                            return opts[value] || value;
                        }
                    },
                    { text: 'ID', dataIndex: 'IDCONT', width: 210 },
                    {
                        text: 'Deposits', dataIndex: 'QTY_SEQ', width: 80,
                        renderer: function (value, metaData) {
                            metaData.style = 'text-decoration:underline;font-weight:bolder;color:#5bc611;';
                            return value;
                        }
                    },
                    {
                        text: 'Errors', dataIndex: 'QTY_POS', width: 80,
                        renderer: function (value, metaData) {
                            metaData.style = 'text-align:center;text-decoration:underline;font-weight:bolder;color:#f71a1a;';
                            return value;
                        }
                    },
                    {
                        text: 'Status', dataIndex: 'STCONT', flex: 1,
                        renderer: function (value, metaData) {
                            const opts = {
                                '0': function () {
                                    metaData.style = 'background-color:#838187;font-weight:bold';
                                    return 'Processing 🔃';
                                },
                                '9': function () {
                                    metaData.style = 'background-color:#096404;font-weight:bold;color:white';
                                    return 'Closed by User 🔒';
                                },
                                '2': function () {
                                    metaData.style = 'background-color:#fdb333;font-weight:bold';
                                    return 'Accounting Errors 🚫';
                                },
                                '3': function () {
                                    metaData.style = 'background-color:#8cdfe3;font-weight:bold';
                                    return 'Ready to Send 🆗';
                                },
                                '4': function () {
                                    metaData.style = 'background-color:#f7ec35;font-weight:bold';
                                    return 'Reversed ⛔';
                                },
                                '5': function () {
                                    metaData.style = 'background-color:#9187e1;font-weight:bold';
                                    return 'SFTP 🆗';
                                },
                                '7': function () {
                                    metaData.style = 'background-color:#f7ec35;font-weight:bold';
                                    return 'Process Error ⚠️';
                                },
                                '8': function () {
                                    metaData.style = 'background-color:#f7ec35;font-weight:bold';
                                    return 'No Data ⭕';
                                }
                            };
                            return opts[value] ? opts[value]() : value;
                        }
                    },
                    {
                        text: 'Accounting Information',
                        defaults: {
                            menuDisabled: true,
                            sortable: true,
                            align: 'center',
                            renderer: function (value, metaData) {
                                metaData.style = 'background-color:#B2DAFA';
                                return value;
                            }
                        },
                        columns: [
                            { text: 'Client Code', dataIndex: 'CCUST', width: 100 },
                            { text: 'Processor', dataIndex: 'CODPRO', width: 180 },
                            { text: 'Initial<br>Date', dataIndex: 'PRDAF', width: 90 },
                            { text: 'Final<br>Date', dataIndex: 'PRDAT', width: 90 },
                            { text: 'Posting<br>Date', dataIndex: 'FCONT', width: 90 },
                            { text: 'Corrl AV Assigned', dataIndex: 'FILENAM', width: 250 },
                            { text: 'Generation<br>Date', dataIndex: 'FSEND', width: 90 },
                            { text: 'Generation<br>Hour', dataIndex: 'HCONT', width: 80 },
                        ]
                    }
                ]
            }
        });
    },
    onOpenDetailModal: function (rowData) {
        const winId = prototype.id + '-DetailModal';
        const existing = Ext.getCmp(winId);
        if (existing) existing.destroy();
        Ext.create('Ext.Praxis.view.payments.AccountingMasterProcessForm.AccountingDetailModal', {
            id: winId,
            idcont: rowData.IDCONT,
            rowData: rowData,
            onAfterAction: () => this.onReloadGrid()
        }).show();
    },
    formatParams: function () {
        const formFilters = Ext.getCmp(prototype.id + '-formFilters').getForm();
        console.log('Search Params: ', formFilters.getValues());
        return formFilters.getValues();
    },
    onProcessClick: function () {
        const me = this;
        const dataEntry = Ext.create('Ext.Praxis.view.payments.AccountingMasterProcessForm.DataEntrys.ProcessAccountingDataEntry', {
            id: prototype.id + '-ProcessAccountingDataEntry-1',
            procesadores: me.procesadores
        });
        dataEntry.show();
    },
    onSapClick: function () {
        const me = this;
        const dataEntry = Ext.create('Ext.Praxis.view.payments.AccountingMasterProcessForm.DataEntrys.SapLoadDataEntry', {
            id: prototype.id + '-SapLoadDataEntry-1',
            procesadores: me.procesadores
        });
        dataEntry.show();
    },
    //<editor-fold defaultstate="collapsed" desc="Handlers">
    onClickSearchBtn: function () {
        this.loadGrid();
    },
    onReloadGrid: function () {
        // Shortcut: recarga el grid existente sin recrearlo
        const widget = Ext.getCmp(prototype.id + '-MainGrid-1');
        if (widget) {
            widget.getController().reload(this.formatParams());
        }
    },
    onDisplayFilterBtn: function () {
        const filters = Ext.getCmp(prototype.id + '-contentFilter');
        if (filters.isVisible()) {
            filters.hide();
        } else {
            filters.show();
        }
    },
    onClearOptionsBtn: function () {
        const formFilters = Ext.getCmp(prototype.id + '-formFilters').getForm();
        formFilters.reset();
    },
    onEnterKeyPress: function (field, e) {
        if (e.getKey() === e.ENTER) {
            this.onClickSearchBtn();
        }
    },
    onClickLoadProvision: async function () {
        const me = this;
        const winProvis = Ext.create('Ext.window.Window', {
            title: 'Provision - Form',
            width: 400,
            id: prototype.id + '-provisionForm',
            layout: 'fit',
            modal: true,
            items: [{
                xtype: 'form',
                bodyPadding: 10,
                defaults: {
                    anchor: '100%',
                    labelWidth: 100
                },
                items: [{
                    xtype: 'filefield',
                    id: prototype.id + '-fileProvision',
                    name: 'file',
                    labelWidth: 50,
                    fieldLabel: 'File',
                    buttonText: 'Select File...',
                    allowBlank: false
                },
                {
                    xtype: 'label',
                    width: '100%',
                    html: '<b style="color:#c82d2d;font-size:9px;text-align:right;display:block">Required Layout (*): REFER-VALDATE</b>'
                }
                ]
            }],
            buttonAlign: 'center',
            buttons: [{
                text: 'Process Provision',
                iconCls: 'prx-icon-reload',
                scale: 'medium',
                handler: function (btn) {
                    var form = btn.up('window').down('form').getForm();
                    if (form.isValid()) {
                        Ext.Msg.show(
                            {
                                title: '.:PRAXIS:.',
                                msg: 'Are you sure to process Provision?',
                                buttons: Ext.MessageBox.YESNO,
                                scope: this,
                                icon: Ext.MessageBox.QUESTION,
                                modal: true,
                                fn: function (btn) {
                                    if (btn === 'yes') {
                                        me.loadProvision();
                                        /*
                                         form.submit({
                                         url: CONTEXTPATH + '/AccountingReport/processProvision', // <-- cambiá esto
                                         waitMsg: 'Loading File...',
                                         success: function (fp, o) {
                                         new AWN().success('File Uploaded Successfully');
                                         me.downloadResultProvis(o.result);
                                         },
                                         failure: function (fp, o) {
                                         new AWN().alert('Error on load File');
                                         }
                                         });*/
                                    }
                                }
                            });

                    }
                }
            }]
        });
        winProvis.show();
    },
    loadProvision: async function () {
        const me = this;
        const form = Ext.getCmp(prototype.id + '-provisionForm');
        form.setLoading(true);
        const file = Ext.getCmp(prototype.id + '-fileProvision').fileInputEl.dom.files[0];
        //        const userCurrent = document.getElementById("menuUser").textContent;
        //       , IN_USER: userCurrent
        if (file) {
            let nameFile = file.name;
            global.readExcelFile(file, async (json) => {
                try {
                    json = json.map(x => ({
                        FILENAM: nameFile,
                        ...x
                    }));
                    const tmp = await global.loadRecordsOnTable('PRAXISMP', 'XTEMPO', json);

                    //                    const res = await global.callStorePost('PRAXISMP', 'SPGCON009', {
                    //                        IN_CUUID: tmp.cuuid,
                    //                        IN_FUUID: tmp.fuuid,
                    //                        IN_USER: userCurrent
                    //                    });

                    const res = await me.request.post('/executeProvision', {
                        IN_CUUID: tmp.cuuid,
                        IN_FUUID: tmp.fuuid
                    });
                    console.log("res: ", res);

                    const data = res.data;
                    console.log("data: ", data);

                    if (data && data.STATUS === true) {
                        global.Msg({ msg: 'Provision started' });
                    } else {
                        global.Msg({ msg: 'Provision failed' });
                    }

                    //                    me.downloadResultProvis(res.data.lstRs.at(0));
                } catch (e) {
                    console.error(e);
                } finally {
                    form.setLoading(false);
                }

            });
        } else {
            this.notifier.alert('Select file to process');
            form.setLoading(true);
        }
    },
    downloadResultProvis: function (result) {
        const me = this;
        Ext.Msg.show(
            {
                title: '.:PRAXIS:.',
                msg: 'Download Result?',
                buttons: Ext.MessageBox.YESNO,
                scope: this,
                icon: Ext.MessageBox.QUESTION,
                modal: true,
                fn: function (btn) {
                    if (btn === 'yes') {
                        console.log(result);
                        //let data = JSON.parse(result);
                        me.createExcelProvis(result);
                    }
                }
            });
    },
    createExcelProvis: async function (data) {

        let excelData = data.map(x => {
            let layout = {
                'Bank Doc.': x.BANDOC,
                'Value Date': x.VALDATE,
                'Reference': x.REFER,
                'Status Prov': x.STPROV === 'Y' ? 'YES' : 'NO',
                'Account Prov.': x.ACCPROV,
                'Date Prov.': x.FECPROV,
                'Corrl AV': x.CORRLAV
            };
            return layout;
        });
        global.writeExcelFromJson(excelData, 'Provision Success');

    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Utilitarios">
    getCmp: function ({ id }) {
        return Ext.getCmp(prototype.id + id);
    },
    setComboStore: function ({ cmp, data, valueField, displayField, value }) {
        const me = this;
        cmp.suspendEvents(false);
        cmp.bindStore(me.createComboStore({
            data: data
            , valueField: valueField, displayField: displayField
        }));
        cmp.setValue(value);
        cmp.resumeEvents();
    },
    createComboStore: function ({ data, valueField, displayField }) {
        //crea record vacio
        let allRecord = {};
        allRecord[displayField] = 'All';
        allRecord[valueField] = '';
        //limpia record de data
        data.forEach(obj => {
            for (let attr in obj) {
                if (typeof obj[attr] === 'string') {
                    obj[attr] = obj[attr].trimEnd();
                }
            }
        });
        //crea Store
        let store = this.createStore({ data: data });
        //inserta record vacio
        store.insert(0, allRecord);
        //console.log('store creado',store);
        return store;
    },
    createArrayStore: function ({ data }) {
        const store = new Ext.data.SimpleStore({
            fields: ['code', 'name'],
            data: data.map(x => {
                return [x.code, x.name];
            })
        });
        return store;
    },
    createStore: function ({ data }) {
        return Ext.create('Ext.data.Store', {
            autoLoad: true,
            data: data,
            pageSize: 20
        });
    },
    parseInt: function (number) {
        if (number && number !== '') {
            return parseInt(number);
        }
        ;
        return number;
    },
    getDistinct: function (lst, key) {
        let valoresVistos = {};
        // Filtra el array para eliminar duplicados según la columna "nombre"
        let resultado = lst.filter(function (item) {
            if (valoresVistos[item[key]]) {
                // Si el valor ya se ha visto, exclúyelo
                return false;
            }
            // Si es la primera vez que se ve, márcalo como visto y manténlo en el resultado
            valoresVistos[item[key]] = true;
            return true;
        });
        return resultado;
    }
    //</editor-fold>
});