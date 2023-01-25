/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.payments.ClarificationLoad.ClarificationLoadController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ClarificationLoadController',
    fecha: new Date(),
    childs: '5',
    bean: '',
    paginActual: '',
    drillDown: [],
    lstCountry:[],
    gridActual: '',
    panelActual: '',
    fileName: '',
    me: '',
    searchParams: {},
    searchParamsExcel: {},
    paramsDetail: {},
    dataObtain: {},
    init: function(view) {
        me = this;
        prototype.id = 'ClarificationLoadForm';
        prototype.url = CONTEXTPATH + '/ClarificationLoad';
        this.childs = Ext.getCmp(prototype.id + '-panelMain').items.items;
        me.panelActual = '-panelGridData';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        this.obtainData();
        

        this.control({
//            //   -------------------Eventos Genericos --------------------
//            '#BanksCatalogForm-xpanel': {
//                afterrender: this.xpanel_afterrender            
//            },
//            '#BanksCatalogForm-btnSearch': {
//                click: this.btnSearch_click
//            },
//            '#BanksCatalogForm-btnClear': {
//                click: this.btnClear_click
//            },
//            '#BanksCatalogForm-btnExcel': {
//                click: this.btnExcel_click
//            },
//            '#BanksCatalogForm-btnFilter': {
//                click: this.btnFilter_click
//            },
//            '#BanksCatalogForm-btnAdd': {
//                click: this.btnAdd_click
//            },
//            '#BanksCatalogForm-btnBack': {
//                click: this.btnBack_click
//            },
//            '#BanksCatalogForm-btn-pag-first': {
//                click: this.pagFirst
//            },
//            '#BanksCatalogForm-btn-pag-previous': {
//                click: this.pagPrevious
//            },
//            '#BanksCatalogForm-btn-pag-next': {
//                click: this.pagNext
//            },
//            '#ClarificationLoadForm-btn-pag-last': {
//                click: this.pagLast
//            },
//            '#ClarificationLoadForm-btnLoadFile': {
//                click: this.btnLoad_click
//            }
            
//            //-----------------Eventos Especificos -------------------    
//
//
        });
    },
//    xpanel_afterrender: function(obj, e) {
//        // this.setStoreData();
////           this.btnSearch_click();
//    },
    setFormatParameter: function() {

        me.bean = {};
        me.bean.CURRENC = Ext.getCmp(prototype.id + '-cmbCode').getValue();
        me.bean.COUNTRY = Ext.getCmp(prototype.id + '-cmbCountry').getValue();
        var beanString = JSON.stringify(me.bean);
        searchParams = {
            bean: me.bean,
            beanString: beanString
        };
        console.log(searchParams);
    },
    btnSearch_click: function(obj, e) {
        this.setFormatParameter();
        this.setGridData();
    },
    obtainData: function() {
        
        var cmbBankCode = Ext.getCmp(prototype.id + '-cmbBankCode');
        cmbBankCode.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["BX", "Bananex"],
                ["AX", "American Express MEX"],  //uploadCSV
                ["ST", "Santander"],
                ["PP", "PayPal"],
                ["US", "American Express USA"],  //uploadCSV
                ["EL", "Elavon"],                //uploadCSV
                ["STB", "Santander BSP"]            //uploadFile
            ]
        }));
        cmbBankCode.setValue("BX");
        
        var cmbInput = Ext.getCmp(prototype.id + '-cmbInput');
        cmbInput.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["C", "Clarification"],
                ["N", "Bank Notice / Chargeback"]                   
            ]
        }));
        cmbInput.setValue("C");
        
    },
    
    onLoadClick: function() {
        
        var input  = Ext.getCmp(prototype.id + '-cmbInput').getValue;
        var banco  = Ext.getCmp(prototype.id + '-cmbBankCode').getValue;
        var msjPregunta = '', msjError = '';
        
        if(input === 'N'){
            msjPregunta = 'Sure to load *Bank Notice / Chargeback* file?';
            if(banco !== 'BX'){
                msjError = 'Under Construction';
            }
        }else{
            msjPregunta = 'Sure to load *Clarification* file?';
        }
                
        if(msjError === ''){
            Ext.MessageBox.show({
                title: 'Icon Support',
                msg:  msjPregunta,
                buttons: Ext.MessageBox.OKCANCEL,
                icon: Ext.MessageBox.WARNING,
                fn: function(btn){
                    if(btn === 'ok'){
                       me.onSelectMetod();
                    }
                }
            });
        }
    },
    
    onSelectMetod: function() {
        
        var input  = Ext.getCmp(prototype.id + '-cmbInput').getValue;
        var banco  = Ext.getCmp(prototype.id + '-cmbBankCode').getValue;
        
        me.onFileLoad();
    },
    
    onFileLoad: function() {
        
        var me = this;
        var banco = Ext.getCmp(prototype.id + '-cmbBankCode').getValue();
        var input = Ext.getCmp(prototype.id + '-cmbInput').getValue();
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
            url: prototype.url + '/setData',
            waitMsg: 'Uploading your sure to upload the file...',
//            params: {beanString:JSON.stringify(me.searchParams)},
            params: {fileName: file, banco: banco, input: input},
            success: function (fp, o) {
                var res = Ext.decode(o.response.responseText);
                console.log(res);
                
                if (res.successUp) {
                    var msjUpload = res.msjUpload;
                    if(msjUpload === 'SUCCESS'){
                        if(input === "N"){
                            global.Msg({msg: 'Bank Notice successfully loaded.'});
                        }else{
                            global.Msg({msg: 'Clarification successfully loaded.'});
                        }
                        me.setGridData(banco);

                    }else{
                        global.Msg({msg: msjUpload});
                    }
                } else if(res.success){
                    var msjResult = res.msjResult;
                    global.Msg({msg: msjResult});
                }else{
                    global.Msg({msg: "Error File Load"});
                }
                Ext.getCmp(prototype.id+'-btn-upload').enable(true);
            },
            failure: function(response, opts) {
                console.log('server-side failure with status code ' + response.status);
            }
        });
        
    },
    
    // <editor-fold defaultstate="collapsed" desc="setGridData">
    setGridData: function(banco) {
        
        win.lblUser_toolTip("Estructura: A2270");
        me.panelActual = '-panelGridData';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/search'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = {banco: banco}
                },
                load: function(obj) {
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    }
                }
            }
        });
            
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataAirport').bindStore(storeGridDatas);
//        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
        
    },
    // </editor-fold>

    btnBack_click: function(obj, e) {

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
    btnClear_click: function(obj, e) {
        Ext.getCmp(prototype.id + '-cmbCode').setValue('');
        Ext.getCmp(prototype.id + '-cmbCountry').setValue('');

    },
    btnExcel_click: function(obj, e) {

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
                fn: function(btn) {
                    if (btn === 'ok') {
                        this.exportExcel();
                    }
                }
            });
        }
    },
    exportExcel: function() {
        
        this.setFormatParameter();
        switch (me.panelActual) {
            case  '-panelGridData':
                global.getFile(prototype.url + '/getXLSX?beanString=' + searchParams.beanString);
                break;
            default:
                global.Msg({msg: 'Under Construction'});
        }

    },
    
    btnFilter_click: function(obj) {
        console.log('btnFilter_click');
        var option = Ext.getCmp(prototype.id + '-contentFilter');
        if (option.isVisible()) {
            option.setVisible(false);
        } else {
            option.setVisible(true);
        }
    },
    setWidthPie: function() {
        var ancho = Ext.getCmp(prototype.id + me.panelActual).getWidth();
        Ext.getCmp(prototype.id + '-pie').setWidth(ancho);
    },
    getPaggin: function() {
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
    pagFirst: function(obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.moveFirst();
    }, pagPrevious: function(obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.movePrevious();
    },
    pagNext: function(obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.moveNext();
    },
    pagLast: function(obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.moveLast();
    },
    getInt: function(value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right';
        return Ext.util.Format.number(value, '0,000');
    },
    getDouble: function(value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right';
        return Ext.util.Format.number(value, '0,000.00');
    },
    getText: function(value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:left';
        return value;
    },
    getDoubleColor1: function(value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right;background:#F2FAFC';
        return Ext.util.Format.number(value, '0,000.00');
    },
    getDoubleColor2: function(value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right;background:#DFF0ED';
        return Ext.util.Format.number(value, '0,000.00');
    },
    getDoubleColor3: function(value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right;background:#FCF5F2';
        return Ext.util.Format.number(value, '0,000.00');
    }


  }
);
