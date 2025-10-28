Ext.define('Ext.Praxis.controller.payments.HeadersReport.SequencesDataEntryController', {
extend: 'Ext.app.ViewController',
        alias: 'controller.SequencesDataEntryController',
        url: CONTEXTPATH + '/HeadersReport',
        procesadores: [],
        request: axios.create({
        baseURL: CONTEXTPATH + '/HeadersReport',
                timeout: 0
        }),
        dataSequences: [],
        dataDerived: [],
        dataRejections: [],
        notifier: new AWN(),
        init: function (view) {
        },
        afterRender: async function () {
        this.loadData();
        },
        loadData: async function () {
            const me = this;
            me.view.setLoading(true);
            me.cleanData(); //Limpieza de grillas antes de buscar nueva data

            try {
                const res = await global.callStoreGet('PRAXISMP', 'MPS308', {
                IN_IDCONT: me.view.praxisId,
                IN_MODO: me.view.recordData.MODO,
                IN_CORRL: me.view.recordData.CORRL
                })
                const infoSequences = res.lstRs[0] || [];
                const infoDerived = res.lstRs[1] || [];
                const infoRejections = res.lstRs[2] || [];
                me.bindData(infoSequences, infoDerived, infoRejections);
            } catch (e) {
                console.error(e);
                me.view.close();
            } finally {
                if(me.view)me.view.setLoading(false);
            }
        },
        cleanData: function () {
            const gridSequences = Ext.getCmp(prototype.idDEsequence + '-gridSequences');
            const gridDerived = Ext.getCmp(prototype.idDEsequence + '-gridDerived');
            const gridRejections = Ext.getCmp(prototype.idDEsequence + '-gridRejections');
            Ext.getCmp(prototype.idDEsequence + '-btn-save').hide();
            Ext.getCmp(prototype.idDEsequence + '-btnRejectRec').hide();
            Ext.getCmp(prototype.idDEsequence + '-btn-rejectAll').hide();
            Ext.getCmp(prototype.idDEsequence + '-btn-rej-excel').hide();
            if (gridSequences && gridSequences.getStore()) {
            gridSequences.getStore().removeAll();
            gridSequences.getView().refresh();
            }
            if (gridDerived && gridDerived.getStore()) {
            gridDerived.getStore().removeAll();
            gridDerived.getView().refresh();
            }
            if (gridRejections && gridRejections.getStore()) {
            gridRejections.getStore().removeAll();
            gridRejections.getView().refresh();
            }
        },
        bindData: function (infoSequences, infoDerived, infoRejections) {
            const me = this;
            if (me.view.recordData.STSAP !== '1') {
                Ext.getCmp(prototype.idDEsequence + '-btn-save').hide();
                Ext.getCmp(prototype.idDEsequence + '-btnRejectRec').hide();
                Ext.getCmp(prototype.idDEsequence + '-btn-rejectAll').hide();
                Ext.getCmp(prototype.idDEsequence + '-btn-rej-excel').hide();
            } else {
                Ext.getCmp(prototype.idDEsequence + '-btn-save').show();
                Ext.getCmp(prototype.idDEsequence + '-btnRejectRec').show();
                Ext.getCmp(prototype.idDEsequence + '-btn-rejectAll').show();
                Ext.getCmp(prototype.idDEsequence + '-btn-rej-excel').show();
            }
            me.dataSequences = infoSequences;
            me.dataDerived = infoDerived;
            me.dataRejections = infoRejections;
            me.loadStores();
        },
        loadStores: function () {
        const me = this;
        const mainTabPanel = Ext.getCmp(prototype.idDEsequence + '-tabMainSequences2'); 
        const tabSequences = Ext.getCmp(prototype.idDEsequence + '-tabSequences');
        const tabDerived = Ext.getCmp(prototype.idDEsequence + '-tabDerived');
        const tabRejections = Ext.getCmp(prototype.idDEsequence + '-tabRejections');
        
        // activar o desactivar tabs
        if (me.dataSequences && me.dataSequences.length > 0) tabSequences.setDisabled(false);
        else tabSequences.setDisabled(true);
        if (me.dataDerived && me.dataDerived.length > 0) tabDerived.setDisabled(false);
        else tabDerived.setDisabled(true);
        if (me.dataRejections && me.dataRejections.length > 0) tabRejections.setDisabled(false);
        else tabRejections.setDisabled(true);
        
        // enfocar tab con data
        if (me.dataSequences && me.dataSequences.length > 0){
           if (mainTabPanel && tabSequences) mainTabPanel.setActiveTab(tabSequences); //  Enfocar el tabSequences
        } else if (me.dataDerived && me.dataDerived.length > 0){
           if (mainTabPanel && tabDerived) mainTabPanel.setActiveTab(tabDerived); //  Enfocar el tabDerived
        } else if (me.dataRejections && me.dataRejections.length > 0){
           if (mainTabPanel && tabRejections) mainTabPanel.setActiveTab(tabRejections); //  Enfocar el tabDerived
        } else {
           if (mainTabPanel && tabSequences) mainTabPanel.setActiveTab(tabSequences); //  Enfocar el tabSequences 
        }
      
        // Cargar data en store
        const gridSequences = Ext.getCmp(prototype.idDEsequence + '-gridSequences');
        const gridDerived = Ext.getCmp(prototype.idDEsequence + '-gridDerived');
        const gridRejections = Ext.getCmp(prototype.idDEsequence + '-gridRejections');             
                
            if (gridSequences) {
                const store = Ext.create('Ext.data.Store', {
                fields: [
                        'BANDOC', 'REFER', 'VALDATE', 'CODPRO', 'MONEDA_PAGO', 'MONTO_PAGO',
                        'MONEDA_REVENUE', 'MONTO_REVENUE'
                ],
                data:  me.dataSequences,
                pageSize: 50,
                proxy: {
                        type: 'memory', // Los datos están cargados en memoria
                        enablePaging: true // Habilitar la paginación en memoria
                       }                 
                });
                gridSequences.setStore(store);
                gridSequences.getView().refresh(); // 🔹 fuerza repintado del grid
            };

            if (gridDerived) {
                const store = Ext.create('Ext.data.Store', {
                fields: [
                        'R_SOURCE', 'NEW_PRAXIS_ID', 'NEW_FILENAME', 'NEW_HEADER_ID', 'QTY_SEQUENCES' , 'R_SOURCE'
                ],
                data: me.dataDerived,
                pageSize: 50,
                proxy: {
                        type: 'memory', // Los datos están cargados en memoria
                        enablePaging: true // Habilitar la paginación en memoria
                       }
                });
                
                const field = gridDerived.down('[name=STATUS_ORG]');
                const value = Array.isArray(me.dataDerived) && me.dataDerived.length > 0 ? me.dataDerived[0].STATUS_ORG : '';
                const colorMap = {
                  '1': { text: 'SENT', color: '#459af5' },
                  '2': { text: 'LOADED', color: '#49cc70' },
                  '4': { text: 'TOTAL REJECTED', color: '#e86666' },
                  '5': { text: 'PARTIAL REJECTED', color: '#f7db4a' },
                  'R': { text: 'MANUAL REJECTED', color: '#faae2f' },
                  'L': { text: 'MANUAL LOADED', color: '#77d1cb' }
                };
                const cfg = colorMap[value] || { text: '-', color: '#ccc' };
                field.setValue(cfg.text);
                field.setFieldStyle(`text-align:center;background-color:${cfg.color};color:#000;font-weight:bold;`);
                
                gridDerived.setStore(store);
                gridDerived.getView().refresh(); // 🔹 fuerza repintado del grid
            };

            if (gridRejections) {   
                const store = Ext.create('Ext.data.Store', {
                fields: [
                        'BANDOC', 'REFER', 'VALDATE', 'CODPRO', 'CODREC', 'OBSERV', 'STREJ'
                ],
                data: me.dataRejections,
                pageSize: 50,
                proxy: {
                        type: 'memory', // Los datos están cargados en memoria
                        enablePaging: true // Habilitar la paginación en memoria
                       }
                });
                gridRejections.setStore(store);    
                gridRejections.getView().refresh(); // 🔹 fuerza repintado del grid
            };

        me.view.center();
        },
        onFilterReference: function (field, newValue) {
        const me = this;
                let upperValue = newValue.toUpperCase();
                field.setValue(upperValue);
                const gridSequences = Ext.getCmp(prototype.idDEsequence + '-gridSequences');
                if (upperValue === '') {
        gridSequences.setStore(new Ext.data.Store({data: me.dataSequences}));
        } else {
        let newData = me.dataSequences.filter(x => x.REFER.trim() === upperValue);
                gridSequences.setStore(new Ext.data.Store({data: newData}));
        }
        },
        onFilterBandoc: function (field, newValue) {
        const me = this;
                let upperValue = newValue.toUpperCase();
                field.setValue(upperValue);
                const gridSequences = Ext.getCmp(prototype.idDEsequence + '-gridSequences');
                if (upperValue === '') {
        gridSequences.setStore(new Ext.data.Store({data: me.dataSequences}));
        } else {
        let newData = me.dataSequences.filter(x => x.BANDOC.trim() === upperValue);
                gridSequences.setStore(new Ext.data.Store({data: newData}));
        }
        },
        onRejectAll: function (btn) {
        const me = this;
                let rejFormat = me.dataSequences.map(x => ({
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
                me.dataRejections.push(...rejFormat);
                me.dataSequences = [];
                me.loadStores();
                btn.setDisabled(true);
                
                    // 🔹 Enfocar el tab de rechazos
                const mainTabPanel = Ext.getCmp(prototype.idDEsequence + '-tabMainSequences2'); 
                const tabRejections = Ext.getCmp(prototype.idDEsequence + '-tabRejections');
                if (mainTabPanel && tabRejections) {
                    mainTabPanel.setActiveTab(tabRejections);
                }
        },   
        onRejectRec: function (grid, td, rowIndex, cellIndex, e, record, tr, eOpts) {
//                console.log('onRejectRec ejecutado', record);
//                console.log('onRejectRec filters', this.view.filters);
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
                                                labelStyle: 'font-weight:bold;',
                                                fieldLabel: 'Status',
                                                id: prototype.idDEsequence + '-cmbStatus',
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
                                        let cmbSts = Ext.getCmp(prototype.idDEsequence + '-cmbStatus');
                                        if (!combo.value) {
                                me.notifier.alert('Select an Error Type');
                                        return;
                                }
                                const {BANDOC, DATECI, TRANCI, REFER, VALDATE, CODPRO} = record.data;
//                                        console.log("record", record.data);
//                                        console.log("REFER", REFER);
//                                        console.log("REFER trimEnd", REFER.trimEnd());
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
//                                console.log("comment", comment);
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
//                                        console.log("obj", obj);
                                        me.dataRejections = global.arrayAddUnique(me.dataRejections, [obj], ['BANDOC', 'DATECI', 'TRANCI']).data;
//                                        console.log("dataRejections", me.dataRejections);
//                                        console.log("dataSequences", me.dataSequences);
                                        me.dataSequences = me.dataSequences.filter(x => !(x.BANDOC === BANDOC && x.DATECI === DATECI && x.TRANCI === TRANCI));
//                                        console.log("new dataSequences", me.dataSequences);
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
                                        let obj = me.dataSequences.find(y => y.REFER.trim() === x.REFER);
                                                let codrec = me.view.filters.ERRORES.filter(y => y.TIPO === 'C').find(z => z.CODREC === x.CODREC);
                                                if (obj && codrec) {
                                        let index = me.dataSequences.indexOf(obj);
                                                obj = {
                                                STREJ: 'R',
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
                                                me.dataRejections = global.arrayAddUnique(me.dataRejections, [obj], ['BANDOC', 'DATECI', 'TRANCI']).data;
                                                //elimina de contabilizados
                                                me.dataSequences.splice(index, 1);
                                                reject++;
                                        } else {
                                        error++;
                                        }
                                        } else {
                                        //valida si es comentario libre
                                        if (x.COMMENT && x.COMMENT !== '') {
                                        //valida si existe objeto
                                        let obj = me.dataSequences.find(y => y.REFER.trim() === x.REFER);
                                                if (obj) {
                                        let index = me.dataSequences.indexOf(obj);
                                                obj = {
                                                STREJ: 'R',
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
                                                me.dataRejections = global.arrayAddUnique(me.dataRejections, [obj], ['BANDOC', 'DATECI', 'TRANCI']).data;
                                                //elimina de contabilizados
                                                me.dataSequences.splice(index, 1);
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
                                        if (me.dataSequences.length === 0){
                                Ext.getCmp(prototype.idDEsequence + '-btn-rej-excel').setDisabled(true);
                                }

                                //solo muestra cuando rechazo correctamente
                                if (reject > 0){
                                notifier.success(reject + ' documents rejected');
                                }

                                //muestra cuandos rechazos salieron con error
                                if (error > 0) {
                                notifier.warning(error + ' documents not found');
                                }
                                //refresca grillas
                                me.loadStores();
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
        onCancelClick: function () {
        this.view.close();
        },
        onSaveRecord: function (btn) {
        let params = this.formatParams();
//                 console.log("formatParams: ", params);
                if(params.status == 'A') {
                    Ext.Msg.show(
                    {
                    title: '.:PRAXIS:.',
                    msg: 'There are no new rejections',
                    buttons: Ext.MessageBox.OK,
                    scope: this,
                    animateTarget: btn,
                    icon: Ext.MessageBox.QUESTION,
                    modal: true,
                    });
                } else {
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
                    
        },
        formatParams: function () {
            const me = this;
            let jsonParams = {
                idCont: me.view.praxisId,
                header: me.view.recordData.CORRLAV,
                corrl: me.view.recordData.CORRL
            };
            let status = '';
            if (me.dataRejections.length > 0) {
                jsonParams.rejected = me.dataRejections;
                if (me.dataSequences.length > 0) status = 'P';
                else status = 'T';
            } else {
            status = 'A';
            }
            jsonParams.status = status;
            return jsonParams;
        },
        maintenanceAccounting: async function (params) {
            const me = this;
            const {idCont, header, status} = params;
//            console.log(params);
                const newWin = Ext.create('Ext.Praxis.view.payments.HeadersReportForm.DataEntrys.RejectSequencesDataEntry', {
                    id: prototype.idDEsequence + '-rejectSequences-1',
                    obj: params,
                    reloadForm: () => {me.loadData()}
                });
                newWin.show();
        }  
});