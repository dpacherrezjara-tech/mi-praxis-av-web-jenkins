Ext.define('Ext.Praxis.controller.payments.HeadersReport.SequencesDataEntryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.SequencesDataEntryController',
    dataAcc: [],
    dataRej: [],
    notifier: new AWN(),
    priKey: {},
    init: function (view) {
    },
    afterRender: async function () {
        this.loadData();
    },
    loadData: async function () {
        const me = this;
        me.view.setLoading(true);

        console.log(me.view.obj);

        const {IDCONT, CORRL} = me.view.obj;

        await me.loadDetail(IDCONT, CORRL);

        me.view.setLoading(false);
    },
    loadDetail: async function (idcont, filesq) {
        const me = this;
        me.dataAcc = [];
        me.dataRej = [];

        const form = Ext.getCmp(prototype.idDEsequence + '-interfaceForm').getForm();
        const seqGrid = Ext.getCmp(prototype.idDEsequence + '-gridSequences');
        const rejGrid = Ext.getCmp(prototype.idDEsequence + '-gridRejections');
        try {
            const res = await global.callStoreGet('PRAXISMP', 'MPS463', {
                'IN_IDCONT': idcont,
                'IN_FILESQ': filesq
            });
            const det = res.lstRs.at(0).at(0);
            me.dataAcc = res.lstRs.at(1);
            me.dataRej = res.lstRs.at(2) || [];

            global.cleanPXobj(det);
            form.setValues(det);

            const {STSAP} = det;
            me.changeView(STSAP);

            let storeSeq = new Ext.data.Store({
                pageSize: 20,
                data: me.dataAcc,
                proxy: {
                    type: 'memory', // Los datos están cargados en memoria
                    enablePaging: true // Habilitar la paginación en memoria
                }
            });

            let storeRej = new Ext.data.Store({
                pageSize: 20,
                data: me.dataRej,
                proxy: {
                    type: 'memory', // Los datos están cargados en memoria
                    enablePaging: true // Habilitar la paginación en memoria
                }
            });

            seqGrid.setStore(storeSeq);
            rejGrid.setStore(storeRej);
        } catch (error) {
            console.error(error);
        }
    },
    changeView: function (stsap) {
        const boxSeq = Ext.getCmp(prototype.idDEsequence + '-boxSequences');
        const btnRej = Ext.getCmp(prototype.idDEsequence + '-btnRejectRec');
        const btnCan = Ext.getCmp(prototype.idDEsequence + '-btnCancelRec');
        const btnSave = Ext.getCmp(prototype.idDEsequence + '-btn-save');
        const btnReject = Ext.getCmp(prototype.idDEsequence + '-btn-reject');
        const cbkReject = Ext.getCmp(prototype.idDEsequence + '-chk-reject');

        btnRej.hide();
        boxSeq.hide();
        btnCan.hide();
        btnSave.hide();
        btnReject.hide();
        cbkReject.hide();

        if (stsap === '1') {
            boxSeq.show();
            btnRej.show();
            btnCan.show();
            btnSave.show();
        }
    },
    reloadGrid: function () {
        Ext.getCmp(prototype.id + '-SequencesGrid').getStore().load();
    },

    onRejectRec: function (grid, td, rowIndex, cellIndex, e, record, tr, eOpts) {
        const me = this;
        const {BANDOC, DATECI, TRANCI, REFER} = record.data;

        const lstErrores = me.view.filters.ERRORES.filter(x => x.TIPO === 'C')
                .map(x => ({CODREC: x.CODREC, DESCR: `${x.CODREC}-${x.DESCR}`}));
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
                                id: prototype.idDEsequence + '-cmbRejectError',
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
                                            Ext.getCmp(prototype.idDEsequence + '-txtFreeText').show();
                                        } else {
                                            Ext.getCmp(prototype.idDEsequence + '-txtFreeText').hide();
                                        }
                                    }
                                }
                            }
                        ]
                    },
                    {
                        xtype: 'textfield',
                        id: prototype.idDEsequence + '-txtFreeText',
                        hidden: true,
                        margin: '5 5 5 5',
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
                        let combo = Ext.getCmp(prototype.idDEsequence + '-cmbRejectError');
                        if (!combo.value) {
                            me.notifier.alert('Select Error');
                            return;
                        }
                        const {BANDOC, DATECI, TRANCI, REFER, VALDATE, CODPRO} = record.data;

                        let comment = "";
                        if (combo.value === "RC00000") {
                            comment = Ext.getCmp(prototype.idDEsequence + '-txtFreeText').value;
                        } else {
                            comment = me.view.filters.ERRORES.filter(x => x.CODREC === combo.value).at(0).DESCR;
                        }

                        if (comment === "") {
                            me.notifier.warning('Comment not valid.');
                            return;
                        }

                        let obj = {
                            IDCONT: me.view.obj.IDCONT,
                            BANDOC: BANDOC,
                            DATECI: DATECI,
                            TRANCI: TRANCI,
                            REFER: REFER.trimEnd(),
                            VALDATE: VALDATE,
                            CODPRO: CODPRO.trimEnd(),
                            CODREC: combo.value,
                            OBSERV: comment
                        };
                        console.log(me.dataRej);
                        me.dataRej = global.arrayAddUnique(me.dataRej, [obj], ['BANDOC', 'DATECI', 'TRANCI']).data;
                        me.dataAcc = me.dataAcc.filter(x => !(x.BANDOC === BANDOC && x.DATECI === DATECI && x.TRANCI === TRANCI));
                        me.reloadDataGrids();
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
    reloadDataGrids: function () {
        const me = this;
        Ext.getCmp(prototype.idDEsequence + '-gridRejections').setStore(new Ext.data.Store({
            pageSize: 20,
            data: me.dataRej,
            proxy: {
                type: 'memory', // Los datos están cargados en memoria
                enablePaging: true // Habilitar la paginación en memoria
            }
        }));
        Ext.getCmp(prototype.idDEsequence + '-gridSequences').setStore(new Ext.data.Store({
            pageSize: 20,
            data: me.dataAcc,
            proxy: {
                type: 'memory', // Los datos están cargados en memoria
                enablePaging: true // Habilitar la paginación en memoria
            }
        }));

        if (me.dataRej.length > 0) {
            Ext.getCmp(prototype.idDEsequence + '-btn-reject').show();
            Ext.getCmp(prototype.idDEsequence + '-btn-save').hide();
            Ext.getCmp(prototype.idDEsequence + '-chk-reject').show();
        } else {
            Ext.getCmp(prototype.idDEsequence + '-btn-reject').hide();
            Ext.getCmp(prototype.idDEsequence + '-btn-save').show();
            Ext.getCmp(prototype.idDEsequence + '-chk-reject').hide();
        }
    },
    onSaveFile: async function () {
        const me = this;
        try {
            const {IDCONT, CORRL} = me.view.obj;
            const res = await global.callStorePost('PRAXISMP', 'MPS458', {
                'IN_IDCONT': IDCONT,
                'IN_CORRL': CORRL
            });

            me.notifier.info('Updated Successfully');

            me.loadData();
        } catch (e) {
            console.error(e);
            me.notifier.alert('Error on Update.');
            me.view.close();
        }

    },
    onCancelClick: function () {
        this.view.close();
    },
    onChangeReference: function (field, newValue) {
        const me = this;
        let upperValue = newValue.toUpperCase();
        field.setValue(upperValue);
        const gridAcc = Ext.getCmp(prototype.idDEsequence + '-gridSequences');

        if (upperValue === '') {
            gridAcc.setStore(new Ext.data.Store({data: me.dataAcc}));
        } else {
            let newData = me.dataAcc.filter(x => x.REFER.trim().includes(upperValue));
            gridAcc.setStore(new Ext.data.Store({data: newData}));
        }
    },
    onChangeBandoc: function (field, newValue) {
        const me = this;
        let upperValue = newValue.toUpperCase();
        field.setValue(upperValue);
        const gridAcc = Ext.getCmp(prototype.idDEsequence + '-gridSequences');

        if (upperValue === '') {
            gridAcc.setStore(new Ext.data.Store({data: me.dataAcc}));
        } else {
            let newData = me.dataAcc.filter(x => x.BANDOC.trim().includes(upperValue));
            gridAcc.setStore(new Ext.data.Store({data: newData}));
        }
    },
    onRejectAll: function (btn) {
        const me = this;
        let rejFormat = me.dataAcc.map(x => ({
                IDCONT: me.view.obj.IDCONT,
                BANDOC: x.BANDOC,
                DATECI: x.DATECI,
                TRANCI: x.TRANCI,
                REFER: x.REFER.trimEnd(),
                VALDATE: x.VALDATE,
                CODPRO: x.CODPRO.trimEnd(),
                CODREC: 'RC00000',
                OBSERV: 'Rechazo Total'
            }));
        me.dataRej.push(...rejFormat);
        me.dataAcc = [];
        me.reloadDataGrids();
        btn.setDisabled(true);
    },
    onRejectFile: async function () {
        const me = this;
        const chk = Ext.getCmp(prototype.idDEsequence + '-chk-reject');
        try {
            const {IDCONT, CORRL} = me.view.obj;
            console.log(me.dataRej);
            const tmp = await global.loadRecordsOnTable('PRAXISMP', 'XTEMPO', me.dataRej);
            
            let newFile = chk.value ? 'N' : 'Y';
            console.log(newFile);

            
            const res = await global.callStorePost('PRAXISMP', 'MPS464', {
                'IN_IDCONT': IDCONT,
                'IN_CORRL': CORRL,
                'IN_CUUID':tmp.cuuid,
                'IN_FUUID':tmp.fuuid,
                'IN_SEND': newFile
            });

            /*
             const res = await global.callStorePost('PRAXISMP', 'MPS458', {
             'IN_IDCONT': IDCONT,
             'IN_CORRL': CORRL
             });
             */
             me.notifier.info('Rejected Successfully');
             
             me.loadData();
        } catch (e) {
            console.error(e);
            me.notifier.alert('Error on Update.');
            me.view.close();
        }
    }
});