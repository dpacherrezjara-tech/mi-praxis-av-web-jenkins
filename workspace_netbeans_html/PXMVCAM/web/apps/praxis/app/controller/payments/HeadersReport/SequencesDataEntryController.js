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
        const { IDCONT, CORRL } = me.view.obj;
        await me.loadDetail(IDCONT, CORRL);
        me.view.setLoading(false);
    },

    loadDetail: async function (idcont, filesq) {
        const me = this;
        me.dataAcc = [];
        me.dataRej = [];

        const form = Ext.getCmp(prototype.idDEsequence + '-interfaceForm').getForm();
        form.reset();

        try {
            // MPS463 primero para conocer el STSAP antes de decidir si cargar MPS578
            const resDet = await global.callStoreGet('PRAXISMP', 'MPS463', { IN_IDCONT: idcont, IN_FILESQ: filesq });
            const det = resDet.lstRs.at(0).at(0);
            const { STSAP } = det;

            const rejectedStatuses = ['3', '4'];
            const [resMPS577, resMPS579, resMPS578] = await Promise.all([
                global.callStoreGet('PRAXISMP', 'MPS577', { IN_IDCONT: idcont, IN_FILESQ: filesq }),
                global.callStoreGet('PRAXISMP', 'MPS579', { IN_IDCONT: idcont, IN_FILESQ: filesq }),
                rejectedStatuses.includes(STSAP)
                    ? global.callStoreGet('PRAXISMP', 'MPS578', { IN_IDCONT: idcont, IN_FILESQ: filesq })
                    : Promise.resolve(null)
            ]);

            me.dataAcc = resMPS577.lstRs.at(0) || [];
            me.dataRej = resMPS578 ? (resMPS578.lstRs.at(0) || []) : [];
            const newFileDet = resMPS579.lstRs.at(0) || [];

            global.cleanPXobj(det);
            form.setValues(det);

            me.changeView(STSAP);

            const receivedFilesGrid = Ext.getCmp(prototype.idDEsequence + '-receivedFilesGrid');
            if (receivedFilesGrid) {
                receivedFilesGrid.getController().reload({ IN_IDCONT: idcont, IN_CORRL: filesq });
            }

            me.reloadDataGrids();

            const newFileSPG = Ext.getCmp(prototype.idDEsequence + '-newFileSPG');
            if (newFileSPG) {
                const ctrl = newFileSPG.getController();
                ctrl.view._allData = newFileDet;
                ctrl._applyMemoryFilter({});
            }

        } catch (error) {
            console.error(error);
        }
    },

    changeView: async function (stsap) {
        const me = this;
        const username = document.getElementById('menuUser').innerText.trim();
        const seqSPG = Ext.getCmp(prototype.idDEsequence + '-seqStoreProcGrid');
        const filterForm = seqSPG ? seqSPG.down('#filterForm') : null;
        const btnRej = Ext.getCmp(prototype.idDEsequence + '-btnRejectRec');
        const btnCan = Ext.getCmp(prototype.idDEsequence + '-btnCancelRec');
        const btnRejectXlsx = Ext.getCmp(prototype.idDEsequence + '-btn-rej-excel');
        const btnRejectAll = Ext.getCmp(prototype.idDEsequence + '-btn-rejectAll');
        const btnSave = Ext.getCmp(prototype.idDEsequence + '-btn-save');
        const btnReject = Ext.getCmp(prototype.idDEsequence + '-btn-reject');
        const cbkReject = Ext.getCmp(prototype.idDEsequence + '-chk-reject');
        const newFileBox = Ext.getCmp(prototype.idDEsequence + '-newFileBox');
        const reverseFile = Ext.getCmp(prototype.idDEsequence + '-btn-rejsuc');

        if (filterForm) filterForm.hide();
        if (btnRej) btnRej.hide();
        if (btnCan) btnCan.hide();
        if (btnRejectXlsx) btnRejectXlsx.hide();
        if (btnRejectAll) btnRejectAll.hide();
        btnSave.hide();
        btnReject.hide();
        cbkReject.hide();
        newFileBox.hide();
        reverseFile.hide();

        if (stsap === '1') {
            if (filterForm) filterForm.show();
            if (btnRej) btnRej.show();
            if (btnCan) btnCan.show();
            if (btnRejectXlsx) btnRejectXlsx.show();
            if (btnRejectAll) btnRejectAll.show();
            btnSave.show();
        }

        if (stsap === '2') {
            const isAdmin = await global.isAdminUserContable(username);
            if (isAdmin) {
                reverseFile.show();
            }
        }

        if (stsap === '4') {
            newFileBox.show();
        }
    },

    reloadGrid: function () {
        Ext.getCmp(prototype.id + '-SequencesGrid').getStore().load();
    },

    reloadDataGrids: function () {
        const me = this;

        const seqSPG = Ext.getCmp(prototype.idDEsequence + '-seqStoreProcGrid');
        if (seqSPG) {
            const ctrl = seqSPG.getController();
            ctrl.view._allData = me.dataAcc;
            ctrl._applyMemoryFilter({});
        }

        const rejSPG = Ext.getCmp(prototype.idDEsequence + '-rejStoreProcGrid');
        if (rejSPG) {
            const ctrl = rejSPG.getController();
            ctrl.view._allData = me.dataRej;
            ctrl._applyMemoryFilter({});
        }

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

    onCancelClick: function () {
        this.view.close();
    },

    onRejectRec: function (record) {
        const me = this;
        const { BANDOC, DATECI, TRANCI, REFER } = record.data;

        const lstErrores = me.view.filters.ERRORES.filter(x => x.TIPO === 'C')
            .map(x => ({ CODREC: x.CODREC, DESCR: `${x.CODREC}-${x.DESCR}` }));
        lstErrores.push({
            CODREC: "RC00000",
            DESCR: "Comentario Libre",
            TIPO: "C"
        });

        Ext.create('Ext.window.Window', {
            title: 'Reject Document',
            width: 650,
            modal: true,
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
                        defaults: { margin: '3 3 3 3' },
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
                        backgroundColor: 'white',
                        border: '2px solid red',
                        color: 'red',
                        fontWeight: 'bold',
                        marginTop: '3px',
                        marginBottom: '3px'
                    },
                    handler: function (btn) {
                        let combo = Ext.getCmp(prototype.idDEsequence + '-cmbRejectError');
                        if (!combo.value) {
                            me.notifier.alert('Select Error');
                            return;
                        }
                        const { BANDOC: bd, DATECI: dc, TRANCI: tc, REFER: rf, VALDATE, CODPRO } = record.data;

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
                            BANDOC: bd,
                            DATECI: dc,
                            TRANCI: tc,
                            REFER: rf.trimEnd(),
                            VALDATE: VALDATE,
                            CODPRO: CODPRO.trimEnd(),
                            CODREC: combo.value,
                            OBSERV: comment
                        };
                        me.dataRej = global.arrayAddUnique(me.dataRej, [obj], ['BANDOC', 'DATECI', 'TRANCI']).data;
                        me.dataAcc = me.dataAcc.filter(x => !(x.BANDOC === bd && x.DATECI === dc && x.TRANCI === tc));
                        me.reloadDataGrids();
                        me.notifier.success(rf + '<br>Successfully Rejected');
                        btn.up('window').close();
                    }
                },
                {
                    text: 'Close',
                    style: { marginTop: '3px', marginBottom: '3px' },
                    handler: function (btn) {
                        btn.up('window').close();
                    }
                }
            ]
        }).show();
    },

    onCancelRejectRec: function (record) {
        const me = this;
        const { BANDOC, DATECI, TRANCI } = record.data;
        me.dataRej = me.dataRej.filter(x => !(x.BANDOC === BANDOC && x.DATECI === DATECI && x.TRANCI === TRANCI));
        me.dataAcc.push(record.data);
        me.reloadDataGrids();
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

    onSaveFile: async function () {
        const me = this;
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Are you sure to save file?',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function (btn) {
                if (btn === 'yes') { me.callSuccess(); }
            }
        });
    },

    onRejectFile: async function () {
        const me = this;
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Are you sure to reject file?',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function (btn) {
                if (btn === 'yes') { me.callReject(); }
            }
        });
    },

    callSuccess: async function () {
        const me = this;
        try {
            const { IDCONT, CORRL } = me.view.obj;
            await global.callStorePost('PRAXISMP', 'MPS458', {
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

    callReject: async function () {
        const me = this;
        const chk = Ext.getCmp(prototype.idDEsequence + '-chk-reject');
        me.view.setLoading(true);
        try {
            const { IDCONT, CORRL } = me.view.obj;
            const tmp = await global.loadRecordsOnTable('PRAXISMP', 'XTEMPO', me.dataRej);
            let newFile = chk.value ? 'N' : 'Y';
            await global.callStorePost('PRAXISMP', 'MPS464', {
                'IN_IDCONT': IDCONT,
                'IN_CORRL': CORRL,
                'IN_CUUID': tmp.cuuid,
                'IN_FUUID': tmp.fuuid,
                'IN_SEND': newFile
            });
            me.notifier.info('Rejected Successfully');
            me.view.setLoading(false);
            me.loadData();
        } catch (e) {
            console.error(e);
            me.notifier.alert('Error on Update.');
            me.view.close();
        }
    },

    onRejectByExcel: function () {
        const me = this;
        const newWin = Ext.create('Ext.window.Window', {
            title: 'Massive Reject by Excel',
            id: prototype.idDEsequence + '-modalExcelReject',
            width: 550,
            modal: true,
            layout: 'fit',
            items: {
                xtype: 'form',
                layout: { type: 'vbox', align: 'center' },
                bodyPadding: 5,
                items: [
                    {
                        xtype: 'filefield',
                        id: prototype.idDEsequence + '-fileRejections',
                        name: 'file',
                        width: '90%',
                        labelWidth: 50,
                        fieldLabel: 'File',
                        buttonText: 'Select File...',
                        allowBlank: false,
                        accept: '.xlsx',
                        multiple: false
                    },
                    {
                        xtype: 'label',
                        width: '100%',
                        html: '<b style="color:#c82d2d;font-size:9px;text-align:right;display:block">Required Layout (*): REFER-CODREC-COMMENT</b>'
                    }
                ]
            },
            buttons: [
                {
                    text: 'Reject',
                    style: {
                        backgroundColor: 'white',
                        border: '2px solid red',
                        color: 'red',
                        fontWeight: 'bold',
                        marginTop: '3px',
                        marginBottom: '3px'
                    },
                    handler: function (btn) {
                        let notifier = new AWN();
                        const modal = Ext.getCmp(prototype.idDEsequence + '-modalExcelReject');
                        modal.setLoading(true);
                        const fileField = Ext.getCmp(prototype.idDEsequence + '-fileRejections');
                        const file = fileField.fileInputEl.dom.files[0];
                        if (!file) {
                            notifier.alert('Error on load File');
                            modal.setLoading(false);
                            return;
                        }

                        global.readExcelFile(file, async (jsonData) => {
                            let reject = 0, error = 0;
                            jsonData.forEach(x => {
                                if (x.REFER && x.REFER !== '') {
                                    if (x.CODREC && x.CODREC !== '') {
                                        let obj = me.dataAcc.find(y => y.REFER.trim() === x.REFER);
                                        let codrec = me.view.filters.ERRORES.filter(y => y.TIPO === 'C').find(z => z.CODREC === x.CODREC);
                                        if (obj && codrec) {
                                            let index = me.dataAcc.indexOf(obj);
                                            obj = {
                                                IDCONT: me.view.obj.IDCONT,
                                                BANDOC: obj.BANDOC,
                                                DATECI: obj.DATECI,
                                                TRANCI: obj.TRANCI,
                                                REFER: obj.REFER.trimEnd(),
                                                VALDATE: obj.VALDATE,
                                                CODPRO: obj.CODPRO.trimEnd(),
                                                CODREC: x.CODREC,
                                                OBSERV: codrec.DESCR
                                            };
                                            me.dataRej = global.arrayAddUnique(me.dataRej, [obj], ['BANDOC', 'DATECI', 'TRANCI']).data;
                                            me.dataAcc.splice(index, 1);
                                            reject++;
                                        } else {
                                            error++;
                                        }
                                    } else {
                                        if (x.COMMENT && x.COMMENT !== '') {
                                            let obj = me.dataAcc.find(y => y.REFER.trim() === x.REFER);
                                            if (obj) {
                                                let index = me.dataAcc.indexOf(obj);
                                                obj = {
                                                    IDCONT: me.view.obj.IDCONT,
                                                    BANDOC: obj.BANDOC,
                                                    DATECI: obj.DATECI,
                                                    TRANCI: obj.TRANCI,
                                                    REFER: obj.REFER.trimEnd(),
                                                    VALDATE: obj.VALDATE,
                                                    CODPRO: obj.CODPRO.trimEnd(),
                                                    CODREC: 'RC00000',
                                                    OBSERV: x.COMMENT
                                                };
                                                me.dataRej = global.arrayAddUnique(me.dataRej, [obj], ['BANDOC', 'DATECI', 'TRANCI']).data;
                                                me.dataAcc.splice(index, 1);
                                                reject++;
                                            } else {
                                                error++;
                                            }
                                        } else {
                                            error++;
                                        }
                                    }
                                } else {
                                    error++;
                                }
                            });

                            if (me.dataAcc.length === 0) {
                                Ext.getCmp(prototype.idDEsequence + '-btn-rej-excel').setDisabled(true);
                            }
                            if (reject > 0) { notifier.success(reject + ' documents rejected'); }
                            if (error > 0) { notifier.warning(error + ' documents not found'); }
                            me.reloadDataGrids();
                            modal.setLoading(false);
                            modal.close();
                        });
                    }
                },
                {
                    text: 'Close',
                    style: { marginTop: '3px', marginBottom: '3px' },
                    handler: function (btn) { btn.up('window').close(); }
                }
            ]
        });
        newWin.show();
    },

    onRejectSuccess: function () {
        const me = this;
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Are you sure to reject file success?',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function (btn) {
                if (btn === 'yes') { me.callRejectSuccess(); }
            }
        });
    },

    callRejectSuccess: async function () {
        const me = this;
        me.view.setLoading(true);
        try {
            const { IDCONT, CORRL } = me.view.obj;
            const tmp = await global.loadRecordsOnTable('PRAXISMP', 'XTEMPO', me.dataAcc);
            await global.callStorePost('PRAXISMP', 'MPS465', {
                'IN_IDCONT': IDCONT,
                'IN_FILESQ': CORRL,
                'IN_CUUID': tmp.cuuid,
                'IN_FUUID': tmp.fuuid
            });
            me.notifier.info('Rejected Successfully');
            me.view.setLoading(false);
            me.loadData();
        } catch (e) {
            console.error(e);
            me.notifier.alert('Error on Update.');
            me.view.close();
        }
    }
});
