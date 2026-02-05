/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.payments.Outputs.OutputsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.OutputsController',
    fecha: new Date(),
    childs: '5',
    bean: '',
    paginActual: '',
    drillDown: [],
    lstCountry: [],
    gridActual: '',
    panelActual: '',
    fileName: '',
    me: '',
    searchParams: {},
    paramsDetail: {},
    paramsObtainData: {},
    dataObtain: {},
    init: function (view) {
        me = this;
        prototype.id = 'OutputsForm';
        prototype.url = CONTEXTPATH + '/Outputs';
        this.childs = Ext.getCmp(prototype.id + '-panelMain').items.items;
        me.panelActual = '-panelGridData';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
//        this.obtainData();
        //this.cmbFind_changeHandler();

        this.control({
            //   -------------------Eventos Genericos --------------------
            '#OutputsForm-xpanel': {
                afterrender: this.xpanel_afterrender
            },
            '#OutputsForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#OutputsForm-btnClear': {
                click: this.btnClear_click
            },
            '#OutputsForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#OutputsForm-btnTxtLIQUI': {
                click: this.btnTxt_clickLIQUI
            },
            '#OutputsForm-btnTxtSALE': {
                click: this.btnTxt_clickSALE
            },
            '#OutputsForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#OutputsForm-btnAdd': {
                click: this.btnAdd_click
            },
            '#OutputsForm-btnBack': {
                click: this.btnBack_click
            },
            '#OutputsForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#OutputsForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#OutputsForm-btn-pag-next': {
                click: this.pagNext
            },
            '#OutputsForm-btn-pag-last': {
                click: this.pagLast
            },
//            //-----------------Eventos Especificos -------------------          
            '#BankReconciliationForm-cmbDateFromYear': {
                select: this.selectComboFromYear
            },
            '#BankReconciliationForm-cmbDateFromMonth': {
                select: this.selectComboFromMonth
            },
            '#BankReconciliationForm-cmbDateToMonth': {
                select: this.selectComboToMonth
            },
        });
    },
    xpanel_afterrender: function () {
        $('#OutputsForm-btnToggleSwitch').change(function () {
            me.procesador();
        });

        $('#OutputsForm-btnToggleSwitchPayment').change(function () {
            me.viewCashFilter();
        });

        this.setStoreData();
    },

    procesador: function () {
        console.log('switch');
        let proces = Ext.getCmp(prototype.id + '-cmbCores');
        if (!proces.isVisible()) {
            Ext.getCmp(prototype.id + '-PRO').show();
            Ext.getCmp(prototype.id + '-cmbCores').show();

        } else {
            Ext.getCmp(prototype.id + '-PRO').hide();
            Ext.getCmp(prototype.id + '-cmbCores').hide();
        }
    },
    viewCashFilter: function () {
        let me = this;

        const toggleContainer = Ext.getCmp(prototype.id + '-btnToggleSwitchPayment');
        if (!toggleContainer) {
            console.error('Toggle no encontrado');
            return;
        }

        const toggleEl = toggleContainer.getEl();
        if (!toggleEl)
            return;

        const inputEl = toggleEl.down('input.toggle-input');
        if (!inputEl)
            return;

        const isCashMode = inputEl.dom.checked; // true = CREDITO, false = CASH

        const toggleContainerExtCo = Ext.getCmp(prototype.id + '-btnToggleSwitch');
        if (!toggleContainerExtCo) {
            console.error('Toggle Colombia/Exterior no encontrado');
            return;
        }

        const toggleElExtCo = toggleContainerExtCo.getEl();
        if (!toggleElExtCo)  // ← CORREGIDO: debe ser toggleElExtCo, no toggleEl
            return;

        const inputElExtCo = toggleElExtCo.down('input.toggle-input');
        if (!inputElExtCo)  // ← CORREGIDO: debe ser inputElExtCo, no inputEl
            return;

        const isExteriorMode = inputElExtCo.dom.checked; // true = EXTERIOR, false = COLOMBIA

        console.log('Modo actual:', isCashMode ? 'CREDITO' : 'CASH');
        console.log('Modo Colombia/Exterior:', isExteriorMode ? 'EXTERIOR' : 'COLOMBIA');
        console.log(isExteriorMode, 'isExteriorMode');

        // Pasar ambos parámetros
        me.togglePaymentComponents(isCashMode, isExteriorMode);
    },

    togglePaymentComponents: function (isCreditMode, isExteriorMode) {

        const componentsCashCredit = [
            '-COL', // Label Colombia
            '-btnToggleSwitch', // Toggle interior/exterior  
            '-EXT', // Label Exterior
            '-btnTxtLIQUI', // Botón Settlement TXT
//            '-btnTxtSALE', // Botón Sales TXT
            '-txtLIQUI',
//            '-txtSALE'
        ];

        componentsCashCredit.forEach(componentId => {
            const cmp = Ext.getCmp(prototype.id + componentId);
            if (cmp) {
                cmp.setVisible(isCreditMode);
            }
        });

        const proLabel = Ext.getCmp(prototype.id + '-PRO');
        const cmbCores = Ext.getCmp(prototype.id + '-cmbCores');

        if (proLabel) {
            proLabel.setVisible(isCreditMode && isExteriorMode);
        }

        if (cmbCores) {
            cmbCores.setVisible(isCreditMode && isExteriorMode);
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
    //<editor-fold defaultstate="collapsed" desc="setStoreData">
    setStoreData: function () {

        var month = this.fecha.getMonth() + 1;

        if (month < 10) {
            month = '0' + month;
        }

        Ext.getCmp(prototype.id + '-cmbDateFromYear').bindStore(win.getStoreYear(false));
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').bindStore(win.getStoreMonth(true));

        Ext.getCmp(prototype.id + '-cmbDateFromYear').setValue(this.fecha.getFullYear());

        Ext.getCmp(prototype.id + '-cmbDateFromMonth').setValue(month);

        var cmbFecFiltro = Ext.getCmp(prototype.id + '-cmbFecFiltro');
        cmbFecFiltro.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["PRDA", "Processing Date"],
            ]
        }));
        cmbFecFiltro.setValue("PRDA");

        var cmbClient = Ext.getCmp(prototype.id + '-cmbClient');
        cmbClient.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['CODE', 'NAME'],
            data: [
                ["", "All"],
                ["134", "AVIANCA"],
                ["202", "TACA"],
                ["133", "LACSA"],
                ["547", "AEROGAL"]
            ]
        }));
        cmbClient.setValue("134");

//        Ext.getCmp(prototype.id + '-cmbCores').setValue("");
        Ext.Ajax.request({
            url: prototype.url + '/obtainCores',
            method: 'POST',
            timeout: 60000000,
            params: {},
            success: function (response, opts) {
                var res = Ext.JSON.decode(response.responseText);
                console.log(res);
                if (res.success) {
                    var storeData = Ext.create('Ext.data.Store', {
                        data: res.data,
                        autoLoad: true
                    });
                    Ext.getCmp(prototype.id + '-cmbCores').bindStore(storeData);
                    Ext.getCmp(prototype.id + '-cmbCores').setValue('');
                } else {
                    global.Msg({msg: res.Mensaje});
                }
            },
            failure: function (response, opts) {
                console.log('server-side failure with status code ' + response.status);

            }
        });

        this.paramsObtainData.USERPERMIS = 2;
        this.paramsObtainData.NPROG = sessionStorage.getItem('nprog');
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
                if (true) {
                    Ext.getCmp(prototype.id + '-btn-bill').show();
                } else {
                    Ext.getCmp(prototype.id + '-btn-bill').hide();
                }
                global.clear();

            }
        });

    },
    //</editor-fold>

    setFormatParameter: function () {
        me.bean = {};
        me.bean.IN_PRDA = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue() + Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue();
        me.bean.IN_DATE = Ext.getCmp(prototype.id + '-cmbFecFiltro').getValue();
        me.bean.IN_CCUST = Ext.getCmp(prototype.id + '-cmbClient').getValue();
        me.bean.IN_CASH = me.getPaymentMode() ? 'N' : 'Y';
        let proces = Ext.getCmp(prototype.id + '-cmbCores');
        if (!proces.isVisible()) {
            //solo es colombia
            me.bean.IN_FUENTE = 'C';
        } else {
            //exterior
            me.bean.IN_FUENTE = 'E';
            me.bean.IN_CORE = Ext.getCmp(prototype.id + '-cmbCores').getValue();
        }

        var beanString = JSON.stringify(me.bean);
        console.log(me.bean);
        searchParams = {
            bean: me.bean,
            beanString: beanString
        };

    },
    btnSearch_click: function (obj, e) {
//        this.setFormatParameter();
//        this.setGridData();
    },
    // <editor-fold defaultstate="collapsed" desc="setGridData">
    setGridData: function () {
        win.lblUser_toolTip("Estructura: ");
        me.panelActual = '-panelGridData';
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
        Ext.getCmp(prototype.id + '-gridData').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);

    },
    // </editor-fold>

    btnAdd_click: function () {
        this.winDataEntry('I');
    },
    onEditClick: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        this.winDataEntry('U', rec);
    },
    getLastDayOfMonth: function (inPrda) {

        const year = parseInt(inPrda.substring(0, 4), 10);
        const month = parseInt(inPrda.substring(4, 6), 10);
        const lastDay = new Date(year, month, 0);
        const formattedDate = `${lastDay.getFullYear()}${(lastDay.getMonth() + 1).toString().padStart(2, '0')}${lastDay.getDate().toString().padStart(2, '0')}`;
        return formattedDate;
    },
    winDataEntry: function (action, rec) {
        action = action === null || action === undefined ? 'U' : action;
        rec = rec === null || rec === undefined ? {} : rec;

        Ext.create('Ext.Praxis.view.payments.OutputsForm.DataEntry', {
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
    btnClear_click: function (obj, e) {
//        Ext.getCmp(prototype.id + '-cmbCode').setValue('');
//        Ext.getCmp(prototype.id + '-txtMERCHN').setValue('');
//        Ext.getCmp(prototype.id + '-txtCODEM').setValue('');

    },
    getPaymentMode: function () {
        const toggleContainer = Ext.getCmp(prototype.id + '-btnToggleSwitchPayment');
        if (!toggleContainer)
            return true;

        const toggleEl = toggleContainer.getEl();
        if (!toggleEl)
            return true;

        const inputEl = toggleEl.down('input.toggle-input');
        if (!inputEl)
            return true;

        return inputEl.dom.checked;
    },
    onBill: function (obj, e) {
        let beanProcess = {}
        beanProcess.IN_PRDA = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue() + Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue();
        beanProcess.IN_DATE = Ext.getCmp(prototype.id + '-cmbFecFiltro').getValue();
        beanProcess.IN_CCUST = Ext.getCmp(prototype.id + '-cmbClient').getValue();
        let proces = Ext.getCmp(prototype.id + '-cmbCores');
        if (!proces.isVisible()) {
            //solo es colombia
            beanProcess.IN_FUENTE = 'C';
            beanProcess.IN_CORE = "";
        } else {
            //exterior
            beanProcess.IN_FUENTE = 'E';
            beanProcess.IN_CORE = Ext.getCmp(prototype.id + '-cmbCores').getValue();
        }
        beanProcess.IN_LDATE = this.getLastDayOfMonth(beanProcess.IN_PRDA);
        beanProcess.IN_CASH = me.getPaymentMode() ? 'N' : 'Y';
        
        console.log(beanProcess,'beanProcess')
        
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Process billing?',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function (btn) {
                if (btn === 'yes') {
                    let beanString = JSON.stringify(beanProcess);
                    Ext.Ajax.request({
                        url: prototype.url + '/updateBilledMPF100',
                        method: 'POST',
                        timeout: 60000000,
                        beforerequest: Ext.getCmp(prototype.id + '-panelGridData').mask('Loading...'),
                        params: {beanString: beanString},

                        success: function (response) {
                            var res = Ext.decode(response.responseText);
                            console.log(res);
                            if (res.success) {

                                let objResult = res.result;
                                global.Msg({msg: objResult.MESSAGE});
                                Ext.getCmp(prototype.id + '-panelGridData').unmask()

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

    btnExcel_click: function (obj, e) {

        this.setFormatParameter();
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
//        }
    },
    btnTxt_clickLIQUI: function (obj, e) {

        this.setFormatParameter();
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Download Txt ?',
            buttons: Ext.MessageBox.OKCANCEL,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function (btn) {
                if (btn === 'ok') {
                    this.exportTxtLIQUI();
                }
            }
        });
    },
    exportTxtLIQUI: function () {

        this.setFormatParameter();
        switch (me.panelActual) {
            case  '-panelGridData':
                global.getFile(prototype.url + '/getTXT?beanString=' + encodeURI(searchParams.beanString));
                break;
            default:
                global.Msg(
                        {msg: 'Under Construction'
                        });
        }

    },
    btnTxt_clickSALE: function (obj, e) {

        this.setFormatParameter();
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Download Txt ?',
            buttons: Ext.MessageBox.OKCANCEL,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function (btn) {
                if (btn === 'ok') {
                    this.exportTxtSALE();
                }
            }
        });
    },
    exportTxtSALE: function () {

        this.setFormatParameter();
        switch (me.panelActual) {
            case  '-panelGridData':
                global.getFile(prototype.url + '/getTXT100?beanString=' + encodeURI(searchParams.beanString));
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
        var ancho = Ext.getCmp(prototype.id + me.panelActual).getWidth();
        Ext.getCmp(prototype.id + '-pie').setWidth(ancho);
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
