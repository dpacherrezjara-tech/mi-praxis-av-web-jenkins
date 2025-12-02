/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.payments.ReconciliationReport.ReconciliationReportController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ReconciliationReportController',
    fecha: new Date(),
    childs: '5',
    bean: '',
    beanHistoric: '',
    paginActual: '',
    drillDown: [],
    lstCountry: [],
    gridActual: '',
    panelActual: '',
    fileName: '',
    society: '',
    month:'',
    me: '',
    searchParams: {},
    searchParamsHistoric: {},
    paramsDetail: {},
    paramsObtainData: {},
    dataObtain: {},
    init: function (view) {
        me = this;
        prototype.id = 'ReconciliationReportForm';
        prototype.url = CONTEXTPATH + '/ReconciliationReport';
        this.childs = Ext.getCmp(prototype.id + '-panelMain').items.items;
        me.panelActual = '-panelGridDataDetail';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        this.control({
//            //   -------------------Eventos Genericos --------------------
            '#ReconciliationReportForm-xpanel': {
                afterrender: this.xpanel_afterrender
            },
            '#ReconciliationReportForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#ReconciliationReportForm-btnClear': {
                click: this.btnClear_click
            },
            '#ReconciliationReportForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#ReconciliationReportForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#ReconciliationReportForm-btnAdd': {
                click: this.btnAdd_click
            },
            '#ReconciliationReportForm-btnBack': {
                click: this.btnBack_click
            },
            '#ReconciliationReportForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#ReconciliationReportForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#ReconciliationReportForm-btn-pag-next': {
                click: this.pagNext
            },
            '#ReconciliationReportForm-btn-pag-last': {
                click: this.pagLast
            },
            //-----------------Eventos Especificos -------------------            
            '#ReconciliationReportForm-cmbDateFromYear': {
                select: this.selectComboFromYear
            },
            '#ReconciliationReportForm-cmbDateToYear': {
                select: this.selectComboToYear
            },
            '#ReconciliationReportForm-cmbDateFromMonth': {
                select: this.selectComboFromMonth
            },
            '#ReconciliationReportForm-cmbDateToMonth': {
                select: this.selectComboToMonth
            },
            '#BankReconciliationForm-cmbDateDay': {
                select: this.selectComboFromDay
            },
            '#BankReconciliationForm-cmbDateToDay': {
                select: this.selectComboToDay
            }
        });
    },
    xpanel_afterrender: function () {
        me.obtainData();
        me.btnSearch_click();
    },
    obtainData: function () {
        var fechaActual = me.fecha || new Date();

        var monthActual = fechaActual.getMonth() + 1;
        var yearActual = fechaActual.getFullYear();

        var fechaDesde = new Date(fechaActual);
        fechaDesde.setMonth(fechaDesde.getMonth() - 4);

        var monthDesde = fechaDesde.getMonth() + 1;
        var yearDesde = fechaDesde.getFullYear();

        if (monthActual < 10) monthActual = '0' + monthActual;
        if (monthDesde < 10) monthDesde = '0' + monthDesde;

        Ext.getCmp(prototype.id + '-cmbDateFromYear').bindStore(win.getStoreYear(true));
        Ext.getCmp(prototype.id + '-cmbDateToYear').bindStore(win.getStoreYear(true));
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').bindStore(win.getStoreMonth(true));
        Ext.getCmp(prototype.id + '-cmbDateToMonth').bindStore(win.getStoreMonth(true));
        Ext.getCmp(prototype.id + '-cmbDateFromDay').bindStore(win.getStoreDays(true));
        Ext.getCmp(prototype.id + '-cmbDateToDay').bindStore(win.getStoreDays(true));

        Ext.getCmp(prototype.id + '-cmbDateFromYear').setValue(yearDesde);
        Ext.getCmp(prototype.id + '-cmbDateToYear').setValue(yearActual);

        Ext.getCmp(prototype.id + '-cmbDateFromMonth').setValue(monthActual); 
        Ext.getCmp(prototype.id + '-cmbDateToMonth').setValue(monthActual); 

        Ext.getCmp(prototype.id + '-cmbDateFromDay').setValue("");
        Ext.getCmp(prototype.id + '-cmbDateToDay').setValue("");
        
        Ext.getCmp(prototype.id + '-cmbDateUploadFromYear').bindStore(win.getStoreYear(true));
        Ext.getCmp(prototype.id + '-cmbDateUploadToYear').bindStore(win.getStoreYear(true));
        Ext.getCmp(prototype.id + '-cmbDateUploadFromMonth').bindStore(win.getStoreMonth(true));
        Ext.getCmp(prototype.id + '-cmbDateUploadToMonth').bindStore(win.getStoreMonth(true));
        Ext.getCmp(prototype.id + '-cmbDateUploadFromDay').bindStore(win.getStoreDays(true));
        Ext.getCmp(prototype.id + '-cmbDateUploadToDay').bindStore(win.getStoreDays(true));
        
        Ext.getCmp(prototype.id + '-cmbDateUploadFromYear').setValue("");
        Ext.getCmp(prototype.id + '-cmbDateUploadToYear').setValue("");

        Ext.getCmp(prototype.id + '-cmbDateUploadFromMonth').setValue(""); 
        Ext.getCmp(prototype.id + '-cmbDateUploadToMonth').setValue(""); 

        Ext.getCmp(prototype.id + '-cmbDateUploadFromDay').setValue("");
        Ext.getCmp(prototype.id + '-cmbDateUploadToDay').setValue("");
        
        this.paramsObtainData.COUNTRY = 2;
        this.paramsObtainData.IN_PF122CODPR = 2;
        Ext.Ajax.request({
            url: prototype.urlMaster + '/obtainData',
            method: 'POST',
            timeout: 60000000,
            params: {
                beanString: JSON.stringify(this.paramsObtainData)
            },
            success: function (response, options) {
                
                var res = Ext.JSON.decode(response.responseText);
                console.log(res,'res')
                me.lstCountry = res.lstCountry;
                me.lstProcessor = res.listaProcesadores;

                var storeData3 = Ext.create('Ext.data.Store', {
                    data: me.lstCountry,
                    autoLoad: true
                });
                Ext.getCmp(prototype.id + '-cmbCountry').bindStore(storeData3);
                Ext.getCmp(prototype.id + '-cmbCountry').setValue('');
                
                var storeData4 = Ext.create('Ext.data.Store', {
                    data: me.lstProcessor,
                    autoLoad: true
                });
                
                Ext.getCmp(prototype.id + '-cmbProcessor').bindStore(storeData4);
                Ext.getCmp(prototype.id + '-cmbProcessor').setValue('');
                
                global.clear();
            }
        });
        
        
    },
    btnSearch_click: function (obj, e) {
        me.setFormatParameter();
        me.setGridData();
    },
    setFormatParameter: function () {
        me.bean = {};

        // Valdate From
        me.bean.IN_FROM_VALDATE = me.buildDate(
            Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue(),
            Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue(),
            Ext.getCmp(prototype.id + '-cmbDateFromDay').getValue()
        );

        me.bean.IN_FROM_VALDATE = '20251101'

        // Valdate To
        me.bean.IN_TO_VALDATE = me.buildDate(
            Ext.getCmp(prototype.id + '-cmbDateToYear').getValue(),
            Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue(),
            Ext.getCmp(prototype.id + '-cmbDateToDay').getValue()
        );
        me.bean.IN_TO_VALDATE = '20251130'
        // Upload File From
        me.bean.IN_FROM_UP = me.buildDate(
            Ext.getCmp(prototype.id + '-cmbDateUploadFromYear').getValue(),
            Ext.getCmp(prototype.id + '-cmbDateUploadFromMonth').getValue(),
            Ext.getCmp(prototype.id + '-cmbDateUploadFromDay').getValue()
        );

        // Upload File To
        me.bean.IN_TO_UP = me.buildDate(
            Ext.getCmp(prototype.id + '-cmbDateUploadToYear').getValue(),
            Ext.getCmp(prototype.id + '-cmbDateUploadToMonth').getValue(),
            Ext.getCmp(prototype.id + '-cmbDateUploadToDay').getValue()
        );

        // Additional Accounting
        me.bean.IN_ACCID   = Ext.getCmp(prototype.id + '-txtIAccountingID').getValue() || '';
        me.bean.IN_CORREAV   = Ext.getCmp(prototype.id + '-txtICorreAV').getValue() || '';
        me.bean.IN_BANDOC   = Ext.getCmp(prototype.id + '-txtBandoc').getValue() || '';
        me.bean.IN_REFER   = Ext.getCmp(prototype.id + '-txtReferencia').getValue() || '';
        me.bean.IN_STATUSAP   = Ext.getCmp(prototype.id + '-cmbStatusSap').getValue() || '';
        
        // Additional Extract
        me.bean.IN_SOCIETY   = Ext.getCmp(prototype.id + '-typeSociety').getValue() || '';
        me.bean.IN_PROCESSOR   = Ext.getCmp(prototype.id + '-cmbProcessor').getValue() || '';
        me.bean.IN_STATUS = Ext.getCmp(prototype.id + '-cmbStatus').getValue() || '';

        var beanString = JSON.stringify(me.bean);
        searchParams = {
            bean: me.bean,
            beanString: beanString
        };

        console.log(searchParams, 'searchParams');
    },
    setGridData: function () {
        win.lblUser_toolTip("Estructura: MPF218");
//        me.panelActual = '-panelGridDataDetail';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        me.setWidthPie();
        
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/search'
                }, listeners: {
                    beforeload: function (obj) {
                        obj.proxy.extraParams = searchParams;
                    },
                    load: function (obj) {
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
            Ext.getCmp(prototype.id + '-gridDataDetail').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
        
    },
    btnExcel_click: function (obj, e) {
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
    },
    exportExcel: function () {
        switch (me.panelActual) {
             case  '-panelGridDataDetail':
                global.getFile(prototype.url + '/getXLSXDetail?beanString=' + encodeURI(searchParams.beanString));
                break;
            default:
                global.Msg(
                        {msg: 'Under Construction'
                        });
        }

    },
    buildDate: function (y, m, d) {
        y = y || '';
        m = m || '';
        d = d || '';

        if (!y || !m) {
            return '';
        }

        return y + m + d;
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
//        console.log('btnFilter_click');
        var option = Ext.getCmp(prototype.id + '-contentFilter');
        if (option.isVisible()) {
            option.setVisible(false);
        } else {
            option.setVisible(true);
        }
    },
    getPaggin: function () {
        me.pagginActual = '';
        console.log(me.panelActual,'me.panelActual')
        switch (me.panelActual) {
            case  '-panelGridDataDetail':
                me.pagginActual = '-paggin';
                Ext.getCmp(prototype.id + '-pie').setVisible(true);
                break;
        }
    },
    // <editor-fold defaultstate="collapsed" desc="Funciones para la paginacion ">
    pagFirst: function (obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.moveFirst();
    },
    pagPrevious: function (obj, e) {
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
    },
    selectComboFromYear: function (obj) {
        var comboToYear = Ext.getCmp(prototype.id + '-cmbDateToYear');
        var storeComboDataYear = win.getStoreYear2(false, obj.getValue());
        let comboFromYear = Ext.getCmp(prototype.id + '-cmbDateFromYear');
        let comboFromMonth = Ext.getCmp(prototype.id + '-cmbDateFromMonth');
        let comboToMonth = Ext.getCmp(prototype.id + '-cmbDateToMonth');
        comboToYear.bindStore(storeComboDataYear);
        comboToYear.setValue(obj.getValue());
        if( comboToYear.getValue() <= comboFromYear.getValue() && comboToMonth.getValue() < comboFromMonth.getValue() ){
            comboFromMonth.setValue(comboToMonth.getValue())
        }
    },
    selectComboToYear: function (obj) {
        let comboFromYear = Ext.getCmp(prototype.id + '-cmbDateFromYear');
        let comboToYear = Ext.getCmp(prototype.id + '-cmbDateToYear');
        let comboFromMonth = Ext.getCmp(prototype.id + '-cmbDateFromMonth');
        let comboToMonth = Ext.getCmp(prototype.id + '-cmbDateToMonth');
        if( comboToYear.getValue() < comboFromYear.getValue()  ){
           comboFromYear.setValue(comboToYear.getValue()); 
        }
        if( comboToYear.getValue() <= comboFromYear.getValue() && comboToMonth.getValue() < comboFromMonth.getValue() ){
            comboFromMonth.setValue(comboToMonth.getValue())
        }
    },
    selectComboFromMonth: function (obj) {
        var comboToMonth = Ext.getCmp(prototype.id + '-cmbDateToMonth');
        comboToMonth.setValue(obj.getValue());
    },
    selectComboToMonth: function (obj) {
        var comboFromYear = Ext.getCmp(prototype.id + '-cmbDateFromYear');
        var comboToYear = Ext.getCmp(prototype.id + '-cmbDateToYear');
        var comboFromMonth = Ext.getCmp(prototype.id + '-cmbDateFromMonth');
        if (comboFromYear.getValue() === comboToYear.getValue()) {
            if (obj.getValue() < comboFromMonth.getValue()) {
                comboFromMonth.setValue(obj.getValue());
            }
        }
    },
    selectComboFromDay: function (obj) {
        var comboToDay = Ext.getCmp(prototype.id + '-cmbDateToDay');
        comboToDay.setValue(obj.getValue());
    },
    selectComboToDay: function (obj) {
        var comboFromYear = Ext.getCmp(prototype.id + '-cmbDateFromYear');
        var comboToYear = Ext.getCmp(prototype.id + '-cmbDateToYear');
        var comboFromMonth = Ext.getCmp(prototype.id + '-cmbDateFromMonth');
        var comboToMonth = Ext.getCmp(prototype.id + '-cmbDateToMonth');
        var comboFromDay = Ext.getCmp(prototype.id + '-cmbDateDay');
        if (comboFromMonth.getValue() === comboToMonth.getValue()) {
            if (obj.getValue() < comboFromDay.getValue()) {
                comboFromDay.setValue(obj.getValue());
            }
        }
        if(comboFromDay.getValue() === ''){
            comboFromDay.setValue(obj.getValue());
        }
    },
    getPeriodoYYYYMM: function(strFormatDate) {
        if (!strFormatDate) return null;

        let [anio, mesTxt] = strFormatDate.split('-');
        const meses = {
            Jan: '01', Feb: '02', Mar: '03', Apr: '04',
            May: '05', Jun: '06', Jul: '07', Aug: '08',
            Sep: '09', Oct: '10', Nov: '11', Dec: '12'
        };
        return anio + (meses[mesTxt] || '00');
    },
    onUpperValue: function (obj, e, eOpts) {
        let value = obj.getValue().toUpperCase();
        obj.setValue(value);
    },
    setWidthPie: function () {
        var ancho = Ext.getCmp(prototype.id + me.panelActual).getWidth();
        Ext.getCmp(prototype.id + '-pie').setWidth(ancho);
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
    // </editor-fold>
    eventKey: function (e, eOpts) {
        if (eOpts.getKey() === 13) {
            this.btnSearch_click();
        }
    },
    onDownloadCSV: function (column, e, row, colIndex, x, rowData) {
        let data = rowData.data;
        const country  = data.COUNTRY;
        const dateSett = data.DATESETT;
        const customer    = data.CUSTOMER;

        if (!country || !dateSett || !customer) {
            Ext.Msg.alert('Error', 'Faltan parámetros para la descarga (Country, Customer o Settlement Date).');
            return;
        }

        const url = prototype.url + '/getCSV'
            + '?country=' + encodeURIComponent(country)
            + '&dateSett='    + encodeURIComponent(dateSett)
            + '&customer='   + encodeURIComponent(customer);

        console.log('Solicitando:', url);

        global.getFile(url); 
    },
    onDownloadAllCSV: function () {
        if (!searchParams || !searchParams.beanString) {
            Ext.Msg.alert("Error", "Debe realizar una búsqueda antes de descargar.");
            return;
        }

        const url = prototype.url + "/getBulkCSV";
        console.log("Solicitando ZIP con filtros:", searchParams);

        this.getFileByPost(url, { beanString: searchParams.beanString });
    },
    getFileByPost : function (url, params) {
        var form = document.createElement("form");
        form.setAttribute("method", "POST");
        form.setAttribute("action", url);
        form.setAttribute("target", "_blank");

        for (var key in params) {
            if (params.hasOwnProperty(key)) {
                var hiddenField = document.createElement("input");
                hiddenField.setAttribute("type", "hidden");
                hiddenField.setAttribute("name", key);
                hiddenField.setAttribute("value", params[key]);
                form.appendChild(hiddenField);
            }
        }

        document.body.appendChild(form);
        form.submit();
        form.remove();
    }


}
);