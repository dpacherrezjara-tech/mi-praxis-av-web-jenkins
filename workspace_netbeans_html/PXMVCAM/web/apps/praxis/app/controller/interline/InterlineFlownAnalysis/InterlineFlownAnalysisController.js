/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.interline.InterlineFlownAnalysis.InterlineFlownAnalysisController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.InterlineFlownAnalysisController',
    fecha: new Date(),
    bean: '',
    paginActual: '',
    drillDown: [],
    gridActual: '',
    me: '',
    searchParams: {},
    paramsDetail: {},
    init: function(view) {
         me = this;
        prototype.id = 'InterlineFlownAnalysisForm';
        prototype.url = CONTEXTPATH + '/InterlineFlownAnalysis';
        prototype.urlMaster = CONTEXTPATH + '/MasterController';
        this.childs = Ext.getCmp(prototype.id + '-panelMain').items.items;
        me.panelActual = '-panelGridData';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        this.control({
            // -------------------Eventos Genericos --------------------
            '#InterlineFlownAnalysisForm-xpanel': {
                afterrender: this.xpanel_afterrender
            },
            '#InterlineFlownAnalysisForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#InterlineFlownAnalysisForm-btnClear': {
                click: this.btnClear_click
            },
            '#InterlineFlownAnalysisForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#InterlineFlownAnalysisForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#InterlineFlownAnalysisForm-btnBack': {
                click: this.btnBack_click
            },
            '#InterlineFlownAnalysisForm-btnTxt': {
                click: this.btnTxt_click
            },
            '#InterlineFlownAnalysisForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#InterlineFlownAnalysisForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#InterlineFlownAnalysisForm-btn-pag-next': {
                click: this.pagNext
            },
            '#InterlineFlownAnalysisForm-btn-pag-last': {
                click: this.pagLast
            },
            //-----------------Eventos Especificos -------------------            
            '#InterlineFlownAnalysisForm-cmbDateFromYear': {
                select: this.selectComboFromYear
            },
            '#InterlineFlownAnalysisForm-cmbDateFromMonth': {
                select: this.selectComboFromMonth
            },
            '#InterlineFlownAnalysisForm-cmbDateToMonth': {
                select: this.selectComboToMonth
            },
            '#InterlineFlownAnalysisForm-btnADM': {
                change: this.selectBtnADM
            }
//            '#InterlineFlownAnalysisForm-cmbOpcion': {
//                change: this.changeCmbOpcion
//            },
//            '#InterlineFlownAnalysisForm-cmbSALES': {
//                change: this.changeCmbSALES
//            },
//            '#InterlineFlownAnalysisForm-txtFilterCOUNTRY': {
//                keyup: this.eventKey,
//                change: this.onUpperValue
//            },
//            '#InterlineFlownAnalysisForm-txtFilterCHANNEL': {
//                keyup: this.eventKey,
//                change: this.onUpperValue
//            },
//            '#InterlineFlownAnalysisForm-txtFilterIATA': {
//                keyup: this.eventKey,
//                change: this.onUpperValue
//            },
//            '#InterlineFlownAnalysisForm-txtFilterGRUPO': {
//                keyup: this.eventKey,
//                change: this.onUpperValue
//            },
//            '#InterlineFlownAnalysisForm-txtFilterCONTABLE': {
//                keyup: this.eventKey,
//                change: this.onUpperValue
//            }

        });
    },
    xpanel_afterrender: function(obj, e) {
        this.setStoreData();
//      this.btnSearch_click();
    },
    eventKey: function(e, eOpts) {
        if (eOpts.getKey() === 13) {
            this.btnSearch_click();
        }
    },
    onUpperValue: function(field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    selectComboFromYear: function(obj) {
        var comboToYear = Ext.getCmp(prototype.id + '-cmbDateToYear');
        var storeComboDataYear = win.getStoreYear2(false, obj.getValue());
        comboToYear.bindStore(storeComboDataYear);
        comboToYear.setValue(obj.getValue());
    },
    selectComboFromMonth: function(obj) {
        var comboToMonth = Ext.getCmp(prototype.id + '-cmbDateToMonth');
        comboToMonth.setValue(obj.getValue());
    },
    selectComboToMonth: function(obj) {
        var comboFromYear = Ext.getCmp(prototype.id + '-cmbDateFromYear');
        var comboToYear = Ext.getCmp(prototype.id + '-cmbDateToYear');
        var comboFromMonth = Ext.getCmp(prototype.id + '-cmbDateFromMonth');
        if (comboFromYear.getValue() === comboToYear.getValue()) {
            if (obj.getValue() < comboFromMonth.getValue()) {
                comboFromMonth.setValue(obj.getValue());
            }
        }
    },
    selectBtnADM: function(obj) {
        if(obj.getValue()){
            Ext.getCmp(prototype.id + '-txtIATA').show();
        }else{
            Ext.getCmp(prototype.id + '-txtIATA').hide();
            this.btnSearch_click();
        }
            
    },
    setStoreData: function() {
        console.log(prototype.url);
        Ext.getCmp(prototype.id + '-cmbDateFromYear').bindStore(win.getStoreYear(false));
        Ext.getCmp(prototype.id + '-cmbDateToYear').bindStore(win.getStoreYear(false));
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').bindStore(win.getStoreMonth(true));
        Ext.getCmp(prototype.id + '-cmbDateToMonth').bindStore(win.getStoreMonth(true));

        Ext.getCmp(prototype.id + '-cmbDateFromYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateToYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').setValue("");
        Ext.getCmp(prototype.id + '-cmbDateToMonth').setValue("");

        var cmbFecha = Ext.getCmp(prototype.id + '-cmbFecha');
        cmbFecha.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["1", "Clearing Date"],
                ["2", "Invoice Date"]
            ]
        }));
        cmbFecha.setValue("1");

        
        var cmbPeriod = Ext.getCmp(prototype.id + '-cmbPeriod');
        cmbPeriod.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "All"],
                ["01", "01"],
                ["02", "02"],
                ["03", "03"],
                ["04", "04"]
            ]
        }));
        cmbPeriod.setValue("");

        Ext.Ajax.request({
            url: prototype.urlMaster + '/obtainDataAirline',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getBody().mask('Loading...'),
            params: '',
            success: function(response, options) {
                Ext.getBody().unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);
                var lstData = res.lstData;
                var storeData = Ext.create('Ext.data.Store', {
                    data: lstData,
                    autoLoad: true
                });
                Ext.getCmp(prototype.id + '-cmbAerolinea').bindStore(storeData);
                Ext.getCmp(prototype.id + '-cmbAerolinea').setValue('');
                global.clear();
                me.btnSearch_click();
            }
        });
    },
    changeCmbOpcion: function(obj, value) {
        this.clearFields();
        switch (value) {

            case '1':
                Ext.getCmp(prototype.id + '-txtFilterCONTABLE').show();

                Ext.getCmp(prototype.id + '-txtFilterGRUPO').hide();
                Ext.getCmp(prototype.id + '-txtFilterDateFrom').hide();
                Ext.getCmp(prototype.id + '-txtFilterDateTo').hide();
                Ext.getCmp(prototype.id + '-panelFilters2').hide();

                break;
            case '5':

                Ext.getCmp(prototype.id + '-txtFilterGRUPO').show();

                Ext.getCmp(prototype.id + '-txtFilterDateFrom').hide();
                Ext.getCmp(prototype.id + '-txtFilterDateTo').hide();
                Ext.getCmp(prototype.id + '-txtFilterCONTABLE').hide();
                Ext.getCmp(prototype.id + '-panelFilters2').hide();

                break;
            case '2':
            case '3':
            case '4':
                Ext.getCmp(prototype.id + '-panelFilters2').show();
                Ext.getCmp(prototype.id + '-txtFilterDateFrom').show();
                Ext.getCmp(prototype.id + '-txtFilterDateTo').show();

                Ext.getCmp(prototype.id + '-txtFilterCONTABLE').hide();
                Ext.getCmp(prototype.id + '-txtFilterGRUPO').hide();
                break;
        }
    },
    btnSearch_click: function(obj, e) {
        this.setFormatParameter();
        this.setGridData(obj, e);
    },
    btnSearch_click_ADM: function(obj, e) {
        this.setFormatParameter();
        this.setGridData(obj, e);
    },
    setFormatParameter: function() {
       me.bean = {};

        me.bean.IN_TIPOFECHA = Ext.getCmp(prototype.id + '-cmbFecha').getValue();
        me.bean.IN_FECHA_FROM = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue() + Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue();
        me.bean.IN_FECHA_TO = Ext.getCmp(prototype.id + '-cmbDateToYear').getValue() + Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue();
        me.bean.IN_AIRLINE = Ext.getCmp(prototype.id + '-cmbAerolinea').getValue();

        me.bean.IN_PERIOD = Ext.getCmp(prototype.id + '-cmbPeriod').getValue();
        me.bean.IN_SOURCE = Ext.getCmp(prototype.id + '-txtIATA').getValue();
        me.bean.IN_TKT = Ext.getCmp(prototype.id + '-txtTKT').getValue();
        
        var beanString = JSON.stringify(me.bean);
        searchParams = {
           // bean: bean,
            beanString: beanString
        };
        console.log(me.bean);
    },
    setGridData: function(obj, val) {
        console.log("Entro");
        win.lblUser_toolTip("Estructura: WRF070");
        this.setFormatParameter();
        // var msj = this.validateFields();
        var msj = '';
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {

            var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
                proxy: {
                    url: prototype.url + '/search'
                }, listeners: {
                    beforeload: function(obj) {
                        obj.proxy.extraParams = searchParams;
                    },
                    load: function(obj) {
                        var pag = Ext.getCmp(prototype.id + '-paggin');
                        var pagData = pag.getPageData();
                        Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                        if (obj.data.length === 0) {
                            global.Msg({
                                msg: 'Data not found.'
                            });
                        }
                    }
                }
            });
            global.clear();
            Ext.getCmp(prototype.id + '-gridData').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-gridData').setStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
        }
    },
    
     setGridDataGroup: function(data) {
      
        win.lblUser_toolTip("Estructura: WRF070");
     //   me.setWidthPie();
        console.log(me.paramsDetail);
        var storeGridDatas = Ext.create('Ext.Praxis.store.interline.GridData', {
            proxy: {
                url: prototype.url + '/searchByGroup'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = me.paramsDetail;
                   
                },
                load: function(obj) {
                    var pag = Ext.getCmp(prototype.id + '-paggin2');
                    var pagData = pag.getPageData();
                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    } else {
                        var beanD = obj.data.items[0].data;
                        if(beanD.IN_PERIOD.trim() === 'XX'){
                            beanD.IN_PERIOD = '';
                        }
                        var title = 'Billing Date. : ' + beanD.strFormatDate + '   ' + ' Period : ' + beanD.IN_PERIOD;
                        Ext.getCmp(prototype.id + '-labelTitle2').setText(title);
                    }
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridDataGroup').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridDataGroup').setStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin2').bindStore(storeGridDatas);
    },
    
   
    
    onViewDataGroup: function(column, e, row, column, x, rowData) {
        var data = x.record.data;
        me.drillDown.push(me.panelActual);
        me.panelActual = '-panelMainDataGroup';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        
        if(rowData.data.IN_PERIOD.trim() === ''){
           rowData.data.IN_PERIOD = 'XX';
        }
        
        me.paramsDetail.beanString = JSON.stringify(rowData.data);
        this.setGridDataGroup();
    },
    
  
    validateFields: function() {
        var opt = searchParams.Opcion;
        var msj = '';
        switch (opt) {
            case '1':
                if (searchParams.CONTABLE.trim() === '') {
                    msj = 'Enter CONTABLE';
                }
                break;
            case '5':
                if (searchParams.GRUPO.trim() === '') {
                    msj = 'Enter GROUP';
                }
                break;
            case '2':
            case '3':
            case '4':
                if (searchParams.DateFrom.trim() === '') {
                    msj = 'Enter DATE FROM';
                }
                break;
        }
        return msj;
    },
    getPaggin: function() {
        me.pagginActual = '';
        switch (me.panelActual) {
            case  '-panelGridData':
                me.pagginActual = '-paggin';
                break;
            case '-panelMainDataGroup':
                me.pagginActual = '-paggin2';
                break;
           
        }
    },
    
    btnBack_click: function(obj, e) {
       if (me.drillDown.length > 0) {
            me.panelActual = me.drillDown.pop();
            global.selectedChild(me.childs, prototype.id + me.panelActual);
           
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
        Ext.getCmp(prototype.id + '-cmbOpcion').setValue('2');
        Ext.getCmp(prototype.id + '-cmbContrytax').setValue('1');
        Ext.getCmp(prototype.id + '-cmbSALES').setValue('');
        Ext.getCmp(prototype.id + '-cmbBANK').setValue('');

        Ext.getCmp(prototype.id + '-txtFilterCONTABLE').setValue('');
        Ext.getCmp(prototype.id + '-txtFilterGRUPO').setValue('');
        Ext.getCmp(prototype.id + '-txtFilterDateFrom').setValue('');
        Ext.getCmp(prototype.id + '-txtFilterDateTo').setValue('');
        Ext.getCmp(prototype.id + '-txtFilterCOUNTRY').setValue('');
        Ext.getCmp(prototype.id + '-txtFilterCHANNEL').setValue('');
        Ext.getCmp(prototype.id + '-txtFilterIATA').setValue('');


    },
    clearFields: function() {
        Ext.getCmp(prototype.id + '-cmbSALES').setValue('');
        Ext.getCmp(prototype.id + '-cmbBANK').setValue('');
        Ext.getCmp(prototype.id + '-txtFilterCONTABLE').setValue('');
        Ext.getCmp(prototype.id + '-txtFilterGRUPO').setValue('');
        Ext.getCmp(prototype.id + '-txtFilterDateFrom').setValue('');
        Ext.getCmp(prototype.id + '-txtFilterDateTo').setValue('');
        Ext.getCmp(prototype.id + '-txtFilterCOUNTRY').setValue('');
        Ext.getCmp(prototype.id + '-txtFilterCHANNEL').setValue('');
        Ext.getCmp(prototype.id + '-txtFilterIATA').setValue('');

    }, btnExcel_click: function(obj, e) {

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
        
        var panel = me.panelActual
        switch (panel) {
            case  '-panelGridData':
                global.getFile(prototype.url + '/getXLSX?beanString=' + encodeURI(JSON.stringify(this.bean)));
                break;
            case '-panelMainDataGroup':
                global.getFile(prototype.url + '/getXLSX_2?beanString=' + encodeURI(me.paramsDetail.beanString));
                break;  
        }
    
    },
    btnFilter_click: function(obj) {
        var option = Ext.getCmp(prototype.id + '-contentFilter');
        if (option.isVisible()) {
            option.setVisible(false);
        } else {
            option.setVisible(true);
        }
    },
    btnTxt_click: function() {
        this.setFormatParameter();
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            global.getFile(prototype.url + '/getFileTxt?Opcion=' + searchParams.Opcion
                    + '&SALES=' + searchParams.SALES
                    + '&BANK=' + searchParams.BANK
                    + '&GRUPO=' + searchParams.GRUPO
                    + '&CONTABLE=' + searchParams.CONTABLE
                    + '&DateFrom=' + searchParams.DateFrom
                    + '&DateTo=' + searchParams.DateTo
                    + '&COUNTRY=' + searchParams.COUNTRY
                    + '&CHANNEL=' + searchParams.CHANNEL
                    + '&IATA=' + searchParams.IATA
                    );
        }
    },
   /* viewProrate: function(column, e, row, column, x, rowData) {

        var data = x.record.data;
        var nroprt = data.NROPRT;

        this.post_to_url(CONTEXTPATH + '/Home?'
                + 'strMod=FreqFlyer&'
                + 'nroprt=' + nroprt
                + '#program-prorrateo-form', {}, 'post', 'ProrrateoForm');
    },*/
    post_to_url: function(path, params, method, id) {
        method = method || "post";

        var form = document.createElement("form");
        form.setAttribute("method", method);
        form.setAttribute("action", path);
        form.setAttribute("id", id);

        document.body.appendChild(form);
        form.submit();
    },
    /*     
     * Funciones para la paginacion     
     */
    pagFirst: function(obj, e) {
        var pag = Ext.getCmp(prototype.id + '-paggin');
        var pagData = pag.getPageData();
        pag.moveFirst();
    },
    pagPrevious: function(obj, e) {
        var pag = Ext.getCmp(prototype.id + '-paggin');
        var pagData = pag.getPageData();
        pag.movePrevious();
    },
    pagNext: function(obj, e) {
        var pag = Ext.getCmp(prototype.id + '-paggin');
        var pagData = pag.getPageData();
        pag.moveNext();
    },
    pagLast: function(obj, e) {
        var pag = Ext.getCmp(prototype.id + '-paggin');
        var pagData = pag.getPageData();
        pag.moveLast();
    }



});
