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
//            console.log("res SPHRP002: ", res)
            //const {header, files, bandocs, rejections} = res.lstRs.at(0).at(0);
            const header = res.lstRs.at(0);
            const files = res.lstRs.at(1);
            const bandocs = res.lstRs.at(2);
            const rejections = res.lstRs.at(3);
            const supports = res.lstRs.at(4);
            let info = header.at(0);
            global.cleanPXobj(info);
            mainForm.reset();
            mainForm.setValues(info);
            me.bindData(info, files, bandocs, rejections, supports);
        } catch (e) {
            console.error(e);
            me.view.close();
        } finally {
            me.view.setLoading(false);
        }
    },
    bindData: function (info, files, bandocs, rejections, supports) {
        const me = this;
        const tab2 = Ext.getCmp(prototype.idDEheader + '-tabMain2');
        let sts = ['6', '9', 'L', 'R', 'J'];
        if (sts.includes(info.STCONT)) {
            Ext.getCmp(prototype.idDEheader + '-btn-save').hide();
            Ext.getCmp(prototype.idDEheader + '-btnRejectRec').hide();
            Ext.getCmp(prototype.idDEheader + '-btn-rejectAll').hide();
            Ext.getCmp(prototype.idDEheader + '-btn-rej-excel').hide();
            if (info.STCONT !== 'L') {
                Ext.getCmp(prototype.idDEheader + '-tabAccounted').tab.hide();
                Ext.getCmp(prototype.idDEheader + '-tabRejected').tab.show();
                tab2.setActiveTab(1);
            } else {
                Ext.getCmp(prototype.idDEheader + '-tabAccounted').tab.show();
                Ext.getCmp(prototype.idDEheader + '-tabRejected').tab.hide();
                tab2.setActiveTab(0);
            }
        } else {
            Ext.getCmp(prototype.idDEheader + '-btn-save').show();
            Ext.getCmp(prototype.idDEheader + '-btnRejectRec').show();
            Ext.getCmp(prototype.idDEheader + '-btn-rejectAll').show();
            Ext.getCmp(prototype.idDEheader + '-btn-rej-excel').show();
        }
        me.dataFiles = files;
        me.dataAcc = bandocs;
        me.dataRej = rejections;
        me.supports = supports;
        me.loadStores();
    },
    loadStores: function () {
        const me = this;
        const filesGrid = Ext.getCmp(prototype.idDEheader + '-gridFiles');
        const accountedGrid = Ext.getCmp(prototype.idDEheader + '-gridAccounted');
        const rejectionsGrid = Ext.getCmp(prototype.idDEheader + '-gridRejected');
        const supportsGrid = Ext.getCmp(prototype.idDEheader + '-gridSupports');
        const supportsTab = Ext.getCmp(prototype.idDEheader + '-tabSupports');
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


        if (me.supports.length > 0) {
            let storeSupports = new Ext.data.Store({
                data: me.supports
            });
            supportsGrid.setStore(storeSupports);
            supportsTab.tab.show();
        } else {
            supportsTab.tab.hide();
        }

        me.view.center();
    },
    onCancelClick: function () {
        this.view.close();
    },
    onRejectRec: function (grid, td, rowIndex, cellIndex, e, record, tr, eOpts) {
//        console.log('onRejectRec Header ejecutado', record);
//        console.log('onRejectRec filters', this.view.filters);
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
//                        console.log(me.dataRej);
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
        const me = this;
        let upperValue = newValue.toUpperCase();
        field.setValue(upperValue);
        const gridAcc = Ext.getCmp(prototype.idDEheader + '-gridAccounted');

        if (upperValue === '') {
            gridAcc.setStore(new Ext.data.Store({data: me.dataAcc}));
        } else {
            let newData = me.dataAcc.filter(x => x.REFER.trim() === upperValue);
            gridAcc.setStore(new Ext.data.Store({data: newData}));
        }
    },
    onChangeBandoc: function (field, newValue) {
        const me = this;
        let upperValue = newValue.toUpperCase();
        field.setValue(upperValue);
        const gridAcc = Ext.getCmp(prototype.idDEheader + '-gridAccounted');

        if (upperValue === '') {
            gridAcc.setStore(new Ext.data.Store({data: me.dataAcc}));
        } else {
            let newData = me.dataAcc.filter(x => x.BANDOC.trim() === upperValue);
            gridAcc.setStore(new Ext.data.Store({data: newData}));
        }
    },
    maintenanceAccounting: async function (params) {
        const me = this;
        //me.view.setLoading(true);
        const {idCont, header, status} = params;
//        console.log("PARAMS HEADER:", params);
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
//        console.log(params);
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
    },
    onRejectByExcel: function () {
        const me = this;
        const newWin = Ext.create('Ext.window.Window', {
            title: 'Massive Reject by Excel',
            id: prototype.idDEheader + '-modalExcelReject',
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
                        id: prototype.idDEheader + '-fileRejections',
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
                        const modal = Ext.getCmp(prototype.idDEheader + '-modalExcelReject');
                        modal.setLoading(true);
                        const fileField = Ext.getCmp(prototype.idDEheader + '-fileRejections');
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
                                Ext.getCmp(prototype.idDEheader + '-btn-rej-excel').setDisabled(true);
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
    }
});