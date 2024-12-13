/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.payments.LoadDebitsConciliation.LoadDebitsConciliationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.LoadDebitsConciliationController',
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
    init: function (view) {
        me = this;
        prototype.id = 'LoadDebitsConciliationForm';
        prototype.url = CONTEXTPATH + '/LoadDebitsConciliation';
        this.childs = Ext.getCmp(prototype.id + '-panelMain').items.items;
        me.panelActual = '-panelGridData';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        this.control({
//            //   -------------------Eventos Genericos --------------------
//            '#LoadDebitsConciliationForm-xpanel': {
//                afterrender: this.xpanel_afterrender            
//            },
            '#LoadDebitsConciliationForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#LoadDebitsConciliationForm-btnClear': {
                click: this.btnClear_click
            },
            '#LoadDebitsConciliationForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#LoadDebitsConciliationForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#LoadDebitsConciliationForm-btnAdd': {
                click: this.btnAdd_click
            },
            '#LoadDebitsConciliationForm-btnBack': {
                click: this.btnBack_click
            },
            '#LoadDebitsConciliationForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#LoadDebitsConciliationForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#LoadDebitsConciliationForm-btn-pag-next': {
                click: this.pagNext
            },
            '#LoadDebitsConciliationForm-btn-pag-last': {
                click: this.pagLast
            },
            '#LoadDebitsConciliationForm-de-txtADJUNTAR': {
                change: this.btnAdjuntar
            }
//            //-----------------Eventos Especificos -------------------    
//
//
        });
    },

    eventKey: function (e, eOpts) {
        if (eOpts.getKey() === 13) {
            this.btnSearch_click();
        }
    },
    onUpperValue: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    
    onFileLoad: function () {
        var me = this;
        let beanValidation = {}
        
        beanValidation.IN_ACCNUMBER = Ext.getCmp(prototype.id + '-de-txtACCNUMB').getValue()
        var fileField = Ext.getCmp(prototype.id + '-file');
        var file = fileField.fileInputEl.dom.files[0];
        let beanString = JSON.stringify(beanValidation);
        if (!file) {
            Ext.MessageBox.alert('PRAXIS', "::: Select only one file. Please :::", function (btn, text) {
                if (btn === 'ok' || btn === 'cancel')
                    setTimeout("Ext.getCmp(prototype.id + '-File').focus();", 100);
            });
            return;
        }

        // Crear una instancia de FormData para enviar el archivo
        var formData = new FormData();
        formData.append('excelfile', file);
        
        // Realizar una solicitud AJAX para cargar el archivo
        Ext.Ajax.request({
            url: prototype.url + '/updateA4527',
            method: 'POST',
            rawData: formData,
            params: {beanString: beanString},
            // Configurar el tipo de contenido adecuado y el encabezado
            headers: {
                'Content-Type': null // Dejar que el navegador establezca el tipo de contenido
            },
            success: function (response) {
                var res = Ext.decode(response.responseText);
                console.log(res);
                if (res.success) {
                    
                    let objResult = res.objResult;
                    if(objResult.isInvalid){
                        global.Msg({msg: "The account number is different"});
                        return false;
                    }
                    console.log(objResult.netoAcum, 'objResult.netoAcum')
                    console.log( 'objResult.isInvalid')
                    let numberWithCommas = me.formatNumberWithCommas_string(objResult.netoAcum);
                    Ext.getCmp(prototype.id + '-de-txtSumAmount').setValue(numberWithCommas);
                    me.validationAmount();
                    // No es necesario restaurar el archivo ya que no se borra el campo de archivo
                } else {
                    global.Msg({msg: "Error Excel Load"});
                }
            },
            failure: function (response) {
                console.log('server-side failure with status code ' + response.status);
            }
        });
    },
//    onFileLoad: function () {
//
//        var me = this;
//        var file = Ext.getCmp(prototype.id + '-file').getValue();
//        if (file === '') {
//            Ext.MessageBox.alert('PRAXIS', "::: Select only one file. Please :::", function (btn, text) {
//                if (btn === 'ok' || btn === 'cancel')
//                    setTimeout("Ext.getCmp(prototype.id + '-File').focus();", 100);
//            });
//            return;
//        }
//        
//        var form = Ext.getCmp(prototype.id + '-form-01').getForm();
//        form.submit({
//            url: prototype.url + '/updateA4527',
//            waitMsg: 'Uploading your sure to upload the file...',
//            params: {fileName: file},
//            success: function (fp, o) {
//                var res = Ext.decode(o.response.responseText);
//                console.log(res);
//
//                if (res.success) {
//                    let montoAcum = res.objResult;
//                    let numberWithCommas = me.formatNumberWithCommas_string(montoAcum);
////                    global.Msg({msg: msjResult});
//                   Ext.getCmp(prototype.id + '-de-txtSumAmount').setValue(numberWithCommas);
//                   me.validationAmount()
//                } else {
//                    global.Msg({msg: "Error Excel Load"});
//                }
//
//            },
//            failure: function (response, opts) {
//                console.log('server-side failure with status code ' + response.status);
//            }
//        });
//    },
    validationAmount: function(){
        let amountStatement = Ext.getCmp(prototype.id + '-de-txtSumAmount').getValue()
        let amountSettlement = Ext.getCmp(prototype.id + '-de-txtAMOUNT').getValue()
        if(amountStatement != amountSettlement){
            global.Msg({msg: "The amounts do not MATCH"});
            Ext.getCmp(prototype.id + '-de-txtSumAmount').setFieldStyle('background-color: #F7F199;');
            Ext.getCmp(prototype.id + '-de-txtAMOUNT').setFieldStyle('background-color: #F7F199;');
        }else{
            global.Msg({msg: "The amounts MATCH!"});
            Ext.getCmp(prototype.id + '-btn-update').show();
        }
    },
    formatNumberWithCommas_string: function(number) {
        var numberStr = String(number).replace(/,/g, '');
        var parts = numberStr.split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return parts.join('.');
    },
    formatNumberWithCommas_double: function(number) {
        var numberStr = String(number).replace(/,/g, '');
        var parts = numberStr.split('.');
        var integerPart = parts[0];
        var decimalPart = parts.length > 1 ? '.' + parts[1] : '';
        integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return integerPart + decimalPart;
    },
    onUpdateClick: function(){
        var me = this;
        let beanConciliation = {}
        beanConciliation.IN_BANDOC = Ext.getCmp(prototype.id + '-de-txtBANDOC').getValue()
        beanConciliation.IN_TDOC = 'D'
        beanConciliation.IN_CODEBANK = Ext.getCmp(prototype.id + '-de-txtCODEBANK').getValue()
        beanConciliation.IN_SCURRENCY = Ext.getCmp(prototype.id + '-de-txtSCURRENCY').getValue()
        beanConciliation.IN_MERCHNC = Ext.getCmp(prototype.id + '-de-txtMERCHANT').getValue()
        beanConciliation.IN_SCOUNTRY = Ext.getCmp(prototype.id + '-de-txtSCOUNTRY').getValue()
        beanConciliation.IN_COREP = Ext.getCmp(prototype.id + '-de-txtCOREP').getValue()
        beanConciliation.IN_SOCIETY = Ext.getCmp(prototype.id + '-de-txtSOCIETY').getValue()
        beanConciliation.IN_DATECI = Ext.getCmp(prototype.id + '-de-txtDATECI').getValue()
        beanConciliation.IN_TRANCI = Ext.getCmp(prototype.id + '-de-txtTRANCI').getValue()
        beanConciliation.IN_VALDATE = Ext.getCmp(prototype.id + '-de-txtVALDATE').getValue()
        beanConciliation.IN_PRDA = Ext.getCmp(prototype.id + '-de-txtPRDA').getValue()
        let beanString = JSON.stringify(beanConciliation);
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
            url: prototype.url + '/conciliationDebits',
            waitMsg: 'Uploading your sure to upload the file...',
            params: {fileName: file, beanString: beanString},
            success: function (fp, o) {
                var res = Ext.decode(o.response.responseText);
                console.log(res);

                if (res.success) {
                    global.Msg({msg: res.msjReponse});
                    Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});
                    Ext.getCmp(prototype.id + '-file').setRawValue(file);
                    Ext.getCmp(prototype.id + '-btn-update').hide();
                    Ext.getCmp(prototype.id + '-btn-upload').setDisabled(true);

                } else {
                    global.Msg({msg: res.sesion});
                }

            },
            failure: function (response, opts) {
                console.log('server-side failure with status code ' + response.status);
            }
        });
    },
    btnClear_click: function (obj, e) {
        Ext.getCmp(prototype.id + '-file').setDisabled(false)
        Ext.getCmp(prototype.id + '-de-txtBANDOC').setDisabled(false)
        Ext.getCmp(prototype.id + '-de-txtBANDOC').setValue('')
        Ext.getCmp(prototype.id + '-de-txtCODEBANK').setValue('')
        Ext.getCmp(prototype.id + '-de-txtADATE').setValue('')
        Ext.getCmp(prototype.id + '-de-txtSCURRENCY').setValue('')
        Ext.getCmp(prototype.id + '-de-txtAMOUNT').setValue('')
        Ext.getCmp(prototype.id + '-btn-update').hide();
        Ext.getCmp(prototype.id + '-de-txtSumAmount').setValue('')
        Ext.getCmp(prototype.id + '-de-txtMERCHANT').setValue('')
        Ext.getCmp(prototype.id + '-de-txtSCOUNTRY').setValue('')
        Ext.getCmp(prototype.id + '-de-txtCOREP').setValue('')
        Ext.getCmp(prototype.id + '-de-txtSOCIETY').setValue('')
        Ext.getCmp(prototype.id + '-de-txtSOCIETY').setValue('')
        Ext.getCmp(prototype.id + '-de-txtTDOC').setValue('')
        Ext.getCmp(prototype.id + '-de-txtSTVAL').setValue('')
        Ext.getCmp(prototype.id + '-de-txtQTYTRAN1').setValue('')
        Ext.getCmp(prototype.id + '-de-txtACCNUMB').setValue('')
        Ext.getCmp(prototype.id + '-de-txtVALDATE').setValue('')
        Ext.getCmp(prototype.id + '-de-txtPRDA').setValue('')
        Ext.getCmp(prototype.id + '-file').reset();
        Ext.getCmp(prototype.id + '-btn-upload').setDisabled(false);
        Ext.getCmp(prototype.id + '-de-txtSumAmount').setFieldStyle('background-color: #CFE0EC;');
        Ext.getCmp(prototype.id + '-de-txtAMOUNT').setFieldStyle('background-color: #CFE0EC;');

    },
    btnSearch_click: function (obj, e) {
        
        Ext.getCmp(prototype.id + '-de-txtBANDOC').setDisabled(true)
        if( Ext.getCmp(prototype.id + '-de-txtBANDOC').getValue() == '' || Ext.getCmp(prototype.id + '-de-txtBANDOC').getValue() == undefined  ){
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
            success: function(response, options) {
                
                var res = Ext.JSON.decode(response.responseText);
                
                if( res.result.BANDOC == ''){
                    global.Msg({msg: "SAP Document not fund "});
                    Ext.getCmp(prototype.id + '-de-txtBANDOC').setDisabled(false)
                }else {
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
                    Ext.getCmp(prototype.id + '-de-txtVALDATE').setValue(res.result.VALDATE)
                    Ext.getCmp(prototype.id + '-de-txtPRDA').setValue(res.result.PRDA)
                    if( res.result.STVAL == '1' || res.result.STVAL == '5' ){
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

        Ext.create('Ext.Praxis.view.payments.LoadDebitsConciliationForm.DataEntry', {
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
