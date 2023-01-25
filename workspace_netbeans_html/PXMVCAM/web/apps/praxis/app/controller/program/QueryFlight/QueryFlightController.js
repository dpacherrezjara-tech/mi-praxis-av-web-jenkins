Ext.define('Ext.Praxis.controller.program.QueryFlight.QueryFlightController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.QueryFlightController',
    p: '',
    fecha: new Date(),
    searchParams: {},
    _path: '',
    _pathExcelInteract: '',
    _pathQtySummary: '',
    anterior: '',
    anterior_title: '',
    lstCampos: '',
    data: {},
    init: function (view) {
        prototype.id = 'QueryFlightForm';
        prototype.url = CONTEXTPATH + '/QueryFlight';
        prototype.widthContenedor = 1440;
//        prototype.widthGrid = 1390;
//        prototype.widthGridDetail = 1110;
        prototype.widthGridQtySummary = 1000;
        prototype.widthGridDetQtySum = 1425;
        prototype.widthGridDetQtySummVal = 970;
//        prototype.widthGridConsolid = 1351;
//        prototype.widthGridConsolidByDay = 1280;
//        prototype.widthGridConsolidByNFLIGHT = 1170;
//        prototype.widthGridDetTicketContab = 1280;
        this.p = Ext.urlDecode(window.location.search.substring(1));
        console.log(JSON.parse(this.p.data));
    },
    afterRender: function () {
        this.obtainDataCombo();
        this.setStoreData();
        this.btnClear_click();
//        this.btnSearch_click();
    },
    startDisplay: function (strBackPro, beandisplayFilter) {
        
    },
    //<editor-fold defaultstate="collapsed" desc="obtainDataCombo">
    obtainDataCombo: function () {
        var operadores = new Array(), campos = new Array();
        var store;
        Ext.Ajax.request({
            url: prototype.url + '/obtainDataCombo',
            method: 'POST',
            timeout: 60000000,
            success: function (response, options) {
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    var lstOperadores = res.lstOperadores;
                    // <editor-fold defaultstate="collapsed" desc="cargar operadores">
                    operadores.push(['', 'All']);
                    lstOperadores.forEach(function callback(currentValue, index, array) {
                        operadores.push([currentValue.USERFIELD, currentValue.USERFIELD]);
                    });
                    store = Ext.create('Ext.data.ArrayStore', {
                        storeId: 'operadores', autoLoad: true, data: operadores, fields: ['code', 'name']
                    });
                    Ext.getCmp(prototype.id + '-cmbOperador1').bindStore(store);
                    Ext.getCmp(prototype.id + '-cmbOperador2').bindStore(store);
                    Ext.getCmp(prototype.id + '-cmbOperador3').bindStore(store);
                    Ext.getCmp(prototype.id + '-cmbOperador4').bindStore(store);
                    // </editor-fold>
                    
                    lstCampos = res.lstCampos;
                    // <editor-fold defaultstate="collapsed" desc="cargar campos">
                    campos.push(['', 'All']);
                    lstCampos.forEach(function callback(currentValue, index, array) {
                        var lblDes = currentValue.TABNAME === 'A1691'?'Manifest':'Cupon';
                        campos.push([currentValue.SYSTFIELD, currentValue.USERFIELD + ' - ' + currentValue.DESCRIPT + ' - ' + lblDes]);
                    });
                    store = Ext.create('Ext.data.ArrayStore', {
                        storeId: 'campos', autoLoad: true, data: campos, fields: ['code', 'name']
                    });
                    Ext.getCmp(prototype.id + '-cmbCampo1').bindStore(store);
                    Ext.getCmp(prototype.id + '-cmbCampo2').bindStore(store);
                    Ext.getCmp(prototype.id + '-cmbCampo3').bindStore(store);
                    Ext.getCmp(prototype.id + '-cmbCampo4').bindStore(store);
                    // </editor-fold>
                } else {
                    global.Msg({
                        msg: res.sesion
                    });
                }
            },
            failure: function (response, opts) {
                console.log('server-side failure with status code ' + response.status);
            }
        });
    },
    //</editor-fold>
    btnImgInfo_click: function (cmp, e, eOpts) {
        switch (cmp.id) {
            case prototype.id + '-imgInfo1':
                // <editor-fold defaultstate="collapsed" desc="imgInfo1">
                var txtCampo1 = Ext.getCmp(prototype.id + '-txtCampo1');
                var cmbCampo1 = Ext.getCmp(prototype.id + '-cmbCampo1');
                if (txtCampo1.isVisible()) {
                    txtCampo1.hide();
                    cmbCampo1.show();
                } else {
                    txtCampo1.show();
                    cmbCampo1.hide();
                    var value = cmbCampo1.getRawValue();
                    if (value !== '' && value !== 'All') {
                        txtCampo1.setValue(value.substring(0, value.indexOf("-")-1));
                    }
                }
                // </editor-fold>
                break;
            case prototype.id + '-imgInfo2':
                // <editor-fold defaultstate="collapsed" desc="imgInfo2">
                var txtCampo2 = Ext.getCmp(prototype.id + '-txtCampo2');
                var cmbCampo2 = Ext.getCmp(prototype.id + '-cmbCampo2');
                if (txtCampo2.isVisible()) {
                    txtCampo2.hide();
                    cmbCampo2.show();
                } else {
                    txtCampo2.show();
                    cmbCampo2.hide();
                    var value = cmbCampo2.getRawValue();
                    if (value !== '' && value !== 'All') {
                        txtCampo2.setValue(value.substring(0, value.indexOf("-")-1));
                    }
                }
                // </editor-fold>
                break;
            case prototype.id + '-imgInfo3':
                // <editor-fold defaultstate="collapsed" desc="imgInfo3">
                var txtCampo3 = Ext.getCmp(prototype.id + '-txtCampo3');
                var cmbCampo3 = Ext.getCmp(prototype.id + '-cmbCampo3');
                if (txtCampo3.isVisible()) {
                    txtCampo3.hide();
                    cmbCampo3.show();
                } else {
                    txtCampo3.show();
                    cmbCampo3.hide();
                    var value = cmbCampo3.getRawValue();
                    if (value !== '' && value !== 'All') {
                        txtCampo3.setValue(value.substring(0, value.indexOf("-")-1));
                    }
                }
                // </editor-fold>
                break;
            case prototype.id + '-imgInfo4':
                // <editor-fold defaultstate="collapsed" desc="imgInfo4">
                var txtCampo4 = Ext.getCmp(prototype.id + '-txtCampo4');
                var cmbCampo4 = Ext.getCmp(prototype.id + '-cmbCampo4');
                if (txtCampo4.isVisible()) {
                    txtCampo4.hide();
                    cmbCampo4.show();
                } else {
                    txtCampo4.show();
                    cmbCampo4.hide();
                    var value = cmbCampo4.getRawValue();
                    if (value !== '' && value !== 'All') {
                        txtCampo4.setValue(value.substring(0, value.indexOf("-")-1));
                    }
                }
                // </editor-fold>
                break;
        }
    },
    onCmbActionChange: function (cmp, newValue, oldValue, eOpts) {
        if (newValue === 'INTERACT') Ext.getCmp(prototype.id + '-btnOK').show();
        else Ext.getCmp(prototype.id + '-btnOK').hide();
    },
    btnOK_click: function (cmp, e, eOpts) {
        // <editor-fold defaultstate="collapsed" desc="Clear Combo Date">
        Ext.getCmp(prototype.id + '-cmbDateFromDay').setValue(new Date().getDate()-1);
        Ext.getCmp(prototype.id + '-cmbDateToDay').setValue(new Date().getDate()-1);
        var mes = new Date().getMonth() + 1;
        if (mes < 10) mes = "0" + mes;
        Ext.getCmp(prototype.id + '-cmbDateMonth').setValue(mes);
        Ext.getCmp(prototype.id + '-cmbDateYear').setValue(new Date().getFullYear());
        // </editor-fold>
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Download Excel ?',
            buttons: Ext.MessageBox.OKCANCEL,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function (btn) {
                if (btn === 'ok') {
                    this.setFormatParameterExcelInteract();
                    global.getFile(_pathExcelInteract);
                }
            }
        });
    },
    btnImgInfoHelp_click: function (cmp, e, eOpts) {
        Ext.create('Ext.Praxis.view.program.QueryFlightForm.DataEntry', {
            id: 'DataEntryQueryFlightForm',
            params: {
                lstCampos: lstCampos
            }
        }).show();
    },
    onSummary1Change: function (cmp, newValue, oldValue, eOpts) {
        this.btnSearch_click();
    },
    onSummary2Change: function (cmp, newValue, oldValue, eOpts) {
        Ext.getCmp(prototype.id+'-chkSummary').setValue(0);
        this.btnSearch_click();
    },
    onContabChange: function (combo, newValue, oldValue, eOpts) {
        if (Ext.getCmp(prototype.id+'-boxDetTicketContab').isVisible()) {
            var strFCLOFO = this.getValue('cmbContab');
            searchParams = {};
            searchParams = {
                DFLIGHT: this.data.DFLIGHT,
                NFLIGHT: this.data.NFLIGHT,
                strFCLOFO: strFCLOFO,
                CARRI: this.data.CARRI
            };
            this.setGridDataDetTicketContab(); 
        }
    },
    // <editor-fold defaultstate="collapsed" desc="Combo Date">
    onYearChange: function (combo, newValue, oldValue, eOpts) {
        var comboMonth = Ext.getCmp(prototype.id + '-cmbDateMonth');
        var comboFromDay = Ext.getCmp(prototype.id + '-cmbDateFromDay');
        var comboToDay = Ext.getCmp(prototype.id + '-cmbDateToDay');
        if (newValue !== '') {
            if (this.getValue("cmbDateMonth") === '02') {
                var store = win.getStoreDays2(true, newValue, 1);
                comboFromDay.bindStore(store);
                comboToDay.bindStore(store);
            }
        } else {
            comboMonth.setValue(newValue);
            comboFromDay.setValue(newValue);
            comboToDay.setValue(newValue);
        }
    },
    onMonthChange: function (combo, newValue, oldValue, eOpts) {
        var comboFromDay = Ext.getCmp(prototype.id + '-cmbDateFromDay');
        var comboToDay = Ext.getCmp(prototype.id + '-cmbDateToDay');
        if (newValue !== '') {
            var store = win.getStoreDays2(true, this.getValue("cmbDateYear"), Number(newValue) - 1);
            comboFromDay.bindStore(store);
            comboToDay.bindStore(store);
        } else {
            comboFromDay.setValue(newValue);
            comboToDay.setValue(newValue);
        }

    },
    onFromDayChange: function (combo, newValue, oldValue, eOpts) {
        var comboMonth = Ext.getCmp(prototype.id + '-cmbDateMonth');
        var comboFromDay = Ext.getCmp(prototype.id + '-cmbDateFromDay');
        var comboToDay = Ext.getCmp(prototype.id + '-cmbDateToDay');
        if (newValue !== '') {
            if (comboMonth.getValue() === '') {
                comboMonth.setValue('01');
            }
            if (newValue > comboToDay.getValue()) {
                comboToDay.setValue(newValue);
            }
        } else {
            comboFromDay.setValue(newValue);
            comboToDay.setValue(newValue);
        }
    },
    onToDayChange: function (combo, newValue, oldValue, eOpts) {
        var comboMonth = Ext.getCmp(prototype.id + '-cmbDateMonth');
        var comboFromDay = Ext.getCmp(prototype.id + '-cmbDateFromDay');
        var comboToDay = Ext.getCmp(prototype.id + '-cmbDateToDay');
        if (newValue !== '') {
            if (comboMonth.getValue() === '') {
                comboMonth.setValue('01');
            }
            if (newValue < comboFromDay.getValue()) {
                comboFromDay.setValue(newValue);
            }
        } else {
            comboFromDay.setValue(newValue);
            comboToDay.setValue(newValue);
        }
    },
    setStoreData: function () {
        var storeComboDataYear = win.getStoreYear(true);
        Ext.getCmp(prototype.id + '-cmbDateYear').bindStore(storeComboDataYear);

        var storeComboDataMonth = win.getStoreMonth(true);
        Ext.getCmp(prototype.id + '-cmbDateMonth').bindStore(storeComboDataMonth);

        var days = new Array();
        days.push(['', 'All']);
        Ext.getCmp(prototype.id + '-cmbDateFromDay').bindStore(
                Ext.create('Ext.data.ArrayStore', {
                    autoLoad: true,
                    data: days,
                    fields: ['code', 'name']
                })
                );
        Ext.getCmp(prototype.id + '-cmbDateToDay').bindStore(
                Ext.create('Ext.data.ArrayStore', {
                    autoLoad: true,
                    data: days,
                    fields: ['code', 'name']
                })
                );
    },
    // </editor-fold>

    // <editor-fold defaultstate="collapsed" desc="Info">
    // </editor-fold>

    // <editor-fold defaultstate="collapsed" desc="onViewClick">
    onViewDetTicketClick: function(column, e, row, column, x, rowData) {
        var data = x.record.data;
        this.setFormatParameterDetTicket(data);
        // <editor-fold defaultstate="collapsed" desc="preparar">
        Ext.getCmp(prototype.id+'-boxMainData').hide();
        Ext.getCmp(prototype.id+'-boxDetailData').show();
        // </editor-fold>
        this.setGridDataSearchDetTicket();
    },
    onViewDetTktSummaryClick: function(column, e, row, column, x, rowData) {
        var data = x.record.data;
        var dataIndex = Ext.getCmp(prototype.id + '-gridDataQtySumm').headerCt.getGridColumns()[column].dataIndex;
        var flag;
        switch (dataIndex) {
            case 'QCPCON': flag = 'C'; break;
            case 'QCPNCON': flag = 'N'; break;
        }
        this.setFormatParameterDetTktSummary(data, flag);
        // <editor-fold defaultstate="collapsed" desc="preparar">
        Ext.getCmp(prototype.id+'-boxQtySummary').setWidth(prototype.widthGridDetQtySum);
        Ext.getCmp(prototype.id+'-boxPaginacion').show();
        Ext.getCmp(prototype.id+'-gridDataQtySumm').hide();
        Ext.getCmp(prototype.id+'-gridDetQtySum').show();
        Ext.getCmp(prototype.id+'-pie3').show();
        // </editor-fold>
        anterior = 'gridDataQtySumm';
        this.setGridDataSearchDetTktSummary();
    },
    onViewDetTktSummValClick: function(column, e, row, column, x, rowData) {
        if (this.getValue("cmbTipoFecha")==='FCONT') {
            var data = x.record.data;
            this.setFormatParameterDetTktSummVal(data);
            // <editor-fold defaultstate="collapsed" desc="preparar">
            Ext.getCmp(prototype.id+'-boxQtySummary').setWidth(prototype.widthGridDetQtySummVal);
            Ext.getCmp(prototype.id+'-gridDataQtySumm').hide();
            Ext.getCmp(prototype.id+'-gridDetQtySummVal').show();
            // </editor-fold>
            this.setGridDataSearchDetTktSummVal();
        } else {
            global.Msg({
                msg: 'Drill Down only for Accounting Date.'
            });
        }
    },
    onViewDetSummValByTktClick: function(column, e, row, column, x, rowData) {
        var data = x.record.data;
        var dataIndex = Ext.getCmp(prototype.id + '-gridDetQtySummVal').headerCt.getGridColumns()[column].dataIndex;
        var flag;
        switch (dataIndex) {
            case 'QCPCON': flag = 'C'; break;
            case 'QCPNCON': flag = 'N'; break;
        }
        this.setFormatParameterDetSummValByTkt(data, flag);
        // <editor-fold defaultstate="collapsed" desc="preparar">
        Ext.getCmp(prototype.id+'-boxQtySummary').setWidth(prototype.widthGridDetQtySum);
        Ext.getCmp(prototype.id+'-boxPaginacion').show();
        Ext.getCmp(prototype.id+'-gridDetQtySummVal').hide();
        Ext.getCmp(prototype.id+'-gridDetQtySum').show();
        Ext.getCmp(prototype.id+'-pie3').show();
        // </editor-fold>
        anterior = 'gridDetQtySummVal';
        this.setGridDataSearchDetSummValByTkt();
    },
    onByNFLIGHT_Click: function(column, e, row, column, x, rowData) {
        var data = x.record.data;
        this.setFormatParameterConsolidByNFLIGHT(data);
        // <editor-fold defaultstate="collapsed" desc="preparar">
        Ext.getCmp(prototype.id+'-boxMainData').hide();
        Ext.getCmp(prototype.id+'-boxDetailData').hide();
        Ext.getCmp(prototype.id+'-boxQtySummary').hide();
        Ext.getCmp(prototype.id+'-boxConsolid').hide();
        Ext.getCmp(prototype.id+'-boxDetTicketContab').hide();
        Ext.getCmp(prototype.id+'-boxConsolidByNFLIGHT').show();
        // </editor-fold>
        this.setGridDataConsolidByNFLIGHT();
    },
    onByTKT_Click: function(column, e, row, column, x, rowData) {
        this.data = x.record.data;
        this.setFormatParameterDetTicketContab(this.data);
        // <editor-fold defaultstate="collapsed" desc="preparar">
        Ext.getCmp(prototype.id+'-boxMainData').hide();
        Ext.getCmp(prototype.id+'-boxDetailData').hide();
        Ext.getCmp(prototype.id+'-boxQtySummary').hide();
        Ext.getCmp(prototype.id+'-boxConsolid').hide();
        Ext.getCmp(prototype.id+'-boxConsolidByNFLIGHT').hide();
        Ext.getCmp(prototype.id+'-boxDetTicketContab').show();
        // </editor-fold>
        this.setGridDataDetTicketContab();
    },
    // </editor-fold>

    // <editor-fold defaultstate="collapsed" desc="Options">
    btnSearch_click: function (obj, e) {
        if (this.getValue("cmbDateYear")!=='' && this.getValue("cmbDateMonth")!=='') {
            if (this.getValue("cmbAction") === 'ACCSUM') {
                this.setFormatParameterQtySummary();
                // <editor-fold defaultstate="collapsed" desc="preparar">
                Ext.getCmp(prototype.id + '-lblFlightDate').hide();
                Ext.getCmp(prototype.id + '-cmbTipoFecha').show();
                
                Ext.getCmp(prototype.id+'-boxMainData').hide();
                Ext.getCmp(prototype.id+'-boxDetailData').hide();
                Ext.getCmp(prototype.id+'-boxConsolid').hide();
                Ext.getCmp(prototype.id+'-boxConsolidByNFLIGHT').hide();
                Ext.getCmp(prototype.id+'-boxDetTicketContab').hide();
                Ext.getCmp(prototype.id+'-boxQtySummary').show();
                
                Ext.getCmp(prototype.id+'-boxPaginacion').hide();
                Ext.getCmp(prototype.id+'-pie3').hide();
                Ext.getCmp(prototype.id+'-boxQtySummary').setWidth(prototype.widthGridQtySummary);
                Ext.getCmp(prototype.id+'-gridDetQtySummVal').hide();
                Ext.getCmp(prototype.id+'-gridDetQtySum').hide();
                Ext.getCmp(prototype.id+'-gridDataQtySumm').show();
                // </editor-fold>
                this.setGridDataQtySummary();
            } else {
                Ext.getCmp(prototype.id + '-lblFlightDate').show();
                Ext.getCmp(prototype.id + '-cmbTipoFecha').hide();
                if (this.getValue("cmbAction") === 'CONSOLIDATED') {
                    var strFCLOFO = '';
                    if (Ext.getCmp(prototype.id+'-chkSummary').getValue()) {
                        strFCLOFO = 'Y';
                    }
                    this.setFormatParameterConsolid(strFCLOFO);
                    // <editor-fold defaultstate="collapsed" desc="preparar">
                    Ext.getCmp(prototype.id+'-boxMainData').hide();
                    Ext.getCmp(prototype.id+'-boxDetailData').hide();
                    Ext.getCmp(prototype.id+'-boxQtySummary').hide();
                    Ext.getCmp(prototype.id+'-boxConsolidByNFLIGHT').hide();
                    Ext.getCmp(prototype.id+'-boxDetTicketContab').hide();
                    Ext.getCmp(prototype.id+'-boxConsolid').show();
                    // </editor-fold>
                    this.setGridDataConsolid(strFCLOFO);
                } else {
                    this.setFormatParameter();
                    // <editor-fold defaultstate="collapsed" desc="preparar">
                    Ext.getCmp(prototype.id+'-boxQtySummary').hide();
                    Ext.getCmp(prototype.id+'-boxDetailData').hide();
                    Ext.getCmp(prototype.id+'-boxConsolid').hide();
                    Ext.getCmp(prototype.id+'-boxConsolidByNFLIGHT').hide();
                    Ext.getCmp(prototype.id+'-boxDetTicketContab').hide();
                    Ext.getCmp(prototype.id+'-boxMainData').show();
                    // </editor-fold>
                    this.setGridData();
                }
            }
        } else {
            global.Msg({
                msg: 'Please enter all required fields.'
            });
        }
    },
    btnFilter_click: function () {
        var option = Ext.getCmp(prototype.id + '-contentFilter');
        if (option.isVisible()) option.hide();
        else option.show();
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
    btnClear_click: function (obj, e) {
        // <editor-fold defaultstate="collapsed" desc="Clear Combo Date">
        Ext.getCmp(prototype.id + '-cmbDateFromDay').setValue("");
        Ext.getCmp(prototype.id + '-cmbDateToDay').setValue("");
        var mes = new Date().getMonth() + 1;
        if (mes < 10) mes = "0" + mes;
        Ext.getCmp(prototype.id + '-cmbDateMonth').setValue(mes);
        Ext.getCmp(prototype.id + '-cmbDateYear').setValue(new Date().getFullYear());
        // </editor-fold>

        // <editor-fold defaultstate="collapsed" desc="Clear Campos">
        this.setValue("cmbTipoFecha", "DFLIGHT");
        this.setValue("txtCampo1", "");
        this.setValue("txtCampo2", "");
        this.setValue("txtCampo3", "");
        this.setValue("txtCampo4", "");
        this.setValue("cmbCampo1", "");
        this.setValue("cmbCampo2", "");
        this.setValue("cmbCampo3", "");
        this.setValue("cmbCampo4", "");
        this.setValue("cmbOperador1", "");
        this.setValue("cmbOperador2", "");
        this.setValue("cmbOperador3", "");
        this.setValue("cmbOperador4", "");
        this.setValue("txtValue1", "");
        this.setValue("txtValue2", "");
        this.setValue("txtValue3", "");
        this.setValue("txtValue4", "");
        this.setValue("cmbConector2", "AND");
        this.setValue("cmbConector3", "AND");
        this.setValue("cmbConector4", "AND");
        this.setValue("cmbAction", "INTERACT");
        // </editor-fold>
//        this.focus("cmp");

        // <editor-fold defaultstate="collapsed" desc="Clear Grilla">
        Ext.getCmp(prototype.id+'-gridData').getStore().removeAll();
        Ext.getCmp(prototype.id+'-lbl-currentPage').setText("1");
        Ext.getCmp(prototype.id+'-lbl-pageCount').setText("0");
        Ext.getCmp(prototype.id+'-lbl-total').setText("0");
        Ext.getCmp(prototype.id+'-gridDetTkt2').getStore().removeAll();
        Ext.getCmp(prototype.id+'-lbl-currentPage2').setText("1");
        Ext.getCmp(prototype.id+'-lbl-pageCount2').setText("0");
        Ext.getCmp(prototype.id+'-lbl-total2').setText("0");
        Ext.getCmp(prototype.id+'-gridDetQtySum').getStore().removeAll();
        Ext.getCmp(prototype.id+'-lbl-currentPage3').setText("1");
        Ext.getCmp(prototype.id+'-lbl-pageCount3').setText("0");
        Ext.getCmp(prototype.id+'-lbl-total3').setText("0");
        // </editor-fold>
        
        // <editor-fold defaultstate="collapsed" desc="show">
        Ext.getCmp(prototype.id+'-cmbCampo1').hide();
        Ext.getCmp(prototype.id+'-cmbCampo2').hide();
        Ext.getCmp(prototype.id+'-cmbCampo3').hide();
        Ext.getCmp(prototype.id+'-cmbCampo4').hide();
        Ext.getCmp(prototype.id+'-txtCampo1').show();
        Ext.getCmp(prototype.id+'-txtCampo2').show();
        Ext.getCmp(prototype.id+'-txtCampo3').show();
        Ext.getCmp(prototype.id+'-txtCampo4').show();
        Ext.getCmp(prototype.id+'-boxQtySummary').hide();
        Ext.getCmp(prototype.id+'-boxDetailData').hide();
        Ext.getCmp(prototype.id+'-boxConsolid').hide();
        Ext.getCmp(prototype.id+'-boxConsolidByNFLIGHT').hide();
        Ext.getCmp(prototype.id+'-boxDetTicketContab').hide();
        Ext.getCmp(prototype.id+'-boxMainData').show();
        // </editor-fold>
    },
    btnBack_click: function () {
        if (Ext.getCmp(prototype.id+'-boxMainData').isVisible()) {
            history.go(-1);
        } else if (Ext.getCmp(prototype.id+'-boxDetailData').isVisible()) {
            Ext.getCmp(prototype.id+'-boxDetailData').hide();
            Ext.getCmp(prototype.id+'-boxMainData').show();
        } else if (Ext.getCmp(prototype.id+'-boxQtySummary').isVisible()) {
            if (Ext.getCmp(prototype.id+'-gridDataQtySumm').isVisible()) {
                history.go(-1);
            } else if (Ext.getCmp(prototype.id+'-gridDetQtySum').isVisible()) {
                Ext.getCmp(prototype.id+'-boxPaginacion').hide();
                Ext.getCmp(prototype.id+'-pie3').hide();
                Ext.getCmp(prototype.id+'-gridDetQtySum').hide();
                if (anterior==='gridDataQtySumm') {
                    win.lblUser_toolTip("Estructura: A1691 /A1692");
                    Ext.getCmp(prototype.id+'-boxQtySummary').setWidth(prototype.widthGridQtySummary);
                    Ext.getCmp(prototype.id+'-gridDataQtySumm').show();
                } else if (anterior==='gridDetQtySummVal') {
                    win.lblUser_toolTip("Estructura: A1692");
                    Ext.getCmp(prototype.id+'-boxQtySummary').setWidth(prototype.widthGridDetQtySummVal);
                    Ext.getCmp(prototype.id+'-lblTitDetail').setText(anterior_title);
                    Ext.getCmp(prototype.id+'-gridDetQtySummVal').show();
                }
            } else if (Ext.getCmp(prototype.id+'-gridDetQtySummVal').isVisible()) {
                win.lblUser_toolTip("Estructura: A1691 /A1692");
                Ext.getCmp(prototype.id+'-boxQtySummary').setWidth(prototype.widthGridQtySummary);
                Ext.getCmp(prototype.id+'-lblTitDetail').setText('');
                Ext.getCmp(prototype.id+'-gridDetQtySummVal').hide();
                Ext.getCmp(prototype.id+'-gridDataQtySumm').show();
            }
        } else if (Ext.getCmp(prototype.id+'-boxConsolid').isVisible()) {
            history.go(-1);
        } else if (Ext.getCmp(prototype.id+'-boxConsolidByNFLIGHT').isVisible()) {
            win.lblUser_toolTip("Estructura: A1691");
            Ext.getCmp(prototype.id+'-boxConsolidByNFLIGHT').hide();
            Ext.getCmp(prototype.id+'-boxConsolid').show();
            Ext.getCmp(prototype.id+'-gridDataConsolidByDay').show();
            Ext.getCmp(prototype.id+'-gridDataConsolid').hide();
        } else if (Ext.getCmp(prototype.id+'-boxDetTicketContab').isVisible()) {
            win.lblUser_toolTip("Estructura: A1691");
            Ext.getCmp(prototype.id+'-lblTITULO').setText('');
            Ext.getCmp(prototype.id+'-boxDetTicketContab').hide();
            Ext.getCmp(prototype.id+'-boxConsolidByNFLIGHT').show();
        }
    },
    // </editor-fold>

    // <editor-fold defaultstate="collapsed" desc="setFormatParameter">
    setFormatParameter: function () {
        searchParams = {};
        
        // <editor-fold defaultstate="collapsed" desc="llenarData">
        var strSQL = this.armandoQuery91();
        var strTitulo = this.armandoQuery92();
        
        // <editor-fold defaultstate="collapsed" desc="Combo Date">
        var year = Ext.getCmp(prototype.id + '-cmbDateYear').getValue();
        var month = Ext.getCmp(prototype.id + '-cmbDateMonth').getValue();
        var fday = Ext.getCmp(prototype.id + '-cmbDateFromDay').getValue();
        var tday = Ext.getCmp(prototype.id + '-cmbDateToDay').getValue();
        // </editor-fold>
        // </editor-fold>

        // <editor-fold defaultstate="collapsed" desc="asignación">
        searchParams = {
            yearFrom: year,
            monthFrom: month,
            dayFrom: fday,
            dayTo: tday,
            strSQL: strSQL,
            strTitulo: strTitulo
        };

//        _path = prototype.url + '/getXLSX?' +
//                'IN_FECHA_FROM=' + searchParams.IN_FECHA_FROM + '&' +
//                'IN_FECHA_TO=' + searchParams.IN_FECHA_TO + '&' +
//                'type=' + type;
        // </editor-fold>
    },
    setFormatParameterDetTicket: function (data) {
        searchParams = {};
        
        // <editor-fold defaultstate="collapsed" desc="llenarData">
        // </editor-fold>

        // <editor-fold defaultstate="collapsed" desc="asignación">
        searchParams = {
            DFLIGHT: data.DFLIGHT,
            NFLIGHT: data.NFLIGHT,
            CDEPART: data.CDEPART,
            CARRIVA: data.CARRIVA,
            strSQL: data.strSQL,
            strTitulo: data.strTitulo
        };

//        _path = prototype.url + '/getXLSX?' +
//                'IN_FECHA_FROM=' + searchParams.IN_FECHA_FROM + '&' +
//                'IN_FECHA_TO=' + searchParams.IN_FECHA_TO + '&' +
//                'type=' + type;
        // </editor-fold>
    },
    setFormatParameterQtySummary: function () {
        searchParams = {};
        
        // <editor-fold defaultstate="collapsed" desc="llenarData">
        var cmbTipoFecha = this.getValue("cmbTipoFecha");
        var strSQL = this.armandoQuery91();
        var strTitulo = this.armandoQuery92();
        
        // <editor-fold defaultstate="collapsed" desc="Combo Date">
        var year = Ext.getCmp(prototype.id + '-cmbDateYear').getValue();
        var month = Ext.getCmp(prototype.id + '-cmbDateMonth').getValue();
        var fday = Ext.getCmp(prototype.id + '-cmbDateFromDay').getValue();
        var tday = Ext.getCmp(prototype.id + '-cmbDateToDay').getValue();
        // </editor-fold>
        // </editor-fold>

        // <editor-fold defaultstate="collapsed" desc="asignación">
        searchParams = {
            strFormatDate2: cmbTipoFecha,
            yearFrom: year,
            monthFrom: month,
            dayFrom: fday,
            dayTo: tday,
            strSQL: strSQL,
            strTitulo: strTitulo
        };

        _pathQtySummary = prototype.url+'/getXLSXQtySummary?' +
                'strFormatDate2='+searchParams.strFormatDate2+'&' +
                'yearFrom='+searchParams.yearFrom+'&' +
                'monthFrom='+searchParams.monthFrom+'&' +
                'dayFrom='+searchParams.dayFrom+'&' +
                'dayTo='+searchParams.dayTo+'&' +
                'strSQL='+searchParams.strSQL+'&' +
                'strTitulo='+searchParams.strTitulo;
        // </editor-fold>
    },
    setFormatParameterDetTktSummary: function (data, flag) {
        searchParams = {};
        
        // <editor-fold defaultstate="collapsed" desc="llenarData">
        // </editor-fold>

        // <editor-fold defaultstate="collapsed" desc="asignación">
        searchParams = {
            flag: flag,
            yearFrom: data.yearFrom,
            monthFrom: data.monthFrom,
            dayFrom: data.dayFrom,
            dayTo: data.dayTo,
            strFormatDate2: data.strFormatDate2,
            strFormatDate: data.strFormatDate,
            strTitulo: data.strTitulo
        };

//        _path = prototype.url+'/getXLSX?' +
//                'IN_FECHA_FROM='+searchParams.IN_FECHA_FROM+'&' +
//                'IN_FECHA_TO='+searchParams.IN_FECHA_TO+'&' +
//                'type='+type;
        // </editor-fold>
    },
    setFormatParameterDetTktSummVal: function (data) {
        searchParams = {};
        
        // <editor-fold defaultstate="collapsed" desc="llenarData">
        // </editor-fold>

        // <editor-fold defaultstate="collapsed" desc="asignación">
        searchParams = {
            strFormatDate: data.strFormatDate,
            strSQL: data.strSQL,
            strTitulo: data.strTitulo
        };

//        _path = prototype.url+'/getXLSX?' +
//                'IN_FECHA_FROM='+searchParams.IN_FECHA_FROM+'&' +
//                'IN_FECHA_TO='+searchParams.IN_FECHA_TO+'&' +
//                'type='+type;
        // </editor-fold>
    },
    setFormatParameterDetSummValByTkt: function (data, flag) {
        searchParams = {};
        
        // <editor-fold defaultstate="collapsed" desc="llenarData">
        // </editor-fold>

        // <editor-fold defaultstate="collapsed" desc="asignación">
        searchParams = {
            flag: flag,
            strFormatDate2: data.strFormatDate2,
            strFormatDate: data.strFormatDate,
            strTitulo: data.strTitulo
        };

//        _path = prototype.url+'/getXLSX?' +
//                'IN_FECHA_FROM='+searchParams.IN_FECHA_FROM+'&' +
//                'IN_FECHA_TO='+searchParams.IN_FECHA_TO+'&' +
//                'type='+type;
        // </editor-fold>
    },
    setFormatParameterConsolid: function (strFCLOFO) {
        searchParams = {};
        // <editor-fold defaultstate="collapsed" desc="llenarData">
        var strSQL = this.armandoQuery91();
        
        // <editor-fold defaultstate="collapsed" desc="Combo Date">
        var year = Ext.getCmp(prototype.id + '-cmbDateYear').getValue();
        var month = Ext.getCmp(prototype.id + '-cmbDateMonth').getValue();
        var fday = Ext.getCmp(prototype.id + '-cmbDateFromDay').getValue();
        var tday = Ext.getCmp(prototype.id + '-cmbDateToDay').getValue();
        // </editor-fold>
        // </editor-fold>
        
        // <editor-fold defaultstate="collapsed" desc="asignación">
        searchParams = {
            yearFrom: year,
            monthFrom: month,
            dayFrom: fday,
            dayTo: tday,
            strSQL: strSQL,
            strFCLOFO: strFCLOFO,
            DFLIGHT: ''
        };
//        _path = prototype.url+'/getXLSX?' +
//                'IN_FECHA_FROM='+searchParams.IN_FECHA_FROM+'&' +
//                'IN_FECHA_TO='+searchParams.IN_FECHA_TO+'&' +
//                'type='+type;
        // </editor-fold>
    },
    setFormatParameterExcelInteract: function () {
        // <editor-fold defaultstate="collapsed" desc="llenarData">
        var strSQL = this.armandoQuery91();
        
        // <editor-fold defaultstate="collapsed" desc="Combo Date">
        var year = Ext.getCmp(prototype.id + '-cmbDateYear').getValue();
        var month = Ext.getCmp(prototype.id + '-cmbDateMonth').getValue();
        var fday = Ext.getCmp(prototype.id + '-cmbDateFromDay').getValue();
        var tday = Ext.getCmp(prototype.id + '-cmbDateToDay').getValue();
        // </editor-fold>
        // </editor-fold>

        // <editor-fold defaultstate="collapsed" desc="asignación">
        _pathExcelInteract = prototype.url + '/searchExcelInteract?' +
                'yearFrom=' + year + '&' +
                'monthFrom=' + month + '&' +
                'dayFrom=' + fday + '&' +
                'dayTo=' + tday + '&' +
                'strSQL=' + strSQL;
        // </editor-fold>
    },
    setFormatParameterConsolidByNFLIGHT: function (data) {
        searchParams = {};
        
        // <editor-fold defaultstate="collapsed" desc="llenarData">
        // </editor-fold>
        
        // <editor-fold defaultstate="collapsed" desc="asignación">
        searchParams = {
            yearFrom: data.year,
            monthFrom: data.month,
            dayFrom: data.fday,
            dayTo: data.tday,
            strSQL: data.strSQL,
            strFCLOFO: data.strFCLOFO,
            DFLIGHT: data.DFLIGHT
        };
//        _path = prototype.url+'/getXLSX?' +
//                'IN_FECHA_FROM='+searchParams.IN_FECHA_FROM+'&' +
//                'IN_FECHA_TO='+searchParams.IN_FECHA_TO+'&' +
//                'type='+type;
        // </editor-fold>
    },
    setFormatParameterDetTicketContab: function (data) {
        searchParams = {};
        
        // <editor-fold defaultstate="collapsed" desc="llenarData">
        // </editor-fold>
        
        // <editor-fold defaultstate="collapsed" desc="asignación">
        searchParams = {
            DFLIGHT: data.DFLIGHT,
            NFLIGHT: data.NFLIGHT,
            strFCLOFO: data.strFCLOFO,
            CARRI: data.CARRI
        };
//        _path = prototype.url+'/getXLSX?' +
//                'IN_FECHA_FROM='+searchParams.IN_FECHA_FROM+'&' +
//                'IN_FECHA_TO='+searchParams.IN_FECHA_TO+'&' +
//                'type='+type;
        // </editor-fold>
    },
    // </editor-fold>

    // <editor-fold defaultstate="collapsed" desc="setGridData">
    setGridData: function () {
        var storeGridDatas = Ext.create('Ext.Praxis.store.program.QueryFlight.GridData', {
            proxy: {
                url: prototype.url + '/search'
            },
            listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function (obj, obj2, success, obj4, obj5) {
                    win.lblUser_toolTip("Estructura: A1691");
                    var pag = Ext.getCmp(prototype.id + '-paggin');
                    var pagData = pag.getPageData();
                    
                    var currentPage = Ext.util.Format.number(pagData.currentPage, '0,000');
                    var pageCount = Ext.util.Format.number(pagData.pageCount, '0,000');
                    var total = Ext.util.Format.number(pagData.total, '0,000');

                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(currentPage);
                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(pageCount);
                    Ext.getCmp(prototype.id + '-lbl-total').setText(total);
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found'
                        });
                    }
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridData').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
    },
    setGridDataSearchDetTicket: function () {
        var storeGridDatas = Ext.create('Ext.Praxis.store.program.QueryFlight.GridDataDetTicket', {
            proxy: {
                url: prototype.url + '/searchDetTicket'
            },
            listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function (obj, obj2, success, obj4, obj5) {
                    win.lblUser_toolTip("Estructura: A1692");
                    var pag = Ext.getCmp(prototype.id + '-paggin2');
                    var pagData = pag.getPageData();

                    var currentPage = Ext.util.Format.number(pagData.currentPage, '0,000');
                    var pageCount = Ext.util.Format.number(pagData.pageCount, '0,000');
                    var total = Ext.util.Format.number(pagData.total, '0,000');

                    Ext.getCmp(prototype.id + '-lbl-currentPage2').setText(currentPage);
                    Ext.getCmp(prototype.id + '-lbl-pageCount2').setText(pageCount);
                    Ext.getCmp(prototype.id + '-lbl-total2').setText(total);
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found'
                        });
                    } else {
                        var data = obj.data.items[0].data;
                        Ext.getCmp(prototype.id+'-lblTitDetTkt').setText(
                            'Flight Date: '+data.strFormatDate+' - '+
                            'Flight Nbr: '+data.NFLIGHT+data.strDescCDEPART+data.strDescCARRIVA
                        );
                    }
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridDetTkt2').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin2').bindStore(storeGridDatas);
    },
    setGridDataSearchDetTktSummary: function () {
        var storeGridDatas = Ext.create('Ext.Praxis.store.program.QueryFlight.GridDataDetQtySummary', {
            proxy: {
                url: prototype.url + '/searchDetQtySummary'
            },
            listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function (obj, obj2, success, obj4, obj5) {
                    win.lblUser_toolTip("Estructura: A1692");
                    var pag = Ext.getCmp(prototype.id + '-paggin3');
                    var pagData = pag.getPageData();

                    var currentPage = Ext.util.Format.number(pagData.currentPage, '0,000');
                    var pageCount = Ext.util.Format.number(pagData.pageCount, '0,000');
                    var total = Ext.util.Format.number(pagData.total, '0,000');

                    Ext.getCmp(prototype.id + '-lbl-currentPage3').setText(currentPage);
                    Ext.getCmp(prototype.id + '-lbl-pageCount3').setText(pageCount);
                    Ext.getCmp(prototype.id + '-lbl-total3').setText(total);
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found'
                        });
                    }
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridDetQtySum').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin3').bindStore(storeGridDatas);
    },
    setGridDataQtySummary: function () {
        var storeGridDatas = Ext.create('Ext.Praxis.store.program.QueryFlight.GridDataQtySummary', {
            proxy: {
                url: prototype.url + '/searchQtySummary'
            },
            listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function (obj, obj2, success, obj4, obj5) {
                    win.lblUser_toolTip("Estructura: A1691 /A1692");
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found'
                        });
                    } else {
                        var data = obj.data.items[0].data;
                        if (data.strFormatDate2==='FCONT') {
                            Ext.getCmp(prototype.id+'-titQDate').setText('Accounting');
                            Ext.getCmp(prototype.id+'-C_MONTOS').show();
                            Ext.getCmp(prototype.id+'-C_TOTACC').show();
                            Ext.getCmp(prototype.id+'-gridDataQtySumm').setWidth(prototype.widthGridQtySummary+310);
                            Ext.getCmp(prototype.id+'-boxQtySummary').setWidth(prototype.widthGridQtySummary+310);
                        } else {
                            Ext.getCmp(prototype.id+'-titQDate').setText('Flight');
                            Ext.getCmp(prototype.id+'-C_MONTOS').hide();
                            Ext.getCmp(prototype.id+'-C_TOTACC').hide();
                            Ext.getCmp(prototype.id+'-gridDataQtySumm').setWidth(prototype.widthGridQtySummary);
                            Ext.getCmp(prototype.id+'-boxQtySummary').setWidth(prototype.widthGridQtySummary);
                        }
                        Ext.getCmp(prototype.id+'-lblTitDetail').setText('');
                    }
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridDataQtySumm').bindStore(storeGridDatas);
    },
    setGridDataSearchDetTktSummVal: function () {
        var storeGridDatas = Ext.create('Ext.Praxis.store.program.QueryFlight.GridDataDetTktSummVal', {
            proxy: {
                url: prototype.url + '/searchDetQtySummaryVal'
            },
            listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function (obj, obj2, success, obj4, obj5) {
                    win.lblUser_toolTip("Estructura: A1691 /A1692");
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found'
                        });
                    } else {
                        var data = obj.data.items[0].data;
                        Ext.getCmp(prototype.id+'-lblTitDetail').setText(
                            'Accounting Date: '+data.strFormatDate2
                        );
                    }
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridDetQtySummVal').bindStore(storeGridDatas);
    },
    setGridDataSearchDetSummValByTkt: function () {
        var storeGridDatas = Ext.create('Ext.Praxis.store.program.QueryFlight.GridDataDetQtySummary', {
            proxy: {
                url: prototype.url + '/searchDetQtySummValTkt'
            },
            listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function (obj, obj2, success, obj4, obj5) {
                    win.lblUser_toolTip("Estructura: A1692");
                    var pag = Ext.getCmp(prototype.id+'-paggin3');
                    var pagData = pag.getPageData();

                    var currentPage = Ext.util.Format.number(pagData.currentPage, '0,000');
                    var pageCount = Ext.util.Format.number(pagData.pageCount, '0,000');
                    var total = Ext.util.Format.number(pagData.total, '0,000');

                    Ext.getCmp(prototype.id+'-lbl-currentPage3').setText(currentPage);
                    Ext.getCmp(prototype.id+'-lbl-pageCount3').setText(pageCount);
                    Ext.getCmp(prototype.id+'-lbl-total3').setText(total);
                    anterior_title = Ext.getCmp(prototype.id+'-lblTitDetail').text;
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found'
                        });
                        Ext.getCmp(prototype.id+'-lblTitDetail').setText('');
                    } else {
                        var data = obj.data.items[0].data;
                        Ext.getCmp(prototype.id+'-lblTitDetail').setText(
                            'Accounting Date: '+data.strFormatDate2+' - '+
                            'Valued Date: '+data.strFormatDate
                        );
                
                    }
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridDetQtySum').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id+'-paggin3').bindStore(storeGridDatas);
    },
    setGridDataConsolid: function (strFCLOFO) {
        if (strFCLOFO === 'Y') {
            var storeGridDatas = Ext.create('Ext.Praxis.store.program.QueryFlight.GridDataConsolid', {
                proxy: {
                    url: prototype.url + '/searchConsolid'
                },
                listeners: {
                    beforeload: function (obj) {
                        obj.proxy.extraParams = searchParams;
                    },
                    load: function (obj, obj2, success, obj4, obj5) {
                        win.lblUser_toolTip("Estructura: A1691");
                        var pag = Ext.getCmp(prototype.id+'-paggin5');
                        var pagData = pag.getPageData();

                        var currentPage = Ext.util.Format.number(pagData.currentPage, '0,000');
                        var pageCount = Ext.util.Format.number(pagData.pageCount, '0,000');
                        var total = Ext.util.Format.number(pagData.total, '0,000');

                        Ext.getCmp(prototype.id+'-lbl-currentPage5').setText(currentPage);
                        Ext.getCmp(prototype.id+'-lbl-pageCount5').setText(pageCount);
                        Ext.getCmp(prototype.id+'-lbl-total5').setText(total);
                        if (obj.data.length === 0) {
                            global.Msg({
                                msg: 'Data not found'
                            });
                        }
                    }
                }
            });
            Ext.getCmp(prototype.id + '-gridDataConsolid').hide();
            Ext.getCmp(prototype.id + '-pie4').hide();
            
            Ext.getCmp(prototype.id + '-gridDataConsolidByDay').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin5').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-gridDataConsolidByDay').show();
            Ext.getCmp(prototype.id + '-pie5').show();
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.program.QueryFlight.GridDataConsolid', {
                proxy: {
                    url: prototype.url + '/searchConsolid'
                },
                listeners: {
                    beforeload: function (obj) {
                        obj.proxy.extraParams = searchParams;
                    },
                    load: function (obj, obj2, success, obj4, obj5) {
                        win.lblUser_toolTip("Estructura: A1691");
                        var pag = Ext.getCmp(prototype.id+'-paggin4');
                        var pagData = pag.getPageData();

                        var currentPage = Ext.util.Format.number(pagData.currentPage, '0,000');
                        var pageCount = Ext.util.Format.number(pagData.pageCount, '0,000');
                        var total = Ext.util.Format.number(pagData.total, '0,000');

                        Ext.getCmp(prototype.id+'-lbl-currentPage4').setText(currentPage);
                        Ext.getCmp(prototype.id+'-lbl-pageCount4').setText(pageCount);
                        Ext.getCmp(prototype.id+'-lbl-total4').setText(total);
                        if (obj.data.length === 0) {
                            global.Msg({
                                msg: 'Data not found'
                            });
                        }
                    }
                }
            });
            Ext.getCmp(prototype.id + '-gridDataConsolidByDay').hide();
            Ext.getCmp(prototype.id + '-pie5').hide();
            
            Ext.getCmp(prototype.id + '-gridDataConsolid').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin4').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-gridDataConsolid').show();
            Ext.getCmp(prototype.id + '-pie4').show();
        }
    },
    setGridDataConsolidByNFLIGHT: function () {
        var storeGridDatas = Ext.create('Ext.Praxis.store.program.QueryFlight.GridDataConsolidByNFLIGHT', {
            proxy: {
                url: prototype.url + '/searchConsolidByNFLIGHT'
            },
            listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function (obj, obj2, success, obj4, obj5) {
                    win.lblUser_toolTip("Estructura: A1691");
                    var pag = Ext.getCmp(prototype.id+'-paggin6');
                    var pagData = pag.getPageData();

                    var currentPage = Ext.util.Format.number(pagData.currentPage, '0,000');
                    var pageCount = Ext.util.Format.number(pagData.pageCount, '0,000');
                    var total = Ext.util.Format.number(pagData.total, '0,000');

                    Ext.getCmp(prototype.id+'-lbl-currentPage6').setText(currentPage);
                    Ext.getCmp(prototype.id+'-lbl-pageCount6').setText(pageCount);
                    Ext.getCmp(prototype.id+'-lbl-total6').setText(total);
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found'
                        });
                    }
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridDataConsolidByNFLIGHT').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin6').bindStore(storeGridDatas);
    },
    setGridDataDetTicketContab: function () {
        var storeGridDatas = Ext.create('Ext.Praxis.store.program.QueryFlight.GridDataDetTktContab', {
            proxy: {
                url: prototype.url + '/searchTicketContab'
            },
            listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function (obj, obj2, success, obj4, obj5) {
                    win.lblUser_toolTip("Estructura: A1692");
                    var pag = Ext.getCmp(prototype.id+'-paggin7');
                    var pagData = pag.getPageData();

                    var currentPage = Ext.util.Format.number(pagData.currentPage, '0,000');
                    var pageCount = Ext.util.Format.number(pagData.pageCount, '0,000');
                    var total = Ext.util.Format.number(pagData.total, '0,000');

                    Ext.getCmp(prototype.id+'-lbl-currentPage7').setText(currentPage);
                    Ext.getCmp(prototype.id+'-lbl-pageCount7').setText(pageCount);
                    Ext.getCmp(prototype.id+'-lbl-total7').setText(total);
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found'
                        });
                    } else {
                        var data = obj.data.items[0].data;
                        Ext.getCmp(prototype.id+'-lblTITULO').setText(
                            'Flight Date '+data.strFormatDate+' '+
                            'Flight Number '+data.NFLIGHT
                        );
                    }
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridDetTktContab').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin7').bindStore(storeGridDatas);
    },
    // </editor-fold>

    exportExcel: function () {
        if (Ext.getCmp(prototype.id+'-gridDataQtySumm').isVisible()) {
            global.getFile(_pathQtySummary);
        }
    },
    armandoQuery91: function () {
        var strSQL = '', campo = '', temp = '', esCant = false, esPrim = false;
        
        // <editor-fold defaultstate="collapsed" desc="Campo 1">
        var txtCampo1 = Ext.getCmp(prototype.id + '-txtCampo1');
        if (txtCampo1.isVisible()) {
            campo = this.getCampoSql(this.getValue("txtCampo1").toUpperCase());
        } else {
            campo = this.getValue("cmbCampo1").toUpperCase();
        }
        var txt = Ext.getCmp(prototype.id + '-cmbCampo1').getRawValue();
        txt = txt.substring(txt.lastIndexOf(" - ") + 3, txt.length);
        if (txtCampo1.isVisible() || txt === 'Manifest') {
            if (campo !== '' && this.getValue("txtValue1") !== '') {
                temp = this.getValue("txtValue1").toUpperCase();
                if (campo === 'FSTASS' || campo === 'FSTAOD' || campo === 'FSTAVC') {
                    switch (temp) {
                        case '1':
                            temp = '';
                            break;
                        case '2':
                            temp = '1';
                            break;
                    }
                } else {
                    switch (temp) {
                        case 'QFLIGHT':
                        case 'QOCR':
                        case 'QODS':
                        case 'QVCR':
                        case 'QMANUAL':
                        case 'QVAL':
                            temp = this.getCampoSql(temp);
                            esCant = true;
                            break;
                    }
                }
                
                if (esCant) {
                    strSQL += campo+" "+this.getConectorSql(this.getValue("cmbOperador1"), Ext.getCmp(prototype.id+'-cmbOperador1'))+" "+temp+" ";
                } else {
                    strSQL += campo+" "+this.getConectorSql(this.getValue("cmbOperador1"), Ext.getCmp(prototype.id+'-cmbOperador1'))+" '"+temp+"' ";
                }
                esPrim = true;
            }
        }
        // </editor-fold>
        
        // <editor-fold defaultstate="collapsed" desc="Campo 2">
        esCant = false;
        var txtCampo2 = Ext.getCmp(prototype.id + '-txtCampo2');
        var txt = Ext.getCmp(prototype.id + '-cmbCampo2').getRawValue();
        txt = txt.substring(txt.lastIndexOf(" - ") + 3, txt.length);
        if (txtCampo2.isVisible() || txt === 'Manifest') {
            if (txtCampo2.isVisible()) {
                campo = this.getCampoSql(this.getValue("txtCampo2").toUpperCase());
            } else {
                campo = this.getValue("cmbCampo2").toUpperCase();
            }
            if (campo !== '' && this.getValue("txtValue2") !== '') {
                temp = this.getValue("txtValue2").toUpperCase();
                if (campo === 'FSTASS' || campo === 'FSTAOD' || campo === 'FSTAVC') {
                    switch (temp) {
                        case '1':
                            temp = '';
                            break;
                        case '2':
                            temp = '1';
                            break;
                    }
                } else {
                    switch (temp) {
                        case 'QFLIGHT':
                        case 'QOCR':
                        case 'QODS':
                        case 'QVCR':
                        case 'QMANUAL':
                        case 'QVAL':
                            temp = this.getCampoSql(temp);
                            esCant = true;
                            break;
                    }
                }
                if (esPrim) {
                    strSQL += this.getValue("cmbConector2").toUpperCase();
                }
                if (esCant) {
                    strSQL += " "+campo+" "+this.getConectorSql(this.getValue("cmbOperador2"), Ext.getCmp(prototype.id+'-cmbOperador2'))+" "+temp+" ";
                } else {
                    strSQL += " "+campo+" "+this.getConectorSql(this.getValue("cmbOperador2"), Ext.getCmp(prototype.id+'-cmbOperador2'))+" '"+temp+"' ";
                }
                esPrim = true;
            }
        }
        // </editor-fold>
        
        // <editor-fold defaultstate="collapsed" desc="Campo 3">
        esCant = false;
        var txtCampo3 = Ext.getCmp(prototype.id + '-txtCampo3');
        var txt = Ext.getCmp(prototype.id + '-cmbCampo3').getRawValue();
        txt = txt.substring(txt.lastIndexOf(" - ") + 3, txt.length);
        if (txtCampo3.isVisible() || txt === 'Manifest') {
            if (txtCampo3.isVisible()) {
                campo = this.getCampoSql(this.getValue("txtCampo3").toUpperCase());
            } else {
                campo = this.getValue("cmbCampo3").toUpperCase();
            }
            if (campo !== '' && this.getValue("txtValue3") !== '') {
                temp = this.getValue("txtValue3").toUpperCase();
                if (campo === 'FSTASS' || campo === 'FSTAOD' || campo === 'FSTAVC') {
                    switch (temp) {
                        case '1':
                            temp = '';
                            break;
                        case '2':
                            temp = '1';
                            break;
                    }
                } else {
                    switch (temp) {
                        case 'QFLIGHT':
                        case 'QOCR':
                        case 'QODS':
                        case 'QVCR':
                        case 'QMANUAL':
                        case 'QVAL':
                            temp = this.getCampoSql(temp);
                            esCant = true;
                            break;
                    }
                }
                if (esPrim) {
                    strSQL += this.getValue("cmbConector3").toUpperCase();
                }
                if (esCant) {
                    strSQL += " "+campo+" "+this.getConectorSql(this.getValue("cmbOperador3"), Ext.getCmp(prototype.id+'-cmbOperador3'))+" "+temp+" ";
                } else {
                    strSQL += " "+campo+" "+this.getConectorSql(this.getValue("cmbOperador3"), Ext.getCmp(prototype.id+'-cmbOperador3'))+" '"+temp+"' ";
                }
                esPrim = true;
            }
        }
        // </editor-fold>
        
        // <editor-fold defaultstate="collapsed" desc="Campo 4">
        esCant = false;
        var txtCampo4 = Ext.getCmp(prototype.id + '-txtCampo4');
        var txt = Ext.getCmp(prototype.id + '-cmbCampo4').getRawValue();
        txt = txt.substring(txt.lastIndexOf(" - ") + 3, txt.length);
        if (txtCampo4.isVisible() || txt === 'Manifest') {
            if (txtCampo4.isVisible()) {
                campo = this.getCampoSql(this.getValue("txtCampo4").toUpperCase());
            } else {
                campo = this.getValue("cmbCampo4").toUpperCase();
            }
            if (campo !== '' && this.getValue("txtValue4") !== '') {
                temp = this.getValue("txtValue4").toUpperCase();
                if (campo === 'FSTASS' || campo === 'FSTAOD' || campo === 'FSTAVC') {
                    switch (temp) {
                        case '1':
                            temp = '';
                            break;
                        case '2':
                            temp = '1';
                            break;
                    }
                } else {
                    switch (temp) {
                        case 'QFLIGHT':
                        case 'QOCR':
                        case 'QODS':
                        case 'QVCR':
                        case 'QMANUAL':
                        case 'QVAL':
                            temp = this.getCampoSql(temp);
                            esCant = true;
                            break;
                    }
                }
                if (esPrim) {
                    strSQL += this.getValue("cmbConector4").toUpperCase();
                }
                if (esCant) {
                    strSQL += " "+campo+" "+this.getConectorSql(this.getValue("cmbOperador4"), Ext.getCmp(prototype.id+'-cmbOperador4'))+" "+temp+" ";
                } else {
                    strSQL += " "+campo+" "+this.getConectorSql(this.getValue("cmbOperador4"), Ext.getCmp(prototype.id+'-cmbOperador4'))+" '"+temp+"' ";
                }
                esPrim = true;
            }
        }
        // </editor-fold>
        
        return strSQL;
    },
    armandoQuery92: function () {
        var strSQL = '', campo = '', temp = '', esCant = false, esPrim = false;
        
        // <editor-fold defaultstate="collapsed" desc="Campo 1">
        var txtCampo1 = Ext.getCmp(prototype.id + '-txtCampo1');
        if (txtCampo1.isVisible()) {
            campo = this.getCampoSql(this.getValue("txtCampo1").toUpperCase());
        } else {
            campo = this.getValue("cmbCampo1").toUpperCase();
        }
        var txt = Ext.getCmp(prototype.id + '-cmbCampo1').getRawValue();
        txt = txt.substring(txt.lastIndexOf(" - ") + 3, txt.length);
        if (txtCampo1.isVisible() || txt === 'Cupon') {
            if (campo !== '' && this.getValue("txtValue1") !== '') {
                temp = this.getValue("txtValue1").toUpperCase();
                strSQL += campo+" "+this.getConectorSql(this.getValue("cmbOperador1"), Ext.getCmp(prototype.id+'-cmbOperador1'))+" '"+temp+"' ";
                esPrim = true;
            }
        }
        // </editor-fold>
        
        // <editor-fold defaultstate="collapsed" desc="Campo 2">
        esCant = false;
        var txtCampo2 = Ext.getCmp(prototype.id + '-txtCampo2');
        var txt = Ext.getCmp(prototype.id + '-cmbCampo2').getRawValue();
        txt = txt.substring(txt.lastIndexOf(" - ") + 3, txt.length);
        if (txtCampo2.isVisible() || txt === 'Cupon') {
            if (txtCampo2.isVisible()) {
                campo = this.getCampoSql(this.getValue("txtCampo2").toUpperCase());
            } else {
                campo = this.getValue("cmbCampo2").toUpperCase();
            }
            if (campo !== '' && this.getValue("txtValue2") !== '') {
                temp = this.getValue("txtValue2").toUpperCase();
                if (esPrim) {
                    strSQL += this.getValue("cmbConector2").toUpperCase();
                }
                strSQL += " "+campo+" "+this.getConectorSql(this.getValue("cmbOperador2"), Ext.getCmp(prototype.id+'-cmbOperador2'))+" '"+temp+"' ";
                esPrim = true;
            }
        }
        // </editor-fold>
        
        // <editor-fold defaultstate="collapsed" desc="Campo 3">
        esCant = false;
        var txtCampo3 = Ext.getCmp(prototype.id + '-txtCampo3');
        var txt = Ext.getCmp(prototype.id + '-cmbCampo3').getRawValue();
        txt = txt.substring(txt.lastIndexOf(" - ") + 3, txt.length);
        if (txtCampo3.isVisible() || txt === 'Cupon') {
            if (txtCampo3.isVisible()) {
                campo = this.getCampoSql(this.getValue("txtCampo3").toUpperCase());
            } else {
                campo = this.getValue("cmbCampo3").toUpperCase();
            }
            if (campo !== '' && this.getValue("txtValue3") !== '') {
                temp = this.getValue("txtValue3").toUpperCase();
                if (esPrim) {
                    strSQL += this.getValue("cmbConector3").toUpperCase();
                }
                strSQL += " "+campo+" "+this.getConectorSql(this.getValue("cmbOperador3"), Ext.getCmp(prototype.id+'-cmbOperador3'))+" '"+temp+"' ";
                esPrim = true;
            }
        }
        // </editor-fold>
        
        // <editor-fold defaultstate="collapsed" desc="Campo 4">
        esCant = false;
        var txtCampo4 = Ext.getCmp(prototype.id + '-txtCampo4');
        var txt = Ext.getCmp(prototype.id + '-cmbCampo4').getRawValue();
        txt = txt.substring(txt.lastIndexOf(" - ") + 3, txt.length);
        if (txtCampo4.isVisible() || txt === 'Cupon') {
            if (txtCampo4.isVisible()) {
                campo = this.getCampoSql(this.getValue("txtCampo4").toUpperCase());
            } else {
                campo = this.getValue("cmbCampo4").toUpperCase();
            }
            if (campo !== '' && this.getValue("txtValue4") !== '') {
                temp = this.getValue("txtValue4").toUpperCase();
                if (esPrim) {
                    strSQL += this.getValue("cmbConector4").toUpperCase();
                }
                strSQL += " "+campo+" "+this.getConectorSql(this.getValue("cmbOperador4"), Ext.getCmp(prototype.id+'-cmbOperador4'))+" '"+temp+"' ";
                esPrim = true;
            }
        }
        // </editor-fold>
        return strSQL;
    },
    getCampoSql: function (campo) {
        var campoA1248 = '';
        var objCampo;
        var lstCampos = Ext.getCmp(prototype.id+"-cmbCampo1").getStore().data.items;
        for (var i = 0; i < lstCampos.length; i++) {
            objCampo = lstCampos[i].data;
            var USERFIELD = objCampo.name.substring(0, objCampo.name.indexOf("-")-1);
            if (USERFIELD===campo) {
                campoA1248 = objCampo.code;//SYSTFIELD;
                break;
            }
        }
        return campoA1248;
    },
    getConectorSql: function(operador, combo) {
        var operadorEq = '';
        switch (operador) {
            case 'EQ':
                operadorEq = '=';
                break;
            case 'GT':
                operadorEq = '>';
                break;
            case 'LT':
                operadorEq = '<';
                break;
            case 'GE':
                operadorEq = '>=';
                break;
            case 'LE':
                operadorEq = '<=';
                break;
            case 'NE':
                operadorEq = '<>';
                break;
            case 'LIKE':
                operadorEq = '>=';
                break;
            case 'NLIKE':
                operadorEq = 'NOT LIKE';
                break;
            default:
                operadorEq = '=';
                combo.setValue('');
        }
        return operadorEq;
    },

    // <editor-fold defaultstate="collapsed" desc="Funciones para la paginación">
    pagFirst: function(obj, e) {
        if (Ext.getCmp(prototype.id+'-boxMainData').isVisible()) {
            Ext.getCmp(prototype.id+'-paggin').moveFirst();
        } else if (Ext.getCmp(prototype.id+'-boxDetailData').isVisible()) {
            Ext.getCmp(prototype.id+'-paggin2').moveFirst();
        } else if (Ext.getCmp(prototype.id+'-boxQtySummary').isVisible()) {
            if (Ext.getCmp(prototype.id+'-gridDetQtySum').isVisible()) {
                Ext.getCmp(prototype.id+'-paggin3').moveFirst();
            }
        } else if (Ext.getCmp(prototype.id+'-boxConsolid').isVisible()) {
            if (Ext.getCmp(prototype.id+'-gridDataConsolid').isVisible()) {
                Ext.getCmp(prototype.id+'-paggin4').moveFirst();
            } else if (Ext.getCmp(prototype.id+'-gridDataConsolidByDay').isVisible()) {
                Ext.getCmp(prototype.id+'-paggin5').moveFirst();
            }
        } else if (Ext.getCmp(prototype.id+'-boxConsolidByNFLIGHT').isVisible()) {
            Ext.getCmp(prototype.id+'-paggin6').moveFirst();
        } else if (Ext.getCmp(prototype.id+'-boxDetTicketContab').isVisible()) {
            Ext.getCmp(prototype.id+'-paggin7').moveFirst();
        }
    },
    pagPrevious: function(obj, e) {
        if (Ext.getCmp(prototype.id+'-boxMainData').isVisible()) {
            Ext.getCmp(prototype.id+'-paggin').movePrevious();
        } else if (Ext.getCmp(prototype.id+'-boxDetailData').isVisible()) {
            Ext.getCmp(prototype.id+'-paggin2').movePrevious();
        } else if (Ext.getCmp(prototype.id+'-boxQtySummary').isVisible()) {
            if (Ext.getCmp(prototype.id+'-gridDetQtySum').isVisible()) {
                Ext.getCmp(prototype.id+'-paggin3').movePrevious();
            }
        } else if (Ext.getCmp(prototype.id+'-boxConsolid').isVisible()) {
            if (Ext.getCmp(prototype.id+'-gridDataConsolid').isVisible()) {
                Ext.getCmp(prototype.id+'-paggin4').movePrevious();
            } else if (Ext.getCmp(prototype.id+'-gridDataConsolidByDay').isVisible()) {
                Ext.getCmp(prototype.id+'-paggin5').movePrevious();
            }
        } else if (Ext.getCmp(prototype.id+'-boxConsolidByNFLIGHT').isVisible()) {
            Ext.getCmp(prototype.id+'-paggin6').movePrevious();
        } else if (Ext.getCmp(prototype.id+'-boxDetTicketContab').isVisible()) {
            Ext.getCmp(prototype.id+'-paggin7').movePrevious();
        }
    },
    pagNext: function(obj, e) {
        if (Ext.getCmp(prototype.id+'-boxMainData').isVisible()) {
            Ext.getCmp(prototype.id+'-paggin').moveNext();
        } else if (Ext.getCmp(prototype.id+'-boxDetailData').isVisible()) {
            Ext.getCmp(prototype.id+'-paggin2').moveNext();
        } else if (Ext.getCmp(prototype.id+'-boxQtySummary').isVisible()) {
            if (Ext.getCmp(prototype.id+'-gridDetQtySum').isVisible()) {
                Ext.getCmp(prototype.id+'-paggin3').moveNext();
            }
        } else if (Ext.getCmp(prototype.id+'-boxConsolid').isVisible()) {
            if (Ext.getCmp(prototype.id+'-gridDataConsolid').isVisible()) {
                Ext.getCmp(prototype.id+'-paggin4').moveNext();
            } else if (Ext.getCmp(prototype.id+'-gridDataConsolidByDay').isVisible()) {
                Ext.getCmp(prototype.id+'-paggin5').moveNext();
            }
        } else if (Ext.getCmp(prototype.id+'-boxConsolidByNFLIGHT').isVisible()) {
            Ext.getCmp(prototype.id+'-paggin6').moveNext();
        } else if (Ext.getCmp(prototype.id+'-boxDetTicketContab').isVisible()) {
            Ext.getCmp(prototype.id+'-paggin7').moveNext();
        }
    },
    pagLast: function(obj, e) {
        if (Ext.getCmp(prototype.id+'-boxMainData').isVisible()) {
            Ext.getCmp(prototype.id+'-paggin').moveLast();
        } else if (Ext.getCmp(prototype.id+'-boxDetailData').isVisible()) {
            Ext.getCmp(prototype.id+'-paggin2').moveLast();
        } else if (Ext.getCmp(prototype.id+'-boxQtySummary').isVisible()) {
            if (Ext.getCmp(prototype.id+'-gridDetQtySum').isVisible()) {
                Ext.getCmp(prototype.id+'-paggin3').moveLast();
            }
        } else if (Ext.getCmp(prototype.id+'-boxConsolid').isVisible()) {
            if (Ext.getCmp(prototype.id+'-gridDataConsolid').isVisible()) {
                Ext.getCmp(prototype.id+'-paggin4').moveLast();
            } else if (Ext.getCmp(prototype.id+'-gridDataConsolidByDay').isVisible()) {
                Ext.getCmp(prototype.id+'-paggin5').moveLast();
            }
        } else if (Ext.getCmp(prototype.id+'-boxConsolidByNFLIGHT').isVisible()) {
            Ext.getCmp(prototype.id+'-paggin6').moveLast();
        } else if (Ext.getCmp(prototype.id+'-boxDetTicketContab').isVisible()) {
            Ext.getCmp(prototype.id+'-paggin7').moveLast();
        }
    },
    // </editor-fold>

    // <editor-fold defaultstate="collapsed" desc="Utilitarios">
    getValue: function (id) {
        return Ext.getCmp(prototype.id + '-' + id).getValue();
    },
    focus: function (id) {
        Ext.getCmp(prototype.id + '-' + id).focus();
    },
    setValue: function (id, txt) {
        return Ext.getCmp(prototype.id + '-' + id).setValue(txt);
    },
    onUpperValue: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    onTextKeypress: function (obj, e, eOpts) {
        if (e.getKey() === e.ENTER) {
            this.btnSearch_click();
        }
    }
    // </editor-fold>
});
