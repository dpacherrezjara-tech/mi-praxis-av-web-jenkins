/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.payments.LoadSalesConciliation.LoadSalesConciliationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.LoadSalesConciliationController',
    fecha: new Date(),
    childs: '5',
    bean: '',
    paginActual: '',
    drillDown: [],
    lstCountry: [],
    lstBank: [],
    gridActual: '',
    panelActual: '',
    fileName: '',
    me: '',
    searchParams: {},
    paramsDetail: {},
    dataObtain: {},
    paramsObtainData: {},
    init: function (view) {
        me = this;
        prototype.id = 'LoadSalesConciliationForm';
        prototype.url = CONTEXTPATH + '/LoadSalesConciliation';
        this.childs = Ext.getCmp(prototype.id + '-panelMain').items.items;
        me.panelActual = '-panelGridData';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        this.control({
//            //   -------------------Eventos Genericos --------------------
            '#LoadSalesConciliationForm-xpanel': {
                afterrender: this.xpanel_afterrender
            },
            '#LoadSalesConciliationForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#LoadSalesConciliationForm-btnClear': {
                click: this.btnClear_click
            },
            '#LoadSalesConciliationForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#LoadSalesConciliationForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#LoadSalesConciliationForm-btnAdd': {
                click: this.btnAdd_click
            },
            '#LoadSalesConciliationForm-btnBack': {
                click: this.btnBack_click
            },
            '#LoadSalesConciliationForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#LoadSalesConciliationForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#LoadSalesConciliationForm-btn-pag-next': {
                click: this.pagNext
            },
            '#LoadSalesConciliationForm-btn-pag-last': {
                click: this.pagLast
            },
            '#LoadSalesConciliationForm-de-txtADJUNTAR': {
                change: this.btnAdjuntar
            }
//            //-----------------Eventos Especificos -------------------    
//
//
        });
    },
    xpanel_afterrender: function (obj, e) {
        console.log('XDXDXDDXDXD');
        this.setStoreData();
        
        $('#LoadSalesConciliationForm-btnToggleSwitch').change(function () {
            me.procesador();
        });
        
    },
    procesador: function () {
        let cmbCorep = Ext.getCmp(prototype.id + '-cmbCOREP');
        let cmbCountry = Ext.getCmp(prototype.id + '-cmbCountry');
        if (!cmbCorep.isVisible()) {
            Ext.getCmp(prototype.id + '-cmbCOREP').show();
            Ext.getCmp(prototype.id + '-cmbCountry').hide();
        } else {
            Ext.getCmp(prototype.id + '-cmbCountry').show();
            Ext.getCmp(prototype.id + '-cmbCOREP').hide();
        }
    },
    eventKey: function (e, eOpts) {
        if (eOpts.getKey() === 13) {
            this.btnSearch_click();
        }
    },
    onUpperValue: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    setStoreData: function () {
        var month = this.fecha.getMonth() + 1;
        if (month < 10) {
            month = '0' + month;
        }
        var mes = Ext.String.leftPad(this.fecha.getMonth() + 1, 2, '0');

        Ext.getCmp(prototype.id + '-cmbYear').bindStore(win.getStoreYear(false));
//        Ext.getCmp(prototype.id + '-cmbMonth').bindStore(win.getStoreMonth(true));
        Ext.getCmp(prototype.id + '-cmbYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbMonth').setValue(mes);


        this.paramsObtainData.COUNTRY = 2;
        this.paramsObtainData.COREP = 2;
        this.paramsObtainData.USERPERMIS = 2;
        this.paramsObtainData.NPROG = sessionStorage.getItem('nprog');
        console.log(this.paramsObtainData, 'this.paramsObtainData')
        Ext.Ajax.request({
            url: prototype.urlMaster + '/obtainData',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getBody().mask('Loading...'),
            params: {
                beanString: JSON.stringify(this.paramsObtainData)
            },
            success: function (response, options) {
                Ext.getBody().unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);
                console.log(res, 'resresres')
                me.lstCountry = res.lstCountry;
                var storeData3 = Ext.create('Ext.data.Store', {
                    data: me.lstCountry,
                    autoLoad: true
                });
                
                var storeDataProcessor = Ext.create('Ext.data.Store', {
                    data: res.lstProcessor,
                    autoLoad: true
                });
                
                if (res.userPermis.PERMM === 'Y') {
                    Ext.getCmp(prototype.id + '-btnQuery').show();
                } else {
                    Ext.getCmp(prototype.id + '-btnQuery').hide();
                }
                Ext.getCmp(prototype.id + '-cmbCountry').bindStore(storeData3);
                Ext.getCmp(prototype.id + '-cmbCountry').setValue('CO');
                Ext.getCmp(prototype.id + '-cmbCOREP').bindStore(storeDataProcessor);
                Ext.getCmp(prototype.id + '-cmbCOREP').setValue('CO');
                global.clear();

            }
        });
    },
    onMonthlyReconciliation: function () {

        if (Ext.getCmp(prototype.id + '-panelGridData2').isVisible()) {
            me.panelActual = '-panelGridData';
            global.selectedChild(me.childs, prototype.id + me.panelActual);
        } else {
            me.panelActual = '-panelGridData2';
            global.selectedChild(me.childs, prototype.id + me.panelActual);
        }
    },
    obtainData: function () {

    },
    onSelectFileEvent: function () {
        console.log('WADAFAFAFAFAFA');

    },
    cargarPlanilla: function () {
        var me = this;
        let beanValidation = {}

        beanValidation.IN_CONTAB = Ext.getCmp(prototype.id + '-chkCONTAB').getValue()

        let beanString = JSON.stringify(beanValidation);
        var file = Ext.getCmp(prototype.id + '-file').getValue();
        if (file === '') {
            Ext.MessageBox.alert('PRAXIS', "::: Select only one file. Please :::", function (btn, text) {
                if (btn === 'ok' || btn === 'cancel')
                    setTimeout("Ext.getCmp(prototype.id + '-File').focus();", 100);
            });
            return;
        }
        var form = Ext.getCmp(prototype.id + '-form-01').getForm();
        form.submit({
            url: prototype.url + '/loadExcelFile',
            waitMsg: 'Uploading your sure to upload the file...',
            params: {fileName: file, beanString: beanString},
            success: function (fp, o) {
                var res = Ext.decode(o.response.responseText);
                console.log(res);

                if (res.success) {
                    let objResult = res.objResult;
                    Ext.getCmp(prototype.id + '-panelGridData').unmask()
                    Ext.getCmp(prototype.id + '-de-txtQTYREC').setValue(objResult.QTYREC)
                    Ext.getCmp(prototype.id + '-de-txtQTYUPL').setValue(objResult.QTYUPL)
                    Ext.getCmp(prototype.id + '-de-txtQTYNOTUPL').setValue(objResult.QTYNOTUPL)
                    Ext.getCmp(prototype.id + '-de-txtUSCR').setValue(objResult.USCR)
                    Ext.getCmp(prototype.id + '-de-txtPRDA').setValue(objResult.FECR)
                    Ext.getCmp(prototype.id + '-de-txtTRANL').setValue(objResult.TRANL)
                    Ext.getCmp(prototype.id + '-btn-process').show()
                    Ext.getCmp(prototype.id + '-chkCONTAB').show()
                    Ext.getCmp(prototype.id + '-lblCONTAB').show()
                    Ext.getCmp(prototype.id + '-btn-upload').setDisabled(true)
                    Ext.getCmp(prototype.id + '-rbgFlag').setDisabled(true)
                    Ext.getCmp(prototype.id + '-file').setDisabled(true)

                    global.Msg({msg: objResult.MESSAGE});
                    console.log(objResult.MESSAGE, 'objResult.MESSAGE')

                } else {
                    global.Msg({msg: "Error Excel Load"});
                }

            },
            failure: function (response, opts) {
                console.log('server-side failure with status code ' + response.status);
            }
        });
    },
    cargarPlanillaOperativa: function () {
        let beanValidation = {}
        let beanString = JSON.stringify(beanValidation);
        var file = Ext.getCmp(prototype.id + '-file').getValue();
        if (file === '') {
            Ext.MessageBox.alert('PRAXIS', "::: Select only one file. Please :::", function (btn, text) {
                if (btn === 'ok' || btn === 'cancel')
                    setTimeout("Ext.getCmp(prototype.id + '-File').focus();", 100);
            });
            return;
        }
        var form = Ext.getCmp(prototype.id + '-form-01').getForm();
        form.submit({
            url: prototype.url + '/loadExcelFilePWP',
            waitMsg: 'Uploading your sure to upload the file...',
            params: {fileName: file, beanString: beanString},
            success: function (fp, o) {
                var res = Ext.decode(o.response.responseText);
                console.log(res);

                if (res.success) {
                    let objResult = res.objResult;
                    Ext.getCmp(prototype.id + '-panelGridData').unmask()
                    Ext.getCmp(prototype.id + '-de-txtQTYREC').setValue(objResult.QTYREC)
                    Ext.getCmp(prototype.id + '-de-txtQTYUPL').setValue(objResult.QTYUPL)
                    Ext.getCmp(prototype.id + '-de-txtQTYNOTUPL').setValue(objResult.QTYNOTUPL)
                    Ext.getCmp(prototype.id + '-de-txtUSCR').setValue(objResult.USCR)
                    Ext.getCmp(prototype.id + '-de-txtPRDA').setValue(objResult.FECR)
                    Ext.getCmp(prototype.id + '-de-txtTRANL').setValue(objResult.TRANL)
                    Ext.getCmp(prototype.id + '-btn-process').show()
                    Ext.getCmp(prototype.id + '-btn-upload').setDisabled(true)
                    Ext.getCmp(prototype.id + '-rbgFlag').setDisabled(true)
                    Ext.getCmp(prototype.id + '-file').setDisabled(true)

                    global.Msg({msg: objResult.MESSAGE});
                    console.log(objResult.MESSAGE, 'objResult.MESSAGE')

                } else {
                    global.Msg({msg: "Error Excel Load"});
                }

            },
            failure: function (response, opts) {
                console.log('server-side failure with status code ' + response.status);
            }
        });
    },
    onFileLoad: function () {

        let fileType = Ext.getCmp(prototype.id + '-rbgFlag').getValue().rb
        if (fileType === '1') {
            this.cargarPlanilla();
        } else {
            this.cargarPlanillaOperativa();
        }
    },
    procesarPlanillaOperativa: function (){
        let beanProcess = {}
        beanProcess.IN_PRDA = Ext.getCmp(prototype.id + '-de-txtPRDA').getValue()
        beanProcess.IN_USCR = Ext.getCmp(prototype.id + '-de-txtUSCR').getValue()
        beanProcess.IN_TRANL = parseInt(Ext.getCmp(prototype.id + '-de-txtTRANL').getValue())
        beanProcess.IN_CERROR = '57';
        beanProcess.IN_STCON = '1';
        let beanString = JSON.stringify(beanProcess);
        Ext.Ajax.request({
            url: prototype.url + '/updateRecordsOperational',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getCmp(prototype.id + '-panelGridData').mask('Loading...'),
            params: {beanString: beanString},

            success: function (response) {
                var res = Ext.decode(response.responseText);
                console.log(res);
                if (res.success) {

                    let objResult = res.result;
                    Ext.getCmp(prototype.id + '-panelGridData').unmask()
                    Ext.getCmp(prototype.id + '-de-txtQTY').setValue(objResult.QTY)
                    Ext.getCmp(prototype.id + '-de-txtQTYPROCUP').setValue(objResult.QTYPROCUP)
                    Ext.getCmp(prototype.id + '-de-txtQTYNPROCUP').setValue(objResult.QTYNPROCUP)
                    Ext.getCmp(prototype.id + '-btn-process').setDisabled(true)
                    global.Msg({msg: objResult.MESSAGE});
                    //                    console.log(objResult.MESSAGE, 'objResult.MESSAGE')

                } else {
                    global.Msg({msg: "Error Processed "});
                }
            },
            failure: function (response) {
                Ext.getCmp(prototype.id + '-panelGridData').unmask()
                console.log('server-side failure with status code ' + response.status);
            }
        });
    },
    procesarPlanilla: function (){
        let beanProcess = {}
        beanProcess.IN_PRDA = Ext.getCmp(prototype.id + '-de-txtPRDA').getValue()
        beanProcess.IN_USCR = Ext.getCmp(prototype.id + '-de-txtUSCR').getValue()
        beanProcess.IN_TRANL = parseInt(Ext.getCmp(prototype.id + '-de-txtTRANL').getValue())
        beanProcess.IN_CERROR = Ext.getCmp(prototype.id + '-chkCONTAB').getValue() ? '46' : '45'
        beanProcess.IN_STCON = Ext.getCmp(prototype.id + '-chkCONTAB').getValue() ? '1' : '2'
        let msgCONTAB = Ext.getCmp(prototype.id + '-chkCONTAB').getValue() ? 'Generate with accounting?' : 'Generate without accounting?'
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: msgCONTAB,
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function (btn) {
                if (btn === 'yes') {
                    let beanString = JSON.stringify(beanProcess);
                    console.log(beanProcess, 'beanProcess')
                    console.log(beanString, 'beanString')
                    Ext.Ajax.request({
                        url: prototype.url + '/updateRecords',
                        method: 'POST',
                        timeout: 60000000,
                        beforerequest: Ext.getCmp(prototype.id + '-panelGridData').mask('Loading...'),
                        params: {beanString: beanString},

                        success: function (response) {
                            var res = Ext.decode(response.responseText);
                            console.log(res);
                            if (res.success) {

                                let objResult = res.result;
                                Ext.getCmp(prototype.id + '-panelGridData').unmask()
                                console.log(objResult, 'objResult')
                                Ext.getCmp(prototype.id + '-de-txtQTY').setValue(objResult.QTY)
                                Ext.getCmp(prototype.id + '-de-txtQTYPROCUP').setValue(objResult.QTYPROCUP)
                                Ext.getCmp(prototype.id + '-de-txtQTYNPROCUP').setValue(objResult.QTYNPROCUP)
                                Ext.getCmp(prototype.id + '-btn-process').setDisabled(true)
                                global.Msg({msg: objResult.MESSAGE});
                                //                    console.log(objResult.MESSAGE, 'objResult.MESSAGE')

                            } else {
                                global.Msg({msg: "Error Processed "});
                            }
                        },
                        failure: function (response) {
                            Ext.getCmp(prototype.id + '-panelGridData').unmask()
                            console.log('server-side failure with status code ' + response.status);
                        }
                    });
                }
            }
        });
    },
    onProcess: function () {
        let fileType = Ext.getCmp(prototype.id + '-rbgFlag').getValue().rb
        if (fileType === '1') {
            this.procesarPlanilla();
        } else {
            this.procesarPlanillaOperativa();
        }
    },
    onReconciliationMonth: function () {
        let beanReconciliation = {}
        
        let cmbCorep = Ext.getCmp(prototype.id + '-cmbCOREP');
        if (cmbCorep.isVisible()) {
            
            beanReconciliation.IN_COREP = Ext.getCmp(prototype.id + '-cmbCOREP').getValue();
            beanReconciliation.IN_SCOUNTRY = '';
            
            if (beanReconciliation.IN_COREP === '') {
                global.Msg({msg: "Complete Processor"});
                return false;
            }
            
        } else {
            
            beanReconciliation.IN_SCOUNTRY = Ext.getCmp(prototype.id + '-cmbCountry').getValue();
            beanReconciliation.IN_COREP = '';
            
            if (beanReconciliation.IN_SCOUNTRY === '') {
                global.Msg({msg: "Complete country"});
                return false;
            }
            
        }
        
        beanReconciliation.IN_SDATE = Ext.getCmp(prototype.id + '-cmbYear').getValue() + Ext.getCmp(prototype.id + '-cmbMonth').getValue()
        if (beanReconciliation.IN_SDATE.length !== 6) {
            global.Msg({msg: "Complete date"});
            return false;
        }
        
        console.log(beanReconciliation,'beanReconciliation')
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Monthly reconciliation?',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function (btn) {
                if (btn === 'yes') {
                    let beanString = JSON.stringify(beanReconciliation);

                    Ext.Ajax.request({
                        url: prototype.url + '/monthReconciliation',
                        method: 'POST',
                        timeout: 60000000,
                        beforerequest: Ext.getCmp(prototype.id + '-panelGridData2').mask('Loading...'),
                        params: {beanString: beanString},

                        success: function (response) {
                            var res = Ext.decode(response.responseText);
                            console.log(res);
                            if (res.success) {

                                let objResult = res.result;
                                Ext.getCmp(prototype.id + '-panelGridData2').unmask()
                                console.log(objResult, 'objResult')
                                Ext.getCmp(prototype.id + '-de-txtQTYREC2').setValue(objResult.QTYRECORDS)
                                Ext.getCmp(prototype.id + '-de-txtQTYUPL2').setValue(objResult.QTYRECORDS)
                                Ext.getCmp(prototype.id + '-de-txtQTYNOTUPL2').setValue(0)
                                Ext.getCmp(prototype.id + '-de-txtUSCR2').setValue(objResult.USCR)
                                Ext.getCmp(prototype.id + '-de-txtPRDA2').setValue(objResult.FECR)
                                Ext.getCmp(prototype.id + '-de-txtTRANL2').setValue(objResult.TRANL)
                                Ext.getCmp(prototype.id + '-btn-reconciliation').setDisabled(true)


                            } else {
                                global.Msg({msg: "Error Processed "});
                            }
                        },
                        failure: function (response) {
                            Ext.getCmp(prototype.id + '-panelGridData2').unmask()
                            console.log('server-side failure with status code ' + response.status);
                        }
                    });
                }
            }
        });
    },
    btnClear_click: function (obj, e) {
        Ext.getCmp(prototype.id + '-de-txtQTYREC').setValue('')
        Ext.getCmp(prototype.id + '-de-txtQTYUPL').setValue('')
        Ext.getCmp(prototype.id + '-de-txtQTYNOTUPL').setValue('')
        Ext.getCmp(prototype.id + '-de-txtUSCR').setValue('')
        Ext.getCmp(prototype.id + '-de-txtPRDA').setValue('')
        Ext.getCmp(prototype.id + '-de-txtTRANL').setValue('')
        Ext.getCmp(prototype.id + '-de-txtQTY').setValue('')
        Ext.getCmp(prototype.id + '-de-txtQTYPROCUP').setValue('')
        Ext.getCmp(prototype.id + '-de-txtQTYNPROCUP').setValue('')

        Ext.getCmp(prototype.id + '-de-txtQTYREC2').setValue('')
        Ext.getCmp(prototype.id + '-de-txtQTYUPL2').setValue('')
        Ext.getCmp(prototype.id + '-de-txtQTYNOTUPL2').setValue('')
        Ext.getCmp(prototype.id + '-de-txtUSCR2').setValue('')
        Ext.getCmp(prototype.id + '-de-txtPRDA2').setValue('')
        Ext.getCmp(prototype.id + '-de-txtTRANL2').setValue('')

        Ext.getCmp(prototype.id + '-btn-process').setDisabled(false)
        Ext.getCmp(prototype.id + '-btn-process').hide()
        Ext.getCmp(prototype.id + '-chkCONTAB').hide()
        Ext.getCmp(prototype.id + '-lblCONTAB').hide()
        Ext.getCmp(prototype.id + '-btn-upload').setDisabled(false)
        Ext.getCmp(prototype.id + '-rbgFlag').setDisabled(false)
        Ext.getCmp(prototype.id + '-btn-reconciliation').setDisabled(false)
        Ext.getCmp(prototype.id + '-file').setDisabled(false)
        Ext.getCmp(prototype.id + '-file').reset();

    },
    btnSearch_click: function (obj, e) {

        Ext.getCmp(prototype.id + '-de-txtBANDOC').setDisabled(true)
        if (Ext.getCmp(prototype.id + '-de-txtBANDOC').getValue() == '' || Ext.getCmp(prototype.id + '-de-txtBANDOC').getValue() == undefined) {
            Ext.getCmp(prototype.id + '-de-txtBANDOC').setDisabled(false)
            global.Msg({msg: "Enter the SAP document"});
            return false
        }
        let beanSearch = {}
        beanSearch.IN_BANDOC = Ext.getCmp(prototype.id + '-de-txtBANDOC').getValue()
        beanSearch.IN_TDOC = 'D'
        beanSearch.IN_SOCIETY = 'AV01'
        let beanString = JSON.stringify(beanSearch);
        Ext.Ajax.request({
            url: prototype.url + '/searchBandoc',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: beanString},
            success: function (response, options) {

                var res = Ext.JSON.decode(response.responseText);

                if (res.result.BANDOC == '') {
                    global.Msg({msg: "SAP Document not fund "});
                    Ext.getCmp(prototype.id + '-de-txtBANDOC').setDisabled(false)
                } else {
                    let formateadoNeto = me.formatNumberWithCommas_double(res.result.NETO)
                    console.log(formateadoNeto, 'formateadoNeto')
                    Ext.getCmp(prototype.id + '-de-txtCODEBANK').setValue(res.result.CODEBANK)
                    Ext.getCmp(prototype.id + '-de-txtADATE').setValue(res.result.ADATE)
                    Ext.getCmp(prototype.id + '-de-txtSCURRENCY').setValue(res.result.SCURRENCY)
                    Ext.getCmp(prototype.id + '-de-txtAMOUNT').setValue(formateadoNeto)
                    Ext.getCmp(prototype.id + '-de-txtMERCHANT').setValue(res.result.MERCHNC)
                    Ext.getCmp(prototype.id + '-de-txtSCOUNTRY').setValue(res.result.SCOUNTRY)
                    Ext.getCmp(prototype.id + '-de-txtCOREP').setValue(res.result.COREP)
                    Ext.getCmp(prototype.id + '-de-txtSOCIETY').setValue(res.result.SOCIETY)
                    Ext.getCmp(prototype.id + '-de-txtDATECI').setValue(res.result.DATECI)
                    Ext.getCmp(prototype.id + '-de-txtTRANCI').setValue(res.result.TRANCI)
                    Ext.getCmp(prototype.id + '-de-txtTDOC').setValue(res.result.descTDOC)
                    Ext.getCmp(prototype.id + '-de-txtSTVAL').setValue(res.result.strDescStatus)
                    Ext.getCmp(prototype.id + '-de-txtQTYTRAN1').setValue(res.result.QTYTRAN1)
                    Ext.getCmp(prototype.id + '-de-txtACCNUMB').setValue(res.result.ACCNUMBER)
                    if (res.result.STVAL == '1') {
                        global.Msg({msg: "REGISTRATION IN MATCH STATUS"});
                        Ext.getCmp(prototype.id + '-file').setDisabled(true)

                    }
                }


//                meDE.beanResult = res.result;
//                meDE.mostrarData();

            }
        });
    },

    BuscarCAGENCY: function (obj, e, eOpts) {
        switch (e.getKey()) {
            case 13:
                if (Ext.getCmp(prototype.id + '-txtTERMP').getValue().length > 0 || Ext.getCmp(prototype.id + '-txtSAGENT').getValue().length > 0) {
//                    if (Ext.getCmp(prototype.id + '-txtCAGENCY').getValue().length === 7 || Ext.getCmp(prototype.id + '-txtCAGENCY').getValue().length === 8) {
//                        this.btnSearch_click();
//                    } else {
//                        global.Msg({
//                            msg: 'Agency Code must contain 8 characters.'
//                        });
//                    }
                    this.btnSearch_click();
                } else {
                    this.btnSearch_click();
                }

                break;
        }
    },
    // </editor-fold>


    validateFields: function () {
        var msj = '';
        var bean = searchParams.bean;

        return msj;
    },
    btnAdd_click: function () {
        this.winDataEntry('I');
    },
    onEditClick: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        this.winDataEntry('U', rec);
    },
    winDataEntry: function (action, rec) {
        action = action === null || action === undefined ? 'U' : action;
        rec = rec === null || rec === undefined ? {} : rec;

        Ext.create('Ext.Praxis.view.payments.LoadSalesConciliationForm.DataEntry', {
            id: prototype.id + '-dataEntry',
            params: {
                action: action,
                rec: rec,
                lstCountry: me.lstCountry
            }
        }).show();
    },
    btnBack_click: function (obj, e) {

        if (me.drillDown.length > 0) {
            me.panelActual = me.drillDown.pop();
            global.selectedChild(me.childs, prototype.id + me.panelActual);
            me.setWidthPie();

            this.getPaggin();
            if (me.pagginActual !== '') {
                var pag = Ext.getCmp(prototype.id + me.pagginActual);
                var pagData = pag.getPageData();
                Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
            }
        } else {
            global.showMenu();
        }
    },

    btnExcel_click: function (obj, e) {

        this.setFormatParameter();
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
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
        }
    },
    exportExcel: function () {

        this.setFormatParameter();
        console.log(searchParams.beanString, 'nika')
        switch (me.panelActual) {
            case  '-panelGridData':
                global.getFile(prototype.url + '/getXLSX?beanString=' + encodeURI(searchParams.beanString));
                break;
            default:
                global.Msg(
                        {msg: 'Under Construction'
                        });
        }

    },
    onDownloadFile: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
        me.paramsDetail.beanString = JSON.stringify(rowData.data);
        me.fileName = rowData.data.A2536NAMEF;
        Ext.Ajax.request({
            url: prototype.url + '/download',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getCmp(prototype.id + '-gridData').mask('Loading...'),
            params: me.paramsDetail,
            success: function (response, options) {
                Ext.getCmp(prototype.id + '-gridData').unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);

                var resultByte = res.bytes;
                var bytes = new Uint8Array(resultByte); // pass your byte response to this constructor
                var blob = new Blob([bytes], {type: "application/png"});// change resultByte to bytes

                var link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = me.fileName;
                link.click();
            }
        });

    },
    btnFilter_click: function (obj) {
        var option = Ext.getCmp(prototype.id + '-contentFilter');
        if (option.isVisible()) {
            option.setVisible(false);
        } else {
            option.setVisible(true);
        }
    },
    setWidthPie: function () {
//        var ancho = Ext.getCmp(prototype.id + me.panelActual).getWidth();
//        Ext.getCmp(prototype.id + '-pie').setWidth(ancho);
    },
    getPaggin: function () {
        me.pagginActual = '';
        switch (me.panelActual) {
            case  '-panelGridData':
                me.pagginActual = '-paggin';
                break;
        }
    },
    /*     
     * Funciones para la paginacion     
     */
    pagFirst: function (obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.moveFirst();
    }, pagPrevious: function (obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.movePrevious();
    },
    pagNext: function (obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.moveNext();
    },
    pagLast: function (obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.moveLast();
    },
    getInt: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right';
        return Ext.util.Format.number(value, '0,000');
    },
    getDouble: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right';
        return Ext.util.Format.number(value, '0,000.00');
    },
    getText: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:left';
        return value;
    },
    getDoubleColor1: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right;background:#F2FAFC';
        return Ext.util.Format.number(value, '0,000.00');
    },
    getDoubleColor2: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right;background:#DFF0ED';
        return Ext.util.Format.number(value, '0,000.00');
    },
    getDoubleColor3: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right;background:#FCF5F2';
        return Ext.util.Format.number(value, '0,000.00');
    }


}
);
