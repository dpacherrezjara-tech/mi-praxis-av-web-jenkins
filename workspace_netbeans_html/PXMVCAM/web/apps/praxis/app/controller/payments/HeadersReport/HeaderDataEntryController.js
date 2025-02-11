Ext.define('Ext.Praxis.controller.payments.HeadersReport.HeaderDataEntryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.HeaderDataEntryController',
    url: CONTEXTPATH + '/HeadersReport',
    procesadores: [],
    request: axios.create({
        baseURL: CONTEXTPATH + '/HeadersReport',
        timeout: 0
    }),
    dataFiles: [],
    dataAcc: [],
    dataRej: [],
    notifier: new AWN(),
    init: function (view) {
    },
    afterRender: async function () {
        this.loadData();
    },
    loadData: async function () {
        const me = this;
        me.view.setLoading(true);
        try {
            const res = await me.request.get('loadHeaderInfo', {
                params: {
                    IN_IDCONT: me.view.praxisId
                }
            });
            const {header, files, bandocs, rejections} = res.data;
            let info = header.at(0);
            global.cleanPXobj(info);
            const mainForm = Ext.getCmp(prototype.idDE + '-mainForm').getForm();
            mainForm.setValues(info);
            me.bindData(info, files, bandocs, rejections);
        } catch (e) {
            console.error(e);
            me.view.close();
        } finally {
            me.view.setLoading(false);
        }
    },
    bindData: function (info, files, bandocs, rejections) {
        const me = this;
        console.log(info.STCONT);
        let sts = ['1', '6'];
        if (sts.includes(info.STCONT)) {
            Ext.getCmp(prototype.idDE + '-btn-save').hide();
            Ext.getCmp(prototype.idDE + '-btnRejectRec').hide();
        } else {
            Ext.getCmp(prototype.idDE + '-btn-save').show();
            Ext.getCmp(prototype.idDE + '-btnRejectRec').show();
        }
        me.dataFiles = files;
        me.dataAcc = bandocs;
        me.dataRej = rejections;
        me.loadStores();
    },
    loadStores: function () {
        const me = this;
        const filesGrid = Ext.getCmp(prototype.idDE + '-gridFiles');
        const accountedGrid = Ext.getCmp(prototype.idDE + '-gridAccounted');
        const rejectionsGrid = Ext.getCmp(prototype.idDE + '-gridRejected');
        let storeFiles = new Ext.data.Store({
            data: me.dataFiles
        });
        let storeAcc = new Ext.data.Store({
            pageSize: 50,
            data: me.dataAcc,
            proxy: {
                type: 'memory', // Los datos están cargados en memoria
                enablePaging: true // Habilitar la paginación en memoria
            }
        });
        let storeRej = new Ext.data.Store({
            pageSize: 50,
            data: me.dataRej,
            proxy: {
                type: 'memory', // Los datos están cargados en memoria
                enablePaging: true // Habilitar la paginación en memoria
            }
        });
        filesGrid.setStore(storeFiles);
        accountedGrid.setStore(storeAcc);
        rejectionsGrid.setStore(storeRej);
    },
    onCancelClick: function () {
        this.view.close();
    },
    onRejectRec: function (grid, td, rowIndex, cellIndex, e, record, tr, eOpts) {
        const me = this;
        const {BANDOC, DATECI, TRANCI, REFER} = record.data;

        Ext.create('Ext.window.Window', {
            title: 'Reject Document',
            width: 500,
            modal: true, // Hace que la ventana sea modal
            layout: 'fit',
            items: {
                xtype: 'form',
                layout: {
                    type: 'vbox',
                    align: 'center'
                },
                bodyPadding: 5,
                items: [
                    {
                        xtype: 'label',
                        text: 'Are you sure to Reject document: ' + REFER + '?',
                        style: {
                            fontSize: '14px',
                            color: 'red',
                            fontWeight: 'bold',
                            marginTop: '10px',
                            marginBottom: '10px'
                        }
                    },
                    {
                        xtype: 'combobox',
                        id: prototype.idDE + '-cmbRejectError',
                        labelStyle: 'font-weight:bold;',
                        fieldLabel: 'Rejection Error',
                        store: me.view.filters.ERRORES.filter(x => x.TIPO === 'C'),
                        labelWidth: 100,
                        width: 380,
                        displayField: 'DESCR',
                        valueField: 'CODREC',
                        queryMode: 'local',
                        editable: false,
                        emptyText: '(Select)',
                        value: ''
                    }
                ]
            },
            buttons: [
                {
                    text: 'Reject',
                    style: {
                        backgroundColor: 'white', // Fondo blanco
                        border: '2px solid red', // Marco rojo
                        color: 'red', // Letras rojas
                        fontWeight: 'bold', // Texto en negrita
                        marginTop: '3px',
                        marginBottom: '3px'
                    },
                    handler: function (btn) {
                        let combo = Ext.getCmp(prototype.idDE + '-cmbRejectError');
                        if (!combo.value) {
                            me.notifier.alert('Select Error');
                            return;
                        }
                        let obj = record.data;
                        obj.DATEC = combo.value;
                        obj.DESCR = me.view.filters.ERRORES.filter(x => x.CODREC === combo.value).at(0).DESCR;
                        me.dataRej = global.arrayAddUnique(me.dataRej, [obj], ['BANDOC', 'DATECI', 'TRANCI']).data;
                        me.dataAcc = me.dataAcc.filter(x => !(x.BANDOC === BANDOC && x.DATECI === DATECI && x.TRANCI === TRANCI));
                        me.loadStores();
                        me.notifier.success(REFER + '<br>Successfully Rejected');
                        btn.up('window').close();
                    }
                },
                {
                    text: 'Close',
                    style: {
                        marginTop: '3px',
                        marginBottom: '3px'
                    },
                    handler: function (btn) {
                        btn.up('window').close();
                    }
                }
            ]
        }).show();
    },
    onChangeReference: function (field, newValue) {
        let upperValue = newValue.toUpperCase();
        field.setValue(upperValue);
        const store = Ext.getCmp(prototype.idDE + '-gridAccounted').getStore();
        //store.clearFilter();
        store.filterBy(function (record) {
            let refer = record.get('REFER').trim();
            return refer.indexOf(upperValue) !== -1;
        });
        if (newValue === '') {
            store.clearFilter();
        }
    },
    onChangeBandoc: function (field, newValue) {
        let upperValue = newValue.toUpperCase();
        field.setValue(upperValue);
        const store = Ext.getCmp(prototype.idDE + '-gridAccounted').getStore();
        //store.clearFilter();
        store.filterBy(function (record) {
            let bandoc = record.get('BANDOC').trim();
            return bandoc.indexOf(upperValue) !== -1;
        });
        if (newValue === '') {
            store.clearFilter();
        }
    },
    maintenanceAccounting: async function (params) {
        const me = this;
        me.view.setLoading(true);
        try {
            const res = await me.request.post('maintenanceHeader', params);
            if (res.status === 201) {
                me.notifier.success('Updated Successfully');
            } else {
                me.notifier.alert('Error on Update');
            }
        } catch (e) {
            console.error(e);
            me.view.close();
        } finally {
            me.view.setLoading(false);
            me.view.close();
            Ext.getCmp(prototype.id + '-HeadersGrid-1').getStore().load();
        }
    },
    formatParams: function () {
        const me = this;
        const params = Ext.getCmp(prototype.idDE + '-mainForm').getForm().getValues();
        let jsonParams = global.maintenanceObj(params);
        jsonParams.documents = [];
        const formatDocument = (obj) => {
            jsonParams.documents.push({
                CCUST: obj.CCUST,
                BANDOC: obj.BANDOC,
                DATECI: obj.DATECI,
                TRANCI: obj.TRANCI,
                VALDATE: obj.VALDATE,
                REFER: obj.REFER,
                IDCONT: obj.IDCONT,
                DATEC: obj.DATEC ? obj.DATEC : '',
                TRANC: obj.TIPOCON,
                TEXTD: obj.DATEC ? 'Rechazado' : 'Aceptado'
            });
        };
        me.dataAcc.forEach(formatDocument);
        me.dataRej.forEach(formatDocument);
        return jsonParams;
    },
    onSaveRecord: function (btn) {
        let params = this.formatParams();
        console.log(params);
        Ext.Msg.show(
                {
                    title: '.:PRAXIS:.',
                    msg: 'Are you sure to Save?',
                    buttons: Ext.MessageBox.YESNO,
                    scope: this,
                    animateTarget: btn,
                    icon: Ext.MessageBox.QUESTION,
                    modal: true,
                    fn: function (btn) {
                        if (btn === 'yes') {
                            this.maintenanceAccounting(params);
                        }
                    }
                });
    }
});