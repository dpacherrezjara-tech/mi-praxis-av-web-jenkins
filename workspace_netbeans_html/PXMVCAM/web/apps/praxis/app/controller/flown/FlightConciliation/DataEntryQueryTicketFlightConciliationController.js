Ext.define('Ext.Praxis.controller.flown.FlightConciliation.DataEntryQueryTicketFlightConciliationController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryQueryTicketFlightConciliationController',
//    me: '',
    msjResult: '',
    beanOption: {},
    bean: {},
    beanCons: {},
    lstCampos: '',
    _path: '',
    init: function(view) {
//        me = this;
        this.p = this.view.params;
    },
    afterRender: function(){
        this.cargarComboBoxes();
        this.setStoreData();
        this.btnClear_click();
        this.mostrarData(this.p.bean);
    },
    cargarComboBoxes: function () {
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
//                        var lblDes = currentValue.TABNAME === 'A1691'?'Manifest':'Cupon';
                        campos.push([currentValue.SYSTFIELD, currentValue.USERFIELD + ' - ' + currentValue.DESCRIPT]);
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
    btnImgInfoHelp_click: function (cmp, e, eOpts) {
        Ext.create('Ext.Praxis.view.flown.FlightConciliationForm.DataEntryInfo', {
            id: 'DataEntryInfoFlightConciliationForm',
            params: {
                lstCampos: lstCampos
            }
        }).show();
    },
    // <editor-fold defaultstate="collapsed" desc="Combo Date">
    onYearChange: function (combo, newValue, oldValue, eOpts) {
        var comboMonth = Ext.getCmp(prototype.id + '-cmbDateMonth2');
        var comboFromDay = Ext.getCmp(prototype.id + '-cmbDateFromDay2');
        var comboToDay = Ext.getCmp(prototype.id + '-cmbDateToDay2');
        if (newValue !== '') {
            if (this.getValue("cmbDateMonth2") === '02') {
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
        var comboFromDay = Ext.getCmp(prototype.id + '-cmbDateFromDay2');
        var comboToDay = Ext.getCmp(prototype.id + '-cmbDateToDay2');
        if (newValue !== '') {
            var store = win.getStoreDays2(true, this.getValue("cmbDateYear2"), Number(newValue) - 1);
            comboFromDay.bindStore(store);
            comboToDay.bindStore(store);
        } else {
            comboFromDay.setValue(newValue);
            comboToDay.setValue(newValue);
        }

    },
    onFromDayChange: function (combo, newValue, oldValue, eOpts) {
        var comboMonth = Ext.getCmp(prototype.id + '-cmbDateMonth2');
        var comboFromDay = Ext.getCmp(prototype.id + '-cmbDateFromDay2');
        var comboToDay = Ext.getCmp(prototype.id + '-cmbDateToDay2');
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
        var comboMonth = Ext.getCmp(prototype.id + '-cmbDateMonth2');
        var comboFromDay = Ext.getCmp(prototype.id + '-cmbDateFromDay2');
        var comboToDay = Ext.getCmp(prototype.id + '-cmbDateToDay2');
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
        Ext.getCmp(prototype.id + '-cmbDateYear2').bindStore(storeComboDataYear);

        var storeComboDataMonth = win.getStoreMonth(true);
        Ext.getCmp(prototype.id + '-cmbDateMonth2').bindStore(storeComboDataMonth);

        var days = new Array();
        days.push(['', 'All']);
        Ext.getCmp(prototype.id + '-cmbDateFromDay2').bindStore(
                Ext.create('Ext.data.ArrayStore', {
                    autoLoad: true,
                    data: days,
                    fields: ['code', 'name']
                })
                );
        Ext.getCmp(prototype.id + '-cmbDateToDay2').bindStore(
                Ext.create('Ext.data.ArrayStore', {
                    autoLoad: true,
                    data: days,
                    fields: ['code', 'name']
                })
                );
    },
    // </editor-fold>
    
    mostrarData: function(bean) {
        this.setValue('cmbDateYear2', bean.yearFrom);
        this.setValue('cmbDateMonth2', bean.monthFrom);
        this.setValue('cmbDateFromDay2', bean.dayFrom);
        this.setValue('cmbDateToDay2', bean.dayTo);
    },
    onSwapTKT_Click: function() {
        var boxMainData2 = Ext.getCmp(prototype.id+'-boxMainData2');
        var boxSwapData = Ext.getCmp(prototype.id+'-boxSwapData');
        if (boxMainData2.isVisible()) {
            boxMainData2.hide();
            boxSwapData.show();
        }
        else {
            boxMainData2.show();
            boxSwapData.hide();
        }
    },
    // <editor-fold defaultstate="collapsed" desc="Options">
    btnSearch_click: function (obj, e) {
        if (this.getValue("cmbDateYear2")!=='' && this.getValue("cmbDateMonth2")!=='') {
            this.setFormatParameter();
            // <editor-fold defaultstate="collapsed" desc="preparar">
            Ext.getCmp(prototype.id+'-boxSwapData').hide();
            Ext.getCmp(prototype.id+'-boxMainData2').show();
            // </editor-fold>
            this.setGridData();
        } else {
            global.Msg({
                msg: 'Please enter all required fields.'
            });
        }
    },
    btnFilter_click: function () {
        var option = Ext.getCmp(prototype.id + '-boxSearchFilter');
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
//                    window.alert("Listo para Exportar Excel !!");
//                    this.exportExcel();
                }
            }
        });
    },
    btnClear_click: function (obj, e) {
        // <editor-fold defaultstate="collapsed" desc="Clear Combo Date">
        Ext.getCmp(prototype.id + '-cmbDateFromDay2').setValue("");
        Ext.getCmp(prototype.id + '-cmbDateToDay2').setValue("");
        var mes = new Date().getMonth() + 1;
        if (mes < 10) mes = "0" + mes;
        Ext.getCmp(prototype.id + '-cmbDateMonth2').setValue(mes);
        Ext.getCmp(prototype.id + '-cmbDateYear2').setValue(new Date().getFullYear());
        // </editor-fold>

        // <editor-fold defaultstate="collapsed" desc="Clear Campos">
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
        // </editor-fold>

        // <editor-fold defaultstate="collapsed" desc="Clear Grilla">
        Ext.getCmp(prototype.id+'-gridData2').getStore().removeAll();
        Ext.getCmp(prototype.id+'-lbl-currentPage10').setText("1");
        Ext.getCmp(prototype.id+'-lbl-pageCount10').setText("0");
        Ext.getCmp(prototype.id+'-lbl-total10').setText("0");
        Ext.getCmp(prototype.id+'-gridSwapData').getStore().removeAll();
        Ext.getCmp(prototype.id+'-lbl-currentPage11').setText("1");
        Ext.getCmp(prototype.id+'-lbl-pageCount11').setText("0");
        Ext.getCmp(prototype.id+'-lbl-total11').setText("0");
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
        Ext.getCmp(prototype.id+'-boxSwapData').hide();
        Ext.getCmp(prototype.id+'-boxMainData2').show();
        // </editor-fold>
    },
    btnBack_click: function () {
        this.view.close();
    },
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="setFormatParameter">
    setFormatParameter: function () {
        searchParams = {};
        
        // <editor-fold defaultstate="collapsed" desc="llenarData">
        var strSQL = this.armandoQuery91();
        
        // <editor-fold defaultstate="collapsed" desc="Combo Date">
        var year = Ext.getCmp(prototype.id + '-cmbDateYear2').getValue();
        var month = Ext.getCmp(prototype.id + '-cmbDateMonth2').getValue();
        var fday = Ext.getCmp(prototype.id + '-cmbDateFromDay2').getValue();
        var tday = Ext.getCmp(prototype.id + '-cmbDateToDay2').getValue();
        // </editor-fold>
        // </editor-fold>
        
        // <editor-fold defaultstate="collapsed" desc="asignación">
        searchParams = {
            yearFrom: year,
            monthFrom: month,
            dayFrom: fday,
            dayTo: tday,
            strSQL: strSQL
        };
        _path = prototype.url + '/getXLSX?' +
            'yearFrom=' + searchParams.yearFrom + '&' +
            'monthFrom=' + searchParams.monthFrom + '&' +
            'dayFrom=' + searchParams.dayFrom + '&' +
            'dayTo=' + searchParams.dayTo + '&' +
            'strSQL=' + strSQL;
        // </editor-fold>
    },
    // </editor-fold>

    // <editor-fold defaultstate="collapsed" desc="setGridData">
    setGridData: function () {
        var storeGridDatas = Ext.create('Ext.Praxis.store.flown.FlightConciliation.GridDataQuery', {
            proxy: {
                url: prototype.url + '/searchQuery'
            },
            listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function (obj, obj2, success, obj4, obj5) {
                    win.lblUser_toolTip("Estructura: A1691");
                    // <editor-fold defaultstate="collapsed" desc="QueryTicket-paggin">
                    var pag = Ext.getCmp(prototype.id + '-QueryTicket-paggin');
                    var pagData = pag.getPageData();
                    
                    var currentPage = Ext.util.Format.number(pagData.currentPage, '0,000');
                    var pageCount = Ext.util.Format.number(pagData.pageCount, '0,000');
                    var total = Ext.util.Format.number(pagData.total, '0,000');

                    Ext.getCmp(prototype.id + '-lbl-currentPage10').setText(currentPage);
                    Ext.getCmp(prototype.id + '-lbl-pageCount10').setText(pageCount);
                    Ext.getCmp(prototype.id + '-lbl-total10').setText(total);
                    
                    pag = Ext.getCmp(prototype.id + '-QueryTicket-paggin');
                    pagData = pag.getPageData();
                    
                    currentPage = Ext.util.Format.number(pagData.currentPage, '0,000');
                    pageCount = Ext.util.Format.number(pagData.pageCount, '0,000');
                    total = Ext.util.Format.number(pagData.total, '0,000');
                    
                    Ext.getCmp(prototype.id + '-lbl-currentPage11').setText(currentPage);
                    Ext.getCmp(prototype.id + '-lbl-pageCount11').setText(pageCount);
                    Ext.getCmp(prototype.id + '-lbl-total11').setText(total);
                    // </editor-fold>
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found'
                        });
                    }
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridData2').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-QueryTicket-paggin').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridSwapData').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-QueryTicket-paggin2').bindStore(storeGridDatas);
    },
    // </editor-fold>
    
    exportExcel: function() {
        if (Ext.getCmp(prototype.id+'-boxMainData2').isVisible()) {
            window.alert("Listo");
//            global.getFile(_path);
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
        if (campo !== '' && this.getValue("txtValue1") !== '') {
            if(campo === 'TICKET'){ 
                campo = 'CCIA||FORMA||SERIE||CUPON';
            }
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
                    case 'VALUE':
                    case 'ESTVAL':
                        temp = this.getCampoSql(temp);
                        esCant = true;
                        break;
                }
            }
//                
            if (esCant) {
                strSQL += campo+" "+this.getConectorSql(this.getValue("cmbOperador1"), Ext.getCmp(prototype.id+'-cmbOperador1'))+" "+temp+" ";
            } else {
                strSQL += campo+" "+this.getConectorSql(this.getValue("cmbOperador1"), Ext.getCmp(prototype.id+'-cmbOperador1'))+" '"+temp+"' ";
            }
        }
        // </editor-fold>
        
        // <editor-fold defaultstate="collapsed" desc="Campo 2">
        esCant = false;
        var txtCampo2 = Ext.getCmp(prototype.id + '-txtCampo2');
        if (txtCampo2.isVisible()) {
            campo = this.getCampoSql(this.getValue("txtCampo2").toUpperCase());
        } else {
            campo = this.getValue("cmbCampo2").toUpperCase();
        }
        if (campo !== '' && this.getValue("txtValue2") !== '') {
            if(campo === 'TICKET'){ 
                campo = 'CCIA||FORMA||SERIE||CUPON';
            }
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
                    case 'VALUE':
                    case 'ESTVAL':
                        temp = this.getCampoSql(temp);
                        esCant = true;
                        break;
                }
            }
            if (esCant) {
                strSQL += this.getValue("cmbConector2").toUpperCase();
                strSQL += " "+campo+" "+this.getConectorSql(this.getValue("cmbOperador2"), Ext.getCmp(prototype.id+'-cmbOperador2'))+" "+temp+" ";
            } else {
                strSQL += this.getValue("cmbConector2").toUpperCase();
                strSQL += " "+campo+" "+this.getConectorSql(this.getValue("cmbOperador2"), Ext.getCmp(prototype.id+'-cmbOperador2'))+" '"+temp+"' ";
            }
        }
        // </editor-fold>
        
        // <editor-fold defaultstate="collapsed" desc="Campo 3">
        esCant = false;
        var txtCampo3 = Ext.getCmp(prototype.id + '-txtCampo3');
        if (txtCampo3.isVisible()) {
            campo = this.getCampoSql(this.getValue("txtCampo3").toUpperCase());
        } else {
            campo = this.getValue("cmbCampo3").toUpperCase();
        }
        if (campo !== '' && this.getValue("txtValue3") !== '') {
            if(campo === 'TICKET'){ 
                campo = 'CCIA||FORMA||SERIE||CUPON';
            }
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
                    case 'VALUE':
                    case 'ESTVAL':
                        temp = this.getCampoSql(temp);
                        esCant = true;
                        break;
                }
            }
            if (esCant) {
                strSQL += this.getValue("cmbConector3").toUpperCase();
                strSQL += " "+campo+" "+this.getConectorSql(this.getValue("cmbOperador3"), Ext.getCmp(prototype.id+'-cmbOperador3'))+" "+temp+" ";
            } else {
                strSQL += this.getValue("cmbConector3").toUpperCase();
                strSQL += " "+campo+" "+this.getConectorSql(this.getValue("cmbOperador3"), Ext.getCmp(prototype.id+'-cmbOperador3'))+" '"+temp+"' ";
            }
        }
        // </editor-fold>
        
        // <editor-fold defaultstate="collapsed" desc="Campo 4">
        esCant = false;
        var txtCampo4 = Ext.getCmp(prototype.id + '-txtCampo4');
        if (txtCampo4.isVisible()) {
            campo = this.getCampoSql(this.getValue("txtCampo4").toUpperCase());
        } else {
            campo = this.getValue("cmbCampo4").toUpperCase();
        }
        if (campo !== '' && this.getValue("txtValue4") !== '') {
            if(campo === 'TICKET'){ 
                campo = 'CCIA||FORMA||SERIE||CUPON';
            }
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
                    case 'VALUE':
                    case 'ESTVAL':
                        temp = this.getCampoSql(temp);
                        esCant = true;
                        break;
                }
            }
            if (esCant) {
                strSQL += this.getValue("cmbConector4").toUpperCase();
                strSQL += " "+campo+" "+this.getConectorSql(this.getValue("cmbOperador4"), Ext.getCmp(prototype.id+'-cmbOperador4'))+" "+temp+" ";
            } else {
                strSQL += this.getValue("cmbConector4").toUpperCase();
                strSQL += " "+campo+" "+this.getConectorSql(this.getValue("cmbOperador4"), Ext.getCmp(prototype.id+'-cmbOperador4'))+" '"+temp+"' ";
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
        if (Ext.getCmp(prototype.id+'-boxMainData2').isVisible()) {
            Ext.getCmp(prototype.id+'-QueryTicket-paggin').moveFirst();
        } else if (Ext.getCmp(prototype.id+'-boxSwapData').isVisible()) {
            Ext.getCmp(prototype.id+'-QueryTicket-paggin2').moveFirst();
        }
    },
    pagPrevious: function(obj, e) {
        if (Ext.getCmp(prototype.id+'-boxMainData2').isVisible()) {
            Ext.getCmp(prototype.id+'-QueryTicket-paggin').movePrevious();
        } else if (Ext.getCmp(prototype.id+'-boxSwapData').isVisible()) {
            Ext.getCmp(prototype.id+'-QueryTicket-paggin2').movePrevious();
        }
    },
    pagNext: function(obj, e) {
        if (Ext.getCmp(prototype.id+'-boxMainData2').isVisible()) {
            Ext.getCmp(prototype.id+'-QueryTicket-paggin').moveNext();
        } else if (Ext.getCmp(prototype.id+'-boxSwapData').isVisible()) {
            Ext.getCmp(prototype.id+'-QueryTicket-paggin2').moveNext();
        }
    },
    pagLast: function(obj, e) {
        if (Ext.getCmp(prototype.id+'-boxMainData2').isVisible()) {
            Ext.getCmp(prototype.id+'-QueryTicket-paggin').moveLast();
        } else if (Ext.getCmp(prototype.id+'-boxSwapData').isVisible()) {
            Ext.getCmp(prototype.id+'-QueryTicket-paggin2').moveLast();
        }
    },
    // </editor-fold>
    
    onUpperValue: function(field, newValue, oldValue){
        field.setValue(newValue.toUpperCase());
    },
    setValue: function(id, txt) {
        return Ext.getCmp(prototype.id+'-'+id).setValue(txt);
    },
    getValue: function(id) {
        return Ext.getCmp(prototype.id+'-'+id).getValue();
    },
    focus: function(id) {
        return Ext.getCmp(prototype.id+'-'+id).focus();
    }
});