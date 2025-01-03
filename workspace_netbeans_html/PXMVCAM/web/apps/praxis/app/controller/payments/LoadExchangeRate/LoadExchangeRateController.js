/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.payments.LoadExchangeRate.LoadExchangeRateController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.LoadExchangeRateController',
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
        prototype.id = 'LoadExchangeRateForm';
        prototype.url = CONTEXTPATH + '/LoadExchangeRate';
        this.childs = Ext.getCmp(prototype.id + '-panelMain').items.items;
        me.panelActual = '-panelGridData';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        this.control({
//            //   -------------------Eventos Genericos --------------------
//            '#LoadExchangeRateForm-xpanel': {
//                afterrender: this.xpanel_afterrender            
//            },
            '#LoadExchangeRateForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#LoadExchangeRateForm-btnClear': {
                click: this.btnClear_click
            },
            '#LoadExchangeRateForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#LoadExchangeRateForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#LoadExchangeRateForm-btnAdd': {
                click: this.btnAdd_click
            },
            '#LoadExchangeRateForm-btnBack': {
                click: this.btnBack_click
            },
            '#LoadExchangeRateForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#LoadExchangeRateForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#LoadExchangeRateForm-btn-pag-next': {
                click: this.pagNext
            },
            '#LoadExchangeRateForm-btn-pag-last': {
                click: this.pagLast
            },
            '#LoadExchangeRateForm-de-txtADJUNTAR': {
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

        let beanString = JSON.stringify(beanValidation);
        var file = Ext.getCmp(prototype.id + '-file').getValue();
        if (file === '') {
            Ext.MessageBox.alert('PRAXIS', "::: Select only one file. Please :::", function (btn, text) {
                if (btn === 'ok' || btn === 'cancel')
                    setTimeout("Ext.getCmp(prototype.id + '-File').focus();", 100);
            });
            return;
        }
        // Crear una instancia de FormData para enviar el archivo
        var form = Ext.getCmp(prototype.id + '-form-01').getForm();
        form.submit({
            url: prototype.url + '/loadMPF033',
            waitMsg: 'Uploading your sure to upload the file...',
            params: {fileName: file, beanString: beanString},
            success: function (fp, o) {
                var res = Ext.decode(o.response.responseText);
                console.log(res);
                if (res.success) {
                    console.log(res.success, 'res.success')
                    let objResult = res.objResult;
                    Ext.getCmp(prototype.id + '-panelGridData').unmask()
                    global.Msg({msg: objResult.MESSAGE});
                    // No es necesario restaurar el archivo ya que no se borra el campo de archivo
                } else {
                    global.Msg({msg: "Error TXT Load"});
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
        
    },
    btnClear_click: function (obj, e) {
        Ext.getCmp(prototype.id + '-file').reset();
    },
    btnSearch_click: function (obj, e) {
        
        
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

        Ext.create('Ext.Praxis.view.payments.LoadExchangeRateForm.DataEntry', {
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
