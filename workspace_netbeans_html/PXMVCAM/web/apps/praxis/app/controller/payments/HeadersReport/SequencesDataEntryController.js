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
        const seqGrid = Ext.getCmp(prototype.idDEsequence + '-gridSequences');
        const rejGrid = Ext.getCmp(prototype.idDEsequence + '-gridRejections');
        const newFileGrid = Ext.getCmp(prototype.idDEsequence + '-newFileGrid');
        try {
            const res = await global.callStoreGet('PRAXISMP', 'MPS463', {
                'IN_IDCONT': idcont,
                'IN_FILESQ': filesq
            });
            const det = res.lstRs.at(0).at(0);
            me.dataAcc = res.lstRs.at(1);
            me.dataRej = res.lstRs.at(2) || [];
            const newFileDet = res.lstRs.at(3) || [];

            global.cleanPXobj(det);
            form.setValues(det);

            const { STSAP } = det;
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

            let storeFile = new Ext.data.Store({
                data: newFileDet
            });

            seqGrid.setStore(storeSeq);
            rejGrid.setStore(storeRej);
            newFileGrid.setStore(storeFile);
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
        const newFileBox = Ext.getCmp(prototype.idDEsequence + '-newFileBox');
        
        const reverseFile = Ext.getCmp(prototype.idDEsequence + '-btn-rejsuc');
        
        let username = document.getElementById('menuUser').innerText;

        btnRej.hide();
        boxSeq.hide();
        btnCan.hide();
        btnSave.hide();
        btnReject.hide();
        cbkReject.hide();
        newFileBox.hide();
        reverseFile.hide();

        if (stsap === '1') {
            boxSeq.show();
            btnRej.show();
            btnCan.show();
            btnSave.show();
        }
        
        if (stsap === '2') {
            if(username==='MPACHECO' || username==='MPACHECOT' 
                    || username === 'PXAVAPIT' || username === 'AALVAREZT'){
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

    onRejectRec: function (grid, td, rowIndex, cellIndex, e, record, tr, eOpts) {
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
                        const { BANDOC, DATECI, TRANCI, REFER, VALDATE, CODPRO } = record.data;

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
    onCancelClick: function () {
        this.view.close();
    },
    onChangeReference: function (field, newValue) {
        const me = this;
        let upperValue = newValue.toUpperCase();
        field.setValue(upperValue);
        const gridAcc = Ext.getCmp(prototype.idDEsequence + '-gridSequences');

        if (upperValue === '') {
            gridAcc.setStore(new Ext.data.Store({ data: me.dataAcc }));
        } else {
            let newData = me.dataAcc.filter(x => x.REFER.trim().includes(upperValue));
            gridAcc.setStore(new Ext.data.Store({ data: newData }));
        }
    },
    onChangeBandoc: function (field, newValue) {
        const me = this;
        let upperValue = newValue.toUpperCase();
        field.setValue(upperValue);
        const gridAcc = Ext.getCmp(prototype.idDEsequence + '-gridSequences');

        if (upperValue === '') {
            gridAcc.setStore(new Ext.data.Store({ data: me.dataAcc }));
        } else {
            let newData = me.dataAcc.filter(x => x.BANDOC.trim().includes(upperValue));
            gridAcc.setStore(new Ext.data.Store({ data: newData }));
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
    onSaveFile: async function () {
        const me = this;
        Ext.Msg.show(
            {
                title: '.:PRAXIS:.',
                msg: 'Are you sure to save file?',
                buttons: Ext.MessageBox.YESNO,
                scope: this,
                icon: Ext.MessageBox.QUESTION,
                modal: true,
                fn: function (btn) {
                    if (btn === 'yes') {
                        me.callSuccess();
                    }
                }
            });
    },
    onRejectFile: async function () {
        const me = this;
        Ext.Msg.show(
            {
                title: '.:PRAXIS:.',
                msg: 'Are you sure to reject file?',
                buttons: Ext.MessageBox.YESNO,
                scope: this,
                icon: Ext.MessageBox.QUESTION,
                modal: true,
                fn: function (btn) {
                    if (btn === 'yes') {
                        me.callReject();
                    }
                }
            });


    },
    callSuccess: async function () {
        const me = this;
        try {
            const { IDCONT, CORRL } = me.view.obj;
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
    callReject: async function () {
        const me = this;
        const chk = Ext.getCmp(prototype.idDEsequence + '-chk-reject');
        me.view.setLoading(true);
        try {
            const { IDCONT, CORRL } = me.view.obj;
            console.log(me.dataRej);
            const tmp = await global.loadRecordsOnTable('PRAXISMP', 'XTEMPO', me.dataRej);

            let newFile = chk.value ? 'N' : 'Y';
            console.log(newFile);


            const res = await global.callStorePost('PRAXISMP', 'MPS464', {
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
                        backgroundColor: 'white', // Fondo blanco
                        border: '2px solid red', // Marco rojo
                        color: 'red', // Letras rojas
                        fontWeight: 'bold', // Texto en negrita
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
                                //valida referencia
                                if (x.REFER && x.REFER !== '') {
                                    //valida codigo de rechazo
                                    if (x.CODREC && x.CODREC !== '') {
                                        //valida si existe objeto
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
                                            //actualiza data de rechazos
                                            me.dataRej = global.arrayAddUnique(me.dataRej, [obj], ['BANDOC', 'DATECI', 'TRANCI']).data;
                                            //elimina de contabilizados
                                            me.dataAcc.splice(index, 1);
                                            reject++;
                                        } else {
                                            error++;
                                        }
                                    } else {
                                        //valida si es comentario libre
                                        if (x.COMMENT && x.COMMENT !== '') {
                                            //valida si existe objeto
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
                                                //actualiza data de rechazos
                                                me.dataRej = global.arrayAddUnique(me.dataRej, [obj], ['BANDOC', 'DATECI', 'TRANCI']).data;
                                                //elimina de contabilizados
                                                me.dataAcc.splice(index, 1);
                                                reject++;
                                            } else {
                                                error++;
                                            }
                                            reject++;
                                        } else {
                                            error++;
                                        }
                                    }
                                } else {
                                    error++;
                                }
                            });
                            
                            if(me.dataAcc.length===0){
                                Ext.getCmp(prototype.idDEsequence + '-btn-rej-excel').setDisabled(true);
                            }
                            
                            //solo muestra cuando rechazo correctamente
                            if(reject>0){
                                notifier.success(reject + ' documents rejected');
                            }
                            
                            //muestra cuandos rechazos salieron con error
                            if (error > 0) {
                                notifier.warning(error + ' documents not found');
                            }
                            //refresca grillas
                            me.reloadDataGrids();
                            modal.setLoading(false);
                            modal.close();
                        });
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
        });
        newWin.show();
    },
    onRejectSuccess: function(){
        const me = this;
        Ext.Msg.show(
            {
                title: '.:PRAXIS:.',
                msg: 'Are you sure to reject file success?',
                buttons: Ext.MessageBox.YESNO,
                scope: this,
                icon: Ext.MessageBox.QUESTION,
                modal: true,
                fn: function (btn) {
                    if (btn === 'yes') {
                        me.callRejectSuccess();
                    }
                }
            });
    },
    callRejectSuccess: async function(){
        const me = this;
        me.view.setLoading(true);
        try {
            const { IDCONT, CORRL } = me.view.obj;
            const tmp = await global.loadRecordsOnTable('PRAXISMP', 'XTEMPO', me.dataAcc);
            console.log(tmp.cuuid);
            
            const res = await global.callStorePost('PRAXISMP', 'MPS465', {
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