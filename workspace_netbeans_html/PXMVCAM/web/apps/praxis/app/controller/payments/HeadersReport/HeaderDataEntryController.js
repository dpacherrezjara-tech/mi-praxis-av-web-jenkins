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
        const mainForm = Ext.getCmp(prototype.idDEheader + '-mainForm').getForm();
        try {
            /*
             const res = await me.request.get('loadHeaderInfo', {
             
             });*/
            const res = await global.callStoreGet('PRAXISMP', 'SPHRP002', {
                IN_IDCONT: me.view.praxisId
            });
            //const {header, files, bandocs, rejections} = res.lstRs.at(0).at(0);
            const header = res.lstRs.at(0);
            const files = res.lstRs.at(1);
            const bandocs = res.lstRs.at(2);
            const rejections = res.lstRs.at(3);
            let info = header.at(0);
            global.cleanPXobj(info);
            mainForm.reset();
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
        //console.log(info.STCONT);
        let sts = ['6', '9','L','R','J'];
        if (sts.includes(info.STCONT)) {
            Ext.getCmp(prototype.idDEheader + '-btn-save').hide();
            Ext.getCmp(prototype.idDEheader + '-btnRejectRec').hide();
            Ext.getCmp(prototype.idDEheader + '-btn-rejectAll').hide();
        } else {
            Ext.getCmp(prototype.idDEheader + '-btn-save').show();
            Ext.getCmp(prototype.idDEheader + '-btnRejectRec').show();
            Ext.getCmp(prototype.idDEheader + '-btn-rejectAll').show();
        }
        me.dataFiles = files;
        me.dataAcc = bandocs;
        me.dataRej = rejections;
        me.loadStores();
    },
    loadStores: function () {
        const me = this;
        const filesGrid = Ext.getCmp(prototype.idDEheader + '-gridFiles');
        const accountedGrid = Ext.getCmp(prototype.idDEheader + '-gridAccounted');
        const rejectionsGrid = Ext.getCmp(prototype.idDEheader + '-gridRejected');
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
        me.view.center();
    },
    onCancelClick: function () {
        this.view.close();
    },
    onRejectRec: function (grid, td, rowIndex, cellIndex, e, record, tr, eOpts) {
        const me = this;
        const {BANDOC, DATECI, TRANCI, REFER} = record.data;

        const lstErrores = me.view.filters.ERRORES.filter(x => x.TIPO === 'C');
        lstErrores.push({
            CODREC: "RC00000",
            DESCR: "Comentario Libre",
            TIPO: "C"
        });

        Ext.create('Ext.window.Window', {
            title: 'Reject Document',
            width: 650,
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
                        xtype: 'panel',
                        border: false,
                        layout: 'hbox',
                        defaults: {
                            margin: '3 3 3 3'
                        },
                        items: [
                            {
                                xtype: 'combobox',
                                labelStyle: 'font-weight:bold;',
                                fieldLabel: 'Status',
                                id: prototype.idDEheader + '-cmbStatus',
                                store: Ext.create('Ext.data.SimpleStore', {
                                    fields: ['code', 'name'],
                                    data: [
                                        ['R', 'Rejected'],
                                        ['J', 'Justified'],
                                        ['P', 'Re-Process']
                                    ]
                                }),
                                labelWidth: 60,
                                width: 190,
                                displayField: 'name',
                                valueField: 'code',
                                queryMode: 'local',
                                editable: false,
                                value: 'R'
                            },
                            {
                                xtype: 'combobox',
                                id: prototype.idDEheader + '-cmbRejectError',
                                labelStyle: 'font-weight:bold;',
                                fieldLabel: 'Rejection Error',
                                store: lstErrores,
                                labelWidth: 100,
                                width: 380,
                                displayField: 'DESCR',
                                valueField: 'CODREC',
                                queryMode: 'local',
                                editable: false,
                                emptyText: '(Select)',
                                value: '',
                                listeners: {
                                    change: function (btn) {
                                        if (btn.value === "RC00000") {
                                            Ext.getCmp(prototype.idDEheader + '-txtFreeText').show();
                                        } else {
                                            Ext.getCmp(prototype.idDEheader + '-txtFreeText').hide();
                                        }
                                    }
                                }
                            }
                        ]
                    },
                    {
                        xtype: 'textfield',
                        id: prototype.idDEheader + '-txtFreeText',
                        hidden: true,
                        margin:'5 5 5 5',
                        width: 600,
                        labelWidth: 120,
                        labelStyle: 'font-weight:bold;',
                        fieldLabel: 'Comment',
                        maxLenght: 100,
                        enforceMaxLenght: true,
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
                        let combo = Ext.getCmp(prototype.idDEheader + '-cmbRejectError');
                        let cmbSts = Ext.getCmp(prototype.idDEheader + '-cmbStatus');
                        if (!combo.value) {
                            me.notifier.alert('Select Error');
                            return;
                        }
                        const {BANDOC, DATECI, TRANCI, REFER, VALDATE, CODPRO} = record.data;

                        let comment = "";
                        if (combo.value === "RC00000") {
                            comment = Ext.getCmp(prototype.idDEheader + '-txtFreeText').value;
                        } else {
                            comment = me.view.filters.ERRORES.filter(x => x.CODREC === combo.value).at(0).DESCR;
                        }

                        if (comment === "") {
                            me.notifier.warning('Comment not valid.');
                            return;
                        }

                        let obj = {
                            STREJ: cmbSts.value,
                            BANDOC: BANDOC,
                            DATECI: DATECI,
                            TRANCI: TRANCI,
                            REFER: REFER.trimEnd(),
                            VALDATE: VALDATE,
                            CODPRO: CODPRO.trimEnd(),
                            CODREC: combo.value,
                            OBSERV: comment
                        };
                        me.dataRej = global.arrayAddUnique(me.dataRej, [obj], ['BANDOC', 'DATECI', 'TRANCI']).data;
                        console.log(me.dataRej);
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
        const store = Ext.getCmp(prototype.idDEheader + '-gridAccounted').getStore();
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
        const store = Ext.getCmp(prototype.idDEheader + '-gridAccounted').getStore();
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
        //me.view.setLoading(true);
        const {idCont, header, status} = params;
        console.log(params);
        if (status !== 'A') {
            const newWin = Ext.create('Ext.Praxis.view.payments.HeadersReportForm.DataEntrys.RejectHeaderDataEntry', {
                id: prototype.idDEheader + '-rejectHeader-1',
                obj: params,
                reloadForm: () => {
                    me.loadData();
                }
            });
            newWin.show();
        } else {
            me.view.setLoading(true);
            const formData = new FormData();
            let username = document.getElementById('menuUser').textContent;
            let parameters = {
                IN_IDCONT: idCont,
                IN_HEADER: header,
                IN_STATUS: status,
                IN_MAILBODY: '',
                IN_USER: username,
                IN_CUUID: '',
                IN_FUUID: ''
            };
            formData.append('files', []);
            formData.append('params', JSON.stringify(parameters));
            await me.request.post(`/maintenanceHeader`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            me.notifier.info('Updated Successfully');
            me.view.setLoading(false);
            me.loadData();
        }
    },
    formatParams: function () {
        const me = this;
        const params = Ext.getCmp(prototype.idDEheader + '-mainForm').getForm().getValues();
        let jsonParams = {
            idCont: params.IDCONT,
            header: params.FILENAM.trim()
        };

        let status = '';
        if (me.dataRej.length > 0) {
            jsonParams.rejected = me.dataRej;
            if (me.dataAcc.length > 0) {
                status = 'P';
            } else {
                status = 'T';
            }
        } else {
            status = 'A';
        }
        jsonParams.status = status;

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
    },
    onRejectAll: function (btn) {
        const me = this;
        let rejFormat = me.dataAcc.map(x => ({
                BANDOC: x.BANDOC,
                DATECI: x.DATECI,
                TRANCI: x.TRANCI,
                REFER: x.REFER.trimEnd(),
                VALDATE: x.VALDATE,
                CODPRO: x.CODPRO.trimEnd(),
                CODREC: 'RC00000',
                OBSERV: 'Rechazo Total',
                STREJ: 'R'
            }));
        me.dataRej.push(...rejFormat);
        me.dataAcc = [];
        me.loadStores();
        btn.setDisabled(true);
    }
});